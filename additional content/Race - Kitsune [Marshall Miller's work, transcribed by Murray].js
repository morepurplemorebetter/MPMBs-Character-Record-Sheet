/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race, called "Kitsune"
				This is taken from the DMs Guild website (http://www.dmsguild.com/product/171361/)
				This subclass is made by Marshall Miller
	Code by:	Murray (with amendments by MorePurpleMoreBetter)
	Date:		2016-12-14 (sheet v12.72)
	
	Please support the creator of this content (Marshall Miller) and download his material from the DMs Guild website: http://www.dmsguild.com/browse.php?author=Marshall%20Miller
*/

RaceList["kitsune"] = {
	regExpSearch : /kitsune/i,
	name : "Kitsune",
	sortname : "Kitsune",
	source : ["MM:K", 0],
	plural : "Kitsune",
	size : 3,
	speed : [30, 20],
	languages : ["Common", "Sylvan"],
	vision : "Darkvision 60 ft",
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

SourceList["MM:K"] = {
	name : "Marshall Miller: Kitsune player race",
	abbreviation : "MM:K",
	group : "Dungeon Masters Guild",
	url : "http://www.dmsguild.com/product/194789/"
};

UpdateDropdown("race");