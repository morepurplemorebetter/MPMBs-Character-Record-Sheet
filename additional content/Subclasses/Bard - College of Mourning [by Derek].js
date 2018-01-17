/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Bard, called "College of Mourning"
	Code by:	Derek
	Date:		2017-11-29 (sheet v12.999)
*/

var iFileName = "Bard - College of Mourning [by Derek].js";
RequiredSheetVersion(12.999);

AddSubClass("bard", "college of mourning", {
	regExpSearch : /^(?=.*college)(?=.*mourning).*$/i,
	subname : "College of Mourning",
	source : ["HB", 0],
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiency",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with one instrument of my choice. Also add my proficiency bonus to Death Saves. ",
		},
		"subclassfeature3.1" : {
			name : "Dead Man's Tongue",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "I learn the Speak with Dead spell and can cast it at will a number of times equal to my Charisma modifier per long rest.",
		},
		"subclassfeature3.2" : {
			name : "Haunting Melody",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "I learn to use music to inspire fear. An enemy within 60ft makes a WIS save vs my spell casting DC. I can expend a bardic inspiration dir to lower their save by the number rolled. As long as I maintain concentration, the target cannot willingly move within 30 ft. of me. Must finish a long rest to regain this feature.",
			action : ["action", ""],
		},
		"subclassfeature6" : {
			name : "Song of Awakening",
			source : ["HB", 0],
			minlevel : 6,
			description : "\n   " + "I have learned how to channel my pain to raise the dead. I can expend 1 Bardic Inspiration die to gein the effect of the Animate Dead spell with the following changes: The undead has HP equal to its max or half my HP max rounded down, whichever is higher. My undead adds my proficiency bonus to its attacks and saves. I may only have 1 undead created this way. Must finish a short or long rest to regain this feature",
			action : ["reaction", ""],
		},
		"subclassfeature14" : {
			name : "Sympathy of the Dead",
			source : ["HB", 0],
			minlevel : 14,
			description : "\n   " + "My talent is so great the dead stop to acknowledge my skill. When I use Countercharm, hostile undead within range have disadvantage on attacks and saves.",
			action : ["action", "(countercharm)"],
		}
	}
});
