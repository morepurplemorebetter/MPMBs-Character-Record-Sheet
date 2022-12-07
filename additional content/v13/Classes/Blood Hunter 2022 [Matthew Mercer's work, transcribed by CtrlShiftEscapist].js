/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds a class called "Blood Hunter" (version of 14 Feb 2022)
				and four subclasses: "Order of the Ghostslayer", "Order of the Lycan",
				"Order of the Mutant", and "Order of the Profane Soul"

				This is taken from the D&D Beyond website (https://www.dndbeyond.com/classes/blood-hunter)
				This class and subclasses are made by Matthew Mercer

	Code by:	CtrlShiftEscapist & MorePurpleMoreBetter
	Date:		2022-11-13 (sheet v13.1.3)

	Please support the creator of this content (Matthew Mercer) and download his material from the DMs Guild website:
	https://www.dmsguild.com/browse.php?x=0&y=0&author=Matthew%20Mercer

	Additional Notes:
		Multiclassing the "Order of the Profane Soul" subclass with the Warlock class will
		result in the wrong amount of spells/cantrips being asked for in the spell selection dialogues.

		Sheet assumes the chosen Hemocraft modifier will be the higher attribute between Int and Wis.
*/

var iFileName = "Blood Hunter 2022 [Matthew Mercer's work, transcribed by CtrlShiftEscapist].js";
RequiredSheetVersion("13.1.3");

SourceList["MM:BH"] = {
	name : "D&D Beyond (Matt Mercer): Blood Hunter",
	abbreviation : "DnD-B:BH",
	group : "D&D Beyond",
	url : "https://www.dndbeyond.com/classes/blood-hunter",
	date : "2022/02/14"
};

var BHhemocraftDie = function(n) {
	return "1d" + (n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10);
};

ClassList["blood hunter"] = {
	regExpSearch : /^(?=.*blood)(?=.*hunter).*$/i,
	name : "Blood Hunter",
	source : [["DnD-B:BH", 0]],
	primaryAbility : "Strength or Dexterity, and Intelligence or Wisdom",

	//Multiclassing
	prereqs : "Strength 13 or Dexterity 13, and Intelligence 13",

	// Hit Points
	die : 10,

	// ASI
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],

	// Proficiencies
	armorProfs : {
		primary : [true, true, false, true], // Light/Medium Armor, Shields
		secondary : [true, true, false, true] // Light/Medium Armor, Shields
	},
	weaponProfs : {
		primary : [true, true], // Simple, Martial
		secondary : [true, true] // Simple, Martial
	},
	toolProfs : {
		primary : ["Alchemist's supplies"],
		secondary : ["Alchemist's supplies"]
	},
	saves : ["Dex", "Int"],
	skillstxt : {
		primary : "Choose three from Acrobatics, Arcana, Athletics, History, Insight, Investigation, Religion, and Survival",
		secondary : "Choose one from Acrobatics, Arcana, Athletics, History, Insight, Investigation, Religion, or Survival"
	},

	// Equipment
	equipment : "Blood Hunter starting equipment:\n	\u2022 A martial weapon -or- two simple weapons;" 	 +
												"\n	\u2022 A light crossbow and 20 bolts;" 				 +
												"\n \u2022 studded leather armor -or- scale mail armor;" +
												"\n \u2022 an explorer's pack and alchemist's supplies.",
	// Extra attack at level 5
	attacks : levels.map(function(n){return n < 5 ? 1 : 2}),

	// Pick 1 for Hemocraft modifier
	abilitySave : 4, // Intelligence
	abilitySaveAlt : 5, // Wisdom

	// Defined outside of ClassList
	subclasses : ["Blood Hunter Orders", []],

	features : {
		"hunter's bane" : {
			name : "Hunter's Bane",
			minlevel : 1,
			description : desc([
				"Advantage on Wis (Survival) checks to track and Int checks to recall information about",
				"fey, fiends, or undead"])
		},

		"hemocraft die" : {
			name : "Hemocraft Die",
			minlevel : 1,
			description : "",
			additional : levels.map(BHhemocraftDie)
		},

		"blood maledict" : {
			name : "Blood Maledict",
			minlevel : 1,
			description : desc([
				'Invoke Blood Curses on targets with blood',
				"Amplify curses by taking necrotic damage equal to one hemocraft die roll to remove the",
				"blood limitation and gain additional effects",
				"When a new blood curse is learned, an old blood curse can also be replaced"
			]),
			additional : levels.map(function (n) {
				return (n < 6 ? 1 : n < 10 ? 2 : n < 14 ? 3 : n < 18 ? 4 : 5) + " curse" + (n < 6 ? "" : "s") + " known";
			}),
			usages : levels.map(function (n) {
				return n < 6 ? 1 : n < 13 ? 2 : n < 17 ? 3 : 4;
			}),
			recovery : "short rest",
			extraname : "Blood Curse",
			extrachoices : [
				"Blood Curse of the Anxious",
				"Blood Curse of Binding",
				"Blood Curse of Bloated Agony",
				"Blood Curse of Exposure",
				"Blood Curse of the Eyeless",
				"Blood Curse of the Fallen Puppet",
				"Blood Curse of the Marked",
				"Blood Curse of the Muddled Mind"
			],
			extraTimes : levels.map(function (n) {
				return n < 6 ? 1 : n < 10 ? 2 : n < 14 ? 3 : n < 18 ? 4 : 5;
			}),
			"blood curse of the anxious" : {
				name : "Blood Curse of the Anxious",
				description : desc([
					"Bonus Action: Make a creature within 30 ft more susceptible to forceful influence",
					"Until the end of your next turn, all Charisma (Intimidation) checks against it are made with adv.",
					"\u2022 Amplify: The target has disadv. on next Wis save it makes before curse ends"
				]),
				action : [["bonus action", ""]]
			},
			"blood curse of binding" : {
				name : "Blood Curse of Binding",
				description : desc([
					"Bonus Action: Bind a Large or smaller visible creature within 30 ft",
					"Target must make a Str save or have 0 speed and no reaction until your next turn ends",
					"\u2022 Amplify: Lasts for 1 minute and affects creatures of any size; Target can repeat Str save at the end of each of its turns"
				]),
				action : [["bonus action", ""]]
			},
			"blood curse of bloated agony" : {
				name : "Blood Curse of Bloated Agony",
				description : desc([
					"Bonus Action: Curse a visible target within 30 ft",
					"Until the end of your next turn, target has disadv. on Str \u0026 Dex checks and takes 1d8 necrotic damage if it attacks more than once on its turn",
					"\u2022 Amplify: Lasts for 1 minute; Target can attempt Con save at the end of each of its turns"
				]),
				action : [["bonus action", ""]]
			},
			"blood curse of exposure" : {
				name : "Blood Curse of Exposure",
				description : desc([
					"Reaction: Weaken a visible target within 30 ft after it takes damage from an attack/spell",
					"Until the end of the target's next turn, target loses resistance to the triggering damage type",
					"\u2022 Amplify: Target instead has invulnerabilities to the triggering damage type reduced to resistances"
				]),
				action : [["reaction", ""]]
			},
			"blood curse of the eyeless" : {
				name : "Blood Curse of the Eyeless",
				description : desc([
					"Reaction: Disrupt the attack of a visible target within 30 ft after it rolls",
					"After the target rolls an attack, but before the outcome is known, roll a hemocraft die and subtract it from the attack roll",
					"Creatures immune to blindness are immune to this curse",
					"\u2022 Amplify: Apply to all of the target's attacks this turn; Separate hemocraft die roll for each"
				]),
				action : [["reaction", ""]]
			},
			"blood curse of the fallen puppet" : {
				name : "Blood Curse of the Fallen Puppet",
				description : desc([
					"Reaction: Compel a visible creature within 30 ft to attack after it drops to 0 HP",
					"The creature makes one weapon attack against a target of your choice",
					"\u2022 Amplify: Move the creature up to half its speed prior to attacking and add your Hemocraft modifier (min 1) to the attack roll"
				]),
				action : [["reaction", ""]]
			},
			"blood curse of the marked" : {
				name : "Blood Curse of the Marked",
				description : desc([
					"Bonus Action: Mark a visible creature within 30 ft for extra damage",
					"Until the end of your next turn, deal an additional hemocraft die of crimson rite damage on each attack",
					"\u2022 Amplify: Your next attack on the marked creature has advantage"
				]),
				action : [["bonus action", ""]]
			},
			"blood curse of the muddled mind" : {
				name : "Blood Curse of the Muddled Mind",
				description : desc([
					"Bonus Action: Curse a visible creature within 30 ft that is using concentration",
					"Before the end of your next turn, the target has disadv. on its next concentration save",
					"\u2022 Until the end of your next turn, the target has disadv. on all concentration saves"
				]),
				action : [["bonus action", ""]]
			}
		},

		"fighting style" : {
			name : "Fighting Style",
			minlevel : 2,
			description : ' Use "Choose Feature" button for fighting style',
			choices : ["Archery", "Dueling", "Great Weapon Fighting", "Two-Weapon Fighting"],
			"archery" : FightingStyles.archery,
			"dueling" : FightingStyles.dueling,
			"great weapon fighting" : FightingStyles.great_weapon,
			"two-weapon fighting" : FightingStyles.two_weapon
		},

		"crimson rite" : {
			name : "Crimson Rite",
			minlevel : 2,
			description : desc([
				"Bonus Action: Take hemocraft die in non-reduceable necrotic damage to imbue a weapon",
				'with a rite (1 per weapon, Use "Choose Feature" button for Crimson Rites)',
				"Imbued weapon attacks are magical and deal a hemocraft die of extra damage",
				"The rite lasts until you finish a short or long rest"
			]),
			additional : levels.map(function (n) {
				return (n < 6 ? 1 : n < 14 ? 2 : 3) + " rite" + (n < 6 ? "" : "s") + " known";
			}),
			action : [["bonus action", ""]],
			extraname : "Crimson Rite",
			extrachoices : [
				"Rite of the Flame",
				"Rite of the Frozen",
				"Rite of the Storm",
				"Rite of the Roar",
				"Rite of the Oracle",
				"Rite of the Dead"
			],
			extraTimes : levels.map(function (n) {
				return n < 6 ? 1 : n < 14 ? 2 : 3;
			}),
			"rite of the flame" : {
				name : "Rite of the Flame",
				description : " [fire damage]"
			},
			"rite of the frozen" : {
				name : "Rite of the Frozen",
				description : " [cold damage]"
			},
			"rite of the storm" : {
				name : "Rite of the Storm",
				description : " [lightning damage]"
			},
			"rite of the dead" : {
				name : "Rite of the Dead",
				description : " [necrotic damage]",
				prereqeval : function() { return classes.known['blood hunter'].level >= 14 }
			},
			"rite of the oracle" : {
				name : "Rite of the Oracle",
				description : " [psychic damage]",
				prereqeval : function() { return classes.known['blood hunter'].level >= 14 }
			},
			"rite of the roar" : {
				name : "Rite of the Roar",
				description : " [thunder damage]",
				prereqeval : function() { return classes.known['blood hunter'].level >= 14 }
			},
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && (/\brite\b/i).test(v.WeaponTextName)) {
							fields.Description += (fields.Description ? '; ' : '') + '+' + BHhemocraftDie(classes.known['blood hunter'].level) + ' rite damage';
						}
					},
					"Include 'Rite' in a weapon's name to add the hemocraft damage die in its description."
				]
			}
		},

		"subclassfeature3" : {
			name : "Blood Hunter Order",
			minlevel : 3,
			description : desc([
				'Commit to a Blood Hunter Order and put it in the "Class" field',
				"Commit to the Order of the Ghostslayer, Lycan, Mutant, or Profane Soul"
			])
		},

		"brand of castigation": {
			name : "Brand of Castigation",
			minlevel : 6,
			description : levels.map(function (n) {
				var castigationDescr = [
					"Brand a creature damaged by crimson rite until dismissed or another creature is branded",
					"You always know the direction of the branded creature",
					"If it damages you or a creature in 5 ft, deal Hemocraft modifier in psychic damage (min 1)"
				];
				var tetheringDescr = castigationDescr.slice(0,3).concat(["If it damages you or a creature in 5 ft, deal 2x Hemocraft modifier in psychic damage (min 2)"]);
				return n < 6 ? "" : desc(n < 13 ? castigationDescr : tetheringDescr);
			}),
			usages : 1,
			recovery : "short rest",
			additional : levels.map(function (n) {
				return n < 6 ? "" : spellLevelList[Math.min(9, Math.floor(n/2))] + " to dispel";
			})
		},

		"grim psychometry" : {
			name : "Grim Psychometry",
			minlevel : 9,
			description : desc([ "Int (History) checks about touched objects or present location are made with advantage" ])
		},

		"dark augmentation" : {
			name : "Dark Augmentation",
			minlevel : 10,
			description : desc([ "Gain +5 ft speed and add Hemocraft modifier (min 1) to Str, Dex, and Con saves" ]),
			speed : { allModes : "+5" },
			addMod : [{
				type : "save", field : "Str", mod : "max(Int|Wis|1)",
				text : "Add Hemocraft modifier (min 1) to Strength, Dexterity, and Constitution saving throws"
			}, {
				type : "save", field : "Dex", mod : "max(Int|Wis|1)",
				text : "Add Hemocraft modifier (min 1) to Strength, Dexterity, and Constitution saving throws"
			}, {
				type : "save", field : "Con", mod : "max(Int|Wis|1)",
				text : "Add Hemocraft modifier (min 1) to Strength, Dexterity, and Constitution saving throws"
			}]
		},

		"brand of tethering" : {
			name : "Brand of Tethering",
			minlevel : 13,
			description : " [Castigation deals 2× Hemocraft modifier damage]" + desc([
				"A branded target can't use Dash; It must succeed on a Wis save to teleport or plane shift",
				"It takes 4d6 psychic damage when trying to teleport/plane shift, regardless of the save"
			])
		},

		"hardened soul" : {
			name : "Hardened Soul",
			minlevel : 14,
			description : " [advantage on saves vs. being frightened/charmed]",
			savetxt : { adv_vs : ["frightened", "charmed"] }
		},

		"sanguine mastery" : {
			name : "Sanguine Mastery",
			minlevel : 20,
			description : desc([
				"Once per turn when a feature requires a hemocraft die, reroll die and choose the result",
				"On a critical hit with a rite-imbued weapon, regain one use of blood maledict"
			])
		}
	},

	updateHybridForm : function(BHlevelOld, BHlevelNew) {
		if (BHlevelOld <= 2 && BHlevelNew <= 2) return;
		//a function to create the full text for the hybrid feature
		var makeHybridText = function(lvl) {
			if (lvl < 3) return "";
			var PSdie = lvl < 11 ? "d6" : "d8";
			var atkBonus = lvl < 11 ? 1 : lvl < 18 ? 2 : 3;
			var theText = "Blood Hunter (Order of the Lycan) Hybrid Form, at level " + lvl + ":" + desc([
				"As a bonus action, transform into a hybrid lycanthropy form",
				"This form lasts " + (lvl < 18 ? "for an hour or " : "") + "until you transform back as a bonus action",
				"You can speak, use equipment, and wear armor in this form",
				"You revert back to your normal form if you fall unconscious, drop to 0 HP, or die",
				"While you are in this hybrid form, you gain the following features:"
			]);
			theText += "\n\u25C6 Feral Might" + desc([
				"You gain +" + atkBonus + " on melee damage rolls; You have advantage on Str checks and saves"
			]);
			theText += "\n\u25C6 Resilient Hide" + desc([
				"You gain resistance to nonmagical bludgeoning, piercing, and slashing damage",
				"Attacks that are made by silvered weapons bypass this resistance",
				"You gain +1 bonus to AC while not wearing heavy armor"
			]);
			theText += "\n\u25C6 Predatory Strikes" + desc([
				"Your unarmed strikes are more powerful and can be imbued with a crimson rite",
				"They deal " + PSdie + " slashing damage and are treated as a finesse weapon",
				"After attacking with this feature, you can make another as a bonus action"
			]);
			theText += "\n\u25C6 Bloodlust" + desc([
				"You must make a Wisdom save if you start the turn with no more than half max HP",
				"This has DC 8; " + (lvl < 15 ? " " : "You have advantage on this save;") + "If you fail, go into a frenzy",
				"You automatically fail if under an effect that prevents concentrating (like Rage)",
				"On failure, you must move to the nearest creature (randomize if multiple) and attack it",
				"You must use the Attack action, but may choose not to use the Extra Attack feature",
				"After this Attack action, you regain control and can continue your turn"
			]);
			if (lvl >= 7) {
				theText += "\n\u25C6 Improved Predatory Strikes" + desc([
					"Predatory strikes gain a +" + atkBonus + " bonus on attack rolls",
					"If a rite is active, predatory strikes are considered magical"
				]);
			}
			if (lvl >= 11) {
				theText += "\n\u25C6 " + "Lycan Regeneration" + desc([
					"If you have less than half max HP at the start of the turn, you heal",
					"Regain 1 + Constitution modifier HP (min 1); This doesn't apply at 0HP"
				]);
			}
			return theText;
		};
		//update the hybrid feature on the notes page
		var BHstringOld = makeHybridText(BHlevelOld);
		var BHstringNew = makeHybridText(BHlevelNew);
		if (BHstringOld != BHstringNew) AddToNotes(BHstringNew, "Blood Hunter (Order of the Lycan) Hybrid form features", BHstringOld, "Class Features section");
	}
};

