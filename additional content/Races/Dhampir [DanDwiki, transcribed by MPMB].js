/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race, called "Dhampir"
				This is taken from DanDwiki (https://www.dandwiki.com/wiki/Dhampir_(5e_Race))
				Please note that DanDwiki is renowned for having very unbalanced content
	Code by:	MorePurpleMoreBetter
	Date:		2017-09-22 (sheet v12.998)
*/

var iFileName = "Dhampir [DanDwiki, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["DanDw"] = {
	name : "D\u0026D Wiki",
	abbreviation : "D\u0026Dw",
	group : "homebrew",
	url : "https://www.dandwiki.com/wiki/"
};

RaceList["dhampir"] = {
	regExpSearch : /dhampir/i,
	name : "Dhampir",
	source : ["DanDw", 0],
	plural : "Dhampirs",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", 1],
	weapons : ["Vampire's Bite"],
	vision : [["Darkvision", 120], ["Sunlight Sensitivity", 0]],
	age : " mature at roughly the same rate as humans, but do not age further after reaching maturity, and they do not die of old age",
	height : " range from 5 to 6 feet tall (4'9\" + 2d8\")",
	weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
	heightMetric : " range from 1,5 to 1,8 metres tall (145 + 5d8 cm)",
	weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
	improvements : "Dhampir: +2 Charsima and +1 to Strength, Dexterity, or Constitution;",
	scores : [0, 0, 0, 0, 0, 2],
	trait : "Dhampir (+2 Charsima and +1 to Strength, Dexterity, or Constitution)" + (typePF ? " " : "\n") + "Sunlight Sensitivity: Disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight when I or what I am trying to attack/perceive is in direct sunlight.\nVampire's Bite: I can use my bite attack if a target is charmed/grappled by me, or if it is incapacitated or restrained. If hit, I can choose to gain the damage dealt as temp HP, my prof. bonus per long rest. Vampiric Gaze: Once per short rest, I can cast charm person without using material components. Charisma is my spellcasting ability for this.",
	abilitySave : 6,
	spellcastingAbility : 6,
	features : {
		"vampire bite" : {
			name : "Vampire's Bite (regain temp hp)",
			minlevel : 1,
			usages : "prof",
			usagescalc : "event.value = What('Proficiency Bonus');",
			recovery : "long rest"
		},
		"vampiric gaze" : {
			name : "Vampiric Gaze",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			action : ["action", ""],
			spellcastingBonus : {
				name : "Vampiric Gaze",
				spells : ["charm person"],
				selection : ["charm person"],
				oncesr : true
			}
		}
	}
};

WeaponsList["vampire bite"] = {
	regExpSearch : /^(?=.*vampir)(?=.*bite).*$/i,
	name : "Vampire's Bite",
	source : ["DanDw", 0],
	ability : 1,
	type : "Natural",
	damage : [1, 6, "necrotic"],
	range : "Melee",
	description : "Finesse; Only on charmed, grappled, incapacitated, or restrained; Can gain temp HP",
	abilitytodamage : true
};
