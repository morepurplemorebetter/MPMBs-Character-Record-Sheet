/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds a class called "Blood Hunter" (v2.3) and the four subclasses for it: "Order of the Ghostslayer", "Order of the Profane Soul", "Order of the Mutant", and "Order of the Lycan"

				This is taken from the DMs Guild website (https://www.dmsguild.com/product/301641/)
				This class and subclasses are made by Matthew Mercer

	Code by:	Smashman & MorePurpleMoreBetter
	Date:		2020-02-05 (sheet v13)

	Please support the creator of this content (Matthew Mercer) and download his material from the DMs Guild website: https://www.dmsguild.com/browse.php?x=0&y=0&author=Matthew%20Mercer

	Please take note that multiclassing the "Order of the Profane Soul" subclass with Warlock will result in too many spells/cantrips being asked for in the spell selection dialogues.
*/

var iFileName = "Blood Hunter 2020 [Matthew Mercer's work, transcribed by Smashman & MPMB].js";
RequiredSheetVersion(13);

SourceList["MM:BH2020"] = {
	name : "Matthew Mercer: Blood Hunter Class (2020)",
	abbreviation : "MM:BH2020",
	group : "Dungeon Master's Guild",
	url : "https://www.dmsguild.com/product/301641/",
	date : "2020/01/27"
};

var hemocraftDie = function(level) {
	return "1d" + (level < 5 ? 4 : level < 11 ? 6 : level < 17 ? 8 : 10);
};

ClassList["blood hunter"] = {
	regExpSearch : /^(?=.*blood)(?=.*hunter).*$/i,
	name : "Blood Hunter",
	source : ["MM:BH2020", 3],
	primaryAbility : "\n \u2022 Blood Hunter: Strength or Dexterity, and Intelligence;",
	prereqs : "\n \u2022 Blood Hunter: Strength 13 or Dexterity 13, and Intelligence 13;",
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Dex", "Int"],
	skillstxt : {
		primary : "Choose three from Acrobatics, Arcana, Athletics, History, Insight, Investigation, Religion and Survival."
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
		"hunter's bane" : {
			name : "Hunter's Bane",
			source : ["MM:BH2020", 4],
			minlevel : 1,
			description : desc([
				"I have adv. on Wis (Survival) checks to track Fey, Fiends, or Undead",
				"I also have adv. on Int checks to recall info about them"
			])
		},
		"blood maledict" : {
			name : "Blood Maledict",
			source : ["MM:BH2020", 4],
			minlevel : 1,
			description : desc([
				"I can use a Blood Curse on targets with blood; Use the \"Choose Features\" button above",
				"I can amplify its effect by taking damage equal to a hemocraft die roll",
				"An amplified curse can also affect targets without blood.",
				"Whenever I learn a new Blood Curse, I can replace one I know with a new one as well"
			]),
			additional : levels.map(function (n) {
				var curses = (n < 6 ? 1 : n < 10 ? 2 : n < 14 ? 3 : n < 18 ? 4 : 5) + " curse" + (n < 6 ? "" : "s");
				return hemocraftDie(n) + '; ' + curses;
			}),
			usages : levels.map(function (n) { return n < 6 ? 1 : n < 13 ? 2 : n < 17 ? 3 : 4; }),
			recovery : "short rest",
			extraname : "Blood Curse",
			extrachoices : ["Blood Curse of the Anxious", "Blood Curse of Binding", "Blood Curse of Bloated Agony", "Blood Curse of the Eyeless", "Blood Curse of the Fallen Puppet", "Blood Curse of the Marked", "Blood Curse of the Muddled Mind"],
			"blood curse of the anxious" : {
				name : "Blood Curse of the Anxious",
				source : ["MM:BH2020", 12],
				description : desc([
					"As a bonus action, cause all Cha (Intimidation) checks against the target to have adv.",
					"The effect lasts until the end of my next turn",
					"\u2022 Amplify: The next Wisdom saving throw the target makes before curse ends has disadv.",
				]),
				action : ["bonus action", ""]
			},
			"blood curse of binding" : {
				name : "Blood Curse of Binding",
				source : ["MM:BH2020", 12],
				description : desc([
					"As a bonus action, I can bind an enemy within 30 ft that is up to one size larger than me",
					"It makes a Str save or speed set to 0 and cannot use rea. until the end of my next turn",
					"\u2022 Amplify: I can affect any size of creature and the curse lasts 1 min.",
					"  At the end of each of the target's turns, it can make another Str save to end the curse"
				]),
				action : ["bonus action", ""]
			},
			"blood curse of bloated agony" : {
				name : "Blood Curse of Bloated Agony",
				source : ["MM:BH2020", 12],
				description : desc([
					"As a bonus action, has disadv. on Str and Dex checks until the end of my next turn",
					"It takes 1d8 necrotic damage if makes more than one attack on its turn",
					"\u2022 Amplify: The curse lasts 1 minute",
					"  At the end of each of the target's turns, it can make a Con save to end the curse"
				]),
				action : ["bonus action", ""]
			},
			"blood curse of the eyeless" : {
				name : "Blood Curse of the Eyeless",
				source : ["MM:BH2020", 12],
				description : desc([
					"As a reaction when a creature in 30 ft makes an attack roll, I can roll a hemocraft die",
					"Subtract number rolled from attack roll. Creatures immune to blindness are not affected",
					"\u2022 Amplify: Apply to all attacks until the end of the turn. Roll new hemocraft die each time"
				]),
				action : ["reaction", ""]
			},
			"blood curse of the fallen puppet" : {
				name : "Blood Curse of the Fallen Puppet",
				source : ["MM:BH2020", 12],
				description : desc([
					"As a reaction when a creature drops to 0 hp in 30 ft of me, I can make it attack",
					"The creature makes one attack against a target of my choice within its attack range",
					"\u2022 Amplify: Can move creature up to half their speed",
					"   The attack and damage roll gain a bonus equal to my Intelligence modifier (min 1)"
				]),
				action : ["reaction", ""]
			},
			"blood curse of the marked" : {
				name : "Blood Curse of the Marked",
				source : ["MM:BH2020", 13],
				description : desc([
					"As a bonus action, I can mark an enemy within 30 ft of me until the end of my turn",
					"While marked, when I deal rite damage to the target, I deal an extra hemocraft die",
					"\u2022 Amplify: The next attack before end of turn against the creature has advantage"
				]),
				action : ["bonus action", ""]
			},
			"blood curse of the muddled mind" : {
				name : "Blood Curse of the Muddled Mind",
				source : ["MM:BH2020", 13],
				description : desc([
					"As a bonus action, I can curse an enemy within 30 ft that is concentrating on spell",
					"That creature has disadv. on next concentration save before end of my turn",
					"\u2022 Amplify: The target has disadv. on all concentration saves before end of my turn"
				]),
				action : ["bonus action", ""]
			}
		},
		"fighting style" : {
			name : "Fighting Style",
			source : ["MM:BH2020", 4],
			minlevel : 2,
			description : "\n   " + "Choose a Fighting Style using the \"Choose Feature\" button above",
			choices : ["Archery", "Dueling", "Great Weapon Fighting", "Two-Weapon Fighting"],
			"archery" : FightingStyles.archery,
			"dueling" : FightingStyles.dueling,
			"great weapon fighting" : FightingStyles.great_weapon,
			"two-weapon fighting" : FightingStyles.two_weapon
		},
		"crimson rite" : {
			name : "Crimson Rite",
			source : ["MM:BH2020", 5],
			minlevel : 2,
			description : desc([
				"I can imbue my weapons with Crimson Rites; Use the \"Choose Features\" button above",
				"As a bonus action, I imbue a weapon, which than adds the rite damage to its damage",
				"It can hold only one rite, lasting until my next short/long rest or it leaves my hand",
				"When activated, I take damage equal to one hemocraft die roll"
			]),
			additional : levels.map(function (n) { return (n < 6 ? 1 : 2) + " primal rite" + (n < 6 ? "" : "s") + (n < 14 ? "" : " \u0026 1 esoteric rite") + " known"; }),
			action : ["bonus action", ""],
			extraname : "Crimson Rite",
			extrachoices : ["Flame (Primal Rite)", "Frozen (Primal Rite)", "Storm (Primal Rite)", "Roar (Esoteric Rite)", "Oracle (Esoteric Rite)", "Dead (Esoteric Rite)"],
			"flame (primal rite)" : {
				source : ["MM:BH2020", 5],
				name : "Rite of the Flame",
				description : "\n   " + "While this rite is active, my weapon deals extra fire damage equal to one hemocraft die"
			},
			"frozen (primal rite)" : {
				source : ["MM:BH2020", 5],
				name : "Rite of the Frozen",
				description : "\n   " + "While this rite is active, my weapon deals extra cold damage equal to one hemocraft die"
			},
			"storm (primal rite)" : {
				source : ["MM:BH2020", 5],
				name : "Rite of the Storm",
				description : "\n   " + "While this rite is active, my weapon deals extra lightning dmg equal to one hemocraft die"
			},
			"roar (esoteric rite)" : {
				source : ["MM:BH2020", 5],
				name : "Rite of the Roar",
				description : "\n   " + "While this rite is active, my weapon deals extra thunder damage equal to one hemocraft die",
				prereqeval : function() { return classes.known['blood hunter'].level >= 14 }
			},
			"oracle (esoteric rite)" : {
				source : ["MM:BH2020", 5],
				name : "Rite of the Oracle",
				description : "\n   " + "While this rite is active, my weapon deals extra psychic damage equal to one hemocraft die",
				prereqeval : function() { return classes.known['blood hunter'].level >= 14 }
			},
			"dead (esoteric rite)" : {
				source : ["MM:BH2020", 5],
				name : "Rite of the Dead",
				description : "\n   " + "While this rite is active, my weapon deals extra necrotic damage equal to one hemocraft die",
				prereqeval : function() { return classes.known['blood hunter'].level >= 14 }
			},
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && (/\brite\b/i).test(v.WeaponText)) {
							fields.Description += (fields.Description ? '; ' : '') + '+' + hemocraftDie(classes.known['blood hunter'].level) + ' rite damage';
						}
					},
					"If I include the word 'Rite' in a weapon's name, it gets my hemocraft damage die added in its description."
				]
			}
		},
		"subclassfeature3" : {
			name : "Blood Hunter Order",
			source : ["MM:BH2020", 5],
			minlevel : 3,
			description : desc([
				"Choose a Blood Hunter Order you commit to and put it in the \"Class\" field",
				"Choose either the Order of the Ghostslayer, Lycan, Mutant, or Profane Soul"
			])
		},
		"brand of castigation": {
			name : "Brand of Castigation",
			source : ["MM:BH2020", 5],
			minlevel : 6,
			description : desc([
				"See notes page for Brand of Castigation features"
			]),
			changeeval : function(v) {
				UpdateBrandText(v[1], v[0]);
			},
			usages : 1,
			recovery : "short rest",
		},
		"grim psychometry" : {
			name : "Grim Psychometry",
			source : ["MM:BH2020", 5],
			minlevel : 9,
			description : desc([
				"I have adv. on Int (History) checks about an object I am touching or location where I am"
			])
		},
		"dark augmentation" : {
			name : "Dark Augmentation",
			source : ["MM:BH2020", 5],
			minlevel : 10,
			description : desc([
				"I have +5 ft speed and add my Int mod on Str, Dex & Con saves (min 1)"
			]),
			speed : { allModes : "+5" },
			addMod : [
				{ type : "save", field : "Str", mod : "max(Int|1)", text : "I add my Intelligence modifier (min 1) to my Strength, Dexterity and Constitution saving throws" },
				{ type : "save", field : "Dex", mod : "max(Int|1)", text : "I add my Intelligence modifier (min 1) to my Strength, Dexterity and Constitution saving throws" },
				{ type : "save", field : "Con", mod : "max(Int|1)", text : "I add my Intelligence modifier (min 1) to my Strength, Dexterity and Constitution saving throws" }
			],
		},
		"brand of tethering" : {
			name : "Brand of Tethering",
			source : ["MM:BH2020", 5],
			minlevel : 13,
			additional : "See notes page"
		},
		"hardened soul" : {
			name : "Hardened Soul",
			source : ["MM:BH2020", 6],
			minlevel : 14,
			additional : "adv. vs. frightened & charm",
			savetxt : {
				adv_vs : ["frightened", "charmed"]
			}
		},
		"sanguine mastery" : {
			name : "Sanguine Mastery",
			source : ["MM:BH2020", 6],
			minlevel : 20,
			description : desc([
				"Once per turn, when a feature requires hemocraft die roll, I may reroll and choose result",
				"When I score a critical hit with a rite-imbued weapon, I regain one use of Blood Maledict"
			])
		}
	}
};

