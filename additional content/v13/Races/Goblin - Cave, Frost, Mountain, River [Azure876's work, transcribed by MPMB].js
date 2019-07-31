/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds 4 subraces to the goblin race from Volo's Guide to Monsters
				This is taken from the GM Binder website (https://www.gmbinder.com/share/-LfNVTUU2xl9IAZjPDV_)
				These subraces have been made by Azure876
	Code by:	MorePurpleMoreBetter
	Date:		2019-07-29 (sheet v13.0.0beta18)
*/

var iFileName = "Goblin - Cave, Frost, Mountain, River [Azure876's work, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["A876:AS"] = {
	name : "Azure876: Additional Subraces",
	abbreviation : "A876:AS",
	group : "GM Binder",
	url : "https://www.gmbinder.com/share/-LfNVTUU2xl9IAZjPDV_",
	date : "2019/05/21"
};

RaceList["cave goblin"] = {
	regExpSearch : /^(?=.*cave)(?=.*\bgoblins?\b)(?!.*hobgoblin|bugbear).*$/i,
	name : "Cave goblin",
	sortname : "Goblin, Cave",
	source : [["A876:AS", 0]],
	plural : "Cave goblins",
	size : 4,
	speed : {
		walk : { spd : 30, enc : 20 },
		climb : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", "Goblin"],
	vision : [["Darkvision", 60]],
	age : " rearch adulthood at age 8 and live up to 60 years",
	height : " are between 3 and a half and 4 feet tall (3'5\" + 2d4\")",
	weight : " weigh between 40 and 70 lb (35 + 2d4 \xD7 1 lb)",
	heightMetric : " are between 100 and 120 cm tall (100 + 5d4 cm)",
	weightMetric : " weigh between 20 and 30 kg (17 + 5d4 \xD7 2 / 10 kg)",
	scores : [0, 2, 1, 0, 0, 0],
	features : {
		"fury of the small" : {
			name : "Fury of the Small",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			additional : levels.map(function (n) { return "+" + n + " damage"; })
		}
	},
	trait : "Cave Goblin (+2 Dexterity, +1 Constitution)\n\nFury of the Small: Once per short rest, when I hit a creature of a size category larger than mine, I deal extra damage equal to my level.\n\nCave-crawler: I have a climbing speed of 30 ft and can climb along vertical an overhanging surfaces. When climbing along an overhanging surface, it is treated as difficult terrain."
};

RaceList["frost goblin"] = {
	regExpSearch : /^(?=.*frost)(?=.*\bgoblins?\b)(?!.*hobgoblin|bugbear).*$/i,
	name : "Frost goblin",
	sortname : "Goblin, Frost",
	source : [["A876:AS", 0]],
	plural : "Frost goblins",
	size : 4,
	speed : {
		walk : { spd : 30, enc : 20 },
		burrow : { spd : 15, enc : 5 }
	},
	languageProfs : ["Common", "Goblin"],
	vision : [["Darkvision", 60]],
	age : " rearch adulthood at age 8 and live up to 60 years",
	height : " are between 3 and a half and 4 feet tall (3'5\" + 2d4\")",
	weight : " weigh between 40 and 70 lb (35 + 2d4 \xD7 1 lb)",
	heightMetric : " are between 100 and 120 cm tall (100 + 5d4 cm)",
	weightMetric : " weigh between 20 and 30 kg (17 + 5d4 \xD7 2 / 10 kg)",
	scores : [0, 2, 0, 0, 1, 0],
	features : {
		"fury of the small" : {
			name : "Fury of the Small",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			additional : levels.map(function (n) { return "+" + n + " damage"; })
		}
	},
	trait : "Frost Goblin (+2 Dexterity, +1 Wisdom)\nFury of the Small: Once per short rest, when I hit a creature of a size category larger than mine, I deal extra damage equal to my level.\nFrigid Resistance: I have resistance to cold damage and a burrowing speed of 15 ft through ice and snow. My natural adaptation to stormy weather allows me to ignore the effects of strong winds, heavy precipitation, and walking on slippery ice.",
	dmgres : ["cold"]
};

RaceList["mountain goblin"] = {
	regExpSearch : /^(?=.*mountain)(?=.*\bgoblins?\b)(?!.*hobgoblin|bugbear).*$/i,
	name : "Mountain goblin",
	sortname : "Goblin, Mountain",
	source : [["A876:AS", 0]],
	plural : "Mountain goblins",
	size : 4,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", "Goblin"],
	vision : [["Darkvision", 60]],
	age : " rearch adulthood at age 8 and live up to 60 years",
	height : " are between 3 and a half and 4 feet tall (3'5\" + 2d4\")",
	weight : " weigh between 40 and 70 lb (35 + 2d4 \xD7 1 lb)",
	heightMetric : " are between 100 and 120 cm tall (100 + 5d4 cm)",
	weightMetric : " weigh between 20 and 30 kg (17 + 5d4 \xD7 2 / 10 kg)",
	scores : [1, 0, 2, 0, 0, 0],
	features : {
		"fury of the small" : {
			name : "Fury of the Small",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			additional : levels.map(function (n) { return "+" + n + " damage"; })
		}
	},
	trait : "Mountain Goblin (+1 Strength, +2 Constitution)\nFury of the Small: Once per short rest, when I hit a creature of a size category larger than mine, I deal extra damage equal to my level.\nTiny Yet Sturdy: My skin has hardened as it adapted to the rocky terrain in which I live, making it look as though small rocks now protrude from various points in my body. My Armor Class is 12 + my Dexterity modifier + shield when I am not wearing armor. I also have resistance to cold and fire damage.",
	armorOptions : {
		regExpSearch : /^(?=.*natural)(?=.*armou?r).*$/i,
		name : "Natural Armor",
		source : [["A876:AS", 0]],
		ac : 12
	},
	armorAdd : "Natural Armor",
	dmgres : ["Cold", "Fire"]
};

RaceList["river goblin"] = {
	regExpSearch : /^(?=.*river)(?=.*\bgoblins?\b)(?!.*hobgoblin|bugbear).*$/i,
	name : "River goblin",
	sortname : "Goblin, River",
	source : [["A876:AS", 0]],
	plural : "River goblins",
	size : 4,
	speed : {
		walk : { spd : 30, enc : 20 },
		swim : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", "Goblin"],
	vision : [["Darkvision", 60]],
	age : " rearch adulthood at age 8 and live up to 60 years",
	height : " are between 3 and a half and 4 feet tall (3'5\" + 2d4\")",
	weight : " weigh between 40 and 70 lb (35 + 2d4 \xD7 1 lb)",
	heightMetric : " are between 100 and 120 cm tall (100 + 5d4 cm)",
	weightMetric : " weigh between 20 and 30 kg (17 + 5d4 \xD7 2 / 10 kg)",
	scores : [0, 2, 1, 0, 0, 0],
	features : {
		"fury of the small" : {
			name : "Fury of the Small",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			additional : levels.map(function (n) { return "+" + n + " damage"; })
		}
	},
	trait : "River Goblin (+2 Dexterity, +1 Constitution)\n\nFury of the Small: Once per short rest, when I hit a creature of a size category larger than mine, I deal extra damage equal to my level.\n\nAmphibious: I have gills on my neck and nose slits that can open and close, allowing me to breathe underwater. I have also developed fins and webbed fingers and toes, giving me a swim speed of 30 ft."
};
