/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Spells
	Effect:     This script adds one spell "Leoven's Icy Grip"

				This spell is a homebrew creation on D&D Beyond by the user Huruk,
				it can be found here:
				https://www.dndbeyond.com/spells/1409671-leovens-icy-grip

	Code by:	MorePurpleMoreBetter
	Date:		2022-04-26 (sheet v13.1.0)
*/
var iFileName = "Leoven's Icy Grip [Huruk's work, transcribed by MPMB].js";
RequiredSheetVersion(13.1);

// The source (EN5ider 108)
SourceList["HB:DnDB"] = {
	name : "Homebrew on D&D Beyond",
	abbreviation : "HB:DnDB",
	abbreviationSpellsheet : "HB",
	group : "D&D Beyond",
	url : "https://www.dndbeyond.com/homebrew"
};

// Add the spells
SpellsList["leoven's icy grip"] = {
	name : "Leoven's Icy Grip",
	nameAlt : "Icy Grip",
	classes : ["druid", "sorcerer", "wizard"],
	source : [["HB:DnDB", 0]],
	level : 2,
	school : "Conj",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A preserved snow flake",
	duration : "1 min",
	save : "Dex",
	description : "All in (15+5/SL)-ft cube save (flying adv.) or 2d4 Cold dmg \u0026 grappled; 1 a escape: Str check vs. DC",
	descriptionMetric : "All in (5+1,5/SL)-m cube save (flying adv.) or 2d4 Cold dmg \u0026 grappled; 1 a escape: Str check vs. DC",
	descriptionShorter : "All in (15+5/SL)-ft cube save (flying adv.) or 2d4 Cold dmg \u0026 grappled; escape: Str chk vs. DC",
	descriptionShorterMetric : "All in (5+1,5/SL)-m cube save (flying adv.) or 2d4 Cold dmg \u0026 grappled; escape: Str chk vs. DC",
	descriptionFull : "Chains of ice appear from the ground within a 15-foot cube centered on a point you choose within range."+
	"\n   Creatures in the area must succeed on a Dexterity saving throw or take 2d4 cold damage and become grappled by the chains until the spell ends. Airborne creatures have advantage on the save."+
	"\n   A grappled creature can use it's action to make a Strength check against your spell save DC. On a success, it frees itself."+
	AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, the area increases by 5 feet each slot level above 2nd.",
	dynamicDamageBonus : {
		multipleDmgMoments : false
	}
};
