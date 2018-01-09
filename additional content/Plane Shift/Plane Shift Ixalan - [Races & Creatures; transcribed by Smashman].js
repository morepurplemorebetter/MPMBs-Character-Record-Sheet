/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Races, Subraces, Creatures
	Effect:		This script adds a number of races, subraces, and creatures from the Magic: The Gathering plane of Ixalan
				This is taken from the Plane Shift: Ixalan article (https://magic.wizards.com/en/articles/archive/feature/plane-shift-ixalan-2018-01-09)
	Code by:	Smashman
	Date:		2018-01-09 (sheet v12.999)
*/

var iFileName = "Plane Shift Ixalan - [Races & Creatures; transcribed by Smashman].js";
RequiredSheetVersion(12.999);

SourceList["PS:I"] = {
	name : "Plane Shift: Ixalan",
	abbreviation : "PS:I",
	group : "Plane Shift",
	url : "https://media.wizards.com/2018/downloads/magic/plane-shift_ixalan.pdf"
};

RaceList["siren"] = {
	regExpSearch : /\bsiren\b/i,
	name : "Siren",
	source : ["PS:I", 17],
	plural : "Siren",
	size : 3,
	speed : {
		walk : { spd : 25, enc : 15 },
		fly : { spd : 30, enc : 0 }
	},
	languageProfs : ["Common", "Siren"],
	improvements : "Siren: +2 Charisma;",
	scores : [0, 0, 0, 0, 0, 2],
	trait : "Siren (+2 Charisma)\nFlight: I have a flying speed of 30 feet.\nSiren's Song: I know the friends cantrip and can cast it without material components.",
	spellcastingBonus : {
		name : "Siren's Song",
		spells : ["friends"],
		selection : ["friends"],
		atwill : true,
	},
};