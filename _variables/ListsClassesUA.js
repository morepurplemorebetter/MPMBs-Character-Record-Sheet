//All the subclasses from the Unearthed Arcana articles are present in this file chronologically

/*
	the Eberron Unearthed Arcana of 2015-02-02
	(http://media.wizards.com/2015/downloads/dnd/UA_Eberron_v1.pdf)
*/
//adds a subclass for the Wizard, called "Tradition of the Artificer"
//this code was contributed by Pengsloth
ClassSubList["artificer"] = {
	regExpSearch : /(artificer|infuser)/i,
	subname : "Tradition of the Artificer",
	source : ["UA:E", 3],
	fullname : "Artificer",
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
ClassList.wizard.subclasses[1].push("artificer");

/*
	the Modifying Classes Unearthed Arcana of 2015-04-06
	(http://media.wizards.com/2015/downloads/dnd/UA3_ClassDesignVariants.pdf)
*/
//adds a subclass for the Sorcerer, called "Favored Soul"
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
			weapons : [true, false],
		},
		"subclassfeature1.1" : {
			name : "Chosen of the Gods",
			source : ["UA:MC", 8],
			minlevel : 1,
			description : "\n   " + "Choose a Cleric Domain using the \"Choose Feature\" button above" + "\n   " + "I add the chosen domain's spells to my known spells, when they are of a level I can cast" + "\n   " + "These count as sorcerer spells, but do not count against the number of spells I can know",
			choices : [],
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
			description : "\n   " + "When I cast a spell I gained from the Chosen of the Gods class feature, I heal myself" + "\n   " + "I regain a number of HP equal to my Charisma modifier (minimum 1) + the spell's level",
		}
	}
};
ClassList.sorcerer.subclasses[1].push("favored soul");

