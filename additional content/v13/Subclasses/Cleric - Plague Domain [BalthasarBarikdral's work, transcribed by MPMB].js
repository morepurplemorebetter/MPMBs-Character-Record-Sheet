/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Cleric, called "Plague Domain"
				This subclass has been made by /u/BalthasarBarikdral
				This code uses the v2 of the subclass as it was posted on 2016-08-07 here: https://redd.it/4wmedq/
	Code by:	MorePurpleMoreBetter
	Date:		2019-05-15 (sheet v13.0.0beta15)
*/

var iFileName = "Cleric - Plague Domain [BalthasarBarikdral's work, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["BB:PD"] = {
	name : "/u/BalthasarBarikdral: Plague Domain",
	abbreviation : "BB:PD",
	group : "Reddit/r/UnearthedArcana",
	url : "https://drive.google.com/open?id=0BxYY06AWBZGccDBHZU9UOGlBeWc",
	date : "2016/08/07"
};

AddSubClass("cleric", "plague domain", {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*\b(plague|disease)\b).*$/i,
	subname : "Plague Domain",
	source : ["BB:PD", 0],
	spellcastingExtra : ["fog cloud", "ray of sickness", "invisibility", "melf's acid arrow", "feign death", "stinking cloud", "blight", "giant insect", "cloudkill", "insect plague"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Cantrip",
			source : ["BB:PD", 0],
			minlevel : 1,
			description : "\n   " + "I learn the Poison Spray cantrip if I didn't already know it",
			spellcastingBonus : {
				name : "Bonus Cantrip",
				spells : ["poison spray"],
				selection : ["poison spray"]
			}
		},
		"subclassfeature1.1" : {
			name : "Plague-Touched",
			source : ["BB:PD", 0],
			minlevel : 1,
			description : desc([
				"As an action, I can touch and release toxins to a creature or into food and water",
				"The creature must make a Con save or be affected for 1 min, saving at each turn's end",
				"It takes 1d8 poison damage at the start of each of its turns until it makes a save",
				"The food becomes poisonous for 24 hours and any who consume it must make a Con save",
				"If failed, poisoned and disadv. on saves vs. my spells for 1 hour per my Wis mod (min 1)"
			]),
			usages : 1,
			recovery : "short rest",
			action : ["action", ""],
			additional : levels.map(function (n) {
				return (n < 5 ? 5 : n < 8 ? 10 : n < 11 ? 15 : n < 14 ? 20 : n < 17 ? 25 : 30) + " cu ft of food/water";
			})
		},
		"turn undead" : {
			name : "Channel Divinity: Command Undead",
			source : ["BB:PD", 0],
			minlevel : 2,
			description : desc([
				"As an action, all undead within 30 ft that can see/hear me must make a Wisdom save",
				"If an undead fails this save, it is charmed by me for 1 min or until it takes any damage",
				"This feature ignores any immunity to being charmed that the undead might posses",
				"Charmed undead regard me as friendly, won't attack me, but might attack my allies"
			]),
			action : ["action", ""],
			eval : function () { RemoveAction("action", "Channel Divinity: Turn Undead"); }
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Fetid Miasma",
			source : ["BB:PD", 0],
			minlevel : 2,
			description : desc([
				"As an action, all hostiles within 30 ft take poison damage and 1 level of exhaustion",
				"The targets can make Con save to half the poison damage and not get any exhaustion"
			]),
			action : ["action", ""],
			additional : levels.map(function (n) {
				return n < 2 ? "" : "2d10+" + n + " poison damage";
			})
		},
		"subclassfeature6" : {
			name : "Totentanz",
			source : ["BB:PD", 0],
			minlevel : 6,
			description : desc([
				"I become immune to disease, but I can still be a carrier for diseases",
				"I gain resistance to poison damage and my spells ignore resistance to poison damage"
			]),
			dmgres : ["Poison"],
			savetxt : { immune : ["disease"] }
		},
		"subclassfeature8" : {
			name : "Potent Spellcasting",
			source : ["BB:PD", 0],
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
			name : "Pox Infused Spells",
			source : ["BB:PD", 0],
			minlevel : 17,
			description : desc([
				"When I deal damage with a spell that targets a single creature, it spreads pestilence",
				"All hostile creatures with 20 ft of the spell's target must make a Constitution save",
				"On a failed save, a creature takes damage at the start of each of its turns for 1 minute",
				"It takes necrotic and poison damage, both equal to my Wisdom modifier (min 1)",
				"An affected creature can make another save to end this at the end of each turn"
			]),
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest"
		}
	}
});
