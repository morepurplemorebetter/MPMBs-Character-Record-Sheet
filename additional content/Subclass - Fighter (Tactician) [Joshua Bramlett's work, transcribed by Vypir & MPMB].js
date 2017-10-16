/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Fighter, called "Tactician"
				This is taken from the DMs Guild website (http://www.dmsguild.com/product/216366/)
				This subclass is made by Joshua Bramlett
	Code by:	Bryce C. & MorePurpleMoreBetter
	Date:		2017-09-26 (sheet v12.998)
	
	Please support the creator of this content (Joshua Bramlett) and download his material from the DMs Guild website: http://www.dmsguild.com/browse.php?x=0&y=0&author=Joshua%20Bramlett
*/

ClassSubList["tactician"] = {
	regExpSearch : /tactician/i,
	subname : "Tactician",
	fullname : "Tactician",
	source : ["JB:TAS", 2],
	features : {
		"subclassfeature3" : {
			name : "Issue Orders",
			source : ["JB:TAS", 2],
			minlevel : 3,
			description : "\n   " + "I learn special orders that my allies can follow as a reaction",
			additional : levels.map(function (n) {
				return (n < 3 ? "" : n < 7 ? 2 : n < 10 ? 4 : n < 15 ? 6 : 8) + " orders known";
			}),
			extraname : "Order",
			extrachoices : ["Attack", "Cast It", "Find Them", "Grab Them", "Line Them Up", "Lose Them", "Move", "Retreat", "stand Your Ground", "Use It"],
			"attack" : {
				name : "Attack",
				source : ["JB:TAS", 2],
				description : "\n   " + "As a bonus action, I can order one alley within 30 ft to make one weapon attack",
				action : ["bonus action", " (order)"]
			},
			"cast it" : {
				name : "Cast It",
				source : ["JB:TAS", 2],
				description : "\n   " + "As an action, I can order one alley to cast a spell that has a casting time of one action",
				action : ["action", " (order)"]
			},
			"find them" : {
				name : "Find Them",
				source : ["JB:TAS", 2],
				description : "\n   " + "As a reaction, I can order an alley to use the search action",
				action : ["reaction", " (order)"]
			},
			"grab them" : {
				name : "Grab Them",
				source : ["JB:TAS", 2],
				description : "\n   " + "As a reaction, I can order one alley to make a grapple attempt",
				action : ["reaction", " (order)"]
			},
			"line them up" : {
				name : "Line Them Up",
				source : ["JB:TAS", 2],
				description : "\n   " + "As a reaction, I can order one alley to make a shove attempt",
				action : ["reaction", " (order)"]
			},
			"lose them" : {
				name : "Lose Them",
				source : ["JB:TAS", 2],
				description : "\n   " + "As a reaction, I can order one alley to take the hide action",
				action : ["reaction", " (order)"]
			},
			"move" : {
				name : "Move",
				source : ["JB:TAS", 2],
				description : "\n   " + "As a bonus action, I can order one alley to take the dash action",
				action : ["bonus action", " (order)"]
			},
			"retreat" : {
				name : "Line Them Up",
				source : ["JB:TAS", 2],
				description : "\n   " + "As a reaction, I can order one alley to take the disengage action",
				action : ["reaction", " (order)"]
			},
			"stand your ground" : {
				name : "Stand Your Ground",
				source : ["JB:TAS", 2],
				description : "\n   " + "As a bonus action, I can order one alley to take the dodge action",
				action : ["bonus action", " (order)"]
			},
			"use it" : {
				name : "Use It",
				source : ["JB:TAS", 2],
				description : "\n   " + "As a reaction, I can order one alley to take the use an object action",
				action : ["reaction", " (order)"]
			}
		},
		"subclassfeature7" : {
			name : "Preperation",
			source : ["JB:TAS", 2],
			minlevel : 7,
			description : "\n   " + "By spending at least 1 minute going over battle plans with my allies, they all gain insight" + "\n   " + "That insight gives them adv. on the first roll they make on their first turn in combat"
		},
		"subclassfeature10" : {
			name : "Sound Mind",
			source : ["JB:TAS", 2],
			minlevel : 10,
			description : "\n   " + "I have advantage on saving throws against being charmed or frightened",
			savetxt : {
				adv_vs : ["charmed", "frightened"]
			}
		},
		"subclassfeature15" : {
			name : "Group Command",
			source : ["JB:TAS", 2],
			minlevel : 15,
			description : "\n   " + "When I issue an order, I can issue it to two allies at the same time"
		},
		"subclassfeature18" : {
			name : "Inspiring Presence",
			source : ["JB:TAS", 2],
			minlevel : 18,
			description : "\n   " + "At the start of each of my turns, I grant 5 temporary HP to myself and allies in 30 ft"
		}
	}
};

ClassList.fighter.subclasses[1].push("tactician");

SourceList["JB:TAS"] = {
	name : "Joshua Bramlett: Martial Archetypes: Tactician and Scoundrel",
	abbreviation : "JB:TAS",
	group : "Dungeon Masters Guild",
	url : "http://www.dmsguild.com/product/216366/"
};
