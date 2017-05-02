//All the subclasses from the Unearthed Arcana articles are present in this file chronologically

/*	the Eberron Unearthed Arcana of 2015-02-02
	(http://media.wizards.com/2015/downloads/dnd/UA_Eberron_v1.pdf)
*/
//adds a subclass for the Wizard, called "Tradition of the Artificer"
//this code was contributed by Pengsloth
ClassSubList["wizard-artificer"] = {
	regExpSearch : /^((?=.*(wizard|mage|magus))(?=.*artificer))|(?=.*infuser).*$/i,
	subname : "Tradition of the Artificer",
	source : ["UA:E", 3],
	fullname : "Wizard (Artificer)",
	features : {
		"subclassfeature2" : {
			name : "Infuse Potions",
			source : ["UA:E", 3],
			minlevel : 2,
			description : "\n   " + "I can produce magic potions if I spend 10 minutes and expend a spell slot" + "\n   " + "I can not regain the spell slot until the potion is consumed or a week has passed",
			additional : ["", "3 potions", "3 potions", "3 potions", "3 potions", "3 potions", "3 potions", "3 potions", "3 potions", "4 potions", "4 potions", "4 potions", "4 potions", "4 potions", "4 potions", "4 potions", "4 potions", "4 potions", "4 potions", "4 potions"]
		},
		"subclassfeature2.1" : {
			name : "Infuse Scrolls",
			source : ["UA:E", 4],
			minlevel : 2,
			description : "\n   " + "I can produce a scroll after a short rest if I spend 10 minutes and my Arcane Recovery" + "\n   " + "I subtract the spell's level from the levels worth of slots I regain using Arcane Recovery" + "\n   " + "This reduction applies till the scroll is used and I finish a long rest",
			additional : ["", "1 scroll", "1 scroll", "1 scroll", "1 scroll", "1 scroll", "1 scroll", "1 scroll", "1 scroll", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls"],
		},
		"subclassfeature6" : {
			name : "Infuse Weapons and Armor",
			source : ["UA:E", 4],
			minlevel : 6,
			description : "\n   " + "I can spend 10 minutes to produce a magic weapon, armor, a shield, or ammunition" + "\n   " + "The item retains its magic for 8 hours and the spell slot I expend is:" + "\n   " + "2nd: +1 ammunition (20 pieces), 3rd: +1 weapon or +1 shield, 4th: +1 armor," + "\n   " + "5th: +2 weapon or +2 ammunition (20 pieces), 6th: +3 armor.",
			additional : ["", "", "", "", "", "1 weapon or armor", "1 weapon or armor", "1 weapon or armor", "1 weapon or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor"]
		},
		"subclassfeature10" : {
			name : "Superior Artificer",
			source : ["UA:E", 4],
			minlevel : 10,
			description : "\n   " + "I can create one additional scroll, potion, weapon, or armor when I use Infuse"
		},
		"subclassfeature14" : {
			name : "Master Artificer",
			source : ["UA:E", 4],
			minlevel : 14,
			description : "\n   " + "I can produce a variety of magic items from Tables A and B from the DMG" + "\n   " + "It takes 1 week for such an item and I cannot do it again for a month",
			usages : 1,
			recovery : "Month"
		}
	}
};
ClassList.wizard.subclasses[1].push("wizard-artificer");

/*	the Modifying Classes Unearthed Arcana of 2015-04-06
	(http://media.wizards.com/2015/downloads/dnd/UA3_ClassDesignVariants.pdf)
*/
//adds the spell-less ranger class and a subclass for the Sorcerer, called "Favored Soul"
ClassSubList["favored soul"] = {
	regExpSearch : /^(?=.*favou?red)(?=.*soul).*$/i,
	subname : "Favored Soul",
	source : ["UA:MC", 8],
	fullname : "Favored Soul",
	attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiencies",
			source : ["UA:MC", 9],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with light armor, medium armor, shields, and simple weapons",
			armor : [true, true, false, true],
			weapons : [true, false]
		},
		"subclassfeature1.1" : {
			name : "Chosen of the Gods",
			source : ["UA:MC", 8],
			minlevel : 1,
			description : "\n   " + "Choose a Cleric Domain using the \"Choose Feature\" button above" + "\n   " + "I add the chosen domain's spells to my known spells, when they are of a level I can cast" + "\n   " + "These count as sorcerer spells, but do not count against the number of spells I can know",
			choices : []
		},
		"subclassfeature14" : {
			name : "Divine Wings",
			source : ["UA:MC", 8],
			minlevel : 14,
			description : "\n   " + "As a bonus action, unless armor is in the way, I can sprout dragon wings from my back" + "\n   " + "I gain a fly speed equal to my current speed until I dismiss the wings as a bonus action",
			action : ["bonus action", " (start/stop)"]
		},
		"subclassfeature18" : {
			name : "Power of the Chosen",
			source : ["UA:MC", 8],
			minlevel : 18,
			description : "\n   " + "When I cast a spell I gained from the Chosen of the Gods class feature, I heal myself" + "\n   " + "I regain a number of HP equal to my Charisma modifier (minimum 1) + the spell's level"
		}
	}
};
ClassList.sorcerer.subclasses[1].push("favored soul");

