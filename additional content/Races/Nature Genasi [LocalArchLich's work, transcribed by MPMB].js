/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a subrace to the Genasi race from Elemental Evil Player's Companion
				And it changes the Earth Genasi subrace
				This subrace has been made by /u/LocalArchLich over on /r/UnearthedArcana on Reddit (https://redd.it/8qo1jx/)
				This code is based on v0.3 of that subrace
	Code by:	MorePurpleMoreBetter
	Date:		2019-07-29 (sheet v13.0.0beta18)
*/

var iFileName = "Nature Genasi [LocalArchLich's work, transcribed by MPMB].js";
RequiredSheetVersion("13.0.6");

SourceList["LAL:NG"] = {
	name : "LocalArchLich: Nature Genasi",
	abbreviation : "LAL:NG",
	group: "Reddit/r/UnearthedArcana",
	url : "https://homebrewery.naturalcrit.com/share/BkZJa5Dxtf",
	date : "2018/06/13"
};

RaceList["nature genasi"] = {
	regExpSearch : /^(?=.*(genasi|planetouched))(?=.*nature).*$/i,
	name : "Nature genasi",
	sortname : "Genasi, Nature",
	source : [["LAL:NG", 0]],
	plural : "Nature genasi",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", "Primordial"],
	age : " reach adulthood in their late teens and live up to 120 years",
	height : " range from barely 5 to well over 6 feet tall (4'8\" + 2d10\")",
	weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
	heightMetric : " range from barely 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
	weightMetric : " weigh around 75 lb (50 + 5d10 \xD7 4d4 / 10 kg)",
	scores : [0, 0, 2, 0, 0, 1],
	trait : "Nature Genasi (+2 Constitution, +1 Charisma)\n   Environmental Attunement: I learn a cantrip determined by the environment I'm attuned to, see 'Notes' page. I attune to an environment after spending 200 consecutive days in it. I then change which cantrip I know to the one of the new environment.\n   One with the World: From 3rd level onwards, I can cast Pass without Trace once per long rest without material components.\n   Constitution is my spellcasting ability for these spells.",
	spellcastingAbility : 3,
	spellcastingBonus : [{
		name : "Environmental Att.",
		spells : ["blade ward", "chill touch", "create bonfire", "dancing lights", "druidcraft", "eldritch blast", "fire bolt", "frostbite", "guidance", "gust", "magic stone", "mending", "message", "minor illusion", "mold earth", "poison spray", "prestidigitation", "primal savagery", "produce flame", "ray of frost", "resistance", "shape water", "thaumaturgy", "thorn whip", "thunderclap", "toll the dead", "true strike", "word of radiance"],
		firstCol : 'atwill'
	}],
	features : {
		"pass without trace" : {
			name : "One with the World",
			limfeaname : "Pass without Trace",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : [{
				name : "One with the World",
				spells : ["pass without trace"],
				selection : ["pass without trace"],
				firstCol : "oncelr"
			}],
			spellChanges : {
				"pass without trace" : {
					components : "V,S",
					compMaterial : "",
					changes : "Using One with the World, I can cast Pass without Trace once per long rest without requiring material components."
				}
			}
		}
	},
	toNotesPage : [{
		name : "Environmental Attunement Table",
		popupName : "Nature Genasi Environmental Attunement Table",
		note : [
			"Every Nature Genasi attunes to the environment they live in and gain a cantrip",
			"which is determined by this attunement. Constitution is my spellcasting ability for this.",
			"After spending 200 consecutive days in an environment, my body adapts to its surroundings and my Environmental Attunement becomes that of whichever environment I am in. When my attunement changes from my current environment, I lose the previous cantrip, but gain a new one. See the tables below for what cantrip fits what environment or plane of existence.\n",
			"ENVIRONMENT\t\tCANTRIP\t\t",
			"Coast\t\t\tShape Water",
			"Desert\t\t\tMold Earth",
			"Forest\t\t\tDruidcraft",
			"Grassland\t\t\tGust",
			"Mountain\t\t\tThunderclap",
			"Swamp\t\t\tPoison Spray",
			"Tundra\t\t\tFrostbite",
			"Volcanic\t\t\tFire Bolt",
			"Underdark\t\tDancing Lights",
			"Urban\t\t\tMessage\n",
			"PLANE OF EXISTENCE\tCANTRIP",
			"Acheron\t\t\tBlade Ward",
			"Arborea\t\t\tPrimal Savagery",
			"Arcadia\t\t\tDruidcraft",
			"Bytopia\t\t\tMagic Stone",
			"Carcert\t\t\tRay of Frost",
			"Elemental Plane of Air\tGust",
			"Elemental Plane of Earth\tMold Earth",
			"Elemental Plane of Fire\tProduce Flame",
			"Elemental Plane of Water\tShape Water",
			"Elysium\t\t\tWord of Radiance",
			"Feywild\t\t\tPrestidigitation",
			"Gehenna\t\t\tResistance",
			"Hades\t\t\tChill Touch",
			"Limbo\t\t\tMinor Illusion",
			"Mechanus  \t\tMending",
			"Mount Celestia\t\tGuidance",
			"Pandemonium\t\tThaumaturgy",
			"Shadowfell\t\tToll the Dead",
			"The Abyss  \t\tEldritch Blast",
			"The Beastlands\t\tThorn Whip",
			"The Nine Hells\t\tCreate Bonfire",
			"Ysgard\t\t\tTrue Strike"
		]
	}]
};

if (RaceList["earth genasi"]) {
	RaceList["earth genasi"].source = [["E", 9], ["LAL:NG", 0]];
	RaceList["earth genasi"].trait = "Earth Genasi (+1 Strength, +2 Constitution)\n\nEarth Walk: I can move across difficult terrain made of earth or stone without expending extra movement.\n\nMerge with Stone: I know the Mold Earth cantrip. At 3rd level, I can cast Earthbind once per long rest. Constitution is my spellcasting ability for this spell.";
	RaceList["earth genasi"].spellcastingBonus = {
		name : "Merge with Stone (level 1)",
		spells : ["mold earth"],
		selection : ["mold earth"],
		firstCol : 'atwill'
	};
	RaceList["earth genasi"].features = {
		"earthbind" : {
			name : "Merge with Stone (level 3)",
			limfeaname : "Earthbind",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : [{
				name : "Merge with Stone (level 3)",
				spells : ["earthbind"],
				selection : ["earthbind"],
				firstCol : 'oncelr'
			}]
		}
	};
}