//All the races from the Unearthed Arcana articles are present in this file chronologically

/*	the Eberron Unearthed Arcana of 2015-02-02
	(http://media.wizards.com/2015/downloads/dnd/UA_Eberron_v1.pdf)
*/
//adds three races: the race Changeling
RaceList["changeling"] = {
	regExpSearch : /changeling/i,
	name : "Changeling",
	source : ["UA:E", 1],
	plural : "Changelings",
	size : 3,
	skills : ["Deception"],
	speed : [30, 20],
	languageProfs : ["Common", 2],
	age : " reach adulthood in their early teens and live around 80 years",
	height : " stand between 5 and 6 feet tall (5'1\" + 2d4\")",
	weight : " weigh around 140 lb (115 + 2d4 \xD7 2d4 lb)",
	heightMetric : " stand between 1,5 to over 1,8 metres tall (155 + 5d4 cm)",
	weightMetric : " weigh around 65 kg (52 + 5d4 \xD7 4d4 / 10 kg)",
	improvements : "Changeling: +1 Dexterity, +1 Charisma;",
	scores : [0, 1, 0, 0, 0, 1],
	trait : "Changeling (+1 Dexterity, +1 Charisma)\nShapechanger:\n   As an action, I can polymorph into any humanoid of my size that I have seen, or back into my true form.\n   However, my equipment does not change with me.\n   If I die, I revert to my natural appearance.",
	eval : "AddAction(\"action\", \"Polymorph\", \"being a Changeling\");",
	removeeval : "RemoveAction(\"action\", \"Polymorph\");"
};

//the race Warforged
RaceList["warforged"] = {
	regExpSearch : /warforged/i,
	name : "Warforged",
	source : ["UA:E", 3],
	plural : "Warforged",
	size : 3,
	speed : [30, 20],
	languageProfs : ["Common", 1],
	age : " are created as adults and will only start to show signs of physical deterioration after 150 years, but have no further aging effects",
	height : " stand between 6 and 7 feet tall (5'10\" + 2d6\")",
	weight : " weigh around 300 lb (270 + 2d6 \xD7 4 lb)",
	heightMetric : " stand between 1,8 and 2,1 metres tall (178 + 5d6 cm)",
	weightMetric : " weigh around 135 lb (125 + 5d6 \xD7 8 / kg)",
	improvements : "Warforged: +1 Strength, +1 Constitution;",
	scores : [1, 0, 1, 0, 0, 0],
	trait : "Warforged (+1 Strength, +1 Constitution)\nLiving Construct:\n   Even though I was constructed, I am a living creature. I am immune to disease. I do not need to eat or breathe, but I can ingest food and drink if I wish.\n   Instead of sleeping, I enter an inactive state for 4 hours each day. I do not dream in this state; I am fully aware of my surroundings and notice approaching enemies and other events as normal. I still need 8 hours for a long rest.",
	eval : "AddACMisc(1, 'Composite Plating', 'Composite Plating was gained from being a Warforged')",
	removeeval : "AddACMisc(0, 'Composite Plating', 'Composite Plating was gained from being a Warforged')"
};

