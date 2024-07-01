// Define the content for each page along with their titles
const pages = [
  { title: "Start", content: "Choose an Actor" },
  { title: "Details", content: "Select Race, Homeland, Occupation, and Cult" },
  { title: "Runes", content: "Allocate Runes: Primary, Secondary, Tertiary" },
  { title: "Characteristics", content: "Organize Characteristics: STR, CON, SIZ, DEX, INT, POW, CHA" },
  { title: "Occupation", content: "Choose an Occupation" },
  { title: "Cult", content: "Select a Cult" },
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
    "Sartar": { weight: 33, occupations: ["Assistant Shaman", "Bandit", "Chariot Driver", "Crafter", "Entertainer", "Farmer", "Fisher", "Healer", "Herder", "Hunter", "Merchant", "Noble", "Philosopher", "Priest", "Scribe", "Thief", "Warrior: Heavy Infantry", "Warrior: Light Infantry", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"], weightFunctions: [(details) => details.race === 'human' ? 17 : 0] },
    "Esrolia": { weight: 33, occupations: ["Assistant Shaman", "Bandit", "Chariot Driver", "Crafter", "Entertainer", "Farmer", "Fisher", "Healer", "Herder", "Hunter", "Merchant", "Noble", "Philosopher", "Priest", "Scribe", "Thief", "Warrior: Heavy Infantry", "Warrior: Light Infantry", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"], weightFunctions: [(details) => details.race === 'darktroll' ? 17 : 0] },
    "Grazeland Pony Breeders": { weight: 34, occupations: ["Assistant Shaman", "Bandit", "Entertainer", "Healer", "Herder", "Hunter", "Merchant", "Noble", "Philosopher", "Priest", "Scribe", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"] },
    "Praxian Tribes: Bison Rider": { weight: 34, occupations: ["Assistant Shaman", "Bandit", "Entertainer", "Healer", "Herder", "Hunter", "Merchant", "Noble", "Philosopher", "Priest", "Scribe", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"] },
    "Praxian Tribes: High Llama Rider": { weight: 34, occupations: ["Assistant Shaman", "Bandit", "Entertainer", "Healer", "Herder", "Hunter", "Merchant", "Noble", "Philosopher", "Priest", "Scribe", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"] },
    "Praxian Tribes: Impala Rider": { weight: 34, occupations: ["Assistant Shaman", "Bandit", "Entertainer", "Healer", "Herder", "Hunter", "Merchant", "Noble", "Philosopher", "Priest", "Scribe", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"] },
    "Praxian Tribes: Pol Joni": { weight: 34, occupations: ["Assistant Shaman", "Bandit", "Entertainer", "Healer", "Herder", "Hunter", "Merchant", "Noble", "Philosopher", "Priest", "Scribe", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"] },
    "Praxian Tribes: Sable Rider": { weight: 34, occupations: ["Assistant Shaman", "Bandit", "Entertainer", "Healer", "Herder", "Hunter", "Merchant", "Noble", "Philosopher", "Priest", "Scribe", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"] },
    "Lunar Tarsh": { weight: 34, occupations: ["Assistant Shaman", "Bandit", "Chariot Driver", "Crafter", "Entertainer", "Farmer", "Fisher", "Healer", "Herder", "Hunter", "Merchant", "Noble", "Philosopher", "Priest", "Scribe", "Thief", "Warrior: Heavy Infantry", "Warrior: Light Infantry", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"] },
    "Old Tarsh": { weight: 34, occupations: ["Assistant Shaman", "Bandit", "Crafter", "Entertainer", "Farmer", "Fisher", "Healer", "Herder", "Hunter", "Merchant", "Noble", "Philosopher", "Priest", "Scribe", "Thief", "Warrior: Light Infantry", "Warrior: Heavy Cavalry", "Warrior: Light Cavalry"] }
  },
  occupations: {
    auto: { weight: 0 },
    "Assistant Shaman": { weight: 40 },
    "Bandit": { weight: 30 },
    "Chariot Driver": { weight: 30 },
    "Crafter": { weight: 30 },
    "Entertainer": { weight: 30 },
    "Farmer": { weight: 30 },
    "Fisher": { weight: 30 },
    "Healer": { weight: 30 },
    "Herder": { weight: 30 },
    "Hunter": { weight: 30 },
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
    // Add other cults dynamically
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
      console.error("Skill or Weapon Compendium not found");
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
      MeleeWeapons: { STR: 0, SIZ: 0, DEX: 0, POW: 0, total: 0, skills: {} },
      MissileWeapons: { STR: 0, SIZ: 0, DEX: 0, POW: 0, total: 0, skills: {} },
      Perception: { STR: 0, SIZ: 0, DEX: 0, POW: 0, total: 0, skills: {} },
      Stealth: { STR: 0, SIZ: 0, DEX: 0, POW: 0, total: 0, skills: {} }
    };

    skillItems.forEach(item => {
      const category = item.system.category.toLowerCase();
      if (skills[category]) {
        skills[category].skills[item.name] = { baseChance: item.system.baseChance, homelandMod: 0, total: item.system.baseChance };
      }
    });

    weaponItems.forEach(item => {
      const category = item.system.category.toLowerCase();
      if (skills[category]) {
        skills[category].skills[item.name] = { baseChance: item.system.baseChance, homelandMod: 0, total: item.system.baseChance };
      }
    });

    return skills;
  } catch (error) {
    console.error("Error loading skills:", error);
    return {};
  }
}

// Function to load cults from the compendium
async function loadCults() {
  try {
    const pack = game.packs.get("wiki-en-rqg.cults");
    if (!pack) {
      console.error("Cults compendium not found");
      return [];
    }

    await pack.getIndex();
    const cultItems = await pack.getDocuments();
    console.log("Loaded cult items:", cultItems);

    const cultNames = cultItems.map(item => item.name);
    return cultNames;
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
        values[char] = value;
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
    const occupationSelect = document.getElementById('occupation-select');
    const cultSelect = document.getElementById('cult-select');

    if (raceSelect) raceSelect.value = details.race || 'human';
    if (homelandSelect) homelandSelect.value = details.homeland || 'auto';
    if (occupationSelect) occupationSelect.value = details.occupation || 'auto';
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
    if (details.homeland === 'Sartar') setHomelandModifier(details, 'Air', 10);
    if (details.homeland === 'Esrolia') setHomelandModifier(details, 'Earth', 10);
    if (details.homeland === 'Grazeland Pony Breeders') setHomelandModifier(details, 'Fire/Sky', 10);
    if (details.homeland === 'Praxian Tribes: Bison Rider') setHomelandModifier(details, 'Air', 10);
    if (details.homeland === 'Praxian Tribes: High Llama Rider') setHomelandModifier(details, 'Water', 10);
    if (details.homeland === 'Praxian Tribes: Impala Rider') setHomelandModifier(details, 'Fire/Sky', 10);
    if (details.homeland === 'Praxian Tribes: Pol Joni') setHomelandModifier(details, 'Air', 10);
    if (details.homeland === 'Praxian Tribes: Sable Rider') setHomelandModifier(details, 'Moon', 10);
    if (details.homeland === 'Lunar Tarsh') setHomelandModifier(details, 'Moon', 10);
    if (details.homeland === 'Old Tarsh') setHomelandModifier(details, 'Earth', 10);
  });
}

// Function to log all selected actors and their details
function logSelectedActorsAndDetails() {
  console.log("Selected Actors and Details:");
  selectedActors.forEach(actor => {
    const details = actorDetails[actor.id];
    console.log(`Actor ID: ${actor.id}, Actor: ${actor.name}, Details:`, details);
  });
}

// Function to calculate characteristics total
function calculateCharacteristicsTotal(details) {
  for (const char in details.characteristics) {
    const characteristic = details.characteristics[char];
    characteristic.total = characteristic.baseValue + characteristic.primaryMod + characteristic.secondaryMod + characteristic.homelandMod;
  }
}

// Function to calculate attributes based on characteristics
function calculateAttributes(details) {
  const char = details.characteristics;
  const attributes = details.attributes;

  // Magic Points (same as POW total)
  attributes.magicpoints = char.POW.total;

  // Hit Points
  attributes.hitpoints = {
    basevalue: 0,
    sizMod: 0,
    powMod: 0,
    total: 0
  };
  if (char.SIZ.total >= 1 && char.SIZ.total <= 4) attributes.hitpoints.sizMod = -2;
  else if (char.SIZ.total >= 5 && char.SIZ.total <= 8) attributes.hitpoints.sizMod = -1;
  else if (char.SIZ.total >= 13 && char.SIZ.total <= 16) attributes.hitpoints.sizMod = 1;
  else if (char.SIZ.total >= 17 && char.SIZ.total <= 20) attributes.hitpoints.sizMod = 2;
  else if (char.SIZ.total >= 21 && char.SIZ.total <= 24) attributes.hitpoints.sizMod = 3;
  else if (char.SIZ.total >= 25 && char.SIZ.total <= 28) attributes.hitpoints.sizMod = 4;
  if (char.POW.total >= 1 && char.POW.total <= 4) attributes.hitpoints.powMod = -1;
  else if (char.POW.total >= 17 && char.POW.total <= 20) attributes.hitpoints.powMod = 1;
  else if (char.POW.total >= 21 && char.POW.total <= 24) attributes.hitpoints.powMod = 2;
  else if (char.POW.total >= 25 && char.POW.total <= 28) attributes.hitpoints.powMod = 3;
  attributes.hitpoints.total = attributes.hitpoints.basevalue + attributes.hitpoints.sizMod + attributes.hitpoints.powMod;

  // Healing Rate
  if (char.CON.total <= 6) attributes.healingrate = 1;
  else if (char.CON.total >= 7 && char.CON.total <= 12) attributes.healingrate = 2;
  else if (char.CON.total >= 13 && char.CON.total <= 18) attributes.healingrate = 3;
  else attributes.healingrate = 3 + Math.floor((char.CON.total - 13) / 6);

  // Damage Bonus
  const strSizTotal = char.STR.total + char.SIZ.total;
  if (strSizTotal <= 12) attributes.damagebonus = '-1D4';
  else if (strSizTotal >= 25 && strSizTotal <= 32) attributes.damagebonus = '+1D6+1';
  else if (strSizTotal >= 33 && strSizTotal <= 40) attributes.damagebonus = '+1D6+3';
  else if (strSizTotal >= 41 && strSizTotal <= 56) attributes.damagebonus = '+2D6+3';
  else attributes.damagebonus = '-';

  // Spirit Combat Damage
  const powChaTotal = char.POW.total + char.CHA.total;
  if (powChaTotal <= 12) attributes.spiritcombat = '1D3';
  else if (powChaTotal >= 13 && powChaTotal <= 24) attributes.spiritcombat = '1D6';
  else if (powChaTotal >= 25 && powChaTotal <= 32) attributes.spiritcombat = '1D6+1';
  else if (powChaTotal >= 33 && powChaTotal <= 40) attributes.spiritcombat = '1D6+3';
  else attributes.spiritcombat = '2D6+3';

  // Max ENC
  attributes.maxENC = Math.floor((char.STR.total + char.CON.total) / 2);
}

// Function to apply homeland skill modifiers
function applyHomelandSkillModifiers(details) {
  const modifiers = {
    "Sartar": {
      culturalSkills: { "Ride": 5, "Dance": 5, "Sing": 10, "Speak Own Language (Heortling)": 50, "Speak Other Language (Tradetalk)": 10, "Customs (Heortling)": 10, "Farm": 20, "Herd": 10, "Spirit Combat": 15 },
      culturalWeapons: { "Dagger": 10, "Battle Axe": 10, "1H Spear": 10, "Broadsword": 15, "Composite Bow": 10, "Sling": 10, "Javelin": 10, "Medium Shield": 15, "Large Shield": 10 }
    },
    "Esrolia": {
      culturalSkills: { "Bargain": 5, "Dance": 10, "Intrigue": 5, "Sing": 5, "Speak Own Language (Esrolian)": 50, "Speak Other Language (Tradetalk)": 20, "Customs (Esrolian)": 10, "Farm": 25, "First Aid": 5, "Spirit Combat": 15 },
      culturalWeapons: { "Battle Axe": 15, "1H Spear": 10, "Rapier": 10, "Self Bow": 10, "Thrown Axe": 10, "Small Shield": 15, "Medium Shield": 15, "Large Shield": 10 }
    },
    "Grazeland Pony Breeders": {
      culturalSkills: { "Ride (Horse)": 35, "Speak Own Language (Pure Horse Tongue)": 50, "Speak Other Language (Tradetalk)": 10, "Customs (Grazeland Pony Breeders)": 10, "Herd": 35, "Spirit Combat": 15 },
      culturalWeapons: { "Dagger": 10, "Lance": 15, "Broadsword": 10, "Composite Bow": 15, "Small Shield": 15, "Medium Shield": 10 }
    },
    "Praxian Tribes: Bison Rider": {
      culturalSkills: { "Ride (Bison)": 35, "Customs (Bison Tribe)": 10, "Herd": 30, "Peaceful Cut": 15, "Spirit Combat": 20 },
      culturalWeapons: { "Dagger": 10, "Lance": 15, "Broadsword": 10, "Javelin": 10, "Medium Shield": 10 }
    },
    "Praxian Tribes: High Llama Rider": {
      culturalSkills: { "Ride (High Llama)": 35, "Customs (High Llama Tribe)": 10, "Herd": 30, "Peaceful Cut": 15, "Spirit Combat": 20 },
      culturalWeapons: { "Dagger": 10, "2H Dagger-Axe": 10, "Pole Lasso": 10 }
    },
    "Praxian Tribes: Impala Rider": {
      culturalSkills: { "Ride (Impala)": 35, "Customs (Impala Tribe)": 10, "Herd": 30, "Peaceful Cut": 15, "Spirit Combat": 20 },
      culturalWeapons: { "Dagger": 5, "Shortsword": 10, "Composite Bow": 10, "Dart": 10, "Small Shield": 10 }
    },
    "Praxian Tribes: Pol Joni": {
      culturalSkills: { "Ride (Horse)": 35, "Customs (Pol Joni)": 10, "Herd": 30, "Peaceful Cut": 15, "Spirit Combat": 20 },
      culturalWeapons: { "Dagger": 10, "Lance": 15, "Broadsword": 15, "Composite Bow": 10, "Medium Shield": 10 }
    },
    "Praxian Tribes: Sable Rider": {
      culturalSkills: { "Ride (Sable Antelope)": 35, "Customs (Sable Tribe)": 10, "Herd": 30, "Peaceful Cut": 15, "Spirit Combat": 20 },
      culturalWeapons: { "Dagger": 10, "Kopis": 15, "1H Axe": 15, "Lance": 10, "Short Spear": 10, "Composite Bow": 10, "Small Shield": 10, "Medium Shield": 10 }
    },
    "Lunar Tarsh": {
      culturalSkills: { "Dance": 5, "Intrigue": 5, "Sing": 5, "Speak Own Language (New Pelorian)": 50, "Speak Other Language (Tarshite)": 20, "Customs (Lunar Provincial)": 10, "Farm": 25, "First Aid": 5, "Spirit Combat": 15 },
      culturalWeapons: { "Dagger": 10, "1H or 2H Spear": 15, "Kopis": 10, "Composite Bow": 10, "Sling": 10, "Javelin": 10, "Medium Shield": 10, "Large Shield": 15 }
    },
    "Old Tarsh": {
      culturalSkills: { "Dance": 5, "Ride": 5, "Sing": 10, "Speak Own Language (Tarshite)": 50, "Speak Other Language (Tradetalk)": 10, "Customs (Tarshite)": 10, "Farm": 15, "Survival": 5, "Spirit Combat": 15 },
      culturalWeapons: { "Dagger": 10, "Battle Axe": 15, "1H Spear": 10, "Broadsword": 10, "Composite Bow": 10, "Sling": 10, "Javelin": 10, "Medium Shield": 10, "Large Shield": 10 }
    }
  };

  const homeland = details.homeland;
  if (modifiers[homeland]) {
    const culturalSkills = modifiers[homeland].culturalSkills;
    const culturalWeapons = modifiers[homeland].culturalWeapons;

    // Apply skill modifiers
    Object.keys(culturalSkills).forEach(skillName => {
      const skillCategory = findSkillCategory(skillName, details.skills);
      if (skillCategory) {
        const skill = findSkill(skillName, skillCategory);
        if (skill) {
          skill.homelandMod = culturalSkills[skillName];
          skill.total += skill.homelandMod;
        }
      }
    });

    // Apply weapon skill modifiers
    Object.keys(culturalWeapons).forEach(skillName => {
      const skillCategory = findSkillCategory(skillName, details.skills);
      if (skillCategory) {
        const skill = findSkill(skillName, skillCategory);
        if (skill) {
          skill.homelandMod = culturalWeapons[skillName];
          skill.total += skill.homelandMod;
        }
      }
    });
  }
}

// Function to find the skill category
function findSkillCategory(skillName, skills) {
  for (const category in skills) {
    if (skills[category].skills[skillName]) {
      return skills[category];
    }
  }
  return null;
}

// Function to find the skill in a category
function findSkill(skillName, skillCategory) {
  return skillCategory.skills[skillName] || null;
}

// Function to render a specific page
async function renderPage(pageIndex) {
  const page = pages[pageIndex];
  let content = `<h2>${page.title}</h2><p>${page.content}</p>`;
  if (pageIndex === 0) {
    // Dropdown for actor selection on Page 1 (Start)
    let actors = getActors().filter(actor => !selectedActors.some(selected => selected.id === actor.id));
    content += `<select id="actor-select">${actors.map(actor => `<option value="${actor.id}">${actor.name}</option>`)}</select>`;
    content += `<button id="add-actor-button" style="margin-left: 10px;">Add Actor</button>`;
  } else if (pageIndex === 1) {
    // Dropdowns for race, homeland, occupation, and cult on Page 2
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
      <div>
        <label for="occupation-select">Occupation:</label>
        <select id="occupation-select">${Object.keys(globalOptions.occupations).map(occupation => `<option value="${occupation}">${occupation}</option>`)}</select>
      </div>
      <div>
        <label for="cult-select">Cult:</label>
        <select id="cult-select">${Object.keys(globalOptions.cults).map(cult => `<option value="${cult}">${cult}</option>`)}</select>
      </div>
    `;
    content += `<button id="sync-all-button" style="margin-top: 10px;">Sync All</button>`;
  } else if (pageIndex === 2) {
    // Dropdowns for primary, secondary, and tertiary runes on Page 3
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
  } else if (pageIndex === 3) {
    // Dropdowns for characteristics on Page 4
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
  } else if (pageIndex === 4) {
    // Dropdown for occupation on Page 5
    let actors = selectedActors.map(actor => `<option value="${actor.id}">${actor.name}</option>`).join('');
    const actor = actorDetails[selectedActors[0].id]; // Assume the first actor is selected by default
    const homeland = actor.homeland;
    const occupations = globalOptions.homelands[homeland].occupations;

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
  } else if (pageIndex === 5) {
    // Dropdown for cult on Page 6
    let actors = selectedActors.map(actor => `<option value="${actor.id}">${actor.name}</option>`).join('');
    const actor = actorDetails[selectedActors[0].id]; // Assume the first actor is selected by default
    const occupation = actor.occupation;

    let whitelistedCults = [];
    if (occupation === "Assistant Shaman") whitelistedCults = ["Daka Fal", "Waha", "Yelm"];
    if (occupation === "Bandit") whitelistedCults = ["Babester Gor", "Black Fang", "Eurmal", "Maran Gor", "Orlanth", "Seven Mothers", "Storm Bull"];
    if (occupation === "Chariot Driver") whitelistedCults = ["Orlanth Adventurous", "Seven Mothers"];
    if (occupation === "Crafter") whitelistedCults = ["Depends on the craft—Ernalda (potters and weavers), Issaries (all), Gustbran (redsmith)"];
    if (occupation === "Entertainer") whitelistedCults = ["Donandar", "Ernalda", "Eurmal", "Orlanth", "Seven Mothers"];
    if (occupation === "Farmer") whitelistedCults = ["Ernalda", "Orlanth", "Seven Mothers (Lunar Tarsh)", "Yelmalio"];
    if (occupation === "Fisher") whitelistedCults = ["Engizi", "Orlanth"];
    if (occupation === "Healer") whitelistedCults = ["Chalana Arroy", "Ernalda", "Seven Mothers"];
    if (occupation === "Herder") whitelistedCults = ["Eiritha", "Orlanth", "Waha", "Yelm", "Yinkin"];
    if (occupation === "Hunter") whitelistedCults = ["Foundchild", "Odayla", "Orlanth", "Yelmalio"];
    if (occupation === "Merchant") whitelistedCults = ["Issaries", "Argan Argar", "Eryies", "Seven Mothers"];
    if (occupation === "Noble") whitelistedCults = ["Ernalda", "Orlanth", "Seven Mothers", "Waha", "Yelm"];
    if (occupation === "Philosopher") whitelistedCults = ["Lhankor Mhy", "Seven Mothers", "Aeolian"];
    if (occupation === "Priest") whitelistedCults = ["All except Daka Fal, Eurmal, and Waha"];
    if (occupation === "Scribe") whitelistedCults = ["Lhankor Mhy"];
    if (occupation === "Thief") whitelistedCults = ["Eurmal", "Orlanth"];
    if (occupation === "Warrior: Heavy Infantry") whitelistedCults = ["Argan Argar", "Babester Gor", "Humakt", "Maran Gor", "Orlanth Adventurous", "Seven Mothers", "Yelmalio"];
    if (occupation === "Warrior: Light Infantry") whitelistedCults = ["Babester Gor", "Humakt", "Maran Gor", "Orlanth Adventurous", "Seven Mothers", "Storm Bull"];
    if (occupation === "Warrior: Heavy Cavalry") whitelistedCults = ["Humakt", "Orlanth Adventurous", "Orlanth Thunderous", "Seven Mothers", "Storm Bull", "Waha", "Yelm"];
    if (occupation === "Warrior: Light Cavalry") whitelistedCults = ["Humakt", "Orlanth Adventurous", "Orlanth Thunderous", "Seven Mothers", "Storm Bull", "Waha", "Yelm"];

    const allCults = await loadCults();
    const cults = allCults.filter(cult => whitelistedCults.includes(cult));

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
      if (select) select.value = characteristics[char.toUpperCase()] || 0;
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
      const actorId = html.find('#actor-select').val();
      const actor = game.actors.get(actorId);
      selectedActors.push(actor);

      const categorizedRunes = await loadRunes();
      const runeDetails = initializeRuneDetails(categorizedRunes);

      const skills = await loadSkills();

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
        attributes: {
          magicpoints: 0,
          hitpoints: {
            basevalue: 0,
            sizMod: 0,
            powMod: 0,
            total: 0
          },
          healingrate: 0,
          damagebonus: '',
          spiritcombat: '',
          maxENC: 0
        },
        skills
      };
      logSelectedActorsAndDetails();
      currentPage++;
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the next button on Page 2
    html.find('#next-button-page-2').click(async () => {
      applyAutoSelections();
      logSelectedActorsAndDetails();
      currentPage++;
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the next button on Page 3
    html.find('#next-button-page-3').click(async () => {
      applyAutoSelections();
      logSelectedActorsAndDetails();
      currentPage++;
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the next button on Page 4
    html.find('#next-button-page-4').click(async () => {
      calculateCharacteristicsTotal(actorDetails[actorId]);
      calculateAttributes(actorDetails[actorId]);
      logSelectedActorsAndDetails();
      currentPage++;
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the next button on Page 5
    html.find('#next-button-page-5').click(async () => {
      const actorId = html.find('#actor-detail-occupation-select').val();
      const occupationSelect = document.getElementById('occupation-select');
      const details = actorDetails[actorId];
      details.occupation = occupationSelect.value;
      logSelectedActorsAndDetails();
      currentPage++;
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the next button on Page 6
    html.find('#next-button-page-6').click(async () => {
      const actorId = html.find('#actor-detail-cult-select').val();
      const cultSelect = document.getElementById('cult-select');
      const details = actorDetails[actorId];
      if (cultSelect.value === 'auto') {
        details.cult = getWeightedRandomSelection(globalOptions.cults, actorId);
      } else {
        details.cult = cultSelect.value;
      }
      logSelectedActorsAndDetails();
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
    html.find('#occupation-select').change(function() {
      const actorId = html.find('#actor-detail-select').val();
      actorDetails[actorId].occupation = $(this).val();
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
        actorDetails[actorId].characteristics[char.toUpperCase()] = {
          baseValue: parseInt($(this).val()),
          primaryMod: 0,
          secondaryMod: 0,
          homelandMod: 0,
          total: 0
        };
        logSelectedActorsAndDetails();
      });
    });

    // Add event listeners for side navigator buttons
    html.find('.nav-button').click(async function() {
      currentPage = parseInt($(this).data('page'));
      dialog.data.content = await createDialogContent(currentPage);
      dialog.render(true);
    });

    // Add event listener for the cancel button
    html.find('#cancel-button').click(() => {
      dialog.close();
    });

    // Add event listener for the save button
    html.find('#save-button').click(() => {
      console.log("Final Selected Actors and Details:");
      logSelectedActorsAndDetails();
      dialog.close();
    });
  }
}, {
  width: 800,
  height: 600
});

// Render the dialog
dialog.render(true);
