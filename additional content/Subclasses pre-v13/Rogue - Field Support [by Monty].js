/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Rogue, called "Field Support"
				This subclass is made by Monty and can be found here: https://www.dropbox.com/s/49lcya9a11xmoi1/Field%20Support%2C%20Roguish%20Archetype.pdf?dl=1
	Code by:	Monty & MorePurpleMoreBetter
	Date:		2017-11-29 (sheet v12.999)
*/

var iFileName = "Rogue - Field Support [by Monty].js";
RequiredSheetVersion(12.999);

AddSubClass("rogue", "field support", {
	regExpSearch : /^(?=.*(rogue|miscreant))(?=.*support).*$/i,
	subname : "Field Support",
	source : ["HB", 0],
	features : {
		"subclassfeature3" : {
			name : "On your side",
			source : ["HB", 0],
			minlevel : 3,
			description: desc("As a bonus action, I can use a healer's kit, get one up from prone, or do the Help action"),
			action : [["bonus action", ""]]
			},
		"subclassfeature3.1" : {
			name : "Feel the heat",
			source : ["HB", 0],
			minlevel : 3,
			description: desc([
				"As a reaction, I can detect who is in the worst danger in the immediate future",
				"With a DC 10 Wisdom (Perception) check, I can detect the dangers to those I can see",
				"As part of my reaction, I can move half my speed towards the one in the most danger",
				"With a DC 10 Dex (Acrobatics) check, this move does not provoke opportunity attacks",
				"If failed, I fall prone next to my starting position and opportunity attacks have adv.",
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature9" : {
			name : "Elusive Abusive",
			source : ["HB", 0],
			minlevel : 9,
			description: desc([
				"As an action, I can Disengage and attack once, if I move no more than half my speed",
				"I can make a single ranged attack against the target I was in reach of before moving",
				"If this attack hits, the target has disadvantage on its next attack roll",
			]),
			action : [["action", ""]]
		},
		"subclassfeature13" : {
			name : "Adrenaline Surge",
			source : ["HB", 0],
			minlevel : 13,
			description: desc([
				"As an action, I can pick up a friendly creature, regardless of weight, and move it",
				"At the end of my turn, I drop the creature prone in an adjacent space of my choice",
			]),
			action : [["action", ""]]
		},
		"subclassfeature17" : {
			name : "Quicksilver",
			source : ["HB", 0],
			minlevel : 17,
			usages : 1,
			recovery : "short rest",
			description: desc([
				"As an action, I can stop the flow of time and take 3 turns, as Time Stop (PHB 283)",
				"Unlike the spell, this ends when I am more than 3 times my speed away from an ally",
				"Also unlike the spell, I can effect other creatures during and this does not end the spell",
				"Using this ability gives me a level of exhaustion",
			]),
			action : [["action", ""]]
		}
	}
});
