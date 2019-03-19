/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	SpellTable
	Effect:		This is an example of a table that is used for a (sub)class that has the 'spellcastingFactor' defined as "purplemancer1" (where "1" is the factor and the rest is the name)
				Alternatively, you can just add this to the code for your class or subclass (see Homebrew Syntax ClassList and ClassSubList)
	Sheet:		v12.999 (2017-11-29)

	Note that the table needs to have these exact dimensions, of level 0-20 and at least 9 entries per row
*/

var iFileName = "Homebrew Syntax - SpellTable.js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

purplemancerSpellTable = [ //Object name; note that there is no "var" here, and that the name of this variable is the name of the spellcastingFactor without any numbers in it and all lower case, plus the text "SpellTable"
	[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 0 // this should be all zeroes
	[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 1 // there are 9 entries in each array, one for each spell level
	[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 2
	[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 3
	[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 4
	[2, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 5
	[2, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 6
	[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 7
	[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 8
	[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 9
	[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl10
	[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl11
	[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl12
	[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl13
	[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl14
	[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl15
	[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl16
	[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl17
	[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl18
	[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl19
	[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl20
]