/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file.
	You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded sheet or to first reset sheet.
	Thus you don't run the risk of things that have already been filled out causing conflicts.

	-HOW TO READ-
	Every line comes with a comment immediately after it to show whether it is // Optional // or // Required //,
	followed by a more explanatory comment

	-THIS IS JAVASCRIPT-
	The imports scripts work by creating a new entry inside an existing object or by calling functions.
	You can create new or overwrite existing global variables by omitting 'var'.
	You will need to understand the basics of JavaScript variables: strings, arrays, and JSON objects.
	Note that every opening symbol must have its closing counterpart: (), {}, [], "", ''.
	If these are not present, the code will give an error when imported.
	Use proper editing software for code (like Notepad++). Text processors like Microsoft Word will screw up your code.
	To help finding syntax errors, use (online) code checking software like https://jshint.com

	-COMMENTS IN THE EXAMPLE-
	Anything on a line after two forward slashes is a comment and will be ignored when running the code.
	Multiline comments are possible. Open them using the forward slash followed by an asterisk and close them with the opposite.
	The below contains a lot of these comments. The comments are not necessary for the script to work, so feel free to remove them.
*/

/*	-INFORMATION-

	Subject:	Adventuring Pack

	Effect:		This is the syntax for adding new pack options to the sheet.

	Remarks:	A pack is only selectable through the Add Equipment button.
				For adding gear or tools, see their respective syntax files
				"adventuring gear - equipment (GearList).js" and "adventuring gear - tool (ToolsList).js".

	Sheet:		v13.0.6 and newer

*/

var iFileName = "Homebrew Syntax - PacksList.js";
/* 	iFileName // OPTIONAL //
	TYPE:	string
	USE:	how the file will be named in the sheet if you import it as a file

	Note that this is a variable called 'iFileName'.
	Variables invoked inside an import script will not be available after importing.
	However, if you invoke the variable without the 'var', it will be available after importing.

	This doesn't have to be the same as the actual name of the file.
	This doesn't need to have the .js file extension.
	Only the first occurrence of this variable will be used.
*/

RequiredSheetVersion("13.0.6");
/*	RequiredSheetVersion // OPTIONAL //
	TYPE:	function call with one variable, a string or number
	USE:	the minimum version of the sheet required for the import script to work

	If this script is imported into a sheet with an earlier version than given here, the player will be given a warning.

	The variable you input can be a the full semantic version of the sheet as a string (e.g. "13.0.6" or "13.1.0-beta1+201209").
	Alternatively, you can input a number, which the sheet will translate to a semantic version.
	For example:
		FUNCTION CALL						REQUIRED MINIMUM VERSION
		`RequiredSheetVersion(13);`			13.0.0
		`RequiredSheetVersion(13.1);`		13.1.0

	You can find the full semantic version of the sheet at the bottom of every page,
	or look at the "Get Latest Version" bookmark, which lists the version number,
	or go to File >> Properties >> Description, where the version is part of the document title.
*/

PacksList["purplepack"] = {
/* 	PacksList object name // REQUIRED //
	TYPE:	string
	USE:	object name of the adventuring pack as it will be used by the sheet

	By adding a new object to the existing PacksList object, we create a new adventuring pack.
	The object name here is 'purplepack'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
*/
	name : "Purple pack (10 gp)",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the adventuring pack as it will be displayed in the equipment menu
*/
	source : ["SRD", 204],
	source : [["E", 7], ["S", 115]],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the adventuring pack is found

	This attribute is used by the sheet to determine if the adventuring pack should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the adventuring pack at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 7 of the Elemental Evil Player's Companion and
	on page 115 of the Sword Coast Adventure Guide.

	If an adventuring pack is completely homebrew, or you don't want to make a custom source, just put the following:
		source : ["HB", 0],
	"HB" refers to the 'homebrew' source.
*/
	items : [
		["Backpack, with:", "", 5],
		["Rations, days of", 5, 2],
		["Tinderbox", "", 1],
		["Waterskin", "", 5],
		["Hempen rope, feet of", 50, 0.2]
	]
/*	items // REQUIRED //
	TYPE:	array (variable length) with arrays (3 entries each)
	USE:	the items to add to the equipment section

	Each entry in this array represents a piece of equipment to put in the equipment section when this pack is added.
	They will be added in the order presented here, so it is advisable to add any container at the top.

	Everything after the item ending with ", with:" will get a hyphen prefix.
	Using the example above, the list would look like:

		Gear					#	lbs
		Backpack, with:				5
		- Rations, days of		5	2
		- Tinderbox					1
		- Waterskin					5
		- Hempen rope, feet of	50	0.2

	Each entry in the array is an array on its own, with three entries:
	1. string
		The first entry is the name of the equipment as it will be added to the equipment section.
	2. number or empty string ("")
		The second entry is the amount of that piece of equipment.
		This is really only needed for equipment that normally comes in multiples, like "Rope, feet of".
		Note that the weight is multiplied by the amount to get the total weight of a line in the equipment section.
		If the equipment doesn't normally come in multiples, you can just let this attribute be an empty string ("").
	3. number or empty string ("")
		The third entry is the weight of that piece of equipment in lb.
		If the piece of equipment doesn't have a listed weight, you can just let this attribute be an empty string ("").
*/
}
