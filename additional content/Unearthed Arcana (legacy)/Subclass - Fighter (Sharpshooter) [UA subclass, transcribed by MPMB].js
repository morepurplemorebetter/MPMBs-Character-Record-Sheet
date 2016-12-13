/*  -WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*  -INFORMATION-
	Subject:	Subclass
	Effect:	 	This script adds a subclass for the Fighter, called "Sharpshooter"
				This is taken from the Fighter Martial Archetypes Unearthed Arcana (http://media.wizards.com/2016/dnd/downloads/2016_Fighter_UA_1205_1.pdf)
	Code by:	MorePurpleMoreBetter
	Date:		2016-12-09 (sheet v12.64)
*/

ClassSubList["sharpshooter"] = {
	regExpSearch : /sharpshooter/i,
	subname : "Sharpshooter",
	source : ["UA:FMA", 3],
	fullname : "Sharpshooter",
	features : {
		"subclassfeature3" : {
			name : "Steady Aim",
			source : ["UA:FMA", 3],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I can carefully aim my ranged weapon on a target I can see in range" + "\n   " + "Until the end of my turn, my attacks with this weapon on the target benefit from:" + "\n   " + "Ignoring half and three-quarter cover; Dealing 2 + fighter level extra damage per hit",
			recovery : "short rest",
			usages : 3,
			additional : ["", "", "+3 damage", "+4 damage", "+4 damage", "+5 damage", "+5 damage", "+6 damage", "+6 damage", "+7 damage", "+7 damage", "+8 damage", "+8 damage", "+9 damage", "+9 damage", "+10 damage", "+10 damage", "+11 damage", "+11 damage", "+12 damage"],
			action : ["bonus action", ""]
		},
		"subclassfeature7" : {
			name : "Careful Eyes",
			source : ["UA:FMA", 4],
			minlevel : 7,
			description : "\n   " + "As a bonus action, I can take the Search action" + "\n   " + "I gain proficiency with one skill, Perception, Investigation, or Survival",
			skillstxt : "\n\n" + toUni("Sharpshooter") + ": Perception, Investigation, or Survival.",
			action : ["bonus action", ""]
		},
		"subclassfeature10" : {
			name : "Close-Quarters Shooting",
			source : ["UA:FMA", 4],
			minlevel : 10,
			description : "\n   " + "I don't have disadvantage when making a ranged attack while within 5 ft of a hostile" + "\n   " + "A hostile within 5 ft that I hit with a ranged attack on my turn, can’t take reactions" + "\n   " + "This lasts until the end of my turn",
		},
		"subclassfeature15" : {
			name : "Rapid Strike",
			source : ["UA:FMA", 4],
			minlevel : 15,
			description : "\n   " + "If I have adv. on an attack, I can forgo it to make an extra attack as a bonus action" + "\n   " + "This attack has to be with the same weapon against the same target",
			action : ["bonus action", ""]
		},
		"subclassfeature18" : {
			name : "Snap Shot",
			source : ["UA:FMA", 4],
			minlevel : 18,
			description : "\n   " + "I can make one more ranged attack with my Attack action on my first turn of combat",
		},
	}
};
ClassList.fighter.subclasses[1].push("sharpshooter");

SourceList["UA:FMA"] = {
	name : "Unearthed Arcana: Fighter Martial Archetypes", //2016-12-05
	abbreviation : "UA:FMA",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2016/dnd/downloads/2016_Fighter_UA_1205_1.pdf"
};
