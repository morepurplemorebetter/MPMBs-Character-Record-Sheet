/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Class
	Effect:     This script adds the class called "Artificer" by "XP or Level 3"
				This class does not have any subclasses, but instead has a system of 'inventions'

				The Improved Artificer was made by XP or Level 3 and can be found on their Patreon (https://www.patreon.com/posts/improved-class-20621279)

	Code by:	MorePurpleMoreBetter
	Date:		2018-12-11 (sheet v13.0.0beta7)

	Please support the creators of this content (XP or Level 3) on their Patreon (https://www.patreon.com/xptolevel3)

	Caution:	MorePurpleMoreBetter advises against using this class as it breaks game balance (many of its inventions are clearly overpowered). This code was made on commission for a patron.
*/

/*  -IMPORTANT-
	The class' name is "artificer" and will therefor conflict with the Artificer from Unearthed Arcana.
	If you include both this script and the UA:A source, you will notice that the class here is used as its source is more recent.
	It is recommended to have either this source or the UA:A source included, but never both, as they might interfere with each other.

	Some upgrades for Clockwork Constructs can be taken multiple times according to their rules.
	However, the sheet doesn't have a way to accommodate this, so you can only take it once.
	To take a Clockwork Construct upgrade multiple times, apply its changes manually.

	As no multiclassing rules are given in the source, the ones here are an interpretation by MPMB.
*/

var iFileName = "Improved Artificer [XP to Level 3, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["XPtL3:IA"] = {
	name : "XP to Level 3: Improved Artificer",
	abbreviation : "XPtL3:IA",
	group : "XP to Level 3",
	url : "https://drive.google.com/file/d/1jeqp5Ls9paEh0yZ0vyhJRoNKCJ4yARf2/view?usp=drive_open",
	date : "2018/08/08"
};

// Get the sheet to know which spells are artificer spells
[
	// level 1
	"alarm",
	"cure wounds",
	"disguise self",
	"expeditious retreat",
	"false life",
	"jump",
	"longstrider",
	"sanctuary",
	"shield of faith",
	// level 2
	"aid",
	"alter self",
	"arcane lock",
	"blur",
	"continual flame",
	"darkvision",
	"enhance ability",
	"enlarge/reduce",
	"invisibility",
	"lesser restoration",
	"levitate",
	"magic weapon",
	"protection from poison",
	"rope trick",
	"see invisibility",
	"spider climb",
	// level 3
	"blink",
	"fly",
	"gaseous form",
	"glyph of warding",
	"haste",
	"protection from energy",
	"revivify",
	"water breathing",
	"water walk",
	// level 4
	"arcane eye",
	"death ward",
	"fabricate",
	"freedom of movement",
	"leomund's secret chest",
	"mordenkainen's faithful hound",
	"mordenkainen's private sanctum",
	"otiluke's resilient sphere",
	"stone shape",
	"stoneskin"
].forEach( function (s) {
	if(SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("improved artificer") === -1) SpellsList[s].classes.push("improved artificer");
});

// Create the improved artificer class
ClassList["improved artificer"] = {
	regExpSearch : /^(?=.*artificer)(?!.*wizard).*$/i,
	name : "Artificer",
	source : ["XPtL3:IA", 1],
	primaryAbility : "Intelligence",
	abilitySave : 4,
	prereqs : "Intelligence 13",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5],
	die : 8,
	saves : ["Con", "Int"],
	skillstxt : [
		"Choose three from Arcana, Deception, History, Investigation, Medicine, Nature, Religion, and Sleight of Hand",
		"Choose one from Arcana, Deception, History, Investigation, Medicine, Nature, Religion, and Sleight of Hand"
	],
	toolProfs : {
		primary : [["Tinker's tools"], ["Any tool", 2]],
		secondary : [["Any tool", 1]]
	},
	armorProfs : [
		[true, true, false, false]
	],
	weaponProfs : [
		[true, false]
	],
	equipment : "Artificer starting equipment:\n \u2022 A handaxe and a light hammer -or- any two simple weapons;\n \u2022 Scale mail -or- studded leather armor;\n \u2022 A light crossbow and 20 bolts;\n \u2022 A dungeoneer's pack;\n \u2022 Tinker's tools.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : 3,
	spellcastingKnown : {
		spells : [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13]
	},
	features : {
		"invention points" : {
			name : "Invention Points",
			source : ["XPtL3:IA", 2],
			minlevel : 1,
			description : desc([
				"I can create inventions or upgrade them by spending invention points",
				'Use the "Choose Feature" button above to add an invention or upgrade to the third page',
				"I can save points up to spend at a later time, when I see fit, but I never get back points"
			]),
			usages : levels.map(function (n) {
				return n * 2 + (n < 5 ? 0 : n < 10 ? 2 : n < 15 ? 6 : n < 20 ? 12 : 22);
			}),
			recovery : "Never"
		},
		"inventions: alchemy" : {
			name : "Inventions: Alchemy",
			source : ["XPtL3:IA", 4],
			minlevel : 1,
			description : desc([
				"Once I create an alchemical invention, I can continue to do so without using more points"
			]),
			extraname : "Alchemical Invention",
			extrachoices : ["Alchemical Acid (2 invention points)", "Alchemical Fire (2 invention points)", "Healing Draught (2 invention points)", "Smoke Stick (2 invention points)", "Swift Step Draught (2 invention points)", "Tanglefoot Bag (2 invention points)", "Thunderstone (2 invention points)"],
			"alchemical acid (2 invention points)" : {
				name : "Alchemical Acid",
				source : ["XPtL3:IA", 4],
				minlevel : 1,
				description : desc([
					"As an action, I can hurl a vial of acid at a creature or object within 30 ft",
					"It shatters on impact and the target must succeed on a Dex save or take acid damage"
				]),
				additional : levels.map(function (n) {
					return "2 points; " + Math.ceil(n / 2) + "d6 acid damage";
				}),
				action : ["action", ""],
				weaponOptions : {
					regExpSearch : /^(?=.*alchemical)(?=.*acid).*$/i,
					name : "Alchemical Acid",
					source : ["XPtL3:IA", 4],
					list : "improved artificer",
					ability : 4,
					type : "Alchemical Invention",
					damage : [1, 6, "acid"],
					range : "30 ft",
					weight : 0,
					description : "Dex save, success - no damage",
					abilitytodamage : false,
					dc : true,
					artAlcAcid : true
				},
				addWeapons : ['Alchemical Acid'],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artAlcAcid && classes.known['improved artificer'] && classes.known['improved artificer'].level) {
								fields.Proficiency = true;
								fields.Damage_Die = Math.ceil(classes.known['improved artificer'].level / 2) + 'd6';
							};
						}, ""]
				}
			},
			"alchemical fire (2 invention points)" : {
				name : "Alchemical Fire",
				source : ["XPtL3:IA", 4],
				minlevel : 1,
				description : desc([
					"As an action, I can hurl a vial of volatile liquid at a creature/object/surface within 30 ft",
					"It explodes and all within a 5-ft radius must succeed on a Dex save or take fire damage"
				]),
				additional : levels.map(function (n) {
					return "2 points; " + Math.ceil(n / 3) + "d6 fire damage";
				}),
				action : ["action", ""],
				weaponOptions : {
					regExpSearch : /^(?=.*alchemical)(?=.*fire).*$/i,
					name : "Alchemical Fire",
					source : ["XPtL3:IA", 4],
					list : "improved artificer",
					ability : 4,
					type : "Alchemical Invention",
					damage : [1, 6, "fire"],
					range : "30 ft",
					weight : 0,
					description : "Dex save, success - no damage; All creatures within 5-ft of the point of impact have to save",
					abilitytodamage : false,
					dc : true,
					artAlcFire : true
				},
				addWeapons : ['Alchemical Fire'],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artAlcFire && classes.known['improved artificer'] && classes.known['improved artificer'].level) {
								fields.Proficiency = true;
								fields.Damage_Die = Math.ceil(classes.known['improved artificer'].level / 3) + 'd6';
							};
						}, ""]
				}
			},
			"healing draught (2 invention points)" : {
				name : "Healing Draught",
				source : ["XPtL3:IA", 4],
				description : desc([
					"As an action, I can pull out a vial of healing liquid that can be drunk as an action",
					"One vial heals a number of d8 equal to half my artificer level (rounded up) in HP",
					"After being healed this way, a creature can't do so again until it finishes a long rest"
				]),
				action : ["action", ""],
				additional : levels.map(function (n) {
					return "2 points; " + "Heals " + Math.ceil(n / 2) + "d8";
				})
			},
			"smoke stick (2 invention points)" : {
				name : "Smoke Stick",
				source : ["XPtL3:IA", 5],
				description : desc([
					"As an action, I can pull out a smoke stick and throw it up to 30 ft away",
					"The stick produces smoke in a 10-ft radius around it, blocking vision, incl. darkvision",
					"It disappears after 1 minute; After creating one, I can't create a new one for 1 minute"
				]),
				action : ["action", ""]
			},
			"swift step draught (2 invention points)" : {
				name : "Swift Step Draught",
				source : ["XPtL3:IA", 5],
				description : desc([
					"As a bonus action, I take a vial of brown liquid from my satchel, which lasts for 1 minute",
					"Any creature can drink this vial as an action, gaining +20 ft speed for 1 minute",
					"After creating one, I can't create a new one for 1 minute"
				]),
				action : ["bonus action", ""],
				additional : "2 points"
			},
			"tanglefoot bag (2 invention points)" : {
				name : "Tanglefoot Bag",
				source : ["XPtL3:IA", 5],
				description : desc([
					"As an action, I can hurl a bag of black tar to a point on the ground within 30 ft",
					"It bursts and all creatures in a 5-ft radius must make a Dex save or be restrained",
					"It also covers the ground in the same radius with sticky goo, making it difficult terrain",
					"Anyone starting its turn in the area has its speed halved for the remainder of that turn",
					"This lasts for 1 minute; After creating one, I can't create a new one for 1 minute"
				]),
				action : ["action", ""],
				additional : "2 points"
			},
			"thunderstone (2 invention points)" : {
				name : "Thunderstone",
				source : ["XPtL3:IA", 5],
				description : desc([
					"As an action, I can hurl a crystalline shard at a creature/object/surface within 30 ft",
					"It shatters on impact and any creature within 10 ft must make a Constitution save",
					"If failed, a creature is knocked prone and pushed 10 ft away from the point of impact",
					"Spellcasters caught in it must make on a concentration save with disadv. to maintain conc."
				]),
				action : ["action", ""],
				additional : "2 points"
			}
		},
		"inventions: arcanic firearms" : {
			name : "Inventions: Arcanic Firearms",
			source : ["XPtL3:IA", 5],
			minlevel : 1,
			description : desc([
				"Ammunition for arcanic firearms can only be crafted using tinker's tools",
				"It takes 1 hour to craft 5gp of materials into 10 rounds, which can be used by any gun",
				"Firearms misfire on an attack roll of 1 or if anybody else uses it; On a misfire, roll 1d6:",
				" \u2022 On a 1-5 the shot is a dud and requires an action to fix the gun",
				" \u2022 On a 6 it backfires and I take the weapon's damage, Dex save for half"
			]),
			extraname : "Arcanic Firearm",
			extrachoices : [
				"Dual Pistols (2 invention points)", "Dual Pistols: Increase Rate of Fire (1 invention point)", "Dual Pistols: Increase Damage to 1d6 (2 invention points)", "Dual Pistols: Increase Damage to 1d8 (3 invention points; prereq: Increase Damage to 1d6)", "Dual Pistols: Magical Attacks (2 invention points)", "Dual Pistols: Increase Reload Speed (3 invention points)", "Dual Pistols: Rapid Fire (3 invention points)",
				"Blunderbuss (2 invention points)", "Blunderbuss: Increase Rate of Fire to 4 (2 invention points)", "Blunderbuss: Increase Rate of Fire to 6 (2 invention points; prereq: Increase Rate of Fire to 4)", "Blunderbuss: Magical Attacks (2 invention points)", "Blunderbuss: Increase Damage to d8 (2 invention points)", "Blunderbuss: Increase Damage to d10 (3 invention points; prereq: Increase Damage to d8)", "Blunderbuss: Knockdown (2 invention points)",
				"Sniper Rifle (2 invention points)", "Sniper Rifle: Increase Rate of Fire (2 invention points)", "Sniper Rifle: Increase Range (2 invention points)", "Sniper Rifle: Magical Attacks (2 invention points)", "Sniper Rifle: Increase Damage to 2d10 (2 invention points)", "Sniper Rifle: Increase Damage to 3d10 (3 invention points; prereq: Increase Damage to 2d10)", "Sniper Rifle: Aimed Fire (4 invention points)"
			],
			"dual pistols (2 invention points)" : {
				name : "Dual Pistols",
				source : ["XPtL3:IA", 5],
				description : desc([
					"These pistols work as if dual wielding, but don't count as such for feats and the like",
					"To hit is Dex mod + Proficiency Bonus; Damage is 1d4 piercing + Intelligence modifier",
					"They have to be reloaded after every 3 shots, taking 1 action to reload both"
				]),
				weaponOptions : {
					regExpSearch : /^(?=.*dual)(?=.*pistols).*$/i,
					name : "Dual Pistols",
					source : ["XPtL3:IA", 5],
					list : "improved artificer",
					ability : 2,
					type : "Arcanic Firearm",
					damage : [1, 4, "piercing"],
					range : "50/100 ft",
					weight : 3,
					description : "Ammunition, loading, 3 shots magazine",
					abilitytodamage : false,
					ammo : "arcane magazine",
					modifiers : ["", "Int"],
					artDualPistols : true
				},
				addWeapons : ['Dual Pistols'],
				additional : "2 points",
				action : ["bonus action", "off-hand"],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artDualPistols) fields.Proficiency = true;
						},
						""
					]
				}
			},
			"dual pistols: increase rate of fire (1 invention point)" : {
				name : "Dual Pistols: Increase Rate of Fire",
				source : ["XPtL3:IA", 5],
				description : " [1 point]\n   I can now fire a pistol 5 times before needing to reload",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artDualPistols) {
								fields.Description = fields.Description.replace(/\d+ shots magazine/i, '5 shots magazine');
							}
						},
						"My dual pistols can be shot 5 times before needing to reload."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('dual pistols (2 invention points)') != -1; }
			},
			"dual pistols: increase damage to 1d6 (2 invention points)" : {
				name : "Dual Pistols: Increase Damage to 1d6",
				source : ["XPtL3:IA", 5],
				description : " [2 points]",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artDualPistols && GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('dual pistols: increase damage to 1d8 (3 invention points; prereq: increase damage to 1d6)') == -1) {
								fields.Damage_Die = '1d6';
							}
						},
						"My dual pistols deal 1d6 damage instead of 1d4."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('dual pistols (2 invention points)') != -1; }
			},
			"dual pistols: increase damage to 1d8 (3 invention points; prereq: increase damage to 1d6)" : {
				name : "Dual Pistols: Increase Damage to 1d8",
				source : ["XPtL3:IA", 5],
				description : " [3 points]",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artDualPistols) fields.Damage_Die = '1d8';
						},
						"My dual pistols deal 1d8 damage instead of 1d6."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('dual pistols (2 invention points)') != -1 && GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('dual pistols: increase damage to 1d6 (2 invention points)') != -1; }
			},
			"dual pistols: magical attacks (2 invention points)" : {
				name : "Dual Pistols: Magical Attacks",
				source : ["XPtL3:IA", 5],
				description : " [2 points; counts as magical]",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artDualPistols) fields.Description += '; Counts as magical';
						},
						"My dual pistols attacks count as magical for overcoming resistances and damage reduction."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('dual pistols (2 invention points)') != -1; }
			},
			"dual pistols: increase reload speed (3 invention points)" : {
				name : "Dual Pistols: Increase Reload Speed",
				source : ["XPtL3:IA", 5],
				description : " [3 points]\n   I now only require a bonus action to reload both pistols",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artDualPistols) fields.Description += '; Bonus action to reload';
						},
						"My dual pistols can be reloaded as a bonus action instead of an action."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('dual pistols (2 invention points)') != -1; }
			},
			"dual pistols: rapid fire (3 invention points)" : {
				name : "Dual Pistols: Rapid Fire",
				source : ["XPtL3:IA", 5],
				description : "\n   As an action, I can fire my dual pistols each 2 times, for a total of 4 attacks",
				additional : "3 points",
				usages: "Int mod per ",
				usagescalc: "event.value = Math.max(1, What('Int Mod'));",
				recovery: "long rest",
				action : ["action", ""],
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('dual pistols (2 invention points)') != -1; }
			},
			"blunderbuss (2 invention points)" : {
				name : "Blunderbuss",
				source : ["XPtL3:IA", 6],
				description : desc([
					"This firearm does increased damage at short range, but adds no ability mod to damage",
					"It has to be reloaded after every 2 shots, taking 1 action to reload"
				]),
				weaponOptions : {
					regExpSearch : /blunderbuss/i,
					name : "Blunderbuss",
					source : ["XPtL3:IA", 6],
					list : "improved artificer",
					ability : 2,
					type : "Arcanic Firearm",
					damage : [1, 6, "piercing"],
					range : "30/60 ft",
					weight : 8,
					description : "Ammunition, loading, 2 shots magazine, two-handed; +1d6 damage in 20 ft or +2d6 in 10 ft",
					abilitytodamage : false,
					ammo : "arcane magazine",
					artBlunderbuss : true
				},
				addWeapons : ['Blunderbuss'],
				additional : "2 points",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artBlunderbuss) fields.Proficiency = true;
						},
						""
					]
				}
			},
			"blunderbuss: increase rate of fire to 4 (2 invention points)" : {
				name : "Blunderbuss: Increase Rate of Fire to 4",
				source : ["XPtL3:IA", 6],
				description : " [2 points]\n   I can now fire a blunderbuss 4 times before needing to reload",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artBlunderbuss && GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('blunderbuss: increase rate of fire to 6 (2 invention points; prereq: increase rate of fire to 4)') == -1) {
								fields.Description = fields.Description.replace(/\d+ shots magazine/i, '4 shots magazine');
							}
						},
						"My blunderbuss can be shot 4 times before needing to reload."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('blunderbuss (2 invention points)') != -1; }
			},
			"blunderbuss: increase rate of fire to 6 (2 invention points; prereq: increase rate of fire to 4)" : {
				name : "Blunderbuss: Increase Rate of Fire to 6",
				source : ["XPtL3:IA", 6],
				description : " [2 points]\n   I can now fire a blunderbuss 6 times before needing to reload",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artBlunderbuss) {
								fields.Description = fields.Description.replace(/\d+ shots magazine/i, '6 shots magazine');
							}
						},
						"My blunderbuss can be shot 6 times before needing to reload."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('blunderbuss (2 invention points)') != -1 && GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('blunderbuss: increase rate of fire to 4 (2 invention points)') != -1; }
			},
			"blunderbuss: magical attacks (2 invention points)" : {
				name : "Blunderbuss: Magical Attacks",
				source : ["XPtL3:IA", 6],
				description : " [2 points; counts as magical]",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artBlunderbuss) fields.Description += '; Counts as magical';
						},
						"My blunderbuss attacks count as magical for overcoming resistances and damage reduction."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('blunderbuss (2 invention points)') != -1; }
			},
			"blunderbuss: increase damage to d8 (2 invention points)" : {
				name : "Blunderbuss: Increase Damage to d8",
				source : ["XPtL3:IA", 6],
				description : " [2 points]",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artBlunderbuss && GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('blunderbuss: increase damage to d10 (3 invention points; prereq: increase damage to d8)') == -1) {
								fields.Damage_Die = '1d8';
								fields.Description = fields.Description.replace(/\+(1|2)d6/ig, '+$1d8');
							}
						},
						"My blunderbuss deals d8 damage instead of d6."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('blunderbuss (2 invention points)') != -1; }
			},
			"blunderbuss: increase damage to d10 (3 invention points; prereq: increase damage to d8)" : {
				name : "Blunderbuss: Increase Damage to d10",
				source : ["XPtL3:IA", 6],
				description : " [3 points]",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artBlunderbuss) {
								fields.Damage_Die = '1d10';
								fields.Description = fields.Description.replace(/\+(1|2)d(6|8)/ig, '+$1d10');
							}
						},
						"My blunderbuss deals d10 damage instead of d8."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('blunderbuss (2 invention points)') != -1 && GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('blunderbuss: increase damage to 1d8 (2 invention points)') != -1; }
			},
			"blunderbuss: knockdown (2 invention points)" : {
				name : "Blunderbuss: Knockdown",
				source : ["XPtL3:IA", 6],
				description : "\n   When I hit with my blunderbuss, I can have the target take a Dex save or be knocked prone",
				additional : "2 points",
				usages: "Int mod per ",
				usagescalc: "event.value = Math.max(1, What('Int Mod'));",
				recovery: "long rest",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('blunderbuss (2 invention points)') != -1; }
			},
			"sniper rifle (2 invention points)" : {
				name : "Sniper Rifle",
				source : ["XPtL3:IA", 5],
				description : desc([
					"To hit is Dex mod + Proficiency Bonus; Damage is 1d10 piercing + Intelligence modifier",
					"It has to be reloaded after every 3 shots, taking 1 action to reload"
				]),
				weaponOptions : {
					regExpSearch : /^(?=.*sniper)(?=.*rifle).*$/i,
					name : "Sniper Rifle",
					source : ["XPtL3:IA", 6],
					list : "improved artificer",
					ability : 2,
					type : "Arcanic Firearm",
					damage : [1, 10, "piercing"],
					range : "150/300 ft",
					weight : 10,
					description : "Ammunition, loading, 3 shots magazine, two-handed",
					abilitytodamage : false,
					ammo : "arcane magazine",
					modifiers : ["", "Int"],
					artSniperRifle : true
				},
				addWeapons : ['Sniper Rifle'],
				additional : "2 points",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artSniperRifle) fields.Proficiency = true;
						},
						""
					]
				}
			},
			"sniper rifle: increase rate of fire (2 invention points)" : {
				name : "Sniper Rifle: Increase Rate of Fire",
				source : ["XPtL3:IA", 6],
				description : " [2 points]\n   I can now fire a sniper rifle 5 times before needing to reload",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artSniperRifle) {
								fields.Description = fields.Description.replace(/\d+ shots magazine/i, '5 shots magazine');
							}
						},
						"My sniper rifle can be shot 5 times before needing to reload."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('sniper rifle (2 invention points)') != -1; }
			},
			"sniper rifle: increase range (2 invention points)" : {
				name : "Sniper Rifle: Increase Range",
				source : ["XPtL3:IA", 6],
				description : " [2 points]\n   The range of my sniper rifle increases to 300/450 ft",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artSniperRifle) fields.Range = '300/450 ft');
						},
						"The range of my sniper rifle is now 300/450 ft."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('sniper rifle (2 invention points)') != -1; }
			},
			"sniper rifle: magical attacks (2 invention points)" : {
				name : "Sniper Rifle: Magical Attacks",
				source : ["XPtL3:IA", 6],
				description : " [2 points; counts as magical]",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artSniperRifle) fields.Description += '; Counts as magical';
						},
						"My sniper rifle attacks count as magical for overcoming resistances and damage reduction."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('sniper rifle (2 invention points)') != -1; }
			},
			"sniper rifle: increase damage to 2d10 (2 invention points)" : {
				name : "Sniper Rifle: Increase Damage to 1d10",
				source : ["XPtL3:IA", 6],
				description : " [2 points]",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artSniperRifle && GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('sniper rifle: increase damage to 3d10 (3 invention points; prereq: increase damage to 2d10)') == -1) {
								fields.Damage_Die = '2d10';
							}
						},
						"My sniper rifle deals 2d10 damage instead of 1d10."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('sniper rifle (2 invention points)') != -1; }
			},
			"sniper rifle: increase damage to 3d10 (3 invention points; prereq: increase damage to 2d10)" : {
				name : "Sniper Rifle: Increase Damage to 3d10",
				source : ["XPtL3:IA", 6],
				description : " [3 points]",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artSniperRifle) fields.Damage_Die = '3d10';
						},
						"My sniper rifle deals 3d10 damage instead of 2d10."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('sniper rifle (2 invention points)') != -1 && GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('sniper rifle: increase damage to 2d10 (2 invention points)') != -1; }
			},
			"sniper rifle: aimed fire (4 invention points)" : {
				name : "Sniper Rifle: Aimed Fire",
				source : ["XPtL3:IA", 6],
				description : "\n   When I hit with my sniper rifle, I can have the attack be an automatic critical hit",
				additional : "4 points",
				usages: "Int mod per ",
				usagescalc: "event.value = Math.max(1, What('Int Mod'));",
				recovery: "long rest",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: arcanic firearms', true).indexOf('sniper rifle (2 invention points)') != -1; }
			}
		},
		"inventions: clockwork constructs" : {
			name : "Inventions: Clockwork Constructs",
			source : ["XPtL3:IA", 6],
			minlevel : 1,
			description : desc([
				"I can craft up to three constructs: a drone, fighter, and mount; They look how I want",
				"Clockwork construct heal as normal, using HD during rests, regain HP during long rests",
				"If it dies, I can return it to 1 HP during a long rest if I have access to its remains",
				"Otherwise, I can rebuild it with one week of work (8h/day) and 1000 gp of materials",
				"I know the Mending cantrip which I can use to heal my constructs for my Int mod",
				"I can use spell slots to augment Mending, adding 1d8 healing per spell slot level used"
			]),
			extraname : "Clockwork Construct",
			spellcastingBonus : {
				name : "Clockwork Constructs",
				spells : ["mending"],
				selection : ["mending"],
				firstCol : "atwill"
			},
			extrachoices : [
				"Drone (2 invention points)", "Drone: Increase AC by 1 (2 invention points)", "Drone: Increase Carrying Capacity by 50 lb (2 invention points)", "Drone: Increase Hit Points by 10 (1 invention point)", "Drone: Lockpick (2 invention points)", "Drone: Remote Detonation (1 invention point)", "Drone: Shrink (3 invention points)", "Drone: Stealth Field (2 invention points)",
				"Fighter (2 invention points)", "Fighter: Increase AC by 1 (2 invention points)", "Fighter: Increase Attack Bonus by 1 (1 invention point)", "Fighter: Increase Damage Dice to d10 (3 invention points)", "Fighter: Increase Hit Points by 10 (1 invention point)",  "Fighter: Multiattack (2 invention points)", "Fighter: Grapple Hands (3 invention points)", "Fighter: Head Bomb (1 invention point)", "Fighter: Shrink (3 invention points)",
				"Mount (2 invention points)", "Mount: Increase Carrying Capacity by 50 lb (2 invention points)", "Mount: Increase AC by 1 (2 invention points)", "Mount: Increase Hit Points by 10 (1 invention point)", "Mount: Auto Mobile Mount (4 invention points)", "Mount: Shielding Seat (3 invention points)", "Mount: Shrink (3 invention points)", "Mount: Air Horn (1 invention point)"
			],
			"drone (2 invention points)" : {
				name : "Clockwork Drone",
				source : ["XPtL3:IA", 7],
				description : " [2 points]\n   Descriptions of upgrades to the clockwork drone will only appear on its companion page",
				eval : "improvedArtificerClockworkConstructsFunctions.add('Clockwork Drone', 'Drone Clockwork Construct (Artificer 1, XPtL3:IA 7):\\n \\u2022 The drone follows my commands and acts on my turn in combat\\n \\u2022 Without upgrades, it has 17 AC and a base average of 9 hit points\\n \\u2022 Without upgrades, its claw grab feature can carry 60 lb'); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.remove('Clockwork Drone'); "
			},
			"drone: increase ac by 1 (2 invention points)" : {
				name : "Clockwork Drone: Increase AC by 1",
				source : ["XPtL3:IA", 7],
				description : " [2 points]\n   This upgrade can be selected up to 6 times even though the automation doesn't allow for it",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Drone', true, [['Comp.Use.AC', 1], ['Cnote.Left', ' \\u2022 Upgrade: it gains +1 AC (can be taken up to 6 times)']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Drone', false, [['Comp.Use.AC', 1], ['Cnote.Left', ' \\u2022 Upgrade: it gains +1 AC (can be taken up to 6 times)']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('drone (2 invention points)') != -1; }
			},
			"drone: increase carrying capacity by 50 lb (2 invention points)" : {
				name : "Clockwork Drone: Increase Carrying Capacity by 50 lb",
				source : ["XPtL3:IA", 7],
				description : " [2 points]\n   This upgrade can be selected up to 4 times even though the automation doesn't allow for it",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Drone', true, [['Comp.Use.Traits', 'Claw Grab: The drone has a claw that can grab and pick up things weighing up to 110 lb.', /claw grab:.*?\\d+ (lb|kg)\\.?/i], ['Cnote.Left', ' \\u2022 Upgrade: its claw grab carrying capacity is increased by 50 lb (can be taken up to 4 times)']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Drone', false, [['Comp.Use.Traits', 'Claw Grab: The drone has a claw that can grab and pick up things weighing up to 60 lb.', /claw grab:.*?\\d+ (lb|kg)\\.?/i], ['Cnote.Left', ' \\u2022 Upgrade: its claw grab carrying capacity is increased by 50 lb (can be taken up to 4 times)']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('drone (2 invention points)') != -1; }
			},
			"drone: increase hit points by 10 (1 invention point)" : {
				name : "Clockwork Drone: Increase Hit Points by 10",
				source : ["XPtL3:IA", 7],
				description : " [1 point]\n   This upgrade can be selected multiple times even though the automation doesn't allow for it",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Drone', true, [['Comp.Use.HP.Max', 10], ['Cnote.Left', ' \\u2022 Upgrade: its max HP increases by 10 (can be taken multiple times)']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Drone', false, [['Comp.Use.HP.Max', 10], ['Cnote.Left', ' \\u2022 Upgrade: its max HP increases by 10 (can be taken multiple times)']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('drone (2 invention points)') != -1; }
			},
			"drone: lockpick (2 invention points)" : {
				name : "Clockwork Drone: Lockpick",
				source : ["XPtL3:IA", 7],
				description : "",
				usages: "Int mod per ",
				usagescalc: "event.value = Math.max(1, What('Int Mod'));",
				recovery: "long rest",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Drone', true, [['Comp.Use.Traits', '\\u25C6 Lockpick: The drone has built-in lockpicking tools with which it can open any nonmagical lock automatically. It can do this as many times as its master\\'s Int mod per long rest.'], ['Cnote.Left', ' \\u2022 Lockpick: it can open any nonmagical lock; But only my Intelligence modifier per my long rests']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Drone', false, [['Comp.Use.Traits', '\\u25C6 Lockpick: The drone has built-in lockpicking tools with which it can open any nonmagical lock automatically. It can do this as many times as its master\\'s Int mod per long rest.'], ['Cnote.Left', ' \\u2022 Lockpick: it can open any nonmagical lock; But only my Intelligence modifier per my long rests']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('drone (2 invention points)') != -1; }
			},
			"drone: remote detonation (1 invention point)" : {
				name : "Clockwork Drone: Remote Detonation",
				source : ["XPtL3:IA", 7],
				description : " [1 point]",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Drone', true, [['Comp.Use.Traits', '\\u25C6 Remote Detonation: As an action, the drone can explode, causing each creature within 10 ft to take 10d10 fire damage, Dexterity save for half. Once detonated, the drone can\\'t be brought back to life by any means.'], ['Cnote.Left', ' \\u2022 Remote Detonation: it can detonate as an action; After which, I have to rebuild the drone']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Drone', false, [['Comp.Use.Traits', '\\u25C6 Remote Detonation: As an action, the drone can explode, causing each creature within 10 ft to take 10d10 fire damage, Dexterity save for half. Once detonated, the drone can\\'t be brought back to life by any means.'], ['Cnote.Left', ' \\u2022 Remote Detonation: it can detonate as an action; After which, I have to rebuild the drone']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('drone (2 invention points)') != -1; }
			},
			"drone: shrink (3 invention points)" : {
				name : "Clockwork Drone: Shrink",
				source : ["XPtL3:IA", 7],
				description : " [3 points]",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Drone', true, [['Comp.Use.Traits', '\\u25C6 Shrink: As a bonus action, the drone can shrink down to the size of a few inches. It continues to operate as normal. It can return to its original size as a bonus action.'], ['Cnote.Left', ' \\u2022 Shrink: it can shrink down to the size of a few inches or back to normal as a bonus action']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Drone', false, [['Comp.Use.Traits', '\\u25C6 Shrink: As a bonus action, the drone can shrink down to the size of a few inches. It continues to operate as normal. It can return to its original size as a bonus action.'], ['Cnote.Left', ' \\u2022 Shrink: it can shrink down to the size of a few inches or back to normal as a bonus action']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('drone (2 invention points)') != -1; }
			},
			"drone: stealth field (2 invention points)" : {
				name : "Clockwork Drone: Stealth Field",
				source : ["XPtL3:IA", 7],
				description : "",
				usages: "\u00BD Int mod / ",
				usagescalc: "event.value = Math.max(1, Math.floor(What('Int Mod')/2));",
				recovery: "long rest",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Drone', true, [['Comp.Use.Traits', '\\u25C6 Stealth Field: As an action, the drone can turn invisible for 1 hour. The drone can use this feature as many times as half its master\\'s Intelligence modifier rounded down per long rest.'], ['Cnote.Left', ' \\u2022 Stealth Field: it can turn invisible as an action; But only half my Int mod per my long rests']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Drone', false, [['Comp.Use.Traits', '\\u25C6 Stealth Field: As an action, the drone can turn invisible for 1 hour. The drone can use this feature as many times as half its master\\'s Intelligence modifier rounded down per long rest.'], ['Cnote.Left', ' \\u2022 Stealth Field: it can turn invisible as an action; But only half my Int mod per my long rests']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('drone (2 invention points)') != -1; }
			},
			"fighter (2 invention points)" : {
				name : "Clockwork Fighter",
				source : ["XPtL3:IA", 7],
				description : " [2 points]\n   Descriptions of upgrades to the clockwork fighter will only appear on its companion page",
				eval : "improvedArtificerClockworkConstructsFunctions.add('Clockwork Fighter', 'Fighter Clockwork Construct (Artificer 1, XPtL3:IA 7):\\n \\u2022 The fighter follows my commands, but rolls its own initiative and acts on its own turn\\n \\u2022 Without upgrades, it has 17 AC and a base average of 22 hit points\\n \\u2022 Without upgrades, its punch attacks are +5 to hit, do 2d6 damage, and are only 1 per action'); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.remove('Clockwork Fighter'); "
			},
			"fighter: increase ac by 1 (2 invention points)" : {
				name : "Clockwork Fighter: Increase AC by 1",
				source : ["XPtL3:IA", 7],
				description : " [2 points]\n   This upgrade can be selected up to 6 times even though the automation doesn't allow for it",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', true, [['Comp.Use.AC', 1], ['Cnote.Left', ' \\u2022 Upgrade: it gains +1 AC (can be taken up to 6 times)']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', false, [['Comp.Use.AC', 1], ['Cnote.Left', ' \\u2022 Upgrade: it gains +1 AC (can be taken up to 6 times)']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('fighter (2 invention points)') != -1; }
			},
			"fighter: increase attack bonus by 1 (1 invention point)" : {
				name : "Clockwork Fighter: Increase Attack Bonus by 1",
				source : ["XPtL3:IA", 7],
				description : " [1 point]\n   This upgrade can be selected up to 3 times even though the automation doesn't allow for it", // this is an interpretation by MPMB, the original document says nothing about a maximum amount of times
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', true, [['Cnote.Left', ' \\u2022 Upgrade: its attack rolls gain a +1 bonus (can be taken up to 3 times)'], ['BlueText.Comp.Use.Attack.1.To Hit Bonus', 1]]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', false, [['Cnote.Left', ' \\u2022 Upgrade: its attack rolls gain a +1 bonus (can be taken up to 3 times)'], ['BlueText.Comp.Use.Attack.1.To Hit Bonus', 1]]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('fighter (2 invention points)') != -1; }
			},
			"fighter: increase damage dice to d10 (3 invention points)" : {
				name : "Clockwork Fighter: Increase Damage Dice to d10",
				source : ["XPtL3:IA", 7],
				description : " [3 points]",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', true, [['Cnote.Left', ' \\u2022 Upgrade: its punch attacks do 2d10 damage instead of 2d6'], ['BlueText.Comp.Use.Attack.1.Damage Die', '2d10', /.*/i]]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', false, [['Cnote.Left', ' \\u2022 Upgrade: its punch attacks do 2d10 damage instead of 2d6'], ['BlueText.Comp.Use.Attack.1.Damage Die', '2d6', /.*/i]]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('fighter (2 invention points)') != -1; }
			},
			"fighter: increase hit points by 10 (1 invention point)" : {
				name : "Clockwork Fighter: Increase Hit Points by 10",
				source : ["XPtL3:IA", 7],
				description : " [1 point]\n   This upgrade can be selected multiple times even though the automation doesn't allow for it",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', true, [['Comp.Use.HP.Max', 10], ['Cnote.Left', ' \\u2022 Upgrade: its max HP increases by 10 (can be taken multiple times)']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', false, [['Comp.Use.HP.Max', 10], ['Cnote.Left', ' \\u2022 Upgrade: its max HP increases by 10 (can be taken multiple times)']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('fighter (2 invention points)') != -1; }
			},
			"fighter: multiattack (2 invention points)" : {
				name : "Clockwork Fighter: Multiattack",
				source : ["XPtL3:IA", 7],
				description : " [2 points]",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', true, [['Comp.Use.Attack.perAction', 1], ['Cnote.Left', ' \\u2022 Upgrade: it gains multiattack; Two punch attacks as part of one attack action'], ['Comp.Use.Attack.1.Description', 'Two punch attacks as an Attack action']]); ", // the fact that it is two attacks with punch is an interpretation by MPMB, the original document says nothing about how the multiattack would work
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', false, [['Comp.Use.Attack.perAction', 1], ['Cnote.Left', ' \\u2022 Upgrade: it gains multiattack; Two punch attacks as part of one attack action'], ['Comp.Use.Attack.1.Description', 'Two punch attacks as an Attack action']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('fighter (2 invention points)') != -1; }
			},
			"fighter: grapple hands (3 invention points)" : {
				name : "Clockwork Fighter: Grapple Hands",
				source : ["XPtL3:IA", 7],
				description : " [3 points]",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', true, [['Comp.Use.Traits', '\\u25C6 Grapple Hands: The fighter\\'s hands are attached to ropes and can fire up to 60 ft away. They can be used to grab things for away, pull things, pull itself up, hang from ceilings, etc.'], ['Cnote.Left', ' \\u2022 Grapple Hands: its hands can be fired up to 60 ft away and are attached to it with ropes']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', false, [['Comp.Use.Traits', '\\u25C6 Grapple Hands: The fighter\\'s hands are attached to ropes and can fire up to 60 ft away. They can be used to grab things for away, pull things, pull itself up, hang from ceilings, etc.'], ['Cnote.Left', ' \\u2022 Grapple Hands: its hands can be fired up to 60 ft away and are attached to it with ropes']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('fighter (2 invention points)') != -1; }
			},
			"fighter: head bomb (1 invention point)" : {
				name : "Clockwork Fighter: Head Bomb",
				source : ["XPtL3:IA", 7],
				description : " [1 point]",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', true, [['Comp.Use.Traits', '\\u25C6 Head Bomb: As an action, the fighter can screw off its head and make a ranged attack with +10 to hit. If it hits, the head explodes and the target takes 5d10 fire damage and 5d10 bludgeoning damage. While the fighter is missing its head, it moves in a random direction (roll a d8). It costs 200 gp to craft a new head.'], ['Cnote.Left', ' \\u2022 Head Bomb: it can throw its head as a bomb; After which, I have to craft it a new head']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', false, [['Comp.Use.Traits', '\\u25C6 Head Bomb: As an action, the fighter can screw off its head and make a ranged attack with +10 to hit. If it hits, the head explodes and the target takes 5d10 fire damage and 5d10 bludgeoning damage. While the fighter is missing its head, it moves in a random direction (roll a d8). It costs 200 gp to craft a new head.'], ['Cnote.Left', ' \\u2022 Head Bomb: it can throw its head as a bomb; After which, I have to craft it a new head']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('fighter (2 invention points)') != -1; }
			},
			"fighter: shrink (3 invention points)" : {
				name : "Clockwork Fighter: Shrink",
				source : ["XPtL3:IA", 7],
				description : " [3 points]",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', true, [['Comp.Use.Traits', '\\u25C6 Shrink: As a bonus action, the fighter can shrink down to the size of a few inches. It continues to operate as normal. It can return to its original size as a bonus action.'], ['Cnote.Left', ' \\u2022 Shrink: it can shrink down to the size of a few inches or back to normal as a bonus action']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Fighter', false, [['Comp.Use.Traits', '\\u25C6 Shrink: As a bonus action, the fighter can shrink down to the size of a few inches. It continues to operate as normal. It can return to its original size as a bonus action.'], ['Cnote.Left', ' \\u2022 Shrink: it can shrink down to the size of a few inches or back to normal as a bonus action']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('fighter (2 invention points)') != -1; }
			},
			"mount (2 invention points)" : {
				name : "Clockwork Mount",
				source : ["XPtL3:IA", 8],
				description : " [2 points]\n   Descriptions of upgrades to the clockwork mount will only appear on its companion page",
				eval : "improvedArtificerClockworkConstructsFunctions.add('Clockwork Mount', 'Mount Clockwork Construct (Artificer 1, XPtL3:IA 8):\\n \\u2022 The mount follows my commands and acts on my turn in combat\\n \\u2022 Without upgrades, it has 10 AC and a base average of 34 hit points\\n \\u2022 Without upgrades, its carrying capacity is 540 lb and has 50 ft speed'); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.remove('Clockwork Mount'); "
			},
			"mount: increase carrying capacity by 50 lb (2 invention points)" : {
				name : "Clockwork Mount: Increase Carrying Capacity by 50 lb",
				source : ["XPtL3:IA", 8],
				description : " [2 points]\n   This upgrade can be added up to 10 times even though the automation doesn't allow for it",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', true, [['Comp.Use.Features', '\\u25C6 Carrying Capacity: The mount can carry up to 590 lb.'], ['Cnote.Left', ' \\u2022 Upgrade: its carrying capacity is increased by 50 lb (can be taken up to 10 times)']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', false, [['Comp.Use.Features', '', /\\r?\\\u25C6 Carrying Capacity:.*?\\d+ (lb|kg)\\.?/i], ['Cnote.Left', ' \\u2022 Upgrade: its carrying capacity is increased by 50 lb (can be taken up to 10 times)']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('mount (2 invention points)') != -1; }
			},
			"mount: increase ac by 1 (2 invention points)" : {
				name : "Clockwork Mount: Increase AC by 1",
				source : ["XPtL3:IA", 8],
				description : " [2 points]\n   This upgrade can be selected up to 6 times even though the automation doesn't allow for it",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', true, [['Comp.Use.AC', 1], ['Cnote.Left', ' \\u2022 Upgrade: it gains +1 AC (can be taken up to 6 times)']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', false, [['Comp.Use.AC', 1], ['Cnote.Left', ' \\u2022 Upgrade: it gains +1 AC (can be taken up to 6 times)']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('mount (2 invention points)') != -1; }
			},
			"mount: increase hit points by 10 (1 invention point)" : {
				name : "Clockwork Mount: Increase Hit Points by 10",
				source : ["XPtL3:IA", 8],
				description : " [1 point]\n   This upgrade can be selected multiple times even though the automation doesn't allow for it",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', true, [['Comp.Use.HP.Max', 10], ['Cnote.Left', ' \\u2022 Upgrade: its max HP increases by 10 (can be taken multiple times)']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', false, [['Comp.Use.HP.Max', 10], ['Cnote.Left', ' \\u2022 Upgrade: its max HP increases by 10 (can be taken multiple times)']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('mount (2 invention points)') != -1; }
			},
			"mount: auto mobile mount (4 invention points)" : {
				name : "Clockwork Mount: Auto Mobile Mount",
				source : ["XPtL3:IA", 8],
				description : " [4 points]",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', true, [['Comp.Use.Traits', '\\u25C6 Auto Mobile Mount: The mount has magical motorized wheels instead of legs, granting it 80 ft speed and a trample attack.'], ['Cnote.Left', ' \\u2022 Auto Mobile Mount: its speed increases to 80 ft and it gains a trample attack'], ['Comp.Use.Speed', '80 ft', /.*/i], ['Comp.Use.Attack.2.Weapon Selection', 'Trample', /.*/i], ['Comp.Use.Attack.2.Proficiency', 'True', /.*/i], ['Comp.Use.Attack.2.Mod', 'Comp.Use.Ability.Con.Mod', /.*/i], ['Comp.Use.Attack.2.Range', 'Melee (5 ft)', /.*/i], ['Comp.Use.Attack.2.Damage Type', 'Bludgeoning', /.*/i], ['BlueText.Comp.Use.Attack.2.To Hit Bonus', 'dc', /.*/i], ['BlueText.Comp.Use.Attack.2.Damage Die', '2d10', /.*/i]]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', false, [['Comp.Use.Traits', '\\u25C6 Auto Mobile Mount: The mount has magical motorized wheels instead of legs, granting it 80 ft speed and a trample attack.'], ['Cnote.Left', ' \\u2022 Auto Mobile Mount: its speed increases to 80 ft and it gains a trample attack'], ['Comp.Use.Speed', '50 ft', /.*/i], ['Comp.Use.Attack.2.Weapon Selection', '', /.*/i]]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('mount (2 invention points)') != -1; }
			},
			"mount: shielding seat (3 invention points)" : {
				name : "Clockwork Mount: Shielding Seat",
				source : ["XPtL3:IA", 8],
				description : " [3 points]",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', true, [['Comp.Use.Traits', '\\u25C6 Shielding Seat: The mount has interior seating for its master which still allows to see outside. While inside the mount, the rider can\\'t be targeted by attack or spells, but also can\\'t target anything outside the mount. It is a bonus action to embark or disembark the mount.'], ['Cnote.Left', ' \\u2022 Shielding Seat: it has a space inside for me to sit where I\\'m shielded but can still see outside']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', false, [['Comp.Use.Traits', '\\u25C6 Shielding Seat: The mount has interior seating for its master which still allows to see outside. While inside the mount, the rider can\\'t be targeted by attack or spells, but also can\\'t target anything outside the mount.'], ['Cnote.Left', ' \\u2022 Shielding Seat: it has a space inside for me to sit where I\\'m shielded but can still see outside']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('mount (2 invention points)') != -1; }
			},
			"mount: shrink (3 invention points)" : {
				name : "Clockwork Mount: Shrink",
				source : ["XPtL3:IA", 8],
				description : " [3 points]",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', true, [['Comp.Use.Traits', '\\u25C6 Shrink: As a bonus action, the mount can shrink down to the size of a few inches. It continues to operate as normal. It can return to its original size as a bonus action.'], ['Cnote.Left', ' \\u2022 Shrink: it can shrink down to the size of a few inches or back to normal as a bonus action']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', false, [['Comp.Use.Traits', '\\u25C6 Shrink: As a bonus action, the mount can shrink down to the size of a few inches. It continues to operate as normal. It can return to its original size as a bonus action.'], ['Cnote.Left', ' \\u2022 Shrink: it can shrink down to the size of a few inches or back to normal as a bonus action']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('mount (2 invention points)') != -1; }
			},
			"mount: air horn (1 invention point)" : {
				name : "Clockwork Mount: Air Horn",
				source : ["XPtL3:IA", 8],
				description : " [1 points]",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', true, [['Comp.Use.Traits', '\\u25C6 Air Horn: The mount has an air horn with a sound of its master\\'s choosing.'], ['Cnote.Left', ' \\u2022 Air Horn: it has an air horn with a sound of my choosing']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', false, [['Comp.Use.Traits', '\\u25C6 Air Horn: The mount has an air horn with a sound of its master\\'s choosing.'], ['Cnote.Left', ' \\u2022 Air Horn: it has an air horn with a sound of my choosing']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('mount (2 invention points)') != -1; }
			},
			"mount: call button (1 invention point)" : {
				name : "Clockwork Mount: Call Button",
				source : ["XPtL3:IA", 8],
				description : " [1 points]\n   I have a remote with one button that, when pressed, makes the mount come to me\n   The mount moves to me as quickly as it can as long as it is on the same plane of existence",
				eval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', true, [['Comp.Use.Traits', '\\u25C6 Call Button: The mount\\'s master has a remote with a single button that calls the mount when pressed. As long as the mount is on the same plane of existence as the master, it will move as quickly as it can to the remote when the buttons is pressed.'], ['Cnote.Left', ' \\u2022 Call Button: I have a remote with which I can call the mount to come to me']]); ",
				removeeval : "improvedArtificerClockworkConstructsFunctions.text('Clockwork Mount', false, [['Comp.Use.Traits', '\\u25C6 Call Button: The mount\\'s master has a remote with a single button that calls the mount when pressed. As long as the mount is on the same plane of existence as the master, it will move as quickly as it can to the remote when the buttons is pressed.'], ['Cnote.Left', ' \\u2022 Call Button: I have a remote with which I can call the mount to come to me']]); ",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true).indexOf('mount (2 invention points)') != -1; }
			}
		},
		"inventions: mechanical limbs" : {
			name : "Inventions: Mechanical Limbs",
			source : ["XPtL3:IA", 8],
			minlevel : 1,
			description : desc([
				"I can replace parts of my body with augmentations I create; The changes are permanent",
				"Chopping off body parts and replacing them with magical metal comes at a cost",
				"After every 3rd mechanical limb invention/upgrade, I have to make a Constitution save",
				"The DC is my own; On a failure, I gain 1 random indefinite madness from the DMG",
				"Only Wish can resolve this madness; After 3 failures I become an nonsentient construct"
			]),
			extraname : "Mechanical Limb",
			extrachoices : [
				"Arcane Scent (1 invention point)", "Arcane Scent: Increase Range (1 invention point)", "Arcane Scent: Know School of Magic (1 invention point)",
				"Mechanical Sense (1 invention point)", "Mechanical Sense: Translate 2 Languages (1 invention point)", "Mechanical Sense: Can't Be Surprised (1 invention point)",
				"Robotic Eye (1 invention point)", "Robotic Eye: +2 on Ranged Attacks (2 invention points)", "Robotic Eye: See Invisible (3 invention points)",
				"Grappling Hook Hand (2 invention points)", "Grappling Hook Hand: Rope of Entanglement (1 invention point)",
				"Arcane Hand (2 invention points)", "Arcane Hand: 2nd-level Spells (2 invention points)", "Arcane Hand: 3rd-level Spells (2 invention points)", "Arcane Hand: 4th-level Spells (2 invention points)",
				"Arm Guard (2 invention points)", "Arm Guard: Amplify (1 invention point)",
				"Calibrated Legs (2 invention points)", "Calibrated Legs: +25 lb Carrying Capacity (1 invention point)", "Calibrated Legs: +10 ft Walking Speed (2 invention points)", "Calibrated Legs: Double Jump Height (2 invention points)", "Calibrated Legs: Tremorsense (3 invention points)",
				"Armored Torso (2 invention points)", "Armored Torso: Increase HP by 10 (2 invention points)", "Armored Torso: Increase HP by 20 (2 invention points)", "Armored Torso: Increase HP by 30 (2 invention points)", "Armored Torso: Increase HP by 40 (2 invention points)", "Armored Torso: Increase HP by 50 (2 invention points)", "Armored Torso: Extra +2 AC (3 invention points)", "Armored Torso: Magical Blood (3 invention points)", "Armored Torso: Magical Digestive System (3 invention points)", "Armored Torso: Magical Lungs (3 invention points)"
			],
			"arcane scent (1 invention point)" : {
				name : "Arcane Scent",
				source : ["XPtL3:IA", 8],
				additional : "1 point",
				description : "\n   I can smell if something is a magic item if I hold it up to my mechanical nose"
			},
			"arcane scent: increase range (1 invention point)" : {
				name : "Arcane Scent: Increase Range to 30 ft",
				source : ["XPtL3:IA", 8],
				description : " [1 point]",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('arcane scent (1 invention point)') != -1; }
			},
			"arcane scent: know school of magic (1 invention point)" : {
				name : "Arcane Scent: Know School of Magic",
				source : ["XPtL3:IA", 8],
				description : " [1 point]",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('arcane scent (1 invention point)') != -1; }
			},
			"mechanical sense (1 invention point)" : {
				name : "Mechanical Sense",
				source : ["XPtL3:IA", 8],
				additional : "1 point",
				description : "\n   With my mechanical ears I get +3 on Wisdom (Perception) checks that rely on hearing",
				vision : [["+3 Perception relying on hearing", 0]]
			},
			"mechanical sense: translate 2 languages (1 invention point)" : {
				name : "Mechanical Sense: Translate 2 Languages",
				source : ["XPtL3:IA", 8],
				description : " [1 point]",
				languageProfs : [2],
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('mechanical sense (1 invention point)') != -1; }
			},
			"mechanical sense: can't be surprised (1 invention point)" : {
				name : "Mechanical Sense: Perimeter Sense",
				source : ["XPtL3:IA", 8],
				description : "\n   As a bonus action, I can activate my perimeter sense which lasts for 10 minutes\n   I can't be surprised or be snuck up on while my perimeter sense is active",
				action : ["bonus action", ""],
				additional : "3 p",
				usages: "Int mod/",
				usagescalc: "event.value = Math.max(1, What('Int Mod'));",
				recovery: "long rest",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('mechanical sense (1 invention point)') != -1; }
			},
			"robotic eye (1 invention point)" : {
				name : "Robotic Eye",
				source : ["XPtL3:IA", 8],
				additional : "1 point",
				description : "\n   With my mechanical eye I get +3 on Wisdom (Perception) checks that rely on sight",
				vision : [["+3 Perception relying on sight", 0]]
			},
			"robotic eye: +2 on ranged attacks (2 invention points)" : {
				name : "Robotic Eye: +2 on Ranged Attacks",
				source : ["XPtL3:IA", 8],
				description : " [2 points]",
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if ((/^(?!.*melee).*\d+.*$/i).test(fields.Range)) output.extraHit += 2;
						},
						"My ranged attacks get a +2 bonus on the To Hit."
					]
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('robotic eye (1 invention point)') != -1; }
			},
			"robotic eye: see invisible (3 invention points)" : {
				name : "Robotic Eye: See Invisible",
				source : ["XPtL3:IA", 8],
				description : "\n   As a bonus action, I can activate this to be able to see invisible creature for 10 minutes",
				action : ["bonus action", ""], // added bonus action as no activation method was given
				additional : "3 points",
				usages: "Int mod per ",
				usagescalc: "event.value = Math.max(1, What('Int Mod'));",
				recovery: "long rest",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('robotic eye (1 invention point)') != -1; }
			},
			"grappling hook hand (2 invention points)" : {
				name : "Grappling Hook Hand",
				source : ["XPtL3:IA", 9],
				description : " [2 points]\n   My mechanical hand is attached to a 40 ft rope that I can fire at things to grab/pull them\n   I can pull or carry up to 250 lb with this hand"
			},
			"grappling hook hand: rope of entanglement (1 invention point)" : {
				name : "Grappling Hook Hand: Rope of Entanglement",
				source : ["XPtL3:IA", 9],
				description : " [1 point]\n   The rope of my grappling hook hand becomes a Rope of Entanglement",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('grappling hook hand (2 invention points)') != -1; }
			},
			"arcane hand (2 invention points)" : {
				name : "Arcane Hand",
				source : ["XPtL3:IA", 9],
				description : " [2 points]\n   My magical hand can cast 3 1st-level sorcerer spells of my choice each once per long rest",
				spellcastingBonus : {
					name : "Arcane Hand",
					"class" : "sorcerer",
					level : [1,1],
					firstCol : "oncelr",
					times : 3
				}
			},
			"arcane hand: 2nd-level spells (2 invention points)" : {
				name : "Arcane Hand: 2nd-level spells",
				source : ["XPtL3:IA", 9],
				description : " [2 points]\n   My magical hand can cast 2 2nd-level sorcerer spells of my choice each once per long rest",
				spellcastingBonus : {
					name : "Arcane Hand",
					"class" : "sorcerer",
					level : [2,2],
					firstCol : "oncelr",
					times : 2
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('arcane hand (2 invention points)') != -1; }
			},
			"arcane hand: 3rd-level spells (2 invention points)" : {
				name : "Arcane Hand: 3rd-level spells",
				source : ["XPtL3:IA", 9],
				description : " [2 points]\n   My magical hand can cast 2 3rd-level sorcerer spells of my choice each once per long rest",
				spellcastingBonus : {
					name : "Arcane Hand",
					"class" : "sorcerer",
					level : [3,3],
					firstCol : "oncelr",
					times : 2
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('arcane hand: 2nd-level spells (2 invention points)') != -1; }
			},
			"arcane hand: 4th-level spells (2 invention points)" : {
				name : "Arcane Hand: 4th-level spells",
				source : ["XPtL3:IA", 9],
				description : " [2 points]\n   My magical hand can cast 2 4th-level sorcerer spells of my choice each once per long rest",
				spellcastingBonus : {
					name : "Arcane Hand",
					"class" : "sorcerer",
					level : [4,4],
					firstCol : "oncelr",
					times : 2
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('arcane hand: 3rd-level spells (2 invention points)') != -1; }
			},
			"arm guard (2 invention points)" : {
				name : "Arm Guard",
				source : ["XPtL3:IA", 9],
				description : " [2 points]\n   As an action I can spend a spell slot to active my arm guard to generate a shield of force\n   It works like a normal shield but I can use it even though I'm not proficient; It has 30 HP\n   If the bonus from this is the reason an attack missed, the force shield takes the damage",
				action : ["action", ""]
			},
			"arm guard: amplify (1 invention point)" : {
				name : "Arm Guard: Amplify",
				source : ["XPtL3:IA", 9],
				description : " [1 point]\n   For every spell slot level above 1st I to activate my arm guard, it gains +1 AC and +10 HP",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('arm guard (2 invention points)') != -1; }
			},
			"calibrated legs (2 invention points)" : {
				name : "Calibrated Legs",
				source : ["XPtL3:IA", 9],
				description : " [2 points]\n   My carrying capacity increases by 25 lb (not reflected in sheet's automation)"
				// there is no way for the sheet to add things to the carrying capacity calculation only to multiply it with a number
			},
			"calibrated legs: +25 lb carrying capacity (1 invention point)" : {
				name : "Calibrated Legs: Extra +25 lb Carrying Capacity",
				source : ["XPtL3:IA", 9],
				description : " [1 point]",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('calibrated legs (2 invention points)') != -1; }
			},
			"calibrated legs: +10 ft walking speed (2 invention points)" : {
				name : "Calibrated Legs: +10 ft Walking Speed",
				source : ["XPtL3:IA", 9],
				description : " [2 points]",
				speed : { walk : {spd : "+10", enc : "+10" } },
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('calibrated legs (2 invention points)') != -1; }
			},
			"calibrated legs: double jump height (2 invention points)" : {
				name : "Calibrated Legs: Double Jump Height",
				source : ["XPtL3:IA", 9],
				description : " [2 points]",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('calibrated legs (2 invention points)') != -1; }
			},
			"calibrated legs: tremorsense (3 invention points)" : {
				name : "Calibrated Legs: Tremorsense",
				source : ["XPtL3:IA", 9],
				description : "\n   As a bonus action, I can gain termorsense for 10 minutes",
				action : ["bonus action", ""],
				additional : "3 pnts",
				usages: "Int mod per ",
				usagescalc: "event.value = Math.max(1, What('Int Mod'));",
				recovery: "long rest",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('calibrated legs (2 invention points)') != -1; }
			},
			"armored torso (2 invention points)" : {
				name : "Armored Torso",
				source : ["XPtL3:IA", 9],
				description : " [2 points; +2 AC]",
				extraAC : [{
					mod : 2,
					name : "Armored Torso",
					text : "I gain a +2 bonus to AC from replacing pieces of my flesh with metal and armor."
				}]
			},
			"armored torso: increase hp by 10 (2 invention points)" : {
				name : "Armored Torso: +10 HP",
				source : ["XPtL3:IA", 9],
				description : " [2 points]",
				calcChanges : {
					hp : "extrahp += 10; extrastring += '\\n + 10 from Armored Torso';"
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('armored torso (2 invention points)') != -1; }
			},
			"armored torso: increase hp by 20 (2 invention points)" : {
				name : "Armored Torso: +20 HP",
				source : ["XPtL3:IA", 9],
				description : " [2 points; cumulative total]",
				calcChanges : {
					hp : "extrahp += 10; extrastring = extrastring.replace(/\\d+ from Armored Torso/i, '20 from Armored Torso');"
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('armored torso: increase hp by 10 (2 invention points)') != -1; }
			},
			"armored torso: increase hp by 30 (2 invention points)" : {
				name : "Armored Torso: +30 HP",
				source : ["XPtL3:IA", 9],
				description : " [2 points; cumulative total]",
				calcChanges : {
					hp : "extrahp += 10; extrastring = extrastring.replace(/\\d+ from Armored Torso/i, '30 from Armored Torso');"
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('armored torso: increase hp by 20 (2 invention points)') != -1; }
			},
			"armored torso: increase hp by 40 (2 invention points)" : {
				name : "Armored Torso: +40 HP",
				source : ["XPtL3:IA", 9],
				description : " [2 points; cumulative total]",
				calcChanges : {
					hp : "extrahp += 10; extrastring = extrastring.replace(/\\d+ from Armored Torso/i, '40 from Armored Torso');"
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('armored torso: increase hp by 30 (2 invention points)') != -1; }
			},
			"armored torso: increase hp by 50 (2 invention points)" : {
				name : "Armored Torso: +50 HP",
				source : ["XPtL3:IA", 9],
				description : " [2 points; cumulative total]",
				calcChanges : {
					hp : "extrahp += 10; extrastring = extrastring.replace(/\\d+ from Armored Torso/i, '50 from Armored Torso');"
				},
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('armored torso: increase hp by 40 (2 invention points)') != -1; }
			},
			"armored torso: extra +2 ac (3 invention points)" : {
				name : "Armored Torso: Extra +2 AC",
				source : ["XPtL3:IA", 9],
				description : " [3 points]",
				extraAC : [{
					mod : 2,
					name : "Armored Torso",
					text : "I gain an extra +2 bonus to AC from improving my armored torso."
				}],
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('armored torso (2 invention points)') != -1; }
			},
			"armored torso: magical blood (3 invention points)" : {
				name : "Armored Torso: Magical Blood",
				source : ["XPtL3:IA", 9],
				description : " [3 points]\n   I am immune to poison damage and the poisoned condition",
				savetxt : { immune : ["poison"] },
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('armored torso (2 invention points)') != -1; }
			},
			"armored torso: magical digestive system (3 invention points)" : {
				name : "Armored Torso: Magical Digestive System",
				source : ["XPtL3:IA", 9],
				description : " [3 points]\n   I no longer need to eat or drink, nor have I the ability to do so anymore",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('armored torso (2 invention points)') != -1; }
			},
			"armored torso: magical lungs (3 invention points)" : {
				name : "Armored Torso: Magical Lungs",
				source : ["XPtL3:IA", 9],
				description : " [3 points]\n   I no longer need to breathe air as my magical respirators oxidize my blood from any source",
				prereqeval : function(v) { return GetFeatureChoice('class', 'improved artificer', 'inventions: mechanical limbs', true).indexOf('armored torso (2 invention points)') != -1; }
			}
		},
		"magic item analysis" : {
			name : "Magic Item Analysis",
			source : ["XPtL3:IA", 2],
			minlevel : 1,
			description : "\n   " + "I can cast Detect Magic and Identify as rituals without requiring material components",
			spellcastingBonus : [{
				name : "Magic Item Analysis",
				spells : ["detect magic"],
				selection : ["detect magic"],
				firstCol : "(R)"
			}, {
				name : "Magic Item Analysis",
				spells : ["identify"],
				selection : ["identify"],
				firstCol : "(R)"
			}]
		},
		"tool expertise" : {
			name : "Tool Expertise",
			source : ["XPtL3:IA", 3],
			minlevel : 2,
			description : "\n   " + "I have expertise with any tool proficiencies I gain from the artificer class",
			skillstxt : "expertise with with any tool proficiencies gained from the artificer class"
		},
		"wondrous invention" : {
			name : "Wondrous Invention",
			source : ["XPtL3:IA", 3],
			minlevel : 2,
			description : "\n   " + "I gain a magic item that I have crafted; Use the \"Choose Feature\" button above",
			additional : levels.map(function (n) {
				return n < 2 ? "" : n < 5 ? "1 item" : (n < 10 ? 2 : n < 15 ? 3 : n < 20 ? 4 : 5) + " items";
			}),
			extraname : "Wondrous Invention",
			extrachoices : ["Eyes of the Eagle", "Cap of Water Breathing", "Driftglobe", "Goggles of Night", "Sending Stones", "Lantern of Revealing", "Alchemy Jug (prereq: level 5 artificer)", "Bag of Holding (prereq: level 5 artificer)", "Helm of Comprehending Languages (prereq: level 5 artificer)", "Ring of Swimming (prereq: level 5 artificer)", "Robe of Useful Items (prereq: level 5 artificer)", "Rope of Climbing (prereq: level 5 artificer)", "Wand of Magic Detection (prereq: level 5 artificer)", "Wand of Secrets (prereq: level 5 artificer)", "Bag of Beans (prereq: level 10 artificer)", "Chime of Opening (prereq: level 10 artificer)", "Decanter of Endless Water (prereq: level 10 artificer)", "Gem of Brightness (prereq: level 10 artificer)", "Dimensional Shackles (prereq: level 10 artificer)", "Gloves of Swimming and Climbing (prereq: level 10 artificer)", "Eyes of Minute Seeing (prereq: level 10 artificer)", "Folding Boat (prereq: level 10 artificer)", "Heward's Handy Haversack (prereq: level 10 artificer)", "Boots of Striding and Springing (prereq: level 15 artificer)", "Brooch of Shielding (prereq: level 15 artificer)", "Broom of Flying (prereq: level 15 artificer)", "Gloves of Missile Snaring (prereq: level 15 artificer)", "Hat of Disguise (prereq: level 15 artificer)", "Immovable Rod (prereq: level 15 artificer)", "Ring of Jumping (prereq: level 15 artificer)", "Slippers of Spider Climbing (prereq: level 15 artificer)", "Rod of Lordly Might (prereq: level 20 artificer)", "Plate Armor of Etherealness (prereq: level 20 artificer)", "Deck of Many Things (prereq: level 20 artificer)", "Wings of Flying (prereq: level 20 artificer)"]
			// Come back to this with the function to make the individual entries
		},
		"spellcasting" : {
			name : "Spellcasting",
			source : ["XPtL3:IA", 3],
			minlevel : 3,
			description : desc([
				"I can cast artificer spells that I know, using Intelligence as my spellcasting ability",
				"I can use an arcane focus as a spellcasting focus"
			]),
			additional : levels.map(function (n, idx) {
				return n < 3 ? "" : [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13][idx] + " spells known";
			})
		},
		"infuse magic" : {
			name : "Infuse Magic",
			source : ["XPtL3:IA", 3],
			minlevel : 4,
			description : desc([
				"By spending 1 minute, I can infuse one of my artificer spells into a nonmagical item",
				"This expends a spell slot as normal and the spell must have a casting time of 1 action",
				"An item holds max one spell for 8 hours; I can have up to my Int mod of infused items",
				"A creature holding an infused item can use an action to cast the spell, using my ability",
				"The spell's target is the creature activating it or, with area of effect spells, the item"
			])
		},
		"superior attunement" : {
			name : "Superior Attunement",
			source : ["XPtL3:IA", 4],
			minlevel : 5,
			description : "",
			additional : levels.map(function (n) {
				return n < 5 ? "" : "attune to " + (n < 15 ? 4 : n < 20 ? 5 : 6) + " magic items instead of 3";
			})
		},
		"soul of artifice" : {
			name : "Soul of Artifice",
			source : ["XPtL3:IA", 4],
			minlevel : 20,
			description : "\n   " + "I gain a +1 bonus to all saving throws per magic item I am currently attuned to",
			savetxt : {
				text : ["+1 to all saves per attuned magic item"]
			}
		}
	}
};

