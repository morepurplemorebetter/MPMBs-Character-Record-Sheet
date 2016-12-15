/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script changes the Ranger class to the revised version proposed in Unearthed Arcana
				This is taken from The Ranger, Revised Unearthed Arcana (https://media.wizards.com/2016/dnd/downloads/UA_RevisedRanger.pdf)
	Code by:	MorePurpleMoreBetter
	Date:		2016-11-07 (sheet v12.5)
	
	Note that the Revised Ranger's Animal Companion will only work in a Character Record Sheet of version 12.26 or later!
*/

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
			eval : "Checkbox(\"Init Adv\", true, \"Advantage to Initiative checks was gained from Ranger (Natural Explorer)\"); ClassFeatureOptions([\"ranger\", \"natural explorer\", \"travel benefit\", \"extra\"]);",
			removeeval : "Checkbox(\"Init Adv\", false, \"\"); ClassFeatureOptions([\"ranger\", \"natural explorer\", \"travel benefit\", \"extra\"], \"remove\");"
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
ClassSubList["beast conclave"] = {
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
	regExpSearch : /^(?!.*(monster|barbarian|bard|cleric|druid|fighter|monk|paladin|rogue|sorcerer|warlock|wizard))(?=.*(hunter|huntress)).*$/i,
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

SourceList["UA:RR"] = {
	name : "Unearthed Arcana: The Ranger, Revised", //2016-09-12
	abbreviation : "UA:RR",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2016/dnd/downloads/UA_RevisedRanger.pdf"
};