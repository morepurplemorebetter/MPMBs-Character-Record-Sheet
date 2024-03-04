/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds all of the Subclasses and Backgrounds used by Luroden Solas."
				This all content is sourced from the official WotC Books.

	Code by:	Darrell Malone
	Date:		2024-03-03 (sheet v13.1.6)
*/

var iFileName = "Luroden - All Additions.js";
RequiredSheetVersion("13.1.1");


// Add Sources
SourceList["PHB"] = {
	name : "Player's Handbook",
	abbreviation : "PHB",
	group : "Core Sources",
	url : "https://dnd.wizards.com/products/rpg_playershandbook",
	date : "2014/08/14"
};

SourceList["TCE"] = {
	name : "Tasha's Cauldron of Everything",
	abbreviation : "TCE",
	group : "Primary Sources",
	url : "https://dnd.wizards.com/products/tashas-cauldron-everything",
	date : "2020/11/17"
};

// Add Spells
SpellsList["booming blade"] = {
	name: "Booming Blade",
	source : ["TCE", 128],
	classes: ["wizard", "warlock", "sorcerer"],
	level: 0,
	school: "Evoc", 
	time: "1 a",
	range: "Touch",
	components: "S,M",
	compmaterial: "A melee weapon worth at least 1 sp",
	duration: "1 rnd",
	description: "Melee attack. Target takes additional 1d8 Thunder dmg if moves > 5ft willingly.",
	descriptionFull: "You brandish the weapon used in the spell's casting and make a melee attack with it against one creature within 5 feet of you. On a hit, the target suffers the weapon attack's normal effects and then becomes sheathed in booming energy until the start of your next turn. If the target willingly moves 5 feet or more before then, the target takes 1d8 thunder damage, and the spell ends. At Higher Levels. At 5th level, the melee attack deals an extra 1d8 thunder damage to the target on a hit, and the damage the target takes for moving increases to 2d8. Both damage rolls increase by 1d8 at 11th level (2d8 and 3d8) and again at 17th level (3d8 and 4d8).",
	descriptionCantripDie: "`CD-1`d8 Thunder dmg on impact and `CD`d8 Thunder dmg if moves > 5ft willingly."
}

SpellsList["minor illusion"] = {
	name: "Minor Illusion",
	source : ["PHB", 239],
	classes: ["wizard", "warlock", "sorcerer", "bard"],
	level: 0,
	school: "Illus", 
	time: "1 a",
	range: "30 ft",
	components: "S,M",
	compmaterial: "A bit of fleece",
	duration: "1 min",
	description: "Create a sound or image of an object.",
	descriptionFull: "You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again.",
}