// Artificer ammo
AmmoList["arcanic firearm rounds"] = {
	name : "Arcanic Firearm Rounds",
	source : ["XPtL3:IA", 5],
	weight : 0.2, // based on the weight of renaissance bullets from the DMG
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Arcanic Firearm Rounds",
	alternatives : [/^((?=.*arcane)(?=.*magazine)|(?=.*arcanic)(?=.*firearm)(?=.*rounds?)).*$/i]
};

//Magic Item additions 
ImpArtMagicItemsList = {
	"alchemy jug" : {
		name : "Alchemy Jug",
		source : ["D", 150],
		description : "A heavy ceramic jug. As an action, the jug can be commanded to hold a chosen liquid. With another action, the jug can be uncorked and the liquid can be poured out, at 2 gal. per minute. Once commanded to produce a liquid, it can't produce a different one or more than the max of one, until the next dawn. Liquids (with max): Acid (8 fl. oz.), Basic poison (1/2 fl. oz.), Beer (4 gal.), Honey (1 gal.), Mayonnaise (2 gal.), Oil (1 quart), Vinegar (2 gal.), Fresh water (8 gal.), Salt water (12 gal.), Wine (1 gal.)",
		descriptionLong : true,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 12,
		descriptionFull : "This ceramic jug appears to be able to hold a gallon of liquid and weighs 12 pounds whether full or empty. Sloshing sounds can be heard from within the jug when it is shaken, even if the jug is empty." + "\n   " + "You can use an action and name one liquid from the table below to cause the jug to produce the chosen liquid. Afterward, you can uncork the jug as an action and pour that liquid out, up to 2 gallons per minute. The maximum amount of liquid the jug can produce depends on the liquid you named." + "\n   " + "Once the jug starts producing a liquid, it can't produce a different one, or more of one that has reached its maximum, until the next dawn.\n\n" + toUni("Max") + "\t" + toUni("Liquid") + "\t\t" + toUni("Max") + "\t" + toUni("Liquid") + "\n8 ounces\tAcid\t\t1 quart\tOil\n1/2 ounce\tBasic poison\t2 gallons\tVinegar\n4 gallons\tBeer\t\t8 gallons\tWater, fresh\n1 gallon\tHoney\t\t12 gallons\tWater, salt\n2 gallons\tMayonnaise\t1 gallon\tWine"
	},
	"bag of beans" : {
		name : "Bag of Beans",
		source : ["D", 152],
		description : "This heavy cloth bag (0.5 lb) contains 3d4 dry beans (0.25 lb each). Dumping the bag's contents out on the ground, will cause the beans to explode in a 10-ft radius. All in the area must make a DC 15 Dex save or take 5d4 fire damage, or half on a successful save. The fire ignites unattended flammable objects in the area.\nPlanting a bean from the bag in dirt or sand and then watering it, causes an effect 1 minute later from the ground where it was planted, as determined by the DM.",
		descriptionLong : true,
		category : "wondrous item",
		rarity : "rare",
		attunement : false,
		weight : 2.5,
		descriptionFull : "Inside this heavy cloth bag are 3d4 dry beans. The bag weighs 1/2 pound plus 1/4 pound for each bean it contains." + "\n   " + "If you dump the bag's contents out on the ground, they explode in a 10-foot radius, extending from the beans. Each creature in the area, including you, must make a DC 15 Dexterity saving throw, taking 5d4 fire damage on a failed save, or half as much damage on a successful one. The fire ignites flammable objects in the area that aren't being worn or carried." + "\n   " + "If you remove a bean from the bag, plant it in dirt or sand, and then water it, the bean produces an effect 1 minute later from the ground where it was planted. The GM can choose an effect from the following table, determine it randomly, or create an effect.\n\n" + toUni("d100") + "\t" + toUni("Effect") + "\n" + toUni("01") + "\t5d4 toadstools sprout. If a creature eats a toadstool, roll any die. On an odd roll, the eater must succeed on a DC 15 Constitution saving throw or take 5d6 poison damage and become poisoned for 1 hour. On an even roll, the eater gains 5d6 temporary hit points for 1 hour.\n" + toUni("02-10") + "\tA geyser erupts and spouts water, beer, berry juice, tea, vinegar, wine, or oil (GM's choice) 30 feet into the air for 1d12 rounds.\n" + toUni("11-20") + "\tA treant sprouts. There's a 50 percent chance that the treant is chaotic evil and attacks.\n" + toUni("21-30") + "\tAn animate, immobile stone statue in your likeness rises. It makes verbal threats against you. If you leave it and others come near, it describes you as the most heinous of villains and directs the newcomers to find and attack you. If you are on the same plane of existence as the statue, it knows where you are. The statue becomes inanimate after 24 hours.\n" + toUni("31-40") + "\tA campfire with blue flames springs forth and burns for 24 hours (or until it is extinguished).\n" + toUni("41-50") + "\t1d6 + 6 shriekers sprout.\n" + toUni("51-60") + "\t1d4 + 8 bright pink toads crawl forth. Whenever a toad is touched, it transforms into a Large or smaller monster of the GM's choice. The monster remains for 1 minute, then disappears in a puff of bright pink smoke.\n" + toUni("61-70") + "\tA hungry bulette burrows up and attacks.\n" + toUni("71-80") + "\tA fruit tree grows. It has 1d10 + 20 fruit, 1d8 of which act as randomly determined magic potions, while one acts as an ingested poison of the GM's choice. The tree vanishes after 1 hour. Picked fruit remains, retaining any magic for 30 days.\n" + toUni("81-90") + "\tA nest of 1d4 + 3 eggs springs up. Any creature that eats an egg must make a DC 20 Constitution saving throw. On a successful save, a creature permanently increases its lowest ability score by 1, randomly choosing among equally low scores. On a failed save, the creature takes 10d6 force damage from an internal magical explosion.\n" + toUni("91-99") + "\tA pyramid with a 60-foot-square base bursts upward. Inside is a sarcophagus containing a mummy lord. The pyramid is treated as the mummy lord's lair, and its sarcophagus contains treasure of the GM's choice." + "\n" + toUni("100") + "\tA giant beanstalk sprouts, growing to a height of the GM's choice. The top leads where the GM chooses, such as to a great view, a cloud giant's castle, or a different plane of existence."
	},
	"bag of holding" : {
		name : "Bag of Holding",
		source : ["D", 153],
		description : "The bag can hold up to 500 lb, not exceeding a volume of 64 cu ft, but weighs 15 lb regardless of content. Retrieving an item from it requires an action. If the bag is overloaded, pierced, or torn, it is destroyed, leaving its contents in the Astral plane.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 15,
		descriptionFull : "This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents. Retrieving an item from the bag requires an action." + "\n   " + "If the bag is overloaded, pierced, or torn, it ruptures and is destroyed, and its contents are scattered in the Astral Plane. If the bag is turned inside out, its contents spill forth, unharmed, but the bag must be put right before it can be used again. Breathing creatures inside the bag can survive up to a number of minutes equal to 10 divided by the number of creatures (minimum 1 minute), after which time they begin to suffocate." + "\n   " + "Placing a bag of holding inside an extradimensional space created by a handy haversack, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened."
	},
	"boots of striding and springing" : {
		name : "Boots of Striding and Springing",
		source : ["D", 156],
		description : "While wearing these boots, my walking speed increases to 30 ft, and it isn't reduced if I'm encumbered or wearing heavy armor. In addition, I can jump three times the normal distance, though I can't jump farther my your remaining movement would allow.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 1,
		descriptionFull : "While you wear these boots, your walking speed becomes 30 feet, unless your walking speed is higher, and your speed isn't reduced if you are encumbered or wearing heavy armor. In addition, you can jump three times the normal distance, though you can't jump farther than your remaining movement would allow."
	},
	"brooch of shielding" : {
		name : "Brooch of Shielding",
		source : ["D", 156],
		description : "While wearing this brooch, I have resistance to force damage, and I have immunity to damage from the magic missile spell.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 0,
		descriptionFull : "While wearing this brooch, you have resistance to force damage, and you have immunity to damage from the magic missile spell."
	},
	"broom of flying" : {
		name : "Broom of Flying",
		source : ["D", 156],
		description : "If I speak this broom's command word while standing astride it, it then hovers beneath me and can be ridden. It has a 50 ft flying speed and can carry up to 400 lb. While carring over 200 lb, its speed becomes 30 ft. The broom stops hovering when I land.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 3,
		descriptionFull : "This wooden broom, which weighs 3 pounds, functions like a mundane broom until you stand astride it and speak its command word. It then hovers beneath you and can be ridden in the air. It has a flying speed of 50 feet. It can carry up to 400 pounds, but its flying speed becomes 30 feet while carrying over 200 pounds. The broom stops hovering when you land." + "\n   " + "You can send the broom to travel alone to a destination within 1 mile of you if you speak the command word, name the location, and are familiar with that place. The broom comes back to you when you speak another command word, provided that the broom is still within 1 mile of you."
	},
	"cap of water breathing" : {
		name : "Cap of Water Breathing",
		source : ["D", 157],
		description : "If wearing this cap underwater, I can speak its command word as an action to create a bubble of air around my head, allowing me to breathe normally. This bubble stays until I again speak the command word, the cap is removed, or I am not underwater.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "While wearing this cap underwater, you can speak its command word as an action to create a bubble of air around your head. It allows you to breathe normally underwater. This bubble stays with you until you speak the command word again, the cap is removed, or you are no longer underwater."
	},
	"chime of opening" : {
		name : "Chime of Opening",
		source : ["D", 158],
		description : "As an action, I can strike it and point it at an object within 120 ft that can be opened. One lock or latch on it opens unless the sound can't reach the object. If no locks or latches remain, the object itself opens. The chime has ten charges.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "rare",
		attunement : false,
		weight : 1,
		descriptionFull : "This hollow metal tube measures about 1 foot long and weighs 1 pound. You can strike it as an action, pointing it at an object within 120 feet of you that can be opened, such as a door, lid, or lock. The chime issues a clear tone, and one lock or latch on the object opens unless the sound can't reach the object. If no locks or latches remain, the object itself opens." + "\n   " + "The chime can be used ten times. After the tenth time, it cracks and becomes useless."
	},
	"decanter of endless water" : {
		name : "Decanter of Endless Water",
		source : ["D", 161],
		description : "I can use an action to remove the stopper from this flask and speak one of three command words, making fresh/salt water (my choice) pour out until the start of my next turn. 'Stream' produces 1 gallon of water. 'Fountain' produces 5 gallons of water.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 2,
		descriptionFull : "This stoppered flask sloshes when shaken, as if it contains water. The decanter weighs 2 pounds." + "\n   " + "You can use an action to remove the stopper and speak one of three command words, whereupon an amount of fresh water or salt water (your choice) pours out of the flask. The water stops pouring out at the start of your next turn. Choose from the following options:" + "\n \u2022 " + "'Stream' produces 1 gallon of water." + "\n \u2022 " + "'Fountain' produces 5 gallons of water." + "\n \u2022 " + "'Geyser' produces 30 gallons of water that gushes forth in a geyser 30 feet long and 1 foot wide. As a bonus action while holding the decanter, you can aim the geyser at a creature you can see within 30 feet of you. The target must succeed on a DC 13 Strength saving throw or take 1d4 bludgeoning damage and fall prone. Instead of a creature, you can target an object that isn't being worn or carried and that weighs no more than 200 pounds. The object is either knocked over or pushed up to 15 feet away from you."
	},
	"deck of many things" : {
		name : "Deck of Many Things",
		source : ["D", 162],
		description : "Before drawing cards from this deck, I must declare how many I wish to draw and that draw that number randomly. Any cards drawn in excess have no effect. When a card is drawn, its magic takes effect, it fades from existence, and reappears in the deck.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "legendary",
		attunement : false,
		weight : 0,
		descriptionFull : "Usually found in a box or pouch, this deck contains a number of cards made of ivory or vellum. Most (75 percent) of these decks have only thirteen cards, but the rest have twenty-two." + "\n \u2022 " + "Before you draw a card, you must declare how many cards you intend to draw and then draw them randomly (you can use an altered deck of playing cards to simulate the deck). Any cards drawn in excess of this number have no effect. Otherwise, as soon as you draw a card from the deck, its magic takes effect. You must draw each card no more than 1 hour after the previous draw. If you fail to draw the chosen number, the remaining number of cards fly from the deck on their own and take effect all at once." + "\n \u2022 " + "Once a card is drawn, it fades from existence. Unless the card is the Fool or the Jester, the card reappears in the deck, making it possible to draw the same card twice." + "\n \u2022 " + "For a description of each card, see the Dungeon Master's Guide, page 162."
	},
	"dimensional shackles" : {
		name : "Dimensional Shackles",
		source : ["D", 165],
		description : "As an action, I can shackle a creature of size Small to Large. They work as mundane manacles and prevent extradimensional movement. I and others I designate can remove them as an action. The bound target can break them on Athletics DC 30.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "rare",
		attunement : false,
		weight : 6,
		descriptionFull : "You can use an action to place these shackles on an incapacitated creature. The shackles adjust to fit a creature of Small to Large size. In addition to serving as mundane manacles, the shackles prevent a creature bound by them from using any method of extradimensional movement, including teleportation or travel to a different plane of existence. They don't prevent the creature from passing-through an interdimensional portal." + "\n   " + "You and any creature you designate when you use the shackles can use an action to remove them. Once every 30 days, the bound creature can make a DC 30 Strength (Athletics) check. On a success, the creature breaks free and destroys the shackles."
	},
	"driftglobe" : {
		name : "Driftglobe",
		source : ["D", 166],
		description : "When I'm within 60 ft of this small glass sphere, I can speak its command word to make it shine light as the Light or Daylight spell. The daylight effect, once used, can't be used again until the next dawn. Then, as an action, I can speak another command to make it hover 5 ft off the ground. It hovers until grasped from the air. If I move more than 60 ft from the hovering globe, it follows me at a distance of 60 ft, taking the shortest route. If it can't move, it sinks to the ground and becomes inactive with shining light.",
		descriptionLong : true,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 1,
		descriptionFull : "This small sphere of thick glass weighs 1 pound. If you are within 60 feet of it, you can speak its command word and cause it to emanate the light or daylight spell. Once used, the daylight effect can't be used again until the next dawn." + "\n   " + "You can speak another command word as an action to make the illuminated globe rise into the air and float no more than 5 feet off the ground. The globe hovers in this way until you or another creature grasps it. If you move more than 60 feet from the hovering globe, it follows you until it is within 60 feet of you. It takes the shortest route to do so. If prevented from moving, the globe sinks gently to the ground and becomes inactive, and its light winks out."
	},
	"eyes of minute seeing" : {
		name : "Eyes of Minute Seeing",
		source : ["D", 168],
		description : "These crystal lenses fit over the eyes. While wearing them, I can see much better than normal out to a range of 1 ft. I have advantage on Int (Investigation) checks that rely on sight while searching an area or studying an object within that range.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "These crystal lenses fit over the eyes. While wearing them, you can see much better than normal out to a range of 1 foot. You have advantage on Intelligence (Investigation) checks that rely on sight while searching an area or studying an object within that range."
	},
	"eyes of the eagle" : {
		name : "Eyes of the Eagle",
		source : ["D", 168],
		description : "These crystal lenses fit over the eyes. While wearing them, I have advantage on Wisdom (Perception) checks that rely on sight. In conditions of clear visibility, I can make out details of even extremely distant creatures and objects as small as 2 feet across.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 0,
		descriptionFull : "These crystal lenses fit over the eyes. While wearing them, you have advantage on Wisdom (Perception) checks that rely on sight. In conditions of clear visibility, you can make out details of even extremely distant creatures and objects as small as 2 feet across."
	},
	"folding boat" : {
		name : "Folding Boat",
		source : ["D", 170],
		description : "A wooden box of 12 by 6 by 6 inches, that can be opened to put items in. As an action, I can speak one of the three command words. One causes it to unfold into a boat 10 ft by 4 ft by 2 ft deep, with oars, an anchor, a mast, and a lateen sail, and can hold four Medium creatures. Two causes it to unfold into a ship 24 ft by 8 ft by 6 ft deep, with a deck, rowing seats, five sets of oars, a steering oar, an anchor, a deck cabin, and a mast with a square sail and can hold fifteen Medium creatures comfortably. Three causes it to fold up.",
		descriptionLong : true,
		category : "wondrous item",
		rarity : "rare",
		attunement : false,
		weight : 4,
		descriptionFull : "This object appears as a wooden box that measures 12 inches long, 6 inches wide, and 6 inches deep. It weighs 4 pounds and floats. It can be opened to store items inside. This item also has three command words, each requiring you to use an action to speak it." + "\n   " + "One command word causes the box to unfold into a boat 10 feet long, 4 feet wide, and 2 feet deep. The boat has one pair of oars, an anchor, a mast, and a lateen sail. The boat can hold up to four Medium creatures comfortably." + "\n   " + "The second command word causes the box to unfold into a ship 24 feet long, 8 feet wide, and 6 feet deep. The ship has a deck, rowing seats, five sets of oars, a steering oar, an anchor, a deck cabin, and a mast with a square sail. The ship can hold fifteen Medium creatures comfortably." + "\n   " + "When the box becomes a vessel, its weight becomes that of a normal vessel its size, and anything that was stored in the box remains in the boat." + "\n   " + "The third command word causes the folding boat to fold back into a box, provided that no creatures are aboard. Any objects in the vessel that can't fit inside the box remain outside the box as it folds. Any objects in the vessel that can fit inside the box do so."
	},
	"gem of brightness" : {
		name : "Gem of Brightness",
		source : ["D", 171],
		description : "This prism has 50 charges. I can speak one of 3 command words as an action. 1) uses no charges to shed bright light in 30-ft radius and dim light for an extra 30 ft, lasting until I say the word as a bonus action or I use another function. 2) uses 1 charge to fire a beam of light at someone I see within 60 ft, who must make a DC 15 Con save or be blinded for 1 minute. It gets a save at the end of each of its turns to end the effect. 3) expends 5 charges to flare a 30-ft cone of light with the same effect as the beam to all in the area.",
		descriptionLong : true,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "This prism has 50 charges. While you are holding it, you can use an action to speak one of three command words to cause one of the following effects:" + "\n \u2022 " + "The first command word causes the gem to shed bright light in a 30-foot radius and dim light for an additional 30 feet. This effect doesn't expend a charge. It lasts until you use a bonus action to repeat the command word or until you use another function of the gem." + "\n \u2022 " + "The second command word expends 1 charge and causes the gem to fire a brilliant beam of light at one creature you can see within 60 feet of you. The creature must succeed on a DC 15 Constitution saving throw or become blinded for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success." + "\n \u2022 " + "The third command word expends 5 charges and causes the gem to flare with blinding light in a 30-foot cone originating from it. Each creature in the cone must make a saving throw as if struck by the beam created with the second command word." + "\n   " + "When all of the gem's charges are expended, the gem becomes a nonmagical jewel worth 50 gp."
	},
	"gloves of missile snaring" : {
		name : "Gloves of Missile Snaring",
		source : ["D", 172],
		description : "When a ranged weapon attack hits me and I have a hand free, I can use my reaction to reduce the damage of that attack by 1d10 + my Dex mod. If I reduce the damage to 0, I can catch the missile if it is small enough for me to hold in that hand.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 0,
		descriptionFull : "These gloves seem to almost meld into your hands when you don them. When a ranged weapon attack hits you while you're wearing them, you can use your reaction to reduce the damage by 1d10 + your Dexterity modifier, provided that you have a free hand. If you reduce the damage to 0, you can catch the missile if it is small enough for you to hold in that hand."
	},
	"gloves of swimming and climbing" : {
		name : "Gloves of Swimming and Climbing",
		source : ["D", 172],
		description : "While wearing these gloves, climbing and swimming don't cost me extra movement, and I gain a +5 bonus to Strength (Athletics) checks made to climb or swim.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 0,
		descriptionFull : "While wearing these gloves, climbing and swimming don't cost you extra movement, and you gain a +5 bonus to Strength (Athletics) checks made to climb or swim."
	},
	"goggles of night" : {
		name : "Goggles of Night",
		source : ["D", 172],
		description : "While wearing these dark lenses, I have darkvision out to a range of 60 feet. If I already have darkvision, wearing the goggles increases its range by 60 feet.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "While wearing these dark lenses, you have darkvision out to a range of 60 feet. If you already have darkvision, wearing the goggles increases its range by 60 feet."
	},
	"hat of disguise" : {
		name : "Hat of Disguise",
		source : ["D", 173],
		description : "While wearing this hat, I can use an action to cast the disguise self spell from it at will. The spell ends if the hat is removed.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 0,
		descriptionFull : "While wearing this hat, you can use an action to cast the disguise self spell from it at will. The spell ends if the hat is removed."
	},
	"helm of comprehending languages" : {
		name : "Helm of Comprehending Languages",
		source : ["D", 173],
		description : "While wearing this helm, I can use an action to cast the comprehend languages spell from it at will.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 3,
		descriptionFull : "While wearing this helm, you can use an action to cast the comprehend languages spell from it at will."
	},
	"heward's handy haversack" : {
		name : "Heward's Handy Haversack",
		source : ["D", 174],
		description : "The backpack weighs 5 lb, but has two side pouches that hold up to 20 lb (2 cu ft), while it's central pouch holds up to 80 lb (8 cu ft). Retrieving an item from it requires an action. If the bag is overloaded, pierced, or torn, it is destroyed, as is its content.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "rare",
		attunement : false,
		weight : 5,
		descriptionFull : "This backpack has a central pouch and two side pouches, each of which is an extradimensional space. Each side pouch can hold up to 20 pounds of material, not exceeding a volume of 2 cubic feet. The large central pouch can hold up to 8 cubic feet or 80 pounds of material. The backpack always weighs 5 pounds, regardless of its contents." + "\n   " + "Placing an object in the haversack follows the normal rules for interacting with objects. Retrieving an item from the haversack requires you to use an action. When you reach into the haversack for a specific item, the item is always magically on top." + "\n   " + "The haversack has a few limitations. If it is overloaded, or if a sharp object pierces it or tears it, the haversack ruptures and is destroyed. If the haversack is destroyed, its contents are lost forever, although an artifact always turns up again somewhere. If the haversack is turned inside out, its contents spill forth, unharmed, and the haversack must be put right before it can be used again. If a breathing creature is placed within the haversack, the creature can survive for up to 10 minutes, after which time it begins to suffocate." + "\n   " + "Placing the haversack inside an extradimensional space created by a bag of holding, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened."
	},
	"immovable rod" : {
		name : "Immovable Rod",
		source : ["D", 175],
		description : "As an action, I can a button on the rod, causing it to become magically fixed in place until the button is pressed again as an action. It defies gravity and can hold up to 8000 lb (more causes it to deactivate). DC 30 Strength check to move it up to 10 ft.",
		descriptionLong : false,
		category : "rod",
		rarity : "uncommon",
		attunement : false,
		weight : 2,
		descriptionFull : "This flat iron rod has a button on one end. You can use an action to press the button, which causes the rod to become magically fixed in place. Until you or another creature uses an action to push the button again, the rod doesn't move, even if it is defying gravity. The rod can hold up to 8,000 pounds of weight. More weight causes the rod to deactivate and fall. A creature can use an action to make a DC 30 Strength check, moving the fixed rod up to 10 feet on a success."
	},
	"lantern of revealing" : {
		name : "Lantern of Revealing",
		source : ["D", 179],
		description : "This lantern burns for 6 hours on 1 pint of oil. It shines bright light in a 30-ft radius and dim light for an extra 30 ft. Invisible objects and creatures are visible in the bright light. As an action, I can lower the hood, making it only dim light in a 5-ft radius.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 2,
		descriptionFull : "While lit, this hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet. Invisible creatures and objects are visible as long as they are in the lantern's bright light. You can use an action to lower the hood, reducing the light to dim light in a 5-foot radius."
	},
	"ring of jumping" : {
		name : "Ring of Jumping",
		source : ["D", 191],
		description : "While wearing this ring, I can cast the jump spell from it as a bonus action at will, but can target only myself when I do so.",
		descriptionLong : false,
		category : "ring",
		rarity : "uncommon",
		attunement : true,
		weight : 0,
		descriptionFull : "While wearing this ring, you can cast the jump spell from it as a bonus action at will, but can target only yourself when you do so."
	},
	"ring of swimming" : {
		name : "Ring of Swimming",
		source : ["D", 193],
		description : "I have a swimming speed of 40 feet while wearing this ring.",
		descriptionLong : false,
		category : "ring",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "You have a swimming speed of 40 feet while wearing this ring."
	},
	"plate armor of etherealness" : {
		name : "Plate Armor of Etherealness",
		source : ["D", 185],
		description : "As an action while wearing it, I can speak a command wordt to gain the benefits of an Etherealness spell for 10 minutes or until I remove the armor, or speak the command again as an action. Once used, it can't do this again until the next dawn.",
		descriptionLong : false,
		category : "armor (plate)",
		rarity : "legendary",
		attunement : true,
		weight : 65,
		descriptionFull : "While you're wearing this armor, you can speak its command word as an action to gain the effect of the etherealness spell, which lasts for 10 minutes or until you remove the armor or use an action to speak the command word again. This property of the armor can't be used again until the next dawn." + "\n   " + "The wearer has disadvantage on Stealth (Dexterity) checks." + "\n   " + "If the wearer has a Strength score lower than 15, their speed is reduced by 10 feet."
	},
	"robe of useful items" : {
		name : "Robe of Useful Items",
		source : ["D", 195],
		description : "This robe has cloth patches of various shapes and colors covering it. While wearing the robe, I can use an action to detach one of the patches, causing it to become the object or creature it represents. The robe has two of each of the following patches: Dagger, Bullseye lantern (filled and lit), Steel mirror, 10-ft pole, Hempen rope (50 ft, coiled), and Sack. In addition, the robe has 4d4 other patches. The DM chooses the patches or determines them randomly. Once the last patch is removed, the robe becomes an ordinary garment.",
		descriptionLong : true,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 1,
		descriptionFull : "This robe has cloth patches of various shapes and colors covering it. While wearing the robe, you can use an action to detach one of the patches, causing it to become the object or creature it represents. Once the last patch is removed, the robe becomes an ordinary garment." + "\n\n" + "The robe has two of each of the following patches:" + "\n \u2022 " + "Dagger" + "\n \u2022 " + "Bullseye lantern (filled and lit)" + "\n \u2022 " + "Steel mirror" + "\n \u2022 " + "10-foot pole" + "\n \u2022 " + "Hempen rope (50 feet, coiled)" + "\n \u2022 " + "Sack" + "\n\nIn addition, the robe has 4d4 other patches. The GM chooses the patches or determines them randomly.\n\n" + toUni("d100") + "\t" + toUni("Effect") + "\n" + toUni("01-08") + "\tBag of 100 gp\n" + toUni("09-15") + "\tSilver coffer (1 foot long, 6 inches wide and deep) worth 500 gp\n" + toUni("16-22") + "\tIron door (up to 10 feet wide and 10 feet high, barred on one side of your choice), which you can place in an opening you can reach; it conforms to fit the opening, attaching and hinging itself\n" + toUni("23-30") + "\t10 gems worth 100 gp each\n" + toUni("31-44") + "\tWooden ladder (24 feet long)\n" + toUni("45-51") + "\tA riding horse with saddle bags\n" + toUni("52-59") + "\tPit (a cube 10 feet on a side), which you can place on the ground within 10 feet of you\n" + toUni("60-68") + "\t4 potions of healing\n" + toUni("69-75") + "\tRowboat (12 feet long)\n" + toUni("76-83") + "\tSpell scroll containing one spell of 1st to 3rd level\n" + toUni("84-90") + "\t2 mastiffs\n" + toUni("91-96") + "\tWindow (2 feet by 4 feet, up to 2 feet deep), which you can place on a vertical surface you can reach\n" + toUni("97-00") + "\tPortable ram"
	},
	"rod of lordly might" : {
		name : "Rod of Lordly Might",
		source : ["D", 196],
		description : "This is a +3 mace, but can change using its six buttons as a bonus action (Flame Tongue, +3 battleaxe, +3 spear, 50 ft ladder, battering ram with +10 to Strength checks with it, or pointing to the magnetic north and gives knowledge of current depth/height from the ground). 3 functions each once per day: Drain Life; on hit  DC 17 Con save or 4d6 necrotic damage and heal half of that. Paralyze; on hit DC 17 Str save or paralyzed 1 min, save each turn. Terrify; action, all in 30 ft DC 17 Wis save or frightened 1 min, save each turn.",
		descriptionLong : true,
		category : "rod",
		rarity : "legendary",
		attunement : true,
		weight : 2,
		descriptionFull : "This rod has a flanged head, and it functions as a magic mace that grants a +3 bonus to attack and damage roll made with it. The rod has properties associated with six different buttons that are set in a row along the haft. It has three other properties as well, detailed below." + "\n\n" + toUni("Six Buttons.") + " You can press one of the rod's six buttons as a bonus action. A button's effect lasts until you push a different button or until you push the same button again, which causes the rod to revert to its normal form." + "\n   " + "If you press button 1, the rod becomes a flame tongue as a fiery blade sprouts from the end opposite the rod's flanged head." + "\n   " + "If you press button 2, the rod's flanged head folds down and two crescent-shaped blades spring out, transforming the rod into a magic battleaxe that grants a +3 bonus to attack and damage rolls made with it." + "\n   " + "If you press button 3, the rod's flanged head folds down, a spear point springs from the rod's tip, and the rod's handle lengthens into a 6-foot haft, transforming the rod into a magic spear that grants a+3 bonus to attack and damage rolls made with it." + "\n   " + "If you press button 4, the rod transforms into a climbing pole up to 50 feet long, as you specify. In surfaces as hard as granite, a spike at the bottom and three hooks at the top anchor the pole. Horizontal bars 3 inches long fold out from the sides, 1 foot apart, forming a ladder. The pole can bear up to 4,000 pounds. More weight or lack of solid anchoring causes the rod to revert to its normal form." + "\n   " + "If you press button 5, the rod transforms into a handheld battering ram and gram its user a +10 bonus to Strength checks made to break through doors, barricades, and other barriers." + "\n   " + "If you press button 6, the rod assumes or remains in its normal form and indicates magnetic north. (Nothing happens if this function of the rod is used in a location that has no magnetic north.) The rod also gives you knowledge of your approximate depth beneath the ground or your height above it." + "\n\n" + toUni("Drain Life.") + " When you hit a creature with a melee attack using the rod, you can force the target to make a DC 17 Constitution saving throw. On a failure, the target rakes an extra 4d6 necrotic damage, and you regain a number of hit points equal to half that necrotic damage. This property can't be used again until the next dawn." + "\n\n" + toUni("Paralyze.") + " When you hit a creature with a melee attack using the rod, you can force the target to make a DC 17 Strength saving throw. On a failure, the target is paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on a success. This property can't be used again until the next dawn." + "\n\n" + toUni("Terrify.") + " While holding the rod, you can use an action to force each creature you can see within 30 feet of you to make a DC 17 Wisdom saving throw. On a failure, a target is frightened of you for 1 minute. A frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. This property can't be used again until the next dawn."
	},
	"rope of climbing" : {
		name : "Rope of Climbing",
		source : ["D", 197],
		description : "This 60-ft length of silk rope can hold up to 3,000 pounds. As an action while holding one end of the rope, I can speak the command word to animate it. Then, as a bonus action, I can command the other end to move to a chosen destination, at 10 ft on my turn. I can also tell it to stop moving, to fasten itself securely, to unfasten itself, to knot or unknot itself, or to coil itself for carrying. While knotted, the rope shortens to 50 ft and grants advantage to climb it. The rope has AC 20 and 20 HP, regaining 1 HP per 5 minutes.",
		descriptionLong : true,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 3,
		descriptionFull : "This 60-foot length of silk rope weighs 3 pounds and can hold up to 3,000 pounds. If you hold one end of the rope and use an action to speak the command word, the rope animates. As a bonus action, you can command the other end to move toward a destination you choose. That end moves 10 feet on your turn when you first command it and 10 feet on each of your turns until reaching its destination, up to its maximum length away, or until you tell it to stop. You can also tell the rope to fasten itself securely to an object or to unfasten itself, to knot or unknot itself, or to coil itself for carrying." + "\n   " + "If you tell the rope to knot, large knots appear at 1-foot intervals along the rope. While knotted, the rope shortens to a 50-foot length and grants advantage on checks made to climb it." + "\n   " + "The rope has AC 20 and 20 hit points. It regains 1 hit point every 5 minutes as long as it has at least 1 hit point. If the rope drops to 0 hit points, it is destroyed."
	},
	"sending stones" : {
		name : "Sending Stones",
		source : ["D", 199],
		description : "While I touch one of the pair of stones, I can use an action to cast the sending spell, targeting the bearer of the other stone. If no creature has the other stone, the spell won't cast. Once it is cast, neither stone can be used again until the next dawn.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "Sending stones come in pairs, with each smooth stone carved to match the other so the pairing is easily recognized. While you touch one stone, you can use an action to cast the sending spell from it. The target is the bearer of the other stone. If no creature bears the other stone, you know that fact as soon as you use the stone and don't cast the spell." + "\n   " + "Once sending is cast through the stones, they can't be used again until the next dawn. If one of the stones in a pair is destroyed, the other one becomes nonmagical."
	},
	"slippers of spider climbing" : {
		name : "Slippers of Spider Climbing",
		source : ["D", 200],
		description : "With these light shoes, I can move up, down, and across vertical surfaces and upside down along ceilings, while leaving my hands free. I have a climbing speed equal to my walking speed. The slippers don't work on a slippery surface (e.g. oily or icy).",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		weight : 0.5,
		descriptionFull : "While you wear these light shoes, you can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free. You have a climbing speed equal to your walking speed. However, the slippers don't allow you to move this way on a slippery surface, such as one covered by ice or oil."
	},
	"wand of magic detection" : {
		name : "Wand of Magic Detection",
		source : ["D", 211],
		description : "This wand has 3 charges. While holding it, I can expend 1 charge as an action to cast the detect magic spell from it. The wand regains 1d3 expended charges daily at dawn.",
		descriptionLong : false,
		category : "wand",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "This wand has 3 charges. While holding it, you can expend 1 charge as an action to cast the detect magic spell from it. The wand regains 1d3 expended charges daily at dawn."
	},
	"wand of secrets" : {
		name : "Wand of Secrets",
		source : ["D", 211],
		description : "The wand has 3 charges. While holding it, I can use an action to expend 1 of its charges, and if a secret door or trap is within 30 feet of me, the wand pulses and points at the one nearest to me. The wand regains 1d3 expended charges daily at dawn.",
		descriptionLong : false,
		category : "wand",
		rarity : "uncommon",
		attunement : false,
		weight : 0,
		descriptionFull : "The wand has 3 charges. While holding it, you can use an action to expend 1 of its charges, and if a secret door or trap is within 30 feet of you, the wand pulses and points at the one nearest to you. The wand regains 1d3 expended charges daily at dawn."
	},
	"wings of flying" : {
		name : "Wings of Flying",
		source : ["D", 214],
		description : "With this cloak, I can speak its command word as an action, turning it into a pair of bat or bird wings on my back for 1 hour or until I repeat the command word as an action. This gives me a flying speed of 60 ft. Once used, it takes 1d12 hours to recharge.",
		descriptionLong : false,
		category : "wondrous item",
		rarity : "rare",
		attunement : true,
		weight : 2,
		descriptionFull : "While wearing this cloak, you can use an action to speak its command word. This turns the cloak into a pair of bat wings or bird wings on your back for 1 hour or until you repeat the command word as an action. The wings give you a flying speed of 60 feet. When they disappear, you can't use them again for 1d12 hours."
	}
};

