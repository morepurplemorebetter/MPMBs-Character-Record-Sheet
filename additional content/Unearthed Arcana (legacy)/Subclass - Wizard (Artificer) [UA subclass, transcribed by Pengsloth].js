/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
 */

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Wizard, called "Tradition of the Artificer"
	This is taken from the Eberron Unearthed Arcana (http://media.wizards.com/2015/downloads/dnd/UA_Eberron_v1.pdf)
	Code by:	Pengsloth
	Date:		2016-05-24 (sheet v11.38)
 */

ClassSubList["artificer"] = {
	regExpSearch : /(artificer|infuser)/i,
	subname : "Tradition of the Artificer",
	source : ["UA:E", 3],
	fullname : "Artificer",
	features : {
		"subclassfeature2" : {
			name : "Infuse Potions",
			source : ["UA:E", 3],
			minlevel : 2,
			description : "\n   " + "I can produce magic potions if I spend 10 minutes and expend a spell slot" + "\n   " + "I can not regain the spell slot until the potion is consumed or a week has passed",
			additional : ["", "3 potions", "3 potions", "3 potions", "3 potions", "3 potions", "3 potions", "3 potions", "3 potions", "4 potions", "4 potions", "4 potions", "4 potions", "4 potions", "4 potions", "4 potions", "4 potions", "4 potions", "4 potions", "4 potions"]
		},
		"subclassfeature2.1" : {
			name : "Infuse Scrolls",
			source : ["UA:E", 4],
			minlevel : 2,
			description : "\n   " + "I can produce a scroll after a short rest if I spend 10 minutes and my Arcane Recovery" + "\n   " + "I subtract the spell's level from the levels worth of slots I regain using Arcane Recovery" + "\n   " + "This reduction applies till the scroll is used and I finish a long rest",
			additional : ["", "1 scroll", "1 scroll", "1 scroll", "1 scroll", "1 scroll", "1 scroll", "1 scroll", "1 scroll", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls", "2 scrolls"],
		},
		"subclassfeature6" : {
			name : "Infuse Weapons and Armor",
			source : ["UA:E", 4],
			minlevel : 6,
			description : "\n   " + "I can spend 10 minutes to produce a magic weapon, armor, a shield, or ammunition" + "\n   " + "The item retains its magic for 8 hours and the spell slot I expend is:" + "\n   " + "2nd: +1 ammunition (20 pieces), 3rd: +1 weapon or +1 shield, 4th: +1 armor," + "\n   " + "5th: +2 weapon or +2 ammunition (20 pieces), 6th: +3 armor.",
			additional : ["", "", "", "", "", "1 weapon or armor", "1 weapon or armor", "1 weapon or armor", "1 weapon or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor", "2 weapons or armor"]
		},
		"subclassfeature10" : {
			name : "Superior Artificer",
			source : ["UA:E", 4],
			minlevel : 10,
			description : "\n   " + "I can create one additional scroll, potion, weapon, or armor when I use Infuse"
		},
		"subclassfeature14" : {
			name : "Master Artificer",
			source : ["UA:E", 4],
			minlevel : 14,
			description : "\n   " + "I can produce a variety of magic items from Tables A and B from the DMG" + "\n   " + "It takes 1 week for such an item and I cannot do it again for a month",
			usages : 1,
			recovery : "Month"
		}
	}
};
ClassList["wizard"].subclasses[1].push("artificer");

SourceList["UA:E"] = {
	name : "Unearthed Arcana: Eberron", //2015-02-02
	abbreviation : "UA:E",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2015/downloads/dnd/UA_Eberron_v1.1.pdf"
};