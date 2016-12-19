/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Paladin, called "Oath of Treachery"
				This is taken from the Paladin Sacred Oaths Unearthed Arcana (http://media.wizards.com/2016/dnd/downloads/UAPaladin_SO_20161219_1.pdf)
	Code by:	MorePurpleMoreBetter
	Date:		2016-12-19 (sheet v12.78)
*/

ClassSubList["oath of treachery"] = {
	regExpSearch : /^((?=.*blackguard)|(((?=.*(treachery|tyranny|tyrant))(?=.*paladin))|((?=.*(profane|unholy))(?=.*(knight|fighter|warrior|warlord|trooper))))).*$/i,
	subname : "Oath of Treachery",
	source : ["UA:PSO", 2],
	spellcastingExtra : ["charm person", "expeditious retreat", "invisibility", "mirror image", "gaseous form", "haste", "confusion", "greater invisibility", "dominate person", "passwall"],
	features : {
		"subclassfeature3" : {
			name : "Channel Divinity: Conjure Duplicate",
			source : ["UA:PSO", 2],
			minlevel : 3,
			description : "\n   " + "As an action, I create 1 illusory duplicate of myself within 30 ft of me for 1 min (conc)" + "\n   " + "As a bonus action, I can move it up to 30 ft to a space I can see within 120 ft of me" + "\n   " + "I can cast spells as though I was in its space, but still have to use my own senses" + "\n   " + "I have advantage on attacks if the target is within 5 ft of the duplicate and me",
			action : ["action", ""],
			eval : "AddAction(\"bonus action\", \"Move Duplicate\", \"Paladin (Oath of Treachery) - Channel Divinity: Conjure Duplicate\")",
			removeeval : "RemoveAction(\"bonus action\", \"Move Duplicate\")"
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Poison Strike",
			source : ["UA:PSO", 2],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I imbue one weapon or piece of ammunition with poison upon touch" + "\n   " + "This poison lasts for 1 minute and will affect the next time I hit a target with it" + "\n   " + "The target takes 2d10 + my paladin level poison damage immediately after the hit" + "\n   " + "You automatically roll 20 on the 2d10 if you had advantage on the attack roll",
			action : ["bonus action", ""],
			additional : ["", "", "2d10+3 damage", "2d10+4 damage", "2d10+5 damage", "2d10+6 damage", "2d10+7 damage", "2d10+8 damage", "2d10+9 damage", "2d10+10 damage", "2d10+11 damage", "2d10+12 damage", "2d10+13 damage", "2d10+14 damage", "2d10+15 damage", "2d10+16 damage", "2d10+17 damage", "2d10+18 damage", "2d10+19 damage", "2d10+20 damage"]
		},
		"subclassfeature7" : {
			name : "Cull the Herd",
			source : ["UA:PSO", 3],
			minlevel : 7,
			description : "\n   " + "I have adv. on melee attacks against creatures that have an ally of it within 5 ft of it"
		},
		"subclassfeature7.1" : {
			name : "Treacherous Strike",
			source : ["UA:PSO", 3],
			minlevel : 7,
			description : "\n   " + "As a reaction when a creature within 5 ft misses me, I can redirect the attack" + "\n   " + "If it can be charmed, it rerolls the attack on a target of my choice within 5 ft of it",
			recovery : "short rest",
			usages : 3,
			action : ["reaction", ""]
		},
		"subclassfeature15" : {
			name : "Blackguard's Escape",
			source : ["UA:PSO", 3],
			minlevel : 15,
			description : "\n   " + "As a reaction after I am hit by an attack, I can teleport up to 60 ft to a spot I can see" + "\n   " + "In doing this, I also become invisible (as the spell) until the end of my next turn",
			recovery : "short rest",
			usages : 1,
			action : ["reaction", ""],
			changeeval : "if (newClassLvl.paladin >= 20 && (What(\"Extra.Notes\") + What(\"Class Features\")).toLowerCase().indexOf(\"icon of deceit\") === -1) {ClassFeatureOptions([\"paladin\", \"subclassfeature15\", \"icon of deceit\", \"extra\"])} else if (newClassLvl.paladin < 20 && oldClassLvl.paladin >= 20) {ClassFeatureOptions([\"paladin\", \"subclassfeature15\", \"icon of deceit\", \"extra\"], \"remove\")};",
			extraname : "Oath of Treachery 20",
			"icon of deceit" : {
				name : "Icon of Deceit",
				source : ["UA:PSO", 3],
				description : "\n   " + "As an action, I can gain the following benefits for 1 minute:" + "\n    - " + "I become invisible" + "\n    - " + "If I have adv. on an attack, I do 20 extra damage with it if it hits" + "\n    - " + "If a creature hits me on its turn, it must make a Wis save or I control its next action" + "\n       " + "Provided it can be charmed and I am not incapacitated when it takes the action",
				recovery : "long rest",
				usages : 1,
				action : ["action", ""]
			}
		}
	}
};
ClassList.paladin.subclasses[1].push("oath of treachery");

SourceList["UA:PSO"] = {
	name : "Unearthed Arcana: Paladin Sacred Oaths", //2016-12-19
	abbreviation : "UA:PSO",	
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2016/dnd/downloads/UAPaladin_SO_20161219_1.pdf"
};