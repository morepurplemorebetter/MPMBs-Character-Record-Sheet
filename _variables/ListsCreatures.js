var Base_CreatureList = {
	// The four elementals (for Druid Wild Shape)
	"air elemental" : {
		name : "Elemental, Air",
		nameAlt : ["Air Elemental"],
		source : [["SRD", 305], ["M", 124]],
		size : 2, //Large
		type : "Elemental",
		alignment : "Neutral",
		ac : 15,
		hp : 90,
		hd : [12, 10],
		speed : "fly 90 ft (hover)",
		scores : [14, 20, 14, 6, 10, 6],
		damage_resistances : "lightning; thunder; bludgeoning, piercing, and slashing from nonmagical weapons",
		damage_immunities : "poison",
		condition_immunities : "exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious",
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		languages : "Auran",
		challengeRating : "5",
		proficiencyBonus : 3,
		attacksAction : 2,
		attacks : [{
			name : "Slam",
			ability : 2,
			damage : [2, 8, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Two slam attacks as an Attack action"
		}, {
			name : "Whirlwind (Recharge 4-6)",
			ability : 1,
			damage : [3, 8, "bludgeoning"],
			range : "All in shared area",
			dc : true,
			description : "Str save; fail\u2015 flung 20 ft random direction, prone; success\u2015 half damage",
			tooltip : "Each creature in the elemental's space that fails its saving throw is flung up to 20 ft away from the elemental in a random direction and knocked prone. If a thrown target strikes an object, such as a wall or floor, the target takes 3 (1d6) bludgeoning damage for every 10 ft it was thrown. If the target is thrown at another creature, that creature must succeed on a DC 13 Dexterity saving throw or take the same damage and be knocked prone.\nIf the saving throw is successful, the target takes half the bludgeoning damage and isn't flung away or knocked prone."
		}],
		traits : [{
			name : "Air Form",
			description : "The elemental can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing."
		}],
		actions : [{
			name : "Whirlwind (Recharge 4-6)",
			description : "See Attack. Each creature in the elemental's space that fails its saving throw is flung up to 20 ft away from the elemental in a random direction and knocked prone. If a thrown target strikes an object, such as a wall or floor, the target takes 3 (1d6) bludgeoning damage for every 10 ft it was thrown. If the target is thrown at another creature, that creature must succeed on a DC 13 Dexterity saving throw or take the same damage and be knocked prone.\nIf the saving throw is successful, the target takes half the bludgeoning damage and isn't flung away or knocked prone."
		}],
		wildshapeString : "Darkvision 60 ft| Knows Auran| Resistant to: lightning, thunder, and bludgeoning, piercing, and slashing from nonmagical weapons| Immune to: poison, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious| Air Form: can move through 1 inch wide space without squeezing and can move through and stop in space of hostiles| Whirlwind: see Monster Manual page 124"
	},
	"earth elemental" : {
		name : "Elemental, Earth",
		nameAlt : ["Earth Elemental"],
		source : [["SRD", 306], ["M", 124]],
		size : 2, //Large
		type : "Elemental",
		alignment : "Neutral",
		ac : 17,
		hp : 126,
		hd : [12, 10],
		speed : "30 ft, burrow 30 ft",
		scores : [20, 8, 20, 5, 10, 5],
		damage_vulnerabilities : "thunder",
		damage_resistances : "bludgeoning, piercing, and slashing from nonmagical weapons",
		damage_immunities : "poison",
		condition_immunities : "exhaustion, paralyzed, petrified, poisoned, unconscious",
		senses : "Darkvision 60 ft; Tremorsense 60 ft",
		passivePerception : 10,
		languages : "Terran",
		challengeRating : "5",
		proficiencyBonus : 3,
		attacksAction : 2,
		attacks : [{
			name : "Slam",
			ability : 1,
			damage : [2, 8, "bludgeoning"],
			range : "Melee (10 ft)",
			description : "Two slam attacks as an Attack action"
		}],
		traits : [{
			name : "Earth Glide",
			description : "The elemental can burrow through nonmagical, unworked earth and stone. While doing so, the elemental doesn't disturb the material it moves through."
		}, {
			name : "Siege Monster",
			description : "The elemental deals double damage to objects and structures."
		}],
		wildshapeString : "Darkvision 60 ft; Tremorsense 60 ft| Knows Terran| Vulnerable to: thunder| Resistant to: bludgeoning, piercing, and slashing from nonmagical weapons| Immune to: poison, exhaustion, paralyzed, petrified, poisoned, unconscious| Earth Glide: can burrow through nonmagical, unworked earth and stone without disturbing the material| Siege Monster: does double damage to objects and structures"
	},
	"fire elemental" : {
		name : "Elemental, Fire",
		nameAlt : ["Fire Elemental"],
		source : [["SRD", 306], ["M", 124]],
		size : 2, //Large
		type : "Elemental",
		alignment : "Neutral",
		ac : 13,
		hp : 102,
		hd : [12, 10],
		speed : "50 ft",
		scores : [10, 17, 16, 6, 10, 7],
		damage_resistances : "bludgeoning, piercing, and slashing from nonmagical weapons",
		damage_immunities : "fire, poison",
		condition_immunities : "exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious",
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		languages : "Ignan",
		challengeRating : "5",
		proficiencyBonus : 3,
		attacksAction : 2,
		attacks : [{
			name : "Touch",
			ability : 2,
			damage : [2, 6, "fire"],
			range : "Melee (5 ft)",
			description : "2 per Attack; Ignites flammable; Until action to douse, target 1d10 fire damage at start of its turn"
		}],
		traits : [{
			name : "Fire Form",
			description : "The elemental can move through a space as narrow as 1 inch wide without squeezing. A creature that touches the elemental or hits it with a melee attack while within 5 ft of it takes 5 (1d10) fire damage. In addition, the elemental can enter a hostile creature's space and stop there. The first time it enters a creature's space on a turn, that creature takes 5 (1d10) fire damage and catches fire; until someone takes an action to douse the fire, the creature takes 5 (1d10) fire damage at the start of each of its turns."
		}, {
			name : "Illumination",
			description : "The elemental sheds bright light in a 30-ft radius and dim light in an additional 30 ft."
		}, {
			name : "Water Susceptibility",
			description : "For every 5 ft the elemental moves in water, or for every gallon of water splashed on it, it takes 1 cold damage."
		}],
		wildshapeString : "Darkvision 60 ft| Knows Ignan| Resistant to: bludg./ piercing/slashing from nonmagical weapons| Immune to: fire/poison/exhaustion/grappled/paralyzed/petrified/ poisoned/prone/restrained/unconscious| Sheds 30-ft bright/dim light| 1 cold dmg per gallon of or 5ft moved through water| Fire Form: pass through 1\" space no squeezing; move through/stop in another's space; do 1d10 fire dmg to melee attackers; MM, p125"
	},
	"water elemental" : {
		name : "Elemental, Water",
		nameAlt : ["Water Elemental"],
		source : [["SRD", 307], ["M", 124]],
		size : 2, //Large
		type : "Elemental",
		alignment : "Neutral",
		ac : 14,
		hp : 114,
		hd : [12, 10],
		speed : "30 ft, swim 90 ft",
		scores : [18, 14, 18, 5, 10, 8],
		damage_resistances : "acid; bludgeoning, piercing, and slashing from nonmagical weapons",
		damage_immunities : "poison",
		condition_immunities : "exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious",
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		languages : "Aquan",
		challengeRating : "5",
		proficiencyBonus : 3,
		attacksAction : 2,
		attacks : [{
			name : "Slam",
			ability : 1,
			damage : [2, 8, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Two slam attacks as an Attack action"
		}, {
			name : "Whelm (Recharge 4-6)",
			ability : 1,
			dc : true,
			damage : [2, 8, "bludgeoning"],
			range : "All in shared area",
			description : "Str save; fail\u2015 dmg/grappled/restrained/can't breathe until grapple ends (escape DC 14); success\u2015 no dmg/pushed out",
			tooltip : "Each creature in the elemental's space that is Large or smaller, is also grappled (escape DC 14). Until this grapple ends, the target is restrained and unable to breathe unless it can breathe water. If the saving throw is successful, the target is pushed out of the elemental's space.\nThe elemental can grapple one Large creature or up to two Medium or smaller creatures at one time. At the start of each of the elemental's turns, each target grappled by it takes 13 (2d8 + 4) bludgeoning damage. A creature within 5 ft of the elemental can pull a creature or object out of it by taking an action to make a DC 14 Strength check and succeeding."
		}],
		features : [{
			name : "Freeze",
			description : "If the elemental takes cold damage, it partially freezes; its speed is reduced by 20 ft until the end of its next turn."
		}],
		traits : [{
			name : "Water Form",
			description : "The elemental can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing."
		}],
		actions : [{
			name : "Whelm (Recharge 4-6)",
			description : "See attack. Each creature in the elemental's space that is Large or smaller, is also grappled (escape DC 14). Until this grapple ends, the target is restrained and unable to breathe unless it can breathe water. If the saving throw is successful, the target is pushed out of the elemental's space.\nThe elemental can grapple one Large creature or up to two Medium or smaller creatures at one time. At the start of each of the elemental's turns, each target grappled by it takes 13 (2d8 + 4) bludgeoning damage. A creature within 5 ft of the elemental can pull a creature or object out of it by taking an action to make a DC 14 Strength check and succeeding."
		}],
		wildshapeString : "Darkvision 60 ft| Knows Aquan| Resistant to: acid, and bludg./piercing/slashing from nonmagical weapons| Immune to: poison, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious|  Water Form: pass through 1\" space without squeezing; move through and stop in another's space| Freeze: if taken cold damage, speed reduced to 20 ft until end of next turn| Whelm: see Monster Manual page 125"
	},
	// Dinosaurs (which are beasts for Druid Wild Shape)
	"plesiosaurus" : {
		name : "Plesiosaurus",
		source : [["SRD", 279], ["M", 79]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 13,
		hp : 68,
		hd : [8, 10],
		speed : "20 ft, swim 40 ft",
		scores : [18, 15, 16, 2, 12, 5],
		skills : {
			"perception" : 3,
			"stealth" : 4
		},
		senses : "",
		passivePerception : 13,
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [3, 6, "piercing"],
			range : "Melee (10 ft)",
			description : ""
		}],
		traits : [{
			name : "Hold Breath",
			description : "The plesiosaurus can hold its breath for 1 hour."
		}]
	},
	"triceratops" : {
		name : "Triceratops",
		source : [["SRD", 279], ["M", 79]],
		size : 1, //Huge
		type : "Beast",
		alignment : "Unaligned",
		ac : 13,
		hp : 95,
		hd : [10, 12],
		speed : "50 ft",
		scores : [22, 9, 17, 2, 11, 5],
		senses : "",
		passivePerception : 10,
		challengeRating : "5",
		proficiencyBonus : 3,
		attacksAction : 1,
		attacks : [{
			name : "Gore",
			ability : 1,
			damage : [4, 8, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Trampling Charge trait"
		}, {
			name : "Stomp",
			ability : 1,
			damage : [3, 10, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Can only be used on prone creatures (also see Trampling Charge trait)"
		}],
		traits : [{
			name : "Trampling Charge",
			description : "If the triceratops moves at least 20 ft straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the triceratops can make one stomp attack against it as a bonus action."
		}]
	},
	"tyrannosaurus rex" : {
		name : "Tyrannosaurus Rex",
		nameAlt : ["T-Rex"],
		source : [["SRD", 279], ["M", 79]],
		size : 1, //Huge
		type : "Beast",
		alignment : "Unaligned",
		ac : 13,
		hp : 136,
		hd : [13, 12],
		speed : "50 ft",
		scores : [25, 10, 19, 2, 12, 9],
		skills : {
			"perception" : 4
		},
		senses : "",
		passivePerception : 14,
		challengeRating : "8",
		proficiencyBonus : 3,
		attacksAction : 2,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [4, 12, "piercing"],
			range : "Melee (10 ft)",
			description : "Medium or smaller target is grappled and restrained (escape DC 17); Can't use bite again until grapple ends"
		}, {
			name : "Tail",
			ability : 1,
			damage : [3, 8, "bludgeoning"],
			range : "Melee (10 ft)",
			description : "One bite and one tail attack to different targets as an Attack action"
		}],
		traits : [{
			name : "Multiattack",
			description : "The tyrannosaurus makes two attacks: one with its bite and one with its tail. It can't make both attacks against the same target."
		}]
	},
	// Exotic mounts and pets
	"griffon" : {
		name : "Griffon",
		source : [["SRD", 318], ["M", 174]],
		size : 2, //Large
		type : "Monstrosity",
		companion : "steed",
		alignment : "Unaligned",
		ac : 12,
		hp : 59,
		hd : [7, 10],
		speed : "30 ft, fly 80 ft",
		scores : [18, 15, 16, 2, 13, 8],
		skills : {
			"perception" : 5
		},
		senses : "Darkvision 60 ft; Adv. on Wis (Perception) checks using sight",
		passivePerception : 15,
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
			name : "Beak",
			ability : 1,
			damage : [1, 8, "piercing"],
			range : "Melee (5 ft)",
			description : "One beak and one claws attack as an Attack action"
		}, {
			name : "Claws",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "One claws and one beak attack as an Attack action"
		}],
		actions : [{
			name : "Multiattack",
			description : "The griffon makes two attacks: one with its beak and one with its claws."
		}],
		traits : [{
			name : "Keen Sight",
			description : "The griffon has advantage on Wisdom (Perception) checks that rely on sight."
		}]
	},
	"hippogriff" : {
		name : "Hippogriff",
		source : [["SRD", 322], ["M", 184]],
		size : 2, //Large
		type : "Monstrosity",
		alignment : "Unaligned",
		ac : 11,
		hp : 19,
		hd : [3, 10],
		speed : "40 ft, fly 60 ft",
		scores : [17, 13, 13, 2, 12, 8],
		skills : {
			"perception" : 5
		},
		senses : "Adv. on Wis (Perception) checks using sight",
		passivePerception : 15,
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
			name : "Beak",
			ability : 1,
			damage : [1, 10, "piercing"],
			range : "Melee (5 ft)",
			description : "One beak and one claws attack as an Attack action"
		}, {
			name : "Claws",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "One claws and one beak attack as an Attack action"
		}],
		actions : [{
			name : "Multiattack",
			description : "The hippogriff makes two attacks: one with its beak and one with its claws."
		}],
		traits : [{
			name : "Keen Sight",
			description : "The hippogriff has advantage on Wisdom (Perception) checks that rely on sight."
		}]
	},
	"nightmare" : {
		name : "Nightmare",
		source : [["SRD", 336], ["M", 235]],
		size : 2, //Large
		type : "Fiend",
		alignment : "Neutral Evil",
		ac : 13,
		hp : 68,
		hd : [8, 10],
		speed : "60 ft, fly 90 ft",
		scores : [18, 15, 16, 10, 13, 15],
		damage_immunities : "fire",
		senses : "",
		passivePerception : 11,
		languages : "understands Abyssal, Common, and Infernal but can't speak",
		challengeRating : "3",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Hooves",
			ability : 1,
			damage : [2, 8, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Target also takes 2d6 fire damage upon a hit"
		}],
		traits : [{
			name : "Confer Fire Resistance",
			description : "The nightmare can grant resistance to fire damage to anyone riding it."
		}, {
			name : "Illumination",
			description : "The nightmare sheds bright light in a 10-ft radius and dim light for an additional 10 ft."
		}],
		actions : [{
			name : "Ethereal Stride",
			description : "As an action, the nightmare and up to three willing creatures within 5 ft of it magically enter the Ethereal Plane from the Material Plane, or vice versa."
		}]
	},
	"owlbear" : {
		name : "Owlbear",
		source : [["SRD", 339], ["M", 249]],
		size : 2, //Large
		type : "Monstrosity",
		alignment : "Unaligned",
		ac : 13,
		hp : 59,
		hd : [7, 10],
		speed : "40 ft",
		scores : [20, 12, 17, 3, 12, 7],
		skills : {
			"perception" : 3
		},
		senses : "Darkvision 60 ft; Adv. on Wis (Perception) checks using sight/smell",
		passivePerception : 13,
		challengeRating : "3",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
			name : "Beak",
			ability : 1,
			damage : [1, 10, "piercing"],
			range : "Melee (5 ft)",
			description : "One beak and one claws attack as an Attack action"
		}, {
			name : "Claws",
			ability : 1,
			damage : [2, 8, "slashing"],
			range : "Melee (5 ft)",
			description : "One claws and one beak attack as an Attack action"
		}],
		actions : [{
			name : "Multiattack",
			description : "The owlbear makes two attacks: one with its beak and one with its claws."
		}],
		traits : [{
			name : "Keen Sight and Smell",
			description : "The owlbear has advantage on Wisdom (Perception) checks that rely on sight or smell."
		}]
	},
	"pegasus" : {
		name : "Pegasus",
		source : [["SRD", 340], ["M", 250]],
		size : 2, //Large
		type : "Celestial",
		companion : "steed",
		alignment : "Chaotic Good",
		ac : 12,
		hp : 59,
		hd : [7, 10],
		speed : "60 ft, fly 90 ft",
		scores : [18, 15, 16, 10, 15, 13],
		saves : ["", 4, "", "", 4, 3],
		skills : {
			"perception" : 6
		},
		senses : "",
		passivePerception : 16,
		languages : "understands Celestial, Common, Elvish, and Sylvan but can't speak",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Hooves",
			ability : 1,
			damage : [2, 6, "bludgeoning"],
			range : "Melee (5 ft)",
			description : ""
		}]
	},
	// Special familiars (find familiar, pact of the chain, DM's rulings)
	"homunculus" : { // Contains contributions by SoilentBrad
		name : "Homunculus",
		source : [["SRD", 322], ["M", 188]],
		size : 5,
		type : "Construct",
		alignment : "Neutral",
		ac : 13,
		hp : 5,
		hd : [2, 4],
		speed : "20 ft, fly 40 ft",
		scores : [4, 15, 11, 10, 10, 7],
		damage_immunities : "poison",
		condition_immunities : "charmed, poisoned",
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		languages : "understands the languages of its creator but can't speak",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, "", "piercing"],
			range : "Melee (5 ft)",
			description : "DC 10 Con save or poisoned for 1 min; Fail by 5 or more: poisoned and unconscious for 1d10 min",
			tooltip : "A target of the homunculus' bite attack must succeed on a DC 10 Constitution saving throw or be poisoned for 1 minute. If the saving throw fails by 5 or more, the target is instead poisoned for 5 (1d10) minutes and unconscious while poisoned in this way."
		}],
		features : [{
			name : "Telepathic Bond",
			description : "While the homunculus is on the same plane of existence as its master, it can magically convey what it senses to its master, and the two can communicate telepathically."
		}, {
			name : "Bite",
			description : "A target of the homunculus' bite attack must succeed on a DC 10 Constitution saving throw or be poisoned for 1 minute. If the saving throw fails by 5 or more, the target is instead poisoned for 5 (1d10) minutes and unconscious while poisoned in this way."
		}]
	},
	"imp" : {
		name : "Imp",
		source : [["SRD", 277], ["M", 76]],
		size : 5, //Tiny
		type : "Fiend",
		subtype : "devil",
		companion : "pact_of_the_chain",
		alignment : "Lawful Evil",
		ac : 13,
		hp : 10,
		hd : [3, 4],
		speed : "20 ft, fly 40 ft",
		scores : [6, 17, 13, 11, 12, 14],
		skills : {
			"deception" : 4,
			"insight" : 3,
			"persuasion" : 4,
			"stealth" : 5
		},
		damage_resistances : "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silver weapons",
		damage_immunities : "fire, poison",
		condition_immunities : "poisoned",
		senses : "Darkvision 120 ft; Devil's Sight (Magical darkness doesn't impede the imp's Darkvision)",
		passivePerception : 11,
		languages : "Infernal, Common",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Sting (Bite in Beast Form)",
			ability : 2,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : "Target also takes 3d6 poison damage, half on a DC 11 Constitution saving throw"
		}],
		traits : [{
			name : "Shapechanger",
			description : "The imp can use its action to polymorph into a beast form that resembles a rat (speed 20 ft), a raven (20 ft, fly 60 ft), or a spider (20 ft, climb 20 ft), or back into its true form. Its statistics are the same in each form, except for the speed changes noted. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."
		}, {
			name : "Magic Resistance",
			description : "The imp has advantage on saving throws against spells and other magical effects."
		}],
		variant : [{
			name : "Variant: Familiar",
			description : "The imp can serve another creature as a familiar, forming a telepathic bond with its willing master. While the two are bonded, the master can sense what the imp senses as long as they are within 1 mile of each other. While the imp is within 10 ft of its master, the master shares the imp's Magic Resistance trait. At any time and for any reason, the imp can end its service as a familiar, ending the telepathic bond."
		}],
		actions : [{
			name : "Invisibility",
			description : "As an action, the imp magically turns invisible until it attacks, or until its concentration ends (as if concentrating on a spell). Any equipment the imp wears or carries is invisible with it."
		}]
	},
	"pseudodragon" : {
		name : "Pseudodragon",
		nameAlt : ["Dragon, Pseudo"],
		source : [["SRD", 340], ["M", 254]],
		size : 5, //Tiny
		type : "Dragon",
		companion : "pact_of_the_chain",
		alignment : "Neutral Good",
		ac : 13,
		hp : 7,
		hd : [2, 4],
		speed : "15 ft, fly 60 ft",
		scores : [6, 15, 13, 10, 12, 10],
		skills : {
			"perception" : 3,
			"stealth" : 4
		},
		senses : "Blindsight 10 ft; Darkvision 60 ft; Adv. on Wis (Perception) checks using hearing/sight/smell",
		passivePerception : 13,
		languages : "understands Common and Draconic but can't speak",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}, {
			name : "Sting",
			ability : 2,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : "DC 11 Con save or poisoned 1 hour; fail by 5 or more: unconscious 1 hour, until damaged or awakened",
			tooltip : "The target hit must succeed on a DC 11 Constitution saving throw or become poisoned for 1 hour. If the saving throw fails by 5 or more, the target falls unconscious for the same duration, or until it takes damage or another creature uses an action to shake it awake."
		}],
		traits : [{
			name : "Keen Senses",
			description : "The pseudodragon has advantage on Wisdom (Perception) checks that rely on sight, hearing, or smell."
		}, {
			name : "Magic Resistance",
			description : "The pseudodragon has advantage on saving throws against spells and other magical effects."
		}, {
			name : "Limited Telepathy",
			description : "The pseudodragon can magically communicate simple ideas, emotions, and images telepathically with any creature within 100 ft of it that can understand a language."
		}],
		variant : [{
			name : "Variant: Familiar",
			description : "The pseudodragon can serve another creature as a familiar, forming a magic, telepathic bond with that willing companion. While the two are bonded, the companion can sense what the pseudodragon senses as long as they are within 1 mile of each other. While the pseudodragon is within 10 ft of its companion, the companion shares the pseudodragon's Magic Resistance trait. At any time and for any reason, the pseudodragon can end its service as a familiar, ending the telepathic bond."
		}]
	},
	"quasit" : {
		name : "Quasit",
		source : [["SRD", 273], ["M", 63]],
		size : 5, //Tiny
		type : "Fiend",
		subtype : "demon",
		companion : "pact_of_the_chain",
		alignment : "Chaotic Evil",
		ac : 13,
		hp : 7,
		hd : [3, 4],
		speed : "40 ft",
		scores : [5, 17, 10, 7, 10, 10],
		skills : {
			"stealth" : 5
		},
		damage_resistances : "cold; fire; lightning; bludgeoning, piercing, and slashing from nonmagical attacks",
		damage_immunities : "poison",
		condition_immunities : "poisoned",
		senses : "Darkvision 120 ft",
		passivePerception : 10,
		languages : "Abyssal, Common",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Claws (Bite in Beast Form)",
			ability : 2,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : "Target makes DC 10 Con save or takes 2d4 poison damage and poisoned for 1 min (can save each turn)",
			modifiers : [-1, "", ""]
		}, {
			name : "Scare (1/day)",
			ability : 6,
			damage : ["Wis save", "", "Frightened"],
			range : "20 ft",
			description : "Wis save or frightened for 1 min (can save at end of each turn, disadv. if quasit is in sight)",
			abilitytodamage : false,
			dc : true
		}],
		traits : [{
			name : "Shapechanger",
			description : "The quasit can use its action to polymorph into a beast form that resembles a bat (speed 10 ft, fly 40 ft), a centipede (40 ft, climb 40 ft), or a toad (40 ft, swim 40 ft), or back into its true form . Its statistics are the same in each form, except for the speed changes noted. Any equipment it is wearing or carrying isn't transformed . It reverts to its true form if it dies."
		}, {
			name : "Magic Resistance",
			description : "The quasit has advantage on saving throws against spells and other magical effects."
		}],
		variant : [{
			name : "Variant: Familiar",
			description : "The quasit can serve another creature as a familiar, forming a telepathic bond with its willing master. While the two are bonded, the master can sense what the quasit senses as long as they are within 1 mile of each other. While the quasit is within 10 ft of its master, the master shares the quasit's Magic Resistance trait. At any time and for any reason, the quasit can end its service as a familiar, ending the telepathic bond."
		}],
		actions : [{
			name : "Invisibility",
			description : "As an action, the quasit magically turns invisible until it attacks, or until its concentration ends (as if concentrating on a spell). Any equipment the quasit wears or carries is invisible with it."
		}]
	},
	"shield guardian" : {
		name : "Shield Guardian",
		source : [["SRD", 345], ["M", 271]],
		size : 2, //Large
		type : "Construct",
		alignment : "Unaligned",
		ac : 17,
		hp : 142,
		hd : [15, 10],
		speed : "30 ft",
		scores : [18, 8, 18, 7, 10, 3],
		damage_immunities : "poison",
		condition_immunities : "charmed, exhaustion, frightened, paralyzed, poisoned",
		senses : "Blindsight 10 ft; Darkvision 60 ft",
		passivePerception : 10,
		languages : "understands commands given in any language but can't speak",
		challengeRating : "7",
		proficiencyBonus : 3,
		attacksAction : 2,
		attacks : [{
			name : "Fist",
			ability : 1,
			damage : [2, 6, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Two fist attacks as an Attack action"
		}],
		traits : [{
			name : "Regeneration",
			description : "The guardian regains 10 HP at the start of its turn if it has at least 1 HP."
		}, {
			name : "Spell Storing",
			description : "A spellcaster who wears the shield guardian's amulet can cause the guardian to store one spell of 4th level or lower. To do so, the wearer must cast the spell on the guardian. The spell has no effect but is stored within the guardian. When commanded to do so by the wearer or when a situation arises that was predefined by the spellcaster, the guardian casts the stored spell with any parameters set by the original caster, requiring no components. When the spell is cast or a new spell is stored, any previously stored spell is lost."
		}],
		features : [{
			name : "Bound",
			description : "The shield guardian is magically bound to an amulet. As long as the guardian and its amulet are on the same plane of existence, the amulet's wearer can telepathically call the guardian to travel to it, and the guardian knows the distance and direction to the amulet. If the guardian is within 60 ft of the amulet's wearer, half of any damage the wearer takes (rounded up) is transferred to the guardian."
		}],
		actions : [{
			name : "Shield",
			description : "As a reaction, when a creature makes an attack against the wearer of the guardian's amulet, the guardian grants a +2 bonus to the wearer's AC if the guardian is within 5 ft of the wearer."
		}]
	},
	"sprite" : {
		name : "Sprite",
		source : [["SRD", 348], ["M", 283]],
		size : 5, //Tiny
		type : "Fey",
		companion : "pact_of_the_chain",
		alignment : "Neutral Good",
		ac : 15,
		hp : 2,
		hd : [1, 4],
		speed : "10 ft, fly 40 ft",
		scores : [3, 18, 10, 14, 13, 11],
		skills : {
			"perception" : 3,
			"stealth" : 8
		},
		senses : "",
		passivePerception : 13,
		languages : "Common, Elvish, Sylvan",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Longsword",
			ability : 2,
			damage : [1, "", "slashing"],
			range : "Melee (5 ft)",
			description : "",
			modifiers : ["Str", ""],
			abilitytodamage : false
		}, {
			name : "Shortbow",
			ability : 2,
			damage : [1, "", "piercing"],
			range : "40/160 ft",
			description : "",
			abilitytodamage : false,
			description : "DC 10 Con save or poisoned 1 min; fail by 5 or more: also unconscious 1 min, until damaged or awakened",
			tooltip : "The target hit must succeed on a DC 10 Constitution saving throw or become poisoned for 1 minute. If its saving throw result is 5 or lower, the poisoned target falls unconscious for the same duration, or until it takes damage or another creature takes an action to shake it awake."
		}, {
			name : "Heart Sight",
			ability : 6,
			damage : ["Cha save", "", "Reveal"],
			range : "Touch (5 ft)",
			description : "Cha save or sprite knows emotional state and alignment (celestial/fiend/undead auto fail the save)",
			abilitytodamage : false,
			dc : true
		}],
		actions : [{
			name : "Invisibility",
			description : "As an action, the sprite magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell). Any equipment the sprite wears or carries is invisible with it."
		}]
	},
	// Undead minions
	"ghast" : {
		name : "Ghast",
		source : [["SRD", 311], ["M", 148]],
		size : 3, //Medium
		type : "Undead",
		alignment : "Chaotic Evil",
		ac : 12,
		hp : 36,
		hd : [5, 8],
		speed : "30 ft",
		scores : [16, 17, 10, 11, 10, 8],
		damage_resistances : "necrotic",
		damage_immunities : "poison",
		condition_immunities : "charmed, exhaustion, poisoned",
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		languages : "Common",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [2, 8, "piercing"],
			range : "Melee (5 ft)",
			description : "",
			modifiers : [-2, "", ""]
		}, {
			name : "Claws",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "DC 10 Con save or 1 min paralyzed; Save end of each turn (elf/undead immune)",
			tooltip : "If the target is a creature other than an elf or undead, it must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
		}],
		traits : [{
			name : "Stench",
			description : "Any creature that starts its turn within 5 ft of the ghast must succeed on a DC 10 Constitution saving throw or be poisoned until the start of its next turn. On a successful saving throw, the creature is immune to the ghast's Stench for 24 hours."
		}, {
			name : "Turn Defiance",
			description : "The ghast and any ghouls within 30 ft of it have advantage on saving throws against effects that turn undead."
		}]
	},
	"ghoul" : {
		name : "Ghoul",
		source : [["SRD", 312], ["M", 148]],
		size : 3, //Medium
		type : "Undead",
		alignment : "Chaotic Evil",
		ac : 12,
		hp : 22,
		hd : [5, 8],
		speed : "30 ft",
		scores : [13, 15, 10, 7, 10, 6],
		damage_immunities : "poison",
		condition_immunities : "charmed, exhaustion, poisoned",
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		languages : "Common",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [2, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "",
			modifiers : [-2, "", ""]
		}, {
			name : "Claws",
			ability : 1,
			damage : [2, 4, "slashing"],
			range : "Melee (5 ft)",
			description : "DC 10 Con save or 1 min paralyzed; Save end of each turn (elf/undead immune)",
			tooltip : "If the target is a creature other than an elf or undead, it must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
		}]
	},
	"mummy" : {
		name : "Mummy",
		source : [["SRD", 333], ["M", 228]],
		size : 3, //Medium
		type : "Undead",
		alignment : "Lawful Evil",
		ac : 11,
		hp : 58,
		hd : [9, 8],
		speed : "20 ft",
		scores : [16, 8, 15, 6, 10, 12],
		saves : ["", "", "", "", 2, ""],
		damage_vulnerabilities : "fire",
		damage_resistances : "bludgeoning, piercing, and slashing from nonmagical weapons",
		damage_immunities : "necrotic, poison",
		condition_immunities : "charmed, exhaustion, frightened, paralyzed, poisoned",
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		languages : "all languages it knew in life",
		challengeRating : "3",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
			name : "Rotting Fist",
			ability : 1,
			damage : [2, 6, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "+3d6 necrotic damage; DC 12 Constitution save or cursed with Mummy Rot",
			tooltip : "Multiattack\nAs part of one Attack action, the mummy can use its Dreadful Glare and makes one attack with its rotting fist.\n\nRotting Fist\nIf the target is a creature, it must succeed on a DC 12 Constitution saving throw or be cursed with mummy rot. The cursed target can't regain hit points, and its hit point maximum decreases by 10 (3d6) for every 24 hours that elapse. If the curse reduces the target's hit point maximum to 0, the target dies, and its body turns to dust. The curse lasts until removed by the remove curse spell or other magic."
		}, {
			name : "Dreadful Glare",
			ability : 6,
			damage : ["Wis save", "", "Frightened"],
			range : "60 ft",
			description : "Wis save or frightened for 1 round; If failed by 5 or more, paralyzed as well",
			tooltip : "Multiattack\nAs part of one Attack action, the mummy can use its Dreadful Glare and makes one attack with its rotting fist.\n\nDreadful Glare\nThe mummy targets one creature it can see within 60 ft of it. If the target can see the mummy, it must succeed on a DC 11 Wisdom saving throw against this magic or become frightened until the end of the mummy's next turn. If the target fails the saving throw by 5 or more, it is also paralyzed for the same duration. A target that succeeds on the saving throw is immune to the Dreadful Glare of all mummies (but not mummy lords) for the next 24 hours.",
			abilitytodamage : false,
			dc : true
		}],
		traits : [{
			name : "Multiattack",
			description : "With one Attack action, do both Dreadful Glare and a Rotting Fist attack."
		}, {
			name : "Mummy Rot",
			description : "A cursed creature can't regain hit points, and its hit point maximum decreases by 3d6 for every 24 hours that elapse. If the curse reduces the target's hit point maximum to 0, the target dies, and its body turns to dust. The curse lasts until removed by the remove curse spell or other magic."
		}, {
			name : "Dreadful Glare",
			description : "If the target can see the mummy, it must succeed on a DC 11 Wisdom saving throw against this magic or become frightened until the end of the mummy's next turn. If the target fails the saving throw by 5 or more, it is also paralyzed for the same duration. A target that succeeds on the saving throw is immune to the Dreadful Glare of all mummies (but not mummy lords) for the next 24 hours."
		}]
	},
	"shadow" : {
		name : "Shadow",
		source : [["SRD", 344], ["M", 269]],
		size : 3, //Medium
		type : "Undead",
		alignment : "chaotic evil",
		ac : 12,
		hp : 16,
		hd : [3, 8],
		speed : "40 ft",
		scores : [6, 14, 13, 6, 10, 8],
		skills : {
			"stealth" : 4,
		},
		damage_vulnerabilities : "radiant",
		damage_resistances : "acid; cold; fire; lightning; thunder; bludgeoning, piercing, and slashing from nonmagical weapons",
		damage_immunities : "necrotic, poison",
		condition_immunities : "exhaustion, frightened, grappled, paralyzed, petrified, poisoned, prone, restrained",
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Strength Drain",
			ability : 2,
			damage : [2, 6, "necrotic"],
			range : "Melee (5 ft)",
			description : "Reduces Str by 1d4 till target's next short rest; If Str goes to 0, the target dies and forms a new shadow",
			tooltip : "A target of the shadows' strength drain has its Strength score reduced by 1d4. The target dies if this reduces its Strength to 0. Otherwise, the reduction lasts until the target finishes a short or long rest.\nIf a non-evil humanoid dies from this attack, a new shadow rises from the corpse 1d4 hours later."
		}],
		traits : [{
			name : "Amorphous",
			description : "The shadow can move through a space as narrow as 1 inch wide without squeezing."
		}, {
			name : "Shadow Stealth",
			description : "While in dim light or darkness, the shadow can take the Hide action as a bonus action and adds an extra +2 on Stealth checks."
		}, {
			name : "Sunlight Weakness",
			description : "While in sunlight, the shadow has disadvantage on attack rolls, ability checks, and saving throws."
		}, {
			name : "Strength Drain",
			description : "A target of the shadows' strength drain has its Strength score reduced by 1d4. The target dies if this reduces its Strength to 0. Otherwise, the reduction lasts until the target finishes a short or long rest.\nIf a non-evil humanoid dies from this attack, a new shadow rises from the corpse 1d4 hours later."
		}],
	},
	"skeleton (humanoid)" : {
		name : "Skeleton (humanoid)",
		nameAlt : ["Skeleton"],
		source : [["SRD", 346], ["M", 272]],
		size : 3, //Medium
		type : "Undead",
		alignment : "lawful evil",
		ac : 13,
		hp : 13,
		hd : [2, 8],
		speed : "30 ft",
		scores : [10, 14, 15, 6, 8, 5],
		damage_vulnerabilities : "bludgeoning",
		damage_immunities : "poison",
		condition_immunities : "exhaustion, poisoned",
		senses : "Darkvision 60 ft",
		passivePerception : 9,
		languages : "understands all languages it knew in life but can't speak",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Shortsword",
			ability : 2,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "Finesse, light"
		}, {
			name : "Shortbow",
			ability : 2,
			damage : [1, 6, "piercing"],
			range : "80/320 ft",
			description : "Ammunition, two-handed"
		}]
	},
	"warhorse skeleton" : {
		name : "Warhorse Skeleton",
		source : [["SRD", 346], ["M", 273]],
		size : 2, //Large
		type : "Undead",
		alignment : "Lawful Evil",
		ac : 13,
		hp : 22,
		hd : [3, 10],
		speed : "60 ft",
		scores : [18, 12, 15, 2, 8, 5],
		damage_vulnerabilities : "bludgeoning",
		damage_immunities : "poison",
		condition_immunities : "exhaustion, poisoned",
		senses : "Darkvision 60 ft",
		passivePerception : 9,
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Hooves",
			ability : 1,
			damage : [2, 6, "bludgeoning"],
			range : "Melee (5 ft)",
			description : ""
		}]
	},
	"specter" : {
		name : "Specter",
		nameAlt : ["Spectre"],
		source : [["SRD", 346], ["M", 279]],
		size : 3, //Medium
		type : "Undead",
		alignment : "Chaotic Evil",
		ac : 12,
		hp : 22,
		hd : [5, 8],
		speed : "fly 50 ft (hover)",
		scores : [1, 14, 11, 10, 10, 12],
		damage_resistances : "acid; cold; fire; lightning; thunder; bludgeoning, piercing, and slashing from nonmagical weapons",
		damage_immunities : "necrotic, poison",
		condition_immunities : "charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious",
		senses : "Darkvision 60 ft; While in sunlight, disadv. on Wis (Perception) checks using sight",
		passivePerception : 10,
		languages : "all languages it knew in life, but can't speak",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Life Drain",
			ability : 2,
			damage : [3, 6, "necrotic"],
			range : "Melee (5 ft)",
			description : "DC 10 Con save or HP max reduced by same as damage taken until a long rest",
			abilitytodamage : false,
			tooltip : "A target of the specter's life drain must succeed on a DC 10 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the creature finishes a long rest. The target dies if this effect reduces its hit point maximum to 0."
		}],
		traits : [{
			name : "Incorporeal Movement",
			description : "The specter can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."
		}, {
			name : "Sunlight Sensitivity",
			description : "While in sunlight, the specter has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight."
		}, {
			name : "Life Drain",
			description : "A target of the specter's life drain must succeed on a DC 10 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the creature finishes a long rest. The target dies if this effect reduces its hit point maximum to 0."
		}]
	},
	"wight" : {
		name : "Wight",
		source : [["SRD", 354], ["M", 300]],
		size : 3, //Medium
		type : "Undead",
		alignment : "Neutral Evil",
		ac : 14,
		hp : 45,
		hd : [6, 8],
		speed : "30 ft",
		scores : [15, 14, 16, 10, 13, 15],
		skills : {
			"perception" : 3,
			"stealth" : 4
		},
		senses : "Darkvision 60 ft; While in sunlight, disadv. on Wis (Perception) checks using sight",
		passivePerception : 13,
		languages : "all languages it knew in life",
		challengeRating : "3",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
			name : "Life Drain",
			ability : 1,
			damage : [1, 6, "necrotic"],
			range : "Melee (5 ft)",
			description : "DC 13 Con save or HP max reduced by damage amount until long rest",
			tooltip : "The target must succeed on a DC 13 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.\nA humanoid slain by this attack rises 24 hours later as a zombie under the wight's control, unless the humanoid is restored to life or its body is destroyed. The wight can have no more than twelve zombies under its control at one time."
		}, {
			name : "Longsword",
			ability : 1,
			damage : [1, 8, "slashing"],
			range : "Melee (5 ft)",
			description : "Versatile (1d10)"
		}, {
			name : "Longbow",
			ability : 2,
			damage : [1, 8, "piercing"],
			range : "150/600 ft",
			description : "Ammunition, heavy, two-handed)"
		}],
		traits : [{
			name : "Sunlight Sensitivity",
			description : "While in sunlight, the wight has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight."
		}, {
			name : "Life Drain",
			description : "A target of the wight's life drain attack must succeed on a DC 13 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.\n   A humanoid slain by this attack rises 24 hours later as a zombie under the wight's control, unless the humanoid is restored to life or its body is destroyed. The wight can have no more than twelve zombies under its control at one time."
		}]
	},
	"zombie" : {
		name : "Zombie",
		source : [["SRD", 356], ["M", 316]],
		size : 3, //Medium
		type : "Undead",
		alignment : "Neutral Evil",
		ac : 8,
		hp : 22,
		hd : [3, 8],
		speed : "20 ft",
		scores : [13, 6, 16, 3, 6, 5],
		saves : ["", "", "", "", 0, ""],
		damage_immunities : "poison",
		condition_immunities : "poisoned",
		senses : "Darkvision 60 ft",
		passivePerception : 8,
		languages : "understands all languages it knew in life but can't speak",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Slam",
			ability : 1,
			damage : [1, 6, "bludgeoning"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Undead Fortitude",
			description : "If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead."
		}]
	},
	"ogre zombie" : {
		name : "Ogre Zombie",
		nameAlt : ["Zombie, Ogre"],
		source : [["SRD", 357], ["M", 316]],
		size : 2, //Large
		type : "Undead",
		alignment : "Neutral Evil",
		ac : 8,
		hp : 85,
		hd : [9, 10],
		speed : "30 ft",
		scores : [19, 6, 18, 3, 6, 5],
		saves : ["", "", "", "", 0, ""],
		damage_immunities : "poison",
		condition_immunities : "poisoned",
		senses : "Darkvision 60 ft",
		passivePerception : 8,
		languages : "understands Command and Giant but can't speak",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Morningstar",
			ability : 1,
			damage : [2, 8, "bludgeoning"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Undead Fortitude",
			description : "If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead."
		}]
	},
	// Fungi
	"shrieker" : {
		name : "Shrieker",
		source : [["SRD", 309], ["M", 138]],
		size : 3, //Medium
		type : "Plant",
		alignment : "Unaligned",
		ac : 5,
		hp : 13,
		hd : [3, 8],
		speed : "0 ft",
		scores : [1, 1, 10, 1, 3, 1],
		condition_immunities : "blinded, deafened, frightened",
		senses : "Blindsight 30 ft (blind beyond this radius)",
		passivePerception : 6,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 0,
		attacks : [],
		traits : [{
			name : "False Appearance",
			description : "While the shrieker remains motionless, it is indistinguishable from an ordinary fungus."
		}],
		actions : [{
			name : "Shriek",
			description : "As a reaction when bright light or a creature is within 30 ft of the shrieker, it emits a shriek audible within 300 ft of it. The shrieker continues to shriek until the disturbance moves out of range and for 1d4 of the shrieker's turns afterward."
		}],
		wildshapeString : "\u25C6 Senses: blindsight 30 ft (blind beyond this radius).\n\u25C6 Condition Immunities: blinded, deafened, frightened.\n\u25C6 Shriek: As a reaction when bright light or a creature is within 30 ft of the shrieker, emits a shriek audible out to 300 ft. This continues until the disturbance moves out of range and for 1d4 of the shrieker's turns afterward.\n\u25C6 False Appearance: While motionless, the shrieker is indistinguishable from an ordinary fungus."
	},
	"violet fungus" : {
		name : "Violet Fungus",
		source : [["SRD", 309], ["M", 138]],
		size : 3, //Medium
		type : "Plant",
		alignment : "Unaligned",
		ac : 5,
		hp : 18,
		hd : [4, 8],
		speed : "5 ft",
		scores : [3, 1, 10, 1, 3, 1],
		condition_immunities : "blinded, deafened, frightened",
		senses : "Blindsight 30 ft (blind beyond this radius)",
		passivePerception : 6,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : "1",
		attacks : [{
			name : "Rotting Touch",
			ability : 3,
			damage : [1, 8, "necrotic"],
			range : "Melee (10 ft)",
			description : "1d4 rotting touch attacks as an Attack action"
		}],
		traits : [{
			name : "False Appearance",
			description : "While the violet fungus remains motionless, it is indistinguishable from an ordinary fungus."
		}]
	},
	// Awakened plants (for the Awaken spell)
	"awakened shrub" : {
		name : "Awakened Shrub",
		source : [["SRD", 366], ["M", 317]],
		size : 4, //Small
		type : "Plant",
		alignment : "Unaligned",
		ac : 9,
		hp : 10,
		hd : [3, 6],
		speed : "20 ft",
		scores : [3, 8, 11, 10, 10, 6],
		damage_vulnerabilities : "fire",
		damage_resistances : "piercing",
		senses : "",
		passivePerception : 10,
		languages : "one language known by its creator",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : "1",
		attacks : [{
			name : "Rake",
			ability : 2,
			damage : [1, 4, "slashing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "False Appearance",
			description : "While the shrub remains motionless, it is indistinguishable from a normal shrub."
		}]
	},
	"awakened tree" : {
		name : "Awakened Tree",
		source : [["SRD", 366], ["M", 317]],
		size : 1, //Huge
		type : "Plant",
		alignment : "Unaligned",
		ac : 13,
		hp : 59,
		hd : [7, 12],
		speed : "20 ft",
		scores : [19, 6, 15, 10, 10, 7],
		damage_vulnerabilities : "fire",
		damage_resistances : "bludgeoning, piercing",
		senses : "",
		passivePerception : 10,
		languages : "one language known by its creator",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : "1",
		attacks : [{
			name : "Slam",
			ability : 1,
			damage : [3, 6, "bludgeoning"],
			range : "Melee (10 ft)",
			description : ""
		}],
		traits : [{
			name : "False Appearance",
			description : "While the tree remains motionless, it is indistinguishable from a normal tree."
		}]
	},
	// Mephits (with help from Undrhil)
	"dust mephit" : {
		name : "Mephit, Dust",
		source : [["SRD", 330], ["M", 215]],
		size : 5, //Tiny
		type : "Elemental",
		alignment : "Neutral Evil",
		ac : 12,
		hp : 17,
		hd : [5, 6],
		speed : "30 ft, fly 30 ft",
		scores : [5, 14, 10, 9, 11, 10],
		skills : {
			"perception" : 2,
			"stealth" : 4
		},
		senses : "Darkvision 60 ft",
		passivePerception : 12,
		languages : "Auran, Terran",
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		damage_vulnerabilities : "fire",
		damage_immunities : "poison",
		condition_immunities : "poisoned",
		attacks : [{
			name : "Claws",
			ability : 2,
			damage : [1, 4, "slashing"],
			range : "Melee (5 ft)",
			description : ""
		}, {
			name : "Blinding Breath (Recharge 6)",
			ability : 3,
			damage : ["Dex save", "", "Blinded"],
			range : "15-ft cone",
			description : "Hits all in area; Dex save or blinded for 1 min; Affected can repeat save at end of each turn",
			dc : true,
			abilitytodamage : false,
			tooltip : "The mephit exhales a 15-ft cone of blinding dust. Each creature in that area must succeed on a DC 10 Dexterity saving throw or be blinded for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
		}],
		traits : [{
			name : "Death Burst",
			description : "When the mephit dies, it explodes in a burst of dust. Each creature within 5 ft of it must then succeed on a DC 10 Constitution saving throw or be blinded for 1 minute. A blinded creature can repeat the saving throw on each of its turns, ending the effect on itself on a success."
		}, {
			name : "Innate Spellcasting (1/day)",
			description : "The mephit can innately cast Sleep, requiring no material components. Its innate spellcasting ability is Charisma."
		}, {
			name : "Blinding Breath (Recharge 6)",
			description : "The mephit exhales a 15-ft cone of blinding dust. Each creature in that area must succeed on a DC 10 Dexterity saving throw or be blinded for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
		}]
	},
	"ice mephit" : {
		name : "Mephit, Ice",
		source : [["SRD", 331], ["M", 215]],
		size : 4, //Small
		type : "Elemental",
		alignment : "Neutral Evil",
		ac : 11,
		hp : 21,
		hd : [6, 6],
		speed : "30 ft, fly 30 ft",
		scores : [7, 13, 10, 9, 11, 12],
		skills : {
			"perception" : 2,
			"stealth" : 3
		},
		senses : "Darkvision 60 ft",
		passivePerception : 12,
		languages : "Aquan, Auran",
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		damage_vulnerabilities : "bludgeoning, fire",
		damage_immunities : "cold, poison",
		condition_immunities : "poisoned",
		attacks : [{
			name : "Claws",
			ability : 2,
			damage : [1, 4, "slashing"],
			range : "Melee (5 ft)",
			description : "+1d4 cold damage"
		}, {
			name : "Frost Breath (Recharge 6)",
			ability : 3,
			damage : [2, 4, "cold"],
			range : "15-ft cone",
			description : "Hits all in area; Dex save, success - half damage",
			dc : true,
			abilitytodamage : false,
			tooltip : "The mephit exhales a 15-ft cone of cold air. Each creature in that area must succeed on a DC 10 Dexterity saving throw, taking 5 (2d4) cold damage on a failed save, or half as much damage on a successful one."
		}],
		traits : [{
			name : "Death Burst",
			description : "When the mephit dies, it explodes in a burst of jagged ice. Each creature within 5 ft of it must then succeed on a DC 10 Dexterity saving throw, taking 4 (1d8) slashing damage on a failed save, or half as much damage on a successful one."
		}, {
			name : "Innate Spellcasting (1/day)",
			description : "The mephit can innately cast Fog Cloud, requiring no material components. Its innate spellcasting ability is Charisma."
		}, {
			name : "Frost Breath (Recharge 6)",
			description : "The mephit exhales a 15-ft cone of cold air. Each creature in that area must succeed on a DC 10 Dexterity saving throw, taking 5 (2d4) cold damage on a failed save, or half as much damage on a successful one."
		}],
		features : [{
			name : "False Appearance",
			description : "While the mephit remains motionless, it is indistinguishable from an ordinary shard of ice."
		}]
	},
	"magma mephit" : {
		name : "Mephit, Magma",
		source : [["SRD", 331], ["M", 216]],
		size : 4, //Small
		type : "Elemental",
		alignment : "Neutral Evil",
		ac : 11,
		hp : 22,
		hd : [5, 6],
		speed : "30 ft, fly 30 ft",
		scores : [8, 12, 12, 7, 10, 10],
		skills : {
			"stealth" : 3
		},
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		languages : "Ignan, Terran",
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		damage_vulnerabilities : "cold",
		damage_immunities : "fire, poison",
		condition_immunities : "poisoned",
		attacks : [{
			name : "Claws",
			ability : 2,
			damage : [1, 4, "slashing"],
			range : "Melee (5 ft)",
			description : "+1d4 fire damage"
		}, {
			name : "Fire Breath (Recharge 6)",
			ability : 3,
			damage : [2, 6, "fire"],
			range : "15-ft cone",
			description : "Hits all in area; Dex save, success - half damage",
			dc : true,
			abilitytodamage : false,
			tooltip : "The mephit exhales a 15-ft cone of fire. Each creature in that area must make a DC 11 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much damage on a successful one."
		}],
		traits : [{
			name : "Death Burst",
			description : "When the mephit dies, it explodes in a burst of lava. Each creature within 5 ft of it must then succeed on a DC 10 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much damage on a successful one."
		}, {
			name : "Innate Spellcasting (1/day)",
			description : "The mephit can innately cast Heat Metal (spell save DC 10), requiring no material components. Its innate spellcasting ability is Charisma."
		}, {
			name : "Fire Breath (Recharge 6)",
			description : "The mephit exhales a 15-ft cone of fire. Each creature in that area must make a DC 11 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much damage on a successful one."
		}],
		features : [{
			name : "False Appearance",
			description : "While the mephit remains motionless, it is indistinguishable from an ordinary mound of magma."
		}]
	},
	"mud mephit" : {
		name : "Mephit, Mud",
		source : [["SRD", 331], ["M", 216]],
		size : 5, //Tiny
		type : "Elemental",
		alignment : "Neutral Evil",
		ac : 11,
		hp : 27,
		hd : [6, 6],
		speed : "20 ft, fly 20 ft, swim 20 ft",
		scores : [8, 12, 12, 9, 11, 7],
		skills : {
			"stealth" : 3
		},
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		languages : "Aquan, Terran",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		damage_immunities : "poison",
		condition_immunities : "poisoned",
		attacks : [{
			name : "Fists",
			ability : 2,
			damage : [1, 6, "bludgeoning"],
			range : "Melee (5 ft)",
			description : ""
		}, {
			name : "Mud Breath (Recharge 6)",
			ability : 3,
			damage : ["Dex save", "", "Restrained"],
			range : "5 ft",
			description : "Dex save or restrained for 1 min; Affected target can repeat save at the end of each of its turns",
			dc : true,
			abilitytodamage : false,
			tooltip : "The mephit belches viscid mud onto one creature within 5 ft of it. If the target is Medium or smaller, it must succeed on a DC 11 Dexterity saving throw or be restrained for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
		}],
		traits : [{
			name : "Death Burst",
			description : "When the mephit dies, it explodes in a burst of sticky mud. Each Medium or smaller creature within 5 ft of it must succeed on a DC 11 Dexterity saving throw or be restrained until the end of the creature's next turn."
		}, {
			name : "False Appearance",
			description : "While the mephit remains motionless, it is indistinguishable from an ordinary mound of mud."
		}, {
			name : "Mud Breath (Recharge 6)",
			description : "The mephit belches viscid mud onto one creature within 5 ft of it. If the target is Medium or smaller, it must succeed on a DC 11 Dexterity saving throw or be restrained for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
		}]
	},
	"smoke mephit" : {
		name : "Mephit, Smoke",
		source : [["SRD", 331], ["M", 217]],
		size : 4, //Small
		type : "Elemental",
		alignment : "Neutral Evil",
		ac : 12,
		hp : 22,
		hd : [5, 6],
		speed : "30 ft, fly 30 ft",
		scores : [6, 14, 12, 10, 10, 11],
		skills : {
			"perception" : 2,
			"stealth" : 4
		},
		senses : "Darkvision 60 ft",
		passivePerception : 12,
		languages : "Auran, Ignan",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		damage_immunities : "fire, poison",
		condition_immunities : "poisoned",
		attacks : [{
			name : "Claws",
			ability : 2,
			damage : [1, 4, "slashing"],
			range : "Melee (5 ft)",
			description : ""
		}, {
			name : "Cinder Breath (Recharge 6)",
			ability : 3,
			damage : ["Dex Save", "", "Blinded"],
			range : "15-ft cone",
			description : "Hits all in area; Dex save or blinded until the end of the next turn",
			dc : true,
			modifiers : [-1, ""],
			abilitytodamage : false,
			tooltip : "The mephit exhales a 15-ft cone of smoldering ash. Each creature in that area must succeed on a DC 10 Dexterity saving throw or be blinded until the end of the mephit's next turn."
		}],
		traits : [{
			name : "Death Burst",
			description : "When the mephit dies, it leaves behind a cloud of smoke that fills a 5-ft-radius sphere centered on its space. The sphere is heavily obscured. Wind disperses the cloud, which otherwise lasts for 1 minute."
		}, {
			name : "Innate Spellcasting (1/day)",
			description : "The mephit can innately cast Dancing Lights, requiring no material components. Its innate spellcasting ability is Charisma."
		}, {
			name : "Cinder Breath (Recharge 6)",
			description : "The mephit exhales a 15-ft cone of smoldering ash. Each creature in that area must succeed on a DC 10 Dexterity saving throw or be blinded until the end of the mephit's next turn."
		}]
	},
	"steam mephit" : {
		name : "Mephit, Steam",
		source : [["SRD", 331], ["M", 217]],
		size : 4, //Small
		type : "Elemental",
		alignment : "Neutral Evil",
		ac : 10,
		hp : 21,
		hd : [6, 6],
		speed : "30 ft, fly 30 ft",
		scores : [5, 11, 10, 11, 10, 12],
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		languages : "Aquan, Ignan",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		damage_immunities : "fire, poison",
		condition_immunities : "poisoned",
		attacks : [{
			name : "Claws",
			ability : 2,
			damage : [1, 4, "slashing"],
			range : "Melee (5 ft)",
			description : "+1d4 fire damage"
		}, {
			name : "Steam Breath (Recharge 6)",
			ability : 3,
			damage : [1, 8, "fire"],
			range : "15-ft cone",
			description : "Hits all in area; Dex save, success - half damage",
			dc : true,
			abilitytodamage : false,
			tooltip : "The mephit exhales a 15-ft cone of scalding steam. Each creature in that area must succeed on a DC 10 Dexterity saving throw, taking 4 (1d8) fire damage on a failed save, or half as much damage on a successful one."
		}],
		traits : [{
			name : "Death Burst",
			description : "When the mephit dies, it explodes in a cloud of steam. Each creature within 5 ft of the mephit must succeed on a DC 10 Dexterity saving throw or take 4 (1d8) fire damage."
		}, {
			name : "Innate Spellcasting (1/day)",
			description : "The mephit can innately cast Blur, requiring no material components. Its innate spellcasting ability is Charisma."
		}, {
			name : "Steam Breath (Recharge 6)",
			description : "The mephit exhales a 15-ft cone of scalding steam. Each creature in that area must succeed on a DC 10 Dexterity saving throw, taking 4 (1d8) fire damage on a failed save, or half as much damage on a successful one."
		}]
	},
	// Beasts (familiars, Ranger and general animal companions, and Druid Wild Shapes) [Miscellaneous Creatures Section]
	"ape" : {
		name : "Ape",
		source : [["SRD", 366], ["M", 317]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 19,
		hd : [3, 8],
		speed : "30 ft, climb 30 ft",
		scores : [16, 14, 14, 6, 12, 7],
		skills : {
			"athletics" : 5,
			"perception" : 3
		},
		senses : "",
		passivePerception : 13,
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
			name : "Fist",
			ability : 1,
			damage : [1, 6, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Two fist attacks as an Attack action"
		}, {
			name : "Rock",
			ability : 1,
			damage : [1, 6, "bludgeoning"],
			range : "25/50 ft",
			description : "One rock attack as an Attack action"
		}],
		actions : [{
			name : "Multiattack",
			description : "The ape makes two fist attacks."
		}]
	},
	"axe beak" : {
		name : "Axe Beak",
		source : [["SRD", 366], ["M", 317]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 11,
		hp : 19,
		hd : [3, 10],
		speed : "50 ft",
		scores : [14, 12, 12, 2, 10, 5],
		senses : "",
		passivePerception : 10,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Beak",
			ability : 1,
			damage : [1, 8, "slashing"],
			range : "Melee (5 ft)",
			description : ""
		}]
	},
	"baboon" : {
		name : "Baboon",
		source : [["SRD", 367], ["M", 318]],
		size : 4, //Small
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 3,
		hd : [1, 6],
		speed : "30 ft, climb 30 ft",
		scores : [8, 14, 11, 4, 12, 6],
		senses : "",
		passivePerception : 11,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Pack Tactics",
			description : "The baboon has advantage on an attack roll against a creature if at least one of the baboon's allies is within 5 ft of the creature and the ally isn't incapacitated."
		}]
	},
	"badger" : {
		name : "Badger",
		source : [["SRD", 367], ["M", 318]],
		size : 5, //Tiny
		type : "Beast",
		alignment : "Unaligned",
		ac : 10,
		hp : 3,
		hd : [1, 4],
		speed : "20 ft, burrow 5 ft",
		scores : [4, 11, 12, 2, 12, 5],
		senses : "Darkvision 30 ft; Adv. on Wis (Perception) checks using smell",
		passivePerception : 11,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, "", "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Keen Smell",
			description : "The badger has advantage on Wisdom (Perception) checks that rely on smell."
		}]
	},
	"bat" : {
		name : "Bat",
		source : [["SRD", 367], ["M", 318]],
		size : 5, //Tiny
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 12,
		hp : 1,
		hd : [1, 4],
		speed : "5 ft, fly 30 ft",
		scores : [2, 15, 8, 2, 12, 4],
		senses : "Blindsight 60 ft; Adv. on Wis (Perception) checks using hearing",
		passivePerception : 11,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, "", "piercing"],
			range : "Melee (5 ft)",
			description : "",
			modifiers : ["Str", ""],
			abilitytodamage : false
		}],
		traits : [{
			name : "Echolocation",
			description : "The bat can't use its Blindsight while deafened."
		}, {
			name : "Keen Hearing",
			description : "The bat has advantage on Wisdom (Perception) checks that rely on hearing."
		}]
	},
	"black bear" : {
		name : "Black Bear",
		nameAlt : ["Bear, Black"],
		source : [["SRD", 367], ["M", 318]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 11,
		hp : 19,
		hd : [3, 8],
		speed : "40 ft, climb 30 ft",
		scores : [15, 10, 14, 2, 12, 7],
		skills : {
			"perception" : 3
		},
		senses : "Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "One bite and one claws attack as an Attack action"
		}, {
			name : "Claws",
			ability : 1,
			damage : [2, 4, "slashing"],
			range : "Melee (5 ft)",
			description : "One claws and one bite attack as an Attack action"
		}],
		actions : [{
			name : "Multiattack",
			description : "The bear makes two attacks: one with its bite and one with its claws."
		}],
		traits : [{
			name : "Keen Smell",
			description : "The bear has advantage on Wisdom (Perception) checks that rely on smell."
		}]
	},
	"blink dog" : {
		name : "Blink Dog",
		source : [["SRD", 368], ["M", 318]],
		size : 3, //Medium
		type : "Fey",
		alignment : "Lawful Good",
		ac : 13,
		hp : 22,
		hd : [4, 8],
		speed : "40 ft",
		scores : [12, 17, 12, 10, 13, 11],
		skills : {
			"perception" : 3,
			"stealth" : 5
		},
		senses : "Adv. on Wis (Perception) checks using hearing/smell",
		passivePerception : 13,
		languages : "Blink Dog, understands Sylvan but can't speak it",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Keen Hearing and Smell",
			description : "The dog has advantage on Wisdom (Perception) checks that rely on hearing or smell."
		}],
		actions : [{
			name : "Teleport (Recharge 4-6)",
			description : "As an action, the dog magically teleports, along with any equipment it is wearing or carrying, up to 40 ft to an unoccupied space it can see. Before or after teleporting, the dog can make one bite attack."
		}]
	},
	"blood hawk" : {
		name : "Blood Hawk",
		source : [["SRD", 368], ["M", 319]],
		size : 4, //Small
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 7,
		hd : [2, 6],
		speed : "10 ft, fly 60 ft",
		scores : [6, 14, 10, 3, 14, 5],
		skills : {
			"perception" : 4
		},
		senses : "Adv. on Wis (Perception) checks using sight",
		passivePerception : 14,
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Beak",
			ability : 2,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Keen Sight",
			description : "The hawk has advantage on Wisdom (Perception) checks that rely on sight."
		}, {
			name : "Pack Tactics",
			description : "The hawk has advantage on an attack roll against a creature if at least one of the hawk's allies is within 5 ft of the creature and the ally isn't incapacitated."
		}]
	},
	"boar" : {
		name : "Boar",
		source : [["SRD", 368], ["M", 319]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 11,
		hp : 11,
		hd : [2, 8],
		speed : "40 ft",
		scores : [13, 11, 12, 2, 9, 5],
		senses : "",
		passivePerception : 9,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Tusk",
			ability : 1,
			damage : [1, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Charge trait"
		}],
		traits : [{
			name : "Charge",
			description : "If the boar moves at least 20 ft straight toward a target and then hits it with a tusk attack on the same turn, the target takes an extra 3 (1d6) slashing damage. A targeted creature must succeed on a DC 11 Strength saving throw or be knocked prone."
		}, {
			name : "Relentless (Recharges after a Short or Long Rest)",
			description : "If the boar takes 7 damage or less that would reduce it to 0 HP, it is reduced to 1 HP instead."
		}]
	},
	"brown bear" : {
		name : "Brown Bear",
		nameAlt : ["Bear, Brown"],
		source : [["SRD", 369], ["M", 319]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 11,
		hp : 34,
		hd : [4, 10],
		speed : "40 ft, climb 30 ft",
		scores : [19, 10, 16, 2, 13, 7],
		skills : {
			"perception" : 3
		},
		senses : "Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 8, "piercing"],
			range : "Melee (5 ft)",
			description : "One bite and one claws attack as an Attack action"
		}, {
			name : "Claws",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "One claws and one bite attack as an Attack action"
		}],
		actions : [{
			name : "Multiattack",
			description : "The bear makes two attacks: one with its bite and one with its claws."
		}],
		traits : [{
			name : "Keen Smell",
			description : "The bear has advantage on Wisdom (Perception) checks that rely on smell."
		}]
	},
	"camel" : {
		name : "Camel",
		source : [["SRD", 369], ["M", 320]],
		size : 2, //Large
		type : "Beast",
		companion : "mount",
		alignment : "Unaligned",
		ac : 9,
		hp : 15,
		hd : [2, 10],
		speed : "50 ft",
		scores : [16, 8, 14, 2, 8, 5],
		senses : "",
		passivePerception : 9,
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 4, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "",
			abilitytodamage : false
		}]
	},
	"cat" : {
		name : "Cat",
		source : [["SRD", 369], ["M", 320]],
		size : 5, //Tiny
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 12,
		hp : 2,
		hd : [1, 4],
		speed : "40 ft, climb 30 ft",
		scores : [3, 15, 10, 3, 12, 7],
		skills : {
			"perception" : 3,
			"stealth" : 4
		},
		senses : "Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Claws",
			ability : 2,
			damage : [1, "", "slashing"],
			range : "Melee (5 ft)",
			description : "",
			modifiers : ["Str", ""],
			abilitytodamage : false
		}],
		traits : [{
			name : "Keen Smell",
			description : "The cat has advantage on Wisdom (Perception) checks that rely on smell."
		}]
	},
	"cave bear" : {
		name : "Cave Bear",
		nameAlt : ["Bear, Cave"],
		source : [["SRD", 369], ["M", 334]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 42,
		hd : [5, 10],
		speed : "40 ft, swim 30 ft",
		scores : [20, 10, 16, 2, 13, 7],
		skills : {
			"perception" : 3
		},
		senses : "Darkvision 60 ft; Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 8, "piercing"],
			range : "Melee (5 ft)",
			description : "One bite and one claws attack as an Attack action"
		}, {
			name : "Claws",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "One claws and one bite attack as an Attack action"
		}],
		actions : [{
			name : "Multiattack",
			description : "The bear makes two attacks: one with its bite and one with its claws."
		}],
		traits : [{
			name : "Keen Smell",
			description : "The bear has advantage on Wisdom (Perception) checks that rely on smell."
		}]
	},
	"constrictor snake" : {
		name : "Constrictor Snake",
		source : [["SRD", 369], ["M", 320]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 13,
		hd : [2, 10],
		speed : "30 ft, swim 30 ft",
		scores : [15, 14, 12, 1, 10, 3],
		senses : "Blindsight 10 ft",
		passivePerception : 10,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		},{
			name : "Constrict",
			ability : 1,
			damage : [1, 8, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Target is grappled and restrained (escape DC 14); Can't use constrict again until grapple ends"
		}]
	},
	"crab" : {
		name : "Crab",
		source : [["SRD", 370], ["M", 320]],
		size : 5, //Tiny
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 11,
		hp : 2,
		hd : [1, 4],
		speed : "20 ft, swim 20 ft",
		scores : [2, 11, 10, 1, 8, 2],
		skills : {
			"stealth" : 2
		},
		senses : "Blindsight 30 ft",
		passivePerception : 9,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Claw",
			ability : 1,
			damage : [1, "", "bludgeoning"],
			range : "Melee (5 ft)",
			description : "",
			modifiers : [2, ""],
			abilitytodamage : false
		}],
		traits : [{
			name : "Amphibious",
			description : "The crab can breathe air and water."
		}]
	},
	"crocodile" : {
		name : "Crocodile",
		source : [["SRD", 370], ["M", 320]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 19,
		hd : [3, 10],
		speed : "20 ft, swim 20 ft",
		scores : [15, 10, 13, 2, 10, 5],
		skills : {
			"stealth" : 2
		},
		senses : "",
		passivePerception : 10,
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 10, "piercing"],
			range : "Melee (5 ft)",
			description : "Target is grappled and restrained (escape DC 12); Can't use bite again until grapple ends"
		}],
		traits : [{
			name : "Hold Breath",
			description : "The crocodile can hold its breath for 15 minutes."
		}]
	},
	"death dog" : {
		name : "Death Dog",
		source : [["SRD", 370], ["M", 321]],
		size : 3, //Medium
		type : "Monstrosity",
		alignment : "Unaligned",
		ac : 12,
		hp : 39,
		hd : [6, 8],
		speed : "40 ft",
		scores : [15, 14, 14, 3, 13, 6],
		skills : {
			"perception" : 5,
			"stealth" : 4
		},
		senses : "Darkvision 120 ft; Adv. on Wis (Perception) checks",
		passivePerception : 15,
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "Two bite attacks as an Attack action; Target DC 12 Con save or diseased and poisoned",
			tooltip : "If the target of the death dog's bite attack is a creature, it must succeed on a DC 12 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the creature must repeat the saving throw, reducing its hit point maximum by 5 (1d10) on a failure. This reduction lasts until the disease is cured. The creature dies if the disease reduces its hit point maximum to 0."
		}],
		actions : [{
			name : "Multiattack",
			description : "The dog makes two bite attacks."
		}],
		traits : [{
			name : "Two-Headed",
			description : "The death dog has advantage on Wisdom (Perception) checks and on saving throws against being blinded, charmed, deafened, frightened, stunned, or knocked unconscious."
		}, {
			name : "Bite attack",
			description : "If the target of the death dog's bite attack is a creature, it must succeed on a DC 12 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the creature must repeat the saving throw, reducing its hit point maximum by 5 (1d10) on a failure. This reduction lasts until the disease is cured. The creature dies if the disease reduces its hit point maximum to 0."
		}]
	},
	"deer" : {
		name : "Deer",
		source : [["SRD", 370], ["M", 321]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 13,
		hp : 4,
		hd : [1, 8],
		speed : "50 ft",
		scores : [11, 16, 11, 2, 14, 5],
		senses : "",
		passivePerception : 12,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}]
	},
	"dire wolf" : {
		name : "Dire Wolf",
		source : [["SRD", 371], ["M", 321]],
		size : 2, //Large
		type : "Beast",
		companion : "steed",
		alignment : "Unaligned",
		ac : 14,
		hp : 37,
		hd : [5, 10],
		speed : "50 ft",
		scores : [17, 15, 15, 3, 12, 7],
		skills : {
			"perception" : 3,
			"stealth" : 4
		},
		senses : "Adv. on Wis (Perception) checks using hearing/smell",
		passivePerception : 13,
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [2, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "Target must succeed on a DC 13 Strength saving throw or be knocked prone"
		}],
		traits : [{
			name : "Keen Hearing and Smell",
			description : "The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell."
		}, {
			name : "Pack Tactics",
			description : "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 ft of the creature and the ally isn't incapacitated."
		}]
	},
	"draft horse" : {
		name : "Draft Horse",
		source : [["SRD", 371], ["M", 321]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 10,
		hp : 19,
		hd : [3, 10],
		speed : "40 ft",
		scores : [18, 10, 12, 2, 11, 7],
		senses : "",
		passivePerception : 10,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Hooves",
			ability : 1,
			damage : [2, 4, "bludgeoning"],
			range : "Melee (5 ft)",
			description : ""
		}]
	},
	"eagle" : {
		name : "Eagle",
		source : [["SRD", 371], ["M", 322]],
		size : 4, //Small
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 3,
		hd : [1, 6],
		speed : "10 ft, fly 60 ft",
		scores : [6, 15, 10, 2, 14, 7],
		skills : {
			"perception" : 4
		},
		senses : "Adv. on Wis (Perception) checks using sight",
		passivePerception : 14,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Talons",
			ability : 2,
			damage : [1, 4, "slashing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Keen Sight",
			description : "The eagle has advantage on Wisdom (Perception) checks that rely on sight."
		}]
	},
	"elephant" : {
		name : "Elephant",
		source : [["SRD", 371], ["M", 322]],
		size : 1, //Huge
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 76,
		hd : [8, 12],
		speed : "40 ft",
		scores : [22, 9, 17, 3, 11, 6],
		senses : "",
		passivePerception : 10,
		challengeRating : "4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Gore",
			ability : 1,
			damage : [3, 8, "piercing"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Trampling Charge trait"
		}, {
			name : "Stomp",
			ability : 1,
			damage : [3, 10, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Can only be used on prone creatures (also see Trampling Charge trait)"
		}],
		traits : [{
			name : "Trampling Charge",
			description : "If the elephant moves at least 20 ft straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 12 Strength saving throw or be knocked prone. If the target is prone, the elephant can make one stomp attack against it as a bonus action."
		}]
	},
	"elk" : {
		name : "Elk",
		nameAlt : ["Reindeer"],
		source : [["SRD", 372], ["M", 322]],
		size : 2, //Large
		type : "Beast",
		companion : "mount",
		alignment : "Unaligned",
		ac : 10,
		hp : 13,
		hd : [2, 10],
		speed : "50 ft",
		scores : [16, 10, 12, 2, 10, 6],
		senses : "",
		passivePerception : 10,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Ram",
			ability : 1,
			damage : [1, 6, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Charge trait"
		}, {
			name : "Hooves",
			ability : 1,
			damage : [2, 4, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Can only be used on prone creatures"
		}],
		traits : [{
			name : "Charge",
			description : "If the [THIS] moves at least 20 ft straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
		}]
	},
	"flying snake" : {
		name : "Flying Snake",
		source : [["SRD", 372], ["M", 322]],
		size : 5, //Tiny
		type : "Beast",
		alignment : "Unaligned",
		ac : 14,
		hp : 5,
		hd : [2, 4],
		speed : "30 ft, fly 60 ft, swim 30 ft",
		scores : [4, 18, 11, 2, 12, 5],
		senses : "Blindsight 10 ft",
		passivePerception : 11,
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, "", "piercing"],
			range : "Melee (5 ft)",
			description : "Target also takes 3d4 poison damage",
			abilitytodamage : false
		}],
		traits : [{
			name : "Flyby",
			description : "The snake doesn't provoke opportunity attacks when it flies out of an enemy's reach."
		}]
	},
	"frog" : {
		name : "Frog",
		nameAlt : ["Toad"],
		source : [["SRD", 372], ["M", 322]],
		size : 5, //Tiny
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 11,
		hp : 1,
		hd : [1, 4],
		speed : "20 ft, swim 20 ft",
		scores : [1, 13, 8, 1, 8, 3],
		skills : {
			"perception" : 1,
			"stealth" : 3
		},
		senses : "Darkvision 30 ft",
		passivePerception : 11,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 0,
		attacks : [],
		traits : [{
			name : "Amphibious",
			description : "The [THIS] can breathe air and water"
		}, {
			name : "Standing Leap",
			description : "The [THIS]'s long jump is up to 10 ft and its high jump is up to 5 ft, with or without a running start."
		}]
	},
	"giant ape" : {
		name : "Giant Ape",
		source : [["SRD", 373], ["M", 323]],
		size : 1, //Huge
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 157,
		hd : [15, 12],
		speed : "40 ft, climb 40 ft",
		scores : [23, 14, 18, 7, 12, 7],
		skills : {
			"athletics" : 9,
			"perception" : 4
		},
		senses : "",
		passivePerception : 14,
		challengeRating : "7",
		proficiencyBonus : 3,
		attacksAction : 2,
		attacks : [{
			name : "Fist",
			ability : 1,
			damage : [3, 10, "bludgeoning"],
			range : "Melee (10 ft)",
			description : "Two fist attacks as an Attack action"
		}, {
			name : "Rock",
			ability : 1,
			damage : [7, 6, "bludgeoning"],
			range : "50/100 ft",
			description : "One rock attack as an Attack action"
		}],
		actions : [{
			name : "Multiattack",
			description : "The ape makes two fist attacks."
		}]
	},
	"giant badger" : {
		name : "Giant Badger",
		source : [["SRD", 373], ["M", 323]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 10,
		hp : 13,
		hd : [2, 8],
		speed : "30 ft, burrow 10 ft",
		scores : [13, 10, 15, 2, 12, 5],
		senses : "Darkvision 30 ft; Adv. on Wis (Perception) checks using smell",
		passivePerception : 11,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "One bite and one claws attack as an Attack action"
		}, {
			name : "Claws",
			ability : 1,
			damage : [2, 4, "slashing"],
			range : "Melee (5 ft)",
			description : "One claws and one bite attack as an Attack action"
		}],
		actions : [{
			name : "Multiattack",
			description : "The badger makes two attacks: one with its bite and one with its claws."
		}],
		traits : [{
			name : "Keen Smell",
			description : "The badger has advantage on Wisdom (Perception) checks that rely on smell."
		}]
	},
	"giant bat" : {
		name : "Giant Bat",
		source : [["SRD", 373], ["M", 323]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 13,
		hp : 22,
		hd : [4, 10],
		speed : "10 ft, fly 60 ft",
		scores : [15, 16, 11, 2, 12, 6],
		senses : "Blindsight 60 ft; Adv. on Wis (Perception) checks using hearing",
		passivePerception : 11,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Echolocation",
			description : "The bat can't use its Blindsight while deafened."
		}, {
			name : "Keen Hearing",
			description : "The bat has advantage on Wisdom (Perception) checks that rely on hearing."
		}]
	},
	"giant boar" : {
		name : "Giant Boar",
		source : [["SRD", 373], ["M", 323]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 42,
		hd : [5, 10],
		speed : "40 ft",
		scores : [17, 10, 16, 2, 7, 5],
		senses : "",
		passivePerception : 8,
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Tusk",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Charge trait"
		}],
		traits : [{
			name : "Charge",
			description : "If the boar hits with a tusk attack after moving at least 20 ft straight toward a target on the same turn, the target takes an extra 2d6 slashing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
		}, {
			name : "Relentless (Recharges after a Short or Long Rest)",
			description : "If the boar takes 10 damage or less that would reduce it to 0 HP, it is reduced to 1 HP instead."
		}]
	},
	"giant centipede" : {
		name : "Giant Centipede",
		source : [["SRD", 374], ["M", 323]],
		size : 4, //Small
		type : "Beast",
		alignment : "Unaligned",
		ac : 13,
		hp : 4,
		hd : [1, 6],
		speed : "30 ft, climb 30 ft",
		scores : [5, 14, 12, 1, 7, 3],
		senses : "Blindsight 30 ft",
		passivePerception : 8,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : "Target must succeed on a DC 11 Constitution saving throw or take 3d6 poison damage"
		}],
		traits : [{
			name : "Bite",
			description : "If the poison damage from the centipede's bite attack reduces the target to 0 HP, the target is stable but poisoned for 1 hour, even after regaining HP, and is paralyzed while poisoned in this way."
		}]
	},
	"giant constrictor snake" : {
		name : "Giant Constrictor Snake",
		source : [["SRD", 374], ["M", 324]],
		size : 1, //Huge
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 60,
		hd : [8, 12],
		speed : "30 ft, swim 30 ft",
		scores : [19, 14, 12, 1, 10, 3],
		skills : {
			"perception" : 2
		},
		senses : "Blindsight 10 ft",
		passivePerception : 12,
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [2, 6, "piercing"],
			range : "Melee (10 ft)",
			description : ""
		},{
			name : "Constrict",
			ability : 1,
			damage : [2, 8, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Target is grappled and restrained (escape DC 16); Can't use constrict again until grapple ends"
		}]
	},
	"giant crab" : {
		name : "Giant Crab",
		source : [["SRD", 374], ["M", 324]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 15,
		hp : 13,
		hd : [3, 8],
		speed : "30 ft, swim 30 ft",
		scores : [13, 15, 11, 1, 9, 3],
		skills : {
			"stealth" : 4
		},
		senses : "Blindsight 30 ft",
		passivePerception : 9,
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Claw",
			ability : 1,
			damage : [1, 6, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Target is grappled (escape DC 11); Can't use a claw again until grapple ends"
		}],
		traits : [{
			name : "Amphibious",
			description : "The crab can breathe air and water."
		}]
	},
	"giant crocodile" : {
		name : "Giant Crocodile",
		source : [["SRD", 374], ["M", 324]],
		size : 1, //Huge
		type : "Beast",
		alignment : "Unaligned",
		ac : 14,
		hp : 85,
		hd : [9, 12],
		speed : "30 ft, swim 50 ft",
		scores : [21, 9, 17, 2, 10, 7],
		skills : {
			"stealth" : 5
		},
		senses : "",
		passivePerception : 10,
		challengeRating : "5",
		proficiencyBonus : 3,
		attacksAction : 2,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [3, 10, "piercing"],
			range : "Melee (5 ft)",
			description : "Target is grappled and restrained (escape DC 16); Can't use bite again until grapple ends"
		}, {
			name : "Tail",
			ability : 1,
			damage : [2, 8, "bludgeoning"],
			range : "Melee (10 ft)",
			description : "Target must succeed on a DC 16 Strength saving throw or be knocked prone"
		}],
		traits : [{
			name : "Hold Breath",
			description : "The crocodile can hold its breath for 30 minutes."
		}, {
			name : "Multiattack",
			description : "The crocodile makes two attacks: one with its bite and one with its tail (to a target it is not grappling)."
		}]
	},
	"giant eagle" : {
		name : "Giant Eagle",
		source : [["SRD", 375], ["M", 324]],
		size : 2, //Large
		type : "Beast",
		alignment : "Neutral Good",
		ac : 13,
		hp : 26,
		hd : [4, 10],
		speed : "10 ft, fly 80 ft",
		scores : [16, 17, 13, 8, 14, 10],
		skills : {
			"perception" : 4
		},
		senses : "Adv. on Wis (Perception) checks using sight",
		passivePerception : 14,
		languages : "Giant Eagle, understands Common and Auran but can't speak",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
			name : "Beak",
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "One beak and one talons attack as an Attack action"
		}, {
			name : "Talons",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "One talons and one beak attack as an Attack action"
		}],
		actions : [{
			name : "Multiattack",
			description : "The eagle makes two attacks: one with its beak and one with its talons."
		}],
		traits : [{
			name : "Keen Sight",
			description : "The eagle has advantage on Wisdom (Perception) checks that rely on sight."
		}]
	},
	"giant elk" : {
		name : "Giant Elk",
		source : [["SRD", 375], ["M", 325]],
		size : 1, //Huge
		type : "Beast",
		alignment : "Unaligned",
		ac : 15,
		hp : 42,
		hd : [5, 12],
		speed : "60 ft",
		scores : [19, 16, 14, 7, 14, 10],
		skills : {
			"perception" : 4
		},
		senses : "",
		passivePerception : 14,
		languages : "Giant Elk, understands Common, Elvish, and Sylvan but can't speak",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Ram",
			ability : 1,
			damage : [2, 6, "bludgeoning"],
			range : "Melee (10 ft)",
			description : "If used after moving 20 ft straight in the same round, see Charge trait"
		}, {
			name : "Hooves",
			ability : 1,
			damage : [4, 8, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Can only be used on prone creatures"
		}],
		traits : [{
			name : "Charge",
			description : "If the elk moves at least 20 ft straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be knocked prone."
		}]
	},
	"giant fly" : {
		name : "Giant Fly",
		source : [["SRD", 222], ["D", 169]],
		size : 2,
		type : "Beast",
		alignment : "Unaligned",
		ac : 11,
		hp : 19,
		hd : [3, 10],
		speed : "30 ft, fly 60 ft",
		scores : [14, 13, 13, 2, 10, 3],
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 0,
		attacks : []
	},
	"giant fire beetle" : {
		name : "Giant Fire Beetle",
		source : [["SRD", 375], ["M", 325]],
		size : 4, //Small
		type : "Beast",
		alignment : "Unaligned",
		ac : 13,
		hp : 4,
		hd : [1, 6],
		speed : "30 ft",
		scores : [8, 10, 12, 1, 7, 3],
		senses : "Blindsight 30 ft",
		passivePerception : 8,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 6, "slashing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Illumination",
			description : "The beetle sheds bright light in a 10-ft radius and dim light for an additional 10 ft."
		}]
	},
	"giant frog" : {
		name : "Giant Frog",
		source : [["SRD", 376], ["M", 325]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 11,
		hp : 18,
		hd : [4, 8],
		speed : "30 ft, swim 30 ft",
		scores : [12, 13, 11, 2, 10, 3],
		skills : {
			"perception" : 2,
			"stealth" : 3
		},
		senses : "Darkvision 30 ft",
		passivePerception : 12,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "Target is grappled and restrained (escape DC 11); Can't use bite again until grapple ends"
		}],
		traits : [{
			name : "Amphibious",
			description : "The frog can breathe air and water"
		}, {
			name : "Standing Leap",
			description : "The frog's long jump is up to 20 ft and its high jump is up to 10 ft, with or without a running start."
		}, {
			name : "Swallow",
			description : "The frog makes one bite attack against a Small or smaller target it is grappling. If the attack hits, the target is swallowed, and the grapple ends. The swallowed target is blinded and restrained, it has total cover against attacks and other effects outside the frog, and it takes 5 (2d4) acid damage at the start of each of the frog's turns. The frog can have only one target swallowed at a time. If the frog dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 5 ft of movement, exiting prone."
		}],
		wildshapeString : "Darkvision 30 ft| Amphibious: can breathe air and water| Standing Leap: can long jump up to 20 ft and high jump up to 10 ft, with or without a running start| Swallow: if a bite attack hits a Small or smaller target it is grappling, it is swallowed, ending the grapple. Swallowed: blinded, restrained, total cover, takes 2d4 acid damage at the start of each of the frog's turns; can have only 1 swallowed at a time."
	},
	"giant goat" : {
		name : "Giant Goat",
		nameAlt : ["Moose"],
		source : [["SRD", 376], ["M", 326]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 11,
		hp : 19,
		hd : [3, 10],
		speed : "40 ft",
		scores : [17, 11, 12, 3, 12, 6],
		senses : "",
		passivePerception : 11,
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Ram",
			ability : 1,
			damage : [2, 4, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Charge trait"
		}],
		traits : [{
			name : "Charge",
			description : "If the [THIS] hits with a ram attack after moving at least 20 ft straight toward a target on the same turn, the target takes an extra 2d4 bludgeoning damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
		}, {
			name : "Sure-Footed",
			description : "The [THIS] has advantage on Strength and Dexterity saving throws made against effects that would knock it prone."
		}]
	},
	"giant hyena" : {
		name : "Giant Hyena",
		source : [["SRD", 376], ["M", 326]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 45,
		hd : [6, 10],
		speed : "50 ft",
		scores : [16, 14, 14, 2, 12, 7],
		skills : {
			"perception" : 3
		},
		senses : "",
		passivePerception : 13,
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [2, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "After reducing opponent to 0 HP, take bonus action to move and attack (see Rampage trait)"
		}],
		traits : [{
			name : "Rampage",
			description : "When the hyena reduces a creature to 0 HP with a melee attack on its turn, the hyena can take a bonus action to move up to half its speed and make a bite attack."
		}]
	},
	"giant lizard" : {
		name : "Giant Lizard",
		source : [["SRD", 377], ["M", 326]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 19,
		hd : [3, 10],
		speed : "30 ft, climb 30 ft",
		scores : [15, 12, 13, 2, 10, 5],
		senses : "Darkvision 30 ft",
		passivePerception : 10,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 8, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Variant: Hold Breath",
			description : "The lizard can hold its breath for 15 minutes. (A lizard that has this trait also has a swimming speed of 30 ft.)"
		}, {
			name : "Variant: Spider Climb",
			description : "The lizard can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
		}]
	},
	"giant octopus" : {
		name : "Giant Octopus",
		source : [["SRD", 377], ["M", 326]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 11,
		hp : 52,
		hd : [8, 10],
		speed : "10 ft, swim 60 ft",
		scores : [17, 13, 13, 4, 10, 4],
		skills : {
			"perception" : 4,
			"stealth" : 5
		},
		senses : "Darkvision 60 ft",
		passivePerception : 14,
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Tentacles",
			ability : 1,
			damage : [2, 6, "bludgeoning"],
			range : "Melee (15 ft)",
			description : "Target is grappled and restrained (escape DC 16); Can't use tentacles again until grapple ends"
		}],
		traits : [{
			name : "Hold Breath",
			description : "While out of water, the octopus can hold its breath for 1 hour."
		}, {
			name : "Underwater Camouflage",
			description : "The octopus has advantage on Dexterity (Stealth) checks made while underwater."
		}, {
			name : "Water Breathing",
			description : "The octopus can breathe only underwater."
		}],
		actions : [{
			name : "Ink Cloud (Recharges after a Short or Long Rest)",
			description : "As an action, a 20-ft-radius cloud of ink extends all around the octopus if it is underwater. The area is heavily obscured for 1 minute, although a significant current can disperse the ink. After releasing the ink, the octopus can use the Dash action as a bonus action."
		}],
		wildshapeString : "Darkvision 60 ft| Water Breathing: can breathe only underwater| Hold Breath: can hold its breath for 1 hourout of water| Underwater Camouflage: advantage on Dexterity (Stealth) checks made while underwater| Ink Cloud (Recharges after a Short or Long Rest): if underwater, 20-ft radius cloud of ink around octopus, heavily obscures for 1 minute, can be dispersed. After releasing, can use the Dash action as a bonus action"
	},
	"giant owl" : {
		name : "Giant Owl",
		source : [["SRD", 377], ["M", 327]],
		size : 2, //Large
		type : "Beast",
		alignment : "Neutral",
		ac : 12,
		hp : 19,
		hd : [3, 10],
		speed : "5 ft, fly 60 ft",
		scores : [13, 15, 12, 8, 13, 10],
		skills : {
			"perception" : 5,
			"stealth" : 4
		},
		senses : "Darkvision 120 ft; Adv. on Wis (Perception) checks using hearing/sight",
		passivePerception : 15,
		languages : "Giant Owl, understands Common, Elvish, and Sylvan but can't speak",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Talons",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Flyby",
			description : "The owl doesn't provoke opportunity attacks when it flies out of an enemy's reach."
		}, {
			name : "Keen Hearing and Sight",
			description : "The owl has advantage on Wisdom (Perception) checks that rely on hearing or sight."
		}]
	},
	"giant poisonous snake" : {
		name : "Giant Poisonous Snake",
		source : [["SRD", 378], ["M", 327]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 14,
		hp : 11,
		hd : [2, 8],
		speed : "30 ft, swim 30 ft",
		scores : [10, 18, 13, 2, 10, 3],
		skills : {
			"perception" : 2
		},
		senses : "Blindsight 10 ft",
		passivePerception : 12,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, 4, "piercing"],
			range : "Melee (10 ft)",
			description : "Target also takes 3d6 poison damage, half on a DC 11 Constitution saving throw"
		}]
	},
	"giant rat" : {
		name : "Giant Rat",
		source : [["SRD", 378], ["M", 327]],
		size : 4, //Small
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 7,
		hd : [2, 6],
		speed : "30 ft",
		scores : [7, 15, 11, 2, 10, 4],
		senses : "Darkvision 60 ft; Adv. on Wis (Perception) checks using smell",
		passivePerception : 10,
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Keen Smell",
			description : "The rat has advantage on Wisdom (Perception) checks that rely on smell."
		}, {
			name : "Pack Tactics",
			description : "The rat has advantage on an attack roll against a creature if at least one of the rat's allies is within 5 ft of the creature and the ally isn't incapacitated."
		}]
	},
	"giant rat (diseased)" : {
		name : "Giant Rat (Diseased)",
		source : [["SRD", 378], ["M", 327]],
		size : 4, //Small
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 7,
		hd : [2, 6],
		speed : "30 ft",
		scores : [7, 15, 11, 2, 10, 4],
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : "Target must succeed on a DC 10 Constitution saving throw or contract a disease"
		}],
		traits : [{
			name : "Disease",
			description : "A target that contracted the disease by the bite attack of the diseased giant rat has it until the disease is cured. It can't regain HP except by magical means, and the it's HP maximum decreases by 3 (1d6) every 24 hours. If the target's HP maximum drops to 0 as a result of this disease, the target dies."
		}]
	},
	"giant scorpion" : {
		name : "Giant Scorpion",
		source : [["SRD", 378], ["M", 327]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 15,
		hp : 52,
		hd : [7, 10],
		speed : "40 ft",
		scores : [15, 13, 15, 1, 9, 3],
		senses : "Blindsight 60 ft",
		passivePerception : 9,
		challengeRating : "3",
		proficiencyBonus : 2,
		attacksAction : 3,
		attacks : [{
			name : "Claw",
			ability : 1,
			damage : [1, 8, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Target is grappled (escape DC 12); Can't use a claw again until grapple ends"
		}, {
			name : "Sting",
			ability : 1,
			damage : [1, 10, "piercing"],
			range : "Melee (5 ft)",
			description : "Target also takes 4d10 poison damage, half on a DC 12 Constitution saving throw"
		}],
		traits : [{
			name : "Multiattack",
			description : "The scorpion makes three attacks: two with its claws and one with its sting."
		}]
	},
	"giant sea horse" : {
		name : "Giant Sea Horse",
		source : [["SRD", 378], ["M", 328]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 13,
		hp : 16,
		hd : [3, 10],
		speed : "swim 40 ft",
		scores : [12, 15, 11, 2, 12, 5],
		senses : "",
		passivePerception : 11,
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Ram",
			ability : 1,
			damage : [1, 6, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Charge trait"
		}],
		traits : [{
			name : "Charge",
			description : "If the sea horse moves at least 20 ft straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) bludgeoning damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone."
		}, {
			name : "Water Breathing",
			description : "The sea horse can breathe only underwater."
		}]
	},
	"giant shark" : {
		name : "Giant Shark",
		source : [["SRD", 379], ["M", 328]],
		size : 1, //Huge
		type : "Beast",
		alignment : "Unaligned",
		ac : 13,
		hp : 126,
		hd : [11, 12],
		speed : "swim 50 ft",
		scores : [23, 11, 21, 1, 10, 5],
		skills : {
			"perception" : 3
		},
		senses : "Blindsight 60 ft",
		passivePerception : 13,
		challengeRating : "5",
		proficiencyBonus : 3,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [3, 10, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Blood Frenzy",
			description : "The shark has advantage on melee attack rolls against any creature that doesn't have all its HP."
		}, {
			name : "Water Breathing",
			description : "The shark can breathe only underwater."
		}]
	},
	"giant spider" : {
		name : "Giant Spider",
		source : [["SRD", 379], ["M", 328]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 14,
		hp : 26,
		hd : [4, 10],
		speed : "30 ft, climb 30 ft",
		scores : [14, 16, 12, 2, 11, 4],
		skills : {
			"stealth" : 7
		},
		senses : "Blindsight 10 ft; Darkvision 60 ft",
		passivePerception : 10,
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, 8, "piercing"],
			range : "Melee (5 ft)",
			description : "Target also takes 2d8 poison damage, half on a DC 11 Constitution saving throw"
		}, {
			name : "Web (Recharge 5-6)",
			ability : 2,
			damage : ["\u2015", "", "Restrained"],
			range : "30/60 ft",
			description : "Target can escape as an action with a DC 12 Strength check, or by destroying the webbing (AC 10; 5 HP)",
			abilitytodamage : false,
			tooltip : "On a hit, the target is restrained by webbing. As an action, the restrained target can make a DC 12 Strength check, bursting the webbing on a success. The webbing can also be attacked and destroyed (AC 10; hp 5; vulnerability to fire damage; immunity to bludgeoning, poison, and psychic damage)."
		}],
		traits : [{
			name : "Bite",
			description : "If the poison damage from the spider's bite attack reduces the target to 0 HP, the target is stable but poisoned for 1 hour, even after regaining HP, and is paralyzed while poisoned in this way."
		}, {
			name : "Spider Climb",
			description : "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
		}, {
			name : "Web Sense",
			description : "While in contact with a web, the spider knows the exact location of any other creature in contact with the same web."
		}, {
			name : "Web Walker",
			description : "The spider ignores movement restrictions caused by webbing."
		}],
		actions : [{
			name : "Web (Recharge 5-6)",
			description : "See attack. On a hit, the target is restrained by webbing. As an action, the restrained target can make a DC 12 Strength check, bursting the webbing on a success. The webbing can also be attacked and destroyed (AC 10; hp 5; vulnerability to fire damage; immunity to bludgeoning, poison, and psychic damage)."
		}],
		wildshapeString : "Blindsight 10 ft; Darkvision 60 ft| If the bite's poison damage reduces the target to 0 HP, the target is stable but poisoned and paralyzed for 1 hour, even after regaining HP| Spider Climb: climb difficult surfaces, including upside down, without an ability check| Web Sense: knows the exact location of any other creature in contact with the same web| Web Walker: ignores movement restrictions from webbing"
	},
	"giant toad" : {
		name : "Giant Toad",
		source : [["SRD", 380], ["M", 329]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 11,
		hp : 39,
		hd : [6, 10],
		speed : "20 ft, swim 40 ft",
		scores : [15, 13, 13, 2, 10, 3],
		senses : "Darkvision 30 ft",
		passivePerception : 10,
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 10, "piercing"],
			range : "Melee (5 ft)",
			description : "+1d10 poison damage; target is grappled and restrained (escape DC 13); Can't use bite again until grapple ends"
		}],
		traits : [{
			name : "Amphibious",
			description : "The toad can breathe air and water"
		}, {
			name : "Standing Leap",
			description : "The toad's long jump is up to 20 ft and its high jump is up to 10 ft, with or without a running start."
		}, {
			name : "Swallow",
			description : "The toad makes one bite attack against a Medium or smaller target it is grappling. If the attack hits, the target is swallowed, and the grapple ends. The swallowed target is blinded and restrained, it has total cover against attacks and other effects outside the toad, and it takes 10 (3d6) acid damage at the start of each of the toad's turns. The toad can have only one target swallowed at a time.\nIf the toad dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 5 ft of movement, exiting prone."
		}],
		wildshapeString : "Darkvision 30 ft| Amphibious: can breathe air and water| Standing Leap: can long jump up to 20 ft and high jump up to 10 ft, with or without a running start| Swallow: if a bite attack hits a Medium or smaller target that it is grappling, it is swallowed, ending the grapple. Swallowed: blinded, restrained, total cover, takes 3d6 acid damage at the start of each of the toad's turns; can have only 1 swallowed at a time."
	},
	"giant vulture" : {
		name : "Giant Vulture",
		source : [["SRD", 380], ["M", 329]],
		size : 2, //Large
		type : "Beast",
		alignment : "Neutral Evil",
		ac : 10,
		hp : 22,
		hd : [3, 10],
		speed : "10 ft, fly 60 ft",
		scores : [15, 10, 15, 6, 12, 7],
		skills : {
			"perception" : 3
		},
		senses : "Adv. on Wis (Perception) checks using sight/smell",
		passivePerception : 13,
		languages : "understands Common but can't speak",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
			name : "Beak",
			ability : 1,
			damage : [2, 4, "piercing"],
			range : "Melee (5 ft)",
			description : "One beak and one talons attack as an Attack action",
			modifiers : [-1, "", ""]
		}, {
			name : "Talons",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "One talons and one beak attack as an Attack action",
			modifiers : [-1, "", ""]
		}],
		actions : [{
			name : "Multiattack",
			description : "The eagle makes two attacks: one with its beak and one with its talons."
		}],
		traits : [{
			name : "Keen Sight and Smell",
			description : "The vulture has advantage on Wisdom (Perception) checks that rely on sight or smell."
		}, {
			name : "Pack Tactics",
			description : "The vulture has advantage on an attack roll against a creature if at least one of the vulture's allies is within 5 ft of the creature and the ally isn't incapacitated."
		}]
	},
	"giant wasp" : {
		name : "Giant Wasp",
		source : [["SRD", 380], ["M", 329]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 13,
		hd : [3, 8],
		speed : "10 ft, fly 50 ft, swim 50 ft",
		scores : [10, 14, 10, 1, 10, 3],
		senses : "",
		passivePerception : 10,
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Sting",
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "Target also takes 3d6 poison damage, half on a DC 11 Constitution saving throw"
		}],
		traits : [{
			name : "Sting",
			description : "If the poison damage from the giant wasp's sting attack reduces the target to 0 HP, the target is stable but poisoned for 1 hour, even after regaining HP, and is paralyzed while poisoned in this way."
		}]
	},
	"giant weasel" : {
		name : "Giant Weasel",
		source : [["SRD", 381], ["M", 329]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 13,
		hp : 9,
		hd : [2, 8],
		speed : "40 ft",
		scores : [11, 16, 10, 4, 12, 5],
		skills : {
			"perception" : 3,
			"stealth" : 5
		},
		senses : "Darkvision 60 ft; Adv. on Wis (Perception) checks using hearing/smell",
		passivePerception : 13,
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Keen Hearing and Smell",
			description : "The weasel has advantage on Wisdom (Perception) checks that rely on hearing or smell."
		}]
	},
	"giant wolf spider" : {
		name : "Giant Wolf Spider",
		source : [["SRD", 381], ["M", 330]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 13,
		hp : 11,
		hd : [2, 8],
		speed : "40 ft, climb 40 ft",
		scores : [12, 16, 13, 3, 12, 4],
		skills : {
			"perception" : 3,
			"stealth" : 7
		},
		senses : "Blindsight 10 ft; Darkvision 60 ft",
		passivePerception : 13,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "Target also takes 2d6 poison damage, half on a DC 11 Constitution saving throw"
		}],
		traits : [{
			name : "Bite",
			description : "If the poison damage from the spider's bite attack reduces the target to 0 HP, the target is stable but poisoned for 1 hour, even after regaining HP, and is paralyzed while poisoned in this way."
		}, {
			name : "Spider Climb",
			description : "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
		}, {
			name : "Web Sense",
			description : "While in contact with a web, the spider knows the exact location of any other creature in contact with the same web."
		}, {
			name : "Web Walker",
			description : "The spider ignores movement restrictions caused by webbing."
		}],
		wildshapeString : "Blindsight 10 ft; Darkvision 60 ft| If the bite's poison damage reduces the target to 0 HP, the target is stable but poisoned and paralyzed for 1 hour, even after regaining HP| Spider Climb: climb difficult surfaces, including upside down, without an ability check| Web Sense: knows the exact location of any other creature in contact with the same web| Web Walker: ignores movement restrictions from webbing"
	},
	"goat" : {
		name : "Goat",
		source : [["SRD", 381], ["M", 330]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 10,
		hp : 4,
		hd : [1, 8],
		speed : "40 ft",
		scores : [12, 10, 11, 2, 10, 5],
		senses : "",
		passivePerception : 10,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Ram",
			ability : 1,
			damage : [1, 4, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Charge trait"
		}],
		traits : [{
			name : "Charge",
			description : "If the goat hits with a ram attack after moving at least 20 ft straight toward a target on the same turn, the target takes an extra 1d4 bludgeoning damage. If the target is a creature, it must succeed on a DC 10 Strength saving throw or be knocked prone."
		}, {
			name : "Sure-Footed",
			description : "The goat has advantage on Strength and Dexterity saving throws made against effects that would knock it prone."
		}]
	},
	"hawk" : {
		name : "Hawk",
		nameAlt : ["Falcon"],
		source : [["SRD", 382], ["M", 330], ["WDH", 53]],
		size : 5, //Tiny
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 13,
		hp : 1,
		hd : [1, 4],
		speed : "10 ft, fly 60 ft",
		scores : [5, 16, 8, 2, 14, 6],
		skills : {
			"perception" : 4
		},
		senses : "Adv. on Wis (Perception) checks using sight",
		passivePerception : 14,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Talons",
			ability : 2,
			damage : [1, "", "slashing"],
			range : "Melee (5 ft)",
			description : "",
			abilitytodamage : false
		}],
		traits : [{
			name : "Keen Sight",
			description : "The [THIS] has advantage on Wisdom (Perception) checks that rely on sight."
		}]
	},
	"hunter shark" : {
		name : "Hunter Shark",
		source : [["SRD", 382], ["M", 330]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 45,
		hd : [6, 10],
		speed : "swim 40 ft",
		scores : [18, 13, 15, 1, 10, 4],
		skills : {
			"perception" : 2
		},
		senses : "Darkvision 30 ft",
		passivePerception : 12,
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [2, 8, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Blood Frenzy",
			description : "The shark has advantage on melee attack rolls against any creature that doesn't have all its HP."
		}, {
			name : "Water Breathing",
			description : "The shark can breathe only underwater."
		}]
	},
	"hyena" : {
		name : "Hyena",
		source : [["SRD", 382], ["M", 331]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 11,
		hp : 5,
		hd : [1, 8],
		speed : "50 ft",
		scores : [11, 13, 12, 2, 12, 5],
		skills : {
			"perception" : 3
		},
		senses : "",
		passivePerception : 13,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Pack Tactics",
			description : "The hyena has advantage on an attack roll against a creature if at least one of the hyena's allies is within 5 ft of the creature and the ally isn't incapacitated."
		}]
	},
	"jackal" : {
		name : "Jackal",
		source : [["SRD", 382], ["M", 331]],
		size : 4, //Small
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 3,
		hd : [1, 6],
		speed : "40 ft",
		scores : [8, 15, 11, 3, 12, 6],
		skills : {
			"perception" : 3
		},
		senses : "Adv. on Wis (Perception) checks using hearing/smell",
		passivePerception : 13,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Keen Hearing and Smell",
			description : "The jackal has advantage on Wisdom (Perception) checks that rely on hearing or smell."
		}, {
			name : "Pack Tactics",
			description : "The jackal has advantage on an attack roll against a creature if at least one of the jackal's allies is within 5 ft of the creature and the ally isn't incapacitated."
		}]
	},
	"killer whale" : {
		name : "Killer Whale",
		source : [["SRD", 383], ["M", 331]],
		size : 1, //Huge
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 90,
		hd : [12, 12],
		speed : "swim 60 ft",
		scores : [19, 10, 13, 3, 12, 7],
		skills : {
			"perception" : 3
		},
		senses : "Blindsight 120 ft; Adv. on Wis (Perception) checks using hearing",
		passivePerception : 13,
		challengeRating : "3",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [5, 6, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Echolocation",
			description : "The whale can't use its Blindsight while deafened."
		}, {
			name : "Hold Breath",
			description : "The whale can hold its breath for 30 minutes."
		}, {
			name : "Keen Hearing",
			description : "The whale has advantage on Wisdom (Perception) checks that rely on hearing."
		}]
	},
	"lion" : {
		name : "Lion",
		source : [["SRD", 383], ["M", 331]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 26,
		hd : [4, 10],
		speed : "50 ft",
		scores : [17, 15, 13, 3, 12, 8],
		skills : {
			"perception" : 3,
			"stealth" : 6
		},
		senses : "Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Claw",
			ability : 1,
			damage : [1, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Pounce trait"
		}, {
			name : "Bite",
			ability : 1,
			damage : [1, 8, "piercing"],
			range : "Melee (5 ft)",
			description : "Can be used in combination with claw while pouncing (see Pounce trait)"
		}],
		traits : [{
			name : "Keen Smell",
			description : "The lion has advantage on Wisdom (Perception) checks that rely on smell."
		}, {
			name : "Pack Tactics",
			description : "The lion has advantage on an attack roll against a creature if at least one of the lion's allies is within 5 ft of the creature and the ally isn't incapacitated."
		}, {
			name : "Pounce",
			description : "If the lion moves at least 20 ft straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the lion can make one bite attack against it as a bonus action."
		}, {
			name : "Running Leap",
			description : "With a 10-ft running start, the lion can long jump up to 25 ft."
		}],
		wildshapeString : "Keen Smell: advantage on Wis (Perception) checks that rely on smell| Pack Tactics: advantage on attack rolls if at least one capable ally is within 5 ft of the target| Pounce: if target is hit with a claw attack after the lion moved at least 20 ft straight on the same turn, DC 13 Str save or knocked prone and the lion can make one bite attack against it as a bonus action| Running Leap: long jump up to 25 ft with a 10-ft running start"
	},
	"lizard" : {
		name : "Lizard",
		source : [["SRD", 383], ["M", 332]],
		size : 5, //Tiny
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 10,
		hp : 2,
		hd : [1, 4],
		speed : "20 ft, climb 20 ft",
		scores : [2, 11, 10, 1, 8, 3],
		senses : "Darkvision 30 ft",
		passivePerception : 9,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, "", "piercing"],
			range : "Melee (5 ft)",
			description : "",
			modifiers : [-2, ""],
			abilitytodamage : false
		}]
	},
	"mammoth" : {
		name : "Mammoth",
		source : [["SRD", 384], ["M", 332]],
		size : 1, //Huge
		type : "Beast",
		alignment : "Unaligned",
		ac : 13,
		hp : 126,
		hd : [11, 12],
		speed : "40 ft",
		scores : [24, 9, 21, 3, 11, 6],
		senses : "",
		passivePerception : 10,
		challengeRating : "6",
		proficiencyBonus : 3,
		attacksAction : 1,
		attacks : [{
			name : "Gore",
			ability : 1,
			damage : [4, 8, "bludgeoning"],
			range : "Melee (10 ft)",
			description : "If used after moving 20 ft straight in the same round, see Trampling Charge trait"
		}, {
			name : "Stomp",
			ability : 1,
			damage : [4, 10, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Can only be used on prone creatures (also see Trampling Charge trait)"
		}],
		traits : [{
			name : "Trampling Charge",
			description : "If the mammoth moves at least 20 ft straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 18 Strength saving throw or be knocked prone. If the target is prone, the mammoth can make one stomp attack against it as a bonus action."
		}]
	},
	"mastiff" : {
		name : "Mastiff",
		source : [["SRD", 384], ["M", 332]],
		size : 3, //Medium
		type : "Beast",
		companion : "mount",
		alignment : "Unaligned",
		ac : 12,
		hp : 5,
		hd : [1, 8],
		speed : "40 ft",
		scores : [13, 14, 12, 3, 12, 7],
		skills : {
			"perception" : 3
		},
		senses : "Adv. on Wis (Perception) checks using hearing/smell",
		passivePerception : 13,
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "Target must succeed on a DC 11 Strength saving throw or be knocked prone"
		}],
		traits : [{
			name : "Keen Hearing and Smell",
			description : "The mastiff has advantage on Wisdom (Perception) checks that rely on hearing or smell."
		}]
	},
	"mule" : {
		name : "Mule",
		source : [["SRD", 384], ["M", 333]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 10,
		hp : 11,
		hd : [2, 8],
		speed : "40 ft",
		scores : [14, 10, 13, 2, 10, 5],
		senses : "",
		passivePerception : 10,
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Hooves",
			ability : 1,
			damage : [1, 4, "bludgeoning"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Beast of Burden",
			description : "The mule is considered to be a Large animal for the purpose of determining its carrying capacity."
		}, {
			name : "Sure-Footed",
			description : "The mule has advantage on Strength and Dexterity saving throws made against effects that would knock it prone."
		}]
	},
	"octopus" : {
		name : "Octopus",
		source : [["SRD", 384], ["M", 333]],
		size : 4, //Small
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 12,
		hp : 3,
		hd : [1, 6],
		speed : "5 ft, swim 30 ft",
		scores : [4, 15, 11, 3, 10, 4],
		skills : {
			"perception" : 2,
			"stealth" : 4
		},
		senses : "Darkvision 30 ft",
		passivePerception : 12,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Tentacles",
			ability : 2,
			damage : [1, "", "bludgeoning"],
			range : "Melee (5 ft)",
			description : "Target is grappled (escape DC 10); Can't use tentacles again until grapple ends",
			abilitytodamage : false
		}],
		traits : [{
			name : "Hold Breath",
			description : "While out of water, the octopus can hold its breath for 30 minutes."
		}, {
			name : "Underwater Camouflage",
			description : "The octopus has advantage on Dexterity (Stealth) checks made while underwater."
		}, {
			name : "Water Breathing",
			description : "The octopus can breathe only underwater."
		}],
		wildshapeString : "Darkvision 30 ft| Water Breathing: can breathe only underwater| Hold Breath: can hold its breath for 30 minutes out of water| Underwater Camouflage: advantage on Dex (Stealth) checks while underwater| Ink Cloud (Recharges after a Short or Long Rest): if underwater, 5-ft radius cloud of ink around octopus, heavily obscures for 1 minute, can be dispersed. After releasing, can use the Dash action as a bonus action"
	},
	"owl" : {
		name : "Owl",
		source : [["SRD", 385], ["M", 333]],
		size : 5, //Tiny
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 11,
		hp : 1,
		hd : [1, 4],
		speed : "5 ft, fly 60 ft",
		scores : [3, 13, 8, 2, 12, 7],
		skills : {
			"perception" : 3,
			"stealth" : 3
		},
		senses : "Darkvision 120 ft; Adv. on Wis (Perception) checks using hearing/sight",
		passivePerception : 13,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Talons",
			ability : 2,
			damage : [1, "", "slashing"],
			range : "Melee (5 ft)",
			description : "",
			abilitytodamage : false
		}],
		traits : [{
			name : "Flyby",
			description : "The owl doesn't provoke opportunity attacks when it flies out of an enemy's reach."
		}, {
			name : "Keen Hearing and Sight",
			description : "The owl has advantage on Wisdom (Perception) checks that rely on hearing or sight."
		}]
	},
	"panther" : {
		name : "Panther",
		source : [["SRD", 385], ["M", 333]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 13,
		hd : [3, 8],
		speed : "50 ft, climb 40 ft",
		scores : [14, 15, 10, 3, 14, 7],
		skills : {
			"perception" : 4,
			"stealth" : 6
		},
		senses : "Adv. on Wis (Perception) checks using smell",
		passivePerception : 14,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Claw",
			ability : 1,
			damage : [1, 4, "slashing"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Pounce trait"
		}, {
			name : "Bite",
			ability : 1,
			damage : [1, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "Can be used in combination with claw while pouncing (see Pounce trait)"
		}],
		traits : [{
			name : "Keen Smell",
			description : "The panther has advantage on Wisdom (Perception) checks that rely on smell."
		}, {
			name : "Pounce",
			description : "If the panther moves at least 20 ft straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 12 Strength saving throw or be knocked prone. If the target is prone, the panther can make one bite attack against it as a bonus action."
		}]
	},
	"poisonous snake" : {
		name : "Poisonous Snake",
		source : [["SRD", 386], ["M", 334]],
		size : 5, //Tiny
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 13,
		hp : 2,
		hd : [1, 4],
		speed : "30 ft, swim 30 ft",
		scores : [2, 16, 11, 1, 10, 3],
		senses : "Blindsight 10 ft",
		passivePerception : 10,
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, "", "piercing"],
			range : "Melee (5 ft)",
			description : "Target also takes 2d4 poison damage, half on a DC 10 Constitution saving throw",
			abilitytodamage : false
		}]
	},
	"polar bear" : {
		name : "Polar Bear",
		nameAlt : ["Bear, Polar"],
		source : [["SRD", 386], ["M", 334]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 42,
		hd : [5, 10],
		speed : "40 ft, swim 30 ft",
		scores : [20, 10, 16, 2, 13, 7],
		skills : {
			"perception" : 3
		},
		senses : "Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 8, "piercing"],
			range : "Melee (5 ft)",
			description : "One bite and one claws attack as an Attack action"
		}, {
			name : "Claw",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "One claws and one bite attack as an Attack action"
		}],
		actions : [{
			name : "Multiattack",
			description : "The bear makes two attacks: one with its bite and one with its claws."
		}],
		traits : [{
			name : "Keen Smell",
			description : "The bear has advantage on Wisdom (Perception) checks that rely on smell."
		}]
	},
	"pony" : {
		name : "Pony",
		source : [["SRD", 386], ["M", 335]],
		size : 3, //Medium
		type : "Beast",
		companion : "mount",
		alignment : "Unaligned",
		ac : 10,
		hp : 11,
		hd : [2, 8],
		speed : "40 ft",
		scores : [15, 10, 13, 2, 11, 7],
		senses : "",
		passivePerception : 10,
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Hooves",
			ability : 1,
			damage : [2, 4, "bludgeoning"],
			range : "Melee (5 ft)",
			description : ""
		}]
	},
	"quipper" : {
		name : "Quipper",
		source : [["SRD", 387], ["M", 335]],
		size : 5, //Tiny
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 13,
		hp : 1,
		hd : [1, 4],
		speed : "swim 40 ft",
		scores : [2, 16, 9, 1, 7, 2],
		senses : "Darkvision 60 ft",
		passivePerception : 8,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, "", "piercing"],
			range : "Melee (5 ft)",
			description : "",
			abilitytodamage : false
		}],
		traits : [{
			name : "Blood Frenzy",
			description : "The quipper has advantage on melee attack rolls against any creature that doesn't have all its HP."
		}, {
			name : "Water Breathing",
			description : "The quipper can breathe only underwater."
		}]
	},
	"rat" : {
		name : "Rat",
		source : [["SRD", 387], ["M", 335]],
		size : 5, //Tiny
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 10,
		hp : 1,
		hd : [1, 4],
		speed : "20 ft",
		scores : [2, 11, 9, 2, 10, 4],
		senses : "Darkvision 30 ft; Adv. on Wis (Perception) checks using smell",
		passivePerception : 10,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, "", "piercing"],
			range : "Melee (5 ft)",
			description : "",
			modifiers : [-2, ""],
			abilitytodamage : false
		}],
		traits : [{
			name : "Keen Smell",
			description : "The [THIS] has advantage on Wisdom (Perception) checks that rely on smell."
		}]
	},
	"raven" : {
		name : "Raven",
		nameAlt : ["Crow"],
		source : [["SRD", 387], ["M", 335], ["WDotMM", 302]],
		size : 5, //Tiny
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 12,
		hp : 1,
		hd : [1, 4],
		speed : "10 ft, fly 50 ft",
		scores : [2, 14, 8, 2, 12, 6],
		skills : {
			"perception" : 3
		},
		senses : "",
		passivePerception : 13,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Beak",
			ability : 2,
			damage : [1, "", "piercing"],
			range : "Melee (5 ft)",
			description : "",
			abilitytodamage : false
		}],
		traits : [{
			name : "Mimicry",
			description : "The [THIS] can mimic simple sounds it has heard, such as a person whispering, a baby crying, or an animal chittering. A creature that hears the sounds can tell they are imitations with a successful DC 10 Wisdom (Insight) check."
		}]
	},
	"reef shark" : {
		name : "Reef Shark",
		source : [["SRD", 387], ["M", 336]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 22,
		hd : [4, 8],
		speed : "swim 40 ft",
		scores : [14, 13, 13, 1, 10, 4],
		skills : {
			"perception" : 2
		},
		senses : "Blindsight 30 ft",
		passivePerception : 12,
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [1, 8, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Pack Tactics",
			description : "The shark has advantage on an attack roll against a creature if at least one of the shark's allies is within 5 ft of the creature and the ally isn't incapacitated."
		}, {
			name : "Water Breathing",
			description : "The shark can breathe only underwater."
		}]
	},
	"rhinoceros" : {
		name : "Rhinoceros",
		source : [["SRD", 388], ["M", 336]],
		size : 2, //Large
		type : "Beast",
		companion : "steed",
		alignment : "Unaligned",
		ac : 11,
		hp : 45,
		hd : [6, 10],
		speed : "40 ft",
		scores : [21, 8, 15, 2, 12, 6],
		senses : "",
		passivePerception : 11,
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Gore",
			ability : 1,
			damage : [2, 8, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Charge trait"
		}],
		traits : [{
			name : "Charge",
			description : "If the rhinoceros moves at least 20 ft straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) bludgeoning damage. If the target is a creature, it must succeed on a DC 15 Strength saving throw or be knocked prone."
		}]
	},
	"riding horse" : {
		name : "Riding Horse",
		nameAlt : ["Horse"],
		source : [["SRD", 388], ["M", 336]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 10,
		hp : 13,
		hd : [2, 10],
		speed : "60 ft",
		scores : [16, 10, 12, 2, 11, 7],
		senses : "",
		passivePerception : 10,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Hooves",
			ability : 1,
			damage : [2, 4, "bludgeoning"],
			range : "Melee (5 ft)",
			description : ""
		}]
	},
	"saber-toothed tiger" : {
		name : "Saber-Toothed Tiger",
		source : [["SRD", 388], ["M", 336]],
		size : 2, //Large
		type : "Beast",
		companion : "steed",
		alignment : "Unaligned",
		ac : 12,
		hp : 52,
		hd : [7, 10],
		speed : "40 ft",
		scores : [18, 14, 15, 3, 12, 8],
		skills : {
			"perception" : 3,
			"stealth" : 6
		},
		senses : "Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Claw",
			ability : 1,
			damage : [2, 6, "slashing"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Pounce trait",
			modifiers : ["", 1, ""]
		}, {
			name : "Bite",
			ability : 1,
			damage : [1, 10, "piercing"],
			range : "Melee (5 ft)",
			description : "Can be used in combination with claw while pouncing (see Pounce trait)",
			modifiers : ["", 1, ""]
		}],
		traits : [{
			name : "Keen Smell",
			description : "The tiger has advantage on Wisdom (Perception) checks that rely on smell."
		}, {
			name : "Pounce",
			description : "If the tiger moves at least 20 ft straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the tiger can make one bite attack against it as a bonus action."
		}]
	},
	"scorpion" : {
		name : "Scorpion",
		source : [["SRD", 388], ["M", 337]],
		size : 5, //Tiny
		type : "Beast",
		alignment : "Unaligned",
		ac : 11,
		hp : 1,
		hd : [1, 4],
		speed : "10 ft",
		scores : [2, 11, 8, 1, 8, 2],
		senses : "Blindsight 10 ft",
		passivePerception : 9,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Sting",
			ability : 2,
			damage : [1, "", "piercing"],
			range : "Melee (5 ft)",
			description : "Target also takes 1d8 poison damage, half on a DC 9 Constitution saving throw"
		}]
	},
	"sea horse" : {
		name : "Sea Horse",
		source : [["SRD", 389], ["M", 337]],
		size : 5, //Tiny
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 11,
		hp : 1,
		hd : [1, 4],
		speed : "swim 20 ft",
		scores : [1, 12, 8, 1, 10, 2],
		senses : "",
		passivePerception : 10,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 0,
		attacks : [],
		traits : [{
			name : "Water Breathing",
			description : "The sea horse can breathe only underwater."
		}]
	},
	"spider" : {
		name : "Spider",
		source : [["SRD", 389], ["M", 337]],
		size : 5, //Tiny
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 12,
		hp : 1,
		hd : [1, 4],
		speed : "20 ft, climb 20 ft",
		scores : [2, 14, 8, 1, 10, 2],
		skills : {
			"stealth" : 4
		},
		senses : "Darkvision 30 ft",
		passivePerception : 10,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, "", "piercing"],
			range : "Melee (5 ft)",
			description : "Target also takes 1d4 poison damage, half on a DC 9 Constitution saving throw",
			abilitytodamage : false
		}],
		traits : [{
			name : "Spider Climb",
			description : "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
		}, {
			name : "Web Sense",
			description : "While in contact with a web, the spider knows the exact location of any other creature in contact with the same web."
		}, {
			name : "Web Walker",
			description : "The spider ignores movement restrictions caused by webbing."
		}],
		wildshapeString : "\u25C6 Senses: Darkvision 30 ft | \u25C6 Spider Climb: The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.\n\u25C6 Web Sense: While in contact with a web, the spider knows the exact location of any other creature in contact with the same web.\n\u25C6 Web Walker: The spider ignores movement restrictions caused by webbing."
	},
	"stirge" : {
		name : "Stirge",
		source : [["SRD", 349], ["M", 284]],
		size : 5, //Tiny
		type : "Beast",
		alignment : "Unaligned",
		ac : 14,
		hp : 2,
		hd : [1, 4],
		speed : "10 ft, fly 40 ft",
		scores : [4, 16, 11, 2, 8, 6],
		senses : "Darkvision 60 ft",
		passivePerception : 9,
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Blood Drain",
			ability : 2,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : "The stirge attaches itself to the target, see Blood Drain trait"
		}],
		traits : [{
			name : "Blood Drain",
			description : "While attached, the stirge doesn't attack. Instead, at the start of each of the stirge's turns, the target loses 5 (1d4 + 3) HP due to blood loss. The stirge can detach itself by spending 5 ft of its movement. It does so after it drains 10 HP of blood from the target or the target dies. A creature, including the target, can use its action to detach the stirge."
		}]
	},
	"tiger" : {
		name : "Tiger",
		source : [["SRD", 391], ["M", 339]],
		size : 2, //Large
		type : "Beast",
		alignment : "Unaligned",
		ac : 12,
		hp : 37,
		hd : [5, 10],
		speed : "40 ft",
		scores : [17, 15, 14, 3, 12, 8],
		skills : {
			"perception" : 3,
			"stealth" : 6
		},
		senses : "Darkvision 60 ft; Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Claw",
			ability : 1,
			damage : [1, 8, "slashing"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Pounce trait"
		}, {
			name : "Bite",
			ability : 1,
			damage : [1, 10, "piercing"],
			range : "Melee (5 ft)",
			description : "Can be used in combination with claw while pouncing (see Pounce trait)"
		}],
		traits : [{
			name : "Keen Smell",
			description : "The tiger has advantage on Wisdom (Perception) checks that rely on smell."
		}, {
			name : "Pounce",
			description : "If the tiger moves at least 20 ft straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the tiger can make one bite attack against it as a bonus action."
		}]
	},
	"vulture" : {
		name : "Vulture",
		nameAlt : ["Peacock"],
		source : [["SRD", 392], ["M", 339], ["DiA", 195]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 10,
		hp : 5,
		hd : [1, 8],
		speed : "10 ft, fly 50 ft",
		scores : [7, 10, 13, 2, 12, 4],
		skills : {
			"perception" : 3
		},
		senses : "Adv. on Wis (Perception) checks using sight/smell",
		passivePerception : 13,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Beak",
			ability : 2,
			damage : [1, 4, "piercing"],
			range : "Melee (5 ft)",
			description : ""
		}],
		traits : [{
			name : "Keen Sight and Smell",
			description : "The [THIS] has advantage on Wisdom (Perception) checks that rely on sight or smell."
		}, {
			name : "Pack Tactics",
			description : "The [THIS] has advantage on an attack roll against a creature if at least one of the [THIS]'s allies is within 5 ft of the creature and the ally isn't incapacitated."
		}]
	},
	"warhorse" : {
		name : "Warhorse",
		source : [["SRD", 392], ["M", 340]],
		size : 2, //Large
		type : "Beast",
		companion : "mount",
		alignment : "Unaligned",
		ac : 11,
		hp : 19,
		hd : [3, 10],
		speed : "60 ft",
		scores : [18, 12, 13, 2, 12, 7],
		senses : "",
		passivePerception : 11,
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Hooves",
			ability : 1,
			damage : [2, 6, "bludgeoning"],
			range : "Melee (5 ft)",
			description : "If used after moving 20 ft straight in the same round, see Trampling Charge trait"
		}],
		traits : [{
			name : "Trampling Charge",
			description : "If the horse moves at least 20 ft straight toward a creature and then hits it with a hooves attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the horse can make another attack with its hooves against it as a bonus action."
		}]
	},
	"weasel" : {
		name : "Weasel",
		source : [["SRD", 392], ["M", 340]],
		size : 5, //Tiny
		type : "Beast",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 13,
		hp : 1,
		hd : [1, 4],
		speed : "30 ft",
		scores : [3, 16, 8, 2, 12, 3],
		skills : {
			"perception" : 3,
			"stealth" : 5
		},
		senses : "Adv. on Wis (Perception) checks using hearing/smell",
		passivePerception : 13,
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [1, "", "piercing"],
			range : "Melee (5 ft)",
			description : "",
			abilitytodamage : false
		}],
		traits : [{
			name : "Keen Hearing and Smell",
			description : "The weasel has advantage on Wisdom (Perception) checks that rely on hearing or smell."
		}]
	},
	"wolf" : {
		name : "Wolf",
		source : [["SRD", 393], ["M", 341]],
		size : 3, //Medium
		type : "Beast",
		alignment : "Unaligned",
		ac : 13,
		hp : 11,
		hd : [2, 8],
		speed : "40 ft",
		scores : [12, 15, 12, 3, 12, 6],
		skills : {
			"perception" : 3,
			"stealth" : 4
		},
		senses : "Adv. on Wis (Perception) checks using hearing/smell",
		passivePerception : 13,
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 2,
			damage : [2, 4, "piercing"],
			range : "Melee (5 ft)",
			description : "Target must succeed on a DC 11 Strength saving throw or be knocked prone"
		}],
		traits : [{
			name : "Keen Hearing and Smell",
			description : "The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell."
		}, {
			name : "Pack Tactics",
			description : "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 ft of the creature and the ally isn't incapacitated."
		}]
	},
	"worg" : {
		name : "Worg",
		source : [["SRD", 393], ["M", 341]],
		size : 2, //Large
		type : "Monstrosity",
		alignment : "Neutral Evil",
		ac : 13,
		hp : 26,
		hd : [4, 10],
		speed : "50 ft",
		scores : [16, 13, 13, 7, 11, 8],
		skills : {
			"perception" : 4
		},
		senses : "Darkvision 60 ft; Adv. on Wis (Perception) checks using hearing/smell",
		passivePerception : 14,
		languages : "Goblin, Worg",
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
			name : "Bite",
			ability : 1,
			damage : [2, 6, "piercing"],
			range : "Melee (5 ft)",
			description : "Target must succeed on a DC 13 Strength saving throw or be knocked prone"
		}],
		traits : [{
			name : "Keen Hearing and Smell",
			description : "The worg has advantage on Wisdom (Perception) checks that rely on hearing or smell."
		}]
	}
};
