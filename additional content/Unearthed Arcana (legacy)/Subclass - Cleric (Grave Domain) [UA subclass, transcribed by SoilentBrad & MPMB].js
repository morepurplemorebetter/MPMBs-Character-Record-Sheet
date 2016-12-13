/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Cleric, called "Grave Domain"
				This is taken from the Cleric: Divine Domains Unearthed Arcana (http://media.wizards.com/2016/dnd/downloads/UA_Cleric.pdf)
	Code by:	SoilentBrad & MorePurpleMoreBetter
	Date:		2016-11-30 (sheet v12.62)
*/

ClassSubList["grave domain"] = {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(grave)).*$/i,
	subname : "Grave Domain",
	source : ["UA:CDD", 2],
	spellcastingExtra : ["bane", "false life", "gentle repose", "ray of enfeeblement", "revivify", "vampiric touch", "blight", "death ward", "antilife shell", "raise dead"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiency",
			source : ["UA:CDD", 2],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with heavy armor",
			armor : [false, false, true, false],
		},
		"subclassfeature1.1" : {
			name : "Circle of Mortality",
			source : ["UA:CDD", 2],
			minlevel : 1,
			action : ["bonus action", ""],
			description : "\n   " + "Spells I cast to heal a living creature at 0 HP have their dice count as their max result" + "\n   " + "As a bonus action, I can cast the Spare the Dying cantrip, if I know it",
		},
		"subclassfeature1.2" : {
			name : "Eyes of the Grave",
			source : ["UA:CDD", 2],
			minlevel : 1,
			usages : 1,
			recovery : "long rest",
			description : "\n   " + "By spending 1 min in uninterrupted contemplation, I sense undead within 1 mile" + "\n   " + "I learn their number, distance, and direction from me" + "\n   " + "In addition, I know the creature type of the one with the highest CR",
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Path to the Grave",
			source : ["UA:CDD", 2],
			minlevel : 2,
			action : ["action", ""],
			description : "\n   " + "As an action, I can touch a creature to make it take extra damage from one attack" + "\n   " + "It is vulnerable to all the damage from the next spell or attack from me or an ally" + "\n   " + "This only applies to the first time that source inflicts damage, and then ends" + "\n   " + "If the creature has resistance or is immune to the damage, it instead loses it",
		},
		"subclassfeature6" : {
			name : "Sentinel at Death's Door",
			source : ["UA:CDD", 2],
			minlevel : 6,
			usages : 1,
			recovery : "short rest",
			action : ["reaction", ""],
			description : "\n   " + "As a reaction, I turn a critical hit to me or an ally I see within 30 ft to a normal hit",
		},
		"subclassfeature8" : {
			name : "Divine Strike",
			source : ["UA:CDD", 2],
			minlevel : 8,
			description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
			additional : ["", "", "", "", "", "", "", "+1d8 necrotic damage", "+1d8 necrotic damage", "+1d8 necrotic damage", "+1d8 necrotic damage", "+1d8 necrotic damage", "+1d8 necrotic damage", "+2d8 necrotic damage", "+2d8 necrotic damage", "+2d8 necrotic damage", "+2d8 necrotic damage", "+2d8 necrotic damage", "+2d8 necrotic damage", "+2d8 necrotic damage"],
		},
		"subclassfeature17" : {
			name : "Keeper of Souls",
			source : ["UA:CDD", 2],
			minlevel : 17,
			description : "\n   " + "Once per round, if I'm not incapacitated, I can manipulate the energy of the dying" + "\n   " + "When an enemy I can see dies within 30 ft of me, I or an ally within 30 ft regain HP" + "\n   " + "The HP regained is equal to the enemy’s number of Hit Dice",
		},
	},
};
ClassList["cleric"].subclasses[1].push("grave domain");

SourceList["UA:CDD"] = {
	name : "Unearthed Arcana: Cleric: Divine Domains", //2016-11-21
	abbreviation : "UA:CDD",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2016/dnd/downloads/UA_Cleric.pdf"
};