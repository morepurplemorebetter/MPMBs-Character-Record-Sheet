/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Paladin, called "Oath of the Hammer"
				This was made by Middle Finger of Vecna (Mage Hand Press) and can be found on their website (http://mfov.magehandpress.com/2016/04/hammer-of-moradin.html)
	Code by:	MorePurpleMoreBetter
	Date:		2019-01-30 (sheet v13.0.0beta16)

	Please support the creators of this content (Middle Finger of Vecna) on their Patreon (https://www.patreon.com/mfov) or through their webstore (https://store.magehandpress.com/collections/all)
*/

var iFileName = "Paladin - Hammer of Moradin [MFoV, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["MFoV:HM"] = {
	name : "Middle Finger of Vecna: Hammer of Moradin",
	abbreviation : "MFoV:HM",
	group : "Middle Finger of Vecna",
	url : "http://mfov.magehandpress.com/2016/04/hammer-of-moradin.html",
	date : "2016/04/15"
};

AddSubClass("paladin", "hammer", {
	regExpSearch : /^(?=.*hammer)(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper))))).*$/i,
	subname : "Oath of the Hammer",
	source : ["MFoV:HM", 0],
	spellcastingExtra : ["bane", "shield of faith", "spiritual weapon", "warding bond", "meld into stone", "protection from energy", "stone shape", "stoneskin", "passwall", "wall of stone"],
	features : {
		"subclassfeature3" : {
			name : "Channel Divinity: Bane",
			source : ["MFoV:HM", 0],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can imbue one weapon I'm wielding with magical energy for 1 min",
				"The weapon is magical and deals +1d8 damage against one creature type chosen by me"
			]),
			action : [["bonus action", ""]]
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Quake",
			source : ["MFoV:HM", 0],
			minlevel : 3,
			description : desc([
				"As an action, I smash a maul or warhammer I'm wielding to the ground",
				"Each creature of my choice within 20 ft must make a Strength save or be knocked prone"
			]),
			action : [["action", ""]]
		},
		"subclassfeature7" : {
			name : "Hammer Throw",
			source : ["MFoV:HM", 0],
			minlevel : 7,
			description : desc([
				"Any hammer I wield is considered magical and has the Thrown property (30/60 ft)",
				"Hammers I throw return to my hand at the end of my turn"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/hammer|maul/).test(v.WeaponName)) {
							fields.Description += (fields.Description ? '; ' : '') + 'Thrown, Returning, Magical';
							fields.Range = 'Melee, 30/60 ft';
						};
					},
					"Any hammer I wield, including light hammers, mauls, and warhammers, becomes magical and gains the Thrown property with a range of 30/60 feet."
				]
			}
		},
		"subclassfeature15" : {
			name : "Stoneguard",
			source : ["MFoV:HM", 0],
			minlevel : 15,
			description : desc([
				"As a reaction when I take nonmagical bludg./pierc./slash. damage, I can reduce it by 5"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature18" : {
			name : "Hammer Strike",
			source : ["MFoV:HM", 0],
			minlevel : 18,
			description : desc([
				"As an action, I can throw a hammer in a 60-ft line, dealing damage as a normal attack",
				"I make a single attack roll and compare it to the AC of each target, possibly hitting all"
			]),
			action : [['action', '']]
		},
		"subclassfeature20" : {
			name : "Avatar of the Stone Father",
			source : ["MFoV:HM", 0],
			minlevel : 20,
			description : desc([
				"As an action, I imbue myself with power for 1 minute and gain the following benefits:",
				" \u2022 I have resistance against all damage and I can't be moved against my will",
				" \u2022 My attacks deal an additional 1d8 damage"
			]),
			recovery : "long rest",
			usages : 1,
			action : [["action", ""]]
		}
	}
});
