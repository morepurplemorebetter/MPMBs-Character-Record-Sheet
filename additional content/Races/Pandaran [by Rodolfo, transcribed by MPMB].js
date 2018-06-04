/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Races
	Effect:		This script adds the five subraces of the Pandaren race
	Content:	Homebrew by Rodolfo
	Code by:	MorePurpleMoreBetter
	Date:		2018-06-04 (sheet v12.999)
	
	Caution:	MorePurpleMoreBetter advises against using these races as they breaks game balance (they are clearly overpowered). This code was made on commission for a patron.
*/

var iFileName = "Pandaren [by Rodolfo, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

RaceList["turtle spirit pandaren"] = {
	regExpSearch : /^(?=.*pandaren)(?=.*turtle).*$/i,
	name : "Turtle Spirit Pandaren",
	sortname : "Pandaren, Turtle Spirit",
	source : ["HB", 0],
	plural : "Pandaren",
	size : 3,
	speed : { walk : { spd : 30, enc : 20 }},
	languageProfs : ["Pandaren", "Kara-Tur", "Spirit Voices"],
	dmgres : ["Piercing", "Slashing"],
	savetxt : {
		text : ["Disadv. on saves vs. fire damage"],
		adv_vs : ["ingested poisons"]
	},
	skills : ["Medicine"],
	age : " reach adulthood around 80 and live over 350 years",
	height : " stand between 6 and 9 feet tall (male: 6'0\" + 3d12\"; female: 6'0\" + 2d12\")",
	weight : " weigh between 200 and 500 lbs (male: 300 + 3d12 \xD7 2d100 lb; female: 200 + 2d12 \xD7 1d100 lb)",
	improvements : "Pandaren, Servant of the Turtle Spirit: +2 Constitution, +2 Wisdom;",
	scores : [0, 0, 2, 0, 2, 0],
	trait : "Pandaren, Servant of the Turtle Spirit (+2 Constitution, +2 Wisdom)\nQuadruped: My speed is 40 ft if I walk on all fours (both hands empty). It costs 15 ft to stand up from this." + (typePF ? "\n" : " ") + "Favored Snack: I have adv. on attack & damage vs. plants.\nHerbivore: Whenever I eat meat, I have to make a DC 10 Con save or take 1d4 poison damage. Once per long rest, I can eat plants to heal 1d4 per level.\nBig Posture: When an ally within 15 ft succeeds on a Dex save that is DC 15 or higher to half the damage for a spell, it instead takes no damage of that spell.",
	eval : "SetProf('save', true, 'Con', 'Pandaren');",
	removeeval : "SetProf('save', false, 'Con', 'Pandaren');"
};

RaceList["yeti spirit pandaren"] = {
	regExpSearch : /^(?=.*pandaren)(?=.*yeti).*$/i,
	name : "Yeti Spirit Pandaren",
	sortname : "Pandaren, Yeti Spirit",
	source : ["HB", 0],
	plural : "Pandaren",
	size : 3,
	speed : { walk : { spd : 30, enc : 20 }},
	languageProfs : ["Pandaren", "Kara-Tur", "Spirit Voices"],
	dmgres : ["Piercing", "Slashing", "Cold"],
	savetxt : {
		text : ["Disadv. on saves vs. fire damage"],
		adv_vs : ["ingested poisons"]
	},
	age : " reach adulthood around 80 and live over 350 years",
	height : " stand between 6 and 9 feet tall (male: 6'0\" + 3d12\"; female: 6'0\" + 2d12\")",
	weight : " weigh between 200 and 500 lbs (male: 300 + 3d12 \xD7 2d100 lb; female: 200 + 2d12 \xD7 1d100 lb)",
	improvements : "Pandaren, Servant of the Yeti Spirit: +2 Strength, +2 Constitution;",
	scores : [2, 0, 2, 0, 0, 0],
	trait : "Pandaren, Servant of the Yeti Spirit (+2 Strength, +2 Constitution)\nQuadruped: My speed is 40 ft if I walk on all fours (both hands empty). It costs 15 ft to stand up from this." + (typePF ? "\n" : " ") + "Favored Snack: I have adv. on attack & damage vs. plants.\nHerbivore: Whenever I eat meat, I have to make a DC 10 Con save or take 1d4 poison damage. Once per long rest, I can eat plants to heal 1d4 per level.\nBig Posture: When an ally within 15 ft succeeds on a Dex save that is DC 15 or higher to half the damage for a spell, it instead takes no damage of that spell.",
	eval : "SetProf('save', true, 'Con', 'Pandaren');",
	removeeval : "SetProf('save', false, 'Con', 'Pandaren');"
};

