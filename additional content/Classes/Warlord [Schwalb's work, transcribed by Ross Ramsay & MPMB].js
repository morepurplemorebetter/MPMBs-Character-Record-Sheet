/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds a class, called "Warlord" and its 6 subclasses
				This class has been made and published by Schwalb Entertainment
				If you intend to use this script, please purchase the class at https://schwalb-entertainment.myshopify.com/products/call-to-arms-the-warlord
				For more information, see here: https://schwalbentertainment.com/2019/01/14/call-to-arms-the-warlord/
				This script uses the version of the 19th of January 2019
	Code by:	Ross Ramsay & MorePurpleMoreBetter
	Date:		2019-05-31 (sheet v13.0.0beta17)

	Note that the original document doesn't give any rules for multiclassing.
	The multiclassing settings used below are an interpretation by MPMB.

	If you like this class, take a look at other content of this creator:
	https://www.dmsguild.com/browse/pub/8782/Schwalb-Entertainment

	Caution:	MorePurpleMoreBetter advises against using this class as it breaks game balance (some of its features are clearly overpowered). This code was made on commission for a patron.
*/

var iFileName = "Warlord [Schwalb's work, transcribed by Ross Ramsay & MPMB].js";
RequiredSheetVersion(13);

SourceList["SE:W"] = {
	name : "Schwalb Entertainment: Warlord",
	abbreviation : "SE:W",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/264030/",
	date : "2019/01/19"
};

ClassList["warlord"] = {
	regExpSearch : /warlord/i,
	name : "Warlord",
	source : ["SE:W", 0],
	primaryAbility : "Charisma",
	prereqs : "Charisma 13",
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Wis", "Con"],
	skillstxt : {
		primary : "Choose two from Athletics, History, Insight, Intimidation, Medicine, Perception, and Persuasion"
	},
	armorProfs : {
		primary : [true, true, true, true],
		secondary : [true, true, false, true]
	},
	weaponProfs : {
		primary : [true, true],
		secondary : [true, true]
	},
	equipment : "Warlord starting equipment:" +
		"\n \u2022 Chain mail -or- leather armor, a longbow, and 20 arrows;" +
		"\n \u2022 A martial weapon and a shield -or- two martial weapons;" +
		"\n \u2022 Light crossbow and 20 bolts -or- two spears;" +
		"\n \u2022 A dungeoneer's pack -or- an explorer's pack;" +
		"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Military Strategem", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	features : {
		"battlefield commands" : {
			name : "Battlefield Commands",
			source : ["SE:W", 3],
			minlevel : 1,
			description : desc([
				"As a bonus action, I give a creature within 30 ft that can hear me a battle command die",
				"For 10 min, the recipient can add it to one ability check, attack roll, or saving throw",
				"This addition can be done after seeing the d20 roll, but before knowing the outcome"
			]),
			usages : "Charisma modifier per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "short rest",
			action : ["bonus action", ""],
			additional : levels.map(function (n) {
				return n < 5 ? "d4" : n < 9 ? "d6" : n < 13 ? "d8" : n < 17 ? "d10" : "d12";
			})
		},
		"commanding presence" : {
			name : "Commanding Presence",
			source : ["SE:W", 3],
			minlevel : 1,
			description : desc([
				"When I can make an attack, I can forgo it to have an ally within range make it instead",
				"If that creature can hear me, it can use its reaction to make one weapon attack"
			]),
			additional : levels.map(function (n) {
				return n < 10 ? "10 ft" : n < 20 ? "30 ft" : "60 ft";
			})
		},
		"inspiring speech" : {
			name : "Inspiring Speech",
			source : ["SE:W", 3],
			minlevel : 2,
			description : desc([
				"After finishing a short rest, I give temporary HP to myself and allies that could hear me",
				"Each recipient gains temporary HP equal to the roll of one of its HD"
			])
		},
		"subclassfeature3" : {
			name : "Military Strategem",
			source : ["SE:W", 3],
			minlevel : 3,
			description : "\n   " + "Choose a Military Strategem you adhere to and put it in the \"Class\" field"
		},
		"battle leader" : {
			name : "Battle Leader",
			source : ["SE:W", 4],
			minlevel : 6,
			description : "\n   " + "Allies within range add my Charisma modifier to the damage of their weapon attacks",
			additional : levels.map(function (n) {
				return n < 6 ? "" : n < 10 ? "10 ft" : n < 20 ? "30 ft" : "60 ft";
			})
		},
		"call to arms" : {
			name : "Call To Arms",
			source : ["SE:W", 4],
			minlevel : 6,
			description : "\n   " + "Me and my allies within range can add my battle command die to initiative checks",
			additional : levels.map(function (n) {
				if (n < 6) return "";
				var range = n < 10 ? "10 ft" : n < 20 ? "30 ft" : "60 ft";
				var die = n < 5 ? "d4" : n < 9 ? "d6" : n < 13 ? "d8" : n < 17 ? "d10" : "d12";
				return die + "; " + range;
			})
		},
		"rouse the troops" : {
			name : "Rouse The Troops",
			source : ["SE:W", 4],
			minlevel : 10,
			description : desc([
				"By speaking for 1 minute, my allies that can hear me can spend HD as if it's a short rest",
				"If they do, they lose an exhaustion level, but must finish a long rest before doing so again"
			])
		},
		"advantageous action" : {
			name : "Advantageous Action",
			source : ["SE:W", 4],
			minlevel : 14,
			description : desc([
				"As a bonus action, I can do the Help action and grant the target one extra benefit:",
				" • End the frightened condition on the target, if it is within 30 ft and can hear me",
				" • Grant the target my Charisma modifier worth of temporary HP, if it is within 5 ft",
				" • Heal the target for 1 HP, if I can touch it and it currently has 0 HP"
			]),
			action : [["bonus action", ""]]
		},
		"legendary commander" : {
			name : "Legendary Commander",
			source : ["SE:W", 4],
			minlevel : 20,
			description : desc([
				"Allies within range add my Charisma modifier to their saving throws",
				"When a battle command die granted by me is used, roll two dice and choose the highest"
			]),
			additional : "60 ft"
		}
	}
};

AddSubClass("warlord", "daring gambler", {
	regExpSearch : /^(?=.*daring)(?=.*gambler).*$/i,
	subname : "Stratagem of the Daring Gambler",
	source : ["SE:W", 5],
	fullname : "Daring Gambler",
	features : {
		"subclassfeature3" : {
			name : "Daring Assault",
			source : ["SE:W", 5],
			minlevel : 3,
			description : "\n   " + "Allies within range can choose to take -5 on their attack rolls to do extra damage",
			additional : levels.map(function (n) {
				return n < 3 ? "" : "+" + (n < 15 ? 2 : 3) + "d6; " + (n < 10 ? "10 ft" : n < 20 ? "30 ft" : "60 ft");
			})
		},
		"subclassfeature7" : {
			name : "Desperate Avoidance",
			source : ["SE:W", 5],
			minlevel : 7,
			description : "\n" + "I can make a save with adv., but I get disadv. on attack rolls until my next turn ends",
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature11" : {
			name : "Hold The Line",
			source : ["SE:W", 5],
			minlevel : 11,
			description : desc([
				"Allies within range can choose to make a saving throw at disadvantage",
				"If the effect would normally do half damage on a successful save, it now does no damage"
			]),
			additional : levels.map(function (n) {
				return n < 11 ? "" : n < 20 ? "30 ft" : "60 ft";
			})
		},
		"subclassfeature15" : {
			name : "Risky Gambit",
			source : ["SE:W", 5],
			minlevel : 15,
			description : desc([
				"As a bonus action, I make a target in range provoke opportunity attacks from 1 creature",
				"If it does the attack, the attacker grants adv. on all attacks vs. it until it next turn starts"
			]),
			action : ["bonus action", ""],
			additional : levels.map(function (n) {
				return n < 15 ? "" : n < 20 ? "30 ft" : "60 ft";
			})
		},
		"subclassfeature18" : {
			name : "Lay the Trap",
			source : ["SE:W", 5],
			minlevel : 18,
			description : desc([
				"When a creature misses me with an attack while I'm conscious, I can attack it with ease",
				"One chosen creature and I gain adv. on our next attack vs. it before it next turn ends"
			])
		}
	}
});

AddSubClass("warlord", "golden general", {
	regExpSearch : /^(?=.*golden)(?=.*general).*$/i,
	subname : "Stratagem of the Golden General",
	source : ["SE:W", 5],
	fullname : "Golden General",
	features : {
		"subclassfeature3" : {
			name : "Inspiring Strike",
			source : ["SE:W", 5],
			minlevel : 3,
			description : desc([
				"Targets that I hit with a weapon attack are easier to hit until the start of my next turn",
				"The next attack roll against the target is made with advantage"
			])
		},
		"subclassfeature7" : {
			name : "Inspiring Presence",
			source : ["SE:W", 5],
			minlevel : 7,
			description : "\n   I gain proficiency in the Persuasion skill, or expertise if I already have proficiency",
			skills : [["Persuasion", "increment"]]
		},
		"subclassfeature11" : {
			name : "Glorious Sacrifice",
			source : ["SE:W", 5],
			minlevel : 11,
			description : desc([
				"If both me and creatures within range must make the same save, I can grant them adv.",
				"By doing so, I make my saving throw with disadvantage"
			]),
			additional : levels.map(function (n) {
				return n < 11 ? "" : n < 20 ? "30 ft" : "60 ft";
			})
		},
		"subclassfeature15" : {
			name : "Portentous Escape",
			source : ["SE:W", 5],
			minlevel : 15,
			description : desc([
				"When I succeed on a save, I can choose an ally within 60 ft that can see and hear me",
				"That ally gains temporary HP equal to 5 + my Charisma modifier"
			])
		},
		"subclassfeature18" : {
			name : "Rally the Troops",
			source : ["SE:W", 6],
			minlevel : 18,
			description : desc([
				"As an action, I can heal one creature that currently has an unused battle command die",
				"The target regains HP equal to two rolls of the battle command die + my Charisma mod"
			]),
			action : [["action", ""]]
		}
	}
});

AddSubClass("warlord", "hordemaster", {
	regExpSearch : /^(?=.*hordemaster).*$/i,
	subname : "Stratagem of the Hordemaster",
	source : ["SE:W", 6],
	fullname : "Hordemaster",
	features : {
		"subclassfeature3" : {
			name : "Make Haste",
			source : ["SE:W", 6],
			minlevel : 3,
			description : "\n   Allies starting there turn within range gain +5 ft speed until the end of their turn",
			additional : levels.map(function (n) {
				return n < 3 ? "" : n < 10 ? "10 ft" : n < 20 ? "30 ft" : "60 ft";
			})
		},
		"subclassfeature3.1" : {
			name : "Skirmisher",
			source : ["SE:W", 6],
			minlevel : 3,
			description : desc([
				"I gain bonus speed while I'm wearing light armor, no armor, and not wearing a shield",
				"Opportunity attacks I provoke by moving have disadvantage"
			]),
			additional : levels.map(function (n) {
				return n < 3 ? "" : n < 15 ? "+10 ft" : "+20 ft";
			}),
			changeeval : function (v) {
				var addSpd = v[1] < 3 ? 0 : v[1] < 15 ? "+10" : "+20";
				SetProf('speed', addSpd !== 0, {allModes : addSpd}, "Hordemaster: Skirmisher");
			}
		},
		"subclassfeature7" : {
			name : "Nimble Troops",
			source : ["SE:W", 6],
			minlevel : 7,
			description : "\n   Creatures within range add my Charisma modifier to Athletics and Acrobatics checks",
			additional : levels.map(function (n) {
				return n < 7 ? "" : n < 10 ? "10 ft" : n < 20 ? "30 ft" : "60 ft";
			})
		},
		"subclassfeature11" : {
			name : "Hit-and-Run",
			source : ["SE:W", 6],
			minlevel : 11,
			description : "\n   Using a battle command die granted by me also gains +10 ft speed until its turn ends"
		},
		"subclassfeature15" : {
			name : "Seize Advantage",
			source : ["SE:W", 6],
			minlevel : 15,
			description : desc([
				"When a creature misses an opportunity attacks against me or an ally within range,",
				"the next attack against the creature before the end of its next turn has advantage"
			]),
			additional : levels.map(function (n) {
				return n < 15 ? "" : n < 20 ? "30 ft" : "60 ft";
			})
		},
		"subclassfeature18" : {
			name : "Unbound Horde",
			source : ["SE:W", 6],
			minlevel : 18,
			description : desc([
				"Opportunity attacks against my allies within range are made with disadvantage",
				"When I move on my turn, allies within range can use their reaction to move up to 10 ft",
				"They can't move if their speed is currently less than 10 ft"
			]),
			additional : levels.map(function (n) {
				return n < 18 ? "" : n < 20 ? "30 ft" : "60 ft";
			})
		}
	}
});

AddSubClass("warlord", "resourceful leader", {
	regExpSearch : /^(?=.*resourceful)(?=.*leader).*$/i,
	subname : "Stratagem of the Resourceful Leader",
	source : ["SE:W", 6],
	fullname : "Resourceful Leader",
	features : {
		"subclassfeature3" : {
			name : "Find A Way",
			source : ["SE:W", 6],
			minlevel : 3,
			description : desc([
				"When an ally in 60 ft with a battle command die granted by me misses an attack,",
				"I can use my reaction to expend the battle command die on its behalf",
				"By doing so, the miss automatically becomes a hit, but the attack only deals half damage"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature3.1" : {
			name : "Shifting Resources",
			source : ["SE:W", 6],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can move a battle command die from a target to another",
				"Both targets must be within range, and the recipient must be able to hear me"
			]),
			additional : levels.map(function (n) {
				return n < 10 ? "10 ft" : n < 20 ? "30 ft" : "60 ft";
			}),
			action : [["bonus action", ""]]
		},
		"subclassfeature7" : {
			name : "Trick up your Sleeve",
			source : ["SE:W", 7],
			minlevel : 7,
			description : "\n   I can add my proficiency bonus (an extra time) to one ability check, attack roll, or save",
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature11" : {
			name : "Close Call",
			source : ["SE:W", 7],
			minlevel : 11,
			description : "\n   When I would fail a check or save, I can add a die to the total, but only once per minute",
			usages : 1,
			recovery : "1 min",
			additional : levels.map(function (n) {
				return n < 11 ? "" : n < 13 ? "d8" : n < 17 ? "d10" : "d12";
			})
		},
		"subclassfeature15" : {
			name : "Timely Warning",
			source : ["SE:W", 7],
			minlevel : 15,
			description : desc([
				"My battle command die can also be used to increase AC when the target of an attack",
				"When this increase would cause the attack to miss, the die is not expended"
			])
		},
		"subclassfeature18" : {
			name : "Hidden Resources",
			source : ["SE:W", 7],
			minlevel : 18,
			description : desc([
				"As a bonus action, I can allow a creature regain a use of a class or racial feature",
				"This feature can only be regained if it would normally be regained by a short rest"
			]),
			usages : 2,
			recovery : "long rest",
			action : [["bonus action",""]]
		}
	}
});
// >>
AddSubClass("warlord", "shrewd commander", {
	regExpSearch : /^(?=.*shrewd)(?=.*commander).*$/i,
	subname : "Stratagem of the Shrewd Commander",
	source : ["SE:W", 7],
	fullname : "Shrewd Commander",
	features : {
		"subclassfeature3" : {
			name : "The Weakest Link",
			source : ["SE:W", 7],
			minlevel : 3,
			description : desc([
				"As a bonus action when I hit an attack, I can mark the target until my next turn starts",
				"My allies in range add half my Cha mod (min 1) to attack rolls vs. the marked target"
			]),
			action : [["bonus action", ""]]
		},
		"subclassfeature7" : {
			name : "Attention to Detail",
			source : ["SE:W", 7],
			minlevel : 7,
			description : "\n   Three times per long rest I can make an ability check with advantage",
			usages : 3,
			recovery : "long rest"
		},
		"subclassfeature11" : {
			name : "Commander's Cunning",
			source : ["SE:W", 7],
			minlevel : 11,
			description : desc([
				"As a reaction when a creature with an unused battle command die from me is attacked,",
				"I can expend that die to impose disadvantage on the triggering attack roll"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature15" : {
			name : "Exploit the Advantage",
			source : ["SE:W", 8],
			minlevel : 15,
			description : "\n   When an ally attacks a target marked by me, those attacks do an extra +1d6 damage"
		},
		"subclassfeature18" : {
			name : "No Room for Failure",
			source : ["SE:W", 7],
			minlevel : 18,
			description : desc([
				"If an ally within range that has an unused battle command die from me drops to 0 HP,",
				"it can expend the die to regain HP equal to two rolls of the die + my Charisma modifier"
			]),
			additional : levels.map(function (n) {
				return n < 18 ? "" : n < 20 ? "30 ft" : "60 ft";
			})
		}
	}
});

AddSubClass("warlord", "supreme tactician", {
	regExpSearch : /^(?=.*supreme)(?=.*tactician).*$/i,
	subname : "Stratagem of the Supreme Tactician",
	source : ["SE:W", 8],
	fullname : "Supreme Tactician",
	features : {
		"subclassfeature3" : {
			name : "Tactical Edge",
			source : ["SE:W", 8],
			minlevel : 3,
			description : desc([
				"When my turn starts, I gain a tactics die (d4) and increase the dice I have by one step",
				"A die increases from a d4 to a d6, to a d8, to a d10, and finally to a d12",
				"Any ally within 60 ft that can hear me can expend a die and add it to one attack roll"
			]),
			additional : levels.map( function(n) {
				return n < 3 ? "" : n < 15 ? "max 1 die" : "max 2 dice";
			})
		},
		"subclassfeature7" : {
			name : "Student of History",
			source : ["SE:W", 8],
			minlevel : 7,
			description : "\n   I gain proficiency and expertise in the History skill",
			skills : [["History", "full"]]
		},
		"subclassfeature11" : {
			name : "Indomitable Offense",
			source : ["SE:W", 8],
			minlevel : 11,
			description : desc([
				"When someone uses one a combat dice I gave them, they gain a bonus to their AC",
				"This bonus equals half the result of the die roll and lasts until the end of my next turn"
			])
		},
		"subclassfeature15" : {
			name : "Superior Tactics",
			source : ["SE:W", 8],
			minlevel : 15,
			description : "\n   I can have two tactics dice at the same time"
		},
		"subclassfeature18" : {
			name : "Master Tactician",
			source : ["SE:W", 8],
			minlevel : 18,
			description : "\n   Creatures using a combat die granted by me can reroll any 1 or 2 until it is a 3 or more"
		}
	}
});