//the race Shifter with its 6 subraces
RaceList["shifter"] = {
	regExpSearch : /shifter/i,
	name : "Shifter",
	source : ["UA:E", 2],
	plural : "Shifters",
	size : 3,
	speed : [30, 20],
	languageProfs : ["Common", "Sylvan"],
	vision : "Darkvision 60 ft",
	age : " reach adulthood at the end of their teens and live around 100 years",
	height : " range from under 5 to 6 feet tall (4'6\" + 2d8\")",
	weight : " weigh around 140 lb (95 + 2d8 \xD7 2d4 lb)",
	heightMetric : " range from under 1,5 to 1,8 metres tall (4'6\" + 5d8 cm)",
	weightMetric : " weigh around 65 kg (43 + 5d8 \xD7 4d4 / kg)",
	improvements : "Shifter: +1 Dexterity and +1 to other ability score depending on type of shifter;",
	scores : [0, 1, 0, 0, 0, 0],
	trait : "Shifter (+1 Dexterity and +1 to other ability score depending on type of shifter)\n   Use the \"Racial Options\" button to select type of shifter.\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and another bonus depending on the type of shifter.",
	features : {
		"shift" : {
			name : "Shift",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			tooltip : "",
			action : ["bonus action", ""]
		}
	},
	variants : ["beasthide", "cliffwalk", "longstride", "longtooth", "razorclaw", "wildhunt"]
};
RaceSubList["shifter-beasthide"] = {
	regExpSearch : /beasthide/i,
	name : "Beasthide shifter",
	source : ["UA:E", 2],
	plural : "Beasthide shifters",
	improvements : "Beasthide Shifter: +1 Dexterity, +1 Constitution;",
	scores : [0, 1, 1, 0, 0, 0],
	trait : "Beasthide Shifter (+1 Dexterity, +1 Constitution)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and I gain a +1 bonus to my AC."
};
RaceSubList["shifter-cliffwalk"] = {
	regExpSearch : /cliffwalk/i,
	name : "Cliffwalk shifter",
	source : ["UA:E", 2],
	plural : "Cliffwalk shifters",
	improvements : "Cliffwalk Shifter: +2 Dexterity;",
	scores : [0, 2, 0, 0, 0, 0],
	trait : "Cliffwalk Shifter (+2 Dexterity)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and I gain a climb speed of 30 feet."
};
RaceSubList["shifter-longstride"] = {
	regExpSearch : /longstride/i,
	name : "Longstride shifter",
	source : ["UA:E", 2],
	plural : "Longstride shifters",
	improvements : "Longstride Shifter: +2 Dexterity;",
	scores : [0, 2, 0, 0, 0, 0],
	trait : "Longstride Shifter (+2 Dexterity)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and I can use the Dash action as a bonus action."
};
RaceSubList["shifter-longtooth"] = {
	regExpSearch : /(longtooth|longteeth)/i,
	name : "Longtooth shifter",
	source : ["UA:E", 2],
	plural : "Longtooth shifters",
	weapons : ["longtooth"],
	improvements : "Longtooth Shifter: +1 Strength, +1 Dexterity;",
	scores : [1, 1, 0, 0, 0, 0],
	trait : "Longtooth Shifter (+1 Strength, +1 Dexterity)\nShifting: On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again. While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and, as an action, I can make can make a bite attack. This is a melee weapon attack that uses Strength and deals 1d6 piercing damage. If this attack hits a target that is my size or smaller, the target is also grappled."
};
RaceSubList["shifter-razorclaw"] = {
	regExpSearch : /razorclaw/i,
	name : "Razorclaw shifter",
	source : ["UA:E", 2],
	plural : "Razorclaw shifters",
	weapons : ["razorclaw"],
	improvements : "Razorclaw Shifter: +2 Dexterity;",
	scores : [0, 2, 0, 0, 0, 0],
	trait : "Razorclaw Shifter (+2 Dexterity)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and, as a bonus action, I can make an unarmed strike that can use my Dexterity for the attack roll and damage, dealing slashing damage."
};
RaceSubList["shifter-wildhunt"] = {
	regExpSearch : /wildhunt/i,
	name : "Wildhunt shifter",
	source : ["UA:E", 3],
	plural : "Wildhunt shifters",
	improvements : "Wildhunt Shifter: +1 Dexterity, +1 Wisdom;",
	scores : [0, 1, 0, 0, 1, 0],
	trait : "Wildhunt Shifter (+1 Dexterity, +1 Wisdom)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and I gain advantage on all Wisdom-based checks and saving throws."
};

/*	the Waterborne Adventures Arcana of 2015-05-04
	(http://media.wizards.com/2015/downloads/dnd/UA_Waterborne_v3.pdf)
*/
//adds the race Minotaur (Krynn) and its three variants.
RaceList["minotaur"] = {
	regExpSearch : /(minotaur|krynn)/i,
	name : "Minotaur",
	source : ["UA:WA", 1],
	plural : "Minotaurs",
	size : 3,
	speed : [30, 20],
	languageProfs : ["Common"],
	toolProfs : ["Navigator's tools", "Vehicles (water)"],
	weapons : ["horns"],
	age : " rearch adulthood around age 17 and live up to 150 years",
	height : " are well over 6 feet tall",
	weight : " weigh around 300 lb",
	heightMetric : " are well over 1,8 metres tall",
	weightMetric : " weigh around 135 kg",
	improvements : "Minotaur: +1 Strength, and either +1 Intelligence, +1 Wisdom, or another +1 Strength;",
	scores : [1, 0, 0, 0, 0, 0],
	trait : "Minotaur (+1 Strength, and either +1 Int, Wis, or Str) use \"Racial Options\" button\nHorns: I am proficient with my horns, a 1d10 piercing damage melee weapon that grant me advantage on shoving a creature, but not to avoid being shoved myself.\nGoring Rush: When taking a Dash action, I can make a horns attack as a bonus action.\nHammering Horns: When taking a melee Attack action, I can attempt to shove with my horns as a bonus action. I cannot use this to knock a creature prone.\nLabyrinthine Recall: I can perfectly recall any path I have travelled.",
	eval : "AddAction(\"bonus action\", \"Horns attack (when taking dash action)\", \"being a Minotaur\"); AddAction(\"bonus action\", \"Shove another (when taking attack action)\", \"being a Minotaur\");",
	removeeval : "RemoveAction(\"bonus action\", \"Horns attack (when taking dash action)\"); RemoveAction(\"bonus action\", \"Shove another (when taking attack action)\");",
	variants : ["cunning", "intellect", "strength"],
};
RaceSubList["minotaur-cunning"] = {
	regExpSearch : /(cunning|wisdom)/i,
	name : "Minotaur [Cunning]",
	source : ["UA:WA", 2],
	improvements : "Minotaur [cunning]: +1 Strength, +1 Wisdom;",
	scores : [1, 0, 0, 0, 1, 0],
	trait : "Minotaur [cunning] (+1 Strength, +1 Wisdom)\nHorns: I am proficient with my horns, a 1d10 piercing damage melee weapon that grant me advantage on shoving a creature, but not to avoid being shoved myself.\nGoring Rush: When taking a Dash action, I can make a horns attack as a bonus action.\nHammering Horns: When taking a melee Attack action, I can attempt to shove with my horns as a bonus action. I cannot use this to knock a creature prone.\nLabyrinthine Recall: I can perfectly recall any path I have travelled.",
};
RaceSubList["minotaur-intellect"] = {
	regExpSearch : /(intellect|intelligence)/i,
	name : "Minotaur [Intellect]",
	source : ["UA:WA", 2],
	improvements : "Minotaur [intellect]: +1 Strength, +1 Intelligence;",
	scores : [1, 0, 0, 1, 0, 0],
	trait : "Minotaur [intellect] (+1 Strength, +1 Intelligence)\nHorns: I am proficient with my horns, a 1d10 piercing damage melee weapon that grant me advantage on shoving a creature, but not to avoid being shoved myself.\nGoring Rush: When taking a Dash action, I can make a horns attack as a bonus action.\nHammering Horns: When taking a melee Attack action, I can attempt to shove with my horns as a bonus action. I cannot use this to knock a creature prone.\nLabyrinthine Recall: I can perfectly recall any path I have travelled.",
};
RaceSubList["minotaur-strength"] = {
	regExpSearch : /(strength|strong|\bmight\b)/i,
	name : "Minotaur [Strength]",
	source : ["UA:WA", 2],
	improvements : "Minotaur [strength]: +2 Strength;",
	scores : [1, 0, 0, 0, 0, 0],
	trait : "Minotaur [strength] (+2 Strength)\nHorns: I am proficient with my horns, a 1d10 piercing damage melee weapon that grant me advantage on shoving a creature, but not to avoid being shoved myself.\nGoring Rush: When taking a Dash action, I can make a horns attack as a bonus action.\nHammering Horns: When taking a melee Attack action, I can attempt to shove with my horns as a bonus action. I cannot use this to knock a creature prone.\nLabyrinthine Recall: I can perfectly recall any path I have travelled.",
};