UpdateBrandText = function(BHlevelNew, BHlevelOld, subclassInfo) {
	if (BHlevelOld < 6 && BHlevelNew < 6) return;

	var makeBrandText = function(lvl) {
		var theText = "Blood Hunter - Brand of Castigation features at level " + lvl + ":";
		theText += "\n\u25C6 " + "Brand of Castigation (Blood Hunter 3, MM:BH2020 5)" + desc([
			"When I damage a creature with my Crimson Rite feature, I can brand it.",
			"I always know the direction to the creature",
			"The brand lasts until I dismiss or I apply a brand to another creature.",
			"When the branded creature damages me or a creature in 5 feet of me:",
			"\u2022 The branded creature takes psychic damage equal to " + (lvl >= 13 ? "2\u00D7 " : "") + "my Int mod (min " + (lvl >= 13 ? 2 : 1) + ")",
			"Brand can be dispelled with dispel magic, for this purpose, spell level equals " + Math.min(Math.floor(lvl/2), 9)
		]);
		if (lvl >= 11 && subclassInfo.level === 11) {
			theText += subclassInfo.text;
		}
		if (lvl >= 13) {
			theText += "\n\u25C6 " + "Brand of Tethering (Blood Hunter 13, MM:BH2020 5)" + desc([
				"Castigation damage increases. A branded creature cannot use the Dash action",
				"If a branded creature attempts to teleport or leave current plane:",
				"\u2022 It takes 4d6 psychic damage and must succeed on a Wis save, or attempt fails"
			]);
		}
		if (lvl >= 15 && subclassInfo.level === 15) {
			theText += subclassInfo.text;
		}
		return theText;
	}

	//update the hybrid feature on the notes page
	var BHstringOld = makeBrandText(BHlevelOld);
	var BHstringNew = makeBrandText(BHlevelNew);
	AddToNotes(BHstringNew, "Blood Hunter - Brand of Castigation features", BHstringOld, "Class Features section");
};

