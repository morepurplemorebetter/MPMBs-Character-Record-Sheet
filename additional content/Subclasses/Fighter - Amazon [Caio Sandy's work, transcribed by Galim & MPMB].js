/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Fighter, called "Amazon" v1.4
				This is taken from the DMs Guild website (https://www.dmsguild.com/product/171865/)
				This subclass is made by Caio Sandy
	Code by:	Galim & MorePurpleMoreBetter
	Date:		2017-11-29 (sheet v12.999)

	Please support the creator of this content (Caio Sandy) and download his material from the DMs Guild website: https://www.dmsguild.com/browse.php?x=0&y=0&author=Caio%20Sandy
*/

var iFileName = "Fighter - Amazon [Caio Sandy's work, transcribed by Galim & MPMB].js";
RequiredSheetVersion(12.999);

SourceList["CS:A"] = {
	name : "Caio Sandy: Fighter archetype: Amazon",
	abbreviation : "CS:A",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/171865/",
	date : "2016/03/11"
};

AddSubClass("fighter", "amazon", {
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
			"fighting style: archery" : FightingStyles.archery,
			"fighting style: defense" : FightingStyles.defense,
			"fighting style: dueling" : FightingStyles.dueling,
			"fighting style: great weapon fighting" : FightingStyles.great_weapon,
			"fighting style: protection" : FightingStyles.protection,
			"fighting style: two-weapon fighting" : FightingStyles.two_weapon,
			"fighting style: mariner" : {
				name : "Amazon Skill: Mariner",
				source : ["UA:WA", 3],
				description : "\n   " + "While not wearing heavy armor or using a shield, I gain +1 AC and swim/climb speed" + "\n   " + "The swimming and climbing speeds are equal to my current walking speed",
				speed : {
					climb : { spd : "walk", enc : "walk" },
					swim : { spd : "walk", enc : "walk" }
				},
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
				description : "\n   " + "When I attack with a bow, I can expend one superiority die and add it to the damage" + "\n   " + "I can then replace the damage type for this attack with either cold, fire or lightning"
			},
			"escape the horde" : {
				name : "Amazon Skill: Escape the Horde",
				source : ["CS:A", 1],
				description : "\n   " + "Opportunity attacks made against me are made with disadvantage"
			},
			"fend" : {
				name : "Amazon Skill: Fend",
				source : ["CS:A", 1],
				description : "\n   " + "As an action, I can make an attack with my spear or glaive vs. all within my reach",
				action : ["action", ""]
			},
			"strafe" : {
				name : "Amazon Skill: Strafe",
				source : ["CS:A", 1],
				description : "\n   " + "As an action, I can make a ranged attack vs. all within range of my bow/javelin/spear" + "\n   " + "I can only do this while wearing no, light, or medium armor, and have the ammunition",
				action : ["action", ""]
			},
			"uncanny dodge" : {
				name : "Amazon Skill: Uncanny Dodge",
				source : ["CS:A", 1],
				description : "\n   " + "As a reaction when hit by an attacker that I can see, I can halve the attack's damage",
				action : ["reaction", ""]
			},
        },
        "subclassfeature15" : {
            name : "Additional Amazon Skills",
            source : ["CS:A", 1],
            minlevel : 15,
            description : "\n   " + "Choose an Additional Amazon Skill using the \"Choose Feature\" button above" + "\n   " + "This can only be a fighting style if the one selected at level 7 was not a fighting style",
			choices : ["Fighting Style: Archery", "Fighting Style: Defense", "Fighting Style: Dueling", "Fighting Style: Great Weapon Fighting", "Fighting Style: Protection", "Fighting Style: Two-Weapon Fighting", "Fighting Style: Mariner", "Fighting Style: Close Quarters Shooting", "Fighting Style: Tunnel Fighter", "Elemental Arrow", "Escape the Horde", "Fend", "Strafe", "Uncanny Dodge"],
			"fighting style: archery" : FightingStyles.archery,
			"fighting style: defense" : FightingStyles.defense,
			"fighting style: dueling" : FightingStyles.dueling,
			"fighting style: great weapon fighting" : FightingStyles.great_weapon,
			"fighting style: protection" : FightingStyles.protection,
			"fighting style: two-weapon fighting" : FightingStyles.two_weapon,
			"fighting style: mariner" : {
				name : "Additional Amazon Skill: Mariner",
				source : ["UA:WA", 3],
				description : "\n   " + "While not wearing heavy armor or using a shield, I gain +1 AC and swim/climb speed" + "\n   " + "The swimming and climbing speeds are equal to my current walking speed",
				speed : {
					climb : { spd : "walk", enc : "walk" },
					swim : { spd : "walk", enc : "walk" }
				},
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
				description : "\n   " + "When I attack with a bow, I can expend one superiority die and add it to the damage" + "\n   " + "I can then replace the damage type for this attack with either cold, fire or lightning"
			},
			"escape the horde" : {
				name : "Additional Amazon Skill: Escape the Horde",
				source : ["CS:A", 1],
				description : "\n   " + "Opportunity attacks made against me are made with disadvantage"
			},
			"fend" : {
				name : "Additional Amazon Skill: Fend",
				source : ["CS:A", 1],
				description : "\n   " + "As an action, I can make an attack with my spear or glaive vs. all within my reach",
				action : ["action", ""]
			},
			"strafe" : {
				name : "Additional Amazon Skill: Strafe",
				source : ["CS:A", 1],
				description : "\n   " + "As an action, I can make a ranged attack vs. all within range of my bow/javelin/spear" + "\n   " + "I can only do this while wearing no, light, or medium armor, and have the ammunition",
				action : ["action", ""]
			},
			"uncanny dodge" : {
				name : "Additional Amazon Skill: Uncanny Dodge",
				source : ["CS:A", 1],
				description : "\n   " + "As a reaction when hit by an attacker that I can see, I can halve the attack's damage",
				action : ["reaction", ""]
			},
        },
        "subclassfeature15.1" : {
            name : "Relentless",
            source : ["CS:A", 1],
            minlevel : 15,
            description : "\n   " + "I regain one superiority die if I have no more remaining when I roll initiative" //changed to be the same as the battle master
        },
        "subclassfeature18" : {
            name : "Improved Critical",
            source : ["CS:A", 1],
            minlevel : 18,
            description : "\n   " + "I score a critical hit with my weapon attacks on a roll of 19 and 20"
        }
    }
});

if (!SourceList["UA:WA"]) {
	SourceList["UA:WA"] = {
		name : "Unearthed Arcana: Waterborne Adventures",
		abbreviation : "UA:WA",
		group : "Unearthed Arcana",
		url : "https://media.wizards.com/2015/downloads/dnd/UA_Waterborne_v3.pdf",
		date : "2015/05/04"
	};
};
if (!SourceList["UA:LDU"]) {
	SourceList["UA:LDU"] = {
		name : "Unearthed Arcana: Light, Dark, Underdark!",
		abbreviation : "UA:LDU",
		group : "Unearthed Arcana",
		url : "https://media.wizards.com/2015/downloads/dnd/02_UA_Underdark_Characters.pdf",
		date : "2015/11/02"
	};
};
