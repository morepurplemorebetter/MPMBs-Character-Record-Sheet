var BackgroundList = {
	//PHB backgrounds
	"acolyte" : {
		regExpSearch : /acolyte/i,
		name : "Acolyte",
		source : ["P", 127],
		skills : ["Insight", "Religion"],
		gold : 15,
		equipleft : [
			["Prayer book/wheel", "", 5],
			["Incense, sticks of", 5, ""],
			["Vestments", "", 4],
		],
		equipright : [
			["Common clothes", "", 3],
			["Holy symbol (type)", "", 1],
			["Belt pouch (with coins)", "", 1],
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
			],
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
		languages : ["+2 from "],
		variant : ["faction agent"],
		lifestyle : "modest",
	},
	"charlatan" : {
		regExpSearch : /charlatan/i,
		name : "Charlatan",
		source : ["P", 128],
		skills : ["Deception", "Sleight of Hand"],
		gold : 15,
		equipleft : [
			["Disguise kit", "", 3],
			["Tools for chosen con", "", ""],
		],
		equipright : [
			["Fine clothes", "", 6],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "False Identity",
		trait : [
			"I fall in and out of love easily, and am always pursuing someone.",
			"I have a joke for every occasion, especially occasions where humor is inappropriate.",
			"Flattery is my preferred trick for getting what I want.",
			"I'm a born gambler who can't resist taking a risk for a potential payoff.",
			"I lie about almost everything, even when there's no good reason to.",
			"Sarcasm and insults are my weapons of choice.",
			"I keep multiple holy symbols on me and invoke whatever deity might come in useful at any given moment.",
			"I pocket anything I see that might have some value."
		],
		ideal : [
			["Independence",
				"Independence: I am a free spirit \u2015 no one tells me what to do. (Chaotic)"
			],
			["Fairness",
				"Fairness: I never target people who can't afford to lose a few coins. (Lawful)"
			],
			["Charity",
				"Charity: I distribute the money I acquire to the people who really need it. (Good)"
			],
			["Creativity",
				"Creativity: I never run the same con twice. (Chaotic)"
			],
			["Friendship",
				"Friendship: Material goods come and go. Bonds of friendship last forever. (Good)"
			],
			["Aspiration",
				"Aspiration: I'm determined to make something of myself. (Any)"
			],
		],
		bond : [
			"I fleeced the wrong person and must work to ensure that this individual never crosses paths with me or those I care about.",
			"I owe everything to my mentor \u2015 a horrible person who's probably rotting in jail somewhere.",
			"Somewhere out there, I have a child who doesn't know me. I'm making the world better for him or her.",
			"I come from a noble family, and one day I'll reclaim my lands and title from those who stole them from me.",
			"A powerful person killed someone I love. Someday soon, I'll have my revenge.",
			"I swindled and ruined a person who didn't deserve it. I seek to atone for my misdeeds but might never be able to forgive myself."
		],
		flaw : [
			"I can't resist a pretty face.",
			"I'm always in debt. I spend my ill-gotten gains on decadent luxuries faster than I bring them in.",
			"I'm convinced that no one could ever fool me the way I fool others.",
			"I'm too greedy for my own good. I can't resist taking a risk if there's money involved.",
			"I can't resist swindling people who are more powerful than me.",
			"I hate to admit it and will hate myself for it, but I'll run and preserve my own hide if the going gets tough."
		],
		extra : [
			"Select a Favorite Scheme",
			"Cheat at games of chance",
			"Shave coins, forge documents",
			"User/manipulator",
			"Change identity",
			"Sleight-of-hand cons",
			"Sell junk as expensive necessities"
		],
		tools : ["Disguise kit", "Forgery kit"],
		variant : [],
		lifestyle : "comfortable",
	},
	"criminal" : {
		regExpSearch : /(criminal|blackmailer|burglar|fence|robber|killer|assassin|pickpocket|smuggler)/i,
		name : "Criminal",
		source : ["P", 129],
		skills : ["Deception", "Stealth"],
		gold : 15,
		equipright : [
			["Dark, common clothes with hood", "", 3],
			["Crowbar", "", 5],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Criminal Contact",
		trait : [
			"I always have a plan for what to do when things go wrong.",
			"I am always calm, no matter the situation. I never raise my voice or let my emotions control me.",
			"The first thing I do in a new place is note the locations of everything valuable \u2015 or where such things could be hidden.",
			"I would rather make a new friend than a new enemy.",
			"I am incredibly slow to trust. Those who seem the fairest often have the most to hide.",
			"I don't play attention to the risks in a situation. Never tell me the odds.",
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
			],
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
		],
		tools : ["A type of gaming set", "Thieves' tools"],
		variant : ["urban bounty hunter"],
		lifestyle : "poor",
	},
	"entertainer" : {
		regExpSearch : /(entertainer|actor|dancer|fire.?eater|jester|juggler|instrumentalist|poet|singer|storyteller|tumbler)/i,
		name : "Entertainer",
		source : ["P", 130],
		skills : ["Acrobatics", "Performance"],
		gold : 15,
		equipright : [
			["Costume", "", 4],
			["Favor of an admirer", "", ""],
			["Belt pouch (with coins)", "", 1],
			["Musical instrument of my choice", "", ""],
		],
		feature : "By Popular Demand",
		trait : [
			"I know a story relevant to almost every situation.",
			"Whenever I come to a new place, I collect local rumors and spread gossip.",
			"I'm a hopeless romantic, always searching for that 'special someone'.",
			"Nobody stays angry at me or around me for long, since I can defuse any amount of tension.",
			"I love a good insult, even one directed at me.",
			"I get bitter if I'm not the center of attention.",
			"I'll settle for nothing less than perfection.",
			"I change my mood or my mind as quickly as I change key in a song."
		],
		ideal : [
			["Beauty",
				"Beauty: When I perform, I make the world better than it was. (Good)"
			],
			["Tradition",
				"Tradition: The stories, legends, and songs of the past must never be forgotten, for they teach us who we are. (Lawful)"
			],
			["Creativity",
				"Creativity: The world is in need of new ideas and bold action. (Chaotic)"
			],
			["Greed",
				"Greed: I'm only in it for the money and fame. [Evil]"
			],
			["People",
				"People: I like seeing the smiles on people's faces when I perform. That's all that matters. (Neutral)"
			],
			["Honesty",
				"Honesty: Art should reflect the soul; it should come from within and reveal who we really are. (Any)"
			],
		],
		bond : [
			"My instrument is my most treasured possession, and it reminds me of someone I love.",
			"Someone stole my precious instrument, and someday I'll get it back.",
			"I want to be famous, whatever it takes.",
			"I idolize a hero of the old tales and measure my deeds against that person's.",
			"I will do anything to prove myself superior to my hated rival.",
			"I would do anything for the other members of my old troupe."
		],
		flaw : [
			"I'll do anything to win fame and renown.",
			"I'm a sucker for a pretty face.",
			"A scandal prevents me from ever going home again. That kind of trouble seems to follow me around.",
			"I once satirized a noble who still wants my head. It was a mistake that I will likely repeat.",
			"I have trouble keeping my true feelings hidden. My sharp tongue lands me in trouble.",
			"Despite my best efforts, I am unreliable to my friends."
		],
		extra : [
			"Select an Entertainer Routine",
			"Actor",
			"Dancer",
			"Fire-eater",
			"Jester",
			"Juggler",
			"Instrumentalist",
			"Poet",
			"Singer",
			"Storyteller",
			"Tumbler"
		],
		tools : ["Disguise kit", "One musical instrument"],
		variant : ["gladiator"],
		lifestyle : "modest",
	},
	"folk hero" : {
		regExpSearch : /^(?=.*folk)(?=.*hero).*$/i,
		name : "Folk Hero",
		source : ["P", 131],
		skills : ["Animal Handling", "Survival"],
		gold : 10,
		equipleft : [
			["Set of artisan's tools", "", ""],
			["Shovel", "", 5],
			["Iron pot", "", 10],
		],
		equipright : [
			["Common clothes", "", 3],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Rustic Hospitality",
		trait : [
			"I judge people by their actions, not their words.",
			"If someone is in trouble, I'm always ready to lend help.",
			"When I set my mind to something, I follow through no matter what gets in my way.",
			"I have a strong sense of fair play and always try to find the most equitable solution to arguments.",
			"I'm confident in my own abilities and do what I can to instill confidence in others.",
			"Thinking is for other people. I prefer action.",
			"I misuse long words in an attempt to sound smarter.",
			"I get bored easily. When am I going to get on with my destiny?"
		],
		ideal : [
			["Respect",
				"Respect: People deserve to be treated with dignity and respect. (Good)"
			],
			["Fairness",
				"Fairness: No one should get preferential treatment before the law, and no one is above the law. (Lawful)"
			],
			["Freedom",
				"Freedom: Tyrants must not be allowed to oppress the people. (Chaotic)"
			],
			["Might",
				"Might: If I become strong, I can take what I want\u2015 what I deserve. (Evil)"
			],
			["Sincerity",
				"Sincerity: There's no good in pretending to be something I'm not. (Neutral)"
			],
			["Destiny",
				"Destiny: Nothing and no one can steer me away from my higher calling. (Any)"
			],
		],
		bond : [
			"I have a family, but I have no idea where they are. One day, I hope to see them again.",
			"I worked the land, I love the land, and I will protect the land.",
			"A proud noble once gave me a horrible beating, and I will take my revenge on any bully I encounter.",
			"My tools are symbols of my past life, and I carry them so that I will never forget my roots.",
			"I protect those who cannot protect themselves.",
			"I wish my childhood sweetheart had come with me to pursue my destiny."
		],
		flaw : [
			"The tyrant who rules my land will stop at nothing to see me killed.",
			"I'm convinced of the significance of my destiny, and blind to my shortcomings and the risk of failure.",
			"The people who knew me when I was young know my shameful secret, so I can never go home again.",
			"I have a weakness for the vices of the city, especially hard drink.",
			"Secretly, I believe that things would be better if I were a tyrant lording over the land.",
			"I have trouble trusting in my allies."
		],
		extra : [
			"Select a Defining Event",
			"I stood up to a tyrant's agents",
			"I saved people during a natural disaster",
			"I stood alone against a terrible monster",
			"I stole from a corrupt merchant for the poor",
			"I led a militia to fight off an invading army",
			"I stole weapons from a tyrant to arm the people",
			"I trained peasantry to fight a tyrant with farm tools",
			"A decree was rescinded after I led a protest against it",
			"A magical creature gave me a blessing or insight",
			"I rose to leadership in a lord's army"
		],
		tools : ["Type of artisan's tools", "Vehicles (land)"],
		variant : ["inheritor"],
		lifestyle : "modest",
	},
	"guild artisan" : {
		regExpSearch : /^(?=.*guild)(?=.*artisan).*$/i,
		name : "Guild Artisan",
		source : ["P", 132],
		skills : ["Insight", "Persuasion"],
		gold : 15,
		equipleft : [
			["Set of artisan's tools", "", ""],
			["Letter of introduction from guild", "", ""],
		],
		equipright : [
			["Traveler's clothes", "", 4],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Guild Membership",
		trait : [
			"I believe that anything worth doing is worth doing right. I can't help it\u2015 I'm a perfectionist.",
			"I'm a snob who looks down on those who can't appreciate fine art.",
			"I always want to know how things work and what makes people tick.",
			"I'm full of witty aphorisms and have a proverb for every occasion.",
			"I'm rude to people who lack my commitment to hard work and fair play.",
			"I like to talk at length about my profession.",
			"I don't part with my money easily and will haggle tirelessly to get the best deal possible.",
			"I'm well known for my work, and I want to make sure everyone appreciates it. I'm always taken aback when people haven't heard of me."
		],
		ideal : [
			["Community",
				"Community: It is the duty of all civilized people to strengthen the bonds of community and the security of civilization. (Lawful)"
			],
			["Generosity",
				"Generosity: My talents were given to me so that I could use them to benefit the world. (Good)"
			],
			["Freedom",
				"Freedom: Everyone should be free to pursue his or her own livelihood. (Chaotic)"
			],
			["Greed",
				"Greed: I'm only in it for the money. (Evil)"
			],
			["People",
				"People: I'm committed to the people I care about, not to ideals. (Neutral)"
			],
			["Aspiration",
				"Aspiration: I work hard to be the best there is at my craft. (Any)"
			],
		],
		bond : [
			"The workshop where I learned my trade is the most important place in the world to me.",
			"I created a great work for someone, and then found them unworthy to receive it. I'm still looking for someone worthy.",
			"I owe my guild a great debt for forging me into the person I am today.",
			"I pursue wealth to secure someone's love.",
			"One day I will return to my guild and prove that I am the greatest artisan of them all.",
			"I will get revenge on the evil forces that destroyed my place of business and ruined my livelihood."
		],
		flaw : [
			"I'll do anything to get my hands on something rare or priceless.",
			"I'm quick to assume that someone is trying to cheat me.",
			"No one must ever learn that I once stole money from guild coffers.",
			"I'm never satisfied with what I have\u2015 I always want more.",
			"I would kill to acquire a noble title.",
			"I'm horribly jealous of anyone who can outshine my handiwork. Everywhere I go, I'm surrounded by rivals."
		],
		extra : [
			"Select a Guild Business",
			"Alchemists and apothecaries",
			"Armorers, locksmiths, and finesmiths",
			"Brewers, distillers, and vintners",
			"Calligraphers, scribes, and scriveners",
			"Carpenters, roofers, and plasterers",
			"Cartographers, surveyors, and chart-makers",
			"Cobblers and shoemakers",
			"Cooks and bakers",
			"Glassblowers and glaziers",
			"Jewelers and gemcutters",
			"Leatherworkers, skinners, and tanners",
			"Masons and stonecutters",
			"Painters, limners, and sign-makers",
			"Potters and tile-makers",
			"Shipwrights and sailmakers",
			"Smiths and metal-forgers",
			"Tinkers, pewterers, and casters",
			"Wagon-makers and wheelwrights",
			"Weavers and dyers",
			"Woodcarvers, coopers, and bowyers"
		],
		tools : ["Type of artisan's tools"],
		languages : ["+1 from "],
		variant : ["clan crafter", "courtier", "guild merchant"],
		lifestyle : "comfortable",
	},
	"hermit" : {
		regExpSearch : /hermit/i,
		name : "Hermit",
		source : ["P", 134],
		skills : ["Medicine", "Religion"],
		gold : 5,
		equipleft : [
			["Winter blanket", "", 3],
			["Herbalism kit", "", 3],
		],
		equipright : [
			["Common clothes", "", 3],
			["Scroll case with notes", "", 1],
		],
		feature : "Discovery",
		trait : [
			"I've been isolated for so long that I rarely speak, preferring gestures and the occasional grunt.",
			"I am utterly serene, even in the face of disaster.",
			"The leader of my community had something wise to say on every topic, and I am eager to share that wisdom.",
			"I feel tremendous empathy for all who suffer.",
			"I'm oblivious to etiquette and social expectations.",
			"I connect everything that happens to me to a grand, cosmic plan.",
			"I often get lost in my own thoughts and contemplation, becoming oblivious to my surroundings.",
			"I am working on a grand philosophical theory and love sharing my ideas."
		],
		ideal : [
			["Greater Good",
				"Greater Good: My gifts are meant to be shared with all, not used for my own benefit. (Good)"
			],
			["Logic",
				"Logic: Emotions must not cloud our sense of what is right and true, or our logical thinking. (Lawful)"
			],
			["Free Thinking",
				"Free Thinking: Inquiry and curiosity are the pillars of progress. (Chaotic)"
			],
			["Power",
				"Power: Solitude and contemplation are paths toward mystical or magical power. (Evil)"
			],
			["Live and Let Live",
				"Live and Let Live: Meddling in the affairs of others only causes trouble. (Neutral)"
			],
			["Self-Knowledge",
				"Self-Knowledge: If you know yourself, there's nothing left to know. (Any)"
			],
		],
		bond : [
			"Nothing is more important than the other members of my hermitage, order, or association.",
			"I entered seclusion to hide from the ones who might still be hunting me. I must someday confront them.",
			"I'm still seeking the enlightenment I pursued in my seclusion, and it still eludes me.",
			"I entered seclusion because I loved someone I could not have.",
			"Should my discovery come to light, it could bring ruin to the world.",
			"My isolation gave me great insight into a great evil that only I can destroy."
		],
		flaw : [
			"Now that I've returned to the world, I enjoy its delights a little too much.",
			"I harbor dark, bloodthirsty thoughts that my isolation and meditation failed to quell.",
			"I am dogmatic in my thoughts and philosophy.",
			"I let my need to win arguments overshadow friendships and harmony.",
			"I'd risk too much to uncover a lost bit of knowledge.",
			"I like keeping secrets and won't share them with anyone."
		],
		extra : [
			"Select a Life of Seclusion",
			"Searching for spiritual enlightenment",
			"Living in accordance with a religious order",
			"Exiled for a crime I didn't commit",
			"Retreated from society after a life-altering event",
			"Worked on my art, literature, music, or manifesto",
			"Commune with nature, far from civilization",
			"Caretaker of an ancient ruin or relic",
			"Pilgrim in search of a thing of spiritual significance"
		],
		tools : ["Herbalism kit"],
		languages : ["+1 from "],
		variant : [],
		lifestyle : "poor",
	},
	"noble" : {
		regExpSearch : /^(?!.*(waterdhavian|waterdeep|knight))(?=.*noble).*$/i,
		name : "Noble",
		source : ["P", 135],
		skills : ["History", "Persuasion"],
		gold : 25,
		equipleft : [
			["Scroll of pedigree", "", ""],
		],
		equipright : [
			["Fine clothes", "", 6],
			["Signet ring", "", ""],
			["Purse (with coins)", "", 1],
		],
		feature : "Position of Privilege",
		trait : [
			"My eloquent flattery makes everyone I talk to feel like the most wonderful and important person in the world.",
			"The common folk love me for my kindness and generosity.",
			"No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses.",
			"I take great pains to always look my best and follow the latest fashions.",
			"I don't like to get my hands dirty, and I won't be caught dead in unsuitable accommodations.",
			"Despite my noble birth, I do not place myself above other folk. We all have the same blood.",
			"My favor, once lost, is lost forever.",
			"If you do me an injury, I will crush you, ruin your name, and salt your fields."
		],
		ideal : [
			["Respect",
				"Respect: Respect is due to me because of my position, but all people regardless of station deserve to be treated with dignity. (Good)"
			],
			["Responsibility",
				"Responsibility: It is my duty to respect the authority of those above me, just as those below me must respect mine. (Lawful)"
			],
			["Independence",
				"Independence: I must prove that I can handle myself without the coddling of my family. (Chaotic)"
			],
			["Power",
				"Power: If I can attain more power, no one will tell me what to do. (Evil)"
			],
			["Family",
				"Family: Blood runs thicker than water. (Any)"
			],
			["Noble Obligation",
				"Noble Obligation: It is my duty to protect and care for the people beneath me. (Good)"
			],
		],
		bond : [
			"I will face any challenge to win the approval of my family.",
			"My house's alliance with another noble family must be sustained at all costs.",
			"Nothing is more important than the other members of my family.",
			"I am in love with the heir of a family that my family despises.",
			"My loyalty to my sovereign is unwavering.",
			"The common folk must see me as a hero of the people."
		],
		flaw : [
			"I secretly believe that everyone is beneath me.",
			"I hide a truly scandalous secret that could ruin my family forever.",
			"I too often hear veiled insults and threats in every word addressed to me, and I'm quick to anger.",
			"I have an insatiable desire for carnal pleasures.",
			"In fact, the world does revolve around me.",
			"By my words and actions, I often bring shame to my family."
		],
		tools : ["Type of gaming set"],
		languages : ["+1 from "],
		variant : ["knight", "waterdhavian noble"],
		lifestyle : "wealthy",
	},
	"outlander" : {
		regExpSearch : /^(?!.*urban)(?=.*(outlander|forester|trapper|homesteader|guide|exile|outcast|bounty.?hunter|tribal nomad|hunter-gatherer|tribal.?marauder)).*$/i,
		name : "Outlander",
		source : ["P", 136],
		skills : ["Athletics", "Survival"],
		gold : 10,
		equipright : [
			["Traveler's clothes", "", 4],
			["Staff", "", 4],
			["Hunting trap", "", 25],
			["Trophy from animal", "", ""],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Wanderer",
		trait : [
			"I'm driven by a wanderlust that led me away from home.",
			"I watch over my friends as if they were a litter of newborn pups.",
			"I once ran twenty-five miles without stopping to warn to my clan of an approaching orc horde. I'd do it again if I had to.",
			"I have a lesson for every situation, drawn from observing nature.",
			"I place no stock in wealthy or well-mannered folk. Money and manners won't save you from a hungry owlbear.",
			"I'm always picking things up, absently fiddling with them, and sometimes accidentally breaking them.",
			"I feel far more comfortable around animals than people.",
			"I was, in fact, raised by wolves."
		],
		ideal : [
			["Change",
				"Change: Life is like the seasons, in constant change, and we must change with it. (Chaotic)"
			],
			["Greater Good",
				"Greater Good: It is each person's responsibility to make the most happiness for the whole tribe. (Good)"
			],
			["Honor",
				"Honor: If I dishonor myself, I dishonor my whole clan. (Lawful)"
			],
			["Might",
				"Might: The strongest are meant to rule. (Evil)"
			],
			["Nature",
				"Nature: The natural world is more important than all the constructs of civilization. (Neutral)"
			],
			["Glory",
				"Glory: I must earn glory in battle, for myself and my clan. (Any)"
			],
		],
		bond : [
			"My family, clan, or tribe is the most important thing in my life, even when they are far from me.",
			"An injury to the unspoiled wilderness of my home is an injury to me.",
			"I will bring terrible wrath down on the evildoers who destroyed my homeland.",
			"I am the last of my tribe, and it is up to me to ensure their names enter legend.",
			"I suffer awful visions of a coming disaster and will do anything to prevent it.",
			"It is my duty to provide children to sustain my tribe."
		],
		flaw : [
			"I am too enamored of ale, wine, and other intoxicants.",
			"There's no room for caution in a life lived to the fullest.",
			"I remember every insult I've received and nurse a silent resentment toward anyone who's ever wronged me.",
			"I am slow to trust members of other races, tribes, and societies.",
			"Violence is my answer to almost any challenge.",
			"Don't expect me to save those who can't save themselves. It is nature's way that the strong thrive and the weak perish."
		],
		extra : ["Select an Origin",
			"Forester",
			"Trapper",
			"Homesteader",
			"Guide",
			"Exile or outcast",
			"Bounty hunter",
			"Pilgrim",
			"Tribal nomad",
			"Hunter-gatherer",
			"Tribal marauder"
		],
		tools : ["Type of musical instrument"],
		languages : ["+1 from "],
		variant : ["uthgardt tribe member"],
		lifestyle : "poor",
	},
	"sage" : {
		regExpSearch : /(sage|alchemist|astronomer|academic|librarian|professor|researcher|apprentice|scribe)/i,
		name : "Sage",
		source : ["P", 137],
		skills : ["Arcana", "History"],
		gold : 10,
		equipleft : [
			["Ink, 1 ounce bottle of", 1, ""],
			["Ink pen (quill)", "", ""],
			["Small knife", "", 0.5],
			["Letter from dead colleague", "", ""],
		],
		equipright : [
			["Common clothes", "", 3],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Researcher",
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
			],
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
		extra : ["Select a Specialty",
			"Alchemist",
			"Astronomer",
			"Discredited academic",
			"Librarian",
			"Professor",
			"Researcher",
			"Wizard's apprentice",
			"Scribe"
		],
		languages : ["+2 from "],
		variant : ["cloistered scholar"],
		lifestyle : "modest",
	},
	"sailor" : {
		regExpSearch : /sailor/i,
		name : "Sailor",
		source : ["P", 139],
		skills : ["Athletics", "Perception"],
		gold : 10,
		equipleft : [
			["Silk rope, feet of", 50, 0.1],
		],
		equipright : [
			["Common clothes", "", 3],
			["Belaying pin (club)", "", 2],
			["Lucky charm", "", ""],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Ship's Passage",
		trait : [
			"My friends know they can rely on me, no matter what.",
			"I work hard so that I can play hard when the work is done.",
			"I enjoy sailing into new ports and making new friends over a flagon of ale.",
			"I stretch the truth for the sake of a good story.",
			"To me, a tavern brawl is a nice way to get to know a new city.",
			"I never pass up a friendly wager.",
			"My language is as foul as an otyugh nest.",
			"I like a job well done, especially if I can convince someone else to do it."
		],
		ideal : [
			["Respect",
				"Respect: The thing that keeps a ship together is mutual respect between captain and crew. (Good)"
			],
			["Fairness",
				"Fairness: We all do the work, so we all share in the rewards. (Lawful)"
			],
			["Freedom",
				"Freedom: The sea is freedom\u2015 the freedom to go anywhere and do anything. (Chaotic)"
			],
			["Mastery",
				"Mastery: I'm a predator, and the other ships on the sea are my prey. (Evil)"
			],
			["People",
				"People: I'm committed to my crewmates, not to ideals. (Neutral)"
			],
			["Aspiration",
				"Aspiration: Someday I'll own my own ship and chart my own destiny. (Any)"
			],
		],
		bond : [
			"I'm loyal to my captain first, everything else second.",
			"The ship is most important\u2015 crewmates and captains come and go.",
			"I'll always remember my first ship.",
			"In a harbor town, I have a paramour whose eyes nearly stole me from the sea.",
			"I was cheated out of my fair share of the profits, and I want to get my due.",
			"Ruthless pirates murdered my captain and crewmates, plundered our ship, and left me to die. Vengeance will be mine."
		],
		flaw : [
			"I follow orders, even if I think they're wrong.",
			"I'll say anything to avoid having to do extra work.",
			"Once someone questions my courage, I never back down no matter how dangerous the situation.",
			"Once I start drinking, it's hard for me to stop.",
			"I can't help but pocket loose coins and other trinkets I come across.",
			"My pride will probably lead to my destruction."
		],
		tools : ["Navigator's tools", "Vehicles (water)"],
		variant : ["pirate"],
		lifestyle : "modest",
	},
	"soldier" : {
		regExpSearch : /^(?!.*mercenary)(?=.*soldier).*$/i,
		name : "Soldier",
		source : ["P", 140],
		skills : ["Athletics", "Intimidation"],
		gold : 10,
		equipright : [
			["Common clothes", "", 3],
			["Insignia of rank", "", ""],
			["Trophy from fallen enemy", "", ""],
			["Bone dice or playing cards", "", ""],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Military Rank",
		trait : [
			"I'm always respectful and polite.",
			"I'm haunted by memories of war. I can't get the violent images out of my mind.",
			"I'm slow to make new friends, because I've lost too many old ones.",
			"I'm full of inspiring and cautionary tales from my military experience with some relevance to almost every type of combat situation.",
			"I can stare down a owlbear without flinching.",
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
			],
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
		extra : ["Select a Specialty",
			"Officer",
			"Scout",
			"Infantry",
			"Cavalry",
			"Healer",
			"Quartermaster",
			"Standard-bearer",
			"Support staff"
		],
		tools : ["Type of gaming set", "Vehicles (land)"],
		variant : ["city watch", "investigator", "knight of the order", "mercenary veteran"],
		lifestyle : "modest",
	},
	"urchin" : {
		regExpSearch : /urchin/i,
		name : "Urchin",
		source : ["P", 141],
		skills : ["Sleight of Hand", "Stealth"],
		gold : 10,
		equipleft : [
			["Map of the city", "", ""],
			["Small knife", "", 0.5],
		],
		equipright : [
			["Common clothes", "", 3],
			["Token from my parents", "", ""],
			["Pet mouse", "", 0.1],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "City Secrets",
		trait : [
			"I keep scraps of food and trinkets hidden away in my pockets.",
			"I ask questions all the time.",
			"I like to squeeze into compact places where nobody can harm me.",
			"I sleep with my back to solid surface, with all that I own embraced tightly in my arms.",
			"I have bad manners and eat like a pig.",
			"I expect that anybody who's nice to me is hiding malicious intent.",
			"I eschew bathing.",
			"I say, without reserve, what other people are implying or masking."
		],
		ideal : [
			["Respect",
				"Respect: Everybody, no matter their riches, deserves respect. (Good)"
			],
			["Community",
				"Community: We have to take look out for each other, because nobody else will do it for us. (Lawful)"
			],
			["Change",
				"Change: The low rise up, and the high and mighty come down. Change is natural. (Chaotic)"
			],
			["Retribution",
				"Retribution: The rich need to be shown how it is to live and die in the poor quarters. (Evil)"
			],
			["People",
				"People: I help those who help me\u2015 that is what lets us stay alive. (Neutral)"
			],
			["Aspiration",
				"Aspiration: I'm going to prove that I'm worthy of a better life. (Any)"
			],
		],
		bond : [
			"My town or city is my home, and I'll battle those that threaten it.",
			"I'm the benefactor of an orphanage so others may be kept from enduring what I was forced to endure.",
			"I owe my life to another urchin who taught me the ways of living in the gutters.",
			"I owe a debt I can never repay to the person who showed me sympathy.",
			"I got away from my life of poverty by robbing an influential person, and I'm wanted for it.",
			"No one else should have to suffer the difficulties I've been through."
		],
		flaw : [
			"I will run away from a fight if I'm outnumbered.",
			"A gold piece already has a lot of value to me, and I'll do just about anything for more of it.",
			"I will never completely trust another. I only trust myself.",
			"I would rather use an unfair advantage than fight honorably.",
			"It's not theft if I have more use for it than someone else.",
			"People who are incapable of taking care of themselves get what they deserve."
		],
		tools : ["Disguise kit", "Thieves' tools"],
		variant : [],
		lifestyle : "modest",
	},

	//SCAG background
	"far traveler" : {
		regExpSearch : /^(?=.*far)(?=.*traveler).*$/i,
		name : "Far Traveler",
		source : ["S", 148],
		skills : ["Insight", "Perception"],
		gold : 5,
		equipleft : [
			["Gaming set or musical instrument", "", ""],
			["Poorly wrought maps", "", ""],
		],
		equipright : [
			["Traveler's clothes", "", 4],
			["Piece of jewelry worth 5 gp", "", ""],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "All Eyes on You",
		trait : [
			"I have different assumptions from those around me concerning personal space, blithely invading others' space in innocence, or reacting to ignorant invasion of my own.",
			"I have my own ideas about what is and is not food, and I find the eating habits of those around me fascinating, confusing, or revolting.",
			"I have a strong code of honor or sense of propriety that others don't comprehend.",
			"I express affection or contempt in ways that are unfamiliar to others.",
			"I honor my deities through practices that are foreign to this land.",
			"I begin or end my day with small traditional rituals that are unfamiliar to those around me.",
		],
		ideal : [
			["Open",
				"Open: I have much to learn from the kindly folk I meet along my way. (Good)"
			],
			["Reserved",
				"Reserved: As someone new to these strange lands, I am cautious and respectful in my dealings. (Lawful)"
			],
			["Adventure",
				"Adventure: I'm far from home, and everything is strange and wonderful! (Chaotic)"
			],
			["Cunning",
				"Cunning: Though I may not know their ways, neither do they know mine, which can be to my  advantage. (Evil)"
			],
			["Inquisitive",
				"Inquisitive: Everything is new, but I have a thirst to learn. (Neutral)"
			],
			["Suspicious",
				"Suspicious: I must be careful, for I have no way of telling friend from foe here. (Any)"
			],
		],
		bond : [
			"So long as I have this token from my homeland, I can face any adversity in this strange land.",
			"The gods of my people are a comfort to me so far from home.",
			"I hold no greater cause than my service to my people.",
			"My freedom is my most precious possession. I'll never let anyone take it from me again.",
			"I'm fascinated by the beauty and wonder of this new land.",
			"Though I had no choice, I lament having to leave my loved one(s) behind. I hope to see them again one day.",
		],
		flaw : [
			"I am secretly (or not so secretly) convinced of the superiority of my own culture over that of this foreign land.",
			"I pretend not to understand the local language in order to avoid interactions I would rather not have.",
			"I have a weakness for the new intoxicants and other pleasures of this land.",
			"I don't take kindly to some of the actions and motivations of the people of this land, because these folk are different from me.",
			"I consider the adherents of other gods to be deluded innocents at best, or ignorant fools at worst.",
			"I have a weakness for the exotic beauty of the people of these lands.",
		],
		extra : [
			"Select Why You Are Here",
			"Emissary",
			"Exile",
			"Fugitive",
			"Pilgrim",
			"Sightseer",
			"Wanderer",
		],
		tools : ["Gaming set or musical instrument"],
		languages : ["+1 from "],
		variant : [],
		lifestyle : "modest",
	},

	//CoS backgrounds (with the help of RCanine)
	"haunted one" : {
		regExpSearch : /haunted/i,
		name : "Haunted One",
		source : ["CoS", 209],
		skills : "",
		skillstxt : "Choose two from Arcana, Investigation, Religion, and Survival",
		languages : ["+1 from "],
		gold : 0,
		equipleft : [
			["Chest, with:", "", 25],
			["Crowbar", "", 5],
			["Hammer", "", 3],
			["Wooden Stakes", 3, 1],
			["Holy symbol", "", 1],
			["Holy water, flasks of", "", 1],
			["Manacles", "", 6],
			["Steel Mirror", "", 0.5],
			["Oil, flasks of", "", 1],
			["Tinderbox", "", 1],
			["Torch", 3, 1]
		],
		equipright : [
			["Common clothes", "", 3],
			["Trinket of special significance", "", ""]
		],
		feature : "Heart of Darkness",
		trait : [
			"I don't run from evil. Evil runs from me.",
			"I like to read and memorize poetry. It keeps me calm and brings me fleeting moments of happiness.",
			"I spend money freely and live life to the fullest, knowing that tomorrow I might die.",
			"I live for the thrill of the hunt.",
			"I don't talk about the thing that torments me. I'd rather not burden others with my curse.",
			"I expect danger around every corner.",
			"I refuse to become a victim, and I will not allow others to be victimized.",
			"I put no trust in divine beings."
		],
		ideal : [
			["Sacrifice", "Sacrifice: I try to help those in need, no matter what the personal cost. (Good)"],
			["Desperation", "Desperation: I'll stop the spirits that haunt me or die trying. (Any)"],
			["Cleansing", "Cleansing: I kill monsters to make the world a safer place, and to exorcise my own demons. (Good)"],
			["Vigilante", "Vigilante: I have a dark calling that puts me above the law. (Chaotic)"],
			["Preparation", "Preparation: I like to know my enemy's capabilities and weaknesses before rushing into battle. (Lawful)"],
			["Destruction", "Destruction: I'm a monster that destroys other monsters, and anything else that gets in my way. (Evil)"]
		],
		bond : [
			"I keep my thoughts and discoveries in a journal. My journal is my legacy.",
			"I would sacrifice my life and my soul to protect the innocent.",
			"My torment drove away the person I love. I strive to win back the love I've lost.",
			"A terrible guilt consumes me. I hope that I can find redemption through my actions.",
			"There's evil in me, I can feel it. It must never be set free.",
			"I have a child to protect. I must make the world a safer place for him (or her)."
		],
		flaw : [
			"I have certain rituals that I must follow every day. I can never break them.",
			"I assume the worst in people.",
			"I feel no compassion for the dead. They're the lucky ones.",
			"I have an addiction.",
			"I am a purveyor of doom and gloom who lives in a world without hope.",
			"I talk to spirits that no one else can see."
		],
		extra : [
			"Select a Harrowing Event",
			"Monster spared my life",
			"Born under a dark star",
			"Haunted by an apparition",
			"Dark arts in the family",
			"An oni took my sibling",
			"Memory of cured with lycanthropy",
			"Raised by a hag",
			"Studied an eldritch tome",
			"Formerly possessed by A fiend.",
			"Avenged a murder"
		],
		variant : [],
	},
	"black fist double agent" : {
		regExpSearch : /black\W*fist/i,
		name : "Black Fist Double Agent",
		source : ["AL:CoS", 2],
		skills : ["Deception", "Insight"],
		gold : 15,
		equipleft : [
			["Disguise kit", "", 3],
			["Tears of Virulence emblem", "", ""],
			["Writ of free agency", "", ""],
			["Set of artisan's tools or gaming set", "", ""]
		],
		equipright : [
			["Common clothes", "", 3],
			["Belt Pouch (with coins)", "", ""]
		],
		feature : "Double Agent",
		trait : [
			"People are only as trustworthy as you are valuable to them. Always strive to be the most valuable person around.",
			"My eloquence and sophistication are tools I use to avoid arousing suspicion myself.",
			"I am a thrill-seeker, excited by covert and dangerous missions.",
			"I live by my wits and always check every lock twice, just to be certain.",
			"I never admit to my mistakes lest they be used against me.",
			"I take every effort to be unnoticeable and blend into the crowd. Passersby rarely give me a second look.",
			"I am prepared for any eventuality; including the day my usefulness as a spy comes to an end.",
			"I always make certain to know my enemy before acting, lest I bite off more than I can chew."
		],
		ideal : [
			["Suspicious", "Suspicious: In my experience, everybody has something to hide, and what they hide can usually hurt me. (Any)"],
			["Secretive", "Secretive: I trade in secrets, and am not about to let any of mine slip. (Any)"],
			["Hedonist", "Hedonist: Life is short. I live my life to the fullest, as I know any day could be my last. (Chaotic)"],
			["Selfless", "Selfless: I use my position to help the downtrodden avoid persecution from the authorities. (Good)"],
			["Patriotic" , "Patriotic: I am a loyal supporter of Phlan and its leaders, and see my role as a solemn duty and necessary evil to prevent anarchy. (Lawful)"],
			["Manipulative", "Manipulative: I use my knowledge to blackmail and manipulate others to my own benefit. (Evil)"]
		],
		bond : [
			"I was framed for a crime I did not commit, and seek to bring the true culprit to justice.",
			"I am a part of an underground network that smuggles innocent civilians out of the city prior to being raided by the authorities.",
			"I miss the glory days of Phlan, before the coming of the dragon.",
			"I seek to prove myself worthy of joining the Black Fist as a member of their order.",
			"My sister was killed by a Tear of Virulence, and now I feed them false information whenever possible.",
			"My family was wrongly imprisoned, and I act as an informant in order to secure their release."
		],
		flaw : [
			"I think too highly of myself, and have an exaggerated sense of self-importance.",
			"I have difficulty trusting strangers. I see spies and informants everywhere.",
			"Years of getting away with minor crimes has left me believing that I am above the law, and have diplomatic immunity above my station.",
			"Years of seeing innocent people suffer have left me despondent and pessimistic for the future.",
			"My desire for vengeance often gets me into trouble",
			"I am spendthrift, and share my wealth with the patrons of my favorite tavern."
		],
		tools : [
			"Disguise Kit",
			"Type of artisan's tools or gaming set"
		],
		variant : [],
		lifestyle : "modest",
	},
	"dragon casualty" : {
		regExpSearch : /^(?=.*dragon)(?=.*casualty).*$/i,
		name : "Dragon Casualty",
		source : ["AL:CoS", 3],
		skills : ["Intimidation", "Survival"],
		languages : ["Draconic"],
		tools : ["Based on my origin"],
		gold : 5,
		equipleft : [
			["Loaf of moldy bread", "", 1],
			["Cast-off Vorgansharax scale", "", ""]
		],
		equipright : [
			["Tattered Rags", "", 3],
			["Dagger", "", 1],
			["Belt Pouch (with coins)", "", ""]
		],
		feature : "Dragonscarred",
		extra : [
			"Select a Disfigurement",
			"Extensive scarring",
			"Small non-functional wing(s)",
			"Misshapen, wing-like membrane(s)",
			"Elongated, claw-like hand(s) or feet",
			"Painful green scales embedded in skin",
			"Bulbous, reptilian eye(s)",
			"Enlarged dorsal spines",
			"Small irregular spines instead of hair"
		],
		trait : [
			"I am driven to escape my past, and rarely stay in one place long.",
			"I know secrets of the Maimed Virulence, but fear the harm that may befall me should others learn them.",
			"Speaking of my ordeal helps sooth the still open wounds in my soul.",
			"My former life is meaningless, and was ripped to shreds by the claws of Vorgansharax. All that matters now is what I do with the future.",
			"I have faced the worst a dragon can deliver and survived. I am fearless, and my resolve unshakable.",
			"I am haunted my tortured past, and wake at night screaming at half-remembered horrors.",
			"I sleep with my back to a wall or tree, and a weapon within arm's reach.",
			"I am slow to trust, but incredibly loyal to those who have earned it."
		],
		ideal : [
			["Survivor", "Survivor: No matter the cost, I will take any action necessary to survive (any)"],
			["Independence", "Independence: When in trouble, the only person I can rely on is myself (Chaotic)"],
			["Compassionate", "Compassionate: I have suffered long at the hands of a Dragon, and take pitty and compassion on the suffering of others (Good)"],
			["Secretive", "Secretive: I am withdrawn, and hide my monstrous appearance for fear of drawing unwanted attention. (Chaotic)"],
			["Justice", "Justice: I have been wronged, and will not allow the same fate to befall others. (Lawful)"],
			["Sycophant", "Sycophant: During my ordeal, I became a willing servant of the Maimed Virulence, and spy on his behalf. (Evil)"]
		],
		bond : [
			"I have sworn vengeance on the Maimed Virulence and those that follow him.",
			"I long to reunite with friends and family who may dwell among the Phlan Refugees, and protect them.",
			"While a prisoner of the Maimed Virulence, I overheard rumors of an item or treasure the Dragon seeks. I will have that treasure for myself!",
			"I seek to reclaim and rebuild my former life to the best of my ability.",
			"I have been reborn as a child of Vorgansharax. I will claim my birthright as his chosen heir and successor.",
			"I attribute my survival to the work of the divine, and seek to prove myself worthy of the honor."
		],
		flaw : [
			"I have been touched with dragon-greed, and have a lust for wealth which can never be satisfied.",
			"I secretly believe others are plotting to harm me.",
			"I no longer enjoy the simple pleasures in life. Food is but ashes and bile in my throat.",
			"Anyone who refuses to celebrate my celebrity does not deserve my company.",
			"I am paranoid and overly suspicious of others. Anyone may be an agent of the Maimed Virulence.",
			"Once I make up my mind, I follow my chosen course of action regardless of the consequences."
		],
		variant : [],
		lifestyle : "wretched",
	},
	"iron route bandit" : {
		regExpSearch : /^(?=.*iron)(?=.*route)(?=.*bandit).*$/i,
		name : "Iron Route Bandit",
		source : ["AL:CoS", 5],
		skills : ["Animal Handling", "Stealth"],
		tools : ["Type of gaming set", "Vehicles (land)"],
		gold : 5,
		equipleft : [
			["Backpack, with:", "", 5],
			["Bag of 1000 ball bearings", 1, 2],
			["String, feet of", 10, ""],
			["Bell", "", ""],
			["Candles", 5, ""],
			["Crowbar", "", 5],
			["Hammer", "", 3],
			["Pitons", 10, .25],
			["Hooded lantern", "", 2],
			["Oil, flasks of", 2, 1],
			["Rations, days of", 5, 2],
			["Tinderbox", "", 1],
			["Waterskin", "", 5],
			["Hempen rope, feet of", 50, 0.2]
		],
		equipright : [
			["Dark common clothes", "", 3],
			["Pack Saddle", "", ""],
			["Belt Pouch (with coins)", "", ""]
		],
		feature : "Black-Market Breeder",
		trait : [
			"If people leave their gear unsecured, they must not want it very much.",
			"I feel more comfortable sleeping under the open sky.",
			"I always pre-plan my escape should things go bad; I always like to have an exit strategy.",
			"I tend to give animal owners breeding and care advice whether or not they want it.",
			"I lost a pet as a child and sadly reflect on it to this day.",
			"I always form a powerful, emotional bond with my mount.",
			"I recoil at the thought of killing someone else's pet or mount.",
			"I prefer to hang to the back of a scuffle or discussion. Better to have my enemies in front of me."
		],
		ideal : [
			["Loyalty", "Loyalty: Never bite the hand that feeds. (Good)"],
			["Unpredictability", "Unpredictability: Keep your enemy guessing and off-balance like a confused deer. (Chaotic)"],
			["Power", "Power: I strive to become leader of the pack at all costs. (Lawful)"],
			["Freedom", "Freedom: I bow to no one I don't respect. (Chaotic)"],
			["Resourcefulness", "Resourcefulness: Our wits are our most valuable resource in troubled times. (Any)"],
			["Unity", "Unity: Lone wolves fail where the pack succeeds. (Any)"]
		],
		bond : [
			"I cannot leave a harmed animal behind; I must save it or put it out of its misery.",
			"I leave behind my own personal calling cards when I do a job.",
			"I do not trust people who do not have a pet, mount, or furry companion.",
			"The pelt I wear on my back was from an animal that died saving my life, I will always cherish it.",
			"If my pet does not like you, I do not like you!",
			"Once you've ridden with me and fought by my side, I'll be there for you odds be damned."
		],
		flaw : [
			"I talk to animals; I believe they understand me, even if they do not.",
			"I growl at and bite anyone who gets too close to my food while I am eating.",
			"I strongly dislike enclosed spaces and require intoxication or firm encouragement to enter them.",
			"I robbed the wrong caravan once. The owner is a powerful merchant who holds a grudge.",
			"I'm an inveterate gambler.",
			"I judge people based on how well they stand their ground in a fight. I got not time for cowards…"
		],
		variant : [],
		lifestyle : "poor",
	},
	"phlan insurgent" : {
		regExpSearch : /^(?=.*phlan)(?=.*insurgent).*$/i,
		name : "Phlan Insurgent",
		source : ["AL:CoS", 6],
		skills : ["Stealth", "Survival"],
		tools : ["Type of artisan's tools", "Vehicles (land)"],
		gold : 5,
		equipleft : [
			["Caltrops", 20, 0.1],
			["Small trinket of my life before", "", ""],
			["Healer's kit", "", 3]
		],
		equipright : [
			["Dark common clothes", "", 3],
			["Belt Pouch (with coins)", "", ""]
		],
		feature : "Guerilla",
		extra : [
			"Select an Origin",
			"Fisher",
			"Hunter",
			"Craftsperson",
			"Priest/Priestess",
			"Cook",
			"City Watch",
			"Servant",
			"Unskilled laborer",
			"Stojanow river worker",
			"Twilight Marsh worker",
			"Mantor's Library scribe",
			"Clergy of Ilmater",
			"Laughing Goblin server",
			"Black Fist guard",
			"House Sokol retainer",
			"Bay of Phlan dockworker"
		],
		trait : [
			"My patience knows no bounds, so long as my goal is in sight.",
			"In life and in struggle, the ends justify my actions.",
			"If you aren't helping me, you'd best at least stay out of my way.",
			"I long for the life that was taken away from me.",
			"Friends and family perished, tragically, before my eyes. I hope never to undergo that again.",
			"Making the right choices in life are important to me. The choices I make might save not just my life, but the lives of others as well.",
			"I can never allow my foes to get the drop on me.",
			"Time is a precious resource that I must spend wisely."
		],
		ideal : [
			["Leadership", "Leadership: The oppressed need someone to inspire them to courageous acts. (Good)"],
			["Unpredictability", "Unpredictability: Keeping the enemy guessing and off-balance is my tactical strength. (Chaos)"],
			["Determination", "Determination: Threats to my home must be eliminated at all costs. (Any)"],
			["Freedom", "Freedom: Those who are enslaved and unjustly imprisoned deserve my aid. (Good)"],
			["Resourcefulness", "Resourcefulness: Our wits are our most valuable resource in troubled times. (Any)"],
			["Unity", "Unity: Working together, we can overcome all obstacles, even the most seemingly insurmountable ones. (Any)"]
		],
		bond : [
			"I'll never let my fellow insurgents down. They are my only remaining friends.",
			"I was separated from a loved one during my escape from town. I will find them.",
			"One of the Tears of the Virulence was a trusted friend, until the day they betrayed the city. They will pay harshly for their transgressions.",
			"An item I hold close is my last remaining connection to the family I lost during the fall.",
			"The dragon who took my past life away from me will feel the full extent of my vengeance.",
			"The knowledge in Mantor's Library is an irreplaceable treasure that must be protected."
		],
		flaw : [
			"I have no respect for those who flee. I harbor a deep grudge against the citizens who abandoned Phlan.",
			"Ale is the only way I can escape the desperation of my circumstances.",
			"It doesn't take much to get me into a fight.",
			"Being an insurgent means doing things that aren't always ethical. I'm still learning to live with that.",
			"My desire to liberate Phlan oftentimes clouds my judgement, despite my best efforts.",
			"I relentlessly despise the Maimed Virulence and his allies. I'd abandon other goals in order to strike out at them"
		],
		variant : [],
		lifestyle : "poor",
	},
	"stojanow prisoner" : {
		regExpSearch : /^(?=.*stojanow)(?=.*prisoner).*$/i,
		name : "Stojanow Prisoner",
		source : ["AL:CoS", 8],
		skills : ["Deception", "Perception"],
		tools : ["Type of gaming set", "Thieves' tools"],
		gold : 10,
		equipleft : [
			["Small knife", "", 0.25],
			["Small trinket from my life before", "", ""]
		],
		equipright : [
			["Common clothes", "", 3],
			["Belt Pouch (with coins)", "", ""]
		],
		feature : "Ex-Convict",
		trait : [
			"I am a bully; others will suffer as I have.",
			"I always say yes even when I mean no; it's just easier.",
			"I aim to misbehave.",
			"I go out of my way to frustrate or anger those in power.",
			"I strive to obey the law. I will never again make the mistake of going against authority.",
			"I always plan everything out. The one time I let others plan things it did not end well for me.",
			"I take blame to protect others from pain.",
			"I horde information, you never know what may come in handy."
		],
		ideal : [
			["Loss", "Loss: I freely give those who offend me what was so brutally denied me, death. (Chaos)"],
			["Dedication", "Dedication: I never betray those who trust me. (Law)"],
			["Vengeance", "Vengeance: I use any means to get information I need; I have been well taught. (Evil)"],
			["Redemption", "Redemption: Everyone deserves a second chance. (Good)"],
			["Resilience", "Resilience: I can survive any challenge. (Any)"],
			["Leadership", "Leadership: The best teams are made up of those that society has discarded. (Any)"]
		],
		bond : [
			"I take up arms to help establish a free Phlan.",
			"The horrors of my time in Stojanow haunt my dreams, only after a day of hard work can I find sleep.",
			"I am indebted to those who freed me from prison, I will repay this debt.",
			"My torturer survived the attack that set me free, I will find him/her.",
			"I will not rest while others suffer fates similar to mine.",
			"I am searching for a way to heal the scars of Stojanow, both physical and emotional."
		],
		flaw : [
			"During stressful times, I find myself crying for no reason.",
			"My nerve endings are shot from the interrogations; I am numb to all but the harshest touch.",
			"I am incapable of standing up for myself.",
			"I folded under the torture, and gave information that I promised would be kept secret. My life would be in jeopardy if others found out.",
			"Survival is worth more than friendship.",
			"The ghosts from my past hinder my actions."
		],
		variant : [],
		lifestyle : "poor",
	},
	"ticklebelly nomad" : {
		regExpSearch : /^(?=.*ticklebelly)(?=.*nomad).*$/i,
		name : "Ticklebelly Nomad",
		source : ["AL:CoS", 9],
		skills : ["Animal Handling", "Nature"],
		languages : ["Giant"],
		tools : ["Herbalism Kit"],
		gold : 5,
		equipleft : [
			["Herbalism kit", "", 3],
			["Small tribal jewelry", "", ""],
			["Hunting trap", "", 25]
		],
		equipright : [
			["Common clothes", "", 3],
			["Belt Pouch (with coins)", "", ""]
		],
		feature : "At Home in the Wild",
		trait : [
			"I eagerly inject myself into the unknown.",
			"Villages, towns, and cities do not suit me. I'd rather be out in the wilderness any day.",
			"I accomplish my tasks efficiently, using as few resources as possible.",
			"It's difficult for me to remain in one place for long.",
			"I loudly brag about my tribe every chance I get.",
			"Having walked among giants, I am fearless in the face of bigger creatures.",
			"I am quiet and reserved, but observant. Nothing escapes my attention.",
			"My word is my bond. I see a promise to completion, even if it conflicts with my beliefs."
		],
		ideal : [
			["Kinship", "Kinship: Family is most important in life. Though I may be far from my own, the bonds of family must be protected in others' lives as well. (Good)"],
			["Preservation", "Preservation: Nature must not be despoiled by encroaching civilization. (Any)"],
			["Wanderlust", "Wanderlust: One must expand their horizons by seeing the world and exploring. (Chaos)"],
			["Isolation", "Isolation: My tribe and its ways must be protected and shielded from outside influence. (Neutral)"],
			["Protection", "Protection: Threats to the land and to the people must be dealt with at any and all costs. (Law)"],
			["Belonging", "Belonging: All creatures have a place in the world, so I strive to help others find theirs. (Good)"]
		],
		bond : [
			"I ache to return to my tribe and the family I left, but cannot until my obligations are fulfilled.",
			"The dragon cultists that invaded my homeland stole away one of my tribe's people. I will not know rest until I've found them.",
			"The dragon's presence in the hills destroyed valuable territory and resulted in deaths within my tribe. The creature must pay for what it has done.",
			"I carry a trinket that spiritually and emotionally ties me to my people and my home.",
			"I discovered a strange relic in the hills during my tribe's wanderings. I must discover what it is.",
			"One of the stone giant clans from the Giant's Cairn has graced me with a mark of kinship."
		],
		flaw : [
			"I throw myself and my friends into situations rarely ever thinking about consequences.",
			"Unfamiliar people and surroundings put me on edge.",
			"I have absolutely no patience for slowpokes and those who prove indecisive.",
			"My desire to experience new things causes me to make unsafe choices.",
			"I am overly protective of nature, sometimes to the detriment of my companions and myself.",
			"My lack of worldliness often proves my undoing in social, commercial, and hostile situations."
		],
		variant : [],
		lifestyle : "poor",
	},

	//RoD backgrounds (with the help of AggieBear)
	"cormanthor refugee" : {
		regExpSearch :  /^(?=.*cormanthor)(?=.*refugee).*$/i,
		name : "Cormanthor Refugee",
		source : ["AL:RoD", 5],
		skills : ["Nature", "Survival"],
		gold : 5,
		equipleft : [
			["Two-person tent", "", 20],
			["Set of artisan's tools", "", ""]
		],
		equipright : [
			["Traveler's clothes", "", 4],
			["Holy symbol (type)", "", 1],
			["Belt pouch (with coins)", "", 1]
		],
		feature : "Shelter of the Elven Clergy",
		trait : [
			"I long for a home that never really existed, whether in the camps, Hillsfar, or Myth Drannor.",
			"Though I am not an elf, I am a fervent, radical worshipper of the elven gods.",
			"I live in the moment, knowing my life could be turned upside down any day.",
			"I appreciate beauty in all of its forms.",
			"I hate the dark elves and the Netherese for each driving the elves out of Cormanthyr in the past.",
			"I am a forest bumpkin who grew up in a tent in the woods and is wholly ignorant of city life.",
			"I was raised alongside children of many other races. I harbor no racial prejudices at all.",
			"The elves have just the right word for so many things that cannot be expressed as well in other languages. I pepper my speech with elven words, phrases, and sayings."
		],
		ideal : [
			["Patient",
				"Patient: The elves have taught me to think and plan for the long-term. (Lawful)"
			],
			["Rebellious",
				"Rebellious: Governments and politicians drove my family to the camps. I subtly defy authority whenever I think I can get away with it. (Chaotic)"
			],
			["Self-Absorbed",
				"Self-Absorbed: I've had to look out for number one so long that it has become second nature. (Any)"
			],
			["Wanderlust",
				"Wanderlust: I want to see as much of the world beyond the camps as I can. (Any)"
			],
			["Generous",
				"Generous: I give everything I can to help those in need, regardless of who they are. (Good)"
			],
			["To the Abyss with Them",
				"To the Abyss with Them: The people of Hillsfar cast me out. I won't risk my hide to help them. (Evil)"
			]
		],
		bond : [
			"The elves took me in when I had nowhere else to go. In return, I do what I can to help elves in need.",
			"I seek revenge against the people of Hillsfar for driving my family into the forest.",
			"My family lost everything when they were driven from Hillsfar. I strive to rebuild that fortune.",
			"The forest has provided me with food and shelter. In return, I protect forests and those who dwell within.",
			"I am deeply, tragically in love with someone whose racial lifespan is far longer or shorter than mine.",
			"Members of my extended family did not make it to the camps or have been kidnapped to fight in the Arena. I search for them tirelessly."
		],
		flaw : [
			"I am very uncomfortable indoors and underground",
			"I am haughty. I grew up among the elves and emulate them. Other races are crude in comparison.",
			"Elf this, elf that. I am sick and tired of the elves.",
			"I am a miser. Having lost everything once before, I clutch my possessions and wealth very tightly.",
			"I am a moocher. I am so used to others providing for me that I have come to expect everyone to do it.",
			"I believe the gods have cursed me, my family, and all of the Cormanthor refugees. We are all doomed, doomed I tell you!"
		],
		tools : ["Type of artisan's tools"],
		languages : ["Elvish"],
		variant : [],
		lifestyle : "poor"
	},
	"gate urchin" : {
		regExpSearch :  /^(?=.*gate)(?=.*urchin).*$/i,
		name : "Gate Urchin",
		source : ["AL:RoD", 6],
		skills : ["Deception", "Sleight of Hand"],
		gold : 10,
		equipleft : [
			["Battered alms box", "", 1]
		],
		equipright : [
			["Common clothes", "", 3],
			["Cast-off military jacket, cap, or scarf", "", ""],
			["Belt pouch (with coins)", "", 1],
			["Musical instrument of my choice", "", ""]
		],
		feature : "Red Plume and Mage Guild Contacts",
		trait : [
			"I appreciate the simple things in life: a song, a warm meal, a sunny day. I don't need any more.",
			"My problems are always caused by others. I'm never to blame.",
			"I am afraid I could wind up back on the streets any day.",
			"I get along with everyone.",
			"I see people as marks for a con and have difficulty feeling true empathy for them.",
			"I have a real flair for matchmaking. I can find anyone a spouse!",
			"I think money is the true measure of appreciation and affection. Everything else is talk or an act.",
			"I don't like having a lot of stuff, just a few simple things I need. I don't like being tied down and tend to leave things behind when I don't need them anymore."
		],
		ideal : [
			["Loyal",
				"Loyal: I never rat out any of my friends, even when the Red Plumes or the Rogues Guild ask. (Lawful)"
			],
			["Adventurous",
				"Adventurous: I don't like doing the same thing every day. I crave variety. (Chaotic)"
			],
			["Strong",
				"Strong: Only the strong survive. I respect those who are strong and powerful. (Any)"
			],
			["Witty",
				"Witty: Brains are better than brawn. I rely on my wits and respect others who do the same. (Any)"
			],
			["Honest",
				"Honest: Others can do what they want, but I won't lie or steal, even to feed my family. (Good)"
			],
			["Ungrateful",
				"Ungrateful: Those who give, only do it to make themselves feel better. I steal from them. (Evil)"
			]
		],
		bond : [
			"The Joydancers of Lliira gave me my instrument when I really needed food. I hate them for that.",
			"Busking has taught me to love music above all else.",
			"The Rogues Guild spared me when I did a job without cutting them in. I owe them a great debt.",
			"I know people hate the Red Plumes, but some of them were really good to me. I help Red Plumes whenever I can, and I respect them. They're just doing what they have to do to get by in this world.",
			"I will be wealthy some day. My descendants will live in comfort and style.",
			"I know how hard life on the streets is. I do everything I can for those who have less than me."
		],
		flaw : [
			"Though I no longer live at the Gate, I am still always concerned about where I will get my next meal.",
			"Years of thieving have become habit. I sometimes steal from strangers without thinking about it.",
			"I am ashamed of my origins. I pretend I am higher-born and fear others will find out the truth.",
			"I think people who grew up in houses are soft, spoiled, and ungrateful. I frequently tell them so.",
			"I am still very uncomfortable wearing nice clothes, sleeping in a warm bed, and eating fine food.",
			"I do not trust anyone who has not had a hard life."
		],
		tools : ["Thieves' tools", "Type of musical instrument"],
		variant : [],
		lifestyle : "poor"
	},
	"hillsfar merchant" : {
		regExpSearch :  /^(?=.*hillsfar)(?=.*merchant).*$/i,
		name : "Hillsfar Merchant",
		source : ["AL:RoD", 7],
		skills : ["Insight", "Persuasion"],
		gold : 25,
		equipright : [
			["Fine clothes", "", 6],
			["Signet ring", "", ""],
			["Purse (with coins)", "", 1],
			["Letter of introduction from family's trading house", "", 1]
		],
		feature : "Factor",
		featureAlt : "Trade Contact",
		trait : [
			"I fill my evenings with wine or mead and song.",
			"I greatly admire gladiators and enjoy the Arena.",
			"I take my wealth for granted. It seldom occurs to me that others aren't rich themselves.",
			"I leave broken hearts all around the Moonsea and up and down the Sword Coast.",
			"I work hard and seldom make time for fun.",
			"I am a particularly devout and pray often.",
			"The Red Plumes caught me once. I hate them.",
			"I ask a lot of questions to get information about those with whom I am working and dealing."
		],
		ideal : [
			["Frugal",
				"Frugal: I spend my money very carefully. (Lawful)"
			],
			["Profligate",
				"Profligate: I tend to spend extravagantly. (Chaotic)"
			],
			["Honest",
				"Honest: I deal with others above board. (Any)"
			],
			["Sharp",
				"Sharp: I seek to make the best deal possible. (Any)"
			],
			["Charitable",
				"Charitable: I give generously to others. (Good)"
			],
			["Greedy",
				"Greedy: I do not share my wealth with others. (Evil)"
			],
		],
		bond : [
			"I am fiercely loyal to those with whom I work.",
			"I must uphold the good name of my family.",
			"I will prove myself to my family as an adventurer.",
			"Deals are sacrosanct. I never go back on my word.",
			"I love making deals and negotiating agreements.",
			"I guard my wealth jealously."
		],
		flaw : [
			"I am a braggart. I promote myself shamelessly.",
			"I am vain. I always wear the latest fashions.",
			"I am a glutton. I eat and drink to excess.",
			"I am a snob. I want only the finest things in life.",
			"I am lazy. I want others to take care of everything.",
			"I am overconfident. I overestimate my abilities."
		],

		tools : ["Vehicles (land)", "Vehicles (water)"],
		variant : [],
		lifestyle : "wealthy"
	},
	"hillsfar smuggler" : {
		regExpSearch :  /^(?=.*hillsfar)(?=.*smuggler).*$/i,
		name : "Hillsfar Smuggler",
		source : ["AL:RoD", 8],
		skills : ["Perception", "Stealth"],
		gold : 5,
		equipleft : [
			["Forgery kit", "", 5]
		],
		equipright : [
			["Common clothes", "", 3],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Secret Passage",
		trait : [
			"When I'm not smuggling, I gamble.",
			"I just love Halfling cooking and baking!",
			"I party with dwarves whenever I can.",
			"I'm a terrible singer, but I love to do it.",
			"I was raised to honor Chauntea and still do.",
			"The blood sports of the Arena sicken me.",
			"I think non-humans are really interesting.",
			"I exaggerate the tales of my exploits."
		],
		ideal : [
			["Fair",
				"Fair: I think everyone deserves to be treated fairly. I don't play favorites. (Lawful)"
			],
			["Impulsive",
				"Impulsive: Planning is often a waste of time. No plan survives contact with reality. It's easier to dive in and deal with the consequences. (Chaotic)"
			],
			["Curious",
				"Curious: I want to learn as much as I can about the people and places I encounter. (Any)"
			],
			["Prepared",
				"Prepared: I think success depends on preparing as much as possible in advance. (Any)"
			],
			["Respectful",
				"Respectful: I think everyone deserves to be treated with respect and dignity, regardless of their race, creed, color, or origin. (Good)"
			],
			["Corrupt",
				"Corrupt: I will break the law or act dishonestly if the money is right. (Evil)"
			],
		],
		bond : [
			"I am loyal to the Rogues Guild and would do anything for them.",
			"I love the city of Hillsfar and my fellow Hillsfarians, despite the recent problems.",
			"I admire the elves. I help them whenever I can.",
			"A gnome helped me once. I pay the favor forward.",
			"I enjoy tricking the Red Plumes at every opportunity.",
			"I smuggled agricultural goods for non-human farmers. I try to help them when I can."
		],
		flaw : [
			"My hatred for the Red Plumes burns so brightly that I have difficulty suppressing It around them.",
			"The Red Plumes caught me once before, and I was branded for my crime. If they catch me again, for any offense, the punishment will be dire..",
			"I treat all Hillsfarans poorly. I am disgusted with their failure to revolt against the Great Law of Humanity.",
			"I have difficulty trusting strangers. Anyone could be a spy for the authorities.",
			"I am greedy. There Isn't much I won't do for money.",
			"I'm an informant for the Red Plumes. They let me continue my activities, so long as I pass them information about illegal activity in Hillsfar."
		],
		tools : ["Forgery kit"],
		languages : ["+1 racial from "],
		variant : [],
		lifestyle : "modest",
	},
	"secret identity" : {
		regExpSearch : /^(?=.*secret)(?=.*identity).*$/i,
		name : "Secret Identity",
		source : ["AL:RoD", 9],
		skills : ["Deception", "Stealth"],
		gold : 5,
		equipleft : [
			["Disguise kit", "", 3],
			["Forgery kit", "", 5]
		],
		equipright : [
			["Common clothes", "", 3],
			["Belt pouch (with coins)", "", 1]
		],
		feature : "Secret Identity",
		trait : [
			"Despite its problems, I love Hillsfar, it's the greatest city in the world. The only one for me.",
			"I move from place to place, never staying anywhere long and leaving nothing behind.",
			"I think flattery is the best way to direct attention away from me.",
			"I don't make friends easily. They're a liability I cannot afford.",
			"Risk and danger are exhilarate me. Pulling off schemes and deceptions is a rush.",
			"The First Lord is right, humans are superior. I really admire them, despite the atrocities.",
			"I avoid people of my own race, as well as things associated with my race, lest they give me away.",
			"I live for the Arena. I admire gladiators and enjoy the thrill of blood on the sands!"
		],
		ideal : [
			["Quisling",
				"Quisling: Supporting the rulers of the land and following the laws is the road to salvation. (Lawful)"
			],
			["Scoflaw",
				"Scoflaw: The laws and lawmakers are corrupt. I follow laws only when it suits me. (Chaotic))"
			],
			["Optimist",
				"Optimist: Everyone Is basically good. Though the government is misguided it will all be okay. (Any)"
			],
			["Secretive",
				"Secretive: I am in the habit of not talking about myself. My business is none of yours. (Any)"
			],
			["Heroic",
				"Heroic: I do everything I can to help non-humans, regardless of the personal cost to me. (Good)"
			],
			["Depraved",
				"Depraved: I have lost my moral compass. The ends justify most any means. (Evil)"
			],
		],
		bond : [
			"The humans of Hillsfar have inflicted terrible harm on me, my family, and my race. I will have revenge.",
			"I am part of an underground network that smuggles non-humans into and out of the city.",
			"I am a partisan. I commit minor acts of defiance against the First Lord and Red Plumes when I can.",
			"I am a spy. I report on events in and around Hillfar.",
			"My secret identity is the only thing protecting me from the Arena. I will stop at nothing to maintain it.",
			"I am madly in love with a human who does not know my true identity, and I fear rejection if I reveal it."
		],
		flaw : [
			"After years of denying who I am, I now despise myself and other members of my pathetic race.",
			"Years of hiding have made me somewhat paranoid. I trust no one.",
			"I've been lying so often and for so long that I can't help it anymore. I frequently lie for no reason at all.",
			"I am ashamed. I failed to protect a member of my family who was seized and thrown into the Area.",
			"I am struggling with maintaining my secret identity. I subconsciously want to get caught and therefore sometimes let my secret identity slip.",
			"Years of successfully deceiving others have made me cocky. I think no one can see through my lies."
		],
		tools : ["Disguise kit", "Forgery kit"],
		variant : [],
		lifestyle : "modest"
	},
	"shade fanatic" : {
		regExpSearch : /^(?=.*shade)(?=.*fanatic).*$/i,
		name : "Shade Fanatic",
		source : ["AL:RoD", 10],
		skills : ["Deception", "Intimidation"],
		gold : 15,
		equipleft : [
			["Forgery kit", "", 5],
			["Transparent shadow cylinder", "", ""]
		],
		equipright : [
			["Fine clothes", "", 6],
			["Signet ring", "", ""],
			["Belt pouch (with coins)", "", 1]
		],
		feature : "Secret Society",
		trait : [
			"I am a bully; I try to hide it though.",
			"I let my actions speak for themselves",
			"I am important; I will not let anyone forget that.",
			"You are either with me or against me.",
			"I know it is only a time before I am betrayed by those I care for.",
			"I never understand why people get so emotional.",
			"They are out to get me. It is only my cunning that keeps me ahead of them",
			"Everyone has a choice, the one I make is always right though."
		],
		ideal : [
			["Hope",
				"Hope: I know even if I need do evil acts, history will be my redemption. (Chaos)"
			],
			["Dedicated",
				"Dedicated: I can do anything I put my mind to (Lawful)"
			],
			["Exciting",
				"Exciting: I have found the truth of the Shadovar and want to share it with everyone. (Any)"
			],
			["Frugal",
				"Frugal: I horde my possessions knowing that someday I will be called upon to give everything I have to the cause (Any)"
			],
			["Eloquent",
				"Eloquent: I use my words to sway others to my beliefs. (Any)"
			],
			["Compassionate",
				"Compassionate: It is through love that others will join In our cause. (Good)"
			],
		],
		bond : [
			"They say the Shade broke the bonds of mortality; I want to find out how.",
			"The whispers in my head remind me that there is power to be found in the shadows.",
			"For the glory of Netheril, I will grow in power.",
			"I once lived in Hillsfar, I was chased out before I was able to say farewell.",
			"My true love was a killed by the Red Plumes; I plot to make them suffer.",
			"I had a loved one die in the arena at Hillsfar; I am out to prove I am stronger than them!"
		],
		flaw : [
			"I always over exaggerate my abilities.",
			"I cannot bear to let those I care for out of my sight.",
			"I am incapable of standing up for myself.",
			"The group I am with has committed atrocities; I am always worried their actions will become public.",
			"I always enjoy a good mug of ale … or five.",
			"I know what I do is wrong, but am afraid to speak up about it."
		],
		tools : ["Forgery kit"],
		languages : ["Netherese"],
		variant : [],
		lifestyle : "moderate"
	},
	"trade sheriff" : {
		regExpSearch :  /^(?=.*trade)(?=.*sheriff).*$/i,
		name : "Trade Sheriff",
		source : ["AL:RoD", 11],
		skills : ["Investigation", "Persuasion"],
		gold : 17,
		equipleft : [
			["Thieves' tools", "", 1]
		],
		equipright : [
			["Fine clothes", "", 6],
			["Gray cloak", "", ""],
			["Sheriff's insignia", "", ""]
		],
		feature : "Investigative Services",
		trait : [
			"I am always polite and respectful",
			"I let my actions speak for themselves",
			"I am haunted by my past having seen the murder of a close friend or family member and it is the one case I always needed to solve but have not been able to.",
			"I am quick to judge and slow to vindicate",
			"I can be very persuasive and am able to ask questions where others might not be able to.",
			"I have a quirky personality that seems to take others off their guard.",
			"My sense of humor is considered by most to be awkward",
			"Everyone has a choice, and they can always make the right choice, mine!"
		],
		ideal : [
			["Hope",
				"Hope: my job is to speak for the victim (good)"
			],
			["Dedicated",
				"Dedicated: Once I start an investigation, until told to do so, I do not quit, not matter where it leads. (Lawful)"
			],
			["Nation",
				"Nation: My city, nation, or people are all that matter (any)"
			],
			["Mercenary",
				"Mercenary: When I do investigations, I expect answers immediately (Any)"
			],
			["Eloquent",
				"Eloquent: I use my words to sway others to give me answers.(good)"
			],
			["Might",
				"Might: It is through threats and force that I get my answers (lawful)"
			],
		],
		bond : [
			"To this day an unsolved case will always leave me haunted and bother me.",
			"Through the might of my personality I will solve an investigation or puzzle.",
			"It is my right to believe what I will, just try and stop me.",
			"I need to prove my worth to my fellow Sheriffs.",
			"Someone I cared for died under suspicious circumstances. I will find out what happened to them and bring their killer to justice.",
			"I speak for those that cannot speak for themselves."
		],
		flaw : [
			"I always over exaggerate my abilities.",
			"I cannot bear to let those I care for out of my sight.",
			"I took a bribe to tank an investigation and I would do anything to keep it secret.",
			"I have little respect for those that are of \"low\" intelligence/race.",
			"I always enjoy a good mug of ale … or five to cover up my past.",
			"I speak for the First Lord of Hillsfar and make sure everyone knows it."
		],
		tools : ["Thieves' tools"],
		languages : ["Elvish"],
		variant : [],
		lifestyle : "moderate"
	},

	//EE backgrounds [Mulmaster]
	"caravan specialist" : {
		regExpSearch :  /^(?=.*caravan)(?=.*specialist).*$/i,
		name : "Caravan Specialist",
		source : ["AL:EE", 2],
		skills : ["Animal Handling", "Survival"],
		gold : 10,
		equipleft : [
			["Two-person tent", "", 20],
			["Regional map", "", ""]
		],
		equipright : [
			["Traveler's clothes", "", 4],
			["Belt pouch (with coins)", "", 1]
		],
		feature : "Wagonmaster",
		trait : [
			"Any group is only as strong as its weakest link. Everyone has to pull their own weight.",
			"There's always someone out there trying to take what I've got. Always be vigilent.",
			"Anything can be learned if you have the right teacher. Most folks just need a chance.",
			"Early to bed and early to rise; this much at least is under my control.",
			"You can listen to me or don't and wish you had. Everyone ends up on one side of that fence.",
			"Eventually my hard work will be rewarded. Maybe that time has finally come.",
			"A strong ox or horse is more reliable than most people I've met.",
			"I never had time for books, but wish I had. I admire folks who have taken the time to learn."
		],
		ideal : [
			["Service",
				"Service: Using my talents to help others is the best way of helping myself. (Good)"
			],
			["Selfish",
				"Selfish: What people don't know WILL hurt them, but why is that my problem? (Evil)"
			],
			["Wanderer",
				"Wanderer: I go where the road takes me. Sometimes that's a good thing… (Chaotic)"
			],
			["Fittest",
				"Fittest: On the open road, the law of nature wins. Victims are the unprepared. (Lawful)"
			],
			["Focused",
				"Focused: I simply have a job to do, and I'm going to do it. (Neutral)"
			],
			["Motivated",
				"Motivated: There's a reason I'm good at what I do, I pay attention to the details. (Any)"
			]
		],
		bond : [
			"My brother has a farm In Elmwood and I've helped him and his neigbors move their goods to Mulmaster and other surrounding towns. Those are good people.",
			"A caravan I lead was attacked by bandits and many innocents died. I swear that I will avenge them by killing any bandits I encounter.",
			"The Soldiery are mostly good guys who understand the importance of protecting the roads. The City Watch is who you have to look out for. If they are inspecting your goods, get ready to pay a fine.",
			"The new commander of Southroad Tower, Capt. Holke, understands the importance of safe roads. He's hired me for several jobs and I'm grateful.",
			"There's always a road I haven't traveled before. I'm always looking for new places to explore.",
			"Wealth and power mean little without the freedom to go where and when you want."
		],
		flaw : [
			"I have trouble trusting people I've just met.",
			"I enjoy the open road. Underground and tight spaces make me very nervous.",
			"I expect others to heed my orders and have little respect or sympathy if they don't.",
			"I am very prideful and have trouble admitting when I'm wrong.",
			"Once I decide on a course of action, I do not waiver.",
			"I like to explore, and my curiosity will sometimes get me into trouble."
		],
		tools : ["Vehicles (land)"],
		languages : ["+1 from "],
		variant : [],
		lifestyle : "poor"
	},
	"earthspur miner" : {
		regExpSearch :  /^(?=.*earthspur)(?=.*miner).*$/i,
		name : "Earthspur Miner",
		source : ["AL:EE", 3],
		skills : ["Athletics", "Survival"],
		gold : 5,
		equipleft : [
			["Shovel or miner's pick", "", 5],
			["Block and tackle", "", 5],
			["Climber's kit", "", 12]
		],
		equipright : [
			["Common clothes", "", 3],
			["Belt pouch (with coins)", "", 1]
		],
		feature : "Deep Miner",
		trait : [
			"Nothing bothers me for long.",
			"I hate the horrors of the Underdark with a passion. They took my friends and family and almost got me.",
			"Anything worth doing takes time and patience. I have learned to plan and wait for the things I want and to be patient to achieve my goals.",
			"I can party with everyone. Whether with dwarves, or goliaths, or deep gnomes, I can find a way to have a good time.",
			"I'd rather be mining. This is okay; mining is better.",
			"I think that I will stumble upon great riches if I just keep looking.",
			"People who don't work with their hands and who live in houses are soft and weak.",
			"I wish I were more educated. I look up to people who are."
		],
		ideal : [
			["Generosity",
				"Generosity: The riches of the earth are to be shared by all. (Good)"
			],
			["Greed",
				"Greed: Gems and precious metals, I want them all for myself. (Evil)"
			],
			["Mooch",
				"Mooch: Property, schmoperty. If I need it, I take and use it. If I don't, I leave it for someone else. (Chaotic)"
			],
			["Boundaries",
				"Boundaries: Everything and everyone has its prescribed place; I respect that and expect others to do the same. (Lawful) "
			],
			["Let it Be",
				"Let it Be: I don't meddle in the affairs of others if I can avoid it. They're none of my business. (Neutral)"
			],
			["Materialist",
				"Materialist: I want riches to improve my life. (Any)"
			]
		],
		bond : [
			"The people of the Earthspur mines are my family. I will do anything to protect them.",
			"A deep gnome saved my life when I was injured and alone. I owe his people a great debt.",
			"I must behold and preserve the natural beauty of places below the earth.",
			"Gems hold a special fascination for me, more than gold, land, magic, or power.",
			"I want to explore new depths and scale new heights.",
			"Someday I'm going to find the mother lode, then I'll spend the rest of my life in luxury."
		],
		flaw : [
			"I'm uncomfortable spending time under the open sky. I'd rather be indoors or underground.",
			"I'm not used to being around other people much and sometimes get grouchy about it.",
			"Good tools are more reliable than people. In a cave in, I would save a sturdy pick before a stranger.",
			"I jealously guard my secrets, because I think others will take advantage of me if they learn what I know.",
			"I am obsessed with getting rich. I always have a scheme brewing for making it big.",
			"I'm afraid of the dark."
		],
		languages : ["Dwarvish", "Undercommon"],
		variant : [],
		lifestyle : "poor"
	},
	"harborfolk" : {
		regExpSearch :  /harborfolk/i,
		name : "Harborfolk",
		source : ["AL:EE", 4],
		skills : ["Athletics", "Sleight of Hand"],
		gold : 5,
		equipleft : [
			["Fishing tackle", "", 4],
			["Set of dice, playing cards, or three-dragon ante", "", ""]
		],
		equipright : [
			["Common clothes", "", 3],
			["Belt pouch (with coins)", "", 1],
			["Rowboat", "", 100]
		],
		feature : "Harborfolk",
		trait : [
			"I am curious. I want to know why things are the way they are and why people do the things that they do.",
			"I can't sing, but that never stops me from doing it, loudly. Everyone loves a good sea chanty!",
			"I think the High Blade is doing a terrific job, don't you?",
			"I'm very excited that the House Built on Gold is being restored. I am a zealous worshipper of Waukeen.",
			"I am quite superstitious. I see portents in everyday occurances.",
			"I resent the rich and enjoy thwarting their plans and spoiling their fun in small ways.",
			"I have a sea story to fit every occasion.",
			"I'm a fisher, but I secretly detest eating fish. I will do anything to avoid it."
		],
		ideal : [
			["Calm",
				"Calm: For all things, there is a tide. I set sail when it is right, and mend my nets when it is not. (Lawful)"
			],
			["Windblown",
				"Windblown: I go where the winds blow. No man or woman tells me where or when to sail. (Chaotic)"
			],
			["Aspiring",
				"Aspiring: I will gain the favor of a Zor or Zora patron, maybe even one of the Blades! (Any)"
			],
			["Salty",
				"Salty: I want people to look to me as an expert on plying Mulmaster Harbor. (Any)"
			],
			["Selfless",
				"Selfless: We are all children of the sea. I help everyone in peril afloat and ashore. (Good)"
			],
			["Let them Drown",
				"Let them Drown: I refuse to risk my hide to help others. They wouldn't help me if roles were reversed. (Evil)"
			]
		],
		bond : [
			"I once lost everything but my rowboat. I'll do anything to protect it.",
			"My brother was in the Soldiery, but he was killed. I really look up to the men and women who serve.",
			"The Cloaks killed my friend for spellcasting. I'll get them back somehow, someday.",
			"The High House of Hurting helped me when I was hurt and asked nothing in return. I owe them my life.",
			"I was robbed in the Zhent ghetto once. It will not happen again.",
			"I would do anything to protect the other harborfolk. They are my family.",
		],
		flaw : [
			"I drink too much, which causes me to miss the tide.",
			"I killed a drunk member of the City Watch in a brawl. I am terrified that they might find out.",
			"I oversell myself and make promises I can't keep when I want to impress someone.",
			"Book learning is a waste of time. I have no patience for people who don't speak from experience.",
			"I almost always cheat. I can't help myself.",
			"I am a secret informant for the Hawks. I send them reports about everything I see and hear, even what my friends and allies are up to.",
		],
		tools : ["A type of gaming set", "Vehicles (water)"],
		variant : [],
		lifestyle : "poor"
	},
	"mulmaster aristocrat" : {
		regExpSearch :  /^(?=.*mulmaster)(?=.*aristocrat).*$/i,
		name : "Mulmaster Aristocrat",
		source : ["AL:EE", 5],
		skills : ["Deception", "Performance"],
		gold : 10,
		equipleft : [
			["Artisan's tools or musical instrument", "", ""]
		],
		equipright : [
			["Fine clothes", "", 6],
			["Purse (with coins)", "", 1]
		],
		feature : "Highborn",
		trait : [
			"My ambitions are boundless. I will be a Zor or Zora one day!",
			"I must alwayss look my best.",
			"Beauty is everywhere. I can find it in even the homliest person and the most horrible tragedy.",
			"Décorum must be preserved at all costs.",
			"I will not admit I am wrong if I can avoid it.",
			"I am extremely well-educated and frequently remind others of that fact.",
			"I take what I can today, because I do not know what tomorrow holds.",
			"My life is full of dance, song, drink, and love.",
		],
		ideal : [
			["Generous",
				"Generous: I have a responsibility to help and protect the less fortunate. (Good)"
			],
			["Loyal",
				"Loyal: My word, once given, is my bond. (Lawful)"
			],
			["Callous",
				"Callous: I am unconcerned with any negative effects my actions may have on the lives and fortunes of others. (Evil)"
			],
			["Impulsive",
				"Impulsive: I follow my heart. (Chaotic)"
			],
			["Ignorant",
				"Ignorant: Explanations bore me. (Neutral)"
			],
			["Isolationist",
				"Isolationist: I am concerned with the fortunes of my friends and family. Others must see to themselves. (Any)"
			]
		],
		bond : [
			"I have dedicated my wealth and my talents to the service of one of the city's many temples.",
			"My family and I are loyal supporters of High Blade Jaseen Drakehorn. Our fortunes are inexorably tied to hers. I would do anything to support her.",
			"Like many families who were close to High Blade Selfaril Uoumdolphin, mine has suffered greatly since his fall. We honor his memory in secret.",
			"My family plotted with Rassendyll Uoumdolphin brother usurped brother as High Blade. Betrayal is the quickest route to power.",
			"Wealth and power are nothing. Fulfillment can only be found in artistic expression.",
			"It's not how you feel, who you know, or what you can do - it's how you look, and I look fabulous."
		],
		flaw : [
			"I have difficulty caring about anyone or anything other than myself.",
			"Having grown up with wealth, I am careless with my finances. I overspend and am overly generous.",
			"The ends (my advancement) justify any means.",
			"I must have what I want and will brook no delay.",
			"My family has lost everything. I must keep up appearances, lest we become a laughingstock.",
			"I have no artistic sense. I hide that fact behind extreme opinons and have become a trendsetter."
		],
		tools : ["Type of artisan's tools", "Type of musical instrument"],
		variant : [],
		lifestyle : "wealthy"
	},
	"phlan refugee" : {
		regExpSearch :  /^(?=.*phlan)(?=.*refugee).*$/i,
		name : "Phlan Refugee",
		source : ["AL:EE", 6],
		skills : ["Insight", "Athletics"],
		gold : 15,
		equipleft : [
			["Set of artisan's tools", "", ""],
			["Token of the life I once knew", "", ""]
		],
		equipright : [
			["Traveler's clothes", "", 4],
			["Belt pouch (with coins)", "", 1]
		],
		feature : "Phlan Survivor",
		trait : [
			"I may have lost everything I worked for most of my life, but there's work to be done, no time to linger on the past.",
			"I worked hard to get where I am and I refuse to let a little hardship stop me from succeeding.",
			"I protect those around me, you never know when one of them will be useful.",
			"I have always gotten ahead by giving, why change now?",
			"I prepare for everything, it paid off in Phlan and it will pay off again.",
			"I will reclaim my home, though the path may be long, I will never give up hope.",
			"I never cared for personal hygiene, and am amazed that It bothers others.",
			"I am always willing to volunteer my services, just as long as don't have to do anything."
		],
		ideal : [
			["Justice",
				"Justice: Corruption brought Phlan down, I will not tolerate that any longer. (Lawful)"
			],
			["Acceptance",
				"Acceptance: Stability is a myth, to think you can control your future is futile. (Chaotic)"
			],
			["Hope",
				"Hope: I am guided by a higher power and I trust that everything will be right in the end. (Good)"
			],
			["Restraint",
				"Restraint: I hate those who caused my loss. It is all I can do not to lash out at them. (Any)"
			],
			["Strength",
				"Strength: As shown in Phlan, the strong survive. If you are weak you deserve what you get (Evil)"
			],
			["Openness",
				"Openness: I am always willing to share my life story with anyone who will listen. (Any)"
			]
		],
		bond : [
			"I have the chance at a new life and this time I am going to do things right.",
			"The Lord Regent brought this suffering upon his people. I will see him brought to justice.",
			"I await the day I will be able to return to my home in Phlan.",
			"I will never forget the debt owed to Glevith of the Welcomers. I will be ready to repay that debt when called upon.",
			"There was someone I cared about in Phlan, I will find out what happened to them.",
			"Some say my life wasn't worth saving, I will prove them wrong."
		],
		flaw : [
			"I used the lives of children to facilitate my escape from Phlan.",
			"I am a sucker for the underdog, and always bet on the loosing team.",
			"I am incapable of standing up for myself.",
			"I will borrow money from friends with no intention to repay it.",
			"I am unable to keep secrets. A secret is just an untold story.",
			"When something goes wrong, it's never my fault."
		],
		tools : ["Type of artisan's tools"],
		languages : ["+1 from "],
		variant : [],
		lifestyle : "modest"
	},
}

var BackgroundSubList = {
	//PHB variant backgrounds
	"gladiator" : {
		regExpSearch : /gladiator/i,
		name : "Gladiator",
		source : ["P", 131],
		equipright : [
			["Costume", "", 4],
			["Favor of an admirer", "", ""],
			["Belt pouch (with coins)", "", 1],
			["Inexpensive, unusual weapon", "", ""],
		],
		feature : "Are You Entertained?",
		extra : "",
	},
	"guild merchant" : {
		regExpSearch : /^(?=.*guild)(?=.*merchant).*$/i,
		name : "Guild Merchant",
		source : ["P", 133],
		equipleft : [
			["Letter of introduction from guild", "", ""],
		],
		equipright : [
			["Traveler's clothes", "", 4],
			["Belt pouch (with coins)", "", 1],
			["Cart", "", ""],
			["Mule", "", ""],
		],
		extra : [
			"Select a Guild Business",
			"Traders",
			"Caravan masters",
			"Shopkeepers"
		],
		tools : ["Navigator's tools (or language)"],
	},
	"knight" : {
		regExpSearch : /^(?!.*order)(?=.*knight).*$/i,
		name : "Knight",
		source : ["P", 136],
		equipright : [
			["Fine clothes", "", 6],
			["Signet ring", "", ""],
			["Purse (with coins)", "", 1],
			["Banner or token from devoted love", "", ""]
		],
		feature : "Retainers",
	},
	"pirate" : {
		regExpSearch : /pirate/i,
		name : "Pirate",
		feature : "Bad Reputation",
	},
	
	//SCAG variant backgrounds
	"city watch" : {
		regExpSearch : /^(?=.*city)(?=.*(watch|guard)).*$/i,
		name : "City Watch",
		source : ["S", 145],
		skills : ["Athletics", "Insight"],
		equipright : [
			["Uniform of my unit", "", 3],
			["Insignia of rank", "", ""],
			["Horn", "", 2],
			["Manacles", "", 6],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Watcher's Eye",
		extra : "",
		tools : "",
		languages : ["+2 from "],
		lifestyle : "modest",
	},
	"clan crafter" : {
		regExpSearch : /^(?=.*clan)(?=.*(crafter|smith|builder|miner)).*$/i,
		name : "Clan Crafter",
		source : ["S", 145],
		skills : ["History", "Insight"],
		equipleft : [
			["Set of artisan's tools", "", ""],
			["Maker's mark chisel", "", 0.5],
		],
		equipright : [
			["Traveler's clothes", "", 4],
			["Belt pouch (with coins and 10 gp gem)", "", 1],
		],
		feature : "Respect of the Stout Folk",
		extra : "",
		languages : ["Dwarvish"],
		lifestyle : "comfortable",
	},
	"cloistered scholar" : {
		regExpSearch : /^(?=.*cloistered)(?=.*scholar).*$/i,
		name : "Cloistered Scholar",
		source : ["S", 146],
		skills : ["History"],
		skillstxt : "History and choose one from Arcana, Nature, and Religion",
		gold : 10,
		equipleft : [
			["Ink, 1 ounce bottle of", 1, ""],
			["Quill", "", ""],
			["Parchment, sheets of", 1, ""],
			["Small penknife", "", 0.5],
			["Borrowed book", "", 5],
		],
		equipright : [
			["Scholar's robes", "", 3],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Library Access",
		extra : ["Name your Library"],
		languages : ["+2 from "],
		lifestyle : "modest",
	},
	"courtier" : {
		regExpSearch : /courtier/i,
		name : "Courtier",
		source : ["S", 146],
		skills : ["Insight", "Persuasion"],
		gold : 5,
		equipleft : "",
		equipright : [
			["Fine clothes", "", 3],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Court Functionary",
		extra : "",
		tools : "",
		languages : ["+2 from "],
		lifestyle : "comfortable",
	},
	"faction agent" : {
		regExpSearch : /^(?=.*agent)(?=.*(faction|harper|order of the gauntlet|emerald enclave|lord.?s alliance|zhentarim)).*$/i,
		name : "Faction Agent",
		source : ["S", 147],
		skills : ["Insight"],
		skillstxt : "Insight and choose one Intelligence, Wisdom, or Charisma skill",
		gold : 15,
		equipleft : [
			["Copy of seminal faction's text", "", ""],
		],
		equipright : [
			["Common clothes", "", 3],
			["Badge or emblem of faction", "", ""],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Safe Haven",
		extra : [
			"Select a Faction",
			"The Harpers",
			"The Order of the Gauntlet",
			"The Emerald Enclave",
			"The Lord's Alliance",
			"The Zhentarim",
		],
		languages : ["+2 from "],
		lifestyle : "modest",
	},
	"inheritor" : {
		regExpSearch : /inheritor/i,
		name : "Inheritor",
		source : ["S", 150],
		skills : ["Survival"],
		skillstxt : "Survival and choose one from Arcana, History, and Religion",
		gold : 15,
		equipleft : [
			["Gaming set or musical instrument", "", ""],
		],
		equipright : [
			["Traveler's clothes", "", 4],
			["The inheritance", "", ""],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Inheritance",
		extra : [
			"Select an Inheritance",
			"Document such as a map, letter, or journal",
			"A trinket",
			"Article of clothing",
			"Piece of jewelry",
			"Arcane book or formulary",
			"Written story, song, poem, or secret",
			"Tattoo or other body marking"
		],
		tools : ["Gaming set or musical instrument"],
		languages : ["+1 from "],
		lifestyle : "wealthy",
	},
	"investigator" : {
		regExpSearch : /investigator/i,
		name : "Investigator",
		source : ["S", 145],
		skills : ["Insight", "Investigation"],
		equipright : [
			["Uniform", "", 3],
			["Insignia of rank", "", ""],
			["Horn", "", 2],
			["Manacles", "", 6],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Watcher's Eye",
		extra : "",
		tools : "",
		languages : ["+2 from "],
	},
	"knight of the order" : {
		regExpSearch : /^(?=.*knight)(?=.*order).*$/i,
		name : "Knight of the Order",
		source : ["S", 151],
		skills : ["Persuasion"],
		skillstxt : "Persuasion and choose one from Arcana, History, Nature, and Religion",
		equipright : [
			["Traveler's clothes", "", 4],
			["Signet, banner, or seal of rank", "", ""],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Knightly Regard",
		extra : ["Name your Knightly Order"],
		tools : ["Gaming set or musical instrument"],
		languages : ["+1 from "],
		lifestyle : "comfortable",
	},
	"mercenary veteran" : {
		regExpSearch : /^(?=.*mercenary)(?=.*(veteran|soldier)).*$/i,
		name : "Mercenary Veteran",
		source : ["S", 152],
		skills : ["Athletics", "Persuasion"],
		equipright : [
			["Uniform of my company", "", 4],
			["Insignia of rank", "", ""],
			["Gaming set", "", ""],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Mercenary Life",
		extra : ["Name your Mercenary Company"],
		lifestyle : "modest",
	},
	"urban bounty hunter" : {
		regExpSearch : /^(?=.*urban)(?=.*bounty)(?=.*hunter).*$/i,
		name : "Urban Bounty Hunter",
		source : ["S", 153],
		skills : "",
		skillstxt : "Choose two from Deception, Insight, Persuasion, and Stealth",
		gold : 20,
		equipright : [
			["Appropriate Clothes", "", 3],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Ear to the Ground",
		extra : "",
		tools : ["2 of: gaming set, instrument, thieves' tools"],
		lifestyle : "poor",	
	},
	"uthgardt tribe member" : {
		regExpSearch : /^(?=.*(uthgardt|barbarian|nomad|clan))(?=.*tribe)(?=.*member).*$/i,
		name : "Uthgardt Tribe Member",
		source : ["S", 153],
		equipright : [
			["Traveler's clothes", "", 4],
			["Hunting trap", "", 25],
			["Totemic token or tattoos of tribal totem", "", ""],
			["Belt pouch (with coins)", "", 1],
		],
		feature : "Uthgardt Heritage",
		extra : "",
		tools : ["Artisan's tools or musical instrument"],
		languages : ["+1 from "],
		lifestyle : "poor",
	},
	"waterdhavian noble" : {
		regExpSearch : /^(?=.*(waterdhavian|waterdeep))(?=.*noble).*$/i,
		name : "Waterdhavian Noble",
		source : ["S", 154],
		gold : 20,
		equipleft : [
			["Scroll of pedigree", "", ""],
			["Skin of fine zzar or wine", "", 5],
		],
		equipright : [
			["Fine clothes", "", 6],
			["Signet ring or brooch", "", ""],
			["Purse (with coins)", "", 1],
		],
		feature : "Kept in Style",
		tools : ["Gaming set or musical instrument"],
		languages : ["+1 from "],
		lifestyle : "wealthy",
	},
}

var BackgroundFeatureList = {
	//PHB backgrounds features
	"are you entertained?" : {
		description : "I can always find a place to perform (arena/pit fight), where I receive free lodging and food of a modest or comfortable standard, as long as I perform each night. In addition, my performance makes me something of a local figure. When strangers recognize me in a town where I have performed, they typically take a liking to me.",
		source : ["P", 131],
	},
	"bad reputation" : {
		description : "No matter where I go, people are afraid of me due to my reputation. When I am in a civilized settlement, I can get away with minor criminal offenses, such as refusing to pay for food at a tavern or breaking down doors at a local shop, since most people will not report my activity to the authorities.",
		source : ["P", 139],
	},
	"by popular demand" : {
		description : "I can always find a place to perform (inn/tavern/circus/etc.), where I receive free lodging and food of a modest or comfortable standard, as long as I perform each night. In addition, my performance makes me something of a local figure. When strangers recognize me in a town where I have performed, they typically take a liking to me.",
		source : ["P", 130],
	},
	"city secrets" : {
		description : "I know the secret patterns and flow to cities and can find passages through the urban sprawl that others would miss. When I am not in combat, I (and companions I lead) can travel between any two locations in the city twice as fast as my speed would normally allow.",
		source : ["P", 141],
	},
	"criminal contact" : {
		description : "I have a reliable and trustworthy contact who acts as my liaison to a network of other criminals. I know how to get messages to and from my contact, even over great distances; specifically, I know the local messengers, corrupt caravan masters, and seedy sailors who can deliver my messages.",
		source : ["P", 129],
	},
	"discovery" : {
		description : "The quiet seclusion of my extended hermitage gave me access to a unique and powerful discovery. The exact nature of this revelation depends on the nature of my seclusion. It might be a great truth, a hidden site, a long forgotten fact, or unearthed some relic of the past that could rewrite history.",
		source : ["P", 134],
	},
	"false identity" : {
		description : "I have created a second identity that includes documentation, established acquaintances, and disguises that allow me to assume that persona. Additionally, I can forge documents, including official papers and personal letters, as long as I have seen an example of the kind of document or the handwriting I am trying to copy.",
		source : ["P", 128],
	},
	"guild membership" : {
		description : "5 gp membership fees per month: The guild offers lodging if possible. In case of being accused of a crime, the guild will support me if a good case can be made for my innocence or the crime is justifiable. I can also gain access to powerful political figures through the guild, as long as I'm in good standing and the guild is paid enough.",
		source : ["P", 133],
	},
	"military rank" : {
		description : "I have a military rank from my career as a soldier. Soldiers loyal to my former military organization still recognize my authority and influence. I can invoke my rank to influence soldiers and temporarily requisition simple equipment or horses. I can usually gain access to friendly military encampments and fortresses where my rank is recognized.",
		source : ["P", 140],
	},
	"position of privilege" : {
		description : "I am welcome in high society, and people assume I have the right to be wherever I am. The common folk make every effort to accommodate me and avoid my displeasure, and other people of high birth treat me as a member of the same social sphere. I can secure an audience with a local noble if I need to.",
		source : ["P", 135],
	},
	"researcher" : {
		description : "When I attempt to learn or recall a piece of lore, if I do not know that information, I often know where and from whom I can obtain it. Usually, this information comes from a library, scriptorium, university, or a sage or other learned person or creature. Unearthing the deepest secrets of the multiverse can require an adventure or even a whole campaign.",
		source : ["P", 138],
	},
	"retainers" : {
		description : "I have the service of three retainers loyal to me family, one of whom is another noble and my squire. My other retainers are commoners who can perform mundane tasks for me, but they do not fight for me, will not follow me into obviously dangerous areas (such as dungeons), and will leave if they are frequently endangered or abused.",
		source : ["P", 136],
	},
	"rustic hospitality" : 	{
		description : "Since I come from the ranks of the common folk, I fit in among them with ease. I can find a place to hide, rest, or recuperate among other commoners, unless I have shown myself to be a danger to them. They will shield me from the law or anyone else searching for me, though they will not risk their lives for me.",
		source : ["P", 131],
	},
	"shelter of the faithful" : {
		description : "I command the respect of those who share my faith. I can perform the religious ceremonies of my faith. My companions and I can expect free healing and care at an establishment of my faith, though I must provide any material components needed for spells. Those who share my religion will support me at a modest lifestyle.",
		source : ["P", 127],
	},
	"ship's passage" : {
		description : "When I need to, I can secure free passage on a sailing ship for myself and my companions. I might sail on the ship I served on, or another ship I have good relations with. Because I'm calling in a favor, I can't be certain of a schedule or route that will meet my every need. My companions and I are expected to assist the crew during the voyage.",
		source : ["P", 139],
	},
	"wanderer" : {
		description : "I have an excellent memory for maps and geography, and I can always recall the general layout of terrain, settlements, and other features around me. In addition, I can find food and fresh water for myself and up to five other people each day, provided that the land offers berries, small game, water, and so forth.",
		source : ["P", 136]
	},
	
	//SCAG backgrounds features
	"court functionary" : {
		description : "My knowledge of how bureaucracies function lets me gain access to the records and inner workings of any noble court or government I encounter. I know or can easily acquire the knowledge who the movers and shakers are, whom to go to for the favors I seek, and what the current intrigues of interest in the group are.",
		source : ["S", 147],
	},
	"all eyes on you" : {
		description : "My accent, mannerisms, figures of speech all mark me as foreign. Curious glances are directed my way wherever I go. A nuisance, but I also gain the friendly interest of the curious. I can parley this attention into access I might not otherwise have, for me and my companions. Nobles, scholars, merchants, and guilds, might be among the interested.",
		source : ["S", 149],
	},
	"ear to the ground" : {
		description : "I am in frequent contact with people in my chosen segment of society. These people might be associated with the criminal underworld, the rough-and-tumble folk of the streets, or members of high society. This connection comes in the form of a contact in any city I visit, a person who provides information about the people and places of the local area.",
		source : ["S", 153],
	},
	"inheritance" : {
		description : "The item I inherited has a special significance, history, power, and/or important value. When I begin my adventuring career, I can decide whether to tell my companions about it right away. Rather than attracting attention to myself, I could decide to keep it a secret until I learn more about what it means to me and what it can do for me.",
		source : ["S", 150],
	},
	"kept in style" : {
		description : "While I am in Waterdeep or elsewhere in the North my house sees to my everyday needs. My name and signet are sufficient to cover most of my expenses; the inns, taverns, and festhalls I frequent are glad to record my debt and send an accounting to my family's estate. This advantage enables me to take 2 gp of my daily lifestyle costs down to 0 gp.",
		source : ["S", 154],
	},
	"knightly regard" : {
		description : "I receive shelter and succor from members of my knightly order and its sympathizers. Religious knightly orders get aid from temples and communities of my deity. Civic order knights get help from the community they serve. Philosophical order knights can find help from those they have aided in pursuit of their ideals, and those who share those ideals.",
		source : ["S", 151],
	},
	"library access" : {
		description : "I have free access to most of the library I work at, though it might have repositories of lore that are too valuable, magical, or secret to permit anyone immediate access. I have a working knowledge of my cloister's personnel and bureaucracy, and I know how to navigate those connections. I am likely to gain preferential treatment at other libraries.",
		source : ["S", 146],
	},
	"mercenary life" : {
		description : "I know the mercenary life well. I am able to identify mercenary company emblems, and I know a little about any such company, including the leaders, reputation, and who hired them recently. I can find the locales where mercenaries abide anywhere, as long as I speak the language. My mercenary work between adventures affords me a comfortable lifestyle.",
		source : ["S", 152],
	},
	"respect of the stout folk" : {
		description : "No one esteems clan crafters quite so highly as dwarves do. I always have free room and board in any place where shield dwarves or gold dwarves dwell, and the individuals in such a settlement might vie among themselves to determine who can offer you (and possibly your compatriots) the finest accommodations and assistance.",
		source : ["S", 145],
	},
	"safe haven" : {
		description : "As a faction agent, I have access to a secret network of support and operatives who can provide assistance on my adventures. I know secret signs and passwords to identify such operatives, who can provide me with access to a hidden safe house, free room and board, or assistance in finding information. These agents never risk their lives or identity for me.",
		source : ["S", 147]
	},
	"uthgardt heritage" : {
		description : "I have an excellent knowledge of my tribe's territory, and surrounding terrain and natural resources. I am familiar enough with any wilderness area that I can find twice as much food and water as one normally would. I can call upon the hospitality of my people, and those allied, often including members of druid circles, nomadic elves, and priesthoods.",
		source : ["S", 154]
	},
	"watcher's eye" : {
		description : "My experience in enforcing the law, and dealing with lawbreakers, gives me a feel for local laws and criminals. I can easily find the local outpost of the watch, guards or a similar organization, and just as easily pick out the dens of criminal activity in a community. I am far more likely to be welcome in the former locations rather than the latter, however.",
		source : ["S", 145]
	},
	
	//HotDQ background features
	"cult of the dragon infiltrator" : {
		description : "I have infiltrated the ranks of the Cult of the Dragon. Having spied on the organization for quite some time, I am familiar with its inner workings and customs. I have a second identity as an initiate of the cult, enough of a facade to blend in as a simple grunt or servant.",
		source : ["HotDQ", 87]
	},
	"dragon scholar" : {
		description : "I have studied dragons and their lore for many years. I can automatically identify locations built or used by dragons, and I can identify dragon eggs and scales by sight. If I fail an Intelligence check to recall lore relating to dragons, I know someone or some book that I can consult for the answer unless the DM rules that the lore is unknown.",
		source : ["HotDQ", 87]
	},
	
	//OotA background features
	"deep delver" : {
		description : "I have a knack for finding my way in the Underdark, recalling all twists and turns with ease, such that I can always retrace my steps underground. I can determine which sources of food and water are safe to consume. I can always find sufficient food and water for myself and up to five other people in the Underdark, if sustenance is available in the area.",
		source : ["OotA", 221]
	},
	"underdark experience" : {
		description : "I'm no casual visitor to the Underdark, but have spent considerable time there learning its ways. I'm familiar with the various races, civilizations, settlements, and travel routes of the Underdark. If I fail an Intelligence check to recall some piece of Underdark lore, I know a source I can consult for the answer unless the DM rules that the lore is unknown.",
		source : ["OotA", 221]
	},
	
	//CoS background features
	"at home in the wild" : {
		description : "In the wilderness, my home, I can find a place to hide, rest, or recuperate that is secure enough to conceal me from most natural threats, but not all supernatural, magical, or threats that actively seek me out. However, this feature doesn't shield or conceal me from scrying, mental probing, nor from threats that don't need the five senses to find me.",
		source : ["AL:CoS", 9]
	},
	"black-market breeder" : {
		description : "I know how to find people who are always looking for stolen animals and vehicles, for pit fights or getaways during an illegal job. This provides me with information of what such animals & vehicles are in high demand in the area, but also offer to give me favors and information (DM choice) if I bring such animals and vehicles to them.",
		source : ["AL:CoS", 5]
	},
	"double agent" : {
		description : "I have a trusty contact in the Tears of Virulence garrison in Phlan to whom I pass information. In exchange, I get away with minor criminal offenses in Phlan. My Black Fists contacts can help me get an audience with the Lord Regent, the Lord Sage, Black Fists members, or deposed nobles who are sympathetic to the Phlan refugees and insurgents.",
		source : ["AL:CoS", 2]
	},
	"dragonscarred" : {
		description : "My extensive scars from being tortured by Vorgansharax give me fame and notoriety, but it is difficult to disguise my appearance and hide from prying eyes. I can use this to gain access to people and places I might not otherwise have, for me and my companions. However, I fear that my afflictions are not completely mundane, as they burn and writhe.",
		source : ["AL:CoS", 3]
	},
	"ex-convict" : {
		description : "The knowledge gained during my incarceration lets me gain insight into local guards and jailors. I know which will accept bribes, or look the other way for me. I can also seek shelter for myself from authorities with other criminals in the area.",
		source : ["AL:CoS", 8]
	},
	"guerilla" : {
		description : "I've come to know the surrounding other natural features in which I can take refuge--or set up ambushes. I can quickly survey my environment for advantageous features. Additionally, I can scavenge around my natural surroundings to cobble together simple supplies (such as improvised torches, rope, patches of fabric, etc.) that are consumed after use.",
		source : ["AL:CoS", 6]
	},
	"heart of darkness" : {
		description : "Those who look into my eyes can see that I have faced unimaginable horror and that I am no stranger to darkness. Though they might fear me, commoners will extend me every courtesy and do their utmost to help. Unless I have shown myself to be a danger to them, they will even take up arms to fight with me, should I find myself facing an enemy alone.",
		source : ["CoS", 209],
	},

	//RoD background features
	"factor" : {
		description : "My family has assigned me the services of a loyal retainer from the business. This person can perform mundane tasks for me such as making purchases, delivering messages, and running errands. He or she will not fight for me or follow me into danger, and will leave if frequently endangered or abused. If killed, my family assigns me another within days.",
		source : ["AL:RoD", 7]
	},
	"investigative services" : {
		description : "I have a way of communicating with others that puts them at ease. I can invoke my rank to allow me access to a crime scene or to requisition equipment or horses on a temporary basis. When entering a settlement around Hillsfar, I can identify a contact who will give me information and would help me because I want to stop anyone from disrupting trade.",
		source : ["AL:RoD", 11]
	},
	"red plume and mage guild contacts" : {
		description : "I made friends among the Red Plumes and Mage's Guild when I lived at the Hillsfar Gate. They remember me fondly and help me in little ways when they can. I can invoke their assistance in and around Hillsfar to obtain food, simple equipment for temporary use, and to gain access to the low-security areas of their garrisons, halls, and encampments.",
		source : ["AL:RoD", 6]
	},
	"secret identity" : {
		description : "I have created a secret identity that I use to conceal my true race and that offers a covering explanation for my presence in Hillsfar. In addition, I can forge documents, including official papers and personal letters, as long as I have seen an example of the kind of document or the handwriting I am trying to copy.",
		source : ["AL:RoD", 9]
	},
	"secret passage" : {
		description : "I can call on my smuggler contacts to secure secret passage into or out of Hillsfar for myself and my friends, no questions asked, and no Red Plume entanglements. Because I'm calling in a favor, I can't be certain when or if they can help. In return for passage, my companions and I may owe the Rouges Guild a favor and/or may have to pay bribes.",
		source : ["AL:RoD", 8]
	},
	"secret society" : {
		description : "I have a special way of communicating with others who feel the same way I do about the Shade. When I enter a village or larger city, I can identify a contact who will give me information on those that would hinder my goals and those would help me simply because of my desire to see the Shade Enclave return in all its glory.",
		source : ["AL:RoD", 10]
	},
	"shelter of the elven clergy" : {
		description : "The clerics of Elventree have vowed to care for the Cormanthor refugees. They will help me when they can, including providing me and my companions with free healing and care at temples, shrines, and other established presences in Elventree. They will also provide me (but only me) with a poor lifestyle.",
		source : ["AL:RoD", 5]
	},
	"trade contact" : {
		description : "My family and I have trade contacts such as caravan masters, sailors, artisans, farmers, and shopkeepers throughout the Moonsea region and all along the Sword Coast. When adventuring in either of those areas, I can use those contacts to get information about the local area or to pass a message to someone in those areas, even across great distance.",
		source : ["AL:RoD", 7]
	},

	//EE background features [Mulmaster]
	"wagonmaster" : {
		description : "I'm used to being in charge. My reputation has me on a short list for critical jobs, allows me to attract two more loyal workers for caravaning, and causes others to look to me for direction. I can identify the most defensible locations for camping. I have a great memory for maps and geography. While travelling, I can always find my cardinal directions.",
		source : ["AL:EE", 2]
	},
	"deep miner" : {
		description : "I am used to navigating the deep places of the earth. I never get lost in caves or mines if I have either seen an accurate map of them or have been through them before. Furthermore, I am able to scrounge fresh water and food for myself and as many as five other people each day if I am in a mine or natural caves.",
		source : ["AL:EE", 3]
	},
	"harborfolk" : {
		description : "I grew up on the docks and waters of Mulmaster Harbor. The harborfolk remember me and still treat me as one of them. They welcome me and my companions. While they might charge me for it, they'll always offer what food and shelter they have; they'll even hide me if the City Watch is after me (but not if the Hawks are).",
		source : ["AL:EE", 4]
	},
	"highborn" : {
		description : "Mulmaster is run by and for its aristoracy. Every other class of citizen in the city defers to me, and even the priesthood, Soldiery, Hawks, and Cloaks treat me with deference. Other aristocrats and nobles accept me in their circles and likely know me or of me. My connections can get me the ear of a Zor or Zora under the right circumstances.",
		source : ["AL:EE", 5]
	},
	"phlan survivor" : {
		description : "Whatever my prior standing I'm now one of the many refugees that came to Mulmaster. I'm able to find refuge with others from Phlan and those who sympathize with my plight. Within Mulmaster this means that I can find a place to sleep, recover, and hide from the watch with either other refugees from Phlan, or the Zhents within the ghettos.",
		source : ["AL:EE", 6]
	},
}