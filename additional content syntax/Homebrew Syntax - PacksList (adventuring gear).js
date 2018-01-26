/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Pack (for the equipment menu)
	Effect:		This is the syntax for adding a new Pack of equipment
	Sheet:		v12.999 (2017-11-29)
*/

var iFileName = "Homebrew Syntax - PacksList (adventuring gear).js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

PacksList["burglar"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].

	name : "Burglar's pack (16 gp)", // Required; the name as it will appear in the equipment menu.
	
	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

	items : [ // Required; an array of all the items. Although the array is required, you don't acutally have to put anything in it.
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
	]
};