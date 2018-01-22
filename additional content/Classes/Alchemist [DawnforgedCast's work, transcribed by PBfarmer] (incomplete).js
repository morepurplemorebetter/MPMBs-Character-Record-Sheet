/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/
 
/*  -INFORMATION-
	Subject:	Class
	Effect:		This script adds the class called "Alchemist" and its 3 subclasses known as Research Focuses "Arcane Distiller", "Grenadier", and "Metamorph"
				This is taken from DawnforgedCast (https://dawnforgedcast.myshopify.com/products/5th-edition-alchemist-class)
	Code by:	/u/PbFarmer
	Date:		2017-09-22 (sheet v12.998)
 
	Code Version:	1.0
 
	Please support the creator of this content (DawnforgedCast) and download their material from their website: http://dawnforgedcast.org/
*/

/*	-IMPORTANT NOTICE-
	This code has not been corrected by MPMB to his usual rigid standards. He only corrected errors in the code, but hasn't compared the content to the original source.
	Things will not look as polished as with the other pre-written code that you can find in the same folder. For example, descriptions for class features will overflow their allowed space.
	Also, automation for spell selection isn't fully functional for several of the subclass features.
*/

var iFileName = "Alchemist [DawnforgedCast's work, transcribed by /u/PbFarmer] (incomplete).js";
RequiredSheetVersion(12.999);

//first make the sheet know which spells are alchemist spells
[//level 0 (cantrips)
	"blade ward", "friends", "guidance", "light", "prestidigitation", "resistance", "true strike",

	//level 1
	"absorb elements", "animal friendship", "armor of agathys", "arms of hadar", "comprehend languages", "cure wounds", "detect evil and good", "detect magic", "detect poison and disease", "disguise self", "expeditious retreat", "false life", "feather fall", "grease", "identify", "illusory script", "jump", "longstrider", "mage armor", "protection from evil and good", "speak with animals", "entangle", "faerie fire", "fog", "cloud",

	//level 2
	"aid", "alter self", "barkskin", "blur", "darkvision", "enhance ability", "enlarge/reduce", "find traps", "invisibility", "lesser restoration", "levitate", "locate animals or plants", "locate object", "mirror image", "pass without trace", "protection from poison", "see invisibility", "spider climb", "web", "darkness", "silence", "spike growth", "zone of truth",

	//level 3
	"blink", "elemental weapon", "feign death", "fly", "gaseous form", "haste", "meld into stone", "nondetection", "protection from energy", "remove curse", "tongues", "water breathing", "water walk", "hungering void", "sleet storm", "stinking cloud", "wind wall",

	//level 4
	"death ward", "fire shield", "freedom of movement", "greater invisibility", "locate creature", "polymorph", "stoneskin", "black tentacles", "hallucinatory terrain", "storm sphere", "wall of fire",

	//level 5
	"greater restoration", "legend lore", "telekinesis", "treestride",

	//level 6
	"find the path", "globe of invulnerability", "heal", "investiture of flame", "investiture of ice", "investiture of stone", "investiture of wind", "primordial ward", "true seeing", "wind walk",

	//level 7
	"etherealness", "plane shift", "regenerate", "simulacrum"
].forEach(function (alchemistSpells) {
	if (SpellsList[alchemistSpells]) SpellsList[alchemistSpells].classes.push("dawnforgedcast-alchemist");
});

//now make the alchemist class
ClassList["dawnforgedcast-alchemist"] = {
	regExpSearch : /alchemist/i,
	name : "Alchemist",
	source : ["DFC:AC", 1],
	primaryAbility : "\n \u2022 Alchemist: Intelligence;",
	prereqs : "\n \u2022 Alchemist: Intelligence 13 and Dexterity 13;",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 8,
	saves : ["Con", "Int"],
	skills : ["\n\n" + toUni("Alchemist") + ": Choose three from Arcana, History, Investigation, Medicine, Nature, Religion, and Sleight of Hand."],
	toolProfs : {
		primary : ["Alchemist's supplies", ["Herbalism or poisoner's kit", 1]],
		secondary : ["Alchemist's supplies", ["Herbalism or poisoner's kit", 1]]
	},
	armor : [
		[true, false, false, false],
		[true, false, false, false]
	],
	weapons : [
		[true, false],
		[true, false]
	],
	equipment : "Alchemist starting equipment:\n \u2022 A light crossbow and 20 bolts -or- any simple weapon;\n \u2022 A scholar's pack -or- a dungeoneer's pack;\n \u2022 one vial of alchemist fire -or- two vials of acid -or- one healing potion;\n \u2022 Leather armor, Alchemist Supplies, formula book, and a dagger; \n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Research Focus", ["dawnforgedcast-alchemist-arcane distiller", "dawnforgedcast-alchemist-grenadier", "dawnforgedcast-alchemist-metamorph"]],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	abilitySave : 4,
	spellcastingFactor : 1,
	spellcastingTable : [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 1, 0, 0, 0, 0, 0, 0, 0],
		[4, 1, 0, 0, 0, 0, 0, 0, 0],
		[4, 2, 0, 0, 0, 0, 0, 0, 0],
		[4, 2, 1, 0, 0, 0, 0, 0, 0],
		[4, 3, 1, 0, 0, 0, 0, 0, 0],
		[4, 3, 2, 0, 0, 0, 0, 0, 0],
		[4, 3, 2, 1, 0, 0, 0, 0, 0],
		[4, 3, 3, 1, 0, 0, 0, 0, 0],
		[4, 3, 3, 2, 0, 0, 0, 0, 0],
		[4, 3, 3, 2, 1, 0, 0, 0, 0],
		[4, 3, 3, 3, 1, 0, 0, 0, 0],
		[4, 3, 3, 3, 2, 0, 0, 0, 0],
		[4, 3, 3, 3, 2, 1, 0, 0, 0],
		[4, 3, 3, 3, 3, 1, 0, 0, 0],
		[4, 3, 3, 3, 3, 2, 0, 0, 0],
		[4, 3, 3, 3, 3, 2, 1, 0, 0],
		[4, 3, 3, 3, 3, 2, 1, 0, 0],
		[4, 3, 3, 3, 3, 2, 2, 0, 0]
	],
	spellcastingKnown : {
		cantrips : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
		spells : "book",
		prepared : true
	},
	features : {
		"extracts" : {
			name : "Extracts",
			source : ["DFC:AC", 2],
			minlevel : 1,
			description : desc([
				"I can cast prepared alchemist spells via extracts, using Int as my spellcasting ability",
				"Extracts are ingested and are limited use offensively",
				"I can prepare an extract from any formula I have in my book"
			]),
		},
		"bombs" : {
			name : "Bombs",
			source : ["DFC:AC", 3],
			minlevel : 1,
			description : "\n   " + "I can throw a number of bombs using Dexterity for my attack and damage rolls",
			usages : "Int mod + 1/2 lvl per ",
			usagescalc : "event.value = Math.floor(classes.known['dawnforgedcast-alchemist'].level/2) + What('Int Mod');",
			action : ["action", ""],
			recovery : "long rest",
			eval : "AddWeapon('Bomb');",
			removeeval : "RemoveWeapon('Bomb');",
			calcChanges : {
				atkCalc : ["if (WeaponName === 'bomb') { output.die = output.die.replace('1d6', Math.ceil(classes.known['dawnforgedcast-alchemist'].level / 3) + 'd6'); }; ", ""]
			}
		},
		"swiftalchemy" : {
			name : "Swift Alchemy",
			source : ["DFC:AC", 4],
			minlevel : 2,
			description : desc([
				"I can spend 2 hours to craft 1 item with no ability check required",
			]),
			additional : ["Common Items", "Common Items", "Common Items", "Common Items", "Common Items", "Common Items", "Improved Items", "Improved Items", "Improved Items", "Improved Items", "Improved Items", "Improved Items", "Advanced Items", "Advanced Items", "Advanced Items", "Advanced Items", "Advanced Items", "Advanced Items", "Advanced Items", "Advanced Items"],
			usages : 1,
			recovery : "long rest",
		},
		"mutagen" : {
			name : "Mutagen",
			source : ["DFC:AC", 4],
			minlevel : 2,
			description : desc([
				"I brew a mutagen that lets me transform into a monstrous identity that lasts for 1 hour",
				"See the \"Notes\" page for more details",
			]),
			usages : 1,
			recovery : "long rest",
			action : ["action", ""],
			eval : "AddWeapon(\"Natural Weapons Mutagen\"); AddString(\"Extra.Notes\", \"Mutagen features:\\n\\u25C6 While I am in this new form, I gain the following features:\\n\\u25C6 Natural Weapons (Mutagen 2, HB:DF A 5)\\n   I grow claws, fangs, and all sorts of natural weapons.  I am now proficient in unarmed strike that deal 1d6 damage\\n   I can use my Strength bonus to determine attack and damage rolls\\n\\u25C6 Monstrous Power (Mutagen 2, HB:DF A 5)\\n   I gain advantage on Charisma (Intimidation) checks and get one of the following 3 benefits\\n    - Bear's Endurance: I gain 2d6 temp HP and advantage on Con checks\\n    - Bull's Strength: I gain double carrying capacity and advantage on Str checks\\n    - Cat's Grace: I don't take damage falling 20 ft or less unless incapacitated and gain advantage on Dex checks\\n\\u25C6 Toughened Hide (Mutagen 2, HB:DF A 5)\\n   My skin is hardened and AC is now 13 + Dex Mod\\n\u25C6 Monstrous Cost (Mutagen 2, HB:DF A 5)\\n   I have disadvantage on Intelligence and Charisma checks and saving throws\\n   I can not use my extracts or cast spells through other means\\n   I cannot wear armor, wield a shield, or use a weapon\", true);",
			removeeval : "RemoveWeapon(\"Natural Weapons Mutagen\"); RemoveString(\"Extra.Notes\", \"Mutagen features:\\n\\u25C6 While I am in this new form, I gain the following features:\\n\\u25C6 Natural Weapons (Mutagen 2, HB:DF A 5)\\n   I grow claws, fangs, and all sorts of natural weapons.  I am now proficient in unarmed strike that deal 1d6 damage\\n   I can use my Strength bonus to determine attack and damage rolls\\n\\u25C6 Monstrous Power (Mutagen 2, HB:DF A 5)\\n   I gain advantage on Charisma (Intimidation) checks and get one of the following 3 benefits\\n      Bear's Endurance: I gain 2d6 temp HP and advantage on Con checks\\n      Bull's Strength: I gain double carrying capacity and advantage on Str checks\\n      Cat's Grace: I don't take damage falling 20 ft or less unless incapacitated and gain advantage on Dex checks\\n\\u25C6 Toughened Hide (Mutagen 2, HB:DF A 5)\\n   My skin is hardened and AC is now 13 + Dex Mod\\n\u25C6 Monstrous Cost (Mutagen 2, HB:DF A 5)\\n   I have disadvantage on Intelligence and Charisma checks and saving throws\\n   I can not use my extracts or cast spells through other means\\n   I cannot wear armor, wield a shield, or use a weapon\", true);",
		},
		"subclassfeature3" : {
			name : "Research Focus",
			source : ["DFC:AC", 5],
			minlevel : 3,
			description : "\n   " + "Choose a Research Focus you commit to and put it in the \"Class\" field" + "\n   " + "Choose either the Arcane Distiller, Grenadier, or Metamorph",
		},
		"permanent mutation" : {
			name : "Permanent Mutation",
			source : ["DFC:AC", 5],
			minlevel : 11,
			description : "\n   " + "Use the \"Choose Features\" button above to select a permanent mutation",
			choices : ["Anaerobic Respiration", "Extra Limb (Arm)", "Extra Limb (Tentacle)", "Keen Senses", "Prehensile Tongue", "Prehensile Tail", "Rigid Horns", "Suckers", "Toxified Metabolism", "Vestigial Wings", "Webbed Extremities"],
			"anaerobic respiration" : {
				name : "Permanent Mutation: Anaerobic Respiration",
				source : ["DFC:AC", 5],
				description : "\n   " + "I have played God and permanently altered myself" + "\n   " + "I can hold my breath indefinitely" + "\n   " + "I have advantage on saving throws to resist the effects of inhalation or suffocation based attacks",
			},
			"extra limb (arm)" : {
				name : "Permanent Mutation: Extra Arm Limb",
				source : ["DFC:AC", 5],
				description : "\n   " + "Double dutch rudder, try the triple dutch rudder" + "\n   " + "I can carry and manipulate objects even when my regular arms are occupied" + "\n   " + "I can draw and stow up to two weapons on my turn",
			},
			"extra limb (tentacle)" : {
				name : "Permanent Mutation: Extra Tentacle Limb",
				source : ["DFC:AC", 5],
				description : "\n   " + "I'm a monster, but have a new lucrative career in Blestem pornography" + "\n   " + "I can carry ad manipulate objects even when my regular arms are occupied" + "\n   " + "I can draw and stow up to two weapons on my turn",
			},
			"keen senses" : {
				name : "Permanent Mutation: Keen Senses",
				source : ["DFC:AC", 5],
				description : "\n   " + "I have the senses of a mongoose" + "\n   " + "I gain the senses of a predator and now have darkvision up to 120 ft" + "\n   " + "I have advantage on Wisdom (Perception) checks that rely on smell or hearing.",
				vision : [["Darkvision", 120]]
			},
			"prehensile tail" : {
				name : "Permanent Mutation: Prehensile Tail",
				source : ["DFC:AC", 5],
				description : "\n   " + "I now have a tail, that's kind of cool" + "\n   " + "I can interact with objects up to a range of 10 feet" + "\n   " + "I can pick up items weighing up to 5 pounds, touch an ally or foe or retrieve up to 2 objects at once" + "\n   " + "I can make Dexterity (Sleight of Hand) checks using my tail even if both hands are preoccupied",
			},
			"prehensile tongue" : {
				name : "Permanent Mutation: Prehensile Tongue",
				source : ["DFC:AC", 5],
				description : "\n   " + "I'm a monster" + "\n   " + "I can interact with objects up to a range of 10 feet" + "\n   " + "I can pick up items weighing up to 5 pounds, touch an ally or foe or retrieve up to 2 objects at once" + "\n   " + "I can make Dexterity (Sleight of Hand) checks using my tongue even if both hands are preoccupied",
			},
			"rigid horns" : {
				name : "Permanent Mutation: Rigid Horns",
				source : ["DFC:AC", 5],
				description : "\n   " + "Mess with the horns, ya get the bull" + "\n   " + "As a bonus action, I can try to shove a creatuere when I make a melee attack" + "\n   " + "I can not knock a creature prone using this",
				action : ["bonus action", ""]
			},
			"suckers" : {
				name : "Permanent Mutation: Suckers",
				source : ["DFC:AC", 5],
				description : "\n   " + "Sucks to be me.  Get it?" + "\n   " + "I now have a climb speed of 30 ft" + "\n   " + "I can advantage on any check made to avoid being disarmed",
				speed : { climb : { spd : 30, enc : 20 } }
			},
			"toxified metabolism" : {
				name : "Permanent Mutation: Toxified Metabolism",
				source : ["DFC:AC", 5],
				description : "\n   " + "I licked too much paint" + "\n   " + "I am immune to the poison condition and resistant to poison damage",
			},
			"vestigial wings" : {
				name : "Permanent Mutation: Vestigial Wings",
				source : ["DFC:AC", 5],
				description : "\n   " + "I ran with scissors" + "\n   " + "I can now glide, increasing jump length to 30 ft" + "\n   " + "I can slow my descent up to 60 ft per round, avoiding falling damage and landing on my feet",
			},
			"webbed extremities" : {
				name : "Permanent Mutation: Webbed Extremities",
				source : ["DFC:AC", 5],
				description : "\n   " + "I drink like I swim, like a fish" + "\n   " + "I now have a swim speed of 60 ft",
				speed : { swim : { spd : 60, enc : 50 } }
			}
		},
		"second mutation" : {
			name : "Second Mutation",
			source : ["DFC:AC", 5],
			minlevel : 17,
			description : "\n   " + "Use the \"Choose Features\" button above to select a 2nd permanent mutation",
			choices : ["Anaerobic Respiration", "Extra Limb (Arm)", "Extra Limb (Tentacle)", "Keen Senses", "Prehensile Tongue", "Prehensile Tail", "Rigid Horns", "Suckers", "Toxified Metabolism", "Vestigial Wings", "Webbed Extremities"],
			"anaerobic respiration" : {
				name : "Second Mutation: Anaerobic Respiration",
				source : ["DFC:AC", 5],
				description : "\n   " + "I have played God and permanently altered myself" + "\n   " + "I can hold my breath indefinitely" + "\n   " + "I have advantage on saving throws to resist the effects of inhalation or suffocation based attacks",
			},
			"extra limb (arm)" : {
				name : "Second Mutation: Extra Arm Limb",
				source : ["DFC:AC", 5],
				description : "\n   " + "Double dutch rudder, try the triple dutch rudder" + "\n   " + "I can carry and manipulate objects even when my regular arms are occupied" + "\n   " + "I can draw and stow up to two weapons on my turn",
			},
			"extra limb (tentacle)" : {
				name : "Second Mutation: Extra Tentacle Limb",
				source : ["DFC:AC", 5],
				description : "\n   " + "I'm a monster, but have a new lucrative career in Blestem pornography" + "\n   " + "I can carry ad manipulate objects even when my regular arms are occupied" + "\n   " + "I can draw and stow up to two weapons on my turn",
			},
			"keen senses" : {
				name : "Second Mutation: Keen Senses",
				source : ["DFC:AC", 5],
				description : "\n   " + "I have the senses of a mongoose" + "\n   " + "I gain the senses of a predator and now have darkvision up to 120 ft" + "\n   " + "I have advantage on Wisdom (Perception) checks that rely on smell or hearing.",
				vision : [["Darkvision", 120]]
			},
			"prehensile tail" : {
				name : "Second Mutation: Prehensile Tail",
				source : ["DFC:AC", 5],
				description : "\n   " + "I now have a tail, that's kind of cool" + "\n   " + "I can interact with objects up to a range of 10 feet" + "\n   " + "I can pick up items weighing up to 5 pounds, touch an ally or foe or retrieve up to 2 objects at once" + "\n   " + "I can make Dexterity (Sleight of Hand) checks using my tail even if both hands are preoccupied",
			},
			"prehensile tongue" : {
				name : "Second Mutation: Prehensile Tongue",
				source : ["DFC:AC", 5],
				description : "\n   " + "I'm a monster" + "\n   " + "I can interact with objects up to a range of 10 feet" + "\n   " + "I can pick up items weighing up to 5 pounds, touch an ally or foe or retrieve up to 2 objects at once" + "\n   " + "I can make Dexterity (Sleight of Hand) checks using my tongue even if both hands are preoccupied",
			},
			"rigid horns" : {
				name : "Second Mutation: Rigid Horns",
				source : ["DFC:AC", 5],
				description : "\n   " + "Mess with the horns, ya get the bull" + "\n   " + "As a bonus action, I can try to shove a creatuere when I make a melee attack" + "\n   " + "I can not knock a creature prone using this",
				action : ["bonus action", ""]
			},
			"suckers" : {
				name : "Second Mutation: Suckers",
				source : ["DFC:AC", 5],
				description : "\n   " + "Sucks to be me.  Get it?" + "\n   " + "I now have a climb speed of 30 ft" + "\n   " + "I can advantage on any check made to avoid being disarmed",
				speed : { climb : { spd : 30, enc : 20 } }
			},
			"toxified metabolism" : {
				name : "Second Mutation: Toxified Metabolism",
				source : ["DFC:AC", 5],
				description : "\n   " + "I licked too much paint" + "\n   " + "I am immune to the poison condition and resistant to poison damage",
			},
			"vestigial wings" : {
				name : "Second Mutation: Vestigial Wings",
				source : ["DFC:AC", 5],
				description : "\n   " + "I ran with scissors" + "\n   " + "I can now glide, increasing jump length to 30 ft" + "\n   " + "I can slow my descent up to 60 ft per round, avoiding falling damage and landing on my feet",
			},
			"webbed extremities" : {
				name : "Second Mutation: Webbed Extremities",
				source : ["DFC:AC", 5],
				description : "\n   " + "I drink like I swim, like a fish" + "\n   " + "I now have a swim speed of 60 ft",
				speed : { swim : { spd : 60, enc : 50 } }
			}
		}
	}
}

