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
};

var AddMagicItemsMenu;

var sentientItemConflictTxt = "\u25C6 Sentient Item Conflict (SRD 252, DMG 216)" + desc([
	"A sentient item has a will of its own, shaped by its personality and alignment. If its wielder acts in a manner opposed to the item's alignment or purpose, conflict can arise. When such a conflict occurs, the item makes a Charisma check contested by the wielder's Charisma check. If the item wins the contest, it makes one or more of the following demands:",
	" \u2022 It insists on being carried or worn at all times.",
	" \u2022 It demands that its wielder dispose of anything it finds repugnant.",
	" \u2022 It demands that its wielder pursue its goals to the exclusion of all other goals.",
	" \u2022 It demands to be given to someone else.",
	"If its wielder refuses to comply with its wishes, it can do any or all of the following:",
	" \u2022 Make it impossible for its wielder to attune to it.",
	" \u2022 Suppress one or more of its activated properties.",
	" \u2022 Attempt to take control of its wielder.",
	"Once per dawn, a sentient item attempts to take control of its wielder, which must make a Charisma save, with a DC equal to 12 + the item's Charisma modifier. If failed, the wielder is charmed by the item for 1d12 hours. While charmed, the wielder must try to follow the item's commands. If the wielder takes damage, it can repeat the save, ending the effect on a success."
]);

