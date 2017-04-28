/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Races, Subraces, Creatures
	Effect:		This script adds a number of races and creatures from the Magic: The Gathering plane of Kaladesh
				This is taken from the Plane Shift: Kaladesh article (http://magic.wizards.com/en/articles/archive/feature/plane-shift-kaladesh-2017-02-16)
	Code by:	SoilentBrad
				userZynx_name (additions of Pyromancer, Servo, and feats)
				tiny corrections by MPMB
	Date:		2017-04-28 (sheet v12.98)
*/

SourceList["PS:K"] = {
	name : "Plane Shift: Kaladesh", // 2017-02-16
	abbreviation : "PS:K",
	group : "Plane Shift",
	url : "https://media.wizards.com/2017/downloads/magic/Plane-Shift_Kaladesh.pdf"
};

RaceList["aetherborn"] = {
	regExpSearch : /aetherborn/i,
	name : "Aetherborn",
	sortname : "Aetherborn",
	source : ["PS:K", 17],
	plural : "Aetherborn",
	size : 3,
	speed : [30, 20],
	languages : ["Common", "+2 from Aetherborn"],
	vision : "Darkvision 60 ft",
	dmgres : ["necrotic"],
	skills : ["Intimidation"],
	age : " come into being as adults and live no more than a few years",
	height : " range from 5 to over 6 feet tall (4'9\" + 2d8\")",
	weight : " weigh around 100 lb, and get lighter as they age",
	heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)",
	improvements : "Aetherborn: +2 Charisma, +1 to two others of your choice;",
	scores : [0, 0, 0, 0, 0, 2],
	trait : "Aetherborn (+2 Charisma, +1 to two others of your choice)\nBorn of Aether: I have resistance to necrotic damage.\nMenacing: I gain proficiency in the Intimidation skill.",
};

RaceList["kaladesh dwarf"] = {
	regExpSearch : /^(?=.*\b(dwarfs?|dwarves|dwarfish|dwarvish|dwarven)\b)(?=.*\bkaladesh\b).*$/i,
	name : "Kaladesh dwarf",
	sortname : "Dwarf, Kaladesh",
	source : ["PS:K", 19],
	plural : "Kaladesh dwarves",
	size : 3,
	speed : [25, 25],
	languages : ["Common", "Dwarvish"],
	vision : "Darkvision 60 ft",
	savetxt : "Adv. vs. Poison",
	dmgres : ["poison"],
	tools : ["+2 artisan's tools"],
	age : " are considered young until they are 50 and live about 350 years",
	height : " stand between 4 and 5 feet tall (3'8\" + 2d4\")",
	weight : " weigh around 150 lb (115 + 2d4 \xD7 2d6 lb)",
	heightMetric : " stand between 1,2 and 1,5 metres tall (110 + 5d4 cm)",
	weightMetric : " weigh around 70 kg (55 + 5d4 \xD7 4d6 / 10 kg)",
	improvements : "Kaladesh Dwarf: +2 Constitution, +1 Wisdom;",
	scores : [0, 0, 2, 0, 1, 0],
	trait : "Kaladesh Dwarf (+2 Constitution, +1 Wisdom)\nArtisan's Expertise: I have proficiency and expertise with two artisan's tools of my choice.\n   Whenever I make an Intelligence (History) check related to the origin of any architectural construction, I am considered proficient in the History skill and add double my proficiency bonus to the check, instead of my normal proficiency bonus.\nDwarven Toughness: My hit point maximum increases by 1 for every level I have.",
	features : {
		"dwarven toughness" : {
			name : "Dwarven Toughness",
			minlevel : 1,
			calcChanges : {
				hp : "extrahp += totalhd; extrastring += '\\n + ' + totalhd + ' from Dwarven Toughness';"
			}
		}
	}
};

