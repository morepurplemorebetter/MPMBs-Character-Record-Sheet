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

	Subject:	Background Variant

	Effect:		This is the syntax for adding a new variant to a background that exists in the sheet,
				either a background that is included in the sheet by default or one added by an add-on script.

	Remarks:  - You will also need the syntax for adding a background, as all attributes that a
				background variant can change are explained there, see "background (BackgroundList).js".
			  - You will also need the syntax for adding a background feature if you want the
				variant to have a background feature that doesn't yet exist in the sheet,
				see "background feature (BackgroundFeatureList).js".
			  - You will also need the syntax for common attributes if you want the variant to
				do anything besides what is explained in this file, see "_common attributes.js".
			  - You will also need the syntax for adding a source if you want the variant
				to have a source that doesn't yet exist in the sheet, see "source (SourceList).js".

	Sheet:		v14.0.5 and above
*/

var iFileName = "Homebrew Syntax - BackgroundSubList.js";
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

AddBackgroundVariant("purple pilgrim", "lilac wanderer", {
/*	AddBackgroundVariant // REQUIRED //
	TYPE:	function call with three variables
	USE:	add a background variant to the BackgroundSubList object and link it to its parent background

	This function takes three variables, all of which are required:
	1. string
		The object name of the parent background, as it is used in the BackgroundList object.
		For the backgrounds in the sheet by default, this is:
			"acolyte"
		For a background added by an add-on script, look up the object name in that script.

		The parent background has to exist when this function is run,
		otherwise the function will do nothing.
		So if you add a background and its variants in the same file, add the background first.

	2. string
		The name to use for the object name of the variant.
		This is not displayed anywhere, it is only used by the sheet to refer to the variant.

		The object name of the variant in the BackgroundSubList object will be the object name
		of the parent background, followed by a hyphen and this string, all in lowercase.
		In this example, that is "purple pilgrim-lilac wanderer".
		If the parent background already has a variant with that object name, the function will
		add a number to it (e.g. "purple pilgrim-lilac wanderer-2") so that it doesn't overwrite another variant.

		Because the sheet uses the object name to refer to the variant,
		you shouldn't change this string after publishing your script.

	3. object
		The variant object, which is explained below.
		It starts with the opening bracket `{` at the end of the line above.

	ADDING THE VARIANT TO THE BACKGROUND
	The function will add the object name of the variant to the `variant` attribute of the
	parent background, so you don't have to do that yourself.
	See the `variant` attribute in the "background (BackgroundList).js" file.

	WITHOUT THE FUNCTION
	It is also possible to add a variant by adding it directly to the BackgroundSubList object,
	for example `BackgroundSubList["purple pilgrim-lilac wanderer"] = { ... };`.
	In that case, you have to add the object name to the `variant` attribute of the
	parent background yourself.
	This is not recommended, use the `AddBackgroundVariant()` function instead.
*/
	name: "Lilac Wanderer",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the variant as it will be used by the sheet

	This works identical to the `name` attribute of the BackgroundList object,
	see the "background (BackgroundList).js" file.

	The name of the variant is listed separately in the drop-down of the Background field,
	and replaces the name of the parent background everywhere else while the variant is selected.
	So make sure this name can stand on its own (e.g. "Lilac Wanderer" or "Purple Pilgrim (Lilac Wanderer)").
*/
	regExpSearch: /^(?=.*lilac)(?=.*wanderer).*$/i,
/*	regExpSearch // REQUIRED //
	TYPE:	regular expression
	USE:	used to match the text in the Background field to see if this variant is present

	This works identical to the `regExpSearch` attribute of the BackgroundList object,
	see the "background (BackgroundList).js" file, with the following differences.

	The text in the Background field doesn't have to match the `regExpSearch` of the parent
	background for the variant to be found.
	If the text matches both the variant and its parent background, the variant is used.
	This is why the variant's `regExpSearch` shouldn't match the name of the parent
	background on its own, otherwise selecting the parent background will select the variant instead.
	In this example, the text needs to contain "lilac" and "wanderer", so "Purple Pilgrim"
	doesn't match the variant, but "Purple Pilgrim (Lilac Wanderer)" does.
*/
	source: ["HB", 0],
	source: [["SRD", 60], ["P", 127]],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the variant is found

	This attribute is used by the sheet to determine if the variant should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the variant at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 60 of the System Reference Document and
	on page 127 of the Player's Handbook.

	If a variant is completely homebrew, or you don't want to make a custom source, just put the following:
		source: ["HB", 0],
	"HB" refers to the 'homebrew' source.
*/
	defaultExcluded: true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this variant should be excluded by default (true) or included by default (false)

	Include this attribute and set it to true if the variant should appear in the Excluded list of the
	Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.

	This only excludes the variant, not its parent background.
	The `defaultExcluded` attribute of the parent background is not used for the variant,
	so a variant of a background that is excluded by default is still included by default,
	unless the variant also has this attribute set to true.
	However, as long as the parent background is excluded, the variant is not offered in the
	drop-down of the Background field, see `source` above.

	This is useful for optional variants that you wouldn't normally want to use (e.g. playtest or campaign-specific).

	Setting this attribute to false is the same as not including this attribute.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Replacing Background Attributes >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	A variant can change all attributes of its parent background, except for `variant`.
	These attributes work identical to the attributes of the same name in the BackgroundList
	object, see the "background (BackgroundList).js" file for an explanation of each of them.
	This also applies to common attributes, see "Common Attributes" below.

	If the variant has one of these attributes, that attribute is used instead of the
	attribute of the same name in the parent background, but only while the variant is selected.
	If the variant doesn't have the attribute, the one of the parent background is used.
	So only add these if the variant needs to be different than its parent background.

	An attribute is always replaced as a whole.
	For example, the parent background in the "background (BackgroundList).js" file has
	`equipright` with a robe, a holy symbol, a quarterstaff, and a belt pouch.
	The variant below has `equipright` with only traveler's clothes, a walking stick, and
	a belt pouch, so the variant doesn't have the robe, holy symbol, or quarterstaff,
	because the whole `equipright` array is replaced.
	So if you only want to add to or change part of an attribute, you will have to include
	the complete attribute in the variant.

	REMOVING ATTRIBUTES
	To remove an attribute of the parent background, set it to `null` or an empty string ""
	in the variant.
	For example, `extra: "",` will make it so the variant offers no options for the
	Background Extra field, even though the parent background does.

	BACKGROUND TRAITS
	The `trait`, `ideal`, `bond`, and `flaw` attributes are replaced just like the other attributes.
	While the variant is selected, the "Background Traits" menu shows the lists of the variant
	for those attributes that the variant has, and the lists of the parent background for
	those that the variant doesn't have.
	For example, if the variant only has `ideal`, the menu will show the ideals of the variant
	and the personality traits, bonds, and flaws of the parent background.
*/
	equipright: [
		["Traveler's clothes", "", 4],
		["Walking stick", "", 2],
		["Belt pouch (with coins)", "", 1],
	],
	extra: "",
	lifestyle: "poor",

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Common Attributes >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>

	You can have the variant affect different parts of the sheet like adding proficiencies,
	adding spellcasting abilities, actions, limited features, etc. etc.

	See the "_common attributes.js" file for documentation on how to do those things and more.
	All attributes in there can directly be added in this object.

	REPLACING COMMON ATTRIBUTES OF THE PARENT BACKGROUND
	Common attributes are replaced just like the other attributes, see "Replacing Background
	Attributes" above.
	For example, the parent background in the "background (BackgroundList).js" file has
	`skills: ["Insight", "Religion"]`. The variant below has `skills: ["Insight", "Survival"]`,
	so the variant grants proficiency with Insight and Survival, but not with Religion.
	All other common attributes of the parent background, such as `toolProfs`, still apply.
*/
	skills: ["Insight", "Survival"],
});
