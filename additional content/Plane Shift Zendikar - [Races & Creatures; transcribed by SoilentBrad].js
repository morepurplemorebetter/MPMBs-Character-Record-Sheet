/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Races, Subraces, Creatures
	Effect:		This script adds a number of races, subraces, and creatures from the Magic: The Gathering plane of Zendikar
				This is taken from the Plane Shift: Zendikar article (http://magic.wizards.com/en/articles/archive/feature/plane-shift-zendikar-2016-04-27)
	Code by:	SoilentBrad (and tiny corrections by MPMB)
	Date:		2017-04-24 (sheet v12.96)
*/

SourceList["PS:Z"] = {
	name : "Plane Shift: Zendikar", // 2016-04-27
	abbreviation : "PS:Z",
	group : "Plane Shift",
	url : "https://media.wizards.com/2016/downloads/magic/Plane%20Shift%20Zendikar.pdf"
};

RaceList["kor"] = {
	regExpSearch : /\bkor\b/i,
	name : "Kor",
	source : ["PS:Z", 11],
	plural : "Kor",
	size : 3,
	speed : ["30 ft\n30 ft climb", 20],
	savetxt : "Adv. vs. being frightened",
	skills : ["Acrobatics", "Athletics"],
	languages : ["Common", "Kor (silent speech)"],
	age : " reach adulthood in their late teens and live less than a century",
	height : " average nearly 6 feet tall (4'9\" + 2d8\")",
	weight : " are more slender than humans",
	improvements : "Kor: +2 Dexterity, +1 Wisdom;",
	scores : [0, 2, 0, 0, 1, 0],
	trait : "Kor (+2 Dexterity, +1 Wisdom)\nKor Climbling: I have proficiency in the Athletics and Acrobatics skills.\nLucky: When I roll a 1 on the d20 for an attack roll, ability check, or saving throw, I can reroll the die and must use the new roll.\nBrave: I have advantage on saving throws against being frightened."
};

RaceList["emeria merfolk"] = {
	regExpSearch : /^(?=.*\b(emeria|wind))(?=.*(merfolk|mermaid|merman)\b).*$/i,
	name : "Emeria Creed Merfolk",
	sortname : "Merfolk, Emeria Creed",
	source : ["PS:Z", 13],
	plural : "Emeria Creed Merfolk",
	size : 3,
	speed : ["30 ft\n30 ft swim", "20 ft\n20 ft swim"],
	languages : ["Common", "Merfolk", "+1 from Merfolk"],
	age : " reach adulthood around 20 and live considerably longer than humans",
	skills : ["Deception", "Persuasion"],
	improvements : "Emeria Creed Merfolk: +2 Wisdom, +1 Charisma;",
	scores : [0, 0, 0, 0, 2, 1],
	trait : "Emeria Creed Merfolk (+2 Wisdom, +1 Charisma)\nAmphibious: I can breathe air and water.\nWind Creed Manipulation: I have proficiency in the Deception and Persuasion skills.\nCantrip: I know one cantrip of my choice from the druid spell list. Wisdom is my spellcasting ability for it.",
	abilitySave : 5,
	spellcastingAbility : 5,
	spellcastingBonus : {
		name : "Emeria Creed Cantrip",
		class : "druid",
		level : [0, 0],
		atwill : true
	}
};
RaceList["ula merfolk"] = {
	regExpSearch : /^(?=.*\b(ula|water))(?=.*(merfolk|mermaid|merman)\b).*$/i,
	name : "Ula Creed Merfolk",
	sortname : "Merfolk, Ula Creed",
	source : ["PS:Z", 13],
	plural : "Ula Creed Merfolk",
	size : 3,
	speed : ["30 ft\n30 ft swim", "20 ft\n20 ft swim"],
	languages : ["Common", "Merfolk", "+1 from Merfolk"],
	age : " reach adulthood around 20 and live considerably longer than humans",
	skills : ["Survival"],
	tools : ["Navigator's tools"],
	improvements : "Ula Creed Merfolk: +2 Intelligence, +1 Charisma;",
	scores : [0, 0, 0, 2, 0, 1],
	trait : "Ula Creed Merfolk (+2 Intelligence, +1 Charisma)\nAmphibious: I can breathe air and water.\nWater Creed Navigation: I have proficiency with navigator's tools and in the Survival skill.\nCantrip: I know one cantrip of my choice from the wizard spell list. Intelligence is my spellcasting ability for it.",
	abilitySave : 4,
	spellcastingAbility : 4,
	spellcastingBonus : {
		name : "Ula Creed Cantrip",
		class : "wizard",
		level : [0, 0],
		atwill : true
	}
};
RaceList["cosi merfolk"] = {
	regExpSearch : /^(?=.*\b(cosi|trickster))(?=.*(merfolk|mermaid|merman)\b).*$/i,
	name : "Cosi Creed Merfolk",
	sortname : "Merfolk, Cosi Creed",
	source : ["PS:Z", 13],
	plural : "Cosi Creed Merfolk",
	size : 3,
	speed : ["30 ft\n30 ft swim", "20 ft\n20 ft swim"],
	languages : ["Common", "Merfolk", "+1 from Merfolk"],
	age : " reach adulthood around 20 and live considerably longer than humans",
	skills : ["Sleight of Hand", "Stealth"],
	improvements : "Ula Creed Merfolk: +1 Intelligence, +2 Charisma;",
	scores : [0, 0, 0, 1, 0, 2],
	trait : "Ula Creed Merfolk (+1 Intelligence, +2 Charisma)\nAmphibious: I can breathe air and water.\nCreed of the Trickster: I have proficiency in the Sleight of Hand and Stealth skills.\nCantrip: I know one cantrip of my choice from the bard spell list. Charisma is my spellcasting ability for it.",
	abilitySave : 6,
	spellcastingAbility : 6,
	spellcastingBonus : {
		name : "Cosi Creed Cantrip",
		class : "bard",
		level : [0, 0],
		atwill : true
	}
};

RaceList["vampire"] = {
	regExpSearch : /vampire/i,
	name : "Vampire",
	source : ["PS:Z", 15],
	plural : "Vampires",
	size : 3,
	speed : [30, 20],
	languages : ["Common", "Vampire"],
	vision : "Darkvision 60 ft",
	dmgres : ["necrotic"],
	weapons : ["blood thirst"],
	age : " don't mature and age in the same way that other races do. Every living vampire is either a bloodchief, infected by Ulamog's influence in the distant reaches of history, or was spawned by a bloodchief from a living human. Most vampires are thus very old, but few have any memory of their earliest years.",
	improvements : "Vampire: +1 Intelligence, +2 Charisma;",
	scores : [0, 0, 0, 1, 0, 2],
	trait : "Vampire (+1 Intelligence, +2 Charisma)\nBlood Thirst: I can drain blood and life energy with a melee attack from a willing creature, or one that is grappled by me, incapacitated, or restrained.\n   A humanoid killed in this way becomes a null. Otherwise, a target's max HP reduction lasts until it finishes a long rest."
};
WeaponsList["blood thirst"] = {
	regExpSearch : /^(?=.*blood)(?=.*thirst).*$/i,
	name : "Blood Thirst",
	source : ["PS:Z", 15],
	list : "Melee",
	ability : 1,
	type : "Natural",
	damage : [1, 6, "necrotic"],
	range : "Melee",
	description : "+1 piercing damage; Reduces max HP by the necrotic damage, while healing me for the same",
	abilitytodamage : false,
	monkweapon : false
};

RaceList["grotag tribe goblin"] = {
	regExpSearch : /^(?=.*\bgrotag)(?=.*goblin\b).*$/i,
	name : "Grotag tribe goblin",
	sortname : "Goblin, Grotag Tribe",
	source : ["PS:Z", 17],
	plural : "Grotag tribe goblins",
	size : 4,
	speed : [25, 15],
	languages : ["Common", "Goblin"],
	vision : "Darkvision 60 ft",
	dmgres : ["fire", "psychic"],
	skills : ["Animal Handling"],
	age : " reach adulthood at around 12 and rarely live longer than 50 years",
	height : " average about 3 feet tall (3'\" + 2d4\")",
	weight : " weigh about 40 lb (35 + 2d4 \xD7 1d4 lb)",
	heightMetric : " average about 100 cm tall (100 + 5d4 cm)",
	weightMetric : " weigh about 20 kg (17 + 5d4 \xD7 2d4 / 10 kg)",
	improvements : "Grotag Tribe Goblin: +2 Constitution;",
	scores : [0, 0, 2, 0, 0, 0],
	trait : "Grotag Tribe Goblin (+2 Constitution)\nGrit: I have resistance to fire damage and psychic damage.\n   In addition, when I am wearing no armor, my AC is equal to 11 + my Dexterity modifier.",
};
RaceList["lavastep tribe goblin"] = {
	regExpSearch : /^(?=.*\blavastep)(?=.*goblin\b).*$/i,
	name : "Lavastep tribe goblin",
	sortname : "Goblin, Lavastep Tribe",
	source : ["PS:Z", 17],
	plural : "Lavastep tribe goblins",
	size : 4,
	speed : [25, 15],
	languages : ["Common", "Goblin"],
	vision : "Darkvision 60 ft",
	dmgres : ["fire", "psychic"],
	age : " reach adulthood at around 12 and rarely live longer than 50 years",
	height : " average about 3 feet tall (3'\" + 2d4\")",
	weight : " weigh about 40 lb (35 + 2d4 \xD7 1d4 lb)",
	heightMetric : " average about 100 cm tall (100 + 5d4 cm)",
	weightMetric : " weigh about 20 kg (17 + 5d4 \xD7 2d4 / 10 kg)",
	improvements : "Lavastep Tribe Goblin: +2 Constitution;",
	scores : [0, 0, 2, 0, 0, 0],
	trait : "Lavastep Tribe Goblin (+2 Constitution)\nGrit: I have resistance to fire damage and psychic damage.\n   In addition, when I am wearing no armor, my AC is equal to 11 + my Dexterity modifier.\nLavastep Grit: I have advantage on Dexterity (Stealth) checks made to hide in rocky or subterranean environments.",
};
RaceList["tuktuk tribe goblin"] = {
	regExpSearch : /^(?=.*\btuktuk)(?=.*goblin\b).*$/i,
	name : "Tuktuk tribe goblin",
	sortname : "Goblin, Tuktuk Tribe",
	source : ["PS:Z", 17],
	plural : "Tuktuk tribe goblins",
	size : 4,
	speed : [25, 15],
	languages : ["Common", "Goblin"],
	vision : "Darkvision 60 ft",
	dmgres : ["fire", "psychic"],
	tools : ["Thieves' tools"],
	age : " reach adulthood at around 12 and rarely live longer than 50 years",
	height : " average about 3 feet tall (3'\" + 2d4\")",
	weight : " weigh about 40 lb (35 + 2d4 \xD7 1d4 lb)",
	heightMetric : " average about 100 cm tall (100 + 5d4 cm)",
	weightMetric : " weigh about 20 kg (17 + 5d4 \xD7 2d4 / 10 kg)",
	improvements : "Tuktuk Tribe Goblin: +2 Constitution;",
	scores : [0, 0, 2, 0, 0, 0],
	trait : "Tuktuk Tribe Goblin (+2 Constitution)\nGrit: I have resistance to fire damage and psychic damage.\n   In addition, when I am wearing no armor, my AC is equal to 11 + my Dexterity modifier.",
};
ArmourList["goblin grit"] = {
	regExpSearch : /^(?=.*goblin)(?=.*grit).*$/i,
	name : "Goblin Grit",
	source : ["PS:Z", 17],
	type : "",
	ac : 11,
	stealthdis : false,
	strReq : 0
};

RaceList["tajuru elf"] = {
	regExpSearch : /^(?!.*half)(?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\btajuru\b).*$/i,
	name : "Tajuru elf",
	sortname : "Elf, Tajuru",
	source : ["PS:Z", 19],
	plural : "Tajuru elves",
	size : 3,
	speed : [30, 20],
	languages : ["Common", "Elvish"],
	vision : "Darkvision 60 ft",
	savetxt : "Adv. vs. being charmed; Magic can't put me to sleep",
	skills : ["Perception"],
	skillstxt : "Choose any two skills or tools",
	age : " typically claim adulthood around age 100 and can live to be 750 years old",
	height : " range from under 5 to over 6 feet tall (4'6\" + 2d10\")",
	weight : " weigh around 115 lb (90 + 2d10 \xD7 1d4 lb)",
	heightMetric : " range from under 1,5 to over 1,8 metres tall (140 + 5d10 cm)",
	weightMetric : " weigh around 55 kg (40 + 5d10 \xD7 2d4 / 10 kg)",
	improvements : "Tajuru Elf: +2 Wisdom, +1 Charisma;",
	scores : [0, 0, 0, 0, 2, 1],
	trait : "Tajuru Elf (+2 Wisdom, +1 Charisma)\nTajuru Nation: Tajuru elves are the most open to people of other races, seeing their skills and perspectives as valuable new tools for survival.",
};
RaceList["joraga elf"] = {
	regExpSearch : /^(?!.*half)(?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\bjoraga\b).*$/i,
	name : "Joraga elf",
	sortname : "Elf, Joraga",
	source : ["PS:Z", 19],
	plural : "Joraga elves",
	size : 3,
	speed : [35, 25],
	languages : ["Common", "Elvish"],
	vision : "Darkvision 60 ft",
	savetxt : "Adv. vs. being charmed; Magic can't put me to sleep",
	weaponprofs : [false, false, ["longsword", "shortsword", "longbow", "shortbow"]],
	skills : ["Perception"],
	age : " typically claim adulthood around age 100 and can live to be 750 years old",
	height : " range from under 5 to over 6 feet tall (4'6\" + 2d10\")",
	weight : " weigh around 115 lb (90 + 2d10 \xD7 1d4 lb)",
	heightMetric : " range from under 1,5 to over 1,8 metres tall (140 + 5d10 cm)",
	weightMetric : " weigh around 55 kg (40 + 5d10 \xD7 2d4 / 10 kg)",
	improvements : "Joraga Elf: +1 Dexterity, +2 Wisdom;",
	scores : [0, 1, 0, 0, 2, 0],
	trait : "Joraga Elf (+1 Dexterity, +2 Wisdom)\nMask of the Wild: I can attempt to hide even when I am only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.",
};
RaceList["mul daya elf"] = {
	regExpSearch : /^(?!.*half)(?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\bmul)(?=.*daya\b).*$/i,
	regExpSearch : /^(?!.*half)((?=.*(silvanesti|qualinesti))|((?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\b(mul)(daya)\b))).*$/i,
	name : "Mul Daya elf",
	sortname : "Elf, Mul Daya",
	source : ["PS:Z", 19],
	plural : "Mul Daya elves",
	size : 3,
	speed : [30, 20],
	languages : ["Common", "Elvish"],
	vision : "Darkvision 120 ft; Sunlight Sensitivity",
	savetxt : "Adv. vs. being charmed; Magic can't put me to sleep",
	skills : ["Perception"],
	weaponprofs : [false, false, ["longsword", "shortsword", "longbow", "shortbow"]],
	age : " typically claim adulthood around age 100 and can live to be 750 years old",
	height : " range from under 5 to over 6 feet tall (4'6\" + 2d10\")",
	weight : " weigh around 115 lb (90 + 2d10 \xD7 1d4 lb)",
	heightMetric : " range from under 1,5 to over 1,8 metres tall (140 + 5d10 cm)",
	weightMetric : " weigh around 55 kg (40 + 5d10 \xD7 2d4 / 10 kg)",
	improvements : "Mul Daya Elf: +1 Strength, +2 Wisdom;",
	scores : [1, 0, 0, 0, 2, 0],
	trait : "Mul Daya Elf (+1 Strength, +2 Wisdom)\nSunlight Sensitivity: Disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight when I or what I am trying to attack/perceive is in direct sunlight.\nMul Daya Magic: 1st level: Chill Touch cantrip; 3rd level: Hex; 5th level: Darkness. Both spells can be used once per long rest. Wisdom is my spellcasting ability for these.",
	abilitySave : 5,
	spellcastingAbility : 5,
	spellcastingBonus : {
		name : "Mul Daya Magic (level 1)",
		spells : ["chill touch"],
		selection : ["chill touch"],
		atwill : true
	},
	features : {
		"faerie fire" : {
			name : "Faerie Fire",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			tooltip : " (Mul Daya Magic)",
			action : ["bonus action", ""],
			spellcastingBonus : {
				name : "Mul Daya Magic (level 3)",
				spells : ["hex"],
				selection : ["hex"],
				oncelr : true
			}
		},
		"darkness" : {
			name : "Darkness",
			minlevel : 5,
			usages : 1,
			recovery : "long rest",
			tooltip : " (Mul Daya Magic)",
			action : ["action", ""],
			spellcastingBonus : {
				name : "Mul Daya Magic (level 5)",
				spells : ["darkness"],
				selection : ["darkness"],
				oncelr : true
			}
		}
	}
};

CreatureList["woodcrasher baloth"] = {
	name : "Woodcrasher Baloth",
	source : ["PS:Z", 33],
	size : 1,
	type : "Beast",
	subtype : "",
	alignment : "Unaligned",
	ac : 13,
	hp : 95,
	hd : [10, 12],
	speed : "50 ft, climb 30 ft",
	scores : [22, 9, 17, 2, 11, 5],
	saves : ["", "", "", "", "", ""],
	senses : "",
	passivePerception : 10,
	languages : "",
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 1,
	attacks : [{
			name : "Gore",
			ability : 1,
			damage : [4, 8, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Trampling Charge trait",
		}, {
			name : "Stomp",
			ability : 1,
			damage : [3, 10, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Can only be used on prone creatures (also see Trampling Charge trait)",
		},
	],
	traits : [{
			name : "Trampling Charge",
			description : "If the baloth moves at least 20 ft straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the baloth can make one stomp attack against it as a bonus action.",
		},
	],
};

CreatureList["gnarlid"] = {
	name : "Gnarlid",
	source : ["PS:Z", 34],
	size : 3,
	type : "Beast",
	subtype : "",
	alignment : "Unaligned",
	ac : 11,
	hp : 17,
	hd : [2, 10],
	speed : "40 ft, climb 30 ft",
	scores : [19, 10, 16, 2, 13, 7],
	saves : ["", "", "", "", "", ""],
	skills : {
		"perception" : 3,
	},
	senses : "Adv. on Wis (Perception) checks using smell",
	passivePerception : 13,
	languages : "",
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : "1d8 when enlarged; One bite and one claw attack as an Attack action",
			modifiers : [-1, "", ""],
		}, {
			name : "Claw",
			ability : 1,
			damage : [1, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "2d6 when enlarged; One claw and one bite attack as an Attack action",
			modifiers : [-1, "", ""],
		},
	],
	traits : [{
			name : "Keen Smell",
			description : "The gnarlid has advantage on Wisdom (Perception) checks that rely on smell.",
		}, {
			name : "Enlarge",
			description : "As an action, the gnarlid can enlarge. When enlarged, its HP maximum and damage dealt is doubled.",
		},
	],
};

CreatureList["ox"] = {
	name : "Ox",
	source : ["PS:Z", 34],
	size : 2,
	type : "Beast",
	subtype : "",
	alignment : "Unaligned",
	ac : 11,
	hp : 19,
	hd : [3, 10],
	speed : "40 ft",
	scores : [17, 11, 12, 3, 12, 6],
	saves : ["", "", "", "", "", ""],
	senses : "",
	passivePerception : 11,
	languages : "",
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
			name : "Ram",
			ability : 1,
			damage : [2, 4, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Charge trait",
		},
	],
	traits : [{
			name : "Charge",
			description : "If the ox hits with a ram attack after moving at least 20 ft straight toward a target on the same turn, the target takes an extra 2d4 bludgeoning damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.",
		},
	],
};

CreatureList["terastodon"] = {
	name : "Terastodon",
	source : ["PS:Z", 34],
	size : 1,
	type : "Beast",
	subtype : "",
	alignment : "Unaligned",
	ac : 13,
	hp : 126,
	hd : [11, 12],
	speed : "40 ft",
	scores : [24, 9, 21, 3, 11, 6],
	saves : ["", "", "", "", "", ""],
	senses : "",
	passivePerception : 10,
	languages : "",
	challengeRating : "6",
	proficiencyBonus : 3,
	attacksAction : 1,
	attacks : [{
			name : "Gore",
			ability : 1,
			damage : [4, 8, "bludgeoning"],
			range : "Melee (10 ft)",
			description : "If used after moving 20 ft straight in the same round, see Trampling Charge trait",
		}, {
			name : "Stomp",
			ability : 1,
			damage : [4, 10, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Can only be used on prone creatures (also see Trampling Charge trait)",
		},
	],
	traits : [{
			name : "Trampling Charge",
			description : "If the terastodon moves at least 20 ft straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 18 Strength saving throw or be knocked prone. If the target is prone, the terastodon can make one stomp attack against it as a bonus action.",
		},
	],
};

CreatureList["terra stomper"] = {
	name : "Terra Stomper",
	source : ["PS:Z", 34],
	size : 1,
	type : "Beast",
	subtype : "",
	alignment : "Unaligned",
	ac : 13,
	hp : 136,
	hd : [13, 12],
	speed : "50 ft",
	scores : [25, 10, 19, 2, 12, 9],
	saves : ["", "", "", "", "", ""],
	skills : {
		"perception" : 4,
	},
	senses : "",
	passivePerception : 14,
	languages : "",
	challengeRating : "8",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [{
			name : "Tail",
			ability : 1,
			damage : [3, 8, "bludgeoning"],
			range : "Melee (10 ft)",
			description : "Medium or smaller target is grappled and restrained (escape DC 17); can't use bite again until grapple ends",
		}, {
			name : "Bite",
			ability : 1,
			damage : [4, 12, "piercing"],
			range : "Melee (10 ft)",
			description : "One bite and one tail attack to a different as an Attack action",
		},
	],
	traits : [{
			name : "Multiattack",
			description : "The terra stomper makes two attacks: one with its bite and one with its tail. It can't make both attacks against the same target.",
		},
	],
};

CreatureList["timbermaw"] = {
	name : "Timbermaw",
	source : ["PS:Z", 34],
	size : 3,
	type : "Beast",
	subtype : "",
	alignment : "Unaligned",
	ac : 14,
	hp : 27,
	hd : [6, 8],
	speed : "30 ft, climb 30 ft",
	scores : [14, 14, 11, 3, 14, 5],
	saves : ["", "", "", "", "", ""],
	damage_resistances : "bludgeoning, piercing, and slashing from nonmagical weapons",
	senses : "Darkvision 60 ft",
	passivePerception : 12,
	languages : "",
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [{
			name : "Tentacles",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee",
			description : "On hit, can make beak attack",
			modifiers : [0, "", ""],
		}, {
			name : "Beak",
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee",
			description : "Only on hit with a tentacle attack",
			modifiers : [0, "", ""],
		},
	],
	traits : [{
			name : "Forest Camouflage",
			description : "The timbermaw has advantage on Dexterity (Stealth) checks made to hide in woodland terrain.",
		},
	],
};

CreatureList["vampire null"] = {
	name : "Vampire Null",
	source : ["PS:Z", 28],
	size : 3,
	type : "Undead",
	subtype : "",
	alignment : "Neutral Evil",
	ac : 8,
	hp : 22,
	hd : [3, 8],
	speed : "30 ft",
	scores : [13, 6, 16, 3, 6, 5],
	saves : ["", "", "", "", 0, ""],
	damage_immunities : "poison",
	condition_immunities : "poisoned",
	senses : "Darkvision 60 ft",
	passivePerception : 8,
	languages : "understands all languages it knew in life but can't speak",
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
			name : "Slam",
			ability : 1,
			damage : [1, 6, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "",
		},
	],
	traits : [{
			name : "Undead Fortitude",
			description : "If damage reduces the null to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the null drops to 1 hit point instead.",
		},
	],
};

UpdateDropdown("race");
UpdateDropdown("weapon");
UpdateDropdown("armor");
UpdateDropdown("creature");