/*	the Gothic Heroes Unearthed Arcana of 2016-04-04
	(http://dnd.wizards.com/sites/default/files/media/upload/articles/UA%20Gothic%20Characters.pdf)
*/
//adds eight new races, the Revenant versions of the Aasimar, Dragonborn, Dwarf, Elf, Gnome, Halfling, Human, and Tiefling
RaceList["aasimar revenant"] = { //based on the VGtM Aasimar
	regExpSearch : /^(?=.*revenant)((?=.*aasimar)|((?=.*planetouched)(?=.*(celestial|angel)))).*$/i,
	name : "Aasimar Revenant",
	sortname : "Revenant, Aasimar",
	source : ["UA:GH", 1],
	plural : "Aasimar",
	size : 3,
	speed : [30, 20],
	languageProfs : ["Common", "Celestial"],
	vision : "Darkvision 60 ft",
	dmgres : ["Necrotic", "Radiant"],
	age : " reach adulthood in their late teens and live around 160 years",
	height : " range from 5 to over 6 feet tall (4'9\" + 2d8\")",
	weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
	heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)",
	weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
	improvements : "Aasimar Revenant: +1 Constitution, +2 Charisma;",
	scores : [1, 0, 0, 0, 0, 2],
	trait : "Aasimar Revenant (+1 Constitution, +2 Charisma)" + (typePF ? "\n" : " ") + "Healing Hands: As an action, once per long rest, I can touch to heal for my level in HP.\nRelentless Nature: I have returned to life with one goal: avenge my death or finish an unresolved task. I will rest once I fulfill my goal, but until then I can't truly die. Whenever I'm below half my max HP at the start of my turn, I regain 1 HP. If I die, I return to life within 24 hours. If my body was destroyed, it is reformed within 1 mile of where I died. I always know the distance and direction to creatures involved with my goal.",
	features : {
		"healing hands" : {
			name : "Healing Hands",
			usages : 1,
			minlevel : 1,
			recovery : "long rest",
			additional : ["1 HP", "2 HP", "3 HP", "4 HP", "5 HP", "6 HP", "7 HP", "8 HP", "9 HP", "10 HP", "11 HP", "12 HP", "13 HP", "14 HP", "15 HP", "16 HP", "17 HP", "18 HP", "19 HP", "20 HP"],
			action : ["action", ""]
		}
	}
};
RaceList["dwarf revenant"] = {
	regExpSearch : /^(?=.*revenant)(?=.*\b(dwarfs?|dwarves|dwarfish|dwarvish|dwarven)\b).*$/i,
	name : "Dwarf Revenant",
	sortname : "Revenant, Dwarf",
	source : ["UA:GH", 1],
	plural : "Dwarves",
	size : 3,
	speed : [25, 25],
	languageProfs : ["Common", "Dwarvish"],
	vision : "Darkvision 60 ft",
	savetxt : { adv_vs : ["poison"] },
	dmgres : ["Poison"],
	weaponprofs : [false, false, ["battleaxe", "handaxe", "warhammer", "light hammer"]],
	toolProfs : [["Smith, brewer, or mason tools", 1]],
	age : " are considered young until they are 50 and live about 350 years",
	height : " stand between 4 and 5 feet tall (4' + 2d4\")",
	weight : " weigh around 150 lb (130 + 2d4 \xD7 2d6 lb)",
	heightMetric : " stand between 1,2 and 1,5 metres tall (120 + 5d4 cm)",
	weightMetric : " weigh around 75 kg (60 + 5d4 \xD7 4d6 / 10 kg)",
	improvements : "Dwarf Revenant: +3 Constitution;",
	scores : [0, 0, 3, 0, 0, 0],
	trait : "Dwarf Revenant (+3 Constitution)\nStonecunning: I have expertise on Int (History) checks related to the origin of stonework.\nRelentless Nature: I have returned to life with one goal: avenge my death or finish an unresolved task. I will rest once I fulfill my goal, but until then I can't truly die. Whenever I'm below half my max HP at the start of my turn, I regain 1 HP. If I die, I return to life within 24 hours. If my body was destroyed, it is reformed within 1 mile of where I died. I always know the distance and direction to creatures involved with my goal.",
};
RaceList["elf revenant"] = {
	regExpSearch : /^(?!.*half)(?=.*revenant)(?=.*\b(elfs?|elves|elvish|elven)\b).*$/i,
	name : "Elf Revenant",
	sortname : "Revenant, Elf",
	source : ["UA:GH", 1],
	plural : "Elves",
	size : 3,
	speed : [30, 20],
	languageProfs : ["Common", "Elvish"],
	vision : "Darkvision 60 ft",
	savetxt : {
		text : ["Magic can't put me to sleep"],
		adv_vs : ["charmed"]
	},
	skills : ["Perception"],
	age : " typically claim adulthood around age 100 and can live to be 750 years old",
	height : " range from under 5 to over 6 feet tall (4'6\" + 2d10\")",
	weight : " weigh around 115 lb (90 + 2d10 \xD7 1d4 lb)",
	heightMetric : " range from under 1,5 to over 1,8 metres tall (140 + 5d10 cm)",
	weightMetric : " weigh around 55 kg (40 + 5d10 \xD7 2d4 / 10 kg)",
	improvements : "Elf Revenant: +2 Dexterity, +1 Constitution;",
	scores : [0, 2, 1, 0, 0, 0],
	trait : "Elf Revenant (+2 Dexterity, +1 Constitution)\nTrance: I don't sleep, but meditate for 4 hours a day. I still need 8 hours for a long rest.\nRelentless Nature: I have returned to life with one goal: avenge my death or finish an unresolved task. I will rest once I fulfill my goal, but until then I can't truly die. Whenever I'm below half my max HP at the start of my turn, I regain 1 HP. If I die, I return to life within 24 hours. If my body was destroyed, it is reformed within 1 mile of where I died. I always know the distance and direction to creatures involved with my goal."
};
RaceList["halfling revenant"] = {
	regExpSearch : /^(?=.*revenant)(?=.*\b(halflings?|hobbits?)\b).*$/i,
	name : "Halfling Revenant",
	sortname : "Revenant, Halfling",
	source : ["UA:GH", 1],
	plural : "Halflings",
	size : 4,
	speed : [25, 15],
	languageProfs : ["Common", "Halfling"],
	savetxt : { adv_vs : ["frightened"] },
	age : " reach adulthood at age 20 and live around 150 years",
	height : " average about 3 feet tall (2'7\" + 2d4\")",
	weight : " weigh around 40 lb (35 + 2d4 lb)",
	heightMetric : " average about 90 cm tall (80 + 5d4)",
	weightMetric : " weigh around 18 kg (16 + 5d4 / 10 kg)",
	improvements : "Halfling Revenant: +2 Dexterity, +1 Constitution;",
	scores : [0, 2, 1, 0, 0, 0],
	trait : "Halfling Revenant (+2 Dexterity, +1 Constitution)" + (typePF ? "\n" : " ") + "Lucky: I reroll 1's on attack/check/save. Halfling Nimbleness: I can move through the space of anybody of a size larger than me.\nRelentless Nature: I have returned to life with one goal: avenge my death or finish an unresolved task. I will rest once I fulfill my goal, but until then I can't truly die. Whenever I'm below half my max HP at the start of my turn, I regain 1 HP. If I die, I return to life within 24 hours. If my body was destroyed, it is reformed within 1 mile of where I died. I always know the distance and direction to creatures involved with my goal.",
};
RaceList["gnome revenant"] = {
	regExpSearch : /^(?=.*revenant)(?=.*\bgnomes?\b).*$/i,
	name : "Gnome Revenant",
	sortname : "Revenant, Gnome",
	source : ["UA:GH", 1],
	plural : "Gnomes",
	size : 4,
	speed : [25, 15],
	languageProfs : ["Common", "Gnomish"],
	vision : "Darkvision 60 ft",
	savetxt : { text : ["Adv. on Int/Wis/Cha saves vs. magic"] },
	age : " start adult life around age 40 and can live 350 to almost 500 years",
	height : " are 3 to 4 feet tall (2'11\" + 2d4\")",
	weight : " weigh around 40 lb (35 + 2d4 lb)",
	heightMetric : " are 90 to 120 cm tall (2'11\" + 5d4)",
	weightMetric : " weigh around 18 kg (16 + 5d4 / 10 kg)",
	improvements : "Gnome Revenant: +1 Constitution, +2 Intelligence;",
	scores : [0, 0, 1, 2, 0, 0],
	trait : "Gnome Revenant (+1 Constitution, +2 Intelligence)\nRelentless Nature: I have returned to life with one goal: avenge my death or finish a critical, unresolved task. I will find rest once I fulfill my goal, but until then I can't truly die. Whenever I'm below half my max HP at the start of my turn, I regain 1 HP. If I die, I return to life within 24 hours. If my body was destroyed, it is reformed within 1 mile of where I died. Any destroyed equipment is not regained. I always know the distance and direction between me and any creature involved with my goal that is on the same plane.",
},
RaceList["dragonborn revenant"] = {
	regExpSearch : /^(?=.*dragonborn)(?=.*revenant).*$/i,
	name : "Dragonborn Revenant",
	sortname : "Revenant, Dragonborn",
	source : ["UA:GH", 1],
	plural : "Dragonborn",
	size : 3,
	speed : [30, 20],
	languageProfs : ["Common", "Draconic"],
	age : " reach adulthood by 15 and live around 80 years",
	height : " stand well over 6 feet tall (5'6\" + 2d8\")",
	weight : " weigh around 240 lb (175 + 2d8 \xD7 2d6 lb)",
	heightMetric : " stand well over 1,8 metres tall (170 + 5d8 cm)",
	weightMetric : " weigh around 110 kg (80 + 5d8 \xD7 4d6 / 10 kg)",
	improvements : "Dragonborn Revenant: +1 Strength, +1 Constitution, +1 Charisma;",
	scores : [1, 0, 1, 0, 0, 1],
	trait : "Dragonborn Revenant (+1 Strength, +1 Constitution, +1 Charisma)\nBreath Weapon: As an action, 5 ft by 30 ft line, Dex save halves, necrotic damage.\nRelentless Nature: I have returned to life with one goal: avenge my death or finish an unresolved task. I will rest once I fulfill my goal, but until then I can't truly die. Whenever I'm below half my max HP at the start of my turn, I regain 1 HP. If I die, I return to life within 24 hours. If my body was destroyed, it is reformed within 1 mile of where I died. I always know the distance and direction to creatures involved with my goal.",
	abilitySave : 3,
	dmgres : ["Necrotic"],
	features : {
		"breath weapon" : {
			name : "Breath Weapon",
			minlevel : 1,
			usages : 1,
			additional : ["2d6", "2d6", "2d6", "2d6", "2d6", "3d6", "3d6", "3d6", "3d6", "3d6", "4d6", "4d6", "4d6", "4d6", "4d6", "5d6", "5d6", "5d6", "5d6", "5d6"],
			recovery : "short rest",
			tooltip : " (Draconic Ancestry)",
			action : ["action", ""]
		}
	}
};
RaceList["human revenant"] = {
	regExpSearch : /^(?=.*human)(?=.*revenant).*$/i,
	name : "Human Revenant",
	sortname : "Revenant, Human",
	source : ["UA:GH", 1],
	plural : "Humans",
	size : 3,
	speed : [30, 20],
	languageProfs : ["Common", 1],
	age : " reach adulthood in their late teens and live less than 100 years",
	height : " range from barely 5 to well over 6 feet tall (4'8\" + 2d10\")",
	weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
	heightMetric : " range from barely 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
	weightMetric : " weigh around 75 kg (50 + 5d10 \xD7 4d4 / 10 kg)",
	improvements : "Human Revenant: +1 Constitution and +1 to two different ability scores of my choice;",
	scores : [0, 0, 1, 0, 0, 0],
	trait : "Human Revenant (+1 Constitution and +1 to two different ability scores of my choice)\nRelentless Nature: I have returned to life with one goal: avenge my death or finish a critical, unresolved task. I will find rest once I fulfill my goal, but until then I can't truly die. Whenever I'm below half my max HP at the start of my turn, I regain 1 HP. If I die, I return to life within 24 hours. If my body was destroyed, it is reformed within 1 mile of where I died. Any destroyed equipment is not regained. I always know the distance and direction between me and any creature involved with my goal that is on the same plane."
};
RaceList["tiefling revenant"] = {
	regExpSearch : /^(?=.*revenant)((?=.*tiefling)|(?=.*planetouched)(?=.*(hell|abyss|fiend|devil))).*$/i,
	name : "Tiefling Revenant",
	sortname : "Revenant, Tiefling",
	source : ["UA:GH", 1],
	plural : "Tieflings",
	size : 3,
	speed : [30, 20],
	languageProfs : ["Common", "Infernal"],
	vision : "Darkvision 60 ft",
	age : " reach adulthood in their late teens and live around 100 years",
	height : " range from 5 to over 6 feet tall (4'9\" + 2d8\")",
	weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
	heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)",
	weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
	improvements : "Tiefling Revenant: +1 Constitution, +2 Charisma;",
	scores : [0, 0, 1, 0, 0, 2],
	trait : "Tiefling Revenant (+1 Constitution, +2 Charisma)\nRelentless Nature: I have returned to life with one goal: avenge my death or finish a critical, unresolved task. I will find rest once I fulfill my goal, but until then I can't truly die. Whenever I'm below half my max HP at the start of my turn, I regain 1 HP. If I die, I return to life within 24 hours. If my body was destroyed, it is reformed within 1 mile of where I died. Any destroyed equipment is not regained. I always know the distance and direction between me and any creature involved with my goal that is on the same plane.",
};

