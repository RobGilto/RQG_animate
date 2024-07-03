(() => {
  class Library {
    constructor() {
      this.cults = {};
      this.skills = {};
      this.runes = {};
      this.gear = {};
      this.armor = {};
      this.weapons = {};
      this.categorizedRunes = { element: [], form: [], technique: [], power: [], condition: [] };
    }

    async loadCults(sources) {
      this.cults = await this.loadFromCompendiums(sources, 'cult');
    }

    async loadSkills(sources) {
      try {
        const skills = {
          Agility: { STR: 0, SIZ: 0, DEX: 0, POW: 0, total: 0, skills: {} },
          Communication: { STR: 0, SIZ: 0, DEX: 0, POW: 0, total: 0, skills: {} },
          Knowledge: { STR: 0, SIZ: 0, DEX: 0, POW: 0, total: 0, skills: {} },
          Magic: { STR: 0, SIZ: 0, DEX: 0, POW: 0, total: 0, skills: {} },
          Manipulation: { STR: 0, SIZ: 0, DEX: 0, POW: 0, total: 0, skills: {} },
          Perception: { STR: 0, SIZ: 0, DEX: 0, POW: 0, total: 0, skills: {} },
          Stealth: { STR: 0, SIZ: 0, DEX: 0, POW: 0, total: 0, skills: {} },
          MeleeWeapons: { STR: 0, SIZ: 0, DEX: 0, POW: 0, total: 0, skills: {} },
          MissileWeapons: { STR: 0, SIZ: 0, DEX: 0, POW: 0, total: 0, skills: {} }
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
              skills[category].skills[item.name] = {
                baseChance: item.system.baseChance,
                homelandMod: 0,
                total: item.system.baseChance
              };
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
        const categorizedRunes = {
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
            const type = item.system.runeType.type;
            if (categorizedRunes[type]) {
              categorizedRunes[type].push({ name: item.name, system: item.system });
            }
          });
        }

        this.categorizedRunes = categorizedRunes;
      } catch (error) {
        console.error("Error loading runes:", error);
        this.categorizedRunes = { element: [], form: [], technique: [], power: [], condition: [] };
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
        elemental: {}, power_form: {}
      };
      this.skills = {
        non_combat: {}, melee: {}, missile: {}
      };
      this.passions = { honor: 60 };
      this.languages = {};
      this.gear = {
        armor: [], weapons: [], consumables: [], gear_items: []
      };
      this.cult = null;
      this.homeland = null;
      this.occupation = null;
    }

    updateCharacteristic(name, value) {
      if (this.characteristics.hasOwnProperty(name)) {
        this.characteristics[name] = value;
      }
    }

    updateRune(category, name, value, operation = 'replace') {
      if (this.runes.hasOwnProperty(category)) {
        if (!this.runes[category][name]) {
          this.runes[category][name] = 0;
        }
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
      }
    }

    updateSkill(category, name, value, operation = 'replace') {
      if (this.skills.hasOwnProperty(category)) {
        if (!this.skills[category][name]) {
          this.skills[category][name] = { baseChance: 0, homelandMod: 0, total: 0 };
        }
        switch (operation) {
          case 'add':
            this.skills[category][name].total += value;
            break;
          case 'subtract':
            this.skills[category][name].total -= value;
            break;
          case 'replace':
            this.skills[category][name].total = value;
            break;
        }
      }
    }

    updatePassion(name, value) {
      this.passions[name] = value;
    }

    updateGear(category, item) {
      if (this.gear.hasOwnProperty(category)) {
        this.gear[category].push(item);
      }
    }

    chooseCult(cult) {
      this.cult = cult;
    }

    chooseHomeland(homeland) {
      this.homeland = homeland;
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
    
    // Show the char and library objects after loading
    console.log('Character:', char);
    console.log('Library:', library);

    // Example function calls from UI to set values
    char.chooseHomeland('Sartar');
    char.updateCharacteristic('strength', rollDice());

    // Find the rune by name and update it
    const runeName = "Fire/Sky (element)";
    const rune = library.categorizedRunes.element.find(r => r.name === runeName);
    if (rune) {
      char.updateRune('elemental', rune.name, 75, 'replace');
    } else {
      console.error(`Rune '${runeName}' not found`);
    }

    char.updateRune('power_form', 'truth', 75, 'replace');
    char.updateSkill('melee', 'sword', 5, 'add');
    char.updateSkill('melee', 'sword', 2, 'subtract');
    char.chooseCult(library.cults['Orlanth']);
    char.setLanguage('Heortling', 50);
  })();
})();
