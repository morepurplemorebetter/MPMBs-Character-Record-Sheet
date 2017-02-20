/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Paladin, called "Oath of the Unyielding"
				This is made by BoltNine Homebrew (https://drive.google.com/drive/folders/0B2UyuHLUuCjxRmlXWExXTGR1eTA)
	Code by:	Howard
	Date:		2017-01-06 (sheet v12.8)
*/

ClassSubList["unyielding"] = {
	regExpSearch : /^(?=.*unyielding)(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper))))).*$/i,
	subname : "Oath of the Unyielding",
	source : ["IB:OotU", 1],
	spellcastingExtra : ["false life", "shield", "enhance ability", "phantasmal force", "protection from energy", "revivify", "guardian of faith", "freedom of movement", "wall of force", "mass cure wounds"],
	features : {
		"subclassfeature3" : {
			name : "Channel Divinity: Immovable",
			source : ["IB:OotU", 1],
			minlevel : 3,
			description : "\n   " + "As an action, I can make myself an impenetrable wall" + "\n   " + "For 1 minute, I can take one extra reaction each round" + "\n   " + "In addition, any enemy I hit must make a Str save or be knocked prone and back 5 ft",
			action : ["action", ""]
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Hold the Weaks",
			source : ["IB:OotU", 1],
			minlevel : 3,
			description : "\n   " + "As an action, I can make every enemy within 15 ft of me make a Wisdom saving throw" + "\n   " + "If failed, the enemy can't move on their turn, until the beginning of my next turn",
			action : ["action", ""]
		},
		"subclassfeature7" : {
			name : "Aura of Unyielding",
			source : ["IB:OotU", 1],
			minlevel : 7,
			description : "\n   " + "Allies within range and I have adv. on saves against being moved while I am conscious",
			additional : ["", "", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
			save : "Adv. vs. effects that move me"
		},
		"subclassfeature15" : {
			name : "Unbending",
			source : ["IB:OotU", 1],
			minlevel : 15,
			description : "\n   " + "I gain proficiency in the Persuasion and Intimidation skills" + "\n   " + "If I already have proficiency in either of these, then I gain expertise in that skill instead",
			skills : ["Persuasion", "Intimidation"],
			skillstxt : "\n\n" + toUni("Oath of the Unyielding") + ": Persuasion and Intimidation. If already proficient with either, gain expertise in that skill instead.",
		},
		"subclassfeature20" : {
			name : "Bastion of Defense",
			source : ["IB:OotU", 1],
			minlevel : 20,
			description : "\n   " + "Once per long rest when my HP drops to 0, I gain the following benefits for 1 minute:" + "\n    - " + "I gain temporary HP equal to one quarter of my maximum HP, rounded down" + "\n    - " + "Attacks against me are made at disadvantage" + "\n    - " + "I have advantage on saving throws against spells that deal damage" + "\n   " + "This ends after 1 minute or when my HP reaches 0 again, whichever comes first",
			recovery : "long rest",
			usages : 1
		}
	}
};
ClassList["paladin"].subclasses[1].push("unyielding");

SourceList["IB:OotU"] = {
	name : "BoltNine Homebrew: Oath of the Unyielding",
	abbreviation : "BN:OotU",
	group : "BoltNine",
	url : "https://drive.google.com/drive/folders/0B2UyuHLUuCjxRmlXWExXTGR1eTA"
};