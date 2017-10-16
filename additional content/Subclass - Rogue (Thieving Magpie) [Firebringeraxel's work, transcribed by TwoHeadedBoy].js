/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Rogue, called "Thieving Magpie"
				This is made by Firebringeraxel (http://firebringeraxels-junk.tumblr.com/post/162875990845/the-thieving-magpie-a-rogue-that-works-in-unison)
	Code by:	TwoHeadedBoy
	Date:		2017-08-26 (sheet v12.998)
*/

ClassSubList["rogue-thieving magpie"] = {
	regExpSearch: /^(?=.*thieving)(?=.*magpie).*$/i,
	subname: "Thieving Magpie",
	source: ["FC:TM", 0],
	features: {
		"subclassfeature3": {
			name: "Partner in Crime",
			source: ["FC:TM", 0],
			minlevel: 3,
			description: desc([
				"I can use Find Familiar as a ritual, but with a limited number of animals to choose from",
				"I can select a cat, corvid (raven stats), ferret, monkey, rat, spider, squirrel, or weasel",
				"It gains proficiency in Sleight of Hand and Stealth, using my proficiency bonus"
			]),
			spellcastingBonus : {
				name : "Partner in Crime",
				spells : ["find familiar"],
				selection : ["find familiar"],
				firstCol : "(R)"
			}
		},
		"subclassfeature3.1": {
			name: "Mugger",
			source: ["FC:TM", 0],
			minlevel: 3,
			description: desc([
				"If my familiar performs the Help action to give me adv. in melee, I can also steal stuff",
				"My melee attack has be eligible for sneak attack and I require a free hand",
				"What I steal, coins or small object, has a value equal to the sneak attack damage in gp"
			])
		},
		"subclassfeature9": {
			name: "Slippery As A Snake",
			source: ["FC:TM", 0],
			minlevel: 9,
			description: desc([
				"As a bonus action, I can command my familiar to do the Dash, Disengage, or Hide action",
				"As a reaction when my familiar takes damage or needs to save, I can dismiss it",
				"When dismissed, it is no longer affected by the conditions leading to the saving throw",
				"When I use uncanny dodge or succeed a Dex save that evasion affects, I can move 5 ft",
				"I don't provoke opportunity attacks for moving these 5 ft"
			]),
			action: ["bonus action", " (Dash, Disengage, Hide)"],
			eval : "AddAction('reaction', 'Dismiss Familiar (when attacked)', 'Rogue (Thieving Magpie)');",
			removeeval : "RemoveAction('reaction', 'Dismiss Familiar (when attacked)')"
		},
		"subclassfeature13": {
			name: "Grow Together",
			source: ["FC:TM", 0],
			minlevel: 13,
			description: "\n   " + "My familiar gains additional HD equal to my proficiency bonus; This affect HP as well"
		},
		"subclassfeature17": {
			name: "Act As One",
			source: ["FC:TM", 0],
			minlevel: 17,
			description: desc([
				"If my familiar is within 5 ft and performs the Help action to assist me, I gain bonuses",
				"I add my proficiency bonus to ability checks and weapon damage rolls",
				"This lasts until the start of my next turn or until my familiar is more than 5 ft away"
			])
		}
	}
};
ClassList.rogue.subclasses[1].push("rogue-thieving magpie");

SourceList["FC:TM"] = {
	name: "Firebringeraxel's Creations: Thieving Magpie",
	abbreviation: "FC:TM",
	group: "Homebrew",
	url: "http://firebringeraxels-junk.tumblr.com/post/162875990845/the-thieving-magpie-a-rogue-that-works-in-unison"
};
