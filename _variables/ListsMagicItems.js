var Base_MagicItemsList = {
	"alchemy jug" : {
		name : "Alchemy Jug",
		source : ["D", 150],
		description : "A heavy ceramic jug. As an action, the jug can be commanded to hold a chosen liquid. With another action, the jug can be uncorked and the liquid can be poured out, at 2 gal. per minute. Once commanded to produce a liquid, it can't produce a different one or more than the max of one, until the next dawn. Liquids (with max): Acid (8 fl. oz.), Basic poison (1/2 fl. oz.), Beer (4 gal.), Honey (1 gal.), Mayonnaise (2 gal.), Oil (1 quart), Vinegar (2 gal.), Fresh water (8 gal.), Salt water (12 gal.), Wine (1 gal.)",
		descriptionLong : true,
		type : "wondrous item",
		rarity : "uncommon",
		attunement : false,
		weight : 12,
		descriptionFull : "This ceramic jug appears to be able to hold a gallon of liquid and weighs 12 pounds whether full or empty. Sloshing sounds can be heard from within the jug when it is shaken, even if the jug is empty." + "\n   " + "You can use an action and name one liquid from the table below to cause the jug to produce the chosen liquid. Afterward, you can uncork the jug as an action and pour that liquid out, up to 2 gallons per minute. The maximum amount of liquid the jug can produce depends on the liquid you named." + "\n   " + "Once the jug starts producing a liquid, it can't produce a different one, or more of one that has reached its maximum, until the next dawn.\n\n" + toUni("Max") + "\t" + toUni("Liquid") + "\t\t" + toUni("Max") + "\t" + toUni("Liquid") + "\n8 ounces\tAcid\t\t1 quart\tOil\n1/2 ounce\tBasic poison\t2 gallons\tVinegar\n4 gallons\tBeer\t\t8 gallons\tWater, fresh\n1 gallon\tHoney\t\t12 gallons\tWater, salt\n2 gallons\tMayonnaise\t1 gallon\tWine"
	},
};