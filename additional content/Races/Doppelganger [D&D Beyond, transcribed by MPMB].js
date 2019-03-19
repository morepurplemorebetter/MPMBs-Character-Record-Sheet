/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race, called "Doppelganger"
				This is taken from the homebrew section on D&D Beyond (https://www.dndbeyond.com/characters/races/622-doppelganger)
				This race is made by VillainTheory
	Code by:	MorePurpleMoreBetter
	Date:		2018-11-06 (sheet v13.0.0beta6)
*/

var iFileName = "Doppelganger [D&D Beyond, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["DnD-B:D"] = {
	name : "D&D Beyond: Doppelganger",
	abbreviation : "DnD-B:D",
	group : "D&D Beyond",
	url : "https://www.dndbeyond.com/characters/races/622-doppelganger",
	date : "2018/01/20"
};

RaceList["doppelganger"] = {
	regExpSearch : /doppelganger/i,
	name : "Doppelganger",
	source : ["DnD-B:D", 0],
	plural : "Doppelgangers",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", 2],
	vision : [["Darkvision", 60]],
	savetxt : {
		adv_vs : ["charmed"]
	},
	skills : ["Deception"],
	age : " reach maturity at the same age as their parent race, and live for roughly a century after they reach maturity",
	height : " stand around 6 feet tall, slightly taller than humans, with hints of elven features",
	weight : "",
	heightMetric : " stand around 1,8 metres tall, slightly taller than humans, with hints of elven features",
	improvements: "Doppelganger: +1 Dexterity, +1 Charisma;",
	scores : [0, 1, 0, 0, 0, 1],
	trait : "Doppelganger (+1 Dexterity, +1 Charisma)\n   Shapechanger: As an action three times per long rest, I can polymorph into a Small or Medium humanoid I have seen. Stats and equipment don't change. I revert back when I die.\n   Read Thoughts: As an action, I can read the surface thoughts of a creature in 30 ft which lasts until my concentration is broken.\n   Psychic Intuition: Once per long rest, while reading a target's thoughts, I can choose to have advantage on a single Insight, Deception, Intimidation, or Persuasion check against it.",
	features : {
		"shapechanger" : {
			name : "Shapechanger",
			minlevel : 1,
			usages : 3,
			recovery : "long rest",
			action : ["action", " (start/end)"]
		},
		"read thoughts" : {
			name : "Read Thoughts",
			minlevel : 1,
			action : ["action", ""]
		},
		"psychic intuition" : {
			name : "Psychic Intuition",
			minlevel : 1,
			usages : 1,
			recovery : "long rest",
		}
	}
};
