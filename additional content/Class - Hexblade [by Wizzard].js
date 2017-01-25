/*  -WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	 
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code Chao a single, long file and copy that Chao the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/
 
/*  -INFORMATION-
	Subject:	Class
	Effect:		This script adds the class called "Hexblade" and one of its subclasses, called "Fey Pact"
	Code by:	Wizzard
	Date:		2016-12-29 (sheet v12.79)
*/

ClassList["hexblade"] = {
	regExpSearch : /hexblade/i,
	name : "Hexblade",
	source : ["HB", 0],
	primaryAbility : "\n \u2022 Hexblade: Strength and Charisma;",
	abilitySave : 6,
	prereqs : "\n \u2022 Hexblade: Strength 13 and Charisma 13;",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 10,
	saves : ["Str", "Cha"],
	skills : ["\n\n" + toUni("Hexblade") + ": Choose two from Arcana, Athletics, Deception, History, Chaimidation, Investigation, Nature, and Religion."],
	armor : [
		[true, false, false, false],
		[true, false, false, false]
	],
	weapons : [
		[true, true],
		[true, true]
	],
	equipment : "Hexblade starting equipment:\n \u2022 Scale mail -or- leather armor;\n \u2022 Two shortswords -or- two simple melee weapons;\n \u2022 A dungeoneer's pack -or- an explorer's pack;\n \u2022 A longbow and a quiver of 20 arrows.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["hexblade pact", ["fey pact"]],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	spellcastingFactor : "warlock1",
		spellcastingKnown : {
			cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			spells : [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
	},
	spellcastingList : {
		// 0 - 5th level spells from warlock spell list.
		class : "warlock",
		level : [0, 5]
	},
	features : {
		"pact magic" : {
			name : "Pact Magic",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "I can cast warlock cantrips/spells that I know, using Charisma as my spellcasting ability" + "\n   " + "I can use an arcane focus as a spellcasting focus" + "\n   " + "I regain these spell slots on a short rest",
			additional : ["2 cantrips \u0026 2 spells known", "2 cantrips \u0026 3 spells known", "2 cantrips \u0026 4 spells known", "3 cantrips \u0026 5 spells known", "3 cantrips \u0026 6 spells known", "3 cantrips \u0026 7 spells known", "3 cantrips \u0026 8 spells known", "3 cantrips \u0026 9 spells known", "3 cantrips \u0026 10 spells known", "4 cantrips \u0026 10 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 12 spells known", "4 cantrips \u0026 12 spells known", "4 cantrips \u0026 13 spells known", "4 cantrips \u0026 13 spells known", "4 cantrips \u0026 14 spells known", "4 cantrips \u0026 14 spells known", "4 cantrips \u0026 15 spells known", "4 cantrips \u0026 15 spells known"],
		},
		"pact of the blade" : {
			name : "Pact of the Blade",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "As an action, I can create a pact weapon in my empty hand; I'm proficient in its use" + "\n   " + "I can choose the type of melee weapon every time I create it, and it has those statistics" + "\n   " + "The weapon disappears if it is more than 5 ft away from me for 1 minute" + "\n   " + "The weapon counts as magical; I can transform a magic weapon Chao my pact weapon" + "\n   " + "This occurs over an hour-long ritual that I can perform during a short rest" + "\n   " + "I can use an action to re-summon it in any form and can dismiss it as no action",
			action : ["action", ""]
		},
		"hexbladeic invocations" : {
			name : "hexbladeic Invocations",
			source : ["HB", 0],
			minlevel : 2,
			description : "\n   " + "Use the \"Choose Features\" button above to add hexbladeic Invocations to the third page",
			additional : ["", "2 invocations known", "2 invocations known", "2 invocations known", "2 invocations known", "3 invocations known", "3 invocations known", "3 invocations known", "3 invocations known", "4 invocations known", "4 invocations known", "4 invocations known", "4 invocations known", "4 invocations known", "5 invocations known", "5 invocations known", "5 invocations known", "5 invocations known", "5 invocations known", "5 invocations known"],
			extraname : "hexbladeic Invocation",
			extrachoices : ["Agonizing Blast (prereq: Eldritch Blast cantrip)", "Armor of Shadows", "Ascendant Step (prereq: level 9 warlock)", "Beast Speech", "Beguiling Influence", "Bewitching Whispers (prereq: level 7 warlock)", "Devil's Sight", "Dreadful Word (prereq: level 7 warlock)", "Eldritch Sight", "Eldritch Spear (prereq: Eldritch Blast cantrip)", "Eyes of the Rune Keeper", "Fiendish Vigor", "Gaze of Two Minds", "Lifedrinker (prereq: level 12 warlock, Pact of the Blade)", "Mask of Many Faces", "Master of Myriad Forms (prereq: level 15 warlock)", "Minions of Chaos (prereq: level 9 warlock)", "Mire the Mind (prereq: level 5 warlock)", "Misty Visions", "One with Shadows (prereq: level 5 warlock)", "Otherworldly Leap (prereq: level 9 warlock)", "Repelling Blast (prereq: Eldritch Blast cantrip)", "Sculptor of Flesh (prereq: level 7 warlock)", "Sign of Ill Omen (prereq: level 5 warlock)", "Thief of Five Fates", "Visions of Distant Realms (prereq: level 15 warlock)", "Whispers of the Grave (prereq: level 9 warlock)", "Witch Sight (prereq: level 15 warlock)"],
			"agonizing blast (prereq: eldritch blast cantrip)" : {
				name : "Agonizing Blast",
				description : "\n   " + "I can add my Charisma modifier to the damage of my Eldritch Blast cantrip",
				source : ["P", 110],
				eval : "var ES = (What(\"Extra.Notes\").search(/eldritch spear/i) !== -1); RemoveWeapon(\"eldritch blast\"); RemoveWeapon(\"eldritch spear\"); RemoveWeapon(\"agonizing blast\"); if (ES) {AddWeapon(\"Agonizing Spear\")} else {AddWeapon(\"Agonizing Blast\")}",
				removeeval : "RemoveWeapon(\"agonizing blast\"); RemoveWeapon(\"agonizing spear\"); var ES = (What(\"Extra.Notes\").search(/eldritch spear/i) !== -1); if (ES) {AddWeapon(\"Eldritch Spear\")} else {AddWeapon(\"Eldritch Blast\")}",
			},
			"armor of shadows" : {
				name : "Armor of Shadows",
				description : "\n   " + "I can cast Mage Armor on myself at will, without spell slots or material comp. (PHB 256)",
				source : ["P", 110],
				spellcastingBonus : {
					name : "Armor of Shadows",
					spells : ["mage armor"],
					selection : ["mage armor"],
					atwill : true,
				},
			},
			"ascendant step (prereq: level 9 warlock)" : {
				name : "Ascendant Step",
				description : "\n   " + "I can cast Levitate on myself at will, without spell slots or material comp. (PHB 255)",
				source : ["P", 110],
				spellcastingBonus : {
					name : "Ascendant Step",
					spells : ["levitate"],
					selection : ["levitate"],
					atwill : true,
				},
			},
			"beast speech" : {
				name : "Beast Speech",
				description : "\n   " + "I can cast Speak with Animals at will, without using spell slots (PHB 277)",
				source : ["P", 110],
				spellcastingBonus : {
					name : "Beast Speech",
					spells : ["speak with animals"],
					selection : ["speak with animals"],
					atwill : true,
				},
			},
			"beguiling influence" : {
				name : "Beguiling Influence",
				description : "\n   " + "I gain proficiencies with the Deception and Persuasion skills",
				source : ["P", 110],
				skills : ["Deception", "Persuasion"],
				skillstxt : "\n\n" + toUni("Warlock (Beguiling Influence)") + ": Deception and Persuasion.",
			},
			"bewitching whispers (prereq: level 7 warlock)" : {
				name : "Bewitching Whispers",
				description : "\n   " + "Once per long rest, I can cast Compulsion using a warlock spell slot (PHB 224)",
				source : ["P", 110],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Bewitching Whispers",
					spells : ["compulsion"],
					selection : ["compulsion"],
					oncelr : true,
				},
			},
			"devil's sight" : {
				name : "Devil's Sight",
				description : "\n   " + "I can see in magical and nonmagical darkness out to 120 ft",
				source : ["P", 110],
				eval : "AddString(\"Vision\", \"Devil's Sight 120 ft\", \"; \");",
				removeeval : "RemoveString(\"Vision\", \"Devil's Sight 120 ft\", \"; \");",
			},
			"dreadful word (prereq: level 7 warlock)" : {
				name : "Dreadful Word",
				description : "\n   " + "Once per long rest, I can cast Confusion using a warlock spell slot (PHB 224)",
				source : ["P", 110],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Dreadful Word",
					spells : ["confusion"],
					selection : ["confusion"],
					oncelr : true,
				},
			},
			"eldritch sight" : {
				name : "Eldritch Sight",
				description : "\n   " + "I can cast Detect Magic at will, without using spell slots (PHB 231)",
				source : ["P", 110],
				spellcastingBonus : {
					name : "Eldritch Sight",
					spells : ["detect magic"],
					selection : ["detect magic"],
					atwill : true,
				},
			},
			"eldritch spear (prereq: eldritch blast cantrip)" : {
				name : "Eldritch Spear",
				description : "\n   " + "My Eldritch Blast cantrip has a range of 300 ft",
				source : ["P", 111],
				eval : "var AB = (What(\"Extra.Notes\").search(/agonizing blast/i) !== -1); RemoveWeapon(\"eldritch blast\"); RemoveWeapon(\"eldritch spear\"); RemoveWeapon(\"agonizing blast\"); if (AB) {AddWeapon(\"Agonizing Spear\")} else {AddWeapon(\"Eldritch Spear\")}",
				removeeval : "RemoveWeapon(\"eldritch spear\"); RemoveWeapon(\"agonizing spear\"); var AB = (What(\"Extra.Notes\").search(/agonizing blast/i) !== -1); if (AB) {AddWeapon(\"Agonizing Blast\")} else {AddWeapon(\"Eldritch Blast\")}",
			},
			"eyes of the rune keeper" : {
				name : "Eyes of the Rune Keeper",
				description : "\n   " + "I can read all writing",
				source : ["P", 111],
			},
			"fiendish vigor" : {
				name : "Fiendish Vigor",
				description : "\n   " + "I can cast False Life on myself at will, without spell slots or material comp. (PHB 239)",
				source : ["P", 111],
				spellcastingBonus : {
					name : "Fiendish Vigor",
					spells : ["false life"],
					selection : ["false life"],
					atwill : true,
				},
			},
			"gaze of two minds" : {
				name : "Gaze of Two Minds",
				description : "\n   " + "As an action, I can touch a willing creature and perceive through its senses (not my own)" + "\n   " + "This lasts until the end of my next turn, but I can use an action to extend the duration",
				source : ["P", 111],
			},
			"lifedrinker (prereq: level 12 warlock, pact of the blade)" : {
				name : "Lifedrinker",
				description : "\n   " + "My pact weapon does extra necrotic damage equal to my Charisma modifier",
				source : ["P", 111],
			},
			"mask of many faces" : {
				name : "Mask of Many Faces",
				description : "\n   " + "I can cast Disguise Self on myself at will, without using spell slots (PHB 233)",
				source : ["P", 111],
				spellcastingBonus : {
					name : "Mask of Many Faces",
					spells : ["disguise self"],
					selection : ["disguise self"],
					atwill : true,
				},
			},
			"master of myriad forms (prereq: level 15 warlock)" : {
				name : "Master of Myriad Forms",
				description : "\n   " + "I can cast Alter Self on myself at will, without using spell slots (PHB 211)",
				source : ["P", 111],
				spellcastingBonus : {
					name : "Mask of Myriad Forms",
					spells : ["alter self"],
					selection : ["alter self"],
					atwill : true,
				},
			},
			"minions of chaos (prereq: level 9 warlock)" : {
				name : "Minions of Chaos",
				description : "\n   " + "Once per long rest, I can cast Conjure Elemental using a warlock spell slot (PHB 225)",
				source : ["P", 111],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Minions of Chaos",
					spells : ["conjure elemental"],
					selection : ["conjure elemental"],
					oncelr : true,
				},
			},
			"mire the mind (prereq: level 5 warlock)" : {
				name : "Mire the Mind",
				description : "\n   " + "Once per long rest, I can cast Slow using a warlock spell slot (PHB 277)",
				source : ["P", 111],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Mire the Mind",
					spells : ["slow"],
					selection : ["slow"],
					oncelr : true,
				},
			},
			"misty visions" : {
				name : "Misty Visions",
				description : "\n   " + "I can cast Silent Image at will, without using spell slots or material comp. (PHB 276)",
				source : ["P", 111],
				spellcastingBonus : {
					name : "Misty Visions",
					spells : ["silent image"],
					selection : ["silent image"],
					atwill : true,
				},
			},
			"one with shadows (prereq: level 5 warlock)" : {
				name : "One with Shadows",
				description : "\n   " + "As an action, when I'm in an area of dim light or darkness, I can become invisible" + "\n   " + "I become visible again when I move or take an action or reaction",
				source : ["P", 111],
				action : ["action", ""]
			},
			"otherworldly leap (prereq: level 9 warlock)" : {
				name : "Otherworldly Leap",
				description : "\n   " + "I can cast Jump on myself at will, without using spell slots or material comp. (PHB 254)",
				source : ["P", 111],
				spellcastingBonus : {
					name : "Otherworldly Leap",
					spells : ["jump"],
					selection : ["jump"],
					atwill : true,
				},
			},
			"repelling blast (prereq: eldritch blast cantrip)" : {
				name : "Repelling Blast",
				description : "\n   " + "I can have creatures hit by my Eldritch Blast cantrip be pushed 10 ft away from me",
				source : ["P", 111],
			},
			"sculptor of flesh (prereq: level 7 warlock)" : {
				name : "Sculptor of Flesh",
				description : "\n   " + "Once per long rest, I can cast Polymorph using a warlock spell slot (PHB 266)",
				source : ["P", 111],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Sculptor of Flesh",
					spells : ["polymorph"],
					selection : ["polymorph"],
					oncelr : true,
				},
			},
			"sign of ill omen (prereq: level 5 warlock)" : {
				name : "Sign of Ill Omen",
				description : "\n   " + "Once per long rest, I can cast Bestow Curse using a warlock spell slot (PHB 218)",
				source : ["P", 111],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Sign of Ill Omen",
					spells : ["bestow curse"],
					selection : ["bestow curse"],
					oncelr : true,
				},
			},
			"thief of five fates" : {
				name : "Thief of Five Fates",
				description : "\n   " + "Once per long rest, I can cast Bane using a warlock spell slot (PHB 216)",
				source : ["P", 111],
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Thief of Five Fates",
					spells : ["bane"],
					selection : ["bane"],
					oncelr : true,
				},
			},
			"visions of distant realms (prereq: level 15 warlock)" : {
				name : "Visions of Distant Realms",
				description : "\n   " + "I can cast Arcane Eye at will, without using spell slots (PHB 214)",
				source : ["P", 111],
				spellcastingBonus : {
					name : "Visions of Distant Realms",
					spells : ["arcane eye"],
					selection : ["arcane eye"],
					atwill : true,
				},
			},
			"whispers of the grave (prereq: level 9 warlock)" : {
				name : "Whispers of the Grave",
				description : "\n   " + "I can cast Speak with Dead at will, without using spell slots (PHB 277)",
				source : ["P", 111],
				spellcastingBonus : {
					name : "Whispers of the Grave",
					spells : ["speak with dead"],
					selection : ["speak with dead"],
					atwill : true,
				},
			},
			"witch sight (prereq: level 15 warlock)" : {
				name : "Witch Sight",
				description : "\n   " + "I can see the true form of creatures (shapechangers/illusions/transmutations) within 30 ft",
				source : ["P", 111],
				eval : "AddString(\"Vision\", \"Witch Sight 30 ft\", \"; \");",
				removeeval : "RemoveString(\"Vision\", \"Witch Sight 30 ft\", \"; \");",
			},
		},
		"fighting style" : {
			name : "Fighting Style",
			source : ["P", 84],
			minlevel : 2,
			description : "\n   " + "Choose a Fighting Style for the paladin using the \"Choose Feature\" button above",
			choices : ["Defense", "Dueling", "Great Weapon Fighting", "Protection"],
			"defense" : {
				name : "Defense Fighting Style",
				description : "\n   " + "+1 bonus to AC when I'm wearing armor",
				eval : "AddACMisc(1, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\", \"CurrentArmour.known && !ArmourList[CurrentArmour.known].type\")",
				removeeval : "AddACMisc(0, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\")"
			},
			"dueling" : {
				name : "Dueling Fighting Style",
				description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons",
				eval : "tDoc.getField(\"Attack Damage Bonus Global\").value += 2",
				removeeval : "tDoc.getField(\"Attack Damage Bonus Global\").value -= 2"
			},
			"great weapon fighting" : {
				name : "Great Weapon Fighting Style",
				description : "\n   " + "Reroll 1 or 2 on damage if wielding two-handed/versatile melee weapon in both hands"
			},
			"protection" : {
				name : "Protection Fighting Style",
				description : "\n   " + "As a reaction, I can give disadv. on an attack made vs. someone within 5 ft of me" + "\n   " + "I need to be wielding a shield and be able to see the attacker to do this",
				action : ["reaction", ""]
			},
		},
		"subclassfeature3" : {
			name : "Hexblade Pact",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "Choose a Pact you swear to and put it in the \"Class\" field" + "\n   " + "Choose either the Archfey, the Fiend, the Great Old One, or the Undying",
		},
		"action surge" : {
			name : "Action Surge",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "I can take one additional action on my turn on top of my normally allowed actions",
			usages : [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
			recovery : "short rest"
		},
		"swift strike" : {
			name : "Swift Strike",
			source : ["HB", 0],
			minlevel : 6,
			description : "\n   " + "When I use my action to cast a cantrip, I can make a weapon attack as a bonus action",
			action : ["bonus action", ""],
		},
		"eldritch charge" : {
			name : "Eldritch Charge",
			source : ["HB", 0],
			minlevel : 10,
			description : "\n   " + "When I use Action Surge, I can also teleport up to 30 ft to an empty space I can see" + "\n   " + "I can do so before or after the extra action",
		},
		"blessing of darkness" : {
			name : "Blessing Of Darkness",
			source : ["HB", 0],
			minlevel : 11,
			description : "\n   " + "As an action, I can become invisible in dim light or darkness until I attack/cast",
			action : ["action", ""]
		},
		"improved swift strike" : {
			name : "Improved Swift Strike",
			source : ["HB", 0],
			minlevel : 14,
			description : "\n   " + "When I use my action to cast a spell, I can make a weapon attack as a bonus action",
			action : ["bonus action", ""],
		}
	}
};

