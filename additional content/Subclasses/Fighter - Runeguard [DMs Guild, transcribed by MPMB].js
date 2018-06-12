/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the fighter, called "Runeguard"
				This is taken from the 'Xanathar's Lost Notes to Everything Else' made by Lysa Chen, Will Doyle, James Haeck, James Introcaso, Rich Lescouflair, Shawn Merwin, Cindy Moore, Satine Phoenix, and Ruty Rutenberg (https://www.dmsguild.com/product/228484/)
	Code by:	MorePurpleMoreBetter
	Date:		2018-01-23 (sheet v12.999)
*/

var iFileName = "Fighter - Runeguard [XLNtEE, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["XLNtEE"] = {
	name : "Xanathar's Lost Notes to Everything Else",
	abbreviation : "XLNtEE",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/228484/",
	date : "2018/01/11"
};

AddSubClass("fighter", "runeguard-xlntee", {
	regExpSearch :  /^(?=.*\brune)(?=.*guard\b).*$/i,
	subname : "Runeguard",
	fullname : "Runeguard",
	source : ["XLNtEE", 18],
	abilitySave : 3,
	features : {
		"subclassfeature3" : {
			name : "Master Runes",
			source : ["XLNtEE", 19],
			minlevel : 3,
			description : "\n   " + "I know the Ild (fire), Kalt (frost), Ond (spirit), Stein (Stone), and Vind (wind) runes"
		},
		"subclassfeature3.1" : {
			name : "Runecraft",
			source : ["XLNtEE", 19],
			minlevel : 3,
			description : desc([
				"Use the \"Choose Feature\" button above to add Runic Augmentations to the third page",
				"I know a number of runic augmentations that I can inscribe onto me or my equipment",
				"Hagr runes only work on my body, Sokn only on weapons, Vald only on armor or shields",
				"Inscribing is done during a long rest; If moved 100 ft away from me, the rune fades",
				"Activating a rune takes an action (Hagr), bonus action (Sokn), or reaction (Vald)",
				"After activating a rune, I can't use it again until I finish a short rest",
				"An active rune requires concentration just like a spell does, with the same limits",
				"Concentration can last up to proficiency bonus + Constitution modifier in rounds (min 3)",
				"When I gain a new augmentation, I can replace an augmentation I know with another",
				"From 10th level onwards, I can concentrate on two runes at the same time"
			]),
			additional : levels.map(function (n) {
				if (n < 3) return "";
				return (n < 7 ? 3 : n < 10 ? 5 : n < 15 ? 7 : n < 18 ? 9 : 11) + (n < 10 ? " augmentations known" : n < 18 ? " augmentations known; concentrate on 2" : " known; up to 3 active, no concentration");
			}),
			extraname : "Runic Augmentation",
			extrachoices : ["Hagr - Ild", "Hagr - Kalt", "Hagr - Ond", "Hagr - Stein", "Hagr - Vind", "Sokn - Ild", "Sokn - Kalt", "Sokn - Ond", "Sokn - Stein", "Sokn - Vind", "Vard - Ild", "Vard - Kalt", "Vard - Ond", "Vard - Stein", "Vard - Vind"],
			"hagr - ild" : {
				name : "Hagr - Ild",
				source : ["XLNtEE", 20],
				description : "\n   " + "While active, I can add my Con mod to my Str (Athletics) and Dex (Acrobatics) checks",
				usages : 1,
				recovery : "short rest",
				action : ["action", ""]
			},
			"hagr - kalt" : {
				name : "Hagr - Kalt",
				source : ["XLNtEE", 20],
				description : "\n   " + "While active, I ignore difficult terrain and can walk on still or gently flowing water",
				usages : 1,
				recovery : "short rest",
				action : ["action", ""]
			},
			"hagr - ond" : {
				name : "Hagr - Ond",
				source : ["XLNtEE", 20],
				description : "\n   " + "While active, any healing I receive also gives me 5 + my proficiency bonus temporary HP",
				usages : 1,
				recovery : "short rest",
				action : ["action", ""]
			},
			"hagr - stein" : {
				name : "Hagr - Stein",
				source : ["XLNtEE", 20],
				description : "\n   " + "While active, any healing I receive also gives me 5 + my proficiency bonus temporary HP",
				usages : 1,
				recovery : "short rest",
				action : ["action", ""]
			},
			"hagr - vind" : {
				name : "Hagr - Vind",
				source : ["XLNtEE", 20],
				description : "\n   " + "While active, I gain 5 ft + my Constitution mod in ft extra movement speed (min 5 ft)",
				usages : 1,
				recovery : "short rest",
				action : ["action", ""]
			},
			"sokn - ild" : {
				name : "Sokn - Ild",
				source : ["XLNtEE", 20],
				description : desc([
					"While active, I can ignite a target that I hit with the rune-inscribed weapon once per turn",
					"At each of its turn, it takes 1d4 fire damage, after which it can make a Con save to end",
					"Alternatively, it or a creature within 5 ft of it can use an action to extinguish the flames",
					"Extinguishing the flames requires a Wis (Medicine) check against my runic save DC"
				]),
				usages : 1,
				recovery : "short rest",
				action : ["bonus action", ""]
			},
			"sokn - kalt" : {
				name : "Sokn - Kalt",
				source : ["XLNtEE", 20],
				description : "\n   " + "While active, targets I hit with the rune-inscribed weapon can't take reactions until its turn",
				usages : 1,
				recovery : "short rest",
				action : ["bonus action", ""]
			},
			"sokn - ond" : {
				name : "Sokn - Ond",
				source : ["XLNtEE", 20],
				description : desc([
					"While active, I deal extra damage once per turn when hit with the rune-inscribed weapon",
					"It does 1d4 necrotic extra damage and I recover HP for the same amount"
				]),
				usages : 1,
				recovery : "short rest",
				action : ["bonus action", ""]
			},
			"sokn - stein" : {
				name : "Sokn - Stein",
				source : ["XLNtEE", 20],
				description : desc([
					"While active, Large or smaller targets I hit with the rune-inscribed weapon must save",
					"On a failed Strength saving throw, the target is knocked prone"
				]),
				usages : 1,
				recovery : "short rest",
				action : ["bonus action", ""]
			},
			"sokn - vind" : {
				name : "Sokn - Vind",
				source : ["XLNtEE", 20],
				description : desc([
					"While active, I can use my reaction when hit by a melee attack to make an attack back",
					"I can make a melee attack with the rune-inscribed weapon at the target who attacked me"
				]),
				usages : 1,
				recovery : "short rest",
				action : ["bonus action", ""],
				eval : "AddAction('reaction', 'Sokn - Vind (when hit \u0026 active)', 'Sokn - Vind');",
				removeeval : "RemoveAction('reaction', 'Sokn - Vind (when hit \u0026 active)', 'Sokn - Vind');"
			},
			"vard - ild" : {
				name : "Vard - Ild",
				source : ["XLNtEE", 20],
				description : "\n   " + "While active, when hit by a melee attack, the attacker gets my prof bonus in fire damage",
				usages : 1,
				recovery : "short rest",
				action : ["reaction", ""]
			},
			"vard - kalt" : {
				name : "Vard - Kalt",
				source : ["XLNtEE", 20],
				description : "\n   " + "While active, when hit by a melee attack, I reduce the damage by my proficiency bonus",
				usages : 1,
				recovery : "short rest",
				action : ["reaction", ""]
			},
			"vard - ond" : {
				name : "Vard - Ond",
				source : ["XLNtEE", 20],
				description : "\n   " + "While active, I add my Constitution modifier to saving throws to resist being frightened",
				usages : 1,
				recovery : "short rest",
				action : ["reaction", ""]
			},
			"vard - stein" : {
				name : "Vard - Stein",
				source : ["XLNtEE", 20],
				description : "\n   " + "While active, I have advantage on saving throws to resist being moved against my will",
				usages : 1,
				recovery : "short rest",
				action : ["reaction", ""]
			},
			"vard - vind" : {
				name : "Vard - Vind",
				source : ["XLNtEE", 20],
				description : "\n   " + "While active, ranged attacks against me have disadvantage",
				usages : 1,
				recovery : "short rest",
				action : ["reaction", ""]
			}
		},
		"subclassfeature3.2" : {
			name : "Runescript",
			source : ["XLNtEE", 19],
			minlevel : 3,
			description : desc([
				"I gain proficiency with the Arcana and Religion skills",
				"I double my proficiency bonus, if any, with Intelligence check to identify magical writing"
			]),
			skills : ["Arcana", "Religion"],
			skillstxt : "\n\n" + toUni("Runeguard") + ": Arcana and Religion.",
		},
		"subclassfeature7" : {
			name : "Eyes of the Arcanist",
			source : ["XLNtEE", 19],
			minlevel : 7,
			description : desc([
				"By spending 1 minute observing, I know the general location of magical writing in 60 ft",
				"This writing has to be used in a rite or ritual and I know its type (arcane, divine, other)"
			]),
			usages : "Proficiency bonus per ",
			usagescalc : "event.value = How('Proficiency Bonus');",
			recovery : "long rest"
		},
		"subclassfeature10" : {
			name : "Sentinel's Reckoning",
			source : ["XLNtEE", 19],
			minlevel : 10,
			description : desc([
				"As an action, I can use the Tal effect of an active rune, stopping all active augmentations",
				"The augmentations that were stopped can be used again after a short rest as normal",
				"\u2022 Ild: All within 5 ft of me take fire damage equal to 2d6 \u00D7 number of active runes",
				"  They can make a Dexterity saving throw to halve the damage",
				"\u2022 Kalt: All chosen within 10 ft \u00D7 number of active runes of me must make a Str save",
				"  On fail, restrained for number of active runes in rounds; Save again at end of each turn",
				"\u2022 Ond: All chosen creatures within 5 ft of me heal 1d6 \u00D7 number of active runes in HP",
				"\u2022 Stein: A cone of 5 ft \u00D7 number of active runes turns to difficult terrain",
				"  Any creature entering this area or starting its turn there takes 2d4 slashing damage",
				"\u2022 Vind: All within 10 ft \u00D7 number of active runes of me must make a Strength save",
				"  On fail, pushed back 5 ft \u00D7 number of active runes (min 5 ft) and knocked prone",
				"  Additionally, they take 1d10 bludgeoning damage, or halve on a successful save"
			]),
			usages : levels.map(function (n) { return n < 10 ? "" : n < 15 ? 1 : 2; }),
			recovery : "short rest",
			action : ["action", ""]
		},
		"subclassfeature18" : {
			name : "Runic Mastery",
			source : ["XLNtEE", 19],
			minlevel : 18,
			description : "\n   " + "I no longer need to concentrate on runic augmentations and can have three active"
		}
	}
});