//a version of the ranger, the spell-less ranger
ClassList["spell-less ranger"] = {
	regExpSearch : /^(?=.*spell.?less)((?=.*(ranger|strider))|((?=.*(nature|natural))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
	name : "Spell-less Ranger",
	source : ["UA:MC", 6],
	primaryAbility : "\n \u2022 Ranger: Dexterity and Wisdom;",
	abilitySave : 1,
	abilitySaveAlt : 2,
	prereqs : "\n \u2022 Ranger: Dexterity 13 and Wisdom 13;",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 10,
	saves : ["Str", "Dex"],
	skills : ["\n\n" + toUni("Spell-less Ranger") + ": Choose three from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival", "\n\n" + toUni("Multiclass Spell-less Ranger") + ": Choose one from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival"],
	armor : [
		[true, true, false, true],
		[true, true, false, true]
	],
	weapons : [
		[true, true],
		[true, true]
	],
	equipment : "Spell-less Ranger starting equipment:\n \u2022 Scale mail -or- leather armor;\n \u2022 Two shortswords -or- two simple melee weapons;\n \u2022 A dungeoneer's pack -or- an explorer's pack;\n \u2022 A longbow and a quiver of 20 arrows.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Ranger Archetype", ["spell-less beast master", "spell-less hunter"]],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"favored enemy" : {
			name : "Favored Enemy",
			source : ["P", 91],
			minlevel : 1,
			description : "\n   " + "Use the \"Choose Features\" button above to add a favored enemy to the third page" + "\n   " + "When selecting a favored enemy, I also learn one of the languages it speaks" + "\n   " + "I have adv. on Wis (Survival) checks to track and Int checks to recall info about them",
			additional : ["1 favored enemy", "1 favored enemy", "1 favored enemy", "1 favored enemy", "1 favored enemy", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies"],
			extraname : "Favored Enemy",
			extrachoices : ["Aberrations", "Beasts", "Celestials", "Constructs", "Dragons", "Elementals", "Fey", "Fiends", "Giants", "Monstrosities", "Oozes", "Plants", "Undead", "Two Races of Humanoids"],
			"aberrations" : {
				name : "Aberrations",
				description : "",
				source : ["P", 91]
			},
			"beasts" : {
				name : "Beasts",
				description : "",
				source : ["P", 91]
			},
			"celestials" : {
				name : "Celestials",
				description : "",
				source : ["P", 91]
			},
			"constructs" : {
				name : "Constructs",
				description : "",
				source : ["P", 91]
			},
			"dragons" : {
				name : "Dragons",
				description : "",
				source : ["P", 91]
			},
			"elementals" : {
				name : "Elementals",
				description : "",
				source : ["P", 91]
			},
			"fey" : {
				name : "Fey",
				description : "",
				source : ["P", 91]
			},
			"fiends" : {
				name : "Fiends",
				description : "",
				source : ["P", 91]
			},
			"giants" : {
				name : "Giants",
				description : "",
				source : ["P", 91]
			},
			"monstrosities" : {
				name : "Monstrosities",
				description : "",
				source : ["P", 91]
			},
			"oozes" : {
				name : "Oozes",
				description : "",
				source : ["P", 91]
			},
			"plants" : {
				name : "Plants",
				description : "",
				source : ["P", 91]
			},
			"undead" : {
				name : "Undead",
				description : "",
				source : ["P", 91]
			},
			"two races of humanoids" : {
				name : "Two Races of Humanoids",
				description : "",
				source : ["P", 91]
			}
		},
		"natural explorer" : {
			name : "Natural Explorer",
			source : ["P", 91],
			minlevel : 1,
			description : "\n   " + "Use the \"Choose Features\" button above to add a favored terrain to the third page",
			additional : ["1 favored terrain", "1 favored terrain", "1 favored terrain", "1 favored terrain", "1 favored terrain", "2 favored terrains", "2 favored terrains", "2 favored terrains", "2 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains"],
			extraname : "Favored Terrain",
			extrachoices : ["Arctic", "Coast", "Desert", "Forest", "Grassland", "Mountain", "Swamp", "Underdark"],
			"arctic" : {
				name : "Arctic",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning arctic terrain" + "\n   " + "While traveling for an hour or more in arctic terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
			"coast" : {
				name : "Coast",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning coast terrain" + "\n   " + "While traveling for an hour or more in coast terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
			"desert" : {
				name : "Desert",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning desert terrain" + "\n   " + "While traveling for an hour or more in desert terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
			"forest" : {
				name : "Forest",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning forest terrain" + "\n   " + "While traveling for an hour or more in forest terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
			"grassland" : {
				name : "Grassland",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning grassland terrain" + "\n   " + "While traveling for an hour or more in grassland terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
			"mountain" : {
				name : "Mountain",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning mountain terrain" + "\n   " + "While traveling for an hour or more in mountain terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
			"swamp" : {
				name : "Swamp",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning swamp terrain" + "\n   " + "While traveling for an hour or more in swamp terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
			"underdark" : {
				name : "Underdark",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning underdark terrain" + "\n   " + "While traveling for an hour or more in underdark terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			}
		},
		"combat superiority" : {
			name : "Combat Superiority",
			source : ["UA:MC", 6],
			minlevel : 2,
			description : "\n   " + "I gain a number of superiority dice that I can use to fuel special Maneuvers" + "\n   " + "I regain all superiority dice after a short rest",
			additional : "d8",
			usages : levels.map( function(n) {
				if (n < 2) return "";
				return (n < 9 ? 4 : n < 17 ? 5 : 6) + " maneuvers known";
			}),
			additional : ["", "", "d8", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d10", "d10", "d10", "d10", "d12", "d12", "d12"],
			usages : [0, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6],
			recovery : "short rest"
		},
		"combat maneuvers" : {
			name : "Combat Maneuvers",
			source : ["UA:MC", 6],
			minlevel : 2,
			description : "\n   " + "Use the \"Choose Features\" button above to add a Maneuver to the third page" + "\n   " + "I can use a Maneuver by expending a superiority die (only one Maneuver per attack)",
			additional : levels.map( function(n) {
				if (n < 2) return "";
				return (n < 5 ? 2 : n < 9 ? 3 : n < 13 ? 4 : n < 17 ? 5 : 6) + " maneuvers known";
			}),
			extraname : "Maneuver",
			extrachoices : ["Commander's Strike", "Disarming Attack", "Distracting Strike", "Evasive Footwork", "Feinting Attack", "Goading Attack", "Lunging Attack", "Maneuvering Attack", "Menacing Attack", "Parry", "Precision Attack", "Pushing Attack", "Rally", "Riposte", "Sweeping Attack", "Trip Attack"],
			"commander's strike" : {
				name : "Commander's Strike",
				source : ["P", 74],
				description : "\n   " + "I forgo one attack of my Attack action to use a bonus action to direct an ally I see/hear" + "\n   " + "The ally can use a reaction to make an attack, adding the superiority die to damage",
				action : ["bonus action", " (with Attack action)"]
			},
			"disarming attack" : {
				name : "Disarming Attack",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "Target makes a Strength save or drops a held object of my choice to its feet"
			},
			"distracting strike" : {
				name : "Distracting Strike",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "The next attack of an ally before my next turn has adv. against the creature"
			},
			"evasive footwork" : {
				name : "Evasive Footwork",
				source : ["P", 74],
				description : "\n   " + "Use when moving; I add the superiority die to my AC until I stop moving"
			},
			"feinting attack" : {
				name : "Feinting Attack",
				source : ["P", 74],
				description : "\n   " + "As a bonus action, I can feint to gain adv. on my next attack against a target within 5 ft" + "\n   " + "If the attack hits, I add the superiority die to my attack's damage",
				action : ["bonus action", ""]
			},
			"goading attack" : {
				name : "Goading Attack",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "Target makes a Wis save or has disadv. vs. other targets until the end of my next turn"
			},
			"lunging attack" : {
				name : "Lunging Attack",
				source : ["P", 74],
				description : "\n   " + "I can spend a superiority die to increase the reach of a melee weapon attack by 5 ft" + "\n   " + "If the attack hits, I add the superiority die to my attack's damage"
			},
			"maneuvering attack" : {
				name : "Maneuvering Attack",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "Ally can use reaction to move half speed without opportunity attack from the target"

			},
			"menacing attack" : {
				name : "Menacing Attack",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "Target makes a Wisdom save or is frightened of me until the end of my next turn"
			},
			"parry" : {
				name : "Parry",
				source : ["P", 74],
				description : "\n   " + "When damaged in melee, I can use a reaction to reduce it by superiority die + Dex mod",
				action : ["reaction", " (when damaged in melee)"]
			},
			"precision attack" : {
				name : "Precision Attack",
				source : ["P", 74],
				description : "\n   " + "I add the superiority die to my attack roll, either before or after rolling"
			},
			"pushing attack" : {
				name : "Pushing Attack",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature; I add the superiority die to the attack's damage" + "\n   " + "If target is Large or smaller, it must make a Strength save or be pushed up to 15 ft away"
			},
			"rally" : {
				name : "Rally",
				source : ["P", 74],
				description : "\n   " + "Ally that can see/hear me gets temporary HP equal to superiority die + Charisma mod",
				action : ["bonus action", ""]
			},
			"riposte" : {
				name : "Riposte",
				source : ["P", 74],
				description : "\n   " + "When missed in melee, I can use my reaction to make one melee attack vs. the attacker" + "\n   " + "If the attack hits, I add the superiority die to my attack's damage",
				action : ["reaction", " (after missed in melee)"]
			},
			"sweeping attack" : {
				name : "Sweeping Attack",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature and a second creature is within 5 ft of the first" + "\n   " + "If the original attack roll hits this second creature, it takes the superiority die in damage"
			},
			"trip attack" : {
				name : "Trip Attack",
				source : ["P", 74],
				description : "\n   " + "Use after hitting a creature; I add the superiority die to the attack's damage" + "\n   " + "If target is Large or smaller, it must make a Strength save or be knocked prone"
			}
		},
		"fighting style" : {
			name : "Fighting Style",
			source : ["P", 91],
			minlevel : 2,
			description : "\n   " + "Choose a Fighting Style for the ranger using the \"Choose Feature\" button above",
			choices : ["Archery", "Defense", "Dueling", "Two-Weapon Fighting"],
			"archery" : {
				name : "Archery Fighting Style",
				description : "\n   " + "+2 bonus to attack rolls I make with ranged weapons",
				calcChanges : {
					atkCalc : ["if (isRangedWeapon) {output.extraHit += 2; }; ", "My ranged weapons get a +2 bonus on the To Hit."]
				}
			},
			"defense" : {
				name : "Defense Fighting Style",
				description : "\n   " + "+1 bonus to AC when I'm wearing armor",
				eval : "AddACMisc(1, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\", \"CurrentArmour.known && !ArmourList[CurrentArmour.known].type\")",
				removeeval : "AddACMisc(0, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\")"
			},
			"dueling" : {
				name : "Dueling Fighting Style",
				description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons",
				calcChanges : {
					atkCalc : ["var areOffHands = function(n){for(var i=1;i<=n;i++){if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) {return true; }; }; }(FieldNumbers.actions); if (!areOffHands && isMeleeWeapon && !(/\\b(2|two).?hand(ed)?s?\\b/i).test(theWea.description)) {output.extraDmg += 2; }; ", "When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."]
				}
			},
			"two-weapon fighting" : {
				name : "Two-Weapon Fighting Style",
				description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks",
				calcChanges : {
					atkCalc : ["if (isOffHand) {output.modToDmg = true; }; ", "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks."]
				}
			}
		},
		"poultices" : {
			name : "Poultices",
			source : ["UA:MC", 7],
			minlevel : 3,
			description : desc([
				"In 1 hour, I can create a number of poultices equal to my Wisdom mod (min 1)",
				"The amount of poultices I have with me cannot exceed my Wisdom mod (min 1)",
				"I can applying a poultice in 1 minute, healing a creature; Poultices last for 24 hours"
			]),
			additional : levels.map( function(n) {
				if (n < 3) return "";
				return "heals 1d6+" + Math.ceil(n/2);
			})
		},
		"primeval awareness" : {
			name : "Primeval Awareness",
			source : ["P", 92],
			minlevel : 3,
			description : "\n   " + "As an action, I can use a spell slot to focus my awareness for 1 min per spell slot level" + "\n   " + "Out to 1 mile (6 in favored terrain), I sense if certain types of creatures are present",
			additional : "aber/celest/drag/elem/fey/fie/und",
			action : ["action", ""]
		},
		"subclassfeature3" : {
			name : "Ranger Archetype",
			source : ["UA:MC", 6],
			minlevel : 3,
			description : "\n   " + "Choose a Ranger Archetype you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Spell-less Beast Master or Spell-less Hunter"
		},
		"land's stride" : {
			name : "Land's Stride",
			source : ["P", 92],
			minlevel : 8,
			description : "\n   " + "I can travel through nonmagical, difficult terrain without penalty" + "\n   " + "I have advantage on saves vs. plants that impede movement by magical influence",
			save : "Adv. vs. magical plants that impede movement"
		},
		"natural antivenom" : {
			name : "Natural Antivenom",
			source : ["UA:MC", 7],
			minlevel : 9,
			description : desc([
				"I have advantage on saves vs. poison and resistance to poison damage",
				"When I use a poultice, in addition to healing, I cure one poison effect on the creature"
			]),
			save : "Adv. vs. poison effects",
			eval : "AddResistance('Poison', 'Natural Antivenom')",
			removeeval : "RemoveResistance('Poison');"
			
		},
		"hide in plain sight" : {
			name : "Hide in Plain Sight",
			source : ["P", 92],
			minlevel : 10,
			description : "\n   " + "I can hide with +10 to Dex (Stealth) after spending 1 minute creating camouflage" + "\n   " + "Once I move or take an action or a reaction, the benefit is lost"
		},
		"call natural allies" : {
			name : "Call Natural Allies",
			source : ["UA:MC", 7],
			minlevel : 13,
			description : desc([
				"While in an area that is my Favored Terrain, I can call on beasts within 1 mile to help",
				"The DM determines the beasts: 1\u00D7CR 2, 2\u00D7CR 1, 4\u00D7CR 1/2, or 8\u00D7CR 1/4",
				"They will fight alongside me, are friendly to me and my allies, and help up to 1 hour",
				"After I use these feature, I can't use it in the same general area again for 24 hours"
			])
		},
		"vanish" : {
			name : "Vanish",
			source : ["P", 92],
			minlevel : 14,
			description : "\n   " + "I can't be nonmagically tracked if I don't want to be and can Hide as a bonus action",
			action : ["bonus action", ""]
		},
		"relentless" : {
			name : "Relentless",
			source : ["UA:MC", 7],
			minlevel : 17,
			description : "\n   " + "I regain one superiority die if I have no more remaining when I roll initiative"
		},
		"feral senses" : {
			name : "Feral Senses",
			source : ["P", 92],
			minlevel : 18,
			description : "\n   " + "When not blinded or deafened, I'm aware of invisible, non-hidden creatures in 30 ft" + "\n   " + "I don't have disadvantage when attacking creatures I am aware of but can't see"
		},
		"foe slayer" : {
			name : "Foe Slayer",
			source : ["P", 92],
			minlevel : 20,
			description : "\n   " + "Once per turn, I can add Wis mod to the attack or damage roll vs. favored enemy"
		}
	}
};
ClassSubList["spell-less beast master"] = eval(ClassSubList["beast master"].toSource());
ClassSubList["spell-less beast master"].source = ["UA:MC", 6];
delete ClassSubList["spell-less beast master"].fullname;
ClassSubList["spell-less beast master"].regExpSearch = /^(?=.*spell.?less)(?=.*(animal|beast))((?=.*(master|ranger|strider))|((?=.*(nature|natural|green))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i;
ClassSubList["spell-less beast master"].features["subclassfeature15"] = {
	name : "Beastly Coordination",
	source : ["UA:MC", 7],
	minlevel : 15,
	description : "\n   " + "My companion can, as a reaction, halve an attack's damage from an attacker that I see"
}
ClassSubList["spell-less hunter"] = eval(ClassSubList["hunter"].toSource());
ClassSubList["spell-less hunter"].source = ["UA:MC", 6];
delete ClassSubList["spell-less hunter"].fullname;
ClassSubList["spell-less hunter"].regExpSearch = /^(?=.*spell.?less)(?!.*(monster|barbarian|bard|cleric|druid|fighter|monk|paladin|rogue|sorcerer|warlock|wizard))(?=.*(hunter|huntress|hunts(wo)?m(e|a)n)).*$/i;

/*	the Modern Magic Unearthed Arcana of 2015-08-03
	(http://media.wizards.com/2015/downloads/dnd/UA_ModernMagic.pdf)
	
	That article also references another WotC article: http://dnd.wizards.com/articles/features/my-new-d20-modern-campaign
	Both those articles, and thus this code by extension, are missing an explenation what "sidearms" or "long arms" are.
	
	This Unearthed Arcana article has some internal consistency problems that are open for interpertation and MPMB has chosen one of those
*/
//adds three subclasses: a subclass for the Cleric, called "City Domain"
ClassSubList["city domain"] = {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(urban|city)).*$/i,
	subname : "City Domain",
	source: ["UA:MM", 1],
	spellcastingExtra : ["comprehend languages", "remote access", "find vehicle", "heat metal", "lightning bolt", "protection from ballistics", "locate creature", "synchronicity", "commune with city", "shutdown"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Cantrip",
			source: ["UA:MM", 1],
			minlevel : 1,
			description : "\n   " + "I learn the On/Off cantrip if I didn't already know it",
			spellcastingBonus : {
				name : "Bonus Cantrip (On/Off)",
				spells : ["on/off"],
				selection : ["on/off"]
			}
		},
		"subclassfeature1.1" : {
			name : "Bonus Proficiency",
			source: ["UA:MM", 1],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with sidearms and land vehicles",
			weapons : [false, false, ["Sidearms"]],
			eval: "AddTool('Hacking Tools', 'City Domain');",
			removeeval: "RemoveTool('Hacking Tools');"
		},
		"subclassfeature1.2" : {
			name : "Heart of the City",
			source: ["UA:MM", 1],
			minlevel : 1,
			description : desc([
				"While I'm in a city, I can gain adv. on a Cha (Deception, Intimidation, Persuasion) check",
				"I'm considered proficient with the appropriate skill for that one check"
			]),
			usages: "Wisdom modifier per ",
			usagescalc: "event.value = Math.max(1, tDoc.getField('Wis Mod').value);",
			recovery: "long rest"
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Spirits of the City",
			source: ["UA:MM", 1],
			minlevel : 2,
			description : desc([
				"As an action, I make all city utilities in 30 ft either stop or work perfectly for 1 min",
				"Additionally, all hostiles within 30 ft must make a Cha save at the time of use",
				"If failed, it is either knocked prone or restrained (my choice) by city hazards",
				"A restrained target can escape with an Athletics or Acrobatics check vs. my spell DC"
			]),
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Block Watch",
			source: ["UA:MM", 2],
			minlevel : 6,
			description : "\n   " + "While in an urban environment, I'm proficient and expertise in Insight and Perception"
		},
		"subclassfeature8" : {
			name : "Divine Strike",
			source: ["UA:MM", 2],
			minlevel : 8,
			description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
			additional : levels.map(function (n) {
				if (n < 8) return "";
				return "+" + (n < 14 ? 1 : 2) + "d8 psychic damage";
			}),
			calcChanges : {
				atkAdd : ["if (classes.known.cleric && classes.known.cleric.level > 7 && !isSpell) {fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 psychic damage'; }; ", "Once per turn, I can have one of my weapon attacks that hit do extra psychic damage."]
			}
		},
		"subclassfeature17" : {
			name : "Express Transit",
			source: ["UA:MM", 2],
			minlevel : 17,
			description : desc([
				"As an action, I can teleport from one mass transit site to another in the same city",
				"This works just like a Teleport spell; Mass transits sites include bus/train/subway stops"
			]),
			usages : 1,
			recovery : "short rest",
			action : ["action", ""]
		},
	},
};
ClassList.cleric.subclasses[1].push("city domain");

//a subclass for the Warlock, called "Ghost in the Machine"
ClassSubList["warlock-ghost in the machine"] = {
	regExpSearch : /^(?=.*warlock)(?=.*ghost)(?=.*(machine|computer)).*$/i,
	subname : "the Ghost in the Machine",
	source : ["UA:MM", 2],
	spellcastingExtra : ["infallible relay", "remote access", "arcane hacking", "digital phantom", "haywire", "invisibility to cameras", "conjure knowbot", "system backdoor", "shutdown", "synchronicity"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiency",
			source : ["UA:MM", 2],
			minlevel : 1,
			description : "\n   " + "I am proficient with hacking tools and know the On/Off cantrip",
			eval: "AddTool('Hacking Tools', 'City Domain');",
			removeeval: "RemoveTool('Hacking Tools');",
			spellcastingBonus : {
				name : "Bonus Cantrip (On/Off)",
				spells : ["on/off"],
				selection : ["on/off"]
			}
		},
		"subclassfeature1.1" : {
			name : "Information Surge",
			source : ["UA:MM", 2],
			minlevel : 1,
			description : desc([
				"As an action, I can cause a computerized device within 30 ft to make an Int save",
				"If the device is held/used by a creature, that creature makes the saving throw",
				"If the device is not held/used, it makes a save with a +0 modifier and disadvantage",
				"On a failed save, the device stops functioning until the end of my next turn"
			]),
			usages : 1,
			recovery : "short rest",
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Wire Walk",
			source : ["UA:MM", 3],
			minlevel : 6,
			description : desc([
				"As a bonus action, I can teleport through a hardwired network to a point I can see",
				"Both where I start and end must be a device, cable, or socket connected to the network"
			]),
			usages : 1,
			recovery : "long rest",
			action : ["bonus action", ""]
		},
		"subclassfeature10" : {
			name : "Personal Encryption",
			source : ["UA:MM", 3],
			minlevel : 10,
			description : desc([
				"I have adv. on saves vs. scrying, thought detection, and magics for learning my location",
				"If the effect doesn't let me a save, the user has disadv. on checks to use it on me, if any"
			])
		},
		"subclassfeature14" : {
			name : "Technovirus",
			source : ["UA:MM", 3],
			minlevel : 14,
			description : desc([
				"As an action, I make a melee spell attack to infect someone with a techno-organic virus",
				"The target takes 8d10 psychic damage, or half that with a successful Con save",
				"If it failed its save, I can use an action to cast Command on it while it remains infected",
				"It makes its save vs. this Command with disadvantage and I can cast it at any range",
				"It is infected until my next long rest; The virus can be removed with Lesser Restoration"
			]),
			usages : 1,
			recovery : "long rest",
			action : ["action", ""]
		}
	}
};
ClassList.warlock.subclasses[1].push("warlock-ghost in the machine");

//a subclass for the Wizard, called "Technomancy"
//this code was contributed by AKA_Sketch
ClassSubList["technomancy"] = {
	regExpSearch: /technomancy|technomancer/i,
	subname: "Technomancy",
	source: ["UA:MM", 3],
	fullname: "Technomancer",
	features: {
		"subclassfeature2": {
			name: "Bonus Proficiencies",
			source: ["UA:MM", 3],
			minlevel: 2,
			description: "\n   " + "I gain proficiency with sidearms and hacking tools",
			weapons : [false, false, ["Sidearms"]],
			eval: "AddTool('Hacking Tools', 'Technomancer');",
			removeeval: "RemoveTool('Hacking Tools');"
		},
		"subclassfeature2.1": {
			name: "Technological Savant",
			source: ["UA:MM", 3],
			minlevel: 2,
			description: desc([
				"I can use a single tablet computer (or similar) instead of a spellbook",
				"Spells copied into this device cost half the normal amount of gp"
			])
		},
		"subclassfeature6": {
			name: "Program Spell",
			source: ["UA:MM", 4],
			minlevel: 6,
			description: desc([
				"I can cast a spell into a device of at least smartphone-level of computing power",
				"Variables of the spell are chosen at time of casting; I can have only one active at a time",
				"As an action within the next 48 hours, the spell can be cast from the device",
				"I can't activate a concentration spell in this way if I am concentrating on another spell"
			]),
			recovery: "long rest",
			usages: 1
		},
		"subclassfeature10": {
			name: "Online Casting",
			source: ["UA:MM", 4],
			minlevel: 10,
			description: desc([
				"I can cast a spell, that is not area-of-effect, through networked electronic devices",
				"If the spell requires sight/hearing, the audio/visual must be transmitted electronically",
				"The spell's range is determined from me to my device plus from the target to its device"
			]),
			usages: "Intelligence modifier per ",
			usagescalc: "event.value = Math.max(1, tDoc.getField('Int Mod').value);",
			recovery: "long rest"
		},
		"subclassfeature14": {
			name: "Chained Device",
			source: ["UA:MM", 4],
			minlevel: 14,
			description: "\n   " + "I can use a held/worn tablet computer to concentrate on a spell I cast instead of me" + "\n   " + "If the device is separated from me, turned off, or broken, the effect is lost",
			recovery: "long rest",
			usages: 1
		}
	}
};
ClassList.wizard.subclasses[1].push("technomancy");

/*	the Prestige Classes and Rune Magic Unearthed Arcana of 2015-10-05
	(http://media.wizards.com/2015/downloads/dnd/UA_Rune_Magic_Prestige_Class.pdf)
*/
//adds a prestige class, called "Rune Scribe"
//this code was contributed by K.12
ClassList["rune scribe"] = {
	regExpSearch : /^(?=.*rune)(?=.*scribe).*$/i,
	name : "Rune Scribe",
	source : ["UA:PCRM", 2],
	primaryAbility : "\n \u2022 Rune Scribe: Dexterity, Intelligence;",
	prereqs : "\n \u2022 Rune Scribe:\n   - Dexterity 13, Intelligence 13;\n   - Proficiency in the Arcana skill\n   - Complete a special task: You must find a rune and present it to an NPC rune scribe who accepts it in return for tutoring you in the ways of rune magic.",
	die : 8,
	improvements : levels.map(function (n) {return 0}),
	saves : ["", ""],
	skills : [""],
	tools : ["", ["Calligrapher's Supplies", "Mason's Tools", "Woodcarver's Tools"]],
	armor : [
		[false, false, false, false]
	],
	weapons : [
		[false, false]
	],
	equipment : "",
	subclasses : ["", []],
	prestigeClassPrereq : 5,
	attacks : levels.map(function (n) {return 1}),
	spellcastingFactor : 1,
	features : {
		"rune lore" : {
			name : "Rune Lore",
			source : ["UA:PCRM", 3],
			minlevel : 1,
			description : desc([
				"I learn the basics of scribing runes, and can activate all properties of a master rune",
				"The first rune I master is the one I found to qualify to become a rune scribe",
				"To use any features of a master rune, I need to first attune to it just like a magic item",
				"Use the \"Choose Feature\" button above to add master runes to the third page"
			]),
			extraname : "Master Rune",
			extrachoices : ["Opal of the Ild Rune", "Orb of the Stein Rune", "Pennant of the Vind Rune", "Shard of the Kalt Rune"],	
			"opal of the ild rune" : {
				name : "Opal of the Ild Rune",
				source : ["UA:PCRM", 4],
				description : " [rare, requires attunement]" + desc([
					"- Ignite (simple): As an action, ignite touched flammable object; Fire extends 1 ft from it",
					"- Fire Tamer (simple): As an action, extinguish touched open flame up to 10-ft radius",
					"   I can expend a spell slot to extend that radius by 20 ft/SL",
					"- Fire's Friend (simple): While attuned, I have resistance to cold damage",
					"- Combustion (complex): As an action, I expend spell slot and touch a creature",
					"   The target automatically takes 1d10 + 1d10/SL fire damage",
					"- Flame Brand (complex): During a short rest, I can augment a weapon, or 20 ammo",
					"   The weapon or ammo deals fire damage; It lasts for 24 hours or until I use this again",
					"   I can expend a spell slot to also give the weapon a magic bonus of slot level dived by 3",
					"- Flame Stoker (complex): While attuned, I roll any fire damage twice and use the higher"
				]),
				eval : "AddResistance('Cold', 'Opal of the Ild Rune'); AddAction('action', 'Ild Rune (Ignite, Fire Tamer, Combusion)', 'Opal of the Ild Rune');",
				removeeval : "RemoveResistance('Cold'); RemoveAction('action', 'Ild Rune (Ignite, Fire Tamer, Combusion)');"
			},
			"orb of the stein rune" : {
				name : "Orb of the Stein Rune",
				source : ["UA:PCRM", 5],
				description : " [rare, requires attunement]" + desc([
					"- Indomitable Stand (simple): As an action, I gain abilities until I move",
					"   I have advantage on all ability checks and saving throws to resist being moved",
					"   Anyone moving within 10 ft makes a DC 12 Str save or has speed 0 until its next turn",
					"- Stone Soul (simple): While attuned, I cannot be petrified",
					"- Stone's Secrets (simple): As an action, I learn everybody's current location within 30 ft",
					"   They have to touch the same surface as I'm touching with my hand",
					"- Crushing Brand (complex): During a short rest, I can augment a bludgeoning weapon",
					"   The weapon's bludgeoning damage ignores resistances and immunities",
					"   If the weapon deals its maximum damage, the target is also knocked prone",
					"   I can expend a spell slot to also give the weapon a magic bonus of slot level dived by 3",
					"   These effects last for 24 hours or until I use Crushing Brand again",
					"- Earthen Step (complex): I can cast Meld Into Stone as a bonus action once per short rest",
					"- Overwhelming Bolt (complex): As an action, I expend spell slot and touch a creature",
					"   It takes 2d8+1d8/SL bludg. dmg and is prone; DC 12+SL Str save for half \u0026 not prone"
				]),
				eval : "AddAction('bonus action', 'Stein Rune (Earthen Step)', 'Orb of the Stein Rune'); AddAction('action', 'Stein Rune (Indomitable Stand, Secrets, Bolt)', 'Orb of the Stein Rune');",
				removeeval : "RemoveAction('bonus action', 'Stein Rune (Earthen Step)'); RemoveAction('action', 'Stein Rune (Indomitable Stand, Secrets, Bolt)');",
				save : "Immune to being Petrified",
				spellcastingBonus : {
					name : "Orb of the Stein Rune",
					spells : ["meld into stone"],
					selection : ["meld into stone"], 
					oncesr : true
				}
			},
			"pennant of the vind rune" : {
				name : "Pennant of the Vind Rune",
				source : ["UA:PCRM", 5],
				description : " [rare, requires attunement]" + desc([
					"- Comforting Wind (simple): While attuned, I can't suffocate or drown",
					"   Also, I gain advantage on saves against inhaled poisons, toxins, and similar effects",
					"- Wind Step (simple): As an action, I fly 20 ft, after which I fall if I'm still airborne",
					"- Wind's Grasp (simple): As a reaction when falling, I can take no damage from the fall",
					"- Howling Brand (complex): During a short rest, I can augment a ranged weapon",
					"   Its range is doubled and attacks with it do not suffer disadvantage due to range",
					"   I can expend a spell slot to also give the weapon a magic bonus of slot level dived by 3",
					"   These effects last for 24 hours or until I use Howling Brand again",
					"- Shrieking Bolt (complex): As an action, I expend spell slot to target a creature I can see",
					"   It 2d8+1d8/SL bludg. dmg \u0026 pushed 10 ft; DC 12+SL Str save for half \u0026 not pushed",
					"- Wind Walker (complex): I can cast Levitate as a bonus action once per short rest"
				]),
				eval : "AddAction('bonus action', 'Vind Rune (Wind Walker)', 'Pennant of the Vind Rune'); AddAction('action', 'Vind Rune (Wind Step, Shrieking Bolt)', 'Pennant of the Vind Rune'); AddAction('reaction', 'Vind Rune (Wind\\'s Grasp)', 'Pennant of the Vind Rune');",
				removeeval : "RemoveAction('bonus action', 'Vind Rune (Wind Walker)'); RemoveAction('action', 'Vind Rune (Wind Step, Shrieking Bolt)'); RemoveAction('reaction', 'Vind Rune (Wind Step, Shrieking Bolt)');",
				save : "Adv. on saves vs. inhaled poisons and similar effects",
				spellcastingBonus : {
					name : "Pennant of the Vind Rune",
					spells : ["levitate"],
					selection : ["levitate"], 
					oncesr : true
				}
			},
			"shard of the kalt rune" : {
				name : "Shard of the Kalt Rune",
				source : ["UA:PCRM", 6],
				description : " [rare, requires attunement]" + desc([
					"- Frigid Touch (simple): As an action, I freeze water that I touch a 10-ft radius",
					"- Frost Friend (simple): While attuned, I have resistance to fire damage",
					"- Icy Mantle (simple): As an action, me or a creature I touch gains a protective mantle",
					"   The next time taking bludg., slash., pierc. damage, it absorbs the damage and falls apart",
					"- Freezing Bolt (complex): As an action, I expend spell slot and touch a creature",
					"   It takes 2d8+1d8/SL cold damage and its speed is 0 until the end of my next turn",
					"   If it succeeds on a DC 12+SL Con save, it takes only half damage and has normal speed",
					"- Ice Brand (complex):  During a short rest, I can augment a weapon, or 20 ammo pieces",
					"   The weapon or ammo deals cold damage; It lasts for 24 hours or until I use this again",
					"   I can expend a spell slot to also give the weapon a magic bonus of slot level dived by 3",
					"- Winter's Howl (complex): I can cast Sleet Storm as an action once per short rest"
				]),
				eval : "AddResistance('Fire', 'Shard of the Kalt Rune'); AddAction('action', 'Kalt Rune (Touch, Mantle, Bolt, Howl)', 'Shard of the Kalt Rune');",
				removeeval : "RemoveResistance('Fire'); RemoveAction('action', 'Kalt Rune (Touch, Mantle, Bolt, Howl)');",
				spellcastingBonus : {
					name : "Shard of the Kalt Rune",
					spells : ["sleet storm"],
					selection : ["sleet storm"],
					oncesr : true
				}
			}
		},
		"runic magic" : {
			name : "Runic Magic",
			source : ["UA:PCRM", 3],
			minlevel : 1,
			description : "\n   " + "I obtain spell slots as if gaining a level in a full spellcasting class, but don't learn spells"
		},
		"runic discovery" : {
			name : "Runic Discovery",
			source : ["UA:PCRM", 3],
			minlevel : 2,
			description : desc([
				"I know a number of master runes which I can attune to, even if not in my possession",
				"Attuning or de-attuning in this manner can be done over the course of a short rest"
			]),
			additional : levels.map(function (n) {
				if (n < 2) return "";
				return (n < 3 ? 1 : n < 5 ? 2 : 3) + " known master runes";
			})
		},
		"living rune" : {
			name : "Living Rune",
			source : ["UA:PCRM", 3],
			minlevel : 4,
			description : desc([
				"I get 2 points that I can add to one or two of my ability scores as I see fit",
				"When I finish a long rest, I can re-allocate these point(s) from a single score to another"
			])
		},
		"rune mastery" : {
			name : "Rune Mastery",
			source : ["UA:PCRM", 3],
			minlevel : 5,
			description : "\n   " + "One rune I'm attuned to doesn't count toward the limit of magic items I can attune to"
		}
	}
};

/*	the Light, Dark, Underdark! Unearthed Arcana of 2015-11-02
	(http://media.wizards.com/2015/downloads/dnd/02_UA_Underdark_Characters.pdf)
*/
//adds three subclasses: a subclass for the Ranger, called "Deep Stalker"
ClassSubList["deep stalker"] = {
	regExpSearch : /^(?=.*deep)(?=.*stalker).*$/i,
	subname : "Deep Stalker",
	source : ["UA:LDU", 1],
	fullname : "Deep Stalker",
	features : {
		"subclassfeature3" : {
			name : "Underdark Scout",
			source : ["UA:LDU", 1],
			minlevel : 3,
			description : "\n   " + "In the first turn of combat I have +10 ft speed and +1 attack with the Attack action" + "\n   " + "All turns after that, I can take the Hide action as a bonus action at the end of my turn",
			action : ["bonus action", " (Hide at end of turn)"]
		},
		"subclassfeature3.1" : {
			name : "Deep Stalker Magic",
			source : ["UA:LDU", 2],
			minlevel : 3,
			description : "\n   " + "I have 90 ft darkvision and add a spell to my known spells at level 3, 5, 9, 13, and 15" + "\n   " + "These count as ranger spells, but do not count against the number of spells I can know",
			spellcastingExtra : ["disguise self", "rope trick", "glyph of warding", "greater invisibility", "seeming"],
			eval : "RemoveString(\"Vision\", \"Darkvision 60 ft\"); AddString(\"Vision\",\"Darkvision 90 ft\", \"; \");",
			removeeval : "RemoveString(\"Vision\", \"Darkvision 90 ft\");"
		},
		"subclassfeature7" : {
			name : "Iron Mind",
			source : ["UA:LDU", 2],
			minlevel : 7,
			description : "\n   " + "I am proficient with Wisdom saving throws",
			eval : "Checkbox(\"Wis ST Prof\", true, \"Proficiency with Wisdom saving throws was gained from Deep Stalker (Iron Mind)\");",
			removeeval : "Checkbox(\"Wis ST Prof\", false, \"\");",
		},
		"subclassfeature11" : {
			name : "Stalker's Flurry",
			source : ["UA:LDU", 2],
			minlevel : 11,
			description : "\n   " + "Once during my turn when I miss an attack, I can immediately make an extra attack",
		},
		"subclassfeature15" : {
			name : "Stalker's Dodge",
			source : ["UA:LDU", 2],
			minlevel : 15,
			description : "\n   " + "As a reaction when I'm attacked without adv., I can impose disadv. on the attack roll",
			action : ["reaction", " (when attacked)"]
		},
	}
};
ClassSubList["deep stalker"].features["subclassfeature3.1"].spellcastingExtra[100] = "AddToKnown";
ClassList.ranger.subclasses[1].push("deep stalker");

//a subclass for the Sorcerer, called "Shadow"
ClassSubList["shadow sorcerer"] = {
	regExpSearch : /^(?=.*(sorcerer|witch))(?=.*shadow).*$/i,
	subname : "Shadow",
	source : ["UA:LDU", 2],
	fullname : "Shadow Sorcerer",
	features : {
		"subclassfeature1" : {
			name : "Eyes of the Dark",
			source : ["UA:LDU", 2],
			minlevel : 1,
			description : "\n   " + "I have 60 ft darkvision and can cast Darkness by spending 1 sorcery point" + "\n   " + "I can see through any darkness spell I cast using this ability",
			additional : "1 sorcery point",
			eval : "AddString(\"Vision\",\"Darkvision 60 ft\", \"; \");",
			removeeval : "RemoveString(\"Vision\", \"Darkvision 60 ft\");",
			action : ["action", " (1 sorcery point)"],
			spellcastingBonus : {
				name : "Eyes of the Dark",
				spells : ["darkness"],
				selection : ["darkness"],
				firstCol : 1
			}
		},
		"subclassfeature1.1" : {
			name : "Strength of the Grave",
			source : ["UA:LDU", 2],
			minlevel : 1,
			description : "\n   " + "When damage reduces me to 0 HP, that isn't radiant damage or a critical hit," + "\n   " + "I can make a Constitution save (DC 5 + damage taken) to drop to 1 HP instead"
		},
		"subclassfeature6" : {
			name : "Hound of Ill Omen",
			source : ["UA:LDU", 2],
			minlevel : 6,
			additional : "3 sorcery points",
			description : "\n   " + "As a bonus action, I target a creature I can see and summon a hound within 30 ft of it" + "\n   " + "The hound has all the stats of a medium sized dire wolf with the following exceptions:" + "\n    - " + "At the start of its turn, it automatically knows where the target is" + "\n    - " + "It can only move towards and make (opportunity) attack against the target" + "\n    - " + "It can move through other creatures and objects as if they were difficult terrain" + "\n    - " + "It take 5 force damage if it ends its turn inside an object" + "\n   " + "The target has disadvantage on saves vs. my spells while the hound is within 5 ft of it",
			action : ["bonus action", " (3 sorcery points)"]
		},
		"subclassfeature14" : {
			name : "Shadow Walk",
			source : ["UA:LDU", 3],
			minlevel : 14,
			description : "\n   " + "As a bonus action when I'm in dim light or darkness, I can teleport up to 120 ft" + "\n   " + "The destination has to be unoccupied, within line of sight, and in dim light or darkness",
			action : ["bonus action", ""]
		},
		"subclassfeature18" : {
			name : "Shadow Form",
			source : ["UA:LDU", 3],
			minlevel : 18,
			additional : "3 sorcery points",
			description : "\n   " + "As a bonus action, I transform into a shadow form for 1 minute" + "\n   " + "While transformed, I have resistance to all damage types except force damage" + "\n   " + "Also, I can move through other creatures and objects as if they were difficult terrain" + "\n   " + "I take 5 force damage if I end my turn inside an object",
			action : ["bonus action", " (3 sorcery points)"]
		}
	}
};
ClassList.sorcerer.subclasses[1].push("shadow sorcerer");

//a subclass for the Warlock, called "The Undying Light"
ClassSubList["the undying light"] = {
	regExpSearch : /^(?=.*warlock)(?=.*light)(?=.*(immortal|undying|neverending|unending)).*$/i,
	subname : "the Undying Light",
	source : ["UA:LDU", 3],
	spellcastingExtra : ["burning hands", "flaming sphere", "daylight", "fire shield", "flame strike"],
	features : {
		"subclassfeature1" : {
			name : "Radiant Soul",
			source : ["UA:LDU", 3],
			minlevel : 1,
			description : "\n   " + "I add my Cha modifier to cantrips/spells I cast that deal fire or radiant damage" + "\n   " + "I have resistance to radiant damage and know the Light and Sacred Flame cantrips",
			spellcastingBonus : [{
				name : "Radiant Soul",
				spells : ["light"],
				selection : ["light"],
			}, {
				name : "Radiant Soul",
				spells : ["sacred flame"],
				selection : ["sacred flame"],
			}],
			eval : "AddResistance(\"Radiant\", \"Warlock (the Undying Light)\");",
			removeeval : "RemoveResistance(\"Radiant\");",
			calcChanges : {
				atkCalc : ["if (isSpell && (/fire|radiant/i).test(fields.Damage_Type)) { output.extraDmg += What('Cha Mod'); }; ", "Cantrips and spells that deal fire or radiant damage get my Charisma modifier added to the damage."]
			}
		},
		"subclassfeature6" : {
			name : "Searing Vengeance",
			source : ["UA:LDU", 3],
			minlevel : 6,
			description : "\n   " + "When I would make a death saving throw, I can instead spring back to my feet" + "\n   " + "I immediately stand up and recover HP equal to half my current HP maximum" + "\n   " + "Also, all hostiles within 30 ft of me take 10 + Charisma modifier in radiant damage" + "\n   " + "Damaged creatures are blinded until the end of my next turn",
			usages : 1,
			recovery : "long rest",
		},
		"subclassfeature10" : {
			name : "Radiant Resilience",
			source : ["UA:LDU", 4],
			minlevel : 10,
			description : "\n   " + "When I finish a short or long rest, I and up to five allies gain temporary hit points" + "\n   " + "I get my warlock level + Cha mod, while my allies get half my warlock level + Cha mod",
		},
		"subclassfeature14" : {
			name : "Healing Light",
			source : ["UA:LDU", 4],
			minlevel : 14,
			description : "\n   " + "As a bonus action, I touch a creature and heal it by expending dice from my pool" + "\n   " + "I subtract the number of d6's used from my pool; I can expend up to 5d6 at a time" + "\n   " + "The target heals HP equal to the roll of the dice; I regain expended uses with a long rest",
			usages : "15d6 per ",
			usagescalc : "event.value = \"15d6\";",
			recovery : "long rest",
			action : ["bonus action", ""]
		}
	}
};
ClassList.warlock.subclasses[1].push("the undying light");

/*	the Kits of Old Unearthed Arcana of 2016-01-04
	(http://media.wizards.com/2015/downloads/dnd/04_UA_Classics_Revisited.pdf)
*/
//adds four subclasses: a subclass for the Bard, called "College of Swords"
ClassSubList["college of swords"] = {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*\bswords?\b).*$/i,
	subname : "College of Swords",
	source : ["UA:KoO", 1],
	attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiencies",
			source : ["UA:KoO", 1],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with medium armor and scimitars",
			armor : [false, true, false, false],
			weapons : [false, false, ["scimitar"]]
		},
		"subclassfeature3.1" : {
			name : "Two-Weapon Fighting Style",
			source : ["UA:KoO", 1],
			minlevel : 3,
			description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks",
			calcChanges : {
				atkCalc : ["if (isOffHand) {output.modToDmg = true; }; ", "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks."]
			}
		},
		"subclassfeature3.2" : {
			name : "Blade Flourish",
			source : ["UA:KoO", 1],
			minlevel : 3,
			description : "\n   " + "When I take the Attack action on my turn, I can do one of the following flourishes:" + "\n   " + "I have to use a dagger, longsword, rapier, scimitar, or shortsword while doing this" + "\n    - " + "Defensive Flourish [one Bardic Inspiration die]" + "\n       " + "As a bonus action, I add the die to my AC until the start of my next turn" + "\n    - " + "Trick Shooter's Flourish [one Bardic Inspiration die]" + "\n       " + "As a bonus action with a dagger ranged attack, I add the die to the attack roll" + "\n       " + "If the target is an unattended, inanimate object, the result of the die is doubled" + "\n    - " + "Unnerving Flourish [one Bardic Inspiration die]" + "\n       " + "As a bonus action when reducing a foe to 0 HP with a melee attack, I leave it alive" + "\n       " + "The target stays at 1 HP and is frightened of me for my Cha modifier in minutes" + "\n       " + "It must also make a Cha save at a DC of my spell save + the bardic inspiration die" + "\n       " + "If failed, it answers truthfully any questions I ask and obeys me while frightened",
			action : ["bonus action", " (one inspiration die)"]
		},
		"subclassfeature14" : {
			name : "Battle Magic",
			source : ["UA:KoO", 2],
			minlevel : 14,
			description : "\n   " + "When I use my action to cast a Bard spell, I can make one bonus action weapon attack",
			action : ["bonus action", " (with Bard spell)"]
		}
	}
};
ClassList.bard.subclasses[1].push("college of swords");

//a subclass for the Bard, called "College of Satire"
ClassSubList["college of satire"] = {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*satire).*$/i,
	subname : "College of Satire",
	source : ["UA:KoO", 2],
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiencies",
			source : ["UA:KoO", 2],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with thieves' tools, sleight of hand, and one other skill of my choice",
			skills : ["Sleight of Hand"],
			skillstxt : "\n\n" + toUni("College of Satire") + ": Thieves' Tools, Sleight of Hand, and any one other skill.",
			eval : "AddTool(\"Thieves' Tools\", \"Bard (College of Satire)\")",
			removeeval : "RemoveTool(\"Thieves' Tools\", \"Bard (College of Satire)\")",
		},
		"subclassfeature3.1" : {
			name : "Tumbling Fool",
			source : ["UA:KoO", 2],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I tumble which gives the benefits of the Dash and Disengage actions" + "\n   " + "I also gain a climbing speed at my current speed and half damage from falling",
			action : ["bonus action", ""]
		},
		"subclassfeature6" : {
			name : "Fool's Insight",
			source : ["UA:KoO", 2],
			minlevel : 6,
			description : "\n   " + "I can cast Detect Thoughts, but on a save the target suffers an embarrassing social gaffe",
			usages : "Charisma modifier per ",
			usagescalc : "event.value = Math.max(1, this.getField(\"Cha Mod\").value);",
			recovery : "long rest",
			action : ["action", " (Detect Thoughts)"],
		},
		"subclassfeature14" : {
			name : "Fool's Look",
			source : ["UA:KoO", 3],
			minlevel : 14,
			description : " [one bardic inspiration die]" + "\n   " + "When I fail an ability check, saving throw, or attack roll, I can add one inspiration die" + "\n   " + "If this turns the roll into a success, I have to note down the number rolled" + "\n   " + "I can't use this ability again until the DM subtracts the amount from a check or attack",
			usages : 1,
			recovery : "reset",
		},
	}
};
ClassList.bard.subclasses[1].push("college of satire");

//a subclass for the Fighter, called "Cavalier"
ClassSubList["cavalier"] = {
	regExpSearch : /cavalier/i,
	subname : "Cavalier",
	source : ["UA:KoO", 3],
	fullname : "Cavalier",
	abilitySave : 1,
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiencies",
			source : ["UA:KoO", 3],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with two skills or one skill and any one tool" + "\n   " + "For skills I can choose from Animal Handling, Insight, Performance, or Persuasion",
			skillstxt : "\n\n" + toUni("Cavalier") + ": Choose two skills from: Animal Handling, Insight, Performance, or Persuasion. - or - Choose one of those skills and any one tool."
		},
		"subclassfeature3.1" : {
			name : "Born in the Saddle",
			source : ["UA:KoO", 3],
			minlevel : 3,
			description : "\n   " + "I have advantage on saves to avoid falling off my mount, and land on my feet if I fail" + "\n   " + "Mounting or dismounting a creature costs me only 5 ft of movement instead of half",
			save : "Adv. to avoid falling off my mount"
		},
		"subclassfeature3.2" : {
			name : "Combat Superiority",
			source : ["UA:KoO", 3],
			minlevel : 3,
			description : "\n   " + "I gain a number of superiority dice that I can use to fuel special maneuvers (see below)" + "\n   " + "I can use only one maneuver per attack; I regain all superiority dice after a short rest" + "\n    - " + "Use after rolling to influence/control an animal; I add the superiority die to the roll" + "\n    - " + "Use after rolling to hit; I add the superiority die to my attack roll" + "\n    - " + "Use on a mount, before rolling to hit with a lance; I add the die to the damage roll" + "\n       " + "Also, the target must make a Str save (DC 8 + Prof + Str mod) or be knocked prone" + "\n    - " + "As a reaction when I'm hit or my mount is hit, I add the superiority die to AC" + "\n       " + "If the attack still hits, I or my mount only take half damage from it",
			additional : ["", "", "d8", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d10", "d10", "d10", "d10", "d12", "d12", "d12"],
			usages : [0, 0, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6],
			recovery : "short rest",
			action : ["reaction", " (if hit/mount hit)"],
		},
		"subclassfeature7" : {
			name : "Ferocious Charger",
			source : ["UA:KoO", 3],
			minlevel : 7,
			usages : 1,
			recovery : "long rest",
			description : "\n   " + "I can use two superiority dice, instead of just one, to increase the damage of my lance" + "\n   " + "If doing so, the target has disadvantage on its Str save to avoid being knocked prone",
			action : ["action", ""]
		},
		"subclassfeature10" : {
			name : "Improved Combat Superiority",
			source : ["UA:KoO", 3],
			minlevel : 10,
			description : "\n   " + "My superiority dice turn into d10s at 10th level and into d12s at 18th level"
		},
		"subclassfeature15" : {
			name : "Relentless",
			source : ["UA:KoO", 4],
			minlevel : 15,
			description : "\n   " + "I regain one superiority die if I have no more remaining when I roll initiative"
		},
	}
};
ClassList.fighter.subclasses[1].push("cavalier");

//a subclass for the Fighter, called "Scout"
ClassSubList["scout"] = {
	regExpSearch : /scout/i,
	subname : "Scout",
	source : ["UA:KoO", 4],
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiencies",
			source : ["UA:KoO", 4],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with two skills or one skill and Thieves' Tools; For skills choose from:" + "\n   " + "Acrobatics, Athletics, Investigation, Medicine, Nature, Perception, Stealth, or Survival",
			skillstxt : "\n\n" + toUni("Scout") + ": Choose two skills from: Acrobatics, Athletics, Investigation, Medicine, Nature, Perception, Stealth, or Survival. - or - Choose one of those skills and Thieves' Tools.",
		},
		"subclassfeature3.1" : {
			name : "Combat Superiority",
			source : ["UA:KoO", 4],
			minlevel : 3,
			description : "\n   " + "I gain a number of superiority dice that I can use to fuel special maneuvers (see below)" + "\n   " + "I can use only one maneuver per attack; I regain all superiority dice after a short rest" + "\n    - " + "Use after rolling an Athletics, Nature, Perception, Stealth, or Survival check" + "\n       " + "I add half the superiority die to the roll (rounding up)" + "\n    - " + "Use after rolling to hit; I add the superiority die to my attack roll" + "\n    - " + "As a reaction when I'm hit while wearing light/medium armor, I add the die to AC" + "\n       " + "If the attack still hits, I only take half damage from it",
			additional : ["", "", "d8", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d10", "d10", "d10", "d10", "d12", "d12", "d12"],
			usages : [0, 0, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6],
			recovery : "short rest",
			action : ["reaction", " (if hit)"],
		},
		"subclassfeature3.2" : {
			name : "Natural Explorer",
			source : ["UA:KoO", 4],
			minlevel : 3,
			description : "\n   " + "Use the \"Choose Features\" button above to add a favored terrain to the third page",
			additional : ["", "", "1 favored terrain", "1 favored terrain", "1 favored terrain", "1 favored terrains", "2 favored terrains", "2 favored terrains", "2 favored terrains", "2 favored terrains", "2 favored terrains", "2 favored terrains", "2 favored terrains", "2 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains"],
			extraname : "Favored Terrain",
			extrachoices : ["Arctic", "Coast", "Desert", "Forest", "Grassland", "Mountain", "Swamp", "Underdark"],
			"arctic" : {
				name : "Arctic",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning arctic terrain" + "\n   " + "While traveling for an hour or more in arctic terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
			"coast" : {
				name : "Coast",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning coast terrain" + "\n   " + "While traveling for an hour or more in coast terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
			"desert" : {
				name : "Desert",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning desert terrain" + "\n   " + "While traveling for an hour or more in desert terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
			"forest" : {
				name : "Forest",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning forest terrain" + "\n   " + "While traveling for an hour or more in forest terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
			"grassland" : {
				name : "Grassland",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning grassland terrain" + "\n   " + "While traveling for an hour or more in grassland terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
			"mountain" : {
				name : "Mountain",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning mountain terrain" + "\n   " + "While traveling for an hour or more in mountain terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
			"swamp" : {
				name : "Swamp",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning swamp terrain" + "\n   " + "While traveling for an hour or more in swamp terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
			"underdark" : {
				name : "Underdark",
				source : ["P", 91],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning underdark terrain" + "\n   " + "While traveling for an hour or more in underdark terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
		},
		"subclassfeature10" : {
			name : "Improved Combat Superiority",
			source : ["UA:KoO", 4],
			minlevel : 10,
			description : "\n   " + "My superiority dice turn into d10s at 10th level and into d12s at 18th level"
		},
		"subclassfeature15" : {
			name : "Relentless",
			source : ["UA:KoO", 4],
			minlevel : 15,
			description : "\n   " + "I regain one superiority die if I have no more remaining when I roll initiative"
		},
	}
};
ClassList.fighter.subclasses[1].push("scout");

/*	the Gothic Heroes Unearthed Arcana of 2016-04-04
	(http://dnd.wizards.com/sites/default/files/media/upload/articles/UA%20Gothic%20Characters.pdf)
*/
//adds two subclasses: a subclass for the Fighter, called "Monster Hunter"
ClassSubList["monster hunter"] = {
	regExpSearch : /^(?=.*monster)(?=.*hunter).*$/i,
	subname : "Monster Hunter",
	source : ["UA:GH", 2],
	fullname : "Monster Hunter",
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiencies",
			source : ["UA:GH", 2],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with two skills or one skill and any one tool" + "\n   " + "For skills I can choose Arcana, History, Insight, Investigation, Nature, or Perception",
			skillstxt : "\n\n" + toUni("Monster Hunter") + ": Choose two skills from: Arcana, History, Insight, Investigation, Nature, or Perception. - or - Choose one of those skills and any one tool.",
		},
		"subclassfeature3.1" : {
			name : "Combat Superiority",
			source : ["UA:GH", 2],
			minlevel : 3,
			description : "\n   " + "I gain a number of superiority dice that I can use to fuel special maneuvers (see below)" + "\n   " + "I can use only one maneuver per attack; I regain all superiority dice after a short rest" + "\n    - " + "Use after rolling to hit; I add the superiority die to my attack roll" + "\n    - " + "Use after damaging a creature; I add the superiority die to the damage roll" + "\n       " + "Also, the attack imposes disadvantage on any concentration save resulting from it" + "\n    - " + "Use after Int/Wis/Cha save, before knowing success/fail; add the die to the save total" + "\n    - " + "Use with Wis (Perception) to detect hidden or Wis (Insight) to see if lying to me" + "\n       " + "After rolling but before knowing if success/fail; I add the superiority die to the check",
			additional : ["", "", "d8", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d10", "d10", "d10", "d10", "d12", "d12", "d12"],
			usages : [0, 0, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6],
			recovery : "short rest"
		},
		"subclassfeature3.2" : {
			name : "Hunter's Mysticism",
			source : ["UA:GH", 2],
			minlevel : 3,
			usages : 1,
			recovery : "long rest",			
			description : "\n   " + "I can cast Detect Magic as a ritual and Protection from Evil & Good once per long rest" + "\n   " + "I gain the ability to speak one of the following languages: Abyssal, Celestial, or Infernal",
			action : ["action", " (Prot vs. Evil/Good)"],
			eval : "AddLanguage(\"Abyssal, Celestial, or Infernal\", \"Monster Hunter (Hunter's Mysticism)\");",
			removeeval : "RemoveLanguage(\"Abyssal, Celestial, or Infernal\", \"Monster Hunter (Hunter's Mysticism)\");"
		},
		"subclassfeature7" : {
			name : "Monster Slayer",
			source : ["UA:GH", 2],
			minlevel : 7,
			usages : 1,
			recovery : "long rest",
			description : "\n   " + "Whenever I use a superiority die, I can choose to expend two, adding both to the roll" + "\n   " + "If the target is an aberration, fey, fiend, or undead, both dice deal maximum damage",
			action : ["action", ""]
		},
		"subclassfeature10" : {
			name : "Improved Combat Superiority",
			source : ["UA:GH", 2],
			minlevel : 10,
			description : "\n   " + "My superiority dice turn into d10s at 10th level and into d12s at 18th level"
		},
		"subclassfeature15" : {
			name : "Relentless",
			source : ["UA:GH", 2],
			minlevel : 15,
			description : "\n   " + "I regain one superiority die if I have no more remaining when I roll initiative"
		},
	}
};
ClassList.fighter.subclasses[1].push("monster hunter");

//a subclass for the Rogue, called "Inquisitive"
ClassSubList["inquisitive"] = {
	regExpSearch : /^(?=.*(rogue|miscreant))(?=.*inquisitive).*$/i,
	subname : "Inquisitive",
	source : ["UA:GH", 3],
	features : {
		"subclassfeature3" : {
			name : "Ear for Deceit",
			source : ["UA:GH", 3],
			minlevel : 3,
			description : "\n   " + "When using Wis (Insight) to sense if someone is lying, I can choose to use a fixed total" + "\n   " + "This total is 8 + Wis modifier + proficiency bonus (if proficient, or twice if expertise)",
		},
		"subclassfeature3.1" : {
			name : "Eye for Detail",
			source : ["UA:GH", 3],
			minlevel : 3,
			description : "\n   " + "I can use the bonus action granted by Cunning Action for the following as well:" + "\n    - " + "To make a Wisdom (Perception) check to spot a hidden creature or object" + "\n    - " + "To make an Intelligence (Investigation) check to uncover and decipher clues" + "\n    - " + "To use Insightful Fighting (see below)",
		},
		"subclassfeature3.2" : {
			name : "Insightful Fighting",
			source : ["UA:GH", 3],
			minlevel : 3,
			description : "\n   " + "As an action or bonus action, I can decipher the tactics of an active opponent I can see" + "\n   " + "I have to make a Wisdom (Insight) check vs. the target's Charisma (Deception) check" + "\n   " + "If I succeed, I can use sneak attack on the target regardless of advantage/disadvantage" + "\n   " + "This benefit lasts for 1 minute or until I successfully use Insightful Fighting again",
			action : ["action", ""]
		},
		"subclassfeature9" : {
			name : "Steady Eye",
			source : ["UA:GH", 3],
			minlevel : 9,
			usages : 1,
			recovery : "long rest",
			description : "\n   " + "If not moving during my turn, I gain adv. on Wis (Perception) to find hidden things",
		},
		"subclassfeature13" : {
			name : "Unerring Eye",
			source : ["UA:GH", 3],
			minlevel : 13,
			description : "\n   " + "As an action, I can sense magical deceptions within 30 feet of me, but not what it does" + "\n   " + "I know the presence of illusions, shapechanged creatures, or magic designed to deceive"
		},
		"subclassfeature17" : {
			name : "Eye for Weakness",
			source : ["UA:GH", 3],
			minlevel : 17,
			description : "\n   " + "While my Insightful Fighting is active, I add 2d6 to sneak attacks against that target"
		},
	}
};
ClassList.rogue.subclasses[1].push("inquisitive");

/*	The Faithful Unearthed Arcana of 2016-08-01
	(http://media.wizards.com/2016/dnd/downloads/UA%20Non-Divine%20Faithful%20SFG.pdf)
*/
//adds two subclasses: a subclass for the Warlock, called "The Seeker"
ClassSubList["the seeker"] = {
	regExpSearch : /^(?=.*warlock)(?=.*seeker).*$/i,
	subname : "the Seeker",
	source : ["UA:TF", 1],
	spellcastingExtra : ["feather fall", "jump", "levitate", "locate object", "clairvoyance", "sending", "arcane eye", "locate creature", "legend lore", "passwall"],
	features : {
		"subclassfeature1" : {
			name : "Shielding Aurora",
			source : ["UA:TF", 1],
			minlevel : 1,
			description : "\n   " + "As a bonus action, I create a whirling aurora of brilliant energy around me" + "\n   " + "It lasts until the end of my next turn and grants me resistance to all damage" + "\n   " + "Any hostile ending its turn in 10 ft of me get Warlock level + Cha mod radiant damage",
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"pact boon" : {},
		"subclassfeature6" : {
			name : "Astral Refuge",
			source : ["UA:TF", 2],
			minlevel : 6,
			description : "\n   " + "As an action, I can step into an astral refuge, coming back at the end of the turn" + "\n   " + "While in the astral refuge, I can take two actions to cast spells targeting just me",
			action : ["action", ""]
		},
		"subclassfeature10" : {
			name : "Far Wanderer",
			source : ["UA:TF", 2],
			minlevel : 10,
			description : "\n   " + "I no longer need to breathe, and I gain resistance to fire damage and cold damage",
			eval : "AddResistance(\"Fire\", \"Warlock (the Seeker)\"); AddResistance(\"Cold\", \"Warlock (the Seeker)\");",
			removeeval : "RemoveResistance(\"Fire\"); RemoveResistance(\"Cold\");"
		},
		"subclassfeature14" : {
			name : "Astral Sequestration",
			source : ["UA:TF", 2],
			minlevel : 14,
			description : "\n   " + "With a 5 minutes ritual, I can shift myself and ten willing creatures to the Astral Plane" + "\n   " + "While sequestered an Astral Plane, we gain the full benefits of a short rest" + "\n   " + "After this rest, we return to the same space as before, without any time having passed",
			usages : 1,
			recovery : "long rest",
		}
	}
};
ClassList.warlock.subclasses[1].push("the seeker");

//a subclass for the Wizard, called "Theurgy"
ClassSubList["theurgy"] = {
	regExpSearch : /^((?=.*mystic)(?=.*theurge))|(?=.*(theurgy|theurgist)).*$/i,
	subname : "Theurgy",
	source : ["UA:TF", 1],
	fullname : "Theurgist",
	features : {
		"subclassfeature2" : {
			name : "Arcane Initiate",
			source : ["UA:TF", 2],
			minlevel : 2,
			description : "\n   " + "Choose a Cleric Domain using the \"Choose Feature\" button above" + "\n   " + "When I gain a wizard level I can replace one of the spells I would add to my spellbook" + "\n   " + "I can replace it with one of the chosen domain spells, if it is of a level I can cast" + "\n   " + "If my spellbook has all the domain spells, I can select any cleric spell of a level I can cast" + "\n   " + "Other wizards cannot copy cleric spells from my spellbook into their own spellbooks",
			choices : [],
		},
		"subclassfeature2.1" : {
			name : "Channel Arcana",
			source : ["UA:TF", 2],
			minlevel : 2,
			description : "\n   " + "I can channel arcane energy from my deity; the save for this is my wizard spell DC",
			usages : [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
			recovery : "short rest"
		},
		"subclassfeature2.2" : {
			name : "Channel Arcana: Divine Arcana",
			source : ["UA:TF", 3],
			minlevel : 2,
			description : "\n   " + "As a bonus action, I speak a prayer to control the flow of magic around me" + "\n   " + "The next spell I cast gains a +2 bonus to its attack roll or saving throw DC",
			action : ["bonus action", ""]
		},
		"subclassfeature2.3" : {
			name : "Channel Arcana: Domain",
			source : ["UA:TF", 2],
			minlevel : 2,
			description : "\n   " + "Use the \"Choose Features\" button above to select the domain",
			choices : [],
			choicesNotInMenu : true,
			eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?wizard,subclassfeature2,(.*domain).*/i; if ((tReg).test(CFrem)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"wizard,subclassfeature2.2,\" + FeaChoice, false);};};"
		},
		"subclassfeature6" : {
			name : "Arcane Acolyte",
			source : ["UA:TF", 3],
			minlevel : 6,
			description : "\n   " + "Use the \"Choose Features\" button above to select the domain",
			choices : [],
			choicesNotInMenu : true,
			eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?wizard,subclassfeature2,(.*?domain).*/i; if ((tReg).test(CFrem)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"wizard,subclassfeature6,\" + FeaChoice, false);};};"
		},
		"subclassfeature10" : {
			name : "Arcane Priest",
			source : ["UA:TF", 3],
			minlevel : 10,
			description : "\n   " + "Use the \"Choose Features\" button above to select the domain",
			choices : [],
			choicesNotInMenu : true,
			eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?wizard,subclassfeature2,(.*?domain).*/i; if ((tReg).test(CFrem)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"wizard,subclassfeature10,\" + FeaChoice, false);};};"
		},
		"subclassfeature14" : {
			name : "Arcane High Priest",
			source : ["UA:TF", 3],
			minlevel : 14,
			description : "\n   " + "Use the \"Choose Features\" button above to select the domain",
			choices : [],
			choicesNotInMenu : true,
			eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?wizard,subclassfeature2,(.*?domain).*/i; if ((tReg).test(CFrem)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"wizard,subclassfeature14,\" + FeaChoice, false);};};"
		}
	}
};
ClassList.wizard.subclasses[1].push("theurgy");

/*	The Ranger, Revised Unearthed Arcana of 2016-09-12
	(http://media.wizards.com/2016/dnd/downloads/UA_RevisedRanger.pdf)
*/
//adds an alternative ranger class, including three subclasses
ClassList["rangerua"] = {
	regExpSearch : /^((?=.*(ranger|strider))|((?=.*(nature|natural))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
	name : "Ranger",
	source : ["UA:RR", 2],
	primaryAbility : "\n \u2022 Ranger: Dexterity and Wisdom;",
	abilitySave : 5,
	prereqs : "\n \u2022 Ranger: Dexterity 13 and Wisdom 13;",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 10,
	saves : ["Str", "Dex"],
	skills : ["\n\n" + toUni("Ranger") + ": Choose three from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival", "\n\n" + toUni("Multiclass Ranger") + ": Choose one from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival"],
	armor : [
		[true, true, false, true],
		[true, true, false, true]
	],
	weapons : [
		[true, true],
		[true, true]
	],
	equipment : "Ranger starting equipment:\n \u2022 Scale mail -or- leather armor;\n \u2022 Two shortswords -or- two simple melee weapons;\n \u2022 A dungeoneer's pack -or- an explorer's pack;\n \u2022 A longbow and a quiver of 20 arrows.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Ranger Conclaves", ["beast master conclave", "deep stalker conclave", "hunter conclave"]],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : 2,
	spellcastingList : {
		class : "ranger"
	},
	spellcastingKnown : {
		spells : [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11],
	},
	features : {
		"favored enemy" : {
			name : "Favored Enemy",
			source : ["UA:RR", 2],
			minlevel : 1,
			description : "\n   " + "Use the \"Choose Features\" button above to select a favored enemy" + "\n   " + "Choose from beasts, fey, humanoids, monstrosities, or undead" + "\n   " + "I get a bonus to damage rolls with weapon attacks against the chosen favored enemy" + "\n   " + "I have adv. on Wis (Survival) to track and Int checks to recall info about them" + "\n   " + "I also learn one language of my choice, typically one associated with the favored enemy",
			additional : levels.map(function (n) {
				return (n < 6 ? "+2" : "+4") + " weapon attack damage";
			}),
			choices : ["Beasts", "Fey", "Humanoids", "Monstrosities", "Undead"],
			"beasts" : {
				name : "Favored Enemy: Beasts",
				description : "\n   " + "I get a bonus to damage rolls with weapon attacks against beasts" + "\n   " + "I have adv. on Wis (Survival) to track and Int checks to recall info about beasts" + "\n   " + "I learn a language, typically one spoken by or associated with beasts"
			},
			"fey" : {
				name : "Favored Enemy: Fey",
				description : "\n   " + "I get a bonus to damage rolls with weapon attacks against fey" + "\n   " + "I have adv. on Wis (Survival) to track and Int checks to recall info about fey" + "\n   " + "I learn a language, typically one spoken by or associated with fey"
			},
			"humanoids" : {
				name : "Favored Enemy: Humanoids",
				description : "\n   " + "I get a bonus to damage rolls with weapon attacks against humanoids" + "\n   " + "I have adv. on Wis (Survival) to track and Int checks to recall info about humanoids" + "\n   " + "I learn a language, typically one spoken by or associated with humanoids"
			},
			"monstrosities" : {
				name : "Favored Enemy: Monstrosities",
				description : "\n   " + "I get a bonus to damage rolls with weapon attacks against monstrosities" + "\n   " + "I have adv. on Wis (Survival) to track and Int checks to recall info about monstrosities" + "\n   " + "I learn a language, typically one spoken by or associated with monstrosities",
			},
			"undead" : {
				name : "Favored Enemy: Undead",
				description : "\n   " + "I get a bonus to damage rolls with weapon attacks against undead" + "\n   " + "I have adv. on Wis (Survival) to track and Int checks to recall info about undead" + "\n   " + "I learn a language, typically one spoken by or associated with undead"
			},
			eval : "AddLanguage(\"+1 from Favored Enemy\", \"Ranger (Favored Enemy)\");",
			removeeval : "RemoveLanguage(\"+1 from Favored Enemy\", \"Ranger (Favored Enemy)\");",
			calcChanges : {
				atkCalc : ["if (!isSpell && classes.known.rangerua && classes.known.rangerua.level && (/favou?red.{1,2}enemy/i).test(WeaponText)) { output.extraDmg += classes.known.rangerua.level < 6 ? 2 : 4; }; ", "If I include the words 'Favored Enemy' in the name or description of a weapon, it gets bonus damage, depending on my Ranger level."]
			}
		},
		"natural explorer" : {
			name : "Natural Explorer",
			source : ["UA:RR", 3],
			minlevel : 1,
			description : "\n   " + "On my first turn in combat, I have adv. on attacks against those that did not yet act" + "\n   " + "I ignore difficult terrain; I have adv. on Initiative; I have benefits in travel, see page 3",
			extraname : "Natural Explorer",
			"travel benefit" : {
				name : "Travel Benefits",
				source : ["UA:RR", 3],
				description: "\n   " + "After one hour of traveling in the wilderness I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with animal companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking others, I also learn their exact number, size, and time since passing",
			},
			eval : "Checkbox(\"Init Adv\", true, \"Advantage to Initiative checks was gained from Ranger (Natural Explorer)\"); ClassFeatureOptions([\"rangerua\", \"natural explorer\", \"travel benefit\", \"extra\"]);",
			removeeval : "Checkbox(\"Init Adv\", false, \"\"); ClassFeatureOptions([\"rangerua\", \"natural explorer\", \"travel benefit\", \"extra\"], \"remove\");"
		},
		"fighting style" : {
			name : "Fighting Style",
			source : ["UA:RR", 3],
			minlevel : 2,
			description : "\n   " + "Choose a Fighting Style for the ranger using the \"Choose Feature\" button above",
			choices : ["Archery", "Defense", "Dueling", "Two-Weapon Fighting"],
			"archery" : {
				name : "Archery Fighting Style",
				description : "\n   " + "+2 bonus to attack rolls I make with ranged weapons",
				calcChanges : {
					atkCalc : ["if (isRangedWeapon) {output.extraHit += 2; }; ", "My ranged weapons get a +2 bonus on the To Hit."]
				}
			},
			"defense" : {
				name : "Defense Fighting Style",
				description : "\n   " + "+1 bonus to AC when I'm wearing armor",
				eval : "AddACMisc(1, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\", \"CurrentArmour.known && !ArmourList[CurrentArmour.known].type\")",
				removeeval : "AddACMisc(0, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\")"
			},
			"dueling" : {
				name : "Dueling Fighting Style",
				description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons",
				calcChanges : {
					atkCalc : ["var areOffHands = function(n){for(var i=1;i<=n;i++){if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) {return true; }; }; }(FieldNumbers.actions); if (!areOffHands && isMeleeWeapon && !(/\\b(2|two).?hand(ed)?s?\\b/i).test(theWea.description)) {output.extraDmg += 2; }; ", "When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."]
				}
			},
			"two-weapon fighting" : {
				name : "Two-Weapon Fighting Style",
				description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks",
				calcChanges : {
					atkCalc : ["if (isOffHand) {output.modToDmg = true; }; ", "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks."]
				}
			}
		},
		"spellcasting" : {
			name : "Spellcasting",
			source : ["UA:RR", 3],
			minlevel : 2,
			description : "\n   " + "I can cast ranger spells that I know, using Wisdom as my spellcasting ability",
			additional : ["", "2 spells known", "3 spells known", "3 spells known", "4 spells known", "4 spells known", "5 spells known", "5 spells known", "6 spells known", "6 spells known", "7 spells known", "7 spells known", "8 spells known", "8 spells known", "9 spells known", "9 spells known", "10 spells known", "10 spells known", "11 spells known", "11 spells known"],
		},
		"primeval awareness" : {
			name : "Primeval Awareness",
			source : ["UA:RR", 4],
			minlevel : 3,
			description : "\n   " + "If I haven't attacked a beast within the last 10 min, I can communicate with it" + "\n   " + "As an action, I convey simple ideas, and read mood, intent, emotions, needs, etc." + "\n   " + "By concentrating for 1 min, I know if any of my favored enemies are within 5 miles" + "\n   " + "Per group, I sense the number, general direction, distance, and type of favored enemy",
		},
		"subclassfeature3" : {
			name : "Ranger Conclave",
			source : ["UA:RR", 4],
			minlevel : 3,
			description : "\n   " + "Choose a Ranger Conclave you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Beast Conclave, Deep Stalker Conclave or Hunter Conclave",
		},
		"greater favored enemy" : {
			name : "Greater Favored Enemy",
			source : ["UA:RR", 4],
			minlevel : 6,
			description : "\n   " + "Use the \"Choose Features\" button above to select a greater favored enemy" + "\n   " + "Choose from aberrations, celestials, constructs, dragons, elementals, fiends, or giants" + "\n   " + "I get all the bonuses from Favored Enemy for this creature type as well" + "\n   " + "Additionally, I have adv. on saves vs. spells and abilities of this greater favored enemy",
			additional : "+4 weapon attack damage",
			choices : ["Aberrations", "Celestials", "Constructs", "Dragons", "Elementals", "Fiends", "Giants"],
			"aberrations" : {
				name : "Greater Favored Enemy: Aberrations",
				description : "\n   " + "The bonuses I get from Favored Enemy now also work against aberrations" + "\n   " + "Additionally, I have advantage on saves against spells and abilities used by aberrations",
				save : "Adv. vs. spells and abilities of aberrations",
			},
			"celestials" : {
				name : "Greater Favored Enemy: Celestials",
				description : "\n   " + "The bonuses I get from Favored Enemy now also work against celestials" + "\n   " + "Additionally, I have advantage on saves against spells and abilities used by celestials",
				save : "Adv. vs. spells and abilities of celestials",
			},
			"constructs" : {
				name : "Greater Favored Enemy: Constructs",
				description : "\n   " + "The bonuses I get from Favored Enemy now also work against constructs" + "\n   " + "Additionally, I have advantage on saves against spells and abilities used by constructs",
				save : "Adv. vs. spells and abilities of constructs",
			},
			"dragons" : {
				name : "Greater Favored Enemy: Dragons",
				description : "\n   " + "The bonuses I get from Favored Enemy now also work against dragons" + "\n   " + "Additionally, I have advantage on saves against spells and abilities used by dragons",
				save : "Adv. vs. spells and abilities of dragons",
			},
			"elementals" : {
				name : "Greater Favored Enemy: Elementals",
				description : "\n   " + "The bonuses I get from Favored Enemy now also work against elementals" + "\n   " + "Additionally, I have advantage on saves against spells and abilities used by elementals",
				save : "Adv. vs. spells and abilities of elementals",
			},
			"fiends" : {
				name : "Greater Favored Enemy: Fiends",
				description : "\n   " + "The bonuses I get from Favored Enemy now also work against fiends" + "\n   " + "Additionally, I have advantage on saves against spells and abilities used by fiends",
				save : "Adv. vs. spells and abilities of fiends",
			},
			"giants" : {
				name : "Greater Favored Enemy: Giants",
				description : "\n   " + "The bonuses I get from Favored Enemy now also work against giants" + "\n   " + "Additionally, I have advantage on saves against spells and abilities used by giants",
				save : "Adv. vs. spells and abilities of giants",
			},
			eval : "AddLanguage(\"+1 from Greater Favored Enemy\", \"Ranger (Greater Favored Enemy)\");",
			removeeval : "RemoveLanguage(\"+1 from Greater Favored Enemy\", \"Ranger (Greater Favored Enemy)\");"
		},
		"fleet of foot" : {
			name : "Fleet of Foot",
			source : ["UA:RR", 4],
			minlevel : 8,
			description : "\n   " + "I can take the Dash action as a bonus action",
			action : ["bonus action", ""]
		},
		"hide in plain sight" : {
			name : "Hide in Plain Sight",
			source : ["UA:RR", 4],
			minlevel : 10,
			description : "\n   " + "When I hide on my turn without moving, others take -10 Wis (Perception) to find me" + "\n   " + "This lasts until something reveals my precense, or until I (voluntarily) move/fall prone",
		},
		"vanish" : {
			name : "Vanish",
			source : ["UA:RR", 5],
			minlevel : 14,
			description : "\n   " + "I can't be nonmagically tracked if I don't want to be and can Hide as a bonus action",
			action : ["bonus action", ""],
		},
		"feral senses" : {
			name : "Feral Senses",
			source : ["UA:RR", 5],
			minlevel : 18,
			description : "\n   " + "When not blinded or deafened, I'm aware of invisible, non-hidden creatures in 30 ft" + "\n   " + "I don't have disadvantage when attacking creatures I am aware of but can't see"
		},
		"foe slayer" : {
			name : "Foe Slayer",
			source : ["UA:RR", 5],
			minlevel : 20,
			description : "\n   " + "Once per turn, I can add Wis mod to the attack or damage roll after I see the die roll"
		},
	}
};
ClassSubList["beast master conclave"] = {
	regExpSearch : /^(?=.*(animal|beast))((?=.*(master|ranger|strider))|((?=.*(nature|natural))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
	subname : "Beast Conclave",
	source : ["UA:RR", 5],
	features : {
		"subclassfeature3" : {
			name : "Animal Companion",
			source : ["UA:RR", 5],
			minlevel : 3,
			description : "\n   " + "I call an animal by spending 8 hours and 50 gp; I can revive it with 8 hours and 25 gp",
			additional : ["", "", "", "+1 HD for companion", "+2 HD for companion", "+3 HD for companion", "+4 HD for companion", "+5 HD for companion", "+6 HD for companion", "+7 HD for companion", "+8 HD for companion", "+9 HD for companion", "+10 HD for companion", "+11 HD for companion", "+12 HD for companion", "+13 HD for companion", "+14 HD for companion", "+15 HD for companion", "+16 HD for companion", "+17 HD for companion"],
		},
		"subclassfeature3.1" : {
			name : "Companion's Bond",
			source : ["UA:RR", 5],
			minlevel : 3,
			description : "\n   " + "My companion gains several benefits, see the Companion's sheet",
		},
		"subclassfeature5" : {
			name : "Coordinated Attack",
			source : ["UA:RR", 6],
			minlevel : 5,
			description : "\n   " + "If I take the Attack action, my companion can use its reaction to make a melee attack",
		},
		"subclassfeature7" : {
			name : "Beast's Defense",
			source : ["UA:RR", 6],
			minlevel : 7,
			description : "\n   " + "While my companion can see me, it has advantage on all saving throws",
		},
		"subclassfeature11" : {
			name : "Storm of Claws and Fangs",
			source : ["UA:RR", 6],
			minlevel : 11,
			description : "\n   " + "My companion can, as an action, make melee attacks vs. all creatures within 5 ft of it"
		},
		"subclassfeature15" : {
			name : "Superior Beast's Defense",
			source : ["UA:RR", 6],
			minlevel : 15,
			description : "\n   " + "My companion can, as a reaction, halve an attack's damage from attacker that it sees"
		}
	}
};
ClassSubList["hunter conclave"] = {
	regExpSearch : /^(?!.*(monster|barbarian|bard|cleric|druid|fighter|monk|paladin|rogue|sorcerer|warlock|wizard))(?=.*(hunter|huntress|hunts(wo)?m(e|a)n)).*$/i,
	subname : "Hunter Conclave",
	source : ["UA:RR", 7],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature3" : {
			name : "Hunter's Prey",
			source : ["UA:RR", 7],
			minlevel : 3,
			description : "\n   " + "Choose Colossus Slayer, Giant Killer, or Horde Breaker with the \"Choose Feature\" button",
			choices : ["Colossus Slayer", "Giant killer", "Horde Breaker"],
			"colossus slayer" : {
				name : "Hunter's Prey: Colossus Slayer",
				description : "\n   " + "Once per turn, when hitting someone that is below max HP, I do an extra 1d8 damage"
			},
			"giant killer" : {
				name : "Hunter's Prey: Giant Killer",
				description : "\n   " + "As a reaction, when a Large or larger enemy in 5 ft attacks me, I can attack it once",
				action : ["reaction", ""]
			},
			"horde breaker" : {
				name : "Hunter's Prey: Horde Breaker",
				description : "\n   " + "Once per turn, when I hit a creature, I can make an attack vs. another within 5 ft of it"
			}
		},
		"subclassfeature7" : {
			name : "Defensive Tactics",
			source : ["UA:RR", 7],
			minlevel : 7,
			description : "\n   " + "\"Choose Feature\" button to choose Escape the Horde, Multiattack Defense, or Steel Will",
			choices : ["Escape the Horde", "Multiattack Defense", "Steel Will"],
			"escape the horde" : {
				name : "Defensive Tactic: Escape the Horde",
				description : "\n   " + "Creatures attacking me with opportunity attacks have disadvantage on the attack rolls"
			},
			"multiattack defense" : {
				name : "Defensive Tactic: Multiattack Defense",
				description : "\n   " + "When a creature hits me, I gain +4 AC against that creature for the rest of the turn"
			},
			"steel will" : {
				name : "Defensive Tactic: Steel Will",
				description : "\n   " + "I have advantage on saves against being frightened",
				save : "Adv. on saves vs. being frightened"
			}
		},
		"subclassfeature11" : {
			name : "Multiattack",
			source : ["UA:RR", 7],
			minlevel : 11,
			description : "\n   " + "Choose Volley or Whirlwind Attack using the \"Choose Feature\" button above",
			choices : ["Volley", "Whirlwind Attack"],
			"volley" : {
				name : "Multiattack: Volley",
				description : "\n   " + "As an action, I can make ranged attacks vs. all within a 10-ft radius of a point in range",
				action : ["action", ""]
			},
			"whirlwind attack" : {
				name : "Multiattack: Whirlwind Attack",
				description : "\n   " + "As an action, I can make melee attacks vs. all creatures within 5 ft of me",
				action : ["action", ""]
			}
		},
		"subclassfeature15" : {
			name : "Superior Hunter's Defense",
			source : ["UA:RR", 7],
			minlevel : 15,
			description : "\n   " + "\"Choose Feature\" button to choose Evasion, Stand Against the Tide, or Uncanny Dodge",
			choices : ["Evasion", "Stand Against the Tide", "Uncanny Dodge"],
			"evasion" : {
				name : "Evasion",
				description : "\n   " + "My Dexterity saves vs. areas of effect negate damage on success and halve it on failure",
				save : "Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg"
			},
			"stand against the tide" : {
				name : "Stand Against the Tide",
				description : "\n   " + "When a creature misses me with a melee attack, I can use my reaction on the attack" + "\n   " + "I force the attacker to repeat it vs. another (not attacker) of my choice within range",
				action : ["reaction", ""]
			},
			"uncanny dodge" : {
				name : "Uncanny Dodge",
				description : "\n   " + "As a reaction, I halve the damage of an attack from an attacker that I can see",
				action : ["reaction", ""]
			}
		}
	}
};
ClassSubList["deep stalker conclave"] = {
	regExpSearch : /^(?=.*deep)(?=.*stalker).*$/i,
	subname : "Deep Stalker Conclave",
	source : ["UA:RR", 7],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature3" : {
			name : "Underdark Scout",
			source : ["UA:RR", 7],
			minlevel : 3,
			description : "\n   " + "In the first turn of combat I have +10 ft speed and +1 attack with the Attack action" + "\n   " + "When I'm hiding or trying to hide, others gain no benefit from darkvision to detect me"
		},
		"subclassfeature3.1" : {
			name : "Deep Stalker Magic",
			source : ["UA:RR", 8],
			minlevel : 3,
			description : "\n   " + "I have 90 ft darkvision and add a spell to my known spells at level 3, 5, 9, 13, and 15" + "\n   " + "These count as ranger spells, but do not count against the number of spells I can know",
			spellcastingExtra : ["disguise self", "rope trick", "glyph of warding", "greater invisibility", "seeming"],
			eval : "RemoveString(\"Vision\", \"Darkvision 60 ft\"); AddString(\"Vision\",\"Darkvision 90 ft\", \"; \");",
			removeeval : "RemoveString(\"Vision\", \"Darkvision 90 ft\");"
		},
		"subclassfeature7" : {
			name : "Iron Mind",
			source : ["UA:RR", 8],
			minlevel : 7,
			description : "\n   " + "I am proficient with Wisdom saving throws",
			eval : "Checkbox(\"Wis ST Prof\", true, \"Proficiency with Wisdom saving throws was gained from Deep Stalker (Iron Mind)\");",
			removeeval : "Checkbox(\"Wis ST Prof\", false, \"\");",
		},
		"subclassfeature11" : {
			name : "Stalker's Flurry",
			source : ["UA:RR", 8],
			minlevel : 11,
			description : "\n   " + "Once during my turn when I miss an attack, I can immediately make an extra attack",
		},
		"subclassfeature15" : {
			name : "Stalker's Dodge",
			source : ["UA:RR", 8],
			minlevel : 15,
			description : "\n   " + "As a reaction when I'm attacked without adv., I can impose disadv. on the attack roll",
			action : ["reaction", " (when attacked)"]
		},
	}
};
ClassSubList["deep stalker conclave"].features["subclassfeature3.1"].spellcastingExtra[100] = "AddToKnown";

/*	the Barbarian Primal Paths Unearthed Arcana of 2016-11-07
	(http://media.wizards.com/2016/dnd/downloads/UA_Barbarian.pdf)
*/
//adds three subclasses: a subclass for the Barbarian, called "Path of the Ancestral Guardian"
ClassSubList["ancestral guardian"] = {
	regExpSearch : /^(?=.*ancestral)(?=.*guardian).*$/i,
	subname : "Path of the Ancestral Guardian",
	source : ["UA:BPP", 1],
	fullname : "Ancestral Guardian",
	features : {
		"subclassfeature3" : {
			name : "Ancestral Protectors",
			source : ["UA:BPP", 1],
			minlevel : 3,
			description : "\n   " + "As a bonus action while raging, I can choose a creature within 5 ft of me that I can see" + "\n   " + "The creature has disadvantage on attack rolls that don't target me" + "\n   " + "If it takes the Disengage action within 5 feet of me, its speed is halved for its turn" + "\n   " + "This lasts until the start of my next turn or my rage ends, whichever comes ",
			action : ["bonus action", " (in Rage)"]
		},
		"subclassfeature6" : {
			name : "Ancestral Shield",
			source : ["UA:BPP", 1],
			minlevel : 6,
			description : "\n   " + "While I'm raging, I can transfer my resistance to an ally I can see within 30 ft of me" + "\n   " + "As a reaction when an ally takes bludgeoning, piercing, or slashing damage" + "\n   " + "My ally keeps the resistance, and I lose it, until the start of my next turn",
			action : ["reaction", ""]
		},
		"subclassfeature10" : {
			name : "Consult the Spirits",
			source : ["UA:BPP", 1],
			minlevel : 10,
			description : "\n   " + "I can consult my ancestral spirits to give myself advantage on a Int or Wis check",
			usages : 3,
			recovery : "long rest"
		},
		"subclassfeature14" : {
			name : "Vengeful Ancestors",
			source : ["UA:BPP", 1],
			minlevel : 14,
			description : "\n   " + "While I'm raging, I can have my vengeful ancestors attack for 2d8 force damage" + "\n   " + "As a reaction when I or an ally I can see within 30 feet of me is damaged in melee",
			action : ["reaction", ""]
		}
	}
};
ClassList.barbarian.subclasses[1].push("ancestral guardian");

//a subclass for the Barbarian, called "Path of the Storm Herald"
ClassSubList["storm herald"] = {
	regExpSearch : /^(?=.*storm)(?=.*herald).*$/i,
	subname : "Path of the Storm Herald",
	source : ["UA:BPP", 2],
	fullname : "Storm Herald",
	abilitySave : 3,
	features : {
		"subclassfeature3" : {
			name : "Storm Aura",
			source : ["UA:BPP", 2],
			minlevel : 3,
			description : "\n   " + "While raging, I emanate a 10-ft radius aura that shapes the environment around me" + "\n   " + "Use the \"Choose Features\" button above to select the aura",
			choices : ["Desert", "Sea", "Tundra"],
			"desert" : {
				name : "Storm of Fury: Desert",
				description : "\n   " + "While raging, I emanate a 10-ft radius aura that shapes the environment around me" + "\n   " + "Any enemy that ends its turn in my aura takes fire damage",
				additional : ["", "", "2 fire damage", "3 fire damage", "3 fire damage", "3 fire damage", "3 fire damage", "4 fire damage", "4 fire damage", "4 fire damage", "4 fire damage", "5 fire damage", "5 fire damage", "5 fire damage", "5 fire damage", "6 fire damage", "6 fire damage", "6 fire damage", "6 fire damage", "7 fire damage"],
				eval : "var ToAdd = [\"barbarian\", \"subclassfeature6\", \"desert\"]; if (classes.known.barbarian.level >= 6 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ToAdd[1] = \"subclassfeature14\"; if (classes.known.barbarian.level >= 14 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};"
			},
			"sea" : {
				name : "Storm of Fury: Sea",
				description : "\n   " + "While raging, I emanate a 10-ft radius aura that shapes the environment around me" + "\n   " + "At the end of each of my turns, I can choose a creature in my aura, other than myself" + "\n   " + "It must make a Dex save or take lightning damage, or half damage on a successful save" + "\n   " + "The DC for this save is 8 + my proficiency bonus + my Constitution modifier",
				additional : ["", "", "2d6", "2d6", "2d6", "2d6", "2d6", "2d6", "2d6", "3d6", "3d6", "3d6", "3d6", "3d6", "4d6", "4d6", "4d6", "4d6", "4d6", "4d6"],
				usages : 1,
				recovery : "turn",
				eval : "var ToAdd = [\"barbarian\", \"subclassfeature6\", \"sea\"]; if (classes.known.barbarian.level >= 6 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ToAdd[1] = \"subclassfeature14\"; if (classes.known.barbarian.level >= 14 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};"
			},
			"tundra" : {
				name : "Storm of Fury: Tundra",
				description : "\n   " + "While raging, I emanate a 10-ft radius aura that shapes the environment around me" + "\n   " + "Any enemy that ends its turn in my aura takes cold damage",
				additional : ["", "", "2 cold damage", "3 cold damage", "3 cold damage", "3 cold damage", "3 cold damage", "4 cold damage", "4 cold damage", "4 cold damage", "4 cold damage", "5 cold damage", "5 cold damage", "5 cold damage", "5 cold damage", "6 cold damage", "6 cold damage", "6 cold damage", "6 cold damage", "7 cold damage"],
				eval : "var ToAdd = [\"barbarian\", \"subclassfeature6\", \"tundra\"]; if (classes.known.barbarian.level >= 6 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ToAdd[1] = \"subclassfeature14\"; if (classes.known.barbarian.level >= 14 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};"
			}
		},
		"subclassfeature6" : {
			name : "Storm Soul",
			source : ["UA:BPP", 2],
			minlevel : 6,
			description : "\n   " + "Use the \"Choose Features\" button above to select the effect",
			choices : ["desert", "sea", "tundra"],
			choicesNotInMenu : true,
			"desert" : {
				name : "Storm Soul: Desert",
				description : "\n   " + "I have resistance to fire damage and don't suffer the effects of extreme heat",
				eval : "AddResistance(\"Fire\");",
				removeeval : "RemoveResistance(\"Fire\");",
				save : "Immune to effects of extreme heat"
			},
			"sea" : {
				name : "Storm Soul: Sea",
				description : "\n   " + "I have resistance to lightning damage and can breathe underwater",
				eval : "AddResistance(\"Lightning\");",
				removeeval : "RemoveResistance(\"Lightning\");"
			},
			"tundra" : {
				name : "Storm Soul: Tundra",
				description : "\n   " + "I have resistance to cold damage and don't suffer the effects of extreme cold",
				eval : "AddResistance(\"Cold\");",
				removeeval : "RemoveResistance(\"Cold\");",
				save : "Immune to effects of extreme cold"
			},
			eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?barbarian,subclassfeature3,(desert|sea|tundra).*/i; if ((tReg).test(CFrem)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"barbarian,subclassfeature6,\" + FeaChoice, false);};};"
		},
		"subclassfeature10" : {
			name : "Shield of the Storm",
			source : ["UA:BPP", 2],
			minlevel : 10,
			description : "\n   " + "While I'm raging, allies within my aura gain the benefits of my Storm Soul feature"
		},
		"subclassfeature14" : {
			name : "Raging Storm",
			source : ["UA:BPP", 2],
			minlevel : 14,
			description : "\n   " + "Use the \"Choose Features\" button above to select the effect",
			choices : ["desert", "sea", "tundra"],
			choicesNotInMenu : true,
			"desert" : {
				name : "Raging Storm: Desert",
				description : "\n   " + "Enemy in my aura move more than 5 ft on the ground must make a Strength save" + "\n   " + "On a fail, it moves only 5 ft and its speed drops to 0 until the start of its next turn" + "\n   " + "The DC for this save is 8 + my proficiency bonus + my Constitution modifier"
			},
			"sea" : {
				name : "Raging Storm: Sea",
				description : "\n   " + "Creatures in my aura hit by my attack must make a Str save or be knocked prone" + "\n   " + "The DC for this save is 8 + my proficiency bonus + my Strength modifier",
				calcChanges : {
					atkAdd : ["if (isMeleeWeapon && classes.known.barbarian && classes.known.barbarian.level > 13 && (/\\brage\\b/i).test(inputText)) {fields.Description += (fields.Description ? '; ' : '') + 'Str save or knocked prone'; }; ", "If I include the word 'Rage' in a melee weapon's name, it will show in its description that it forces targets that are hit to make a Strength saving throw or be knocked prone."]
				}
			},
			"tundra" : {
				name : "Raging Storm: Tundra",
				description : "\n   " + "The area within my aura is difficult terrain for my enemies"
			},
			eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?barbarian,subclassfeature3,(desert|sea|tundra).*/i; if ((tReg).test(CFrem)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"barbarian,subclassfeature14,\" + FeaChoice, false);};};"
		}
	}
};
ClassList.barbarian.subclasses[1].push("storm herald");

//a subclass for the Barbarian, called "Path of the Zealot"
ClassSubList["zealot"] = {
	regExpSearch : /zealot/i,
	subname : "Path of the Zealot",
	source : ["UA:BPP", 2],
	fullname : "Zealot",
	features : {
		"subclassfeature3" : {
			name : "Divine Fury",
			source : ["UA:BPP", 2],
			minlevel : 3,
			description : "\n   " + "While raging, I can become cloaked in an aura of divine power until my rage ends" + "\n   " + "Choose a damage type using the \"Choose Feature\" button above",
			additional : ["", "", "1d6+1", "1d6+2", "1d6+2", "1d6+3", "1d6+3", "1d6+4", "1d6+4", "1d6+5", "1d6+5", "1d6+6", "1d6+6", "1d6+7", "1d6+7", "1d6+8", "1d6+8", "1d6+9", "1d6+9", "1d6+10"],
			usages : 1,
			recovery : "turn",
			choices : ["Necrotic Damage", "Radiant Damage"],
			"necrotic damage" : {
				name : "Divine Fury: Necrotic",
				description : "\n   " + "While raging, I become cloaked in an aura of divine power until my rage ends" + "\n   " + "At the end of my turn, each creature within 5 feet of me takes necrotic damage",
			},
			"radiant damage" : {
				name : "Divine Fury: Radiant",
				description : "\n   " + "While raging, I become cloaked in an aura of divine power until my rage ends" + "\n   " + "At the end of my turn, each creature within 5 feet of me takes radiant damage",
			}
		},
		"subclassfeature3.1" : {
			name : "Warrior of the Gods",
			source : ["UA:BPP", 2],
			minlevel : 3,
			description : "\n   " + "Spells restoring me to life (not undeath or anything else) don't need material comp.",
		},
		"subclassfeature6" : {
			name : "Zealous Focus",
			source : ["UA:BPP", 3],
			minlevel : 6,
			description : "\n   " + "As a reaction when I fail a saving throw while raging, I can instead succeed on it" + "\n   " + "Doing so immediately ends my rage and I can't rage again until I finish a short rest",
			usages : 1,
			recovery : "short rest",
			action : ["reaction", " (in Rage)"],
		},
		"subclassfeature10" : {
			name : "Zealous Presence",
			source : ["UA:BPP", 3],
			minlevel : 10,
			description : "\n   " + "As an action, I howl in fury and unleash a battle cry infused with divine energy" + "\n   " + "Allies within 60 ft of me gain adv. on attacks and saves until the start of my next turn",
			usages : 1,
			recovery : "long rest",
			action : ["action", " (allies within 60 feet)"],
		},
		"subclassfeature14" : {
			name : "Rage Beyond Death",
			source : ["UA:BPP", 3],
			minlevel : 14,
			description : "\n   " + "While raging, having 0 hit points doesn't knock me unconscious" + "\n   " + "I still must make death saves, and I suffer the normal effects of taking damage" + "\n   " + "However, if I would die due to failing death saves, I don't die until my rage ends",
		},
	}
};
ClassList.barbarian.subclasses[1].push("zealot");

/*	the Bard Colleges Unearthed Arcana of 2016-11-14
	(http://media.wizards.com/2016/dnd/downloads/UA_Bard.pdf)
*/
//adds two subclasses: a subclass for the Bard, called "College of Glamour"
ClassSubList["college of glamour"] = {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*glamour).*$/i,
	subname : "College of Glamour",
	source : ["UA:BC", 1],
	features : {
		"subclassfeature3" : {
			name : "Mantle of Inspiration",
			source : ["UA:BC", 1],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I expend one bardic inspiration die to aid those within 60 ft of me" + "\n   " + "A number of allies equal to my Cha mod gain twice the die roll in temporary HP" + "\n   " + "They can use a reaction to move their speed toward me, without opportunity attacks",
			additional : "1 bardic inspiration die",
			action : ["bonus action", ""],
		},
		"subclassfeature3.1" : {
			name : "Enthralling Performance",
			source : ["UA:BC", 1],
			minlevel : 3,
			recovery : "short rest",
			usages : 1,
			description : "\n   " + "By performing for at least 10 minutes, I can charm humanoids within 60 ft of me" + "\n   " + "At the end of the performance, my Cha mod number of targets must make a Wis save" + "\n   " + "On a fail, a target is charmed for 1 hour; If success, it doesn't knows I tried to charm it" + "\n   " + "While charmed, the target idolizes me, hinders those opposing me, and avoids violence" + "\n   " + "This lasts until a target takes damage, I attack it, or if it sees me attacking its allies",
		},
		"subclassfeature6" : {
			name : "Mantle of Majesty",
			source : ["UA:BC", 1],
			minlevel : 6,
			recovery : "long rest",
			usages : 1,
			action : ["bonus action", ""],
			description : "\n   " + "As a bonus action, I take on an appearance of unearthly beauty for 1 minute" + "\n   " + "As a bonus action during this time, I can cast command without using a spell slot" + "\n   " + "Creatures charmed by me automatically fail their saves against these command spells",
			spellcastingBonus : [{
				name : "Mantle of Majesty",
				spells : ["command"],
				selection : ["command"],
				oncelr : true,
			}],
		},
		"subclassfeature14" : {
			name : "Unspeakable Majesty",
			source : ["UA:BC", 2],
			minlevel : 14,
			recovery : "short rest",
			usages : 1,
			action : ["action", ""],
			description : "\n   " + "As an action, I can cast Sanctuary on myself without using a spell slot" + "\n   " + "If a creature fails its save to this, I gain adv. on all Cha checks against it for 1 min" + "\n   " + "In addition, the target has disadv. on saves it makes against my spells on my next turn",
			spellcastingBonus : [{
				name : "Unspeakable Majesty",
				spells : ["sanctuary"],
				selection : ["sanctuary"],
				oncesr : true,
			}],
		},
	},
};
ClassList.bard.subclasses[1].push("college of glamour");

//a subclass for the Bard, called "College of Whispers"
ClassSubList["college of whispers"] = {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*whispers).*$/i,
	subname : "College of Whispers",
	source : ["UA:BC", 2],
	features : {
		"subclassfeature3" : {
			name : "Venomous Blades",
			source : ["UA:BC", 2],
			minlevel : 3,
			description : "\n   " + "When I hit with a weapon attack, I can expend a bardic inspiration die to add damage" + "\n   " + "I roll the inspiration die twice, dealing the total in Poison damage to the target" + "\n   " + "I can do this no more than once per round on my turn",
			additional : "1 bardic inspiration die",
		},
		"subclassfeature3.1" : {
			name : "Venomous Words",
			source : ["UA:BC", 2],
			minlevel : 3,
			recovery : "short rest",
			usages : 1,
			description : "\n   " + "By speaking in private with a humanoid for at least 10 minutes, I can try to frighten it" + "\n   " + "After the conversation, the target must make a Wisdom save or be frightened of me" + "\n   " + "If the save is successful, the target doesn't know I try to frighten it" + "\n   " + "While frightened, the target avoids the company of others, including its allies" + "\n   " + "The target also tries to hide in the most secret, safest place available to it" + "\n   " + "This lasts for 1 hour or until it is attacked/damaged, or if it sees me attacking its allies",
		},
		"subclassfeature6" : {
			name : "Mantle of Whispers",
			source : ["UA:BC", 2],
			minlevel : 6,
			action : ["reaction", ""],
			description : "\n   " + "As a reaction when a creature dies within 5 ft or by my hand, I can capture its shadow" + "\n   " + "I can use shadows of those with the same type and size as me (or Medium if I'm Small)" + "\n   " + "I can have only one captured shadow at a time and I can don it as a shadow disguise",
			extraname : "Mantle of Whispers",
			"shadow disguise" : {
				name : "Shadow Disguise",
				source : ["UA:BC", 2],
				action : ["action", " (start)"],
				description : "\n   " + "As an action, I can don a shadow that I captured as a disguise for 1 hour or until I stop it" + "\n   " + "I take on the creature's appearance and I can access its surface memories, but not secrets" + "\n   " + "I have access to information that it would would freely share with a casual acquaintance" + "\n   " + "This is enough that I can pass yourself off as the creature by drawing on its memories" + "\n   " + "Anybody can see through the disguise with a Wis (Insight) check vs. my Cha (Deception) +5" + "\n   " + "The knowledge disappears when the disguise ends",
				eval : "AddAction(\"bonus action\", \"Shadow Disguise (end)\", \"Bard (College of Whispers)\");",
				removeeval : "RemoveAction(\"bonus action\", \"Shadow Disguise (end)\");",
			},
			eval : "ClassFeatureOptions([\"bard\", \"subclassfeature6\", \"shadow disguise\", \"extra\"]);",
			removeeval : "ClassFeatureOptions([\"bard\", \"subclassfeature6\", \"shadow disguise\", \"extra\"], \"remove\");",
		},
		"subclassfeature14" : {
			name : "Shadow Lore",
			source : ["UA:BC", 3],
			minlevel : 14,
			recovery : "long rest",
			usages : 1,
			action : ["action", ""],
			description : "\n   " + "As an action, I whisper to a creature within 30 ft that can hear and understand me" + "\n   " + "Only the target can hear me; It must make a Wisdom save or be charmed by me" + "\n   " + "If failed, it thinks I know its most mortifying secret, otherwise it only hears mumbling" + "\n   " + "While charmed, the target obeys my commands, but won't risk its life or fight for me" + "\n   " + "This lasts for 8 hours or until I or my allies attack or damage it" + "\n   " + "When the effect ends, the target has no idea why it was so afraid of me",
		},
	},
};
ClassList.bard.subclasses[1].push("college of whispers");

/*	the Cleric: Divine Domains Unearthed Arcana of 2016-11-21
	(http://media.wizards.com/2016/dnd/downloads/UA_Cleric.pdf)
*/
//adds three subclasses: a subclass for the Cleric, called "Forge Domain"
ClassSubList["forge domain"] = {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(forge|forgery|blacksmith)).*$/i,
	subname : "Forge Domain",
	source : ["UA:CDD", 1],
	spellcastingExtra : ["searing smite", "shield", "heat metal", "magic weapon", "elemental weapon", "protection from energy", "fabricate", "wall of fire", "animate objects", "creation"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiency",
			source : ["UA:CDD", 1],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with heavy armor",
			armor : [false, false, true, false],
		},
		"subclassfeature1.1" : {
			name : "Blessing of the Forge",
			source : ["UA:CDD", 1],
			minlevel : 1,
			action : ["action", ""],
			usages : 1,
			recovery : "long rest",
			description : "\n   " + "At the end of a long rest, I can imbue magic into a nonmagical weapon or armor" + "\n   " + "It becomes magical: +1 AC if armor, or +1 to attack and damage rolls if a weapon" + "\n   " + "This lasts until the end of my next long rest",
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Artisan's Blessing",
			source : ["UA:CDD", 1],
			minlevel : 2,
			description : "\n   " + "During a short rest, I can conduct a ritual to craft an item that is at least part metal" + "\n   " + "The object can be worth up to 100 gp, and I must expend metals of equal value to it" + "\n   " + "The item can be an exact duplicate of a nonmagical item if I possess the original",
		},
		"subclassfeature6" : {
			name : "Soul of the Forge",
			source : ["UA:CDD", 1],
			minlevel : 6,
			additional : ["", "", "", "", "", "+6 force damage", "+7 force damage", "+8 force damage", "+9 force damage", "+10 force damage", "+11 force damage", "+12 force damage", "+13 force damage", "+14 force damage", "+15 force damage", "+16 force damage", "+17 force damage", "+18 force damage", "+19 force damage", "+20 force damage"],
			description : "\n   " + "I gain a +1 AC while wearing medium or heavy armor, and resistance to fire damage" + "\n   " + "When I hit a construct with an attack, I deal my cleric level in additional force damage",
			eval : "AddResistance(\"Fire\", \"Cleric (Forge Domain)\"); AddACMisc(1, \"Soul of the Forge\", \"+1 AC while wearing Medium or Heavy armor.\\n\\nSoul of the Forge was gained from Cleric (Forge Domain).\", \"!tDoc.getField('Medium Armor').isBoxChecked(0) && !tDoc.getField('Heavy Armor').isBoxChecked(0)\");",
			removeeval : "RemoveResistance(\"Fire\"); AddACMisc(0, \"Soul of the Forge\", \"+1 AC while wearing Medium or Heavy armor.\\n\\nSoul of the Forge was gained from Cleric (Forge Domain).\");",
		},
		"subclassfeature8" : {
			name : "Divine Strike",
			source : ["UA:CDD", 1],
			minlevel : 8,
			description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
			additional : levels.map(function (n) {
				if (n < 8) return "";
				return "+" + (n < 14 ? 1 : 2) + "d8 fire damage";
			}),
			calcChanges : {
				atkAdd : ["if (classes.known.cleric && classes.known.cleric.level > 7 && !isSpell) {fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 fire damage'; }; ", "Once per turn, I can have one of my weapon attacks that hit do extra fire damage."]
			}
		},
		"subclassfeature17" : {
			name : "Saint of Forge and Fire",
			source : ["UA:CDD", 1],
			minlevel : 17,
			description : "\n   " + "I gain immunity to fire damage" + "\n   " + "If wearing heavy armor, I'm resistant to nonmagical bludg./piercing/slashing damage",
			save : "Immunity to fire damage",
			dmgres : ["bludgeoning", "piercing", "slashing"],
			eval : "RemoveResistance(\"Fire\"); AddResistance(\"Bludg. (nonmagical)\", \"Cleric (Forge Domain).\\n\\nThis only applies while wearing heavy armor.\"); AddResistance(\"Pierc. (nonmagical)\", \"Cleric (War Domain).\\n\\nThis only applies while wearing heavy armor.\"); AddResistance(\"Slash. (nonmagical)\", \"Cleric (War Domain).\\n\\nThis only applies while wearing heavy armor.\");",
			removeeval : "AddResistance(\"Fire\", \"Cleric (Forge Domain)\"); RemoveResistance(\"Bludg. (nonmagical)\"); RemoveResistance(\"Pierc. (nonmagical)\"); RemoveResistance(\"Slash. (nonmagical)\");"
		},
	},
};
ClassList.cleric.subclasses[1].push("forge domain");

//a subclass for the Cleric, called "Grave Domain"
ClassSubList["grave domain"] = {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(grave)).*$/i,
	subname : "Grave Domain",
	source : ["UA:CDD", 2],
	spellcastingExtra : ["bane", "false life", "gentle repose", "ray of enfeeblement", "revivify", "vampiric touch", "blight", "death ward", "antilife shell", "raise dead"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiency",
			source : ["UA:CDD", 2],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with heavy armor",
			armor : [false, false, true, false],
		},
		"subclassfeature1.1" : {
			name : "Circle of Mortality",
			source : ["UA:CDD", 2],
			minlevel : 1,
			action : ["bonus action", ""],
			description : "\n   " + "Spells I cast to heal a living creature at 0 HP have their dice count as their max result" + "\n   " + "As a bonus action, I can cast the Spare the Dying cantrip, if I know it",
		},
		"subclassfeature1.2" : {
			name : "Eyes of the Grave",
			source : ["UA:CDD", 2],
			minlevel : 1,
			usages : 1,
			recovery : "long rest",
			description : "\n   " + "By spending 1 min in uninterrupted contemplation, I sense undead within 1 mile" + "\n   " + "I learn their number, distance, and direction from me" + "\n   " + "In addition, I know the creature type of the one with the highest CR",
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Path to the Grave",
			source : ["UA:CDD", 2],
			minlevel : 2,
			action : ["action", ""],
			description : "\n   " + "As an action, I can touch a creature to make it take extra damage from one attack" + "\n   " + "It is vulnerable to all the damage from the next spell or attack from me or an ally" + "\n   " + "This only applies to the first time that source inflicts damage, and then ends" + "\n   " + "If the creature has resistance or is immune to the damage, it instead loses it",
		},
		"subclassfeature6" : {
			name : "Sentinel at Death's Door",
			source : ["UA:CDD", 2],
			minlevel : 6,
			usages : 1,
			recovery : "short rest",
			action : ["reaction", ""],
			description : "\n   " + "As a reaction, I turn a critical hit to me or an ally I see within 30 ft to a normal hit",
		},
		"subclassfeature8" : {
			name : "Divine Strike",
			source : ["UA:CDD", 2],
			minlevel : 8,
			description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
			additional : levels.map(function (n) {
				if (n < 8) return "";
				return "+" + (n < 14 ? 1 : 2) + "d8 necrotic damage";
			}),
			calcChanges : {
				atkAdd : ["if (classes.known.cleric && classes.known.cleric.level > 7 && !isSpell) {fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 necrotic damage'; }; ", "Once per turn, I can have one of my weapon attacks that hit do extra necrotic damage."]
			}
		},
		"subclassfeature17" : {
			name : "Keeper of Souls",
			source : ["UA:CDD", 2],
			minlevel : 17,
			description : "\n   " + "Once per round, if I'm not incapacitated, I can manipulate the energy of the dying" + "\n   " + "When an enemy I can see dies within 30 ft of me, I or an ally within 30 ft regain HP" + "\n   " + "The HP regained is equal to the enemy's number of Hit Dice",
		},
	},
};
ClassList.cleric.subclasses[1].push("grave domain");

//a subclass for the Cleric, called "Protection Domain"
ClassSubList["protection domain"] = {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(protection|protect|defend|defense)).*$/i,
	subname : "Protection Domain",
	source : ["UA:CDD", 3],
	spellcastingExtra : ["compelled duel", "protection from evil and good", "aid", "protection from poison", "protection from energy", "slow", "guardian of faith", "otiluke's resilient sphere", "antilife shell", "wall of force"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiency",
			source : ["UA:CDD", 3],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with heavy armor",
			armor : [false, false, true, false],
		},
		"subclassfeature1.1" : {
			name : "Shield of the Faithful",
			source : ["UA:CDD", 3],
			minlevel : 1,
			action : ["reaction", ""],
			description : "\n   " + "As a reaction, when someone within 5 ft of me is attacked, I impose disadv. on the roll" + "\n   " + "To do this, I must be able to see both the attacker and the target",
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Radiant Defense",
			source : ["UA:CDD", 3],
			minlevel : 2,
			action : ["action", ""],
			description : "\n   " + "As an action, I channel blessed energy into an ally that I can see within 30 ft of me" + "\n   " + "The first time the ally is hit within the next minute, the attacker takes radiant damage",
			additional : ["", "2d10+2", "2d10+3", "2d10+4", "2d10+5", "2d10+6", "2d10+7", "2d10+8", "2d10+9", "2d10+10", "2d10+11", "2d10+12", "2d10+13", "2d10+14", "2d10+15", "2d10+16", "2d10+17", "2d10+18", "2d10+19", "2d10+20"]
		},
		"subclassfeature6" : {
			name : "Blessed Healer",
			source : ["UA:CDD", 3],
			minlevel : 6,
			description : "\n   " + "When I cast a spell to heal another using a spell slot, I heal 2 + the spell's level as well",
		},
		"subclassfeature8" : {
			name : "Divine Strike",
			source : ["UA:CDD", 3],
			minlevel : 8,
			description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
			additional : levels.map(function (n) {
				if (n < 8) return "";
				return "+" + (n < 14 ? 1 : 2) + "d8 radiant damage";
			}),
			calcChanges : {
				atkAdd : ["if (classes.known.cleric && classes.known.cleric.level > 7 && !isSpell) {fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 radiant damage'; }; ", "Once per turn, I can have one of my weapon attacks that hit do extra radiant damage."]
			}
		},
		"subclassfeature17" : {
			name : "Indomitable Defense",
			source : ["UA:CDD", 3],
			minlevel : 17,
			usages : 1,
			recovery : "short rest",
			action : ["action", " (transfer)"],
			description : "\n   " + "I gain resistance to two of: bludgeoning, necrotic, piercing, radiant, or slashing damage" + "\n   " + "Whenever I finish a short or long rest, I can change the damage types chosen" + "\n   " + "As an action, I can transfer both resistances to one creature I touch" + "\n   " + "As a bonus action, I can transfer the resistances back to myself" + "\n   " + "Otherwise, the creature keeps this resistance until the end of my next short or long rest",
			eval : "AddAction(\"bonus action\", \"Indomitable Defense (return)\", \"Cleric (Protection Domain)\");",
			removeeval : "RemoveAction(\"bonus action\", \"Indomitable Defense (return)\");",
		},
	},
};
ClassList.cleric.subclasses[1].push("protection domain");

/*	the Druid Circles Unearthed Arcana of 2016-11-28
	(http://media.wizards.com/2016/dnd/downloads/UA_Druid11272016_CAWS.pdf)
*/
//adds three subclasses: a subclass for the Druid, called "Circle of Dreams"
ClassSubList["circle of dreams"] = {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*\bdreams\b).*$/i,
	subname : "Circle of Dreams",
	source : ["UA:DC", 1],
	features : {
		"subclassfeature2" : {
			name : "Balm of the Summer Court",
			source : ["UA:DC", 1],
			minlevel : 2,
			description : "\n   " + "I have a pool of fey energy represented by a number of d6s equal to my druid level" + "\n   " + "As a bonus action, I can spend dice to heal an ally within 120 ft of me that I can see " + "\n   " + "I can spend up to half my druid level worth of dice from the pool at once" + "\n   " + "The ally heals an amount equal to the total rolled and gains 1 temp HP per die spent" + "\n   " + "In addition, the ally gains +5 ft speed per die spent, which lasts for 1 minute",
			usages : ["", "2d6 per ", "3d6 per ", "4d6 per ", "5d6 per ", "6d6 per ", "7d6 per ", "8d6 per ", "9d6 per ", "10d6 per ", "11d6 per ", "12d6 per ", "13d6 per ", "14d6 per ", "15d6 per ", "16d6 per ", "17d6 per ", "18d6 per ", "19d6 per ", "20d6 per "],
			recovery : "long rest",
		},
		"subclassfeature6" : {
			name : "Hearth of Moonlight and Shadow",
			source : ["UA:DC", 1],
			minlevel : 6,
			description : "\n   " + "At the start of a short or long rest, I can create a warded area of 30-ft radius" + "\n   " + "Within this area, my allies and I gain +5 on Wis (Perception) checks to detect creatures" + "\n   " + "Also, any light from open flames is not visible from outside the area" + "\n   " + "This effect lasts until the end of the rest or when I leave the area",
		},
		"subclassfeature10" : {
			name : "Hidden Paths",
			source : ["UA:DC", 1],
			minlevel : 10,
			description : "\n   " + "On my turn, I can teleport up to 30 ft to where I can see; Moved distance costs speed" + "\n   " + "As an action, I can teleport a willing ally I touch up to 30 ft to a spot I can see" + "\n   " + "Once I used either option, I can't use this feature again until 1d4 rounds have passed",
			usages : 1,
			recovery : "1d4 rounds",
			action : ["action", " (on ally)"]
		},
		"subclassfeature14" : {
			name : "Purifying Light",
			source : ["UA:DC", 1],
			minlevel : 14,
			description : "\n   " + "When I use a spell slot with a spell to restores HP, I can use Dispel Magic on the target" + "\n   " + "The Dispel Magic counts as if being cast with the same spell slot as the healing spell" + "\n   " + "Each creature effected by the Dispel Magic costs as one use of this feature",
			usages : 3,
			recovery : "long rest",
		},
	}
};
ClassList.druid.subclasses[1].push("circle of dreams");

//a subclass for the Druid, called "Circle of the Shepherd"
ClassSubList["circle of the shepherd"] = {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*shepherd).*$/i,
	subname : "Circle of the Shepherd",
	source : ["UA:DC", 1],
	features : {
		"subclassfeature2" : {
			name : "Beast Speech",
			source : ["UA:DC", 2],
			minlevel : 2,
			description : "\n   " + "I can talk with beasts, they understand me and I them, to the limit of their intelligence" + "\n   " + "This doesn't automatically make me friends with all beasts"
		},
		"subclassfeature2.1" : {
			name : "Spirit Bond",
			source : ["UA:DC", 2],
			minlevel : 2,
			description : "\n   " + "As a bonus action, I can summon a spirit to an empty space within 60 ft that I can see" + "\n   " + "The Bear, Hawk, or Wolf spirit, creates a 30-ft radius aura and persist for 1 minute" + "\n   " + "It doesn't occupy space, is immobile, and counts as neither a creature nor an object" + "\n    - " + "Bear: my allies in the area and I instantly gain 5 + my druid level in temp HP" + "\n       " + "While in the aura, my allies and I gain advantage on Strength checks and saves" + "\n    - " + "Hawk: my allies and I gain advantage on attacks against targets in the aura" + "\n    - " + "Wolf: my allies and I gain advantage on ability checks to detect targets in the aura" + "\n       " + "If I cast a healing spell with a spell slot, allies in the aura heal my druid level in HP",
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"subclassfeature6" : {
			name : "Mighty Summoner",
			source : ["UA:DC", 2],
			minlevel : 6,
			description : "\n   " + "Beast I summon with my spells have +2 HP per HD and their attacks count as magical"
		},
		"subclassfeature10" : {
			name : "Guardian Spirit",
			source : ["UA:DC", 2],
			minlevel : 10,
			description : "\n   " + "Whenever I finish a long rest, I gain the benefits of a Death Ward spell for 24 hours"
		},
		"subclassfeature14" : {
			name : "Faithful Summons",
			source : ["UA:DC", 2],
			minlevel : 14,
			description : "\n   " + "When I am reduced to 0 HP or incapacitated against my will, I can summon protectors" + "\n   " + "I gain the benefits of a Conjure Animals spell as if cast with a 9th-level spell slot" + "\n   " + "It summons 4 beast of my choice with CR 2 or lower within 20 ft of me for 1 hour" + "\n   " + "If they receive no commands from me, they protect me from harm and attack foes",
			usages : 1,
			recovery : "long rest"
		}
	}
};
ClassList.druid.subclasses[1].push("circle of the shepherd");

//a subclass for the Druid, called "Circle of Twilight"
ClassSubList["circle of twilight"] = {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*twilight).*$/i,
	subname : "Circle of Twilight",
	source : ["UA:DC", 2],
	features : {
		"subclassfeature2" : {
			name : "Harvest's Scythe",
			source : ["UA:DC", 3],
			minlevel : 2,
			description : "\n   " + "I have a pool of energy represented by a number of d10s equal to my druid level" + "\n   " + "When I roll damage for a spell, I can do extra necrotic damage with dice from the pool" + "\n   " + "I can spend up to half my druid level worth of dice from the pool at once" + "\n   " + "If I any hostiles die from an augmented spell, I can heal one ally I can see within 30 ft" + "\n   " + "The ally regains 2 HP per die spent; or 5 HP per die if one of the slain was undead  ",
			usages : ["", "2d10 per ", "3d10 per ", "4d10 per ", "5d10 per ", "6d10 per ", "7d10 per ", "8d10 per ", "9d10 per ", "10d10 per ", "11d10 per ", "12d10 per ", "13d10 per ", "14d10 per ", "15d10 per ", "16d10 per ", "17d10 per ", "18d10 per ", "19d10 per ", "20d10 per "],
			recovery : "long rest",
		},
		"subclassfeature6" : {
			name : "Speech Beyond the Grave",
			source : ["UA:DC", 3],
			minlevel : 6,
			description : "\n   " + "Once per short rest, I can cast Speak with Dead without spell slots or material comp." + "\n   " + "The target and I can understand each other, regardless of language or intelligence",
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Speech Beyond the Grave",
				spells : ["speak with dead"],
				selection : ["speak with dead"],
				oncesr : true,
			},
		},
		"subclassfeature10" : {
			name : "Watcher at the Threshold",
			source : ["UA:DC", 3],
			minlevel : 10,
			description : "\n   " + "I gain resistance to necrotic and radiant damage" + "\n   " + "While I'm not incapacitated, allies within 30 ft of me gain adv. on their death saves",
			eval : "AddResistance(\"Necrotic\", \"Watcher at the Threshold\"); AddResistance(\"Radiant\", \"Watcher at the Threshold\");",
			removeeval : "RemoveResistance(\"Necrotic\"); RemoveResistance(\"Radiant\");"
		},
		"subclassfeature14" : {
			name : "Paths of the Dead",
			source : ["UA:DC", 3],
			minlevel : 14,
			description : "\n   " + "Once per short rest, I can cast Etherealness without needing a spell slot (PHB 238)",
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Paths of the Dead",
				spells : ["etherealness"],
				selection : ["etherealness"],
				oncesr : true,
			},
		},
	}
};
ClassList.druid.subclasses[1].push("circle of twilight");

/*	the Fighter Martial Archetypes Unearthed Arcana of 2016-12-05
	(http://media.wizards.com/2016/dnd/downloads/2016_Fighter_UA_1205_1.pdf)
*/
//adds four subclasses: a subclass for the Fighter, called "Arcane Archer"
ClassSubList["arcane archer"] = {
	regExpSearch : /^(?=.*arcane)(?=.*archer).*$/i,
	subname : "Arcane Archer",
	source : ["UA:FMA", 1],
	fullname : "Arcane Archer",
	features : {
		"subclassfeature3" : {
			name : "Arcane Arrow",
			source : ["UA:FMA", 1],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I can create one magical arrow that I can fire with a bow" + "\n   " + "A shot with the arrow counts as magical and does additional force damage on a hit" + "\n   " + "When I create the arrow, I can apply one of my known Arcane Shots on it" + "\n   " + "This arrow lasts until the end of my turn or until I hit or miss a target with it",
			additional : levels.map(function (n) {
				return n < 3 ? "" :
					(n < 18 ? "+2" : "+4") + "d6 force damage";
			}),
			additional : ["", "", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+4d6 force damage", "+4d6 force damage", "+4d6 force damage"],
			usages : 2,
			recovery : "short rest",
			eval : "AddAction(\"bonus action\", \"Create Magical Arrow\", \"Arcane Archer (Arcane Arrow)\");",
			removeeval : "RemoveAction(\"bonus action\", \"Create Magical Arrow\")",
			calcChanges : {
				atkAdd : ["if ((/longbow|shortbow/i).test(WeaponName) && (/^(?=.*arcane)(?=.*arrow).*$/i).test(inputText) && classes.known.fighter && classes.known.fighter.level) {fields.Description += (fields.Description ? '; +' : '+') + (classes.known.fighter.level < 18 ? 2 : 4) + 'd6 force damage' + (thisWeapon[1] ? '' : '; Counts as magical'); }; ", "If I include the words 'Arcane Arrow' in a longbow or shortbow's name, it gets an added description of the damage this Arcane Arrow adds."]
			}
		},
		"subclassfeature3.1" : {
			name : "Arcane Shot",
			source : ["UA:FMA", 1],
			minlevel : 3,
			description : "\n   " + "Use the \"Choose Features\" button above to add Arcane Shots to the third page",
			additional : ["", "", "2 known", "2 known", "2 known", "2 known", "3 known", "3 known", "3 known", "4 known", "4 known", "4 known", "4 known", "4 known", "5 known", "5 known", "5 known", "6 known", "6 known", "6 known"],
			extraname : "Arcane Shot",
			extrachoices : ["Beguiling Arrow", "Brute Bane Arrow", "Bursting Arrow", "Defending Arrow", "Grasping Arrow", "Piercing Arrow", "Seeking Arrow", "Shadow Arrow"],
			"beguiling arrow" : {
				name : "Beguiling Arrow",
				source : ["UA:FMA", 1],
				description : " [Enchantment]" + "\n   " + "If the arrow hits, I choose an ally withing 30 feet of the target" + "\n   " + "The target can't attack the chosen ally or include the ally in any harmful area of effects" + "\n   " + "This effect stops if the target is immune to charm effects or the ally damages the target"
			},
			"brute bane arrow" : {
				name : "Brute Bane Arrow",
				source : ["UA:FMA", 1],
				description : " [Necromancy]" + "\n   " + "If the arrow hits, the target's attacks deal half damage until the end of my next turn" + "\n   " + "Only attacks that deal bludgeoning, piercing or slashing damage are halved"
			},
			"bursting arrow" : {
				name : "Bursting Arrow",
				source : ["UA:FMA", 2],
				description : " [Evocation]" + "\n   " + "If the arrow hits, all creatures within 10 ft of the target creature take 2d6 force damage",
			},
			"defending arrow" : {
				name : "Defending Arrow",
				source : ["UA:FMA", 2],
				description : " [Abjuration]" + "\n   " + "If the arrow hits, the target has disadv. on its next attack before the end of my next turn"
			},
			"grasping arrow" : {
				name : "Grasping Arrow",
				source : ["UA:FMA", 2],
				description : " [Conjuration]" + "\n   " + "If the arrow hits, the target is wrapped with grasping, thorny brambles for 1 minute" + "\n   " + "The target has -10 ft speed; It takes 2d6 slashing damage when moving more than 1 ft" + "\n   " + "As an action, the target or a creature can remove the brambles with a DC 10 Str check"
			},
			"piercing arrow" : {
				name : "Piercing Arrow",
				source : ["UA:FMA", 2],
				description : " [Transmutation]" + "\n   " + "The arrow transform into an ethereal dart that creates a line of 1 ft wide and 30 ft long" + "\n   " + "I then make a separate attack using my Arcane Arrow against each creature in that line"
			},
			"seeking arrow" : {
				name : "Seeking Arrow",
				source : ["UA:FMA", 2],
				description : " [Divination]" + "\n   " + "As an action, I can make a ranged attack against a creature I have seen in the last minute" + "\n   " + "The seeking arrow moves around corners and obstacles to hit the target" + "\n   " + "The attack ignores 1/2 and 3/4 cover and disadvantage from range or being out of sight" + "\n   " + "The attack misses if the target is too far away or there is no path for the arrow to travel" + "\n   " + "I know if the arrow hits the target, but don't learn the location unless it's in line of sight",
				action : ["action", ""]
			},
			"shadow arrow" : {
				name : "Shadow Arrow",
				source : ["UA:FMA", 2],
				description : " [Illusion]" + "\n   " + "If the arrow hits, the target can't see beyond 30 ft until the end of my next turn"
			}
		},
		"subclassfeature3.2" : {
			name : "Archer's Lore",
			source : ["UA:FMA", 1],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with two skills" + "\n   " + "I can choose from: Arcana, Athletics, Nature, Perception, Stealth, or Survival",
			skillstxt : "\n\n" + toUni("Arcane Archer") + ": Choose two from Arcana, Athletics, Nature, Perception, Stealth, and Survival."
		},
		"subclassfeature7" : {
			name : "Conjure Arrows",
			source : ["UA:FMA", 1],
			minlevel : 7,
			description : "\n   " + "As an action, I can create up to 20 nonmagical arrows that remain for 10 minutes" + "\n   " + "The arrows vanish if I use this feature again with 10 minutes",
			action : ["action", ""]
		},
		"subclassfeature15" : {
			name : "Ever-Ready Arrow",
			source : ["UA:FMA", 1],
			minlevel : 15,
			description : "\n   " + "I regain one use of Arcane Arrow one minute after I expend my last remaining use of it"
		}
	}
};
ClassList.fighter.subclasses[1].push("arcane archer");

//a subclass for the Fighter, called "Knight"
ClassSubList["knight"] = {
	regExpSearch : /^(?!.*(exalted|sacred|holy|divine|nature|natural|purple.*dragon|green|fey|horned))(?=.*knight).*$/i,
	subname : "Knight",
	source : ["UA:FMA", 2],
	fullname : "Knight",
	features : {
		"subclassfeature3" : {
			name : "Born in the Saddle",
			source : ["UA:FMA", 2],
			minlevel : 3,
			description : "\n   " + "Mounting or dismounting a creature costs me only 5 ft of movement" + "\n   " + "I have advantage on saving throws made to avoid falling off my mount" + "\n   " + "If I fall off my mount for less than 10 ft while not incapacitated, I land on my feet",
			save : "Adv. vs. falling off my mount"
		},
		"subclassfeature3.1" : {
			name : "Implacable Mark",
			source : ["UA:FMA", 2],
			minlevel : 3,
			description : "\n   " + "If I hit a creature with a melee weapon attack, I mark it until the end of my next turn" + "\n   " + "A marked target has disadv. on any attacks vs. those that didn't mark it" + "\n   " + "I can attack the target I marked if it is within 5 ft of me and does one of the following:" + "\n    - " + "It moves at least 1 foot on its turn" + "\n    - " + "It makes an attack that it suffers disadv. on from being marked" + "\n   " + "This attack uses my reaction, has adv., and adds my fighter level as extra damage" + "\n   " + "I can still do this if I already used my reaction this round, but not this turn",
			recovery : "short rest",
			usages : 3,
			additional : levels.map(function (n) {
				return n < 3 ? "" : "+" + n + " damage";
			}),
			action : ["reaction", ""],
			calcChanges : {
				atkCalc : ["if (isMeleeWeapon && classes.known.fighter && classes.known.fighter.level > 2 && (/\\b(implacable.?mark|marked)\\b/i).test(WeaponText)) { output.extraDmg += classes.known.fighter.level; }; ", "If I include the words 'Implacable Mark' or 'Marked' in the name or description of a melee weapon, it gets my fighter level added to its Damage."]
			}
		},
		"subclassfeature7" : {
			name : "Noble Cavalry",
			source : ["UA:FMA", 2],
			minlevel : 7,
			description : "\n   " + "I gain proficiency with two skills or one language" + "\n   " + "I can choose the skills from: Animal Handling, History, Insight, Persuasion, and Religion",
			skillstxt : "\n\n" + toUni("Knight") + ": Choose two from Animal Handling, History, Insight, Persuasion, and Religion. Alternatively, I learn one language.",
			eval : "AddLanguage(\"+1 from Noble Cavalry\", \"being a Knight (Noble Cavalry) and not opting to learn two skill proficiencies.\");",
			removeeval : "RemoveLanguage(\"+1 from Noble Cavalry\", \"being a Knight (Noble Cavalry) and not opting to learn two skill proficiencies.\");"
		},
		"subclassfeature10" : {
			name : "Hold the Line",
			source : ["UA:FMA", 2],
			minlevel : 10,
			description : "\n   " + "As a reaction when a creature within 5 ft of me moves at least 1 ft, I can attack it" + "\n   " + "This attack is made with a melee weapon attack and deals extra damage on a hit" + "\n   " + "If this hits, the attack reduces the target's speed to 0 until the end of this turn",
			additional : levels.map(function (n) {
				return n < 10 ? "" : "+" + Math.floor(n / 2) + " damage";
			}),
			action : ["reaction", ""],
			calcChanges : {
				atkCalc : ["if (isMeleeWeapon && classes.known.fighter && classes.known.fighter.level > 9 && (/holds?.the.line/i).test(WeaponText)) { output.extraDmg += Math.floor(classes.known.fighter.level / 2); }; ", "If I include the words 'Hold the Line' in the name or description of a melee weapon, it gets half my fighter level added to its Damage."]
			}
		},
		"subclassfeature15" : {
			name : "Rapid Strike",
			source : ["UA:FMA", 3],
			minlevel : 15,
			description : "\n   " + "If I have adv. on an attack, I can forgo it to make an extra attack as a bonus action" + "\n   " + "This attack has to be with the same weapon against the same target",
			action : ["bonus action", ""]
		},
		"subclassfeature18" : {
			name : "Defender's Blade",
			source : ["UA:FMA", 3],
			minlevel : 18,
			description : "\n   " + "I can do opportunity attacks if I already used my reaction this round, but not this turn" + "\n   " + "I gain +1 bonus to AC when I'm wearing heavy armor",
			eval : "AddACMisc(1, \"Defender's Blade\", \"When wearing heavy armor, the class feature Defender's Blade gives a +1 bonus to AC\", \"!tDoc.getField('Heavy Armor').isBoxChecked(0)\")",
			removeeval : "AddACMisc(0, \"Defender's Blade\", \"When wearing heavy armor, the class feature Defender's Blade gives a +1 bonus to AC\")",
		},
	}
};
ClassList.fighter.subclasses[1].push("knight");

//a subclass for the Fighter, called "Samurai"
ClassSubList["samurai"] = {
	regExpSearch : /samurai/i,
	subname : "Samurai",
	source : ["UA:FMA", 3],
	fullname : "Samurai",
	features : {
		"subclassfeature3" : {
			name : "Fighting Spirit",
			source : ["UA:FMA", 3],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I can give myself benefits that last until the end of my next turn" + "\n   " + "I then gain adv. on my attacks and resistance to bludgeoning/piercing/slashing damage",
			recovery : "short rest",
			usages : 3,
			action : ["bonus action", ""]
		},
		"subclassfeature7" : {
			name : "Elegant Courtier",
			source : ["UA:FMA", 3],
			minlevel : 7,
			description : "\n   " + "I can add my Wis modifier to any Cha check to persuade anyone of a high social station" + "\n   " + "I gain proficiency with one language and the History, Insight, or Persuasion skill",
			skillstxt : "\n\n" + toUni("Samurai") + ": History, Insight, or Persuasion.",
			eval : "AddLanguage(\"+1 from Elegant Courtier\", \"being a Samurai (Elegant Courtier)\");",
			removeeval : "RemoveLanguage(\"+1 from Elegant Courtier\", \"being a Samurai (Elegant Courtier)\");",
		},
		"subclassfeature10" : {
			name : "Unbreakable Will",
			source : ["UA:FMA", 3],
			minlevel : 10,
			description : "\n   " + "I gain proficiency with Wis saves, or if I'm already proficient, either Int or Cha saves",
			skillstxt : "\n\n" + toUni("Samurai") + ": History, Insight, or Persuasion.",
			eval : "if (Who(\"Wis ST Prof\") === \"\") Checkbox(\"Wis ST Prof\", true, \"Proficiency with Wisdom saving throws was gained from Samurai (Unbreakable Will)\");",
			removeeval : "if (Who(\"Wis ST Prof\") === \"Proficiency with Wisdom saving throws was gained from Samurai (Unbreakable Will)\") Checkbox(\"Wis ST Prof\", false, \"\");",
		},
		"subclassfeature15" : {
			name : "Rapid Strike",
			source : ["UA:FMA", 3],
			minlevel : 15,
			description : "\n   " + "If I have adv. on an attack, I can forgo it to make an extra attack as a bonus action" + "\n   " + "This attack has to be with the same weapon against the same target",
			action : ["bonus action", ""]
		},
		"subclassfeature18" : {
			name : "Strength Before Death",
			source : ["UA:FMA", 3],
			minlevel : 18,
			description : "\n   " + "If I take damage that would reduce me to 0 HP, I can delay that damage" + "\n   " + "I then immediately take a bonus turn, interrupting the current turn" + "\n   " + "I don't take the delayed damage until the bonus turn ends and can affect that damage",
			recovery : "long rest",
			usages : 1,
		},
	}
};
ClassList.fighter.subclasses[1].push("samurai");

//a subclass for the Fighter, called "Sharpshooter"
ClassSubList["sharpshooter"] = {
	regExpSearch : /sharpshooter/i,
	subname : "Sharpshooter",
	source : ["UA:FMA", 3],
	fullname : "Sharpshooter",
	features : {
		"subclassfeature3" : {
			name : "Steady Aim",
			source : ["UA:FMA", 3],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I can carefully aim my ranged weapon on a target I can see in range" + "\n   " + "Until the end of my turn, my attacks with this weapon on that target get to:" + "\n   " + "Ignore half and three-quarter cover; Add 2 + half fighter level damage per hit",
			recovery : "short rest",
			usages : 3,
			additional : levels.map(function (n) {
				return n < 3 ? "" : "+" + (2 + Math.floor(n / 2)) + " damage";
			}),
			action : ["bonus action", ""],
			calcChanges : {
				atkAdd : ["if (isRangedWeapon && classes.known.fighter && classes.known.fighter.level > 2 && (/steady.{0,3}aim/i).test(inputText)) { fields.Description += (fields.Description ? '; ' : '') + 'Ignores 1/2 and 3/4 cover'; }; ", "If I include the words 'Steady Aim' in the name of a ranged weapon, it gets 2 + half my fighter level added to its Damage, and the fact that it ignores half and three-quarter cover added to its description."],
				atkCalc : ["if (isRangedWeapon && classes.known.fighter && classes.known.fighter.level > 2 && (/steady.{0,3}aim/i).test(WeaponText)) { output.extraDmg += 2 + Math.floor(classes.known.fighter.level / 2); }; ", ""]
			}
		},
		"subclassfeature7" : {
			name : "Careful Eyes",
			source : ["UA:FMA", 4],
			minlevel : 7,
			description : "\n   " + "As a bonus action, I can take the Search action" + "\n   " + "I gain proficiency with one skill, Perception, Investigation, or Survival",
			skillstxt : "\n\n" + toUni("Sharpshooter") + ": Perception, Investigation, or Survival.",
			action : ["bonus action", ""]
		},
		"subclassfeature10" : {
			name : "Close-Quarters Shooting",
			source : ["UA:FMA", 4],
			minlevel : 10,
			description : "\n   " + "I don't have disadvantage when making a ranged attack while within 5 ft of a hostile" + "\n   " + "A hostile within 5 ft that I hit with a ranged attack on my turn, can't take reactions" + "\n   " + "This lasts until the end of my turn",
		},
		"subclassfeature15" : {
			name : "Rapid Strike",
			source : ["UA:FMA", 4],
			minlevel : 15,
			description : "\n   " + "If I have adv. on an attack, I can forgo it to make an extra attack as a bonus action" + "\n   " + "This attack has to be with the same weapon against the same target",
			action : ["bonus action", ""]
		},
		"subclassfeature18" : {
			name : "Snap Shot",
			source : ["UA:FMA", 4],
			minlevel : 18,
			description : "\n   " + "I can make one more ranged attack with my Attack action on my first turn of combat",
		},
	}
};
ClassList.fighter.subclasses[1].push("sharpshooter");

/*	the Monk Monastic Traditions Unearthed Arcana of 2016-12-12
	(http://media.wizards.com/2016/dnd/downloads/M_2016_UAMonk1_12_12WKWT.pdf)
*/
//adds two subclasses: a subclass for the Monk, called "Way of the Kensei"
ClassSubList["way of the kensei"] = {
	regExpSearch : /^(?=.*kensei)((?=.*(monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
	subname : "Way of the Kensei",
	source : ["UA:MMT", 1],
	features : {
		"subclassfeature3" : {
			name : "Path of the Kensei",
			source : ["UA:MMT", 1],
			minlevel : 3,
			description : " [3 martial weapons proficiencies]" + "\n   " + "Martial weapons I am proficient with count as kensei weapons for me" + "\n   " + "With these, I can use Dex instead of Str and use the Martial Arts damage die" + "\n   " + "As a bonus action, my kensei weapon deal +1d4 bludg. damage for an Attack action",
			action: ["bonus action", " (after hit)"],
			extraname : "Way of the Kensei 3",
			"kensei defense" : {
				name : "Kensei Defense",
				source : ["UA:MMT", 1],
				description : "\n   " + "If I make an unarmed strike with an Attack action, I can use my kensei weapon to defend" + "\n   " + "Until the start of my next turn, if I'm not incapacitated, I gain +2 AC while holding it"
			},
			eval : "ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"kensei defense\", \"extra\"]);",
			removeeval : "ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"kensei defense\", \"extra\"], \"remove\");",
			calcChanges : {
				atkAdd : ["var monkDie = function(n) {return n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10;}; if (classes.known.monk && classes.known.monk.level > 2 && fields.Proficiency && theWea && !isSpell && !(/shortsword/i).test(theWea.name) && (/martial/i).test(theWea.type)) {var aMonkDie = aMonkDie ? aMonkDie : monkDie(classes.known.monk.level); try {var curDie = eval(fields.Damage_Die.replace('d', '*'));} catch (e) {var curDie = 'x';}; if (isNaN(curDie) || curDie < aMonkDie) {fields.Damage_Die = '1d' + aMonkDie; }; fields.Mod = StrDex; fields.Description += (fields.Description ? '; ' : '') + 'As bonus action with Attack action, +1d4 bludg. damage'; }; ", "I can use either Strength or Dexterity and my Martial Arts damage die in place of the normal damage die for any martial weapons I am proficient with (Kensei Weapons).\n - If I score a hit with one of these kensei weapons as part of an Attack action, I can take a bonus action to have that hit, and any other hit after that as part of the same action, do +1d4 bludgeoning damage."]
			}
		},
		"ki-empowered strikes" : {
			name : "One with the Blade",
			source : ["UA:MMT", 1],
			minlevel : 6,
			description : "\n   " + "My unarmed strikes and kensei weapon attacks count as magical",
			calcChanges : {
				atkAdd : ["if (((/unarmed strike/i).test(WeaponName) || (theWea && !isSpell && (/martial/i).test(theWea.type))) && fields.Description.indexOf('Counts as magical') === -1 && !thisWeapon[1]) {fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical';}; ", "My unarmed strikes and Kensei Weapons count as magical for overcoming resistances and immunities."]
			}
		},
		"subclassfeature6" : {
			name : "Precise Strike",
			source : ["UA:MMT", 1],
			minlevel : 6,
			description : "As a bonus action, I can focus my attention on one creature I can see within 30 ft" + "\n   " + "This turn, I double my proficiency bonus on my next weapon attack against that mark",
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""],
			calcChanges : {
				atkCalc : ["if (!isSpell && !isDC && (/precise.{0,3}strike/i).test(WeaponText)) {output.prof *= 2; }; ", "If I include the words 'Precise Strike' in a weapon's name, or description it gets twice my proficiency bonus added to its To Hit instead of only once."]
			}
		},
		"subclassfeature17" : {
			name : "Unerring Accuracy",
			source : ["UA:MMT", 1],
			minlevel : 17,
			description : "\n   " + "On each of my turns, I can reroll one weapon attack roll I make that misses",
			extraname : "Way of the Kensei 11",
			"sharpen the blade" : {
				name : "Sharpen the Blade",
				source : ["UA:MMT", 1],
				description : " [1 to 3 ki points]" + "\n   " + "As a bonus action, I can grant my weapon a bonus to attack and damage rolls" + "\n   " + "This bonus is equal to the number of ki points I spend; It lasts for 1 minute",
				action : ["bonus action", ""]
			},
			changeeval : "if (newClassLvl.monk >= 11 && (What('Extra.Notes') + What('Class Features')).toLowerCase().indexOf('sharpen the blade') === -1) {ClassFeatureOptions(['monk', 'subclassfeature17', 'sharpen the blade', 'extra'])} else if (newClassLvl.monk <= 11 && oldClassLvl.monk >= 11) {ClassFeatureOptions(['monk', 'subclassfeature17', 'sharpen the blade', 'extra'], 'remove')}"
		}
	}
};
ClassList.monk.subclasses[1].push("way of the kensei");

//a subclass for the Monk, called "Way of Tranquility"
ClassSubList["way of tranquility"] = {
	regExpSearch : /^(?=.*tranquility|tranquil|calm|diplomatic|diplomat)((?=.*(monk|monastic))|((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior))).*$/i,
	subname : "Way of Tranquility",
	source : ["UA:MMT", 2],
	features : {
		"subclassfeature3" : {
			name : "Path of Tranquility",
			source : ["UA:MMT", 2],
			minlevel : 3,
			description : "\n   " + "I cast Sanctuary on me, no material comp., lasts 8 hours, hostiles must save every hour",
			usages : 1,
			recovery : "1 min",
			action : ["bonus action", ""],
			spellcastingBonus : {
				name : "Way of Tranquility",
				spells : ["sanctuary"],
				selection : ["sanctuary"],
			},
		},
		"subclassfeature3.1" : {
			name : "Healing Hands",
			source : ["UA:MMT", 2],
			minlevel : 3,
			description : "\n   " + "As an action, I use points to heal living creature; or 5 points to cure one poison/disease" + "\n   " + "With Flurry of Blows, I can replace one unarmed strike with a use of this feature",
			usages : [0, 0, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200],
			recovery : "long rest",
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Emissary of Peace",
			source : ["UA:MMT", 2],
			minlevel : 6,
			description : " [Performance or Persuasion prof]" + "\n   " + "I get adv. on Cha checks to calm or counsel peace; not with Deception or Intimidation",
			skillstxt : "\n\n" + toUni("Way of Tranquility") + ": Choose one from Performance or Persuasion.",
			extraname : "Way of Tranquility 11",
			"douse the flames of war" : {
				name : "Douse the Flames of War",
				source : ["UA:MMT", 1],
				description : "\n   " + "As an action, a creature I touch must make a Wisdom save or have no violent impulses" + "\n   " + "If the target is missing any HP it succeeds on the save; The effect lasts for 1 minute" + "\n   " + "During this time, it can't attack or cast spells that deal damage or force a saving throw" + "\n   " + "This effect ends if the target is attacked, takes damage, or is forced to make a saving throw" + "\n   " + "It also ends if the target witnesses any of those things happening to its allies",
				action : ["action", ""]
			},
			changeeval : "if (newClassLvl.monk >= 11 && (What(\"Extra.Notes\") + What(\"Class Features\")).toLowerCase().indexOf(\"douse the flames of war\") === -1) {ClassFeatureOptions([\"monk\", \"subclassfeature6\", \"douse the flames of war\", \"extra\"]);} else if (newClassLvl.monk <= 11 && oldClassLvl.monk >= 11) {ClassFeatureOptions([\"monk\", \"subclassfeature6\", \"douse the flames of war\", \"extra\"], \"remove\");}"
		},
		"subclassfeature17" : {
			name : "Anger of a Gentle Soul",
			source : ["UA:MMT", 2],
			minlevel : 17,
			description : "\n   " + "As a reaction if another I see goes to 0 HP, I get bonus damage until my next turn ends",
			usages : 1,
			recovery : "short rest",
			additional : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "+17", "+18", "+19", "+20"],
			action : ["reaction", ""]
		}
	}
};
ClassList.monk.subclasses[1].push("way of tranquility");

/*	the Paladin Sacred Oaths Unearthed Arcana of 2016-12-19
	(http://media.wizards.com/2016/dnd/downloads/UAPaladin_SO_20161219_1.pdf)
*/
//adds two subclasses: a subclass for the Paladin, called "Oath of Conquest"
ClassSubList["oath of conquest"] = {
	regExpSearch : /^((?=.*(knight tyrant|iron mongers))|((?=.*(conquest|tyranny|tyrant))(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper))))))).*$/i,
	subname : "Oath of Conquest",
	source : ["UA:PSO", 1],
	spellcastingExtra : ["armor of agathys", "command", "hold person", "spiritual weapon", "bestow curse", "fear", "blight", "dominate beast", "dominate person", "insect plague"],
	features : {
		"subclassfeature3" : {
			name : "Channel Divinity: Conquering Strike",
			source : ["UA:PSO", 1],
			minlevel : 3,
			description : "\n   " + "I can use my channel divinity to break a foe's will that I hit with my melee weapon" + "\n   " + "The target must make a Wisdom saving throw or become frightened for 1 minute" + "\n   " + "The target can repeat this save at the end of each or its turn to end the effect"
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Guided Strike",
			source : ["UA:PSO", 1],
			minlevel : 3,
			description : "\n   " + "When I make an attack roll, I can add a +10 bonus to the roll after seeing the d20 roll"
		},
		"subclassfeature7" : {
			name : "Aura of Conquest",
			source : ["UA:PSO", 1],
			minlevel : 7,
			description : "\n   " + "While I'm not incapacitated, enemies in range have disadv. on saves vs. being frightened",
			additional : ["", "", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"]
		},
		"subclassfeature15" : {
			name : "Implacable Spirit",
			source : ["UA:PSO", 1],
			minlevel : 15,
			description : "\n   " + "I can't be charmed",
			save : "Immune to being charmed"
		},
		"subclassfeature20" : {
			name : "Invincible Conqueror",
			source : ["UA:PSO", 2],
			minlevel : 20,
			description : "\n   " + "As an action, I can gain the following benefits for 1 minute:" + "\n    - " + "I have resistance all damage" + "\n    - " + "I can make an additional attack as part of my Attack action" + "\n    - " + "My melee weapons score critical hits on a roll of 19 or 20",
			recovery : "long rest",
			usages : 1,
			action : ["action", ""]
		}
	}
};
ClassList.paladin.subclasses[1].push("oath of conquest");

//a subclass for the Paladin, called "Oath of Treachery"
ClassSubList["oath of treachery"] = {
	regExpSearch : /^((?=.*blackguard)|(((?=.*(treachery|tyranny|tyrant))(?=.*paladin))|((?=.*(profane|unholy))(?=.*(knight|fighter|warrior|warlord|trooper))))).*$/i,
	subname : "Oath of Treachery",
	source : ["UA:PSO", 2],
	spellcastingExtra : ["charm person", "expeditious retreat", "invisibility", "mirror image", "gaseous form", "haste", "confusion", "greater invisibility", "dominate person", "passwall"],
	features : {
		"subclassfeature3" : {
			name : "Channel Divinity: Conjure Duplicate",
			source : ["UA:PSO", 2],
			minlevel : 3,
			description : "\n   " + "As an action, I create 1 illusory duplicate of myself within 30 ft of me for 1 min (conc)" + "\n   " + "As a bonus action, I can move it up to 30 ft to a space I can see within 120 ft of me" + "\n   " + "I can cast spells as though I was in its space, but still have to use my own senses" + "\n   " + "I have advantage on attacks if the target is within 5 ft of the duplicate and me",
			action : ["action", ""],
			eval : "AddAction(\"bonus action\", \"Move Duplicate\", \"Paladin (Oath of Treachery) - Channel Divinity: Conjure Duplicate\")",
			removeeval : "RemoveAction(\"bonus action\", \"Move Duplicate\")"
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Poison Strike",
			source : ["UA:PSO", 2],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I imbue one weapon or piece of ammunition with poison upon touch" + "\n   " + "This poison lasts for 1 minute and will affect the next time I hit a target with it" + "\n   " + "The target takes 2d10 + my paladin level poison damage immediately after the hit" + "\n   " + "You automatically roll 20 on the 2d10 if you had advantage on the attack roll",
			action : ["bonus action", ""],
			additional : levels.map(function (n) {
				return n < 3 ? "" : "2d10+" + n + " damage";
			}),
			calcChanges : {
				atkAdd : ["if (!isSpell && (/^(?=.*poison)(?=.*strike).*$/i).test(inputText)) {fields.Description += (fields.Description ? '; +' : '+') + '2d10+' + classes.known.paladin.level + ' poison damage (or ' + (classes.known.paladin.level + 20) + ' if adv.)'; }; ", "If I include the words 'Poison Strike' in a weapon's name, it gets an added description of the extra 2d10 + paladin level of poison damage it would do. If I have advantage on the attack, I can treat the 2d10 as rolling 20 in total."]
			}
		},
		"subclassfeature7" : {
			name : "Cull the Herd",
			source : ["UA:PSO", 3],
			minlevel : 7,
			description : "\n   " + "I have adv. on melee attacks against creatures that have an ally of it within 5 ft of it"
		},
		"subclassfeature7.1" : {
			name : "Treacherous Strike",
			source : ["UA:PSO", 3],
			minlevel : 7,
			description : "\n   " + "As a reaction when a creature within 5 ft misses me, I can redirect the attack" + "\n   " + "If it can be charmed, it rerolls the attack on a target of my choice within 5 ft of it",
			recovery : "short rest",
			usages : 3,
			action : ["reaction", ""]
		},
		"subclassfeature15" : {
			name : "Blackguard's Escape",
			source : ["UA:PSO", 3],
			minlevel : 15,
			description : "\n   " + "As a reaction after I am hit by an attack, I can teleport up to 60 ft to a spot I can see" + "\n   " + "In doing this, I also become invisible (as the spell) until the end of my next turn",
			recovery : "short rest",
			usages : 1,
			action : ["reaction", ""],
			changeeval : "if (newClassLvl.paladin >= 20 && (What(\"Extra.Notes\") + What(\"Class Features\")).toLowerCase().indexOf(\"icon of deceit\") === -1) {ClassFeatureOptions([\"paladin\", \"subclassfeature15\", \"icon of deceit\", \"extra\"])} else if (newClassLvl.paladin < 20 && oldClassLvl.paladin >= 20) {ClassFeatureOptions([\"paladin\", \"subclassfeature15\", \"icon of deceit\", \"extra\"], \"remove\")};",
			extraname : "Oath of Treachery 20",
			"icon of deceit" : {
				name : "Icon of Deceit",
				source : ["UA:PSO", 3],
				description : "\n   " + "As an action, I can gain the following benefits for 1 minute:" + "\n    - " + "I become invisible" + "\n    - " + "If I have adv. on an attack, I do 20 extra damage with it if it hits" + "\n    - " + "If a creature hits me on its turn, it must make a Wis save or I control its next action" + "\n       " + "Provided it can be charmed and I am not incapacitated when it takes the action",
				recovery : "long rest",
				usages : 1,
				action : ["action", ""]
			}
		}
	}
};
ClassList.paladin.subclasses[1].push("oath of treachery");

/*	the Ranger and Rogue Unearthed Arcana of 2017-01-16
	(http://media.wizards.com/2016/dnd/downloads/2017_01_UA_RangerRogue_0117JCMM.pdf)
*/
//adds three subclasses: a subclass for the Ranger, called "Horizon Walker"
ClassSubList["horizon conclave"] = {
	regExpSearch : /^(?=.*horizon)(?=.*(walker|conclave)).*$/i,
	subname : "Horizon Conclave",
	source : ["UA:RnR", 1],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature3" : {
			name : "Planar magic",
			source : ["UA:RnR", 1],
			minlevel : 3,
			description : "\n   " + "I get bonus spells known, which do not count against the number of spells I can know",
			spellcastingExtra : ["protection from evil and good", "alter self", "protection from energy", "banishment", "teleportation circle"]
		},
		"subclassfeature3.1" : {
			name : "Planar Walker",
			source : ["UA:RnR", 1],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I choose an enemy within 30 ft of me that I can see" + "\n   " + "Until the end of this turn, my attack against that enemy ignore damage resistances" + "\n   " + "In addition, the first time I hit it this turn, it takes an extra 1d6 force damage",
			action : ["bonus action", ""]
		},
		"subclassfeature3.2" : {
			name : "Portal Lore",
			source : ["UA:RnR", 1],
			minlevel : 3,
			description : "\n   " + "As an action, I sense the distance and direction to any planar portals within 1000 ft" + "\n   " + "I also sense to which plane the portal leads to; I can't sense details if obscured by magic" + "\n   " + "I can use this feature additional times by expending spell slots of 2nd level or higher",
			usages : 1,
			recovery : "short rest",
			action : ["action", ""]
		},
		"subclassfeature7" : {
			name : "Ethereal Step",
			source : ["UA:RnR", 1],
			minlevel : 7,
			description : "\n   " + "As a bonus action, I cast the Etherealness spell, which lasts until the end of the turn",
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"subclassfeature11" : {
			name : "Distant Strike",
			source : ["UA:RnR", 1],
			minlevel : 11,
			description : "\n   " + "With the Attack action, I can teleport 10 ft before each attack, to a spot I can see" + "\n   " + "If I attack two or more creatures with this action, I get an extra attack against a third",
		},
		"subclassfeature15" : {
			name : "Spectral Defense",
			source : ["UA:RnR", 1],
			minlevel : 15,
			description : "\n   " + "As a reaction when I take damage, I can halve that damage against me",
			action : ["reaction", ""]
		},
	}
};
ClassSubList["horizon conclave"].features["subclassfeature3"].spellcastingExtra[100] = "AddToKnown";
ClassList.rangerua.subclasses[1].push("horizon conclave");
ClassSubList["horizon walker"] = eval(ClassSubList["horizon conclave"].toSource());
delete ClassSubList["horizon walker"].attacks;
ClassSubList["horizon walker"].subname = "Horizon Walker";
ClassSubList["horizon walker"].fullname = "Horizon Walker";
ClassList.ranger.subclasses[1].push("horizon walker");

