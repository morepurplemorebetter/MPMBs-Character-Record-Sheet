var Base_MagicItemsList = {
	'amulet of health': {
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
	'belt of giant strength': {
		name: "Belt of Giant Strength",
		source: [["SRD", 211], ["D", 155]],
		type: "wondrous item",
		rarity: "varies",
		description: "Set the type of giant using the button in this line. While wearing this belt, my Strength score changes to a certain number depending on the type of giant the belt is associated with, provided that my Strength is not already that amount or higher.",
		descriptionFull: "While wearing this belt, your Strength score changes to a score granted by the belt. If your Strength is already equal to or greater than the belt’s score, the item has no effect on you. Six varieties of this belt exist, corresponding with and having rarity according to the six kinds of true giants. The belt of stone giant strength and the belt of frost giant strength look different, but they have the same effect.\n\n" + toUni("Type") + "\t\t" + toUni("Str") + "\t" + toUni("Rarity") + "\nHill giant\t\t21\tRare\nStone/frost giant\t23\tVery rare\nFire giant\t\t25\tVery rare\nCloud giant\t27\tLegendary\nStorm giant\t29\tLegendary",
		attunement: true,
		allowDuplicates : true,
		dmgres : ["Test"],
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
	'crystal ball' : {
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
	'gauntlets of ogre power': {
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
	'headband of intellect': {
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
	// example magical armour
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
		magicItemTable : "H",
		attunement : true,
		description : "This magical warhammer adds a +3 bonus to attack and damage rolls made with it. It has the thrown property with a normal range of 20 ft and a long range of 60 ft. It deals an extra 1d8 damage (or 2d8 if the target is a giant) when thrown. Immediately after the attack, the weapon flies back to my hand.",
		prerequisite : "Requires attunement by a dwarf",
		prereqeval : "CurrentRace.known.indexOf('dwarf') !== -1",
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
	'potion of speed' : {
		name: "Potion of Speed",
		source: [["SRD", 235], ["D", 188]],
		type : "potion",
		rarity: "very rare",
		magicItemTable : "D",
		description: "As an action, I can drink this potion or administer it to another to gain the effects of Haste for 1 minute (no concentration required).\rThe potion's yellow fluid is streaked with black and swirls on its own.",
		descriptionFull: "When you drink this potion, you gain the effect of the Haste spell for 1 minute (no concentration required). The potion's yellow fluid is streaked with black and swirls on its own.",
		weight: 0.5
	},
	'ring of jumping' : {
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
	}
};