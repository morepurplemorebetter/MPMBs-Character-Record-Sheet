var Base_MagicItemsList = {
	"alchemy jug" : {
		name : "Alchemy Jug",
		source : ["D", 150],
		description : "As an action, command the jug to produce liquid; or an action to uncorked it and pour 2 gal/min. After producing, it only makes the same up to its max, until next dawn. Oil (1 qt), acid (8 fl oz), basic poison (1/2 fl oz), beer (4 gal), honey/wine (1 gal), fresh water (8 gal), mayonnaise/vinegar (2 gal), salt water (12 gal).",
		descriptionLong : "A heavy ceramic jug. As an action, the jug can be commanded to hold a chosen liquid. With another action, I can uncork the jug and pour the liquid out at 2 gallons per minute. Once commanded to produce a liquid, it can't produce a different one or more than the maximum of one, until the next dawn. Liquids (with maximum): acid (8 fl. oz.), basic poison (1/2 fl. oz.), beer (4 gallons), honey (1 gallon), mayonnaise (2 gallons), oil (1 quart), vinegar (2 gallons), fresh water (8 gallons), salt water (12 gallons), wine (1 gallon).",
		type : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		allowDuplicates : false,
		weight : 12,
		descriptionFull : "This ceramic jug appears to be able to hold a gallon of liquid and weighs 12 pounds whether full or empty. Sloshing sounds can be heard from within the jug when it is shaken, even if the jug is empty." + "\n   " + "You can use an action and name one liquid from the table below to cause the jug to produce the chosen liquid. Afterward, you can uncork the jug as an action and pour that liquid out, up to 2 gallons per minute. The maximum amount of liquid the jug can produce depends on the liquid you named." + "\n   " + "Once the jug starts producing a liquid, it can't produce a different one, or more of one that has reached its maximum, until the next dawn.\n\n" + toUni("Max") + "\t" + toUni("Liquid") + "\t\t" + toUni("Max") + "\t" + toUni("Liquid") + "\n8 ounces\tAcid\t\t1 quart\tOil\n1/2 ounce\tBasic poison\t2 gallons\tVinegar\n4 gallons\tBeer\t\t8 gallons\tWater, fresh\n1 gallon\tHoney\t\t12 gallons\tWater, salt\n2 gallons\tMayonnaise\t1 gallon\tWine"
	},
	// DEBUGGING/TESTING:
	"test - gives language" : {
		name : "Language Giver",
		type : "wondrous item",
		rarity : "rare",
		source : ["SRD", 12],
		description : "This magic item grants the proficiency with the 'MPMB language' language.",
		weight : 12,
		attunement : true,
		languageProfs : ['MPMB language'],
		descriptionFull : "Superleuk met een taal!"
		
	},
	"test - gives tool" : {
		name : "Tool Giver",
		type : "wondrous item",
		rarity : "common",
		source : ["SRD", 901],
		description : "This magic item grants proficiency with the 'MPMB tool' tool.",
		toolProfs : ['MPMB tool'],
		descriptionFull : "Superleuk met een gereedschap!"
		
	},
	"test - gives martial weapon proficiency" : {
		name : "Martial Giver",
		type : "wondrous item",
		rarity : "legendary",
		source : ["SRD", 1],
		calculate : 'event.value = "This magic item grants proficiency with martial weapons."',
		weaponProfs : [false, true],
		descriptionFull : "Superleuk met een wapen!"
		
	}
};