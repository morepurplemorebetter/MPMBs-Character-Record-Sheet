/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds 2 subraces to the genasi race from Elemental Evil Player's Companion
				This is taken from the GM Binder website (https://www.gmbinder.com/share/-LfNVTUU2xl9IAZjPDV_)
				These subraces have been made by Azure876
	Code by:	MorePurpleMoreBetter
	Date:		2019-07-29 (sheet v13.0.0beta18)
*/

var iFileName = "Genasi - Nature, Storm [Azure876's work, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["A876:AS"] = {
	name : "Azure876: Additional Subraces",
	abbreviation : "A876:AS",
	group : "GM Binder",
	url : "https://www.gmbinder.com/share/-LfNVTUU2xl9IAZjPDV_",
	date : "2019/05/21"
};

RaceList["nature genasi"] = {
	regExpSearch : /^(?=.*(genasi|planetouched))(?=.*nature).*$/i,
	name : "Nature genasi",
	sortname : "Genasi, Nature",
	source : [["A876:AS", 0]],
	plural : "Nature genasi",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	vision : [["Darkvision", 60]],
	languageProfs : ["Common", "Primordial"],
	age : " reach adulthood in their late teens and live up to 120 years",
	height : " range from barely 5 to well over 6 feet tall (4'8\" + 2d10\")",
	weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
	heightMetric : " range from barely 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
	weightMetric : " weigh around 75 lb (50 + 5d10 \xD7 4d4 / 10 kg)",
	scores : [0, 0, 2, 0, 1, 0],
	trait : "Nature Genasi (+2 Constitution, +1 Wisdom)\n\nOne of Nature: I know the Druidcraft cantrip. At 3rd level, I can cast Entangle once per long rest. Constitution is my spellcasting ability for these spells.\n\nNature Walk: I can move across difficult terrain made of natural earth or non-magical vegetation without expending extra movement. I am proficient in the Nature skill.",
	spellcastingAbility : 3,
	spellcastingBonus : {
		name : "One of Nature (level 1)",
		spells : ["druidcraft"],
		selection : ["druidcraft"],
		firstCol : 'atwill'
	},
	features : {
		"entangle" : {
			name : "One of Nature (level 3)",
			limfeaname : "Entangle",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "One of Nature (level 3)",
				spells : ["entangle"],
				selection : ["entangle"],
				firstCol : "oncelr"
			}
		}
	},
	dmgres : ["Poison"],
	skills : ["Nature"]
};

RaceList["storm genasi"] = {
	regExpSearch : /^(?=.*(genasi|planetouched))(?=.*\bstorms?\b).*$/i,
	name : "Storm genasi",
	sortname : "Genasi, Storm",
	source : [["A876:AS", 0]],
	plural : "Storm genasi",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	vision : [["Darkvision", 60]],
	languageProfs : ["Common", "Primordial"],
	age : " reach adulthood in their late teens and live up to 120 years",
	height : " range from barely 5 to well over 6 feet tall (4'8\" + 2d10\")",
	weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
	heightMetric : " range from barely 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
	weightMetric : " weigh around 75 lb (50 + 5d10 \xD7 4d4 / 10 kg)",
	scores : [0, 0, 2, 0, 0, 1],
	trait : "Storm Genasi (+2 Constitution, +1 Charisma)\n\nRoar of the Storm:\n   I know the Shocking Grasp cantrip.\n   At 3rd level, I can cast Thunderwave once per long rest.\n   At 5th level, I can also cast Warding Wind once per long rest.\n   Constitution is my spellcasting ability for these spells.",
	spellcastingAbility : 6,
	spellcastingBonus : {
		name : "Roar of the Storm (level 1)",
		spells : ["shocking grasp"],
		selection : ["shocking grasp"],
		firstCol : 'atwill'
	},
	features : {
		"thunderwave" : {
			name : "Roar of the Storm (level 3)",
			limfeaname : "Thunderwave",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Roar of the Storm (level 3)",
				spells : ["thunderwave"],
				selection : ["thunderwave"],
				firstCol : "oncelr"
			}
		},
		"warding wind" : {
			name : "Roar of the Storm (level 5)",
			limfeaname : "Warding Wind",
			minlevel : 5,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Roar of the Storm (level 5)",
				spells : ["warding wind"],
				selection : ["warding wind"],
				firstCol : "oncelr"
			}
		}
	},
	dmgres : ["Lightning", "Thunder"]
};
