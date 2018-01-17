/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a racial variant for the Half-Elf, called "Half-Eladrin"
				This is based on the Eladrin race
	Code by:	Mike (with amendments by MorePurpleMoreBetter)
	Date:		2017-11-29 (sheet v12.999)
*/

var iFileName = "Variant - Half-Elf (Fey Step) [by Mike].js";
RequiredSheetVersion(12.999);

AddRacialVariant("half-elf", "fey step", {
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
});

//change the Half-elf entry to accepts this new variant
RaceList["half-elf"].regExpSearch = /^(?=.*half)(?=.*(elf|elv|drow|silvanesti|qualinesti|grugach|kagonesti|eladrin)).*$/i;
