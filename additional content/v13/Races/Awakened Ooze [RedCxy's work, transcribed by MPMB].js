/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Races
	Effect:		This script adds a race, Awakened Ooze
				This race is a homebrew creation by RedCxy
				You can find it here: https://homebrewery.naturalcrit.com/share/ryefY7KzV

	Code by:	MorePurpleMoreBetter
	Date:		2019-01-15 (sheet v13.0.0)
*/

var iFileName = "Awakened Ooze [RedCxy's work, transcribed by MPMB].js";
RequiredSheetVersion(13);

RaceList["awakened ooze"] = {
	regExpSearch : /^(?=.*awakened)(?=.*ooze).*$/i,
	name : "Awakened ooze",
	source : ["HB", 0],
	plural : "Awakened oozes",
	size : 3,
	speed : {
		walk : { spd : 25, enc : 15 }
	},
	languageProfs : ["Common", "Primordial"],
	savetxt : {
		text : ["Magic can't put me to sleep"]
	},
	age : " live for as long as the latent magical energies that awakened them lasts, which can be anywhere from decades to millennia, depending on the strength of the enchantment",
	height : "",
	weight : "",
	scores : [0, 0, 2, 0, 0, 1],
	trait : "Awakened Ooze (+2 Constitution, +1 Charisma)\n   Hybrid Nature: Things that affect either humanoids or oozes affect me, as I'm both types.\n   Amorphous: I can fit through a 1 inch opening, although my gear might not. I can shape myself like any humanoid, but can't change color. I can don or doff any armor in 1 minute.\n   Unrest: Instead of sleeping, I have to be motionless for 6 hours to have a long rest. I don't suffer exhaustion due to lack of rest and magic can't put me to sleep.\n   Oozes Metabolism: I don't need to eat or breath, but need water."
};
