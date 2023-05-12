/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Warlock, called "The Dead King"
				This is taken from DanDwiki (https://www.dandwiki.com/wiki/The_Dead_King_(5e_Subclass)?oldid=1040469) at 2018-07-09
				Please note that DanDwiki is renowned for having very unbalanced content and that it can be edited by anyone at any time
	Code by:	MorePurpleMoreBetter
	Date:		2018-07-09 (sheet v12.999)
*/

var iFileName = "Warlock - the Dead King [DanDwiki, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["DanDw"] = {
	name : "D\u0026D Wiki",
	abbreviation : "D\u0026Dwiki",
	group : "homebrew",
	url : "https://www.dandwiki.com/wiki/"
};

AddSubClass("warlock", "the dead king", {
	regExpSearch : /^(?=.*\bdead\b)(?=.*\bking\b).*$/i,
	subname : "the Dead King",
	source : ["DanDw", 0],
	spellcastingExtra : ["inflict wounds", "ray of sickness", "blindness/deafness", "ray of enfeeblement", "animate dead", "feign death", "death ward", "evard's black tentacles", "cloudkill", "contagion"],
	features : {
		"subclassfeature1" : {
			name : "Reaping Blade",
			source : ["DanDw", 0],
			minlevel : 1,
			description : desc([
				"As a bonus action, I can imbue a melee weapon I'm holding with the power of death",
				"For the next minute, I can use my Cha mod instead of Str/Dex for that weapon",
				"Additionally, I can choose to have it deal necrotic damage instead of its normal damage",
				"Targets reduced to 0 HP with it can only be raised as undead with a high spell slot"
			]),
			action : ["bonus action", ""],
			calcChanges : {
				atkAdd : ["if (isMeleeWeapon && (/\\breaping\\b/i).test(WeaponText)) { fields.Mod = What('Cha Mod') > What(AbilityScores.abbreviations[fields.Mod - 1] + ' Mod') ? 6 : fields.Mod; fields.Damage_Type = fields.Damage_Type + '/Necrotic'; }; ", "If I include either the word 'Reaping' in a melee weapon's name, it gets treated as the weapon I imbued to use Charisma instead of Strength or Dexterity, if my Charisma modifier is higher than the ability it would otherwise use. Additionally, I can choose to have the weapon deal necrotic damage instead of its normal damage."]
			},
			additional : levels.map(function(n) {
				var halfWL = Math.max(1, Math.floor(n/2));
				return halfWL < 9 ? "spell slot level " + halfWL + " or higher to raise undead" : "can't be raised as undead";
			})
		},
		"subclassfeature6" : {
			name : "Undead Cohort",
			source : ["DanDw", 0],
			minlevel : 6,
			description : desc([
				"I gain an undead cohort, a humanoid skeleton or zombie, my choice",
				"It adds my proficiency bonus to its AC, attack rolls, and its damage rolls",
				"Its hit points maximum is equal to four times my warlock level", // 4*6 is always more than half the max HP of both a Zombie and a Skeleton...
				"Its heals all its HP on a long rest, as I can reanimate parts of it that have been damaged",
				"As a bonus action, I can command it and any other undead under my control"
			]),
			action : ["bonus action", ""],
			eval : "warlock_the_dead_king_functions.add(newClassLvl.warlock);",
			removeeval : "warlock_the_dead_king_functions.remove();",
			changeeval : "warlock_the_dead_king_functions.update(newClassLvl.warlock);"
		},
		"subclassfeature10" : {
			name : "Ghoulish Resilience",
			source : ["DanDw", 0],
			minlevel : 10,
			description : desc([
				"I gain resistance to necrotic damage and no longer need to eat, drink, or breathe",
				"I no longer take extra damage from critical hits and can reattach severed parts of myself"
			]),
			dmgres : ["Necrotic"]
		},
		"subclassfeature14" : {
			name : "Death's Embrace",
			source : ["DanDw", 0],
			minlevel : 14,
			description : desc([
				"Creatures with less than 75 HP that hit me with a melee weapon must make a Con save",
				"On a failed save, it dies and can't be resurrected or raised by any means short of a wish",
				"Undead creatures have disadvantage on this saving throw"
			]),
			usages : 1,
			recovery : "long rest"
		}
	}
});

warlock_the_dead_king_functions = {
	add : function(wlvl) {
		if (wlvl < 6) return;
		var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
		var prefix = false;
		if (AScompA) {
			for (var a = 1; a < AScompA.length; a++) {
				if (!What(AScompA[a] + 'Comp.Race')) {
					prefix = AScompA[a];
					break;
				}
			}
		}
		if (!prefix) prefix = DoTemplate('AScomp', 'Add');
		var skelZomb = AskUserOptions('Select Undead Cohort', (sheetVersion > 12.999 ? 'The Warlock (the Dead King) class feature Undead Cohort offers a choice of undead cohort. Select it here to create a companion page for it. ' : '') + 'You can change the race later, but you will have to do it on the companion page made by this feature. You will not be able to create another companion page that works for this feature, so beware not to remove this companion page!', ['Skeleton', 'Zombie'], 'radio', true);
		Value(prefix + 'Comp.Race', skelZomb);
		var theType = tDoc.getField(prefix + 'Comp.Type');
		theType.readonly = true;
		if (!typePF) theType.textSize = 0;
		theType.value = 'Undead Cohort';
		for (var a = 1; a <= 3; a++) {
			AddToModFld(prefix + 'BlueText.Comp.Use.Attack.' + a + '.To Hit Bonus', "oProf", false, "Undead Cohort", "The Undead Cohort adds the warlock's proficiency bonus (oProf) to the to hit bonus of its attacks.");
			AddToModFld(prefix + 'BlueText.Comp.Use.Attack.' + a + '.Damage Bonus', "oProf", false, "Undead Cohort", "The Undead Cohort adds the warlock's proficiency bonus (oProf) to the damage of its attacks.");
		}
		tDoc.getField(prefix + 'Comp.Use.AC').submitName = What(prefix + 'Comp.Use.AC');
		Value(prefix + 'Cnote.Left', "Undead Cohort (the Dead King 6, D\u0026Dwiki):\n\u2022 Add the warlock's proficiency bonus to AC, attack rolls, and damage rolls\n\u2022 Maximum hit points is equal to four times the warlock level\n\u2022 As a bonus action, the warlock can command the Undead Cohort as per the Animate Dead spell\n\u2022 The warlock can fully restore the Undead Cohort after a long rest, even if it as destroyed");
	},
	remove : function() {
		var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
		if (AScompA) {
			for (var a = 1; a < AScompA.length; a++) {
				if (What(AScompA[a] + 'Comp.Type') == 'Undead Cohort') {
					DoTemplate("AScomp", "Remove", AScompA[a]);
					return;
				}
			}
		}
	},
	update : function(wlvl) {
		if (wlvl < 6) return;
		var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
		var prefix = false;
		if (AScompA) {
			for (var a = 1; a < AScompA.length; a++) {
				if (What(AScompA[a] + 'Comp.Type') == 'Undead Cohort') {
					prefix = AScompA[a];
					break;
				}
			}
		}
		if (!prefix) return;
		// Update the stats
		Value(prefix + 'Comp.Use.AC', Number(How(prefix + 'Comp.Use.AC')) + Number(How('Proficiency Bonus')));
		Value(prefix + "Comp.Use.HP.Max", Math.round(wlvl * 4));
	}
}
