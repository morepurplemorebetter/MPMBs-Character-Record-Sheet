/*  -WHAT IS THIS?-
    The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
    You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
     
    -KEEP IN MIND-
    Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
    It is recommended to enter the code in a fresh sheet before adding any other information.
*/
 
/*  -INFORMATION-
    Subject:    Subclass
    Effect:     This script adds a subclass for the Druid, called "Circle of the Shepherd"
                This is taken from the Unearthed Arcana: Druid Circles (https://media.wizards.com/2016/dnd/downloads/UA_Druid11272016_CAWS.pdf)
    Code by:    MorePurpleMoreBetter
    Date:       2016-12-09 (sheet v12.65)
*/

ClassSubList["circle of the shepherd"] = {
    regExpSearch : /^(?=.*(druid|shaman))(?=.*shepherd).*$/i,
    subname : "Circle of the Shepherd",
	source : ["UA:DC", 1],
    features : {
        "subclassfeature2" : {
            name : "Beast Speech",
            source : ["UA:DC", 2],
            minlevel : 2,
            description : "\n   " + "I can talk with beasts, they understand me and I them, to the limit of their intelligence" + "\n   " + "This doesn't automatically make me friends with all beasts",
        },
        "subclassfeature2.1" : {
            name : "Spirit Bond",
            source : ["UA:DC", 2],
            minlevel : 2,
            description : "\n   " + "As a bonus action, I can summon a spirit to an empty space within 60 ft that I can see" + "\n   " + "The Bear, Hawk, or Wolf spirit, creates a 30-ft radius aura and persist for 1 minute" + "\n   " + "It doesn’t occupy space, is immobile, and counts as neither a creature nor an object" + "\n    - " + "Bear: my allies in the area and I instantly gain 5 + my druid level in temp HP" + "\n       " + "While in the aura, my allies and I gain advantage on Strength checks and saves" + "\n    - " + "Hawk: my allies and I gain advantage on attacks against targets in the aura" + "\n    - " + "Wolf: my allies and I gain advantage on ability checks to detect targets in the aura" + "\n         " + "If I cast a healing spell with a spell slot, allies in the aura heal my druid level in HP",
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
        },
        "subclassfeature6" : {
            name : "Mighty Summoner",
            source : ["UA:DC", 2],
            minlevel : 6,
            description : "\n   " + "Beast I summon with my spells have +2 HP per HD and their attacks count as magical",
        },
        "subclassfeature10" : {
            name : "Guardian Spirit",
            source : ["UA:DC", 2],
            minlevel : 10,
            description : "\n   " + "Whenever I finish a long rest, I gain the benefits of a Death Ward spell for 24 hours",
        },
        "subclassfeature14" : {
            name : "Faithful Summons",
            source : ["UA:DC", 2],
            minlevel : 14,
            description : "\n   " + "When I am reduced to 0 HP or incapacitated against my will, I can summon protectors" + "\n   " + "I gain the benefits of a Conjure Animals spell as if cast with a 9th-level spell slot" + "\n   " + "It summons 4 beast of my choice with CR 2 or lower within 20 ft of me for 1 hour" + "\n   " + "If they receive no commands from me, they protect me from harm and attack foes",
			usages : 1,
			recovery : "long rest",
        },
    }
};
ClassList.druid.subclasses[1].push("circle of the shepherd");
 
SourceList["UA:DC"] = {
	name : "Unearthed Arcana: Druid Circles", //2016-11-28
	abbreviation : "UA:DC",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2016/dnd/downloads/UA_Druid11272016_CAWS.pdf"
};