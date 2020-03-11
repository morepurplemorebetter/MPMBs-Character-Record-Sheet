/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass called "Shadow-Weaver" (version 0.3, 25/09/2017)

				This is taken from the Unearthed Arcana Subreddit (https://www.reddit.com/r/UnearthedArcana/comments/72eudj/walrock_homebrew_monthly_update_sept_17_awakened/)
				This subclass is made by Walrock

	Code by:	Smashman
	Date:		2020-03-11 (sheet v13.0.0beta27)
*/

var iFileName = "Rogue - Shadow-Weaver [by Walrock, transcribed by Smashman].js";
RequiredSheetVersion(13);

SourceList["W:SW"] = {
	name: "Walrock: Shadow-Weaver",
	abbreviation: "W:SW",
	group: "Reddit/r/UnearthedArcana",
	url: "https://www.reddit.com/r/UnearthedArcana/comments/72eudj/walrock_homebrew_monthly_update_sept_17_awakened/",
	date: "2017-09-25"
};

AddSubClass("rogue", "shadow-weaver", {
	regExpSearch: /^shadow-?weaver$/i,
	subname: "Shadow-Weaver",
	fullname: "Shadow-Weaver",
	source: ["W:SW", 0],
	abilitySave: 6,
	spellcastingFactor: 3,
	spellcastingList: {
		spells: [
			// Cantrips
			"blade ward",
			"chill touch",
			"control flames",
			"mage hand",
			"message",
			"minor illusion",
			"sword burst",
			"thaumaturgy",
			"true strike",

			// 1st level
			"disguise self",
			"dissonant whispers",
			"illusory script",
			"jump",
			"silent image",
			"sleep",
			"unseen servant",

			// 2nd level
			"blindness/deafness",
			"blur",
			"cloud of daggers",
			"darkness",
			"mirror image",
			"phantasmal force",
			"silence",

			// 3rd level
			"blink",
			"fear",
			"major image",
			"phantom steed",
			"spirit guardians",

			// 4th level
			"banishment",
			"blight",
			"evard's black tentacles",
			"phantasmal killer",
		]
	},
	spellcastingKnown: {
		cantrips: [0, 0, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells: [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13]
	},
	features: {
		"subclassfeature3": {
			name: "Spellcasting",
			source: ["W:SW", 2],
			minlevel: 3,
			description: "\n   " + "I can cast known cantrips/spells, using Charisma as my spellcasting ability",
			additional: levels.map(function(level) {
				if (level < 3) return "";
				var cantrip_num = level >= 10 ? 4 : 3;
				var spell_num = level >= 20 ? 13 : level >= 19 ? 12 : level >= 16 ? 11 : level >= 14 ? 10 : level >= 13 ? 9 : level >= 11 ? 8 : level >= 10 ? 7 : level >= 8 ? 6 : level >= 7 ? 5 : level >= 4 ? 4 : 3;
				return cantrip_num + " cantrips \u0026 " + spell_num + " spells known";
			}),
			spellChanges: {
				"spirit guardians": {
					description: SpellsList["spirit guardians"].description.replace("Radiant/", ""),
					changes: "As a Shadow-Weaver, I can only deal Necrotic damage with Spirit Guardians"
				}
			},
		},
		"subclassfeature3.1": {
			name: "Shroud of Shadow",
			source: ["W:SW", 3],
			minlevel: 3,
			description: desc([
				"As a bonus action, I can place a shroud on a creature that I can see within 120 ft.",
				"I must be hidden from the creature to place a shroud, which lasts 1 hour",
				"Sneak Attack additional damage can be Necrotic against shrouded creature.",
				"When shrouded creature is reduced to 0 hp, I can move the shroud without being hidden",
				"Only one shroud can be placed at a time, placing a new one removes the previous",
				"I know the general location and emotional state of shrouded when on the same plane"
			]),
			additional : "+30 ft darkvision",
			vision : [["Darkvision", "fixed 30"], ["Darkvision", "+30"]],
			action: [["bonus action", " (apply)"]],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (/shroud\b/i.test(v.WeaponText) && (/sneak attack\b/i).test(fields.Description)) {
							var dmgType = fields.Damage_Type ? fields.Damage_Type.capitalize() : "Normal";
							fields.Description = fields.Description.replace(/(sneak attack [0-9]0?d6)/i, "$1 (" + dmgType + " or Necrotic)");
						}
					},
					"If I include the word 'Shroud' in a weapon name, Sneak Attack additional damage can be necrotic damage type"
				]
			}
		},
		"subclassfeature9": {
			name: "Gloomstride",
			source: ["W:SW", 3],
			minlevel: 9,
			description: desc([
				"As a bonus action, I can teleport up to 30 ft to an area of dim light or darkness.",
				"I can also teleport adjacent to a creature if it has a shadow, or is under my shroud.",
				"Feature recharges if shrouded crea. is reduced to 0 hp; after teleport, next atk has adv."
			]),
			action: [["bonus action", ""]],
			usages: 1,
			recovery: "short rest"
		},
		"subclassfeature13": {
			name: "Eyes in the Dark",
			source: ["W:SW", 4],
			minlevel: 13,
			description: desc([
				"As a bonus action, I can start concentrating and see from a point of darkness in 120 ft.",
				"I can move my view as a bonus action, to a location that I can see, even with this feature",
				"Abilities that block scrying block this and while concentrating, my attacks have disadv."
			]),
			additional : "+60 ft darkvision",
			vision : [["Darkvision", "fixed 90"], ["Darkvision", "+60"]],
			action: [["bonus action", ""]]
		},
		"subclassfeature17": {
			name: "Deathly Shroud",
			source: ["W:SW", 4],
			minlevel: 17,
			description: desc([
				"When I hit a shrouded creature, I can choose that creature and any within 5 ft. of it",
				"Chosen creatures must make a Con save, taking 4d8 necrotic damage on a fail"
			]),
			usages: 1,
			recovery: "short rest"
		}
	}
});