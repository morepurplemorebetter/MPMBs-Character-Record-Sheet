/*  -WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*  -INFORMATION-
	Subject:    Subclass
	Effect:     This script adds a subclass for the Warlock, called "Black Powder"
				This subclass is made by Wizzard
	Code by:    Wizzard
	Date:       2017-02-18 (sheet v12.83)
*/

ClassSubList["black powder"] = {
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
			"archery" : {
				name : "Archery Fighting Style",
				source : ["P", 72],
				description : "\n   " + "+2 bonus to attack rolls I make with ranged weapons",
				calcChanges : {
					atkCalc : ["if (isRangedWeapon) {output.extraHit += 2; }; ", "My ranged weapons get a +2 bonus on the To Hit."]
				}
			},
			"close quarters shooting" : {
				name : "Close Quarters Shooting Fighting Style",
				source : ["UA:LDU", 1],
				description : "\n   " + "+1 bonus to attack rolls I make with ranged attacks" + "\n   " + "I don't have disadvantage when making a ranged attack while within 5 ft of a hostile" + "\n   " + "My ranged attacks ignore half and three-quarters cover against targets within 30 ft",
				calcChanges : {
					atkCalc : ["if (isRangedWeapon) {output.extraHit += 1; }; ", "My ranged weapons get a +1 bonus on the To Hit."]
				}
			},
			"dueling" : {
				name : "Dueling Fighting Style",
				source : ["P", 72],
				description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons",
				calcChanges : {
					atkCalc : ["var areOffHands = function(n){for(var i=1;i<=n;i++){if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) {return true; }; }; }(FieldNumbers.actions); if (!areOffHands && isMeleeWeapon && !(/\\b(2|two).?hand(ed)?s?\\b/i).test(theWea.description)) {output.extraDmg += 2; }; ", "When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."]
				}
			},
			"great weapon fighting" : {
				name : "Great Weapon Fighting Style",
				source : ["P", 72],
				description : "\n   " + "Reroll 1 or 2 on damage if wielding two-handed/versatile melee weapon in both hands",
				calcChanges : {
					atkAdd : ["if (isMeleeWeapon && (/\\b(versatile|(2|two).?hand(ed)?s?)\\b/i).test(theWea.description)) {fields.Description += (fields.Description ? '; ' : '') + 'Re-roll 1 or 2 on damage die' + ((/versatile/i).test(fields.Description) ? ' when two-handed' : ''); }; ", "While wielding a two-handed or versatile melee weapon in two hands, I can re-roll a 1 or 2 on any damage die once."]
				}
			},
			"mariner" : {
				name : "Mariner Fighting Style",
				source : ["UA:WA", 3],
				description : "\n   " + "While not wearing heavy armor or using a shield, I gain +1 AC and swim/climb speed" + "\n   " + "The swimming and climbing speeds equal my current walking speed",
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
			save : "Immune to being frightened"
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
};
ClassList.warlock.subclasses[1].push("black powder");

SourceList["UA:WA"] = {
	name : "Unearthed Arcana: Waterborne Adventures", //2015-05-04
	abbreviation : "UA:WA",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2015/downloads/dnd/UA_Waterborne_v3.pdf"
};
SourceList["UA:LDU"] = {
	name : "Unearthed Arcana: Light, Dark, Underdark!", //2015-11-02
	abbreviation : "UA:LDU",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2015/downloads/dnd/02_UA_Underdark_Characters.pdf"
};