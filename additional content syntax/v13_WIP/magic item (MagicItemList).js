/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file.
	You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded sheet or to first reset sheet.
	Thus you don't run the risk of things being filled out causing conflicts.

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

	Subject:	Magic Item

	Effect:		This is the syntax for adding a new magic item to the sheet.

	Remarks:	You will also need the syntax for common attributes if you want the magic item to do anything besides populating its description field.
				You will also need the syntax for adding a source if you want the magic item to have a source that doesn't yet exist in the sheet.

	Sheet:		v13.0.0 (2018-??-??)

*/

var iFileName = "Homebrew Syntax - MagicItemsList.js";
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

	If the sheet where you import this script into is of an earlier version, the user will be given a warning.
	Input a number, not a string (so don't enclose the number in quotation marks)!
	Although the sheet uses semantic versioning, you have to input a number here.
	To find this number of a sheet, open its Document Properties in Adobe Acrobat (Ctrl + D) and look in the 'Custom' tab.
*/

MagicItemsList["staff of purple"] = {
/* 	MagicItemList object name // REQUIRED //
	TYPE:	string
	USE:	object name of the magic item as it will be used by the sheet

	By adding a new object to the existing MagicItemList object, we create a new magic item.
	The object name here is 'staff of purple'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
*/
	name : "Staff of Purple",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the magic item as it will be used by the sheet

	This name will also be used to recognize what is selected in the magic item drop-down.
*/
	source : ["SRD", 170],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the magic item is found

	This attribute is used by the sheet to determine if the magic item should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the magic item at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	For example, if something appears on both page 7 of the Elemental Evil Player's Companion
	 and on page 115 of the Sword Coast Adventure Guide, use the following:
		source : [["E", 7], ["S", 115]],

	If a magic item is completely homebrew, or you don't want to make a custom source, just put the following:
		source : ["HB", 0],
	"HB" refers to the'homebrew' source.
*/
	type : "wondrous item",
/*	type // REQUIRED //
	TYPE:	string
	USE:	define what type the magic item is, to be used in the tooltip and to sort the item

	Common entries include:
		"wondrous item"
		"armor"
		"shield"
		"weapon"
		"ring"
		"rod"
		"staff"
		"wand"
		"potion"
		"scroll"
*/
	rarity : "rare",
/*	rarity // REQUIRED //
	TYPE:	string
	USE:	define what rarity the magic item is, to be used in the tooltip and to sort the item

	Common entries include:
		"common"
		"uncommon"
		"rare"
		"very rare"
		"legendary"
		"artifact"
*/
	magicItemTable : "H",
	magicItemTable : ["B", "E"],
/*	magicItemTable // OPTIONAL //
	TYPE:	string or array of strings (variable length)
	USE:	define what table(s) in the DMG that the magic item appears on (or as listed in the AL Content Catalog)

	This attribute is used for sorting the items and for the magic item trading rules in the Adventurers League.

	The string (or each string in the array) contains just a single letter indicating the table.
	For most items this will be a string,
	but you can have an array with multiple entries for items that appear on multiple tables.
*/
	attunement : true,
/*	attunement // OPTIONAL //
	TYPE:	boolean
	USE:	set to true if the magic item requires attunement

	If the magic item doesn't require attunement, you can just leave this attribute out.
	Setting this to false is the same as not including this attribute.
*/
	weight : 12,
/*	weight // OPTIONAL //
	TYPE:	number
	USE:	the weight of the magic item in lb

	If the magic item doesn't have a listed weight, you can just leave this attribute out.
	Setting this to 0 is the same as not including this attribute.
*/
	allowDuplicates : true,
/*	allowDuplicates // OPTIONAL //
	TYPE:	boolean
	USE:	set to true if multiples can exist of this magic item (e.g. a potion)

	If the magic item doesn't allow duplicates, you can just leave this attribute out.
	Setting this to false is the same as not including this attribute.
*/
	description : "As an action, command the jug to produce liquid; or an action to uncorked it and pour 2 gal/min. After producing, it only makes the same up to its max, until next dawn. Oil (1 qt), acid (8 fl oz), basic poison (1/2 fl oz), beer (4 gal), honey/wine (1 gal), fresh water (8 gal), mayonnaise/vinegar (2 gal), salt water (12 gal).",
/*	description // REQUIRED //
	TYPE:	string
	USE:	the text to be filled in the description field of the magic item

	Note that the sheet normally uses the first person for this.
	Make sure that this description is not too long and fits on the small description field on the 3rd page.
	The Printer Friendly sheets have less space for Magic Item descriptions than the Colourful versions,
	so use the Printer Friendly sheets to test if the description fits.

	Note that the space for magic item descriptions on the overflow is much larger than on the 3rd page, however
	this description needs to fit in the description section on the 3rd page.
*/
	descriptionLong : "A heavy ceramic jug. As an action, the jug can be commanded to hold a chosen liquid. With another action, I can uncork the jug and pour the liquid out at 2 gallons per minute. Once commanded to produce a liquid, it can't produce a different one or more than the maximum of one, until the next dawn.\nLiquids (with maximum): acid (8 fl. oz.), basic poison (1/2 fl. oz.), beer (4 gallons), honey (1 gallon), mayonnaise (2 gallons), oil (1 quart), vinegar (2 gallons), fresh water (8 gallons), salt water (12 gallons), wine (1 gallon).",
/*	descriptionLong // OPTIONAL //
	TYPE:	string
	USE:	the text to be filled in the description field of the magic item, but only on the overflow page

	Use this attribute in addition to the 'description' attribute.
	This attribute will only be used when the magic item is added on the overflow page,
	for the third page the 'description' attribute will be used.
	Only use this attribute if a longer description on the overflow page makes sense.
	There is no reason in having the 'description' and 'descriptionLong' be the same.

	Note that the sheet normally uses the first person for this.
	Make sure that this description is not too long and fits on the description field on the overflow page.
	The Printer Friendly sheets have less space for Magic Item descriptions than the Colourful versions,
	so use the Printer Friendly sheets to test if the description fits.
*/
	descriptionFull : "You have a swimming speed of 40 feet while wearing this ring.",
/*	descriptionFull // OPTIONAL //
	TYPE:	string
	USE:	description of the magic item as it appears in its source

	This text is used to populate the tooltip of the magic items so that the original description can be read.
	There is no limit to how big this description can be,
	but very long descriptions will not always display correctly.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Common Attributes >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>

	You can have the magic item affect different parts of the sheet like adding proficiencies,
	adding spellcasting abilities, actions, or limited features.

	See the "_common attributes.js" file for documentation on how to do those things and more.
	All attributes in there can directly be added in this object.
*/

}
