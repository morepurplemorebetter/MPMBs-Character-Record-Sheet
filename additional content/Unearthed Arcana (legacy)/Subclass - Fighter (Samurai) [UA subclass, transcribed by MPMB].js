/*  -WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*  -INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Fighter, called "Samurai"
				This is taken from the Fighter Martial Archetypes Unearthed Arcana (http://media.wizards.com/2016/dnd/downloads/2016_Fighter_UA_1205_1.pdf)
	Code by:	MorePurpleMoreBetter
	Date:		2016-12-09 (sheet v12.64)
*/

ClassSubList["samurai"] = {
	regExpSearch : /samurai/i,
	subname : "Samurai",
	source : ["UA:FMA", 3],
	fullname : "Samurai",
	features : {
		"subclassfeature3" : {
			name : "Fighting Spirit",
			source : ["UA:FMA", 3],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I can give myself benefits that last until the end of my next turn" + "\n   " + "I then gain adv. on my attacks and resistance to bludgeoning/piercing/slashing damage",
			recovery : "short rest",
			usages : 3,
			action : ["bonus action", ""]
		},
		"subclassfeature7" : {
			name : "Elegant Courtier",
			source : ["UA:FMA", 3],
			minlevel : 7,
			description : "\n   " + "I can add my Wis modifier to any Cha check to persuade anyone of a high social station" + "\n   " + "I gain proficiency with one language and the History, Insight, or Persuasion skill",
			skillstxt : "\n\n" + toUni("Samurai") + ": History, Insight, or Persuasion.",
			eval : "AddLanguage(\"+1 from Elegant Courtier\", \"being a Samurai (Elegant Courtier)\");",
			removeeval : "RemoveLanguage(\"+1 from Elegant Courtier\", \"being a Samurai (Elegant Courtier)\");",
		},
		"subclassfeature10" : {
			name : "Unbreakable Will",
			source : ["UA:FMA", 3],
			minlevel : 10,
			description : "\n   " + "I gain proficiency with Wis saves, or if I'm already proficient, either Int or Cha saves",
			skillstxt : "\n\n" + toUni("Samurai") + ": History, Insight, or Persuasion.",
			eval : "if (Who(\"Wis ST Prof\") === \"\") Checkbox(\"Wis ST Prof\", true, \"Proficiency with Wisdom saving throws was gained from Samurai (Unbreakable Will)\");",
			removeeval : "if (Who(\"Wis ST Prof\") === \"Proficiency with Wisdom saving throws was gained from Samurai (Unbreakable Will)\") Checkbox(\"Wis ST Prof\", false, \"\");",
		},
		"subclassfeature15" : {
			name : "Rapid Strike",
			source : ["UA:FMA", 3],
			minlevel : 15,
			description : "\n   " + "If I have adv. on an attack, I can forgo it to make an extra attack as a bonus action" + "\n   " + "This attack has to be with the same weapon against the same target",
			action : ["bonus action", ""]
		},
		"subclassfeature18" : {
			name : "Strength Before Death",
			source : ["UA:FMA", 3],
			minlevel : 18,
			description : "\n   " + "If I take damage that would reduce me to 0 HP, I can delay that damage" + "\n   " + "I then immediately take a bonus turn, interrupting the current turn" + "\n   " + "I don't take the delayed damage until the bonus turn ends and can affect that damage",
			recovery : "long rest",
			usages : 1,
		},
	}
};
ClassList.fighter.subclasses[1].push("samurai");

SourceList["UA:FMA"] = {
	name : "Unearthed Arcana: Fighter Martial Archetypes", //2016-12-05
	abbreviation : "UA:FMA",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2016/dnd/downloads/2016_Fighter_UA_1205_1.pdf"
};
