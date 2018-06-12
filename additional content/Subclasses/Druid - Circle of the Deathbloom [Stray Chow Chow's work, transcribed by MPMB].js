/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the druid, called "Circle of the Deathbloom"
				This is taken from Dungeon Masters Guild (https://www.dmsguild.com/product/173273) and is the version from 31st of August 2016
				This subclass is made by Stray Chow Chow
				Note that this is not the latest version of this subclass and the author of it no longer actively supports it on DMs Guild
	Code by:	MorePurpleMoreBetter
	Date:		2018-01-02 (sheet v12.999)
	
	Please support the creator of this content (Stray Chow Chow) and download their material from DM Guild: https://www.dmsguild.com/browse.php?author=Stray%20Chow%20Chow
	
	Note that although the Druid is able to wild shape into blights, those won't appear in the menu. You can use these wild shapes only by typing the name of the creature into the "Make a Selection" drop-down box on the Wild Shape pages.
	Also, this script doesn't include a way to add the Spore Servant template to wild shapes.
*/

var iFileName = "Druid - Circle of the Deathbloom [Stray Chow Chow's work, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["SCC:CD"] = {
	name : "Stray Chow Chow - Circle of the Deathbloom",
	abbreviation : "SCC:CD",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/173273",
	date : "2016/08/31"
};

var theCoD = AddSubClass("druid", "circle of deathbloom", {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*\bdeathbloom\b).*$/i,
	subname : "Circle of Deathbloom",
	source : ["SCC:CD", 0],
	spellcastingList : {
		"class" : "druid",
		extraspells : ["abi-dalzim's horrid wilting", "ray of enfeeblement", "ray of sickness", "revivify", "vampiric touch"]
	},
	features : {
		"subclassfeature2" : {
			name : "Natural Necromancy",
			source : ["SCC:CD", 0],
			minlevel : 2,
			description : desc([
				"I learn how to cast certain necromancy spells and add them to my druid spell list"
			])
		},
		"subclassfeature2.1" : {
			name : "Fungal Wild Shape",
			source : ["SCC:CD", 0],
			minlevel : 2,
			description : desc([
				"When using Wild Shape, I can also take the form of blights, fungi, and spores",
				"Any beast I Wild Shape into can have the Spore Servant template applied to it"
			])
		},
		"subclassfeature2.1" : {
			name : "Regrowth",
			source : ["SCC:CD", 0],
			minlevel : 2,
			description : desc([
				"As an action, I decompose a Small or larger corpse that has been dead for only 1 minute",
				"I then summon any number of plant creatures with a combined CR (CR 0 counts as 1/8)",
				"The creatures are friendly, obey my verbal commands, and act on their own initiative",
				"The summoned plants and plant creatures last until I finish my next long rest"
			]),
			additional : levels.map(function (n) { return n < 2 ? "" : "max total CR " + Math.floor(n/4*2)/2; }),
			usages : 1,
			recovery : "long rest",
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Return to the Earth",
			source : ["SCC:CD", 0],
			minlevel : 6,
			description : desc([
				"As a bonus action, I can destroy a beast or plant creature summoned by me for healing",
				"I can also do this as a reaction when one of those summons is reduced to 0 HP",
				"All within 5 ft of the destroyed creature heal 1d8 per CR of it; CR has to be 1 or more"
			]),
			action : ["bonus action", ""],
			eval : "AddAction('reaction', 'Return to the Earth (at 0 HP)', 'Druid (Circle of Deathbloom)');",
			removeeval : "RemoveAction('reaction', 'Return to the Earth (at 0 HP)', 'Druid (Circle of Deathbloom)');"
		},
		"subclassfeature10" : {
			name : "Putrid Inoculation",
			source : ["SCC:CD", 0],
			minlevel : 10,
			description : desc([
				"I am immune to disease and poison, and have resistance to necrotic damage"
			]),
			dmgres : ["Necrotic"],
			savetxt : { immune : ["poison", "disease"] }
		},
		"subclassfeature14" : {
			name : "Fertilize",
			source : ["SCC:CD", 0],
			minlevel : 14,
			description : desc([
				"As an action, I decompose a touched corpse of a plant, beast, or humanoid, to do either:",
				"\u2022 Grow a mundane plant or fungus up to the size of the corpse",
				"\u2022 Cause plants to overgrow, making everything in a 5-ft radius around it difficult terrain",
				"  All creatures standing in the area when it overgrows must make a DC 13 Dex save",
				"  If failed, a creature is grappled until it succeeds in a DC 13 Str check to break free",
				"\u2022 Siphon its trapped life energy, giving me temp. HP equal to the corpse's number of HD",
				"\u2022 Enrich the land for one season, causing all plants in 50 ft of it to double their harvest"
			]),
			action : ["action", ""]
		}
	}
});

