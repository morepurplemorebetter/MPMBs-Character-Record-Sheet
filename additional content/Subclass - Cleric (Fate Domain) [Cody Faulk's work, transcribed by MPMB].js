/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Cleric, called "Fate Domain"
				This is taken from the DMs Guild website (http://www.dmsguild.com/product/194789/)
				This subclass is made by Cody Faulk
	Code by:	MorePurpleMoreBetter
	Date:		2017-03-15 (sheet v12.87)
	
	Please support the creator of this content (Cody Faulk) and download his material from the DMs Guild website: http://www.dmsguild.com/browse.php?author=Cody%20Faulk
*/

ClassSubList["fate domain"] = {
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
			eval : "if (!What(\"Init Bonus\")) {Value(\"Init Bonus\", \"Wis\")}",
			removeeval : "if (What(\"Init Bonus\") === \"Wis\") {Value(\"Init Bonus\", \"\")}"
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
			additional : ["", "", "", "", "", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 2d20, choose one", "after each rest, roll 4d20, choose two", "after each rest, roll 4d20, choose two", "after each rest, roll 4d20, choose two", "after each rest, roll 4d20, choose two"],
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
	},
};
ClassList.cleric.subclasses[1].push("fate domain");

SourceList["CF:FD"] = {
	name : "Cody Faulk: Fate Domain",
	abbreviation : "CF:FD",
	group : "Dungeon Masters Guild",
	url : "http://www.dmsguild.com/product/194789/"
};