/*	-INFORMATION-
	Subject:	Thieving Magpie (Roguish Archetype)
	Effect:		This script adds a Roguish Archetype for the Rogue called "Thieving Magpie"
	Script: 	TwoHeadedBoy 
	Author:		firebringeraxel (http://firebringeraxels-junk.tumblr.com/)
	Date: 		8.16.2017
	Version:	1.0
*/

ClassSubList["thieving magpie"] = { 
	regExpSearch : /^(?=.*thieving)(?=.*magpie).*$/i, 
	subname : "Thieving Magpie", 
	source : ["HB", 0], 
	features : {
		"subclassfeature3" : {
			name : "Partner in Crime",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "You can cast the Find Familiar spell as a ritual, summoning a familiar from a list of forms. Your familiar gains proficiency in Sleight of Hand and Stealth in addition to its normal traits and uses your proficiency bonus for these skills."
			},
		"subclassfeature3.1" : {
			name : "Mugger",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "At 3rd level, whenever you deal sneak attack damage with a melee weapon attack that you were granted advantage on by your familiar performing the Help action, you steal a number of coins (or small obects with equal value) from the creature equal to the sneak attack damage dealt. The DM has final say on what you steal. You cannot use this feature unless you have a free hand."
		},
		"subclassfeature9" : {
			name : "Slippery As A Snake",
			source : ["HB", 0],
			minlevel : 9,
			description : "\n   " + "At 9th level, you can enhance some of your actions with new abilities tied to your familiar."
		},
		"subclassfeature9.1": {
			name: "Slippery As A Snake: Dash, Disengage, or Hide",
			source: ["HB", 0],
			minlevel : 9,
			description: "\n   " + "You can use your bonus action on your turn to command your familiar to use the dash, disengage, or hide action.",
			action: ["bonus action", ""]
		},
		"sublcassfeature9.2": {
			name: "Slippery As A Snake: Dismiss Familiar",
			source: ["HB", 0],
			minlevel : 9,
			description: "\n   " + "Whenever your familiar is attacked or forced to make a saving throw, you can use your reaction to dismiss it as described in the Find Familiar spell. When dismissed in this manner, it is no longer affected by whatever triggered the saving throw.",
			action: ["reaction", ""]
		},
		"sublcassfeature9.3": {
			name: "Slippery As A Snake: Slippery Dodge",
			source: ["HB", 0],
			minlevel : 9,
			description: "\n   " + "Whenever you use your Uncanny Dodge feature or succeed on a Dexterity saving throw that Evasion effects, you can move 5 feet without provoking attacks of opportunity.",
			action: ["reaction", ""]
		},
		"subclassfeature13" : {
			name : "Grow Together",
			source : ["HB", 0],
			minlevel : 13,
			description : "\n   " + "Starting at 13th level, your familiar gains additional hit dice equal to your proficiency modifier and hit points as befits the hit die type. It gains a further hit die whenever your proficiency modifier increases."
		},
		"subclassfeature17" : {
			name : "Act As One",
			source : ["HB", 0],
			minlevel : 17,
			usages : 1,
			recovery : "short rest",
			description : "\n   " + "At 17th level, whenever your familiar uses the Help action to assist you, you gain advantage as usual but you also add your proficiency modifier to all ability checks and weapon damage rolls you make until the start of your next turn so long as your familiar is within 5 feet of you.",
			action : ["action", ""]
		}
	}
};
ClassList.rogue.subclasses[1].push("thieving magpie");