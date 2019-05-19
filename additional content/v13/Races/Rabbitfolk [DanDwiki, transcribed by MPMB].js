/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race, called "Rabbitfolk" and its two subraces
				This is taken from DanDwiki (https://www.dandwiki.com/wiki/Rabbitfolk_(5e_Race))
				Please note that DanDwiki is renowned for having very unbalanced content and that it can be edited by anyone at any time
	Code by:	MorePurpleMoreBetter
	Date:		2018-05-19 (sheet v13.0.0beta16)
*/

var iFileName = "Rabbitfolk [DanDwiki, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["DanDw"] = {
	name : "D\u0026D Wiki",
	abbreviation : "D\u0026Dwiki",
	group : "homebrew",
	url : "https://www.dandwiki.com/wiki/"
};

RaceList["brown rabbitfolk"] = {
	regExpSearch : /^(?=.*rabbitfolk)(?=.*brown).*$/i,
	name : "Brown rabbitfolk",
	name : "Rabbitfolk, Brown",
	source : ["DanDw", 0],
	plural : "Brown rabbitfolk",
	size : 4,
	speed : {
		walk : { spd : 25, enc : 15 }
	},
	languageProfs : ["Common"],
	age : " become adults around the age of 17 and live over a century",
	height : " are around 3 feet tall (2'8\" + 2d4\")",
	weight : " weigh around 35 lb (32 + 2d4 \xD7 1 lb)",
	heightMetric : " range from 85 to 100 centimetres tall (80 + 5d4 cm)",
	weightMetric : " weigh around 16 kg (14 + 5d4 \xD7 2 / 10 kg)",
	scores : [0, 2, 0, 1, 0, 0],
	trait : "Brown Rabbitfolk (+2 Dexterity and +1 Intelligence)\nHe Can Leap About: I have adv. on checks to escape grapples and bonds." + (typePF ? " Rabbit's Agility: I can jump 15 ft vertically and 25 ft horizontally. Artisan: I gain proficiency in one type of artisan's tools.\nRabbit's Foot: As a reaction once per short rest, I can turn a critical hit on myself into a normal hit.\nSpeak with Small Beasts: Through sounds and gestures, I can communicate simple ideas with Small or smaller beasts.\nNo Ordinary Rabbit: Once per short rest, I can use a tool I'm proficient in with expertise." : "\nRabbit's Foot and Agility: As a reaction once per short rest, I can turn a critical hit on myself into a normal hit. I can jump 15 ft vertically and 25 ft horizontally.\nSpeak with Small Beasts: Through sounds and gestures, I can communicate simple ideas with Small or smaller beasts. Artisan: I gain proficiency in one type of artisan's tools.\nNo Ordinary Rabbit: Once per short rest, I can use a tool I'm proficient in with expertise."),
	extraLimitedFeatures : [{
		name : "Rabbit's Foot",
		usages : 1,
		recovery : "short rest"
	}, {
		name : "No Ordinary Rabbit",
		usages : 1,
		recovery : "short rest"
	}],
	action : [["reaction", "Rabbit's Foot"]],
	toolProfs : [["Any artisan's tool", 1]]
};

RaceList["white rabbitfolk"] = {
	regExpSearch : /^(?=.*rabbitfolk)(?=.*white).*$/i,
	name : "White rabbitfolk",
	name : "Rabbitfolk, White",
	source : ["DanDw", 0],
	plural : "White rabbitfolk",
	size : 4,
	speed : {
		walk : { spd : 25, enc : 15 }
	},
	languageProfs : ["Common"],
	age : " become adults around the age of 17 and live over a century",
	height : " are around 3 feet tall (2'8\" + 2d4\")",
	weight : " weigh around 35 lb (32 + 2d4 \xD7 1 lb)",
	heightMetric : " range from 85 to 100 centimetres tall (80 + 5d4 cm)",
	weightMetric : " weigh around 16 kg (14 + 5d4 \xD7 2 / 10 kg)",
	scores : [0, 2, 1, 0, 0, 0],
	trait : "White Rabbitfolk (+2 Dexterity and +1 Constitution)\nHe Can Leap About: I have adv. on checks to escape grapples and bonds." + (typePF ? "\nHe Can Leap About: I have adv. on checks to escape grapples/bonds\nRabbit's Foot: As a reaction once per short rest, I can turn a critical hit on myself into a normal hit.\nRabbit's Agility: I can jump 15 ft vertically and 25 ft horizontally.\nSpeak with Small Beasts: Through sounds and gestures, I can communicate simple ideas with Small or smaller beasts.\nPress Your Luck: Once per short rest when I roll a 1 on an attack roll, ability check, or saving throw, I can reroll the die and must use the new roll." : "\nRabbit's Foot: As a reaction once per short rest, I can turn a critical hit on myself into a normal hit. Rabbit's Agility: I can jump 15 ft vertically and 25 ft horizontally.\nSpeak with Small Beasts: Through sounds and gestures, I can communicate simple ideas with Small or smaller beasts. Press Your Luck: Once per short rest when I roll a 1 on an attack roll, ability check, or saving throw, I can reroll the die and must use the new roll."),
	extraLimitedFeatures : [{
		name : "Rabbit's Foot",
		usages : 1,
		recovery : "short rest"
	}, {
		name : "Press Your Luck",
		usages : 1,
		recovery : "short rest"
	}],
	action : [["reaction", "Rabbit's Foot"]]
};
