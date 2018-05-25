/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Background
	Effect:		This script adds a background, including its seven options, called "Half-Vistani"
				This is taken from the Sterling Vermin Adventuring Co. website (https://sterlingvermin.files.wordpress.com/2016/03/the-half-vistani.pdf)
				This background is made by /u/coolgamertagbro
	Code by:	Marshall
	Date:		2017-11-29 (sheet v12.999)
	
	Please support the creator of this content (Sterling Vermin Adventuring Co.) and download this and other material from there: https://sterlingvermin.com/
*/

var iFileName = "Half-Vistani [Sterling Vermin's work, transcribed by Marshall].js";
RequiredSheetVersion(12.999);

SourceList["SV:HV"] = {
	name : "Sterling Vermin: Half-Vistani",
	abbreviation : "SV:HV",
	group : "Sterling Vermin Adventuring Co.",
	url : "https://sterlingvermin.files.wordpress.com/2016/03/the-half-vistani.pdf",
	date : "2016/03/09"
};

BackgroundList["half-vistani"] = {
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
	languageProfs : ["Patterna", 1],
	lifestyle : "modest"
};
AddBackgroundVariant("half-vistani", "corvara", {
	regExpSearch : /^(?=.*half)(?=.*vistani)(?=.*corvara).*$/i,
	name : "Half-Vistani (Corvara)",
	source : ["SV:HV", 1],
	skills : ["History"],
	toolProfs : ["Forgery kit", ["Thieves' tools", "Dex"]]
});
AddBackgroundVariant("half-vistani", "equaar", {
	regExpSearch : /^(?=.*half)(?=.*vistani)(?=.*equaar).*$/i,
	name : "Half-Vistani (Equaar)",
	source : ["SV:HV", 1],
	skills : ["History", "Animal Handling"]
});
AddBackgroundVariant("half-vistani", "kamii", {
	regExpSearch : /^(?=.*half)(?=.*vistani)(?=.*kamii).*$/i,
	name : "Half-Vistani (Kamii)",
	source : ["SV:HV", 1],
	skills : ["History"],
	toolProfs : [["Artisan's tool", 2]]
});
AddBackgroundVariant("half-vistani", "naiat", {
	regExpSearch : /^(?=.*half)(?=.*vistani)(?=.*naiat).*$/i,
	name : "Half-Vistani (Naiat)",
	source : ["SV:HV", 1],
	skills : ["History", "Performance"]
});
AddBackgroundVariant("half-vistani", "vatraska", {
	regExpSearch : /^(?=.*half)(?=.*vistani)(?=.*vatraska).*$/i,
	name : "Half-Vistani (Vatraska)",
	source : ["SV:HV", 1],
	skills : ["History", "Medicine"]
});
AddBackgroundVariant("half-vistani", "zarovan", {
	regExpSearch : /^(?=.*half)(?=.*vistani)(?=.*zarovan).*$/i,
	name : "Half-Vistani (Zarovan)",
	source : ["SV:HV", 1],
	skills : ["History", "Perception"]
});

BackgroundFeatureList["wanderlust"] = {
	description : "By leaving the ranks of the vistani you have lost the ability to walk the mists unharmed and without getting lost but you still feel a powerful compulsion to be on the move. You gain advantage on any rolls made to set or follow a course and traveling is considered light activity for the purposes of resting for you.",
	source : ["SV:HV", 1]
};
