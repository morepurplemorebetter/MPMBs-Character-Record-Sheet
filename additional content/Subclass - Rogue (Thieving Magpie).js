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
			description : 
			"\n   " + "I can cast the Find Familiar spell as a ritual, summoning from a list of forms." + 
			"\n   " + "It gains proficiency in Sleight of Hand and Stealth, using my proficiency bonus."
			},
		"subclassfeature3.1" : {
			name : "Mugger",
			source : ["HB", 0],
			minlevel : 3,
			description : 
			"\n   " + "A sneak attack when my familiar gives me advantage earns me coins or treasure." + 
			"\n   " + "The DM has final say how many or what value is earned. I also need a free hand for this."
		},
		"subclassfeature9" : {
			name : "Slippery As A Snake",
			source : ["HB", 0],
			minlevel : 9,
			description : "\n   " + "I can enhance some of my actions with new abilities tied to my familiar."
		},
		"subclassfeature9.1": {
			name: "Slippery As A Snake: Dash, Disengage, or Hide",
			source: ["HB", 0],
			minlevel : 9,
			description: "\n   " + "I can use my turn's bonus action to command my familiar to dash, disengage, or hide.",
			action: ["bonus action", ""]
		},
		"sublcassfeature9.2": {
			name: "Slippery As A Snake: Dismiss Familiar",
			source: ["HB", 0],
			minlevel : 9,
			description: 
			"\n   " + "I can use my reaction to dismiss my familiar as described in the Find Familiar Spell." + 
			"\n   " + "It must be under attack or being forced to make a saving throw." + 
			"\n   " + "When dismissed, it is no longer affected by the conditions leading to the saving throw.",
			action: ["reaction", ""]
		},
		"sublcassfeature9.3": {
			name: "Slippery As A Snake: Slippery Dodge",
			source: ["HB", 0],
			minlevel : 9,
			description: 
			"\n   " + "I can move 5ft. without opportunity attacks using uncanny dodge." + 
			"\n   " + "I can also do this after a successful Dexterity saving throw.",
			action: ["reaction", ""]
		},
		"subclassfeature13" : {
			name : "Grow Together",
			source : ["HB", 0],
			minlevel : 13,
			description : 
			"\n   " + "My familiar gains addt'l hit dice equal to my proficiency modifier." + 
			"\n   " + "My familiar also gains hit points according to the hit die gained." + 
			"\n   " + "It gains a further hit die when my proficiency bonus increases."
		},
		"subclassfeature17" : {
			name : "Act As One",
			source : ["HB", 0],
			minlevel : 17,
			usages : 1,
			recovery : "short rest",
			description : 
			"\n   " + "My prof. bonus doubles on all ability checks and weapon damage rolls until my next turn." + 
			"\n   " + "My familiar must be within 5ft. and use the help action to assist me.",
			action : ["action", ""]
		}
	}
};
ClassList.rogue.subclasses[1].push("thieving magpie");

SourceList["HB:TM"] = {
	name : "Homebrew: Thieving Magpie", 
	abbreviation : "HB:TM", 
	group: "other",
	url : "http://firebringeraxels-junk.tumblr.com/"
};