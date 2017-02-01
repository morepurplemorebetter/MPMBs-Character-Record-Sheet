/*
	the Artificer Unearthed Arcana of 2017-01-09
	(http://media.wizards.com/2016/dnd/downloads/1_UA_Artificer_20170109.pdf)
	
	WARNING: there are no official multiclassing rules for Artificer; the ones provided here are extrapolated based on other classes.
*/
//adds a class with two subclasses, the Artificer
//this code was contributed by RCanine on ENworld

ClassList.artificer = {
	regExpSearch : /^(?=.*artificer)(?!.*wizard).*$/i,
	name : "Artificer",
	source : ["UA:A", 1],
	primaryAbility : "\n \u2022 Artificer: Intelligence;",
	abilitySave : 4,
	prereqs : "\n \u2022 Artificer: Intelligence 13;",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5],
	die : 8,
	saves : ["Con", "Int"],
	skills : ["\n\n" + toUni("Artificer") + ": Choose three from Arcana, Deception, History, Investigation, Medicine, Nature, Religion, and Sleight of Hand.", "\n\n" + toUni("Multiclass Artificer") + ": Choose one from Arcana, Deception, History, Investigation, Medicine, Nature, Religion, and Sleight of Hand."],
	tools : ["Thieves' tools + any two tools", "Any one tool"],
	armor : [
		[true, true, false, false]
	],
	weapons : [
		[true, false]
	],
	equipment : "Artificer starting equipment:\n \u2022 A handaxe and a light hammer -or- any two simple weapons;\n \u2022 Scale mail -or- studded leather armor;\n \u2022 A light crossbow and 20 bolts;\n \u2022 A dungeoneer's pack;\n \u2022 Thieves' tools.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Artificer Specialist", ["artificer-alchemist", "artificer-gunsmith"]],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : 3,
	spellcastingKnown : {
		spells : [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13]
	},
	features : {
		"subclassfeature1" : {
			name : "Artificer Specialist",
			source : ["UA:A", 2],
			minlevel : 1,
			description : desc([
				"Choose an Artificer Specialist and put it in the \"Class\" field on the first page",
				"Choose either Alchemist or Gunsmith"
			])
		},
		"magic item analysis" : {
			name : "Magic Item Analysis",
			source : ["UA:A", 2],
			minlevel : 1,
			description : desc(["I can cast Detect Magic and Identify as rituals without requiring material components"]),
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
			source : ["UA:A", 3],
			minlevel : 2,
			description : desc(["I have expertise with any tool proficiencies I gain from the Artificer class"]),
			eval : "if (What(\"Too Text\").match(/thieves' tools/i)) { Checkbox(\"Too Exp\", true); };",
			removeeval : "if (What(\"Too Text\").match(/thieves' tools/i)) { Checkbox(\"Too Exp\", false); };"
		},
		"wondrous invention" : {
			name : "Wondrous Invention",
			source : ["UA:A", 3],
			minlevel : 2,
			description : desc(["I gain a magic item that I have crafted; Use the \"Choose Features\" button above"]),
			additional : levels.map(function (n) {
				if (n < 2)
					return "";
				if (n < 5)
					return "1 item";
				if (n < 10)
					return "2 items";
				if (n < 15)
					return "3 items";
				if (n < 20)
					return "4 items";
				return "5 items";
			}),
			extraname : "Wondrous Invention",
			extrachoices : ["Bag of Holding (prereq: level 2 artificer)"] //come back to this with the function at the bottom
		},
		"spellcasting" : {
			name : "Spellcasting",
			source : ["UA:A", 3],
			minlevel : 3,
			description : desc([
				"I can cast artificer spells that I know, using Intelligence as my spellcasting ability",
				"I can use an arcane focus as a spellcasting focus"
			])
		},
		"infuse magic" : {
			name : "Infuse Magic",
			source : ["UA:A", 4],
			minlevel : 4,
			description : desc([
				"By spending 1 minute, I can infuse one of my artificer spells into a nonmagical item",
				"This expends a spell slot as normal and the spell must have a casting time of 1 action",
				"An item holds max one spell for 8 hours; I can have up to my Int mod of infused items",
				"A creature holding an infused item can use an action to cast the spell, using my ability",
				"The spell's target is the creature activating it or, with area of effect spells, the item"
			])
		},
		"mechanical servant" : {
			name : "Mechanical Servant",
			source : ["UA:A", 4],
			minlevel : 6,
			description : desc([
				"I create a construct that obeys my orders and attacks my attackers",
				"I can repair it to 1 HP during a long rest, or build a new one in a week with 1000 gp",
				"As a reaction when I'm attacked in melee, I can have it make a melee attack back"
			])
		},
		"superior attunement" : {
			name : "Superior Attunement",
			source : ["UA:A", 4],
			minlevel : 5,
			description : desc(["I can attune to more magic items"]),
			additional : levels.map(function (n) {
				if (n < 5)
					return "";
				if (n < 15)
					return "4 items";
				if (n < 20)
					return "5 items";
				return "6 items";
			})
		},
		"soul of artifice" : {
			name : "Soul of Artifice",
			source : ["UA:A", 4],
			minlevel : 20,
			description : desc(["I gain a +1 bonus to all saving throws per magic item I am currently attuned to"]),
			save : "+1 to saves per attuned magic item"
		}
	}
};