// Create the magic items for the wondrous items class feature of the artificer
ClassList["improved artificer"].features["wondrous invention"].extrachoices.forEach(function (theI) {
	var theItem = theI.replace(/ *\(.*\)/, "");
	var minLevel = Number(theI.replace(/.*level (\d+) artificer.*/, "$1"));
	if (ImpArtMagicItemsList[theItem.toLowerCase()]) {
		ClassList["improved artificer"].features["wondrous invention"][theI.toLowerCase()] = {
			name : theItem,
			description : "",
			source : ["XPtL3:IA", 3],
			eval : "var maI = ArtMagicItemsList[\"" + theItem.toLowerCase() + "\"]; AddMagicItem(maI.name, maI.attunement, maI.description, maI.weight, maI.descriptionLong);",
			removeeval : "RemoveMagicItem(\"" + theItem.toLowerCase() + "\");",
			prereqeval : isNaN(minLevel) ? false : "classes.known['improved artificer'].level >= " + minLevel
		};
	};
});

// A function to add/remove points from "Used" column of the "Intention Points" limited feature
// AddRemove = true for adding, AddRemove = false for removing
changeInventionPointsLimFea = function(AddRemove, points) {
	// find the limited feature
	for (var i = 1; i <= FieldNumbers.limfea; i++) {
		var featureFld = What("Limited Feature " + i);
		var usedFld = tDoc.getField("Limited Feature Used " + i);
		if ((/^(?=.*invention)(?=.*points?).*$/i).test(featureFld)) {
			if (!isNaN(usedFld.value)) usedFld.value += points * (AddRemove ? 1 : -1);
			return;
		}
	}
};
// Now add this function to the eval and removeeval of every invention option
var doThisFunctionNow = function() {
	var inventions = ["inventions: alchemy", "inventions: arcanic firearms", "inventions: clockwork constructs", "inventions: mechanical limbs"];
	for (var inv = 0; inv < inventions.length; inv++) {
		var todo = ClassList["improved artificer"].features[inventions[inv]];
		for (var i = 0; i < todo.extrachoices.length; i++) {
			var objName = todo.extrachoices[i].toLowerCase();
			if (!todo[objName]) {
				console.println(" Error with: " + objName); // DEBUGGING!!!
				continue;
			}
			var pointsNumber = Number(objName.replace(/.*(\d+) invention point.*/, "$1"));
			todo[objName].eval = (todo[objName].eval ? todo[objName].eval + " " : "") + "changeInventionPointsLimFea(true, " + pointsNumber + ");";
			todo[objName].removeeval = (todo[objName].removeeval ? todo[objName].removeeval + " " : "") + "changeInventionPointsLimFea(false, " + pointsNumber + ");";
		}
	}
}();

