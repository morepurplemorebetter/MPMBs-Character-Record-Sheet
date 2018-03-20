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
	vision : [["Darkvision", 60], ["Watervision (See clearly underwater)", 0]],
	dmgres : ["Cold"],
	weaponprofs : [false, false, ["spear", "trident", "net"]],
	skills : ["Perception", "Performance"],
	age : " reach adulthood in their late teens and live around 100 years",
	height : " range from 5 to over 6 feet tall (4'9\" + 2d10\")",
	weight : " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
	improvements : "Merfolk Erectus: +1 Dexterity, +1 Constitution, +1 Charisma;",
	scores : [0, 1, 1, 0, 0, 1],
	trait : "Merfolk Erectus (+1 Dexterity, +1 Constitution, +1 Charisma)\n   Amphibious: I can breathe air and water\n   Citizen of the Seas: Underwater combat does not impose any penalties or disadvantages on movement or weapon attacks and does not affect my vision\n   Mask of the Seas: While in or near the water I can attempt to hide even when I am only lightly obscured by foliage, mud clouds, stone or other natural objects\n   Icy Water: I have resistance to cold and vulnerability to lightning damage", 
	savetxt : { text : ["Vulnerable to lightning"] }
}