ClassSubList["dawnforgedcast-alchemist-arcane distiller"] = {
	regExpSearch : /^(?=.*alchemist)(?=.*arcane)(?=.*distiller).*$/i,
	subname : "Arcane Distiller",
	source : ["DFC:AC", 7],
	features : {
		"subclassfeature3" : {
			name : "Infusion",
			source : ["DFC:AC", 3],
			minlevel : 3,
			description : "\n   " + "I can provide my extracts to be used by others" + "\n   " + "I still roll any concentration saving throws, others use an action to consume",
			usages : "Int mod per ",
			usagescalc : "event.value = What('Int Mod');",
			action : ["action", ""],
			recovery : "long rest"
		},
		"subclassfeature3.1" : {
			name : "Arcane Poisons",
			source : ["DFC:AC", 8],
			minlevel : 3,
			description : "\n   " + "I can now coat a weapon or ammo in a spell" + "\n   " + "The effect requires no concentration to cast" + "\n   " + "The spells lasts a number of rounds equal to my prof bonus or the spell duration, whichever is less",
			spellcastingBonus : {
				name : "Arcane Poisons",
				spells : ["bane", "command", "faerie fire", "hideous laughter", "blindness", "crown of madness", "hold person", "ray of enfeeblement", "bestow curse", "dispel magic", "fear", "slow", "blight", "confusion", "elemental bane", "polymorph"]
			}
		},
		"subclassfeature1" : {
			name : "Combine Extracts",
			source : ["DFC:AC", 8],
			minlevel : 5,
			description : "\n   " + "I can combine 2 spells by expending 2 spell slots to create a single extract" + "\n   " + "Can use this in conjunction with infusion",
			action : ["action", ""],
		},
		"subclassfeature5.1" : {
			name : "Bottled Ooze",
			source : ["DFC:AC", 7],
			minlevel : 5,
			description : "\n   " + "I create a living animated ooze, please see the ooze table",
		},
		"subclassfeature10" : {
			name : "Efficient Alchemy",
			source : ["DFC:AC", 8],
			minlevel : 10,
			description : "\n   " + "My swift alchemy now allows me to craft 2 items at once",
		},
		"subclassfeature10.1" : {
			name : "Stable Formulas",
			source : ["DFC:AC", 8],
			minlevel : 10,
			description : "\n   " + "I gain advantage on all concentration checks for my extracts",
		},
		"subclassfeature14" : {
			name : "Permanent Extract",
			source : ["DFC:AC", 8],
			minlevel : 14,
			description : "\n   " + "I can now permanently gain the benefit of a 2nd lvl extract or lower" + "\n   " + "Lasts until I dispel it or use another extract",
			usages : 1,
			recovery : "long rest",
		},
		"subclassfeature20" : {
			name : "Grand Discovery",
			source : ["DFC:AC", 8],
			minlevel : 20,
			description : "\n   " + "Use the \"Choose Features\" button above to select a grand alchemical discovery",
			choices : ["Eternal Youth", "Legendary Distiller", "Philosophers Stone", "Secret Formula"],
			"eternal youth" : {
				name : "Grand Discovery: Eternal Youth",
				source : ["DFC:AC", 8],
				description : "\n   " + "You now select your age and stay there permanently" + "\n   " + "Gain 2 Con and increase base movement by 10 ft",
			},
			"legendary distiller" : {
				name : "Grand Discovery: Legendary Distiller",
				source : ["DFC:AC", 8],
				description : "\n   " + "Using swift alchemy I can now craft 3 items at once" + "\n   " + "I can craft legendary items" + "\n   " + "I can charge up to 5x market rates on my sales",
			},
			"philosophers stone" : {
				name : "Grand Discovery: Philosophers Stone",
				source : ["DFC:AC", 8],
				description : "\n   " + "I can create 1 Philosopher's stone per month" + "\n   " + "Stone trns 5k lbs of iron into silver (worth 25k GP)",
			},
			"secret formula" : {
				name : "Grand Discovery: Secret Formula",
				source : ["DFC:AC", 8],
				description : "\n   " + "I gain 8th level spells I can now use or expend the spell slot to create an Ooze",
				spellcastingBonus : {
					name : "Secret Formula",
					spells : ["antipathy/sympathy", "clone", "glibness", "mind blank", "telepathy"],
					selection : ["antipathy/sympathy", "clone", "glibness", "mind blank", "telepathy"],
					times : 5
				}
			}
		}
	}
}

