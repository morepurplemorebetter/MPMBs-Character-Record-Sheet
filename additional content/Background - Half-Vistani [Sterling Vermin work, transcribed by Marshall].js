/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Background
	Effect:		This script adds a background, including its seven options, called "Half-Vistani"
				This is taken from the Sterling Vermin Adventuring Co. website (https://sterlingvermin.files.wordpress.com/2016/03/the-half-vistani.pdf)
				This background is made by /u/coolgamertagbro
	Code by:	Marshall
	Date:		2017-01-05 (sheet v12.8)
	
	Please support the creator of this content (Sterling Vermin Adventuring Co.) and download this and other material from there: https://sterlingvermin.com/
*/

BackgroundList["half-vistani (canjar)"] = {
	regExpSearch : /^(?=.*half)(?=.*vistani)(?=.*canjar).*$/i,
	name : "Half-Vistani (Canjar)",
	source : ["SV:HV", 1],
	skills : ["History", "Arcana"],
	gold : 15,
	equipleft : [
		["Backpack, with:", "", 5],
		["Bedroll", 1, 7],
		["Mess kit", 1, 1],
	],
	equipright : [
		["Traveler's clothes", "", 3],
		["Lucky charm", "", 1],
		["Belt pouch (with coins)", "", 1],
	],
	feature : "Wanderlust",
	trait : [
		"I still look down on the giorgio, the non-vistani, and take great pride in my relationship to the vistani and my tribe.",
		"The first time I enter a place I always note objects of value and inconspicuous entrances and exits.",
		"I get restless when I stay in the same town for more than a few nights in a row. I am happiest on the open road.",
		"I am highly superstitious and carry many charms to ward off bad luck, evil spirits, and nightmares.",
		"I take promises seriously. I only offer a promise when I mean it and I expect the same of others.",
		"I do not take slights against me well. At all.",
		"Tomorrow I may die so today I satisfy every hunger and quench every thirst. I never say no to something I want.",
		"I am fascinated by cursed items and haunted places."
	],
	ideal : [
		["Tradition",
			"Tradition: I may have left the vistani and my tribe but I still abide by their laws and customs. (Lawful)"
		],
		["Greater Good",
			"Greater Good: Mortals must stand together against the darkness of the world. (Good)"
		],
		["Change",
			"Change: We change or we die. I will not die. (Chaotic)"
		],
		["Family",
			"Family: I am loyal to my friends and family above any ideals. (Neutral)"
		],
		["Independence",
			"Independence: I am a free spirit - no one tells me what to do. (Chaotic)"
		],
		["Mastery",
			"Mastery: Barovia is a prison ruled by the wicked. Better to reign as a sinner than serve as a saint. (Evil)"
		],
	],
	bond : [
		"I regret leaving the vistani. I will do everything in my power to be adopted back in.",
		"I fled my tribe when I committed a grave crime. I fear the day our paths cross again.",
		"Somewhere out there, I have a child who doesn’t know me. I will find a way to give that child a better life than my own.",
		"Someone I loved was killed. I will not stop seeking revenge until they get their justice.",
		"I left the vistani because I fell in love with the land I now try to protect against the forces of darkness.",
		"I fell in love with a giorgio and everything I do is part of my effort to win them over."
	],
	flaw : [
		"When I am offered a chance to partake of a vice I can rarely say no.",
		"I never let a challenge go unanswered.",
		"I would rather tell a pretty lie than an ugly truth.",
		"I can’t speak to a giorgio without a condescending tone.",
		"I will never bend a knee to a master or take orders from another.",
		"I maintain a collection of personal trinkets from every residence I enter."
	],
	languages : ["Patterna", "+1 from "],
	variant : ["half-vistani (corvara)", "half-vistani (equaar)", "half-vistani (kamii)", "half-vistani (naiat)", "half-vistani (vatraska)", "half-vistani (zarovan)"],
	lifestyle : "modest",
};
BackgroundSubList["half-vistani (corvara)"] = {
	regExpSearch : /^(?=.*half)(?=.*vistani)(?=.*corvara).*$/i,
	name : "Half-Vistani (Corvara)",
	source : ["SV:HV", 1],
	skills : ["History"],
	tools : ["forgery kit", "thieves' tools"],
};
BackgroundSubList["half-vistani (equaar)"] = {
	regExpSearch : /^(?=.*half)(?=.*vistani)(?=.*equaar).*$/i,
	name : "Half-Vistani (Equaar)",
	source : ["SV:HV", 1],
	skills : ["History", "Animal Handling"],
};
BackgroundSubList["half-vistani (kamii)"] = {
	regExpSearch : /^(?=.*half)(?=.*vistani)(?=.*kamii).*$/i,
	name : "Half-Vistani (Kamii)",
	source : ["SV:HV", 1],
	skills : ["History"],
	tools : ["2 types of artisan's tool"],
};
BackgroundSubList["half-vistani (naiat)"] = {
	regExpSearch : /^(?=.*half)(?=.*vistani)(?=.*naiat).*$/i,
	name : "Half-Vistani (Naiat)",
	source : ["SV:HV", 1],
	skills : ["History", "Performance"],
};
BackgroundSubList["half-vistani (vatraska)"] = {
	regExpSearch : /^(?=.*half)(?=.*vistani)(?=.*vatraska).*$/i,
	name : "Half-Vistani (Vatraska)",
	source : ["SV:HV", 1],
	skills : ["History", "Medicine"],
};
BackgroundSubList["half-vistani (zarovan)"] = {
	regExpSearch : /^(?=.*half)(?=.*vistani)(?=.*zarovan).*$/i,
	name : "Half-Vistani (Zarovan)",
	source : ["SV:HV", 1],
	skills : ["History", "Perception"],
};
UpdateDropdown("background");

BackgroundFeatureList["wanderlust"] = {
	description : "By leaving the ranks of the vistani you have lost the ability to walk the mists unharmed and without getting lost but you still feel a powerful compulsion to be on the move. You gain advantage on any rolls made to set or follow a course and traveling is considered light activity for the purposes of resting for you.",
	source : ["SV:HV", 1],
};
UpdateDropdown("backgroundfeature");

SourceList["SV:HV"] = {
	name : "Sterling Vermin: Half-Vistani",
	abbreviation : "SV:HV",
	group : "Sterling Vermin Adventuring Co.",
	url : "https://sterlingvermin.files.wordpress.com/2016/03/the-half-vistani.pdf"
};