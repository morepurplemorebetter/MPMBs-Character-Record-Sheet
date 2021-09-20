var Base_RaceList = {
	"dragonborn" : {
		regExpSearch : /dragonborn/i,
		name : "Dragonborn",
		source : [["SRD", 5], ["P", 34]],
		plural : "Dragonborn",
		size : 3,
		speed : {
			walk : { spd : 30, enc : 20 }
		},
		languageProfs : ["Common", "Draconic"],
		weaponOptions : {
			regExpSearch : /^(?=.*breath)(?=.*weapon).*$/i,
			name : "Breath weapon",
			source : [["SRD", 5], ["P", 34]],
			ability : 3,
			type : "Natural",
			damage : [2, 6, "fire"],
			range : "15-ft cone",
			description : "Hits all in area; Dex save, success - half damage; Usable only once per short rest",
			abilitytodamage : false,
			dc : true,
			dbBreathWeapon : true
		},
		weaponsAdd : ["Breath Weapon"],
		age : " reach adulthood by 15 and live around 80 years",
		height : " stand well over 6 feet tall (5'6\" + 2d8\")",
		weight : " weigh around 240 lb (175 + 2d8 \xD7 2d6 lb)",
		heightMetric : " stand well over 1,8 metres tall (170 + 5d8 cm)",
		weightMetric : " weigh around 110 kg (80 + 5d8 \xD7 4d6 / 10 kg)",
		scores : [2, 0, 0, 0, 0, 1],
		trait : "Dragonborn (+2 Strength, +1 Charisma)\nDraconic Ancestry: Choose one type of dragon using the \"Racial Options\" button. I gain a breath weapon and damage resistance as determined by the dragon type chosen.\nBreath Weapon: Exhale destructive energy as an action with a size, shape, saving throw type, and damage type as found in the table. All in the area must make a saving throw with DC 8 + Con modifier + prof bonus. It does 2d6 (+1d6 at level 6, 11, 16) damage, half as much damage on a successful save. I can use it again after a short rest.",
		features : {
			"draconic ancestry" : {
				name : "Draconic Ancestry",
				limfeaname : "Breath Weapon",
				minlevel : 1,
				usages : 1,
				additional : levels.map(function (n) {
					return (n < 6 ? 2 : n < 11 ? 3 : n < 16 ? 4 : 5) + 'd6';
				}),
				recovery : "short rest",
				action : [["action", ""]],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.theWea.dbBreathWeapon && CurrentRace.known === 'dragonborn') {
								fields.Damage_Die = (CurrentRace.level < 6 ? 2 : CurrentRace.level < 11 ? 3 : CurrentRace.level < 16 ? 4 : 5) + 'd6';
								if (CurrentRace.variant) {
									fields.Damage_Type = CurrentRace.dmgres[0];
									fields.Description = fields.Description.replace(/(dex|con) save/i, ((/cold|poison/i).test(CurrentRace.dmgres[0]) ? 'Con' : 'Dex') + ' save');
									fields.Range = (/black|blue|brass|bronze|copper/i).test(CurrentRace.variant) ? '5-ft \xD7 30-ft line' : '15-ft cone';
								}
							};
						},
						"",
						1
					]
				}
			}
		},
		variants : ["black", "blue", "brass", "bronze", "copper", "gold", "green", "red", "silver", "white"]
	},
	"hill dwarf" : {
		regExpSearch : /^((?=.*(neidar|klar))|((?=.*\b(dwarfs?|dwarves|dwarfish|dwarvish|dwarven)\b)(?=.*\b(hill|gold)\b))).*$/i,
		name : "Hill dwarf",
		sortname : "Dwarf, Hill",
		source : [["SRD", 3], ["P", 20]],
		plural : "Hill dwarves",
		size : 3,
		speed : {
			walk : { spd : 25, enc : 25 }
		},
		languageProfs : ["Common", "Dwarvish"],
		vision : [["Darkvision", 60]],
		savetxt : { adv_vs : ["poison"] },
		dmgres : ["Poison"],
		weaponProfs : [false, false, ["battleaxe", "handaxe", "warhammer", "light hammer"]],
		toolProfs : [["Smith, brewer, or mason tools", 1]],
		age : " are considered young until they are 50 and live about 350 years",
		height : " stand between 4 and 5 feet tall (3'8\" + 2d4\")",
		weight : " weigh around 150 lb (115 + 2d4 \xD7 2d6 lb)",
		heightMetric : " stand between 1,2 and 1,5 metres tall (110 + 5d4 cm)",
		weightMetric : " weigh around 70 kg (55 + 5d4 \xD7 4d6 / 10 kg)",
		scores : [0, 0, 2, 0, 1, 0],
		trait : "Hill Dwarf (+2 Constitution, +1 Wisdom)\n\nStonecunning: Whenever I make an Intelligence (History) check related to the origin of stonework, I am considered proficient in the History skill and add double my proficiency bonus to the check, instead of my normal proficiency bonus.\n\nDwarven Toughness: My hit point maximum increases by 1 for every level I have.",
		calcChanges : {
			hp : function (totalHD) { return [totalHD, "Dwarven Toughness"]; }
		}
	},
	"high elf" : {
		regExpSearch : /^(?!.*half)((?=.*(silvanesti|qualinesti))|((?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\b(high|sun|moon|grey|gray|valleys?|silvers?)\b))).*$/i,
		name : "High elf",
		sortname : "Elf, High",
		source : [["SRD", 4], ["P", 23]],
		plural : "High elves",
		size : 3,
		speed : {
			walk : { spd : 30, enc : 20 }
		},
		languageProfs : ["Common", "Elvish", 1],
		vision : [["Darkvision", 60]],
		savetxt : {
			text : ["Magic can't put me to sleep"],
			adv_vs : ["charmed"]
		},
		weaponProfs : [false, false, ["longsword", "shortsword", "longbow", "shortbow"]],
		skills : ["Perception"],
		age : " typically claim adulthood around age 100 and can live to be 750 years old",
		height : " range from under 5 to over 6 feet tall (4'6\" + 2d10\")",
		weight : " weigh around 115 lb (90 + 2d10 \xD7 1d4 lb)",
		heightMetric : " range from under 1,5 to over 1,8 metres tall (140 + 5d10 cm)",
		weightMetric : " weigh around 55 kg (40 + 5d10 \xD7 2d4 / 10 kg)",
		scores : [0, 2, 0, 1, 0, 0],
		trait : "High Elf (+2 Dexterity, +1 Intelligence)\nTrance: Elves don't need to sleep, but meditate semiconsciously, for 4 hours a day. While meditating, I can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, I gain the same benefit that a human does from 8 hours of sleep, thus needing only 4 hours for a long rest.\nCantrip: I know one cantrip of my choice from the wizard spell list. Intelligence is my spellcasting ability for it.",
		spellcastingAbility : 4,
		spellcastingBonus : {
			name : "High Elf Cantrip",
			"class" : "wizard",
			level : [0, 0],
			firstCol : 'atwill'
		}
	},
	"rock gnome" : {
		regExpSearch : /^((?=.*\bgnomes?\b)(?=.*\b(rocks?|tinker|tinkering)\b)).*$/i,
		name : "Rock gnome",
		sortname : "Gnome, Rock",
		source : [["SRD", 6], ["P", 37]],
		plural : "Rock gnomes",
		size : 4,
		speed : {
			walk : { spd : 25, enc : 15 }
		},
		languageProfs : ["Common", "Gnomish"],
		toolProfs : ["Tinker's tools"],
		vision : [["Darkvision", 60]],
		savetxt : { text : ["Adv. on Int/Wis/Cha saves vs. magic"] },
		age : " start adult life around age 40 and can live 350 to almost 500 years",
		height : " are 3 to 4 feet tall (2'11\" + 2d4\")",
		weight : " weigh around 40 lb (35 + 2d4 lb)",
		heightMetric : " are 90 to 120 cm tall (2'11\" + 5d4)",
		weightMetric : " weigh around 18 kg (16 + 5d4 / 10 kg)",
		scores : [0, 0, 1, 2, 0, 0],
		trait : "Rock Gnome (+1 Constitution, +2 Intelligence)" + (typePF ? "\n" : " ") + "Artificer's Lore: Add twice my proficiency bonus to Intelligence (History) checks with magic, alchemical, and technological items.\nTinker: Construct a Tiny clockwork device (AC 5, 1 HP) using tinker's tools, 1 hour, and 10 gp of material components, that functions for 24 hours. I can have up to 3 active." + (typePF ? "\n - " : " -") + "Clockwork Toy: animal, monster, or person that can move 5 ft per turn in a random direction, making appropriate noises;" + (typePF ? "\n - " : " -") + "Fire Starter: 1 action to produce miniature flame to light things;" + (typePF ? "\n - " : " -") + "Music Box: plays single song at a moderate volume."
	},
	"lightfoot halfling" : {
		regExpSearch : /^((?=.*(hairfoot|tallfellow))|((?=.*\b(halflings?|hobbits?)\b)(?=.*lightfoot))).*$/i,
		name : "Lightfoot halfling",
		sortname : "Halfling, Lightfoot",
		source : [["SRD", 4], ["P", 28]],
		plural : "Lightfoot halflings",
		size : 4,
		speed : {
			walk : { spd : 25, enc : 15 }
		},
		languageProfs : ["Common", "Halfling"],
		savetxt : { adv_vs : ["frightened"] },
		age : " reach adulthood at age 20 and live around 150 years",
		height : " average about 3 feet tall (2'7\" + 2d4\")",
		weight : " weigh around 40 lb (35 + 2d4 lb)",
		heightMetric : " average about 90 cm tall (80 + 5d4)",
		weightMetric : " weigh around 18 kg (16 + 5d4 / 10 kg)",
		scores : [0, 2, 0, 0, 0, 1],
		trait : "Lightfoot Halfling (+2 Dexterity, +1 Charisma)" + (typePF ? "\n" : "") + "\nLucky: When I roll a 1 on an attack roll, ability check, or saving throw, I can reroll the die and must use the new roll." + (typePF ? "\n" : "") + "\nHalfling Nimbleness: I can move through the space of any creature that is of a size larger than me." + (typePF ? "\n" : "") + "\nNaturally Stealthy: I can attempt to hide even when I am obscured only by a creature that is at least one size larger than me."
	},
	"half-elf" : {
		regExpSearch : /^(?=.*half)(?=.*(elf|elv|drow|silvanesti|qualinesti|grugach|kagonesti)).*$/i,
		name : "Half-elf",
		source : [["SRD", 6], ["P", 39]],
		plural : "Half-elves",
		size : 3,
		speed : {
			walk : { spd : 30, enc : 20 }
		},
		languageProfs : ["Common", "Elvish", 1],
		vision : [["Darkvision", 60]],
		savetxt : {
			text : ["Magic can't put me to sleep"],
			adv_vs : ["charmed"]
		},
		skillstxt : "Choose any two skills",
		age : " reach adulthood around age 20 and often live over 180 years",
		height : " range from 5 to 6 feet tall (4'9\" + 2d8\")",
		weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
		heightMetric : " range from 1,5 to 1,8 metres tall (145 + 5d8 cm)",
		weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
		scorestxt : "+2 Charisma and +1 to two other ability scores of my choice",
		scores : [0, 0, 0, 0, 0, 2],
		trait : "Half-Elf (+2 Charisma and +1 to two other ability scores of my choice)\n\nSkill Versatility: I gain proficiency in two skills of my choice."
	},
	"half-orc" : {
		regExpSearch : /^(?=.*half)(?=.*\bor(c|k)).*$/i,
		name : "Half-orc",
		source : [["SRD", 7], ["P", 41]],
		plural : "Half-orcs",
		size : 3,
		speed : {
			walk : { spd : 30, enc : 20 }
		},
		languageProfs : ["Common", "Orc"],
		vision : [["Darkvision", 60]],
		skills : ["Intimidation"],
		age : " reach adulthood around age 14 and rarely live longer than 75 years",
		height : " range from 5 to well over 6 feet tall (4'10\" + 2d10\")",
		weight : " weigh around 215 lb (140 + 2d10 \xD7 2d6 lb)",
		heightMetric : " range from 1,5 to well over 1,8 metres tall (150 + 5d10 cm)",
		weightMetric : " weigh around 100 kg (65 + 5d10 \xD7 4d6 / 10 kg)",
		scores : [2, 0, 1, 0, 0, 0],
		features : {
			"relentless endurance" : {
				name : "Relentless Endurance",
				minlevel : 1,
				usages : 1,
				recovery : "long rest"
			},
			"savage attacks" : {
				name : "Savage Attacks",
				minlevel : 1,
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isMeleeWeapon && (/d\d+/).test(fields.Damage_Die)) {
								if (v.extraCritM) {
									v.extraCritM += 1;
									var extraCritRegex = /\d+(d\d+ extra on a crit(ical)?( hit)? in melee)/i;
									fields.Description = fields.Description.replace(extraCritRegex, v.extraCritM + '$1');
								} else {
									v.extraCritM = 1;
									fields.Description += (fields.Description ? '; ' : '') + v.extraCritM + fields.Damage_Die.replace(/.*(d\d+).*/, '$1') + ' extra on a crit in melee';
								}
							}
						},
						"My melee weapon attacks roll 1 additional dice on a critical hit.",
						900
					]
				}
			}
		},
		trait : "Half-Orc (+2 Strength, +1 Constitution)" + (typePF ? "\n" : " ") + "\nRelentless Endurance: When I am reduced to 0 hit points but not killed outright, I can drop to 1 hit point instead. I can't use this feature again until I finish a long rest.\n\nSavage Attacks: When I score a critical hit with a melee weapon attack, I can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit."
	},
	"human" : {
		regExpSearch : /human/i,
		name : "Human",
		source : [["SRD", 5], ["P", 31]],
		plural : "Humans",
		size : 3,
		speed : {
			walk : { spd : 30, enc : 20 }
		},
		languageProfs : ["Common", 1],
		age : " reach adulthood in their late teens and live less than 100 years",
		height : " range from barely 5 to well over 6 feet tall (4'8\" + 2d10\")",
		weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
		heightMetric : " range from barely 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
		weightMetric : " weigh around 75 kg (50 + 5d10 \xD7 4d4 / 10 kg)",
		scorestxt : "+1 to all ability scores",
		scores : [1, 1, 1, 1, 1, 1, 1],
		trait : "Human (+1 to all ability scores)",

	},
	"tiefling" : {
		regExpSearch : /^((?=.*tiefling)|(?=.*planetouched)(?=.*(hell|abyss|fiend|devil|asmodeus))).*$/i,
		name : "Tiefling",
		source : [["SRD", 7], ["P", 43], ["MToF", 21]],
		plural : "Tieflings",
		size : 3,
		speed : {
			walk : { spd : 30, enc : 20 }
		},
		languageProfs : ["Common", "Infernal"],
		vision : [["Darkvision", 60]],
		dmgres : ["Fire"],
		age : " reach adulthood in their late teens and live around 100 years",
		height : " range from 5 to over 6 feet tall (4'9\" + 2d8\")",
		weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
		heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)",
		weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
		scores : [0, 0, 0, 1, 0, 2],
		trait : "Tiefling (+1 Intelligence, +2 Charisma)\n\nInfernal Legacy:\n   I know the Thaumaturgy cantrip.\n   At 3rd level, I can cast Hellish Rebuke once per long rest as a 2nd-level spell.\n   At 5th level, I can also cast Darkness once per long rest.\n   Charisma is my spellcasting ability for these spells.",
		spellcastingAbility : 6,
		spellcastingBonus : {
			name : "Infernal Legacy (level 1)",
			spells : ["thaumaturgy"],
			selection : ["thaumaturgy"],
			firstCol : 'atwill'
		},
		features : {
			"hellish rebuke" : {
				name : "Infernal Legacy (level 3)",
				limfeaname : "Hellish Rebuke (3d10)",
				minlevel : 3,
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Infernal Legacy (level 3)",
					spells : ["hellish rebuke"],
					selection : ["hellish rebuke"],
					firstCol : "oncelr"
				},
				spellChanges : {
					"hellish rebuke" : {
						description : "Cast when taking damage, creature that dealt damage takes 3d10 Fire damage; save halves",
						changes : "Using Infernal Legacy, I cast Hellish Rebuke as if I'm using a 2nd-level spell slot, doing 3d10 damage."
					}
				}
			},
			"darkness" : {
				name : "Infernal Legacy (level 5)",
				limfeaname : "Darkness",
				minlevel : 5,
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : {
					name : "Infernal Legacy (level 5)",
					spells : ["darkness"],
					selection : ["darkness"],
					firstCol : "oncelr"
				}
			}
		}
	}
};