ClassSubList["artificer-alchemist"] = {
	regExpSearch : /(alchemist)/i,
	subname : "Alchemist",
	source : ["UA:A", 5],
	features : {
		"subclassfeature1.1" : {
			name : "Alchemist's  Satchel",
			source : ["UA:A", 5],
			description : desc([
					"I hav an Alchemist's Satchel, which I use to create concoctions",
					"The bag is magical and allows me to pull out my Alchemical Formulae",
					"The bag's magic reclaims the used materials; they are unlimited",
					"If lost I can create a new one over three days with 100gp worth of raw materials."
				]),
			minlevel : 1
		},
		"subclassfeature1.2" : {
			name : "Alchemical Formula",
			source : ["UA:A", 5],
			description : desc([
					"I learn Alchemical Formula options: Alchemical Fire, Alchemical Acid",
					"I learn additional options based on my level",
					"I must have my Alchemist's Satchel to use them",
					"If a formula requires a saving throw, it uses my spellcasting save"
				]),
			additional : levels.map(function (level) {
				return level < 3 ? "one additional formula" :
				level < 9 ? "two additional formulas" :
				level < 14 ? "three additional formulas" :
				"four additional formulas";
			}),
			extraname : "Formula",
			extrachoices : [],
			minlevel : 1
		}
	}
};
var alchemistFeatures = ClassSubList.alchemist.features["subclassfeature1.2"];
var alchemistExtraChoices = alchemistFeatures.extrachoices;
// alchemical formulae
[{
		name : "Alchemical Fire",
		source : ["UA:A", 5],
		description : desc([
				"You can hurl a vial of volatile liquid at a creature, object, or surface within 30 ft",
				"The vial detonates in a 5-foot radius. Creatures in the area must succeed on a Dexterity save",
				"If they fail, they take damage fire damage based on my artificer level"
			]),
		additional : levels.map(function (level) {
			return level < 4 ? "1d6" :
			level < 7 ? "2d6" :
			level < 10 ? "3d6" :
			level < 13 ? "4d6" :
			level < 16 ? "5d6" :
			level < 19 ? "6d6" :
			"7d6";
		}),
		action : ["action", ""]
	}, {
		name : "Alchemical Acid",
		source : ["UA:A", 5],
		description : desc([
				"You can curl a vial of acid at a creature or object within 30 ft",
				"A creature muast succeed on a Dexterity saving throw or take acid damage",
				"An  object automatically takes acid damage, and the damage is maximized.",
				"The damage is based on my artificer level."
			]),
		additional : levels.map(function (level) {
			return Math.ceil(level / 2) + "d6";
		}),
		action : ["action", ""]
	}, {
		name : "Healing Draught",
		source : ["UA:A", 5],
		description : desc([
				"You can create a vial of healing liquid.",
				"A creature can drink the vial as an action to regain hit points based on my artificer level",
				"A creature must finish a long rest before it can drink a second healing draught",
				"The healing draught disappears after 1 hour.",
				"While a healing draught exists, you can’t use this formula."
			]),
		additional : levels.map(function (level) {
			return Math.ceil(level / 2) + "d8";
		}),
		action : ["action", ""]
	}, {
		name : "Smoke Stick",
		source : ["UA:A", 5],
		description : desc([
				"I can create a stick that produces a thick plume of smoke.",
				"You can hold on to the stick or throw it to a point up to 30 ft away as part of the action",
				"A 10-foot radius around the stick is filled with thick smoke that blocks vision, including darkvision",
				"The stick and smoke persist for 1 minute and then disappear",
				"After using this formula, you can't do so again for 1 minute"
			]),
		action : ["action", ""]
	}, {
		name : "Swift Step Draught",
		source : ["UA:A", 5],
		description : desc([
				"You can create a vial that a creature cand drink as an action",
				"Drinking the draught increases the creature's speed by 20 ft for 1 minute",
				"If not used, the vial and its contents disappear after 1 minute.",
				"After using this formula, you can't do so again for 1 minute."
			]),
		action : ["bonus action", ""]
	}, {
		name : "Tanglefoot Bag",
		source : ["UA:A", 6],
		description : desc([
				"You can create a bag filled tar and hurl it at a point on the ground within 30 ft of you",
				"The bag disappears if you don't hurl the bag by the end of the current turn",
				"The target area become difficult terrain for 1 minute",
				"Any creature that starts its turn on the ground in that area has its speed halved for that turn.",
				"After using this formula, you can’t do so again for 1 minute."
			]),
		action : ["action", ""]
	}, {
		name : "Thunderstone",
		source : ["UA:A", 6],
		description : desc([
				"You can create a crystalline shard and hurl it at a creature, object, or surface within 30 ft",
				"The shard disappears if you don’t hurl it by the end of the current turn",
				"Each creature within 10 feet of the point of impact must make a Constitution saving throw",
				"Creatures that fail are knocked prone and pushed 10 ft away from that point"
			]),
		action : ["action", ""]
	}
].forEach(function (formula) {
	var name = formula.name;
	alchemistExtraChoices.push(name);
	alchemistFeatures[name.toLowerCase()] = formula;
});

