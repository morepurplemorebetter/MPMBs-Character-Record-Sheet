/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race, called "Sojourner Dwarf"
				This is taken from DriveThruRPG (http://www.drivethrurpg.com/product/132657/)
				This subrace is made by Goodman Games
	Code by:	James Bowman (based on work by MorePurpleMoreBetter)
	Date:		2017-02-07 (sheet v12.81)
	
	Please support the creator of this content (Goodman Games) and download their Fifth Edition Fantasy material from DriveThruRPG: http://www.drivethrurpg.com/browse/pub/36/Goodman-Games/subcategory/187_22136/5E-Products
*/

RaceList["sojourner dwarf"] = {
		regExpSearch : /^(((?=.*\b(dwarfs?|dwarves|dwarfish|dwarvish|dwarven)\b)(?=.*\b(sojourner)\b))).*$/i,
		name : "Sojourner dwarf",
		sortname : "Dwarf, Sojourner",
		source : ["FEF1:G", 14],
		plural : "Sojourner dwarves",
		size : 3,
		speed : [25, 25],
		languages : ["Common", "Dwarvish"],
		vision : "Darkvision 60 ft",
		savetxt : "Adv. vs. Poison",
		dmgres : ["poison"],
		weaponprofs : [false, false, ["battleaxe", "handaxe", "warhammer", "light hammer"]],
		tools : ["smith, brewer, or mason tools"],
		age : " are considered young until they are 50 and live about 350 years",
		height : " stand between 4 and 5 feet tall (3'8\" + 2d4\")",
		weight : " weigh around 150 lb (115 + 2d4 \xD7 2d6 lb)",
		heightMetric : " stand between 1,2 and 1,5 metres tall (110 + 5d4 cm)",
		weightMetric : " weigh around 70 kg (55 + 5d4 \xD7 4d6 / 10 kg)",
		improvements : "Sojourner Dwarf: +2 Constitution, +1 Intelligence;",
		scores : [0, 0, 2, 1, 0, 0],
		trait : "Sojourner Dwarf (+2 Constitution, +1 Intelligence)\n   Stonecunning: Whenever I make an Intelligence (History) check related to the origin of stonework, I am considered proficient in the History skill and add double my proficiency bonus to the check, instead of my normal proficiency bonus.\n   Trailblazer: Whenever I make Wisdom (Survival) checks pertaining to navigation or to avoid becoming lost, I am considered proficient in the Survival skill and add double my proficiency bonus to the check, instead of my normal bonus.",
};

SourceList["FEF1:G"] = {
	name : "Fifth Edition Fantasy #1: Glitterdoom",
	abbreviation : "FEF1:G",
	group : "Goodman Games",
	url : "http://www.drivethrurpg.com/product/132657/"
};

UpdateDropdown("race");