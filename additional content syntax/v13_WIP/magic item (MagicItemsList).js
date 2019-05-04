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

	Subject:	Magic Item

	Effect:		This is the syntax for adding a new magic item to the sheet.

	Remarks:	You will also need the syntax for common attributes if you want the magic item
				to do anything besides populating its description field.
				You will also need the syntax for adding a source if you want the magic item
				to have a source that doesn't yet exist in the sheet.

	Sheet:		v13.0.0 (2019-??-??)

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

	If the sheet where you import this script into is of an earlier version, the player will be given a warning.
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

	This name will be used to recognize what is selected in the magic item drop-down.
	If you want more options for the magic item to be recognized as, see 'nameAlt' and 'nameTest' below.
*/
	nameAlt : "Staff of Colour Magic",
/*	nameAlt // OPTIONAL //
	TYPE:	string
	USE:	alternative setting-independent name with which the sheet can recognize the magic item

	This attribute is intended for magic items that have a name that is bound to a specific setting,
	to allow a name that is setting-neutral.
	For example, the "Apparatus of Kwalish" (DMG 151) is named after the legendary wizard "Kwalish" of the Greyhawk setting.
	As not everybody wants to use the Greyhawk name, the name as given in the SRD page 208 "Apparatus of the Crab" is good to provide as the 'nameAlt'

	This name will also be used to recognize what is typed into the magic item drop-down.
	The shortest of the 'name', 'nameAlt', and 'nameTest' attributes will be used for the 'chooseGear' attribute, see below.
*/
	nameTest : "Purple Staff",
/*	nameTest // OPTIONAL //
	TYPE:	string
	USE:	alternative name with which the sheet can recognize the magic item

	This name will also be used to recognize what is typed into the magic item drop-down.
	The shortest of the 'name', 'nameAlt', and 'nameTest' attributes will be used for the 'chooseGear' attribute, see below.
*/
	source : ["SRD", 204],
	source : [["E", 7], ["S", 115]],
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
	The example above says something appears on both page 7 of the Elemental Evil Player's Companion and
	on page 115 of the Sword Coast Adventure Guide.

	If a magic item is completely homebrew, or you don't want to make a custom source, just put the following:
		source : ["HB", 0],
	"HB" refers to the 'homebrew' source.
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
	notLegalAL : true,
/*	notLegalAL // OPTIONAL //
	TYPE:	boolean
	USE:	set this to true if it the item is not legal in Adventurers League play

	If this attribute is defined, the 'magicItemTable' and 'storyItemAL' attributes are ignored.
	Setting this to false is the same as not including this attribute.

	If none of the three attributes 'magicItemTable', 'storyItemAL', or 'notLegalAL' are defined,
	the magic item will be treated as one that can be used in AL, but can't be traded.
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

	This attribute is ignored if the 'notLegalAL' attribute is defined.
	If this attribute is defined, the 'storyItemAL' attribute is ignored.

	If none of the three attributes 'magicItemTable', 'storyItemAL', or 'notLegalAL' are defined,
	the magic item will be treated as one that can be used in AL, but can't be traded.
*/
	storyItemAL : true,
/*	storyItemAL // OPTIONAL //
	TYPE:	boolean
	USE:	set this to true if it is a 'Story Item' in Adventurers League play

	This attribute is ignored if the 'magicItemTable' or 'notLegalAL' attribute is defined.
	Setting this to false is the same as not including this attribute.

	If none of the three attributes 'magicItemTable', 'storyItemAL', or 'notLegalAL' are defined,
	the magic item will be treated as one that can be used in AL, but can't be traded.
*/
	extraTooltip : "AL: can always be bought for 75 gp",
/*	extraTooltip // OPTIONAL //
	TYPE:	string
	USE:	text to add to the bullet points in the tooltip for the magic item

	This attribute is intended for adding information about the magic item for use in Adventurers League.
	For example, a Potion of Climbing can always be bought for 75 gp in AL play and doesn't need to be unlocked.
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
	prerequisite : "Requires attunement by a dwarf",
/*	weight // OPTIONAL //
	TYPE:	string
	USE:	textual explanation of a prerequisite the item has

	If the magic item doesn't have a prerequisite, you can just leave this attribute out.
	Setting this to "" is the same as not including this attribute.
*/
	prereqeval : function(v) {
		return v.isSpellcaster && CurrentRace.known.indexOf('dwarf') !== -1;
	},
	prereqeval : "CurrentSpells.toSource() !== '({})' && CurrentRace.known.indexOf('dwarf') !== -1",
