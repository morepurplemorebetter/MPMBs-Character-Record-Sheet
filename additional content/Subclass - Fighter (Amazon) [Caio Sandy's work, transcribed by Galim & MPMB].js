/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Fighter, called "Amazon" v1.4
				This is taken from the DMs Guild website (http://www.dmsguild.com/product/171865/)
				This subclass is made by Caio Sandy
	Code by:	Galim & MorePurpleMoreBetter
	Date:		2017-02-18 (sheet v12.83)

	Please support the creator of this content (Caio Sandy) and download his material from the DMs Guild website: http://www.dmsguild.com/browse.php?x=0&y=0&author=Caio%20Sandy
*/

ClassSubList["amazon"] = {
    regExpSearch : /amazon/i,
    subname : "Amazon",
	source : ["CS:A", 1],
    fullname : "Amazon",
    features : {
        "subclassfeature3" : {
            name : "Combat Superiority",
			source : ["CS:A", 1],
			minlevel : 3,
			description : "\n   " + "I gain a number of superiority dice that I can use to fuel special maneuvers" + "\n   " + "I regain all superiority dice after a short rest" + "\n   " + "I can use the following maneuvers after the roll, but before I know the result of the roll:" + "\n    - " + "Inner Sight: Add half die (round up) to Acrobatics, Athletics, Perception, or Stealth" + "\n    - " + "Penetrate: Add superiority die score to attack roll of bow, spear, javelin, or glaive" + "\n    - " + "Power Strike: Add superiority die score to damage of bow, spear, javelin, or glaive",
			additional : ["", "", "d8", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d10", "d10", "d10", "d10", "d10", "d10", "d10"],
			usages : [0, 0, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6],
			recovery : "short rest"
        },
        "subclassfeature7" : {
            name : "Amazon Skills",
            source : ["CS:A", 1],
            minlevel : 7,
            description : "\n   " + "Choose an Amazon Skill using the \"Choose Feature\" button above",
			choices : ["Fighting Style: Archery", "Fighting Style: Defense", "Fighting Style: Dueling", "Fighting Style: Great Weapon Fighting", "Fighting Style: Protection", "Fighting Style: Two-Weapon Fighting", "Fighting Style: Mariner", "Fighting Style: Close Quarters Shooting", "Fighting Style: Tunnel Fighter", "Elemental Arrow", "Escape the Horde", "Fend", "Strafe", "Uncanny Dodge"],
			"fighting style: archery" : {
				name : "Amazon Skill: Archery",
				description : "\n   " + "+2 bonus to attack rolls I make with ranged weapons",
				calcChanges : {
					atkCalc : ["if (isRangedWeapon) {output.extraHit += 2; }; ", "My ranged weapons get a +2 bonus on the To Hit."]
				}
			},
			"fighting style: defense" : {
				name : "Amazon Skill: Defense",
				source : ["P", 72],
				description : "\n   " + "+1 bonus to AC when I'm wearing armor",
				eval : "AddACMisc(1, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\", \"CurrentArmour.known && !ArmourList[CurrentArmour.known].type\")",
				removeeval : "AddACMisc(0, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\")"
			},
			"fighting style: dueling" : {
				name : "Amazon Skill: Dueling",
				source : ["P", 72],
				description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons",
				calcChanges : {
					atkCalc : ["var areOffHands = function(n){for(var i=1;i<=n;i++){if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) {return true; }; }; }(FieldNumbers.actions); if (!areOffHands && isMeleeWeapon && !(/\\b(2|two).?hand(ed)?s?\\b/i).test(theWea.description)) {output.extraDmg += 2; }; ", "When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."]
				}
			},
			"fighting style: great weapon fighting" : {
				name : "Amazon Skill: Great Weapon Fighting",
				source : ["P", 72],
				description : "\n   " + "Reroll 1 or 2 on damage if wielding two-handed/versatile melee weapon in both hands",
				calcChanges : {
					atkAdd : ["if (isMeleeWeapon && (/\\b(versatile|(2|two).?hand(ed)?s?)\\b/i).test(theWea.description)) {fields.Description += (fields.Description ? '; ' : '') + 'Re-roll 1 or 2 on damage die' + ((/versatile/i).test(fields.Description) ? ' when two-handed' : ''); }; ", "While wielding a two-handed or versatile melee weapon in two hands, I can re-roll a 1 or 2 on any damage die once."]
				}
			},
			"fighting style: protection" : {
				name : "Amazon Skill: Protection",
				source : ["P", 72],
				description : "\n   " + "As a reaction, I can give disadv. on an attack made vs. someone within 5 ft of me" + "\n   " + "I need to be wielding a shield and be able to see the attacker to do this",
				action : ["reaction", ""]
			},
			"fighting style: two-weapon fighting" : {
				name : "Amazon Skill: Two-Weapon Fighting",
				source : ["P", 72],
				description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks",
				calcChanges : {
					atkCalc : ["if (isOffHand) {output.modToDmg = true; }; ", "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks."]
				}
			},
			"fighting style: mariner" : {
				name : "Amazon Skill: Mariner",
				source : ["UA:WA", 3],
				description : "\n   " + "While not wearing heavy armor or using a shield, I gain +1 AC and swim/climb speed" + "\n   " + "The swimming and climbing speeds equal my current walking speed",
				eval : "AddACMisc(1, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\", \"ACshield || tDoc.getField('Heavy Armor').isBoxChecked(0)\")",
				removeeval : "AddACMisc(0, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\")"
			},
			"fighting style: close quarters shooting" : {
				name : "Amazon Skill: Close Quarters Shooting",
				source : ["UA:LDU", 1],
				description : "\n   " + "+1 bonus to attack rolls I make with ranged attacks" + "\n   " + "I don't have disadvantage when making a ranged attack while within 5 ft of a hostile" + "\n   " + "My ranged attacks ignore half and three-quarters cover against targets within 30 ft",
				calcChanges : {
					atkCalc : ["if (isRangedWeapon) {output.extraHit += 1; }; ", "My ranged weapons get a +1 bonus on the To Hit."]
				}
			},
			"fighting style: tunnel fighter" : {
				name : "Amazon Skill: Tunnel Fighter",
				source : ["UA:LDU", 1],
				description : "\n   " + "As a bonus action, I enter a defensive stance that lasts until the start of my next turn" + "\n   " + "While in the stance, I can make opportunity attacks without using my reaction" + "\n   " + "While I'm in this defensive stance I gain the following two benefits:" + "\n    - " + "I can make opportunity attacks without using my reaction" + "\n    - " + "I can make a melee attack as a reaction if a hostile moves >5 ft while in my reach",
				action : ["bonus action", ""]
			},
			"elemental arrow" : {
				name : "Amazon Skill: Elemental Arrow",
				source : ["CS:A", 1],
				description : "\n   " + "When I attack with a bow, I can expend one superiority die and add it to the damage" + "\n   " + "I can then replace the damage type for this attack with either cold, fire or lightning",
			},
			"escape the horde" : {
				name : "Amazon Skill: Escape the Horde",
				source : ["CS:A", 1],
				description : "\n   " + "Opportunity attacks made against me are made with disadvantage",
			},
			"fend" : {
				name : "Amazon Skill: Fend",
				source : ["CS:A", 1],
				description : "\n   " + "As an action, I can make an attack with my spear or glaive vs. all within my reach",
				action : ["action", ""],
			},
			"strafe" : {
				name : "Amazon Skill: Strafe",
				source : ["CS:A", 1],
				description : "\n   " + "As an action, I can make a ranged attack vs. all within range of my bow/javelin/spear" + "\n   " + "I can only do this while wearing no, light, or medium armor, and have the ammunition",
				action : ["action", ""],
			},
			"uncanny dodge" : {
				name : "Amazon Skill: Uncanny Dodge",
				source : ["CS:A", 1],
				description : "\n   " + "As a reaction when hit by an attacker that I can see, I can halve the attack's damage",
				action : ["reaction", ""],
			},
        },
        "subclassfeature15" : {
            name : "Additional Amazon Skills",
            source : ["CS:A", 1],
            minlevel : 15,
            description : "\n   " + "Choose an Additional Amazon Skill using the \"Choose Feature\" button above" + "\n   " + "This can only be a fighting style if the one selected at level 7 was not a fighting style",
			choices : ["Fighting Style: Archery", "Fighting Style: Defense", "Fighting Style: Dueling", "Fighting Style: Great Weapon Fighting", "Fighting Style: Protection", "Fighting Style: Two-Weapon Fighting", "Fighting Style: Mariner", "Fighting Style: Close Quarters Shooting", "Fighting Style: Tunnel Fighter", "Elemental Arrow", "Escape the Horde", "Fend", "Strafe", "Uncanny Dodge"],
			"fighting style: archery" : {
				name : "Additional Amazon Skill: Archery",
				description : "\n   " + "+2 bonus to attack rolls I make with ranged weapons",
				calcChanges : {
					atkCalc : ["if (isRangedWeapon) {output.extraHit += 2; }; ", "My ranged weapons get a +2 bonus on the To Hit."]
				}
			},
			"fighting style: defense" : {
				name : "Additional Amazon Skill: Defense",
				source : ["P", 72],
				description : "\n   " + "+1 bonus to AC when I'm wearing armor",
				eval : "AddACMisc(1, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\", \"CurrentArmour.known && !ArmourList[CurrentArmour.known].type\")",
				removeeval : "AddACMisc(0, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\")"
			},
			"fighting style: dueling" : {
				name : "Additional Amazon Skill: Dueling",
				source : ["P", 72],
				description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons",
				calcChanges : {
					atkCalc : ["var areOffHands = function(n){for(var i=1;i<=n;i++){if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) {return true; }; }; }(FieldNumbers.actions); if (!areOffHands && isMeleeWeapon && !(/\\b(2|two).?hand(ed)?s?\\b/i).test(theWea.description)) {output.extraDmg += 2; }; ", "When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."]
				}
			},
			"fighting style: great weapon fighting" : {
				name : "Additional Amazon Skill: Great Weapon Fighting",
				source : ["P", 72],
				description : "\n   " + "Reroll 1 or 2 on damage if wielding two-handed/versatile melee weapon in both hands",
				calcChanges : {
					atkAdd : ["if (isMeleeWeapon && (/\\b(versatile|(2|two).?hand(ed)?s?)\\b/i).test(theWea.description)) {fields.Description += (fields.Description ? '; ' : '') + 'Re-roll 1 or 2 on damage die' + ((/versatile/i).test(fields.Description) ? ' when two-handed' : ''); }; ", "While wielding a two-handed or versatile melee weapon in two hands, I can re-roll a 1 or 2 on any damage die once."]
				}
			},
			"fighting style: protection" : {
				name : "Additional Amazon Skill: Protection",
				source : ["P", 72],
				description : "\n   " + "As a reaction, I can give disadv. on an attack made vs. someone within 5 ft of me" + "\n   " + "I need to be wielding a shield and be able to see the attacker to do this",
				action : ["reaction", ""]
			},
			"fighting style: two-weapon fighting" : {
				name : "Additional Amazon Skill: Two-Weapon Fighting",
				source : ["P", 72],
				description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks",
				calcChanges : {
					atkCalc : ["if (isOffHand) {output.modToDmg = true; }; ", "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks."]
				}
			},
			"fighting style: mariner" : {
				name : "Additional Amazon Skill: Mariner",
				source : ["UA:WA", 3],
				description : "\n   " + "While not wearing heavy armor or using a shield, I gain +1 AC and swim/climb speed" + "\n   " + "The swimming and climbing speeds equal my current walking speed",
				eval : "AddACMisc(1, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\", \"ACshield || tDoc.getField('Heavy Armor').isBoxChecked(0)\")",
				removeeval : "AddACMisc(0, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\")"
			},
			"fighting style: close quarters shooting" : {
				name : "Additional Amazon Skill: Close Quarters Shooting",
				source : ["UA:LDU", 1],
				description : "\n   " + "+1 bonus to attack rolls I make with ranged attacks" + "\n   " + "I don't have disadvantage when making a ranged attack while within 5 ft of a hostile" + "\n   " + "My ranged attacks ignore half and three-quarters cover against targets within 30 ft",
				calcChanges : {
					atkCalc : ["if (isRangedWeapon) {output.extraHit += 1; }; ", "My ranged weapons get a +1 bonus on the To Hit."]
				}
			},
			"fighting style: tunnel fighter" : {
				name : "Additional Amazon Skill: Tunnel Fighter",
				source : ["UA:LDU", 1],
				description : "\n   " + "As a bonus action, I enter a defensive stance that lasts until the start of my next turn" + "\n   " + "While in the stance, I can make opportunity attacks without using my reaction" + "\n   " + "While I'm in this defensive stance I gain the following two benefits:" + "\n    - " + "I can make opportunity attacks without using my reaction" + "\n    - " + "I can make a melee attack as a reaction if a hostile moves >5 ft while in my reach",
				action : ["bonus action", ""]
			},
			"elemental arrow" : {
				name : "Additional Amazon Skill: Elemental Arrow",
				source : ["CS:A", 1],
				description : "\n   " + "When I attack with a bow, I can expend one superiority die and add it to the damage" + "\n   " + "I can then replace the damage type for this attack with either cold, fire or lightning",
			},
			"escape the horde" : {
				name : "Additional Amazon Skill: Escape the Horde",
				source : ["CS:A", 1],
				description : "\n   " + "Opportunity attacks made against me are made with disadvantage",
			},
			"fend" : {
				name : "Additional Amazon Skill: Fend",
				source : ["CS:A", 1],
				description : "\n   " + "As an action, I can make an attack with my spear or glaive vs. all within my reach",
				action : ["action", ""],
			},
			"strafe" : {
				name : "Additional Amazon Skill: Strafe",
				source : ["CS:A", 1],
				description : "\n   " + "As an action, I can make a ranged attack vs. all within range of my bow/javelin/spear" + "\n   " + "I can only do this while wearing no, light, or medium armor, and have the ammunition",
				action : ["action", ""],
			},
			"uncanny dodge" : {
				name : "Additional Amazon Skill: Uncanny Dodge",
				source : ["CS:A", 1],
				description : "\n   " + "As a reaction when hit by an attacker that I can see, I can halve the attack's damage",
				action : ["reaction", ""],
			},
        },
        "subclassfeature15.1" : {
            name : "Relentless",
            source : ["CS:A", 1],
            minlevel : 15,
            description : "\n   " + "I regain one superiority die if I have no more remaining when I roll initiative", //changed to be the same as the battle master
        },
        "subclassfeature18" : {
            name : "Improved Critical",
            source : ["CS:A", 1],
            minlevel : 18,
            description : "\n   " + "I score a critical hit with my weapon attacks on a roll of 19 and 20",
        },
    },
};
ClassList.fighter.subclasses[1].push("amazon");

SourceList["CS:A"] = {
	name : "Caio Sandy: Fighter archetype: Amazon",
	abbreviation : "CS:A",
	group : "Dungeon Masters Guild",
	url : "http://www.dmsguild.com/product/171865/"
};
SourceList["UA:WA"] = {
	name : "Unearthed Arcana: Waterborne Adventures", //2015-05-04
	abbreviation : "UA:WA",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2015/downloads/dnd/UA_Waterborne_v3.pdf"
};
SourceList["UA:LDU"] = {
	name : "Unearthed Arcana: Light, Dark, Underdark!", //2015-11-02
	abbreviation : "UA:LDU",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2015/downloads/dnd/02_UA_Underdark_Characters.pdf"
};