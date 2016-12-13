/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Races
	Effect:		This script adds the races Changeling, Warforged, and the Shifter with its 6 subraces.
				This is taken from the Eberron Unearthed Arcana (http://media.wizards.com/2015/downloads/dnd/UA_Eberron_v1.pdf)
	Code by:	MorePurpleMoreBetter
	Date:		2016-10-27 (sheet v12.4)
*/

RaceList["changeling"] = {
	regExpSearch : /changeling/i,
	name : "Changeling",
	source : ["UA:E", 1],
	plural : "Changelings",
	size : 3,
	skills : ["Deception"],
	speed : [30, 20],
	languages : ["Common", "+2 from Changeling"],
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

RaceList["warforged"] = {
	regExpSearch : /warforged/i,
	name : "Warforged",
	source : ["UA:E", 3],
	plural : "Warforged",
	size : 3,
	speed : [30, 20],
	languages : ["Common", "+1 from Warforged"],
	age : " are created as adults and will only start to show signs of physical deterioration after 150 years, but have no further aging effects",
	height : " stand between 6 and 7 feet tall (5'10\" + 2d6\")",
	weight : " weigh around 300 lb (270 + 2d6 \xD7 4 lb)",
	heightMetric : " stand between 1,8 and 2,1 metres tall (178 + 5d6 cm)",
	weightMetric : " weigh around 135 lb (125 + 5d6 \xD7 8 / kg)",
	improvements : "Warforged: +1 Strength, +1 Constitution;",
	scores : [1, 0, 1, 0, 0, 0],
	trait : "Warforged (+1 Strength, +1 Constitution)\nLiving Construct:\n   Even though I was constructed, I am a living creature. I am immune to disease. I do not need to eat or breathe, but I can ingest food and drink if I wish.\n   Instead of sleeping, I enter an inactive state for 4 hours each day. I do not dream in this state; I am fully aware of my surroundings and notice approaching enemies and other events as normal. I still need 8 hours for a long rest.",
	eval : "AddACMisc(1, \"Composite Plating\", \"Composite Plating was gained from being a Warforged\")",
	removeeval : "AddACMisc(0, \"Composite Plating\", \"Composite Plating was gained from being a Warforged\")"
};

RaceList["shifter"] = {
	regExpSearch : /shifter/i,
	name : "Shifter",
	source : ["UA:E", 2],
	plural : "Shifters",
	size : 3,
	speed : [30, 20],
	languages : ["Common", "Sylvan"],
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
	plural : "Beasthide shifters",
	improvements : "Beasthide Shifter: +1 Dexterity, +1 Constitution;",
	scores : [0, 1, 1, 0, 0, 0],
	trait : "Beasthide Shifter (+1 Dexterity, +1 Constitution)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and I gain a +1 bonus to my AC.",
};

RaceSubList["shifter-cliffwalk"] = {
	regExpSearch : /cliffwalk/i,
	name : "Cliffwalk shifter",
	plural : "Cliffwalk shifters",
	improvements : "Cliffwalk Shifter: +2 Dexterity;",
	scores : [0, 2, 0, 0, 0, 0],
	trait : "Cliffwalk Shifter (+2 Dexterity)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and I gain a climb speed of 30 feet.",
};

RaceSubList["shifter-longstride"] = {
	regExpSearch : /longstride/i,
	name : "Longstride shifter",
	plural : "Longstride shifters",
	improvements : "Longstride Shifter: +2 Dexterity;",
	scores : [0, 2, 0, 0, 0, 0],
	trait : "Longstride Shifter (+2 Dexterity)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and I can use the Dash action as a bonus action.",
};

RaceSubList["shifter-longtooth"] = {
	regExpSearch : /(longtooth|longteeth)/i,
	name : "Longtooth shifter",
	plural : "Longtooth shifters",
	weapons : ["longtooth"],
	improvements : "Longtooth Shifter: +1 Strength, +1 Dexterity;",
	scores : [1, 1, 0, 0, 0, 0],
	trait : "Longtooth Shifter (+1 Strength, +1 Dexterity)\nShifting: On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again. While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and, as an action, I can make can make a bite attack. This is a melee weapon attack that uses Strength and deals 1d6 piercing damage. If this attack hits a target that is my size or smaller, the target is also grappled.",
};

RaceSubList["shifter-razorclaw"] = {
	regExpSearch : /razorclaw/i,
	name : "Razorclaw shifter",
	plural : "Razorclaw shifters",
	weapons : ["razorclaw"],
	improvements : "Razorclaw Shifter: +2 Dexterity;",
	scores : [0, 2, 0, 0, 0, 0],
	trait : "Razorclaw Shifter (+2 Dexterity)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and, as a bonus action, I can make an unarmed strike that can use my Dexterity for the attack roll and damage, dealing slashing damage.",
};

RaceSubList["shifter-wildhunt"] = {
	regExpSearch : /wildhunt/i,
	name : "Wildhunt shifter",
	source : ["UA:E", 3],
	plural : "Wildhunt shifters",
	improvements : "Wildhunt Shifter: +1 Dexterity, +1 Wisdom;",
	scores : [0, 1, 0, 0, 1, 0],
	trait : "Wildhunt Shifter (+1 Dexterity, +1 Wisdom)\nShifting:\n   On my turn, I can shift as a bonus action. Shifting lasts for 1 minute or until I end it on my turn as a bonus action. I must finish a short rest before I can shift again.\n   While shifted, I gain temporary hit points equal to my level + my Constitution modifier (minimum of 1) and I gain advantage on all Wisdom-based checks and saving throws.",
};

SourceList["UA:E"] = {
	name : "Unearthed Arcana: Eberron", //2015-02-02
	abbreviation : "UA:E",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2015/downloads/dnd/UA_Eberron_v1.1.pdf"
};

UpdateDropdown("race");