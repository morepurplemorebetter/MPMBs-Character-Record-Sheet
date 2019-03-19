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

	Subject:	Armor

	Effect:		This is the syntax for adding a new armor to the sheet.

	Remarks:	This syntax is also used for objects in the 'armorOptions' attribute found in '_common attributes.js'.
				For the 'armorOptions', you can disregard the object name and ArmourList variable.
				Note that if you want a class feature, race, racial trait, feat, background, or magic item to add an armor,
				you should be using the 'armorOptions' attribute.

	Sheet:		v13.0.0 (2019-??-??)

*/

var iFileName = "Homebrew Syntax - ArmourList.js";
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

ArmourList["purple mail"] = {
/* 	ArmourList object name // REQUIRED //
	TYPE:	string
	USE:	object name of the armour as it will be used by the sheet

	By adding a new object to the existing ArmourList object, we create a new armour.
	The object name here is 'purple mail'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
*/
	name : "Purple Mail",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the armour as it will be used by the sheet

	This name will be capitalized (first letter of every word) before being added to the armour drop-down.
*/
	source : ["SRD", 204],
	source : [["E", 7], ["S", 115]],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the armour is found

	This attribute is used by the sheet to determine if the armour should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the armour at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 7 of the Elemental Evil Player's Companion and
	on page 115 of the Sword Coast Adventure Guide.

	If an armour is completely homebrew, or you don't want to make a custom source, just put the following:
		source : ["HB", 0],
	"HB" refers to the 'homebrew' source.
*/
	regExpSearch : /^(?=.*purple)(?=.*mail).*$/i,
/*	regExpSearch // REQUIRED //
	TYPE:	regular expression
	USE:	used to match the text in the armour field to see if this armour is present

	This has to be a match for the name given earlier, or the armour will never by recognized.
	Now it looks for any entry that has both the words "purple" and "mail" (or "armor") in it,
	disregarding capitalization or word order.
	If this looks too complicated, or you want to match only a single word, or a fixed order of words, just write it like this:
		regExpSearch : /purple mail/i,
*/
	ac : 12,
/*	ac // REQUIRED //
	TYPE:	number
	USE:	the base AC the armour gives without modifiers from Dexterity or other ability scores
*/
	type : "heavy",
/*	type // OPTIONAL //
	TYPE:	string
	USE:	type of the armour: "light", "medium", or "heavy"

	The type of the armour will be used to set other parts of the sheet once the armour is selected.
	For example, if this is set to "heavy", the checkbox for Heavy Armor and will be checked (consequently setting the Dex to AC to 0).

	Don't include this attribute for armours that don't have a type,
	like natural armours or those gained by spells (e.g. Mage Armor).

	Setting this to and empty string ("") is the same as not including this attribute.
*/
	list : "magic",
/*	list // OPTIONAL //
	TYPE:	string
	USE:	determines the sorting of the armour in the drop-down field

	This attribute can have any value you want.
	Any armour with the same 'list' attribute will be grouped together.
	There are two pre-defined lists that exist by default in the sheet:
		"magic"
		"firstlist"

	If this attribute is not present, the 'type' attribute will determine the sorting instead.

	If you use any other string than the four options given above,
	the armour will appear at the end of the drop-down options.

	Setting this to and empty string ("") is the same as not including this attribute.

	>> NOTE WHEN USING armorOptions <<
	The 'list' attribute is ignored for ArmourList objects used in the 'armorOptions' attribute.
	Instead, all things added using the 'armorOptions' attribute will always be added at the top of the drop-down field.
*/
	dex : 3,
/*	dex // OPTIONAL //
	TYPE:	number
	USE:	the maximum Dexterity modifier that can be added to the AC with this armour

	When you set this attribute to -10, the sheet will never add the Dexterity modifier to AC, regardless of its value.
	Doing so essentially works the same as the rules for heavy armour.

	Note that this is normally determined by the 'type' attribute set above.
	For example, if you set the 'type' to "medium", the max Dex mod is 2.
	And when you set the 'type' to "heavy", the Dex mod added to AC is always 0.

	Simply don't include this attribute if the max Dex mod is determined by the armour type or if there is no limit.
*/
	stealthdis : true,
/*	stealthdis // OPTIONAL //
	TYPE:	boolean
	USE:	set to 'true' if the armour gives disadvantage on stealth checks

	Note that the 'type' attribute has no effect on whether stealth is set to disadvantage or not,
	you need to set this attribute to make that happen.

	Setting this to false is the same as not including this attribute.
*/
	addMod : true,
/*	addMod // OPTIONAL //
	TYPE:	boolean
	USE:	set to 'true' if the armour can have a secondary ability score modifier added to the AC

	This secondary ability score is taken from the name of the armour.
	If the name includes, in brackets the three-letter abbreviation of an ability score
	or "Prof" for the proficiency bonus, that modifier will be added to the AC total.

	For example, if this attribute is true and the name is "Purple Mail (Con)",
	the total AC will the AC of this armour + the Dex mod + the Con mod.

	Even if this attribute is set to true, the armour doesn't need a secondary modifier and
	will work perfectly fine without it being present in the name.

	Setting this to false is the same as not including this attribute.
*/
	isMagicArmor : true,
/*	isMagicArmor // OPTIONAL //
	TYPE:	boolean
	USE:	whether (true) or not (false) this armour is a magical armour

	This attribute only has an effect for extra AC calculations and magic item selection.
	Add this if you don't want class features and the like to add AC modifiers that shouldn't work for magical armours.
	Also add this if you don't want this weapon to be an option for magical weapons to add their attributes to.

	Armours added by magic items using the 'armorOptions' attribute will always have this attribute added and set to 'true'.

	Setting this to false is the same as not including this attribute.
*/
	weight : 24,
/*	weight // OPTIONAL //
	TYPE:	number
	USE:	the weight of the armour in lb

	If the armour doesn't have a listed weight, you can just leave this attribute out.
	Setting this to 0 is the same as not including this attribute.
*/
	strReq : 15,
/*	strReq // OPTIONAL //
	TYPE:	number
	USE:	the minimum required Strength score to wear this armour without being encumbered

	If the armour doesn't have a listed minimum Strength, you can just leave this attribute out.
	Note that the sheet doesn't actually do anything with this attribute (yet).

	Setting this to 0 is the same as not including this attribute.
*/
	invName : "Purple Mail Armor",
/*	invName // OPTIONAL //
	TYPE:	string
	USE:	the name used when adding the armour from the Armor/Defense section to the Equipment section

	If you don't include this attribute, the 'name' attribute will be used when
	the armour is added to the equipment section.
	Make sure that the name you give here is still a match for the 'regExpSearch' or
	the armour's weight will not be added in the equipment section.

	Setting this to and empty string ("") is the same as not including this attribute.
*/
}