//a subclass for the Ranger, called "Primeval Guardian"
ClassSubList["primeval guardian conclave"] = {
	regExpSearch : /^(?=.*primeval)(?=.*guardian).*$/i,
	subname : "Primeval Guardian Conclave",
	source : ["UA:RnR", 2],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature3" : {
			name : "Guardian magic",
			source : ["UA:RnR", 2],
			minlevel : 3,
			description : "\n   " + "I get bonus spells known, which do not count against the number of spells I can know",
			spellcastingExtra : ["entangle", "enhance ability", "conjure animals", "giant insect", "insect plague"]
		},
		"subclassfeature3.1" : {
			name : "Guardian Soul",
			source : ["UA:RnR", 2],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I transform to or from a guardian form, changing me as follows:" + "\n    - " + "I grow to Large size, all my movement is reduced to 5 ft, and I get +5 ft reach" + "\n    - " + "I gain half my ranger level in temporary HP at the start of each of my turns" + "\n   " + "This ends when I'm incapacitated; When it ends, I lose all temporary HP I got from it",
			additional : ["", "", "1 temp HP per round", "2 temp HP per round", "2 temp HP per round", "3 temp HP per round", "3 temp HP per round", "4 temp HP per round", "4 temp HP per round", "5 temp HP per round", "5 temp HP per round", "6 temp HP per round", "6 temp HP per round", "7 temp HP per round", "7 temp HP per round", "8 temp HP per round", "8 temp HP per round", "9 temp HP per round", "9 temp HP per round", "10 temp HP per round"],
			action : ["bonus action", " (start/end)"]
		},
		"subclassfeature3.2" : {
			name : "Piercing Thorns",
			source : ["UA:RnR", 2],
			minlevel : 3,
			description : "\n   " + "Once each turn, a hit from my weapon attack can deal 1d6 extra piercing damage",
			calcChanges : {
				atkAdd : ["if (!isSpell) {fields.Description += (fields.Description ? '; ' : '') + 'Once per turn, +1d6 piercing damage'; }; ", "My weapon attacks can deal 1d6 extra piercing damage once per turn."]
			}
		},
		"subclassfeature7" : {
			name : "Ancient Fortitude",
			source : ["UA:RnR", 2],
			minlevel : 7,
			description : "\n   " + "When I assume my guardian form, my HP \u0026 max HP increase by twice my ranger level" + "\n   " + "When I leave the form, my max HP reverts back, and any excess HP I have is lost",
			additional : ["", "", "", "", "", "", "", "+16 max HP", "+18 max HP", "+20 max HP", "+22 max HP", "+24 max HP", "+26 max HP", "+28 max HP", "+30 max HP", "+32 max HP", "+34 max HP", "+36 max HP", "+38 max HP", "+40 max HP"]
		},
		"subclassfeature11" : {
			name : "Rooted Defense",
			source : ["UA:RnR", 2],
			minlevel : 11,
			description : "\n   " + "While in guardian form, the ground within 30 ft of me is difficult terrain for hostiles",
		},
		"subclassfeature15" : {
			name : "Guardian Aura",
			source : ["UA:RnR", 2],
			minlevel : 15,
			description : "\n   " + "While I'm in my guardian form, I heal allies that start their turn within 30 ft of me" + "\n   " + "They heal half my ranger level if they are below half HP and not undead or constructs",
			additional : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "Heals 7 HP", "Heals 8 HP", "Heals 8 HP", "Heals 9 HP", "Heals 9 HP", "Heals 10 HP"]
		}
	}
};
ClassSubList["primeval guardian conclave"].features["subclassfeature3"].spellcastingExtra[100] = "AddToKnown";
ClassList.rangerua.subclasses[1].push("primeval guardian conclave");
ClassSubList["primeval guardian"] = eval(ClassSubList["primeval guardian conclave"].toSource());
delete ClassSubList["primeval guardian"].attacks;
ClassSubList["primeval guardian"].subname = "Primeval Guardian";
ClassSubList["primeval guardian"].fullname = "Primeval Guardian";
ClassList.ranger.subclasses[1].push("primeval guardian");