AddSubClass("blood hunter", "ghostslayer", {
	regExpSearch : /^(?=.*ghost)(?=.*slayer).*$/i,
	subname : "Order of the Ghostslayer",
	fullname : "Ghostslayer",
	features : {
		"subclassfeature3" : {
			"rite of the dawn" : {
				name : "Rite of the Dawn",
				extraname : "Crimson Rite",
				description : " [radiant damage]" + desc([
					"While this rite is active, your weapon deals an extra hemocraft die of rite damage vs. undead,",
					"your weapon sheds 20-ft radius bright light and you gain resistance to necrotic damage"
				])
			},
			autoSelectExtrachoices : [{
				extrachoice : 'rite of the dawn'
			}],

			name : "Curse Specialist",
			minlevel : 3,
			description : desc([ "You gain 1 extra blood maledict use and your curses ignore blood requirements" ]),
			eval : function (v) {
				AddFeature('Blood Maledict', 1, '', 'short rest', 'Order of the Ghostslayer: Curse Specialist', 'bonus');
			},
			removeeval : function (v) {
				RemoveFeature('Blood Maledict', 1);
			},
		},

		"subclassfeature7" : {
			name : "Aether Walk",
			minlevel : 7,
			description : desc([
				"At the start of your turn, you can choose to step between planes if you are not incapacitated",
				"For your Hemocraft modifier number of rounds, you can see and affect ethereal things",
				"You can move through normal creatures and objects as if they were difficult terrain",
				"If your turn ends while inside an object, take 1d10 force damage",
				"If the effect ends while inside an object, you are shunted to the nearest unoccupied space",
				"and take 2x ft moved force damage"
			]),
			usages : levels.map(function (n) { return n < 7 ? 0 : n < 15 ? 1 : 2; }),
			recovery : "short rest"
		},

		"subclassfeature11" : {
			name : "Brand of Sundering",
			minlevel : 11,
			description : desc([
				"Damaging a branded creature with a rite-imbued weapon deals an extra hemocraft die of",
				"damage and it can't move through objects or creatures"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && (/\brite\b/i).test(v.WeaponTextName)) {
							fields.Description += (fields.Description ? '; ' : '') + '+' + BHhemocraftDie(classes.known['blood hunter'].level) + ' rite damage vs. branded creature';
						}
					},
					"Include 'Rite' in a weapon's name to add an additional hemocraft damage die if the target is branded."
				]
			},

			"blood curse of the exorcist" : {
				name : "Blood Curse of the Exorcist",
				extraname : "Order of the Ghostslayer 15; Blood Curse",
				description : desc([
					"Bonus Action: Remove frightened, charmed, and possession effects from a visible creature",
					"within 30 ft",
					"\u2022 Amplify: The creature that caused the stopped condition takes 3d6 psychic damage",
					"  Additionally, it must make Wisdom save or be stunned until the end of your next turn"
				]),
				action : [["bonus action", ""]]
			},
			autoSelectExtrachoices : [{
				extrachoice : "blood curse of the exorcist",
				minlevel : 15
			}]
		},

		"subclassfeature18" : {
			name : "Rite Revival",
			minlevel : 18,
			description : desc([ "When you drop to 0 HP with a rite active, end all rites to drop to 1 HP instead" ])
		}
	}
});

