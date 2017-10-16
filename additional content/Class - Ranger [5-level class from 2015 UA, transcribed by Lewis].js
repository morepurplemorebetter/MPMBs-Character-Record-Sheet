/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script replaces the "Ranger" class with the 5-level ranger class from Unearthed Arcana: Ranger of 2015-09-09
				This also includes the one level from the three subclasses for it: "Guardian", "Seeker", and "Stalker".
	
				This is taken from the Unearthed Arcana website
				https://media.wizards.com/2015/downloads/dnd/DX_0907_UA_RangerOptions.pdf
				
	Code by:	Lewis Henderson
	Date:		2017-09-05 (sheet v12.998)

	Please note that the original .pdf has the hit dice as 2d6 per level.
	At this time, there isn't any way to implement this, so the hit dice is recorded as a d12.
	
	Also note that there is no automation for the companion page included in this.
	You will have to chose the ranger's animal spirit from the companion race drop-down list and add the Wisdom modifier bonus to attacks and saves manually.
	
	-IMPORTANT-
	By adding this code to your sheet, you will no longer be able to use the PHB version of the ranger.
	Please make sure you add this code to a completely empty sheet to avoid complications with a pre-existing character with the ranger class.
*/

ClassList["ranger"] = {
	regExpSearch : /^((?=.*(ranger|strider))|((?=.*(nature|natural))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
	name : "Ranger",
	source : ["UA:R", 0],
	primaryAbility : "\n \u2022 Ranger: Dexterity and Wisdom;",
	prereqs : "\n \u2022 Ranger: Dexterity 13 and Wisdom 13;",
	die : 12,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Dex", "Wis"],
	skills : ["\n\n" + toUni("Ranger") + ": Choose three from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival", "\n\n" + toUni("Multiclass Ranger") + ": Choose one from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival"],
	toolProfs : { primay : ["Herbalism kit"] },
	armor : [
		[true, false, false, true],
		[true, false, false, true]
	],
	weapons : [
		[true, true],
		[true, true]
	],
	equipment : "Ranger starting equipment:\n \u2022 leather armor;\n \u2022 Two shortswords -or- two martial melee weapons -or- a martial weapon and a shield;\n \u2022 A dungeoneer's pack -or- an explorer's pack;\n \u2022 A longbow and a quiver of 20 arrows -or- a martial weapon.",
	subclasses : ["Ranger Path", ["ranger-guardian", "ranger-seeker", "ranger-stalker"]],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"ambuscade" : {
			name : "Ambuscade",
			source : ["UA:R", 2],
			minlevel : 1,
			description : "\n   " + "When I roll initiative, I gain a special turn before others can act" + "\n   " + "During this bonus turn, I can only use the Attack or Hide action" + "\n   " + "I can't be surprised, but if I would be surprised I don't get the bonus turn"
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
		"skirmisher's stealth" : {
			name : "Skirmisher's Stealth",
			source : ["UA:R", 3],
			minlevel : 2,
			description : "\n   " + "At the start of my turn, I can chose a creature I'm hidden from" + "\n   " + "During that turn, I remain hidden from it, regardless of my actions" + "\n   " + "As a bonus action at the end of my turn, I can use the Hide action",
			action : ["bonus action", ""],
		},
		"subclassfeature3" : {
			name : "Ranger Path",
			source : ["UA:R", 3],
			minlevel : 3,
			description : "\n   " + "Choose a Ranger Path you wish to follow and put it in the \"Class\" field" + "\n   " + "Choose Guardian, Seeker, or Stalker"
		},
		"primeval awareness" : {
			name : "Primeval Awareness",
			source : ["P", 92],
			minlevel : 3,
			description : "\n   " + "As an action, I can focus my awareness for 1 min per level" + "\n   " + "Out to 1 mile (6 in favored terrain), I sense if certain types of creatures are present",
			additional : "aber./celest./dragon/elem./fey/fiend/undead",
			action : ["action", ""]
		}
	}
};

ClassSubList["ranger-guardian"] = {
	regExpSearch : /^(?=.*guardian)((?=.*(ranger|strider))|((?=.*(nature|natural))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
	subname : "Guardian",
	source : ["UA:R", 3],
	features : {
		"subclassfeature3" : {
			name : "Brown Bear Spirit Companion",
			source : ["UA:R", 3],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can have my brown bear spirit animal materialize or dismiss it",
				"It has all the stats of a brown bear and adds my Wis mod to its attacks and saves",
				"Its HP is half my ranger level or the total in its stat block, whichever is higher",
				"It takes it turn right after my initiative and is under my complete control"
			]),
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"subclassfeature3.1" : {
			name : "Guardian's Shroud",
			source : ["UA:R", 4],
			minlevel : 3,
			description :"\n   " + "When I call my spirit animal, I grant me or an ally I can see 2d6 + Wis mod temp HP"
		}
	}
};

ClassSubList["ranger-seeker"] = {
	regExpSearch : /^(?=.*seeker)((?=.*(ranger|strider))|((?=.*(nature|natural))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
	subname : "Seeker",
	source : ["UA:R", 4],
	features : {
		"subclassfeature3" : {
			name : "Giant Eagle Spirit Companion",
			source : ["UA:R", 3],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can have my giant eagle spirit animal materialize or dismiss it",
				"It has all the stats of a giant eagle and adds my Wis mod to its attacks and saves",
				"Its HP is half my ranger level or the total in its stat block, whichever is higher",
				"It takes it turn right after my initiative and is under my complete control"
			]),
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"subclassfeature3.1" : {
			name : "Seeker's Eye",
			source : ["UA:R", 4],
			minlevel : 3,
			description :"\n   " + "When I call my spirit animal, I can chose a creature that I can see" + "\n   " + "Until the end of my next turn, all attacks against the target have advantage"
		}
	}
};

ClassSubList["ranger-stalker"] = {
	regExpSearch : /^(?=.*stalker)((?=.*(ranger|strider))|((?=.*(nature|natural))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
	subname : "Stalker",
	source : ["UA:R", 4],
	features : {
		"subclassfeature3" : {
			name : "Dire Wolf Spirit Companion",
			source : ["UA:R", 3],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can have my dire wolf spirit animal materialize or dismiss it",
				"It has all the stats of a dire wolf and adds my Wis mod to its attacks and saves",
				"Its HP is half my ranger level or the total in its stat block, whichever is higher",
				"It takes it turn right after my initiative and is under my complete control"
			]),
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"subclassfeature3.1" : {
			name : "Stalker's Fangs",
			source : ["UA:R", 4],
			minlevel : 3,
			description :"\n   " + "When I call my spirit animal, I can chose a creature that I can see" + "\n   " + "The target's next weapon attack hit deals 2d6 + Wis mod extra slashing damage"
		}
	}
};

SourceList["UA:R"] = {
	name : "2015/09/09 Unearthed Arcana: Ranger",
	abbreviation : "UA:R",
	group : "Wizards of the Coast",
	url : "https://media.wizards.com/2015/downloads/dnd/DX_0907_UA_RangerOptions.pdf"
};
