/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Races
	Effect:		This script adds a race, Merfolk, with 4 subraces: Ocean Merfolk, River Merfolk, Deep Merfolk, and Awakened Merrow
	Code by:	Sarixis
	Date:		2017-09-22 (sheet v12.998)
*/

var iFileName = "Merfolk, with 4 subraces [by Sarixis].js";
RequiredSheetVersion(12.999);

RaceList["ocean merfolk"] = {
	regExpSearch : /^(?=.*merfolk)(?=.*(ocean|sea)).*$/i,
	name : "Ocean Merfolk",
	sortname : "Merfolk, Ocean",
	source : ["HB", 0],
	plural : "Ocean Merfolk",
	size : 3,
	speed : {
		walk : { spd : 10, enc : 5 },
		swim : { spd : 40, enc : 30 }
	},
	languageProfs : ["Common", "Aquan"],
	weaponprofs : [false, false, ["spear", "shortsword", "trident", "net"]],
	skills : ["Perception", "Performance"],
	age : " reach adulthood in their late teens and live around 100 years",
	height : " range from 5 to over 6 feet tall (4'9\" + 2d10\")",
	weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
	improvements : "Ocean Merfolk: +2 Wisdom, +2 Charisma;",
	scores : [0, 0, 0, 0, 2, 2],
	trait : "Ocean Merfolk (+2 Wisdom, +2 Charisma) Amphibious: I can breathe air and water\nAquitect: I know the Shape Water cantrip. At 3rd level, I can cast Create or Destroy Water as a 2nd-level spell once per long rest. Wisdom is my spellcasting ability for these\nMusical Aptitude: I can use my voice as a spell focus instead of a musical instrument\nSiren Song: As an action, I can use my singing to affect a creature that can hear and understand me as the Friends spell. The target isn't immediately hostile when the effect ends but they can still be angry with me. I can use this ability once per short rest",
	spellcastingAbility : 5,
	spellcastingBonus : {
		name : "Aquitect (level 1)",
		spells : ["shape water"],
		selection : ["shape water"],
		atwill : true,
	},
	features : {
		"create or destroy water" : {
			name : "Create/Destroy Water (level 2)",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			tooltip : " (Aquitect)",
			action : ["action", ""],
			spellcastingBonus : {
				name : "Aquitect (level 3)",
				spells : ["create or destroy water"],
				selection : ["create or destroy water"],
				oncelr : true,
			},
		},
		"siren song" : {
			name : "Siren Song",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			action : ["action", ""]
		},
	}
};

RaceList["river merfolk"] = {
	regExpSearch : /^(?=.*merfolk)(?=.*river).*$/i,
	name : "River Merfolk",
	sortname : "Merfolk, River",
	source : ["HB", 0],
	plural : "River Merfolk",
	size : 3,
	speed : {
		walk : { spd : 10, enc : 5 },
		swim : { spd : 40, enc : 30 }
	},
	languageProfs : ["Common", "Aquan"],
	weaponprofs : [false, false, ["spear", "shortsword", "trident", "net"]],
	skills : ["Animal Handling", "Perception"],
	age : " reach adulthood in their late teens and live around 100 years",
	height : " range from 5 to over 6 feet tall (4'9\" + 2d10\")",
	weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
	improvements : "River Merfolk: +2 Dexterity, +2 Wisdom;",
	scores : [0, 2, 0, 0, 2, 0],
	trait : "River Merfolk (+2 Dexterity, +2 Wisdom)\nAmphibious: I can breathe air and water\nAquitect: I know the Shape Water cantrip. At 3rd level, I can cast Create or Destroy Water as a 2nd-level spell once per long rest. Wisdom is my spellcasting ability for these\nFarming Experience: I have advantage on Animal Handling checks regarding farm animals\nSwamp Camouflage: I have advantage on Dexterity (Stealth) checks made to hide in forested terrain or fresh water",
	spellcastingAbility : 5,
	spellcastingBonus : {
		name : "Aquitect (level 1)",
		spells : ["shape water"],
		selection : ["shape water"],
		atwill : true,
	},
	features : {
		"create or destroy water" : {
			name : "Create/Destroy Water (level 2)",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			tooltip : " (Aquitect)",
			action : ["action", ""],
			spellcastingBonus : {
				name : "Aquitect (level 3)",
				spells : ["create or destroy water"],
				selection : ["create or destroy water"],
				oncelr : true,
			},
		}
	}
};

