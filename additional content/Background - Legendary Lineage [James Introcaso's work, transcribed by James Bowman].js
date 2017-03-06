/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Background
	Effect:		This script adds a background, called "Legendary Lineage"
				This is taken from Dungeon Masters Guild (http://www.dmsguild.com/product/171771)
				This background is made by James Introcaso
	Code by:	James Bowman (based on work by MorePurpleMoreBetter)
	Date:		2017-02-13 (sheet v12.81)
	
	Please support the creator of this content (James Introcaso) and download their material from DM Guild: http://www.dmsguild.com/browse.php?author=James%20Introcaso
*/

BackgroundList["legendary lineage"] = {
		regExpSearch : /^(?=.*(legendary))(?=.*lineage).*$/i,
		name : "Legendary Lineage",
		source : ["WBB:15", 10],
		skills : ["Athletics", "History"],
		gold : 15,
		equipleft : [
			["Wood figure of ancestor", "", ""],
			["Signet ring", "", ""],
			["Gaming set", 1, ""]
		],
		equipright : [
			["Traveler's clothes", "", 4],
			["Belt pouch (with coins)", "", 1]
		],
		feature : "Good Reputation",
		trait : [
			"I am polite and humble to all who fawn over me.",
			"I'm sure you've heard of the great heroes of my family, but let me tell you anyway.",
			"I am quiet in public and don't enjoy being noticed.",
			"I boast about how I will put my ancestors' deeds to shame.",
			"I am attracted to people who don't fawn over me right away.",
			"I often find reasons to excuse myself from large groups of people who love me for my name.",
			"I am able to fake smile for anyone, even if I hate that person.",
			"I always ask for people to give me free stuff because I can."		
		],
		ideal : [
			["Family",
				"Family: I intend to uphold my family name. (Lawful)"
			],
			["Might",
				"Might: I was born better than everyone and so I deserve better than everyone. (Evil)"
			],
			["Individuality",
				"Individuality: I am not my family's name and will make my own legend. (Chaotic)"
			],
			["Leadership",
				"Leadership: I feel a call beyond my heritage to protect the people who look to me. (Good)"
			],
			["Aspiration",
				"Aspiration: I want to make the people who believe in me proud. (Neutral)"
			],
			["Generosity",
				"Generosity: I was lucky to be born into this family and I will give back to those less fortunate. (Good)"
			]
		],
		bond : [
			"I wield the same weapon my ancestor used.",
			"No one knows the real me like my childhood best friend.",
			"A parent will not respect me until I make good on the family name.",
			"I would do anything to protect the town where I grew up.",
			"I have my eye on a quiet cottage to which I plan to retire.",
			"I feel like the only person who really gets me is my dog."
		],
		flaw : [
			"I can only handle so much fawning before I explode in anger.",
			"If I am not constantly praised, I doubt myself.",
			"If you speak ill of my ancestors, I will punch you in the face.",
			"I prefer to have someone else fix my personal problems.",
			"I put down others to boost my own confidence.",
			"If something is fashionable, I will avoid it at all costs."
		],
		languages : ["+1 from "],
		variant : [],
		tools : ["Vehicles (land)"],
		lifestyle : "modest"
};

BackgroundFeatureList["good reputation"] = {  
	description : "People in positions of power and privilege are willing to take a meeting with you and grant you favors. The DM decides the extent and effect of these favors, but they should not involve lavish gifts or great personal risk to the granter.",
	source : ["WBB:15", 10]
};

SourceList["WBB:15"] = {
	name : "15 New Backgrounds - World Builder Blog Presents",
	abbreviation : "WBB:15",
	group : "Dungeon Masters Guild",
	url : "http://www.dmsguild.com/product/171771"
};

UpdateDropdown("background");
UpdateDropdown("backgroundfeature");