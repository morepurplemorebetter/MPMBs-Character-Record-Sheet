/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Monk, called "Way of Tranquility"
				This is taken from the Monk Monastic Traditions Unearthed Arcana (http://media.wizards.com/2016/dnd/downloads/M_2016_UAMonk1_12_12WKWT.pdf)
	Code by:	SoilentBrad & MorePurpleMoreBetter
	Date:		2016-12-12 (sheet v12.65)
*/

ClassSubList["way of tranquility"] = {
	regExpSearch : /^(?=.*tranquility|tranquil|calm|diplomatic|diplomat)((?=.*(monk|monastic))|((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior))).*$/i,
	subname : "Way of Tranquility",
	ource : ["UA:MMT", 2],
	features : {
		"subclassfeature3" : {
			name : "Path of Tranquility",
			source : ["UA:MMT", 2],
			minlevel : 3,
			description : "\n   " + "I cast Sanctuary on me, no material comp., lasts 8 hours, hostiles must save every hour",
			usages : 1,
			recovery : "1 min",
			action : ["bonus action", ""],
			spellcastingBonus : {
				name : "Way of Tranquility",
				spells : ["sanctuary"],
				selection : ["sanctuary"],
			},
		},
		"subclassfeature3.1" : {
			name : "Healing Hands",
			source : ["UA:MMT", 2],
			minlevel : 3,
			description : "\n   " + "As an action, I use points to heal living creature; or 5 points to cure one poison/disease" + "\n   " + "With Flurry of Blows, I can replace one unarmed strike with a use of this feature",
			usages : [0, 0, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200],
			recovery : "long rest",
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Emissary of Peace",
			source : ["UA:MMT", 2],
			minlevel : 6,
			description : " [Performance or Persuasion prof]" + "\n   " + "I get adv. on Cha checks to calm or counsel peace; not with Deception or Intimidation",
			skillstxt : "\n\n" + toUni("Way of Tranquility") + ": Choose one from Performance or Persuasion.",
			extraname : "Way of Tranquility 11",
			"douse the flames of war" : {
				name : "Douse the Flames of War",
				source : ["UA:MMT", 1],
				description : "\n   " + "As an action, a creature I touch must make a Wisdom save or have no violent impulses" + "\n   " + "If the target is missing any HP it succeeds on the save; The effect lasts for 1 minute" + "\n   " + "During this time, it can't attack or cast spells that deal damage or force a saving throw" + "\n   " + "This effect ends if the target is attacked, takes damage, or is forced to make a saving throw" + "\n   " + "It also ends if the target witnesses any of those things happening to its allies",
				action : ["action", ""]
			},
			changeeval : "if (newClassLvl.monk >= 11 && (What(\"Extra.Notes\") + What(\"Class Features\")).toLowerCase().indexOf(\"douse the flames of war\") === -1) {ClassFeatureOptions([\"monk\", \"subclassfeature6\", \"douse the flames of war\", \"extra\"]);} else if (newClassLvl.monk <= 11 && oldClassLvl.monk >= 11) {ClassFeatureOptions([\"monk\", \"subclassfeature6\", \"douse the flames of war\", \"extra\"], \"remove\");}"
		},
		"subclassfeature17" : {
			name : "Anger of a Gentle Soul",
			source : ["UA:MMT", 2],
			minlevel : 17,
			description : "\n   " + "As a reaction if another I see goes to 0 HP, I get bonus damage until my next turn ends",
			usages : 1,
			recovery : "short rest",
			additional : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "+17", "+18", "+19", "+20"],
			action : ["reaction", ""]
		}
	}
};
ClassList.monk.subclasses[1].push("way of tranquility");

SourceList["UA:MMT"] = {
	name : "Unearthed Arcana: Monk Monastic Traditions", //2016-12-12
	abbreviation : "UA:MMT",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2016/dnd/downloads/M_2016_UAMonk1_12_12WKWT.pdf"
};