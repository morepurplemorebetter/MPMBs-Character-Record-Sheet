/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Races
	Effect:		This script adds a race, Merfolk Erectus
	Code by:	Snutze
	Date:		2018-03-20 (sheet v12.999)
*/

var iFileName = "Merfolk Erectus [by Snutze].js";
RequiredSheetVersion(12.999);

RaceList["merfolk erectus"] = {
	regExpSearch : /^(?=.*merfolk)(?=.*erectus).*$/i,
	name : "Merfolk Erectus",
	sortname : "Merfolk, Erectus",
	source : ["HB", 0],
	plural : "Merfolk Erectus",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 },
		swim : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", "Aquan"],
	vision : [["Darkvision", 60], ["See clearly underwater", 0]],
	dmgres : ["Cold"],
	savetxt : { text : ["Vulnerable to lightning"] },
	weaponprofs : [false, false, ["spear", "trident", "net"]],
	skills : ["Perception", "Performance"],
	age : " reach adulthood in their late teens and live around 100 years",
	height : " range from 5 to over 6 feet tall (4'9\" + 2d10\")",
	weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
	improvements : "Merfolk Erectus: +1 Dexterity, +1 Constitution, +1 Charisma;",
	scores : [0, 1, 1, 0, 0, 1],
	trait : "Merfolk Erectus (+1 Dexterity, +1 Constitution, +1 Charisma)\n   Amphibious: I can breathe air and water.\n   Citizen of the Seas: When underwater, I can see as clearly as on land and I suffer no penalties or disadvantages on my movement or attacks.\n   Mask of the Seas: While in or near the water I can attempt to hide even when I am only lightly obscured by foliage, mud clouds, stone or other natural objects.\n   Icy Water: I have resistance to cold and vulnerability to lightning damage."
};
