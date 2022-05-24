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

	Subject:	Companion template option

	Effect:		This is the syntax for adding a new companion template option to the sheet,
	        	for use on the companion pages in the Companion Options button on each page.

	Remarks:	You will also need the syntax for adding a creature if you want to change certain
				attributes of a creature, as they are only described there.
	        	You will also need the syntax for common attributes for certain attributes,
				as they are identical as described there and refer to that file.

	Sheet:		v13.1.0 and newer

*/

var iFileName = "Homebrew Syntax - CompanionList.js";
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

RequiredSheetVersion("13.1.0");
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

CompanionList["purple familiar"] = {
/* 	CreatureList object name // REQUIRED //
	TYPE:	string
	USE:	object name of the companion as it will be used by the sheet

	By adding a new object to the existing CompanionList object, we create a new companion option.
	The object name here is 'purple familiar'. You can use any object name as long as it is not already used.
	If you do use an object name that is already in use, you will be overwriting that object.

	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
*/
	name : "Purple Familiar",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the companion option as it will be displayed on the sheet

	This name will be used to populate the Notes field on the companion page, as the header of its attributes.
	This name will not be used in the Companion Options menu, the `nameMenu` will be used instead.
*/
	nameMenu : "Familiar (Purple Familiar class feature)",
/*	nameMenu // REQUIRED //
	TYPE:	string
	USE:	name of the companion option as it will appear in the Companion Options menu

	This name will also be used on several other places, like the changes dialog pop-up or in error messages.
*/
	nameTooltip : "the Purple Familiar class feature",
/*	nameTooltip // OPTIONAL //
	TYPE:	string
	USE:	name of the companion options as it will appear in tooltips for actions on the 1st page

	This attribute is only used if the `action` attribute is present as well.
	If `nameTooltip` is not defined, the `name` attribute will be used instead.
*/
	nameOrigin : "variant of the Find Familiar 1st-level conjuration [ritual] spell",
/*	nameOrigin // OPTIONAL //
	TYPE:	string
	USE:	additional information displayed in the 

	This attribute is added in brackets after the `name` attribute and together with the `source`
	to form the heading in the Notes section of the companion page.

	For example, using these attributes:
		name : "Purple Familiar",
		nameOrigin : "variant of the Find Familiar 1st-level conjuration [ritual] spell",
		source : [["HB", 105], ["Purple", 12]]
	The resulting heading would be:
		"Purple Familiar (variant of the Find Familiar 1st-level conjuration [ritual] spell, HB 105)"
	Note that only the first source option is used that is not set to excluded in the Source Material dialog.
*/
	source : ["SRD", 204],
	source : [["E", 7], ["S", 115]],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the companion option is found

	This attribute is used by the sheet to determine if the companion option should be available
	depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the creature at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 7 of the Elemental Evil Player's Companion and
	on page 115 of the Sword Coast Adventure Guide.

	If a creature is completely homebrew, or you don't want to make a custom source, just put the following:
		source : ["HB", 0],
	"HB" refers to the 'homebrew' source.
*/
	defaultExcluded : true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this companion option should be excluded by default (true) or included by default (false)

	Include this attribute and set it to true if the companion option should appear in the Excluded list
	of the Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.

	This is useful for optional companion options that you wouldn't normally want to use (e.g. playtest or campaign-specific).

	Setting this attribute to false is the same as not including this attribute.
*/
action : [
	["reaction", " (start)"],
	["bonus action", "Shove"]
],
/*	action // OPTIONAL //
	TYPE:	array (variable length)
	USE:	add entry to the "Actions", "Bonus Actions", or "Reactions" section on the 1st page

	The entries in this array must always be arrays with 2 strings each:
	1. The first string in each sub-array is the type of action, written in lowercase.
		The options are "action", "bonus action", or "reaction".
	2. The second string can be one of two things:
		2.1	When the first character of the string is non-alphabetic (e.g. a space or a hyphen), it is amended to the name of the companion option.
			This amended total is then added as an action.
		2.2 When the first character of the string is an alphabetic character (e.g. everything from a-Z), it is not amended to the name of the feature.
			The string is taken as-is and added as an action.
	
	For the tooltip of the origin of these action(s), the `nameTooltip` will be used if
	defined, see above. If `nameTooltip` isn't defined, the `name` will be used instead.
*/
	includeCheck : function(sCrea, objCrea, iCreaCR) {
		return objCrea.type.toLowerCase() === "beast" && objCrea.size >= 3 && iCreaCR <= 1/4 ? true : false;
	},
/*	includeCheck // OPTIONAL //
	TYPE:	function
	USE:	filter things from the list of creatures to create the menu options

	This function is called when the Companion Options button is pressed, to generate
	the menu entries for this companion template option.
	By default, the only creatures that will be displayed in the menu,
	will be those that have the `companion` attribute set to this CompanionList object's name.
	If options should be more dynamic, or if you don't want to alter a bunch of CreatureList entries,
	it is recommended to add this attribute.

	If what the function returns == `true` for an entry, that entry will be added
	to the menu options.
	If the function returns a string, that entry will be added to the menu options and
	that string will be amended to it (e.g. return " (if DM approves)" for a "Cat" to have it "Cat (if DM approves)" in the menu).

	This function is passed three variables:
	1)	sCrea
			A string of the name of the entry in the CreatureList object
	2)	objCrea
			The object of the entry (e.g. CreatureList[sCrea])
	3)	iCreaCR
			The numerical value of the challenge rating of the CreatureList object
			(e.g. 0.25 if the challengeRating attribute is "1/4")

	Only creatures in the CreatureList will be processed, not those added through
	the `creaturesAdd` attribute.

	Note that it is always possible to apply a companion template option to any creature
	on the Companion Page, using the Companion Options button and selecting to change
	the current creature into a template option.

	Even though the `companion` attribute of a CreatureList object can be a string for
	backwards compatibility, the sheet will always correct it and make it into an array
	to make it easier to check against it using this `includeCheck` function.
*/

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Change CreatureList object >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
/*
	When a companion template option is selected, the sheet will create a temporary CreatureList object.
	This object is based on the CreatureList object of the base selected creature (the "Race" dropdown)
	but will be amended with the settings of the CompanionList object.
	Together the two create a new object that will be used to populate the Companion Page.
	You can use the CompanionList object to add, change, or remove attributes of a CreatureList object.
*/
	attributesAdd : {
		header : "Familiar",
		type : ["Celestial", "Fey", "Fiend"],
		attacks : [{
			name : "Acid Spit",
			ability : 2,
			damage : [1, 6, "acid"],
			range : "60 ft",
			description : ""
		}],
	},
/*	attributesAdd // OPTIONAL //
	TYPE:	object containing any attributes of the CreatureList object
	USE:	add or overwrite attributes in the base CreatureList object

	This object can contain almost all attributes of a CreatureList object.
	See the "creature, wild shape option (CreatureList).js" file for all possible attributes.

	When a companion template option is selected, the sheet will create a temporary CreatureList object
	that has all the same attributes of the race's CreatureList object, but will amend it with the selected
	companion template options, if any.
	The sheet will add any attribute of this `attributesAdd` object to the temporary CreatureList object.

	Using the above example, any creature that has this companion template option selected,
	will get the header in the top right set to "Familiar", will have its type changed to a choice of
	"Celestial", "Fey", or "Fiend", and will have the "Acid Spit" attack added to its attack options.

	If the attribute already exists in the base CreatureList object, the attributes will be added together,
	if they are a string or array. See below how that works:

	TYPE               EFFECT
	string             the string will be added to the string, with a comma
	array              the `attributesAdd` array will be added to the end of the CreatureList array
	boolean, function,
	number, or object  the `attributesAdd` version will overwrite the CreatureList version

	EXCEPTIONS
	`attributesAdd` can't contain the following attributes, they will simply not be processed:
		`name`, `nameAlt`, `companionApply`, `saves`, `scores`, `skills`, `source`,
		`eval`, `removeeval`, or `changeeval`
	If `attributesAdd` contains any of the following attributes, they will always overwrite the base:
		`challengeRating`, `header`, `subtype`, `type`, and `wildshapeString`
	
	It is recommended to not include a `calcChanges` this way, but to add it to the main CompanionList object
	instead, see below at `calcChanges`.
*/
	attributesChange : function(sCrea, objCrea) {
		// can't do any attacks
		objCrea.attacks = [];
		if (objCrea.type.toLowerCase() === "beast") {
			objCrea.type = ["Celestial", "Fey", "Fiend"];
			objCrea.subtype = "";
		}
	},
/*	attributesChange // OPTIONAL //
	TYPE:	function
	USE:	change attributes of the temporary CreatureList object

	After the temporary CreatureList object is generated from the base creature and the `attributesAdd`
	attribute (see above), that object is run through this function so attributes can be changed dynamically

	Use this to change things that you can't set using `attributesAdd` (see above. Things like the ones that
	are dependent on other factors (e.g. change subtype only if the base is a certain type),
	or if you need to change a string or array that you don't want to merge.

	The function is passed two variables:
	1) sCrea
		A string of the name of the entry in the CreatureList object
		You can use this to reference the original base creature, i.e. CreatureList[sCrea]
		Don't change attributes of this base creature, but instead change the temporary object, objCrea
	2) objCrea
		The object that you can change the attributes off so they will be applied on the Companion page
*/

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Add text to Notes section >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
	notes : [{
		name : "False Appearance",
		description : "While the purple familiar remains motionless, it is indistinguishable from an ordinary purple flower.",
		joinString : "\n   "
	}, {
		name : "Invisibility",
		minlevel : 5,
		description : "As an action, the purple familiar magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell).",
		addMod : [{ type : "skill", field : "all", mod : "max(oCha|1)", text : "The purple familiar adds its master's Charisma modifier (min 1) to all its skill checks." }]
	}, {
		name : "Keen Sight",
		minlevel : 8,
		description : "The purple familiar has advantage on Wisdom (Perception) checks that rely on sight. It size increases to Large.",
		eval : function(prefix, lvl) {
			// Increase size to Large
			PickDropdown(prefix + "Comp.Desc.Size", 2);
		},
		removeeval : function(prefix, lvl) {
			// Change size back to Medium
			PickDropdown(prefix + "Comp.Desc.Size", 3);
		}
	}],
/*	notes // OPTIONAL //
	TYPE:	array (variable length) with objects
	USE:	add text to the leftmost Notes sections on the Companion page

	This attribute works identical to the `actions` , `features`, and `traits` from the CreatureList object,
	but the entries are added to the left Notes section instead.

	The attribute an array with objects that have at least two attributes, `name` and `description`, that each contain a string.

	Each object can also have the following optional attributes:
		ATTRIBUTE   EXPLANATION
		minlevel    determines at which level the feature is added 
		addMod      add custom modifiers to calculated values
		eval        run a function when added (useful combined with minlevel)
		removeeval  run a function when removed (useful combined with minlevel)
	For a more detailed explanation of these attributes, see below.

	Each name is preceded by a bullet point and, by default, followed by a colon and the description,
	for example:
		{
			name : "Invisibility",
			description : "As an action, the purple familiar magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell)."
		}
	Will result in:
		◆ Invisibility: As an action, the purple familiar magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell).
	
	If you want something else than a colon, you can change it to anything you like by adding the
	`joinString` attribute. For example:
		{
			name : "False Appearance (HB 105)",
			description : "While the purple familiar remains motionless, it is indistinguishable from an ordinary purple flower.",
			joinString : "\n   "
		}
	Will result in:
		◆ False Appearance (HB 105)
		   While the purple familiar remains motionless, it is indistinguishable from an ordinary purple flower.

	If the `description` attribute is not present, no string will be added to the field.
	Any description will do, even an empty string (e.g. description : "").

	As these are added to the Notes section, it shouldn't interfere with any of the
	`traits`, `features`, or `actions` defined by a CreatureList object.

	The array is processed in the order it is in the code, no sorting will take place.
*/

/*	minlevel // OPTIONAL //
	(Part of `notes` object, see above)
	TYPE:	number
	USE:	the level at which to add the note

	This attribute is part of an object in the `notes` arrays, see above.
	Use this if an entry in that array is only supposed to be displayed
	once the main character (the character on the 1st page) reaches a certain level.
	If the main character goes below this level, the entry is removed again.
	The level checked against can be different than the main character level if the
	attribute `minlevelLinked` exists, see the CreatureList syntax.

	Setting this attribute to 1 is the same as not including it.
*/

/*	addMod // OPTIONAL //
	(Part of `notes` object, see above)
	TYPE:	array of objects (variable length)
	USE:	add value to a modifier field

	This attribute will only be processed when the `notes` object is processed,
	which can be influenced using the `minlevel` attribute, see above.

	This attribute works identical to the `addMod` attribute found in the
	"_common attributes.js" file.
	Please look there for a complete explanation.
*/

/*	eval & removeeval // OPTIONAL //
	(Part of `notes` object, see above)
	TYPE:	variable, see the entries for `eval` or `removeeval`
	USE:	variable, see the entries for `eval` or `removeeval`

	These attributes are part of an object in the `notes` arrays, see above.
	These optional attributes function identical to those that share their name.
	They function exactly as described for the main object, but they will only be called when the
	`notes` object is processed, which can be influenced using the `minlevel` attribute, see above.
*/


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Change Companion Page calculations >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
	calcChanges : {
/*	calcChanges // OPTIONAL //
	TYPE:	object (optional attributes)
	USE:	change how the hit points automation works

	The attributes of this object can be `hp` and `setAltHp`.

	Note that `calcChanges` also appears in the list of common attributes,
	but only its `hp` attribute is shared with the object here.

	This object works identical to that present in the CreatureList syntax.
	You could also add a `calcChanges` object to `attributesAdd`, but if you do that
	and the CreatureList object has a `calcChanges` as well, only this version in the CompanionList
	object will be used.
	By adding a `calcChanges` object to the main CompanionList object, both extra hp calculation options
	will be added.
*/
		hp : function (totalHD, HDobj, prefix) {
			if (!classes.known.ranger) return;
			var creaHP = CurrentCompRace[prefix] && CurrentCompRace[prefix].hp ? CurrentCompRace[prefix].hp : 0;
			var creaName = CurrentCompRace[prefix] && CurrentCompRace[prefix].name ? CurrentCompRace[prefix].name : "the creature";
			var rngrLvl = classes.known.ranger.level;
			var rngrCompHp = 4 * rngrLvl;
			HDobj.alt.push( Math.max(creaHP, rngrCompHp) );
			HDobj.altStr.push(" = the highest of either\n \u2022 " + creaHp + " from " + creaName + "'s normal maximum HP, or\n \u2022 4 \xD7 " + rngrLvl + " from four times my ranger level (" + rngrCompHp + ")");
		},
	/*	hp // OPTIONAL //
		TYPE:	function
		USE:	change how Hit Points are calculated and what the Hit Points tooltip says

		This function works identical to the `calcChanges.hp` function found in the
		"_common attributes.js" file.
		Please look there for a complete explanation.
	*/
		setAltHp : true,
	/*	setAltHp // OPTIONAL //
		TYPE:	boolean
		USE:	set the maximum HP field to automatically assume the alternative calculation method added with the `hp` function

		This attribute will only work if you set the `hp` attribute (see above) in the same object.
		Set this attribute to true if you push a value to the HDobj.alt array with the function in the `hp` attribute.

		Setting this attribute to false is the same as not including it.
	*/
	},


// >>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Run custom function >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>> //
	eval : function(prefix, lvl) {
		AddString(prefix + 'Cnote.Left', 'The purple familiar always serves a singular master. If that master gets killed, it will serve the one who killed its master, if any.', true);
	},
/*	eval // OPTIONAL //
	TYPE:	function
	USE:	runs a piece of code when the companion option is selected

	The function is passed two variables:
	1) The first variable is a string: the prefix of the Companion page this companion option was selected on
		You can use this variable to call on fields on that page. The example above uses it to set
		a string to the leftmost Notes section on the Companion page.
	2) The second variable is an array with 2 numbers: the old level and the new level
		e.g. lvl = [0,5] when the companion option gets added and the character is 5th level
		The first entry, the old level, is the level that was passed as the second entry the last time
		this function was called.
		The first entry will be zero (0) as this is only called when the companion option is added for the
		first time.
		The second entry, the new level, is the current main character level.
		The new level passed can be different than the main character level if the attribute
		`minlevelLinked` exists, see the CreatureList syntax.

	This can be any JavaScript you want to have run whenever this companion option is selected.
	This attribute is processed last, after all other attributes are processed, even after the attribute by
	the same name from the CreatureList object has been processed.
*/

	removeeval : function(prefix, lvl) {
		RemoveString(prefix + 'Cnote.Left', 'The purple familiar always serves a singular master. If that master gets killed, it will serve the one who killed its master, if any.', true);
	},
/*	removeeval // OPTIONAL //
	TYPE:	function
	USE:	runs a piece of code when the companion options is removed

	The function is passed two variables:
	1) The first variable is a string: the prefix of the Companion page this companion option was selected on
		You can use this variable to call on fields on that page. The example above uses it to remove
		a string to the leftmost Notes section on the Companion page.
	2) The second variable is an array with 2 numbers: the old level and the new level
		e.g. lvl = [0,5] when the companion option gets added and the character is 5th level
		The first entry, the old level, is the level that the companion option had before being removed.
		The second entry, the new level, will be zero (0) as this is only called when the companion
		option is being removed.

	This can be any JavaScript you want to have run whenever the companion option is removed.
	This attribute is processed last, after all other attributes are processed, even after the attribute by
	the same name from the CreatureList object has been processed.
*/

	changeeval : function(prefix, lvl) {
		Value( prefix + "Comp.Use.HD.Die", lvl[1] < 15 ? 8 : 10 );
	},
/*	changeeval // OPTIONAL //
	TYPE:	function
	USE:	runs a piece of code every time the main character's level changes

	"Main character" refers to the character on the first page.
	A companion doesn't have its own 'level' that is used for the automation.

	The function is passed two variables:
	1) The first variable is a string: the prefix of the Companion page this companion option was selected on
		You can use this variable to call on fields on that page. The example above uses it to set the
		companion option's hit dice size depending on the character's level (d8 or d10, if level 15+).
	2) The second variable is an array with 2 numbers: the old level and the new level
		e.g. lvl = [0,5] when the companion option gets added and the character is 5th level
		The first entry, the old level, is the level that was passed as the second entry the last time
		this function was called.
		The first entry will be zero (0) if the companion option is added for the first time.
		The second entry, the new level, is the current main character level.
		The new level will be zero (0) if the companion option is being removed.
		The new level passed can be different than the main character level if the attribute
		`minlevelLinked` exists, see above.

	This can be any JavaScript you want to have run whenever the level changes.
	This attribute is processed last, after all other attributes have been processed, even after
	the attribute by the same name from the CreatureList object has been processed.
	It is processed both when the companion options is first added to the companion page and
	when the main character's level changes, but not when the companion option is removed.
*/
}
