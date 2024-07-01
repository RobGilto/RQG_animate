// Define the content for each page along with their titles
const pages = [
  { title: "Start", content: "Choose an Actor" },
  { title: "Details", content: "Select Race, Homeland, and Cult" },
  { title: "Cult", content: "Select Cult" },
  { title: "Runes", content: "Allocate Runes: Primary, Secondary, Tertiary" },
  { title: "Characteristics", content: "Organize Characteristics: STR, CON, SIZ, DEX, INT, POW, CHA" },
  { title: "Occupation", content: "Select Occupation" },
  { title: "Page 7", content: "Content for Page 7" },
  { title: "Page 8", content: "Content for Page 8" },
  { title: "Page 9", content: "Content for Page 9" }
];

// Global object to hold dropdown options and their corresponding data
const globalOptions = {
  races: {
    auto: { weight: 0 },
    human: { STR: "3D6", CON: "3D6", DEX: "3D6", POW: "3D6", CHA: "3D6", SIZ: "2D6+6", INT: "2D6+6", charAvg: 12, weight: 50, weightFunctions: [(details) => details.homeland === 'Sartar' ? 20 : 0] },
    darktroll: { STR: "3D6+6", CON: "3D6", DEX: "3D6", POW: "3D6", CHA: "3D6", SIZ: "2D6+6", INT: "2D6+6", charAvg: 12, weight: 50, weightFunctions: [(details) => details.homeland === 'Esrolia' ? 20 : 0] }
  },
  homelands: {
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
    },
    "Grazeland Pony Breeders": { 
      weight: 34,
      occupations: [
        "Assistant Shaman", "Bandit", "Crafter", "Entertainer", "Healer", "Herder", "Merchant", "Noble", 
        "Philosopher", "Priest", "Scribe", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"
      ]
    },
    "Praxian Tribes: Bison Rider": { 
      weight: 34,
      occupations: [
        "Assistant Shaman", "Bandit", "Crafter", "Entertainer", "Healer", "Herder", "Merchant", "Noble",
        "Philosopher", "Priest", "Scribe", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"
      ]
    },
    "Praxian Tribes: High Llama Rider": { 
      weight: 34,
      occupations: [
        "Assistant Shaman", "Bandit", "Crafter", "Entertainer", "Healer", "Herder", "Merchant", "Noble",
        "Philosopher", "Priest", "Scribe", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"
      ]
    },
    "Praxian Tribes: Impala Rider": { 
      weight: 34,
      occupations: [
        "Assistant Shaman", "Bandit", "Crafter", "Entertainer", "Healer", "Herder", "Merchant", "Noble",
        "Philosopher", "Priest", "Scribe", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"
      ]
    },
    "Praxian Tribes: Pol Joni": { 
      weight: 34,
      occupations: [
        "Assistant Shaman", "Bandit", "Crafter", "Entertainer", "Healer", "Herder", "Merchant", "Noble",
        "Philosopher", "Priest", "Scribe", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"
      ]
    },
    "Praxian Tribes: Sable Rider": { 
      weight: 34,
      occupations: [
        "Assistant Shaman", "Bandit", "Crafter", "Entertainer", "Healer", "Herder", "Merchant", "Noble",
        "Philosopher", "Priest", "Scribe", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"
      ]
    },
    "Lunar Tarsh": { 
      weight: 34,
      occupations: [
        "Assistant Shaman", "Bandit", "Chariot Driver", "Crafter", "Entertainer", "Farmer", "Fisher", "Healer",
        "Herder", "Merchant", "Noble", "Philosopher", "Priest", "Scribe", "Thief", "Warrior: Heavy Infantry",
        "Warrior: Light Infantry", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"
      ]
    },
    "Old Tarsh": { 
      weight: 34,
      occupations: [
        "Assistant Shaman", "Bandit", "Crafter", "Entertainer", "Farmer", "Fisher", "Healer", "Herder",
        "Merchant", "Noble", "Philosopher", "Priest", "Scribe", "Warrior: Light Infantry", 
        "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"
      ]
    }
  },
  occupations: {
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
  },
  cults: {
    auto: { weight: 0 },
    // Cults will be populated dynamically from the compendium
  }
};

