/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race, called "Sojourner Dwarf"
				This is taken from DriveThruRPG (https://www.drivethrurpg.com/product/132657/)
				This subrace is made by Goodman Games
	Code by:	James Bowman (based on work by MorePurpleMoreBetter)
	Date:		2017-09-22 (sheet v12.998)
	
	Please support the creator of this content (Goodman Games) and download their Fifth Edition Fantasy material from DriveThruRPG: https://www.drivethrurpg.com/browse/pub/36/Goodman-Games/subcategory/187_22136/5E-Products
*/

var iFileName = "Sojourner Dwarf [Goodman Games' work, transcribed by James Bowman].js";
RequiredSheetVersion(12.999);

SourceList["FEF1:G"] = {
	name : "Fifth Edition Fantasy #1: Glitterdoom",
	abbreviation : "FEF1:G",
	group : "Goodman Games",
	url : "https://www.drivethrurpg.com/product/132657/",
	date : "2014/09/29"
};

RaceList["sojourner dwarf"] = {
	regExpSearch : /^(((?=.*\b(dwarfs?|dwarves|dwarfish|dwarvish|dwarven)\b)(?=.*\b(sojourner)\b))).*$/i,
	name : "Sojourner dwarf",
	sortname : "Dwarf, Sojourner",
	source : ["FEF1:G", 14],
	plural : "Sojourner dwarves",
	size : 3,
	speed : {
		walk : { spd : 25, enc : 25 }
	},
	languageProfs : ["Common", "Dwarvish"],
	vision : [["Darkvision", 60]],
	savetxt : { adv_vs : ["poison"] },
	dmgres : ["Poison"],
	weaponprofs : [false, false, ["battleaxe", "handaxe", "warhammer", "light hammer"]],
	toolProfs : [["Smith, brewer, or mason tools", 1]],
	age : " are considered young until they are 50 and live about 350 years",
	height : " stand between 4 and 5 feet tall (3'8\" + 2d4\")",
	weight : " weigh around 150 lb (115 + 2d4 \xD7 2d6 lb)",
	heightMetric : " stand between 1,2 and 1,5 metres tall (110 + 5d4 cm)",
	weightMetric : " weigh around 70 kg (55 + 5d4 \xD7 4d6 / 10 kg)",
	improvements : "Sojourner Dwarf: +2 Constitution, +1 Intelligence;",
	scores : [0, 0, 2, 1, 0, 0],
	trait : "Sojourner Dwarf (+2 Constitution, +1 Intelligence)\n   Stonecunning: Whenever I make an Intelligence (History) check related to the origin of stonework, I am considered proficient in the History skill and add double my proficiency bonus to the check, instead of my normal proficiency bonus.\n   Trailblazer: Whenever I make Wisdom (Survival) checks pertaining to navigation or to avoid becoming lost, I am considered proficient in the Survival skill and add double my proficiency bonus to the check, instead of my normal bonus.",
};
