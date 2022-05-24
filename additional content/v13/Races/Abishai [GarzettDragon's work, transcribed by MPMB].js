/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a Devil player race, called "Abishai" and its 8 variants (colors)
				This race is made by GarzettDragon, but not posted anywhere publicly
				Be aware that this race is much more powerful than the official player races
	Code by:	MorePurpleMoreBetter
	Date:		2022-04-24 (sheet v13.1.1)
*/

var iFileName = "Abishai [GarzettDragon's work, transcribed by MPMB].js";
RequiredSheetVersion(13.1);

RaceList["abishai"] = {
	regExpSearch : /abishai/i,
	name : "Abishai",
	sortname : "Abishai",
	source : [["HB", 0]],
	plural : "Abishais",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 },
		walk : { spd : 40, enc : 30 }
	},
	languageProfs : ["Common", "Draconic", "Infernal"],
	vision : [["Darkvision", 120]],
	savetxt : { immune : ["poison", "disease"] },
	scores : [0, 0, 2, 0, 0, 1],
	armorOptions : {
		regExpSearch : /^(?=.*natural)(?=.*armou?r).*$/i,
		name : "Natural Armor",
		source : [["HB", 0]],
		ac : "10+Con+Cha",
		dex : -10
	},
	armorAdd : "Natural Armor",
	abilitySave : 6,
	trait : [
		"Abishai (+2 Constitution, +1 Charisma)",
		"Devil: my creature type is fiend (devil), rather than humanoid.",
		"Natural Armor: I have an AC of 10 + Constitution modifier + Charisma modifier + shield.",
		"Fearful Presence: Each creature of my choice that I can see that starts its turn within 10 ft of me, must succeed on a Wisdom save (DC 8 + Prof B. + Cha mod) or become frightened of me until the end of their next turn. If they roll a 1 on the save, they become paralyzed instead. Once they succeed a save, they can't be affected again by this for 24 hours."
	].join("\n\u2022 "),
	variants : []
};

[
	["Black", "Psychic"],
	["Blue", "Cold"],
	["Brown", "Force"],
	["Green", "Acid"],
	["Purple", "Necrotic"],
	["Red", "Fire"],
	["White", "Radiant"],
	["Yellow", "Lightning"]
].forEach(function(n) {
	AddRacialVariant("abishai", n[0].toLowerCase(), {
		regExpSearch : RegExp(n[0], "i"),
		name : n[0] + " Abishai",
		trait : n[0] + " " + RaceList["abishai"].trait,
		dmgres : [n[1]]
	});
});
