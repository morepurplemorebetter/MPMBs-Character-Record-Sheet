var Base_RaceList = {
	"dwarf": {
		regExpSearch: /dwarf|dwarv(ish|en)|neidar|klar|hylar|daewar/i,
		name: "Dwarf",
		source: [["free", 0], ["P24", 188]],
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
		source: [["free", 0], ["P24", 189]],
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
	"halfling": {
		regExpSearch: /half.?ling|hobbit/i,
		name: "Halfling",
		source: [["free", 0], ["P24", 193]],
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
		source: [["free", 0], ["P24", 194]],
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
};

var Base_RaceSubList = {
	"elf-drow": {
		regExpSearch: /^((?=.*drow)|(?=.*(elfs?|elv(es|ish|en))\b)(?=.*(dark|underdark|deep|depth))).*$/i,
		name: "Drow",
		source: [["free", 0], ["P24", 190]],
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
				source: [["free", 0], ["P24", 190]],
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
				source: [["free", 0], ["P24", 190]],
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
				source: [["free", 0], ["P24", 190]],
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
		source: [["free", 0], ["P24", 190]],
		spellcastingAbility: [4, 5, 6],
		trait: "\u2022 High Elf Lineage: I know Prestidigitation and can replace it with another Wizard cantrip after a Long Rest, Detect Magic at level 3, and Misty Step at level 5. I can cast each spell once per Long Rest or by using a Spell Slot as normal; Int, Wis, or Cha is my spellcasting ability for these (choose one)."+
			(typePF ? "\n \u2022 Keen Senses: I gain proficiency in Insight, Perception, or Survival." : " \u2022 Keen Senses: Insight, Perception, or Survival prof.")+
			"\n \u2022 Fey Ancestry: I have Advantage on saving throws to avoid or end being Charmed."+
			"\n \u2022 Trance: I don't need to sleep and magic can't put me to sleep. I can have a Long Rest in 4 hours if I spend it in a trancelike meditation, during which I retain consciousness.",
		features: {
			"high elf lineage 1": {
				name: "Prestidigitation (High Elf Lineage)",
				source: [["free", 0], ["P24", 190]],
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
				source: [["free", 0], ["P24", 190]],
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
				source: [["free", 0], ["P24", 190]],
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
		regExpSearch : /^((?=.*(grugach|kagonesti|silhana))|(?=.*(elfs?|elv(es|ish|en))\b)(?=.*\b(woodlands?|woods?|forests?|wilds?|green)\b)).*$/i,
		name: "Wood Elf",
		source: [["free", 0], ["P24", 190]],
		speed: { walk: { spd: 35, enc: 25 } },
		spellcastingAbility: [4, 5, 6],
		trait: "\u2022 Wood Elf Lineage: I know Druidcraft, Longstrider at level 3, and Pass without Trace at level 5. I can cast each spell once per Long Rest or by using a Spell Slot as normal; Int, Wis, or Cha is my spellcasting ability for these (choose when selecting the lineage)."+
			"\n \u2022 Fey Ancestry: I have Advantage on saving throws to avoid or end being Charmed."+
			"\n \u2022 Keen Senses: I gain proficiency in Insight, Perception, or Survival."+
			"\n \u2022 Trance: I don't need to sleep and magic can't put me to sleep. I can have a Long Rest in 4 hours if I spend it in a trancelike meditation, during which I retain consciousness.",
		features: {
			"wood elf lineage 1": {
				name: "Druidcraft (Wood Elf Lineage)",
				source: [["free", 0], ["P24", 190]],
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
				source: [["free", 0], ["P24", 190]],
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
				source: [["free", 0], ["P24", 190]],
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
};