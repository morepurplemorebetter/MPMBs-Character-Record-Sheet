/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Ranger, called "Deep Stalker"
				This is taken from the Light, Dark, Underdark! Unearthed Arcana (https://media.wizards.com/2015/downloads/dnd/02_UA_Underdark_Characters.pdf)
	Code by:	MorePurpleMoreBetter
	Date:		2016-08-10 (sheet v12.02)
*/

ClassSubList["deep stalker"] = {
	regExpSearch : /^(?=.*deep)(?=.*stalker).*$/i,
	subname : "Deep Stalker",
	source : ["UA:LDU", 1],
	fullname : "Deep Stalker",
	features : {
		"subclassfeature3" : {
			name : "Underdark Scout",
			source : ["UA:LDU", 1],
			minlevel : 3,
			description : "\n   " + "In the first turn of combat I have +10 ft speed and +1 attack with the Attack action" + "\n   " + "All turns after that, I can take the Hide action as a bonus action at the end of my turn",
			action : ["bonus action", " (Hide at end of turn)"]
		},
		"subclassfeature3.1" : {
			name : "Deep Stalker Magic",
			source : ["UA:LDU", 2],
			minlevel : 3,
			description : "\n   " + "I have 90 ft darkvision and add a spell to my known spells at level 3, 5, 9, 13, and 15" + "\n   " + "These count as ranger spells, but do not count against the number of spells I can know",
			spellcastingExtra : ["disguise self", "rope trick", "glyph of warding", "greater invisibility", "seeming"],
			eval : "RemoveString(\"Vision\", \"Darkvision 60 ft\"); AddString(\"Vision\",\"Darkvision 90 ft\", \"; \");",
			removeeval : "RemoveString(\"Vision\", \"Darkvision 90 ft\");"
		},
		"subclassfeature7" : {
			name : "Iron Mind",
			source : ["UA:LDU", 2],
			minlevel : 7,
			description : "\n   " + "I am proficient with Wisdom saving throws",
			eval : "Checkbox(\"Wis ST Prof\", true, \"Proficiency with Wisdom saving throws was gained from Deep Stalker (Iron Mind)\");",
			removeeval : "Checkbox(\"Wis ST Prof\", false, \"\");",
		},
		"subclassfeature11" : {
			name : "Stalker’s Flurry",
			source : ["UA:LDU", 2],
			minlevel : 11,
			description : "\n   " + "Once during my turn when I miss an attack, I can immediately make an extra attack",
		},
		"subclassfeature15" : {
			name : "Stalker’s Dodge",
			source : ["UA:LDU", 2],
			minlevel : 15,
			description : "\n   " + "As a reaction when I'm attacked without adv., I can impose disadv. on the attack roll",
			action : ["reaction", " (when attacked)"]
		},
	}
};

//make it so that the extra spells from "Deep Stalker Magic" are added to the spells known
ClassSubList["deep stalker"].features["subclassfeature3.1"].spellcastingExtra[100] = "AddToKnown";

ClassList.ranger.subclasses[1].push("deep stalker");

SourceList["UA:LDU"] = {
	name : "Unearthed Arcana: Light, Dark, Underdark!", //2015-11-02
	abbreviation : "UA:LDU",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2015/downloads/dnd/02_UA_Underdark_Characters.pdf"
};


//add the fighting styles from Unearthed Arcana: Light, Dark, Underdark! to the Ranger class
ClassList.ranger.features["fighting style"].choices.push("Close Quarters Shooter");
ClassList.ranger.features["fighting style"]["close quarters shooter"] = {
	name : "Close Quarters Shooting Fighting Style",
	source : ["UA:LDU", 1],
	description : "\n   " + "+1 bonus to attack rolls I make with ranged attacks" + "\n   " + "I don't have disadvantage when making a ranged attack while within 5 ft of a hostile" + "\n   " + "My ranged attacks ignore half and three-quarters cover against targets within 30 ft",
	eval : "this.getField(\"Attack To Hit Bonus Global\").value += 1",
	removeeval : "this.getField(\"Attack To Hit Bonus Global\").value -= 1"
}
ClassList.ranger.features["fighting style"].choices.push("Tunnel Fighter");
ClassList.ranger.features["fighting style"]["tunnel fighter"] = {
	name : "Tunnel Fighting Style",
	source : ["UA:LDU", 1],
	description : "\n   " + "As a bonus action, I enter a defensive stance that lasts until the start of my next turn" + "\n   " + "While in the stance, I can make opportunity attacks without using my reaction" + "\n   " + "While I'm in this defensive stance I gain the following two benefits:" + "\n    - " + "I can make opportunity attacks without using my reaction" + "\n    - " + "I can make a melee attack as a reaction if a hostile moves >5 ft while in my reach",
	action : ["bonus action", ""]
}
ClassList.ranger.features["fighting style"].choices.sort();