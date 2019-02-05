var Base_MagicItemsList = {
	"adamantine armor" : {
		name : "Adamantine Armor",
		nameTest : "Adamantine",
		source : [["SRD", 207], ["D", 150]],
		type : "armor (medium, or heavy)",
		rarity: "uncommon",
		description : "This armor is reinforced with adamantine, one of the hardest substances in existence. While I'm wearing it, any critical hit against me becomes a normal hit.",
		descriptionFull : "This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any critical hit against you becomes a normal hit.",
		allowDuplicates : true,
		chooseGear : {
			type : "armor",
			prefixOrSuffix : "suffix",
			excludeCheck : function (inObjKey, inObj) {
				return !(/medium|heavy/i).test(inObj.type) || (/hide/i).test(inObj.name);
			}
		}
	},
	"ammunition, +1, +2, or +3" : {
		name : "Ammunition, +1, +2, or +3",
		source : [["SRD", 207], ["D", 150]],
		type : "weapon (any ammunition)",
		rarity: "varies",
		description : "I have a bonus to attack and damage rolls made with this piece of magic ammunition. The bonus is determined by the rarity of the magic item: uncommon (+1), rare (+2), or very rare (+3). Once it hits a target, the ammunition is no longer magical. Select the bonus using the little square button in this magic item line.",
		descriptionFull : "You have a bonus to attack and damage rolls made with this piece of magic ammunition. The bonus is determined by the rarity of the ammunition: uncommon (+1), rare (+2), or very rare (+3). Once it hits a target, the ammunition is no longer magical.",
		allowDuplicates : true,
		chooseGear : {
			type : "ammo",
			prefixOrSuffix : "brackets",
			descriptionChange : ["replace", "ammunition"]
		},
		choices : ["+1 Ammunition (uncommon)", "+2 Ammunition (rare)", "+3 Ammunition (very rare)"],
		"+1 ammunition (uncommon)" : {
			name : "Ammunition +1",
			rarity: "uncommon",
			magicItemTable : "B",
			description : "I have a +1 bonus to attack and damage rolls made with this magic ammunition. Once it hits a target, the ammunition is no longer magical.",
			allowDuplicates : true
		},
		"+2 ammunition (rare)" : {
			name : "Ammunition +2",
			rarity: "rare",
			magicItemTable : "C",
			description : "I have a +2 bonus to attack and damage rolls made with this magic ammunition. Once it hits a target, the ammunition is no longer magical.",
			allowDuplicates : true
		},
		"+3 ammunition (very rare)" : {
			name : "Ammunition +3",
			rarity: "very rare",
			magicItemTable : "D",
			description : "I have a +3 bonus to attack and damage rolls made with this magic ammunition. Once it hits a target, the ammunition is no longer magical.",
			allowDuplicates : true
		}
	},
	"amulet of health": {
		name: "Amulet of Health",
		source: [["SRD", 207], ["D", 150]],
		type: "wondrous item",
		rarity: "rare",
		magicItemTable : "G",
		description: "My Constitution score is 19 while I'm wearing this amulet, provided that my Constitution is not already 19 or higher.",
		descriptionFull: "Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution score is already 19 or higher without it.",
		attunement: true,
		weight: 1,
		scoresOverride : [0, 0, 19, 0, 0, 0]
	},
	"armor, +1, +2, or +3" : {
		name : "Armor, +1, +2, or +3",
		source : [["SRD", 208], ["D", 152]],
		type : "armor (light, medium, or heavy)",
		rarity: "varies",
		description : "I have a bonus to AC while wearing this armor. The bonus is determined by the rarity of the magic item: rare (+1), very rare (+2), or legendary (+3). Select the bonus using the little square button in this magic item line.",
		descriptionFull : "You have a bonus to AC while wearing this armor. The bonus is determined by its rarity: rare (+1), very rare (+2), or legendary (+3).\n\nThere are several magic item tables in the Dungeon Masters Guide where this item appears on. It varies per type of armor and magic bonus, with not all types of combinations listed. See below for the table per type of armor and bonus:\n\n" + toUni("Table\tBonus\tArmor Types") + "\n  G\t  +1\tChain Mail, Chain Shirt, Leather, Scale Mail\n  H\t  +1\tBreastplate, Splint, Studded Leather\n  H\t  +2\tChain Mail, Chain Shirt, Leather, Scale Mail\n  I\t  +1\tHalf Plate, Plate, Scale Mail\n  I\t  +2\tBreastplate, Half Plate, Plate, Scale Mail, Splint, Studded Leather\n  I\t  +3\tBreastplate, Chain Mail, Chain Shirt, Half Plate\n  I\t  +3\tLeather, Plate, Splint, Studded Leather",
		allowDuplicates : true,
		chooseGear : {
			type : "armor",
			prefixOrSuffix : "brackets",
			descriptionChange : ["prefix", "armor"]
		},
		choices : ["+1 AC bonus (rare)", "+2 AC bonus (very rare)", "+3 AC bonus (legendary)"],
		"+1 ac bonus (rare)" : {
			name : "Armor +1",
			rarity: "rare",
			description : "I have a +1 bonus to AC while wearing this armor.",
			allowDuplicates : true
		},
		"+2 ac bonus (very rare)" : {
			name : "Armor +2",
			rarity: "very rare",
			description : "I have a +2 bonus to AC while wearing this armor.",
			allowDuplicates : true
		},
		"+3 ac bonus (legendary)" : {
			name : "Armor +3",
			rarity: "legendary",
			description : "I have a +3 bonus to AC while wearing this armor.",
			allowDuplicates : true
		}
	},
	"armor of resistance" : {
		name : "Armor of Resistance",
		source : [["SRD", 208], ["D", 152]],
		type : "armor (light, medium, or heavy)",
		rarity : "rare",
		description : "Select the damage type that this armor gives resistance to using the square button in this line. While I'm wearing this armor and attuned to it, I gain resistance to one type of damage.",
		descriptionFull : "You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below:\n\n" + toUni("d10\tType\t\td10\tType") + "\n 1\tAcid\t\t 6\tNecrotic\n 2\tCold\t\t 7\tPoison\n 3\tFire\t\t 8\tPsychic\n 4\tForce\t\t 9\tRadiant\n 5\tLightning\t\t 10\tThunder\n\nThere are several magic item tables in the Dungeon Masters Guide where this item appears on. It varies per type of armor, and not all types of armor are listed. See below for the table per type of armor or resistance:\n\n" + toUni("Table\tArmor") + "\n G\tChain Mail\n G\tChain Shirt\n G\tLeather\n G\tScale Mail\n H\tBreastplate\n H\tSplint\n H\tStudded Leather\n I\tHalf Plate\n I\tPlate",
		attunement : true,
		allowDuplicates : true,
		chooseGear : {
			type : "armor",
			prefixOrSuffix : "prefix"
		},
		choices : ["Acid", "Cold", "Fire", "Force", "Lightning", "Necrotic", "Poison", "Psychic", "Radiant", "Thunder"],
		"acid" : {
			name : "Armor of Acid Resistance",
			description : "While I'm wearing this armor and I'm attuned to it, I have resistance to acid damage.",
			dmgres : ["Acid"]
		},
		"cold" : {
			name : "Armor of Cold Resistance",
			description : "While I'm wearing this armor and I'm attuned to it, I have resistance to cold damage.",
			dmgres : ["Cold"]
		},
		"fire" : {
			name : "Armor of Fire Resistance",
			description : "While I'm wearing this armor and I'm attuned to it, I have resistance to fire damage.",
			dmgres : ["Fire"]
		},
		"force" : {
			name : "Armor of Force Resistance",
			description : "While I'm wearing this armor and I'm attuned to it, I have resistance to force damage.",
			dmgres : ["Force"]
		},
		"lightning" : {
			name : "Armor of Lightning Resistance",
			description : "While I'm wearing this armor and I'm attuned to it, I have resistance to lightning damage.",
			dmgres : ["Lightning"]
		},
		"necrotic" : {
			name : "Armor of Necrotic Resistance",
			description : "While I'm wearing this armor and I'm attuned to it, I have resistance to necrotic damage.",
			dmgres : ["Necrotic"]
		},
		"poison" : {
			name : "Armor of Poison Resistance",
			description : "While I'm wearing this armor and I'm attuned to it, I have resistance to poison damage.",
			dmgres : ["Poison"]
		},
		"psychic" : {
			name : "Armor of Psychic Resistance",
			description : "While I'm wearing this armor and I'm attuned to it, I have resistance to psychic damage.",
			dmgres : ["Psychic"]
		},
		"radiant" : {
			name : "Armor of Radiant Resistance",
			description : "While I'm wearing this armor and I'm attuned to it, I have resistance to radiant damage.",
			dmgres : ["Radiant"]
		},
		"thunder" : {
			name : "Armor of Thunder Resistance",
			description : "While I'm wearing this armor and I'm attuned to it, I have resistance to thunder damage.",
			dmgres : ["Thunder"]
		}
	},
	"arrow of slaying" : {
		name : "Arro\u200Aw of Slaying",
		nameTest : "of Slaying",
		source : [["SRD", 209], ["D", 152]],
		type : "weapon (any ammunition)",
		rarity: "very rare",
		magicItemTable : "E",
		description : "This magic ammunition is meant to hurt a particular race, type, or group of creatures. Its specificity varies. If an associated target is hit by this ammunition, it takes +6d10 piercing damage. It can then make a DC 17 Con save to half this extra damage. After dealing its extra damage, the ammunition becomes nonmagical.",
		descriptionFull : "An arrow of slaying is a magic weapon meant to slay a particular kind of creature. Some are more focused than others; for example, there are both arrows of dragon slaying and arrows of blue dragon slaying. If a creature belonging to the type, race, or group associated with an arrow of slaying takes damage from the arrow, the creature must make a DC 17 Constitution saving throw, taking an extra 6d10 piercing damage on a failed save, or half as much extra damage on a successful one.\n   Once an arrow of slaying deals its extra damage to a creature, it becomes a nonmagical arrow.\n   Other types of magic ammunition of this kind exist, such as bolts of slaying meant for a crossbow, though arrows are most common.",
		allowDuplicates : true,
		chooseGear : {
			type : "ammo",
			prefixOrSuffix : "prefix",
			descriptionChange : ["replace", "ammunition"]
		}
	},
	"belt of giant strength" : {
		name: "Belt of Giant Strength",
		source: [["SRD", 211], ["D", 155]],
		type: "wondrous item",
		rarity: "varies",
		description: "Set the type of giant using the button in this line. While wearing this belt, my Strength score changes to a certain number depending on the type of giant the belt is associated with, provided that my Strength is not already that amount or higher.",
		descriptionFull: "While wearing this belt, your Strength score changes to a score granted by the belt. If your Strength is already equal to or greater than the belt’s score, the item has no effect on you. Six varieties of this belt exist, corresponding with and having rarity according to the six kinds of true giants. The belt of stone giant strength and the belt of frost giant strength look different, but they have the same effect.\n\n" + toUni("Type") + "\t\t" + toUni("Str") + "\t" + toUni("Rarity") + "\nHill giant\t\t21\tRare\nStone/frost giant\t23\tVery rare\nFire giant\t\t25\tVery rare\nCloud giant\t27\tLegendary\nStorm giant\t29\tLegendary",
		attunement: true,
		allowDuplicates : true,
		choices : ["Hill (Str 21, rare)", "Stone (Str 23, very rare)", "Frost (Str 23, very rare)", "Fire (Str 25, very rare)", "Cloud (Str 27, legendary)", "Storm (Str 29, legendary)"],
		"hill (str 21, rare)" : {
			name : "Belt of Hill Giant Strength",
			rarity: "rare",
			magicItemTable : "G",
			description : "My Strength score is 21 while I'm wearing this belt, provided that my Strength is not already 21 or higher.",
			scoresOverride : [21, 0, 0, 0, 0, 0]
		},
		"stone (str 23, very rare)" : {
			name : "Belt of Stone Giant Strength",
			rarity: "very rare",
			magicItemTable : "H",
			description : "My Strength score is 23 while I'm wearing this belt, provided that my Strength is not already 23 or higher.",
			scoresOverride : [23, 0, 0, 0, 0, 0]
		},
		"frost (str 23, very rare)" : {
			name : "Belt of Frost Giant Strength",
			rarity: "very rare",
			magicItemTable : "H",
			description : "My Strength score is 23 while I'm wearing this belt, provided that my Strength is not already 23 or higher.",
			scoresOverride : [23, 0, 0, 0, 0, 0]
		},
		"fire (str 25, very rare)" : {
			name : "Belt of Fire Giant Strength",
			rarity: "very rare",
			magicItemTable : "H",
			description : "My Strength score is 25 while I'm wearing this belt, provided that my Strength is not already 25 or higher.",
			scoresOverride : [25, 0, 0, 0, 0, 0]
		},
		"cloud (str 27, legendary)" : {
			name : "Belt of Cloud Giant Strength",
			rarity: "legendary",
			magicItemTable : "I",
			description : "My Strength score is 27 while I'm wearing this belt, provided that my Strength is not already 27 or higher.",
			scoresOverride : [27, 0, 0, 0, 0, 0]
		},
		"storm (str 29, legendary)" : {
			name : "Belt of Storm Giant Strength",
			rarity: "legendary",
			magicItemTable : "I",
			description : "My Strength score is 29 while I'm wearing this belt, provided that my Strength is not already 29 or higher.",
			scoresOverride : [29, 0, 0, 0, 0, 0]
		}
	},
	"berserker axe" : {
		name : "Berserker Axe",
		nameTest : "Berserker",
		source : [["SRD", 211], ["D", 155]],
		type : "weapon (any axe)",
		rarity : "rare",
		magicItemTable : "G",
		attunement : true,
		description : "This axe gives +1 to hit and damage, +1 HP per level, and is cursed. I can't part with it and have disadv. using other weapons. Whenever I'm damaged by a hostile, I must make a DC 15 Wis save or go berserk, using my action each round to attack the closest creature with the axe until none remain within 60 ft.",
		descriptionFull : "You gain a +1 bonus to attack and damage rolls made with this magic weapon. In addition, while you are attuned to this weapon, your hit point maximum increases by 1 for each level you have attained.\n   " + toUni("Curse") + ". This axe is cursed, and becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the axe, keeping it within reach at all times. You also have disadvantage on attack rolls with weapons other than this one, unless no foe is within 60 feet of you that you can see or hear.\n   Whenever a hostile creature damages you while the axe is in your possession, you must succeed on a DC 15 Wisdom saving throw or go berserk. While berserk, you must use your action each round to attack the creature nearest to you with the axe. If you can make extra attacks as part of the Attack action, you use those extra attacks, moving to attack the next nearest creature after you fell your current target. If you have multiple possible targets, you attack one at random. You are berserk until you start your turn with no creatures within 60 feet of you that you can see or hear.",
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "suffix",
			descriptionChange : ["replace", "axe"],
			excludeCheck : function (inObjKey, inObj) {
				var testRegex = /axe/i;
				return !(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon));
			}
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/axe/i).test(v.baseWeaponName) && (/berserker/i).test(v.WeaponText)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + 'Cursed';
					}
				},
				'If I include the word "Berserker" in a the name of an axe, it will be treated as the magic weapon Berserker Axe. It has +1 to hit and damage, but also bears a curse.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/axe/i).test(v.baseWeaponName) && (/berserker/i).test(v.WeaponText)) {
						output.magic = v.thisWeapon[1] + 1;
					}
				}, ''
			],
			hp : "extrahp += Number(What('Character Level')); extrastring += '\\n + ' + What('Character Level') + ' from Berserker Axe (magic item)'; "
		}
	},
	"boots of elvenkind" : { // contributed by AelarTheElfRogue
		name : "Boots of Elvenkind",
		source : [["SRD", 212], ["D", 155]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While I wear these boots, my steps make no sound, regardless of the surface I am moving across. I also have advantage on Dexterity (Stealth) checks that rely on moving silently.",
		descriptionFull : "While you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have advantage on Dexterity (Stealth) checks that rely on moving silently."
	},
	"boots of levitation" : { // contributed by AelarTheElfRogue
		name : "Boots of Levitation",
		source : [["SRD", 212], ["D", 155]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		attunement : true,
		description : "While I wear these boots, I can use an action to cast the levitate spell on myself at will.",
		descriptionFull : "While you wear these boots, you can use an action to cast the Levitate spell on yourself at will.",
		action: [["action", ""]],
		spellcastingBonus : {
			name: "Self Only",
			spells: ["levitate"],
			selection: ["levitate"],
			atwill : true
		}
	},
	"bracers of defense" : {
		name : "Bracers of Defense",
		source : [["SRD", 212], ["D", 156]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "These bracers give me a +2 bonus to AC, but only if I'm not wearing armor or using a shield.",
		descriptionFull : "While wearing these bracers, you gain a +2 bonus to AC if you are wearing no armor and using no shield.",
		attunement : true,
		extraAC : {
			mod : 2,
			magic : true,
			text : "I gain a +2 bonus to AC while I'm not wearing armor or using a shield.",
			stopeval : function (v) { return v.wearingArmor || v.usingShield; }
		}
	},
	"crystal ball" : {
		name : "Crystal Ball",
		source : [["SRD", 214], ["D", 159]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "I can cast Scrying (DC 17) while touching this ball of about 6 inches in diameter.",
		descriptionFull : "This crystal ball is about 6 inches in diameter. While touching it, you can cast the Scrying spell (save DC 17) with it.",
		attunement : true,
		weight : 3,
		fixedDC : 17,
		spellcastingBonus : {
			name : "DC 17",
			spells : ["scrying"],
			selection : ["scrying"],
			firstCol : "atwill"
		}
	},
	"dancing sword" : {
		name : "Dancing Sword",
		nameTest : "Dancing",
		source : [["SRD", 215], ["D", 161]],
		type : "weapon (any sword)",
		rarity : "very rare",
		magicItemTable : "H",
		attunement : true,
		description : "As a bonus action, I can toss this sword into the air and use the command to make it hover, fly up to 30 ft and attack a target of my choice (as if I'm using it).\nI can command it to move/attack again as a bonus action while it hovers and is in 30 ft.\nAfter the 4th attack, it moves 30 ft to return to my hand.",
		descriptionLong : "As a bonus action, I can toss this magic sword into the air and use the command word to make it hover, fly up to 30 ft and attack a target of my choice within 5 ft of it.\nThe attack uses my attack roll and ability score for damage as if I would be using the sword.\nI can command it to move and attack again as a bonus action while it hovers.\nAfter the 4th attack, it moves 30 ft to try and return to my hand.\nIf it can't reach me or my hands are full, it falls to the ground after moving.\nIt also ceases to hover if I grasp it or move more than 30 ft away from it.",
		descriptionFull : "You can use a bonus action to toss this magic sword into the air and speak the command word. When you do so, the sword begins to hover, flies up to 30 feet, and attacks one creature of your choice within 5 feet of it. The sword uses your attack roll and ability score modifier to damage rolls.\n   While the sword hovers, you can use a bonus action to cause it to fly up to 30 feet to another spot within 30 feet of you. As part of the same bonus action, you can cause the sword to attack one creature within 5 feet of it.\n   After the hovering sword attacks for the fourth time, it flies up to 30 feet and tries to return to your hand. If you have no hand free, it falls to the ground at your feet. If the sword has no unobstructed path to you, it moves as close to you as it can and then falls to the ground. It also ceases to hover if you grasp it or move more than 30 feet away from it.",
		action : [["bonus action", ""]],
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "suffix",
			descriptionChange : ["replace", "sword"],
			excludeCheck : function (inObjKey, inObj) {
				var testRegex = /sword|scimitar|rapier/i;
				return !(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon));
			}
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/dancing/i).test(v.WeaponText)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + 'Attacks on its own as a bonus action';
					}
				},
				'If I include the word "Dancing" in a the name of a sword, it will be treated as the magic weapon Dancing Sword. The sword can be made to attack on its own as a bonus action.'
			]
		}
	},
	"defender" : {
		name : "Defender",
		source : [["SRD", 218], ["D", 164]],
		type : "weapon (any sword)",
		rarity : "legendary",
		magicItemTable : "I",
		attunement : true,
		description : "I have a +3 bonus to attack and damage rolls made with this magic sword. The first time I attack with it on each of my turns, I can transfer (part of) the bonus to AC instead. This adjustment remains in affect until the start of my next turn, although I must be holding the sword to gain its bonus to AC.",
		descriptionFull : "You gain a +3 bonus to attack and damage rolls made with this magic weapon.\n   The first time you attack with the sword on each of your turns, you can transfer some or all of the sword's bonus to your Armor Class, instead of using the bonus on any attacks that turn. For example, you could reduce the bonus to your attack and damage rolls to +1 and gain a +2 bonus to AC. The adjusted bonuses remain in effect until the start of your next turn, although you must hold the sword to gain a bonus to AC from it.",
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "brackets",
			descriptionChange : ["replace", "sword"],
			excludeCheck : function (inObjKey, inObj) {
				var testRegex = /sword|scimitar|rapier/i;
				return !(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon));
			}
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/defender/i).test(v.WeaponText)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + '+3 bonus can be used for AC instead';
					}
				},
				'If I include the word "Defender" in a the name of a sword, it will be treated as the magic weapon Defender. It has +3 to hit and damage, but this bonus can be lowered and added to AC instead. Decide to do so with the first attack on your turn.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/defender/i).test(v.WeaponText)) {
						output.magic = v.thisWeapon[1] + 3;
					}
				}, ''
			]
		}
	},
	"dragon slayer" : {
		name : "Dragon Slayer",
		source : [["SRD", 219], ["D", 166]],
		type : "weapon (any sword)",
		rarity : "rare",
		magicItemTable : "G",
		description : "I have a +1 bonus to attack and damage rolls made with this magic sword. When I hit a creature with the dragon type with this sword, it does 3d6 extra damage of the weapon's damage type.",
		descriptionFull : "You gain a +1 bonus to attack and damage rolls made with this magic weapon.\n   When you hit a dragon with this weapon, the dragon takes an extra 3d6 damage of the weapon's type. For the purpose of this weapon, \"dragon\" refers to any creature with the dragon type, including dragon turtles and wyverns.",
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "brackets",
			descriptionChange : ["replace", "sword"],
			excludeCheck : function (inObjKey, inObj) {
				var testRegex = /sword|scimitar|rapier/i;
				return !(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon));
			}
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*dragon)(?=.*slayer).*$/i).test(v.WeaponText)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + '+3d6 damage vs. dragons';
					}
				},
				'If I include the words "Dragon Slayer" in a the name of a sword, it will be treated as the magic weapon Dragon Slayer. It has +1 to hit and damage and deals +3d6 damage to creatures with the dragon type.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*dragon)(?=.*slayer).*$/i).test(v.WeaponText)) {
						output.magic = v.thisWeapon[1] + 1;
					}
				}, ''
			]
		}
	},
	"dwarven thrower" : {
		name : "Dwarven Thrower",
		source : [["SRD", 220], ["D", 167]],
		type : "weapon (warhammer)",
		rarity : "very rare",
		magicItemTable : "H",
		attunement : true,
		description : "This magical warhammer adds a +3 bonus to attack and damage rolls made with it. It has the thrown property with a normal range of 20 ft and a long range of 60 ft. It deals an extra 1d8 damage (or 2d8 if the target is a giant) when thrown. Immediately after the attack, the weapon flies back to my hand.",
		prerequisite : "Requires attunement by a dwarf",
		prereqeval : function(v) { return CurrentRace.known.indexOf('dwarf') !== -1; },
		weight : 2,
		descriptionFull : "You gain a +3 bonus to attack and damage rolls made with this magic weapon. It has the thrown property with a normal range of 20 feet and a long range of 60 feet. When you hit with a ranged attack using this weapon, it deals an extra 1d8 damage or, if the target is a giant, 2d8 damage. Immediately after the attack, the weapon flies back to your hand.",
		addWeapons : ["Dwarven Thrower"],
		weaponOptions : {
			baseWeapon : "warhammer",
			regExpSearch : /^(?=.*dwarven)(?=.*thrower).*$/i,
			name : "Dwarven Thrower",
			source : [["SRD", 220], ["D", 167]],
			range : "Melee, 20/60 ft",
			description : "Thrown, versatile (1d10); +1d8 damage when thrown (2d8 vs. giants) and returns immediately",
			modifiers : [3, 3] // add 3 to each to hit and damage because of the magical bonus
		}
	},
	"flame tongue" : {
		name : "Flame Tongue",
		source : [["SRD", 223], ["D", 170]],
		type : "weapon (any sword)",
		rarity : "rare",
		magicItemTable : "G",
		attunement : true,
		description : "As a bonus action, I can speak the command word of this magic sword, causing flames to erupt from it. These flames add +2d6 fire damage and shine bright light in a 40-ft radius and dim light for an additional 40 ft. The flames last until I speak the command word again as a bonus action or sheathe it.",
		descriptionFull : "You can use a bonus action to speak this magic sword's command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra 2d6 fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you drop or sheathe the sword.",
		action : [["bonus action", " (activate/end)"]],
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "brackets",
			descriptionChange : ["replace", "sword"],
			excludeCheck : function (inObjKey, inObj) {
				var testRegex = /sword|scimitar|rapier/i;
				return !(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon));
			}
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*flame)(?=.*tongue).*$/i).test(v.WeaponText)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + 'While active, +2d6 fire damage';
					}
				},
				'If I include the words "Flame Tongue" in a the name of a sword, it will be treated as the magic weapon Flame Tongue. When the command word is spoken, the blade erupts with flames, adding +2d6 fire damage on a hit and shining light.'
			]
		}
	},
	"frost brand" : {
		name : "Frost Brand",
		source : [["SRD", 223], ["D", 171]],
		type : "weapon (any sword)",
		rarity : "very rare",
		magicItemTable : "H",
		attunement : true,
		description : "This magic sword adds +1d6 cold damage to its damage and grants me resistance to fire. In freezing temperatures, it sheds bright light in a 10-ft radius and dim light for an additional 10 ft. Once per hour when I draw the blade, I can extinguish all nonmagical flames within 30 ft of me.",
		descriptionFull : "When you hit with an attack using this magic sword, the target takes an extra 1d6 cold damage. In addition, while you hold the sword, you have resistance to fire damage.\n   In freezing temperatures, the blade sheds bright light in a 10-foot radius and dim light for an additional 10 feet.\n   When you draw this weapon, you can extinguish all nonmagical flames within 30 feet of you. This property can be used no more than once per hour.",
		usages : 1,
		recovery : "Hour",
		additional : "extinguish flames",
		dmgres : ["Fire"],
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "brackets",
			descriptionChange : ["replace", "sword"],
			excludeCheck : function (inObjKey, inObj) {
				var testRegex = /sword|scimitar|rapier/i;
				return !(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon));
			}
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*frost)(?=.*brand).*$/i).test(v.WeaponText)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + '+1d6 cold damage';
					}
				},
				'If I include the words "Frost Brand" in a the name of a sword, it will be treated as the magic weapon Frost Brand. It does +1d6 cold damage.'
			]
		}
	},
	"gauntlets of ogre power": {
		name: "Gauntlets of Ogre Power",
		source: [["SRD", 223], ["D", 171]],
		type: "wondrous item",
		rarity: "uncommon",
		magicItemTable : "F",
		description: "My Strength score is 19 while I'm wearing these gauntlets, provided that my Strength is not already 19 or higher.",
		descriptionFull: "Your Strength score is 19 while you wear these gauntlets. They have no effect on you if your Strength is already 19 or higher without them.",
		attunement: true,
		scoresOverride : [19, 0, 0, 0, 0, 0]
	},
	"giant slayer" : {
		name : "Giant Slayer",
		source : [["SRD", 224], ["D", 172]],
		type : "weapon (any axe or sword)",
		rarity : "rare",
		magicItemTable : "G",
		description : "I have a +1 bonus to attack and damage rolls made with this magic weapon. When I hit a creature with the giant type with this weapon, it does 2d6 extra damage of the weapon's damage type and the giant has to make a DC 15 Strength save or be knocked prone.",
		descriptionFull : "You gain a +1 bonus to attack and damage rolls made with this magic weapon.\n   When you hit a giant with it, the giant takes an extra 2d6 damage of the weapon's type and must succeed on a DC 15 Strength saving throw or fall prone. For the purpose of this weapon, \"giant\" refers to any creature with the giant type, including ettins and trolls.",
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "brackets",
			descriptionChange : ["replace", "weapon"],
			excludeCheck : function (inObjKey, inObj) {
				var testRegex = /sword|scimitar|rapier|axe/i;
				return !(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon));
			}
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier|axe/i).test(v.baseWeaponName) && (/^(?=.*giant)(?=.*slayer).*$/i).test(v.WeaponText)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + '+2d6 damage vs. giants; Giants DC 15 Str save or prone';
					}
				},
				'If I include the words "Giant Slayer" in a the name of a sword, it will be treated as the magic weapon Giant Slayer. It has +1 to hit and damage and when hitting a creatures with the giant type, it does +2d6 damage and the target has to make a DC 15 Strength save or be knocked prone.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/sword|scimitar|rapier|axe/i).test(v.baseWeaponName) && (/^(?=.*giant)(?=.*slayer).*$/i).test(v.WeaponText)) {
						output.magic = v.thisWeapon[1] + 1;
					}
				}, ''
			]
		}
	},
	"glamoured studded leather" : {
		name : "Glamoured Studded Leather",
		source : [["SRD", 224], ["D", 172]],
		type : "armor (studded leather)",
		rarity : "rare",
		magicItemTable : "G",
		description : "Studded leather with +1 AC. As a bonus action, I can speak its command word and have it assume the appearance of a normal set of clothing or another armor. I decide what it looks like: style, color, and accessories, but the armor retains its bulk and weight. The illusion lasts until I use this again or remove the armor.",
		weight : 13,
		descriptionFull : "While wearing this armor, you gain a +1 bonus to AC. You can also use a bonus action to speak the armor's command word and cause the armor to assume the appearance of a normal set of clothing or some other kind of armor. You decide what it looks like, including color, style, and accessories, but the armor retains its normal bulk and weight. The illusory appearance last until you use this property again or remove the armor.",
		addArmor : "Glamoured Studded Leather",
		armorOptions : {
			regExpSearch : /^(?=.*glamou?r)(?=.*(studded|studs))(?=.*leather).*$/i,
			name : "Glamoured studded Leather",
			source : [["SRD", 224], ["D", 172]],
			type : "light",
			ac : 13,
			weight : 13
		},
		action : [["bonus action", ""]]
	},
	"headband of intellect": {
		name: "Headband of Intellect",
		source: [["SRD", 225], ["D", 173]],
		type: "wondrous item",
		rarity: "uncommon",
		magicItemTable : "F",
		description: "My Intelligence score is 19 while I'm wearing this headband, provided that my Intelligence is not already 19 or higher.",
		descriptionFull: "Your Intelligence score is 19 while you wear this headband. It has no effect on you if your Intelligence is already 19 or higher without it.",
		attunement: true,
		scoresOverride : [0, 0, 0, 19, 0, 0]
	},
	"holy avenger" : {
		name : "Holy Avenger",
		source : [["SRD", 225], ["D", 174]],
		type : "weapon (any sword)",
		rarity : "legendary",
		magicItemTable : "I",
		attunement: true,
		description : "I have a +3 bonus to attack and damage rolls made with this magic sword. It does +2d10 radiant damage against fiends and undead. While holding the drawn sword, I have a 10-ft radius aura (30-ft if level 17 paladin) that grants me and my allies adv. on saves against spells and magical effects.",
		descriptionFull : "You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you hit a fiend or an undead with it, that creature takes an extra 2d10 radiant damage.\n   While you hold the drawn sword, it creates an aura in a 10-foot radius around you. You and all creatures friendly to you in the aura have advantage on saving throws against spells and other magical effects. If you have 17 or more levels in the paladin class, the radius of the aura increases to 30 feet.",
		prerequisite : "Requires attunement by a paladin",
		prereqeval : function (v) { return classes.known.paladin ? true : false; },
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "brackets",
			descriptionChange : ["replace", "sword"],
			itemName1stPage : ["brackets", "Holy Avenger"],
			excludeCheck : function (inObjKey, inObj) {
				var testRegex = /sword|scimitar|rapier/i;
				return !(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon));
			}
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*holy)(?=.*avenger).*$/i).test(v.WeaponText)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + '+2d10 radiant damage vs. fiends and undead';
					}
				},
				'If I include the words "Holy Avenger" in a the name of a sword, it will be treated as the magic weapon Holy Avenger. It has +3 to hit and damage and does +2d10 radiant damage to fiends and undead.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*holy)(?=.*avenger).*$/i).test(v.WeaponText)) {
						output.magic = v.thisWeapon[1] + 3;
					}
				}, ''
			]
		},
		savetxt : { adv_vs : ["spells", "magical effects"] },
		choices : ["Paladin level 1-16 (10-ft aura)", "Paladin level 17+ (30-ft aura)"],
		selfChoosing : function () {
			return !classes.known.paladin ? "" : classes.known.paladin.level < 17 ? "paladin level 1-16 (10-ft aura)" : "paladin level 17+ (30-ft aura)";
		},
		"paladin level 1-16 (10-ft aura)" : {
			name : "Holy\u200A Avenger",
			description : "I have a +3 bonus to attack and damage rolls made with this magic sword. It does +2d10 radiant damage against fiends and undead. While holding the drawn sword, I have a 10-ft radius aura that grants me and my allies advantage on saving throws against spells and magical effects."
		},
		"paladin level 17+ (30-ft aura)" : {
			name : "Holy\u200A\u200A Avenger",
			description : "I have a +3 bonus to attack and damage rolls made with this magic sword. It does +2d10 radiant damage against fiends and undead. While holding the drawn sword, I have a 30-ft radius aura that grants me and my allies advantage on saving throws against spells and magical effects."
		}
	},
	"luck blade" : {
		name : "Luck Blade",
		source : [["SRD", 229], ["D", 179]],
		type : "weapon (any sword)",
		rarity : "legendary",
		magicItemTable : "I",
		attunement: true,
		description : "This magic sword has a +1 bonus to attack and damage rolls made with it, and grants me +1 to all saves. Once per dawn, I can use its luck to reroll one attack, ability check, or save, but I must use the second result. As an action, I can use one of its 1d4-1 charges to cast Wish. Charges can't be regained.",
		descriptionFull : "You gain a +1 bonus to attack and damage rolls made with this magic weapon. While the sword is on your person, you also gain a +1 bonus to saving throws.\n   " + toUni("Luck") + ". If the sword is on your person, you can call on its luck (no action required) to reroll one attack roll, ability check, or saving throw you dislike. You must use the second roll. This property can't be used again until the next dawn.\n   " + toUni("Wish") + ". The sword has 1d4-1 charges. While holding it, you can use an action to expend 1 charge and cast the wish spell from it. This property can't be used again until the next dawn. The sword loses this property if it has no charges.",
		extraLimitedFeatures : [{
			name : "Luck Blade - luck reroll",
			usages : 1,
			recovery : "Dawn"
		}, {
			name : "Luck Blade - cast Wish",
			usages : "1d4-1",
			recovery : "Never"
		}],
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "brackets",
			descriptionChange : ["replace", "sword"],
			excludeCheck : function (inObjKey, inObj) {
				var testRegex = /sword|scimitar|rapier/i;
				return !(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon));
			}
		},
		addMod : [{ type : "save", field : "all", mod : 1, text : "While the Luck Blade is on my person, I gain a +1 to all my saving throws." }],
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*luck)(?=.*blade).*$/i).test(v.WeaponText)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
					}
				},
				'If I include the words "Luck Blade" in a the name of a sword, it will be treated as the magic weapon Luck Blade. It has +1 to hit and damage.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*luck)(?=.*blade).*$/i).test(v.WeaponText)) {
						output.magic = v.thisWeapon[1] + 1;
					}
				}, ''
			]
		}
	},
	"nine lives stealer" : {
		name : "Nine Lives Stealer",
		source : [["SRD", 231], ["D", 183]],
		type : "weapon (any sword)",
		rarity : "very rare",
		magicItemTable : "H",
		attunement: true,
		description : "I have a +2 bonus to attack and damage rolls with this magic sword. It has 1d8+1 charges and if it inflicts a critical hit while it has charges left on a creature with fewer than 100 HP (and that is not a construct or undead, the target must make a DC 15 Con save or die. If it dies, the sword uses a charge.",
		descriptionFull : "You gain a +2 bonus to attack and damage rolls made with this magic weapon.\n   The sword has 1d8+1 charges. If you score a critical hit against a creature that has fewer than 100 hit points, it must succeed on a DC 15 Constitution saving throw or be slain instantly as the sword tears its life force from its body (a construct or an undead is immune). The sword loses 1 charge if the creature is slain. When the sword has no charges remaining, it loses this property.",
		usages : "1d8+1",
		recovery : "Never",
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "brackets",
			descriptionChange : ["replace", "sword"],
			excludeCheck : function (inObjKey, inObj) {
				var testRegex = /sword|scimitar|rapier/i;
				return !(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon));
			}
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*(9|nine))(?=.*(lives|life))(?=.*stealer).*$/i).test(v.WeaponText)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + 'On crit to target <100 HP, DC 15 Con save or die';
					}
				},
				'If I include the words "Nine Lives Stealer" in a the name of a sword, it will be treated as the magic weapon Nine Lives Stealer. It has +2 to hit and damage. Also, as long as it has charges left, when it does a critical hit against a creature with fewer than 100 HP, that creature must make a DC 15 Constitution saving throw or die.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*luck)(?=.*blade).*$/i).test(v.WeaponText)) {
						output.magic = v.thisWeapon[1] + 2;
					}
				}, ''
			]
		}
	},
	"potion of speed" : {
		name: "Potion of Speed",
		source: [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity: "very rare",
		magicItemTable : "D",
		description: "As an action, I can drink this potion or administer it to another to gain the effects of Haste for 1 minute (no concentration required).\rThe potion's yellow fluid is streaked with black and swirls on its own.",
		descriptionFull: "When you drink this potion, you gain the effect of the Haste spell for 1 minute (no concentration required). The potion's yellow fluid is streaked with black and swirls on its own.",
		weight: 0.5
	},
	"ring of jumping" : {
		name : "Ring of Jumping",
		source : [["SRD", 236], ["D", 191]],
		type : "ring",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "As a bonus action, I can use this ring to cast Jump on myself. That spell causes my jump distance to triple for 1 minute.",
		descriptionFull : "While wearing this ring, you can cast the Jump spell from it as a bonus action at will, but can target only yourself when you do so.",
		attunement : true,
		action : ["bonus", ""],
		spellcastingBonus : {
			name : "Self Only",
			spells : ["jump"],
			selection : ["jump"],
			firstCol : "atwill"
		}
	},
	"ring of swimming" : {
		name : "Ring of Swimming",
		source : [["SRD", 238], ["D", 193]],
		type : "ring",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "I have a swimming speed of 40 feet while wearing this ring.",
		descriptionFull : "You have a swimming speed of 40 feet while wearing this ring.",
		speed : { swim : { spd : 40, enc : 30 } }
	},
	"sun blade" : {
		name : "Sun Blade",
		source : [["SRD", 246], ["D", 205]],
		type : "weapon (longsword)",
		rarity : "rare",
		magicItemTable : "G",
		attunement : true,
		description : "As a bonus action, I can have this hilt create a blade of radiance. While the blade exists, it acts like a longsword that does +2 to attack and damage rolls, radiant damage (+1d8 to undead), has finesse, emits bright sunlight in a 15-ft radius and dim light in another 15 ft. As an action, I can change the light's radius by 5 ft.",
		descriptionLong : "As a bonus action, I can have this longsword hilt create or dismiss a blade of pure radiance. While the blade exists, it acts like a longsword that grants a +2 bonus to attack and damage rolls, does radiant damage and has the finesse property. It also deals +1d8 radiant damage to undead and emits sunlight, bright light in a 15-ft radius and dim light in an additional 15-ft radius. As an action, I can expand or reduce both the bright and dim light's radius by 5 ft each, to a maximum of 30 feet each or a minimum of 10 feet each. I am proficient with this weapon if I'm proficient with either longswords or shortswords.",
		descriptionFull: "This item appears to be a longsword hilt. While grasping the hilt, you can use a bonus action to cause a blade of pure radiance to spring into existence, or make the blade disappear. While the blade exists, this magic longsword has the finesse property. If you are proficient with shortswords or longswords, you are proficient with the sun blade.\n   You gain a +2 bonus to attack and damage rolls made with this weapon, which deals radiant damage instead of slashing damage. When you hit an undead with it, that target takes an extra 1d8 radiant damage.\n   The sword's luminous blade emits bright light in a 15-foot radius and dim light for an additional 15 feet. The light is sunlight. While the blade persists, you can use an action to expand or reduce its radius of bright and dim light by 5 feet each, to a maximum of 30 feet each or a minimum of 10 feet each.",
		weight: 3,
		action : [["bonus action", " (start/stop)"], ["action", " (change light)"]],
		addWeapons : ["Sun Blade"],
		weaponOptions : {
			baseWeapon : "longsword",
			regExpSearch : /^(?=.*sun)(?=.*blade).*$/i,
			name : "Sun Blade",
			source : [["SRD", 246], ["D", 205]],
			damage : [1, 8, "radiant"],
			description : "Finesse, versatile (1d10); +1d8 damage to undead",
			modifiers : [2, 2]
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (v.theWea.name == "Sun Blade" && !fields.prof) {
						fields.prof = CurrentProfs.weapon.otherWea.finalProfs.indexOf("shortsword") !== -1;
					}
				}, ''
			]
		}
	},
	"sword of life stealing" : {
		name : "Sword of Life Stealing",
		nameTest : "of Life Stealing",
		source : [["SRD", 246], ["D", 206]],
		type : "weapon (any sword)",
		rarity : "rare",
		magicItemTable : "G",
		attunement : true,
		description : "When I attack a creature with this magic sword and roll a 20 on the attack roll, that target takes an extra 10 necrotic damage if it isn't a construct or an undead. I then also gain 10 temporary hit points.",
		descriptionFull : "When you attack a creature with this magic weapon and roll a 20 on the attack roll, that target takes an extra 10 necrotic damage if it isn't a construct or an undead. You also gain 10 temporary hit points.", // the SRD says 3d6 but that is incorrect
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "prefix",
			descriptionChange : ["replace", "sword"],
			excludeCheck : function (inObjKey, inObj) {
				var testRegex = /sword|scimitar|rapier/i;
				return !(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon));
			}
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*life)(?=.*stealing).*$/i).test(v.WeaponText)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + 'On 20 to hit: +10 Necrotic dmg, 10 temp HP';
					}
				},
				'If I include the words "Life Stealing" in a the name of a sword, it will be treated as the magic weapon Sword of Life Stealing. It does +10 necrotic damage when I roll a 20 on the attack roll and then gives me 10 temporary hit points. It doesn\'t work against Constructs or Undead.'
			]
		}
	},
	"sword of sharpness" : {
		name : "Sword of Sharpness",
		nameTest : "of Sharpness",
		source : [["SRD", 246], ["D", 206]],
		type : "weapon (any sword that deals slashing damage)",
		rarity : "rare",
		magicItemTable : "H",
		attunement : true,
		description : "When I roll a 20 to hit with this magic sword vs. a creature, it takes +14 slashing damage and I have a 5% chance of lobbing off one of its limbs. It does maximum damage vs. objects. With the command word, the blade gives bright light in a 10-ft radius & dim light in another 10 ft. " + (typePF ? "This stops if sheathed." : "The light stops when commanded again or sheathed."),
		descriptionLong : "When I attack a creature with this magic sword and roll a 20 on the attack roll, that target takes an extra 14 slashing damage and I roll another d20. If that turns op 20 as well, I lob off one of the target's limbs. If the creature has no limb to sever, you lop off a portion of its body instead. When used against an object, the damage dice are maximized. In addition, I can speak the sword's command word to cause the blade to shed bright light in a 10-foot radius and dim light for an additional 10 feet. Speaking the command word again or sheathing the sword puts out the light.",
		descriptionFull : "When you attack an object with this magic sword and hit, maximize your weapon damage dice against the target.\n   When you attack a creature with this weapon and roll a 20 on the attack roll, that target takes an extra 14 slashing damage. Then roll another d20. If you roll a 20, you lop off one of the target's limbs, with the effect of such loss determined by the DM. If the creature has no limb to sever, you lop off a portion of its body instead.\n   In addition, you can speak the sword's command word to cause the blade to shed bright light in a 10-foot radius and dim light for an additional 10 feet. Speaking the command word again or sheathing the sword puts out the light.", // the SRD says 4d6 but that is incorrect
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "prefix",
			descriptionChange : ["replace", "sword"],
			excludeCheck : function (inObjKey, inObj) {
				var testRegex = /sword|scimitar|rapier/i;
				return (!(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon))) || (inObj.baseWeapon && !inObj.damage ? WeaponsList[inObj.baseWeapon].damage : inObj.damage)[2] !== "slashing";
			}
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/of sharpness/i).test(v.WeaponText) && v.theWea.damage[2] == "slashing") {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + 'On 20 to hit: +14 damage \u0026 5% chance to sever limb; Max damage vs. objects';
					}
				},
				'If I include the words "of Sharpness" in a the name of a sword that deals slashing damage, it will be treated as the magic weapon Sword of Sharpness. It deals maximum damage against objects. On a roll of 20 to hit against creatures, it deals +14 slashing damage and has a 5% chance to lob off one limb.'
			]
		}
	},
	"sword of wounding" : {
		name : "Sword of Wounding",
		nameTest : "of Wounding",
		source : [["SRD", 246], ["D", 207]],
		type : "weapon (any sword)",
		rarity : "rare",
		magicItemTable : "G",
		attunement : true,
		description : "HP lost to this sword can be regained only by resting. Once per turn, I can wound a target hit with this sword. At the start of its turn, it takes 1d4 necrotic damage per such wound, and then makes a DC 15 Con save to stop all wounds on itself. " + (typePF ? "It or another can stop them as an action (DC 15 Medicine)." : "Alternatively, the target or another can stop them with an action (DC 15 Medicine check)."),
		descriptionLong : "Hit points lost to this magic sword can be regained only through a short or long rest, not by regeneration, magic, or other means. Once per turn, when I hit a creature with this sword, I can wound the target. At the start of each of the wounded creature's turns, it takes 1d4 necrotic damage for each time I've wounded it, and it can then make a DC 15 Constitution save to end the effect of all such wounds on itself. Alternatively, the wounded creature, or another within 5 feet of it, can use an action to make a DC 15 Wisdom (Medicine) check to end the effect of all such wounds on it.",
		descriptionFull : "Hit points lost to this weapon's damage can be regained only through a short or long rest, rather than by regeneration, magic, or any other means.\n   Once per turn, when you hit a creature with an attack using this magic weapon, you can wound the target. At the start of each of the wounded creature's turns, it takes 1d4 necrotic damage for each time you've wounded it, and it can then make a DC 15 Constitution saving throw, ending the effect of all such wounds on itself on a success. Alternatively, the wounded creature, or a creature within 5 feet of it, can use an action to make a DC 15 Wisdom (Medicine) check, ending the effect of such wounds on it on a success.",
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "prefix",
			descriptionChange : ["replace", "sword"],
			excludeCheck : function (inObjKey, inObj) {
				var testRegex = /sword|scimitar|rapier/i;
				return !(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon));
			}
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/of wounding/i).test(v.WeaponText)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + 'Damage can only be healed by resting; Once per turn, wound target';
					}
				},
				'If I include the words "of Wounding" in a the name of a sword, it will be treated as the magic weapon Sword of Wounding. Damage by the sword can only be regained with a short or long rest. Once per turn when I hit with the sword, I can inflict a lingering wound on a target, causing it pain every turn thereafter.'
			]
		}
	},
	"vicious weapon" : {
		name : "Vicious Weapon",
		nameTest : "Vicious",
		source : [["SRD", 248], ["D", 209]],
		type : "weapon (any)",
		rarity : "rare",
		magicItemTable : "G",
		description : "When I roll a 20 on my attack roll with this magic weapon, the target takes an extra 7 damage of the weapon's type.",
		descriptionFull : "When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 7 damage of the weapon's type.",
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "suffix",
			descriptionChange : ["replace", "weapon"]
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && (/vicious/i).test(v.WeaponText)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + 'On 20 to hit: +7 damage';
					}
				},
				'If I include the word "Vicious" in a the name of a weapon, it will be treated as the magic weapon Vicious Weapon. On a roll of 20 to hit, it does +7 damage of the weapons type.'
			]
		}
	},
	"vorpal sword" : {
		name : "Vorpal Sword",
		nameTest : "Vorpal",
		source : [["SRD", 248], ["D", 209]],
		type : "weapon (any sword that deals slashing damage)",
		rarity : "legendary",
		magicItemTable : "I",
		attunement : true,
		description : "I have a +3 bonus to attack and damage rolls with this magic sword. It ignores slashing damage resistance. On a roll of 20 to hit, it cuts of one head" + (typePF ? "" : ", possibly killing it instantly") + ". If the target has no head, is immune to slashing damage, has legendary actions, or its neck is too big, it takes +6d8 slashing damage instead.",
		descriptionFull : "You gain a +3 bonus to attack and damage rolls made with this magic weapon. In addition, the weapon ignores resistance to slashing damage.\n   When you attack a creature that has at least one head with this weapon and roll a 20 on the attack roll, you cut off one of the creature's heads. The creature dies if it can't survive without the lost head. A creature is immune to this effect if it is immune to slashing damage, doesn't have or need a head, has legendary actions, or the DM decides that the creature is too big for its head to be cut off with this weapon. Such a creature instead takes an extra 6d8 slashing damage from the hit.",
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "suffix",
			descriptionChange : ["replace", "sword"],
			excludeCheck : function (inObjKey, inObj) {
				var testRegex = /sword|scimitar|rapier/i;
				return (!(testRegex).test(inObjKey) && (!inObj.baseWeapon || !(testRegex).test(inObj.baseWeapon))) || (inObj.baseWeapon && !inObj.damage ? WeaponsList[inObj.baseWeapon].damage : inObj.damage)[2] !== "slashing";
			}
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/vorpal/i).test(v.WeaponText) && v.theWea.damage[2] == "slashing") {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + 'Ignores slashing resistance; On 20 to hit: cut of head';
					}
				},
				'If I include the word "Vorpal" in a the name of a sword that deals slashing damage, it will be treated as the magic weapon Vorpal Sword. It has +3 to hit and damage and on a roll of 20 on the attack roll, it cuts of a head of the target.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/vorpal/i).test(v.WeaponText) && v.theWea.damage[2] == "slashing") {
						output.magic = v.thisWeapon[1] + 3;
					}
				}, ''
			]
		}
	},
	"weapon, +1, +2, or +3" : {
		name : "Weapon, +1, +2, or +3",
		source : [["SRD", 250], ["D", 213]],
		type : "weapon (any)",
		rarity: "varies",
		description : "I have a bonus to attack and damage rolls made with this magic weapon. The bonus is determined by the rarity of the magic item: uncommon (+1), rare (+2), or very rare (+3). Select the bonus using the little square button in this magic item line.",
		descriptionFull : "You have a bonus to attack and damage rolls made with this magic weapon. The bonus is determined by the weapon's rarity: uncommon (+1), rare (+2), or very rare (+3).",
		allowDuplicates : true,
		chooseGear : {
			type : "weapon",
			prefixOrSuffix : "brackets",
			descriptionChange : ["replace", "weapon"]
		},
		choices : ["+1 Weapon (uncommon)", "+2 Weapon (rare)", "+3 Weapon (very rare)"],
		"+1 weapon (uncommon)" : {
			name : "Weapon +1",
			rarity: "uncommon",
			magicItemTable : "F",
			description : "I have a +1 bonus to attack and damage rolls made with this magic weapon.",
			allowDuplicates : true
		},
		"+2 weapon (rare)" : {
			name : "Weapon +2",
			rarity: "rare",
			magicItemTable : "F",
			description : "I have a +2 bonus to attack and damage rolls made with this magic weapon.",
			allowDuplicates : true
		},
		"+3 weapon (very rare)" : {
			name : "Weapon +3",
			rarity: "very rare",
			magicItemTable : "H",
			description : "I have a +3 bonus to attack and damage rolls made with this magic weapon.",
			allowDuplicates : true
		}
	},
};