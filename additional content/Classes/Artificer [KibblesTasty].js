/*  -WHAT IS THIS?-
    This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
    Import this file using the "Add Extra Materials" bookmark.

    -KEEP IN MIND-
    It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
    Subject:    Class
    Effect:     This script adds a class called the "Artificer" and its 5 subclasses.

                This class has been made by /u/KibblesTasty on the subbreddit /UnearthedArcana
                It can be found here: https://old.reddit.com/r/UnearthedArcana/comments/8ytiiz/5e_revised_artificer_v15_cannonsmith_thunder/
                This code is based on v1.5.1 of /u/KibblesTasty's work (2018-07-14)

                This script was based upon MPMB's script for the Witch.

    Code by:    Apocalypsa, LividLindy, Banner318
    Date:       2018-09-19 (sheet v12.999)
*/

var iFileName = "Artificer [KibblesTasty].js";
RequiredSheetVersion(12.999);

SourceList["KT:AR"] = {
    name : "KibblesTasty: Artificer (v1.6.2)",
    abbreviation : "KT:AR",
    group : "KibblesTasty",
    url : "https://www.gmbinder.com/share/-LAEn6ZdC6lYUKhQ67Qk",
    date : "2018/07/14"
};

//first make the sheet know which spells are artificer spells
[
    // 1st level
    "alarm", "arcane ablation", "arcane weapon", "bond item", "catapult", "comprehend languages", "cure wounds", "detect magic", "disguise self", "expeditious retreat", "fall", "false life", "feather fall", "grease", "identify", "illusory script", "jump", "longstrider", "sanctuary", "snare", "unburden", "unseen servant", "tenser's floating disk",

    // 2nd level
    "aid", "alter self", "arcane lock", "blur", "cloud of daggers", "darkvision", "earthbind", "enhance ability", "enlarge/reduce", "find traps", "heat metal", "hold person", "knock", "imbue luck", "invisibility", "locate object", "magic weapon", "magic mouth", "protection from poison", "see invisibility", "spider climb", "thunderburst mine",

    // 3rd level
    "dispel magic", "dispel construct", "elemental weapon", "feign death", "flame arrows", "fireburst mine", "gaseous form", "glyph of warding", "life transference", "lightning arrow", "magic circle", "nondetection", "protection from energy", "sending", "tiny servant", "wall of sand", "water breathing", "water walk", "wind wall",

    // 4th level
    "arcane eye", "death ward", "fabricate", "fire shield", "freedom of movement", "greater invisibility", "leomund's secret chest", "otiluke's resilient sphere", "repair", "stone shape", "stoneskin", "sickening radiance",

    // 5th level
    "animate objects", "creation", "hold monster", "legend lore", "mislead", "passwall", "skill empowerment", "telekinesis", "teleportation circle", "transmute rock", "vorpal weapon", "wall of stone"
].forEach( function (n) {
    if(SpellsList[n] && SpellsList[n].classes.indexOf("artificer") === -1) SpellsList[n].classes.push("artificer");
});

ClassList["artificer"] = {
    regExpSearch : /artificer/i,
    name : "Artificer",
	source : ["KT:AR", 1],
    primaryAbility : "\n \u2022 Artificer: Intelligence;",
    abilitySave : 4,
    prereqs : "\n \u2022 Artificer: Intelligence 13;",
    improvements :  levels.map( function(n) {
        return n < 4 ? 0 : n < 8 ? 1 : n < 12 ? 2 : n < 16 ? 3 : n < 19 ? 4 : 5;
    }),
    die : 8,
    saves : ["Con", "Int"],
    skills : ["\n\n" + toUni("Artificer") + ": Choose three from Arcana, Deception, History, Investigation, Medicine, Nature, Religion, and Sleight of Hand."],
    toolProfs : { primary : ["Thieves' Tools"] },
    armor : [
        [true, true, false, false],
        [true, true, false, false]
    ],
    weapons : [
        [true, false]
    ],
    equipment : "Artificer starting equipment:\n \u2022 A handaxe and a light hammer -or- any two simple weapons;\n \u2022 Scale mail -or- leather armor;\n \u2022 Thieves' tools and a dungeoneer's pack.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
    subclasses : ["Artificer Specialization", ["artificer-cannonsmith", "artificer-fleshsmith", "artificer-gadgetsmith", "artificer-golemsmith", "artificer-infusionsmith", "artificer-mindsmith", "artificer-potionsmith", "artificer-runesmith", "artificer-warsmith", "artificer-wandsmith"]],
    attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    spellcastingFactor : 2,
    spellcastingKnown : {
        spells : "list",
        spells : [0,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12]
    },
    features : {
        "magic item analysis" : {
            name : "Magic Item Analysis",
			source : ["KT:AR", 3],
            minlevel : 1,
            description : desc([
                "I know the artificer spells detect magic and identify, and I can cast them as rituals."
            ]),
            spellcastingBonus : {
                name : "Magic Item Analysis",
                spells : ["detect magic", "identify"],
                selection : ["detect magic", "identify"],
                times : 2
            }
        },
        "spellcasting" : {
            name : "Spellcasting",
			source : ["KT:AR", 3],
            minlevel : 2,
            description : desc([
                "I can cast prepared artificer spells, using Intelligence as my spellcasting ability.",
                "I can use an arcane focus as a spellcasting focus."
            ])
        },        
        "tool expertise" : {
            name : "Tool Expertise",
			source : ["KT:AR", 3],
            minlevel : 2,
            description : desc([
                "My proficiency bonus is doubled for any ability check I make that uses any of the tool proficiencies I gain from this class."
            ])
        },
        "arcane reconstruction" : {
            name : "Arcane Reconstruction",
			source : ["KT:AR", 4],
            minlevel : 6,
            description : desc([
                "I have mastered the knowledge of using magic to repair things. I learn the Mending cantrip, and can cast it at will. Additionally, I learn the Cure Wounds spell. If I already know Cure Wounds I can select another spell from the Artificer list. When I cast Cure Wounds, it can heal constructs in addition to normally valid targets. Both Mending and Cure Wounds learned through this features are considered Artificer spells for me."
            ]),
            spellcastingBonus : {
                name : "Arcane Reconstruction",
                spells : ["mending", "cure wounds"],
                selection : ["mending", "cure wounds"],
                times : 2
            }
        },
        "superior attunement" : {
            name : "Superior Attunement",
			source : ["KT:AR", 4],
            minlevel : 6,
            description : desc([
                "My superior understanding of magic items allows me to master their use. I can now attune to up to four, rather than three, magic items at a time."
            ])
        },
        "wondrous items proficiency" : {
            name : "Familiar Spirit",
			source : ["KT:AR", 4],
            minlevel : 7,
            description : desc([
                "My familiarity with the workings of magical items means that I can ignore class based restrictions on attuning to magical items."
            ])
        },
        "improved magical crafting" : {
            name : "Improved Magical Crafting",
			source : ["KT:AR", 4],
            minlevel : 10,
            description : desc([
                "My experience in creating my own wondrous invention makes me more adept at crafting a magic item than a normal spellcaster. Creating a magic item takes me half the time it would normally take.",
                "Additionally, I can make 1 hour of progress toward crafting a magic item, scroll, or potion during a long rest."
            ])
        },
        "wondrous item recharge" : {
            name : "Wondrous Item Recharge",
			source : ["KT:AR", 4],
            minlevel : 10,
            description : desc([
                "I can recharge a magic item that has has charges, as long as those charges can only be used to cast spells. To restore charges, I perform a ritual that takes one minute and expends a spell slot of equal or higher level then a spell slot level of a spell cast by the item. The number of charges restored to the item is equal to the number of charges required to cast that spell using the item once."
            ])
        },
        "study of magic" : {
            name : "Study of Magic",
			source : ["KT:AR", 4],
            minlevel : 11,
            description : desc([
                "My proficiency in the workings of magic has become so great I can cast detect magic and identify at will. Additionally, I have advantage on all Intelligence (Arcana) checks to understand the workings of magical traps, effects, or runes."
            ])
        },
        "wondrous item mastery" : {
            name : "Wondrous Item Mastery",
			source : ["KT:AR", 4],
            minlevel : 18,
            description : desc([
                "I can activate a magic item that would normally take an action as a bonus action instead."
            ])
        },
        "soul of artifice" : {
            name : "Soul of Artifice",
			source : ["KT:AR", 4],
            minlevel : 20,
            description : desc([
                "My understanding of magic items is unmatched, allowing me to mingle my soul with items linked to me. I can now attune to five, rather than four, magic items at a time. In addition, I gain a +1 bonus to all saving throws per magic item I am currently attuned to."
            ])
        },
    }
};