/*	the That Old Black Magic Unearthed Arcana of 2015-12-17
	(http://media.wizards.com/2015/downloads/dnd/07_UA_That_Old_Black_Magic.pdf)
*/
//adds a racial variant: the Abyssal Tiefling
function AmendRaces() { //a function to create these tiefling alternatives, together with the Feral Tiefling from SCAG
	[{
		objname : "feral tiefling",
		replaceTraitTxt : ["+1 Intelligence, +2 Charisma", "+2 Dexterity, +1 Intelligence"],
		replaceNameTxt : ["tiefling", "feral tiefling"],
		regExpSearch : /^(?=.*feral)((?=.*tiefling)|(?=.*planetouched)(?=.*(hell|abyss|fiend|devil))).*$/i,
		name : "Feral tiefling",
		source : ["S", 118],
		plural : "Feral tieflings",
		sortname : "Tiefling, Feral",
		improvements : "Feral Tiefling: +2 Dexterity, +1 Intelligence;",
		scores : [0, 2, 0, 1, 0, 0],
		trait : "Feral Tiefling (+2 Dexterity, +1 Intelligence)\n\nInfernal Legacy:\n   I know the Thaumaturgy cantrip.\n   At 3rd level, I can cast the Hellish Rebuke spell once per long rest as a 2nd-level spell.\n   At 5th level, I can also cast the Darkness spell once per long rest.\n   Charisma is my spellcasting ability for these spells."
	}, {
		objname : "abyssal tiefling",
		replaceTraitTxt : ["+1 Intelligence, +2 Charisma", "+1 Constitution, +2 Charisma"],
		replaceNameTxt : ["tiefling", "abyssal tiefling"],
		regExpSearch : /^(?=.*abyssal)((?=.*tiefling)|(?=.*planetouched)(?=.*(hell|abyss|fiend|devil))).*$/i,
		name : "Abyssal tiefling",
		source : ["UA:TOBM", 1],
		plural : "Abyssal tieflings",
		sortname : "Tiefling, Abyssal",
		dmgres : "",
		improvements : "Abyssal Tiefling: +1 Constitution, +2 Charisma;",
		scores : [0, 0, 1, 0, 0, 2],
		trait : "Abyssal Tiefling (+1 Constitution, +2 Charisma)\nAbyssal Toughness: My hit point maximum increases with half the levels I have (min 1). Abyssal Arcana: After each long rest I gain randomly determined spellcasting ability (d6). This is a cantrip, and on both 3rd and 5th level a spell that I can cast once, at 2nd-level.\n1: (Dancing Lights, Burning Hands, Alter Self); 2: (True Strike, Charm Person, Darkness)" + (!typePF ? ";" : " ") + " 3: (Light, Magic Missile, Invisibility); 4: (Spare the Dying, Hideous Laughter, Mirror Image)" + (!typePF ? ";" : " ") + " 5: (Message, Cure Wounds, Levitate); 6: (Prestidigitation, Thunderwave, Spider Climb)",
		languageProfs : ["Common", "Abyssal"],
		spellcastingBonus : {
			name : "Abyssal Arcana (level 1)",
			spells : ["dancing lights", "true strike", "light", "message", "spare the dying", "prestidigitation"],
			atwill : true
		},
		features : {
			"abyssal fortitude" : {
				name : "Abyssal Fortitude",
				minlevel : 1,
				calcChanges : {
					hp : "extrahp += Math.max(1,Math.floor(totalhd/2)); extrastring += \"\\n + \" + Math.max(1,Math.floor(totalhd/2)) + \" from Abyssal Fortitude\";"
				}
			},
			"abyssal arcana (level 3)" : {
				name : "Abyssal Arcana (level 3)",
				minlevel : 3,
				usages : 1,
				recovery : "long rest",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Abyssal Arcana (level 3)",
					spells : ["burning hands", "charm person", "magic missile", "cure wounds", "tasha's hideous laughter", "thunderwave"],
					oncelr : true
				}
			},
			"abyssal arcana (level 5)" : {
				name : "Abyssal Arcana (level 5)",
				minlevel : 5,
				usages : 1,
				recovery : "long rest",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Abyssal Arcana (level 5)",
					spells : ["alter self", "darkness", "invisibility", "levitate", "mirror image", "spider climb"],
					oncelr : true
				}
			}
		}
	}].forEach( function(tRace) {
		//make a new RaceList object for each race
		RaceList[tRace.objname] = eval(RaceList.tiefling.toSource());
		for (var rFea in tRace) {
			if ((/objname|replaceTraitTxt|replaceNameTxt/).test(rFea)) continue;
			RaceList[tRace.objname][rFea] = tRace[rFea];
		};
		//now do the variants
		RaceList[tRace.objname].variants.forEach( function(nVar) {
			RaceSubList[tRace.objname + "-" + nVar] = eval(RaceSubList["tiefling-" + nVar].toSource());
			var thisVar = RaceSubList[tRace.objname + "-" + nVar];
			thisVar.trait = thisVar.trait.replace(tRace.replaceTraitTxt[0], tRace.replaceTraitTxt[1]);
			thisVar.trait = thisVar.trait.replace(tRace.replaceNameTxt[0].capitalize(), tRace.replaceNameTxt[1].capitalize());
			thisVar.name = thisVar.name.replace(tRace.replaceNameTxt[0], tRace.replaceNameTxt[1]);
			thisVar.plural = thisVar.plural.replace(tRace.replaceNameTxt[0], tRace.replaceNameTxt[1]);
		});
	});
};


