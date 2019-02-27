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

	Subject:	Adventuring Gear

	Effect:		This is the syntax for adding new gear options to the sheet.

	Remarks:	For adding tools or packs, see their respective syntax files "adventuring gear - tool (ToolsList).js" and "adventuring gear - pack (PacksList).js".

	Sheet:		v13.0.0 (2019-??-??)

*/

var iFileName = "Homebrew Syntax - GearList.js";
/* 	iFileName // OPTIONAL //
	TYPE:	string
	USE:	how the file will be named in the sheet if you import it as a file

	Note that this is a variable called 'iFileName'.
	Variables invoked inside an import script will not be available after importing.
	However, if you invoke the variable without the 'var', it will be available after importing.

	This doesn't actually have to be the same as the name of the file.
	Only the first occurrence of this variable will be used.
*/

RequiredSheetVersion(13);
/*	RequiredSheetVersion // OPTIONAL //
	TYPE:	function call with a number
	USE:	the minimum required version number of the sheet for the script to work

	If the sheet where you import this script into is of an earlier version, the player will be given a warning.
	Input a number, not a string (so don't enclose the number in quotation marks)!
	Although the sheet uses semantic versioning, you have to input a number here.
	To find this number of a sheet, open its Document Properties in Adobe Acrobat (Ctrl + D) and look in the 'Custom' tab.
*/

GearList["purple bullets"] = {
/* 	GearList object name // REQUIRED //
	TYPE:	string
	USE:	object name of the piece of equipment as it will be used by the sheet

	By adding a new object to the existing GearList object, we create a new piece of equipment.
	The object name here is 'purple totem'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
*/
	infoname : "Bullets, Purple (10) [5 sp]",
/*	infoname // REQUIRED //
	TYPE:	string
	USE:	name of the gear as it will be displayed in the equipment menu
*/
	name : "Purple Bullets",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the gear as it will be added in the equipment fields

	This name will also be used to recognize what is typed into an equipment field.
	Once you select a piece of gear from the equipment menu, it is this attribute that will be used to fill the field.
*/
	amount : 10,
/*	amount // REQUIRED //
	TYPE:	number or empty string ("")
	USE:	number of the gear as it will be added in the equipment fields, "#" column

	This is really only needed for equipment that normally comes in multiples, like "Rope, feet of".
	When a piece of equipment is added using the equipment menu,
	this amount is set in the "#" column of the equipment section.
	When a piece of equipment is manually typed into the equipment section, the amount set here is ignored.

	Note that the weight is multiplied by the amount to get the total weight of a line in the equipment section.

	If the equipment doesn't normally come in multiples, you can just let this attribute be an empty string ("").
*/
	weight : 0.05,
/*	weight // REQUIRED //
	TYPE:	number or empty string ("")
	USE:	the weight of the gear in lb

	If the equipment doesn't have a listed weight, you can just let this attribute be an empty string ("").
*/
	type : "ammunition",
/*	type // OPTIONAL //
	TYPE:	string
	USE:	the grouping of this gear

	If this attribute is present, all gear with the exact same 'type' attribute will be grouped together in the equipment menu.
	They will be listed in a submenu which uses the string entered in this attribute.
	By default, the following types already exist in the sheet:
		"ammunition"
		"arcane focus"
		"clothes"
		"druidic focus"
		"holy symbol"
		"saddle"

	You can use other strings for the type of the gear you are adding,
	but be aware that doing so will only have any use if you add at least 2 gear with the same 'type' attribute.

	Setting this to an empty string ("") is the same as not including this attribute.
*/
	source : ["SRD", 204],
	source : [["E", 7], ["S", 115]],
/*	source // OPTIONAL //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the gear is found

	This attribute is used by the sheet to determine if the gear should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the gear at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 7 of the Elemental Evil Player's Companion and
	on page 115 of the Sword Coast Adventure Guide.

	If a piece of gear is completely homebrew, or you don't want to make a custom source, just leave out this attribute.
*/
}
