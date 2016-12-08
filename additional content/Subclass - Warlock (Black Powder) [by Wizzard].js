/*  -WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
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
	Date:       2016-12-01 (sheet v12.62)
 */

ClassSubList["blackpowder"] = {
	regExpSearch : /^(?=.*\bblack)(?=.*powder\b).*$/i,
	subname : "Black Powder",
	spellcastingExtra : ["identify", "shield", "continual flame", "magic weapon", "phantom steed", "lightning arrow", "freedom of movement", "faithful hound", "conjure volley", "swift quiver"],
	features : {
		"subclassfeature1" : {
			name : "Shoot First",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "I gain the use of the crossbow expert feat" + "\n   " + "In addition, I can reload a firearm once per turn without using an action",
			eval : "for (var iFeat = 1; iFeat < FieldNumbers.feats; iFeat++) { if(!What(\"Feat Name \" + iFeat)) { Value(\"Feat Name \" + iFeat, \"Crossbow Expert\"); AddString(\"Feat Note \" + iFeat, \"from Shoot First\", \" \"); break; }; };",
			removeeval : "for (var iFeat = 0; iFeat < FieldNumbers.feats; iFeat++) { if(What(\"Feat Name \" + iFeat) === \"Crossbow Expert\") { this.resetForm([\"Feat Name \" + iFeat, \"Feat Note \" + iFeat]); break; }; };",
		},
		"subclassfeature1.1" : {
			name : "Powder and Blade",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with a martial weapon/firearm of my choice, my signature weapon" + "\n   " + "While wielding this weapon and nothing else, I may use Cha for to hit and damage rolls" + "\n   " + "My signature weapon may be used with the Blade of the Pact class feature" + "\n   " + "My signature weapon counts as magical for the purpose of overcoming resistances" + "\n   " + "I may use my signature weapon as a spellcasting focus",
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
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning arctic terrain" + "\n   " + "While traveling for an hour or more in arctic terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
			"coast" : {
				name : "Coast",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning coast terrain" + "\n   " + "While traveling for an hour or more in coast terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
			"desert" : {
				name : "Desert",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning desert terrain" + "\n   " + "While traveling for an hour or more in desert terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
			"forest" : {
				name : "Forest",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning forest terrain" + "\n   " + "While traveling for an hour or more in forest terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
			"grassland" : {
				name : "Grassland",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning grassland terrain" + "\n   " + "While traveling for an hour or more in grassland terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
			"mountain" : {
				name : "Mountain",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning mountain terrain" + "\n   " + "While traveling for an hour or more in mountain terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
			"swamp" : {
				name : "Swamp",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning swamp terrain" + "\n   " + "While traveling for an hour or more in swamp terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
			"underdark" : {
				name : "Underdark",
				source : ["HB", 0],
				description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning underdark terrain" + "\n   " + "While traveling for an hour or more in underdark terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing",
			},
		},
		"subclassfeature10" : {
			name : "Hardened",
			source : ["HB", 0],
			minlevel : 10,
			description : "\n   " + "I can't be frightened",
			save : "Immune to being frightened",
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
				selection : ["finger of death"],
			}
		}
	}
}

ClassList.warlock.subclasses[1].push("blackpowder");