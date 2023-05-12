/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Rogue, called "Spellwarp Sniper"
	Made by:	Subpar77
	Date:		2017-11-29 (sheet v12.999)
*/

var iFileName = "Rogue - Spellwarp Sniper [by Subpar77].js";
RequiredSheetVersion(12.999);

AddSubClass("rogue", "spellwarp sniper", {
    regExpSearch : /^(?=.*spellwarp)(?=.*sniper).*$/i,
    subname : "Spellwarp Sniper",
	source : ["HB", 0],
    abilitySave : 4,
    spellcastingFactor : 3,
    spellcastingList : {
        class : "sorcerer",
        school : ["Evoc", "Trans"],
        level : [0, 4]
    },
    spellcastingKnown : {
            cantrips : [0, 0, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            spells : [0, 0, 2, 3, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9]
    },
    features : {
        "subclassfeature3" : {
            name : "Spellcasting",
            source : ["HB", 0],
            minlevel : 3,
            description : "\n   " + "I can cast known Sorcerer cantrips/spells, using Charisma as my spell casting ability.",
            additional : ["", "", "3 cantrips \u0026 3 spells known", "3 cantrips \u0026 4 spells known", "3 cantrips \u0026 4 spells known", "3 cantrips \u0026 4 spells known", "3 cantrips \u0026 5 spells known", "3 cantrips \u0026 6 spells known", "3 cantrips \u0026 6 spells known", "4 cantrips \u0026 7 spells known", "4 cantrips \u0026 8 spells known", "4 cantrips \u0026 8 spells known", "4 cantrips \u0026 9 spells known", "4 cantrips \u0026 10 spells known", "4 cantrips \u0026 10 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 12 spells known", "4 cantrips \u0026 13 spells known"],
            spellcastingBonus : [{
                name : "Ray of Frost",
                spells : ["ray of frost"],
                selection : ["ray of frost"]
            }, {
                name : "From any School",
                class : "sorcerer",
                times : [0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4],
                level : [1, 4]
            }]
        },
        "subclassfeature3.1" : {
            name : "Spellwarp",
            source : ["HB", 0],
            minlevel : 3,
            description : "\n   " + "I can bend any area effect spell into a ray. My rays count as precision damage and may have sneak attack die added if sneak attack would apply."
        },
        "subclassfeature9" : {
            name : "Forceful Rays",
            source : ["HB", 0],
            minlevel : 9,
            description : "\n   " + "Empower Spell as though using sorcerer metamagic.",
            recovery : "long rest",
            usages : 2
        },
        "sublcassfeature9.1" : {
            name: "Forcefull Rays(cont.)",
            source : ["HB", 0],
            minlevel : 9,
            description : "\n   " + "As a bonus action, I can apply one of the following effects to a ray attack." + "\n    " + "Push target back 10'" + "\n    " + "Knock target prone." + "\n    " + "Stun target until end of my next turn.",
            action : ["bonus action", ""]
        },
        "subclassfeature13" : {
            name : "Reposition",
            source : ["HB", 0],
            minlevel : 13,
            description : "\n   " + "On a successful sneak attack I become invisible to my foes until the end of my next turn." + "\n   " + "The target of my next attack has disadvantage on saving throws if I attack while invisible.",
            additional : ["Target saving throw is Perception(Wis) vs. Spell DC. Target has disadvantage."]
        },
        "subclassfeature17" : {
            name : "Sustained Ray",
            source : ["HB", 0],
            minlevel : 17,
            description : "\n   " + "I can sustain a single ray spell." + "\n   " + "On successful attack I can maintain a ray spell for an additional round." + "\n   " + "This does not use a spell slot, or require an attack roll" + "\n   " + "Damage is rerolled. Requires consentration"
        }
    }
});
