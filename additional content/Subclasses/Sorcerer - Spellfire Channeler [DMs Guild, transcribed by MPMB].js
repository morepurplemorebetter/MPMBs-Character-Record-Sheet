/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Sorcerer, called "Spellfire Channeler"
				This is taken from the 'Forgotten Realms Archetypes II: Champions of Mystery' made by Jeremy Forbing & Leo David Pakirdjian (https://www.dmsguild.com/product/211385)
	Code by:	MorePurpleMoreBetter
	Date:		2017-11-29 (sheet v12.999)
	
	Please support the creators of this content (Jeremy Forbing & Leo David Pakirdjian) and download their material from the DMs Guild website: https://www.dmsguild.com/browse.php?x=0&y=0&author=Jeremy%20Forbing  &  https://www.dmsguild.com/browse.php?x=0&y=0&author=Leo%20David%20Pakirdjian
	
	Note:		Because this subclass is so verbose, not all features will fit into the Class Features section of the character sheet and the field will overflow!
	
	Caution:	MorePurpleMoreBetter advises against using this subclass as it breaks game balance (it is clearly overpowered). This code was made on commission for a patron.
*/

var iFileName = "Sorcerer - Spellfire Channeler [DMs Guild, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["FRA2"] = {
	name : "Forgotten Realms Archetypes II: Champions of Mystery",
	abbreviation : "FRA2",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/211385/",
	date "2017/05/07"
};