// Add the clockwork construct creatures
CreatureList["clockwork drone-xptl3"] = {
	name : "Clockwork Drone",
	source : ["XPtL3:IA", 7],
	size : 4,
	type : "Construct",
	subtype : "",
	alignment : "Unaligned",
	ac : 17,
	hp : 9, // corrected HP calculation to be in line with Monster Manual
	hd : [6, 4],
	speed : "0, fly 50 ft",
	scores : [8, 16, 8, 1, 10, 1],
	saves : ["", 5, "", "", "", ""],
	skills : {
		"arcana" : 2,
		"history" : 2,
		"perception" : 4,
		"religion" : 2,
		"stealth" : 4
	},
	damage_immunities : "poison, psychic",
	condition_immunities : "charmed, deafened, frightened, paralyzed, petrified, poisoned",
	senses : "",
	passivePerception : 14,
	languages : "",
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
		name : "Claw",
		ability : 2,
		damage : [1, 4, "slashing"],
		range : "Melee (5 ft)",
		description : "",
		modifiers : [-2, "", ""]
	}],
	traits : [{
		name : "Claw Grab",
		description : "The drone has a claw that can grab and pick up things weighing up to 60 lb."
	}]
};
CreatureList["clockwork fighter-xptl3"] = {
	name : "Clockwork Fighter",
	source : ["XPtL3:IA", 7],
	size : 3,
	type : "Construct",
	subtype : "",
	alignment : "Unaligned",
	ac : 14,
	hp : 22, // corrected HP calculation to be in line with Monster Manual
	hd : [5, 8],
	speed : "30 ft",
	scores : [16, 14, 10, 1, 10, 1],
	saves : ["", "", "", "", "", ""],
	skills : {
		"athletics" : 5,
		"intimidation" : 3
	},
	damage_immunities : "poison, psychic",
	condition_immunities : "charmed, deafened, frightened, paralyzed, petrified, poisoned",
	senses : "",
	passivePerception : 10,
	languages : "",
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
		name : "Punch",
		ability : 1,
		damage : [2, 6, "bludgeoning"],
		range : "Melee (5 ft)",
		description : ""
	}]
};
CreatureList["clockwork mount-xptl3"] = {
	name : "Clockwork Mount",
	source : ["XPtL3:IA", 8],
	size : 2,
	type : "Construct",
	subtype : "",
	alignment : "Unaligned",
	ac : 10,
	hp : 34, // corrected HP calculation to be in line with Monster Manual
	hd : [4, 10],
	speed : "50 ft",
	scores : [18, 10, 16, 1, 10, 1],
	saves : ["", "", "", "", "", ""],
	skills : {
		"athletics" : 5
	},
	damage_immunities : "poison, psychic",
	condition_immunities : "charmed, deafened, frightened, paralyzed, petrified, poisoned",
	senses : "",
	passivePerception : 10,
	languages : "",
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
		name : "Slam",
		ability : 1,
		damage : [1, 10, "bludgeoning"],
		range : "Melee (5 ft)",
		description : "",
		modifiers : [-1, "", false]
	}],
	traits : [{
		name : "Baggage Space",
		description : "The mount has space on the inside that can hold up to 80 lb of equipment."
	}]
};