RaceList["wood elf"].regExpSearch = /^(?!.*half)((?=.*(grugach|kagonesti|bishtahar|tirahar))|((?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\b(woodlands?|woods?|forests?|wilds?|green)\b))).*$/i;
RaceList["vahadar elf"] = {
	regExpSearch : /^(?!.*half)((?=.*\bvahadar\b)|((?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\bcity\b))).*$/i,
	name : "Vahadar",
	sortname : "Elf, Vahadar",
	source : ["PS:K", 21],
	plural : "Vahadar",
	size : 3,
	speed : [30, 20],
	languages : ["Common", "Elvish", "+1 from Vahadar"],
	vision : "Darkvision 60 ft",
	savetxt : "Adv. vs. being charmed; Magic can't put me to sleep",
	weaponprofs : [false, false, ["longsword", "shortsword", "longbow", "shortbow"]],
	skills : ["Perception"],
	age : " typically claim adulthood around age 100 and can live to be 750 years old",
	height : " range from under 5 to over 6 feet tall (4'6\" + 2d10\")",
	weight : " weigh around 115 lb (90 + 2d10 \xD7 1d4 lb)",
	heightMetric : " range from under 1,5 to over 1,8 metres tall (140 + 5d10 cm)",
	weightMetric : " weigh around 55 kg (40 + 5d10 \xD7 2d4 / 10 kg)",
	improvements : "Vahadar: +2 Dexterity, +1 Wisdom;",
	scores : [0, 2, 0, 0, 1, 0],
	trait : "Vahadar (+2 Dexterity, +1 Wisdom)\nTrance: Elves don't need to sleep, but meditate semiconsciously, for 4 hours a day. While meditating, I can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, I gain the same benefit that a human does from 8 hours of sleep, but I still need 8 hours for a long rest.\nCantrip: I know one cantrip of my choice from the druid spell list. Wisdom is my spellcasting ability for it.",
	abilitySave : 5,
	spellcastingAbility : 5,
	spellcastingBonus : {
		name : "Vahadar Cantrip",
		class : "druid",
		level : [0, 0],
		atwill : true,
	},
};

RaceList["vedalken"] = {
	regExpSearch : /vedalken/i,
	name : "Vedalken",
	sortname : "Vedalken",
	source : ["PS:K", 24],
	plural : "Vedalken",
	size : 3,
	speed : [30, 20],
	languages : ["Common", "Vedalken"],
	savetxt : "Adv. on Int, Wis, Cha saves vs. magic",
	age : " reach adulthood around 40 and live up to 500 years",
	height : " range from 6 to 6 1/2 feet tall",
	weight : " weigh less than 200 lb",
	improvements : "Vedalken: +2 Intelligence, +1 Wisdom;",
	scores : [0, 0, 0, 2, 1, 0],
	trait : "Vedalken (+2 Intelligence, +1 Wisdom)\nVedalken Cunning: I have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.\nAether Lore: Whenever I make an Intelligence (History) check related to magic items or aether-powered technological devices, I can add twice my proficiency bonus, instead of any proficiency bonus I normally apply."
};

CreatureList["gremlin"] = {
	name : "Gremlin",
	source : ["PS:K", 26],
	size : 4,
	type : "Beast",
	subtype : "",
	alignment : "Unaligned",
	ac : 11,
	hp : 27,
	hd : [5, 8],
	speed : "40 ft",
	scores : [12, 13, 13, 3, 13, 6],
	saves : ["", "", "", "", "", ""],
	passivePerception : 11,
	senses : "Darkvision 60 ft",
	languages : "",
	challengeRating : "1/2",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
			name : "Claws",
			ability : 1,
			damage : [1, 8, "slashing"],
			range : "Melee (5 ft)",
			description : ""
		}
	],
	traits : [{
			name : "Aether Scent",
			description : "The gremlin can pinpoint, by scent, the location of refined or unrefined aether within 30 feet of it.",
		}
	],
	actions : [{
			name : "Siphon",
			description : "The gremlin drains aether from an aether-powered device it can see within 5 feet of it. If the object isn't being worn or carried, the touch automatically drains aether. If the object is being worn or carried by a creature, the creature must succeed on a DC 11 Dexterity saving throw to keep it out of the gremlin's reach. If the aether-powered device grants any bonus (to attack rolls, damage rolls, Armor Class, and so on), that bonus is reduced by 1. If the device has charges, it loses 1 charge. Otherwise, it stops functioning for 1 round. Left unhindered, a gremlin can completely destroy an aether-powered device."
		}
	]
};

CreatureList["sky whale"] = {
	name : "Sky Whale",
	source : ["PS:K", 28],
	size : 1,
	type : "Beast",
	subtype : "",
	alignment : "Unaligned",
	ac : 14,
	hp : 85,
	hd : [9, 12],
	speed : "fly 50 ft (hover)",
	scores : [21, 9, 17, 2, 10, 7],
	saves : ["", "", "", "", "", ""],
	skills : {
		"stealth" : 5
	},
	senses : "",
	passivePerception : 10,
	languages : "",
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 2,
	attacks : [{
			name : "Flipper",
			ability : 1,
			damage : [2, 8, "bludgeoning"],
			range : "Melee (10 ft)",
			description : "Target must succeed on a DC 16 Strength saving throw or be knocked prone"
		}, {
			name : "Tail",
			ability : 1,
			damage : [2, 8, "bludgeoning"],
			range : "Melee (10 ft)",
			description : "Target must succeed on a DC 16 Strength saving throw or be knocked prone"
		}
	],
	traits : [{
			name : "Hold Breath",
			description : "The whale can hold its breath for 30 minutes."
		}, {
			name : "Multiattack",
			description : "The whale makes two attacks: one with its flipper and one with its tail."
		}
	]
};

