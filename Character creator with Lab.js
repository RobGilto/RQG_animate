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
        "Lunar_Tarsh": ["Lunar Tarsh"],
        "Old_Tarsh": ["Old Tarsh"]
      };
      this.homelandPassions = {
        "Sartar": [
          { name: "Love", subject: "family", value: 60 },
          { name: "Loyalty", subject: "clan", value: 60 },
          { name: "Loyalty", subject: "tribe", value: 60 }
        ],
        "Esrolia": [
          { name: "Love", subject: "family", value: 60 },
          { name: "Loyalty", subject: "city", value: 60 },
          { name: "Loyalty", subject: "clan", value: 60 }
        ],
        "Grazeland": [
          { name: "Love", subject: "family", value: 60 },
          { name: "Loyalty", subject: "clan", value: 60 },
          { name: "Loyalty", subject: "Feathered Horse Queen or Luminous Stallion King", value: 60 }
        ],
        "Prax": [
          { name: "Hate", subject: "Chaos", value: 60 },
          { name: "Love", subject: "family", value: 60 },
          { name: "Loyalty", subject: "tribe", value: 60 }
        ],
        "Lunar_Tarsh": [
          { name: "Love", subject: "family", value: 60 },
          { name: "Loyalty", subject: "city", value: 60 },
          { name: "Loyalty", subject: "Red Emperor", value: 60 }
        ],
        "Old_Tarsh": [
          { name: "Love", subject: "family", value: 60 },
          { name: "Loyalty", subject: "city", value: 60 },
          { name: "Loyalty", subject: "Shaker Temple", value: 60 }
        ]
      };
      this.occupations = {
        "human": [
          "Assistant Shaman", "Bandit", "Chariot Driver", "Crafter", "Entertainer",
          "Farmer", "Fisher", "Healer", "Herder", "Hunter", "Merchant",
          "Noble", "Philosopher", "Priest", "Scribe", "Thief", "Warrior"
        ]
      };
      this.primaryRunes = {
        "Orlanth": "Air",
        "Ernalda": "Earth",
        // Add more cults and their primary runes here
      };
      this.races = {
        "Human": {
          characteristics: {
            STR: "3d6",
            DEX: "3d6",
            CON: "3d6",
            INT: "2d6+6",
            POW: "3d6",
            CHA: "3d6",
            SIZ: "2d6+6"
          },
          minAverage: 12
        },
        "Troll": {
          subraces: {
            "Dark Troll": {
              characteristics: {
                STR: "3d6+6",
                DEX: "2d6+6",
                CON: "3d6+6",
                INT: "3d6",
                POW: "3d6",
                CHA: "2d6",
                SIZ: "2d6+6"
              },
              minAverage: 12
            },
            "Trollkin": {
              characteristics: {
                STR: "2d6",
                DEX: "3d6",
                CON: "3d6",
                INT: "2d6",
                POW: "3d6",
                CHA: "2d6",
                SIZ: "2d6"
              },
              minAverage: 8
            }
          }
        }
      };
      this.homelandModifiers = {
        "Bison Rider": { SIZ: 2, DEX: -2 },
        "High Llama Rider": { SIZ: 1, DEX: -1 },
        "Impala Rider": { SIZ: -2, DEX: 2 },
        // Add other homeland modifiers as necessary
      };
      this.characteristicAliases = {
        str: 'strength',
        dex: 'dexterity',
        con: 'constitution',
        int: 'intelligence',
        pow: 'power',
        cha: 'charisma',
        siz: 'size'
      };
      this.complementaryRunes = {
        power: {
          "Truth": "Illusion",
          "Illusion": "Truth",
          "Harmony": "Disorder",
          "Disorder": "Harmony",
          "Stasis": "Movement",
          "Movement": "Stasis",
          "Fertility": "Death",
          "Death": "Fertility"
        },
        form: {
          "Man": "Beast",
          "Beast": "Man"
        }
      };
      this.runeAliases = {
        "fire/sky (element)": "Fire/Sky (element)",
        "earth (element)": "Earth (element)",
        "water (element)": "Water (element)",
        "moon (element)": "Moon (element)",
        "darkness (element)": "Darkness (element)",
        "air (element)": "Air (element)"
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
              runes[type].push(item.name);
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
        power: 0, charisma: 0, size: 0
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
      this.race = null;
      this.subrace = null;
    }

    initializeRunes() {
      for (const category in library.runes) {
        if (!this.runes[category]) {
          this.runes[category] = {};
        }
        library.runes[category].forEach(rune => {
          this.runes[category][rune] = 0;
        });
      }
    }

    updateCharacteristic(name, value) {
      const charName = library.characteristicAliases[name.toLowerCase()] || name.toLowerCase();
      if (this.characteristics.hasOwnProperty(charName)) {
        this.characteristics[charName] = value;
        
      } else {
        console.error(`Characteristic '${charName}' not found`);
      }
    }

    updateRune(name, value, operation = 'replace') {
      // Helper function to find the category of a rune
      const findRuneCategory = (runeName) => {
        for (const category in library.runes) {
          if (library.runes[category].some(rune => rune.includes(runeName))) {
            return category;
          }
        }
        return null;  // Return null if not found
      };

      const category = findRuneCategory(name);

      if (!category) {
        console.error(`Rune '${name}' not found in any category`);
        return;
      }

      

      // Update the rune value
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
      } else {
        this.runes[category][name] = value;
      }

      // Ensure the rune value is within the range [0, 100]
      this.runes[category][name] = Math.max(0, Math.min(100, this.runes[category][name]));

      // Handle complementary runes
      const complementaryRune = library.complementaryRunes[category] && library.complementaryRunes[category][name];
      if (complementaryRune) {
        this.runes[category][complementaryRune] = 100 - this.runes[category][name];
      }
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

    chooseCult(cultName) {
      const cult = library.cults.find(c => c.name.includes(cultName));
      if (cult) {
        this.cult = cult;
        const primaryRune = library.primaryRunes[cultName];
        if (primaryRune) {
          this.addPrimaryRuneToCategory(primaryRune);
        } else {
          console.error(`Primary rune for cult '${cultName}' not found`);
        }
      } else {
        console.error(`Cult '${cultName}' not found in library`);
      }
    }

    addPrimaryRuneToCategory(runeName) {

      for (const category of Object.keys(library.runes)) {
        
        const runesInCategory = library.runes[category];
        if (runesInCategory.some(rune => rune.includes(runeName))) {
          
          this.updateRune(runeName, 75, 'replace');
          return;  // Exit the method once the rune is found and added
        }
      }
      console.error(`Rune '${runeName}' not found in any category`);
    }

    chooseHomeland(name, tribe) {
      this.homeland.name = name;
      this.homeland.tribe = tribe;
      this.updateHomelandPassions(name);
      this.applyHomelandModifiers();
    }

    updateHomelandPassions(homeland) {
      const passions = library.homelandPassions[homeland];
      if (passions) {
        passions.forEach(passion => {
          this.addPassion(passion.name, passion.subject, passion.value);
        });
      }
    }

    applyHomelandModifiers() {
      const homeland = this.homeland.tribe || this.homeland.name;
      const modifiers = library.homelandModifiers[homeland];
      if (modifiers) {
        for (const [charName, value] of Object.entries(modifiers)) {
          this.updateCharacteristic(charName.toLowerCase(), this.characteristics[charName.toLowerCase()] + value);
          
        }
      }
    }

    chooseOccupation(occupation) {
      const adjustedOccupation = (this.homeland.name === "Prax" || this.homeland.name === "Grazeland") && occupation === "Farmer" ? "Herder" : occupation;
      this.occupation = adjustedOccupation;
    }

    setLanguage(name, value) {
      this.languages[name] = value;
    }

    rollDice(dice) {
      const parts = dice.split('d');
      const numDice = parseInt(parts[0]);
      const modifier = parts[1].includes('+') ? parseInt(parts[1].split('+')[1]) : 0;
      const sides = parts[1].includes('+') ? parseInt(parts[1].split('+')[0]) : parseInt(parts[1]);

      let total = 0;
      for (let i = 0; i < numDice; i++) {
        total += Math.floor(Math.random() * sides) + 1;
      }
      total += modifier;

      return total;
    }

    rollCharacteristics() {
      let characteristicsRolled;
      let totalSum;
      let numCharacteristics;
      let minAverage;
      let rolls;

      do {
        rolls = [];
        totalSum = 0;
        numCharacteristics = 0;

        const charRules = this.subrace ? library.races[this.race].subraces[this.subrace].characteristics : library.races[this.race].characteristics;
        minAverage = this.subrace ? library.races[this.race].subraces[this.subrace].minAverage : library.races[this.race].minAverage;

        for (const [key, dice] of Object.entries(charRules)) {
          const roll = this.rollDice(dice);
          rolls.push({ [key]: roll });
          totalSum += roll;
          numCharacteristics++;
        }
        characteristicsRolled = totalSum / numCharacteristics;
      } while (characteristicsRolled < minAverage);

      rolls.forEach(roll => {
        const key = Object.keys(roll)[0];
        const value = roll[key];
        this.updateCharacteristic(key, value);
      });

      
    }

    chooseRace(race, subrace = null) {
      this.race = race;
      this.subrace = subrace;
      this.rollCharacteristics();
    }
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
    
    // Initialize character runes based on the library runes
    char.initializeRunes();

    // Show the char and library objects after loading
    console.log('Character:', char);
    console.log('Library:', library);

    // Example function calls from UI to set values
    char.chooseRace('Human');
    char.chooseHomeland('Prax', 'Bison Rider');

    // Find the rune by name and update it
    char.updateRune("Fire/Sky (element)", 75, 'replace');

    char.updateRune('Truth', 75, 'replace'); // Using correct case for rune name
    char.updateSkill('sword', 5, 'add');
    char.updateSkill('sword', 2, 'subtract');
    char.chooseCult('Orlanth');
    char.setLanguage('Heortling', 50);

    // Example of adding and updating passions
    char.addPassion('Loyalty', 'Family', 50);
    char.updatePassion('Loyalty', 'Family', 10, 'add'); // Increase loyalty to Family by 10
    char.updatePassion('Loyalty', 'Family', 5, 'subtract'); // Decrease loyalty to Family by 5
    char.updatePassion('Loyalty', 'Family', 70, 'replace'); // Set loyalty to Family to 70
    char.updatePassion('Devotion', 'Orlanth', 10, 'add'); // Create passion Devotion to Orlanth with initial value 70
    char.updatePassion('Devotion', 'Orlanth', 5, 'subtract'); // Decrease Devotion to Orlanth by 5

    // Choose occupation and handle special case for Praxian or Grazelands Farmer
    char.chooseOccupation('Farmer');
    
  })();
})();