var thunderCannon = "Thunder Cannon";

ClassSubList["artificer-gunsmith"] = {
	regExpSearch : /(gunsmith)/i,
	subname : "Gunsmith",
	source : ["UA:A", 6],
	fn : {
		AddMasterSmith : function () {
			AddTool("Smith's tools", "Gunsmith (Master Smith)");
		},
		RemoveMasterSmith : function () {
			RemoveTool("Smith's tools", "Gunsmith (Master Smith)");
		},
		AddThunderCannon : function () {
			RemoveWeapon(thunderCannon);
			AddWeapon(thunderCannon);
		},
		RemoveThunderCannon : function () {
			RemoveWeapon(thunderCannon);
		}
	},
	features : {
		"subclassfeature1.1" : {
			name : "Master Smith",
			source : ["UA:A", 6],
			description : "I gain proficiency with smith's tools, and you learn the mending cantrip",
			minlevel : 1,
			spellcastingBonus : {
				name : "Master Smith",
				spells : ["mending"],
				selection : ["mending"]
			},
			eval : "ClassSubList.gunsmith.fn.AddMasterSmith();",
			removeeval : "ClassSubList.gunsmith.fn.RemoveMasterSmith();"
		},
		"subclassfeature1.2" : {
			name : "Thunder Cannon",
			source : ["UA:A", 6],
			description : desc([
					"I have crafted a firearm, my Thunder Cannon, with which I am proficient",
					"My Thunder Cannon requires a bonus action to reload",
					"If lost, I can replace it over three days with 100gp of metal and other raw materals"
				]),
			weapons : [false, false, ["thunder cannon"]],
			eval : "ClassSubList.gunsmith.fn.AddThunderCannon();",
			removeeval : "ClassSubList.gunsmith.fn.RemoveThunderCannon();",
			action : ["bonus action", " (reload)"],
			minlevel : 1
		},
		"subclassfeature1.3" : {
			name : "Arcane Magazine",
			source : ["UA:A", 6],
			description : desc([
					"I have crafted a leather bag, which I can use to craft ammunition for my Thunder Cannon",
					"I can produce 40 rounds after a long rest and 10 rounds after a short rest",
					"If lost, I can replace it during a long rest with 25gp of leather and other raw materials"
				]),
			minlevel : 1
		},
		"subclassfeature3" : {
			name : "Thunder Monger",
			source : ["UA:A", 6],
			description : desc(["As an action I can attack with my Thunder Cannon and do additional thunder damage"]),
			additional : levels.map(function (level) {
				if (level < 3) {
					return ""
				}
				return Math.floor((level - 1) / 2) + "d6";
			}),
			action : ["action", ""],
			minlevel : 3
		},
		"subclassfeature9" : {
			name : "Blast Wave",
			source : ["UA:A", 6],
			description : desc([
					"As an action I can use my Thunder Cannon to fire in a 15ft cone",
					"Affected creatures must make a Strength saving throw against my Spellcasting DC",
					"Creatures that fail take force damage and are pushed 10ft away from me"
				]),
			additional : levels.map(function (level) {
				return level < 9 ? "" :
				level < 13 ? "2d6" :
				level < 17 ? "3d6" :
				"4d6";
			}),
			action : ["action", ""],
			minlevel : 9
		},
		"subclassfeature14" : {
			name : "Piercing Round",
			source : ["UA:A", 6],
			description : desc([
					"As an action use my Thunder Cannon to fire in a 5'x30' line",
					"Affected creatures must make a Dexterity saving throw against my Spellcasting DC",
					"Creatures that fail take lightning damage"
				]),
			additional : levels.map(function (level) {
				return level < 14 ? "" :
				level < 19 ? "4d6" :
				"6d6";
			}),
			action : ["action", ""],
			minlevel : 14
		},
		"subclassfeature17" : {
			name : "Explosive Round",
			source : ["UA:A", 7],
			description : desc([
					"As an action use my Thunder Cannon to fire in a 30' radius sphere within range",
					"Affected creatures must make a Dexterity saving throw against my Spellcasting DC",
					"Creatures that fail take lightning damage"
				]),
			additional : levels.map(function (level) {
				return level < 17 ? "" : "4d8";
			}),
			action : ["action", ""],
			minlevel : 17
		}
	}
};

