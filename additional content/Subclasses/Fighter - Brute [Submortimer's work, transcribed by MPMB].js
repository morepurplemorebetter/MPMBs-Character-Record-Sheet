/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass & Feat
	Effect:		This script adds a subclass for the fighter, called "Brute"
				And a feat, called "Combat Brute"
				These are taken from the Giant in the Playground forums (http://www.giantitp.com/forums/showthread.php?426879) and is the version posted at 10th of July 2015
				This subclass is made by Submortimer
	Code by:	MorePurpleMoreBetter
	Date:		2018-01-02 (sheet v12.999)
*/

var iFileName = "Fighter - Brute [Submortimer's work, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["S:Brute"] = {
	name : "Submortimer - Fighter Martial Archetype: Brute",
	abbreviation : "S:Brute",
	group : "Giant in the Playground forums",
	url : "http://www.giantitp.com/forums/showthread.php?426879",
	date : "2015/07/10"
};

var theCoD = AddSubClass("fighter", "brute-giantitp", {
	regExpSearch : /brute/i,
	subname : "Brute",
	source : ["S:Brute", 0],
	fullname : "Brute",
	features : {
		"subclassfeature3" : {
			name : "Heavy Metal",
			source : ["S:Brute", 0],
			minlevel : 3,
			description : "\n   " + "I can do additional damage with weapons that have the heavy property",
			additional : levels.map(function (n) { 
				return n < 3 ? "" : "+1d" + (n < 10 ? 4 : n < 18 ? 6 : 8) + " damage";
			}),
			calcChanges : {
				atkAdd : ["if (classes.known.fighter && classes.known.fighter.level > 2 && (/heavy/i).test(fields.Description)) {fields.Description += (fields.Description ? '; ' : '') + '+1d' + (classes.known.fighter.level < 10 ? 4 : classes.known.fighter.level < 18 ? 6 : 8) + ' damage'}; ", "I do +1d4 damage with weapons that have the heavy property. This increases to 1d6 at 10th level and 1d8 at 18th level."]
			}
		},
		"subclassfeature7" : {
			name : "Beast of Burden",
			source : ["S:Brute", 0],
			minlevel : 7,
			description : "\n   " + "Advantage on Strength checks to push/pull/lift/break; Carrying capacity is doubled",
			eval : "tDoc.getField('Carrying Capacity Multiplier').value *= 2;",
			removeeval : "tDoc.getField('Carrying Capacity Multiplier').value /= 2;"
		},
		"subclassfeature10" : {
			name : "Hulking Hurler",
			source : ["S:Brute", 0],
			minlevel : 10,
			description : desc([
				"I can throw weapons with the heavy property with a range of 20/60 ft",
				"I add my proficiency bonus to thrown large improvised weapons to a range of 20/60 ft"
			]),
			calcChanges : {
				atkAdd : ["if (isMeleeWeapon && (/heavy/i).test(fields.Description) && !(/thrown/i).test(fields.Description)) {fields.Range = 'Melee, 20/60 ft'; fields.Description += (fields.Description ? '; ' : '') + 'Thrown';}; if ((/improvised/i).test(WeaponName) || (theWea && (/improvised weapons/i).test(theWea.type))) {fields.Proficiency = true; };" , "I can throw weapons with the heavy property with a range of 20/60 ft.\n - I add my proficiency bonus to throwing large improvised weapons."]
			}
		},
		"subclassfeature15" : {
			name : "Musclebound Enforcer",
			source : ["S:Brute", 0],
			minlevel : 15,
			description : "\n   " + "I can add my Strength modifier to my Charisma (Intimidate) checks",
			addMod : { type : "skill", field : "Inti", mod : "Str", text : "I add my Strength modifier to Charisma (Intimidate) checks." }
		},
		"subclassfeature18" : {
			name : "Awesome Blow",
			source : ["S:Brute", 0],
			minlevel : 18,
			description : desc([
				"I can shove creatures when I hit them with a weapon that has the heavy property",
				"The target moves 5 ft for every 5 points of damage the attack does"
			]),
			calcChanges : {
				atkAdd : ["if ((/heavy/i).test(fields.Description)) {fields.Description += (fields.Description ? '; ' : '') + 'Shove 5 ft/5 damage';}; ", "I can throw weapons with the heavy property with a range of 20/60 ft.\n - I add my proficiency bonus to throwing large improvised weapons."]
			}
		}
	}
});

FeatsList["combat brute"] = {
	name : "Combat Brute",
	source : ["S:Brute", 0],
	description : "After shoving a target, I gain adv. on my next attack against it. When taking the Attack action with a heavy melee weapon, I can forgo any number of extra attacks to add two weapon damage dice per forgone attack to the damage rolls of the remaining attacks.",
	improvements : "Combat Brute (feat): +1 Strength;",
	scores : [1, 0, 0, 0, 0, 0],
	prerequisite : "Extra attack class feature",
	prereqeval : "classes.attacks > 1"
};