/*	prereqeval // OPTIONAL //
	TYPE:	function or, for backwards-compatibility, string that is evaluated using eval()
	USE:	this should return 'true' if the prerequisite is met or 'false' otherwise

	Both examples do the exact same thing, just one is a string and the other is a function.
	Writing a function is better as it is easier to avoid syntax errors and will run faster.
	The string option is there for backwards-compatibility and this explanation assumes you are writing a function.

	The function is fed one variable, v, an object containing attributes with information about the character.
	Changing these attributes does nothing, but you can use them to test if the character meets the requirements.

	An explanation of the different attributes of this variable:
	var v = {
		isSpellcaster,  	// boolean; true if the character has spellcasting from a source other than magic items
		characterLevel, 	// number; the total character level
		shieldProf,     	// boolean; true if the checkbox for shield proficiency is checked
		lightArmorProf, 	// boolean; true if the checkbox for light armour proficiency is checked
		mediumArmorProf,	// boolean; true if the checkbox for medium armour proficiency is checked
		heavyArmorProf, 	// boolean; true if the checkbox for heavy armour proficiency is checked
		simpleWeaponsProf,	// boolean; true if the checkbox for simple weapon proficiency is checked
		martialWeaponsProf,	// boolean; true if the checkbox for martial weapon proficiency is checked
		otherWeaponsProf,	// string; the content of the other weapon proficiencies field
		toolProfs,   		// array; the contents of the tool fields, one field per array entry
		languageProfs,   	// array; the contents of the language fields, one field per array entry
		skillProfs,     	// array; the skills the character is proficient in, one skill name per array entry
		hasEldritchBlast,	// boolean; true if the character has the Eldritch Blast cantrips
		choice,      		// string; the sub-choice of this magic item (empty string if no choice)
	}
	N.B. The first entry of both the toolProfs and languageProfs arrays is the contents of the 'More Proficiency' field

	Other than using the 'v' variable, this function can be any JavaScript you want.
	Common usage examples:
		"return CurrentRace.known.indexOf('dwarf') !== -1;" // Test if race is a dwarf
		"return classes.known.cleric;" // Test if character has any levels in the cleric class
		"return What('Dex') >= 13;" // Test if character has a Dexterity score of 13 or more
*/
	allowDuplicates : true,
/*	allowDuplicates // OPTIONAL //
	TYPE:	boolean
	USE:	set to true if multiples can exist of this magic item (e.g. a potion or using 'choices' attribute)

	If the magic item doesn't allow duplicates, you can just leave this attribute out.
	Setting this to false is the same as not including this attribute.

	IMPORTANT NOTE IF USING 'choices' ATTRIBUTE
	When this item has multiple forms and uses the 'choices' attribute,
	you probably want to set the 'allowDuplicates' attribute to true.
	If you don't set this attribute to true, the sheet will only allow this item to exist once,
	regardless if another instance has another form (choices) selected.
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
	This description will also be available in a pop-up by using the button in the item's line.
	There is no limit to how big this description can be,
	but very long descriptions will not always display correctly.
*/
	calculate : "event.value = 'I can spend 10 minutes inspiring up to 6 friendly creatures within 30 feet who can see or hear and can understand me. Each gains lvl (' + What('Character Level') + ') + Cha mod (' + What('Cha Mod') + \") temporary hit points. One can't gain temporary hit points from this item again until after a short rest.\";",