AddSubClass("blood hunter", "ghostslayer", {
	regExpSearch : /^(?=.*ghost)(?=.*slayer).*$/i,
	subname : "Order of the Ghostslayer",
	source : ["MM:BH2020", 6],
	fullname : "Ghostslayer",
	features : {
		"subclassfeature3" : {
			name : "Rite of the Dawn",
			source : ["MM:BH2020", 6],
			minlevel : 3,
			description : desc([
				"I know the Rite of the Dawn (See notes page)"
			]),
			extraname : "Crimson Rite",
			extrachoices : ["dawn"],
			choicesNotInMenu : true,
			"dawn" : {
				source : ["MM:BH2020", 6],
				name : "Rite of the Dawn",
				description : desc([
					"While this rite is active, my weapon deals extra radiant damage equal to one hemocraft die",
					"I have res. to necrotic damage and deal an extra hemocraft die of rite damage vs undead"
				])
			},
			autoSelectExtrachoices : [{
				extrachoice : 'dawn'
			}]
		},
		"subclassfeature3.1" : {
			name : "Curse Specialist",
			source : ["MM:BH2020", 6],
			minlevel : 3,
			description : desc([
				"I gain an additional Blood Maledict use. Curses can target any creature, blood or not",
			]),
		},
		"blood maledict" : (function () {
			var curseSpecialist = newObj(ClassList["blood hunter"].features["blood maledict"]);
			curseSpecialist.usages = levels.map(function (n) { return n < 3 ? 1 : n < 6 ? 2 : n < 13 ? 3 : n < 17 ? 4 : 5; });
			return curseSpecialist;
		})(),
		"subclassfeature7" : {
			name : "Ethereal Step",
			source : ["MM:BH2020", 6],
			minlevel : 7,
			description : desc([
				"At the start of my turn, if I am not incapacitated, I can choose to ethereal step",
				"When doing so, I can move through creatures and objects as if they were difficult terrain",
				"I can also see and affect creatures and objects on the ethereal plane",
				"Lasts Int mod rounds. If I end my turn in an object, I take 1d10 force damage.",
				"If the feature ends when I am inside an object I am pushed to the nearest empty space",
				"When this happens, I take force damage equal to 2\u00D7 feet moved"
			]),
			usages : levels.map(function (n) {
				return n < 15 ? 1 : 2;
			}),
			recovery : "short rest",
		},
		"subclassfeature11" : {
			name : "Brand of Sundering",
			source : ["MM:BH2020", 7],
			minlevel : 11,
			additional : "See notes page",
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && (/\brite\b/i).test(v.WeaponText)) {
							fields.Description += (fields.Description ? '; ' : '') + '+' + hemocraftDie(classes.known['blood hunter'].level) + ' rite damage vs. branded creature';
						}
					},
					"If I include the word 'Rite' in a weapon's name, it gets an additional hemocraft die if target is branded."
				]
			}
		},
		"brand of castigation" : (function () {
			var sunderingText = "\n\u25C6 " + "Brand of Sundering (Order of the Ghostslayer 11, MM:BH2020 7)" + desc([
				"When I damage a branded creature with a weapon with an active Crimson Rite:",
				"\u2022 It takes an extra hemocraft die of damage",
				"\u2022 It cannot move through objects and creatures"
			]);
			var sundering = newObj(ClassList["blood hunter"].features["brand of castigation"]);
			sundering.changeeval = function(v) {
				UpdateBrandText(v[1], v[0], {level: 11, text: sunderingText});
			};
			return sundering;
		})(),
		"subclassfeature15" : {
			name : "Blood Curse of the Exorcist",
			source : ["MM:BH2020", 7],
			minlevel: 15,
			description : desc([
				"I know the Blood Curse of the Exorcist (See notes page)"
			]),
			extraname : "Blood Maledict",
			extrachoices : ["exorcist"],
			choicesNotInMenu : true,
			"exorcist" : {
				source : ["MM:BH2020", 13],
				name : "Blood Curse of the Exorcist",
				description : desc([
					"As a bonus action, I choose a crea in 30 ft of me that is frightened, charmed or possessed",
					"The target creature is no longer frightened, charmed or possessed",
					"\u2022 Amplify: The creature that frightened, charmed or possessed the target:",
					"   Takes 4d6 psychic damage and make a Wis save or stunned until end of my next turn"
				])
			},
			autoSelectExtrachoices : [{
				extrachoice : 'exorcist'
			}],
			action : ["bonus action", ""]
		},
		"subclassfeature18" : {
			name : "Rite Revival",
			source : ["MM:BH2020", 7],
			minlevel : 18,
			description : desc([
				"When I am reduced to 0 hit points, but not killed outright, I can end a Crimson Rite",
   			"This drops me to 1 hit point instead. If I have multiple rites active I choose which rite"
			])
		}
	}
});

