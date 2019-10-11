/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Artificer, called the "Warsmith"
				This subclass was made by KibblesTasty as part of his "Alternate Artificer" project 	(https://www.patreon.com/KibblesTasty).
				Although the original source comes with rules for the Alternate Artificer class,
				the subclass present here is added to the Artificer class from the 2019/05/14 Unearthed Arcana article.
	Code by:	MorePurpleMoreBetter
	Date:		2019-09-25 (sheet v13.0.0beta19)

	Please support the creators of this content (KibblesTasty) on their Patreon (https://www.patreon.com/KibblesTasty)

	Caution:	MorePurpleMoreBetter advises against using this subclass as it breaks game balance (it is clearly overpowered). This code was made on commission for a patron.
*/

/*	-IMPORTANT-
	For this script to work, you will need to have the Unearthed Arcana:
	Artificer 2019v2 script file added BEFORE you add this file.
	Also, make sure that sources is set to be included.
	If you do not add the artificer class script first, adding this file will do nothing.

	You can find it here:
	https://github.com/safety-orange/Imports-for-MPMB-s-Character-Sheet/blob/master/WotC%20material/v13/ua_20190514_Artificer.js

	Because the Artificer class normally only gets its subclass at 3rd level,
	but this Warsmith subclass starts at 1st level,
	you will have to make sure to manually add the subclass at 1st level and
	you will not be prompted to add a subclass before reaching the 3rd level in the artificer class.
*/

var iFileName = "Artificer - Warsmith [KibblesTasty, transcribed by MPMB].js";
RequiredSheetVersion(13);

if (SourceList["UA:A3"] && ClassList["artificer-ua3"]) {

	SourceList["KT:AA"] = {
		name : "KibblesTasty: Alternate Artificer v2.0.1",
		abbreviation : "KT:AA",
		group : "KibblesTasty",
		url : "https://www.gmbinder.com/share/-LAEn6ZdC6lYUKhQ67Qk",
		date : "2019/07/10"
	};

	var upgradeAdditionalMaker = function(n) {
		return !n ? "" : n + " upgrade" + (n > 1 ? "s" : "") + " known";
	}
	var warsmithSubname = AddSubClass("artificer-ua3", "warsmith", {
		regExpSearch : /^(?=.*warsmith)(?!.*wizard).*$/i,
		subname : "Warsmith",
		fullname : "Warsmith",
		source : ["KT:AA", 26],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		features : {
			"subclassfeature1" : {
				name : "Upgrades, Basic",
				source : ["KT:AA", 4],
				minlevel : 1,
				description : desc([
					"I can select a number of upgrades that are applied to the armor/gauntlet I create",
					"I can have multiple armors/gauntlets with different upgrades, but can attune to only one",
					"Attuning to either requires a long rest; I can swap 1 upgrade when I gain a level",
					"An upgrade can only be switched to another available at the same level",
					'Use the "Choose Feature" button above to select the upgrades of the currently equipped',
					"The above number includes the 'free' Power Fist, Force Blast, or Martial Grip upgrade"
				]),
				additional : [1,1,2,2].map(upgradeAdditionalMaker),
				extraTimes : [1,1,2,2],
				extraname : "Unrestricted Upgrade",
				extrachoices : []
			},
			"subclassfeature1.2" : {
				name : "Bonus Proficiency",
				source : ["KT:AA", 26],
				minlevel : 1,
				description : " [tinker's tools, smith's tools, heavy armor]",
				toolProfs : ["Tinker's tools", "Smith's tools"],
				armorProfs : [false, false, true, false]
			},
			"subclassfeature1.1" : {
				name : "Warplate Gauntlet",
				source : ["KT:AA", 26],
				minlevel : 1,
				description : " [create more: long rest + 25 gp, or 2 days]" + desc([
					"I gain a warplate gauntlet, a wondrous item that only I can attune to",
					"When I create one, it has either the Power Fist, Force Blast, or Martial Grip upgrade"
				]),
				eval : function () { AddMagicItem("Warplate Gauntlet"); },
				removeeval : function () { RemoveMagicItem("Warplate Gauntlet"); }
			},
			"subclassfeature3" : {
				name : "Warsmith's Armor",
				source : ["KT:AA", 26],
				minlevel : 3,
				description : " [create more: 8 hours + 2000 gp]\n   I gain a warsmith's armor that includes a warplate gauntlet, no separate attunement",
				eval : function () { RemoveMagicItem("Warplate Gauntlet"); AddMagicItem("Warsmith's Armor"); },
				removeeval : function () { RemoveMagicItem("Warsmith's Armor"); AddMagicItem("Warplate Gauntlet"); }
			},
			"subclassfeature5" : {
				name : "Upgrades, Level 5",
				source : ["KT:AA", 4],
				minlevel : 5,
				description : "",
				additional : [0,0,0,0,1,1,2,2].map(upgradeAdditionalMaker),
				extraTimes : [0,0,0,0,1,1,2,2],
				extraname : "Level 5 Upgrade",
				extrachoices : []
			},
			"subclassfeature9" : {
				name : "Upgrades, Level 9",
				source : ["KT:AA", 4],
				minlevel : 9,
				description : "",
				additional : [0,0,0,0,0,0,0,0,1,1].map(upgradeAdditionalMaker),
				extraTimes : [0,0,0,0,0,0,0,0,1,1],
				extraname : "Level 9 Upgrade",
				extrachoices : []
			},
			"subclassfeature11" : {
				name : "Upgrades, Level 11",
				source : ["KT:AA", 4],
				minlevel : 11,
				description : "",
				additional : [0,0,0,0,0,0,0,0,0,0,1,1,2].map(upgradeAdditionalMaker).concat(["3 upgrades known, includes level 14 bonus"]),
				extraTimes : [0,0,0,0,0,0,0,0,0,0,1,1,2,3], // includes level 14 bonus upgrade
				extraname : "Level 11 Upgrade",
				extrachoices : []
			},
			"subclassfeature14" : {
				name : "Fully Customized Gear",
				source : ["KT:AA", 27],
				minlevel : 14,
				description : "\n   During a long rest, I can swap out one upgrade for another if all prerequisites are met"
			},
			"subclassfeature15" : {
				name : "Upgrades, Level 15",
				source : ["KT:AA", 4],
				minlevel : 15,
				description : "",
				additional : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,3,3].map(upgradeAdditionalMaker),
				extraTimes : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,3,3],
				extraname : "Level 15 Upgrade",
				extrachoices : []
			}
		}
	});

	// Add a function to see if the upgrade isn't already selected in another feature
	ClassList["artificer-ua3"].chosenUpgrades = function() {
		var aClass = "artificer-ua3";
		if (!CurrentClasses[aClass]) return true;
		var theRe = [];
		for (var aFea in CurrentClasses[aClass].features) {
			var feaObj = CurrentClasses[aClass].features[aFea];
			if ((/^subclassfeature/).test(aFea) && feaObj.extrachoices && (/upgrade/i).test(feaObj.name)) {
				theRe = theRe.concat(GetFeatureChoice("class", aClass, aFea, true));
			}
		}
		return theRe;
	};

	[{
		name : "Accelerated Movement",
		listlevel : 3,
		source : ["KT:AA", 27],
		description : desc([
			"While wearing my warsmith's armor, all my movement speeds increase with +10 ft",
			"In addition, my warsmith's armor weighs 15 lb less (not incorporated into automation)"
		]),
		speed : { allModes : "+10" }
	}, {
		listname : "Accelerated Movement, 2nd (prereq: Accelerated Movement)",
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return classes.known["artificer-ua3"].level >= 3 && upgKn.indexOf("accelerated movement, 2nd (prereq: accelerated movement)") == -1 && upgKn.indexOf("accelerated movement") != -1;
		},
		name : "Accelerated Movement, 2nd",
		source : ["KT:AA", 27],
		description : " [another +10 ft, -15 lb]",
		speed : { allModes : "+10" }
	}, {
		name : "Arcane Visor",
		listlevel : 3,
		source : ["KT:AA", 27],
		description : desc([
			"I gain 60 ft darkvision, or add 60 ft to darkvision if I already had it",
			"In addition, I have advantage on saving throws against being blinded"
		]),
		vision : [["Darkvision", "fixed 60"], ["Darkvision", "+60"]],
		savetxt : { adv_vs : ["blinded"] }
	}, {
		name : "Faraday Helmet",
		listlevel : 3,
		source : ["KT:AA", 27],
		description : desc([
			"While wearing my armor, I can replace a save die roll with the number of upgrades I have",
			"But only if saving against being magically charmed, mind controlled, stunned, or confused"
		]),
		savetxt : { text : ["Use number of upgrades instead of die roll for saves vs. magically being charmed, mind controller, stunned, or confused"] }
	}, {
		name : "Flame Projector",
		listlevel : 3,
		source : ["KT:AA", 27],
		description : desc([
			"While wearing my warplate gauntlet, I can use the Fire Bolt cantrip",
			"Also, I add Burning Hands, Scorching Ray, Fireball, and Wall of Fire to my artificer spell list"
		]),
		spellcastingBonus : {
			name : "Flame Projector",
			spells : ["fire bolt"],
			selection : ["fire bolt"]
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					if (spName == "artificer-ua3" && spType.indexOf("bonus") == -1) {
						spList.extraspells = spList.extraspells.concat(["burning hands", "scorching ray", "fireball", "wall of fire"]);
					}
				},
				"While wearing my warplate gauntlet, I have extra spells added to my artificer spell list: Burning Hands, Scorching Ray, Fireball, and Wall of Fire."
			]
		}
	}, {
		name : "Force Blast",
		source : ["KT:AA", 27],
		description : desc([
			"I can make a 30 ft ranged spell attack to deal 1d8 + my Intelligence mod in force damage",
			"When I take the Attack action, I can do this instead of making one attack"
		]),
		additional : levels.map(function (n) {
			return n < 5 ? 0 : "+" + (n < 14 ? 1 : 2) + " to hit/damage";
		}),
		weaponsAdd : ["Force Blast"],
		weaponOptions : {
			regExpSearch : /^(?=.*force)(?=.*blast).*$/i,
			name : "Force Blast",
			source : ["KT:AA", 27],
			ability : 4,
			type : "Spell",
			damage : [1, 8, "force"],
			range : "30 ft",
			description : "Can be used instead of one attack during an Attack action",
			abilitytodamage : true,
			isWarsmithForceBlast : true
		},
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.theWea.isWarsmithForceBlast && classes.known['artificer-ua3'] && classes.known['artificer-ua3'].level >= 5) {
						var extraBonus = classes.known['artificer-ua3'].level < 14 ? 1 : 2;
						output.extraDmg += extraBonus;
						output.extraHit += extraBonus;
					};
				},
				"I add a +1 bonus on my attack and damage roll for Force Blast once I reach 5th level, and again when I reach 14th level artificer."
			]
		}
	}, {
		name : "Grappling Reel",
		listlevel : 3,
		source : ["KT:AA", 27],
		description : desc([
			"As an action or one attack, I can use my warsmith's armor integrated grappling reel",
			"I target a surface, object, or creature within 30 ft; If it is Large or more, I move towards it",
			"If it is Large or smaller, I can make a grapple check to pull it towards me and grapple it"
		]),
		action : [["action", ""]]
	}, {
		name : "Lightning Channel",
		listlevel : 3,
		source : ["KT:AA", 27],
		description : desc([
			"I can cast Lightning Charged as a bonus action without using a spell slot once per short rest",
			"Additionally, my Force Blast upgrade deals +1d6 lightning damage"
		]),
		usages : 1,
		recovery : "short rest",
		spellcastingBonus : {
			name : "Lightning Channel",
			spells : ["lightning charged"],
			selection : ["lightning charged"],
			firstCol : "oncesr"
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (v.theWea.isWarsmithForceBlast) {
						fields.Description += (fields.Description ? '; ' : '') + '+1d6 lightning damage';
					};
				},
				"I add a +1d6 bonus lightning damage to the ranged spell attacks that I make with my Force Blast upgrade."
			]
		},
		spellChanges : {
			"lightning charged" : {
				time : "1 bns",
				changes : "When using my Lightning Channel upgrade, I can cast Lightning Charged as a bonus action without expending a spell slot."
			}
		}
	}, {
		name : "Lightning Projector",
		listlevel : 3,
		source : ["KT:AA", 28],
		description : desc([
			"While wearing my gauntlet, I can use Shocking Grasp and add to my artificer spell list:",
			"Thunderwave, Lightning Charged, Lightning Bolt, and Storm Sphere"
		]),
		spellcastingBonus : {
			name : "Lightning Projector",
			spells : ["shocking grasp"],
			selection : ["shocking grasp"]
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					if (spName == "artificer-ua3" && spType.indexOf("bonus") == -1) {
						spList.extraspells = spList.extraspells.concat(["thunderwave", "lightning charged", "lightning bolt", "storm sphere"]);
					}
				},
				"While wearing my warplate gauntlet, I have extra spells added to my artificer spell list: Thunderwave, Lightning Charged, Lightning Bolt, and Storm Sphere."
			]
		}
	}, {
		name : "Martial Grip",
		source : ["KT:AA", 28],
		description : "\n   I have proficiency with martial weapons while wearing my warplate gauntlet",
		weaponProfs : [false, true]
	}, {
		name : "Power Fist",
		source : ["KT:AA", 28],
		description : desc([
			"I can use my warplate gauntlet as a magic weapon that deals 1d8 bludgeoning damage",
			"I have proficiency with this weapon and it has the light property",
			"I can forgo adding my Prof Bonus to its attack roll, instead adding it twice to its damage"
		]),
		additional : levels.map(function (n) {
			return n < 5 ? 0 : "+" + (n < 14 ? 1 : 2) + " to hit/damage";
		}),
		weaponsAdd : ["Power Fist"],
		weaponOptions : {
			regExpSearch : /^(?=.*power)(?=.*fist).*$/i,
			name : "Power Fist",
			source : ["KT:AA", 28],
			ability : 1,
			type : "Natural",
			damage : [1, 8, "bludgeoning"],
			range : "Melee",
			description : "Forgo Prof Bonus on to hit, instead add it twice to damage",
			abilitytodamage : true,
			isWarsmithPowerFist : true
		},
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.theWea.isWarsmithPowerFist && classes.known['artificer-ua3'] && classes.known['artificer-ua3'].level >= 5) {
						var extraBonus = classes.known['artificer-ua3'].level < 14 ? 1 : 2;
						output.extraDmg += extraBonus;
						output.extraHit += extraBonus;
					};
				},
				"I add a +1 bonus on my attack and damage roll for Power Fist once I reach 5th level, and again when I reach 14th level artificer."
			]
		}
	}, {
		listname : "Power Fist, 2nd hand (prereq: Power Fist)",
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("power fist, 2nd hand (prereq: power fist)") == -1 && upgKn.indexOf("power fist") != -1;
		},
		name : "Power Fist, 2nd hand",
		source : ["KT:AA", 28],
		description : "\n   With a Power Fist on both hands, I can use it for two-weapon fighting",
		weaponsAdd : ["Power Fist (off-hand)"]
	}, {
		name : "Reinforced Armor",
		listlevel : 3,
		source : ["KT:AA", 28],
		description : " [+1 AC to warsmith's armor]",
		extraAC : [{
			mod : 1,
			text : "I gain a +1 bonus to AC while I'm wearing my warsmith's armor.",
			stopeval : function (v) { return !CurrentArmor.known || !ArmourList[CurrentArmour.known] || !ArmourList[CurrentArmour.known].isWarsmithArmor; }
		}]
	}, {
		listname : "Reinforced Armor, 2nd (prereq: Reinforced Armor)",
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("reinforced armor, 2nd (prereq: reinforced armor)") == -1 && upgKn.indexOf("reinforced armor") != -1;
		},
		name : "Reinforced Armor, 2nd",
		source : ["KT:AA", 28],
		description : " [+1 AC to warsmith's armor]",
		extraAC : [{
			mod : 1,
			text : "I gain a +1 bonus to AC while I'm wearing my warsmith's armor.",
			stopeval : function (v) { return !CurrentArmor.known || !ArmourList[CurrentArmour.known] || !ArmourList[CurrentArmour.known].isWarsmithArmor; }
		}]
	}, {
		listname : "Reinforced Armor, 3rd (prereq: Reinforced Armor, 2nd)",
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("reinforced armor, 3rd (prereq: reinforced armor)") == -1 && upgKn.indexOf("reinforced armor, 2nd (prereq: reinforced armor)") != -1 && upgKn.indexOf("reinforced armor") != -1;
		},
		name : "Reinforced Armor, 3rd",
		source : ["KT:AA", 28],
		description : " [+1 AC to warsmith's armor]",
		extraAC : [{
			mod : 1,
			text : "I gain a +1 bonus to AC while I'm wearing my warsmith's armor.",
			stopeval : function (v) { return !CurrentArmor.known || !ArmourList[CurrentArmour.known] || !ArmourList[CurrentArmour.known].isWarsmithArmor; }
		}]
	}, {
		name : "Sentient Armor",
		listlevel : 3,
		source : ["KT:AA", 28],
		description : "\n   While wearing my warsmith's armor, I add +2 to my Intelligence score, up to 22",
		scores : [0, 0, 0, 2, 0, 0],
		scoresMaximum : [0, 0, 0, 22, 0, 0],
	}, {
		listname : "Arcaneware (prereq: Sentient Armor)",
		listlevel : 5,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("arcaneware (prereq: sentient armor)") == -1 && upgKn.indexOf("sentient armor") != -1;
		},
		name : "Arcaneware",
		source : ["KT:AA", 28],
		description : desc([
			"While I'm able to communicate with my warsmith's armor, I have proficiency in a skill",
			"This can be either Arcana, History, Investigation, Nature, or Religion"
		]),
		skillstxt : "Choose one from Arcana, History, Investigation, Nature, or Religion"
	}, {
		listlevel : 5,
		name : "Active Camouflage",
		source : ["KT:AA", 28],
		description : desc([
			"As an action, I can cause my suit to blend into its surrounding, making me lightly obscured",
			"Thus, I can hide in plain sight and others have disadv. on Perception checks to see me"
		]),
		action : [["action", " (start/stop)"]]
	}, {
		listname : "Collapsible (incompatible with Integrated Armor or Piloted Golem)",
		listlevel : 5,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return CurrentMagicItems.choices.indexOf("integrated armor (medium)") == -1 && upgKn.indexOf("collapsible (incompatible with integrated armor or piloted golem)") == -1 && upgKn.indexOf("piloted golem (prereq: warplate, incompatible with collapsible)") == -1;
		},
		name : "Collapsible",
		source : ["KT:AA", 28],
		description : desc([
			"As an action, I can don or doff my warsuit or warplate as it can collapse into a case",
			"This case weighs 1/3 of the armor's full weight (not included in the automation)"
		]),
		action : [["action", " (don/doff)"]]
	}, {
		listname : "Divination Visor (prereq: Arcane Visor)",
		listlevel : 5,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("divination visor (prereq: arcane visor)") == -1 && upgKn.indexOf("arcane visor") != -1;
		},
		name : "Divination Visor",
		source : ["KT:AA", 28],
		description : "\n   I can cast my divination artificer spells as a bonus action and they no longer require conc.",
		calcChanges : {
			spellAdd : [
				function (spellKey, spellObj, spName) {
					if (spName == "artificer-ua3" && spellObj.school == "Div" && (spellObj.time != "1 bns" || (/conc,/i).test(spellObj.duration))) {
						spellObj.time = "1 bns";
						spellObj.duration = spellObj.duration.replace(/conc, ?/i, "");
						return true;
					}
				},
				"I can cast divination artificer spells that I know as a bonus action, and if they require concentration, I also no longer require concentration to maintain them."
			]
		}
	}, {
		listname : "Emergency Protocol (prereq: Sentient Armor)",
		listlevel : 5,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("emergency protocol (prereq: sentient armor)") == -1 && upgKn.indexOf("sentient armor") != -1;
		},
		name : "Emergency Protocol",
		source : ["KT:AA", 28],
		description : desc([
			"When I'm incapacitated or unconscious and can't take an action, my armor will act for me",
			"It will cast a spell using one of its upgrades or take the Dodge action"
		]),
		usages : 1,
		recovery : "short rest"
	}, {
		listname : "Focal Reflectors (prereq: Force Blast)",
		listlevel : 5,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("emergency protocol (prereq: force blast)") == -1 && upgKn.indexOf("force blast") != -1;
		},
		name : "Focal Reflectors",
		source : ["KT:AA", 28],
		description : "\n   I add +30 ft range to my Force Blast and a +2 bonus on all my ranged spell attack rolls",
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (v.theWea.isWarsmithForceBlast) {
						var rangeFT = fields.Range.match(/(\d+) ?ft/);
						fields.Range = fields.Range.replace(rangeFT[0], Number(rangeFT[1]) + 30 + " ft");
					}
					if (v.isSpell && (/^(?!.*melee).*\d+.*$/i).test(fields.Range)) {
						output.extraHit += 2;
					}
				},
				"The range of the ranged spell attacks I make with Force Blast increases with 30 ft.\n \u2022 I add +2 to my ranged spell attack rolls."
			]
		}
	}, {
		listname : "Mechanical Enhancement (prereq: Integrated Armor)",
		listlevel : 5,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("mechanical enhancement (prereq: integrated armor)") == -1 && CurrentMagicItems.choices.indexOf("integrated armor (medium)") != -1;
		},
		name : "Mechanical Enhancement",
		source : ["KT:AA", 29],
		description : "\n   +5 ft to all movement modes, +1 HP per artificer level, and +1 on Str, Dex, and Con saves",
		calcChanges : {
			hp : function (totalHD) {
				if (classes.known["artificer-ua3"]) {
					return [classes.known["artificer-ua3"].level, "Mechanical Enhancement (artificer level)"];
				}
			}
		},
		speed : { allModes : "+5" },
		addMod : [
			{ type : "save", field : "Str", mod : 1, text : "I add +1 to my Strength, Dexterity, and Constitution saving throws." },
			{ type : "save", field : "Dex", mod : 1, text : "I add +1 to my Strength, Dexterity, and Constitution saving throws." },
			{ type : "save", field : "Con", mod : 1, text : "I add +1 to my Strength, Dexterity, and Constitution saving throws." }
		]
	}, {
		listname : "Reactive Plating (prereq: Warplate)",
		listlevel : 5,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("reactive plating (prereq: warplate)") == -1 && CurrentMagicItems.choices.indexOf("warplate (heavy)") != -1;
		},
		name : "Reactive Plating",
		source : ["KT:AA", 29],
		description : "\n   As a reaction when hit by an attack, I can reduce the damage by my proficiency bonus",
		action : [["reaction", " (when hit)"]]
	}, {
		listname : "Resistance, Acid",
		listlevel : 5,
		name : "Acid Resistance",
		source : ["KT:AA", 29],
		description : "\n   While wearing my warsmith's armor, I have resistance to acid damage",
		dmgres : ["Acid"]
	}, {
		listname : "Resistance, Cold",
		listlevel : 5,
		name : "Cold Resistance",
		source : ["KT:AA", 29],
		description : "\n   While wearing my warsmith's armor, I have resistance to Cold damage",
		dmgres : ["Cold"]
	}, {
		listname : "Resistance, Fire",
		listlevel : 5,
		name : "Fire Resistance",
		source : ["KT:AA", 29],
		description : "\n   While wearing my warsmith's armor, I have resistance to fire damage",
		dmgres : ["Fire"]
	}, {
		listname : "Resistance, Force",
		listlevel : 5,
		name : "Force Resistance",
		source : ["KT:AA", 29],
		description : "\n   While wearing my warsmith's armor, I have resistance to force damage",
		dmgres : ["Force"]
	}, {
		listname : "Resistance, Lightning",
		listlevel : 5,
		name : "Lightning Resistance",
		source : ["KT:AA", 29],
		description : "\n   While wearing my warsmith's armor, I have resistance to lightning damage",
		dmgres : ["Lightning"]
	}, {
		listname : "Resistance, Necrotic",
		listlevel : 5,
		name : "Necrotic Resistance",
		source : ["KT:AA", 29],
		description : "\n   While wearing my warsmith's armor, I have resistance to necrotic damage",
		dmgres : ["Necrotic"]
	}, {
		listname : "Resistance, Radiant",
		listlevel : 5,
		name : "Radiant Resistance",
		source : ["KT:AA", 29],
		description : "\n   While wearing my warsmith's armor, I have resistance to radiant damage",
		dmgres : ["Radiant"]
	}, {
		listname : "Resistance, Thunder",
		listlevel : 5,
		name : "Thunder Resistance",
		source : ["KT:AA", 29],
		description : "\n   While wearing my warsmith's armor, I have resistance to thunder damage",
		dmgres : ["Thunder"]
	}, {
		listname : "Sealed Suit (prereq: Warplate)",
		listlevel : 5,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("sealed suit (prereq: warplate)") == -1 && CurrentMagicItems.choices.indexOf("warplate (heavy)") != -1;
		},
		name : "Sealed Suit",
		source : ["KT:AA", 29],
		description : desc([
			"As a bonus action, I can active an environment seal on my armor with 1 hour of air",
			"While active, I'm immune to poison and acclimated to high altitude and cold & hot climates"
		]),
		action : [["bonus action", ""]]
	}, {
		listlevel : 9,
		name : "Ether Reactor",
		source : ["KT:AA", 29],
		description : " [6 charges \u0026 1\xD7 overdraw per long rest]" + desc([
			"I can use these charges to cast spells from other upgrades, without expending that upgrade",
			"This uses 1 charge per level of the spell; I can expend more to cast the spell at a higher level",
			"Once per long rest, when out of charges, I can overdraw the reactor to cast a spell anyway",
			"When I do so, my speed becomes 0 for a number of rounds equal to the spell level cast"
		]),
		extraLimitedFeatures : [{
			name : "Ether Reactor Charges",
			usages : 6,
			recovery : "long rest"
		}, {
			name : "Ether Reactor Overdraw",
			usages : 1,
			recovery : "long rest"
		}],
	}, {
		listlevel : 9,
		name : "Iron Muscle",
		source : ["KT:AA", 29],
		description : "\n   While wearing my warsmith's armor, I add +2 to my Strength score, up to 24",
		scores : [2, 0, 0, 0, 0, 0],
		scoresMaximum : [24, 0, 0, 0, 0, 0]
	}, {
		listname : "Phase Suit (prereq: Warsuit)",
		listlevel : 9,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("phase suit (prereq: warsuit)") == -1 && CurrentMagicItems.choices.indexOf("warsuit (medium)") != -1;
		},
		name : "Phase Suit",
		source : ["KT:AA", 29],
		description : desc([
			"I know the Misty Step and Blink spells",
			"As an action, I become intangible, moving through creatures and objects until my turn ends",
			"If I end my turn inside something, I'm shunted out of it and take 10 force damage"
		]),
		spellcastingBonus : {
			name : "Phase Suit",
			spells : ["misty step", "blink"],
			selection : ["misty step", "blink"],
			times : 2
		},
		usages : 1,
		recovery : "long rest",
		additional : "intangible",
		action : [["action", " (intangible)"]]
	}, {
		listname : "Piloted Golem (prereq: warplate, incompatible with collapsible)",
		listlevel : 9,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("piloted golem (prereq: warplate, incompatible with collapsible)") == -1 && upgKn.indexOf("collapsible (incompatible with integrated armor or piloted golem)") == -1 && CurrentMagicItems.choices.indexOf("warplate (heavy)") != -1;
		},
		name : "Piloted Golem",
		source : ["KT:AA", 29],
		description : desc([
			"While wearing my warplate, my size category increases by one step",
			"In addition, I gain adv. on Strength saves and adv. on Strength checks vs. smaller creatures"
		]),
		savetxt : { text : ["Adv. on Str saves"] },
		eval : function() {
			var curSize = tDoc.getField("Size Category").currentValueIndices;
			if (curSize != -1) PickDropdown("Size Category", curSize - 1);
		},
		removeeval : function() {
			var curSize = tDoc.getField("Size Category").currentValueIndices;
			if (curSize != -1) PickDropdown("Size Category", curSize + 1);
		}
	}, {
		listname : "Ablative Armor (prereq: Piloted Golem)",
		listlevel : 11,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("ablative armor (prereq: piloted golem)") == -1 && upgKn.indexOf("piloted golem (prereq: warplate, incompatible with collapsible)") != -1;
		},
		name : "Ablative Armor",
		source : ["KT:AA", 29],
		description : "\n   Whenever I finish a short or long rest, I gain temp HP equal to my Int mod + artificer level"
	}, {
		listname : "Cloaking Device (prereq: Active Camouflage)",
		listlevel : 11,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("cloaking device (prereq: active camouflage)") == -1 && upgKn.indexOf("active camouflage") != -1;
		},
		name : "Cloaking Device",
		source : ["KT:AA", 29],
		description : desc([
			"As a reaction on my turn where I don't move with active camouflage engaged, I can Hide",
			"I make an Int (Stealth) check, but at disadv. in 5 ft of a creature or if I attacked this turn",
			"I can overload my camouflage to cast Greater Invisibility without expending a spell slot"
		]),
		action : [["reaction", " (if not moved)"]],
		usages : 1,
		recovery : "long rest",
		additional : "Greater Invisibility",
		spellcastingBonus : {
			name : "Cloaking Device",
			spells : ["greater invisibility"],
			selection : ["greater invisibility"],
			firstCol : "oncelr"
		}
	}, {
		listlevel : 11,
		name : "Distributed Force",
		source : ["KT:AA", 29],
		description : "\n   I can add my ability modifier to the damage of my off-hand attacks",
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.isOffHand) output.modToDmg = true;
				},
				"When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks. If a melee weapon includes 'off-hand' or 'secondary' in its name or description, it is considered an off-hand attack."
			]
		}
	}, {
		listname : "Lightning Rod (prereq: Lightning Channel)",
		listlevel : 11,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("lightning rod (prereq: lightning channel)") == -1 && upgKn.indexOf("lightning channel") != -1;
		},
		name : "Lightning Rod",
		source : ["KT:AA", 29],
		description : "\n   Whenever I cast Lightning Charged, I treat it as if I had used a spell slot of 1 level higher",
		spellChanges : {
			"lightning charged" : {
				description : "If target crea melee atk, touch spell, or in grapple, other takes 1d6 Lightn. dmg; works 8+2/SL times",
				changes : "When using my Lightning Rod upgrade, I always cast Lightning Charged as if I had used a spell slot of 1 level higher than I actually used."
			}
		}
	}, {
		listname : "Flash Freeze Capacitor (incompatible with other Capacitors)",
		listlevel : 11,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("flash freeze capacitor (incompatible with other capacitors)") == -1 && !(/capacitor[^s]/).test(upgKn);
		},
		name : "Flash Freeze Capacitor",
		source : ["KT:AA", 29],
		description : desc([
			"Once per long rest, I can cast Cone of Cold using this upgrade without using a spell slot",
			"When doing so, the effected area is difficult terrain until the end of my next turn"
		]),
		usages : 1,
		recovery : "long rest",
		spellcastingBonus : {
			name : "Flash Freeze Capacitor",
			spells : ["cone of cold"],
			selection : ["cone of cold"],
			firstCol : "oncelr"
		},
		spellChanges : {
			"cone of cold" : {
				description : "8d8+1d8/SL Cold dmg; save half; killed crea frozen statues till thawed; area dif. ter. till next turn ends",
				changes : "When using my Flash Freeze Capacitor upgrade to cast Cone of Cold, the effected area becomes difficult terrain until the end of my next turn."
			}
		}
	}, {
		listname : "Flight (incompatible with Piloted Golem)",
		listlevel : 11,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("flight (incompatible with piloted golem)") == -1 && upgKn.indexOf("piloted golem (prereq: warplate, incompatible with collapsible)") == -1;
		},
		name : "Flight",
		source : ["KT:AA", 30],
		description : "\n   While wearing my warsmith's armor, I have a magical flying speed of 30 ft",
		speed : { fly : { spd : 30, enc : 30 } }
	}, {
		listname : "Integrated Attack (prereq: Integrated Armor or Warplate)",
		listlevel : 11,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("integrated attack (prereq: integrated armor or warplate)") == -1 && (CurrentMagicItems.choices.indexOf("integrated armor (medium)") == -1 || CurrentMagicItems.choices.indexOf("warplate (heavy)") == -1);
		},
		name : "Integrated Attack",
		source : ["KT:AA", 30],
		description : " [can have multiple times]" + desc([
			"Upon selecting this upgrade, I incorporate a melee weapon I own into my warsmith's armor",
			"This weapon can't have the heavy property; As a bonus action, I can activate this weapon",
			"I am proficient with this weapon, I require no hands to wield it, and can't be disarmed of it",
			"As a bonus action and when activating, I can make one attack with this weapon"
		]),
		action : [["bonus action", " (active/attack)"]]
	}, {
		listname : "Power Slam Capacitor (incompatible with other Capacitors)",
		listlevel : 11,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("power slam capacitor (incompatible with other capacitors)") == -1 && !(/capacitor[^s]/).test(upgKn);
		},
		name : "Power Slam Capacitor",
		source : ["KT:AA", 30],
		description : "\n   As an action, I jump up to my movement and cast Destructive Wave as I land (no spell slot)",
		usages : 1,
		recovery : "long rest",
		action : [["action", ""]],
		spellcastingBonus : {
			name : "Power Slam Capacitor",
			spells : ["destructive wave"],
			selection : ["destructive wave"],
			firstCol : "oncelr"
		}
	}, {
		listname : "Self-Repair Matrix (prereq: Ablative Armor)",
		listlevel : 11,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("self-repair matrix (prereq: ablative armor)") == -1 && upgKn.indexOf("ablative armor (prereq: piloted golem)") != -1;
		},
		name : "Self-Repair Matrix",
		source : ["KT:AA", 30],
		description : "\n   At the start of my turn when I have no temp HP, I gain my proficiency bonus in temp HP"
	}, {
		listlevel : 11,
		name : "Titan Grip",
		source : ["KT:AA", 30],
		description : "\n   I can wield a two-handed weapon in the one hand with the gauntlet with this upgrade"
	}, {
		listlevel : 11,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("titan grip, 2nd") == -1 && upgKn.indexOf("titan grip") != -1;
		},
		name : "Titan Grip, 2nd",
		source : ["KT:AA", 30],
		description : " [wield two-handed weapon in each hand]"
	}, {
		listname : "Phase Engine (prereq: Warsuit)",
		listlevel : 15,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return CurrentMagicItems.choices.indexOf("warsuit (medium)") != -1;
		},
		name : "Phase Engine",
		source : ["KT:AA", 30],
		description : desc([
			"As a reaction when attacked, I can become intangible causing the attack to miss",
			"If the attack is with a magical weapon, it has disadvantage instead",
			"This upgrade also recharges every time I teleport or otherwise visit the ethereal plane"
		]),
		action : [["reaction", " (if attacked)"]],
		usages : 1,
		recovery : "short rest"
	}, {
		listname : "Heavy Plating (prereq: Warplate)",
		listlevel : 15,
		prereqeval : function () {
			return CurrentMagicItems.choices.indexOf("warplate (heavy)") != -1;
		},
		name : "Heavy Plating",
		source : ["KT:AA", 30],
		description : "\n   While wearing my warplate, I have resistance to nonmagical bludg./pierc./slash. damage",
		dmgres : [["Bludgeoning", "Bludg. (nonmagical)"], ["Piercing", "Pierc. (nonmagical)"], ["Slashing", "Slash. (nonmagical)"]]
	}, {
		listlevel : 15,
		name : "Recall",
		source : ["KT:AA", 30],
		description : desc([
			"As a bonus action, I can remove and hide my warsmith's armor in a pocket dimension",
			"As an action, I can don it again as I return it from this pocket dimension",
			"While it remains in this pocket dimension, it can't be interacted with in any other way"
		]),
		action : [["bonus action", " (doff and hide)"], ["action", " (return and don)"]]
	}, {
		listname : "Shield Arm (prereq: Piloted Golem)",
		listlevel : 15,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("piloted golem (prereq: warplate, incompatible with collapsible)") != -1;
		},
		name : "Shield Arm",
		source : ["KT:AA", 30],
		description : desc([
			"As a bonus action, I can deploy the shield that is integrated in my armor's arm",
			"I am proficiency with this shield and it requires the use of my arm"
		]),
		action : [["bonus action", " (deploy)"]],
		shieldAdd : ["Shield Arm", 2, 0]
	}, {
		listlevel : 15,
		name : "Sun Cannon",
		source : ["KT:AA", 30],
		description : "\n   Once per long rest, I can cast Sunbeam using this upgrade without using a spell slot",
		usages : 1,
		recovery : "long rest",
		spellcastingBonus : {
			name : "Sun Cannon",
			spells : ["sunbeam"],
			selection : ["sunbeam"],
			firstCol : "oncelr"
		}
	}, {
		listname : "Virtual Interface (prereq: Sentient Armor)",
		listlevel : 15,
		prereqeval : function () {
			var upgKn = ClassList["artificer-ua3"].chosenUpgrades();
			return upgKn.indexOf("sentient armor") != -1;
		},
		name : "Virtual Interface",
		source : ["KT:AA", 30],
		description : desc([
			"When I use artificial strength to raise my Strength, my Intelligence no longer lowers",
			"However, this only applies to my natural Int score (not counting upgrades or magic items)"
		])
	}].forEach(function (aObj) {
		var upgName = aObj.listname ? aObj.listname : aObj.name;
		var upgNameLC = upgName.toLowerCase();
		var upgLevel = aObj.listlevel ? aObj.listlevel : 1;
		if (!aObj.prereqeval && upgLevel === 3) {
			aObj.prereqeval = function () {
				return classes.known["artificer-ua3"].level >= 3 && ClassList["artificer-ua3"].chosenUpgrades().indexOf(upgNameLC) == -1;
			}
			upgLevel = 1; // so that it's still added to the first list of upgrades
		} else if (!aObj.prereqeval && upgLevel < 15) {
			aObj.prereqeval = function () {
				return ClassList["artificer-ua3"].chosenUpgrades().indexOf(upgNameLC) == -1;
			}
		}
		for (var aFea in ClassSubList[warsmithSubname].features) {
			var feaObj = ClassSubList[warsmithSubname].features[aFea];
			if (!(/upgrade/i).test(feaObj.name) || !feaObj.extrachoices || feaObj.minlevel < upgLevel) continue;
			feaObj.extrachoices.push(upgName);
			feaObj[upgNameLC] = aObj;
		}
	});

	// Add the magic items
	MagicItemsList["warplate gauntlet"] = {
		name : "Warplate Gauntlet",
		source : ["KT:AA", 26],
		type : "wondrous item",
		description : "As an action while wearing this gauntlet, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount up to my original Int. I can stop this at any time and it automatically stops when I take off the gauntlet. It can also be augmented by my warsmith upgrades.",
		attunement : true,
		action : [["action", "Artificial Strength"]],
		prerequisite : "A warsmith's armor already includes a warplate gauntlet and you can't be attuned to both at the same time",
		prereqeval : function(v) { return CurrentMagicItems.known.indexOf("warsmith's armor") == -1; },
	}
	MagicItemsList["warsmith's armor"] = {
		name : "Warsmith's Armor",
		source : ["KT:AA", 26],
		type : "armor",
		description : "This armor adds 2 to my Str (up to 22), makes me count as one size greater for the weight I can carry, can be augmented by my warsmith upgrades, and includes a warplate gauntlet. As an action, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount up to my original Int.",
		attunement : true,
		prerequisite : "A warsmith's armor already includes a warplate gauntlet and you can't be attuned to both at the same time",
		prereqeval : function(v) { return CurrentMagicItems.known.indexOf("warplate gauntlet") == -1; },
		action : [["action", "Artificial Strength"]],
		scores : [2, 0, 0, 0, 0, 0],
		scoresMaximum : [22, 0, 0, 0, 0, 0],
		choices : ["Warplate (heavy)", "Warsuit (medium)", "Integrated Armor (medium)"],
		"warplate (heavy)" : {
			name : "Warsmith's Warplate",
			description : "This armor adds 2 to my Str (up to 22), makes me count as one size greater for the weight I can carry, can be augmented by my warsmith upgrades, and includes a warplate gauntlet. As an action, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount up to my original Int.",
			descriptionLong : "This heavy armor includes a warplate gauntlet and gives me an AC of 18, regardless of Dexterity. It gives my disadvantage on my Stealth checks and increases my Strength score with 2, up to a maximum of 22. Also, it increases my size from Small to Medium and makes me count as one size category higher for determining the weight I can lift or carry (count as Large for a Small race). As an action, I can use the gauntlet's artificial strength feature to lower my Intelligence and increase my Strength with an equal amount, up to my original Intelligence score. I can stop this at any time and stops when I take it off.",
			weight : 75,
			carryingCapacity : 2,
			armorAdd : "Warplate",
			armorOptions : [{
				regExpSearch : /warplate/i,
				name : "Warplate",
				source : ["KT:AA", 26],
				type : "heavy",
				ac : 18,
				weight : 75,
				isWarsmithArmor : true
			}]
		},
		"warsuit (medium)" : {
			name : "Warsmith's Warsuit",
			description : "This armor adds 2 to my Str, up to 22. It can be augmented by my warsmith upgrades and includes a warplate gauntlet. As an action, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount up to my original Int. I can stop this at any time and it stops when I take it off.",
			descriptionLong : "This medium armor includes a warplate gauntlet and gives me an AC of 14 + my Dexterity modifier (max 2) and increases my Strength score with 2, up to a maximum of 22. As an action, I can use the gauntlet's artificial strength feature to lower my Intelligence and increase my Strength with an equal amount, up to my original Intelligence score. I can stop this at any time and it stops automatically when I take the gauntlet off.",
			weight : 45,
			armorAdd : "Warsuit",
			armorOptions : [{
				regExpSearch : /warsuit/i,
				name : "Warsuit",
				source : ["KT:AA", 26],
				type : "medium",
				ac : 14,
				weight : 45,
				isWarsmithArmor : true
			}],
			eval : function () {
				if (CurrentRace.size < 4) MagicItemsList["warsmith's armor"]["warsuit (medium)"].carryingCapacity = 2;
			},
			removeeval : function () {
				if (CurrentRace.size < 4) MagicItemsList["warsmith's armor"]["warsuit (medium)"].carryingCapacity = 2;
			}
		},
		"integrated armor (medium)" : {
			name : "Warsmith's Integrated Armor",
			description : "This armor adds 2 to my Str (up to 22), makes me count as one size greater for the weight I can carry, can be augmented by my warsmith upgrades, and includes a warplate gauntlet. As an action, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount up to my original Int.",
			descriptionLong : "This medium armor includes a warplate gauntlet and gives me an AC of 14 + my Dexterity modifier (max 2) and increases my Strength score with 2, up to a maximum of 22. Also, it makes me count as one size category higher for determining the weight I can lift or carry. As an action, I can use the gauntlet's artificial strength feature to lower my Intelligence and increase my Strength with an equal amount, up to my original Intelligence score. I can stop this at any time and it stops automatically when I take the gauntlet off.",
			weight : 30,
			armorAdd : "Integrated",
			armorOptions : [{
				regExpSearch : /integrated/i,
				name : "Integrated",
				source : ["KT:AA", 26],
				type : "medium",
				ac : 14,
				weight : 30,
				isWarsmithArmor : true
			}]
		}
	}

	// Lightning Charged spell (needed for the above upgrades)
	SpellsList["lightning charged"] = {
		name : "Lightning Charged",
		classes : ["wizard"],
		source : ["KT:AA", 37],
		level : 2,
		school : "Evoc",
		time : "1 a",
		range : "Touch",
		components : "V,S,M",
		compMaterial : "A piece of once used lightning rod",
		duration : "10 min",
		description : "If target crea melee atk, touch spell, or in grapple, other takes 1d6 Lightn. dmg; works 6+2/SL times",
		descriptionFull : "You channel lightning energy into a creature. The energy is harmless to the creature, but escapes in dangerous bursts to other nearby creatures.\n   Every time that creature strikes another creature with a melee attack, a spell with a range of touch, is struck by another creature with melee attack, or ends their turn while grappling or being grappled by another creature, they deal 1d6 Lightning damage to that creature.\n   Once this spell has discharged 6 times (dealing up to 6d6 damage), the spell ends." + AtHigherLevels + "The spell can discharge damage 2 additional times (dealing 2d6 more total damage) before the spell ends for each slot level above 2nd."
	}
}