RaceList["serpent spirit pandaren"] = {
	regExpSearch : /^(?=.*pandaren)(?=.*serpent).*$/i,
	name : "Serpent Spirit Pandaren",
	sortname : "Pandaren, Serpent Spirit",
	source : ["HB", 0],
	plural : "Pandaren",
	size : 3,
	speed : { walk : { spd : 30, enc : 20 }},
	languageProfs : ["Pandaren", "Kara-Tur", "Spirit Voices"],
	dmgres : ["Piercing", "Slashing", "Poison"],
	savetxt : {
		text : ["Disadv. on saves vs. fire damage"],
		adv_vs : ["ingested poisons"]
	},
	age : " reach adulthood around 80 and live over 350 years",
	height : " stand between 6 and 9 feet tall (male: 6'0\" + 3d12\"; female: 6'0\" + 2d12\")",
	weight : " weigh between 200 and 500 lbs (male: 300 + 3d12 \xD7 2d100 lb; female: 200 + 2d12 \xD7 1d100 lb)",
	improvements : "Pandaren, Servant of the Serpent Spirit: +2 Constitution, +2 Intelligence;",
	scores : [0, 0, 2, 2, 0, 0],
	trait : "Pandaren, Servant of the Serpent Spirit (+2 " + (typePF ? "Con, +2 Int" : "Constitution, +2 Intelligence") + ")\nQuadruped: My speed is 40 ft if I walk on all fours (both hands empty). It costs 15 ft to stand up from this." + (typePF ? "\n" : " ") + "Favored Snack: I have adv. on attack & damage vs. plants.\nHerbivore: Whenever I eat meat, I have to make a DC 10 Con save or take 1d4 poison damage. Once per long rest, I can eat plants to heal 1d4 per level.\nBig Posture: When an ally within 15 ft succeeds on a Dex save that is DC 15 or higher to half the damage for a spell, it instead takes no damage of that spell.",
	eval : "SetProf('save', true, 'Con', 'Pandaren');",
	removeeval : "SetProf('save', false, 'Con', 'Pandaren');"
};

RaceList["jaguar spirit pandaren"] = {
	regExpSearch : /^(?=.*pandaren)(?=.*jaguar).*$/i,
	name : "Jaguar Spirit Pandaren",
	sortname : "Pandaren, Jaguar Spirit",
	source : ["HB", 0],
	plural : "Pandaren",
	size : 3,
	speed : { walk : { spd : 30, enc : 20 }},
	languageProfs : ["Pandaren", "Kara-Tur", "Spirit Voices"],
	dmgres : ["Piercing", "Slashing"],
	savetxt : {
		text : ["Disadv. on saves vs. fire damage"],
		adv_vs : ["ingested poisons"]
	},
	skills : ["Acrobatics"],
	age : " reach adulthood around 80 and live over 350 years",
	height : " stand between 6 and 9 feet tall (male: 6'0\" + 3d12\"; female: 6'0\" + 2d12\")",
	weight : " weigh between 200 and 500 lbs (male: 300 + 3d12 \xD7 2d100 lb; female: 200 + 2d12 \xD7 1d100 lb)",
	improvements : "Pandaren, Servant of the Jaguar Spirit: +2 Dexterity, +2 Constitution;",
	scores : [0, 2, 2, 0, 0, 0],
	trait : "Pandaren, Servant of the Jaguar Spirit (+2 " + (typePF ? "Dex, +2 Con" : "Dexterity, +2 Constitution") + ")\nQuadruped: My speed is 40 ft if I walk on all fours (both hands empty). It costs 15 ft to stand up from this." + (typePF ? "\n" : " ") + "Favored Snack: I have adv. on attack & damage vs. plants.\nHerbivore: Whenever I eat meat, I have to make a DC 10 Con save or take 1d4 poison damage. Once per long rest, I can eat plants to heal 1d4 per level.\nBig Posture: When an ally within 15 ft succeeds on a Dex save that is DC 15 or higher to half the damage for a spell, it instead takes no damage of that spell.",
	eval : "SetProf('save', true, 'Con', 'Pandaren');",
	removeeval : "SetProf('save', false, 'Con', 'Pandaren');"
};

RaceList["fox spirit pandaren"] = {
	regExpSearch : /^(?=.*pandaren)(?=.*fox).*$/i,
	name : "Fox Spirit Pandaren",
	sortname : "Pandaren, Fox Spirit",
	source : ["HB", 0],
	plural : "Pandaren",
	size : 3,
	speed : { walk : { spd : 30, enc : 20 }},
	languageProfs : ["Pandaren", "Kara-Tur", "Spirit Voices"],
	dmgres : ["Piercing", "Slashing"],
	savetxt : {
		text : ["Disadv. on saves vs. fire damage"],
		adv_vs : ["ingested poisons"]
	},
	skills : ["Persuasion"],
	age : " reach adulthood around 80 and live over 350 years",
	height : " stand between 6 and 9 feet tall (male: 6'0\" + 3d12\"; female: 6'0\" + 2d12\")",
	weight : " weigh between 200 and 500 lbs (male: 300 + 3d12 \xD7 2d100 lb; female: 200 + 2d12 \xD7 1d100 lb)",
	improvements : "Pandaren, Servant of the Fox Spirit: +2 Constitution, +2 Charisma;",
	scores : [0, 0, 2, 0, 0, 2],
	trait : "Pandaren, Servant of the Fox Spirit (+2 Constitution, +2 Charisma)\nQuadruped: My speed is 40 ft if I walk on all fours (both hands empty). It costs 15 ft to stand up from this." + (typePF ? "\n" : " ") + "Favored Snack: I have adv. on attack & damage vs. plants.\nHerbivore: Whenever I eat meat, I have to make a DC 10 Con save or take 1d4 poison damage. Once per long rest, I can eat plants to heal 1d4 per level.\nBig Posture: When an ally within 15 ft succeeds on a Dex save that is DC 15 or higher to half the damage for a spell, it instead takes no damage of that spell.",
	eval : "SetProf('save', true, 'Con', 'Pandaren');",
	removeeval : "SetProf('save', false, 'Con', 'Pandaren');"
};