var Base_MagicItemsList = {
	"adamantine armor" : {
		name : "Adamantine Armor",
		source : [["SRD", 207], ["D", 150]],
		type : "armor (medium or heavy)",
		rarity : "uncommon",
		description : "This armor is reinforced with adamantine, one of the hardest substances in existence. While I'm wearing it, any critical hit against me becomes a normal hit.",
		descriptionFull : "This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any critical hit against you becomes a normal hit.\n\nThere are several magic item tables in the Dungeon Masters Guide where this item appears on. It varies per type of armor and not all types are listed. See below for the table:\n\n" + toUni("Armor Type\tTable") + "\nChain Mail\t  F\nChain Shirt\t  F\nScale Mail  \t  F\nBreastplate\t  G\nSplint Armor\t  G\nHalf Plate Armor\t  H\nPlate Armor\t  H",
		allowDuplicates : true,
		chooseGear : {
			type : "armor",
			prefixOrSuffix : "brackets",
			itemName1stPage : ["suffix", "Adamantine"],
			descriptionChange : ["prefix", "armor"],
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
				components : "V,M\u0192",
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
		description : "I have resistance to nonmagical damage while I wear this plate armor. As an action, I can make myself immune to nonmagical damage for 10 minutes or until I am no longer wearing the armor. Once this special action is used, it can't be used again until the next dawn.",
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
		descriptionFull : "You have resistance to one type of damage while you wear this armor. The DM chooses the type or determines it randomly from the options below:\n\n" + toUni("d10\tType\t\td10\tType") + "\n 1\tAcid\t\t 6\tNecrotic\n 2\tCold\t\t 7\tPoison\n 3\tFire\t\t 8\tPsychic\n 4\tForce\t\t 9\tRadiant\n 5\tLightning   \t 10\tThunder\n\nThere are several magic item tables in the Dungeon Masters Guide where this item appears on. It varies per type of armor, and not all types of armor are listed. See below for the table per type of armor or resistance:\n\n" + toUni("Table\tArmor") + "\n G\tChain Mail\n G\tChain Shirt\n G\tLeather\n G\tScale Mail\n H\tBreastplate\n H\tHide\n H\tSplint\n H\tStudded Leather\n I\tHalf Plate\n I\tPlate", // Hide armor added by AL content catalogue v8.08
		attunement : true,
		allowDuplicates : true,
		chooseGear : {
			type : "armor",
			prefixOrSuffix : "prefix"
		},
		choices : ["Acid", "Cold", "Fire", "Force", "Lightning", "Necrotic", "Poison", "Psychic", "Radiant", "Thunder"],
		choicesNotInMenu : true,
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
		description: "While wearing this plate armor, I have resistance to one of the following damage types: bludgeoning, piercing, or slashing; although, unfortunately, I have vulnerability to the other two until I am targeted by a Remove Curse spell.",
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
		choicesNotInMenu : true,
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
		shieldAdd : "Arrow-Catching Shield (+\u200A2 vs. ranged)"
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
		description : "This bag is a feeding orifice for an extradimensional creature, which is closed if it is turned inside out. It devours all edible matter placed inside. Creatures partially inside get pulled in 50% of the time. Escaping (Str DC 15) or pulling another out (Str DC 20) is an action. Creatures starting their turn inside are devoured.",
		descriptionLong : "Resembling a Bag of Holding, this bag is a feeding orifice for an extradimensional creature. The orifice is closed if the bag is turned inside out. It devours all vegetable and animal matter placed inside. Creatures partially inside get pulled in 50% of the time. Escaping (Str DC 15) or pulling another out (Str DC 20) takes an action. Creatures starting their turn inside are devoured, their body destroyed. Up to 1 cu ft of inanimate objects can be stored inside, but once each day they are swallowed by the creature and spat out on a random plane. If the bag is pierced or torn, it is destroyed and its content lost.",
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
			sortname: "Bag of Tricks, Gray",
			description: "As an action, 3 times per dawn, I can pull an object from this bag and throw it 20 ft. It transforms into a random creature when it lands (d8): 1-weasel, 2-giant rat, 3-badger, 4-boar, 5-panther, 6-giant badger, 7-dire wolf, 8-giant elk. It follows my commands, acts on my turn, and vanishes at dawn or if reduced to 0 HP.",
			descriptionLong: "As an action, I can pull a fuzzy object from this bag and throw it 20 ft. It transforms into a creature when it lands, determined randomly (d8): 1-weasel, 2-giant rat, 3-badger, 4-boar, 5-panther, 6-giant badger, 7-dire wolf, 8-giant elk. The creature is friendly, acts on my turn, and vanishes at the next dawn or when it is reduced to 0 HP. As a bonus action, I can command it how to move and what action to take on its next turn, or give it general orders (e.g. attack my enemies). Without orders, it acts as it normally would. Once three fuzzy objects have been pulled from the bag, it can't be used again until the next dawn.",
			descriptionFull: "This ordinary bag, made from gray cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. The bag weighs \u00BD pound.\n   You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table. The creature vanishes at the next dawn or when it is reduced to 0 hit points.\n   The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature.\n   Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\n\n" + toUni("d8\tCreature") + "\n 1\tWeasel\n 2\tGiant rat\n 3\tBadger\n 4\tBoar\n 5\tPanther\n 6\tGiant badger\n 7\tDire wolf\n 8\tGiant elk"
		},
		"rust" : {
			name: "Rust Bag of Tricks",
			sortname: "Bag of Tricks, Rust",
			description: "As an action, 3 times per dawn, I can pull an object from this bag and throw it 20 ft. It transforms into a random creature when it lands (d8): 1-rat, 2-owl, 3-mastiff, 4-goat, 5-giant goat, 6-giant boar, 7-lion, 8-brown bear. It follows my commands, acts on my turn, and vanishes at dawn or if reduced to 0 HP.",
			descriptionLong: "As an action, I can pull a fuzzy object from this bag and throw it 20 ft. It transforms into a creature when it lands, determined randomly (d8): 1-rat, 2-owl, 3-mastiff, 4-goat, 5-giant goat, 6-giant boar, 7-lion, 8-brown bear. The creature is friendly, acts on my turn, and vanishes at the next dawn or when it is reduced to 0 HP. As a bonus action, I can command it how to move and what action to take on its next turn, or give it general orders (e.g. attack my enemies). Without orders, it acts as it normally would. Once three fuzzy objects have been pulled from the bag, it can't be used again until the next dawn.",
			descriptionFull: "This ordinary bag, made from rust-colored cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. The bag weighs \u00BD pound.\n   You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table. The creature vanishes at the next dawn or when it is reduced to 0 hit points.\n   The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature.\n   Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\n\n" + toUni("d8\tCreature") + "\n 1\tRat\n 2\tOwl\n 3\tMastiff\n 4\tGoat\n 5\tGiant goat\n 6\tGiant boar\n 7\tLion\n 8\tBrown bear"
		},
		"tan" : {
			name: "Tan Bag of Tricks",
			sortname: "Bag of Tricks, Tan",
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
		descriptionFull : "While wearing this belt, your Strength score changes to a score granted by the belt. If your Strength is already equal to or greater than the belt's score, the item has no effect on you. Six varieties of this belt exist, corresponding with and having rarity according to the six kinds of true giants. The belt of stone giant strength and the belt of frost giant strength look different, but they have the same effect.\n\n" + toUni("Type\t\tStr\tRarity") + "\nHill giant\t\t21\tRare\nStone/frost giant\t23\tVery rare\nFire giant   \t25\tVery rare\nCloud giant\t27\tLegendary\nStorm giant\t29\tLegendary",
		attunement : true,
		allowDuplicates : true,
		choices : ["Hill (Str 21, rare)", "Frost (Str 23, very rare)", "Stone (Str 23, very rare)", "Fire (Str 25, very rare)", "Cloud (Str 27, legendary)", "Storm (Str 29, legendary)"],
		"hill (str 21, rare)" : {
			name : "Belt of Hill Giant Strength",
			sortname : "Belt of Giant Strength, Hill (Str 21)",
			rarity : "rare",
			magicItemTable : "G",
			description : "My Strength score is 21 while I'm wearing this belt, provided that my Strength is not already 21 or higher.",
			scoresOverride : [21, 0, 0, 0, 0, 0]
		},
		"frost (str 23, very rare)" : {
			name : "Belt of Frost Giant Strength",
			sortname : "Belt of Giant Strength, Frost (Str 23)",
			rarity : "very rare",
			magicItemTable : "H",
			description : "My Strength score is 23 while I'm wearing this belt, provided that my Strength is not already 23 or higher.",
			scoresOverride : [23, 0, 0, 0, 0, 0]
		},
		"stone (str 23, very rare)" : {
			name : "Belt of Stone Giant Strength",
			sortname : "Belt of Giant Strength, Stone (Str 23)",
			rarity : "very rare",
			magicItemTable : "H",
			description : "My Strength score is 23 while I'm wearing this belt, provided that my Strength is not already 23 or higher.",
			scoresOverride : [23, 0, 0, 0, 0, 0]
		},
		"fire (str 25, very rare)" : {
			name : "Belt of Fire Giant Strength",
			sortname : "Belt of Giant Strength, Fire (Str 25)",
			rarity : "very rare",
			magicItemTable : "H",
			description : "My Strength score is 25 while I'm wearing this belt, provided that my Strength is not already 25 or higher.",
			scoresOverride : [25, 0, 0, 0, 0, 0]
		},
		"cloud (str 27, legendary)" : {
			name : "Belt of Cloud Giant Strength",
			sortname : "Belt of Giant Strength, Cloud (Str 27)",
			rarity : "legendary",
			magicItemTable : "I",
			description : "My Strength score is 27 while I'm wearing this belt, provided that my Strength is not already 27 or higher.",
			scoresOverride : [27, 0, 0, 0, 0, 0]
		},
		"storm (str 29, legendary)" : {
			name : "Belt of Storm Giant Strength",
			sortname : "Belt of Giant Strength, Storm (Str 29)",
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
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/axe/i).test(v.baseWeaponName) && (/berserker/i).test(v.WeaponTextName)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + 'Cursed';
					}
				},
				'If I include the word "Berserker" in a the name of an axe, it will be treated as the magic weapon Berserker Axe. It has +1 to hit and damage, but also bears a curse.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/axe/i).test(v.baseWeaponName) && (/berserker/i).test(v.WeaponTextName)) {
						output.magic = v.thisWeapon[1] + 1;
					}
				}, ''
			],
			hp : function (totalHD) { return [totalHD]; }
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
				save : "",
				description : "I rise vertically, up to 20 ft; I can move up or down 20 ft as part of my move during my turn",
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
		speed : { walk : { spd : "fixed 30", enc : "fixed 30" } }
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
				components : "V,M\u0192",
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
				components : "V,M\u0192",
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
		description : "With the command word, this broom hovers and can either be ridden in the air or sent alone up to 1 mile by naming a familiar location. It has a flying speed of 50 ft, holds up to 400 lb, but only has 30 ft speed if over 200 lb. It stops hovering when I land. With another command word, it flies to me if within 1 mile.",
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
		choicesNotInMenu : true,
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
		choicesNotInMenu : true,
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
				components : "V,M\u0192",
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
		dmgres : ["Poison"],
		usages : 1,
		recovery : "dawn",
		additional : "cast Web",
		fixedDC : 13,
		speed : { climb : { spd : "walk", enc : "walk" } },
		spellcastingBonus : {
			name : "Once per dawn",
			spells : ["web"],
			selection : ["web"],
			firstCol : "oncelr"
		},
		spellChanges : {
			"web" : {
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
		addMod : [{ type : "save", field : "all", mod : 1, text : "While I wear the Cloak of Protection, I gain a +1 bonus to all my saving throws." }]
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
		speed : { swim : { spd : "fixed 60", enc : "fixed 50" } }
	},
	"crystal ball" : {
		name : "Crystal Ball",
		source : [["SRD", 214], ["D", 159]],
		type : "wondrous item",
		description : "I can cast Scrying (DC 17) at will while touching this ball of about 6 inches in diameter.",
		descriptionFull : "This crystal ball is about 6 inches in diameter. While touching it, you can cast the Scrying spell (save DC 17) with it.",
		attunement : true,
		weight : 3, // As orb arcane focus
		allowDuplicates : true,
		choices : ["Crystal Ball  ", "Crystal Ball of Mind Reading", "Crystal Ball of Telepathy", "Crystal Ball of True Seeing"],
		"crystal ball  " : {
			name : "Crystal Ball  ",
			rarity : "very rare",
			magicItemTable : "H",
			fixedDC : 17,
			spellcastingBonus : {
				name : "DC 17",
				spells : ["scrying"],
				selection : ["scrying"],
				firstCol : "atwill"
			}
		},
		"crystal ball of mind reading" : {
			name : "Crystal Ball of Mind Reading",
			rarity : "legendary",
			magicItemTable : "I",
			description : "I can cast Scrying (DC 17) at will while touching this crystal ball of 6\" diameter. While scrying, I can cast Detect Thoughts (DC 17) to target creatures I can see within 30 ft of the spell's sensor. I don't need to concentrate on this Detect Thoughts, but it ends when the scrying ends.",
			descriptionFull : "This crystal ball is about 6 inches in diameter. While touching it, you can cast the Scrying spell (save DC 17) with it.\n   You can use an action to cast the Detect Thoughts spell (save DC 17) while you are Scrying with the crystal ball, targeting creatures you can see within 30 feet of the spell's sensor. You don't need to concentrate on this Detect Thoughts to maintain it during its duration, but it ends if Scrying ends.",
			fixedDC : 17,
			spellcastingBonus : {
				name : "DC 17",
				spells : ["scrying", "detect thoughts"],
				selection : ["scrying", "detect thoughts"],
				firstCol : "atwill",
				times : 2
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
			fixedDC : 17,
			spellcastingBonus : [{
				name : "At will, DC 17",
				spells : ["scrying"],
				selection : ["scrying"],
				firstCol : "atwill"
			}, {
				name : "1\xD7 per long rest, DC 17",
				spells : ["suggestion"],
				selection : ["suggestion"],
				firstCol : "oncelr"
			}],
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
			fixedDC : 17,
			spellcastingBonus : {
				name : "DC 17",
				spells : ["scrying"],
				selection : ["scrying"],
				firstCol : "atwill"
			},
			spellChanges : {
				"scrying" : {
					description : "1 crea save or sensor follows it around; or sensor in familiar location; truesight 120 ft on sensor; see B",
					changes : "I have truesight out to 120 ft from the scrying sensor."
				}
			}
		}
	},
	"cube of force" : { // contains contributions by Larry Hoy
		name : "Cube of Force",
		source : [["SRD", 215], ["D", 159]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "Each face of this 1-inch cube has a distinct marking on it. As an action, I can press one of these faces, expending a number of charges to create an effect based on the chosen face, if enough charges remain. This creates a 15-ft cube barrier of force on me for 1 min, which moves with me. See Notes page for details.",
		descriptionFull : "This cube is about an inch across. Each face has a distinct marking on it that can be pressed. The cube starts with 36 charges, and it regains 1d20 expended charges daily at dawn.\n   You can use an action to press one of the cube's faces, expending a number of charges based on the chosen face, as shown in the Cube of Force Faces table. Each face has a different effect. If the cube has insufficient charges remaining, nothing happens. Otherwise, a barrier of invisible force springs into existence, forming a cube 15 feet on a side. The barrier is centered on you, moves with you, and lasts for 1 minute, until you use an action to press the cube's sixth face, or the cube runs out of charges. You can change the barrier's effect by pressing a different face of the cube and expending the requisite number of charges, resetting the duration. If your movement causes the barrier to come into contact with a solid object that can't pass through the cube, you can't move any closer to that object as long as the barrier remains.\n\n" + toUni("Face    Charges\tEffect") + "\n  1\t1\tGases, wind, and fog can't pass through the barrier.\n  2\t2\tNonliving matter can't pass through the barrier.*\n  3\t3\tLiving matter can't pass through the barrier.\n  4\t4\tSpell effects can't pass through the barrier.\n  5\t5\tNothing can pass through the barrier.*\n  6\t0\tThe barrier deactivates.\n\n   * Walls, floors, and ceilings can pass through at your discretion.\n\nThe cube loses charges when the barrier is targeted by certain spells or comes into contact with certain spell or magic item effects, as shown in the table below.\n\n" + toUni("Spell or Item\tCharges Lost") + "\nDisintegrate\t1d12\nHorn of Blasting\t1d10\nPasswall\t\t1d6\nPrismatic Spray\t1d20\nWall of Fire\t1d4",
		attunement : true,
		usages : 36,
		recovery : "dawn",
		additional : "regains 1d20",
		action : [["action", ""]],
		toNotesPage : [{
			name : "Cube of Force Charge Expenditure Tables",
			note : [
				"As an action, I can pressing one of the faces of the cube, expending charges and invoking the effect as listed below. The cube has 36 charges, and it regains 1d20 expended charges daily at dawn.",
				"Once activated, a barrier of invisible force springs into existence, forming a cube 15 feet on a side. The barrier is centered on me, moves with me, and lasts for 1 minute, until I use an action to press the cube's sixth face, the cube runs out of charges, or I press another face to invoke another barrier.",
				"If my movement causes the barrier to come into contact with a solid object that can't pass through the cube, I can't move any closer to that object as long as the barrier remains.",
				"FACE\tCHARGES\tEFFECT",
				"   1\t      1\tGases, wind, and fog can't pass through the barrier.",
				"   2\t      2\tNonliving matter can't pass through the barrier.*",
				"   3\t      3\tLiving matter can't pass through the barrier.",
				"   4\t      4\tSpell effects can't pass through the barrier.",
				"   5\t      5\tNothing can pass through the barrier.*",
				"   6\t      0\tThe barrier deactivates.\n" +
				"* Walls, floors, and ceilings can pass through at my discretion.\n",
				"The cube loses charges when the barrier is targeted by certain spells or comes into contact with certain spell or magic item effects, as shown in the table below.",
				"SPELL OR ITEM\tCHARGES LOST",
				"Disintegrate  \t1d12",
				"Horn of Blasting\t1d10",
				"Passwall\t\t1d6",
				"Prismatic Spray\t1d20",
				"Wall of Fire\t1d4"
			]
		}]
	},
	"cubic gate" : { // contains contributions by Larry Hoy
		name : "Cubic Gate",
		source : [["SRD", 215], ["D", 160]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "The six sides of this 3-inch cube, which radiates palpable magic energy, are each keyed to a different plane of existence (one is material plane). As an action, I can expend a charge and press a side of the cube once to cast Gate or twice to cast Plane Shift (DC 17). Both spells only link to the plane on the pressed side.",
		descriptionFull : "This cube is 3 inches across and radiates palpable magical energy. The six sides of the cube are each keyed to a different plane of existence, one of which is the Material Plane. The other sides are linked to planes determined by the DM.\n   You can use an action to press one side of the cube to cast the Gate spell with it, opening a portal to the plane keyed to that side. Alternatively, if you use an action to press one side twice, you can cast the Plane Shift spell (save DC 17) with the cube and transport the targets to the plane keyed to that side.\n   The cube has 3 charges. Each use of the cube expends 1 charge. The cube regains 1d3 expended charges daily at dawn.",
		usages : 3,
		recovery : "dawn",
		additional : "regains 1d3",
		spellFirstColTitle : "Ch",
		fixedDC : 17,
		spellcastingBonus : {
			name : "1 charge",
			spells : ["gate", "plane shift"],
			selection : ["gate", "plane shift"],
			times : 2,
			firstCol : 1
		},
		spellChanges : {
			"plane shift" : {
				description : "Me + 8 willing crea teleport to, or spell attack + save to transport unwilling to plane keyed to the side",
				changes : "Using the Cubic Gate, the spell only links to the plane on the side of the cube that pressed."
			},
			"gate" : {
				description : "Create a portal to a precise location on the plane keyed to the side; can transport named creature to me",
				changes : "Using the Cubic Gate, the spell only links to the plane on the side of the cube that pressed."
			}
		}
	},
	"daern's instant fortress" : { // contains contributions by Larry Hoy
		name : "Daern's Instant Fortress",
		nameAlt : "Instant Fortress",
		source : [["SRD", 226], ["D", 160]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description: "As an action, I can place this 1-inch metal cube on the ground and speak its command word, making it grow into a 20-ft by 20-ft by 30-ft high adamantine tower with a door facing me, arrow slits on all sides, battlement atop, two floors, and a ladder along one wall ending at a trapdoor to the roof. See Notes page for details.",
		descriptionFull : "You can use an action to place this 1-inch metal cube on the ground and speak its command word. The cube rapidly grows into a fortress that remains until you use an action to speak the command word that dismisses it, which works only if the fortress is empty.\n   The fortress is a square tower, 20 feet on a side and 30 feet high, with arrow slits on all sides and a battlement atop it. Its interior is divided into two floors. with a ladder running along one wall to connect them. The ladder ends at a trapdoor leading to the roof. When activated, the tower has a small door on the side facing you. The door opens only at your command, which you can speak as a bonus action. It is immune to the Knock spell and similar magic, such as that of a chime of opening.\n   Each creature in the area where the fortress appears must make a DC 15 Dexterity saving throw, taking 10d10 bludgeoning damage on a failed save, or half as much damage on a successful one. In either case, the creature is pushed to an unoccupied space outside but next to the fortress. Objects in the area that aren't being worn or carried take this damage and are pushed automatically.\n   The tower is made of adamantine, and its magic prevents it from being tipped over. The roof, the door, and the walls each have 100 hit points, immunity to damage from nonmagical weapons excluding siege weapons, and resistance to all other damage. Only a Wish spell can repair the fortress (this use of the spell counts as replicating a spell of 8th level or lower). Each casting of Wish causes the roof, the door, or one wall to regain 50 hit points.",
		action : [["action", ""]],
		toNotesPage : [{
			name : "Fortress Details",
			note : [
				"As an action I can place this 1-inch metal cube on the ground and speak its command word. The cube rapidly grows into a fortress that remains until I use an action to speak the command word that dismisses it, which works only if the fortress is empty.",
				"The fortress is a square tower, 20 feet on a side and 30 feet high, with arrow slits on all sides and a battlement atop it. Its interior is divided into two floors. with a ladder running along one wall to connect them. The ladder ends at a trapdoor leading to the roof.",
				"When activated, the tower has a small door on the side facing me. The door opens only at my command, which I can speak as a bonus action. It is immune to the Knock spell and similar magic (e.g., a Chime of Opening).",
				"Each creature in the area where the fortress appears must make a DC 15 Dex save or take 10d10 bludgeoning damage (half damage on a success). In either case, the creature is pushed to an unoccupied space outside but next to the fortress. Objects in the area that aren't being worn or carried take this damage and are pushed automatically.",
				"The tower is made of adamantine, and its magic prevents it from being tipped over. The roof, the door, and the walls each have 100 hit points, immunity to damage from nonmagical weapons excluding siege weapons, and resistance to all other damage. Only a Wish spell can repair the fortress (this use of the spell counts as replicating a spell of 8th level or lower). Each casting of Wish causes the roof, the door, or one wall to regain 50 hit points."
			]
		}]
	},
	"dagger of venom" : {
		name : "Dagger of Venom",
		source : [["SRD", 215], ["D", 161]],
		type : "weapon (dagger)",
		rarity : "rare",
		magicItemTable : "G",
		description : "This magical dagger adds a +1 bonus to attack and damage rolls made with it. As an action once per dawn, I can have the blade coat itself with thick, black poison, lasting 1 min. While it is coated, the first creature hit must make a DC 15 Con save or take 2d10 poison damage and become poisoned for 1 min.",
		descriptionFull : "You gain a +1 bonus to attack and damage rolls made with this magic weapon.\n   You can use an action to cause thick, black poison to coat the blade. The poison remains for 1 minute or until an attack using this weapon hits a creature. That creature must succeed on a DC 15 Constitution saving throw or take 2d10 poison damage and become poisoned for 1 minute. The dagger can't be used this way again until the next dawn.",
		weight : 1,
		usages : 1,
		recovery : "dawn",
		weaponsAdd : ["Dagger of Venom"],
		weaponOptions : {
			baseWeapon : "dagger",
			regExpSearch : /^(?=.*dagger)(?=.*venom).*$/i,
			name : "Dagger of Venom",
			source : [["SRD", 215], ["D", 161]],
			description : "Finesse, light, thrown; If coated, DC 15 Con save or +2d10 poison damage \u0026 1 min poisoned",
			modifiers : [1, 1]
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
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/dancing/i).test(v.WeaponTextName)) {
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
	"deck of illusions" : {
		name : "Deck of Illusions",
		source : [["SRD", 216], ["D", 161]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "As an action, I can draw a card at random from this deck and throw it on the ground within 30 ft. An illusion, determined by the type of card, forms over the thrown card and remains until dispelled. While I'm within 120 ft of it, I can use an action to move it within 30 ft of the card. See Notes page for more details.",
		descriptionFull : [
			"This box contains a set of parchment cards. A full deck has 34 cards. A deck found as treasure is usually missing 1d20-1 cards.",
			"The magic of the deck functions only if cards are drawn at random (you can use an altered deck of playing cards to simulate the deck). You can use an action to draw a card at random from the deck and throw it to the ground at a point within 30 feet of you.",
			"An illusion of one or more creatures forms over the thrown card and remains until dispelled. An illusory creature appears real, of the appropriate size, and behaves as if it were a real creature, except that it can do no harm. While you are within 120 feet of the illusory creature and can see it, you can use an action to move it magically anywhere within 30 feet of its card. Any physical interaction with the illusory creature reveals it to be an illusion, because objects pass through it. Someone who uses an action to visually inspect the creature identifies it as illusory with a successful DC 15 Intelligence (Investigation) check. The creature then appears translucent.",
			"The illusion lasts until its card is moved or the illusion is dispelled. When the illusion ends, the image on its card disappears, and that card can't be used again.\n",
			toUni("1d34\tPlaying Card\tIllusion"),
			"  1\tAce of hearts\tRed dragon",
			"  2\tKing of hearts\tKnight and four guards",
			"  3\tQueen of hearts\tSuccubus/Incubus",
			"  4\tJack of hearts\tDruid",
			"  5\tTen of hearts\tCloud giant",
			"  6\tNine of hearts\tEttin",
			"  7\tEight of hearts\tBugbear",
			"  8\tTwo of hearts\tGoblin",
			"  9\tAce of diamonds\tBeholder",
			"  10\tKing of diamonds\tArchmage and mage apprentice",
			"  11\tQueen diamonds\tNight hag",
			"  12\tJack of diamonds\tAssassin",
			"  13\tTen of diamonds\tFire giant",
			"  14\tNine of diamonds\tOgre mage",
			"  15\tEight of diamonds\tGnoll",
			"  16\tTwo of diamonds\tKobold",
			"  17\tAce of spades\tLich",
			"  18\tKing of spades\tPriest and two acolytes",
			"  19\tQueen of spades\tMedusa",
			"  20\tJack of spades\tVeteran",
			"  21\tTen of spades\tFrost giant",
			"  22\tNine of spades\tTroll",
			"  23\tEight of spades\tHobgoblin",
			"  24\tTwo of spades\tGoblin",
			"  25\tAce of clubs\tIron golem",
			"  26\tKing of clubs\tBandit captain and three bandits",
			"  27\tQueen of clubs\tErinyes",
			"  28\tJack of clubs\tBerserker",
			"  29\tTen of clubs\tHill giant",
			"  30\tNine of clubs\tOgre",
			"  31\tEight of clubs\tOrc",
			"  32\tTwo of clubs\tKobold",
			"33-34\tJoker (2)   \tYou (the deck's owner)"
		].join("\n"),
		toNotesPage : [{
			name : "Cards and Their Effects",
			note : [
				"This box contains a set of parchment cards. A full deck has 34 cards. A deck found as treasure is usually missing 1d20-1 cards.",
				"The magic of the deck functions only if cards are drawn at random. I can use an action to draw a card at random from the deck and throw it to the ground at a point within 30 ft of me.",
				"An illusion of one or more creatures forms over the thrown card and remains until dispelled. An illusory creature appears real, of the appropriate size, and behaves as if it were a real creature, except that it can do no harm. While I am within 120 ft of the illusory creature and can see it, I can use an action to move it magically anywhere within 30 ft of its card. Any physical interaction with the illusory creature reveals it to be an illusion, because objects pass through it. Someone who uses an action to visually inspect the creature identifies it as illusory with a successful DC 15 Intelligence (Investigation) check. The creature then appears translucent.",
				"The illusion lasts until its card is moved or the illusion is dispelled. When the illusion ends, the image on its card disappears, and that card can't be used again.\n",
				"1d34\tPLAYING CARD\tILLUSION",
				"  1\tAce of hearts\tRed dragon",
				"  2\tKing of hearts\tKnight and four guards",
				"  3\tQueen of hearts\tSuccubus/Incubus",
				"  4\tJack of hearts\tDruid",
				"  5\tTen of hearts\tCloud giant",
				"  6\tNine of hearts\tEttin",
				"  7\tEight of hearts\tBugbear",
				"  8\tTwo of hearts\tGoblin",
				"  9\tAce of diamonds\tBeholder",
				"  10\tKing of diamonds\tArchmage and mage apprentice",
				"  11\tQueen diamonds\tNight hag",
				"  12\tJack of diamonds\tAssassin",
				"  13\tTen of diamonds\tFire giant",
				"  14\tNine of diamonds\tOgre mage",
				"  15\tEight of diamonds\tGnoll",
				"  16\tTwo of diamonds\tKobold",
				"  17\tAce of spades\tLich",
				"  18\tKing of spades\tPriest and two acolytes",
				"  19\tQueen of spades\tMedusa",
				"  20\tJack of spades\tVeteran",
				"  21\tTen of spades\tFrost giant",
				"  22\tNine of spades\tTroll",
				"  23\tEight of spades\tHobgoblin",
				"  24\tTwo of spades\tGoblin",
				"  25\tAce of clubs \tIron golem",
				"  26\tKing of clubs\tBandit captain and three bandits",
				"  27\tQueen of clubs\tErinyes",
				"  28\tJack of clubs\tBerserker",
				"  29\tTen of clubs \tHill giant",
				"  30\tNine of clubs\tOgre",
				"  31\tEight of clubs\tOrc",
				"  32\tTwo of clubs \tKobold",
				"33-34\tJoker (2)\t\tYou (the deck's owner)"
			].join("\n")
		}]
	},
	"deck of many things" : { // contains contributions by Larry Hoy
		name : "Deck of Many Things",
		source : [["SRD", 216], ["D", 162]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		notLegalAL : true,
		description : "Before drawing cards from this deck, I must declare how many I wish to draw and then draw that number randomly. Any cards drawn in excess have no effect. When a card is drawn, its magic takes effect, it fades from existence, and, unless the card is the Fool or the Jester, reappears in the deck. See Notes page.",
		descriptionFull : "Usually found in a box or pouch, this deck contains a number of cards made of ivory or vellum. Most (75 percent) of these decks have only thirteen cards, but the rest have twenty-two.\n   Before you draw a card, you must declare how many cards you intend to draw and then draw them randomly (you can use an altered deck of playing cards to simulate the deck). Any cards drawn in excess of this number have no effect. Otherwise, as soon as you draw a card from the deck, its magic takes effect. You must draw each card no more than 1 hour after the previous draw. If you fail to draw the chosen number, the remaining number of cards fly from the deck on their own and take effect all at once.\n   Once a card is drawn, it fades from existence. Unless the card is the Fool or the Jester, the card reappears in the deck, making it possible to draw the same card twice.\n   " + toUni("A Question of Enmity") + ". Two of the cards in a deck of many things can earn a character the enmity of another being. With the Flames card, the enmity is overt. The character should experience the devil's malevolent efforts on multiple occasions. Seeking out the fiend shouldn't be a simple task, and the adventurer should clash with the devil's allies and followers a few times before being able to confront the devil itself.\n   In the case of the Rogue card, the enmity is secret and should come from someone thought to be a friend or an ally. As Dungeon Master, you should wait for a dramatically appropriate moment to reveal this enmity, leaving the adventurer guessing who is likely to become a betrayer.\n\n" + toUni("1d22\tPlaying Card\tCard") + "\n   1\tAce of diamonds\tVizier*\n   2\tKing of diamonds\tSun\n   3\tQueen diamonds\tMoon\n   4\tJack of diamonds\tStar\n   5\tTwo of diamonds\tComet*\n   6\tAce of hearts\tThe Fates*\n   7\tKing of hearts\tThrone\n   8\tQueen of hearts\tKey\n   9\tJack of hearts\tKnight\n   10\tTwo of hearts\tGem*\n   11\tAce of clubs\tTalons*\n   12\tKing of clubs\tThe Void\n   13\tQueen of clubs\tFlames\n   14\tJack of clubs\tSkull\n   15\tTwo of clubs\tIdiot*\n   16\tAce of spades\tDonjon*\n   17\tKing of spades\tRuin\n   18\tQueen of spades\tEuryale\n   19\tJack of spades\tRogue\n   20\tTwo of spades\tBalance*\n   21\tJoker (with TM)\tFool*\n   22\tJoker (no TM)\tJester\n\n   * Found only in a deck with twenty-two cards\n" + [
			toUni("Balance") + ". Your mind suffers a wrenching alteration, causing your alignment to change. Lawful becomes chaotic, good becomes evil, and vice versa. If you are true neutral or unaligned, this card has no effect on you.",
			toUni("Comet") + ". If you single-handedly defeat the next hostile monster or group of monsters you encounter, you gain experience points enough to gain one level. Otherwise, this card has no effect.",
			toUni("Donjon") + ". You disappear and become entombed in a state of suspended animation in an extradimensional sphere. Everything you were wearing and carrying stays behind in the space you occupied when you disappeared. You remain imprisoned until you are found and removed from the sphere. You can't be located by any divination magic, but a Wish spell can reveal the location of your prison. You draw no more cards.",
			toUni("Euryale") + ". The card's medusa-like visage curses you. You take a -2 penalty on saving throws while cursed in this way. Only a god or the magic of The Fates card can end this curse.",
			toUni("The Fates") + ". Reality's fabric unravels and spins anew, allowing you to avoid or erase one event as if it never happened. You can use the card's magic as soon as you draw the card or at any other time before you die.",
			toUni("Flames") + ". A powerful devil becomes your enemy. The devil seeks your ruin and plagues your life, savoring your suffering before attempting to slay you. This enmity lasts until either you or the devil dies.",
			toUni("Fool") + ". You lose 10,000 XP, discard this card, and draw from the deck again, counting both draws as one of your declared draws. If losing that much XP would cause you to lose a level, you instead lose an amount that leaves you with just enough XP to keep your level.",
			toUni("Gem") + ". Twenty-five pieces of jewelry worth 2,000 gp each or fifty gems worth 1,000 gp each appear at your feet.",
			toUni("Idiot") + ". Permanently reduce your Intelligence by 1d4+1 (to a minimum score of 1). You can draw one additional card beyond your declared draws.",
			toUni("Jester") + ". You gain 10,000 XP, or you can draw two additional cards beyond your declared draws.",
			toUni("Key") + ". A rare or rarer magic weapon with which you are proficient appears in your hands. The DM chooses the weapon.",
			toUni("Knight") + ". You gain the service of a 4th-level fighter who appears in a space you choose within 30 feet of you. The fighter is of the same race as you and serves you loyally until death, believing the fates have drawn him or her to you. You control this character.",
			toUni("Moon") + ". You are granted the ability to cast the Wish spell 1d3 times.",
			toUni("Rogue") + ". A nonplayer character of the DM's choice becomes hostile toward you. The identity of your new enemy isn't known until the NPC or someone else reveals it. Nothing less than a Wish spell or divine intervention can end the NPC's hostility toward you.",
			toUni("Ruin") + ". All forms of wealth that you carry or own, other than magic items, are lost to you. Portable property vanishes. Businesses, buildings, and land you own are lost in a way that alters reality the least. Any documentation that proves you should own something lost to this card also disappears.",
			toUni("Skull") + ". You summon an avatar of death-a ghostly humanoid skeleton clad in a tattered black robe and carrying a spectral scythe. It appears in a space of the DM's choice within 10 feet of you and attacks you, warning all others that you must win the battle alone. The avatar fights until you die or it drops to 0 hit points, whereupon it disappears. If anyone tries to help you, the helper summons its own avatar of death. A creature slain by an avatar of death can't be restored to life.",
			toUni("Star") + ". Increase one of your ability scores by 2. The score can exceed 20 but can't exceed 24.",
			toUni("Sun") + ". You gain 50,000 XP, and a wondrous item (which the DM determines randomly) appears in your hands.",
			toUni("Talons") + ". Every magic item you wear or carry disintegrates. Artifacts in your possession aren't destroyed but do vanish.",
			toUni("Throne") + ". You gain proficiency in the Persuasion skill, and you double your proficiency bonus on checks made with that skill. In addition, you gain rightful ownership of a small keep somewhere in the world. However, the keep is currently in the hands of monsters, which you must clear out before you can claim the keep as yours.",
			toUni("Vizier") + ". At any time you choose within one year of drawing this card, you can ask a question in meditation and mentally receive a truthful answer to that question. Besides information, the answer helps you solve a puzzling problem or other dilemma. In other words, the knowledge comes with wisdom on how to apply it.",
			toUni("The Void") + ". This black card spells disaster. Your soul is drawn from your body and contained in an object in a place of the DM's choice. One or more powerful beings guard the place. While your soul is trapped in this way, your body is incapacitated. A Wish spell can't restore your soul, but the spell reveals the location of the object that holds it. You draw no more cards."
		].join("\n \u2022 "),
		toNotesPage : [{
			name : "Cards and Their Effects",
			note : [
				"Usually found in a box or pouch, this deck contains either 13 (75%) or 22 (25%) cards made of ivory or vellum.",
				"Before I draw a card, I must declare how many cards I intend to draw and then draw them randomly. Any cards drawn in excess of this number have no effect. Otherwise, as soon as I draw a card from the deck, its magic takes effect. I must draw each card no more than 1 hour after the previous draw. If I fail to draw the chosen number, the remaining number of cards fly from the deck on their own and take effect all at once.",
				"Once a card is drawn, it fades from existence. Unless the card is the Fool or the Jester, the card reappears in the deck, making it possible to draw the same card twice.\n\n1d22\tPLAYING CARD\tCARD",
				"1\tAce of diamonds\tVizier*",
				"2\tKing of diamonds\tSun",
				"3\tQueen of diamonds\tMoon",
				"4\tJack of diamonds\tStar",
				"5\tTwo of diamonds\tComet*",
				"6\tAce of hearts\tThe Fates*",
				"7\tKing of hearts\tThrone",
				"8\tQueen of hearts\tKey",
				"9\tJack of hearts\tKnight",
				"10\tTwo of hearts\tGem*",
				"11\tAce of clubs  \tTalons*",
				"12\tKing of clubs\tThe Void",
				"13\tQueen of clubs\tFlames",
				"14\tJack of clubs\tSkull",
				"15\tTwo of clubs  \tIdiot*",
				"16\tAce of spades\tDonjon*",
				"17\tKing of spades\tRuin",
				"18\tQueen of spades\tEuryale",
				"19\tJack of spades\tRogue",
				"20\tTwo of spades\tBalance*",
				"21\tJoker (with TM)\tFool*",
				"22\tJoker (no TM)\tJester\n* Found only in a deck with twenty-two cards\n",
				"\u2022 Balance. My mind suffers a wrenching alteration, causing my alignment to change. Lawful to chaotic, good to evil, and vice versa.",
				"\u2022 Comet. If I single-handedly defeat the next hostile monster/group of monsters I encounter, I gain enough XP to gain one level.",
				"\u2022 Donjon. I disappear into a state of suspended animation in an extradimensional sphere. Everything I had stays behind. Wish can reveal my location. I draw no more cards.",
				"\u2022 Euryale. This card's medusa-like visage curses me with a -2 penalty on saving throws. Only a god or the magic of The Fates card can end this curse.",
				"\u2022 The Fates. Reality's fabric unravels and spins anew, allowing me to avoid or erase one event. I can use the card's magic any one time before I die.",
				"\u2022 Flames. A powerful devil becomes my enemy until one of us dies. It seeks my ruin and plagues my life, savoring my suffering before attempting to slay me.",
				"\u2022 Fool. I lose up to 10,000 XP (no level loss), discard this card, and draw again.",
				"\u2022 Gem. 25 pieces of jewelry (2000 gp each) or 50 gems (1000 gp each) appear at my feet.",
				"\u2022 Idiot. Permanently reduce my Intelligence by 1d4+1 (min of 1). I can draw one additional card.",
				"\u2022 Jester. I gain 10,000 XP or I can draw two extra cards.",
				"\u2022 Key. A rare or rarer magic weapon with which I'm proficient appears in my hands.",
				"\u2022 Knight. A 4th-level fighter of my race appears within 30 ft, serving me loyally until death, believing the fates have drawn him/her to me (I control this NPC).",
				"\u2022 Moon. I am granted the ability to cast the Wish spell 1d3 times.",
				"\u2022 Rogue. An NPC becomes hostile toward me (Wish or divine intervention ends).",
				"\u2022 Ruin. All forms of wealth that I carry or own, other than magic items, are lost. Businesses, buildings, and land I own are lost in a way that alters reality the least.",
				"\u2022 Skull. I summon a ghostly skeleton with tattered robes and a spectral scythe within 10 ft. It attacks me, warning all others that I must win the battle alone.",
				"\u2022 Star. Increase one of my ability scores by 2 (can't exceed 24).",
				"\u2022 Sun. I gain 50,000 XP and a wondrous item appears in my hands.",
				"\u2022 Talons. Every magic item I wear or carry disintegrates. Artifacts in my possession aren't destroyed but do vanish.",
				"\u2022 Throne. I gain expertise in Persuasion and rightful ownership of a small keep somewhere in the world (currently occupied by monsters).",
				"\u2022 Vizier. Within one year I can ask one question in meditation and receive a truthful answer. This knowledge comes with the wisdom on how to apply it.",
				"\u2022 The Void. This black card spells disaster. My soul is contained in an object, powerful beings guard it, and my body is incapacitated. Wish can reveal my location. I draw no more cards."
			]
		}]
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
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/defender/i).test(v.WeaponTextName)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + '+3 bonus can be used for AC instead';
					}
				},
				'If I include the word "Defender" in a the name of a sword, it will be treated as the magic weapon Defender. It has +3 to hit and damage, but this bonus can be lowered and added to AC instead. Decide to do so with the first attack on your turn.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/defender/i).test(v.WeaponTextName)) {
						output.magic = v.thisWeapon[1] + 3;
					}
				}, ''
			]
		}
	},
	"demon armor" : { // contains contributions by Larry Hoy
		name : "Demon Armor",
		source : [["SRD", 218], ["D", 165]],
		type : "armor (plate)",
		rarity : "very rare",
		magicItemTable : "H",
		description : "While wearing this plate armor, I have +1 AC, know Abyssal, and can use its clawed gauntlets to make unarmed strikes that deal 1d8 slashing damage with a +1 bonus to hit and damage. I have disadv. on attacks and on saves vs. demons, their spells and abilities. I can't doff it without Remove Curse or similar magic.",
		descriptionFull : "While wearing this armor, you gain a +1 bonus to AC, and you can understand and speak Abyssal. In addition, the armor's clawed gauntlets turn unarmed strikes with your hands into magic weapons that deal slashing damage, with a +1 bonus to attack and damage rolls and a damage die of 1d8.\n   " + toUni("Curse") + ". Once you don this cursed armor, you can't doff it unless you are targeted by the Remove Curse spell or similar magic. While wearing the armor, you have disadvantage on attack rolls against demons and on saving throws against their spells and special abilities.",
		attunement : true,
		weight : 65,
		cursed : true,
		languageProfs : ["Abyssal"],
		savetxt : { text : ["Disadv. on saves vs. demons"] },
		armorAdd : "Demon Armor",
		armorOptions : [{
			regExpSearch : /^(?=.*demon)(?=.*armor).*$/i,
			name : "Demon Armor",
			source: [["SRD", 218], ["D", 165]],
			type : "heavy",
			ac : 19,
			stealthdis : true,
			weight : 65,
			strReq : 15
		}],
		weaponsAdd: ["Demon Armor Claws"],
		weaponOptions: [{
			baseWeapon : "unarmed strike",
			regExpSearch : /^(?=.*demon)(?=.*armor)(?=.*claws).*$/i,
			name : "Demon Armor Claws",
			source: [["SRD", 218], ["D", 165]],
			damage : [1, 8, "slashing"],
			modifiers : [1, 1]
		}]
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
		choicesNotInMenu : true,
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
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*dragon)(?=.*slayer).*$/i).test(v.WeaponTextName)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + '+3d6 damage vs. dragons';
					}
				},
				'If I include the words "Dragon Slayer" in a the name of a sword, it will be treated as the magic weapon Dragon Slayer. It has +1 to hit and damage and deals +3d6 damage to creatures with the dragon type.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*dragon)(?=.*slayer).*$/i).test(v.WeaponTextName)) {
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
	"dust of dryness" : {
		name : "Dust of Dryness",
		source : [["SRD", 219], ["D", 166]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "As an action, I can sprinkle a pinch of dust over water, turning a 15-ft cube into a floating, marble-sized pellet. As an action, someone can smash the pellet against a hard surface, destroying it and releasing the absorbed water. A pinch of dust does 10d6 necrotic damage to a water elemental, Con save DC 13 halves.",
		descriptionFull : "This small packet contains 1d6+4 pinches of dust. You can use an action to sprinkle a pinch of it over water. The dust turns a cube of water 15 feet on a side into one marble-sized pellet, which floats or rests near where the dust was sprinkled. The pellet's weight is negligible.\n   Someone can use an action to smash the pellet against a hard surface, causing the pellet to shatter and release the water the dust absorbed. Doing so ends that pellet's magic.\n   An elemental composed mostly of water that is exposed to a pinch of the dust must make a DC 13 Constitution saving throw, taking 10d6 necrotic damage on a failed save, or half as much damage on a successful one.",
		usages : "1d6+4",
		recovery : "Never"
	},
	"dust of sneezing and choking" : {
		name : "Dust of Sneezing and Choking",
		source : [["SRD", 219], ["D", 166]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "Once as an action, I can throw this dust into the air, causing me and all creatures within 30 ft that need to breathe to make a DC 15 Con save or start sneezing uncontrollably and be unable to breathe, thus becoming incapacitated and suffocating. Those affected can repeat their save at the end of each of their turns.",
		descriptionFull : "Found in a small container, this powder resembles very fine sand. It appears to be dust of disappearance, and an Identify spell reveals it to be such. There is enough of it for one use.\n   When you use an action to throw a handful of the dust into the air, you and each creature that needs to breathe within 30 feet of you must succeed on a DC 15 Constitution saving throw or become unable to breathe while sneezing uncontrollably. A creature affected in this way is incapacitated and suffocating. As long as it is conscious, a creature can repeat the saving throw at the end of each of its turns, ending the effect on it on a success. The Lesser Restoration spell can also end the effect on a creature."
	},
	"dwarven plate" : {
		name : "Dwarven Plate",
		source : [["SRD", 220], ["D", 167]],
		type : "armor (plate)",
		rarity : "very rare",
		magicItemTable : "H",
		description : "While wearing this plate armor, I gain a +2 bonus to AC. In addition, if an effect moves me against my will along the ground, I can use my reaction to reduce the distance I am moved by up to 10 ft.",
		descriptionFull : "While wearing this armor, you gain a +2 bonus to AC. In addition, if an effect moves you against your will along the ground, you can use your reaction to reduce the distance you are moved by up to 10 feet.",
		weight : 65,
		action : [["reaction", ""]],
		armorAdd : "Dwarven Plate",
		armorOptions : [{
			regExpSearch : /^(?=.*dwarven)(?=.*plate).*$/i,
			name : "Dwarven Plate",
			source : [["SRD", 220], ["D", 167]],
			type : "heavy",
			ac : 20,
			stealthdis : true,
			weight : 65,
			strReq : 15
		}]
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
	"elven chain" : {
		name : "Elven Chain",
		source : [["SRD", 220], ["D", 168]],
		type : "armor (chain shirt)",
		rarity : "rare",
		magicItemTable : "G",
		description : "I gain a +1 bonus to AC while I wear this chain shirt. I am considered proficient with this armor even if I lack proficiency with medium armor.",
		descriptionFull : "You gain a +1 bonus to AC while you wear this armor. You are considered proficient with this armor even if you lack proficiency with medium armor.",
		weight : 20,
		armorAdd : "Elven Chain",
		armorOptions : [{
			regExpSearch : /^(?=.*elven)(?=.*chain).*$/i,
			name : "Elven Chain",
			source : [["SRD", 220], ["D", 168]],
			type : "medium",
			ac : 14,
			weight : 20
		}]
	},
	"eversmoking bottle" : {
		name : "Eversmoking Bottle",
		source : [["SRD", 220], ["D", 168]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "When I use an action to remove the stopper, a cloud of thick heavily obscuring smoke flows out of the bottle in a 60-ft radius, increasing by 10 ft for each minute the bottle is open, until it reaches 120 ft. Closing it requires me to speak the command word as an action. Once closed, the cloud disperses after 10 min.",
		descriptionFull : "Smoke leaks from the lead-stoppered mouth of this brass bottle, which weighs 1 pound. When you use an action to remove the stopper, a cloud of thick smoke pours out in a 60-foot radius from the bottle. The cloud's area is heavily obscured. Each minute the bottle remains open and within the cloud, the radius increases by 10 feet until it reaches its maximum radius of 120 feet.\n   The cloud persists as long as the bottle is open. Closing the bottle requires you to speak its command word as an action. Once the bottle is closed, the cloud disperses after 10 minutes. A moderate wind (11 to 20 miles per hour) can also disperse the smoke after 1 minute, and a strong wind (21 or more miles per hour) can do so after 1 round.",
		weight : 1,
		action : [["action", " (open/close)"]]
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
	"figurine of wondrous power" : { // contains contributions by Larry Hoy
		name: "Figurine of Wondrous Power",
		source: [["SRD", 221], ["D", 169]],
		type: "wondrous item",
		description: "As an action, I can speak the command word and throw one or more statuettes to an unoccupied space within 60 ft where it becomes a specific creature for a certain amount of time. It is friendly, understands my languages, and obeys my commands.",
		descriptionFull: "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the figurine's description.",
		action : [["action", ""]],
		choices : ["Bronze Griffon", "Ebony Fly", "Golden Lions", "Ivory Goats", "Marble Elephant", "Obsidian Steed", "Onyx Dog", "Serpentine Owl", "Silver Raven"],
		"bronze griffon" : {
			rarity : "rare",
			magicItemTable : "G",
			description: "As an action, I can speak the command word and throw this bronze statuette to an unoccupied space within 60 ft, where it becomes a griffon for up to 6 hours, until I use the command word again, or it reaches 0 HP. It is friendly, understands my languages, and obeys my commands.",
			descriptionLong: "As an action, I can speak the command word and throw this bronze statuette of a griffon rampant to an unoccupied space within 60 ft, where it becomes a griffon for up to 6 hours, until I use an action to repeat the command word, or it reaches 0 HP. It is friendly to me and my allies, understands my languages, and obeys my spoken commands. If I issue no commands, the creature defends itself but takes no other actions. When it reverts back to a figurine, it can't be used again until 5 days have passed.",
			descriptionFull: "This figurine of wondrous power is a bronze statuette of a griffon rampant, small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living griffon. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for 6 hours. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until 5 days have passed.",
			usages : 1,
			recovery : "5 days"
		},
		"ebony fly" : {
			rarity: "rare",
			magicItemTable : "G",
			description: "As an action, I can speak the command word and throw this statuette to an unoccupied space within 60 ft, where it becomes a giant fly for up to 12 hours, until I use the command word again, or it reaches 0 HP. It is friendly, understands my languages, obeys my commands, and can be ridden as a mount.",
			descriptionLong: "As an action, I can speak the command word and throw this ebony statuette of a horsefly to an unoccupied space within 60 ft, where it becomes a giant fly for up to 12 hours, until I use an action to repeat the command word, or it reaches 0 HP. It is friendly to me and my allies, understands my languages, obeys my spoken commands, and can be ridden as a mount. If I issue no commands, the creature defends itself but takes no other actions. When it reverts back to a figurine, it can't be used again until 2 days have passed.",
			descriptionFull : "This figurine of wondrous power is an ebony statuette carved in the likeness of a horsefly, small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living giant fly and can be ridden as a mount. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for 12 hours. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until 2 days have passed.",
			usages : 1,
			recovery : "2 days"
		},
		"golden lions" : {
			rarity : "rare",
			magicItemTable : "G",
			description: "As an action, I can speak the command word and throw one or both of these gold statuettes to an unoccupied space within 60 ft, where each becomes a lion for up to 1 hour, until I use the command word again, or it reaches 0 HP. They are friendly, understand my languages, and obey my commands.",
			descriptionLong: "As an action, I can speak the command word and throw one or both of these gold statuettes of a lion to an unoccupied space within 60 ft, where each becomes a lion for up to 1 hour, until I use an action to repeat the command word, or it reaches 0 HP. They are friendly to me and my allies, understand my languages, and obey my spoken commands. If I issue no commands, they defend themselves but takes no other actions. When a lion reverts back to a figurine, that figurine can't be used again until 7 days have passed.",
			descriptionFull : "This figurine of wondrous power is a pair of gold statuettes of lions, small enough to fit in a pocket. If you use an action to speak the command word and throw one or both of the figurines to a point on the ground within 60 feet of you, each figurine becomes a living lion. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for 1 hour. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until 7 days have passed.",
			usages : 2,
			recovery : "7 days"
		},
		"ivory goats" : {
			rarity : "rare",
			magicItemTable : "G",
			description: "As an action, I can speak the command word and throw one or more of these 3 ivory statuettes to an unoccupied space within 60 ft, where each becomes a creature, until I use the command word again, or it reaches 0 HP. They are friendly, understands my languages, and obeys my commands. See Notes page.",
			descriptionLong: "As an action, I can speak the command word and throw one or more of these three ivory statuettes of goats to an unoccupied space within 60 ft, where each becomes a creature, until I use an action to repeat the command word, or it reaches 0 HP. They are friendly to me and my allies, understands my languages, and obeys my spoken commands. If I issue no commands, the creature defends itself but takes no other actions. When it reverts back to a figurine, it can't be used again until a certain amount of time has passed. See Notes page for details about each of the statuettes.",
			descriptionFull: "This figurine of wondrous power is three ivory statuettes of goats, small enough to fit in a pocket. Each goat looks unique and functions differently from the others. If you use an action to speak the command word and throw one or more of the figurines to a point on the ground within 60 feet of you, each figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the figurine's description." +
			"\n \u2022 The goat of traveling can become a Large goat with the same statistics as a riding horse. It has 24 charges, and each hour or portion thereof it spends in beast form costs 1 charge. While it has charges, you can use it as often as you wish. When it runs out of charges, it reverts to a figurine and can't be used again until 7 days have passed, when it regains all its charges." +
			"\n \u2022 The goat of travail becomes a giant goat for up to 3 hours. Once it has been used, it can't be used again until 30 days have passed." +
			"\n \u2022 The goat of terror becomes a giant goat for up to 3 hours. The goat can't attack, but you can remove its horns and use them as weapons. One horn becomes a +1 lance, and the other becomes a +2 longsword. Removing a horn requires an action, and the weapons disappear and the horns return when the goat reverts to figurine form. In addition, the goat radiates a 30-foot-radius aura of terror while you are riding it. Any creature hostile to you that starts its turn in the aura must succeed on a DC 15 Wisdom saving throw or be frightened of the goat for 1 minute, or until the goat reverts to figurine form. The frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. Once it successfully saves against the effect, a creature is immune to the goat's aura for the next 24 hours. Once the figurine has been used, it can't be used again until 15 days have passed.",
			extraLimitedFeatures : [{
				name : "Figurine of Wondrous Power [Ivory Goat of Traveling]",
				usages : 24,
				recovery : "7 days"
			}, {
				name : "Figurine of Wondrous Power [Ivory Goat of Travail]",
				usages : 1,
				recovery : "30 days"
			}, {
				name : "Figurine of Wondrous Power [Ivory Goat of Terror]",
				usages : 1,
				recovery : "15 days"
			}],
			toNotesPage : [{
				name : "Ivory Goat Details",
				note : [
					"The goat of traveling can become a Large goat with the same statistics as a riding horse. It has 24 charges, and each hour or portion thereof it spends in beast form costs 1 charge. While it has charges, you can use it as often as you wish. When it runs out of charges, it reverts to a figurine and can't be used again until 7 days have passed, when it regains all its charges.",
					"The goat of travail becomes a giant goat for up to 3 hours. Once it has been used, it can't be used again until 30 days have passed.",
					"The goat of terror becomes a giant goat for up to 3 hours. The goat can't attack, but I can remove its horns and use them as weapons. One horn becomes a +1 lance, and the other becomes a +2 longsword. Removing a horn requires an action, and the weapons disappear and the horns return when the goat reverts to figurine form. In addition, the goat radiates a 30-ft radius aura of terror while I am riding it. Any creature hostile to me that starts its turn in the aura must succeed on a DC 15 Wisdom saving throw or be frightened of the goat for 1 minute, or until the goat reverts to figurine form. The frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. Once it successfully saves against the effect, a creature is immune to the goat's aura for the next 24 hours. Once the figurine has been used, it can't be used again until 15 days have passed."
				]
			}],
			weaponsAdd : ["Lance +1, Ivory Goat Horn", "Longsword +2, Ivory Goat Horn"],
			weaponOptions : [{
				baseWeapon : "lance",
				regExpSearch : /^(?=.*ivory)(?=.*goat)(?=.*lance).*$/i,
				name : "Lance +1, Ivory Goat Horn",
				source : [["SRD", 222], ["D", 170]]
			}, {
				baseWeapon : "longsword",
				regExpSearch : /^(?=.*ivory)(?=.*goat)(?=.*longsword).*$/i,
				name : "Longsword +2, Ivory Goat Horn",
				source : [["SRD", 222], ["D", 170]]
			}]
		},
		"marble elephant" : {
			rarity : "rare",
			magicItemTable : "G",
			description: "As an action, I can speak the command word and throw this marble statuette to an unoccupied space within 60 ft, where it becomes a elephant for up to 24 hours, until I use the command word again, or it reaches 0 HP. It is friendly, understands my languages, and obeys my commands.",
			descriptionLong: "As an action, I can speak the command word and throw this marble statuette of about 4 inches high and long to an unoccupied space within 60 ft, where it becomes a elephant for up to 24 hours, until I use an action to repeat the command word, or it reaches 0 HP. It is friendly to me and my allies, understands my languages, and obeys my spoken commands. If I issue no commands, the creature defends itself but takes no other actions. When it reverts back to a figurine, it can't be used again until 7 days have passed.",
			descriptionFull: "This figurine of wondrous power is a marble statuette of about 4 inches high and long, small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living elephant. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for 24 hours. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until 7 days have passed.",
			usages : 1,
			recovery : "7 days"
		},
		"obsidian steed" : {
			rarity : "very rare",
			magicItemTable : "H",
			description: "As an action, I can speak the command word and throw this obsidian statuette to an unoccupied space within 60 ft, where it becomes a nightmare for up to 24 hours, until it reaches 0 HP, or I use the command word again. It is friendly, understands my languages, and obeys my commands. See Notes page.",
			descriptionLong: "As an action, I can speak the command word and throw this polished obsidian statuette of an horse to an unoccupied space within 60 ft, where it becomes a nightmare for up to 24 hours, until I use an action to repeat the command word, or it reaches 0 HP. It is friendly to me and my allies, understands my languages, and obeys my spoken commands. If I issue no commands, the creature defends itself but takes no other actions. It only fights to defend itself. When it reverts back to a figurine, it can't be used again until 5 days have passed. See Notes page for more details.",
			descriptionFull: "This figurine of wondrous power is a polished obsidian statuette of a horse, small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living nightmare. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for 24 hours. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until 5 days have passed." +
			"\n   The nightmare fights only to defend itself.\n   If you have a good alignment, the figurine has a 10% chance each time you use it to ignore your orders, including a command to revert to figurine form. If you mount the nightmare while it is ignoring your orders, you and the nightmare are instantly transported to a random location on the plane of Hades, where the nightmare reverts to figurine form.",
			usages : 1,
			recovery : "5 days",
			toNotesPage : [{
				name : "Obsidian Steed Details",
				note : "\n   If I have a good alignment, the figurine has a 10% chance each time I use it to ignore my orders, including a command to revert to figurine form. If I mount the nightmare while it is ignoring my orders, we are both instantly transported to a random location on the plane of Hades, where the nightmare reverts to figurine form."
			}]
		},
		"onyx dog" : {
			rarity : "rare",
			magicItemTable : "G",
			description: "As an action, I can speak the command word and throw this statuette to an unoccupied space within 60 ft, where it becomes a mastiff for up to 6 hours, until I use the command word again, or it reaches 0 HP. It has 60 ft darkvision, see invisible out to 60 ft, is friendly, understands me, and obeys my commands.",
			descriptionLong: "As an action, I can speak the command word and throw this onyx statuette to an unoccupied space within 60 ft, where it becomes a mastiff for up to 6 hours, until I use an action to repeat the command word, or it reaches 0 HP. It has Intelligence 8, speaks common, darkvision out to 60 ft and can see invisible creatures and objects out to that same range. It is friendly to me and my allies, understands my languages, and obeys my spoken commands. If I issue no commands, the creature defends itself but takes no other actions. When it reverts back to a figurine, it can't be used again until 7 days have passed.",
			descriptionFull: "This figurine of wondrous power is an onyx statuette of a dog, small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living mastiff. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The mastiff has an Intelligence of 8 and can speak Common. It also has darkvision out to a range of 60 feet and can see invisible creatures and objects within that range. It is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for 6 hours. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until 7 days have passed.",
			usages : 1,
			recovery : "7 days"
		},
		"serpentine owl" : {
			rarity : "rare",
			magicItemTable : "G",
			description: "As an action, I can speak the command word and throw this statuette to an unoccupied space within 60 ft, where it becomes a giant owl for up to 8 hours, until I use the command word again, or it reaches 0 HP. It is friendly, can convers telepathically with me, understands my languages, and obeys my commands.",
			descriptionLong: "As an action, I can speak the command word and throw this serpentine statuette to an unoccupied space within 60 ft, where it becomes a giant owl for up to 8 hours, until I use an action to repeat the command word, or it reaches 0 HP. It is friendly to me and my allies, understands my languages, and obeys my spoken commands. As long as it is on the same plane of existence, it can communicate telepathically with me. If I issue no commands, the creature defends itself but takes no other actions. When it reverts back to a figurine, it can't be used again until 2 days have passed.",
			descriptionFull: "This figurine of wondrous power is a serpentine statuette of an owl, small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living giant owl. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. It can telepathically communicate with you at any range if you and it are on the same plane of existence. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for 8 hours. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until 2 days have passed.",
			usages : 1,
			recovery : "2 days"
		},
		"silver raven" : {
			rarity : "uncommon",
			magicItemTable : "F",
			description: "As an action, I can speak the command word and throw this silver statuette to an unoccupied space within 60 ft, where it becomes a raven for up to 12 hours, until I use the command word again, or it reaches 0 HP. It is friendly, understands my languages, and obeys my commands.",
			descriptionLong: "As an action, I can speak the command word and throw this silver statuette to an unoccupied space within 60 ft, where it becomes a raven for up to 12 hours, until I use an action to repeat the command word, or it reaches 0 HP. It is friendly to me and my allies, understands my languages, and obeys my spoken commands. While in raven form, the figurine allows me to cast Animal Messenger on it at will. If I issue no commands, the creature defends itself but takes no other actions. When it reverts back to a figurine, it can't be used again until 2 days have passed.",
			descriptionFull: "This figurine of wondrous power is as sliver statuette of a raven, small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living raven. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for 12 hours. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until 2 days have passed.\n   While in raven form, the figurine allows you to cast the Animal Messenger spell on it at will.",
			usages : 1,
			recovery : "2 days",
			spellcastingBonus : {
				name : "At will",
				spells : ["animal messenger"],
				selection : ["animal messenger"],
				firstCol : "atwill"
			},
			spellChanges : {
				"animal messenger" : {
					description : "The raven delivers a 25 word message up to 50 miles away to chosen location and recipient",
					changes : "The spell can only affect the figurine."
				}
			}
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
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*flame)(?=.*tongue).*$/i).test(v.WeaponTextName)) {
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
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*frost)(?=.*brand).*$/i).test(v.WeaponTextName)) {
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
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier|axe/i).test(v.baseWeaponName) && (/^(?=.*giant)(?=.*slayer).*$/i).test(v.WeaponTextName)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + '+2d6 damage vs. giants; Giants DC 15 Str save or prone';
					}
				},
				'If I include the words "Giant Slayer" in a the name of a sword, it will be treated as the magic weapon Giant Slayer. It has +1 to hit and damage and when hitting a creatures with the giant type, it does +2d6 damage and the target has to make a DC 15 Strength save or be knocked prone.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/sword|scimitar|rapier|axe/i).test(v.baseWeaponName) && (/^(?=.*giant)(?=.*slayer).*$/i).test(v.WeaponTextName)) {
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
		vision : [["Darkvision", "fixed 60"], ["Darkvision", "+60"]]
	},
	"hammer of thunderbolts" : {
		name : "Hammer of Thunderbolts",
		source : [["SRD", 224], ["D", 173]],
		type : "weapon (maul)",
		rarity : "legendary",
		magicItemTable : "I",
		description : "This magical maul adds a +1 bonus to attack and damage rolls made with it. It has additional features when I'm attuned to it, which requires me to wear both a belt of giant strength and gauntlets of ogre power.",
		descriptionFull : "You gain a +1 bonus to attack and damage rolls made with this magic weapon.\n   " + toUni("Giant's Bane (Requires Attunement)") + ". You must be wearing a belt of giant strength (any variety) and gauntlets of ogre power to attune to this weapon. The attunement ends if you take off either of those items. While you are attuned to this weapon and holding it, your Strength score increases by 4 and can exceed 20, but not 30. When you roll a 20 on an attack roll made with this weapon against a giant, the giant must succeed on a DC 17 Constitution saving throw or die.\n   The hammer also has 5 charges. While attuned to it, you can expend 1 charge and make a ranged weapon attack with the hammer, hurling it as if it had the thrown property with a normal range of 20 feet and a long range of 60 feet. If the attack hits, the hammer unleashes a thunderclap audible out to 300 feet. The target and every creature within 30 feet of it must succeed on a DC 17 Constitution saving throw or be stunned until the end of your next turn. The hammer regains 1d4+1 expended charges daily at dawn.",
		weight : 10,
		selfChoosing : function () {
			// don't have to be attuned to the prereqs https://twitter.com/jeremyecrawford/status/948346891296653315
			return CurrentMagicItems.known.indexOf("belt of giant strength") !== -1 && CurrentMagicItems.known.indexOf("gauntlets of ogre power") !== -1 ? "attuned (requires Belt of Giant Strength and Gauntlets of Ogre Power)" : "not attuned";
		},
		choices : ["not attuned", "attuned (requires Belt of Giant Strength and Gauntlets of Ogre Power)"],
		"not attuned" : {
			description : "This magical maul adds a +1 bonus to attack and damage rolls made with it. It has additional features when I'm attuned to it, which requires me to wear both a belt of giant strength and gauntlets of ogre power.",
			weaponsAdd : ["Hammer of Thunderbolts"],
			weaponOptions : {
				baseWeapon : "maul",
				regExpSearch : /^(?=.*hammer)(?=.*thunderbolts).*$/i,
				name : "Hammer of Thunderbolts",
				source : [["SRD", 224], ["D", 173]],
				modifiers : [1, 1]
			}
		},
		"attuned (requires belt of giant strength and gauntlets of ogre power)" : {
			name : "Hammer of Thunderbolts [attuned]",
			description : "This magical maul has a +1 bonus to hit/damage and gives me +4 Strength (max 30). On a roll of 20 to hit vs. a giant, it dies on a failed DC 17 Con save. I can expend 1 charge to throw it with 20 ft/60 ft range, which, on a hit, causes all within 30 ft to make a DC 17 Con save or be stunned until the end of my next turn.",
			descriptionLong : "This magical maul adds a +1 bonus to attack and damage rolls made with it. It gives me a +4 bonus to Strength (max 30). On a roll of 20 to hit vs. a giant, the giant dies on a failed DC 17 Con save. The hammer has 5 charges and regains 1d4+1 charges daily at dawn. I can can expend 1 charge and make a ranged weapon attack with the hammer, hurling it as if it had the thrown property with a normal range of 20 ft and a long range of 60 ft. On a hit, it releases an audible thunderclap in a 300 ft radius and all within 30 ft of the target that was hit must make a DC 17 Con save or be stunned until the end of my next turn.",
			prerequisite : "Must be wearing a Belt of Giant Strength and Gauntlets of Ogre Power to attune",
			prereqeval : function () {
				// don't have to be attuned to the prereqs https://twitter.com/jeremyecrawford/status/948346891296653315
				return CurrentMagicItems.known.indexOf("belt of giant strength") !== -1 && CurrentMagicItems.known.indexOf("gauntlets of ogre power") !== -1;
			},
			usages : 5,
			recovery : "dawn",
			additional : "regains 1d4+1",
			scores : [4, 0, 0, 0, 0, 0],
			scoresMaximum : [30, 0, 0, 0, 0, 0],
			weaponsAdd : ["Hammer of Thunderbolts"],
			weaponOptions : {
				baseWeapon : "maul",
				regExpSearch : /^(?=.*hammer)(?=.*thunderbolts).*$/i,
				name : "Hammer of Thunderbolts",
				source : [["SRD", 224], ["D", 173]],
				description : "Heavy, two-handed; On 20 to hit vs. Giant: DC 17 Con save or die; Expend charge to throw",
				modifiers : [1, 1]
			}
		}
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
	"helm of brilliance" : {
		name : "Helm of Brilliance",
		source : [["SRD", 225], ["D", 173]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This helm is set with diamonds, rubies, fire opals, and opals. Gems pried from the helm turn to dust. When all the gems are removed or destroyed, the helm loses its magic. I can use an action to cast a spell by having a gem crumble to dust. The helm has special properties for each type of gem, see Notes page.",
		descriptionFull : "This dazzling helm is set with 1d10 diamonds, 2d10 rubies, 3d10 fire opals, and 4d10 opals. Any gem pried from the helm crumbles to dust. When all the gems are removed or destroyed, the helm loses its magic.\n   You gain the following benefits while wearing it:\n \u2022 You can use an action to cast one of the following spells (save DC 18), using one of the helm's gems of the specified type as a component: Daylight (opal), Fireball (fire opal), Prismatic Spray (diamond), or Wall of Fire (ruby). The gem is destroyed when the spell is cast and disappears from the helm.\n \u2022 As long as it has at least one diamond, the helm emits dim light in a 30-foot radius when at least one undead is within that area. Any undead that starts its turn in that area takes 1d6 radiant damage.\n \u2022 As long as the helm has at least one ruby, you have resistance to fire damage.\n \u2022 As long as the helm has at least one fire opal, you can use an action and speak a command word to cause one weapon you are holding to burst into flames. The flames emit bright light in a 10-foot radius and dim light for an additional 10 feet. The flames are harmless to you and the weapon. When you hit with an attack using the blazing weapon, the target takes an extra 1d6 fire damage. The flames last until you use a bonus action to speak the command word again or until you drop or stow the weapon.\n\nRoll a d20 if you are wearing the helm and take fire damage as a result of failing a saving throw against a spell. On a roll of 1, the helm emits beams of light from its remaining gems. Each creature within 60 feet of the helm other than you must succeed on a DC 17 Dexterity saving throw or be struck by a beam, taking radiant damage equal to the number of gems in the helm. The helm and its gems are then destroyed.",
		attunement : true,
		dmgres : ["Fire"],
		action : [["action", " (spell/blazing weapon)"]],
		extraLimitedFeatures : [{
			name : "Helm of Brilliance - Diamonds (D)",
			usages : "1d10",
			recovery : "Never"
		}, {
			name : "Helm of Brilliance - Rubies (R)",
			usages : "2d10",
			recovery : "Never"
		}, {
			name : "Helm of Brilliance - Fire Opals (F)",
			usages : "3d10",
			recovery : "Never"
		}, {
			name : "Helm of Brilliance - Opals (O)",
			usages : "4d10",
			recovery : "Never"
		}],
		fixedDC : 18,
		spellFirstColTitle : "GE",
		spellcastingBonus : [{
			name : "Uses an opal (O)",
			spells : ["daylight"],
			selection : ["daylight"],
			firstCol : "(O)"
		}, {
			name : "Uses a fire opal (F)",
			spells : ["fireball"],
			selection : ["fireball"],
			firstCol : "(F)"
		}, {
			name : "Uses a diamond (D)",
			spells : ["prismatic spray"],
			selection : ["prismatic spray"],
			firstCol : "(D)"
		}, {
			name : "Uses a ruby (R)",
			spells : ["wall of fire"],
			selection : ["wall of fire"],
			firstCol : "(R)"
		}],
		spellChanges : {
			"daylight" : {
				components : "M\u0192,M\u2020",
				compMaterial : "Spells cast from magic items don't require any components other than the magic item itself and, when casting Daylight from the Helm of Brilliance, causes one of the opals in the helm to crumble to dust.",
				changes : "Using the Helm of Brilliance to cast Daylight causes one of the opals in the helm to crumble to dust."
			},
			"fireball" : {
				components : "M\u0192,M\u2020",
				compMaterial : "Spells cast from magic items don't require any components other than the magic item itself and, when casting Fireball from the Helm of Brilliance, causes one of the fire opals in the helm to crumble to dust.",
				changes : "Using the Helm of Brilliance to cast Fireball causes one of the fire opals in the helm to crumble to dust."
			},
			"prismatic spray" : {
				components : "M\u0192,M\u2020",
				compMaterial : "Spells cast from magic items don't require any components other than the magic item itself and, when casting Prismatic Spray from the Helm of Brilliance, causes one of the diamonds in the helm to crumble to dust.",
				changes : "Using the Helm of Brilliance to cast Prismatic Spray causes one of the diamonds in the helm to crumble to dust."
			},
			"wall of fire" : {
				components : "M\u0192,M\u2020",
				compMaterial : "Spells cast from magic items don't require any components other than the magic item itself and, when casting Wall of Fire from the Helm of Brilliance, causes one of the rubies in the helm to crumble to dust.",
				changes : "Using the Helm of Brilliance to cast Wall of Fire causes one of the rubies in the helm to crumble to dust."
			}
		},
		toNotesPage : [{
			name : "Special Properties",
			note : [
				"This dazzling helm is set with 1d10 diamonds, 2d10 rubies, 3d10 fire opals, and 4d10 opals. Any gem pried from the helm crumbles to dust. When all the gems are removed or destroyed, the helm loses its magic.",
				"As an action, I can cast one of the following spells (save DC 18), using one of the helm's gems of the specified type as a component: Daylight (opal), Fireball (fire opal), Prismatic Spray (diamond), or Wall of Fire (ruby). The gem is destroyed when the spell is cast and disappears from the helm.",
				"As long as the helm has at least one diamond remaining, it emits dim light in a 30-ft radius when at least one undead is within that area. Any undead that starts its turn in that area takes 1d6 radiant damage.",
				"As long as the helm has at least one ruby remaining, I have resistance to fire damage.",
				"As long as the helm has at least one fire opal remaining, I can use an action and speak a command word to cause one weapon I'm holding to burst into flames. The flames emit bright light in a 10-ft radius and dim light for an additional 10 ft. The flames are harmless to me and the weapon. When I hit with an attack using the blazing weapon, the target takes an extra 1d6 fire damage. The flames last until I use a bonus action to speak the command word again or until I drop or stow the weapon.",
				"If I take fire damage as a result of failing a save against a spell while wearing the helm, I have to roll a d20. On a roll of 1, the helm emits beams of light from its remaining gems. Each creature within 60 ft other than myself must succeed on a DC 17 Dexterity save or be struck by a beam, taking radiant damage equal to the number of gems remaining in the helm. The helm and its gems are then destroyed."
			]
		}]
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
		description : "While wearing this helm, I can cast Detect Thoughts (DC 13). As a bonus action, I can send a telepathic message to a creature that I'm focusing on with Detect Thoughts, which can reply as a bonus action. Once between each dawn, I can cast Suggestion (DC 13) on a creature I'm focusing on with Detect Thoughts.",
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
	"helm of teleportation" : {
		name : "Helm of Teleportation",
		source : [["SRD", 225], ["D", 174]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "This helm has 3 charges. While wearing it, I can use an action and expend 1 charge to cast Teleport from it. The helm regains 1d3 expended charges daily at dawn.",
		descriptionFull : "This helm has 3 charges. While wearing it, you can use an action and expend 1 charge to cast the Teleport spell from it. The helm regains 1d3 expended charges daily at dawn.",
		attunement : true,
		usages : 3,
		recovery : "dawn",
		additional : "regains 1d3",
		spellFirstColTitle : "Ch",
		spellcastingBonus : {
			name : "1 charge",
			spells : ["teleport"],
			selection : ["teleport"],
			firstCol : "1"
		}
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
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*holy)(?=.*avenger).*$/i).test(v.WeaponTextName)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + '+2d10 radiant damage vs. fiends and undead';
					}
				},
				'If I include the words "Holy Avenger" in a the name of a sword, it will be treated as the magic weapon Holy Avenger. It has +3 to hit and damage and does +2d10 radiant damage to fiends and undead.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*holy)(?=.*avenger).*$/i).test(v.WeaponTextName)) {
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
		description : "This backpack weighs 5 lb, regardless of its contents. It has two side pouches that hold 20 lb (2 cu ft) each and a central pouch that holds 80 lb (8 cu ft). Retrieving an item from it requires an action. If it's overloaded, pierced, or torn, it and its contents are destroyed. If turned inside out, all its contents spill forth.",
		descriptionLong : "This backpack weighs 5 lb, regardless of its contents. It has two side pouches that hold up to 20 lb (2 cu ft) each and a central pouch that holds up to 80 lb (8 cu ft). Retrieving an item from it requires an action. When I reach in the bag for a specific item, the item is always magically on top. If it's overloaded, pierced, or torn, it and its contents are destroyed. If turned inside out, all its contents spill forth. A creature placed inside the bag can survive for 10 minutes before starting to suffocate. Placing the haversack in another extradimensional space instantly destroys both and opens a gate to the Astral Plane.",
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
	"horn of valhalla" : { // contains contributions by Larry Hoy
		name : "Horn of Valhalla",
		source : [["SRD", 226], ["D", 175]],
		type : "wondrous item",
		description : "As an action once per 7 days, I can blow this horn to summon warrior spirits from Ysgard within 60 ft me. These have the statistics of a berserker and return after 1 hour or when they drop to 0 HP. The number and how they respond depends on the type of material the horn is made of.",
		descriptionFull : "You can use an action to blow this horn. In response, warrior spirits from the plane of Ysgard appear within 60 feet of you. These spirits use the berserker statistics. They return to Ysgard after 1 hour or when they drop to 0 hit points. Once you use the horn, it can't be used again until 7 days have passed.\n Four types of Horn of Valhalla are known to exist, each made of a different metal. The horn's type determines how many berserkers answer it summons, as well as the requirement for its use. The DM chooses the horn's type or determines it randomly.\n   If you blow the horn without meeting its requirement, the summoned berserkers attack you. If you meet the requirement, they are friendly to you and your companions and follow your commands.",
		weight : 2,
		usages : 1,
		recovery : "7 days",
		action : [["action", ""]],
		allowDuplicates : true,
		choices : ["Silver (rare; 2d4+2 berserkers)", "Brass (rare; 3d4+3 berserkers; prereq: simple weapons prof.)", "Bronze (very rare; 4d4+4 berserkers; prereq: medium armor prof.)", "Iron (very rare; 5d4+5 berserkers; prereq: martial weapons prof.)"],
		"silver (rare; 2d4+2 berserkers)" : {
			name : "Silver Horn of Valhalla",
			sortname : "Horn of Valhalla, Silver",
			rarity : "rare",
			magicItemTable : "G",
			description : "As an action once per 7 days, I can blow this horn to summon 2d4+2 warrior spirits from Ysgard within 60 ft me. These have the statistics of a berserker and return after 1 hour or when they drop to 0 HP. They are friendly to me and my companions and follow my commands.",
			descriptionFull : "You can use an action to blow this horn. In response, warrior spirits from the plane of Ysgard appear within 60 feet of you. These spirits use the berserker statistics. They return to Ysgard after 1 hour or when they drop to 0 hit points. Once you use the horn, it can't be used again until 7 days have passed.\n   The silver horn summons 2d4+2 berserkers.\n   The berserkers are friendly to you and your companions and follow your commands."
		},
		"brass (rare; 3d4+3 berserkers; prereq: simple weapons prof.)" : {
			name : "Brass Horn of Valhalla",
			sortname : "Horn of Valhalla, Brass",
			rarity : "rare",
			magicItemTable : "G",
			description : "As an action once per 7 days, I can blow this horn to summon 3d4+3 warrior spirits from Ysgard within 60 ft. These berserkers return after 1 hour or when they drop to 0 HP. If I'm proficient with all simple weapons, they follow my commands and are friendly to me and my companions. Otherwise, they attack me.",
			descriptionFull : "You can use an action to blow this horn. In response, warrior spirits from the plane of Ysgard appear within 60 feet of you. These spirits use the berserker statistics. They return to Ysgard after 1 hour or when they drop to 0 hit points. Once you use the horn, it can't be used again until 7 days have passed.\n   A brass horn summons 3d4+3 berserkers. To use the brass horn, you must be proficient with all simple weapons.\n   If you blow the horn without meeting its requirement, the summoned berserkers attack you. If you meet the requirement, they are friendly to you and your companions and follow your commands."
		},
		"bronze (very rare; 4d4+4 berserkers; prereq: medium armor prof.)" : {
			name : "Bronze Horn of Valhalla",
			sortname : "Horn of Valhalla, Bronze",
			rarity : "very rare",
			magicItemTable : "H",
			description : "As an action once per 7 days, I can blow this horn to summon 4d4+4 warrior spirits from Ysgard within 60 ft. These berserkers return after 1 hour or when they drop to 0 HP. If I'm proficient with medium armor, they follow my commands and are friendly to me and my companions. Otherwise, they attack me.",
			descriptionFull : "You can use an action to blow this horn. In response, warrior spirits from the plane of Ysgard appear within 60 feet of you. These spirits use the berserker statistics. They return to Ysgard after 1 hour or when they drop to 0 hit points. Once you use the horn, it can't be used again until 7 days have passed.\n   A bronze horn summons 4d4+4 berserkers. To use the bronze horn, you must be proficient with medium armor.\n   If you blow the horn without meeting its requirement, the summoned berserkers attack you. If you meet the requirement, they are friendly to you and your companions and follow your commands."
		},
		"iron (very rare; 5d4+5 berserkers; prereq: martial weapons prof.)" : {
			name : "Iron Horn of Valhalla",
			sortname : "Horn of Valhalla, Iron",
			rarity : "legendary",
			magicItemTable : "I",
			description : "As an action once per 7 days, I can blow this horn to summon 5d4+5 warrior spirits from Ysgard within 60 ft. These berserkers return after 1 hour or when they drop to 0 HP. If I'm proficient with all martial weapons, they follow my commands and are friendly to me and my companions. Otherwise, they attack me.",
			descriptionFull : "You can use an action to blow this horn. In response, warrior spirits from the plane of Ysgard appear within 60 feet of you. These spirits use the berserker statistics. They return to Ysgard after 1 hour or when they drop to 0 hit points. Once you use the horn, it can't be used again until 7 days have passed.\n   The iron horn summons 5d4+5 berserkers. To use the iron horn, you must be proficient with all martial weapons.\n   If you blow the horn without meeting its requirement, the summoned berserkers attack you. If you meet the requirement, they are friendly to you and your companions and follow your commands."
		}
	},
	"horseshoes of a zephyr" : {
		name : "Horseshoes of a Zephyr",
		source : [["SRD", 226], ["D", 175]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "D",
		description : "While all four shoes are affixed to the hooves of a creature, they allow it to move normally while floating 4 inches above the floor. The creature leaves no tracks, can cross or stand above liquid or unstable surfaces, ignores difficult terrain, and doesn't suffer exhaustion from moving at normal speed for 12 hours a day.",
		descriptionFull : "These iron horseshoes come in a set of four. While all four shoes are affixed to the hooves of a horse or similar creature, they allow the creature to move normally while floating 4 inches above the ground. This effect means the creature can cross or stand above nonsolid or unstable surfaces, such as water or lava. The creature leaves no tracks and ignores difficult terrain. In addition, the creature can move at normal speed for up to 12 hours a day without suffering exhaustion from a forced march."
	},
	"horseshoes of speed" : {
		name : "Horseshoes of Speed",
		source : [["SRD", 226], ["D", 175]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "C",
		description : "While all four shoes are affixed to the hooves of a horse or similar creature, they increase the creature's walking speed by 30 ft.",
		descriptionFull : "These iron horseshoes come in a set of four. While all four shoes are affixed to the hooves of a horse or similar creature, they increase the creature's walking speed by 30 feet."
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
			descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n   You can't be surprised while this dark blue rhomboid orbits your head.",
			savetxt : { immune : ["surprised"] }
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
	"iron flask" : { // contains contributions by Larry Hoy
		name : "Iron Flask",
		source : [["SRD", 228], ["D", 178]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		notLegalAL : true,
		description : "As an action I can speak the flask's command word and target a creature from another plane that I can see within 60 ft. It must make a DC 17 Wis save (adv. if trapped before) or be trapped in the flask. It holds only 1 creature. As an action, I can open it to release the creature, which then obeys my commands for 1 hour.",
		descriptionLong : "As an action I can speak the flask's command word and target a creature from another plane that I can see within 60 ft. It must make a DC 17 Wisdom saving throw or be trapped inside the flask. It has advantage on this save if it was trapped in the flask before. The flask holds only 1 creature, which remain inside until released and doesn't need to breathe, eat, or drink and doesn't age. As an action, I can remove the flak's brass stopper and release the creature inside, which then obeys my commands for 1 hour as long as those commands aren't likely to cause its death. After this time, it acts normally.",
		descriptionFull : "This iron bottle has a brass stopper. You can use an action to speak the flask's command word, targeting a creature that you can see within 60 feet of you. If the target is native to a plane of existence other than the one you're on, the target must succeed on a DC 17 Wisdom saving throw or be trapped in the flask. If the target has been trapped by the flask before, it has advantage on the saving throw. Once trapped, a creature remains in the flask until released. The flask can hold only one creature at a time. A creature trapped in the flask doesn't need to breathe, eat, or drink and doesn't age.\n   You can use an action to remove the flask's stopper and release the creature the flask contains. The creature is friendly to you and your companions for 1 hour and obeys your commands for that duration. If you give no commands or give it a command that is likely to result in its death, it defends itself but otherwise takes no actions. At the end of the duration, the creature acts in accordance with its normal disposition and alignment.\n   An Identify spell reveals that a creature is inside the flask, but the only way to determine the type of creature is to open the flask. A newly discovered bottle might already contain a creature chosen by the DM or determined randomly.\n\n" + toUni("d100\tContents") + "\n01-50\tEmpty\n   51\tArcanaloth\n   52\tCambion\n53-54\tDao\n55-57\tDemon (type 1): barlgura, shadow demon, or vrock\n58-60\tDemon (type 2): chasme or hezrou\n61-62\tDemon (type 3): glabrezu or yochlol\n63-64\tDemon (type 4): nalfeshnee\n   65\tDemon (type 5): marilith\n   66\tDemon (type 6): balor or goristro\n   67\tDeva\n68-69\tDevil (greater): horned devil, erinyes, ice devil, or pit fiend\n70-72\tDevil (lesser): imp, spined devil, bearded devil, barbed devil, chain devil, or bone devil\n73-74\tDjinni\n75-76\tEfreeti\n77-78\tElemental (any)\n   79\tGithyanki knight\n   80\tGithzerai zerth\n81-82\tInvisible stalker\n83-84\tMarid\n85-86\tMezzoloth\n87-88\tNight hag\n89-90\tNycaloth\n   91\tPlanetar\n92-93\tSalamander\n94-95\tSlaad (any)\n   96\tSolar\n97-98\tSuccubus/Incubus\n   99\tUltroloth\n   00\tXorn",
		weight : 1
	},
	"javelin of lightning" : { // contains contributions by Larry Hoy
		name : "Javelin of Lightning",
		source : [["SRD", 228], ["D", 178]],
		type : "weapon (javelin)",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "Once per dawn I can speak this javelin's command word and make a ranged weapon attack with it on a target within 120 ft. All between me and the target in a 5-ft wide line take 4d6 lightning damage, DC 13 Dex save halves. If the javelin hits the target, it takes 1d6 piercing and 4d6 lightning damage.",
		descriptionFull : "This javelin is a magic weapon. When you hurl it and speak its command word, it transforms into a bolt of lightning, forming a line 5 feet wide that extends out from you to a target within 120 feet. Each creature in the line excluding you and the target must make a DC 13 Dexterity saving throw, taking 4d6 lightning damage on a failed save, and half as much damage on a successful one. The lightning bolt turns back into a javelin when it reaches the target. Make a ranged weapon attack against the target. On a hit, the target takes damage from the javelin plus 4d6 lightning damage.\n   The javelin's property can't be used again until the next dawn. In the meantime, the javelin can still be used as a magic weapon.",
		weight : 2,
		usages : 1,
		recovery : "dawn",
		weaponsAdd : ["Javelin of Lightning"],
		weaponOptions : {
			baseWeapon : "javelin",
			regExpSearch : /^(?=.*javelin)(?=.*lightning).*$/i,
			name : "Javelin of Lightning",
			source : [["SRD", 228], ["D", 178]],
			description : "Thrown; Once per dawn special attack, see item description"
		}
	},
	"keoghtom's ointment" : {
		name : "Keoghtom's Ointment",
		nameAlt : "Restorative Ointment",
		source : [["SRD", 235], ["D", 179]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "This glass jar, 3 inches in diameter, contains 1d4+1 doses of a thick mixture that smells faintly of aloe. As an action, one dose of the ointment can be swallowed or applied to the skin. The creature that receives it regains 2d8+2 hit points, ceases to be poisoned, and is cured of any disease.",
		descriptionFull : "This glass jar, 3 inches in diameter, contains 1d4+1 doses of a thick mixture that smells faintly of aloe. The jar and its contents weigh \xBD pound.\n   As an action, one dose of the ointment can be swallowed or applied to the skin. The creature that receives it regains 2d8+2 hit points, ceases to be poisoned, and is cured of any disease.",
		weight : 0.5,
		usages : "1d4+1",
		recovery : "Never"
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
		addMod : [{ type : "save", field : "all", mod : 1, text : "While the Luck Blade is on my person, I gain a +1 bonus to all my saving throws." }],
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*luck)(?=.*blade).*$/i).test(v.WeaponTextName)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
					}
				},
				'If I include the words "Luck Blade" in a the name of a sword, it will be treated as the magic weapon Luck Blade. It has +1 to hit and damage.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*luck)(?=.*blade).*$/i).test(v.WeaponTextName)) {
						output.magic = v.thisWeapon[1] + 1;
					}
				}, ''
			]
		}
	},
	"mace of disruption" : {
		name : "Mace of Disruption",
		source : [["SRD", 229], ["D", 179]],
		type : "weapon (mace)",
		rarity : "rare",
		magicItemTable : "G",
		description : "This magic mace sheds bright light in a 20-ft radius and dim light for another 20 ft while held. Fiends and undead hit with it take +2d6 radiant damage and becomes frightened of me until my next turn ends. If the target has less than 26 HP after taking the damage, it must make a DC 15 Wis save or be destroyed.",
		descriptionFull : "When you hit a fiend or an undead with this magic weapon, that creature takes an extra 2d6 radiant damage. If the target has 25 hit points or fewer after taking this damage, it must succeed on a DC 15 Wisdom saving throw or be destroyed. On a successful save, the creature becomes frightened of you until the end of your next turn.\n   While you hold this weapon, it sheds bright light in a 20-foot radius and dim light for an additional 20 feet.",
		attunement : true,
		weight : 4,
		weaponsAdd : ["Mace of Disruption"],
		weaponOptions : {
			baseWeapon : "mace",
			regExpSearch : /^(?=.*mace)(?=.*disruption).*$/i,
			name : "Mace of Disruption",
			source : [["SRD", 229], ["D", 179]],
			description : "Fiend/undead +2d6 radiant damage, frightened until my next turn ends, and if HP<26, DC 15 Wis save or die"
		}
	},
	"mace of smiting" : {
		name : "Mace of Smiting",
		source : [["SRD", 229], ["D", 179]],
		type : "weapon (mace)",
		rarity : "rare",
		magicItemTable : "G",
		description : "This magical mace adds a +1 bonus (+3 vs. constructs) to attack and damage rolls made with it. When I roll a 20 on an attack roll, the target takes an extra 7 bludgeoning damage, or an extra 14 bludgeoning damage if it's a construct. If a construct has less than 26 HP after taking this damage, it is destroyed.",
		descriptionFull : "You gain a +1 bonus to attack and damage rolls made with this magic weapon. The bonus increases to +3 when you use the mace to attack a construct.\n   When you roll a 20 on an attack roll made with this weapon, the target takes an extra 7 bludgeoning damage, or an extra 14 bludgeoning damage if it's a construct. If a construct has 25 hit points or fewer after taking this damage, it is destroyed.",
		weight : 4,
		weaponsAdd : ["Mace of Smiting"],
		weaponOptions : {
			baseWeapon : "mace",
			regExpSearch : /^(?=.*mace)(?=.*smiting).*$/i,
			name : "Mace of Smiting",
			source : [["SRD", 229], ["D", 179]],
			description : "+2 to hit/damage vs. constructs; On 20 to hit: +7 damage (+14 vs. constructs); Constructs HP<26 destroyed",
			modifiers : [1,1]
		}
	},
	"mace of terror" : {
		name : "Mace of Terror",
		source : [["SRD", 229], ["D", 180]],
		type : "weapon (mace)",
		rarity : "rare",
		magicItemTable : "G",
		description : "As an action, I can use 1 charge of this mace to have all chosen creatures within 30 ft make a DC 15 Wis save or be frightened of me for 1 min, repeating the save at the end of its turns. While frightened, it takes only the Dash action to move away (or action to free itself), no reactions, and can't move within 30 ft of me.",
		descriptionLong : "This magic mace has 3 charges, regaining 1d3 at dawn. As an action, I can expend 1 charge to have each creature of my choice within 30 ft make a DC 15 Wis save or become frightened of me for 1 minute. While frightened in this way, a creature must spend its turns trying to move as far away from me as it can, using its action to Dash or to get away, and it can't willingly move within 30 ft of me and can't take reactions. If it has nowhere it can move, the creature can use the Dodge action. At the end of each of its turns, a creature can repeat the saving throw, ending the effect on itself on a success.",
		descriptionFull : "This magic weapon has 3 charges. While holding it, you can use an action and expend 1 charge to release a wave of terror. Each creature of your choice in a 30-foot radius extending from you must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. While it is frightened in this way, a creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action it can use only the Dash action or try to escape from an effect that prevents it from moving. If it has nowhere it can move, the creature can use the Dodge action. At the end of each of its turns, a creature can repeat the saving throw, ending the effect on itself on a success.\n   The mace regains 1d3 expended charges daily at dawn.",
		attunement : true,
		weight : 4,
		usages : 3,
		recovery : "dawn",
		additional : "regains 1d3",
		weaponsAdd : ["Mace of Terror"],
		weaponOptions : {
			baseWeapon : "mace",
			regExpSearch : /^(?=.*mace)(?=.*terror).*$/i,
			name : "Mace of Terror",
			source : [["SRD", 229], ["D", 180]]
		}
	},
	"mantle of spell resistance" : {
		name : "Mantle of Spell Resistance",
		source : [["SRD", 229], ["D", 180]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "I have advantage on saving throws against spells while I wear this cloak.",
		descriptionFull : "You have advantage on saving throws against spells while you wear this cloak.",
		attunement : true,
		savetxt : { adv_vs : ["spells"] }
	},
	"manual of bodily health" : {
		name : "Manual of Bodily Health",
		source : [["SRD", 229], ["D", 180]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This book contains health and diet tips, and its words are charged with magic. If I spend 48 hours within 6 days to study its contents and practicing its guidelines, my Constitution score increases by 2, as does my maximum for that score. The manual then loses its magic, but regains it in a century.",
		descriptionFull : "This book contains health and diet tips, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Constitution score increases by 2, as does your maximum for that score. The manual then loses its magic, but regains it in a century.",
		weight : 5,
		applyStatBonus : function(itemName, statName, statBonus) {
			// a function for all the manuals/tomes
			if (!IsNotReset) return;
			initiateCurrentStats();
			var statIndx = AbilityScores.names.indexOf(statName);
			var alreadyAppliedBefore = CurrentStats.maximumsLinked[itemName];
			var applyChange = app.alert({
				nIcon : 2,
				nType : 2,
				nTitle : "Apply " + itemName + "?",
				cMsg : "Do you want to apply the +" + statBonus + " bonus to the " + statName + " score and maximum from the " + itemName + " permanently? This increase will stay even after you remove this magic item.\nIf you select 'No' below, this increase will not be applied, even if you keep the magic item selected.\n\n" + (alreadyAppliedBefore ? "It seems you have applied this item before. If you click 'No', you will be prompted to remove all ability score increases from " + itemName : "If you want to remove this ability score increase at a later time, just add the item again and you will be prompted to remove the ability score increase then.")
			});
			if (applyChange == 3) {
				if (alreadyAppliedBefore) {
					var removeAll = app.alert({
						nIcon : 2,
						nType : 2,
						nTitle : "Remove all previous uses of " + itemName + "?",
						cMsg : "Do you want to remove all the previous bonuses to " + statName + " gained from the " + itemName + "?"
					});
					if (removeAll == 3) return;
				} else {
					return;
				}
			}
			var baseAdd = [0,0,0,0,0,0];
			baseAdd[statIndx] = statBonus;
			var maxAdd = [0,0,0,0,0,0];
			maxAdd[statIndx] = "+" + baseAdd[statIndx];
			if (alreadyAppliedBefore) {
				baseAdd = [].concat(CurrentStats.maximumsLinked[itemName]);
				// remove the old version
				processStats(false, "magic", itemName, baseAdd, false, false, maxAdd);
				if (removeAll) {
					// also remove the maximum
					processStats(false, "magic", itemName, maxAdd, false, "maximums");
					return;
				}
				// now increase the gains to include the item again
				baseAdd[statIndx] += statBonus;
				maxAdd[statIndx] = "+" + baseAdd[statIndx];
			}
			processStats(true, "magic", itemName, baseAdd, false, false, maxAdd);
			processStats(true, "magic", itemName, maxAdd, false, "maximums");
		},
		eval : function() {
			MagicItemsList["manual of bodily health"].applyStatBonus("Manual of Bodily Health", "Constitution", 2);
		}
	},
	"manual of gainful exercise" : {
		name : "Manual of Gainful Exercise",
		source : [["SRD", 229], ["D", 180]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This book describes fitness exercises, and its words are charged with magic. If I spend 48 hours over a period of 6 days or fewer studying its contents and practicing its guidelines, my Strength score increases by 2, as does my maximum for that score. The manual then loses its magic, but regains it in a century.",
		descriptionFull : "This book describes fitness exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Strength score increases by 2, as does your maximum for that score. The manual then loses its magic, but regains it in a century.",
		weight : 5,
		eval : function() {
			MagicItemsList["manual of bodily health"].applyStatBonus("Manual of Gainful Exercise", "Strength", 2);
		}
	},
	"manual of golems" : { // contains contributions by Larry Hoy
		name : "Manual of Golems",
		source : [["SRD", 229], ["D", 180]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This tome can only be used by a spellcaster with two 5th-level spell slots. Others reading it take 6d6 psychic damage.",
		descriptionFull : "This tome contains information and incantations necessary to make a particular type of golem. The DM chooses the type or determines it randomly. To decipher and use the manual, you must be a spellcaster with at least two 5th-level spell slots. A creature that can't use a manual of golems and attempts to read it takes 6d6 psychic damage.\n   To create a golem, you must spend a the time shown on the table, working without interruption with the manual at hand and resting no more than 8 hours per day. You must also pay the specified cost to purchase supplies. Once you finish creating the golem, the book is consumed in eldritch flames. The golem becomes animate when the ashes of the manual are sprinkled on it. It is under your control, and it understands and obeys your spoken commands.",
		weight : 5,
		allowDuplicates : true,
		prerequisite : "Requires a spellcaster with at least two 5th-level spell slots",
		prereqeval : function () { return What('SpellSlots.CheckboxesSet.lvl5') >= 2; },
		choices : ["Clay", "Flesh", "Iron", "Stone"],
		"clay" : {
			name : "Manual of Clay Golems",
			sortname : "Manual of Golems, Clay",
			description : "Only spellcasters with two 5th-level spell slots can use this tome. Creating a clay golem requires 65000 gp of supplies, 30 days working uninterrupted with the manual at hand, resting no more than 8 hours per day. The manual is consumed to animate the golem, which understands and obeys my spoken commands.",
			descriptionLong : "Only spellcasters with two 5th-level spell slots can use this tome, others reading it take 6d6 psychic damage. Creating a clay golem requires 65000 gp of supplies, 30 days working uninterrupted with the manual at hand, resting no more than 8 hours per day. The manual is consumed to animate the golem, which understands and obeys my spoken commands.",
			descriptionFull : "This tome contains information and incantations necessary to make a particular type of golem. The DM chooses the type or determines it randomly. To decipher and use the manual, you must be a spellcaster with at least two 5th-level spell slots. A creature that can't use a manual of golems and attempts to read it takes 6d6 psychic damage.\n   To create a clay golem, you must spend 30 days, working without interruption with the manual at hand and resting no more than 8 hours per day. You must also pay 65,000 gp to purchase supplies. Once you finish creating the golem, the book is consumed in eldritch flames. The golem becomes animate when the ashes of the manual are sprinkled on it. It is under your control, and it understands and obeys your spoken commands."
		},
		"flesh" : {
			name : "Manual of Flesh Golems",
			sortname : "Manual of Golems, Flesh",
			description : "Only spellcasters with two 5th-level spell slots can use this tome. Creating a flesh golem requires 50000 gp of supplies, 60 days working uninterrupted with the manual at hand, resting no more than 8 hours per day. The manual is consumed to animate the golem, which understands and obeys my spoken commands.",
			descriptionLong : "Only spellcasters with two 5th-level spell slots can use this tome, others reading it take 6d6 psychic damage. Creating a flesh golem requires 50000 gp of supplies, 60 days working uninterrupted with the manual at hand, resting no more than 8 hours per day. The manual is consumed to animate the golem, which understands and obeys my spoken commands.",
			descriptionFull : "This tome contains information and incantations necessary to make a particular type of golem. The DM chooses the type or determines it randomly. To decipher and use the manual, you must be a spellcaster with at least two 5th-level spell slots. A creature that can't use a manual of golems and attempts to read it takes 6d6 psychic damage.\n   To create a flesh golem, you must spend 60 days, working without interruption with the manual at hand and resting no more than 8 hours per day. You must also pay 50,000 gp to purchase supplies. Once you finish creating the golem, the book is consumed in eldritch flames. The golem becomes animate when the ashes of the manual are sprinkled on it. It is under your control, and it understands and obeys your spoken commands."
		},
		"iron" : {
			name : "Manual of Iron Golems",
			sortname : "Manual of Golems, Iron",
			description : "Only spellcasters with two 5th-level spell slots can use this tome. Creating a iron golem requires 100000 gp of supplies, 120 days working uninterrupted with the manual at hand, resting no more than 8 hours per day. The manual is consumed to animate the golem, which understands and obeys my spoken commands.",
			descriptionLong : "Only spellcasters with two 5th-level spell slots can use this tome, others reading it take 6d6 psychic damage. Creating a iron golem requires 100000 gp of supplies, 120 days working uninterrupted with the manual at hand, resting no more than 8 hours per day. The manual is consumed to animate the golem, which understands and obeys my spoken commands.",
			descriptionFull : "This tome contains information and incantations necessary to make a particular type of golem. The DM chooses the type or determines it randomly. To decipher and use the manual, you must be a spellcaster with at least two 5th-level spell slots. A creature that can't use a manual of golems and attempts to read it takes 6d6 psychic damage.\n   To create an iron golem, you must spend 120 days, working without interruption with the manual at hand and resting no more than 8 hours per day. You must also pay 100,000 gp to purchase supplies. Once you finish creating the golem, the book is consumed in eldritch flames. The golem becomes animate when the ashes of the manual are sprinkled on it. It is under your control, and it understands and obeys your spoken commands."
		},
		"stone" : {
			name : "Manual of Stone Golems",
			sortname : "Manual of Golems, Stone",
			description : "Only spellcasters with two 5th-level spell slots can use this tome. Creating a stone golem requires 80000 gp of supplies, 90 days working uninterrupted with the manual at hand, resting no more than 8 hours per day. The manual is consumed to animate the golem, which understands and obeys my spoken commands.",
			descriptionLong : "Only spellcasters with two 5th-level spell slots can use this tome, others reading it take 6d6 psychic damage. Creating a stone golem requires 80000 gp of supplies, 90 days working uninterrupted with the manual at hand, resting no more than 8 hours per day. The manual is consumed to animate the golem, which understands and obeys my spoken commands.",
			descriptionFull : "This tome contains information and incantations necessary to make a particular type of golem. The DM chooses the type or determines it randomly. To decipher and use the manual, you must be a spellcaster with at least two 5th-level spell slots. A creature that can't use a manual of golems and attempts to read it takes 6d6 psychic damage.\n   To create a stone golem, you must spend 90 days, working without interruption with the manual at hand and resting no more than 8 hours per day. You must also pay 80,000 gp to purchase supplies. Once you finish creating the golem, the book is consumed in eldritch flames. The golem becomes animate when the ashes of the manual are sprinkled on it. It is under your control, and it understands and obeys your spoken commands."
		}
	},
	"manual of quickness of action" : {
		name : "Manual of Quickness of Action",
		source : [["SRD", 230], ["D", 181]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This book contains coordination and balance exercises, and its words are charged with magic. If I spend 48 hours within 6 days to study its contents and practicing its guidelines, my Dexterity score increases by 2, as does my maximum for that score. The manual then loses its magic, but regains it in a century.",
		descriptionFull : "This book contains coordination and balance exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Dexterity score increases by 2, as does your maximum for that score. The manual then loses its magic, but regains it in a century.",
		weight : 5,
		eval : function() {
			MagicItemsList["manual of bodily health"].applyStatBonus("Manual of Quickness of Action", "Dexterity", 2);
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
		additional : "regains 1d3",
		spellcastingBonus : {
			name : "1 charge",
			spells : ["detect thoughts"],
			selection : ["detect thoughts"],
			firstCol : 1
		},
		fixedDC : 13,
		spellFirstColTitle : "Ch"
	},
	"mirror of life trapping" : {
		name : "Mirror of Life Trapping",
		source : [["SRD", 230], ["D", 181]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "As an action when I'm within 5 ft of this mirror, I can speak its command word and activate it and it remains activated until I do so again. Creatures other than me who look in the activated mirror must make a DC 15 Charisma save or become trapped in one of its twelve extradimensional cells. See Notes page for info.",
		descriptionFull : "When this 4-foot-tall mirror is viewed indirectly, its surface shows faint images of creatures. The mirror weighs 50 pounds, and it has AC 11, 10 hit points, and vulnerability to bludgeoning damage. It shatters and is destroyed when reduced to 0 hit points.\n   If the mirror is hanging on a vertical surface and you are within 5 feet of it, you can use an action to speak its command word and activate it. It remains activated until you use an action to speak the command word again.\n   Any creature other than you that sees its reflection in the activated mirror while within 30 feet of it must succeed on a DC 15 Charisma saving throw or be trapped, along with anything it is wearing or carrying, in one of the mirror's twelve extradimensional cells. This saving throw is made with advantage if the creature knows the mirror's nature, and constructs succeed on the saving throw automatically.\n   An extradimensional cell is an infinite expanse filled with thick fog that reduces visibility to 10 feet. Creatures trapped in the mirror's cells don't age, and they don't need to eat, drink, or sleep. A creature trapped within a cell can escape using magic that permits planar travel. Otherwise, the creature is confined to the cell until freed.\n   If the mirror traps a creature but its twelve extradimensional cells are already occupied, the mirror frees one trapped creature at random to accommodate the new prisoner. A freed creature appears in an unoccupied space within sight of the mirror but facing away from it. If the mirror is shattered, all creatures it contains are freed and appear in unoccupied spaces near it.\n   While within 5 feet of the mirror, you can use an action to speak the name of one creature trapped in it or call out a particular cell by number. The creature named or contained in the named cell appears as an image on the mirror's surface. You and the creature can then communicate normally.\n   In a similar way, you can use an action to speak a second command word and free one creature trapped in the mirror. The freed creature appears, along with its possessions, in the unoccupied space nearest to the mirror and facing away from it.",
		weight : 50,
		action : [["action", ""]],
		toNotesPage : [{
			name : "Workings of the Mirror",
			note : [
				"When this 4-ft-tall mirror is viewed indirectly, its surface shows faint images of creatures. The mirror weighs 50 lb, has AC 11, 10 HP, and vulnerability to bludgeoning damage. It shatters and is destroyed when reduced to 0 hit points.",
				"If the mirror is hanging on a vertical surface and I am within 5 ft of it, I can use an action to speak its command word and activate it. It remains activated until I use an action to speak the command word again.",
				"Any creature other than me that sees its reflection in the activated mirror while within 30 ft of it must succeed on a DC 15 Charisma saving throw or be trapped, along with anything it is wearing or carrying, in one of the mirror's twelve extradimensional cells. This saving throw is made with advantage if the creature knows the mirror's nature, and constructs succeed on the saving throw automatically.",
				"An extradimensional cell is an infinite expanse filled with thick fog that reduces visibility to 10 ft. Creatures trapped in the mirror's cells don't age, and they don't need to eat, drink, or sleep. A creature trapped within a cell can escape using magic that permits planar travel. Otherwise, the creature is confined to the cell until freed.",
				"If the mirror traps a creature but its twelve extradimensional cells are already occupied, the mirror frees one trapped creature at random to accommodate the new prisoner. A freed creature appears in an unoccupied space within sight of the mirror but facing away from it. If the mirror is shattered, all creatures it contains are freed and appear in unoccupied spaces near it.",
				"While within 5 ft of the mirror, I can use an action to speak the name of one creature trapped in it or call out a particular cell by number. The creature named or contained in the named cell appears as an image on the mirror's surface and I can then communicate normally with it.",
				"In a similar way, I can use an action to speak a second command word and free one creature trapped in the mirror. The freed creature appears, along with its possessions, in the unoccupied space nearest to the mirror and facing away from it."
			]
		}]
	},
	"mithral armor" : {
		name : "Mithral Armor",
		nameTest : "Mithral",
		source : [["SRD", 231], ["D", 182]],
		type : "armor (medium or heavy)",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "Mithral is a light, flexible metal. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn't. A mithral chain shirt or breastplate can be worn under normal clothes.",
		descriptionFull : "Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn't.",
		allowDuplicates : true,
		chooseGear : {
			type : "armor",
			prefixOrSuffix : "suffix",
			excludeCheck : function (inObjKey, inObj) {
				return !(/medium|heavy/i).test(inObj.type) || (/hide/i).test(inObj.name);
			},
			descriptionChange : ["prefix", "armor"]
		}
	},
	"necklace of adaptation" : {
		name : "Necklace of Adaptation",
		source : [["SRD", 231], ["D", 182]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While wearing this necklace, I can breathe normally in any environment, and I have advantage on saving throws made against harmful gases and vapors (such as Cloudkill and Stinking Cloud effects, inhaled poisons, and the breath weapons of some dragons).",
		descriptionFull : "While wearing this necklace, you can breathe normally in any environment, and you have advantage on saving throws made against harmful gases and vapors (such as Cloudkill and Stinking Cloud effects, inhaled poisons, and the breath weapons of some dragons).",
		weight : 1,
		attunement : true,
		savetxt : { adv_vs : ["gases", "vapors"] }
	},
	"necklace of fireballs" : {
		name : "Necklace of Fireballs",
		source : [["SRD", 231], ["D", 182]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "C",
		description : "This necklace has 1d6+3 beads hanging from it. As an action, I can detach a bead and throw it up to 60 ft away where it detonates as a 3rd-level Fireball (save DC 15). I can hurl multiple beads as part of the same action, increasing the level of the Fireball by 1 for each bead beyond the first.",
		descriptionFull : "This necklace has 1d6+3 beads hanging from it. You can use an action to detach a bead and throw it up to 60 feet away. When it reaches the end of its trajectory, the bead detonates as a 3rd-level Fireball spell (save DC 15).\n   You can hurl multiple beads, or even the whole necklace, as one action. When you do so, increase the level of the Fireball by 1 for each bead beyond the first.",
		weight : 1,
		usages : "1d6+3",
		recovery : "Never",
		spellcastingBonus : {
			name : "Fireball",
			spells : ["fireball"],
			selection : ["fireball"]
		},
		fixedDC : 15,
		spellChanges : {
			"fireball" : {
				description : "20-ft rad all crea 8d6+1d6/extra bead Fire dmg; save halves; unattended flammable objects ignite",
				components : "M\u2020",
				compMaterial : "Using the Necklace of Fireballs to cast Fireball requires removing and destorying one or more of the beads from it.",
				changes : "Using the Necklace of Fireballs to cast Fireball requires removing and destorying one or more of the beads from it. The damage is that of a Fireball cast a 3rd-level, +1 level per bead thrown as part of the same action beyond the first."
			}
		}
	},
	"necklace of prayer beads" : {
		name : "Necklace of Prayer Beads",
		source : [["SRD", 231], ["D", 182]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "This necklace has many beads, 1d4+2 are magical and can each be used to cast a spell once per dawn as a bonus action. The DM selects the spells from: Bless, Cure Wounds \u0026 Lesser Restoration, Greater Restoration, Branding Smite, Planar Ally, and Wind Walk. Multiple beads of the same type can be on one necklace.",
		descriptionLong : "This necklace has many beads, 1d4+2 are magical aquamarine, black pearl, or topaz beads and can each be used to cast a spell once per dawn as a bonus action. The DM selects the bead from: blessing bead (Bless), curing bead (Cure Wounds \u0026 Lesser Restoration), favor bead (Greater Restoration), smiting bead (Branding Smite), summons bead (Planar Ally), and wind walking bead (Wind Walk). Multiple beads of the same type can be on one necklace.",
		descriptionFull : "This necklace has 1d4+2 magic beads made from aquamarine, black pearl, or topaz. It also has many nonmagical beads made from stones such as amber, bloodstone, citrine, coral, jade, pearl, or quartz. If a magic bead is removed from the necklace, that bead loses its magic.\n   Six types of magic beads exist. The DM decides the type of each bead on the necklace or determines it randomly. A necklace can have more than one bead of the same type. To use one, you must be wearing the necklace. Each bead contains a spell that you can cast from it as a bonus action (using your spell save DC if a save is necessary). Once a magic bead's spell is cast, that bead can't be used again until the next dawn.\n\n" + toUni("d20\tBead of ...\tSpell") + "\n1-6\tBlessing\t\tBless\n7-12\tCuring\t\tCure Wounds (2nd level) or Lesser Restoration\n13-16\tFavor\t\tGreater Restoration\n17-18\tSmiting\t\tBranding Smite\n19\tSummons   \tPlanar Ally\n20\tWind walking\tWind Walk",
		attunement : true,
		weight : 1,
		usages : "1d4+2",
		recovery : "dawn",
		spellcastingAbility : "class",
		spellFirstColTitle : "Us",
		spellcastingBonus : {
			name : "Bead Spell",
			spells : ["bless", "cure wounds", "lesser restoration", "greater restoration", "branding smite", "planar ally", "wind walk"],
			times : 12
		},
		calcChanges : {
			spellAdd : [
				function (spellKey, spellObj, spName) {
					if ((/necklace of prayer beads/i).test(spName)) {
						var toReturn = spellObj.time !== "1 bns";
						spellObj.time = "1 bns";
						spellObj.firstCol = "checkbox";
						if (spellKey === "cure wounds") {
							spellObj.name += " (2nd level)";
							spellObj.description = "1 living creature heals 2d8 + spellcasting ability modifier HP";
						}
						return toReturn;
					}
				},
				"Using the Necklace of Prayer Beads, the casting time is only a bonus action. Also, Cure Wounds is cast as a 2nd-level spell."
			]
		}
	},
	"nolzur's marvelous pigments" : {
		name : "Nolzur's Marvelous Pigments",
		nameAlt : "Marvelous Pigments",
		source : [["SRD", 230], ["D", 183]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "D",
		description : "This wooden box contains a brush and 1d4 pots of paint. Each pot contains enough paint to cover 1000 sq ft, which can turn into 10000 cu ft of inanimate objects or terrain features. Those become real upon completion of a painting. It takes 10 min to paint 100 sq ft. Nothing created can have a value over 25 gp.",
		descriptionLong : "This wooden box contains a brush and 1d4 pots of paint. Each pot contains enough paint to cover 1000 sq ft, which can turn into 10000 cu ft of nonmagical inanimate objects or terrain features. Those become real upon completion of a painting. It takes 10 min to paint 100 sq ft. Nothing created can have a value over 25 gp and objects appearing of greater value look authentic but don't hold up to closer inspection. I can use this to paint, for example, a door on a wall and then walk through it, or a pit on the floor and have my enemies fall into it. I can't use this to form energy that deals damage, like fire or lightning.",
		descriptionFull : "Typically found in 1d4 pots inside a fine wooden box with a brush (weighing 1 pound in total), these pigments allow you to create three-dimensional objects by painting them in two dimensions. The paint flows from the brush to form the desired object as you concentrate on its image.\n   Each pot of paint is sufficient to cover 1,000 square feet of a surface, which lets you create inanimate objects or terrain features\u2014such as a door, a pit, flowers, trees, cells, rooms, or weapons\u2014that are up to 10,000 cubic feet. It takes 10 minutes to cover 100 square feet.\n   When you complete the painting, the object or terrain feature depicted becomes a real, nonmagical object. Thus, painting a door on a wall creates an actual door that can be opened to whatever is beyond. Painting a pit on a floor creates a real pit, and its depth counts against the total area of objects you create.\n   Nothing created by the pigments can have a value greater than 25 gp. If you paint an object of greater value (such as a diamond or a pile of gold), the object looks authentic, but close inspection reveals it is made from paste, bone, or some other worthless material.\n   If you paint a form of energy such as fire or lightning, the energy appears but dissipates as soon as you complete the painting, doing no harm to anything.",
		weight : 1
	},
	"nine lives stealer" : {
		name : "Nine Lives Stealer",
		source : [["SRD", 231], ["D", 183]],
		type : "weapon (any sword)",
		rarity : "very rare",
		magicItemTable : "H",
		attunement : true,
		description : "I have a +2 bonus to attack and damage rolls with this magic sword. It has 1d8+1 charges and if it inflicts a critical hit while it has charges left on a creature with fewer than 100 HP (and that is not a construct or undead), the target must make a DC 15 Con save or die. If it dies, the sword uses a charge.",
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
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*(9|nine))(?=.*(lives|life))(?=.*stealer).*$/i).test(v.WeaponTextName)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + 'On crit to target <100 HP, DC 15 Con save or die';
					}
				},
				'If I include the words "Nine Lives Stealer" in a the name of a sword, it will be treated as the magic weapon Nine Lives Stealer. It has +2 to hit and damage. Also, as long as it has charges left, when it does a critical hit against a creature with fewer than 100 HP, that creature must make a DC 15 Constitution saving throw or die.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*(9|nine))(?=.*(lives|life))(?=.*stealer).*$/i).test(v.WeaponTextName)) {
						output.magic = v.thisWeapon[1] + 2;
					}
				}, ''
			]
		}
	},
	"oathbow" : {
		name : "Oathbow",
		source : [["SRD", 231], ["D", 183]],
		type : "weapon (longbow)",
		rarity : "very rare",
		magicItemTable : "H",
		description : "When I attack with this longbow and say its command phrase, I make the target my sworn enemy if I don't have one already for 7 days or until it dies. Attacks with this bow vs. it get adv, +3d6 damage, ignore cover (not full), and suffer no disadv. from long range. While it lives, I have disadv. when I use other weapons.",
		descriptionLong : "When I use this weapon to make a ranged attack and say its command phrase \"Swift death to you who have wronged me.\", the target of that attack becomes my sworn enemy until it dies or until dawn seven days later. I can have only one such sworn enemy at a time and when it dies, I can choose a new one after the next dawn. My ranged attack rolls with this weapon against me sworn enemy have advantage, do +3d6 piercing damage, ignore all cover except full, and don't suffer disadvantage due to long range. While my sworn enemy lives, I have disadvantage on attack rolls with all other weapons.",
		descriptionFull : 'When you nock an arrow on this bow, it whispers in Elvish, "Swift defeat to my enemies." When you use this weapon to make a ranged attack, you can, as a command phrase, say, "Swift death to you who have wronged me." The target of your attack becomes your sworn enemy until it dies or until dawn seven days later. You can have only one such sworn enemy at a time. When your sworn enemy dies, you can choose a new one after the next dawn.\n   When you make a ranged attack roll with this weapon against your sworn enemy, you have advantage on the roll. In addition, your target gains no benefit from cover, other than total cover, and you suffer no disadvantage due to long range. If the attack hits, your sworn enemy takes an extra 3d6 piercing damage.\n   While your sworn enemy lives, you have disadvantage on attack rolls with all other weapons.',
		attunement : true,
		weight : 2,
		weaponsAdd : ["Oathbow"],
		weaponOptions : {
			baseWeapon : "longbow",
			regExpSearch : /oathbow/i,
			name : "Oathbow",
			source : [["SRD", 231], ["D", 183]],
			description : "Ammunition, heavy, two-handed; Vs. sworn enemy: adv, +3d6 damage, no cover/range penalties"
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
		notLegalAL : true,
		description : "Once as an action, I can drink this rose-hued liquid or administer it to another. The consumer is charmed for 1 hour by the first creature it sees within 10 minutes of drinking it. If that creature is of a species and gender the consumer is normally attracted to, it regards the creature as its true love while it is charmed.",
		descriptionFull : "The next time you see a creature within 10 minutes after drinking this philter, you become charmed by that creature for 1 hour. If the creature is of a species and gender you are normally attracted to, you regard it as your true love while you are charmed. This potion's rose-hued, effervescent liquid contains one easy-to-miss bubble shaped like a heart.",
		weight : 0.5
	},
	"pipes of haunting" : { // contains contributions by Soilentbrad
		name : "Pipes of Haunting",
		source : [["SRD", 232], ["D", 185]],
		type : "wondrous item (instrument)",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "These pipes have 3 charges and regain 1d3 expended charges daily at dawn. As an action, I can use 1 charge to play them and have each (or only hostile) creature in 30 ft that can hear them make a DC 15 Wis save or be frightened of me for 1 minute. A target can repeat the save at the end of each of their turns.",
		descriptionLong : "These pipes have 3 charges. As an action, I can expend 1 charge to create an eerie, spellbinding tune. Each creature within 30 ft of me that can hear the pipes must make a DC 15 Wisdom saving throw or become frightened of me for 1 minute. If I wish, all creatures in the area that aren't hostile toward me automatically succeed on their saving throw. An affected creature can repeat the save at the end of each of its turns, ending the effect on itself on a success. A creature that succeeds on its saving throw is immune to the effect of these pipes for 24 hours. The pipes regain 1d3 expended charges daily at dawn.",
		descriptionFull : "You must be proficient with wind instruments to use these pipes. They have 3 charges. You can use an action to play them and expend 1 charge to create an eerie, spellbinding tune. Each creature within 30 feet of you that hears you play must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. If you wish, all creatures in the area that aren't hostile toward you automatically succeed on the saving throw. A creature that fails the saving throw can repeat it at the end of each of its turns, ending the effect on itself on a success. A creature that succeeds on its saving throw is immune to the effect of these pipes for 24 hours. The pipes regain 1d3 expended charges daily at dawn.",
		weight : 2,
		action : [["action", ""]],
		usages : 3,
		recovery : "dawn",
		additional : "regains 1d3",
		prerequisite : "Requires proficiency with wind instruments",
		prereqeval : function (v) {
			for (var i = 0; i < v.toolProfs.length; i++) {
				if ((/pipe|flute|horn|trumpet|horn|ocarina|sackbut|shawm|trombone|tuba|bombard|cornett|flageolet|^(?=.*(air|wind))(?=.*instrument).*$/i).test(v.toolProfs[i])) return true;
			}
		}
	},
	"pipes of the sewers" : { // contains contributions by Soilentbrad
		name : "Pipes of the Sewers",
		source : [["SRD", 232], ["D", 185]],
		type : "wondrous item (instrument)",
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
		additional : "regains 1d3",
		prerequisite: "Requires proficiency with wind instruments",
		prereqeval: function (v) {
			for (var i = 0; i < v.toolProfs.length; i++) {
				if ((/pipe|flute|horn|trumpet|horn|ocarina|sackbut|shawm|trombone|tuba|bombard|cornett|flageolet|^(?=.*(air|wind))(?=.*instrument).*$/i).test(v.toolProfs[i])) return true;
			}
		}
	},
	"plate armor of etherealness" : {
		name : "Plate Armor of Etherealness",
		source : [["SRD", 233], ["D", 185]],
		type : "armor (plate)",
		rarity : "legendary",
		magicItemTable : "I",
		description : "As an action while I'm wearing this plate armor, I can speak its command word to cast Etherealness on myself. This effect lasts for 10 minutes or until I remove the armor or use an action to speak the command word again. This property of the armor can't be used again until the next dawn.",
		descriptionFull : "While you're wearing this armor, you can speak its command word as an action to gain the effect of the Etherealness spell, which lasts for 10 minutes or until you remove the armor or use an action to speak the command word again. This property of the armor can't be used again until the next dawn.",
		attunement : true,
		weight : 65,
		usages : 1,
		recovery : "dawn",
		action : [["action", " (start/stop)"]],
		armorAdd : "Plate Armor of Etherealness",
		armorOptions : {
			regExpSearch : /^(?=.*plate)(?=.*etherealness).*$/i,
			name : "Plate Armor of Etherealness",
			source : [["SRD", 233], ["D", 185]],
			type : "heavy",
			ac : 18,
			stealthdis : true,
			weight : 65,
			strReq : 15
		},
		spellcastingBonus : {
			name : "once per dawn",
			spells : ["etherealness"],
			selection : ["etherealness"],
			firstCol : "oncelr"
		},
		spellChanges : {
			"etherealness" : {
				components : "V,M\u0192",
				duration : "10 min",
				description : "I go to Ethereal Plane; move there freely, but able to perceive 60 ft into the normal plane",
				changes : "Using the Plate Armor of Etherealness, I can cast Etherealness, but only on myself and it lasts only 10 minutes."
			}
		}
	},
	"portable hole" : {
		name : "Portable Hole",
		source : [["SRD", 233], ["D", 185]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "D",
		description : "As an action, I can unfold this black cloth, 6 ft in diameter, and place it on a solid surface, whereupon it creates a 10-ft deep extradimensional hole. It can't be used to create passages. The space is always the same, so I can store things and creatures in there. Removing it and folding it back takes an action.",
		descriptionLong : "As an action, I can unfold this circular black cloth, 6 ft in diameter, and place it on a solid surface, whereupon it creates a 10-ft deep extradimensional hole. It can't be used to create passages. Removing it and folding it back takes an action. The space created is always the same, so I can store things and creatures in there. The hole always weighs next to nothing. Creatures inside the folded up hole can breathe for 10 min and can escape as an action with a DC 10 Strength check, appearing next to me if they do. Placing the hole in another extradimensional space instantly destroys both and opens a gate to the Astral Plane.",
		descriptionFull : "This fine black cloth, soft as silk, is folded up to the dimensions of a handkerchief. It unfolds into a circular sheet 6 feet in diameter.\n   You can use an action to unfold a portable hole and place it on or against a solid surface, whereupon the portable hole creates an extradimensional hole 10 feet deep. The cylindrical space within the hole exists on a different plane, so it can't be used to create open passages. Any creature inside an open portable hole can exit the hole by climbing out of it.\n   You can use an action to close a portable hole by taking hold of the edges of the cloth and folding it up. Folding the cloth closes the hole, and any creatures or objects within remain in the extradimensional space. No matter what's in it, the hole weighs next to nothing.\n   If the hole is folded up, a creature within the hole's extradimensional space can use an action to make a DC 10 Strength check. On a successful check, the creature forces its way out and appears within 5 feet of the portable hole or the creature carrying it. A breathing creature within a closed portable hole can survive for up to 10 minutes, after which time it begins to suffocate.\n   Placing a portable hole inside an extradimensional space created by a bag of holding, Heward's handy haversack, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.",
		action : [["action", " (place/fold)"]]
	},
	"potion of animal friendship" : {
		name : "Potion of Animal Friendship",
		source : [["SRD", 233], ["D", 187]],
		type : "potion",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "Once as an action, I can drink this potion or administer it to another to be able to cast the Animal Friendship spell for 1 hour at will, charming beasts with Int < 4 for 1 hour if it fails a DC 13 Wis save. Agitating this muddy liquid brings little bits into view: a fish scale, a hummingbird tongue, a cat claw, or a squirrel hair.",
		descriptionFull : "When you drink this potion, you can cast the Animal Friendship spell (save DC 13) for 1 hour at will. Agitating this muddy liquid brings little bits into view: a fish scale, a hummingbird tongue, a cat claw, or a squirrel hair.",
		weight : 0.5,
		extraTooltip : "AL: can always be bought for 100 gp"
	},
	"potion of clairvoyance" : {
		name : "Potion of Clairvoyance",
		source : [["SRD", 233], ["D", 187]],
		type : "potion",
		rarity : "rare",
		magicItemTable : "C",
		description : "Once as an action, I can drink this potion or administer it to another to gain the effect of the Clairvoyance spell. This creates an invisible sensor within 1 mile, in a familiar or obvious location, that the consumer can see or hear through. An eyeball bobs in this yellowish liquid but vanishes when the potion is opened.",
		descriptionFull : "When you drink this potion, you gain the effect of the Clairvoyance spell. An eyeball bobs in this yellowish liquid but vanishes when the potion is opened.",
		weight : 0.5
	},
	"potion of climbing" : {
		name : "Potion of Climbing",
		source : [["SRD", 233], ["D", 187]],
		type : "potion",
		rarity : "common",
		magicItemTable : "A",
		description : "Once as an action, I can drink this potion or administer it to another to gain, for 1 hour, a climbing speed equal to the consumer's walking speed and adv. on Str (Athletics) checks to climb. The potion is separated into brown, silver, and gray layers resembling bands of stone. Shaking it fails to mix the colors.",
		descriptionFull : "When you drink this potion, you gain a climbing speed equal to your walking speed for 1 hour. During this time, you have advantage on Strength (Athletics) checks you make to climb. The potion is separated into brown, silver, and gray layers resembling bands of stone. Shaking the bottle fails to mix the colors.",
		weight : 0.5,
		extraTooltip : "AL: can always be bought for 75 gp"
	},
	"potion of diminution" : {
		name : "Potion of Diminution",
		source : [["SRD", 233], ["D", 187]],
		type : "potion",
		rarity : "rare",
		magicItemTable : "C",
		description : "Once as an action, I can drink this potion or administer it to another to be reduced as per the Enlarge/Reduce spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously contracts to a tiny bead and then expands to color the clear liquid around it.",
		descriptionLong : "Once as an action, I can drink this potion or administer it to another to be reduced as per the Enlarge/Reduce spell for 1d4 hours (no concentration required). This causes the consumer to decrease one size category as it halves in size in all dimensions and its weight is reduced to one-eight of normal. Its weapon attacks deal -1d4 damage (min 1) and it has disadvantage on Strength checks and saving throws. The red in the potion's liquid continuously contracts to a tiny bead and then expands to color the clear liquid around it. Shaking the bottle fails to interrupt this process.",
		descriptionFull : "When you drink this potion, you gain the \"reduce\" effect of the Enlarge/Reduce spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously contracts to a tiny bead and then expands to color the clear liquid around it. Shaking the bottle fails to interrupt this process.",
		weight : 0.5
	},
	"potion of flying" : {
		name : "Potion of Flying",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "very rare",
		magicItemTable : "D",
		description : "Once as an action, I can drink this potion or administer it to another to gain a flying speed equal to the consumer's walking speed for 1 hour and be able to hover. When the potion wears off, the consumer falls. This potion's clear liquid floats at the top of its container and has cloudy white impurities drifting in it.",
		descriptionFull : "When you drink this potion, you gain a flying speed equal to your walking speed for 1 hour and can hover. If you're in the air when the potion wears off, you fall unless you have some other means of staying aloft. This potion's clear liquid floats at the top of its container and has cloudy white impurities drifting in it.",
		weight : 0.5
	},
	"potion of gaseous form" : {
		name : "Potion of Gaseous Form",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "rare",
		magicItemTable : "C",
		description : "Once as an action, I can drink this potion or administer it to another to gain the effect of the Gaseous Form spell for 1 hour (no concentration required), until the consumer drops to 0 HP, or ends the effect as a bonus action. This potion's container seems to hold fog that moves and pours like water.",
		descriptionLong : "Once as an action, I can drink this potion or administer it to another to gain the effect of the Gaseous Form spell for 1 hour (no concentration required), until the consumer drops to 0 HP, or ends the effect as a bonus action. The consumer, along with everything it's wearing and carrying, transforms into a misty cloud. In this form, it can only move by flying at 10 ft speed, can hover, can't fall, has resistance to nonmagical damage, adv. on Str, Dex, and Con saves, can pass through mere cracks, but can't talk, manipulate items, cast spells, or attack. This container seems to hold fog that moves and pours like water.",
		descriptionFull : "When you drink this potion, you gain the effect of the Gaseous Form spell for 1 hour (no concentration required) or until you end the effect as a bonus action. This potion's container seems to hold fog that moves and pours like water.",
		weight : 0.5
	},
	"potion of giant strength" : {
		name : "Potion of Giant Strength",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		description : "Once as an action, I can drink this potion or administer it to another to change the consumer's Strength score for 1 hour. The number of this score depends on the type of giant from which a sliver of fingernail is floating in this potions' transparent liquid.",
		descriptionFull : "When you drink this potion, your Strength score changes for 1 hour. The type of giant determines the score (see the table below). The potion has no effect on you if your Strength is equal to or greater than that score.\n   This potion's transparent liquid has floating in it a sliver of fingernail from a giant of the appropriate type. The potion of frost giant strength and the potion of stone giant strength have the same effect.\n\n" + toUni("Type\t\tStr\tRarity") + "\nHill giant\t\t21\tUncommon\nStone/frost giant\t23\tRare\nFire giant   \t25\tRare\nCloud giant\t27\tVery rare\nStorm giant\t29\tLegendary",
		weight : 0.5,
		allowDuplicates : true,
		choices : ["Hill (Str 21, uncommon)", "Frost (Str 23, rare)", "Stone (Str 23, rare)", "Fire (Str 25, rare)", "Cloud (Str 27, very rare)", "Storm (Str 29, legendary)"],
		"hill (str 21, uncommon)" : {
			name : "Potion of Hill Giant Strength",
			sortname : "Potion of Giant Strength, Hill (Str 21)",
			rarity : "uncommon",
			magicItemTable : "B",
			description : "Once as an action, I can drink this potion or administer it to another to change the consumer's Strength score to 21 for 1 hour. This potion has no effect if the consumer's Strength score is already equal or higher. This potion's transparent liquid has floating in it a sliver of fingernail from a hill giant.",
			descriptionFull : "When you drink this potion, your Strength score changes to 21 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score.\n   This potion's transparent liquid has floating in it a sliver of fingernail from a hill giant."
		},
		"frost (str 23, rare)" : {
			name : "Potion of Frost Giant Strength",
			sortname : "Potion of Giant Strength, Frost (Str 23)",
			rarity : "rare",
			magicItemTable : "C",
			description : "Once as an action, I can drink this potion or administer it to another to change the consumer's Strength score to 23 for 1 hour. This potion has no effect if the consumer's Strength score is already equal or higher. This potion's transparent liquid has floating in it a sliver of fingernail from a frost giant.",
			descriptionFull : "When you drink this potion, your Strength score changes to 23 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score.\n   This potion's transparent liquid has floating in it a sliver of fingernail from a frost giant."
		},
		"stone (str 23, rare)" : {
			name : "Potion of Stone Giant Strength",
			sortname : "Potion of Giant Strength, Stone (Str 23)",
			rarity : "rare",
			magicItemTable : "C",
			description : "Once as an action, I can drink this potion or administer it to another to change the consumer's Strength score to 23 for 1 hour. This potion has no effect if the consumer's Strength score is already equal or higher. This potion's transparent liquid has floating in it a sliver of fingernail from a stone giant.",
			descriptionFull : "When you drink this potion, your Strength score changes to 23 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score.\n   This potion's transparent liquid has floating in it a sliver of fingernail from a stone giant."
		},
		"fire (str 25, rare)" : {
			name : "Potion of Fire Giant Strength",
			sortname : "Potion of Giant Strength, Fire (Str 25)",
			rarity : "rare",
			magicItemTable : "C",
			description : "Once as an action, I can drink this potion or administer it to another to change the consumer's Strength score to 25 for 1 hour. This potion has no effect if the consumer's Strength score is already equal or higher. This potion's transparent liquid has floating in it a sliver of fingernail from a fire giant.",
			descriptionFull : "When you drink this potion, your Strength score changes to 25 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score.\n   This potion's transparent liquid has floating in it a sliver of fingernail from a fire giant."
		},
		"cloud (str 27, very rare)" : {
			name : "Potion of Cloud Giant Strength",
			sortname : "Potion of Giant Strength, Cloud (Str 27)",
			rarity : "very rare",
			magicItemTable : "D",
			description : "Once as an action, I can drink this potion or administer it to another to change the consumer's Strength score to 27 for 1 hour. This potion has no effect if the consumer's Strength score is already equal or higher. This potion's transparent liquid has floating in it a sliver of fingernail from a cloud giant.",
			descriptionFull : "When you drink this potion, your Strength score changes to 27 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score.\n   This potion's transparent liquid has floating in it a sliver of fingernail from a cloud giant."
		},
		"storm (str 29, legendary)" : {
			name : "Potion of Storm Giant Strength",
			sortname : "Potion of Giant Strength, Storm (Str 29)",
			rarity : "legendary",
			magicItemTable : "E",
			description : "Once as an action, I can drink this potion or administer it to another to change the consumer's Strength score to 29 for 1 hour. This potion has no effect if the consumer's Strength score is already equal or higher. This potion's transparent liquid has floating in it a sliver of fingernail from a storm giant.",
			descriptionFull : "When you drink this potion, your Strength score changes to 29 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score.\n   This potion's transparent liquid has floating in it a sliver of fingernail from a storm giant."
		}
	},
	"potion of growth" : {
		name : "Potion of Growth",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "Once as an action, I can drink this potion or administer it to another to be enlarged as per the Enlarge/Reduce spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously expands from a tiny bead to color the clear liquid around it and then contracts.",
		descriptionLong : "Once as an action, I can drink this potion or administer it to another to be enlarged as per the Enlarge/Reduce spell for 1d4 hours (no concentration required). This causes the consumer to grow one size category as it doubles in size in all dimensions and its weight is multiplied by eight. This growth stops early if the encompassing space is fully filled. Its weapon attacks deal +1d4 damage and it has advantage on Strength checks and saving throws. The red in the potion's liquid continuously expands from a tiny bead to color the clear liquid around it and then contracts. Shaking the bottle fails to interrupt this process.",
		descriptionFull : "When you drink this potion, you gain the \"enlarge\" effect of the Enlarge/Reduce spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously expands from a tiny bead to color the clear liquid around it and then contracts. Shaking the bottle fails to interrupt this process.",
		weight : 0.5
	},
	"potion of healing" : {
		name : "Potion of Healing",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		description : "Once as an action, I can drink this potion or administer it to another to heal a number of hit points depending on the type of potion. This potion's red liquid glimmers when agitated.",
		descriptionFull : "You regain hit points when you drink this potion. The number of hit points depends on the potion's rarity, as shown in the Potions of Healing table. Whatever its potency, the potion's red liquid glimmers when agitated.",
		weight : 0.5,
		allowDuplicates : true,
		choices : ["Healing (2d4+2, common)", "Greater Healing (4d4+4, uncommon)", "Superior Healing (8d4+8, rare)", "Supreme Healing (10d4+20, very rare)"],
		"healing (2d4+2, common)" : {
			name : "Potion of Healing  ",
			rarity : "common",
			magicItemTable : "A",
			description : "Once as an action, I can drink this potion or administer it to another to regain 2d4+2 hit points. This potion's red liquid glimmers when agitated.",
			descriptionFull : "You regain 2d4+2 hit points when you drink this potion. The potion's red liquid glimmers when agitated.",
			extraTooltip : "Can be bought for 50 gp (also in AL)"
		},
		"greater healing (4d4+4, uncommon)" : {
			name : "Potion of Greater Healing",
			sortname : "Potion of Healing, Greater",
			rarity : "uncommon",
			magicItemTable : ["A", "B"],
			description : "Once as an action, I can drink this potion or administer it to another to regain 4d4+4 hit points. This potion's red liquid glimmers when agitated.",
			descriptionFull : "You regain 4d4+4 hit points when you drink this potion. The potion's red liquid glimmers when agitated.",
			extraTooltip : "AL: can always be bought for 100 gp"
		},
		"superior healing (8d4+8, rare)" : {
			name : "Potion of Superior Healing",
			sortname : "Potion of Healing, Superior",
			rarity : "rare",
			magicItemTable : "C",
			description : "Once as an action, I can drink this potion or administer it to another to regain 8d4+8 hit points. This potion's red liquid glimmers when agitated.",
			descriptionFull : "You regain 8d4+8 hit points when you drink this potion. The potion's red liquid glimmers when agitated.",
			extraTooltip : "AL: can always be bought for 500 gp"
		},
		"supreme healing (10d4+20, very rare)" : {
			name : "Potion of Supreme Healing",
			sortname : "Potion of Healing, Supreme",
			rarity : "very rare",
			magicItemTable : ["D", "E"],
			description : "Once as an action, I can drink this potion or administer it to another to regain 10d4+20 hit points. This potion's red liquid glimmers when agitated.",
			descriptionFull : "You regain 10d4+20 hit points when you drink this potion. The potion's red liquid glimmers when agitated.",
			extraTooltip : "AL: can always be bought for 5000 gp"
		}
	},
	"potion of heroism" : {
		name : "Potion of Heroism",
		source : [["SRD", 234], ["D", 188]],
		type : "potion",
		rarity : "rare",
		magicItemTable : "C",
		description : "Once as an action, I can drink this potion or administer it to another to gain 10 temporary hit points for 1 hour. For the same duration, the consumer is under the effect of the Bless spell (no concentration required), which adds +1d4 on all attack rolls and saving throws. This blue potion bubbles and steams as if boiling.",
		descriptionFull : "For 1 hour after drinking it, you gain 10 temporary hit points that last for 1 hour. For the same duration, you are under the effect of the Bless spell (no concentration required). This blue potion bubbles and steams as if boiling.",
		weight : 0.5
	},
	"potion of invisibility" : {
		name : "Potion of Invisibility",
		source : [["SRD", 234], ["D", 188]],
		type : "potion",
		rarity : "very rare",
		magicItemTable : "D",
		description : "Once as an action, I can drink this potion or administer it to another to become invisible for 1 hour. Anything the consumer wears or carries is invisible along with it. The effect ends early the consumer attacks or casts a spell. This potion's container looks empty but feels as though it holds liquid.",
		descriptionFull : "This potion's container looks empty but feels as though it holds liquid. When you drink it, you become invisible for 1 hour. Anything you wear or carry is invisible with you. The effect ends early if you attack or cast a spell.",
		weight : 0.5,
		extraTooltip : "AL: can always be bought for 5000 gp"
	},
	"potion of mind reading" : {
		name : "Potion of Mind Reading",
		source : [["SRD", 234], ["D", 188]],
		type : "potion",
		rarity : "rare",
		magicItemTable : "C",
		description : "Once as an action, I can drink this potion or administer it to another to gain the effect of the Detect Thoughts spell (save DC 13) for 1 minute. The potion's dense, purple liquid has an ovoid cloud of pink floating in it.",
		descriptionFull : "When you drink this potion, you gain the effect of the Detect Thoughts spell (save DC 13). The potion's dense, purple liquid has an ovoid cloud of pink floating in it.",
		weight : 0.5
	},
	"potion of poison" : {
		name : "Potion of Poison",
		source : [["SRD", 234], ["D", 188]],
		type : "potion",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "The consumer of this potion takes 3d6 poison damage and must make a DC 13 Con save or be poisoned. While poisoned this way, it takes 3d6 poison damage at the start of each of its turns and can repeat the save at the end of each of its turns to lower subsequent damage by 1d6. The poison ends when it reaches 0.",
		descriptionLong : "This concoction looks, smells, and tastes like a potion of healing or other beneficial potion. However, whomever consumes it takes 3d6 poison damage and must make a DC 13 Con save or be poisoned. While poisoned this way, the consumer takes 3d6 poison damage at the start of each of its turns. At the end of each of the consumer's turns, it can repeat the saving throw. On a successful save, the poison damage on subsequent turns decreases by 1d6. The poison ends when the damage decreases to 0.",
		descriptionFull : "This concoction looks, smells, and tastes like a potion of healing or other beneficial potion. However, it is actually poison masked by illusion magic. An Identify spell reveals its true nature.\n   If you drink it, you take 3d6 poison damage, and you must succeed on a DC 13 Constitution saving throw or be poisoned. At the start of each of your turns while you are poisoned in this way, you take 3d6 poison damage. At the end of each of your turns, you can repeat the saving throw. On a successful save, the poison damage you take on your subsequent turns decreases by 1d6. The poison ends when the damage decreases to 0.",
		weight : 0.5
	},
	"potion of resistance" : {
		name : "Potion of Resistance",
		source : [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "Once as an action, I can drink this potion or administer it to another to gain resistance to one damage type for 1 hour.",
		descriptionFull : "When you drink this potion, you gain resistance to one type of damage for 1 hour. The DM chooses the type or determines it randomly from the options below.\n\n" + toUni("d10\tType\t\td10\tType") + "\n 1\tAcid\t\t 6\tNecrotic\n 2\tCold\t\t 7\tPoison\n 3\tFire\t\t 8\tPsychic\n 4\tForce\t\t 9\tRadiant\n 5\tLightning   \t 10\tThunder",
		weight : 0.5,
		allowDuplicates : true,
		choices : ["Acid", "Cold", "Fire", "Force", "Lightning", "Necrotic", "Poison", "Psychic", "Radiant", "Thunder"],
		choicesNotInMenu : true,
		"acid" : {
			name : "Potion of Acid Resistance",
			description : "Once as an action, I can drink this potion or administer it to another to gain resistance to acid damage for 1 hour."
		},
		"cold" : {
			name : "Potion of Cold Resistance",
			description : "Once as an action, I can drink this potion or administer it to another to gain resistance to cold damage for 1 hour."
		},
		"fire" : {
			name : "Potion of Fire Resistance",
			description : "Once as an action, I can drink this potion or administer it to another to gain resistance to fire damage for 1 hour."
		},
		"force" : {
			name : "Potion of Force Resistance",
			description : "Once as an action, I can drink this potion or administer it to another to gain resistance to force damage for 1 hour."
		},
		"lightning" : {
			name : "Potion of Lightning Resistance",
			description : "Once as an action, I can drink this potion or administer it to another to gain resistance to lightning damage for 1 hour."
		},
		"necrotic" : {
			name : "Potion of Necrotic Resistance",
			description : "Once as an action, I can drink this potion or administer it to another to gain resistance to necrotic damage for 1 hour."
		},
		"poison" : {
			name : "Potion of Poison Resistance",
			description : "Once as an action, I can drink this potion or administer it to another to gain resistance to poison damage for 1 hour."
		},
		"psychic" : {
			name : "Potion of Psychic Resistance",
			description : "Once as an action, I can drink this potion or administer it to another to gain resistance to psychic damage for 1 hour."
		},
		"radiant" : {
			name : "Potion of Radiant Resistance",
			description : "Once as an action, I can drink this potion or administer it to another to gain resistance to radiant damage for 1 hour."
		},
		"thunder" : {
			name : "Potion of Thunder Resistance",
			description : "Once as an action, I can drink this potion or administer it to another to gain resistance to thunder damage for 1 hour."
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
	"potion of water breathing" : {
		name : "Potion of Water Breathing",
		source : [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "Once as an action, I can drink this potion or administer it to another to be able to breathe underwater for 1 hour after drinking this potion. Its cloudy green fluid smells of the sea and has a jellyfish-like bubble floating in it.",
		descriptionFull : "You can breathe underwater for 1 hour after drinking this potion. Its cloudy green fluid smells of the sea and has a jellyfish-like bubble floating in it.",
		weight : 0.5,
		extraTooltip : "AL: can always be bought for 100 gp"
	},
	"quaal's feather token" : {
		name : "Quaal's Feather Token",
		nameAlt : "Feather Token",
		source : [["SRD", 221], ["D", 188]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "C",
		descriptionFull : "This tiny object looks like a feather. Different types of feather tokens exist, each with a different single-use effect. The DM chooses the kind of token or determines it randomly.\n\n" + toUni("d100\tToken\td100\tToken") +
		"\n01-20\tAnchor\t51-65\tSwan boat" +
		"\n21-35\tBird   \t66-90\tTree" +
		"\n36-50\tFan   \t91-00\tWhip",
		allowDuplicates : true,
		choices : ["Anchor", "Bird", "Fan", "Swan Boat", "Tree", "Whip"],
		"anchor" : {
			description : "This tiny object looks like a feather. As an action, I can touch the token to a boat or ship. For the next 24 hours, the vessel can't be moved by any means. Touching the token to the vessel again ends the effect early. When the effect ends, the token disappears.",
			descriptionFull : "This tiny object looks like a feather. You can use an action to touch the token to a boat or ship. For the next 24 hours, the vessel can't be moved by any means. Touching the token to the vessel again ends the effect. When the effect ends, the token disappears.",
			action : [["action", ""]]
		},
		"bird" : {
			description : "As an action, I can toss this token into the air and it turns into a roc. It obeys my simple commands, can't attack, can carry 500 lb while flying (16 miles per hour or 144 miles per day, as it rests 1 hour per 3 of flying), or double that at half speed. It disappears after a day, i it drops to 0 HP, or if I use an action to make it.",
			descriptionFull : "This tiny object looks like a feather. You can use an action to toss the token 5 feet into the air. The token disappears and an enormous, multicolored bird takes its place. The bird has the statistics of a roc, but it obeys your simple commands and can't attack. It can carry up to 500 pounds while flying at its maximum speed (16 miles an hour for a maximum of 144 miles per day. with a one-hour rest for every 3 hours of flying), or 1,000 pounds at half that speed. The bird disappears after flying its maximum distance for a day or if it drops to 0 hit points. You can dismiss the bird as an action.",
			action : [["action", " (use/dismiss)"]]
		},
		"fan" : {
			description : "As an action when I'm on a boat or ship, I can toss this token up to 10 ft in the air. The token disappears, and a giant flapping fan takes its place. The fan floats and creates a wind strong enough to fill the sails of one ship, increasing its speed by 5 miles per hour for 8 hours. I can dismiss the fan as an action.",
			descriptionFull : "This tiny object looks like a feather. If you are on a boat or ship, you can use an action to toss the token up to 10 feet in the air. The token disappears, and a giant flapping fan takes its place. The fan floats and creates a wind strong enough to fill the sails of one ship, increasing its speed by 5 miles per hour for 8 hours. You can dismiss the fan as an action.",
			action : [["action", " (create/dismiss)"]]
		},
		"swan boat" : {
			description : "As an action, I can touch the token to a body of water at least 60-ft in diameter, having it turn into a 50 ft by 20 ft boat shaped like a swan that remains for 24 hours. It moves itself at 6 miles per hour. As an action, I can command it to turn up to 90°. It can hold up to 32 Medium creatures (Large count as 4, Huge as 9).",
			descriptionFull : "This tiny object looks like a feather. You can use an action to touch the token to a body of water at least 60 feet in diameter. The token disappears, and a 50-foot-long, 20-foot-wide boat shaped like a swan takes its place. The boat is self-propelled and moves across water at a speed of 6 miles per hour. You can use an action while on the boat to command it to move or to turn up to 90 degrees. The boat can carry up to thirty-two Medium or smaller creatures. A Large creature counts as four Medium creatures, while a Huge creature counts as nine. The boat remains for 24 hours and then disappears. You can dismiss the boat as an action.",
			action : [["action", " (create/dismiss)"]]
		},
		"tree" : {
			description : "This tiny object looks like a feather. As an action, I can touch it to an unoccupied space on the ground. If this is done outdoors, the token disappears, and in its place a nonmagical oak tree springs into existence. The tree is 60 ft tall and has a 5-ft diameter trunk, and its branches at the top spread out in a 20-ft radius.",
			descriptionFull : "This tiny object looks like a feather. You must be outdoors to use this token. You can use an action to touch it to an unoccupied space on the ground. The token disappears, and in its place a nonmagical oak tree springs into existence. The tree is 60 feet tall and has a 5-foot-diameter trunk, and its branches at the top spread out in a 20-foot radius.",
			action : [["action", ""]]
		},
		"whip" : {
			description : "As an action, can throw the token 10 ft, where it turns into a floating whip for 1 hour, until I use an action to dismiss it, I die, or I become incapacitated. As a bonus action, I can have it fly 20 ft and make a melee spell attack against a creature within 10 ft of it, with a +9 to hit and dealing 1d6+5 force damage.",
			descriptionFull : "This tiny object looks like a feather. You can use an action to throw the token to a point within 10 feet of you. The token disappears, and a floating whip takes its place. You can then use a bonus action to make a melee spell attack against a creature within 10 feet of the whip, with an attack bonus of +9. On a hit, the target takes 1d6+5 force damage.\n   As a bonus action on your turn, you can direct the whip to fly up to 20 feet and repeat the attack against a creature within 10 feet of it. The whip disappears after 1 hour, when you use an action to dismiss it, or when you are incapacitated or die.",
			action : [["action", " (create)"], ["bous action", " (direct)"]]
		}
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
	"ring of animal influence" : {
		name : "Ring of Animal Influence",
		source : [["SRD", 235], ["D", 189]],
		type : "ring",
		rarity : "rare",
		magicItemTable : "G",
		description : "This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. As an action while wearing the ring, I can expend 1 of its charges to cast a spell (save DC 13): Animal Friendship, Speak with Animals, or Fear. Fear cast from this ring can target only beasts that have an Intelligence of 3 or lower.",
		descriptionFull : "This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing the ring, you can use an action to expend 1 of its charges to cast one of the following spells:\n \u2022 Animal Friendship (save DC 13)\n \u2022 Fear (save DC 13), targeting only beasts that have an Intelligence of 3 or lower\n \u2022 Speak with Animals",
		usages : 3,
		recovery : "dawn",
		additional : "regains 1d3",
		fixedDC : 13,
		spellFirstColTitle : "Ch",
		spellcastingBonus : [{
			name : "1 charge",
			spells : ["animal friendship", "speak with animals", "fear"],
			selection : ["animal friendship", "speak with animals", "fear"],
			firstCol : "1",
			times : 3
		}],
		spellChanges : {
			"fear" : {
				description : "All beasts Int<4 save or frightened, Dash to get away; extra save at end of turn if not in line of sight",
				changes : "Only affects beasts that have an Intelligence of 3 or lower."
			}
		}
	},
	"ring of djinni summoning" : {
		name : "Ring of Djinni Summoning",
		source : [["SRD", 235], ["D", 190]],
		type : "ring",
		rarity : "legendary",
		magicItemTable : "I",
		description : "As an action, I can speak this ring's command word to summon a djini within 120 ft, remaining while I concentrate, up to 1 hour. After that time, I can't summon it for 24 hours. It is friendly to me and my allies, obeys my commands, but takes no actions if not commanded to. The ring loses its magic If the djini dies.",
		descriptionFull : "While wearing this ring, you can speak its command word as an action to summon a particular djinni from the Elemental Plane of Air. The djinni appears in an unoccupied space you choose within 120 feet of you. It remains as long as you concentrate (as if concentrating on a spell), to a maximum of 1 hour, or until it drops to 0 hit points. It then returns to its home plane.\n   While summoned, the djinni is friendly to you and your companions. It obeys any commands you give it, no matter what language you use. If you fail to command it, the djinni defends itself against attackers but takes no other actions.\n   After the djinni departs, it can't be summoned again for 24 hours, and the ring becomes nonmagical if the djinni dies.",
		attunement : true,
		usages : 1,
		recovery : "24 hours"
	},
	"ring of elemental command" : {
		name : "Ring of Elemental Command",
		source : [["SRD", 235], ["D", 190]],
		type : "ring",
		rarity : "legendary",
		magicItemTable : "I",
		description : "Select one of the eight types of this ring, two for each of the elemental planes, with each ring having two option, its initial state and its 'unlocked' state that becomes available once you help slay an elemental of that plane while attuned to the ring.",
		descriptionFull : "This ring is linked to one of the four Elemental Planes. The GM chooses or randomly determines the linked plane.\n   While wearing this ring, you have advantage on attack rolls against elementals from the linked plane, and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the linked plane.\n   The ring has 5 charges. It regains 1d4 + 1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.",
		attunement : true,
		allowDuplicates : true,
		usages : 5,
		recovery : "dawn",
		additional : "regains 1d4+1",
		choices : ["Air", "Air (help kill air elemental while attuned)", "Earth", "Earth (help kill earth elemental while attuned)", "Fire", "Fire (help kill fire elemental while attuned)", "Water", "Water (help kill water elemental while attuned)"],
		"air" : {
			name : "Ring of Air Elemental Command",
			sortname : "Ring of Elemental Command, Air",
			description : "This ring has 5 charges and regains 1d4+1 daily at dawn. It grants me adv. on attacks vs. elementals from the Plane of Air and they have disadv. vs. me. I can expend 2 charges to cast Dominate Monster on an air elemental. When I fall, I descend 60 ft per round and take no falling damage. I also know Auran.",
			descriptionFull : "While wearing this ring, you have advantage on attack rolls against elementals from the Elemental Plane of Air, and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the Elemental Plane of Air.\n   The ring has 5 charges. It regains 1d4+1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n   You can expend 2 of the ring's charges to cast Dominate Monster on an air elemental. In addition, when you fall, you descend 60 feet per round and take no damage from falling. You can also speak and understand Auran.\n   If you help slay an air elemental while attuned to the ring, you gain access to the following additional properties:\n \u2022 You have resistance to lightning damage.\n \u2022 You have a flying speed equal to your walking speed and can hover.\n \u2022 You can cast the following spells from the ring, expending the necessary number of charges: Chain Lightning (3 charges), Gust of Wind (2 charges), or Wind Wall (1 charge).",
			languageProfs : ["Auran"],
			fixedDC : 17,
			spellFirstColTitle : "Ch",
			spellcastingBonus : {
				name : "2 charges",
				spells : ["dominate monster"],
				selection : ["dominate monster"],
				firstCol : 2
			},
			spellChanges : {
				"dominate monster" : {
					description : "Air elemental save or charmed, follows telepathic commands, 1 a for complete control; save on dmg",
					changes : "Can only affect an air elemental."
				}
			}
		},
		"air (help kill air elemental while attuned)" : {
			name : "Ring of Air Elemental Command [unlocked]",
			description : "This ring grants adv. on attacks vs. elementals from the Plane of Air while they have disadv. vs. me. I have resistance to lightning damage, flying speed equal to my walking speed. I fall at 60 ft per round and take no falling damage. I know Auran. I can cast spells by using its 5 charges, of which it regains 1d4+1 at dawn.",
			descriptionFull : "While wearing this ring, you have advantage on attack rolls against elementals from the Elemental Plane of Air, and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the Elemental Plane of Air.\n   The ring has 5 charges. It regains 1d4+1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n   You can expend 2 of the ring's charges to cast Dominate Monster on an air elemental. In addition, when you fall, you descend 60 feet per round and take no damage from falling. You can also speak and understand Auran.\n   If you help slay an air elemental while attuned to the ring, you gain access to the following additional properties:\n \u2022 You have resistance to lightning damage.\n \u2022 You have a flying speed equal to your walking speed and can hover.\n \u2022 You can cast the following spells from the ring, expending the necessary number of charges: Chain Lightning (3 charges), Gust of Wind (2 charges), or Wind Wall (1 charge).",
			languageProfs : ["Auran"],
			dmgres : ["Lightning"],
			speed : { fly : { spd : "walk", enc : "walk" } },
			fixedDC : 17,
			spellFirstColTitle : "Ch",
			spellcastingBonus : [{
				name : "1 charge",
				spells : ["wind wall"],
				selection : ["wind wall"],
				firstCol : 1
			}, {
				name : "2 charges",
				spells : ["dominate monster", "gust of wind"],
				selection : ["dominate monster", "gust of wind"],
				firstCol : 2,
				times : 2
			}, {
				name : "3 charges",
				spells : ["chain lightning"],
				selection : ["chain lightning"],
				firstCol : 3
			}],
			spellChanges : {
				"dominate monster" : {
					description : "Air elemental save or charmed, follows telepathic commands, 1 a for complete control; save on dmg",
					changes : "Can only affect an air elemental."
				}
			},
			limfeaname : "Ring of Air Elemental Command"
		},
		"earth" : {
			name : "Ring of Earth Elemental Command",
			sortname : "Ring of Elemental Command, Earth",
			description : "This ring has 5 charges and regains 1d4+1 daily at dawn. It grants me adv. on attacks vs. elementals from the Plane of Earth and they have disadv. vs. me. I can expend 2 charges to cast Dominate Monster on an earth elemental. I move normally in difficult terrain of rubble, rocks, or dirt. I also know Terran.",
			descriptionFull : "While wearing this ring, you have advantage on attack rolls against elementals from the Elemental Plane of Earth and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the Elemental Plane of Earth.\n   The ring has 5 charges. It regains 1d4+1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n   You can expend 2 of the ring's charges to cast Dominate Monster on an earth elemental. In addition, you can move in difficult terrain that is composed of rubble, rocks, or dirt as if it were normal terrain. You can also speak and understand Terran.\n   If you help slay an earth elemental while attuned to the ring, you gain access to the following additional properties:\n \u2022 You have resistance to acid damage.\n \u2022 You can move through solid earth or rock as if those areas were difficult terrain. If you end your turn there, you are shunted out to the nearest unoccupied space you last occupied.\n \u2022 You can cast the following spells from the ring, expending the necessary number of charges: Stone Shape (2 charges), Stoneskin (3 charges), or Wall of Stone (3 charges).",
			languageProfs : ["Terran"],
			fixedDC : 17,
			spellFirstColTitle : "Ch",
			spellcastingBonus : {
				name : "2 charges",
				spells : ["dominate monster"],
				selection : ["dominate monster"],
				firstCol : 2
			},
			spellChanges : {
				"dominate monster" : {
					description : "Earth elemental save or charmed, follows telepathic commands, 1 a for complete control; save on dmg",
					changes : "Can only affect an earth elemental."
				}
			}
		},
		"earth (help kill earth elemental while attuned)" : {
			name : "Ring of Earth Elemental Command [unlocked]",
			description : "This ring grants resistance to acid damage and adv. on attacks vs. elementals from the Plane of Earth while they have disadv. vs. me. I know Terran, move normally in difficult terrain of rubble, rocks, or dirt, and can move through solid earth or rock as if it were difficult terrain. I can cast spells by using its 5 charges.",
			descriptionFull : "While wearing this ring, you have advantage on attack rolls against elementals from the Elemental Plane of Earth and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the Elemental Plane of Earth.\n   The ring has 5 charges. It regains 1d4+1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n   You can expend 2 of the ring's charges to cast Dominate Monster on an earth elemental. In addition, you can move in difficult terrain that is composed of rubble, rocks, or dirt as if it were normal terrain. You can also speak and understand Terran.\n   If you help slay an earth elemental while attuned to the ring, you gain access to the following additional properties:\n \u2022 You have resistance to acid damage.\n \u2022 You can move through solid earth or rock as if those areas were difficult terrain. If you end your turn there, you are shunted out to the nearest unoccupied space you last occupied.\n \u2022 You can cast the following spells from the ring, expending the necessary number of charges: Stone Shape (2 charges), Stoneskin (3 charges), or Wall of Stone (3 charges).",
			languageProfs : ["Terran"],
			dmgres : ["Acid"],
			fixedDC : 17,
			spellFirstColTitle : "Ch",
			spellcastingBonus : [{
				name : "2 charges",
				spells : ["dominate monster", "stone shape"],
				selection : ["dominate monster", "stone shape"],
				firstCol : 2,
				times : 2
			}, {
				name : "3 charges",
				spells : ["stoneskin", "wall of stone"],
				selection : ["stoneskin", "wall of stone"],
				firstCol : 3,
				times : 2
			}],
			spellChanges : {
				"dominate monster" : {
					description : "Earth elemental save or charmed, follows telepathic commands, 1 a for complete control; save on dmg",
					changes : "Can only affect an earth elemental."
				}
			},
			limfeaname : "Ring of Earth Elemental Command"
		},
		"fire" : {
			name : "Ring of Fire Elemental Command",
			sortname : "Ring of Elemental Command, Fire",
			description : "This ring has 5 charges and regains 1d4+1 daily at dawn. It grants me adv. on attacks vs. elementals from the Plane of Fire and they have disadv. vs. me. I can expend 2 charges to cast Dominate Monster (DC 17) on a fire elemental. I have resistance to fire damage and can speak and understand Ignan.",
			descriptionFull : "While wearing this ring, you have advantage on attack rolls against elementals from the Elemental Plane of Fire and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the Elemental Plane of Fire.\n   The ring has 5 charges. It regains 1d4+1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n   You can expend 2 of the ring's charges to cast Dominate Monster on a fire elemental. In addition, you have resistance to fire damage. You can also speak and understand Ignan.\n   If you help slay a fire elemental while attuned to the ring, you gain access to the following additional properties:\n \u2022 You are immune to fire damage.\n \u2022 You can cast the following spells from the ring, expending the necessary number of charges: Burning Hands (1 charge), Fireball (2 charges), and Wall of Fire (3 charges).",
			languageProfs : ["Ignan"],
			dmgres : ["Fire"],
			fixedDC : 17,
			spellFirstColTitle : "Ch",
			spellcastingBonus : {
				name : "2 charges",
				spells : ["dominate monster"],
				selection : ["dominate monster"],
				firstCol : 2
			},
			spellChanges : {
				"dominate monster" : {
					description : "Fire elemental save or charmed, follows telepathic commands, 1 a for complete control; save on dmg",
					changes : "Can only affect a fire elemental."
				}
			}
		},
		"fire (help kill fire elemental while attuned)" : {
			name : "Ring of Fire Elemental Command [unlocked]",
			description : "This ring has 5 charges, regaining 1d4+1 at dawn. It grants me immunity to fire damage, adv. on attacks vs. elementals from the Plane of Fire and they have disadv. vs. me. I can expend charges to cast spells (DC 17), Burning Hands (1), Dominate Monster (1; fire elemental only), Fireball (2), Wall of Fire (3). I know Ignan.",
			descriptionFull : "While wearing this ring, you have advantage on attack rolls against elementals from the Elemental Plane of Fire and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the Elemental Plane of Fire.\n   The ring has 5 charges. It regains 1d4+1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n   You can expend 2 of the ring's charges to cast Dominate Monster on a fire elemental. In addition, you have resistance to fire damage. You can also speak and understand Ignan.\n   If you help slay a fire elemental while attuned to the ring, you gain access to the following additional properties:\n \u2022 You are immune to fire damage.\n \u2022 You can cast the following spells from the ring, expending the necessary number of charges: Burning Hands (1 charge), Fireball (2 charges), and Wall of Fire (3 charges).",
			languageProfs : ["Ignan"],
			savetxt : { immune : ["fire"] },
			fixedDC : 17,
			spellFirstColTitle : "Ch",
			spellcastingBonus : [{
				name : "1 charge",
				spells : ["burning hands"],
				selection : ["burning hands"],
				firstCol : 1
			}, {
				name : "2 charges",
				spells : ["dominate monster", "fireball"],
				selection : ["dominate monster", "fireball"],
				firstCol : 2,
				times : 2
			}, {
				name : "3 charges",
				spells : ["wall of fire"],
				selection : ["wall of fire"],
				firstCol : 3
			}],
			spellChanges : {
				"dominate monster" : {
					description : "Fire elemental save or charmed, follows telepathic commands, 1 a for complete control; save on dmg",
					changes : "Can only affect a fire elemental."
				}
			},
			limfeaname : "Ring of Fire Elemental Command"
		},
		"water" : {
			name : "Ring of Water Elemental Command",
			sortname : "Ring of Elemental Command, Water",
			description : "This ring has 5 charges, regaining 1d4+1 at dawn. It grants me adv. on attacks vs. elementals from the Plane of Water and they have disadv. vs. me. I can expend 2 charges to cast Dominate Monster on a water elemental. I can stand on and walk across liquid surfaces as if they were solid ground. I know Aquan.",
			descriptionFull : "While wearing this ring, you have advantage on attack rolls against elementals from the Elemental Plane of Water and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the Elemental Plane of Water.\n   The ring has 5 charges. It regains 1d4+1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n   You can expend 2 of the ring's charges to cast Dominate Monster on a water elemental. In addition, you can stand on and walk across liquid surfaces as if they were solid ground. You can also speak and understand Aquan.\n   If you help slay a water elemental while attuned to the ring, you gain access to the following additional properties:\n \u2022 You can breathe underwater and have a swimming speed equal to your walking speed.\n \u2022 You can cast the following spells from the ring, expending the necessary number of charges: Create or Destroy Water (1 charge), Control Water (3 charges), Ice Storm (2 charges), or Wall of Ice (3 charges).",
			languageProfs : ["Aquan"],
			fixedDC : 17,
			spellFirstColTitle : "Ch",
			spellcastingBonus : {
				name : "2 charges",
				spells : ["dominate monster"],
				selection : ["dominate monster"],
				firstCol : 2
			},
			spellChanges : {
				"dominate monster" : {
					description : "Water elemental save or charmed, follows telepathic commands, 1 a for complete control; save on dmg",
					changes : "Can only affect a water elemental."
				}
			}
		},
		"water (help kill water elemental while attuned)" : {
			name : "Ring of Water Elemental Command [unlocked]",
			description : "This ring gives me adv. on attacks vs. elementals from the Plane of Water while they have disadv. vs. me. I know Aquan, can stand and walk on liquid surfaces as if they were solid ground, swim at my walking speed, and breathe underwater.  I can cast spells by using the ring's 5 charges, of which it regains 1d4+1 at dawn.",
			descriptionFull : "While wearing this ring, you have advantage on attack rolls against elementals from the Elemental Plane of Water and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the Elemental Plane of Water.\n   The ring has 5 charges. It regains 1d4+1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n   You can expend 2 of the ring's charges to cast Dominate Monster on a water elemental. In addition, you can stand on and walk across liquid surfaces as if they were solid ground. You can also speak and understand Aquan.\n   If you help slay a water elemental while attuned to the ring, you gain access to the following additional properties:\n \u2022 You can breathe underwater and have a swimming speed equal to your walking speed.\n \u2022 You can cast the following spells from the ring, expending the necessary number of charges: Create or Destroy Water (1 charge), Control Water (3 charges), Ice Storm (2 charges), or Wall of Ice (3 charges).",
			languageProfs : ["Aquan"],
			speed : { swim : { spd : "walk", enc : "walk" } },
			fixedDC : 17,
			spellFirstColTitle : "Ch",
			spellcastingBonus : [{
				name : "1 charge",
				spells : ["create or destroy water"],
				selection : ["create or destroy water"],
				firstCol : 1
			}, {
				name : "2 charges",
				spells : ["dominate monster", "ice storm"],
				selection : ["dominate monster", "ice storm"],
				firstCol : 2,
				times : 2
			}, {
				name : "3 charges",
				spells : ["control water", "wall of ice"],
				selection : ["control water", "wall of ice"],
				firstCol : 3,
				times : 2
			}],
			spellChanges : {
				"dominate monster" : {
					description : "Water elemental save or charmed, follows telepathic commands, 1 a for complete control; save on dmg",
					changes : "Can only affect a water elemental."
				}
			},
			limfeaname : "Ring of Water Elemental Command"
		}
	},
	"ring of evasion" : {
		name : "Ring of Evasion",
		source : [["SRD", 236], ["D", 191]],
		type : "ring",
		rarity : "rare",
		magicItemTable : "G",
		description : "This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. As a reaction when I fail a Dexterity saving throw while wearing it, I can expend 1 of its charges to succeed on that saving throw instead.",
		descriptionFull : "This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. When you fail a Dexterity saving throw while wearing it, you can use your reaction to expend 1 of its charges to succeed on that saving throw instead.",
		attunement : true,
		usages : 3,
		recovery : "dawn",
		additional : "regains 1d3",
		action : [["reaction", ""]]
	},
	"ring of feather falling" : {
		name : "Ring of Feather Falling",
		source : [["SRD", 236], ["D", 191]],
		type : "ring",
		rarity : "rare",
		magicItemTable : "G",
		description : "When I fall while wearing this ring, I descend 60 ft per round and take no damage from falling.",
		descriptionFull : "When you fall while wearing this ring, you descend 60 feet per round and take no damage from falling.",
		attunement : true
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
		savetxt : { immune : ["paralyzed (by magic)", "restrained (by magic)"] }
	},
	"ring of invisibility" : {
		name : "Ring of Invisibility",
		source : [["SRD", 236], ["D", 191]],
		type : "ring",
		rarity : "legendary",
		magicItemTable : "I",
		description : "While wearing this ring, I can turn invisible as an action. Anything I am wearing or carrying is invisible with me. I remain invisible until the ring is removed, until I attack or cast a spell, or until I use a bonus action to become visible again.",
		descriptionFull : "While wearing this ring, you can turn invisible as an action. Anything you are wearing or carrying is invisible with you. You remain invisible until the ring is removed, until you attack or cast a spell, or until you use a bonus action to become visible again.",
		attunement : true,
		action : [["action", " (start)"], ["bonus action", " (stop)"]]
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
		description : "While wearing this ring, I gain a +1 bonus to AC and saving throws.",
		descriptionFull : "You gain a +1 bonus to AC and saving throws while wearing this ring.",
		attunement : true,
		extraAC : [{name : "Ring of Protection", mod : 1, magic : true, text : "I gain a +1 bonus to AC while attuned."}],
		addMod : [{ type : "save", field : "all", mod : 1, text : "While I wear the Ring of Protection, I gain a +1 bonus to all my saving throws." }]
	},
	"ring of regeneration" : {
		name : "Ring of Regeneration",
		source : [["SRD", 237], ["D", 191]],
		type : "ring",
		rarity : "very rare",
		magicItemTable : "H",
		description : "While wearing this ring, I regain 1d6 hit points every 10 minutes, provided that I have at least 1 hit point. If I lose a body part, the ring causes the missing part to regrow and return to full functionality after 1d6+1 days if I have at least 1 hit point the whole time.",
		descriptionFull : "While wearing this ring, you regain 1d6 hit points every 10 minutes, provided that you have at least 1 hit point. If you lose a body part, the ring causes the missing part to regrow and return to full functionality after 1d6+1 days if you have at least 1 hit point the whole time.",
		attunement : true
	},
	"ring of resistance" : {
		name : "Ring of Resistance",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "rare",
		magicItemTable : "G",
		description : "I have resistance to one damage type while wearing this ring. The gem in the ring indicates the type of damage.",
		descriptionFull : "You have resistance to one damage type while wearing this ring. The gem in the ring indicates the type, which the GM chooses or determines randomly.\n\n" + toUni("d10\tDamage Type\tGem") +
		"\n   1\tAcid\t\tPearl" +
		"\n   2\tCold\t\tTourmaline" +
		"\n   3\tFire\t\tGarnet" +
		"\n   4\tForce\t\tSapphire" +
		"\n   5\tLightning   \tCitrine" +
		"\n   6\tNecrotic\t\tJet" +
		"\n   7\tPoison\t\tAmethyst" +
		"\n   8\tPsychic\t\tJade" +
		"\n   9\tRadiant\t\tTopaz" +
		"\n 10\tThunder\t\tSpinel",
		attunement : true,
		choices : ["Acid", "Cold", "Fire", "Force", "Lightning", "Necrotic", "Poison", "Psychic", "Radiant", "Thunder"],
		choicesNotInMenu : true,
		"acid" : {
			name : "Ring of Acid Resistance",
			description : "While I'm wearing this ring set with a pearl and I'm attuned to it, I have resistance to acid damage.",
			dmgres : ["Acid"]
		},
		"cold" : {
			name : "Ring of Cold Resistance",
			description : "While I'm wearing this ring set with a tourmaline and I'm attuned to it, I have resistance to cold damage.",
			dmgres : ["Cold"]
		},
		"fire" : {
			name : "Ring of Fire Resistance",
			description : "While I'm wearing this ring set with a garnet and I'm attuned to it, I have resistance to fire damage.",
			dmgres : ["Fire"]
		},
		"force" : {
			name : "Ring of Force Resistance",
			description : "While I'm wearing this ring set with a sapphire and I'm attuned to it, I have resistance to force damage.",
			dmgres : ["Force"]
		},
		"lightning" : {
			name : "Ring of Lightning Resistance",
			description : "While I'm wearing this ring set with a citrine and I'm attuned to it, I have resistance to lightning damage.",
			dmgres : ["Lightning"]
		},
		"necrotic" : {
			name : "Ring of Necrotic Resistance",
			description : "While I'm wearing this ring set with jet and I'm attuned to it, I have resistance to necrotic damage.",
			dmgres : ["Necrotic"]
		},
		"poison" : {
			name : "Ring of Poison Resistance",
			description : "While I'm wearing this ring set with an amethyst and I'm attuned to it, I have resistance to poison damage.",
			dmgres : ["Poison"]
		},
		"psychic" : {
			name : "Ring of Psychic Resistance",
			description : "While I'm wearing this ring set with jade and I'm attuned to it, I have resistance to psychic damage.",
			dmgres : ["Psychic"]
		},
		"radiant" : {
			name : "Ring of Radiant Resistance",
			description : "While I'm wearing this ring set with a topaz and I'm attuned to it, I have resistance to radiant damage.",
			dmgres : ["Radiant"]
		},
		"thunder" : {
			name : "Ring of Thunder Resistance",
			description : "While I'm wearing this ring set with a spinel and I'm attuned to it, I have resistance to thunder damage.",
			dmgres : ["Thunder"]
		}
	},
	"ring of shooting stars" : {
		name : "Ring of Shooting Stars",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This ring has 6 charges and it regains 1d6 expended charges daily at dawn. While wearing this ring in dim light or darkness, I can cast Dancing Lights and Light at will. As an action, I can expend charges to cast Faerie Fire, Ball Lightning (see 3rd page notes), or Shooting Stars (see 3rd page notes). All spells DC 15.",
		descriptionFull : "While wearing this ring in dim light or darkness, you can cast Dancing Lights and Light from the ring at will. Casting either spell from the ring requires an action.\n   The ring has 6 charges for the following other properties. The ring regains 1d6 expended charges daily at dawn.\n   " + toUni("Faerie Fire") + ". You can expend 1 charge as an action to cast Faerie Fire from the ring.\n   " + toUni("Ball Lightning") + ". You can expend 2 charges as an action to create one to four 3-foot-diameter spheres of lightning. The more spheres you create, the less powerful each sphere is individually.\n   Each sphere appears in an unoccupied space you can see within 120 feet of you. The spheres last as long as you concentrate (as if concentrating on a spell), up to 1 minute. Each sphere sheds dim light in a 30-foot radius.\n   As a bonus action, you can move each sphere up to 30 feet, but no farther than 120 feet away from you. When a creature other than you comes within 5 feet of a sphere, the sphere discharges lightning at that creature and disappears. That creature must make a DC 15 Dexterity saving throw. On a failed save, the creature takes lightning damage based on the number of spheres you created (4 spheres = 2d4, 3 spheres = 2d6, 2 spheres = 5d4, 1 sphere = 4d12).\n   " + toUni("Shooting Stars") + ". \n   You can expend 1 to 3 charges as an action. For every charge you expend, you launch a glowing mote of light from the ring at a point you can see within 60 feet of you. Each creature within a 15-foot cube originating from that point is showered in sparks and must make a DC 15 Dexterity saving throw. taking 5d4 fire damage on a failed save, or half as much damage on a successful one.",
		attunement : true,
		toNotesPage : [{
			name : "Ball Lightning",
			page3notes : true,
			additional : "2 charges",
			note : [
				"As an action, I can create 1-4 spheres of lightning of 3-ft diameter within 120 ft",
				"These last while I concentrate, up to 1 min; As a bonus action, I can more them 30 ft",
				"When a creature (not me) comes within 5 ft of a sphere, it discharges and disappears",
				"The target must make a DC 15 Dex save or take lightning damage",
				"A sphere sheds dim light in 30-ft radius, its damage depends on the number created:",
				" \u2022 1 sphere: 4d12;    \u2022 2 spheres: 5d4;    \u2022 3 spheres: 2d6;    \u2022 4 spheres: 2d4"
			]
		}, {
			name : "Shooting Stars",
			page3notes : true,
			additional : "1-3 charges",
			note : [
				"As an action, I can launch one mote of light per expended charge to a point within 60 ft",
				"All creatures within a 15-ft cube originating from those points take 5d4 fire damage",
				"The targets can make a DC 15 Dexterity saving throw to halve the damage"
			]
		}],
		usages : 6,
		recovery : "dawn",
		additional : "regains 1d6",
		fixedDC : 15,
		spellFirstColTitle : "Ch",
		spellcastingBonus : [{
			name : "At will",
			spells : ["dancing lights", "light"],
			selection : ["dancing lights", "light"],
			firstCol : "atwill",
			times : 2
		}, {
			name : "1 charge",
			spells : ["faerie fire"],
			selection : ["faerie fire"],
			firstCol : 1
		}, {
			name : "Ball lightning (2 chr)",
			spells : ["flaming sphere"],
			selection : ["flaming sphere"],
			firstCol : 2
		}, {
			name : "Shooting stars (1-3 chr)",
			spells : ["magic missile"],
			selection : ["magic missile"],
			firstCol : "1+"
		}],
		spellChanges : {
			"flaming sphere" : { // change into Ball Lightning
				name : "Ball Lightning",
				source : [["SRD", 237], ["D", 192]],
				level : "",
				school : "Evoc",
				time : "1 a",
				range : "120 ft",
				components : "M\u0192",
				compMaterial : "Spells cast by magic items don't require any components other than the magic item itself.",
				duration : "Conc, 1 min",
				save : "Dex",
				description : "1-4 spheres; bns a move all 30 ft; 1st crea in 5 ft save or Lightning dmg (1:4d12, 2:5d4, 3:2d6, 4:2d4)",
				descriptionShorter : false,
				descriptionFull : "You can expend 2 charges from the ring of shooting starts as an action to create one to four 3-foot-diameter spheres of lightning. The more spheres you create, the less powerful each sphere is individually.\n   Each sphere appears in an unoccupied space you can see within 120 feet of you. The spheres last as long as you concentrate (as if concentrating on a spell), up to 1 minute. Each sphere sheds dim light in a 30-foot radius.\n   As a bonus action, you can move each sphere up to 30 feet, but no farther than 120 feet away from you. When a creature other than you comes within 5 feet of a sphere, the sphere discharges lightning at that creature and disappears. That creature must make a DC 15 Dexterity saving throw. On a failed save, the creature takes lightning damage based on the number of spheres you created (4 spheres = 2d4, 3 spheres = 2d6, 2 spheres = 5d4, 1 sphere = 4d12).",
				completeRewrite : true, // indicates that the changes here even overwrite the tooltip
				changes : "The listing of 'Flaming Sphere' has been completely changed to reflect the 'Ball Lightning' ability of the Ring of Shooting Stars. Even the information above is changed."
			},
			"magic missile" : { // change into Shooting Stars
				name : "Shooting Stars",
				source : [["SRD", 237], ["D", 192]],
				level : "",
				school : "Evoc",
				time : "1 a",
				range : "60 ft",
				components : "M\u0192",
				compMaterial : "Spells cast by magic items don't require any components other than the magic item itself.",
				duration : "Instantaneous",
				description : "15-ft cube in range per expended charge; all crea in cubes take 5d4 Fire damage, save halves",
				descriptionFull : "You can expend 1 to 3 charges from the ring of shooting starts as an action. For every charge you expend, you launch a glowing mote of light from the ring at a point you can see within 60 feet of you. Each creature within a 15-foot cube originating from that point is showered in sparks and must make a DC 15 Dexterity saving throw. taking 5d4 fire damage on a failed save, or half as much damage on a successful one.",
				completeRewrite : true, // indicates that the changes here even overwrite the tooltip
				changes : "The listing of 'Magic Missile' has been completely changed to reflect the 'Shooting Stars' ability of the Ring of Shooting Stars. Even the information above is changed."
			}
		}
	},
	"ring of spell storing" : { // contains contributions by Fourleafclov
		name : "Ring of Spell Storing",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "rare",
		magicItemTable : "G",
		description : "This ring can hold up to 5 levels of spell slots. Any creature can cast a spell into the ring using a 1-5th level spell slot, which is then stored if there is space. I can cast stored spells from the ring, freeing up space, using the original caster's attack bonus, save DC, spellcasting ability score, and the initial spell slot level.",
		descriptionFull : "This ring stores spells cast into it, holding them until the attuned wearer uses them. The ring can store up to 5 levels worth of spells at a time. When found, it contains 1d6-1 levels of stored spells chosen by the DM.\n   Any creature can cast a spell of 1st through 5th level into the ring by touching the ring as the spell is cast. The spell has no effect, other than to be stored in the ring. If the ring can't hold the spell, the spell is expended without effect. The level of the slot used to cast the spell determines how much space it uses.\n   While wearing this ring, you can cast any spell stored in it. The spell uses the slot level, spell save DC, spell attack bonus, and spellcasting ability of the original caster, but is otherwise treated as if you cast the spell. The spell cast from the ring is no longer stored in it, freeing up space.",
		attunement : true,
		usages : "5 lvls",
		recovery : " Cast"
	},
	"ring of spell turning" : {
		name : "Ring of Spell Turning",
		source : [["SRD", 237], ["D", 193]],
		type : "ring",
		rarity : "legendary",
		magicItemTable : "I",
		description : "While wearing this ring, I have advantage on saves against any spell that targets only me (not in an area of effect). In addition, if I roll a 20 for the save and the spell is 7th level or lower, the spell has no effect on me and instead targets the caster as if the caster had effectively targeted itself.",
		descriptionFull : "While wearing this ring, you have advantage on saving throws against any spell that targets only you (not in an area of effect). In addition, if you roll a 20 for the save and the spell is 7th level or lower, the spell has no effect on you and instead targets the caster, using the slot level, spell save DC, attack bonus, and spellcasting ability of the caster.",
		attunement : true,
		savetxt : { adv_vs : ["spells (targeting only me)"] }
	},
	"ring of swimming" : {
		name : "Ring of Swimming",
		source : [["SRD", 238], ["D", 193]],
		type : "ring",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "I have a swimming speed of 40 feet while wearing this ring.",
		descriptionFull : "You have a swimming speed of 40 feet while wearing this ring.",
		speed : { swim : { spd : "fixed 40", enc : "fixed 30" } }
	},
	"ring of telekinesis" : {
		name : "Ring of Telekinesis",
		source : [["SRD", 238], ["D", 193]],
		type : "ring",
		rarity : "very rare",
		magicItemTable : "H",
		description : "While wearing this ring, I can cast Telekinesis at will, but I can target only an object up to 1000 lb that isn't being worn or carried. I can move it up to 30 ft in any direction, but not more than 60 ft away from me. I can exert fine control on it, such as manipulating a tool, opening a door, or pouring out its contents.",
		descriptionFull : "While wearing this ring, you can cast the Telekinesis spell at will, but you can target only objects that aren't being worn or carried.",
		attunement : true,
		spellcastingBonus : {
			name : "At will",
			spells : ["telekinesis"],
			selection : ["telekinesis"],
			firstCol : "atwill"
		},
		spellChanges : {
			"telekinesis" : {
				description : "Move 1 object up to 1000 lb 30 ft and exert fine control over it; as 1 a following rounds",
				changes : "The Ring of Telekinesis only allows manupilation of unattended objects."
			}
		}
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
		usages : 3,
		recovery : "dawn",
		additional : "regains 1d3",
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
	"ring of three wishes" : {
		name : "Ring of Three Wishes",
		source : [["SRD", 238], ["D", 193]],
		type : "ring",
		rarity : "legendary",
		magicItemTable : "I",
		description : "While wearing this ring, I can use an action to expend 1 of its 3 charges to cast the Wish spell from it. The ring becomes nonmagical when I use the last charge.",
		descriptionFull : "While wearing this ring, you can use an action to expend 1 of its 3 charges to cast the Wish spell from it. The ring becomes nonmagical when you use the last charge.",
		usages : 3,
		recovery : "Never",
		spellFirstColTitle : "Ch",
		spellcastingBonus : {
			name : "1 charge",
			spells : ["wish"],
			selection : ["wish"],
			firstCol : 1
		}
	},
	"ring of warmth" : {
		name : "Ring of Warmth",
		source : [["SRD", 238], ["D", 193]],
		type : "ring",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While wearing this ring, I have resistance to cold damage. In addition, I and everything I wear and carry are unharmed by temperatures as low as -50 \u00B0F.",
		descriptionFull : "While wearing this ring, you have resistance to cold damage. In addition, you and everything you wear and carry are unharmed by temperatures as low as -50 degrees Fahrenheit.",
		attunement : true,
		dmgres : ["Cold"]
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
	"ring of x-ray vision" : {
		name : "Ring of X-ray Vision",
		source : [["SRD", 238], ["D", 193]],
		type : "ring",
		rarity : "rare",
		magicItemTable : "G",
		description : "As an action, I can speak this ring's command word to make me see into and through solid matter as if it is transparent and light passes through for 1 minute within 30 ft (1 ft stone, 1 inch metal, 3 ft wood/dirt, not lead). When I use this again before a long rest, I must make a DC 15 Con save or gain 1 level of exhaustion.",
		descriptionFull : "While wearing this ring, you can use an action to speak its command word. When you do so, you can see into and through solid matter for 1 minute. This vision has a radius of 30 feet. To you, solid objects within that radius appear transparent and don't prevent light from passing through them. The vision can penetrate 1 foot of stone, 1 inch of common metal, or up to 3 feet of wood or dirt. Thicker substances block the vision, as does a thin sheet of lead.\n   Whenever you use the ring again before taking a long rest, you must succeed on a DC 15 Constitution saving throw or gain one level of exhaustion.",
		attunement : true,
		action : [["action", ""]],
		usages : 1,
		recovery : "long rest",
		additional : "more uses: DC 15 Con save"
	},
	"robe of eyes" : { // contains contributions by SoilentBrad
		name : "Robe of Eyes",
		source : [["SRD", 238], ["D", 193]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "This robe gives me adv. on sight-based Perception checks, the ability to see in all directions, see invisible/ethereal out to 120 ft, darkvision 120 ft. I can't close or avert my eyes. If Light is cast on it or Daylight within 5 ft of it, I'm blinded for 1 min, Con save (DC 11-Light, 15-Daylight) at the end of my each of my turns to end.",
		descriptionFull : "This robe is adorned with eyelike patterns. While you wear the robe, you gain the following benefits:\n \u2022 The robe lets you see in all directions, and you have advantage on Wisdom (Perception) checks that rely on sight.\n \u2022 You have darkvision out to a range of 120 feet.\n \u2022 You can see invisible creatures and objects, as well as see into the Ethereal Plane, out to a range of 120 feet.\n\nThe eyes on the robe can't be closed or averted. Although you can close or avert your own eyes, you are never considered to be doing so while wearing this robe.\n   A Light spell cast on the robe or a Daylight spell cast within 5 feet of the robe causes you to be blinded for 1 minute. At the end of each of your turns, you can make a Constitution saving throw (DC 11 for Light or DC 15 for Daylight), ending the blindness on a success.",
		attunement : true,
		weight : 4,
		vision: [
			["Darkvision", "fixed 120"],
			["See invisible/ethereal", "fixed 120"],
			["Adv. on Perception checks based on sight", 0]
		]
	},
	"robe of scintillating colors" : { // contains contributions by SoilentBrad
		name : "Robe of Scintillating Colors",
		source : [["SRD", 238], ["D", 194]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This robe has 3 charges, regaining 1d3 at dawn. As an action, I can use 1 charge to shed 30-ft radius bright light, 30 ft dim light until the end of my next turn, causing all that see me to have disadv. on attacks against me. All within 30 ft that can see me at activation make a DC 15 Wis save or stunned until effect ends.",
		descriptionFull : "This robe has 3 charges, and it regains 1d3 expended charges daily at dawn. While you wear it, you can use an action and expend 1 charge to cause the garment to display a shifting pattern of dazzling hues until the end of your next turn. During this time, the robe sheds bright light in a 30-foot radius and dim light for an additional 30 feet. Creatures that can see you have disadvantage on attack rolls against you. In addition, any creature in the bright light that can see you when the robe's power is activated must succeed on a DC 15 Wisdom saving throw or become stunned until the effect ends.",
		attunement : true,
		weight : 4,
		usages : 3,
		recovery : "dawn",
		additional : "regains 1d3",
		action : [["action", ""]]
	},
	"robe of stars" : { // contains contributions by SoilentBrad
		name : "Robe of Stars",
		source : [["SRD", 239], ["D", 194]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This dark robe gives a +1 bonus to saving throws. It has 6 large stars embroidered on it, that I can use to cast Magic Missile at 5th-level. 1d6 used stars reappear at dusk. As an action, I can enter or exit the Astral Plane along with all I'm wearing and carrying. I can return as an action, appearing in the spot I left.",
		descriptionFull : "This black or dark blue robe is embroidered with small white or silver stars. You gain a +1 bonus to saving throws while you wear it.\n   Six stars, located on the robe's upper front portion, are particularly large. While wearing this robe, you can use an action to pull off one of the stars and use it to cast Magic Missile as a 5th-level spell. Daily at dusk, 1d6 removed stars reappear on the robe.\n   While you wear the robe, you can use an action to enter the Astral Plane along with everything you are wearing and carrying. You remain there until you use an action to return to the plane you were on. You reappear in the last space you occupied, or if that space is occupied, the nearest unoccupied space.",
		attunement : true,
		weight : 4,
		action : [["action", ""]],
		usages : 6,
		recovery : "Dusk",
		additional : "regains 1d6",
		addMod: [{ type: "save", field: "all", mod: 1, text: "While wearing the Robe of Stars, I gain a +1 bonus to all my saving throws." }],
		spellFirstColTitle: "Ch",
		spellcastingBonus: {
			name: "1 charge",
			spells: ["magic missile"],
			selection: ["magic missile"],
			firstCol: 1
		},
		spellChanges : {
			"magic missile" : {
				description : "8 darts hit creature(s) I can see for 1d4+1 Force dmg per dart",
				changes : "Magic Missile cast from the Robe of Stars is always at 5th-level."
			}
		}
	},
	"robe of the archmagi" : { // contains contributions by SoilentBrad
		name : "Robe of the Archmagi",
		source : [["SRD", 239], ["D", 194]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "I can only attune to a robe of the archmagi that matches my alignment: white for good, gray for neutral, black for evil. I gain these benefits while wearing the robe: if unarmored, my AC is 15 + my Dex mod; I have adv on saves against spells and magical effects; my spell save DC and spell attack bonus increase by 2.",
		descriptionFull : "This elegant garment is made from exquisite cloth of white, gray, or black and adorned with silvery runes. The robe's color corresponds to the alignment for which the item was created. A white robe was made for good, gray for neutral, and black for evil. You can't attune to a robe of the archmagi that doesn't correspond to your alignment.\n   You gain these benefits while wearing the robe:\n \u2022 If you aren't wearing armor, your base Armor Class is 15 + your Dexterity modifier.\n \u2022 You have advantage on saving throws against spell and other magical effects.\n \u2022 Your spell save DC and spell attack bonus each increase by 2.",
		attunement : true,
		weight : 4,
		savetxt : { adv_vs : ["spells", "magical effects"] },
		calcChanges : {
			spellCalc : [
				function (type, spellcasters, ability) {
					if (type != "prepare") return 2;
				},
				"While wearing the Robe of the Archmagi my spell save DC and spell attack bonus each increase by 2."
			]
		},
		addArmor: "Robe of the Archmagi",
		armorOptions: {
			regExpSearch: /^(?=.*robe)(?=.*(archmage|archmagi)).*$/i,
			name : "Robe of the Archmagi",
			source : [["SRD", 239], ["D", 194]],
			ac : 15,
			weight : 4
		},
		choices : ["Good", "Neutral", "Evil"],
		choicesNotInMenu : true,
		"good" : {
			description : "While wearing this elegant robe made from exquisite white cloth adorned with silvery runes, I have advantage on saves against spells and magical effects and add +2 to both my spell save DC and spell attack rolls. Also, if I'm not wearing armor, it makes my base AC 15 + my Dexterity modifier.",
			prerequisite : "Requires attunement by a good sorcerer, warlock, or wizard",
			prereqeval : function(v) { return (classes.known.sorcerer || classes.known.warlock || classes.known.wizard) && (/good/i).test(What("Alignment")); }
		},
		"neutral" : {
			description : "While wearing this elegant robe made from exquisite gray cloth adorned with silvery runes, I have advantage on saves against spells and magical effects and add +2 to both my spell save DC and spell attack rolls. Also, if I'm not wearing armor, it makes my base AC 15 + my Dexterity modifier.",
			prerequisite : "Requires attunement by a neutral sorcerer, warlock, or wizard",
			prereqeval : function(v) { return (classes.known.sorcerer || classes.known.warlock || classes.known.wizard) && !(/good|evil/i).test(What("Alignment")); }
		},
		"evil" : {
			description : "While wearing this elegant robe made from exquisite black cloth adorned with silvery runes, I have advantage on saves against spells and magical effects and add +2 to both my spell save DC and spell attack rolls. Also, if I'm not wearing armor, it makes my base AC 15 + my Dexterity modifier.",
			prerequisite : "Requires attunement by an evil sorcerer, warlock, or wizard",
			prereqeval : function(v) { return (classes.known.sorcerer || classes.known.warlock || classes.known.wizard) && (/evil/i).test(What("Alignment")); }
		}
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
	"rod of absorption" : {
		name : "Rod of Absorption",
		source : [["SRD", 239], ["D", 195]],
		type : "rod",
		rarity : "very rare",
		magicItemTable : "H",
		description : "As a reaction while holding this rod, I can use it to absorb a spell targeting only me, without an area of effect. It has no effect and its spell slot level is stored in the rod. I can expend these levels as if they are spell slots to power my own spells up to 5th-level. Once the rod has absorbed 50 levels, it can absorb no more.",
		descriptionLong : "As a reaction while holding this rod, I can use it to absorb a spell targeting only me and without an area of effect. The spell has no effect and its energy is stored in the rod. This energy has the same level as the spell when it was cast. Once the rod has absorbed 50 levels, it can absorb no more. I can expend these levels as if they are spell slots to power my own spells up to 5th-level and only for spell slot levels I have access to otherwise. For example, I can expend 3 levels to cast one of my spells using a 3rd-level spell slot. When the rod can't absorb any more levels and has no energy left, it becomes nonmagical.",
		descriptionFull : "While holding this rod, you can use your reaction to absorb a spell that is targeting only you and not with an area of effect. The absorbed spell's effect is canceled, and the spell's energy\u2014not the spell itself\u2014is stored in the rod. The energy has the same level as the spell when it was cast. The rod can absorb and store up to 50 levels of energy over the course of its existence. Once the rod absorbs 50 levels of energy, it can't absorb more. If you are targeted by a spell that the rod can't store, the rod has no effect on that spell.\n   When you become attuned to the rod, you know how many levels of energy the rod has absorbed over the course of its existence, and how many levels of spell energy it currently has stored.\n   If you are a spellcaster holding the rod, you can convert energy stored in it into spell slots to cast spells you have prepared or know. You can create spell slots only of a level equal to or lower than your own spell slots, up to a maximum of 5th level. You use the stored levels in place of your slots, but otherwise cast the spell as normal. For example, you can use 3 levels stored in the rod as a 3rd-level spell slot.\n   A newly found rod has 1d10 levels of spell energy stored in it already. A rod that can no longer absorb spell energy and has no energy remaining becomes nonmagical.",
		attunement : true,
		weight : 2,
		action : [["reaction", ""]],
		extraLimitedFeatures : [{
			name : "Rod of Absorption [Total Levels Absorbed]",
			usages : 50,
			recovery : "Never"
		}, {
			name : "Rod of Absorption [Stored Levels]",
			usages : "1d10",
			recovery : "Never"
		}],
	},
	"rod of alertness" : { // contains contributions by SoilentBrad
		name : "Rod of Alertness",
		source : [["SRD", 240], ["D", 196]],
		type : "rod",
		rarity : "very rare",
		magicItemTable : "H",
		description : "While holding this rod, I have adv. on initiative and Perception and can cast certain spells. As an action once per dawn, I can plant it in the ground, making it shed 60-ft radius bright light, dim for another 60 ft for 10 min. In the bright light, my allies and I gain +1 AC, +1 bonus to saves, and can sense invisible hostiles.",
		descriptionLong : "While holding this rod, I have advantage on my initiative and Wisdom (Perception) checks. As an action, I can use it to cast either Detect Evil and Good, Detect Magic, Detect Poison and Disease, or See Invisibility. As an action once per dawn, I can plant the rod's haft in the ground, making its head shed bright light in a 60-ft radius and dim light for another 60 ft. This lasts 10 minutes or until a creature pulls the rod from the ground as an action. While in the bright light, my allies and I gain +1 bonus to AC and saving throws and can sense the location of any invisible hostile creatures that are also within the bright light.",
		descriptionFull : "This rod has a flanged head and the following properties.\n   " + toUni("Alertness") + ". While holding the rod, you have advantage on Wisdom (Perception) checks and on rolls for initiative.\n   " + toUni("Spells") + ". While holding the rod, you can use an action to cast one of the following spells from it: Detect Evil and Good, Detect Magic, Detect Poison and Disease, or See Invisibility.\n   " + toUni("Protective Aura") + ". As an action, you can plant the haft end of the rod in the ground, whereupon the rod's head sheds bright light in a 60-foot radius and dim light for an additional 60 feet. While in that bright light, you and any creature that is friendly to you gain a +1 bonus to AC and saving throws and can sense the location of any invisible hostile creature that is also in the bright light.\n   The rod's head stops glowing and the effect ends after 10 minutes, or when a creature uses an action to pull the rod from the ground. This property can't be used again until the next dawn.",
		attunement : true,
		weight : 2,
		usages : 1,
		recovery : "dawn",
		limfeaname : "Rod of Alertness (Plant in Ground)",
		advantages : [["Initiative", true], ["Perception", true]],
		vision : [["Adv. on Perception checks", 0]],
		action : [["action", ""]],
		spellcastingBonus: [{
			name: "Robe of Alertness",
			spells: ["detect evil and good", "detect magic", "detect poison and disease", "see invisibility"],
			selection: ["detect evil and good", "detect magic", "detect poison and disease", "see invisibility"],
			times: 4
		}]
	},
	"rod of lordly might" : {
		name : "Rod of Lordly Might",
		source : [["SRD", 240], ["D", 196]],
		type : "rod",
		rarity : "legendary",
		magicItemTable : "I",
		description : "This rod functions as a +3 mace. As a bonus action, I can press one of the six buttons on the rod, changing it. The rod can also drain life, paralyze, and terrify, each once per dawn. See the notes page for what the different buttons do and how the functions work that can each be used once per dawn.",
		descriptionFull : "This rod has a flanged head, and it functions as a magic mace that grants a +3 bonus to attack and damage roll made with it. The rod has properties associated with six different buttons that are set in a row along the haft. It has three other properties as well, detailed below.\n   " + toUni("Six Buttons") + ". You can press one of the rod's six buttons as a bonus action. A button's effect lasts until you push a different button or until you push the same button again, which causes the rod to revert to its normal form.\n   If you press " + toUni("button 1") + ", the rod becomes a flame tongue as a fiery blade sprouts from the end opposite the rod's flanged head (you choose the type of sword).\n   If you press " + toUni("button 2") + ", the rod's flanged head folds down and two crescent-shaped blades spring out, transforming the rod into a magic battleaxe that grants a +3 bonus to attack and damage rolls made with it.\n   If you press " + toUni("button 3") + ", the rod's flanged head folds down, a spear point springs from the rod's tip, and the rod's handle lengthens into a 6-foot haft, transforming the rod into a magic spear that grants a +3 bonus to attack and damage rolls made with it.\n   If you press " + toUni("button 4") + ", the rod transforms into a climbing pole up to 50 feet long, as you specify. In surfaces as hard as granite, a spike at the bottom and three hooks at the top anchor the pole. Horizontal bars 3 inches long fold out from the sides, 1 foot apart, forming a ladder. The pole can bear up to 4,000 pounds. More weight or lack of solid anchoring causes the rod to revert to its normal form.\n   If you press " + toUni("button 5") + ", the rod transforms into a handheld battering ram and gram its user a +10 bonus to Strength checks made to break through doors, barricades, and other barriers.\n   If you press " + toUni("button 6") + ", the rod assumes or remains in its normal form and indicates magnetic north. (Nothing happens if this function of the rod is used in a location that has no magnetic north.) The rod also gives you knowledge of your approximate depth beneath the ground or your height above it.\n   " + toUni("Drain Life") + ". When you hit a creature with a melee attack using the rod, you can force the target to make a DC 17 Constitution saving throw. On a failure, the target rakes an extra 4d6 necrotic damage, and you regain a number of hit points equal to half that necrotic damage. This property can't be used again until the next dawn.\n   " + toUni("Paralyze") + ". When you hit a creature with a melee attack using the rod, you can force the target to make a DC 17 Strength saving throw. On a failure, the target is paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on a success. This property can't be used again until the next dawn.\n   " + toUni("Terrify") + ". While holding the rod, you can use an action to force each creature you can see within 30 feet of you to make a DC 17 Wisdom saving throw. On a failure, a target is frightened of you for 1 minute. A frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. This property can't be used again until the next dawn.",
		attunement : true,
		weight : 2,
		action: [["bonus action", " (press button)"], ["action", " (Terrify)"]],
		extraLimitedFeatures : [{
			name : "Rod of Lordly Might (Drain Life)",
			usages : 1,
			recovery : "dawn"
		}, {
			name : "Rod of Lordly Might (Paralyze)",
			usages : 1,
			recovery : "dawn"
		}, {
			name : "Rod of Lordly Might (Terrify)",
			usages : 1,
			recovery : "dawn"
		}],
		weaponOptions : [{
			baseWeapon : "battleaxe",
			regExpSearch : /^(?=.*rod)(?=.*lordly)(?=.*might)(?=.*axe).*$/i,
			name : "Rod of Lordly Might (Axe)",
			source : [["SRD", 240], ["D", 196]],
			modifiers : [3,3]
		}, {
			baseWeapon : "mace",
			regExpSearch : /^(?=.*rod)(?=.*lordly)(?=.*might)(?=.*mace).*$/i,
			name : "Rod of Lordly Might (Mace)",
			source : [["SRD", 240], ["D", 196]],
			modifiers : [3,3]
		}, {
			baseWeapon : "spear",
			regExpSearch : /^(?=.*rod)(?=.*lordly)(?=.*might)(?=.*spear).*$/i,
			name : "Rod of Lordly Might (Spear)",
			source : [["SRD", 240], ["D", 196]],
			modifiers : [3,3]
		}],
		toNotesPage : [{
			name : "Buttons and Other Functions",
			note : [
				"The rod of lordly might has a flanged head, and it functions as a magic mace that grants a +3 bonus to attack and damage roll made with it.",
				"As a bonus action, I can press one of the six different buttons that are set in a row along the haft of the rod. A button's effect lasts until a different button is pushed, or until the same button is pushed again, whereupon it reverts to its normal form.",
				"\u2022 1st button. A fiery blade sprouts from the end opposite the rod's flanged head. These flames shed bright light in a 40-ft radius and dim light for an additional 40 ft. It now functions as a sword (I can choose which type) that deals an extra 2d6 fire damage to any target it hits. [Write \"lordly might\" in the name of a sword in the attack section to have this damage added to the attack's description, for example \"Rod of Lordly Might (Greatsword)\".]",
				"\u2022 2nd button. The rod's flanged head folds down and two crescent-shaped blades spring out, transforming the rod into a magic battleaxe that grants a +3 bonus to attack and damage rolls made with it.",
				"\u2022 3rd button. The rod's flanged head folds down, a spear point springs from the rod's tip, and the rod's handle lengthens into a 6-foot haft, transforming the rod into a magic spear that grants a +3 bonus to attack and damage rolls made with it.",
				"\u2022 4th button. The rod transforms into a climbing pole up to 50 ft long, as I specify. In surfaces as hard as granite, a spike at the bottom and three hooks at the top anchor the pole. Horizontal bars 3 inch long fold out from the sides, 1 ft apart, forming a ladder. The pole can bear up to 4000 lb. More weight or lack of solid anchoring causes the rod to revert to its normal form.",
				"\u2022 5th button. The rod transforms into a handheld battering ram and gram its user a +10 bonus to Strength checks made to break through doors, barricades, and other barriers.",
				"\u2022 6th button. The rod assumes or remains in its normal form and indicates magnetic north. (Nothing happens if this function of the rod is used in a location that has no magnetic north.) The rod also gives me knowledge of my approximate depth beneath the ground or my height above it.",
				"The rod also has three functions that work independent of the buttons.",
				"\u2022 Drain Life. When I hit a creature with a melee attack using the rod, I can force the target to make a DC 17 Constitution saving throw. On a failure, the target rakes an extra 4d6 necrotic damage, and I regain a number of hit points equal to half that necrotic damage. This property can't be used again until the next dawn.",
				"\u2022 Paralyze. When I hit a creature with a melee attack using the rod, I can force the target to make a DC 17 Strength saving throw. On a failure, the target is paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on a success. This property can't be used again until the next dawn.",
				"\u2022 Terrify. As an action while holding the rod, I can force each creature I can see within 30 ft of me to make a DC 17 Wisdom saving throw. On a failure, a target is frightened of me for 1 minute. A frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. This property can't be used again until the next dawn."
			]
		}],
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*lordly)(?=.*might).*$/i).test(v.WeaponTextName)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + '+2d6 fire damage';
					}
				},
				'If I include the words "Lordly Might" in a the name of a sword, it will be treated as the magic weapon Flame Tongue. It adds +2d6 fire damage on a hit and shines light.'
			]
		}
	},
	"rod of rulership" : {
		name : "Rod of Rulership",
		source : [["SRD", 240], ["D", 197]],
		type : "rod",
		rarity : "rare",
		magicItemTable : "G",
		description : "As an action once per dawn, I can use this rod to have chosen creatures I can see within 120 ft make a DC 15 Wis save or be charmed by me for 8 hours. While charmed in this way, a target regards me as its trusted leader. It stops being charmed if my allies or I harm it or it is commanded to go against its nature.",
		descriptionFull : "You can use an action to present the rod and command obedience from each creature of your choice that you can see within 120 feet of you. Each target must succeed on a DC 15 Wisdom saving throw or be charmed by you for 8 hours. While charmed in this way, the creature regards you as its trusted leader. If harmed by you or your companions, or commanded to do something contrary to its nature, a target ceases to be charmed in this way. The rod can't be used again until the next dawn.",
		attunement : true,
		weight : 2,
		action : [["action", ""]],
		usages : 1,
		recovery : "dawn"
	},
	"rod of security" : {
		name : "Rod of Security",
		source : [["SRD", 241], ["D", 197]],
		type : "rod",
		rarity : "very rare",
		magicItemTable : "H",
		description : "As an action once per 10 days, I can transport myself and up to 199 willing others I can see to an extraplanar paradise for 200 days divided by the number of creatures or until I end it as an action. Creatures within the paradise don't age, have enough to eat and drink, and regain HP every hour as if having spent 1 HD.",
		descriptionFull : "While holding this rod, you can use an action to activate it. The rod then instantly transports you and up to 199 other willing creatures you can see to a paradise that exists in an extraplanar space. You choose the form that the paradise takes. It could be a tranquil garden, lovely glade, cheery tavern, immense palace, tropical island, fantastic carnival, or whatever else you can imagine. Regardless of its nature, the paradise contains enough water and food to sustain its visitors. Everything else that can be interacted with inside the extraplanar space can exist only there. For example, a flower picked from a garden in the paradise disappears if it is taken outside the extraplanar space.\n   For each hour spent in the paradise, a visitor regains hit points as if it had spent 1 Hit Die. Also, creatures don't age while in the paradise, although time passes normally. Visitors can remain in the paradise for up to 200 days divided by the number of creatures present (round down).\n   When the time runs out or you use an action to end it, all visitors reappear in the location they occupied when you activated the rod, or an unoccupied space nearest that location. The rod can't be used again until ten days have passed.",
		weight : 2,
		usages: 1,
		recovery: "10 days",
		action : [["action", ""]]
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
	"rope of entanglement" : {
		name : "Rope of Entanglement",
		source : [["SRD", 241], ["D", 197]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "As an action while I hold one end of this 30 ft rope, I can speak its command word to have a creature I can see within 20 ft make a DC 15 Dex save or be restrained by the rope. I can release it as a bonus action. The creature can, as an action, escape with a DC 15 Dex/Str check. The rope has AC 20, 20 HP, heals 1 HP/5 min.",
		descriptionFull : "This rope is 30 feet long and weighs 3 pounds. If you hold one end of the rope and use an action to speak its command word, the other end darts forward to entangle a creature you can see within 20 feet of you. The target must succeed on a DC 15 Dexterity saving throw or become restrained.\n   You can release the creature by using a bonus action to speak a second command word. A target restrained by the rope can use an action to make a DC 15 Strength or Dexterity check (target's choice). On a success, the creature is no longer restrained by the rope.\n   The rope has AC 20 and 20 hit points. It regains 1 hit point every 5 minutes as long as it has at least 1 hit point. If the rope drops to 0 hit points, it is destroyed.",
		weight : 3,
		action : [["action", " (entangle)"], ["bonus action", " (release)"]],
		weaponsAdd : ["Rope of Entanglement"],
		weaponOptions : {
			regExpSearch : /^(?=.*rope)(?=.*entanglement).*$/i,
			name : "Rope of Entanglement",
			source : [["SRD", 241], ["D", 197]],
			ability : 0,
			type : "Magic Item",
			damage : ["Dex save", "", "Restrained"],
			range : "20 ft",
			description : "Dexterity saving throw or restrained; DC 15 Strength or Dexterity check to escape",
			abilitytodamage : false,
			weight : 3,
			modifiers : [7, 0],
			dc : true
		}
	},
	"scarab of protection" : {
		name : "Scarab of Protection",
		source : [["SRD", 241], ["D", 199]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "This beetle-shaped medallion gives me advantage on saves against spells. If I fail a save against a necromancy spell or an effect from an undead creature, I can use my reaction to expend 1 charge and succeed on the save instead. The scarab has 12 charges and crumbles into powder when the last is used.",
		descriptionFull : "If you hold this beetle-shaped medallion in your hand for 1 round, an inscription appears on its surface revealing its magical nature. It provides two benefits while it is on your person:\n \u2022 You have advantage on saving throws against spells.\n \u2022 The scarab has 12 charges. If you fail a saving throw against a necromancy spell or a harmful effect originating from an undead creature, you can use your reaction to expend 1 charge and turn the failed save into a successful one. The scarab crumbles into powder and is destroyed when its last charge is expended.",
		attunement : true,
		savetxt : { adv_vs : ["spells"] },
		usages : 12,
		recovery : "Never",
		action : [["reaction", ""]]
	},
	"scimitar of speed" : {
		name : "Scimitar of Speed",
		source : [["SRD", 241], ["D", 199]],
		type : "weapon (scimitar)",
		rarity : "very rare",
		magicItemTable : "H",
		description : "I gain a +2 bonus to attack and damage rolls made with this magic weapon. In addition, I can make one attack with it as a bonus action on each of my turns.",
		descriptionFull : "You gain a +2 bonus to attack and damage rolls made with this magic weapon. In addition, you can make one attack with it as a bonus action on each of your turns.",
		attunement : true,
		weight : 3,
		action : [["bonus action", ""]],
		weaponsAdd : ["Scimitar of Speed"],
		weaponOptions : {
			baseWeapon : "scimitar",
			regExpSearch : /^(?=.*scimitar)(?=.*speed).*$/i,
			name : "Scimitar of Speed",
			source : [["SRD", 241], ["D", 199]],
			description : "Finesse, light; Extra attack as bonus action",
			modifiers : [2, 2]
		}
	},
	"shield, +1, +2, or +3" : {
		name : "Shield, +1, +2, or +3",
		source : [["SRD", 240], ["D", 200]],
		type : "shield",
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
	"shield of missile attraction" : {
		name : "Shield of Missile Attraction",
		source : [["SRD", 242], ["D", 200]],
		type : "shield",
		rarity : "rare",
		magicItemTable : "G",
		description : "While holding this shield, I have resistance to damage from ranged weapon attacks. Once attuned to it, I am cursed until I am the target of Remove Curse or similar magic. Whenever a ranged weapon attack is made against a target within 10 ft of me, the curse causes me to become the target instead.",
		descriptionFull : "While holding this shield, you have resistance to damage from ranged weapon attacks.\n   " + toUni("Curse") + ". This shield is cursed. Attuning to it curses you until you are targeted by the Remove Curse spell or similar magic. Removing the shield fails to end the curse on you. Whenever a ranged weapon attack is made against a target within 10 feet of you, the curse causes you to become the target instead.",
		attunement : true,
		weight : 6,
		shieldAdd : "Shield of Missile Attraction",
		cursed : true,
		dmgres : ["Ranged Weapons"]
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
	"sovereign glue" : {
		name : "Sovereign Glue",
		source : [["SRD", 242], ["D", 200]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "E",
		description : "This viscous, milky-white substance is stored in a jar or flask, coated on the inside with oil of slipperiness. One ounce of the glue can cover a 1-ft square surface, taking 1 minute to set. Once it sets, the bond it creates can be broken only by universal solvent, oil of etherealness, or with a Wish spell.",
		descriptionFull : "This viscous, milky-white substance can form a permanent adhesive bond between any two objects. It must be stored in a jar or flask that has been coated inside with oil of slipperiness. When found, a container contains 1d6+1 ounces.\n   One ounce of the glue can cover a 1-foot square surface. The glue takes 1 minute to set. Once it has done so, the bond it creates can be broken only by the application of universal solvent or oil of etherealness, or with a Wish spell.",
		usages : "1d6+1",
		recovery : "Never"
	},
	"spell scroll" : {
		name : "Spell Scroll",
		source : [["SRD", 242], ["D", 200]],
		type : "scroll",
		description : "If the spell on this scroll is on my class' spell list(s), I can cast it with its normal casting time, but have the scroll crumble to dust. If the spell is of a higher level than I can cast, I need to make an ability check using my spellcasting ability. The DC for this, the spell save, and its attack modifier depend on its level.",
		descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without providing any material components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 10 + the spell's level. On a failed check, the spell disappears from the scroll with no other effect.\n   The level of the spell on the scroll determines the spell's saving throw DC and attack bonus, as well as the scroll's rarity, as shown below.\n\n" + toUni("Level\tRarity\t\tDC\tTo hit") + [
			"\nCantrip\tCommon  \t13\t+5",
			"1st  \tCommon  \t13\t+5",
			"2nd  \tUncommon\t13\t+5",
			"3rd  \tUncommon\t15\t+7",
			"4th  \tRare\t\t15\t+7",
			"5th  \tRare\t\t17\t+9",
			"6th  \tVery rare    \t17\t+9",
			"7th  \tVery rare    \t18\t+10",
			"8th  \tVery rare    \t18\t+10",
			"9th  \tLegendary  \t19\t+11"
		].join("\n") + "\n\nA wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on an Intelligence (Arcana) check with a DC equal to 10 + the spell's level. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.",
		allowDuplicates : true,
		calcChanges : {
			spellAdd : [
				function (spellKey, spellObj, spName) {
					if ((/^spell scroll/i).test(spName)) {
						if (!spellObj.components) spellObj.components = "";
						spellObj.components = (spellObj.components.replace(/,?[RM][\u0192\u2020]?/ig, '') + ",M\u0192").replace(/^,+/, '');
						spellObj.compMaterial = "Spells cast from a spell scroll don't require any material components other than the spell scroll itself.";
						spellObj.ritual = false;
						["description", "descriptionMetric", "descriptionShorter", "descriptionShorterMetric"].forEach (function (attr) {
							if (!spellObj[attr]) return;
							spellObj[attr] = spellObj[attr].replace(/ \(\d+k? ?gp( cons\.?)?\)/i, '');
						});
						return true;
					}
				},
				"When casting a spell using a Spell Scroll, no material components are needed other than the spell scroll itself. They also can't be cast as a ritual."
			]
		},
		choices : ["Cantrip", "1st-level", "2nd-level", "3rd-level", "4th-level", "5th-level", "6th-level", "7th-level", "8th-level", "9th-level", "mixed levels"],
		"cantrip" : {
			name : "Spell Scroll (cantrip)",
			sortname : "Spell Scroll  (cantrip)",
			rarity : "common",
			magicItemTable : "A",
			description : "If the cantrip on this scroll is on my class' spell list(s), I can cast it, having the scroll crumble to dust afterwards. If I can't cast any cantrips, I need to make a DC 10 check with my spellcasting ability to use this scroll or it is destroyed if I fail. The cantrips is cast with DC 13 and a +5 attack modifier.",
			descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without providing any material components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 10. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 13 and an attack bonus of +5.",
			extraTooltip : "AL: can always be bought for 25 gp",
			fixedDC : 13,
			spellFirstColTitle : "Us", // used
			spellcastingBonus : {
				level : [0,0],
				psionic : false,
				times : 20,
				firstCol : "checkbox",
				magicItemComponents : false
			}
		},
		"1st-level" : {
			rarity : "common",
			magicItemTable : "A",
			description : "If the 1st-level spell on this scroll is on my class' spell list(s), I can cast it, having the scroll crumble to dust afterwards. If the spell is of a level that I can't yet cast, I need to make a DC 11 check with my spellcasting ability to use this scroll or it is destroyed if I fail. The spell is cast with DC 13 and a +5 attack modifier.",
			descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without providing any material components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 11. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 13 and an attack bonus of +5.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 11 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.",
			extraTooltip : "AL: can always be bought for 75 gp",
			fixedDC : 13,
			spellFirstColTitle : "Us", // used
			spellcastingBonus : {
				level : [1,1],
				psionic : false,
				times : 20,
				firstCol : "checkbox",
				magicItemComponents : false
			}
		},
		"2nd-level" : {
			rarity : "uncommon",
			magicItemTable : ["A", "B"],
			description : "If the 2nd-level spell on this scroll is on my class' spell list(s), I can cast it, having the scroll crumble to dust afterwards. If the spell is of a level that I can't yet cast, I need to make a DC 12 check with my spellcasting ability to use this scroll or destroy it if I fail. The spell is cast with DC 13 and a +5 attack modifier.",
			descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without providing any material components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 12. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 13 and an attack bonus of +5.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 12 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.",
			extraTooltip : "AL: can always be bought for 150 gp",
			fixedDC : 13,
			spellFirstColTitle : "Us", // used
			spellcastingBonus : {
				level : [2,2],
				psionic : false,
				times : 20,
				firstCol : "checkbox",
				magicItemComponents : false
			}
		},
		"3rd-level" : {
			rarity : "uncommon",
			magicItemTable : "B",
			description : "If the 3rd-level spell on this scroll is on my class' spell list(s), I can cast it, having the scroll crumble to dust afterwards. If the spell is of a level that I can't yet cast, I need to make a DC 13 check with my spellcasting ability to use this scroll or it is destroyed if I fail. The spell is cast with DC 15 and a +7 attack modifier.",
			descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without providing any material components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 13. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 15 and an attack bonus of +7.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 13 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.",
			extraTooltip : "AL: can always be bought for 300 gp",
			fixedDC : 15,
			spellFirstColTitle : "Us", // used
			spellcastingBonus : {
				level : [3,3],
				psionic : false,
				times : 20,
				firstCol : "checkbox",
				magicItemComponents : false
			}
		},
		"4th-level" : {
			rarity : "rare",
			magicItemTable : "C",
			description : "If the 4th-level spell on this scroll is on my class' spell list(s), I can cast it, having the scroll crumble to dust afterwards. If the spell is of a level that I can't yet cast, I need to make a DC 14 check with my spellcasting ability to use this scroll or it is destroyed if I fail. The spell is cast with DC 15 and a +7 attack modifier.",
			descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without providing any material components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 14. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 15 and an attack bonus of +7.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 14 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.",
			extraTooltip : "AL: can always be bought for 500 gp",
			fixedDC : 15,
			spellFirstColTitle : "Us", // used
			spellcastingBonus : {
				level : [4,4],
				psionic : false,
				times : 20,
				firstCol : "checkbox",
				magicItemComponents : false
			}
		},
		"5th-level" : {
			rarity : "rare",
			magicItemTable : "C",
			description : "If the 5th-level spell on this scroll is on my class' spell list(s), I can cast it, having the scroll crumble to dust afterwards. If the spell is of a level that I can't yet cast, I need to make a DC 15 check with my spellcasting ability to use this scroll or it is destroyed if I fail. The spell is cast with DC 17 and a +9 attack modifier.",
			descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without providing any material components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 15. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 17 and an attack bonus of +9.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 15 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.",
			extraTooltip : "AL: can always be bought for 1000 gp",
			fixedDC : 17,
			spellFirstColTitle : "Us", // used
			spellcastingBonus : {
				level : [5,5],
				psionic : false,
				times : 20,
				firstCol : "checkbox",
				magicItemComponents : false
			}
		},
		"6th-level" : {
			rarity : "very rare",
			magicItemTable : "D",
			description : "If the 6th-level spell on this scroll is on my class' spell list(s), I can cast it, having the scroll crumble to dust afterwards. If the spell is of a level that I can't yet cast, I need to make a DC 16 check with my spellcasting ability to use this scroll or it is destroyed if I fail. The spell is cast with DC 17 and a +9 attack modifier.",
			descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without providing any material components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 16. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 17 and an attack bonus of +9.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 16 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.",
			fixedDC : 17,
			spellFirstColTitle : "Us", // used
			spellcastingBonus : {
				level : [6,6],
				psionic : false,
				times : 20,
				firstCol : "checkbox",
				magicItemComponents : false
			}
		},
		"7th-level" : {
			rarity : "very rare",
			magicItemTable : "D",
			description : "If the 7th-level spell on this scroll is on my class' spell list(s), I can cast it, having the scroll crumble to dust afterwards. If the spell is of a level that I can't yet cast, I need to make a DC 17 check with my spellcasting ability to use this scroll or it is destroyed if I fail. The spell is cast with DC 18 and a +10 attack modifier.",
			descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without providing any material components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 17. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 18 and an attack bonus of +10.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 17 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.",
			fixedDC : 18,
			spellFirstColTitle : "Us", // used
			spellcastingBonus : {
				level : [7,7],
				psionic : false,
				times : 20,
				firstCol : "checkbox",
				magicItemComponents : false
			}
		},
		"8th-level" : {
			rarity : "very rare",
			magicItemTable : ["D", "E"],
			description : "If the 8th-level spell on this scroll is on my class' spell list(s), I can cast it, having the scroll crumble to dust afterwards. If the spell is of a level that I can't yet cast, I need to make a DC 18 check with my spellcasting ability to use this scroll or it is destroyed if I fail. The spell is cast with DC 18 and a +10 attack modifier.",
			descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without providing any material components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 18. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 18 and an attack bonus of +10.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 18 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.",
			fixedDC : 18,
			spellFirstColTitle : "Us", // used
			spellcastingBonus : {
				level : [8,8],
				psionic : false,
				times : 20,
				firstCol : "checkbox",
				magicItemComponents : false
			}
		},
		"9th-level" : {
			rarity : "legendary",
			magicItemTable : "E",
			description : "If the 9th-level spell on this scroll is on my class' spell list(s), I can cast it, having the scroll crumble to dust afterwards. If the spell is of a level that I can't yet cast, I need to make a DC 19 check with my spellcasting ability to use this scroll or it is destroyed if I fail. The spell is cast with DC 19 and a +11 attack modifier.",
			descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without providing any material components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 19. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 19 and an attack bonus of +11.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 19 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.",
			fixedDC : 19,
			spellFirstColTitle : "Us", // used
			spellcastingBonus : {
				level : [9,9],
				psionic : false,
				times : 20,
				firstCol : "checkbox",
				magicItemComponents : false
			}
		},
		"mixed levels" : {
			description : "If the spell on this scroll is on my class' spell list, I can cast it, having the scroll crumble to dust afterwards. If the spell's level is higher than I can cast, I need to make a DC 10 + spell level check with my spellcasting ability, destroying it if I fail. The DC will be listed on the spell sheet's first column (spell attack = DC - 8).",
			spellFirstColTitle : "DC",
			spellcastingBonus : {
				level : [0,9],
				psionic : false,
				times : 20,
				magicItemComponents : false
			},
			calcChanges : {
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if ((/mixed levels/).test(spName)) {
							spellObj.firstCol = spellObj.level < 3 ? 13 : spellObj.level < 5 ? 15 : spellObj.level < 7 ? 17 : spellObj.level < 9 ? 18 : 19;
							return true;
						}
					}, ""
				]
			}
		}
	},
	"spellguard shield" : {
		name : "Spellguard Shield",
		source : [["SRD", 242], ["D", 201]],
		type : "shield",
		rarity : "very rare",
		magicItemTable : "H",
		description : "While holding this shield, I have advantage on saving throws against spells and other magical effects, and spell attacks have disadvantage against me.",
		descriptionFull : "While holding this shield, you have advantage on saving throws against spells and other magical effects, and spell attacks have disadvantage against you.",
		attunement : true,
		weight : 6,
		shieldAdd : "Spellguard Shield",
		savetxt : { adv_vs : ["spells", "magical effects"] }
	},
	"sphere of annihilation" : {
		name : "Sphere of Annihilation",
		source : [["SRD", 242], ["D", 201]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "This 1-ft radius black sphere obliterates all matter it comes into contact with, except artifacts. Anything not wholly engulfed by it and destroyed takes 4d10 force damage. I can control it as an action with a DC 25 Arcana check, moving it 5 ft per my Int mod, or 10 ft towards me if I fail. See notes page for more details.",
		descriptionFull : "This 2-foot-diameter black sphere is a hole in the multiverse, hovering in space and stabilized by a magical field surrounding it.\n   The sphere obliterates all matter it passes through and all matter that passes through it. Artifacts are the exception. Unless an artifact is susceptible to damage from a sphere of annihilation, it passes through the sphere unscathed. Anything else that touches the sphere but isn't wholly engulfed and obliterated by it takes 4d10 force damage.\n   The sphere is stationary until someone controls it. If you are within 60 feet of an uncontrolled sphere, you can use an action to make a DC 25 Intelligence (Arcana) check. On a success, the sphere levitates in one direction of your choice, up to a number of feet equal to 5 \xD7 your Intelligence modifier (minimum 5 feet). On a failure, the sphere moves 10 feet toward you. A creature whose space the sphere enters must succeed on a DC 13 Dexterity saving throw or be touched by it, taking 4d10 force damage.\n   If you attempt to control a sphere that is under another creature's control, you make an Intelligence (Arcana) check contested by the other creature's Intelligence (Arcana) check. The winner of the contest gains control of the sphere and can levitate it as normal.\n   If the sphere comes into contact with a planar portal, such as that created by the Gate spell, or an extradimensional space, such as that within a portable hole, the DM determines randomly what happens, using the following table.\n\n" + toUni("d100\tResult") + "\n01-50\tThe sphere is destroyed.\n51-85\tThe sphere moves through the portal or into the extradimensional space.\n86-00\tA spatial rift sends each creature and object within 180 feet of the sphere, including the sphere, to a random plane of existence.",
		action : [["action", ""]],
		toNotesPage : [{
			name : "Special Properties",
			note : [
				"This 2-ft-diameter black sphere is a hole in the multiverse, hovering in space and stabilized by a magical field surrounding it. It obliterates all matter it passes through and all matter that passes through it. Artifacts are the exception. Unless an artifact is susceptible to damage from a sphere of annihilation, it passes through the sphere unscathed. Anything else that touches the sphere but isn't wholly engulfed and obliterated by it takes 4d10 force damage.",
				"The sphere is stationary until someone controls it. If I am within 60 ft of an uncontrolled sphere, I can use an action to make a DC 25 Intelligence (Arcana) check. On a success, the sphere levitates in one direction of my choice, up to 5 ft \xD7 my Intelligence modifier (minimum 5 ft). On a failure, the sphere moves 10 ft toward me. A creature whose space the sphere enters must succeed on a DC 13 Dexterity saving throw or be touched by it, taking 4d10 force damage.",
				"If I attempt to control a sphere that is under another creature's control, I make an Intelligence (Arcana) check contested by the other creature's Intelligence (Arcana) check. The winner of the contest gains control of the sphere and can levitate it as normal.",
				"If the sphere comes into contact with a planar portal, such as that created by the Gate spell, or an extradimensional space, such as that within a portable hole, the DM determines randomly what happens, by rolling a d100.",
				" \u2022 01-50 The sphere is destroyed.",
				" \u2022 51-85 The sphere moves through the portal or into the extradimensional space.",
				" \u2022 86-00 A spatial rift sends each creature and object within 180 ft of the sphere, including the sphere, to a random plane of existence."
			]
		}]
	},
	"staff of charming" : {
		name : "Staff of Charming",
		source : [["SRD", 243], ["D", 201]],
		type : "staff",
		rarity : "rare",
		magicItemTable : "G",
		description : "This staff has 10 charges, regaining 1d8+2 at dawn, 5% chance it loses its magic when its last charge is used. If an enchantment spell is cast only on me, I can use the staff to, once per dawn, turn a failed save into a success and as a reaction if I make the save, I can expend 1 charge to turn the spell back on its caster.",
		descriptionFull : "While holding this staff, you can use an action to expend 1 of its 10 charges to cast Charm Person, Command, or Comprehend Languages from it using your spell save DC. The staff can also be used as a magic quarterstaff.\n   If you are holding the staff and fail a saving throw against an enchantment spell that targets only you, you can turn your failed save into a successful one. You can't use this property of the staff again until the next dawn. If you succeed on a save against an enchantment spell that targets only you, with or without the staff's intervention, you can use your reaction to expend 1 charge from the staff and turn the spell back on its caster as if you had cast the spell.\n   The staff regains 1d8+2 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff becomes a nonmagical quarterstaff.",
		attunement : true,
		weight : 4,
		prerequisite : "Requires attunement by a bard, cleric, druid, sorcerer, warlock, or wizard",
		prereqeval : function(v) { return classes.known.bard || classes.known.cleric || classes.known.druid || classes.known.sorcerer || classes.known.warlock || classes.known.wizard ? true : false; },
		extraLimitedFeatures : [{
			name : "Staff of Charming (pass enchantment save)",
			usages : 1,
			recovery : "dawn"
		}],
		usages : 10,
		recovery : "dawn",
		additional : "charges, regains 1d8+2",
		spellcastingAbility : "class",
		spellFirstColTitle : "Ch",
		spellcastingBonus : {
			name : "1 charge",
			spells : ["charm person", "command", "comprehend languages"],
			selection : ["charm person", "command", "comprehend languages"],
			firstCol : 1,
			times : 3
		},
		action : [["reaction", ""]]
	},
	"staff of fire" : {
		name : "Staff of Fire",
		source : [["SRD", 243], ["D", 201]],
		type : "staff",
		rarity : "very rare",
		magicItemTable : "H",
		description : "I have resistance to fire while I'm holding this staff. It has 10 charges, regaining 1d6+4 expended charges at dawn. If I use its last charge, roll a d20. On a 1, it is destroyed. I can use its charges to cast Burning Hands (1 charge), Fireball (3 charges), and Wall of Fire (4 charges), using my spellcasting ability.",
		descriptionFull : "You have resistance to fire damage while you hold this staff.\n   The staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: Burning Hands (1 charge), Fireball (3 charges), or Wall of Fire (4 charges).\n   The staff regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff blackens, crumbles into cinders, and is destroyed.",
		attunement : true,
		weight : 4,
		prerequisite : "Requires attunement by a druid, sorcerer, warlock, or wizard",
		prereqeval : function(v) { return classes.known.druid || classes.known.sorcerer || classes.known.warlock || classes.known.wizard ? true : false; },
		usages : 10,
		recovery : "dawn",
		additional : "regains 1d6+4",
		dmgres : ["Fire"],
		spellcastingAbility : "class",
		spellFirstColTitle : "Ch",
		spellcastingBonus : [{
			name : "1 charge",
			spells : ["burning hands"],
			selection : ["burning hands"],
			firstCol : 1
		}, {
			name : "3 charges",
			spells : ["fireball"],
			selection : ["fireball"],
			firstCol : 3
		}, {
			name : "4 charges",
			spells : ["wall of fire"],
			selection : ["wall of fire"],
			firstCol : 4
		}]
	},
	"staff of frost" : {
		name : "Staff of Frost",
		source : [["SRD", 243], ["D", 202]],
		type : "staff",
		rarity : "very rare",
		magicItemTable : "H",
		description : "I have resistance to cold while I'm holding this staff. It has 10 charges, regaining 1d6+4 at dawn. If I use its last charge, roll a d20. On a 1, it is destroyed. I can use its charges to cast Cone of Cold (5 charges), Fog Cloud (1 charge), Ice Storm (4 charges), and Wall of Ice (4 charges) using my spellcasting ability.",
		descriptionFull : "You have resistance to cold damage while you hold this staff.\n   The staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: Cone of Cold (5 charges), Fog Cloud (1 charge), Ice Storm (4 charges), or Wall of Ice (4 charges).\n   The staff regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1. the staff turns to water and is destroyed.",
		attunement : true,
		weight : 4,
		prerequisite : "Requires attunement by a druid, sorcerer, warlock, or wizard",
		prereqeval : function(v) { return classes.known.druid || classes.known.sorcerer || classes.known.warlock || classes.known.wizard ? true : false; },
		usages : 10,
		recovery : "dawn",
		additional : "regains 1d6+4",
		dmgres : ["Cold"],
		spellcastingAbility : "class",
		spellFirstColTitle : "Ch",
		spellcastingBonus : [{
			name : "1 charge",
			spells : ["fog cloud"],
			selection : ["fog cloud"],
			firstCol : 1
		}, {
			name : "4 charges",
			spells : ["ice storm", "wall of ice"],
			selection : ["ice storm", "wall of ice"],
			firstCol : 4,
			times : 2
		}, {
			name : "5 charges",
			spells : ["cone of cold"],
			selection : ["cone of cold"],
			firstCol : 5
		}]
	},
	"staff of healing" : {
		name : "Staff of Healing",
		source : [["SRD", 243], ["D", 202]],
		type : "staff",
		rarity : "rare",
		magicItemTable : "G",
		description : "This staff has 10 charges, regaining 1d6+4 expended charges at dawn. If I use its last charge, roll a d20. On a 1, it vanishes in a flash of light. I can use its charges to cast Cure Wounds (1 charge per spell level, up to 4th), Lesser Restoration (2 charges), and Mass Cure Wounds (5 charges) using my spellcasting ability.",
		descriptionFull : "This staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC and spellcasting ability modifier: Cure Wounds (1 charge per spell level, up to 4th), Lesser Restoration (2 charges), or Mass Cure Wounds (5 charges).\n   The staff regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1. the staff vanishes in a flash of light, lost forever.",
		attunement : true,
		weight : 4,
		prerequisite : "Requires attunement by a bard, cleric, or druid",
		prereqeval : function(v) { return classes.known.bard || classes.known.cleric || classes.known.druid ? true : false; },
		usages : 10,
		recovery : "dawn",
		additional : "regains 1d6+4",
		spellcastingAbility : "class",
		spellFirstColTitle : "Ch",
		spellcastingBonus : [{
			name : "1+ charges",
			spells : ["cure wounds"],
			selection : ["cure wounds"],
			firstCol : "1+"
		}, {
			name : "2 charges",
			spells : ["lesser restoration"],
			selection : ["lesser restoration"],
			firstCol : 2
		}, {
			name : "5 charges",
			spells : ["mass cure wounds"],
			selection : ["mass cure wounds"],
			firstCol : 5
		}],
		spellChanges : {
			"cure wounds" : {
				noSpellUpcasting : false,
				description : "1 living creature heals 1d8+1d8/SL+spell mod HP; +1 SL/extra charge",
				changes : "The spell level Cure Wounds is cast at depends on the amount of charges spend, 1 charge per spell slot level."
			}
		}
	},
	"staff of power" : {
		name : "Staff of Power",
		source : [["SRD", 243], ["D", 202]],
		type : "staff",
		rarity : "very rare",
		magicItemTable : "H",
		description : "While holding this +2 quarterstaff, I gain a +2 bonus on saves, AC, and spell attacks. The staff has 20 charges, regaining 2d8+4 at dawn. Charges can be used to cast spells, or, on a hit in melee with it, I can expend 1 charge to deal +1d6 force damage. As an action, I can break it, causing a 30-ft radius explosion.",
		descriptionLong : "While holding this staff, I gain a +2 bonus on saves, AC, and spell attacks. The staff has 20 charges, regaining 2d8+4 at dawn. If I use the last charge, roll a d20. On a 1, it converts to a +2 quarterstaff without other abilities. On a 20, it regains 1d8+2 charges. Charges can be used to cast spells, or, on a hit in melee with it, I can expend 1 charge to deal +1d6 force damage. As an action, I can break it so it explodes. When it explodes, there is a 50% chance I teleport to a random plane, otherwise I take 16\xD7 the charges left in force damage. All within 10 ft take 8\xD7, 20 ft 6\xD7, and 30 ft 4\xD7; DC 17 Dex save halves.",
		descriptionFull : "This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. While holding it, you gain a +2 bonus to Armor Class, saving throws, and spell attack rolls.\n   The staff has 20 charges for the following properties. The staff regains 2d8+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff retains its +2 bonus to attack and damage roll but loses all other properties. On a 20, the staff regain 1d8+2 charges.\n   " + toUni("Power Strike") + ". When you hit with a melee attack using the staff, you can expend 1 charge to deal an extra 1d6 force damage to the target.\n   " + toUni("Spells") + ". While holding this staff, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC and spell attack bonus: Cone of Cold (5 charges), Fireball (5th-level version, 5 charges), Globe of Invulnerability (6 charges), Hold Monster (5 charges), Levitate (2 charges). Lightning Bolt (5th-level version, 5 charges), Magic Missile (1 charge), Ray of Enfeeblement (1 charge), or Wall of Force (5 charges).\n   " + toUni("Retributive Strike") + ". You can use an action to break the staff over your knee or against a solid surface, performing a retributive strike. The staff is destroyed and releases its remaining magic in an explosion that expands to fill a 30-foot-radius sphere centered on it.\n   You have a 50% chance to instantly travel to a random plane of existence, avoiding the explosion. If you fail to avoid the effect, you take force damage equal to 16 \xD7 the number of charges in the staff. Every other creature in the area must make a DC 17 Dexterity saving throw. On a failed save, a creature takes an amount of damage based on how far away it is from the point of origin, as shown in the following table. On a successful save, a creature takes half as much damage.\n\n" + toUni("Distance from Origin\tEffect") + "\n10 ft. away or closer\t8 \xD7 the number of charges in the staff\n11 to 20 ft. away\t6 \xD7 the number of charges in the staff\n21 to 30 ft. away\t4 \xD7 the number of charges in the staff",
		attunement : true,
		weight : 4,
		prerequisite : "Requires attunement by a sorcerer, warlock, or wizard",
		prereqeval : function(v) { return classes.known.sorcerer || classes.known.warlock || classes.known.wizard ? true : false; },
		usages : 20,
		recovery : "dawn",
		additional : "regains 2d8+4",
		weaponsAdd : ["Staff of Power"],
		weaponOptions : {
			baseWeapon : "quarterstaff",
			regExpSearch : /^(?=.*staff)(?=.*power).*$/i,
			name : "Staff of Power",
			source : [["SRD", 243], ["D", 202]],
			description : "Versatile (1d8); On hit, 1 charge for +1d6 force damage",
			modifiers : [2, 2]
		},
		calcChanges : {
			spellCalc : [
				function (type, spellcasters, ability) {
					if (type == "attack") return 2;
				},
				"While holding the Staff of Power, I have a +2 bonus to spell attack rolls."
			]
		},
		addMod : [{ type : "save", field : "all", mod : 2, text : "While holding the Staff of Power, I gain a +2 bonus to all my saving throws." }],
		extraAC : [{name : "Staff of Power", mod : 2, magic : true, text : "I gain a +2 bonus to AC while attuned."}],
		action : [["action", " (Retributive Strike)"]],
		spellcastingAbility : "class",
		spellFirstColTitle : "Ch",
		spellcastingBonus : [{
			name : "5 charges; 5th level",
			spells : ["fireball", "lightning bolt"],
			selection : ["fireball", "lightning bolt"],
			firstCol : 5,
			times : 2
		}, {
			name : "6 charges",
			spells : ["globe of invulnerability"],
			selection : ["globe of invulnerability"],
			firstCol : 6
		}, {
			name : "5 charges",
			spells : ["cone of cold", "hold monster", "wall of force"],
			selection : ["cone of cold", "hold monster", "wall of force"],
			firstCol : 5,
			times : 3
		}, {
			name : "2 charges",
			spells : ["levitate"],
			selection : ["levitate"],
			firstCol : 2
		}, {
			name : "1 charge",
			spells : ["magic missile", "ray of enfeeblement"],
			selection : ["magic missile", "ray of enfeeblement"],
			firstCol : 1,
			times : 2
		}],
		spellChanges : {
			"fireball" : {
				nameShort : "Fireball (5th level)",
				description : "20-ft rad all crea 10d6 Fire dmg; save halves; unattended flammable objects ignite",
				changes : "Cast as if using a 5th-level spell slot."
			},
			"lightning bolt" : {
				nameShort : "Lightning Bolt (5th level)",
				description : "100-ft long 5-ft wide all 10d6 Lightning dmg; save halves; unattended flammable obj ignite",
				changes : "Cast as if using a 5th-level spell slot."
			}
		}
	},
	"staff of striking" : {
		name : "Staff of Striking",
		source : [["SRD", 244], ["D", 203]],
		type : "staff",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This staff function as a +3 quarterstaff and has 10 charges, regaining 1d6+4 at dawn. There is a 5% chance that expending the last charge makes it nonmagical. When I hit with a melee attack using it, I can expend up to 3 of its charges. For each charge I expend, the target takes an extra 1d6 force damage.",
		descriptionFull : "This staff can be wielded as a magic quarterstaff that grants a +3 bonus to attack and damage rolls made with it.\n   The staff has 10 charges. When you hit with a melee attack using it, you can expend up to 3 of its charges. For each charge you expend, the target takes an extra 1d6 force damage. The staff regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff becomes a nonmagical quarterstaff.",
		attunement : true,
		weight : 4,
		usages : 10,
		recovery : "dawn",
		additional : "regains 1d6+4",
		weaponsAdd : ["Staff of Striking"],
		weaponOptions : {
			baseWeapon : "quarterstaff",
			regExpSearch : /^(?=.*staff)(?=.*striking).*$/i,
			name : "Staff of Striking",
			source : [["SRD", 244], ["D", 203]],
			modifiers : [3, 3],
			description : "Versatile (1d8); On hit, 1-3 charges for +1d6 force damage per charge"
		}
	},
	"staff of swarming insects" : {
		name : "Staff of Swarming Insects",
		source : [["SRD", 244], ["D", 203]],
		type : "staff",
		rarity : "rare",
		magicItemTable : "G",
		description : "This staff has 10 charges, regaining 1d6+4 at dawn, 5% chance it is destroyed when its last charge is used. As an action, I can expend 1 charge to create a 30-ft radius swarm of flying insects for 10 minutes that moves with me, making the area heavily obscured for anybody but me. A 10+ mph wind disperses it.",
		descriptionFull : "This staff has 10 charges and regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, a swarm of insects consumes and destroys the staff, then disperses.\n   " + toUni("Spells") + ". While holding the staff, you can use an action to expend some of its charges to cast one of the following spells from it, using your spell save DC: Giant Insect (4 charges) or Insect Plague (5 charges).\n   " + toUni("Insect Cloud") + ". While holding the staff, you can use an action and expend 1 charge to cause a swarm of harmless flying insects to spread out in a 30-foot radius from you. The insects remain for 10 minutes, making the area heavily obscured for creatures other than you. The swarm moves with you, remaining centered on you. A wind of at least 10 miles per hour disperses the swarm and ends the effect.",
		attunement : true,
		weight : 4,
		prerequisite : "Requires attunement by a bard, cleric, druid, sorcerer, warlock, or wizard",
		prereqeval : function(v) { return classes.known.bard || classes.known.cleric || classes.known.druid || classes.known.sorcerer || classes.known.warlock || classes.known.wizard ? true : false; },
		usages : 10,
		recovery : "dawn",
		additional : "regains 1d6+4",
		action : [["action", ""]],
		spellcastingAbility : "class",
		spellFirstColTitle : "Ch",
		spellcastingBonus : [{
			name : "4 charges",
			spells : ["giant insect"],
			selection : ["giant insect"],
			firstCol : 4
		}, {
			name : "5 charges",
			spells : ["insect plague"],
			selection : ["insect plague"],
			firstCol : 5
		}]
	},
	"staff of the magi" : { // contains contributions by Pengsloth
		name : "Staff of the Magi",
		source : [["SRD", 244], ["D", 203]],
		type : "staff",
		rarity : "legendary",
		magicItemTable : "I",
		description : "While holding this +2 quarterstaff, I have adv. on saves vs. spells and +2 on spell attacks. The staff has 50 charges to cast spells, regaining 4d6+2 at dawn. As a reaction, I can absorb a spell targeting only me, converting its spell level to charges. If this brings it over 50 charges or I break it is as an action, it explodes.",
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
		additional : "regains 4d6+2",
		savetxt : { adv_vs : ["spells"] },
		action : [
			["reaction", " (Spell Absorption)"],
			["action", " (Retributive Strike)"]
		],
		spellcastingAbility : "class",
		spellFirstColTitle : "Ch",
		spellcastingBonus : [{
			name : "7 charges",
			spells : ["conjure elemental", "plane shift"],
			selection : ["conjure elemental", "plane shift"],
			firstCol : 7,
			times : 2
		}, {
			name : "7 charges; 7th level",
			spells : ["fireball", "lightning bolt"],
			selection : ["fireball", "lightning bolt"],
			firstCol : 7,
			times : 2
		}, {
			name : "5 charges",
			spells : ["passwall", "telekinesis"],
			selection : ["passwall", "telekinesis"],
			firstCol : 5,
			times : 2
		}, {
			name : "4 charges",
			spells : ["ice storm", "wall of fire"],
			selection : ["ice storm", "wall of fire"],
			firstCol : 4,
			times : 2
		}, {
			name : "3 charges",
			spells : ["dispel magic"],
			selection : ["dispel magic"],
			firstCol : 3
		}, {
			name : "2 charges",
			spells : ["flaming sphere", "invisibility", "knock", "web"],
			selection : ["flaming sphere", "invisibility", "knock", "web"],
			firstCol : 2,
			times : 4
		}, {
			name : "0 charges",
			spells : ["light", "mage hand", "arcane lock", "detect magic", "enlarge/reduce", "protection from evil and good"],
			selection : ["light", "mage hand", "arcane lock", "detect magic", "enlarge/reduce", "protection from evil and good"],
			firstCol : "atwill",
			times : 6
		}],
		spellChanges : {
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
	"staff of the python" : {
		name : "Staff of the Python",
		source : [["SRD", 245], ["D", 204]],
		type : "staff",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "As an action, I can speak the command word and throw this staff to have it become a giant constrictor snake within 10 ft with full HP. It has its own initiative. I can command it mentally on my turn if within 60 ft. As a bonus action, I can command it to revert back to a staff. If the snake reaches 0 HP, the staff is destroyed.",
		descriptionLong : "As an action, I can speak this staff's command word and throw the staff on the ground within 10 ft where it becomes a giant constrictor snake. As a bonus action, I can speak the command word again to have it return to its staff form. The snake acts on its own initiative count. On my turn, I can mentally command the snake if it is within 60 ft of me and I'm not incapacitated, deciding what it does on its next turn or a more general command. If the snake is reduced to 0 HP, it dies, reverts to its staff form, and the staff then shatters and is destroyed. Otherwise, the snake always starts out with full HP.",
		descriptionFull : "You can use an action to speak this staff's command word and throw the staff on the ground within 10 feet of you. The staff becomes a giant constrictor snake under your control and acts on its own initiative count. By using a bonus action to speak the command word again, you return the staff to its normal form in a space formerly occupied by the snake.\n   On your turn, you can mentally command the snake if it is within 60 feet of you and you aren't incapacitated. You decide what action the snake takes and where it moves during its next turn, or you can issue it a general command, such as to attack your enemies or guard a location.\n   If the snake is reduced to 0 hit points, it dies and reverts to its staff form. The staff then shatters and is destroyed. If the snake reverts to staff form before losing all its hit points, it regains all of them.",
		attunement : true,
		weight : 4,
		prerequisite : "Requires attunement by a cleric, druid, or warlock",
		prereqeval : function(v) { return classes.known.cleric || classes.known.druid || classes.known.warlock ? true : false; },
		action : [["action", " (animate)"], ["bonus action", " (end)"]]
	},
	"staff of the woodlands" : {
		name : "Staff of the Woodlands",
		source : [["SRD", 245], ["D", 204]],
		type : "staff",
		rarity : "rare",
		magicItemTable : "G",
		description : "This +2 quarterstaff gives me a +2 bonus on spell attacks. It has 10 charges, regaining 1d6+4 at dawn, 5% chance of losing its magic when its last charge is used. As an action, I can plant it into the ground and expend 1 charge to have it grow into a 60 ft tree, which it remains until I use another action to revert it back.",
		descriptionFull : "This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. While holding it, you have a +2 bonus to spell attack rolls.\n   The staff has 10 charges for the following properties. It regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff loses its properties and becomes a nonmagical quarterstaff.\n   " + toUni("Spells") + ". You can use an action to expend 1 or more of the staff's charges to cast one of the following spells from it, using your spell save DC: Animal Friendship (1 charge), Awaken (5 charges), Barkskin (2 charges), Locate Animals or Plants (2 charges), Speak with Animals (1 charge), Speak with Plants (3 charges), or Wall of Thorns (6 charges).\n   You can also use an action to cast the Pass Without Trace spell from the staff without using any charges.\n   " + toUni("Tree Form") + ". You can use an action to plant one end of the staff in fertile earth and expend 1 charge to transform the staff into a healthy tree. The tree is 60 feet tall and has a 5-foot-diameter trunk, and its branches at the top spread out in a 20-foot radius. The tree appears ordinary but radiates a faint aura of transmutation magic if targeted by Detect Magic. While touching the tree and using another action to speak its command word, you return the staff to its normal form. Any creature in the tree falls when it reverts to a staff.",
		attunement : true,
		weight : 4,
		prerequisite : "Requires attunement by a druid",
		prereqeval : function(v) { return classes.known.druid ? true : false; },
		action : [["action", ""]],
		usages : 10,
		recovery : "dawn",
		additional : "regains 1d6+4",
		weaponsAdd : ["Staff of the Woodlands"],
		weaponOptions : {
			baseWeapon : "quarterstaff",
			regExpSearch : /^(?=.*staff)(?=.*woodlands).*$/i,
			name : "Staff of the Woodlands",
			source : [["SRD", 245], ["D", 204]],
			modifiers : [2, 2]
		},
		calcChanges : {
			spellCalc : [
				function (type, spellcasters, ability) {
					if (type == "attack") return 2;
				},
				"While holding the Staff of the Woodlands, I have a +2 bonus to spell attack rolls."
			]
		},
		spellcastingAbility : "class",
		spellFirstColTitle : "Ch",
		spellcastingBonus : [{
			name : "At will",
			spells : ["pass without trace"],
			selection : ["pass without trace"],
			firstCol : "atwill"
		}, {
			name : "1 charge",
			spells : ["animal friendship", "speak with animals"],
			selection : ["animal friendship", "speak with animals"],
			firstCol : 1,
			times : 2
		}, {
			name : "2 charges",
			spells : ["barkskin", "locate animals or plants"],
			selection : ["barkskin", "locate animals or plants"],
			firstCol : 2,
			times : 2
		}, {
			name : "3 charges",
			spells : ["speak with plants"],
			selection : ["speak with plants"],
			firstCol : 3
		}, {
			name : "5 charges",
			spells : ["awaken"],
			selection : ["awaken"],
			firstCol : 5
		}, {
			name : "6 charges",
			spells : ["wall of thorns"],
			selection : ["wall of thorns"],
			firstCol : 6
		}],
		spellChanges : {
			"awaken" : {
				time : "1 a",
				changes : "Casting time is only 1 action instead of 8 hours."
			}
		}
	},
	"staff of thunder and lightning" : {
		name : "Staff of Thunder and Lightning",
		source : [["SRD", 245], ["D", 204]],
		type : "staff",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This +2 quarterstaff has 5 special abilities that each can be used once per dawn. Both 'Lightning' and 'Thunder' can be used when I hit a melee attack with it, while 'Lightning Strike', 'Thunderclap', and 'Thunder and Lightning' require an action to use. See the Notes page for what all of these abilities entail.",
		descriptionFull : "This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. It also has the following additional properties. When one of these properties is used, it can't be used again until the next dawn.\n   " + toUni("Lightning") + ". When you hit with a melee attack using the staff, you can cause the target to take an extra 2d6 lightning damage.\n   " + toUni("Thunder") + ". When you hit with a melee attack using the staff, you can cause the staff to emit a crack of thunder, audible out to 300 feet. The target you hit must succeed on a DC 17 Constitution saving throw or become stunned until the end of your next turn.\n   " + toUni("Lightning Strike") + ". You can use an action to cause a bolt of lightning to leap from the staff's tip in a line that is 5 feet wide and 120 feet long. Each creature in that line must make a DC 17 Dexterity saving throw, taking 9d6 lightning damage on a failed save, or half as much damage on a successful one.\n   " + toUni("Thunderclap") + ". You can use an action to cause the staff to issue a deafening thunderclap, audible out to 600 feet. Each creature within 60 feet of you (not including you) must make a DC 17 Constitution saving throw. On a failed save, a creature takes 2d6 thunder damage and becomes deafened for 1 minute. On a successful save, a creature takes half damage and isn't deafened.\n   " + toUni("Thunder and Lightning") + ". You can use an action to use the Lightning Strike and Thunderclap properties at the same time. Doing so doesn't expend the daily use of those properties, only the use of this one.",
		attunement : true,
		weight : 4,
		action : [["action", "Staff of T\u0026L (Lightning Strike, Thunderclap, both)"]],
		weaponsAdd : ["Staff of Thunder and Lightning"],
		weaponOptions : {
			baseWeapon : "quarterstaff",
			regExpSearch : /^(?=.*staff)(?=.*thunder)(?=.*lightning).*$/i,
			name : "Staff of Thunder and Lightning",
			source : [["SRD", 245], ["D", 204]],
			description : "Versatile (1d8); Lightning: 1\xD7 per dawn, +2d6 lightning damage; Thunder: 1\xD7 per dawn DC 17 Con save or 1 round stunned",
			modifiers : [2, 2]
		},
		extraLimitedFeatures : [{
			name : "Staff of T\u0026L [Lightning]",
			usages : 1,
			recovery : "dawn"
		}, {
			name : "Staff of T\u0026L [Thunder]",
			usages : 1,
			recovery : "dawn"
		}, {
			name : "Staff of T\u0026L [Lightning Strike]",
			usages : 1,
			recovery : "dawn"
		}, {
			name : "Staff of T\u0026L [Thunderclap]",
			usages : 1,
			recovery : "dawn"
		}, {
			name : "Staff of T\u0026L [Thunder and Lightning]",
			usages : 1,
			recovery : "dawn"
		}],
		toNotesPage : [{
			name : "Special Properties",
			note : [
				"\n   This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. It also has the following additional properties. When one of these properties is used, it can't be used again until the next dawn.",
				" \u2022 Lightning. When I hit with a melee attack using the staff, I can cause the target to take an extra 2d6 lightning damage.",
				" \u2022 Thunder. When I hit with a melee attack using the staff, I can cause the staff to emit a crack of thunder, audible out to 300 ft. The target must succeed on a DC 17 Constitution saving throw or become stunned until the end of my next turn.",
				" \u2022 Lightning Strike. As an action, I can cause a bolt of lightning to leap from the staff's tip in a line that is 5 ft wide and 120 ft long. Each creature in that line must make a DC 17 Dexterity saving throw, taking 9d6 lightning damage on a failed save, or half as much damage on a successful one.",
				" \u2022 Thunderclap. As an action, I can cause the staff to issue a deafening thunderclap, audible out to 600 ft. Each creature within 60 ft of me, excluding myself, must make a DC 17 Constitution saving throw or take 2d6 thunder damage and becomes deafened for 1 minute. On a successful save, a creature takes half damage and isn't deafened.",
				" \u2022 Thunder and Lightning. As an action, I can use the Lightning Strike and Thunderclap properties at the same time. Doing so doesn't expend the daily use of those properties, only the use of this one.",
			].join("\n")
		}]
	},
	"staff of withering" : {
		name : "Staff of Withering",
		source : [["SRD", 246], ["D", 205]],
		type : "staff",
		rarity : "rare",
		magicItemTable : "G",
		description : "This staff has 3 charges, regaining 1d3 at dawn and functions as a magic quarterstaff. On a hit with it, I can expend 1 charge to deal an extra 2d10 necrotic damage to the target, which must then make a DC 15 Con save or have disadvantage on any ability check or save that uses Strength or Constitution for 1 hour.",
		descriptionFull : "This staff has 3 charges and regains 1d3 expended charges daily at dawn.\n   The staff can be wielded as a magic quarterstaff. On a hit, it deals damage as a normal quarterstaff, and you can expend 1 charge to deal an extra 2d10 necrotic damage to the target. In addition, the target must succeed on a DC 15 Constitution saving throw or have disadvantage for 1 hour on any ability check or saving throw that uses Strength or Constitution.",
		attunement : true,
		weight : 4,
		prerequisite : "Requires attunement by a cleric, druid, or warlock",
		prereqeval : function(v) { return classes.known.cleric || classes.known.druid || classes.known.warlock ? true : false; },
		usages : 3,
		recovery : "dawn",
		additional : "regains 1d3",
		weaponsAdd : ["Staff of Withering"],
		weaponOptions : {
			baseWeapon : "quarterstaff",
			regExpSearch : /^(?=.*staff)(?=.*withering).*$/i,
			name : "Staff of Withering",
			source : [["SRD", 244], ["D", 203]],
			description : "Versatile (1d8); On hit, 1 charge for +2d10 necrotic damage and save, see magic item"
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
				components : "V,M\u0192",
				compMaterial : "The Stone of Controlling Earth Elementals needs to touch the ground to cast this spell with a command word.",
				description : "CR 5 earth elemental that obeys my verbal commands; on broken conc. elemental breaks free",
				changes : "Using the Stone of Controlling Earth Elementals, the spell only takes 1 action instead of 1 minute to cast, but can only bring forth an earth elemental."
			}
		}
	},
	"stone of good luck" : {
		name : "Stone of Good Luck",
		source : [["SRD", 246], ["D", 205]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While this polished agate is on my person, I gain a +1 bonus to ability checks and saving throws.",
		descriptionFull : "While this polished agate is on your person, you gain a +1 bonus to ability checks and saving throws.",
		attunement : true,
		addMod : [
			{ type : "save", field : "all", mod : 1, text : "I gain a +1 bonus on all my saving throws." },
			{ type : "skill", field : "all", mod : 1, text : "I gain a +1 bonus on all my ability checks." },
			{ type : "skill", field : "Init", mod : 1, text : "I gain a +1 bonus on all my ability checks." }
		]
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
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/^(?=.*life)(?=.*stealing).*$/i).test(v.WeaponTextName)) {
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
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/of sharpness/i).test(v.WeaponTextName) && v.theWea.damage[2] == "slashing") {
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
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/of wounding/i).test(v.WeaponTextName)) {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + 'Damage can only be healed by resting; Once per turn, wound target';
					}
				},
				'If I include the words "of Wounding" in a the name of a sword, it will be treated as the magic weapon Sword of Wounding. Damage by the sword can only be regained with a short or long rest. Once per turn when I hit with the sword, I can inflict a lingering wound on a target, causing it pain every turn thereafter.'
			]
		}
	},
	"talisman of pure good" : {
		name : "Talisman of Pure Good",
		source : [["SRD", 247], ["D", 207]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "I can use this talisman as a holy symbol and if I'm a good cleric or paladin, it gives a +2 bonus on my spell attacks. As an action, I can use 1 of its 7 charges to have an evil creature within 120 ft make a DC 20 Dex save or be destroyed. Non-good creatures touching it take radiant damage, 8d6 if evil or 6d6 if neutral.",
		descriptionLong : "If I'm a good cleric or paladin, I can use this talisman as a holy symbol and it grants me a +2 bonus on my spell attack rolls. As an action, I can use 1 of its 7 charges to target one creature on the ground that I can see within 120 ft of me. If it is evil, a flaming fissure opens under it and it must succeed on a DC 20 Dexterity save or fall into the fissure and be destroyed, leaving no remains of it or the fissure. The talisman is destroyed when the last of its charges is used. Non-good creatures touching it take radiant damage, 8d6 if evil or 6d6 if neutral. This damage repeats at the end of each turn carrying the talisman.",
		descriptionFull : "This talisman is a mighty symbol of goodness. A creature that is neither good nor evil in alignment takes 6d6 radiant damage upon touching the talisman. An evil creature takes 8d6 radiant damage upon touching the talisman. Either sort of creature takes the damage again each time it ends its turn holding or carrying the talisman.\n   If you are a good cleric or paladin, you can use the talisman as a holy symbol, and you gain a +2 bonus to spell attack rolls while you wear or hold it.\n   The talisman has 7 charges. If you are wearing or holding it, you can use an action to expend 1 charge from it and choose one creature you can see on the ground within 120 feet of you. If the target is of evil alignment, a flaming fissure opens under it. The target must succeed on a DC 20 Dexterity saving throw or fall into the fissure and be destroyed, leaving no remains. The fissure then closes, leaving no trace of its existence. When you expend the last charge, the talisman disperses into motes of golden light and is destroyed.",
		attunement : true,
		weight : 1,
		prerequisite : "Requires attunement by a creature of good alignment",
		prereqeval : function(v) { return (/good/i).test(What("Alignment")); },
		usages : 7,
		recovery : "never",
		action : [["action", ""]],
		calcChanges : {
			spellCalc : [
				function (type, spellcasters, ability) {
					if (type == "attack" && (classes.known.paladin || classes.known.cleric) && (/good/i).test(What("Alignment"))) return 2;
				},
				"If I'm a good cleric or paladin, I gain a +2 bonus on my spell attack rolls while wearing or holding the Talisman of Pure Good."
			]
		}
	},
	"talisman of the sphere" : {
		name : "Talisman of the Sphere",
		source : [["SRD", 247], ["D", 207]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "While I'm holding this talisman, I double my proficiency bonus on the Intelligence (Arcana) check to control a sphere of annihilation. In addition, when I start my turn with control over a sphere of annihilation, I can use an action to levitate it 10 ft plus 10 ft times my Intelligence modifier.",
		descriptionFull : "When you make an Intelligence (Arcana) check to control a sphere of annihilation while you are holding this talisman, you double your proficiency bonus on the check. In addition, when you start your turn with control over a sphere of annihilation, you can use an action to levitate it 10 feet plus a number of additional feet equal to 10 \xD7 your Intelligence modifier.",
		attunement : true,
		weight : 1
	},
	"talisman of ultimate evil" : {
		name : "Talisman of Ultimate Evil",
		source : [["SRD", 247], ["D", 207]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "I can use this talisman as a holy symbol and if I'm an evil cleric or paladin, it gives a +2 bonus on my spell attacks. As an action, I can use 1 of its 6 charges to have a good creature within 120 ft make a DC 20 Dex save or be destroyed. Non-evil creatures touching it take necrotic damage, 8d6 if good or 6d6 if neutral.",
		descriptionLong : "If I'm an evil cleric or paladin, I can use this talisman as a holy symbol and it grants me a +2 bonus on my spell attack rolls. As an action, I can use 1 of its 6 charges to target one creature on the ground that I can see within 120 ft of me. If it is good, a flaming fissure opens under it and it must succeed on a DC 20 Dexterity save or fall into the fissure and be destroyed, leaving no remains of it or the fissure. The talisman is destroyed when the last of its charges is used. Non-evil creatures touching it take necrotic damage, 8d6 if good or 6d6 if neutral. This damage repeats at the end of each turn carrying the talisman.",
		descriptionFull : "This item symbolizes unrepentant evil. A creature that is neither good nor evil in alignment takes 6d6 necrotic damage upon touching the talisman. A good creature takes 8d6 necrotic damage upon touching the talisman. Either sort of creature takes the damage again each time it ends its turn holding or carrying the talisman.\n   If you are an evil cleric or paladin, you can use the talisman as a holy symbol, and you gain a +2 bonus to spell attack rolls while you wear or hold it.\n   The talisman has 6 charges. If you are wearing or holding it, you can use an action to expend 1 charge from the talisman and choose one creature you can see on the ground within 120 feet of you. If the target is of good alignment, a flaming fissure opens under it. The target must succeed on a DC 20 Dexterity saving throw or fall into the fissure and be destroyed, leaving no remains. The fissure then closes, leaving no trace of its existence. When you expend the last charge, the talisman dissolves into foul-smelling slime and is destroyed.",
		attunement : true,
		weight : 1,
		prerequisite : "Requires attunement by a creature of evil alignment",
		prereqeval : function(v) { return (/evil/i).test(What("Alignment")); },
		usages : 6,
		recovery : "never",
		action : [["action", ""]],
		calcChanges : {
			spellCalc : [
				function (type, spellcasters, ability) {
					if (type == "attack" && (classes.known.paladin || classes.known.cleric) && (/evil/i).test(What("Alignment"))) return 2;
				},
				"If I'm an evil cleric or paladin, I gain a +2 bonus on my spell attack rolls while wearing or holding the Talisman of Ultimate Evil."
			]
		}
	},
	"tome of clear thought" : {
		name : "Tome of Clear Thought",
		source : [["SRD", 247], ["D", 208]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This book contains memory and logic exercises, and its words are charged with magic. If I spend 48 hours within a period of 6 days to study its contents and practicing its guidelines, my Intelligence score increases by 2, as does my maximum for that score. The tome then loses its magic, but regains it in a century.",
		descriptionFull : "This book contains memory and logic exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Intelligence score increases by 2, as does your maximum for that score. The manual then loses its magic, but regains it in a century.",
		weight : 5,
		eval : function() {
			MagicItemsList["manual of bodily health"].applyStatBonus("Tome of Clear Thought", "Intelligence", 2);
		}
	},
	"tome of leadership and influence" : {
		name : "Tome of Leadership and Influence",
		source : [["SRD", 247], ["D", 208]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This book contains guidelines for influencing and charming others and its words are charged with magic. If I spend 48 hours within 6 days studying its contents and practicing its guidelines, my Charisma score increases by 2, as does my maximum for that score. The tome then loses its magic, but regains it in a century.",
		descriptionFull : "This book contains guidelines for influencing and charming others, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Charisma score increases by 2, as does your maximum for that score. The manual then loses its magic, but regains it in a century.",
		weight : 5,
		eval : function() {
			MagicItemsList["manual of bodily health"].applyStatBonus("Tome of Leadership and Influence", "Charisma", 2);
		}
	},
	"tome of understanding" : {
		name : "Tome of Understanding",
		source : [["SRD", 247], ["D", 209]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This book contains intuition and insight exercises, and its words are charged with magic. If I spend 48 hours within a period of 6 days studying its contents and practicing its guidelines, my Wisdom score increases by 2, as does my maximum for that score. The tome then loses its magic, but regains it in a century.",
		descriptionFull : "This book contains intuition and insight exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Wisdom score increases by 2, as does your maximum for that score. The manual then loses its magic, but regains it in a century.",
		weight : 5,
		eval : function() {
			MagicItemsList["manual of bodily health"].applyStatBonus("Tome of Understanding", "Wisdom", 2);
		}
	},
	"trident of fish command" : {
		name : "Trident of Fish Command",
		source : [["SRD", 247], ["D", 209]],
		type : "weapon (trident)",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "This magic trident has 3 charges. While I carry it, I can use an action and expend 1 charge to cast Dominate Beast (save DC 15) from it on a beast that has an innate swimming speed. The trident regains 1d3 expended charges daily at dawn.",
		descriptionFull : "This trident is a magic weapon. It has 3 charges. While you carry it, you can use an action and expend 1 charge to cast Dominate Beast (save DC 15) from it on a beast that has an innate swimming speed. The trident regains 1d3 expended charges daily at dawn.",
		attunement : true,
		weight : 4,
		usages : 3,
		recovery : "dawn",
		additional : "regains 1d3",
		weaponsAdd : ["Trident of Fish Command"],
		weaponOptions : {
			baseWeapon : "trident",
			regExpSearch : /^(?=.*trident)(?=.*fish)(?=.*command).*$/i,
			name : "Trident of Fish Command",
			source : [["SRD", 247], ["D", 209]]
		},
		fixedDC : 15,
		spellFirstColTitle : "Ch",
		spellcastingBonus : {
			name : "1 charge",
			spells : ["dominate beast"],
			selection : ["dominate beast"],
			firstCol : 1
		},
		spellChanges : {
			"dominate beast" : {
				description : "1 beast with swim speed save or charmed, follows telepathic commands, 1 a for complete control",
				changes : "Can only affect beasts with innate swim speed."
			}
		}
	},
	"universal solvent" : {
		name : "Universal Solvent",
		source : [["SRD", 248], ["D", 209]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "E",
		description : "This tube holds milky liquid with a strong alcohol smell. Once as an action, I can pour the contents of the tube onto a surface within reach. The liquid instantly dissolves up to 1 square foot of adhesive it touches, including sovereign glue.",
		descriptionFull : "This tube holds milky liquid with a strong alcohol smell. You can use an action to pour the contents of the tube onto a surface within reach. The liquid instantly dissolves up to 1 square foot of adhesive it touches, including sovereign glue."
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
					if (!v.isSpell && !v.theWea.isMagicWeapon && (/vicious/i).test(v.WeaponTextName)) {
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
					if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/vorpal/i).test(v.WeaponTextName) && v.theWea.damage[2] == "slashing") {
						v.theWea.isMagicWeapon = true;
						fields.Description = fields.Description.replace(/(, |; )?Counts as magical/i, '');
						fields.Description += (fields.Description ? '; ' : '') + 'Ignores slashing resistance; On 20 to hit: cut off head';
					}
				},
				'If I include the word "Vorpal" in a the name of a sword that deals slashing damage, it will be treated as the magic weapon Vorpal Sword. It has +3 to hit and damage and on a roll of 20 on the attack roll, it cuts off a head of the target.'
			],
			atkCalc : [
				function (fields, v, output) {
					if (v.isMeleeWeapon && (/sword|scimitar|rapier/i).test(v.baseWeaponName) && (/vorpal/i).test(v.WeaponTextName) && v.theWea.damage[2] == "slashing") {
						output.magic = v.thisWeapon[1] + 3;
					}
				}, ''
			]
		}
	},
	"wand of binding" : {
		name : "Wand of Binding",
		source : [["SRD", 248], ["D", 209]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "This wand has 7 charges, regaining 1d6+1 at dawn, which I can use to cast its spells. I can expend 1 charge to gain adv. on a check to escape a grapple or on a save vs. being paralyzed or restrained, the latter requiring me to use my reaction. When the last charge is used there is a 5% chance the wand is destroyed.",
		descriptionLong : "This wand has 7 charges, regaining 1d6+1 at dawn. I can expend charges to cast (save DC 17) Hold Monster (5 charges) or Hold Person (2 charges). As a reaction, I can expend 1 charge to gain adv. on a save to avoid being paralyzed or restrained. I can also expend 1 charge to gain adv. on a check to escape a grapple. If I expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		descriptionFull : "This wand has 7 charges for the following properties. It regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.\n   " + toUni("Spells") + ". While holding the wand, you can use an action to expend some of its charges to cast one of the following spells (save DC 17): Hold Monster (5 charges) or Hold Person (2 charges).\n   " + toUni("Assisted Escape") + ". While holding the wand, you can use your reaction to expend 1 charge and gain advantage on a saving throw you make to avoid being paralyzed or restrained, or you can expend 1 charge and gain advantage on any check you make to escape a grapple.",
		attunement : true,
		weight : 1,
		prerequisite : "Requires attunement by a spellcaster",
		prereqeval : function(v) { return v.isSpellcaster; },
		action : [["reaction", " (adv. on save)"]],
		usages : 7,
		recovery : "dawn",
		additional : "regains 1d6+1",
		spellFirstColTitle : "Ch",
		fixedDC : 17,
		spellcastingBonus : [{
			name : "2 charges",
			spells : ["hold person"],
			selection : ["hold person"],
			firstCol : 2
		}, {
			name : "5 charges",
			spells : ["hold monster"],
			selection : ["hold monster"],
			firstCol : 5
		}]
	},
	"wand of enemy detection" : {
		name : "Wand of Enemy Detection",
		source : [["SRD", 248], ["D", 210]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "This wand has 7 charges, regaining 1d6+1 at dawn. As an action, I can expend 1 charge to speak its command word. For 1 minute, I know the direction of the nearest creature hostile to me in 60 ft, regardless of it being ethereal, invisible, disguised, or hidden. When the last charge is used there is a 5% chance it's destroyed.",
		descriptionFull : "This wand has 7 charges. While holding it, you can use an action and expend 1 charge to speak its command word. For the next minute, you know the direction of the nearest creature hostile to you within 60 feet, but not its distance from you. The wand can sense the presence of hostile creatures that are ethereal, invisible, disguised, or hidden, as well as those in plain sight. The effect ends if you stop holding the wand.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		attunement : true,
		weight : 1,
		usages : 7,
		recovery : "dawn",
		additional : "regains 1d6+1",
		action : [["action", ""]]
	},
	"wand of fear" : {
		name : "Wand of Fear",
		source : [["SRD", 248], ["D", 210]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "This wand has 7 charges, regaining 1d6+1 at dawn, which I can use to cast Command (1 charge), or as an action have all in a 60-ft cone (2 charges) make a DC 15 Wis save or be frightened and move away from me for 1 min (save end of each turn). When using the last charge, 5% chance the wand is destroyed.",
		descriptionLong : "This wand has 7 charges, regaining 1d6+1 charges at dawn. As an action, I can expend 1 charge to cast Command, but only to use \"flee\" or \"grovel\". I can also use an action to expend 2 charges, causing the wand's tip to emit a 60-ft cone of amber light. All within the cone must make a DC 15 Wis save or be frightened of me for 1 minute. While frightened, a target moves away from me as fast as possible, can only use the Dash action, and is unwilling to move within 30 ft of me, but can repeat the save at the end of each of its turn. When the last charge is used, roll a d20. On a 1, the wand crumbles into ashes.",
		descriptionFull : "This wand has 7 charges for the following properties. It regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.\n   " + toUni("Command") + ". While holding the wand, you can use an action to expend 1 charge and command another creature to flee or grovel, as with the Command spell (save DC 15).\n   " + toUni("Cone of Fear") + ". While holding the wand, you can use an action to expend 2 charges, causing the wand's tip to emit a 60-foot cone of amber light. Each creature in the cone must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. While it is frightened in this way, a creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevent it from moving. If it has nowhere it can move, the creature can use the Dodge action. At the end of each of its turns, a creature can repeat the saving throw, ending the effect on itself on a success.",
		attunement : true,
		weight : 1,
		usages : 7,
		recovery : "dawn",
		additional : "regains 1d6+1",
		spellFirstColTitle : "Ch",
		fixedDC : 15,
		spellcastingBonus : {
			name : "1 charge",
			spells : ["command"],
			selection : ["command"],
			firstCol : 1
		},
		spellChanges : {
			"command" : {
				description : '1 creature save or has to follow an one-word command on its next turn, either "flee" or "grovel"',
				changes : 'When casting form the Wand of Fear, I can only use the "flee" or "grovel" command.'
			}
		}
	},
	"wand of fireballs" : {
		name : "Wand of Fireballs",
		source : [["SRD", 248], ["D", 210]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "This wand has 7 charges, regaining 1d6+1 at dawn. As an action, I can expend 1 or more of its charges to cast Fireball (save DC 15) from it as a 3rd level spell. The spell slot level increases by one for each charge expended after the first. When the last charge is used, roll a d20. On a 1, the wand crumbles into ashes.",
		descriptionFull : "This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the Fireball spell (save DC 15) from it. For 1 charge, you cast the 3rd-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		attunement : true,
		weight : 1,
		prerequisite : "Requires attunement by a spellcaster",
		prereqeval : function(v) { return v.isSpellcaster; },
		usages : 7,
		recovery : "dawn",
		additional : "regains 1d6+1",
		spellFirstColTitle : "Ch",
		fixedDC : 15,
		spellcastingBonus : {
			name : "1+ charges",
			spells : ["fireball"],
			selection : ["fireball"],
			firstCol : "1+"
		},
		spellChanges : {
			"fireball" : {
				description : "20-ft rad all crea 8d6+1d6/extra charge Fire dmg; save halves; unattended flammable objects ignite",
				changes : "For 1 charge, it is cast as the 3rd-level version of the spell, but I can increase the spell slot level by one for each additional charge expended."
			}
		}
	},
	"wand of lightning bolts" : {
		name : "Wand of Lightning Bolts",
		source : [["SRD", 249], ["D", 211]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "This wand has 7 charges, regaining 1d6+1 at dawn. As an action, I can expend 1 or more of its charges to cast Lightning Bolt (save DC 15) from it as a 3rd level spell. The spell slot level increases by one for each charge expended after the first. When the last charge is used, roll a d20. On a 1, the wand crumbles into ashes.",
		descriptionFull : "This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the Lightning Bolt spell (save DC 15) from it. For 1 charge, you cast the 3rd-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		attunement : true,
		weight : 1,
		prerequisite : "Requires attunement by a spellcaster",
		prereqeval : function(v) { return v.isSpellcaster; },
		usages : 7,
		recovery : "dawn",
		additional : "regains 1d6+1",
		spellFirstColTitle : "Ch",
		fixedDC : 15,
		spellcastingBonus : {
			name : "1+ charges",
			spells : ["lightning bolt"],
			selection : ["lightning bolt"],
			firstCol : "1+"
		},
		spellChanges : {
			"lightning bolt" : {
				description : "100-ft long 5-ft wide all 8d6+1d6/extra charge Lightn. dmg; save halves; unattended objects ignite",
				changes : "For 1 charge, it is cast as the 3rd-level version of the spell, but I can increase the spell slot level by one for each additional charge expended."
			}
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
		additional : "regains 1d3",
		spellFirstColTitle : "Ch"
	},
	"wand of magic missiles" : {
		name : "Wand of Magic Missiles",
		source : [["SRD", 249], ["D", 211]],
		type : "wand",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "This wand has 7 charges, regaining 1d6+1 at dawn. As an action, I can expend 1 or more of its charges to cast Magic Missile from it as a 1st level spell. The spell slot level increases by one for each charge expended after the first. When the last charge is used, roll a d20. On a 1, the wand crumbles into ashes.",
		descriptionFull : "This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the Magic Missile spell from it. For 1 charge, you cast the 1st-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		weight : 1,
		usages : 7,
		recovery : "dawn",
		additional : "regains 1d6+1",
		spellFirstColTitle : "Ch",
		spellcastingBonus : {
			name : "1+ charges",
			spells : ["magic missile"],
			selection : ["magic missile"],
			firstCol : "1+"
		},
		spellChanges : {
			"magic missile" : {
				description : "3+1/extra charge darts hit creature(s) I can see for 1d4+1 Force dmg per dart",
				changes : "For 1 charge, it is cast as the 1st-level version of the spell, but I can increase the spell slot level by one for each additional charge expended."
			}
		}
	},
	"wand of paralysis" : {
		name : "Wand of Paralysis",
		source : [["SRD", 249], ["D", 211]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "This wand has 7 charges, regaining 1d6+1 at dawn. As an action, I can expend 1 charge to have a creature within 60 ft make a DC 15 Constitution saving throw or be paralyzed for 1 minute. It can repeat this save at the end of each of its turns. When the last charge is used, roll a d20. On a 1, the wand crumbles into ashes.",
		descriptionFull : "This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cause a thin blue ray to streak from the tip toward a creature you can see within 60 feet of you. The target must succeed on a DC 15 Constitution saving throw or be paralyzed for 1 minute. At the end of each of the target's turns, it can repeat the saving throw, ending the effect on itself on a success.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		attunement : true,
		weight : 1,
		prerequisite : "Requires attunement by a spellcaster",
		prereqeval : function(v) { return v.isSpellcaster; },
		action : [["action", ""]]
	},
	"wand of polymorph" : {
		name : "Wand of Polymorph",
		source : [["SRD", 249], ["D", 211]],
		type : "wand",
		rarity : "very rare",
		magicItemTable : "H",
		description : "This wand has 7 charges and regains 1d6+1 expended charges daily at dawn. As an action, I can expend 1 of its charges to cast Polymorph (save DC 15) from it. If I expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		descriptionFull : "This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the Polymorph spell (save DC 15) from it.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		attunement : true,
		weight : 1,
		prerequisite : "Requires attunement by a spellcaster",
		prereqeval : function(v) { return v.isSpellcaster; },
		usages : 7,
		recovery : "dawn",
		additional : "regains 1d6+1",
		spellFirstColTitle : "Ch",
		fixedDC : 15,
		spellcastingBonus : {
			name : "1 charge",
			spells : ["polymorph"],
			selection : ["polymorph"],
			firstCol : 1
		}
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
		additional : "regains 1d3",
		action : [["action", ""]]
	},
	"wand of the war mage, +1, +2, or +3" : {
		name : "Wand of the War Mage, +1, +2, or +3",
		nameTest : /^(?=.*war mage)(?=.*(arcane focus|rod|wand|staff)).*$/i,
		source : [["SRD", 249], ["D", 212]],
		type : "wand",
		description : "While I am holding this wand, I gain a bonus to spell attack rolls determined by the wand's rarity: uncommon (+1), rare (+2), or very rare (+3). In addition, I ignore half cover when making a spell attack.",
		descriptionFull : "While you are holding this wand, you gain a bonus to spell attack rolls determined by the wand's rarity: uncommon (+1), rare (+2), or very rare (+3). In addition, you ignore half cover when making a spell attack.",
		attunement : true,
		weight : 1,
		prerequisite : "Requires attunement by a spellcaster",
		prereqeval : function(v) { return v.isSpellcaster; },
		choices : ["+1 to spell attacks (uncommon)", "+2 to spell attacks (rare)", "+3 to spell attacks (very rare)"],
		"+1 to spell attacks (uncommon)" : {
			name : "Wand of the War Mage +1",
			nameTest : /^(?=.*war mage)(?=.*(arcane focus|rod|wand|staff))(?=.*\+1)(?!.*\+2)(?!.*\+3).*$/i,
			rarity : "uncommon",
			magicItemTable : "F",
			description : "While I am holding this arcane focus, I gain a +1 bonus to spell attack rolls and I ignore half cover when making a spell attack.",
			calcChanges : {
				spellCalc : [
					function (type, spellcasters, ability) {
						if (type == "attack") return 1;
					},
					"I gain a +1 bonus to spell attack rolls."
				]
			}
		},
		"+2 to spell attacks (rare)" : {
			name : "Wand of the War Mage +2",
			nameTest : /^(?=.*war mage)(?=.*(arcane focus|rod|wand|staff))(?!.*\+1)(?=.*\+2)(?!.*\+3).*$/i,
			rarity : "rare",
			magicItemTable : "G",
			description : "While I am holding this arcane focus, I gain a +2 bonus to spell attack rolls and I ignore half cover when making a spell attack.",
			calcChanges : {
				spellCalc : [
					function (type, spellcasters, ability) {
						if (type == "attack") return 2;
					},
					"I gain a +2 bonus to spell attack rolls."
				]
			}
		},
		"+3 to spell attacks (very rare)" : {
			name : "Wand of the War Mage +3",
			nameTest : /^(?=.*war mage)(?=.*(arcane focus|rod|wand|staff))(?!.*\+1)(?!.*\+2)(?=.*\+3).*$/i,
			rarity : "very rare",
			magicItemTable : "H",
			description : "While I am holding this arcane focus, I gain a +3 bonus to spell attack rolls and I ignore half cover when making a spell attack.",
			calcChanges : {
				spellCalc : [
					function (type, spellcasters, ability) {
						if (type == "attack") return 3;
					},
					"I gain a +3 bonus to spell attack rolls."
				]
			}
		}
	},
	"wand of web" : {
		name : "Wand of Web",
		source : [["SRD", 249], ["D", 212]],
		type : "wand",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "This wand has 7 charges and regains 1d6+1 expended charges daily at dawn. As an action, I can expend 1 of its charges to cast Web (save DC 15) from it. If I expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		descriptionFull : "This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the Web spell (save DC 15) from it.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		attunement : true,
		weight : 1,
		prerequisite : "Requires attunement by a spellcaster",
		prereqeval : function(v) { return v.isSpellcaster; },
		usages : 7,
		recovery : "dawn",
		additional : "regains 1d6+1",
		spellFirstColTitle : "Ch",
		fixedDC : 15,
		spellcastingBonus : {
			name : "1 charge",
			spells : ["web"],
			selection : ["web"],
			firstCol : 1
		}
	},
	"wand of wonder" : {
		name : "Wand of Wonder",
		source : [["SRD", 249], ["D", 212]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "This wand has 7 charges and regains 1d6+1 expended charges daily at dawn. If I expend its last charge, roll a d20. On a 1, the wand crumbles into dust and is destroyed. As an action while holding it, I can expend 1 charge, choose a target within 120 ft, and roll a 1d100 to see what happens, see the Notes page.",
		descriptionFull : "This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges and choose a target within 120 feet of you. The target can be a creature, an object, or a point in space. Roll d100 and consult the following table to discover what happens." + desc([
			"If the effect causes you to cast a spell from the wand, the spell's save DC is 15. If the spell normally has a range expressed in feet, its range becomes 120 feet if it isn't already.",
			"If an effect covers an area, you must center the spell on and include the target. If an effect has multiple possible subjects, the DM randomly determines which ones are affected.",
			"The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into dust and is destroyed.\n",
			toUni("d100 and effects"),
			toUni("01-05") + ". You cast Slow.",
			toUni("06-10") + ". You cast Faerie Fire.",
			toUni("11-15") + ". You are stunned until the start of your next turn, believing something awesome just happened.",
			toUni("16-20") + ". You cast Gust of Wind.",
			toUni("21-25") + ". You cast Detect Thoughts on the target you chose. If you didn't target a creature, you instead take 1d6 psychic damage.",
			toUni("26-30") + ". You cast Stinking Cloud.",
			toUni("31-33") + ". Heavy rain falls in a 60-foot radius centered on the target. The area becomes lightly obscured. The rain falls until the start of your next turn.",
			toUni("34-36") + ". An animal appears in the unoccupied space nearest the target. The animal isn't under your control and acts as it normally would. Roll a d100 to determine which animal appears. On a 01-25, a rhinoceros appears; on a 26-50, an elephant appears; and on a 51-100, a rat appears.",
			toUni("37-46") + ". You cast Lightning Bolt.",
			toUni("47-49") + ". A cloud of 600 oversized butterflies fills a 30-foot radius centered on the target. The area becomes heavily obscured. The butterflies remain for 10 minutes.",
			toUni("50-53") + ". You enlarge the target as if you had cast Enlarge/Reduce. If the target can't be affected by that spell or if you didn't target a creature, you become the target.",
			toUni("54-58") + ". You cast Darkness.",
			toUni("59-62") + ". Grass grows on the ground in a 60-foot radius centered on the target. If grass is already there, it grows to ten times its normal size and remains overgrown for 1 minute.",
			toUni("63-65") + ". An object of the DM's choice disappears into the Ethereal Plane. The object must be neither worn nor carried, within 120 feet of the target, and no larger than 10 feet in any dimension.",
			toUni("66-69") + ". You shrink yourself as if you had cast Enlarge/Reduce on yourself.",
			toUni("70-79") + ". You cast Fireball.",
			toUni("80-84") + ". You cast Invisibility.",
			toUni("85-87") + ". Leaves grow from the target. If you chose a point in space as the target, leaves sprout from the creature nearest to that point. Unless they are picked off, the leaves turn brown and fall off after 24 hours.",
			toUni("88-90") + ". A stream of 1d4 \xD7 10 gems, each worth 1 gp, shoots from the wand's tip in a line 30 feet long and 5 feet wide. Each gem deals 1 bludgeoning damage, and the total damage of the gems is divided equally among all creatures in the line.",
			toUni("91-95") + ". A burst of colorful shimmering light extends from you in a 30-foot radius. You and each creature in the area that can see must succeed on a DC 15 Constitution saving throw or become blinded for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
			toUni("96-97") + ". The target's skin turns bright blue for 1d10 days. If you chose a point in space, the creature nearest to that point is affected.",
			toUni("98-00") + ". If you targeted a creature, it must make a DC 15 Constitution saving throw. If you didn't target a creature, you become the target and must make the saving throw. If the saving throw fails by 5 or more, the target is instantly petrified. On any other failed save, the target is restrained and begins to turn to stone. While restrained in this way, the target must repeat the saving throw at the end of its next turn, becoming petrified on a failure or ending the effect on a success. The petrification lasts until the target is freed by the Greater Restoration spell or similar magic."
		]),
		attunement : true,
		weight : 1,
		prerequisite : "Requires attunement by a spellcaster",
		prereqeval : function(v) { return v.isSpellcaster; },
		usages : 7,
		recovery : "dawn",
		additional : "regains 1d6+1",
		toNotesPage : [{
			name : "Table of Effects",
			note : [
				"As an action I can expend 1 of the wand's 7 charges and choose a target within 120 ft of me. The target can be a creature, an object, or a point in space. Roll a d100 and consult the effect below to discover what happens.",
				"If the effect causes me to cast a spell from the wand, the spell's save DC is 15. If the spell normally has a range expressed in feet, its range becomes 120 ft if it isn't already.",
				"If an effect covers an area, I must center the spell on and include the target. If an effect has multiple possible subjects, the DM randomly determines which ones are affected.",
				"\nd100 RESULT AND EFFECTS",
				"01-05: I cast Slow.",
				"06-10: I cast Faerie Fire.",
				"11-15: I am stunned until the start of my next turn, believing something awesome just happened.",
				"16-20: I cast Gust of Wind.",
				"21-25: I cast Detect Thoughts on the target I chose. If I didn't target a creature, I instead take 1d6 psychic damage.",
				"26-30: I cast Stinking Cloud.",
				"31-33: Heavy rain falls in a 60-ft radius centered on the target. The area becomes lightly obscured. The rain falls until the start of my next turn.",
				"34-36: An animal appears in the unoccupied space nearest the target. The animal isn't under my control and acts as it normally would. Roll a d100 to determine which animal appears. On a 01-25, a rhinoceros appears; on a 26-50, an elephant appears; and on a 51-100, a rat appears.",
				"37-46: I cast Lightning Bolt.",
				"47-49: A cloud of 600 oversized butterflies fills a 30-ft radius centered on the target. The area becomes heavily obscured. The butterflies remain for 10 minutes.",
				"50-53: I enlarge the target as if I had cast Enlarge/Reduce. If the target can't be affected by that spell or if I didn't target a creature, I become the target.",
				"54-58: I cast Darkness.",
				"59-62: Grass grows on the ground in a 60-ft radius centered on the target. If grass is already there, it grows to ten times its normal size and remains overgrown for 1 minute.",
				"63-65: An object of the DM's choice disappears into the Ethereal Plane. The object must be neither worn nor carried, within 120 ft of the target, and no larger than 10 ft in any dimension.",
				"66-69: I shrink myself as if I had cast Enlarge/Reduce on myself.",
				"70-79: I cast Fireball.",
				"80-84: I cast Invisibility.",
				"85-87: Leaves grow from the target. If I chose a point in space as the target, leaves sprout from the creature nearest to that point. Unless they are picked off, the leaves turn brown and fall off after 24 hours.",
				"88-90: A stream of 1d4 \xD7 10 gems, each worth 1 gp, shoots from the wand's tip in a line 30 ft long and 5 ft wide. Each gem deals 1 bludgeoning damage, and the total damage of the gems is divided equally among all creatures in the line.",
				"91-95: A burst of colorful shimmering light extends from me in a 30-ft radius. Me and each creature in the area that can see must succeed on a DC 15 Constitution saving throw or become blinded for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
				"96-97: The target's skin turns bright blue for 1d10 days. If I chose a point in space, the creature nearest to that point is affected.",
				"98-00: If I targeted a creature, it must make a DC 15 Constitution saving throw. If I didn't target a creature, I become the target and must make the saving throw. If the saving throw fails by 5 or more, the target is instantly petrified. On any other failed save, the target is restrained and begins to turn to stone. While restrained in this way, the target must repeat the saving throw at the end of its next turn, becoming petrified on a failure or ending the effect on a success. The petrification lasts until the target is freed by the Greater Restoration spell or similar magic."
			]
		}],
		fixedDC : 15,
		spellcastingBonus : {
			name : "Random option",
			spells : ["slow", "faerie fire", "gust of wind", "detect thoughts", "stinking cloud", "lightning bolt", "enlarge/reduce", "darkness", "fireball", "invisibility"],
			selection : ["slow", "faerie fire", "gust of wind", "detect thoughts", "stinking cloud", "lightning bolt", "enlarge/reduce", "darkness", "fireball", "invisibility"],
			times : 10
		},
		spellChanges : {
			"darkness" : { range : "120 ft", changes : "All Wand of Wonder spells have a range of 120 ft." },
			"enlarge/reduce" : { range : "120 ft", changes : "All Wand of Wonder spells have a range of 120 ft." },
			"faerie fire" : { range : "120 ft", changes : "All Wand of Wonder spells have a range of 120 ft." },
			"stinking cloud" : { range : "120 ft", changes : "All Wand of Wonder spells have a range of 120 ft." }
		}
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
	"well of many worlds" : {
		name : "Well of Many Worlds",
		source : [["SRD", 250], ["D", 213]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "As an action, I can unfold this black cloth, 6 ft in diameter, and place it on a solid surface, whereupon it creates a two-way portal to another world or plane, a random one each time. I can use an action to grab it from the edges and fold it, closing the portal. Once used in this way, it can't do so again for 1d8 hours.",
		descriptionFull : "This fine black cloth, soft as silk, is folded up to the dimensions of a handkerchief. It unfolds into a circular sheet 6 feet in diameter.\n   You can use an action to unfold and place the well of many worlds on a solid surface, whereupon it creates a two-way portal to another world or plane of existence. Each time the item opens a portal, the DM decides where it leads. You can use an action to close an open portal by taking hold of the edges of the cloth and folding it up. Once well of many worlds has opened a portal, it can't do so again for 1d8 hours.",
		action : [["action", " (place/fold)"]],
		usages : 1,
		recovery : "1d8 h"
	},
	"wind fan" : {
		name : "Wind Fan",
		source : [["SRD", 250], ["D", 213]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While holding this fan, I can use an action to cast Gust of Wind (save DC 13) from it. Once used, the fan shouldn't be used again until the next dawn. Each time it is used again before then, it has a cumulative 20% chance of not working and tearing into useless, nonmagical tatters.",
		descriptionFull : "While holding this fan, you can use an action to cast the Gust of Wind spell (save DC 13) from it. Once used, the fan shouldn't be used again until the next dawn. Each time it is used again before then, it has a cumulative 20% chance of not working and tearing into useless, nonmagical tatters.",
		usages : 1,
		recovery : "dawn",
		additional : "more uses +20% to destroy",
		fixedDC : 13,
		spellcastingBonus : {
			name : "Once per dawn",
			spells : ["gust of wind"],
			selection : ["gust of wind"],
			firstCol : "oncelr"
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
		additional : "regains 2h/12h"
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
		action : [["action", " (start/stop)"]],
		usages : 1,
		recovery : "1d12 h"
	}
/*	Excluding artifacts for now as most would require new functionality
	"orb of dragonkind" : {
		name : "Orb of Dragonkind",
		source : [["SRD", 252], ["D", 225]],
		type : "wondrous item",
		rarity : "artifact",
		description : "",
		descriptionFull : "Ages past, on the world of Krynn, elves and humans waged a terrible war against evil dragons. When the world seemed doomed, the wizards of the Towers of High Sorcery came together and worked their greatest magic, forging five Orbs of Dragonkind (or Dragon Orbs) to help them defeat the dragons. One orb was taken to each of the five towers, and there they were used to speed the war toward a victorious end. The wizards used the orbs to lure dragons to them, then destroyed the dragons with powerful magic.\n   As the Towers of High Sorcery fell in later ages, the orbs were destroyed or faded into legend, and only three are thought to survive. Their magic has been warped and twisted over the centuries, so although their primary purpose of calling dragons still functions, they also allow some measure of control over dragons.\n   Each orb contains the essence of an evil dragon, a presence that resents any attempt to coax magic from it. Those lacking in force of personality might find themselves enslaved to an orb.\n   An orb is an etched crystal globe about 10 inches in diameter. When used, it grows to about 20 inches in diameter, and mist swirls inside it.\n   While attuned to an orb, you can use an action to peer into the orb's depths and speak its command word. You must then make a DC 15 Charisma check. On a successful check, you control the orb for as long as you remain attuned to it. On a failed check, you become charmed by the orb for as long as you remain attuned to it.\n   While you are charmed by the orb, you can't voluntarily end your attunement to it, and the orb casts Suggestion on you at will (save DC 18), urging you to work toward the evil ends it desires. The dragon essence within the orb might want many things: the annihilation of a particular people, freedom from the orb, to spread suffering in the world, to advance the worship of Tiamat, or something else the DM decides.\n   " + toUni("Random Properties") + ". An Orb of Dragon kind has the following random properties:\n \u2022 2 minor beneficial properties\n \u2022 1 minor detrimental property\n \u2022 1 major detrimental property\n\n" + toUni("Spells") + ". The orb has 7 charges and regains 1d4+3 expended charges daily at dawn. If you control the orb, you can use an action and expend 1 or more charges to cast one of the following spells (save DC 18) from it: Cure Wounds (5th-level version, 3 charges), Daylight (1 charge), Death Ward (2 charges), or Scrying (3 charges). You can also use an action to cast the Detect Magic spell from the orb without using any charges.\n   " + toUni("Call Dragons") + ". While you control the orb, you can use an action to cause the artifact to issue a telepathic call that extends in all directions for 40 miles. Evil dragons in range feel compelled to come to the orb as soon as possible by the most direct route. Dragon deities such as Tiamat are unaffected by this call. Dragons drawn to the orb might be hostile toward you for compelling them against their will. Once you have used this property, it can't be used again for 1 hour.\n   " + toUni("Destroying an Orb") + ". An Orb of Dragonkind appears fragile but is impervious to most damage, including the attacks and breath weapons of dragons. A Disintegrate spell or one good hit from a +3 magic weapon is sufficient to destroy an orb, however.",
		weight : 3,
		attunement : true
	}
*/
};