AddSubClass("blood hunter", "profane soul", {
	regExpSearch : /^(?=.*profane)(?=.*soul).*$/i,
	subname : "Order of the Profane Soul",
	source : ["MM:BH2020", 7],
	spellcastingFactor : "warlock3",
	spellcastingTable : [
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 0
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 1
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 2
		[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 3
		[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 4
		[2, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 5
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
		[0, 0, 0, 2, 0, 0, 0, 0, 0] //lvl20
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
			source : ["MM:BH2020", 7],
			minlevel : 3,
			description : "\n   " + "Choose an Otherwordly Patron using the \"Choose Feature\" button above",
			choices : ["the Archfey", "the Fiend", "the Great Old One", "the Undying", "the Celestial", "the Hexblade"],
			choiceDependencies : [
				{
					feature : "subclassfeature3.2",
					choiceAttribute : true
				},
				{
					feature : "subclassfeature7.1",
					choiceAttribute : true
				},
				{
					feature : "subclassfeature15",
					choiceAttribute : true
				}
			],
			"the archfey" : {
				name : "Otherwordly Patron: the Archfey",
				description : "\n   " + "I have chosen the Archfey as my Otherworldly Patron",
				dependentChoices : "the archfey",
			},
			"the fiend" : {
				name : "Otherwordly Patron: the Fiend",
				description : "\n   " + "I have chosen the Fiend as my Otherworldly Patron",
				dependentChoices : "the fiend",
			},
			"the great old one" : {
				name : "Otherwordly Patron: the Great Old One",
				description : "\n   " + "I have chosen the Great Old One as my Otherworldly Patron",
				dependentChoices : "the great old one",
			},
			"the undying" : {
				name : "Otherwordly Patron: the Undying",
				description : "\n   " + "I have chosen the Undying as my Otherworldly Patron",
				dependentChoices : "the undying",
			},
			"the celestial" : {
				name : "Otherwordly Patron: the Celestial",
				description : "\n   " + "I have chosen the Celestial as my Otherworldly Patron",
				dependentChoices : "the celestial",
			},
			"the hexblade" : {
				name : "Otherwordly Patron: the Hexblade",
				description : "\n   " + "I have chosen the Hexblade as my Otherworldly Patron",
				dependentChoices : "the hexblade",
			},
		},
		"subclassfeature3.1" : {
			name : "Pact Magic",
			source : ["MM:BH2020", 7],
			minlevel : 3,
			description : desc([
				"I can cast warlock cantrips/spells that I know, using Intelligence as my spellcasting ability",
				"I can use a rite-imbued weapon as a spellcasting focus; I regain spell slots in a short rest"
			]),
			additional : ["", "", "2 cantrips \u0026 2 spells known", "2 cantrips \u0026 2 spells known", "2 cantrips \u0026 3 spells known", "2 cantrips \u0026 3 spells known", "2 cantrips \u0026 4 spells known", "2 cantrips \u0026 4 spells known", "2 cantrips \u0026 5 spells known", "3 cantrips \u0026 5 spells known", "3 cantrips \u0026 6 spells known", "3 cantrips \u0026 6 spells known", "3 cantrips \u0026 7 spells known", "3 cantrips \u0026 7 spells known", "3 cantrips \u0026 8 spells known", "3 cantrips \u0026 8 spells known", "3 cantrips \u0026 9 spells known", "3 cantrips \u0026 9 spells known", "3 cantrips \u0026 10 spells known", "3 cantrips \u0026 11 spells known"]
		},
		"subclassfeature3.2" : {
			name : "Rite Focus",
			source : ["MM:BH2020", 8],
			minlevel : 3,
			description : "\n   " + "Choose an Otherwordly Patron using the \"Choose Feature\" button above ",
			choices : ["the Archfey", "the Fiend", "the Great Old One", "the Undying", "the Celestial", "the Hexblade"],
			choicesNotInMenu : true,
			"the archfey" : {
				name : "Rite Focus: the Archfey",
				description : "\n   " + "When I do rite damage, the target loses invisibility, 1/2 \u0026 3/4 cover until my next turn",
				dependentChoices : "the archfey",
			},
			"the fiend" : {
				name : "Rite Focus: the Fiend",
				description : "\n   " + "When using the Rite of the Flame I may reroll a 1 or 2 on the rite damage die, once",
				dependentChoices : "the fiend",
			},
			"the great old one" : {
				name : "Rite Focus: the Great Old One",
				description : "\n   " + "When I critically hit, the target Wis save or frightened of me until end of my next turn",
				dependentChoices : "the great old one",
			},
			"the undying" : {
				name : "Rite Focus: the Undying",
				description : "\n   " + "When I reduce a hostile to 0 HP with a wea. attack, I regain HP equal to a hemocraft die",
				dependentChoices : "the undying",
			},
			"the celestial" : {
				name : "Rite Focus: the Celestial",
				description : "\n   " + "As a bonus action, I can expend a Blood Maledict use to heal a creature within 60 ft",
				additional : levels.map(function (n) {
					return n < 3 ? "" : hemocraftDie(n) + " + Int mod";
				}),
				action : ["bonus action", ""],
			},
			"the hexblade" : {
				name : "Rite Focus: the Hexblade",
				description : "\n   " + "After I target a creature with a blood curse, next attack adds prof mod to damage"
			}
		},
		"subclassfeature7" : {
			name : "Mystic Frenzy",
			source : ["MM:BH202", 8],
			minlevel : 7,
			description : "\n   " + "When I cast a cantrip as an action, I can make one weapon attack as a bonus action",
			action : ["bonus action", " (with cantrip)"]
		},
		"subclassfeature7.1" : {
			name : "Revealed Arcana",
			source : ["MM:BH2020", 8],
			minlevel : 7,
			description : "\n   " + "Choose an Otherwordly Patron using the \"Choose Feature\" button above ",
			usages : 1,
			recovery : "long rest",
			choices : ["the Archfey", "the Fiend", "the Great Old One", "the Undying", "the Celestial", "the Hexblade"],
			choicesNotInMenu : true,
			"the archfey" : {
				name : "Revealed Arcana",
				description : "\n   " + "Once per long rest, I can cast Blur using a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["blur"],
					selection : ["blur"],
					oncelr : true
				}
			},
			"the fiend" : {
				name : "Revealed Arcana",
				description : "\n   " + "Once per long rest, I can cast Scorching Ray using a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["scorching ray"],
					selection : ["scorching ray"],
					oncelr : true
				}
			},
			"the great old one" : {
				name : "Revealed Arcana",
				description : "\n   " + "Once per long rest, I can cast Detect Thoughts using a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["detect thoughts"],
					selection : ["detect thoughts"],
					oncelr : true
				}
			},
			"the undying" : {
				name : "Revealed Arcana",
				description : "\n   " + "Once per long rest, I can cast Blindness/Deafness using a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["blindness/deafness"],
					selection : ["blindness/deafness"],
					oncelr : true
				}
			},
			"the celestial" : {
				name : "Revealed Arcana",
				description : "\n   " + "Once per long rest, I can cast Lesser Restoration using a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["lesser restoration"],
					selection : ["lesser restoration"],
					oncelr : true
				}
			},
			"the hexblade" : {
				name : "Revealed Arcana",
				description : "\n   " + "Once per long rest, I can cast Branding Smite using a pact magic spell slot",
				spellcastingBonus : {
					name : "Revealed Arcana",
					spells : ["branding smite"],
					selection : ["branding smite"],
					oncelr : true
				}
			},
		},
		"subclassfeature11" : {
			name : "Brand of the Sapping Scar",
			source : ["MM:BH2020", 8],
			minlevel : 11,
			description : desc([
				"A creature branded by me has disadvantage on saves against my warlock spells"
			]),
		},
		"brand of castigation" : (function () {
			var scarText = "\n\u25C6 " + "Brand of the Sapping Scar (Order of the Profane Soul 11, MM:BH2020 8)" + desc([
				"A creature branded by me has disadvantage on saves against my warlock spells"
			]);
			var scar = newObj(ClassList["blood hunter"].features["brand of castigation"]);
			scar.changeeval = function(v) {
				UpdateBrandText(v[1], v[0], {level: 11, text: scarText});
			};
			return scar;
		})(),
		"subclassfeature15" : {
			name : "Unsealed Arcana",
			source : ["MM:BH2020", 8],
			minlevel : 15,
			description : "\n   " + "Choose an Otherwordly Patron using the \"Choose Feature\" button above  ",
			usages : 1,
			recovery : "long rest",
			choices : ["the Archfey", "the Fiend", "the Great Old One", "the Undying", "the Celestial", "the Hexblade"],
			choicesNotInMenu : true,
			"the archfey" : {
				name : "Unsealed Arcana",
				description : "\n   " + "Once per long rest, I can cast Slow without using a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["slow"],
					selection : ["slow"],
					oncelr : true
				}
			},
			"the fiend" : {
				name : "Unsealed Arcana",
				description : "\n   " + "Once per long rest, I can cast Fireball without using a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["fireball"],
					selection : ["fireball"],
					oncelr : true
				}
			},
			"the great old one" : {
				name : "Unsealed Arcana",
				description : "\n   " + "Once per long rest, I can cast Haste without using a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["haste"],
					selection : ["haste"],
					oncelr : true
				}
			},
			"the undying" : {
				name : "Unsealed Arcana",
				description : "\n   " + "Once per long rest, I can cast Bestow Curse without using a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["bestow curse"],
					selection : ["bestow curse"],
					oncelr : true
				}
			},
			"the celestial" : {
				name : "Unsealed Arcana",
				description : "\n   " + "Once per long rest, I can cast Revivify without using a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["revivify"],
					selection : ["revivify"],
					oncelr : true
				}
			},
			"the hexblade" : {
				name : "Unsealed Arcana",
				description : "\n   " + "Once per long rest, I can cast Blink without using a pact magic spell slot",
				spellcastingBonus : {
					name : "Unsealed Arcana",
					spells : ["blink"],
					selection : ["blink"],
					oncelr : true
				}
			}
		},
		"subclassfeature18" : {
			name : "Blood Curse of the Souleater",
			source : ["MM:BH2020", 9],
			minlevel : 18,
			description : desc([
				"I know the Blood Curse of the Souleater (See notes page)"
			]),
			extraname : "Blood Maledict",
			extrachoices : ["souleater"],
			choicesNotInMenu : true,
			"souleater" : {
				source : ["MM:BH2020", 13],
				name : "Blood Curse of the Souleater",
				description : desc([
					"As a reaction, when a non-construct or undead creatureis reduced to 0 HP in 30 ft:",
					"My weapon attacks have advantage until the end of my next turn",
					"\u2022 Amplify: I regain an expended warlock spell slot. I can only do this once before a LR"
				]),
				usages : "1 amplified",
				recovery : "long rest",
				action : ["reaction", ""]
			},
			autoSelectExtrachoices : [{
				extrachoice : 'souleater'
			}]
		}
	}
});

