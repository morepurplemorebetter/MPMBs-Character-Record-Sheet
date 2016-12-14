/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Warlock, called "The Seeker"
				This is taken from The Faithful Unearthed Arcana (http://media.wizards.com/2016/dnd/downloads/UA Non-Divine Faithful SFG.pdf)
	Code by:	MorePurpleMoreBetter
	Date:		2016-08-31 (sheet v12.07)
*/

ClassSubList["the seeker"] = {
	regExpSearch : /^(?=.*warlock)(?=.*seeker).*$/i,
	subname : "the Seeker",
	source : ["UA:TF", 1],
	spellcastingExtra : ["feather fall", "jump", "levitate", "locate object", "clairvoyance", "sending", "arcane eye", "locate creature", "legend lore", "passwall"],
	features : {
		"subclassfeature1" : {
			name : "Shielding Aurora",
			source : ["UA:TF", 1],
			minlevel : 1,
			description : "\n   " + "As a bonus action, I create a whirling aurora of brilliant energy around me" + "\n   " + "It lasts until the end of my next turn and grants me resistance to all damage" + "\n   " + "Any hostile ending its turn in 10 ft of me get Warlock level + Cha mod radiant damage",
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"pact boon" : {},
		"subclassfeature6" : {
			name : "Astral Refuge",
			source : ["UA:TF", 2],
			minlevel : 6,
			description : "\n   " + "As an action, I can step into an astral refuge, coming back at the end of the turn" + "\n   " + "While in the astral refuge, I can take two actions to cast spells targeting just me",
			action : ["action", ""]
		},
		"subclassfeature10" : {
			name : "Far Wanderer",
			source : ["UA:TF", 2],
			minlevel : 10,
			description : "\n   " + "I no longer need to breathe, and I gain resistance to fire damage and cold damage",
			eval : "AddResistance(\"Fire\", \"Warlock (the Seeker)\"); AddResistance(\"Cold\", \"Warlock (the Seeker)\");",
			removeeval : "RemoveResistance(\"Fire\"); RemoveResistance(\"Cold\");"
		},
		"subclassfeature14" : {
			name : "Astral Sequestration",
			source : ["UA:TF", 2],
			minlevel : 14,
			description : "\n   " + "With a 5 minutes ritual, I can shift myself and ten willing creatures to the Astral Plane" + "\n   " + "While sequestered an Astral Plane, we gain the full benefits of a short rest" + "\n   " + "After this rest, we return to the same space as before, without any time having passed",
			usages : 1,
			recovery : "long rest",
		}
	}
};
ClassList.warlock.subclasses[1].push("the seeker");

//Add the "Pact Boon" feature from the Warlock class, with one addition, to the subclass
var PBfeat = ClassList.warlock.features["pact boon"].toSource();
ClassSubList["the seeker"].features["pact boon"] = eval(PBfeat);
ClassSubList["the seeker"].features["pact boon"].choices.push("Pact of the Star Chain");
ClassSubList["the seeker"].features["pact boon"].choices.sort();
ClassSubList["the seeker"].features["pact boon"]["pact of the star chain"] = {
	name : "Pact of the Star Chain",
	source : ["UA:TF", 1],
	description : "\n   " + "My patron grants me an item of power which disappears when I die" + "\n   " + "While it is on my person, I can cast Augury as a ritual (PHB 215)" + "\n   " + "Additionally, once per short rest, I can get advantage on an Intelligence check" + "\n   " + "If I lose this item I can perform a 1-hour ceremony to get a replacement",
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : {
		name : "Pact of the Star Chain",
		spells : ["augury"],
		selection : ["augury"],
		firstCol : "R",
	},
};

SourceList["UA:TF"] = {
	name : "Unearthed Arcana: The Faithful", //2016-08-01
	abbreviation : "UA:TF",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2015/downloads/dnd/02_UA_Underdark_Characters.pdf"
};