var Base_RaceSubList = {
	"dragonborn-black" : {
		regExpSearch : /black/i,
		name : "Black dragonborn",
		trait : "Black Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Acid Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 5-ft by 30-ft line."
		+ "\n   " + "All in the area must make a Dex saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 acid damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["Acid"]
	},
	"dragonborn-blue" : {
		regExpSearch : /blue/i,
		name : "Blue dragonborn",
		trait : "Blue Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Lightning Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 5-ft by 30-ft line."
		+ "\n   " + "All in the area must make a Dex saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 lightning damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["Lightning"]
	},
	"dragonborn-brass" : {
		regExpSearch : /brass/i,
		name : "Brass dragonborn",
		trait : "Brass Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Fire Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 5-ft by 30-ft line."
		+ "\n   " + "All in the area must make a Dex saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 fire damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["Fire"]
	},
	"dragonborn-bronze" : {
		regExpSearch : /bronze/i,
		name : "Bronze dragonborn",
		trait : "Bronze Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Lightning Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 5-ft by 30-ft line."
		+ "\n   " + "All in the area must make a Dex saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 lightning damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["Lightning"]
	},
	"dragonborn-copper" : {
		regExpSearch : /copper/i,
		name : "Copper dragonborn",
		trait : "Copper Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Acid Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 5-ft by 30-ft line."
		+ "\n   " + "All in the area must make a Dex saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 acid damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["Acid"]
	},
	"dragonborn-gold" : {
		regExpSearch : /gold/i,
		name : "Gold dragonborn",
		trait : "Gold Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Fire Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 15-ft cone."
		+ "\n   " + "All in the area must make a Dex saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 fire damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["Fire"]
	},
	"dragonborn-green" : {
		regExpSearch : /green/i,
		name : "Green dragonborn",
		trait : "Green Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Poison Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 15-ft cone."
		+ "\n   " + "All in the area must make a Con saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 poison damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["Poison"]
	},
	"dragonborn-red" : {
		regExpSearch : /red/i,
		name : "Red dragonborn",
		trait : "Red Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Fire Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 15-ft cone."
		+ "\n   " + "All in the area must make a Dex saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 fire damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["Fire"]
	},
	"dragonborn-silver" : {
		regExpSearch : /silver/i,
		name : "Silver dragonborn",
		trait : "Silver Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Cold Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 15-ft cone."
		+ "\n   " + "All in the area must make a Con saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 cold damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["Cold"]
	},
	"dragonborn-white" : {
		regExpSearch : /white/i,
		name : "White dragonborn",
		trait : "White Dragonborn (+2 Strength, +1 Charisma)"
		+ "\n" + "Cold Breath Weapon:"
		+ "\n   " + "As an action, I exhale destructive energy in a 15-ft cone."
		+ "\n   " + "All in the area must make a Con saving throw with DC 8 + Con modifier + prof bonus."
		+ "\n   " + "It does 2d6 cold damage, half as much damage on a successful save."
		+ "\n   " + "The damage increases to 3d6 at level 6, 4d6 at level 11, and 5d6 at level 16."
		+ "\n   " + "I can't use this feature again until I finish a short rest.",
		dmgres : ["Cold"]
	}
};