if (ClassSubList[theCoD] && sheetVersion < 13) {
	ClassSubList[theCoD].spellcastingExtra = ["abi-dalzim's horrid wilting", "ray of enfeeblement", "ray of sickness", "revivify", "vampiric touch"];
	CreatureList["shrieker"] = {
		name : "Shrieker",
		source : [["SRD", 309], ["M", 138]],
		size : 3, //Medium
		type : "Plant",
		subtype : "",
		alignment : "Unaligned",
		ac : 5,
		hp : 13,
		hd : [3, 8], //[#, die]
		speed : "0 ft",
		scores : [1, 1, 10, 1, 3, 1], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		condition_immunities : "blinded, deafened, frightened",
		senses : "Blindsight 30 ft (blind beyond this radius).",
		passivePerception : 6,
		languages : "",
		challengeRating : "0",
		proficiencyBonus : 2,
		attacksAction : 0,
		attacks : [],
		traits : [{
				name : "False Appearance",
				description : "While the shrieker remains motionless, it is indistinguishable from an ordinary fungus."
			}
		],
		actions : [{
				name : "Shriek",
				description : "As a reaction when bright light or a creature is within 30 feet of the shrieker, it emits a shriek audible within 300 feet of it. The shrieker continues to shriek until the disturbance moves out of range and for 1d4 of the shrieker's turns afterward."
			}
		],
		wildshapeString : "\u25C6 Senses: blindsight 30 ft (blind beyond this radius).\n\u25C6 Condition Immunities: blinded, deafened, frightened.\n\u25C6 Shriek: As a reaction when bright light or a creature is within 30 ft of the shrieker, emits a shriek audible out to 300 ft. This continues until the disturbance moves out of range and for 1d4 of the shrieker's turns afterward.\n\u25C6 False Appearance: While motionless, the shrieker is indistinguishable from an ordinary fungus."
	};
	CreatureList["violet fungus"] = {
		name : "Violet Fungus",
		source : [["SRD", 309], ["M", 138]],
		size : 3, //Medium
		type : "Plant",
		subtype : "",
		alignment : "Unaligned",
		ac : 5,
		hp : 18,
		hd : [4, 8], //[#, die]
		speed : "5 ft",
		scores : [3, 1, 10, 1, 3, 1], //[Str, Dex, Con, Int, Wis, Cha]
		saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
		condition_immunities : "blinded, deafened, frightened",
		senses : "Blindsight 30 ft (blind beyond this radius).",
		passivePerception : 6,
		languages : "",
		challengeRating : "1/4",
		proficiencyBonus : 2,
		attacksAction : "1",
		attacks : [{
				name : "Rotting Touch",
				ability : 3,
				damage : [1, 8, "necrotic"], //[#, die, type] "" for die is allowed
				range : "Melee (10 ft)",
				description : "1d4 rotting touch attacks as an Attack action"
			}
		],
		traits : [{
				name : "False Appearance",
				description : "While the violet fungus remains motionless, it is indistinguishable from an ordinary fungus."
			}
		]
	};
};

