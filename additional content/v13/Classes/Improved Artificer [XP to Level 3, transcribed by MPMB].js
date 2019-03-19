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
	Date:		2019-01-30 (sheet v13.0.0beta11)

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
	skillstxt : {
		primary : "Choose three from Arcana, Deception, History, Investigation, Medicine, Nature, Religion, and Sleight of Hand",
		secondary : "Choose one from Arcana, Deception, History, Investigation, Medicine, Nature, Religion, and Sleight of Hand"
	},
	toolProfs : {
		primary : [["Tinker's tools"], ["Any tool", 2]],
		secondary : [["Any tool", 1]]
	},
	armorProfs : {
		primary : [true, true, false, false]
	},
	weaponProfs : {
		primary : [true, false]
	},
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
				weaponsAdd : ['Alchemical Acid'],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artAlcAcid && classes.known['improved artificer'] && classes.known['improved artificer'].level) {
								fields.Proficiency = true;
								fields.Damage_Die = Math.ceil(classes.known['improved artificer'].level / 2) + 'd6';
							}
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
				weaponsAdd : ['Alchemical Fire'],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.artAlcFire && classes.known['improved artificer'] && classes.known['improved artificer'].level) {
								fields.Proficiency = true;
								fields.Damage_Die = Math.ceil(classes.known['improved artificer'].level / 3) + 'd6';
							}
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
				weaponsAdd : ['Dual Pistols'],
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
				weaponsAdd : ['Blunderbuss'],
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
				weaponsAdd : ['Sniper Rifle'],
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
							if (v.theWea.artSniperRifle) fields.Range = '300/450 ft';
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
			extrachoices : []
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

["Eyes of the Eagle", "Cap of Water Breathing", "Driftglobe", "Goggles of Night", "Sending Stones", "Lantern of Revealing", "Alchemy Jug (prereq: level 5 artificer)", "Bag of Holding (prereq: level 5 artificer)", "Helm of Comprehending Languages (prereq: level 5 artificer)", "Ring of Swimming (prereq: level 5 artificer)", "Robe of Useful Items (prereq: level 5 artificer)", "Rope of Climbing (prereq: level 5 artificer)", "Wand of Magic Detection (prereq: level 5 artificer)", "Wand of Secrets (prereq: level 5 artificer)", "Bag of Beans (prereq: level 10 artificer)", "Chime of Opening (prereq: level 10 artificer)", "Decanter of Endless Water (prereq: level 10 artificer)", "Gem of Brightness (prereq: level 10 artificer)", "Dimensional Shackles (prereq: level 10 artificer)", "Gloves of Swimming and Climbing (prereq: level 10 artificer)", "Eyes of Minute Seeing (prereq: level 10 artificer)", "Folding Boat (prereq: level 10 artificer)", "Heward's Handy Haversack (prereq: level 10 artificer)", "Boots of Striding and Springing (prereq: level 15 artificer)", "Brooch of Shielding (prereq: level 15 artificer)", "Broom of Flying (prereq: level 15 artificer)", "Gloves of Missile Snaring (prereq: level 15 artificer)", "Hat of Disguise (prereq: level 15 artificer)", "Immovable Rod (prereq: level 15 artificer)", "Ring of Jumping (prereq: level 15 artificer)", "Slippers of Spider Climbing (prereq: level 15 artificer)", "Rod of Lordly Might (prereq: level 20 artificer)", "Plate Armor of Etherealness (prereq: level 20 artificer)", "Deck of Many Things (prereq: level 20 artificer)", "Wings of Flying (prereq: level 20 artificer)"].forEach(function (theI) {
	var theItem = ParseMagicItem(theI)[0];
	if (!theItem) return;
	var aMI = MagicItemsList[theItem];
	var minLevel = Number(theI.replace(/.*level (\d+) artificer.*/, "$1"));
	var theObj = ClassList["improved artificer"].features["wondrous invention"];
	theObj[theI.toLowerCase()] = {
		name : aMI.name,
		description : "",
		source : aMI.source,
		eval : function (lvl, chc) {
			var aMI = MagicItemsList[ParseMagicItem(chc[1])[0]];
			AddMagicItem(aMI.name);
		},
		removeeval : function (lvl, chc) {
			var theItem = ParseMagicItem(chc[0])[0];
			var loc = CurrentMagicItems.known.indexOf(theItem);
			if (!theItem || loc == -1) return;
			MagicItemClear(loc + 1, true);
		},
		prereqeval : isNaN(minLevel) ? "" : "classes.known['improved artificer'].level >= " + minLevel
	};
	theObj.extrachoices.push(theI);
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
			if (!todo[objName]) continue;
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
