/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds a class, called "Furycrafter" and its 2 subclasses
				This subrace has been made by /u/Cryyl over on /r/UnearthedArcana on Reddit (https://www.reddit.com/45a74m/)
				
	Code by:	MorePurpleMoreBetter
	Date:		2019-05-20 (sheet v13.0.0beta16)

	Note that the original document doesn't give any rules for multiclassing.
	The multiclassing settings used below are an interpretation by MPMB.

	Because of this class' strange system of gaining spells,
	the sheet will not prompt you to update the spell sheet when new spells become available.
*/

var iFileName = "Furycrafter [Cryyl's work, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["Cryyl:F"] = {
	name: "/u/Cryyl: Furycrafter",
	abbreviation: "Cryyl:F",
	group: "Reddit/r/UnearthedArcana",
	url: "https://drive.google.com/file/d/0Bwg2aP_GFKBIUEl5dG1ia2VQdlU/view",
	date : "2016/02/12"
};

ClassList["furycrafter"] = {
	regExpSearch : /furycrafter/i,
	name : "Furycrafter",
	source : ["Cryyl:F", 0],
	primaryAbility : "Wisdom, Strength or Dexterity",
	abilitySave : 5,
	prereqs : "Wisdom 13 and Strength or Dexterity 13",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 10,
	saves : ["Wis", "Cha"],
	skillstxt : {
		primary : "Choose two from Athletics, Insight, Intimidation, Medicine, Nature, Perception, Persuasion, and Religion"
	},
	armorProfs : {
		primary : [true, true, false, false],
		secondary : [true, true, false, false]
	},
	weaponProfs : {
		primary : [true, true],
		secondary : [true, true]
	},
	equipment : "Furycrafter starting equipment:" +
		"\n \u2022 A martial weapon -or- two simple weapons;" +
		"\n \u2022 Scale mail -or- leather armor;" +
		"\n \u2022 A longbow and 20 arrows -or- two hand axes;" +
		"\n \u2022 An explorer's pack -or- a scholar's pack;" +
		"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Furycraft Archetype", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	spellcastingFactor : 2,
	spellcastingKnown : {
		spells : 0
	},
	features : {
		"fighting style" : {
			name : "Fighting Style",
			source : ["Cryyl:F", 3],
			minlevel : 1,
			description : "\n   " + "Choose a Fighting Style for the furycrafter using the \"Choose Feature\" button above",
			choices : ["Archery", "Defense", "Dueling", "Great Weapon Fighting", "Protection"],
			"archery" : FightingStyles.archery,
			"defense" : FightingStyles.defense,
			"dueling" : FightingStyles.dueling,
			"great weapon fighting" : FightingStyles.great_weapon,
			"protection" : FightingStyles.protection
		},
		"furycraft" : {
			name : "Furycraft",
			source : ["Cryyl:F", 2],
			minlevel : 1,
			description : "\n   Use the \"Choose Features\" button above to select the furycraft element",
			choices : ["Earth", "Fire", "Metal", "Water", "Wind", "Wood"],
			"earth" : {
				name : "Earth Furycrafter",
				description : "\n   I use earth fury spells; I must use melee weapons for abilities, which deal force damage",
				spellcastingExtra : ["mold earth", "earth tremor", "animal friendship", "maximilian's earthen grasp", "pass without trace", "erupting earth", "wall of sand", "stoneskin", "stone shape", "transmute rock", "wall of stone"].concat(new Array(89)).concat("AddToKnown")
			},
			"fire" : {
				name : "Fire Furycrafter",
				description : "\n   I use fire fury spells; I can use all weapons for my abilities, which deal fire damage",
				spellcastingExtra : ["produce flame", "burning hands", "charm person", "suggestion", "scorching ray", "melf's minute meteors", "fireball", "wall of fire", "fire shield", "flame strike", "immolation"].concat(new Array(89)).concat("AddToKnown")
			},
			"metal" : {
				name : "Metal Furycrafter",
				description : "\n   I use metal fury spells; I must use melee weapons for abilities, which deal extra damage",
				spellcastingExtra : ["true strike", "compelled duel", "wrathful smite", "magic weapon", "blur", "protection from energy", "conjure barrage", "staggering smite", "stoneskin", "banishing smite", "destructive wave"].concat(new Array(89)).concat("AddToKnown")
			},
			"water" : {
				name : "Water Furycrafter",
				description : "\n   I use water fury spells; I can use all weapons for my abilities, which deal cold damage",
				spellcastingExtra : ["shape water", "cure wounds", "create or destroy water", "snilloc's snowball swarm", "alter self", "tidal wave", "revivify", "control water", "ice storm", "maelstrom", "mass cure wounds"].concat(new Array(89)).concat("AddToKnown")
			},
			"wind" : {
				name : "Wind Furycrafter",
				description : "\n   I use wind fury spells; I can use all weapons for my abilities, which deal thunder damage",
				spellcastingExtra : ["gust", "catapult", "expeditious retreat", "invisibility", "levitate", "call lightning", "fly", "greater invisibility", "storm sphere", "control winds", "telekinesis"].concat(new Array(89)).concat("AddToKnown")
			},
			"wood" : {
				name : "Wood Furycrafter",
				description : "\n   I use wood fury spells; I must use ranged weapons for abilities, dealing piercing damage",
				spellcastingExtra : ["druidcraft", "entangle", "goodberry", "pass without trace", "spike growth", "plant growth", "speak with plants", "grasping vine", "hallucinatory terrain", "conjure volley", "swift quiver"].concat(new Array(89)).concat("AddToKnown")
			},
			choiceDependencies : [{
				feature : "fury-enhanced strike"
			}, {
				feature : "improved fury-enhanced strike"
			}]
		},
		"spellcasting" : {
			name : "Spellcasting",
			source : ["Cryyl:F", 4],
			minlevel : 2,
			description : "\n   " + "I can cast my furycraft element spells, using Wisdom as my spellcasting ability"
		},
		"fury-enhanced strike" : {
			name : "Fury-Enhanced Strike",
			source : ["Cryyl:F", 4],
			minlevel : 2,
			description : "\n   Use the \"Choose Features\" button above to select the furycraft element",
			choices : ["earth", "fire", "metal", "water", "wind", "wood"],
			choicesNotInMenu : true,
			"earth" : {
				name : "Earth Fury-Enhanced Strike",
				description : desc([
					"When I hit a melee weapon attack, I can expend a spell slot to do +2d8 force damage",
					"This extra damage increases by +1d8 for each spell slot level above 1st (max +5d8)"
				])
			},
			"fire" : {
				name : "Fire Fury-Enhanced Strike",
				description : desc([
					"When I hit a weapon attack, I can expend a spell slot to do +2d8 fire damage",
					"This extra damage increases by +1d8 for each spell slot level above 1st (max +5d8)"
				])
			},
			"metal" : {
				name : "Metal Fury-Enhanced Strike",
				description : desc([
					"When I hit a melee weapon attack, I can expend a spell slot to deal +2d8 extra damage",
					"This extra damage increases by +1d8 for each spell slot level above 1st (max +5d8)"
				])
			},
			"water" : {
				name : "Water Fury-Enhanced Strike",
				description : desc([
					"When I hit a weapon attack, I can expend a spell slot to do +2d8 cold damage",
					"This extra damage increases by +1d8 for each spell slot level above 1st (max +5d8)"
				])
			},
			"wind" : {
				name : "Wind Fury-Enhanced Strike",
				description : desc([
					"When I hit a weapon attack, I can expend a spell slot to do +2d8 thunder damage",
					"This extra damage increases by +1d8 for each spell slot level above 1st (max +5d8)"
				])
			},
			"wood" : {
				name : "Wood Fury-Enhanced Strike",
				description : desc([
					"When I hit a ranged weapon attack, I can use a spell slot to do +2d8 piercing damage",
					"This extra damage increases by +1d8 for each spell slot level above 1st (max +5d8)"
				])
			}
		},
		"subclassfeature3" : {
			name : "Furycraft Archetype",
			source : ["Cryyl:F", 4],
			minlevel : 3,
			description : "\n   Choose a Furycraft Archetype that defines my connection to my fury\n   Choose either Manifestation or Innate Force"
		},
		"improved fury-enhanced strike" : {
			name : "Improved Fury-Enhanced Strike",
			source : ["Cryyl:F", 4],
			minlevel : 11,
			description : "\n   Use the \"Choose Features\" button above to select the furycraft element",
			choices : ["earth", "fire", "metal", "water", "wind", "wood"],
			choicesNotInMenu : true,
			"earth" : {
				name : "Improved Earth Fury-Enhanced Strike",
				description : "\n   Whenever I hit a creature with a melee weapon, I deal an extra +1d8 force damage",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isMeleeWeapon) fields.Description += (fields.Description ? '; ' : '') + '+1d8' + (classes.known.furycrafter.subclass.indexOf("innate force") != -1 ? "(+Wis mod)" : "") + ' force damage';
						},
						"With my melee weapon attacks I deal an extra 1d8 force damage."
					]
				}
			},
			"fire" : {
				name : "Improved Fire Fury-Enhanced Strike",
				description : "\n   Whenever I hit a creature with a weapon attack, I deal an extra +1d8 fire damage",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (!v.isSpell) fields.Description += (fields.Description ? '; ' : '') + '+1d8 fire' + (classes.known.furycrafter.subclass.indexOf("innate force") != -1 ? "(+Wis mod)" : "") + ' damage';
						},
						"With my weapon attacks I deal an extra 1d8 fire damage."
					]
				}
			},
			"metal" : {
				name : "Improved Metal Fury-Enhanced Strike",
				description : "\n   Whenever I hit a creature with a melee weapon attack, I deal an extra +1d8 damage",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isMeleeWeapon) fields.Description += (fields.Description ? '; ' : '') + '+1d8' + (classes.known.furycrafter.subclass.indexOf("innate force") != -1 ? "(+Wis mod)" : "") + ' damage';
						},
						"With my melee weapon attacks I deal an extra 1d8 damage."
					]
				}
			},
			"water" : {
				name : "Improved Water Fury-Enhanced Strike",
				description : "\n   Whenever I hit a creature with a weapon attack, I deal an extra +1d8 cold damage",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (!v.isSpell) fields.Description += (fields.Description ? '; ' : '') + '+1d8' + (classes.known.furycrafter.subclass.indexOf("innate force") != -1 ? "(+Wis mod)" : "") + ' cold damage';
						},
						"With my weapon attacks I deal an extra 1d8 cold damage."
					]
				}
			},
			"wind" : {
				name : "Improved Wind Fury-Enhanced Strike",
				description : "\n   Whenever I hit a creature with a weapon attack, I deal an extra +1d8 thunder damage",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (!v.isSpell) fields.Description += (fields.Description ? '; ' : '') + '+1d8' + (classes.known.furycrafter.subclass.indexOf("innate force") != -1 ? "(+Wis mod)" : "") + ' thunder damage';
						},
						"With my weapon attacks I deal an extra 1d8 thunder damage."
					]
				}
			},
			"wood" : {
				name : "Improved Wood Fury-Enhanced Strike",
				description : "\n   Whenever I hit a creature with a ranged weapon, I deal an extra +1d8 piercing damage",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isRangedWeapon) fields.Description += (fields.Description ? '; ' : '') + '+1d8' + (classes.known.furycrafter.subclass.indexOf("innate force") != -1 ? "(+Wis mod)" : "") + ' piercing damage';
						},
						"With my ranged weapon attacks I deal an extra 1d8 piercing damage."
					]
				}
			}
		},
		"call feral furies" : {
			name : "Call Feral Furies",
			source : ["Cryyl:F", 4],
			minlevel : 14,
			description : desc([
				"I can call forth roaming furies from within 1 mile to fight on my behalf",
				"The DM determines which of the following options answers my call:",
				" \u2022 1 elemental of CR 2 or lower        \u2022  2 elementals of CR 1 or lower",
				" \u2022 4 elementals of CR 1/2 or lower    \u2022  8 elementals of CR 1/4 or lower",
				"These elementals are friendly to me and my allies, and will attack those hostile to me",
				"They act on their own (group) initiative and remain for 1 hour",
				"Once I use this feature, I can't use it again in the same general area"
			]),
			usages : 1,
			recovery : "24 h"
		},
		"fury-enhanced bonding" : {
			name : "Fury-Enhanced Bonding",
			source : ["Cryyl:F", 5],
			minlevel : 20,
			description : desc([
				"As a bonus action, I can enchant the weapons of up to four willing creatures",
				"They gain the benefit of my fury-enhanced strike on their next attack"
			]),
			action : [["bonus action", ""]],
			usages : 1,
			recovery : "long rest"
		}
	}
}

