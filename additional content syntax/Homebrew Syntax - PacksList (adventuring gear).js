/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Pack (for the equipment menu
	Effect:		This is the syntax for adding a new Pack of equipment
	Sheet:		v12.83 (2017-02-18)
*/

PacksList["burglar's pack (16 gp)"] = [ //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []. The spelling here is used to identify the pack with and is how the pack will appear in the equipment menu (although in the menu the first letter will be capitalized automatically).

	["Backpack, with:", "", 5], // Optional; you can add any number of these lines and the syntax is [Item name, Amount, Weight]; A item name is required, but the other two can be put as "", if you don't want it to have anything
	
	//the rest below are examples:
	["Bag of 1000 ball bearings", 1, 2],
	["String, feet of", 10, ""],
	["Bell", "", ""],
	["Candles", 5, ""],
	["Crowbar", "", 5],
	["Hammer", "", 3],
	["Pitons", 10, .25],
	["Hooded lantern", "", 2],
	["Oil, flasks of", 2, 1],
	["Rations, days of", 5, 2],
	["Tinderbox", "", 1],
	["Waterskin", "", 5],
	["Hempen rope, feet of", 50, 0.2]
];