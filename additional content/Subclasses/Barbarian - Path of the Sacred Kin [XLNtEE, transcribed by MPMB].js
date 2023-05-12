/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the barbarian, called "Path of the Sacred Kin"
				This is taken from the 'Xanathar's Lost Notes to Everything Else v2.0' made by Lysa Chen, Will Doyle, James Haeck, James Introcaso, Rich Lescouflair, Shawn Merwin, Cindy Moore, Satine Phoenix, and Ruty Rutenberg (https://www.dmsguild.com/product/228484/)
	Code by:	MorePurpleMoreBetter
	Date:		2019-05-20 (sheet v13.0.0beta16)
*/

var iFileName = "Barbarian - Path of the Sacred Kin [XLNtEE, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["XLNtEE2"] = {
	name : "Xanathar's Lost Notes to Everything Else v2.0",
	abbreviation : "XLNtEE",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/228484/Xanathars-Lost-Notes-to-Everything-Else",
	date : "2018/08/30"
};

AddSubClass("barbarian", "sacred kin-xlntee2", {
	regExpSearch : /^(?=.*sacred)(?=.*kin).*$/i,
	subname : "Path of the Sacred Kin",
	fullname : "Sacred Kin",
	source : ["XLNtEE2", 8],
	abilitySave : 3,
	spellcastingFactor : 3,
	spellcastingList : {
		"class" : "sorcerer",
		school : ["Conj", "Div"],
		level : [0, 4]
	},
	spellcastingKnown : {
		cantrips : [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		spells : [0, 0, 2, 3, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9]
	},
	features : {
		"subclassfeature3" : {
			name : "Spellcasting",
			source : ["XLNtEE2", 8],
			minlevel : 3,
			description : "\n   " + "I can cast known sorcerer cantrips/spells, using Constitution as my spellcasting ability",
			additional : ["", "", "2 cantrips \u0026 3 spells known", "2 cantrips \u0026 4 spells known", "2 cantrips \u0026 4 spells known", "2 cantrips \u0026 4 spells known", "2 cantrips \u0026 5 spells known", "2 cantrips \u0026 6 spells known", "2 cantrips \u0026 6 spells known", "3 cantrips \u0026 7 spells known", "3 cantrips \u0026 8 spells known", "3 cantrips \u0026 8 spells known", "3 cantrips \u0026 9 spells known", "3 cantrips \u0026 10 spells known", "3 cantrips \u0026 10 spells known", "3 cantrips \u0026 11 spells known", "3 cantrips \u0026 11 spells known", "3 cantrips \u0026 11 spells known", "3 cantrips \u0026 12 spells known", "3 cantrips \u0026 13 spells known"],
			spellcastingBonus : { //for the spells gained at level 3, 8, 14, 20
				name : "From any school",
				"class" : "sorcerer",
				times : [0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4],
				level : [1, 4]
			}
		},
		"subclassfeature3.1" : {
			name : "Ancestral Origins",
			source : ["XLNtEE2", 9],
			minlevel : 3,
			description : "\n   Use the \"Choose Features\" button above to select the ancestral origins",
			choices : ["Aberrant", "Celestial", "Demonic"],
			"aberrant" : {
				name : "Aberrant Ancestral Origin",
				description : "\n   I can speak, read and write Deep Speech; My ancestral damage types are psychic \u0026 force",
				languageProfs : ["Deep Speech"]
			},
			"celestial" : {
				name : "Celestial Ancestral Origin",
				description : "\n   I can speak, read and write Celestial; My ancestral damage types are thunder \u0026 radiant",
				languageProfs : ["Celestial"]
			},
			"demonic" : {
				name : "Demonic Ancestral Origin",
				description : "\n   I can speak, read and write Abyssal; My ancestral damage types are necrotic and poison",
				languageProfs : ["Abyssal"]
			},
			choiceDependencies : [{
				feature : "subclassfeature14"
			}]
		},
		"subclassfeature3.2" : {
			name : "Mythic Manifestation",
			source : ["XLNtEE2", 9],
			minlevel : 3,
			description : "\n   When I use a spell slot to cast a spell, I gain three times the slot's level in temporary HP"
		},
		"subclassfeature3.3" : {
			name : "Supernatural Fury",
			source : ["XLNtEE2", 9],
			minlevel : 3,
			description : "[Use rage usage; not cumulative] " + desc([
				"When I rage, I can choose to enter a supernatural fury instead, changing its benefits to:",
				"Adv. on Con (concentration) saves when damaged and resistance to damage from spells",
				"Lasts just as long as rage, but casting a spell in my turn prevents it from stopping early"
			]),
			action : [["bonus action", " (start/end)"]],
			savetxt : {
				text : "Adv. on Con (Concentration) saves when damaged in supernatural fury"
			},
			dmgres : [["Spells", "Spells (in supern. fury)"]],
		},
		"subclassfeature6" : {
			name : "Ancestry Points",
			source : ["XLNtEE2", 9],
			minlevel : 6,
			description : "",
			usages : [0, 0, 0, 0, 0, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10],
			recovery : "long rest"
		},
		"subclassfeature6.1" : function () {
			var aFea = eval(Base_ClassList.sorcerer.features.metamagic.toSource().replace(/sorcery point/ig, "ancestry point").replace(/known/ig, ", only 1 option per spell"));
			aFea.source = ["XLNtEE2", 9];
			aFea.description = "";
			aFea.minlevel = 6;
			return aFea;
		}(),
		"subclassfeature6.2" : {
			name : "Transcendent Legacy",
			source : ["XLNtEE2", 9],
			minlevel : 6,
			description : "\n   While in rage, I can have my melee weapon attacks deal an ancestral damage type",
			additional : levels.map( function (n) {
				return n < 14 ? "" : "Ignores resistance";
			})
		},
		"subclassfeature10" : {
			name : "Ancestral Guidance",
			source : ["XLNtEE2", 9],
			minlevel : 10,
			description : desc([
				"When I use my action to cast a cantrip, I can make a weapon attack as a bonus action",
				"If the cantrip dealt damage, I gain advantage on the bonus action attack roll"
			]),
			action : ["bonus action", " (after cantrip)"],
		},
		"subclassfeature14" : {
			name : "Immortal Birthright",
			source : ["XLNtEE2", 9],
			minlevel : 14,
			description : "\n   Use the \"Choose Features\" button above to select the ancestral origins",
			action : ["bonus action", " (start/stop)"],
			speed : { fly : { spd : "walk", enc : "walk" } },
			choices : ["aberrant", "celestial", "demonic"],
			choicesNotInMenu : true,
			"aberrant" : {
				name : "Immortal Aberrant Birthright",
				description : desc([
					"As a bonus action, unless armor is in the way, I can sprout sinew wings from my back",
					"I gain a fly speed equal to my current speed until I dismiss the wings as a bonus action"
				])
			},
			"celestial" : {
				name : "Immortal Celestial Birthright",
				description : desc([
					"As a bonus action, unless armor is in the way, I can sprout feather wings from my back",
					"I gain a fly speed equal to my current speed until I dismiss the wings as a bonus action"
				])
			},
			"demonic" : {
				name : "Immortal Demonic Birthright",
				description : desc([
					"As a bonus action, unless armor is in the way, I can sprout scale wings from my back",
					"I gain a fly speed equal to my current speed until I dismiss the wings as a bonus action"
				])
			}
		}
	}
});
