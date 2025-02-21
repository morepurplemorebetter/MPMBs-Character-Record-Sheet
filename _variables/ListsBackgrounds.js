// personality traits, ideals, bonds, and flaws taken from PHB'14
var Base_BackgroundList = {
	"acolyte" : {
		regExpSearch : /acolyte/i,
		name : "Acolyte",
		source : [["free", 0], ["P24", 178]],
		scorestxt : "+2 to one and +1 to another -or- +1 to all three: Intelligence, Wisdom, and Charisma",
		skills : ["Insight", "Religion"],
		toolProfs : [["Calligrapher's Supplies", "Dex"]],
		gold : 8,
		equipleft : [
			["Book (prayers)", "", 5],
			["Calligrapher's supplies", "", 5],
			["Parchment, sheets of", 10, ""]
		],
		equipright : [
			["Robe", "", 4],
			["Holy symbol (choose one)", "", 1],
			["Belt pouch (with coins)", "", 1]
		],
		feature : "Acolyte",
		// from PHB'14:
		traitsSourceString : "PHB'14 127",
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
		]
	},
	"criminal" : {
		regExpSearch : /criminal/i,
		name : "Criminal",
		source : [["free", 0], ["P24", 179]],
		scorestxt : "+2 to one and +1 to another -or- +1 to all three: Dexterity, Constitution, and Intelligence",
		skills : ["Sleight of Hand", "Stealth"],
		toolProfs : [["Thieves' Tools", "Dex"]],
		gold : 16,
		equipleft : [
			["Crowbar", "", 5],
			["Thieves' tools", "", 1]
		],
		equipright : [
			["Traveler's clothes", "", 4],
			["Pouch", '', 1],
			["Belt pouch (with coins)", '', 1],
			["Dagger", 2, 1]
		],
		equip1stPage : {
			weapons : ["Dagger", "Dagger (off-hand)"]
		},
		feature : "Criminal",
		// from PHB'14:
		traitsSourceString : "PHB'14 129",
		trait : [
			"I always have a plan for what to do when things go wrong.",
			"I am always calm, no matter the situation. I never raise my voice or let my emotions control me.",
			"The first thing I do in a new place is note the locations of everything valuable \u2015 or where such things could be hidden.",
			"I would rather make a new friend than a new enemy.",
			"I am incredibly slow to trust. Those who seem the fairest often have the most to hide.",
			"I don't pay attention to the risks in a situation. Never tell me the odds.",
			"The best way to get me to do something is to tell me I can't do it.",
			"I blow up at the slightest insult."
		],
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
			]
		],
		bond : [
			"I'm trying to pay off an old debt I owe to a generous benefactor.",
			"My ill-gotten gains go to support my family.",
			"Something important was taken from me, and I aim to steal it back.",
			"I will become the greatest thief that ever lived.",
			"I'm guilty of a terrible crime. I hope I can redeem myself for it.",
			"Someone I loved died because of a mistake I made. That will never happen again."
		],
		flaw : [
			"When I see something valuable, I can't think about anything but how to steal it.",
			"When faced with a choice between money and my friends, I usually choose the money.",
			"If there's a plan, I'll forget it. If I don't forget it, I'll ignore it.",
			"I have a \"tell\" that reveals when I'm lying.",
			"I turn tail and run when things look bad.",
			"An innocent person is in prison for a crime that I committed. I'm okay with that."
		],
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
		]
	},
	"sage" : {
		regExpSearch : /sage/i,
		name : "Sage",
		source : [["free", 0], ["P24", 183]],
		scorestxt : "+2 to one and +1 to another -or- +1 to all three: Constitution, Intelligence, and Wisdom",
		skills : ["Arcana", "History"],
		toolProfs : [["Calligrapher's Supplies", "Dex"]],
		gold : 8,
		equipleft : [
			["Parchment, sheets of", 8, ""],
			["Calligrapher's supplies", "", 5],
			["Book (history)", "", 5]
		],
		equipright : [
			["Robe", "", 4],
			["Belt pouch (with coins)", "", 1],
			["Quarterstaff", "", 4]
		],
		equip1stPage : {
			weapons : ["Quarterstaff"]
		},
		feature : "Sage",
		// from PHB'14:
		traitsSourceString : "PHB'14 138",
		trait : [
			"I use polysyllabic words that convey the impression of great erudition.",
			"I've read every book in the world's greatest libraries\u2015 or I like to boast that I have.",
			"I'm used to helping out those who aren't as smart as I am, and I patiently explain anything and everything to others.",
			"There's nothing I like more than a good mystery.",
			"I'm willing to listen to every side of an argument before I make my own judgment.",
			"I . . . speak . . . slowly . . . when talking . . . to idiots, . . . which . . . almost. . . everyone . . . is . . . compared . . . to me.",
			"I am horribly, horribly awkward in social situations.",
			"I'm convinced that people are always trying to steal my secrets."
		],
		ideal : [
			["Knowledge",
				"Knowledge: The path to power and self-improvement is through knowledge. (Neutral)"
			],
			["Beauty",
				"Beauty: What is beautiful points us beyond itself toward what is true. (Good)"
			],
			["Logic",
				"Logic: Emotions must not cloud our logical thinking. (Lawful)"
			],
			["No Limits",
				"No Limits: Nothing should fetter the infinite possibility inherent in all existence. (Chaotic)"
			],
			["Power",
				"Power: Knowledge is the path to power and domination. (Evil)"
			],
			["Self-Improvement",
				"Self-Improvement: The goal of a life of study is the betterment of oneself. (Any)"
			]
		],
		bond : [
			"It is my duty to protect my students.",
			"I have an ancient text that holds terrible secrets that must not fall into the wrong hands.",
			"I work to preserve a library, university, scriptorium, or monastery.",
			"My life's work is a series of tomes related to a specific field of lore.",
			"I've been searching my whole life for the answer to a certain question.",
			"I sold my soul for knowledge. I hope to do great deeds and win it back."
		],
		flaw : [
			"I am easily distracted by the promise of information.",
			"Most people scream and run when they see a demon. I stop and take notes on its anatomy.",
			"Unlocking an ancient mystery is worth the price of a civilization.",
			"I overlook obvious solutions in favor of complicated ones.",
			"I speak without really thinking through my words, invariably insulting others.",
			"I can't keep a secret to save my life, or anyone else's."
		],
		extra : [
			"Select a Specialty",
			"Alchemist",
			"Astronomer",
			"Discredited academic",
			"Librarian",
			"Professor",
			"Researcher",
			"Wizard's apprentice",
			"Scribe"
		]
	},
	"soldier" : {
		regExpSearch : /^(?!.*mercenary)(?=.*soldier).*$/i,
		name : "Soldier",
		source : [["free", 0], ["P24", 185]],
		scorestxt : "+2 to one and +1 to another -or- +1 to all three: Strength, Dexterity, and Constitution",
		skills : ["Athletics", "Intimidation"],
		toolProfs : [["Gaming Set", 1]],
		gold : 14,
		equipleft : [
			["Gaming set (same as proficiency)", "", ""],
			["Healer's kit", "", 3]
		],
		equipright : [
			["Traveler's Clothes", "", 4],
			["Belt pouch (with coins)", 2, 1],
			["Spear", "", 3],
			["Shortbow", "", 2],
			["Quiver, with:", "", 1],
			["- Arrows", 20, 0.05]
		],
		equip1stPage : {
			weapons : ["Spear", "Shortbow"],
			ammo : [["Arrows", 20]]
		},
		feature : "Soldier",
		// from PHB'14:
		traitsSourceString : "PHB'14 140",
		trait : [
			"I'm always respectful and polite.",
			"I'm haunted by memories of war. I can't get the violent images out of my mind.",
			"I'm slow to make new friends, because I've lost too many old ones.",
			"I'm full of inspiring and cautionary tales from my military experience with some relevance to almost every type of combat situation.",
			"I can stare down an owlbear without flinching.",
			"I enjoy my strength and like to break things.",
			"I have a rough sense of humor.",
			"I approach problems head-on. A simple, direct course is the best path to a solution."
		],
		ideal : [
			["Greater Good",
				"Greater Good: Our fate is to give our lives in the defense of others. (Good)"
			],
			["Responsibility",
				"Responsibility: I do what I have to and follow just authority. (Lawful)"
			],
			["Independence",
				"Independence: When people obey orders blindly, they affirm a kind of tyranny. (Chaotic)"
			],
			["Might",
				"Might: In life as in war, the mightier force prevails. (Evil)"
			],
			["Live and Let Live",
				"Live and Let Live: Ideals aren't worth killing over or going to war for. (Neutral)"
			],
			["Nation",
				"Nation: My city, state, or people are the only things that matter. (Any)"
			]
		],
		bond : [
			"I would still give my life for the people I have served with.",
			"Someone saved my life on the battlefield. Even now, I would never leave a friend behind.",
			"My honor is my life.",
			"I'll never forget the crushing defeat my company endured or the foes who inflicted it.",
			"Those who fight with me are those worth laying down my life for.",
			"I fight for those who cannot fight for themselves."
		],
		flaw : [
			"The atrocious enemy we faced in battle still leaves me trembling with fear.",
			"I have little respect for those who are not a tested warrior.",
			"A disastrous mistake I made in battle cost many lives\u2015 I will do anything to keep that mistake a secret.",
			"My hatred of my foes is blind and unreasoning. ",
			"I uphold the law, even if the law causes suffering.",
			"I'd rather eat my weapon than admit when I'm wrong."
		],
		extra : [
			"Select a Specialty",
			"Officer",
			"Scout",
			"Infantry",
			"Cavalry",
			"Healer",
			"Quartermaster",
			"Standard-bearer",
			"Support staff"
		]
	}
};