ClassSubList["artificer-cannonsmith"] = {
    regExpSearch : /cannonsmith/i,
    subname : "Cannonsmith",
	source : ["KT:AR", 5],
    features : {
        "cannonsmith's_proficiency" : {
            name : "Cannonsmith's Proficiency",
            minlevel : 1,
            description : desc([
                "I gain proficiency with tinker's tools and smith's tools.",
                "I can create up to 50 rounds of ammunition during a long rest. Material cost: 1gp per 10 rounds"
            ]),
            toolProfs : [["Smith's Tools", "Dex"], ["Tinker's Tools", "Dex"]]
        },
        "thunder_cannon" : {
            name : "Thunder Cannon",
			source : ["KT:AR", 5],
            minlevel : 1,
            description : desc([
                "At 1st level, I forge a deadly firearm using a combination of arcane magic and my knowledge of engineering and metallurgy. This firearm is called a Thunder Cannon.",
                "I am proficient with the Thunder Cannon. The firearm is a two-handed ranged weapon that deals 2d6 piercing damage. Its normal range is 60 feet, and its maximum range is 180 feet.",
                "Once fired, it must be reloaded as a bonus action."
            ]),
            eval : "AddWeapon('Thunder Cannon');",
            removeeval : "RemoveWeapon('Thunder Cannon');",
            additional : ["", "", "1 upgrade", "1 upgrade", "2 upgrades", "2 upgrades", "3 upgrades", "3 upgrades", "4 upgrades", "4 upgrades", "5 upgrades", "5 upgrades", "6 upgrades", "6 upgrades", "7 upgrades", "7 upgrades", "8 upgrades", "8 upgrades", "9 upgrades", "9 upgrades"],
            extraname : "Cannonsmith Upgrades",
            extrachoices : ["Autoloading Magazine (prereq: Integrated Magazine)", "Blast Shells (prereq: level 15 Artificer)", "Cannon Improvement (prereq: level 5 Artificer)", "Divination Scope (prereq: level 5 Artificer)", "Echoing Boom (prereq: Incompatible with Silencer)", "Extended Barrel", "Harpoon Reel (prereq: level 5 Artificer)", "Integrated Magazine", "Lightning Burst", "Lightning Charged Bayonet", "Overchannel Capacitor (prereq: level 5 Artificer)", "Silencer (prereq: Incompatible with Echoing Booms)", "Snap Fire (prereq: level 9 Artificer)", "Shock Absorber", "Shock Harpoon (prereq: level 9 Artificer, Harpoon Reel)", "Storm Blast (prereq: level 5 Artificer)", "Synaptic Feedback (prereq: level 9 Artificer)", "Turret Deployment (prereq: level 9 Artificer)"],
            "autoloading magazine (prereq: integrated magazine)" : {
                name : "Autoloading Magazine",
                description : desc([
                    "Your Thunder Cannon now automatically chambers the next round, no longer requiring your bonus action to reload."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "blast shells (prereq: level 15 artificer)" : {
                name : "Blast Shells",
                description : desc([
                    "I can choose to fire a blast shell when firing my Thunder Cannon. When firing a Blast Shell, I pick a target area within normal range of my Thunder Cannon. ",
                    "I make an attack roll as normal, and apply that attack roll to all targets within a 5 foot radius of my target point.",
                    "The first target (my choice if multiple creatures are hit) takes damage from Thundermonger. Targets after the first take bonus damage equal to half of the bonus damage dealt by Thundermonger in addition to the weapon attack damage."
                ]),
                prereqeval : "classes.known.artificer.level >= 15"
            },
            "cannon improvement (prereq: level 5 artificer)" : {
                name : "Cannon Improvement",
                description : desc([
                    "I fine tune my Thunder Cannon's firing mechanism. The Thunder Cannon gains a +1 bonus to Attack and Damage Rolls made with it.",
                    "After the first time I take this upgrade, the piercing damage dealt by my Thunder Cannon is considered magical.",
                    "I can apply this upgrade up to 3 times."
                ]),
                prereqeval : "classes.known.artificer.level >= 5"
            },
            "divination scope (prereq: level 5 artificer)" : {
                name : "Divination Scope",
                description : desc([
                    "I add a scope to my Thunder Cannon and enchant the lenses with Divination magic.",
                    "The Scope has 3 Charges. As a bonus action I can use 1 charge to cast Hunter's Mark. As an action I can use 2 charges to cast See Invisibility or 3 charges to cast Clairvoyance.",
                    "The scope regains all charges after a long rest."
                ]),
                prereqeval : "classes.known.artificer.level >= 5"
            },
            "echoing boom (prereq: incompatible with silencer)" : {
                name : "Echoing Boom",
                description : desc([
                    "I pack extra power into my Thundermonger, increasing the damage it deals by 1d6."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "extended barrel" : {
                name : "Extended Barrel",
                description : desc([
                    "I extend the length of my Thunder Cannon’s barrel and add rifling. The normal weapon range of my Thunder Cannon increases by 30 feet, and the maximum range by 90 feet.",
                    "After applying this twice, if my have the Lightning Charged Bayonet upgrade, the Bayonet gains the Reach property.",
                    "I can apply this upgrade up to 2 times."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "harpoon reel (prereq: level 5 artificer)" : {
                name : "Harpoon Reel",
                description : desc([
                    "I install a secondary firemode that launches a Harpoon attached to a tightly coiled cord. This attack has a normal range of 30 feet and an maximum range of 60 feet, and it deals only 1d6 piecing damage.",
                    "A creature struck by this attack is impaled by the Harpoon unless it removes the Harpoon as an action. Removing the Harpoon requires a DC 14 Strength check. While the Harpoon is stuck in the target, I am connected to the target by an 60 ft cord.",
                    "While connected in this manner, I can use my bonus action to activate the Reel action, pulling myself to the location of the target if the target is Medium or larger. A Small or smaller creature is pulled back to me. Alternatively, I can opt to disconnect the cord.",
                    "This attack can target a surface, object, or creature. This attack cannot be used again until the Reel action is taken."
                ]),
				action : ["bonus action", "Reel"],
                prereqeval : "classes.known.artificer.level >= 5"
            },
            "integrated magazine" : {
                name : "Integrated Magazine",
                description : desc([
                    "My Thunder Cannon holds 2 rounds at a time, allowing me to attack twice before a bonus action reload is required."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "lightning burst" : {
                name : "Lightning Burst",
                description : desc([
                    "I upgrade my Thunder Cannon to discharge its power in within a 5-feet wide and 60-feet long line. As an action, I can make a special attack.",
                    "Each creature must make a Dexterity saving throw or take damage equal to the bonus damage of Thundermonger as lightning damage on a failed save, half as much on a successful save.",
                    "Using this shot counts as applying Thundermonger damage for the turn. Firing in this method does not consume ammo."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "lightning charged bayonet" : {
                name : "Lightning Charged Bayonet",
                description : desc([
                    "I affix a short blade to the barrel of my Thunder Cannon, allowing me to make a melee weapon attack with it. The blade is a finesse weapon melee weapon that I am proficient with, and deals 1d6 Piercing damage.",
                    "When Thundermonger bonus damage is dealt with a bayonet attack, the damage type is lightning. Dealing damage this way counts as applying Thundermonger damage for the turn.",
                    "The blade can be used to apply Thundermonger bonus damage."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "overchannel capacitor (prereq: level 5 artificer)" : {
                name : "Overchannel Capacitor",
                description : desc([
                    "I gain the ability to channel my magical power into the Thunder Cannon to overload its damage.",
                    "I can expend a spell slot to increase the damage dealt by Thundermonger by 1d8 per spell level spent."
                ]),
                prereqeval : "classes.known.artificer.level >= 5"
            },
            "silencer (prereq: incompatible with echoing booms)" : {
                name : "Silencer",
                description : desc([
                    "I upgrade my Thunder Cannon with a sound dampening module.",
                    "My Thunder Cannon loses the Loud property."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "snap fire (prereq: level 9 artificer)" : {
                name : "Snap Fire",
                description : desc([
                    "I can use my reaction to take an opportunity attack with my Thunder Cannon if an enemy comes within 10 ft of me. I have disadvantage on this attack.",
                    "This attack only deals Thundermonger bonus damage if I have not dealt the bonus damage since the start of my last turn."
                ]),
                prereqeval : "classes.known.artificer.level >= 9"
            },
            "shock absorber" : {
                name : "Shock Absorber",
                description : desc([
                    "As a reaction to taking Lightning or Thunder Damage, I can cast Absorb Elements without consuming a spell slot.",
                    "When absorbed in this method, I can apply the bonus damage granted by Absorb Elements to my next Thunder Cannon attack even if I make a ranged attack."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "shock harpoon (prereq: level 9 artificer, harpoon reel)" : {
                name : "Shock Harpoon",
                description : desc([
                    "After hitting a creature with the Harpoon fire mode, you can use a bonus action to deliver a shock. If you have not used it since the start of your turn, you can apply Thundermonger damage as lightning damage.",
                    "Additionally, the target must make a Constitution saving throw against your spell save DC or be stunned until the end of its next turn.","Once used, the Harpoon must be reeled in before this can be used again."
                ]),
                prereqeval : "classes.known.artificer.level >= 9"
            },
            "storm blast (prereq: level 5 artificer)" : {
                name : "Storm Blast",
                description : desc([
                    "You upgrade your Thunder Cannon to discharge its power in 30-foot cone from the gun. As an action, you can make a special attack.",
                    "Each creature must make a Strength saving throw, or take half the bonus damage of Thundermonger and be knocked prone. Using this shot counts as applying Thundermonger damage for the turn.",
                    "Firing in this way does not consume ammo."
                ]),
                prereqeval : "classes.known.artificer.level >= 5"
            },
            "synaptic feedback (prereq: level 9 artificer)" : {
                name : "Synaptic Feedback",
                description : desc([
                    "You install feedback loop into your cannon, allowing you to siphon some energy from your Thunder Cannon to empower your reflexes",
                    "Whenever you deal lightning damage with your Thunder Cannon your walking speed increases by 10ft and you can take the Dash or Disengage actions as a bonus action.",
                    "This boost lasts until the start of your next turn."
                ]),
                prereqeval : "classes.known.artificer.level >= 9"
            },
            "turret deployment (prereq: level 9 artificer)" : {
                name : "Turret Deployment",
                description : desc([
                    "As an action, you deploy your Thunder Cannon in a spot adjacent to you, and subsequently can attack with it as long as you are within 100 feet of it and you can see the target you are attacking.",
                    "It still has its normal range from the point it is attacking. A creature adjacent to it in this mode can use an action to render it nonfunctional as a turret."
                ]),
                prereqeval : "classes.known.artificer.level >= 9"
            }
        },
        "thunder_monger" : {
            name : "Thunder Monger",
            minlevel : 3,
            description : desc([
                "Once per turn, I can deal an extra 1d6 thunder damage to one creature I hit with an Attack using Thunder Cannon. After discharging this bonus damage, I cannot deal this bonus damage again until the start of my next turn.",
                "This extra damage increases by 1d6 when I reach certain levels in this class: 5th level (2d6), 7th level (3d6), 9th level (4d6), 11th level (5d6), 13th level (6d6), 15th level (7d6), 17th level (8d6), and 19th level (9d6)."
            ])
        },
        "devastating_blasts" : {
            name : "Devastating Blasts",
            minlevel : 5,
            description : desc([
                "Beginning at 5th level, when I miss an attack with my Thunder Cannon, I can still choose to apply my Thundermonger damage, but it deals only half the bonus damage"
            ])
        },
        "elemental_swapping" : {
            name : "Elemental Swapping",
            minlevel : 14,
            description : desc([
                "When I take the attack action with my Thunder Cannon I can adjust the firing chamber, causing any bonus damage granted by Thundermonger to deal Fire, Cold, Acid, or Lightning damage instead of Thunder damage.",
                "Alternatively, I can consume a Vial of Holy Water to cause my next Thundermonger bonus damage to deal Radiant Damage."
            ])
        }
    }
};


ClassSubList["artificer-fleshsmith"] = {
    regExpSearch : /fleshsmith/i,
    subname : "Fleshsmith",
	   features : {
		"fleshsmith's_proficiency" : {
			name : "Fleshsmith's Proficiency",
			minlevel : 1,
			description : desc(["I gain proficiency in the Medicine skill, as well as proficiency with the Leatherworker's tools."]),
			toolProfs : [["Leatherworker's Tools", "Dex"]],
			skillstxt : "\n\n" + toUni("Fleshsmith's Proficiency") + ": Medicine proficiency as well as proficient with Leatherworker's tools.",
				skills : ["Medicine"]},
		"principle_improvement" : {
			name : "Principle Improvement",
			minlevel : 1,
			description : desc(["At first level, I pick my principle improvement, use the \"Choose Features\" button above and choose one to gain that benefit."]),
			extraname : "Principle Improvement",
			extrachoices : ["Extra Arm", "Expanded Mind", "Extra Fangs", "Extra Tentacle"],
				"extra arm" : {
					source : ["KT:AR"],
					name : "Extra Arm",					
					recovery : "long rest",
					action : ["bonus action", " (with Attack action)"],
					 eval : "AddWeapon('Extra Arm');",
            			removeeval : "RemoveWeapon('Extra Arm');",
					usages : "Int mod per ",
					usagescalc : "event.value = Math.max(1, What('Int Mod'));",	
					description : "\n   " + "I build myself an additional arm and attach it to myself. I can make a single additional weapon attack with this arm as a bonus action. I can do this a number of times equal to my Int modifier, regaining all uses on a long rest."},
				"expanded mind" : {
					source : ["KT:AR"],
					name : "Expanded Mind",
					recovery : "long rest",
					action : ["action", ""],
					usages : "Int mod per ",
					usagescalc : "event.value = Math.max(1, What('Int Mod'));",
					description : "\n   " + "I expanded my mind. Literally. My head is a little lopsided, but I can think in parallel. I can cast a spell with the cast time of one action as a bonus action. I can do this a number of times equal to my Int modifier, regaining all uses on a long rest."},
				"extra fangs" : {
					source : ["KT:AR"],
					name : "Extra Fangs",
					recovery : "long rest",
					action : ["bonus action", ""],
					 eval : "AddWeapon('Extra Fangs');",
           				removeeval : "RemoveWeapon('Extra Fangs');",
					usages : "Int mod per ",
					usagescalc : "event.value = Math.max(1, What('Int Mod'));",	
					description : "\n   " + "I remove and replace some teeth with some improved models, based on observations of superior predators to lift my position on the food chain. My teeth become natural weapons that deal 1d6 piercing damage, and I can make a single bite attack as a bonus action. I can do this a number of times equal to my Int modifier, regaining all uses on a long rest.",
					eval : "AddWeapon('Extra Fangs');",
					removeeval : "RemoveWeapon('Extra Fangs');"},
				"extra tentacle" : {
					source : ["KT:AR"],
					name : "Extra Tentacle",
					recovery : "long rest",
					action : ["bonus action", ""],
					 eval : "AddWeapon('Extra Tentacle');",
           				removeeval : "RemoveWeapon('Extra Tentacle');",
					usages : "Int mod per ",
					usagescalc : "event.value = Math.max(1, What('Int Mod'));",	
					description : "\n   " + "I decided I could use a bit more reach, and crafted myself a tentacle. Using this tentacle, I can make a Strength (Athletic) - including a grapple - check or additional object interaction as a bonus action; alternatively I can attack with this tentacle as a natural weapon as a bonus action. I can do this a number of times equal to my Int modifier, regaining all uses on a long rest. It deals 1d4 bludgeoning damage and has reach.",
					eval : "AddWeapon('Extra Tentacle');",
					removeeval : "RemoveWeapon('Extra Tentacle');"},
		},
		"adorable_critter" : {
			name : "Adorable Critter",
			minlevel : 3,
			description : desc(["   At 3rd level, you experiment on creating an adorable critter. You create - or modify - a CR 0 tiny creature. This creature serves as a familiar as per the find familiar spell, and you can resuscitate it (or rebuild it, as necessary) at the end of a long rest should anything untowardly happen to it."]),			
		},
		"extra_attack" : {
            name : "Extra Attack",
            minlevel : 5,
            description : desc([
                "I can attack twice, instead of once, whenever I take the Attack action on my turn."
            ]),
            eval : "ClassList['artificer'].attacks = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]",
            removeeval : "ClassList['artificer'].attacks = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]"
        },
		"second_improvement" : {
			name : "Second Improvement",
			minlevel : 14,
			description : desc(["   Why stop at just one? Starting 14th level, you can select a second Principle Improvement."]),
		},
		"additional_upgrade" : {
            name : "Additional Upgrade",
            minlevel : 3,
            description : desc([
                "The number of upgrades I have for my class level is increased by one.",
                "The number of additional upgrades you get increases to two more than the class table at 5th level."]),
			additional : ["", "", "1 upgrade", "1 upgrade", "2 upgrades", "2 upgrades", "3 upgrades", "3 upgrades", "4 upgrades", "4 upgrades", "5 upgrades", "5 upgrades", "6 upgrades", "6 upgrades", "7 upgrades", "7 upgrades", "8 upgrades", "8 upgrades", "9 upgrades", "9 upgrades"],
			extraname : "Fleshsmith Upgrades",
			extrachoices : ["Adorable Critter?", "Adorable Critter?! (prereq: level 11 Artificer, Adorable Critter?)", "Consumptive Hunger (prereq: extra fangs, dark powers)", "Dark Powers (prereq: Extra Fangs, Forbidden Knowledge)", "Doctor", "Extreme Mutation (prereq: Mutation Mastery)", "Fix Flesh", "Flesh Shaper (prereq: level 15 Artificer)", "Forbidden Knowledge", "Life Merchant (prereq: level 9 Artificer, Doctor)", "Life Void (prereq: Life Merchant)", "Iron Jaw (prereq: Extra Fangs)", "Massive Flex", "Mutation Mastery (prereq: level 5 Artificer)", "Pressure Points (prereq: Doctor)",  "Reflexive Twitch", "Safe Revival Technique (prereq: Doctor)", "Secondary Life Organs", "Sturdy Appendage (prereq: Extra Tentacle)", "Subdermal Plating", "Suspicious Vitality", "Toxic Blood", "Uncanny Strength (prereq: level 5 Artificer)", "Unnatural Health", "Wings Seem Useful (prereq: level 11 Artificer)", "Venomous Critter? (prereq: Adorable Critter?)", "Zombie Critter?", "Zombie Critter?! (prereq: Zombie Critter?)"],
			"adorable critter?" : {
				name : "Adorable Critter?",
				description : desc (["   I upgrade my Adorable Critter. My adorable critter can now cast primal savagery a number of times equal to my Int modifier + your Artificer level, as first level caster. It uses my Spell Attack modifier (Int modifier + my proficiency modifier). This bypasses it's restriction against attacking."]),
				usages : "Int mod per ",
					usagescalc : "event.value = Math.max(1, What('Int Mod'));",
					spellcastingExtra : ["primal savagery"],
				spellcastingBonus : {
                name : "Adorable Critter?",
                spells : ["primal savagery"],
                selection : ["primal savagery"],
                times : 1},
				prereqeval : "classes.known.artificer.level >= 1"
				},
			"adorable critter?! (prereq: level 11 artificer, adorable critter?)" : {
				name : "Adorable Critter?!",
				description : desc(["   I upgrade my Adorable Critter. When my Adorable Critter uses primal savagery it grows to medium size until the end of its turn. It now casts primal savagery as an 11th level spell caster"]),
				prereqeval : "classes.known.artificer.level >= 11"
				},
			"consumptive hunger (prereq: extra fangs, dark powers)" : {
				name : "Comsumptive Hunger",
				description : desc (["   I adapt to my new diet of bloody vitality, the health restored becomes 2d6 and the amount of health I can regain a day increases to my Artificer level * 2."]),
				},
			"dark powers (prereq: extra fangs, forbidden knowledge)" : {
				name : "Dark Powers",
				description : desc(["   I improve my Extra Fangs with secrets I've learned from my Forbidden Knowledge, allowing them to tap into the life force of their target. Attacks with my Fangs deal an additional 1d6 necrotic damage, and restore 1d6 health to me. I can regain a total health from this upgrade equal to my Artificer level, I no longer regain health from it until I complete a long rest."]),
				recovery : "long rest",				
				},
			"doctor" : {
				name : "Doctor",
				description : desc(["I master the knowledge of the mechanical properties of the body. I can add double my proficiency to Medicine skill checks, and when I make a Wisdom (Medicine) check to stablize a creature, I restore 1 hit point."]),
				},
			"extreme mutation (prereq: mutation mastery)" : {
				name : "Extreme Mutation",
				decription : desc(["   I can push my mutation to the limits and well beyond using a touch of magic. I learn the spell polymorph, but unless I know this spell from another source, I can only target myself. Additionally, I can cast this spell without expending a spell slot, but once I do so, I cannot do so again until I complete a long rest."]),
				spellcastingExtra : ["polymorph"],
				spellcastingBonus : {
                name : "Extreme Mutaion",
                spells : ["polymorph"],
                selection : ["polymorph"],
                times : 1,
				oncelr : true}
				},
			"fix flesh" : {
				name : "Fix Flesh",
				description : desc(["   My expertise in the working of flesh makes me an artisan of fixing flesh. When I cast cure wounds I restore an additional amount of health equal to half my Artificer level (rounded down)."])
				},
			"flesh shaper (prereq: level 15 artificer)" : {
				name : "Flesh Shaper",
				description : desc(["   I gain the ability to cast clone without expending a spell slot. I still require material components. Once I cast this spell, I cannot cast it again until I complete a long rest."]),
				spellcastingExtra : ["clone"],
				spellcastingBonus : {
                name : "Flesh Shaper",
                spells : ["clone"],
                selection : ["clone"],
                times : 1,
				oncelr : true},
				prereqeval : "classes.known.artificer.level >= 15"
				},
			"forbidden knowledge" : {
				name : "Forbidden Knowledge",
				description : desc(["   I delve into the arcane mechanics of how bodies work. Otherwise known as Necormancy. You learn the additional spells; at level 3 inflict wounds and false life, at level 5 blindness/deafness and gentle repose, at level 9 life transference and feign death, at level 13 vampiric touch and blight"]),				
				prereqeval : "classes.known.artificer.level >= 3",
				spellcastingBonus : {
					name :"Forbidden Knowledge",
					minlevel : 3,
					times : [0, 0, 2, 2, 4, 4, 4, 4, 6, 6, 6, 6, 8, 8, 8, 8, 8, 8, 8, 8],
					spells : ["inflict wounds", "false life", "blindness/deafness", "gentle repose", "life transference", "feign death", "vampiric touch", "blight"],
					selection : ["inflict wounds", "false life", "blindness/deafness", "gentle repose", "life transference", "feign death", "vampiric touch", "blight"],
					firstCol : "",
				},
			},
			"life merchant (prereq: level 9 artificer, doctor)" : {
				name : "Life Merchant",
				description : desc(["   I can cast life transference and can add my Int modifier to damage taken (consequently adding twice my Int modifier to the health restored)."]),
				spellcastingExtra : ["life transference"],
				spellcastingBonus : {
                name : "Life Merchant",
                spells : ["life transference"],
                selection : ["life transference"],
                times : 1,
				firstCol : ""},
				prereqeval : "classes.known.artificer.level >= 9"
				},
			"life void (prereq: life merchant)" : {
				name : "Life Void",
				description : desc(["   I hunger for missing vitality. After casting life transference until the end of my next turn whenever I strike a creature with my natural weapons, I can deal an additional 1d6 necrotic damage and regain health equal to the amount."]),				
			},
						"iron jaw (prereq: extra fangs)" : {
				name : "Iron Jaw",
				description : desc(["   When I attempt to hold onto a creature, I can use my fangs to grapple them. A creature that starts its turn while grappled by my Fangs takes 1d4 piercing damage."]),
				},
			"massive flex" : {
				name : "Massive Flex",
				description : desc(["   I implant the ability to suddenly mutate my body. As an action, I can become a large sized creature. Any creature that witnesses this must make a Wisdom Save against your Spell Save DC or become frightened of me until the end of their turn. While I am large, my attacks deal additional 1d4 damage, and I have advantage on Strength (Athletics) checks. I can revert to normal size as a bonus action." + "\n   " + "\n   I can spend a number of rounds equal to my Int modifier as a large creature before I must revert and can not become large again until I complete a short or long rest."]),
				usages : "Int mod per ",
					usagescalc : "event.value = Math.max(1, What('Int Mod'));",
				},
			"mutation mastery (prereq: level 5 artificer)" : {
				name : "Mutation Mastery",
				description : desc(["   After so many little adjustments, you find that your form is quite flexible to your needs. You gain the ability to cast alter self at will."]),
				spellcastingBonus : {
					name : "Mutation Mastery",
					spells : ["alter self"],
					selection : ["alter self"],
					 times : 1,
				firstCol : ""},
				prereqeval : "classes.known.artificer.level >= 5"
				},
			"pressure points (prereq: doctor)"	: {
				name : "Pressure Points",
				description : desc(["   My extensive knowledge of anatomy allows my to target critical spots. When I strike a target, as a bonus action I can force them to roll a Constitution Saving Throw against my spell save DC." + "\n   " + "If they fail, they are slowed until the end of your next turn. If the target is already slowed they become restrained until the end of their next turn. If the creatures is already restrained they become stunned until the end of their next turn. If they already stunned they become paralyzed until the end of their next turn." + "\n   " + "If they target becomes paralyzed from these attacks or passes a constitution saving throw, they become immune to this ability for 24 hours."]),
				action : ["bonus action", ""]
				},
			"reflexive twitch" : {
				name : "Reflexive Twitch",
				decription : desc(["   When I take damage from a target within 5 feet of me, I can use my reaction to reflexively attack them with my Extra Arm or Extra Tentacle; this counts as expending a use of that limb."]),
				action : ["reaction", ""]
				},
			"retractable claws" : {
				name : "Retractable Claws",
				description : desc(["   I add natural weapons to my hands, as they seem to lack them. They deal 1d6 slashing damage, and are light and finesse weapons. I am proficient with these new claws. At level 5, these claws weapon gains a +1 to attack and damage rolls; this increases to a +2 at level 14"]),
				eval : "AddWeapon('Retractable Claws');",
					removeeval : "RemoveWeapon('Retractable Claws');"
				},
			"safe revival technique (prereq: doctor)" : {
				name : "Safe Revival Technique",
				description : desc(["   I can cast revivify without expending a spell slot or material component. For some reason the target gains a level exhaustion, and is frightened of me for one minute upon reviving."]),
				spellcastingBonus : {
					name : "Safe Revival Technique",
					spells : ["revivify"],
					selection : ["revivify"],
					times : 1,
					firstCol : ""
					},
				},				
			"secondary life organs" : {
				name : "Secondary Life Organs",
				description : desc(["   Realizing the fragility of mortal life, I modify myself with additional necessary functions. The first time I make a Death Saving Throw, I can replace the results of that roll with a 20. Once I do this, I cannot do this again until I complete a long rest."]),
				recovery : "long rest",
				},
				"sturdy appendage (prereq: extra tentacle)" : {
					name : "Sturdy Appendage",
					description : desc(["   You tweak your extra appendage for expanded utility. It's reach increases to 15 feet, its damage as a natural weapon increases to 1d8 bludgeoning damage, and it can add 1d4 to any Strength (Athletics) check it makes."])
					},
				
			"subdermal plating" : {
				name : "Subdermal Plating",
				description : desc(["Exoskeletons are bulky, and endoskeletons just don't offer enough protection, so you compromise. You gain a natural armor of 16 + dexterity modifier (maximum 2)."]),
				eval : "AddArmor('Subdermal Plating');",
					removeeval : "RemoveArmor('Subdermal Plating');"
				},
			"suspicious vitality" : {
				name : "Suspicious Vitality",
				description : desc(["   I am in truly phenomenal health after a few dietary suppliments. I regain an additional 1d8 + my Con modifier health when I take a short rest, gain additional hit die equal to half your Artificer level, and regrow any missing limbs when you complete a long rest."])
				},	
			"toxic blood" : {
				name : "Toxic Blood",
				description : desc(["  Copying certain frog species, I make my blood poisonous. When a creature hits me piercing or slashing damage while within 5 feet of me, they take poison damage equal to my proficiency modifier. If damage is from a biting attack, they take twice as much damage." + "   I may also opt to make myself take on a different skin hue, to let creatures know they shouldn't eat me."])
				},			
			"uncanny strength (prereq: level 5 artificer)" : {
				name : "Uncanny Strength",
				description : desc(["   I don't see what the big deal is with two handed weapons. After some small improvements, I can hold a two handed weapon in one hand"]),
				prereqeval : "classes.known.artificer.level >= 5"				
				},
			"unnatural health" : {
				name : "Unnatural Health",
				description : desc(["   I've modified my body to constantly restore itself. At the start of my turn, I can choose to expend a hit die and regain as normal from it."])
				},
			"wings seem useful (prereq: level 11 artificer)" : {
				name : "Wings Seem Useful",
				description : desc(["   I decide the wings seem useful, and install a pair. I can shape them like bird or bat wings. These grant me a flying speed equal to my movement speed, so long as I am not wearing heavy armor."]),
				prereqeval : "classes.known.artificer.level >= 11"
				},
			"venomous critter? (prereq: adorable critter?)" : {
				name : "Venomous Critter?",
				description : desc(["   Targets of my Adorable Critters primal savagery take 1d6 poison damage become poisoned until the end of their next turn."])
				},
			"zombie critter?" : {
				name : "Zombie Critter",
				description : desc(["   Your Adorable Critter gains Undead Fortitude. If damage reduces my Adorable Critter to 0 hit points, it must make a Con saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the Adorable Critter drops to 1 hit point instead"])
				},	
			"zombie critter?! (prereq: zombie critter?)" : {
				name : "Zombie Critter?!",
				description : desc(["   If my Adorable Critter dies, it comes back to life at the end of its next turn. It can do this a number of times equal to your Intelligence modifier, and regains all lives after you complete a long rest and repair or rebuild it."]),
				usages : "Int mod per ",
					usagescalc : "event.value = Math.max(1, What('Int Mod'));",
		},			
	},
  },
};
ClassSubList["artificer-gadgetsmith"] = {
    regExpSearch : /gadgetsmith/i,
    subname : "Gadgetsmith",
    features : {
        "gadgetsmith_proficiency" : {
            name : "Gadgetsmith's Proficiency",
            minlevel : 1,
            description : desc(["I gain proficiency with nets, rapiers, whips, and tinker's tools."]),
            toolProfs : [["Tinker's Tools", "Dex"]],
            weapons : [[true, false, ["Net", "Rapier", "Whip"]]]
        },
        "essential_tools" : {
            name : "Essential Tools",
            minlevel : 1,
            description : desc([
                "I have mastered the creation of the essential reusable tools of surviving the battlefield as a Gadgeteer. I have the following items:",
                "Grappling Hook: As an attack or as an action, I may target a surface, object or creature within 20 feet. If the target is Small or Smaller, I can make a Grapple check to pull it to me and Grapple it. Alternatively, if the target is Medium or larger, Ican choose to be pulled to it, this does not grapple it.",
                "Smoke Bomb: As an action, I can use this to instantly cast Fog Cloud on myself without expending a spell slot. It lasts rounds equal to my intelligence modifier and does not require concentration.",
                "Shock Generator: As an action, I can use this to cast Shocking Grasp."
            ]),
            spellcastingBonus : {
                name : "Essential Tools",
                spells : ["shocking grasp", "fog cloud"],
                selection : ["shocking grasp", "fog cloud"],
                times : 2
            }
        },
        "additional_upgrade" : {
            name : "Additional Upgrade",
            minlevel : 3,
            description : desc([
                "The number of upgrades I have for my class level is increased by one.",
                "The number of additional upgrades you get increases to two more than the class table at 5th level."
            ]),
            additional : ["", "", "1 upgrade", "1 upgrade", "2 upgrades", "2 upgrades", "3 upgrades", "3 upgrades", "4 upgrades", "4 upgrades", "5 upgrades", "5 upgrades", "6 upgrades", "6 upgrades", "7 upgrades", "7 upgrades", "8 upgrades", "8 upgrades", "9 upgrades", "9 upgrades"],
            extraname : "Gadget Upgrades",
            extrachoices : ["Antimagical Shackle (prereq: level 5 Artificer)", "Boomerang of Hitting", "Belt of Adjusting Size", "Binding Rope (prereq: level 5 Artificer)", "Bracers of Empowerment (prereq: level 11 Artificer)", "Deployable Wings (prereq: level 9 Artificer)", "Disintegration Ray (prereq: level 15 Artificer)", "Gripping Gloves (prereq: level 11 Artificer)", "Element Eater", "Enhanced Grappling Hook", "Fire Spitter", "Flashbang", "Impact Gauntlet", "Lightning Baton", "Mechanical Arm", "Mechanical Familiar", "Nimble Gloves (prereq: level 11 Artificer)", "Phase Trinket (prereq: level 9 Artificer)", "Jumping Boots", "Repeating Hand Crossbow", "Bee Swarm Rockets (prereq: level 15 Artificer)", "Shocking Hook", "Sight Lenses", "Smoke Cloak", "Stinking Gas (prereq: level 9 Artificer)", "Striding Boots", "Stopwatch Trinket (prereq: level 9 Artificer)", "Truesight Lenses (prereq: Sight Lensens)", "Useful Universal Key (prereq: level 11 Artificer)", "Zombie Wires (prereq: level 15 Artificer)"],
            "antimagical shackle (prereq: level 5 artificer)" : {
                name : "Antimagical Shackle",
                description : desc([
                    "You create an antimagical shackle. When you are adjacent to a creature, as an action you can attempt to shackle them to yourself or a nearby object using these shackles. The you make a Dexterity (Sleight of Hand) check contested by a Strength (Athletics) or Dexterity (Acorbatics) check. On failure, they are shackled to the creature or object you attempted to shackle them to, and can move only by moving it if they are able to.",
                    "Additionally, while shackled by these shackles, they cannot teleport, planeshift, polymorph, shapechange, dematerialize, or turn into an amorphous form. As an action they can make a Strength saving throw against your spell save DC to break the shackles once shackled, otherwise these shackles last until you remove them.",
                    "This shackles have no effect on creatures immune to being grappled or restrained."
                ]),
                prereqeval : "classes.known.artificer.level >= 5"
            },
            "boomerang of hitting" : {
                name : "Boomerang of Hitting",
                description : desc([
                    "You create a magical boomerang. You have proficiency in this weapon, and it has the Finesse, Thrown (30/90), and Special properties, and deals 1d4 damage.",
                    "Special: When this weapon is Thrown, you can make target up three seperate targets within 10 feet of each other, making a seperate attack roll against each target.",
                    "This weapon returns to your hand after you make an attack with it using the Thrown property."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "belt of adjusting size" : {
                name : "Belt of Adjusting Size",
                description : desc([
                    "You create a belt with a creature size dial on it. While you are wearing this belt, you can use an action to cast Enlarge/Reduce on yourself. Once you use this gadget, you cannot use it again until you complete a short or long rest."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "binding rope (prereq: level 5 artificer)" : {
                name : "Binding Rope",
                description : desc([
                    "You create a rope that is capable of animating and binding a target. As an action, target a creature within 30 feet. The target must make a Dexterity Saving throw against your Spell Save or become restrained until the end of your next turn. If you are currently grappling the target, it makes the Dexterity saving throw with disadvantage. The rope can only restrain one target a time."
                ]),
                prereqeval : "classes.known.artificer.level >= 5"
            },
            "bracers of empowerment (prereq: level 11 artificer)" : {
                name : "",
                description : desc([
                    "You create bracers that can empower you. You can use this to cast Tensor's Transformation without expending a Spell Slot.",
                    "Once you use this ability, you cannot use it again until you complete a long rest."
                ]),
                prereqeval : "classes.known.artificer.level >= 11"
            },
            "deployable wings (prereq: level 9 artificer)" : {
                name : "Deployable Wings",
                description : desc([
                    "You build a set of deployable artificial wings. You can deploy this as a bonus action, or as a reaction to falling. When deployed, these give you a flying speed of 30 feet."
                ]),
                prereqeval : "classes.known.artificer.level >= 9"
            },
            "disintegration ray (prereq: level 15 artificer)" : {
                name : "Disintegration Ray",
                description : desc([
                    "You create a Disintegration Ray. You can use this to cast Disintegration without expending a Spell Slot.",
                    "Once you use this ability, you cannot use it again until you complete a long rest."
                ]),
                prereqeval : "classes.known.artificer.level >= 15"
            },
            "gripping gloves (prereq: level 11 artificer)" : {
                name : "Gripping Gloves",
                description : desc([
                    "You create a set of gloves with a powerful assisted grip. Your Strength score and maximum Strength score increases by 2 while wearing these gloves. You gain advantage on Strength (Athletics) checks involving manipulating things with your hands while wearing these gloves."
                ]),
                prereqeval : "classes.known.artificer.level >= 11"
            },
            "element eater" : {
                name : "Element Eater",
                description : desc([
                    "You create a device capable of absorbing incoming elemental damage. As a reaction to taking elemental damage, you can activate this device and cast Absorb Elements without expending a spell slot, but the gadget cannot be used again until you complete a short or long rest."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "enhanced grappling hook" : {
                name : "Enhanced Grappling Hook",
                description : desc([
                    "You enhance your grappling hook, increasing its range to 40 feet."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "fire spitter" : {
                name : "Fire Spitter",
                description : desc([
                    "You create a gadget that creates a quick blast of fire. As an action, you can cast Aganazzar's Scorcher with this gadget, but the gadget cannot be used again until you complete a short or long rest."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "flashbang" : {
                name : "Flashbang",
                description : desc([
                    "You create a high luminary discharge device. As an action, you can target a point within 30 feet. Any creature within 20 feet of the targeted point must make a dexterity saving throw or be blinded until the end of its next turn. Once you use this gadget, you cannot use it again until you complete a short or long rest."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "impact gauntlet" : {
                name : "Impact Gauntlet",
                description : desc([
                    "You create a weapon capable of amplifying the impact of your blows. You have proficiency in this weapon, and it has the Finesse, Light and Special properties. It deals 1d8 bludgeoning damage.",
                    "Special: When you make an attack roll, you can choose to forgo adding your Proficiency modifier to the attack roll. If the attack hits, you can add double your Proficiency modifier to the damage roll."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "lightning baton" : {
                name : "Lightning Baton",
                description : desc([
                    "You combine incorporate elements of your shock generator design into a baton, creating a new weapon. You have proficiency in this weapon, and it has the Finesse and Light properties. It deals 1d4 bludgeoning damage and 1d4 lightning damage on hit. If you score a critical strike with this weapon, the target must succeed a Constitution saving throw against your Spell Save or become stunned until the start of your next turn."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "mechanical arm" : {
                name : "Mechanical Arm",
                description : desc([
                    "You create a mechanical arm, giving an extra hand. This mechanical arm only functions while it is mounting on gear you are wearing, but can be operated mentally without the need for you hands. This mechanical arm can serve any function a normal hand could, such as holding things, making attacks, interacting with the environment, etc, but does not give you additional actions."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "mechanical familiar" : {
                name : "Mechanical Familiar",
                description : desc([
                    "You can create the blue print for a small mechanical creature. At the end of a long rest, you can choose animate it, and cast Find Familiar with the following modifications. The creatures type is Construct, and you cannot select a creature with a flying speed. This construct stays active until you deactivate it or is destroyed. In either case, you can choose to reactivate it at the end of a long rest."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "nimble gloves (prereq: level 11 artificer)" : {
                name : "Nimble Gloves",
                description : desc([
                    "You create magical gloves the increase your dexterity. Your Dexterity score and maximum Dexterity score increases by 2 while wearing these gloves. You gain advantage on Dexterity (Slight of Hand) checks involving manipulating things with your hands while wearing these gloves."
                ]),
                prereqeval : "classes.known.artificer.level >= 11"
            },
            "phase trinket (prereq: level 9 artificer)" : {
                name : "Phase Trinket",
                description : desc([
                    "You create a magical stopwatch that manipulates ethereal magic. As an action, you can cast Blink or Dimension Door using the Stopwatch without expending a Spell Slot.",
                    "Once you use this ability, you cannot use it again until you complete a long rest"
                ]),
                prereqeval : "classes.known.artificer.level >= 9"
            },
            "jumping boots" : {
                name : "Jumping Boots",
                description : desc([
                    "You modify your boots with arcane boosters. While wearing these boots, you are under the effects of the Jump spell."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "repeating hand crossbow" : {
                name : "Repeating Hand Crossbow",
                description : desc([
                    "You build an improved hand crossbow. You have proficiency in this weapon, and it has the Ammunition (range 30/120), Light, and Special properties and deals 1d6 piercing damage.",
                    "Special: This weapon does not require a free-hand to load, as it has a built in loader."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "bee swarm rockets (prereq: level 15 artificer)" : {
                name : "Bee Swarm Rockets",
                description : desc([
                    "You design a type of tiny firecracker like device, that can be released in large number. You have a maximum number of rockets equal to your Artificer level. You can release between one and the number you have remaining as an action. Each rocket targets a point you can see within 40 feet. Creatures within 10 feet of a target point must make a dexterity saving throw. Creatures that fail take 2d6 fire damage, or half as much on a successful one.",
                    "You rebuild your stock to your maximum during a long rest."
                ]),
                prereqeval : "classes.known.artificer.level >= 15"
            },
            "shocking hook" : {
                name : "Shocking Hook",
                description : desc([
                    "You can integrate your Shock Generator and your Grappling Hook. If the target of your Grappling Hook is a creature, you can cast Shocking Grasp on that creature as a bonus action when pulling it to you or being pulled to it."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "sight lenses" : {
                name : "Sight Lenses",
                description : desc([
                    "You create a set of lenses you can integrate into a set of goggles, glasses, or other vision assistance that allow you to see through obscurement. You can see through Fog, Mist, Smoke, Clouds, and non-Magical Darkness as normal sight up to 15 feet."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "smoke cloak" : {
                name : "Smoke Cloak",
                description : desc([
                    "Create a cloak that causes you to blend in with smoke. When you start your turn lightly or heavily obscured by smoke, you are invisible until your turn ends, you cast a spell, make an attack, or damage an enemy."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "stinking gas (prereq: level 9 artificer)" : {
                name : "Stinking Gas",
                description : desc([
                    "You make a more potent compound for your Smoke Bomb. When use a Smoke Bomb, you can choose to cast Stinking Cloud rather than Fog Cloud, following the same rules."
                ]),
                prereqeval : "classes.known.artificer.level >= 9"
            },
            "striding boots" : {
                name : "Striding Boots",
                description : desc([
                    "You modify your boots with amplified striding speed. While earing these boots, you are under the effects of Longstrider spell."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "stopwatch trinket (prereq: level 9 artificer)" : {
                name : "Stopwatch Trinket",
                description : desc([
                    "You create a magical stopwatch that manipulates time magic. As an action, you can cast Haste or Slow using the Stopwatch without expending a Spell Slot.",
                    "Once you use this ability, you cannot use it again until you complete a long rest."
                ]),
                prereqeval : "classes.known.artificer.level >= 9"
            },
            "truesight lenses (prereq: sight lensens)" : {
                name : "Truesight Lenses",
                description : desc([
                    "You upgrade and fine tune your sight lenses, granting you Truesight up to 15 feet."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "useful universal key (prereq: level 11 artificer)" : {
                name : "Useful Universal Key (prereq: level 11 Artificer)",
                description : desc([
                    ".."
                ]),
                prereqeval : "classes.known.artificer.level >= 11"
            },
            "zombie wires (prereq: level 15 artificer)" : {
                name : "Zombie Wires",
                description : desc([
                    "You create an advanced system of magical threads that you can shoot out, and use to make nearby corpses dance to your commands. As an action, you can cast Danse Macabre without expended a spell slot.",
                    "Once you use this ability, you cannot use it again until you complete a long rest."
                ]),
                prereqeval : "classes.known.artificer.level >= 15"
            }
        },
        "recycle_gadgets" : {
            name : "Recycle Gadgets",
            minlevel : 3,
            description : desc([
                "During a long rest and taking effect when I complete it, I can disassemble my gadgets and create different ones."
            ])
        },
        "extra_attack" : {
            name : "Extra Attack",
            minlevel : 5,
            description : desc([
                "I can attack twice, instead of once, whenever I take the Attack action on my turn."
            ]),
            eval : "ClassList['artificer'].attacks = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]",
            removeeval : "ClassList['artificer'].attacks = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]"
        },
        "combat_gadgets" : {
            name : "Combat Gadgets",
            minlevel : 14,
            description : desc([
                "When I take the attack action, I can replace an attack with using any gadget that requries an action to use.",
                "Additionally, any weapon gadgets you have created gain a +2 to their attack and damage rolls."])
        }
    }
};

ClassSubList["artificer-golemsmith"] = {
    regExpSearch : /golemsmith/i,
    subname : "Golemsmith",
    features : {

    }
};


ClassSubList["artificer-infusionsmith"] = {
    regExpSearch : /infusionsmith/i,
    subname : "Infusionsmith",
    features : {
		"infusionsmith's_proficiency" : {
			name : "Infusionsmith's Proficiency",
			minlevel : 1,
			description : desc(["   I gain proficiency with jeweler's tools and calligrapher's supplies.", "Creating a magic spell scroll only takes me half the time and material cost it would normally take."]),
			toolProfs : [["Jeweler's Tools", "Dex"], ["Calligrapher's supplies"]],
			},
		"animated weapon" : {
			name : "Animated Weapon",
			minlevel : 1,
			description : desc(["   After a long rest, I can touch a melee weapon in my possession and animate it. An animated weapon, when readied floats next to me.", "As an action I can make a ranged spell attack against a target within 30 feet. This attack ignores all cover, and does not suffer disadv within 5 feet, but there must be a path the blade can take to make the attack without traveling more than 30 feet away from me, or the attack fails. If the attack hits, it deals the weapon damage plus my Int modifier. After making the attack, the weapon returns to my side."]),
		},
		"store magic" : {
			name : "Store Magic",
			minlevel : 3,
			description : desc(["   At the end of a rest, I can infuse a known spell into an item for later use. I expend any components the spell requires, but this does not use a spell slot. Any creature holding the item with an Int of 6 or higher that is aware there is magic infused in it can cast the spell.", "The spell uses my spellcasting modifiers. The magic infused in the item fades if I complete a rest without expending the stored spell."]),
			},
			"twin animated weapon" : {
				name : "Twin Animated Weapon",
				minlevel : 5,
				description : desc(["   I can animate a second weapon. Whenever I make a ranged spell attack with my animated weapon, I can attack independently with both animated weapons, making separate attack and damage rolls. The weapons can attack the same target, or two different targets that are both within 30 feet of me."]),
				},
			"infused focus" : {
				name : "Infused Focus",
				minlevel : 14,
				description : desc(["   When I cast a concentration spell, I can anchor it to an item, and do not need to maintain concentration. The spell lasts a number of rounds equal to your Int modifier, after which the spell ends.", "Once I use this ability, I must complete a rest before using it again."]),
				},
			"additional_upgrade" : {
            name : "Additional Upgrade",
            minlevel : 3,
            description : desc([
                "The number of upgrades I have for my class level is increased by one.",
                "The number of additional upgrades you get increases to two more than the class table at 5th level."
            ]),
            additional : ["", "", "1 upgrade", "1 upgrade", "2 upgrades", "2 upgrades", "3 upgrades", "3 upgrades", "4 upgrades", "4 upgrades", "5 upgrades", "5 upgrades", "6 upgrades", "6 upgrades", "7 upgrades", "7 upgrades", "8 upgrades", "8 upgrades", "9 upgrades", "9 upgrades"],
            extraname : "Infusion Upgrades",
            extrachoices : ["Advanced Object Animation (prereq: level 17 Artificer)", "Animated Archer", "Arcane Armament", "Alter Time Infusion (prereq: level 9 Artificer)", "Deflecting Weapon", "Detonate Armor (prereq: Arcane Armament, level 9 Artificer)", "Empower Weapon (prereq: level 11 Artificer)", "Enhance Attribute", "Enchanted Broom (prereq: level 11 Artificer)", "Explosive Mine (prereq: Thunder Mine, level 15 Artificer)", "Infuse Elements", "Life Infusion (prereq: level 11 Artificer)", "Malicious Infusion (prereq: level 5 Artificer)", "Quick Enhancements (prereq: level 5 Artificer)", "Radiant Infusion (prereq: level 15 Artificer)", "Skilled Animation", "Spell Trapping Ring (prereq: level 9 Artificer)", "Soul Saving Bond", "Third Animated Weapon (prereq: level 15 Artificer)", "Thunder Mine (prereq: level 5 Artificer)", "Triggered Infusion", "Warding Stone", "Weapon Enchantment Expertise (prereq: level 5 Artificer)", "Weapon Enchantment Mastery (prereq: Weapon Enchantment Expertise, level 5 Artificer)", "Worn Enchantment"],
			 "advanced object animation (prereq: level 17 artificer)" : {
				 name : "Advanced Object Animation",
				 description : desc(["   When I cast the animate objects spell, my animated objects add +1 to their attack and damage rolls per object it counts as (tiny objects gain +1, huge objects gain +8)."]),
				 spellcastingBonus : {
					 name : "Advanced Object Animation",
					 spells : ["animate objects"],
					 selection : ["animate objects"],
					 times : 1,					 
					 },
				 prereqeval : "classes.known.artificer.level >= 17"
				 },
			"alter time infusion (prereq: level 9 artificer)" : {
				name : "Alter Time Infusion",
				minlevel : 9,
				description : desc(["   I learn a special infusion for manipulating the flow of time. When I use your Store Magic feature, rather than picking a spell I know, I can cast haste or slow. Unless I know these spells from another source, I can only cast these spells using the Store Magic feature."]),
				spellcastingBonus : {
					name : "Alter Time Infusion",
					spells : ["haste", "slow"],
					selection : ["haste", "slow"],
					times : 2
				},
				prereqeval : "classes.known.artificer.level >= 9"
			},				
			"animated archer" : {
				name : "Animated Archer",
				minlevel : 3,
				description : desc(["   I master animation enchantments allowing me to use your Animate Weapon feature on ranged weapons and a quiver of ammunition. An animated ranged weapon can target anything inside the weapons normal range with a ranged spell attack, dealing weapon damage + my Int modifier on hit. This attack does not ignore cover. The weapon still requires ammunition, and can carry up 30 pieces of ammunition at a time, after which it needs to be reloaded as an action."])				
			},	
			"arcane armament" : {
				name : "Arcane Armament",
				menlevel : 3,
				description : desc(["   I master armoring myself with magical enchantments. I learn the mage armor spell. While under the effect of mage armor, I can add your Int modifier to your AC instead of your Dex modifier. You can only do this if I am not adding your Int modifier to your AC from another source. Additionally you gain resistance to force damage."]),
				spellcastingBonus : {
					name : "Arcane Armament",
					spells : ["mage armor"],
					selection : ["mage armor"],
					times : 1,
					},
				dmgres : ["Force"]
			},
			"deflecting weapon" : {
				name : "Deflecting Weapon",
				minlevel : 3,
				description : desc(["   While I have an animated melee weapon, if I am attacked I can use my reaction to defend myself with them, granting you +2 AC against an single attack. If the attack misses me, I can immediately attack the creature that attacked me, making a single melee spell attack with one animated weapon against the attacker."]),
				action : ["reaction", ""],
			},
			"detonate armor (prereq: arcane armament, level 9 artificer)" : {
				name : "Detonate Armor",
				minlevel : 9,
				description : desc(["   As a reaction to taking damage, I can end the effect of mage armor to cast thunder step without expending a spell slot. When I cast thunder step in this manner, it deals force damage instead of thunder damage. Once I do this, I cannot use this ability again until the end of your next short or long rest."]),
				spellcastingBonus : {
					name : "Detonate Armor",
					spells : ["thunder step"],
					selection : ["thunder step"],
					times : 1,
				},
				recovery : "long rest",
				prereqeval : "classes.known.artificer.level >= 9"
			},
			"empower weapon (prereq: level 11 artificer)" : {
				name : "Empower Weapon",
				minlevel : 11,
				description : desc(["   As a bonus action, I can infuse a weapon I touch with arcane power. The next time this weapon strikes a target before the start of my next turn, it deals an additional 2d4 force damage. When infusing the weapon I can expend a 1st level spell slot or higher spell slot to increase the damage to be an additional 4d4 force damage."]),
				action : ["bonus action", ""],
				prereqeval : "classes.known.artificer.level >= 11"
			},
			"enhance attribute" : {
				name : "Enhance Attribute",
				minlevel : 3,
				description : desc(["   I can enhance a piece of non-magical jewelery with power that boosts the wearers abilities. Select an ability from Strength, Dexterity, Constitution, Wisdom, Intelligence or Charisma, the current and maximum score for that ability is increased by one while wearing this item. This piece of jewelry provides a benefit only to me. I can take this upgrade twice."]),
				},	
			"enchanted broom (prereq: level 11 artificer)" : {
				name : "Enchanted Broom",
				minlevel : 11,
				description : desc(["   I can enchant a broom (or broom like object) into a Broom of Flying. I set the command word for the broom, and the Broom only obeys me."]),
				prereqeval : "classes.known.artificer.level >= 11"
			},
			"explosive mine (prereq: thunder mine, level 15 artificer)" : {
				name : "Explosive Mine",
				minlevel : 15,
				description : desc(["   I learn the fireburst mine spell. When I set a magical trap using the Thunder Mine upgrade, I can set a fireburst mine instead."]),
				spellcastingBonus : {
					name : "Explosive Mine",
					spells : ["fireburst mine"],
					selection : ["fireburst mine"],
					times : 1,
				},
				prereqeval : "classes.known.artificer.level >= 15"
			},
			"infuse elements" : {
				name : "Infuse Elements",
				minlevel : 3,
				description : desc(["   I can infuse elements with my magic temporarily, granting me limited control of them. I learn the cantrips control flames, mold earth, and shape water."]),
				spellcastingBonus : {
					name : "Infuse Elements",
					spells : ["control flames", "mold earth", "shape water"],
					selection : ["control flames", "mold earth", "shape water"],
					times : 3
				},
			},
			"life infusion (prereq: level 11 artificer)" : {
				name : "Life Infusion",
				minlevel : 3,
				description : desc(["   I learn a potent magical infusion that suffuses a creature with life energy. I can cast regenerate without expending a spell slot. Once I cast this spell in this manner, I cannot use it again until I complete a long rest."]),
				spellcastingBonus : {
					name : "Life Infusion",
					spells : ["regenerate"],
					selection : ["regenerate"],
					times : 1,					
				},
				recovery : "long rest",
				prereqeval : "classes.known.artificer.level >= 11",
			},	
			"malicious infusion (prereq: level 5 artificer)" : {
				name : "Malicious Infusion",
				minlevel : 5,
				description : desc(["   As a reaction to being hit with a metal weapon, you can cast heat metal targeting the weapon that struck you. Additionally, you learn the spell heat metal."]),
				spellcastingBonus : {
					name : "Malicious Infusion",
					spells : ["heat metal"],
					selection : ["heat metal"],
					times : 1
				},
				prereqeval : "classes.known.artificer.level >= 5",
			},
			"quick enhancements (prereq: level 5 artificer)" : {
				name : "Quick Enhancements",
				minlevel : 5,
				description : desc(["   The art of infusion is best practiced with care and time, but I've learned to cut corners and compromise when in the heat of battle. I gain the ability to cast levitate and dragon's breathe as Artificer spells. Additionally, you learn the spell fly when you reach level 9."]),
				spellcastingBonus : {
					name : "Quick Enhancements",
					spells : ["levitate", "dragon's breathe", "fly"],
					selection : ["levitate", "dragons breathe", "fly"],
					times : [0, 0, 0, 0, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
				},
				prereqeval : "classes.known.artificer.level >= 5",
			},
			"radiant infusion (prereq: level 15 artificer)" : {
				name : "Radiant Infusion",
				minlevel : 15,
				description : desc(["   You learn a special infusion for bestowing radiant energy. You learn the holy weapon spell."]),
				spellcastingBonus : {
					name : "Radiant Infusion",
					spells : ["holy weapon"],
					selection : ["holy weapon"],
					times : 1
				},
				prereqeval : "classes.known.artificer.level >= 15",
			},
			"skilled animation" : {
				name : "Skilled Animation",
				minlevel : 3,
				description : desc(["   I manage to make the magic of my Animated Weapons so potent that attacks made with them are made as if made by a wielder with a fighting style. Attacks made with one-handed animated weapons can apply the Dueling fighting style to the attack, attacks made with two handed weapons can apply the Great Weapon Fighting style, and attacks made with ranged weapons can apply the Archery fighting style."])
			},
			"spell trapping ring (prereq: level 9 artificer)" : {
				name : "Spell Trapping Ring",
				minlevel : 9,
				description : desc(["   I set a powerful magic into a non-magical ring. I can use this ring to cast counterspell without expending a spell slot. When I cast counterspell in this way and it succeeds, the spell countered is stored in the ring. I can then cast the stored spell without expending a spell slot, but the spell fades if it is not used before I complete a long rest. Once I use this ring, I cannot use it again until I complete a long rest."]),
				spellcastingBonus : {
					name : "Spell Trapping Ring",
					spells : ["counterspell"],
					selection : ["conterspell"],
					times : 1
				},
				recovery : "long rest",
				prereqeval : "classes.known.artificer.level >= 9",
			},
			"soul saving bond" : {
				name : "Soul Saving Bond",
				minlevel : 3,
				description : desc(["   I set up a special magical bond between me and another creature. When either creature bound by this abilities fails Wisdom, Intelligence, Charisma, or Death saving throw, the other character can make their own saving throw, replacing the failed saved with their own roll. If this ability is used on a death saving throw, the replacement roll is a 20. Once a roll is replaced by this feature, it cannot be used again until both creatures in the bond have completed a short or long rest. This bond can be set up with a different creature at the end of a long rest."]),
				recovery : "long rest"
			},
			"third animated weapon (prereq: level 15 artificer)" : {
				name : "Third Animated Weapon",
				minlevel : 15,
				description : desc(["   My mastery of weapon animation expands to greater breadth of control. I can animate a third weapon with my Animate Weapon feature. When I make a spell attack with my animated weapons, I can attack with this weapon as well."]),
				prereqeval : "classes.known.artificer.level >= 15",
			},
		
			"thunder mine (prereq: level 5 artificer)" : {
				name : "Thunder Mine",
				minlevel : 5,
				description : desc(["   I learn the thunderburst mine spell and can cast it once without expending a spell slot. I cannot cast it again in this way until I complete a long rest, but I can still cast the spell normally during that time."]),
				spellcastingBonus : {
					name : "Thunder Mine",
					spells : ["thunderburst"],
					selection : ["thunderburst"],
					times : 1,
				},
				prereqeval : "classes.known.artificer.level >= 5"
			},
			"triggered infusion" : {
				name : "Triggered Infusion",
				minlevel : 3,
				description : desc(["   When I use my Store Magic feature, I can set a trigger for the effect to occur. If the triggering event occurs, I can use my reaction to activate the stored spell. The trigger event can be a verbal key."])
			},	
			"warding stone" : {
				name : "Warding Stone",
				minlevel : 3,
				description : desc(["   You learn how to weave a protective enchantment on an item. That item gains a pool of temporary hit points equal to your Artificer level. Whoever is carrying this item gains any temporary hit points remaining in this pool, but these are lost when that creature is no longer carrying this item. This pool of temporary hit points refreshes when the Artificer that created it completes a long rest."])
			},	
			"weapon enchantment expertise (prereq: level 5 artificer)" : {
				name : "Weapon Enchantment Expertise",
				minlevel : 5,
				description : desc(["   When I cast magical weapon, elemental weapon, or vorpal weapon I can target a weapon that is already magical, adding to any effect the weapon already has.", "Additionally, magical weapon or vorpal weapon increases the damage dealt by 1d4 force damage, and elemental weapon makes the weapon deal an additional 1d4 damage of the selected type."]),				
				prereqeval : "classes.known.artificer.level >= 5"
			},
			"weapon enchantment mastery (prereq: weapon enchantment expertise, level 5 artificer)" : {
				name : "Weapon Enchantment Mastery",
				minlevel : 5,
				description : desc(["   When I cast magical weapon, elemental weapon, or vorpal weapon targeting any weapon, all of my Animated Weapons also gain the benefit of the enchantment.", "Additionally, when I make a Constitution saving throw to maintain Concentration on arcane weapon , magical weapon, elemental weapon, holy weapon, or vorpal weapon I have advantage on the roll."])				
			},
			"worn enchantment" : {
				name : "Worn Enchantment",
				minlevel : 3,
				description : desc(["   I can enchant an item I am wearing, such as a scarf or cloak to animate and assist me with a task, be it climbing a wall, grappling an enemy, or picking a lock. I can expend a 1st level spell slot to gain proficiency in a Strength or Dexterity skill until I complete a long rest. I can use up all the magic in the item to gain advantage on one check of that skill, immediately ending the effect."])
			},
		},
	},
};

ClassSubList["artificer-mindsmith"] = {
    regExpSearch : /mindsmith/i,
    subname : "Mindsmith",
    features : {

    }
};

ClassSubList["artificer-potionsmith"] = {
    regExpSearch : /potionsmith/i,
	source : ["KT:AR", 16],
    subname : "Potionsmith",
    features : {
		"potionsmith's_proficiency" : {
			name : "Potionsmith's Proficiency",
			source : ["KT:AR", 16],
			minlevel : 1,
			description : desc(["   I gain proficiency with Blowguns, Alchemist’s supplies and Herbalism kit.", "Creating a potion through normal crafting takes me only half the time and cost it would normally take."]),
			toolProfs : [["Alchemist's Supplies"], ["Herbalism kit"]],
		 },
		"alchemical reagents pouch" : {
			name : "Alchemical Reagents Pouch",
			source : ["KT:AR", 16],
			minlevel : 1,
			description : desc(["   I've acquired a pouch of useful basic reagents, much as a wizard might carry a component pouch. As long as I have this pouch, I can do alchemy. If I lose my reagent pouch, I can spend 50 gold to reaquire the stock I need, or spend 1 full day gathering them from nature."]),
		},
		"instant reactions" : {
			name : "Instant Reactions",
			source : ["KT:AR", 16],
			minlevel : 1,
			description : desc(["   I know how to get instant reactions to occur with just a few standard supplies. I can get these results out of a wide range of things I can gather in almost any locale and a pinch from I reagent pouch. See the \"Notes\" page for the Instant Reactions."]),
			toNotesPage : [{
                    name: "Potionsmith - Instant Reactions",
				source : ["KT:AR", 16],
                    popupName: "Potionsmith - Instant Reactions",
                    additional: "",
                    note: [
						"\u25C6 " + "Alchemical Fire" + "\n   " + "As an action I can produce a reaction causing a searing flame. At a point within 15 feet, I can a toss quick combination of reagents that will cause searing fire to flare up in a 5 foot radius. Creatures in that area have to make a dexterity saving throw, or take 1d8 fire damage. The damage damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
						"\n\u25C6 " + "Poisonous Gas" + "\n   " + "As an action I can produce a reaction causing noxious fumes. At a point within 15 feet, I can toss a quick combination of reagents that will cause a whiff of poisonous gas to erupt spreading to a radius of 5 feet. Creatures in that area have to make a constitution saving throw, or take 1d4 poison damage and become poisoned until the end of their next turn. The damage damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).",
						"\n\u25C6 " + "Healing Draught" + "\n   " + "As a bonus action, I can produce a combination that will provide potent magical healing. Immediately after creating the draught, I can use my action to consume it or administer it to a creature within 5 feet. A creature who drinks this draught regains 1d8 health. A creature can benefit from a number of these healing draughts equal to their constitution modifier (minimum 1), after which they provide no additional benefit until they complete a long rest. A Healing Draught that is not consumed by the end of your turn loses its potency. The healing increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."						
					],
			}]
		},
		"alchemical infusions" : {
			name : "Alchemical Infusions",
			source : ["KT:AR", 17],
			minlevel : 3,
			description : desc(["   I have found a way to skip most of the brewing process for alchemically creating potent effects by directly infusing the potion with my own magic. When I take a short or long rest and have an empty vial, I may choose one or more the following spells and use a spell slot(s) to cast them.", "1st | cure wounds, entangle, grease, heroism | | 2nd | barkskin, shatter, lesser restoration, web | | 3rd | blink, water breathing, stinking cloud, haste | | 4th | stoneskin, confusion | | 5th | cloudkill, skill empowerment |"]),
			spellcastingBonus : {
				name : "Alchemical Infusions",
				spells : ["cure wounds", "entangle", "grease", "heroism", "barkskin", "shatter", "lesser restoration", "web", "blink", "water breathing", "stinking cloud", "haste", "stoneskin", "confusion", "cloudkill", "skill empowerment"],
				selection : ["cure wounds", "entangle", "grease", "heroism", "barkskin", "shatter", "lesser restoration", "web", "blink", "water breathing", "stinking cloud", "haste", "stoneskin", "confusion", "cloudkill", "skill empowerment"],
				times : [0, 4, 4, 4, 9, 9, 9, 9, 13, 13, 13, 13, 15, 15, 15, 15, 17, 17, 17, 17],
			},			
		},
		"empowered alchemy" : {
			name : "Empowered Alchemy",
			source : ["KT:AR", 17],
			minlevel : 5,
			description : desc(["   When I deal damage, grant temporary hit points, or restore health with an instant reaction or alchemical infusion, I can add your intelligence modifier to the damage dealt or health restored."]) 
		},
		"infusion expertise" : {
			name : "Infusion Expertise",
			source : ["KT:AR", 17],
			minlevel : 14,
			description : desc(["   When I create an Alchemical Infusion during a short rest, the first alchemical infusion I create does not require a spell slot to infuse, and I can select an alchemical infusion that I would otherwise not have a spell slot of high enough level for when making this infusion."]),
		},
		"additional_upgrade" : {
            name : "Additional Upgrade",
            minlevel : 3,
            description : desc([
                "The number of upgrades I have for my class level is increased by one.",
                "The number of additional upgrades you get increases to two more than the class table at 5th level."
            ]),
            additional : ["", "", "1 upgrade", "1 upgrade", "2 upgrades", "2 upgrades", "3 upgrades", "3 upgrades", "4 upgrades", "4 upgrades", "5 upgrades", "5 upgrades", "6 upgrades", "6 upgrades", "7 upgrades", "7 upgrades", "8 upgrades", "8 upgrades", "9 upgrades", "9 upgrades"],
            extraname : "Infusion Upgrades",
			extrachoices : ["Adrenaline Serum", "Alchemical Acid", "Aroma Therapies (prereq: level 9 Artificer)", "Auto Injector", "Delivery Mechanism", "Elixir of Life (prereq: Philosopher's Stone, level 15 Artificer)", "Explosive Reaction", "Fortifying Fumes Reaction", "Frostbloom Reaction", "Greater Adrenaline Shot (prereq: Adrenaline Serum, level 9 Artificer)", "Inoculations", "Infusion Stone (prereq: level 9 Artificer)", "Mana Potion (prereq: level 9 Artificer)", "Philosopher's Stone (prereq: level 15 Artificer)", "Persistent Reactions", "Potent Reactions (prereq: level 9 Artificer)", "Poisoner's Proficiency", "Secrets of Flight", "Secrets of Fire", "Secrets of Frost", "Weapon Coating"],
			"adrenaline serum" : {
				name : "Adrenaline Serum",
				source : ["KT:AR", 17],
				minlevel : 3,
				description : "   I create a potent serum. As a bonus action on my turn, I can consume a dose of this serum. Consuming this Serum increases my Strength and Dexterity modifiers by my Intelligence modifier for a number of rounds equal to my Intelligence modifier. On the round that this wears off, my movement speed is zero and I cannot take any actions until the end of my turn. I can use this a number of times equal to your Con modifier (minimum 1) before you must take a short or long rest to gain the effects from the serum again.",
				action : ["bonus action", " "],
				usages : "Con mod per ",
					usagescalc : "event.value = Math.max(1, What('Con Mod'));",
				recovery : ["long rest", "short rest"],
			},
			"alchemical acid" : {
				name : "Alchemical Acid",
				source : ["KT:AR", 17],
				minnlevel : 3,
				description : "   As an action I can produce a reaction causing a caustic acid to form. I can a toss quick combination of reagents at a creature within 15 feet that will cause a splatter of acid in a 5 foot radius. Creatures in that area have to make a dexterity saving throw, or take 2d4 acid damage. Deals double damage against structures. The damage damage increases by 2d4 when you reach 5th level (4d4), 11th level (6d4), and 17th level (8d4).",
				action : ["action", " "]				
			},
			"aroma therapies (prereq: level 9 artificer)" : {
				name : "Aroma Therapies",
				source : ["KT:AR", 17],
				minlevel : 9,
				description : "   I expand your alchemical knowledge to be able to produce incense and simmering reagents that grant effects to those that inhale their fumes. If creatures spend a long rest inhaling fumes from a concoction I devise with this feature, creatures regain an extra 2d4 hit dice, recover from 1d4 levels of exhaustion and are cured of any non-magical diseases they are suffering from.",
				prereqeval : "classes.known.artificer.level >= 9"
			},
			"auto injector" : {
				name : "Auto Injector",
				source : ["KT:AR", 17],
				minlevel : 3,
				description : "   I create an automatic potion injector that I can wear. As an action, I can load a potion (either an infused potion or a normal potion) into this injector at any time. Subsequently while a potion is loaded into the injector, I can consume the potion using my reaction. Only one option can be held in the injector at a time.",
				action : ["action", "  "]
			},
			"delivery mechanism" : {
				name : "Delivery Mechanism",
				source : ["KT:AR", 17],
				minlevel : 3,
				description : "   I modify the stability of my reagents and develop a better delivery mechanism. I can target a point within 30 feet for my instant reactions that target a point. The additional precision allows me to better target the effects, allowing creatures of my choice within the target area to automatically pass a dexterity saving throw against my effects."
			},
			"elixir of life (prereq: philosopher's stone, level 15 artificer)" : {
				name : "Elixir of Life",
				source : ["KT:AR", 18],
				minlevel : 15,
				description : "   I can brew a special potion using my Philosopher Stone. Brewing this potion takes 8 hours and requires crushing a diamond worth at least 2,000 gold pieces. An Elixir of Life causes a creature that drinks it ceases to age for 4d4 years. A creature that drinks this Elixer gains a death ward effect that lasts until triggered. A more potent elixer can be created, adding an additional 1d4 years regained for each diamond spent.",
				prereqeval : "classes.known.artificer.level >= 15"
			},
			"explosive reaction" : {
				name : "Explosive Reaction",
				source : ["KT:AR", 18],
				minlevel : 3,
				description : "   I formulate a new instant reaction, a devastating minor explosion. Targeting a point within 15 feet, as an action, I cause an explosion. Creatures within 10 feet of the target point must make a Con saving throw, or take 1d10 thunder damage from the shockwave of the explosion. The damage damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).",
			},
			"fortifying fumes reaction" : {
				name : "Fortifying Fumes Reaction",
				source : ["KT:AR", 18],
				minlevel : 3,
				description : "   I formulate a new instant reaction, a powerful fortifying stimulate. Targeting a point within 15 feet, as an action, you cause fumes to erupt. Creatures within 10 feet of the target point can choose to hold their breath and not inhale, but creatures that inhale the fumes gain 1d4 temporary hit points, deal 1d4 additional damage on their next melee weapon attack, and have advantage on their next Constitution saving throw. Any remaining benefits fade at the end of your next turn. Both the temporary hit points and damage bonus increase by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4)."
			},
			"frostbloom reaction" : {
				name : "Frostbloom Reaction",
				source : ["KT:AR", 18],
				minlevel : 3,
				description : "   I formulate a new endothermic reaction, a devastating localized cold snap that creates an instant bloom of ice. Targeting a point within 15 feet, as an action, I cause an the area to erupt in frost. The area within 5 feet of the target point becomes difficult terrain until the end of my next turn, and any creature in the area must make a dexterity saving throw, or be caught by the ice taking 1d6 cold damage; a creature entirely in the area of effect that fails also becoming restrained until the end of their next turn. They can use their action to make a Strength saving throw to break free of the ice early. The damage damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
			},
			"greater adrenaline shot (prereq: adrenaline serum, level 9 artificer)" : {
				name : "Greater Adrenaline Shot",
				source : ["KT:AR", 18],
				minlevel : 9,
				description : "   I upgrade my adrenaline serum to produce an even more extreme and magical effect in the creature it effects. The adrenaline shot grants me temporary hit points equal to twice my Artificer level when I consume it. I have advantage on Strength (Athletics) checks, and it grants the effect of Haste and Heroism. These effects do not require concentration, but end when the serum ends.",
				prereqeval : "classes.known.artificer.level >= 9"
			},
			"inoculations" : {
				name : "Inoculations",
				source : ["KT:AR", 18],
				minlevel : 3,
				description : "   I gain resistance to poison damage. Additionally, myself and up to five allies of my choice are inoculated against the poisonous effects I can produce that require a constitution saving throw (such as the poisonous gas instant reaction or the cloudkill infusion).",
				dmgres : ["Poison"]
			},
			"infusion stone (prereq: level 9 artificer)" : {
				name : "Infusion Stone",
				source : ["KT:AR", 18],
				minlevel : 9,
				description : "   I use the secrets of Alchemy to create an Infusion Stone. I can use this stone once in the process of infusing potions in place of a spell slot level less than or equal to the highest level spell slot I can cast. It regains this charge after I complete a long rest.",
				usages : 1,
				recovery : "long rest",
				prereqeval : "classes.known.artificer.level >= 9"
			},
			"mana potion (prereq: level 9 artificer)" : {
				name : "Mana Potion",
				source : ["KT:AR", 18],
				minlevel : 9,
				description : "   During a short rest, I can create a mana potion. A mana potion loses its potency if it is not consumed within 1 hour. As an action, a creature can consume a mana potion to restore a spell slot of its choice, up to third level.",
				prereqeval : "classes.known.artificer.level >= 9"
			},
			"philosopher's stone (prereq: level 15 artificer)" : {
				name : "Philosopher's Stone",
				source : ["KT:AR", 18],
				minlevel : 15,
				decription : "   I create a Philosopher's Stone allowing me recreate wonders of alchemy. So long as I have a supply of non-gold metal, I can create up five pounds of gold a day (250 gold pieces worth).",
				prereqeval : "classes.known.artificer.level >= 15"
			},
			"persistent reactions" : {
				name : "Persistent Reactions",
				source : ["KT:AR", 19],
				minlevel : 3,
				description : "   My reactions that effect a target area persist in that area until the start of my next turn. Creatures entering the effect or ending their turn there have to repeat the saving throw against the effect. I can choose to make a reaction not persist at the time of taking the action to cause it."
			},
			"potent reactions (prereq: level 9 artificer)" : {
				name : "Potent Reactions",
				source : ["KT:AR", 19],
				minlevel : 9,
				description : "   I refine my reactions increasing their potency. The die I roll to determine the damage or healing effect of my reactions is increased by one. A d4 becomes a d6, a d6 becomes a d8, a d8 becomes a d10, and a d10 becomes a d12.",
				prereqeval : "classes.known.artificer.level >= 9"
			},
			"poisoner's proficiency" : {
				name : "Poisoner's Proficiency",
				source : ["KT:AR", 19],
				minlevel : 3,
				description : "\n   I delve into the secrets of the darkest secrets of herblore, learning the potent secrets of poison. During a long rest, I can create one of the three following poisons." + "\n\u25C6" + "Contact Poison" + "\n   " + "I can apply this to a weapon or up to ten pieces of ammunition, lasting until the end of my next long rest. That weapon deals an additional 1d4 poison damage to targets it strikes." + "\n\u25C6" + "Ingested Poison" + "\n   " + "This a simple flavorless powder. If a creature consumes a full dose of this poison before the end of my next long rest, after one minute has passed they must make a Con saving throw with disadvantage against my spell save DC or take a number of d10 equal to my Artificer level in poison damage, and become poisoned until they complete a long rest." + "\n\u25C6" + "Inhaled Poison" + "\n   " + "This poison can be used to modify my Poisonous Gas reaction. Anytime before the end of my next long rest, I can use this dose of poison to make my Poisonous Gas instant reaction have a radius of 10 feet and deal twice as much damage on a failed save."
			},
			"secrets of flight" : {
				name : "Secrets of Flight",
				source : ["KT:AR", 19],
				minlevel : 3,
				description : "   You learn the secrets of infusing powerful enhancements into your Alchemical Infusions. You can add the following spells to your list of available spells for alchemical infusions: 1st level feather fall, 2nd level levitate, 3rd level fly",
				spellcastingBonus : {
					name : "Secrets of Flight",
					spells : ["feather fall", "levitate", "fly"],
					selection :["feather fall", "levitate", "fly"],
					times : [0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
				},
			},
			"secrets of fire" : {
				name : "Secrets of Fire",
				source : ["KT:AR", 19],
				minlevel : 3,
				description : "   You learn the secrets of infusing fire into your Alchemical Infusions. You can add the following spells to your list of available spells for alchemical infusions: 1st level faerie fire, 2nd dragon's breath, 3rd fireball",
				spellcastingBonus : {
					name : "Secrets of Flight",
					spells : ["faerie fire", "dragon's breath", "fireball"],
					selection :["faerie fire", "dragon's breath", "fireball"],
					times : [0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
				},
			},
			"secrets of frost" : {
				name : "Secrets of Frost",
				source : ["KT:AR", 19],
				minlevel : 3,
				description : "   You learn the secrets of infusing frost into your Alchemical Infusions. You can add the following spells to your list of available spells for alchemical infusions: 1st level armor of agathys, 2nd snilloc's snowball swarm, 3rd ice storm",
				spellcastingBonus : {
					name : "Secrets of Flight",
					spells : ["armor of agathys", "snilloc's snowball swarm", "ice storm"],
					selection :["armor of agathys", "snilloc's snowball swarm", "ice storm"],
					times : [0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
				},
			},
			"weapon coating" : {
				name : "Weapon Coating",
				source : ["KT:AR", 19],
				minlevel : 3,
				description : "   I learn to how to coat a weapon or piece of ammunition with one of my instant reactions to take effect on hit. As a bonus action, I can apply your instant reaction to a melee weapon or piece of ammunition. Until the end of my turn, the next hit with that weapon or with a coated piece of ammunition will cause the effect of the instant reaction to the target. The creature automatically takes the damage or healing associated with the reaction, but makes a saving throw as normal against any additional effects.",
				action : ["bonus action", " "]
			},
		},
			
    }

};


ClassSubList["artificer-runesmith"] = {
    regExpSearch : /runesmith/i,
    subname : "Runesmith",
    features : {

    }
};

ClassSubList["artificer-warsmith"] = {
    regExpSearch : /warsmith/i,
    subname : "Warsmith",
    features : {
        "warsmithproficiency" : {
            name : "Warsmith's Proficiency",
            minlevel : 1,
            description : desc([
                "I gain proficiency with Heavy Armor and Smith's Tools."
            ]),
            toolProfs : [["Smith's Tools", "Dex"]],
            armor : [true, true, true, false],
            weapons: [true, true]
        },
        "mechplategauntlet" : {
            name : "Mechplate Gauntlet",
            minlevel : 1,
            description : desc([
                "I have constructed a Mechplate Gauntlet",
                "If you lose your mechplate gauntlet, you can remake it during a long rest with 25 gold worth of materials, or can scavenge for materials and forge it over two days of work (eight hours a day) without the material expense."
            ]),
            eval : "AddWeapon('mechplate gauntlet');",
            removeeval : "RemoveWeapon('mechplate gauntlet');",
            spellcastingBonus : {
                spells : ["shocking grasp"], 
                selection : ["shocking grasp"],
                times : 1
            }
        },
        "mechplate" : {
            name : "Mechplate",
            minlevel : 3,
            description : desc([
                "At 3rd level, you've attained the Forging skill, arcane knowledge, and mastery of tinkering to create a set of Mechplate from a standard, nonmagical, set of heavy armor using resources you've gathered. This process takes 8 hours to complete, as well as place to forge and incorporates your Mechplate Gauntlet (they do not require separate attunement).",
                "You can create a new set of Mechplate be forging it from a set of Platemail, in a process takes 1000 gold pieces and eight hours.",
                "You can create multiple sets of Mechplate, but you can only be attuned to one of them at a given time, and you can only change which one you are attuned to during a long rest. If you create a new set of Mechplate, you can apply a number of Upgrades equal to the value on the class table, applying each at the level you get it on the class table."
            ]),
            eval : "AddArmor('Mechplate');",
            removeeval : "RemoveArmor('Mechplate');",
            additional : ["", "", "1 upgrade", "1 upgrade", "2 upgrades", "2 upgrades", "3 upgrades", "3 upgrades", "4 upgrades", "4 upgrades", "5 upgrades", "5 upgrades", "6 upgrades", "6 upgrades", "7 upgrades", "7 upgrades", "8 upgrades", "8 upgrades", "9 upgrades", "9 upgrades"],
            extraname : "Mechplate Upgrades",
            extrachoices : ["Accelerated Movement", "Active Camouflage (prereq: level 5 Artificer)", "Adaptable Armor", "Arcane Visor (prereq: level 15 Artificer, Darkvision Visor)", "Armor Class (prereq: level 5 Artificer)", "Cloaking Device (prereq: Active Camoflage)", "Darkvision Visor", "Collapsible (prereq: level 5 Artificer)", "Energy Surge", "Flame Projector (prereq: level 9 Artificer, Incompatible with other projectors.)", "Flash Freeze Capacitor (prereq: level 11 Artificer, Incompatible with other capacitors.)", "Flight (prereq: level 9 Artificer)", "Force Blast", "Grappling Reel", "Integrated Weapon", "Integrated Attack (prereq: level 9 Artificer, Integrated Weapon)", "Lightning Projector (prereq: level 9 Artificer, Incompatible with other projectors.)", "Mechsuit (Incompatible with Expanded and Sealed Suit upgrades.)", "Piloted Golem (prereq: Fully upgraded Powered Limbs. Incompatible with Collapsible.)", "Powered Limbs", "Power Slam Capacitor (prereq: level 11 Artificer, Incompatible with other capacitors.)", "Power Fist", "Reactive Plating (prereq: level 15 Artificer)", "Recall (prereq: level 15 Artificer)", "Resistance", "Relocation Matrix (prereq: level 15 Artificer)", "Sealed Suit (prereq: level 5 Artificer)", "Sentient Armor", "Sun Cannon (prereq: level 15 Artificer)", "Virtual Wizard (prereq: level 15 Artificer, Fully upgraded Sentient Armor)"],
            "accelerated movement": {
                name : "Accelerated Movement",
                description : desc([
                    "You reduce the weight of your Mechplate’s bulk and increase the power to joints. The Mechplates weight is reduced by 15 lbs.",
                    "While wearing your Mechplate your speed increases by 10 feet. This applies to all movement speeds you have while wearing your armor.",
                    "You can apply this upgrade up to 2 times."
                ]),
                speed : { allModes : "+10" },
                prereqeval : ""
            },
            "active camouflage (prereq: level 5 artificer)": {
                name : "Active Camouflage",
                description : desc([
                    "As an action, you can activate active camouflage causing your suit to automatically blend into its surroundings. This lasts until deactivated.",
                    "While this active, you are considered lightly obscured, and can hide from a creature even when they have a clear line of sight to you.",
                    "Wisdom (Perception) checks to find you that rely on vision are made with disadvantage."
                ]),
                action : ["action", ""],
                prereqeval : "classes.known.artificer.level >= 5"
            },
            "adaptable armor": {
                name : "Adaptable Armor",
                description : desc([
                    "You integrate deployable hooks and fins into your armor, augmenting its mobility.",
                    "While wearing your Mechplate you gain a climbing speed equal to your walking speed, and you can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free.",
                    "Additionally, you gain a swim speed equal to your walking speed."
                ]),
                speed : { climb : { spd : "walk" }, swim : { spd : "walk" }},
                prereqeval : ""
            },"arcane visor (prereq: level 15 artificer, darkvision visor)": {
                name : "Arcane Visor",
                description : desc([
                    "You add a heavily enchanted visor to your Mechplate that augments your vision. The Visor has 6 Charges.",
                    "Once it is integrated into your armor, you can use an Action to expend 1 or more of its Charges to cast one of the following Spells from it, using your spell save DC: See Invisibility (2 charges) or True Seeing (4 charges).",
                    "It regains all charges on a long rest."
                ]),
                recovery : "long rest",
                usages : 6,
                action : ["action", ""],
                spellcastingBonus : {
                    name : "Arcane Visor",
                    spells : ["see invisibility", "true seeing"],
                    selection : ["see invisibility", "true seeing"],
                    times : 2
                },
                prereqeval : "classes.known.artificer.level >= 15"
            },
            "armor class (prereq: level 5 artificer)": {
                name : "Armor Class",
                description : desc([
                    "You inforce the structure and materials that make up your Mechplate. Your Mechplate's Armor Class (AC) increases by 1.",
                    "You can apply this upgrade up to 3 times."
                ]),
                prereqeval : "classes.known.artificer.level >= 5"
            },
            "cloaking device (prereq: active camoflage)": {
                name : "Cloaking Device",
                description : desc([
                    "You install an Arcane Cloaking device on your Mechplate . This device has 4 Charges.",
                    "You can expend 1 or more charges to cast one of the following spells using its action: Invisibility (2 charges), Greater Invisibility (4 charges).",
                    "It regains all charges after a long rest."
                ]),
                recovery : "long rest",
                usages : 4,
                action : ["action", ""],
                spellcastingBonus : {
                    name : "Cloaking Device",
                    spells : ["invisibility", "greater invisibility"],
                    selection : ["invisibility", "greater invisibility"],
                    times : 2
                },
                prereqeval : "classes.known.artificer.level >= 5"
            },
            "collapsible (prereq: level 5 artificer)": {
                name : "Collapsible",
                description : desc([
                    "Your Mechplate can collapse into a case for easy storage. When transformed this way the armor is indistinguishable from a normal case and weighs 1/3 its normal weight.",
                    "As an action you can don or doff the armor, allowing it to transform as needed."
                ]),
                action : ["action", "(don/doff Mechplate)"],
                prereqeval : "classes.known.artificer.level >= 5"
            },
            "darkvision visor": {
                name : "Darkvision Visor",
                description : desc([
                    "While wearing your Mechplate, you have darkvision to a range of 60 feet.",
                    "If you already have darkvision, this upgrade increases its range by 60 feet."
                ]),
                vision : [["Darkvision", "fixed 60"], ["Darkvision", "+60"]],
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "energy surge": {
                name : "Energy Surge",
                description : desc([
                    "You upgrade your Mechplate gauntlet to support delievering a energy surge.",
                    "You can use a bonus action to overcharge your gauntlet, and the next Shocking Grasp or Force Blast you hit an enemy with during that turn deals an additional 1d8 lightning damage and knocks a Large or smaller target 10 feet directly away from you."
                ]),
                action : ["bonus action", ""],
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "flame projector (prereq: level 9 artificer, incompatible with other projectors.)": {
                name : "Flame Projector",
                description : desc([
                    "The Projector has 6 Charges.",
                    "Once it is integrated into your armor, you can use an action to expend 1 or more of its Charges to cast one of the following Spells from it, using your spell save DC: Burning Hands (1 charge), Fireball (3 charges), or Wall of Fire (4 charges).",
                    "It regains all charges on a long rest."
                ]),
                recovery : "long rest",
                usages : 6,
                action : ["action", ""],
                spellcastingBonus : {
                    name : "Flame Projector",
                    spells : ["burning hands", "fireball", "wall of fire"],
                    selection : ["burning hands", "fireball", "wall of fire"],
                    times : 3
                },
                prereqeval : "classes.known.artificer.level >= 9"
            },
            "flash freeze capacitor (prereq: level 11 artificer, incompatible with other capacitors.)": {
                name : "Flash Freeze Capacitor",
                description : desc([
                    "You install a capacitor that builds an icy chill until it unleashed in a deadly burst.",
                    "As an action, you can unleash it, casting Cone of Cold, and the area effected freezes, becoming difficult terrian until the start of your next turn.",
                    "Once you use this ability, you cannot use it again until you complete a long rest."
                ]),
                spellcastingBonus : {
                    name : "Flash Freeze Capacitor",
                    spells : ["cone of cold"],
                    selection : ["cone of cold"],
                    times : 1
                },
                prereqeval : "classes.known.artificer.level >= 11"
            },
            "flight (prereq: level 9 artificer)": {
                name : "Flight",
                description : desc([
                    "You integrate a magical propulsion system, integrated in into your Mechplate.",
                    "While wearing your Mechplate you have a Magical flying speed of 30 feet."
                ]),
                speed : { fly : { spd : "walk" }},
                prereqeval : "classes.known.artificer.level >= 9"
            },
            "force blast": {
                name : "Force Blast",
                description : desc([
                    "You upgrade your Mechplate gauntlet to allow you to make a ranged spell attack.",
                    "The weapon fires blasts of arcane energy which deal 1d8 + your Intelligence modifier Force damage. The range is 30 feet.",
                    "You are proficient in this weapon. When you take the attack action, you can use this ranged spell attack in place of any attack made."
                ]),
                eval : "AddWeapon('force blast');",
                removeeval : "RemoveWeapon('force blast');",
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "grappling reel": {
                name : "Grappling Reel",
                description : desc([
                    "Your Mechplate gains an integrated grappling reel set into your gauntlet.",
                    "As 1 attack or 1 action, you may target a surface, object or creature within 40 feet. If the target is Large or Smaller, you can make a Grapple check to pull it to you and Grapple it.",
                    "Alternatively, if the target is Large or larger, you can choose to be pulled to it, this does not grapple it."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "integrated weapon": {
                name : "Integrated Weapon",
                description : desc([
                    "You integrate a melee weapon into your Mechplate. When you apply this upgrade you must have a weapon to integrate, and you must choose where on your armor the weapon is located.",
                    "You must treat it as though you are wielding it with one hand, but you cannot be disarmed of it. Once activated, you can use this weapon when you take the attack action, and it does not require the use of a hand or your mechplate gauntlet.",
                    "The weapon cannot have the Heavy property. You are proficient with this weapon. As a bonus action you can activate the weapon.",
                    "You can apply this upgrade multiple times, selecting a new weapon and new location on your armor to install it."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "integrated attack (prereq: level 9 artificer, integrated weapon)": {
                name : "Integrated Attack",
                description : desc([
                    "When you activate your Integrated weapon, you can immediately make one attack with it.",
                    "While it is active, you can make an attack with it using your bonus action."
                ]),
                prereqeval : "classes.known.artificer.level >= 9"
            },
            "lightning projector (prereq: level 9 artificer, incompatible with other projectors.)": {
                name : "Lightning Projector",
                description : desc([
                    "The Projector has 6 Charges.",
                    "Once it is integrated into your armor, you can use an action to expend 1 or more of its Charges to cast one of the following Spells from it, using your spell save DC: Thunderwave (1 charge), Lightning Bolt (3 charges), or Storm Sphere (4 charges).",
                    "It regains all charges on a long rest."
                ]),
                recovery : "long rest",
                usages : 6,
                action : ["action", ""],
                spellcastingBonus : {
                    name : "Lightning Projector",
                    spells : ["thunderwave", "lightning bolt", "storm sphere"],
                    selection : ["thunderwave", "lightning bolt", "storm sphere"],
                    times : 3
                },
                prereqeval : "classes.known.artificer.level >= 9"
            },
            "mechsuit (incompatible with expanded and sealed suit upgrades.)": {
                name : "Mechsuit",
                description : desc([
                    "You rebuild your Mechplate to remove the heavy plating.",
                    "You can retain all benefits and upgrades of the Mechplate, but now serves only as Medium armor, providing a base of 15 AC, and its weight is reduced to 40 lbs."
                ]),
                eval : "RemoveArmor('MechPlate'); AddArmor('Mechsuit');",
                removeeval : "RemoveArmor('Mechsuit'); AddArmor('Mechplate');",
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "piloted golem (prereq: fully upgraded powered limbs. incompatible with collapsible.)": {
                name : "Piloted Golem",
                description : desc([
                    "You enlarge your Mechplate, turning it into a piloted mechanical golem.",
                    "Your size category when wearing the armor increases by one, and you have advantage on Strength checks and Strength saving throws."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "powered limbs": {
                name : "Powered Limbs",
                description : desc([
                    "You upgrade frame and limbs of your armor. The bonus your Mechplate grants to your Strength score and maximum Strength score increases by 1 while wearing this armor.",
                    "You can apply this upgrade up to 3 times."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "power slam capacitor (prereq: level 11 artificer, incompatible with other capacitors.)": {
                name : "Power Slam Capacitor",
                description : desc([
                    "You install a capacitor that builds up destructive energy.",
                    "As an Action, you can leap a distance up to your movement speed, casting Destructive Wave upon landing.",
                    "Once you use this ability, you cannot use it again until you complete a long rest."
                ]),
                spellcastingBonus : {
                    name : "Power Slam Capacitor",
                    spells : ["destructive wave"],
                    selection : ["destructive wave"],
                    times : 1
                },
                prereqeval : "classes.known.artificer.level >= 11"
            },
            "power fist": {
                name : "Power Fist",
                description : desc([
                    "You upgrade your Mechplate gauntlet to reflect a commitment to using it to punch things, with increased reinforcement and weight, and better arm support from your suit.",
                    "Your Mechplate gauntlet's unarmed strike is upgraded to deal 1d8 bludgeoning damage and gains the Special properity.",
                    "Special: When you make an attack roll, you can choose to forgo adding your Proficiency modifier to the attack roll. If the attack hits, you can add double your Proficiency modifier to the damage roll."
                ]),
                eval : "RemoveWeapon('mechplate gauntlet'); AddWeapon('power gauntlet');",
                removeeval : "RemoveWeapon('power gauntlet'); AddWeapon('mechplate gauntlet');",
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "reactive plating (prereq: level 15 artificer)": {
                name : "Reactive Plating",
                description : desc([
                    "You install special heavy plating, giving you resistance to bludgeoning, piercing, and slashing damage from non-magical sources while wearing your Mechplate.",
                    "In addition, you can use your reaction when hit by an attack to reduce the damage of that attack by an amount equal to your proficiency bonus."
                ]),
                action : ["reaction", ""],
                dmgres : [["Bludgeoning", "Bludg. (nonmagical)"], ["Piercing", "Pierc. (nonmagical)"], ["Slashing", "Slash. (nonmagical)"]],
                prereqeval : "classes.known.artificer.level >= 15"
            },
            "recall (prereq: level 15 artificer)": {
                name : "Recall",
                description : desc([
                    "When not being worn you can hide your Mechplate in a pocket dimension.",
                    "As an action on your turn you can magically summon the armor and don it. You can use a bonus action to return the armor to the pocket dimension.",
                    "While in the pocket dimension the armor cannot be affected by other abilities and cannot be interacted with in any way."
                ]),
                eval : "AddAction('bonus action', 'Recall (doff Mechplate)', 'Artificer (Warsmith)');",
	            removeeval : "RemoveAction('bonus action', 'Recall (doff Mechplate)');",
                action : ["action", " (don Mechplate)"],
                prereqeval : "classes.known.artificer.level >= 15"
            },
            "resistance": {
                name : "Resistance",
                description : desc([
                    "You tune your Mechplate against certain forms of damage.",
                    "Choose acid, cold, fire, force, lightning, necrotic, radiant, or thunder damage. While wearing your Mechplate you have resistance to that type of damage.",
                    "If you apply this upgrade more than once you must choose a different damage type."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "relocation matrix (prereq: level 15 artificer)": {
                name : "Relocation Matrix",
                description : desc([
                    "You install an arcane transmutation matrix that you can use to convert your magical power into dimensional warp.",
                    "As an action, you can cast Dimension Door without expending a spell slot.",
                    "Once you use this ability, you can not use it again until you complete a long rest."
                ]),
                prereqeval : "classes.known.artificer.level >= 15"
            },
            spellcastingBonus : {
                name : "Relocation Matrix",
                spells : ["dimension door"],
                selection : ["dimension door"],
                oncelr : true,
                times : 1
            },
            "sealed suit (prereq: level 5 artificer)": {
                name : "Sealed Suit",
                description : desc([
                    "As a bonus action on your turn you can environmentally seal your Mechplate, giving you an air supply for up to 1 hour and making you immune to poison (but not curing you of existing poisoned conditions).",
                    "Your armor regains 1 minute of air for every minute that you are not submerged and the armor is not sealed.",
                    "In addition to the above, you are also considered adapted to cold and hot climates while wearing your armor, and you’re also acclimated to high altitude while wearing your armor."
                ]),
                prereqeval : "classes.known.artificer.level >= 5"
            },
            "sentient armor": {
                name : "Sentient Armor",
                description : desc([
                    "You install an artificial personality into your Mechplate, making it a sentient item. This sentience assists you in all ways.",
                    "The bonus your Mechplate grants to your Intelligence score and maximum Intelligence score increases by 1 while wearing this armor. You can apply this upgrade up to 2 times.",
                    "Additionally, when this is fully upgraded, you cannot be surprised while wearing your Mechplate."
                ]),
                prereqeval : "classes.known.artificer.level >= 1"
            },
            "sun cannon (prereq: level 15 artificer)": {
                name : "Sun Cannon",
                description : desc([
                    "You install a sun cannon into your mechplate, allowing for emmiting devestating solar lazer blasts.",
                    "As an action, you can cast Sunbeam without expending a spell slot.",
                    "Once you use this ability, you can not use it again until you complete a long rest."
                ]),
                spellcastingBonus : {
                    name : "Sun Cannon",
                    spells : ["sunbeam"],
                    selection : ["sunbeam"],
                    oncelr : true,
                    times : 1
                },
                prereqeval : "classes.known.artificer.level >= 15"
            },
            "virtual wizard (prereq: level 15 artificer, fully upgraded sentient armor)": {
                name : "Virtual Wizard",
                description : desc([
                    "While wearing your Mechplate, your Mechplates built in intelligence assists your spell casting.",
                    "Your spell save DC and spell attack bonus are each increased by 2."
                ]),
                prereqeval : "classes.known.artificer.level >= 15"
            }
        },
        "extra_attack" : {
            name : "Extra Attack",
            minlevel : 5,
            description : desc([
                "Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn."
                ]),
            eval : "ClassList['artificer'].attacks = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]",
            removeeval : "ClassList['artificer'].attacks = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]"
        },
        "fully_customized_gear" : {
            name : "Fully Customized Gear",
            minlevel : 14,
            description : desc([
                "Starting at 14th level, you've mastered the customization of your Mechplate. You can immediately select two additional upgrades that do not count against your class upgrade total for your Mechplate.",
                "Additionally, during a long rest, you can now swap out any one upgrade for any other upgrade of the same level requirements, so long as you don't have upgrade that requires the upgrade you are removing as a prerequisite, or an incompatible upgrades."
                ])
        }
    }
};

ClassSubList["artificer-wandsmith"] = {
    regExpSearch : /wandsmith/i,
    subname : "Wandsmith",
    features : {

    }
};

/*
    Wonderous Class Items
*/

//Fleshsmith weapons and armor
WeaponsList["extra fangs"] = {
    regExpSearch : /^(?=.*extra fangs).*$/i,
    name : "Extra Fangs",
    source : ["KT:AR"],
    ability : 2,
    type : "Natural",
    damage : [1, 6, "Piercing"],
    range : "melee",
    description : "",
    abilitytodamage : true,
    modifiers : ["Dex", ""],
    monkweapon : false,
};

WeaponsList["extra tentacle"] = {
    regExpSearch : /^(?=.*extra tentacle).*$/i,
    name : "Extra Tentacle",
    source : ["KT:AR"],
    ability : 1,
    type : "Natural",
    damage : [1, 4, "bludgeoning"],
    range : "melee",
    description : "has reach",
    abilitytodamage : true,
    modifiers : ["Str", ""],
    monkweapon : false,
};

WeaponsList["retractable claws"] = {
    regExpSearch : /^(?=.*retractable claws).*$/i,
    name : "Retractable Claws",
    source : ["KT:AR"],
    ability : 2,
    type : "Natural",
    damage : [1, 6, "slashing"],
    range : "melee",
    description : "",
    abilitytodamage : true,
    modifiers : ["Dex", ""],
    monkweapon : false,
};

ArmourList["subdermal plating"] = {
	regExpSearch : /^(?=.*subdermal plating).*$/i,
	name : "Subdermal Plating",
	source : ["KT:AR"],
	type : "natural",
	ac : 16,
	dex : 2
	};

// Cannonsmith
WeaponsList["thunder cannon"] = {
    regExpSearch : /^(?=.*thunder cannon).*$/i,
    name : "Thunder Cannon",
    source : ["HB", 0],
    ability : 2,
    type : "Natural",
    damage : [2, 6, "Piercing"],
    range : "60/180 ft",
    description : "Two-handed, loud, reload(1)",
    abilitytodamage : false,
    modifiers : ["Dex", ""],
    monkweapon : false,
    weight : 15
};
// Gadgetsmith
WeaponsList["boomerang of hitting"] = {
    regExpSearch : /^(?=.*boomerang of hitting).*$/i,
    name : "Boomerang of Hitting",
    source : ["HB", 0],
    ability : 2,
    type : "Natural",
    damage : [1, 4, "Bludgeoning"],
    range : "30/60 ft",
    description : "Thrown. Finesse. Special: When this weapon is Thrown, you can make target up three seperate targets within 10 feet of each other, making a seperate attack roll against each target.",
    abilitytodamage : true,
    monkweapon : true
};

// Potionsmith

// Runesmith

// Warsmith
WeaponsList["mechplate gauntlet"] = {
    regExpSearch : /^(?=.*mechplate gauntlet).*$/i,
    name : "Mechplate Gauntlet",
    source : ["HB", 0],
    ability : 1,
    type : "Natural",
    damage : [1, 6, "Bludegoning"],
    range : "Melee",
    description : "While wearing this gauntlet, you have proficiency in Martial Weapons, unarmed strikes using this gauntlet deal 1d6 bludgeoning damage, and you learn the Shocking Grasp cantrip and can cast it through the gauntlet.",
    abilitytodamage : true,
    monkweapon : false
};
WeaponsList["force blast"] = {
    regExpSearch : /^(?=.*force blast).*$/i,
    name : "Force Blast",
    source : ["HB", 0],
    ability : 4,
    type : "Natural",
    damage : [1, 8, "Force"],
    range : "30 ft",
    description : "You upgrade your Mechplate gauntlet to allow you to make a ranged spell attack.",
    abilitytodamage : true,
    monkweapon : false
};
WeaponsList["power gauntlet"] = {
    regExpSearch : /^(?=.*power gauntlet).*$/i,
    name : "Power Gauntlet",
    source : ["HB", 0],
    ability : 1,
    type : "Natural",
    damage : [1, 8, "Bludegoning"],
    range : "Melee",
    description : "Special: When you make an attack roll, you can choose to forgo adding your Proficiency modifier to the attack roll. If the attack hits, you can add double your Proficiency modifier to the damage roll.",
    abilitytodamage : true,
    monkweapon : false
};
ArmourList["mechplate"] = {
    regExpSearch : /^(?=.*mechplate).*$/i,
    name : "Mechplate",
    source : ["HB", 0],
    type : "heavy",
    ac : 18,
    stealthdis : true,
    weight : 105,
    description : "While wearing your Mechplate your Strength score increases by 2, and your maximum Strength score increase by the same amount. Additionally, you count as one size larger when determining the weight you can push, drag, or lift. A small creature wearing mechplate becomes a medium sized creature while wearing the mechplate."
};
ArmourList["mechsuit"] = {
    regExpSearch : /^(?=.*mechsuit).*$/i,
    name : "Mechsuit",
    source : ["HB", 0],
    type : "medium",
    ac : 15,
    stealthdis : false,
    weight : 40,
    description : "While wearing your Mechsuit your Strength score increases by 2, and your maximum Strength score increase by the same amount. Additionally, you count as one size larger when determining the weight you can push, drag, or lift. A small creature wearing mechsuit becomes a medium sized creature while wearing the mechsuit."
};

// Wandsmith








