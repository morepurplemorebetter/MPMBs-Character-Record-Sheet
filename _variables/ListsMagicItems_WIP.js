var Base_MagicItemsList = {
	"adamantine armor" : { // finished
		name : "Adamantine Armor",
		nameTest : "Adamantine",
		source : [["SRD", 207], ["D", 150]],
		type : "armor (medium, or heavy)",
		rarity : "uncommon",
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
	"ammunition, +1, +2, or +3" : { // finished
		name : "Ammunition, +1, +2, or +3",
		source : [["SRD", 207], ["D", 150]],
		type : "weapon (any)",
		rarity : "varies",
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
			rarity : "uncommon",
			magicItemTable : "B",
			description : "I have a +1 bonus to attack and damage rolls made with the magic ammunition. Once it hits a target, the ammunition is no longer magical.",
			allowDuplicates : true
		},
		"+2 ammunition (rare)" : {
			name : "Ammunition +2",
			rarity : "rare",
			magicItemTable : "C",
			description : "I have a +2 bonus to attack and damage rolls made with the magic ammunition. Once it hits a target, the ammunition is no longer magical.",
			allowDuplicates : true
		},
		"+3 ammunition (very rare)" : {
			name : "Ammunition +3",
			rarity : "very rare",
			magicItemTable : "D",
			description : "I have a +3 bonus to attack and damage rolls made with the magic ammunition. Once it hits a target, the ammunition is no longer magical.",
			allowDuplicates : true
		}
	},
	"amulet of health" : { // finished
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
	"amulet of proof against detection and location" : { // finished
		name : "Amulet of Proof against Detection and Location",
		source : [["SRD", 207], ["D", 150]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While wearing this amulet, I am hidden from Divination magic. I can't be targeted by such magic or perceived through magical scrying sensors.",
		descriptionFull : "While wearing this amulet, you are hidden from Divination magic. You can't be targeted by such magic or perceived through magical scrying sensors.",
		attunement : true,
		weight : 1
	},
	"amulet of the planes" : {
		name : "Amulet of the Planes",
		source : [["SRD", 207], ["D", 150]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "While wearing this amulet, you can use an action to name a location that you are familiar with on another plane of existence. Then make a DC 15 Intelligence check. On a successful check, you cast the Plane Shift spell. On a failure, you and each creature and object within 15 feet of you travel to a random destination. Roll a d100. On a 1-60, you travel to a random location on the plane you named. On a 61-100, you travel to a randomly determined plane of existence.",
		attunement : true,
		weight : 1
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
	"apparatus of kwalish" : {
		name : "Apparatus of Kwalish",
		source : [["SRD", 208], ["D", 151]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "This item first appears to be a Large sealed iron barrel weighing 500 pounds. The barrel has a hidden catch, which can be found with a successful DC 20 Intelligence (Investigation) check. Releasing the catch unlocks a hatch at one end of the barrel, allowing two Medium or smaller creatures to crawl inside. Ten levers are set in a row at the far end, each in a neutral position, able to move either up or down. When certain levers are used, the apparatus transforms to resemble a giant lobster.\n   The apparatus of Kwalish is a Large object with the following statistics:\n   Armor Class: 20\n   Hit Points: 200\n   Speed: 30 ft., swim 30 ft. (or 0 ft. for both if the legs and tail aren't extended)\n   Damage Immunities: poison, psychic\n   To be used as a vehicle, the apparatus requires one pilot. While the apparatus's hatch is closed, the compartment is airtight and watertight. The compartment holds enough air for 10 hours of breathing, divided by the number of breathing creatures inside.\n    The apparatus floats on water. It can also go underwater to a depth of 900 feet. Below that, the vehicle takes 2d6 bludgeoning damage per minute from pressure.\n   A creature in the compartment can use an action to move as many as two of the apparatus's levers up or down. After each use, a lever goes back to its neutral position. Each lever, from left to right, functions as shown in the Apparatus of Kwalish Levers table.\n\n" + toUni("Lever\tUp\tDown") + "\n1\tLegs and tail extend, allowing the apparatus to walk and swim.\tLegs and tail retract, reducing the apparatus's speed to 0 and making it unable to benefit from bonuses to speed.\n2\tForward window shutter opens.\tForward window shutter closes.\n3\tSide window shutters open (two per side).\tSide window shutters close (two per side).\n4\tTwo claws extend from the front sides of the apparatus.\tThe claws retract.\n5\tEach extended claw makes the following melee weapon attack: +8 to hit, reach 5 ft., one target. Hit: 7 (2d6) bludgeoning damage.\tEach extended claw makes the following melee weapon attack: +8 to hit, reach 5 ft., one target. Hit: The target is grappled (escape DC 15).\n6\tThe apparatus walks or swims forward.\tThe apparatus walks or swims backward.\n7\tThe apparatus turns 90 degrees left.\tThe apparatus turns 90 degrees right.\n8\tEyelike fixtures emit bright light in a 30-foot radius and dim light for an additional 30 feet.\tThe light turns off.\n9\tThe apparatus sinks as much as 20 feet in liquid.\tThe apparatus rises up to 20 feet in liquid.\n10\tThe rear hatch unseals and opens.\tThe rear hatch closes and seals.",
		weight : 500
	},
	"armor, +1, +2, or +3" : { // finished
		name : "Armor, +1, +2, or +3",
		source : [["SRD", 208], ["D", 152]],
		type : "armor (light, medium, or heavy)",
		rarity : "varies",
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
			rarity : "rare",
			description : "I have a +1 bonus to AC while wearing this armor.",
			allowDuplicates : true
		},
		"+2 ac bonus (very rare)" : {
			name : "Armor +2",
			rarity : "very rare",
			description : "I have a +2 bonus to AC while wearing this armor.",
			allowDuplicates : true
		},
		"+3 ac bonus (legendary)" : {
			name : "Armor +3",
			rarity : "legendary",
			description : "I have a +3 bonus to AC while wearing this armor.",
			allowDuplicates : true
		}
	},
	"armor of invulnerability" : {
		name : "Armor of Invulnerability",
		source : [["SRD", 208], ["D", 152]],
		type : "armor (plate)",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "You have resistance to nonmagical damage while you wear this armor. Additionally, you can use an action to make yourself immune to nonmagical damage for 10 minutes or until you are no longer wearing the armor. Once this special action is used, it can't be used again until the next dawn.",
		attunement : true,
		weight : 65
	},
	"armor of resistance" : { // finished
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
	"armor of vulnerability (bludgeoning)" : {
		name : "Armor of Vulnerability (Bludgeoning)",
		source : [["SRD", 209], ["D", 152]],
		type : "armor (plate)",
		rarity : "rare",
		description : "",
		descriptionFull : "While wearing this armor, you have resistance to bludgeoning damage.\n   " + toUni("Curse") + ". This armor is cursed, a fact that is revealed only when an Identify spell is cast on the armor or you attune to it. Attuning to the armor curses you until you are targeted by the Remove Curse spell or similar magic; removing the armor fails to end the curse. While cursed you have vulnerability to piercing and slashing damage.",
		attunement : true,
		weight : 65,
		cursed : true
	},
	"armor of vulnerability (piercing)" : {
		name : "Armor of Vulnerability (Piercing)",
		source : [["SRD", 209], ["D", 152]],
		type : "armor (plate)",
		rarity : "rare",
		description : "",
		descriptionFull : "While wearing this armor, you have resistance to piercing damage.\n   " + toUni("Curse") + ". This armor is cursed, a fact that is revealed only when an Identify spell is cast on the armor or you attune to it. Attuning to the armor curses you until you are targeted by the Remove Curse spell or similar magic; removing the armor fails to end the curse. While cursed you have vulnerability to bludgeoning and slashing damage.",
		attunement : true,
		weight : 65,
		cursed : true
	},
	"armor of vulnerability (slashing)" : {
		name : "Armor of Vulnerability (Slashing)",
		source : [["SRD", 209], ["D", 152]],
		type : "armor (plate)",
		rarity : "rare",
		description : "",
		descriptionFull : "While wearing this armor, you have resistance to slashing damage.\n   " + toUni("Curse") + ". This armor is cursed, a fact that is revealed only when an Identify spell is cast on the armor or you attune to it. Attuning to the armor curses you until you are targeted by the Remove Curse spell or similar magic; removing the armor fails to end the curse. While cursed you have vulnerability to bludgeoning and piercing damage.",
		attunement : true,
		weight : 65,
		cursed : true
	},
	"arrow-catching shield" : {
		name : "Arrow-Catching Shield",
		source : [["SRD", 209], ["D", 152]],
		type : "shield",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "You gain a +2 bonus to AC against ranged attacks while you wield this shield. This bonus is in addition to the shield's normal bonus to AC. In addition, whenever an attacker makes a ranged attack against a target within 5 feet of you, you can use your reaction to become the target of the attack instead.",
		attunement : true,
		weight : 6
	},
	"arrow of slaying" : { // finished
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
		description : "",
		descriptionFull : "This bag superficially resembles a bag of holding but is a feeding orifice for a gigantic extradimensional creature. Turning the bag inside out closes the orifice.\n   The extradimensional creature attached to the bag can sense whatever is placed inside the bag. Animal or vegetable matter placed wholly in the bag is devoured and lost forever. When part of a living creature is placed in the bag, as happens when someone reaches inside it, there is a 50% chance that the creature is pulled inside the bag. A creature inside the bag can use its action to try to escape with a successful DC 15 Strength check. Another creature can use its action to reach into the bag to pull a creature out, doing so with a successful DC 20 Strength check (provided it isn't pulled inside the bag first). Any creature that starts its turn inside the bag is devoured, its body destroyed.\n   Inanimate objects can be stored in the bag, which can hold a cubic foot of such material. However, once each day, the bag swallows any objects inside it and spits them out into another plane of existence. The DM determines the time and plane.\n   If the bag is pierced or torn, it is destroyed, and anything contained within it is transported to a random location on the Astral Plane.",
		weight : 0.5
	},
	"bag of holding" : { // finished
		name : "Bag of Holding",
		source : [["SRD", 210], ["D", 153]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : ["A", "B"],
		description : "This bag is 2 ft in diameter at the mouth, 4 ft deep, and 15 lb regardless of content. It can hold up to 500 lb, not exceeding a volume of 64 cu ft. Retrieving an item from it requires an action. If it's overloaded, pierced, or torn, it's destroyed with its contents in the Astral plane. If turned inside out, all its contents spill forth.",
		descriptionLong : "This bag is 2 ft in diameter at the mouth, 4 ft deep, and 15 lb regardless of content. It can hold up to 500 lb, not exceeding a volume of 64 cu ft. Retrieving an item from it requires an action. If it is overloaded, pierced, or torn, it is destroyed, leaving its contents in the Astral plane. If it is turned inside out, all its contents spill forth unharmed. Breathing creatures inside the bag can breath for 10 minutes divided by the number of creatures in it (minimum 1 minute), after which they begin to suffocate. Placing the bag in another extradimensional space instantly destroys both and opens a gate to the Astral Plane.",
		descriptionFull : "This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents. Retrieving an item from the bag requires an action.\n   If the bag is overloaded, pierced, or torn, it ruptures and is destroyed, and its contents are scattered in the Astral Plane. If the bag is turned inside out, its contents spill forth, unharmed, but the bag must be put right before it can be used again. Breathing creatures inside the bag can survive up to a number of minutes equal to 10 divided by the number of creatures (minimum 1 minute), after which time they begin to suffocate.\n   Placing a bag of holding inside an extradimensional space created by a Heward's handy haversack, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.",
		weight : 15,
		action : [["action", " (retrieve item)"]]
	},
	"bag of tricks, gray" : {
		name : "Bag of Tricks, Gray",
		source : [["SRD", 210], ["D", 154]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : "This ordinary bag, made from gray cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object.\n   You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table. The creature vanishes at the next dawn or when it is reduced to 0 hit points.\n   The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature.\n   Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\n\n" + toUni("d8") + "\t" + toUni("Creature") + "\n1\tWeasel\n2\tGiant rat\n3\tBadger\n4\tBoar\n5\tPanther\n6\tGiant badger\n7\tDire wolf\n8\tGiant elk",
		weight : 0.5
	},
	"bag of tricks, rust" : {
		name : "Bag of Tricks, Rust",
		source : [["SRD", 210], ["D", 154]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : "This ordinary bag, made from rust cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object.\n   You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table. The creature vanishes at the next dawn or when it is reduced to 0 hit points.\n   The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature.\n   Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\n\n" + toUni("d8") + "\t" + toUni("Creature") + "\n1\tRat\n2\tOwl\n3\tMastiff\n4\tGoat\n5\tGiant goat\n6\tGiant boar\n7\tLion\n8\tBrown bear",
		weight : 0.5
	},
	"bag of tricks, tan" : {
		name : "Bag of Tricks, Tan",
		source : [["SRD", 210], ["D", 154]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : "This ordinary bag, made from tan cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object.\n   You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table. The creature vanishes at the next dawn or when it is reduced to 0 hit points.\n   The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature.\n   Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\n\n" + toUni("d8") + "\t" + toUni("Creature") + "\n1\tJackal\n2\tApe\n3\tBaboon\n4\tAxe beak\n5\tBlack bear\n6\tGiant weasel\n7\tGiant hyena\n8\tTiger",
		weight : 0.5
	},
	"bead of force" : {
		name : "Bead of Force",
		source : [["SRD", 211], ["D", 154]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "C",
		description : "",
		descriptionFull : "This small black sphere measures \xBE of an inch in diameter and weighs an ounce. Typically, 1d4 + 4 beads of force are found together.\n   You can use an action to throw the bead up to 60 feet. The bead explodes on impact and is destroyed. Each creature within a 10-foot radius of where the bead landed must succeed on a DC 15 Dexterity saving throw or take 5d4 force damage. A sphere of transparent force then encloses the area for 1 minute. Any creature that failed the save and is completely within the area is trapped inside this sphere. Creatures that succeeded on the save, or are partially within the area, are pushed away from the center of the sphere until they are no longer inside it. Only breathable air can pass through the sphere's wall. No attack or other effect can.\n   An enclosed creature can use its action to push against the sphere's wall, moving the sphere up to half the creature's walking speed. The sphere can be picked up, and its magic causes it to weigh only 1 pound, regardless of the weight of creatures inside.",
		weight : 0.0625
	},
	"belt of dwarvenkind" : {
		name : "Belt of Dwarvenkind",
		source : [["SRD", 212], ["D", 155]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "While wearing this belt, you gain the following benefits:\n \u2022 Your Constitution score increases by 2, to a maximum of 20.\n \u2022 You have advantage on Charisma (Persuasion) checks made to interact with dwarves.\n\nIn addition, while attuned to the belt, you have a 50% chance each day at dawn of growing a full beard if you're capable of growing one, or a visibly thicker beard if you already have one.\n\nIf you aren't a dwarf, you gain the following additional benefits while wearing the belt:\n \u2022 You have advantage on saving throws against poison, and you have resistance against poison damage.\n \u2022 You have darkvision out to a range of 60 feet.\n \u2022 You can speak, read, and write Dwarvish.",
		attunement : true
	},
	"belt of giant strength" : { // finished
		name : "Belt of Giant Strength",
		source : [["SRD", 211], ["D", 155]],
		type : "wondrous item",
		rarity : "varies",
		description : "Set the type of giant using the button in this line. While wearing this belt, my Strength score changes to a certain number depending on the type of giant the belt is associated with, provided that my Strength is not already that amount or higher.",
		descriptionFull : "While wearing this belt, your Strength score changes to a score granted by the belt. If your Strength is already equal to or greater than the belt's score, the item has no effect on you. Six varieties of this belt exist, corresponding with and having rarity according to the six kinds of true giants. The belt of stone giant strength and the belt of frost giant strength look different, but they have the same effect.\n\n" + toUni("Type") + "\t\t" + toUni("Str") + "\t" + toUni("Rarity") + "\nHill giant\t\t21\tRare\nStone/frost giant\t23\tVery rare\nFire giant\t\t25\tVery rare\nCloud giant\t27\tLegendary\nStorm giant\t29\tLegendary",
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
	"berserker axe" : { // finished
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
				'If I include the word "Berserker" in the name of an axe, it will be treated as the magic weapon Berserker Axe. It has +1 to hit and damage, but also bears a curse.'
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
		descriptionFull : "While you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have advantage on Dexterity (Stealth) checks that rely on moving silently.",
		eval : function () {
			var cloakIndx = CurrentMagicItems.known.indexOf("cloak of elvenkind");
			if (cloakIndx !== -1 && tDoc.getField("Extra.Magic Item Attuned " + (1 + cloakIndx)).isBoxChecked(0)) {
				SetProf("advantage", true, ["Stealth", true], "Cloak and Boots of Elvenkind (magic items)");
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
		description : "While I wear these boots, I can cast Levitate on myself at will",
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
	"boots of speed" : { // finished
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
	"boots of the winterlands" : { // finished
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
	"bowl of commanding water elementals" : { // finished
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
				description : "CR 5 water elemental that obeys my verbal commands; on broken conc. elemental breaks free",
				changes : "Using the Bowl of Commanding Water Elementals, the spell only takes 1 action instead of 1 minute, but can only bring forth a water elemental."
			}
		}
	},
	"bracers of archery" : { // finished
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
	"bracers of defense" : { // finished
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
	"brazier of commanding fire elementals" : { // finished
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
				description : "CR 5 fire elemental that obeys my verbal commands; on broken conc. elemental breaks free",
				changes : "Using the Brazier of Commanding Fire Elementals, the spell only takes 1 action instead of 1 minute, but can only bring forth a fire elemental."
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
	"broom of flying" : { // finished
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
		description : "",
		descriptionFull : "This slender taper is dedicated to a deity and shares that deity's alignment. The candle's alignment can be detected with the Detect Evil and Good spell. The DM chooses the god and associated alignment or determines the alignment randomly.\n\n" + toUni("d20") + "\t" + toUni("Alignment") + "\n1-2\tChaotic evil\n3-4\tChaotic neutral\n5-7\tChaotic good\n8-9\tNeutral evil\n10-11\tNeutral\n12-13\tNeutral good\n14-15\tLawful evil\n16-17\tLawful neutral\n18-20\tLawful good\n\n\n   The candle's magic is activated when the candle is lit, which requires an action. After burning for 4 hours, the candle is destroyed. You can snuff it out early for use at a later time. Deduct the time it burned in increments of 1 minute from the candle's total burn time.\n   While lit, the candle sheds dim light in a 30-foot radius. Any creature within that light whose alignment matches that of the candle makes attack rolls, saving throws, and ability checks with advantage. In addition, a cleric or druid in the light whose alignment matches the candle's can cast 1st-level spells he or she has prepared without expending spell slots, though the spell's effect is as if cast with a 1st-level slot.\n   Alternatively, when you light the candle for the first time, you can cast the Gate spell with it. Doing so destroys the candle.",
		attunement : true
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
			name: "Once per dawn",
			spells: ["dimension door"],
			selection: ["dimension door"],
			firstCol : "oncelr"
		}
	},
	"carpet of flying" : { // finished
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
	"censer of controlling air elementals" : { // finished
		name : "Censer of Controlling Air Elementals",
		source : [["SRD", 213], ["D", 158]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "While incense is burning in this censer, I can use an action to speak the censer's command word and summon an air elemental, as if I had cast Conjure Elemental. The censer can't be used this way again until the next dawn. This 6\" wide, 1 ft high vessel resembles a chalice with a decorated lid.",
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
				description : "CR 5 air elemental that obeys my verbal commands; on broken conc. elemental breaks free",
				changes : "Using the Censer of Controlling Air Elementals, the spell only takes 1 action instead of 1 minute, but can only bring forth an air elemental."
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
	"circlet of blasting" : {
		name : "Circlet of Blasting",
		source : [["SRD", 214], ["D", 158]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : "While wearing this circlet, you can use an action to cast the Scorching Ray spell with it. When you make the spell's attacks, you do so with an attack bonus of +5. The circlet can't be used this way again until the next dawn."
	},
	"cloak of arachnida" : {
		name : "Cloak of Arachnida",
		source : [["SRD", 214], ["D", 158]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "This fine garment is made of black silk interwoven with faint silvery threads. While wearing it, you gain the following benefits:\n \u2022 You have resistance to poison damage.\n \u2022 You have a climbing speed equal to your walking speed.\n \u2022 You can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free.\n \u2022 You can't be caught in webs of any sort and can move through webs as if they were difficult terrain.\n \u2022 You can use an action to cast the Web spell (save DC 13). The web created by the spell fills twice its normal area. Once used, this property of the cloak can't be used again until the next dawn.",
		attunement : true
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
	"cloak of elvenkind" : { // finished
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
	"cloak of protection" : { // finished
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
	"cloak of the bat" : { // finished
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
	"cloak of the manta ray" : { // finished
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
	"crystal ball" : { // finished
		name : "Crystal Ball",
		source : [["SRD", 214], ["D", 159]],
		type : "wondrous item",
		description : "I can cast Scrying (save DC 17) at will while touching this ball of about 6 inches in diameter.",
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
	"cube of force" : {
		name : "Cube of Force",
		source : [["SRD", 215], ["D", 159]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "This cube is about an inch across. Each face has a distinct marking on it that can be pressed. The cube starts with 36 charges, and it regains 1d20 expended charges daily at dawn.\n   You can use an action to press one of the cube's faces, expending a number of charges based on the chosen face, as shown in the Cube of Force Faces table. Each face has a different effect. If the cube has insufficient charges remaining, nothing happens. Otherwise, a barrier of invisible force springs into existence, forming a cube 15 feet on a side. The barrier is centered on you, moves with you, and lasts for 1 minute, until you use an action to press the cube's sixth face, or the cube runs out of charges. You can change the barrier's effect by pressing a different face of the cube and expending the requisite number of charges, resetting the duration. If your movement causes the barrier to come into contact with a solid object that can't pass through the cube, you can't move any closer to that object as long as the barrier remains.\n\n" + toUni("Face") + "\t" + toUni("Charges") + "\t" + toUni("Effect") + "\n1\t1\tGases, wind, and fog can't pass through the barrier.\n2\t2\tNonliving matter can't pass through the barrier. Walls, floors, and ceilings can pass through at your discretion.\n3\t3\tLiving matter can't pass through the barrier.\n4\t4\tSpell effects can't pass through the barrier.\n5\t5\tNothing can pass through the barrier. Walls, floors, and ceilings can pass through at your discretion.\n6\t0\tThe barrier deactivates.\n\n\n   The cube loses charges when the barrier is targeted by certain spells or comes into contact with certain spell or magic item effects, as shown in the table below.\n\n" + toUni("Spell or item") + "\t" + toUni("Charges Lost") + "\nDisintegrate\t1d12\nHorn of blasting\t1d10\nPasswall\t1d6\nPrismatic Spray\t1d20\nWall of Fire\t1d4",
		attunement : true
	},
	"cubic gate" : {
		name : "Cubic Gate",
		source : [["SRD", 215], ["D", 160]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "This cube is 3 inches across and radiates palpable magical energy. The six sides of the cube are each keyed to a different plane of existence, one of which is the Material Plane. The other sides are linked to planes determined by the DM.\n   You can use an action to press one side of the cube to cast the Gate spell with it, opening a portal to the plane keyed to that side. Alternatively, if you use an action to press one side twice, you can cast the Plane Shift spell (save DC 17) with the cube and transport the targets to the plane keyed to that side.\n   The cube has 3 charges. Each use of the cube expends 1 charge. The cube regains 1d3 expended charges daily at dawn."
	},
	"daern's instant fortress" : {
		name : "Daern's Instant Fortress",
		source : [["SRD", 226], ["D", 160]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "You can use an action to place this 1-inch metal cube on the ground and speak its command word. The cube rapidly grows into a fortress that remains until you use an action to speak the command word that dismisses it, which works only if the fortress is empty.\n   The fortress is a square tower, 20 feet on a side and 30 feet high, with arrow slits on all sides and a battlement atop it. Its interior is divided into two floors. with a ladder running along one wall to connect them. The ladder ends at a trapdoor leading to the roof. When activated, the tower has a small door on the side facing you. The door opens only at your command, which you can speak as a bonus action. It is immune to the Knock spell and similar magic, such as that of a chime of opening.\n   Each creature in the area where the fortress appears must make a DC 15 Dexterity saving throw, taking 10d10 bludgeoning damage on a failed save, or half as much damage on a successful one. In either case, the creature is pushed to an unoccupied space outside but next to the fortress. Objects in the area that aren't being worn or carried take this damage and are pushed automatically.\n   The tower is made of adamantine, and its magic prevents it from being tipped over. The roof, the door, and the walls each have 100 hit points, immunity to damage from nonmagical weapons excluding siege weapons, and resistance to all other damage. Only a Wish spell can repair the fortress (this use of the spell counts as replicating a spell of 8th level or lower). Each casting of Wish causes the roof, the door, or one wall to regain 50 hit points."
	},
	"dagger of venom" : {
		name : "Dagger of Venom",
		source : [["SRD", 215], ["D", 161]],
		type : "weapon (dagger)",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "You gain a +1 bonus to attack and damage rolls made with this magic weapon.\n   You can use an action to cause thick, black poison to coat the blade. The poison remains for 1 minute or until an attack using this weapon hits a creature. That creature must succeed on a DC 15 Constitution saving throw or take 2d10 poison damage and become poisoned for 1 minute. The dagger can't be used this way again until the next dawn.",
		weight : 1
	},
	"dancing sword" : { // finished
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
				'If I include the word "Dancing" in the name of a sword, it will be treated as the magic weapon Dancing Sword. The sword can be made to attack on its own as a bonus action.'
			]
		}
	},
	"decanter of endless water" : { // finished
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
		description : "",
		descriptionFull : "This box contains a set of parchment cards. A full deck has 34 cards. A deck found as treasure is usually missing 1d20-1 cards.\n   The magic of the deck functions only if cards are drawn at random (you can use an altered deck of playing cards to simulate the deck). You can use an action to draw a card at random from the deck and throw it to the ground at a point within 30 feet of you.\n   An illusion of one or more creatures forms over the thrown card and remains until dispelled. An illusory creature appears real, of the appropriate size, and behaves as if it were a real creature, except that it can do no harm. While you are within 120 feet of the illusory creature and can see it, you can use an action to move it magically anywhere within 30 feet of its card. Any physical interaction with the illusory creature reveals it to be an illusion, because objects pass through it. Someone who uses an action to visually inspect the creature identifies it as illusory with a successful DC 15 Intelligence (Investigation) check. The creature then appears translucent.\n   The illusion lasts until its card is moved or the illusion is dispelled. When the illusion ends, the image on its card disappears, and that card can't be used again.\n\n" + toUni("1d33") + "\t" + toUni("Playing Card") + "\t" + toUni("Illusion") + "\n1\tAce of hearts\tRed dragon\n2\tKing of hearts\tKnight and four guards\n3\tQueen of hearts\tSuccubus/Incubus\n4\tJack of hearts\tDruid\n5\tTen of hearts\tCloud giant\n6\tNine of hearts\tEttin\n7\tEight of hearts\tBugbear\n8\tTwo of hearts\tGoblin\n9\tAce of diamonds\tBeholder\n10\tKing of diamonds\tArchmage and mage apprentice\n11\tQueen of diamonds\tNight hag\n12\tJack of diamonds\tAssassin\n13\tTen of diamonds\tFire giant\n14\tNine of diamonds\tOgre mage\n15\tEight of diamonds\tGnoll\n16\tTwo of diamonds\tKobold\n17\tAce of spades\tLich\n18\tKing of spades\tPriest and two acolytes\n19\tQueen of spades\tMedusa\n20\tJack of spades\tVeteran\n21\tTen of spades\tFrost giant\n22\tNine of spades\tTroll\n23\tEight of spades\tHobgoblin\n24\tTwo of spades\tGoblin\n25\tAce of clubs\tIron golem\n26\tKing of clubs\tBandit captain and three bandits\n27\tQueen of clubs\tErinyes\n28\tJack of clubs\tBerserker\n29\tTen of clubs\tHill giant\n30\tNine of clubs\tOgre\n31\tEight of clubs\tOrc\n32\tTwo of clubs\tKobold\n33\tjokers (2)\tYou (the deck's owner)"
	},
	"deck of many things" : {
		name : "Deck of Many Things",
		source : [["SRD", 216], ["D", 162]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "Usually found in a box or pouch, this deck contains a number of cards made of ivory or vellum. Most (75 percent) of these decks have only thirteen cards, but the rest have twenty-two.\n   Before you draw a card, you must declare how many cards you intend to draw and then draw them randomly (you can use an altered deck of playing cards to simulate the deck). Any cards drawn in excess of this number have no effect. Otherwise, as soon as you draw a card from the deck, its magic takes effect. You must draw each card no more than 1 hour after the previous draw. If you fail to draw the chosen number, the remaining number of cards fly from the deck on their own and take effect all at once.\n   Once a card is drawn, it fades from existence. Unless the card is the Fool or the Jester, the card reappears in the deck, making it possible to draw the same card twice.\n   " + toUni("A Question of Enmity") + ". Two of the cards in a deck of many things can earn a character the enmity of another being. With the Flames card, the enmity is overt. The character should experience the devil's malevolent efforts on multiple occasions. Seeking out the fiend shouldn't be a simple task, and the adventurer should clash with the devil's allies and followers a few times before being able to confront the devil itself.\n   In the case of the Rogue card, the enmity is secret and should come from someone thought to be a friend or an ally. As Dungeon Master, you should wait for a dramatically appropriate moment to reveal this enmity, leaving the adventurer guessing who is likely to become a betrayer.\n\n" + toUni("1d22") + "\t" + toUni("Playing Card") + "\t" + toUni("Card") + "\n1\tAce of diamonds\tVizier*\n2\tKing of diamonds\tSun\n3\tQueen of diamonds\tMoon\n4\tJack of diamonds\tStar\n5\tTwo of diamonds\tComet*\n6\tAce of hearts\tThe Fates*\n7\tKing of hearts\tThrone\n8\tQueen of hearts\tKey\n9\tJack of hearts\tKnight\n10\tTwo of hearts\tGem*\n11\tAce of clubs\tTalons*\n12\tKing of clubs\tThe Void\n13\tQueen of clubs\tFlames\n14\tJack of clubs\tSkull\n15\tTwo of clubs\tIdiot*\n16\tAce of spades\tDonjon*\n17\tKing of spades\tRuin\n18\tQueen of spades\tEuryale\n19\tJack of spades\tRogue\n20\tTwo of spades\tBalance*\n21\tJoker (with TM)\tFool*\n22\tJoker (no TM)\tJester\n\n\n   " + toUni("Vizier") + ". At any time you choose within one year of drawing this card, you can ask a question in meditation and mentally receive a truthful answer to that question. Besides information, the answer helps you solve a puzzling problem or other dilemma. In other words, the knowledge comes with wisdom on how to apply it.\n   " + toUni("Sun") + ". You gain 50,000 XP, and a wondrous item (which the DM determines randomly) appears in your hands.\n   " + toUni("Moon") + ". You are granted the ability to cast the Wish spell 1d3 times.\n   " + toUni("Star") + ". Increase one of your ability scores by 2. The score can exceed 20 but can't exceed 24.\n   " + toUni("Comet") + ". If you single-handedly defeat the next hostile monster or group of monsters you encounter, you gain experience points enough to gain one level. Otherwise, this card has no effect.\n   " + toUni("The Fates*") + ". Reality's fabric unravels and spins anew, allowing you to avoid or erase one event as if it never happened. You can use the card's magic as soon as you draw the card or at any other time before you die.\n   " + toUni("Throne") + ". You gain proficiency in the Persuasion skill, and you double your proficiency bonus on checks made with that skill. In addition, you gain rightful ownership of a small keep somewhere in the world. However, the keep is currently in the hands of monsters, which you must clear out before you can claim the keep as yours.\n   " + toUni("Key") + ". A rare or rarer magic weapon with which you are proficient appears in your hands. The DM chooses the weapon.\n   " + toUni("Knight") + ". You gain the service of a 4th-level fighter who appears in a space you choose within 30 feet of you. The fighter is of the same race as you and serves you loyally until death, believing the fates have drawn him or her to you. You control this character.\n   " + toUni("Gem") + ". Twenty-five pieces of jewelry worth 2,000 gp each or fifty gems worth 1,000 gp each appear at your feet.\n   " + toUni("Talons") + ". Every magic item you wear or carry disintegrates. Artifacts in your possession aren't destroyed but do vanish.\n   " + toUni("The Void") + ". This black card spells disaster. Your soul is drawn from your body and contained in an object in a place of the DM's choice. One or more powerful beings guard the place. While your soul is trapped in this way, your body is incapacitated. A Wish spell can't restore your soul, but the spell reveals the location of the object that holds it. You draw no more cards.\n   " + toUni("Flames") + ". A powerful devil becomes your enemy. The devil seeks your ruin and plagues your life, savoring your suffering before attempting to slay you. This enmity lasts until either you or the devil dies.\n   " + toUni("Skull") + ". You summon an avatar of death-a ghostly humanoid skeleton clad in a tattered black robe and carrying a spectral scythe. It appears in a space of the DM's choice within 10 feet of you and attacks you, warning all others that you must win the battle alone. The avatar fights until you die or it drops to 0 hit points, whereupon it disappears. If anyone tries to help you, the helper summons its own avatar of death. A creature slain by an avatar of death can't be restored to life.\n   " + toUni("Idiot") + ". Permanently reduce your Intelligence by 1d4+1 (to a minimum score of 1). You can draw one additional card beyond your declared draws.\n   " + toUni("Donjon*") + ". You disappear and become entombed in a state of suspended animation in an extradimensional sphere. Everything you were wearing and carrying stays behind in the space you occupied when you disappeared. You remain imprisoned until you are found and removed from the sphere. You can't be located by any divination magic, but a Wish spell can reveal the location of your prison. You draw no more cards.\n   " + toUni("Ruin") + ". All forms of wealth that you carry or own, other than magic items, are lost to you. Portable property vanishes. Businesses, buildings, and land you own are lost in a way that alters reality the least. Any documentation that proves you should own something lost to this card also disappears.\n   " + toUni("Euryale") + ". The card's medusa-like visage curses you. You take a -2 penalty on saving throws while cursed in this way. Only a god or the magic of The Fates card can end this curse.\n   " + toUni("Rogue") + ". A nonplayer character of the DM's choice becomes hostile toward you. The identity of your new enemy isn't known until the NPC or someone else reveals it. Nothing less than a Wish spell or divine intervention can end the NPC's hostility toward you.\n   " + toUni("Balance") + ". Your mind suffers a wrenching alteration, causing your alignment to change. Lawful becomes chaotic, good becomes evil, and vice versa. If you are true neutral or unaligned, this card has no effect on you.\n   " + toUni("Fool") + ". You lose 10,000 XP, discard this card, and draw from the deck again, counting both draws as one of your declared draws. If losing that much XP would cause you to lose a level, you instead lose an amount that leaves you with just enough XP to keep your level.\n   " + toUni("Jester") + ". You gain 10,000 XP, or you can draw two additional cards beyond your declared draws.\n   * Found only in a deck with twenty-two cards"
	},
	"defender" : { // finished
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
				'If I include the word "Defender" in the name of a sword, it will be treated as the magic weapon Defender. It has +3 to hit and damage, but this bonus can be lowered and added to AC instead. Decide to do so with the first attack on your turn.'
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
	"demon armor" : {
		name : "Demon Armor",
		source : [["SRD", 218], ["D", 165]],
		type : "armor (plate)",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "While wearing this armor, you gain a +1 bonus to AC, and you can understand and speak Abyssal. In addition, the armor's clawed gauntlets turn unarmed strikes with your hands into magic weapons that deal slashing damage, with a +1 bonus to attack and damage rolls and a damage die of 1d8.\n   " + toUni("Curse") + ". Once you don this cursed armor, you can't doff it unless you are targeted by the Remove Curse spell or similar magic. While wearing the armor, you have disadvantage on attack rolls against demons and on saving throws against their spells and special abilities.",
		attunement : true,
		weight : 65,
		cursed : true
	},
	"dimensional shackles" : { // finished
		name : "Dimensional Shackles",
		source : [["SRD", 219], ["D", 165]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "As an action, I can shackle an incapacitated creature of size Small to Large. They work as mundane manacles and prevent extradimensional movement, but not portal travel. I and others I designate can remove them as an action. The bound target can try every 30 days to break them with a DC 30 Athletics check.",
		descriptionFull : "You can use an action to place these shackles on an incapacitated creature. The shackles adjust to fit a creature of Small to Large size. In addition to serving as mundane manacles, the shackles prevent a creature bound by them from using any method of extradimensional movement, including teleportation or travel to a different plane of existence. They don't prevent the creature from passing-through an interdimensional portal.\n   You and any creature you designate when you use the shackles can use an action to remove them. Once every 30 days, the bound creature can make a DC 30 Strength (Athletics) check. On a success, the creature breaks free and destroys the shackles.",
		action : [["action", " (bind/remove)"]]
	},
	"dragon scale mail" : { // finished
		name : "Dragon Scale Mail",
		source : [["SRD", 219], ["D", 165]],
		type : "armor (scale mail)",
		rarity : "very rare",
		magicItemTable : "H",
		allowDuplicates : true,
		description : "While wearing this armor, I gain a resistance to a damage type, +1 AC and advantage on saving throws against the frightful presence and breath weapons of dragons. Once per dawn as an action, I can magically discern the distance and direction to the closest dragon of the armor's type within 30 miles of me.",
		descriptionFull : "Dragon scale mail is made of the scales of one kind of dragon. Sometimes dragons collect their cast-off scales and gift them to humanoids. Other times, hunters carefully skin and preserve the hide of a dead dragon. In either case, dragon scale mail is highly valued.\n   While wearing this armor, you gain a +1 bonus to AC, you have advantage on saving throws against the Frightful Presence and breath weapons of dragons, and you have resistance to one damage type that is determined by the kind of dragon that provided the scales (see the table).\n   Additionally, you can focus your senses as an action to magically discern the distance and direction to the closest dragon within 30 miles of you that is of the same type as the armor. This special action can't be used again until the next dawn.\n\n" + toUni("Dragon\tResistance\tDragon\tResistance") + "\nBlack\tAcid\t\tGold\tFire\nBlue\tLightning  \tGreen\tPoison\nBrass\tFire\t\tRed\tFire\nBronze\tLightning  \tSilver\tCold\nCopper\tAcid\t\tWhite\tCold",
		attunement : true,
		weight : 45,
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
	"dragon slayer" : { // finished
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
				'If I include the words "Dragon Slayer" in the name of a sword, it will be treated as the magic weapon Dragon Slayer. It has +1 to hit and damage and deals +3d6 damage to creatures with the dragon type.'
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
	"dust of disappearance" : { // finished
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
		description : "",
		descriptionFull : "This small packet contains 1d6+4 pinches of dust. You can use an action to sprinkle a pinch of it over water. The dust turns a cube of water 15 feet on a side into one marble-sized pellet, which floats or rests near where the dust was sprinkled. The pellet's weight is negligible.\n   Someone can use an action to smash the pellet against a hard surface, causing the pellet to shatter and release the water the dust absorbed. Doing so ends that pellet's magic.\n   An elemental composed mostly of water that is exposed to a pinch of the dust must make a DC 13 Constitution saving throw, taking 10d6 necrotic damage on a failed save, or half as much damage on a successful one."
	},
	"dust of sneezing and choking" : {
		name : "Dust of Sneezing and Choking",
		source : [["SRD", 219], ["D", 166]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "Once as an action, ",
		descriptionFull : "Found in a small container, this powder resembles very fine sand. It appears to be dust of disappearance, and an Identify spell reveals it to be such. There is enough of it for one use.\n   When you use an action to throw a handful of the dust into the air, you and each creature that needs to breathe within 30 feet of you must succeed on a DC 15 Constitution saving throw or become unable to breathe while sneezing uncontrollably. A creature affected in this way is incapacitated and suffocating. As long as it is conscious, a creature can repeat the saving throw at the end of each of its turns, ending the effect on it on a success. The Lesser Restoration spell can also end the effect on a creature."
	},
	"dwarven plate" : {
		name : "Dwarven Plate",
		source : [["SRD", 220], ["D", 167]],
		type : "armor (plate)",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "While wearing this armor, you gain a +2 bonus to AC. In addition, if an effect moves you against your will along the ground, you can use your reaction to reduce the distance you are moved by up to 10 feet.",
		weight : 65
	},
	"dwarven thrower" : { // finished
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
	"elemental gem": { // finished
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
				name : "Air Elemental only",
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
		description : "",
		descriptionFull : "You gain a +1 bonus to AC while you wear this armor. You are considered proficient with this armor even if you lack proficiency with medium armor.",
		weight : 20
	},
	"eversmoking bottle" : {
		name : "Eversmoking Bottle",
		source : [["SRD", 220], ["D", 168]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : "Smoke leaks from the lead-stoppered mouth of this brass bottle, which weighs 1 pound. When you use an action to remove the stopper, a cloud of thick smoke pours out in a 60-foot radius from the bottle. The cloud's area is heavily obscured. Each minute the bottle remains open and within the cloud, the radius increases by 10 feet until it reaches its maximum radius of 120 feet.\n   The cloud persists as long as the bottle is open. Closing the bottle requires you to speak its command word as an action. Once the bottle is closed, the cloud disperses after 10 minutes. A moderate wind (11 to 20 miles per hour) can also disperse the smoke after 1 minute, and a strong wind (21 or more miles per hour) can do so after 1 round.",
		weight : 1
	},
	"eyes of charming" : { // finished
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
	"eyes of the eagle" : { // finished
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
	"figurine of wondrous power, bronze griffon" : {
		name : "Figurine of Wondrous Power, Bronze Griffon",
		source : [["SRD", 222], ["D", 169]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the figurine's description.\n   Bronze Griffon.\n   This bronze statuette is of a griffon rampant. It can become a griffon for up to 6 hours. Once it has been used, it can't be used again until 5 days have passed."
	},
	"figurine of wondrous power, ebony fly" : {
		name : "Figurine of Wondrous Power, Ebony Fly",
		source : [["SRD", 222], ["D", 169]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the figurine's description.\n   giant Ebony Fly.\n   This ebony statuette is carved in the likeness of a horsefly. It can become a giant fly for up to 12 hours and can be ridden as a mount. Once it has been used, it can't be used again until 2 days have passed."
	},
	"figurine of wondrous power, golden lions" : {
		name : "Figurine of Wondrous Power, Golden Lions",
		source : [["SRD", 222], ["D", 169]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the figurine's description.\n   Golden Lions.\n   These gold statuettes of lions are always created in pairs. You can use one figurine or both simultaneously. Each can become a lion for up to 1 hour. Once a lion has been used, it can't be used again until 7 days have passed."
	},
	"figurine of wondrous power, ivory goats" : {
		name : "Figurine of Wondrous Power, Ivory Goats",
		source : [["SRD", 222], ["D", 169]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the figurine's description.\n   Ivory Goats.\n   These ivory statuettes of goats are always created in sets of three. Each goat looks unique and functions differently from the others. Their properties are as follows:\n \u2022 The goat of traveling can become a Large goat with the same statistics as a riding horse. It has 24 charges, and each hour or portion thereof it spends in beast form costs 1 charge. While it has charges, you can use it as often as you wish. When it runs out of charges, it reverts to a figurine and can't be used again until 7 days have passed, when it regains all its charges.\n \u2022 The goat of travail becomes a giant goat for up to 3 hours. Once it has been used, it can't be used again until 30 days have passed.\n \u2022 The goat of terror becomes a giant goat for up to 3 hours. The goat can't attack, but you can remove its horns and use them as weapons. One horn becomes a +1 lance, and the other becomes a +2 longsword. Removing a horn requires an action, and the weapons disappear and the horns return when the goat reverts to figurine form. In addition, the goat radiates a 30-foot-radius aura of terror while you are riding it. Any creature hostile to you that starts its turn in the aura must succeed on a DC 15 Wisdom saving throw or be frightened of the goat for 1 minute, or until the goat reverts to figurine form. The frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. Once it successfully saves against the effect, a creature is immune to the goat's aura for the next 24 hours. Once the figurine has been used, it can't be used again until 15 days have passed."
	},
	"figurine of wondrous power, marble elephant" : {
		name : "Figurine of Wondrous Power, Marble Elephant",
		source : [["SRD", 222], ["D", 170]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the figurine's description.\n   Marble Elephant.\n   This marble statuette is about 4 inches high and long. It can become an elephant for up to 24 hours. Once it has been used, it can't be used again until 7 days have passed."
	},
	"figurine of wondrous power, obsidian steed" : {
		name : "Figurine of Wondrous Power, Obsidian Steed",
		source : [["SRD", 222], ["D", 170]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the figurine's description.\n   Obsidian Steed.\n   This polished obsidian horse can become a nightmare for up to 24 hours. The nightmare fights only to defend itself. Once it has been used, it can't be used again until 5 days have passed.\n   If you have a good alignment, the figurine has a 10% chance each time you use it to ignore your orders, including a command to revert to figurine form. If you mount the nightmare while it is ignoring your orders, you and the nightmare are instantly transported to a random location on the plane of Hades, where the nightmare reverts to figurine form."
	},
	"figurine of wondrous power, onyx dog" : {
		name : "Figurine of Wondrous Power, Onyx Dog",
		source : [["SRD", 222], ["D", 170]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the figurine's description.\n   Onyx Dog.\n   This onyx statuette of a dog can become a mastiff for up to 6 hours. The mastiff has an Intelligence of 8 and can speak Common. It also has dark vision out to a range of 60 feet and can see invisible creatures and objects within that range. Once it has been used, it can't be used again until 7 days have passed."
	},
	"figurine of wondrous power, serpentine owl" : {
		name : "Figurine of Wondrous Power, Serpentine Owl",
		source : [["SRD", 222], ["D", 170]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the figurine's description.\n   Serpentine Owl.\n   This serpentine statuette of an owl can become a giant owl for up to 8 hours. Once it has been used, it can't be used again until 2 days have passed. The owl can telepathically communicate with you at any range if you and it are on the same plane of existence."
	},
	"figurine of wondrous power, silver raven" : {
		name : "Figurine of Wondrous Power, Silver Raven",
		source : [["SRD", 222], ["D", 170]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n   The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n   The creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the figurine's description.\n   Silver Raven.\n   This silver statuette of a raven can become a raven for up to 12 hours. Once it has been used, it can't be used again until 2 days have passed. While in raven form, the figurine allows you to cast the Animal Messenger spell on it at will."
	},
	"flame tongue" : { // finished
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
				'If I include the words "Flame Tongue" in the name of a sword, it will be treated as the magic weapon Flame Tongue. When the command word is spoken, the blade erupts with flames, adding +2d6 fire damage on a hit and shining light.'
			]
		}
	},
	"folding boat" : { // finished
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
	"frost brand" : { // finished
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
				'If I include the words "Frost Brand" in the name of a sword, it will be treated as the magic weapon Frost Brand. It does +1d6 cold damage.'
			]
		}
	},
	"gauntlets of ogre power" : { // finished
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
	"giant slayer" : { // finished
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
				'If I include the words "Giant Slayer" in the name of a sword, it will be treated as the magic weapon Giant Slayer. It has +1 to hit and damage and when hitting a creatures with the giant type, it does +2d6 damage and the target has to make a DC 15 Strength save or be knocked prone.'
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
	"glamoured studded leather" : { // finished
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
			ac : 13, // 1 more AC than normal studded leather because of the +1 magical bonus
			weight : 13
		},
		action : [["bonus action", ""]]
	},
	"gloves of missile snaring" : { // finished
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
	"hammer of thunderbolts" : {
		name : "Hammer of Thunderbolts",
		source : [["SRD", 224], ["D", 173]],
		type : "weapon (maul)",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "You gain a +1 bonus to attack and damage rolls made with this magic weapon.\n   " + toUni("Giant's Bane (Requires Attunement)") + ". You must be wearing a belt of giant strength (any variety) and gauntlets of ogre power to attune to this weapon. The attunement ends if you take off either of those items. While you are attuned to this weapon and holding it, your Strength score increases by 4 and can exceed 20, but not 30. When you roll a 20 on an attack roll made with this weapon against a giant, the giant must succeed on a DC 17 Constitution saving throw or die.\n   The hammer also has 5 charges. While attuned to it, you can expend 1 charge and make a ranged weapon attack with the hammer, hurling it as if it had the thrown property with a normal range of 20 feet and a long range of 60 feet. If the attack hits, the hammer unleashes a thunderclap audible out to 300 feet. The target and every creature within 30 feet of it must succeed on a DC 17 Constitution saving throw or be stunned until the end of your next turn. The hammer regains 1d4+1 expended charges daily at dawn.",
		weight : 10
	},
	"hat of disguise" : { // contributed by Larry Hoy
		name : "Hat of Disguise",
		source : [["SRD", 225], ["D", 173]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "As an action while wearing this hat, I can cast Disguise Self from it at will; the spell ends if the hat is removed.",
		descriptionFull : "While wearing this hat, you can use an action to cast the Disguise Self spell from it at will. The spell ends if the hat is removed.",
		attunement : true,
		spellcastingBonus : [{
			name : "At will",
			spells : ["disguise self"],
			selection : ["disguise self"],
			firstCol : "atwill"
	   }],
	   fixedDC : "class" // https://www.sageadvice.eu/2015/11/27/hat-of-disguise-dc/
	},
	"headband of intellect" : { // finished
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
		description : "",
		descriptionFull : "This dazzling helm is set with 1d10 diamonds, 2d10 rubies, 3d10 fire opals, and 4d10 opals. Any gem pried from the helm crumbles to dust. When all the gems are removed or destroyed, the helm loses its magic.\n   You gain the following benefits while wearing it:\n \u2022 You can use an action to cast one of the following spells (save DC 18), using one of the helm's gems of the specified type as a component: Daylight (opal), Fireball (fire opal), Prismatic Spray (diamond), or Wall of Fire (ruby). The gem is destroyed when the spell is cast and disappears from the helm.\n \u2022 As long as it has at least one diamond, the helm emits dim light in a 30-foot radius when at least one undead is within that area. Any undead that starts its turn in that area takes 1d6 radiant damage.\n \u2022 As long as the helm has at least one ruby, you have resistance to fire damage.\n \u2022 As long as the helm has at least one fire opal, you can use an action and speak a command word to cause one weapon you are holding to burst into flames. The flames emit bright light in a 10-foot radius and dim light for an additional 10 feet. The flames are harmless to you and the weapon. When you hit with an attack using the blazing weapon, the target takes an extra 1d6 fire damage. The flames last until you use a bonus action to speak the command word again or until you drop or stow the weapon.\n\nRoll a d20 if you are wearing the helm and take fire damage as a result of failing a saving throw against a spell. On a roll of 1, the helm emits beams of light from its remaining gems. Each creature within 60 feet of the helm other than you must succeed on a DC 17 Dexterity saving throw or be struck by a beam, taking radiant damage equal to the number of gems in the helm. The helm and its gems are then destroyed.",
		attunement : true
	},
	"helm of comprehending languages" : { // contributed by Larry Hoy
		name : "Helm of Comprehending Languages",
		source : [["SRD", 225], ["D", 173]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "While wearing this helm, I can cast Comprehend Languages at will.",
		descriptionFull : "While wearing this helm, you can use an action to cast the Comprehend Languages spell from it at will.",
		spellcastingBonus : [{
			name : "At will",
			spells : ["comprehend languages"],
			selection : ["comprehend languages"],
			firstCol : "atwill"
		}]
	},
	"helm of telepathy" : { // finished
		name : "Helm of Telepathy",
		source : [["SRD", 225], ["D", 174]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While wearing this helm, I can cast Detect Thoughts (DC 13) at will. As a bonus action, I can send a telepathic message to a creature that I'm focussing on with the spell, which can reply as a bonus action. Once between each dawn, I can cast Suggestion (DC 13) on a creature I'm focussing on with Detect Thoughts.",
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
		description : "",
		descriptionFull : "This helm has 3 charges. While wearing it, you can use an action and expend 1 charge to cast the Teleport spell from it. The helm regains 1d3 expended charges daily at dawn.",
		attunement : true
	},
	"holy avenger" : { // finished
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
				'If I include the words "Holy Avenger" in the name of a sword, it will be treated as the magic weapon Holy Avenger. It has +3 to hit and damage and does +2d10 radiant damage to fiends and undead.'
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
	"heward's handy haversack" : { // finished
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
	"horn of valhalla, brass" : {
		name : "Horn of Valhalla, Brass",
		source : [["SRD", 226], ["D", 175]],
		type : "wondrous item",
		rarity : "rare",
		description : "",
		descriptionFull : "You can use an action to blow this horn. In response, warrior spirits from the plane of Ysgard appear within 60 feet of you. These spirits use the berserker statistics. They return to Ysgard after 1 hour or when they drop to 0 hit points. Once you use the horn, it can't be used again until 7 days have passed.\n   A brass horn summons 3d4+3 berserkers. To use the brass horn, you must be proficient with all simple weapons.\n   If you blow the horn without meeting its requirement, the summoned berserkers attack you. If you meet the requirement, they are friendly to you and your companions and follow your commands.",
		weight : 2
	},
	"horn of valhalla, bronze" : {
		name : "Horn of Valhalla, Bronze",
		source : [["SRD", 226], ["D", 175]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "You can use an action to blow this horn. In response, warrior spirits from the plane of Ysgard appear within 60 feet of you. These spirits use the berserker statistics. They return to Ysgard after 1 hour or when they drop to 0 hit points. Once you use the horn, it can't be used again until 7 days have passed.\n   A bronze horn summons 4d4+4 berserkers. To use the bronze horn, you must be proficient with medium armor.\n   If you blow the horn without meeting its requirement, the summoned berserkers attack you. If you meet the requirement, they are friendly to you and your companions and follow your commands.",
		weight : 2
	},
	"horn of valhalla, iron" : {
		name : "Horn of Valhalla, Iron",
		source : [["SRD", 226], ["D", 175]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "You can use an action to blow this horn. In response, warrior spirits from the plane of Ysgard appear within 60 feet of you. These spirits use the berserker statistics. They return to Ysgard after 1 hour or when they drop to 0 hit points. Once you use the horn, it can't be used again until 7 days have passed.\n   The iron horn summons 5d4+5 berserkers. To use the iron horn, you must be proficient with all martial weapons.\n   If you blow the horn without meeting its requirement, the summoned berserkers attack you. If you meet the requirement, they are friendly to you and your companions and follow your commands.",
		weight : 2
	},
	"horn of valhalla, silver" : {
		name : "Horn of Valhalla, Silver",
		source : [["SRD", 226], ["D", 175]],
		type : "wondrous item",
		rarity : "rare",
		description : "",
		descriptionFull : "You can use an action to blow this horn. In response, warrior spirits from the plane of Ysgard appear within 60 feet of you. These spirits use the berserker statistics. They return to Ysgard after 1 hour or when they drop to 0 hit points. Once you use the horn, it can't be used again until 7 days have passed.\n   The silver horn summons 2d4+2 berserkers.\n   The berserkers are friendly to you and your companions and follow your commands.",
		weight : 2
	},
	"horseshoes of a zephyr" : {
		name : "Horseshoes of a Zephyr",
		source : [["SRD", 226], ["D", 175]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "D",
		description : "",
		descriptionFull : "These iron horseshoes come in a set of four. While all four shoes are affixed to the hooves of a horse or similar creature, they allow the creature to move normally while floating 4 inches above the ground. This effect means the creature can cross or stand above nonsolid or unstable surfaces, such as water or lava. The creature leaves no tracks and ignores difficult terrain. In addition, the creature can move at normal speed for up to 12 hours a day without suffering exhaustion from a forced march."
	},
	"horseshoes of speed" : {
		name : "Horseshoes of Speed",
		source : [["SRD", 226], ["D", 175]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "C",
		description : "",
		descriptionFull : "These iron horseshoes come in a set of four. While all four shoes are affixed to the hooves of a horse or similar creature, they increase the creature's walking speed by 30 feet."
	},
	"immovable rod" : { // finished
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
	"ioun stone" : { // finished
		name : "Ioun Stone",
		source : [["SRD", 227], ["D", 176]],
		type : "wondrous item",
		attunement : true,
		description : "As an action, I can make an ioun stone orbit my head at 1d3 ft or retrieve it. Others can catch it as an action with an attack or Acrobatics check (AC/DC 24). It has 10 HP and resistance to all damage. Different stones grant different benefits.",
		descriptionFull : "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n   When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n   A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.",
		allowDuplicates : true,
		action : [["action", "Ioun Stone (orbit/retrieve)"]],
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
			action : [["reaction", "Ioun Stone of Absorption"]]
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
			action : [["reaction", "Ioun Stone of Greater Absorption"]]
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
	"iron bands of bilarro" : { // with contributions by AelarTheElfRogue
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
	"iron flask" : {
		name : "Iron Flask",
		source : [["SRD", 228], ["D", 178]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "This iron bottle has a brass stopper. You can use an action to speak the flask's command word, targeting a creature that you can see within 60 feet of you. If the target is native to a plane of existence other than the one you're on, the target must succeed on a DC 17 Wisdom saving throw or be trapped in the flask. If the target has been trapped by the flask before, it has advantage on the saving throw. Once trapped, a creature remains in the flask until released. The flask can hold only one creature at a time. A creature trapped in the flask doesn't need to breathe, eat, or drink and doesn't age.\n   You can use an action to remove the flask's stopper and release the creature the flask contains. The creature is friendly to you and your companions for 1 hour and obeys your commands for that duration. If you give no commands or give it a command that is likely to result in its death, it defends itself but otherwise takes no actions. At the end of the duration, the creature acts in accordance with its normal disposition and alignment.\n   An Identify spell reveals that a creature is inside the flask, but the only way to determine the type of creature is to open the flask. A newly discovered bottle might already contain a creature chosen by the DM or determined randomly.\n\n" + toUni("d100") + "\t" + toUni("Contents") + "\n01-50\tEmpty\n51\tArcanaloth\n52\tCambion\n53-54\tDao\n55-57\tDemon (type 1): barlgura, shadow demon, or vrock\n58-60\tDemon (type 2): chasme or hezrou\n61-62\tDemon (type 3): glabrezu or yochlol\n63-64\tDemon (type 4): nalfeshnee\n65\tDemon (type 5): marilith\n66\tDemon (type 6): balor or goristro\n67\tDeva\n68-69\tDevil (greater): horned devil, erinyes, ice devil, or pit fiend\n70-72\tDevil (lesser): imp, spined devil, bearded devil, barbed devil, chain devil, or bone devil\n73-74\tDjinni\n75-76\tEfreeti\n77-78\tElemental (any)\n79\tGithyanki knight\n80\tGithzerai zerth\n81-82\tInvisible stalker\n83-84\tMarid\n85-86\tMezzoloth\n87-88\tNight hag\n89-90\tNycaloth\n91\tPlanetar\n92-93\tSalamander\n94-95\tSlaad (any)\n96\tSolar\n97-98\tSuccubus/Incubus\n99\tUltroloth\n00\tXorn",
		weight : 1
	},
	"javelin of lightning" : {
		name : "Javelin of Lightning",
		source : [["SRD", 228], ["D", 178]],
		type : "weapon (javelin)",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : "This javelin is a magic weapon. When you hurl it and speak its command word, it transforms into a bolt of lightning, forming a line 5 feet wide that extends out from you to a target within 120 feet. Each creature in the line excluding you and the target must make a DC 13 Dexterity saving throw, taking 4d6 lightning damage on a failed save, and half as much damage on a successful one. The lightning bolt turns back into a javelin when it reaches the target. Make a ranged weapon attack against the target. On a hit, the target takes damage from the javelin plus 4d6 lightning damage.\n   The javelin's property can't be used again until the next dawn. In the meantime, the javelin can still be used as a magic weapon.",
		weight : 2
	},
	"keoghtom's ointment" : {
		name : "Keoghtom's Ointment",
		source : [["SRD", 235], ["D", 179]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "",
		descriptionFull : "This glass jar, 3 inches in diameter, contains 1d4+1 doses of a thick mixture that smells faintly of aloe. The jar and its contents weigh \xBD pound.\n   As an action, one dose of the ointment can be swallowed or applied to the skin. The creature that receives it regains 2d8+2 hit points, ceases to be poisoned, and is cured of any disease."
	},
	"lantern of revealing" : { // finished
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
	"luck blade" : { // finished
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
				'If I include the words "Luck Blade" in the name of a sword, it will be treated as the magic weapon Luck Blade. It has +1 to hit and damage.'
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
	"mace of disruption" : {
		name : "Mace of Disruption",
		source : [["SRD", 229], ["D", 179]],
		type : "weapon (mace)",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "When you hit a fiend or an undead with this magic weapon, that creature takes an extra 2d6 radiant damage. If the target has 25 hit points or fewer after taking this damage, it must succeed on a DC 15 Wisdom saving throw or be destroyed. On a successful save, the creature becomes frightened of you until the end of your next turn.\n   While you hold this weapon, it sheds bright light in a 20-foot radius and dim light for an additional 20 feet.",
		attunement : true,
		weight : 4
	},
	"mace of smiting" : {
		name : "Mace of Smiting",
		source : [["SRD", 229], ["D", 179]],
		type : "weapon (mace)",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "You gain a +1 bonus to attack and damage rolls made with this magic weapon. The bonus increases to +3 when you use the mace to attack a construct.\n   When you roll a 20 on an attack roll made with this weapon, the target takes an extra 7 bludgeoning damage, or an extra 14 bludgeoning damage if it's a construct. If a construct has 25 hit points or fewer after taking this damage, it is destroyed.",
		weight : 4
	},
	"mace of terror" : {
		name : "Mace of Terror",
		source : [["SRD", 229], ["D", 180]],
		type : "weapon (mace)",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "This magic weapon has 3 charges. While holding it, you can use an action and expend 1 charge to release a wave of terror. Each creature of your choice in a 30-foot radius extending from you must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. While it is frightened in this way, a creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action it can use only the Dash action or try to escape from an effect that prevents it from moving. If it has nowhere it can move, the creature can use the Dodge action. At the end of each of its turns, a creature can repeat the saving throw, ending the effect on itself on a success.\n   The mace regains 1d3 expended charges daily at dawn.",
		attunement : true,
		weight : 4
	},
	"mantle of spell resistance" : {
		name : "Mantle of Spell Resistance",
		source : [["SRD", 229], ["D", 180]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "You have advantage on saving throws against spells while you wear this cloak.",
		attunement : true
	},
	"manual of bodily health" : {
		name : "Manual of Bodily Health",
		source : [["SRD", 229], ["D", 180]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "This book contains health and diet tips, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Constitution score increases by 2, as does your maximum for that score. The manual then loses its magic, but regains it in a century.",
		weight : 5
	},
	"manual of gainful exercise" : {
		name : "Manual of Gainful Exercise",
		source : [["SRD", 229], ["D", 180]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "This book describes fitness exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Strength score increases by 2, as does your maximum for that score. The manual then loses its magic, but regains it in a century.",
		weight : 5
	},
	"manual of golems, clay" : {
		name : "Manual of Golems, Clay",
		source : [["SRD", 229], ["D", 180]],
		type : "wondrous item",
		rarity : "very rare",
		description : "",
		descriptionFull : "This tome contains information and incantations necessary to make a particular type of golem. The DM chooses the type or determines it randomly. To decipher and use the manual, you must be a spellcaster with at least two 5th-level spell slots. A creature that can't use a manual of golems and attempts to read it takes 6d6 psychic damage.\n   To create a clay golem, you must spend 30 days, working without interruption with the manual at hand and resting no more than 8 hours per day. You must also pay 65,000 gp to purchase supplies. Once you finish creating the golem, the book is consumed in eldritch flames. The golem becomes animate when the ashes of the manual are sprinkled on it. It is under your control, and it understands and obeys your spoken commands.",
		weight : 5
	},
	"manual of golems, flesh" : {
		name : "Manual of Golems, Flesh",
		source : [["SRD", 229], ["D", 180]],
		type : "wondrous item",
		rarity : "very rare",
		description : "",
		descriptionFull : "This tome contains information and incantations necessary to make a particular type of golem. The DM chooses the type or determines it randomly. To decipher and use the manual, you must be a spellcaster with at least two 5th-level spell slots. A creature that can't use a manual of golems and attempts to read it takes 6d6 psychic damage.\n   To create a flesh golem, you must spend 60 days, working without interruption with the manual at hand and resting no more than 8 hours per day. You must also pay 50,000 gp to purchase supplies. Once you finish creating the golem, the book is consumed in eldritch flames. The golem becomes animate when the ashes of the manual are sprinkled on it. It is under your control, and it understands and obeys your spoken commands.",
		weight : 5
	},
	"manual of golems, iron" : {
		name : "Manual of Golems, Iron",
		source : [["SRD", 229], ["D", 180]],
		type : "wondrous item",
		rarity : "very rare",
		description : "",
		descriptionFull : "This tome contains information and incantations necessary to make a particular type of golem. The DM chooses the type or determines it randomly. To decipher and use the manual, you must be a spellcaster with at least two 5th-level spell slots. A creature that can't use a manual of golems and attempts to read it takes 6d6 psychic damage.\n   To create an iron golem, you must spend 120 days, working without interruption with the manual at hand and resting no more than 8 hours per day. You must also pay 100,000 gp to purchase supplies. Once you finish creating the golem, the book is consumed in eldritch flames. The golem becomes animate when the ashes of the manual are sprinkled on it. It is under your control, and it understands and obeys your spoken commands.",
		weight : 5
	},
	"manual of golems, stone" : {
		name : "Manual of Golems, Stone",
		source : [["SRD", 229], ["D", 180]],
		type : "wondrous item",
		rarity : "very rare",
		description : "",
		descriptionFull : "This tome contains information and incantations necessary to make a particular type of golem. The DM chooses the type or determines it randomly. To decipher and use the manual, you must be a spellcaster with at least two 5th-level spell slots. A creature that can't use a manual of golems and attempts to read it takes 6d6 psychic damage.\n   To create a stone golem, you must spend 90 days, working without interruption with the manual at hand and resting no more than 8 hours per day. You must also pay 80,000 gp to purchase supplies. Once you finish creating the golem, the book is consumed in eldritch flames. The golem becomes animate when the ashes of the manual are sprinkled on it. It is under your control, and it understands and obeys your spoken commands.",
		weight : 5
	},
	"manual of quickness of action" : {
		name : "Manual of Quickness of Action",
		source : [["SRD", 230], ["D", 181]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "This book contains coordination and balance exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Dexterity score increases by 2, as does your maximum for that score. The manual then loses its magic, but regains it in a century.",
		weight : 5
	},
	"medallion of thoughts" : { // finished
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
	"mirror of life trapping" : {
		name : "Mirror of Life Trapping",
		source : [["SRD", 230], ["D", 181]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "When this 4-foot-tall mirror is viewed indirectly, its surface shows faint images of creatures. The mirror weighs 50 pounds, and it has AC 11, 10 hit points, and vulnerability to bludgeoning damage. It shatters and is destroyed when reduced to 0 hit points.\n   If the mirror is hanging on a vertical surface and you are within 5 feet of it, you can use an action to speak its command word and activate it. It remains activated until you use an action to speak the command word again.\n   Any creature other than you that sees its reflection in the activated mirror while within 30 feet of it must succeed on a DC 15 Charisma saving throw or be trapped, along with anything it is wearing or carrying, in one of the mirror's twelve extradimensional cells. This saving throw is made with advantage if the creature knows the mirror's nature, and constructs succeed on the saving throw automatically.\n   An extradimensional cell is an infinite expanse filled with thick fog that reduces visibility to 10 feet. Creatures trapped in the mirror's cells don't age, and they don't need to eat, drink, or sleep. A creature trapped within a cell can escape using magic that permits planar travel. Otherwise, the creature is confined to the cell until freed.\n   If the mirror traps a creature but its twelve extradimensional cells are already occupied, the mirror frees one trapped creature at random to accommodate the new prisoner. A freed creature appears in an unoccupied space within sight of the mirror but facing away from it. If the mirror is shattered, all creatures it contains are freed and appear in unoccupied spaces near it.\n   While within 5 feet of the mirror, you can use an action to speak the name of one creature trapped in it or call out a particular cell by number. The creature named or contained in the named cell appears as an image on the mirror's surface. You and the creature can then communicate normally.\n   In a similar way, you can use an action to speak a second command word and free one creature trapped in the mirror. The freed creature appears, along with its possessions, in the unoccupied space nearest to the mirror and facing away from it.",
		weight : 50
	},
	"necklace of adaptation" : {
		name : "Necklace of Adaptation",
		source : [["SRD", 231], ["D", 182]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : "While wearing this necklace, you can breathe normally in any environment, and you have advantage on saving throws made against harmful gases and vapors (such as Cloudkill and Stinking Cloud effects, inhaled poisons, and the breath weapons of some dragons).",
		attunement : true,
		weight : 1
	},
	"necklace of fireballs" : {
		name : "Necklace of Fireballs",
		source : [["SRD", 231], ["D", 182]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "C",
		description : "",
		descriptionFull : "This necklace has 1d6+3 beads hanging from it. You can use an action to detach a bead and throw it up to 60 feet away. When it reaches the end of its trajectory, the bead detonates as a 3rd-level Fireball spell (save DC 15).\n   You can hurl multiple beads, or even the whole necklace, as one action. When you do so, increase the level of the Fireball by 1 for each bead beyond the first.",
		weight : 1
	},
	"necklace of prayer beads" : {
		name : "Necklace of Prayer Beads",
		source : [["SRD", 231], ["D", 182]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "This necklace has 1d4+2 magic beads made from aquamarine, black pearl, or topaz. It also has many nonmagical beads made from stones such as amber, bloodstone, citrine, coral, jade, pearl, or quartz. If a magic bead is removed from the necklace, that bead loses its magic.\n   Six types of magic beads exist. The DM decides the type of each bead on the necklace or determines it randomly. A necklace can have more than one bead of the same type. To use one, you must be wearing the necklace. Each bead contains a spell that you can cast from it as a bonus action (using your spell save DC if a save is necessary). Once a magic bead's spell is cast, that bead can't be used again until the next dawn.\n\n" + toUni("d20") + "\t" + toUni("Bead of ...") + "\t" + toUni("Spell") + "\n1-6\tBlessing\tBless\n7-12\tCuring\tCure Wounds (2nd level) or Lesser Restoration\n13-16\tFavor\tGreater Restoration\n17-18\tSmiting\tBranding Smite\n19\tSummons\tPlanar Ally\n20\tWind walking\tWind Walk",
		attunement : true,
		weight : 1
	},
	"nolzur's marvelous pigments" : {
		name : "Nolzur's Marvelous Pigments",
		source : [["SRD", 230], ["D", 183]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "D",
		description : "",
		descriptionFull : "Typically found in 1d4 pots inside a fine wooden box with a brush (weighing 1 pound in total), these pigments allow you to create three-dimensional objects by painting them in two dimensions. The paint flows from the brush to form the desired object as you concentrate on its image.\n   Each pot of paint is sufficient to cover 1,000 square feet of a surface, which lets you create inanimate objects or terrain features\u2014such as a door, a pit, flowers, trees, cells, rooms, or weapons\u2014that are up to 10,000 cubic feet. It takes 10 minutes to cover 100 square feet.\n   When you complete the painting, the object or terrain feature depicted becomes a real, nonmagical object. Thus, painting a door on a wall creates an actual door that can be opened to whatever is beyond. Painting a pit on a floor creates a real pit, and its depth counts against the total area of objects you create.\n   Nothing created by the pigments can have a value greater than 25 gp. If you paint an object of greater value (such as a diamond or a pile of gold), the object looks authentic, but close inspection reveals it is made from paste, bone, or some other worthless material.\n   If you paint a form of energy such as fire or lightning, the energy appears but dissipates as soon as you complete the painting, doing no harm to anything.",
		weight : 1
	},
	"nine lives stealer" : { // finished
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
				'If I include the words "Nine Lives Stealer" in the name of a sword, it will be treated as the magic weapon Nine Lives Stealer. It has +2 to hit and damage. Also, as long as it has charges left, when it does a critical hit against a creature with fewer than 100 HP, that creature must make a DC 15 Constitution saving throw or die.'
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
	oathbow : {
		name : "Oathbow",
		source : [["SRD", 231], ["D", 183]],
		type : "weapon (longbow)",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : 'When you nock an arrow on this bow, it whispers in Elvish, "Swift defeat to my enemies." When you use this weapon to make a ranged attack, you can, as a command phrase, say, "Swift death to you who have wronged me." The target of your attack becomes your sworn enemy until it dies or until dawn seven days later. You can have only one such sworn enemy at a time. When your sworn enemy dies, you can choose a new one after the next dawn.\n   When you make a ranged attack roll with this weapon against your sworn enemy, you have advantage on the roll. In addition, your target gains no benefit from cover, other than total cover, and you suffer no disadvantage due to long range. If the attack hits, your sworn enemy takes an extra 3d6 piercing damage.\n   While your sworn enemy lives, you have disadvantage on attack rolls with all other weapons.',
		attunement : true,
		weight : 2
	},
	"oil of etherealness" : { // with contributions by AelarTheElfRogue
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
	"oil of slipperiness" : { // with contributions by AelarTheElfRogue
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
	"pearl of power" : { // with contributions by AelarTheElfRogue
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
	"philter of love" : { // finished
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
	"plate armor of etherealness" : {
		name : "Plate Armor of Etherealness",
		source : [["SRD", 233], ["D", 185]],
		type : "armor (plate)",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "While you're wearing this armor, you can speak its command word as an action to gain the effect of the Etherealness spell, which lasts for 10 minutes or until you remove the armor or use an action to speak the command word again. This property of the armor can't be used again until the next dawn.",
		attunement : true,
		weight : 65
	},
	"portable hole" : {
		name : "Portable Hole",
		source : [["SRD", 233], ["D", 185]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "D",
		description : "",
		descriptionFull : "This fine black cloth, soft as silk, is folded up to the dimensions of a handkerchief. It unfolds into a circular sheet 6 feet in diameter.\n   You can use an action to unfold a portable hole and place it on or against a solid surface, whereupon the portable hole creates an extradimensional hole 10 feet deep. The cylindrical space within the hole exists on a different plane, so it can't be used to create open passages. Any creature inside an open portable hole can exit the hole by climbing out of it.\n   You can use an action to close a portable hole by taking hold of the edges of the cloth and folding it up. Folding the cloth closes the hole, and any creatures or objects within remain in the extradimensional space. No matter what's in it, the hole weighs next to nothing.\n   If the hole is folded up, a creature within the hole's extradimensional space can use an action to make a DC 10 Strength check. On a successful check, the creature forces its way out and appears within 5 feet of the portable hole or the creature carrying it. A breathing creature within a closed portable hole can survive for up to 10 minutes, after which time it begins to suffocate.\n   Placing a portable hole inside an extradimensional space created by a bag of holding, Heward's handy haversack, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened."
	},
	"potion of animal friendship" : {
		name : "Potion of Animal Friendship",
		source : [["SRD", 233], ["D", 187]],
		type : "potion",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "",
		descriptionFull : "When you drink this potion, you can cast the Animal Friendship spell (save DC 13) for 1 hour at will. Agitating this muddy liquid brings little bits into view: a fish scale, a hummingbird tongue, a cat claw, or a squirrel hair.",
		weight : 0.5
	},
	"potion of clairvoyance" : {
		name : "Potion of Clairvoyance",
		source : [["SRD", 233], ["D", 187]],
		type : "potion",
		rarity : "rare",
		magicItemTable : "C",
		description : "",
		descriptionFull : "When you drink this potion, you gain the effect of the Clairvoyance spell. An eyeball bobs in this yellowish liquid but vanishes when the potion is opened.",
		weight : 0.5
	},
	"potion of climbing" : {
		name : "Potion of Climbing",
		source : [["SRD", 233], ["D", 187]],
		type : "potion",
		rarity : "common",
		magicItemTable : "A",
		description : "",
		descriptionFull : "When you drink this potion, you gain a climbing speed equal to your walking speed for 1 hour. During this time, you have advantage on Strength (Athletics) checks you make to climb. The potion is separated into brown, silver, and gray layers resembling bands of stone. Shaking the bottle fails to mix the colors.",
		weight : 0.5
	},
	"potion of diminution" : {
		name : "Potion of Diminution",
		source : [["SRD", 233], ["D", 187]],
		type : "potion",
		rarity : "rare",
		magicItemTable : "C",
		description : "",
		descriptionFull : "When you drink this potion, you gain the \"reduce\" effect of the Enlarge/Reduce spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously contracts to a tiny bead and then expands to color the clear liquid around it. Shaking the bottle fails to interrupt this process.",
		weight : 0.5
	},
	"potion of flying" : {
		name : "Potion of Flying",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "very rare",
		magicItemTable : "D",
		description : "",
		descriptionFull : "When you drink this potion, you gain a flying speed equal to your walking speed for 1 hour and can hover. If you're in the air when the potion wears off, you fall unless you have some other means of staying aloft. This potion's clear liquid floats at the top of its container and has cloudy white impurities drifting in it.",
		weight : 0.5
	},
	"potion of gaseous form" : {
		name : "Potion of Gaseous Form",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "rare",
		magicItemTable : "C",
		description : "",
		descriptionFull : "When you drink this potion, you gain the effect of the Gaseous Form spell for 1 hour (no concentration required) or until you end the effect as a bonus action. This potion's container seems to hold fog that moves and pours like water.",
		weight : 0.5
	},
	"potion of giant strength, cloud" : {
		name : "Potion of Giant Strength, Cloud",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "very rare",
		description : "",
		descriptionFull : "When you drink this potion, your Strength score changes to 27 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score.\n   This potion's transparent liquid has floating in it a sliver of fingernail from a cloud giant.",
		weight : 0.5
	},
	"potion of giant strength, fire" : {
		name : "Potion of Giant Strength, Fire",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "rare",
		description : "",
		descriptionFull : "When you drink this potion, your Strength score changes to 25 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score.\n   This potion's transparent liquid has floating in it a sliver of fingernail from a fire giant.",
		weight : 0.5
	},
	"potion of giant strength, frost" : {
		name : "Potion of Giant Strength, Frost",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "rare",
		magicItemTable : "C",
		description : "",
		descriptionFull : "When you drink this potion, your Strength score changes to 23 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score.\n   This potion's transparent liquid has floating in it a sliver of fingernail from a frost giant.",
		weight : 0.5
	},
	"potion of giant strength, hill" : {
		name : "Potion of Giant Strength, Hill",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "uncommon",
		description : "",
		descriptionFull : "When you drink this potion, your Strength score changes to 21 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score.\n   This potion's transparent liquid has floating in it a sliver of fingernail from a hill giant.",
		weight : 0.5
	},
	"potion of giant strength, stone" : {
		name : "Potion of Giant Strength, Stone",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "rare",
		description : "",
		descriptionFull : "When you drink this potion, your Strength score changes to 23 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score.\n   This potion's transparent liquid has floating in it a sliver of fingernail from a stone giant.",
		weight : 0.5
	},
	"potion of giant strength, storm" : {
		name : "Potion of Giant Strength, Storm",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "legendary",
		description : "",
		descriptionFull : "When you drink this potion, your Strength score changes to 29 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score.\n   This potion's transparent liquid has floating in it a sliver of fingernail from a storm giant.",
		weight : 0.5
	},
	"potion of growth" : {
		name : "Potion of Growth",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "",
		descriptionFull : "When you drink this potion, you gain the \"enlarge\" effect of the Enlarge/Reduce spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously expands from a tiny bead to color the clear liquid around it and then contracts. Shaking the bottle fails to interrupt this process.",
		weight : 0.5
	},
	"potion of healing" : {
		name : "Potion of Healing",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "common",
		magicItemTable : "A",
		description : "",
		descriptionFull : "You regain 2d4+2 hit points when you drink this potion. The potion's red liquid glimmers when agitated.",
		weight : 0.5
	},
	"potion of greater healing" : {
		name : "Potion of Greater Healing",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "uncommon",
		description : "",
		descriptionFull : "You regain 4d4+4 hit points when you drink this potion. The potion's red liquid glimmers when agitated.",
		weight : 0.5,
		magicItemTable : ["A", "B"]
	},
	"potion of superior healing" : {
		name : "Potion of Superior Healing",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "rare",
		magicItemTable : "C",
		description : "",
		descriptionFull : "You regain 8d4+8 hit points when you drink this potion. The potion's red liquid glimmers when agitated.",
		weight : 0.5
	},
	"potion of supreme healing" : {
		name : "Potion of Supreme Healing",
		source : [["SRD", 234], ["D", 187]],
		type : "potion",
		rarity : "very rare",
		description : "",
		descriptionFull : "You regain 10d4+20 hit points when you drink this potion. The potion's red liquid glimmers when agitated.",
		weight : 0.5,
		magicItemTable : ["D", "E"]
	},
	"potion of heroism" : {
		name : "Potion of Heroism",
		source : [["SRD", 234], ["D", 188]],
		type : "potion",
		rarity : "rare",
		magicItemTable : "C",
		description : "",
		descriptionFull : "For 1 hour after drinking it, you gain 10 temporary hit points that last for 1 hour. For the same duration, you are under the effect of the Bless spell (no concentration required). This blue potion bubbles and steams as if boiling.",
		weight : 0.5
	},
	"potion of invisibility" : {
		name : "Potion of Invisibility",
		source : [["SRD", 234], ["D", 188]],
		type : "potion",
		rarity : "very rare",
		magicItemTable : "D",
		description : "",
		descriptionFull : "This potion's container looks empty but feels as though it holds liquid. When you drink it, you become invisible for 1 hour. Anything you wear or carry is invisible with you. The effect ends early if you attack or cast a spell.",
		weight : 0.5
	},
	"potion of mind reading" : {
		name : "Potion of Mind Reading",
		source : [["SRD", 234], ["D", 188]],
		type : "potion",
		rarity : "rare",
		magicItemTable : "C",
		description : "",
		descriptionFull : "When you drink this potion, you gain the effect of the Detect Thoughts spell (save DC 13). The potion's dense, purple liquid has an ovoid cloud of pink floating in it.",
		weight : 0.5
	},
	"potion of poison" : {
		name : "Potion of Poison",
		source : [["SRD", 234], ["D", 188]],
		type : "potion",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "",
		descriptionFull : "This concoction looks, smells, and tastes like a potion of healing or other beneficial potion. However, it is actually poison masked by illusion magic. An Identify spell reveals its true nature.\n   If you drink it, you take 3d6 poison damage, and you must succeed on a DC 13 Constitution saving throw or be poisoned. At the start of each of your turns while you are poisoned in this way, you take 3d6 poison damage. At the end of each of your turns, you can repeat the saving throw. On a successful save, the poison damage you take on your subsequent turns decreases by 1d6. The poison ends when the damage decreases to 0.",
		weight : 0.5
	},
	"potion of resistance, acid" : {
		name : "Potion of Resistance, Acid",
		source : [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity : "uncommon",
		description : "",
		descriptionFull : "",
		weight : 0.5
	},
	"potion of resistance, cold" : {
		name : "Potion of Resistance, Cold",
		source : [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity : "uncommon",
		description : "",
		descriptionFull : "",
		weight : 0.5
	},
	"potion of resistance, fire" : {
		name : "Potion of Resistance, Fire",
		source : [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity : "uncommon",
		description : "",
		descriptionFull : "",
		weight : 0.5
	},
	"potion of resistance, force" : {
		name : "Potion of Resistance, Force",
		source : [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity : "uncommon",
		description : "",
		descriptionFull : "",
		weight : 0.5
	},
	"potion of resistance, lightning" : {
		name : "Potion of Resistance, Lightning",
		source : [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity : "uncommon",
		description : "",
		descriptionFull : "",
		weight : 0.5
	},
	"potion of resistance, necrotic" : {
		name : "Potion of Resistance, Necrotic",
		source : [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity : "uncommon",
		description : "",
		descriptionFull : "",
		weight : 0.5
	},
	"potion of resistance, poison" : {
		name : "Potion of Resistance, Poison",
		source : [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity : "uncommon",
		description : "",
		descriptionFull : "",
		weight : 0.5
	},
	"potion of resistance, psychic" : {
		name : "Potion of Resistance, Psychic",
		source : [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity : "uncommon",
		description : "",
		descriptionFull : "",
		weight : 0.5
	},
	"potion of resistance, radiant" : {
		name : "Potion of Resistance, Radiant",
		source : [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity : "uncommon",
		description : "",
		descriptionFull : "",
		weight : 0.5
	},
	"potion of resistance, thunder" : {
		name : "Potion of Resistance, Thunder",
		source : [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity : "uncommon",
		description : "",
		descriptionFull : "",
		weight : 0.5
	},
	"potion of speed" : { // finished
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
		description : "",
		descriptionFull : "You can breathe underwater for 1 hour after drinking this potion. Its cloudy green fluid smells of the sea and has a jellyfish-like bubble floating in it.",
		weight : 0.5
	},
	"quaal's feather token, anchor" : {
		name : "Quaal's Feather Token, Anchor",
		source : [["SRD", 221], ["D", 188]],
		type : "wondrous item",
		rarity : "rare",
		description : "",
		descriptionFull : "This tiny object looks like a feather.\n   " + toUni("Anchor") + ". You can use an action to touch the token to a boat or ship. For the next 24 hours, the vessel can't be moved by any means. Touching the token to the vessel again ends the effect. When the effect ends, the token disappears."
	},
	"quaal's feather token, bird" : {
		name : "Quaal's Feather Token, Bird",
		source : [["SRD", 221], ["D", 188]],
		type : "wondrous item",
		rarity : "rare",
		description : "",
		descriptionFull : "This tiny object looks like a feather.\n   " + toUni("Bird") + ". You can use an action to toss the token 5 feet into the air. The token disappears and an enormous, multicolored bird takes its place. The bird has the statistics of a roc, but it obeys your simple commands and can't attack. It can carry up to 500 pounds while flying at its maximum speed (16 miles an hour for a maximum of 144 miles per day. with a one-hour rest for every 3 hours of flying), or 1,000 pounds at half that speed. The bird disappears after flying its maximum distance for a day or if it drops to 0 hit points. You can dismiss the bird as an action."
	},
	"quaal's feather token, fan" : {
		name : "Quaal's Feather Token, Fan",
		source : [["SRD", 221], ["D", 188]],
		type : "wondrous item",
		rarity : "rare",
		description : "",
		descriptionFull : "This tiny object looks like a feather.\n   " + toUni("Fan") + ". If you are on a boat or ship, you can use an action to toss the token up to 10 feet in the air. The token disappears, and a giant flapping fan takes its place. The fan floats and creates a wind strong enough to fill the sails of one ship, increasing its speed by 5 miles per hour for 8 hours. You can dismiss the fan as an action."
	},
	"quaal's feather token, swan boat" : {
		name : "Quaal's Feather Token, Swan Boat",
		source : [["SRD", 221], ["D", 188]],
		type : "wondrous item",
		rarity : "rare",
		description : "",
		descriptionFull : "This tiny object looks like a feather.\n   " + toUni("Swan Boat") + ". You can use an action to touch the token to a body of water at least 60 feet in diameter. The token disappears, and a 50-foot-long, 20-foot-wide boat shaped like a swan takes its place. The boat is self-propelled and moves across water at a speed of 6 miles per hour. You can use an action while on the boat to command it to move or to turn up to 90 degrees. The boat can carry up to thirty-two Medium or smaller creatures. A Large creature counts as four Medium creatures, while a Huge creature counts as nine. The boat remains for 24 hours and then disappears. You can dismiss the boat as an action."
	},
	"quaal's feather token, tree" : {
		name : "Quaal's Feather Token, Tree",
		source : [["SRD", 221], ["D", 188]],
		type : "wondrous item",
		rarity : "rare",
		description : "",
		descriptionFull : "This tiny object looks like a feather.\n   " + toUni("Tree") + ". You must be outdoors to use this token. You can use an action to touch it to an unoccupied space on the ground. The token disappears, and in its place a nonmagical oak tree springs into existence. The tree is 60 feet tall and has a 5-foot-diameter trunk, and its branches at the top spread out in a 20-foot radius."
	},
	"quaal's feather token, whip" : {
		name : "Quaal's Feather Token, Whip",
		source : [["SRD", 221], ["D", 188]],
		type : "wondrous item",
		rarity : "rare",
		description : "",
		descriptionFull : "This tiny object looks like a feather.\n   " + toUni("Whip") + ". You can use an action to throw the token to a point within 10 feet of you. The token disappears, and a floating whip takes its place. You can then use a bonus action to make a melee spell attack against a creature within 10 feet of the whip, with an attack bonus of +9. On a hit, the target takes 1d6+5 force damage.\n   As a bonus action on your turn, you can direct the whip to fly up to 20 feet and repeat the attack against a creature within 10 feet of it. The whip disappears after 1 hour, when you use an action to dismiss it, or when you are incapacitated or die."
	},
	"quiver of ehlonna" : { // finished
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
		description : "",
		descriptionFull : "This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing the ring, you can use an action to expend 1 of its charges to cast one of the following spells:\n \u2022 Animal Friendship (save DC 13)\n \u2022 Fear (save DC 13), targeting only beasts that have an Intelligence of 3 or lower\n \u2022 Speak with Animals"
	},
	"ring of djinni summoning" : {
		name : "Ring of Djinni Summoning",
		source : [["SRD", 235], ["D", 190]],
		type : "ring",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "While wearing this ring, you can speak its command word as an action to summon a particular djinni from the Elemental Plane of Air. The djinni appears in an unoccupied space you choose within 120 feet of you. It remains as long as you concentrate (as if concentrating on a spell), to a maximum of 1 hour, or until it drops to 0 hit points. It then returns to its home plane.\n   While summoned, the djinni is friendly to you and your companions. It obeys any commands you give it, no matter what language you use. If you fail to command it, the djinni defends itself against attackers but takes no other actions.\n   After the djinni departs, it can't be summoned again for 24 hours, and the ring becomes nonmagical if the djinni dies.",
		attunement : true
	},
	"ring of elemental command, air" : {
		name : "Ring of Elemental Command, Air",
		source : [["SRD", 235], ["D", 190]],
		type : "ring",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "While wearing this ring, you have advantage on attack rolls against elementals from the Elemental Plane of Air, and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the Elemental Plane of Air.\n   The ring has 5 charges. It regains 1d4+1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n   You can expend 2 of the ring's charges to cast Dominate Monster on an air elemental. In addition, when you fall, you descend 60 feet per round and take no damage from falling. You can also speak and understand Auran.\n   If you help slay an air elemental while attuned to the ring, you gain access to the following additional properties:\n \u2022 You have resistance to lightning damage.\n \u2022 You have a flying speed equal to your walking speed and can hover.\n \u2022 You can cast the following spells from the ring, expending the necessary number of charges: Chain Lightning (3 charges), Gust of Wind (2 charges), or Wind Wall (1 charge).",
		attunement : true
	},
	"ring of elemental command, earth" : {
		name : "Ring of Elemental Command, Earth",
		source : [["SRD", 235], ["D", 190]],
		type : "ring",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "While wearing this ring, you have advantage on attack rolls against elementals from the Elemental Plane of Earth and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the Elemental Plane of Earth.\n   The ring has 5 charges. It regains 1d4+1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n   You can expend 2 of the ring's charges to cast Dominate Monster on an earth elemental. In addition, you can move in difficult terrain that is composed of rubble, rocks, or dirt as if it were normal terrain. You can also speak and understand Terran.\n   If you help slay an earth elemental while attuned to the ring, you gain access to the following additional properties:\n \u2022 You have resistance to acid damage.\n \u2022 You can move through solid earth or rock as if those areas were difficult terrain. If you end your turn there, you are shunted out to the nearest unoccupied space you last occupied.\n \u2022 You can cast the following spells from the ring, expending the necessary number of charges: Stone Shape (2 charges), Stoneskin (3 charges), or Wall of Stone (3 charges).",
		attunement : true
	},
	"ring of elemental command, fire" : {
		name : "Ring of Elemental Command, Fire",
		source : [["SRD", 236], ["D", 190]],
		type : "ring",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "While wearing this ring, you have advantage on attack rolls against elementals from the Elemental Plane of Fire and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the Elemental Plane of Fire.\n   The ring has 5 charges. It regains 1d4+1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n   You can expend 2 of the ring's charges to cast Dominate Monster on a fire elemental. In addition, you have resistance to fire damage. You can also speak and understand Ignan.\n   If you help slay a fire elemental while attuned to the ring, you gain access to the following additional properties:\n \u2022 You are immune to fire damage.\n \u2022 You can cast the following spells from the ring, expending the necessary number of charges: Burning Hands (1 charge), Fireball (2 charges), and Wall of Fire (3 charges).",
		attunement : true
	},
	"ring of elemental command, water" : {
		name : "Ring of Elemental Command, Water",
		source : [["SRD", 236], ["D", 190]],
		type : "ring",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "While wearing this ring, you have advantage on attack rolls against elementals from the Elemental Plane of Water and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the Elemental Plane of Water.\n   The ring has 5 charges. It regains 1d4+1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n   You can expend 2 of the ring's charges to cast Dominate Monster on a water elemental. In addition, you can stand on and walk across liquid surfaces as if they were solid ground. You can also speak and understand Aquan.\n   If you help slay a water elemental while attuned to the ring, you gain access to the following additional properties:\n \u2022 You can breathe underwater and have a swimming speed equal to your walking speed.\n \u2022 You can cast the following spells from the ring, expending the necessary number of charges: Create or Destroy Water} (1 charge), Control Water (3 charges), Ice Storm (2 charges), or Wall of Ice (3 charges).",
		attunement : true
	},
	"ring of evasion" : {
		name : "Ring of Evasion",
		source : [["SRD", 236], ["D", 191]],
		type : "ring",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. When you fail a Dexterity saving throw while wearing it, you can use your reaction to expend 1 of its charges to succeed on that saving throw instead.",
		attunement : true
	},
	"ring of feather falling" : {
		name : "Ring of Feather Falling",
		source : [["SRD", 236], ["D", 191]],
		type : "ring",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "When you fall while wearing this ring, you descend 60 feet per round and take no damage from falling.",
		attunement : true
	},
	"ring of free action" : { // finished
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
	"ring of invisibility" : {
		name : "Ring of Invisibility",
		source : [["SRD", 236], ["D", 191]],
		type : "ring",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "While wearing this ring, you can turn invisible as an action. Anything you are wearing or carrying is invisible with you. You remain invisible until the ring is removed, until you attack or cast a spell, or until you use a bonus action to become visible again.",
		attunement : true
	},
	"ring of jumping" : { // finished
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
	"ring of mind shielding" : { // finished
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
	"ring of protection" : { // finished
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
	"ring of regeneration" : {
		name : "Ring of Regeneration",
		source : [["SRD", 237], ["D", 191]],
		type : "ring",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "While wearing this ring, you regain 1d6 hit points every 10 minutes, provided that you have at least 1 hit point. If you lose a body part, the ring causes the missing part to regrow and return to full functionality after 1d6+1 days if you have at least 1 hit point the whole time.",
		attunement : true
	},
	"ring of resistance, acid" : {
		name : "Ring of Resistance, Acid",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "rare",
		description : "",
		descriptionFull : "",
		attunement : true
	},
	"ring of resistance, cold" : {
		name : "Ring of Resistance, Cold",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "rare",
		description : "",
		descriptionFull : "",
		attunement : true
	},
	"ring of resistance, fire" : {
		name : "Ring of Resistance, Fire",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "rare",
		description : "",
		descriptionFull : "",
		attunement : true
	},
	"ring of resistance, force" : {
		name : "Ring of Resistance, Force",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "rare",
		description : "",
		descriptionFull : "",
		attunement : true
	},
	"ring of resistance, lightning" : {
		name : "Ring of Resistance, Lightning",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "rare",
		description : "",
		descriptionFull : "",
		attunement : true
	},
	"ring of resistance, necrotic" : {
		name : "Ring of Resistance, Necrotic",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "rare",
		description : "",
		descriptionFull : "",
		attunement : true
	},
	"ring of resistance, poison" : {
		name : "Ring of Resistance, Poison",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "rare",
		description : "",
		descriptionFull : "",
		attunement : true
	},
	"ring of resistance, psychic" : {
		name : "Ring of Resistance, Psychic",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "rare",
		description : "",
		descriptionFull : "",
		attunement : true
	},
	"ring of resistance, radiant" : {
		name : "Ring of Resistance, Radiant",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "rare",
		description : "",
		descriptionFull : "",
		attunement : true
	},
	"ring of resistance, thunder" : {
		name : "Ring of Resistance, Thunder",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "rare",
		description : "",
		descriptionFull : "",
		attunement : true
	},
	"ring of shooting stars" : {
		name : "Ring of Shooting Stars",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "While wearing this ring in dim light or darkness, you can cast Dancing Lights and Light from the ring at will. Casting either spell from the ring requires an action.\n   The ring has 6 charges for the following other properties. The ring regains 1d6 expended charges daily at dawn.\n   " + toUni("Faerie Fire") + ". You can expend 1 charge as an action to cast Faerie Fire from the ring.\n   " + toUni("Ball Lightning") + ". You can expend 2 charges as an action to create one to four 3-foot-diameter spheres of lightning. The more spheres you create, the less powerful each sphere is individually.\n   Each sphere appears in an unoccupied space you can see within 120 feet of you. The spheres last as long as you concentrate (as if concentrating on a spell), up to 1 minute. Each sphere sheds dim light in a 30-foot radius.\n   As a bonus action, you can move each sphere up to 30 feet, but no farther than 120 feet away from you. When a creature other than you comes within 5 feet of a sphere, the sphere discharges lightning at that creature and disappears. That creature must make a DC 15 Dexterity saving throw. On a failed save, the creature takes lightning damage based on the number of spheres you created. (4 spheres = 2d4, 3 spheres = 2d6, 2 spheres = 5d4, 1 sphere = 4d12)\n   " + toUni("Shooting Stars") + ". \n   You can expend 1 to 3 charges as an action. For every charge you expend, you launch a glowing mote of light from the ring at a point you can see within 60 feet of you. Each creature within a 15-foot cube originating from that point is showered in sparks and must make a DC 15 Dexterity saving throw. taking 5d4 fire damage on a failed save, or half as much damage on a successful one.",
		attunement : true
	},
	"ring of spell storing" : {
		name : "Ring of Spell Storing",
		source : [["SRD", 237], ["D", 192]],
		type : "ring",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "This ring stores spells cast into it, holding them until the attuned wearer uses them. The ring can store up to 5 levels worth of spells at a time. When found, it contains 1d6-1 levels of stored spells chosen by the DM.\n   Any creature can cast a spell of 1st through 5th level into the ring by touching the ring as the spell is cast. The spell has no effect, other than to be stored in the ring. If the ring can't hold the spell, the spell is expended without effect. The level of the slot used to cast the spell determines how much space it uses.\n   While wearing this ring, you can cast any spell stored in it. The spell uses the slot level, spell save DC, spell attack bonus, and spellcasting ability of the original caster, but is otherwise treated as if you cast the spell. The spell cast from the ring is no longer stored in it, freeing up space.",
		attunement : true
	},
	"ring of spell turning" : {
		name : "Ring of Spell Turning",
		source : [["SRD", 237], ["D", 193]],
		type : "ring",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "While wearing this ring, you have advantage on saving throws against any spell that targets only you (not in an area of effect). In addition, if you roll a 20 for the save and the spell is 7th level or lower, the spell has no effect on you and instead targets the caster, using the slot level, spell save DC, attack bonus, and spellcasting ability of the caster.",
		attunement : true
	},
	"ring of swimming" : { // finished
		name : "Ring of Swimming",
		source : [["SRD", 238], ["D", 193]],
		type : "ring",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "I have a swimming speed of 40 feet while wearing this ring.",
		descriptionFull : "You have a swimming speed of 40 feet while wearing this ring.",
		speed : { swim : { spd : "fixed40", enc : "fixed30" } }
	},
	"ring of telekinesis" : {
		name : "Ring of Telekinesis",
		source : [["SRD", 238], ["D", 193]],
		type : "ring",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "While wearing this ring, you can cast the Telekinesis spell at will, but you can target only objects that aren't being worn or carried.",
		attunement : true
	},
	"ring of the ram" : { // finished
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
	"ring of three wishes" : {
		name : "Ring of Three Wishes",
		source : [["SRD", 238], ["D", 193]],
		type : "ring",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "While wearing this ring, you can use an action to expend 1 of its 3 charges to cast the Wish spell from it. The ring becomes nonmagical when you use the last charge."
	},
	"ring of warmth" : {
		name : "Ring of Warmth",
		source : [["SRD", 238], ["D", 193]],
		type : "ring",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : "While wearing this ring, you have resistance to cold damage. In addition, you and everything you wear and carry are unharmed by temperatures as low as -50 degrees Fahrenheit.",
		attunement : true
	},
	"ring of water walking" : { // finished
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
		description : "",
		descriptionFull : "While wearing this ring, you can use an action to speak its command word. When you do so, you can see into and through solid matter for 1 minute. This vision has a radius of 30 feet. To you, solid objects within that radius appear transparent and don't prevent light from passing through them. The vision can penetrate 1 foot of stone, 1 inch of common metal, or up to 3 feet of wood or dirt. Thicker substances block the vision, as does a thin sheet of lead.\n   Whenever you use the ring again before taking a long rest, you must succeed on a DC 15 Constitution saving throw or gain one level of exhaustion.",
		attunement : true
	},
	"robe of eyes" : {
		name : "Robe of Eyes",
		source : [["SRD", 238], ["D", 193]],
		type : "wondrous item",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "This robe is adorned with eyelike patterns. While you wear the robe, you gain the following benefits:\n \u2022 The robe lets you see in all directions, and you have advantage on Wisdom (Perception) checks that rely on sight.\n \u2022 You have darkvision out to a range of 120 feet.\n \u2022 You can see invisible creatures and objects, as well as see into the Ethereal Plane, out to a range of 120 feet.\n\nThe eyes on the robe can't be closed or averted. Although you can close or avert your own eyes, you are never considered to be doing so while wearing this robe.\n   A Light spell cast on the robe or a Daylight spell cast within 5 feet of the robe causes you to be blinded for 1 minute. At the end of each of your turns, you can make a Constitution saving throw (DC 11 for Light or DC 15 for Daylight), ending the blindness on a success.",
		attunement : true,
		weight : 4
	},
	"robe of scintillating colors" : {
		name : "Robe of Scintillating Colors",
		source : [["SRD", 238], ["D", 194]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "This robe has 3 charges, and it regains 1d3 expended charges daily at dawn. While you wear it, you can use an action and expend 1 charge to cause the garment to display a shifting pattern of dazzling hues until the end of your next turn. During this time, the robe sheds bright light in a 30-foot radius and dim light for an additional 30 feet. Creatures that can see you have disadvantage on attack rolls against you. In addition, any creature in the bright light that can see you when the robe's power is activated must succeed on a DC 15 Wisdom saving throw or become stunned until the effect ends.",
		attunement : true,
		weight : 4
	},
	"robe of stars" : {
		name : "Robe of Stars",
		source : [["SRD", 239], ["D", 194]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "This black or dark blue robe is embroidered with small white or silver stars. You gain a +1 bonus to saving throws while you wear it.\n   Six stars, located on the robe's upper front portion, are particularly large. While wearing this robe, you can use an action to pull off one of the stars and use it to cast Magic Missile as a 5th-level spell. Daily at dusk, 1d6 removed stars reappear on the robe.\n   While you wear the robe, you can use an action to enter the Astral Plane along with everything you are wearing and carrying. You remain there until you use an action to return to the plane you were on. You reappear in the last space you occupied, or if that space is occupied, the nearest unoccupied space.",
		attunement : true,
		weight : 4
	},
	"robe of the archmagi" : {
		name : "Robe of the Archmagi",
		source : [["SRD", 239], ["D", 194]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "This elegant garment is made from exquisite cloth of white, gray, or black and adorned with silvery runes. The robe's color corresponds to the alignment for which the item was created. A white robe was made for good, gray for neutral, and black for evil. You can't attune to a robe of the archmagi that doesn't correspond to your alignment.\n   You gain these benefits while wearing the robe:\n \u2022 If you aren't wearing armor, your base Armor Class is 15 + your Dexterity modifier.\n \u2022 You have advantage on saving throws against spell and other magical effects.\n \u2022 Your spell save DC and spell attack bonus each increase by 2.",
		attunement : true,
		weight : 4
	},
	"robe of useful items" : { // finished
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
		description : "",
		descriptionFull : "While holding this rod, you can use your reaction to absorb a spell that is targeting only you and not with an area of effect. The absorbed spell's effect is canceled, and the spell's energy\u2014not the spell itself\u2014is stored in the rod. The energy has the same level as the spell when it was cast. The rod can absorb and store up to 50 levels of energy over the course of its existence. Once the rod absorbs 50 levels of energy, it can't absorb more. If you are targeted by a spell that the rod can't store, the rod has no effect on that spell.\n   When you become attuned to the rod, you know how many levels of energy the rod has absorbed over the course of its existence, and how many levels of spell energy it currently has stored.\n   If you are a spellcaster holding the rod, you can convert energy stored in it into spell slots to cast spells you have prepared or know. You can create spell slots only of a level equal to or lower than your own spell slots, up to a maximum of 5th level. You use the stored levels in place of your slots, but otherwise cast the spell as normal. For example, you can use 3 levels stored in the rod as a 3rd-level spell slot.\n   A newly found rod has 1d10 levels of spell energy stored in it already. A rod that can no longer absorb spell energy and has no energy remaining becomes nonmagical.",
		attunement : true,
		weight : 2
	},
	"rod of alertness" : {
		name : "Rod of Alertness",
		source : [["SRD", 240], ["D", 196]],
		type : "rod",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "This rod has a flanged head and the following properties.\n   " + toUni("Alertness") + ". While holding the rod, you have advantage on Wisdom (Perception) checks and on rolls for initiative.\n   " + toUni("Spells") + ". While holding the rod, you can use an action to cast one of the following spells from it: Detect Evil and Good, Detect Magic, Detect Poison and Disease, or See Invisibility.\n   " + toUni("Protective Aura") + ". As an action, you can plant the haft end of the rod in the ground, whereupon the rod's head sheds bright light in a 60-foot radius and dim light for an additional 60 feet. While in that bright light, you and any creature that is friendly to you gain a +1 bonus to AC and saving throws and can sense the location of any invisible hostile creature that is also in the bright light.\n   The rod's head stops glowing and the effect ends after 10 minutes, or when a creature uses an action to pull the rod from the ground. This property can't be used again until the next dawn.",
		attunement : true,
		weight : 2
	},
	"rod of lordly might" : {
		name : "Rod of Lordly Might",
		source : [["SRD", 240], ["D", 196]],
		type : "rod",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "This rod has a flanged head, and it functions as a magic mace that grants a +3 bonus to attack and damage roll made with it. The rod has properties associated with six different buttons that are set in a row along the haft. It has three other properties as well, detailed below.\n   " + toUni("Six Buttons") + ". You can press one of the rod's six buttons as a bonus action. A button's effect lasts until you push a different button or until you push the same button again, which causes the rod to revert to its normal form.\n   If you press button 1, the rod becomes a flame tongue as a fiery blade sprouts from the end opposite the rod's flanged head (you choose the type of sword).\n   If you press button 2, the rod's flanged head folds down and two crescent-shaped blades spring out, transforming the rod into a magic battleaxe that grants a +3 bonus to attack and damage rolls made with it.\n   If you press button 3, the rod's flanged head folds down, a spear point springs from the rod's tip, and the rod's handle lengthens into a 6-foot haft, transforming the rod into a magic spear that grants a+3 bonus to attack and damage rolls made with it.\n   If you press button 4, the rod transforms into a climbing pole up to 50 feet long, as you specify. In surfaces as hard as granite, a spike at the bottom and three hooks at the top anchor the pole. Horizontal bars 3 inches long fold out from the sides, 1 foot apart, forming a ladder. The pole can bear up to 4,000 pounds. More weight or lack of solid anchoring causes the rod to revert to its normal form.\n   If you press button 5, the rod transforms into a handheld battering ram and gram its user a +10 bonus to Strength checks made to break through doors, barricades, and other barriers.\n   If you press button 6, the rod assumes or remains in its normal form and indicates magnetic north. (Nothing happens if this function of the rod is used in a location that has no magnetic north.) The rod also gives you knowledge of your approximate depth beneath the ground or your height above it.\n   " + toUni("Drain Life") + ". When you hit a creature with a melee attack using the rod, you can force the target to make a DC 17 Constitution saving throw. On a failure, the target rakes an extra 4d6 necrotic damage, and you regain a number of hit points equal to half that necrotic damage. This property can't be used again until the next dawn.\n   " + toUni("Paralyze") + ". When you hit a creature with a melee attack using the rod, you can force the target to make a DC 17 Strength saving throw. On a failure, the target is paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on a success. This property can't be used again until the next dawn.\n   " + toUni("Terrify") + ". While holding the rod, you can use an action to force each creature you can see within 30 feet of you to make a DC 17 Wisdom saving throw. On a failure, a target is frightened of you for 1 minute. A frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. This property can't be used again until the next dawn.",
		attunement : true,
		weight : 2
	},
	"rod of rulership" : {
		name : "Rod of Rulership",
		source : [["SRD", 240], ["D", 197]],
		type : "rod",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "You can use an action to present the rod and command obedience from each creature of your choice that you can see within 120 feet of you. Each target must succeed on a DC 15 Wisdom saving throw or be charmed by you for 8 hours. While charmed in this way, the creature regards you as its trusted leader. If harmed by you or your companions, or commanded to do something contrary to its nature, a target ceases to be charmed in this way. The rod can't be used again until the next dawn.",
		attunement : true,
		weight : 2
	},
	"rod of security" : {
		name : "Rod of Security",
		source : [["SRD", 241], ["D", 197]],
		type : "rod",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "While holding this rod, you can use an action to activate it. The rod then instantly transports you and up to 199 other willing creatures you can see to a paradise that exists in an extraplanar space. You choose the form that the paradise takes. It could be a tranquil garden, lovely glade, cheery tavern, immense palace, tropical island, fantastic carnival, or whatever else you can imagine. Regardless of its nature, the paradise contains enough water and food to sustain its visitors. Everything else that can be interacted with inside the extraplanar space can exist only there. For example, a flower picked from a garden in the paradise disappears if it is taken outside the extraplanar space.\n   For each hour spent in the paradise, a visitor regains hit points as if it had spent 1 Hit Die. Also, creatures don't age while in the paradise, although time passes normally. Visitors can remain in the paradise for up to 200 days divided by the number of creatures present (round down).\n   When the time runs out or you use an action to end it, all visitors reappear in the location they occupied when you activated the rod, or an unoccupied space nearest that location. The rod can't be used again until ten days have passed.",
		weight : 2
	},
	"rope of climbing" : { // finished
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
		description : "",
		descriptionFull : "This rope is 30 feet long and weighs 3 pounds. If you hold one end of the rope and use an action to speak its command word, the other end darts forward to entangle a creature you can see within 20 feet of you. The target must succeed on a DC 15 Dexterity saving throw or become restrained.\n   You can release the creature by using a bonus action to speak a second command word. A target restrained by the rope can use an action to make a DC 15 Strength or Dexterity check (target's choice). On a success, the creature is no longer restrained by the rope.\n   The rope has AC 20 and 20 hit points. It regains 1 hit point every 5 minutes as long as it has at least 1 hit point. If the rope drops to 0 hit points, it is destroyed.",
		weight : 3
	},
	"scarab of protection" : {
		name : "Scarab of Protection",
		source : [["SRD", 241], ["D", 199]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "If you hold this beetle-shaped medallion in your hand for 1 round, an inscription appears on its surface revealing its magical nature. It provides two benefits while it is on your person:\n \u2022 You have advantage on saving throws against spells.\n \u2022 The scarab has 12 charges. If you fail a saving throw against a necromancy spell or a harmful effect originating from an undead creature, you can use your reaction to expend 1 charge and turn the failed save into a successful one. The scarab crumbles into powder and is destroyed when its last charge is expended.",
		attunement : true
	},
	"scimitar of speed" : {
		name : "Scimitar of Speed",
		source : [["SRD", 241], ["D", 199]],
		type : "weapon (scimitar)",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "You gain a +2 bonus to attack and damage rolls made with this magic weapon. In addition, you can make one attack with it as a bonus action on each of your turns.",
		attunement : true,
		weight : 3
	},
	"shield of missile attraction" : {
		name : "Shield of Missile Attraction",
		source : [["SRD", 242], ["D", 200]],
		type : "shield",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "While holding this shield, you have resistance to damage from ranged weapon attacks.\n   " + toUni("Curse") + ". This shield is cursed. Attuning to it curses you until you are targeted by the Remove Curse spell or similar magic. Removing the shield fails to end the curse on you. Whenever a ranged weapon attack is made against a target within 10 feet of you, the curse causes you to become the target instead.",
		attunement : true,
		weight : 6,
		cursed : true
	},
	"slippers of spider climbing" : { // finished
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
		description : "",
		descriptionFull : "This viscous, milky-white substance can form a permanent adhesive bond between any two objects. It must be stored in a jar or flask that has been coated inside with oil of slipperiness. When found, a container contains 1d6+1 ounces.\n   One ounce of the glue can cover a 1-foot square surface. The glue takes 1 minute to set. Once it has done so, the bond it creates can be broken only by the application of universal solvent or oil of etherealness, or with a Wish spell."
	},
	"spell scroll (1st level)" : {
		name : "Spell Scroll (1st Level)",
		source : [["SRD", 242], ["D", 200]],
		type : "scroll",
		rarity : "common",
		magicItemTable : "A",
		description : "",
		descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without having to provide any of the spell's components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 11. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 13 and an attack bonus of +5.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 11 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed."
	},
	"spell scroll (2nd level)" : {
		name : "Spell Scroll (2nd Level)",
		source : [["SRD", 242], ["D", 201]],
		type : "scroll",
		rarity : "uncommon",
		description : "",
		descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without having to provide any of the spell's components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 12. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 13 and an attack bonus of +5.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 12 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.",
		magicItemTable : ["A", "B"]
	},
	"spell scroll (3rd level)" : {
		name : "Spell Scroll (3rd Level)",
		source : [["SRD", 242], ["D", 202]],
		type : "scroll",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "",
		descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without having to provide any of the spell's components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 13. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 15 and an attack bonus of +7.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 13 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed."
	},
	"spell scroll (4th level)" : {
		name : "Spell Scroll (4th Level)",
		source : [["SRD", 242], ["D", 203]],
		type : "scroll",
		rarity : "rare",
		magicItemTable : "C",
		description : "",
		descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without having to provide any of the spell's components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 14. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 15 and an attack bonus of +7.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 14 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed."
	},
	"spell scroll (5th level)" : {
		name : "Spell Scroll (5th Level)",
		source : [["SRD", 242], ["D", 204]],
		type : "scroll",
		rarity : "rare",
		magicItemTable : "C",
		description : "",
		descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without having to provide any of the spell's components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 15. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 17 and an attack bonus of +9.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 15 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed."
	},
	"spell scroll (6th level)" : {
		name : "Spell Scroll (6th Level)",
		source : [["SRD", 242], ["D", 205]],
		type : "scroll",
		rarity : "very rare",
		magicItemTable : "D",
		description : "",
		descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without having to provide any of the spell's components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 16. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 17 and an attack bonus of +9.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 16 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed."
	},
	"spell scroll (7th level)" : {
		name : "Spell Scroll (7th Level)",
		source : [["SRD", 242], ["D", 206]],
		type : "scroll",
		rarity : "very rare",
		magicItemTable : "D",
		description : "",
		descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without having to provide any of the spell's components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 17. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 18 and an attack bonus of +10.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 17 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed."
	},
	"spell scroll (8th level)" : {
		name : "Spell Scroll (8th Level)",
		source : [["SRD", 242], ["D", 207]],
		type : "scroll",
		rarity : "very rare",
		description : "",
		descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without having to provide any of the spell's components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 18. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 18 and an attack bonus of +10.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 18 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.",
		magicItemTable : ["D", "E"]
	},
	"spell scroll (9th level)" : {
		name : "Spell Scroll (9th Level)",
		source : [["SRD", 242], ["D", 208]],
		type : "scroll",
		rarity : "legendary",
		magicItemTable : "E",
		description : "",
		descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without having to provide any of the spell's components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC is 19. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 19 and an attack bonus of +11.\n   A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on a DC 19 Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed."
	},
	"spell scroll (cantrip)" : {
		name : "Spell Scroll (Cantrip)",
		source : [["SRD", 242], ["D", 199]],
		type : "scroll",
		rarity : "common",
		magicItemTable : "A",
		description : "",
		descriptionFull : "A spell scroll bears the words of a single spell, written as a mystical cipher. If the spell is on your class's spell list, you can read the scroll and cast its spell without having to provide any of the spell's components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell's normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.\n   If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 10. On a failed check, the spell disappears from the scroll with no other effect.\n   Once the spell is cast, the words on the scroll fade, and the scroll itself crumbles to dust.\n   A spell cast from this scroll has a save DC of 13 and an attack bonus of +5."
	},
	"spellguard shield" : {
		name : "Spellguard Shield",
		source : [["SRD", 242], ["D", 201]],
		type : "shield",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "While holding this shield, you have advantage on saving throws against spells and other magical effects, and spell attacks have disadvantage against you",
		attunement : true,
		weight : 6
	},
	"sphere of annihilation" : {
		name : "Sphere of Annihilation",
		source : [["SRD", 242], ["D", 201]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "This 2-foot-diameter black sphere is a hole in the multiverse, hovering in space and stabilized by a magical field surrounding it.\n   The sphere obliterates all matter it passes through and all matter that passes through it. Artifacts are the exception. Unless an artifact is susceptible to damage from a sphere of annihilation, it passes through the sphere unscathed. Anything else that touches the sphere but isn't wholly engulfed and obliterated by it takes 4d10 force damage.\n   The sphere is stationary until someone controls it. If you are within 60 feet of an uncontrolled sphere, you can use an action to make a DC 25 Intelligence (Arcana) check. On a success, the sphere levitates in one direction of your choice, up to a number of feet equal to 5 \xD7 your Intelligence modifier (minimum 5 feet). On a failure, the sphere moves 10 feet toward you. A creature whose space the sphere enters must succeed on a DC 13 Dexterity saving throw or be touched by it, taking 4d10 force damage.\n   If you attempt to control a sphere that is under another creature's control, you make an Intelligence (Arcana) check contested by the other creature's Intelligence (Arcana) check. The winner of the contest gains control of the sphere and can levitate it as normal.\n   If the sphere comes into contact with a planar portal, such as that created by the Gate spell, or an extradimensional space, such as that within a portable hole, the DM determines randomly what happens, using the following table.\n\n" + toUni("d100") + "\t" + toUni("Result") + "\n01-50\tThe sphere is destroyed.\n51-85\tThe sphere moves through the portal or into the extradimensional space.\n86-00\tA spatial rift sends each creature and object within 180 feet of the sphere, including the sphere, to a random plane of existence."
	},
	"staff of charming" : {
		name : "Staff of Charming",
		source : [["SRD", 243], ["D", 201]],
		type : "staff",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "While holding this staff, you can use an action to expend 1 of its 10 charges to cast Charm Person, Command, or Comprehend Languages from it using your spell save DC. The staff can also be used as a magic quarterstaff.\n   If you are holding the staff and fail a saving throw against an enchantment spell that targets only you, you can turn your failed save into a successful one. You can't use this property of the staff again until the next dawn. If you succeed on a save against an enchantment spell that targets only you, with or without the staff's intervention, you can use your reaction to expend 1 charge from the staff and turn the spell back on its caster as if you had cast the spell.\n   The staff regains 1d8+2 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff becomes a nonmagical quarterstaff.",
		attunement : true,
		weight : 4
	},
	"staff of fire" : {
		name : "Staff of Fire",
		source : [["SRD", 243], ["D", 201]],
		type : "staff",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "You have resistance to fire damage while you hold this staff.\n   The staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: Burning Hands (1 charge), Fireball (3 charges), or Wall of Fire (4 charges).\n   The staff regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff blackens, crumbles into cinders, and is destroyed.",
		attunement : true,
		weight : 4
	},
	"staff of frost" : {
		name : "Staff of Frost",
		source : [["SRD", 243], ["D", 202]],
		type : "staff",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "You have resistance to cold damage while you hold this staff.\n   The staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: Cone of Cold (5 charges), Fog Cloud (1 charge), Ice Storm (4 charges), or Wall of Ice (4 charges).\n   The staff regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1. the staff turns to water and is destroyed.",
		attunement : true,
		weight : 4
	},
	"staff of healing" : {
		name : "Staff of Healing",
		source : [["SRD", 243], ["D", 202]],
		type : "staff",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : " This staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC and spellcasting ability modifier: Cure Wounds (1 charge per spell level, up to 4th), Lesser Restoration (2 charges). or Mass Cure Wounds (5 charges).\n   The staff regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1. the staff vanishes in a flash of light, lost forever.",
		attunement : true,
		weight : 4
	},
	"staff of power" : {
		name : "Staff of Power",
		source : [["SRD", 243], ["D", 202]],
		type : "staff",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. While holding it, you gain a +2 bonus to Armor Class, saving throws, and spell attack rolls.\n   The staff has 20 charges for the following properties. The staff regains 2d8+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff retains its +2 bonus to attack and damage roll but loses all other properties. On a 20, the staff regain 1d8+2 charges.\n   " + toUni("Power Strike") + ". When you hit with a melee attack using the staff, you can expend 1 charge to deal an extra 1d6 force damage to the target.\n   " + toUni("Spells") + ". While holding this staff, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC and spell attack bonus: Cone of Cold (5 charges), Fireball (5th-level version, 5 charges), Globe of Invulnerability (6 charges), Hold Monster (5 charges), Levitate (2 charges). Lightning Bolt (5th-level version, 5 charges), Magic Missile (1 charge), Ray of Enfeeblement (1 charge), or Wall of Force (5 charges).\n   " + toUni("Retributive Strike") + ". You can use an action to break the staff over your knee or against a solid surface, performing a retributive strike. The staff is destroyed and releases its remaining magic in an explosion that expands to fill a 30-foot-radius sphere centered on it.\n   You have a 50% chance to instantly travel to a random plane of existence, avoiding the explosion. If you fail to avoid the effect, you take force damage equal to 16 \xD7 the number of charges in the staff. Every other creature in the area must make a DC 17 Dexterity saving throw. On a failed save, a creature takes an amount of damage based on how far away it is from the point of origin, as shown in the following table. On a successful save, a creature takes half as much damage.\n\n" + toUni("Distance from Origin") + "\t" + toUni("Effect") + "\n10 ft. away or closer\t8 \xD7 the number of charges in the staff\n11 to 20 ft. away\t6 \xD7 the number of charges in the staff\n21 to 30 ft. away\t4 \xD7 the number of charges in the staff",
		attunement : true,
		weight : 4
	},
	"staff of striking" : {
		name : "Staff of Striking",
		source : [["SRD", 244], ["D", 203]],
		type : "staff",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "This staff can be wielded as a magic quarterstaff that grants a +3 bonus to attack and damage rolls made with it.\n   The staff has 10 charges. When you hit with a melee attack using it, you can expend up to 3 of its charges. For each charge you expend, the target takes an extra 1d6 force damage. The staff regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff becomes a nonmagical quarterstaff.",
		attunement : true,
		weight : 4
	},
	"staff of swarming insects" : {
		name : "Staff of Swarming Insects",
		source : [["SRD", 244], ["D", 203]],
		type : "staff",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "This staff has 10 charges and regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, a swarm of insects consumes and destroys the staff, then disperses.\n   " + toUni("Spells") + ". While holding the staff, you can use an action to expend some of its charges to cast one of the following spells from it, using your spell save DC: Giant Insect (4 charges) or Insect Plague (5 charges).\n   " + toUni("Insect Cloud") + ". While holding the staff, you can use an action and expend 1 charge to cause a swarm of harmless flying insects to spread out in a 30-foot radius from you. The insects remain for 10 minutes, making the area heavily obscured for creatures other than you. The swarm moves with you, remaining centered on you. A wind of at least 10 miles per hour disperses the swarm and ends the effect.",
		attunement : true,
		weight : 4
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
	"staff of the python" : {
		name : "Staff of the Python",
		source : [["SRD", 245], ["D", 204]],
		type : "staff",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : "You can use an action to speak this staff's command word and throw the staff on the ground within 10 feet of you. The staff becomes a giant constrictor snake under your control and acts on its own initiative count. By using a bonus action to speak the command word again, you return the staff to its normal form in a space formerly occupied by the snake.\n   On your turn, you can mentally command the snake if it is within 60 feet of you and you aren't incapacitated. You decide what action the snake takes and where it moves during its next turn, or you can issue it a general command, such as to attack your enemies or guard a location.\n   If the snake is reduced to 0 hit points, it dies and reverts to its staff form. The staff then shatters and is destroyed. If the snake reverts to staff form before losing all its hit points, it regains all of them.",
		attunement : true,
		weight : 4
	},
	"staff of the woodlands" : {
		name : "Staff of the Woodlands",
		source : [["SRD", 245], ["D", 204]],
		type : "staff",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. While holding it, you have a +2 bonus to spell attack rolls.\n   The staff has 10 charges for the following properties. It regains 1d6+4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff loses its properties and becomes a nonmagical quarterstaff.\n   " + toUni("Spells") + ". You can use an action to expend 1 or more of the staff's charges to cast one of the following spells from it, using your spell save DC: Animal Friendship (1 charge), Awaken (5 charges), Barkskin (2 charges), Locate Animals or Plants} (2 charges), Speak with Animals (1 charge), Speak with Plants (3 charges), or Wall of Thorns (6 charges).\n   You can also use an action to cast the Pass Without Trace spell from the staff without using any charges.\n   " + toUni("Tree Form") + ". You can use an action to plant one end of the staff in fertile earth and expend 1 charge to transform the staff into a healthy tree. The tree is 60 feet tall and has a 5-foot-diameter trunk, and its branches at the top spread out in a 20-foot radius. The tree appears ordinary but radiates a faint aura of transmutation magic if targeted by Detect Magic. While touching the tree and using another action to speak its command word, you return the staff to its normal form. Any creature in the tree falls when it reverts to a staff.",
		attunement : true,
		weight : 4
	},
	"staff of thunder and lightning" : {
		name : "Staff of Thunder and Lightning",
		source : [["SRD", 245], ["D", 204]],
		type : "staff",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. It also has the following additional properties. When one of these properties is used, it can't be used again until the next dawn.\n   " + toUni("Lightning") + ". When you hit with a melee attack using the staff, you can cause the target to take an extra 2d6 lightning damage.\n   " + toUni("Thunder") + ". When you hit with a melee attack using the staff, you can cause the staff to emit a crack of thunder, audible out to 300 feet. The target you hit must succeed on a DC 17 Constitution saving throw or become stunned until the end of your next turn.\n   " + toUni("Lightning Strike") + ". You can use an action to cause a bolt of lightning to leap from the staff's tip in a line that is 5 feet wide and 120 feet long. Each creature in that line must make a DC 17 Dexterity saving throw, taking 9d6 lightning damage on a failed save, or half as much damage on a successful one.\n   " + toUni("Thunderclap") + ". You can use an action to cause the staff to issue a deafening thunderclap, audible out to 600 feet. Each creature within 60 feet of you (not including you) must make a DC 17 Constitution saving throw. On a failed save, a creature takes 2d6 thunder damage and becomes deafened for 1 minute. On a successful save, a creature takes half damage and isn't deafened.\n   " + toUni("Thunder and Lightning") + ". You can use an action to use the Lightning Strike and Thunderclap properties at the same time. Doing so doesn't expend the daily use of those properties, only the use of this one.",
		attunement : true,
		weight : 4
	},
	"staff of withering" : {
		name : "Staff of Withering",
		source : [["SRD", 246], ["D", 205]],
		type : "staff",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "This staff has 3 charges and regains 1d3 expended charges daily at dawn.\n   The staff can be wielded as a magic quarterstaff. On a hit, it deals damage as a normal quarterstaff, and you can expend 1 charge to deal an extra 2d10 necrotic damage to the target. In addition, the target must succeed on a DC 15 Constitution saving throw or have disadvantage for 1 hour on any ability check or saving throw that uses Strength or Constitution.",
		attunement : true,
		weight : 4
	},
	"stone of controlling earth elementals" : { // finished
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
				description : "CR 5 earth elemental that obeys my verbal commands; on broken conc. elemental breaks free",
				changes : "Using the Stone of Controlling Earth Elementals, the spell only takes 1 action instead of 1 minute, but can only bring forth an earth elemental."
			}
		}
	},
	"stone of good luck" : {
		name : "Stone of Good Luck",
		source : [["SRD", 246], ["D", 205]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : "While this polished agate is on your person, you gain a +1 bonus to ability checks and saving throws.",
		attunement : true
	},
	"sun blade" : { // finished
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
	"sword of life stealing" : { // finished
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
				'If I include the words "Life Stealing" in the name of a sword, it will be treated as the magic weapon Sword of Life Stealing. It does +10 necrotic damage when I roll a 20 on the attack roll and then gives me 10 temporary hit points. It doesn\'t work against Constructs or Undead.'
			]
		}
	},
	"sword of sharpness" : { // finished
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
				'If I include the words "of Sharpness" in the name of a sword that deals slashing damage, it will be treated as the magic weapon Sword of Sharpness. It deals maximum damage against objects. On a roll of 20 to hit against creatures, it deals +14 slashing damage and has a 5% chance to lob off one limb.'
			]
		}
	},
	"sword of wounding" : { // finished
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
				'If I include the words "of Wounding" in the name of a sword, it will be treated as the magic weapon Sword of Wounding. Damage by the sword can only be regained with a short or long rest. Once per turn when I hit with the sword, I can inflict a lingering wound on a target, causing it pain every turn thereafter.'
			]
		}
	},
	"talisman of pure good" : {
		name : "Talisman of Pure Good",
		source : [["SRD", 247], ["D", 207]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
		descriptionFull : "This talisman is a mighty symbol of goodness. A creature that is neither good nor evil in alignment takes 6d6 radiant damage upon touching the talisman. An evil creature takes 8d6 radiant damage upon touching the talisman. Either sort of creature takes the damage again each time it ends its turn holding or carrying the talisman.\n   If you are a good cleric or paladin, you can use the talisman as a holy symbol, and you gain a +2 bonus to spell attack rolls while you wear or hold it.\n   The talisman has 7 charges. If you are wearing or holding it, you can use an action to expend 1 charge from it and choose one creature you can see on the ground within 120 feet of you. If the target is of evil alignment, a flaming fissure opens under it. The target must succeed on a DC 20 Dexterity saving throw or fall into the fissure and be destroyed, leaving no remains. The fissure then closes, leaving no trace of its existence. When you expend the last charge, the talisman disperses into motes of golden light and is destroyed.",
		attunement : true,
		weight : 1
	},
	"talisman of the sphere" : {
		name : "Talisman of the Sphere",
		source : [["SRD", 247], ["D", 207]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "I",
		description : "",
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
		description : "",
		descriptionFull : "This item symbolizes unrepentant evil. A creature that is neither good nor evil in alignment takes 6d6 necrotic damage upon touching the talisman. A good creature takes 8d6 necrotic damage upon touching the talisman. Either sort of creature takes the damage again each time it ends its turn holding or carrying the talisman.\n   If you are an evil cleric or paladin, you can use the talisman as a holy symbol, and you gain a +2 bonus to spell attack rolls while you wear or hold it.\n   The talisman has 6 charges. If you are wearing or holding it, you can use an action to expend 1 charge from the talisman and choose one creature you can see on the ground within 120 feet of you. If the target is of good alignment, a flaming fissure opens under it. The target must succeed on a DC 20 Dexterity saving throw or fall into the fissure and be destroyed, leaving no remains. The fissure then closes, leaving no trace of its existence. When you expend the last charge, the talisman dissolves into foul-smelling slime and is destroyed.",
		attunement : true,
		weight : 1
	},
	"tome of clear thought" : {
		name : "Tome of Clear Thought",
		source : [["SRD", 247], ["D", 208]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "This book contains memory and logic exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Intelligence score increases by 2, as does your maximum for that score. The manual then loses its magic, but regains it in a century.",
		weight : 5
	},
	"tome of leadership and influence" : {
		name : "Tome of Leadership and Influence",
		source : [["SRD", 247], ["D", 208]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "This book contains guidelines for influencing and charming others, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Charisma score increases by 2, as does your maximum for that score. The manual then loses its magic, but regains it in a century.",
		weight : 5
	},
	"tome of understanding" : {
		name : "Tome of Understanding",
		source : [["SRD", 247], ["D", 209]],
		type : "wondrous item",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "This book contains intuition and insight exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Wisdom score increases by 2, as does your maximum for that score. The manual then loses its magic, but regains it in a century.",
		weight : 5
	},
	"trident of fish command" : {
		name : "Trident of Fish Command",
		source : [["SRD", 247], ["D", 209]],
		type : "weapon (trident)",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : "This trident is a magic weapon. It has 3 charges. While you carry it, you can use an action and expend 1 charge to cast Dominate Beast (save DC 15) from it on a beast that has an innate swimming speed. The trident regains 1d3 expended charges daily at dawn.",
		attunement : true,
		weight : 4
	},
	"universal solvent" : {
		name : "Universal Solvent",
		source : [["SRD", 248], ["D", 209]],
		type : "wondrous item",
		rarity : "legendary",
		magicItemTable : "E",
		description : "",
		descriptionFull : "This tube holds milky liquid with a strong alcohol smell. You can use an action to pour the contents of the tube onto a surface within reach. The liquid instantly dissolves up to 1 square foot of adhesive it touches, including sovereign glue."
	},
	"vicious weapon" : { // finished
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
				'If I include the word "Vicious" in the name of a weapon, it will be treated as the magic weapon Vicious Weapon. On a roll of 20 to hit, it does +7 damage of the weapons type.'
			]
		}
	},
	"vorpal sword" : { // finished
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
				'If I include the word "Vorpal" in the name of a sword that deals slashing damage, it will be treated as the magic weapon Vorpal Sword. It has +3 to hit and damage and on a roll of 20 on the attack roll, it cuts off a head of the target.'
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
	"wand of binding" : {
		name : "Wand of Binding",
		source : [["SRD", 248], ["D", 209]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "This wand has 7 charges for the following properties. It regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.\n   " + toUni("Spells") + ". While holding the wand, you can use an action to expend some of its charges to cast one of the following spells (save DC 17): Hold Monster (5 charges) or Hold Person (2 charges).\n   " + toUni("Assisted Escape") + ". While holding the wand, you can use your reaction to expend 1 charge and gain advantage on a saving throw you make to avoid being paralyzed or restrained, or you can expend 1 charge and gain advantage on any check you make to escape a grapple.",
		attunement : true,
		weight : 1
	},
	"wand of enemy detection" : {
		name : "Wand of Enemy Detection",
		source : [["SRD", 248], ["D", 210]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : " This wand has 7 charges. While holding it, you can use an action and expend 1 charge to speak its command word. For the next minute, you know the direction of the nearest creature hostile to you within 60 feet, but not its distance from you. The wand can sense the presence of hostile creatures that are ethereal, invisible, disguised, or hidden, as well as those in plain sight. The effect ends if you stop holding the wand.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		attunement : true,
		weight : 1
	},
	"wand of fear" : {
		name : "Wand of Fear",
		source : [["SRD", 248], ["D", 210]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "This wand has 7 charges for the following properties. It regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.\n   " + toUni("Command") + ". While holding the wand, you can use an action to expend 1 charge and command another creature to flee or grovel, as with the Command spell (save DC 15).\n   " + toUni("Cone of Fear") + ". While holding the wand, you can use an action to expend 2 charges, causing the wand's tip to emit a 60-foot cone of amber light. Each creature in the cone must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. While it is frightened in this way, a creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevent it from moving. If it has nowhere it can move, the creature can use the Dodge action. At the end of each of its turns, a creature can repeat the saving throw, ending the effect on itself on a success.",
		attunement : true,
		weight : 1
	},
	"wand of fireballs" : {
		name : "Wand of Fireballs",
		source : [["SRD", 248], ["D", 210]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : " This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the Fireball spell (save DC 15) from it. For 1 charge, you cast the 3rd-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed",
		attunement : true,
		weight : 1
	},
	"wand of lightning bolts" : {
		name : "Wand of Lightning Bolts",
		source : [["SRD", 249], ["D", 211]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : " This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the Lightning Bolt spell (save DC 15) from it. For 1 charge, you cast the 3rd-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		attunement : true,
		weight : 1
	},
	"wand of magic detection" : { // finished
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
	"wand of magic missiles" : {
		name : "Wand of Magic Missiles",
		source : [["SRD", 249], ["D", 211]],
		type : "wand",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : " This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the Magic Missile spell from it. For 1 charge, you cast the 1st-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		weight : 1
	},
	"wand of paralysis" : {
		name : "Wand of Paralysis",
		source : [["SRD", 249], ["D", 211]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : " This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cause a thin blue ray to streak from the tip toward a creature you can see within 60 feet of you. The target must succeed on a DC 15 Constitution saving throw or be paralyzed for 1 minute. At the end of each of the target's turns, it can repeat the saving throw, ending the effect on itself on a success.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		attunement : true,
		weight : 1
	},
	"wand of polymorph" : {
		name : "Wand of Polymorph",
		source : [["SRD", 249], ["D", 211]],
		type : "wand",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : " This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the Polymorph spell (save DC 15) from it.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		attunement : true,
		weight : 1
	},
	"wand of secrets" : { // fisnished
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
	"wand of the war mage, +1" : {
		name : "Wand of the War Mage, +1",
		source : [["SRD", 249], ["D", 212]],
		type : "wand",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : "While you are holding this wand, you gain a +1 bonus to spell attack rolls. In addition, you ignore half cover when making a spell attack.",
		attunement : true,
		weight : 1
	},
	"wand of the war mage, +2" : {
		name : "Wand of the War Mage, +2",
		source : [["SRD", 249], ["D", 212]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : "While you are holding this wand, you gain a +2 bonus to spell attack rolls. In addition, you ignore half cover when making a spell attack.",
		attunement : true,
		weight : 1
	},
	"wand of the war mage, +3" : {
		name : "Wand of the War Mage, +3",
		source : [["SRD", 249], ["D", 212]],
		type : "wand",
		rarity : "very rare",
		magicItemTable : "H",
		description : "",
		descriptionFull : "While you are holding this wand, you gain a +3 bonus to spell attack rolls. In addition, you ignore half cover when making a spell attack.",
		attunement : true,
		weight : 1
	},
	"wand of web" : {
		name : "Wand of Web",
		source : [["SRD", 249], ["D", 212]],
		type : "wand",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : " This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the Web spell (save DC 15) from it.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
		attunement : true,
		weight : 1
	},
	"wand of wonder" : {
		name : "Wand of Wonder",
		source : [["SRD", 249], ["D", 212]],
		type : "wand",
		rarity : "rare",
		magicItemTable : "G",
		description : "",
		descriptionFull : " This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges and choose a target within 120 feet of you. The target can be a creature, an object, or a point in space. Roll d100 and consult the following table to discover what happens.\n   If the effect causes you to cast a spell from the wand, the spell's save DC is 15. If the spell normally has a range expressed in feet, its range becomes 120 feet if it isn't already.\n   If an effect covers an area, you must center the spell on and include the target. If an effect has multiple possible subjects, the DM randomly determines which ones are affected.\n   The wand regains 1d6+1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into dust and is destroyed.\n\n" + toUni("d100") + "\t" + toUni("Effect") + "\n01-05\tYou cast Slow.\n06-10\tYou cast Faerie Fire.\n11-15\tYou are stunned until the start of your next turn, believing something awesome just happened.\n16-20\tYou cast Gust of Wind.\n21-25\tYou cast Detect Thoughts on the target you chose. If you didn't target a creature, you instead take 1d6 psychic damage.\n26-30\tYou cast Stinking Cloud.\n31-33\tHeavy rain falls in a 60-foot radius centered on the target. The area becomes lightly obscured. The rain falls until the start of your next turn.\n34-36\tAn animal appears in the unoccupied space nearest the target. The animal isn't under your control and acts as it normally would. Roll a d100 to determine which animal appears. On a 01-25, a rhinoceros appears; on a 26-50, an elephant appears; and on a 51-100, a rat appears.\n37-46\tYou cast Lightning Bolt.\n47-49\tA cloud of 600 oversized butterflies fills a 30-foot radius centered on the target. The area becomes heavily obscured. The butterflies remain for 10 minutes.\n50-53\tYou enlarge the target as if you had cast Enlarge/Reduce. If the target can't be affected by that spell or if you didn't target a creature, you become the target.\n54-58\tYou cast Darkness.\n59-62\tGrass grows on the ground in a 60-foot radius centered on the target. If grass is already there, it grows to ten times its normal size and remains overgrown for 1 minute.\n63-65\tAn object of the DM 's choice disappears into the Ethereal Plane. The object must be neither worn nor carried, within 120 feet of the target, and no larger than 10 feet in any dimension.\n66-69\tYou shrink yourself as if you had cast Enlarge/Reduce on yourself.\n70-79\tYou cast Fireball.\n80-84\tYou cast Invisibility.\n85-87\tLeaves grow from the target. If you chose a point in space as the target, leaves sprout from the creature nearest to that point. Unless they are picked off, the leaves turn brown and fall off after 24 hours.\n88-90\tA stream of 1d4 \xD7 10 gems, each worth 1 gp, shoots from the wand 's tip in a line 30 feet long and 5 feet wide. Each gem deals 1 bludgeoning damage, and the total damage of the gems is divided equally among all creatures in the line.\n91-95\tA burst of colorful shimmering light extends from you in a 30-foot radius. You and each creature in the area that can see must succeed on a DC 15 Constitution saving throw or become blinded for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.\n96-97\tThe target's skin turns bright blue for 1d10 days. If you chose a point in space, the creature nearest to that point is affected.\n98-00\tIf you targeted a creature, it must make a DC 15 Constitution saving throw. If you didn't target a creature, you become the target and must make the saving throw. If the saving throw fails by 5 or more, the target is instantly petrified. On any other failed save, the target is restrained and begins to turn to stone. While restrained in this way, the target must repeat the saving throw at the end of its next turn, becoming petrified on a failure or ending the effect on a success. The petrification lasts until the target is freed by the Greater Restoration spell or similar magic.",
		attunement : true,
		weight : 1
	},
	"weapon, +1, +2, or +3" : { // finished
		name : "Weapon, +1, +2, or +3",
		source : [["SRD", 250], ["D", 213]],
		type : "weapon (any)",
		rarity : "varies",
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
			rarity : "uncommon",
			magicItemTable : "F",
			description : "I have a +1 bonus to attack and damage rolls made with this magic weapon.",
			allowDuplicates : true
		},
		"+2 weapon (rare)" : {
			name : "Weapon +2",
			rarity : "rare",
			magicItemTable : "F",
			description : "I have a +2 bonus to attack and damage rolls made with this magic weapon.",
			allowDuplicates : true
		},
		"+3 weapon (very rare)" : {
			name : "Weapon +3",
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
		description : "",
		descriptionFull : "This fine black cloth, soft as silk, is folded up to the dimensions of a handkerchief. It unfolds into a circular sheet 6 feet in diameter.\n   You can use an action to unfold and place the well of many worlds on a solid surface, whereupon it creates a two-way portal to another world or plane of existence. Each time the item opens a portal, the DM decides where it leads. You can use an action to close an open portal by taking hold of the edges of the cloth and folding it up. Once well of many worlds has opened a portal, it can't do so again for 1d8 hours."
	},
	"wind fan" : {
		name : "Wind Fan",
		source : [["SRD", 250], ["D", 213]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "",
		descriptionFull : "While holding this fan, you can use an action to cast the Gust of Wind spell (save DC 13) from it. Once used, the fan shouldn't be used again until the next dawn. Each time it is used again before then, it has a cumulative 20% chance of not working and tearing into useless, nonmagical tatters."
	},
	"winged boots" : { // finished
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
	"wings of flying" : { // finished
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
	"orb of dragonkind" : {
		name : "Orb of Dragonkind",
		source : [["SRD", 252], ["D", 225]],
		type : "wondrous item",
		rarity : "artifact",
		description : "",
		descriptionFull : "Ages past, on the world of Krynn, elves and humans waged a terrible war against evil dragons. When the world seemed doomed, the wizards of the Towers of High Sorcery came together and worked their greatest magic, forging five Orbs of Dragonkind (or Dragon Orbs) to help them defeat the dragons. One orb was taken to each of the five towers, and there they were used to speed the war toward a victorious end. The wizards used the orbs to lure dragons to them, then destroyed the dragons with powerful magic.\n   As the Towers of High Sorcery fell in later ages, the orbs were destroyed or faded into legend, and only three are thought to survive. Their magic has been warped and twisted over the centuries, so although their primary purpose of calling dragons still functions, they also allow some measure of control over dragons.\n   Each orb contains the essence of an evil dragon, a presence that resents any attempt to coax magic from it. Those lacking in force of personality might find themselves enslaved to an orb.\n   An orb is an etched crystal globe about 10 inches in diameter. When used, it grows to about 20 inches in diameter, and mist swirls inside it.\n   While attuned to an orb, you can use an action to peer into the orb's depths and speak its command word. You must then make a DC 15 Charisma check. On a successful check, you control the orb for as long as you remain attuned to it. On a failed check, you become charmed by the orb for as long as you remain attuned to it.\n   While you are charmed by the orb, you can't voluntarily end your attunement to it, and the orb casts Suggestion on you at will (save DC 18), urging you to work toward the evil ends it desires. The dragon essence within the orb might want many things: the annihilation of a particular people, freedom from the orb, to spread suffering in the world, to advance the worship of Tiamat, or something else the DM decides.\n   " + toUni("Random Properties") + ". An Orb of Dragon kind has the following random properties:\n \u2022 2 minor beneficial properties\n \u2022 1 minor detrimental property\n \u2022 1 major detrimental property\n\n" + toUni("Spells") + ". The orb has 7 charges and regains 1d4+3 expended charges daily at dawn. If you control the orb, you can use an action and expend 1 or more charges to cast one of the following spells (save DC 18) from it: Cure Wounds (5th-level version, 3 charges), Daylight (1 charge), Death Ward (2 charges), or Scrying (3 charges). You can also use an action to cast the Detect Magic spell from the orb without using any charges.\n   " + toUni("Call Dragons") + ". While you control the orb, you can use an action to cause the artifact to issue a telepathic call that extends in all directions for 40 miles. Evil dragons in range feel compelled to come to the orb as soon as possible by the most direct route. Dragon deities such as Tiamat are unaffected by this call. Dragons drawn to the orb might be hostile toward you for compelling them against their will. Once you have used this property, it can't be used again for 1 hour.\n   " + toUni("Destroying an Orb") + ". An Orb of Dragonkind appears fragile but is impervious to most damage, including the attacks and breath weapons of dragons. A Disintegrate spell or one good hit from a +3 magic weapon is sufficient to destroy an orb, however.",
		attunement : true
	}
}
