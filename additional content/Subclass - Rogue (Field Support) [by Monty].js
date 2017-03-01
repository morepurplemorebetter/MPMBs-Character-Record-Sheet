/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Rogue, called "Field Support"
				This subclass is made by Monty and can be found here: https://www.dropbox.com/s/49lcya9a11xmoi1/Field%20Support%2C%20Roguish%20Archetype.pdf?dl=0
	Code by:	Monty & MorePurpleMoreBetter
	Date:		2016-11-21 (sheet v12.59)
*/

ClassSubList["field support"] = {
	regExpSearch : /^(?=.*(rogue|miscreant))(?=.*support).*$/i,
	subname : "Field Support",
	source : ["HB", 0],
	features : {
		"subclassfeature3" : {
			name : "On your side",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I can use a healer's kit, get one up from prone, or do the Help action",
			action : ["bonus action", ""]
			},
		"subclassfeature3.1" : {
			name : "Feel the heat",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "As a reaction, I can detect who is in the worst danger in the immediate future" + "\n   " + "With a DC 10 Wisdom (Perception) check, I can detect the dangers to those I can see" + "\n   " + "As part of my reaction, I can move half my speed towards the one in the most danger" + "\n   " + "With a DC 10 Dex (Acrobatics) check, this move does not provoke opportunity attacks" + "\n   " + "If failed, I fall prone next to my starting position and opportunity attacks have adv.",
			action : ["reaction", ""]
		},
		"subclassfeature9" : {
			name : "Elusive Abusive",
			source : ["HB", 0],
			minlevel : 9,
			description : "\n   " + "As an action, I can Disengage and attack once, if I move no more than half my speed" + "\n   " + "I can make a single ranged attack against the target I was in reach of before moving" + "\n   " + "If this attack hits, the target has disadvantage on its next attack roll",
			action : ["action", ""]
		},
		"subclassfeature13" : {
			name : "Adrenaline Surge",
			source : ["HB", 0],
			minlevel : 13,
			description : "\n   " + "As an action, I can pick up a friendly creature, regardless of weight, and move it" + "\n   " + "At the end of my turn, I drop the creature prone in an adjacent space of my choice",
			action : ["action", ""]
		},
		"subclassfeature17" : {
			name : "Quicksilver",
			source : ["HB", 0],
			minlevel : 17,
			usages : 1,
			recovery : "short rest",
			description : "\n   " + "As an action, I can stop the flow of time and take 3 turns, as Time Stop (PHB 283)" + "\n   " + "Unlike the spell, this ends when I am more than 3 times my speed away from an ally" + "\n   " + "Also unlike the spell, I can effect other creatures during and this does not end the spell" + "\n   " + "Using this ability gives me a level of exhaustion",
			action : ["action", ""]
		}
	}
};
ClassList.rogue.subclasses[1].push("field support");