if (!CreatureList["needle blight"] || !CreatureList["twig blight"] || !CreatureList["vine blight"] || !CreatureList["gas spore"]) {
	SourceList["Mtemp"]={
		name : "Monster Manual",
		abbreviation : "MM",
		group : "Primary Sources",
		url : "https://dnd.wizards.com/products/tabletop-games/rpg-products/monster-manual",
		date : "2014/09/30"
	};
	if (!CreatureList["needle blight"]) {
		CreatureList["needle blight"] = {
			name : "Needle Blight",
			source : ["Mtemp", 32],
			size : 3, //Medium
			type : "Plant",
			subtype : "",
			alignment : "Neutral Evil",
			ac : 12,
			hp : 11,
			hd : [2, 8], //[#, die]
			speed : "30 ft",
			scores : [12, 12, 13, 4, 8, 3], //[Str, Dex, Con, Int, Wis, Cha]
			saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
			condition_immunities : "blinded, deafened",
			senses : "Blindsight 60 ft (blind beyond this radius).",
			passivePerception : 9,
			languages : "understands Common but can't speak",
			challengeRating : "1/4",
			proficiencyBonus : 2,
			attacksAction : 1,
			attacks : [{
					name : "Claws",
					ability : 2,
					damage : [2, 4, "piercing"], //[#, die, type] "" for die is allowed
					range : "Melee (5 ft)",
					description : ""
				}, {
					name : "Needles",
					ability : 2,
					damage : [2, 6, "piercing"], //[#, die, type] "" for die is allowed
					range : "30/60 ft",
					description : ""
				}
			]
		};
	};
	if (!CreatureList["twig blight"]) {
		CreatureList["twig blight"] = {
			name : "Twig Blight",
			source : ["Mtemp", 32],
			size : 4, //Small
			type : "Plant",
			subtype : "",
			alignment : "Neutral Evil",
			ac : 13,
			hp : 4,
			hd : [1, 6], //[#, die]
			speed : "20 ft",
			scores : [6, 13, 12, 4, 8, 3], //[Str, Dex, Con, Int, Wis, Cha]
			saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
			damage_vulnerabilities : "fire",
			condition_immunities : "blinded, deafened",
			senses : "Blindsight 60 ft (blind beyond this radius).",
			passivePerception : 9,
			languages : "understands Common but can't speak",
			challengeRating : "1/8",
			proficiencyBonus : 2,
			attacksAction : 1,
			attacks : [{
					name : "Claws",
					ability : 2,
					damage : [1, 4, "piercing"], //[#, die, type] "" for die is allowed
					range : "Melee (5 ft)",
					description : ""
				}
			],
			traits : [{
					name : "False Appearance",
					description : "While the blight remains motionless, it is indistinguishable from a dead shrub."
				}
			]
		};
	};
	if (!CreatureList["vine blight"]) {
		CreatureList["vine blight"] = {
			name : "Vine Blight",
			source : ["Mtemp", 32],
			size : 3, //Medium
			type : "Plant",
			subtype : "",
			alignment : "Neutral Evil",
			ac : 12,
			hp : 26,
			hd : [4, 8], //[#, die]
			speed : "10 ft",
			scores : [15, 8, 14, 5, 10, 3], //[Str, Dex, Con, Int, Wis, Cha]
			saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
			skills : {
				"stealth" : 1
			},
			condition_immunities : "blinded, deafened",
			senses : "Blindsight 60 ft (blind beyond this radius).",
			passivePerception : 9,
			languages : "Common",
			challengeRating : "1/2",
			proficiencyBonus : 2,
			attacksAction : 1,
			attacks : [{
					name : "Constrict",
					ability : 1,
					damage : [2, 6, "bludgeoning"], //[#, die, type] "" for die is allowed
					range : "Melee (10 ft)",
					description : "Large or smaller target is grappled and restrained (escape DC 12); Can't use constrict again until grapple ends"
				}
			],
			traits : [{
					name : "False Appearance",
					description : "While the blight remains motionless, it is indistinguishable from a tangle of vines."
				}
			],
			actions : [{
					name : "Entangling Plants (Recharge 5-6)",
					description : "As an action, grasping roots and vines sprout in a 15-foot radius centered on the blight, withering away after 1 minute. For the duration, that area is difficult terrain for nonplant creatures. In addition, each creature of the blight's choice in that area when the plants appear must succeed on a DC 12 Strength saving throw or become restrained. A creature can use its action to make a DC 12 Strength check, freeing it self or another entangled creature within reach on a success."
				}
			],
			wildshapeString : "Blindsight 60 ft (blind beyond)| Immune to blinded, deafened| Entangling Plants (Recharge 5-6): As an action, 15-ft radius is difficult terrain for nonplant creatures, for 1 minute. Chosen creatures in it must make a DC 12 Str save or become restrained. A creature can use its action to make a DC 12 Str check to free itself or another within reach| False Appearance: While motionless, it's indistinguishable from a tangle of vines."
		};
	};
	if (!CreatureList["gas spore"]) {
		CreatureList["gas spore"] = {
			name : "Gas Spore",
			source : ["Mtemp", 138],
			size : 2, //Large
			type : "Plant",
			subtype : "",
			alignment : "Unaligned",
			ac : 5,
			hp : 1,
			hd : [1, 10], //[#, die]
			speed : "fly 10 ft (hover)",
			scores : [5, 1, 3, 1, 1, 1], //[Str, Dex, Con, Int, Wis, Cha]
			saves : ["", "", "", "", "", ""], //[Str, Dex, Con, Int, Wis, Cha]
			condition_immunities : "blinded, deafened, frightened",
			senses : "Blindsight 30 ft (blind beyond this radius).",
			passivePerception : 5,
			languages : "",
			challengeRating : "1/2",
			proficiencyBonus : 2,
			attacksAction : 1,
			attacks : [{
					name : "Touch",
					ability : 1,
					damage : [1, "", "poison"], //[#, die, type] "" for die is allowed
					range : "Melee (5 ft)",
					description : "DC 10 Con save or infected with Death Burst disease, see traits",
					modifiers : [1, "", false], //[to hit, to damage, add ability to damage] "" means ignore
				}
			],
			traits : [{
					name : "Death Burst",
					description : "The gas spore explodes when it drops to 0 hit points. Each creature within 20 feet of it must succeed on a DC 15 Constitution saving throw or take 10 (3d6) poison damage and become infected with a disease on a failed save. Creatures immune to the poisoned condition are immune to this disease.\n   Spores invade an infected creature's system, killing the creature in a number of hours equal to 1d12+the creature's Constitution score, unless the disease is removed. In half that time, the creature becomes poisoned for the rest of the duration. After the creature dies, it sprouts 2d4 Tiny gas spores that grow to full size in 7 days."
				}, {
					name : "Eerie Resemblance",
					description : "The gas spore resembles a beholder. A creature that can see the gas spore can discern its true nature with a successful DC 15 Intelligence (Nature) check."
				}
			],
			wildshapeString : "Blindsight 30 ft (blind beyond)| Immune to: blinded, deafened, frightened| Distinguishable form a beholder only with a DC 15 Int (Nature) check| When at 0 HP, explodes: all within 20 ft DC 15 Con save or 3d6 poison damage and infected with disease| The disease kills a creature in 1d12+it's Con score of hours. In half that, it becomes poisoned for the remainder. When dies, sprouts 2d4 Tiny gas spores that grow to full size in 7 days."
		};
	};
};
