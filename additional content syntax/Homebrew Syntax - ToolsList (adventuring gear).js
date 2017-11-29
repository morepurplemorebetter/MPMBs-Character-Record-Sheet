/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Tool (for the equipment menu)
	Effect:		This is the syntax for adding a new tool
	Sheet:		v12.999 (2017-11-29)

	NOTE that any items added like this will appear at the end of the list of gear visible in the equipment menu.
	They will appear in the order you add them.
*/

var iFileName = "Homebrew Syntax - ToolsList (adventuring gear).js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

ToolsList["disguise kit"] = { //Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
	
	infoname : "Disguise kit [25 gp]", //Required; This is the name as it will appear in the equipment menu
	
	name : "Disguise kit", //Required; The name as it will be put into the equipment table
	
	amount : "", //Required; The amount as will be put into the equipment table. You can put "" here if you like
	
	weight : 3 //Required, has to be a number; The weight as will be put into the equipment table. Note that the total weight is calculated as Amount×Weight. You can put "" here if you like
};