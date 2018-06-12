/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the druid, called "Circle of the Wyrm"
				These are taken from the Giant in the Playground forums (https://www.giantitp.com/forums/showthread.php?512741) and is the version posted at 22nd of January 2017
				This subclass is made by YouCanTry
	Code by:	MorePurpleMoreBetter
	Date:		2018-02-26 (sheet v12.999)
*/

var iFileName = "Druid - Circle of the Wyrm [YouCanTry's work, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["Y:CotW"] = {
	name : "YouCanTry - Druid Archetype - Circle of the Wyrm",
	abbreviation : "Y:CotW",
	group : "Giant in the Playground forums",
	url : "http://www.giantitp.com/forums/showthread.php?512741",
	date : "2017/01/22"
};

AddSubClass("druid", "circle of the wyrm-giantitp", {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*wyrm).*$/i,
	subname : "Circle of the Wyrm",
	source : ["Y:CotW", 0],
	features : {
		"subclassfeature2" : {
			name : "Draconic",
			source : ["Y:CotW", 0],
			minlevel : 2,
			description : "\n   " + "I know the Draconic language",
			languageProfs : ["Draconic"]
		},
		"subclassfeature2.1" : {
			name : "Dragon Shape",
			source : ["Y:CotW", 0],
			minlevel : 2,
			description : desc([
				"I can use Wild Shape to transform into a creature of the dragon type instead of a beast",
				"There are some limitations that apply to a dragon shape:",
				"\u2022 If the dragon shape has a breath weapon, it recharges on a short rest (until level 14)",
				"\u2022 When reverting back from a dragon shape, I gain one level of exhaustion",
				"\u2022 I can't use the dragon's innate spellcasting until I have the Beast Spells feature",
				"\u2022 I can't use the dragon's flying speed until I reach level 8 as a druid"
			]),
			additional : levels.map(function (n) {
				return n < 2 ? "" : "CR " + (n < 5 ? 1 : Math.floor(n/3)) + (n < 8 ? ", can't use flying speed" : n < 18 ? "" : ", can use dragon's spellcasting")
			})
		},
		"subclassfeature6" : {
			name : "Tooth and Claw",
			source : ["Y:CotW", 0],
			minlevel : 6,
			description : "\n   " + "My attacks in dragon form count as magical for overcoming resistance and immunities"
		},
		"subclassfeature6.1" : {
			name : "Favored Identity",
			source : ["Y:CotW", 0],
			minlevel : 6,
			description : "\n   " + "I add double my prof. bonus to checks for conversing, knowledge, or identifying dragons"
		},
		"subclassfeature10" : {
			name : "Wyrm Heal",
			source : ["Y:CotW", 0],
			minlevel : 10,
			description : desc([
				"I can expend two uses of Wild Shape to transform into a young dragon or wyvern",
				"Doing this gives me levels of exhaustion equal to half the dragon's CR when I revert back"
			])
		},
		"subclassfeature10" : {
			name : "True Dragon",
			source : ["Y:CotW", 0],
			minlevel : 10,
			description : "\n   " + "During a short rest I have a chance to reduce my exhaustion by 1 level",
			additional : levels.map(function (n) { return n < 10 ? "" : n < 14 ? "33%, 1 or 2 on a d6" : "50%, 1 or 2 on a d4"; }),
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Dragon's Breath",
			source : ["Y:CotW", 0],
			minlevel : 14,
			description : "\n   " + "The breath weapon of my dragon shape recharges on a 5-6 at the start of each round"
		},
		"subclassfeature14.1" : {
			name : "Change Shape",
			source : ["Y:CotW", 0],
			minlevel : 14,
			description : desc([
				"I learn the Alter Self and Disguise Self and always have these prepared",
				"I can cast these in dragon shape, but I use my original size and type for the spells"
			]),
			spellcastingBonus : {
				name : "Change Shape",
				spells : ["alter self", "disguise self"],
				selection : ["alter self", "disguise self"],
				times : 2,
				prepared : true
			}
		}
	}
});