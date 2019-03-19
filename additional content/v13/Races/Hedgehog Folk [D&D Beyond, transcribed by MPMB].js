/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race, called "Hedgehog Folk"
				This is taken from the homebrew section on D&D Beyond (https://www.dndbeyond.com/characters/races/9921-hedgehog-folk)
				This race is made by Gerryv753
	Code by:	MorePurpleMoreBetter
	Date:		2018-11-21 (sheet v13.0.0beta6)

	Caution:	MorePurpleMoreBetter advises against using this race as it breaks game balance (advantage on initiative and ability checks is overpowered even if conditional).
				This code was made on commission for a patron.
*/

var iFileName = "Hedgehog Folk [D&D Beyond, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["DnD-B:HF"] = {
	name : "D&D Beyond: Hedgehog Folk",
	abbreviation : "DnD-B:HF",
	group : "D&D Beyond",
	url : "https://www.dndbeyond.com/characters/races/9921-hedgehog-folk",
	date : "2018/02/21"
};

RaceList["hedgehog folk"] = {
	regExpSearch : /^((?=.*hedgehog)(?=.*folk)|(?=.*erina)).*$/i,
	name : "Erina",
	sortname : "Hedgehog Folk (Erina)",
	source : ["DnD-B:HF", 0],
	plural : "Erinas",
	size : 4,
	speed : {
		walk : { spd : 25, enc : 15 },
		burrow : { spd : 40, enc : 30 }
	},
	languageProfs : ["Common", "Sylvan"],
	skills : ["Survival"],
	age : " reach maturity by age 2, but usually don't live past 20 years",
	height : " stand around 2 feet tall",
	weight : " have thin, lightweight bodies that weigh between 30 and 40 pounds",
	heightMetric : " stand around 60 cm tall",
	weightMetric : " have thin, lightweight bodies that weigh between 13 and 18 kg",
	scores : [1, 2, 0, 0, 0, 0],
	trait : "Erina (+1 Strength, +2 Dexterity)\n   Burrowed Villages: I have advantage on initiative and ability checks when underground\n\n   Scroungers and Gatherers: I have proficiency in survival and advantage on survival checks\n\n   Spiny Back: I have a quilled back that grants me advantage on grapple (athletics) checks"
};
