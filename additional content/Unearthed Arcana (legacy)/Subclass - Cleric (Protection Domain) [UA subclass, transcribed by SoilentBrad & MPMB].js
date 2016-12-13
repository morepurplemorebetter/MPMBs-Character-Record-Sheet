/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Cleric, called "Protection Domain"
				This is taken from the Cleric: Divine Domains Unearthed Arcana (http://media.wizards.com/2016/dnd/downloads/UA_Cleric.pdf)
	Code by:	SoilentBrad & MorePurpleMoreBetter
	Date:		2016-11-30 (sheet v12.62)
*/

ClassSubList["protection domain"] = {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(protection|protect|defend|defense)).*$/i,
	subname : "Protection Domain",
	source : ["UA:CDD", 3],
	spellcastingExtra : ["compelled duel", "protection from evil and good", "aid", "protection from poison", "protection from energy", "slow", "guardian of faith", "otiluke's resilient sphere", "antilife shell", "wall of force"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiency",
			source : ["UA:CDD", 3],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with heavy armor",
			armor : [false, false, true, false],
		},
		"subclassfeature1.1" : {
			name : "Shield of the Faithful",
			source : ["UA:CDD", 3],
			minlevel : 1,
			action : ["reaction", ""],
			description : "\n   " + "As a reaction, when someone within 5 ft of me is attacked, I impose disadv. on the roll" + "\n   " + "To do this, I must be able to see both the attacker and the target",
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Radiant Defense",
			source : ["UA:CDD", 3],
			minlevel : 2,
			action : ["action", ""],
			description : "\n   " + "As an action, I channel blessed energy into an ally that I can see within 30 ft of me" + "\n   " + "The first time the ally is hit within the next minute, the attacker takes radiant damage",
			additional : ["", "2d10+2", "2d10+3", "2d10+4", "2d10+5", "2d10+6", "2d10+7", "2d10+8", "2d10+9", "2d10+10", "2d10+11", "2d10+12", "2d10+13", "2d10+14", "2d10+15", "2d10+16", "2d10+17", "2d10+18", "2d10+19", "2d10+20"]
		},
		"subclassfeature6" : {
			name : "Blessed Healer",
			source : ["UA:CDD", 3],
			minlevel : 6,
			description : "\n   " + "When I cast a spell to heal another using a spell slot, I heal 2 + the spell’s level as well",
		},
		"subclassfeature8" : {
			name : "Divine Strike",
			source : ["UA:CDD", 3],
			minlevel : 8,
			description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
			additional : ["", "", "", "", "", "", "", "+1d8 radiant damage", "+1d8 radiant damage", "+1d8 radiant damage", "+1d8 radiant damage", "+1d8 radiant damage", "+1d8 radiant damage", "+2d8 radiant damage", "+2d8 radiant damage", "+2d8 radiant damage", "+2d8 radiant damage", "+2d8 radiant damage", "+2d8 radiant damage", "+2d8 radiant damage"],
		},
		"subclassfeature17" : {
			name : "Indomitable Defense",
			source : ["UA:CDD", 3],
			minlevel : 17,
			usages : 1,
			recovery : "short rest",
			action : ["action", " (transfer)"],
			description : "\n   " + "I gain resistance to two of: bludgeoning, necrotic, piercing, radiant, or slashing damage" + "\n   " + "Whenever I finish a short or long rest, I can change the damage types chosen" + "\n   " + "As an action, I can transfer both resistances to one creature I touch" + "\n   " + "As a bonus action, I can transfer the resistances back to myself" + "\n   " + "Otherwise, the creature keeps this resistance until the end of my next short or long rest",
			eval : "AddAction(\"bonus action\", \"Indomitable Defense (return)\", \"Cleric (Protection Domain)\");",
			removeeval : "RemoveAction(\"bonus action\", \"Indomitable Defense (return)\", \"Cleric (Protection Domain)\");",
		},
	},
};
ClassList["cleric"].subclasses[1].push("protection domain");

SourceList["UA:CDD"] = {
	name : "Unearthed Arcana: Cleric: Divine Domains", //2016-11-21
	abbreviation : "UA:CDD",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2016/dnd/downloads/UA_Cleric.pdf"
};