/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Bard, called "College of Satire"
				This is taken from the Kits of Old Unearthed Arcana (http://media.wizards.com/2015/downloads/dnd/04_UA_Classics_Revisited.pdf)
	Code by:	MorePurpleMoreBetter
	Date:		2016-08-11 (sheet v12.05)
*/

ClassSubList["college of satire"] = {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*satire).*$/i,
	subname : "College of Satire",
	source : ["UA:KoO", 2],
	attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiencies",
			source : ["UA:KoO", 2],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with thieves' tools, sleight of hand, and one other skill of my choice",
			skills : ["Sleight of Hand"],
			skillstxt : "\n\nBard (College of Satire): Thieves' Tools, Sleight of Hand, and any one other skill.",
			eval : "AddTool(\"Thieves' Tools\", \"Bard (College of Satire)\")",
			removeeval : "RemoveTool(\"Thieves' Tools\", \"Bard (College of Satire)\")",
		},
		"subclassfeature3.1" : {
			name : "Tumbling Fool",
			source : ["UA:KoO", 2],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I tumble which gives the benefits of the Dash and Disengage actions" + "\n   " + "I also gain a climbing speed at my current speed and half damage from falling",
			action : ["bonus action", ""]
		},
		"subclassfeature6" : {
			name : "Fool's Insight",
			source : ["UA:KoO", 2],
			minlevel : 6,
			description : "\n   " + "I can cast Detect Thoughts, but on a save the target suffers an embarrassing social gaffe",
			usages : "Charisma modifier per ",
			usagescalc : "event.value = Math.max(1, this.getField(\"Cha Mod\").value);",
			recovery : "long rest",
			action : ["action", " (Detect Thoughts)"],
		},
		"subclassfeature14" : {
			name : "Fool's Look",
			source : ["UA:KoO", 3],
			minlevel : 14,
			description : " [one bardic inspiration die]" + "\n   " + "When I fail an ability check, saving throw, or attack roll, I can add one inspiration die" + "\n   " + "If this turns the roll into a success, I have to note down the number rolled" + "\n   " + "I can't use this ability again until the DM subtracts the amount from a check or attack",
			usages : 1,
			recovery : "reset",
		},
	}
};
ClassList.bard.subclasses[1].push("college of satire");

SourceList["UA:KoO"] = {
	name : "Unearthed Arcana: Kits of Old", //2016-01-04
	abbreviation : "UA:KoO",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2015/downloads/dnd/04_UA_Classics_Revisited.pdf"
};