AddSubClass("blood hunter", "mutant", {
	regExpSearch : /mutant/i,
	subname : "Order of the Mutant",
	source : ["MM:BH2020", 9],
	features : {
		"subclassfeature3" : {
			name : "Formulas",
			source : ["MM:BH2020", 9],
			minlevel : 3,
			description : desc([
				"Use the \"Choose Features\" button above to add Mutagen Formulae to the third page",
				"When I gain a new mutagen formula I can also replace one I know with another"
			]),
			additional : levels.map(function (n) { return n < 3 ? "" : (n < 7 ? 4 : n < 11 ? 5 : n < 15 ? 6 : n < 18 ? 7 : 8) + " mutagen formulae"; }),
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
			"aether (prereq: level 11 blood hunter)" : {
				name : "Aether",
				source : ["MM:BH2020", 9],
				description : desc([
					"I gain 20 ft flying speed for 1 hour",
					"\u2022 Side effect: I have disadvantage on Strength and Dexterity ability checks for 1 hour"
				]),
				prereqeval : function() { return classes.known['blood hunter'].level >= 11 }
			},
			"alluring" : {
				name : "Alluring",
				source : ["MM:BH2020", 9],
				description : desc([
					"I gain advantage on Charisma ability checks",
					"\u2022 Side effect: I have disadvantage on initiative rolls"
				])
			},
			"celerity" : {
				name : "Celerity",
				source : ["MM:BH2020", 9],
				description : desc([
					"My Dex score and max increases by 3. It increases by 4 at level 11 and by 5 at level 18",
					"\u2022 Side effect: I have disadvantage on Wisdom saving throws"
				])
			},
			"conversant" : {
				name : "Conversant",
				source : ["MM:BH2020", 10],
				description : desc([
					"I gain advantage on Intelligence ability checks",
					"\u2022 Side effect: I have disadvantage on Wisdom ability checks"
				])
			},
			"cruelty (prereq: level 11 blood hunter)" : {
				name : "Cruelty",
				source : ["MM:BH2020", 10],
				description : desc([
					"As part of an Attack action, I can make a single weapon attack as a bonus action",
					"\u2022 Side effect: I have disadvantage on Intelligence, Wisdom, and Charisma saving throws"
				]),
				action : ["bonus action", " (after Attack action)"],
				prereqeval : function() { return classes.known['blood hunter'].level >= 11 }
			},
			"deftness" : {
				name : "Deftness",
				source : ["MM:BH2020", 10],
				description : desc([
					"I gain advantage on Dexterity ability checks",
					"\u2022 Side effect: I have disadvantage on Wisdom ability checks"
				])
			},
			"embers" : {
				name : "Embers",
				source : ["MM:BH2020", 10],
				description : desc([
					"I gain resistance to fire damage",
					"\u2022 Side effect: I have vulnerability to cold damage"
				])
			},
			"gelid" : {
				name : "Gelid",
				source : ["MM:BH2020", 10],
				description : desc([
					"I gain resistance to cold damage",
					"\u2022 Side effect: I have vulnerability to fire damage"
				])
			},
			"impermeable" : {
				name : "Impermeable",
				source : ["MM:BH2020", 10],
				description : desc([
					"I gain resistance to piercing damage",
					"\u2022 Side effect: I gain vulnerability to slashing damage"
				])
			},
			"mobile" : {
				name : "Mobile",
				source : ["MM:BH2020", 10],
				description : desc([
					"I gain immunity to the grappled and restrained conditions; At 11th level also paralyzed",
					"\u2022 Side effect: I have disadvantage on Strength checks"
				])
			},
			"nighteye" : {
				name : "Nighteye",
				source : ["MM:BH2020", 10],
				description : desc([
					"I gain darkvision up to 60 ft, or add an extra 60 ft to it if I already have darkvision",
					"\u2022 Side effect: I gain sunlight sensitivity"
				])
			},
			"percipient" : {
				name : "Percipient",
				source : ["MM:BH2020", 10],
				description : desc([
					"I gain advantage on Wisdom ability checks",
					"\u2022 Side effect: I have disadvantage on Charisma ability checks"
				])
			},
			"potency" : {
				name : "Potency",
				source : ["MM:BH2020", 10],
				description : desc([
					"My Str score and max increases by 3. It increases by 4 at level 11 and by 5 at level 18",
					"\u2022 Side effect: I have disadvantage on Dexterity saving throws"
				])
			},
			"precision (prereq: level 11 blood hunter)" : {
				name : "Precision",
				source : ["MM:BH2020", 10],
				description : desc([
					"My weapon attacks score critical hits on attack rolls of 19 and 20",
					"\u2022 Side effect: I gian disadvantage on Strength saving throws"
				]),
				prereqeval : function() { return classes.known['blood hunter'].level >= 11 }
			},
			"rapidity" : {
				name : "Rapidity",
				source : ["MM:BH2020", 10],
				description : desc([
					"My speed increases by 10 ft (15 ft at 15th level)",
					"\u2022 Side effect: I have disadvantage on Intelligence ability checks"
				])
			},
			"reconstruction (prereq: level 7 blood hunter)" : {
				name : "Reconstruction",
				source : ["MM:BH2020", 10],
				description : desc([
					"For an hour, at the start of my turn, I regain hit points equal to my proficiency bonus",
					"This only occurs if I have at least 1 hit point and am below half my hit point maximum",
					"\u2022 Side effect: My speed decreases by 10 ft for an hour"
				]),
				prereqeval : function() { return classes.known['blood hunter'].level >= 7 }
			},
			"sagacity" : {
				name : "Sagacity",
				source : ["MM:BH2020", 10],
				description : desc([
					"My Int score and max increases by 3. It increases by 4 at level 11 and by 5 at level 18",
					"\u2022 Side effect: I have disadvantage on Charisma saving throws"
				])
			},
			"shielded" : {
				name : "Shielded",
				source : ["MM:BH2020", 10],
				description : desc([
					"I gain resistance to slashing damage",
					"\u2022 Side effect: I gain vulnerability to bludgeoning damage"
				])
			},
			"unbreakable" : {
				name : "Unbreakable",
				source : ["MM:BH2020", 10],
				description : desc([
					"I gain resistance to bludgeoning damage",
					"\u2022 Side effect: I gain vulnerability to piercing damage"
				])
			},
			"vermillion" : {
				name : "Vermillion",
				source : ["MM:BH2020", 10],
				description : desc([
					"I gain an additional use of Blood Maledict",
					"\u2022 Side effect: I have disadvantage on death saving throws"
				])
			}
		},
		"subclassfeature3.1" : {
			name : "Mutagencraft",
			source : ["MM:BH", 7],
			minlevel : 3,
			description : desc([
				"I can craft mutagens during a short rest or long rest, which lasts until my next SR/LR",
				"I can craft as many mutagen each short rest as listed above, but only one of each type",
				"Taking a mutagen is a bonus action; mutagens only affect me",
				"The effects of a mutagen overlap and last until next short or long rest, unless specified",
				"As an action, I can end all effects of a single mutagen that is in my system"
			]),
			usages : levels.map(function (n) { return n < 3 ? "" : n < 7 ? 1 : n < 15 ? 2 : 3; }),
			recovery : "short rest",
			action : [
				["bonus action", " (Consume Mutagen)"],
				["action", " (End Mutagen)"]
			],
		},
		"subclassfeature7" : {
			name : "Strange Metabolism",
			source : ["MM:BH2020", 9],
			minlevel : 7,
			description : desc([
				"I gain immunity to poison damage and the poisoned condition",
				"As a bonus action, I can ignore the side effects of a mutagen for 1 minute, once per LR",
			]),
			action : ['bonus action', ''],
			savetxt : { immune : ["poison"] },
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature11" : {
			name : "Brand of Axiom",
			source : ["MM:BH2020", 9],
			minlevel : 11,
			additional : "See the notes page"
		},
		"brand of castigation" : (function () {
			var axiomText = "\n\u25C6 " + "Brand of Axiom (Order of the Mutant 11, MM:BH2020 9)" + desc([
				"Disguise or invisibility ends when branded",
				"Branded target cannot disguise or go invisible while branded",
				"If target polymorphed or shapedchanged when branded or attempts during:",
				"\u2022 It must Wis save. On fail its form reverts and stunned until end of my next turn"
			]);
			var axiom = newObj(ClassList["blood hunter"].features["brand of castigation"]);
			axiom.changeeval = function(v) {
				UpdateBrandText(v[1], v[0], {level: 11, text: axiomText});
			};
			return axiom;
		})(),
		"subclassfeature15" : {
			name : "Blood Curse of Corrosion",
			source : ["MM:BH2020", 9],
			minlevel : 18,
			description : desc([
				"I know the Blood Curse of Corrosion (See notes page)"
			]),
			extraname : "Blood Maledict",
			extrachoices : ["corrosion"],
			choicesNotInMenu : true,
			"corrosion" : {
				source : ["MM:BH2020", 13],
				name : "Blood Curse of Corrosion",
				description : desc([
					"As a bonus action, a target in 30 ft must make a Con save or be come poisoned",
					"At the end of the creature's turns it can make another Con save, ending curse on success",
					"\u2022 Amplify: The target takes 4d6 necrotic damage; takes the dmg again, each failed save"
				])
			},
			autoSelectExtrachoices : [{
				extrachoice : 'corrosion'
			}]
		},
		"subclassfeature18" : {
			name : "Exalted Mutation",
			source : ["MM:BH2020", 9],
			minlevel : 18,
			description : desc([
				"As a bonus action, I can end an active mutagen, then activate a mutagen that I know"
			]),
			action : ['bonus action'],
			usages : "Int mod per ",
			usagescalc : "event.value = Math.max(1, What('Int Mod'));",
			recovery : "long rest"
		}
	}
});

