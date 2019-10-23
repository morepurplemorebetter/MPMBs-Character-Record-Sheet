/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race, called "Satyr"
				This is taken from Reddit (https://redd.it/43ejab/) but the original has since been removed. It can still be found on Tumblr (https://dnd-5e-homebrew.tumblr.com/post/140993139972/satyr-race-by-berklain182)
				This subrace is made by /u/berklain182
	Code by:	MorePurpleMoreBetter
	Date:		2018-11-06 (sheet v13.0.0beta6)
*/

var iFileName = "Satyr [u_berklain182's work, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["B182:S"] = {
	name : "/u/berklain182: Satyr",
	abbreviation : "B182:S",
	group : "Reddit/r/UnearthedArcana",
	url : "https://dnd-5e-homebrew.tumblr.com/post/140993139972/satyr-race-by-berklain182",
	date : "2016/01/30"
};

RaceList["satyr"] = {
	regExpSearch : /satyr/i,
	name : "Satyr",
	source : ["B182:S", 0],
	plural : "Satyrs",
	size : 3,
	speed : {
		walk : { spd : 35, enc : 25 }
	},
	languageProfs : ["Common", "Sylvan"],
	vision : [["Darkvision", 60]],
	savetxt : {
		text : ["Magic can't put me to sleep"],
		adv_vs : ["charmed"]
	},
	toolProfs : ["Flute"],
	weaponsAdd : ["Satyr Headbutt"],
	age : " mature at the rate of humans, but live up to 500 years",
	height : " stand between 5 and 5.5 feet tall",
	weight : " weigh around 155 lb",
	heightMetric : " stand between 1,5 and 1,65 metres tall",
	weightMetric : " weigh around 70 kg",
	scores : [0, 1, 0, 0, 0, 2],
	trait : "Satyr (+1 Dexterity, +2 Charisma)\nHeadbutt: I can use my head to make an attack, dealing 1d4 damage of a type determined by my horns.\nFlute: I know the Vicious Mockery cantrip.\n   At 3rd level, I can cast Sleep once per long rest as a 2nd-level spell.\n   At 5th level, I can also cast Charm Person once per long rest.\n   Charisma is my spellcasting ability for these spells",
	spellcastingAbility : 6,
	spellcastingBonus : {
		name : "Flute (level 1)",
		spells : ["vicious mockery"],
		selection : ["vicious mockery"],
		firstCol : 'atwill'
	},
	features : {
		"sleep" : {
			name : "Flute (level 3)",
			limfeaname : "Sleep (2nd level)",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Flute (level 3)",
				spells : ["sleep"],
				selection : ["sleep"],
				firstCol : "oncelr"
			}
		},
		"charm person" : {
			name : "Flute (level 5)",
			limfeaname : "Charm Person",
			minlevel : 5,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Flute (level 5)",
				spells : ["charm person"],
				selection : ["charm person"],
				firstCol : "oncelr"
			}
		}
	}
};

WeaponsList["satyr headbutt"] = {
	regExpSearch : /^(?=.*satyr)(?=.*headbutt).*$/i,
	name : "Satyr Headbutt",
	source : ["B182:S", 0],
	ability : 1,
	type : "Natural",
	damage : [1, 4, "bludgeoning"],
	range : "Melee",
	description : "Damage type depends on type of horns",
	abilitytodamage : true
};
