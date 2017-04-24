/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Races, Subraces, Creatures
	Effect:		This script adds a number of races and creatures from the Magic: The Gathering plane of Innistrad
				This is taken from the Plane Shift: Innistrad article (http://www.dragonmag.com/5.0/#!/article/106375/102161027)
	Code by:	SoilentBrad (and tiny corrections by MPMB)
	Date:		2017-04-24 (sheet v12.96)
*/

SourceList["PS:I"] = {
	name : "Plane Shift: Innistrad", // 2016-08
	abbreviation : "PS:I",
	group : "Plane Shift",
	url : "http://bit.ly/29GAcW1"
};

RaceList["human, gavony"] = {
	regExpSearch : /^(?=.*\b(gavony|gavonian)\b).*$/i,
	name : "Gavonian",
	sortname : "Human, Gavony",
	source : ["PS:I", 8],
	plural : "Gavonians",
	size : 3,
	speed : [30, 20],
	languages : ["Common", "+1 from human"],
	age : " reach adulthood in their late teens and live less than a century",
	height : " range from 5 to over 6 feet tall (4'9\" + 2d8\")",
	weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
	heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)",
	weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
	improvements : "Gavonian Human: +1 to each ability score;",
	scores : [1, 1, 1, 1, 1, 1],
	trait : "Gavonian Human (+1 to each ability score)\nGavonian: Whether safe behind the walls of the High City of Thraben or out in the moors with little more than shuttered windows, barred doors, and grim determination to stand against the horrors of the night, my people are the most well-rounded of Innistrad.",
};
RaceList["human, kessig"] = {
	regExpSearch : /^(?=.*\b(kessig|kessiger)\b).*$/i,
	name : "Kessiger",
	sortname : "Human, Kessig",
	source : ["PS:I", 8],
	plural : "Kessigers",
	size : 3,
	speed : [40, 30],
	skills : ["Survival"],
	languages : ["Common", "+1 from human"],
	age : " reach adulthood in their late teens and live less than a century",
	height : " range from 5 to over 6 feet tall (4'9\" + 2d8\")",
	weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
	heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)",
	weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
	improvements : "Kessiger Human: +1 Dexterity, +1 Wisdom;",
	scores : [0, 1, 0, 0, 1, 0],
	trait : "Kessiger Human (+1 Dexterity, +1 Wisdom)\nSure-Footed: When I use the Dash action, difficult terrain doesn't cost extra movement on that turn.\nSpring Attack: When I make a melee attack against a creature, I don't provoke opportunity attacks from that creature for the rest of my turn, whether I hit or not.",
};
RaceList["human, nephalia"] = {
	regExpSearch : /^(?=.*\b(nephalia|nephalian)\b).*$/i,
	name : "Nephalian",
	sortname : "Human, Nephalia",
	source : ["PS:I", 8],
	plural : "Nephalians",
	size : 3,
	speed : [30, 20],
	skillstxt : "Any combination of four skills and tools",
	languages : ["Common", "+1 from human"],
	age : " reach adulthood in their late teens and live less than a century",
	height : " range from 5 to over 6 feet tall (4'9\" + 2d8\")",
	weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
	heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)",
	weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
	improvements : "Nephalian Human: +1 Intelligence, +1 Charima;",
	scores : [0, 0, 0, 1, 0, 1],
	trait : "Nephalian Human (+1 Intelligence, +1 Charima)\nBreadth of Knowledge: I gain proficiency in any combination of four skills or four tools of my choice.",
};
RaceList["human, stensia"] = {
	regExpSearch : /^(?=.*\b(stensia|stensian)\b).*$/i,
	name : "Stensian",
	sortname : "Human, Stensia",
	source : ["PS:I", 8],
	plural : "Stensians",
	size : 3,
	speed : [30, 20],
	skills : ["Intimidation"],
	languages : ["Common", "+1 from human"],
	age : " reach adulthood in their late teens and live less than a century",
	height : " range from 5 to over 6 feet tall (4'9\" + 2d8\")",
	weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
	heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)",
	weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
	improvements : "Stensian Human: +1 Strength, +1 Constitution;",
	scores : [1, 0, 1, 0, 0, 0],
	trait : "Stensian Human (+1 Strength, +1 Constitution)\nDaunting: I have proficiency in the Intimidation skill.\nTough: My hit point maximum increases by 2, and it increases by 2 every time I gain a level.",
	features : {
		"tough" : {
			name : "Tough",
			minlevel : 1,
			calcChanges : {
				hp : "extrahp += totalhd * 2; extrastring += '\\n + ' + totalhd + ' \\u00D7 2 from the Stensian Tough feature (' + (totalhd * 2) + ')';"
			}
		}
	}
};

BackgroundList["inquisitor"] = {
	regExpSearch : /inquisitor/i,
	name : "Inquisitor",
	source : ["PS:I", 12],
	skills : ["Investigation", "Religion"],
	gold : 15,
	equipleft : [
		["Traveler's clothes", "", 3],
		["Holy symbol", "", ""],
		["Belt pouch (with coins)", "", 1]
	],
	feature : "Legal Authority",
	trait : [
		"It will all go smoothly if everyone just does as I say.",
		"Despair is an extravagance we can ill afford.",
		"I know the writings of Saint Raban backward and forward.",
		"I try to see the bright side in the very worst situations.",
		"It helps me feel better when others show sympathy or appreciation for the horrors I've endured.",
		"I prefer to face evil with a strong group of friends in front of me.",
		"I want to see the wicked burn for the evil they've brought on us.",
		"I feel the sin being purged from me as I help cleanse the world."
	],
	ideal : [
		["Honesty",
			"Honesty: The smallest deception paves the way to grievous sin. (Lawful)"
		],
		["Piety",
			"Piety: Devotion to the angels and the rites of the church is all that keeps the world from destruction. (Good)"
		],
		["Order",
			"Order: The laws of Avacyn are meant to preserve the social order—everything in its proper place. (Lawful)"
		],
		["Humanity",
			"Humanity: Human life is to be cherished and preserved against the horrors of the night. (Good)"
		],
		["Knowledge",
			"Knowledge: The path to holiness comes through understanding of the world. (Any)"
		],
		["Punishment",
			"Punishment: It is better for the innocent to suffer than for the guilty to escape their due. (Evil)"
		]
	],
	bond : [
		"Thraben is the heart of the world. The cathedral must stand even if the hinterlands are lost.",
		"One day, I will claim vengeance against the monster that took my family from me.",
		"My weapon is all I have to remember my beloved mentor by.",
		"The geist of my beloved speaks to me sometimes.",
		"My dear sibling is now a werewolf.",
		"A small crossways chapel is my spiritual home."
	],
	flaw : [
		"I am troubled by the wild rage and bloodlust that lurks in my own heart.",
		"I have come to believe that I executed an innocent person.",
		"I enjoy the prestige of my position more than service to the angels.",
		"I drink to forget the horrors I've seen.",
		"I might have made a promise to a demon that I can't keep.",
		"I'll do whatever grim task must be done, for my soul is already lost."
	],
	tools : ["One set of artisan's tools", "Thieves' tools"],
	variant : []
};
BackgroundFeatureList["legal authority"] = {
	description : "As an inquisitor of the church, I have the authority to arrest criminals. In the absence of other authorities, I am authorized to pass judgment and even carry out sentencing. If I abuse this power, however, my superiors in the church might strip it from me.",
	source : ["PS:I", 12]
};

UpdateDropdown("race");
UpdateDropdown("background");
UpdateDropdown("backgroundfeature");