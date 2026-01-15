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

	Subject:	Ammunition

	Effect:		This is the syntax for adding a new ammunition to the sheet.

	Remarks:	This syntax is also used for objects in the 'ammoOptions' attribute found in '_common attributes.js'.
				For the 'ammoOptions', you can disregard the object name and AmmoList variable.
				Note that if you want a class feature, race, racial trait, feat, background, or magic item to add an ammunition,
				you should be using the 'ammoOptions' attribute.

	Sheet:		v14.0.5 and above

*/

var iFileName = "Homebrew Syntax - AmmoList.js";
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

RequiredSheetVersion("14.0.5", "24.0.0");
/*	RequiredSheetVersion // OPTIONAL //
	TYPE:	function call with one variable, a string or number
	USE:	the minimum and maximum versions of the sheet required for the add-on script to work
	CHANGE: v14.0.5 (added second parameter: upper version limit)

	If this script is imported into a sheet with an lower or higher version than given here,
	the player will be given a warning.

	This function takes two variables, but only the first is required:
	1. The minimum required version number.
	   The sheet's version needs to be the same number or higher.
	   This first parameter is required.

	2. The upper version number limit.
	   The sheet's version needs to be a lower number.
	   This second parameter is optional.

	Each variable can be input as a string with the full semantic version (e.g. "14.0.5"
	or "24.0.4-beta+25011209"), or a number that the sheet will translate to a semantic
	version. See the examples below for how the sheet does this.

	INPUT NUMBER	SEMANTIC VERSION
		14  			14.0.0
		24.1			24.1.0

	You can find the full semantic version of the sheet at the bottom of every page,
	or look at the "Get Latest Version" bookmark, which lists the version number,
	or go to File >> Properties >> Description, where the version is part of the document title.
*/

AmmoList["purple bullets"] = {
/* 	AmmoList object name // REQUIRED //
	TYPE:	string
	USE:	object name of the ammunition as it will be used by the sheet

	By adding a new object to the existing AmmoList object, we create a new ammunition.
	The object name here is 'purple bullets'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
*/
	name : "Purple Bullets",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the ammunition as it will be used by the sheet

	This name will also be used to recognize what is selected in the ammo drop-down.

	This name will be capitalized (first letter of every word) before being added to the ammo drop-down.
*/
	source : ["SRD", 204],
	source : [["E", 7], ["S", 115]],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the ammunition is found

	This attribute is used by the sheet to determine if the ammunition should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the ammunition at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 7 of the Elemental Evil Player's Companion and
	on page 115 of the Sword Coast Adventure Guide.

	If an ammunition is completely homebrew, or you don't want to make a custom source, just put the following:
		source : ["HB", 0],
	"HB" refers to the 'homebrew' source.
*/
	defaultExcluded : true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this ammunition should be excluded by default (true) or included by default (false)

	Include this attribute and set it to true if the ammunition should appear in the Excluded list of the
	Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.

	This is useful for optional ammunition that you wouldn't normally want to use (e.g. playtest or campaign-specific).

	Setting this attribute to false is the same as not including this attribute.
*/
	icon : "Bullets",
/*	icon // REQUIRED //
	TYPE:	string
	USE:	icon to use for the ammunition

	This attribute determines what icons and the amount of checkboxes available.
	This attribute can be only one of these options (notice the capitalization!):
		"Arrows"
		"Axes"
		"Bullets"
		"Daggers"
		"Flasks"
		"Hammers"
		"Spears"
		"Vials"

	If this is not one of the options listed above, the "Arrows" icons will be used.
*/
	weight : 24,
/*	weight // OPTIONAL //
	TYPE:	number
	USE:	the weight of a single piece of the ammunition in lb

	If the ammunition doesn't have a listed weight, you can just leave this attribute out.
	Setting this to 0 is the same as not including this attribute.
*/
	isMagicAmmo : true,
/*	isMagicAmmo // OPTIONAL //
	TYPE:	boolean
	USE:	whether (true) or not (false) this ammunition is magical ammunition

	This attribute only has an effect for magic item selection.
	Add this if you don't want this ammunition to be an option for magical ammunition to add their attributes to.

	Ammunition added by magic items using the 'ammoOptions' attribute will always have this attribute added and set to 'true'.

	Setting this to false is the same as not including this attribute.
*/
	invName : "Bullets, Purple",
/*	invName // OPTIONAL //
	TYPE:	string
	USE:	the name used when adding the ammunition from the Ammo section to the Equipment section

	If you don't include this attribute, the 'name' attribute will be used when
	the ammunition is added to the equipment section.
	Make sure that the name you give here is still a match for the 'alternatives' or
	the ammunition's weight will not be added in the equipment section.

	Setting this to and empty string ("") is the same as not including this attribute.
*/
	alternatives : ["bullets, purple", "purple bullet", /^(?=.*bullet)(?=.*purple).*$/i],
/*	alternatives // OPTIONAL //
	TYPE:	array (variable length)
	USE:	used to match the text in the ammunition field to see if this ammo is present

	Use this attribute if you want more things to be a match for this ammunition than just its 'name' attribute.
	Each entry can be either a string or a regular expression.
	When using strings, make sure it is all lower case, as it will be matched against the lower case value of the Ammo field.
*/
}
