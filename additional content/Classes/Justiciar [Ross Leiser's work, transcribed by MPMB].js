/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Class
	Effect:     This script adds the class called "Justiciar" and its 5 subclasses "Division of Defense", "Division of Enforcement", "Division of Execution", "Division of Prosecution", and the "Division of Archives" (of the 'Outlandish Justice' expansion)
				This is taken from the DMs Guild website (https://www.dmsguild.com/product/211874/) v2.5
				The "Division of Archives" subclass is also taken from the DMs Guild website (https://www.dmsguild.com/product/227506/) v1.0.1
				This content is made by Ross Leiser (Outlandish Adventure Productions)
	Code by:	MorePurpleMoreBetter
	Date:		2018-06-05 (sheet v12.999)

	Note that the "Division of Reformation" subclasses is not part of this script, even though it appears in the DMs Guild product mentioned above

	Please support the creator of this content (Ross Leiser) and download his material from the DMs Guild website: 
	https://www.dmsguild.com/browse.php?author=Ross%20Leiser
	
	Check out their great subreddit for more Outlandish Adventure Productions: 
	https://www.reddit.com/r/OutlandishAdventure/
*/

var iFileName = "Justiciar [Ross Leiser's work, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

// Define the sources
SourceList["OAP:JC"] = {
	name : "The Justiciar Class v2.5 (Outlandish Adventure Productions)",
	abbreviation : "OAP:JC",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/211874/",
	date : "2017/11/27"
};
SourceList["OAP:OJ"] = {
	name : "Outlandish Justice v1.0.1 (Outlandish Adventure Productions)",
	abbreviation : "OAP:OJ",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/227506/",
	date : "2017/11/28"
};

// Get the sheet to know which spells are justiciar spells
[
	//level 1
	"absorb elements", "alarm", "command", "comprehend languages", "detect magic", "identify", "mage armor", "magic missile", "protection from evil and good", "tenser's floating disk", "thunderwave",
	//level 2
	"arcane lock", "blindness/deafness", "darkvision", "find traps", "magic weapon", "mind spike", "moonbeam", "see invisibility", "silence", "zone of truth",
	//level 3
	"counterspell", "dispel magic", "elemental weapon", "glyph of warding", "magic circle", "nondetection", "protection from energy", "sending", "remove curse",
	//level 4
	"banishment", "freedom of movement", "mordenkainen's private sanctum", "otiluke's resilient sphere", "stoneskin",
	//level 5
	"dispel evil and good", "geas", "legend lore", "telekinesis", "teleportation circle"
].forEach(function (jSpell) {
	if (SpellsList[jSpell]) SpellsList[jSpell].classes.push("justiciar");
});

// Create the custom spell slot progression table
justiciarSpellTable = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 2, 0, 0, 0, 0, 0, 0],
	[0, 0, 2, 0, 0, 0, 0, 0, 0],
	[0, 0, 2, 0, 0, 0, 0, 0, 0],
	[0, 0, 2, 1, 0, 0, 0, 0, 0],
	[0, 0, 3, 1, 0, 0, 0, 0, 0],
	[0, 0, 3, 1, 0, 0, 0, 0, 0],
	[0, 0, 3, 1, 0, 0, 0, 0, 0],
	[0, 0, 3, 1, 1, 0, 0, 0, 0],
	[0, 0, 3, 1, 1, 0, 0, 0, 0],
	[0, 0, 3, 1, 1, 0, 0, 0, 0],
	[0, 0, 3, 1, 1, 0, 0, 0, 0]
]

// Make this a separate variable so we can call it while making the object and avoid duplications
var justiciarSpellsKnownArray = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13];

