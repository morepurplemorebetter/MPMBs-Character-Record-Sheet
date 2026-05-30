/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Cleric, called "Liminal Domain"
				This subclass was made by Mage Hand Press
				Source: https://magehandpress.com/2023/01/liminal-domain/
	Code by:	Transcribed by Claude from the official Mage Hand Press article
	Date:		2026-05-29 (sheet v13.x)
*/

var iFileName = "Cleric - Liminal Domain [Mage Hand Press, transcribed by Claude].js";
RequiredSheetVersion(13);

// Define the source so it shows up properly in the sheet
SourceList["MHP:LD"] = {
	name : "Mage Hand Press: Liminal Domain",
	abbreviation : "MHP:LD",
	group : "Mage Hand Press",
	url : "https://magehandpress.com/2023/01/liminal-domain/",
	date : "2023/01/01"
};

AddSubClass("cleric", "liminal domain", {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*\b(liminal|threshold|doorway|door|portal|transition)\b).*$/i,
	subname : "Liminal Domain",
	source : ["MHP:LD", 0],
	spellcastingExtra : ["alarm", "silent image", "arcane lock", "knock", "blink", "slow", "confusion", "mordenkainen's private sanctum", "dream", "passwall"],
	features : {
		"subclassfeature1" : {
			name : "Liminal Space",
			source : ["MHP:LD", 0],
			minlevel : 1,
			description : desc([
				"As a bonus action, I add or subtract space between me and a creature I see within 60 ft",
				"This lasts until the end of my turn; it doesn't move objects or provoke opportunity attacks",
				"Use it to extend a Touch spell's reach, escape reach safely, or pull a target into range"
			]),
			action : [["bonus action", ""]],
			// The article lists the base amount as 10 ft, but its own scaling table reads 5/10/15/20 ft.
			// The table is used here, as it is internally consistent (see the author's note in the comments on the page).
			additional : levels.map(function (n) {
				return (n < 5 ? 5 : n < 11 ? 10 : n < 17 ? 15 : 20) + " ft of space";
			})
		},
		"subclassfeature1.1" : {
			name : "Pseudothyrum Sense",
			source : ["MHP:LD", 0],
			minlevel : 1,
			description : desc([
				"As an action, I can focus my senses to detect if a secret door or trap is within 30 ft of me"
			]),
			action : [["action", ""]]
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Ward Portal",
			source : ["MHP:LD", 0],
			minlevel : 2,
			description : desc([
				"As an action, I ward a portal within 5 ft (or conjure a 5-ft glowing ring portal) for 10 min",
				"I can designate any number of creatures I see to be unaffected by the ward",
				"An affected creature crossing it makes a Wis save vs. my spell DC, taking 2d6 radiant per",
				"point of my proficiency bonus; fail by 5+ also prevents crossing and sets its speed to 0"
			]),
			action : [["action", ""]],
			additional : levels.map(function (n) {
				return n < 2 ? "" : "2d6 radiant per Prof. Bonus";
			})
		},
		"subclassfeature6" : {
			name : "Möbius Zone",
			source : ["MHP:LD", 0],
			minlevel : 6,
			description : desc([
				"As an action, I fold space into an enclosed region for 10 min (concentration, as a spell)",
				"The region fits within a 30-ft-radius sphere centered on a point I see within 120 ft",
				"A creature inside trying to leave makes a Cha save vs. my spell DC or is teleported to",
				"another boundary I choose; outside creatures can enter normally",
				"I regain its use on a long rest, or by expending a 3rd-level or higher spell slot"
			]),
			action : [["action", ""]],
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature8" : {
			name : "Potent Spellcasting",
			source : ["MHP:LD", 0],
			minlevel : 8,
			description : "\n   " + "I can add my Wisdom modifier to the damage I deal with my cleric cantrips",
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (classes.known.cleric && classes.known.cleric.level > 7 && v.thisWeapon[3] && v.thisWeapon[4].indexOf('cleric') !== -1 && SpellsList[v.thisWeapon[3]].level === 0) {
							output.extraDmg += What('Wis Mod');
						};
					},
					"My cleric cantrips get my Wisdom modifier added to their damage."
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (spName != "cleric" || !What("Wis Mod") || Number(What("Wis Mod")) <= 0 || spellObj.psionic || spellObj.level !== 0) return;
						if (spellKey == "shillelagh") {
							spellObj.description = spellObj.description.replace("1d8", "1d8+" + What("Wis Mod"));
							return true;
						}
						return genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Wis", true);
					},
					"My cleric cantrips get my Wisdom modifier added to their damage."
				]
			}
		},
		"subclassfeature17" : {
			name : "Time Stands Still",
			source : ["MHP:LD", 0],
			minlevel : 17,
			description : desc([
				"At the start of my turn (no action), I can stop the flow of time until the end of my turn",
				"No time passes for other creatures, but I move and take actions as normal",
				"While time is stopped I have advantage on attack rolls and saving throws,",
				"and other creatures automatically fail Strength and Dexterity saving throws"
			]),
			usages : 1,
			recovery : "short rest"
		}
	}
});