/*
	the Light, Dark, Underdark! Unearthed Arcana of 2015-11-02
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
			name : "Stalker’s Flurry",
			source : ["UA:LDU", 2],
			minlevel : 11,
			description : "\n   " + "Once during my turn when I miss an attack, I can immediately make an extra attack",
		},
		"subclassfeature15" : {
			name : "Stalker’s Dodge",
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
ClassSubList["shadow"] = {
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
			action : ["action", " (1 sorcery point)"]
		},
		"subclassfeature1.1" : {
			name : "Strength of the Grave",
			source : ["UA:LDU", 2],
			minlevel : 1,
			description : "\n   " + "When damage reduces me to 0 HP, that isn't radiant damage or a critical hit," + "\n   " + "I can make a Constitution save (DC 5 + damage taken) to drop to 1 HP instead",
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
ClassList.sorcerer.subclasses[1].push("shadow");

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
			description : "\n   " + "I add my Cha modifier to Spells/cantrips I cast that deal fire or radiant damage" + "\n   " + "I have resistance to radiant damage and know the Light and Sacred Flame cantrips",
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

/*
	the Kits of Old Unearthed Arcana of 2016-01-04
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
			weapons : [false, false, ["scimitar"]],
		},
		"subclassfeature3.1" : {
			name : "Two-Weapon Fighting Style",
			source : ["UA:KoO", 1],
			minlevel : 3,
			description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks",
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
		},
	}
};
ClassList.bard.subclasses[1].push("college of swords");

//a subclass for the Bard, called "College of Satire"
ClassSubList["college of satire"] = {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*satire).*$/i,
	subname : "College of Satire",
	source : ["UA:KoO", 2],
	attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiencies",
			source : ["UA:KoO", 2],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with thieves' tools, sleight of hand, and one other skill of my choice",
			skills : ["Sleight of Hand"],
			skillstxt : "\n\nBard (College of Satire): Thieves' Tools, Sleight of Hand, and any one other skill.",
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
			skillstxt : "\n\nCavalier: Choose two skills from: Animal Handling, Insight, Performance, or Persuasion. - or - Choose one of those skills and any one tool.",
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
	fullname : "Scout",
	abilitySave : 1,
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiencies",
			source : ["UA:KoO", 4],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with two skills or one skill and Thieves' Tools; For skills choose from:" + "\n   " + "Acrobatics, Athletics, Investigation, Medicine, Nature, Perception, Stealth, or Survival",
			skillstxt : "\n\nScout: Choose two skills from: Acrobatics, Athletics, Investigation, Medicine, Nature, Perception, Stealth, or Survival. - or - Choose one of those skills and Thieves' Tools.",
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

/*
	the Gothic Heroes Unearthed Arcana of 2016-04-04
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
			skillstxt : "\n\nMonster Hunter: Choose two skills from: Arcana, History, Insight, Investigation, Nature, or Perception. - or - Choose one of those skills and any one tool.",
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
			description : "\n   " + "I can use the bonus action granted by Cunning Action for the following as well:" + "\n    - " + "To make a Wisdom (Perception) check to spot a hidden creature or object" + "\n    - " + "To make an Intelligence (Investigation) check to uncover and decipher clues" + "\n    - " + "To use Insightful Fighting (see below)" ,
		},
		"subclassfeature3.2" : {
			name : "Insightful Fighting",
			source : ["UA:GH", 3],
			minlevel : 3,
			description : "\n   " + "As an action or bonus action, I can decipher the tactics of an active opponent I can see" + "\n   " + "I have to make a Wisdom (Insight) check vs. the target's Charisma (Deception) check" + "\n   " + "If I succeed, I can use sneak attack on the target regardless of advantage/disadvantage" + "\n   " + "This benefit lasts for 1 minute or until I successfully use Insightful Fighting again",
			action : ["action", ""]
		},
		"subclassfeature9" : {
			name : "Steady Eye ",
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

/*
	The Faithful Unearthed Arcana of 2016-08-01
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

/*
	The Ranger, Revised Unearthed Arcana of 2016-09-12
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
			additional : ["+2 weapon attack damage", "+2 weapon attack damage", "+2 weapon attack damage", "+2 weapon attack damage", "+2 weapon attack damage", "+4 weapon attack damage", "+4 weapon attack damage", "+4 weapon attack damage", "+4 weapon attack damage", "+4 weapon attack damage", "+4 weapon attack damage", "+4 weapon attack damage", "+4 weapon attack damage", "+4 weapon attack damage", "+4 weapon attack damage", "+4 weapon attack damage", "+4 weapon attack damage", "+4 weapon attack damage", "+4 weapon attack damage", "+4 weapon attack damage"],
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
			removeeval : "RemoveLanguage(\"+1 from Favored Enemy\", \"Ranger (Favored Enemy)\");"
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
				eval : "this.getField(\"Attack To Hit Bonus Global\").value += 2",
				removeeval : "this.getField(\"Attack To Hit Bonus Global\").value -= 2"
			},
			"defense" : {
				name : "Defense Fighting Style",
				description : "\n   " + "+1 bonus to AC when I'm wearing armor",
				eval : "AddACMisc(1, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\")",
				removeeval : "AddACMisc(0, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\")"
			},
			"dueling" : {
				name : "Dueling Fighting Style",
				description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons",
				eval : "this.getField(\"Attack Damage Bonus Global\").value += 2",
				removeeval : "this.getField(\"Attack Damage Bonus Global\").value -= 2"
			},
			"two-weapon fighting" : {
				name : "Two-Weapon Fighting Style",
				description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks"
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
			name : "Stalker’s Flurry",
			source : ["UA:RR", 8],
			minlevel : 11,
			description : "\n   " + "Once during my turn when I miss an attack, I can immediately make an extra attack",
		},
		"subclassfeature15" : {
			name : "Stalker’s Dodge",
			source : ["UA:RR", 8],
			minlevel : 15,
			description : "\n   " + "As a reaction when I'm attacked without adv., I can impose disadv. on the attack roll",
			action : ["reaction", " (when attacked)"]
		},
	}
};
ClassSubList["deep stalker conclave"].features["subclassfeature3.1"].spellcastingExtra[100] = "AddToKnown";

/*
	the Barbarian Primal Paths Unearthed Arcana of 2016-11-07
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
				eval : "var ToAdd = [\"barbarian\", \"subclassfeature6\", \"desert\"]; if (classes.known.barbarian.level >= 6 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ToAdd[1] = \"subclassfeature14\"; if (classes.known.barbarian.level >= 14 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
			},
			"sea" : {
				name : "Storm of Fury: Sea",
				description : "\n   " + "While raging, I emanate a 10-ft radius aura that shapes the environment around me" + "\n   " + "At the end of each of my turns, I can choose a creature in my aura, other than myself" + "\n   " + "It must make a Dex save or take lightning damage, or half damage on a successful save" + "\n   " + "The DC for this save is 8 + my proficiency bonus + my Constitution modifier",
				additional : ["", "", "2d6", "2d6", "2d6", "2d6", "2d6", "2d6", "2d6", "3d6", "3d6", "3d6", "3d6", "3d6", "4d6", "4d6", "4d6", "4d6", "4d6", "4d6"],
				usages : 1,
				recovery : "turn",
				eval : "var ToAdd = [\"barbarian\", \"subclassfeature6\", \"sea\"]; if (classes.known.barbarian.level >= 6 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ToAdd[1] = \"subclassfeature14\"; if (classes.known.barbarian.level >= 14 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
			},
			"tundra" : {
				name : "Storm of Fury: Tundra",
				description : "\n   " + "While raging, I emanate a 10-ft radius aura that shapes the environment around me" + "\n   " + "Any enemy that ends its turn in my aura takes cold damage",
				additional : ["", "", "2 cold damage", "3 cold damage", "3 cold damage", "3 cold damage", "3 cold damage", "4 cold damage", "4 cold damage", "4 cold damage", "4 cold damage", "5 cold damage", "5 cold damage", "5 cold damage", "5 cold damage", "6 cold damage", "6 cold damage", "6 cold damage", "6 cold damage", "7 cold damage"],
				eval : "var ToAdd = [\"barbarian\", \"subclassfeature6\", \"tundra\"]; if (classes.known.barbarian.level >= 6 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ToAdd[1] = \"subclassfeature14\"; if (classes.known.barbarian.level >= 14 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
			},
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
				save : "Immune to effects of extreme heat",
			},
			"sea" : {
				name : "Storm Soul: Sea",
				description : "\n   " + "I have resistance to lightning damage and can breathe underwater",
				eval : "AddResistance(\"Lightning\");",
				removeeval : "RemoveResistance(\"Lightning\");",
				},
			"tundra" : {
				name : "Storm Soul: Tundra",
				description : "\n   " + "I have resistance to cold damage and don't suffer the effects of extreme cold",
				eval : "AddResistance(\"Cold\");",
				removeeval : "RemoveResistance(\"Cold\");",
				save : "Immune to effects of extreme cold",
			},
			eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?barbarian,subclassfeature3,(desert|sea|tundra).*/i; if (CFrem.match(tReg)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"barbarian,subclassfeature6,\" + FeaChoice, false);};};",
		},
		"subclassfeature10" : {
			name : "Shield of the Storm",
			source : ["UA:BPP", 2],
			minlevel : 10,
			description : "\n   " + "While I'm raging, allies within my aura gain the benefits of my Storm Soul feature",
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
				description : "\n   " + "Enemy in my aura move more than 5 ft on the ground must make a Strength save" + "\n   " + "On a fail, it moves only 5 ft and its speed drops to 0 until the start of its next turn" + "\n   " + "The DC for this save is 8 + my proficiency bonus + my Constitution modifier",
			},
			"sea" : {
				name : "Raging Storm: Sea",
				description : "\n   " + "Creatures in my aura hit by my attack must make a Str save or be knocked prone" + "\n   " + "The DC for this save is 8 + my proficiency bonus + my Strength modifier",
			},
			"tundra" : {
				name : "Raging Storm: Tundra",
				description : "\n   " + "The area within my aura is difficult terrain for my enemies",
			},
			eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?barbarian,subclassfeature3,(desert|sea|tundra).*/i; if (CFrem.match(tReg)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"barbarian,subclassfeature14,\" + FeaChoice, false);};};",
		},
	},
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
			description : "\n   " + "As a reaction when I fail a saving throw while raging, I can instead succeed on it" + "\n   " + "Doing so immediately ends my rage and I can’t rage again until I finish a short rest",
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
			description : "\n   " + "While raging, having 0 hit points doesn’t knock me unconscious" + "\n   " + "I still must make death saves, and I suffer the normal effects of taking damage" + "\n   " + "However, if I would die due to failing death saves, I don’t die until my rage ends",
		},
	}
};
ClassList.barbarian.subclasses[1].push("zealot");