RaceList["deep merfolk"] = {
	regExpSearch : /^(?=.*merfolk)(?=.*deep).*$/i,
	name : "Deep Merfolk",
	sortname : "Merfolk, Deep",
	source : ["HB", 0],
	plural : "Deep Merfolk",
	size : 3,
	speed : {
		walk : { spd : 10, enc : 5 },
		swim : { spd : 40, enc : 30 }
	},
	languageProfs : ["Common", "Aquan"],
	weaponprofs : [false, false, ["spear", "shortsword", "trident", "net"]],
	skills : ["Animal Handling", "Perception"],
	age : " reach adulthood in their late teens and live around 100 years",
	height : " range from 5 to over 6 feet tall (4'9\" + 2d10\")",
	weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
	vision : [["Darkvision", 60]],
	improvements : "Deep Merfolk: +2 Constitution, +2 Wisdom;",
	scores : [0, 0, 2, 0, 2, 0],
	trait : "Deep Merfolk (+2 Constitution, +2 Wisdom)\nAmphibious: I can breathe air and water\nAquitect: I know the Shape Water cantrip. At 3rd level, I can cast Create or Destroy Water as a 2nd-level spell once per long rest. Wisdom is my spellcasting ability for these\nBioluminescent: I emit dim light in a 5-foot radius around myself. This can be covered with opaque cloth or objects",
	spellcastingAbility : 5,
	spellcastingBonus : {
		name : "Aquitect (level 1)",
		spells : ["shape water"],
		selection : ["shape water"],
		atwill : true,
	},
	features : {
		"create or destroy water" : {
			name : "Create/Destroy Water (level 2)",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			tooltip : " (Aquitect)",
			action : ["action", ""],
			spellcastingBonus : {
				name : "Aquitect (level 3)",
				spells : ["create or destroy water"],
				selection : ["create or destroy water"],
				oncelr : true,
			},
		}
	}
};

RaceList["awakened merrow"] = {
	regExpSearch : /^(?=.*awakened)(?=.*merrow).*$/i,
	name : "Awakened Merrow",
	sortname : "Merfolk, Awakened Merrow",
	source : ["HB", 0],
	plural : "Awakened Merrow",
	size : 3,
	speed : {
		walk : { spd : 10, enc : 5 },
		swim : { spd : 40, enc : 30 }
	},
	languageProfs : ["Common", "Aquan"],
	weaponprofs : [false, false, ["spear", "shortsword", "trident", "net"]],
	skills : ["Perception", "Religion"],
	age : " reach adulthood in their late teens and live around 100 years",
	height : " range from 5 to over 6 feet tall (4'9\" + 2d10\")",
	weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
	improvements : "Awakened Merrow: +2 Strength, +2 Wisdom;",
	scores : [2, 0, 0, 0, 2, 0],
	trait : "Awakened Merrow (+2 Strength, +2 Wisdom)\nAmphibious: I can breathe air and water\nAquitect: I know the Shape Water cantrip. At 3rd level, I can cast Create or Destroy Water as a 2nd-level spell once per long rest. Wisdom is my spellcasting ability for these\nDevout: I have advantage on Intelligence (Religion) checks regarding human and oceanic deities",
	eval : "AddACMisc(1, \"Tough Scales\", \"Tough Scales was gained from being an Awakened Merrow\")",
	removeeval : "AddACMisc(0, \"Tough Scales\", \"Tough Scales was gained from being an Awakened Merrow\")",
	spellcastingAbility : 5,
	spellcastingBonus : {
		name : "Aquitect (level 1)",
		spells : ["shape water"],
		selection : ["shape water"],
		atwill : true,
	},
	features : {
		"create or destroy water" : {
			name : "Create/Destroy Water (level 2)",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			tooltip : " (Aquitect)",
			action : ["action", ""],
			spellcastingBonus : {
				name : "Aquitect (level 3)",
				spells : ["create or destroy water"],
				selection : ["create or destroy water"],
				oncelr : true,
			},
		}
	}
};
