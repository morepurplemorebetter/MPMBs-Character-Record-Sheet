/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Gear (for the equipment menu)
	Effect:		This is the syntax for adding new equipment
	Sheet:		v12.999 (2018-01-22)
*/

var iFileName = "Homebrew Syntax - GearList (adventuring gear).js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

GearList["caltrops"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []. //The name here is used to sort the gear alphabetically.
	
	infoname : "Caltrops [1 gp]", //Required; This is the name as it will appear in the equipment menu
	
	name : "Caltrops", //Required; The name as it will be put into the equipment table
	
	amount : 20, //Required; The amount as will be put into the equipment table. You can put "" here if you like
	
	weight : 0.1, //Required, has to be a number; The weight as will be put into the equipment table. Note that the total weight is calculated as Amount×Weight. You can put "" here if you like
	
	source : ["HB", 0] //Optional; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". //If you don't define this, the equipment will always be available, regardless of what sources are excluded/included // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]
};
