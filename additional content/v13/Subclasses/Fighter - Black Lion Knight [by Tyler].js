/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Subclass
	Effect:     This script adds a subclass for the fighter, called "Black Lion Knight"
				This is a homebrewed class bringing the 4e homebrew class from D&D wiki to the 5th edition of D&D
	Code by:	MorePurpleMoreBetter
	Date:		2018-09-15 (sheet v13.0.0beta19)

	Caution:	MorePurpleMoreBetter advises against using this subclass as it breaks game balance (it is clearly overpowered). This code was made on commission for a patron.
*/

var iFileName = "Fighter - Black Lion Knight [by Tyler].js";
RequiredSheetVersion(13);

AddSubClass("fighter", "black lion knight", {
	regExpSearch : /^(?=.*black)(?=.*lion)(?=.*knight).*$/i,
	subname : "Black Lion Knight",
	source : ["HB", 0],
	fullname : "Black Lion Knight",
	features : {
		"subclassfeature3" : {
			name : "Lion's Blade",
			source : ["HB", 0],
			minlevel : 3,
			description : desc([
				"I gain a bonus on my weapon attack rolls and hit points, based on my total fighter level",
				"I add +1d6 damage to my weapon attacks if an ally is within 5 ft of the target"
			]),
			additional : levels.map(function (n) {
				if (n < 3) return "";
				var HPbonus = n * 2 + (n < 8 ? 0 : n < 20 ? 2 : 4);
				var AtkBonus = n < 8 ? 1 : n < 20 ? 2 : 3;
				return "+" + HPbonus + " HP, +" + AtkBonus + " weapon attack rolls";
			}),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (!v.isSpell && !v.isDC) {
							fields.Description += (fields.Description ? '; ' : '') + '+1d6 damage if ally is within 5 ft of target';
						};
					},
					"I gain a +1 bonus on all my weapon attack rolls. This increases with +1 at 8th level and 20th level.\n \u2022 I add +1d6 to the damage of my weapon attacks when one of my allis is within 5 ft of the target that I'm attacking."
				],
				atkCalc : [
					function (fields, v, output) {
						if (!v.isSpell && !v.isDC && classes.known.fighter && classes.known.fighter.level) output.extraHit += classes.known.fighter.level < 8 ? 1 : classes.known.fighter.level < 20 ? 2 : 3;
					}
				],
				hp : function (totalHD) {
					if (classes.known.fighter) {
						var n = classes.known.fighter.level;
						var HPbonus = n * 2 + (n < 8 ? 0 : n < 20 ? 2 : 4);
						return [HPbonus, "Lion's Blade (2 \u00D7 fighter level +2 HP at level 8 \u0026 20)"];
					}
				}
			}
		},
		"subclassfeature3.1" : {
			name : "Lion's Cunning",
			source : ["HB", 0],
			minlevel : 3,
			description : desc([
				"I add my Wis mod to the damage of weapon attacks and gain proficiency in Persuasion",
				"When I miss a weapon attack roll, I can still deal my Wisdom modifier in damage"
			]),
			skills : ["Persuasion"],
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (!v.isSpell && !v.isDC) output.extraDmg += What("Wis Mod");
					},
					"I add my Wisdom modifier to the damage of my weapon attacks."
				]
			}
		},
		"subclassfeature7" : {
			name : "Lion's Agility",
			source : ["HB", 0],
			minlevel : 7,
			description : desc([
				"I gain a +2 bonus to AC and saves against opportunity attacks",
				"I can take the Help action as a bonus action"
			]),
			action : ["bonus action", "Help (Lion's Agility)"],
			savetxt : { text : ["+2 AC/saves vs. opportunity attacks"] }
		},
		"subclassfeature10" : {
			name : "Lion's Versatility",
			source : ["HB", 0],
			minlevel : 10,
			description : "\n   I deal extra damage with my weapon attacks",
			additional : levels.map(function (n) {
				return n < 10 ? "" : "+" + (n < 17 ? 1 : n < 20 ? 2 : 3) + "d8 weapon damage";
			}),
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (!v.isSpell && !v.isDC && classes.known.fighter) {
							var n = classes.known.fighter.level;
							var DmgBonus = n < 17 ? 1 : n < 20 ? 2 : 3;
							if ((/\d+d8\b/i).test(output.die)) {
								var aMatch = output.die.match(/(\d+)d8\b/i);
								output.die = output.die.replace(aMatch[0], Number(aMatch[1]) + DmgBonus + "d8");
							} else {
								output.die += "+" + DmgBonus + "d8";
							}
						}
					},
					"I deal +1d8 damage with my weapon attacks. This increases with +1d8 at 17th level and 20th level."
				]
			}
		},
		"subclassfeature15" : {
			name : "Lion's Action",
			source : ["HB", 0],
			minlevel : 15,
			description : "\n   When I use action surge to take an extra action, I can also do another move",
		},
		"subclassfeature18" : {
			name : "Lion's Heart",
			source : ["HB", 0],
			minlevel : 18,
			description : "\n  Whenever I hit a creature twice in the same round, I gain my Wis mod in temporary HP"
		}
	}
});
