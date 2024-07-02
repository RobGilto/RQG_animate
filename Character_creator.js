class Page {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
}

class GlobalOptions {
  constructor() {
    this.races = {
      auto: { weight: 0 },
      human: { STR: "3D6", CON: "3D6", DEX: "3D6", POW: "3D6", CHA: "3D6", SIZ: "2D6+6", INT: "2D6+6", charAvg: 12, weight: 50, weightFunctions: [(details) => details.homeland === 'Sartar' ? 20 : 0] },
      darktroll: { STR: "3D6+6", CON: "3D6", DEX: "3D6", POW: "3D6", CHA: "3D6", SIZ: "2D6+6", INT: "2D6+6", charAvg: 12, weight: 50, weightFunctions: [(details) => details.homeland === 'Esrolia' ? 20 : 0] }
    };
    this.homelands = {
      auto: { weight: 0, occupations: [] },
      "Sartar": {
        weight: 33,
        weightFunctions: [(details) => details.race === 'human' ? 17 : 0],
        occupations: [
          "Assistant Shaman", "Bandit", "Chariot Driver", "Crafter", "Entertainer", "Farmer", "Fisher", "Healer",
          "Herder", "Merchant", "Noble", "Philosopher", "Priest", "Scribe", "Thief", "Warrior: Heavy Infantry",
          "Warrior: Light Infantry", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"
        ]
      },
      "Esrolia": {
        weight: 33,
        weightFunctions: [(details) => details.race === 'darktroll' ? 17 : 0],
        occupations: [
          "Assistant Shaman", "Bandit", "Chariot Driver", "Crafter", "Entertainer", "Farmer", "Fisher", "Healer",
          "Herder", "Merchant", "Noble", "Philosopher", "Priest", "Scribe", "Thief", "Warrior: Heavy Infantry",
          "Warrior: Light Infantry", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"
        ]
      }
    };
    this.occupations = {
      auto: { weight: 0 },
      "Assistant Shaman": { weight: 40, weightFunctions: [(details) => details.cult === 'Cult 1' ? 20 : 0] },
      "Bandit": { weight: 30, weightFunctions: [(details) => details.cult === 'Cult 2' ? 20 : 0] },
      "Chariot Driver": { weight: 30 },
      "Crafter (Brewer, Carpenter, Jeweler, Leatherworker, Mason, Potter, Redsmith, Tanner, Weaver)": { weight: 30 },
      "Entertainer": { weight: 30 },
      "Farmer": { weight: 30 },
      "Fisher": { weight: 30 },
      "Healer": { weight: 30 },
      "Herder": { weight: 30 },
      "Merchant": { weight: 30 },
      "Noble": { weight: 30 },
      "Philosopher": { weight: 30 },
      "Priest": { weight: 30 },
      "Scribe": { weight: 30 },
      "Thief": { weight: 30 },
      "Warrior: Heavy Infantry": { weight: 30 },
      "Warrior: Light Infantry": { weight: 30 },
      "Warrior: Heavy Cavalry": { weight: 30 },
      "Warrior: Light Cavalry": { weight: 30 }
    };
    this.cults = {
      auto: { weight: 0 },
    };
  }

  async loadCults() {
    try {
      const cultPack = game.packs.get("wiki-en-rqg.cults");

      if (!cultPack) {
        console.error("Cults compendium not found");
        return [];
      }

      await cultPack.getIndex();
      const cultItems = await cultPack.getDocuments();
      console.log("Loaded cult items:", cultItems);

      return cultItems.map(cult => cult.name);
    } catch (error) {
      console.error("Error loading cults:", error);
      return [];
    }
  }

  async initialize() {
    const cults = await this.loadCults();
    cults.forEach(cult => {
      this.cults[cult] = { weight: 30 }; // Assuming a default weight, adjust as necessary
    });
  }
}

class CharacterGenerator {
  constructor() {
    this.pages = [
      new Page("Start", "Choose an Actor"),
      new Page("Details", "Select Race, Homeland, and Cult"),
      new Page("Runes", "Allocate Runes: Primary, Secondary, Tertiary"),
      new Page("Characteristics", "Organize Characteristics: STR, CON, SIZ, DEX, INT, POW, CHA"),
      new Page("Occupation", "Select Occupation"),
      new Page("Page 6", "Content for Page 6"),
      new Page("Page 7", "Content for Page 7"),
      new Page("Page 8", "Content for Page 8")
    ];
    this.globalOptions = new GlobalOptions();
    this.currentPage = 0;
    this.selectedActors = [];
    this.actorDetails = {};
    this.selectedCompendium = "wiki-en-rqg.runes";
  }

