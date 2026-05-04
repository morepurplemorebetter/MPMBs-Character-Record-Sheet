/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Monk, called "Swordsage"
				This is a homebrewed class inspired from the swordsage from Tome of Battle
	Code by:	Wizzard
	Date:		2017-11-29 (sheet v12.999)
*/

var iFileName = "Monk - Swordsage [by Wizzard].js";
RequiredSheetVersion(12.999);

AddSubClass("monk", "swordsage", {
	regExpSearch : /swordsage/i,
	subname : "Swordsage",
	source : ["HB", 0],
	fullname : "Swordsage",
	abilitySave : 1,
	features : {
		"subclassfeature3" : {
			name : "Combat Superiority",
			source : ["P", 73],
			minlevel : 3,
			description: desc("I gain a number of superiority dice that I can use to fuel special Maneuvers"),
			additional : ["", "", "d6", "d6", "d6", "d6", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10"],
			usages : [0, 0, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5],
			recovery : "short rest"
		},
		"subclassfeature3.1" : {
			name : "Maneuvers",
			source : ["P", 73],
			minlevel : 3,
			description : desc([
				'Use the "Choose Feature" button above to add a Maneuver to the third page',
				"I can use a Maneuver by expending a superiority die (only one Maneuver per attack)",
			]),
			additional : ["", "", "2 known", "2 known", "2 known", "3 known", "3 known", "3 known", "3 known", "3 known", "4 known", "4 known", "4 known", "4 known", "4 known", "4 known", "5 known", "5 known", "5 known", "5 known"],
			extraname : "Maneuver",
			extrachoices : ["Commander's Strike", "Disarming Attack", "Distracting Strike", "Evasive Footwork", "Feinting Attack", "Goading Attack", "Lunging Attack", "Maneuvering Attack", "Menacing Attack", "Parry", "Precision Attack", "Pushing Attack", "Rally", "Riposte", "Sweeping Attack", "Trip Attack"],
			"commander's strike" : {
				name : "Commander's Strike",
				source : ["P", 74],
				description: desc([
					"I forgo one attack of my Attack action to use a bonus action to direct an ally I see/hear",
					"The ally can use a reaction to make an attack, adding the superiority die to damage",
				]),
				action : [["bonus action", " (with Attack action)"]]
			},
			"disarming attack" : {
				name : "Disarming Attack",
				source : ["P", 74],
				description: desc([
					"Use after hitting a creature; I add the superiority die to my attack's damage",
					"Target makes a Strength save or drops a held object of my choice to its feet",
				]),
			},
			"distracting strike" : {
				name : "Distracting Strike",
				source : ["P", 74],
				description: desc([
					"Use after hitting a creature; I add the superiority die to my attack's damage",
					"The next attack of an ally before my next turn has adv. against the creature",
				]),
			},
			"evasive footwork" : {
				name : "Evasive Footwork",
				source : ["P", 74],
				description: desc("Use when moving; I add the superiority die to my AC until I stop moving")
			},
			"feinting attack" : {
				name : "Feinting Attack",
				source : ["P", 74],
				description: desc([
					"As a bonus action, I can feint to gain adv. on my next attack against a target within 5 ft",
					"If the attack hits, I add the superiority die to my attack's damage",
				]),
				action : [["bonus action", ""]]
			},
			"goading attack" : {
				name : "Goading Attack",
				source : ["P", 74],
				description: desc([
					"Use after hitting a creature; I add the superiority die to my attack's damage",
					"Target makes a Wis save or has disadv. vs. other targets until the end of my next turn",
				]),
			},
			"lunging attack" : {
				name : "Lunging Attack",
				source : ["P", 74],
				description: desc([
					"I can spend a superiority die to increase the reach of a melee weapon attack by 5 ft",
					"If the attack hits, I add the superiority die to my attack's damage",
				]),
			},
			"maneuvering attack" : {
				name : "Maneuvering Attack",
				source : ["P", 74],
				description: desc([
					"Use after hitting a creature; I add the superiority die to my attack's damage",
					"Ally can use reaction to move half speed without opportunity attack from the target",
				]),
			},
			"menacing attack" : {
				name : "Menacing Attack",
				source : ["P", 74],
				description: desc([
					"Use after hitting a creature; I add the superiority die to my attack's damage",
					"Target makes a Wisdom save or is frightened of me until the end of my next turn",
				]),
			},
			"parry" : {
				name : "Parry",
				source : ["P", 74],
				description: desc("When damaged in melee, I can use a reaction to reduce it by superiority die + Dex mod"),
				action : [["reaction", " (when damaged in melee)"]]
			},
			"precision attack" : {
				name : "Precision Attack",
				source : ["P", 74],
				description: desc("I add the superiority die to my attack roll, either before or after rolling")
			},
			"pushing attack" : {
				name : "Pushing Attack",
				source : ["P", 74],
				description: desc([
					"Use after hitting a creature; I add the superiority die to the attack's damage",
					"If target is Large or smaller, it must make a Strength save or be pushed up to 15 ft away",
				]),
			},
			"rally" : {
				name : "Rally",
				source : ["P", 74],
				description: desc("Ally that can see/hear me gets temporary HP equal to superiority die + Wis mod"),
				action : [["bonus action", ""]]
			},
			"riposte" : {
				name : "Riposte",
				source : ["P", 74],
				description: desc([
					"When missed in melee, I can use my reaction to make one melee attack vs. the attacker",
					"If the attack hits, I add the superiority die to my attack's damage",
				]),
				action : [["reaction", " (after missed in melee)"]]
			},
			"sweeping attack" : {
				name : "Sweeping Attack",
				source : ["P", 74],
				description: desc([
					"Use after hitting a creature and a second creature is within 5 ft of the first",
					"If the original attack roll hits this second creature, it takes the superiority die in damage",
				]),
			},
			"trip attack" : {
				name : "Trip Attack",
				source : ["P", 74],
				description: desc([
					"Use after hitting a creature; I add the superiority die to the attack's damage",
					"If target is Large or smaller, it must make a Strength save or be knocked prone",
				]),
			}
		},
		"subclassfeature3.2" : {
			name : "Bonus Proficiencies",
			source : ["HB", 0],
			minlevel : 3,
			description : "[martial weapon proficiency]" + "\n   " + "I can select three weapons to count as monk weapons for the martial arts feature",
			weapons : [false, true]
		},
		"subclassfeature6" : {
			name : "Healing Ki",
			source : ["HB", 0],
			minlevel : 6,
			description: desc("I can heal myself or an ally with a superiority die, healing twice the die result on touch"),
			action : [["bonus action", ""]]
		},
		"subclassfeature17" : {
			name : "Relentless",
			source : ["P", 74],
			minlevel : 17,
			description: desc("I can spend ki to regain superiority die, at a cost of 4 ki per die")
		}
	}
});