//a subclass for the Rogue, called "Scout"
ClassSubList["rogue_scout"] = {
	regExpSearch : /scout/i,
	subname : "Scout",
	source : ["UA:RnR", 2],
	features : {
		"subclassfeature3" : {
			name : "Skirmisher",
			source : ["UA:RnR", 3],
			minlevel : 3,
			description : "\n   " + "As a reaction when a hostile ends its turn within 5 ft of me, I can move half my speed",
			action : ["reaction", ""]
		},
		"subclassfeature3.1" : {
			name : "Survivalist",
			source : ["UA:RnR", 3],
			minlevel : 3,
			description : "\n   " + "I gain proficiency and expertise with the Nature and Survival skills",
			skillstxt : "\n\n" + toUni("Scout") + ": proficiency and expertise with Nature and Survival.",
			eval : "AddSkillProf('Nature', true, true); AddSkillProf('Survival', true, true);",
			removeeval : "AddSkillProf('Nature', false, true); AddSkillProf('Survival', false, true);"
		},
		"subclassfeature9" : {
			name : "Superior Mobility",
			source : ["UA:RnR", 3],
			minlevel : 9,
			description : "\n   " + "I gain +10 ft to my walking speed (and swimming/climbing speed, if applicable)",
			eval : "ChangeSpeed(10);",
			removeeval : "ChangeSpeed(-10);"
		},
		"subclassfeature13" : {
			name : "Ambush Master",
			source : ["UA:RnR", 3],
			minlevel : 13,
			description : "\n   " + "As a bonus action in the first combat round with a surprised foe, I can lead the ambush" + "\n   " + "If I do so, allies who can see me gets +5 to their initiative roll, up to my initiative value" + "\n   " + "Also, each ally gains +10 ft to its speed that lasts until the end their next turn",
			action : ["bonus action", " (first round)"]
		},
		"subclassfeature17" : {
			name : "Sudden Strike",
			source : ["UA:RnR", 3],
			minlevel : 17,
			description : "\n   " + "With the Attack action, I can make one additional attack as a bonus action" + "\n   " + "This attack can benefit from my Sneak Attack even if I already used it this turn" + "\n   " + "However, I still can't use Sneak Attack on a single target more than once per turn",
			action : ["bonus action", " (with Attack action)"]
		},
	}
};
ClassList.rogue.subclasses[1].push("rogue_scout");