/*	the Eladrin and Gith Unearthed Arcana of 2017-09-11
	(http://media.wizards.com/2017/dnd/downloads/UA-Eladrin-Gith.pdf)
*/
//adds three new race options: an alternative version of the Eladrin and the Gith with two subraces: Githyanki and Githzerai
RaceList["uaeladrin"] = {
	regExpSearch : /^(?!.*half)((?=.*eladrin)|((?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\b(feys?|feywild)\b))).*$/i,
	name : "Eladrin ",
	sortname : "Elf, Fey (Eladrin)",
	source : ["UA:EnG", 1],
	plural : "Eladrin",
	size : 3,
	speed : [30, 20],
	languageProfs : ["Common", "Elvish"],
	vision : "Darkvision 60 ft",
	savetxt : {
		text : ["Magic can't put me to sleep"],
		adv_vs : ["charmed"]
	},
	skills : ["Perception"],
	age : " typically claim adulthood around age 100 and can live to be 750 years old",
	height : " range from under 5 to over 6 feet tall (4'6\" + 2d12\")",
	weight : " weigh around 115 lb (90 + 2d10 \xD7 1d4 lb)",
	heightMetric : " range from under 1,5 to over 1,8 metres tall (140 + 5d12 cm)",
	weightMetric : " weigh around 55 kg (40 + 5d10 \xD7 2d4 / 10 kg)",
	improvements : "Eladrin: +2 Dexterity, +1 Intelligence or Charisma;",
	scores : [0, 2, 0, 0, 0, 0],
	trait : "Eladrin (+2 Dexterity, +1 Intelligence or Charisma)\nTrance: Elves don't need to sleep, but meditate semiconsciously, for 4 hours a day. This gives the same benefit as a human gets from 8 hours of sleep (long rest still 8 hours).\nFey Step: Once per short rest, as a bonus action, I can magically teleport up to 30 ft to an unoccupied space I can see." + (typePF ? "\n" : " ") + "Shifting Seasons: After a short or long rest, I can align myself with a season, granting me acces to a cantrip until my next rest: Friends, Chill Touch, Minor Illusion, or Fire Bolt. My spellcasting ability for this is Int or Cha, whichever is higher.",
	spellcastingAbility : 6,
	spellcastingBonus : {
		name : "Shifting Seasons",
		spells : ["friends", "chill touch", "minor illusion", "fire bolt"],
		selection : ["friends", "chill touch", "minor illusion", "fire bolt"],
		firstCol : "checkbox",
		times : 4
	},
	features : {
		"fey step" : {
			name : "Fey Step",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			tooltip : "",
			action : ["bonus action", ""]
		}
	}
};