AddSubClass("sorcerer", "spellfire channeler", {
	regExpSearch : /^(?=.*spellfire)(?=.*channeler).*$/i,
	subname : "Spellfire Channeler",
	source : ["FRA2", 31],
	fullname : "Spellfire Channeler",
	spellcastingExtra : ["detect magic", "shield", "misty step", "warding bond", "counterspell", "dispel magic", "death ward", "ice storm", "flame strike", "teleportation circle"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Spells",
			source : ["FRA2", 31],
			minlevel : 1,
			description : desc([
				"I learn Produce Flame, Detect Magic, and Identify in addition to my spells known",
				"As an action, I can ignite a flammable object with the touch of my hand"
			]),
			action : ["action", " (ignite)"],
			spellcastingBonus : {
				name : "Bonus Spells",
				spells : ["produce flame", "detect magic", "identify"],
				selection : ["produce flame", "detect magic", "identify"],
				times : 3
			}
		},
		"subclassfeature1.1" : {
			name : "Channel Spellfire",
			source : ["FRA2", 31],
			minlevel : 1,
			description : desc([
				"I gain a number of spellfire dice that I can use to fuel special abilities",
				"When I use any, I shed 30 ft bright and 30 ft dim light until the end of my next turn",
				"If I use 4 or more dice in a single turn, the radii are doubled",
				"Starting at level 6, I can expend up to my proficiency bonus amount of die per turn",
				"If the dice spend in a turn exceed my Con mod, I must make a Wis save (DC 13+prof B.)",
				"If failed, I and all within 10 ft take fire and force damage of half my level + my prof B.",
				"Whenever I am healed for 10 or more damage, I can regain 1 dice instead of healing 10"
			]),
			usages : levels.map(function (n) {
				return n < 5 ? 2 : n < 9 ? 3 : n < 13 ? 4 : n < 17 ? 5 : 6;
			}),
			additional : levels.map(function (n) {
				return "d" + (n < 11 ? 10 : 12) + (n < 6 ? "; 1 per turn" : "");
			}),
			recovery : "long rest",
			extraname : "Channel Spellfire",
			"reactive healing" : {
				name : "Reactive Healing",
				source : ["FRA2", 31],
				description : " [1 or more spellfire dice]" + desc([
					"As a reaction when I take cold or spell damage, I can expend die to regain the result in HP"
				]),
				action : ["reaction", ""]
			},
			"burn projectiles" : {
				name : "Burn Projectiles",
				source : ["FRA2", 31],
				description : " [1 or more spellfire dice]" + desc([
					"As a reaction when I'm hit by a ranged weapon attack, I can expend die to melt the missile",
					"I reduce the damage taken by my sorcerer level + the number rolled on the expended dice"
				]),
				action : ["reaction", ""]
			},
			"empowered fire" : {
				name : "Empowered Fire",
				source : ["FRA2", 31],
				description : desc([
					"As a bonus action when I inflict fire damage with a spell or cantrip, I can do extra damage",
					"The target takes force damage equal to the roll of the expended dice and is pushed 10 ft"
				]),
				action : ["bonus action", ""],
				additional : levels.map(function (n) {
					return "1 or more spellfire dice; up to " + (n < 5 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4) + " target" + (n < 5 ? "" : "s");
				})
			},
			"healing spellfire" : {
				name : "Healing Spellfire",
				source : ["FRA2", 31],
				description : " [1 or more spellfire dice]" + desc([
					"As an action, I can heal a creature I touch for the roll of the expended dice"
				]),
				action : ["action", ""]
			},
			eval : "var CSopt = ['reactive healing', 'burn projectiles', 'empowered fire', 'healing spellfire']; for (var csf = 0; csf < CSopt.length; csf++) {ClassFeatureOptions(['sorcerer', 'subclassfeature1.1', CSopt[csf], 'extra']); };",
			removeeval : "var CSopt = ['reactive healing', 'burn projectiles', 'empowered fire', 'healing spellfire']; for (var csf = 0; csf < CSopt.length; csf++) {ClassFeatureOptions(['sorcerer', 'subclassfeature1.1', CSopt[csf], 'extra'], 'remove'); };"
		},
		"subclassfeature1.2" : {
			name : "Drain Magic",
			source : ["FRA2", 31],
			minlevel : 1,
			description : desc([
				"As an action, I can drain one use or charge consumable magic item within 5 ft of me",
				"If the item is in a creature's possession, it can make a Wis save (DC 8+prof B.)",
				"If I succeed in draining, I can use a bonus action to regain one expended spellfire die"
			]),
			action : ["action", ""],
			usages : "Proficiency bonus per ",
			usagescalc : "event.value = Math.max(1, tDoc.getField('Proficiency Bonus').submitName);",
			recovery : "long rest"
		},
		"subclassfeature6" : {
			name : "Absorb Magic",
			source : ["FRA2", 32],
			minlevel : 6,
			description : desc([
				"I learn Counterspell and Dispel Magic in addition to my spells known",
				"When I use either to end one or more spell effects, I regain one expended spellfire die",
				"As a reaction when I make a save against a spell, I can expend 1 or more spellfire dice",
				"Doing this grants me adv. on the save and heals me equal to the result of the dice rolled"
			]),
			action : ["reaction", ""],
			spellcastingBonus : {
				name : "Absorb Magic",
				spells : ["counterspell", "dispel magic"],
				selection : ["counterspell", "dispel magic"],
				times : 2
			}
		},
		"subclassfeature6.1" : {
			name : "Spellfire Sorcery",
			source : ["FRA2", 32],
			minlevel : 6,
			description : desc([
				"As a bonus action, I can spend 2 sorcery points to regain 1 expended spellfire die",
				"Alternatively, I can expend 2 spellfire dice to regain 1 sorcery point"
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature14" : {
			name : "Spellfire Mastery",
			source : ["FRA2", 32],
			minlevel : 14,
			description : desc([
				"I add my Charisma modifier to fire damage spells that I cast using a spell slot",
				"I can use spellfire dice to gain 40 ft fly speed for a number of minutes equal to the roll",
				"Whenever I use spellfire dice, I become charged with fire until the end of my next turn",
				"If I hit a target in melee or I'm touched while charged, I do my Cha mod in fire damage"
			])
		},
		"subclassfeature18" : {
			name : "Crown of Fire",
			source : ["FRA2", 32],
			minlevel : 18,
			description : desc([
				"As an action, I wreathe myself in spellfire for 1 minute and gain the following benefits:",
				" - I have resistance to all damage and gain a +5 on all my saving throws against spells",
				" - I add my proficiency bonus to any roll of fire damage that I make",
				" - I shed bright light in a 100-ft radius and dim light in an additional 100 ft"
			]),
			recovery : "long rest",
			usages : 1,
			action : ["action", ""]
		}
	}
});
