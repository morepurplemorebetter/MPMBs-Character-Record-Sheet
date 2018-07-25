var Base_BackgroundList = {
	"acolyte" : {
		regExpSearch : /acolyte/i,
		name : "Acolyte",
		source : [["SRD", 60], ["P", 127], ["ALbackground", 0]],
		skills : ["Insight", "Religion"],
		gold : 15,
		equipleft : [
			["Prayer book/wheel", "", 5],
			["Incense, sticks of", 5, ""],
			["Vestments", "", 4]
		],
		equipright : [
			["Common clothes", "", 3],
			["Holy symbol (type)", "", 1],
			["Belt pouch (with coins)", "", 1]
		],
		feature : "Shelter of the Faithful",
		trait : [
			"I venerate a distinct hero of my faith, and persistently reference that individual's accomplishments and lessons.",
			"I can find universal ground between the most vehement enemies, sympathizing with them and always moving toward unity.",
			"I see portents in all things. The gods attempt to communicate to us, we just need to pay attention.",
			"Nothing can rattle my positive attitude.",
			"I quote (or misquote) holy scripture and aphorisms in nearly all circumstances.",
			"I am accepting (or unaccepting) of other faiths and honor (or dishonor) the devotion to other deities.",
			"I've enjoyed exquisite food, drink, and aristocracy among my faith's most elite. Rougher lifestyles chafe me.",
			"I've spent so much time in the confines of the temple that I have few functional skills interacting with individuals in the rest of the world."
		],
		ideal : [
			["Tradition",
				"Tradition: The age-old institutions of devotion and forfeiture must be sustained and maintained. (Lawful)"
			],
			["Charity",
				"Charity: I always attempt to assist those in need, regardless of the personal cost. (Good)"
			],
			["Change",
				"Change: We must help induce the developments the gods are continually cultivating in the world. (Chaotic)"
			],
			["Power",
				"Power: I aspire to someday ascend to the elite of my faith's highest echelon. (Lawful)"
			],
			["Faith",
				"Faith: I believe that my deity will direct my work. I have confidence that if I work diligently, my work will be rewarded. (Lawful)"
			],
			["Aspiration",
				"Aspiration: I aim to demonstrate myself worth my deity's favor by paralleling my actions against their instruction. (Any)"
			]
		],
		bond : [
			"I would sacrifice anything to recover a long lost ancient relic of my temple (or faith).",
			"I will get revenge on my temple's corrupted hierarchy that branded me a heretic.",
			"I can never repay what I owe to the priest that took me in as an orphan.",
			"Everything I do is for those less fortunate.",
			"I will do whatever is necessary to keep my temple safe.",
			"I safeguard holy scripture that some claim is heretical and seek to destroy."
		],
		flaw : [
			"I hold others to a high standard, and myself even higher.",
			"I place too much faith in those most powerful within my temple's hierarchy.",
			"My religiosity can lead me to naively trust those that claim faith in my deity.",
			"I am very stubborn in my thinking.",
			"I am pessimistic and distrustful of strangers.",
			"Once I choose an objective, I become so single minded that the rest of my life fades into the background."
		],
		languageProfs : [2],
		lifestyle : "modest"
	}
};

var Base_BackgroundSubList = {};

var Base_BackgroundFeatureList = {
	"shelter of the faithful" : {
		description : "I command the respect of those who share my faith. I can perform the religious ceremonies of my faith. My companions and I can expect free healing and care at an establishment of my faith, though I must provide any material components needed for spells. Those who share my religion will support me at a modest lifestyle.",
		source : [["SRD", 61], ["P", 127], ["ALbackground", 0]]
	}
};
