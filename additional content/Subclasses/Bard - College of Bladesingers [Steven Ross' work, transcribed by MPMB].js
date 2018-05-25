/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass & Feat
	Effect:		This script adds a subclass for the Bard, called "College of Bladesingers"
				This is taken from the DMs Guild website (https://www.dmsguild.com/product/173269/)
				This subclass is made by Mage Tower Creations: Steven M. Ross
	Code by:	MorePurpleMoreBetter
	Date:		2017-11-29 (sheet v12.999)
	
	Please support the creator of this content (Mage Tower Creations: Steven M. Ross) and download his material from the DMs Guild website: https://www.dmsguild.com/browse.php?author=Mage%20Tower%20Creations:%20Steven%20M.%20Ross
*/

var iFileName = "Bard - College of Bladesingers [Steven Ross' work, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["MTC:CB"] = {
	name : "Mage Tower Creations: College of Bladesingers",
	abbreviation : "MTC:CB",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/173269/",
	date : "2016/02/05"
};

AddSubClass("bard", "college of bladesingers", {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*blades(i|o|u)ng(ing|ers?)).*$/i,
	subname : "College of Bladesingers",
	source : ["MTC:CB", 0],
	spellcastingExtra : CreateSpellList({class : 'wizard', school : ["Abjur", "Ench", "Illus", "Trans"], level : [1,5]}), // add all the wizard spells from the Abjur, Ench, Illus, and Trans schools. These are only added to the options, not to the spells known
	features : {
		"subclassfeature3" : {
			name : "Bladesong Style",
			source : ["MTC:CB", 0],
			minlevel : 3,
			description : desc([
				"Daggers, longswords, rapiers, shortswords, and scimitars are Bladesong weapons for me",
				"With them, I can still use somatic comp. and use as spellcasting focus for my bard spells",
				"For new bard spells, I can pick from part of the wizard spell list, up to 5th-level spells",
				"I learn a wizard cantrip of my choice; These spells are considered bard spells for me"
			]),
			weapons : [false, false, ["scimitar"]],
			calcChanges : {
				atkAdd : ["if (WeaponName == 'longsword') { fields.Description += ', finesse'; fields.Mod = StrDex; } ", "I treat longswords as if they have the finesse property"]
			},
			spellcastingBonus : {
				name : "Bladesong Style",
				"class" : "wizard",
				level : [0, 0]
			}
		},
		"subclassfeature3.1" : {
			name : "Dance of Defense",
			source : ["MTC:CB", 0],
			minlevel : 3,
			description : desc([
				"I have +2 AC when not wearing heavy armor or wielding a shield",
				"This bonus goes away when I'm grappled, incapacitated, prone, or restrained",
				"If I move at least 10 ft during my turn, I get +1 AC until the start of my next turn",
				"To gain this bonus, my movement has to take me away from where I started my turn",
				"This bonus applies to any opportunity attacks suffered during the movement"
			]),
			eval : "AddACMisc(2, 'Dance of Defense', \"I have +2 AC when not wearing heavy armor or wielding a shield, and while I'm not grappled, incapacitated, prone, or restrained\", \"ACshield || tDoc.getField('Heavy Armor').isBoxChecked(0)\");",
			removeeval : "AddACMisc(0, 'Dance of Defense', \"I have +2 AC when not wearing heavy armor or wielding a shield, and while I'm not grappled, incapacitated, prone, or restrained\");"
		},
		"subclassfeature6" : {
			name : "Song of Celerity",
			source : ["MTC:CB", 0],
			minlevel : 6,
			description : "\n   " + "As a bonus action when I use my action to cast a cantrip, I can make a weapon attack",
			action : ["bonus action", " (with cantrip)"]
		},
		"subclassfeature6.1" : {
			name : "War Chanter",
			source : ["MTC:CB", 0],
			minlevel : 6,
			description : "\n   " + "My concentration on bard spells or abilities can't be broken by taking damage"
		},
		"subclassfeature14" : {
			name : "Dance of Death",
			source : ["MTC:CB", 0],
			minlevel : 14,
			description : desc([
				"As an action, I move up to my speed and attack each creature that comes into my reach",
				"I can make only a single weapon attack with a Bladesong weapon against each creature",
				"Opportunity attacks I suffer from movement during this have disadvantage",
				"When using this action, I can't also use my move during this turn"
			]),
			action : ["action", ""]
		}
	}
});
