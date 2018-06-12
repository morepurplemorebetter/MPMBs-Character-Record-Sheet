/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race, called "Shade" and its 2 subraces
				This is taken from the DMs Guild website (https://www.dmsguild.com/product/208791/)
				This subclass is made by Jeremy Forbing and is part of his "Forgotten Realms Archetypes: Savagery & Shadow"
	Code by:	MorePurpleMoreBetter
	Date:		2018-01-03 (sheet v12.999)
	
	Please support the creator of this content (Jeremy Forbing) and download his material from the DMs Guild website: https://www.dmsguild.com/browse.php?author=Jeremy%20Forbing
	
	Note that the Netherese Cantrip selection is not limited to just the three shools of magic in v12.999 of the sheet. This is something that is fixed in v13 of the sheet.
*/

var iFileName = "Shade, with 2 subraces [Jeremy Forbing's work, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["FRA:SS"] = {
	name : "Forgotten Realms Archetypes: Savagery & Shadow (v1.2)",
	abbreviation : "FRA:SS",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/208791/",
	date : "2017/04/14"
};

RaceList["independent shade"] = {
	regExpSearch : /^(?=.*shade)(?=.*independent).*$/i,
	name : "Independent Shade",
	sortname : "Shade, Independent",
	source : ["FRA:SS", 14],
	plural : "Independent Shades",
	size : 3,
	speed : { walk : { spd : 30, enc : 20 } },
	languageProfs : ["Common", 1],
	vision : [["Darkvision", 60]],
	dmgres : ["Necrotic"],
	skills : ["Stealth"],
	skillstxt : "Stealth and one other, chosen from: Deception, Investigation, or Sleight of Hand", // Independent
	age : " age at half the speed a normal member of their previous race would.",
	height : " are the same height as a normal member of their previous race.",
	weight : " are the same weight as a normal member of their previous race.",
	improvements : "Independent Shade: +2 Dexterity, +1 Charisma;",
	scores : [0, 2, 0, 0, 0, 1],
	trait : "Independent Shade (+2 Dexterity, +1 Charisma)\nFragile Mortality: After I regain HD after a long rest, I must first make a DC 15 Con save, or loose half my proficiency bonus in HD." + (typePF ? "\n" : " ") + "Hidden Step: Once per short rest, as a bonus action, I can teleport from and into dim light or darkness within 30 ft. After this, I turn invisible until the start of my next turn, or until I attack or force someone to save.\nTwilight Cantrip: Whenever I cast a cantrip as an action, I can take the Hide action as a bonus action." + (typePF ? "\n" : " ") + "Swift as Shadows: I learn the Shifting Shadow cantrip.",
	spellcastingAbility : 6,
	spellcastingBonus : {
		name : "Swift as Shadows",
		spells : ["shifting shadow"],
		selection : ["shifting shadow"],
		atwill : true
	},
	features : {
		"hidden step" : {
			name : "Hidden Step",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"twilight cantrip" : {
			name : "Twilight Cantrip",
			minlevel : 1,
			action : ["bonus action", " (hide after)"]
		}
	}
};

RaceList["netherese shade"] = {
	regExpSearch : /^(?=.*shade)(?=.*netherese).*$/i,
	name : "Netherese Shade",
	sortname : "Shade, Netherese",
	source : ["FRA:SS", 14],
	plural : "Netherese Shades",
	size : 3,
	speed : { walk : { spd : 30, enc : 20 } },
	languageProfs : ["Common", 1],
	vision : [["Darkvision", 60]],
	dmgres : ["Necrotic"],
	skills : ["Arcana", "Stealth"],
	age : " age at half the speed a normal member of their previous race would.",
	height : " are the same height as a normal member of their previous race.",
	weight : " are the same weight as a normal member of their previous race.",
	improvements : "Netherese Shade: +2 Dexterity, +1 Intelligence;",
	scores : [0, 2, 0, 1, 0, 0],
	trait : "Independent Shade (+2 Dexterity, +1 Charisma)" + (typePF ? "\n" : " ") + "Fragile Mortality: After I regain HD after a long rest, I must first make a DC 15 Con save, or loose half my proficiency bonus in HD." + (typePF ? "\n" : " ") + "Hidden Step: Once per short rest, as a bonus action, I can teleport from and into dim light or darkness within 30 ft. After, I'm invisible until my next turn starts, or until I attack or force someone to save." + (typePF ? "\n" : " ") + "Netherese Cantrip: I known one Evocation, Illusion, or Necromancy wizard cantrip. Int is my ability for it." + (typePF ? "\n" : " ") + "Shar's Bargain: Once per short rest, I can reduce a cantrip's casting time to a bonus action by taking my proficiency bonus in damage.",
	spellcastingAbility : 4,
	spellcastingBonus : {
		name : "Netherese Cantrip",
		"class" : "wizard",
		school : ["Evoc", "Illus", "Necro"],
		level : [0, 0],
		atwill : true
	},
	features : {
		"hidden step" : {
			name : "Hidden Step",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"shar's bargain" : {
			name : "Shar's Bargain",
			minlevel : 1,
			usages : 1,
			recovery : "short rest"
		}
	}
};

SpellsList["shifting shadow"] = {
	name : "Shifting Shadow",
	classes : [],
	source : ["FRA:SS", 14],
	level : 0,
	school : "Conj",
	time : "1 a",
	range : "Self",
	components : "S",
	duration : "Instantaneous",
	description : "Move 5 ft; not provoke opportunity atks by moving this turn; heavily obscured until next turn ends",
	descriptionFull : "Too quickly for mortal eyes to perceive, you move no further than the reach of your shadow. Your movement doesn't provoke opportunity attacks for the rest of the turn, and you instantly move to an empty space within 5 feet.\nIf the space you end up in after casting shifting shadow is not in direct sunlight, that space is blurred and concealed by shadow magic, making it heavily obscured until the end of your next turn."
};
