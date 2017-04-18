var CreatureList = {
	// Monster Manual
	"air elemental" : {
		name : "Air Elemental",
		source : ["M", 124],
		size : 2, //Large
		type : "Elemental",
		subtype : "",
		alignment : "Neutral",
		ac : 15,
		hp : 90,
		hd : [12, 10], //[#, die]
		speed : "fly 90 ft (hover)",
		scores : [14, 20, 14, 6, 10, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
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
				damage : [2, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Two slam attacks as an Attack action",
			}, {
				name : "Whirlwind (Recharge 4-6)",
				ability : 1,
				damage : [3, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "All in shared area",
				dc : true,
				description : "Str save; fail\u2015 flung 20 ft random direction, prone; success\u2015 half damage",
				tooltip : "Each creature in the elemental's space that fails its saving throw is flung up to 20 feet away from the elemental in a random direction and knocked prone. If a thrown target strikes an object, such as a wall or floor, the target takes 3 (1d6) bludgeoning damage for every 10 feet it was thrown. If the target is thrown at another creature, that creature must succeed on a DC 13 Dexterity saving throw or take the same damage and be knocked prone.\nIf the saving throw is successful, the target takes half the bludgeoning damage and isn't flung away or knocked prone."
			},
		],
		traits : [{
				name : "Air Form",
				description : "The elemental can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing.",
			},
		],
		actions : [{
				name : "Whirlwind (Recharge 4-6)",
				description : "See Attack. Each creature in the elemental's space that fails its saving throw is flung up to 20 feet away from the elemental in a random direction and knocked prone. If a thrown target strikes an object, such as a wall or floor, the target takes 3 (1d6) bludgeoning damage for every 10 feet it was thrown. If the target is thrown at another creature, that creature must succeed on a DC 13 Dexterity saving throw or take the same damage and be knocked prone.\nIf the saving throw is successful, the target takes half the bludgeoning damage and isn't flung away or knocked prone.",
			},
		],
		wildshapeString : "Darkvision 60 ft| Knows Auran| Resistant to: lightning, thunder, and bludgeoning, piercing, and slashing from nonmagical weapons| Immune to: poison, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious| Air Form: can move through 1 inch wide space without squeezing and can move through and stop in space of hostiles| Whirlwind: see Monster Manual page 124",
	},
	"allosaurus" : {
		name : "Allosaurus",
		source : ["M", 79],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 51,
		hd : [6, 10], //[#, die]
		speed : "60 ft",
		scores : [19, 13, 17, 2, 12, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 5,
		},
		senses : "",
		passivePerception : 15,
		languages : "",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Claw",
				ability : 1,
				damage : [1, 8, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 30 ft straight in the same round, see Pounce trait",
			}, {
				name : "Bite",
				ability : 1,
				damage : [2, 10, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Can be used in combination with claw while pouncing (see Pounce trait)",
			},
		],
		traits : [{
				name : "Pounce",
				description : "If the allosaurus moves at least 30 ft straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the allosaurus can make one bite attack against it as a bonus action.",
			},
		],
	},
	"ankylosaurus" : {
		name : "Ankylosaurus",
		source : ["M", 79],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 15,
		hp : 68,
		hd : [8, 12], //[#, die]
		speed : "30 ft",
		scores : [19, 11, 15, 2, 12, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 11,
		languages : "",
		challengeRating : "3",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Tail",
				ability : 1,
				damage : [4, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "Target must succeed on a DC 14 Strength saving throw or be knocked prone",
				modifiers : [1, "", ""], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
	},
	"ape" : {
		name : "Ape",
		source : ["M", 317],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		companion : "companion",
		alignment : "Unaligned",
		ac : 12,
		hp : 19,
		hd : [3, 8], //[#, die]
		speed : "30 ft, climb 30 ft",
		scores : [16, 14, 14, 6, 12, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"athletics" : 5,
			"perception" : 3,
		},
		senses : "",
		passivePerception : 13,
		languages : "",
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
				name : "Fist",
				ability : 1,
				damage : [1, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Two fist attacks as an Attack action",
			}, {
				name : "Rock",
				ability : 1,
				damage : [1, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "25/50 ft",
				description : "One rock attack as an Attack action",
			},
		],
	},
	"axe beak" : {
		name : "Axe Beak",
		source : ["M", 317],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 11,
		hp : 19,
		hd : [3, 10], //[#, die]
		speed : "50 ft",
		scores : [14, 12, 12, 2, 10, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
				name : "Beak",
				ability : 1,
				damage : [1, 8, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
	},
	"baboon" : {
		name : "Baboon",
		source : ["M", 318],
		size : 4, //Small
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 3,
		hd : [1, 6], //[#, die]
		speed : "30 ft, climb 30 ft",
		scores : [8, 14, 11, 4, 12, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 11,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Pack Tactics",
				description : "The baboon has advantage on an attack roll against a creature if at least one of the baboon's allies is within 5 ft of the creature and the ally isn't incapacitated.",
			},
		],
	},
	"badger" : {
		name : "Badger",
		source : ["M", 318],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 10,
		hp : 3,
		hd : [1, 4], //[#, die]
		speed : "20 ft, burrow 5 ft",
		scores : [4, 11, 12, 2, 12, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Darkvision 30 ft; Adv. on Wis (Perception) checks using smell",
		passivePerception : 11,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, "", "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Keen Smell",
				description : "The badger has advantage on Wisdom (Perception) checks that rely on smell.",
			},
		],
	},
	"bat" : {
		name : "Bat",
		source : ["M", 318],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 12,
		hp : 1,
		hd : [1, 4], //[#, die]
		speed : "5 ft, fly 30 ft",
		scores : [2, 15, 8, 2, 12, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Blindsight 60 ft; Adv. on Wis (Perception) checks using hearing",
		passivePerception : 11,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, "", "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : ["Str", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Echolocation",
				description : "The bat can't use its Blindsight while deafened.",
			}, {
				name : "Keen Hearing",
				description : "The bat has advantage on Wisdom (Perception) checks that rely on hearing.",
			},
		],
	},
	"black bear" : {
		name : "Black Bear",
		source : ["M", 318],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		companion : "companion",
		alignment : "Unaligned",
		ac : 11,
		hp : 19,
		hd : [3, 8], //[#, die]
		speed : "40 ft, climb 30 ft",
		scores : [15, 10, 14, 2, 12, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One bite and one claw attack as an Attack action",
				modifiers : [-1, "", ""], //[to hit, to damage, add ability to damage] "" means ignore
			}, {
				name : "Claw",
				ability : 1,
				damage : [2, 4, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One claw and one bite attack as an Attack action",
				modifiers : [-1, "", ""], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Keen Smell",
				description : "The bear has advantage on Wisdom (Perception) checks that rely on smell.",
			},
		],
	},
	"blink dog" : {
		name : "Blink Dog",
		source : ["M", 318],
		size : 3, //Medium
		type : "Fey",
		subtype : "",
		alignment : "Lawful Good",
		ac : 13,
		hp : 22,
		hd : [4, 8], //[#, die]
		speed : "40 ft",
		scores : [12, 17, 12, 10, 13, 11], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 5,
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
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Keen Hearing and Smell",
				description : "The dog has advantage on Wisdom (Perception) checks that rely on hearing or smell.",
			},
		],
		actions : [{
				name : "Teleport (Recharge 4-6)",
				description : "As an action, the dog magically teleports, along with any equipment it is wearing or carrying, up to 40 ft to an unoccupied space it can see. Before or after teleporting, the dog can make one bite attack.",
			},
		],
	},
	"blood hawk" : {
		name : "Blood Hawk",
		source : ["M", 319],
		size : 4, //Small
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 7,
		hd : [2, 6], //[#, die]
		speed : "10 ft, fly 60 ft",
		scores : [6, 14, 10, 3, 14, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 4,
		},
		senses : "Adv. on Wis (Perception) checks using sight",
		passivePerception : 14,
		languages : "",
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Beak",
				ability : 2,
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Keen Sight",
				description : "The hawk has advantage on Wisdom (Perception) checks that rely on sight.",
			}, {
				name : "Pack Tactics",
				description : "The hawk has advantage on an attack roll against a creature if at least one of the hawk's allies is within 5 ft of the creature and the ally isn't incapacitated.",
			},
		],
	},
	"boar" : {
		name : "Boar",
		source : ["M", 319],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		companion : "companion",
		alignment : "Unaligned",
		ac : 11,
		hp : 11,
		hd : [2, 8], //[#, die]
		speed : "40 ft",
		scores : [13, 11, 12, 2, 9, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 9,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Tusk",
				ability : 1,
				damage : [1, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Charge trait",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the boar moves at least 20 ft straight toward a target and then hits it with a tusk attack on the same turn, the target takes an extra 3 (1d6) slashing damage. A targeted creature must succeed on a DC 11 Strength saving throw or be knocked prone.",
			}, {
				name : "Relentless (Recharges after a Short or Long Rest)",
				description : "If the boar takes 7 damage or less that would reduce it to 0 HP, it is reduced to 1 HP instead.",
			},
		],
	},
	"brown bear" : {
		name : "Brown Bear",
		source : ["M", 319],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 11,
		hp : 34,
		hd : [4, 10], //[#, die]
		speed : "40 ft, climb 30 ft",
		scores : [19, 10, 16, 2, 13, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One bite and one claw attack as an Attack action",
				modifiers : [-1, "", ""], //[to hit, to damage, add ability to damage] "" means ignore
			}, {
				name : "Claw",
				ability : 1,
				damage : [2, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One claw and one bite attack as an Attack action",
				modifiers : [-1, "", ""], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Keen Smell",
				description : "The bear has advantage on Wisdom (Perception) checks that rely on smell.",
			},
		],
	},
	"camel" : {
		name : "Camel",
		source : ["M", 320],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		companion : "mount",
		alignment : "Unaligned",
		ac : 9,
		hp : 15,
		hd : [2, 10], //[#, die]
		speed : "50 ft",
		scores : [16, 8, 14, 2, 8, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 9,
		languages : "",
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 4, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
	},
	"cat" : {
		name : "Cat",
		source : ["M", 320],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 12,
		hp : 2,
		hd : [1, 4], //[#, die]
		speed : "40 ft, climb 30 ft",
		scores : [3, 15, 10, 3, 12, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 4,
		},
		senses : "Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Claws",
				ability : 2,
				damage : [1, "", "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : ["Str", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Keen Smell",
				description : "The cat has advantage on Wisdom (Perception) checks that rely on smell.",
			},
		],
	},
	"cave bear" : {
		name : "Cave Bear",
		source : ["M", 334],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 42,
		hd : [5, 10], //[#, die]
		speed : "40 ft, swim 30 ft",
		scores : [20, 10, 16, 2, 13, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "Darkvision 60 ft; Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One bite and one claw attack as an Attack action",
			}, {
				name : "Claw",
				ability : 1,
				damage : [2, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One claw and one bite attack as an Attack action",
			},
		],
		traits : [{
				name : "Keen Smell",
				description : "The bear has advantage on Wisdom (Perception) checks that rely on smell.",
			},
		],
	},
	"constrictor snake" : {
		name : "Constrictor Snake",
		source : ["M", 320],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 13,
		hd : [2, 10], //[#, die]
		speed : "30 ft, swim 30 ft",
		scores : [15, 14, 12, 1, 10, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Blindsight 10 ft",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},{
				name : "Constrict",
				ability : 1,
				damage : [1, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target is grappled and restrained (escape DC 14); Can't use constrict again until grapple ends",
			},
		],
	},
	"crab" : {
		name : "Crab",
		source : ["M", 320],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 11,
		hp : 2,
		hd : [1, 4], //[#, die]
		speed : "20 ft, swim 20 ft",
		scores : [2, 11, 10, 1, 8, 2], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"stealth" : 2,
		},
		senses : "Blindsight 30 ft",
		passivePerception : 9,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Claw",
				ability : 1,
				damage : [1, "", "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : [2, "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Amphibious",
				description : "The crab can breathe air and water.",
			},
		],
	},
	"crawling claw" : {
		name : "Crawling Claw",
		source : ["M", 44],
		size : 5, //Tiny
		type : "Undead",
		subtype : "",
		alignment : "Neutral Evil",
		ac : 12,
		hp : 2,
		hd : [1, 4], //[#, die]
		speed : "20 ft, climb 20 ft",
		scores : [13, 14, 11, 5, 10, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Blindsight 30 ft (blind beyond this radius)",
		damage_immunities : "poison",
		condition_immunities : "charmed, exhaustion, poisoned",
		passivePerception : 10,
		languages : "understands Common but can't speak",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Claw",
				ability : 1,
				damage : [1, 4, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Does bludgeoning or slashing damage (claw's choice)",
			},
		],
		traits : [{
				name : "Turn Immunity",
				description : "The claw is immune to effects that turn undead.",
			},
		],
	},
	"crocodile" : {
		name : "Crocodile",
		source : ["M", 320],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 19,
		hd : [3, 10], //[#, die]
		speed : "20 ft, swim 20 ft",
		scores : [15, 10, 13, 2, 10, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"stealth" : 2,
		},
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 10, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target is grappled and restrained (escape DC 12); Can't use bite again until grapple ends",
			},
		],
		traits : [{
				name : "Hold Breath",
				description : "The crocodile can hold its breath for 15 minutes.",
			},
		],
	},
	"death dog" : {
		name : "Death Dog",
		source : ["M", 321],
		size : 3, //Medium
		type : "Monstrosity",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 39,
		hd : [6, 8], //[#, die]
		speed : "40 ft",
		scores : [15, 14, 14, 3, 13, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 5,
			"stealth" : 4,
		},
		senses : "Darkvision 120 ft; Adv. on Wis (Perception) checks",
		passivePerception : 15,
		languages : "",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Two bite attacks as an Attack action; Target DC 12 Con save or diseased and poisoned",
				tooltip : "If the target of the death dog's bite attack is a creature, it must succeed on a DC 12 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the creature must repeat the saving throw, reducing its hit point maximum by 5 (1d10) on a failure. This reduction lasts until the disease is cured. The creature dies if the disease reduces its hit point maximum to 0."
			},
		],
		traits : [{
				name : "Two-Headed",
				description : "The death dog has advantage on Wisdom (Perception) checks and on saving throws against being blinded, charmed, deafened, frightened, stunned, or knocked unconscious."
			}, {
				name : "Bite attack",
				description : "If the target of the death dog's bite attack is a creature, it must succeed on a DC 12 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the creature must repeat the saving throw, reducing its hit point maximum by 5 (1d10) on a failure. This reduction lasts until the disease is cured. The creature dies if the disease reduces its hit point maximum to 0."
			}
		]
	},
	"deer" : {
		name : "Deer",
		source : ["M", 321],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 4,
		hd : [1, 8], //[#, die]
		speed : "50 ft",
		scores : [11, 16, 11, 2, 14, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 12,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
	},
	"dire wolf" : {
		name : "Dire Wolf",
		source : ["M", 321],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 14,
		hp : 37,
		hd : [5, 10], //[#, die]
		speed : "50 ft",
		scores : [17, 15, 15, 3, 12, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 4,
		},
		senses : "Adv. on Wis (Perception) checks using hearing/smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [2, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target must succeed on a DC 13 Strength saving throw or be knocked prone",
			},
		],
		traits : [{
				name : "Keen Hearing and Smell",
				description : "The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.",
			}, {
				name : "Pack Tactics",
				description : "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 ft of the creature and the ally isn't incapacitated.",
			},
		],
	},
	"draft horse" : {
		name : "Draft Horse",
		source : ["M", 321],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 10,
		hp : 19,
		hd : [3, 10], //[#, die]
		speed : "40 ft",
		scores : [18, 10, 12, 2, 11, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Hooves",
				ability : 1,
				damage : [2, 4, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
	},
	"eagle" : {
		name : "Eagle",
		source : ["M", 322],
		size : 4, //Small
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 3,
		hd : [1, 6], //[#, die]
		speed : "10 ft, fly 60 ft",
		scores : [6, 15, 10, 2, 14, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 4,
		},
		senses : "Adv. on Wis (Perception) checks using sight",
		passivePerception : 14,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Talons",
				ability : 2,
				damage : [1, 4, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Keen Sight",
				description : "The eagle has advantage on Wisdom (Perception) checks that rely on sight.",
			},
		],
	},
	"earth elemental" : {
		name : "Earth Elemental",
		source : ["M", 124],
		size : 2, //Large
		type : "Elemental",
		subtype : "",
		alignment : "Neutral",
		ac : 17,
		hp : 126,
		hd : [12, 10], //[#, die]
		speed : "30 ft, burrow 30 ft",
		scores : [20, 8, 20, 5, 10, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
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
				damage : [2, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "Two slam attacks as an Attack action",
			},
		],
		traits : [{
				name : "Earth Glide",
				description : "The elemental can burrow through nonmagical, unworked earth and stone. While doing so, the elemental doesn't disturb the material it moves through.",
			}, {
				name : "Siege Monster",
				description : "The elemental deals double damage to objects and structures.",
			},
		],
		wildshapeString : "Darkvision 60 ft; Tremorsense 60 ft| Knows Terran| Vulnerable to: thunder| Resistant to: bludgeoning, piercing, and slashing from nonmagical weapons| Immune to: poison, exhaustion, paralyzed, petrified, poisoned, unconscious| Earth Glide: can burrow through nonmagical, unworked earth and stone without disturbing the material| Siege Monster: does double damage to objects and structures",
	},
	"elephant" : {
		name : "Elephant",
		source : ["M", 322],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 76,
		hd : [8, 12], //[#, die]
		speed : "40 ft",
		scores : [22, 9, 17, 3, 11, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Gore",
				ability : 1,
				damage : [3, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Trampling Charge trait",
			}, {
				name : "Stomp",
				ability : 1,
				damage : [3, 10, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Can only be used on prone creatures (also see Trampling Charge trait)",
			},
		],
		traits : [{
				name : "Trampling Charge",
				description : "If the elephant moves at least 20 ft straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 12 Strength saving throw or be knocked prone. If the target is prone, the elephant can make one stomp attack against it as a bonus action.",
			},
		],
	},
	"elk" : {
		name : "Elk",
		source : ["M", 322],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		companion : "mount",
		alignment : "Unaligned",
		ac : 10,
		hp : 13,
		hd : [2, 10], //[#, die]
		speed : "50 ft",
		scores : [16, 10, 12, 2, 10, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Ram",
				ability : 1,
				damage : [1, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Charge trait",
			}, {
				name : "Hooves",
				ability : 1,
				damage : [2, 4, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Can only be used on prone creatures",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the elk moves at least 20 ft straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.",
			},
		],
	},
	"faerie dragon" : { //contains contributions by Patrick O.
		name : "Faerie Dragon",
		source : ["M", 133],
		size : 5, //Tiny
		type : "Dragon",
		subtype : "",
		alignment : "Chaotic Good",
		ac : 15,
		hp : 14,
		hd : [4, 4],
		speed : "10 ft, fly 60 ft",
		scores : [3, 20, 13, 14, 12, 16], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"arcana" : 4,
			"perception" : 3,
			"stealth" : 7
		},
		senses : "Darkvision 60 ft",
		passivePerception : 13,
		languages : "Draconic, Sylvan",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, "", "piercing"],
				range : "Melee (5 ft)",
				description : "",
				modifiers : ["", "", false]
			}, {
				name : "Euphoria Breath (Recharge 5-6)",
				ability : 3,
				damage : ["Wis save", "", "Euphoria"],
				range : "5 ft",
				description : "For 1 min, target rolls d6 at turn start: 1-4 move random (no actions), 5-6 save again (no actions/move)",
				dc : true,
				modifiers : ["", "", false],
				tooltip : "The dragon exhales a puff of euphoria gas at one creature within 5 feet of it. The target must succeed on a DC 11 Wisdom saving throw, or for 1 minute, the target can't take reactions and must roll a d6 at the start of each of its turns to determine its behavior during the turn: 1-4 - the target takes no action or bonus action and uses all its movment to move in a random direction. 5-6 - the target doesn't move, and the only thing it can do on its turn is make a DC 11 Wisdom saving throw, ending the effect on itself on a success."
			}
		],
		traits : [{
				name : "Superior Invisibility",
				description : "As a bonus action, the dragon can magically turn invisible until its concentration ends (as with a spell). Anything it wears or carries is invisible with it.",
			}, {
				name : "Limited Telepathy",
				description : "Using telepathy, the dragon can magically communicate with any other faerie dragon within 60 feet of it.",
			}, {
				name : "Magic Resistance",
				description : "The dragon has advantage on saves against spells and magical effects.",
			}, {
				name : "Euphoria Breath (Recharge 5-6)",
				description : "Exhale a puff of euphoria gas at a creature within 5 ft. It must succeed on a DC 11 Wisdom save, or for 1 minute, it can't take reactions and must roll a d6 at the start of each of its turns:\n 1-4 - No action or bonus action, using all movment to move in a random direction.\n 5-6 - The target does nothing except attempt another save to try end the effect on itself.",
			}
		],
		features : [{
				name : "Innate Spellcasting",
				description : "Cast spells using Charisma (save DC 13), requiring no material components. The spells it knows depends on its age (and stack):\n Red: 1/day - Dancing Lights, Mage Hand, Minor Illusion\n Orange (6-10 years): 1/day - Color Spray\n Yellow (11-20 years): 1/day - Mirror Image\n Green (21-30 years): 1/day - Suggestion\n Blue (31-40 years): 1/day - Major Image\n Indigo (41-50 years): 1/day - Hallucinatory Terrain\n Violet (51+ years): 1/day - Polymorph",
			}
		]
	},
	"fire elemental" : {
		name : "Fire Elemental",
		source : ["M", 124],
		size : 2, //Large
		type : "Elemental",
		subtype : "",
		alignment : "Neutral",
		ac : 13,
		hp : 102,
		hd : [12, 10], //[#, die]
		speed : "50 ft",
		scores : [10, 17, 16, 6, 10, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
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
				damage : [2, 6, "fire"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "2 per Attack; Ignites flammable; Until action to douse, target 1d10 fire damage at start of its turn",
			},
		],
		traits : [{
				name : "Fire Form",
				description : "The elemental can move through a space as narrow as 1 inch wide without squeezing. A creature that touches the elemental or hits it with a melee attack while within 5 ft of it takes 5 (1d10) fire damage. In addition, the elemental can enter a hostile creature's space and stop there. The first time it enters a creature's space on a turn, that creature takes 5 (1d10) fire damage and catches fire; until someone takes an action to douse the fire, the creature takes 5 (1d10) fire damage at the start of each of its turns.",
			}, {
				name : "Illumination",
				description : "The elemental sheds bright light in a 30-foot radius and dim light in an additional 30 ft.",
			}, {
				name : "Water Susceptibility",
				description : "For every 5 ft the elemental moves in water, or for every gallon of water splashed on it, it takes 1 cold damage.",
			},
		],
		wildshapeString : "Darkvision 60 ft| Knows Ignan| Resistant to: bludg./ piercing/slashing from nonmagical weapons| Immune to: fire/poison/exhaustion/grappled/paralyzed/petrified/ poisoned/prone/restrained/unconscious| Sheds 30-ft bright/dim light| 1 cold dmg per gallon of or 5ft moved through water| Fire Form: pass through 1\" space no squeezing; move through/stop in another's space; do 1d10 fire dmg to melee attackers; MM, p125",
	},
	"flying snake" : {
		name : "Flying Snake",
		source : ["M", 322],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 14,
		hp : 5,
		hd : [2, 4], //[#, die]
		speed : "30 ft, fly 60 ft, swim 30 ft",
		scores : [4, 18, 11, 2, 12, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Blindsight 10 ft",
		passivePerception : 11,
		languages : "",
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, "", "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target also takes 3d4 poison damage",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Flyby",
				description : "The snake doesn't provoke opportunity attacks when it flies out of an enemy's reach.",
			},
		],
	},
	"frog" : {
		name : "Frog",
		source : ["M", 322],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 11,
		hp : 1,
		hd : [1, 4], //[#, die]
		speed : "20 ft, swim 20 ft",
		scores : [1, 13, 8, 1, 8, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 1,
			"stealth" : 3,
		},
		senses : "Darkvision 30 ft",
		passivePerception : 11,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [],
		traits : [{
				name : "Amphibious",
				description : "The frog can breathe air and water",
			}, {
				name : "Standing Leap",
				description : "The frog's long jump is up to 10 ft and its high jump is up to 5 ft, with or without a running start.",
			},
		],
	},
	"ghast" : {
		name : "Ghast",
		source : ["M", 148],
		size : 3, //Medium
		type : "Undead",
		subtype : "",
		alignment : "Chaotic Evil",
		ac : 12,
		hp : 36,
		hd : [5, 8], //[#, die]
		speed : "30 ft",
		scores : [16, 17, 10, 11, 10, 8], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
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
				damage : [2, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : [-2, "", ""], //[to hit, to damage, add ability to damage] "" means ignore
			}, {
				name : "Claws",
				ability : 1,
				damage : [2, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "DC 10 Con save or 1 min paralyzed; Save end of each turn (elf/undead immune)",
				tooltip : "If the target is a creature other than an elf or undead, it must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
			},
		],
		traits : [{
				name : "Stench",
				description : "Any creature that starts its turn within 5 ft of the ghast must succeed on a DC 10 Constitution saving throw or be poisoned until the start of its next turn. On a successful saving throw, the creature is immune to the ghast's Stench for 24 hours.",
			}, {
				name : "Turn Defiance",
				description : "The ghast and any ghouls within 30 ft of it have advantage on saving throws against effects that turn undead.",
			},
		],
	},
	"ghoul" : {
		name : "Ghoul",
		source : ["M", 148],
		size : 3, //Medium
		type : "Undead",
		subtype : "",
		alignment : "Chaotic Evil",
		ac : 12,
		hp : 22,
		hd : [5, 8], //[#, die]
		speed : "30 ft",
		scores : [13, 15, 10, 7, 10, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
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
				damage : [2, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : [-2, "", ""], //[to hit, to damage, add ability to damage] "" means ignore
			}, {
				name : "Claws",
				ability : 1,
				damage : [2, 4, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "DC 10 Con save or 1 min paralyzed; Save end of each turn (elf/undead immune)",
				tooltip : "If the target is a creature other than an elf or undead, it must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
			},
		],
	},
	"giant ape" : {
		name : "Giant Ape",
		source : ["M", 323],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 157,
		hd : [15, 12], //[#, die]
		speed : "40 ft, climb 40 ft",
		scores : [23, 14, 18, 7, 12, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"athletics" : 9,
			"perception" : 4,
		},
		senses : "",
		passivePerception : 14,
		languages : "",
		challengeRating : "7",
		proficiencyBonus : 3,
		attacksAction : 2,
		attacks : [{
				name : "Fist",
				ability : 1,
				damage : [3, 10, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "Two fist attacks as an Attack action",
			}, {
				name : "Rock",
				ability : 1,
				damage : [7, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "50/100 ft",
				description : "One rock attack as an Attack action",
			},
		],
	},
	"giant badger" : {
		name : "Giant Badger",
		source : ["M", 323],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		companion : "companion",
		alignment : "Unaligned",
		ac : 10,
		hp : 13,
		hd : [2, 8], //[#, die]
		speed : "30 ft, burrow 10 ft",
		scores : [13, 10, 15, 2, 12, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Darkvision 30 ft; Adv. on Wis (Perception) checks using smell",
		passivePerception : 11,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One bite and one claws attack as an Attack action",
			}, {
				name : "Claws",
				ability : 1,
				damage : [2, 4, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One claws and one bite attack as an Attack action",
			},
		],
		traits : [{
				name : "Keen Smell",
				description : "The badger has advantage on Wisdom (Perception) checks that rely on smell.",
			},
		],
	},
	"giant bat" : {
		name : "Giant Bat",
		source : ["M", 323],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 22,
		hd : [4, 10], //[#, die]
		speed : "10 ft, fly 60 ft",
		scores : [15, 16, 11, 2, 12, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Blindsight 60 ft; Adv. on Wis (Perception) checks using hearing",
		passivePerception : 11,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Echolocation",
				description : "The bat can't use its Blindsight while deafened.",
			}, {
				name : "Keen Hearing",
				description : "The bat has advantage on Wisdom (Perception) checks that rely on hearing.",
			},
		],
	},
	"giant boar" : {
		name : "Giant Boar",
		source : ["M", 323],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 42,
		hd : [5, 10], //[#, die]
		speed : "40 ft",
		scores : [17, 10, 16, 2, 7, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 8,
		languages : "",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Tusk",
				ability : 1,
				damage : [2, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Charge trait",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the boar hits with a tusk attack after moving at least 20 ft straight toward a target on the same turn, the target takes an extra 2d6 slashing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.",
			}, {
				name : "Relentless (Recharges after a Short or Long Rest)",
				description : "If the boar takes 10 damage or less that would reduce it to 0 HP, it is reduced to 1 HP instead.",
			},
		],
	},
	"giant centipede" : {
		name : "Giant Centipede",
		source : ["M", 323],
		size : 4, //Small
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 4,
		hd : [1, 6], //[#, die]
		speed : "30 ft, climb 30 ft",
		scores : [5, 14, 12, 1, 7, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Blindsight 30 ft",
		passivePerception : 8,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target must succeed on a DC 11 Constitution saving throw or take 3d6 poison damage",
			},
		],
		traits : [{
				name : "Bite",
				description : "If the poison damage from the centipede's bite attack reduces the target to 0 HP, the target is stable but poisoned for 1 hour, even after regaining HP, and is paralyzed while poisoned in this way.",
			},
		],
	},
	"giant constrictor snake" : {
		name : "Giant Constrictor Snake",
		source : ["M", 324],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 60,
		hd : [8, 12], //[#, die]
		speed : "30 ft, swim 30 ft",
		scores : [19, 14, 12, 1, 10, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 2,
		},
		senses : "Blindsight 10 ft",
		passivePerception : 12,
		languages : "",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [2, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "",
			},{
				name : "Constrict",
				ability : 1,
				damage : [2, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target is grappled and restrained (escape DC 16); Can't use constrict again until grapple ends",
			},
		],
	},
	"giant crab" : {
		name : "Giant Crab",
		source : ["M", 324],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 15,
		hp : 13,
		hd : [3, 8], //[#, die]
		speed : "30 ft, swim 30 ft",
		scores : [13, 15, 11, 1, 9, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"stealth" : 4,
		},
		senses : "Blindsight 30 ft",
		passivePerception : 9,
		languages : "",
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Claw",
				ability : 1,
				damage : [1, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target is grappled (escape DC 11); Can't use a claw again until grapple ends",
			},
		],
		traits : [{
				name : "Amphibious",
				description : "The crab can breathe air and water.",
			},
		],
	},
	"giant crocodile" : {
		name : "Giant Crocodile",
		source : ["M", 324],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 14,
		hp : 85,
		hd : [9, 12], //[#, die]
		speed : "30 ft, swim 50 ft",
		scores : [21, 9, 17, 2, 10, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"stealth" : 5,
		},
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "5",
		proficiencyBonus : 3,
		attacksAction : 2,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [3, 10, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target is grappled and restrained (escape DC 16); Can't use bite again until grapple ends",
			}, {
				name : "Tail",
				ability : 1,
				damage : [2, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "Target must succeed on a DC 16 Strength saving throw or be knocked prone",
			},
		],
		traits : [{
				name : "Hold Breath",
				description : "The crocodile can hold its breath for 30 minutes.",
			}, {
				name : "Multiattack",
				description : "The crocodile makes two attacks: one with its bite and one with its tail (to a target it is not grappling).",
			},
		],
	},
	"giant eagle" : {
		name : "Giant Eagle",
		source : ["M", 324],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Neutral Good",
		ac : 13,
		hp : 26,
		hd : [4, 10], //[#, die]
		speed : "10 ft, fly 80 ft",
		scores : [16, 17, 13, 8, 14, 10], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 4,
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
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One beak and one talons attack as an Attack action",
			}, {
				name : "Talons",
				ability : 1,
				damage : [2, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One talons and one beak attack as an Attack action",
			},
		],
		traits : [{
				name : "Keen Sight",
				description : "The eagle has advantage on Wisdom (Perception) checks that rely on sight.",
			},
		],
	},
	"giant elk" : {
		name : "Giant Elk",
		source : ["M", 325],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 15,
		hp : 42,
		hd : [5, 12], //[#, die]
		speed : "60 ft",
		scores : [19, 16, 14, 7, 14, 10], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 4,
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
				damage : [2, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "If used after moving 20 ft straight in the same round, see Charge trait",
			}, {
				name : "Hooves",
				ability : 1,
				damage : [4, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Can only be used on prone creatures",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the elk moves at least 20 ft straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be knocked prone.",
			},
		],
	},
	"giant fire beetle" : {
		name : "Giant Fire Beetle",
		source : ["M", 325],
		size : 4, //Small
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 4,
		hd : [1, 6], //[#, die]
		speed : "30 ft",
		scores : [8, 10, 12, 1, 7, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Blindsight 30 ft",
		passivePerception : 8,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Illumination",
				description : "The beetle sheds bright light in a 10-foot radius and dim light for an additional 10 ft.",
			},
		],
	},
	"giant frog" : {
		name : "Giant Frog",
		source : ["M", 325],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 11,
		hp : 18,
		hd : [4, 8], //[#, die]
		speed : "30 ft, swim 30 ft",
		scores : [12, 13, 11, 2, 10, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 2,
			"stealth" : 3,
		},
		senses : "Darkvision 30 ft",
		passivePerception : 12,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target is grappled and restrained (escape DC 11); Can't use bite again until grapple ends",
			},
		],
		traits : [{
				name : "Amphibious",
				description : "The frog can breathe air and water",
			}, {
				name : "Standing Leap",
				description : "The frog's long jump is up to 20 ft and its high jump is up to 10 ft, with or without a running start.",
			}, {
				name : "Swallow",
				description : "The frog makes one bite attack against a Small or smaller target it is grappling. If the attack hits, the target is swallowed, and the grapple ends. The swallowed target is blinded and restrained, it has total cover against attacks and other effects outside the frog, and it takes 5 (2d4) acid damage at the start of each of the frog's turns. The frog can have only one target swallowed at a time. If the frog dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 5 ft of movement, exiting prone.",
			}
		],
		wildshapeString : "Darkvision 30 ft| Amphibious: can breathe air and water| Standing Leap: can long jump up to 20 ft and high jump up to 10 ft, with or without a running start| Swallow: if a bite attack hits a Small or smaller target it is grappling, it is swallowed, ending the grapple. Swallowed: blinded, restrained, total cover, takes 2d4 acid damage at the start of each of the frog's turns; can have only 1 swallowed at a time.",
	},
	"giant goat" : {
		name : "Giant Goat",
		source : ["M", 326],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 11,
		hp : 19,
		hd : [3, 10], //[#, die]
		speed : "40 ft",
		scores : [17, 11, 12, 3, 12, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 11,
		languages : "",
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Ram",
				ability : 1,
				damage : [2, 4, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Charge trait",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the goat hits with a ram attack after moving at least 20 ft straight toward a target on the same turn, the target takes an extra 2d4 bludgeoning damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.",
			}, {
				name : "Sure-Footed",
				description : "The goat has advantage on Strength and Dexterity saving throws made against effects that would knock it prone.",
			},
		],
	},
	"giant hyena" : {
		name : "Giant Hyena",
		source : ["M", 326],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 45,
		hd : [6, 10], //[#, die]
		speed : "50 ft",
		scores : [16, 14, 14, 2, 12, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "",
		passivePerception : 13,
		languages : "",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [2, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "After reducing opponent to 0 HP, take bonus action to move and attack (see Rampage trait)",
			},
		],
		traits : [{
				name : "Rampage",
				description : "When the hyena reduces a creature to 0 HP with a melee attack on its turn, the hyena can take a bonus action to move up to half its speed and make a bite attack.",
			},
		],
	},
	"giant lizard" : {
		name : "Giant Lizard",
		source : ["M", 326],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 19,
		hd : [3, 10], //[#, die]
		speed : "30 ft, climb 30 ft",
		scores : [15, 12, 13, 2, 10, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Darkvision 30 ft",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Variant: Hold Breath",
				description : "The lizard can hold its breath for 15 minutes. (A lizard that has this trait also has a swimming speed of 30 feet.)",
			}, {
				name : "Variant: Spider Climb",
				description : "The lizard can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.",
			},
		],
	},
	"giant octopus" : {
		name : "Giant Octopus",
		source : ["M", 326],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 11,
		hp : 52,
		hd : [8, 10], //[#, die]
		speed : "10 ft, swim 60 ft",
		scores : [17, 13, 13, 4, 10, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 4,
			"stealth" : 5,
		},
		senses : "Darkvision 60 ft",
		passivePerception : 14,
		languages : "",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Tentacles",
				ability : 1,
				damage : [2, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (15 ft)",
				description : "Target is grappled and restrained (escape DC 16); Can't use tentacles again until grapple ends",
			},
		],
		traits : [{
				name : "Hold Breath",
				description : "While out of water, the octopus can hold its breath for 1 hour.",
			}, {
				name : "Underwater Camouflage",
				description : "The octopus has advantage on Dexterity (Stealth) checks made while underwater.",
			}, {
				name : "Water Breathing",
				description : "The octopus can breathe only underwater.",
			},
		],
		actions : [{
				name : "Ink Cloud (Recharges after a Short or Long Rest)",
				description : "As an action, a 20-foot-radius cloud of ink extends all around the octopus if it is underwater. The area is heavily obscured for 1 minute, although a significant current can disperse the ink. After releasing the ink, the octopus can use the Dash action as a bonus action.",
			},
		],
		wildshapeString : "Darkvision 60 ft| Water Breathing: can breathe only underwater| Hold Breath: can hold its breath for 1 hourout of water| Underwater Camouflage: advantage on Dexterity (Stealth) checks made while underwater| Ink Cloud (Recharges after a Short or Long Rest): if underwater, 20-ft radius cloud of ink around octopus, heavily obscures for 1 minute, can be dispersed. After releasing, can use the Dash action as a bonus action",
	},
	"giant owl" : {
		name : "Giant Owl",
		source : ["M", 327],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Neutral",
		ac : 12,
		hp : 19,
		hd : [3, 10], //[#, die]
		speed : "5 ft, fly 60 ft",
		scores : [13, 15, 12, 8, 13, 10], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 5,
			"stealth" : 4,
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
				damage : [2, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Flyby",
				description : "The owl doesn't provoke opportunity attacks when it flies out of an enemy's reach.",
			}, {
				name : "Keen Hearing and Sight",
				description : "The owl has advantage on Wisdom (Perception) checks that rely on hearing or sight.",
			},
		],
	},
	"giant poisonous snake" : {
		name : "Giant Poisonous Snake",
		source : ["M", 327],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 14,
		hp : 11,
		hd : [2, 8], //[#, die]
		speed : "30 ft, swim 30 ft",
		scores : [10, 18, 13, 2, 10, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 2,
		},
		senses : "Blindsight 10 ft",
		passivePerception : 12,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "Target also takes 3d6 poison damage, half on a DC 11 Constitution saving throw",
			},
		],
	},
	"giant rat" : {
		name : "Giant Rat",
		source : ["M", 327],
		size : 4, //Small
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 7,
		hd : [2, 6], //[#, die]
		speed : "30 ft",
		scores : [7, 15, 11, 2, 10, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Darkvision 60 ft; Adv. on Wis (Perception) checks using smell",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Keen Smell",
				description : "The rat has advantage on Wisdom (Perception) checks that rely on smell.",
			}, {
				name : "Pack Tactics",
				description : "The rat has advantage on an attack roll against a creature if at least one of the rat's allies is within 5 ft of the creature and the ally isn't incapacitated.",
			},
		],
	},
	"giant rat (diseased)" : {
		name : "Giant Rat (Diseased)",
		source : ["M", 327],
		size : 4, //Small
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 7,
		hd : [2, 6], //[#, die]
		speed : "30 ft",
		scores : [7, 15, 11, 2, 10, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target must succeed on a DC 10 Constitution saving throw or contract a disease",
			},
		],
		traits : [{
				name : "Disease",
				description : "A target that contracted the disease by the bite attack of the diseased giant rat has it until the disease is cured. It can't regain HP except by magical means, and the it's HP maximum decreases by 3 (1d6) every 24 hours. If the target's HP maximum drops to 0 as a result of this disease, the target dies.",
			},
		],
	},
	"giant scorpion" : {
		name : "Giant Scorpion",
		source : ["M", 327],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 15,
		hp : 52,
		hd : [7, 10], //[#, die]
		speed : "40 ft",
		scores : [15, 13, 15, 1, 9, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Blindsight 60 ft",
		passivePerception : 9,
		languages : "",
		challengeRating : "3",
		proficiencyBonus : 2,
		attacksAction : 3,
		attacks : [{
				name : "Claw",
				ability : 1,
				damage : [1, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target is grappled (escape DC 12); Can't use a claw again until grapple ends",
			}, {
				name : "Sting",
				ability : 1,
				damage : [1, 10, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target also takes 4d10 poison damage, half on a DC 12 Constitution saving throw",
			},
		],
		traits : [{
				name : "Multiattack",
				description : "The scorpion makes three attacks: two with its claws and one with its sting.",
			},
		],
	},
	"giant sea horse" : {
		name : "Giant Sea Horse",
		source : ["M", 328],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 16,
		hd : [3, 10], //[#, die]
		speed : "0 ft, swim 40 ft",
		scores : [12, 15, 11, 2, 12, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 11,
		languages : "",
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Ram",
				ability : 1,
				damage : [1, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Charge trait",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the sea horse moves at least 20 ft straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) bludgeoning damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone.",
			}, {
				name : "Water Breathing",
				description : "The sea horse can breathe only underwater.",
			},
		],
	},
	"giant shark" : {
		name : "Giant Shark",
		source : ["M", 328],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 126,
		hd : [11, 12], //[#, die]
		speed : "swim 50 ft",
		scores : [23, 11, 21, 1, 10, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "Blindsight 60 ft",
		passivePerception : 13,
		languages : "",
		challengeRating : "5",
		proficiencyBonus : 3,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [3, 10, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Blood Frenzy",
				description : "The shark has advantage on melee attack rolls against any creature that doesn't have all its HP.",
			}, {
				name : "Water Breathing",
				description : "The shark can breathe only underwater.",
			},
		],
	},
	"giant spider" : {
		name : "Giant Spider",
		source : ["M", 328],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 14,
		hp : 26,
		hd : [4, 10], //[#, die]
		speed : "30 ft, climb 30 ft",
		scores : [14, 16, 12, 2, 11, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"stealth" : 7
		},
		senses : "Blindsight 10 ft; Darkvision 60 ft",
		passivePerception : 10,
		languages : "",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target also takes 2d8 poison damage, half on a DC 11 Constitution saving throw"
			}, {
				name : "Web (Recharge 5-6)",
				ability : 2,
				damage : ["Restrained", "", ""], //[#, die, type] "" for die is allowed
				range : "30/60 ft",
				description : "Target can escape as an action with a DC 12 Strength check, or by destroying the webbing (AC 10; 5 HP)",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
				tooltip : "On a hit, the target is restrained by webbing. As an action, the restrained target can make a DC 12 Strength check, bursting the webbing on a success. The webbing can also be attacked and destroyed (AC 10; hp 5; vulnerability to fire damage; immunity to bludgeoning, poison, and psychic damage)."
			}
		],
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
			}
		],
		actions : [{
				name : "Web (Recharge 5-6)",
				description : "See attack. On a hit, the target is restrained by webbing. As an action, the restrained target can make a DC 12 Strength check, bursting the webbing on a success. The webbing can also be attacked and destroyed (AC 10; hp 5; vulnerability to fire damage; immunity to bludgeoning, poison, and psychic damage)."
			}
		],
		wildshapeString : "Blindsight 10 ft; Darkvision 60 ft| If the bite's poison damage reduces the target to 0 HP, the target is stable but poisoned and paralyzed for 1 hour, even after regaining HP| Spider Climb: climb difficult surfaces, including upside down, without an ability check| Web Sense: knows the exact location of any other creature in contact with the same web| Web Walker: ignores movement restrictions from webbing"
	},
	"giant toad" : {
		name : "Giant Toad",
		source : ["M", 329],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 11,
		hp : 39,
		hd : [6, 10], //[#, die]
		speed : "20 ft, swim 40 ft",
		scores : [15, 13, 13, 2, 10, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Darkvision 30 ft",
		passivePerception : 10,
		languages : "",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 10, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "+1d10 poison damage; target is grappled and restrained (escape DC 13); Can't use bite again until grapple ends",
			},
		],
		traits : [{
				name : "Amphibious",
				description : "The toad can breathe air and water",
			}, {
				name : "Standing Leap",
				description : "The toad's long jump is up to 20 ft and its high jump is up to 10 ft, with or without a running start.",
			}, {
				name : "Swallow",
				description : "The toad makes one bite attack against a Medium or smaller target it is grappling. If the attack hits, the target is swallowed, and the grapple ends. The swallowed target is blinded and restrained, it has total cover against attacks and other effects outside the toad, and it takes 10 (3d6) acid damage at the start of each of the toad's turns. The toad can have only one target swallowed at a time.\nIf the toad dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 5 feet of movement, exiting prone.",
			}
		],
		wildshapeString : "Darkvision 30 ft| Amphibious: can breathe air and water| Standing Leap: can long jump up to 20 ft and high jump up to 10 ft, with or without a running start| Swallow: if a bite attack hits a Medium or smaller target that it is grappling, it is swallowed, ending the grapple. Swallowed: blinded, restrained, total cover, takes 3d6 acid damage at the start of each of the toad's turns; can have only 1 swallowed at a time.",
	},
	"giant vulture" : {
		name : "Giant Vulture",
		source : ["M", 329],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Neutral Evil",
		ac : 10,
		hp : 22,
		hd : [3, 10], //[#, die]
		speed : "10 ft, fly 60 ft",
		scores : [15, 10, 15, 6, 12, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
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
				damage : [2, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One beak and one talons attack as an Attack action",
				modifiers : [-1, "", ""], //[to hit, to damage, add ability to damage] "" means ignore
			}, {
				name : "Talons",
				ability : 1,
				damage : [2, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One talons and one beak attack as an Attack action",
				modifiers : [-1, "", ""], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Keen Sight and Smell",
				description : "The vulture has advantage on Wisdom (Perception) checks that rely on sight or smell.",
			}, {
				name : "Pack Tactics",
				description : "The vulture has advantage on an attack roll against a creature if at least one of the vulture's allies is within 5 ft of the creature and the ally isn't incapacitated.",
			},
		],
	},
	"giant wasp" : {
		name : "Giant Wasp",
		source : ["M", 329],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 13,
		hd : [3, 8], //[#, die]
		speed : "10 ft, fly 50 ft, swim 50 ft",
		scores : [10, 14, 10, 1, 10, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Sting",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target also takes 3d6 poison damage, half on a DC 11 Constitution saving throw",
			},
		],
		traits : [{
				name : "Sting",
				description : "If the poison damage from the giant wasp's sting attack reduces the target to 0 HP, the target is stable but poisoned for 1 hour, even after regaining HP, and is paralyzed while poisoned in this way.",
			},
		],
	},
	"giant weasel" : {
		name : "Giant Weasel",
		source : ["M", 329],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		companion : "companion",
		alignment : "Unaligned",
		ac : 13,
		hp : 9,
		hd : [2, 8], //[#, die]
		speed : "40 ft",
		scores : [11, 16, 10, 4, 12, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 5,
		},
		senses : "Darkvision 60 ft; Adv. on Wis (Perception) checks using hearing/smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Keen Hearing and Smell",
				description : "The weasel has advantage on Wisdom (Perception) checks that rely on hearing or smell.",
			},
		],
	},
	"giant wolf spider" : {
		name : "Giant Wolf Spider",
		source : ["M", 330],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 11,
		hd : [2, 8], //[#, die]
		speed : "40 ft, climb 40 ft",
		scores : [12, 16, 13, 3, 12, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 7,
		},
		senses : "Blindsight 10 ft; Darkvision 60 ft",
		passivePerception : 13,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target also takes 2d6 poison damage, half on a DC 11 Constitution saving throw",
			},
		],
		traits : [{
				name : "Bite",
				description : "If the poison damage from the spider's bite attack reduces the target to 0 HP, the target is stable but poisoned for 1 hour, even after regaining HP, and is paralyzed while poisoned in this way.",
			}, {
				name : "Spider Climb",
				description : "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.",
			}, {
				name : "Web Sense",
				description : "While in contact with a web, the spider knows the exact location of any other creature in contact with the same web.",
			}, {
				name : "Web Walker",
				description : "The spider ignores movement restrictions caused by webbing.",
			},
		],
		wildshapeString : "Blindsight 10 ft; Darkvision 60 ft| If the bite's poison damage reduces the target to 0 HP, the target is stable but poisoned and paralyzed for 1 hour, even after regaining HP| Spider Climb: climb difficult surfaces, including upside down, without an ability check| Web Sense: knows the exact location of any other creature in contact with the same web| Web Walker: ignores movement restrictions from webbing",
	},
	"goat" : {
		name : "Goat",
		source : ["M", 330],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 10,
		hp : 4,
		hd : [1, 8], //[#, die]
		speed : "40 ft",
		scores : [12, 10, 11, 2, 10, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Ram",
				ability : 1,
				damage : [1, 4, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Charge trait",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the goat hits with a ram attack after moving at least 20 ft straight toward a target on the same turn, the target takes an extra 1d4 bludgeoning damage. If the target is a creature, it must succeed on a DC 10 Strength saving throw or be knocked prone.",
			}, {
				name : "Sure-Footed",
				description : "The goat has advantage on Strength and Dexterity saving throws made against effects that would knock it prone.",
			},
		],
	},
	"griffon" : {
		name : "Griffon",
		source : ["M", 174],
		size : 2, //Large
		type : "Monstrosity",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 59,
		hd : [7, 10], //[#, die]
		speed : "30 ft, fly 80 ft",
		scores : [18, 15, 16, 2, 13, 8], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 5,
		},
		senses : "Darkvision 60 ft; Adv. on Wis (Perception) checks using sight",
		passivePerception : 15,
		languages : "",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
				name : "Beak",
				ability : 1,
				damage : [1, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One beak and one claws attack as an Attack action",
			}, {
				name : "Claws",
				ability : 1,
				damage : [2, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One claws and one beak attack as an Attack action",
			},
		],
		traits : [{
				name : "Keen Sight",
				description : "The griffon has advantage on Wisdom (Perception) checks that rely on sight.",
			},
		],
	},
	"hawk" : {
		name : "Hawk",
		source : ["M", 330],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 13,
		hp : 1,
		hd : [1, 4], //[#, die]
		speed : "10 ft, fly 60 ft",
		scores : [5, 16, 8, 2, 14, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 4,
		},
		senses : "Adv. on Wis (Perception) checks using sight",
		passivePerception : 14,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Talons",
				ability : 2,
				damage : [1, "", "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Keen Sight",
				description : "The hawk has advantage on Wisdom (Perception) checks that rely on sight.",
			},
		],
	},
	"hippogriff" : {
		name : "Hippogriff",
		source : ["M", 184],
		size : 2, //Large
		type : "Monstrosity",
		subtype : "",
		alignment : "Unaligned",
		ac : 11,
		hp : 19,
		hd : [3, 10], //[#, die]
		speed : "40 ft, fly 60 ft",
		scores : [17, 13, 13, 2, 12, 8], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 5,
		},
		senses : "Adv. on Wis (Perception) checks using sight",
		passivePerception : 15,
		languages : "",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
				name : "Beak",
				ability : 1,
				damage : [1, 10, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One beak and one claws attack as an Attack action",
			}, {
				name : "Claws",
				ability : 1,
				damage : [2, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One claws and one beak attack as an Attack action",
			},
		],
		traits : [{
				name : "Keen Sight",
				description : "The hippogriff has advantage on Wisdom (Perception) checks that rely on sight.",
			},
		],
	},
	"hunter shark" : {
		name : "Hunter Shark",
		source : ["M", 330],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 45,
		hd : [6, 10], //[#, die]
		speed : "swim 40 ft",
		scores : [18, 13, 15, 1, 10, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 2,
		},
		senses : "Darkvision 30 ft",
		passivePerception : 12,
		languages : "",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [2, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Blood Frenzy",
				description : "The shark has advantage on melee attack rolls against any creature that doesn't have all its HP.",
			}, {
				name : "Water Breathing",
				description : "The shark can breathe only underwater.",
			},
		],
	},
	"hyena" : {
		name : "Hyena",
		source : ["M", 331],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 11,
		hp : 5,
		hd : [1, 8], //[#, die]
		speed : "50 ft",
		scores : [11, 13, 12, 2, 12, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "",
		passivePerception : 13,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Pack Tactics",
				description : "The hyena has advantage on an attack roll against a creature if at least one of the hyena's allies is within 5 ft of the creature and the ally isn't incapacitated.",
			},
		],
	},
	"imp" : {
		name : "Imp",
		source : ["M", 76],
		size : 5, //Tiny
		type : "Fiend",
		subtype : "devil",
		companion : "pact_of_the_chain",
		alignment : "Lawful Evil",
		ac : 13,
		hp : 10,
		hd : [3, 4], //[#, die]
		speed : "20 ft, fly 40 ft",
		scores : [6, 17, 13, 11, 12, 14], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"deception" : 4,
			"insight" : 3,
			"persuasion" : 4,
			"stealth" : 5,
		},
		damage_resistances : "cold; bludgeoning, piercing, and slashing from nonmagical/nonsilver weapons",
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
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target also takes 3d6 poison damage, half on a DC 11 Constitution saving throw",
			},
		],
		traits : [{
				name : "Shapechanger",
				description : "The imp can use its action to polymorph into a beast form that resembles a rat (speed 20 ft), a raven (20 ft, fly 60 ft), or a spider (20 ft, climb 20 ft), or back into its true form. Its statistics are the same in each form, except for the speed changes noted. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies.",
			}, {
				name : "Magic Resistance",
				description : "The imp has advantage on saving throws against spells and other magical effects.",
			},
		],
		variant : [{
				name : "Variant: Familiar",
				description : "The imp can serve another creature as a familiar, forming a telepathic bond with its willing master. While the two are bonded, the master can sense what the imp senses as long as they are within 1 mile of each other. While the imp is within 10 feet of its master, the master shares the imp's Magic Resistance trait. At any time and for any reason, the imp can end its service as a familiar, ending the telepathic bond.",
			},
		],
		actions : [{
				name : "Invisibility",
				description : "As an action, the imp magically turns invisible until it attacks, or until its concentration ends (as if concentrating on a spell). Any equipment the imp wears or carries is invisible with it.",
			},
		],
	},
	"jackal" : {
		name : "Jackal",
		source : ["M", 331],
		size : 4, //Small
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 3,
		hd : [1, 6], //[#, die]
		speed : "40 ft",
		scores : [8, 15, 11, 3, 12, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "Adv. on Wis (Perception) checks using hearing/smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Keen Hearing and Smell",
				description : "The jackal has advantage on Wisdom (Perception) checks that rely on hearing or smell.",
			}, {
				name : "Pack Tactics",
				description : "The jackal has advantage on an attack roll against a creature if at least one of the jackal's allies is within 5 ft of the creature and the ally isn't incapacitated.",
			},
		],
	},
	"killer whale" : {
		name : "Killer Whale",
		source : ["M", 331],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 90,
		hd : [12, 12], //[#, die]
		speed : "swim 60 ft",
		scores : [19, 10, 13, 3, 12, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "Blindsight 120 ft; Adv. on Wis (Perception) checks using hearing",
		passivePerception : 13,
		languages : "",
		challengeRating : "3",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [5, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Echolocation",
				description : "The whale can't use its Blindsight while deafened.",
			}, {
				name : "Hold Breath",
				description : "The whale can hold its breath for 30 minutes.",
			}, {
				name : "Keen Hearing",
				description : "The whale has advantage on Wisdom (Perception) checks that rely on hearing.",
			},
		],
	},
	"lion" : {
		name : "Lion",
		source : ["M", 331],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 26,
		hd : [4, 10], //[#, die]
		speed : "50 ft",
		scores : [17, 15, 13, 3, 12, 8], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 6,
		},
		senses : "Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Claw",
				ability : 1,
				damage : [1, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Pounce trait",
			}, {
				name : "Bite",
				ability : 1,
				damage : [1, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Can be used in combination with claw while pouncing (see Pounce trait)",
			},
		],
		traits : [{
				name : "Keen Smell",
				description : "The lion has advantage on Wisdom (Perception) checks that rely on smell.",
			}, {
				name : "Pack Tactics",
				description : "The lion has advantage on an attack roll against a creature if at least one of the lion's allies is within 5 ft of the creature and the ally isn't incapacitated.",
			}, {
				name : "Pounce",
				description : "If the lion moves at least 20 ft straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the lion can make one bite attack against it as a bonus action.",
			}, {
				name : "Running Leap",
				description : "With a 10-foot running start, the lion can long jump up to 25 ft.",
			},
		],
		wildshapeString : "Keen Smell: advantage on Wis (Perception) checks that rely on smell| Pack Tactics: advantage on attack rolls if at least one capable ally is within 5 ft of the target| Pounce: if target is hit with a claw attack after the lion moved at least 20 ft straight on the same turn, DC 13 Str save or knocked prone and the lion can make one bite attack against it as a bonus action| Running Leap: long jump up to 25 ft with a 10-foot running start",
	},
	"lizard" : {
		name : "Lizard",
		source : ["M", 332],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 10,
		hp : 2,
		hd : [1, 4], //[#, die]
		speed : "20 ft, climb 20 ft",
		scores : [2, 11, 10, 1, 8, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Darkvision 30 ft",
		passivePerception : 9,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, "", "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : [-2, "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
	},
	"nightmare" : {
		name : "Nightmare",
		source : ["M", 235],
		size : 2, //Large
		type : "Fiend",
		subtype : "",
		alignment : "Neutral Evil",
		ac : 13,
		hp : 68,
		hd : [8, 10], //[#, die]
		speed : "60 ft, fly 90 ft",
		scores : [18, 15, 16, 10, 13, 15], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
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
				damage : [2, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target also takes 2d6 fire damage upon a hit",
			},
		],
		traits : [{
				name : "Confer Fire Resistance",
				description : "The nightmare can grant resistance to fire damage to anyone riding it.",
			}, {
				name : "Illumination",
				description : "The nightmare sheds bright light in a 10-foot radius and dim light for an additional 10 feet.",
			},
		],
		actions : [{
				name : "Ethereal Stride",
				description : "As an action, the nightmare and up to three willing creatures within 5 feet of it magically enter the Ethereal Plane from the Material Plane, or vice versa.",
			},
		],
	},
	"mammoth" : {
		name : "Mammoth",
		source : ["M", 332],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 126,
		hd : [11, 12], //[#, die]
		speed : "40 ft",
		scores : [24, 9, 21, 3, 11, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "6",
		proficiencyBonus : 3,
		attacksAction : 1,
		attacks : [{
				name : "Gore",
				ability : 1,
				damage : [4, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "If used after moving 20 ft straight in the same round, see Trampling Charge trait",
			}, {
				name : "Stomp",
				ability : 1,
				damage : [4, 10, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Can only be used on prone creatures (also see Trampling Charge trait)",
			},
		],
		traits : [{
				name : "Trampling Charge",
				description : "If the mammoth moves at least 20 ft straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 18 Strength saving throw or be knocked prone. If the target is prone, the mammoth can make one stomp attack against it as a bonus action.",
			},
		],
	},
	"mastiff" : {
		name : "Mastiff",
		source : ["M", 332],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		companion : "mount",
		alignment : "Unaligned",
		ac : 12,
		hp : 5,
		hd : [1, 8], //[#, die]
		speed : "40 ft",
		scores : [13, 14, 12, 3, 12, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "Adv. on Wis (Perception) checks using hearing/smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target must succeed on a DC 11 Strength saving throw or be knocked prone",
			},
		],
		traits : [{
				name : "Keen Hearing and Smell",
				description : "The mastiff has advantage on Wisdom (Perception) checks that rely on hearing or smell.",
			},
		],
	},
	"mule" : {
		name : "Mule",
		source : ["M", 333],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		companion : "companion",
		alignment : "Unaligned",
		ac : 10,
		hp : 11,
		hd : [2, 8], //[#, die]
		speed : "40 ft",
		scores : [14, 10, 13, 2, 10, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Hooves",
				ability : 1,
				damage : [1, 4, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Beast of Burden",
				description : "The mule is considered to be a Large animal for the purpose of determining its carrying capacity.",
			}, {
				name : "Sure-Footed",
				description : "The mule has advantage on Strength and Dexterity saving throws made against effects that would knock it prone.",
			},
		],
	},
	"mummy" : {
		name : "Mummy",
		source : ["M", 228],
		size : 3, //Medium
		type : "Undead",
		subtype : "",
		alignment : "Lawful Evil",
		ac : 11,
		hp : 58,
		hd : [9, 8], //[#, die]
		speed : "20 ft",
		scores : [16, 8, 15, 6, 10, 12], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", 2, ""], //[Str, Dex, Con, Int, Wis, Cha]
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
				damage : [2, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "+3d6 necrotic damage; DC 12 Constitution save or cursed with Mummy Rot",
				tooltip : "Multiattack\nAs part of one Attack action, the mummy can use its Dreadful Glare and makes one attack with its rotting fist.\n\nRotting Fist\nIf the target is a creature, it must succeed on a DC 12 Constitution saving throw or be cursed with mummy rot. The cursed target can't regain hit points, and its hit point maximum decreases by 10 (3d6) for every 24 hours that elapse. If the curse reduces the target's hit point maximum to 0, the target dies, and its body turns to dust. The curse lasts until removed by the remove curse spell or other magic.",
			}, {
				name : "Dreadful Glare",
				ability : 6,
				damage : ["Frightened", "", ""], //[#, die, type] "" for die is allowed
				range : "60 ft",
				description : "Wis save or frightened for 1 round; If failed by 5 or more, paralyzed as well",
				tooltip : "Multiattack\nAs part of one Attack action, the mummy can use its Dreadful Glare and makes one attack with its rotting fist.\n\nDreadful Glare\nThe mummy targets one creature it can see within 60 ft of it. If the target can see the mummy, it must succeed on a DC 11 Wisdom saving throw against this magic or become frightened until the end of the mummy's next turn. If the target fails the saving throw by 5 or more, it is also paralyzed for the same duration. A target that succeeds on the saving throw is immune to the Dreadful Glare of all mummies (but not mummy lords) for the next 24 hours.",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
				dc : true,
			},
		],
		traits : [{
				name : "Multiattack",
				description : "With one Attack action, do both Dreadful Glare and a Rotting Fist attack.",
			}, {
				name : "Mummy Rot",
				description : "A cursed creature can't regain hit points, and its hit point maximum decreases by 3d6 for every 24 hours that elapse. If the curse reduces the target's hit point maximum to 0, the target dies, and its body turns to dust. The curse lasts until removed by the remove curse spell or other magic.",
			}, {
				name : "Dreadful Glare",
				description : "If the target can see the mummy, it must succeed on a DC 11 Wisdom saving throw against this magic or become frightened until the end of the mummy's next turn. If the target fails the saving throw by 5 or more, it is also paralyzed for the same duration. A target that succeeds on the saving throw is immune to the Dreadful Glare of all mummies (but not mummy lords) for the next 24 hours.",
			},
		],
	},
	"octopus" : {
		name : "Octopus",
		source : ["M", 333],
		size : 4, //Small
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 12,
		hp : 3,
		hd : [1, 6], //[#, die]
		speed : "5 ft, swim 30 ft",
		scores : [4, 15, 11, 3, 10, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 2,
			"stealth" : 4,
		},
		senses : "Darkvision 30 ft",
		passivePerception : 12,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Tentacles",
				ability : 2,
				damage : [1, "", "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target is grappled (escape DC 10); Can't use tentacles again until grapple ends",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Hold Breath",
				description : "While out of water, the octopus can hold its breath for 30 minutes.",
			}, {
				name : "Underwater Camouflage",
				description : "The octopus has advantage on Dexterity (Stealth) checks made while underwater.",
			}, {
				name : "Water Breathing",
				description : "The octopus can breathe only underwater.",
			},
		],
		wildshapeString : "Darkvision 30 ft| Water Breathing: can breathe only underwater| Hold Breath: can hold its breath for 30 minutes out of water| Underwater Camouflage: advantage on Dex (Stealth) checks while underwater| Ink Cloud (Recharges after a Short or Long Rest): if underwater, 5-ft radius cloud of ink around octopus, heavily obscures for 1 minute, can be dispersed. After releasing, can use the Dash action as a bonus action",
	},
	"owl" : {
		name : "Owl",
		source : ["M", 333],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 11,
		hp : 1,
		hd : [1, 4], //[#, die]
		speed : "5 ft, fly 60 ft",
		scores : [3, 13, 8, 2, 12, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 3,
		},
		senses : "Darkvision 120 ft; Adv. on Wis (Perception) checks using hearing/sight",
		passivePerception : 13,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Talons",
				ability : 2,
				damage : [1, "", "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Flyby",
				description : "The owl doesn't provoke opportunity attacks when it flies out of an enemy's reach.",
			}, {
				name : "Keen Hearing and Sight",
				description : "The owl has advantage on Wisdom (Perception) checks that rely on hearing or sight.",
			},
		],
	},
	"panther" : {
		name : "Panther",
		source : ["M", 333],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		companion : "companion",
		alignment : "Unaligned",
		ac : 12,
		hp : 13,
		hd : [3, 8], //[#, die]
		speed : "50 ft, climb 40 ft",
		scores : [14, 15, 10, 3, 14, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 4,
			"stealth" : 6,
		},
		senses : "Adv. on Wis (Perception) checks using smell",
		passivePerception : 14,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Claw",
				ability : 1,
				damage : [1, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Pounce trait",
			}, {
				name : "Bite",
				ability : 1,
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Can be used in combination with claw while pouncing (see Pounce trait)",
			},
		],
		traits : [{
				name : "Keen Smell",
				description : "The panther has advantage on Wisdom (Perception) checks that rely on smell.",
			}, {
				name : "Pounce",
				description : "If the panther moves at least 20 ft straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 12 Strength saving throw or be knocked prone. If the target is prone, the panther can make one bite attack against it as a bonus action.",
			},
		],
	},
	"pegasus" : {
		name : "Pegasus",
		source : ["M", 250],
		size : 2, //Large
		type : "Celestial",
		subtype : "",
		alignment : "Chaotic Good",
		ac : 12,
		hp : 59,
		hd : [7, 10], //[#, die]
		speed : "60 ft, fly 90 ft",
		scores : [18, 15, 16, 10, 15, 13], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", 4, "", "", 4, 3], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 6,
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
				damage : [2, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
	},
	"plesiosaurus" : {
		name : "Plesiosaurus",
		source : ["M", 79],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 68,
		hd : [8, 10], //[#, die]
		speed : "20 ft, swim 40 ft",
		scores : [18, 15, 16, 2, 12, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 4,
		},
		senses : "",
		passivePerception : 13,
		languages : "",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [3, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Hold Breath",
				description : "The plesiosaurus can hold its breath for 1 hour.",
			},
		],
	},
	"poisonous snake" : {
		name : "Poisonous Snake",
		source : ["M", 334],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 13,
		hp : 2,
		hd : [1, 4], //[#, die]
		speed : "30 ft, swim 30 ft",
		scores : [2, 16, 11, 1, 10, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Blindsight 10 ft",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, "", "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target also takes 2d4 poison damage, half on a DC 10 Constitution saving throw",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
	},
	"polar bear" : {
		name : "Polar Bear",
		source : ["M", 334],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 42,
		hd : [5, 10], //[#, die]
		speed : "40 ft, swim 30 ft",
		scores : [20, 10, 16, 2, 13, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One bite and one claw attack as an Attack action",
			}, {
				name : "Claw",
				ability : 1,
				damage : [2, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One claw and one bite attack as an Attack action",
			},
		],
		traits : [{
				name : "Keen Smell",
				description : "The bear has advantage on Wisdom (Perception) checks that rely on smell.",
			},
		],
	},
	"pony" : {
		name : "Pony",
		source : ["M", 335],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		companion : "mount",
		alignment : "Unaligned",
		ac : 10,
		hp : 11,
		hd : [2, 8], //[#, die]
		speed : "40 ft",
		scores : [15, 10, 13, 2, 11, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Hooves",
				ability : 1,
				damage : [2, 4, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
	},
	"pseudodragon" : {
		name : "Pseudodragon",
		source : ["M", 254],
		size : 5, //Tiny
		type : "Dragon",
		subtype : "",
		companion : "pact_of_the_chain",
		alignment : "Neutral Good",
		ac : 13,
		hp : 7,
		hd : [2, 4], //[#, die]
		speed : "15 ft, fly 60 ft",
		scores : [6, 15, 13, 10, 12, 10], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 4,
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
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			}, {
				name : "Sting",
				ability : 2,
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "DC 11 Con save or poisoned 1 hour; fail by 5 or more: unconscious 1 hour, until damaged or awakened",
				tooltip : "The target hit must succeed on a DC 11 Constitution saving throw or become poisoned for 1 hour. If the saving throw fails by 5 or more, the target falls unconscious for the same duration, or until it takes damage or another creature uses an action to shake it awake.",
			},
		],
		traits : [{
				name : "Keen Senses",
				description : "The pseudodragon has advantage on Wisdom (Perception) checks that rely on sight, hearing, or smell.",
			}, {
				name : "Magic Resistance",
				description : "The pseudodragon has advantage on saving throws against spells and other magical effects.",
			}, {
				name : "Limited Telepathy",
				description : "The pseudodragon can magically communicate simple ideas, emotions, and images telepathically with any creature within 100 ft of it that can understand a language.",
			},
		],
		variant : [{
				name : "Variant: Familiar",
				description : "The pseudodragon can serve another creature as a familiar, forming a magic, telepathic bond with that willing companion. While the two are bonded, the companion can sense what the pseudodragon senses as long as they are within 1 mile of each other. While the pseudodragon is within 10 feet of its companion, the companion shares the pseudodragon's Magic Resistance trait. At any time and for any reason, the pseudodragon can end its service as a familiar, ending the telepathic bond.",
			},
		],
	},
	"pteranodon" : {
		name : "Pteranodon",
		source : ["M", 79],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 13,
		hd : [3, 8], //[#, die]
		speed : "10 ft, fly 60 ft",
		scores : [12, 15, 10, 2, 9, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 1,
		},
		senses : "",
		passivePerception : 11,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Flyby",
				description : "The pteranodon doesn't provoke opportunity attacks when it flies out of an enemy's reach.",
			},
		],
	},
	"quasit" : {
		name : "Quasit",
		source : ["M", 63],
		size : 5, //Tiny
		type : "Fiend",
		subtype : "demon",
		companion : "pact_of_the_chain",
		alignment : "Chaotic Evil",
		ac : 13,
		hp : 7,
		hd : [3, 4], //[#, die]
		speed : "40 ft",
		scores : [5, 17, 10, 7, 10, 10], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"stealth" : 5,
		},
		damage_resistances : "cold; fire; lightning; bludgeoning, piercing, and slashing from nonmagical weapons",
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
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target makes DC 10 Con save or takes 2d4 poison damage and poisoned for 1 min (can save each turn)",
				modifiers : [-1, "", ""], //[to hit, to damage, add ability to damage] "" means ignore
			}, {
				name : "Scare (1/day)",
				ability : 6,
				damage : ["Frightened", "", ""], //[#, die, type] "" for die is allowed
				range : "20 ft",
				description : "Wis save or frightened for 1 min (can save at end of each turn, disadv. if quasit is in sight)",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
				dc : true,
			},
		],
		traits : [{
				name : "Shapechanger",
				description : "The quasit can use its action to polymorph into a beast form that resembles a bat (speed 10 ft, fly 40 ft), a centipede (40 ft, climb 40 ft), or a toad (40 ft, swim 40 ft), or back into its true form . Its statistics are the same in each form, except for the speed changes noted. Any equipment it is wearing or carrying isn't transformed . It reverts to its true form if it dies.",
			}, {
				name : "Magic Resistance",
				description : "The quasit has advantage on saving throws against spells and other magical effects.",
			},
		],
		variant : [{
				name : "Variant: Familiar",
				description : "The quasit can serve another creature as a familiar, forming a telepathic bond with its willing master. While the two are bonded, the master can sense what the quasit senses as long as they are within 1 mile of each other. While the quasit is within 10 feet of its master, the master shares the quasit's Magic Resistance trait. At any time and for any reason, the quasit can end its service as a familiar, ending the telepathic bond.",
			},
		],
		actions : [{
				name : "Invisibility",
				description : "As an action, the quasit magically turns invisible until it attacks, or until its concentration ends (as if concentrating on a spell). Any equipment the quasit wears or carries is invisible with it.",
			},
		],
	},
	"quipper" : {
		name : "Quipper",
		source : ["M", 335],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 13,
		hp : 1,
		hd : [1, 4], //[#, die]
		speed : "swim 40 ft",
		scores : [2, 16, 9, 1, 7, 2], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Darkvision 60 ft",
		passivePerception : 8,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, "", "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Blood Frenzy",
				description : "The quipper has advantage on melee attack rolls against any creature that doesn't have all its HP.",
			}, {
				name : "Water Breathing",
				description : "The quipper can breathe only underwater.",
			},
		],
	},
	"rat" : {
		name : "Rat",
		source : ["M", 335],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 10,
		hp : 1,
		hd : [1, 4], //[#, die]
		speed : "20 ft",
		scores : [2, 11, 9, 2, 10, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Darkvision 30 ft; Adv. on Wis (Perception) checks using smell",
		passivePerception : 10,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, "", "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : [-2, "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Keen Smell",
				description : "The rat has advantage on Wisdom (Perception) checks that rely on smell.",
			},
		],
	},
	"raven" : {
		name : "Raven",
		source : ["M", 335],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 12,
		hp : 1,
		hd : [1, 4], //[#, die]
		speed : "10 ft, fly 50 ft",
		scores : [2, 14, 8, 2, 12, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "",
		passivePerception : 13,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Beak",
				ability : 2,
				damage : [1, "", "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Mimicry",
				description : "The raven can mimic simple sounds it has heard, such as a person whispering, a baby crying, or an animal chittering. A creature that hears the sounds can tell they are imitations with a successful DC 10 Wisdom (Insight) check.",
			},
		],
	},
	"reef shark" : {
		name : "Reef Shark",
		source : ["M", 336],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 22,
		hd : [4, 8], //[#, die]
		speed : "swim 40 ft",
		scores : [14, 13, 13, 1, 10, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 2,
		},
		senses : "Blindsight 30 ft",
		passivePerception : 12,
		languages : "",
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Pack Tactics",
				description : "The shark has advantage on an attack roll against a creature if at least one of the shark's allies is within 5 ft of the creature and the ally isn't incapacitated.",
			}, {
				name : "Water Breathing",
				description : "The shark can breathe only underwater.",
			},
		],
	},
	"rhinoceros" : {
		name : "Rhinoceros",
		source : ["M", 336],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 11,
		hp : 45,
		hd : [6, 10], //[#, die]
		speed : "40 ft",
		scores : [21, 8, 15, 2, 12, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 11,
		languages : "",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Gore",
				ability : 1,
				damage : [2, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Charge trait",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the rhinoceros moves at least 20 ft straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) bludgeoning damage. If the target is a creature, it must succeed on a DC 15 Strength saving throw or be knocked prone.",
			},
		],
	},
	"riding horse" : {
		name : "Riding Horse",
		source : ["M", 336],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 10,
		hp : 13,
		hd : [2, 10], //[#, die]
		speed : "60 ft",
		scores : [16, 10, 12, 2, 11, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Hooves",
				ability : 1,
				damage : [2, 4, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
	},
	"saber-toothed tiger" : {
		name : "Saber-Toothed Tiger",
		source : ["M", 336],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 52,
		hd : [7, 10], //[#, die]
		speed : "40 ft",
		scores : [18, 14, 15, 3, 12, 8], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 6,
		},
		senses : "Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Claw",
				ability : 1,
				damage : [2, 6, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Pounce trait",
				modifiers : ["", 1, ""], //[to hit, to damage, add ability to damage] "" means ignore
			}, {
				name : "Bite",
				ability : 1,
				damage : [1, 10, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Can be used in combination with claw while pouncing (see Pounce trait)",
				modifiers : ["", 1, ""], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Keen Smell",
				description : "The tiger has advantage on Wisdom (Perception) checks that rely on smell.",
			}, {
				name : "Pounce",
				description : "If the tiger moves at least 20 ft straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the tiger can make one bite attack against it as a bonus action.",
			},
		],
	},
	"scorpion" : {
		name : "Scorpion",
		source : ["M", 337],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 11,
		hp : 1,
		hd : [1, 4], //[#, die]
		speed : "10 ft",
		scores : [2, 11, 8, 1, 8, 2], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Blindsight 10 ft",
		passivePerception : 9,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Sting",
				ability : 2,
				damage : [1, "", "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target also takes 1d8 poison damage, half on a DC 9 Constitution saving throw",
			},
		],
	},
	"sea horse" : {
		name : "Sea Horse",
		source : ["M", 337],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 11,
		hp : 1,
		hd : [1, 4], //[#, die]
		speed : "swim 20 ft",
		scores : [1, 12, 8, 1, 10, 2], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [],
		traits : [{
				name : "Water Breathing",
				description : "The sea horse can breathe only underwater.",
			},
		]
	},
	"shield guardian" : {
		name : "Shield Guardian",
		source : ["M", 271],
		size : 2, //Large
		type : "Construct",
		subtype : "",
		alignment : "Unaligned",
		ac : 17,
		hp : 142,
		hd : [15, 10], //[#, die]
		speed : "30 ft",
		scores : [18, 8, 18, 7, 10, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
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
				damage : [2, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Two fist attacks as an Attack action",
			},
		],
		traits : [{
				name : "Bound",
				description : "The shield guardian is magically bound to an amulet. As long as the guardian and its amulet are on the same plane of existence, the amulet's wearer can telepathically call the guardian to travel to it, and the guardian knows the distance and direction to the amulet. If the guardian is within 60 feet of the amulet's wearer, half of any damage the wearer takes (rounded up) is transferred to the guardian.",
			}, {
				name : "Regeneration",
				description : "The guardian regains 10 HP at the start of its turn if it has at least 1 HP.",
			}, {
				name : "Spell Storing",
				description : "A spellcaster who wears the shield guardian's amulet can cause the guardian to store one spell of 4th level or lower. To do so, the wearer must cast the spell on the guardian. The spell has no effect but is stored within the guardian. When commanded to do so by the wearer or when a situation arises that was predefined by the spellcaster, the guardian casts the stored spell with any parameters set by the original caster, requiring no components. When the spell is cast or a new spell is stored, any previously stored spell is lost.",
			},
		],
		actions : [{
				name : "Shield",
				description : "As a reaction, when a creature makes an attack against the wearer of the guardian's amulet, the guardian grants a +2 bonus to the wearer's AC if the guardian is within 5 feet of the wearer.",
			},
		],
	},
	"skeleton (humanoid)" : {
		name : "Skeleton (humanoid)",
		source : ["M", 272],
		size : 3, //Medium
		type : "Undead",
		subtype : "",
		alignment : "lawful evil",
		ac : 13,
		hp : 13,
		hd : [2, 8], //[#, die]
		speed : "30 ft",
		scores : [10, 14, 15, 6, 8, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
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
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Finesse, light",
			}, {
				name : "Shortbow",
				ability : 2,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "80/320 ft",
				description : "Ammunition, two-handed",
			},
		],
	},
	"spider" : {
		name : "Spider",
		source : ["M", 337],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 12,
		hp : 1,
		hd : [1, 4], //[#, die]
		speed : "20 ft, climb 20 ft",
		scores : [2, 14, 8, 1, 10, 2], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"stealth" : 4,
		},
		senses : "Darkvision 30 ft",
		passivePerception : 10,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, "", "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target also takes 1d4 poison damage, half on a DC 9 Constitution saving throw",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Spider Climb",
				description : "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.",
			}, {
				name : "Web Sense",
				description : "While in contact with a web, the spider knows the exact location of any other creature in contact with the same web.",
			}, {
				name : "Web Walker",
				description : "The spider ignores movement restrictions caused by webbing.",
			},
		],
		wildshapeString : "Blindsight 10 ft; Darkvision 60 ft| If the bite's poison damage reduces the target to 0 HP, the target is stable but poisoned and paralyzed for 1 hour, even after regaining HP| Spider Climb: climb difficult surfaces, including upside down, without an ability check| Web Sense: knows the exact location of any other creature in contact with the same web| Web Walker: ignores movement restrictions from webbing",
	},
	"sprite" : {
		name : "Sprite",
		source : ["M", 283],
		size : 5, //Tiny
		type : "Fey",
		subtype : "",
		companion : "pact_of_the_chain",
		alignment : "Neutral Good",
		ac : 15,
		hp : 2,
		hd : [1, 4], //[#, die]
		speed : "10 ft, fly 40 ft",
		scores : [3, 18, 10, 14, 13, 11], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 8,
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
				damage : [1, "", "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : ["Str", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			}, {
				name : "Shortbow",
				ability : 2,
				damage : [1, "", "piercing"], //[#, die, type] "" for die is allowed
				range : "40/160 ft",
				description : "",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
				description : "DC 10 Con save or poisoned 1 min; fail by 5 or more: also unconscious 1 min, until damaged or awakened",
				tooltip : "The target hit must succeed on a DC 10 Constitution saving throw or become poisoned for 1 minute. If its saving throw result is 5 or lower, the poisoned target falls unconscious for the same duration, or until it takes damage or another creature takes an action to shake it awake.",
			}, {
				name : "Heart Sight",
				ability : 6,
				damage : ["Reveal", "", ""], //[#, die, type] "" for die is allowed
				range : "Touch (5 ft)",
				description : "Cha save or sprite knows emotional state and alignment (celestial/fiend/undead auto fail the save)",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
				dc : true,
			},
		],
		actions : [{
				name : "Invisibility",
				description : "As an action, the sprite magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell). Any equipment the sprite wears or carries is invisible with it.",
			},
		],
	},
	"stirge" : {
		name : "Stirge",
		source : ["M", 284],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 14,
		hp : 2,
		hd : [1, 4], //[#, die]
		speed : "10 ft, fly 40 ft",
		scores : [4, 16, 11, 2, 8, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Darkvision 60 ft",
		passivePerception : 9,
		languages : "",
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Blood Drain",
				ability : 2,
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "The stirge attaches itself to the target, see Blood Drain trait",
			},
		],
		traits : [{
				name : "Blood Drain",
				description : "While attached, the stirge doesn't attack. Instead, at the start of each of the stirge's turns, the target loses 5 (1d4 + 3) HP due to blood loss. The stirge can detach itself by spending 5 feet of its movement. It does so after it drains 10 HP of blood from the target or the target dies. A creature, including the target, can use its action to detach the stirge.",
			},
		],
	},
	"tiger" : {
		name : "Tiger",
		source : ["M", 339],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 37,
		hd : [5, 10], //[#, die]
		speed : "40 ft",
		scores : [17, 15, 14, 3, 12, 8], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 6,
		},
		senses : "Darkvision 60 ft; Adv. on Wis (Perception) checks using smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Claw",
				ability : 1,
				damage : [1, 8, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Pounce trait",
			}, {
				name : "Bite",
				ability : 1,
				damage : [1, 10, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Can be used in combination with claw while pouncing (see Pounce trait)",
			},
		],
		traits : [{
				name : "Keen Smell",
				description : "The tiger has advantage on Wisdom (Perception) checks that rely on smell.",
			}, {
				name : "Pounce",
				description : "If the tiger moves at least 20 ft straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the tiger can make one bite attack against it as a bonus action.",
			},
		],
	},
	"triceratops" : {
		name : "Triceratops",
		source : ["M", 79],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 95,
		hd : [10, 12], //[#, die]
		speed : "50 ft",
		scores : [22, 9, 17, 2, 11, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "5",
		proficiencyBonus : 3,
		attacksAction : 1,
		attacks : [{
				name : "Gore",
				ability : 1,
				damage : [4, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Trampling Charge trait",
			}, {
				name : "Stomp",
				ability : 1,
				damage : [3, 10, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Can only be used on prone creatures (also see Trampling Charge trait)",
			},
		],
		traits : [{
				name : "Trampling Charge",
				description : "If the triceratops moves at least 20 ft straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the triceratops can make one stomp attack against it as a bonus action.",
			},
		],
	},
	"tyrannosaurus rex" : {
		name : "Tyrannosaurus Rex",
		source : ["M", 79],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 136,
		hd : [13, 12], //[#, die]
		speed : "50 ft",
		scores : [25, 10, 19, 2, 12, 9], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 4,
		},
		senses : "",
		passivePerception : 14,
		languages : "",
		challengeRating : "8",
		proficiencyBonus : 3,
		attacksAction : 2,
		attacks : [{
				name : "Tail",
				ability : 1,
				damage : [3, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "Medium or smaller target is grappled and restrained (escape DC 17); Can't use bite again until grapple ends",
			}, {
				name : "Bite",
				ability : 1,
				damage : [4, 12, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "One bite and one tail attack to a different as an Attack action",
			},
		],
		traits : [{
				name : "Multiattack",
				description : "The tyrannosaurus makes two attacks: one with its bite and one with its tail. It can't make both attacks against the same target.",
			},
		]
	},
	"vulture" : {
		name : "Vulture",
		source : ["M", 339],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 10,
		hp : 5,
		hd : [1, 8], //[#, die]
		speed : "10 ft, fly 50 ft",
		scores : [7, 10, 13, 2, 12, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "Adv. on Wis (Perception) checks using sight/smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Beak",
				ability : 2,
				damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Keen Sight and Smell",
				description : "The vulture has advantage on Wisdom (Perception) checks that rely on sight or smell.",
			}, {
				name : "Pack Tactics",
				description : "The vulture has advantage on an attack roll against a creature if at least one of the vulture's allies is within 5 ft of the creature and the ally isn't incapacitated.",
			},
		],
	},
	"warhorse" : {
		name : "Warhorse",
		source : ["M", 340],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		companion : "mount",
		alignment : "Unaligned",
		ac : 11,
		hp : 19,
		hd : [3, 10], //[#, die]
		speed : "60 ft",
		scores : [18, 12, 13, 2, 12, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 11,
		languages : "",
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Hooves",
				ability : 1,
				damage : [2, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Trampling Charge trait",
			},
		],
		traits : [{
				name : "Trampling Charge",
				description : "If the horse moves at least 20 ft straight toward a creature and then hits it with a hooves attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the horse can make another attack with its hooves against it as a bonus action.",
			},
		],
	},
	"warhorse skeleton" : {
		name : "Warhorse Skeleton",
		source : ["M", 273],
		size : 2, //Large
		type : "Undead",
		subtype : "",
		alignment : "Lawful Evil",
		ac : 13,
		hp : 22,
		hd : [3, 10], //[#, die]
		speed : "60 ft",
		scores : [18, 12, 15, 2, 8, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		damage_vulnerabilities : "bludgeoning",
		damage_immunities : "poison",
		condition_immunities : "exhaustion, poisoned",
		senses : "Darkvision 60 ft",
		passivePerception : 9,
		languages : "",
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Hooves",
				ability : 1,
				damage : [2, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
	},
	"water elemental" : {
		name : "Water Elemental",
		source : ["M", 124],
		size : 2, //Large
		type : "Elemental",
		subtype : "",
		alignment : "Neutral",
		ac : 14,
		hp : 114,
		hd : [12, 10], //[#, die]
		speed : "30 ft, swim 90 ft",
		scores : [18, 14, 18, 5, 10, 8], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
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
				damage : [2, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Two slam attacks as an Attack action",
			}, {
				name : "Whelm (Recharge 4-6)",
				ability : 1,
				dc : true,
				damage : [2, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "All in shared area",
				description : "Str save; fail\u2015 dmg/grappled/restrained/can't breathe until grapple ends (escape DC 14); success\u2015 no dmg/pushed out",
				tooltip : "Each creature in the elemental's space that is Large or smaller, is also grappled (escape DC 14). Until this grapple ends, the target is restrained and unable to breathe unless it can breathe water. If the saving throw is successful, the target is pushed out of the elemental's space.\nThe elemental can grapple one Large creature or up to two Medium or smaller creatures at one time. At the start of each of the elemental's turns, each target grappled by it takes 13 (2d8 + 4) bludgeoning damage. A creature within 5 feet of the elemental can pull a creature or object out of it by taking an action to make a DC 14 Strength and succeeding."
			},
		],
		traits : [{
				name : "Water Form",
				description : "The elemental can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing.",
			}, {
				name : "Freeze",
				description : "If the elemental takes cold damage, it partially freezes; its speed is reduced by 20 ft until the end of its next turn.",
			},
		],
		actions : [{
				name : "Whelm (Recharge 4-6)",
				description : "See attack. Each creature in the elemental's space that is Large or smaller, is also grappled (escape DC 14). Until this grapple ends, the target is restrained and unable to breathe unless it can breathe water. If the saving throw is successful, the target is pushed out of the elemental's space.\nThe elemental can grapple one Large creature or up to two Medium or smaller creatures at one time. At the start of each of the elemental's turns, each target grappled by it takes 13 (2d8 + 4) bludgeoning damage. A creature within 5 feet of the elemental can pull a creature or object out of it by taking an action to make a DC 14 Strength and succeeding.",
			},
		],
		wildshapeString : "Darkvision 60 ft| Knows Aquan| Resistant to: acid, and bludg./piercing/slashing from nonmagical weapons| Immune to: poison, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious|  Water Form: pass through 1\" space without squeezing; move through and stop in another's space| Freeze: if taken cold damage, speed reduced to 20 ft until end of next turn| Whelm: see Monster Manual page 125",
	},
	"weasel" : {
		name : "Weasel",
		source : ["M", 340],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		companion : "familiar",
		alignment : "Unaligned",
		ac : 13,
		hp : 1,
		hd : [1, 4], //[#, die]
		speed : "30 ft",
		scores : [3, 16, 8, 2, 12, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 5,
		},
		senses : "Adv. on Wis (Perception) checks using hearing/smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, "", "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Keen Hearing and Smell",
				description : "The weasel has advantage on Wisdom (Perception) checks that rely on hearing or smell.",
			},
		],
	},
	"wight" : {
		name : "Wight",
		source : ["M", 300],
		size : 3, //Medium
		type : "Undead",
		subtype : "",
		alignment : "Neutral Evil",
		ac : 14,
		hp : 45,
		hd : [6, 8], //[#, die]
		speed : "30 ft",
		scores : [15, 14, 16, 10, 13, 15], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 4,
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
				damage : [1, 6, "necrotic"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "DC 13 Con save or HP max reduced by damage amount until long rest",
				tooltip : "The target must succeed on a DC 13 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.\nA humanoid slain by this attack rises 24 hours later as a zombie under the wight's control, unless the humanoid is restored to life or its body is destroyed. The wight can have no more than twelve zombies under its control at one time.",
			}, {
				name : "Longsword",
				ability : 1,
				damage : [1, 8, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Versatile (1d10)",
			}, {
				name : "Longbow",
				ability : 2,
				damage : [1, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "150/600 ft",
				description : "Ammunition, heavy, two-handed)",
			},
		],
		traits : [{
				name : "Sunlight Sensitivity",
				description : "While in sunlight, the wight has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.",
			}, {
				name : "Life Drain",
				description : "A target of the wight's life drain attack must succeed on a DC 13 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.\n   A humanoid slain by this attack rises 24 hours later as a zombie under the wight's control, unless the humanoid is restored to life or its body is destroyed. The wight can have no more than twelve zombies under its control at one time.",
			},
		],
	},
	"wolf" : {
		name : "Wolf",
		source : ["M", 341],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		companion : "companion",
		alignment : "Unaligned",
		ac : 13,
		hp : 11,
		hd : [2, 8], //[#, die]
		speed : "40 ft",
		scores : [12, 15, 12, 3, 12, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
			"stealth" : 4,
		},
		senses : "Adv. on Wis (Perception) checks using hearing/smell",
		passivePerception : 13,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [2, 4, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target must succeed on a DC 11 Strength saving throw or be knocked prone",
			},
		],
		traits : [{
				name : "Keen Hearing and Smell",
				description : "The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.",
			}, {
				name : "Pack Tactics",
				description : "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 ft of the creature and the ally isn't incapacitated.",
			},
		],
	},
	"worg" : {
		name : "Worg",
		source : ["M", 341],
		size : 2, //Large
		type : "Monstrosity",
		subtype : "",
		alignment : "Neutral Evil",
		ac : 13,
		hp : 26,
		hd : [4, 10], //[#, die]
		speed : "50 ft",
		scores : [16, 13, 13, 7, 11, 8], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 4,
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
				damage : [2, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target must succeed on a DC 13 Strength saving throw or be knocked prone",
			},
		],
		traits : [{
				name : "Keen Hearing and Smell",
				description : "The worg has advantage on Wisdom (Perception) checks that rely on hearing or smell.",
			},
		],
	},
	"zombie" : {
		name : "Zombie",
		source : ["M", 316],
		size : 3, //Medium
		type : "Undead",
		subtype : "",
		alignment : "Neutral Evil",
		ac : 8,
		hp : 22,
		hd : [3, 8], //[#, die]
		speed : "20 ft",
		scores : [13, 6, 16, 3, 6, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", 0, ""], //[Str, Dex, Con, Int, Wis, Cha]
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
				damage : [1, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Undead Fortitude",
				description : "If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead.",
			},
		],
	},
	"ogre zombie" : {
		name : "Ogre Zombie",
		source : ["M", 316],
		size : 2, //Large
		type : "Undead",
		subtype : "",
		alignment : "Neutral Evil",
		ac : 8,
		hp : 85,
		hd : [9, 10], //[#, die]
		speed : "30 ft",
		scores : [19, 6, 18, 3, 6, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", 0, ""], //[Str, Dex, Con, Int, Wis, Cha]
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
				damage : [2, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
		traits : [{
				name : "Undead Fortitude",
				description : "If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead.",
			},
		],
	},
	
	// Storm King's Thunder
	"crag cat" : {
		name : "Crag Cat",
		source : ["SKT", 243],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 34,
		hd : [4, 10], //[#, die]
		speed : "40 ft",
		scores : [16, 17, 16, 4, 14, 8], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 4,
			"stealth" : 7,
		},
		senses : "Darkvision 60 ft",
		passivePerception : 14,
		languages : "",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Claw",
				ability : 1,
				damage : [1, 8, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Pounce trait"
			}, {
				name : "Bite",
				ability : 1,
				damage : [1, 10, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Can be used in combination with claw while pouncing (see Pounce trait)"
			}
		],
		traits : [{
				name : "Nondetection",
				description : "The crag cat can't be targeted or detected by any divination magic or perceived through magical scrying sensors.",
			}, {
				name : "Pounce",
				description : "If the crag cat moves at least 20 ft straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the crag cat can make one bite attack against it as a bonus action.",
			}, {
				name : "Spell Turning",
				description : "The crag cat has advantage on saving throws against any spell that targets only the cat (not an area). If the crag cat's saving throw succeeds and the spell is of 7th level or lower, the spell has no effect on the crag cat and instead targets the caster.",
			}
		],
		wildshapeString : "Darkvision 60 ft| Nondetection: can't be targeted or detected by divination magic or scrying| Pounce: if target is hit with a claw attack after moving 20 ft straight on the same turn, DC 13 Str save or knocked prone and can make one bite attack against it as a bonus action| Spell Turning: adv. on saves vs. spells that targets only me (not area). If successful and spell is 7th level or lower, no effect and instead targets the caster"
	},
	"hulking crab" : {
		name : "Hulking Crab",
		source : ["SKT", 243],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 17,
		hp : 76,
		hd : [8, 12], //[#, die]
		speed : "20 ft, swim 30 ft",
		scores : [19, 8, 16, 3, 11, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"stealth" : 2,
		},
		senses : "Blindsight 30 ft",
		passivePerception : 10,
		languages : "",
		challengeRating : "5",
		proficiencyBonus : 3,
		attacksAction : 2,
		attacks : [{
				name : "Claws",
				ability : 2,
				damage : [1, "", "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : [-4, "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Amphibious",
				description : "The hulking crab can breate air and water.",
			}, {
				name : "Shell Camouflage",
				description : "While the hulking crab remains motionless with its eyestalks and pincers tucked close to its body, it resembles a natural formation or a pile of detritus. A creature within 30 feet of it can discern its true nature with a DC 15 Intelligence (Nature) check.",
			}
		]
	},
	"tressym" : {
		name : "Tressym",
		source : ["SKT", 245],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 5,
		hd : [2, 4], //[#, die]
		speed : "40 ft, climb 30 ft, fly 40 ft",
		scores : [3, 15, 10, 11, 12, 12], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 5,
			"stealth" : 4,
		},
		damage_immunities : "poison",
		condition_immunities : "poisoned",
		senses : "Darkvision 60 ft; Adv. on Wis (Perception) checks using smell",
		passivePerception : 15,
		languages : "understands Common but can't speak",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Claws",
				ability : 2,
				damage : [1, "", "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : [-4, "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Detect Invisibility",
				description : "Within 60 feet of the tressym, magical invisibility fails to conceal anything from the tressym's sight.",
			}, {
				name : "Keen Smell",
				description : "The tressym has advantage on Wisdom (Perception) checks that rely on smell.",
			}, {
				name : "Poison Sense",
				description : "The tressym can detect whether a substance is poisonous by taste, touch, or smell.",
			},
		],
		wildshapeString : "\u25C6 Languages: understands Common but can't speak.\n\u25C6 Senses: Darkvision 60 ft; Advantage on Wisdom (Perception) checks that rely on smell.\n\u25C6 Detect Invisibility: Magical invisibility fails to conceal anything from sight, out to 60 ft.\n\u25C6 Immune to: poison damage, poisoned condition.\n\u25C6 Poison Sense: Detect whether a substance is poisonous by taste, touch, or smell.",
	},
	
	// Volo's Guide to Monsters
	"aurochs" : {
		name : "Aurochs",
		source : ["V", 207],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 11,
		hp : 38,
		hd : [4, 10], //[#, die]
		speed : "50 ft",
		scores : [20, 10, 19, 2, 12, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 11,
		languages : "",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Gore",
				ability : 1,
				damage : [2, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Charge trait",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the aurochs moves at least 20 ft straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) piercing damage. A targeted creature must succeed on a DC 15 Strength saving throw or be knocked prone.",
			},
		],
	},
	"cow" : {
		name : "Cow",
		source : ["V", 207],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 10,
		hp : 15,
		hd : [2, 10], //[#, die]
		speed : "30 ft",
		scores : [18, 10, 12, 2, 10, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Gore",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, deals extra 2d6 damage (Charge)",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the cow moves at least 20 ft straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 7 (2d6) piercing damage.",
			},
		],
	},
	"ox" : {
		name : "Ox",
		source : ["V", 208],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 10,
		hp : 15,
		hd : [2, 10], //[#, die]
		speed : "30 ft",
		scores : [18, 10, 12, 2, 10, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Gore",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, deals extra 2d6 damage (Charge)",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the ox moves at least 20 ft straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 7 (2d6) piercing damage.",
			}, {
				name : "Beast of Burden",
				description : "The oxen is considered to be a Huge animal for the purpose of determining its carrying capacity.",
			},
		],
	},
	"deep rothe" : {
		name : "Deep Roth\xE9",
		source : ["V", 208],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 10,
		hp : 13,
		hd : [2, 8], //[#, die]
		speed : "30 ft",
		scores : [18, 10, 12, 2, 10, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Gore",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, deals extra 2d6 damage (Charge)",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the deep roth\xE9 moves at least 20 ft straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 7 (2d6) piercing damage.",
			}, {
				name : "Innate Spellcasting",
				description : "The deep roth\xE9's spellcasting ability is Charisma. It can innately cast Dancing Lights at will, requiring no components.",
			},
		],
	},
	"rothe" : {
		name : "Roth\xE9",
		source : ["V", 208],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 10,
		hp : 15,
		hd : [2, 10], //[#, die]
		speed : "30 ft",
		scores : [18, 10, 12, 2, 10, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Darkvision 30 ft",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Gore",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, deals extra 2d6 damage (Charge)",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the Roth\xE9 moves at least 20 ft straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 7 (2d6) piercing damage.",
			},
		],
	},
	"stench kow" : {
		name : "Stench Kow",
		source : ["V", 208],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 10,
		hp : 15,
		hd : [2, 10], //[#, die]
		speed : "30 ft",
		scores : [18, 10, 12, 2, 10, 4], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		damage_resistances : "cold, fire, and poison damage",
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Gore",
				ability : 1,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, deals extra 2d6 damage (Charge)",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the stench kow moves at least 20 ft straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 7 (2d6) piercing damage.",
			}, {
				name : "Stench",
				description : "Any creature other than a stench kow starting its turn within 5 ft of a stench kow must make a DC 12 Constitution saving throw or be poisoned until the start of the creature's next turn. On a successful saving throw, the creature is immune to the stench of all stench kows for 1 hour.",
			},
		],
		wildshapeString : "Darkvision 60 ft | Resistant to: cold, fire, poison | Charge: If the stench kow moves at least 20 ft straight toward a target and then hits it with a gore attack on the same turn, it deals extra 2d6 piercing damage | Stench: Any creature starting its turn within 5 ft of a stench kow must take a DC 12 Con save or be poisoned until the start of the its next turn. On a success, it is immune to the stench of all stench kows for 1 hour",
	},
	"dolphin" : {
		name : "Dolphin",
		source : ["V", 208],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 11,
		hd : [2, 8], //[#, die]
		speed : "swim 60 ft",
		scores : [14, 13, 13, 6, 12, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "Blindsight 60 ft",
		passivePerception : 13,
		languages : "",
		challengeRating : "1/8",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Slam",
				ability : 1,
				damage : [1, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "If used after moving 30 ft straight in the same round, deals extra 1d6 damage (Charge)",
			},
		],
		traits : [{
				name : "Charge",
				description : "If the dolphin moves at least 30 ft straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 3 (1d6) bludgeoning damage.",
			}, {
				name : "Hold Breath",
				description : "The dolphin can hold its breath for 20 minutes.",
			},
		],
	},
	"cranium rat" : {
		name : "Cranium Rat",
		source : ["V", 133],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		alignment : "Lawful Evil",
		ac : 12,
		hp : 2,
		hd : [1, 4], //[#, die]
		speed : "30 ft",
		scores : [2, 14, 10, 4, 11, 8], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "Darkvision 30 ft",
		passivePerception : 10,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, "", "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Illumination",
				description : "As a bonus action, the cranium rat can shed dim light from its brain in a 5-foot radius or extinguish the light.",
			}, {
				name : "Telepathic Shroud",
				description : "The cranium rat is immune to any effect that would sense its emotions or read its thoughts, as well as to all divination spells.",
			},
		],
	},
	"brontosaurus" : {
		name : "Brontosaurus",
		source : ["V", 139],
		size : 0, //Gargantuan
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 15,
		hp : 121,
		hd : [9, 20], //[#, die]
		speed : "30 ft",
		scores : [21, 9, 17, 2, 10, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", 6, "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "5",
		proficiencyBonus : 3,
		attacksAction : 1,
		attacks : [{
				name : "Stomp",
				ability : 1,
				damage : [5, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (20 ft)",
				description : "Target must succeed on a DC 14 Strength saving throw or be knocked prone",
			}, {
				name : "Tail",
				ability : 1,
				damage : [6, 8, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (20 ft)",
				description : "",
			},
		],
	},
	"deinonychus" : {
		name : "Deinonychus",
		source : ["V", 139],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 26,
		hd : [4, 8], //[#, die]
		speed : "40 ft",
		scores : [15, 15, 14, 4, 12, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "",
		passivePerception : 13,
		languages : "",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 3,
		attacks : [{
				name : "Claw",
				ability : 1,
				damage : [1, 8, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Two claw and one bite as one Attack action; If used after moving 20 ft straight in the same round, see Pounce trait",
			}, {
				name : "Bite",
				ability : 1,
				damage : [1, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Two claw and one bite as one Attack action (also, see Pounce trait)",
			},
		],
		traits : [{
				name : "Multiattack",
				description : "The deinonychus makes three attacks: two with its claws and one with its bite.",
			}, {
				name : "Pounce",
				description : "If the deinonychus moves at least 20 ft straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 12 Strength saving throw or be knocked prone. If the target is prone, the deinonychus can make one bite attack against it as a bonus action.",
			},
		],
	},
	"dimetrodon" : {
		name : "Dimetrodon",
		source : ["V", 139],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 19,
		hd : [3, 8], //[#, die]
		speed : "30 ft, swim 20 ft",
		scores : [14, 10, 15, 2, 10, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 2,
		},
		senses : "",
		passivePerception : 12,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [2, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
	},
	"hadrosaurus" : {
		name : "Hadrosaurus",
		source : ["V", 140],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 11,
		hp : 19,
		hd : [3, 10], //[#, die]
		speed : "40 ft",
		scores : [15, 10, 13, 2, 10, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 2,
		},
		senses : "",
		passivePerception : 12,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Tail",
				ability : 1,
				damage : [1, 10, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			},
		],
	},
	"quetzalcoatlus" : {
		name : "Quetzalcoatlus",
		source : ["V", 140],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 30,
		hd : [4, 12], //[#, die]
		speed : "10 ft, fly 80 ft",
		scores : [15, 13, 13, 2, 10, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 2,
		},
		senses : "",
		passivePerception : 12,
		languages : "",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [3, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "If used after diving 30 ft towards a target, the attack deals 3d6 extra damage (Dive Attack)",
			},
		],
		traits : [{
				name : "Dive Attack",
				description : "If the quetzalcoatlus is flying and dives at least 30 ft toward a creature and then hits it with a bite attack, the attack deals an extra 10 (3d6) damage to the target.",
			}, {
				name : "Flyby",
				description : "The quetzalcoatlus doesn't provoke opportunity attacks when it flies out of an enemy's reach.",
			},
		],
	},
	"stegosaurus" : {
		name : "Stegosaurus",
		source : ["V", 140],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 76,
		hd : [8, 12], //[#, die]
		speed : "40 ft",
		scores : [20, 9, 17, 2, 11, 5], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [6, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "",
			},
		],
	},
	"velociraptor" : {
		name : "Velociraptor",
		source : ["V", 140],
		size : 5, //Tiny
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 10,
		hd : [3, 4], //[#, die]
		speed : "30 ft",
		scores : [6, 14, 13, 4, 12, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 3,
		},
		senses : "",
		passivePerception : 13,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One bite and one claw attack as an Attack action",
			}, {
				name : "Claw",
				ability : 2,
				damage : [1, 4, "slashing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "One bite and one claw attack as an Attack action",
			},
		],
		traits : [{
				name : "Pack Tactics",
				description : "The velociraptor has advantage on an attack roll against a creature if at least one of the rat's allies is within 5 ft of the creature and the ally isn't incapacitated.",
			},
		],
	},
	"gazer" : {
		name : "Gazer",
		source : ["V", 126],
		size : 5, //Tiny
		type : "Aberration",
		subtype : "",
		alignment : "Neutral Evil",
		ac : 13,
		hp : 13,
		hd : [3, 4], //[#, die]
		speed : "0 ft, fly 30 ft",
		scores : [3, 17, 14, 3, 10, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", 2, ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"perception" : 4,
			"stealth" : 5,
		},
		senses : "Darkvision 60 ft",
		passivePerception : 14,
		languages : "",
		challengeRating : "1/2",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, "", "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "",
			}, {
				name : "Eye Rays",
				ability : 3,
				damage : ["Special", "", ""], //[#, die, type] "" for die is allowed
				range : "60 ft",
				description : "Shoot two randomly determined different rays as one action; Each ray has its own target; See traits",
				dc : true,
				modifiers : ["", "", false], //[to hit, to damage, add ability to damage] "" means ignore
			},
		],
		traits : [{
				name : "Aggressive",
				description : "As a bonus action, the gazer moves its speed toward an enemy that it can see.",
			}, {
				name : "Mimicry",
				description : "The gazer can mimic simple speech it has heard, in any language. Any who hear this can tell it is an imitation with a successful DC 10 Wis (Insight) check.",
			}
		],
		actions : [{
				name : "Eye Rays",
				description : "1. Dazing Ray: Wisdom saving throw or charmed until the start of the gazer's next turn. While charmed, half speed and disadv. on attacks.\n2. Fear Ray: Wisdom saving throw or frightened until the start of the gazer's next turn.\n3. Frost Ray: Target must make a Dexterity saving throw or 10 (3d6) cold damage.\n4. Telekinetic Ray: Medium or smaller creature, Strength saving throw or be moved up to 30 ft away from the gazer. If it is an up to 10 lb unattended object, the gazer moves it up to 30 ft in any direction. It can exert fine control on objects this way.",
			},
		],
	},

	// Tales of the Yawning Portal
	"giant crayfish" : {
		name : "Giant Crayfish",
		source : ["TotYP", 235],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 15,
		hp : 45,
		hd : [7, 10], //[#, die]
		speed : "30 ft, swim 30 ft",
		scores : [15, 13, 13, 1, 9, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"stealth" : 3
		},
		senses : "Blindsight 30 ft",
		passivePerception : 9,
		languages : "",
		challengeRating : "2",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
				name : "Claw",
				ability : 1,
				damage : [1, 10, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target grappled on hit (escape DC 12); 2 claw attacks as Attack action, if not grappling with claw",
			},
		],
		traits : [{
				name : "Amphibious",
				description : "The giant crayfish can breathe air and water.",
			},
		],
	},
	"giant ice toad" : {
		name : "Giant Ice Toad",
		source : ["TotYP", 235],
		size : 2, //Large
		type : "Monstrosity",
		subtype : "",
		alignment : "Unaligned",
		ac : 14,
		hp : 52,
		hd : [7, 10], //[#, die]
		speed : "30 ft",
		scores : [16, 13, 14, 8, 10, 6], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		damage_immunities : "cold",
		senses : "Darkvision 60 ft",
		passivePerception : 10,
		languages : "Ice Toad",
		challengeRating : "3",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [2, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target is grappled and restrained (escape DC 13); Can't use bite again until grapple ends",
			},
		],
		traits : [{
				name : "Amphibious",
				description : "The toad can breathe air and water",
			}, {
				name : "Cold Aura",
				description : "A creature that starts its turn within 10 feet of the toad takes 5 (1d10) cold damage.",
			}, {
				name : "Standing Leap",
				description : "The toad's long jump is up to 20 ft and its high jump is up to 10 ft, with or without a running start."
			}
		],
		features : [{
				name : "Swallow",
				description : "The toad can make a bite attack against a Medium or smaller target it is grappling. If it hits, the target takes bite damage, is swallowed, and the grapple ends. The swallowed target is blinded and restrained, it has total cover against attacks and other effects outside the toad, and it takes 10 (3d6) acid damage and 11 (2d6) cold damage at the start of each of the toad's turns. The toad can have only one target swallowed at a time.\nIf the toad dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 5 feet of movement, exiting prone.",
			}
		],
		wildshapeString : "Darkvision 60 ft| Cold Aura: Any within 5 ft at start of their turn take 1d10 cold damage| Amphibious: breathe air and water| Standing Leap: long jump 20 ft and high jump 10 ft, regardless of start| Swallow: if bite attack hits Medium or smaller being grappling, it takes bite damageand is swallowed: blinded, restrained, total cover, takes 3d6 acid and 2d6 cold damage at the start of each of the toad's turns; Only 1 swallowed at a time.",
	},
	"giant lightning eel" : {
		name : "Giant Lightning Eel",
		source : ["TotYP", 236],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 13,
		hp : 42,
		hd : [5, 10], //[#, die]
		speed : "5 ft, swim 30 ft",
		scores : [11, 17, 16, 2, 12, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		damage_resistances : "lightning",
		senses : "Blindsight 60 ft",
		passivePerception : 11,
		languages : "",
		challengeRating : "3",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [2, 6, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Two bite attacks as an Attack action; +1d8 lightning damage on a hit",
			}, {
				name : "Lightning Jolt (Recharge 5-6)",
				ability : 3,
				damage : [3, 8, "lightning"], //[#, die, type] "" for die is allowed
				range : "Out/in 5/15 ft",
				dc : true,
				description : "Out water: 5 ft, 1 crea; In water: all in 15 ft; Con save: fail― stunned until eel's next turn end, success― half damage",
				modifiers : [-1, "", false], //[to hit, to damage, add ability to damage] "" means ignore
				tooltip : "One creature the eel touches within 5 feet of it outside water, or each creature within 15 feet of it in a body of water, must make a DC 12 Constitution saving throw. On failed save, a target takes 13 (3d8) lightning damage. If the target takes any of this damage, the target is stunned until the end of the eel's next turn. On a successful save, a target takes half as much damage and isn't stunned"
			}
		],
		traits : [{
				name : "Water Breathing",
				description : "The eel can breathe only underwater.",
			}
		],
		actions : [{
				name : "Lightning Jolt (Recharge 5-6)",
				description : "See Attack. One creature the eel touches within 5 feet of it outside water, or each creature within 15 feet of it in a body of water, must make a DC 12 Constitution saving throw. On failed save, a target takes 13 (3d8) lightning damage. If the target takes any of this damage, the target is stunned until the end of the eel's next turn. On a successful save, a target takes half as much damage and isn't stunned"
			}
		]
	},
	"giant subterranean lizard" : {
		name : "Giant Subterranean Lizard",
		source : ["TotYP", 236],
		size : 1, //Huge
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 14,
		hp : 66,
		hd : [7, 12], //[#, die]
		speed : "30 ft, swim 50 ft",
		scores : [21, 9, 17, 2, 10, 7], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"stealth" : 3
		},
		senses : "",
		passivePerception : 10,
		languages : "",
		challengeRating : "4",
		proficiencyBonus : 2,
		attacksAction : 2,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [2, 10, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "1 bite \u0026 1 tail attack as Attack action; Target grappled \u0026 restrained (escape DC 15); Can't use bite until grapple ends"
			}, {
				name : "Tail",
				ability : 1,
				damage : [2, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "1 bite \u0026 1 tail attack as Attack action; Target DC 15 Str save or knocked prone"
			},
		],
		traits : [{
				name : "Swallow",
				description : "The lizard can make one bite attack against a Medium or smaller target it is grappling. If the attack hits, the target takes bite damage, is swallowed, and the grapple ends. The swallowed target is blinded and restrained, it has total cover against attacks and other effects outside the lizard, and it takes 10 (3d6) acid damage at the start of each of the lizard's turns. The lizard can have only one target swallowed at a time.\nIf the lizard dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 10 feet of movement, exiting prone.",
			}
		],
		wildshapeString : "\u25C6 Swallow: If a bite attack hits a Small or smaller target that is currently being grappled by the lizard, the target is swallowed, ending the grapple. While swallowed, it is blinded, restrained, has total cover, and takes 3d4 acid damage at the start of each of the lizard's turns; The lizard can have only 1 swallowed at a time. If the lizard dies, the swallowed creature is no longer restrained and can escape using 10 ft movement.",
	},

	// Out of the Abyss
	"steeder, female" : {
		name : "Steeder, Female",
		source : ["OotA", 231],
		size : 2, //Large
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 14,
		hp : 30,
		hd : [4, 10], //[#, die]
		speed : "30 ft, climb 30 ft",
		scores : [15, 16, 14, 2, 10, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"stealth" : 7
		},
		senses : "Darkvision 120 ft",
		passivePerception : 10,
		languages : "",
		challengeRating : "1",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 2,
				damage : [1, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target also takes 2d8 acid damage, half on a DC 12 Constitution saving throw"
			}, {
				name : "Sticky Leg",
				ability : 2,
				damage : ["Grappled", "", ""], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Medium or smaller is stuck to the steeder's leg and grappled (escape DC 12); Can't use again until grapple ends",
				modifiers : ["", "", false] //[to hit, to damage, add ability to damage] "" means ignore
			}
		],
		traits : [{
				name : "Spider Climb",
				description : "The steeder can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
			}, {
				name : "Leap",
				description : "The steeder can expend all its movement on its turn to jump up to 90 ft vertically or horizontally, provided that its speed is at least 30 feet."
			}
		]
	},
	"steeder, male" : {
		name : "Steeder, Male",
		source : ["OotA", 231],
		size : 3, //Medium
		type : "Beast",
		subtype : "",
		alignment : "Unaligned",
		ac : 12,
		hp : 13,
		hd : [2, 8], //[#, die]
		speed : "30 ft, climb 30 ft",
		scores : [15, 12, 14, 2, 10, 3], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		skills : {
			"stealth" : 5
		},
		senses : "Darkvision 120 ft",
		passivePerception : 10,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : 1,
		attacks : [{
				name : "Bite",
				ability : 1,
				damage : [1, 8, "piercing"], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Target also takes 1d8 acid damage, half on a DC 12 Constitution saving throw"
			}, {
				name : "Sticky Leg",
				ability : 1,
				damage : ["Grappled", "", ""], //[#, die, type] "" for die is allowed
				range : "Melee (5 ft)",
				description : "Small or smaller is stuck to the steeder's leg and grappled (escape DC 12); Can't use again until grapple ends",
				modifiers : ["", "", false] //[to hit, to damage, add ability to damage] "" means ignore
			}
		],
		traits : [{
				name : "Spider Climb",
				description : "The steeder can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
			}, {
				name : "Leap",
				description : "The steeder can expend all its movement on its turn to jump up to 60 ft vertically or horizontally, provided that its speed is at least 30 feet."
			}
		]
	},
};

