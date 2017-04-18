var RaceList = {
	"aarakocra" : {
		regExpSearch : /aarakocra/i,
		name : "Aarakocra",
		source : ["E", 5],
		plural : "Aarakocra",
		size : 3,
		speed : ["25 ft\n50 ft fly", 15],
		languages : ["Common", "Aarakocra", "Auran"],
		weapons : ["talons"],
		age : " rearch maturity by age 3 and live about 30 years",
		height : " are about 5 feet tall",
		weight : " weigh between 80 and 100 lb",
		heightMetric : " are about 1,5 metres tall",
		weightMetric : " weigh between 36 and 45 kg",
		improvements : "Aarakocra: +2 Dexterity, +1 Wisdom;",
		scores : [0, 2, 0, 0, 1, 0],
		trait : "Aarakocra (+2 Dexterity, +1 Wisdom)\n\nFlight: I have a flying speed of 50 feet. To use this speed, I can't be wearing medium or heavy armor.\n\nTalons: My unarmed strikes deal 1d4 slashing damage on a hit.",
		features : {
			"talons" : {
				name : "Talons",
				minlevel : 1,
				calcChanges : {
					atkAdd : ["if ((/unarmed strike/i).test(WeaponName)) { fields.Damage_Type = 'slashing'; if (fields.Damage_Die == 1) {fields.Damage_Die = '1d4'; }; }; ", "I have talons, which cause my unarmed strikes to deal 1d4 slashing damage."]
				}
			}
		},
	},

	"aasimar" : {
		regExpSearch : /^(?!.*(fallen|protector|scourge))((?=.*aasimar)|((?=.*planetouched)(?=.*(celestial|angel)))).*$/i,
		name : "Aasimar",
		source : ["D", 286],
		plural : "Aasimar",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Celestial"],
		vision : "Darkvision 60 ft",
		dmgres : ["necrotic", "radiant"],
		age : " reach adulthood in their late teens and live around 160 years",
		height : " range from 5 to over 6 feet tall (4'8\" + 2d10\")",
		weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
		heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d10 cm)",
		weightMetric : " weigh around 75 kg (50 + 5d10 \xD7 4d4 / 10 kg)",
		improvements : "Aasimar: +1 Wisdom, +2 Charisma;",
		scores : [0, 0, 0, 0, 1, 2],
		trait : "Aasimar (+1 Wisdom, +2 Charisma)\n\nCelestial Legacy:\n   I know the Light cantrip.\n   Once I reach 3rd level, I can cast the Lesser Restoration spell once per long rest.\n   Once I reach 5th level, I can cast the Daylight spell once per long rest.\n   Charisma is my spellcasting ability for these spells.",
		spellcastingAbility : 6,
		spellcastingBonus : {
			name : "Celestial Legacy (level 1)",
			spells : ["light"],
			selection : ["light"],
			atwill : true,
		},
		features : {
			"lesser restoration" : {
				name : "Lesser Restoration",
				usages : 1,
				minlevel : 3,
				recovery : "long rest",
				tooltip : " (Celestial Legacy)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Celestial Legacy (level 3)",
					spells : ["lesser restoration"],
					selection : ["lesser restoration"],
					oncelr : true,
				},
			},
			"daylight" : {
				name : "Daylight",
				usages : 1,
				minlevel : 5,
				recovery : "long rest",
				tooltip : " (Celestial Legacy)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Celestial Legacy (level 5)",
					spells : ["daylight"],
					selection : ["daylight"],
					oncelr : true,
				},
			}
		}
	},

	"fallen aasimar" : {
		regExpSearch : /^((?=.*aasimar)|((?=.*planetouched)(?=.*(celestial|angel))))(?=.*fallen).*$/i,
		name : "Fallen Aasimar",
		source : ["V", 104],
		plural : "Fallen Aasimar",
		sortname : "Aasimar, Fallen",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Celestial"],
		vision : "Darkvision 60 ft",
		dmgres : ["necrotic", "radiant"],
		age : " reach adulthood in their late teens and live around 160 years",
		height : " range from 5 to over 6 feet tall (4'9\" + 2d8\")",
		weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
		heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)",
		weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
		improvements : "Fallen Aasimar: +1 Strength, +2 Charisma;",
		scores : [1, 0, 0, 0, 0, 2],
		trait : "Fallen Aasimar (+1 Strength, +2 Charisma)" + (typePF ? "\n" : " ") + "Light Bearer: I know the Light cantrip.\nHealing Hands: As an action, once per long rest, I can touch to heal for my level in HP.\nNecrotic Shroud: Once per long rest when I'm 3rd level, I can use an action to transform, causing all within 10 ft of me to make a Cha" + (typePF ? "" : "risma") + " saving throw (DC 8 + Cha mod + Prof bonus) or be frightened of me until the end of my next turn This lasts for 1 minute or until I end it as a bonus action. Once on my turn I can have one of my attacks or spells deals my level in extra necrotic damage to one target.",
		abilitySave : 6,
		spellcastingBonus : {
			name : "Light Bearer",
			spells : ["light"],
			selection : ["light"],
			atwill : true,
		},
		features : {
			"healing hands" : {
				name : "Healing Hands",
				usages : 1,
				minlevel : 1,
				recovery : "long rest",
				additional : ["1 HP", "2 HP", "3 HP", "4 HP", "5 HP", "6 HP", "7 HP", "8 HP", "9 HP", "10 HP", "11 HP", "12 HP", "13 HP", "14 HP", "15 HP", "16 HP", "17 HP", "18 HP", "19 HP", "20 HP"],
				action : ["action", ""],
			},
			"necrotic shroud" : {
				name : "Necrotic Shroud",
				usages : 1,
				minlevel : 3,
				recovery : "long rest",
				additional : ["", "", "+3 damage", "+4 damage", "+5 damage", "+6 damage", "+7 damage", "+8 damage", "+9 damage", "+10 damage", "+11 damage", "+12 damage", "+13 damage", "+14 damage", "+15 damage", "+16 damage", "+17 damage", "+18 damage", "+19 damage", "+20 damage"],
				action : ["action", " (start)"],
				eval : "AddAction(\"bonus action\", \"Necrotic Shroud (end)\", \"being a Fallen Aasimar\");",
				removeeval : "RemoveAction(\"bonus action\", \"Necrotic Shroud (end)\");",
			}
		}
	},

	"protector aasimar" : {
		regExpSearch : /^((?=.*aasimar)|((?=.*planetouched)(?=.*(celestial|angel))))(?=.*protector).*$/i,
		name : "Protector Aasimar",
		source : ["V", 104],
		plural : "Protector Aasimar",
		sortname : "Aasimar, Protector",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Celestial"],
		vision : "Darkvision 60 ft",
		dmgres : ["necrotic", "radiant"],
		age : " reach adulthood in their late teens and live around 160 years",
		height : " range from 5 to over 6 feet tall (4'9\" + 2d8\")",
		weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
		heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)",
		weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
		improvements : "Protector Aasimar: +1 Wisdom, +2 Charisma;",
		scores : [0, 0, 0, 0, 1, 2],
		trait : "Protector Aasimar (+1 Wisdom, +2 Charisma)\nLight Bearer: I know the Light cantrip.\nHealing Hands: As an action, once per long rest, I can touch to heal for my level in HP.\nRadiant Soul: Once per long rest when I'm 3rd level, I can use an action to transform, gaining glimmer in my eyes and two incorporeal wings. For 1 minute or until I end it as a bonus action, I have 30 feet fly speed; once on my turn I can have one of my attacks or spells deal my level in extra radiant damage to one target.",
		spellcastingBonus : {
			name : "Light Bearer",
			spells : ["light"],
			selection : ["light"],
			atwill : true,
		},
		features : {
			"healing hands" : {
				name : "Healing Hands",
				usages : 1,
				minlevel : 1,
				recovery : "long rest",
				additional : ["1 HP", "2 HP", "3 HP", "4 HP", "5 HP", "6 HP", "7 HP", "8 HP", "9 HP", "10 HP", "11 HP", "12 HP", "13 HP", "14 HP", "15 HP", "16 HP", "17 HP", "18 HP", "19 HP", "20 HP"],
				action : ["action", ""],
			},
			"radiant soul" : {
				name : "Radiant Soul",
				usages : 1,
				minlevel : 3,
				recovery : "long rest",
				additional : ["", "", "+3 damage", "+4 damage", "+5 damage", "+6 damage", "+7 damage", "+8 damage", "+9 damage", "+10 damage", "+11 damage", "+12 damage", "+13 damage", "+14 damage", "+15 damage", "+16 damage", "+17 damage", "+18 damage", "+19 damage", "+20 damage"],
				action : ["action", " (start)"],
				eval : "AddAction(\"bonus action\", \"Radiant Soul (end)\", \"being a Protector Aasimar\");",
				removeeval : "RemoveAction(\"bonus action\", \"Radiant Soul (end)\");",
			}
		}
	},

	"scourge aasimar" : {
		regExpSearch : /^((?=.*aasimar)|((?=.*planetouched)(?=.*(celestial|angel))))(?=.*scourge).*$/i,
		name : "Scourge Aasimar",
		source : ["V", 104],
		plural : "Scourge Aasimar",
		sortname : "Aasimar, Scourge",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Celestial"],
		vision : "Darkvision 60 ft",
		dmgres : ["necrotic", "radiant"],
		age : " reach adulthood in their late teens and live around 160 years",
		height : " range from 5 to over 6 feet tall (4'9\" + 2d8\")",
		weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
		heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)",
		weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
		improvements : "Scourge Aasimar: +1 Constitution, +2 Charisma;",
		scores : [0, 0, 1, 0, 0, 2],
		trait : "Scourge Aasimar (+1 Constitution, +2 Charisma)" + (typePF ? "\n" : " ") + "Light Bearer: I know the Light cantrip.\nHealing Hands: As an action, once per long rest, I can touch to heal for my level in HP.\nRadiant Consumption: Once per long rest when I'm 3rd level, I can use an action to radiate bright light in 10-ft radius and dim light for another 10-ft, for 1 minute or until I end it as a bonus action. Once on my turn my attack or spell deals my level in extra radiant damage to one target, and at the end of my turns all creatures within 10 ft of me, including myself, take half my level in radiant damage.",
		spellcastingBonus : {
			name : "Light Bearer",
			spells : ["light"],
			selection : ["light"],
			atwill : true,
		},
		features : {
			"healing hands" : {
				name : "Healing Hands",
				usages : 1,
				minlevel : 1,
				recovery : "long rest",
				additional : ["1 HP", "2 HP", "3 HP", "4 HP", "5 HP", "6 HP", "7 HP", "8 HP", "9 HP", "10 HP", "11 HP", "12 HP", "13 HP", "14 HP", "15 HP", "16 HP", "17 HP", "18 HP", "19 HP", "20 HP"],
				action : ["action", ""],
			},
			"radiant consumption" : {
				name : "Radiant Consumption",
				usages : 1,
				minlevel : 3,
				recovery : "long rest",
				additional : levels.map(function (n) {
					if (n < 3) return ""
					return  Math.ceil(n/2) + "/" + n + " damage";
				}),
				action : ["action", " (start)"],
				eval : "AddAction(\"bonus action\", \"Radiant Consumption (end)\", \"being a Scourge Aasimar\");",
				removeeval : "RemoveAction(\"bonus action\", \"Radiant Consumption (end)\");",
			}
		}
	},
	
	"bugbear" : {
		regExpSearch : /bugbear/i,
		name : "Bugbear",
		source : ["V", 119],
		plural : "Bugbears",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Goblin"],
		vision : "Darkvision 60 ft",
		skills : ["Stealth"],
		age : " rearch adulthood at age 16 and live up to 80 years",
		height : " are between 6 and 8 feet tall (6'0\" + 2d12\")",
		weight : " weigh between 250 and 350 lb (200 + 2d12 \xD7 2d6 lb)",
		heightMetric : " are between 1,9 and 2,4 metres tall (185 + 5d12 cm)",
		weightMetric : " weigh between 115 and 160 kg (90 + 5d12 \xD7 4d6 / 10 kg)",
		improvements : "Bugbear: +2 Strength, +1 Dexterity;",
		scores : [2, 1, 0, 0, 0, 0],
		features : {
			"surprise attack" : {
				name : "Surprise Attack (2d6)",
				minlevel : 1,
				usages : 1,
				recovery : "Combat",
				tooltip : "",
			},
		},
		trait : "Bugbear (+2 Strength, +1 Dexterity)\nPowerful Build: I count as one size larger when determining my carrying capacity and the weight I can push, drag, or lift.\nLong-Limbed: I have an additional 5 feet reach with melee attacks that I make on my turn.\nSurprise Attack: If I hit a surprised creature on my first turn in combat, that attack deals an extra 2d6 damage. I can do this only once per combat.",
		eval : "tDoc.getField('Carrying Capacity Multiplier').value *= 2;",
		removeeval : "tDoc.getField('Carrying Capacity Multiplier').value /= 2;"
	},

	"dragonborn" : {
		regExpSearch : /dragonborn/i,
		name : "Dragonborn",
		source : ["P", 34],
		plural : "Dragonborn",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Draconic"],
		age : " reach adulthood by 15 and live around 80 years",
		height : " stand well over 6 feet tall (5'6\" + 2d8\")",
		weight : " weigh around 240 lb (175 + 2d8 \xD7 2d6 lb)",
		heightMetric : " stand well over 1,8 metres tall (170 + 5d8 cm)",
		weightMetric : " weigh around 110 kg (80 + 5d8 \xD7 4d6 / 10 kg)",
		improvements : "Dragonborn: +2 Strength, +1 Charisma;",
		scores : [2, 0, 0, 0, 0, 1],
		trait : "Dragonborn (+2 Strength, +1 Charisma)\nDraconic Ancestry: Choose one type of dragon using the \"Racial Options\" button. I gain a breath weapon and damage resistance as determined by the dragon type chosen.\nBreath Weapon: Exhale destructive energy as an action with a size, shape, saving throw type, and damage type as found in the table. All in the area must make a saving throw with DC 8 + Con modifier + prof bonus. It does 2d6 (+1d6 at level 6, 11, 16) damage, half as much damage on a successful save. I can use it again after a short rest.",
		abilitySave : 3,
		features : {
			"breath weapon" : {
				name : "Breath Weapon",
				minlevel : 1,
				usages : 1,
				additional : ["2d6", "2d6", "2d6", "2d6", "2d6", "3d6", "3d6", "3d6", "3d6", "3d6", "4d6", "4d6", "4d6", "4d6", "4d6", "5d6", "5d6", "5d6", "5d6", "5d6"],
				recovery : "short rest",
				tooltip : " (Draconic Ancestry)",
				action : ["action", ""]
			}
		},
		variants : ["black", "blue", "brass", "bronze", "copper", "gold", "green", "red", "silver", "white"],
	},

	"gray dwarf" : {
		regExpSearch : /^((?=.*\bduergars?\b)|((?=.*\b(dwarfs?|dwarves|dwarfish|dwarvish|dwarven)\b)(?=.*\b(grey|gray|underdark)\b))).*$/i,
		name : "Duergar",
		sortname : "Dwarf, Gray (Duergar)",
		source : ["S", 104],
		plural : "Duergar",
		size : 3,
		speed : [25, 25],
		languages : ["Common", "Dwarvish", "Undercommon"],
		vision : "Darkvision 120 ft; Sunlight Sensitivity",
		savetxt : "Adv. vs. Poison, illusions, and being charmed or paralyzed",
		dmgres : ["poison"],
		weaponprofs : [false, false, ["battleaxe", "handaxe", "warhammer", "light hammer"]],
		tools : ["smith, brewer, or mason tools"],
		age : " are considered young until they are 50 and live about 350 years",
		height : " stand between 4 and 5 feet tall (3'8\" + 2d4\")",
		weight : " weigh around 150 lb (115 + 2d4 \xD7 2d6 lb)",
		heightMetric : " stand between 1,2 and 1,5 metres tall (110 + 5d4 cm)",
		weightMetric : " weigh around 70 kg (55 + 5d4 \xD7 4d6 / 10 kg)",
		improvements : "Duergar: +2 Constitution, +1 Strength;",
		scores : [1, 0, 2, 0, 0, 0],
		trait : "Duergar (+2 Constitution, +1 Strength)\nStonecunning: Whenever I make an Int (History) check related to the origin of stonework, I am considered proficient in the skill and add double my proficiency bonus to the check.\nSunlight Sensitivity: Disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight when I or what I am trying to attack/perceive is in direct sunlight.\nDuergar Magic: 3rd: Enlarge/Reduce to enlarge; 5th: Invisibility. If not in direct sunlight," + (!typePF ? "\n" : " ") + "I can cast both spells on myself once per long rest without material components, using Int.",
		spellcastingAbility : 4,
		features : {
			"enlarge" : {
				name : "Enlarge (self only)",
				minlevel : 3,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Duergar Magic)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Duergar Magic (level 3)",
					spells : ["enlarge/reduce"],
					selection : ["enlarge/reduce"],
					oncelr : true,
				},
			},
			"invisibility" : {
				name : "Invisibility (self only)",
				minlevel : 5,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Duergar Magic)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Duergar Magic (level 5)",
					spells : ["invisibility"],
					selection : ["invisibility"],
					oncelr : true,
				},
			}
		}
	},

	"hill dwarf" : {
		regExpSearch : /^((?=.*(neidar|klar))|((?=.*\b(dwarfs?|dwarves|dwarfish|dwarvish|dwarven)\b)(?=.*\b(hill|gold)\b))).*$/i,
		name : "Hill dwarf",
		sortname : "Dwarf, Hill",
		source : ["P", 20],
		plural : "Hill dwarves",
		size : 3,
		speed : [25, 25],
		languages : ["Common", "Dwarvish"],
		vision : "Darkvision 60 ft",
		savetxt : "Adv. vs. Poison",
		dmgres : ["poison"],
		weaponprofs : [false, false, ["battleaxe", "handaxe", "warhammer", "light hammer"]],
		tools : ["smith, brewer, or mason tools"],
		age : " are considered young until they are 50 and live about 350 years",
		height : " stand between 4 and 5 feet tall (3'8\" + 2d4\")",
		weight : " weigh around 150 lb (115 + 2d4 \xD7 2d6 lb)",
		heightMetric : " stand between 1,2 and 1,5 metres tall (110 + 5d4 cm)",
		weightMetric : " weigh around 70 kg (55 + 5d4 \xD7 4d6 / 10 kg)",
		improvements : "Hill Dwarf: +2 Constitution, +1 Wisdom;",
		scores : [0, 0, 2, 0, 1, 0],
		trait : "Hill Dwarf (+2 Constitution, +1 Wisdom)\n\nStonecunning: Whenever I make an Intelligence (History) check related to the origin of stonework, I am considered proficient in the History skill and add double my proficiency bonus to the check, instead of my normal proficiency bonus.\n\nDwarven Toughness: My hit point maximum increases by 1 for every level I have.",
		features : {
			"dwarven toughness" : {
				name : "Dwarven Toughness",
				minlevel : 1,
				calcChanges : {
					hp : "extrahp += totalhd; extrastring += \"\\n + \" + totalhd + \" from Dwarven Toughness\";"
				}
			}
		}
	},

	"mountain dwarf" : {
		regExpSearch : /^((?=.*(hylar|daewar))|((?=.*\b(dwarfs?|dwarves|dwarfish|dwarvish|dwarven)\b)(?=.*\b(mountain|shield)\b))).*$/i,
		name : "Mountain dwarf",
		sortname : "Dwarf, Mountain",
		source : ["P", 20],
		plural : "Mountain dwarves",
		size : 3,
		speed : [25, 25],
		languages : ["Common", "Dwarvish"],
		vision : "Darkvision 60 ft",
		savetxt : "Adv. vs. Poison",
		dmgres : ["poison"],
		weaponprofs : [false, false, ["battleaxe", "handaxe", "warhammer", "light hammer"]],
		armor : [true, true, false, false],
		tools : ["smith, brewer, or mason tools"],
		age : " are considered young until they are 50 and live about 350 years",
		height : " stand between 4 and 5 feet tall (4' + 2d4\")",
		weight : " weigh around 150 lb (130 + 2d4 \xD7 2d6 lb)",
		heightMetric : " stand between 1,2 and 1,5 metres tall (120 + 5d4 cm)",
		weightMetric : " weigh around 75 kg (60 + 5d4 \xD7 4d6 / 10 kg)",
		improvements : "Mountain Dwarf: +2 Strength, +2 Constitution;",
		scores : [2, 0, 2, 0, 0, 0],
		trait : "Mountain Dwarf (+2 Strength, +2 Constitution)\n\nStonecunning:\n   Whenever I make an Intelligence (History) check related to the origin of stonework, I am considered proficient in the History skill and add double my proficiency bonus to the check, instead of my normal proficiency bonus.",
	},

	"dark elf" : {
		regExpSearch : /^(?!.*half)((?=.*drow)|((?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\b(dark|underdarks?|deep|depths?)\b))).*$/i,
		name : "Drow",
		sortname : "Elf, Dark (Drow)",
		source : ["P", 24],
		plural : "Drow",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Elvish"],
		vision : "Darkvision 120 ft; Sunlight Sensitivity",
		savetxt : "Adv. on saves vs. being charmed; Magic can't put me to sleep",
		weaponprofs : [false, false, ["rapier", "shortsword", "hand crossbow"]],
		skills : ["Perception"],
		age : " typically claim adulthood around age 100 and can live to be 750 years old",
		height : " range from under 5 to 5 1/2 feet tall (4'5\" + 2d6\")",
		weight : " weigh around 100 lb (75 + 2d6 \xD7 1d6 lb)",
		heightMetric : " range from under 1,5 to 1,7 metres tall (135 + 5d6 cm)",
		weightMetric : " weigh around 45 kg (35 + 5d6 \xD7 2d6 / 10 kg)",
		improvements : "Drow: +2 Dexterity, +1 Charisma;",
		scores : [0, 2, 0, 0, 0, 1],
		trait : "Drow (+2 Dexterity, +1 Charisma)\nTrance: Elves don't need to sleep, but meditate semiconsciously, for 4 hours a day. This gives the same benefit as a human gets from 8 hours of sleep (long rest still 8 hours).\nSunlight Sensitivity: Disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight when I or what I am trying to attack/perceive is in direct sunlight.\nDrow Magic: 1st level: Dancing Lights cantrip; 3rd level: Faerie Fire; 5th level: Darkness. Both spells can be used once per long rest. Charisma is my spellcasting ability for these.",
		abilitySave : 6,
		spellcastingAbility : 6,
		spellcastingBonus : {
			name : "Drow Magic (level 1)",
			spells : ["dancing lights"],
			selection : ["dancing lights"],
			atwill : true,
		},
		features : {
			"faerie fire" : {
				name : "Faerie Fire",
				minlevel : 3,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Drow Magic)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Drow Magic (level 3)",
					spells : ["faerie fire"],
					selection : ["faerie fire"],
					oncelr : true,
				},
			},
			"darkness" : {
				name : "Darkness",
				minlevel : 5,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Drow Magic)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Drow Magic (level 5)",
					spells : ["darkness"],
					selection : ["darkness"],
					oncelr : true,
				},
			}
		}
	},

	"eladrin" : {
		regExpSearch : /^(?!.*half)((?=.*eladrin)|((?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\b(feys?|feywild)\b))).*$/i,
		name : "Eladrin",
		sortname : "Elf, Fey (Eladrin)",
		source : ["D", 286],
		plural : "Eladrin",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Elvish"],
		vision : "Darkvision 60 ft",
		savetxt : "Adv. vs. being charmed; Magic can't put me to sleep",
		weaponprofs : [false, false, ["longsword", "shortsword", "longbow", "shortbow"]],
		skills : ["Perception"],
		age : " typically claim adulthood around age 100 and can live to be 750 years old",
		height : " range from under 5 to over 6 feet tall (4'6\" + 2d10\")",
		weight : " weigh around 115 lb (90 + 2d10 \xD7 1d4 lb)",
		heightMetric : " range from under 1,5 to over 1,8 metres tall (140 + 5d10 cm)",
		weightMetric : " weigh around 55 kg (40 + 5d10 \xD7 2d4 / 10 kg)",
		improvements : "Eladrin: +2 Dexterity, +1 Intelligence;",
		scores : [0, 2, 0, 1, 0, 0],
		trait : "Eladrin (+2 Dexterity, +1 Intelligence)\nTrance: Elves don't need to sleep, but meditate semiconsciously, for 4 hours a day. While meditating, I can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, I gain the same benefit that a human does from 8 hours of sleep, but I still need 8 hours for a long rest.\nFey Step: I can cast the Misty Step spell once using this trait. I regain the ability to do so when I finish a short rest.",
		spellcastingAbility : 4,
		features : {
			"fey step" : {
				name : "Misty Step",
				minlevel : 1,
				usages : 1,
				recovery : "short rest",
				tooltip : " (Fey Step)",
				action : ["bonus action", ""],
				spellcastingBonus : {
					name : "Fey Step",
					spells : ["misty step"],
					selection : ["misty step"],
					oncesr : true,
				},
			}
		}
	},

	"high elf" : {
		regExpSearch : /^(?!.*half)((?=.*(silvanesti|qualinesti))|((?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\b(high|sun|moon|grey|gray|valleys?|silvers?)\b))).*$/i,
		name : "High elf",
		sortname : "Elf, High",
		source : ["P", 23],
		plural : "High elves",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Elvish", "+1 from High Elf"],
		vision : "Darkvision 60 ft",
		savetxt : "Adv. vs. being charmed; Magic can't put me to sleep",
		weaponprofs : [false, false, ["longsword", "shortsword", "longbow", "shortbow"]],
		skills : ["Perception"],
		age : " typically claim adulthood around age 100 and can live to be 750 years old",
		height : " range from under 5 to over 6 feet tall (4'6\" + 2d10\")",
		weight : " weigh around 115 lb (90 + 2d10 \xD7 1d4 lb)",
		heightMetric : " range from under 1,5 to over 1,8 metres tall (140 + 5d10 cm)",
		weightMetric : " weigh around 55 kg (40 + 5d10 \xD7 2d4 / 10 kg)",
		improvements : "High Elf: +2 Dexterity, +1 Intelligence;",
		scores : [0, 2, 0, 1, 0, 0],
		trait : "High Elf (+2 Dexterity, +1 Intelligence)\nTrance: Elves don't need to sleep, but meditate semiconsciously, for 4 hours a day. While meditating, I can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, I gain the same benefit that a human does from 8 hours of sleep, but I still need 8 hours for a long rest.\nCantrip: I know one cantrip of my choice from the wizard spell list. Intelligence is my spellcasting ability for it.",
		abilitySave : 4,
		spellcastingAbility : 4,
		spellcastingBonus : {
			name : "High Elf Cantrip",
			class : "wizard",
			level : [0, 0],
			atwill : true,
		},
	},

	"wood elf" : {
		regExpSearch : /^(?!.*half)((?=.*(grugach|kagonesti))|((?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\b(woodlands?|woods?|forests?|wilds?|green)\b))).*$/i,
		name : "Wood elf",
		sortname : "Elf, Wood",
		source : ["P", 24],
		plural : "Wood elves",
		size : 3,
		speed : [35, 25],
		languages : ["Common", "Elvish"],
		vision : "Darkvision 60 ft",
		savetxt : "Adv. vs. being charmed; Magic can't put me to sleep",
		weaponprofs : [false, false, ["longsword", "shortsword", "longbow", "shortbow"]],
		skills : ["Perception"],
		age : " typically claim adulthood around age 100 and can live to be 750 years old",
		height : " range from under 5 to over 6 feet tall (4'6\" + 2d10\")",
		weight : " weigh around 115 lb (90 + 2d10 \xD7 1d4 lb)",
		heightMetric : " range from under 1,5 to over 1,8 metres tall (140 + 5d10 cm)",
		weightMetric : " weigh around 55 kg (40 + 5d10 \xD7 2d4 / 10 kg)",
		improvements : "Wood Elf: +2 Dexterity, +1 Wisdom;",
		scores : [0, 2, 0, 0, 1, 0],
		trait : "Wood Elf (+2 Dexterity, +1 Wisdom)\nTrance: Elves don't need to sleep, but meditate semiconsciously, for 4 hours a day. While meditating, I can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, I gain the same benefit that a human does from 8 hours of sleep, but I still need 8 hours for a long rest.\nMask of the Wild: I can attempt to hide even when I am only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.",
	},

	"firbolg" : {
		regExpSearch : /firbolg/i,
		name : "Firbolg",
		source : ["V", 106],
		plural : "Firbolg",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Elvish", "Giant"],
		age : " reach adulthood around 30 and can live for 500 years",
		height : " are between 6 and half and 8 feet tall (6'2\" + 2d12\")",
		weight : " weigh between 240 and 300 lb (175 + 2d12 \xD7 2d6 lb)",
		heightMetric : " are between 2 and 2,5 metres tall (190 + 5d12 cm)",
		weightMetric : " weigh between 110 and 135 kg (80 + 5d12 \xD7 4d6 / 10 kg)",
		improvements : "Firbolg: +1 Strength, +2 Wisdom;",
		scores : [1, 0, 0, 0, 2, 0],
		trait : "Firbolg (+1 Strength, +2 Wisdom)" + (typePF ? "\n" : " ") + "Hidden Step: Once per short rest, as a bonus action, I turn invisible until the start of my next turn as per the invisibility spell.\nPowerful Build: I count as one size larger for the weight I can carry.\nFirbolg Magic: I can cast the Detect Magic and Disguise Self spells each once per short rest. With Disguise Self I can seem up to 3 feet shorter. Wisdom is my ability for these spells.\nSpeech of Beast and Leaf: I can make my words understood, in a limited manner, by beasts and plants. I have advantage on Charisma checks to influence them.",
		abilitySave : 5,
		spellcastingAbility : 5,
		features : {
			"firbolg magic (detect magic)" : {
				name : "Firbolg Magic (Detect Magic)",
				minlevel : 1,
				usages : 1,
				recovery : "short rest",
				tooltip : " (Firbolg Magic)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Firbolg Magic",
					spells : ["detect magic"],
					selection : ["detect magic"],
					oncesr : true,
				}
			},
			"firbolg magic (disguise self)" : {
				name : "Firbolg Magic (Disguise Self)",
				minlevel : 1,
				usages : 1,
				recovery : "short rest",
				tooltip : " (Firbolg Magic)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Firbolg Magic",
					spells : ["disguise self"],
					selection : ["disguise self"],
					oncesr : true,
				}
			},
			"hidden step" : {
				name : "Hidden Step",
				minlevel : 1,
				usages : 1,
				recovery : "short rest",
				tooltip : " (Hidden Step)",
				action : ["bonus action", ""],
			}
		},
		eval : "tDoc.getField('Carrying Capacity Multiplier').value *= 2;",
		removeeval : "tDoc.getField('Carrying Capacity Multiplier').value /= 2;"
	},

	"air genasi" : {
		regExpSearch : /^(?=.*(genasi|planetouched))(?=.*\bairs?\b).*$/i,
		name : "Air genasi",
		sortname : "Genasi, Air",
		source : ["E", 9],
		plural : "Air genasi",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Primordial"],
		age : " reach adulthood in their late teens and live up to 120 years",
		height : " range from barely 5 to well over 6 feet tall (4'8\" + 2d10\")",
		weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
		heightMetric : " range from barely 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
		weightMetric : " weigh around 75 lb (50 + 5d10 \xD7 4d4 / 10 kg)",
		improvements : "Air Genasi: +1 Dexterity, +2 Constitution;",
		scores : [0, 1, 2, 0, 0, 0],
		trait : "Air Genasi (+1 Dexterity, +2 Constitution)\n\nUnending Breath: I can hold my breath indefinitely while I am not incapacitated.\n\nMingle with the Wind: I can cast the Levitate spell once with this trait, requiring no material components, and I regain the ability to cast it this way when I finish a long rest. Constitution is my spellcasting ability for this spell.",
		abilitySave : 3,
		spellcastingAbility : 3,
		features : {
			"levitate" : {
				name : "Levitate",
				minlevel : 1,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Mingle with the Wind)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Mingle with the Wind",
					spells : ["levitate"],
					selection : ["levitate"],
					oncelr : true,
				},
			}
		}
	},

	"earth genasi" : {
		regExpSearch : /^(?=.*(genasi|planetouched))(?=.*\bearths?\b).*$/i,
		name : "Earth genasi",
		sortname : "Genasi, Earth",
		source : ["E", 9],
		plural : "Earth genasi",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Primordial"],
		age : " reach adulthood in their late teens and live up to 120 years",
		height : " range from barely 5 to well over 6 feet tall (4'8\" + 2d10\")",
		weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
		heightMetric : " range from barely 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
		weightMetric : " weigh around 75 lb (50 + 5d10 \xD7 4d4 / 10 kg)",
		improvements : "Earth Genasi: +1 Strength, +2 Constitution;",
		scores : [1, 0, 2, 0, 0, 0],
		trait : "Earth Genasi (+1 Strength, +2 Constitution)" + (typePF ? "\n" : "") + "\nEarth Walk: I can move across difficult terrain made of earth or stone without expending extra movement." + (typePF ? "\n" : "") + "\nMerge with Stone: I can cast the Pass without Trace spell once with this trait, requiring no material components, and I regain the ability to cast it this way when I finish a long rest. Constitution is my spellcasting ability for this spell.",
		spellcastingAbility : 3,
		features : {
			"pass without trace" : {
				name : "Pass without Trace",
				minlevel : 1,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Merge with Stone)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Merge with Stone",
					spells : ["pass without trace"],
					selection : ["pass without trace"],
					oncelr : true,
				},
			}
		}
	},

	"fire genasi" : {
		regExpSearch : /^(?=.*(genasi|planetouched))(?=.*\bfires?\b).*$/i,
		name : "Fire genasi",
		sortname : "Genasi, Fire",
		source : ["E", 9],
		plural : "Fire genasi",
		vision : "Darkvision 60 ft",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Primordial"],
		dmgres : ["fire"],
		age : " reach adulthood in their late teens and live up to 120 years",
		height : " range from barely 5 to well over 6 feet tall (4'8\" + 2d10\")",
		weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
		heightMetric : " range from barely 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
		weightMetric : " weigh around 75 lb (50 + 5d10 \xD7 4d4 / 10 kg)",
		improvements : "Fire Genasi: +2 Constitution, +1 Intelligence;",
		scores : [0, 0, 2, 1, 0, 0],
		trait : "Fire Genasi (+2 Constitution, +1 Intelligence)\n\nReach to the Blaze:\n   I know the Produce Flame cantrip.\n   Once I reach 3rd level, I can cast the Burning Hands spell once as a 1st-level spell.\n   I regain the ability to cast it this way when I finish a long rest.\n   Constitution is my spellcasting ability for these spells.",
		abilitySave : 3,
		spellcastingAbility : 3,
		spellcastingBonus : {
			name : "Reach to the Blaze (level 1)",
			spells : ["produce flame"],
			selection : ["produce flame"],
			atwill : true,
		},
		features : {
			"burning hands" : {
				name : "Burning Hands",
				minlevel : 3,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Reach to the Blaze)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Reach to the Blaze (level 3)",
					spells : ["burning hands"],
					selection : ["burning hands"],
					oncelr : true,
				},
			}
		}
	},

	"water genasi" : {
		regExpSearch : /^(?=.*(genasi|planetouched))(?=.*\bwaters?\b).*$/i,
		name : "Water genasi",
		sortname : "Genasi, Water",
		source : ["E", 10],
		plural : "Water genasi",
		size : 3,
		speed : ["30 ft\n30 ft swim", "20 ft\n20 ft swim"],
		languages : ["Common", "Primordial"],
		dmgres : ["acid"],
		age : " reach adulthood in their late teens and live up to 120 years",
		height : " range from barely 5 to well over 6 feet tall (4'8\" + 2d10\")",
		weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
		heightMetric : " range from barely 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
		weightMetric : " weigh around 75 lb (50 + 5d10 \xD7 4d4 / 10 kg)",
		improvements : "Water Genasi: +2 Constitution, +1 Wisdom;",
		scores : [0, 0, 2, 0, 1, 0],
		trait : "Water Genasi (+2 Constitution, +1 Wisdom)\nAmphibious: I can breathe air and water.\nSwim: I have a swimming speed of 30 feet.\nCall to the Wave: I know the Shape Water cantrip.\n   When I reach 3rd level, I can cast the Create or Destroy Water spell as a 2nd-level spell once with this trait, and I regain the ability to cast it this way when I finish a long rest.\n   Constitution is my spellcasting ability for these spells.",
		spellcastingAbility : 3,
		spellcastingBonus : {
			name : "Call to the Wave (level 1)",
			spells : ["shape water"],
			selection : ["shape water"],
			atwill : true,
		},
		features : {
			"create or destroy water" : {
				name : "Create/Destroy Water (level 2)",
				minlevel : 3,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Call to the Wave)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Call to the Wave (level 3)",
					spells : ["create or destroy water"],
					selection : ["create or destroy water"],
					oncelr : true,
				},
			}
		}
	},

	"deep gnome" : {
		regExpSearch : /^((?=.*svirfneblin)|((?=.*\bgnomes?\b)(?=.*\b(underdarks?|deep|depths?)\b))).*$/i,
		name : "Svirfneblin",
		sortname : "Gnome, Deep (Svirfneblin)",
		source : ["E", 7],
		plural : "Svirfneblin",
		size : 4,
		speed : [25, 15],
		languages : ["Common", "Gnomish", "Undercommon"],
		vision : "Darkvision 120 ft",
		savetxt : "Adv. on Int/Wis/Cha saves vs. magic",
		age : " are considered full-grown adults when they reach 25 and live 200 to 250 years",
		height : " stand between 3 and 3 1/2 feet tall (2'9\" + 2d4\")",
		weight : " weigh around 90 lb (80 + 2d4 \xD7 1d4 lb)",
		heightMetric : " stand between 90 and 105 cm tall (85 + 5d4 cm)",
		weightMetric : " weigh around 50 kg (35 + 5d4 \xD7 4d4 / 10 kg)",
		improvements : "Svirfneblin: +1 Dexterity, +2 Intelligence;",
		scores : [0, 1, 0, 2, 0, 0],
		trait : "Svirfneblin (+1 Dexterity, +2 Intelligence)\n\nStone Camouflage:\n   I have advantage on Dexterity (stealth) checks to hide in rocky terrain.",
	},

	"forest gnome" : {
		regExpSearch : /^((?=.*\bgnomes?\b)(?=.*\b(woods?|forests?|wilds?|green)\b)).*$/i,
		name : "Forest gnome",
		sortname : "Gnome, Forest",
		source : ["P", 37],
		plural : "Forest gnomes",
		size : 4,
		speed : [25, 15],
		languages : ["Common", "Gnomish"],
		vision : "Darkvision 60 ft",
		savetxt : "Adv. on Int/Wis/Cha saves vs. magic",
		age : " start adult life around age 40 and can live 350 to almost 500 years",
		height : " are 3 to 4 feet tall (2'11\" + 2d4\")",
		weight : " weigh around 40 lb (35 + 2d4 lb)",
		heightMetric : " are 90 to 120 cm tall (2'11\" + 5d4)",
		weightMetric : " weigh around 18 kg (16 + 5d4 / 10 kg)",
		improvements : "Forest Gnome: +1 Dexterity, +2 Intelligence;",
		scores : [0, 1, 0, 2, 0, 0],
		trait : "Forest Gnome (+1 Dexterity, +2 Intelligence)" + (typePF ? "\n" : " ") + "\nNatural Illusionist:\n   I know the Minor Illusion cantrip. Intelligence is my spellcasting ability for it.\n\nSpeak with Small Beasts:\n   Through sounds and gestures, I can communicate simple ideas with Small or smaller beasts.",
		abilitySave : 4,
		spellcastingAbility : 4,
		spellcastingBonus : {
			name : "Natural Illusionist",
			spells : ["minor illusion"],
			selection : ["minor illusion"],
			atwill : true,
		},
	},

	"rock gnome" : {
		regExpSearch : /^((?=.*\bgnomes?\b)(?=.*\b(rocks?|tinker|tinkering)\b)).*$/i,
		name : "Rock gnome",
		sortname : "Gnome, Rock",
		source : ["P", 37],
		plural : "Rock gnomes",
		size : 4,
		speed : [25, 15],
		languages : ["Common", "Gnomish"],
		tools : ["Tinker's tools"],
		vision : "Darkvision 60 ft",
		savetxt : "Adv. on Int/Wis/Cha saves vs. magic",
		age : " start adult life around age 40 and can live 350 to almost 500 years",
		height : " are 3 to 4 feet tall (2'11\" + 2d4\")",
		weight : " weigh around 40 lb (35 + 2d4 lb)",
		heightMetric : " are 90 to 120 cm tall (2'11\" + 5d4)",
		weightMetric : " weigh around 18 kg (16 + 5d4 / 10 kg)",
		improvements : "Rock Gnome: +1 Constitution, +2 Intelligence;",
		scores : [0, 0, 1, 2, 0, 0],
		trait : "Rock Gnome (+1 Constitution, +2 Intelligence)" + (typePF ? "\n" : " ") + "Artificer's Lore: Add twice my proficiency bonus to Intelligence (History) checks with magic, alchemical, and technological items.\nTinker: Construct a Tiny clockwork device (AC 5, 1 HP) using tinker's tools, 1 hour, and 10 gp of material components, that functions for 24 hours. I can have up to 3 active." + (typePF ? "\n - " : " -") + "Clockwork Toy: animal, monster, or person that can move 5 ft per turn in a random direction, making appropriate noises;" + (typePF ? "\n - " : " -") + "Fire Starter: 1 action to produce miniature flame to light things;" + (typePF ? "\n - " : " -") + "Music Box: plays single song at a moderate volume.",
	},
	
	"goblin" : {
		regExpSearch : /^(?=.*\bgoblins?\b)(?!.*hobgoblin|bugbear).*$/i,
		name : "Goblin",
		source : ["V", 119],
		plural : "Goblins",
		size : 4,
		speed : [30, 20],
		languages : ["Common", "Goblin"],
		vision : "Darkvision 60 ft",
		age : " rearch adulthood at age 8 and live up to 60 years",
		height : " are between 3 and a half and 4 feet tall (3'5\" + 2d4\")",
		weight : " weigh between 40 and 70 lb (35 + 2d4 \xD7 1d4 lb)",
		heightMetric : " are between 100 and 120 cm tall (100 + 5d4 cm)",
		weightMetric : " weigh between 20 and 30 kg (17 + 5d4 \xD7 2d4 / 10 kg)",
		improvements : "Goblin: +2 Dexterity, +1 Constitution;",
		scores : [0, 2, 1, 0, 0, 0],
		features : {
			"fury of the small" : {
				name : "Fury of the Small",
				minlevel : 1,
				usages : 1,
				recovery : "short rest",
				additional : ["+1 damage", "+2 damage", "+3 damage", "+4 damage", "+5 damage", "+6 damage", "+7 damage", "+8 damage", "+9 damage", "+10 damage", "+11 damage", "+12 damage", "+13 damage", "+14 damage", "+15 damage", "+16 damage", "+17 damage", "+18 damage", "+19 damage", "+20 damage"],
				tooltip : "",
			},
			"nimble escape" : {
				name : "Nimble Escape",
				minlevel : 1,
				action : ["bonus action", " (disengage/hide)"],
			}
		},
		trait : "Goblin (+2 Dexterity, +1 Constitution)\n\nFury of the Small: Once per short rest, when I hit a creature of a size category larger than mine, I deal extra damage equal to my level.\n\nNimble Escape: As a bonus action, I can take the Disengage or Hide action."
	},

	"goliath" : {
		regExpSearch : /goliath/i,
		name : "Goliath",
		source : ["V", 108],
		plural : "Goliaths",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Giant"],
		skills : ["Athletics"],
		age : " reach adulthood in their late teens and live less than 100 years",
		height : " are between 6 and a half and 8 feet tall (6'2\" + 2d10\")",
		weight : " weigh between 280 and 340 lb (200 + 2d10 \xD7 2d6 lb)",
		heightMetric : " are between 2 and 2,4 metres tall (190 + 5d10 cm)",
		weightMetric : " weigh between 100 and 155 kg (90 + 5d10 \xD7 4d6 / 10 kg)",
		improvements : "Goliath: +2 Strength, +1 Constitution;",
		scores : [2, 0, 1, 0, 0, 0],
		features : {
			"stone's endurance" : {
				name : "Stone's Endurance",
				minlevel : 1,
				usages : 1,
				recovery : "short rest",
				tooltip : "",
				action : ["reaction", ""]
			}
		},
		trait : "Goliath (+2 Strength, +1 Constitution)" + (typePF ? "\n" : "") + "\nStone's Endurance: Once per short rest, when I take damage, I can use my reaction to reduce the damage by 1d12 + my Con" + (typePF ? "" : "stitution") + " modifier." + (typePF ? "\n" : "") + "\nPowerful Build: I count as one size larger when determining my carrying capacity and the weight I can push, drag, or lift." + (typePF ? "\n" : "") + "\nMountain Born: I'm acclimated to high altitude, including elevations above 20,000 feet. I'm also naturally adapted to cold climates.",
		eval : "tDoc.getField('Carrying Capacity Multiplier').value *= 2;",
		removeeval : "tDoc.getField('Carrying Capacity Multiplier').value /= 2;"
	},

	"ghostwise halfling" : {
		regExpSearch : /^(?=.*\b(halflings?|hobbits?)\b)(?=.*ghostwise).*$/i,
		name : "Ghostwise halfling",
		sortname : "Halfling, Ghostwise",
		plural : "Ghostwise halflings",
		source : ["S", 110],
		size : 4,
		speed : [25, 15],
		languages : ["Common", "Halfling"],
		savetxt : "Adv. vs. being frightened",
		age : " reach adulthood at age 20 and live around 150 years",
		height : " average about 3 feet tall (2'7\" + 2d4\")",
		weight : " weigh around 40 lb (35 + 2d4 lb)",
		heightMetric : " average about 90 cm tall (80 + 5d4)",
		weightMetric : " weigh around 18 kg (16 + 5d4 / 10 kg)",
		improvements : "Ghostwise Halfling: +2 Dexterity, +1 Wisdom;",
		scores : [0, 2, 0, 0, 1, 0],
		trait : "Ghostwise Halfling (+2 Dexterity, +1 Wisdom)" + (typePF ? "\n" : " ") + "\nLucky: When I roll a 1 on an attack roll, ability check, or saving throw, I can reroll the die and must use the new roll." + (typePF ? "\n" : " ") + "\nHalfling Nimbleness: I can move through the space of any creature that is of a size larger than me." + (typePF ? "\n" : " ") + "\nSilent Speech: I can speak telepathically to any one creature within 30 feet of me. It only understands me if we share a language.",
	},

	"lightfoot halfling" : {
		regExpSearch : /^((?=.*(hairfoot|tallfellow))|((?=.*\b(halflings?|hobbits?)\b)(?=.*lightfoot))).*$/i,
		name : "Lightfoot halfling",
		sortname : "Halfling, Lightfoot",
		source : ["P", 28],
		plural : "Lightfoot halflings",
		size : 4,
		speed : [25, 15],
		languages : ["Common", "Halfling"],
		savetxt : "Adv. vs. being frightened",
		age : " reach adulthood at age 20 and live around 150 years",
		height : " average about 3 feet tall (2'7\" + 2d4\")",
		weight : " weigh around 40 lb (35 + 2d4 lb)",
		heightMetric : " average about 90 cm tall (80 + 5d4)",
		weightMetric : " weigh around 18 kg (16 + 5d4 / 10 kg)",
		improvements : "Lightfoot Halfling: +2 Dexterity, +1 Charisma;",
		scores : [0, 2, 0, 0, 0, 1],
		trait : "Lightfoot Halfling (+2 Dexterity, +1 Charisma)" + (typePF ? "\n" : "") + "\nLucky: When I roll a 1 on an attack roll, ability check, or saving throw, I can reroll the die and must use the new roll." + (typePF ? "\n" : "") + "\nHalfling Nimbleness: I can move through the space of any creature that is of a size larger than me." + (typePF ? "\n" : "") + "\nNaturally Stealthy: I can attempt to hide even when I am obscured only by a creature that is at least one size larger than me.",
	},

	"stout halfling" : {
		regExpSearch : /^(?=.*\b(halflings?|hobbits?)\b)(?=.*stout).*$/i,
		name : "Stout halfling",
		sortname : "Halfling, Stout",
		source : ["P", 28],
		plural : "Stout halflings",
		size : 4,
		speed : [25, 15],
		languages : ["Common", "Halfling"],
		savetxt : "Adv. vs. frightened/Poison",
		dmgres : ["poison"],
		age : " reach adulthood at age 20 and live around 150 years",
		height : " average about 3 feet tall (2'7\" + 2d4\")",
		weight : " weigh around 40 lb (35 + 2d4 lb)",
		heightMetric : " average about 90 cm tall (80 + 5d4)",
		weightMetric : " weigh around 18 kg (16 + 5d4 / 10 kg)",
		improvements : "Stout Halfling: +2 Dexterity, +1 Constitution;",
		scores : [0, 2, 1, 0, 0, 0],
		trait : "Stout Halfling (+2 Dexterity, +1 Constitution)\n\nLucky: When I roll a 1 on an attack roll, ability check, or saving throw, I can reroll the die and must use the new roll.\n\nHalfling Nimbleness: I can move through the space of any creature that is of a size larger than me."
	},

	"half-elf" : {
		regExpSearch : /^(?=.*half)(?=.*(elf|elv|drow|silvanesti|qualinesti|grugach|kagonesti)).*$/i,
		name : "Half-elf",
		source : ["P", 39],
		plural : "Half-elves",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Elvish", "+1 from Half-Elf"],
		vision : "Darkvision 60 ft",
		savetxt : "Adv. vs. being charmed; Magic can't put me to sleep",
		skillstxt : "Choose any two skills",
		age : " reach adulthood around age 20 and often live over 180 years",
		height : " range from 5 to 6 feet tall (4'9\" + 2d8\")",
		weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
		heightMetric : " range from 1,5 to 1,8 metres tall (145 + 5d8 cm)",
		weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
		improvements : "Half-Elf: +2 Charisma and +1 to two other ability scores of my choice;",
		scores : [0, 0, 0, 0, 0, 2],
		trait : "Half-Elf (+2 Charisma and +1 to two other ability scores of my choice)\n\nSkill Versatility: I gain proficiency in two skills of my choice.",
		variants : ["aquatic", "cantrip", "drow magic", "elf weapon training", "fleet of foot", "mask of the wild"],
	},

	"half-orc" : {
		regExpSearch : /^(?=.*half)(?=.*\bor(c|k)).*$/i,
		name : "Half-orc",
		source : ["P", 41],
		plural : "Half-orcs",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Orc"],
		vision : "Darkvision 60 ft",
		skills : ["Intimidation"],
		age : " reach adulthood around age 14 and rarely live longer than 75 years",
		height : " range from 5 to well over 6 feet tall (4'10\" + 2d10\")",
		weight : " weigh around 215 lb (140 + 2d10 \xD7 2d6 lb)",
		heightMetric : " range from 1,5 to well over 1,8 metres tall (150 + 5d10 cm)",
		weightMetric : " weigh around 100 kg (65 + 5d10 \xD7 4d6 / 10 kg)",
		improvements : "Half-Orc: +2 Strength, +1 Constitution;",
		scores : [2, 0, 1, 0, 0, 0],
		features : {
			"relentless endurance" : {
				name : "Relentless Endurance",
				minlevel : 1,
				usages : 1,
				recovery : "long rest",
				tooltip : ""
			},
			"savage attacks" : {
				name : "Savage Attacks",
				minlevel : 1,
				calcChanges : {
					atkAdd : ["if (isMeleeWeapon && (/d\\d+/).test(fields.Damage_Die)) {var pExtraCritM = extraCritM ? extraCritM : 0; var extraCritM = pExtraCritM + 1; if (pExtraCritM) {fields.Description = fields.Description.replace(pExtraCritM + 'd', extraCritM + 'd'); } else {fields.Description += (fields.Description ? '; ' : '') + extraCritM + fields.Damage_Die.replace(/.*(d\\d+).*/, '$1') + ' extra on a crit in melee'; }; }; ", "My melee attacks roll 1 additional dice on a critical hit."]
				}
			}
		},
		trait : "Half-Orc (+2 Strength, +1 Constitution)" + (typePF ? "\n" : " ") + "\nRelentless Endurance: When I am reduced to 0 hit points but not killed outright, I can drop to 1 hit point instead. I can't use this feature again until I finish a long rest.\n\nSavage Attacks: When I score a critical hit with a melee weapon attack, I can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit."
	},
	
	"hobgoblin" : {
		regExpSearch : /hobgoblin/i,
		name : "Hobgoblin",
		source : ["V", 119],
		plural : "Hobgoblins",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Goblin"],
		vision : "Darkvision 60 ft",
		armor : [true, false, false, false],
		age : " reach adulthood in their late teens and live less than 100 years",
		height : " range from barely 5 to well over 6 feet tall (4'8\" + 2d10\")",
		weight : " weigh between 150 and 200 lb (110 + 2d10 \xD7 2d4 lb)",
		heightMetric : " range from barely 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
		weightMetric : " weigh between 70 and 90 kg (50 + 5d10 \xD7 4d4 / 10 kg)",
		improvements : "Hobgoblin: +2 Constitution, +1 Intelligence;",
		scores : [0, 2, 1, 0, 0, 0],
		features : {
			"saving face" : {
				name : "Saving Face",
				minlevel : 1,
				usages : 1,
				recovery : "short rest",
				tooltip : "",
			},
		},
		trait : "Hobgoblin (+2 Constitution, +1 Intelligence)\n\nMartial Training: I am proficient with two martial weapons of my choice and light armor.\n\nSaving Face: Once per short rest, when I miss an attack roll or fail an ability check or a saving throw, I can gain a bonus to the roll equal to the number of allies I can see within 30 feet of me (max +5)."
	},

	"human" : {
		regExpSearch : /human/i,
		name : "Human",
		source : ["P", 31],
		plural : "Humans",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "+1 from Human"],
		age : " reach adulthood in their late teens and live less than 100 years",
		height : " range from barely 5 to well over 6 feet tall (4'8\" + 2d10\")",
		weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
		heightMetric : " range from barely 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
		weightMetric : " weigh around 75 kg (50 + 5d10 \xD7 4d4 / 10 kg)",
		improvements : "Human: +1 to all ability scores;",
		scores : [1, 1, 1, 1, 1, 1],
		trait : "Human (+1 to all ability scores)",
		variants : ["variant"],
	},

	"kenku" : {
		regExpSearch : /kenku/i,
		name : "Kenku",
		source : ["V", 109],
		plural : "Kenku",
		size : 3,
		speed : [30, 20],
		skillstxt : "Choose two from Acrobatics, Deception, Stealth, and Sleight of Hand.",
		languages : ["Common", "Auran"],
		age : " reach maturity at about 12 years old and can live to 60",
		height : " are around 5 feet tall (4'4\" + 2d8\")",
		weight : " weigh between 90 and 120 lb (70 + 2d8 \xD7 1d4 lb)",
		heightMetric : " are around 1,5 metres tall (135 + 5d8 cm)",
		weightMetric : " weigh between 40 and 55 kg (35 + 5d8 \xD7 2d4 / 10 kg)",
		improvements : "Kenku: +2 Dexterity, +1 Wisdom;",
		scores : [0, 2, 0, 0, 1, 0],
		trait : "Kenku (+2 Dexterity, +1 Wisdom)" + (typePF ? "\n" : "") + "\nExpert Forgery: Kenku can duplicate other creatures' handwriting and craftwork. I have advantage on all checks made to produce forgeries or duplicates of existing objects." + (typePF ? "\n" : "") + "\nMimicry: I can mimic any sounds I have heard, including voices, but can otherwise not speak. Creatures hearing these sounds can determine they are imitations with a successful Wisdom (Insight) check opposed by my Charisma (Deception).",
	},
	
	"kobold" : {
		regExpSearch : /kobold/i,
		name : "Kobold",
		source : ["V", 119],
		plural : "Kobolds",
		size : 4,
		speed : [30, 20],
		languages : ["Common", "Draconic"],
		vision : "Darkvision 60 ft; Sunlight Sensitivity",
		age : " reach adulthood at age 6 and can live up to 120 years, but rarely do so",
		height : " are between 2 and 3 feet tall (2'1\" + 2d4\")",
		weight : " weigh between 25 and 35 lb (25 + 2d4 \xD7 1 lb)",
		heightMetric : " are between 65 and 90 cm tall (63 + 5d4 cm)",
		weightMetric : " weigh between 10 and 15 kg (11 + 5d4 \xD7 2 / 10 kg)",
		improvements : "Kobold: -2 Strength, +2 Dexterity;",
		scores : [-2, 2, 0, 0, 0, 0],
		features : {
			"grovel, cower, and beg" : {
				name : "Grovel, Cower, and Beg",
				minlevel : 1,
				usages : 1,
				recovery : "short rest",
				tooltip : "",
				action : ["action", ""],
			},
		},
		trait : "Kobold (-2 Strength, +2 Dexterity)\nSunlight Sensitivity: Disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight when I or what I am trying to attack/perceive is in direct sunlight.\nGrovel, Cower, and Beg: As an action, I can distract all foes within 10 feet of me that can see me so that my allies gain advantage on attack rolls against them.\nPack Tactics: I have advantage on attack rolls against creatures when at least one of my allies is within 5 feet of that creature and that ally is not incapacitated."
	},

	"lizardfolk" : {
		regExpSearch : /lizard(folk|man|men)/i,
		name : "Lizardfolk",
		source : ["V", 111],
		plural : "Lizardfolk",
		size : 3,
		speed : ["30 ft\n30 ft swim", "20 ft\n20 ft swim"],
		skillstxt : "Choose two from Animal Handling, Nature, Perception, Stealth, and Survival.",
		languages : ["Common", "Draconic"],
		weapons : ["bite"],
		age : " reach maturity around age 14 and rarely live longer than 60 years",
		height : " range from 5 to well over 6 feet tall (4'9\" + 2d10\")",
		weight : " weigh around 200 lb (120 + 2d10 \xD7 2d6 lb)",
		heightMetric : " range from 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
		weightMetric : " weigh around 95 kg (55 + 5d10 \xD7 4d6 / 10 kg)",
		improvements : "Lizardfolk: +2 Constitution, +1 Wisdom;",
		scores : [0, 0, 2, 0, 1, 0],
		features : {
			"cunning artisan" : {
				name : "Cunning Artisan",
				minlevel : 1,
				usages : 1,
				recovery : "short rest",
				tooltip : "",
			},
			"hungry jaws" : {
				name : "Hungry Jaws",
				minlevel : 1,
				usages : 1,
				recovery : "short rest",
				tooltip : "",
				action : ["bonus action", ""]
			},
		},
		trait : "Lizardfolk (+2 Constitution, +1 Wisdom) Bite: I can use my fanged maw to make unarmed strikes dealing 1d6 piercing damage." + (typePF ? "\n" : " ") + "Cunning Artisan: As part of a short rest I can harvest parts of a slain creature to make a shield, club, javelin, or 1d4 darts/blowgun needles. This requires a suitable corpse and appropriate tools." + (typePF ? "\n" : " ") + "Hold Breath: I can hold my breath for up to 15 minutes at a time." + (typePF ? "\n" : " ") + "Natural Armor: I have an AC of 13 + Dexterity modifier + shield." + (typePF ? "\n" : " ") + "Hungry Jaws: As a bonus action, once per short rest, I can make a special bite attack and if it hits I gain temporary HP equal to my Con modifier (min 1).",
	},

	"orc" : {
		regExpSearch : /^(?!.*half)(?=.*\bor(c|k)).*$/i,
		name : "Orc",
		source : ["V", 120],
		plural : "Orcs",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Orc"],
		vision : "Darkvision 60 ft",
		skills : ["Intimidation"],
		age : " reach adulthood at age 12 and live up to 50 years",
		height : " are usually over 6 feet tall (5'4\" + 2d8\")",
		weight : " weigh between 230 and 280 lb (175 + 2d8 \xD7 2d6 lb)",
		heightMetric : " are usually over 1,8 metres tall (160 + 5d8 cm)",
		weightMetric : " weigh between 100 and 125 kg (80 + 5d8 \xD7 4d6 / 10 kg)",
		improvements : "Orc: +2 Strength, +1 Constitution, -2 Intelligence;",
		scores : [2, 0, 1, -2, 0, 0],
		features : {
			"aggressive" : {
				name : "Aggressive",
				minlevel : 1,
				action : ["bonus action", " (dash to enemy)"],
			}
		},
		trait : "Orc (+2 Strength, +1 Constitution, -2 Intelligence)\n\nPowerful Build: I count as one size larger when determining my carrying capacity and the weight I can push, drag, or lift.\n\nAggressive: As a bonus action, I can move up to my speed toward an enemy that I can see or hear. I must end my move closer to this enemy than I started.",
		eval : "tDoc.getField('Carrying Capacity Multiplier').value *= 2;",
		removeeval : "tDoc.getField('Carrying Capacity Multiplier').value /= 2;"
	},

	"tabaxi" : {
		regExpSearch : /tabaxi/i,
		name : "Tabaxi",
		source : ["V", 113],
		plural : "Tabaxi",
		size : 3,
		speed : ["30 ft\n20 ft climb", "20 ft\n10 ft climb"],
		skills : ["Perception", "Stealth"],
		languages : ["Common", "+1 from Tabaxi"],
		vision : "Darkvision 60 ft",
		weapons : ["cat's claws"],
		age : " reach adulthood in their late teens and live less than 100 years",
		height : " range from 5 to well over 6 feet tall (4'10\" + 2d10\")",
		weight : " weigh around 150 lb (90 + 2d10 \xD7 2d4 lb)",
		heightMetric : " range from 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
		weightMetric : " weigh around 70 kg (40 + 5d10 \xD7 4d4 / 10 kg)",
		improvements : "Tabaxi: +2 Dexterity, +1 Charisma;",
		scores : [0, 2, 0, 0, 0, 1],
		features : {
			"feline agility" : {
				name : "Feline Agility",
				minlevel : 1,
				usages : 1,
				recovery : " Turn",
				additional : "still for 1 turn to recover",
				tooltip : " (can be replenished by not moving for one whole turn)",
			}
		},
		trait : "Tabaxi (+2 Dexterity, +1 Charisma)\n\nCat's Claws: I can use my fanged claws to make unarmed strikes dealing 1d4 slashing damage. They also give me a climbing speed of 20 feet.\n\nFeline Agility: When moving on my turn in combat, I can move double my speed. Once I do this, I can't do it again until I don't move at all on one of my turns.",
	},

	"tiefling" : {
		regExpSearch : /^((?=.*tiefling)|(?=.*planetouched)(?=.*(hell|abyss|fiend|devil))).*$/i,
		name : "Tiefling",
		source : ["P", 43],
		plural : "Tieflings",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Infernal"],
		vision : "Darkvision 60 ft",
		dmgres : ["fire"],
		age : " reach adulthood in their late teens and live around 100 years",
		height : " range from 5 to over 6 feet tall (4'9\" + 2d8\")",
		weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
		heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)",
		weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
		improvements : "Tiefling: +1 Intelligence, +2 Charisma;",
		scores : [0, 0, 0, 1, 0, 2],
		trait : "Tiefling (+1 Intelligence, +2 Charisma)\n\nInfernal Legacy:\n   I know the Thaumaturgy cantrip.\n   At 3rd level, I can cast the Hellish Rebuke spell once per long rest as a 2nd-level spell.\n   At 5th level, I can also cast the Darkness spell once per long rest.\n   Charisma is my spellcasting ability for these spells.",
		abilitySave : 6,
		spellcastingAbility : 6,
		spellcastingBonus : {
			name : "Infernal Legacy (level 1)",
			spells : ["thaumaturgy"],
			selection : ["thaumaturgy"],
			atwill : true
		},
		features : {
			"hellish rebuke" : {
				name : "Hellish Rebuke",
				minlevel : 3,
				usages : 1,
				additional : "3d10",
				recovery : "long rest",
				tooltip : " (Infernal Legacy)",
				action : ["reaction", " (3d10)"],
				spellcastingBonus : {
					name : "Infernal Legacy (level 3)",
					spells : ["hellish rebuke"],
					selection : ["hellish rebuke"],
					oncelr : true
				}
			},
			"darkness" : {
				name : "Darkness",
				minlevel : 5,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Infernal Legacy)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Infernal Legacy (level 5)",
					spells : ["darkness"],
					selection : ["darkness"],
					oncelr : true
				}
			}
		},
		variants : ["devil's tongue", "hellfire", "winged"]
	},

	"triton" : {
		regExpSearch : /triton/i,
		name : "Triton",
		source : ["V", 115],
		plural : "Triton",
		size : 3,
		speed : ["30 ft\n30 ft swim", "20 ft\n20 ft swim"],
		languages : ["Common", "Primordial"],
		dmgres : ["cold"],
		age : " reach maturity around age 15 and can live up to 200 years",
		height : " are around 5 feet tall (4'6\" + 2d10\")",
		weight : " weigh around 150 lb (90 + 2d10 \xD7 2d4 lb)",
		heightMetric : " are around 1,6 metres tall (135 + 5d10 cm)",
		weightMetric : " weigh around 70 kg (40 + 5d10 \xD7 4d4 / 10 kg)",
		improvements : "Triton: +1 Strength, +1 Constitution, +1 Charisma;",
		scores : [1, 0, 1, 0, 0, 1],
		trait : "Triton (+1 Strength, +1 Constitution +1 Charisma)\nControl Air and Water: I can cast the Fog Cloud spell. Once I reach 3rd level, I can cast the Gust of Wind spell. Once I reach 5th level, I can cast the Wall of Water spell. All three spells can be used once per long rest. Charisma is my spellcasting ability for these spells.\nEmissary of the Sea: I can communicate simple ideas to beasts that can breathe water.\nGuardians of the Depths: I have resistance to cold damage and ignore all drawbacks from a deep, underwater environment." + (typePF ? "\n" : " ") + "Amphibious: I can breathe air and water.",
		abilitySave : 6,
		spellcastingAbility : 6,
		features : {
			"fog cloud" : {
				name : "Fog Cloud",
				minlevel : 1,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Control Air and Water)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Control Air and Water (1)",
					spells : ["fog cloud"],
					selection : ["fog cloud"],
					oncelr : true,
				},
			},
			"gust of wind" : {
				name : "Gust of Wind",
				minlevel : 3,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Control Air and Water)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Control Air and Water (3)",
					spells : ["gust of wind"],
					selection : ["gust of wind"],
					oncelr : true,
				},
			},
			"wall of water" : {
				name : "Wall of Water",
				minlevel : 5,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Control Air and Water)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Control Air and Water (5)",
					spells : ["wall of water"],
					selection : ["wall of water"],
					oncelr : true,
				},
			}
		},
	},

	"yuan-ti pureblood" : {
		regExpSearch : /^(?=.*yuan.ti)(?=.*pure.?blood).*$/i,
		name : "Yuan-Ti Pureblood",
		source : ["V", 120],
		plural : "Yuan-Ti Purebloods",
		size : 3,
		speed : [30, 20],
		languages : ["Common", "Abyssal", "Draconic"],
		vision : "Darkvision 60 ft",
		savetxt : "Adv. on all saves vs. magic; Immune to poison damage and the poison condition",
		age : " reach adulthood in their late teens and live less than 100 years",
		height : " range from barely 5 to well over 6 feet tall (4'8\" + 2d10\")",
		weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
		heightMetric : " range from barely 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
		weightMetric : " weigh around 75 kg (50 + 5d10 \xD7 4d4 / 10 kg)",
		improvements : "Yuan-Ti Pureblood: +1 Intelligence, +2 Charisma;",
		scores : [0, 0, 0, 1, 0, 2],
		abilitySave : 6,
		spellcastingAbility : 6,
		spellcastingBonus : {
			name : "Innate Spellcasting (1)",
			spells : ["poison spray"],
			selection : ["poison spray"],
			atwill : true,
		},
		features : {
			"animal friendship" : {
				name : "Animal Friendship",
				minlevel : 1,
				action : ["action", " (on snakes)"],
				spellcastingBonus : {
					name : "Innate Spellcasting (1)",
					spells : ["animal friendship"],
					selection : ["animal friendship"],
					atwill : true,
				},
			},
			"suggestion" : {
				name : "Suggestion",
				minlevel : 3,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Innate Spellcasting)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Innate Spellcasting (3)",
					spells : ["suggestion"],
					selection : ["suggestion"],
					oncelr : true,
				},
			}
		},
		trait : "Yuan-Ti Pureblood (+1 Intelligence, +2 Charisma)\n\nInnate Spellcasting:\n   I know the Poison Spray cantrip.\n   I can cast the spell Animal Friendship on snakes at will.\n   Once I reach 3rd level, I can cast the Suggestion spell once per long rest.\n   Charisma is my spellcasting ability for these spells.",
	},
}

