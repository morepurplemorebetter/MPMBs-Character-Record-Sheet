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
		type : "weapon (any)",
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
			description : "I have a +1 bonus to attack and damage rolls made with the magic ammunition. Once it hits a target, the ammunition is no longer magical.",
			allowDuplicates : true
		},
		"+2 ammunition (rare)" : {
			name : "Ammunition +2",
			rarity: "rare",
			magicItemTable : "C",
			description : "I have a +2 bonus to attack and damage rolls made with the magic ammunition. Once it hits a target, the ammunition is no longer magical.",
			allowDuplicates : true
		},
		"+3 ammunition (very rare)" : {
			name : "Ammunition +3",
			rarity: "very rare",
			magicItemTable : "D",
			description : "I have a +3 bonus to attack and damage rolls made with the magic ammunition. Once it hits a target, the ammunition is no longer magical.",
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
	"boots of elvenkind": {
		// Transcribed by AelarTheElfRogue
		name : "Boots of Elvenkind",
		source : [["SRD", 212], ["D", 155]],
		type : "wonderous item",
		rarity : "uncommon",
		magicItemTable : "F",
		attunement : false,
		weight : 1,
		allowDuplicates : false,
		description : "While I wear these boots, my steps make no sound, regardless of the surface I am moving across. I also have advantage on Dexterity (Stealth) checks that rely on moving silently.",
		descriptionFull: "While you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have advantage on Dexterity (Stealth) checks that rely on moving silently."
	},
	"boots of levitation": {
		// Transcribed by AelarTheElfRogue
		name : "Boots of Levitation",
		source : [["SRD", 212],["D", 155]],
		type : "wonderous item",
		rarity : "rare",
		magicItemTable : "G",
		attunement : true,
		weight : 1,
		allowDuplicates : false,
		description : "While I wear these boots, I can use an action to cast the levitate spell on myself at will.",
		descriptionFull: "While you wear these boots, you can use an action to cast the Levitate spell on yourself at will.",
		action: [["action", "Levitate"]],
		usages: 1,
		spellcastingBonus : [{
			name: "Boots of Levitation",
			spells: ["levitate"],
			selection: ["levitate"],
			atwill : true
		}]
	},
	"boots of speed": {
		// Transcribed by AelarTheElfRogue
		name: "Boots of Speed",
		source: [["SRD", 212], ["D", 155]],
		type: "wondrous item",
		rarity: "rare",
		magicItemTable : "G",
		description: "While I wear these boots, I can use a bonus action to double my walking speed, and opportunity attacks against me have disadvantage on the attack roll. I can end the effect as a bonus action. When the boots' property has been used for a total of 10 minutes, the magic ceases to function until I finish a long rest.",
		descriptionFull: "While you wear these boots, you can use a bonus action and click the boots' heels together. If you do, the boots double your walking speed, and any creature that makes an opportunity attack against you has disadvantage on the attack roll. If you click your heels together again, you end the effect.\n   When the boots' property has been used for a total of 10 minutes, the magic ceases to function until you finish a long rest.",
		attunement: true,
		action : ["bonus action", "Double Walking Speed"],
	},
	"boots of striding and springing": {
		// Transcribed by AelarTheElfRogue
		name: "Boots of Striding and Springing",
		source: [["SRD", 212], ["D", 156]],
		type: "wondrous item",
		rarity: "uncommon",
		magicItemTable : "F",
		description: "While I wear these boots, my walking speed becomes 30 feet, unless my walking speed is higher, and my speed isn't reduced if I am encumbered or wearing heavy armor. In addition, I can jump three times the normal distance, though I can't jump farther than my remaining movement would allow.",
		descriptionFull: "While you wear these boots, your walking speed becomes 30 feet, unless your walking speed is higher, and your speed isn't reduced if you are encumbered or wearing heavy armor. In addition, you can jump three times the normal distance, though you can't jump farther than your remaining movement would allow.",
		attunement: true,
		speed : { walk : { spd : "fixed30", enc : "fixed30" } }
	},
	"boots of the winterlands": {
		// Transcribed by AelarTheElfRogue
		name: "Boots of the Winterlands",
		source: [["SRD", 212], ["D", 156]],
		type: "wondrous item",
		rarity: "uncommon",
		magicItemTable : "F",
		description: "While wearing these boots, I have resistance to cold damage and I ignore difficult terrain created by ice or snow. I can tolerate temperatures as low as −50 degrees Fahrenheit without any additional protection. If I wear heavy clothes, I can tolerate temperatures as low as −100 degrees Fahrenheit.",
		descriptionFull : "These furred boots are snug and feel quite warm. While you wear them, you gain the following benefits:\n\u25C6 You have resistance to cold damage.\n\u25C6 You ignore difficult terrain created by ice or snow.\n\u25C6 You can tolerate temperatures as low as -50 degrees Fahrenheit without any additional protection. If you wear heavy clothes, you can tolerate temperatures as low as -100 degrees Fahrenheit.",
		attunement: true,
		dmgres: ["Cold"],
	},
	"bowl of commanding water elementals": {
		// Transcribed by AelarTheElfRogue
		name: "Bowl of Commanding Water Elementals",
		source: [["SRD", 212], ["D", 156]],
		type: "wondrous item",
		rarity: "rare",
		magicItemTable : "G",
		description: "While this bowl is filled with water, I can speak the bowl's command word as an action and summon a water elemental, as if I had cast Conjure Elemental. The bowl can't be used again until the next dawn. The bowl is about 1 foot in diameter and half as deep, and holds about 3 gallons of water.",
		descriptionFull: "While this bowl is filled with water, you can use an action to speak the bowl's command word and summon a water elemental, as if you had cast the Conjure Elemental spell. The bowl can't be used this way again until the next dawn.\n   The bowl is about 1 foot in diameter and half as deep. It weighs 3 pounds and holds about 3 gallons.",
		weight: 3,
		limfeaname : "Summon Water Elemental",
		usages : 1, 
		recovery : "dawn",
		action : ["action", ""],
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
	"brazier of commanding fire elementals": {
		// Transcribed by AelarTheElfRogue
		name: "Brazier of Commanding Fire Elementals",
		source: [["SRD", 212], ["D", 156]],
		type: "wondrous item",
		rarity: "rare",
		magicItemTable : "G",
		description: "While a fire burns in this brass brazier, I can use an action to speak the brazier's command word and summon a fire elemental, as if I had cast the Conjure Elemental spell. The brazier can't be used this way again until the next dawn.",
		descriptionFull: "While a fire burns in this brass brazier, you can use an action to speak the brazier's command word and summon a fire elemental, as if you had cast the Conjure Elemental spell. The brazier can't be used this way again until the next dawn.\n   The brazier weighs 5 pounds.",
		weight: 5,
		limfeaname : "Summon Fire Elemental",
		usages : 1, 
		recovery : "dawn",
		action : ["action", ""],
	},
	"brooch of shielding": {
		// Transcribed by Smashman
		name: "Brooch of Shielding",
		source: [["SRD", 212], ["D", 156]],
		type: "wondrous item",
		rarity: "uncommon",
		description: "While wearing this brooch, I have resistance to force damage, and have immunity to damage from the Magic Missile spell.",
		descriptionFull: "While wearing this brooch, you have resistance to force damage, and you have immunity to damage from the Magic Missile spell.",
		attunement: true,
		dmgres: ["Force"],
		savetxt: {
			immune: ["damage from the Magic Missile spell"]
		}
	},
	"cape of the mountebank": {
		// Transcribed by Smashman
		name: "Cape of the Mountebank",
		source: [["SRD", 213], ["D", 157]],
		type: "wondrous item",
		rarity: "rare",
		description: "While wearing this cape, I can use it to cast the Dimension Door spell as an action. This property of the cape can't be used again until the next dawn. The cape smells faintly of brimstone. When I disappear, smoke lightly obscures the place that I left and the place that I appear, which dissipates at the end of my next turn.",
		descriptionFull: "This cape smells faintly of brimstone. While wearing it, you can use it to cast the Dimension Door spell as an action. This property of the cape can't be used again until the next dawn.\n   When you disappear, you leave behind a cloud of smoke, and you appear in a similar cloud of smoke at your destination. The smoke lightly obscures the space you left and the space you appear in, and it dissipates at the end of your next turn. A light or stronger wind disperses the smoke.",
		action: [["action", " (Dimension Door)"]],
		usages: 1,
		spellcastingBonus : [{
			name: "Cape of the Mountebank",
			spells: ["dimension door"],
			selection: ["dimension door"]
		}]
	},
	"carpet of flying": {
		// Transcribed by AelarTheElfRogue
		name: "Carpet of Flying",
		source: [["SRD", 213], ["D", 157]],
		type: "wondrous item",
		rarity: "very rare",
		magicItemTable : "H",
		description: "I can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to my spoken directions if I am within 30 feet of it. A carpet can carry up to twice the weight shown on the table, but it flies at half speed if it carries more than its normal capacity.",
		descriptionFull: "You can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to your spoken directions, provided that you are within 30 feet of it.\n Four sizes of carpet of flying exist. The DM chooses the size of a given carpet or determines it randomly.\n A carpet can carry up to twice the weight shown on the table, but it flies at half speed if it carries more than its normal capacity.",
		action : ["action", " (Fly)"],
		choices : ["3 ft. \xD7 5 ft.", "4 ft. \xD7 6 ft.", "5 ft. \xD7 7 ft.", "6 ft. \xD7 9 ft."],
		"3 ft. \xD7 5 ft." : {
			description: "I can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to my spoken directions if I am within 30 feet of it. A 3 \xD7 5 ft. carpet can carry up to 200lbs at a fly speed of 80 feet. A carpet can carry up to twice its weight, but flies at half speed if it carries >200lbs.",
			descriptionFull: "You can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to your spoken directions, provided that you are within 30 feet of it.\n   A 3 ft. \xD7 5 ft. carpet can carry up to 200 lb. at a fly speed of 80 feet. A carpet can carry up to twice this weight, but it flies at half speed if it carries more than its normal capacity.",
		},
		"4 ft. \xD7 6 ft." : {
			description: "I can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to my spoken directions if I am within 30 feet of it. A 4\xD7x 6 ft. carpet can carry up to 400 lb. at a fly speed of 60 feet. A carpet can carry up to twice this weight, but flies at half speed if it carries >400lbs.",
			descriptionFull: "You can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to your spoken directions, provided that you are within 30 feet of it.\n   A 4 ft. \xD7 6 ft. carpet can carry up to 400 lb. at a fly speed of 60 feet. A carpet can carry up to twice this weight, but it flies at half speed if it carries more than its normal capacity.",
		},
		"5 ft. \xD7 7 ft." : {
			description: "I can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to my spoken directions if I am within 30 feet of it. A 5 \xD7 7 ft. carpet can carry up to 600lbs at a fly speed of 40 feet. A carpet can carry up to twice this weight, but flies at half speed if it carries >600lbs.",
			descriptionFull: "You can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to your spoken directions, provided that you are within 30 feet of it.\n   A 5 ft. \xD7 7 ft. carpet can carry up to 600 lb. at a fly speed of 40 feet. A carpet can carry up to twice this weight, but it flies at half speed if it carries more than its normal capacity.",
		},
		"6 ft. \xD7 9 ft." : {
			description: "I can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to my spoken directions if I am within 30 feet of it. A 6 \xD7 9 ft. carpet can carry up to 800lbs at a fly speed of 30 feet. A carpet can carry up to twice this weight, but flies at half speed if it carries >800lbs.",
			descriptionFull: "You can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to your spoken directions, provided that you are within 30 feet of it.\n   A 6 ft. \xD7 9 ft. carpet can carry up to 800 lb. at a fly speed of 30 feet. A carpet can carry up to twice this weight, but it flies at half speed if it carries more than its normal capacity.",
		},
	},
	"censer of controlling air elementals": {
		// Transcribed by AelarTheElfRogue
		name: "Censer of Controlling Air Elementals",
		source: [["SRD", 213], ["D", 158]],
		type: "wondrous item",
		rarity: "rare",
		magicItemTable : "G",
		description: "While incense is burning in this censer, I can speak the censer's command word as an action and summon an air elemental, as if I had cast Conjure Elemental. The censer can't be used this way again until the next dawn. This 6\" wide, 1' high vessel resembles a chalice with a decorated lid.",
		descriptionFull: "While incense is burning in this censer, you can use an action to speak the censer's command word and summon an air elemental, as if you had cast the Conjure Elemental spell. The censer can't be used this way again until the next dawn.\n   This 6-inch-wide, 1-foot-high vessel resembles a chalice with a decorated lid. It weighs 1 pound.",
		weight: 1,
		limfeaname : "Summon Air Elemental",
		usages : 1, 
		recovery : "dawn",
		action : ["action", ""],
	},
	"chime of opening": {
		// Transcribed by AelarTheElfRogue
		name: "Chime of Opening",
		source: [["SRD", 213], ["D", 158]],
		type: "wondrous item",
		rarity: "rare",
		magicItemTable : "C",
		description: "I can strike this as an action, pointing it at an object within 120 ft of me that can be opened (i.e. door, lid, lock). One lock or latch on it opens unless the sound can't reach it. If no locks or latches remain, the object itself opens. The chime can be used ten times. After the tenth time it cracks and becomes useless.",
		descriptionFull: "This hollow metal tube measures about 1 foot long and weighs 1 pound. You can strike it as an action, pointing it at an object within 120 feet of you that can be opened, such as a door, lid, or lock. The chime issues a clear tone, and one lock or latch on the object opens unless the sound can't reach the object. If no locks or latches remain, the object itself opens.\n   The chime can be used ten times. After the tenth time it cracks and becomes useless.",
		weight: 1,
		action : ["action", " (Unlock Object)"],
		usages : 10,
	},
	"cloak of displacement": {
		// Transcribed by Smashman
		name: "Cloak of Displacement",
		source: [["SRD", 214], ["D", 158]],
		type: "wondrous item",
		rarity: "rare",
		description: "While I wear this cloak, creatures have disadvantage on attack rolls against me. If I take damage the property ceases to function until the start of my next turn. The property is suppressed while I am incapacitated, restrained or otherwise unable to move.",
		descriptionFull: "While you wear this cloak, it projects an illusion that makes you appear to be standing in a place near your actual location, causing any creature to have disadvantage on attack rolls against you. If you take damage, the property ceases to function until the start of your next turn. This property is suppressed while you are incapacitated, restrained, or otherwise unable to move.",
		attunement: true
	},
	"crystal ball" : {
		// Transcribed by AelarTheElfRogue and morepurplemorebetter
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
		},
		choices : ["Crystal Ball ", "Crystal Ball of Mind Reading", "Crystal Ball of Telepathy", "Crystal Ball of True Seeing"],
		"crystal ball " : {
			name : "Crystal Ball ",
		},
		"crystal ball of mind reading" : {
			name : "Crystal Ball of Mind Reading",
			rarity : "legendary",
			magicItemTable : "I",
			description : "I can cast Scrying (DC 17) while touching this crystal ball. I can also cast Detect Thoughts (DC 17) while scrying with the crystal ball, targeting creatures I can see within 30 feet of the spell's sensor. I don't need to concentrate on this detect thoughts, but it ends if scrying ends.",
			descrtiptionFull : "This crystal ball is about 6 inches in diameter. While touching it, you can cast the scrying spell (save DC 17) with it.\n You can use an action to cast the detect thoughts spell (save DC 17) while you are scrying with the crystal ball, targeting creatures you can see within 30 feet of the spell's sensor. You don't need to concentrate on this detect thoughts to maintain it during its duration, but it ends if scrying ends.",
			spellcastingBonus : {
				name : "DC 17",
				spells : ["detect thoughts"],
				selection : ["detect thoughts"],
			},
		},
		"crystal ball of telepathy" : { 
			name : "Crystal Ball of Telepathy",
			rarity : "legendary",
			magicItemTable : "I",
			description : "I can cast Scrying (DC 17) while touching this crystal ball. While scrying gain telepathy within 30 ft of the spell's sensor. Once per dawn, I can also cast Suggestion (DC 17) while scrying through the sensor on one creature within range. I don't need to concentrate on this suggestion, but it ends if scrying ends.",
			descriptionFull : "This crystal ball is about 6 inches in diameter. While touching it, you can cast the scrying spell (save DC 17) with it.\n While scrying with the crystal ball, you can communicate telepathically with creatures you can see within 30 feet of the spell's sensor. You can also use an action to cast the suggestion spell (save DC 17) through the sensor on one of those creatures. You don't need to concentrate on this suggestion to maintain it during its duration, but it ends if scrying ends. Once used, the suggestion power of the crystal ball can't be used again until the next dawn.",
			languageProfs : ["Telepathy 30ft. (While Scrying)"],
			spellcastingBonus : {
				name : "DC 17",
				spells : ["suggestion"],
				selection : ["suggestion"],
			},
		},
		"crystal ball of true seeing" : {
			name : "Crystal Ball of True Seeing",
			rarity : "legendary",
			magicItemTable : "I",
			description : "I can cast Scrying (DC 17) while touching this crystal ball. While scrying, I have truesight with a radius of 120 feet centered on the spell's sensor.",
			descrtiptionFull : "This crystal ball is about 6 inches in diameter. While touching it, you can cast the scrying spell (save DC 17) with it.\n While scrying with the crystal ball, you have truesight with a radius of 120 feet centered on the spell's sensor.",
			vision : [["True Sight (while Scrying with Crystal Ball)", 120]],
		}
	},
	"dragon scale mail": {
		// Transcribed by AelarTheElfRogue
		name : "Dragon Scale Mail",
		source : [["SRD", 219], ["D", 165]],
		type : "armor (scale mail)",
		rarity : "very rare",
		attunement : true,
		weight : 45,
		allowDuplicates : false,
		magicItemTable : "H",
		description : "While wearing this armor, I gain a resistance to a damage type, +1 bonus to AC and advantage on saving throws against the Frightful Presence and breath weapons of dragons. As an action, I can magically discern the distance and direction to the closest dragon of the same type within 30 miles of me, once per dawn.",
		descriptionFull: "Dragon scale mail is made of the scales of one kind of dragon. Sometimes dragons collect their cast-off scales and gift them to humanoids. Other times, hunters carefully skin and preserve the hide of a dead dragon. In either case, dragon scale mail is highly valued. While wearing this armor, you gain a +1 bonus to AC, you have advantage on saving throws against the Frightful Presence and breath weapons of dragons, and you have resistance to one damage type that is determined by the kind of dragon that provided the scales\n   Additionally, you can focus your senses as an action to magically discern the distance and direction to the closest dragon within 30 miles of you that is of the same type as the armor. This special action can't be used again until the next dawn.",
		savetxt : {
			adv_vs : ["Dragon's Frightful Presence", "Dragon's Breath"],
		},
		addArmor : "Dragon Scale Mail",
		armorOptions : {
			regExpSearch : /^(?=.*dragon)(?=.*(scale))(?=.*mail).*$/i,
			name : "Dragon Scale Mail",
			source : [["SRD", 219], ["D", 165]],
			type : "medium",
			ac : 15, // 1 more AC than normal scale mail because of the +1 magical bonus
			weight : 45,
			stealthdis : true,
		},
		choices : ["Black", "Blue", "Brass", "Bronze", "Copper", "Gold", "Green", "Red", "Silver", "White"],
		"black" : {
			name : "Dragon Scale Mail, Black",
			description : "While wearing this armor, I gain a +1 bonus to AC, resistance to acid damage, and advantage on saving throws against the Frightful Presence and breath weapons of dragons. As an action, I can magically discern the distance and direction to the closest black dragon within 30 miles of me, once per dawn.",
			dmgres: ["Acid"],
			limfeaname : "Detect Black Dragon",
			action : ["action", " (Dragon Scale Mail)"],
			usages : 1,
			recovery : "dawn",
		},
		"blue" : {
			name : "Dragon Scale Mail, Blue",
			description : "While wearing this armor, I gain a +1 bonus to AC, resistance to lightning damage, and advantage on saving throws against the Frightful Presence and breath weapons of dragons. As an action, I can magically discern the distance and direction to the closest blue dragon within 30 miles of me, once per dawn.",
			dmgres: ["Lightning"],
			limfeaname : "Detect Blue Dragon",
			action : ["action", " (Dragon Scale Mail)"],
			usages : 1,
			recovery : "dawn",
		},
		"brass" : {
			name : "Dragon Scale Mail, Brass",
			description : "While wearing this armor, I gain a +1 bonus to AC, resistance to fire damage, and advantage on saving throws against the Frightful Presence and breath weapons of dragons. As an action, I can magically discern the distance and direction to the closest brass dragon within 30 miles of me, once per dawn.",
			dmgres: ["Fire"],
			limfeaname : "Detect Brass Dragon",
			action : ["action", " (Dragon Scale Mail)"],
			usages : 1,
			recovery : "dawn",
		},
		"bronze" : {
			name : "Dragon Scale Mail, Black",
			description : "While wearing this armor, I gain a +1 bonus to AC, resistance to lightning damage, and advantage on saving throws against the Frightful Presence and breath weapons of dragons. As an action, I can magically discern the distance and direction to the closest bronze dragon within 30 miles of me, once per dawn.",
			dmgres: ["Lightning"],
			limfeaname : "Detect Bronze Dragon",
			action : ["action", " (Dragon Scale Mail)"],
			usages : 1,
			recovery : "dawn",
		},
		"copper" : {
			name : "Dragon Scale Mail, Copper",
			description : "While wearing this armor, I gain a +1 bonus to AC, resistance to acid damage, and advantage on saving throws against the Frightful Presence and breath weapons of dragons. As an action, I can magically discern the distance and direction to the closest copper dragon within 30 miles of me, once per dawn.",
			dmgres: ["Acid"],
			limfeaname : "Detect Copper Dragon",
			action : ["action", " (Dragon Scale Mail)"],
			usages : 1,
			recovery : "dawn",
		},
		"gold" : {
			name : "Dragon Scale Mail, Gold",
			description : "While wearing this armor, I gain a +1 bonus to AC, resistance to fire damage, and advantage on saving throws against the Frightful Presence and breath weapons of dragons. As an action, I can magically discern the distance and direction to the closest gold dragon within 30 miles of me, once per dawn.",
			dmgres: ["Fire"],
			limfeaname : "Detect Gold Dragon",
			action : ["action", " (Dragon Scale Mail)"],
			usages : 1,
			recovery : "dawn",
		},
		"green" : {
			name : "Dragon Scale Mail, Green",
			description : "While wearing this armor, I gain a +1 bonus to AC, resistance to poison damage, and advantage on saving throws against the Frightful Presence and breath weapons of dragons. As an action, I can magically discern the distance and direction to the closest green dragon within 30 miles of me, once per dawn.",
			dmgres: ["Poison"],
			limfeaname : "Detect Green Dragon",
			action : ["action", " (Dragon Scale Mail)"],
			usages : 1,
			recovery : "dawn",
		},
		"red" : {
			name : "Dragon Scale Mail, Red",
			description : "While wearing this armor, I gain a +1 bonus to AC, resistance to fire damage, and advantage on saving throws against the Frightful Presence and breath weapons of dragons. As an action, I can magically discern the distance and direction to the closest red dragon within 30 miles of me, once per dawn.",
			dmgres: ["Fire"],
			limfeaname : "Detect Red Dragon",
			action : ["action", " (Dragon Scale Mail)"],
			usages : 1,
			recovery : "dawn",
		},
		"silver" : {
			name : "Dragon Scale Mail, Silver",
			description : "While wearing this armor, I gain a +1 bonus to AC, resistance to cold damage, and advantage on saving throws against the Frightful Presence and breath weapons of dragons. As an action, I can magically discern the distance and direction to the closest silver dragon within 30 miles of me, once per dawn.",
			dmgres: ["Cold"],
			limfeaname : "Detect Silver Dragon",
			action : ["action", " (Dragon Scale Mail)"],
			usages : 1,
			recovery : "dawn",
		},
		"white" : {
			name : "Dragon Scale Mail, White",
			description : "While wearing this armor, I gain a +1 bonus to AC, resistance to cold damage, and advantage on saving throws against the Frightful Presence and breath weapons of dragons. As an action, I can magically discern the distance and direction to the closest white dragon within 30 miles of me, once per dawn.",
			dmgres: ["Cold"],
			limfeaname : "Detect White Dragon",
			action : ["action", " (Dragon Scale Mail)"],
			usages : 1,
			recovery : "dawn",
		}
	},
	"dust of disappearance": {
		// Transcribed by AelarTheElfRogue
		name: "Dust of Disappearance",
		source: [["SRD", 219], ["D", 166]],
		type: "wondrous item",
		rarity: "uncommon",
		magicItemTable : "B",
		description: "There is enough dust for one use. When I throw the dust into the air as action, me and each creature and object within 10 feet of me become invisible for 2d4 minutes. The duration is the same for all subjects. If a creature affected by the dust attacks or casts a spell, the invisibility ends for that creature.",
		descriptionFull: "Found in a small packet, this powder resembles very fine sand. There is enough of it for one use. When you use an action to throw the dust into the air, you and each creature and object within 10 feet of you become invisible for 2d4 minutes. The duration is the same for all subjects, and the dust is consumed when its magic takes effect. If a creature affected by the dust attacks or casts a spell, the invisibility ends for that creature.",
		action : ["action", " (Throw Dust)"],
		usages : 1,
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
	"efreeti bottle": {
		// Transcribed by AelarTheElfRogue
		name : "Efreeti Bottle",
		source: [["SRD", 220], ["D", 167]],
		type: "wondrous item",
		rarity: "very rare",
		magicItemTable : "H",
		description: "When I use an action to remove the stopper, a cloud of thick smoke flows out of the bottle. At the end of my turn, an efreeti appears in an unoccupied space within 30 feet of me. The first time the bottle is opened, the DM rolls to determine what happens.",
		descriptionFull: "This painted brass bottle weighs 1 pound. When you use an action to remove the stopper, a cloud of thick smoke flows out of the bottle. At the end of your turn, the smoke disappears with a flash of harmless fire, and an efreeti appears in an unoccupied space within 30 feet of you.\n   The first time the bottle is opened, the DM rolls to determine what happens.\n\n" + toUni("d100") + "\t" + toUni("Effect") + "\n01-10\tThe efreeti attacks you. After fighting for 5 rounds, the efreeti disappears, and the bottle loses its magic.\n11-90\tThe efreeti serves you for 1 hour, doing as you command. Then the efreeti returns to the bottle, and a new stopper contains it. The stopper can't be removed for 24 hours. The next two times the bottle is opened, the same effect occurs. If the bottle is opened a fourth time, the efreeti escapes and disappears, and the bottle loses its magic.\n91-00\tThe efreeti can cast the Wish spell three times for you. It disappears when it grants the final wish or after 1 hour, and the bottle loses its magic.",
		weight: 1,
		limfeaname : "Summon Efreeti",
		usages : 1, 
		action : ["action", " (Efreeti Bottle)"],
	},
	"elemental gem": {
		// Transcribed by AelarTheElfRogue
		name: "Elemental Gem",
		source: [["SRD", 220], ["D", 167]],
		type: "wondrous item",
		rarity: "uncommon",
		magicItemTable : "B",
		description: "This gem contains a mote of elemental energy. When I use an action to break the gem, an elemental is summoned as if I had cast the Conjure Elemental spell, and the gem's magic is lost. The type of gem determines the elemental summoned by the spell.",
		descriptionFull: "This gem contains a mote of elemental energy. When you use an action to break the gem, an elemental is summoned as if you had cast the Conjure Elemental spell, and the gem's magic is lost. The type of gem determines the elemental summoned by the spell.",
		choices : ["Blue Sapphire", "Emerald", "Red Corundum", "Yellow Diamond"],
		"blue sapphire" : {
			description: "This gem contains a mote of elemental energy. When I use an action to break the gem, an air elemental is summoned as if I had cast the Conjure Elemental spell, and the gem's magic is lost.",
			descriptionFull: "This gem contains a mote of elemental energy. When you use an action to break the gem, an air elemental is summoned as if you had cast the Conjure Elemental spell, and the gem's magic is lost.",
			limfeaname : "Summon Air Elemental",
			usages : 1, 
			action : ["action", " (Elemental Gem)"]
		},
		"emerald" : {
			description: "This gem contains a mote of elemental energy. When I use an action to break the gem, a water elemental is summoned as if I had cast the Conjure Elemental spell, and the gem's magic is lost.",
			descriptionFull: "This gem contains a mote of elemental energy. When you use an action to break the gem, a water elemental is summoned as if you had cast the Conjure Elemental spell, and the gem's magic is lost.",
			limfeaname : "Summon Water Elemental",
			usages : 1, 
			action : ["action", " (Elemental Gem)"]
		},
		"red corundum" : {
			description: "This gem contains a mote of elemental energy. When I use an action to break the gem, a fire elemental is summoned as if I had cast the Conjure Elemental spell, and the gem's magic is lost.",
			descriptionFull: "This gem contains a mote of elemental energy. When you use an action to break the gem, a fire elemental is summoned as if you had cast the Conjure Elemental spell, and the gem's magic is lost.",
			limfeaname : "Summon Fire Elemental",
			usages : 1, 
			action : ["action", " (Elemental Gem)"]
		},
		"yellow diamond" : {
			description: "This gem contains a mote of elemental energy. When I use an action to break the gem, an earth elemental is summoned as if I had cast the Conjure Elemental spell, and the gem's magic is lost.",
			descriptionFull: "This gem contains a mote of elemental energy. When you use an action to break the gem, an earth elemental is summoned as if you had cast the Conjure Elemental spell, and the gem's magic is lost.",
			limfeaname : "Summon Earth Elemental",
			usages : 1, 
			action : ["action", " (Elemental Gem)"]
		},
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
	"gloves of missile snaring": {
		// Transcribed by AelarTheElfRogue
		name: "Gloves of Missile Snaring",
		source: [["SRD", 224], ["D", 172]],
		type: "wondrous item",
		rarity: "uncommon",
		magicItemTable : "F",
		description: "When a ranged weapon attack hits me while I'm wearing them, I can use your reaction to reduce the damage by 1d10 + my Dexterity modifier, provided that I have a free hand. If I reduce the damage to 0, I can catch the missile if it is small enough for me to hold in that hand.",
		descriptionLong : "These gloves seem to almost meld into my hands when I don them. When a ranged weapon attack hits me while I'm wearing them, I can use your reaction to reduce the damage by 1d10 + my Dexterity modifier, provided that I have a free hand. If I reduce the damage to 0, I can catch the missile if it is small enough for me to hold in that hand.",
		descriptionFull: "These gloves seem to almost meld into your hands when you don them. When a ranged weapon attack hits you while you're wearing them, you can use your reaction to reduce the damage by 1d10 + your Dexterity modifier, provided that you have a free hand. If you reduce the damage to 0, you can catch the missile if it is small enough for you to hold in that hand.",
		attunement: true,
		action : ["reaction", " (Catch Missle)"]
	},
	"gloves of swimming and climbing": {
		// Transcribed by AelarTheElfRogue
		name: "Gloves of Swimming and Climbing",
		source: [["SRD", 224], ["D", 172]],
		type: "wondrous item",
		rarity: "uncommon",
		magicItemTable : "H",
		description: "While wearing these gloves, climbing and swimming don't cost me extra movement, and I gain a +5 bonus to Strength (Athletics) checks made to climb or swim.",
		descriptionFull: "While wearing these gloves, climbing and swimming don't cost you extra movement, and you gain a +5 bonus to Strength (Athletics) checks made to climb or swim.",
		attunement: true
	},
	"goggles of night": {
		// Transcribed by AelarTheElfRogue
		name: "Goggles of Night",
		source: [["SRD", 224], ["D", 172]],
		type: "wondrous item",
		rarity: "uncommon",
		magicItemTable : "B",
		description: "While wearing these dark lenses, I have darkvision out to a range of 60 feet. If I already have darkvision. wearing the goggles increases its range by 60 feet.",
		descriptionFull: "While wearing these dark lenses, you have darkvision out to a range of 60 feet. If you already have darkvision. wearing the goggles increases its range by 60 feet.",
		vision : [["Darkvision", "fixed60"], ["Darkvision", "+60"]]
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
	"immovable rod": {
		// Transcribed by AelarTheElfRogue
		name: "Immovable Rod",
		source: [["SRD", 226], ["D", 175]],
		type: "Rod",
		rarity: "uncommon",
		magicItemTable : "B",
		description: "This flat iron rod has a button on one end. I can use an action to press the button, magically fixing the rod in place. The rod can hold up to 8,000 pounds of weight. More weight causes the rod to deactivate and fall. A creature can use an action to make a DC 30 Strength check, moving the rod up to 10 feet on a success",
		descriptionLong : "This flat iron rod has a button on one end. I can use an action to press the button, which causes the rod to become magically fixed in place. Until I or another creature uses an action to push the button again, the rod doesn't move, even if it is defying gravity. The rod can hold up to 8,000 pounds of weight. More weight causes the rod to deactivate and fall. A creature can use an action to make a DC 30 Strength check, moving the fixed rod up to 10 feet on a success",
		descriptionFull: "This flat iron rod has a button on one end. You can use an action to press the button, which causes the rod to become magically fixed in place. Until you or another creature uses an action to push the button again, the rod doesn't move, even if it is defying gravity. The rod can hold up to 8,000 pounds of weight. More weight causes the rod to deactivate and fall. A creature can use an action to make a DC 30 Strength check, moving the fixed rod up to 10 feet on a success",
		weight: 2,
		action : ["action", " (Activate/Deactivate)"],
	},
	"oil of etherealness": {
		// Transcribed by AelarTheElfRogue
		name: "Oil of Etherealness",
		source: [["SRD", 231], ["D", 183]],
		type: "Potion",
		rarity: "rare",
		magicItemTable : "C",
		description: "This oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of the Etherealness spell for 1 hour.",
		descriptionFull: "Beads of this cloudy gray oil form on the outside of its container and quickly evaporate. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of the Etherealness spell for 1 hour.",
		weight: 0.5

	},
	"oil of sharpness": {
		// Transcribed by AelarTheElfRogue
		name: "Oil of Sharpness",
		source: [["SRD", 232], ["D", 184]],
		type: "Potion",
		rarity: "very rare",
		magicItemTable : "D",
		description: "This clear, gelatinous oil sparkles with tiny, ultrathin silver shards. The oil can coat one slashing or piercing weapon or up to 5 pieces of slashing or piercing ammunition. Applying the oil takes 1 minute. For 1 hour, the coated item is magical and has a +3 bonus to attack and damage rolls.",
		descriptionFull: "This clear, gelatinous oil sparkles with tiny, ultrathin silver shards. The oil can coat one slashing or piercing weapon or up to 5 pieces of slashing or piercing ammunition. Applying the oil takes 1 minute. For 1 hour, the coated item is magical and has a +3 bonus to attack and damage rolls.",
		weight: 0.5
	},
	"oil of slipperiness": {
		// Transcribed by AelarTheElfRogue
		name: "Oil of Slipperiness",
		source: [["SRD", 232], ["D", 184]],
		type: "Potion",
		rarity: "uncommon",
		magicItemTable : "B",
		description: "This oil can cover a Medium or smaller creature, along with its equipment. The affected creature then gains the effect of a Freedom of Movement spell for 8 hours. The oil can be poured on the ground as an action, where it covers a 10-foot square, duplicating the effect of the Grease spell in that area for 8 hours.",
		descriptionLong : "This sticky black unguent is thick and heavy in the container, but it flows quickly when poured. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of a Freedom of Movement spell for 8 hours. Alternatively, the oil can be poured on the ground as an action, where it covers a 10-foot square, duplicating the effect of the Grease spell in that area for 8 hours.",
		descriptionFull: "This sticky black unguent is thick and heavy in the container, but it flows quickly when poured. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of a Freedom of Movement spell for 8 hours.\n   Alternatively, the oil can be poured on the ground as an action, where it covers a 10-foot square, duplicating the effect of the Grease spell in that area for 8 hours.",
		weight: 0.5
	},
	"pearl of power": {
		// Transcribed by AelarTheElfRogue
		name: "Pearl of Power",
		source: [["SRD", 232], ["D", 184]],
		type: "wondrous item",
		rarity: "uncommon",
		magicItemTable : "F",
		description: "While this pearl is on my person, I can use an action to speak its command word and regain one expended spell slot. If the expended slot was of 4th level or higher, the new slot is 3rd level. Once I have used the pearl, it can't be used again until the next dawn.",
		descriptionFull: "While this pearl is on your person, you can use an action to speak its command word and regain one expended spell slot. If the expended slot was of 4th level or higher, the new slot is 3rd level. Once you have used the pearl, it can't be used again until the next dawn.",
		attunement: true,
		recovery : "dawn",
		usages : 1,
		action : ["action", " (Regain Spell Slot)"],
	},
	"periapt of health": {
		// Transcribed by AelarTheElfRogue
		name: "Periapt of Health",
		source: [["SRD", 232], ["D", 184]],
		type: "wondrous item",
		rarity: "uncommon",
		magicItemTable : "C",
		description: "I am immune to contracting any disease while I wear this pendant. If I am already infected with a disease, the effects of the disease are suppressed while I wear the pendant.",
		descriptionFull: "You are immune to contracting any disease while you wear this pendant. If you are already infected with a disease, the effects of the disease are suppressed while you wear the pendant.",
		weight: 1,
		savetxt : { immune : ["disease"]},
	},
	"periapt of proof against poison": {
		// Transcribed by AelarTheElfRogue
		name: "Periapt of Proof Against Poison",
		source: [["SRD", 232], ["D", 184]],
		type: "wondrous item",
		rarity: "rare",
		magicItemTable : "G",
		description: "This delicate silver chain has a brilliant-cut black gem pendant. While I wear it, poisons have no effect on me. I am immune to the poisoned condition and have immunity to poison damage.",
		descriptionFull: "This delicate silver chain has a brilliant-cut black gem pendant. While you wear it, poisons have no effect on you. You are immune to the poisoned condition and have immunity to poison damage.",
		weight: 1,
		savetxt : { immune : ["poison"]},
	},
	"periapt of wound closure": {
		// Transcribed by AelarTheElfRogue
		name: "Periapt of Wound Closure",
		source: [["SRD", 232], ["D", 184]],
		type: "wondrous item",
		rarity: "uncommon",
		magicItemTable : "F",
		description: "While I wear this pendant, I stabilize whenever I am dying at the start of my turn. In addition, whenever I roll a Hit Die to regain hit points, double the number of hit points it restores.",
		descriptionFull: "While you wear this pendant, you stabilize whenever you are dying at the start of your turn. In addition, whenever you roll a Hit Die to regain hit points, double the number of hit points it restores.",
		attunement: true,
		weight: 1
	},
	"philter of love": {
		// Transcribed by AelarTheElfRogue
		name: "Philter of Love",
		source: [["SRD", 232], ["D", 184]],
		type: "Potion",
		rarity: "uncommon",
		magicItemTable : "B",
		description: "The next time I see a creature within 10 minutes after drinking this philter, I become charmed by that creature for 1 hour. If the creature is of a species and gender I am normally attracted to, I regard it as my true love while I am charmed. ",
		descriptionFull: "The next time you see a creature within 10 minutes after drinking this philter, you become charmed by that creature for 1 hour. If the creature is of a species and gender you are normally attracted to, you regard it as your true love while you are charmed. This potion's rose-hued, effervescent liquid contains one easy-to-miss bubble shaped like a heart.",
		weight: 0.5
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
	"stone of controlling earth elementals": {
		// Transcribed by AelarTheElfRogue
		name: "Stone of Controlling Earth Elementals",
		source: [["SRD", 246], ["D", 205]],
		type: "wondrous item",
		rarity: "rare",
		magicItemTable : "G",
		description: "While this stone touches the ground, I can use an action to speak the stone's command word and summon a earth elemental, as if I had cast the Conjure Elemental spell. The stone can't be used this way again until the next dawn.",
		descriptionFull: "If the stone is touching the ground, you can use an action to speak its command word and summon an earth elemental, as if you had cast the Conjure Elemental spell. The stone can't be used this way again until the next dawn. The stone weighs 5 pounds.",
		weight: 5,
		limfeaname : "Summon Earth Elemental",
		usages : 1, 
		recovery : "dawn",
		action : ["action", ""],
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
				'If I include the words "of Wounding" in a the name of a sword, it will be treated as the magic weapon Sword of Wounding. ????'
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