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
        this.skillAliases = {
            "Dagger": "1H Daggers (Dagger)",
            "Lance": "2H Spears (Longspear)",
            "Large Shield": "Shields (Large)",
            "1H Spear": "1H Spears (Shortspear)",
            "2H Spear": "2H Spears (2H Spear)",
            "Shortsword": "1H Swords (Shortsword)",
            "Dart": "Javelins (Dart)",
            "Self Bow": "Bows (Self Bow)",
            "Composite Bow": "Bows (Composite Bow)",
            "Sling": "Thrown Weapons (Sling)",
            "Kopis": "1H Swords (Kopis)",
            "1H Axe": "1H Axes (1H Axe)",
            "Short Spear": "1H Spears (Short Spear)",
            "1H Lance": "1H Lances (1H Lance)",
            "Thrown Weapons (Thrown Axe)": "Thrown Axe",
            "sword": "1H Swords (Broadsword)",
            "Broadsword": "1H Swords (Broadsword)",
            "Javelin": "1H Spears (Javelin)",
            "Medium Shield": "Shields (Medium)",
            "Small Shield": "Shields (Small)",
            "Large Shield": "Shields (Large)",
            "Shields (Medium Shield)": "Shields (Medium)",
            "1H Broadsword (Broadsword)": "1H Swords (Broadsword)",
            "1H Javelins (Javelin)": "1H Spears (Javelin)",
            "Shields (Medium Shield)": "Shields (Medium)",
            "Shields (Large Shield)": "Shields (Large)",
            "Shields (Large Small)": "Shields (Small)",
            "Speak Own Language (Pure Horse Tongue)": "Speak Language (Pure Horse Tongue)",
            "Speak Own Language (Heortling)": "Speak Language (Heortling)",
            "Speak Own Language (Esrolian)": "Speak Language (Esrolian)",
            "Speak Own Language (New Pelorian)": "Speak Language (New Pelorian)",
            "Speak Own Language (Tarshite)": "Speak Language (Tarshite)",
            "Speak Other Language (Tradetalk)": "Speak Language (Tradetalk)",
            "Ride (High Llama)": "Ride (...)",
            "2H Dagger-Axe": "2H Axes (Dagger Axe)",
            "Pole Lasso": "Lassos (Pole Lasso)",
            "Ride (Impala)": "Ride (...)",
            "Customs (Pol Joni)": "Customs (Pol-Joni)",
            "Ride (Sable Antelope)": "Ride (...)", 
            "Kopis or 1H Axe": Math.random() < 0.5 ? "1H Swords (Kopis)" : "1H Axes (Battle Axe)",
            "Lance or Short Spear": Math.random() < 0.5 ? "2H Spears (Longspear)" : "1H Spears (Shortspear)",
            "Composite Bow or Javelin": Math.random() < 0.5 ? "Bows (Composite Bow)" : "Thrown Weapons (Javelin)",
            "Speak Other Language (Tarshite)": "Speak Language (Tarshite)",
            "1H or 2H Spear": Math.random() < 0.5 ? "1H Spears (Shortspear)" : "2H Spears (Longspear)",
            "1H Kopis (Kopis)": "1H Swords (Kopis)",
            "Composite Bow or Sling": Math.random() < 0.5 ? "Bows (Composite Bow)" : "Slings (Sling)",
            "2H Spears (2H Spear)": "2H Spears (Longspear)",
            "Thrown Weapons (Sling)": "Slings (Sling)",
            "Battle Axe": "1H Axes (Battle Axe)",
            
            // Ensure this line is present to categorize Shields properly
            // Add more skill aliases as needed
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
            "air": "Air (element)",
            "darkness": "Darkness (element)",
            "earth": "Earth (element)",
            "fire": "Fire/Sky (element)",
            "water": "Water (element)",
            "moon": "Moon (element)",
            "truth": "Truth (power)",
            "death": "Death (power)",
            "disorder": "Disorder (power)",
            "harmony": "Harmony (power)",
            "illusion": "Illusion (power)",
            "movement": "Movement (power)",
            "stasis": "Stasis (power)",
            "fertility": "Fertility (power)",
            "beast": "Beast (form)",
            "man": "Man (form)",
            "chaos": "Chaos (form)",
            "plant": "Plant (form)",
            "spirit": "Spirit (form)",
            "dragonewt": "Dragonewt (form)"
        };
        this.hitPointModifiers = [
            { range: [1, 4], SIZ: -2, POW: -1 },
            { range: [5, 8], SIZ: -1, POW: 0 },
            { range: [9, 12], SIZ: 0, POW: 0 },
            { range: [13, 16], SIZ: +1, POW: 0 },
            { range: [17, 20], SIZ: +2, POW: +1 },
            { range: [21, 24], SIZ: +3, POW: +2 },
            { range: [25, 28], SIZ: +4, POW: +3 },
            { range: [29, Infinity], SIZ: function (value) { return Math.floor((value - 24) / 4) + 4; }, POW: function (value) { return Math.floor((value - 24) / 4) + 2; } }
        ];// Hit point modifiers

        // Healing rate modifiers
        this.healingRate = [
            { range: [1, 6], rate: 1 },
            { range: [7, 12], rate: 2 },
            { range: [13, 18], rate: 3 },
            { range: [19, Infinity], rate: function (value) { return Math.floor((value - 13) / 6) + 3; } }
        ];

        // Spirit combat damage modifiers
        this.spiritCombatDamage = [
            { range: [2, 12], damage: '1D3' },
            { range: [13, 24], damage: '1D6' },
            { range: [25, 32], damage: '1D6+1' },
            { range: [33, 40], damage: '1D6+3' },
            { range: [41, 56], damage: '2D6+3' },
            { range: [57, Infinity], damage: function (value) { return '1D6+' + (Math.floor((value - 41) / 16) * 6 + 3); } }
        ];

        // Damage bonus modifiers
        this.damageBonus = [
            { range: [1, 12], bonus: '-1D4' },
            { range: [13, 24], bonus: '0' },
            { range: [25, 32], bonus: '+1D4' },
            { range: [33, 40], bonus: '+1D6' },
            { range: [41, 56], bonus: '+2D6' },
            { range: [57, Infinity], bonus: function (value) { return '+' + Math.floor((value - 41) / 16) + 'D6+' + (value % 16) * 2; } }
        ];

        // Dexterity strike rank modifiers
        this.dexStrikeRank = [
            { range: [1, 5], rank: 5 },
            { range: [6, 8], rank: 4 },
            { range: [9, 12], rank: 3 },
            { range: [13, 15], rank: 2 },
            { range: [16, 18], rank: 1 },
            { range: [19, Infinity], rank: 0 }
        ];

        // Size strike rank modifiers
        this.sizStrikeRank = [
            { range: [1, 6], rank: 3 },
            { range: [7, 14], rank: 2 },
            { range: [15, 21], rank: 1 },
            { range: [22, Infinity], rank: 0 }
        ];

        // Skill category modifiers
        this.skillCategoryModifiers = {
            Agility: [
                { range: [1, 4], strength: -5, size: +5, dexterity: -10, power: -5 },
                { range: [5, 8], strength: 0, size: 0, dexterity: -5, power: 0 },
                { range: [9, 12], strength: 0, size: 0, dexterity: 0, power: 0 },
                { range: [13, 16], strength: 0, size: 0, dexterity: +5, power: 0 },
                { range: [17, 20], strength: +5, size: -5, dexterity: +10, power: +5 },
                { range: [21, Infinity], strength: +5, size: -5, dexterity: +5, power: +5 }
            ],
            Communication: [
                { range: [1, 4], intelligence: -5, power: -5, charisma: -10 },
                { range: [5, 8], intelligence: 0, power: 0, charisma: -5 },
                { range: [9, 12], intelligence: 0, power: 0, charisma: 0 },
                { range: [13, 16], intelligence: 0, power: 0, charisma: +5 },
                { range: [17, 20], intelligence: +5, power: +5, charisma: +10 },
                { range: [21, Infinity], intelligence: +5, power: +5, charisma: +5 }
            ],
            Knowledge: [
                { range: [1, 4], intelligence: -10, power: -5 },
                { range: [5, 8], intelligence: -5, power: 0 },
                { range: [9, 12], intelligence: 0, power: 0 },
                { range: [13, 16], intelligence: +5, power: 0 },
                { range: [17, 20], intelligence: +10, power: +5 },
                { range: [21, Infinity], intelligence: +5, power: +5 }
            ],
            Magic: [
                { range: [1, 4], power: -10, charisma: -5 },
                { range: [5, 8], power: -5, charisma: 0 },
                { range: [9, 12], power: 0, charisma: 0 },
                { range: [13, 16], power: +5, charisma: 0 },
                { range: [17, 20], power: +10, charisma: +15 },
                { range: [21, Infinity], power: +5, charisma: +5 }
            ],
            Manipulation: [
                { range: [1, 4], strength: -5, dexterity: -10, intelligence: -10, power: -5 },
                { range: [5, 8], strength: 0, dexterity: -5, intelligence: -5, power: 0 },
                { range: [9, 12], strength: 0, dexterity: 0, intelligence: 0, power: 0 },
                { range: [13, 16], strength: 0, dexterity: +5, intelligence: +5, power: 0 },
                { range: [17, 20], strength: +5, dexterity: +10, intelligence: +10, power: +5 },
                { range: [21, Infinity], strength: +5, dexterity: +5, intelligence: +5, power: +5 }
            ],
            Perception: [
                { range: [1, 4], intelligence: -10, power: -5 },
                { range: [5, 8], intelligence: -5, power: 0 },
                { range: [9, 12], intelligence: 0, power: 0 },
                { range: [13, 16], intelligence: +5, power: 0 },
                { range: [17, 20], intelligence: +10, power: +5 },
                { range: [21, Infinity], intelligence: +5, power: +5 }
            ],
            Stealth: [
                { range: [1, 4], size: +10, dexterity: -10, intelligence: -10, power: +5 },
                { range: [5, 8], size: +5, dexterity: -5, intelligence: -5, power: 0 },
                { range: [9, 12], size: 0, dexterity: 0, intelligence: 0, power: 0 },
                { range: [13, 16], size: -5, dexterity: +5, intelligence: +5, power: -5 },
                { range: [17, 20], size: -10, dexterity: +10, intelligence: +10, power: -5 },
                { range: [21, Infinity], size: -5, dexterity: +5, intelligence: +5, power: -5 }
            ]
        };

        // Cultural skills by homeland
        this.culturalSkills = {
            "Sartar": {
                skills: [
                    { name: "Ride (any)", value: 5 },
                    { name: "Dance", value: 5 },
                    { name: "Sing", value: 10 },
                    { name: "Speak Own Language (Heortling)", value: 50 },
                    { name: "Speak Other Language (Tradetalk)", value: 10 },
                    { name: "Customs (Heortling)", value: 25 },
                    { name: "Farm", value: 20 },
                    { name: "Herd", value: 10 },
                    { name: "Spirit Combat", value: 15 }
                ],
                weapons: [
                    { name: "Dagger", value: 10 },
                    { name: "Battle Axe", value: 10 },
                    { name: "1H Spear", value: 10 },
                    { name: "Broadsword", value: 15 },
                    { name: "Composite Bow", value: 10 },
                    { name: "Sling", value: 10 },
                    { name: "Javelin", value: 10 },
                    { name: "Medium Shield", value: 15 },
                    { name: "Large Shield", value: 10 }
                ]
            },
            "Esrolia": {
                skills: [
                    { name: "Bargain", value: 5 },
                    { name: "Dance", value: 10 },
                    { name: "Intrigue", value: 5 },
                    { name: "Sing", value: 5 },
                    { name: "Speak Own Language (Esrolian)", value: 50 },
                    { name: "Speak Other Language (Tradetalk)", value: 20 },
                    { name: "Customs (Esrolian)", value: 25 },
                    { name: "First Aid", value: 5 },
                    { name: "Spirit Combat", value: 15 }
                ],
                weapons: [
                    { name: "Battle Axe", value: 15 },
                    { name: "1H Spear", value: 10 },
                    { name: "Rapier", value: 10 },
                    { name: "Self Bow", value: 10 },
                    { name: "Thrown Axe", value: 10 },
                    { name: "Small Shield", value: 15 },
                    { name: "Medium Shield", value: 15 },
                    { name: "Large Shield", value: 10 }
                ]
            },
            "Grazeland": {
                skills: [
                    { name: "Ride (Horse)", value: 35 },
                    { name: "Speak Own Language (Pure Horse Tongue)", value: 50 },
                    { name: "Speak Other Language (Tradetalk)", value: 10 },
                    { name: "Customs (Grazeland Pony Breeders)", value: 25 },
                    { name: "Herd", value: 35 },
                    { name: "Spirit Combat", value: 15 }
                ],
                weapons: [
                    { name: "Dagger", value: 10 },
                    { name: "Lance", value: 15 },
                    { name: "Broadsword", value: 10 },
                    { name: "Composite Bow", value: 15 },
                    { name: "Small Shield", value: 15 },
                    { name: "Medium Shield", value: 10 }
                ]
            },
            "Bison Rider": {
                skills: [
                    { name: "Ride (Bison)", value: 35 },
                    { name: "Customs (Bison Tribe)", value: 25 },
                    { name: "Herd", value: 30 },
                    { name: "Peaceful Cut", value: 15 },
                    { name: "Spirit Combat", value: 20 }
                ],
                weapons: [
                    { name: "Dagger", value: 10 },
                    { name: "Lance", value: 15 },
                    { name: "Broadsword", value: 10 },
                    { name: "Javelin", value: 10 },
                    { name: "Medium Shield", value: 10 }
                ]
            },
            "High Llama Rider": {
                skills: [
                    { name: "Ride (High Llama)", value: 35 },
                    { name: "Customs (High Llama Tribe)", value: 25 },
                    { name: "Herd", value: 30 },
                    { name: "Peaceful Cut", value: 15 },
                    { name: "Spirit Combat", value: 20 }
                ],
                weapons: [
                    { name: "Dagger", value: 10 },
                    { name: "Lance", value: 15 },
                    { name: "2H Dagger-Axe", value: 10 },
                    { name: "Pole Lasso", value: 10 }
                ]
            },
            "Impala Rider": {
                skills: [
                    { name: "Ride (Impala)", value: 35 },
                    { name: "Customs (Impala Tribe)", value: 25 },
                    { name: "Herd", value: 30 },
                    { name: "Peaceful Cut", value: 15 },
                    { name: "Spirit Combat", value: 20 }
                ],
                weapons: [
                    { name: "Dagger", value: 5 },
                    { name: "Shortsword", value: 10 },
                    { name: "Composite Bow", value: 20 },
                    { name: "Dart", value: 10 },
                    { name: "Small Shield", value: 10 }
                ]
            },
            "Pol-Joni": {
                skills: [
                    { name: "Ride (Horse)", value: 35 },
                    { name: "Customs (Pol Joni)", value: 25 },
                    { name: "Herd", value: 30 },
                    { name: "Peaceful Cut", value: 15 },
                    { name: "Spirit Combat", value: 20 }
                ],
                weapons: [
                    { name: "Dagger", value: 10 },
                    { name: "Lance", value: 10 },
                    { name: "Broadsword", value: 15 },
                    { name: "Composite Bow", value: 10 },
                    { name: "Medium Shield", value: 15 }
                ]
            },
            "Pol Joni": {
                skills: [
                    { name: "Ride (Horse)", value: 35 },
                    { name: "Customs (Pol Joni)", value: 25 },
                    { name: "Herd", value: 30 },
                    { name: "Peaceful Cut", value: 15 },
                    { name: "Spirit Combat", value: 20 }
                ],
                weapons: [
                    { name: "Dagger", value: 10 },
                    { name: "Lance", value: 10 },
                    { name: "Broadsword", value: 15 },
                    { name: "Composite Bow", value: 10 },
                    { name: "Medium Shield", value: 15 }
                ]
            },
            "Sable Rider": {
                skills: [
                    { name: "Ride (Sable Antelope)", value: 35 },
                    { name: "Customs (Sable Tribe)", value: 25 },
                    { name: "Herd", value: 30 },
                    { name: "Peaceful Cut", value: 15 },
                    { name: "Spirit Combat", value: 20 }
                ],
                weapons: [
                    { name: "Dagger", value: 10 },
                    { name: "Kopis or 1H Axe", value: 15 },
                    { name: "Lance or Short Spear", value: 10 },
                    { name: "Composite Bow or Javelin", value: 10 },
                    { name: "Medium Shield", value: 10 }
                ]
            },
            "Lunar Tarsh": {
                skills: [
                    { name: "Dance", value: 5 },
                    { name: "Intrigue", value: 5 },
                    { name: "Speak Own Language (New Pelorian)", value: 50 },
                    { name: "Speak Other Language (Tarshite)", value: 20 },
                    { name: "Speak Other Language (Tradetalk)", value: 10 },
                    { name: "Celestial Lore", value: 5 },
                    { name: "Customs (Lunar Provincial)", value: 25 },
                    { name: "Farm", value: 25 },
                    { name: "Spirit Combat", value: 15 }
                ],
                weapons: [
                    { name: "Dagger", value: 10 },
                    { name: "1H or 2H Spear", value: 15 },
                    { name: "Kopis", value: 10 },
                    { name: "Composite Bow or Sling", value: 10 },
                    { name: "Javelin", value: 10 },
                    { name: "Medium Shield", value: 10 },
                    { name: "Large Shield", value: 15 }
                ]
            },
            "Old Tarsh": {
                skills: [
                    { name: "Dance", value: 5 },
                    { name: "Ride (...)", value: 5 },
                    { name: "Sing", value: 10 },
                    { name: "Speak Own Language (Tarshite)", value: 50 },
                    { name: "Speak Other Language (Tradetalk)", value: 10 },
                    { name: "Customs (Tarshite)", value: 25 },
                    { name: "Farm", value: 15 },
                    { name: "Survival", value: 5 },
                    { name: "Spirit Combat", value: 15 }
                ],
                weapons: [
                    { name: "Dagger", value: 10 },
                    { name: "Battle Axe", value: 15 },
                    { name: "1H Spear", value: 10 },
                    { name: "Broadsword", value: 10 },
                    { name: "Composite Bow or Sling", value: 10 },
                    { name: "Javelin", value: 10 },
                    { name: "Medium Shield", value: 15 },
                    { name: "Large Shield", value: 10 }
                ]
            }
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
                MissileWeapons: [],
                Shields: [] // Ensure this category exists
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
                            baseValue: item.system.baseChance,
                            skillMod: 0
                        });
                    } else if (category === "Shield") {
                        skills.Shields.push({
                            name: item.name,
                            baseValue: item.system.baseChance,
                            skillMod: 0
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
            Perception: [], Stealth: [], MeleeWeapons: [], MissileWeapons: [], Shields: []
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
        this.attributes = {};
        this.skillCategoryModifiers = {
            Agility: 0,
            Communication: 0,
            Knowledge: 0,
            Magic: 0,
            Manipulation: 0,
            MeleeWeapons: 0,
            MissileWeapons: 0,
            Perception: 0,
            Stealth: 0,
            Shields: 0
        };
        this.culturalMeleeWeapons = [];
        this.culturalMissileWeapons = [];
        this.culturalWeapons = [];
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
        const findRuneCategory = (runeName) => {
            for (const category in library.runes) {
                if (library.runes[category].some(rune => rune.includes(runeName))) {
                    return category;
                }
            }
            return null;
        };

        const officialName = library.runeAliases[name.toLowerCase()] || name;
        const category = findRuneCategory(officialName);

        if (!category) {
            console.error(`Rune '${officialName}' not found in any category`);
            return;
        }

        if (this.runes[category][officialName] !== undefined) {
            switch (operation) {
                case 'add':
                    this.runes[category][officialName] += value;
                    break;
                case 'subtract':
                    this.runes[category][officialName] -= value;
                    break;
                case 'replace':
                    this.runes[category][officialName] = value;
                    break;
            }
        } else {
            this.runes[category][officialName] = value;
        }

        this.runes[category][officialName] = Math.max(0, Math.min(100, this.runes[category][officialName]));

        const complementaryRune = library.complementaryRunes[category] && library.complementaryRunes[category][officialName];
        if (complementaryRune) {
            this.runes[category][complementaryRune] = 100 - this.runes[category][officialName];
        }
    }

    updateSkill(name, baseValue, skillMod = 0) {
        const skillAlias = library.skillAliases[name] || name;
        for (const category in this.skills) {
            const skill = this.skills[category].find(skill => skill.name === skillAlias);
            if (skill) {
                skill.skillMod = skillMod; // Update skillMod to ensure it's set correctly without doubling
                return;
            }
        }
        // If skill not found, determine the appropriate category
        for (const category in library.skills) {
            if (library.skills[category].some(skill => skill.name === skillAlias)) {
                this.skills[category].push({ name: skillAlias, baseValue, skillMod });
                return;
            }
        }
        console.error(`Skill '${skillAlias}' not found in any category`);
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
        const officialName = library.runeAliases[runeName.toLowerCase()] || runeName;
        for (const category of Object.keys(library.runes)) {
            const runesInCategory = library.runes[category];
            if (runesInCategory.some(rune => rune.includes(officialName))) {
                this.updateRune(officialName, 75, 'replace');
                return;
            }
        }
        console.error(`Rune '${officialName}' not found in any category`);
    }

    chooseHomeland(name, tribe) {
        this.homeland.name = name;
        this.homeland.tribe = tribe;
        this.updateHomelandPassions(name);
        this.applyHomelandModifiers();

        // Apply cultural skills
        const culturalSkills = library.culturalSkills[name] || library.culturalSkills[tribe];
        if (culturalSkills) {
            culturalSkills.skills.forEach(skill => {
                this.updateSkill(skill.name, 0, skill.value);
            });
            culturalSkills.weapons.forEach(weapon => {
                if (library.skills.MeleeWeapons.some(w => w.name === weapon.name)) {
                    this.culturalMeleeWeapons.push(weapon);
                } else if (library.skills.MissileWeapons.some(w => w.name === weapon.name)) {
                    this.culturalMissileWeapons.push(weapon);
                } else {
                    this.culturalWeapons.push(weapon);
                }
            });
        } else {
            console.error(`Cultural skills for homeland '${name}' or tribe '${tribe}' not found`);
        }
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
            for (const [shortCharName, value] of Object.entries(modifiers)) {
                const charName = library.characteristicAliases[shortCharName.toLowerCase()];
                const currentCharacteristic = this.characteristics[charName];
                if (!isNaN(currentCharacteristic) && !isNaN(value)) {
                    this.updateCharacteristic(charName, currentCharacteristic + value);
                } else {
                    console.error(`Invalid characteristic or modifier value for ${charName}: ${currentCharacteristic} + ${value}`);
                }
            }
        }
    }

    chooseOccupation(occupation) {
        const adjustedOccupation = (this.homeland.name === "Prax" || this.homeland.name === "Grazeland") && occupation === "Farmer" ? "Herder" : occupation;
        this.occupation = adjustedOccupation;

        const occupationSkills = library.occupations[adjustedOccupation];
        if (occupationSkills) {
            occupationSkills.forEach(skill => {
                this.updateSkill(skill.name, skill.baseValue, skill.skillMod);
            });
        } else {
            console.error(`Occupation '${adjustedOccupation}' not found in library`);
        }
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

        // Update skills with base values from the library
        for (const category in library.skills) {
            library.skills[category].forEach(skill => {
                this.updateSkill(skill.name, skill.baseValue);
            });
        }

        // Apply special values to Dodge and Jump
        const dex = this.characteristics.dexterity;
        this.updateSkill("Dodge", dex * 2);
        this.updateSkill("Jump", dex * 3);
    }

    chooseRace(race, subrace = null) {
        this.race = race;
        this.subrace = subrace;
        this.rollCharacteristics();
    }

    calculateAttributes() {
        const { strength, dexterity, constitution, intelligence, power, charisma, size } = this.characteristics;

        this.attributes.hitPoints = this.calculateHitPoints(size, power);
        this.attributes.healingRate = this.calculateHealingRate(constitution);
        this.attributes.spiritCombatDamage = this.calculateSpiritCombatDamage(power, charisma);
        this.attributes.damageBonus = this.calculateDamageBonus(strength, size);
        this.attributes.dexStrikeRank = this.calculateDexStrikeRank(dexterity);
        this.attributes.sizStrikeRank = this.calculateSizStrikeRank(size);
    }

    calculateModifiers(modifiers, value) {
        for (const modifier of modifiers) {
            if (value >= modifier.range[0] && value <= modifier.range[1]) {
                return modifier;
            }
        }
        return modifiers[modifiers.length - 1]; // Return the last modifier if no match found
    }

    calculateHitPoints(size, power) {
        const sizMod = this.calculateModifiers(library.hitPointModifiers, size).SIZ;
        const powMod = this.calculateModifiers(library.hitPointModifiers, power).POW;
        return 8 + sizMod + powMod; // Assuming base 8 hit points
    }

    calculateHealingRate(constitution) {
        const rateMod = this.calculateModifiers(library.healingRate, constitution).rate;
        return typeof rateMod === 'function' ? rateMod(constitution) : rateMod;
    }

    calculateSpiritCombatDamage(power, charisma) {
        const powChaTotal = power + charisma;
        const damageMod = this.calculateModifiers(library.spiritCombatDamage, powChaTotal).damage;
        return typeof damageMod === 'function' ? damageMod(powChaTotal) : damageMod;
    }

    calculateDamageBonus(strength, size) {
        const strSizTotal = strength + size;
        const bonusMod = this.calculateModifiers(library.damageBonus, strSizTotal).bonus;
        return typeof bonusMod === 'function' ? bonusMod(strSizTotal) : bonusMod;
    }

    calculateDexStrikeRank(dexterity) {
        const rankMod = this.calculateModifiers(library.dexStrikeRank, dexterity).rank;
        return rankMod;
    }

    calculateSizStrikeRank(size) {
        const rankMod = this.calculateModifiers(library.sizStrikeRank, size).rank;
        return rankMod;
    }

    applySkillCategoryModifiers() {
        const { strength, dexterity, intelligence, power, charisma, size } = this.characteristics;

        for (const [category, modifiers] of Object.entries(library.skillCategoryModifiers)) {
            let totalModifier = 0;
            for (const { range, ...charModifiers } of modifiers) {
                if (strength >= range[0] && strength <= range[1]) totalModifier += charModifiers.strength || 0;
                if (dexterity >= range[0] && dexterity <= range[1]) totalModifier += charModifiers.dexterity || 0;
                if (intelligence >= range[0] && intelligence <= range[1]) totalModifier += charModifiers.intelligence || 0;
                if (power >= range[0] && power <= range[1]) totalModifier += charModifiers.power || 0;
                if (charisma >= range[0] && charisma <= range[1]) totalModifier += charModifiers.charisma || 0;
                if (size >= range[0] && size <= range[1]) totalModifier += charModifiers.size || 0;
            }
            this.skillCategoryModifiers[category] = totalModifier;

            // Copy Manipulation modifiers to MeleeWeapons and MissileWeapons
            if (category === 'Manipulation') {
                this.skillCategoryModifiers.MeleeWeapons = totalModifier;
                this.skillCategoryModifiers.MissileWeapons = totalModifier;
                this.skillCategoryModifiers.Shields = totalModifier;
            }
        }
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

    char.initializeRunes();

    char.chooseRace('Human');
    char.chooseHomeland('Old Tarsh');

    char.updateRune("air", 75, 'replace');
    char.updateRune('truth', 75, 'replace');
    char.updateSkill('sword', 5, 2); // Example of updating skill with skillMod
    char.updateSkill('sword', 2, -1); // Example of updating skill with skillMod
    char.chooseCult('Orlanth');
    char.setLanguage('Heortling', 50);

    char.addPassion('Loyalty', 'Family', 50);
    char.updatePassion('Loyalty', 'Family', 10, 'add');  // Increase loyalty to Family by 10
    char.updatePassion('Loyalty', 'Family', 5, 'subtract');  // Decrease loyalty to Family by 5
    char.updatePassion('Loyalty', 'Family', 70, 'replace');  // Set loyalty to Family to 70
    char.updatePassion('Devotion', 'Orlanth', 10, 'add');  // Create passion Devotion to Orlanth with initial value 70
    char.updatePassion('Devotion', 'Orlanth', 5, 'subtract');  // Decrease Devotion to Orlanth by 5

    char.chooseOccupation('Farmer');

    // Calculate attributes after all updates
    char.calculateAttributes();
    console.log('Updated Character Attributes:', char.attributes);

    // Apply skill category modifiers
    char.applySkillCategoryModifiers();
    console.log('Updated Character Skill Category Modifiers:', char.skillCategoryModifiers);

    // Apply cultural skills if not already applied
    char.chooseHomeland(char.homeland.name, char.homeland.tribe);
    //console.log('Updated Character Skills:', char.skills);

    console.log('Character:', char);
    console.log('Library:', library);
})();