AddSubClass("blood hunter", "lycan", {
	regExpSearch : /^(?=.*lycan)(?=.*blood)(?=.*hunter).*$/i,
	subname : "Order of the Lycan",
	source : ["MM:BH2020", 10],
	features : {
		"subclassfeature3" : {
			name : "Heightened Senses",
			source : ["MM:BH2020", 11],
			minlevel : 3,
			description : desc(["I gain advantage on Wisdom (Perception) checks that rely on hearing or smell"]),
			vision : [["Adv. on Perception relying on hearing or smell", 0]]
		},
		"subclassfeature3.1" : {
			name : "Hybrid Transformation",
			source : ["MM:BH2020", 11],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can transform into a Hybrid lycanthropy form",
				"See the \"Notes\" page for the full rules of this Hybrid form at my current level"
			]),
			usages : levels.map(function(n) { return n < 3 ? "" : n < 11 ? 1 : n < 18 ? 2 : "\u221E\u00D7 per "; }),
			recovery : "short rest",
			action : [["bonus action", " (start/end)"], ["bonus action", "Predatory Strike (with Attack action)"]],
			savetxt : { text : ["Adv. on Str saves in hybrid form"] },
			// dmgres : [["Nonmagical Bludgeoning, not silvered", "Nonmagic unsilvered Bludgeon. (in hybrid)"], ["Nonmagical Piercing, not silvered", "Nonmagic unsilvered Piercing (in hybrid)"], ["Nonmagical Slashing, not silvered", "Nonmagic unsilvered Slashing (in hybrid)"]],
			weaponsAdd : ["Predatory Strike"],
			weaponOptions : [{
				baseWeapon : "unarmed strike",
				regExpSearch : /^(?=.*predatory)(?=.*strike).*$/i,
				name : "Predatory Strike",
				source : ["MM:BH2020", 11],
				description : "Finesse; Only in hybrid form; One attack as bonus action with Predatory Strike attack",
				damage : [1, 6, "slashing"],
				isPredatoryStrikes : true
			}],
			calcChanges : {
				atkCalc : [
					function(fields, v, output) {
						if (v.isMeleeWeapon && classes.known['blood hunter'] && classes.known['blood hunter'].level && ((/\blycan\b/i).test(v.WeaponText) || (/\bhybrid\b/i).test(v.WeaponText))) {
							var lvl = classes.known['blood hunter'].level;
							output.extraDmg += lvl < 3 ? 0 : lvl < 11 ? 1 : lvl < 18 ? 2 : 3;
						}
					},
					"If I include the word 'Lycan' or 'Hybrid' in a melee weapon's name or description, the calculation will add +1 to damage rolls at level 3. This bonus increases to +2 at level 11 and +3 at level 18"
				]
			},
			changeeval : function(v) {
				UpdateHybridForm(v[1], v[0]);
			}
		},
		"subclassfeature7" : {
			name : "Stalker's Prowess",
			source : ["MM:BH2020", 12],
			minlevel : 7,
			description : desc([
				"My speed increases by 10 ft",
				"I also add 10 ft to my long jump distance and 3 ft to my high jump distance",
				"In my Hybrid form, I gain the Improved Predatory Strikes feature"
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
					"I get +1 to attack rolls for my Predatory Strikes at level 7. This bonus increases to +2 at level 11 and +3 at level 18"
				],
				atkAdd : [
					function(fields, v, output) {
						if (v.theWea.isPredatoryStrikes && classes.known['blood hunter'] && classes.known['blood hunter'].level) {
							var lvl = classes.known['blood hunter'].level;
							if (lvl >= 7) {
								fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical with rite';
							}
						}
					},
					"My Predatory Strike attacks count as magical when I have a Crimson rite active."
				]
			}
		},
		"subclassfeature11" : {
			name : "Advanced Transformation",
			source : ["MM:BH2020", 12],
			minlevel : 11,
			description : desc([
				"In my Hybrid form, I gain the Lycan Regeneration feature"
			]),
			calcChanges : {
				atkCalc : [
					function(fields, v, output) {
						if (v.theWea.isPredatoryStrikes && classes.known['blood hunter'] && classes.known['blood hunter'].level && classes.known['blood hunter'].level >= 11) {
							try {
								var curDie = eval(fields.Damage_Die.replace('d', '*'));
							} catch (e) {
								var curDie = 'x';
							};
							if (isNaN(curDie) || curDie < 8) {
								output.die = '1d8';
							};
						}
					},
					"My Predatory Strikes feature damage increases from 1d6 to 1d8 at level 11"
				]
			}
		},
		"subclassfeature15" : {
			name : "Brand of the Voracious",
			source : ["MM:BH2020", 12],
			minlevel : 15,
			description : desc([
				"I have advantage on Wis saves to maintain control of blood lust in hybrid form",
				"While in hybrid form, I have adv. on attacks against a creature branded by me"
			]),
			savetxt : { text : ["Adv. on Wis saves to control blood lust"] },
		},
		"brand of castigation" : (function () {
			var voraciousText = "\n\u25C6 " + "Brand of the Voracious (Order of the Lycan 15, MM:BH2020 12)" + desc([
				"While in hybrid form, I have adv. on attacks against a creature branded by me"
			]);
			var voracious = newObj(ClassList["blood hunter"].features["brand of castigation"]);
			voracious.changeeval = function(v) {
				UpdateBrandText(v[1], v[0], {level: 15, text: voraciousText});
			};
			return voracious;
		})(),
		"subclassfeature18" : {
			name : "Hybrid Transformation Mastery",
			source : ["MM:BH2020", 12],
			minlevel : 18,
			description : desc([
				"I know the Blood Curse of the Howl (See notes page)"
			]),
			extraname : "Blood Maledict",
			extrachoices : ["howl"],
			choicesNotInMenu : true,
			"howl" : {
				source : ["MM:BH2020", 13],
				name : "Blood Curse of the Howl",
				description : desc([
					"As an action, I howl. Each creature in 30 ft that can hear me must make a Wis save",
					"If failed, they are frightened of me until the end of my next turn",
					"If failed by 5 or more, they are stunned while frightened",
					"I can choose any number of creatures that I can see to be unaffected by this howl",
					"\u2022 Amplify: The range of the curse increases to 60 ft"
				])
			},
			autoSelectExtrachoices : [{
				extrachoice : 'howl'
			}]
		}
	}
});

