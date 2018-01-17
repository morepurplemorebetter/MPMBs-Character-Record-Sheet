/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Ranger, called "Corsair"
				This is a homebrew class designed by Wizzard
	Code by:	Wizzard
	Date:		2017-11-29 (sheet v12.999)
 */

var iFileName = "Ranger - Corsair [by Wizzard].js";
RequiredSheetVersion(12.999);

AddSubClass("ranger", "corsair", {
	regExpSearch : /corsair/i,
	subname : "Corsair",
	source : ["HB", 0],
	fullname : "Corsair",
	features : {
		"subclassfeature3" : {
			name : "Firearm Proficiency",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with firearms",
			weapons : [false, false, ["firearms"]]
		},
		"subclassfeature3.1" : {
			name : "Additional Fighting Style",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "Choose an extra Fighting Style for the Ranger using the \"Choose Feature\" button above ",
			choices : ["Close Quarters Shooting", "Mariner"],
			"close quarters shooting" : {
				name : "Close Quarters Shooting Fighting Style",
				source : ["UA:LDU", 1],
				description : "\n   " + "+1 bonus to attack rolls I make with ranged attacks" + "\n   " + "I don't have disadvantage when making a ranged attack while within 5 ft of a hostile" + "\n   " + "My ranged attacks ignore half and three-quarters cover against targets within 30 ft",
				calcChanges : {
					atkCalc : ["if (isRangedWeapon) {output.extraHit += 1; }; ", "My ranged weapons get a +1 bonus on the To Hit."]
				}
			},
			"mariner" : {
				name : "Mariner Fighting Style",
				source : ["UA:WA", 3],
				description : "\n   " + "While not wearing heavy armor or using a shield, I gain +1 AC and swim/climb speed" + "\n   " + "The swimming and climbing speeds are equal to my current walking speed",
				speed : {
					climb : { spd : "walk", enc : "walk" },
					swim : { spd : "walk", enc : "walk" }
				},
				eval : "AddACMisc(1, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\", \"ACshield || tDoc.getField('Heavy Armor').isBoxChecked(0)\")",
				removeeval : "AddACMisc(0, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\")"
			},
		},
		"subclassfeature7" : {
			name : "Quickdraw",
			source : ["HB", 0],
			minlevel : 7,
			description : "\n   " + "I add my proficiency bonus to my initiative" + "\n   " + "I can stow a firearm and draw another as a single object interaction on my turn",
			addMod : { type : "skill", field : "Init", mod : "Prof", text : "I add my proficiency bonus to my initiative rolls." }
		},
		"subclassfeature11" : {
			name : "Angels Eye",
			source : ["HB", 0],
			minlevel : 11,
			description : "\n   " + "When a creature misses me or an ally within range, I can use my reaction to retaliate" + "\n   " + "I can make an immediate attack with a melee or loaded firearm against the creature",
			action : ["reaction", ""]
		},
		"subclassfeature15" : {
			name : "Lightning Reload",
			source : ["HB", 0],
			minlevel : 15,
			description : "\n   " + "I can reload any firearm as a bonus action",
			action : ["bonus action", ""]
		}
	}
});

if (!SourceList["UA:WA"]) {
	SourceList["UA:WA"] = {
		name : "Unearthed Arcana: Waterborne Adventures",
		abbreviation : "UA:WA",
		group : "Unearthed Arcana",
		url : "https://media.wizards.com/2015/downloads/dnd/UA_Waterborne_v3.pdf",
		date : "2015/05/04"
	};
};
if (!SourceList["UA:LDU"]) {
	SourceList["UA:LDU"] = {
		name : "Unearthed Arcana: Light, Dark, Underdark!",
		abbreviation : "UA:LDU",
		group : "Unearthed Arcana",
		url : "https://media.wizards.com/2015/downloads/dnd/02_UA_Underdark_Characters.pdf",
		date : "2015/11/02"
	};
};