  async loadRunes() {
    try {
      const pack = game.packs.get(this.selectedCompendium);
      if (!pack) {
        console.error(`Compendium '${this.selectedCompendium}' not found`);
        return { element: [], form: [], technique: [], power: [], condition: [] };
      }
      await pack.getIndex();
      const runeItems = await pack.getDocuments();
      console.log("Loaded rune items:", runeItems);

      const categorizedRunes = {
        element: [],
        form: [],
        technique: [],
        power: [],
        condition: []
      };

      runeItems.forEach(item => {
        const type = item.system.runeType.type;
        if (categorizedRunes[type]) {
          categorizedRunes[type].push({ name: item.name, system: item.system });
        }
      });

      return categorizedRunes;
    } catch (error) {
      console.error("Error loading runes:", error);
      return { element: [], form: [], technique: [], power: [], condition: [] };
    }
  }

  async loadSkills() {
    try {
      const skillPack = game.packs.get("wiki-en-rqg.skills");
      const weaponPack = game.packs.get("wiki-en-rqg.skills-weapons");

      if (!skillPack || !weaponPack) {
        console.error("Compendiums not found");
        return {};
      }

      await skillPack.getIndex();
      await weaponPack.getIndex();
      const skillItems = await skillPack.getDocuments();
      const weaponItems = await weaponPack.getDocuments();
      console.log("Loaded skill items:", skillItems);
      console.log("Loaded weapon items:", weaponItems);

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

      skillItems.forEach(skill => {
        const category = skill.system.category.charAt(0).toUpperCase() + skill.system.category.slice(1);
        if (skills[category]) {
          skills[category].skills[skill.name] = { baseChance: skill.system.baseChance, homelandMod: 0, total: skill.system.baseChance };
        }
      });

      weaponItems.forEach(weapon => {
        const category = weapon.system.category === "missileWeapons" ? "MissileWeapons" : "MeleeWeapons";
        if (skills[category]) {
          skills[category].skills[weapon.name] = { baseChance: weapon.system.baseChance, homelandMod: 0, total: weapon.system.baseChance };
        }
      });

      return skills;
    } catch (error) {
      console.error("Error loading skills:", error);
      return {};
    }
  }

  getActors() {
    return game.actors.map(actor => actor);
  }

  applyWeightFunctions(weight, weightFunctions, details) {
    if (!weightFunctions) return weight;
    if (!Array.isArray(weightFunctions)) {
      weightFunctions = [weightFunctions];
    }

    return weightFunctions.reduce((modifiedWeight, func) => {
      if (typeof func === 'function') {
        const modifier = func(details);
        return modifiedWeight + modifier;
      }
      return modifiedWeight;
    }, weight);
  }

  getWeightedRandomSelection(list, actorId) {
    const details = this.actorDetails[actorId];
    const weights = Object.entries(list)
      .filter(([key]) => key !== 'auto')
      .map(([key, value]) => {
        const weight = this.applyWeightFunctions(value.weight, value.weightFunctions || value.weightFunction, details);
        return { key, weight };
      });

    const totalWeight = weights.reduce((sum, item) => sum + item.weight, 0);
    const randomWeight = Math.random() * totalWeight;

    let weightSum = 0;
    for (const item of weights) {
      weightSum += item.weight;
      if (randomWeight <= weightSum) {
        return item.key;
      }
    }
  }

  initializeRuneDetails(categorizedRunes) {
    const allRunes = [...categorizedRunes.element, ...categorizedRunes.power, ...categorizedRunes.form];
    const runeDetails = {};
    allRunes.forEach(rune => {
      runeDetails[rune.name] = {
        primaryMod: 0,
        secondaryMod: 0,
        tertiaryMod: 0,
        homelandMod: 0
      };
    });
    return runeDetails;
  }

