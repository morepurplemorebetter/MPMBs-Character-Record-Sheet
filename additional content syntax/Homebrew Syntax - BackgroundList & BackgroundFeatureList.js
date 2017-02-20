/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Background and Background Feature
	Effect:		This is the syntax for adding a new background and the syntax for adding a new background feature below it
	Sheet:		v12.83 (2017-02-18)
*/

BackgroundList["where i am from"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []
	regExpSearch : /\bwhere\b.*\bi\b.*\bam\b.*\bfrom\b/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has the consecutive words "where", "i", "am", and "from" in it, disregarding capitalization or words in between). If this looks to complicated, just write: /where i am from/i
	
	name : "Where I am From", //required; the name as used
	
	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js"
	
	skills : ["Deception", "Stealth"], //optional; skill proficiencies gained from having the background. If the background doesn't give fixed proficiencies, but instead gives a choice, delete this line and use the line below, "skillstxt"
	
	skillstxt : "Choose two from Deception, Insight, Persuasion, and Stealth", //optional; the text displayed when listing the skill choices the background gives. If the background only gives fixed skill proficiencies (no choices), then delete this line and only use "skills" above
	
	gold : 15, //required; the amount of gold pieces added to the Equipment section on the second page when selecting "Background's items and gold" from the "Add Equipment" menu.
	
	equipleft : [ //optional; syntax is: ["description", "amount", "weight"]. Put "" if it is nothing, don't put 0
		["Scroll of pedigree", "", ""],
		["Skin of fine zzar or wine", "", 5],
	], //items as they are added to the left column of the Equipment section on the second page when selecting "Background's items and gold" from the "Add Equipment" menu.
	
	equipright : [ //optional; samy syntax as "equipleft"
		["Dark, common clothes with hood", "", 3],
		["Crowbar", "", 5],
		["Belt pouch (with coins)", "", 1],
	],
	
	feature : "Exceptional Quality", //required; the name of the background feature as it will appear on the sheet. The feature is then retrieved from the BackgroundFeatureList, see below
	
	trait : [
		"I always have a plan for what to do when things go wrong.",
		"I am always calm, no matter the situation. I never raise my voice or let my emotions control me.",
		"The first thing I do in a new place is note the locations of everything valuable \u2015 or where such things could be hidden.",
		"I would rather make a new friend than a new enemy.",
		"I am incredibly slow to trust. Those who seem the fairest often have the most to hide.",
		"I don't play attention to the risks in a situation. Never tell me the odds.",
		"The best way to get me to do something is to tell me I can't do it.",
		"I blow up at the slightest insult."
	], //required; A list of the personality traits that can be chosen using the "Add Features" button on the second page. This list can be any length.
	
	ideal : [
		["Honor",
			"Honor: I don't steal from others in the trade. (Lawful)"
		],
		["Freedom",
			"Freedom: Chains are meant to be broken, as are those who would forge them. (Chaotic)"
		],
		["Charity",
			"Charity: I steal from the wealthy so that I can help people in need. (Good)"
		],
		["Greed",
			"Greed: I will do whatever it takes to become wealthy. (Evil)"
		],
		["People",
			"People: I'm loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care. (Neutral)"
		],
		["Redemption",
			"Redemption: There's a spark of good in everyone. (Good)"
		],
	], //required; A list of the  ideals that can be chosen using the "Add Features" button on the second page. This list can be any length. Take note of the two-step build for every ideal, this is essential!
	
	bond : [
		"I'm trying to pay off an old debt I owe to a generous benefactor.",
		"My ill-gotten gains go to support my family.",
		"Something important was taken from me, and I aim to steal it back.",
		"I will become the greatest thief that ever lived.",
		"I'm guilty of a terrible crime. I hope I can redeem myself for it.",
		"Someone I loved died because of a mistake I made. That will never happen again."
	], //required; A list of the bonds that can be chosen using the "Add Features" button on the second page. This list can be any length.
	
	flaw : [
		"When I see something valuable, I can't think about anything but how to steal it.",
		"When faced with a choice between money and my friends, I usually choose the money.",
		"If there's a plan, I'll forget it. If I don't forget it, I'll ignore it.",
		"I have a \"tell\" that reveals when I'm lying.",
		"I turn tail and run when things look bad.",
		"An innocent person is in prison for a crime that I committed. I'm okay with that."
	],  //required; A list of the bonds that can be chosen using the "Add Features" button on the second page. This list can be any length.
	
	extra : [
		"Select a Criminal Specialty",
		"Blackmailer",
		"Burglar",
		"Enforcer",
		"Fence",
		"Highway robber",
		"Hired killer",
		"Pickpocket",
		"Smuggler",
		"Spy"
	], //optional; the extra options the background gives on the first page of the sheet (in line Background at the top there are two drop-down menus). The first entry in this array is what is used for the mouseover text. If your background offers no extra features, simply delete this entry. Make sure that text you enter here fits into the field, or it won't look as good
	
	tools : ["A type of gaming set", "Thieves' tools"], //optional; tool proficiencies gained from the background. If the background offers no tool proficiencies, you can delete this line
	
	languages : ["+1 from "], //optional; languages gained from the background. If the background offers no languages, you can delete this line
	
	variant : ["urban bounty hunter", "pirate"], //optional; the variants this background has, using the exact names of the entry of the variant in the BackgroundSubList. If you don't want to define a variant, just put |variant : [],|
	
	lifestyle : "comfortable", //optional; sets the lifestyle of the sheet. Options are: "wretched", "squalid", "poor", "modest", "comfortable", "wealthy", or "aristocratic"
};

UpdateDropdown("background"); //Optional; This updates the background dropdown field

BackgroundFeatureList["exceptional quality"] = {  //Note the use of only lower case!
	description : "My accent, mannerisms, figures of speech all mark me as foreign. Curious glances are directed my way wherever I go. A nuisance, but I also gain the friendly interest of the curious. I can parley this attention into access I might not otherwise have, for me and my companions. Nobles, scholars, merchants, and guilds, might be among the interested.", //required; the description of the feature as it will be put on the sheet. Make sure that this fits into the field or it won't look so pretty.
	
	source : ["S", 149], //required; the source and the page number of the feature
};

UpdateDropdown("backgroundfeature"); //Optional; This updates the background feature dropdown field