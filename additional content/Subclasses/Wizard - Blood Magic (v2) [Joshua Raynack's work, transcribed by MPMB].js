/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Wizard, called "Blood Magic" (version 2)
				This is taken from Dungeon Masters Guild (https://www.dmsguild.com/product/170966) and is the version from 9th of May 2016
				That product contains two versions of the arcane tradition called Blood Magic. This code is for version 2
				This subclass is made by Joshua Raynack
	Code by:	MorePurpleMoreBetter
	Date:		2018-04-07 (sheet v12.999)
	
	Please support the creator of this content (Joshua Raynack) and download his material from DM Guild: https://www.dmsguild.com/browse.php?author=Joshua%20Raynack
*/

var iFileName = "Wizard - Blood Magic (v2) [Joshua Raynack's work, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["JR:BM"] = {
	name : "Joshua Raynack - Blood Magic",
	abbreviation : "JR:BM",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/170966",
	date : "2016/05/09"
};

AddSubClass("wizard", "blood magic-v2", {
	regExpSearch : /^((?=.*wizard)(?=.*blood)(?=.*magic)|(?=.*blood)(?=.*(mage|magus))).*$/i,
	subname : "Blood Magic",
	source : ["JR:BM", 10],
	fullname : "Blood Mage",
	features : {
		"subclassfeature2" : {
			name : "Blood Savant",
			source : ["JR:BM", 12],
			minlevel : 2,
			description : desc([
				"I gain proficiency and expertise with the Medicine skill",
				"Whenever I use my Arcane Recovery feature, I also regain one expended hit die"
			]),
			skill : ["Medicine"],
			eval : "AddSkillProf('Med', true, true)",
			skillstxt : "\n\n" + toUni("Blood Savant (Blood Magic 2)") + ": Proficiency and expertise with Medicine."
		},
		"subclassfeature2.1" : {
			name : "Blood Magic",
			source : ["JR:BM", 12],
			minlevel : 2,
			description : desc([
				"As an action, I can inflict a ritualistic, hemophilic wound on myself without losing HP",
				"Opening this wound gives me a number of Blood Points that I can use for my Blood Rites",
				"I can only inflict one such wound per long rest; It closes when I have no Blood Points left",
				"Whenever I receive any healing, I lose 1 Blood Point (regardless of amount of HP healed)"
			]),
			action : ["action", " (open wound)"],
			usages : levels.map(function (n) {
				return n < 2 ? "" : n < 5 ? 2 : n < 9 ? 3 : n < 13 ? 4 : n < 17 ? 5 : 6;
			}),
			recovery : "long rest",
			additional : "Blood Points"
		},
		"subclassfeature2.2" : {
			name : "Blood Rites",
			source : ["JR:BM", 12],
			minlevel : 2,
			description : desc([
				"Use the \"Choose Feature\" button above to add 2 blood rites to the third page",
				"Whenever I gain a wizard level, I can replace a blood rite I know with another"
			]),
			extraname : "Blood Rite",
			extrachoices : ["Blood Focus", "Blood Ritual", "Blood Spell", "Fortitude of Blood", "Phantom Vigor", "Potent Blood", "Silence the Pain"],
			"blood focus" : {
				name : "Blood Focus",
				source : ["JR:BM", 13],
				description : desc([
					"When I cast a spell with a material component that is not costly, I can use 1 blood point",
					"I can then cast this spell while ignoring the material component"
				]),
				additional : "1 blood point"
			},
			"blood ritual" : {
				name : "Blood Ritual",
				source : ["JR:BM", 13],
				description : desc([
					"By using 2 blood points, I cast a 1st-level ritual spell from any class' spell list as a ritual"
				]),
				additional : "2 blood points"
			},
			"blood spell" : {
				name : "Blood Spell",
				source : ["JR:BM", 13],
				description : desc([
					"I can expend blood points instead of spell slots to cast my spells, as follows:",
					[	"1st-level: 2 BP;",
						"2nd-level: 3 BP;",
						"3rd-level: 5 BP;",
						"4th-level: 6 BP;"].join("           "),
					"I must have the spell prepared and meet the minimum class level for higher spell levels"
				]),
				additional : levels.map(function (n) {
					return n < 2 ? "" : "max " + (n < 5 ? "1st" : n < 13 ? "2nd" : n < 17 ? "3rd" : "4th") + "-level spells";
				})
			},
			"fortitude of blood" : {
				name : "Fortitude of Blood",
				source : ["JR:BM", 13],
				description : desc([
					"If I expend 1 blood point, I can concentrate (as a spell) to gain proficiency with Con saves"
				]),
				additional : "1 blood point"
			},
			"phantom vigor" : {
				name : "Phantom Vigor",
				source : ["JR:BM", 13],
				description : desc([
					"As a bonus action when I cast a wizard cantrip, I can gain temporary hit points",
					"I expend 1 blood point to gain 1d4+4 temporary HP"
				]),
				additional : "1 blood point",
				action : ["bonus action", ""]
			},
			"potent blood" : {
				name : "Potent Blood",
				source : ["JR:BM", 13],
				description : desc([
					"When I cast a wizard cantrip that does damage, I can use 1 blood point to increase it",
					"I can then add my proficiency bonus to the cantrip's damage"
				]),
				additional : "1 blood point"
			},
			"silence the pain" : {
				name : "Silence the Pain",
				source : ["JR:BM", 13],
				description : desc([
					"If I expend 1 blood point, I can concentrate (as a spell) to gain resistance to psychic damage",
					"While concentrating like this, psychic damage doesn't cause me to make concentration saves"
				]),
				additional : "1 blood point"
			}
		},
		"subclassfeature6" : {
			name : "Empowered Blood",
			source : ["JR:BM", 12],
			minlevel : 6,
			description : "\n   " + "When I roll damage for a spell, I can reroll up to my Con Mod of damage dice (min 1)",
			usages : levels.map(function (n) { return n < 6 ? "" : n < 14 ? 1 : 2; }),
			recovery : "short rest"
		},
		"subclassfeature10" : {
			name : "Blood Awakening",
			source : ["JR:BM", 10],
			minlevel : 10,
			description : "\n   " + "Once per long rest, I can cast Revivify using a wizard spell slot",
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Blood Awakening",
				spells : ["revivify"],
				selection : ["revivify"],
				oncelr : true
			}
		},
		"subclassfeature14" : {
			name : "Cull the Blood",
			source : ["JR:BM", 10],
			minlevel : 14,
			description : desc([
				"I can cause the blood of a creature to expel from its body, causing intense pain",
				"As an action, I cause a creature within 30 ft to take 10d10 necrotic damage",
				"The target can make a Constitution saving throw to halve this damage",
				"This feature doesn't work on an construct, ooze, plant, or undead"
			]),
			usages : 1,
			recovery : "long rest",
			action : ["action", ""]
		}
	}
});