var RaceSubList = {
	"dragonborn-black" : {
		regExpSearch : /black/i,
		name : "Black dragonborn",
		trait : "Black Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Acid Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 5 ft by 30 ft line."
		+ "\n   " + "All in the area must make a Dex saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 acid damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["acid"],
	},
	
	"dragonborn-blue" : {
		regExpSearch : /blue/i,
		name : "Blue dragonborn",
		trait : "Blue Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Lightning Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 5 ft by 30 ft line."
		+ "\n   " + "All in the area must make a Dex saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 lightning damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["lightning"],
	},
	
	"dragonborn-brass" : {
		regExpSearch : /brass/i,
		name : "Brass dragonborn",
		trait : "Brass Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Fire Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 5 ft by 30 ft line."
		+ "\n   " + "All in the area must make a Dex saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 fire damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["fire"],
	},
	
	"dragonborn-bronze" : {
		regExpSearch : /bronze/i,
		name : "Bronze dragonborn",
		trait : "Bronze Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Lightning Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 5 ft by 30 ft line."
		+ "\n   " + "All in the area must make a Dex saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 lightning damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["lightning"],
	},
	
	"dragonborn-copper" : {
		regExpSearch : /copper/i,
		name : "Copper dragonborn",
		trait : "Copper Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Acid Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 5 ft by 30 ft line."
		+ "\n   " + "All in the area must make a Dex saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 acid damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["acid"],
	},
	
	"dragonborn-gold" : {
		regExpSearch : /gold/i,
		name : "Gold dragonborn",
		trait : "Gold Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Fire Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 15 ft cone."
		+ "\n   " + "All in the area must make a Dex saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 fire damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["fire"],
	},
	
	"dragonborn-green" : {
		regExpSearch : /green/i,
		name : "Green dragonborn",
		trait : "Green Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Poison Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 15 ft cone."
		+ "\n   " + "All in the area must make a Con saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 poison damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["poison"],
	},
	
	"dragonborn-red" : {
		regExpSearch : /red/i,
		name : "Red dragonborn",
		trait : "Red Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Fire Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 15 ft cone."
		+ "\n   " + "All in the area must make a Dex saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 fire damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["fire"],
	},
	
	"dragonborn-silver" : {
		regExpSearch : /silver/i,
		name : "Silver dragonborn",
		trait : "Silver Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Cold Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 15 ft cone."
		+ "\n   " + "All in the area must make a Con saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 cold damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["cold"],
	},
	
	"dragonborn-white" : {
		regExpSearch : /white/i,
		name : "White dragonborn",
		trait : "White Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Cold Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 15 ft cone."
		+ "\n   " + "All in the area must make a Con saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 cold damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["cold"],
	},

	"half-elf-aquatic" : {
		regExpSearch : /aquatic/i,
		name : "Half-aquatic elf",
		source : ["S", 116],
		plural : "Half-aquatic elves",
		speed : ["30 ft\n30 ft swim", "20 ft\n20 ft swim"],
		skillstxt : "",
		trait : "Half-Aquatic Elf (+2 Charisma and +1 to two other ability scores of my choice)\n\nSwimming Speed:\n   My aquatic heritage gives me a swimming speed of 30 feet.",
	},

	"half-elf-cantrip" : {
		regExpSearch : /cantrip/i,
		name : "Half-high elf",
		source : ["S", 116],
		plural : "Half-high elves",
		skillstxt : "",
		trait : "Half-High Elf (+2 Charisma and +1 to two other ability scores of my choice)\n\nCantrip:\n   I know one cantrip of my choice from the wizard spell list.\n   Intelligence is my spellcasting ability for it.",
		abilitySave : 4,
		spellcastingAbility : 4,
		spellcastingBonus : {
			name : "High Elf Cantrip",
			class : "wizard",
			level : [0, 0],
			atwill : true,
		},
	},

	"half-elf-drow magic" : {
		regExpSearch : /^(?=.*drow)(?=.*magic).*$/i,
		name : "Half-drow",
		source : ["S", 116],
		plural : "Half-drow",
		skillstxt : "",
		trait : "Half-drow (+2 Charisma and +1 to two other ability scores of my choice)\n\nDrow Magic:\n   I know the Dancing Lights cantrip.\n   Once I reach 3rd level, I can cast the Faerie Fire spell once per long rest.\n   Once I reach 5th level, I can also cast the Darkness spell once per long rest.\n   Charisma is my spellcasting ability for these spells.",
		abilitySave : 6,
		spellcastingAbility : 6,
		spellcastingBonus : {
			name : "Drow Magic (level 1)",
			spells : ["dancing lights"],
			selection : ["dancing lights"],
			atwill : true,
		},
		features : {
			"faerie fire" : {
				name : "Faerie Fire",
				minlevel : 3,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Drow Magic)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Drow Magic (level 3)",
					spells : ["faerie fire"],
					selection : ["faerie fire"],
					oncelr : true,
				},
			},
			"darkness" : {
				name : "Darkness",
				minlevel : 5,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Drow Magic)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Drow Magic (level 5)",
					spells : ["darkness"],
					selection : ["darkness"],
					oncelr : true,
				},
			}
		}
	},

	"half-elf-fleet of foot" : {
		regExpSearch : /^(?=.*fleet)(?=.*\b(foot|feet)\b).*$/i,
		name : "Half-wood elf",
		source : ["S", 116],
		plural : "Half-wood elves",
		speed : [35, 25],
		skillstxt : "",
		trait : "Half-Wood Elf (+2 Charisma and +1 to two other ability scores of my choice)",
	},
	
	"half-elf-elf weapon training" : {
		regExpSearch : /^(?=.*\b(elf|elven)\b)(?=.*weapon)(?=.*training).*$/i,
		source : ["S", 116],
		skillstxt : "",
		trait : "Half-Elf (+2 Charisma and +1 to two other ability scores of my choice)",
		weaponprofs : [false, false, ["longsword", "shortsword", "longbow", "shortbow"]],
	},

	"half-elf-mask of the wild" : {
		regExpSearch : /^(?=.*\bmasks?\b)(?=.*\bwilds?\b).*$/i,
		name : "Half-wood elf",
		source : ["S", 116],
		plural : "Half-wood elves",
		skillstxt : "",
		trait : "Half-Wood Elf (+2 Charisma and +1 to two other ability scores of my choice)\n\nMask of the Wild:\n   I can attempt to hide even when I am only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.",
	},

	"human-variant" : {
		regExpSearch : /variant/i,
		skillstxt : "Choose any one skill",
		improvements : "Human: +1 to two different ability scores of my choice;",
		scores : [0, 0, 0, 0, 0, 0],
		trait : "Human (+1 to two different ability scores of my choice)\n\nSkills: I gain proficiency in one skill of my choice.\n\nFeat: I gain one feat of my choice.",
		eval : "AddString(\"Feat Note 1\", \"Human bonus feat\", \";\");",
		removeeval : "RemoveString(\"Feat Note 1\", \"Human bonus feat\");"
	},

	"tiefling-devil's tongue" : {
		regExpSearch : /^(?=.*devil)(?=.*tongue).*$/i,
		name : "Devil's tongue tiefling",
		source : ["S", 118],
		plural : "Devil's tongue tieflings",
		trait : "Devil's Tongue Tiefling (+1 Intelligence, +2 Charisma)\n\nDevil's Tongue:\n   I know the Vicious Mockery cantrip.\n   At 3rd level, I can cast the Charm Person spell once per long rest as a 2nd-level spell.\n   At 5th level, I can also cast the Enthrall spell once per long rest.\n   Charisma is my spellcasting ability for these spells.",
		spellcastingBonus : {
			name : "Devil's Tongue (level 1)",
			spells : ["vicious mockery"],
			selection : ["vicious mockery"],
			atwill : true
		},
		features : {
			"charm person" : {
				name : "Charm Person",
				minlevel : 3,
				usages : 1,
				additional : "2 targets",
				recovery : "long rest",
				tooltip : " (Devil's Tongue)",
				action : ["action", " (2 targets)"],
				spellcastingBonus : {
					name : "Devil's Tongue (level 3)",
					spells : ["charm person"],
					selection : ["charm person"],
					oncelr : true
				}
			},
			"enthrall" : {
				name : "Enthrall",
				minlevel : 5,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Devil's Tongue)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Devil's Tongue (level 5)",
					spells : ["enthrall"],
					selection : ["enthrall"],
					oncelr : true
				}
			}
		}
	},

	"tiefling-hellfire" : {
		regExpSearch : /hellfire/i,
		name : "Hellfire tiefling",
		source : ["S", 118],
		plural : "Hellfire tieflings",
		trait : "Hellfire Tiefling (+1 Intelligence, +2 Charisma)\n\nInfernal Legacy (Hellfire):\n   I know the Thaumaturgy cantrip.\n   At 3rd level, I can cast the Burning Hands spell once per long rest as a 2nd-level spell.\n   At 5th level, I can also cast the Darkness spell once per long rest.\n   Charisma is my spellcasting ability for these spells.",
		features : {
			"burning hands" : {
				name : "Burning Hands",
				minlevel : 3,
				usages : 1,
				additional : "4d6",
				recovery : "long rest",
				tooltip : " (Infernal Hellfire Legacy)",
				action : ["reaction", " (4d6)"],
				spellcastingBonus : {
					name : "Hellfire Legacy (level 3)",
					spells : ["burning hands"],
					selection : ["burning hands"],
					oncelr : true
				},
			},
			"darkness" : {
				name : "Darkness",
				minlevel : 5,
				usages : 1,
				recovery : "long rest",
				tooltip : " (Infernal Hellfire Legacy)",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Infernal Legacy (level 5)",
					spells : ["darkness"],
					selection : ["darkness"],
					oncelr : true
				}
			}
		}
	},

	"tiefling-winged" : {
		regExpSearch : /wing/i,
		name : "Winged tiefling",
		source : ["S", 118],
		plural : "Winged tieflings",
		speed : ["30 ft\n30 ft fly", "20 ft\n20 ft fly"],
		trait : "Winged Tiefling (+1 Intelligence, +2 Charisma)\n\nWings:\n   I have bat-like wings sprouting from my shoulder blades that give me flying speed of 30 feet.",
		features : "",
		abilitySave : 0,
		spellcastingAbility : "",
		spellcastingBonus : ""
	},
}