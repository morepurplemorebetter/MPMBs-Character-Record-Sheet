/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Races
	Effect:		This script adds the race Minotaur (Krynn) and its three variants.
				This is taken from the Waterborne Adventures Unearthed Arcana (https://media.wizards.com/2015/downloads/dnd/UA_Waterborne_v3.pdf)
	Code by:	MorePurpleMoreBetter
	Date:		2016-10-27 (sheet v12.4)
*/

RaceList["minotaur"] = {
	regExpSearch : /(minotaur|krynn)/i,
	name : "Minotaur",
	source : ["UA:WA", 1],
	plural : "Minotaurs",
	size : 3,
	speed : [30, 20],
	languages : ["Common"],
	tools : ["Navigator's tools", "Vehicles (water)"],
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

SourceList["UA:WA"] = {
	name : "Unearthed Arcana: Waterborne Adventures", //2015-05-04
	abbreviation : "UA:WA",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2015/downloads/dnd/UA_Waterborne_v3.pdf"
};