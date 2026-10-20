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

	Subject:	Background

	Effect:		This is the syntax for adding a new background to the sheet.

	Remarks:  - You will also need the syntax for adding a background feature, as that is explained
				in its own file, see "background feature (BackgroundFeatureList).js".
			  - You will also need the syntax for common attributes if you want the background
				to do anything besides what is explained in this file, see "_common attributes.js".
			  - You will also need the syntax for adding a background variant if you want the
				background to have any variants, see "background variant (BackgroundSubList).js".
			  - You will also need the syntax for adding a source if you want the background
				to have a source that doesn't yet exist in the sheet, see "source (SourceList).js".

	Sheet:		v14.0.5 and above
*/

var iFileName = "Homebrew Syntax - BackgroundList.js";
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

BackgroundList["purple pilgrim"] = {
/* 	BackgroundList object name // REQUIRED //
	TYPE:	string (lowercase)
	USE:	object name of the background as it will be used by the sheet

	By adding a new object to the existing BackgroundList object, we create a new background.
	The object name here is 'purple pilgrim'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].

	The object name of the background is used by other things to refer to the background,
	for example the `AddBackgroundVariant()` function (see "background variant (BackgroundSubList).js").
	Because of this, you shouldn't change the object name after publishing your script.
*/
	name: "Purple Pilgrim",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the background as it will be used by the sheet

	This name is used in the drop-down of the Background field, in the Source Selection dialog,
	and in the tooltips and pop-up dialogs that refer to the background.

	The length of this name is also used to determine which background to use if multiple
	backgrounds match the text in the Background field, see `regExpSearch` below.
*/
	regExpSearch: /^(?=.*purple)(?=.*pilgrim).*$/i,
/*	regExpSearch // REQUIRED //
	TYPE:	regular expression
	USE:	used to match the text in the Background field to see if this background is present

	This has to be a match for the `name` given earlier, or the background will never be recognized.
	Now it looks for any entry that has both the words "purple" and "pilgrim" in it,
	disregarding capitalization or word order.
	If this looks too complicated, or you want to match only a single word, just write:
		regExpSearch: /pilgrim/i,

	Diacritics are removed from the text in the Background field before testing against this regular
	expression, so don't use them in it (e.g. use a plain "e" instead of an accented "é").

	If multiple backgrounds match the text in the Background field, the sheet will use the one
	with the longest `name`. If those are equal, it will use the one with the newest source.
	The variants of a background (see `variant` below) are included in this comparison.

	Be careful not to make the `regExpSearch` match too broadly.
	For example, a Soldier background could use the following, so that it doesn't match "Mercenary Soldier":
		regExpSearch: /^(?!.*mercenary)(?=.*soldier).*$/i,
*/
	source: ["HB", 0],
	source: [["SRD", 60], ["P", 127]],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the background is found

	This attribute is used by the sheet to determine if the background should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the background at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 60 of the System Reference Document and
	on page 127 of the Player's Handbook.

	If a background is completely homebrew, or you don't want to make a custom source, just put the following:
		source: ["HB", 0],
	"HB" refers to the 'homebrew' source.
*/
	defaultExcluded: true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this background should be excluded by default (true) or included by default (false)

	Include this attribute and set it to true if the background should appear in the Excluded list of the
	Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.

	This is useful for optional backgrounds that you wouldn't normally want to use (e.g. playtest or campaign-specific).

	Setting this attribute to false is the same as not including this attribute.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Background Feature >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
	feature: "Pilgrim's Welcome",
/*	feature // OPTIONAL //
	TYPE:	string
	USE:	the name of the background feature to put in the Background Feature field

	When the background is selected, this string is put in the Background Feature field on the 2nd page.
	The sheet then looks for a matching BackgroundFeatureList entry and, if found, fills the
	description of the feature and applies its attributes.
	See "background feature (BackgroundFeatureList).js" for how to add a background feature.
	Make sure that this string contains the object name of the background feature
	(disregarding capitalization), otherwise the background feature will never be recognized.

	When the background is removed, the Background Feature field is cleared, but only if it
	still contains this exact string.

	If the background has no feature, you can leave this attribute out.
*/

/*
	>>>>>>>>>>>>>>>>>
	>>> Equipment >>>
	>>>>>>>>>>>>>>>>>

	The starting equipment of the background is not added to the sheet automatically.
	It is offered as the option "[background name]'s items and gold" in the menu of the
	"Add Equipment" button of the Equipment section on the 2nd page.
	Selecting that option adds the `gold`, `equipleft`, and `equipright` of the background,
	see below.

	The menu option is available as soon as a background is recognized, regardless of
	whether it has any of these attributes.
*/
	gold: 15,
/*	gold // OPTIONAL //
	TYPE:	number
	USE:	number of gold pieces to add to the "GP" field

	This number is added to whatever is already in the "GP" field.
*/
	equipleft: [
		["Book (prayers)", "", 5],
		["Parchment, sheets of", 10, ""],
	],
/*	equipleft // OPTIONAL //
	TYPE:	array of arrays with 3 entries each
	USE:	items to add to the left column of the Equipment section

	Each sub-array is a single line in the Equipment section, with the entries:
	1. String with the name of the item
	2. Number with the amount of the item, or "" for no amount (i.e. just 1)
	3. Number with the weight of a single item in lb, or "" for no weight
*/
	equipright: [
		["Robe", "", 4],
		["Holy symbol (amethyst)", "", 1],
		["Quarterstaff", "", 4],
		["Belt pouch (with coins)", "", 1],
	],
/*	equipright // OPTIONAL //
	TYPE:	array of arrays with 3 entries each
	USE:	items to add to the right column of the Equipment section

	This works identical to `equipleft`, see above.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Background Traits >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>

	The next four attributes (`trait`, `ideal`, `bond`, and `flaw`) are lists of options to
	select from with the "Background Traits" menu. That menu is opened with a button on the
	2nd page and fills the Personality Trait, Ideal, Bond, and Flaw fields on that page.

	The menu only shows the options of the background that is currently recognized in the
	Background field (including those of its variant, if any).
	It always has a submenu for each of the four fields, so if the background doesn't have
	one of these attributes, that submenu will be empty.
	Thus, it is recommended to include all four of these attributes.

	Each of these lists can be of any length.

	FORMATTING CHARACTERS (since v14.0.0)
	The string can be formatted using the Rich Text formatting characters.
	In the menu, the formatting characters are removed.
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
*/
	trait: [
		"I always have a plan for what to do when things go wrong.",
		"I am always calm, no matter the situation. I never raise my voice or let my emotions control me.",
		"I would rather make a new friend than a new enemy.",
		"I blow up at the slightest insult.",
	],
/*	trait // OPTIONAL //
	TYPE:	array of strings (variable length)
	USE:	options for the Personality Trait field

	Selecting an option from the menu adds it to whatever is already in the Personality Trait
	field, as a character normally has two personality traits.
*/
	ideal: [
		"**Tradition**. The age-old institutions of devotion and forfeiture must be sustained and maintained. (Lawful)",
		"**Charity**. I always attempt to assist those in need, regardless of the personal cost. (Good)",
		["Change", "Change: We must help induce the developments the gods are continually cultivating in the world. (Chaotic)"],
	],
/*	ideal // OPTIONAL //
	TYPE:	array of strings (variable length)
	USE:	options for the Ideal field

	Selecting an option from the menu replaces whatever is in the Ideal field.

	It is customary to start each ideal with the name of the ideal in bold,
	followed by a period, and to end with the alignment in brackets, as in the first two
	entries of the example above.

	ARRAY WITH NAME AND TEXT
	An entry can also be an array with two strings, as in the third entry of the example above.
	This is the format used by the backgrounds that are included in the sheet:
	1. string
		The name of the ideal.
	2. string
		The full text of the ideal, starting with the name of the ideal followed by a colon.
	The sheet converts this to the bold name format, e.g. "**Change**. We must help ...".
*/
	bond: [
		"I would sacrifice anything to recover a long lost ancient relic of my temple (or faith).",
		"I can never repay what I owe to the priest that took me in as an orphan.",
		"Everything I do is for those less fortunate.",
	],
/*	bond // OPTIONAL //
	TYPE:	array of strings (variable length)
	USE:	options for the Bond field

	Selecting an option from the menu replaces whatever is in the Bond field.
*/
	flaw: [
		"I hold others to a high standard, and myself even higher.",
		"I am very stubborn in my thinking.",
		"I am pessimistic and distrustful of strangers.",
	],
/*	flaw // OPTIONAL //
	TYPE:	array of strings (variable length)
	USE:	options for the Flaw field

	Selecting an option from the menu replaces whatever is in the Flaw field.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Other Background Fields >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
	extra: [
		"Select a Pilgrimage Destination",
		"Amethyst Abbey",
		"Lavender Lighthouse",
		"Violet Vale",
	],
/*	extra // OPTIONAL //
	TYPE:	array of strings (variable length)
	USE:	options for the Background Extra drop-down field on the 1st page

	The first entry in the array is not an option, but the text to use as the tooltip of
	the Background Extra field. The background's name is added to that tooltip automatically.
	All other entries are the options of the drop-down, of which the player can select one.

	The options are not applied automatically, the player has to select one.
	Make sure that the options fit in the field, which is not very wide.

	If the background has no extra options, leave this attribute out.
	The player can always type anything they want in the Background Extra field,
	they aren't limited to what is set here and can also leave the field empty.
*/
	lifestyle: "modest",
/*	lifestyle // OPTIONAL //
	TYPE:	string
	USE:	the lifestyle to set in the Lifestyle field on the 2nd page

	This has to be one of the following, written in lowercase:
		"wretched", "squalid", "poor", "modest", "comfortable", "wealthy", or "aristocratic"

	When the background is removed, the Lifestyle field is cleared, but only if it
	still contains this lifestyle.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Common Attributes >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>

	The attributes in this section are all common attributes and work identical to
	those by the same name in the "_common attributes.js" file.
	Please look there for a complete explanation of what you can enter.

	The attributes in this section are only listed because almost every background uses them.
	All common attributes can be used in a BackgroundList object, see "_common attributes.js".

	You can have the background affect different parts of the sheet like adding proficiencies,
	adding spellcasting abilities, actions, limited features, etc. etc.

	See the "_common attributes.js" file for documentation on how to do those things and more.
	All attributes in there can directly be added in this object.

	BACKGROUND OR BACKGROUND FEATURE
	Both the background and its background feature can have common attributes.
	The difference is that the player can change the background feature to something else
	without changing the background (e.g. to use a feature from a different background).
	Thus, add common attributes that belong to the background itself (like the skill proficiencies)
	to the background and those that belong to the feature (like an action or a limited use
	that the feature grants) to the background feature.
*/
	skills: ["Insight", "Religion"],
/*	skills // OPTIONAL //
	TYPE:	array (variable length)
	USE:	add skill proficiency and expertise on the 1st page

	This works identical to the `skills` attribute found in the "_common attributes.js" file.
*/
	skillstxt: "Choose two from Deception, Insight, Persuasion, and Stealth",
/*	skillstxt // OPTIONAL //
	TYPE:	string
	USE:	description of skill proficiencies and skill proficiency choices gained, to use in the tooltips of skills

	This works identical to the `skillstxt` attribute found in the "_common attributes.js" file.
*/
	toolProfs: [["Calligrapher's Supplies", "Dex"]],
	toolProfs: [["Gaming Set", 1]],
/*	toolProfs // OPTIONAL //
	TYPE:	array (variable length)
	USE:	add tool proficiencies

	This works identical to the `toolProfs` attribute found in the "_common attributes.js" file.
	The first example adds proficiency with a specific tool and lists it in the skill section
	on the 1st page, while the second example adds a choice of one type of gaming set.
*/
	languageProfs: [1, "Elvish"],
/*	languageProfs // OPTIONAL //
	TYPE:	array (variable length)
	USE:	add language proficiencies

	This works identical to the `languageProfs` attribute found in the "_common attributes.js" file.
	The example above adds Elvish and one language of the player's choice.
	For a background that only grants a choice of languages, like the Acolyte's
	two languages of choice, use just a number:
		languageProfs: [2],
*/

/*
	>>>>>>>>>>>>>>>>
	>>> Variants >>>
	>>>>>>>>>>>>>>>>
*/
	variant: ["purple pilgrim-lilac wanderer"],
	variant: [],
/*	variant // OPTIONAL //
	TYPE:	array of strings (variable length)
	USE:	the BackgroundSubList entries that are variants of this background

	Each entry is the object name of a BackgroundSubList entry.
	The names have to match the object names in the BackgroundSubList object exactly.
	See the "background variant (BackgroundSubList).js" file for how to add a variant.

	IMPORTANT
	Do not list variants here that are added using the `AddBackgroundVariant()` function!
	The `AddBackgroundVariant()` function will add the variant to this array by itself,
	and will even create this attribute if it doesn't exist.
	As using the `AddBackgroundVariant()` function is the recommended way to add a variant,
	you will normally want to leave this attribute out.
*/
};
