/*  -WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
 */

/*  -INFORMATION-
	Subject:    Subclass
	Effect:     This script adds a subclass for the Ranger, called "Corsair"
				This is a homebrew class designed by Wizzard
	Code by:    Wizzard
	Date:       2017-02-18 (sheet v12.83)
 */

ClassSubList["corsair"] = {
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
				description : "\n   " + "While not wearing heavy armor or using a shield, I gain +1 AC and swim/climb speed" + "\n   " + "The swimming and climbing speeds equal my current walking speed",
				eval : "AddACMisc(1, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\", \"ACshield || tDoc.getField('Heavy Armor').isBoxChecked(0)\")",
				removeeval : "AddACMisc(0, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\")"
			},
		},
		"subclassfeature7" : {
			name : "Quickdraw",
			source : ["HB", 0],
			minlevel : 7,
			description : "\n   " + "I add my proficiency bonus to my initiative" + "\n   " + "I can stow a firearm and draw another as a single object interaction on my turn",
			changeeval : "if (classes.known.ranger.level >= 7) {Value(\"Init Bonus\", What(\"Proficiency Bonus\"))}"
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
};
ClassList.ranger.subclasses[1].push("corsair");

SourceList["UA:WA"] = {
	name : "Unearthed Arcana: Waterborne Adventures", //2015-05-04
	abbreviation : "UA:WA",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2015/downloads/dnd/UA_Waterborne_v3.pdf"
};
SourceList["UA:LDU"] = {
	name : "Unearthed Arcana: Light, Dark, Underdark!", //2015-11-02
	abbreviation : "UA:LDU",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2015/downloads/dnd/02_UA_Underdark_Characters.pdf"
};