RaceList["githyanki"] = {
	regExpSearch : /githyanki/i,
	name : "Githyanki",
	source : ["UA:EnG", 2],
	plural : "Githyanki",
	size : 3,
	speed : [30, 20],
	languageProfs : ["Common", "Gith", 1],
	armor : [true, true, false, false],
	skillstxt : "Choose any one skill or tool",
	age : " reach adulthood in their late teens and live for about a century",
	height : " are more leaner and taller than humans, most are a lean 6 feet tall (5'0\" + 2d12\")",
	weight : " weigh around 135 lb (100 + 2d12 \xD7 2d4 lb)",
	heightMetric : " are more leaner and taller than humans, most are a lean 1,8 metres tall (150 + 5d12 cm)",
	weightMetric : " weigh around 61 kg (45 + 5d10 \xD7 4d4 / 10 kg)",
	improvements : "Githyanki: +2 Strength, +1 Intelligence;",
	scores : [2, 0, 0, 1, 0, 0],
	trait : "Githyanki (+2 Strength, +1 Intelligence)\n\nGithyanki Psionics:\n   I know the Mage Hand cantrip.\n   At 3rd level, I can cast the Jump spell once per long rest.\n   At 5th level, I can also cast the Misty Step spell once per long rest.\n   Intelligence is my spellcasting ability for these spells.",
	spellcastingAbility : 4,
	spellcastingBonus : {
		name : "Githyanki Psionics",
		spells : ["mage hand"],
		selection : ["mage hand"],
		atwill : true
	},
	features : {
		"githyanki psionics (jump)" : {
			name : "Githyanki Psionics (Jump)",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			tooltip : " (Githyanki Psionics)",
			action : ["action", ""],
			spellcastingBonus : {
				name : "Githyanki Psionics",
				spells : ["jump"],
				selection : ["jump"],
				oncelr : true
			}
		},
		"githyanki psionics (misty step)" : {
			name : "Githyanki Psionics (Misty Step)",
			minlevel : 5,
			usages : 1,
			recovery : "long rest",
			tooltip : " (Githyanki Psionics)",
			action : ["bonus action", ""],
			spellcastingBonus : {
				name : "Githyanki Psionics",
				spells : ["misty step"],
				selection : ["misty step"],
				oncelr : true
			}
		}
	},
	variants : ["tool proficiency", "skill proficiency"]
};
RaceSubList["githyanki-tool proficiency"] = {
	regExpSearch : /tool proficiency/i,
	toolProfs : [["Any tool", 1]]
};
RaceSubList["githyanki-skill proficiency"] = {
	regExpSearch : /skill proficiency/i,
	skillstxt : "Choose any one skill"
};