AddSubClass("furycrafter", "manifestation", {
	regExpSearch : /^(?=.*furycrafter)(?=.*manifestation).*$/i,
	subname : "Manifestation",
	source : ["Cryyl:F", 5],
	features : {
		"subclassfeature3" : {
			name : "Fury Companion",
			source : ["Cryyl:F", 5],
			minlevel : 3,
			description : desc([
				"My companion uses the stats of a beast but has the elemental type",
				"It adds my proficiency bonus to AC, attacks, damage, and save/skill proficiencies",
				"Its hit point maximum equals four times my furycrafter level if more than its normal HP",
				"It takes a turn on my initiative; It doesn't take an action unless I command it to",
				"As an action, I can command it take the Attack, Dash, Disengage, Dodge, or Help action",
				"I can still use Extra Attack while commanding it to Attack; No action to order to move",
				"If it dies, I can recall it by speding 8 hours magically reforming its essence"
			]),
			additional : "1/4 CR up to medium sized beast",
			action : [["action", "Command Companion"]],
			eval : function () {
				// Create a list of all Medium CR 1/4 or smaller/lower beasts
				var cOpt = [];
				for (var aCrea in CreatureList) {
					var theCrea = CreatureList[aCrea];
					if (testSource(aCrea, theCrea, "creaExcl")) continue; // test if the creature or its source isn't excluded
					if (theCrea.type === "Beast" && theCrea.size >= 3 && eval(theCrea.challengeRating) <= 1/4) {
						cOpt.push(theCrea.name);
					}
				}
				cOpt.names.sort();
				var selBeast = AskUserOptions('Select Undead Cohort', 'The Fury Companion class offers a choice of companion, any beast of Medium or smaller with a Challenge Rating of 1/4 or lower. Select it here to create a companion page for it. You can change the race later, but you will have to manually add the bonus to skill and save proficiencies and do it on the companion page made by this feature. You will not be able to create another companion page that works for this feature, so beware not to remove this companion page!', cOpt, 'radio', true);
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
				Value(prefix + 'Comp.Race', selBeast);
				var theType = tDoc.getField(prefix + 'Comp.Type');
				theType.readonly = true;
				if (!typePF) theType.textSize = 0;
				theType.value = 'Fury';
				for (var a = 1; a <= 3; a++) {
					AddToModFld(prefix + 'BlueText.Comp.Use.Attack.' + a + '.To Hit Bonus', "oProf", false, "Fury Companion", "The Fury Companion adds the furycrafter's proficiency bonus (oProf) to the to hit bonus of its attacks.");
					AddToModFld(prefix + 'BlueText.Comp.Use.Attack.' + a + '.Damage Bonus', "oProf", false, "Fury Companion", "The Fury Companion adds the furycrafter's proficiency bonus (oProf) to the damage of its attacks.");
				}
				tDoc.getField(prefix + 'Comp.Use.AC').submitName = What(prefix + 'Comp.Use.AC');
				Value(prefix + 'Cnote.Left', "Undead Cohort (the Dead King 6, D\u0026Dwiki):\n\u2022 Add the furycrafter's proficiency bonus to AC, attack rolls, damage rolls, saving throw proficiencies, and skill proficiencies\n\u2022 Maximum hit points is equal to four times the furycrafter level\n\u2022 As an action, the furycrafter can command the companion to take the Attack, Dash, Disengage, Dodge, or Help action on its turn");
				for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
					var abi = AbilityScores.abbreviations[i];
					if (tDoc.getField(prefix + "Comp.Use.Ability." + abi + ".ST.Prof").isBoxChecked(0)) Value(prefix + "BlueText.Comp.Use.Ability." + abi + ".ST.Bonus", "oProf");
				}
				for (var i = 0; i < SkillsList.abbreviations.length - 2; i++) {
					var skill = SkillsList.abbreviations[i];
					if ((typePF && tDoc.getField(prefix + "Comp.Use.Skills." + skill + ".Prof").isBoxChecked(0)) || (!typePF && What(prefix + "Text.Comp.Use.Skills." + skill + ".Prof") !== "nothing")) {
						AddToModFld(prefix + "BlueText.Comp.Use.Skills." + skill + ".Bonus", "oProf");
					}
				}
				tDoc.getField(prefix + 'Comp.Use.AC').submitName = What(prefix + 'Comp.Use.AC');
			},
			removeeval : function () {
				var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
				if (!AScompA) return;
				compName = compName.toLowerCase();
				for (var a = 1; a < AScompA.length; a++) {
					var theType = tDoc.getField(prefix + 'Comp.Type');
					if (theType.readonly && theType.value == "Fury") {
						DoTemplate("AScomp", "Remove", AScompA[a], true);
					}
				}
			},
			changeeval : function () {
				var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
				var prefixes = [];
				if (!AScompA) return prefixes;
				for (var a = 1; a < AScompA.length; a++) {
					var theType = tDoc.getField(prefix + 'Comp.Type');
					if (theType.readonly && theType.value == "Fury") {
						Value(prefix + 'Comp.Use.AC', Number(How(prefix + 'Comp.Use.AC')) + Number(How('Proficiency Bonus')));
						Value(prefix + "Comp.Use.HP.Max", Math.round(classes.known.furycrafter.level * 4));
					}
				}
			}
		},
		"subclassfeature7" : {
			name : "Fury-ous Charge",
			source : ["Cryyl:F", 5],
			minlevel : 7,
			description : desc([
				"As a bonus action, I can apply my fury-enhanced strike on one attack of my companion",
				"I can only do this on a turn that I commanded my companion to take the Attack action"
			]),
			action : [["bonus action", ""]]
		},
		"subclassfeature11" : {
			name : "Unleashed Fury",
			source : ["Cryyl:F", 5],
			minlevel : 11,
			description : "\n   When I command my companion to do the Attack action, it can attack twice on its turn"
		},
		"subclassfeature15" : {
			name : "Rapid Fury",
			source : ["Cryyl:F", 5],
			minlevel : 15,
			description : desc([
				"After I use my action to cast a spell on a creature or space, I can teleport my companion",
				"My companion then appears in the targeted location or an adjacent unoccupied area"
			])
		}
	}
});


