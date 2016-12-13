/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Bard, called "College of Swords"
				This is taken from the Kits of Old Unearthed Arcana (http://media.wizards.com/2015/downloads/dnd/04_UA_Classics_Revisited.pdf)
	Code by:	MorePurpleMoreBetter
	Date:		2016-08-11 (sheet v12.05)
*/

ClassSubList["college of swords"] = {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*\bswords?\b).*$/i,
	subname : "College of Swords",
	source : ["UA:KoO", 1],
	attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiencies",
			source : ["UA:KoO", 1],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with medium armor and scimitars",
			armor : [false, true, false, false],
			weapons : [false, false, ["scimitar"]],
		},
		"subclassfeature3.1" : {
			name : "Two-Weapon Fighting Style",
			source : ["UA:KoO", 1],
			minlevel : 3,
			description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks",
		},
		"subclassfeature3.2" : {
			name : "Blade Flourish",
			source : ["UA:KoO", 1],
			minlevel : 3,
			description : "\n   " + "When I take the Attack action on my turn, I can do one of the following flourishes:" + "\n   " + "I have to use a dagger, longsword, rapier, scimitar, or shortsword while doing this" + "\n    - " + "Defensive Flourish [one Bardic Inspiration die]" + "\n       " + "As a bonus action, I add the die to my AC until the start of my next turn" + "\n    - " + "Trick Shooter's Flourish [one Bardic Inspiration die]" + "\n       " + "As a bonus action with a dagger ranged attack, I add the die to the attack roll" + "\n       " + "If the target is an unattended, inanimate object, the result of the die is doubled" + "\n    - " + "Unnerving Flourish [one Bardic Inspiration die]" + "\n       " + "As a bonus action when reducing a foe to 0 HP with a melee attack, I leave it alive" + "\n       " + "The target stays at 1 HP and is frightened of me for my Cha modifier in minutes" + "\n       " + "It must also make a Cha save at a DC of my spell save + the bardic inspiration die" + "\n       " + "If failed, it answers truthfully any questions I ask and obeys me while frightened",
			action : ["bonus action", " (one inspiration die)"]
		},
		"subclassfeature14" : {
			name : "Battle Magic",
			source : ["UA:KoO", 2],
			minlevel : 14,
			description : "\n   " + "When I use my action to cast a Bard spell, I can make one bonus action weapon attack",
			action : ["bonus action", " (with Bard spell)"]
		},
	}
};
ClassList.bard.subclasses[1].push("college of swords");

SourceList["UA:KoO"] = {
	name : "Unearthed Arcana: Kits of Old", //2016-01-04
	abbreviation : "UA:KoO",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2015/downloads/dnd/04_UA_Classics_Revisited.pdf"
};