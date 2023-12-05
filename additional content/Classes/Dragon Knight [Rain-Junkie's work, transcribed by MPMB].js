/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Class
	Effect:     This script adds the class called "Dragon Knight" its 4 subclasses

				This class has been made by /u/Rain-Junkie on the subbreddit /r/UnearthedArcana
				It can be found here: https://redd.it/nob4gm/
				PDF here: https://drive.google.com/file/d/17Xd8SHqvfYYWgpcgzAi_6_cxSJJvWWwl/view
				This code is based on v8.1 of /u/Rain-Junkie's work (2021-05-30)

	Code by:	MorePurpleMoreBetter
				parts taken from an older transcription by Seneschal
	Date:		2023-12-04 (sheet v13.1.11)
*/

/* -NOTES-
	The companion is highly complex and has 6 attack options.
	Because of that, 2 companion pages will be used to display all the game mechanics.

	Adding this script won't make it possible to use a Dragon Companion with any other
	class than Dragon Knight. For that to work, the script will have to be altered to fit another class.
*/

/*	- TE TESTEN -
	test: platinum dragon gaining platinum traits
	test: platinum dragon remove old dragon `addDragonCompanion` function not working
*/

var iFileName = "Dragon Knight [Rain-Junkie's work, transcribed by MPMB].js";
RequiredSheetVersion('13.1.11');

SourceList["RJ:DK"] = {
	name : "/u/Rain-Junkie: Dragon Knight (v8.1)",
	abbreviation : "RJ:DK",
	group : "Reddit/r/UnearthedArcana",
	url : "https://www.reddit.com/r/UnearthedArcana/comments/nob4gm/the_dragon_knight_v81/",
	date : "2021/05/30"
};

var createDragonCompanion = function (colour, origColour) {
	var features = {
		amphibious : {
			name : "Amphibious",
			description : "The dragon can breathe air and water."
		},
		iceWalk : {
			name : "Ice Walk",
			description : "The dragon is unhindered by difficult terrain composed of ice or snow and can move on icy surfaces without needing an ability check."
		}
	}
	var types = {
		'black' : {
			energy : "acid",
			speed : "swim",
			features : [features.amphibious],
			breathRange : "5-ft \xD7 30-ft line",
			breathSave : "Dex"
		},
		'blue' : {
			energy : "lightning",
			speed : "climb",
			breathRange : "5-ft \xD7 30-ft line",
			breathSave : "Dex"
		},
		'brass' : {
			energy : "fire",
			speed : "climb",
			breathRange : "5-ft \xD7 30-ft line",
			breathSave : "Dex"
		},
		'bronze' : {
			energy : "lightning",
			speed : "swim",
			features : [features.amphibious],
			breathRange : "5-ft \xD7 30-ft line",
			breathSave : "Dex"
		},
		'copper' : {
			energy : "acid",
			speed : "climb",
			breathRange : "5-ft \xD7 30-ft line",
			breathSave : "Dex"
		},
		'gold' : {
			energy : "fire",
			speed : "swim",
			features : [features.amphibious],
			breathRange : "15-ft cone",
			breathSave : "Dex"
		},
		'green' : {
			energy : "poison",
			speed : "swim",
			features : [features.amphibious],
			breathRange : "15-ft cone",
			breathSave : "Con",
			condition_immunities : "poisoned"
		},
		'platinum' : { // other attribute same as original type
			energy : "radiant",
			breathRange : "5-ft \xD7 30-ft line",
			breathSave : "Dex",
			traits : [{
				name : "Radiant Bastion (Platinum Practice 10)",
				minlevel : 10,
				description : "The dragon has adv. on checks and saves against being knocked prone, grappled, restrained, or moved against it will."
			}, {
				name : "Platinum Ward (Platinum Practice 18)",
				minlevel : 18,
				description : "The dragon has resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons. When it takes damage no more than its bond's dragon knight level before applying resistances, the dragon takes no damage instead."
			}]
		},
		'red' : {
			energy : "fire",
			speed : "climb",
			breathRange : "15-ft cone",
			breathSave : "Dex"
		},
		'shadow' : { // other attribute same as original type
			energy : "necrotic",
			breathRange : "15-ft cone",
			breathSave : "Con",
			features : [{
				name : "Night Walker (Shadow Practice 10)",
				minlevel : 10,
				description : "While in dim light or darkness, the dragon has advantage on Dexterity (Stealth) checks and can take the Hide action as a bonus action."
			}],
			actions : [{
				name : "Umbra Pulse (Shadow Practice 18)",
				minlevel : 18,
				description : "As an action, the dragon can create a 30-ft radius vortex around itself. Any creatures of its choice in the vortex take 10d10 necrotic damage and are either pulled towards or pushed away from its bond by up to 15 ft. They can make a Constitution save (DC 8 + Proficiency Bonus + its bond's Charisma modifier) to halve the damage and not be moved."
			}],
			features_cont : [{
				name : "Withering Breath (Shadow Practice 7)",
				minlevel : 7,
				description : "When a creature fails its save against the dragon's breath weapon, it withers for 1 minute. If it makes a weapon attack using Strength while it withers, the damage dealt is reduced with the Charisma modifier of the dragon's bond. The target can make a Constitution save at the end of each of its turns to end this effect."
			}]
		},
		'silver' : {
			energy : "cold",
			speed : "climb",
			breathRange : "15-ft cone",
			breathSave : "Con"
		},
		'white' : {
			energy : "cold",
			speed : "climb",
			features : [features.iceWalk],
			breathRange : "15-ft cone",
			breathSave : "Con"
		}
	}
	var type = types[colour];
	if (!type) return false;
	var colourUC = colour.capitalize();
	if (origColour && types[origColour]) {
		for (var attr in types[origColour]) {
			if (type[attr] === undefined) {
				type[attr] = types[origColour][attr];
			} else if (isArray(types[origColour][attr])) {
				type[attr] = [].concat(types[origColour][attr]).concat(type[attr]);
			}
		}
	}
	var creature = {
		isDragonKnightCompanion : true, // flag which type this is, companion or continued
		dragonCompanionType : origColour ? origColour : colour, // simple way to lookup the colour dynamically
		dragonCompanionTypeSubclass : origColour ? colour : "", // simple way to lookup the colour dynamically
		dragonKnightLevel : 1, // needed for the `incrementDragonAttacks` function
		companionApply : global_DragonKnight.fn.getLinkedCompanionListing(), // auto-apply the right CompanionList object determined by subclass
		name : colourUC + " Dragon Companion",
		nameAlt : ["Dragon Companion, " + colourUC],
		minlevelLinked : ["dragon knight"],
		header : "Dragon comp" + (typePF ? "anion" : "."),
		source : [["RJ:DK", 11]],
		size : 3,
		type : "Dragon",
		alignment : "Same as its bond",
		ac : '11+Con+Prof',
		hp : 8,
		hd : [1, 10],
		hdLinked : ["dragon knight"],
		speed : "20 ft, fly 30 ft, " + type.speed + " 20 ft",
		scores : [14, 8, 14, 10, 12, 12],
		saves : ["", "", "", "", "", ""],
		skills : {
			"perception" : 3,
			"stealth" : 1
		},
		damage_immunities : type.energy,
		condition_immunities : type.condition_immunities,
		passivePerception : 15,
		senses : "Darkvision 60 ft",
		languages : "Draconic",
		challengeRating : "1",
		proficiencyBonus : 2,
		proficiencyBonusLinked : true,
		attacksAction : 0,
		attacks : [{
			name : "Claw",
			ability : 1,
			damage : [1, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "",
			abilitytodamage : true,
			description_base : ""
		}, {
			name : "Bite (1 charge)", // dragon knight level 2
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "+1d6 " + type.energy + " damage",
			description_base : "+1d6 " + type.energy + " damage",
			abilitytodamage : true
		}, {
			name : "Tail (1 charge)", // dragon knight level 2
			ability : 1,
			damage : [1, 6, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "On hit, Str save or knocked prone",
			description_base : "On hit, Str save or knocked prone",
			abilitytodamage : true
		}, {
			name : "Beat Wings (1 charge)", // dragon knight level 2
			ability : 1,
			damage : ["Str save", "", "Pushed away"], // can't have the distance in here, because this is not subject to metric/imperial switch automation
			range : "5 ft",
			description : "Chosen in range Str save or pushed 5 ft away; Move half fly speed after using; See Traits",
			description_base : "Chosen in range Str save or pushed 5 ft away; Move half fly speed after using; See Traits",
			abilitytodamage : false,
			dc : true,
			tooltip : "Rather than making an attack, the dragon can beat its wings. Creatures of your choice within 5 ft of the dragon must make a Strength saving throw. On a failed save, a creature is pushed 5 ft away from the dragon. The range of the push and distance a creature is pushed on a failed save increase by 5 ft at 6th level, 10th level, and 14th level. Immediately after making this special attack, the dragon can move up to half its flying speed."
		}, {
			name : "Breath Weapon (1\xD7 per SR)", // dragon knight level 6
			ability : 3,
			damage : [4, 8, type.energy],
			range : type.breathRange,
			description : type.breathSave + " save for half damage",
			abilitytodamage : false,
			dc : true
		}, {
			name : "Titanic Roar (1\xD7 per LR)", // dragon knight level 13
			ability : 3,
			damage : ["Wis save", "", "Frightened"],
			range : "20 ft",
			description : "Chosen creatures in range Wis save or frightened for 1 min; Repeat save at end of turn",
			abilitytodamage : false,
			dc : true
		}],
		features : [{
			name : "Bond",
			description : "The dragon companion and its bond always know the direction to one another, and can communicate with vague images, emotions, and feelings, regardless of distance."
		}, {
			name : "Limited Abilities",
			description : "The dragon " + global_DragonKnight.str.limitedAbilities.join(", ")
		}].concat(type.features ? type.features : []),
		traits : [{ // for upgrading level-dependent stuff
			name : "Draconic Growth",
			minlevel : 5,
			description : undefined, // if description is undefined, no text will be added but the (remove)eval will still run
			eval : function(prefix, lvl) {
				// upgrade the speed
				var fldName = prefix + "Comp.Use.Speed";
				var speedExtra = /climb/i.test(What(fldName)) ? "climb" : "swim";
				var newSpeed = "30 ft, fly 45 ft, " + speedExtra + " 30 ft";
				if (What("Unit System") === "metric") newSpeed = ConvertToMetric(newSpeed, 0.5);
				Value(fldName, newSpeed);
				// remove the second line of limited abilities
				var fldName = prefix + "Comp.Use.Features";
				var origLimAbi = global_DragonKnight.str.limitedAbilities.slice(1).join(", ");
				var newLimAbi = global_DragonKnight.str.limitedAbilities[2];
				Value(fldName, What(fldName).replace(origLimAbi, newLimAbi));
			},
			removeeval : function(prefix, lvl) {
				// downgrade the speed
				var fldName = prefix + "Comp.Use.Speed";
				var speedExtra = /climb/i.test(What(fldName)) ? "climb" : "swim";
				var newSpeed = "20 ft, fly 30 ft, " + speedExtra + " 20 ft";
				if (What("Unit System") === "metric") newSpeed = ConvertToMetric(newSpeed, 0.5);
				Value(fldName, newSpeed);
				// re-add the second line of limited abilities
				var fldName = prefix + "Comp.Use.Features";
				var origLimAbi = global_DragonKnight.str.limitedAbilities.slice(1).join(", ");
				var curLimAbi = global_DragonKnight.str.limitedAbilities[2];
				var curString = What(fldName);
				if (curString.indexOf(origLimAbi) === -1) Value(fldName, curString.replace(curLimAbi, origLimAbi));
			}
		}, {
			name : "Draconic Advancement (Dragon Knight 9)",
			minlevel : 9,
			description : typePF ? "The dragon has advantage on all saves while it can see its bond." : "Adv. on saves while the dragon can see its bond.",
			eval : function(prefix, lvl) {
				// upgrade size
				PickDropdown(prefix + "Comp.Desc.Size", 2);
				// upgrade the speed (gained from Draconic Growth at level 9)
				var fldName = prefix + "Comp.Use.Speed";
				var speedExtra = /climb/i.test(What(fldName)) ? "climb" : "swim";
				var newSpeed = "40 ft, fly 60 ft, " + speedExtra + " 40 ft";
				if (What("Unit System") === "metric") newSpeed = ConvertToMetric(newSpeed, 0.5);
				Value(fldName, newSpeed);
				// remove the whole limited abilities entry
				var fldName = prefix + "Comp.Use.Features";
				var rx = RegExp("[\\r\\n]*\\u25C6 Limited Abilities[\\s\\S]+"+global_DragonKnight.str.limitedAbilities[2], "i");
				var curString = What(fldName);
				if (rx.test(curString)) Value(fldName, curString.replace(rx, ''));
			},
			removeeval : function(prefix, lvl) {
				// downgrade size
				PickDropdown(prefix + "Comp.Desc.Size", 3);
				// downgrade the speed (gained from Draconic Growth at level 9)
				var fldName = prefix + "Comp.Use.Speed";
				var speedExtra = /climb/i.test(What(fldName)) ? "climb" : "swim";
				var newSpeed = "30 ft, fly 45 ft, " + speedExtra + " 30 ft";
				if (What("Unit System") === "metric") newSpeed = ConvertToMetric(newSpeed, 0.5);
				Value(fldName, newSpeed);
				// re-add limited abilities with just the last line
				var fldName = prefix + "Comp.Use.Features";
				var origLimAbi = "\r\u25C6 Limited Abilities: The dragon " + global_DragonKnight.str.limitedAbilities[2];
				var curString = What(fldName);
				if (curString.indexOf("Limited Abilities") === -1) Value(fldName, curString+origLimAbi);
			}
		}].concat(type.traits ? type.traits : []),
		actions : [{
			name : "Dragon's Fury (Dragon Knight 2)",
			minlevel : 2,
			description : "The dragon gains special bite, tail and beat wings attacks, which it can use its Strength modifier times per short rest (minimum 1).",
			eval : function(prefix, lvl) {
				var crea = CurrentCompRace[prefix];
				// display the other attack options
				Value(prefix + "Comp.Use.Attack.1.Weapon Selection", crea.attacks[0].name);
				Value(prefix + "Comp.Use.Attack.2.Weapon Selection", crea.attacks[1].name);
				Value(prefix + "Comp.Use.Attack.3.Weapon Selection", crea.attacks[2].name);
				// set attacks per action to 1
				Value(prefix + "Comp.Use.Attack.perAction", 1);
				// remove the first line of limited abilities
				var fldName = prefix + "Comp.Use.Features";
				var origLimAbi = global_DragonKnight.str.limitedAbilities.join(", ");
				var newLimAbi = global_DragonKnight.str.limitedAbilities.slice(1).join(", ");
				Value(fldName, What(fldName).replace(origLimAbi, newLimAbi));
				// Add a continued entry to fit all the attack options
				global_DragonKnight.fn.addDragonCompanion(true, crea.dragonCompanionType, true, crea.dragonCompanionTypeSubclass ? false : true);
			},
			removeeval : function(prefix, lvl) {
				var crea = CurrentCompRace[prefix];
				// display only the claw attack option
				Value(prefix + "Comp.Use.Attack.1.Weapon Selection", crea.attacks[0].name);
				Value(prefix + "Comp.Use.Attack.2.Weapon Selection", "");
				Value(prefix + "Comp.Use.Attack.3.Weapon Selection", "");
				// set attacks per action to 0
				Value(prefix + "Comp.Use.Attack.perAction", 0);
				// re-add the first line of limited abilities
				var fldName = prefix + "Comp.Use.Features";
				var origLimAbi = global_DragonKnight.str.limitedAbilities.join(", ");
				var curLimAbi = global_DragonKnight.str.limitedAbilities.slice(1).join(", ");
				var curString = What(fldName);
				if (curString.indexOf(origLimAbi) === -1) Value(fldName, curString.replace(curLimAbi, origLimAbi));
				// Remove the continued entry
				global_DragonKnight.fn.addDragonCompanion(false, crea.dragonCompanionType, true, crea.dragonCompanionTypeSubclass ? false : true);
			}
		}, {
			name : "Coordinated Assault (Dragon Knight 11)",
			minlevel : 11,
			description : "As a reaction when the dragon's bond misses a weapon attack on their turn, the dragon can make a single claw attack."
		}].concat(type.actions ? type.actions : []),
		notes : [{
			name : colourUC + " Dragon Covenant (Dragon Knight 1, RJ:DK 4)",
			description : desc([
				origColour ? "I gained the services of a " + origColour + " dragon turned " + colour + ", who gains abilities as I gain levels" : "I gained the services of a " + colour + " dragon, who gains abilities as I gain dragon knight levels",
				"When I die, the dragon also dies after a number of hours equal to my dragon knight level",
				"I can revive it with a ritual taking 8 hours, 25 gp of gems per level, and expending half my HD"
			]),
			joinString : ""
		}, {
			name : "Companion's Bond (Dragon Knight 1, RJ:DK 4)",
			description : desc([
				"My dragon companion obeys my commands, shares my initiative and acts on my turn",
				"I determine its actions, decisions, attitudes, and so on. It rolls its own initiative if I'm absent",
				"It can't activate or attune to magic items. If unarmored, its AC is 11 + Con mod + Prof Bonus",
				"Its level is considered equal to my dragon knight level for the purpose of spells and effects",
				"It uses my Proficiency Bonus and makes death saves when reduced to 0 HP",
				"It gains proficiency with all the same saves as me, and 2 skills of my choice (not automated)",
				"It gains a HD (and thus HP) for every dragon knight level I gain, and an ASI whenever I do"
			]),
			joinString : ""
		}, {
			name : "Fulfilled Covenant (Dragon Knight 20, RJ:DK 6)",
			minlevel : 20,
			description : desc([
				"My dragon and I share hit points, a pool of our combined HP; We also pool our HD for rests",
				"Whenever one of use takes damage, that damage is subtracted from this pool",
				"When this pool hits 0, both me and my dragon fall unconscious, but only I make death saves",
				"If I become stable or die, so does my dragon; Healing on either of us restores HP to the pool",
				"Both our hit dice can be spend during a rest to restore hit points",
				"Automation added the dragon's HP to the first page, while the HP on the companion page is 0"
			]),
			joinString : "",
			calcChanges : {
				hp : function (totalHD, HDobj, prefix) {
					HDobj.alt.push( "pooled" );
					HDobj.altStr.push("The hit points of the dragon companion and the dragon knight are now combined into a single pool. The pooled total is (to be) set on the 1st page. If you have selected for an automated total, the dragon companion's hit points are added automatically.");
				},
				setAltHp : true
			}
		}],
		eval : function(prefix, lvl) {
			// Set the hit points to automatically assume the fixed value
			var crea = CurrentCompRace[prefix];
			var sHPfld = prefix + "Comp.Use.HP.Max";
			var aHPsets = How(sHPfld).split(",");
			aHPsets[3] = "fixed";
			AddTooltip(sHPfld, undefined, aHPsets.join(","));
			// Remove the attacks if adding this creature before dragon knight level 2
			var dkLvl = classes.known['dragon knight'] ? classes.known['dragon knight'].level : classes.totallevel;
			if (dkLvl < 2) {
				Value(prefix + "Comp.Use.Attack.1.Weapon Selection", crea.attacks[0].name);
				Value(prefix + "Comp.Use.Attack.2.Weapon Selection", "");
				Value(prefix + "Comp.Use.Attack.3.Weapon Selection", "");
			}
			// Link the saving throw proficiencies to that of the main character
			global_DragonKnight.fn.linkToChar(true, prefix);
			// Alert player of things that have to be done manually
			app.alert({
				cMsg : toUni("Pick Two Skills") + "\nThe Dragon Companion that has just been added gains proficiency with two additional skills to those already selected. Because there is no automation for selecting these proficiencies, please do so manually.\n\n"+
				toUni("Ability Score Improvements") + "\nThe Dragon Companion gains Ability Score Improvements (ASI) whenever your character gains them. A dragon companion can't use these to take feats. There is no automation for adding these ASIs either, so please don't forget to increase the ability scores for the dragon companion when you get the reminder pop-up for ASI changes.\nThe 'Notes' section on the companion page automatically keeps track of how many points you can increase the ability scores with and what the base value of those scores were.\n\n"+
				toUni("Beware of resetting!") + "\nIf you see this pop-up for a second time, that means that something, like a class feature, made a change to the dragon companion that required the companion page to be reset. Unfortunately, that means that any manual additions like skill proficiencies and ability score improvements were also reset.",
				nIcon : 3,
				cTitle : "Don't forget the Skills and Ability Score Improvements!"
			});
		},
		removeeval : function(prefix, lvl) {
			// Undo linking saving throw proficiencies
			global_DragonKnight.fn.linkToChar(false, prefix);
		},
		changeeval : function (prefix, lvl) {
			// Update the string with the number of Ability Score Improvements (ASI)
			var objCreaFnd = CurrentCompRace[prefix];
			var objCrea = CreatureList[objCreaFnd.known];
			var iASIs = 0;
			for (var aClass in classes.known) {
				if (!CurrentClasses[aClass].improvements) continue;
				var classLvL = Math.min(CurrentClasses[aClass].improvements.length, classes.known[aClass].level);
				iASIs += 2 * CurrentClasses[aClass].improvements[classLvL - 1];
			}
			var sNote = What(prefix + "Cnote.Left");
			var sNoteNew = sNote;
			if (!iASIs) {
				sNoteNew = sNote.replace(/[\r\n]? *Currently, \d+ points.*/, "");
			} else {
				var sIncreases = "Currently, " + iASIs + " points to divide " + (objCrea && objCrea.scores ? "(default: " + objCrea.scores[0] + " Str, " + objCrea.scores[1] + " Dex, " + objCrea.scores[2] + " Con, " + objCrea.scores[3] + " Int, " + objCrea.scores[4] + " Wis, " + objCrea.scores[5] + " Cha)" : "among the ability scores");
				sNoteNew = sNote.replace(/(ASI.*)([\r\n]? *Currently, \d+ points.*)?/, "$1\r   " + sIncreases);
			}
			if (sNote !== sNoteNew) Value(prefix + "Cnote.Left", sNoteNew);
			// Update the level-dependent parts of the attacks for this and the continued version
			global_DragonKnight.fn.incrementDragonAttacks(prefix, lvl);
		}
	}
	var linkedCreature = {
		isDragonKnightCompanionLinked : true, // flag which type this is, companion or continued
		dragonCompanionType : creature.dragonCompanionType, // simple way to lookup the colour dynamically
		dragonCompanionTypeSubclass : creature.dragonCompanionTypeSubclass,
		companionApply : global_DragonKnight.fn.getLinkedCompanionListing(true),
		name : colourUC + " Dragon continued",
		nameAlt : ["Dragon continued, " + colourUC],
		minlevelLinked : ["dragon knight"],
		proficiencyBonusLinked : true,
		header : "Dragon cont" + (typePF ? "inued" : "."),
		source : creature.source,
		size : creature.size,
		type : creature.type,
		alignment : creature.alignment,
		ac : creature.ac,
		hp : creature.hp,
		hd : creature.hd,
		speed : creature.speed,
		scores : creature.scores,
		saves : creature.saves,
		skills : creature.skills,
		passivePerception : creature.passivePerception,
		senses : creature.senses,
		challengeRating : creature.challengeRating,
		proficiencyBonus : creature.proficiencyBonus,
		attacksAction : 1,
		attacks : creature.attacks,
		features : [{
			name : "See Main Page",
			minlevel : 2,
			description : "This page is an extension of the page for the " + colour + " dragon companion. The combined features, traits, and notes from both there and here describe one and the same creature."
		}].concat(type.features_cont ? type.features_cont : []),
		traits : [].concat(type.traits_cont ? type.traits_cont : []),
		actions : [{
			name : "Beat Wings (Dragon's Fury)",
			minlevel : 2,
			description : "Instead of an attack, the dragon can expend one Dragon's Fury charge and beat its wings. Chosen creatures within 5 ft of the dragon must make a Strength save or be pushed 5 ft away from the dragon. Immediately after doing this, the dragon can move up to half its flying speed. +5 ft push distance on level 6, 10, and 14."
		}, {
			name : "Breath Weapon (Dragon Knight 6)",
			minlevel : 6,
			description : "Once per short rest as an action on the dragon's turn, it can exhale destructive energy. See attack entry.",
			eval : function(prefix, lvl) {
				var crea = CurrentCompRace[prefix];
				Value(prefix + "Comp.Use.Attack.2.Weapon Selection", crea.attacks[4].name);
			},
			removeeval : function(prefix, lvl) {
				Value(prefix + "Comp.Use.Attack.2.Weapon Selection", "");
			}
		}, {
			name : "Titanic Roar (Dragon Knight 13)",
			minlevel : 13,
			description : "Once per long rest as an action on its turn, the dragon can roar. Chosen creatures within 20 ft of the dragon must make a Wisdom saving throw or be frightened of it for 1 minute. The creature can repeat the saving throw at the end each of their turns, ending the effect on a success. See attack entry.",
			eval : function(prefix, lvl) {
				var crea = CurrentCompRace[prefix];
				Value(prefix + "Comp.Use.Attack.3.Weapon Selection", crea.attacks[5].name);
			},
			removeeval : function(prefix, lvl) {
				Value(prefix + "Comp.Use.Attack.3.Weapon Selection", "");
			}
		}].concat(type.actions_cont ? type.actions_cont : []),
		notes : [{
			name : "Dragon Companion continued",
			description : desc([
				"This page is linked to the first page containing the dragon companion",
				"This page is added to have space for all of the dragon companion's attack options",
				"Most fields on this page can't be changed here, but only on the page they are linked to",
				"If you change or remove the race of the companion on the first page, this page will be cleared"
			]),
			joinString : ""
		}],
		eval : function(prefix, lvl) {
			// Link to main entry
			global_DragonKnight.fn.linkToMain(true, prefix);
			// Select weapons
			var crea = CurrentCompRace[prefix];
			var dkLvl = classes.known['dragon knight'] ? classes.known['dragon knight'].level : classes.totallevel;
			Value(prefix + "Comp.Use.Attack.1.Weapon Selection", crea.attacks[3].name);
			Value(prefix + "Comp.Use.Attack.2.Weapon Selection", dkLvl < 6 ? "" : crea.attacks[4].name);
			Value(prefix + "Comp.Use.Attack.3.Weapon Selection", dkLvl < 13 ? "" : crea.attacks[5].name);
			// Show the equipment section
			ShowCompanionLayer(prefix, [undefined, true]);
		},
		removeeval : function(prefix, lvl) {
			// Undo linking to main entry
			global_DragonKnight.fn.linkToMain(false, prefix);
		}
	}
	return [creature, linkedCreature];
}

global_DragonKnight = {
  str : {
	limitedAbilities : [
		"can't take the Attack action", // until dragon knight level 2
		"falls it if it ends its turn in the air", // until dragon knight level 5
		"can't be used as a mount, and can't fly while grappling a creature." // until dragon knight level 9
	],
	and : typePF ? "and" : "\u0026"
  },
  fn : {
	linkToChar : function(bLink, prefix) {
		bLink = bLink ? true : false;
		// Link saving throw proficiencies to main character
		for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
			var Abi = AbilityScores.abbreviations[i];
			var sFldNm = prefix + 'Comp.Use.Ability.' + Abi + '.ST';
			var svFld = tDoc.getField(sFldNm + '.Prof');
			if (!svFld) continue;
			var sCalc = bLink ? "event.value = tDoc.getField('" + Abi + " ST Prof').isBoxChecked(0) ? 'True' : 'False';" : "";
			svFld.setAction("Calculate", sCalc);
			svFld.readonly = bLink;
			// make sure it is calculated before the result field
			if (bLink) svFld.calcOrderIndex = tDoc.getField(sFldNm + '.Mod').calcOrderIndex - 1;
		}
		// Link alignment to main character
		var sCalc = bLink ? "event.value = What('Alignment');" : "";
		tDoc.getField(prefix + "Comp.Desc.Alignment").setAction("Calculate", sCalc);
	},
	linkToMain : function(bLink, prefixTarget) {
		bLink = bLink ? true : false;
		var prefixSource = "";
		if (bLink) {
			prefixSource = global_DragonKnight.fn.getDragonCompPrefix()[0];
			if (!prefixSource) {
				app.alert("No dragon companion found to link this continued page to. This page will now effectively be useless. Please first select dragon companion on this companion page. Once that is done, you can select a 'continued' option on another companion page.\n\nYou can add more companion pages using the 'Layout' bookmark and the button on the top of every companion page.\n\nBe aware that only one dragon companion and one continued companion page can exist (the continued page will always link to the first found dragon companion page).")
				return;
			}
		}
		var linkFld = function(fldBase, fldName, fldModName, defaultCalc, specialCalc) {
			if (!fldName) fldName = ""; // if fldName is nothing, fldModName is the full field name, not just a suffix
			if (!defaultCalc) defaultCalc = "";
			var oFldTar = tDoc.getField(prefixTarget + fldBase + fldName);
			var sFldSrc = prefixSource + fldBase + fldName;
			var bIsCFskill = fldBase.indexOf('Text.Comp.Use.Skills.') !== -1;
			if (!oFldTar || !tDoc.getField(sFldSrc)) return;
			var sCalc = bLink ? (specialCalc ? specialCalc : "var sFld = event.target.name.replace('" + prefixTarget + "', '" + prefixSource + "'); event.value = tDoc.getField(sFld) ? tDoc.getField(sFld).value : ''; " + defaultCalc) : defaultCalc;
			oFldTar.setAction("Calculate", sCalc);
			if (!bIsCFskill) oFldTar.readonly = bLink;
			// make sure it is calculated before the result field
			if (bLink && fldModName) {
				var sFldMod = prefixTarget + (fldName ? fldBase + fldModName : fldModName)
				oFldTar.calcOrderIndex = tDoc.getField(sFldMod).calcOrderIndex - 1;
			}
			if (bIsCFskill) {
				// Special for the skill names on the colourful sheets, make the '.Name' field read only
				tDoc.getField(prefixTarget + fldBase.replace('.Prof', '.Name')).readonly = bLink;
			}
		}
		var hideFld = function(fldName, bNoPrint) {
			var oFld = tDoc.getField(prefixTarget + fldName);
			if (!oFld) return;
			oFld.display = display[bLink ? 'hidden' : bNoPrint ? 'noPrint' : 'visible'];
		}
		// Link ability scores and saves
		for (var i = 0; i < AbilityScores.abbreviations.length; i++) {
			var Abi = AbilityScores.abbreviations[i];
			linkFld('Comp.Use.Ability.' + Abi, '.Score', '.Mod');
			linkFld('Comp.Use.Ability.' + Abi + '.ST', '.Prof', '.Mod', false, "event.value = tDoc.getField('" + Abi + " ST Prof').isBoxChecked(0) ? 'True' : 'False';");
			linkFld('BlueText.Comp.Use.Ability.' + Abi + '.ST.Bonus', false, 'Comp.Use.Ability.' + Abi + '.ST.Mod');
		}
		linkFld('BlueText.Comp.Use.Ability.All.ST.Bonus', false, 'Comp.Use.Ability.Str.ST.Mod');
		// Link skill proficiencies
		for (var i = 0; i < SkillsList.abbreviations.length; i++) {
			var skill = SkillsList.abbreviations[i];
			if (skill === 'Init' || skill === 'Too') continue;
			var skFldBase = 'Comp.Use.Skills.' + skill;
			if (typePF) {
				linkFld(skFldBase + '.Exp', false, 'Comp.Use.Skills.Acr.Mod');
				linkFld(skFldBase, '.Prof', '.Exp');
			} else {
				linkFld('Text.' + skFldBase + '.Prof', false, 'Comp.Use.Skills.Acr.Mod');
			}
			linkFld('BlueText.' + skFldBase + '.Bonus', false, skFldBase + '.Mod');
		}
		linkFld('BlueText.Comp.Use.Skills.All.Bonus', false, 'Comp.Use.Skills.Acr.Mod');
		linkFld('BlueText.Comp.Use.Skills.Perc.Pass.Bonus', false, 'Comp.Use.Skills.Perc.Pass.Mod');
		// Link HD and HP
		linkFld('Comp.Use.HD.Level');
		linkFld('Comp.Use.HD.Die');
		linkFld('Comp.Use.HD.Used');
		linkFld('Comp.Use.HP');
		// Hide buttons
		hideFld('Buttons.Comp.Use.HP.Max', true);
		hideFld('Comp.Heal', true);
		// Hide death saves
		hideFld('Comp.Use.DeathSave');
		// Link descriptive fields
		linkFld('Comp.Desc');
		// Link Initiative, AC, Proficiency bonus, speed, attacks per action, senses
		linkFld('Comp.Use.Combat.Init', '.Bonus', '.Mod', 'DisplayBonusCalculate();');
		linkFld('Comp.Use.AC', false, false, 'DisplayBonusCalculate();');
		linkFld('Comp.Use.Proficiency Bonus', false, 'Comp.Use.Ability.Str.ST.Mod');
		linkFld('BlueText.Comp.Use.Proficiency Bonus Dice', false, 'Comp.Use.Proficiency Bonus');
		linkFld('Comp.Use.Speed');
		linkFld('Comp.Use.Attack.perAction');
		linkFld('Comp.Use.Senses');
	},
	getDragonCompPrefix : function () {
		var returnArray = ["", ""];
		// Loop through all the companion pages and get the first one that is a dragon companion or its linked version
		for (var prefix in CurrentCompRace) {
			if (CurrentCompRace[prefix].isDragonKnightCompanion && !returnArray[0]) {
				returnArray[0] = prefix;
			}
			if (CurrentCompRace[prefix].isDragonKnightCompanionLinked && !returnArray[1]) {
				returnArray[1] = prefix;
			}
		}
		return returnArray;
	},
	addDragonCompanion : function(bAddRemove, colour, bContinued, bIgnoreSubclass) {
		// Add the dragon companion using an custom function so that we can immediately add the correct one (platinum/shadow) with CompanionList selection (if present)
		if (bAddRemove === undefined) bAddRemove = true;

		// get the colour from the choice passed to this eval or from the GetFeatureChoice
		if (!colour) colour = GetFeatureChoice('classes', 'dragon knight', 'dragon covenant');

		// if not a passible option, exit
		var oSubfeature = CurrentClasses['dragon knight'] ? CurrentClasses['dragon knight'].features['dragon covenant'][colour] : false;
		if (!oSubfeature) return;

		var dkLvl = classes.known['dragon knight'] ? classes.known['dragon knight'].level : 0;
		// see if we should use a subclass instead
		var oAltSubfeature = bIgnoreSubclass || !classes.known['dragon knight'].subclass ? false : CurrentClasses['dragon knight'].features['subclassfeature3_dragoncolor'];
		var bUseAltFeature = oAltSubfeature && oAltSubfeature[colour] && oAltSubfeature[colour].creatureOptions && dkLvl >= oAltSubfeature.minlevel;
		var oUseFeature = bUseAltFeature ? oAltSubfeature[colour] : oSubfeature;

		// get the name of the creature to add, its source, and possible CompanionList entry
		var addCrea = oUseFeature.creatureOptions[bContinued ? 1 : 0].name;
		var sourceName = CurrentClasses['dragon knight'].name + ": " + oUseFeature.name;
		var subclassCompanionApply = global_DragonKnight.fn.getLinkedCompanionListing(bContinued);

		var processArray = [[addCrea, false, false, subclassCompanionApply]];

		if (bContinued || bIgnoreSubclass) {
			// bContinued: Add/remove the continued directly, it will exist already
			// bIgnoreSubclass: Add/remove the original colour before/after a subclass special will be added/has been removed
			processAddCompanions(bAddRemove, sourceName, processArray);
		} else {
			// If this is not a continued version and is called from a feature choice, we can just change the `creaturesAdd` attribute for the desired outcome
			// However, if the alt feature is to be used, there should be no `creaturesAdd` attribute of the main feature as the alt feature will do the adding/removing
			oSubfeature.creaturesAdd = !bUseAltFeature ? processArray : false;
		}
	},
	incrementDragonAttacks : function(prefix, aLvl) {
		/*
			As there is no dynamic function for companion page attacks, this is a workaround
			to update these attacks when changing level or adding a new companion.
			For this to work, we need not only change the attacks as they appear on the page,
			but also their objects stored in CreatureList, CurrentVars.extraCreatures, and
			CurrentCompRace.
			That way, the sheet will not only apply the correct attacks currently visible, but also when they are manually changed, and after a close-open cycle.
			We start with updating the attacks in the CurrentCompRace object CurrentVars.extraCreatures and copy that value to the other objects.
		*/
		var lvl = aLvl[1];
		var oCrea = CurrentCompRace[prefix];
		var updateColour = oCrea.dragonCompanionType;
		if (!updateColour || oCrea.dragonKnightLevel === lvl) return;

		var subclass = classes.known['dragon knight'] ? classes.known['dragon knight'].subclass : "";
		var subclassCompanionApply = global_DragonKnight.fn.getLinkedCompanionListing(false, subclass);
		var subclassContinuedApply = global_DragonKnight.fn.getLinkedCompanionListing(true, subclass);

		// First update the attacks array to the current level
		var preAttacks = oCrea.attacks.toSource();
		for (var i = 0; i < oCrea.attacks.length; i++) {
			var atk = oCrea.attacks[i];
			// Rending Strikes
			if (/\b(claw|bite|tail)s?\b/i.test(atk.name)) {
				atk.damage[0] = lvl < 5 ? 1 : 2;
				atk.description = atk.description_base + (lvl < 5 ? "" : (atk.description_base ? "; " : "") + "Counts as magical");
			}
			// Dragon's Fury
			if (/\bbite\b/i.test(atk.name)) {
				atk.description = atk.description.replace('1d6', (lvl < 6 ? 1 : lvl < 10 ? 2 : lvl < 14 ? 3 : 4) + 'd6');
			}
			if (/\btail\b/i.test(atk.name)) {
				atk.range = "Melee (" + (lvl < 6 ? 5 : lvl < 10 ? 10 : lvl < 14 ? 15 : 20) + " ft)";
			}
			if (/wing/i.test(atk.name)) {
				var sRange = lvl < 6 ? 5 : lvl < 10 ? 10 : lvl < 14 ? 15 : 20;
				atk.range = sRange + " ft";
				atk.description = atk.description_base.replace('5', sRange);
			}
			// Breath Weapon
			if (/breath weapon/i.test(atk.name)) {
				atk.damage[0] = lvl < 10 ? 4 : lvl < 14 ? 6 : 8;
				atk.range = /cone/i.test(atk.range) ?
					(lvl < 10 ? 15 : lvl < 14 ? 30 : 60) + "-ft cone" :
					(lvl < 10 ? 5 : 10) + '-ft \xD7 ' + (lvl < 10 ? 30 : lvl < 14 ? 60 : 120) + '-ft line';
			}
			// Titanic roar (Rider Practice only)
			if (subclass.indexOf('rider') !== -1 && /titanic roar/i.test(atk.name)) {
				atk.range = lvl < 18 ? '20 ft' : '120 ft';
			}
		}
		var postAttacks = oCrea.attacks.toSource();
		var bUpdateOnlyLevel = preAttacks === postAttacks; // Nothing changed, only update level remember attribute

		var updateCreaObject = function(oCreaObj, sPrefix) {
			if (!oCreaObj.dragonCompanionType || oCreaObj.dragonCompanionType !== updateColour) return; // Not a dragon companion
			oCreaObj.dragonKnightLevel = lvl;
			if (bUpdateOnlyLevel) return true; // don't continue further
			if (!sPrefix || sPrefix !== prefix) oCreaObj.attacks = oCrea.attacks; // Don't do this for the initializing object
			oCreaObj.companionApply = oCreaObj.isDragonKnightCompanion ? subclassCompanionApply : subclassContinuedApply;
			if (sPrefix) {
				// This is an object linked to a companion page, so also update the attack entries by removing and re-adding them
				for (var i = 1; i <= 3; i++) {
					var fldName = sPrefix + "Comp.Use.Attack." + i + ".Weapon Selection";
					var fldVal = What(fldName);
					if (fldVal) {
						Value(fldName, ""); // reset
						Value(fldName, fldVal); // reapply
					}
				}
			}
			return true; // True to signal something changed
		}
		// Now we go over all the creatures in the different variables and update them
		// First the CurrentVars, which updates the CreatureList
		for (var sCrea in CurrentVars.extraCreatures) {
			var bUpdated = updateCreaObject(CurrentVars.extraCreatures[sCrea]);
			if (bUpdated) CreatureList[sCrea] = CurrentVars.extraCreatures[sCrea];
		}
		// Then the CurrentCompRace object (the initiating one included), as they will have different attributes and signal a field update
		for (var sPrefix in CurrentCompRace) {
			updateCreaObject(CurrentCompRace[sPrefix], sPrefix);
		}
		// Update the field to save the global variable for persistance over closing PDF
		SetStringifieds("vars");
	},
	getLinkedCompanionListing : function(bContinued, subclass) {
		// Return the entry of the CompanionList object associated with currently selected Dragon Knight subclass
		if (!subclass) {
			subclass = classes.known['dragon knight'] && classes.known['dragon knight'].subclass ? classes.known['dragon knight'].subclass : false;
		}
		if (subclass) {
			for (var sComp in CompanionList) {
				if (CompanionList[sComp].dragonKnightSubclass && CompanionList[sComp].dragonKnightSubclass === subclass && (!bContinued || CompanionList[sComp].dragonKnightContinued)) return sComp;
			}
		}
		return "";
	}
  },
  creatureCallback : [function(prefix, oCrea, bAdd) {
		if (!bAdd || (!oCrea.isDragonKnightCompanion && !oCrea.isDragonKnightCompanionLinked)) return;
		var subclassCompanionApply = global_DragonKnight.fn.getLinkedCompanionListing(oCrea.isDragonKnightCompanionLinked);
		if (subclassCompanionApply && What(prefix + "Companion.Remember") !== subclassCompanionApply) {
			ApplyCompRace(What(prefix + "Comp.Race"), prefix, subclassCompanionApply);
		}
	},
	"Whenever I select a Dragon Companion on a companion page, it automatically gets a template applied to it associated with my current Dragon Knight subclass."]
}

ClassList["dragon knight"] = {
	regExpSearch : /^(?=.*dragon)(?=.*knight).*$/i,
	name : "Dragon Knight",
	source : [["RJ:DK", 0]],
	primaryAbility : "Strength and Charisma",
	prereqs : "Strength 13 and Charisma 13",
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Con", "Cha"],
	skillstxt : {
		primary : "Choose two from Arcana, Athletics, Deception, Intimidation, Perception and Persuasion"
	},
	armorProfs : {
		primary : [true, true, true, true],
		secondary : [true, true, false, true]
	},
	weaponProfs : {
		primary : [true, true],
		secondary : [true, true]
	},
	equipment : "Dragon Knight starting equipment:" +
		"\n \u2022 A martial weapon and a shield -or- two martial weapons" +
		"\n \u2022 Chain mail -or- scale mail -or- leather armor" +
		"\n \u2022 A light crossbow and 20 bolts -or- five javelins" +
		"\n \u2022 A dungeoneer's pack -or- an explorer's pack" +
		"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Dragon Knight Practice", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"dragon covenant" : {
			name : "Dragon Covenant",
			source : [["RJ:DK", 4]],
			minlevel : 1,
			description : desc([
				'Choose a dragon covenant color using the "Choose Features" button above'
			]),
			languageProfs : ["Draconic"],
			choices : ["Black", "Blue", "Brass", "Bronze", "Copper", "Gold", "Green", "Red", "Silver", "White"],
			"black" : {
				name : "Black Dragon Covenant",
				description : desc([
					"I share a bond with a black dragon, who obeys my commands; I know Draconic",
					"We know the direction to each other " + global_DragonKnight.str.and + " can communicate with emotions at any distance",
					"If I die, it dies 1 hour per Dragon Knight level later; I can revive it with 8 hours of work",
					"Bringing it back requires, per dragon knight level, 25 gp of gems and expending 1/2 HD",
					"It gains abilities as I gain Dragon Knight levels, see the 3rd page notes " + global_DragonKnight.str.and + " companion page"
				]),
				dependentChoices : "acid",
				creatureOptions : createDragonCompanion('black'),
				eval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(true, 'black');
				},
				removeeval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(false, 'black');
				}
			},
			"blue" : {
				name : "Blue Dragon Covenant",
				description : desc([
					"I share a bond with a blue dragon, who obeys my commands; I know Draconic",
					"We know the direction to each other " + global_DragonKnight.str.and + " can communicate with emotions at any distance",
					"If I die, it dies 1 hour per Dragon Knight level later; I can revive it with 8 hours of work",
					"Bringing it back requires, per dragon knight level, 25 gp of gems and expending 1/2 HD",
					"It gains abilities as I gain Dragon Knight levels, see the 3rd page notes " + global_DragonKnight.str.and + " companion page"
				]),
				dependentChoices : "lightning",
				creatureOptions : createDragonCompanion('blue'),
				eval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(true, 'blue');
				},
				removeeval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(false, 'blue');
				}
			},
			"brass" : {
				name : "Brass Dragon Covenant",
				description : desc([
					"I share a bond with a brass dragon, who obeys my commands; I know Draconic",
					"We know the direction to each other " + global_DragonKnight.str.and + " can communicate with emotions at any distance",
					"If I die, it dies 1 hour per Dragon Knight level later; I can revive it with 8 hours of work",
					"Bringing it back requires, per dragon knight level, 25 gp of gems and expending 1/2 HD",
					"It gains abilities as I gain Dragon Knight levels, see the 3rd page notes " + global_DragonKnight.str.and + " companion page"
				]),
				dependentChoices : "fire",
				creatureOptions : createDragonCompanion('brass'),
				eval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(true, 'brass');
				},
				removeeval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(false, 'brass');
				}
			},
			"bronze" : {
				name : "Bronze Dragon Covenant",
				description : desc([
					"I share a bond with a bronze dragon, who obeys my commands; I know Draconic",
					"We know the direction to each other " + global_DragonKnight.str.and + " can communicate with emotions at any distance",
					"If I die, it dies 1 hour per Dragon Knight level later; I can revive it with 8 hours of work",
					"Bringing it back requires, per dragon knight level, 25 gp of gems and expending 1/2 HD",
					"It gains abilities as I gain Dragon Knight levels, see the 3rd page notes " + global_DragonKnight.str.and + " companion page"
				]),
				dependentChoices : "lightning",
				creatureOptions : createDragonCompanion('bronze'),
				eval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(true, 'bronze');
				},
				removeeval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(false, 'bronze');
				}
			},
			"copper" : {
				name : "Copper Dragon Covenant",
				description : desc([
					"I share a bond with a copper dragon, who obeys my commands; I know Draconic",
					"We know the direction to each other " + global_DragonKnight.str.and + " can communicate with emotions at any distance",
					"If I die, it dies 1 hour per Dragon Knight level later; I can revive it with 8 hours of work",
					"Bringing it back requires, per dragon knight level, 25 gp of gems and expending 1/2 HD",
					"It gains abilities as I gain Dragon Knight levels, see the 3rd page notes " + global_DragonKnight.str.and + " companion page"
				]),
				dependentChoices : "acid",
				creatureOptions : createDragonCompanion('copper'),
				eval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(true, 'copper');
				},
				removeeval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(false, 'copper');
				}
			},
			"gold" : {
				name : "Gold Dragon Covenant",
				description : desc([
					"I share a bond with a gold dragon, who obeys my commands; I know Draconic",
					"We know the direction to each other " + global_DragonKnight.str.and + " can communicate with emotions at any distance",
					"If I die, it dies 1 hour per Dragon Knight level later; I can revive it with 8 hours of work",
					"Bringing it back requires, per dragon knight level, 25 gp of gems and expending 1/2 HD",
					"It gains abilities as I gain Dragon Knight levels, see the 3rd page notes " + global_DragonKnight.str.and + " companion page"
				]),
				dependentChoices : "fire",
				creatureOptions : createDragonCompanion('gold'),
				eval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(true, 'gold');
				},
				removeeval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(false, 'gold');
				}
			},
			"green" : {
				name : "Green Dragon Covenant",
				description : desc([
					"I share a bond with a green dragon, who obeys my commands; I know Draconic",
					"We know the direction to each other " + global_DragonKnight.str.and + " can communicate with emotions at any distance",
					"If I die, it dies 1 hour per Dragon Knight level later; I can revive it with 8 hours of work",
					"Bringing it back requires, per dragon knight level, 25 gp of gems and expending 1/2 HD",
					"It gains abilities as I gain Dragon Knight levels, see the 3rd page notes " + global_DragonKnight.str.and + " companion page"
				]),
				dependentChoices : "poison",
				creatureOptions : createDragonCompanion('green'),
				eval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(true, 'green');
				},
				removeeval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(false, 'green');
				}
			},
			"red" : {
				name : "Red Dragon Covenant",
				description : desc([
					"I share a bond with a red dragon, who obeys my commands; I know Draconic",
					"We know the direction to each other " + global_DragonKnight.str.and + " can communicate with emotions at any distance",
					"If I die, it dies 1 hour per Dragon Knight level later; I can revive it with 8 hours of work",
					"Bringing it back requires, per dragon knight level, 25 gp of gems and expending 1/2 HD",
					"It gains abilities as I gain Dragon Knight levels, see the 3rd page notes " + global_DragonKnight.str.and + " companion page"
				]),
				dependentChoices : "fire",
				creatureOptions : createDragonCompanion('red'),
				eval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(true, 'red');
				},
				removeeval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(false, 'red');
				}
			},
			"silver" : {
				name : "Silver Dragon Covenant",
				description : desc([
					"I share a bond with a silver dragon, who obeys my commands; I know Draconic",
					"We know the direction to each other " + global_DragonKnight.str.and + " can communicate with emotions at any distance",
					"If I die, it dies 1 hour per Dragon Knight level later; I can revive it with 8 hours of work",
					"Bringing it back requires, per dragon knight level, 25 gp of gems and expending 1/2 HD",
					"It gains abilities as I gain Dragon Knight levels, see the 3rd page notes " + global_DragonKnight.str.and + " companion page"
				]),
				dependentChoices : "cold",
				creatureOptions : createDragonCompanion('silver'),
				eval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(true, 'silver');
				},
				removeeval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(false, 'silver');
				}
			},
			"white" : {
				name : "White Dragon Covenant",
				description : desc([
					"I share a bond with a white dragon, who obeys my commands; I know Draconic",
					"We know the direction to each other " + global_DragonKnight.str.and + " can communicate with emotions at any distance",
					"If I die, it dies 1 hour per Dragon Knight level later; I can revive it with 8 hours of work",
					"Bringing it back requires, per dragon knight level, 25 gp of gems and expending 1/2 HD",
					"It gains abilities as I gain Dragon Knight levels, see the 3rd page notes " + global_DragonKnight.str.and + " companion page"
				]),
				dependentChoices : "cold",
				creatureOptions : createDragonCompanion('white'),
				eval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(true, 'white');
				},
				removeeval : function(lvl, chc) {
					global_DragonKnight.fn.addDragonCompanion(false, 'white');
				}
			},
			choiceDependencies : [{
				feature : "draconic nature: resistance",
				choiceAttribute : true
			}, {
				feature : "subclassfeature3_dragoncolor"
			}, {
				feature : "subclassfeature3_damagetype",
				choiceAttribute : true
			}, {
				feature : "subclassfeature10_damagetype",
				choiceAttribute : true
			}]
		},
		"fighting style" : {
			name : "Fighting Style",
			source : [["RJ:DK", 5]],
			minlevel : 2,
			description : desc('Choose a Fighting Style for the dragon knight using the "Choose Feature" button above'),
			choices : ["Archery", "Dueling", "Great Weapon Fighting", "Two-Weapon Fighting"],
			"archery" : FightingStyles.archery,
			"dueling" : FightingStyles.dueling,
			"great weapon fighting" : FightingStyles.great_weapon,
			"two-weapon fighting" : FightingStyles.two_weapon
		}, 
		"dragon's fury" : { // naar 3e pagina verplaatsen
			name : "Dragon's Fury",
			source : [["RJ:DK", 5]],
			minlevel : 2,
			description : " [Dragon's Str mod per short rest]" + desc([
				"My dragon companion can now take the Attack action",
				"It gains three new attacks, but is limited in how often they can be used"
			]),
			extraLimitedFeatures : [{
				name : "Dragon's Fury",
				usages : "dragon's Str mod per ",
				recovery : "short rest",
				usagescalc : "var dcPrefix = global_DragonKnight.fn.getDragonCompPrefix()[0]; event.value = Math.max(1, Number(What(dcPrefix + 'Comp.Use.Ability.Str.Mod')));",
				additional : 'Bite, Tail, or Wings'
			}]
		},
		"subclassfeature3" : {
			name : "Dragon Knight Practice",
			source : [["RJ:DK", 5]],
			minlevel : 3,
			description : desc('Choose a Dragon Knight Practice that defines you and put it in the "Class" field')
		},
		"eye for detail" : {
			name : "Eye for Detail",
			source : [["RJ:DK", 5]],
			minlevel : 3,
			description : desc([
				"If I study a gem/art for 1 min, I learn its exact value, gem type, and how old the art is",
				"I can cast Identify without requiring material components, but only as a ritual"
			]),
			spellcastingBonus : [{
				name : "Eye for Detail",
				spells : ["identify"],
				selection : ["identify"],
				firstCol : "(R)"
			}],
			spellChanges : {
				"identify" : {
					time : "11 min",
					components : "V,S",
					description : "1 magical item or magic-imbued crea/obj; learn properties, how to use, and spells affecting it",
					changes : "I can cast Identify, but only as a ritual. I don't require material components for it when cast this way."
				}
			},
			"draconic growth" : { // affects just companion, so banished to third page
				name : "Draconic Growth",
				source : [["RJ:DK", 6]],
				extraname : "Dragon Knight 5",
				description : levels.map(function (n) {
					return desc([
						"My dragon's flying speed increases by " + (n < 9 ? 15 : 30) + " ft and its other speed increase by " + (n < 9 ? 10 : 20) + " ft",
						"Also, my dragon no longer falls to the ground if it ends its turn in the air"
					]);
				})
			},
			"rending strikes" : { // affects just companion, so banished to third page
				name : "Rending Strikes",
				source : [["RJ:DK", 6]],
				extraname : "Dragon Knight 5",
				description : desc([
					"My dragon's claw, bite, and tail attacks now deal 2d6 damage and count as magical"
				])
			},
			"breath weapon" : { // affects just companion, so banished to third page
				name : "Breath Weapon",
				source : [["RJ:DK", 6]],
				extraname : "Dragon Knight 6",
				description : desc([
					"My dragon gains a breath weapon; See the companion (continued) page for its effects"
				]),
				usages : 1,
				recovery : "short rest",
				limfeaname : "Dragon Companion's Breath Weapon"
			},
			"draconic advancement" : { // affects just companion, so banished to third page
				name : "Draconic Advancement",
				source : [["RJ:DK", 6]],
				extraname : "Dragon Knight 9",
				description : desc([
					"My dragon matures: its size is now Large and can fly with a creature it has grappled",
					"Additionally, as long as my dragon can see me, it has advantage on all saving throws"
				])
			},
			autoSelectExtrachoices : [{
				extrachoice : "draconic growth",
				minlevel : 5
			}, {
				extrachoice : "rending strikes",
				minlevel : 5
			}, {
				extrachoice : "breath weapon",
				minlevel : 6
			}, {
				extrachoice : "draconic advancement",
				minlevel : 9
			}]
		},
		"coordinated assault" : {
			name : "Coordinated Assault",
			source : [["RJ:DK", 6]],
			minlevel : 11,
			description : desc([
				"If I miss a weapon attack on my turn, my dragon can make a claw attack as a reaction"
			])
		},
		"draconic nature" : {
			name : "Draconic Nature",
			source : [["RJ:DK", 6]],
			minlevel : 11,
			description : desc([
				'Choose a benefit using the "Choose Features" button above'
			]),
			choices : ["Scales (unarmored AC)", "Eyes (Perception and Investigation)", "Tail (shove as bonus action)"],
			"scales (unarmored ac)" : {
				name : "Draconic Nature: Scales",
				description : desc([
					"When I am not wearing armor, my AC is 10 + Dexterity mod + Charisma mod + shield",
				]),
				armorOptions : [{
					regExpSearch : /^(?=.*(dragon|draconic) nature)(?=.*(hide|skin|scales|resilience)).*$/i,
					name : "Draconic Nature: Scales",
					source : [["RJ:DK", 6]],
					ac : "10+Cha",
					affectsWildShape : true
				}],
				armorAdd : "Draconic Nature: Scales"
			},
			"eyes (perception and investigation)" : {
				name : "Draconic Nature: Eyes",
				description : desc([
					"I gain proficiency with Perception and Investigation, and adv. on their sight-based checks"
				]),
				vision: [
					["Adv. on Perception \u0026 Investigation checks based on sight", 0]
				]
			},
			"tail (shove as bonus action)" : {
				name : "Draconic Nature: Tail",
				description : desc([
					"As a bonus action when I use the Attack action on my turn, I can shove with my tail",
					"The target creature must be within 10 ft of me"
				]),
				action : [["bonus action", "Shove with tail (with Attack action)"]]
			}
		},
		"draconic nature: resistance" : {
			name : "Draconic Nature: Resistance",
			source : [["RJ:DK", 6]],
			minlevel : 11,
			description : desc([
				'Choose a dragon covenant color using the "Choose Features" button above'
			]),
			choices : ["Acid", "Cold", "Fire", "Lightning", "Poison", "Radiant", "Necrotic"],
			choicesNotInMenu : true,
			"acid" : {
				name : "Draconic Nature: Acid Resistance",
				description : " ", // needs to be something to overwrite the parent's description
				dmgres : ["Acid"]
			},
			"cold" : {
				name : "Draconic Nature: Cold Resistance",
				description : " ",
				dmgres : ["Cold"]
			},
			"fire" : {
				name : "Draconic Nature: Fire Resistance",
				description : " ",
				dmgres : ["Fire"]
			},
			"lightning" : {
				name : "Draconic Nature: Lightning Resistance",
				description : " ",
				dmgres : ["Lightning"]
			},
			"poison" : {
				name : "Draconic Nature: Poison Resistance",
				description : " ",
				dmgres : ["Poison"]
			},
			"radiant" : { // for platinum dragon
				name : "Draconic Nature: Radiant Resistance",
				description : " ",
				dmgres : ["Radiant"]
			},
			"necrotic" : { // for shadow dragon
				name : "Draconic Nature: Necrotic Resistance",
				description : " ",
				dmgres : ["Necrotic"]
			},
			"titanic roar" : { // affects just companion, so banished to third page
				name : "Titanic Roar",
				source : [["RJ:DK", 6]],
				extraname : "Dragon Knight 13",
				description : desc([
					"My dragon gains a frightening roar; See the companion (continued) page for its effects"
				]),
				usages : 1,
				recovery : "long rest",
				limfeaname : "Dragon Companion's Titanic Roar"
			},
			autoSelectExtrachoices : [{
				extrachoice : "titanic roar",
				minlevel : 13
			}]
		},
		"legacy of the dragon" : {
			name : "Legacy of the Dragon",
			source : [["RJ:DK", 6]],
			minlevel : 14,
			description : desc([
				"I now age only one year for every ten years that pass and I can't be magically aged"
			])
		},
		"ancient resistance" : {
			name : "Ancient Resistance",
			source : [["RJ:DK", 6]],
			minlevel : 17,
			description : desc([
				"When my dragon or I fail a save, I can choose to succeed instead"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"fulfilled covenant" : {
			name : "Fulfilled Covenant",
			source : [["RJ:DK", 6]],
			minlevel : 20,
			description : desc([
				"My dragon and I share hit points, pooling our total maximum HP together",
				"When either is damaged, it's subtracted from the pool; We both go unconscious at 0 HP",
				"I make death saves for us; Healing effects both; HD are combined to spend during rest"
			]),
			hp : function (totalHD, HDobj) {
				var prefix = global_DragonKnight.fn.getDragonCompPrefix()[0];
				if (classes.known['dragon knight'] && prefix) {
					return [classes.known['dragon knight'].level * (6 + Number(What(prefix + 'Comp.Use.Ability.Con.Mod'))), "Dragon Companion's hit points (Dragon Knight)"];
				}
			}
		}
	}
}

var dragonKnightRider = AddSubClass('dragon knight', 'rider', {
	regExpSearch : /^(?=.*dragon)(?=.*knight)(?=.*rider).*$/i,
	subname : "Rider Practice",
	source : [["RJ:DK", 7]],
	features : {
		"subclassfeature3" : {
			name : "Dragon's Claw",
			source : [["RJ:DK", 7]],
			minlevel : 3,
			description : desc([
				"If my dragon and I are both within 5 ft of a hostile, it gets disadv. on attacks vs. not us",
				"If I can make an opportunity attack because of movement, I can shove or grapple instead"
			]),
			action : [["reaction", "Shove/Grapple as Opportunity Attack"]],
			calcChanges : {
				creatureCallback : global_DragonKnight.creatureCallback
			}
		},
		"subclassfeature3.1" : {
			name : "Dragon's Eye",
			source : [["RJ:DK", 7]],
			minlevel : 3,
			description : desc([
				"My dragon and I add my Charisma modifier to initiative rolls",
				"If I can see my dragon, creatures it can see don't get adv. vs. me if hidden from me"
			]),
			addMod : [
				{ type : "skill", field : "Init", mod : "max(Cha|0)", text : "I can add my Charisma modifier to initiative rolls." }
			]
		},
		"subclassfeature7" : {
			name : "Dragon's Scale",
			source : [["RJ:DK", 7]],
			minlevel : 7,
			description : desc([
				"As an action, I can stabilize my dragon (no check) and it recovers 1 HP in 1d4 minutes",
				"If in 5 ft, my dragon can use an action to impose disadv. on attacks vs. me on 1 target"
			]),
			action : [["action", "Stabilize Dragon Companion"]]
		},
		"subclassfeature10" : {
			name : "Dragon's Wing",
			source : [["RJ:DK", 7]],
			minlevel : 10,
			description : desc([
				"(Dis)mounting my dragon costs me 5 ft movement; I get adv. on saves to avoid falling off",
				"Neither me nor my dragon take falling damage if we fall 20 ft or less"
			]),
			savetxt : { adv_vs : ["falling off my dragon"] }
		},
		"subclassfeature15" : {
			name : "Dragon's Fang",
			source : [["RJ:DK", 7]],
			minlevel : 15,
			description : desc([
				"My dragon gains a charge and rampage action; If it rampages while I'm within 5 ft,",
				"I can use my reaction to attack each creature attacked by it in melee, if within my reach"
			]),
			usages : 1,
			recovery : "short rest",
			additional : "rampage",
			action : [["reaction", " (join rampage)"]]
		},
		"subclassfeature18" : {
			name : "Dragon's Presence",
			source : [["RJ:DK", 7]],
			minlevel : 18,
			description : desc([
				"Creatures frightened of my dragon have speed 0; Its titanic roar's range is now 120 ft",
				"Me and my dragon's weapon attack hits against targets frightened of it are critical hits"
			])
		}
	}
});
CompanionList["dragon_rider_practice_companion"] = {
	dragonKnightSubclass : dragonKnightRider,
	dragonKnightContinued : false,
	name : "Rider Practice Dragon Companion",
	nameTooltip : "Dragon Knight: Rider Practice Companion",
	nameOrigin : "Rider Practice",
	nameMenu : "DON'T CLICK THIS! Rider Practice Dragon Companion (will be applied automatically)",
	source : [["RJ:DK", 7]],
	attributesAdd : {
		notes : [{
			name : "Dragon's Eye (Rider Practice 3, RJ:DK 7)",
			minlevel : 3,
			description : desc("My dragon adds my Charisma modifier to its initiative rolls"),
			joinString : ""
		}, {
			name : "Dragon's Fang: Charge (Rider Practice 15, RJ:DK 7)",
			minlevel : 15,
			description : desc([
				"If my dragon moves at least 20 ft straight towards a creature, its melee attacks hit harder",
				"If it then hits it with a melee weapon attack in the same turn, the target takes +2d6 damage"
			]),
			joinString : ""
		}, {
			name : "Dragon's Fang: Rampage (Rider Practice 15, RJ:DK 7)",
			minlevel : 15,
			description : desc([
				"Once per short rest my dragon can use an action to rampage, attacking many with its claws",
				"It makes a separate claw attack against any number of creatures within 5 ft of it",
				"If I'm within 5 ft of my dragon when it rampages, I can use my reaction to attack as well",
				"I make a melee weapon attack against all creatures within my reach that my dragon attacked"
			]),
			joinString : ""
		}],
		traits : [{
			name : "Dragon's Claw (Rider Practice 3)",
			minlevel : 3,
			description : "When the dragon and its bond are both within 5 ft of a creature, it suffers disadv" + (typePF ? "." : "antage") + " on attacks that target neither the dragon or its bond.",
			addMod : [ // from Dragon's Eye, but needs to be applied to the first page, while the string might go to the continued page (on typePF)
				{ type : "skill", field : "Init", mod : "max(oCha|0)", text : "The dragon adds its bond's Charisma modifier to initiative rolls." }
			]
		}],
		features : [{
			name : "Dragon's Fang (Rider Practice 15)",
			minlevel : 15,
			description : typePF ? "See notes of the dragon continued." : "See notes below."
		}, {
			name : "Dragon's Presence (Rider Practice 18)",
			minlevel : 18,
			description : "Creatures frightened of the dragon have speed 0 and the dragon's weapon hits against them are critical hits."
		}],
		actions : [{
			name : "Dragon's Scale (Rider Practice 7)",
			minlevel : 7,
			description : "As an action while within 5 ft of its bond, the dragon can protect " + (typePF ? "them" : "its bond") + " from one creature it can see. The creature's attacks are made with disadv" + (typePF ? ". vs." : "antage against") + " its bond until the dragon's next turn starts."
		}]
	}
};
if (typePF) {
	// The printer friendly sheets have less space on a companion page for text, so we are going to have to add some of the game mechanics to the 'continued' page instead
	CompanionList["dragon_rider_practice_continued"] = {
		dragonKnightSubclass : dragonKnightRider,
		dragonKnightContinued : true,
		name : "Rider Practice Dragon Continued",
		nameTooltip : "Dragon Knight: Rider Practice Continued",
		nameOrigin : "Rider Practice",
		nameMenu : "DON'T CLICK THIS! Rider Practice Dragon Continued (will be applied automatically)",
		source : [["RJ:DK", 7]],
		attributesAdd : {
			notes : CompanionList["dragon_rider_practice_companion"].attributesAdd.notes
		}
	};
	CompanionList["dragon_rider_practice_companion"].attributesAdd.notes = false;
}

var dragonKnightElemental = AddSubClass('dragon knight', 'elemental', {
	regExpSearch : /^(?=.*dragon)(?=.*knight)(?=.*elemental).*$/i,
	subname : "Elemental Practice",
	source : [["RJ:DK", 8]],
	fullname : "Elemental Dragon Knight",
	abilitySave : 6,
	spellcastingFactor : 3,
	spellcastingList : {
		"class" : "sorcerer",
		school : ["Ench", "Evoc"],
		level : [0, 4]
	},
	spellcastingKnown : {
		cantrips : [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		spells : [0, 0, 2, 3, 3, 3, 4, 5, 5, 6, 6, 7, 8, 9, 9, 10, 10, 10, 11, 12]
	},
	features : {
		"subclassfeature3" : {
			name : "Spellcasting",
			source : [["RJ:DK", 8]],
			minlevel : 3,
			description : desc("I can cast known sorcerer cantrips/spells, using Charisma as my spellcasting ability"),
			additional : levels.map(function (n, idx) {
				var cantr = [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3][idx];
				var splls = [0, 0, 2, 3, 3, 3, 4, 5, 5, 6, 6, 7, 8, 9, 9, 10, 10, 10, 11, 12][idx];
				return cantr + " cantrips \u0026 " + splls + " spells known";
			})
		},
		"subclassfeature3_damagetype" : {
			name : "Elemental Weaponry",
			source : [["RJ:DK", 8]],
			minlevel : 3,
			description : desc([
				"When I use a spell slot to cast a spell, I can imbue my weapon until my next turn ends",
				"While imbued, hits with it deal +1d6 associated damage per spell slot level (max +5d6)",
				'Choose a dragon covenant color using the "Choose Features" button above'
			]),
			choices : ["Acid", "Cold", "Fire", "Lightning", "Poison"],
			choicesNotInMenu : true,
			"acid" : {
				name : "Acid Elemental Weaponry",
				description : desc([
					"When I use a spell slot to cast a spell, I can imbue my weapon until my next turn ends",
					"While imbued, hits with it deal +1d6 acid damage per spell slot level (max +5d6)"
				])
			},
			"cold" : {
				name : "Cold Elemental Weaponry",
				description : desc([
					"When I use a spell slot to cast a spell, I can imbue my weapon until my next turn ends",
					"While imbued, hits with it deal +1d6 cold damage per spell slot level (max +5d6)"
				])
			},
			"fire" : {
				name : "Fire Elemental Weaponry",
				description : desc([
					"When I use a spell slot to cast a spell, I can imbue my weapon until my next turn ends",
					"While imbued, hits with it deal +1d6 fire damage per spell slot level (max +5d6)"
				])
			},
			"lightning" : {
				name : "Lightning Elemental Weaponry",
				description : desc([
					"When I use a spell slot to cast a spell, I can imbue my weapon until my next turn ends",
					"While imbued, hits with it deal +1d6 lightning damage per spell slot level (max +5d6)"
				])
			},
			"poison" : {
				name : "Poison Elemental Weaponry",
				description : desc([
					"When I use a spell slot to cast a spell, I can imbue my weapon until my next turn ends",
					"While imbued, hits with it deal +1d6 poison damage per spell slot level (max +5d6)"
				])
			}
		},
		"subclassfeature7" : { // also added to dragon companion
			name : "Dragon Rush",
			source : [["RJ:DK", 8]],
			minlevel : 7,
			description : desc([
				"When I cast a spell as an action, my dragon can use its reaction if it can see me",
				"It can then move up to half its speed without provoking attacks of opportunity"
			])
		},
		"subclassfeature10_damagetype" : {
			name : "Elemental Fury",
			source : [["RJ:DK", 8]],
			minlevel : 10,
			description : desc([
				"When I roll a 1 or 2 on associated damage die, I can reroll it but must use the new roll",
				'Choose a dragon covenant color using the "Choose Features" button above'
			]),
			choices : ["Acid", "Cold", "Fire", "Lightning", "Poison"],
			choicesNotInMenu : true,
			"acid" : {
				name : "Acid Elemental Fury",
				description : desc([
					"When I roll a 1 or 2 on an acid damage die, I can reroll it but must use the new roll"
				])
			},
			"cold" : {
				name : "Cold Elemental Fury",
				description : desc([
					"When I roll a 1 or 2 on a cold damage die, I can reroll it but must use the new roll"
				])
			},
			"fire" : {
				name : "Fire Elemental Fury",
				description : desc([
					"When I roll a 1 or 2 on a fire damage die, I can reroll it but must use the new roll"
				])
			},
			"lightning" : {
				name : "Lightning Elemental Fury",
				description : desc([
					"When I roll a 1 or 2 on a lightning damage die, I can reroll it but must use the new roll"
				])
			},
			"poison" : {
				name : "Poison Elemental Fury",
				description : desc([
					"When I roll a 1 or 2 on a poison damage die, I can reroll it but must use the new roll"
				])
			}
		},
		"subclassfeature15" : {
			name : "Destructive Reach",
			source : [["RJ:DK", 8]],
			minlevel : 15,
			description : desc([
				"When I hit with an elemental weaponry imbued weapon, I can damage more creatures",
				"Up to 2 creatures within 10 ft of the target take half the additional damage"
			])
		},
		"subclassfeature3_dragoncolor" : { // weird name, but needed for `choiceDependencies` of "dragon covenant" feature
			// also added to dragon continued
			name : "Annihilating Breath",
			source : [["RJ:DK", 8]],
			minlevel : 18,
			description : desc([
				"When my dragon uses its breath weapon, I can empower its damage " + global_DragonKnight.str.and + " double its area",
				"It then deals maximum damage and ignores damage resistance",
				'Choose a dragon covenant color using the "Choose Features" button above'
			]),
			usages : 1,
			recovery : "long rest",
			choices : ["Black", "Blue", "Brass", "Bronze", "Copper", "Gold", "Green", "Red", "Silver", "White"],
			choicesNotInMenu : true,
			"black" : {
				name : "Annihilating Breath",
				description : desc([
					"When my dragon uses its breath weapon, I can empower its damage " + global_DragonKnight.str.and + " double its area",
					"It effects a 20 ft by 240 ft line, deals maximum damage and ignores damage resistance"
				])
			},
			"blue" : {
				name : "Annihilating Breath",
				description : desc([
					"When my dragon uses its breath weapon, I can empower its damage " + global_DragonKnight.str.and + " double its area",
					"It effects a 20 ft by 240 ft line, deals maximum damage and ignores damage resistance"
				])
			},
			"brass" : {
				name : "Annihilating Breath",
				description : desc([
					"When my dragon uses its breath weapon, I can empower its damage " + global_DragonKnight.str.and + " double its area",
					"It effects a 20 ft by 240 ft line, deals maximum damage and ignores damage resistance"
				])
			},
			"bronze" : {
				name : "Annihilating Breath",
				description : desc([
					"When my dragon uses its breath weapon, I can empower its damage " + global_DragonKnight.str.and + " double its area",
					"It effects a 20 ft by 240 ft line, deals maximum damage and ignores damage resistance"
				])
			},
			"copper" : {
				name : "Annihilating Breath",
				description : desc([
					"When my dragon uses its breath weapon, I can empower its damage " + global_DragonKnight.str.and + " double its area",
					"It effects a 20 ft by 240 ft line, deals maximum damage and ignores damage resistance"
				])
			},
			"gold" : {
				name : "Annihilating Breath",
				description : desc([
					"When my dragon uses its breath weapon, I can empower its damage " + global_DragonKnight.str.and + " double its area",
					"It then effects a 120-ft cone, deals maximum damage and ignores damage resistance"
				])
			},
			"green" : {
				name : "Annihilating Breath",
				description : desc([
					"When my dragon uses its breath weapon, I can empower its damage " + global_DragonKnight.str.and + " double its area",
					"It then effects a 120-ft cone, deals maximum damage and ignores damage resistance"
				])
			},
			"red" : {
				name : "Annihilating Breath",
				description : desc([
					"When my dragon uses its breath weapon, I can empower its damage " + global_DragonKnight.str.and + " double its area",
					"It then effects a 120-ft cone, deals maximum damage and ignores damage resistance"
				])
			},
			"silver" : {
				name : "Annihilating Breath",
				description : desc([
					"When my dragon uses its breath weapon, I can empower its damage " + global_DragonKnight.str.and + " double its area",
					"It then effects a 120-ft cone, deals maximum damage and ignores damage resistance"
				])
			},
			"white" : {
				name : "Annihilating Breath",
				description : desc([
					"When my dragon uses its breath weapon, I can empower its damage " + global_DragonKnight.str.and + " double its area",
					"It then effects a 120-ft cone, deals maximum damage and ignores damage resistance"
				])
			}
		}
	}
});
CompanionList["dragon_elemental_practice_cono"] = {
	dragonKnightSubclass : dragonKnightElemental,
	dragonKnightContinued : false,
	name : "Elemental Practice Dragon Companion",
	nameTooltip : "Dragon Knight: Elemental Practice Companion",
	nameOrigin : "Elemental Practice",
	nameMenu : "DON'T CLICK THIS! Elemental Practice Dragon Companion (will be applied automatically)",
	source : [["RJ:DK", 8]],
	attributesAdd : {
		notes : [{
			name : "Dragon Rush (Elemental Practice 7)",
			minlevel : 7,
			description : "As a reaction when the dragon sees its bond cast a spell, the dragon can move up to half its speed without provoking attacks of opportunity."
		}]
	}
};
CompanionList["dragon_elemental_practice_continued"] = {
	dragonKnightSubclass : dragonKnightElemental,
	dragonKnightContinued : true,
	name : "Elemental Practice Dragon Continued",
	nameTooltip : "Dragon Knight: Elemental Practice Continued",
	nameOrigin : "Elemental Practice",
	nameMenu : "DON'T CLICK THIS! Elemental Practice Dragon Continued (will be applied automatically)",
	source : [["RJ:DK", 8]],
	attributesAdd : {
		notes : [{
			name : "Annihilating Breath (Elemental Practice 18)",
			minlevel : 18,
			description : "When the the dragon uses its breath weapon, its bond can empower it, but only once per long rest of its bond. When empowered, the area of the breath weapon is doubled (i.e. a 120-ft cone or a 20-ft \xD7 240-ft line), it deals maximum damage (no need to roll) and ignores damage resistance."
		}]
	}
};

AddSubClass('dragon knight', 'platinum', {
	regExpSearch : /^(?=.*dragon)(?=.*knight)(?=.*platinum).*$/i,
	subname : "Platinum Practice",
	source : [["RJ:DK", 9]],
	fullname : "Platinum Dragon Knight",
	features : {
		"subclassfeature3_dragoncolor" : { // if going back from level 3 to 2, the old dragon companion color won't be added back, that will have to be done manually
			name : "Draconic Radiance",
			source : [["RJ:DK", 9]],
			minlevel : 3,
			description : desc([
				"My dragon companion becomes a platinum dragon associated with radiant damage",
				'Choose a dragon covenant color using the "Choose Features" button above'
			]),
			choices : ["Black", "Blue", "Brass", "Bronze", "Copper", "Gold", "Green", "Red", "Silver", "White"],
			choicesNotInMenu : true,
			"black" : {
				name : "Draconic Radiance",
				description : desc("My black dragon companion is now a platinum dragon associated with radiant damage"),
				creaturesAdd : [["Platinum Dragon Companion"]],
				creatureOptions : createDragonCompanion('platinum', 'black'),
				dependentChoices : "radiant"
			},
			"blue" : {
				name : "Draconic Radiance",
				description : desc("My blue dragon companion is now a platinum dragon associated with radiant damage"),
				creaturesAdd : [["Platinum Dragon Companion"]],
				creatureOptions : createDragonCompanion('platinum', 'blue'),
				dependentChoices : "radiant"
			},
			"brass" : {
				name : "Draconic Radiance",
				description : desc("My brass dragon companion is now a platinum dragon associated with radiant damage"),
				creaturesAdd : [["Platinum Dragon Companion"]],
				creatureOptions : createDragonCompanion('platinum', 'brass'),
				dependentChoices : "radiant"
			},
			"bronze" : {
				name : "Draconic Radiance",
				description : desc("My bronze dragon companion is now a platinum dragon associated with radiant damage"),
				creaturesAdd : [["Platinum Dragon Companion"]],
				creatureOptions : createDragonCompanion('platinum', 'bronze'),
				dependentChoices : "radiant"
			},
			"copper" : {
				name : "Draconic Radiance",
				description : desc("My copper dragon companion is now a platinum dragon associated with radiant damage"),
				creaturesAdd : [["Platinum Dragon Companion"]],
				creatureOptions : createDragonCompanion('platinum', 'copper'),
				dependentChoices : "radiant"
			},
			"gold" : {
				name : "Draconic Radiance",
				description : desc("My gold dragon companion is now a platinum dragon associated with radiant damage"),
				creaturesAdd : [["Platinum Dragon Companion"]],
				creatureOptions : createDragonCompanion('platinum', 'gold'),
				dependentChoices : "radiant"
			},
			"green" : {
				name : "Draconic Radiance",
				description : desc("My green dragon companion is now a platinum dragon associated with radiant damage"),
				creaturesAdd : [["Platinum Dragon Companion"]],
				creatureOptions : createDragonCompanion('platinum', 'green'),
				dependentChoices : "radiant"
			},
			"red" : {
				name : "Draconic Radiance",
				description : desc("My red dragon companion is now a platinum dragon associated with radiant damage"),
				creaturesAdd : [["Platinum Dragon Companion"]],
				creatureOptions : createDragonCompanion('platinum', 'red'),
				dependentChoices : "radiant"
			},
			"silver" : {
				name : "Draconic Radiance",
				description : desc("My silver dragon companion is now a platinum dragon associated with radiant damage"),
				creaturesAdd : [["Platinum Dragon Companion"]],
				creatureOptions : createDragonCompanion('platinum', 'silver'),
				dependentChoices : "radiant"
			},
			"white" : {
				name : "Draconic Radiance",
				description : desc("My white dragon companion is now a platinum dragon associated with radiant damage"),
				creaturesAdd : [["Platinum Dragon Companion"]],
				creatureOptions : createDragonCompanion('platinum', 'white'),
				dependentChoices : "radiant"
			},
			eval : function(lvl, chc) {
				// Remove the current dragon companion colour (bIgnoreSubclass = true) before processing the choice that adds the Platinum Dragon Companion
				global_DragonKnight.fn.addDragonCompanion(false, '', false, true);
			},
			removeeval : function(lvl, chc) {
				if (lvl[1] === 0) return; // no reason to do anything as the whole class is being removed
				// Add the original colour again (bIgnoreSubclass = true), but only after the Platinum Dragon Companion was removed, thus use a timeout (might not work)
				global_DragonKnight_timeout = app.setTimeout("global_DragonKnight.fn.addDragonCompanion(true, '', false, true);", 450);
			},
			choiceDependencies : [{ // overwrite the setting from 'dragon covenant'
				feature : "draconic nature: resistance",
				choiceAttribute : true
			}]
		},
		"subclassfeature3.1" : {
			name : "Platinum Protector",
			source : [["RJ:DK", 9]],
			minlevel : 3,
			description : desc([
				"As a reaction when one within my Holy Light's bright light is damaged, I can reduce that"
			]),
			action : [["bonus action", " (start)"], ["reaction", " (reduce damage)"]],
			usages : 1,
			recovery : "short rest",
			additional : levels.map(function (n) {
				return n < 3 ? "" : "reduce 1d6+" + Math.floor(n/2)
			})
		},
		"subclassfeature3" : { // used the name "Holy Light" to describe the light feature from Platinum Protector, as it makes more sense then as a level 7 feature that only increases the light, while the Platinum Protector has two disjoined benefits
			name : "Holy Light",
			source : [["RJ:DK", 9]],
			minlevel : 3,
			description : levels.map(function (n) {
				var radius = n < 7 ? 10 : n < 15 ? 20 : 30;
				var arr = [
					"As a bonus action, I can glow for 1 min: " + radius + " ft bright light + dim light for another " + radius + " ft"
				];
				if (n < 7) {
					arr[1] = "This radius increases to 20 ft at 7th-level and 30 ft at 15th-level";
				} else if (n < 7) {
					arr[1] = "This radius increases to 30 ft at 15th-level";
				}
				return desc(arr);
			}),
			action : [["bonus action", ""]]
		},
		"subclassfeature10" : {
			name : "Radiant Bastion",
			source : [["RJ:DK", 9]],
			minlevel : 10,
			description : desc([
				"My dragon and I gain adv. on saves and checks against being moved against our will",
				"We also gain adv. on saves and checks vs. being knocked prone, grappled, or restrained"
			]),
			savetxt : {
				adv_vs : ["moved vs. my will", "knocked prone", "grappled", "restrained"]
			}
		},
		"subclassfeature15" : {
			name : "Divine Covenant",
			source : [["RJ:DK", 9]],
			minlevel : 15,
			description : desc([
				"When I use Platinum Protector to reduce damage taken to 0, I can grant temporary HP",
				"The temporary hit points equal 1d6 + my Charisma modifier and last for 1 minute"
			])
		},
		"subclassfeature18" : {
			name : "Platinum Ward",
			source : [["RJ:DK", 9]],
			minlevel : 18,
			description : desc([
				"My dragon " + global_DragonKnight.str.and + " I gain resistance to nonmagical bludgeoning, piercing, and slashing damage",
				"My dragon " + global_DragonKnight.str.and + " I take no damage if it is my dragon knight level or less before resistances"
			]),
			dmgres : [["Bludgeoning", "Bludg. (nonmagical)"], ["Piercing", "Pierc. (nonmagical)"], ["Slashing", "Slash. (nonmagical)"]],
			additional : levels.map(function (n) {
				return "No damage if " + n + " or less";
			})
		}
	}
});

AddSubClass('dragon knight', 'shadow', {
	regExpSearch : /^(?=.*dragon)(?=.*knight)(?=.*shadow).*$/i,
	subname : "Shadow Practice",
	source : [["RJ:DK", 10]],
	fullname : "Shadow Dragon Knight",
	abilitySave : 6,
	features : {
		"subclassfeature3_dragoncolor" : { // if going back from level 3 to 2, the old dragon companion color won't be added back, that will have to be done manually
			name : "Draconic Darkness",
			source : [["RJ:DK", 10]],
			minlevel : 3,
			description : desc([
				"My dragon companion becomes a shadow dragon associated with necrotic damage",
				'Choose a dragon covenant color using the "Choose Features" button above'
			]),
			choices : ["Black", "Blue", "Brass", "Bronze", "Copper", "Gold", "Green", "Red", "Silver", "White"],
			choicesNotInMenu : true,
			"black" : {
				name : "Draconic Darkness",
				description : desc("My black dragon companion is now a shadow dragon associated with necrotic damage"),
				creaturesAdd : [["Shadow Dragon Companion"]],
				creatureOptions : createDragonCompanion('shadow', 'black'),
				dependentChoices : "necrotic"
			},
			"blue" : {
				name : "Draconic Darkness",
				description : desc("My blue dragon companion is now a shadow dragon associated with necrotic damage"),
				creaturesAdd : [["Shadow Dragon Companion"]],
				creatureOptions : createDragonCompanion('shadow', 'blue'),
				dependentChoices : "necrotic"
			},
			"brass" : {
				name : "Draconic Darkness",
				description : desc("My brass dragon companion is now a shadow dragon associated with necrotic damage"),
				creaturesAdd : [["Shadow Dragon Companion"]],
				creatureOptions : createDragonCompanion('shadow', 'brass'),
				dependentChoices : "necrotic"
			},
			"bronze" : {
				name : "Draconic Darkness",
				description : desc("My bronze dragon companion is now a shadow dragon associated with necrotic damage"),
				creaturesAdd : [["Shadow Dragon Companion"]],
				creatureOptions : createDragonCompanion('shadow', 'bronze'),
				dependentChoices : "necrotic"
			},
			"copper" : {
				name : "Draconic Darkness",
				description : desc("My copper dragon companion is now a shadow dragon associated with necrotic damage"),
				creaturesAdd : [["Shadow Dragon Companion"]],
				creatureOptions : createDragonCompanion('shadow', 'copper'),
				dependentChoices : "necrotic"
			},
			"gold" : {
				name : "Draconic Darkness",
				description : desc("My gold dragon companion is now a shadow dragon associated with necrotic damage"),
				creaturesAdd : [["Shadow Dragon Companion"]],
				creatureOptions : createDragonCompanion('shadow', 'gold'),
				dependentChoices : "necrotic"
			},
			"green" : {
				name : "Draconic Darkness",
				description : desc("My green dragon companion is now a shadow dragon associated with necrotic damage"),
				creaturesAdd : [["Shadow Dragon Companion"]],
				creatureOptions : createDragonCompanion('shadow', 'green'),
				dependentChoices : "necrotic"
			},
			"red" : {
				name : "Draconic Darkness",
				description : desc("My red dragon companion is now a shadow dragon associated with necrotic damage"),
				creaturesAdd : [["Shadow Dragon Companion"]],
				creatureOptions : createDragonCompanion('shadow', 'red'),
				dependentChoices : "necrotic"
			},
			"silver" : {
				name : "Draconic Darkness",
				description : desc("My silver dragon companion is now a shadow dragon associated with necrotic damage"),
				creaturesAdd : [["Shadow Dragon Companion"]],
				creatureOptions : createDragonCompanion('shadow', 'silver'),
				dependentChoices : "necrotic"
			},
			"white" : {
				name : "Draconic Darkness",
				description : desc("My white dragon companion is now a shadow dragon associated with necrotic damage"),
				creaturesAdd : [["Shadow Dragon Companion"]],
				creatureOptions : createDragonCompanion('shadow', 'white'),
				dependentChoices : "necrotic"
			},
			eval : function(lvl, chc) {
				// Remove the current dragon companion colour (bIgnoreSubclass = true) before processing the choice that adds the Shadow Dragon Companion
				global_DragonKnight.fn.addDragonCompanion(false, '', true, true);
				global_DragonKnight.fn.addDragonCompanion(false, '', false, true);
			},
			removeeval : function(lvl, chc) {
				if (lvl[1] === 0) return; // no reason to do anything as the whole class is being removed
				// Add the original colour again (bIgnoreSubclass = true), but only after the Shadow Dragon Companion was removed, thus use a timeout (might not work)
				global_DragonKnight_timeout = app.setTimeout("global_DragonKnight.fn.addDragonCompanion(true, '', false, true);", 450);
			},
			choiceDependencies : [{ // overwrite the setting from 'dragon covenant'
				feature : "draconic nature: resistance",
				choiceAttribute : true
			}]
		},
		"subclassfeature3.1" : {
			name : "Creeping Shadows",
			source : [["RJ:DK", 10]],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can create a sphere within 30 ft; radius is 10 ft per expended use",
				"Within the sphere everything is lightly obscured and bright light becomes dim light",
				"While inside, my dragon and I can teleport to a space within each turn (costs 5-ft move)",
				"The sphere lasts for 1 min, until I move over 120 ft away from it, or I create another"
			]),
			action : [["bonus action", ""]],
			usages : "Charisma modifier per ",
			usagescalc : "event.value = What('Cha Mod');",
			recovery : "long rest",
			"withering breath" : { // affects just companion, so banished to third page
				name : "Withering Breath",
				source : [["RJ:DK", 10]],
				minlevel : 7,
				description : desc([
					"When a creature fails its save vs. my dragon's breath weapon, it withers for 1 minute",
					"This makes it deduct my Charisma mod from its Strength-based weapon damage rolls",
					"The target can make a Con save at the end of each of its turns to end this effect on itself"
				])
			},
			autoSelectExtrachoices : [{
				extrachoice : "withering breath",
				minlevel : 7
			}]
		},
		"subclassfeature10" : {
			name : "Night Walker",
			source : [["RJ:DK", 10]],
			minlevel : 10,
			description : desc([
				"As a bonus action while in dim light or darkness, my dragon " + global_DragonKnight.str.and + " I can " + (typePF ? "take" : "do") + " the Hide action",
				"Also, my dragon and I have adv. on Dex (Stealth) checks to hide in dim light or darkness"
			]),
			action : [["bonus action", "Hide (in dim light or darkness)"]]
		},
		"subclassfeature15" : {
			name : "Shifting Shadows",
			source : [["RJ:DK", 10]],
			minlevel : 15,
			description : desc([
				"I can now have up to two Creeping Shadow spheres active at the same time",
				"When I roll initiative and have no use of Creeping Shadows remaining, I gain one use"
			])
		},
		"subclassfeature18" : {
			name : "Umbra Pulse",
			source : [["RJ:DK", 10]],
			minlevel : 18,
			description : desc([
				"As an action, my dragon can create a vortex of swirling darkness around itself",
				"Chosen within 30 ft take 10d10 necrotic damage and pulled/pushed 15 ft to/from me",
				"They can make a Con save DC 8 + Prof B + Cha mod to halve damage and not be moved"
			]),
			usages : 1,
			recovery : "long rest"
		}
	}
});
