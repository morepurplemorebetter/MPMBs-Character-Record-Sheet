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
				This is taken from The Faithful Unearthed Arcana (https://media.wizards.com/2015/downloads/dnd/02_UA_Underdark_Characters.pdf)
	Code by:	MorePurpleMoreBetter
	Date:		2016-08-31 (sheet v12.07)
*/

ClassSubList["seeker"] = {
	regExpSearch : /^(?=.*warlock)(?=.*seeker).*$/i,
	subname : "the Seeker",
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
		"pact boon" : {
			name : "Pact Boon",
			source : ["P", 107],
			minlevel : 3,
			description : "\n   " + "Choose a Pact Boon using the \"Choose Feature\" button above",
			choices : ["Pact of the Blade", "Pact of the Chain", "Pact of Star Chain", "Pact of the Tome"],
			"pact of the blade" : {
				name : "Pact of the Blade",
				source : ["P", 107],
				description : "\n   " + "As an action, I can create a pact weapon in my empty hand; I'm proficient in its use" + "\n   " + "I can choose the type of melee weapon every time I create it, and it has those statistics" + "\n   " + "The weapon disappears if it is more than 5 ft away from me for 1 minute" + "\n   " + "The weapon counts as magical; I can transform a magic weapon into my pact weapon" + "\n   " + "This occurs over an hour-long ritual that I can perform during a short rest" + "\n   " + "I can use an action to re-summon it in any form and can dismiss it as no action",
				action : ["action", ""]
			},
			"pact of the chain" : {
				name : "Pact of the Chain",
				source : ["P", 107],
				description : "\n   " + "I can cast Find Familiar as a ritual (PHB 240); Also Imp/Pseudodragon/Quasit/Sprite" + "\n   " + "When taking the attack action, I can forgo 1 attack to have my familiar attack instead" + "\n   " + "It makes this 1 attack by using its reaction",
			},
			"pact of the tome" : {
				name : "Pact of the Tome",
				source : ["P", 108],
				description : "\n   " + "I have a Book of Shadows with any three cantrips of my choosing" + "\n   " + "I can cast these cantrips as long as I have the book on my person" + "\n   " + "Regardless of the lists they come from, these count as warlock cantrips to me" + "\n   " + "I can get a replacement book with a 1-hour ceremony during a short or long rest",
				spellcastingBonus : {
					name : "Pact of the Tome",
					class : "any",
					level : [0, 0],
					times : 3,
				},
			},
			"pact of the star chain" : {
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
			}
		},
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
}

ClassList.warlock.subclasses[1].push("seeker");

SourceList["UA:TF"] = {name : "Unearthed Arcana: The Faithful", abbreviation : "UA:TF"};