// Create the justiciar class
ClassList["justiciar"] = {
	regExpSearch : /justiciar/i,
	name : "Justiciar",
	source : ["OAP:JC", 2],
	primaryAbility : "\n \u2022 Justiciar: Strength or Dexterity; and Intelligence;",
	abilitySave : 4,
	prereqs : "\n \u2022 Justiciar: Strength or Dexterity 13, Intelligence 13;",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 10,
	saves : ["Int", "Wis"],
	skills : ["\n\n" + toUni("Justiciar") + ": Choose two from Arcana, History, Insight, Investigation, Nature, and Perception."],
	armor : [
		[true, true, true, true],
		[true, true, false, true]
	],
	weapons : [
		[true, true],
		[true, true]
	],
	equipment : "Justiciar starting equipment:\n \u2022 Leather armor -or- scale mail -or- chain mail;\n \u2022 A martial weapon and a shield -or- two martial weapons;\n \u2022 A longbow and 20 arrows -or- a hand crossbow and 20 bolts -or- 4 javelins\nA dungeoneer's pack -or- a scholar's pack\nA copy of the Tome of Magical Law\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment as well as a copy of the Tome of Magical Law instead of both the class' and the background's starting equipment.",
	subclasses : ["Judiciary Division", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : "justiciar1",
	spellcastingKnown : {
		spells : justiciarSpellsKnownArray
	},
	spellcastingList : {
		"class" : "justiciar",
		level : [1, 3] //lower and higher limit
	},
	features : {
		"judicial education" : {
			name : "Judicial Education",
			source : ["OAP:JC", 3],
			minlevel : 1,
			description : desc([
				"Using my tome of magical law, I can attune to a settlement I'm in like it is a magic item",
				"While attuned, I know the laws, norms and customs of the society",
				"If I lose my tome, I can create a new one in 3 days for 25 gp or buy a new one (100 gp)"
			]),
			additional : levels.map(function(n) {
				return n < 17 ? "counts toward attuned magic item limit" : "doesn't count to attuned magic item limit";
			})
		},
		"binding cell" : {
			name : "Binding Cell",
			source : ["OAP:JC", 3],
			minlevel : 1,
			description : "\n   " + "I can create a magical cell that traps creatures; See the third page's Notes section",
			action : ["action", " (create)"],
			usages : levels.map(function(n) {
				return n < 3 ? 2 : n < 6 ? 3 : n < 12 ? 4 : n < 17 ? 5 : n < 20 ? 6 : "\u221E\u00D7 per ";
			}),
			recovery : "long rest",
			additional : levels.map(function(n) {
				return n < 11 ? "5-ft radius, 10-ft high" : "10-ft radius, 20-ft high";
			}),
			extraNotesTxt : [[
				1,
				"The Justiciar's Binding Cell\n \u2022 Binding Cell (Justiciar 1, OAP:JC 3)" + desc([
					"As an action, I create a cylinder of arcane energy on a point within 30 ft that I can see",
					"Hostiles attempting to pass through the cell's barrier must make a Charisma save each time",
					"Creatures that can cast at least one spell make this saving throw with disadvantage",
					"On a failed save, the creature's speed drops to 0 for the remainder of its turn",
					"The cell lasts 1 min or until I create another, fall unconscious, or I die",
					"I can also dismiss the cell as a bonus action",
					"Creatures that involuntarily pass through the barrier don't have to make a saving throw",
					"This does not apply if the involuntary movement is caused by allies to the creature"
				])
			], [
				10,
				"\n \u2022 Prohibitive Cell (Justiciar 10, OAP:JC 4)" + desc([
					"The binding cell now also interferes with magical attempts of hostiles to pass its barrier",
					"Using magic, teleportation, or dimensional travel requires a Cha save or the attempt fails"
				])
			], [
				11,
				"\n \u2022 Punitive Cell (Justiciar 11, OAP:JC 5)\n   When a hostile begins its turn inside a binding cell of mine, it takes 1d10 force damage"
			], [
				20,
				"\n \u2022 Judge's Cell (Justiciar 20, OAP:JC 5)" + desc([
					"Whenever I create a binding cell, I can select one creature that I can see",
					"That target automatically fails all its saves to pass through the binding cell I just created"
				])
			]],
			fillExtraNotes : function() {
				var jLvl = classes.known.justiciar ? classes.known.justiciar.level : 0;
				var jLvlOld = classes.old.justiciar ? classes.old.justiciar.classlevel : 0;
				if (jLvl == jLvlOld) return;
				var theText = function (input, skipSubClass) {
					var toReturn = "";
					// create an array of all the entries
					var notesArr = [];
					for (var key in CurrentClasses.justiciar.features) {
						if (skipSubClass && key.indexOf("subclassfeature") !== -1) continue;
						if (CurrentClasses.justiciar.features[key].extraNotesTxt) notesArr = notesArr.concat(CurrentClasses.justiciar.features[key].extraNotesTxt);
					}
					if (notesArr.length) {
						// sort this array by the first entry of each subarray
						notesArr.sort(function(a, b) { return a[0] - b[0] });
						// loop through this array and add things
						for (var j = 0; j < notesArr.length; j++) {
							if (notesArr[j][0] <= input) toReturn += notesArr[j][1];
						}
					}
					return toReturn;
				}
				var jTxt = theText(jLvl);
				var jTxtOld = theText(jLvlOld, classes.old.justiciar && !classes.old.justiciar.subclass);
				if (jTxt == jTxtOld) return;
				ReplaceString("Extra.Notes", jTxt, false, jTxtOld);
			},
			eval : "AddAction('bonus action', 'Binding Cell (dismiss)', 'Justiciar'); if(sheetVersion < 13) { Value('Extra.Layers Remember', 'notes,' + What('Extra.Layers Remember').split(',')[1]); LayerVisibilityOptions(false); } else { show3rdPageNotes(); };",
			removeeval : "RemoveAction('bonus action', 'Binding Cell (dismiss)', 'Justiciar');",
			changeeval : "ClassList.justiciar.features['binding cell'].fillExtraNotes();"
		},
		"fighting style" : {
			name : "Fighting Style",
			source : ["OAP:JC", 3],
			minlevel : 2,
			description : "\n   " + "Choose a Fighting Style for the justiciar using the \"Choose Feature\" button above",
			choices : ["Archery", "Close Quarters Shooting", "Defense", "Dueling", "Great Weapon Fighting", "Protection", "Two-Weapon Fighting"],
			"archery" : FightingStyles.archery,
			"defense" : FightingStyles.defense,
			"dueling" : FightingStyles.dueling,
			"great weapon fighting" : FightingStyles.great_weapon,
			"protection" : FightingStyles.protection,
			"two-weapon fighting" : FightingStyles.two_weapon,
			"close quarters shooting" : {
				name : "Close Quarters Shooting Fighting Style",
				description : desc([
					"When I make a ranged weapon attack vs. a target within 20 ft of me, I gain bonuses:",
					"I don't have disadv. if a hostile is within 5 ft and I ignore half and three-quarters cover"
				])
			}
		},
		"court magic" : {
			name : "Court Magic",
			source : ["OAP:JC", 4],
			minlevel : 2,
			description : desc([
				"I can cast justiciar spells that I know, using Intelligence as my spellcasting ability",
				"I regain the justiciar spell slots (1st to 3rd level) on a short rest"
			]),
			additional : levels.map(function(n) {
				return n < 2 ? "" : justiciarSpellsKnownArray[n] + " spells known";
			})
		},
		"subclassfeature3" : {
			name : "Judiciary Division",
			source : ["OAP:JC", 4],
			minlevel : 3,
			description : "\n   " + "Choose a division for my role within the Arcana Court and put it in the \"Class\" field"
		},
		"applied study" : {
			name : "Applied Study",
			source : ["OAP:JC", 4],
			minlevel : 6,
			description : desc([
				"I know the type of a creature by sight, unless it's a shapechanger or magically disguised",
				"As a bonus action, I can study a creature in 60 ft I can see to learn one of the following:",
				"\u2022 One type of damage the creature is vulnerable to, if any",
				"\u2022 One type of damage the creature is resistant or immune to, if any",
				"\u2022 One condition the creature is immune to, if any",
				"\u2022 If the creature is resistant or immune to bludg./pierc./slash. damage from nonmagical",
				"\u2022 If the creature is in its true form",
				"\u2022 The challenge rating of the creature"
			])
		},
		"judicial arcanum" : {
			name : "Judicial Arcanum",
			source : ["OAP:JC", 5],
			minlevel : 13,
			description : desc([
				"I can choose one spell from the justiciar spell list of each level mentioned above",
				"I can cast these spells each once per long rest without needing to use a spell slot",
				"After a long rest, I can use 10 min to swap either out to another from the justiciar list",
				"Alternatively, I can expend an arcanum as a spell slot of its level to cast a spell I know"
			]),
			addtional : levels.map(function(n) {
				return n < 13 ? "" : n < 17 ? "4th level spell" : "4th and 5th level spell";
			}),
			spellcastingBonusForLevel : function(lvl) {
				var reArr = [];
				var jSpells = CreateSpellList({"class" : "justiciar", level : [lvl,lvl]});
				if (CurrentClasses.justiciar.spellcastingExtra) jSpells = jSpells.concat(CurrentClasses.justiciar.spellcastingExtra);
				jSpells.sort();
				for (var j = 0; j < jSpells.length; j++) {
					var jSpl = jSpells[j];
					if (!SpellsList[jSpl] || SpellsList[jSpl].level !== lvl) continue;
					reArr.push({
						name : "Judicial Arcanum (" + lvl + ")",
						spells : [jSpl],
						selection : [jSpl],
						firstCol : sheetVersion < 13 ? "" : "checkbox"
					});
				}
				return reArr;
			},
			eval : "CurrentSpells.justiciar.bonus['judicial arcanum'] = ClassList.justiciar.features['judicial arcanum'].spellcastingBonusForLevel(4);",
			removeeval : "delete CurrentSpells.justiciar.bonus['judicial arcanum']",
			changeeval : "if (classes.known.justiciar.level < 17) {delete CurrentSpells.justiciar.bonus['judicial arcanum (5)']} else {if (!CurrentSpells.justiciar.bonus['judicial arcanum (5)']) {CurrentSpells.justiciar.bonus['judicial arcanum (5)'] = ClassList.justiciar.features['judicial arcanum'].spellcastingBonusForLevel(5);}};"
		},
		"arcane safeguard" : {
			name : "Arcane Safeguard",
			source : ["OAP:JC", 5],
			minlevel : 15,
			description : "\n   " + "I have resistance to damage from spells and advantage on saving throws against spells",
			savetxt : { adv_vs : "spells" },
			dmgres : ["Spells"]
		}
	}
};

// Add the subclasses
AddSubClass("justiciar", "division of defense", {
	regExpSearch : /^(?=.*justiciar)(?=.*defen(se|der)).*$/i,
	subname : "Division of Defense",
	source : ["OAP:JC", 5],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	spellcastingExtra : ["compelled duel", "cure wounds", "lesser restoration", "warding bond", "aura of vitality", "revivify", "aura of life", "death ward", "circle of power"],
	features : {
		"subclassfeature3" : {
			name : "Zealous Representation",
			source : ["OAP:JC", 5],
			minlevel : 3,
			description : desc([
				"As a reaction when a creature within 5 ft hits another with its attack, I can help out",
				"By expending a spell slot, I give the attacked 5 times the slot level in temp. HP (max 15)",
				"Additionally, I can make a weapon attack vs. the attacker as part of the same reaction"
			]),
			action : ["reaction", ""],
			extraNotesTxt : [[
				3,
				"\n \u2022 Defender's Cell (Division of Defense 3, OAP:JC 5)" + desc([
					"While I'm within my binding cell, hostiles get disadv. on attacks vs. creatures other than me"
				])
			], [
				7,
				"\n \u2022 Defender's Rebuttal (Division of Defense 7, OAP:JC 5)" + desc([
					"As a reaction when a creature within my binding cell takes damage, I can protect it",
					"I suffer the damage instead of the creature; This damage can't be reduced in any way"
				])
			]],
			changeeval : "if (newClassLvl.justiciar >= 7) { AddAction('reaction', \"Defender's Rebuttal\", 'Justiciar (Division of Defense)'); } else if (newClassLvl.justiciar < 7 && oldClassLvl.justiciar >= 7) { RemoveAction('reaction', \"Defender's Rebuttal\", 'Justiciar (Division of Defense)'); }; "
		},
		"subclassfeature14" : {
			name : "Alibi Aegis",
			source : ["OAP:JC", 5],
			minlevel : 14,
			description : desc([
				"As a reaction when another in 30 ft has to save for the same spell as me, I can help it",
				"I have to use this after rolling the dice, but before knowing if the save is successful or not",
				"I can substitute my save result for the creature's result"
			]),
			usages : "Intelligence modifier per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "long rest",
			action : ["reaction", ""]
		},
		"subclassfeature18" : {
			name : "Arcane Bastion",
			source : ["OAP:JC", 6],
			minlevel : 18,
			description : "\n   " + "Allies within 10 ft of me and myself gain +2 to AC and saves against spells"
		}
	}
});
AddSubClass("justiciar", "division of enforcement", {
	regExpSearch : /^(?=.*justiciar)(?=.*enforce(ment|r)).*$/i,
	subname : "Division of Enforcement",
	source : ["OAP:JC", 6],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	spellcastingExtra : ["detect evil and good", "hunter's mark", "detect thoughts", "locate object", "clairvoyance", "haste", "arcane eye", "locate creature", "scrying"],
	features : {
		"subclassfeature3" : {
			name : "Excessive Force",
			source : ["OAP:JC", 6],
			minlevel : 3,
			description : desc([
				"When I take the Attack action, I can expend a spell slot to make an extra weapon attack",
				"If this extra attack targets a creature I previously hit in this turn, I get bonuses on it",
				"I then make the attack with advantage and do +1d4 force damage per spell slot level"
			]),
			extraNotesTxt : [[
				3,
				"\n \u2022 Enforcer's Cell (Division of Enforcement 3, OAP:JC 6)" + desc([
					"When I hit a weapon attack against a creature that is inside my cell, I do +2 damage",
					"This only applies if the creature hit was the last creature I hit with an attack"
				])
			], [
				7,
				"\n \u2022 Revelatory Cell (Division of Enforcement 7, OAP:JC 6)\n   Invisibility doesn't work in my binding cell and I know the true form of creatures within it"
			]]
		},
		"subclassfeature14" : {
			name : "Breaching Expert",
			source : ["OAP:JC", 6],
			minlevel : 14,
			description : desc([
				"I have resistance to damage from traps and advantage on saving throws against traps",
				"I get advantage on Dex (Stealth) checks inside any structure created by intelligent beings"
			]),
			savetxt : { adv_vs : ["traps"] },
			dmgres : ["Traps"]
		},
		"subclassfeature18" : {
			name : "Incorruptible Officer",
			source : ["OAP:JC", 6],
			minlevel : 18,
			description : desc([
				"I gain immunity to being charmed, frightened, cursed, or possessed",
				"I am not affected by cursed items"
			]),
			savetxt : { immune : ["charmed", "frightened", "cursed", "possession"] }
		}
	}
});
AddSubClass("justiciar", "division of execution", {
	regExpSearch : /^(?=.*justiciar)(?=.*execution(er)?).*$/i,
	subname : "Division of Execution",
	source : ["OAP:JC", 6],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	spellcastingExtra : ["thunderous smite", "wrathful smite", "branding smite", "hold person", "blinding smite", "fear", "phantasmal killer", "staggering smite", "banishing smite"],
	features : {
		"subclassfeature3" : {
			name : "Arcane Guillotine",
			source : ["OAP:JC", 6],
			minlevel : 3,
			description : desc([
				"When I hit with a melee weapon attack, I can expend a spell slot to do extra damage",
				"The attack does +1d8 force damage per level of the expended spell slot (max 3d8)"
			]),
			extraNotesTxt : [[
				3,
				"\n \u2022 Executioner's Cell (Division of Execution 3, OAP:JC 6)\n   Once per turn I do +1d6 damage with a melee weapon attack to a creature in my cell"
			]]
		},
		"subclassfeature7" : {
			name : "Macabre Mien",
			source : ["OAP:JC", 6],
			minlevel : 7,
			description : "\n   " + "I gain proficiency and expertise with Intimidation and can use Int instead of Cha with it",
			addMod : { type : "skill", field : "Inti", mod : "Int-Cha", text : "I can use Intelligence instead of Charisma for my Intimidation checks." },
			eval : "AddSkillProf('Inti', true, 'true');",
			removeeval : "AddSkillProf('Inti', false, false);",
			skillstxt : "\n\n" + toUni("Macabre Mien (Division of Execution 7)") + ": Proficiency and expertise with Intimidation."
		},
		"subclassfeature14" : {
			name : "Improved Arcane Guillotine",
			source : ["OAP:JC", 6],
			minlevel : 14,
			description : desc([
				"When I use Arcane Guillotine, I can have the target make a Wis save or be frightened",
				"This lasts for 1 minute and the target can repeat the save at the end of each of its turns"
			])
		},
		"subclassfeature18" : {
			name : "Executioner's Spoils",
			source : ["OAP:JC", 6],
			minlevel : 18,
			description : desc([
				"When I reduce a creature to 0 HP with a melee weapon attack, I can regain a spell slot",
				"This only works if the creature is CR 10 or higher and is killed by the attack"
			])
		}
	}
});
AddSubClass("justiciar", "division of prosecution", {
	regExpSearch : /^(?=.*justiciar)(?=.*prosecut(ion|or)).*$/i,
	subname : "Division of Prosecution",
	source : ["OAP:JC", 7],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	spellcastingExtra : ["faerie fire", "shield", "suggestion", "misty step", "blink", "tongues", "compulsion", "confusion", "passwall"],
	features : {
		"subclassfeature3" : {
			name : "Cross Examination",
			source : ["OAP:JC", 7],
			minlevel : 3,
			description : desc([
				"As a reaction when a creature within my weapon's range/reach hit me with an attack,",
				"I can expend a spell slot to make a weapon attack against the attacker",
				"This attack does +1d6 force damage per level of the spell slot expended (max 3d6)"
			]),
			action : ["reaction", ""],
			extraNotesTxt : [[
				3,
				"\n \u2022 Prosecutor's Cell (Division of Prosecution 3, OAP:JC 7)" + desc([
					"When I create a cell, I can immediately teleport to an unoccupied space within the cell",
					"Alternatively, if I don't immediately teleport I can do so as a bonus action on a later turn",
					"I can teleport like this only once per binding cell I create"
				])
			]]
		},
		"subclassfeature7" : {
			name : "Prosecutor's Retort",
			source : ["OAP:JC", 7],
			minlevel : 7,
			description : "\n   " + "As a reaction, I halve the damage of an attack from an attacker that I can see",
			action : ["reaction", ""]
		},
		"subclassfeature14" : {
			name : "Voiding Clause",
			source : ["OAP:JC", 7],
			minlevel : 14,
			description : "\n   " + "Once per long rest, I can cast Counterspell without using a spell slot",
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Voiding Clause",
				spells : ["counterspell"],
				selection : ["counterspell"],
				oncelr : true
			}
		},
		"subclassfeature18" : {
			name : "Prosecutor's Analysis",
			source : ["OAP:JC", 7],
			minlevel : 18,
			description : desc([
				"When I use Applied Study on a creature, I also gain adv. on my weapon attacks vs. it",
				"Additionally, these attacks count as magical; This lasts until the end of my turn"
			])
		}
	}
});
AddSubClass("justiciar", "division of archives", {
	regExpSearch : /^(?=.*justiciar)(?=.*archiv(es|ist)).*$/i,
	subname : "Division of Archives",
	source : ["OAP:OJ", 2],
	spellcastingExtra : ["feather fall", "unseen servant", "continual flame", "locate object", "fly", "leomund's tiny hut", "leomund's secret chest", "mordenkainen's faithful hound", "wall of force"],
	features : {
		"subclassfeature3" : {
			name : "Archival Custodian",
			source : ["OAP:OJ", 2],
			minlevel : 3,
			description : desc([
				"I learn the Mage Hand cantrip; I can use it to deliver 1st-level or higher spells",
				"While the spectral hand persists, I can use its position to cast touch range spells from"
			]),
			spellcastingBonus : {
				name : "Archival Custodian",
				spells : ["mage hand"],
				selection : ["mage hand"],
				atwill : true
			},
			extraNotesTxt : [[
				3,
				"\n \u2022 Archivist's Cell (Division of Archives 3, OAP:OJ 2)" + desc([
					"I know when a magic item is present in my cell, as well as its rarity",
					"As a bonus action, I can try to suppress the magic of a single magic item present in my cell",
					"I have to make an Intelligence (Arcana) check based on the item's rarity",
					"Common: DC 12;    Uncommon: DC 15;    Rare: DC 18;    Very rare: DC 21",
					"Legendary: DC 24;    Sentient: DC 24;    Artifact: DC 30",
					"If I succeed, the magic item becomes mundane while in the cell, until my next turn starts"
				])
			], [
				18,
				"\n \u2022 Chain of Custody (Division of Archives 18, OAP:OJ 2) [1\u00D7 per long rest]" + desc([
					"As an action, I can try to suppress all magic items within my binding cell",
					"I make a single Intelligence (Arcana) check and compare it with every item's rarity DC",
					"Affected items lose their magical properties for 1 minute, even outside the cell"
				])
			]],
			eval : "AddAction('bonus action', \"Archivist's Cell\", 'Justiciar (Division of Archives)');",
			removeeval : "RemoveAction('bonus action', \"Archivist's Cell\", 'Justiciar (Division of Archives)');",
			changeeval : "if (newClassLvl.justiciar >= 18) { AddAction('action', 'Chain of Custody', 'Justiciar (Division of Archives)'); AddFeature('Chain of Custody', 1, '', 'long rest', 'Justiciar (Division of Archives)'); } else if (newClassLvl.justiciar < 18 && oldClassLvl.justiciar >= 18) { RemoveAction('action', 'Chain of Custody', 'Justiciar (Division of Archives)'); RemoveFeature('Chain of Custody', 1); }; "
		},
		"subclassfeature5" : {
			name : "Evidentiary Defender",
			source : ["OAP:OJ", 2],
			minlevel : 5,
			description : desc([
				"I can cast Mage Hand as a bonus action; I can use it to make special spell attacks with",
				"If I take the Attack or Cast a Spell action while the hand persists, I can attack with it",
				"I move the hand up to 30 ft and make a spell attack against a creature within 5 ft of it"
			]),
			additonal : levels.map(function(n) {
				return n < 5 ? "" : (n < 18 ? 1 : 2) + "d6 force damage + Int mod";
			})
		},
		"subclassfeature7" : {
			name : "Cataloguer's Craft",
			source : ["OAP:OJ", 2],
			minlevel : 7,
			description : desc([
				"I learn Detect Magic and Identify, which I can cast as rituals",
				"If I already know one or both of these, I can instead pick another justiciar spell"
			]),
			spellcastingBonus : [{
				name : "Cataloguer's Craft",
				spells : ["detect magic"],
				selection : ["detect magic"]
			}, {
				name : "Cataloguer's Craft",
				spells : ["identify"],
				selection : ["identify"]
			}]
		},
		"subclassfeature14" : {
			name : "Archivist's Affinity",
			source : ["OAP:OJ", 2],
			minlevel : 14,
			description : desc([
				"I gain expertise with Arcana, or proficiency if not so already",
				"I can attune to four magic items instead of three at the same time"
			]),
			skills : "\n\n" + toUni("Archivist's Affinity (Division of Archives 14)") + ": Arcana, or expertise if already proficient.",
			eval : "AddSkillProf('Arc', true, 'increment')",
			removeeval : "AddSkillProf('Arc', false, 'increment')"
		}
	}
});
