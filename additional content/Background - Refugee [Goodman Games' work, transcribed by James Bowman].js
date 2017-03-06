/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a background, called "Refugee"
				This is taken from DriveThruRPG (http://www.drivethrurpg.com/product/132657/)
				This subrace is made by Goodman Games
	Code by:	James Bowman (based on work by MorePurpleMoreBetter)
	Date:		2017-02-12 (sheet v12.81)
	
	Please support the creator of this content (Goodman Games) and download their Fifth Edition Fantasy material from DriveThruRPG: http://www.drivethrurpg.com/browse/pub/36/Goodman-Games/subcategory/187_22136/5E-Products
*/

BackgroundList["refugee"] = {
		regExpSearch : /refugee/i,
		name : "Refugee",
		source : ["FEF1:G", 14],
		skills : ["Athletics", "Survival"],
		gold : 10,
		equipleft : [
			["Set of artisan's tools", "", ""],
			["Small wood axe", "", 2],
			["Two-person tent", "", 20]
		],
		equipright : [
			["Common clothes", "", 3],
			["Token reminding you of home", 1, ""]
		],
		feature : "Far-Flung Friends",
		trait : [
			"I readily share what little I have with others in need.",
			"I refuse to quit, no matter how difficult things may seem.",
			"Despite the troubles I've experienced, I have a deep love for traveling the open road and the new experiences such a journey entails.",
			"I've collected a number of choice words from different dialects during my journeys and constantly pepper my speech with them.",
			"I hate not knowing where I am and collect maps and other scraps of travel lore whenever possible.",
			"I strive to learn new things whenever I can, for you never know when a bit of knowledge or skill might mean the difference between life and death.",
			"I have little time for laughter or frivolity. Survival is a serious matter.",
			"I've had few companions on the road and tend to talk to myself and/or my mount to keep me company."
		],
		ideal : [
			["Cooperation",
				"Cooperation: You are only as strong as the weakest amongst you and must stand ready to assist others when they falter. (Good)"
			],
			["Stability", 
				"Stability: There is no greater aspiration in life than to possess a home or other place where one is safe and secure. (Lawful)"
			],
			["Self-Reliance", 
				"Self-Reliance: The ability to provide for oneself liberates you from the need to rely on others. (Chaotic)"
			],
			["Vigilance",
				"Vigilance: One must constantly be on the lookout for danger or difficulty, and swift to intercede before it comes to fruition. (Neutral)"
			],
			["Might",
				"Might: If someone is not strong enough to hold what is theirs, you have every right to take it for your own. (Evil)"
			],
			["Faith", 
				"Faith: Trust in the gods to guide you through hardships and they shall eventually put you where they intend for you to be. (Any)"
			]
		],
		bond : [
			"Survival requires cooperation and I am dedicated to those I share the road with.",
			"I harbor an intense hatred for those people or forces responsible for the destruction of my home.",
			"Although separated by disaster and distance, my people remain dear to me and I will do anything to aid them.",
			"A kindly soul helped me when I most needed assistance and I've vowed to return the favor whenever possible.",
			"I am devoted to preserving the history, culture, and customs of my lost homeland.",
			"I strive to one day return to my former home and see it rise from the ashes."
		],
		flaw : [
			"Having been bitterly disappointed in the past, I'm reluctant to trust others.",
			"I am prone to looking out for myself first and foremost.",
			"I am an easily swayed by someone with a hard luck story.",
			"I had a role - either willingly or unwittingly - in the catastrophe that displaced my loved ones and I must hide my shameful secret.",
			"I hoard every resource I can, be it money, magic, or food, for fear I might find myself lacking when I most need these things.",
			"I have no respect for those who lead a life of luxury and leisure, untested by the hardships of life."
		],
		variant: [],
		tools: ["Artisan's tools", "Vehicles (land)"],
		lifestyle : "poor"
};

BackgroundFeatureList["far-flung friends"] = {  
	description : "In communities that are now home to your kith and kin, you can count on housing, food, free advice, and other assistance so long as it doesn’t threaten the lives and well-being of those lending you aid. Your DM will decide whether or not a particular community has fellow refugees amongst its population.",
	source : ["FEF1:G", 14]
};

SourceList["FEF1:G"] = {
	name : "Fifth Edition Fantasy #1: Glitterdoom",
	abbreviation : "FEF1:G",
	group : "Goodman Games",
	url : "http://www.drivethrurpg.com/product/132657/"
};

UpdateDropdown("background");
UpdateDropdown("backgroundfeature");