var Base_BackgroundSubList = {};

var Base_BackgroundFeatureList = {
	"acolyte" : {
		description : "I devoted myself to service in a temple, either nestled in a town or a secluded sacred grove. There I performed rites in honor of a god or pantheon. I served under a priest and studied religion. Thanks to my priest's instruction and my own devotion, I also learned to channel a modicum of divine power in service to my place of worship and the people who pray there.",
		source : [["free", 0], ["P24", 178]],
		originFeat : "Magic Initiate [Cleric]"
	},
	"criminal" : {
		description : "I eked out a living in dark alleyways, cutting purses or burgling shops. Perhaps I were part of a small gang of like-minded wrongdoers who looked out for each other. Or maybe I were a lone wolf, fending for myself against the local thieves' guild and more fearsome lawbreakers.",
		source : [["free", 0], ["P24", 179]],
		originFeat : "Alert"
	},
	"sage" : {
		description : "I spent my formative years traveling between manors and monasteries, performing various odd jobs and services in exchange for access to their libraries. I whiled away many a long evening studying books and scrolls, learning the lore of the multiverse - even the rudiments of magic - and my mind yearns for more.",
		source : [["free", 0], ["P24", 183]],
		originFeat : "Magic Initiate [Wizard]"
	},
	"soldier" : {
		description : "I began training for war as soon as I reached adulthood and carry precious few memories of life before I took up arms. Battle is in my blood. Sometimes I catch myself reflexively performing the basic fighting exercises I learned first. Eventually, I put that training to use on the battlefield, protecting the realm by waging war.",
		source : [["free", 0], ["P24", 185]],
		originFeat : "Savage Attacker"
	}
};
