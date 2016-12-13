/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Cleric, called "Forge Domain"
				This is taken from the Cleric: Divine Domains Unearthed Arcana (http://media.wizards.com/2016/dnd/downloads/UA_Cleric.pdf)
	Code by:	SoilentBrad & MorePurpleMoreBetter
	Date:		2016-11-30 (sheet v12.62)
*/

ClassSubList["forge domain"] = {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(forge|forgery|blacksmith)).*$/i,
	subname : "Forge Domain",
	source : ["UA:CDD", 1],
	spellcastingExtra : ["searing smite", "shield", "heat metal", "magic weapon", "elemental weapon", "protection from energy", "fabricate", "wall of fire", "animate objects", "creation"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiency",
			source : ["UA:CDD", 1],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with heavy armor",
			armor : [false, false, true, false],
		},
		"subclassfeature1.1" : {
			name : "Blessing of the Forge",
			source : ["UA:CDD", 1],
			minlevel : 1,
			action : ["action", ""],
			usages : 1,
			recovery : "long rest",
			description : "\n   " + "At the end of a long rest, I can imbue magic into a nonmagical weapon or armor" + "\n   " + "It becomes magical: +1 AC if armor, or +1 to attack and damage rolls if a weapon" + "\n   " + "This lasts until the end of my next long rest",
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Artisan's Blessing",
			source : ["UA:CDD", 1],
			minlevel : 2,
			description : "\n   " + "During a short rest, I can conduct a ritual to craft an item that is at least part metal" + "\n   " + "The object can be worth up to 100 gp, and I must expend metals of equal value to it" + "\n   " + "The item can be an exact duplicate of a nonmagical item if I possess the original",
		},
		"subclassfeature6" : {
			name : "Soul of the Forge",
			source : ["UA:CDD", 1],
			minlevel : 6,
			additional : ["", "", "", "", "", "+6 force damage", "+7 force damage", "+8 force damage", "+9 force damage", "+10 force damage", "+11 force damage", "+12 force damage", "+13 force damage", "+14 force damage", "+15 force damage", "+16 force damage", "+17 force damage", "+18 force damage", "+19 force damage", "+20 force damage"],
			description : "\n   " + "I gain a +1 AC while wearing medium or heavy armor, and resistance to fire damage" + "\n   " + "When I hit a construct with an attack, I deal my cleric level in additional force damage",
			eval : "AddResistance(\"Fire\", \"Cleric (Forge Domain)\"); AddACMisc(1, \"Soul of the Forge\", \"+1 AC while wearing Medium or Heavy armor.\\n\\nSoul of the Forge was gained from Cleric (Forge Domain).\");",
			removeeval : "RemoveResistance(\"Fire\"); AddACMisc(0, \"Soul of the Forge\", \"+1 AC while wearing Medium or Heavy armor.\\n\\nSoul of the Forge was gained from Cleric (Forge Domain).\");",
		},
		"subclassfeature8" : {
			name : "Divine Strike",
			source : ["UA:CDD", 1],
			minlevel : 8,
			description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
			additional : ["", "", "", "", "", "", "", "+1d8 fire damage", "+1d8 fire damage", "+1d8 fire damage", "+1d8 fire damage", "+1d8 fire damage", "+1d8 fire damage", "+2d8 fire damage", "+2d8 fire damage", "+2d8 fire damage", "+2d8 fire damage", "+2d8 fire damage", "+2d8 fire damage", "+2d8 fire damage"],
		},
		"subclassfeature17" : {
			name : "Saint of Forge and Fire",
			source : ["UA:CDD", 1],
			minlevel : 17,
			description : "\n   " + "I gain immunity to fire damage" + "\n   " + "If wearing heavy armor, I'm resistant to nonmagical bludg./piercing/slashing damage",
			save : "Immunity to fire damage",
			dmgres : ["bludgeoning", "piercing", "slashing"],
			eval : "RemoveResistance(\"Fire\"); AddResistance(\"Bludg. (nonmagical)\", \"Cleric (Forge Domain).\\n\\nThis only applies while wearing heavy armor.\"); AddResistance(\"Pierc. (nonmagical)\", \"Cleric (War Domain).\\n\\nThis only applies while wearing heavy armor.\"); AddResistance(\"Slash. (nonmagical)\", \"Cleric (War Domain).\\n\\nThis only applies while wearing heavy armor.\");",
			removeeval : "AddResistance(\"Fire\", \"Cleric (Forge Domain)\"); RemoveResistance(\"Bludg. (nonmagical)\"); RemoveResistance(\"Pierc. (nonmagical)\"); RemoveResistance(\"Slash. (nonmagical)\");"
		},
	},
};
ClassList["cleric"].subclasses[1].push("forge domain");

SourceList["UA:CDD"] = {
	name : "Unearthed Arcana: Cleric: Divine Domains", //2016-11-21
	abbreviation : "UA:CDD",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2016/dnd/downloads/UA_Cleric.pdf"
};