/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Paladin, called "Oath of Conquest"
				This is taken from the Paladin Sacred Oaths Unearthed Arcana (http://media.wizards.com/2016/dnd/downloads/UAPaladin_SO_20161219_1.pdf)
	Code by:	MorePurpleMoreBetter
	Date:		2016-12-19 (sheet v12.78)
*/

ClassSubList["oath of conquest"] = {
	regExpSearch : /^((?=.*(knight tyrant|iron mongers))|((?=.*(conquest|tyranny|tyrant))(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper))))))).*$/i,
	subname : "Oath of Conquest",
	source : ["UA:PSO", 1],
	spellcastingExtra : ["armor of agathys", "command", "hold person", "spiritual weapon", "bestow curse", "fear", "blight", "dominate beast", "dominate person", "insect plague"],
	features : {
		"subclassfeature3" : {
			name : "Channel Divinity: Conquering Strike",
			source : ["UA:PSO", 1],
			minlevel : 3,
			description : "\n   " + "I can use my channel divinity to break a foe's will that I hit with my melee weapon" + "\n   " + "The target must make a Wisdom saving throw or become frightened for 1 minute" + "\n   " + "The target can repeat this save at the end of each or its turn to end the effect"
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Guided Strike",
			source : ["UA:PSO", 1],
			minlevel : 3,
			description : "\n   " + "When I make an attack roll, I can add a +10 bonus to the roll after seeing the d20 roll"
		},
		"subclassfeature7" : {
			name : "Aura of Conquest",
			source : ["UA:PSO", 1],
			minlevel : 7,
			description : "\n   " + "While I'm not incapacitated, enemies in range have disadv. on saves vs. being frightened",
			additional : ["", "", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"]
		},
		"subclassfeature15" : {
			name : "Implacable Spirit",
			source : ["UA:PSO", 1],
			minlevel : 15,
			description : "\n   " + "I can't be charmed",
			save : "Immune to being charmed"
		},
		"subclassfeature20" : {
			name : "Invincible Conqueror",
			source : ["UA:PSO", 2],
			minlevel : 20,
			description : "\n   " + "As an action, I can gain the following benefits for 1 minute:" + "\n    - " + "I have resistance all damage" + "\n    - " + "I can make an additional attack as part of my Attack action" + "\n    - " + "My melee weapons score critical hits on a roll of 19 or 20",
			recovery : "long rest",
			usages : 1,
			action : ["action", ""]
		}
	}
};
ClassList.paladin.subclasses[1].push("oath of conquest");

SourceList["UA:PSO"] = {
	name : "Unearthed Arcana: Paladin Sacred Oaths", //2016-12-19
	abbreviation : "UA:PSO",	
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2016/dnd/downloads/UAPaladin_SO_20161219_1.pdf"
};