/*	calculate // OPTIONAL //
	TYPE:	string
	USE:	this string is set as the field calculation method for the description field of the magic item

	The string is evaluated as JavaScript code whenever anything changes on the sheet.
	To change the value of the field, you will have to set the 'event.value' to something.
	The example above sets the field to a text with calculated numbers in the text,
	the character level and Charisma Modifier.

	If this attribute is present, the 'description' and 'descriptionLong' attributes will both be useless.
	Remember that the 'description' attribute is still requires, so you might just want to set it to an empty string:
		description : "",
*/
	chooseGear : {
/*	chooseGear // OPTIONAL //
	TYPE:	object
	USE:	ask the player what type of gear (weapon, armor, ammunition) the item should be

	This attribute will show a pop-up dialog for the player to make a selection for a type of gear (weapon, armor, or ammunition).
	Not all gear will be present in the pop-up, it will only include the following:
		- Armours that are light, medium, or heavy (so no natural or magical armours)
		- Weapons that are not listed as being natural, cantrips, or spells
		- Ammunition that is not also listed in the WeaponsList (e.g. no spear, hand axe, or trident)

	The name of the selected gear will be added to the name of the magic item, and
	it will be put in the appropriate field on the 1st place (barring space).

	This object must have at least the 'type' attribute.
	All other attributes for this object are optional.
	Each attribute is described separately below.
*/
		type : "armor",
	/*	type // REQUIRED //
		TYPE:	string
		USE:	the type of gear (weapon, armor, ammunition) this concerns

		This attribute can be one of three options:
			"armor"
			"weapon"
			"ammo"
	*/
		excludeCheck : function (inObjKey, inObj) {
			return inObjKey == "hide";
		},
	/*	excludeCheck // OPTIONAL //
		TYPE:	function
		USE:	filter things from the list of weapon, armor, or ammunition from the options

		This function is called for each entry in the WeaponsList, ArmourList, or AmmoList (depending on 'type', see above).
		If the function returns `true` for an entry, that entry will be omitted from the pop-up dialog.
		This function is passed two variables:
		1)	inObjKey
				A string of the name of the entry in the list variable (WeaponsList, ArmourList, or AmmoList)
		2)	inObj
				The object of the entry (e.g. WeaponsList[inObjKey])

		The above example returns true for the ArmourList 'hide' entry, making sure that the Hide armour is not part of the pop-up.
	*/
		prefixOrSuffix : "suffix",
	/*	prefixOrSuffix // OPTIONAL //
		TYPE:	string
		USE:	determine how the name of the selected gear is added to the name of the magic item

		This attribute can be one of three options:
		1. "prefix" 	// Add the name of selected gear before the name of the magic item
		2. "suffix" 	// Add the name of selected gear after the name of the magic item
		3. "brackets"	// Add the name of selected gear in brackets after the name of the magic item
		If this attribute is not present, the sheet will use the option "prefix".

		Examples with the magic item "Armor of Resistance" and the armor "Breastplate":
		1. "prefix" 	- would result in: "Breastplate Armor of Resistance"
		2. "suffix" 	- would result in: "Armor of Resistance Breastplate"
		3. "brackets"	- would result in: "Armor of Resistance (Breastplate)"

		Unless the 'itemName1stPage' attribute is present, see below, the resulting name is also used to populate the 1st page.
	*/
		descriptionChange : ["prefix", "armor"],
	/*	descriptionChange // OPTIONAL //
		TYPE:	array
		USE:	what part of the magic item's description to add the name of the selected gear to

		This array must always have 2 entries, each of which is a strings:
		1. The first string determines how the name of the selected gear is added to the magic item's description.
			This can be one of four options:
			1.1 "replace"	// Replace the 2nd array entry with the name of the selected gear
			1.2 "prefix"	// Add the name of selected gear before the 2nd array entry
			1.3 "suffix"	// Add the name of selected gear after the 2nd array entry
			1.4 "brackets"	// Add the name of selected gear in brackets after the 2nd array entry
		2. The second string is the string that selected gear will be replaced/amended to.
			Common uses include "armor", "weapon", and "ammunition".
			Only the first instance of the 2nd array entry in the magic item's description will be replaced/amended.


		If this attribute is not present, the sheet will determine it automatically:
		1. How the selected name will be amended will be identical to the 'prefixOrSuffix' attribute.
			If the 'prefixOrSuffix' attribute is not present, it will use "prefix".
		2. The string to amend the name of the selected gear to is determined by type:
			"armor", "weapon", or "ammunition".
	*/
		itemName1stPage : ["prefix", "of Purple"],
	/*	itemName1stPage // OPTIONAL //
		TYPE:	array
		USE:	how the name added to the 1st page should look like

		The resulting name is used to populate the 1st page.
		If this attribute is not present, the sheet will use the name as it
		resulted from the 'prefixOrSuffix' attribute, see above.

		This array must always have 2 entries, each of which is a strings:
		1. The first string determines how the name of the selected gear is added the 2nd array entry.
			This can be one of three options:
			1.1 "prefix"	// Add the name of selected gear before the 2nd array entry
			1.2 "suffix"	// Add the name of selected gear after the 2nd array entry
			1.3 "brackets"	// Add the name of selected gear in brackets after the 2nd array entry
		2. The second string is the string that selected gear will be amended to.
			Use something that makes clear what magic item this concerns.
	*/
	},
