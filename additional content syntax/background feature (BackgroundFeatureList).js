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

	Subject:	Background Feature

	Effect:		This is the syntax for adding a new background feature to the sheet.

	Remarks:  - You will also need the syntax for adding a background, as a background feature is
				linked to a background with that background's `feature` attribute,
				see "background (BackgroundList).js".
			  - You will also need the syntax for common attributes if you want the background feature
				to do anything besides populating the Background Feature section,
				see "_common attributes.js".
			  - You will also need the syntax for adding a source if you want the background feature
				to have a source that doesn't yet exist in the sheet, see "source (SourceList).js".

	Sheet:		v14.0.5 and above
*/

var iFileName = "Homebrew Syntax - BackgroundFeatureList.js";
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

BackgroundFeatureList["pilgrim's welcome"] = {
/* 	BackgroundFeatureList object name // REQUIRED //
	TYPE:	string (lowercase)
	USE:	object name of the background feature as it will be used by the sheet

	By adding a new object to the existing BackgroundFeatureList object, we create a new background feature.
	The object name here is 'pilgrim's welcome'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].

	NAME OF THE BACKGROUND FEATURE
	A background feature has no `name` or `regExpSearch` attribute. Instead, the object name
	is used for both, so choose it carefully.

	The object name, converted to title case, is used as the name of the background feature
	in the drop-down of the Background Feature field, in the Source Selection dialog, and in
	the tooltip of the Background Feature Description field.
	For example, 'pilgrim's welcome' is shown as "Pilgrim's Welcome" and 'shelter of the faithful'
	as "Shelter of the Faithful".

	RECOGNIZING THE BACKGROUND FEATURE
	The sheet recognizes the background feature if the text in the Background Feature field
	contains the object name, disregarding capitalization.
	For example, both "Pilgrim's Welcome" and "Pilgrim's Welcome (homebrew)" will be recognized as
	this background feature.

	Diacritics are removed from the text in the field before it is compared, so don't use
	them in the object name (e.g. use a plain "e" instead of an accented "é").

	If the text contains the object names of multiple background features, the sheet will use
	the one with the longest object name. If those are equal, it will use the one with the
	newest source.

	LINKING TO A BACKGROUND
	When a background is selected, the sheet puts the `feature` attribute of that background
	in the Background Feature field (see the "background (BackgroundList).js" file).
	So make sure that the `feature` attribute of the related background contains this object name.
*/
	source: ["HB", 0],
	source: [["SRD", 61], ["P", 127]],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the background feature is found

	This attribute is used by the sheet to determine if the background feature should be
	available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the background feature at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 61 of the System Reference Document and
	on page 127 of the Player's Handbook.

	If a background feature is completely homebrew, or you don't want to make a custom source, just put the following:
		source: ["HB", 0],
	"HB" refers to the 'homebrew' source.

	The source is also displayed in the tooltip of the Background Feature Description field.
*/
	defaultExcluded: true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this background feature should be excluded by default (true) or included by default (false)

	Include this attribute and set it to true if the background feature should appear in the Excluded list of the
	Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.

	An excluded background feature is not offered in the drop-down of the Background Feature field
	and is not recognized when its name is in that field, not even when a background that uses it is selected.
	Excluding a background feature doesn't exclude the backgrounds that use it, nor the other way around.

	This is useful for optional background features that you wouldn't normally want to use (e.g. playtest or campaign-specific).

	Setting this attribute to false is the same as not including this attribute.
*/
	description: "Followers of the purple faith recognize me as one of their own. At any shrine or temple of my faith, my companions and I can expect a meal and a place to sleep for free. The clergy of my faith will share news and rumors from along the pilgrim roads with me.",
/*	description // REQUIRED //
	TYPE:	string
	USE:	the text to be filled in the Background Feature Description field on the 2nd page

	Note that the sheet normally uses the first person for this.
	Make sure that this description is not too long and fits in the description field.

	FORMATTING CHARACTERS (since v14.0.0)
	The string can be formatted using the Rich Text formatting characters.
	Text between these formatting characters will be displayed differently.
	The formatting characters are as follows:
		*text*   = italic
		**text** = bold
		_text_   = underlined [doesn't work in tooltips/pop-ups]
		~text~   = strikethrough [doesn't work in tooltips/pop-ups]
		#text#   = Header 1:
		           - bold and theme color (Colourful)
		           - bold and 15% size increase (Printer Friendly)
		##text## = Header 2:
		           - italic, bold, and theme color (Colourful)
		           - italic and bold (Printer Friendly)

	If the sheet is set to use the metric system, the sheet will convert the units in
	this description to metric when it is added.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Attributes That Don't Work For Background Features >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	The following list of attributes are unique to the `BackgroundList` and `BackgroundSubList`.
	If you use them in a `BackgroundFeatureList` object, they will be ignored.
		`feature`, `gold`, `equipleft`, `equipright`, `trait`, `ideal`, `bond`, `flaw`,
		`extra`, `lifestyle`, and `variant`.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Common Attributes >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>

	You can have the background feature affect different parts of the sheet like adding proficiencies,
	adding spellcasting abilities, actions, limited features, etc. etc.

	See the "_common attributes.js" file for documentation on how to do those things and more.
	All attributes in there can directly be added in this object.

	The background feature is applied when it is recognized in the Background Feature field
	and removed when that field changes to something else.
	As the player can change the background feature without changing the background, see
	"BACKGROUND OR BACKGROUND FEATURE" in the background syntax file for which attributes
	to put in the background feature and which to put in the background.

	Most background features don't need any common attributes, as they only provide
	a narrative benefit that is fully explained by the `description`.
*/
};