AddSubClass("blood hunter", "lycan", {
	regExpSearch : /^(?=.*blood)(?=.*hunter)(?=.*lycan).*$/i,
	subname : "Order of the Lycan",
	features : {
		"subclassfeature3" : {
			name : "Heightened Senses",
			minlevel : 3,
			description : desc ([ "Gain advantage on Wisdom (Perception) checks that rely on hearing or smell" ]),
			vision : [["Adv. on Perception relying on hearing or smell", 0]]
		},

		"subclassfeature3.1" : {
			name : "Hybrid Transformation",
			minlevel : 3,
			description : desc([
				"Bonus Action: Transform into a hybrid lycanthropy form",
				'See the "Notes" page for the full rules of this hybrid form'
			]),
			usages : levels.map(function(n) { return n < 3 ? "" : n < 11 ? 1 : n < 18 ? 2 : "\u221E\u00D7 per "; }),
			recovery : "short rest",
			action : [["bonus action", " (start/end)"], ["bonus action", "Predatory Strike (with Attack action)"]],
			savetxt : { text : ["Adv. on Str saves in hybrid form"] },
			weaponsAdd : ["Predatory Strike"],
			weaponOptions : [{
				baseWeapon : "unarmed strike",
				regExpSearch : /^(?=.*predatory)(?=.*strike).*$/i,
				name : "Predatory Strike",
				description : "Finesse; Only in hybrid form; If used in Attack action, attack once as bonus action",
				damage : [1, 6, "slashing"],
				isPredatoryStrikes : true
			}],
			calcChanges : {
				atkCalc : [
					function(fields, v, output) {
						if (v.isMeleeWeapon && classes.known['blood hunter'] && classes.known['blood hunter'].level && ((/\b(lycan|hybrid)\b/i).test(v.WeaponTextName) || v.theWea.isPredatoryStrikes)) {
							var lvl = classes.known['blood hunter'].level;
							output.extraDmg += lvl < 3 ? 0 : lvl < 11 ? 1 : lvl < 18 ? 2 : 3;
						}
					},
					"Include 'Lycan' or 'Hybrid' in a melee weapon's name to add +1 to damage rolls. This bonus increases to +2 at 11th level and +3 at 18th level in the blood hunter class"
				]
			},
			changeeval : function(v) {
				ClassList["blood hunter"].updateHybridForm(v[0], v[1]);
			}
		},

		"subclassfeature7" : {
			name : "Stalker's Prowess",
			minlevel : 7,
			description : desc([
				"Gain +10 ft speed, +10 ft to long jump distance, and +3 ft to high jump distance",
				'Gain the Improved Predatory Strikes feature, see "Notes" page'
			]),
			speed : { allModes : "+10" },
			calcChanges : {
				atkCalc : [
					function(fields, v, output) {
						if (v.theWea.isPredatoryStrikes && classes.known['blood hunter'] && classes.known['blood hunter'].level) {
							var lvl = classes.known['blood hunter'].level;
							output.extraHit += lvl < 7 ? 0 : lvl < 11 ? 1 : lvl < 18 ? 2 : 3;
						}
					},
					"Add +1 to attack rolls for my predatory strikes at level 7. This bonus increases to +2 at 11th level and +3 at 18th level in the blood hunter class"
				],
				atkAdd : [
					function(fields, v) {
						if (v.theWea.isPredatoryStrikes && classes.known['blood hunter'] && classes.known['blood hunter'].level && classes.known['blood hunter'].level >= 7) {
							fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical if a rite is active';
						}
					},
					"Predatory strike attacks count as magical when a rite is active"
				]
			}
		},

		"subclassfeature11" : {
			name : "Advanced Transformation",
			minlevel : 11,
			description : desc([ 'Gain the Lycan Regeneration feature, see "Notes" page' ]),
			calcChanges : {
				atkCalc : [
					function(fields, v, output) {
						if (v.theWea.isPredatoryStrikes && classes.known['blood hunter'] && classes.known['blood hunter'].level && classes.known['blood hunter'].level >= 11) {
							try {
								var curDie = eval_ish(fields.Damage_Die.replace('d', '*'));
							} catch (e) {
								var curDie = 'x';
							};
							if (isNaN(curDie) || curDie < 8) {
								output.die = '1d8';
							};
						}
					},
					"Predatory strikes damage increases from 1d6 to 1d8 at 11th level"
				]
			}
		},

		"subclassfeature15" : {
			name : "Brand of the Voracious",
			minlevel : 15,
			description : desc([
				"Gain advantage on Wisdom saves to maintain control of blood lust in hybrid form",
				"While in hybrid form, gain advantage on attacks against a branded creature"
			]),
			savetxt : { text : ["Adv. on Wis saves to control blood lust"] },
			"blood curse of the howl" : {
				name : "Blood Curse of the Howl",
				extraname : "Order of the Lycan 18; Blood Curse",
				description : desc([
					"Action: Choose creatures within 30 ft that can hear you howl to make a Wis save",
					"Fail: Creature is frightened (stunned if failed by 5 or more), until the end of your next turn",
					"Success: Creature is immune to this blood curse for the next 24 hours",
					"\u2022 Amplify: The range of the curse increases to 60 ft"
				]),
				action : [["action", ""]]
			},
			autoSelectExtrachoices : [{
				extrachoice : "blood curse of the howl",
				minlevel : 18
			}]
		}
	}
});

