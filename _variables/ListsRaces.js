var Base_RaceList = {
	"dragonborn": {
		regExpSearch: /dragonborn/i,
		name: "Dragonborn",
		source: [["SRD24", 84], ["P24", 187]],
		plural: "Dragonborn",
		size: 3,
		speed: { walk: { spd: 30, enc: 20 } },
		vision: [["Darkvision", 60]],
		features: {
			"breath weapon": {
				name: "Breath Weapon",
				minlevel: 1,
				usages: "Proficiency bonus per ",
				recovery: "long rest",
				usagescalc: "event.value = How('Proficiency Bonus');",
				additional: cantripDie.map(function (n) {
					return n + 'd10';
				}),
				weaponOptions: [{
					regExpSearch: /^(?=.*breath)(?=.*weapon).*$/i,
					name: "Breath weapon",
					source: [["P24", 187]],
					ability: 3,
					type: "Natural",
					damage: ["C", 10, "fire"],
					range: "5-ft \xD7 30-ft Line",
					description: "Can be 15-ft Cone instead; Hits all in area; Dex save for half damage; Usable Prof. Bonus per Long Rest",
					abilitytodamage: false,
					dc: true,
					dbBreathWeapon: true,
					selectNow: true
				}],
				calcChanges: {
					atkAdd: [
						function (fields, v) {
							if (v.theWea.dbBreathWeapon && CurrentRace.known === 'dragonborn' && CurrentRace.dmgres) {
								fields.Damage_Type = CurrentRace.dmgres[0];
							}
						}, '', 1
					]
				},
			},
			"draconic flight": {
				name: "Draconic Flight",
				source: [["P24", 187]],
				minlevel: 5,
				usages: 1,
				recovery: "long rest",
				action: [["bonus action", ""]]
			}
		},
		variants: ["black", "blue", "brass", "bronze", "copper", "gold", "green", "red", "silver", "white"],
		// form PHB'14:
		age: " reach adulthood by 15 and live around 80 years",
		height: " stand well over 6 ft tall (5'6\" + 2d8\")",
		weight: " weigh around 240 lb (175 + 2d8 \xD7 2d6 lb)",
		heightMetric: " stand well over 180 cm tall (170 + 5d8 cm)",
		weightMetric: " weigh around 110 kg (80 + 5d8 \xD7 4d6 / 10 kg)"
	},
	"dwarf": {
		regExpSearch: /dwarf|dwarv(ish|en)|neidar|klar|hylar|daewar/i,
		name: "Dwarf",
		source: [["SRD24", 84], ["P24", 188]],
		plural: "Dwarves",
		size: 3,
		speed: { walk: { spd: 30, enc: 20 } },
		vision: [["Darkvision", 120], ["Tremorsense (on stone)", 60]],
		savetxt: { adv_vs : ["Poisoned"] },
		dmgres: ["Poison"],
		trait: "Dwarf"+
			"\n \u2022 Dwarven Resilience: I have resistance to Poison damage and Advantage on saving throws to avoid or end being Poisoned."+
			"\n \u2022 Dwarven Toughness: My Hit Point maximum increases by 1 for every level I have."+
			"\n \u2022 Stonecunning: As a Bonus Action, I can gain 60 ft Tremorsense for 10 min when on or touching natural or worked stone. I can use this Proficiency Bonus times per Long Rest.",
		calcChanges: {
			hp: function (totalHD) { return [totalHD, "Dwarven Toughness"]; }
		},
		features: {
		  "stonecunning": {
			name: "Stonecunning",
			minlevel: 1,
			usages: "Proficiency bonus per ",
			usagescalc: "event.value = How('Proficiency Bonus');",
			recovery: "long rest",
			action: [["bonus action", " (Tremorsense)"]]
		  },
		},
		// from PHB'14:
		age: " are considered young until they are 50 and live about 350 years",
		height: " are about 4-5 ft tall (3'8\" + 2d4\")",
		weight: " weigh around 150 lb (115 + 2d4 \xD7 2d6 lb)",
		heightMetric: " are about 120-150 cm tall (110 + 5d4 cm)",
		weightMetric: " weigh around 70 kg (55 + 5d4 \xD7 4d6 / 10 kg)"
	},
	"elf": {
		regExpSearch: /elf\b|elves\b|elv(ish|en)\b/i,
		name: "Elf",
		source: [["SRD24", 84], ["P24", 189]],
		plural: "Elves",
		size: 3,
		speed: { walk: { spd: 30, enc: 20 } },
		vision: [["Darkvision", 60]],
		savetxt: {
			text: ["Magic can't put me to sleep"],
			adv_vs: ["Charmed"]
		},
		skillstxt: "Choose one: Insight, Perception, or Survival",
		variants: ["drow", "high", "wood"],
		// from PHB'14:
		age: " typically claim adulthood around age 100 and can live to be 750 years old",
		height: " are about 5-6 ft tall (4'6\" + 2d10\")",
		weight: " weigh around 115 lb (90 + 2d10 \xD7 1d4 lb)",
		heightMetric: " are about 150-180 cm tall (140 + 5d10 cm)",
		weightMetric: " weigh around 55 kg (40 + 5d10 \xD7 2d4 / 10 kg)"
	},
	"gnome": {
		regExpSearch: /gnome/i,
		name: "Gnome",
		source: [["SRD24", 85], ["P24", 191]],
		plural: "Gnomes",
		size: 4,
		speed: { walk: { spd: 30, enc: 20 } },
		vision: [["Darkvision", 60]],
		savetxt: { text : ["Adv. on Int/Wis/Cha saves"] },
		variants: ["forest", "rock"],
		// form PHB'14:
		age: " start adult life around age 40 and can live 350 to almost 500 years",
		height: " are about 3-4 ft tall (2'11\" + 2d4\")",
		weight: " weigh around 40 lb (35 + 2d4 lb)",
		heightMetric: " are about 90-120 cm tall (2'11\" + 5d4)",
		weightMetric: " weigh around 18 kg (16 + 5d4 / 10 kg)"
	},
	"goliath": {
		regExpSearch: /goliath/i,
		name: "Goliath",
		source: [["SRD24", 85], ["P24", 192]],
		plural: "Goliaths",
		size: 3,
		speed: { walk: { spd: 35, enc: 25 } },
		savetxt: { adv_vs: ["Grappled"] },
		carryingCapacity: 2,
		features: {
			"large form": {
				name: "Large Form",
				source: [["SRD24", 86], ["P24", 192]],
				minlevel: 5,
				usages: 1,
				recovery: "long rest",
				action: [["bonus action", ""]]
			}
		},
		trait: "\n \u2022 Powerful Build: I have Adv. on saves to end being Grappled and I count as one size larger when determining my carrying capacity."+
			"\n \u2022 Large Form (level 5): As a Bonus Action once per Long Rest, I can become Large, if I fit, for 10 min or until I end it (no action). I have Adv. on Str checks and +10 ft Speed during.",
		variants: ["cloud", "fire", "frost", "hill", "stone", "storm"],
		// from VGM:
		age: " reach adulthood in their late teens and live less than 100 years",
		height: " are about 7-8 ft tall (6'2\" + 2d10\")",
		weight: " weigh between 280 and 340 lb (200 + 2d10 \xD7 2d6 lb)",
		heightMetric: " are about 200-240 cm tall (190 + 5d10 cm)",
		weightMetric: " weigh between 100 and 155 kg (90 + 5d10 \xD7 4d6 / 10 kg)"
	},
	"halfling": {
		regExpSearch: /half.?ling|hobbit/i,
		name: "Halfling",
		source: [["SRD24", 86], ["P24", 193]],
		plural: "Halflings",
		speed: { walk: { spd: 30, enc: 20 } },
		savetxt: { adv_vs : ["Frightened"] },
		trait: "Halfling"+
		"\n \u2022 Brave: I have Advantage on saving throws to avoid or end being Frightened."+
		"\n \u2022 Halfling Nimbleness: I can move through the space of any creature that is a size larger than me."+
		"\n \u2022 Luck: When I roll a 1 on a D20 Test, I can reroll the die and must use the new roll."+
		"\n \u2022 Naturally Stealthy: I can attempt to hide even when I am obscured only by a creature that is at least one size larger than me.",
		// from PHB'14:
		age: " reach adulthood at age 20 and live around 150 years",
		height: " are about 2-3 ft tall (2'7\" + 2d4\")",
		weight: " weigh around 40 lb (35 + 2d4 lb)",
		heightMetric: " are about 60-90 cm tall (80 + 5d4)",
		weightMetric: " weigh around 18 kg (16 + 5d4 / 10 kg)"
	},
	"human": {
		regExpSearch: /human/i,
		name: "Human",
		source: [["SRD24", 86], ["P24", 194]],
		plural: "Humans",
		size: [3, 4],
		speed: { walk: { spd: 30, enc: 20 } },
		skillstxt: "Choose any one skill",
		featsAdd: [{ type: "origin" }],
		trait: "Human"+
		"\n \u2022 Resourceful: I gain Heroic Inspiration whenever I finish a Long Rest."+
		"\n \u2022 Skillful: I gain proficiency in one skill of my choice."+
		"\n \u2022 Versatile: I gain an origin feat of my choice.",
		// from PHB'14:
		age: " reach adulthood in their late teens and live less than 100 years",
		height: " are about 2-4 ft (small) or 4-7 ft (medium) tall (4'8\" + 2d10\")",
		weight: " (medium) weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
		heightMetric: " are about 60-120 cm (small) or 120-210 cm (medium) tall (145 + 5d10 cm)",
		weightMetric: " (medium) weigh around 75 kg (50 + 5d10 \xD7 4d4 / 10 kg)",
	},
	"orc": {
		regExpSearch: /or(c|k)/i,
		name: "Orc",
		source: [["SRD24", 86], ["P24", 195]],
		plural: "Orcs",
		size: 3,
		speed: { walk : { spd : 30, enc : 20 } },
		vision: [["Darkvision", 120]],
		features: {
			"adrenaline rush" : {
				name: "Adrenaline Rush",
				source: [["SRD24", 86], ["P24", 195]],
				minlevel: 1,
				usages: "Proficiency bonus per ",
				usagescalc: "event.value = How('Proficiency Bonus');",
				recovery: "short rest",
				additional: ProficiencyBonusList.map(function(n) { return "+" + n + " temp HP"; }),
				action: [["bonus action", ""]]
			},
			"relentless endurance" : {
				name: "Relentless Endurance",
				source: [["SRD24", 86], ["P24", 195]],
				minlevel: 1,
				usages: 1,
				recovery: "long rest"
			}
		},
		trait: "Orc"+
			"\n \u2022 Adrenaline Rush. As a Bonus Action, I can take the Dash action and gain a number of Temporary Hit Points equal to my Proficiency Bonus. I can do this a number of times equal to my Proficiency Bonus times per Short Rest."+
			"\n \u2022 Relentless Endurance. When I'm reduced to 0 Hit Points but not killed outright, I can drop to 1 Hit Point instead. I can do this once per Long Rest.",
		// from VGM:
		age: " reach adulthood at age 12 and live up to 50 years",
		height: " are usually over 6 ft tall (5'4\" + 2d8\")",
		weight: " weigh between 230 and 280 lb (175 + 2d8 \xD7 2d6 lb)",
		heightMetric: " are usually over 180 cm tall (160 + 5d8 cm)",
		weightMetric: " weigh between 100 and 125 kg (80 + 5d8 \xD7 4d6 / 10 kg)"
	},
	"tiefling": {
		regExpSearch: /^((?=.*tiefling)|(?=.*planetouched)(?=.*(hell|fiend|lower))).*$/i,
		name: "Tiefling",
		source: [["SRD24", 86], ["P24", 197]],
		plural: "Tieflings",
		size: [3, 4],
		speed: { walk: { spd: 30, enc: 20 } },
		vision: [["Darkvision", 60]],
		spellcastingAbility: [4, 5, 6],
		spellcastingBonus: [{
			name: "Otherworldly Presence",
			spells: ["thaumaturgy"],
			selection: ["thaumaturgy"],
			firstCol: 'atwill'
		}],
		variants: ['abyssal', 'chtonic', 'infernal'],
		// from PHB'14:
		age: " reach adulthood in their late teens and live around 100 years",
		height: " are about 3-4 ft (small) or 4-7 ft (medium) tall (4'9\" + 2d8\")",
		weight: " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
		heightMetric: " are about 90-120 cm (small) or 120-210 cm (medium) tall (145 + 5d8 cm)",
		weightMetric: " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
	},
};

