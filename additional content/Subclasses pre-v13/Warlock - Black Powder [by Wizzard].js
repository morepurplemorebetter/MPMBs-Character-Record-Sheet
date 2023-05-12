/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Warlock, called "Black Powder"
				This subclass is made by Wizzard
	Code by:	Wizzard
	Date:		2017-11-29 (sheet v12.999)
*/

var iFileName = "Warlock - Black Powder [by Wizzard].js";
RequiredSheetVersion(12.999);

AddSubClass("warlock", "black powder", {
	regExpSearch : /^(?=.*\bblack)(?=.*powder\b).*$/i,
	subname : "Black Powder",
	source : ["HB", 0],
	spellcastingExtra : ["identify", "shield", "continual flame", "magic weapon", "phantom steed", "lightning arrow", "freedom of movement", "faithful hound", "conjure volley", "swift quiver"],
	features : {
		"subclassfeature1" : {
			name : "Fighting Style",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "Choose a Fighting Style for the warlock using the \"Choose Feature\" button above",
			choices : ["Archery", "Close Quarters Shooting", "Dueling", "Great Weapon Fighting", "Mariner"],
			"archery" : FightingStyles.archery,
			"close quarters shooting" : {
				name : "Close Quarters Shooting Fighting Style",
				source : ["UA:LDU", 1],
				description : "\n   " + "+1 bonus to attack rolls I make with ranged attacks" + "\n   " + "I don't have disadvantage when making a ranged attack while within 5 ft of a hostile" + "\n   " + "My ranged attacks ignore half and three-quarters cover against targets within 30 ft",
				calcChanges : {
					atkCalc : ["if (isRangedWeapon) {output.extraHit += 1; }; ", "My ranged weapons get a +1 bonus on the To Hit."]
				}
			},
			"dueling" : FightingStyles.dueling,
			"great weapon fighting" : FightingStyles.great_weapon,
			"mariner" : {
				name : "Mariner Fighting Style",
				source : ["UA:WA", 3],
				description : "\n   " + "While not wearing heavy armor or using a shield, I gain +1 AC and swim/climb speed" + "\n   " + "The swimming and climbing speeds are equal to my current walking speed",
				speed : {
					climb : { spd : "walk", enc : "walk" },
					swim : { spd : "walk", enc : "walk" }
				},
				eval : "AddACMisc(1, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\", \"ACshield || tDoc.getField('Heavy Armor').isBoxChecked(0)\")",
				removeeval : "AddACMisc(0, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\")"
			}
		},
		"subclassfeature1.1" : {
			name : "Powder and Blade",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with a martial weapon/firearm of my choice, my signature weapon" + "\n   " + "While wielding this weapon and nothing else, I may use Cha for to hit and damage rolls" + "\n   " + "My signature weapon may be used with the Blade of the Pact class feature" + "\n   " + "My signature weapon counts as magical for the purpose of overcoming resistances" + "\n   " + "I may use my signature weapon as a spellcasting focus",
			calcChanges : {
				atkAdd : ["if ((/signature/i).test(WeaponText) && What(AbilityScores.abbreviations[fields.Mod - 1] + ' Mod') < What('Cha Mod')) {fields.Mod = 6; }; ", "If a weapon has the word 'signature' in its name or description field, it will use the Charisma modifier for to hit and damage if better than its normal ability modifier."]
			}
		},
		"subclassfeature6" : {
			name : "Natural Explorer",
			source : ["HB", 0],
			minlevel : 6,
			description : "\n   " + "Use the \"Choose Features\" button above to add a favored terrain to the third page",
			additional : ["", "", "", "", "", "1 favored terrains", "1 favored terrains", "1 favored terrains", "1 favored terrains", "2 favored terrains", "2 favored terrains", "2 favored terrains", "2 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains"],
			extraname : "Favored Terrain",
			extrachoices : ["Arctic", "Coast", "Desert", "Forest", "Grassland", "Mountain", "Swamp", "Underdark"],
			"arctic" : {
				name : "Arctic",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning arctic terrain" + "\n   " + "While traveling for an hour or more in arctic terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
			"coast" : {
				name : "Coast",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning coast terrain" + "\n   " + "While traveling for an hour or more in coast terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
			"desert" : {
				name : "Desert",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning desert terrain" + "\n   " + "While traveling for an hour or more in desert terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
			"forest" : {
				name : "Forest",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning forest terrain" + "\n   " + "While traveling for an hour or more in forest terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
			"grassland" : {
				name : "Grassland",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning grassland terrain" + "\n   " + "While traveling for an hour or more in grassland terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
			"mountain" : {
				name : "Mountain",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning mountain terrain" + "\n   " + "While traveling for an hour or more in mountain terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
			"swamp" : {
				name : "Swamp",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning swamp terrain" + "\n   " + "While traveling for an hour or more in swamp terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
			"underdark" : {
				name : "Underdark",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning underdark terrain" + "\n   " + "While traveling for an hour or more in underdark terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
			},
		},
		"subclassfeature10" : {
			name : "Hardened",
			source : ["HB", 0],
			minlevel : 10,
			description : "\n   " + "I can't be frightened",
			savetxt : { immune : ["frightened"] }
		},
		"subclassfeature14" : {
			name : "Killing strike",
			source : ["HB", 0],
			minlevel : 14,
			description : "\n   " + "As a bonus action when I successfully hit a target, I can cast Finger of Death" + "\n   " + "The spell is cast as if using my highest level warlock spell slot, but does not expend any",
			usages : 1,
			additional : ["", "", "", "", "", "", "", "", "", "", "", "", "", "as 7th-level spell", "as 8th-level spell", "as 8th-level spell", "as 9th-level spell", "as 9th-level spell", "as 9th-level spell", "as 9th-level spell"],
			recovery : "long rest",
			action : ["bonus action", ""],
			spellcastingBonus : {
				name : "Killing Strike",
				spells : ["finger of death"],
				selection : ["finger of death"]
			}
		}
	}
});

if (!SourceList["UA:WA"]) {
	SourceList["UA:WA"] = {
		name : "Unearthed Arcana: Waterborne Adventures",
		abbreviation : "UA:WA",
		group : "Unearthed Arcana",
		url : "https://media.wizards.com/2015/downloads/dnd/UA_Waterborne_v3.pdf",
		date : "2015/05/04"
	};
};
if (!SourceList["UA:LDU"]) {
	SourceList["UA:LDU"] = {
		name : "Unearthed Arcana: Light, Dark, Underdark!",
		abbreviation : "UA:LDU",
		group : "Unearthed Arcana",
		url : "https://media.wizards.com/2015/downloads/dnd/02_UA_Underdark_Characters.pdf",
		date : "2015/11/02"
	};
};