/*	the Sorcerous Origins Unearthed Arcana of 2017-02-06
	(http://media.wizards.com/2017/dnd/downloads/26_UASorcererUA020617s.pdf)
*/
//adds four subclasses: a subclass for the Sorcerer, called "Favored Soul"
//this code includes contributions by /u/SoilentBrad, as well as LamentingDemon on GitHub
ClassSubList["sorcerer-favoured soul"] = {
	regExpSearch : /^(?=.*favou?red)(?=.*soul).*$/i,
	subname : "Favored Soul",
	source : ["UA:SO", 1],
	fullname : "Favored Soul",
	spellcastingList : {
		class : ["cleric", "sorcerer"]
	},
	features : {
		"subclassfeature1" : {
			name : "Divine Magic",
			source : ["UA:SO", 1],
			minlevel : 1,
			description : "\n   " + "When I select my 1st level or higher spells, I can also pick spells from the cleric spell list" + "\n   " + "These cleric spells count as sorcerer spells for me"
		},
		"subclassfeature1.1" : {
			name : "Supernatural Resilience",
			source : ["UA:SO", 1],
			minlevel : 1,
			description : "\n   " + "My hit point maximum increases by an amount equal to my sorcerer level",
			calcChanges : {
				hp : "if (classes.known.sorcerer) {extrahp += classes.known.sorcerer.level; extrastring += '\\n + ' + classes.known.sorcerer.level + ' from Supernatural Resilience (Sorcerer)'; }; "
			}
		},
		"subclassfeature1.2" : {
			name : "Favored by the Gods",
			source : ["UA:SO", 1],
			minlevel : 1,
			description : "\n   " + "If I fail a saving throw or miss with an attack roll, I can add 2d4 to the total",
			recovery : "short rest",
			usages : 1
		},
		"subclassfeature6" : {
			name : "Blessed Countenance",
			source : ["UA:SO", 1],
			minlevel : 6,
			description : "\n   " + "Choose an otherworldly quality using the \"Choose Feature\" button above" + "\n   " + "When my proficiency bonus applies to a Charisma check, I double that bonus",
			choices : ["Beautiful", "Youthful", "Kind", "Imposing"],
			"beautiful" : {
				name : "Beautiful",
				source : ["UA:SO", 1],
				description : "\n   " + "My appearance takes on an otherworldly quality of beauty" + "\n   " + "When my proficiency bonus applies to a Charisma check, I double that bonus"
			},
			"youthful" : {
				name : "Youthful",
				source : ["UA:SO", 1],
				description : "\n   " + "My appearance takes on an otherworldly quality of youthfulness" + "\n   " + "When my proficiency bonus applies to a Charisma check, I double that bonus"
			},
			"kind" : {
				name : "Kind",
				source : ["UA:SO", 1],
				description : "\n   " + "My appearance takes on an otherworldly quality of kindness" + "\n   " + "When my proficiency bonus applies to a Charisma check, I double that bonus"
			},
			"imposing" : {
				name : "Imposing",
				source : ["UA:SO", 1],
				description : "\n   " + "My appearance takes on an otherworldly quality of imposingness" + "\n   " + "When my proficiency bonus applies to a Charisma check, I double that bonus"
			},
			skillstxt : "\n\n" + toUni("Blessed Countenance (Sorcerer)") + ": I gain expertise in any Charisma-based skill I'm proficient with.",
			eval : "AddSkillProf('Dec', true, 'only'); AddSkillProf('Inti', true, 'only'); AddSkillProf('Perf', true, 'only'); AddSkillProf('Pers', true, 'only');",
			removeeval : "AddSkillProf('Dec', false, 'only'); AddSkillProf('Inti', false, 'only'); AddSkillProf('Perf', false, 'only'); AddSkillProf('Pers', false, 'only');"
		},
		"subclassfeature14" : {
			name : "Divine Purity",
			source : ["UA:SO", 1],
			minlevel : 14,
			description : "\n   " + "I become immune to disease, poison damage, and the poisoned condition",
			save : "Immune to poison damage, being poisoned, and disease"
		},
		"subclassfeature18" : {
			name : "Unearthly Recovery",
			source : ["UA:SO", 1],
			minlevel : 18,
			description : "\n   " + "As a bonus action when I have less than half of my max HP, I can heal myself" + "\n   " + "I regain a number of HP equal to half my maximum Hit Points",
			action : ["bonus action", ""],
			recovery : "long rest",
			usages : 1
		}
	}
};
ClassList.sorcerer.subclasses[1].push("sorcerer-favoured soul");

