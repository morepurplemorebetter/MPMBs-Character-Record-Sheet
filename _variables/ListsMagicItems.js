var TreasureCheckpointsTable = {
	A : { tier : 1, points : 8 },
	B : { tier : 1, points : 8 },
	C : { tier : 1, points : 8 },
	D : { tier : 2, points : 16 },
	E : { tier : 3, points : 16 },
	F : { tier : 1, points : 16 },
	G : { tier : 2, points : 20 },
	H : { tier : 3, points : 20 },
	I : { tier : 3, points : 24 }
}

var Base_MagicItemsList = {
	"adamantine armor" : {
		name : "Adamantine Armor",
		nameTest : "Adamantine",
		source : [["SRD", 207], ["D", 150]],
		type : "armor (medium or heavy)",
		rarity : "uncommon",
		description : "This armor is reinforced with adamantine, one of the hardest substances in existence. While I'm wearing it, any critical hit against me becomes a normal hit.",
		descriptionFull : "This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any critical hit against you becomes a normal hit.\n\nThere are several magic item tables in the Dungeon Masters Guide where this item appears on. It varies per type of armor and not all types are listed. See below for the table:\n\n" + toUni("Armor Type\tTable") + "\nChain Mail\t  F\nChain Shirt\t  F\nScale Mail  \t  F\nBreastplate\t  G\nSplint Armor\t  G\nHalf Plate Armor\t  H\nPlate Armor\t  H",
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
			nameTest : "+1 Ammunition",
			rarity : "uncommon",
			magicItemTable : "B",
			description : "I have a +1 bonus to attack and damage rolls made with this magic ammunition. Once it hits a target, the ammunition is no longer magical.",
			allowDuplicates : true
		},
		"+2 ammunition (rare)" : {
			name : "Ammunition +2",
			nameTest : "+2 Ammunition",
			rarity : "rare",
			magicItemTable : "C",
			description : "I have a +2 bonus to attack and damage rolls made with this magic ammunition. Once it hits a target, the ammunition is no longer magical.",
			allowDuplicates : true
		},
		"+3 ammunition (very rare)" : {
			name : "Ammunition +3",
			nameTest : "+3 Ammunition",
			rarity : "very rare",
			magicItemTable : "D",
			description : "I have a +3 bonus to attack and damage rolls made with this magic ammunition. Once it hits a target, the ammunition is no longer magical.",
			allowDuplicates : true
		}
	},
	"amulet of health" : {
		name : "Amulet of Health",
		source : [["SRD", 207], ["D", 150]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "My Constitution score is 19 while I'm wearing this amulet, provided that my Constitution is not already 19 or higher.",
		descriptionFull : "Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution score is already 19 or higher without it.",
		attunement : true,
		weight : 1,
		scoresOverride : [0, 0, 19, 0, 0, 0]
	},
	"amulet of proof against detection and location" : {
		name : "Amulet of Proof against Detection and Location",
		source : [["SRD", 207], ["D", 150]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		attunement : true,
		description : "While wearing this amulet, I am hidden from Divination magic. I can't be targeted by such magic or perceived through magical scrying sensors.",
		descriptionFull : "While wearing this amulet, you are hidden from Divination magic. You can't be targeted by such magic or perceived through magical scrying sensors.",
		weight : 1
	},
	"amulet of the planes" : { // contains contributions by Larry Hoy
		name : "Amulet of the Planes",
		source : [["SRD", 207], ["D", 150]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "As an action, I name a location that I am familiar with on another plane of existence and make a DC 15 Int check. On a success, I cast Plane Shift. On a failure, all creatures/objects within 15 ft of me and myself travel to (d100): [1-60] a random location on the named plane, or [61-100] a randomly determined plane.",
		descriptionFull : "While wearing this amulet, you can use an action to name a location that you are familiar with on another plane of existence. Then make a DC 15 Intelligence check. On a successful check, you cast the Plane Shift spell. On a failure, you and each creature and object within 15 feet of you travel to a random destination. Roll a d100. On a 1-60, you travel to a random location on the plane you named. On a 61-100, you travel to a randomly determined plane of existence.",
		attunement : true,
		weight : 1,
		spellcastingAbility : "class",
		spellcastingBonus : {
			name : "DC 15 Int check",
			spells : ["plane shift"],
			selection : ["plane shift"],
			firstCol : "atwill"
		},
		spellChanges : {
			"plane shift" : {
				description : "DC 15 Int to cast; Me + 8 willing transport to other plane, or spell atk + save to move to random plane",
				component : "V,M\u0192",
				changes : "The spell can be cast at will, but requires a DC 15 Intelligence check to do so, with negative consequences on a failure."
			}
		}
	},
	"animated shield" : { // contributed by Larry Hoy
		name : "Animated Shield",
		source : [["SRD", 208], ["D", 183]],
		type : "shield",
		rarity : "very rare",
		magicItemTable : "H",
		description : "As a bonus action, I speak the command word to animate this shield for 1 minute, until I use a bonus action to end this effect (returns to my hand), or until I am incapacitated or die (falls to ground). The shield leaps into the air, hovering in my space to protect me as if I were wielding it, leaving my hands free.",
		descriptionFull : "While holding this shield, you can speak its command word as a bonus action to cause it to animate. The shield leaps into the air and hovers in your space to protect you as if you were wielding it, leaving your hands free. The shield remains animated for 1 minute, until you use a bonus action to end this effect, or until you are incapacitated or die, at which point the shield falls to the ground or into your hand if you have one free.",
		attunement : true,
		weight : 6,
		action : [["bonus action", ""]],
		shieldAdd : "Animated Shield"
	},
	"apparatus of kwalish" : { // contributed by Larry Hoy
		name : "Apparatus of Kwalish",
		nameAlt : "Apparatus of the Crab",
		source : [["SRD", 208], ["D", 151]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description: "A Large 500 lb iron barrel. DC 20 Intelligence (Investigation) check finds a hidden hatch at one end, allowing two Medium creatures inside. Transforms to resemble a giant lobster, which is air-tight (10 hours of breathable air), floats, and can submerge to 900 ft deep. See Notes page for its statistics and operation.",
		descriptionLong: "A Large sealed iron barrel weighing 500 lb. A successful DC 20 Intelligence (Investigation) check finds a hidden catch unlocking a hatch at one end of the barrel, allowing two Medium or smaller creatures to crawl inside. Ten levers are set in a row at the far end, each in a neutral position, able to move either up or down. Certain levers transform the barrel to resemble a giant lobster, which is air-tight (10 hours of breathable air), floats, and submerges to a depth of 900 ft. See Notes page for its statistics and operation.",
		descriptionFull : "This item first appears to be a Large sealed iron barrel weighing 500 pounds. The barrel has a hidden catch, which can be found with a successful DC 20 Intelligence (Investigation) check. Releasing the catch unlocks a hatch at one end of the barrel, allowing two Medium or smaller creatures to crawl inside. Ten levers are set in a row at the far end, each in a neutral position, able to move either up or down. When certain levers are used, the apparatus transforms to resemble a giant lobster.\n   The apparatus of Kwalish is a Large object with the following statistics:\n   Armor Class: 20\n   Hit Points: 200\n   Speed: 30 ft., swim 30 ft. (or 0 ft. for both if the legs and tail aren't extended)\n   Damage Immunities: poison, psychic\n   To be used as a vehicle, the apparatus requires one pilot. While the apparatus's hatch is closed, the compartment is airtight and watertight. The compartment holds enough air for 10 hours of breathing, divided by the number of breathing creatures inside.\n   The apparatus floats on water. It can also go underwater to a depth of 900 feet. Below that, the vehicle takes 2d6 bludgeoning damage per minute from pressure.\n   A creature in the compartment can use an action to move as many as two of the apparatus's levers up or down. After each use, a lever goes back to its neutral position. Each lever, from left to right, functions as shown in the Apparatus of Kwalish Levers table.\n\n" + toUni("Lever\tUp\tDown") + "\n1\tLegs and tail extend, allowing the apparatus to walk and swim.\tLegs and tail retract, reducing the apparatus's speed to 0 and making it unable to benefit from bonuses to speed.\n2\tForward window shutter opens.\tForward window shutter closes.\n3\tSide window shutters open (two per side).\tSide window shutters close (two per side).\n4\tTwo claws extend from the front sides of the apparatus.\tThe claws retract.\n5\tEach extended claw makes the following melee weapon attack: +8 to hit, reach 5 ft., one target. Hit: 7 (2d6) bludgeoning damage.\tEach extended claw makes the following melee weapon attack: +8 to hit, reach 5 ft., one target. Hit: The target is grappled (escape DC 15).\n6\tThe apparatus walks or swims forward.\tThe apparatus walks or swims backward.\n7\tThe apparatus turns 90 degrees left.\tThe apparatus turns 90 degrees right.\n8\tEyelike fixtures emit bright light in a 30-foot radius and dim light for an additional 30 feet.\tThe light turns off.\n9\tThe apparatus sinks as much as 20 feet in liquid.\tThe apparatus rises up to 20 feet in liquid.\n10\tThe rear hatch unseals and opens.\tThe rear hatch closes and seals.",
		weight : 500,
		toNotesPage : [{
			name : "Statistics \u0026 Lever Operation Details",
			popupName : "Apparatus of Kwalish Statistics \u0026 Lever Operation Details",
			note : [
				"This item first appears to be a Large sealed iron barrel weighing 500 pounds. The barrel has a hidden catch, which can be found with a successful DC 20 Intelligence (Investigation) check. Releasing the catch unlocks a hatch at one end of the barrel, allowing two Medium or smaller creatures to crawl inside. Ten levers are set in a row at the far end, each in a neutral position, able to move either up or down. When certain levers are used, the apparatus transforms to resemble a giant lobster.",
				"The apparatus of Kwalish is a Large object with the following statistics:",
				"  \u2022 Armor Class: 20",
				"  \u2022 Hit Points: 200",
				"  \u2022 Speed: 30 ft, swim 30 ft (only with legs & tail extended)",
				"  \u2022 Damage Immunities: poison, psychic",
				"To be used as a vehicle, the apparatus requires one pilot. While the apparatus's hatch is closed, the compartment is airtight and watertight. The compartment holds enough air for 10 hours of breathing, divided by the number of breathing creatures inside.",
				"The apparatus floats on water. It can also go underwater to a depth of 900 feet. Below that, the vehicle takes 2d6 bludgeoning damage per minute from pressure.",
				"A creature in the compartment can use an action to move as many as two of the apparatus's levers up or down. After each use, a lever goes back to its neutral position. Each lever, from left to right, functions as shown in the Apparatus of Kwalish Levers table.\n\nLEVER\tUP\t\t\tDOWN",
				"01\tLegs/tail extend (speeds: 30 ft)\tLegs/tail retract (speeds: 0)",
				"02\tForward shutter opens\t\tForward shutter closes",
				"03\tSide shutters open (two per side)\tSide shutters close",
				"04\tClaws extend from front sides\tClaws retract",
				"05\tClaw: +8, 5 ft, 2d6 bludgeoning\tClaw: +8, 5 ft, DC 15 grapple",
				"06\tWalk or swim forward\t\tWalk or swim backward",
				"07\tTurn 90 degrees left\t\tTurn 90 degrees right",
				"08\tEyes emit 30 ft bright + dim light\tEye lights turn off",
				"09\tSink up to 20 ft in liquid\tRise up to 20 ft in liquid",
				"10\tRear hatch unseals and opens\tRear hatch closes and seals"
			]
		}]
	},
	"armor, +1, +2, or +3" : {
		name : "Armor, +1, +2, or +3",
		source : [["SRD", 208], ["D", 152]],
		type : "armor (light, medium, or heavy)",
		description : "I have a bonus to AC while wearing this armor. The bonus is determined by the rarity of the magic item: rare (+1), very rare (+2), or legendary (+3). Select the bonus using the little square button in this magic item line.",
		descriptionFull : "You have a bonus to AC while wearing this armor. The bonus is determined by its rarity: rare (+1), very rare (+2), or legendary (+3).\n\nThere are several magic item tables in the Dungeon Masters Guide where this item appears on. It varies per type of armor and magic bonus, with not all types of combinations listed. See below for the table per type of armor and bonus:\n\n" + toUni("Table\tBonus\tArmor Types") +
		"\n  G\t  +1\tChain Mail, Chain Shirt, Leather" +
		"\n  G\t  +1\tScale Mail, Spiked Armor" +
		"\n  H\t  +1\tBreastplate, Splint, Studded Leather" +
		"\n  H\t  +2\tChain Mail, Chain Shirt, Leather" +
		"\n  H\t  +2\tScale Mail, Spiked Armor" +
		"\n  I\t  +1\tHalf Plate, Plate, Scale Mail" +
		"\n  I\t  +2\tBreastplate, Half Plate, Plate, Scale Mail" +
		"\n  I\t  +2\tSplint, Studded Leather" +
		"\n  I\t  +3\tBreastplate, Chain Mail, Chain Shirt" +
		"\n  I\t  +3\tHalf Plate, Leather, Plate" +
		"\n  I\t  +3\tSpiked Armor, Splint, Studded Leather",
		allowDuplicates : true,
		chooseGear : {
			type : "armor",
			prefixOrSuffix : "brackets",
			descriptionChange : ["prefix", "armor"]
		},
		choices : ["+1 AC bonus (rare)", "+2 AC bonus (very rare)", "+3 AC bonus (legendary)"],
		"+1 ac bonus (rare)" : {
			name : "Armor +1",
			nameTest : "+1 Armor",
			rarity : "rare",
			description : "I have a +1 bonus to AC while wearing this armor.",
			allowDuplicates : true
		},
		"+2 ac bonus (very rare)" : {
			name : "Armor +2",
			nameTest : "+2 Armor",
			rarity : "very rare",
			description : "I have a +2 bonus to AC while wearing this armor.",
			allowDuplicates : true
		},
		"+3 ac bonus (legendary)" : {
			name : "Armor +3",
			nameTest : "+3 Armor",
			rarity : "legendary",
			description : "I have a +3 bonus to AC while wearing this armor.",
			allowDuplicates : true
		}
	},
	"armor of invulnerability" : { // contains contributions by Larry Hoy
		name : "Armor of Invulnerability",
		source : [["SRD", 208], ["D", 152]],
		type : "armor (plate)",
		rarity : "legendary",
		magicItemTable : "I",
		description : "I have resistance to nonmagical damage while I wear this armor. As an action, I can make yourself immune to nonmagical damage for 10 minutes or until I am no longer wearing the armor. Once this special action is used, it can't be used again until the next dawn.",
		descriptionFull : "You have resistance to nonmagical damage while you wear this armor. Additionally, you can use an action to make yourself immune to nonmagical damage for 10 minutes or until you are no longer wearing the armor. Once this special action is used, it can't be used again until the next dawn.",
		attunement : true,
		weight : 65,
		usages: 1,
		recovery: "dawn",
		action : [["action", " (immunity)"]],
		dmgres : [ ["All", "All (nonmagical)"] ],
		armorAdd : "Armor of Invulnerability",
		armorOptions : {
			regExpSearch : /^(?=.*armor)(?=.*invulnerability).*$/i,
			name : "Armor of Invulnerability",
			source: [["SRD", 208], ["D", 152]],
			type : "heavy",
			ac : 18,
			stealthdis : true,
			weight : 65,
			strReq : 15
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
	"armor of vulnerability" : { // contains contributions by Larry Hoy
		name: "Armor of Vulnerability",
		source: [["SRD", 209], ["D", 152]],
		type : "armor (plate)",
		rarity: "rare",
		magicItemTable : "G",
		description: "While wearing this armor, I have resistance to one of the following damage types: bludgeoning, piercing, or slashing; although, unfortunately, I have vulnerability to the other two until I am targeted by a Remove Curse spell.",
		descriptionFull: "While wearing this armor, you have resistance to one of the following damage types: bludgeoning, piercing, or slashing. The DM chooses the type or determines it randomly.\n   " + toUni("Curse") + ". This armor is cursed, a fact that is revealed only when an Identify spell is cast on the armor or you attune to it. Attuning to the armor curses you until you are targeted by the Remove Curse spell or similar magic; removing the armor fails to end the curse. While cursed, you have vulnerability to two of the three damage types associated with the armor (not the one to which it grants resistance).",
		attunement: true,
		allowDuplicates : true,
		weight: 65,
		cursed: true,
		armorAdd : "Armor of Vulnerability",
		armorOptions : {
			regExpSearch : /^(?=.*armor)(?=.*vulnerability).*$/i,
			name : "Armor of Vulnerability",
			source: [["SRD", 209], ["D", 152]],
			type : "heavy",
			ac : 18,
			stealthdis : true,
			weight : 65,
			strReq : 15
		},
		choices : ["Bludgeoning", "Piercing", "Slashing"],
		"bludgeoning" : {
			description: "While wearing this armor, I have resistance to bludgeoning damage. Additionally, I have vulnerability to piercing and slashing damage until I am targeted by a Remove Curse spell.",
			dmgres : ["Bludgeoning"],
			savetxt : { text : ["Vulnerable to piercing \u0026 slashing damage"] },
			descriptionFull: "While wearing this armor, I have resistance to bludgeoning damage.\n   " + toUni("Curse") + ". This armor is cursed, a fact that is revealed only when an Identify spell is cast on the armor or I attune to it. Attuning to the armor curses me until I am targeted by the Remove Curse spell or similar magic; removing the armor fails to end the curse. While cursed, I have vulnerability to piercing and slashing damage."
		},
		"piercing" : {
			description: "While wearing this armor, I have resistance to piercing damage. Additionally, I have vulnerability to bludgeoning and slashing damage until I am targeted by a Remove Curse spell.",
			dmgres : ["Piercing"],
			savetxt : { text : ["Vulnerable to bludgeoning \u0026 slashing damage"] },
			descriptionFull: "While wearing this armor, I have resistance to piercing damage.\n   " + toUni("Curse") + ". This armor is cursed, a fact that is revealed only when an Identify spell is cast on the armor or I attune to it. Attuning to the armor curses me until I am targeted by the Remove Curse spell or similar magic; removing the armor fails to end the curse. While cursed, I have vulnerability to bludgeoning and slashing damage."
		},
		"slashing" : {
			description: "While wearing this armor, I have resistance to slashing damage. Additionally, I have vulnerability to bludgeoning and piercing damage until I am targeted by a Remove Curse spell.",
			dmgres : ["Slashing"],
			savetxt : { text : ["Vulnerable to bludgeoning \u0026 piercing damage"] },
			descriptionFull: "While wearing this armor, I have resistance to slashing damage.\n   " + toUni("Curse") + ". This armor is cursed, a fact that is revealed only when an Identify spell is cast on the armor or I attune to it. Attuning to the armor curses me until I am targeted by the Remove Curse spell or similar magic; removing the armor fails to end the curse. While cursed, I have vulnerability to bludgeoning and piercing damage."
		}
	},
	"arrow-catching shield" : { // contains contributions by Larry Hoy
		name : "Arrow-Catching Shield",
		source : [["SRD", 209], ["D", 152]],
		type : "shield",
		rarity : "rare",
		magicItemTable : "G",
		description : "I gain an additional +2 bonus to AC against ranged attacks while I wield this shield. This is not calculated into the AC on the 1st page. In addition, whenever an attacker makes a ranged attack against a target within 5 feet of me, I can use my reaction to become the target of the attack instead.",
		descriptionFull : "You gain a +2 bonus to AC against ranged attacks while you wield this shield. This bonus is in addition to the shield's normal bonus to AC. In addition, whenever an attacker makes a ranged attack against a target within 5 feet of you, you can use your reaction to become the target of the attack instead.",
		attunement : true,
		weight : 6,
		action : [["reaction", ""]],
		shieldAdd : "Arrow-Catching Shield (+2 vs. ranged)"
	},
	"arrow of slaying" : {
		name : "Arro\u200Aw of Slaying",
		nameTest : "of Slaying",
		source : [["SRD", 209], ["D", 152]],
		type : "weapon (any ammunition)",
		rarity : "very rare",
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
	"bag of beans" : { // contributed by Larry Hoy
		name : "Bag of Beans",
		source : [["SRD", 209], ["D", 152]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "C",
		description : "This heavy cloth bag contains 3d4 dry beans. I can dump all on the ground, causing a 10-ft explosion that deals 5d4 fire damage to all in the area, DC 15 Dex save to half, and ignites unattended flammable objects. I can plant and water a bean to get an effect 1 minute later, chosen by the DM, see notes page.",
		descriptionFull : "Inside this heavy cloth bag are 3d4 dry beans. The bag weighs \xBD pound plus \xBC pound for each bean it contains.\n   If you dump the bag's contents out on the ground, they explode in a 10-foot radius, extending from the beans. Each creature in the area, including you, must make a DC 15 Dexterity saving throw, taking 5d4 fire damage on a failed save, or half as much damage on a successful one. The fire ignites flammable objects in the area that aren't being worn or carried.\n   If you remove a bean from the bag, plant it in dirt or sand, and then water it, the bean produces an effect 1 minute later from the ground where it was planted. The DM can choose an effect from the following table, determine it randomly, or create an effect.\n\n" + toUni("d100\tEffect") + "\n01\t5d4 toadstools sprout. If a creature eats a toadstool, roll any die. On an odd roll, the eater must succeed on a DC 15 Constitution saving throw or take 5d6 poison damage and become poisoned for 1 hour. On an even roll, the eater gains 5d6 temporary hit points for 1 hour.\n02-10\tA geyser erupts and spouts water, beer, berry juice, tea, vinegar, wine, or oil (DM's choice) 30 feet into the air for 1d12 rounds.\n11-20\tA treant sprouts. There's a 50% chance that the treant is chaotic evil and attacks.\n21-30\tAn animate, immobile stone statue in your likeness rises. It makes verbal threats against you. If you leave it and others come near, it describes you as the most heinous of villains and directs the newcomers to find and attack you. If you are on the same plane of existence as the statue, it knows where you are. The statue becomes inanimate after 24 hours.\n31-40\tA campfire with blue flames springs forth and burns for 24 hours (or until it is extinguished).\n41-50\t1d6+6 shriekers sprout.\n51-60\t1d4+8 bright pink toads crawl forth. Whenever a toad is touched, it transforms into a Large or smaller monster of the DM's choice. The monster remains for 1 minute, then disappears in a puff of bright pink smoke.\n61-70\tA hungry bulette burrows up and attacks.\n71-80\tA fruit tree grows. It has 1d10+20 fruit, 1d8 of which act as randomly determined magic potions, while one acts as an ingested poison of the DM's choice. The tree vanishes after 1 hour. Picked fruit remains, retaining any magic for 30 days.\n81-90\tA nest of 1d4+3 eggs springs up. Any creature that eats an egg must make a DC 20 Constitution saving throw. On a successful save, a creature permanently increases its lowest ability score by 1, randomly choosing among equally low scores. On a failed save, the creature takes 10d6 force damage from an internal magical explosion.\n91-99\tA pyramid with a 60-foot-square base bursts upward. Inside is a sarcophagus containing a mummy lord. The pyramid is treated as the mummy lord's lair, and its sarcophagus contains treasure of the DM's choice.\n100\tA giant beanstalk sprouts, growing to a height of the DM's choice. The top leads where the DM chooses, such as to a great view, a cloud giant's castle, or a different plane of existence.",
		weight : 0.5,
		toNotesPage : [{
			name : "Planted bean effects",
			note : "\nd100\tEFFECT\n01\t5d4 toadstools sprout. If a creature eats a toadstool, roll any die. On\n\tan odd roll, the eater must succeed on a DC 15 Constitution saving\n\tthrow or take 5d6 poison damage and become poisoned for 1 hour.\n\tOn an even roll, the eater gains 5d6 temporary hit points for 1 hour.\n02-10\tA geyser erupts and spouts water, beer, berry juice, tea, vinegar, wine,\n\tor oil (DM's choice) 30 feet into the air for 1d12 rounds.\n11-20\tA treant sprouts. There's a 50% chance that the treant is chaotic evil\n\tand attacks.\n21-30\tAn animate, immobile stone statue in your likeness rises. It makes" + (typePF ? "\n\t" : " ") + "verbal threats" + (!typePF ? "\n\t" : " ") + "against you. If you leave it and others come near, it" + (typePF ? "\n\t" : " ") + "describes you as the most" + (!typePF ? "\n\t" : " ") + "heinous of villains and directs the" + (typePF ? "\n\t" : " ") + "newcomers to find and attack you." + (!typePF ? "\n\t" : " ") + "If you are on the same plane of" + (typePF ? "\n\t" : " ") + "existence as the statue, it knows where you are." + (!typePF ? "\n\t" : " ") + "The statue" + (typePF ? "\n\t" : " ") + "becomes inanimate after 24 hours.\n31-40\tA campfire with blue flames springs forth and burns for 24 hours (or\n\tuntil it is extinguished).\n41-50\t1d6+6 shriekers sprout.\n51-60\t1d4+8 bright pink toads crawl forth. Whenever a toad is touched, it" + (typePF ? "\n\t" : " ") + "transforms" + (!typePF ? "\n\t" : " ") + "into a Large or smaller monster of the DM's choice." + (typePF ? "\n\t" : " ") + "The monster remains for" + (!typePF ? "\n\t" : " ") + "1 minute, then disappears in a puff of bright" + (typePF ? "\n\t" : " ") + "pink smoke.\n61-70\tA hungry bulette burrows up and attacks.\n71-80\tA fruit tree grows. It has 1d10+20 fruit, 1d8 of which act as randomly\n\tdetermined magic potions, while one acts as an ingested poison of\n\tthe DM's choice. The tree vanishes after 1 hour. Picked fruit remains,\n\tretaining any magic for 30 days.\n81-90\tA nest of 1d4+3 eggs springs up. Any creature that eats an egg must\n\tmake a DC 20 Constitution saving throw. On a successful save, a\n\tcreature permanently increases its lowest ability score by 1, randomly\n\tchoosing among equally low scores. On a failed save, the creature\n\ttakes 10d6 force damage from an internal magical explosion.\n91-99\tA pyramid with a 60-foot-square base bursts upward. Inside is a" + (typePF ? "\n\t" : " ") + "sarcophagus" + (!typePF ? "\n\t" : " ") + "containing a mummy lord. The pyramid is treated as" + (typePF ? "\n\t" : " ") + "the mummy lord's lair," + (!typePF ? "\n\t" : " ") + "and its sarcophagus contains treasure" + (typePF ? "\n\t" : " ") + "of the DM's choice.\n100\tA giant beanstalk sprouts, growing to a height of the DM's choice.\n\tThe top leads where the DM chooses, such as to a great view,\n\ta cloud giant's castle, or a different plane of existence."
		}]
	},
	"bag of devouring" : {
		name : "Bag of Devouring",
		source : [["SRD", 210], ["D", 153]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "D",
		description : "This bag is a feeding orifice for an extradimensional creature, which is closed if it is turned inside out. It devours all editable matter placed inside. Creatures partially inside get pulled in 50% of the time. Escaping (Str DC 15) or pulling another out (Str DC 20) is an action. Creatures starting their turn inside are devoured.",
		descriptionLong : "Resembling a Bag of Holding, this bag is a feeding orifice for an extradimensional creature. The orifice is closed if the bag is turned inside out. It devours all vegetable and animal matter placed inside. Creatures partially inside get pulled in 50% of the time. Escaping (Str DC 15) or pulling another out (Str DC 20) takes an action. Creatures starting their turn inside are devoured, their body destroyed. Up to 1 cu ft of inanimate objects can be stored inside, but once each day they are swallowed by the creature and spat out on a random plane. Of the bag is pierced or torn, it is destroyed and its content lost.",
		descriptionFull : "This bag superficially resembles a bag of holding but is a feeding orifice for a gigantic extradimensional creature. Turning the bag inside out closes the orifice.\n   The extradimensional creature attached to the bag can sense whatever is placed inside the bag. Animal or vegetable matter placed wholly in the bag is devoured and lost forever. When part of a living creature is placed in the bag, as happens when someone reaches inside it, there is a 50% chance that the creature is pulled inside the bag. A creature inside the bag can use its action to try to escape with a successful DC 15 Strength check. Another creature can use its action to reach into the bag to pull a creature out, doing so with a successful DC 20 Strength check (provided it isn't pulled inside the bag first). Any creature that starts its turn inside the bag is devoured, its body destroyed.\n   Inanimate objects can be stored in the bag, which can hold a cubic foot of such material. However, once each day, the bag swallows any objects inside it and spits them out into another plane of existence. The DM determines the time and plane.\n   If the bag is pierced or torn, it is destroyed, and anything contained within it is transported to a random location on the Astral Plane.",
		weight : 0.5
	},
	"bag of holding" : {
		name : "Bag of Holding",
		source : [["SRD", 210], ["D", 153]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : ["A", "B"],
		description : "This bag is 2 ft in diameter at the mouth, 4 ft deep, and 15 lb regardless of content. It can hold up to 500 lb, not exceeding a volume of 64 cu ft. Retrieving an item from it requires an action. If it's overloaded, pierced, or torn, it's destroyed with its contents in the Astral plane. If turned inside out, all its contents spill forth.",
		descriptionLong : "This bag is 2 ft in diameter at the mouth, 4 ft deep, and 15 lb regardless of content. It can hold up to 500 lb, not exceeding a volume of 64 cu ft. Retrieving an item from it requires an action. If it is overloaded, pierced, or torn, it is destroyed, leaving its contents in the Astral plane. If it is turned inside out, all its contents spill forth unharmed. Breathing creatures inside the bag can breath for 10 minutes divided by the number of creatures in it (minimum 1 minute), after which they begin to suffocate. Placing the bag in an other extradimensional space instantly destroys both and opens a gate to the Astral Plane.",
		descriptionFull : "This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents. Retrieving an item from the bag requires an action.\n   If the bag is overloaded, pierced, or torn, it ruptures and is destroyed, and its contents are scattered in the Astral Plane. If the bag is turned inside out, its contents spill forth, unharmed, but the bag must be put right before it can be used again. Breathing creatures inside the bag can survive up to a number of minutes equal to 10 divided by the number of creatures (minimum 1 minute), after which time they begin to suffocate.\n   Placing a bag of holding inside an extradimensional space created by a Heward's handy haversack, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.",
		weight : 15,
		action : [["action", " (retrieve item)"]]
	},
	"bag of tricks" : { // contributed by Larry Hoy
		name: "Bag of Tricks",
		source: [["SRD", 210], ["D", 154]],
		type: "wondrous item",
		rarity: "uncommon",
		magicItemTable : "F",
		description: "This ordinary bag, made from gray, rust, or tan cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object; which, as an action, I can throw 20 ft, where it transforms into a random creature.",
		descriptionFull: "This ordinary bag, made from gray, rust, or tan cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. The bag weighs \u00BD pound.\n   You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table that corresponds to the bag's color. The creature vanishes at the next dawn or when it is reduced to 0 hit points.\n   The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature.\n   Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.",
		weight: 0.5,
		allowDuplicates : true,
		action : [["action", " (pull)"], ["bonus action", " (command)"]],
		usages : 3,
		recovery : "dawn",
		choices : ["Gray", "Rust", "Tan"],
		"gray" : {
			name: "Gray Bag of Tricks",
			description: "As an action, 3 times per dawn, I can pull an object from this bag and throw it 20 ft. It transforms into a random creature when it lands (d8): 1-weasel, 2-giant rat, 3-badger, 4-boar, 5-panther, 6-giant badger, 7-dire wolf, 8-giant elk. It follows my commands, acts on my turn, and vanishes at dawn or if reduced to 0 HP.",
			descriptionLong: "As an action, I can pull a fuzzy object from this bag and throw it 20 ft. It transforms into a creature when it lands, determined randomly (d8): 1-weasel, 2-giant rat, 3-badger, 4-boar, 5-panther, 6-giant badger, 7-dire wolf, 8-giant elk. The creature is friendly, acts on my turn, and vanishes at the next dawn or when it is reduced to 0 HP. As a bonus action, I can command it how to move and what action to take on its next turn, or give it general orders (e.g. attack my enemies). Without orders, it acts as it normally would. Once three fuzzy objects have been pulled from the bag, it can't be used again until the next dawn.",
			descriptionFull: "This ordinary bag, made from gray cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. The bag weighs \u00BD pound.\n   You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table. The creature vanishes at the next dawn or when it is reduced to 0 hit points.\n   The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature.\n   Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\n\n" + toUni("d8\tCreature") + "\n 1\tWeasel\n 2\tGiant rat\n 3\tBadger\n 4\tBoar\n 5\tPanther\n 6\tGiant badger\n 7\tDire wolf\n 8\tGiant elk"
		},
		"rust" : {
			name: "Rust Bag of Tricks",
			description: "As an action, 3 times per dawn, I can pull an object from this bag and throw it 20 ft. It transforms into a random creature when it lands (d8): 1-rat, 2-owl, 3-mastiff, 4-goat, 5-giant goat, 6-giant boar, 7-lion, 8-brown bear. It follows my commands, acts on my turn, and vanishes at dawn or if reduced to 0 HP.",
			descriptionLong: "As an action, I can pull a fuzzy object from this bag and throw it 20 ft. It transforms into a creature when it lands, determined randomly (d8): 1-rat, 2-owl, 3-mastiff, 4-goat, 5-giant goat, 6-giant boar, 7-lion, 8-brown bear. The creature is friendly, acts on my turn, and vanishes at the next dawn or when it is reduced to 0 HP. As a bonus action, I can command it how to move and what action to take on its next turn, or give it general orders (e.g. attack my enemies). Without orders, it acts as it normally would. Once three fuzzy objects have been pulled from the bag, it can't be used again until the next dawn.",
			descriptionFull: "This ordinary bag, made from rust-colored cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. The bag weighs \u00BD pound.\n   You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table. The creature vanishes at the next dawn or when it is reduced to 0 hit points.\n   The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature.\n   Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\n\n" + toUni("d8\tCreature") + "\n 1\tRat\n 2\tOwl\n 3\tMastiff\n 4\tGoat\n 5\tGiant goat\n 6\tGiant boar\n 7\tLion\n 8\tBrown bear"
		},
		"tan" : {
			name: "Tan Bag of Tricks",
			description: "As an action, 3 times per dawn, I can pull an object from this bag and throw it 20 ft. It transforms into a random creature when it lands (d8): 1-jackal, 2-ape, 3-baboon, 4-axe beak, 5-black bear, 6-giant weasel, 7-giant hyena, 8-tiger. It follows my commands, acts on my turn, and vanishes at dawn or if reduced to 0 HP.",
			descriptionLong: "As an action, I can pull a fuzzy object from this bag and throw it 20 ft. It transforms into a creature when it lands, determined randomly (d8): 1-jackal, 2-ape, 3-baboon, 4-axe beak, 5-black bear, 6-giant weasel, 7-giant hyena, 8-tiger. The creature is friendly, acts on my turn, and vanishes at the next dawn or when it is reduced to 0 HP. As a bonus action, I can command it how to move and what action to take on its next turn, or give it general orders (e.g. attack my enemies). Without orders, it acts as it normally would. Once three fuzzy objects have been pulled from the bag, it can't be used again until the next dawn.",
			descriptionFull: "This ordinary bag, made from tan cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. The bag weighs \u00BD pound.\n   You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table. The creature vanishes at the next dawn or when it is reduced to 0 hit points.\n   The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature.\n   Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\n\n" + toUni("d8\tCreature") + "\n 1\tJackal\n 2\tApe\n 3\tBaboon\n 4\tAxe beak\n 5\tBlack bear\n 6\tGiant weasel\n 7\tGiant hyena\n 8\tTiger"
		}
	},
	"bead of force" : { // contains contributions by Larry Hoy
		name : "Bead of Force",
		source : [["SRD", 211], ["D", 154]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "C",
		description: "Once as an action, I can throw this sphere 60 ft, creating a 10-ft radius explosion on impact. All creatures within the explosion must make a DC 15 Dex save or take 5d4 force damage and are trapped in a sphere of transparent force that encloses the area for 1 minute. The sphere can be moved from the in- and outside.",
		descriptionLong: "Once as an action, I can throw this 0.75 inch sphere 60 ft, creating a 10-ft radius explosion on impact. All creatures within the area of the explosion must make a DC 15 Dexterity saving throw or take 5d4 force damage and become trapped in a sphere of transparent force that encloses the area for 1 minute. Only breathable air can pass through it. Those that succeed on the save or are only partially in the area are pushed outside of the sphere of force. Enclosed creatures can use their action to push its wall, moving the whole at half their walking speed. The whole sphere of force weighs only 1 lb, regardless of content.",
		descriptionFull : "This small black sphere measures \xBE of an inch in diameter and weighs an ounce. Typically, 1d4 + 4 beads of force are found together.\n   You can use an action to throw the bead up to 60 feet. The bead explodes on impact and is destroyed. Each creature within a 10-foot radius of where the bead landed must succeed on a DC 15 Dexterity saving throw or take 5d4 force damage. A sphere of transparent force then encloses the area for 1 minute. Any creature that failed the save and is completely within the area is trapped inside this sphere. Creatures that succeeded on the save, or are partially within the area, are pushed away from the center of the sphere until they are no longer inside it. Only breathable air can pass through the sphere's wall. No attack or other effect can.\n   An enclosed creature can use its action to push against the sphere's wall, moving the sphere up to half the creature's walking speed. The sphere can be picked up, and its magic causes it to weigh only 1 pound, regardless of the weight of creatures inside.",
		weight : 0.0625
	},
	"belt of dwarvenkind" : {
		name : "Belt of Dwarvenkind",
		source : [["SRD", 212], ["D", 155]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "While wearing this belt, my Con increases by 2 (to max 20), I get adv. on Cha (Persuasion) checks to interact with dwarves, adv. on saves vs. poison, resistance to poison damage, darkvision 60 ft, and known Dwarvish. Each day at dawn, there is a 50% chance I grow a full beard or my current beard becomes visibly thicker.",
		descriptionFull : "While wearing this belt, you gain the following benefits:\n \u2022 Your Constitution score increases by 2, to a maximum of 20.\n \u2022 You have advantage on Charisma (Persuasion) checks made to interact with dwarves.\n\nIn addition, while attuned to the belt, you have a 50% chance each day at dawn of growing a full beard if you're capable of growing one, or a visibly thicker beard if you already have one.\n\nIf you aren't a dwarf, you gain the following additional benefits while wearing the belt:\n \u2022 You have advantage on saving throws against poison, and you have resistance against poison damage.\n \u2022 You have darkvision out to a range of 60 feet.\n \u2022 You can speak, read, and write Dwarvish.",
		attunement : true,
		languageProfs : ["Dwarvish"],
		vision : [["Darkvision", 60]],
		savetxt : { adv_vs : ["poison"] },
		dmgres : ["Poison"],
		scores : [0, 0, 2, 0, 0, 0]
	},
	"belt of giant strength" : {
		name : "Belt of Giant Strength",
		source : [["SRD", 211], ["D", 155]],
		type : "wondrous item",
		description : "Set the type of giant using the button in this line. While wearing this belt, my Strength score changes to a certain number depending on the type of giant the belt is associated with, provided that my Strength is not already that amount or higher.",
		descriptionFull : "While wearing this belt, your Strength score changes to a score granted by the belt. If your Strength is already equal to or greater than the belt’s score, the item has no effect on you. Six varieties of this belt exist, corresponding with and having rarity according to the six kinds of true giants. The belt of stone giant strength and the belt of frost giant strength look different, but they have the same effect.\n\n" + toUni("Type") + "\t\t" + toUni("Str") + "\t" + toUni("Rarity") + "\nHill giant\t\t21\tRare\nStone/frost giant\t23\tVery rare\nFire giant\t\t25\tVery rare\nCloud giant\t27\tLegendary\nStorm giant\t29\tLegendary",
		attunement : true,
		allowDuplicates : true,
		choices : ["Hill (Str 21, rare)", "Stone (Str 23, very rare)", "Frost (Str 23, very rare)", "Fire (Str 25, very rare)", "Cloud (Str 27, legendary)", "Storm (Str 29, legendary)"],
		"hill (str 21, rare)" : {
			name : "Belt of Hill Giant Strength",
			rarity : "rare",
			magicItemTable : "G",
			description : "My Strength score is 21 while I'm wearing this belt, provided that my Strength is not already 21 or higher.",
			scoresOverride : [21, 0, 0, 0, 0, 0]
		},
		"stone (str 23, very rare)" : {
			name : "Belt of Stone Giant Strength",
			rarity : "very rare",
			magicItemTable : "H",
			description : "My Strength score is 23 while I'm wearing this belt, provided that my Strength is not already 23 or higher.",
			scoresOverride : [23, 0, 0, 0, 0, 0]
		},
		"frost (str 23, very rare)" : {
			name : "Belt of Frost Giant Strength",
			rarity : "very rare",
			magicItemTable : "H",
			description : "My Strength score is 23 while I'm wearing this belt, provided that my Strength is not already 23 or higher.",
			scoresOverride : [23, 0, 0, 0, 0, 0]
		},
		"fire (str 25, very rare)" : {
			name : "Belt of Fire Giant Strength",
			rarity : "very rare",
			magicItemTable : "H",
			description : "My Strength score is 25 while I'm wearing this belt, provided that my Strength is not already 25 or higher.",
			scoresOverride : [25, 0, 0, 0, 0, 0]
		},
		"cloud (str 27, legendary)" : {
			name : "Belt of Cloud Giant Strength",
			rarity : "legendary",
			magicItemTable : "I",
			description : "My Strength score is 27 while I'm wearing this belt, provided that my Strength is not already 27 or higher.",
			scoresOverride : [27, 0, 0, 0, 0, 0]
		},
		"storm (str 29, legendary)" : {
			name : "Belt of Storm Giant Strength",
			rarity : "legendary",
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
	"boots of elvenkind" : { // contains contributions by AelarTheElfRogue
		name : "Boots of Elvenkind",
		source : [["SRD", 212], ["D", 155]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While I wear these boots, my steps make no sound, regardless of the surface I am moving across. I also have advantage on Dexterity (Stealth) checks that rely on moving silently.",
		descriptionFull : "While you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have advantage on Dexterity (Stealth) checks that rely on moving silently.",
		eval : function () {
			for (var i = 0; i < CurrentMagicItems.known.length; i++) {
				if (CurrentMagicItems.known[i].indexOf("cloak of elvenkind") !== -1 && tDoc.getField("Extra.Magic Item Attuned " + (1 + i)).isBoxChecked(0)) {
					SetProf("advantage", true, ["Stealth", true], "Cloak and Boots of Elvenkind (magic items)");
					break;
				}
			}
		},
		removeeval : function () {
			SetProf("advantage", false, ["Stealth", true], "Cloak and Boots of Elvenkind (magic items)");
		}
	},
	"boots of levitation" : { // contributed by AelarTheElfRogue
		name : "Boots of Levitation",
		source : [["SRD", 212], ["D", 155]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		attunement : true,
		description : "While I wear these boots, I can cast Levitate on myself at will.",
		descriptionFull : "While you wear these boots, you can use an action to cast the Levitate spell on yourself at will.",
		spellcastingBonus : {
			name : "Self Only",
			spells : ["levitate"],
			selection : ["levitate"],
			firstCol : "atwill"
		},
		spellChanges : {
			"levitate" : {
				range : "Self",
				changes : "The spell can only affect the wearer."
			}
		}
	},
	"boots of speed" : {
		name : "Boots of Speed",
		source : [["SRD", 212], ["D", 155]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		attunement : true,
		description : "As a bonus action, I can click the heels of these boots together to double my walking speed and make opportunity attacks against me have disadvantage. I can end this effect with another bonus action. After the boots' magic has been used for a total of 10 minutes, they lose their power until I finish a long rest.",
		descriptionFull : "While you wear these boots, you can use a bonus action and click the boots' heels together. If you do, the boots double your walking speed, and any creature that makes an opportunity attack against you has disadvantage on the attack roll. If you click your heels together again, you end the effect.\n   When the boots' property has been used for a total of 10 minutes, the magic ceases to function until you finish a long rest.",
		action : [["bonus action", " (start/stop)"]],
		usages : 10,
		recovery : "long rest",
		additional : "minutes"
	},
	"boots of striding and springing" : { // contributed by AelarTheElfRogue
		name : "Boots of Striding and Springing",
		source : [["SRD", 212], ["D", 156]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		attunement : true,
		description : "While I wear these boots, my walking speed becomes 30 feet, unless my walking speed is higher, and my speed isn't reduced if I am encumbered or wearing heavy armor. In addition, I can jump three times the normal distance, though I can't jump farther than my remaining movement would allow.",
		descriptionFull : "While you wear these boots, your walking speed becomes 30 feet, unless your walking speed is higher, and your speed isn't reduced if you are encumbered or wearing heavy armor. In addition, you can jump three times the normal distance, though you can't jump farther than your remaining movement would allow.",
		speed : { walk : { spd : "fixed30", enc : "fixed30" } }
	},
	"boots of the winterlands" : {
		name : "Boots of the Winterlands",
		source : [["SRD", 212], ["D", 156]],
		type : "wondrous item",
		rarity : "uncommon",
		attunement : true,
		magicItemTable : "F",
		description : "While wearing these boots, I have resistance to cold damage and I ignore difficult terrain created by ice or snow. I can tolerate temperatures as low as -50 \u00B0F without any additional protection. If I wear heavy clothes, I can tolerate temperatures as low as -100 \u00B0F.",
		descriptionFull : "These furred boots are snug and feel quite warm. While you wear them, you gain the following benefits:\n \u2022 You have resistance to cold damage.\n \u2022 You ignore difficult terrain created by ice or snow.\n \u2022 You can tolerate temperatures as low as -50 degrees Fahrenheit without any additional protection. If you wear heavy clothes, you can tolerate temperatures as low as -100 degrees Fahrenheit.",
		dmgres : ["Cold"]
	},
	"bowl of commanding water elementals" : {
		name : "Bowl of Commanding Water Elementals",
		source : [["SRD", 212], ["D", 156]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "While this bowl is filled with water, I can speak the bowl's command word as an action and summon a water elemental, as if I had cast Conjure Elemental. The bowl can't be used again until the next dawn. The bowl is about 1 foot in diameter and half as deep, and holds about 3 gallons of water.",
		descriptionFull : "While this bowl is filled with water, you can use an action to speak the bowl's command word and summon a water elemental, as if you had cast the Conjure Elemental spell. The bowl can't be used this way again until the next dawn.\n   The bowl is about 1 foot in diameter and half as deep. It weighs 3 pounds and holds about 3 gallons.",
		weight : 3,
		spellcastingBonus : {
			name : "Water Elemental only",
			spells : ["conjure elemental"],
			selection : ["conjure elemental"],
			firstCol : "oncelr"
		},
		usages : 1,
		recovery : "dawn",
		spellChanges : {
			"conjure elemental" : {
				time : "1 a",
				component : "V,M\u0192",
				compMaterial : "The Bowl of Commanding Water Elementals needs to be filled with water to cast this spell with a command word.",
				description : "CR 5 water elemental that obeys my verbal commands; on broken conc. elemental breaks free",
				changes : "Using the Bowl of Commanding Water Elementals, the spell only takes 1 action instead of 1 minute to cast, but can only bring forth a water elemental."
			}
		}
	},
	"bracers of archery" : {
		name : "Bracers of Archery",
		source : [["SRD", 212], ["D", 156]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While wearing these bracers, I have proficiency with the longbow and shortbow, and I gain a +2 bonus to damage rolls on ranged attacks made with such weapons.",
		descriptionFull : "While wearing these bracers, you have proficiency with the longbow and shortbow, and you gain a +2 bonus to damage rolls on ranged attacks made with such weapons.",
		attunement : true,
		weaponProfs : [false, false, ["longbow", "shortbow"]],
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.baseWeaponName == "shortbow" || v.baseWeaponName == "longbow") {
						output.extraDmg += 2;
					}
				},
				'I add +2 to the damage of attacks I make with shortbows and longbows.'
			],
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
		extraAC : [{
			mod : 2,
			magic : true,
			text : "I gain a +2 bonus to AC while I'm not wearing armor or using a shield.",
			stopeval : function (v) { return v.wearingArmor || v.usingShield; }
		}]
	},
	"brazier of commanding fire elementals" : {
		name : "Brazier of Commanding Fire Elementals",
		source : [["SRD", 212], ["D", 156]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "While a fire burns in this brass brazier, I can use an action to speak the brazier's command word and summon a fire elemental, as if I had cast the Conjure Elemental spell. The brazier can't be used this way again until the next dawn.",
		descriptionFull : "While a fire burns in this brass brazier, you can use an action to speak the brazier's command word and summon a fire elemental, as if you had cast the Conjure Elemental spell. The brazier can't be used this way again until the next dawn.\n   The brazier weighs 5 pounds.",
		weight : 5,
		spellcastingBonus : {
			name : "Fire Elemental only",
			spells : ["conjure elemental"],
			selection : ["conjure elemental"],
			firstCol : "oncelr"
		},
		usages : 1,
		recovery : "dawn",
		spellChanges : {
			"conjure elemental" : {
				time : "1 a",
				component : "V,M\u0192",
				compMaterial : "The Brazier of Commanding Fire Elementals needs to have a fire burning in it to cast this spell with a command word.",
				description : "CR 5 fire elemental that obeys my verbal commands; on broken conc. elemental breaks free",
				changes : "Using the Brazier of Commanding Fire Elementals, the spell only takes 1 action instead of 1 minute to cast, but can only bring forth a fire elemental."
			}
		}
	},
	"brooch of shielding" : { // contributed by Smashman
		name : "Brooch of Shielding",
		source : [["SRD", 212], ["D", 156]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While wearing this brooch, I have resistance to force damage, and have immunity to damage from the Magic Missile spell.",
		descriptionFull : "While wearing this brooch, you have resistance to force damage, and you have immunity to damage from the Magic Missile spell.",
		attunement : true,
		dmgres: ["Force"],
		savetxt: {
			immune: ["Magic Missile spell"]
		}
	},
	"broom of flying" : {
		name : "Broom of Flying",
		source : [["SRD", 213], ["D", 156]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "With the command word, this broom hovers and can either be ridden in the air or send alone up to 1 mile by naming a familiar location. It has a flying speed of 50 ft, holds up to 400 lb, but only has 30 ft speed if over 200 lb. It stops hovering when I land. With another command word, it flies to me if within 1 mile.",
		descriptionFull : "This wooden broom, which weighs 3 pounds, functions like a mundane broom until you stand astride it and speak its command word. It then hovers beneath you and can be ridden in the air. It has a flying speed of 50 feet. It can carry up to 400 pounds, but its flying speed becomes 30 feet while carrying over 200 pounds. The broom stops hovering when you land.\n   You can send the broom to travel alone to a destination within 1 mile of you if you speak the command word, name the location, and are familiar with that place. The broom comes back to you when you speak another command word, provided that the broom is still within 1 mile of you.",
		weight : 3
	},
	"candle of invocation" : {
		name : "Candle of Invocation",
		source : [["SRD", 213], ["D", 157]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This slender taper is dedicated to a deity and shares that deity's alignment. Lit, it sheds dim light in a 30-ft radius for up to 4 hours and grants benefits to creatures of matching alignment in the light.",
		descriptionFull : "This slender taper is dedicated to a deity and shares that deity's alignment. The candle's alignment can be detected with the Detect Evil and Good spell. The DM chooses the god and associated alignment or determines the alignment randomly.\n\n" + toUni("d20\tAlignment\td20\tAlignment") + "\n1-2\tChaotic evil\t10-11\tNeutral\n3-4\tChaotic neutral\t12-13\tNeutral good\n5-7\tChaotic good\t14-15\tLawful evil\n8-9\tNeutral evil\t16-17\tLawful neutral\n\t\t\t18-20\tLawful good\n\nThe candle's magic is activated when the candle is lit, which requires an action. After burning for 4 hours, the candle is destroyed. You can snuff it out early for use at a later time. Deduct the time it burned in increments of 1 minute from the candle's total burn time.\n   While lit, the candle sheds dim light in a 30-foot radius. Any creature within that light whose alignment matches that of the candle makes attack rolls, saving throws, and ability checks with advantage. In addition, a cleric or druid in the light whose alignment matches the candle's can cast 1st-level spells he or she has prepared without expending spell slots, though the spell's effect is as if cast with a 1st-level slot.\n   Alternatively, when you light the candle for the first time, you can cast the Gate spell with it. Doing so destroys the candle.",
		attunement : true,
		allowDuplicates : true,
		usages : "240 min",
		recovery : "Never",
		spellcastingBonus : {
			name : "1\xD7 \u0026\u0026 candle is destroyed",
			spells : ["gate"],
			selection : ["gate"],
			firstCol : "1\xD7"
		},
		action : [["action", " (light)"]],
		choices : ["Chaotic Evil", "Chaotic Neutral", "Chaotic Good", "Neutral Evil", "Neutral", "Neutral Good", "Lawful Evil", "Lawful Neutral", "Lawful Good"],
		"chaotic evil" : {
			description : "As an action, I can light this candle. The first time I do, I can cast Gate and destroy it or have it shed dim light in a 30-ft radius. All in the light who are chaotic evil have adv. on attacks, saves, and checks, while CE clerics/druids can cast their 1st-level spells without using a level 1 slot. It can burn for 4 hours intermittently."
		},
		"chaotic neutral" : {
			description : "As an action, I can light this candle. The first time I do, I can cast Gate and destroy it or have it shed dim light in a 30-ft radius. All in the light who are chaotic neutral have adv. on attacks, saves, and checks, while CN clerics/druids can cast their 1st-level spells without using a level 1 slot. It can burn for 4 hours intermittently."
		},
		"chaotic good" : {
			description : "As an action, I can light this candle. The first time I do, I can cast Gate and destroy it or have it shed dim light in a 30-ft radius. All in the light who are chaotic good have adv. on attacks, saves, and checks, while CG clerics/druids can cast their 1st-level spells without using a level 1 slot. It can burn for 4 hours intermittently."
		},
		"neutral evil" : {
			description : "As an action, I can light this candle. The first time I do, I can cast Gate and destroy it or have it shed dim light in a 30-ft radius. All in the light who are neutral evil have adv. on attacks, saves, and checks, while NE clerics/druids can cast their 1st-level spells without using a level 1 slot. It can burn for 4 hours intermittently."
		},
		"neutral" : {
			description : "As an action, I can light this candle. The first time I do, I can cast Gate and destroy it or have it shed dim light in a 30-ft radius. All in the light who are neutral have adv. on attacks, saves, and checks, while N clerics/druids can cast their 1st-level spells without using a level 1 slot. It can burn for 4 hours intermittently."
		},
		"neutral good" : {
			description : "As an action, I can light this candle. The first time I do, I can cast Gate and destroy it or have it shed dim light in a 30-ft radius. All in the light who are neutral good have adv. on attacks, saves, and checks, while NG clerics/druids can cast their 1st-level spells without using a level 1 slot. It can burn for 4 hours intermittently."
		},
		"lawful evil" : {
			description : "As an action, I can light this candle. The first time I do, I can cast Gate and destroy it or have it shed dim light in a 30-ft radius. All in the light who are lawful evil have adv. on attacks, saves, and checks, while LE clerics/druids can cast their 1st-level spells without using a level 1 slot. It can burn for 4 hours intermittently."
		},
		"lawful neutral" : {
			description : "As an action, I can light this candle. The first time I do, I can cast Gate and destroy it or have it shed dim light in a 30-ft radius. All in the light who are lawful neutral have adv. on attacks, saves, and checks, while LN clerics/druids can cast their 1st-level spells without using a level 1 slot. It can burn for 4 hours intermittently."
		},
		"lawful good" : {
			description : "As an action, I can light this candle. The first time I do, I can cast Gate and destroy it or have it shed dim light in a 30-ft radius. All in the light who are lawful good have adv. on attacks, saves, and checks, while LG clerics/druids can cast their 1st-level spells without using a level 1 slot. It can burn for 4 hours intermittently."
		}
	},
	"cape of the mountebank" : { // contributed by Smashman
		name : "Cape of the Mountebank",
		source : [["SRD", 213], ["D", 157]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "While wearing this cape, I can use it to cast the Dimension Door spell as an action. This property of the cape can't be used again until the next dawn. The cape smells faintly of brimstone. When I disappear, smoke lightly obscures the place that I left and the place that I appear, which dissipates at the end of my next turn.",
		descriptionFull : "This cape smells faintly of brimstone. While wearing it, you can use it to cast the Dimension Door spell as an action. This property of the cape can't be used again until the next dawn.\n   When you disappear, you leave behind a cloud of smoke, and you appear in a similar cloud of smoke at your destination. The smoke lightly obscures the space you left and the space you appear in, and it dissipates at the end of your next turn. A light or stronger wind disperses the smoke.",
		usages : 1,
		recovery : "dawn",
		spellcastingBonus : {
			name: "Cape of the Mountebank",
			spells: ["dimension door"],
			selection: ["dimension door"],
			firstCol : "oncelr"
		}
	},
	"carpet of flying" : {
		name : "Carpet of Flying",
		source : [["SRD", 213], ["D", 157]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "I can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to my spoken directions if I am within 30 feet of it. A carpet can carry up to twice the weight for its type, but it flies at half speed if it carries more than its normal capacity.",
		descriptionFull : "You can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to your spoken directions, provided that you are within 30 feet of it.\n   Four sizes of carpet of flying exist. The DM chooses the size of a given carpet or determines it randomly.\n\n" + toUni("d100\tSize\tCapacity\tFlying Speed") + "\n01-20\t3 \xD7 5 ft.\t  200 lb.\t  80 feet\n21-55\t4 \xD7 6 ft.\t  400 lb.\t  60 feet\n56-80\t5 \xD7 7 ft.\t  600 lb.\t  40 feet\n81-100\t6 \xD7 9 ft.\t  800 lb.\t  30 feet\n\nA carpet can carry up to twice the weight shown on the table, but it flies at half speed if it carries more than its normal capacity.",
		action : [["action", ""]],
		choices : ["3 \xD7 5 ft (fly 80 ft, 200 lb)", "4 \xD7 6 ft (fly 60 ft, 400 lb)", "5 \xD7 7 ft (fly 40 ft, 600 lb)", "6 \xD7 9 ft (fly 30 ft, 800 lb)"],
		"3 \xD7 5 ft (fly 80 ft, 200 lb)" : {
			name : "Carpet of Flying, 3 ft \xD7 5 ft",
			nameTest : "Carpet of Flying, 1 m \xD7 1,5 m",
			description : "I can speak the carpet's command word as an action to make the 3 ft \xD7 5 ft carpet hover and fly. It moves according to my spoken directions if I am within 30 ft of it. It has a flying speed of 80 ft and can carry up to 400 lb. If it carries more than 200 lb its flying speed is reduced to only 40 ft."
		},
		"4 \xD7 6 ft (fly 60 ft, 400 lb)" : {
			name : "Carpet of Flying, 4 ft \xD7 6 ft",
			nameTest : "Carpet of Flying, 1,2 m \xD7 2 m",
			description : "I can speak the carpet's command word as an action to make the 4 ft \xD7 6 ft carpet hover and fly. It moves according to my spoken directions if I am within 30 ft of it. It has a flying speed of 60 ft and can carry up to 800 lb. If it carries more than 400 lb its flying speed is reduced to only 30 ft."
		},
		"5 \xD7 7 ft (fly 40 ft, 600 lb)" : {
			name : "Carpet of Flying, 5 ft \xD7 7 ft",
			nameTest : "Carpet of Flying, 1,5 m \xD7 2,1 m",
			description : "I can speak the carpet's command word as an action to make the 5 ft \xD7 7 ft carpet hover and fly. It moves according to my spoken directions if I am within 30 ft of it. It has a flying speed of 40 ft and can carry up to 1200 lb. If it carries more than 600 lb its flying speed is reduced to only 20 ft."
		},
		"6 \xD7 9 ft (fly 30 ft, 800 lb)" : {
			name : "Carpet of Flying, 6 ft \xD7 9 ft",
			nameTest : "Carpet of Flying, 1,8 m \xD7 2,7 m",
			description : "I can speak the carpet's command word as an action to make the 6 ft \xD7 9 ft carpet hover and fly. It moves according to my spoken directions if I am within 30 ft of it. It has a flying speed of 30 ft and can carry up to 1600 lb. If it carries more than 800 lb its flying speed is reduced to only 15 ft."
		}
	},
	"censer of controlling air elementals" : {
		name : "Censer of Controlling Air Elementals",
		source : [["SRD", 213], ["D", 158]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "While incense is burning in this censer, I can use an action to speak the censer's command word and summon an air elemental, as if I had cast Conjure Elemental. The censer can't be used this way again until the next dawn. This 6\" wide, 1' high vessel resembles a chalice with a decorated lid.",
		descriptionFull : "While incense is burning in this censer, you can use an action to speak the censer's command word and summon an air elemental, as if you had cast the Conjure Elemental spell. The censer can't be used this way again until the next dawn.\n   This 6-inch-wide, 1-foot-high vessel resembles a chalice with a decorated lid. It weighs 1 pound.",
		weight : 1,
		spellcastingBonus : {
			name : "Air Elemental only",
			spells : ["conjure elemental"],
			selection : ["conjure elemental"],
			firstCol : "oncelr"
		},
		usages : 1,
		recovery : "dawn",
		spellChanges : {
			"conjure elemental" : {
				time : "1 a",
				component : "V,M\u0192",
				compMaterial : "The Censer of Controlling Air Elementals needs to have a incense burning in it to cast this spell with a command word.",
				description : "CR 5 air elemental that obeys my verbal commands; on broken conc. elemental breaks free",
				changes : "Using the Censer of Controlling Air Elementals, the spell only takes 1 action instead of 1 minute to cast, but can only bring forth an air elemental."
			}
		}
	},
	"chime of opening" : { // contributed by AelarTheElfRogue
		name : "Chime of Opening",
		source : [["SRD", 213], ["D", 158]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "C",
		description : "I can strike this as an action, pointing it at an object within 120 ft of me that can be opened (i.e. door, lid, lock). One lock or latch on it opens unless the sound can't reach it. If no locks or latches remain, the object itself opens. The chime can be used ten times. After the tenth time it cracks and becomes useless.",
		descriptionFull : "This hollow metal tube measures about 1 foot long and weighs 1 pound. You can strike it as an action, pointing it at an object within 120 feet of you that can be opened, such as a door, lid, or lock. The chime issues a clear tone, and one lock or latch on the object opens unless the sound can't reach the object. If no locks or latches remain, the object itself opens.\n   The chime can be used ten times. After the tenth time it cracks and becomes useless.",
		weight : 1,
		action : [["action", ""]],
		usages : 10,
		recovery : "Never"
	},
	"circlet of blasting" : { // contains contributions by Larry Hoy
		name : "Circlet of Blasting",
		source : [["SRD", 214], ["D", 158]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While wearing this circlet, I can use an action to cast the Scorching Ray spell with it. When I make the spell's attacks, I do so with an attack bonus of +5. The circlet can't be used this way again until the next dawn.",
		descriptionFull : "While wearing this circlet, you can use an action to cast the Scorching Ray spell with it. When you make the spell's attacks, you do so with an attack bonus of +5. The circlet can't be used this way again until the next dawn.",
		usages : 1,
		recovery : "dawn",
		fixedDC : 13,
		spellcastingBonus : {
			name : "Once per dawn",
			spells : ["scorching ray"],
			selection : ["scorching ray"],
			firstCol : "oncelr"
		}
	},
	"cloak of arachnida" : {
		name : "Cloak of Arachnida",
		source : [["SRD", 214], ["D", 158]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This cloak grants me resistance to poison damage, climbing speed equal to my walking speed, even along vertical surfaces and upside down while keeping my hands free, freedom from being caught in webs, the ability to move through webs as if just difficult terrain, and the ability to cast Web once per dawn.",
		descriptionFull : "This fine garment is made of black silk interwoven with faint silvery threads. While wearing it, you gain the following benefits:\n \u2022 You have resistance to poison damage.\n \u2022 You have a climbing speed equal to your walking speed.\n \u2022 You can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free.\n \u2022 You can't be caught in webs of any sort and can move through webs as if they were difficult terrain.\n \u2022 You can use an action to cast the Web spell (save DC 13). The web created by the spell fills twice its normal area. Once used, this property of the cloak can't be used again until the next dawn.",
		attunement : true,
		usages : 1,
		recovery : "dawn",
		additional : "cast web",
		fixedDC : 13,
		spellcastingBonus : {
			name : "Once per dawn",
			spells : ["web"],
			selection : ["web"],
			firstCol : "oncelr"
		},
		spellChanges : {
			"web": {
				description : "2\xD7 20-ft cubes, anchored, all save or restrained; dif. ter.; lightly obscures; Str check vs. DC 13 to free"
			}
		}
	},
	"cloak of displacement" : { // contributed by Smashman
		name : "Cloak of Displacement",
		source : [["SRD", 214], ["D", 158]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "While I wear this cloak, creatures have disadvantage on attack rolls against me as I appear to be standing in a slightly different location. If I take damage, this property ceases to function until the start of my next turn. The property is suppressed while I am incapacitated, restrained, or otherwise unable to move.",
		descriptionFull : "While you wear this cloak, it projects an illusion that makes you appear to be standing in a place near your actual location, causing any creature to have disadvantage on attack rolls against you. If you take damage, the property ceases to function until the start of your next turn. This property is suppressed while you are incapacitated, restrained, or otherwise unable to move.",
		attunement : true
	},
	"cloak of elvenkind" : {
		name : "Cloak of Elvenkind",
		source : [["SRD", 214], ["D", 158]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While I wear this cloak with its hood up, Wisdom (Perception) checks made to see me have disadvantage, and I have advantage on Dexterity (Stealth) checks made to hide, as the cloak's color shifts to camouflage me. Pulling the hood up or down requires an action.",
		descriptionFull : "While you wear this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage, and you have advantage on Dexterity (Stealth) checks made to hide, as the cloak's color shifts to camouflage you. Pulling the hood up or down requires an action.",
		attunement : true,
		action : [["action", " (hood up/down)"]],
		eval : function () {
			if (CurrentMagicItems.known.indexOf("boots of elvenkind") !== -1) {
				SetProf("advantage", true, ["Stealth", true], "Cloak and Boots of Elvenkind (magic items)");
			}
		},
		removeeval : function () {
			SetProf("advantage", false, ["Stealth", true], "Cloak and Boots of Elvenkind (magic items)");
		}
	},
	"cloak of protection" : {
		name : "Cloak of Protection",
		source : [["SRD", 214], ["D", 159]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While I wear this cloak, I gain a +1 bonus to AC and saving throws.",
		descriptionFull : "You gain a +1 bonus to AC and saving throws while you wear this cloak.",
		attunement : true,
		extraAC : [{name : "Cloak of Protection", mod : 1, magic : true, text : "I gain a +1 bonus to AC while attuned."}],
		addMod : [{ type : "save", field : "all", mod : 1, text : "While I wear the Cloak of Protection, I gain a +1 to all my saving throws." }]
	},
	"cloak of the bat" : {
		name : "Cloak of the Bat",
		source : [["SRD", 214], ["D", 159]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "This cloak grants me adv. on Stealth checks. In dim light or darkness, I can fly with it and, once per dawn, use it to transform myself into a bat as if casting Polymorph. To fly, at 40 ft speed, I have to grip its edges with both my hands. While in the form of the bat, I retain my Intelligence, Wisdom, and Charisma scores.",
		descriptionFull : "While wearing this cloak, you have advantage on Dexterity (Stealth) checks. In an area of dim light or darkness, you can grip the edges of the cloak with both hands and use it to fly at a speed of 40 feet. If you ever fail to grip the cloak's edges while flying in this way, or if you are no longer in dim light or darkness, you lose this flying speed.\n   While wearing the cloak in an area of dim light or darkness, you can use your action to cast Polymorph on yourself, transforming into a bat. While you are in the form of the bat, you retain your Intelligence, Wisdom, and Charisma scores. The cloak can't be used this way again until the next dawn.",
		attunement : true,
		usages : 1,
		recovery : "dawn",
		additional : "Polymorph",
		advantages : [["Stealth", true]],
		spellcastingBonus : {
			name : "Only self into bat",
			spells : ["polymorph"],
			selection : ["polymorph"],
			firstCol : "oncelr"
		},
		spellChanges : {
			"polymorph" : {
				range : "Self",
				description : "Only cast in dim light or darkness; I transform into a bat, gaining its stats, but I keep my Int, Wis, Cha",
				changes : "The spell can only turn the wearer into a bat, but the wearer keeps its Intelligence, Wisdom, and Charisma scores."
			}
		}
	},
	"cloak of the manta ray" : {
		name : "Cloak of the Manta Ray",
		source : [["SRD", 214], ["D", 159]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "While wearing this cloak with its hood up, I can breathe underwater, and I have a swimming speed of 60 ft. Pulling the hood up or down requires an action.",
		descriptionFull : "While wearing this cloak with its hood up, you can breathe underwater, and you have a swimming speed of 60 feet. Pulling the hood up or down requires an action.",
		action : [["action", " (hood up/down)"]],
		speed : { swim : { spd : "fixed60", enc : "fixed50" } }
	},
	"crystal ball" : {
		name : "Crystal Ball",
		source : [["SRD", 214], ["D", 159]],
		type : "wondrous item",
		description : "I can cast Scrying (DC 17) at will while touching this ball of about 6 inches in diameter.",
		descriptionFull : "This crystal ball is about 6 inches in diameter. While touching it, you can cast the Scrying spell (save DC 17) with it.",
		attunement : true,
		weight : 3,
		allowDuplicates : true,
		fixedDC : 17,
		spellcastingBonus : {
			name : "DC 17",
			spells : ["scrying"],
			selection : ["scrying"],
			firstCol : "atwill"
		},
		choices : ["Crystal Ball  ", "Crystal Ball of Mind Reading", "Crystal Ball of Telepathy", "Crystal Ball of True Seeing"],
		"crystal ball  " : {
			name : "Crystal Ball  ",
			rarity : "very rare",
			magicItemTable : "H"
		},
		"crystal ball of mind reading" : {
			name : "Crystal Ball of Mind Reading",
			rarity : "legendary",
			magicItemTable : "I",
			description : "I can cast Scrying (DC 17) at will while touching this crystal ball of 6\" diameter. While scrying, I can cast Detect Thoughts (DC 17) to target creatures I can see within 30 ft of the spell's sensor. I don't need to concentrate on this Detect Thoughts, but it ends when the scrying ends.",
			descriptionFull : "This crystal ball is about 6 inches in diameter. While touching it, you can cast the Scrying spell (save DC 17) with it.\n   You can use an action to cast the Detect Thoughts spell (save DC 17) while you are Scrying with the crystal ball, targeting creatures you can see within 30 feet of the spell's sensor. You don't need to concentrate on this Detect Thoughts to maintain it during its duration, but it ends if Scrying ends.",
			spellcastingBonus : {
				name : "DC 17",
				spells : ["detect thoughts"],
				selection : ["detect thoughts"],
				firstCol : "atwill"
			},
			spellChanges : {
				"detect thoughts" : {
					duration : "1 min",
					changes : "Detect Thoughts only works through the spell sensor of the Scrying spell and doesn't require concentration. It ends when the Scrying spell ends."
				}
			}
		},
		"crystal ball of telepathy" : {
			name : "Crystal Ball of Telepathy",
			rarity : "legendary",
			magicItemTable : "I",
			description : "I can cast Scrying (DC 17) while touching this 6\" crystal ball. While scrying, I can communicate telepathically with creatures within 30 ft of the spell's sensor and can cast Suggestion (DC 17) once per dawn on one of them. I don't need to concentrate on this Suggestion, but it ends when the scrying ends.",
			descriptionFull : "This crystal ball is about 6 inches in diameter. While touching it, you can cast the Scrying spell (save DC 17) with it.\n   While Scrying with the crystal ball, you can communicate telepathically with creatures you can see within 30 feet of the spell's sensor. You can also use an action to cast the Suggestion spell (save DC 17) through the sensor on one of those creatures. You don't need to concentrate on this suggestion to maintain it during its duration, but it ends if Scrying ends. Once used, the suggestion power of the crystal ball can't be used again until the next dawn.",
			spellcastingBonus : {
				name : "DC 17",
				spells : ["suggestion"],
				selection : ["suggestion"],
				firstCol : "oncelr"
			},
			limfeaname : "Suggestion through Crystal Ball",
			usages : 1,
			recovery : "dawn",
			spellChanges : {
				"suggestion" : {
					duration : "8 h (scrying)",
					changes : "Suggestion only works through the spell sensor of the Scrying spell and doesn't require concentration. It ends when the Scrying spell ends."
				},
				"scrying" : {
					description : "1 crea save or sensor follows it around; or sensor in familiar location; telepathy 30 ft on sensor; see B",
					changes : "I can communicate telepathically with creatures within 30 ft of the scrying sensor."
				}
			}
		},
		"crystal ball of true seeing" : {
			name : "Crystal Ball of True Seeing",
			rarity : "legendary",
			magicItemTable : "I",
			description : "I can cast Scrying (save DC 17) at will while touching this ball of about 6 inches in diameter. While scrying, I can see out from the spell's sensor with truesight out to 120 ft.",
			descriptionFull : "This crystal ball is about 6 inches in diameter. While touching it, you can cast the Scrying spell (save DC 17) with it.\n   While Scrying with the crystal ball, you have truesight with a radius of 120 feet centered on the spell's sensor.",
			spellChanges : {
				"scrying" : {
					description : "1 crea save or sensor follows it around; or sensor in familiar location; truesight 120 ft on sensor; see B",
					changes : "I have truesight out to 120 ft from the scrying sensor."
				}
			}
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
	"decanter of endless water" : {
		name : "Decanter of Endless Water",
		source : [["SRD", 216], ["D", 161]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "C",
		description : 'As an action, I open the flask \u0026 speak a command word, pouring fresh/salt water out until my next turn starts. "Stream" for 1 gal. "Fountain" for 5 gal. "Geyser" for 30 gal in 30 ft \xD7 1 ft geyser. As a bonus action, I can aim it at a target, which has to make a DC 13 Str save or take 1d4 bludgeoning damage and fall prone.',
		descriptionLong : 'As an action, I can remove the stopper from this flask and speak one of three command words, pouring fresh or salt water (my choice) out until my next turn starts. "Stream" produces 1 gallon. "Fountain" produces 5 gallons. "Geyser" produces 30 gallons of water that gushes forth in a geyser 30 ft long by 1 ft wide. As a bonus action while holding it, I can aim the geyser at a creature I can see within 30 ft. The target must succeed on a DC 13 Strength save or take 1d4 bludgeoning damage and fall prone. I can instead target an unattended object weighing up to 200 lb, knocking it over or pushing it up to 15 ft away.',
		descriptionFull : "This stoppered flask sloshes when shaken, as if it contains water. The decanter weighs 2 pounds.\n   You can use an action to remove the stopper and speak one of three command words, whereupon an amount of fresh water or salt water (your choice) pours out of the flask. The water stops pouring out at the start of your next turn. Choose from the following options:\n \u2022 \"Stream\" produces 1 gallon of water.\n \u2022 \"Fountain\" produces 5 gallons of water.\n \u2022 \"Geyser\" produces 30 gallons of water that gushes forth in a geyser 30 feet long and 1 foot wide. As a bonus action while holding the decanter, you can aim the geyser at a creature you can see within 30 feet of you. The target must succeed on a DC 13 Strength saving throw or take 1d4 bludgeoning damage and fall prone. Instead of a creature, you can target an object that isn't being worn or carried and that weighs no more than 200 pounds. The object is either knocked over or pushed up to 15 feet away from you.",
		weight : 2
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
	"dimensional shackles" : {
		name : "Dimensional Shackles",
		source : [["SRD", 219], ["D", 165]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "As an action, I can shackle an incapacitated creature of size Small to Large. They work as mundane manacles and prevent extradimensional movement, but not portal travel. I and others I designate can remove them as an action. The bound target can try every 30 days to break them with a DC 30 Athletics check.",
		descriptionFull : "You can use an action to place these shackles on an incapacitated creature. The shackles adjust to fit a creature of Small to Large size. In addition to serving as mundane manacles, the shackles prevent a creature bound by them from using any method of extradimensional movement, including teleportation or travel to a different plane of existence. They don't prevent the creature from passing-through an interdimensional portal.\n   You and any creature you designate when you use the shackles can use an action to remove them. Once every 30 days, the bound creature can make a DC 30 Strength (Athletics) check. On a success, the creature breaks free and destroys the shackles.",
		action : [["action", " (bind/remove)"]]
	},
	"dragon scale mail" : {
		name : "Dragon Scale Mail",
		source : [["SRD", 219], ["D", 165]],
		type : "armor (scale mail)",
		rarity : "very rare",
		magicItemTable : "H",
		description : "While wearing this armor, I gain a resistance to a damage type, +1 AC and advantage on saving throws against the frightful presence and breath weapons of dragons. Once per dawn as an action, I can magically discern the distance and direction to the closest dragon of the armor's type within 30 miles of me.",
		descriptionFull : "Dragon scale mail is made of the scales of one kind of dragon. Sometimes dragons collect their cast-off scales and gift them to humanoids. Other times, hunters carefully skin and preserve the hide of a dead dragon. In either case, dragon scale mail is highly valued.\n   While wearing this armor, you gain a +1 bonus to AC, you have advantage on saving throws against the Frightful Presence and breath weapons of dragons, and you have resistance to one damage type that is determined by the kind of dragon that provided the scales (see the table).\n   Additionally, you can focus your senses as an action to magically discern the distance and direction to the closest dragon within 30 miles of you that is of the same type as the armor. This special action can't be used again until the next dawn.\n\n" + toUni("Dragon\tResistance\tDragon\tResistance") + "\nBlack\tAcid\t\tGold\tFire\nBlue\tLightning  \tGreen\tPoison\nBrass\tFire\t\tRed\tFire\nBronze\tLightning  \tSilver\tCold\nCopper\tAcid\t\tWhite\tCold",
		attunement : true,
		weight : 45,
		allowDuplicates : true,
		usages : 1,
		recovery : "dawn",
		savetxt : {
			adv_vs : ["Dragon Frightful Presence", "Dragon Breath Weapons"],
		},
		armorOptions : {
			regExpSearch : /^(?=.*dragon)(?=.*scale)(?=.*mail).*$/i,
			name : "Dragon Scale Mail",
			source : [["SRD", 219], ["D", 165]],
			type : "medium",
			ac : 15,
			stealthdis : true,
			weight : 45
		},
		choices : ["Black (acid)", "Blue (lightning)", "Brass (fire)", "Bronze (lightning)", "Copper (acid)", "Gold (fire)", "Green (poison)", "Red (fire)", "Silver (cold)", "White (cold)"],
		"black (acid)" : {
			name : "Black Dragon Scale Mail",
			description : "This scale mail gives +1 to AC, adv. on saves against the frightful presence and breath weapons of dragons, and resistance to acid damage. As an action, I can magically discern the distance and direction to the closest black dragon within 30 miles. Once I use this action, I can't use it again until the next dawn.",
			armorAdd : "Black Dragon Scale Mail",
			dmgres: ["Acid"],
			limfeaname : "Detect Black Dragon",
			action : [["action", "Detect Black Dragon"]]
		},
		"blue (lightning)" : {
			name : "Blue Dragon Scale Mail",
			description : "This scale mail gives +1 to AC, adv. on saves against the frightful presence and breath weapons of dragons, and resistance to lightning damage. As an action, I can magically discern the distance and direction to the closest blue dragon in 30 miles. Once I use this action, I can't use it again until the next dawn.",
			armorAdd : "Blue Dragon Scale Mail",
			dmgres: ["Lightning"],
			limfeaname : "Detect Blue Dragon",
			action : [["action", "Detect Blue Dragon"]]
		},
		"brass (fire)" : {
			name : "Brass Dragon Scale Mail",
			description : "This scale mail gives +1 to AC, adv. on saves against the frightful presence and breath weapons of dragons, and resistance to fire damage. As an action, I can magically discern the distance and direction to the closest brass dragon within 30 miles. Once I use this action, I can't use it again until the next dawn.",
			armorAdd : "Brass Dragon Scale Mail",
			dmgres: ["Fire"],
			limfeaname : "Detect Brass Dragon",
			action : [["action", "Detect Brass Dragon"]]
		},
		"bronze (lightning)" : {
			name : "Bronze Dragon Scale Mail",
			description : "This scale mail gives +1 to AC, adv. on saves against the frightful presence and breath weapons of dragons, and resistance to lightning damage. As an action, I can magically discern the distance and direction to the closest bronze dragon in 30 miles. Once I use this action, I can't use it again until the next dawn.",
			armorAdd : "Bronze Dragon Scale Mail",
			dmgres: ["Lightning"],
			limfeaname : "Detect Bronze Dragon",
			action : [["action", "Detect Bronze Dragon"]]
		},
		"copper (acid)" : {
			name : "Copper Dragon Scale Mail",
			description : "This scale mail gives +1 to AC, adv. on saves against the frightful presence and breath weapons of dragons, and resistance to acid damage. As an action, I can magically discern the distance and direction to the closest copper dragon within 30 miles. Once I use this action, I can't use it again until the next dawn.",
			armorAdd : "Copper Dragon Scale Mail",
			dmgres: ["Acid"],
			limfeaname : "Detect Copper Dragon",
			action : [["action", "Detect Copper Dragon"]]
		},
		"gold (fire)" : {
			name : "Gold Dragon Scale Mail",
			description : "This scale mail gives +1 to AC, adv. on saves against the frightful presence and breath weapons of dragons, and resistance to fire damage. As an action, I can magically discern the distance and direction to the closest gold dragon within 30 miles. Once I use this action, I can't use it again until the next dawn.",
			armorAdd : "Gold Dragon Scale Mail",
			dmgres: ["Fire"],
			limfeaname : "Detect Gold Dragon",
			action : [["action", "Detect Gold Dragon"]]
		},
		"green (poison)" : {
			name : "Green Dragon Scale Mail",
			description : "This scale mail gives +1 to AC, adv. on saves against the frightful presence and breath weapons of dragons, and resistance to poison damage. As an action, I can magically discern the distance and direction to the closest green dragon in 30 miles. Once I use this action, I can't use it again until the next dawn.",
			armorAdd : "Green Dragon Scale Mail",
			dmgres: ["Poison"],
			limfeaname : "Detect Green Dragon",
			action : [["action", "Detect Green Dragon"]]
		},
		"red (fire)" : {
			name : "Red Dragon Scale Mail",
			description : "This scale mail gives +1 to AC, adv. on saves against the frightful presence and breath weapons of dragons, and resistance to fire damage. As an action, I can magically discern the distance and direction to the closest red dragon within 30 miles. Once I use this action, I can't use it again until the next dawn.",
			armorAdd : "Red Dragon Scale Mail",
			dmgres: ["Fire"],
			limfeaname : "Detect Red Dragon",
			action : [["action", "Detect Red Dragon"]]
		},
		"silver (cold)" : {
			name : "Silver Dragon Scale Mail",
			description : "This scale mail gives +1 to AC, adv. on saves against the frightful presence and breath weapons of dragons, and resistance to cold damage. As an action, I can magically discern the distance and direction to the closest silver dragon within 30 miles. Once I use this action, I can't use it again until the next dawn.",
			armorAdd : "Silver Dragon Scale Mail",
			dmgres: ["Cold"],
			limfeaname : "Detect Silver Dragon",
			action : [["action", "Detect Silver Dragon"]]
		},
		"white (cold)" : {
			name : "White Dragon Scale Mail",
			description : "This scale mail gives +1 to AC, adv. on saves against the frightful presence and breath weapons of dragons, and resistance to cold damage. As an action, I can magically discern the distance and direction to the closest white dragon within 30 miles. Once I use this action, I can't use it again until the next dawn.",
			armorAdd : "White Dragon Scale Mail",
			dmgres: ["Cold"],
			limfeaname : "Detect White Dragon",
			action : [["action", "Detect White Dragon"]]
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
	"dust of disappearance" : {
		name : "Dust of Disappearance",
		source : [["SRD", 219], ["D", 166]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "Once as an action, I can throw this dust into the air. By doing so, me and all creatures within 10 ft of me become invisible for 2d4 minutes. The duration is the same for all subjects. If a creature affected by the dust attacks or casts a spell, the invisibility ends for that creature.",
		descriptionFull : "Found in a small packet, this powder resembles very fine sand. There is enough of it for one use. When you use an action to throw the dust into the air, you and each creature and object within 10 feet of you become invisible for 2d4 minutes. The duration is the same for all subjects, and the dust is consumed when its magic takes effect. If a creature affected by the dust attacks or casts a spell, the invisibility ends for that creature."
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
		weaponsAdd : ["Dwarven Thrower"],
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
	"efreeti bottle" : { // contributed by AelarTheElfRogue
		name : "Efreeti Bottle",
		source : [["SRD", 220], ["D", 167]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "When I use an action to remove the stopper, a cloud of thick smoke flows out of the bottle. At the end of my turn, an efreeti appears in an unoccupied space within 30 feet of me. The first time the bottle is opened, the DM rolls to determine what happens that time and the next times (if any).",
		descriptionLong : "When I use an action to remove the stopper, a cloud of thick smoke flows out of the bottle. At the end of my turn, an efreeti appears in an unoccupied space within 30 feet of me. The first time the bottle is opened, the DM rolls to determine what happens that time and the next times (if any). 10% chance that the efreeti attacks me for 5 rounds before disappearing. 80% change that the efreeti serves me for 1 hour, following my commands. It then returns to the bottle and I can have it serve me 2 more times, but only 24 hours after it returned to the bottle. 10% chance that the efreeti will grant me 3 wishes.",
		descriptionFull : "This painted brass bottle weighs 1 pound. When you use an action to remove the stopper, a cloud of thick smoke flows out of the bottle. At the end of your turn, the smoke disappears with a flash of harmless fire, and an efreeti appears in an unoccupied space within 30 feet of you.\n   The first time the bottle is opened, the DM rolls to determine what happens.\n\n" + toUni("d100") + "\t" + toUni("Effect") + "\n01-10\tThe efreeti attacks you. After fighting for 5 rounds, the efreeti disappears, and the bottle loses its magic.\n11-90\tThe efreeti serves you for 1 hour, doing as you command. Then the efreeti returns to the bottle, and a new stopper contains it. The stopper can't be removed for 24 hours. The next two times the bottle is opened, the same effect occurs. If the bottle is opened a fourth time, the efreeti escapes and disappears, and the bottle loses its magic.\n91-00\tThe efreeti can cast the Wish spell three times for you. It disappears when it grants the final wish or after 1 hour, and the bottle loses its magic.",
		weight : 1,
		action : [["action", ""]]
	},
	"elemental gem": {
		name : "Elemental Gem",
		source : [["SRD", 220], ["D", 167]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "This gem contains a mote of elemental energy. When I use an action to break the gem, an elemental is summoned as if I had cast the Conjure Elemental spell, and the gem's magic is lost. The type of gem determines the elemental summoned by the spell.",
		descriptionFull : "This gem contains a mote of elemental energy. When you use an action to break the gem, an elemental is summoned as if you had cast the Conjure Elemental spell, and the gem's magic is lost. The type of gem determines the elemental summoned by the spell.",
		choices : ["Blue Sapphire (air)", "Emerald (water)", "Red Corundum (fire)", "Yellow Diamond (earth)"],
		allowDuplicates : true,
		"blue sapphire (air)" : {
			name : "Elemental Gem [Blue Sapphire]",
			description : "This gem contains a mote of air elemental energy. Once as an action, I can break this gem to summon an air elemental as if I had cast the Conjure Elemental spell. After doing so, the gem's magic is lost.",
			descriptionFull : "This gem contains a mote of elemental energy. When you use an action to break the gem, an air elemental is summoned as if you had cast the Conjure Elemental spell, and the gem's magic is lost.",
			spellcastingBonus : {
				name : "Air Elemental only",
				spells : ["conjure elemental"],
				selection : ["conjure elemental"]
			},
			spellChanges : {
				"conjure elemental" : {
					time : "1 a",
					description : "CR 5 air elemental that obeys my verbal commands; on broken conc. elemental breaks free",
					changes : "Using the Blue Sapphire Elemental Gem, the spell only takes 1 action instead of 1 minute to cast, but can only bring forth an air elemental."
				}
			}
		},
		"emerald (water)" : {
			name : "Elemental Gem [Emerald]",
			description : "This gem contains a mote of water elemental energy. Once as an action, I can break this gem to summon a water elemental as if I had cast the Conjure Elemental spell. After doing so, the gem's magic is lost.",
			descriptionFull : "This gem contains a mote of elemental energy. When you use an action to break the gem, a water elemental is summoned as if you had cast the Conjure Elemental spell, and the gem's magic is lost.",
			spellcastingBonus : {
				name : "Water Elemental only",
				spells : ["conjure elemental"],
				selection : ["conjure elemental"]
			},
			spellChanges : {
				"conjure elemental" : {
					time : "1 a",
					description : "CR 5 water elemental that obeys my verbal commands; on broken conc. elemental breaks free",
					changes : "Using the Emerald Elemental Gem, the spell only takes 1 action instead of 1 minute to cast, but can only bring forth a water elemental."
				}
			}
		},
		"red corundum (fire)" : {
			name : "Elemental Gem [Red Corundum]",
			description : "This gem contains a mote of fire elemental energy. Once as an action, I can break this gem to summon a fire elemental as if I had cast the Conjure Elemental spell. After doing so, the gem's magic is lost.",
			descriptionFull : "This gem contains a mote of elemental energy. When you use an action to break the gem, a fire elemental is summoned as if you had cast the Conjure Elemental spell, and the gem's magic is lost.",
			spellcastingBonus : {
				name : "Fire Elemental only",
				spells : ["conjure elemental"],
				selection : ["conjure elemental"]
			},
			spellChanges : {
				"conjure elemental" : {
					time : "1 a",
					description : "CR 5 fire elemental that obeys my verbal commands; on broken conc. elemental breaks free",
					changes : "Using the Red Corundum Elemental Gem, the spell only takes 1 action instead of 1 minute to cast, but can only bring forth a fire elemental."
				}
			}
		},
		"yellow diamond (earth)" : {
			name : "Elemental Gem [Yellow Diamond]",
			description : "This gem contains a mote of earth elemental energy. Once as an action, I can break this gem to summon an earth elemental as if I had cast the Conjure Elemental spell. After doing so, the gem's magic is lost.",
			descriptionFull : "This gem contains a mote of elemental energy. When you use an action to break the gem, an earth elemental is summoned as if you had cast the Conjure Elemental spell, and the gem's magic is lost.",
			spellcastingBonus : {
				name : "Earth Elemental only",
				spells : ["conjure elemental"],
				selection : ["conjure elemental"]
			},
			spellChanges : {
				"conjure elemental" : {
					time : "1 a",
					description : "CR 5 earth elemental that obeys my verbal commands; on broken conc. elemental breaks free",
					changes : "Using the Yellow Diamond Elemental Gem, the spell only takes 1 action instead of 1 minute to cast, but can only bring forth an earth elemental."
				}
			}
		}
	},
	"eyes of charming" : {
		name : "Eyes of Charming",
		source : [["SRD", 220], ["D", 168]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "These crystal lenses fit over the eyes. They have 3 charges. While wearing them, I can expend 1 charge as an action to cast Charm Person (save DC 13) on a humanoid within 30 ft of me, provided that I and the target can see each other. The lenses regain all expended charges daily at dawn.",
		descriptionFull : "These crystal lenses fit over the eyes. They have 3 charges. While wearing them, you can expend 1 charge as an action to cast the Charm Person spell (save DC 13) on a humanoid within 30 feet of you, provided that you and the target can see each other. The lenses regain all expended charges daily at dawn.",
		attunement : true,
		usages : 3,
		recovery : "dawn",
		spellcastingBonus : {
			name : "1 charge",
			spells : ["charm person"],
			selection : ["charm person"],
			firstCol : 1
		},
		fixedDC : 13,
		spellFirstColTitle : "Ch"
	},
	"eyes of minute seeing" : { // contributed by Soilentbrad
		name : "Eyes of Minute Seeing",
		source : [["SRD", 221], ["D", 168]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "C",
		description : "These crystal lenses fit over the eyes. While wearing them, I can see much better than normal out to a range of 1 ft. I have advantage on Intelligence (Investigation) checks that rely on sight while searching an area or studying an object within that range.",
		descriptionFull : "These crystal lenses fit over the eyes. While wearing them, you can see much better than normal out to a range of 1 foot. You have advantage on Intelligence (Investigation) checks that rely on sight while searching an area or studying an object within that range.",
		vision : [["Adv. on Investigation checks based on sight", 1]]
	},
	"eyes of the eagle" : {
		name : "Eyes of the Eagle",
		source : [["SRD", 221], ["D", 168]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "These crystal lenses fit over the eyes. While wearing them, I have advantage on Wisdom (Perception) checks that rely on sight. In conditions of clear visibility, I can make out details of even extremely distant creatures and objects as small as 2 ft across.",
		descriptionFull : "These crystal lenses fit over the eyes. While wearing them, you have advantage on Wisdom (Perception) checks that rely on sight. In conditions of clear visibility, you can make out details of even extremely distant creatures and objects as small as 2 feet across.",
		attunement : true,
		vision : [["Adv. on Perception checks that rely on sight", 0]]
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
	"folding boat" : {
		name : "Folding Boat",
		source : [["SRD", 223], ["D", 170]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "C",
		description : "As an action, I can speak a command word to have this wooden box become a boat, a ship, or to fold back up. The boat holds 4 Medium creatures and has oars, anchor, mast, and a sail. The ship holds 15 Medium creatures and has a deck, five sets of oars, rowing seats, a steering oar, anchor, deck cabin, mast, and a sail.",
		descriptionLong : "A wooden box of 12 inch \xD7 6 inch \xD7 6 inch, that can be opened to put items in. As an action, I can speak one of its three command words. The first causes it to unfold into a boat 10 ft \xD7 4 ft \xD7 2 ft, with oars, an anchor, a mast, and a lateen sail, which can hold four Medium creatures comfortably. The second causes it to unfold into a ship 24 ft \xD7 8 ft \xD7 6 ft, with a deck, rowing seats, five sets of oars, a steering oar, an anchor, a deck cabin, and a mast with a square sail, which can hold fifteen Medium creatures comfortably. Three causes it to fold up, leaving large objects placed in the boat/ship outside of the box.",
		descriptionFull : "This object appears as a wooden box that measures 12 inches long, 6 inches wide, and 6 inches deep. It weighs 4 pounds and floats. It can be opened to store items inside. This item also has three command words, each requiring you to use an action to speak it.\n   One command word causes the box to unfold into a boat 10 feet long, 4 feet wide, and 2 feet deep. The boat has one pair of oars, an anchor, a mast, and a lateen sail. The boat can hold up to four Medium creatures comfortably.\n   The second command word causes the box to unfold into a ship 24 feet long, 8 feet wide; and 6 feet deep. The ship has a deck, rowing seats, five sets of oars, a steering oar, an anchor, a deck cabin, and a mast with a square sail. The ship can hold fifteen Medium creatures comfortably.\n   When the box becomes a vessel, its weight becomes that of a normal vessel its size, and anything that was stored in the box remains in the boat.\n   The third command word causes the folding boat to fold back into a box, provided that no creatures are aboard. Any objects in the vessel that can't fit inside the box remain outside the box as it folds. Any objects in the vessel that can fit inside the box do so.",
		weight : 4,
		action : [["action", ""]]
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
	"gauntlets of ogre power" : {
		name : "Gauntlets of Ogre Power",
		source : [["SRD", 223], ["D", 171]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "My Strength score is 19 while I'm wearing these gauntlets, provided that my Strength is not already 19 or higher.",
		descriptionFull : "Your Strength score is 19 while you wear these gauntlets. They have no effect on you if your Strength is already 19 or higher without them.",
		attunement : true,
		scoresOverride : [19, 0, 0, 0, 0, 0]
	},
	"gem of brightness" : { // contains contributions by Larry Hoy
		name : "Gem of Brightness",
		source : [["SRD", 223], ["D", 171]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "This gem has 50 charges. As an action while holding it, I can speak a command word to cause it to: shed 30-ft bright and 30-ft dim light, fire a 60-ft beam of light at 1 creature (1 charge, DC 15 Con save or blinded 1 minute), or flare with blinding light in a 30-ft cone (5 charges, DC 15 Con save or blinded 1 minute).",
		descriptionLong : "This gem has 50 charges. As an action while holding it, I can speak one of its three command words to cause it to: [1] shed bright light in a 30-ft radius and dim light in an additional 30 ft until another function of the gem is used or I use a bonus action to end it, [2] fire a 60-ft beam of light at 1 creature (1 charge, DC 15 Con save or blinded 1 minute), or [3] flare with blinding light in a 30-ft cone (5 charges, DC 15 Con save or blinded 1 minute). Blinded creatures can repeat the save at the end of each of their turns. When all of the gem's charges are expended, the gem becomes a nonmagical jewel worth 50 gp.",
		descriptionFull : "This prism has 50 charges. While you are holding it, you can use an action to speak one of three command words to cause one of the following effects:\n \u2022 The first command word causes the gem to shed bright light in a 30-foot radius and dim light for an additional 30 feet. This effect doesn't expend a charge. It lasts until you use a bonus action to repeat the command word or until you use another function of the gem.\n \u2022 The second command word expends 1 charge and causes the gem to fire a brilliant beam of light at one creature you can see within 60 feet of you. The creature must succeed on a DC 15 Constitution saving throw or become blinded for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.\n \u2022 The third command word expends 5 charges and causes the gem to flare with blinding light in a 30-foot cone originating from it. Each creature in the cone must make a saving throw as if struck by the beam created with the second command word.\n\nWhen all of the gem's charges are expended, the gem becomes a nonmagical jewel worth 50 gp.",
		weight : 1,
		usages : 50,
		recovery : "Never",
		action : [["action", ""]]
	},
	"gem of seeing" : { // contains contributions by Larry Hoy
		name : "Gem of Seeing",
		source : [["SRD", 223], ["D", 172]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "This gem has 3 charges. As an action, I can speak its command word and expend 1 charge. For the next 10 minutes, I have truesight out to 120 ft when I peer through the gem. The gem regains 1d3 expended charges daily at dawn.",
		descriptionFull : "This gem has 3 charges. As an action, you can speak the gem's command word and expend 1 charge. For the next 10 minutes, you have truesight out to 120 feet when you peer through the gem.\n   The gem regains 1d3 expended charges daily at dawn.",
		attunement : true,
		weight : 1,
		usages : 3,
		recovery : "dawn",
		additional : "1d3 Recharge"
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
		armorAdd : "Glamoured Studded Leather",
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
	"gloves of missile snaring" : {
		name : "Gloves of Missile Snaring",
		source : [["SRD", 224], ["D", 172]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		calculate : 'event.value = "As a reaction when a ranged weapon attack hits me while I\'m wearing these gloves, I can reduce the damage by 1d10 + " + Number(What("Dex Mod")) + " (my Dexterity modifier). This only works if I have a free hand. If I reduce the damage to 0, I can catch the missile if it is small enough for me to hold in that hand.";',
		description : "",
		descriptionFull : "These gloves seem to almost meld into your hands when you don them. When a ranged weapon attack hits you while you're wearing them, you can use your reaction to reduce the damage by 1d10 + your Dexterity modifier, provided that you have a free hand. If you reduce the damage to 0, you can catch the missile if it is small enough for you to hold in that hand.",
		attunement : true,
		action : [["reaction", ""]]
	},
	"gloves of swimming and climbing" : { // contributed by AelarTheElfRogue
		name : "Gloves of Swimming and Climbing",
		source : [["SRD", 224], ["D", 172]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While wearing these gloves, climbing and swimming don't cost me extra movement, and I gain a +5 bonus to Strength (Athletics) checks made to climb or swim.",
		descriptionFull : "While wearing these gloves, climbing and swimming don't cost you extra movement, and you gain a +5 bonus to Strength (Athletics) checks made to climb or swim.",
		attunement : true
	},
	"goggles of night" : { // contributed by AelarTheElfRogue
		name : "Goggles of Night",
		source : [["SRD", 224], ["D", 172]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "While wearing these dark lenses, I have darkvision out to a range of 60 feet. If I already have darkvision. wearing the goggles increases its range by 60 feet.",
		descriptionFull : "While wearing these dark lenses, you have darkvision out to a range of 60 feet. If you already have darkvision. wearing the goggles increases its range by 60 feet.",
		vision : [["Darkvision", "fixed60"], ["Darkvision", "+60"]]
	},
	"hat of disguise" : { // contributed by Larry Hoy
		name : "Hat of Disguise",
		source : [["SRD", 225], ["D", 173]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "As an action while wearing this hat, I can cast Disguise Self from it at will. The spell ends if the hat is removed.",
		descriptionFull : "While wearing this hat, you can use an action to cast the Disguise Self spell from it at will. The spell ends if the hat is removed.",
		attunement : true,
		spellcastingBonus : [{
			name : "At will",
			spells : ["disguise self"],
			selection : ["disguise self"],
			firstCol : "atwill"
	   }],
	   spellcastingAbility : "class" // https://www.sageadvice.eu/2015/11/27/hat-of-disguise-dc/
	},
	"headband of intellect" : {
		name : "Headband of Intellect",
		source : [["SRD", 225], ["D", 173]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "My Intelligence score is 19 while I'm wearing this headband, provided that my Intelligence is not already 19 or higher.",
		descriptionFull : "Your Intelligence score is 19 while you wear this headband. It has no effect on you if your Intelligence is already 19 or higher without it.",
		attunement : true,
		scoresOverride : [0, 0, 0, 19, 0, 0]
	},
	"helm of comprehending languages" : { // contributed by Larry Hoy
		name : "Helm of Comprehending Languages",
		source : [["SRD", 225], ["D", 173]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "While wearing this helm, I can cast Comprehend Languages at will.",
		descriptionFull : "While wearing this helm, you can use an action to cast the Comprehend Languages spell from it at will.",
		spellcastingBonus : {
			name : "At will",
			spells : ["comprehend languages"],
			selection : ["comprehend languages"],
			firstCol : "atwill"
		}
	},
	"helm of telepathy" : {
		name : "Helm of Telepathy",
		source : [["SRD", 225], ["D", 174]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While wearing this helm, I can cast Detect Thoughts (DC 13). As a bonus action, I can send a telepathic message to a creature that I'm focussing on with Detect Thoughts, which can reply as a bonus action. Once between each dawn, I can cast Suggestion (DC 13) on a creature I'm focussing on with Detect Thoughts.",
		descriptionFull : "While wearing this helm, you can use an action to cast the Detect Thoughts spell (save DC 13) from it. As long as you maintain concentration on the spell, you can use a bonus action to send a telepathic message to a creature you are focused on. It can reply\u2014using a bonus action to do so\u2014while your focus on it continues.\n   While focusing on a creature with Detect Thoughts, you can use an action to cast the Suggestion spell (save DC 13) from the helm on that creature. Once used, the suggestion property can't be used again until the next dawn.",
		attunement : true,
		limfeaname : "Helm of Telepathy: Suggestion",
		usages : 1,
		recovery : "dawn",
		fixedDC : 13,
		spellcastingBonus : [{
			name : "At will",
			spells : ["detect thoughts"],
			selection : ["detect thoughts"],
			firstCol : "atwill"
		}, {
			name : "Once per dawn",
			spells : ["suggestion"],
			selection : ["suggestion"],
			firstCol : "oncelr"
		}]
	},
	"holy avenger" : {
		name : "Holy Avenger",
		source : [["SRD", 225], ["D", 174]],
		type : "weapon (any sword)",
		rarity : "legendary",
		magicItemTable : "I",
		attunement : true,
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
	"heward's handy haversack" : {
		name : "Heward's Handy Haversack",
		nameAlt : "Handy Haversack",
		source : [["SRD", 224], ["D", 174]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "C",
		description : "This backpack weighs 5 lb, regardless of its contents. It has two side pouches that hold 20 lb (2 cu ft) each and a central pouch that holds 80 lb (8 cu ft). Retrieving an item from it requires an action. If it's overloaded, pierced, or torn, it and its content are destroyed. If turned inside out, all its contents spill forth.",
		descriptionLong : "This backpack weighs 5 lb, regardless of its contents. It has two side pouches that hold up to 20 lb (2 cu ft) each and a central pouch that holds up to 80 lb (8 cu ft). Retrieving an item from it requires an action. When I reach in the bag for a specific item, the item is always magically on top. If it's overloaded, pierced, or torn, it and its content are destroyed. If turned inside out, all its contents spill forth. A creature placed inside the bag can survive for 10 minutes before starting to suffocate. Placing the haversack in another extradimensional space instantly destroys both and opens a gate to the Astral Plane.",
		descriptionFull : "This backpack has a central pouch and two side pouches, each of which is an extradimensional space. Each side pouch can hold up to 20 pounds of material, not exceeding a volume of 2 cubic feet. The large central pouch can hold up to 8 cubic feet or 80 pounds of material. The backpack always weighs 5 pounds, regardless of its contents.\n   Placing an object in the haversack follows the normal rules for interacting with objects. Retrieving an item from the haversack requires you to use an action. When you reach into the haversack for a specific item, the item is always magically on top.\n   The haversack has a few limitations. If it is overloaded, or if a sharp object pierces it or tears it, the haversack ruptures and is destroyed. If the haversack is destroyed, its contents are lost forever, although an artifact always turns up again somewhere. If the haversack is turned inside out, its contents spill forth, unharmed, and the haversack must be put right before it can be used again. If a breathing creature is placed within the haversack, the creature can survive for up to 10 minutes, after which time it begins to suffocate.\n   Placing the haversack inside an extradimensional space created by a bag of holding, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10-feet of the gate is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.",
		weight : 5,
		action : [["action", " (retrieve item)"]]
	},
	"horn of blasting" : { // contains contributions by Larry Hoy
		name : "Horn of Blasting",
		source : [["SRD", 226], ["D", 174]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "As an action, I can speak the horn's command word and blow it, creating a 30-ft cone. All in it take 5d6 thunder damage and are deafened for 1 min. Half damage with a DC 15 Con save and not deafened. Glass/crystal creatures/objects have disadv. and take 10d6 damage. There is a 20% chance each use that it explodes.",
		descriptionLong: "As an action, I can speak the horn's command word and blow it, emitting a thunderous blast in a 30-foot cone audible 600 feet away. Creatures in the cone must make a DC 15 Con save or take 5d6 thunder damage and be deafened for 1 min; otherwise, they just take half the damage. Creatures and objects made of glass or crystal have disadvantage on the save and take 10d6 thunder damage instead. Each use of its magic has a 20% chance of causing it to explode, dealing 10d6 fire damage to the blower and destroying it.",
		descriptionFull : "You can use an action to speak the horn's command word and then blow the horn, which emits a thunderous blast in a 30-foot cone that is audible 600 feet away. Each creature in the cone must make a DC 15 Constitution saving throw. On a failed save, a creature takes 5d6 thunder damage and is deafened for 1 minute. On a successful save, a creature takes half as much damage and isn't deafened. Creatures and objects made of glass or crystal have disadvantage on the saving throw and take 10d6 thunder damage instead of 5d6.\n   Each use of the horn's magic has a 20% chance of causing the horn to explode. The explosion deals 10d6 fire damage to the blower and destroys the horn.",
		weight : 2,
		action : [["action", ""]]
	},
	"immovable rod" : {
		name : "Immovable Rod",
		source : [["SRD", 226], ["D", 175]],
		type : "rod",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "This flat iron rod has a button on one end. I can use an action to press the button, magically fixing the rod in place or making it movable again. Once fixed, it holds up to 8000 lb. More weight causes it to deactivate and fall. A creature can use an action to try and move the rod up to 10 ft with a DC 30 Strength check.",
		descriptionFull : "This flat iron rod has a button on one end. You can use an action to press the button, which causes the rod to become magically fixed in place. Until you or another creature uses an action to push the button again, the rod doesn't move, even if it is defying gravity. The rod can hold up to 8,000 pounds of weight. More weight causes the rod to deactivate and fall. A creature can use an action to make a DC 30 Strength check, moving the fixed rod up to 10 feet on a success",
		weight : 2,
		action : [["action", " (activate/deactivate)"]]
	},
	"ioun stone" : {
		name : "Ioun Stone",
		source : [["SRD", 227], ["D", 176]],
		type : "wondrous item",
		attunement : true,
		description : "As an action, I can make an ioun stone orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. Different stones grant different benefits.",
		descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.",
		allowDuplicates : true,
		action : [["action", " (orbit/retrieve)"]],
		choices : ["Absorption", "Agility", "Awareness", "Fortitude", "Greater Absorption", "Insight", "Intellect", "Leadership", "Mastery", "Protection", "Regeneration", "Reserve", "Strength", "Sustenance"],
		"absorption" : {
			rarity : "very rare",
			magicItemTable : "H",
			description : "As an action, I can make this pale lavender ellipsoid orbit my head at 1d3 ft or retrieve it. While it orbits my head, I can use my reaction to cancel a spell of 4th level or lower targeting only me, if I can see the caster and the stone has enough charges left. It can cancel 20 levels of spells before it loses its magic.",
			descriptionLong : "As an action, I can make this pale lavender ellipsoid orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. While it orbits my head, I can use my reaction to cancel a spell of 4th level or lower targeting only me, if I can see the caster and the stone has enough charges left. It can cancel 20 levels of spells before it loses its magic.",
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   While this pale lavender ellipsoid orbits your head, you can use your reaction to cancel a spell of 4th level or lower cast by a creature you can see and targeting only you.\n   Once the stone has canceled 20 levels of spells, it burns out and turns dull gray, losing its magic. If you are targeted by a spell whose level is higher than the number of spell levels the stone has left, the stone can't cancel it.",
			limfeaname : "Ioun Stone of Absorption",
			usages : 20,
			recovery : "Never",
			action : [["reaction", ""]]
		},
		"agility" : {
			rarity : "very rare",
			magicItemTable : "H",
			description : "As an action, I can make this deep red sphere orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. While it orbits my head, my Dexterity score increases by 2, to a maximum of 20.",
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   Your Dexterity score increases by 2, to a maximum of 20, while this deep red sphere orbits your head.",
			scores : [0, 2, 0, 0, 0, 0]
		},
		"awareness" : {
			rarity : "rare",
			magicItemTable : "G",
			description : "As an action, I can make this dark blue rhomboid orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. While it orbits my head, I can't be surprised.",
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   You can't be surprised while this dark blue rhomboid orbits your head."
		},
		"fortitude" : {
			rarity : "very rare",
			magicItemTable : "H",
			description : "As an action, I can make this pink rhomboid orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. While it orbits my head, my Constitution score increases by 2, to a maximum of 20.",
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   Your Constitution score increases by 2, to a maximum of 20, while this pink rhomboid orbits your head.",
			scores : [0, 0, 2, 0, 0, 0]
		},
		"greater absorption" : {
			rarity : "legendary",
			magicItemTable : "I",
			description : "As an action, I can make this marbled lavender and green ellipsoid orbit my head at 1d3 ft or retrieve it. While it orbits my head, I can use a reaction to cancel a spell of 8th level or lower targeting only me, if I can see the caster and enough charges are left. It can cancel 50 levels of spells before it loses its magic.",
			descriptionLong : "As an action, I can make this marbled lavender and green ellipsoid orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. While it orbits my head, I can use my reaction to cancel a spell of 8th level or lower targeting only me, if I can see the caster and the stone has enough charges left. It can cancel 50 levels of spells before it loses its magic.",
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   While this marbled lavender and green ellipsoid orbits your head, you can use your reaction to cancel a spell of 8th level or lower cast by a creature you can see and targeting only you. Once the stone has canceled 50 levels of spells, it burns out and turns dull gray, losing its magic. If you are targeted by a spell whose level is higher than the number of spell levels the stone has left, the stone can't cancel it.",
			limfeaname : "Ioun Stone of Greater Absorption",
			usages : 50,
			recovery : "Never",
			action : [["reaction", ""]]
		},
		"insight" : {
			rarity : "very rare",
			magicItemTable : "H",
			description : "As an action, I can make this incandescent blue sphere orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. While it orbits my head, my Wisdom score increases by 2, to a maximum of 20.",
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   Your Wisdom score increases by 2, to a maximum of 20, while this incandescent blue sphere orbits your head.",
			scores : [0, 0, 0, 0, 2, 0]
		},
		"intellect" : {
			rarity : "very rare",
			magicItemTable : "H",
			description : "As an action, I can make this marbled scarlet and blue sphere orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. While it orbits my head, my Intelligence score increases by 2, to a maximum of 20.",
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   Your Intelligence score increases by 2, to a maximum of 20, while this marbled scarlet and blue sphere orbits your head.",
			scores : [0, 0, 0, 2, 0, 0]
		},
		"leadership" : {
			rarity : "very rare",
			magicItemTable : "H",
			description : "As an action, I can make this marbled pink and green sphere orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. While it orbits my head, my Charisma score increases by 2, to a maximum of 20.",
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   Your Charisma score increases by 2, to a maximum of 20, while this marbled pink and green sphere orbits your head.",
			scores : [0, 0, 0, 0, 0, 2]
		},
		"mastery" : {
			rarity : "legendary",
			magicItemTable : "I",
			description : "As an action, I can make this pale green prism orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. While it orbits my head, my proficiency bonus increases by 1.",
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   Your proficiency bonus increases by 1 while this pale green prism orbits your head.",
			addMod : [{ type: "", field : "Proficiency Bonus Modifier", mod : 1, text : "My proficiency bonus increases by 1." }]
		},
		"protection" : {
			rarity : "rare",
			magicItemTable : "G",
			description : "As an action, I can make this dusty rose prism orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. While it orbits my head, I have a +1 bonus to AC.",
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   You gain a +1 bonus to AC while this dusty rose prism orbits your head.",
			extraAC : [{name : "Ioun Stone of Protection", mod : 1, magic : true, text : "I gain a +1 bonus to AC while attuned."}]
		},
		"regeneration" : {
			rarity : "legendary",
			magicItemTable : "I",
			description : "As an action, I can make this pearly white spindle orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. While it orbits my head, I regain 15 HP at the end of each hour as long as I have at least 1 HP.",
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   You regain 15 hit points at the end of each hour this pearly white spindle orbits your head, provided that you have at least 1 hit point."
		},
		"reserve" : {
			rarity : "rare",
			magicItemTable : "G",
			description : "As an action, I can make this vibrant purple prism orbit my head at 1d3 ft or retrieve it. It can store 3 (spell slot) levels worth of spells. By touching it, one can cast a 1-3 level spell into it. While it orbits my head, I can cast any spell stored in it as if casting it myself, but using the original casters spellcasting ability.",
			descriptionLong : "As an action, I can make this vibrant purple prism orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. It can store 3 (spell slot) levels worth of spells. By touching it, one can cast a 1-3 level spell into it. While it orbits my head, I can cast any spell stored in it as if casting it myself, but using the original casters spellcasting ability.",
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   This vibrant purple prism stores spells cast into it, holding them until you use them. The stone can store up to 3 levels worth of spells at a time. When found, it contains 1d4-1 levels of stored spells chosen by the DM.\n   Any creature can cast a spell of 1st through 3rd level into the stone by touching it as the spell is cast. The spell has no effect, other than to be stored in the stone. If the stone can't hold the spell, the spell is expended without effect. The level of the slot used to cast the spell determines how much space it uses.\n   While this stone orbits your head, you can cast any spell stored in it. The spell uses the slot level, spell save DC, spell attack bonus, and spellcasting ability of the original caster, but is otherwise treated as if you cast the spell. The spell cast from the stone is no longer stored in it, freeing up space."
		},
		"strength" : {
			rarity : "very rare",
			magicItemTable : "H",
			description : "As an action, I can make this pale blue rhomboid orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. While it orbits my head, my Strength score increases by 2, to a maximum of 20.",
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   Your Strength score increases by 2, to a maximum of 20, while this pale blue rhomboid orbits your head.",
			scores : [2, 0, 0, 0, 0, 0]
		},
		"sustenance" : {
			rarity : "rare",
			magicItemTable : "G",
			description : "As an action, I can make this clear spindle orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. While it orbits my head, I don't need to eat or drink.",
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   You don't need to eat or drink while this clear spindle orbits your head."
		}
	},
	"iron bands of bilarro" : { // contains contributions by AelarTheElfRogue
		name : "Iron Bands of Bilarro",
		nameAlt : "Iron Bands of Binding",
		source : [["SRD", 228], ["D", 177]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "Once per dawn, as an action, I can speak the command word and make a ranged attack (Dex + Prof). If hit, the target is restrained until I use a bonus action to speak the command word again. Once per 24 hours, the target can make a DC 20 Strength check as an action to free itself and destroy the bands.",
		descriptionLong : "Once per dawn, as an action, I can throw this rusty iron sphere and speak its command word. I make a ranged attack roll with an attack bonus equal to my Dexterity modifier plus Proficiency Bonus. On a hit, the target is restrained until I take a bonus action to speak the command word again to release it. Doing so, or missing with the attack, causes the bands to contract and become a sphere once more. The target can make a DC 20 Strength check as an action, freeing itself and destroying the bands on a success. If the check fails, any further attempts made by that creature automatically fail until 24 hours have elapsed.",
		descriptionFull : "This rusty iron sphere measures 3 inches in diameter and weighs 1 pound. You can use an action to speak the command word and throw the sphere at a Huge or smaller creature you can see within 60 feet of you. As the sphere moves through the air, it opens into a tangle of metal bands.\n   Make a ranged attack roll with an attack bonus equal to your Dexterity modifier plus your proficiency bonus. On a hit, the target is restrained until you take a bonus action to speak the command word again to release it. Doing so, or missing with the attack, causes the bands to contract and become a sphere once more.\n   A creature, including the one restrained, can use an action to make a DC 20 Strength check to break the iron bands. On a success, the item is destroyed, and the restrained creature is freed. If the check fails, any further attempts made by that creature automatically fail until 24 hours have elapsed.\n   Once the bands are used, they can't be used again until the next dawn.",
		weight : 1,
		usages : 1,
		recovery : "dawn",
		action : [["action", " (throw)"], ["bonus action", " (release)"]],
		weaponsAdd : ["Iron Bands of Bilarro"],
		weaponOptions : {
			regExpSearch : /^(?=.*iron)(?=.*band)(?=.*(bilarro|binding)).*$/i,
			name : "Iron Bands of Bilarro",
			source : [["SRD", 228], ["D", 177]],
			ability : 2,
			type : "Natural",
			damage : ["\u2015", "", "Restrained"],
			range : "60 ft",
			description : "Restrains Huge or smaller creature; DC 20 Strength check to break out",
			abilitytodamage : false,
			weight : 1
		}
	},
	"lantern of revealing" : {
		name : "Lantern of Revealing",
		source : [["SRD", 228], ["D", 179]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "This lantern burns for 6 hours on 1 pint of oil. It shines bright light in a 30-ft radius and dim light for an additional 30 ft. Invisible objects and creatures are visible in the lantern's bright light. As an action, I can lower the hood, making it only dim light in a 5-ft radius.",
		descriptionFull : "While lit, this hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet. Invisible creatures and objects are visible as long as they are in the lantern's bright light. You can use an action to lower the hood, reducing the light to dim light in a 5-foot radius.",
		weight : 2,
		action : [["action", " (hood up/down)"]]
	},
	"luck blade" : {
		name : "Luck Blade",
		source : [["SRD", 229], ["D", 179]],
		type : "weapon (any sword)",
		rarity : "legendary",
		magicItemTable : "I",
		attunement : true,
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
	"medallion of thoughts" : {
		name : "Medallion of Thoughts",
		source : [["SRD", 230], ["D", 181]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "The medallion has 3 charges. While wearing it, I can use an action and expend 1 charge to cast Detect Thoughts (save DC 13) from it. The medallion regains 1d3 expended charges daily at dawn.",
		descriptionFull : "The medallion has 3 charges. While wearing it, you can use an action and expend 1 charge to cast the Detect Thoughts spell (save DC 13) from it. The medallion regains 1d3 expended charges daily at dawn.",
		attunement : true,
		weight : 1,
		usages : 3,
		recovery : "dawn",
		additional : "regain 1d3",
		spellcastingBonus : {
			name : "1 charge",
			spells : ["detect thoughts"],
			selection : ["detect thoughts"],
			firstCol : 1
		},
		fixedDC : 13,
		spellFirstColTitle : "Ch"
	},
	"mithral armor" : {
		name : "Mithral Armor",
		nameTest : "Mithral",
		source : [["SRD", 231], ["D", 182]],
		type : "armor (medium or heavy)",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "Mithral is a light, flexible metal. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn't. A mithral chain shirt or breastplate can be worn under normal clothes. ",
		descriptionFull : "Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn't.",
		allowDuplicates : true,
		chooseGear : {
			type : "armor",
			prefixOrSuffix : "suffix",
			excludeCheck : function (inObjKey, inObj) {
				return !(/medium|heavy/i).test(inObj.type) || (/hide/i).test(inObj.name);
			}
		}
	},
	"nine lives stealer" : {
		name : "Nine Lives Stealer",
		source : [["SRD", 231], ["D", 183]],
		type : "weapon (any sword)",
		rarity : "very rare",
		magicItemTable : "H",
		attunement : true,
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
	"oil of etherealness" : { // contains contributions by AelarTheElfRogue
		name : "Oil of Etherealness",
		source : [["SRD", 231], ["D", 183]],
		type : "potion",
		rarity : "rare",
		magicItemTable : "C",
		description : "This cloudy gray oil can be used once to cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected target then gains the effect of the Etherealness spell for 1 hour.",
		descriptionLong : "This cloudy gray oil can be used once cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of the Etherealness spell for 1 hour. It step into the border regions of the Ethereal Plane, in the area where it overlaps with my current plane, remaining there until it uses an action to dismiss the spell. I can still see the plane I came from, but can move anywhere, up, down, and even through solid objects and creatures.",
		descriptionFull : "Beads of this cloudy gray oil form on the outside of its container and quickly evaporate. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of the Etherealness spell for 1 hour.",
		weight : 0.5
	},
	"oil of sharpness" : { // contributed by AelarTheElfRogue
		name : "Oil of Sharpness",
		source : [["SRD", 232], ["D", 184]],
		type : "potion",
		rarity : "very rare",
		magicItemTable : "D",
		description : "This clear, gelatinous oil sparkles with tiny, ultrathin silver shards. It can be used once to coat one slashing or piercing weapon or up to 5 pieces of slashing or piercing ammunition. Applying the oil takes 1 minute. For 1 hour, the coated item is magical and has a +3 bonus to attack and damage rolls.",
		descriptionFull : "This clear, gelatinous oil sparkles with tiny, ultrathin silver shards. The oil can coat one slashing or piercing weapon or up to 5 pieces of slashing or piercing ammunition. Applying the oil takes 1 minute. For 1 hour, the coated item is magical and has a +3 bonus to attack and damage rolls.",
		weight : 0.5
	},
	"oil of slipperiness" : { // contains contributions by AelarTheElfRogue
		name : "Oil of Slipperiness",
		source : [["SRD", 232], ["D", 184]],
		type : "potion",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "This sticky black unguent can be used once to cover a Medium or smaller creature and its equipment, granting it the effects of  Freedom of Movement for 8 hours. Applying it takes 10 minutes. Alternatively, it can be poured out as an action, duplicating the effects of the Grease spell in a 10-ft square for 8 hours.",
		descriptionLong : "This sticky black unguent can be used once to cover a Medium or smaller creature and its equipment, granting it the effects of Freedom of Movement for 8 hours. Applying it takes 10 minutes. The creature's movement is unaffected by difficult terrain, being underwater, and spells and other magical effects can't reduce it's speed or cause it to be paralyzed or restrained. Alternatively, it can be poured out as an action, duplicating the effects of the Grease spell in a 10-ft square for 8 hours. The area is difficult terrain and any in it when it appears, entering it, or ending their turn in it must make a DC 10 Dex save or fall prone.",
		descriptionFull : "This sticky black unguent is thick and heavy in the container, but it flows quickly when poured. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of a Freedom of Movement spell for 8 hours.\n   Alternatively, the oil can be poured on the ground as an action, where it covers a 10-foot square, duplicating the effect of the Grease spell in that area for 8 hours.",
		weight : 0.5
	},
	"pearl of power" : { // contains contributions by AelarTheElfRogue
		name : "Pearl of Power",
		source : [["SRD", 232], ["D", 184]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While this pearl is on my person, I can use an action to speak its command word and regain one expended spell slot. If the expended slot was of 4th level or higher, the new slot is 3rd level. Once I have used the pearl, it can't be used again until the next dawn.",
		descriptionFull : "While this pearl is on your person, you can use an action to speak its command word and regain one expended spell slot. If the expended slot was of 4th level or higher, the new slot is 3rd level. Once you have used the pearl, it can't be used again until the next dawn.",
		attunement : true,
		usages : 1,
		recovery : "dawn",
		action : [["action", ""]]
	},
	"periapt of health" : { // contributed by AelarTheElfRogue
		name : "Periapt of Health",
		source : [["SRD", 232], ["D", 184]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "C",
		description : "I am immune to contracting any disease while I wear this pendant. If I am already infected with a disease, the effects of the disease are suppressed while I wear the pendant.",
		descriptionFull : "You are immune to contracting any disease while you wear this pendant. If you are already infected with a disease, the effects of the disease are suppressed you while you wear the pendant.",
		weight : 1,
		savetxt : { immune : ["disease"] }
	},
	"periapt of proof against poison" : { // contributed by AelarTheElfRogue
		name : "Periapt of Proof Against Poison",
		source : [["SRD", 232], ["D", 184]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "This delicate silver chain has a brilliant-cut black gem pendant. While I wear it, poisons have no effect on me. I am immune to the poisoned condition and have immunity to poison damage.",
		descriptionFull : "This delicate silver chain has a brilliant-cut black gem pendant. While you wear it, poisons have no effect on you. You are immune to the poisoned condition and have immunity to poison damage.",
		weight : 1,
		savetxt : { immune : ["poison"] }
	},
	"periapt of wound closure" : { // contributed by AelarTheElfRogue
		name : "Periapt of Wound Closure",
		source : [["SRD", 232], ["D", 184]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While I wear this pendant, I stabilize whenever I am dying at the start of my turn. In addition, whenever I roll a Hit Die to regain hit points, I double the number of hit points it restores.",
		descriptionFull : "While you wear this pendant, you stabilize whenever you are dying at the start of your turn. In addition, whenever you roll a Hit Die to regain hit points, double the number of hit points it restores.",
		attunement : true,
		weight : 1
	},
	"philter of love" : {
		name : "Philter of Love",
		source : [["SRD", 232], ["D", 184]],
		type : "potion",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "Once as an action, I can drink this rose-hued liquid or administer it to another. The consumer is charmed for 1 hour by the first creature it sees within 10 minutes of drinking it. If that creature is of a species and gender the consumer is normally attracted to, it regards the creature as its true love while it is charmed.",
		descriptionFull : "The next time you see a creature within 10 minutes after drinking this philter, you become charmed by that creature for 1 hour. If the creature is of a species and gender you are normally attracted to, you regard it as your true love while you are charmed. This potion's rose-hued, effervescent liquid contains one easy-to-miss bubble shaped like a heart.",
		weight : 0.5
	},
	"pipes of haunting" : { // contains contributions by Soilentbrad
		name : "Pipes of Haunting",
		source : [["SRD", 232], ["D", 185]],
		type : "Instrument",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "These pipes have 3 charges. As an action, I can use 1 charge to play them and have each (non-hostile) creature in 30 ft that can hear them make a DC 15 Wis save or be frightened of me for 1 minute. A target can repeat the save at the end of each of their turns. The pipes regain 1d3 expended charges daily at dawn.",
		descriptionLong : "These pipes have 3 charges. As an action, I can expand 1 charge to create an eerie, spellbinding tune. Each creature within 30 ft of me that can hear the pipes must make a DC 15 Wisdom saving throw or become frightened of me for 1 minute.  If you wish, all creatures in the area that aren't hostile toward me automatically succeed on the saving throw. An affected creature can repeat the save at the end of each of its turns, ending the effect on itself on a success. A creature that succeeds on its saving throw is immune to the effect of these pipes for 24 hours. The pipes regain 1d3 expended charges daily at dawn.",
		descriptionFull : "You must be proficient with wind instruments to use these pipes. They have 3 charges. You can use an action to play them and expend 1 charge to create an eerie, spellbinding tune. Each creature within 30 feet of you that hears you play must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. If you wish, all creatures in the area that aren't hostile toward you automatically succeed on the saving throw. A creature that fails the saving throw can repeat it at the end of each of its turns, ending the effect on itself on a success. A creature that succeeds on its saving throw is immune to the effect of these pipes for 24 hours. The pipes regain 1d3 expended charges daily at dawn.",
		weight : 2,
		action : [["action", ""]],
		usages : 3,
		recovery : "dawn",
		additional : "regain 1d3",
		prerequisite : "Requires proficiency with wind instruments",
		prereqeval : function (v) {
			for (var i = 0; i < v.toolProfs; i++) {
				if ((/pipe|flute|horn|trumpet|horn|ocarina|sackbut|shawm|trombone|tuba|bombard|cornett|flageolet|^(?=.*(air|wind))(?=.*instrument).*$/i).test(v.toolProfs[i])) return true;
			}
		}
	},
	"pipes of the sewers" : { // contains contributions by Soilentbrad
		name : "Pipes of the Sewers",
		source : [["SRD", 232], ["D", 185]],
		type : "Instrument",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "The pipes have 3 charges, regain 1d3 at dawn, and cause rats to be indifferent toward me unless threatened. As an action, I can play them, then use a bonus action to summon rats in 0.5 miles to form 1 swarm per charge spend. While playing, rat swarms in 30 ft make a Wis check vs. my Cha check or obey my commands.",
		descriptionLong : "The pipes have 3 charges, regain 1d3 at dawn, and cause rats to be indifferent toward me unless threatened. As an action, I can play them, then use a bonus action to summon rats within 0.5 miles to come towards me and form 1 swarm of rats per charge I spend.  When a swarm of rats that isn't under another's control comes within 30 ft of me while I play the pipes, I can make a Charisma check contested by the swarm's Wisdom check. If the swarm fails, it obeys my commands for as long as they can hear the pipes at the start of its turn. If the swarm succeeds or it falls out of the sway, it can't be affected again for 24 hours.",
		descriptionFull : "You must be proficient with wind instruments to use these pipes. While you are attuned to the pipes, ordinary rats and giant rats are indifferent toward you and will not attack you unless you threaten or harm them.\n   The pipes have 3 charges. If you play the pipes as an action, you can use a bonus action to expend 1 to 3 charges, calling forth one swarm of rats with each expended charge, provided that enough rats are within half a mile of you to be called in this fashion (as determined by the DM). If there aren't enough rats to form a swarm, the charge is wasted. Called swarms move toward the music by the shortest available route but aren't under your control otherwise. The pipes regain 1d3 expended charges daily at dawn.\n   Whenever a swarm of rats that isn't under another creature's control comes within 30 feet of you while you are playing the pipes, you can make a Charisma check contested by the swarm's Wisdom check. If you lose the contest, the swarm behaves as it normally would and can't be swayed by the pipes' music for the next 24 hours. If you win the contest, the swarm is swayed by the pipes' music and becomes friendly to you and your companions for as long as you continue to play the pipes each round as an action. A friendly swarm obeys your commands. If you issue no commands to a friendly swarm, it defends itself but otherwise takes no actions. If a friendly swarm starts its turn and can't hear the pipes' music, your control over that swarm ends, and the swarm behaves as it normally would and can't be swayed by the pipes' music for the next 24 hours.",
		attunement : true,
		weight : 2,
		action : [["action", ""]],
		usages : 3,
		recovery : "dawn",
		additional : "regain 1d3",
		prerequisite: "Requires proficiency with wind instruments",
		prereqeval: function (v) {
			for (var i = 0; i < v.toolProfs; i++) {
				if ((/pipe|flute|horn|trumpet|horn|ocarina|sackbut|shawm|trombone|tuba|bombard|cornett|flageolet|^(?=.*(air|wind))(?=.*instrument).*$/i).test(v.toolProfs[i])) return true;
			}
		}
	},
	"potion of speed" : {
		name : "Potion of Speed",
		source : [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity : "very rare",
		magicItemTable : "D",
		description : "Once as an action, I can drink this potion or administer it to another to gain the effects of Haste for 1 minute (no concentration required). The potion's yellow fluid is streaked with black and swirls on its own.",
		descriptionLong : "Once as an action, I can drink this potion or administer it to another to gain the effects of Haste for 1 minute (no concentration required). The potion's yellow fluid is streaked with black and swirls on its own. Haste doubles its speed, gives a +2 bonus to AC, gives advantage on Dex saves, and gives an additional action on each turn. That action can be used only to take the Attack (one weapon attack only), Dash, Disengage, Hide, or Use an Object action. When the spell ends, the target can't move or take actions until after its next turn, as a wave of lethargy sweeps over it.",
		descriptionFull : "When you drink this potion, you gain the effect of the Haste spell for 1 minute (no concentration required). The potion's yellow fluid is streaked with black and swirls on its own.",
		weight : 0.5
	},
	"quiver of ehlonna" : {
		name : "Quiver of Ehlonna",
		nameAlt : "Efficient Quiver",
		source : [["SRD", 220], ["D", 189]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "This quiver has three compartments and weighs 2 lb, regardless of its contents. Its shortest compartment can hold 60 arrows, bolts, or similar objects. Its midsize compartment holds up to 18 javelins or similar objects. Its longest compartment holds up to 6 long objects, such as bows, quarterstaffs, or spears.",
		descriptionFull : "Each of the quiver's three compartments connects to an extradimensional space that allows the quiver to hold numerous items while never weighing more than 2 pounds. The shortest compartment can hold up to sixty arrows, bolts, or similar objects. The midsize compartment holds up to eighteen javelins or similar objects. The longest compartment holds up to six long objects, such as bows, quarterstaffs, or spears.\n   You can draw any item the quiver contains as if doing so from a regular quiver or scabbard.",
		weight : 2
	},
	"ring of free action" : {
		name : "Ring of Free Action",
		source : [["SRD", 236], ["D", 191]],
		type : "ring",
		rarity : "rare",
		magicItemTable : "G",
		description : "While I wear this ring, difficult terrain doesn't cost me extra movement. In addition, magic can neither reduce my speed nor cause me to be paralyzed or restrained.",
		descriptionFull : "While you wear this ring, difficult terrain doesn't cost you extra movement. In addition, magic can neither reduce your speed nor cause you to be paralyzed or restrained.",
		attunement : true,
		savetxt : { immune : ["paralyzed", "restrained"] }
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
		action : [["bonus action", ""]],
		spellcastingBonus : {
			name : "Self Only",
			spells : ["jump"],
			selection : ["jump"],
			firstCol : "atwill"
		},
		spellChanges : {
			"jump" : {
				time : "1 bns",
				range : "Self",
				changes : "The casting time is only a bonus action instead of an action and it can only affect the wearer."
			}
		}
	},
	"ring of mind shielding" : {
		name : "Ring of Mind Shielding",
		source : [["SRD", 236], ["D", 191]],
		type : "ring",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "This ring makes me immune to magic that allows others to read my thoughts, determine if I'm lying, know my alignment or creature type, and telepathy only works if I allow it. As an action, I can cause it to become invisible as long as I wear it and not die, or visible again. If I die while wearing it, my soul enters it.",
		descriptionLong : "While wearing this ring, I'm immune to magic that allows others to read my thoughts, know my alignment or creature type, or determine if I'm lying. Also, telepathy only works if I allow it. As an action, I can cause it to become invisible for as long as I wear it and not die, or visible again. If I die while wearing it, my soul enters it unless it already houses a soul. I can remain in the ring or depart for the afterlife. As long as my soul is in the ring, I can telepathically communicate with any creature wearing it. A wearer can't prevent this telepathic communication.",
		descriptionFull : "While wearing this ring, you are immune to magic that allows other creatures to read your thoughts, determine whether you are lying, know your alignment, or know your creature type. Creatures can telepathically communicate with you only if you allow it.\n   You can use an action to cause the ring to become invisible until you use another action to make it visible, until you remove the ring, or until you die.\n   If you die while wearing the ring, your soul enters it, unless it already houses a soul. You can remain in the ring or depart for the afterlife. As long as your soul is in the ring, you can telepathically communicate with any creature wearing it. A wearer can't prevent this telepathic communication.",
		attunement : true,
		action : [["action", "Ring of Mind Shielding: (in)visible"]],
		savetxt : { immune : ["magic reading my thoughts, truthfullness, alignment, or type"] }
	},
	"ring of protection" : {
		name : "Ring of Protection",
		source : [["SRD", 237], ["D", 191]],
		type : "ring",
		rarity : "rare",
		magicItemTable : "G",
		description : "while I wear this ring, I gain a +1 bonus to AC and saving throws.",
		descriptionFull : "You gain a +1 bonus to AC and saving throws while wearing this ring.",
		attunement : true,
		extraAC : [{name : "Ring of Protection", mod : 1, magic : true, text : "I gain a +1 bonus to AC while attuned."}],
		addMod : [{ type : "save", field : "all", mod : 1, text : "While I wear the Ring of Protection, I gain a +1 to all my saving throws." }]
	},
	"ring of swimming" : {
		name : "Ring of Swimming",
		source : [["SRD", 238], ["D", 193]],
		type : "ring",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "I have a swimming speed of 40 feet while wearing this ring.",
		descriptionFull : "You have a swimming speed of 40 feet while wearing this ring.",
		speed : { swim : { spd : "fixed40", enc : "fixed30" } }
	},
	"ring of the ram" : {
		name : "Ring of the Ram",
		source : [["SRD", 238], ["D", 193]],
		type : "ring",
		rarity : "rare",
		magicItemTable : "G",
		description : "This ring has 3 charges, regaining 1d3 charges daily at dawn. As an action, I can use charges to make a ranged attack on a target in 60 ft, with a +7 to hit, doing 2d10 force damage per charge and pushing it 5 ft per charge. If I target an unattended object, I can try to break it with a +5 per charge on the Strength check.",
		descriptionFull : "This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing the ring, you can use an action to expend 1 to 3 of its charges to attack one creature you can see within 60 feet of you. The ring produces a spectral ram's head and makes its attack roll with a +7 bonus. On a hit, for each charge you spend, the target takes 2d10 force damage and is pushed 5 feet away from you.\n   Alternatively, you can expend 1 to 3 of the ring's charges as an action to try to break an object you can see within 60 feet of you that isn't being worn or carried. The ring makes a Strength check with a +5 bonus for each charge you spend.",
		attunement : true,
		weaponsAdd : ["Ring of the Ram"],
		weaponOptions : {
			regExpSearch : /^(?=.*ring)(?=.*ram).*$/i,
			name : "Ring of the Ram",
			source : [["SRD", 238], ["D", 193]],
			ability : 0,
			type : "Magic Item",
			damage : [2, 10, "force"],
			range : "60 ft",
			description : "Damage is per charge used, also pushes 5 ft away per charge used",
			abilitytodamage : false,
			modifiers : [7, ""]
		}
	},
	"ring of water walking" : {
		name : "Ring of Water Walking",
		source : [["SRD", 238], ["D", 193]],
		type : "ring",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While wearing this ring, I can stand on and move across any liquid surface as if it were solid ground.",
		descriptionFull : "While wearing this ring, you can stand on and move across any liquid surface as if it were solid ground."
	},
	"robe of useful items" : {
		name : "Robe of Useful Items",
		source : [["SRD", 239], ["D", 195]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "As an action while donned, I can detach one patch, causing it to become the thing it represents. The robe becomes ordinary if it runs out of patches. It has two each of: dagger, bullseye lantern (filled and lit), steel mirror, 10-ft pole, 50 ft hempen rope, sack. In addition, it has 4d4 patches that are determined by the DM.",
		descriptionFull : "This robe has cloth patches of various shapes and colors covering it. While wearing the robe. you can use an action to detach one of the patches, causing it to become the object or creature it represents. Once the last patch is removed, the robe becomes an ordinary garment.\n\nThe robe has two of each of the following patches:\n \u2022 Dagger\n \u2022 Bullseye lantern (filled and lit)\n \u2022 Steel mirror\n \u2022 10-foot pole\n \u2022 Hempen rope (50 feet, coiled)\n \u2022 Sack\n\nIn addition, the robe has 4d4 other patches. The DM chooses the patches or determines them randomly.\n\n" + toUni("d100\tPatch") + "\n01-08\tBag of 100 gp\n09-15\tSilver coffer (1 foot long, 6 inches wide and deep) worth 500 gp\n16-22\tIron door (up to 10 feet wide and 10 feet high, barred on one side of your choice), which you can place in an opening you can reach; it conforms to fit the opening, attaching and hinging itself\n23-30\t10 gems worth 100 gp each\n31-44\tWooden ladder (24 feet long)\n45-51\tA riding horse with saddle bags\n52-59\tPit (a cube 10 feet on a side), which you can place on the ground within 10 feet of you\n60-68\t4 potions of healing\n69-75\tRowboat (12 feet long)\n76-83\tSpell scroll containing one spell of 1st to 3rd level\n84-90\t2 mastiffs\n91-96\tWindow (2 feet by 4 feet, up to 2 feet deep), which you can place on a vertical surface you can reach\n97-00\tPortable ram",
		weight : 4,
		action : ["action", ""]
	},
	"rope of climbing" : {
		name : "Rope of Climbing",
		source : [["SRD", 241], ["D", 197]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "This 60 ft silk rope can hold 3000 lb. As an action while I hold one end of it, I can animate it with its command word. Then, as a bonus action, I can command its other end to: start/stop moving (10 ft per turn), (un)fasten itself, coil itself, or (un)knot itself (50 ft length, adv. to climb it). It has AC 20, 20 HP, heals 1 HP/5 min.",
		descriptionLong : "This 60-ft length of silk rope can hold up to 3000 lb. As an action while holding one end of the rope, I can speak the command word to animate it. Then, as a bonus action, I can command the other end to move 10 ft to a chosen destination up to its maximum length away, moving 10 ft on each of my turns until it reaches it. I can also use the bonus action to tell it to stop moving, to fasten itself securely, to unfasten itself, to knot or unknot itself, or to coil itself for carrying. While knotted, the rope shortens to 50 ft and grants advantage to climb it. The rope has AC 20 and 20 HP, regaining 1 HP per 5 minutes.",
		descriptionFull : "This 60-foot length of silk rope weighs 3 pounds and can hold up to 3,000 pounds. If you hold one end of the rope and use an action to speak the command word, the rope animates. As a bonus action, you can command the other end to move toward a destination you choose. That end moves 10 feet on your turn when you first command it and 10 feet on each of your turns until reaching its destination, up to its maximum length away, or until you tell it to stop. You can also tell the rope to fasten itself securely to an object or to unfasten itself, to knot or unknot itself, or to coil itself for carrying.\n   If you tell the rope to knot, large knots appear at 1-foot intervals along the rope. While knotted, the rope shortens to a 50-foot length and grants advantage on checks made to climb it.\n   The rope has AC 20 and 20 hit points. It regains 1 hit point every 5 minutes as long as it has at least 1 hit point. If the rope drops to 0 hit points, it is destroyed.",
		weight : 3,
		action : [["action", " (animate)"], ["bonus action", " (move/fasten/knot/coil)"]]
	},
	"shield, +1, +2, or +3" : {
		name : "Shield, +1, +2, or +3",
		source : [["SRD", 240], ["D", 200]],
		type : "armor (shield)",
		description : "While holding this shield, I have a bonus to AC. This bonus is in addition to the shield's normal bonus to AC. The bonus is determined by the rarity of the shield: uncommon (+1), rare (+2), or very rare (+3).",
		descriptionFull : "While holding this shield, you have a bonus to AC. This bonus is in addition to the shield's normal bonus to AC. The bonus is determined by the rarity of the shield: uncommon (+1), rare (+2), or very rare (+3).",
		allowDuplicates : true,
		choices : ["+1 Shield (uncommon)", "+2 Shield (rare)", "+3 Shield (very rare)"],
		"+1 shield (uncommon)" : {
			name : "Shield +1",
			nameTest : "+1 Shield",
			rarity : "uncommon",
			magicItemTable : "F",
			description : "While holding this shield, I have a +1 bonus to AC. This bonus is in addition to the shield's normal bonus to AC.",
			allowDuplicates : true,
			shieldAdd : "+1 Shield"
		},
		"+2 shield (rare)" : {
			name : "Shield +2",
			nameTest : "+2 Shield",
			rarity : "rare",
			magicItemTable : "G",
			description : "While holding this shield, I have a +2 bonus to AC. This bonus is in addition to the shield's normal bonus to AC.",
			allowDuplicates : true,
			shieldAdd : "+2 Shield"
		},
		"+3 shield (very rare)" : {
			name : "Shield +3",
			nameTest : "+3 Shield",
			rarity : "very rare",
			magicItemTable : "H",
			description : "While holding this shield, I have a +3 bonus to AC. This bonus is in addition to the shield's normal bonus to AC.",
			allowDuplicates : true,
			shieldAdd : "+3 Shield"
		}
	},
	"slippers of spider climbing" : {
		name : "Slippers of Spider Climbing",
		source : [["SRD", 242], ["D", 200]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While I wear these light shoes, I can move up, down, and across vertical surfaces and upside down along ceilings, while leaving my hands free. I have a climbing speed equal to my walking speed. However, the slippers don't allow me to move this way on a slippery surface, such as one covered by ice or oil.",
		descriptionFull : "While you wear these light shoes, you can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free. You have a climbing speed equal to your walking speed. However, the slippers don't allow you to move this way on a slippery surface, such as one covered by ice or oil.",
		attunement : true,
		speed : { climb : { spd : "walk", enc : "walk" } }
	},
	"staff of the magi" : { // contains contributions by Pengsloth
		name : "Staff of the Magi",
		source : [["SRD", 244], ["D", 203]],
		type : "staff",
		rarity : "legendary",
		magicItemTable : "I",
		description : "While holding this staff I have a +2 to spell attacks, adv. on saves vs. spells. It is also a +2 quarterstaff. The staff has 50 charges (regains 4d6+2 at dawn) to cast spells. I can use a reaction to absorb a spell targeting only me., converting its spell level to charges. I can break it as an action, causing a 30-ft explosion.",
		descriptionLong : "While holding this staff I have a +2 to spell attacks, adv. on saving throws vs. spells, and can be used as a +2 quarterstaff. The staff has 50 charges (4d6+2 at dawn) to cast spells. When the last charge is used, it has a 5% chance to regain 1d12+1 charges. I can use a reaction to absorb a spell targeting only me, converting its spell level to charges. If that brings the staff over 50 charges or I use an action to break it, it explodes. If it explodes, there is a 50% chance I teleport to a random plane, otherwise I take 16\xD7 the charges left in force damage. All within 10 ft take 8\xD7, 20 ft 6\xD7, and 30 ft 4\xD7; DC 17 Dex save halves.",
		descriptionFull : "This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. While you hold it, you gain a +2 bonus to spell attack rolls.\n   The staff has 50 charges for the following properties. It regains 4d6+2 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 20, the staff regains 1d12+1 charges.\n   " + toUni("Spell Absorption") + ". While holding the staff, you have advantage on saving throws against spells. In addition, you can use your reaction when another creature casts a spell that targets only you. If you do, the staff absorbs the magic of the spell, canceling its effect and gaining a number of charges equal to the absorbed spell's level. However, if doing so brings the staff's total number of charges above 50, the staff explodes as if you activated its retributive strike (see below).\n   " + toUni("Spells") + ". While holding the staff, you can use an action to expend some of its charges to cast one of the following spells from it, using your spell save DC and spellcasting ability: Conjure Elemental (7 charges), Dispel Magic (3 charges), Fireball (7th-level version, 7 charges), Flaming Sphere (2 charges), Ice Storm (4 charges), Invisibility (2 charges), Knock (2 charges), Lightning Bolt (7th-level version, 7 charges), Passwall (5 charges), Plane Shift (7 charges), Telekinesis (5 charges), Wall of Fire (4 charges), or Web (2 charges).\n   You can also use an action to cast one of the following spells from the staff without using any charges: Arcane Lock, Detect Magic, Enlarge/Reduce, Light, Mage Hand, or Protection from Evil and Good.\n   " + toUni("Retributive Strike") + ". You can use an action to break the staff over your knee or against a solid surface, performing a retributive strike. The staff is destroyed and releases its remaining magic in an explosion that expands to fill a 30-foot-radius sphere centered on it.\n   You have a 50% chance to instantly travel to a random plane of existence, avoiding the explosion. If you fail to avoid the effect, you take force damage equal to 16 \xD7 the number of charges in the staff. Every other creature in the area must make a DC 17 Dexterity saving throw. On a failed save, a creature takes an amount of damage based on how far away it is from the point of origin, as shown in the following table. On a successful save, a creature takes half as much damage.\n\n" + toUni("Distance from Origin\tDamage") + "\n10 ft. away or closer\t8 \xD7 the number of charges in the staff\n11 to 20 ft. away\t\t6 \xD7 the number of charges in the staff\n21 to 30 ft. away\t\t4 \xD7 the number of charges in the staff",
		attunement : true,
		weight : 4,
		prerequisite : "Requires attunement by a sorcerer, warlock, or wizard",
		prereqeval : function (v) {
			return classes.known.sorcerer || classes.known.warlock || classes.known.wizard ? true : false;
		},
		weaponsAdd : ["Staff of the Magi"],
		weaponOptions : {
			baseWeapon : "quarterstaff",
			regExpSearch : /^(?=.*staff)(?=.*magi).*$/i,
			name : "Staff of the Magi",
			source : [["SRD", 244], ["D", 203]],
			modifiers : [2, 2]
		},
		calcChanges : {
			spellCalc : [
				function (type, spellcasters, ability) {
					if (type == "attack") return 2;
				},
				"While holding the Staff of the Magi I have a +2 bonus to spell attack rolls."
			]
		},
		usages : 50,
		recovery : "dawn",
		additional : "regain 4d6+2",
		savetxt : { adv_vs : ["spells"] },
		action : [
			["reaction", " (Spell Absorption)"],
			["action", " (Retributive Strike)"]
		],
		spellcastingAbility : "class",
		spellFirstColTitle : "Ch",
		spellcastingBonus : [{
			name : "7 Charges",
			spells : ["conjure elemental"],
			selection : ["conjure elemental"],
			firstCol : "7"
		}, {
			name : "7 Charges; 7th level",
			spells : ["fireball"],
			selection : ["fireball"],
			firstCol : "7"
		}, {
			name : "7 Charges; 7th level",
			spells : ["lightning bolt"],
			selection : ["lightning bolt"],
			firstCol : "7"
		}, {
			name : "7 Charges",
			spells : ["plane shift"],
			selection : ["plane shift"],
			firstCol : "7"
		}, {
			name : "5 Charges",
			spells : ["passwall"],
			selection : ["passwall"],
			firstCol : "5"
		}, {
			name : "5 Charges",
			spells : ["telekinesis"],
			selection : ["telekinesis"],
			firstCol : "5"
		}, {
			name : "4 Charges",
			spells : ["ice storm"],
			selection : ["ice storm"],
			firstCol : "4"
		}, {
			name : "4 Charges",
			spells : ["wall of fire"],
			selection : ["wall of fire"],
			firstCol : "4"
		}, {
			name : "3 Charges",
			spells : ["dispel magic"],
			selection : ["dispel magic"],
			firstCol : "3"
		}, {
			name : "2 Charges",
			spells : ["flaming sphere"],
			selection : ["flaming sphere"],
			firstCol : "2"
		}, {
			name : "2 Charges",
			spells : ["invisibility"],
			selection : ["invisibility"],
			firstCol : "2"
		}, {
			name : "2 Charges",
			spells : ["knock"],
			selection : ["knock"],
			firstCol : "2"
		}, {
			name : "2 Charges",
			spells : ["web"],
			selection : ["web"],
			firstCol : "2"
		}],
		eval : function () {
			// get the CurrentSpells object or create it if it didn't exists yet.
			var spObj = CreateCurrentSpellsEntry("items", "staff of the magi");
			// now set some of the attributes for it, adding the 3 spells that didn't fit as spellcastingBonus
			spObj.typeSp = "known";
			spObj.known = { cantrips : 2, spells : 4 };
			spObj.list = { spells : ["light", "mage hand", "arcane lock", "detect magic", "enlarge/reduce", "protection from evil and good"] };
			spObj.selectCa = ["light", "mage hand"];
			spObj.selectSp = ["arcane lock", "detect magic", "enlarge/reduce", "protection from evil and good"];
			spObj.typeList = 2;
		},
		removeeval : function () {
			if (CurrentSpells["staff of the magi"]) {
				// delete the CurrentSpells object
				delete CurrentSpells["staff of the magi"];
				SetStringifieds('spells');
				CurrentUpdates.types.push("spells");
			}
		},
		spellChanges : {
			"light" : { firstCol : "atwill" },
			"mage hand" : { firstCol : "atwill" },
			"arcane lock" : { firstCol : "atwill" },
			"detect magic" : { firstCol : "atwill" },
			"enlarge/reduce" : { firstCol : "atwill" },
			"protection from evil and good" : { firstCol : "atwill" },
			"fireball" : {
				nameShort : "Fireball (7th level)",
				description : "20-ft rad all crea 12d6 Fire dmg; save halves; unattended flammable objects ignite",
				changes : "Cast as if using a 7th-level spell slot."
			},
			"lightning bolt" : {
				nameShort : "Lightning Bolt (7th level)",
				description : "100-ft long 5-ft wide all 12d6 Lightning dmg; save halves; unattended flammable obj ignite",
				changes : "Cast as if using a 7th-level spell slot."
			},
			"conjure elemental" : {
				time : "1 a",
				changes : "Casting time is only 1 action instead of 1 minute."
			}
		}
	},
	"stone of controlling earth elementals" : {
		name : "Stone of Controlling Earth Elementals",
		source : [["SRD", 246], ["D", 205]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "While the stone is touching the ground, I can use an action to speak its command word and summon an earth elemental, as if I had cast the Conjure Elemental spell. The stone can't be used this way again until the next dawn.",
		descriptionFull : "If the stone is touching the ground, you can use an action to speak its command word and summon an earth elemental, as if you had cast the Conjure Elemental spell. The stone can't be used this way again until the next dawn. The stone weighs 5 pounds.",
		weight : 5,
		spellcastingBonus : {
			name : "Earth Elemental only",
			spells : ["conjure elemental"],
			selection : ["conjure elemental"],
			firstCol : "oncelr"
		},
		usages : 1,
		recovery : "dawn",
		spellChanges : {
			"conjure elemental" : {
				time : "1 a",
				component : "V,M\u0192",
				compMaterial : "The Stone of Controlling Earth Elementals needs to touch the ground to cast this spell with a command word.",
				description : "CR 5 earth elemental that obeys my verbal commands; on broken conc. elemental breaks free",
				changes : "Using the Stone of Controlling Earth Elementals, the spell only takes 1 action instead of 1 minute to cast, but can only bring forth an earth elemental."
			}
		}
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
		descriptionFull : "This item appears to be a longsword hilt. While grasping the hilt, you can use a bonus action to cause a blade of pure radiance to spring into existence, or make the blade disappear. While the blade exists, this magic longsword has the finesse property. If you are proficient with shortswords or longswords, you are proficient with the sun blade.\n   You gain a +2 bonus to attack and damage rolls made with this weapon, which deals radiant damage instead of slashing damage. When you hit an undead with it, that target takes an extra 1d8 radiant damage.\n   The sword's luminous blade emits bright light in a 15-foot radius and dim light for an additional 15 feet. The light is sunlight. While the blade persists, you can use an action to expand or reduce its radius of bright and dim light by 5 feet each, to a maximum of 30 feet each or a minimum of 10 feet each.",
		weight : 3,
		action : [["bonus action", " (start/stop)"], ["action", " (change light)"]],
		weaponsAdd : ["Sun Blade"],
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
					if (v.theWea.name == "Sun Blade" && !fields.Proficiency) {
						fields.Proficiency = CurrentProfs.weapon.otherWea && CurrentProfs.weapon.otherWea.finalProfs.indexOf("shortsword") !== -1;
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
		description : "When I roll a 20 to hit with this magic sword vs. a creature, it takes +14 slashing damage and I have a 5% chance of lobbing off one of its limbs. It does maximum damage vs. objects. With the command word, the blade gives bright light in a 10-ft radius \u0026 dim light in another 10 ft. " + (typePF ? "This stops if sheathed." : "The light stops when commanded again or sheathed."),
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
		description : "I have a +3 bonus to attack and damage rolls with this magic sword. It ignores slashing damage resistance. On a roll of 20 to hit, it cuts off one head" + (typePF ? "" : ", possibly killing it instantly") + ". If the target has no head, is immune to slashing damage, has legendary actions, or its neck is too wide, it takes +6d8 slashing damage instead.",
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
						fields.Description += (fields.Description ? '; ' : '') + 'Ignores slashing resistance; On 20 to hit: cut off head';
					}
				},
				'If I include the word "Vorpal" in a the name of a sword that deals slashing damage, it will be treated as the magic weapon Vorpal Sword. It has +3 to hit and damage and on a roll of 20 on the attack roll, it cuts off a head of the target.'
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
	"wand of magic detection" : {
		name : "Wand of Magic Detection",
		source : [["SRD", 249], ["D", 211]],
		type : "wand",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "This wand has 3 charges. While holding it, I can expend 1 charge as an action to cast Detect Magic from it. The wand regains 1d3 expended charges daily at dawn.",
		descriptionFull : "This wand has 3 charges. While holding it, you can expend 1 charge as an action to cast the Detect Magic spell from it. The wand regains 1d3 expended charges daily at dawn.",
		weight : 1,
		spellcastingBonus : {
			name : "1 charge",
			spells : ["detect magic"],
			selection : ["detect magic"],
			firstCol : 1
		},
		usages : 3,
		recovery : "dawn",
		additional : "regain 1d3",
		spellFirstColTitle : "Ch"
	},
	"wand of secrets" : {
		name : "Wand of Secrets",
		source : [["SRD", 249], ["D", 211]],
		type : "wand",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "The wand has 3 charges. While holding it, I can use an action to expend 1 of its charges, and if a secret door or trap is within 30 feet of me, the wand pulses and points at the one nearest to me. The wand regains 1d3 expended charges daily at dawn.",
		descriptionFull : "The wand has 3 charges. While holding it. you can use an action to expend 1 of its charges, and if a secret door or trap is within 30 feet of you, the wand pulses and points at the one nearest to you. The wand regains 1d3 expended charges daily at dawn.",
		weight : 1,
		usages : 3,
		recovery : "dawn",
		additional : "regain 1d3",
		action : [["action", ""]]
	},
	"weapon, +1, +2, or +3" : {
		name : "Weapon, +1, +2, or +3",
		source : [["SRD", 250], ["D", 213]],
		type : "weapon (any)",
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
			nameTest : "+1 Weapon",
			rarity : "uncommon",
			magicItemTable : "F",
			description : "I have a +1 bonus to attack and damage rolls made with this magic weapon.",
			allowDuplicates : true
		},
		"+2 weapon (rare)" : {
			name : "Weapon +2",
			nameTest : "+2 Weapon",
			rarity : "rare",
			magicItemTable : "G",
			description : "I have a +2 bonus to attack and damage rolls made with this magic weapon.",
			allowDuplicates : true
		},
		"+3 weapon (very rare)" : {
			name : "Weapon +3",
			nameTest : "+3 Weapon",
			rarity : "very rare",
			magicItemTable : "H",
			description : "I have a +3 bonus to attack and damage rolls made with this magic weapon.",
			allowDuplicates : true
		}
	},
	"winged boots" : {
		name : "Winged Boots",
		source : [["SRD", 250], ["D", 214]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "These boots grant me a flying speed equal to my walking speed. I can use them to fly for up to 4 hours, all at once or incremental, using a minimum of 1 minute each time. If I'm flying when the duration expires, I descend 30 ft per round. They regain 2 hours of flying capability for every 12 hours they aren't in use.",
		descriptionFull : "While you wear these boots, you have a flying speed equal to your walking speed. You can use the boots to fly for up to 4 hours, all at once or in several shorter flights, each one using a minimum of 1 minute from the duration. If you are flying when the duration expires, you descend at a rate of 30 feet per round until you land.\n   The boots regain 2 hours of flying capability for every 12 hours they aren't in use.",
		attunement : true,
		usages : "240 min",
		recovery : "Special",
		additional : "regain 2h/12h"
	},
	"wings of flying" : {
		name : "Wings of Flying",
		source : [["SRD", 250], ["D", 214]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "While wearing this cloak, I can use an action to speak its command word. This turns the cloak into a pair of bat wings or bird wings on my back for 1 hour or until I repeat the command word as an action. The wings give me a flying speed of 60 ft. When they disappear, I can't use them again for 1d12 hours.",
		descriptionFull : "While wearing this cloak, you can use an action to speak its command word. This turns the cloak into a pair of bat wings or bird wings on your back for 1 hour or until you repeat the command word as an action. The wings give you a flying speed of 60 feet. When they disappear, you can't use them again for 1d12 hours.",
		attunement : true,
		usages : 1,
		recovery : "1d12 h"
	},
};