// Add Subclasses
AddSubClass("rogue", "arcane trickster", {
	regExpSearch : /(arcane)(trickster)/i,
	subname : "Arcane Trickster",
	fullname : "Arcane Trickster",
	source : ["PHB", 97],
	abilitySave: 4,
	spellcastingFactor : 3,
	spellcastingList : {
		class : "wizard",
		school : ["Ench", "Illus"],
		extraspells: ["mage hand"],
		level : [0, 4]
	},
	spellcastingKnown : {
		cantrips : [0, 0, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		spells : [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13],
	},
	features : {
		"subclassfeature3" : {
			name : "Spellcasting",
			source : [["SRD", 40], ["P", 97]],
			minlevel : 3,
			description : desc([
				"I can now cast spells using a component pouch. I use Intelligence as my spellcasting ability."
			]),
			additional : levels.map(function (n, idx) {
				return [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5][idx] + " cantrips known";
			})
		},
		"subclassfeature3.1" : {
			name : "Mage Hand Legerdemain",
			source : [["SRD", 41], ["P", 97]],
			minlevel : 3,
			description : desc([
				"When I cast mage hand, I can make the spectral hand invisible, and I can perform the following additional tasks with it:",
				" \u2022 Stow one object the hand is holding in a container worn or carried by another creature",
				" \u2022 Retrieve an object in a container worn or carried by another creature",
				" \u2022 use thieves' tools to pick locks and disarm traps at range"
		])
		},
		"subclassfeature9" : {
			name : "Magical Ambush",
			source : [["SRD", 41], ["P", 97]],
			minlevel : 9,
			description : desc("If I am hidden from a creature when I cast a spell on it, the creature has disadvantage on any saving throw it makes against the spell this turn")
		},
		"subclassfeature13" : {
			name : "Versitile Trickster",
			source : [["SRD", 41], ["P", 97]],
			minlevel : 13,
			description : desc("I can distract targets within 5 feet of my mage hand with a bonus action to gain advantage against that creature."),
			action : ["bonus action", ""]
		},
		"subclassfeature17" : {
			name : "Spell Thief",
			source : [["SRD", 41], ["P", 97]],
			minlevel : 17,
			description : desc([
				"I can magically steal the knowledge of how to cast a spell from another creature.",
				"The creature must make a saving throw with its spellcasting ability against my spell save DC."
			]),
			action : [["reaction", ""]]
		}
	}
});


AddSubClass("wizard", "bladesinger", {
	regExpSearch : /(bladesinging|bladesinger|shadewalker)/i,
	subname : "Bladesinging",
	fullname : "Bladesinger",
	source : ["TCE", 129],
	attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature2" : {
			name : "Training in War and Song",
			source : [["SRD", 54], ["P", 117]],
			minlevel : 2,
			description : desc("I gain proficiency with light armor, and I gain proficiency with one type of one-handed melee weapon of my choice."),
			skillProfs : ["Performance"],
			armorProfs : [true, false, false, false],
			weaponProfs : [false, false, "whip"]
		},
		"subclassfeature2.1" : {
			name : "Bladesong",
			source : [["SRD", 54], ["P", 117]],
			minlevel : 2,
			description : desc([
				"If I cast an evocation spell affecting others I can see, I can protect 1 + the spell's level",
				"I can invoke a secret elven magic called the Bladesong, provided that I'm not wearing medium or heavy armor or using a shield.",
				"While bladesong is active:",
				" \u2022 I gain a bonus to your AC equal to your Intelligence modifier (minimum of +1)",
				" \u2022 My walking speed increases by 10 feet",
				" \u2022 I have advantage on Dexterity (Acrobatics) checks",
				" \u2022 I gain a bonus to any Constitution saving throw I make to maintain my concentration on a spell. The bonus equals my Intelligence modifier (minimum of +1)."
			]),
			action : ["bonus action", ""],
			extraLimitedFeatures : [{
				name : "Bladesong",
				recovery : "long rest",
				usages : "Prof",
				usagescalc : "event.value = How('Proficiency Bonus');"
			}]
		},
		"subclassfeature6" : {
			name : "Extra Attack",
			source : [["SRD", 54], ["P", 117]],
			minlevel : 6,
			description : desc("I can attack twice, instead of once, whenever I take the Attack action on my turn. Moreover, I can cast one of my cantrips in place of one of those attacks."),
		},
		"subclassfeature10" : {
			name : "Song of Defense",
			source : [["SRD", 54], ["P", 117]],
			minlevel : 10,
			description : desc("While my Bladesong is active: When I take damage, I can use my reaction to expend one spell slot and reduce that damage to me by an amount equal to five times the spell slot's level."),
			action : [["reaction", ""]]
		},
		"subclassfeature14" : {
			name : "Song of Victory",
			source : [["SRD", 54], ["P", 118]],
			minlevel : 14,
			description : desc([
				"I can add my Intelligence modifier (minimum of +1) to the damage of my melee weapon attacks while my Bladesong is active"
			])
		}
	}
});


// Add backgrounds
BackgroundList["criminal"] = {
	regExpSearch : /(criminal|spy)/i,
	name : "Criminal",
	source : ["PHB", 129],
	skills : ["Deception", "Stealth"],
	skillstxt : "Deception, Stealth, Thieves' Tools, and 1 type of gaming set.",
	gold : 15,
	equipleft : [
		["Crowbar", "", 5]
	],
	equipright : [
		["Dark, common clothes with hood", "", 3],
		["Belt pouch (with coins)", "", 1]
	],
	feature : "Criminal Contact",
	trait : [
		"I always have a plan for what to do when things go wrong.",
		"I am always calm, no matter what the situation. I never raise my voice and or let my emotions control me.",
		"First thing I do in a new place is note the locations of everything valuable -- or where such things can be hidden.",
		"I would rather make a new friend than a new enemy.",
		"I am incredibly slow to trust.",
		"I don't pay attention to the risks in a situation. Never tell me the odds."
	],
	toolProfs : ["Thieves' tools", ["One type of gaming set", 1]],
	lifestyle : "modest"
};

BackgroundList["charlatan"] = {
	regExpSearch : /charlatan/i,
	name : "Charlatan",
	source : ["PHB", 128],
	skills : ["Deception, Sleight of Hand"],
	skillstxt : "Deception, Sleight of Hand, Disguise kit and Forgery Kit",
	gold : 15,
	equipleft : [
		["Fine clothes", "", 6],
		["Disguise kit", "", 3]
	],
	feature : "False Identity",
	toolProfs : ["Disguise kit", "Forgery kit"],
	lifestyle : "modest"
};

BackgroundFeatureList["criminal contact"] = {
	description : "I have a reliable and trustworthy contact who acts as my liaison to a network of other criminals. I know how to get messages to and from my contact, even over great distances; specifically, I know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages for me.",
	source : ["PHB", 129]
};

BackgroundFeatureList["false identity"] = {
	description : "I have created a second identity that includes documentation, established acquaintances, and disguises that allow me to assume that persona. Additionally, I can forge documents including official papers and personal letters, as long as I have seen an example of the kind of document or the handwriting I am trying to copy.",
	source : ["PHB", 128]
};