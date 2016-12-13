/*  -WHAT IS THIS?-
    The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
    You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
     
    -KEEP IN MIND-
    Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
    It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*  -INFORMATION-
    Subject:    Subclass
    Effect:     This script adds a subclass for the Druid, called "Circle of Dreams"
                This is taken from the Unearthed Arcana: Druid Circles (https://media.wizards.com/2016/dnd/downloads/UA_Druid11272016_CAWS.pdf)
    Code by:    MorePurpleMoreBetter
    Date:       2016-12-09 (sheet v12.65)
*/

ClassSubList["circle of dreams"] = {
    regExpSearch : /^(?=.*(druid|shaman))(?=.*\bdreams\b).*$/i,
    subname : "Circle of Dreams",
	source : ["UA:DC", 1],
    features : {
        "subclassfeature2" : {
            name : "Balm of the Summer Court",
            source : ["UA:DC", 1],
            minlevel : 2,
            description : "\n   " + "I have a pool of fey energy represented by a number of d6s equal to my druid level" + "\n   " + "As a bonus action, I can spend dice to heal an ally within 120 ft of me that I can see " + "\n   " + "I can spend up to half my druid level worth of dice from the pool at once" + "\n   " + "The ally heals an amount equal to the total rolled and gains 1 temp HP per die spent" + "\n   " + "In addition, the ally gains +5 ft speed per die spent, which lasts for 1 minute",
			usages : ["", "2d6 per ", "3d6 per ", "4d6 per ", "5d6 per ", "6d6 per ", "7d6 per ", "8d6 per ", "9d6 per ", "10d6 per ", "11d6 per ", "12d6 per ", "13d6 per ", "14d6 per ", "15d6 per ", "16d6 per ", "17d6 per ", "18d6 per ", "19d6 per ", "20d6 per "],
			recovery : "long rest",
        },
        "subclassfeature6" : {
            name : "Hearth of Moonlight and Shadow",
            source : ["UA:DC", 1],
            minlevel : 6,
            description : "\n   " + "At the start of a short or long rest, I can create a warded area of 30-ft radius" + "\n   " + "Within this area, my allies and I gain +5 on Wis (Perception) checks to detect creatures" + "\n   " + "Also, any light from open flames is not visible from outside the area" + "\n   " + "This effect lasts until the end of the rest or when I leave the area",
        },
        "subclassfeature10" : {
            name : "Hidden Paths",
            source : ["UA:DC", 1],
            minlevel : 10,
            description : "\n   " + "On my turn, I can teleport up to 30 ft to where I can see; Moved distance costs speed" + "\n   " + "As an action, I can teleport a willing ally I touch up to 30 ft to a spot I can see" + "\n   " + "Once I used either option, I can't use this feature again until 1d4 rounds have passed",
			usages : 1,
			recovery : "1d4 rounds",
			action : ["action", " (on ally)"]
        },
        "subclassfeature14" : {
            name : "Purifying Light",
            source : ["UA:DC", 1],
            minlevel : 14,
            description : "\n   " + "When I use a spell slot with a spell to restores HP, I can use Dispel Magic on the target" + "\n   " + "The Dispel Magic counts as if being cast with the same spell slot as the healing spell" + "\n   " + "Each creature effected by the Dispel Magic costs as one use of this feature",
			usages : 3,
			recovery : "long rest",
        },
    }
};
ClassList.druid.subclasses[1].push("circle of dreams");
 
SourceList["UA:DC"] = {
	name : "Unearthed Arcana: Druid Circles", //2016-11-28
	abbreviation : "UA:DC",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2016/dnd/downloads/UA_Druid11272016_CAWS.pdf"
};