/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Races
	Effect:		This script adds a race, Merfolk, with 4 subraces: Ocean Merfolk, River Merfolk, Deep Merfolk, and Awakened Merrow
	Code by:	Sarixis
	Date:		2016-07-05 (sheet v11.55)
*/

RaceList["ocean merfolk"] = {
	regExpSearch : /^(?=.*merfolk)(?=.*ocean|sea).*$/i,
	name : "Ocean Merfolk",
	source : ["HB", 0],
	plural : "Ocean Merfolk",
	size : 3,
	speed : ["10 ft\n40 ft swim", "5 ft\n30 ft swim"],
	languages : ["Common", "Aquan"],
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
	source : ["HB", 0],
	plural : "River Merfolk",
	size : 3,
	speed : ["10 ft\n40 ft swim", "5 ft\n30 ft swim"],
	languages : ["Common", "Aquan"],
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
	source : ["HB", 0],
	plural : "Deep Merfolk",
	size : 3,
	speed : ["10 ft\n40 ft swim", "5 ft\n30 ft swim"],
	languages : ["Common", "Aquan"],
	weaponprofs : [false, false, ["spear", "shortsword", "trident", "net"]],
	skills : ["Animal Handling", "Perception"],
	age : " reach adulthood in their late teens and live around 100 years",
	height : " range from 5 to over 6 feet tall (4'9\" + 2d10\")",
	weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
	vision : "Darkvision 60 ft",
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
	source : ["HB", 0],
	plural : "Awakened Merrow",
	size : 3,
	speed : ["10 ft\n40 ft swim", "5 ft\n30 ft swim"],
	languages : ["Common", "Aquan"],
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

UpdateDropdown("race");