ClassSubList["dawnforgedcast-alchemist-grenadier"] = {
	regExpSearch : /^(?=.*alchemist)(?=.*grenadier).*$/i,
	subname : "Grenadier",
	source : ["DFC:AC", 7],
	features : {
		"bombs" : {
			name : "Bombs",
			source : ["DFC:AC", 3],
			minlevel : 3,
			description : "\n   " + "I can throw a number of explosives per day" + "\n   " + "As a Grenadier I gain an additional 3 bombs",
			usages : "Int mod + 3 + 1/2 lvl per ",
			usagescalc : "event.value = Math.floor(classes.known['dawnforgedcast-alchemist'].level/2) + 3 + tDoc.getField('Int Mod').value;",
			action : ["action", ""],
			recovery : "long rest",
			eval : "AddWeapon(\"Bomb\");",
			removeeval : "RemoveWeapon(\"Bomb\");"
		},
		"subclassfeature3.1" : {
			name : "Bomb Admixture",
			source : ["DFC:AC", 7],
			minlevel : 3,
			description : "\n   " + "I can admix extra ingredients to my bombs to give them spell like effects" + "\n   " + "Admixed bombs deal half damage, or none if I wish" + "\n   " + "The effect lasts only my proficiency bonus in rounds, but doesn't require concentration" + "\n   " + "The spells are now accessible in your formula book",
			spellcastingBonus : {
				name : "Bomb Admixture",
				spells : ["entangle", "faerie fire", "fog", "cloud", "grease", "darkness", "silence", "spike growth", "zone of truth", "hungering void", "sleet storm", "stinking cloud", "wind wall", "black tentacles", "hallucinatory terrain", "storm sphere", "wall of fire"],
				times : 2
			},
			spellFirstColTitle : "BA",
		},
		"subclassfeature5" : {
			name : "Considerate Bomber",
			source : ["DFC:AC", 7],
			minlevel : 5,
			description : "\n   " + "When using a bomb, I can select a number of creatures up to my Int mod to not be effected by splash damage" + "\n   " + "If I miss, my attempt at being considerate has no effect",
		},
		"subclassfeature5.1" : {
			name : "Explosive Bombs",
			source : ["DFC:AC", 7],
			minlevel : 5,
			description : "\n   " + "I can expend a spell slot to increase splash damage radius by 5ft/level of spell slot expended",
		},
		"subclassfeature10" : {
			name : "Elemental Bombs",
			source : ["DFC:AC", 8],
			minlevel : 10,
			description : "\n   " + "I can make my bombs deal any type of elemental damage, not just fire." + "\n   " + "Before throwing a bomb, choose between acid, cold, fire, lightning, or thunder",
		},
		"subclassfeature10.1" : {
			name : "Debilitating Bombs",
			source : ["DFC:AC", 8],
			minlevel : 10,
			description : "\n   " + "I can expend a 2nd level or higher spell slot to cause an aditional effect: blind, deafen, or poison" + "\n   " + "On a hit, creaute must make a Con Saving throw or suffer condition for 1 minute." + "\n   " + "Creature can make additional Con saving throws at the end of their turn, condition ends on a successful save." + "\n   " + "Effect does not extend to splash damage.",
		},
		"subclassfeature14" : {
			name : "Rapid Bomber",
			source : ["DFC:AC", 8],
			minlevel : 14,
			description : "\n   " + "I can now throw up to 2 bombs at once during an attack action, but do so at disadvantage",
		},
		"subclassfeature20" : {
			name : "Grand Discovery",
			source : ["DFC:AC", 8],
			minlevel : 20,
			description : "\n   " + "Use the \"Choose Features\" button above to add a grand alchemical discovery to your bombs",
			choices : ["Cataclysmic Bomb", "High Octane Cocktail", "Mad Bomber", "Volatile Barrage"],
			"cataclysmic bomb" : {
				name : "Cataclysmic Bomb",
				source : ["DFC:AC", 8],
				description : "\n   " + "The base splash damage radius for my bombs is now 10 ft",
			},
			"high octane cockail" : {
				name : "High Octane Cocktail",
				source : ["DFC:AC", 8],
				description : "\n   " + "Instead of base d6 damage, my bombs now deal d8",
				calcChanges : {
					atkCalc : ["if (WeaponName === 'bomb') { output.die = output.die.replace('1d6', Math.ceil(classes.known['dawnforgedcast-alchemist'].level/3) + 'd8'); }; ", ""]
				}
			},
			"mad bomber" : {
				name : "Mad Bomber",
				source : ["DFC:AC", 8],
				description : "\n   " + "I no longer have a limit to the number of bombs I prepare",
			},
			"volatile barrage" : {
				name : "Volatile Barrage",
				source : ["DFC:AC", 8],
				description : "\n   " + "I no longer have disadvantage on throwing multiple bombs from the Rapid Bomber feature",
			},
		}
	}
}

