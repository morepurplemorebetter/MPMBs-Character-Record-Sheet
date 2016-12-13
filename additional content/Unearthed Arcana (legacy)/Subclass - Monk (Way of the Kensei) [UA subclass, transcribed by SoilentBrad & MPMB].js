/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Monk, called "Way of the Kensei"
				This is taken from the Monk Monastic Traditions Unearthed Arcana (http://media.wizards.com/2016/dnd/downloads/M_2016_UAMonk1_12_12WKWT.pdf)
	Code by:	SoilentBrad & MorePurpleMoreBetter
	Date:		2016-12-12 (sheet v12.65)
*/

ClassSubList["way of the kensei"] = {
	regExpSearch : /^(?=.*kensei)((?=.*(monk|monastic))|((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior))).*$/i,
	subname : "Way of the Kensei",
	source : ["UA:MMT", 1],
	features : {
		"subclassfeature3" : {
			name : "Path of the Kensei",
			source : ["UA:MMT", 1],
			minlevel : 3,
			description : " [3 martial weapons proficiencies]" + "\n   " + "Martial weapons I am proficient with count as kensei weapons for me" + "\n   " + "With these, I can use Dex instead of Str and use the Martial Arts damage die" + "\n   " + "As a bonus action, my kensei weapon deal +1d4 bludg. damage for an Attack action",
			action: ["bonus action", " (after hit)"],
			extraname : "Way of the Kensei 3",
			"kensei defense" : {
				name : "Kensei Defense",
				source : ["UA:MMT", 1],
				description : "\n   " + "If I make an unarmed strike with an Attack action, I can use my kensei weapon to defend" + "\n   " + "Until the start of my next turn, if I'm not incapacitated, I gain +2 AC while holding it"
			},
			eval : "ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"kensei defense\", \"extra\"]);",
			removeeval : "ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"kensei defense\", \"extra\"], \"remove\");"
		},
		"ki-empowered strikes" : {
			name : "One with the Blade",
			source : ["UA:MMT", 1],
			minlevel : 6,
			description : "\n   " + "My unarmed strikes and kensei weapon attacks count as magical" + "\n   " + "As a bonus action, once per short rest, I can mark one creature I can see within 30 ft" + "\n   " + "This turn, I double my proficiency bonus on my next weapon attack against the mark",
			usages : 1,
			recovery : "short rest",
			additional : "Mark",
			action : ["bonus action", " (mark)"]
		},
		"subclassfeature17" : {
			name : "Unerring Accuracy",
			source : ["UA:MMT", 1],
			minlevel : 17,
			description : "\n   " + "On each of my turns, I can reroll one weapon attack roll I make that misses",
			extraname : "Way of the Kensei 11",
			"sharpen the blade" : {
				name : "Sharpen the Blade",
				source : ["UA:MMT", 1],
				description : " [1 to 3 ki points]" + "\n   " + "As a bonus action, I can grant my weapon a bonus to attack and damage rolls" + "\n   " + "This bonus is equal to the number of ki points I spend; It lasts for 1 minute",
				action : ["bonus action", ""]
			},
			changeeval : "if (newClassLvl.monk >= 11 && (What(\"Extra.Notes\") + What(\"Class Features\")).toLowerCase().indexOf(\"sharpen the blade\") === -1) {ClassFeatureOptions([\"monk\", \"subclassfeature17\", \"sharpen the blade\", \"extra\"])} else if (newClassLvl.monk <= 11 && oldClassLvl.monk >= 11) {ClassFeatureOptions([\"monk\", \"subclassfeature17\", \"sharpen the blade\", \"extra\"], \"remove\")}"
		}
	}
};
ClassList.monk.subclasses[1].push("way of the kensei");

SourceList["UA:MMT"] = {
	name : "Unearthed Arcana: Monk Monastic Traditions", //2016-12-12
	abbreviation : "UA:MMT",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2016/dnd/downloads/M_2016_UAMonk1_12_12WKWT.pdf"
};