AddSubClass("blood hunter", "mutant", {
	regExpSearch : /^(?=.*blood)(?=.*hunter)(?=.*mutant).*$/i,
	subname : "Order of the Mutant",
	features : {
		"subclassfeature3" : {
			name : "Mutagencraft",
			minlevel : 3,
			description : levels.map(function (n) {
				return n < 3 ? "" : desc([
					"You can craft " + (n < 7 ? 1 : n < 15 ? 2 : 3) + " mutagen" + (n < 7 ? "" : "s") + " during any rest from known formulas",
					"When learning a new formula, a known formula can also be swapped for a new one",
					"Bonus Action: Consume a mutagen (can only affect you); Action: End all mutagen effects.",
					"A mutagen and its effects last until any rest is finished, unless specified"
				]);
			}),
			usages : levels.map(function (n) { return n < 3 ? "" : n < 7 ? 1 : n < 15 ? 2 : 3; }),
			recovery : "short rest",
			action : [
				["bonus action", " (consume Mutagen)"],
				["action", " (end all Mutagens)"]
			],
			additional : levels.map(function (n) { return n < 3 ? "" : (n < 7 ? 4 : n < 11 ? 5 : n < 15 ? 6 : n < 18 ? 7 : 8) + " formulas known"; }),
			extraname : "Mutagen Formula",
			extrachoices : [
				"Aether (prereq: level 11 blood hunter)",
				"Alluring",
				"Celerity",
				"Conversant",
				"Cruelty (prereq: level 11 blood hunter)",
				"Deftness",
				"Embers",
				"Gelid",
				"Impermeable",
				"Mobility",
				"Nighteye",
				"Percipient",
				"Potency",
				"Precision (prereq: level 11 blood hunter)",
				"Rapidity",
				"Reconstruction (prereq: level 7 blood hunter)",
				"Sagacity",
				"Shielded",
				"Unbreakable",
				"Vermillion"
			],
			extraTimes : levels.map(function (n) {
				return n < 3 ? 0 : n < 7 ? 4 : n < 11 ? 5 : n < 15 ? 6 : n < 18 ? 7 : 8;
			}),
			"aether (prereq: level 11 blood hunter)" : {
				name : "Aether",
				description : desc([
					"20 ft flying speed for 1 hour",
					"\u2022 Side effect: Disadvantage on Str/Dex ability checks for duration"
				]),
				prereqeval : function() { return classes.known['blood hunter'].level >= 11 }
			},
			"alluring" : {
				name : "Alluring",
				description : desc([
					"Advantage on Cha ability checks",
					"\u2022 Side effect: Disadvantage on Initiative rolls"
				])
			},
			"celerity" : {
				name : "Celerity",
				description : levels.map(function (n) {
					var descr = n < 11 ? "Dex score and max increase by 3. They increase by 4 at level 11 and by 5 at level 18" : n < 18 ? "Dex score and max increase by 4. They increase by 5 at level 18" : "Dex score and max increase by 5";
					return desc([
						descr,
						"\u2022 Side effect: Disadvantage on Wis saving throws"
					]);
				})
			},
			"conversant" : {
				name : "Conversant",
				description : desc([
					"Advantage on Int ability checks",
					"\u2022 Side effect: Disadvantage on Wis ability checks"
				])
			},
			"cruelty (prereq: level 11 blood hunter)" : {
				name : "Cruelty",
				description : desc([
					"After an attack action, make a single weapon attack as a bonus action",
					"\u2022 Side effect: Disadvantage on Int, Wis, and Cha saving throws"
				]),
				action : [["bonus action", "Cruelty Mutagen (after Attack action)"]],
				prereqeval : function() { return classes.known['blood hunter'].level >= 11 }
			},
			"deftness" : {
				name : "Deftness",
				description : desc([
					"Advantage on Dex ability checks",
					"\u2022 Side effect: Disadvantage on Wis ability checks"
				])
			},
			"embers" : {
				name : "Embers",
				description : desc([
					"Resistance to fire damage",
					"\u2022 Side effect: Vulnerability to cold damage"
				])
			},
			"gelid" : {
				name : "Gelid",
				description : desc([
					"Resistance to cold damage",
					"\u2022 Side effect: Vulnerability to fire damage"
				])
			},
			"impermeable" : {
				name : "Impermeable",
				description : desc([
					"Resistance to piercing damage",
					"\u2022 Side effect: Vulnerability to slashing damage"
				])
			},
			"mobility" : {
				name : "Mobility",
				description : levels.map(function (n) {
					var descr = n < 11 ? "Immune to grappled and restrained conditions; At 11th level also paralyzed" : "Immune to grappled, restrained, and paralyzed conditions";
					return desc([
						descr,
						"\u2022 Side effect: Disadvantage on Strength checks"
					]);
				})
			},
			"nighteye" : {
				name : "Nighteye",
				description : desc([
					"Darkvision up to 60 ft, or add an extra 60 ft to pre-existing darkvision",
					"\u2022 Side effect: Sunlight sensitivity (disadvantage on Wis (Perception))"
				])
			},
			"percipient" : {
				name : "Percipient",
				description : desc([
					"Advantage on Wis ability checks",
					"\u2022 Side effect: Disadvantage on Cha ability checks"
				])
			},
			"potency" : {
				name : "Potency",
				description : levels.map(function (n) {
					var descr = n < 11 ? "Str score and max increase by 3. They increase by 4 at level 11 and by 5 at level 18" : n < 18 ? "Str score and max increase by 4. They increase by 5 at level 18" : "Str score and max increase by 5";
					return desc([
						descr,
						"\u2022 Side effect: Disadvantage on Dex saving throws"
					]);
				})
			},
			"precision (prereq: level 11 blood hunter)" : {
				name : "Precision",
				description : desc([
					"Weapon attacks score critical hits on attack rolls of 19 and 20",
					"\u2022 Side effect: Disadvantage on Str saving throws"
				]),
				prereqeval : function() { return classes.known['blood hunter'].level >= 11 }
			},
			"rapidity" : {
				name : "Rapidity",
				description : levels.map(function (n) {
					var descr = n < 15 ? "Speed increases by 10 ft (or by 15 ft at 15th level)" : "Speed increases by 15 ft";
					return desc([
						descr,
						"\u2022 Side effect: Disadvantage on Int ability checks"
					]);
				})
			},
			"reconstruction (prereq: level 7 blood hunter)" : {
				name : "Reconstruction",
				description : desc([
					"For an hour, at the start of your turn, regain hit points equal to your proficiency bonus",
					"This only occurs if you have at least 1 hit point and are below half the hit point maximum",
					"\u2022 Side effect: Speed decreases by 10 ft for the duration"
				]),
				prereqeval : function() { return classes.known['blood hunter'].level >= 7 }
			},
			"sagacity" : {
				name : "Sagacity",
				description : levels.map(function (n) {
					var descr = n < 11 ? "Int score and max increase by 3. They increase by 4 at level 11 and by 5 at level 18" : n < 18 ? "Int score and max increase by 4. They increase by 5 at level 18" : "Int score and max increase by 5";
					return desc([
						descr,
						"\u2022 Side effect: Disadvantage on Charisma saving throws"
					]);
				})
			},
			"shielded" : {
				name : "Shielded",
				description : desc([
					"Resistance to slashing damage",
					"\u2022 Side effect: Vulnerability to bludgeoning damage"
				])
			},
			"unbreakable" : {
				name : "Unbreakable",
				description : desc([
					"Resistance to bludgeoning damage",
					"\u2022 Side effect: Vulnerability to piercing damage"
				])
			},
			"vermillion" : {
				name : "Vermillion",
				description : desc([
					"Additional use of blood maledict",
					"\u2022 Side effect: Disadvantage on death saving throws"
				])
			}
		},

		"subclassfeature7" : {
			name : "Strange Metabolism",
			minlevel : 7,
			description : desc([
				"Gain immunity to poison",
				"Bonus Action: Ignore side effects of a mutagen for 1 min (once per long rest)"
			]),
			action : [['bonus action', '']],
			savetxt : { immune : ["poison"] },
			usages : 1,
			recovery : "long rest"
		},

		"subclassfeature11" : {
			name : "Brand of Axiom",
			minlevel : 11,
			description : desc([
				"A branded creature can't benefit from illusion magic to disguise it or make it invisible",
				"Also, if it's polymorphed or has changed shape when branded or tries to do so during,",
				"It must make a Wis save or its form reverts and it's stunned until my next turn ends"
			]),
			"blood curse of corrosion" : {
				name : "Blood Curse of Corrosion",
				extraname : "Order of the Mutant 15; Blood Curse",
				description : desc([
					"Bonus Action: Poison a creature within 30 ft",
					"At the end of each if its turns, the creature can make a Con save to end the curse",
					"\u2022 Amplify: The target takes 4d6 necrotic damage, and again each time it fails the Con save"
				]),
				action : [["bonus action", ""]]
			},
			autoSelectExtrachoices : [{
				extrachoice : "blood curse of corrosion",
				minlevel : 15
			}]
		},

		"subclassfeature18" : {
			name : "Exalted Mutation",
			minlevel : 18,
			description : desc([
				"As a bonus action, end an active mutagen and activate a different mutagen"
			]),
			action : [['bonus action', ""]],
			usages : "Hemocraft mod per ",
			usagescalc : "event.value = Math.max(1, Math.max(What('Wis Mod'), What('Int Mod'))",
			recovery : "long rest"
		}
	}
});

