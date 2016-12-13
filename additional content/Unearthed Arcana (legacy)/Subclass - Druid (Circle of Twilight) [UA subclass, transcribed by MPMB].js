/*  -WHAT IS THIS?-
    The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
    You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
     
    -KEEP IN MIND-
    Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
    It is recommended to enter the code in a fresh sheet before adding any other information.
*/
 
/*  -INFORMATION-
    Subject:    Subclass
    Effect:     This script adds a subclass for the Druid, called "Circle of Twilight"
                This is taken from the Unearthed Arcana: Druid Circles (https://media.wizards.com/2016/dnd/downloads/UA_Druid11272016_CAWS.pdf)
    Code by:    MorePurpleMoreBetter
    Date:       2016-12-09 (sheet v12.65)
*/

ClassSubList["circle of twilight"] = {
    regExpSearch : /^(?=.*(druid|shaman))(?=.*twilight).*$/i,
    subname : "Circle of Twilight",
	source : ["UA:DC", 2],
    features : {
        "subclassfeature2" : {
            name : "Harvest's Scythe",
            source : ["UA:DC", 3],
            minlevel : 2,
            description : "\n   " + "I have a pool of energy represented by a number of d10s equal to my druid level" + "\n   " + "When I roll damage for a spell, I can do extra necrotic damage with dice from the pool" + "\n   " + "I can spend up to half my druid level worth of dice from the pool at once" + "\n   " + "If I any hostiles die from an augmented spell, I can heal one ally I can see within 30 ft" + "\n   " + "The ally regains 2 HP per die spent; or 5 HP per die if one of the slain was undead  ",
			usages : ["", "2d10 per ", "3d10 per ", "4d10 per ", "5d10 per ", "6d10 per ", "7d10 per ", "8d10 per ", "9d10 per ", "10d10 per ", "11d10 per ", "12d10 per ", "13d10 per ", "14d10 per ", "15d10 per ", "16d10 per ", "17d10 per ", "18d10 per ", "19d10 per ", "20d10 per "],
			recovery : "long rest",
        },
        "subclassfeature6" : {
            name : "Speech Beyond the Grave",
            source : ["UA:DC", 3],
            minlevel : 6,
            description : "\n   " + "Once per short rest, I can cast Speak with Dead without spell slots or material comp." + "\n   " + "The target and I can understand each other, regardless of language or intelligence",
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Speech Beyond the Grave",
				spells : ["speak with dead"],
				selection : ["speak with dead"],
				oncesr : true,
			},
        },
        "subclassfeature10" : {
            name : "Watcher at the Threshold",
            source : ["UA:DC", 3],
            minlevel : 10,
            description : "\n   " + "I gain resistance to necrotic and radiant damage" + "\n   " + "While I'm not incapacitated, allies within 30 ft of me gain adv. on their death saves",
			eval : "AddResistance(\"Necrotic\", \"Watcher at the Threshold\"); AddResistance(\"Radiant\", \"Watcher at the Threshold\");",
			removeeval : "RemoveResistance(\"Necrotic\"); RemoveResistance(\"Radiant\");"
        },
        "subclassfeature14" : {
            name : "Paths of the Dead",
            source : ["UA:DC", 3],
            minlevel : 14,
            description : "\n   " + "Once per short rest, I can cast Etherealness without needing a spell slot (PHB 238)",
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Paths of the Dead",
				spells : ["etherealness"],
				selection : ["etherealness"],
				oncesr : true,
			},
        },
    }
};
ClassList.druid.subclasses[1].push("circle of twilight");
 
SourceList["UA:DC"] = {
	name : "Unearthed Arcana: Druid Circles", //2016-11-28
	abbreviation : "UA:DC",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2016/dnd/downloads/UA_Druid11272016_CAWS.pdf"
};