// make a default 'horse' entry to point to the 'riding horse' entry
CreatureList["horse"] = CreatureList["riding horse"];
// make a default 'steeder' entry to point to the 'steeder, female' entry
CreatureList["steeder"] = CreatureList["steeder, female"];

var license = [
      "OPEN GAME LICENSE Version 1.0a",
      "The following text is the property of Wizards of the Coast, Inc. and is Copyright 2000 Wizards of the Coast, Inc (\"Wizards\"). All Rights Reserved.",
      "1. Definitions: (a)\"Contributors\" means the copyright and/or trademark owners who have contributed Open Game Content; (b)\"Derivative Material\" means copyrighted material including derivative works and translations (including into other computer languages), potation, modification, correction, addition, extension, upgrade, improvement, compilation, abridgment or other form in which an existing work may be recast, transformed or adapted; (c) \"Distribute\" means to reproduce, license, rent, lease, sell, broadcast, publicly display, transmit or otherwise distribute; (d)\"Open Game Content\" means the game mechanic and includes the methods, procedures, processes and routines to the extent such content does not embody the Product Identity and is an enhancement over the prior art and any additional content clearly identified as Open Game Content by the Contributor, and means any work covered by this License, including translations and derivative works under copyright law, but specifically excludes Product Identity. (e) \"Product Identity\" means product and product line names, logos and identifying marks including trade dress; artifacts; creatures characters; stories, storylines, plots, thematic elements, dialogue, incidents, language, artwork, symbols, designs, depictions, likenesses, formats, poses, concepts, themes and graphic, photographic and other visual or audio representations; names and descriptions of characters, spells, enchantments, personalities, teams, personas, likenesses and special abilities; places, locations, environments, creatures, equipment, magical or supernatural abilities or effects, logos, symbols, or graphic designs; and any other trademark or registered trademark clearly identified as Product identity by the owner of the Product Identity, and which specifically excludes the Open Game Content; (f) \"Trademark\" means the logos, names, mark, sign, motto, designs that are used by a Contributor to identify itself or its products or the associated products contributed to the Open Game License by the Contributor (g) \"Use\", \"Used\" or \"Using\" means to use, Distribute, copy, edit, format, modify, translate and otherwise create Derivative Material of Open Game Content. (h) \"You\" or \"Your\" means the licensee in terms of this agreement.",
      "2. The License: This License applies to any Open Game Content that contains a notice indicating that the Open Game Content may only be Used under and in terms of this License. You must affix such a notice to any Open Game Content that you Use. No terms may be added to or subtracted from this License except as described by the License itself. No other terms or conditions may be applied to any Open Game Content distributed using this License.",
      "3.Offer and Acceptance: By Using the Open Game Content You indicate Your acceptance of the terms of this License.",
      "4. Grant and Consideration: In consideration for agreeing to use this License, the Contributors grant You a perpetual, worldwide, royalty-free, non-exclusive license with the exact terms of this License to Use, the Open Game Content.",
      "5.Representation of Authority to Contribute: If You are contributing original material as Open Game Content, You represent that Your Contributions are Your original creation and/or You have sufficient rights to grant the rights conveyed by this License.",
      "6.Notice of License Copyright: You must update the COPYRIGHT NOTICE portion of this License to include the exact text of the COPYRIGHT NOTICE of any Open Game Content You are copying, modifying or distributing, and You must add the title, the copyright date, and the copyright holder's name to the COPYRIGHT NOTICE of any original Open Game Content you Distribute.",
      "7. Use of Product Identity: You agree not to Use any Product Identity, including as an indication as to compatibility, except as expressly licensed in another, independent Agreement with the owner of each element of that Product Identity. You agree not to indicate compatibility or co-adaptability with any Trademark or Registered Trademark in conjunction with a work containing Open Game Content except as expressly licensed in another, independent Agreement with the owner of such Trademark or Registered Trademark. The use of any Product Identity in Open Game Content does not constitute a challenge to the ownership of that Product Identity. The owner of any Product Identity used in Open Game Content shall retain all rights, title and interest in and to that Product Identity.",
      "8. Identification: If you distribute Open Game Content You must clearly indicate which portions of the work that you are distributing are Open Game Content.",
      "9. Updating the License: Wizards or its designated Agents may publish updated versions of this License. You may use any authorized version of this License to copy, modify and distribute any Open Game Content originally distributed under any version of this License.",
      "10 Copy of this License: You MUST include a copy of this License with every copy of the Open Game Content You Distribute.",
      "11. Use of Contributor Credits: You may not market or advertise the Open Game Content using the name of any Contributor unless You have written permission from the Contributor to do so.",
      "12 Inability to Comply: If it is impossible for You to comply with any of the terms of this License with respect to some or all of the Open Game Content due to statute, judicial order, or governmental regulation then You may not Use any Open Game Material so affected.",
      "13 Termination: This License will terminate automatically if You fail to comply with all terms herein and fail to cure such breach within 30 days of becoming aware of the breach. All sublicenses shall survive the termination of this License.",
      "14 Reformation: If any provision of this License is held to be unenforceable, such provision shall be reformed only to the extent necessary to make it enforceable.",
      "15 COPYRIGHT NOTICE Open Game License v 1.0 Copyright 2000, Wizards of the Coast, Inc."
    ]