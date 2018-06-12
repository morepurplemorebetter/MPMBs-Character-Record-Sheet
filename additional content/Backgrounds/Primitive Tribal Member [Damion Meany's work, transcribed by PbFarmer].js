/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:	Background
	Effect:		This script adds a background, called "Primitive Tribe Member"
				This is taken from Dungeon Masters Guild (https://www.dmsguild.com/product/208784/)
				This background is made by Damion Meany
	Code by:	/u/PbFarmer
	Date:		2017-09-05 (sheet v12.998)

	Please support the creator of this content (Damion Meany) and download his material from DM Guild: https://www.dmsguild.com/browse.php?author=Damion%20Meany
*/

var iFileName = "Primitive Tribal Member [Damion Meany's work, transcribed by /u/PbFarmer].js";
RequiredSheetVersion(12.999);
 
SourceList["DM:IB"] = {
    name : "Damion Meany's Improved Backgrounds",
    abbreviation : "DM:IB",
    group : "Dungeon Masters Guild",
    url : "https://www.dmsguild.com/product/208784/",
	date : "2017/04/01"
};
 
BackgroundList["primitive tribe member"] = {
	regExpSearch : /^(?=.*primitive)(?=.*tribe)(?=.*member).*$/i,
	name : "Primitive Tribe Member",
	source : ["DM:IB", 63],
	skills : ["Nature",],
	skillstxt : "Nature and choose one from Animal Handling, Athletics, Stealth, or Survival",
	gold : 10,
	equipleft : [
		["Significant Tribal item", "", ""],
		["One set of proficient tools", "", ""],
	],
	equipright : [
		["Traveler's clothes", "", 4],
		["Belt pouch (with coins)", "", 1]
	],
	feature : "At One with Nature",
	trait : [
		"I am undyingly loyal to and protective of my tribe.",
		"I am direct and do not understand subtlety.",
		"I am contemptuous of civilization.",
		"I do not trust magic or magic users.",
		"I am naïve and friendly to everyone.",
		"I am awestruck by cities and grand architecture."     
	],
	ideal : [
		["Humility",
			"Humility: I am no better or worse than anyone else in this world. (Good)"
		],
		["Xenophobia",
			"Xenophobia: I do not understand the ways of worldly people, but know they are wrong. (Evil)"
		],
		["Order",
			"Order: Every place has rules which must be followed for everyone's good. (Lawful)"
		],
		["Freedom",
			"Freedom: There is one rule in the wild; do what you can to live. (Chaotic)"
		],
		["Balance",
			"Balance: All things and ways of being are natural and necessary. (Neutral)"
		],
		["Unity",
			"Unity: A tribe that works together is strong. (Lawful)"
		]
	],
	bond : [
		"My family and my tribe are everything to me.",
		"I left my tribe to prove my right to a prominent place in the tribe hierarchy.",
		"I love a prominent tribe member and must prove I am worth their love.",
		"My tribe is threatened and I must protect them.",
		"My tribe was destroyed and I must have vengeance.",
		"I was dishonored and thrown out of my tribe; I must prove my worth"
	],
	flaw : [
		"I don’t understand social nuances.",
		"I drink (or overindulge in other things) to excess.",
		"I don’t trust anyone not of my tribe.",
		"I trust everyone to say what they mean.",
		"I believe might proves right and will not listen to those who are “weak”.",
		"I am insecure since my tribe appears weak compared to larger, more modern societies."
	],
	variant : [],
	toolProfs : [["Any tool", 2]],
	lifestyle : "modest"
};
 
BackgroundFeatureList["at one with nature"] = {  
    description : "I am intimately familiar with the geography of my home region. I know exactly where water, shelter, and food can be found within several miles of my ome and am good at finding these areas when outside of my home region as well when in a climate much like it.",
    source : ["DM:IB", 63]
};