/*
	>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Common Attributes >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>

	You can have the magic item affect different parts of the sheet like adding proficiencies,
	adding spellcasting abilities, actions, limited features, etc. etc.

	See the "_common attributes.js" file for documentation on how to do those things and more.
	All attributes in there can directly be added in this object.
*/


/*
	>>>>>>>>>>>>>>>>>>>>>>>
	>>> Composite Items >>>
	>>>>>>>>>>>>>>>>>>>>>>>

	The next part is about the use of the 'choices' attribute, which is optional.
	The 'choices' attribute will allow the magic item to have a subset of options.
	The player will be forced to select one of those options, the item will not be usable without a selection.

	To set up a choice, add the 'choices' attribute, see below, and add an object for each of those choices.
	The object name has to be exactly the same as the string in the 'choices' array, but need to be all lowercase.
*/
	choices : ['Fire', 'Ice'],
/*	choices // OPTIONAL //
	TYPE:	array (variable length)
	USE:	options for the magic item

	The text in the array is presented to the player as options to choose from for what form of the magic item to use.
	The order of this array is used exactly as you write it.
	If you include this attribute, an option will have to be chosen.

	You will have to make a 'choice' object for each item you include in this array.
	To make a choice object, use the exact name of the entry in this array, but lowercase.
	See the below example "fire" for more information.
*/
	selfChoosing : function () {
		return classes.known.cleric ? "fire" : "";
	},
/*	selfChoosing // OPTIONAL //
	TYPE:	function
	USE:	select the 'choice' automatically when the item is added

	If the magic item has the 'choices' attribute, the function in this attribute will be run
	before the player is presented with the choice dialog.
	If this function returns a valid 'choice', that choice will be used and the player will not be prompted.
	A valid choice is any entry from the 'choices' array.

	The above example selects 'fire' if the character has levels in the cleric class,
	but will otherwise leave it up to the player (i.e. it selects nothing).

	This function doesn't get passed any variables.
	This attribute will be ignored if the 'choices' attribute is not present.
	Even with this attribute present, the player can always change the 'choice' using the button on the sheet.
*/

	"fire" : {
	/*	Choice Object Name
		TYPE:	object name
		USE:	this has to be identical to the entry in the 'choices' array that this refers to, but all lowercase

		This is an object within the main MagicItemsList object.
		This object wil be referred to as 'choice' from here on in.
		The parent MagicItemsList object wil be referred to as 'parent' from here on in.
	*/

		name : "Staff of Purple Flame",
	/*	name (inside choice) // OPTIONAL //
		TYPE:	string
		USE:	name of the magic item option as it will be used by the sheet

		If present, this name will be used instead of the name of the parent.
		This name will also be used to recognize what is typed in the magic item drop-down.

		If no name is given, the name of an option will be dynamically generated from
		the parent and this 'choices' entry the choice refers to.
		In this example that would be "Staff of Purple [Fire]"

		IMPORTANT
		The name of an option should be unique, it can't be the same as the parent item.
	*/

		description : "As an action, I can drink this potion or administer it to another to gain the effects of Haste for 1 minute (no concentration required).\rThe potion's yellow fluid is streaked with black and swirls on its own.",
	/*
		>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		>>> MagicItemsList Attributes (inside choice) >>>
		>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

		All the attributes described above can also be used inside a choice object, except:
			'choices'	- you can't have options inside options

		The sheet will look in both choice and parent to determine what attribute to use,
		with the choice being preferred over the parent.

		Most of the time you will want to at least set the description of the choice to
		something different than the parent.

		For example, if the parent has:
			attunement : true,
		but the choice has:
			attunement : false,
		the sheet will not show the attunement checkbox when this choice is selected.

		Another example, if the parent has:
			weight : 1,
		but the choice has no 'weight' defined,
		the sheet will use the weight of 1 lb for the choice.
	*/

	/*
		>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		>>> Common Attributes (inside choice) >>>
		>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

		You can have the magic item sub-choice affect different parts of the sheet as well,
		separate from the main magic item.

		See the "_common attributes.js" file for documentation on how to do those things and more.
		All attributes in there can directly be added in this object.

		Note that all common attributes in the choice object will be in addition to those in the parent object,
		with the exception of things pertaining to the level-dependent limited features.

		LIMITED FEATURES
		'usages', 'additional', 'recovery', 'usagesCalc', and 'limfeaname' will all be
		merged from the choice object into the parent to generate a single limited feature.
	*/
	}
}