//a subclass for the Sorcerer, called "Phoenix Sorcery"
//this code includes contributions by /u/SoilentBrad, as well as Toby L.
ClassSubList["phoenix sorcery"] = {
	regExpSearch : /^(?=.*phoenix)(?=.*(sorcerer|sorcery|witch)).*$/i,
	subname : "Phoenix Sorcery",
	source : ["UA:SO", 1],
	fullname : "Phoenix Sorcerer",
	features : {
		"subclassfeature1" : {
			name : "Ignite",
			source : ["UA:SO", 2],
			minlevel : 1,
			description : "\n   " + "As an action, I can magically ignite a flammable object by touching it with my hand",
			action : ["action", ""],
		},
		"subclassfeature1.1" : {
			name : "Mantle of Flame",
			source : ["UA:SO", 2],
			minlevel : 1,
			description : desc([
				"As a bonus action, I can wreathe myself in fire for 1 minute, gaining these benefits:",
				" - I shed bright light in a 30-ft radius and dim light for an additional 30 ft",
				" - I deal my Charisma modifier in fire damage to all that touch me",
				" - I also deal this damage to all that hit me with a melee attack from within 5 ft",
				" - When I roll for fire damage on my turn, I add my Charisma damage to the result"
			]),
			action : ["bonus action", ""],
			recovery : "long rest",
			usages : 1
		},
		"subclassfeature6" : {
			name : "Phoenix Spark",
			source : ["UA:SO", 2],
			minlevel : 6,
			description : desc([
				"As a reaction when I am reduced to 0 HP, I can draw on the phoenix to stay at 1 HP",
				"All creatures within 10 ft of me take half my sorcerer level + my Cha mod fire damage",
				"If I have Mantle of Flame active, this damage is my sorcerer level + twice my Cha mod",
				"If I use this feature, my Mantle of Flame immediately ends"
			]),
			additional : levels.map( function(n) {
				if (n < 6) return "";
				return Math.floor(n / 2) + "+Cha \u007Cor\u007C " + n + "+2\u00D7Cha";
			}),
			action : ["reaction", ""],
			recovery : "long rest",
			usages : 1
		},
		"subclassfeature14" : {
			name : "Nourishing Fire",
			source : ["UA:SO", 2],
			minlevel : 14,
			description : desc([
				"When I cast a spell using a spell slot that includes a fire damage roll, I regain HP",
				"The HP regained is equal to the spell slot level + my Charisma modifier"
			])
		},
		"subclassfeature18" : {
			name : "Form of the Phoenix",
			source : ["UA:SO", 2],
			minlevel : 18,
			description : desc([
				"While my Mantle of Flame is active, I gain the following additional benefits:",
				"- I have a flying speed of 40 ft and can hover",
				"- I have resistance to all damage",
				"- If I use my Phoenix Spark, it deals an extra 20 fire damage to each creature"
			]),
			eval : "AddResistance(\"All (Mantle of Flame)\", \"Form of the Phoenix\");",
			removeeval : "RemoveResistance(\"All (Mantle of Flame)\");"
		}
	}
};
ClassList.sorcerer.subclasses[1].push("phoenix sorcery");

//a subclass for the Sorcerer, called "Sea Sorcery"
//this code includes contributions by /u/SoilentBrad
ClassSubList["sea sorcery"] = {
	regExpSearch : /^(?=.*sea)(?=.*(sorcerer|sorcery|witch)).*$/i,
	subname : "Sea Sorcery",
	source : ["UA:SO", 2],
	fullname : "Sea Sorcerer",
	features : {
		"subclassfeature1" : {
			name : "Soul of the Sea",
			source : ["UA:SO", 3],
			minlevel : 1,
			description : "\n   " + "I can breathe underwater and I have a swim speed equal to my walking speed",
			eval : "if (!CurrentRace.speed || !(/swim/i).test(CurrentRace.speed[0])) { Value('Speed', What('Speed').replace(/(\\d+) ?(ft|m)/i, '$1 $2\\n$1 $2 swim')); Value('Speed encumbered', What('Speed encumbered').replace(/(\\d+) ?(ft|m)/i, '$1 $2\\n$1 $2 swim').replace(/\\n/, typePF ? ' ' : '\\n')); };",
			removeeval : "if (!CurrentRace.speed || !(/swim/i).test(CurrentRace.speed[0])) { Value('Speed', What('Speed').replace(/(\\r| )?(\\d+) ?(ft|m) swim/i, '')); Value('Speed encumbered', What('Speed encumbered').replace(/(\\r| )?(\\d+) ?(ft|m) swim/i, '')); };"
		},
		"subclassfeature1.1" : {
			name : "Curse of the Sea",
			source : ["UA:SO", 3],
			minlevel : 1,
			description : desc([
				"I can curse a target that I hit with a cantrip or that fails its save against my cantrip",
				"This lasts until the end of my next turn or until I curse another target like this",
				"Once per turn when I cast a spell, I can trigger an active curse, if a condition is met",
				" - If spell dealt cold damage to it, its has -15 ft speed until the end of my next turn",
				" - If the spell dealt lightning damage to it, that damage is increased with my Cha mod",
				" - If the spell moved the target, it is moved an additional 15 ft",
				"Only one of these effects can be applied, even if the spell meets multiple conditions",
				"If the spell triggering the curse is a cantrip, the target stays cursed for another round"
			])
		},
		"subclassfeature6" : {
			name : "Watery Defense",
			source : ["UA:SO", 3],
			minlevel : 6,
			description : desc([
				"I gain resistance to fire damage",
				"I can protect myself when an attack deals bludgeoning, piercing, or slashing damage",
				"As a reaction when that happens, I reduce the damage by my sorcerer level + Cha mod",
				"I can then also move up to 30 ft without provoking opportunity attacks"
			]),
			additional : levels.map( function(n) {
				if (n < 6) return "";
				return n + " + Cha mod";
			}),
			action : ["reaction", ""],
			recovery : "short rest",
			usages : 1,
			eval : "AddResistance('fire', 'Watery Defense');",
			removeeval : "RemoveResistance('fire');"
		},
		"subclassfeature14" : {
			name : "Shifting Form",
			source : ["UA:SO", 3],
			minlevel : 14,
			description : desc([
				"I gain the ability to enter a liquid state while moving, squeezing through small spaces",
				"When I move on my turn, I take half damage from opportunity attacks",
				"I can move through any enemy's space, but can't willingly end my move in that space",
				"On my turn, I can move through any opening of at least 3 inches in diameter",
				"I can't end my move in a space smaller than one size category smaller than I am"
			])
		},
		"subclassfeature18" : {
			name : "Water Soul",
			source : ["UA:SO", 3],
			minlevel : 18,
			description : desc([
				"I no longer need to eat, drink, or sleep; Critical hits against me become normal hits",
				"I gain resistance to bludgeoning, piercing, and slashing damage"
			]),
			eval : "AddResistance('bludgeoning', 'Water Soul'); AddResistance('piercing', 'Water Soul'); AddResistance('slashing', 'Water Soul');",
			removeeval : "RemoveResistance('bludgeoning'); RemoveResistance('piercing'); RemoveResistance('slashing');"
		}
	}
};
ClassList.sorcerer.subclasses[1].push("sea sorcery");

//a subclass for the Sorcerer, called "Stone Sorcery"
//this code includes contributions by /u/SoilentBrad
ClassSubList["stone sorcery"] = {
	regExpSearch : /^(?=.*stone)(?=.*(sorcerer|sorcery|witch)).*$/i,
	subname : "Stone Sorcery",
	source : ["UA:SO", 3],
	fullname : "Stone Sorcerer",
	spellcastingExtra : ["compelled duel", "searing smite", "thunderous smite", "wrathful smite", "branding smite", "magic weapon", "blinding smite", "elemental weapon", "staggering smite"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiencies",
			source : ["UA:SO", 4],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with shields, simple weapons and martial weapons",
			armor : [false, false, false, true],
			weapons : [true, true]
		},
		"subclassfeature1.1" : {
			name : "Metal Magic",
			source : ["UA:SO", 4],
			minlevel : 1,
			description : "\n   " + "My affinity for metal allows me to select from a broader range of spells",
			spellcastingExtra : ["compelled duel", "searing smite", "thunderous smite", "wrathful smite", "branding smite", "magic weapon", "blinding smite", "elemental weapon", "staggering smite"],
		},
		"subclassfeature1.2" : {
			name : "Stone's Durability",
			source : ["UA:SO", 4],
			minlevel : 1,
			description : desc([
				"My hit point maximum increases by an amount equal to my sorcerer level",
				"As an action, I can gain an AC of 13 + Constitution modifier + shield",
				"This AC lasts until I don armor, I'm incapacitated, or use a bonus action to end it"
			]),
			action : ["action", " (start)"],
			eval : "AddAction(\"bonus action\", \"Stone's Durability (end)\", \"Stone's Durability (Stone Sorcerer)\");",
			removeeval : "RemoveAction(\"bonus action\", \"Stone's Durability (end)\");",
			calcChanges : {
				hp : "if (classes.known.sorcerer) {extrahp += classes.known.sorcerer.level; extrastring += '\\n + ' + classes.known.sorcerer.level + ' from Stone\\'s Durability (Sorcerer)'; }; "
			}
		},
		"subclassfeature6" : {
			name : "Stone Aegis",
			source : ["UA:SO", 4],
			minlevel : 6,
			description : desc([
				"As a bonus action, I can grant an aegis to an ally I can see within 60 ft of me",
				"The aegis reduces any bludgeoning, piercing, or slashing damage taken by the target",
				"This aegis lasts for 1 minute, until I use it again, or until I'm incapacitated",
				"As a reaction when the protected ally is attacked with a melee attack, I can teleport",
				"I can do this only if the attacker is within 60 ft of me and I can see it",
				"I teleport to an empty space next to it and make one melee weapon attack against it",
				"If this attack hits, the attack deals extra force damage"
			]),
			additional : levels.map( function(n) {
				if (n < 6) return "";
				return (Math.floor(n / 4) + 2) + " damage reduction; +" + (n < 11 ? 1 : n < 17 ? 2 : 3) + "d10 force damage";
			}),
			action : ["bonus action", ""],
			eval : "AddAction('reaction', 'Aegis Teleport', 'Stone Aegis (Stone Sorcerer)');",
			removeeval : "RemoveAction('reaction', 'Aegis Teleport');"
		},
		"subclassfeature14" : {
			name : "Stone's Edge",
			source : ["UA:SO", 4],
			minlevel : 14,
			description : desc([
				"Once per casting of a spell that deals damage, I can choose one creature damaged by it",
				"That creature takes extra force damage equal to half my sorcerer level"
			]),
			additional : levels.map( function(n) {
				return n < 14 ? "" : Math.floor(n / 2) + " force damage";
			}),
		},
		"subclassfeature18" : {
			name : "Earth Master's Aegis",
			source : ["UA:SO", 4],
			minlevel : 18,
			description : "\n   " + "My Stone's Aegis can now affect up to three creatures",
		},
	},
};
ClassList.sorcerer.subclasses[1].push("stone sorcery");

/*	Warlock and Wizard Unearthed Arcana of 2017-02-13
	(http://media.wizards.com/2017/dnd/downloads/20170213_Wizrd_Wrlck_UAv2_i48nf.pdf)
*/
//adds numerous warlock invocations (see UAstartupCode), and three subclasses:
//a subclass for the Warlock, called "The Hexblade"
//this code includes contributions by Greg N.
ClassSubList["warlock-the hexblade"] = {
	regExpSearch : /^(?=.*hexblade)(?=.*warlock).*$/i,
	subname : "the Hexblade",
	source : ["UA:WnW", 1],
	spellcastingExtra : ["shield", "wrathful smite", "branding smite", "magic weapon", "blink", "elemental weapon", "phantasmal killer", "staggering smite", "cone of cold", "destructive wave"],
	features : {
		"subclassfeature1" : {
			name : "Hex Warrior",
			source : ["UA:WnW", 1],
			minlevel : 1,
			description : desc([
				"I gain proficiency with medium armor, shields, and martial weapons",
				"With one-handed melee weapons I can use Charisma instead of Strength or Dexterity"
			]),
			armor : [false, true, false, true],
			weapons : [false, true],
			calcChanges : {
				atkAdd : ["if (isMeleeWeapon && !(/\\b(2|two).?hand(ed)?s?\\b/i).test(WeaponText)) { fields.Mod = What('Cha Mod') > What(AbilityScores.abbreviations[fields.Mod - 1] + ' Mod') ? 6 : fields.Mod; }; ", "For melee weapons that lack the two-handed property, I can use my Charisma instead of Strength or Dexterity."]
			}
		},
		"subclassfeature1.1" : {
			name : "Hexblade's Curse",
			source : ["UA:WnW", 1],
			minlevel : 1,
			description : desc([
				"As a bonus action, I can curse a creature I can see within 30 ft of me for 1 minute",
				" - I add my proficiency bonus to damage rolls against the cursed target",
				" - My attack rolls against the curse target score a critical hit on a roll of 19 and 20",
				" - If the target dies while cursed, I regain HP equal to my warlock level + Cha mod"
			]),
			recovery : "short rest",
			usages : levels.map( function(n) { return n < 14 ? 1 : ""; }),
			action : ["bonus action", ""],
			calcChanges : {
				atkAdd : ["if (!isDC && (/hexblade/i).test(WeaponText) && !CritChance) {var CritChance = 19; fields.Description += (fields.Description ? '; ' : '') + 'Crit on 19-20'; }; ", "If I include the word 'Hexblade' in the name of a weapon, the automation will treat the attack as being against a target of the Hexblade's Curse: adding my proficiency bonus to the damage and adding the increased chance of a critical hit to the description."],
				atkCalc : ["if ((/hexblade/i).test(WeaponText)) {output.extraDmg += output.prof; }; ", ""]
			}
		},
		"subclassfeature6" : {
			name : "Shadow Hound",
			source : ["UA:WnW", 1],
			minlevel : 6,
			description : desc([
				"My shadow becomes a hound of pure darkness; Truesight reveals its nature",
				"As a bonus action, I can have it slip into the shadow of another I can see within 60 ft",
				"I know the distance/direction to the target; I ignore 1/2, 3/4 cover of the target",
				"My shadow returns to me if I use a bonus action to do so, I become incapacitated, ",
				"a spell is used to stop it, or if one of us moves to another plane of existence"
			])
		},
		"subclassfeature10" : {
			name : "Armor of Hexes",
			source : ["UA:WnW", 2],
			minlevel : 10,
			description : "\n   " + "Targets affected by my hexblade's curse have a 50% of missing me with any attack roll"
		},
		"subclassfeature14" : {
			name : "Master of Hexes",
			source : ["UA:WnW", 2],
			minlevel : 14,
			description : desc([
				"I no longer need to rest to be able to use my Hexblade's Curse again",
				"However, when I curse a new target, the curse immediately ends on the previous target"
			])
		}
	}
};
ClassList.warlock.subclasses[1].push("warlock-the hexblade");

