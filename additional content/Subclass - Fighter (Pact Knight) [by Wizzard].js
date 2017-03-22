/*  -WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*  -INFORMATION-
	Subject:    Subclass
	Effect:     This script adds a subclass for the fighter, called "Pact Knight"
				This is a homebrewed class bringing warlock spellcasting to the fighter
	Code by:    Wizzard (and a tiny bit MPMB)
	Date:       2017-02-21 (sheet v12.84)
*/

ClassSubList["fighter-pact knight"] = {
	regExpSearch : /^(?=.*pact)(?=.*knight).*$/i,
	subname : "Pact Knight",
	fullname : "Pact Knight",
	abilitySave : 3,
	spellcastingFactor : "warlock3",
	spellcastingKnown : {
		cantrips : [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4],
		spells : [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4],
	},
	spellcastingList : {
		class : "warlock",
		level : [0, 4],
	},
	features : {
		"subclassfeature3" : {
			name : "Pact of the Blade",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I can create a pact weapon in my empty hand; I'm proficient in its use" + "\n   " + "I can choose the type of melee weapon every time I create it, and it has those statistics" + "\n   " + "The weapon disappears if it is more than 5 ft away from me for 1 minute" + "\n   " + "The weapon counts as magical; I can transform a magic weapon Chao my pact weapon" + "\n   " + "This occurs over an hour-long ritual that I can perform during a short rest" + "\n   " + "I can use an action to re-summon it in any form and can dismiss it as no action",
			action : ["bonus action", ""],
			calcChanges : {
				atkAdd : ["if (isMeleeWeapon && (/\\bpact\\b/i).test(inputText)) {fields.Proficiency = true; fields.Description += thisWeapon[1] ? '' : (fields.Description ? '; ' : '') + 'Counts as magical'; }; ", "If I include the word 'Pact' in a melee weapon's name, it gets treated as my Pact Weapon."]
			}
		},
		"subclassfeature3.1" : {
			name : "Hexbladeic Invocations",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "Use the \"Choose Features\" button above to add Hexbladeic Invocations to the third page",
			additional : ["", "", "2 invocations known", "2 invocations known", "2 invocations known", "3 invocations known", "3 invocations known", "3 invocations known", "3 invocations known", "4 invocations known", "4 invocations known", "4 invocations known", "4 invocations known", "4 invocations known", "5 invocations known", "5 invocations known", "5 invocations known", "5 invocations known", "5 invocations known", "5 invocations known"],
			extraname : "Hexbladeic Invocation",
			extrachoices : ["Agonizing Blast (prereq: Eldritch Blast cantrip)", "Armor of Shadows", "Ascendant Step (prereq: level 9 pact knight)", "Beast Speech", "Beguiling Influence", "Devil's Sight", "Eldritch Sight", "Eldritch Spear (prereq: Eldritch Blast cantrip)", "Eyes of the Rune Keeper", "Fiendish Vigor", "Gaze of Two Minds", "Lifedrinker (prereq: level 12 pact knight)", "Mask of Many Faces", "Master of Myriad Forms (prereq: level 15 pact knight)", "Misty Visions", "One with Shadows (prereq: level 5 pact knight)", "Otherworldly Leap (prereq: level 9 pact knight)", "Repelling Blast (prereq: Eldritch Blast cantrip)", "Visions of Distant Realms (prereq: level 15 pact knight)", "Whispers of the Grave (prereq: level 9 pact knight)", "Witch Sight (prereq: level 15 pact knight)"],
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
			"ascendant step (prereq: level 9 pact knight)" : {
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
				skillstxt : "\n\n" + toUni("Pact Knight (Beguiling Influence)") + ": Deception and Persuasion.",
			},
			"devil's sight" : {
				name : "Devil's Sight",
				description : "\n   " + "I can see in magical and nonmagical darkness out to 120 ft",
				source : ["P", 110],
				eval : "AddString(\"Vision\", \"Devil's Sight 120 ft\", \"; \");",
				removeeval : "RemoveString(\"Vision\", \"Devil's Sight 120 ft\", \"; \");",
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
			"lifedrinker (prereq: level 12 pact knight)" : {
				name : "Lifedrinker",
				description : "\n   " + "My pact weapon does extra necrotic damage equal to my Charisma modifier",
				source : ["P", 111],
				calcChanges : {
					atkCalc : ["if (isMeleeWeapon && (/\\bpact\\b/i).test(WeaponText)) { output.extraDmg += What('Cha Mod'); }; ", "If I include the word 'Pact' in a melee weapon's name or description, the calculation will add my Charisma modifier to its damage. However, it won't say that this added damage is of the necrotic type, as it can only display a single damage type."]
				}
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
			"master of myriad forms (prereq: level 15 pact knight)" : {
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
			"one with shadows (prereq: level 5 pact knight)" : {
				name : "One with Shadows",
				description : "\n   " + "As an action, when I'm in an area of dim light or darkness, I can become invisible" + "\n   " + "I become visible again when I move or take an action or reaction",
				source : ["P", 111],
				action : ["action", ""]
			},
			"otherworldly leap (prereq: level 9 pact knight)" : {
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
				calcChanges : {
					atkAdd : ["if (theWea && (/eldritch blast/i).test(theWea.name)) {fields.Description += '; Target pushed back 10 ft'; }; ", "When I hit a creature with my Eldritch Blast cantrip, it is pushed 10 ft away from me."]
				}
			},
			"visions of distant realms (prereq: level 15 pact knight)" : {
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
			"whispers of the grave (prereq: level 9 pact knight)" : {
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
			"witch sight (prereq: level 15 pact knight)" : {
				name : "Witch Sight",
				description : "\n   " + "I can see the true form of creatures (shapechangers/illusions/transmutations) within 30 ft",
				source : ["P", 111],
				eval : "AddString(\"Vision\", \"Witch Sight 30 ft\", \"; \");",
				removeeval : "RemoveString(\"Vision\", \"Witch Sight 30 ft\", \"; \");",
			},
		},
		"subclassfeature3.2" : {
			name : "Pact Magic",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   " + "I can cast warlock cantrips/spells that I know, using Charisma as my spellcasting ability" + "\n   " + "I can use an arcane focus as a spellcasting focus; I know the Hex spell in addition" + "\n   " + "I regain these spell slots on a short rest",
			additional : levels.map(function (n) {
				if (n < 3) return "";
				var spca = n < 7 ? 1 : n < 15 ? 2 : n < 19 ? 3 : 4;
				return spca + " cantrip" + (spca > 1 ? "s" : "") + " \u0026 " + spca + " spell" + (spca > 1 ? "s" : "") + " known";
			}),
			spellcastingBonus : {
				name : "Hex",
				spells : ["hex"],
				selection : ["hex"]
			}
		},
		"subclassfeature7" : {
			name : "Deny the Grave",
			source : ["HB", 0],
			minlevel : 7,
			description : "\n   " + "I regain 1d10 + my Constitution modifier in HP when I succeed on a Death saving throw" + "\n   " + "I also regain this amount whenever I drop a hexed foe to 0 hp",
			recovery : "long rest",
			usages : 1
		},
		"subclassfeature15" : {
			name : "Make My Own Luck",
			source : ["HB", 0],
			minlevel : 15,
			description : "\n   " + "Against a hexed foe, I gain advantage on my attacks",
		},
		"subclassfeature18" : {
			name : "Vicious Strikes",
			source : ["HB", 0],
			minlevel : 18,
			description : "\n   " + "Attacks with my pact weapon score a critical hit on a roll of both 19 and 20",
			calcChanges : {
				atkAdd : ["if (isMeleeWeapon && (/\\bpact\\b/i).test(inputText) && classes.known.fighter && classes.known.fighter.level > 17) {fields.Description += (fields.Description ? '; ' : '') + 'Crit on 19-20'; }; ", "My pact weapon attacks score a critical on a to hit roll of both 19 and 20."]
			}
		},
		"subclassfeature18.1" : {
			name : "Crimson Blade",
			source : ["HB", 0],
			minlevel : 18,
			description : "\n   " + "I drain some of the vitality of my foes when I score a crit with my pact weapon" + "\n   " + "I gain temporary hit points equal to half of the damage from the attack"
		},
	},
};
ClassList.fighter.subclasses[1].push("fighter-pact knight");