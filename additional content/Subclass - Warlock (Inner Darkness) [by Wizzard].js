/*  -WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*  -INFORMATION-
	Subject:	Subclass
	Effect:	 	This script adds a subclass for the Warlock, called "Inner Darkness"
				This subclass is made by Wizzard
	Code by:	Wizzard
	Date:		2016-11-11 (sheet v12.54)
*/

ClassSubList["inner darkness"] = {
	regExpSearch : /^(?=.*warlock)((?=.*slasher)|(?=.*inner)(?=.*darkness)).*$/i,
	subname : "Inner Darkness",
	source : ["HB", 0],
	spellcastingExtra : ["dissonant whispers", "find familiar", "spike growth", "call lightning", "phantom steed", "faithful hound", "raise dead"],
	features : {
		"subclassfeature1" : {
			name : "Prey Sense",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "I can cast Hunter's Mark on a creature that I have dealt damage to in the past day" + "\n   " + "The spell is cast as if using my highest level warlock spell slot, but does not expend any" + "\n   " + "I can do this a number of times equal to my Charisma modifier (min 1) per long rest",
			usages : "Cha mod per ",
			additional : ["as 1st-level spell", "as 1st-level spell", "as 2nd-level spell", "as 2nd-level spell", "as 3rd-level spell", "as 3rd-level spell", "as 4th-level spell", "as 4th-level spell", "as 5th-level spell", "as 5th-level spell", "as 5th-level spell", "as 5th-level spell", "as 5th-level spell", "as 5th-level spell", "as 5th-level spell", "as 5th-level spell", "as 5th-level spell", "as 5th-level spell", "as 5th-level spell", "as 5th-level spell"],
			usagescalc : "event.value = Math.max(1, this.getField(\"Cha Mod\").value);",
			recovery : "long rest",
			action : ["bonus action", ""],
			spellcastingBonus : {
				name : "Prey Sense (Hunter's Mark)",
				spells : ["hunter's mark"],
				selection : ["hunter's mark"],
			},
		},
		"subclassfeature1.1" : {
			name : "Signature Weapon",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "I gain proficiency in a weapon of my choice that does not have the “heavy” property" + "\n   " + "While wielding this weapon and nothing else I may use Cha for to hit and damage rolls" + "\n   " + "My signature weapon counts as magical for the purpose of overcoming resistances" + "\n   " + "I may use my signature weapon as a spellcasting focus",
		},
		"subclassfeature6" : {
			name : "Relentless",
			source : ["HB", 0],
			minlevel : 6,
			description : "\n   " + "I gain resistance to nonmagical Bludgeoning, Slashing and Piercing damage" + "\n   " + "I do not need to eat or breathe, but I can ingest food and drink if I wish" + "\n   " + "Instead of sleeping, I appear dead (as if affected by Feign Death)" + "\n   " + "I do not dream in this state and I am fully aware of my surroundings" + "\n   " + "If an attack reduces me to 0 HP, I may instead use a spell slot to be prone, at 1 HP" + "\n   " + "I appear dead (as Feign Death) which persists until I choose to move or take any action" + "\n   " + "While under this effect I do not suffer any further damage if I don't take any actions" + "\n   " + "I can spend HD to heal (as if taking a short rest) without ending the illusion",
			eval : "AddResistance(\"Bludg. (nonmagical)\", \"Relentless\"); AddResistance(\"Pierc. (nonmagical)\", \"Relentless\"); AddResistance(\"Slash. (nonmagical)\", \"Relentless\");",
			removeeval : "RemoveResistance(\"Bludg. (nonmagical)\"); RemoveResistance(\"Pierc. (nonmagical)\"); RemoveResistance(\"Slash. (nonmagical)\");"
		},
		"subclassfeature10" : {
			name : "Pervert Gravity",
			source : ["HB", 0],
			minlevel : 10,
			description : "\n   " + "When I use invocations, I gain the effect of Spider Climb until the end of my next turn" + "\n   " + "I also learn the Thaumaturgy cantrip",
			spellcastingBonus : {
				name : "Pervert Gravity",
				spells : ["thaumaturgy"],
				selection : ["thaumaturgy"]
			},
		},
		"subclassfeature14" : {
			name : "Horrific Teleport",
			source : ["HB", 0],
			minlevel : 14,
			description : "\n   " + "As a bonus action, I can spend a spell slot to teleport to the target of my Prey Sense" + "\n   " + "I appear within 5 ft of the target, in a space of my choice" + "\n   " + "If the target did not see me before I teleported, it must make a Wisdom saving throw" + "\n   " + "On a failed save, the creature is frightened of me until the end of my next turn",
			action : ["bonus action", ""]
		}
	}
};
ClassList.warlock.subclasses[1].push("inner darkness");
