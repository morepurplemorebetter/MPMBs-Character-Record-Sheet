/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race and its 3 subraces, called "Soulbound"
	
				This class has been made by /u/Greypilgrim333 on the subbreddit /UnearthedArcana 
				It can be found here: https://redd.it/4wsioc/
				
	Code by:	MorePurpleMoreBetter
	Date:		2017-10-25 (sheet v12.998)
*/

var iFileName = "Soulbound [Greypilgrim333's work, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["GP:S"] = {
	name : "/u/Greypilgrim333: Soulbound Race",
	abbreviation : "GP:S",
	group : "Reddit/r/UnearthedArcana",
	url : "https://redd.it/4wsioc/",
	date : "2017/08/08"
};

RaceList["light armor soulbound"] = {
	regExpSearch : /^(?=.*soulbound)(?=.*light).*$/i,
	name : "Light Armor Soulbound",
	sortname : "Soulbound, Light Armor",
	source : ["GP:S", 2],
	size : 3,
	speed : {
		walk : { spd : 35, enc : 25 }
	},
	languageProfs : ["Common", 1],
	savetxt : { immune : ["charm", "disease", "fear", "poisoned", "sleep"] },
	dmgres : ["Poison"],
	age : " do not age but are mentally and emotionally limited to the maturity of the age and race of the soul itself when it was bound",
	height : " stand between 4 and 9 feet tall, depending on the armor they were made from",
	weight : " weigh the same as the armor they were made from",
	heightMetric : " stand between 1,2 and 3 metres tall, depending on the armor they were made from",
	improvements : "Light Armor Soulbound: +2 Dexterity, +1 Constitution;",
	scores : [0, 2, 1, 0, 0, 0],
	trait : "Light Armor Soulbound (+2 Dexterity, +1 Constitution) Don't need to eat or breathe. Can't use consumables like potions. Regains only half HP from resting or magical healing. Adv. on death saves. Can restore all my HP with a 4-hour ritual. Need only 4 hours for a long rest. Recover 1 level of exhaustion for every 30 min rest. Has the AC of the armor it is made of +1. Dispel magic causes me to make a Con save or fall unconscious for 1 min. Can be worn as an armor, making both take turns at the same time, give adv. to each other attacks, use each other skill proficiencies, adv. on Str/Con saves and dis. on Dex saves."
};

RaceList["medium armor soulbound"] = {
	regExpSearch : /^(?=.*soulbound)(?=.*medium).*$/i,
	name : "Medium Armor Soulbound",
	sortname : "Soulbound, Medium Armor",
	source : ["GP:S", 2],
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", 1],
	savetxt : { immune : ["charm", "disease", "fear", "poisoned", "sleep"] },
	dmgres : ["Poison"],
	age : " do not age but are mentally and emotionally limited to the maturity of the age and race of the soul itself when it was bound",
	height : " stand between 4 and 9 feet tall, depending on the armor they were made from",
	weight : " weigh the same as the armor they were made from",
	heightMetric : " stand between 1,2 and 3 metres tall, depending on the armor they were made from",
	improvements : "Medium Armor Soulbound: +1 Dexterity, +2 Constitution;",
	scores : [0, 1, 2, 0, 0, 0],
	trait : "Medium Armor Soulbound (+1 Dexterity, +2 Constitution) Don't need to eat or breathe. Can't use consumables like potions. Regains only half HP from resting or magical healing. Adv. on death saves. Can restore all my HP with a 4-hour ritual. Need only 4 hours for a long rest. Recover 1 level of exhaustion for every 30 min rest. Has the AC of the armor it is made of +1. Dispel magic causes me to make a Con save or fall unconscious for 1 min. Can be worn as an armor, making both take turns at the same time, give adv. to each other attacks, use each other skill proficiencies, adv. on Str/Con saves and dis. on Dex saves."
};

RaceList["heavy armor soulbound"] = {
	regExpSearch : /^(?=.*soulbound)(?=.*heavy).*$/i,
	name : "Heavy Armor Soulbound",
	sortname : "Soulbound, Heavy Armor",
	source : ["GP:S", 2],
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", 1],
	savetxt : { immune : ["charm", "disease", "fear", "poisoned", "sleep"] },
	dmgres : ["Poison"],
	age : " do not age but are mentally and emotionally limited to the maturity of the age and race of the soul itself when it was bound",
	height : " stand between 4 and 9 feet tall, depending on the armor they were made from",
	weight : " weigh the same as the armor they were made from",
	heightMetric : " stand between 1,2 and 3 metres tall, depending on the armor they were made from",
	improvements : "Heavy Armor Soulbound: +1 Strength, +2 Constitution;",
	scores : [1, 0, 2, 0, 0, 0],
	trait : "Heavy Armor Soulbound (+1 Strength, +2 Constitution) Don't need to eat or breathe. Can't use consumables like potions. Regains only half HP from resting or magical healing. Adv. on death saves. Can restore all my HP with a 4-hour ritual. Need only 4 hours for a long rest. Recover 1 level of exhaustion for every 30 min rest. Has the AC of the armor it is made of +1. Dispel magic causes me to make a Con save or fall unconscious for 1 min. Can be worn as an armor, making both take turns at the same time, give adv. to each other attacks, use each other skill proficiencies, adv. on Str/Con saves and dis. on Dex saves."
};