//a subclass for the Warlock, called "The Raven Queen"
//this code includes contributions by Ben Y. and Wizzard
ClassSubList["warlock-the raven queen"] = {
	regExpSearch : /^(?=.*\braven)(?=.*queen\b).*$/i,
	subname : "the Raven Queen",
	source : ["UA:WnW", 2],
	spellcastingExtra : ["false life", "sanctuary", "silence", "spiritual weapon", "feign death", "speak with dead", "ice storm", "locate creature", "commune", "cone of cold"],
	features : {
		"subclassfeature1" : {
			name : "Sentinel Raven",
			source : ["UA:WnW", 2],
			minlevel : 1,
			description : desc([
				"I gain the services of a spirit in the form of a raven (using the stats of a raven)",
				"It always obeys my commands, rolls its own initiative, and can be slain",
				"While it's within 100 ft, I can telepathically speak with it and see/hear what it does",
				"While it's on my shoulder, I gain Darkvision 30 ft and add my Cha mod to Perception",
				"While it's on my shoulder, it can't be targeted, take damage, or take actions",
				"It vanishes if it is more than 5 miles away from me, it dies, or if I die",
				"If it dies, I gain advantage on all attack rolls against its killer for 24 hours",
				"After a short rest, I can recall it to me regardless of its location or if it died"
			]),
			eval : "if (!(/darkvision/i).test(What('Vision'))) {AddString('Vision', 'Darkvision 30 ft', '; '); }; AddString('Vision', 'Cha mod added to (passive) Perception [Sentinel Raven]', '; '); Value(SkillsList.abbreviations[SkillsList[Who('Text.SkillsNames') === 'alphabeta' ? 'abbreviations' : 'abbreviationsByAS'].indexOf('Perc')] + ' Bonus', 'Cha');",
			removeeval : "RemoveString('Vision', 'Darkvision 30 ft'); RemoveString('Vision', 'Cha mod added to (passive) Perception [Sentinel Raven]'); var perFC = SkillsList.abbreviations[SkillsList[Who('Text.SkillsNames') === 'alphabeta' ? 'abbreviations' : 'abbreviationsByAS'].indexOf('Perc')] + ' Bonus'; if (What(perFC) === 'Cha') {Value(perFC, 0); };"
		},
		"subclassfeature6" : {
			name : "Soul of the Raven",
			source : ["UA:WnW", 2],
			minlevel : 6,
			description : desc([
				"As a bonus action, when my raven is perched on my shoulder, I can merge our bodies",
				"I become tiny and replace my speed with the raven's (10 ft, fly 50 ft)",
				"I can then use my action only to Dash, Disengage, Dodge, Help, Hide, or Search",
				"While merged, I still get all the benefits of my raven being perched on my shoulder",
				"I can end this as an action"
			]),
			action : ["bonus action", " (start)"],
			eval : "AddAction('action', 'Soul of the Raven (end)', 'Warlock (the Raven Queen)')",
			removeeval : "RemoveAction('action', 'Soul of the Raven (end)')"
		},
		"subclassfeature10" : {
			name : "Raven's Shield",
			source : ["UA:WnW", 3],
			minlevel : 10,
			description : "\n   " + "I can't be frightened, have advantage on death saves, and resistance to necrotic damage",
			save : "Immune to being frightened; Adv. on death saves",
			eval : "AddResistance('necrotic', 'Warlock (the Raven Queen)');",
			removeeval : "RemoveResistance('necrotic', 'Warlock (the Raven Queen)');"
		},
		"subclassfeature14" : {
			name : "Queen's Right Hand",
			source : ["UA:WnW", 3],
			minlevel : 14,
			description : "\n   " + "I can cast Finger of Death once per long rest",
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Queen's Right Hand",
				spells : ["finger of death"],
				selection : ["finger of death"],
				oncelr : true
			}
		}
	}
};
ClassList.warlock.subclasses[1].push("warlock-the raven queen");

//a subclass for the Wizard, called "Lore Mastery"
//this code includes contributions by /u/magicmanfk
ClassSubList["wizard-lore mastery"] = {
	regExpSearch : /^(?=.*\blore)(?=.*mastery?\b).*$/i,
	subname : "Lore Mastery",
	source : ["UA:WnW", 5],
	fullname : "Lore Master",
	features : {
		"subclassfeature2" : {
			name : "Lore Master",
			source : ["UA:WnW", 6],
			minlevel : 2,
			description : desc([
				"I can use my Intelligence modifier for initiative instead of my Dexterity modifier",
				"I get expertise with each Arcana, History, Nature, and Religion, if I'm proficient with it"
			]),
			skillstxt : "\n\n" + toUni("Lore Master") + ": Expertise with Arcana, History, Nature, and Religion if I am already proficient with the skill.",
			eval : "['Arc', 'His', 'Nat', 'Rel'].forEach( function(skl) { AddSkillProf(skl, undefined, 'only'); }); var changeI = \"if (What('Int Mod') > What('Dex Mod')) { var iIndx = SkillsList.abbreviations.indexOf('Init'); SkillsList.abilityScores[iIndx] = 'Int'; SkillsList.abbreviationsByAS[iIndx] = 'Int'; };\"; eval(changeI); if (What('User Script').indexOf(changeI) === -1) {tDoc.getField('User Script').value += '\\n\\n' + changeI};",
			removeeval : "['Arc', 'His', 'Nat', 'Rel'].forEach( function(skl) { AddSkillProf(skl, false, 'only'); }); SkillsList.abilityScores[iIndx] = 'Dex'; SkillsList.abbreviationsByAS[iIndx] = 'Dex'; var changeI = \"if (What('Int Mod') > What('Dex Mod')) { var iIndx = SkillsList.abbreviations.indexOf('Init'); SkillsList.abilityScores[iIndx] = 'Int'; SkillsList.abbreviationsByAS[iIndx] = 'Int'; };\"; RemoveString('User Script', changeI);"
		},
		"subclassfeature2.1" : {
			name : "Spell Secrets: Elements",
			source : ["UA:WnW", 6],
			minlevel : 2,
			description : desc([
				"I can change the damage type of spells I cast using spell slots (so not cantrips)",
				"I can swap out acid, cold, fire, force, lightning, necrotic, radiant, or thunder damage"
			])
		},
		"subclassfeature2.2" : {
			name : "Spell Secrets: Saves",
			source : ["UA:WnW", 6],
			minlevel : 2,
			description : "\n   " + "I can change the saving throw ability score to another for a spell I cast using a spell slot",
			recovery : "short rest",
			usages : 1
		},
		"subclassfeature6" : {
			name : "Alchemical Casting",
			source : ["UA:WnW", 6],
			minlevel : 6,
			description : desc([
				"When I cast a spell with a spell slot, I can expend one additional spell slot to augment it",
				" - 1st-level slot: one damage roll of the spell adds +2d10 force damage",
				" - 2nd-level slot: if the range of the spell is at least 30 ft, it becomes 1 mile",
				" - 3rd-level slot: the spell's save DC increases by 2"
			])
		},
		"subclassfeature10" : {
			name : "Prodigious Memory",
			source : ["UA:WnW", 6],
			minlevel : 10,
			description : "\n   " + "As a bonus action, I can replace one of my prepared spells with another from my book",
			recovery : "short rest",
			usages : 1,
			action : ["bonus action", ""]
		},
		"subclassfeature14" : {
			name : "Master of Magic",
			source : ["UA:WnW", 6],
			minlevel : 14,
			description : desc([
				"As a bonus action, I can call to mind one spell of my choice from any class' spell list",
				"This spell must be of a level I have spell slots for and that I don't already have prepared",
				"I can then cast it using the normal spellcasting rules, including expending a spell slot",
				"It counts a wizard spell; I can only cast the spell during the same turn I call it to mind"
			]),
			usages : 1,
			recovery : "long rest",
			action : ["bonus action", ""]
		}
	}
};
ClassList.wizard.subclasses[1].push("wizard-lore mastery");

/*	Wizard Revisited Unearthed Arcana of 2017-03-20
	(http://media.wizards.com/2017/dnd/downloads/MJ320UAWizardVF2017.pdf)
 */
//adds one subclass: a subclass for the Wizard, called "War Magic"
//this code includes contributions by erickrause
ClassSubList["wizard-war magic"] = {
	regExpSearch : /^(?=.*war)(?=.*(magic|mage)).*$/i,
	subname : "War Magic",
	source : ["UA:WR", 2],
	fullname : "War Mage",
	features : {
		"subclassfeature2" : { //has to be identical to a feature named in the ClassList
			name : "Arcane Deflection",
			source : ["UA:WR", 2],
			minlevel : 2,
			description : desc([
				"As a reaction when I'm hit by an attack, I can gain +2 to my AC against that attack",
				"As a reaction when I fail a Con save, I can gain +4 bonus to that saving throw",
				"After I do either, I can't cast spells other than cantrips until the end of my next turn"
			]),
			action : ["reaction", ""]
		},
		"subclassfeature2.1" : {
			name : "Tactical Wit",
			source : ["UA:WR", 2],
			minlevel : 2,
			description : desc([
				"I gain a bonus to my initiative rolls equal to my Intelligence modifier"
			]),
			eval : "if (!What('Init Bonus')) { Value('Init Bonus', 'Int'); };",
			removeeval : "if (What('Init Bonus') === 'Int') { Value('Init Bonus', 0); };"
		},
		"subclassfeature6" : {
			name : "Power Surge",
			source : ["UA:WR", 2],
			minlevel : 6,
			description : desc([
				"When multiple targets have to save vs. one of my spells, I can have it do more damage",
				"On the turn I cast the spell, I can roll 2 additional damage dice for it"
			]),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature10" : {
			name : "Durable Magic",
			source : ["UA:WR", 2],
			minlevel : 10,
			description : desc([
				"While I'm maintaining concentration on a spell, I gain +2 to AC and all saving throws"
			])
		},
		"subclassfeature14" : {
			name : "Deflecting Shroud",
			source : ["UA:WR", 2],
			minlevel : 14,
			description : desc([
				"When I use my Arcane Deflection feature, magical energy arcs from me",
				"Any creatures of my choice within 10 ft of me take half my level in force damage"
			]),
			additional : levels.map( function(n) { return n < 14 ? "" : Math.floor(n/2) + " force damage"; })
		}
	}
};
ClassList.wizard.subclasses[1].push("wizard-war magic");

/*	A Trio of Subclasses Unearthed Arcana of 2017-02-27
	(http://media.wizards.com/2017/dnd/downloads/UAThreeSubclasses.pdf)
*/
//adds three subclass: a subclass for the Monk, called "Way of the Drunken Master"
ClassSubList["monk-way of the drunken master"] = {
	regExpSearch : /^((?=.*drunken)(?=.*master))|((?=.*drunk)((?=.*(monk|monastic))|((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
	subname : "Way of the Drunken Master",
	source : ["UA:AToS", 1],
	fullname : "Drunken Master",
	features : {
		"subclassfeature3" : {
			name : "Drunken Technique",
			source : ["UA:AToS", 1],
			minlevel : 3,
			description : desc([
				"When using Flurry of Blows, I gain benefits of a Disengage and +10 ft speed this turn"
			])
		},
		"subclassfeature6" : {
			name : "Tipsy Sway",
			source : ["UA:AToS", 1],
			minlevel : 6,
			description : desc([
				"As a reaction when missed in melee, attacker instead hits another I can see within 5 ft"
			]),
			usages : 1,
			recovery : "short rest",
			action : ["reaction", ""]
		},
		"subclassfeature11" : {
			name : "Drunkard's Luck",
			source : ["UA:AToS", 1],
			minlevel : 6,
			description : desc([
				"Before I roll for a save, I can spend 1 ki to give myself advantage on it"
			]),
			additional : "1 ki point"
		},
		"subclassfeature17" : {
			name : "Intoxicated Frenzy",
			source : ["UA:AToS", 1],
			minlevel : 17,
			description : desc([
				"I can make 3 extra attacks with Flurry of Blows if each is used on a different target"
			])
		}
	}
};
ClassList.monk.subclasses[1].push("monk-way of the drunken master");

//a subclass for the Paladin, called "Oath of Redemption"
ClassSubList["paladin-oath of redemption"] = {
	regExpSearch : /^((?=.*redeemer)|((?=.*redemption)(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper))))))).*$/i,
	subname : "Oath of Redemption",
	source : ["UA:AToS", 1],
	spellcastingExtra : ["shield", "sleep", "hold person", "ray of enfeeblement", "counterspell", "hypnotic pattern", "otiluke's resilient sphere", "stoneskin", "hold monster", "wall of force"],
	features : {
		"subclassfeature3" : {
			name : "Armor of Peace",
			source : ["UA:AToS", 2],
			minlevel : 3,
			description : desc([
				"When not wearing armor or wielding a shield, my AC is 16 + my Dexterity modifier"
			])
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Emissary of Peace",
			source : ["UA:AToS", 2],
			minlevel : 3,
			description : desc([
				"As a bonus action, I gain +5 to my next Charisma (Persuasion) check in the next min"
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature3.2" : {
			name : "Channel Divinity: Rebuke the Violent",
			source : ["UA:AToS", 2],
			minlevel : 3,
			description : desc([
				"As a reaction when a hostile within 10 ft damages another in melee, I can rebuke it",
				"It takes the same damage as it dealt but as radiant damage, with a Wis save to halve it"
			]),
			action : ["reaction", ""]
		},
		"subclassfeature3.3" : {
			name : "Warrior of Reconciliation",
			source : ["UA:AToS", 2],
			minlevel : 3,
			description : desc([
				"I can charm a creature when I reduce it to 0 HP with a simple, bludgeoning weapon",
				"It is peaceful, docile and only does what I command it to, but it can't cause harm",
				"For 1 min, until I'm incap., or I or allies attack it or have it save; after it is unconscious"
			])
		},
		"subclassfeature7" : {
			name : "Aura of the Guardian",
			source : ["UA:AToS", 2],
			minlevel : 7,
			description : desc([
				"As a reaction when an ally within 10 ft takes damage, I instead take the damage"
			]),
			action : ["reaction", ""]
		},
		"subclassfeature15" : {
			name : "Protective Spirit",
			source : ["UA:AToS", 2],
			minlevel : 15,
			description : desc([
				"At the end of my turn when I'm below half HP and not incapacitated, I regain HP"
			]),
			additional : levels.map(function (n) {
				if (n < 15) return "";
				return "1d6+" + Math.floor(n/2) + " HP";
			})
		},
		"subclassfeature20" : {
			name : "Emissary of Redemption",
			source : ["UA:AToS", 3],
			minlevel : 20,
			description : desc([
				"When taking damage from a creature, I take only half and it takes the other half",
				"If I attack or force a save on another, neither benefit work on it until I have a long rest"
			]),
			eval : "AddResistance('All from creatures', 'Paladin (Emissary of Redemption)');",
			remmoveeval : "RemoveResistance('All from creatures');"
		}
	}
};
ClassList.paladin.subclasses[1].push("paladin-oath of redemption");

//a subclass for the Ranger, called "Monster Slayer"
ClassSubList["ranger-monster slayer"] = {
	regExpSearch : /^(?=.*monster)(?=.*slayer).*$/i,
	subname : "Monster Slayer",
	source : ["UA:AToS", 3],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	fullname : "Monster Slayer",
	features : {
		"subclassfeature3" : {
			name : "Slayer's Mysticism",
			source : ["UA:AToS", 3],
			minlevel : 3,
			description : "\n   " + "I get bonus spells known, which do not count against the number of spells I can know",
			spellcastingExtra : ["protection from evil and good", "zone of truth", "magic circle", "banishment", "planar binding"]
		},
		"subclassfeature3.1" : {
			name : "Slayer's Eye",
			source : ["UA:AToS", 3],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can study a creature within 120 ft that I can see",
				"I learn its vulnerabilities, immunities, resistances, and the effects damaging it can have",
				"My first weapon hit on it each turn does +1d6 damage, until I study another or rest"
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature7" : {
			name : "Supernatural Defense",
			source : ["UA:AToS", 3],
			minlevel : 7,
			description : desc([
				"I add 1d6 to saves I make against abilities of the current target of my Slayer's Eye"
			])
		},
		"subclassfeature11" : {
			name : "Relentless Slayer",
			source : ["UA:AToS", 3],
			minlevel : 11,
			description : desc([
				"As a reaction, I can stop the target of my Slayer's Eye from escaping, if within 30 ft",
				"If I win a contested Wis check, it wastes it action to teleport/transform/plane shift"
			]),
			action : ["reaction", ""]
		},
		"subclassfeature15" : {
			name : "Slayer's Counter",
			source : ["UA:AToS", 3],
			minlevel : 15,
			description : desc([
				"As a reaction when the target of my Slayer's Eye has me make a save, I can attack it",
				"I can make one weapon attack; If this hits, I automatically succeed on the saving throw"
			]),
			action : ["reaction", ""]
		},
	}
};
ClassSubList["ranger-monster slayer"].features["subclassfeature3"].spellcastingExtra[100] = "AddToKnown";
ClassList.ranger.subclasses[1].push("ranger-monster slayer");
ClassSubList["rangerua-monster slayer"] = eval(ClassSubList["ranger-monster slayer"].toSource());
ClassList.rangerua.subclasses[1].push("rangerua-monster slayer");

/*	Revised Subclasses Unearthed Arcana of 2017-05-01
	(http://media.wizards.com/2017/dnd/downloads/UA-RevisedSubclasses.pdf)
*/
//add five subclasses from previous Unearthed Arcana articles: a subclass for the Barbarian, called "Path of the Ancestral Guardian"
ClassSubList["barbarian-ancestral guardian2"] = {
	regExpSearch : /^(?=.*ancestral)(?=.*guardian).*$/i,
	subname : "Path of the Ancestral Guardian",
	source : ["UA:RS", 1],
	fullname : "Ancestral Guardian",
	features : {
		"subclassfeature3" : {
			name : "Ancestral Protectors",
			source : ["UA:RS", 1],
			minlevel : 3,
			description : desc([
				"While raging, the first creature I hit with an attack on my turn becomes distracted",
				"While distracted, it has disadvantage on attack rolls that don't target me",
				"In addition, everybody but me counts as having resistance to all of the target's attacks",
				"This lasts until the start of my next turn, or until my rage ends"
			])
		},
		"subclassfeature6" : {
			name : "Spirit Shield",
			source : ["UA:RS", 1],
			minlevel : 6,
			description : desc([
				"As a reaction while raging when an ally I see within 30 ft is damaged, I can reduce it",
				"My guardian spirits reduce the damage by an amount equal to the roll of the dice"
			]),
			additional : levels.map(function (n) { return n < 6 ? "" : (n < 10 ? 2 : n < 14 ? 3 : 4) + "d8 damage reduced"; }),
			action : ["reaction", ""]
		},
		"subclassfeature10" : {
			name : "Consult the Spirits",
			source : ["UA:RS", 1],
			minlevel : 10,
			description : "\n   " + "Through consulting my ancestral spirits, I can cast Clairvoyance without a spell slot",
			spellcastingBonus : {
				name : "Consult the Spirits",
				spells : ["clairvoyance"],
				selection : ["clairvoyance"],
				oncesr : true
			},
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature14" : {
			name : "Vengeful Ancestors",
			source : ["UA:RS", 1],
			minlevel : 14,
			description : "\n   " + "Whenever I use Spirit Shield to reduce damage, the attacker takes the reduced damage"
		}
	}
};
ClassList.barbarian.subclasses[1].push("barbarian-ancestral guardian2");

//a subclass for the Bard, called "College of Swords"
ClassSubList["bard-college of swords2"] = {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*\bswords?\b).*$/i,
	subname : "College of Swords",
	source : ["UA:RS", 1],
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiencies",
			source : ["UA:RS", 2],
			minlevel : 3,
			description : desc([
				"I gain proficiency with medium armor and scimitars",
				"I can a simple or martial melee weapon that I'm proficient with as spellcasting focus"
			]),
			armor : [false, true, false, false],
			weapons : [false, false, ["scimitar"]]
		},
		"subclassfeature3.1" : {
			name : "Fighting Style",
			source : ["UA:RS", 2],
			minlevel : 3,
			description : "\n   " + "Select a Fighting Style for the college of swords using the \"Choose Feature\" button above",
			choices : ["Dueling", "Two-Weapon Fighting"],
			"dueling" : {
				name : "Dueling Fighting Style",
				description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons",
				calcChanges : {
					atkCalc : ["var areOffHands = function(n){for(var i=1;i<=n;i++){if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) {return true; }; }; }(FieldNumbers.actions); if (!areOffHands && isMeleeWeapon && !(/\\b(2|two).?hand(ed)?s?\\b/i).test(theWea.description)) {output.extraDmg += 2; }; ", "When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."]
				}
			},
			"two-weapon fighting" : {
				name : "Two-Weapon Fighting Style",
				description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks",
				calcChanges : {
					atkCalc : ["if (isOffHand) {output.modToDmg = true; }; ", "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks."]
				}
			}
		},
		"subclassfeature3.2" : {
			name : "Blade Flourish",
			source : ["UA:RS", 2],
			minlevel : 3,
			description : desc([
				"As an action, I can make one melee weapon attack and use one flourish option below",
				"In addition, I gain +10 ft to my walking speed until the end of the current turn",
				" - Defensive Flourish [one Bardic Inspiration die]",
				"    I add the result of the die to my AC until the start of my next turn",
				" - Slashing Flourish [one Bardic Inspiration die]",
				"    If the attack hits, I can use a die to deal damage to creatures next to the target",
				"    All creatures within 5 ft of the target take the result of the die in damage",
				" - Mobile Flourish [one Bardic Inspiration die]",
				"    If the attack this, I can use a die to push the target back 5 + the die result in feet",
				"    After this, I can use my reaction to move my speed to a space next to the target"
			]),
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Cunning Flourish",
			source : ["UA:RS", 2],
			minlevel : 6,
			description : "\n   " + "When I take the Blade Flourish action, I can attack twice, but still only use one flourish"
		},
		"subclassfeature14" : {
			name : "Master Flourish",
			source : ["UA:RS", 2],
			minlevel : 14,
			description : "\n   " + "When I do a Blade Flourish, I can use a d6 instead of expending a Bardic Inspiration die"
		}
	}
};
ClassList.bard.subclasses[1].push("bard-college of swords2");

//a subclass for the Fighter, called "Arcane Archer"
ClassSubList["fighter-arcane archer2"] = {
	regExpSearch : /^(?=.*arcane)(?=.*archer).*$/i,
	subname : "Arcane Archer",
	source : ["UA:RS", 2],
	fullname : "Arcane Archer",
	abilitySave : 4,
	features : {
		"subclassfeature3" : {
			name : "Magic Arrow",
			source : ["UA:RS", 3],
			minlevel : 3,
			description : desc([
				"Whenever I fire a nonmagical arrow from a short- or longbow I can make it magical",
				"This magical arrow gives a +1 bonus to the attack and damage rolls for the one attack"
			]),
			calcChanges : {
				atkCalc : ["if ((/longbow|shortbow/i).test(WeaponName) && !thisWeapon[1]) {output.magic += 1; }; ", "Any longbow or shortbow that doesn't include a magic bonus in its name gets a +1 magical bonus to damage and to hit as any arrows fired with it are automatically made magical."]
			}
		},
		"subclassfeature3.1" : {
			name : "Arcane Shot",
			source : ["UA:RS", 3],
			minlevel : 3,
			description : desc([
				"I can unleash magical effects when I fire a magic arrow from a short- or longbow",
				"I can use this once per turn as part of the Attack action, after an attack hits",
				"I know a number of Arcane Shot Options and learn additional at certain levels",
				"Use the \"Choose Features\" button above to add Arcane Shots Options to the third page"
			]),
			usages : 2,
			recovery : "short rest",
			additional : levels.map( function(n) { return n < 3 ? "" : (n < 7 ? 2 : n < 10 ? 3 : n < 15 ? 4 : n < 18 ? 5 : 6) + " options known"; }),
			extraname : "Arcane Shot Option",
			extrachoices : ["Banishing Arrow [Abjuration]", "Brute Bane Arrow [Necromancy]", "Bursting Arrow [Evocation]", "Grasping Arrow [Conjuration]", "Mind-Scrambling Arrow [Enchantment]", "Piercing Arrow [Transmutation]", "Seeking Arrow [Divination]", "Shadow Arrow [Illusion]"],
			"banishing arrow [abjuration]" : {
				name : "Banishing Arrow [Abjuration]",
				source : ["UA:RS", 3],
				description : desc([
					"The target makes a Cha save or is banished to the Feywild until the end of its next turn",
					"While banished, its speed is 0 and is incapacitated; It re-appearing in the same spot",
					"When I reach 18th level, this Arcane Shot Option also does an extra 2d6 force damage"
				]),
				additional : levels.map( function(n) { return n < 18 ? "" : "+2d6 force damage"; })
			},
			"brute bane arrow [necromancy]" : {
				name : "Brute Bane Arrow [Necromancy]",
				source : ["UA:RS", 3],
				description : desc([
					"The target takes extra necrotic damage and must make a Constitution save",
					"If failed, the damage of the target's attacks is halved until the start of my next turn"
				]),
				additional : levels.map( function(n) { return n < 3 ? "" : "+" + (n < 18 ? 2 : 4) + "d6 necrotic damage"; })
			},
			"bursting arrow [evocation]" : {
				name : "Bursting Arrow [Evocation]",
				source : ["UA:RS", 3],
				description : "" + "\n   " + "The target, in addition to the shot, and all creatures within 10 ft of it take damage",
				additional : levels.map( function(n) { return n < 3 ? "" : "+" + (n < 18 ? 2 : 4) + "d6 force damage"; })
			},
			"grasping arrow [conjuration]" : {
				name : "Grasping Arrow [Conjuration]",
				source : ["UA:RS", 3],
				description : desc([
					"The target takes extra poison damage as brambles wrap around it for 1 minute",
					"The brambles give it -10 ft speed and do it slashing damage every round it moves",
					"These can be removed by it or another as an action with Strength (Athletics) vs. my DC"
				]),
				additional : levels.map( function(n) { return n < 3 ? "" : (n < 18 ? 2 : 4) + "d6 poison/slash. damage"; })
			},
			"mind-scrambling arrow [enchantment]" : {
				name : "Mind-Scrambling Arrow [Enchantment]",
				source : ["UA:RS", 4],
				description : desc([
					"The target takes extra psychic damage and must succeed on a Wisdom save",
					"If failed, it can't attack or harm one of my allies within 30 ft of it that I choose",
					"This lasts until the start of my next turn or until the chosen ally harms the target"
				]),
				additional : levels.map( function(n) { return n < 3 ? "" : "+" + (n < 18 ? 2 : 4) + "d6 damage"; })
			},
			"piercing arrow [transmutation]" : {
				name : "Piercing Arrow [Transmutation]",
				source : ["UA:RS", 4],
				description : desc([
					"With this I don't roll for the attack, but shoot the arrow in a 30-ft long, 1-ft wide line",
					"It passes through objects, ignoring cover, but all creatures in the area take damage",
					"The damage is the same as a normal hit from my attack, plus extra piercing damage",
					"A creature can make a Dexterity save to reduce the damage by half"
				]),
				additional : levels.map( function(n) { return n < 3 ? "" : "+" + (n < 18 ? 1 : 2) + "d6 piercing damage"; })
			},
			"seeking arrow [divination]" : {
				name : "Seeking Arrow [Divination]",
				source : ["UA:RS", 4],
				description : desc([
					"With this I don't roll for the attack, but I choose a target I have seen in the last minute",
					"The seeking arrow moves around corners, obstacles, and ignores cover to hit the target",
					"It is hit if it is within the weapon's range and there is a path for the arrow to get to it",
					"The target takes the full damage of the attack plus extra force damage",
					"It can make a Dexterity save to reduce the damage by half; If failed, I know its location"
				]),
				additional : levels.map( function(n) { return n < 3 ? "" : "+" + (n < 18 ? 1 : 2) + "d6 force damage"; })
			},
			"shadow arrow [illusion]" : {
				name : "Shadow Arrow [Illusion]",
				source : ["UA:RS", 4],
				description : desc([
					"The target takes extra psychic damage and must succeed on a Wisdom save",
					"If failed, the target can't see anything beyond 5 ft until the end of my next turn"
				]),
				additional : levels.map( function(n) { return n < 3 ? "" : "+" + (n < 18 ? 2 : 4) + "d6 psyhic damage"; })
			}
		},
		"subclassfeature3.2" : {
			name : "Arcane Archer's Lore",
			source : ["UA:RS", 3],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with either the Arcana or Nature skill",
			skillstxt : "\n\n" + toUni("Arcane Archer") + ": Choose Arcana or Nature."
		},
		"subclassfeature7" : {
			name : "Curving Shot",
			source : ["UA:RS", 3],
			minlevel : 7,
			description : desc([
				"When I miss with a magic arrow, I can use a bonus action to redirect the attack",
				"I reroll the attack against a different target within 60 ft of the original target"
			]),
			action : ["bonus action", ""]
		},
		"subclassfeature15" : {
			name : "Ever-Ready Shot",
			source : ["UA:RS", 3],
			minlevel : 15,
			description : "\n   " + "I regain one use of Arcane Shot if I have no more remaining when I roll initiative"
		}
	}
};
ClassList.fighter.subclasses[1].push("fighter-arcane archer2");

