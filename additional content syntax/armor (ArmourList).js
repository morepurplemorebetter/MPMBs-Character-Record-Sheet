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
				Note that if you want a class feature, race, racial trait, feat, background, or magic item to
				add an armor, you should be using the 'armorOptions' attribute.

	Sheet:		v14.0.5 and above

*/

var iFileName = "Homebrew Syntax - ArmourList.js";
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
	defaultExcluded : true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this armour should be excluded by default (true) or included by default (false)

	Include this attribute and set it to true if the armour should appear in the Excluded list of the
	Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.

	This is useful for optional armours that you wouldn't normally want to use (e.g. playtest or campaign-specific).

	Setting this attribute to false is the same as not including this attribute.
*/
	regExpSearch : /^(?=.*purple)(?=.*mail).*$/i,
/*	regExpSearch // REQUIRED //
	TYPE:	regular expression
	USE:	used to match the text in the armour field to see if this armour is present

	This has to be a match for the name given earlier, or the armour will never be recognized.
	Now it looks for any entry that has both the words "purple" and "mail" (or "armor") in it,
	disregarding capitalization or word order.
	If this looks too complicated, or you want to match only a single word, or a fixed order of words, just write it like this:
		regExpSearch : /purple mail/i,
*/
	ac : 12,
	ac : "10+Wis",
/*	ac // REQUIRED //
	TYPE:	number or string (since v13.0.6)
	USE:	the base AC the armour gives without modifiers from Dexterity or other ability scores

	This can be either a:
	1) Number
		The number is the fixed AC bonus (excluding Dexterity)
	2) String (since v13.0.6)
		The string is evaluated and the outcome is used as the AC bonus (excluding Dexterity)
	
		This can be any combination of numbers, mathematical operators,
		and three-letter ability score abbreviations for ability score modifiers (e.g. 'Con'),
		or 'Prof' for the proficiency bonus.

		How this works is fully explained in the description of the `addMod` attribute
		in "_common attributes.js". See point 3 of that description.

		For magical armour that gives a fixed +X bonus, it is recommended to not just write
		the total AC, but write the bonus separately.
		For example, for a +2 breastplate you would write:
			`ac : "14+2",`
		This is effectively the same as using `ac : 16,`, but by using a string,
		the player can see the bonus in the AC field.

	If you use a string here, it is recommended to omit the `addMod` attribute.
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

	If you use any other string than the options given above,
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

	From v13.0.6 onwards, it is recommended to not use this attribute, but instead to
	include the modifier in the `ac` attribute string, as it's easier to read and more logical for the user.

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
	affectsWildShape : true,
/*	affectsWildShape // OPTIONAL //
	TYPE:	boolean
	USE:	whether (true) or not (false) this armour can be used while in a Wild Shape
	ADDED:	v13.0.6

	This attribute only has an effect on the Wild Shape pages.

	This attribute is commonly only used for alternative armour options gained from
	class features like Unarmoured Defence.

	Setting this to false is the same as not including this attribute.
*/
	selectNow : true,
/*	selectNow // OPTIONAL //
	TYPE:	boolean
	USE:	whether (true) or not (false) this armour should immediately be selected
	ADDED:	v13.1.14

	This attribute only has an effect on armour added through the `armorOptions` common attribute 
	(see '_common attributes.js').

	By setting this attribute to `true`, it is no longer necessary to include the
	`armorAdd` attribute as well.

	This attribute has no effect outside of `armorOptions`.
	For armour added directly in the ArmourList, this attribute will be ignored.

	Setting this to false is the same as not including this attribute.
*/
}
