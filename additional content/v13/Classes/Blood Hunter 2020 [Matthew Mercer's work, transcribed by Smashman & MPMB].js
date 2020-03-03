/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds a class called "Blood Hunter" (version of 11 Feb 2020)
				and the four subclasses for it: "Order of the Ghostslayer",
				"Order of the Profane Soul", "Order of the Mutant", and "Order of the Lycan"

				This is taken from the DMs Guild website (https://www.dmsguild.com/product/301641/)
				This class and subclasses are made by Matthew Mercer

	Code by:	Smashman & MorePurpleMoreBetter
	Date:		2020-03-03 (sheet v13.0.0beta27)

	Please support the creator of this content (Matthew Mercer) and download his material from the DMs Guild website:
	https://www.dmsguild.com/browse.php?x=0&y=0&author=Matthew%20Mercer

	Please take note that multiclassing the "Order of the Profane Soul" subclass with the Warlock class will
	result in the wrong amount of spells/cantrips being asked for in the spell selection dialogues.
*/

var iFileName = "Blood Hunter 2020 [Matthew Mercer's work, transcribed by Smashman & MPMB].js";
RequiredSheetVersion(13);

SourceList["MM:BH"] = {
	name : "Matthew Mercer: Blood Hunter Class 2020",
	abbreviation : "MM:BH",
	group : "Dungeon Master's Guild",
	url : "https://www.dmsguild.com/product/301641/",
	date : "2020/02/11"
};

var BHhemocraftDie = function(n) {
	return "1d" + (n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10);
};

ClassList["blood hunter"] = {
	regExpSearch : /^(?=.*blood)(?=.*hunter).*$/i,
	name : "Blood Hunter",
	source : [["MM:BH", 0]],
	primaryAbility : "Strength or Dexterity, and Intelligence",
	prereqs : "Strength 13 or Dexterity 13, and Intelligence 13",
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Dex", "Int"],
	skillstxt : {
		primary : "Choose three from Acrobatics, Arcana, Athletics, History, Insight, Investigation, Religion, and Survival",
		secondary : "Choose one from Acrobatics, Arcana, Athletics, History, Insight, Investigation, Religion, or Survival"
	},
	toolProfs : {
		primary : ["Alchemist's supplies"],
		secondary : ["Alchemist's supplies"]
	},
	armorProfs : {
		primary : [true, true, false, true],
		secondary : [true, true, false, true]
	},
	weaponProfs : {
		primary : [true, true],
		secondary : [true, true]
	},
	equipment : "Blood Hunter starting equipment:\n \u2022 Scale mail -or- studded leather armor;\n \u2022 A martial weapon -or- two simple weapons;\n \u2022 A light crossbow and 20 bolts -or- a hand crossbow and 20 bolts;\n \u2022 An explorer's pack.\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Blood Hunter Orders", []],
	attacks : levels.map(function(n){return n < 5 ? 1 : 2}),
	abilitySave : 4,
	features : {
		"blood maledict" : {
			name : "Blood Maledict",
			source : [["MM:BH", 3]],
			minlevel : 1,
			description : desc([
				'I can use a Blood Curse on targets with blood; Use the "Choose Features" button above',
				"I can amplify it by taking my hemocraft die in damage; Amplified it works on any target",
				"Whenever I learn a new Blood Curse, I can also replace a curse I know with another"
			]),
			additional : levels.map(function (n) {
				return (n < 6 ? 1 : n < 10 ? 2 : n < 14 ? 3 : n < 18 ? 4 : 5) + " curse" + (n < 6 ? "" : "s") + " known";
			}),
			usages : levels.map(function (n) {
				return n < 6 ? 1 : n < 13 ? 2 : n < 17 ? 3 : 4;
			}),
			recovery : "short rest",
			extraname : "Blood Curse",
			extrachoices : ["Blood Curse of the Anxious", "Blood Curse of Binding", "Blood Curse of Bloated Agony", "Blood Curse of Exposure", "Blood Curse of the Eyeless", "Blood Curse of the Fallen Puppet", "Blood Curse of the Marked", "Blood Curse of the Muddled Mind"],
			extraTimes : levels.map(function (n) {
				return n < 6 ? 1 : n < 10 ? 2 : n < 14 ? 3 : n < 18 ? 4 : 5;
			}),
			"blood curse of the anxious" : {
				name : "Blood Curse of the Anxious",
				source : [["MM:BH", 11]],
				description : " [Amplify 1\xD7 per long rest]" + desc([
					"As a bonus action, I can make a creature within 30 ft more susceptible to forceful influence",
					"Until my next turn ends, all Charisma (Intimidation) checks against it are made with adv.",
					"\u2022 Amplify (once per long rest): Disadv. on next Wis save the target makes before curse ends"
				]),
				action : [["bonus action", ""]],
				extraLimitedFeatures : [{
					additional : "Amplify Blood Curse of the Anxious",
					usages : 1,
					recovery : "long rest"
				}]
			},
			"blood curse of binding" : {
				name : "Blood Curse of Binding",
				source : [["MM:BH", 11]],
				description : desc([
					"As a bonus action, I can bind a target I can see within 30 ft up to one size larger than me",
					"It must make a Str save or have 0 speed and can't use reactions until my next turn ends",
					"\u2022 Amplify: The curse lasts for 1 minute and can affect creatures of any size",
					"  At the end of each of the target's turns, it can make another Str save to end the curse"
				]),
				action : [["bonus action", ""]]
			},
			"blood curse of bloated agony" : {
				name : "Blood Curse of Bloated Agony",
				source : [["MM:BH", 11]],
				description : desc([
					"As a bonus action, I can curse a target I can see within 30 ft until the end of my next turn",
					"It has disadv. on Str \u0026 Dex checks and takes 1d8 necrotic damage if it attacks on its turn",
					"\u2022 Amplify: Lasts for 1 min; After each of its turns, the target can make Con save to end it"
				]),
				action : [["bonus action", ""]]
			},
			"blood curse of exposure" : {
				name : "Blood Curse of Exposure",
				source : [["MM:BH", 11]],
				description : desc([
					"As a reaction when a creature I can see in 30 ft makes an attack roll, I can intervene",
					"Before I know if it hits or not, I roll a hemocraft die and subtract it from the attack roll",
					"Creatures immune to blindness are not affected by this",
					"\u2022 Amplify: apply to all of the target's attacks this turn; Separate hemocraft die roll for each"
				]),
				action : [["reaction", ""]]
			},
			"blood curse of the eyeless" : {
				name : "Blood Curse of the Eyeless",
				source : [["MM:BH", 11]],
				description : desc([
					"As a reaction when a creature I can see in 30 ft makes an attack roll, I can roll a hemocraft die",
					"Subtract number rolled from attack roll. Creatures immune to blindness are not affected",
					"\u2022 Amplify: Apply to all attacks until the end of the turn. Roll new hemocraft die each time"
				]),
				action : [["reaction", ""]]
			},
			"blood curse of the fallen puppet" : {
				name : "Blood Curse of the Fallen Puppet",
				source : [["MM:BH", 12]],
				description : desc([
					"As a reaction when a creature I can see in 30 ft drops to 0 HP, I can make it attack",
					"It makes one weapon attack against a target of my choice within its attack range",
					"\u2022 Amplify: Before making the attack, I can move the creature up to half its speed",
					"   Also, the attack and damage roll gain a bonus equal to my Intelligence modifier (min 1)"
				]),
				action : [["reaction", ""]]
			},
			"blood curse of the marked" : {
				name : "Blood Curse of the Marked",
				source : [["MM:BH", 12]],
				description : desc([
					"As a bonus action, I can mark an enemy within 30 ft of me until the end of my turn",
					"When I deal rite damage to the marked target, I deal an additional hemocraft die",
					"\u2022 Amplify: My next attack against the target before the end of my turn has advantage"
				]),
				action : [["bonus action", ""]]
			},
			"blood curse of the muddled mind" : {
				name : "Blood Curse of the Muddled Mind",
				source : [["MM:BH", 12]],
				description : desc([
					"As a bonus action, I can curse a creature I can see in 30 ft that is concentrating on a spell",
					"That creature has disadv. on its next concentration save before the end of my next turn",
					"\u2022 The target has disadv. on all concentration saves before the end of my next turn"
				]),
				action : [["bonus action", ""]]
			}
		},
		"hemocraft die" : {
			name : "Hemocraft Die",
			source : [["MM:BH", 3]],
			minlevel : 1,
			description : "",
			additional : levels.map(BHhemocraftDie)
		},
		"hunter's bane" : {
			name : "Hunter's Bane",
			source : [["MM:BH", 3]],
			minlevel : 1,
			description : "\n   I get adv. on Int checks to recall info about, and Survival to track, fey, fiends, or undead"
		},
		"crimson rite" : {
			name : "Crimson Rite",
			source : [["MM:BH", 4]],
			minlevel : 2,
			description : desc([
				"As a bonus action, I can imbue a weapon with a rite; A weapon can hold only one rite",
				'When I do so, I take my hemocraft die in damage; Use "Choose Feature" button for rites',
				"Imbued weapons deal extra damage equal to my hemocraft die of the rite's damage type",
				"This lasts until I finish my next short or long rest or I'm not holding it as my turn ends"
			]),
			additional : levels.map(function (n) {
				return (n < 6 ? 1 : 2) + " primal rite" + (n < 6 ? "" : n < 14 ? "s" : "s \u0026 1 esoteric rite") + " known";
			}),
			action : [["bonus action", ""]],
			extraname : "Crimson Rite",
			extrachoices : ["\x1BPrimal Rite of the Flame", "\x1BPrimal Rite of the Frozen", "\x1BPrimal Rite of the Storm", "Esoteric Rite of the Roar", "Esoteric Rite of the Oracle", "Esoteric Rite of the Dead"],
			extraTimes : levels.map(function (n) {
				return n < 6 ? 1 : n < 14 ? 2 : 3;
			}),
			"\x1Bprimal rite of the flame" : {
				source : [["MM:BH", 4]],
				name : "Rite of the Flame",
				description : " [fire damage]"
			},
			"\x1Bprimal rite of the frozen" : {
				source : [["MM:BH", 4]],
				name : "Rite of the Frozen",
				description : " [cold damage]"
			},
			"\x1Bprimal rite of the storm" : {
				source : [["MM:BH", 4]],
				name : "Rite of the Storm",
				description : " [lightning damage]"
			},
			"esoteric rite of the dead" : {
				source : [["MM:BH", 4]],
				name : "Rite of the Dead",
				description : " [necrotic damage]",
				prereqeval : function() { return classes.known['blood hunter'].level >= 14 }
			},
			"esoteric rite of the oracle" : {
				source : [["MM:BH", 4]],
				name : "Rite of the Oracle",
				description : " [psychic damage]",
				prereqeval : function() { return classes.known['blood hunter'].level >= 14 }
			},
			"esoteric rite of the roar" : {
				source : [["MM:BH", 4]],
				name : "Rite of the Roar",
				description : " [thunder damage]",
				prereqeval : function() { return classes.known['blood hunter'].level >= 14 }
			},
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && (/\brite\b/i).test(v.WeaponText)) {
							fields.Description += (fields.Description ? '; ' : '') + '+' + BHhemocraftDie(classes.known['blood hunter'].level) + ' rite damage';
						}
					},
					"If I include the word 'Rite' in a weapon's name, it gets my hemocraft damage die added in its description."
				]
			}
		},
		"fighting style" : {
			name : "Fighting Style",
			source : [["MM:BH", 3]],
			minlevel : 2,
			description : '\n   Choose a Fighting Style using the "Choose Feature" button above',
			choices : ["Archery", "Dueling", "Great Weapon Fighting", "Two-Weapon Fighting"],
			"archery" : FightingStyles.archery,
			"dueling" : FightingStyles.dueling,
			"great weapon fighting" : FightingStyles.great_weapon,
			"two-weapon fighting" : FightingStyles.two_weapon
		},
		"subclassfeature3" : {
			name : "Blood Hunter Order",
			source : [["MM:BH", 4]],
			minlevel : 3,
			description : desc([
				'Choose a Blood Hunter Order you commit to and put it in the "Class" field',
				"Choose either the Order of the Ghostslayer, Lycan, Mutant, or Profane Soul"
			])
		},
		"brand of castigation": {
			name : "Brand of Castigation",
			source : [["MM:BH", 4]],
			minlevel : 6,
			description : levels.map(function (n) {
				var castigationDescr = [
					"I can brand a creature I damage with my crimson rite; I then know the direction to it",
					"This lasts until I dismiss it or brand another; It can be dispelled as a spell of half my level",
					"If it damages me or a creature in 5 ft, it takes my Int mod in psychic damage (min 1)"
				];
				var tetheringDescr = castigationDescr.slice(0,2).concat(["If it damages me or another in 5 ft, it takes 2× my Int mod in psychic damage (min 2)"]);
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
			source : [["MM:BH", 4]],
			minlevel : 9,
			description : "\n   I have adv. on Int (History) checks about an object I'm touching or a location where I am"
		},
		"dark augmentation" : {
			name : "Dark Augmentation",
			source : [["MM:BH", 4]],
			minlevel : 10,
			description : "\n   I have +5 ft speed and add my Int modifier (min 1) to my Str, Dex, and Con saves",
			speed : { allModes : "+5" },
			addMod : [{
				type : "save", field : "Str", mod : "max(Int|1)",
				text : "I add my Intelligence modifier (min 1) to my Strength, Dexterity, and Constitution saving throws"
			}, {
				type : "save", field : "Dex", mod : "max(Int|1)",
				text : "I add my Intelligence modifier (min 1) to my Strength, Dexterity, and Constitution saving throws"
			}, {
				type : "save", field : "Con", mod : "max(Int|1)",
				text : "I add my Intelligence modifier (min 1) to my Strength, Dexterity, and Constitution saving throws"
			}]
		},
		"brand of tethering" : {
			name : "Brand of Tethering",
			source : [["MM:BH", 4]],
			minlevel : 13,
			description : " [Castigation deals 2× Int mod damage]" + desc([
				"A branded target can't use Dash; It must succeed on a Wis save to teleport or plane shift",
				"It takes 4d6 psychic damage when trying to teleport/plane shift, regardless of the save"
			])
		},
		"hardened soul" : {
			name : "Hardened Soul",
			source : [["MM:BH", 5]],
			minlevel : 14,
			description : " [adv. on saves vs. being frightened/charmed]",
			savetxt : { adv_vs : ["frightened", "charmed"] }
		},
		"sanguine mastery" : {
			name : "Sanguine Mastery",
			source : [["MM:BH", 5]],
			minlevel : 20,
			description : desc([
				"Once per turn when a feature requires a hemocraft die, I can reroll and choose the result",
				"When I score a critical hit with a rite-imbued weapon, I regain one use of blood maledict"
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
				"As a bonus action, I can transform into a hybrid lycanthropy form",
				"This form lasts " + (lvl < 18 ? "for an hour or " : "") + "until I transform back as a bonus action",
				"I can speak, use equipment, and wear armor in this form",
				"I revert back to my normal form if I fall unconscious, drop to 0 HP, or die",
				"While I am in this hybrid form, I gain the following features:"
			]);
			theText += "\n\u25C6 Feral Might (Order of the Lycan 3, MM:BH 10)" + desc([
				"I gain +" + atkBonus + " on melee damage rolls; I have advantage on Str checks and saves"
			]);
			theText += "\n\u25C6 Resilient Hide (Order of the Lycan 3, MM:BH 10)" + desc([
				"I gain resistance to nonmagical bludgeoning, piercing, and slashing damage",
				"Attacks that are made by silvered weapons bypass this resistance",
				"I gain +1 bonus to AC while I am not wearing heavy armor"
			]);
			theText += "\n\u25C6 Predatory Strikes (Order of the Lycan 3, MM:BH 10)" + desc([
				"My unarmed strikes are more powerful and can be imbued with a crimson rite",
				"They deal " + PSdie + " slashing damage and I can use either Dex or Str with them",
				"When I use them during an Attack action, I can make another as a bonus action"
			]);
			theText += "\n\u25C6 Bloodlust (Order of the Lycan 3, MM:BH 10)" + desc([
				"I must make a Wisdom save if I start my turn with no more than half my max HP",
				"This has DC 8; " + (lvl < 15 ? "" : "I have advantage on this save;") + "If I fail, I go into a frenzy",
				"I automatically fail if I am under an effect that prevents concentrating (like Rage)",
				"If I fail, I must move to the nearest creature (randomize if multiple) and attack it",
				"I must use the Attack action, but may choose not to use my Extra Attack feature",
				"After this Attack action, I regain control and can continue my turn"
			]);
			if (lvl >= 7) {
				theText += "\n\u25C6 Improved Predatory Strikes (Order of the Lycan 7, MM:BH 11)" + desc([
					"My predatory strikes gain a +" + atkBonus + " bonus on attack rolls",
					"If I have an active crimson rite, my predatory strikes are considered magical"
				]);
			}
			if (lvl >= 11) {
				theText += "\n\u25C6 " + "Lycan Regeneration (Order of the Lycan 11, MM:BH 11)" + desc([
					"If I have less than half my max HP at the start of my turn, I heal myself",
					"I regain 1 + Constitution modifier HP (min 1); This doesn't work if I'm at 0 HP"
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
	source : [["MM:BH", 5]],
	fullname : "Ghostslayer",
	features : {
		"subclassfeature3" : {
			name : "Curse Specialist",
			source : [["MM:BH", 5]],
			minlevel : 3,
			description : "\n   I gain an extra blood maledict use; My curses can always affect creatures without blood",
			eval : function (v) {
				AddFeature('Blood Maledict', 1, '', 'short rest', 'Order of the Ghostslayer: Curse Specialist', 'bonus');
			},
			removeeval : function (v) {
				RemoveFeature('Blood Maledict', 1);
			},
			extraname : "Crimson Rite",
			"primal rite of the dawn" : {
				source : [["MM:BH", 5]],
				name : "Rite of the Dawn",
				description : " [radiant damage]" + desc([
					"While this rite is active, my weapon deals an extra hemocraft die of rite damage vs. undead",
					"Also, my weapon sheds 20-ft radius bright light and I gain resistance to necrotic damage"
				])
			},
			autoSelectExtrachoices : [{
				extrachoice : 'primal rite of the dawn'
			}]
		},
		"subclassfeature7" : {
			name : "Ethereal Step",
			source : [["MM:BH", 5]],
			minlevel : 7,
			description : desc([
				"At the start of my turn, if I'm not incapacitated, I can choose to step between planes",
				"I can then see and affect ethereal things; This lasts for my Int mod in rounds (min 1)",
				"Also, I can move through normal creatures and objects as if they were difficult terrain",
				"If I end my turn inside something, I take 1d10 force damage, or 2 per ft if I'm shunted",
				"I'm shunted to an empty space if this feature ends while I'm inside a creature or object"
			]),
			usages : levels.map(function (n) { return n < 7 ? 0 : n < 15 ? 1 : 2; }),
			recovery : "short rest"
		},
		"subclassfeature11" : {
			name : "Brand of Sundering",
			source : [["MM:BH", 6]],
			minlevel : 11,
			description : desc([
				"If I damage a branded creature with a weapon with an active crimson rite, I sunder it",
				"It takes an extra hemocraft die of damage and can't move through objects or creatures"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && (/\brite\b/i).test(v.WeaponText)) {
							fields.Description += (fields.Description ? '; ' : '') + '+' + BHhemocraftDie(classes.known['blood hunter'].level) + ' rite damage vs. branded creature';
						}
					},
					"If I include the word 'Rite' in a weapon's name, it gets an additional hemocraft die if target is branded."
				]
			},
			extraname : "Order of the Ghostslayer 15; Blood Curse",
			"blood curse of the exorcist" : {
				source : [["MM:BH", 11]],
				name : "Blood Curse of the Exorcist",
				description : desc([
					"As a bonus action, I stop a target I can see in 30 ft being frightened, charmed, or possessed",
					"\u2022 Amplify: The creature that caused the stopped condition takes 4d6 psychic damage",
					"  Additionally, it must make Wisdom save or be stunned until the end of my next turn"
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
			source : [["MM:BH", 6]],
			minlevel : 18,
			description : "\n   If I drop to 0 HP, but I'm not killed, I can end a crimson rite to instead stay at 1 HP"
		}
	}
});

AddSubClass("blood hunter", "profane soul", {
	regExpSearch : /^(?=.*profane)(?=.*soul).*$/i,
	subname : "Order of the Profane Soul",
	source : ["MM:BH", 7],
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
			source : [["MM:BH", 7]],
			minlevel : 3,
			description : '\n   Choose an Otherwordly Patron using the "Choose Feature" button above',
			choices : ["the Archfey", "the Fiend", "the Great Old One", "the Undying", "the Celestial", "the Hexblade"],
			"the archfey" : {
				name : "Rite Focus: the Archfey",
				description : desc([
					"When I deal rite damage to a creature, it glows with faint light until my next turn ends",
					"During this time, it can't benefit from half cover, three-quarters cover, or being invisible"
				])
			},
			"the fiend" : {
				name : "Rite Focus: the Fiend",
				description : "\n   When using the rite of the flame, I may reroll a 1 or 2 on the rite damage die once"
			},
			"the great old one" : {
				name : "Rite Focus: the Great Old One",
				description : desc([
					"When I score a critical hit with an active rite weapon, the target must make a Wis save",
					"If the target fails this save, it is frightened of me until the end of my next turn"
				])
			},
			"the undying" : {
				name : "Rite Focus: the Undying",
				description : "\n   When I reduce a hostile creature to 0 HP using an active rite weapon, I heal HP",
				additional : levels.map(function (n) {
					return n < 3 ? "" : "regain " + BHhemocraftDie(n) + " HP";
				})
			},
			"the celestial" : {
				name : "Rite Focus: the Celestial",
				description : "\n   As a bonus action, I can expend a blood maledict use to heal a creature I can see in 60 ft",
				additional : levels.map(function (n) {
					return n < 3 ? "" : "heals " + BHhemocraftDie(n) + "+Int mod";
				}),
				action : [["bonus action", ""]]
			},
			"the hexblade" : {
				name : "Rite Focus: the Hexblade",
				description : "\n   When I use a blood curse, my next attack adds my Prof bonus to damage vs. the cursed"
			},
			choiceDependencies : [{
				feature : "subclassfeature7.1"
			}, {
				feature : "subclassfeature15"
			}]
		},
		"subclassfeature3.1" : {
			name : "Pact Magic",
			source : [["MM:BH", 6]],
			minlevel : 3,
			description : desc([
				"I can cast warlock cantrips/spells that I know, using Intelligence as my spellcasting ability",
				"I can use a rite-imbued weapon as a spellcasting focus; I regain spell slots on a short rest"
			]),
			additional : levels.map(function (n, idx) {
				var cantr = [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3][idx];
				var splls = [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 11][idx];
				return n < 3 ? "" : cantr + " cantrips \u0026 " + splls + " spells known";
			})
		},
		"subclassfeature7" : {
			name : "Mystic Frenzy",
			source : [["MM:BH", 7]],
			minlevel : 7,
			description : "\n   When I cast a cantrip as an action, I can make one weapon attack as a bonus action",
			action : [["bonus action", " (with cantrip)"]]
		},
		"subclassfeature7.1" : {
			name : "Revealed Arcana",
			source : [["MM:BH", 7]],
			minlevel : 7,
			description : '\n   Choose an Otherwordly Patron using the "Choose Feature" button above',
			usages : 1,
			recovery : "long rest",
			"the archfey" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, I can cast Blur by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["blur"],
					selection : ["blur"],
					firstCol : "oncelr"
				}
			},
			"the fiend" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, I can cast Scorching Ray by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["scorching ray"],
					selection : ["scorching ray"],
					firstCol : "oncelr"
				}
			},
			"the great old one" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, I can cast Detect Thoughts by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["detect thoughts"],
					selection : ["detect thoughts"],
					firstCol : "oncelr"
				}
			},
			"the undying" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, I can cast Blindness/Deafness by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["blindness/deafness"],
					selection : ["blindness/deafness"],
					firstCol : "oncelr"
				}
			},
			"the celestial" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, I can cast Lesser Restoration by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["lesser restoration"],
					selection : ["lesser restoration"],
					firstCol : "oncelr"
				}
			},
			"the hexblade" : {
				name : "Revealed Arcana",
				description : "\n   Once per long rest, I can cast Branding Smite by expending a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["branding smite"],
					selection : ["branding smite"],
					firstCol : "oncelr"
				}
			}
		},
		"subclassfeature11" : {
			name : "Brand of the Sapping Scar",
			source : [["MM:BH", 7]],
			minlevel : 11,
			description : "\n   A creature branded by me has disadvantage on their saves against my warlock spells"
		},
		"subclassfeature15" : {
			name : "Unsealed Arcana",
			source : [["MM:BH", 7]],
			minlevel : 15,
			description : '\n   Choose an Otherwordly Patron using the "Choose Feature" button above',
			usages : 1,
			recovery : "long rest",
			"the archfey" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, I can cast Slow without expending a spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["slow"],
					selection : ["slow"],
					firstCol : "oncelr"
				}
			},
			"the fiend" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, I can cast Fireball without expending a spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["fireball"],
					selection : ["fireball"],
					firstCol : "oncelr"
				}
			},
			"the great old one" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, I can cast Haste without expending a spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["haste"],
					selection : ["haste"],
					firstCol : "oncelr"
				}
			},
			"the undying" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, I can cast Bestow Curse without expending a spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["bestow curse"],
					selection : ["bestow curse"],
					firstCol : "oncelr"
				}
			},
			"the celestial" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, I can cast Revivify without expending a spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["revivify"],
					selection : ["revivify"],
					firstCol : "oncelr"
				}
			},
			"the hexblade" : {
				name : "Unsealed Arcana",
				description : "\n   Once per long rest, I can cast Blink without expending a spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["blink"],
					selection : ["blink"],
					firstCol : "oncelr"
				}
			},
			extraname : "Order of the Profane Soul 18; Blood Curse",
			"blood curse of the souleater" : {
				name : "Blood Curse of the Souleater",
				source : [["MM:BH", 12]],
				description : " [Amplify 1\xD7 per long rest]" + desc([
					"As a reaction when a living creature (not construct/undead) is reduced to 0 HP in 30 ft,",
					"I can use their soul to gain advantage on my weapon attacks until the end of my next turn",
					"\u2022 Amplify (once per long rest): I also regain an expended warlock spell slot"
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

AddSubClass("blood hunter", "mutant", {
	regExpSearch : /^(?=.*blood)(?=.*hunter)(?=.*mutant).*$/i,
	subname : "Order of the Mutant",
	source : [["MM:BH", 8]],
	features : {
		"subclassfeature3" : {
			name : "Mutagencraft",
			source : [["MM:BH", 8]],
			minlevel : 3,
			description : levels.map(function (n) {
				return n < 3 ? "" : desc([
					"I can craft " + (n < 7 ? 1 : n < 15 ? 2 : 3) + " mutagen" + (n < 7 ? "" : "s") + " during a short/long rest from known formulae, max 1 of a type",
					"When I learn a new formula, I can swap one I know for another; They can only affect me",
					"As a bonus action, I can consume a mutagen; As an action, I can end all mutagens on me",
					"A mutagen and its effects last until I finish my next short or long rest, unless specified"
				]);
			}),
			usages : levels.map(function (n) { return n < 3 ? "" : n < 7 ? 1 : n < 15 ? 2 : 3; }),
			recovery : "short rest",
			action : [
				["bonus action", " (consume Mutagen)"],
				["action", " (end all Mutagens)"]
			],
			additional : levels.map(function (n) { return n < 3 ? "" : (n < 7 ? 4 : n < 11 ? 5 : n < 15 ? 6 : n < 18 ? 7 : 8) + " formulae known"; }),
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
				"Mobile",
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
				source : [["MM:BH", 8]],
				description : desc([
					"I gain 20 ft flying speed for 1 hour",
					"\u2022 Side effect: I gain disadvantage on Strength and Dexterity ability checks for 1 hour"
				]),
				prereqeval : function() { return classes.known['blood hunter'].level >= 11 }
			},
			"alluring" : {
				name : "Alluring",
				source : [["MM:BH", 8]],
				description : desc([
					"I gain advantage on Charisma ability checks",
					"\u2022 Side effect: I gain disadvantage on Initiative rolls"
				])
			},
			"celerity" : {
				name : "Celerity",
				source : [["MM:BH", 8]],
				description : levels.map(function (n) {
					var descr = n < 11 ? "My Dex score and max increase by 3. They increase by 4 at level 11 and by 5 at level 18" : n < 18 ? "My Dexterity score and maximum Dexterity increase by 4. They increase by 5 at level 18" : "My Dexterity score and maximum Dexterity both increase by 5";
					return desc([
						descr,
						"\u2022 Side effect: I gain disadvantage on Wisdom saving throws"
					]);
				})
			},
			"conversant" : {
				name : "Conversant",
				source : [["MM:BH", 9]],
				description : desc([
					"I gain advantage on Intelligence ability checks",
					"\u2022 Side effect: I gain disadvantage on Wisdom ability checks"
				])
			},
			"cruelty (prereq: level 11 blood hunter)" : {
				name : "Cruelty",
				source : [["MM:BH", 9]],
				description : desc([
					"As part of an Attack action, I can make a single weapon attack as a bonus action",
					"\u2022 Side effect: I gain disadvantage on Intelligence, Wisdom, and Charisma saving throws"
				]),
				action : [["bonus action", "Cruelty Mutagen (after Attack action)"]],
				prereqeval : function() { return classes.known['blood hunter'].level >= 11 }
			},
			"deftness" : {
				name : "Deftness",
				source : [["MM:BH", 9]],
				description : desc([
					"I gain advantage on Dexterity ability checks",
					"\u2022 Side effect: I gain disadvantage on Wisdom ability checks"
				])
			},
			"embers" : {
				name : "Embers",
				source : [["MM:BH", 9]],
				description : desc([
					"I gain resistance to fire damage",
					"\u2022 Side effect: I gain vulnerability to cold damage"
				])
			},
			"gelid" : {
				name : "Gelid",
				source : [["MM:BH", 9]],
				description : desc([
					"I gain resistance to cold damage",
					"\u2022 Side effect: I gain vulnerability to fire damage"
				])
			},
			"impermeable" : {
				name : "Impermeable",
				source : ["MM:BH", 10],
				description : desc([
					"I gain resistance to piercing damage",
					"\u2022 Side effect: I gain vulnerability to slashing damage"
				])
			},
			"mobile" : {
				name : "Mobile",
				source : [["MM:BH", 9]],
				description : levels.map(function (n) {
					var descr = n < 11 ? "I gain immunity to the grappled and restrained conditions; At 11th level also paralyzed" : "I gain immunity to the grappled, restrained, and paralyzed conditions";
					return desc([
						descr,
						"\u2022 Side effect: I gain disadvantage on Strength checks"
					]);
				})
			},
			"nighteye" : {
				name : "Nighteye",
				source : [["MM:BH", 9]],
				description : desc([
					"I gain darkvision up to 60 ft, or add an extra 60 ft to it if I already have darkvision",
					"\u2022 Side effect: I gain sunlight sensitivity"
				])
			},
			"percipient" : {
				name : "Percipient",
				source : [["MM:BH", 9]],
				description : desc([
					"I gain advantage on Wisdom ability checks",
					"\u2022 Side effect: I gain disadvantage on Charisma ability checks"
				])
			},
			"potency" : {
				name : "Potency",
				source : [["MM:BH", 9]],
				description : levels.map(function (n) {
					var descr = n < 11 ? "My Str score and max increase by 3. They increase by 4 at level 11 and by 5 at level 18" : n < 18 ? "My Strength score and maximum Strength increase by 4. They increase by 5 at level 18" : "My Strength score and maximum Strength both increase by 5";
					return desc([
						descr,
						"\u2022 Side effect: I gain disadvantage on Dexterity saving throws"
					]);
				})
			},
			"precision (prereq: level 11 blood hunter)" : {
				name : "Precision",
				source : [["MM:BH", 9]],
				description : desc([
					"My weapon attacks score critical hits on attack rolls of 19 and 20",
					"\u2022 Side effect: I gian disadvantage on Strength saving throws"
				]),
				prereqeval : function() { return classes.known['blood hunter'].level >= 11 }
			},
			"rapidity" : {
				name : "Rapidity",
				source : [["MM:BH", 9]],
				description : levels.map(function (n) {
					var descr = n < 15 ? "My speed increases by 10 ft (or by 15 ft at 15th level)" : "My speed increases by 15 ft";
					return desc([
						descr,
						"\u2022 Side effect: I gain disadvantage on Intelligence ability checks"
					]);
				})
			},
			"reconstruction (prereq: level 7 blood hunter)" : {
				name : "Reconstruction",
				source : [["MM:BH", 9]],
				description : desc([
					"For an hour, at the start of my turn, I regain hit points equal to my proficiency bonus",
					"This only occurs if I have at least 1 hit point and am below half my hit point maximum",
					"\u2022 Side effect: My speed decreases by 10 ft for an hour"
				]),
				prereqeval : function() { return classes.known['blood hunter'].level >= 7 }
			},
			"sagacity" : {
				name : "Sagacity",
				source : [["MM:BH", 9]],
				description : levels.map(function (n) {
					var descr = n < 11 ? "My Int score and max increase by 3. They increase by 4 at level 11 and by 5 at level 18" : n < 18 ? "My Intelligence score and maximum both increase by 4. They increase by 5 at level 18" : "My Intelligence score and maximum Intelligence both increase by 5";
					return desc([
						descr,
						"\u2022 Side effect: I gain disadvantage on Charisma saving throws"
					]);
				})
			},
			"shielded" : {
				name : "Shielded",
				source : [["MM:BH", 9]],
				description : desc([
					"I gain resistance to slashing damage",
					"\u2022 Side effect: I gain vulnerability to bludgeoning damage"
				])
			},
			"unbreakable" : {
				name : "Unbreakable",
				source : [["MM:BH", 9]],
				description : desc([
					"I gain resistance to bludgeoning damage",
					"\u2022 Side effect: I gain vulnerability to piercing damage"
				])
			},
			"vermillion" : {
				name : "Vermillion",
				source : [["MM:BH", 9]],
				description : desc([
					"I gain an additional use of blood maledict",
					"\u2022 Side effect: I gain disadvantage on death saving throws"
				])
			}
		},
		"subclassfeature7" : {
			name : "Strange Metabolism",
			source : [["MM:BH", 8]],
			minlevel : 7,
			description : desc([
				"I gain immunity to poison damage and the poisoned condition",
				"As a bonus action once per long rest, I can ignore the side effects of a mutagen for 1 min"
			]),
			action : [['bonus action', '']],
			savetxt : { immune : ["poison"] },
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature11" : {
			name : "Brand of Axiom",
			source : [["MM:BH", 8]],
			minlevel : 11,
			description : desc([
				"A branded creature can't benefit from illusion magic to disguise it or make it invisible",
				"Also, if it's polymorphed or has changed shape when branded or tries to do so during,",
				"It must make a Wis save or its form reverts and it's stunned until my next turn ends"
			]),
			extraname : "Order of the Mutant 15; Blood Curse",
			"blood curse of corrosion" : {
				source : [["MM:BH", 11]],
				name : "Blood Curse of Corrosion",
				description : desc([
					"As a bonus action, I can have a creature within 30 ft make a Con save or become poisoned",
					"At the end of each if its turns, the creature can make another Con save to end the curse",
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
			source : [["MM:BH", 8]],
			minlevel : 18,
			description : desc([
				"As a bonus action, I can end an active mutagen, then activate a mutagen that I know"
			]),
			action : [['bonus action', ""]],
			usages : "Int mod per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "long rest"
		}
	}
});

AddSubClass("blood hunter", "lycan", {
	regExpSearch : /^(?=.*blood)(?=.*hunter)(?=.*lycan).*$/i,
	subname : "Order of the Lycan",
	source : [["MM:BH", 9]],
	features : {
		"subclassfeature3" : {
			name : "Heightened Senses",
			source : [["MM:BH", 10]],
			minlevel : 3,
			description : "\n   I gain advantage on Wisdom (Perception) checks that rely on hearing or smell",
			vision : [["Adv. on Perception relying on hearing or smell", 0]]
		},
		"subclassfeature3.1" : {
			name : "Hybrid Transformation",
			source : [["MM:BH", 10]],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can transform into a hybrid lycanthropy form",
				'See the "Notes" page for the full rules of this hybrid form at my current level'
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
				source : [["MM:BH", 10]],
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
					"If I include the word 'Lycan' or 'Hybrid' in a melee weapon's name, the calculation will add +1 to damage rolls. This bonus increases to +2 at 11th level and +3 at 18th level in the blood hunter class"
				]
			},
			changeeval : function(v) {
				ClassList["blood hunter"].updateHybridForm(v[0], v[1]);
			}
		},
		"subclassfeature7" : {
			name : "Stalker's Prowess",
			source : [["MM:BH", 11]],
			minlevel : 7,
			description : desc([
				"I gain +10 ft speed; I add +10 ft to my long jump and +3 ft to my high jump distance",
				'In my hybrid form, I gain the Improved Predatory Strikes feature, see "Notes" page'
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
					"I get +1 to attack rolls for my predatory strikes at level 7. This bonus increases to +2 at 11th level and +3 at 18th level in the blood hunter class"
				],
				atkAdd : [
					function(fields, v) {
						if (v.theWea.isPredatoryStrikes && classes.known['blood hunter'] && classes.known['blood hunter'].level && classes.known['blood hunter'].level >= 7) {
							fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical if a rite is active';
						}
					},
					"My predatory strike attacks count as magical when I have a Crimson rite active"
				]
			}
		},
		"subclassfeature11" : {
			name : "Advanced Transformation",
			source : [["MM:BH", 11]],
			minlevel : 11,
			description : '\n   In my hybrid form, I gain the Lycan Regeneration feature, see "Notes" page',
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
					"My predatory strikes damage increases from 1d6 to 1d8 at 11th level"
				]
			}
		},
		"subclassfeature15" : {
			name : "Brand of the Voracious",
			source : [["MM:BH", 11]],
			minlevel : 15,
			description : desc([
				"I have advantage on my Wisdom saves to maintain control of blood lust in hybrid form",
				"While in hybrid form, I have advantage on attacks against a creature branded by me"
			]),
			savetxt : { text : ["Adv. on Wis saves to control blood lust"] },
			extraname : "Order of the Lycan 18; Blood Curse",
			"blood curse of the howl" : {
				source : [["MM:BH", 12]],
				name : "Blood Curse of the Howl",
				description : desc([
					"As an action, creatures of my choice in 30 ft that can hear me howl must make a Wis save",
					"If failed, they're frightened of me (stunned if failed by 5 or more), until my next turn ends",
					"If successful, they're immune to this blood curse for the next 24 hours",
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