ClassSubList["dawnforgedcast-alchemist-metamorph"] = {
	regExpSearch : /^(?=.*alchemist)(?=.*metamorph).*$/i,
	subname : "Metamorph",
	source : ["DFC:AC", 7],
	features : {
		"subclassfeature3" : {
			name : "Mutagen",
			source : ["DFC:AC", 6],
			minlevel : 3,
			description : desc([
					"I brew a mutagen that lets me transform into a monstrous identity that lasts for 1 hour.",
					"See the \"Notes\" page for more details.",
				]),
			usages : 1,
			recovery : "short rest",
			action : ["action", ""],
		},
		"subclassfeature3.1" : {
			name : "Mutagen Admixture",
			source : ["DFC:AC", 6],
			minlevel : 3,
			description : "\n   " + "I can admix extra ingredients to my mutagen" + "\n   " + "Doing so allows me to use the spell for as long as my mutation lasts, no concentration required",
			spellcastingBonus : {
				name : "Mutagen Admixture",
				spells : ["disguise self", "jump", "longstrider", "speak with animals", "barkskin", "darkvision", "enlarge/reduce", "spider climb", "elemental weapon", "protection from energy", "water walk", "freedom of movement", "stoneskin"]
			}
		},
		"subclassfeature5" : {
			name : "Feral Mutagen",
			source : ["DFC:AC", 6],
			minlevel : 5,
			description : "\n   " + "I can now attack twice using my natural weapons from my mutagen" + "\n   " + "See \"Notes\" for more details",
			eval : "AddString(\"Extra.Notes\", \"Feral Mutagen features:\\n\\u25C6 I now have the ability while mutated to select one of the following:\\n      Blood Frenzy: I gain advantage on melee attacks if I have less than half HP\\n      Feral Pounce: I can charge as an action if I move a straight line of 20+ft to my target.  Target must make a Str Saving Throw, against my Str+8+Prof.  If knocked down I can take a bonus action to attack with my natural weapons.\\n      Hunter: Gain darkvision out to 60ft (120ft if I already have it), and gain advantage on Wisdom (Perception) checks for sent or hearing.\\n      Iron Hide: My Base AC becomes 13 + Dex + Con.\\n      Rampage: When I down a target to 0hp using natural weapons, I can move half my speak and make an additional attack against another target.\\n      Relentless: If I get downed but not killed, I can reduce the dmg to bring me to 1hp instead, can't use again until short/\long rest.\\n      Stalker: I gain advantage on Dexterity (Stealth) checks and can move at full speed while stealthed.  Any surprised creature attacked is automatically critted.\", true);",
			removeeval : "RemoveString(\"Extra.Notes\", \"Feral Mutagen features:\\n\\u25C6 I now have the ability while mutated to select one of the following:\\n      Blood Frenzy: I gain advantage on melee attacks if I have less than half HP\\n      Feral Pounce: I can charge as an action if I move a straight line of 20+ft to my target.  Target must make a Str Saving Throw, against my Str+8+Prof.  If knocked down I can take a bonus action to attack with my natural weapons.\\n      Hunter: Gain darkvision out to 60ft (120ft if I already have it), and gain advantage on Wisdom (Perception) checks for sent or hearing.\\n      Iron Hide: My Base AC becomes 13 + Dex + Con.\\n      Rampage: When I down a target to 0hp using natural weapons, I can move half my speak and make an additional attack against another target.\\n      Relentless: If I get downed but not killed, I can reduce the dmg to bring me to 1hp instead, can't use again until short/\long rest.\\n      Stalker: I gain advantage on Dexterity (Stealth) checks and can move at full speed while stealthed.  Any surprised creature attacked is automatically critted.\", true);",
		},
		"subclassfeature10" : {
			name : "Greater Mutagen",
			source : ["DFC:AC", 7],
			minlevel : 10,
			description : "\n   " + "I can now select 2 Feral Mutagen options and 2 monstrous power benefits." + "\n   " + "My natural weapons now do 1d8 damage",
			calcChanges : {
				atkCalc : ["if (WeaponName === 'natural weapons mutagen') { output.die = output.die.replace('1d6', '1d8'); }; ", ""]
			}
		},
		"subclassfeature14" : {
			name : "Supreme Mutagen",
			source : ["DFC:AC", 7],
			minlevel : 14,
			description : "\n   " + "I now have all 3 monstrous power benefits" + "\n   " + "I now regen every while mutated equal to my Prof bonus, once a round in combat, once a minute outside of combat",
		},
		"subclassfeature20" : {
			name : "Grand Discovery",
			source : ["DFC:AC", 7],
			minlevel : 20,
			description : "\n   " + "Use the \"Choose Features\" button above to add a grand alchemical discovery to your bombs",
			choices : ["Embrace the Beast", "Frenzied Regeneration", "Tainted Claws", "Unyielding Hide"],
			"embrace the beast" : {
				name : "Embrace the Beast",
				source : ["DFC:AC", 7],
				description : "\n   " + "I no longer suffer any of the penalties from the mutagen",
			},
			"frenzied regeneration" : {
				name : "Frenzied Regeneration",
				source : ["DFC:AC", 7],
				description : "\n   " + "I now regain an additional 12 HP regen, stacking with Supreme Mutagen",
			},
			"tainted claws" : {
				name : "Tainted Claws",
				source : ["DFC:AC", 7],
				description : "\n   " + "My claws now deal 2d6 damage and poison for 1 minute, Con saving throw",
				calcChanges : {
					atkCalc : ["if (WeaponName === 'natural weapons mutagen') { output.die = output.die.replace('1d8', '2d6'); }; ", ""]
				}
			},
			"unyielding hide" : {
				name : "Unyielding Hide",
				source : ["DFC:AC", 7],
				description : "\n   " + "I now resist all damage except psychic damage",
			},
		}
	}
};

//create the Bomb attack option
WeaponsList["bomb"] = {
	regExpSearch : /^(?=.*bomb).*$/i,
	name : "Bomb",
	source : ["DFC:AC", 3],
	ability : 2,
	type : "Natural",
	damage : [1, 6, "Fire"],
	range : "30/60 ft",
	description : "Deal additional dmg in a 5-ft radius equal to Int mod + # of Dmg die",
	abilitytodamage : false,
	modifiers : ["", "Int"],
	monkweapon : false
};
WeaponsList["natural weapons mutagen"] = {
	regExpSearch : /^(?=.*natural)(?=.*weapons)(?=.*mutagen).*$/i,
	name : "Natural Weapons Mutagen",
	source : ["DFC:AC", 4],
	ability : 1,
	type : "Natural",
	damage : [1, 6, "All"],
	range : "melee",
	description : "Usable when I go into my mutagenic form, gaining claws, fangs, spines, etc.",
	abilitytodamage : true,
	monkweapon : false
};

//add the source
SourceList["DFC:AC"] = {
	name : "DawnforgedCast: Alchemist Class",
	abbreviation : "DFC:AC",
	group : "Homebrew",
	url : "https://dawnforgedcast.myshopify.com/products/5th-edition-alchemist-class"
};
