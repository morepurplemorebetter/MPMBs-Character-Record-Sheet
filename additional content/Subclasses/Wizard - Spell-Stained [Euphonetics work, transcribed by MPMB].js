/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Wizard, called "Spell-Stained"
				This subclass is made by Euphonetics
	Code by:	MorePurpleMoreBetter
	Date:		2018-01-05 (sheet v12.999)
*/

var iFileName = "Wizard - Spell-Stained [Euphonetics work, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

AddSubClass("wizard", "spell-stained", {
	regExpSearch : /^(?=.*wizard)(?=.*spell)(?=.*stained).*$/i,
	subname : "Spell-Stained",
	source : ["HB", 0],
	spellcastingExtra : ["dissonant whispers", "find familiar", "spike growth", "call lightning", "phantom steed", "faithful hound", "raise dead"],
	features : {
		"subclassfeature2" : {
			name : "Inkling's Teachings",
			source : ["HB", 0],
			minlevel : 2,
			description : desc([
				"I can use my spell-stained skin as a spellcasting focus",
				"I gain proficiency with either the History skill, painter's supplies, or learn one language",
				"Use the \"Choose Feature\" button above to select one of these three options"
			]),
			choices : ["Skill proficiency: History", "Tool proficiency: Painter's supplies", "Language proficiency"],
			"language proficiency" : {
				name : "Inkling's Teachings",
				description : desc([
					"I can use my spell-stained skin as a spellcasting focus",
					"I learn one rare language"
				]),
				languageProfs : [1]
			},
			"skill proficiency: history" : {
				name : "Inkling's Teachings",
				description : desc([
					"I can use my spell-stained skin as a spellcasting focus",
					"I gain proficiency in the History skill"
				]),
				skills : ["History"]
			},
			"tool proficiency: painter's supplies" : {
				name : "Inkling's Teachings",
				description : desc([
					"I can use my spell-stained skin as a spellcasting focus",
					"I gain proficiency with painter's supplies"
				]),
				toolProfs : ["Painter's supplies"]
			}
		},
		"subclassfeature2.1" : {
			name : "Skin Glyphs",
			source : ["HB", 0],
			minlevel : 2,
			description : desc([
				"When preparing spells, I can make a spell that I can cast into a skin glyph",
				"Doing so uses a spell slot equal to the spell's level and casts the Glyph of Warding spell",
				"As long as the spell is in the glyph, I can't prepare it for casting with spell slots",
				"The glyph can be triggered just like a Glyph on Warding that is on my own skin",
				"Skin glyphs can't harm me and require no components to create or trigger",
				"Spells cast by the glyph require no concentration, and last to their full duration",
				"If I set a condition for the glyph's trigger, it will always use my reaction to trigger",
				"Another trigger option is by gesture/command, which requires my bonus action"
			]),
			additional : levels.map( function(n) { return n < 2 ? "" : "max " + (n < 14 ? 1 : 2) + " active skin glyph" + (n < 14 ? "" : "s"); })
		},
		"subclassfeature6" : {
			name : "Mark of Binding",
			source : ["HB", 0],
			minlevel : 6,
			description : desc([
				"With a 10-minute ritual, I can bind a small object to me that I can physically carry",
				"Upon the ritual's completion, the item transforms into a marking on my skin",
				"As a bonus action, I can summon a bound object to my hand or within 5 ft of me",
				"By pressing on the marking again as a bonus action, I can return the item to it",
				"If an object is destroyed, the corresponding marking disappears from my skin"
			]),
			action : ["bonus action", ""],
			additional : levels.map( function(n) { return n < 6 ? "" : "max " + (n < 14 ? 2 : 4) + " objects bound"; })
		},
		"subclassfeature10" : {
			name : "Rune Cocoon",
			source : ["HB", 0],
			minlevel : 10,
			description : "\n   " + "I'm always under the effects of Mage Armor and Detect Magic",
			addarmor : "Mage Armor",
			vision : [["Detect Magic", 0]]
		},
		"subclassfeature14" : {
			name : "Horrific Teleport",
			source : ["HB", 0],
			minlevel : 14,
			description : desc([
				"I can create up to two active skin glyphs and bind up to four objects",
				"I can create one active skin glyphs on another creature instead of on myself",
				"This can be resisted with a successful Wisdom saving throw"
			])
		}
	}
});
