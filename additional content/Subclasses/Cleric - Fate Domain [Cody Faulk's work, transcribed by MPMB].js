/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Cleric, called "Fate Domain"
				This is taken from the DMs Guild website (https://www.dmsguild.com/product/194789/)
				This subclass is made by Cody Faulk
	Code by:	MorePurpleMoreBetter
	Date:		2017-11-29 (sheet v12.999)
	
	Please support the creator of this content (Cody Faulk) and download his material from the DMs Guild website: https://www.dmsguild.com/browse.php?author=Cody%20Faulk
*/

var iFileName = "Cleric - Fate Domain [Cody Faulk's work, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["CF:FD"] = {
	name : "Cody Faulk: Fate Domain",
	abbreviation : "CF:FD",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/194789/",
	date : "2016/12/08"
};

AddSubClass("cleric", "fate domain", {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*fate).*$/i,
	subname : "Fate Domain",
	source : ["CF:FD", 1],
	spellcastingExtra : ["shield of faith", "shield", "augury", "nystul's magic aura", "clairvoyance", "nondetection", "divination", "death ward", "scrying", "legend lore"],
	features : {
		"subclassfeature1" : {
			name : "Glimpse",
			source : ["CF:FD", 0],
			minlevel : 1,
			description : "\n   " + "I learn the Guidance and Resistance cantrips" + "\n   " + "I can add my Wisdom modifier to initiative rolls",
			spellcastingBonus : [{
				name : "Glimpse (Guidance)",
				spells : ["guidance"],
				selection : ["guidance"],
			}, {
				name : "Glimpse (Resistance)",
				spells : ["resistance"],
				selection : ["resistance"],
			}],
			addMod : { type : "skill", field : "Init", mod : "Wis", text : "I add my Wisdom modifier to my initiative rolls." }
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Pierce the Veil",
			source : ["CF:FD", 0],
			minlevel : 2,
			description : "\n   " + "As an action, I gain adv. to all Perception, Investigation, and Insight checks for 10 min",
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Fate Foretold",
			source : ["CF:FD", 0],
			minlevel : 6,
			description : "\n   " + "After a short or long rest, I roll dice and keep results to be used before my next rest" + "\n   " + "A result can replace an attack/save/ability check made by me or a creature I can see" + "\n   " + "I choose to switch them before the dice to be replaced are rolled; Max once per turn",
			additional : ["", "", "", "", "", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 4d20, choose two", "after each rest, roll 4d20, choose two", "after each rest, roll 4d20, choose two", "after each rest, roll 4d20, choose two"]
		},
		"subclassfeature8" : {
			name : "Potent Spellcasting",
			source : ["CF:FD", 0],
			minlevel : 8,
			calcChanges : {
				atkCalc : ["if (classes.known.cleric && classes.known.cleric.level > 7 && thisWeapon[4].indexOf('cleric') !== -1 && thisWeapon[3] && SpellsList[thisWeapon[3]].level === 0) { output.extraDmg += What('Wis Mod'); }; ", "My cleric cantrips get my Wisdom modifier added to their damage."]
			}
		},
		"subclassfeature17" : {
			name : "Greater Portent",
			source : ["CF:FD", 0],
			minlevel : 17,
			description : "\n   " + "I can roll 4d20 and choose two instead of 2d20 when using my Fate Foretold feature"
		}
	}
});