// New Ammo: Arcane Magazine
AmmoList["arcane magazine"] = {
	name : "Arcane Magazine",
	weight : 0.075,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Arcane Magazine"
};

// New weapon: Thunder Cannon
WeaponsList["thunder cannon"] = {
	regExpSearch : /(^|\b)thunder cannon.*$/i,
	name : "Thunder Cannon",
	ability : 2,
	type : "Martial", // Actually exotic, but that's not an option
	damage : [2, 6, "piercing"],
	range : "150/500 ft",
	weight : 12, // I made this up based on the weight of real rifles
	description : "Ammunition, loading, two-handed",
	abilitytodamage : true,
	monkweapon : false,
	ammo : "bullet", //the type of ammunition the weapon uses. If the weapon uses no ammunition, remove this line. The options are: "arrow", "bolt", "bullet", "dagger", "dart", "flask", "axe", "javelin", "hammer", "needle", "spear", "trident", and "vial" [note the use of only lower case!]  Any ammunition you add yourself can of course be added here as well
	dc : false,
	modifiers : ["", ""]// bonuses to: [to hit, to damage]; "" means ignore. // You can also enter the three-letter abbreviation of an ability score (Str, Dex, Con, Int, Wis, or Cha), to have that ability's modifier added to it.
};

// Artificer spells
[	// level 1
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
].forEach(function (spell) {
	try {
		SpellsList[spell].classes.push("artificer");
	} catch (e) {
		// console.println('Could not add "' + spell + '" to Artificer class list');
	}
});

// Add mechanical servants to the creature list
// isn't working; unsure why :(
function addCreatureValue(toAdd, value) {
	if (new RegExp("(^|\\b)" + toAdd + "(\\b|$)", "i").test(value)) {
		return value;
	}
	if (value) {
		return toAdd + "; " + value;
	}
	return toAdd;
}
function createMechanicalServant(name, stats) {
	// copy all stats
	var creature = {},
	i;
	for (i in stats) {
		if (stats.hasOwnProperty(i)) {
			creature[i] = stats[i];
		}
	}
	creature.name = "Mechanical Servant (" + creature.name + ")";
	creature.type = "Construct";
	creature.source = ["UA:A", 6];
	creature.damage_immunities = addCreatureValue("poison", creature.damage_immunities);
	creature.condition_immunities = addCreatureValue("poisoned", creature.condition_immunities);
	creature.condition_immunities = addCreatureValue("charmed", creature.condition_immunities);
	var m = (creature.senses || "").match(/darkvision (\d+)/i);
	if (!m) {
		creature.senses = addCreatureValue("Darkvision 60 ft", creature.senses);
	} else if (parseInt(m[2]) < 60) {
		creature.senses = creature.senses.replace(/(darkvision) \d+/i, "$1 60");
	}
	creature.languages = addCreatureValue("understands all languages you speak", creature.languages);
	creature.wildshapeString = "";
	CreatureList["mechnical servant " + name] = creature;
}

Object.keys(CreatureList).forEach(function (name) {
	var creature = CreatureList[name];
	// parseInt will treat 1/8, 1/4, 1/2 as 1
	if (creature.type === "Beast" && creature.size === 2 && parseInt(creature.challengeRating) <= 2) {
		createMechanicalServant(name, creature);
	}
});

UpdateDropdown("ammo", ["arcane magazine"]);
UpdateDropdown("weapon", ["thunder cannon"]);
UpdateDropdown("creature");



//Magic Item additions /// NOG TE DOEN!!!

//create the magic items for the wondrous items class feature
ClassList.artificer.features["wondrous invention"].extrachoices.forEach(function (theI)) {
	var theItem = theI.replace(/ \(.*\)/, "");
	if (MagicItemsList[theItem.toLowerCase()]) {
		ClassList.artificer.features["wondrous invention"][theI.toLowerCase()] = {
			name : theItem,
			description : "",
			source : ["UA:A", 3],
			eval : "var maI = MagicItemsList[\"" + theItem.toLowerCase() + "\"]; AddMagicItem(maI.name, maI.attunement, maI.description, maI.weight, maI.descriptionLong);",
			removeeval : "RemoveMagicItem(\"" + theItem.toLowerCase() + "\");"
		};
	};
};