//a subclass for the Monk, called "Way of the Kensei"
ClassSubList["monk-way of the kensei2"] = {
	regExpSearch : /^(?=.*kensei)((?=.*(monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
	subname : "Way of the Kensei",
	source : ["UA:RS", 4],
	features : {
		"subclassfeature3" : {
			name : "Path of the Kensei",
			source : ["UA:RS", 4],
			minlevel : 3,
			description : desc([
				"Some weapons, that don't have heavy or special property, are kensei weapons for me",
				"At least one ranged and one melee weapon, more at higher levels (longbow does qualify)",
				"With these: proficient, count as a monk weapons, special bonuses while holding them:",
				" - If I do an unarmed strike during an Attack action, +2 AC until my next turn starts",
				" - As a bonus action, ranged kensei weapon attacks deal +1d4 damage in current turn"
			]),
			action: ["bonus action", " (with ranged)"],
			additional : levels.map( function(n) { return n < 3 ? "" : (n < 6 ? 2 : n < 11 ? 3 : n < 17 ? 4 : 5) + " kensei weapons"; }),
			calcChanges : {
				atkAdd : [
					"var monkDie = function(n) {return n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10;}; if (classes.known.monk && classes.known.monk.level > 2 && theWea && !isSpell && !theWea.monkweapon && (!(/heavy|special/i).test(fields.Description) || WeaponName === 'longbow') && inputText.toLowerCase().indexOf('kensei') !== -1) {var aMonkDie = aMonkDie ? aMonkDie : monkDie(classes.known.monk.level); try {var curDie = eval(fields.Damage_Die.replace('d', '*'));} catch (e) {var curDie = 'x';}; if (isNaN(curDie) || curDie < aMonkDie) {fields.Damage_Die = '1d' + aMonkDie; }; if (theWea.ability === 1) {fields.Mod = StrDex; }; if (isRangedWeapon) {fields.Description += (fields.Description ? '; ' : '') + 'As bonus action with Attack action, +1d4 damage'; }; fields.Proficiency = true; }; ",
					"If I inlcude the word 'Kensei' in the name of a weapon that doesn't have the Heavy or Special attribute, or that is a longbow, that weapon gains the same benefits as any other 'Monk Weapon'.\nIn addition, with ranged 'Kensei Weapons', I can take a bonus action to have that hit, and any other hit after that as part of the same action, do +1d4 damage."
				]
			}
		},
		"ki-empowered strikes" : {
			name : "One with the Blade",
			source : ["UA:RS", 5],
			minlevel : 6,
			description : "\n   " + "My unarmed strikes and kensei weapon attacks count as magical",
			calcChanges : {
				atkAdd : ["if (((/unarmed strike/i).test(WeaponName) || (inputText.toLowerCase().indexOf('kensei') !== -1  && theWea && !isSpell && !theWea.monkweapon && (!(/heavy|special/i).test(fields.Description) || WeaponName === 'longbow'))) && fields.Description.indexOf('Counts as magical') === -1 && !thisWeapon[1]) {fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical';}; ", "My unarmed strikes and any Kensei Weapons count as magical for overcoming resistances and immunities."]
			},
			extraname : "Way of the Kensei 6",
			"precise strike" : {
				name : "Precise Strike",
				source : ["UA:RS", 5],
				description : " [1 ki point]" + "\n   " + "Once per turn when I hit with a kensei weapon, I can do a martial arts die extra damage",
				action : ["bonus action", ""]
			},
			eval : "ClassFeatureOptions(['monk', 'ki-empowered strikes', 'precise strike', 'extra']);",
			removeeval : "ClassFeatureOptions(['monk', 'ki-empowered strikes', 'precise strike', 'extra'], 'remove');",
		},
		"subclassfeature17" : {
			name : "Unerring Accuracy",
			source : ["UA:RS", 5],
			minlevel : 17,
			description : "\n   " + "On each of my turns, I can reroll one weapon attack roll I make that misses",
			extraname : "Way of the Kensei 11",
			"sharpen the blade" : {
				name : "Sharpen the Blade",
				source : ["UA:RS", 5],
				description : " [1 to 3 ki points]" + "\n   " + "As a bonus action, I can grant my weapon a bonus to attack and damage rolls" + "\n   " + "This bonus is equal to the number of ki points I spend; It lasts for 1 minute",
				action : ["bonus action", ""]
			},
			changeeval : "if (newClassLvl.monk >= 11 && (What('Extra.Notes') + What('Class Features')).toLowerCase().indexOf('sharpen the blade') === -1) {ClassFeatureOptions(['monk', 'subclassfeature17', 'sharpen the blade', 'extra'])} else if (newClassLvl.monk <= 11 && oldClassLvl.monk >= 11) {ClassFeatureOptions(['monk', 'subclassfeature17', 'sharpen the blade', 'extra'], 'remove')}"
		}
	}
};
ClassList.monk.subclasses[1].push("monk-way of the kensei2");

//a subclass for the Sorcerer, called "Favored Soul"
ClassSubList["sorcerer-favoured soul2"] = {
	regExpSearch : /^(?=.*favou?red)(?=.*soul).*$/i,
	subname : "Favored Soul",
	source : ["UA:RS", 5],
	fullname : "Favored Soul",
	spellcastingList : {
		class : ["cleric", "sorcerer"]
	},
	features : {
		"subclassfeature1" : {
			name : "Divine Magic",
			source : ["UA:RS", 5],
			minlevel : 1,
			description : desc([
				"When I select my 1st level or higher spells, I can also pick spells from the cleric spell list",
				"These cleric spells count as sorcerer spells for me",
				"I also learn Cure Wounds, which doesn't count against my number of spells known"
			]),
			spellcastingBonus : {
				name : "Divine Magic",
				spells : ["cure wounds"],
				selection : ["cure wounds"]
			}
		},
		"subclassfeature1.2" : {
			name : "Favored by the Gods",
			source : ["UA:RS", 5],
			minlevel : 1,
			description : "\n   " + "If I fail a saving throw or miss with an attack roll, I can add 2d4 to the total",
			recovery : "short rest",
			usages : 1
		},
		"subclassfeature6" : {
			name : "Empowered Healing",
			source : ["UA:RS", 5],
			minlevel : 6,
			description : " [1 sorcery point]" + desc([
				"When I roll dice for healing with one of my sorcerer spells, I can reroll them once",
				"By spending 1 sorcery point, I can reroll any number of those dice for that spell"
			])
		},
		"subclassfeature14" : {
			name : "Angelic Form",
			source : ["UA:RS", 5],
			minlevel : 14,
			description : desc([
				"Choose an otherworldly quality using the \"Choose Feature\" button above",
				"As a bonus action, I can manifest a pair of spectral wings that give me 30 ft fly speed",
				"These wings last until I become incapacitated or I dismiss them as a bonus action"
			]),
			choices : ["Beautiful", "Youthful", "Kind", "Imposing"],
			"beautiful" : {
				name : "Angelic Form: Beautiful",
				description : desc([
					"My appearance takes on an otherworldly quality of beauty",
					"As a bonus action, I can manifest a pair of spectral wings that give me 30 ft fly speed",
					"These wings last until I become incapacitated or I dismiss them as a bonus action"
				])
			},
			"youthful" : {
				name : "Angelic Form: Youthful",
				description : desc([
					"My appearance takes on an otherworldly quality of youthfulness",
					"As a bonus action, I can manifest a pair of spectral wings that give me 30 ft fly speed",
					"These wings last until I become incapacitated or I dismiss them as a bonus action"
				])
			},
			"kind" : {
				name : "Angelic Form: Kind",
				description : desc([
					"My appearance takes on an otherworldly quality of kindness",
					"As a bonus action, I can manifest a pair of spectral wings that give me 30 ft fly speed",
					"These wings last until I become incapacitated or I dismiss them as a bonus action"
				])
			},
			"imposing" : {
				name : "Angelic Form: Imposing",
				description : desc([
					"My appearance takes on an otherworldly quality of imposingness",
					"As a bonus action, I can manifest a pair of spectral wings that give me 30 ft fly speed",
					"These wings last until I become incapacitated or I dismiss them as a bonus action"
				])
			},
			action : ["bonus action", " Wings"]
		},
		"subclassfeature18" : {
			name : "Unearthly Recovery",
			source : ["UA:RS", 6],
			minlevel : 18,
			description : "\n   " + "As a bonus action when I have less than half of my max HP, I can heal myself" + "\n   " + "I regain a number of HP equal to half my maximum Hit Points",
			action : ["bonus action", ""],
			recovery : "long rest",
			usages : 1
		}
	}
};
ClassList.sorcerer.subclasses[1].push("sorcerer-favoured soul2");

//a function to run at startup of the sheet to ensure that all of the UA additions work as they should
function UAstartupCode() {
	//Sorcerer (Favored Soul): add all cleric domain spells to the options of the first level ability "Chosen of the Gods"
	var FSfeat = ClassSubList["favored soul"].features["subclassfeature1.1"];
	for (var i = 0; i < ClassList.cleric.subclasses[1].length; i++) {
		var aDomain = ClassList.cleric.subclasses[1][i];
		if (ClassSubList[aDomain] && ClassSubList[aDomain].spellcastingExtra) {
			var cDomain = ClassSubList[aDomain];
			var eSpells = eval(cDomain.spellcastingExtra.toSource());
			eSpells[100] = "AddToKnown";
			FSfeat.choices.push(cDomain.subname);
			FSfeat[cDomain.subname.toLowerCase()] = {
				name : "Chosen of the Gods: " + cDomain.subname,
				source : cDomain.source ? cDomain.source : cDomain.features["subclassfeature1"].source,
				spellcastingExtra : eSpells,
				description : "\n   " + "I add the " + cDomain.subname.toLowerCase() + " spells to my known spells, if they are of a level I can cast" + "\n   " + "These count as sorcerer spells, but do not count against the number of spells I can know",
			};
		};
	};
	
	//Warlock (the Seeker): add the "Pact Boon" feature from the Warlock class, with one addition, to the subclass
	var PBfeat = ClassList.warlock.features["pact boon"].toSource();
	ClassSubList["the seeker"].features["pact boon"] = eval(PBfeat);
	ClassSubList["the seeker"].features["pact boon"].choices.push("Pact of the Star Chain");
	ClassSubList["the seeker"].features["pact boon"].choices.sort();
	ClassSubList["the seeker"].features["pact boon"]["pact of the star chain"] = {
		name : "Pact of the Star Chain",
		source : ["UA:TF", 1],
		description : "\n   " + "My patron grants me an item of power which disappears when I die" + "\n   " + "While it is on my person, I can cast Augury as a ritual (PHB 215)" + "\n   " + "Additionally, once per short rest, I can get advantage on an Intelligence check" + "\n   " + "If I lose this item I can perform a 1-hour ceremony to get a replacement",
		usages : 1,
		recovery : "short rest",
		spellcastingBonus : {
			name : "Pact of the Star Chain",
			spells : ["augury"],
			selection : ["augury"],
			firstCol : "(R)"
		}
	};
	
	//Add fighting styles to the options of fighter, paladin, and ranger
	var FSclasses = ["fighter", "ranger", "paladin", "rangerua", "spell-less ranger", "champion"];
	[{
		choice : "Mariner",
		feature : {
			name : "Mariner Fighting Style",
			source : ["UA:WA", 3],
			description : "\n   " + "While not wearing heavy armor or using a shield, I gain +1 AC and swim/climb speed" + "\n   " + "The swimming and climbing speeds equal my current walking speed",
			eval : "AddACMisc(1, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\", \"ACshield || tDoc.getField('Heavy Armor').isBoxChecked(0)\")",
			removeeval : "AddACMisc(0, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\")"
		}
	}, {
		choice : "Close Quarters Shooter",
		feature : {
			name : "Close Quarters Shooting Fighting Style",
			source : ["UA:LDU", 1],
			description : "\n   " + "+1 bonus to attack rolls I make with ranged attacks" + "\n   " + "I don't have disadvantage when making a ranged attack while within 5 ft of a hostile" + "\n   " + "My ranged attacks ignore half and three-quarters cover against targets within 30 ft",
			calcChanges : {
				atkCalc : ["if (isRangedWeapon) {output.extraHit += 1; }; ", "My ranged weapons get a +1 bonus on the To Hit."]
			}
		}
	}, {
		choice : "Tunnel Fighter",
		feature : {
			name : "Tunnel Fighting Style",
			source : ["UA:LDU", 1],
			description : "\n   " + "As a bonus action, I enter a defensive stance that lasts until the start of my next turn" + "\n   " + "While I'm in this defensive stance I gain the following two benefits:" + "\n    - " + "I can make opportunity attacks without using my reaction" + "\n    - " + "I can make a melee attack as a reaction if a hostile moves >5 ft while in my reach",
			action : ["bonus action", ""]
		}
	}].forEach(function (FStyle, indx, arr) {
		for (var cla = 0; cla < FSclasses.length; cla++) {
			var FSclass = FSclasses[cla];
			var FSfeat = ClassList[FSclass] ? ClassList[FSclass].features["fighting style"] : ClassSubList[FSclass].features.subclassfeature10;
			FSfeat.choices.push(FStyle.choice);
			FSfeat[FStyle.choice.toLowerCase()] = FStyle.feature;
			if (indx === arr.length - 1) FSfeat.choices.sort();
		};		
	});
	
	//Wizard (Theurgy) add all cleric domain options to the various class features
	var MTfeat = ClassSubList["theurgy"].features;
	for (var i = 0; i < ClassList.cleric.subclasses[1].length; i++) {
		var aDomain = ClassSubList[ClassList.cleric.subclasses[1][i]];
		if (!aDomain) continue;
		MTfeat["subclassfeature2"].choices.push(aDomain.subname);
		MTfeat["subclassfeature2"][aDomain.subname.toLowerCase()] = {
			name : "Arcane Initiate: " + aDomain.subname,
			source : aDomain.source ? aDomain.source : aDomain.features["subclassfeature1"].source,
			spellcastingExtra : aDomain.spellcastingExtra,
			description : "\n   " + "When I gain a wizard level I can replace one of the spells I would add to my spellbook" + "\n   " + "I can replace it with one of the " + aDomain.subname.toLowerCase() + " spells, if it is of a level I can cast" + "\n   " + "If my spellbook has all the domain spells, I can select any cleric spell of a level I can cast" + "\n   " + "Other wizards cannot copy cleric spells from my spellbook into their own spellbooks",
			eval : ""
		};
		var AIdomain = MTfeat["subclassfeature2"][aDomain.subname.toLowerCase()];
		for (var aFea in aDomain.features) {
			var dFea = aDomain.features[aFea];
			if (dFea.minlevel === 2 && (/channel divinity/i).test(dFea.name)) {
				MTfeat["subclassfeature2.3"].choices.push(aDomain.subname);
				MTfeat["subclassfeature2.3"][aDomain.subname.toLowerCase()] = eval(dFea.toSource());
				MTfeat["subclassfeature2.3"][aDomain.subname.toLowerCase()].name = MTfeat["subclassfeature2.3"][aDomain.subname.toLowerCase()].name.replace(/channel divinity/i, "Channel Arcana");
				AIdomain.eval += "var ToAdd = [\"wizard\", \"subclassfeature2.3\", \"" + aDomain.subname.toLowerCase() + "\"]; if (classes.known.wizard.level >= 2 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ";
			};
			if (dFea.minlevel === 1 && !dFea.armor && !dFea.weapons) {
				if (MTfeat["subclassfeature6"].choices.indexOf(aDomain.subname) === -1) { //if the entry does not exist yet
					MTfeat["subclassfeature6"].choices.push(aDomain.subname);
					MTfeat["subclassfeature6"][aDomain.subname.toLowerCase()] = eval(dFea.toSource());
					AIdomain.eval += "var ToAdd = [\"wizard\", \"subclassfeature6\", \"" + aDomain.subname.toLowerCase() + "\"]; if (classes.known.wizard.level >= 6 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ";
				} else { //add to the existing entry
					var theFea = MTfeat["subclassfeature6"][aDomain.subname.toLowerCase()];
					theFea.name += " \u0026 " + dFea.name;
					theFea.description += dFea.description;
					for (var subFea in dFea) {
						if (theFea[subFea] === undefined) theFea[subFea] = dFea[subFea];
					};
				};
			};
			if (dFea.minlevel === 6 && !dFea.armor && !dFea.weapons) {
				if (MTfeat["subclassfeature10"].choices.indexOf(aDomain.subname) === -1) { //if the entry does not exist yet
					MTfeat["subclassfeature10"].choices.push(aDomain.subname);
					MTfeat["subclassfeature10"][aDomain.subname.toLowerCase()] = eval(dFea.toSource());
					AIdomain.eval += "var ToAdd = [\"wizard\", \"subclassfeature10\", \"" + aDomain.subname.toLowerCase() + "\"]; if (classes.known.wizard.level >= 10 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ";
				} else { //add to the existing entry
					var theFea = MTfeat["subclassfeature10"][aDomain.subname.toLowerCase()];
					theFea.name += " \u0026 " + dFea.name;
					theFea.description += dFea.description;
					for (var subFea in dFea) {
						if (theFea[subFea] === undefined) theFea[subFea] = dFea[subFea];
					};
				};
			};
			if (dFea.minlevel === 17 && !dFea.armor && !dFea.weapons) {
				if (MTfeat["subclassfeature14"].choices.indexOf(aDomain.subname) === -1) { //if the entry does not exist yet
					MTfeat["subclassfeature14"].choices.push(aDomain.subname);
					MTfeat["subclassfeature14"][aDomain.subname.toLowerCase()] = eval(dFea.toSource());
					AIdomain.eval += "var ToAdd = [\"wizard\", \"subclassfeature14\", \"" + aDomain.subname.toLowerCase() + "\"]; if (classes.known.wizard.level >= 14 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ";
				} else { //add to the existing entry
					var theFea = MTfeat["subclassfeature14"][aDomain.subname.toLowerCase()];
					theFea.name += " \u0026 " + dFea.name;
					theFea.description += dFea.description;
					for (var subFea in dFea) {
						if (theFea[subFea] === undefined) theFea[subFea] = dFea[subFea];
					};
				};
			};
		};
	};
	
	//create the magic items for the wondrous items class feature of the artificer
	ClassList.artificer.features["wondrous invention"].extrachoices.forEach(function (theI) {
		var theItem = theI.replace(/ *\(.*\)/, "");
		if (MagicItemsList[theItem.toLowerCase()]) {
			ClassList.artificer.features["wondrous invention"][theI.toLowerCase()] = {
				name : theItem,
				description : "",
				source : ["UA:A", 3],
				eval : "var maI = MagicItemsList[\"" + theItem.toLowerCase() + "\"]; AddMagicItem(maI.name, maI.attunement, maI.description, maI.weight, maI.descriptionLong);",
				removeeval : "RemoveMagicItem(\"" + theItem.toLowerCase() + "\");"
			};
		};
	});
	
	//add the invocations from the Warlock & Wizard Unearthed Arcana
	[{
		objname : "Aspect of the Moon (prereq: the Archfey patron)",
		name : "Aspect of the Moon",
		description : "\n   " + "I don't need to sleep nor can be magically forced to; I can rest while doing light activity",
		source : ["UA:WnW", 3],
		prereqeval : "classes.known.warlock.subclass === 'the archfey'",
		eval : "AddString('Saving Throw advantages \/ disadvantages', \"Magic can't put me to sleep\", '; ');",
		removeeval : "RemoveString('Saving Throw advantages \/ disadvantages', \"Magic can't put me to sleep\");"
	}, {
		objname : "Burning Hex (prereq: the Hexblade patron)",
		name : "Burning Hex",
		description : desc([
			"As a bonus action, I can cause a target affected by my hexblade's curse to take damage",
			"It immediately takes fire damage equal to my Charisma modifier (min 1)"
		]),
		source : ["UA:WnW", 3],
		prereqeval : "classes.known.warlock.subclass === 'warlock-the hexblade'",
		action : ["bonus action", ""]
	}, {
		objname : "Caiphon's Beacon (prereq: the Great Old One patron)",
		name : "Caiphon's Beacon",
		description : desc([
			"I gain proficiencies with the Deception and Stealth skills",
			"I have advantage on attack rolls against charmed creatures"
		]),
		source : ["UA:WnW", 3],
		prereqeval : "classes.known.warlock.subclass === 'the great old one'",
		skills : ["Deception", "Stealth"],
		skillstxt : "\n\n" + toUni("Warlock (Caiphon's Beacon)") + ": Deception and Stealth."
	}, {
		objname : "Chilling Hex (prereq: the Hexblade patron)",
		name : "Chilling Hex",
		description : desc([
			"As a bonus action, I can swirl frost around a target affected by my hexblade's curse",
			"All creatures within 5 ft of the target take cold damage equal to my Cha modifier (min 1)"
		]),
		source : ["UA:WnW", 3],
		prereqeval : "classes.known.warlock.subclass === 'warlock-the hexblade'",
		action : ["bonus action", ""]
	}, {
		objname : "Chronicle of the Raven Queen (prereq: the Raven Queen patron, Pact of the Tome)",
		name : "Chronicle of the Raven Queen",
		description : desc([
			"Within 1 minute of a creature's death, I can use my book of shadows to ask it 1 question",
			"To do this, I need to put the corpse's hand on the book and speak the question aloud",
			"Its spirit writes the answer, to the best of its knowledge, in blood in a language I choose"
		]),
		source : ["UA:WnW", 3],
		prereqeval : "classes.known.warlock.subclass === 'warlock-the raven queen' && classes.known.warlock.level >= 3 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the tome') !== -1",
		action : ["bonus action", ""]
	}, {
		objname : "Claw of Acamar (prereq: the Great Old One patron, Pact of the Blade)",
		name : "Claw of Acamar",
		description : desc([
			"As a pact weapon, I can create a black, lead flail with grasping tentacles for a head",
			"It has reach and can reduce a creature's speed to 0 on a hit until the end of my next turn",
			"On a hit, I can expand a spell slot to have it do +2d8 necrotic damage per spell slot level"
		]),
		source : ["UA:WnW", 3],
		prereqeval : "classes.known.warlock.subclass === 'the great old one' && classes.known.warlock.level >= 3 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the blade') !== -1",
		eval : "AddWeapon('Claw of Acamar');",
		removeeval : "RemoveWeapon('Claw of Acamar');"
	}, {
		objname : "Cloak of Baalzebul (prereq: the Fiend patron)",
		name : "Cloak of Baalzebul",
		description : desc([
			"As a bonus action, I can conjure or dismiss a swarm of buzzing flies around me",
			"This gives me adv. on Cha (Intimidation) checks, but disadv. on all other Charisma checks",
			"Creatures starting their turn within 5 ft of me take poison damage equal to my Cha mod"
		]),
		source : ["UA:WnW", 3],
		prereqeval : "classes.known.warlock.subclass === 'the fiend'",
		action : ["bonus action", " (start/end)"]
	}, {
		objname : "Curse Bringer (prereq: the Hexblade patron, Pact of the Blade)",
		name : "Curse Bringer",
		description : desc([
			"As a pact weapon, I can create a silver greatsword with black runes etched in the blade",
			"If I bring a target of my hexblade's curse to 0 HP with it, I can move the curse to another",
			"It can reduce a creature's speed to 0 on a hit until the end of my next turn",
			"On a hit, I can expand a spell slot to have it do +2d8 slashing damage per spell slot level"
		]),
		source : ["UA:WnW", 4],
		prereqeval : "classes.known.warlock.subclass === 'warlock-the hexblade' && classes.known.warlock.level >= 3 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the blade') !== -1",
		eval : "AddWeapon('Curse Bringer');",
		removeeval : "RemoveWeapon('Curse Bringer');"
	}, {
		objname : "Kiss of Mephistopheles (prereq: level 5 warlock, the Fiend patron, Eldritch Blast cantrip)",
		name : "Kiss of Mephistopheles",
		description : desc([
			"As a bonus action when my Eldritch Blast hits, I can cast Fireball using a warlock spell slot",
			"The origin of the Fireball is the creature that was hit with my Eldritch Blast attack"
		]),
		source : ["UA:WnW", 4],
		prereqeval : "hasEldritchBlast && classes.known.warlock.level >= 5 && classes.known.warlock.subclass === 'the fiend'",
		action : ["bonus action", ""]
	}, {
		objname : "Frost Lance (prereq: the Archfey patron, Eldritch Blast cantrip)",
		name : "Frost Lance",
		description : desc([
			"When my Eldritch Blast hits a creature once or more, I can reduce its speed by 10 ft",
			"This speed reduction lasts until the end of my next turn"
		]),
		source : ["UA:WnW", 4],
		prereqeval : "hasEldritchBlast && classes.known.warlock.subclass === 'the archfey'",
		calcChanges : {
			atkAdd : ["if (theWea && (/eldritch blast/i).test(theWea.name)) {fields.Description += '; Target -10 ft speed'; }; ", "When I hit a creature with my Eldritch Blast cantrip once or more times in a turn, I can reduce its speed by 10 ft until the end of my next turn."]
		}
	}, {
		objname : "Gaze of Khirad (prereq: level 7 warlock, the Great Old One patron)",
		name : "Gaze of Khirad",
		description : desc([
			"As an action, I can see through solid object out to 30 ft until the end of my current turn"
		]),
		source : ["UA:WnW", 4],
		prereqeval : "classes.known.warlock.subclass === 'the great old one' && classes.known.warlock.level >= 7",
		action : ["action", ""]
	}, {
		objname : "Grasp of Hadar (prereq: the Great Old One patron, Eldritch Blast cantrip)",
		name : "Grasp of Hadar",
		description : desc([
			"When my Eldritch Blast hits a creature once or more, I can move it 10 ft closer to me"
		]),
		source : ["UA:WnW", 4],
		prereqeval : "hasEldritchBlast && classes.known.warlock.subclass === 'the great old one'",
		calcChanges : {
			atkAdd : ["if (theWea && (/eldritch blast/i).test(theWea.name)) {fields.Description += '; Target moved 10 ft to me'; }; ", "When I hit a creature with my Eldritch Blast cantrip once or more times in a turn, I can move it in a straight line 10 ft closer to me."]
		}
	}, {
		objname : "Green Lord's Gift (prereq: the Archfey patron)",
		name : "Green Lord's Gift",
		description : desc([
			"When I regain HP, all dice for determining the HP I heal are treated as rolling maximum"
		]),
		source : ["UA:WnW", 4],
		prereqeval : "classes.known.warlock.subclass === 'the archfey'"
	}, {
		objname : "Improved Pact Weapon (prereq: level 5 warlock, Pact of the Blade)",
		name : "Improved Pact Weapon",
		description : desc([
			"Any pact weapon I create is a +1 magic weapon, if it isn't already a magic weapon"
		]),
		source : ["UA:WnW", 4],
		prereqeval : "classes.known.warlock.level >= 5 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the blade') !== -1",
		calcChanges : {
			atkCalc : ["if (!thisWeapon[1] && (/\\bpact\\b/i).test(WeaponText)) { var pactMag = pactMag !== undefined ? 1 - pactMag : 1; output.magic += pactMag; }; ", "If I include the word 'Pact' in a weapon's name or description, it will be treated as a Pact Weapon. If it doesn't already include a magical bonus in its name, the calculation will add +1 to its To Hit and Damage."]
		}
	}, {
		objname : "Mace of Dispater (prereq: the Fiend patron, Pact of the Blade)",
		name : "Mace of Dispater",
		description : desc([
			"As a pact weapon, I can create an iron mace forged in Dis, the 2nd layer of the Nine Hells",
			"I can knock a target prone with it on a hit, if the target's size is Huge or smaller",
			"On a hit, I can expand a spell slot to have it do +2d8 force damage per spell slot level"
		]),
		source : ["UA:WnW", 4],
		prereqeval : "classes.known.warlock.subclass === 'the fiend' && classes.known.warlock.level >= 3 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the blade') !== -1",
		eval : "AddWeapon('Mace of Dispater');",
		removeeval : "RemoveWeapon('Mace of Dispater');"
	}, {
		objname : "Moon Bow (prereq: the Archfey patron, Pact of the Blade)",
		name : "Moon Bow",
		description : desc([
			"As a pact weapon, I can create a longbow that creates arrows of white wood when drawn",
			"Its arrows last for 1 minute; I have advantage on attack rolls against lycanthropes with it",
			"On a hit, I can expand a spell slot to have it do +2d8 radiant damage per spell slot level"
		]),
		source : ["UA:WnW", 4],
		prereqeval : "classes.known.warlock.subclass === 'the archfey' && classes.known.warlock.level >= 3 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the blade') !== -1",
		eval : "AddWeapon('Moon Bow');",
		removeeval : "RemoveWeapon('Moon Bow');"
	}, {
		objname : "Path of the Seeker (prereq: the Seeker patron)",
		name : "Path of the Seeker",
		description : desc([
			"I ignore difficult terrain; I have advantage on saving throws against being paralyzed",
			"I also have advantage on checks to escape a grapple, manacles, or rope bindings"
		]),
		source : ["UA:WnW", 4],
		prereqeval : "classes.known.warlock.subclass === 'the seeker'",
		eval : "AddString('Saving Throw advantages \/ disadvantages', 'Adv. vs. being paralyzed', '; ');",
		removeeval : "RemoveString('Saving Throw advantages \/ disadvantages', 'Adv. vs. being paralyzed');"
	}, {
		objname : "Raven Queen's Blessing (prereq: the Raven Queen patron, Eldritch Blast cantrip)",
		name : "Raven Queen's Blessing",
		description : desc([
			"When I score a critical hit with Eldritch Blast, I can choose an ally I can see within 30 ft",
			"That ally can immediately expend one HD to regain HP, just like after a short rest"
		]),
		source : ["UA:WnW", 5],
		prereqeval : "classes.known.warlock.subclass === 'warlock-the raven queen' && hasEldritchBlast"
	}, {
		objname : "Relentless Hex (prereq: level 5 warlock, the Hexblade patron)",
		name : "Relentless Hex",
		description : desc([
			"As a bonus action, I can teleport next to a target affected by my hexblade's curse",
			"To do so, I must see the target and the space I'm teleporting to, and be within 30 ft of it"
		]),
		source : ["UA:WnW", 5],
		prereqeval : "classes.known.warlock.subclass === 'warlock-the hexblade' && classes.known.warlock.level >= 5",
		action : ["bonus action", ""]
	}, {
		objname : "Sea Twins' Gift (prereq: the Archfey patron)",
		name : "Sea Twins' Gift",
		description : desc([
			"I can breathe underwater and I have a swim speed equal to my walking speed",
			"Once per long rest, I can cast Water Breathing using a warlock spell slot (PHB 287)"
		]),
		spellcastingBonus : {
			name : "Sea Twins' Gift",
			spells : ["water breathing"],
			selection : ["water breathing"],
			oncelr : true,
		},
		source : ["UA:WnW", 5],
		prereqeval : "classes.known.warlock.subclass === 'the archfey'",
		eval : "if (!CurrentRace.speed || !(/swim/i).test(CurrentRace.speed[0])) { Value('Speed', What('Speed').replace(/(\\d+) ?(ft|m)/i, '$1 $2\\n$1 $2 swim')); Value('Speed encumbered', What('Speed encumbered').replace(/(\\d+) ?(ft|m)/i, '$1 $2\\n$1 $2 swim').replace(/\\n/, typePF ? ' ' : '\\n')); };",
		removeeval : "if (!CurrentRace.speed || !(/swim/i).test(CurrentRace.speed[0])) { Value('Speed', What('Speed').replace(/(\\r| )?(\\d+) ?(ft|m) swim/i, '')); Value('Speed encumbered', What('Speed encumbered').replace(/(\\r| )?(\\d+) ?(ft|m) swim/i, '')); };"
	}, {
		objname : "Seeker's Speech (prereq: the Seeker patron)",
		name : "Seeker's Speech",
		description : desc([
			"When I finish a long rest, I pick two languages that I know until I finish my next long rest"
		]),
		source : ["UA:WnW", 5],
		prereqeval : "classes.known.warlock.subclass === 'the seeker'"
	}, {
		objname : "Shroud of Ulban (prereq: level 18 warlock, the Great Old One patron)",
		name : "Shroud of Ulban",
		description : desc([
			"As an action, I can turn myself invisible for 1 minute",
			"If I attack, deal damage, or force a creature to make a save, I become visible again",
			"However, I only become visible at the end of the current turn"
		]),
		source : ["UA:WnW", 4],
		prereqeval : "classes.known.warlock.subclass === 'the great old one' && classes.known.warlock.level >= 18",
		action : ["action", ""]
	}, {
		objname : "Superior Pact Weapon (prereq: level 9 warlock, Pact of the Blade)",
		name : "Superior Pact Weapon",
		description : desc([
			"Any pact weapon I create is a +2 magic weapon, if it isn't already a magic weapon"
		]),
		source : ["UA:WnW", 5],
		prereqeval : "classes.known.warlock.level >= 9 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the blade') !== -1",
		calcChanges : {
			atkCalc : ["if (!thisWeapon[1] && (/\\bpact\\b/i).test(WeaponText)) { var pactMag = pactMag !== undefined ? 2 - pactMag : 2; output.magic += pactMag; }; ", "If I include the word 'Pact' in a weapon's name or description, it will be treated as a Pact Weapon. If it doesn't already include a magical bonus in its name, the calculation will add +2 to its To Hit and Damage."]
		}
	}, {
		objname : "Tomb of Levistus (prereq: the Fiend patron)",
		name : "Tomb of Levistus",
		description : desc([
			"As a reaction when I take damage, I can entomb myself in ice until the end of my turn",
			"I get 10 temp. HP per warlock level, which can be used to absorb the triggering damage",
			"Until the ice is gone, I have vulnerability to fire damage, 0 speed, and am incapacitated"
		]),
		source : ["UA:WnW", 5],
		prereqeval : "classes.known.warlock.subclass === 'the fiend'",
		recovery : "short rest",
		usages : 1,
		action : ["reaction", ""]
	}, {
		objname : "Ultimate Pact Weapon (prereq: level 15 warlock, Pact of the Blade)",
		name : "Ultimate Pact Weapon",
		description : desc([
			"Any pact weapon I create is a +3 magic weapon, if it isn't already a magic weapon"
		]),
		source : ["UA:WnW", 5],
		prereqeval : "classes.known.warlock.level >= 15 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the blade') !== -1",
		calcChanges : {
			atkCalc : ["if (!thisWeapon[1] && (/\\bpact\\b/i).test(WeaponText)) { var pactMag = pactMag !== undefined ? 3 - pactMag : 3; output.magic += pactMag; }; ", "If I include the word 'Pact' in a weapon's name or description, it will be treated as a Pact Weapon. If it doesn't already include a magical bonus in its name, the calculation will add +3 to its To Hit and Damage."]
		}
	}, {
		objname : "Arcane Gunslinger (prereq: Pact of the Blade)",
		name : "Arcane Gunslinger",
		description : desc([
			"My pact weapon can take firearm forms, and I can transform magical firearms into one"
		]),
		source : ["UA:MM", 3],
		prereqeval : "What('Class Features Remember').indexOf('warlock,pact boon,pact of the blade') !== -1",
		calcChanges : {
			atkAdd : ["if (isRangedWeapon &&  && (/\\bpact\\b/i).test(inputText)) {fields.Proficiency = true; fields.Description += thisWeapon[1] ? '' : (fields.Description ? '; ' : '') + 'Counts as magical'; }; ", "If I include the word 'Pact' in a firearm weapon's name, it gets treated as my Pact Weapon."]
		}
	}].forEach( function (invoc) {
		ClassList.warlock.features["eldritch invocations"].extrachoices.push(invoc.objname);
		ClassList.warlock.features["eldritch invocations"][invoc.objname.toLowerCase()] = invoc;
	});
	ClassList.warlock.features["eldritch invocations"].extrachoices.sort();
	
	AmendRaces();
	AmendFeats();
};