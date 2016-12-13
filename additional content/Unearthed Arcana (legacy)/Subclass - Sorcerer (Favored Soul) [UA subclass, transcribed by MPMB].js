/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Sorcerer, called "Favored Soul"
				This is taken from the Modifying Classes Unearthed Arcana (http://dnd.wizards.com/articles/features/modifying-classes) (PDF at: http://media.wizards.com/2015/downloads/dnd/UA3_ClassDesignVariants.pdf)
	Code by:	MorePurpleMoreBetter
	Date:		2016-08-10 (sheet v12.02)
*/

ClassSubList["favored soul"] = {
	regExpSearch : /^(?=.*favou?red)(?=.*soul).*$/i,
	subname : "Favored Soul",
	source : ["UA:MC", 8],
	fullname : "Favored Soul",
	attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiencies",
			source : ["UA:MC", 9],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with light armor, medium armor, shields, and simple weapons",
			armor : [true, true, false, true],
			weapons : [true, false],
		},
		"subclassfeature1.1" : {
			name : "Chosen of the Gods",
			source : ["UA:MC", 8],
			minlevel : 1,
			description : "\n   " + "Choose a Cleric Domain using the \"Choose Feature\" button above" + "\n   " + "I add the chosen domain's spells to my known spells, when they are of a level I can cast" + "\n   " + "These count as sorcerer spells, but do not count against the number of spells I can know",
			choices : [],
		},
		"subclassfeature14" : {
			name : "Divine Wings",
			source : ["UA:MC", 8],
			minlevel : 14,
			description : "\n   " + "As a bonus action, unless armor is in the way, I can sprout dragon wings from my back" + "\n   " + "I gain a fly speed equal to my current speed until I dismiss the wings as a bonus action",
			action : ["bonus action", " (start/stop)"]
		},
		"subclassfeature18" : {
			name : "Power of the Chosen",
			source : ["UA:MC", 8],
			minlevel : 18,
			description : "\n   " + "When I cast a spell I gained from the Chosen of the Gods class feature, I heal myself" + "\n   " + "I regain a number of HP equal to my Charisma modifier (minimum 1) + the spell's level",
		}
	}
};
ClassList.sorcerer.subclasses[1].push("favored soul");

//add all cleric domain spells to the options of the first level ability "Chosen of the Gods"
var FSfeat = ClassSubList["favored soul"].features["subclassfeature1.1"];
for (var i = 0; i < ClassList.cleric.subclasses[1].length; i++) {
	var aDomain = ClassList.cleric.subclasses[1][i];
	if (ClassSubList[aDomain] && ClassSubList[aDomain].spellcastingExtra) {
		var cDomain = ClassSubList[aDomain];
		var eSpells = cDomain.spellcastingExtra;
		eSpells[100] = "AddToKnown";
		FSfeat.choices.push(cDomain.subname);
		FSfeat[cDomain.subname.toLowerCase()] = {
			name : "Chosen of the Gods: " + cDomain.subname,
			source : cDomain.features["subclassfeature1"].source,
			spellcastingExtra : eSpells,
			description : "\n   " + "I add the " + cDomain.subname.toLowerCase() + " spells to my known spells, if they are of a level I can cast" + "\n   " + "These count as sorcerer spells, but do not count against the number of spells I can know",
		}
	}
};

SourceList["UA:MC"] = {
	name : "Unearthed Arcana: Modifying Classes", //2015-04-06
	abbreviation : "UA:MC",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2015/downloads/dnd/UA3_ClassDesignVariants.pdf"
};