AddSubClass("furycrafter", "innate force", {
	regExpSearch : /^(?=.*furycrafter)(?=.*innate)(?=.*force).*$/i,
	subname : "Innate Force",
	source : ["Cryyl:F", 5],
	features : {
		"subclassfeature3" : {
			name : "Raw Force",
			source : ["Cryyl:F", 5],
			minlevel : 3,
			description : desc([
				"I add my Wisdom modifier to the damage of my fury-enhanced strikes",
				"Once per round, I can add my Wis mod to my improved fury-enhanced strikes as well"
			])
		},
		"subclassfeature7" : {
			name : "Imbued Strikes",
			source : ["Cryyl:F", 6],
			minlevel : 7,
			description : "\n   My weapon attacks count as magical for overcoming resistances and immunities",
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && !v.thisWeapon[1] && !v.theWea.isMagicWeapon && !(/counts as( a)? magical/i).test(fields.Description)) {
							fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical';
						};
					},
					"My weapon attacks count as magical for overcoming resistances and immunities."
				]
			}
		},
		"subclassfeature11" : {
			name : "Alternate Craft",
			source : ["Cryyl:F", 6],
			minlevel : 11,
			description : "\n   Use the \"Choose Features\" button above to select a secondary furycraft element",
			choices : ["Earth", "Fire", "Metal", "Water", "Wind", "Wood"],
			"earth" : {
				name : "Alternate Earth Craft",
				description : desc([
					"I can use earth fury spells of my furycrafter level minus 6",
					"I can also have my (improved) fury-enhanced strikes deal force damage instead"
				]),
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "furycraft", false) !== "earth";
				},
				spellcastingBonus : {
					name : "Alternate Craft",
					spells : ["mold earth", "earth tremor", "animal friendship", "maximilian's earthen grasp", "pass without trace", "erupting earth", "wall of sand", "stoneskin", "stone shape"],
					selection : ["mold earth", "earth tremor", "animal friendship", "maximilian's earthen grasp", "pass without trace", "erupting earth", "wall of sand", "stoneskin", "stone shape"],
					times : levels.map(function (n) {
						return n < 15 ? 5 : n < 18 ? 7 : 9;
					})
				}
			},
			"fire" : {
				name : "Alternate Fire Craft",
				description : desc([
					"I can use fire fury spells of my furycrafter level minus 6",
					"I can also have my (improved) fury-enhanced strikes deal fire damage instead"
				]),
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "furycraft", false) !== "fire";
				},
				spellcastingBonus : {
					name : "Alternate Craft",
					spells : ["produce flame", "burning hands", "charm person", "suggestion", "scorching ray", "melf's minute meteors", "fireball", "wall of fire", "fire shield"],
					selection : ["produce flame", "burning hands", "charm person", "suggestion", "scorching ray", "melf's minute meteors", "fireball", "wall of fire", "fire shield"],
					times : levels.map(function (n) {
						return n < 15 ? 5 : n < 18 ? 7 : 9;
					})
				}
			},
			"metal" : {
				name : "Alternate Metal Craft",
				description : desc([
					"I can use metal fury spells of my furycrafter level minus 6",
					"I can also have my (improved) fury-enhanced strikes deal the weapon's damage instead"
				]),
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "furycraft", false) !== "metal";
				},
				spellcastingBonus : {
					name : "Alternate Craft",
					spells : ["true strike", "compelled duel", "wrathful smite", "magic weapon", "blur", "protection from energy", "conjure barrage", "staggering smite", "stoneskin"],
					selection : ["true strike", "compelled duel", "wrathful smite", "magic weapon", "blur", "protection from energy", "conjure barrage", "staggering smite", "stoneskin"],
					times : levels.map(function (n) {
						return n < 15 ? 5 : n < 18 ? 7 : 9;
					})
				}
			},
			"water" : {
				name : "Alternate Water Craft",
				description : desc([
					"I can use water fury spells of my furycrafter level minus 6",
					"I can also have my (improved) fury-enhanced strikes deal cold damage instead"
				]),
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "furycraft", false) !== "water";
				},
				spellcastingBonus : {
					name : "Alternate Craft",
					spells : ["shape water", "cure wounds", "create or destroy water", "snilloc's snowball swarm", "alter self", "tidal wave", "revivify", "control water", "ice storm"],
					selection : ["shape water", "cure wounds", "create or destroy water", "snilloc's snowball swarm", "alter self", "tidal wave", "revivify", "control water", "ice storm"],
					times : levels.map(function (n) {
						return n < 15 ? 5 : n < 18 ? 7 : 9;
					})
				}
			},
			"wind" : {
				name : "Alternate Wind Craft",
				description : desc([
					"I can use wind fury spells of my furycrafter level minus 6",
					"I can also have my (improved) fury-enhanced strikes deal thunder damage instead"
				]),
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "furycraft", false) !== "wind";
				},
				spellcastingBonus : {
					name : "Alternate Craft",
					spells : ["gust", "catapult", "expeditious retreat", "invisibility", "levitate", "call lightning", "fly", "greater invisibility", "storm sphere"],
					selection : ["gust", "catapult", "expeditious retreat", "invisibility", "levitate", "call lightning", "fly", "greater invisibility", "storm sphere"],
					times : levels.map(function (n) {
						return n < 15 ? 5 : n < 18 ? 7 : 9;
					})
				}
			},
			"wood" : {
				name : "Alternate Wood Craft",
				description : desc([
					"I can use wood fury spells of my furycrafter level minus 6",
					"I can also have my (improved) fury-enhanced strikes deal piercing damage instead"
				]),
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "furycraft", false) !== "wood";
				},
				spellcastingBonus : {
					name : "Alternate Craft",
					spells : ["druidcraft", "entangle", "goodberry", "pass without trace", "spike growth", "plant growth", "speak with plants", "grasping vine", "hallucinatory terrain"],
					selection : ["druidcraft", "entangle", "goodberry", "pass without trace", "spike growth", "plant growth", "speak with plants", "grasping vine", "hallucinatory terrain"],
					times : levels.map(function (n) {
						return n < 15 ? 5 : n < 18 ? 7 : 9;
					})
				}
			}
		},
		"subclassfeature15" : {
			name : "Alternate Craft Evolved",
			source : ["Cryyl:F", 6],
			minlevel : 15,
			description : "\n   Use the \"Choose Features\" button above to select a tertiary furycraft element",
			choices : ["Earth", "Earth Evolved (prereq: Alternate Earth Craft)", "Fire", "Fire Evolved (prereq: Alternate Fire Craft)", "Metal", "Metal Evolved (prereq: Alternate Metal Craft)", "Water", "Water Evolved (prereq: Alternate Water Craft)", "Wind", "Wind Evolved (prereq: Alternate Wind Craft)", "Wood", "Wood Evolved (prereq: Alternate Wood Craft)"],
			"earth" : {
				name : "Alternate Earth Craft",
				description : desc([
					"I can use earth fury spells of my furycrafter level minus 10",
					"I can also have my (improved) fury-enhanced strikes deal force damage instead"
				]),
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "furycraft", false) !== "earth" && GetFeatureChoice("class", "furycrafter", "subclassfeature11", false) != "earth";
				},
				spellcastingBonus : {
					name : "Alternate Craft Evolved",
					spells : ["mold earth", "earth tremor", "animal friendship", "maximilian's earthen grasp", "pass without trace", "erupting earth", "wall of sand"],
					selection : ["mold earth", "earth tremor", "animal friendship", "maximilian's earthen grasp", "pass without trace", "erupting earth", "wall of sand"],
					times : levels.map(function (n) {
						return n < 20 ? 5 : 7;
					})
				}
			},
			"earth evolved (prereq: alternate earth craft)" : {
				name : "Alternate Earth Craft Evolved",
				description : "\n  I can use earth fury spells of my full furycrafter level",
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "subclassfeature11", false) == "earth";
				},
				spellcastingBonus : [{
					name : "Alternate Craft Evolved",
					spells : ["stoneskin", "stone shape"],
					selection : ["stoneskin", "stone shape"],
					times : levels.map(function (n) {
						return n < 18 ? 2 : 0;
					})
				}, {
					name : "Alternate Craft Evolved",
					spells : ["transmute rock", "wall of stone"],
					selection : ["transmute rock", "wall of stone"],
					times : levels.map(function (n) {
						return n < 18 ? 0 : 2;
					})
				}]
			},
			"fire" : {
				name : "Alternate Fire Craft",
				description : desc([
					"I can use fire fury spells of my furycrafter level minus 10",
					"I can also have my (improved) fury-enhanced strikes deal fire damage instead"
				]),
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "furycraft", false) !== "fire" && GetFeatureChoice("class", "furycrafter", "subclassfeature11", false) != "fire";
				},
				spellcastingBonus : {
					name : "Alternate Craft Evolved",
					spells : ["produce flame", "burning hands", "charm person", "suggestion", "scorching ray", "melf's minute meteors", "fireball"],
					selection : ["produce flame", "burning hands", "charm person", "suggestion", "scorching ray", "melf's minute meteors", "fireball"],
					times : levels.map(function (n) {
						return n < 20 ? 5 : 7;
					})
				}
			},
			"fire evolved (prereq: alternate fire craft)" : {
				name : "Alternate Fire Craft Evolved",
				description : "\n  I can use fire fury spells of my full furycrafter level",
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "subclassfeature11", false) == "fire";
				},
				spellcastingBonus : [{
					name : "Alternate Craft Evolved",
					spells : ["wall of fire", "fire shield"],
					selection : ["wall of fire", "fire shield"],
					times : levels.map(function (n) {
						return n < 18 ? 2 : 0;
					})
				}, {
					name : "Alternate Craft Evolved",
					spells : ["flame strike", "immolation"],
					selection : ["flame strike", "immolation"],
					times : levels.map(function (n) {
						return n < 18 ? 0 : 2;
					})
				}]
			},
			"metal" : {
				name : "Alternate Metal Craft",
				description : desc([
					"I can use metal fury spells of my furycrafter level minus 10",
					"I can also have my (improved) fury-enhanced strikes deal the weapon's damage instead"
				]),
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "furycraft", false) !== "metal" && GetFeatureChoice("class", "furycrafter", "subclassfeature11", false) != "metal";
				},
				spellcastingBonus : {
					name : "Alternate Craft Evolved",
					spells : ["true strike", "compelled duel", "wrathful smite", "magic weapon", "blur", "protection from energy", "conjure barrage"],
					selection : ["true strike", "compelled duel", "wrathful smite", "magic weapon", "blur", "protection from energy", "conjure barrage"],
					times : levels.map(function (n) {
						return n < 20 ? 5 : 7;
					})
				}
			},
			"metal evolved (prereq: alternate metal craft)" : {
				name : "Alternate Metal Craft Evolved",
				description : "\n  I can use metal fury spells of my full furycrafter level",
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "subclassfeature11", false) == "metal";
				},
				spellcastingBonus : [{
					name : "Alternate Craft Evolved",
					spells : ["staggering smite", "stoneskin"],
					selection : ["staggering smite", "stoneskin"],
					times : levels.map(function (n) {
						return n < 18 ? 2 : 0;
					})
				}, {
					name : "Alternate Craft Evolved",
					spells : ["banishing smite", "destructive wave"],
					selection : ["banishing smite", "destructive wave"],
					times : levels.map(function (n) {
						return n < 18 ? 0 : 2;
					})
				}]
			},
			"water" : {
				name : "Alternate Water Craft",
				description : desc([
					"I can use water fury spells of my furycrafter level minus 10",
					"I can also have my (improved) fury-enhanced strikes deal cold damage instead"
				]),
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "furycraft", false) !== "water" && GetFeatureChoice("class", "furycrafter", "subclassfeature11", false) != "water";
				},
				spellcastingBonus : {
					name : "Alternate Craft Evolved",
					spells : ["shape water", "cure wounds", "create or destroy water", "snilloc's snowball swarm", "alter self", "tidal wave", "revivify"],
					selection : ["shape water", "cure wounds", "create or destroy water", "snilloc's snowball swarm", "alter self", "tidal wave", "revivify"],
					times : levels.map(function (n) {
						return n < 20 ? 5 : 7;
					})
				}
			},
			"water evolved (prereq: alternate water craft)" : {
				name : "Alternate Water Craft Evolved",
				description : "\n  I can use water fury spells of my full furycrafter level",
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "subclassfeature11", false) == "water";
				},
				spellcastingBonus : [{
					name : "Alternate Craft Evolved",
					spells : ["control water", "ice storm"],
					selection : ["control water", "ice storm"],
					times : levels.map(function (n) {
						return n < 18 ? 2 : 0;
					})
				}, {
					name : "Alternate Craft Evolved",
					spells : ["maelstrom", "mass cure wounds"],
					selection : ["maelstrom", "mass cure wounds"],
					times : levels.map(function (n) {
						return n < 18 ? 0 : 2;
					})
				}]
			},
			"wind" : {
				name : "Alternate Wind Craft",
				description : desc([
					"I can use wind fury spells of my furycrafter level minus 10",
					"I can also have my (improved) fury-enhanced strikes deal thunder damage instead"
				]),
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "furycraft", false) !== "wind" && GetFeatureChoice("class", "furycrafter", "subclassfeature11", false) != "wind";
				},
				spellcastingBonus : {
					name : "Alternate Craft Evolved",
					spells : ["gust", "catapult", "expeditious retreat", "invisibility", "levitate", "call lightning", "fly"],
					selection : ["gust", "catapult", "expeditious retreat", "invisibility", "levitate", "call lightning", "fly"],
					times : levels.map(function (n) {
						return n < 20 ? 5 : 7;
					})
				}
			},
			"wind evolved (prereq: alternate wind craft)" : {
				name : "Alternate Wind Craft Evolved",
				description : "\n  I can use wind fury spells of my full furycrafter level",
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "subclassfeature11", false) == "wind";
				},
				spellcastingBonus : [{
					name : "Alternate Craft Evolved",
					spells : ["greater invisibility", "storm sphere"],
					selection : ["greater invisibility", "storm sphere"],
					times : levels.map(function (n) {
						return n < 18 ? 2 : 0;
					})
				}, {
					name : "Alternate Craft Evolved",
					spells : ["control winds", "telekinesis"],
					selection : ["control winds", "telekinesis"],
					times : levels.map(function (n) {
						return n < 18 ? 0 : 2;
					})
				}]
			},

			"wood" : {
				name : "Alternate Wood Craft",
				description : desc([
					"I can use wood fury spells of my furycrafter level minus 10",
					"I can also have my (improved) fury-enhanced strikes deal piercing damage instead"
				]),
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "furycraft", false) !== "wood" && GetFeatureChoice("class", "furycrafter", "subclassfeature11", false) != "wood";
				},
				spellcastingBonus : {
					name : "Alternate Craft Evolved",
					spells : ["druidcraft", "entangle", "goodberry", "pass without trace", "spike growth", "plant growth", "speak with plants"],
					selection : ["druidcraft", "entangle", "goodberry", "pass without trace", "spike growth", "plant growth", "speak with plants"],
					times : levels.map(function (n) {
						return n < 20 ? 5 : 7;
					})
				}
			},
			"wood evolved (prereq: alternate wood craft)" : {
				name : "Alternate Wood Craft Evolved",
				description : "\n  I can use wood fury spells of my full furycrafter level",
				prereqeval : function() {
					return GetFeatureChoice("class", "furycrafter", "subclassfeature11", false) == "wood";
				},
				spellcastingBonus : [{
					name : "Alternate Craft Evolved",
					spells : ["grasping vine", "hallucinatory terrain"],
					selection : ["grasping vine", "hallucinatory terrain"],
					times : levels.map(function (n) {
						return n < 18 ? 2 : 0;
					})
				}, {
					name : "Alternate Craft Evolved",
					spells : ["conjure volley", "swift quiver"],
					selection : ["conjure volley", "swift quiver"],
					times : levels.map(function (n) {
						return n < 18 ? 0 : 2;
					})
				}]
			}
		}
	}
});