improvedArtificerClockworkConstructsFunctions = {
	// return the prefix for the companion page where the construct resides, or false if not found
	find : function(constr, returnEmpty) {
		var theRe = [false];
		var isEmpty = [false];
		var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
		if (AScompA) {
			for (var a = 1; a < AScompA.length; a++) {
				if (What(AScompA[a] + 'Comp.Type') == "Clockwork" && What(AScompA[a] + 'Comp.Race').toLowerCase().indexOf(constr.toLowerCase()) != -1) {
					theRe = [AScompA[a]];
					break;
				} else if (returnEmpty && !What(AScompA[a] + 'Comp.Race')) {
					isEmpty.push(AScompA[a]);
				}
			}
		}
		return !theRe[0] && returnEmpty ? isEmpty : theRe;
	},
	// adding a creature
	add : function(constr, notesStr) {
		var isUsed = improvedArtificerClockworkConstructsFunctions.find(constr, true);
		if (isUsed[0]) return; // already exists
		var defaultUnits = What("Unit System") === "imperial";
		notesStr = !notesStr ? "" : defaultUnits ? notesStr : ConvertToMetric(notesStr, 0.5);
		var prefix = isUsed[1] ? isUsed[1] : DoTemplate('AScomp', 'Add');
		var theType = tDoc.getField(prefix + 'Comp.Type');
		theType.value = "Clockwork";
		theType.readonly = true;
		Value(prefix + 'Cnote.Left', notesStr);
		Value(prefix + 'Comp.Race', constr);
		// now do any upgrades that might already have been selected for it
		var invClockworks = GetFeatureChoice('class', 'improved artificer', 'inventions: clockwork constructs', true);
		var toTestFor = constr.toLowerCase().replace('clockwork ', '') + ":";
		for (var i = 0; i < invClockworks.length; i++) {
			if (invClockworks[i].indexOf(toTestFor) == -1) continue;
			var evalThing = ClassList["improved artificer"].features['inventions: clockwork constructs'][invClockworks[i]].eval;
			if (!evalThing) continue;
			try {
				if (typeof evalThing == 'string') {
					eval(evalThing);
				} else if (typeof evalThing == 'function') {
					var runFunction = eval(evalThing.toSource());
					runFunction();
				}
			} catch (error) {
				var eText = "Error when running the eval for '" + invClockworks[i] + "' as part of improvedArtificerClockworkConstructsFunctions.add. This is outside of its normal context. Please contact the author of the feature to correct this issue:\n " + error + "\n ";
				for (var e in error) eText += e + ": " + error[e] + ";\n ";
				console.println(eText);
				console.show();
			}
		}
	},
	// removing a creature
	remove : function(constr) {
		var isUsed = improvedArtificerClockworkConstructsFunctions.find(constr, true);
		if (isUsed[0]) DoTemplate('AScomp', 'Remove', isUsed[0]);
	},
	// add (AddRemove = true) or remove (AddRemove = false)
	// fldsNtxts is an array of arrays with each array being [fieldName, textToAdd];
	text : function(constr, AddRemove, fldsNtxts) {
		var prefix = improvedArtificerClockworkConstructsFunctions.find(constr)[0];
		if (!prefix) {
			console.println('kanker!'); // DEBUGGING!!!
			return; // not found
		}

		var defaultUnits = What("Unit System") === "imperial";

		// loop through the fldsNtxts array
		for (var i = 0; i < fldsNtxts.length; i++) {
			var fld = tDoc.getField(prefix + fldsNtxts[i][0]);
			var txt = fldsNtxts[i][1];

			if (!fld || !txt) continue; // field or text not found

			// change to metric if needed
			if (!defaultUnits && isNaN(txt)) txt = ConvertToMetric(txt, 0.5);

			if (fldsNtxts[i][2]) { // if there is a third entry in the array it means text has to be replaced
				fld.value = fld.value.replace(fldsNtxts[i][2], txt);
			} if (!isNaN(fld.value) && !isNaN(txt)) { // treat change as numbers
				if (AddRemove) {
					fld.value += txt;
				} else {
					fld.value -= txt;
				}
			} else { // treat change as text
				tDoc[(AddRemove ? "Add" : "Remove") + "String"](prefix + fldsNtxts[i][0], txt, true);
			}
		}
	}
};