UpdateHybridForm = function(BHlevelNew, BHlevelOld) {
	if (BHlevelOld <= 2 && BHlevelNew <= 2) return;

	//a funtion to create the full text for the hybrid feature
	var makeHybridText = function(lvl) {
		if (lvl < 3) return "";
		var PSdie = lvl >= 11 ? "d8" : "d6";
		var theText = "Blood Hunter (Order of the Lycan) Hybrid form, at level " + lvl + ":" + desc([
			"As a bonus action, I can transform into a Hybrid lycanthropy form",
			"This form lasts for an hour or until I transform back as a bonus action",
			"I can speak, use equipment, and wear armor in this form",
			"I revert back to my normal form if I fall unconscious, drop to 0 HP, or die",
			"While I am in this Hybrid form, I gain the following features:"
		]);
		theText += "\n\u25C6 " + "Feral Might (Order of the Lycan 3, MM:BH2020 11)" + desc([
			"I gain +" + ( lvl < 11 ? "1" : lvl < 18 ? "2" : "3") + " on melee damage rolls. I have advantage on Str checks and saves"
		]);
		theText += "\n\u25C6 " + "Resilient Hide (Order of the Lycan 3, MM:BH2020 11)" + desc([
			"I have resistance to nonmagical bludgeoning, piercing, and slashing damage",
			"Attacks that are made by silvered weapons bypass this resistance",
			"I gain +1 bonus to AC while I am not wearing heavy armor"
		]);
		theText += "\n\u25C6 " + "Bloodlust (Order of the Lycan 3, MM:BH2020 11)" + desc([
			"I must make a save if I start my turn with less than or equal half my hit points",
			"The save is a DC " + (8+Math.floor(lvl/3)) + " Wisdom saving throw. " + (lvl < 15 ? "" : "I have advantage on this save"),
			"I automatically fail if I am under an effect that prevents concentrating (like Rage)",
			"If failed, I must move to the nearest creature and take the Attack action on it",
			"I may choose not to use my Extra Attack feature on this Attack action.",
			"After this Attack action, I regain control and can continue my turn"
		]);
		theText += "\n\u25C6 " + "Predatory Strikes (Order of the Lycan 3, MM:BH2020 11)" + desc([
			"My unarmed strikes are more powerful and can be imbued with a Crimson Rite",
			"These predatory strikes do " + PSdie + " damage and I can use Dex or Str with them",
			"When I use them during an Attack action, I can make another as a bonus action"
		]);
		if (lvl >= 7) {
			theText += "\n\u25C6 " + "Improved Predatory Strikes (Order of the Lycan 7, MM:BH2020 12)" + desc([
				"My Predatory Strikes gain +" + ( lvl < 11 ? "1" : lvl < 18 ? "2" : "3") + " on attack rolls.",
				"If I have an active Crimson Rite, my predatory strikes are considered magical"
			]);
		}
		if (lvl >= 11) {
			theText += "\n\u25C6 " + "Lycan Regeneration (Order of the Lycan 11, MM:BH2020 12)" + desc([
				"If I have less than half my max HP at the start of my turn, I heal myself",
				"I regain 1 + Constitution modifier (min 1) HP; This doesn't work if I'm at 0 HP"
			]);
		}
		return theText;
	};

	//update the hybrid feature on the notes page
	var BHstringOld = makeHybridText(BHlevelOld);
	var BHstringNew = makeHybridText(BHlevelNew);
	AddToNotes(BHstringNew, "Blood Hunter (Order of the Lycan) Hybrid form features", BHstringOld, "Class Features section");
};