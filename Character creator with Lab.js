(() => {
    class Library {
      constructor() {
        this.cults = {};
        this.skills = {};
        this.gear = {};
        this.armor = {};
        this.weapons = {};
        this.runes = { element: [], form: [], technique: [], power: [], condition: [] };
        this.hitLocation = {};
        this.passions = [];
        this.homelands = {
          "Sartar": ["Sartar"],
          "Esrolia": ["Esrolia"],
          "Grazeland": ["Pony Breeders"],
          "Prax": ["Bison Rider", "High Llama Rider", "Impala Rider", "Pol Joni", "Sable Rider"],
          "Lunar Tarsh": ["Lunar Tarsh"],
          "Old Tarsh": ["Old Tarsh"]
        };
      }
  
      async loadCults(sources) {
        this.cults = await this.loadFromCompendiums(sources, 'cult');
      }
  
      async loadSkills(sources) {
        try {
          const skills = {
            Agility: [],
            Communication: [],
            Knowledge: [],
            Magic: [],
            Manipulation: [],
            Perception: [],
            Stealth: [],
            MeleeWeapons: [],
            MissileWeapons: []
          };
  
          for (const source of sources) {
            const pack = game.packs.get(source);
            if (!pack) {
              console.error(`Compendium '${source}' not found`);
              continue;
            }
  
            await pack.getIndex();
            const items = await pack.getDocuments();
  
            items.forEach(item => {
              const category = item.system.category.charAt(0).toUpperCase() + item.system.category.slice(1);
              if (skills[category]) {
                skills[category].push({
                  name: item.name,
                  value: item.system.baseChance
                });
              }
            });
          }
  
          this.skills = skills;
        } catch (error) {
          console.error("Error loading skills:", error);
        }
      }
  
      async loadRunes(sources) {
        try {
          const runes = {
            element: [],
            form: [],
            technique: [],
            power: [],
            condition: []
          };
  
          for (const source of sources) {
            const pack = game.packs.get(source);
            if (!pack) {
              console.error(`Compendium '${source}' not found`);
              continue;
            }
  
            await pack.getIndex();
            const runeItems = await pack.getDocuments();
  
            runeItems.forEach(item => {
              const type = item.system.runeType?.type;
              if (runes.hasOwnProperty(type)) {
                runes[type].push({ name: item.name, system: item.system });
              } else {
                console.warn(`Unknown rune type '${type}' for rune '${item.name}'`);
              }
            });
          }
  
          this.runes = runes;
        } catch (error) {
          console.error("Error loading runes:", error);
          this.runes = { element: [], form: [], technique: [], power: [], condition: [] };
        }
      }
  
      async loadGear(sources) {
        this.gear = await this.loadFromCompendiums(sources, 'gear');
      }
  
      async loadArmor(sources) {
        this.armor = await this.loadFromCompendiums(sources, 'armor');
      }
  
      async loadWeapon(sources) {
        this.weapons = await this.loadFromCompendiums(sources, 'weapon');
      }
  
      async loadHitLocation() {
        try {
          const hitLocations = {};
          const packs = game.packs.filter(pack => pack.metadata.name.includes('hit-locations'));
  
          for (const pack of packs) {
            await pack.getIndex();
            const items = await pack.getDocuments();
  
            hitLocations[pack.metadata.name] = items.map(item => ({
              name: item.name,
              location: item.system.location,
              armorPoints: item.system.armorPoints,
              hitPoints: item.system.hitPoints
            }));
          }
  
          this.hitLocation = hitLocations;
        } catch (error) {
          console.error("Error loading hit locations:", error);
        }
      }
  
      async loadPassions() {
        try {
          const pack = game.packs.get('wiki-en-rqg.passions-base');
          if (!pack) {
            console.error(`Compendium 'wiki-en-rqg.passions-base' not found`);
            return;
          }
  
          await pack.getIndex();
          const items = await pack.getDocuments();
  
          this.passions = items.map(item => ({
            name: item.name,
            subject: item.system.subject
          }));
        } catch (error) {
          console.error("Error loading passions:", error);
        }
      }
  
      async loadFromCompendiums(sources, type) {
        const items = [];
        for (const source of sources) {
          const pack = game.packs.get(source);
          if (!pack) {
            console.error(`Compendium '${source}' not found`);
            continue;
          }
  
          await pack.getIndex();
          const packItems = await pack.getDocuments();
          items.push(...packItems.filter(item => item.type === type));
        }
        return items;
      }
    }
  
    class Character {
      constructor(name) {
        this.name = name;
        this.characteristics = {
          strength: 0, dexterity: 0, constitution: 0, intelligence: 0,
          power: 0, charisma: 0
        };
        this.runes = {
          elemental: {}, form: {}, technique: {}, power: {}, condition: {}
        };
        this.skills = {
          Agility: [], Communication: [], Knowledge: [], Magic: [], Manipulation: [],
          Perception: [], Stealth: [], MeleeWeapons: [], MissileWeapons: []
        };
        this.passions = [];
        this.languages = {};
        this.gear = {
          armor: [], weapons: [], consumables: [], gear_items: []
        };
        this.cult = null;
        this.homeland = { name: null, tribe: null };
        this.occupation = null;
      }
  
      updateCharacteristic(name, value) {
        if (this.characteristics.hasOwnProperty(name)) {
          this.characteristics[name] = value;
        }
      }
  
      updateRune(name, value, operation = 'replace') {
        for (const category in this.runes) {
          if (this.runes[category][name] !== undefined) {
            switch (operation) {
              case 'add':
                this.runes[category][name] += value;
                break;
              case 'subtract':
                this.runes[category][name] -= value;
                break;
              case 'replace':
                this.runes[category][name] = value;
                break;
            }
            return;
          }
        }
        // If rune not found, add to 'elemental' as default
        this.runes.elemental[name] = value;
      }
  
      updateSkill(name, value, operation = 'replace') {
        for (const category in this.skills) {
          const skill = this.skills[category].find(skill => skill.name === name);
          if (skill) {
            switch (operation) {
              case 'add':
                skill.value += value;
                break;
              case 'subtract':
                skill.value -= value;
                break;
              case 'replace':
                skill.value = value;
                break;
            }
            return;
          }
        }
        // If skill not found, add to 'Agility' as default
        this.skills.Agility.push({ name, value });
      }
  
      addPassion(name, subject, value) {
        const passion = this.passions.find(p => p.name === name && p.subject === subject);
        if (passion) {
          passion.value = value;
        } else {
          this.passions.push({ name, subject, value });
        }
      }
  
      updatePassion(name, subject, value, operation = 'replace') {
        const passion = this.passions.find(passion => passion.name === name && passion.subject === subject);
        if (passion) {
          switch (operation) {
            case 'add':
              passion.value += value;
              break;
            case 'subtract':
              passion.value -= value;
              break;
            case 'replace':
              passion.value = value;
              break;
          }
        } else {
          const initialValue = 60;
          const newValue = operation === 'add' ? initialValue + value : initialValue - value;
          this.addPassion(name, subject, newValue);
        }
      }
  
      updateGear(category, item) {
        if (this.gear.hasOwnProperty(category)) {
          this.gear[category].push(item);
        }
      }
  
      chooseCult(cult) {
        this.cult = cult;
      }
  
      chooseHomeland(name, tribe) {
        this.homeland.name = name;
        this.homeland.tribe = tribe;
      }
  
      chooseOccupation(occupation) {
        this.occupation = occupation;
      }
  
      setLanguage(name, value) {
        this.languages[name] = value;
      }
    }
  
    // Placeholder for rollDice function
    function rollDice() {
      return Math.floor(Math.random() * 6) + 1; // Example: Roll a 6-sided die
    }
  
    let char = new Character("Adventurer");
    let library = new Library();
  
    (async () => {
      await library.loadCults(['wiki-en-rqg.cults']);
      await library.loadSkills(['wiki-en-rqg.skills', 'wiki-en-rqg.skills-weapons']);
      await library.loadRunes(['wiki-en-rqg.runes']);
      await library.loadGear(['wiki-en-rqg.equipment-gear']);
      await library.loadArmor(['wiki-en-rqg.equipment-armor']);
      await library.loadWeapon(['wiki-en-rqg.equipment-weapons']);
      await library.loadHitLocation();
      await library.loadPassions();
      
      // Show the char and library objects after loading
      console.log('Character:', char);
      console.log('Library:', library);
  
      // Example function calls from UI to set values
      char.chooseHomeland('Prax', 'Bison Rider');
      char.updateCharacteristic('strength', rollDice());
  
      // Find the rune by name and update it
      char.updateRune("Fire/Sky (element)", 75, 'replace');
  
      char.updateRune('truth', 75, 'replace');
      char.updateSkill('sword', 5, 'add');
      char.updateSkill('sword', 2, 'subtract');
      char.chooseCult(library.cults['Orlanth']);
      char.setLanguage('Heortling', 50);
  
      // Example of adding and updating passions
      char.addPassion('Loyalty', 'Family', 50);
      char.updatePassion('Loyalty', 'Family', 10, 'add'); // Increase loyalty to Family by 10
      char.updatePassion('Loyalty', 'Family', 5, 'subtract'); // Decrease loyalty to Family by 5
      char.updatePassion('Loyalty', 'Family', 70, 'replace'); // Set loyalty to Family to 70
      char.updatePassion('Devotion', 'Orlanth', 10, 'add'); // Create passion Devotion to Orlanth with initial value 70
      char.updatePassion('Devotion', 'Orlanth', 5, 'subtract'); // Decrease Devotion to Orlanth by 5
    })();
  })();
  