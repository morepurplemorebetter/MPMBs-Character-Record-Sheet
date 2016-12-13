/*  -WHAT IS THIS?-
    The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
    You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
     
    -KEEP IN MIND-
    Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
    It is recommended to enter the code in a fresh sheet before adding any other information.
*/
 
/*  -INFORMATION-
    Subject:    Subclass
    Effect:     This script adds a subclass for the Bard, called "College of Glamour"
                This is taken from the Bard Colleges Unearthed Arcana (http://media.wizards.com/2016/dnd/downloads/UA_Bard.pdf)
    Code by:    SoilentBrad & MorePurpleMoreBetter
    Date:       2016-11-16 (sheet v12.57)
*/

ClassSubList["college of glamour"] = {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*glamour).*$/i,
	subname : "College of Glamour",
	source : ["UA:BC", 1],
	features : {
		"subclassfeature3" : {
			name : "Mantle of Inspiration",
			source : ["UA:BC", 1],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I expend one bardic inspiration die to aid those within 60 ft of me" + "\n   " + "A number of allies equal to my Cha mod gain twice the die roll in temporary HP" + "\n   " + "They can use a reaction to move their speed toward me, without opportunity attacks",
			additional : "1 bardic inspiration die",
			action : ["bonus action", ""],
		},
		"subclassfeature3.1" : {
			name : "Enthralling Performance",
			source : ["UA:BC", 1],
			minlevel : 3,
			recovery : "short rest",
			usages : 1,
			description : "\n   " + "By performing for at least 10 minutes, I can charm humanoids within 60 ft of me" + "\n   " + "At the end of the performance, my Cha mod number of targets must make a Wis save" + "\n   " + "On a fail, a target is charmed for 1 hour; If success, it doesn't knows I tried to charm it" + "\n   " + "While charmed, the target idolizes me, hinders those opposing me, and avoids violence" + "\n   " + "This lasts until a target takes damage, I attack it, or if it sees me attacking its allies",
		},
		"subclassfeature6" : {
			name : "Mantle of Majesty",
			source : ["UA:BC", 1],
			minlevel : 6,
			recovery : "long rest",
			usages : 1,
			action : ["bonus action", ""],
			description : "\n   " + "As a bonus action, I take on an appearance of unearthly beauty for 1 minute" + "\n   " + "As a bonus action during this time, I can cast command without using a spell slot" + "\n   " + "Creatures charmed by me automatically fail their saves against these command spells",
			spellcastingBonus : [{
				name : "Mantle of Majesty",
				spells : ["command"],
				selection : ["command"],
				oncelr : true,
			}],
		},
		"subclassfeature14" : {
			name : "Unspeakable Majesty",
			source : ["UA:BC", 2],
			minlevel : 14,
			recovery : "short rest",
			usages : 1,
			action : ["action", ""],
			description : "\n   " + "As an action, I can cast Sanctuary on myself without using a spell slot" + "\n   " + "If a creature fails its save to this, I gain adv. on all Cha checks against it for 1 min" + "\n   " + "In addition, the target has disadv. on saves it makes against my spells on my next turn",
			spellcastingBonus : [{
				name : "Unspeakable Majesty",
				spells : ["sanctuary"],
				selection : ["sanctuary"],
				oncesr : true,
			}],
		},
	},
};
ClassList["bard"].subclasses[1].push("college of glamour");

SourceList["UA:BC"] = {
	name : "Unearthed Arcana: Bard: Bard Colleges", //2016-11-14
	abbreviation : "UA:BC",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2016/dnd/downloads/UA_Bard.pdf"
};