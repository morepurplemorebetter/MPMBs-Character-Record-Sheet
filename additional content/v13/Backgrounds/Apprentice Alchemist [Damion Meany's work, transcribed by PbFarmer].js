/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:	Background
	Effect:		This script adds a background, called "Apprentice Alchemist"
				This is taken from Dungeon Masters Guild (https://www.dmsguild.com/product/208784/)
				This background is made by Damion Meany
	Code by:	/u/PbFarmer
	Date:		2017-09-05 (sheet v12.998)

	Please support the creator of this content (Damion Meany) and download his material from DM Guild: https://www.dmsguild.com/browse.php?author=Damion%20Meany
*/

var iFileName = "Apprentice Alchemist [Damion Meany's work, transcribed by /u/PbFarmer].js";
RequiredSheetVersion(12.999);

SourceList["DM:IB"] = {
	name : "Damion Meany's Improved Backgrounds",
	abbreviation : "DM:IB",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/208784/",
	date : "2017/04/04"
};

BackgroundList["apprentice alchemist"] = {
	regExpSearch : /^(?=.*apprentice)(?=.*alchemist).*$/i,
	name : "Apprentice Alchemist",
	source : ["DM:IB", 11],
	skills : ["Arcana"],
	skillstxt : "Arcana and choose one from Investigation, Medicine, Nature, and Persuasion",
	gold : 10,
	equipleft : [
		["Alchemists' Supplies", "", ""],
		["Book of Alchemical Recipes", "", 3],
		["Scroll case", "", 4],
		["Sheet of Parchment", 5, ""],
		["Ink and Quill", "", ""]
	],
	equipright : [
		["Robes", "", 1],
		["Belt pouch (with coins)", "", 1]
	],
	feature : "Alchemical Familiarity",
	trait : [
		"I am often lost in thought.",
		"I use big and complicated words.",
		"I always try to help others.",
		"I am a perfectionist and need things to be just so.",
		"I am very awkward in social situations.",
		"I am always trying to learn new recipes, formulas, or techniques by reading or watching others work."
	],
	ideal : [
		["Service",
			"Service: Helping others is the most important thing in the world. (Good)"
		],
		["Power",
			"Power: Knowledge is the key to power and authority. (Evil)"
		],
		["Logic",
			"Logic: There is a systematic way to do and understand everything. (Lawful)"
		],
		["Discovery",
			"Discovery: There are new magics awaiting discovery. (Chaotic)"
		],
		["Knowledge",
			"Knowledge: Understanding the world and its mysteries is its own reward. (Neutral)"
		],
		["Self-Improvement",
			"Self-Improvement: Bettering yourself is essntial in life."
		]
	],
	bond : [
		"I have a mentor I admire and need to impress.",
		"I had a mentor who was cruel and secretly corrupted my home, I must expose him/her.",
		"My family relies on my support.",
		"I am determined to cure the disease that killed my family.",
		"I need to be known for my contributions, discoveries, and skill.",
		"I helped a noble without thought of reward and now that noble family are quiet but loyal patrons."
	],
	flaw : [
		"I avoid others troubles when not actively working as an alchemist or healer.",
		"I treat people like they are stupid.",
		"I resent the people who come to me for help for their weakness.",
		"I wish to be left alone to my work.",
		"I prove my intellect by pointing out others mistakes.",
		"I have difficulty telling people no."
	],
	variant : [],
	toolProfs : ["Alchemist's supplies", ["Herbalism or poisoner's kit", 1]],
	lifestyle : "modest"
};

BackgroundFeatureList["alchemical familiarity"] = {
	description : "I have an ongoing relationship with my mentor, whom I am able to contact to request advice or assistance, even when far away.  I can often identify potions, salves, oils, and other mundane and magical consumables by sight.  In addition, my familiarity with alchemy enables me to work in an Alchemist's lab or shop to earn a modest living during my down time.",
	source : ["DM:IB", 11]
};