  rollDice(dice) {
    const match = dice.match(/(\d+)D(\d+)([+-]\d+)?/);
    if (!match) return 0;
    const [, count, sides, modifier] = match.map(Number);
    let total = 0;
    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * sides) + 1;
    }
    return total + (modifier || 0);
  }

  rollCharacteristics(race, charAvg) {
    const characteristics = this.globalOptions.races[race];
    const values = {};
    let total = 0;

    do {
      total = 0;
      for (let char in characteristics) {
        if (char !== 'weight' && char !== 'weightFunctions' && char !== 'charAvg') {
          const value = this.rollDice(characteristics[char]);
          values[char] = { baseValue: value, primaryMod: 0, secondaryMod: 0, homelandMod: 0, total: 0 };
          total += value;
        }
      }
    } while (total / Object.keys(values).length < charAvg);

    return values;
  }

  async loadActorDetails(actorId) {
    const details = this.actorDetails[actorId];
    if (details) {
      const raceSelect = document.getElementById('race-select');
      const homelandSelect = document.getElementById('homeland-select');
      const cultSelect = document.getElementById('cult-select');

      if (raceSelect) raceSelect.value = details.race || 'human';
      if (homelandSelect) homelandSelect.value = details.homeland || 'auto';
      if (cultSelect) cultSelect.value = details.cult || 'auto';
    }
  }

  async handleAutoSelections() {
    this.selectedActors.forEach(actor => {
      const details = this.actorDetails[actor.id];
      if (details.race === 'auto') details.race = this.getWeightedRandomSelection(this.globalOptions.races, actor.id);
      if (details.homeland === 'auto') details.homeland = this.getWeightedRandomSelection(this.globalOptions.homelands, actor.id);
      if (details.cult === 'auto') details.cult = this.getWeightedRandomSelection(this.globalOptions.cults, actor.id);

      this.applyHomelandModifiers(details);
    });
  }

  handleAutoOccupationSelection(actorId) {
    const details = this.actorDetails[actorId];
    if (details.occupation === 'auto') {
      details.occupation = this.getWeightedRandomSelection(this.globalOptions.occupations, actorId);
    }
  }

  logSelectedActorsAndDetails(index) {
    console.log(`Index ${index} - Selected Actors and Details:`);
    this.selectedActors.forEach(actor => {
      const details = this.actorDetails[actor.id];
      console.log(`Index ${index} - Actor ID: ${actor.id}, Actor: ${actor.name}, Details:`, details);
    });
  }

  applyHomelandModifiers(details) {
    const homelandModifiers = {
      "Praxian Tribes: Bison Rider": { "SIZ": 2, "DEX": -2 },
      "Praxian Tribes: High Llama Rider": { "SIZ": 1, "DEX": -1 },
      "Praxian Tribes: Impala Rider": { "SIZ": -2, "DEX": 2 }
    };

    const modifiers = homelandModifiers[details.homeland] || {};
    for (const char in modifiers) {
      details.characteristics[char].homelandMod = modifiers[char];
    }
  }

  updateCharacteristicsWithRunes(details) {
    const runeModifications = {
      "Darkness": ["SIZ", "CHA"],
      "Water": ["DEX", "CHA"],
      "Earth": ["CON", "CHA"],
      "Air": ["STR", "CHA"],
      "Fire/Sky": ["INT", "CHA"],
      "Moon": ["POW", "CHA"]
    };

    const applyRuneMod = (rune, modValue, modType) => {
      const options = runeModifications[rune];
      if (!options) return;
      const selectedChar = options[Math.floor(Math.random() * options.length)];
      details.characteristics[selectedChar][modType] += modValue;
    };

    applyRuneMod(details.runes.primary.split(" ")[0], 2, "primaryMod");
    applyRuneMod(details.runes.secondary.split(" ")[0], 1, "secondaryMod");
  }

  calculateCharacteristicsTotal(details) {
    for (const char in details.characteristics) {
      const characteristic = details.characteristics[char];
      characteristic.total = characteristic.baseValue + characteristic.primaryMod + characteristic.secondaryMod + characteristic.homelandMod;
    }
  }

  calculateAttributes(details) {
    const con = details.characteristics.CON.total;
    const siz = details.characteristics.SIZ.total;
    const str = details.characteristics.STR.total;
    const pow = details.characteristics.POW.total;
    const cha = details.characteristics.CHA.total;
    const dex = details.characteristics.DEX.total;

    let healingRate = 1;
    if (con >= 7 && con <= 12) healingRate = 2;
    else if (con >= 13 && con <= 18) healingRate = 3;
    else if (con >= 19) healingRate = 3 + Math.floor((con - 13) / 6);

    const sizMod = siz >= 1 && siz <= 4 ? -2 : siz >= 5 && siz <= 8 ? -1 : siz >= 13 && siz <= 16 ? 1 : siz >= 17 && siz <= 20 ? 2 : siz >= 21 && siz <= 24 ? 3 : siz >= 25 && siz <= 28 ? 4 : siz >= 29 ? Math.floor((siz - 21) / 4) + 3 : 0;
    const powMod = pow >= 1 && pow <= 4 ? -1 : pow >= 17 && pow <= 20 ? 1 : pow >= 21 && pow <= 24 ? 2 : pow >= 25 && pow >= 29 ? Math.floor((pow - 21) / 4) + 2 : 0;

    const powCha = pow + cha;
    let spiritCombat = "1D3";
    if (powCha >= 13 && powCha <= 24) spiritCombat = "1D6";
    else if (powCha >= 25 && powCha <= 32) spiritCombat = "1D6+1";
    else if (powCha >= 33 && powCha <= 40) spiritCombat = "1D6+3";
    else if (powCha >= 41) spiritCombat = "2D6+3";

    const strSiz = str + siz;
    let damageBonus = "-1D4";
    if (strSiz >= 13 && strSiz <= 24) damageBonus = "—";
    else if (strSiz >= 25 && strSiz <= 32) damageBonus = "+1D4";
    else if (strSiz >= 33 && strSiz <= 40) damageBonus = "+1D6";
    else if (strSiz >= 41) damageBonus = "+2D6";

    const maxENC = Math.floor((str + con) / 2);

    const agilityModifiers = {
      STR: str <= 4 ? -5 : str >= 13 && str <= 16 ? 5 : str >= 17 ? Math.floor((str - 13) / 4) * 5 + 5 : 0,
      SIZ: siz <= 4 ? 5 : siz >= 17 ? Math.floor((siz - 13) / 4) * -5 - 5 : 0,
      DEX: dex <= 4 ? -10 : dex >= 5 && dex <= 8 ? -5 : dex >= 13 && dex <= 16 ? 5 : dex >= 17 ? Math.floor((dex - 13) / 4) * 5 + 10 : 0,
      POW: pow <= 4 ? -5 : pow >= 13 && pow <= 16 ? 5 : pow >= 17 ? Math.floor((pow - 13) / 4) * 5 + 5 : 0
    };

    details.attributes = {
      magicpoints: pow,
      hitpoints: {
        basevalue: Math.floor((con + siz) / 2),
        sizMod: sizMod,
        powMod: powMod
      },
      healingrate: healingRate,
      damagebonus: damageBonus,
      spiritcombat: spiritCombat,
      maxENC: maxENC,
      agilityModifiers: agilityModifiers
    };
  }

  applyHomelandSkillModifiers(details) {
    const homelandSkills = {
      "Sartar": {
        culturalSkills: {
          "Ride (any)": 5,
          "Dance": 5,
          "Sing": 10,
          "Speak Own Language (Heortling)": 50,
          "Speak Other Language (Tradetalk)": 10,
          "Customs (Heortling)": 25,
          "Farm": 20,
          "Herd": 10,
          "Spirit Combat": 15
        },
        culturalWeapons: {
          "Dagger": 10,
          "Battle Axe": 10,
          "1H Spear": 10,
          "Broadsword": 15,
          "Composite Bow": 10,
          "Javelin": 10,
          "Medium Shield": 15,
          "Large Shield": 10
        }
      },
      "Esrolia": {
        culturalSkills: {
          "Bargain": 5,
          "Dance": 10,
          "Intrigue": 5,
          "Sing": 5,
          "Speak Own Language (Esrolian)": 50,
          "Speak Other Language (Tradetalk)": 20,
          "Customs (Esrolian)": 25,
          "Farm": 25,
          "First Aid": 5,
          "Spirit Combat": 15
        },
        culturalWeapons: {
          "Battle Axe": 15,
          "1H Spear": 10,
          "Rapier": 10,
          "Self Bow": 10,
          "Thrown Axe": 10,
          "Small Shield": 15,
          "Medium Shield": 15,
          "Large Shield": 10
        }
      },
    };

    const praxianSkills = {
      "Praxian Tribes: Bison Rider": {
        culturalSkills: {
          "Ride (Bison)": 35,
          "Customs (Bison Tribe)": 25,
          "Herd": 30,
          "Peaceful Cut": 15,
          "Spirit Combat": 20
        },
        culturalWeapons: {
          "Dagger": 10,
          "Lance": 15,
          "Broadsword": 10,
          "Javelin": 10,
          "Medium Shield": 10
        }
      },
    };

    const homeland = details.homeland;
    let modifiers;

    if (homeland && homeland.startsWith("Praxian Tribes:")) {
      modifiers = praxianSkills[homeland];
    } else if (homeland) {
      modifiers = homelandSkills[homeland];
    }

    if (modifiers) {
      for (const skill in modifiers.culturalSkills) {
        const skillName = skill.split(" (")[0];
        const skillValue = modifiers.culturalSkills[skill];
        for (const category in details.skills) {
          for (const skillKey in details.skills[category].skills) {
            if (skillKey.startsWith(skillName)) {
              details.skills[category].skills[skillKey].homelandMod += skillValue;
              details.skills[category].skills[skillKey].total += skillValue;
            }
          }
        }
      }

      for (const weapon in modifiers.culturalWeapons) {
        for (const category of ["MeleeWeapons", "MissileWeapons"]) {
          if (details.skills[category].skills[weapon]) {
            details.skills[category].skills[weapon].homelandMod = modifiers.culturalWeapons[weapon];
            details.skills[category].skills[weapon].total += modifiers.culturalWeapons[weapon];
          }
        }
      }
    }
  }

  async renderPage(pageIndex) {
    const page = this.pages[pageIndex];
    let content = `<h2>${page.title}</h2><p>${page.content}</p>`;
    if (pageIndex === 0) {
      let actors = this.getActors().filter(actor => !this.selectedActors.some(selected => selected.id === actor.id));
      content += `<select id="actor-select">${actors.map(actor => `<option value="${actor.id}">${actor.name}</option>`)}</select>`;
      content += `<button id="add-actor-button" style="margin-left: 10px;">Add Actor</button>`;
    } else if (pageIndex === 1) {
      let actors = this.selectedActors.map(actor => `<option value="${actor.id}">${actor.name}</option>`).join('');
      content += `
        <div>
          <label for="actor-detail-select">Actor:</label>
          <select id="actor-detail-select">${actors}</select>
        </div>
        <div>
          <label for="race-select">Race:</label>
          <select id="race-select">${Object.keys(this.globalOptions.races).map(race => `<option value="${race}">${race}</option>`)}</select>
        </div>
        <div>
          <label for="homeland-select">Homeland:</label>
          <select id="homeland-select">${Object.keys(this.globalOptions.homelands).map(homeland => `<option value="${homeland}">${homeland}</option>`)}</select>
        </div>
        <div>
          <label for="cult-select">Cult:</label>
          <select id="cult-select">${Object.keys(this.globalOptions.cults).map(cult => `<option value="${cult}">${cult}</option>`)}</select>
        </div>
      `;
      content += `<button id="sync-all-button" style="margin-top: 10px;">Sync All</button>`;
    } else if (pageIndex === 2) {
      const categorizedRunes = await this.loadRunes();
      let actors = this.selectedActors.map(actor => `<option value="${actor.id}">${actor.name}</option>`).join('');
      content += `
        <div>
          <label for="actor-detail-rune-select">Actor:</label>
          <select id="actor-detail-rune-select">${actors}</select>
        </div>
        <div>
          <label for="primary-rune-select">Primary Rune:</label>
          <select id="primary-rune-select">
            <option value="auto">auto</option>
            ${categorizedRunes.element.map(rune => `<option value="${rune.name}">${rune.name}</option>`).join('')}
          </select>
        </div>
        <div>
          <label for="secondary-rune-select">Secondary Rune:</label>
          <select id="secondary-rune-select">
            <option value="auto">auto</option>
            ${categorizedRunes.element.map(rune => `<option value="${rune.name}">${rune.name}</option>`).join('')}
          </select>
        </div>
        <div>
          <label for="tertiary-rune-select">Tertiary Rune:</label>
          <select id="tertiary-rune-select">
            <option value="auto">auto</option>
            ${categorizedRunes.element.map(rune => `<option value="${rune.name}">${rune.name}</option>`).join('')}
          </select>
        </div>
        <div>
          <label for="char-avg-select">Characteristics Average:</label>
          <select id="char-avg-select">
            <option value="default">default (${this.globalOptions.races[this.selectedActors[0]?.race]?.charAvg})</option>
            ${Array.from({ length: 14 }, (_, i) => i + 7).map(value => `<option value="${value}">${value}</option>`).join('')}
          </select>
        </div>
        <button id="sync-all-runes-button" style="margin-top: 10px;">Sync All</button>
      `;
    } else if (pageIndex === 3) {
      let actors = this.selectedActors.map(actor => `<option value="${actor.id}">${actor.name}</option>`).join('');
      const characteristics = ['STR', 'CON', 'SIZ', 'DEX', 'INT', 'POW', 'CHA'];
      content += `
        <div>
          <label for="actor-detail-char-select">Actor:</label>
          <select id="actor-detail-char-select">${actors}</select>
        </div>
        ${characteristics.map(char => `
        <div>
          <label for="${char.toLowerCase()}-select">${char}:</label>
          <select id="${char.toLowerCase()}-select">
            ${Array.from({ length: 24 }, (_, i) => i + 3).map(value => `<option value="${value}">${value}</option>`).join('')}
          </select>
        </div>
        `).join('')}
      `;
    } else if (pageIndex === 4) {
      let actors = this.selectedActors.map(actor => `<option value="${actor.id}">${actor.name}</option>`).join('');
      const details = this.actorDetails[this.selectedActors[0]?.id];
      const occupations = details ? this.globalOptions.homelands[details.homeland]?.occupations || [] : [];
      content += `
        <div>
          <label for="actor-detail-occupation-select">Actor:</label>
          <select id="actor-detail-occupation-select">${actors}</select>
        </div>
        <div>
          <label for="occupation-select">Occupation:</label>
          <select id="occupation-select">
            <option value="auto">auto</option>
            ${occupations.map(occupation => `<option value="${occupation}">${occupation}</option>`).join('')}
          </select>
        </div>
      `;
    }
    return content;
  }

  createSideNav() {
    return `
      <div id="side-nav" style="float: left; width: 20%; border-right: 1px solid #ccc; padding-right: 10px;">
        <ul>
          ${this.pages.map((page, index) => `<li style="margin-bottom: 5px;"><button class="nav-button" data-page="${index}">${page.title}</button></li>`).join('')}
        </ul>
      </div>
    `;
  }

  createBottomPanel(pageIndex) {
    let nextButton;
    if (pageIndex === 0) {
      nextButton = `<button id="next-button-page-1" style="margin-left: 10px;">Next</button>`;
    } else if (pageIndex === 1) {
      nextButton = `<button id="next-button-page-2" style="margin-left: 10px;">Next</button>`;
    } else if (pageIndex === 2) {
      nextButton = `<button id="next-button-page-3" style="margin-left: 10px;">Next</button>`;
    } else if (pageIndex === 3) {
      nextButton = `<button id="next-button-page-4" style="margin-left: 10px;">Next</button>`;
    } else if (pageIndex === 4) {
      nextButton = `<button id="next-button-page-5" style="margin-left: 10px;">Next</button>`;
    } else if (pageIndex === 5) {
      nextButton = `<button id="next-button-page-6" style="margin-left: 10px;">Next</button>`;
    } else {
      nextButton = pageIndex < this.pages.length - 1 ? `<button id="next-button">Next</button>` : '';
    }
    return `
      <div id="bottom-panel" style="width: 100%; border-top: 1px solid #ccc; padding-top: 10px; display: flex; justify-content: flex-end;">
        <button id="cancel-button">Cancel</button>
        <button id="save-button" style="margin-left: 10px;">Save</button>
        ${nextButton}
      </div>
    `;
  }

  async createDialogContent(pageIndex) {
    console.log(`Index ${pageIndex} - Navigating to page: ${this.pages[pageIndex].title}`);
    return `
      <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="flex-grow: 1; display: flex;">
          ${this.createSideNav()}
          <div id="main-content" style="flex-grow: 1; padding-left: 10px;">
            ${await this.renderPage(pageIndex)}
          </div>
        </div>
        ${this.createBottomPanel(pageIndex)}
      </div>
    `;
  }

  loadCharacteristics(actorId) {
    const details = this.actorDetails[actorId];
    const characteristics = details.characteristics;
    if (characteristics) {
      ['str', 'con', 'siz', 'dex', 'int', 'pow', 'cha'].forEach(char => {
        const select = document.getElementById(`${char}-select`);
        if (select) select.value = characteristics[char.toUpperCase()].baseValue || 0;
      });
    }
  }

  updateRuneSelections(actorId) {
    const details = this.actorDetails[actorId];
    const primaryRune = details.runes.primary;
    const secondaryRune = details.runes.secondary;
    const tertiaryRune = details.runes.tertiary;

    const primarySelect = document.getElementById('primary-rune-select');
    const secondarySelect = document.getElementById('secondary-rune-select');
    const tertiarySelect = document.getElementById('tertiary-rune-select');

    const allRunes = Array.from(primarySelect.options).map(option => option.value);

    allRunes.forEach(rune => {
      const primaryOption = primarySelect.querySelector(`option[value="${rune}"]`);
      const secondaryOption = secondarySelect.querySelector(`option[value="${rune}"]`);
      const tertiaryOption = tertiarySelect.querySelector(`option[value="${rune}"]`);

      if (primaryOption) primaryOption.disabled = false;
      if (secondaryOption) secondaryOption.disabled = false;
      if (tertiaryOption) tertiaryOption.disabled = false;
    });

    if (primaryRune && primaryRune !== 'auto') {
      const secondaryOption = secondarySelect ? secondarySelect.querySelector(`option[value="${primaryRune}"]`) : null;
      const tertiaryOption = tertiarySelect ? tertiarySelect.querySelector(`option[value="${primaryRune}"]`) : null;

      if (secondaryOption) secondaryOption.disabled = true;
      if (tertiaryOption) tertiaryOption.disabled = true;
    }

    if (secondaryRune && secondaryRune !== 'auto') {
      const primaryOption = primarySelect ? primarySelect.querySelector(`option[value="${secondaryRune}"]`) : null;
      const tertiaryOption = tertiarySelect ? tertiarySelect.querySelector(`option[value="${secondaryRune}"]`) : null;

      if (primaryOption) primaryOption.disabled = true;
      if (tertiaryOption) tertiaryOption.disabled = true;
    }

    if (tertiaryRune && tertiaryRune !== 'auto') {
      const primaryOption = primarySelect ? primarySelect.querySelector(`option[value="${tertiaryRune}"]`) : null;
      const secondaryOption = secondarySelect ? secondarySelect.querySelector(`option[value="${tertiaryRune}"]`) : null;

      if (primaryOption) primaryOption.disabled = true;
      if (secondaryOption) secondaryOption.disabled = true;
    }
  }

  async run() {
    await this.globalOptions.initialize();

    const dialog = new Dialog({
      title: "Multi-Page Dialog",
      content: await this.createDialogContent(this.currentPage),
      buttons: {},
      render: async (html) => {
        html.find('#next-button-page-1').click(async () => {
          if (this.selectedActors.length === 0) {
            const actorId = html.find('#actor-select').val();
            const actor = game.actors.get(actorId);
            this.selectedActors.push(actor);

            const categorizedRunes = await this.loadRunes();
            const runeDetails = this.initializeRuneDetails(categorizedRunes);

            this.actorDetails[actorId] = {
              race: 'human',
              homeland: 'auto',
              occupation: 'auto',
              cult: 'auto',
              runes: {
                primary: 'auto',
                secondary: 'auto',
                tertiary: 'auto',
                formPrimary: 'auto',
                formSecondary: 'auto',
                powerPrimary: 'auto',
                powerSecondary: 'auto',
                all: runeDetails
              },
              characteristics: this.rollCharacteristics('human', this.globalOptions.races.human.charAvg),
              attributes: {},
              skills: await this.loadSkills()
            };
          }
          this.logSelectedActorsAndDetails(1);
          this.currentPage++;
          dialog.data.content = await this.createDialogContent(this.currentPage);
          dialog.render(true);
        });

        html.find('#next-button-page-2').click(async () => {
          await this.handleAutoSelections();
          this.logSelectedActorsAndDetails(2);
          this.currentPage++;
          dialog.data.content = await this.createDialogContent(this.currentPage);
          dialog.render(true);
        });

        html.find('#next-button-page-3').click(async () => {
          await this.handleAutoSelections();
          this.logSelectedActorsAndDetails(3);
          this.currentPage++;
          dialog.data.content = await this.createDialogContent(this.currentPage);
          dialog.render(true);
        });

        html.find('#next-button-page-4').click(async () => {
          this.selectedActors.forEach(actor => {
            const details = this.actorDetails[actor.id];
            this.calculateCharacteristicsTotal(details);
            this.calculateAttributes(details);
            this.applyHomelandSkillModifiers(details);
          });
          this.logSelectedActorsAndDetails(4);
          this.currentPage++;
          dialog.data.content = await this.createDialogContent(this.currentPage);
          dialog.render(true);
        });

        html.find('#next-button-page-5').click(async () => {
          this.selectedActors.forEach(actor => {
            this.handleAutoOccupationSelection(actor.id);
          });
          this.logSelectedActorsAndDetails(5);
          this.currentPage++;
          dialog.data.content = await this.createDialogContent(this.currentPage);
          dialog.render(true);
        });

        html.find('#actor-detail-occupation-select').change(() => {
          const actorId = html.find('#actor-detail-occupation-select').val();
          const details = this.actorDetails[actorId];
          const occupations = this.globalOptions.homelands[details.homeland]?.occupations || [];
          const occupationSelect = html.find('#occupation-select');
          occupationSelect.empty();
          occupationSelect.append(`<option value="auto">auto</option>`);
          occupations.forEach(occupation => {
            occupationSelect.append(`<option value="${occupation}">${occupation}</option>`);
          });
          occupationSelect.val(details.occupation || 'auto');
        });

        html.find('#occupation-select').change(() => {
          const actorId = html.find('#actor-detail-occupation-select').val();
          this.actorDetails[actorId].occupation = html.find('#occupation-select').val();
          this.logSelectedActorsAndDetails();
        });

        const initialActorId = html.find('#actor-detail-occupation-select').val();
        html.find('#actor-detail-occupation-select').change();
        html.find('#occupation-select').val(this.actorDetails[initialActorId]?.occupation || 'auto');

        html.find('#next-button-page-6').click(async () => {
          this.selectedActors.forEach(actor => {
            const details = this.actorDetails[actor.id];
            if (details.cult === 'auto') details.cult = this.getWeightedRandomSelection(this.globalOptions.cults, actor.id);
          });
          this.logSelectedActorsAndDetails(6);
          this.currentPage++;
          dialog.data.content = await this.createDialogContent(this.currentPage);
          dialog.render(true);
        });

        html.find('#actor-detail-select').change(() => {
          const actorId = html.find('#actor-detail-select').val();
          this.loadActorDetails(actorId);
        });

        html.find('#race-select').change(() => {
          const actorId = html.find('#actor-detail-select').val();
          this.actorDetails[actorId].race = html.find('#race-select').val();
          this.actorDetails[actorId].characteristics = this.rollCharacteristics(html.find('#race-select').val(), this.globalOptions.races[html.find('#race-select').val()].charAvg);
          this.logSelectedActorsAndDetails();
        });

        html.find('#homeland-select').change(() => {
          const actorId = html.find('#actor-detail-select').val();
          this.actorDetails[actorId].homeland = html.find('#homeland-select').val();
          this.logSelectedActorsAndDetails();
        });

        html.find('#cult-select').change(() => {
          const actorId = html.find('#actor-detail-select').val();
          this.actorDetails[actorId].cult = html.find('#cult-select').val();
          this.logSelectedActorsAndDetails();
        });

        html.find('#actor-detail-rune-select').change(() => {
          const actorId = html.find('#actor-detail-rune-select').val();
          const details = this.actorDetails[actorId];
          document.getElementById('primary-rune-select').value = details.runes.primary || 'auto';
          document.getElementById('secondary-rune-select').value = details.runes.secondary || 'auto';
          document.getElementById('tertiary-rune-select').value = details.runes.tertiary || 'auto';
          this.updateRuneSelections(actorId);
        });

        html.find('#primary-rune-select').change(() => {
          const actorId = html.find('#actor-detail-rune-select').val();
          this.actorDetails[actorId].runes.primary = html.find('#primary-rune-select').val();
          this.updateRuneSelections(actorId);
          this.logSelectedActorsAndDetails();
        });

        html.find('#secondary-rune-select').change(() => {
          const actorId = html.find('#actor-detail-rune-select').val();
          this.actorDetails[actorId].runes.secondary = html.find('#secondary-rune-select').val();
          this.updateRuneSelections(actorId);
          this.logSelectedActorsAndDetails();
        });

        html.find('#tertiary-rune-select').change(() => {
          const actorId = html.find('#actor-detail-rune-select').val();
          this.actorDetails[actorId].runes.tertiary = html.find('#tertiary-rune-select').val();
          this.updateRuneSelections(actorId);
          this.logSelectedActorsAndDetails();
        });

        html.find('#actor-detail-char-select').change(() => {
          const actorId = html.find('#actor-detail-char-select').val();
          this.loadCharacteristics(actorId);
        });

        ['str', 'con', 'siz', 'dex', 'int', 'pow', 'cha'].forEach(char => {
          html.find(`#${char}-select`).change(() => {
            const actorId = html.find('#actor-detail-char-select').val();
            this.actorDetails[actorId].characteristics[char.toUpperCase()].baseValue = parseInt(html.find(`#${char}-select`).val());
            this.logSelectedActorsAndDetails();
          });
        });

        html.find('.nav-button').click(async () => {
          this.currentPage = parseInt(html.find('.nav-button').data('page'));
          dialog.data.content = await this.createDialogContent(this.currentPage);
          dialog.render(true);
        });

        html.find('#add-actor-button').click(async () => {
          const actorId = html.find('#actor-select').val();
          const actor = game.actors.get(actorId);
          this.selectedActors.push(actor);

          const categorizedRunes = await this.loadRunes();
          const runeDetails = this.initializeRuneDetails(categorizedRunes);

          this.actorDetails[actorId] = {
            race: 'human',
            homeland: 'auto',
            occupation: 'auto',
            cult: 'auto',
            runes: {
              primary: 'auto',
              secondary: 'auto',
              tertiary: 'auto',
              all: runeDetails
            },
            characteristics: this.rollCharacteristics('human', this.globalOptions.races.human.charAvg),
            attributes: {},
            skills: await this.loadSkills()
          };
          this.logSelectedActorsAndDetails();
          dialog.data.content = await this.createDialogContent(this.currentPage);
          dialog.render(true);
        });

        html.find('#sync-all-button').click(async () => {
          const actorId = html.find('#actor-detail-select').val();
          const details = this.actorDetails[actorId];
          for (const id in this.actorDetails) {
            this.actorDetails[id] = { ...details };
          }
          this.logSelectedActorsAndDetails();
          dialog.data.content = await this.createDialogContent(this.currentPage);
          dialog.render(true);
        });

        html.find('#sync-all-runes-button').click(async () => {
          const actorId = html.find('#actor-detail-rune-select').val();
          const details = this.actorDetails[actorId];
          for (const id in this.actorDetails) {
            this.actorDetails[id].runes.primary = details.runes.primary;
            this.actorDetails[id].runes.secondary = details.runes.secondary;
            this.actorDetails[id].runes.tertiary = details.runes.tertiary;
            this.actorDetails[id].runes.all = { ...details.runes.all };
          }
          this.logSelectedActorsAndDetails();
          dialog.data.content = await this.createDialogContent(this.currentPage);
          dialog.render(true);
        });

        html.find('#cancel-button').click(() => {
          dialog.close();
        });

        html.find('#save-button').click(() => {
          this.logSelectedActorsAndDetails();
        });

        if (this.currentPage === 3 && this.selectedActors.length > 0) {
          this.loadCharacteristics(this.selectedActors[0].id);
        }
      }
    }).render(true);
  }
}

const generator = new CharacterGenerator();
generator.run();


const generator = new CharacterGenerator();
generator.run();