RaceList["githzerai"] = {
	regExpSearch : /githzerai/i,
	name : "Githzerai",
	source : ["UA:EnG", 3],
	plural : "Githzerai",
	size : 3,
	speed : [30, 20],
	languageProfs : ["Common", "Gith"],
	age : " reach adulthood in their late teens and live for about a century",
	height : " are more leaner and taller than humans, most are a lean 6 feet tall (4'11\" + 2d12\")",
	weight : " weigh around 115 lb (90 + 2d12 \xD7 1d4 lb)",
	heightMetric : " are more leaner and taller than humans, most are a lean 1,8 metres tall (150 + 5d12 cm)",
	weightMetric : " weigh around 55 kg (40 + 5d10 \xD7 2d4 / 10 kg)",
	improvements : "Githzerai: +1 Intelligence, +2 Wisdom;",
	scores : [0, 0, 0, 1, 2, 0],
	trait : "Githzerai (+1 Intelligence, +2 Wisdom)\n" + (typePF ? "\n" : "") + "Monastic Training: I gain a +1 bonus to AC while I'm not wearing medium or heavy armor and not using a shield.\n\nGithzerai Psionics: I know the Mage Hand cantrip. At 3rd level, I can cast the Shield spell once per long rest. At 5th level, I can also cast the Detect Thoughts spell once per long rest. Wisdom is my spellcasting ability for these spells.",
	spellcastingAbility : 5,
	spellcastingBonus : {
		name : "Githzerai Psionics",
		spells : ["mage hand"],
		selection : ["mage hand"],
		atwill : true
	},
	features : {
		"githzerai psionics (shield)" : {
			name : "Githzerai Psionics (Shield)",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			tooltip : " (Githzerai Psionics)",
			action : ["reaction", ""],
			spellcastingBonus : {
				name : "Githzerai Psionics",
				spells : ["shield"],
				selection : ["shield"],
				oncelr : true
			}
		},
		"githzerai psionics (detect thoughts)" : {
			name : "Githzerai Psionics (Detect Thoughts)",
			minlevel : 5,
			usages : 1,
			recovery : "long rest",
			tooltip : " (Githzerai Psionics)",
			action : ["action", ""],
			spellcastingBonus : {
				name : "Githzerai Psionics",
				spells : ["detect thoughts"],
				selection : ["detect thoughts"],
				oncelr : true
			}
		}
	},
	eval : "AddACMisc(1, 'Monastic Training', '+1 AC while not wearing medium or heavy armor and not using a shield.\\n\\nMonastic Training was gained from being a Githzerai.', \"tDoc.getField('Medium Armor').isBoxChecked(0) || tDoc.getField('Heavy Armor').isBoxChecked(0) || What('AC Shield Bonus')\")",
	removeeval : "AddACMisc(0, 'Monastic Training', '+1 AC while not wearing medium or heavy armor and not using a shield.\\n\\nMonastic Training was gained from being a Githzerai.')"
};