//the Fey Pact subclass
ClassSubList["fey pact"] = {
	regExpSearch : /^(?=.*fey)(?=.*hexblade).*$/i,
	subname : "Fey Pact",
	source : ["HB", 0],
	spellcastingExtra : ["faerie fire", "sleep", "calm emotions", "phantasmal force", "blink", "plant growth", "dominate beast", "greater invisibility", "dominate person", "seeming"],
	features : {
		"subclassfeature3" : {
			name : "Pixie Strike",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "When I hit someone in melee, I can expend spell slots to do 2d8 extra poison damage" + "\n   " + "This increases by 1d8 for each spell slot level above 1st"
		},
		"subclassfeature7" : {
			name : "Fey Ward",
			source : ["HB", 0],
			minlevel : 7,
			description : "\n   " + "I have resistance to damage from spells",
			eval : "AddResistance(\"Spells\", \"Hexblade (Fey Ward)\")",
			removeeval : "RemoveResistance(\"Spells\")"
		},
		"subclassfeature15" : {
			name : "Eternal Pawn",
			source : ["HB", 0],
			minlevel : 15,
			description : "\n   " + "If dropped to 0 HP and not killed outright, I can choose to stay at 1 HP" + "\n   " + "Additionally, I suffer no drawbacks of old age and can't be aged magically",
			recovery : "long rest",
			usages : 1
		},
		"subclassfeature20" : {
			name : "Stroke of Luck",
			source : ["HB", 0],
			minlevel : 20,
			description : "\n   " + "I can turn a missed attack into a hit or a failed ability check into a natural 20",
			recovery : "short rest",
			usages : 1
		}
	}
};