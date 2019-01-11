var Base_MagicItemsList = {
	'amulet of health': {
		name: "Amulet of Health",
		source: [["SRD", 207], ["D", 150]],
		type: "wondrous item",
		rarity: "rare",
		description: "My Constitution score is 19 while I'm wearing this amulet, provided that my Constitution is not already 19 or higher.",
		descriptionFull: "Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution score is already 19 or higher without it.",
		attunement: true,
		weight: 1,
		scoresOverride : [0, 0, 19, 0, 0, 0]
	},
	'belt of giant strength, cloud': {
		name: "Belt of Giant Strength, Cloud",
		source: [["SRD", 211], ["D", 155]],
		type: "wondrous item",
		rarity: "legendary",
		description: "My Strength score is 27 while I'm wearing this amulet, provided that my Strength is not already 27 or higher.",
		descriptionFull: "While wearing this belt, your Strength score changes to 27. The item has no effect on you if your Strength without the belt is equal to or greater than the belt's score.",
		attunement: true,
		scoresOverride : [27, 0, 0, 0, 0, 0]
	},
	'belt of giant strength, fire': {
		name: "Belt of Giant Strength, Fire",
		source: [["SRD", 211], ["D", 155]],
		type: "wondrous item",
		rarity: "very rare",
		description: "My Strength score is 25 while I'm wearing this amulet, provided that my Strength is not already 25 or higher.",
		descriptionFull: "While wearing this belt, your Strength score changes to 25. The item has no effect on you if your Strength without the belt is equal to or greater than the belt's score.",
		attunement: true,
		scoresOverride : [25, 0, 0, 0, 0, 0]
	},
	'belt of giant strength, frost': {
		name: "Belt of Giant Strength, Frost",
		source: [["SRD", 211], ["D", 155]],
		type: "wondrous item",
		rarity: "very rare",
		description: "My Strength score is 23 while I'm wearing this amulet, provided that my Strength is not already 23 or higher.",
		descriptionFull: "While wearing this belt, your Strength score changes to 23. The item has no effect on you if your Strength without the belt is equal to or greater than the belt's score.",
		attunement: true,
		scoresOverride : [23, 0, 0, 0, 0, 0]
	},
	'belt of giant strength, hill': {
		name: "Belt of Giant Strength, Hill",
		source: [["SRD", 211], ["D", 155]],
		type: "wondrous item",
		rarity: "rare",
		description: "My Strength score is 21 while I'm wearing this amulet, provided that my Strength is not already 21 or higher.",
		descriptionFull: "While wearing this belt, your Strength score changes to 21. The item has no effect on you if your Strength without the belt is equal to or greater than the belt's score.",
		attunement: true,
		scoresOverride : [21, 0, 0, 0, 0, 0]
	},
	'belt of giant strength, stone': {
		name: "Belt of Giant Strength, Stone",
		source: [["SRD", 211], ["D", 155]],
		type: "wondrous item",
		rarity: "very rare",
		description: "My Strength score is 23 while I'm wearing this amulet, provided that my Strength is not already 23 or higher.",
		descriptionFull: "While wearing this belt, your Strength score changes to 23. The item has no effect on you if your Strength without the belt is equal to or greater than the belt's score.",
		attunement: true,
		scoresOverride : [23, 0, 0, 0, 0, 0]
	},
	'belt of giant strength, storm': {
		name: "Belt of Giant Strength, Storm",
		source: [["SRD", 211], ["D", 155]],
		type: "wondrous item",
		rarity: "legendary",
		description: "My Strength score is 29 while I'm wearing this amulet, provided that my Strength is not already 29 or higher.",
		descriptionFull: "While wearing this belt, your Strength score changes to 29. The item has no effect on you if your Strength without the belt is equal to or greater than the belt's score.",
		attunement: true,
		scoresOverride : [29, 0, 0, 0, 0, 0]
	},
	'gauntlets of ogre power': {
		name: "Gauntlets of Ogre Power",
		source: [["SRD", 223], ["D", 171]],
		type: "wondrous item",
		rarity: "uncommon",
		description: "My Strength score is 19 while I'm wearing these gauntlets, provided that my Strength is not already 19 or higher.",
		descriptionFull: "Your Strength score is 19 while you wear these gauntlets. They have no effect on you if your Strength is already 19 or higher without them.",
		attunement: true,
		scoresOverride : [19, 0, 0, 0, 0, 0]
	},
	'headband of intellect': {
		name: "Headband of Intellect",
		source: [["SRD", 225], ["D", 173]],
		type: "wondrous item",
		rarity: "uncommon",
		description: "My Intelligence score is 19 while I'm wearing this headband, provided that my Intelligence is not already 19 or higher.",
		descriptionFull: "Your Intelligence score is 19 while you wear this headband. It has no effect on you if your Intelligence is already 19 or higher without it.",
		attunement: true,
		scoresOverride : [0, 0, 0, 19, 0, 0]
	},
	// example magical armour
	"glamoured studded leather" : {
		name : "Glamoured Studded Leather",
		source : [["SRD", 224], ["D", 172]],
		type : "armor (studded leather)",
		rarity : "rare",
		attunement : false,
		description : "Studded leather with +1 AC. As a bonus action, I can speak its command word and have it assume the appearance of a normal set of clothing or another armor. I decide what it looks like: style, color, and accessories, but the armor retains its bulk and weight. The illusion lasts until I use this again or remove the armor.",
		weight : 13,
		descriptionFull : "While wearing this armor, you gain a +1 bonus to AC. You can also use a bonus action to speak the armor's command word and cause the armor to assume the appearance of a normal set of clothing or some other kind of armor. You decide what it looks like, including color, style, and accessories, but the armor retains its normal bulk and weight. The illusory appearance last until you use this property again or remove the armor.",
		addArmor : "Glamoured Studded Leather",
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
	// example magical weapon
	"dwarven thrower" : {
		name : "Dwarven Thrower",
		source : [["SRD", 220], ["D", 167]],
		type : "weapon (warhammer)",
		rarity : "very rare",
		attunement : true,
		description : "This magical warhammer adds a +3 bonus to attack and damage rolls made with it. It has the thrown property with a normal range of 20 ft and a long range of 60 ft. It deals an extra 1d8 damage (or 2d8 if the target is a giant) when thrown. Immediately after the attack, the weapon flies back to my hand.",
		prerequisite : "Requires attunement by a dwarf",
		prereqeval : "CurrentRace.known.indexOf('dwarf') !== -1",
		weight : 2,
		descriptionFull : "You gain a +3 bonus to attack and damage rolls made with this magic weapon. It has the thrown property with a normal range of 20 feet and a long range of 60 feet. When you hit with a ranged attack using this weapon, it deals an extra 1d8 damage or, if the target is a giant, 2d8 damage. Immediately after the attack, the weapon flies back to your hand.",
		addWeapons : ["Dwarven Thrower"],
		weaponOptions : {
			regExpSearch : /^(?=.*dwarven)(?=.*thrower).*$/i,
			name : "Dwarven Thrower",
			source : [["SRD", 220], ["D", 167]],
			list : "melee",
			ability : 1,
			type : "Martial",
			damage : [1, 8, "bludgeoning"],
			range : "Melee, 20/60 ft",
			weight : 2,
			description : "Thrown, versatile (1d10); +1d8 damage when thrown (2d8 vs. giant) and returns immediately",
			abilitytodamage : true,
			modifiers : [3, 3] // add 3 to each to hit and damage because of the magical bonus
		}
	},
	"ring of swimming" : {
		name : "Ring of Swimming",
		source : [["SRD", 238], ["D", 193]],
		type : "ring",
		rarity : "uncommon",
		attunement : false,
		description : "I have a swimming speed of 40 feet while wearing this ring.",
		descriptionFull : "You have a swimming speed of 40 feet while wearing this ring.",
		speed : { swim : { spd : 40, enc : 30 } }
	}
};