// Initialize the current page index
let currentPage = 0;

// Global object to store selected actors and their details
let selectedActors = [];
let actorDetails = {};
let selectedCompendium = "wiki-en-rqg.runes"; // Set the correct compendium

// Function to load rune data from the selected compendium and categorize them by type
async function loadRunes() {
  try {
    const pack = game.packs.get(selectedCompendium);
    if (!pack) {
      console.error(`Compendium '${selectedCompendium}' not found`);
      return { element: [], form: [], technique: [], power: [], condition: [] };
    }
    await pack.getIndex(); // Load the index
    const runeItems = await pack.getDocuments(); // Load all items
    console.log("Loaded rune items:", runeItems);

    // Categorize runes by type
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

// Function to load skills data from the selected compendium and categorize them by type
async function loadSkills() {
  try {
    const skillPack = game.packs.get("wiki-en-rqg.skills");
    const weaponPack = game.packs.get("wiki-en-rqg.skills-weapons");

    if (!skillPack || !weaponPack) {
      console.error("Compendiums not found");
      return {};
    }

    await skillPack.getIndex(); // Load the index for skills
    await weaponPack.getIndex(); // Load the index for weapons
    const skillItems = await skillPack.getDocuments(); // Load all skill items
    const weaponItems = await weaponPack.getDocuments(); // Load all weapon items
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

// Function to load cults data from the selected compendium
async function loadCults() {
  try {
    const cultPack = game.packs.get("wiki-en-rqg.cults");

    if (!cultPack) {
      console.error("Cults compendium not found");
      return [];
    }

    await cultPack.getIndex(); // Load the index for cults
    const cultItems = await cultPack.getDocuments(); // Load all cult items
    console.log("Loaded cult items:", cultItems);

    return cultItems.map(cult => cult.name);
  } catch (error) {
    console.error("Error loading cults:", error);
    return [];
  }
}

// Function to get all actors
function getActors() {
  return game.actors.map(actor => actor);
}

// Function to apply weight functions as modifiers
function applyWeightFunctions(weight, weightFunctions, details) {
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

// Function to get weighted random selection from a list excluding "auto"
function getWeightedRandomSelection(list, actorId) {
  const details = actorDetails[actorId];
  const weights = Object.entries(list)
    .filter(([key]) => key !== 'auto')
    .map(([key, value]) => {
      const weight = applyWeightFunctions(value.weight, value.weightFunctions || value.weightFunction, details);
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

// Function to initialize rune details with default values
function initializeRuneDetails(categorizedRunes) {
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

// Function to find and set the homeland modifier for a rune
function setHomelandModifier(details, runeKey, modifier) {
  for (let key in details.runes.all) {
    if (key.includes(runeKey)) {
      details.runes.all[key].homelandMod = modifier;
      return;
    }
  }
  console.warn(`Rune key containing "${runeKey}" not found.`);
}

// Function to roll dice and return the sum
function rollDice(dice) {
  const match = dice.match(/(\d+)D(\d+)([+-]\d+)?/);
  if (!match) return 0;
  const [, count, sides, modifier] = match.map(Number);
  let total = 0;

  for (let i = 0; i < count; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return total + (modifier || 0);
}

// Function to roll characteristics for an actor
function rollCharacteristics(race, charAvg) {
  const characteristics = globalOptions.races[race];
  const values = {};
  let total = 0;

  do {
    total = 0;
    for (let char in characteristics) {
      if (char !== 'weight' && char !== 'weightFunctions' && char !== 'charAvg') {
        const value = rollDice(characteristics[char]);
        values[char] = { baseValue: value, primaryMod: 0, secondaryMod: 0, homelandMod: 0, total: 0 };
        total += value;
      }
    }
  } while (total / Object.keys(values).length < charAvg);

  return values;
}

// Function to load the details of the selected actor
function loadActorDetails(actorId) {
  const details = actorDetails[actorId];
  if (details) {
    const raceSelect = document.getElementById('race-select');
    const homelandSelect = document.getElementById('homeland-select');
    const cultSelect = document.getElementById('cult-select');

    if (raceSelect) raceSelect.value = details.race || 'human';
    if (homelandSelect) homelandSelect.value = details.homeland || 'auto';
    if (cultSelect) cultSelect.value = details.cult || 'auto';
  }
}

// Function to handle "auto" selections and set default values
function handleAutoSelections() {
  selectedActors.forEach(actor => {
    const details = actorDetails[actor.id];
    if (details.race === 'auto') details.race = getWeightedRandomSelection(globalOptions.races, actor.id);
    if (details.homeland === 'auto') details.homeland = getWeightedRandomSelection(globalOptions.homelands, actor.id);
    if (details.occupation === 'auto') details.occupation = getWeightedRandomSelection(globalOptions.occupations, actor.id);
    if (details.cult === 'auto') details.cult = getWeightedRandomSelection(globalOptions.cults, actor.id);

    // Apply homeland modifiers
    applyHomelandModifiers(details);
  });
}

// Function to log all selected actors and their details
function logSelectedActorsAndDetails(index) {
  console.log(`Index ${index} - Selected Actors and Details:`);
  selectedActors.forEach(actor => {
    const details = actorDetails[actor.id];
    console.log(`Index ${index} - Actor ID: ${actor.id}, Actor: ${actor.name}, Details:`, details);
  });
}

// Function to apply homeland modifiers to characteristics
function applyHomelandModifiers(details) {
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

// Function to update characteristics based on the rune selection
function updateCharacteristicsWithRunes(details) {
  const runeModifications = {
    "Darkness": ["SIZ", "CHA"],
    "Water": ["DEX", "CHA"],
    "Earth": ["CON", "CHA"],
    "Air": ["STR", "CHA"],
    "Fire/Sky": ["INT", "CHA"],
    "Moon": ["POW", "CHA"]
  };

  function applyRuneMod(rune, modValue, modType) {
    const options = runeModifications[rune];
    if (!options) return;
    const selectedChar = options[Math.floor(Math.random() * options.length)]; // Randomly choose one option
    details.characteristics[selectedChar][modType] += modValue;
  }

  // Apply primary rune modification
  applyRuneMod(details.runes.primary.split(" ")[0], 2, "primaryMod");

  // Apply secondary rune modification
  applyRuneMod(details.runes.secondary.split(" ")[0], 1, "secondaryMod");
}

// Function to calculate the total for each characteristic
function calculateCharacteristicsTotal(details) {
  for (const char in details.characteristics) {
    const characteristic = details.characteristics[char];
    characteristic.total = characteristic.baseValue + characteristic.primaryMod + characteristic.secondaryMod + characteristic.homelandMod;
  }
}

// Function to calculate attributes based on characteristics
function calculateAttributes(details) {
  const con = details.characteristics.CON.total;
  const siz = details.characteristics.SIZ.total;
  const str = details.characteristics.STR.total;
  const pow = details.characteristics.POW.total;
  const cha = details.characteristics.CHA.total;
  const dex = details.characteristics.DEX.total;

  // Calculate Healing Rate
  let healingRate = 1;
  if (con >= 7 && con <= 12) healingRate = 2;
  else if (con >= 13 && con <= 18) healingRate = 3;
  else if (con >= 19) healingRate = 3 + Math.floor((con - 13) / 6);

  // Calculate Hit Points Modifiers
  const sizMod = siz >= 1 && siz <= 4 ? -2 : siz >= 5 && siz <= 8 ? -1 : siz >= 13 && siz <= 16 ? 1 : siz >= 17 && siz <= 20 ? 2 : siz >= 21 && siz <= 24 ? 3 : siz >= 25 && siz <= 28 ? 4 : siz >= 29 ? Math.floor((siz - 21) / 4) + 3 : 0;
  const powMod = pow >= 1 && pow <= 4 ? -1 : pow >= 17 && pow <= 20 ? 1 : pow >= 21 && pow <= 24 ? 2 : pow >= 25 && pow >= 29 ? Math.floor((pow - 21) / 4) + 2 : 0;

  // Calculate Spirit Combat Damage
  const powCha = pow + cha;
  let spiritCombat = "1D3";
  if (powCha >= 13 && powCha <= 24) spiritCombat = "1D6";
  else if (powCha >= 25 && powCha <= 32) spiritCombat = "1D6+1";
  else if (powCha >= 33 && powCha <= 40) spiritCombat = "1D6+3";
  else if (powCha >= 41) spiritCombat = "2D6+3";

  // Calculate Damage Bonus
  const strSiz = str + siz;
  let damageBonus = "-1D4";
  if (strSiz >= 13 && strSiz <= 24) damageBonus = "—";
  else if (strSiz >= 25 && strSiz <= 32) damageBonus = "+1D4";
  else if (strSiz >= 33 && strSiz <= 40) damageBonus = "+1D6";
  else if (strSiz >= 41) damageBonus = "+2D6";

  // Calculate Max ENC
  const maxENC = Math.floor((str + con) / 2);

  // Calculate Agility Skills Modifiers
  const agilityModifiers = {
    STR: str <= 4 ? -5 : str >= 13 && str <= 16 ? 5 : str >= 17 ? Math.floor((str - 13) / 4) * 5 + 5 : 0,
    SIZ: siz <= 4 ? 5 : siz >= 17 ? Math.floor((siz - 13) / 4) * -5 - 5 : 0,
    DEX: dex <= 4 ? -10 : dex >= 5 && dex <= 8 ? -5 : dex >= 13 && dex <= 16 ? 5 : dex >= 17 ? Math.floor((dex - 13) / 4) * 5 + 10 : 0,
    POW: pow <= 4 ? -5 : pow >= 13 && pow <= 16 ? 5 : pow >= 17 ? Math.floor((pow - 13) / 4) * 5 + 5 : 0
  };

  // Set the calculated attributes
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

// Function to apply homeland skill modifiers
function applyHomelandSkillModifiers(details) {
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
    // Add other homelands with their cultural skills and weapons here...
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
    // Add other Praxian tribes here...
  };

  const homeland = details.homeland;
  let modifiers;

  if (homeland.startsWith("Praxian Tribes:")) {
    modifiers = praxianSkills[homeland];
  } else {
    modifiers = homelandSkills[homeland];
  }

  if (modifiers) {
    // Apply cultural skills
    for (const skill in modifiers.culturalSkills) {
      const skillName = skill.split(" (")[0]; // Normalize skill name without any details
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

    // Apply cultural weapons
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

// Create a function to render a specific page
async function renderPage(pageIndex) {
  const page = pages[pageIndex];
  let content = `<h2>${page.title}</h2><p>${page.content}</p>`;
  if (pageIndex === 0) {
    // Dropdown for actor selection on Page 1 (Start)
    let actors = getActors().filter(actor => !selectedActors.some(selected => selected.id === actor.id));
    content += `<select id="actor-select">${actors.map(actor => `<option value="${actor.id}">${actor.name}</option>`)}</select>`;
    content += `<button id="add-actor-button" style="margin-left: 10px;">Add Actor</button>`;
  } else if (pageIndex === 1) {
    // Dropdowns for race, homeland on Page 2 (Details)
    let actors = selectedActors.map(actor => `<option value="${actor.id}">${actor.name}</option>`).join('');
    content += `
      <div>
        <label for="actor-detail-select">Actor:</label>
        <select id="actor-detail-select">${actors}</select>
      </div>
      <div>
        <label for="race-select">Race:</label>
        <select id="race-select">${Object.keys(globalOptions.races).map(race => `<option value="${race}">${race}</option>`)}</select>
      </div>
      <div>
        <label for="homeland-select">Homeland:</label>
        <select id="homeland-select">${Object.keys(globalOptions.homelands).map(homeland => `<option value="${homeland}">${homeland}</option>`)}</select>
      </div>
    `;
    content += `<button id="sync-all-button" style="margin-top: 10px;">Sync All</button>`;
  }
 else if (pageIndex === 2) {
    // Dropdown for cults on Page 3
    let actors = selectedActors.map(actor => `<option value="${actor.id}">${actor.name}</option>`).join('');
    const details = actorDetails[selectedActors[0]?.id];
    const cults = await loadCults();
    content += `
      <div>
        <label for="actor-detail-cult-select">Actor:</label>
        <select id="actor-detail-cult-select">${actors}</select>
      </div>
      <div>
        <label for="cult-select">Cult:</label>
        <select id="cult-select">
          <option value="auto">auto</option>
          ${cults.map(cult => `<option value="${cult}">${cult}</option>`).join('')}
        </select>
      </div>
    `;
  } else if (pageIndex === 3) {
    // Dropdowns for primary, secondary, and tertiary runes on Page 4
    const categorizedRunes = await loadRunes();
    let actors = selectedActors.map(actor => `<option value="${actor.id}">${actor.name}</option>`).join('');
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
          <option value="default">default (${globalOptions.races[selectedActors[0]?.race]?.charAvg})</option>
          ${Array.from({ length: 14 }, (_, i) => i + 7).map(value => `<option value="${value}">${value}</option>`).join('')}
        </select>
      </div>
      <button id="sync-all-runes-button" style="margin-top: 10px;">Sync All</button>
    `;
  } else if (pageIndex === 4) {
    // Dropdown for characteristics on Page 5
    let actors = selectedActors.map(actor => `<option value="${actor.id}">${actor.name}</option>`).join('');
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
  }
   else if (pageIndex === 5) {
    // Dropdown for occupation on Page 5
    let actors = selectedActors.map(actor => `<option value="${actor.id}">${actor.name}</option>`).join('');
    const details = actorDetails[selectedActors[0]?.id];
    const occupations = details ? globalOptions.homelands[details.homeland].occupations : [];
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

// Create the side navigator content
function createSideNav() {
  return `
    <div id="side-nav" style="float: left; width: 20%; border-right: 1px solid #ccc; padding-right: 10px;">
      <ul>
        ${pages.map((page, index) => `<li style="margin-bottom: 5px;"><button class="nav-button" data-page="${index}">${page.title}</button></li>`).join('')}
      </ul>
    </div>
  `;
}

// Create the bottom sub-panel content
function createBottomPanel(pageIndex) {
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
    nextButton = pageIndex < pages.length - 1 ? `<button id="next-button">Next</button>` : '';
  }
  return `
    <div id="bottom-panel" style="width: 100%; border-top: 1px solid #ccc; padding-top: 10px; display: flex; justify-content: flex-end;">
      <button id="cancel-button">Cancel</button>
      <button id="save-button" style="margin-left: 10px;">Save</button>
      ${nextButton}
    </div>
  `;
}

// Create the dialog content including the side navigator, main page area, and bottom panel
async function createDialogContent(pageIndex) {
  return `
    <div style="display: flex; flex-direction: column; height: 100%;">
      <div style="flex-grow: 1; display: flex;">
        ${createSideNav()}
        <div id="main-content" style="flex-grow: 1; padding-left: 10px;">
          ${await renderPage(pageIndex)}
        </div>
      </div>
      ${createBottomPanel(pageIndex)}
    </div>
  `;
}

// Function to update the rune selections to avoid duplicates for the current actor
function updateRuneSelections(actorId) {
  const details = actorDetails[actorId];
  const primaryRune = details.runes.primary;
  const secondaryRune = details.runes.secondary;
  const tertiaryRune = details.runes.tertiary;

  const primarySelect = document.getElementById('primary-rune-select');
  const secondarySelect = document.getElementById('secondary-rune-select');
  const tertiarySelect = document.getElementById('tertiary-rune-select');

  const allRunes = Array.from(primarySelect.options).map(option => option.value);

  // Enable all options initially
  allRunes.forEach(rune => {
    const primaryOption = primarySelect.querySelector(`option[value="${rune}"]`);
    const secondaryOption = secondarySelect.querySelector(`option[value="${rune}"]`);
    const tertiaryOption = tertiarySelect.querySelector(`option[value="${rune}"]`);

    if (primaryOption) primaryOption.disabled = false;
    if (secondaryOption) secondaryOption.disabled = false;
    if (tertiaryOption) tertiaryOption.disabled = false;
  });

  // Disable selected options in other dropdowns for the current actor
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

// Function to handle auto rune selection
function handleAutoRuneSelection(actorId) {
  const details = actorDetails[actorId];
  const primarySelect = document.getElementById('primary-rune-select');
  const secondarySelect = document.getElementById('secondary-rune-select');
  const tertiarySelect = document.getElementById('tertiary-rune-select');

  if (!primarySelect || !secondarySelect || !tertiarySelect) {
    console.warn("Rune dropdown elements not found. Skipping auto rune selection.");
    return;
  }

  const allRunes = Array.from(primarySelect.options).map(option => option.value).filter(rune => rune !== 'auto');

  // Randomly select a rune while respecting previous selections
  function getRandomRune(excludeRunes) {
    const remainingRunes = allRunes.filter(rune => !excludeRunes.includes(rune));
    const randomIndex = Math.floor(Math.random() * remainingRunes.length);
    return remainingRunes[randomIndex];
  }

  const selectedRunes = [];
  if (details.runes.primary === 'auto') {
    details.runes.primary = getRandomRune(selectedRunes);
  }
  selectedRunes.push(details.runes.primary);

  if (details.runes.secondary === 'auto') {
    details.runes.secondary = getRandomRune(selectedRunes);
  }
  selectedRunes.push(details.runes.secondary);

  if (details.runes.tertiary === 'auto') {
    details.runes.tertiary = getRandomRune(selectedRunes);
  }
  selectedRunes.push(details.runes.tertiary);

  // Update the rune values
  details.runes.all[details.runes.primary].primaryMod = 60;
  details.runes.all[details.runes.secondary].secondaryMod = 40;
  details.runes.all[details.runes.tertiary].tertiaryMod = 20;

  // Apply rune modifications to characteristics
  updateCharacteristicsWithRunes(details);
}

// Function to apply auto selections to all actors
function applyAutoSelections() {
  selectedActors.forEach(actor => {
    const details = actorDetails[actor.id];
    handleAutoSelections(details);
    handleAutoRuneSelection(actor.id);
  });
}

// Function to load characteristics for the selected actor on page 4
function loadCharacteristics(actorId) {
  const details = actorDetails[actorId];
  const characteristics = details.characteristics;
  if (characteristics) {
    ['str', 'con', 'siz', 'dex', 'int', 'pow', 'cha'].forEach(char => {
      const select = document.getElementById(`${char}-select`);
      if (select) select.value = characteristics[char.toUpperCase()].baseValue || 0;
    });
  }
}

// Create the dialog
const dialog = new Dialog({
  title: "Multi-Page Dialog",
  content: await createDialogContent(currentPage),
  buttons: {},
  render: async (html) => {
    // Add event listener for the next button on Page 1
    html.find('#next-button-page-1').click(async () => {
      if (selectedActors.length === 0) {
        const actorId = html.find('#actor-select').val();
        const actor = game.actors.get(actorId);
        selectedActors.push(actor);
      
        const categorizedRunes = await loadRunes();
        const runeDetails = initializeRuneDetails(categorizedRunes);
      
        actorDetails[actorId] = {
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
          characteristics: rollCharacteristics('human', globalOptions.races.human.charAvg),
          attributes: {},
          skills: await loadSkills()
        };
      }
      
      logSelectedActorsAndDetails(1);
      currentPage++;
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the next button on Page 2
    html.find('#next-button-page-2').click(async () => {
      applyAutoSelections();
      logSelectedActorsAndDetails(2);
      currentPage++;
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the next button on Page 3
    html.find('#next-button-page-3').click(async () => {
      applyAutoSelections();
      logSelectedActorsAndDetails(3);
      currentPage++;
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the next button on Page 4
    html.find('#next-button-page-4').click(async () => {
      selectedActors.forEach(actor => {
        const details = actorDetails[actor.id];
        calculateCharacteristicsTotal(details); // Calculate total for characteristics
        calculateAttributes(details); // Calculate attributes based on characteristics
        applyHomelandSkillModifiers(details); // Apply homeland skill modifiers
      });
      logSelectedActorsAndDetails(4);
      currentPage++;
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the next button on Page 5
    html.find('#next-button-page-5').click(async () => {
      selectedActors.forEach(actor => {
        const details = actorDetails[actor.id];
        details.occupation = html.find('#occupation-select').val();
      });
      logSelectedActorsAndDetails(5);
      currentPage++;
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the next button on Page 6
    html.find('#next-button-page-6').click(async () => {
      selectedActors.forEach(actor => {
        const details = actorDetails[actor.id];
        if (details.cult === 'auto') details.cult = getWeightedRandomSelection(globalOptions.cults, actor.id);
      });
      logSelectedActorsAndDetails(6);
      currentPage++;
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listeners for dropdowns to dynamically save selections
    html.find('#actor-detail-select').change(function() {
      const actorId = $(this).val();
      loadActorDetails(actorId);
    });
    html.find('#race-select').change(function() {
      const actorId = html.find('#actor-detail-select').val();
      actorDetails[actorId].race = $(this).val();
      actorDetails[actorId].characteristics = rollCharacteristics($(this).val(), globalOptions.races[$(this).val()].charAvg);
      logSelectedActorsAndDetails();
    });
    html.find('#homeland-select').change(function() {
      const actorId = html.find('#actor-detail-select').val();
      actorDetails[actorId].homeland = $(this).val();
      logSelectedActorsAndDetails();
    });
    html.find('#cult-select').change(function() {
      const actorId = html.find('#actor-detail-select').val();
      actorDetails[actorId].cult = $(this).val();
      logSelectedActorsAndDetails();
    });

    // Add event listeners for rune dropdowns
    html.find('#actor-detail-rune-select').change(function() {
      const actorId = $(this).val();
      const details = actorDetails[actorId];
      document.getElementById('primary-rune-select').value = details.runes.primary || 'auto';
      document.getElementById('secondary-rune-select').value = details.runes.secondary || 'auto';
      document.getElementById('tertiary-rune-select').value = details.runes.tertiary || 'auto';
      updateRuneSelections(actorId);
    });

    html.find('#primary-rune-select').change(function() {
      const actorId = html.find('#actor-detail-rune-select').val();
      actorDetails[actorId].runes.primary = $(this).val();
      updateRuneSelections(actorId);
      logSelectedActorsAndDetails();
    });
    html.find('#secondary-rune-select').change(function() {
      const actorId = html.find('#actor-detail-rune-select').val();
      actorDetails[actorId].runes.secondary = $(this).val();
      updateRuneSelections(actorId);
      logSelectedActorsAndDetails();
    });
    html.find('#tertiary-rune-select').change(function() {
      const actorId = html.find('#actor-detail-rune-select').val();
      actorDetails[actorId].runes.tertiary = $(this).val();
      updateRuneSelections(actorId);
      logSelectedActorsAndDetails();
    });

    // Add event listeners for characteristic dropdowns
    html.find('#actor-detail-char-select').change(function() {
      const actorId = $(this).val();
      loadCharacteristics(actorId);
    });
    
    ['str', 'con', 'siz', 'dex', 'int', 'pow', 'cha'].forEach(char => {
      html.find(`#${char}-select`).change(function() {
        const actorId = html.find('#actor-detail-char-select').val();
        actorDetails[actorId].characteristics[char.toUpperCase()].baseValue = parseInt($(this).val());
        logSelectedActorsAndDetails();
      });
    });

    // Add event listeners for side navigator buttons
    html.find('.nav-button').click(async function() {
      currentPage = parseInt($(this).data('page'));
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the add actor button
    html.find('#add-actor-button').click(async () => {
      const actorId = html.find('#actor-select').val();
      const actor = game.actors.get(actorId);
      selectedActors.push(actor);

      const categorizedRunes = await loadRunes();
      const runeDetails = initializeRuneDetails(categorizedRunes);

      actorDetails[actorId] = {
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
        characteristics: rollCharacteristics('human', globalOptions.races.human.charAvg),
        attributes: {},
        skills: await loadSkills()
      };
      logSelectedActorsAndDetails();
      // Re-render the current page to update the list of selected actors and remove the added actor
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the sync all button on Page 2
    html.find('#sync-all-button').click(async () => {
      const actorId = html.find('#actor-detail-select').val();
      const details = actorDetails[actorId];
      for (const id in actorDetails) {
        actorDetails[id] = { ...details };
      }
      logSelectedActorsAndDetails();
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the sync all button on Page 3
    html.find('#sync-all-runes-button').click(async () => {
      const actorId = html.find('#actor-detail-rune-select').val();
      const details = actorDetails[actorId];
      for (const id in actorDetails) {
        actorDetails[id].runes.primary = details.runes.primary;
        actorDetails[id].runes.secondary = details.runes.secondary;
        actorDetails[id].runes.tertiary = details.runes.tertiary;
        actorDetails[id].runes.all = { ...details.runes.all };
      }
      logSelectedActorsAndDetails();
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the cancel button
    html.find('#cancel-button').click(() => {
      dialog.close();
    });

    // Add event listener for the save button
    html.find('#save-button').click(() => {
      logSelectedActorsAndDetails();
      // Add your save logic here
    });

    // Add event listener for actor selection on Occupation page
    html.find('#actor-detail-occupation-select').change(function() {
      const actorId = $(this).val();
      const details = actorDetails[actorId];
      const occupations = globalOptions.homelands[details.homeland].occupations;
      const occupationSelect = html.find('#occupation-select');
      occupationSelect.empty();
      occupationSelect.append(`<option value="auto">auto</option>`);
      occupations.forEach(occupation => {
        occupationSelect.append(`<option value="${occupation}">${occupation}</option>`);
      });
      occupationSelect.val(details.occupation || 'auto');
    });

    // Add event listener for occupation selection on Occupation page
    html.find('#occupation-select').change(function() {
      const actorId = html.find('#actor-detail-occupation-select').val();
      actorDetails[actorId].occupation = $(this).val();
      logSelectedActorsAndDetails();
    });

    // Set initial actor and occupation selection
    const initialActorId = html.find('#actor-detail-occupation-select').val();
    html.find('#actor-detail-occupation-select').change();
    html.find('#occupation-select').val(actorDetails[initialActorId]?.occupation || 'auto');

    // Load the initial details for the first actor on page 4
    if (currentPage === 3 && selectedActors.length > 0) {
      html.find('#actor-detail-char-select').change(function()(selectedActors[0].id);
    }
  }
}).render(true);
