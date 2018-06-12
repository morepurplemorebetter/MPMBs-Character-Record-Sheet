/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race, called "Kitsune"
				This is taken from the DMs Guild website (https://www.dmsguild.com/product/171361/)
				This subclass is made by Marshall Miller
	Code by:	Murray (with amendments by MorePurpleMoreBetter)
	Date:		2017-09-22 (sheet v12.998)
	
	Please support the creator of this content (Marshall Miller) and download his material from the DMs Guild website: https://www.dmsguild.com/browse.php?author=Marshall%20Miller
*/

var iFileName = "Kitsune [Marshall Miller's work, transcribed by Murray].js";
RequiredSheetVersion(12.999);

SourceList["MM:K"] = {
	name : "Marshall Miller: Kitsune player race",
	abbreviation : "MM:K",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/171361/",
	date : "2016/01/18"
};

RaceList["kitsune"] = {
	regExpSearch : /kitsune/i,
	name : "Kitsune",
	source : ["MM:K", 0],
	plural : "Kitsune",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", "Sylvan"],
	vision : [["Darkvision", 60]],
	age : " reach adulthood around 100 years and live around 900 years",
	height : " range from 5 to 6 feet tall)",
	weight : " weigh around 135 to 175 lb.",
	improvements : "Kitsune: +1 Dexterity, +2 Charisma;",
	scores : [0, 1, 0, 0, 0, 2],
	trait : "Kitsune (+1 Dexterity, +2 Charisma)\nKitsune Magic: 1st level: Dancing Lights cantrip; 3rd level: Charm Person as a 2nd-level spell; 5th level: Invisibility, self only; Both spells can be used once per long rest without material components. Charisma is my spellcasting ability for these.\nTrue Form: As an action, I can transform to a human form or back to my true fox form.\nThis works as Wild Shape, with the exception that my HP doesn't change when shifting and I may speak as normal and use Kitsune Magic while in fox form.",
	abilitySave : 6,
	spellcastingAbility : 6,
	spellcastingBonus : {
		name : "Kitsune Magic 1",
		spells : ["dancing lights"],
		selection : ["dancing lights"]
	},
	features : {
		"true form" : {
			name : "True Form",
			minlevel : 1,
			action : ["action", ""]
		},
		"charm person" : {
			name : "Charm Person (level 2)",
			minlevel : 3,
			tooltip : " (Kitsune Magic)",
			action : ["action", ""],
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Kitsune Magic 3",
				spells : ["charm person"],
				selection : ["charm person"],
				oncelr : true
			}
		},
		"invisibility" : {
			name : "Invisibility",
			minlevel : 5,
			tooltip : " (Kitsune Magic)",
			action : ["action", ""],
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Kitsune Magic 5",
				spells : ["invisibility"],
				selection : ["invisibility"],
				oncelr : true
			}
		}
	}
};
