/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a racial variant for the Half-Elf, called "Half-Eladrin"
				This is based on the Eladrin race
	Code by:	Mike (with amendments by MorePurpleMoreBetter)
	Date:		2017-03-27 (sheet v12.87)
*/

RaceSubList["half-elf-fey step"] = {
	regExpSearch : /^(?=.*fey)(?=.*step).*$/i,
	name : "Half-eladrin",
	source : ["HB", 0],
	plural : "Half-eladrin",
	trait : "Half-Eladrin (+2 Charisma and +1 to two other ability scores of my choice)\n\nFey Step: I can cast the Misty Step spell once using this trait. I regain the ability to do so when I finish a short rest.",
	features : {
		"fey step" : {
			name : "Misty Step",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			tooltip : " (Fey Step)",
			action : ["bonus action", ""],
			spellcastingBonus : {
				name : "Fey Step",
				spells : ["misty step"],
				selection : ["misty step"],
				oncesr : true
			}
		}
	}
};

//change the Half-elf entry to accepts this new variant
RaceList["half-elf"].regExpSearch = /^(?=.*half)(?=.*(elf|elv|drow|silvanesti|qualinesti|grugach|kagonesti|eladrin)).*$/i;
RaceList["half-elf"].variants.push("fey step");