var Base_RaceSubList = {
	"dragonborn-black": {
		name: "Black Dragonborn",
		regExpSearch: /^(?=.*black)(?=.*dragonborn).*$/i,
		source: [["SRD24", 84], ["P24", 187]],
		dmgres: ["Acid"],
		trait: "Black Dragonborn"+
			"\n \u2022 Breath Weapon: Instead of one attack during an Attack action on my turn, I can use my breath weapon: all in a 15-ft Cone or a 5-ft wide, 30-ft Line (choose each time) take 1d10 Acid damage, Dex save for half damage (DC 8 + Con mod + Prof. Bonus). I can do this my Prof. Bonus per Long Rest. The damage die increases as I level (" + (typePF ? "2d10 at level 5, 3d10 at level 11, 4d10 at level 17" : "see attack") + ")."+
			"\n \u2022 Draconic Flight (level 5): As a Bonus Action once per Long Rest, I can " + (typePF ? "sprout spectral wings to " : "") + "gain a Fly Speed equal to my Speed. This lasts for 10 min, until I end it (no action), or I'm Incapacitated.",
	},
	"dragonborn-blue": {
		name: "Blue Dragonborn",
		regExpSearch: /^(?=.*blue)(?=.*dragonborn).*$/i,
		source: [["SRD24", 84], ["P24", 187]],
		dmgres: ["Lightning"],
		trait: "Blue Dragonborn"+
			"\n \u2022 Breath Weapon: Instead of one attack during an Attack action on my turn, I can use my breath weapon: all in a 15-ft Cone or a 5-ft wide, 30-ft Line (choose each time) take 1d10 Lightning damage, Dex save for half damage (DC 8 + Con mod + Prof. Bonus). I can do this my Prof. Bonus per Long Rest. The damage die increases as I level (" + (typePF ? "2d10 at level 5, 3d10 at level 11, 4d10 at level 17" : "see attack") + ")."+
			"\n \u2022 Draconic Flight (level 5): As a Bonus Action once per Long Rest, I can " + (typePF ? "sprout spectral wings to " : "") + "gain a Fly Speed equal to my Speed. This lasts for 10 min, until I end it (no action), or I'm Incapacitated.",
	},
	"dragonborn-green": {
		name: "Green Dragonborn",
		regExpSearch: /^(?=.*green)(?=.*dragonborn).*$/i,
		source: [["SRD24", 84], ["P24", 187]],
		dmgres: ["Poison"],
		trait: "Green Dragonborn"+
			"\n \u2022 Breath Weapon: Instead of one attack during an Attack action on my turn, I can use my breath weapon: all in a 15-ft Cone or a 5-ft wide, 30-ft Line (choose each time) take 1d10 Poison damage, Dex save for half damage (DC 8 + Con mod + Prof. Bonus). I can do this my Prof. Bonus per Long Rest. The damage die increases as I level (" + (typePF ? "2d10 at level 5, 3d10 at level 11, 4d10 at level 17" : "see attack") + ")."+
			"\n \u2022 Draconic Flight (level 5): As a Bonus Action once per Long Rest, I can " + (typePF ? "sprout spectral wings to " : "") + "gain a Fly Speed equal to my Speed. This lasts for 10 min, until I end it (no action), or I'm Incapacitated.",
	},
	"dragonborn-red": {
		name: "Red Dragonborn",
		regExpSearch: /^(?=.*red)(?=.*dragonborn).*$/i,
		source: [["SRD24", 84], ["P24", 187]],
		dmgres: ["Fire"],
		trait: "Red Dragonborn"+
			"\n \u2022 Breath Weapon: Instead of one attack during an Attack action on my turn, I can use my breath weapon: all in a 15-ft Cone or a 5-ft wide, 30-ft Line (choose each time) take 1d10 Fire damage, Dex save for half damage (DC 8 + Con mod + Prof. Bonus). I can do this my Prof. Bonus per Long Rest. The damage die increases as I level (" + (typePF ? "2d10 at level 5, 3d10 at level 11, 4d10 at level 17" : "see attack") + ")."+
			"\n \u2022 Draconic Flight (level 5): As a Bonus Action once per Long Rest, I can " + (typePF ? "sprout spectral wings to " : "") + "gain a Fly Speed equal to my Speed. This lasts for 10 min, until I end it (no action), or I'm Incapacitated.",
	},
	"dragonborn-white": {
		name: "White Dragonborn",
		regExpSearch: /^(?=.*white)(?=.*dragonborn).*$/i,
		source: [["SRD24", 84], ["P24", 187]],
		dmgres: ["Cold"],
		trait: "White Dragonborn"+
			"\n \u2022 Breath Weapon: Instead of one attack during an Attack action on my turn, I can use my breath weapon: all in a 15-ft Cone or a 5-ft wide, 30-ft Line (choose each time) take 1d10 Cold damage, Dex save for half damage (DC 8 + Con mod + Prof. Bonus). I can do this my Prof. Bonus per Long Rest. The damage die increases as I level (" + (typePF ? "2d10 at level 5, 3d10 at level 11, 4d10 at level 17" : "see attack") + ")."+
			"\n \u2022 Draconic Flight (level 5): As a Bonus Action once per Long Rest, I can " + (typePF ? "sprout spectral wings to " : "") + "gain a Fly Speed equal to my Speed. This lasts for 10 min, until I end it (no action), or I'm Incapacitated.",
	},
	"dragonborn-brass": {
		name: "Brass Dragonborn",
		regExpSearch: /^(?=.*brass)(?=.*dragonborn).*$/i,
		source: [["SRD24", 84], ["P24", 187]],
		dmgres: ["Fire"],
		trait: "Brass Dragonborn"+
			"\n \u2022 Breath Weapon: Instead of one attack during an Attack action on my turn, I can use my breath weapon: all in a 15-ft Cone or a 5-ft wide, 30-ft Line (choose each time) take 1d10 Fire damage, Dex save for half damage (DC 8 + Con mod + Prof. Bonus). I can do this my Prof. Bonus per Long Rest. The damage die increases as I level (" + (typePF ? "2d10 at level 5, 3d10 at level 11, 4d10 at level 17" : "see attack") + ")."+
			"\n \u2022 Draconic Flight (level 5): As a Bonus Action once per Long Rest, I can " + (typePF ? "sprout spectral wings to " : "") + "gain a Fly Speed equal to my Speed. This lasts for 10 min, until I end it (no action), or I'm Incapacitated.",
	},
	"dragonborn-bronze": {
		name: "Bronze Dragonborn",
		regExpSearch: /^(?=.*bronze)(?=.*dragonborn).*$/i,
		source: [["SRD24", 84], ["P24", 187]],
		dmgres: ["Lightning"],
		trait: "Bronze Dragonborn"+
			"\n \u2022 Breath Weapon: Instead of one attack during an Attack action on my turn, I can use my breath weapon: all in a 15-ft Cone or a 5-ft wide, 30-ft Line (choose each time) take 1d10 Lightning damage, Dex save for half damage (DC 8 + Con mod + Prof. Bonus). I can do this my Prof. Bonus per Long Rest. The damage die increases as I level (" + (typePF ? "2d10 at level 5, 3d10 at level 11, 4d10 at level 17" : "see attack") + ")."+
			"\n \u2022 Draconic Flight (level 5): As a Bonus Action once per Long Rest, I can " + (typePF ? "sprout spectral wings to " : "") + "gain a Fly Speed equal to my Speed. This lasts for 10 min, until I end it (no action), or I'm Incapacitated.",
	},
	"dragonborn-copper": {
		name: "Copper Dragonborn",
		regExpSearch: /^(?=.*copper)(?=.*dragonborn).*$/i,
		source: [["SRD24", 84], ["P24", 187]],
		dmgres: ["Acid"],
		trait: "Copper Dragonborn"+
			"\n \u2022 Breath Weapon: Instead of one attack during an Attack action on my turn, I can use my breath weapon: all in a 15-ft Cone or a 5-ft wide, 30-ft Line (choose each time) take 1d10 Acid damage, Dex save for half damage (DC 8 + Con mod + Prof. Bonus). I can do this my Prof. Bonus per Long Rest. The damage die increases as I level (" + (typePF ? "2d10 at level 5, 3d10 at level 11, 4d10 at level 17" : "see attack") + ")."+
			"\n \u2022 Draconic Flight (level 5): As a Bonus Action once per Long Rest, I can " + (typePF ? "sprout spectral wings to " : "") + "gain a Fly Speed equal to my Speed. This lasts for 10 min, until I end it (no action), or I'm Incapacitated.",
	},
	"dragonborn-gold": {
		name: "Gold Dragonborn",
		regExpSearch: /^(?=.*gold)(?=.*dragonborn).*$/i,
		source: [["SRD24", 84], ["P24", 187]],
		dmgres: ["Fire"],
		trait: "Gold Dragonborn"+
			"\n \u2022 Breath Weapon: Instead of one attack during an Attack action on my turn, I can use my breath weapon: all in a 15-ft Cone or a 5-ft wide, 30-ft Line (choose each time) take 1d10 Fire damage, Dex save for half damage (DC 8 + Con mod + Prof. Bonus). I can do this my Prof. Bonus per Long Rest. The damage die increases as I level (" + (typePF ? "2d10 at level 5, 3d10 at level 11, 4d10 at level 17" : "see attack") + ")."+
			"\n \u2022 Draconic Flight (level 5): As a Bonus Action once per Long Rest, I can " + (typePF ? "sprout spectral wings to " : "") + "gain a Fly Speed equal to my Speed. This lasts for 10 min, until I end it (no action), or I'm Incapacitated.",
	},
	"dragonborn-silver": {
		name: "Silver Dragonborn",
		regExpSearch: /^(?=.*silver)(?=.*dragonborn).*$/i,
		source: [["SRD24", 84], ["P24", 187]],
		dmgres: ["Cold"],
		trait: "Silver Dragonborn"+
			"\n \u2022 Breath Weapon: Instead of one attack during an Attack action on my turn, I can use my breath weapon: all in a 15-ft Cone or a 5-ft wide, 30-ft Line (choose each time) take 1d10 Cold damage, Dex save for half damage (DC 8 + Con mod + Prof. Bonus). I can do this my Prof. Bonus per Long Rest. The damage die increases as I level (" + (typePF ? "2d10 at level 5, 3d10 at level 11, 4d10 at level 17" : "see attack") + ")."+
			"\n \u2022 Draconic Flight (level 5): As a Bonus Action once per Long Rest, I can " + (typePF ? "sprout spectral wings to " : "") + "gain a Fly Speed equal to my Speed. This lasts for 10 min, until I end it (no action), or I'm Incapacitated.",
	},
	"elf-drow": {
		regExpSearch: /^((?=.*drow)|(?=.*(elfs?|elv(es|ish|en))\b)(?=.*(dark|underdark|deep|depth))).*$/i,
		name: "Drow",
		source: [["SRD24", 85], ["P24", 190]],
		sortname: "Drow (Dark Elf)",
		vision: [["Darkvision", 120]],
		spellcastingAbility: [4, 5, 6],
		trait: "\u2022 Drow Lineage: I know Dancing Lights, Faerie Fire at level 3, and Darkness at level 5. I can cast each spell once per Long Rest or by using a spell slot as normal; Int, Wis, or Cha is my spellcasting ability for these (choose when selecting the lineage)."+
			"\n \u2022 Fey Ancestry: I have Advantage on saving throws to avoid or end being Charmed."+
			"\n \u2022 Keen Senses: I gain proficiency in Insight, Perception, or Survival."+
			"\n \u2022 Trance: I don't need to sleep and magic can't put me to sleep. I can have a Long Rest in 4 hours if I spend it in a trancelike meditation, during which I retain consciousness.",
		features: {
			"drow lineage 1": {
				name: "Dancing Lights (Drow Lineage)",
				source: [["SRD24", 85], ["P24", 190]],
				minlevel: 1,
				spellcastingBonus: [{
					name: "Drow level 1",
					spells: ["dancing lights"],
					selection: ["dancing lights"],
					firstCol: "atwill"
				}]
			},
			"drow lineage 3": {
				name: "Faerie Fire (Drow Lineage)",
				source: [["SRD24", 85], ["P24", 190]],
				minlevel: 3,
				usages: 1,
				recovery: "long rest",
				spellFirstColTitle: "LR", // check off when the spell has been used that long rest
				spellcastingBonus: [{
					name: "Drow level 3",
					spells: ["faerie fire"],
					selection: ["faerie fire"],
					firstCol: "checkbox"
				}]
			},
			"drow lineage 5": {
				name: "Darkness (Drow Lineage)",
				source: [["SRD24", 85], ["P24", 190]],
				minlevel: 5,
				usages: 1,
				recovery: "long rest",
				spellFirstColTitle: "LR",
				spellcastingBonus: [{
					name: "Drow level 5",
					spells: ["darkness"],
					selection: ["darkness"],
					firstCol: "checkbox"
				}]
			}
		}
	},
	"elf-high": {
		regExpSearch: /^((?=.*(silvanesti|qualinesti))|(?=.*(elfs?|elv(es|ish|en))\b)(?=.*\b(high|sun|moon|grey|gray|valleys?|silvers?)\b)).*$/i,
		name: "High Elf",
		source: [["SRD24", 85], ["P24", 190]],
		spellcastingAbility: [4, 5, 6],
		trait: "\u2022 High Elf Lineage: I know Prestidigitation and can replace it with another Wizard cantrip after a Long Rest, Detect Magic at level 3, and Misty Step at level 5. I can cast each spell once per Long Rest or by using a Spell Slot as normal; Int, Wis, or Cha is my spellcasting ability for these (choose one)."+
			(typePF ? "\n \u2022 Keen Senses: I gain proficiency in Insight, Perception, or Survival." : " \u2022 Keen Senses: Insight, Perception, or Survival prof.")+
			"\n \u2022 Fey Ancestry: I have Advantage on saving throws to avoid or end being Charmed."+
			"\n \u2022 Trance: I don't need to sleep and magic can't put me to sleep. I can have a Long Rest in 4 hours if I spend it in a trancelike meditation, during which I retain consciousness.",
		features: {
			"high elf lineage 1": {
				name: "Prestidigitation (High Elf Lineage)",
				source: [["SRD24", 85], ["P24", 190]],
				minlevel: 1,
				spellcastingBonus: [{ // Add feature for wizard / high elf to show all cantrips
					name: "High Elf level 1",
					"class": ["wizard"],
					level: [0, 0],
					selection: ["prestidigitation"],
					firstCol: "atwill"
				}]
			},
			"high elf lineage 3": {
				name: "Detect Magic (High Elf Lineage)",
				source: [["SRD24", 85], ["P24", 190]],
				minlevel: 3,
				usages: 1,
				recovery: "long rest",
				spellFirstColTitle: "LR", // check off when the spell has been used that long rest
				spellcastingBonus: [{
					name: "High Elf level 3",
					spells: ["detect magic"],
					selection: ["detect magic"],
					firstCol: "checkbox"
				}]
			},
			"high elf lineage 5": {
				name: "Misty Step (High Elf Lineage)",
				source: [["SRD24", 85], ["P24", 190]],
				minlevel: 5,
				usages: 1,
				recovery: "long rest",
				spellFirstColTitle: "LR",
				spellcastingBonus: [{
					name: "High Elf level 5",
					spells: ["misty step"],
					selection: ["misty step"],
					firstCol: "checkbox"
				}]
			}
		}
	},
	"elf-wood": {
		regExpSearch: /^((?=.*(grugach|kagonesti|silhana))|(?=.*(elfs?|elv(es|ish|en))\b)(?=.*\b(woodlands?|woods?|forests?|wilds?|green)\b)).*$/i,
		name: "Wood Elf",
		source: [["SRD24", 85], ["P24", 190]],
		speed: { walk: { spd: 35, enc: 25 } },
		spellcastingAbility: [4, 5, 6],
		trait: "\u2022 Wood Elf Lineage: I know Druidcraft, Longstrider at level 3, and Pass without Trace at level 5. I can cast each spell once per Long Rest or by using a Spell Slot as normal; Int, Wis, or Cha is my spellcasting ability for these (choose when selecting the lineage)."+
			"\n \u2022 Fey Ancestry: I have Advantage on saving throws to avoid or end being Charmed."+
			"\n \u2022 Keen Senses: I gain proficiency in Insight, Perception, or Survival."+
			"\n \u2022 Trance: I don't need to sleep and magic can't put me to sleep. I can have a Long Rest in 4 hours if I spend it in a trancelike meditation, during which I retain consciousness.",
		features: {
			"wood elf lineage 1": {
				name: "Druidcraft (Wood Elf Lineage)",
				source: [["SRD24", 85], ["P24", 190]],
				minlevel: 1,
				spellcastingBonus: [{
					name: "Wood Elf level 1",
					spells: ["druidcraft"],
					selection: ["druidcraft"],
					firstCol: "atwill"
				}]
			},
			"wood elf lineage 3": {
				name: "Longstrider (Wood Elf Lineage)",
				source: [["SRD24", 85], ["P24", 190]],
				minlevel: 3,
				usages: 1,
				recovery: "long rest",
				spellFirstColTitle: "LR", // check off when the spell has been used that long rest
				spellcastingBonus: [{
					name: "Wood Elf level 3",
					spells: ["longstrider"],
					selection: ["longstrider"],
					firstCol: "checkbox"
				}]
			},
			"wood elf lineage 5": {
				name: "Pass without Trace (Wood Elf Lineage)",
				source: [["SRD24", 85], ["P24", 190]],
				minlevel: 5,
				usages: 1,
				recovery: "long rest",
				spellFirstColTitle: "LR",
				spellcastingBonus: [{
					name: "Wood Elf level 5",
					spells: ["pass without trace"],
					selection: ["pass without trace"],
					firstCol: "checkbox"
				}]
			}
		}
	},
	'gnome-forest': {
		regExpSearch: /^(?=.*gnome)(?=.*(wood|forest|wild|green)).*$/i,
		name: "Forest Gnome",
		source: [["SRD24", 85], ["P24", 191]],
		spellcastingAbility: [4, 5, 6],
		features: {
			"forest gnome lineage": {
				name: "Forest Gnome Lineage",
				limfeaname: "Speak with Animals (Forest Gnome)",
				source: [["SRD24", 85], ["P24", 191]],
				minlevel: 1,
				usages: "Proficiency bonus per ",
				usagescalc: "event.value = How('Proficiency Bonus');",
				recovery: "long rest",
				spellcastingBonus: [{
					name: "At will",
					spells: ["minor illusion"],
					selection: ["minor illusion"],
					firstCol: "atwill"
				}, {
					name: "Prof. Bonus per LR",
					spells: ["speak with animals"],
					selection: ["speak with animals"],
					firstCol: "PB"
				}]
			}
		},
		trait: "Forest Gnome"+
			"\n \u2022 Gnomish Cunning: I have Advantage on Intelligence, Wisdom, and Charisma saving throws."+
			"\n \u2022 Forest Gnome Lineage: I know the Minor Illusion cantrip. I always have Speak with Animals prepared and I can cast it without a spell slot my Proficiency Bonus times per Long Rest. I can also use any spell slots I have to cast the spell as normal. Int, Wis, or Cha is my spellcasting ability for these (choose when selecting the lineage)."
	},
	'gnome-rock': {
		regExpSearch: /^(?=.*gnome)(?=.*(rock|tinker)).*$/i,
		name: "Rock Gnome",
		source: [["SRD24", 85], ["P24", 191]],
		spellcastingAbility: [4, 5, 6],
		features: {
			"rock gnome lineage": {
				name: "Rock Gnome Lineage",
				source: [["SRD24", 85], ["P24", 191]],
				spellcastingBonus: [{
					name: "Rock Gnome Lineage",
					spells: ["mending", "prestidigitation"],
					selection: ["mending", "prestidigitation"],
					times: 2,
					firstCol: "atwill"
				}],
				action: [["bonus action", "Activate Clockwork Device"]],
			}
		},
		trait: "Rock Gnome"+
			"\n \u2022 Gnomish Cunning: I have Adv" + (typePF ? "antage" : ".") + " on Intelligence, Wisdom, and Charisma saving throws."+
			"\n \u2022 Rock Gnome Lineage: I know the Mending and Prestidigitation cantrips. I can create a Tiny clockwork device (AC 5, 1 HP) if I spend 10 min casting Prestidigitation; I choose (one option of) one of its effects, which the device produces when a creature uses a Bonus Action to activate it via touch. I can have three such devices in existence at a time, and each falls apart after 8 hours or when I dismantle it via touch as a Utilize action."
	},
	"goliath-cloud": {
		regExpSearch: /^(?=.*cloud)(?=.*goliath).*$/i,
		sortname: "Cloud Giant Ancestry Goliath",
		source: [["SRD24", 85], ["P24", 192]],
		features: {
			"cloud's jaunt": {
				name: "Cloud's Jaunt",
				source: [["SRD24", 85], ["P24", 192]],
				minlevel: 1,
				usages: "Proficiency bonus per ",
				usagescalc: "event.value = How('Proficiency Bonus');",
				recovery: "long rest",
				additional: "30-ft teleport",
				action: [["bonus action", ""]],
			},
		},
		trait: "Goliath (Cloud Giant Ancestry)"+
			"\n \u2022 Cloud's Jaunt: As a Bonus Action, I can magically teleport up to 30 ft to an unoccupied space I can see. I can do this my Proficiency Bonus times per Long Rest."+
			"\n \u2022 Powerful Build: I have Adv. on saves to end being Grappled and I count as one size larger when determining my carrying capacity."+
			"\n \u2022 Large Form (level 5): As a Bonus Action once per Long Rest, I can become Large, if I fit, for 10 min or until I end it (no action). I have Adv. on Str checks and +10 ft Speed during.",
	},
	"goliath-fire": {
		regExpSearch: /^(?=.*fire)(?=.*goliath).*$/i,
		sortname: "Fire Giant Ancestry Goliath",
		source: [["SRD24", 85], ["P24", 192]],
		features: {
			"fire's burn": {
				name: "Fire's Burn",
				source: [["SRD24", 85], ["P24", 192]],
				minlevel: 1,
				usages: "Proficiency bonus per ",
				usagescalc: "event.value = How('Proficiency Bonus');",
				recovery: "long rest",
				additional: "1d10 damage",
			},
		},
		trait: "Goliath (Fire Giant Ancestry)"+
			"\n \u2022 Fire's Burn: When I hit a target with an attack roll and damage it, I can deal it an extra +1d10 Fire damage. I can do this my Proficiency Bonus times per Long Rest."+
			"\n \u2022 Powerful Build: I have Adv. on saves to end being Grappled and I count as one size larger when determining my carrying capacity."+
			"\n \u2022 Large Form (level 5): As a Bonus Action once per Long Rest, I can become Large, if I fit, for 10 min or until I end it (no action). I have Adv. on Str checks and +10 ft Speed during.",
	},
	"goliath-frost": {
		regExpSearch: /^(?=.*frost)(?=.*goliath).*$/i,
		sortname: "Frost Giant Ancestry Goliath",
		source: [["SRD24", 85], ["P24", 192]],
		features: {
			"frost's chill": {
				name: "Frost's Chill",
				source: [["SRD24", 85], ["P24", 192]],
				minlevel: 1,
				usages: "Proficiency bonus per ",
				usagescalc: "event.value = How('Proficiency Bonus');",
				recovery: "long rest",
				additional: "1d6 dmg; -10 ft",
			},
		},
		trait: "Goliath (Frost Giant Ancestry)"+
			"\n \u2022 Frost's Chill: My Prof. Bonus times per Long Rest, when my attack roll deals damage to a target, I can do it +1d6 Cold damage and give it -10 ft Speed until my next turn starts."+
			"\n \u2022 Powerful Build: I have Adv. on saves to end being Grappled and I count as one size larger when determining my carrying capacity."+
			"\n \u2022 Large Form (level 5): As a Bonus Action once per Long Rest, I can become Large, if I fit, for 10 min or until I end it (no action). I have Adv. on Str checks and +10 ft Speed during.",
	},
	"goliath-hill": {
		regExpSearch: /^(?=.*hill)(?=.*goliath).*$/i,
		sortname: "Hill Giant Ancestry Goliath",
		source: [["SRD24", 85], ["P24", 192]],
		features: {
			"hill's tumble": {
				name: "Hill's Tumble",
				source: [["SRD24", 85], ["P24", 192]],
				minlevel: 1,
				usages: "Proficiency bonus per ",
				usagescalc: "event.value = How('Proficiency Bonus');",
				recovery: "long rest",
				additional: "knock Prone",
			},
		},
		trait: "Goliath (Hill Giant Ancestry)"+
			"\n \u2022 Hill's Tumble: When I hit a Large or smaller creature with an attack roll and damage it, I can give it the Prone condition. I can do this my Proficiency Bonus times per Long Rest."+
			"\n \u2022 Powerful Build: I have Adv. on saves to end being Grappled and I count as one size larger when determining my carrying capacity."+
			"\n \u2022 Large Form (level 5): As a Bonus Action once per Long Rest, I can become Large, if I fit, for 10 min or until I end it (no action). I have Adv. on Str checks and +10 ft Speed during.",
	},
	"goliath-stone": {
		regExpSearch: /^(?=.*stone)(?=.*goliath).*$/i,
		sortname: "Stone Giant Ancestry Goliath",
		source: [["SRD24", 85], ["P24", 192]],
		features: {
			"stone's endurance": {
				name: "Stone's Endurance",
				source: [["SRD24", 85], ["P24", 192]],
				minlevel: 1,
				usages: "Proficiency bonus per ",
				usagescalc: "event.value = How('Proficiency Bonus');",
				recovery: "long rest",
				additional: "1d12 + Con mod",
				action: [["reaction", " (when taking damage)"]],
			},
		},
		trait: "Goliath (Stone Giant Ancestry)"+
			"\n \u2022 Stone's Endurance: As a Reaction when I take damage, I can reduce that damage with 1d12 + my Constitution modifier. I can do this my Proficiency Bonus times per Long Rest."+
			"\n \u2022 Powerful Build: I have Adv. on saves to end being Grappled and I count as one size larger when determining my carrying capacity."+
			"\n \u2022 Large Form (level 5): As a Bonus Action once per Long Rest, I can become Large, if I fit, for 10 min or until I end it (no action). I have Adv. on Str checks and +10 ft Speed during.",
	},
	"goliath-storm": {
		regExpSearch: /^(?=.*storm)(?=.*goliath).*$/i,
		sortname: "Storm Giant Ancestry Goliath",
		source: [["SRD24", 86], ["P24", 192]],
		features: {
			"storm's thunder": {
				name: "Storm's Thunder",
				source: [["SRD24", 86], ["P24", 192]],
				minlevel: 1,
				usages: "Proficiency bonus per ",
				usagescalc: "event.value = How('Proficiency Bonus');",
				recovery: "long rest",
				additional: "1d8 damage",
				action: [["reaction", " (when taking damage)"]],
			},
		},
		trait: "Goliath (Storm Giant Ancestry)"+
			"\n \u2022 Storm's Thunder: As a Reaction when I take damage by a creature within 60 ft, I can deal it 1d8 Thunder damage. I can do this my Proficiency Bonus times per Long Rest."+
			"\n \u2022 Powerful Build: I have Adv. on saves to end being Grappled and I count as one size larger when determining my carrying capacity."+
			"\n \u2022 Large Form (level 5): As a Bonus Action once per Long Rest, I can become Large, if I fit, for 10 min or until I end it (no action). I have Adv. on Str checks and +10 ft Speed during.",
	},
	"tiefling-abyssal": {
		regExpSearch: /^(?=.*(tiefling|planetouched))(?=.*(abyssal|demon)).*$/i,
		name: "Abyssal Tiefling",
		source: [["SRD24", 86], ["P24", 197]],
		dmgres: ["Poison"],
		features: {
			"abyssal legacy 1": {
				name: "Poison Spray (Abyssal Legacy)",
				source: [["SRD24", 86], ["P24", 197]],
				minlevel: 1,
				spellcastingBonus: [{
					name: "Abyssal level 1",
					spells: ["poison spray"],
					selection: ["poison spray"],
					firstCol: 'atwill'
				}]
			},
			"abyssal legacy 3": {
				name: "Ray of Sickness (Abyssal Legacy)",
				source: [["SRD24", 86], ["P24", 197]],
				minlevel: 3,
				usages: 1,
				recovery: "long rest",
				spellFirstColTitle: "LR", // check off when the spell has been used that long rest
				spellcastingBonus: [{
					name: "Abyssal level 3",
					spells: ["ray of sickness"],
					selection: ["ray of sickness"],
					firstCol: "checkbox"
				}]
			},
			"abyssal legacy 5": {
				name: "Hold Person (Abyssal Legacy)",
				source: [["SRD24", 86], ["P24", 197]],
				minlevel: 5,
				usages: 1,
				recovery: "long rest",
				spellFirstColTitle: "LR",
				spellcastingBonus: [{
					name: "Abyssal level 5",
					spells: ["hold person"],
					selection: ["hold person"],
					firstCol: "checkbox"
				}]
			}
		},
		trait: "Abyssal Tiefling"+
			"\n \u2022 Fiendish Legacy: I known the Poison Spray cantrip. I learn Ray of Sickness at level 3 and Hold Person at level 5. I then always have these spells prepared and can cast each once per Long Rest without a spell slot, or by using a spell slot as normal. Intelligence, Wisdom, or Charisma is my spellcasting ability for these (choose when selecting the legacy)."+
			"\n \u2022 Otherworldly Presence: I know the Thaumaterty cantrip and use the same spellcasting ability for it."
	},
	"tiefling-chtonic": {
		regExpSearch: /^(?=.*(tiefling|planetouched))(?=.*(chtonic|yugoloth)).*$/i,
		name: "Chtonic Tiefling",
		source: [["SRD24", 86], ["P24", 197]],
		dmgres: ["Necrotic"],
		features: {
			"chtonic legacy 1": {
				name: "Chill Touch (Chtonic Legacy)",
				source: [["SRD24", 86], ["P24", 197]],
				minlevel: 1,
				spellcastingBonus: [{
					name: "Chtonic level 1",
					spells: ["chill touch"],
					selection: ["chill touch"],
					firstCol: 'atwill'
				}]
			},
			"chtonic legacy 3": {
				name: "False Life (Chtonic Legacy)",
				source: [["SRD24", 86], ["P24", 197]],
				minlevel: 3,
				usages: 1,
				recovery: "long rest",
				spellFirstColTitle: "LR", // check off when the spell has been used that long rest
				spellcastingBonus: [{
					name: "Chtonic level 3",
					spells: ["false life"],
					selection: ["false life"],
					firstCol: "checkbox"
				}]
			},
			"chtonic legacy 5": {
				name: "Ray of Enfeeblement (Chtonic Legacy)",
				source: [["SRD24", 86], ["P24", 197]],
				minlevel: 5,
				usages: 1,
				recovery: "long rest",
				spellFirstColTitle: "LR",
				spellcastingBonus: [{
					name: "Chtonic level 5",
					spells: ["ray of enfeeblement"],
					selection: ["ray of enfeeblement"],
					firstCol: "checkbox"
				}]
			}
		},
		trait: "Chtonic Tiefling"+
			"\n \u2022 Fiendish Legacy: I known the Chill Touch cantrip. I learn False Life at level 3 and Ray of Enfeeblement at level 5. I then always have these spells prepared and can cast each once per Long Rest without a spell slot, or by using a spell slot as normal. Intelligence, Wisdom, or Charisma is my spellcasting ability for these (choose when selecting the legacy)."+
			"\n \u2022 Otherworldly Presence: I know the Thaumaterty cantrip and use the same spellcasting ability for it."
	},
	"tiefling-infernal": {
		regExpSearch: /^(?=.*(tiefling|planetouched))(?=.*(infernal|devil)).*$/i,
		name: "Infernal Tiefling",
		source: [["SRD24", 86], ["P24", 197]],
		dmgres: ["Fire"],
		features: {
			"infernal legacy 1": {
				name: "Fire Bolt (Infernal Legacy)",
				source: [["SRD24", 86], ["P24", 197]],
				minlevel: 1,
				spellcastingBonus: [{
					name: "Infernal level 1",
					spells: ["fire bolt"],
					selection: ["fire bolt"],
					firstCol: 'atwill'
				}]
			},
			"infernal legacy 3": {
				name: "Hellish Rebuke (Infernal Legacy)",
				source: [["SRD24", 86], ["P24", 197]],
				minlevel: 3,
				usages: 1,
				recovery: "long rest",
				spellFirstColTitle: "LR", // check off when the spell has been used that long rest
				spellcastingBonus: [{
					name: "Infernal level 3",
					spells: ["hellish rebuke"],
					selection: ["hellish rebuke"],
					firstCol: "checkbox"
				}]
			},
			"infernal legacy 5": {
				name: "Darkness (Infernal Legacy)",
				source: [["SRD24", 86], ["P24", 197]],
				minlevel: 5,
				usages: 1,
				recovery: "long rest",
				spellFirstColTitle: "LR",
				spellcastingBonus: [{
					name: "Infernal level 5",
					spells: ["darkness"],
					selection: ["darkness"],
					firstCol: "checkbox"
				}]
			}
		},
		trait: "Infernal Tiefling"+
			"\n \u2022 Fiendish Legacy: I known the Fire Bolt cantrip. I learn Hellish Rebuke at level 3 and Darkness at level 5. I then always have these spells prepared and can cast each once per Long Rest without a spell slot, or by using a spell slot as normal. Intelligence, Wisdom, or Charisma is my spellcasting ability for these (choose when selecting the legacy)."+
			"\n \u2022 Otherworldly Presence: I know the Thaumaterty cantrip and use the same spellcasting ability for it."
	},
};