CreatureList["servo"] = {
	name : "Servo",
	source : ["PS:K", 32],
	size : 5,
	type : "Construct",
	subtype : "",
	alignment : "Unaligned",
	ac : 11,
	hp : 10,
	hd : [3, 4],
	speed : "20 ft",
	scores : [4, 11, 12, 3, 10, 7],
	saves : ["", "", "", "", "", ""],
	passivePerception : 10,
	damage_immunities : "poison",
	condition_immunities : "charmed, poisoned",
	senses : "",
	languages : "",
	challengeRating : "0",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
			name : "Claw",
			ability : 1,
			damage : [1, "", "slashing"],
			range : "Melee",
			description : "",
			modifiers : [1, "", false]
		}
	]
};

ClassSubList["sorcerer-pyromancer"] = {
	regExpSearch : /pyromancer|pyromancy/i,
	subname : "Pyromancy",
	source : ["PS:K", 9],
	fullname : "Pyromancer",
	features : {
		"subclassfeature1" : {
			name : "Heart of Fire",
			source : ["PS:K", 9],
			minlevel : 1,
			description : "\n   " + "When I start casting a spell (not cantrip) that deals fire damage, flames erupt from me" + "\n   " + "Any creatures of my choice within 10 ft take half my sorcerer level in fire damage",
			additional : levels.map( function(n) { return (n > 1 ? Math.floor(n/2) : 1) + " fire damage"; })
		},
		"subclassfeature6" : {
			name : "Fire in the Veins",
			source : ["PS:K", 9],
			minlevel : 6,
			description : "\n   " + "I have resistance to fire damage and spells I cast ignore resistance to fire damage",
			eval : "AddResistance('Fire', 'Pyromancer');",
			removeeval : "RemoveResistance('Fire');"
		},
		"subclassfeature14" : {
			name : "Pyromancer's Fury",
			source : ["PS:K", 9],
			minlevel : 14,
			description : "\n   " + "As a reaction when hit by a melee attack, I can deal fire damage to the attacker" + "\n   " + "The damage is equal to my sorcerer level and ignores resistance to fire damage",
			action : ["reaction", ""],
			additional : ["", "", "", "", "", "", "", "", "", "", "", "", "", "14 fire damage", "15 fire damage", "16 fire damage", "17 fire damage", "18 fire damage", "19 fire damage", "20 fire damage"]
		},
		"subclassfeature18" : {
			name : "Fiery Soul",
			source : ["PS:K", 9],
			minlevel : 18,
			description : "\n   " + "I have immunity to fire damage" + "\n   " + "Any spell or effect I create ingores resistance to fire damage" + "\n   " + "In addition, it will treat immunity to fire damage as resistance to fire damage",
			save : "Immune to fire damage",
			eval : "RemoveResistance('Fire');",
			removeeval : "AddResistance('Fire', 'Pyromancer');"
		},
	}
};
ClassList.sorcerer.subclasses[1].push("sorcerer-pyromancer");

FeatsList["quicksmithing"] = {
	name : "Quicksmithing",
	source : ["PS:K", 13],
	description : "I gain the Tinker ability of a Rock Gnome, including proficiency with tinker's tools. I learn two 1st-level ritual spells and can learn more if found and no higher spell level than half my character level. I can cast these as rituals with Intelligence as my spellcasting ability.",
	prerequisite : "Intelligence 13 or higher",
	eval : "CurrentSpells['quicksmithing'] = {name : 'Quicksmithing Ritual Spells', ability : 4, list : {class : 'any', ritual : true}, known : {spells : 'book'}, bonus : { someFeat : { name : '1st-level ritual spell', class : 'any', level : [1, 1], ritual : true, times : 2} } }; SetStringifieds('spells');",
	removeeval : "delete CurrentSpells['quicksmithing']; SetStringifieds('spells');"
};

FeatsList["servo crafting"] = {
	name : "Servo Crafting",
	source : ["PS:K", 13],
	description : "I can cast Find Familiar as a ritual, creating a servo instead of an animal. I can telepathically communicate with it, perceive its senses, and speak through it in my own voice. When I use the Attack action, I can forfeit one attack for it to attack.",
	prerequisite : "Intelligence 13 or higher",
	spellcastingBonus : {
		name : "Servo Crafting",
		spellcastingAbility : 4,
		spells : ["find familiar"],
		selection : ["find familiar"],
		firstCol : "(R)"
	}
};

UpdateDropdown("race");
UpdateDropdown("creature");
UpdateDropdown("feat");
