/*  -WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*  -INFORMATION-
	Subject:	Subclass
	Effect:	 	This script adds a subclass for the Fighter, called "Knight"
				This is taken from the Fighter Martial Archetypes Unearthed Arcana (http://media.wizards.com/2016/dnd/downloads/2016_Fighter_UA_1205_1.pdf)
	Code by:	MorePurpleMoreBetter
	Date:	  	2016-12-09 (sheet v12.64)
*/

ClassSubList["knight"] = {
	regExpSearch : /knight/i,
	subname : "Knight",
	source : ["UA:FMA", 2],
	fullname : "Knight",
	features : {
		"subclassfeature3" : {
			name : "Born in the Saddle",
			source : ["UA:FMA", 2],
			minlevel : 3,
			description : "\n   " + "Mounting or dismounting a creature costs me only 5 ft of movement" + "\n   " + "I have advantage on saving throws made to avoid falling off my mount" + "\n   " + "If I fall off my mount for less than 10 ft while not incapacitated, I land on my feet",
			save : "Adv. vs. falling off my mount"
		},
		"subclassfeature3.1" : {
			name : "Implacable Mark",
			source : ["UA:FMA", 2],
			minlevel : 3,
			description : "\n   " + "If I hit a creature with a melee weapon attack, I mark it until the end of my next turn" + "\n   " + "A marked target has disadv. on any attacks vs. those that didn't mark it" + "\n   " + "I can attack the target I marked if it is within 5 ft of me and does one of the following:" + "\n	- " + "It moves at least 1 foot on its turn" + "\n	- " + "It makes an attack that it suffers disadv. on from being marked" + "\n   " + "This attack uses my reaction, has adv., and adds my fighter level as extra damage" + "\n   " + "I can still do this if I already used my reaction this round, but not this turn",
			recovery : "short rest",
			usages : 3,
			additional : ["", "", "+3 damage", "+4 damage", "+5 damage", "+6 damage", "+7 damage", "+8 damage", "+9 damage", "+10 damage", "+11 damage", "+12 damage", "+13 damage", "+14 damage", "+15 damage", "+16 damage", "+17 damage", "+18 damage", "+19 damage", "+20 damage"],
			action : ["reaction", ""]
		},
		"subclassfeature7" : {
			name : "Noble Cavalry",
			source : ["UA:FMA", 2],
			minlevel : 7,
			description : "\n   " + "I gain proficiency with two skills or one language" + "\n   " + "I can choose the skills from: Animal Handling, History, Insight, Persuasion, and Religion",
			skillstxt : "\n\n" + toUni("Knight") + ": Choose two from Animal Handling, History, Insight, Persuasion, and Religion. Alternatively, I learn one language.",
			eval : "AddLanguage(\"+1 from Noble Cavalry\", \"being a Knight (Noble Cavalry) and not opting to learn two skill proficiencies.\");",
			removeeval : "RemoveLanguage(\"+1 from Noble Cavalry\", \"being a Knight (Noble Cavalry) and not opting to learn two skill proficiencies.\");"
		},
		"subclassfeature10" : {
			name : "Hold the Line",
			source : ["UA:FMA", 2],
			minlevel : 10,
			description : "\n   " + "As a reaction when a creature within 5 ft of me moves at least 1 ft, I can attack it" + "\n   " + "This attack is made with a melee weapon attack and deals extra damage on a hit" + "\n   " + "If this hits, the attack reduces the target's speed to 0 until the end of this turn",
			additional : ["", "", "", "", "", "", "", "", "", "+5 damage", "+5 damage", "+6 damage", "+6 damage", "+7 damage", "+7 damage", "+8 damage", "+8 damage", "+9 damage", "+9 damage", "+10 damage"],
			action : ["reaction", ""]
		},
		"subclassfeature15" : {
			name : "Rapid Strike",
			source : ["UA:FMA", 3],
			minlevel : 15,
			description : "\n   " + "If I have adv. on an attack, I can forgo it to make an extra attack as a bonus action" + "\n   " + "This attack has to be with the same weapon against the same target",
			action : ["bonus action", ""]
		},
		"subclassfeature18" : {
			name : "Defender's Blade",
			source : ["UA:FMA", 3],
			minlevel : 18,
			description : "\n   " + "I can do opportunity attacks if I already used my reaction this round, but not this turn" + "\n   " + "I gain +1 bonus to AC when I'm wearing heavy armor",
			eval : "AddACMisc(1, \"Defender's Blade\", \"When wearing heavy armor, the class feature Defender's Blade gives a +1 bonus to AC\")",
			removeeval : "AddACMisc(0, \"Defender's Blade\", \"When wearing heavy armor, the class feature Defender's Blade gives a +1 bonus to AC\")",
		},
	}
};
ClassList.fighter.subclasses[1].push("knight");

ClassList.fighter.regExpSearch = /^(?!.*(dark|green|fey|horned|totem|spiritual|exalted|sacred|holy|divine|nature|odin|thor|nature|natural))(?=.*(fighter|warrior|militant|warlord|phalanx|gladiator|trooper)).*$/i;

SourceList["UA:FMA"] = {
	name : "Unearthed Arcana: Fighter Martial Archetypes", //2016-12-05
	abbreviation : "UA:FMA",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2016/dnd/downloads/2016_Fighter_UA_1205_1.pdf"
};