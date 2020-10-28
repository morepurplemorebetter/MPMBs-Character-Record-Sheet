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

	Subject:	Tool (adventuring gear)

	Effect:		This is the syntax for adding new tool options to the sheet.

	Remarks:	For adding regular equipment or packs, see their respective syntax files "adventuring gear - equipment (GearList).js" and "adventuring gear - pack (PacksList).js".

	Sheet:		v13.0.6 and newer

*/

var iFileName = "Homebrew Syntax - ToolsList.js";
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

ToolsList["purplemancer's tools"] = {
/* 	ToolsList object name // REQUIRED //
	TYPE:	string
	USE:	object name of the tool as it will be used by the sheet

	By adding a new object to the existing ToolsList object, we create a new tool.
	The object name here is 'purplemancer's tools'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
*/
	infoname : "Purplemancer's tools [500 gp]",
/*	infoname // REQUIRED //
	TYPE:	string
	USE:	name of the tool as it will be displayed in the equipment menu
*/
	name : "Purplemancer's tools",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the tool as it will be added in the equipment fields

	This name will also be used to recognize what is typed into an equipment field.
	Once you select a tool from the equipment menu, it is this attribute that will be used to fill the field.
*/
	amount : "",
/*	amount // REQUIRED //
	TYPE:	number or empty string ("")
	USE:	number of the tool as it will be added in the equipment fields, "#" column

	This is really only needed for equipment that normally comes in multiples, like "Rope, feet of".
	When a piece of equipment is added using the equipment menu,
	this amount is set in the "#" column of the equipment section.
	When a piece of equipment is manually typed into the equipment section, the amount set here is ignored.

	Note that the weight is multiplied by the amount to get the total weight of a line in the equipment section.

	If the equipment doesn't normally come in multiples, you can just let this attribute be an empty string ("").
*/
	weight : 12,
/*	weight // REQUIRED //
	TYPE:	number or empty string ("")
	USE:	the weight of the tool in lb

	If the tool doesn't have a listed weight, you can just let this attribute be an empty string ("").
*/
	type : "artisan's tools",
/*	type // OPTIONAL //
	TYPE:	string
	USE:	the grouping of this tool

	If this attribute is present, all tool with the exact same 'type' attribute will be grouped together in the equipment menu.
	They will be listed in a submenu which uses the string entered in this attribute.
	By default, the following types already exist in the sheet:
		"artisan's tools"
		"gaming set"
		"musical instrument"

	You can use other strings for the type of the tool you are adding,
	but be aware that doing so will only have any use if you add at least 2 tools with the same 'type' attribute.

	Setting this to an empty string ("") is the same as not including this attribute.
*/
	source : ["SRD", 204],
	source : [["E", 7], ["S", 115]],
/*	source // OPTIONAL //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the tool is found

	This attribute is used by the sheet to determine if the tool should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the tool at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 7 of the Elemental Evil Player's Companion and
	on page 115 of the Sword Coast Adventure Guide.

	If a tool is completely homebrew, or you don't want to make a custom source, just leave out this attribute.
*/
}