/*
	the Bard Colleges Unearthed Arcana of 2016-11-14
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
				eval : "AddAction(\"bonus action\", \"Shadow Disguise  (end)\", \"Bard (College of Whispers)\");",
				removeeval : "RemoveAction(\"bonus action\", \"Shadow Disguise  (end)\", \"Bard (College of Whispers)\");",
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

/*
	the Cleric: Divine Domains Unearthed Arcana of 2016-11-21
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
			eval : "AddResistance(\"Fire\", \"Cleric (Forge Domain)\"); AddACMisc(1, \"Soul of the Forge\", \"+1 AC while wearing Medium or Heavy armor.\\n\\nSoul of the Forge was gained from Cleric (Forge Domain).\");",
			removeeval : "RemoveResistance(\"Fire\"); AddACMisc(0, \"Soul of the Forge\", \"+1 AC while wearing Medium or Heavy armor.\\n\\nSoul of the Forge was gained from Cleric (Forge Domain).\");",
		},
		"subclassfeature8" : {
			name : "Divine Strike",
			source : ["UA:CDD", 1],
			minlevel : 8,
			description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
			additional : ["", "", "", "", "", "", "", "+1d8 fire damage", "+1d8 fire damage", "+1d8 fire damage", "+1d8 fire damage", "+1d8 fire damage", "+1d8 fire damage", "+2d8 fire damage", "+2d8 fire damage", "+2d8 fire damage", "+2d8 fire damage", "+2d8 fire damage", "+2d8 fire damage", "+2d8 fire damage"],
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
			additional : ["", "", "", "", "", "", "", "+1d8 necrotic damage", "+1d8 necrotic damage", "+1d8 necrotic damage", "+1d8 necrotic damage", "+1d8 necrotic damage", "+1d8 necrotic damage", "+2d8 necrotic damage", "+2d8 necrotic damage", "+2d8 necrotic damage", "+2d8 necrotic damage", "+2d8 necrotic damage", "+2d8 necrotic damage", "+2d8 necrotic damage"],
		},
		"subclassfeature17" : {
			name : "Keeper of Souls",
			source : ["UA:CDD", 2],
			minlevel : 17,
			description : "\n   " + "Once per round, if I'm not incapacitated, I can manipulate the energy of the dying" + "\n   " + "When an enemy I can see dies within 30 ft of me, I or an ally within 30 ft regain HP" + "\n   " + "The HP regained is equal to the enemy’s number of Hit Dice",
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
			description : "\n   " + "When I cast a spell to heal another using a spell slot, I heal 2 + the spell’s level as well",
		},
		"subclassfeature8" : {
			name : "Divine Strike",
			source : ["UA:CDD", 3],
			minlevel : 8,
			description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
			additional : ["", "", "", "", "", "", "", "+1d8 radiant damage", "+1d8 radiant damage", "+1d8 radiant damage", "+1d8 radiant damage", "+1d8 radiant damage", "+1d8 radiant damage", "+2d8 radiant damage", "+2d8 radiant damage", "+2d8 radiant damage", "+2d8 radiant damage", "+2d8 radiant damage", "+2d8 radiant damage", "+2d8 radiant damage"],
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
			removeeval : "RemoveAction(\"bonus action\", \"Indomitable Defense (return)\", \"Cleric (Protection Domain)\");",
		},
	},
};
ClassList.cleric.subclasses[1].push("protection domain");

/*
	the Druid Circles Unearthed Arcana of 2016-11-28
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
			description : "\n   " + "I can talk with beasts, they understand me and I them, to the limit of their intelligence" + "\n   " + "This doesn't automatically make me friends with all beasts",
		},
		"subclassfeature2.1" : {
			name : "Spirit Bond",
			source : ["UA:DC", 2],
			minlevel : 2,
			description : "\n   " + "As a bonus action, I can summon a spirit to an empty space within 60 ft that I can see" + "\n   " + "The Bear, Hawk, or Wolf spirit, creates a 30-ft radius aura and persist for 1 minute" + "\n   " + "It doesn’t occupy space, is immobile, and counts as neither a creature nor an object" + "\n    - " + "Bear: my allies in the area and I instantly gain 5 + my druid level in temp HP" + "\n       " + "While in the aura, my allies and I gain advantage on Strength checks and saves" + "\n    - " + "Hawk: my allies and I gain advantage on attacks against targets in the aura" + "\n    - " + "Wolf: my allies and I gain advantage on ability checks to detect targets in the aura" + "\n       " + "If I cast a healing spell with a spell slot, allies in the aura heal my druid level in HP",
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"subclassfeature6" : {
			name : "Mighty Summoner",
			source : ["UA:DC", 2],
			minlevel : 6,
			description : "\n   " + "Beast I summon with my spells have +2 HP per HD and their attacks count as magical",
		},
		"subclassfeature10" : {
			name : "Guardian Spirit",
			source : ["UA:DC", 2],
			minlevel : 10,
			description : "\n   " + "Whenever I finish a long rest, I gain the benefits of a Death Ward spell for 24 hours",
		},
		"subclassfeature14" : {
			name : "Faithful Summons",
			source : ["UA:DC", 2],
			minlevel : 14,
			description : "\n   " + "When I am reduced to 0 HP or incapacitated against my will, I can summon protectors" + "\n   " + "I gain the benefits of a Conjure Animals spell as if cast with a 9th-level spell slot" + "\n   " + "It summons 4 beast of my choice with CR 2 or lower within 20 ft of me for 1 hour" + "\n   " + "If they receive no commands from me, they protect me from harm and attack foes",
			usages : 1,
			recovery : "long rest",
		},
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

/*
	the Fighter Martial Archetypes Unearthed Arcana of 2016-12-05
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
			additional : ["", "", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+2d6 force damage", "+4d6 force damage", "+4d6 force damage", "+4d6 force damage"],
			usages : 2,
			recovery : "short rest",
			eval : "AddAction(\"bonus action\", \"Create Magical Arrow\", \"Arcane Archer (Arcane Arrow)\");",
			removeeval : "RemoveAction(\"bonus action\", \"Create Magical Arrow\")",
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
				description : " [Enchantment]" + "\n   " + "If the arrow hits, I choose an ally withing 30 feet of the target" + "\n   " + "The target can't attack the chosen ally or include the ally in any harmful area of effects" + "\n   " + "This effect stops if the target is immune to charm effects or the ally damages the target",
			},
			"brute bane arrow" : {
				name : "Brute Bane Arrow",
				source : ["UA:FMA", 1],
				description : " [Necromancy]" + "\n   " + "If the arrow hits, the target's attacks deal half damage until the end of my next turn" + "\n   " + "Only attacks that deal bludgeoning, piercing or slashing damage are halved",
			},
			"bursting arrow" : {
				name : "Bursting Arrow",
				source : ["UA:FMA", 2],
				description : " [Evocation]" + "\n   " + "If the arrow hits, all creatures within 10 ft of the target creature take 2d6 force damage",
			},
			"defending arrow" : {
				name : "Defending Arrow",
				source : ["UA:FMA", 2],
				description : " [Abjuration]" + "\n   " + "If the arrow hits, the target has disadv. on its next attack before the end of my next turn",
			},
			"grasping arrow" : {
				name : "Grasping Arrow",
				source : ["UA:FMA", 2],
				description : "[Conjuration Magic]" + "\n   " + "If the arrow hits, the target is wrapped with grasping, thorny brambles for 1 minute" + "\n   " + "The target has -10 ft speed; It takes 2d6 slashing damage when moving more than 1 ft" + "\n   " + "As an action, the target or a creature can remove the brambles with a DC 10 Str check",
			},
			"piercing arrow" : {
				name : "Piercing Arrow",
				source : ["UA:FMA", 2],
				description : " [Transmutation]" + "\n   " + "The arrow transform into an ethereal dart that creates a line of 1 ft wide and 30 ft long" + "\n   " + "I then make a separate attack using my Arcane Arrow against each creature in that line",
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
				description : " [Illusion]" + "\n   " + "If the arrow hits, the target can't see beyond 30 ft until the end of my next turn",
			},
		},
		"subclassfeature3.2" : {
			name : "Archer's Lore",
			source : ["UA:FMA", 1],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with two skills" + "\n   " + "I can choose from: Arcana, Athletics, Nature, Perception, Stealth, or Survival",
			skillstxt : "\n\n" + toUni("Arcane Archer") + ": Choose two from Arcana, Athletics, Nature, Perception, Stealth, and Survival.",
		},
		"subclassfeature7" : {
			name : "Conjure Arrows",
			source : ["UA:FMA", 1],
			minlevel : 7,
			description : "\n   " + "As an action, I can create up to 20 nonmagical arrows that remain for 10 minutes" + "\n   " + "The arrows vanish if I use this feature again with 10 minutes",
			action : ["action", ""],
		},
		"subclassfeature15" : {
			name : "Ever-Ready Arrow",
			source : ["UA:FMA", 1],
			minlevel : 15,
			description : "\n   " + "I regain one use of Arcane Arrow one minute after I expend my last remaining use of it"
		},
	}
};
ClassList.fighter.subclasses[1].push("arcane archer");

//a subclass for the Fighter, called "Knight"
ClassSubList["knight"] = {
	regExpSearch : /knight/i,
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
			additional : ["", "", "+3 damage", "+4 damage", "+5 damage", "+6 damage", "+7 damage", "+8 damage", "+9 damage", "+10 damage", "+11 damage", "+12 damage", "+13 damage", "+14 damage", "+15 damage", "+16 damage", "+17 damage", "+18 damage", "+19 damage", "+20 damage"],
			action : ["reaction", ""]
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
			additional : ["", "", "", "", "", "", "", "", "", "+5 damage", "+5 damage", "+6 damage", "+6 damage", "+7 damage", "+7 damage", "+8 damage", "+8 damage", "+9 damage", "+9 damage", "+10 damage"],
			action : ["reaction", ""]
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
			eval : "AddACMisc(1, \"Defender's Blade\", \"When wearing heavy armor, the class feature Defender's Blade gives a +1 bonus to AC\")",
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
			description : "\n   " + "As a bonus action, I can carefully aim my ranged weapon on a target I can see in range" + "\n   " + "Until the end of my turn, my attacks with this weapon on the target benefit from:" + "\n   " + "Ignoring half and three-quarter cover; Dealing 2 + fighter level extra damage per hit",
			recovery : "short rest",
			usages : 3,
			additional : ["", "", "+3 damage", "+4 damage", "+4 damage", "+5 damage", "+5 damage", "+6 damage", "+6 damage", "+7 damage", "+7 damage", "+8 damage", "+8 damage", "+9 damage", "+9 damage", "+10 damage", "+10 damage", "+11 damage", "+11 damage", "+12 damage"],
			action : ["bonus action", ""]
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
			description : "\n   " + "I don't have disadvantage when making a ranged attack while within 5 ft of a hostile" + "\n   " + "A hostile within 5 ft that I hit with a ranged attack on my turn, can’t take reactions" + "\n   " + "This lasts until the end of my turn",
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

/*
	the Monk Monastic Traditions Unearthed Arcana of 2016-12-12
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
			removeeval : "ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"kensei defense\", \"extra\"], \"remove\");"
		},
		"ki-empowered strikes" : {
			name : "One with the Blade",
			source : ["UA:MMT", 1],
			minlevel : 6,
			description : "\n   " + "My unarmed strikes and kensei weapon attacks count as magical" + "\n   " + "As a bonus action, once per short rest, I can mark one creature I can see within 30 ft" + "\n   " + "This turn, I double my proficiency bonus on my next weapon attack against the mark",
			usages : 1,
			recovery : "short rest",
			additional : "Mark",
			action : ["bonus action", " (mark)"]
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
			changeeval : "if (newClassLvl.monk >= 11 && (What(\"Extra.Notes\") + What(\"Class Features\")).toLowerCase().indexOf(\"sharpen the blade\") === -1) {ClassFeatureOptions([\"monk\", \"subclassfeature17\", \"sharpen the blade\", \"extra\"])} else if (newClassLvl.monk <= 11 && oldClassLvl.monk >= 11) {ClassFeatureOptions([\"monk\", \"subclassfeature17\", \"sharpen the blade\", \"extra\"], \"remove\")}"
		}
	}
};
ClassList.monk.subclasses[1].push("way of the kensei");

//a subclass for the Monk, called "Way of Tranquility"
ClassSubList["way of tranquility"] = {
	regExpSearch : /^(?=.*tranquility|tranquil|calm|diplomatic|diplomat)((?=.*(monk|monastic))|((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior))).*$/i,
	subname : "Way of Tranquility",
	ource : ["UA:MMT", 2],
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

//a function to run at startup of the sheet to ensure that all of the UA additions work as they should
function UAstartupCode() {
	//Sorcerer (Favored Soul): add all cleric domain spells to the options of the first level ability "Chosen of the Gods"
	var FSfeat = ClassSubList["favored soul"].features["subclassfeature1.1"];
	for (var i = 0; i < ClassList.cleric.subclasses[1].length; i++) {
		var aDomain = ClassList.cleric.subclasses[1][i];
		if (ClassSubList[aDomain] && ClassSubList[aDomain].spellcastingExtra) {
			var cDomain = ClassSubList[aDomain];
			var eSpells = cDomain.spellcastingExtra;
			eSpells[100] = "AddToKnown";
			FSfeat.choices.push(cDomain.subname);
			FSfeat[cDomain.subname.toLowerCase()] = {
				name : "Chosen of the Gods: " + cDomain.subname,
				source : cDomain.features["subclassfeature1"].source,
				spellcastingExtra : eSpells,
				description : "\n   " + "I add the " + cDomain.subname.toLowerCase() + " spells to my known spells, if they are of a level I can cast" + "\n   " + "These count as sorcerer spells, but do not count against the number of spells I can know",
			}
		}
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
			firstCol : "R",
		},
	};
	
	//Add fighting styles to the options of fighter, paladin, and ranger
	var FSclasses = ["fighter", "ranger", "paladin"];
	var fightingStyles = [{
		choice : "Mariner",
		feature : {
			name : "Mariner Fighting Style",
			source : ["UA:WA", 3],
			description : "\n   " + "While not wearing heavy armor or using a shield, I gain +1 AC and swim/climb speed" + "\n   " + "The swimming and climbing speeds equal my current walking speed",
			eval : "AddACMisc(1, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\")",
			removeeval : "AddACMisc(0, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\")"
		}
	}, {
		choice : "Close Quarters Shooter",
		feature : {
			name : "Close Quarters Shooting Fighting Style",
			source : ["UA:LDU", 1],
			description : "\n   " + "+1 bonus to attack rolls I make with ranged attacks" + "\n   " + "I don't have disadvantage when making a ranged attack while within 5 ft of a hostile" + "\n   " + "My ranged attacks ignore half and three-quarters cover against targets within 30 ft",
			eval : "this.getField(\"Attack To Hit Bonus Global\").value += 1",
			removeeval : "this.getField(\"Attack To Hit Bonus Global\").value -= 1"
		}
	}, {
		choice : "Tunnel Fighter",
		feature : {
			name : "Tunnel Fighting Style",
			source : ["UA:LDU", 1],
			description : "\n   " + "As a bonus action, I enter a defensive stance that lasts until the start of my next turn" + "\n   " + "While in the stance, I can make opportunity attacks without using my reaction" + "\n   " + "While I'm in this defensive stance I gain the following two benefits:" + "\n    - " + "I can make opportunity attacks without using my reaction" + "\n    - " + "I can make a melee attack as a reaction if a hostile moves >5 ft while in my reach",
			action : ["bonus action", ""]
		}
	}];
	for (var cla = 0; cla < FSclasses.length; cla++) {
		var FSfeat = ClassList[FSclasses[cla]].features["fighting style"];
		for (var fs = 0; fs < fightingStyles.length; fs++) {
			var FStyle = fightingStyles[fs];
			FSfeat.choices.push(FStyle.choice);
			FSfeat[FStyle.choice.toLowerCase()] = FStyle.feature;
		}
		FSfeat.choices.sort();
	};
}