AddSubClass("blood hunter", "profane soul", {
	regExpSearch : /^(?=.*profane)(?=.*soul).*$/i,
	subname : "Order of the Profane Soul",
	spellcastingFactor : "warlock3",
	spellcastingTable : [
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 0
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 1
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 2
		[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 3
		[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 4
		[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 5
		[2, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 6
		[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 7
		[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 8
		[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 9
		[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl10
		[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl11
		[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl12
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl13
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl14
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl15
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl16
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl17
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl18
		[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl19
		[0, 0, 0, 2, 0, 0, 0, 0, 0]  //lvl20
	],
	spellcastingKnown : {
		cantrips : [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		spells : [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 11]
	},
	spellcastingList : {
		class : "warlock",
		level : [0, 4]
	},
	features : {
		"subclassfeature3" : {
			name : "Otherwordly Patron",
			minlevel : 3,
			description : '\n   Use "Choose Feature" button for Otherwordly Patron',
			choices : [ "The Archfey",
						"The Celestial",
						"The Fathomless",
						"The Fiend",
						"The Genie",
						"The Great Old One",
						"The Hexblade",
						"The Undead",
						"The Undying"
					],
			"the archfey" : {
				name : "Rite Focus: The Archfey",
				description : desc([
					"After dealing rite damage to a creature, it glows with faint light and does not benefit from any",
					"cover or invisibility until the end of your next turn",
				])
			},
			"the celestial" : {
				name : "Rite Focus: The Celestial",
				description : "\n   Bonus Action: Expend blood maledict use to heal a visible creature within 60 ft",
				additional : levels.map(function (n) {
					return n < 3 ? "" : "heals " + BHhemocraftDie(n) + "+ Hemocraft modifier";
				}),
				action : [["bonus action", ""]]
			},
			"the fathomless" : {
				name: "Rite Focus: The Fathomless",
				description: desc([
					"You can breathe underwater. After dealing rite damage to a creature, reduce its speed by",
					"10 ft until the start of your next turn (once per turn)",
				])
			},
			"the fiend" : {
				name : "Rite Focus: The Fiend",
				description : "\n   When using the rite of the flame, reroll a 1 or 2 on the rite damage die once"
			},
			"the genie" : {
				name : "Rite Focus: The Genie",
				description : "\n   Bonus Action: Expend blood maledict use to gain 30 ft flying speed",
				additional : levels.map(function (n) {
					return n < 3 ? "" : "lasts Hemocraft modifier number of rounds";
				}),
				action : [["bonus action", ""]]
			},
			"the great old one" : {
				name : "Rite Focus: The Great Old One",
				description : desc([
					"After a critical hit, the target and any other creatures of choice within 10 ft are frightened",
					"until the end of your next turn",
				])
			},
			"the hexblade" : {
				name : "Rite Focus: The Hexblade",
				description : "\n   After blood cursing a target, add Prof bonus to next attack against it while curse is active"
			},
			"the undead" : {
				name : "Rite Focus: The Undead",
				description : "\n   Reaction: Reduce necrotic damage by half, and your appearance changes while any rite is active",
				action : [["reaction", ""]]
			},
			"the undying" : {
				name : "Rite Focus: The Undying",
				description : "\n   After reducing a hostile creature to 0 HP, heal HP",
				additional : levels.map(function (n) {
					return n < 3 ? "" : "regain " + BHhemocraftDie(n) + " HP";
				})
			},
			choiceDependencies : [{
				feature : "subclassfeature7.1"
			}, {
				feature : "subclassfeature15"
			}]
		},
		"subclassfeature3.1" : {
			name : "Pact Magic",
			minlevel : 3,
			description : desc([
				"Cast warlock cantrips/spells you know using your Hemocraft ability for spellcasting ability",
				"Use your rite-imbued weapon as a spellcasting focus; You regain spell slots on a short rest"
			]),
			additional : levels.map(function (n, idx) {
				var cantr = [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3][idx];
				var splls = [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 11][idx];
				return n < 3 ? "" : cantr + " cantrips \u0026 " + splls + " spells known";
			})
		},
		"subclassfeature7" : {
			name : "Mystic Frenzy",
			minlevel : 7,
			description : "\n   After casting a cantrip as an action, make one weapon attack as a bonus action",
			action : [["bonus action", " (with cantrip)"]]
		},
		"subclassfeature7.1" : {
			name : "Revealed Arcana",
			minlevel : 7,
			description : '\n   Use "Choose Feature" button for Otherwordly Patron',
			usages : 1,
			recovery : "long rest",
			"the archfey" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, cast Blur by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["blur"],
					selection : ["blur"],
					firstCol : "oncelr"
				}
			},
			"the celestial" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, cast Lesser Restoration by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["Lesser Restoration"],
					selection : ["Lesser Restoration"],
					firstCol : "oncelr"
				}
			},
			"the fathomless" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, cast Gust of Wind by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["Gust of Wind"],
					selection : ["Gust of Wind"],
					firstCol : "oncelr"
				}
			},
			"the fiend" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, cast Scorching Ray by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["Scorching Ray"],
					selection : ["Scorching Ray"],
					firstCol : "oncelr"
				}
			},
			"the genie" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, cast Phantasmal Force by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["Phantasmal Force"],
					selection : ["Phantasmal Force"],
					firstCol : "oncelr"
				}
			},
			"the great old one" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, cast Detect Thoughts by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["Detect Thoughts"],
					selection : ["Detect Thoughts"],
					firstCol : "oncelr"
				}
			},
			"the hexblade" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, cast Branding Smite by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["Branding Smite"],
					selection : ["Branding Smite"],
					firstCol : "oncelr"
				}
			},
			"the undead" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, cast Blindness/Deafness by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["Blindness/Deafness"],
					selection : ["Blindness/Deafness"],
					firstCol : "oncelr"
				}
			},
			"the undying" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, cast Silence by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["Silence"],
					selection : ["Silence"],
					firstCol : "oncelr"
				}
			},
		},

		"subclassfeature11" : {
			name : "Brand of the Sapping Scar",
			minlevel : 11,
			description : "\n   A branded creature has disadvantage on saves against your warlock spells"
		},

		"subclassfeature15" : {
			name : "Unsealed Arcana",
			minlevel : 15,
			description : '\n   Use "Choose Feature" button for Otherwordly Patron',
			usages : 1,
			recovery : "long rest",
			"the archfey" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, cast Slow by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["Slow"],
					selection : ["Slow"],
					firstCol : "oncelr"
				}
			},
			"the celestial" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, cast Revivify by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["Revivify"],
					selection : ["Revivify"],
					firstCol : "oncelr"
				}
			},
			"the fathomless" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, cast Lightning Bolt by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["Lightning Bolt"],
					selection : ["Lightning Bolt"],
					firstCol : "oncelr"
				}
			},
			"the fiend" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, cast Fireball by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["Fireball"],
					selection : ["Fireball"],
					firstCol : "oncelr"
				}
			},
			"the genie" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, cast Protection From Energy by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["Protection From Energy"],
					selection : ["Protection From Energy"],
					firstCol : "oncelr"
				}
			},
			"the great old one" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, cast Haste by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["Haste"],
					selection : ["Haste"],
					firstCol : "oncelr"
				}
			},
			"the hexblade" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, cast Blink by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["Blink"],
					selection : ["Blink"],
					firstCol : "oncelr"
				}
			},
			"the undead" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, cast Speak With Dead by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["Speak With Dead"],
					selection : ["Speak With Dead"],
					firstCol : "oncelr"
				}
			},
			"the undying" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, cast Bestow Curse by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["Bestow Curse"],
					selection : ["Bestow Curse"],
					firstCol : "oncelr"
				}
			},
			"blood curse of the souleater" : {
				name : "Blood Curse of the Souleater",
				extraname : "Order of the Profane Soul 18; Blood Curse",
				description : " [Amplify 1\xD7 per long rest]" + desc([
					"Reaction: when a living creature (not construct/undead) is reduced to 0 HP in 30 ft,",
					"gain advantage on weapon attacks and resistance to damage until the end of your next turn",
					"\u2022 Amplify (once per long rest): Regain an expended warlock spell slot"
				]),
				action : [["reaction", ""]],
				extraLimitedFeatures : [{
					name : "Amplify Blood Curse of the Souleater",
					usages : 1,
					recovery : "long rest"
				}]
			},
			autoSelectExtrachoices : [{
				extrachoice : "blood curse of the souleater",
				minlevel : 18
			}]
		}
	}
});
