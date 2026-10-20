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

	Subject:	Subclass

	Effect:		This is the syntax for adding a new subclass to a class that exists in the sheet,
				either a class that is included in the sheet by default or one added by an add-on script.

	Remarks:  - You will also need the syntax for class features, as that is explained in its
				own file, see "class features (ClassList & ClassSubList).js".
			  - You will also need the syntax for common attributes if you want the subclass features
				to do anything besides populating the Class Features section, see "_common attributes.js".
			  - You will also need the syntax for adding a class if you want to change attributes of
				the parent class with the subclass, see "class (ClassList).js".
			  - You will also need the syntax for adding a source if you want the subclass
				to have a source that doesn't yet exist in the sheet, see "source (SourceList).js".

	Sheet:		v14.0.8 and above
*/

var iFileName = "Homebrew Syntax - ClassSubList.js";
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

RequiredSheetVersion("14.0.8", "24.0.0");
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

AddSubClass("purplemancer", "violet", {
/*	AddSubClass // REQUIRED //
	TYPE:	function call with three variables
	USE:	add a subclass to the ClassSubList object and link it to its parent class
	RETURNS: string, the object name of the subclass in the ClassSubList object

	This function takes three variables, all of which are required:
	1. string
		The object name of the parent class, as it is used in the ClassList object.
		For the classes in the sheet by default, these are:
			"barbarian", "bard", "cleric", "druid", "fighter", "monk",
			"paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"
		For a class added by an add-on script, look up the object name in that script.

		The parent class has to exist when this function is run,
		otherwise the function will do nothing.
		So if you add a class and its subclasses in the same file, add the class first.

	2. string
		The name to use for the object name of the subclass.
		This is not displayed anywhere, it is only used by the sheet to refer to the subclass.

		The object name of the subclass in the ClassSubList object will be the object name
		of the parent class, followed by a hyphen and this string, all in lowercase.
		In this example, that is "purplemancer-violet".
		If that object name is already in use, the function will add a number to it
		(e.g. "purplemancer-violet-2") so that it doesn't overwrite another subclass.

		The object name of the subclass is used by other things to test for the subclass,
		for example `classes.known.purplemancer.subclass === "purplemancer-violet"`.
		Because of this, you shouldn't change this string after publishing your script.

	3. object
		The subclass object, which is explained below.
		It starts with the opening bracket `{` at the end of the line above.

	ADDING THE SUBCLASS TO THE CLASS
	The function will add the object name of the subclass to the `subclasses` attribute
	of the parent class, so you don't have to do that yourself.
	Don't list the subclass in the `subclasses` attribute of the class yourself, as that
	will cause the subclass to be listed twice, which results in an error.

	SUBCLASS FEATURES
	The function doesn't change anything about the subclass features.
	So make sure that the subclass has a feature for every "subclassfeatureX" placeholder of
	the parent class, see "Subclass Features" below.

	WITHOUT THE FUNCTION
	It is also possible to add a subclass by adding it directly to the ClassSubList object,
	for example `ClassSubList["purplemancer-violet"] = { ... };`.
	In that case, you have to add the object name to the `subclasses` attribute of the
	parent class yourself.
	This is not recommended, use the `AddSubClass()` function instead.
*/
	regExpSearch: /violet/i,
	regExpSearch: /^(?=.*violet)(?=.*(order|purplemancer|violetmancer)).*$/i,
/*	regExpSearch // REQUIRED //
	TYPE:	regular expression
	USE:	used to match the text in the class field to see if this subclass is present

	This works similar to the `regExpSearch` attribute of the ClassList object, see the
	"class (ClassList).js" file, with the following differences.

	FINDING THE SUBCLASS
	The sheet first looks for a matching class. If the text in the Class field matches
	the `regExpSearch` of a class, the sheet only looks at the subclasses of that class.
	If no class matches, the sheet looks at the subclasses of all classes instead.
	This is how a subclass with a `fullname` that doesn't include the name of the class,
	like the "Berserker" for the Barbarian, is still recognized.

	If multiple subclasses match the text in the class field, the sheet will use the one
	with the longest `subname`. If those are equal, it will use the one with the newest source.

	MATCHING THE NAME DISPLAYED IN THE CLASS FIELD
	The `regExpSearch` has to match the name that the sheet puts in the Class field when
	the subclass is selected from the subclass selection dialog.
	That name is the `fullname`, see below, or, if the subclass doesn't have a `fullname`,
	the `name` of the class followed by the `subname` in brackets.
	In this example, that would be "Violetmancer" or "Purplemancer (Order of the Violet)".
	If the `regExpSearch` doesn't match this name, the subclass will not be offered in
	the subclass selection dialog.

	Be careful not to make the `regExpSearch` match too broadly.
	In this example, the first `regExpSearch` matches any text with the word "violet",
	while the second one also needs "order", "purplemancer", or "violetmancer" to be present.
*/
	subname: "Order of the Violet",
/*	subname // REQUIRED //
	TYPE:	string
	USE:	name of the subclass as it will be used by the sheet

	This name is used in the subclass selection dialog and in the Source Selection dialog.
	If the subclass doesn't have a `fullname`, see below, this name is also used for the
	name of the class and subclass combined, for example "Purplemancer (Order of the Violet)".
*/
	subnameShort: "Violet",
/*	subnameShort // OPTIONAL //
	TYPE:	string
	USE:	short name of the subclass to use in the Class Features section

	This works identical to the `nameShort` attribute of the ClassList object,
	see the "class (ClassList).js" file, but for subclass features.
	Each subclass feature that is added to the Class Features section gets a reference of
	the subclass and level it was gained at, for example "(Order of the Violet 3, HB 0)".
	If this attribute is present, it will be used instead of the `subname` for that reference,
	resulting in, for example, "(Violet 3, HB 0)".

	This attribute is only useful for subclasses with a long name.
	Setting this to "" is the same as not including this attribute.
*/
	fullname: "Violetmancer",
/*	fullname // OPTIONAL //
	TYPE:	string
	USE:	name of the class and subclass combined, as it will be used by the sheet

	Use this if the class with this subclass has its own name, like the
	Berserker for the Barbarian's Path of the Berserker.

	When the subclass is selected from the subclass selection dialog, this name will
	replace the name of the class in the Class field, instead of the `subname` being added
	to it. Thus, make sure that the `regExpSearch` matches this name, see above.

	This name is also used by the sheet to refer to the class with its subclass,
	for example on the spell sheet and in the Notes section.

	If this attribute is not present, the sheet will use the `name` of the class followed
	by the `subname` in brackets instead, for example "Purplemancer (Order of the Violet)".
*/
	source: ["HB", 0],
	source: [["SRD", 25], ["P", 74]],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the subclass is found

	This attribute is used by the sheet to determine if the subclass should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the subclass at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 25 of the System Reference Document
	and on page 74 of the Player's Handbook.

	If a subclass is completely homebrew, or you don't want to make a custom source, just put the following:
		source: ["HB", 0],
	"HB" refers to the 'homebrew' source.
*/
	defaultExcluded: true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this subclass should be excluded by default (true) or included by default (false)

	This works identical to the `defaultExcluded` attribute of the ClassList object,
	see the "class (ClassList).js" file.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Replacing Class Attributes >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	A subclass can change most of the attributes of its parent class.
	If the subclass has one of the attributes listed below, that attribute is used instead
	of the attribute of the same name in the parent class, but only while the subclass is selected.
	If the subclass doesn't have the attribute, the one of the parent class is used.
	So only add these if the subclass needs to be different than its parent class.

	All these attributes work identical to the attributes of the same name in the ClassList
	object. See the "class (ClassList).js" file for an explanation of each of them.

	ATTRIBUTE							NOTES
	die
	improvements
	saves								only used if the class is the primary class
	skills								see "PRIMARY & SECONDARY ATTRIBUTES" below
	skillstxt							see "PRIMARY & SECONDARY ATTRIBUTES" below
	toolProfs							see "PRIMARY & SECONDARY ATTRIBUTES" below
	armorProfs							see "PRIMARY & SECONDARY ATTRIBUTES" below
	weaponProfs							see "PRIMARY & SECONDARY ATTRIBUTES" below
	equipment							only used if the class is the primary class
	attacks
	abilitySave
	abilitySaveAlt
	spellcastingFactor					see "SPELLCASTING" below
	spellcastingFactorRoundupMulti		see "SPELLCASTING" below
	spellcastingTable					see "SPELLCASTING" below
	spellcastingKnown					see "SPELLCASTING" below
	spellcastingList					see "SPELLCASTING" below
	spellcastingAbility					see "SPELLCASTING" below
	spellcastingExtra					see "SPELLCASTING" below
	spellcastingExtraApplyNonconform	see "SPELLCASTING" below

	An attribute is always replaced as a whole.
	For example, if the class has `spellcastingKnown: { cantrips: [2], spells: "list", prepared: true }`
	and the subclass has `spellcastingKnown: { cantrips: [3] }`, the class will no longer have
	the `spells` and `prepared` attributes, because the whole `spellcastingKnown` object is replaced.

	ATTRIBUTES THAT CAN'T BE REPLACED
	The following attributes of the parent class can't be changed by the subclass:
		`name`, `primaryAbility`, `prereqs`, `prereqeval`, `prestigeClassPrereq`,
		`subclasses`, and `subclassGainedLevel`.
	The `features` attribute is not replaced, but combined with that of the class, see below.

	USE FEATURES FOR THINGS GAINED AT A LEVEL
	The attributes in this section apply as soon as the subclass is selected and apply to
	all class levels, as if the class had them from level 1.
	If the subclass grants something at a certain level, like proficiency with Heavy armor
	at level 3, don't use these attributes.
	Instead, add the proficiency using the common attributes in a subclass feature, as that
	is added in addition to what the class grants and only from the `minlevel` of that feature.
	See the "_common attributes.js" file.
*/
	die: 8,
	abilitySave: 5,
	armorProfs: {
		primary: [true, true, true, true],
		secondary: [false, false, true, false],
	},
/*	PRIMARY & SECONDARY ATTRIBUTES
	The attributes `skills`, `skillstxt`, `toolProfs`, `armorProfs`, and `weaponProfs` are
	objects with a `primary` and a `secondary` attribute, see the "class (ClassList).js" file.
	For these, the `primary` and `secondary` attributes are replaced separately.

	In the example above, the subclass replaces both the `primary` and `secondary` armour
	proficiencies of the class.
	If the subclass only had the `secondary` attribute, the `primary` attribute of the class
	would still be used.

	Note that the subclass is normally selected after the class is already applied.
	At that point, the sheet removes those proficiencies of the class that the subclass
	replaces and adds those of the subclass.
*/
	spellcastingFactor: 3,
	spellcastingKnown: {
		cantrips: [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		spells: [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13],
	},
	spellcastingList: {
		"class": "wizard",
		school: ["Abjur", "Evoc"],
		level: [0, 4],
	},
/*	SPELLCASTING
	The spellcasting attributes can be used to make a subclass of a class that isn't a
	spellcaster into one (like the Eldritch Knight subclass of the Fighter), or to change the
	spellcasting of a class that is a spellcaster.
	See the "Spellcasting" section in the "class (ClassList).js" file for how these work.

	SUBCLASS OF A CLASS THAT ISN'T A SPELLCASTER
	As with a class, the subclass needs the `spellcastingFactor` attribute for the sheet to
	consider it a spellcaster. Without it, the other spellcasting attributes do nothing.

	If the subclass doesn't have the `spellcastingList` attribute, the sheet will use all
	spells that have the object name of the parent class in their `classes` attribute, just
	like it does for a class without the `spellcastingList` attribute.
	Since a class that isn't a spellcaster normally has no spells, you will want to add the
	`spellcastingList` attribute to the subclass, like in the example above.

	When the parent class isn't a spellcaster, the spell sheet will use the `fullname` or,
	if that isn't present, the `subname` of the subclass to refer to its spells.

	ADDING SPELLS FOR A SPELLCASTING CLASS
	If the subclass grants extra spells to a class that is already a spellcaster, like the
	domain spells of a Cleric subclass, you will normally want to add them with the
	`spellcastingExtra` common attribute in a subclass feature instead.
	That way, the spells are only added from the `minlevel` of that feature.
	See the "_common attributes.js" file.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Subclass Features >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>
*/
	features: {
/*	features // REQUIRED //
	TYPE:	object with objects
	USE:	the features of the subclass that are gained as the class levels up

	Each attribute of this object is a subclass feature, which is in itself an object.
	You can add as many subclass features as you want.

	SYNTAX OF SUBCLASS FEATURES
	The syntax for a subclass feature object is explained in its own file:
		"class features (ClassList & ClassSubList).js"
	Class features and subclass features use the exact same syntax, which is why it is in
	a separate file that both the ClassList and ClassSubList syntax refer to.

	CLASS FEATURES AND SUBCLASS FEATURES
	Contrary to the attributes in the section above, the `features` of the subclass doesn't
	replace the `features` of the class. Instead, the sheet combines the features of the
	class with those of the subclass. In short:
		- A subclass feature with an object name that the class doesn't have is added in
		  addition to the features of the class.
		- A subclass feature with the exact same object name as a class feature replaces
		  that class feature. For object names that don't start with "subclassfeature",
		  this only works for the class levels after the subclass is selected.
		- The class has one or more placeholder features with an object name that starts
		  with "subclassfeature" (e.g. "subclassfeature3"). The subclass needs to have a
		  feature with the same object name for each of those, so that it replaces the
		  placeholder. Look in the code of the parent class to see which placeholders it has.
		  For the classes in the sheet by default, the placeholder is named after the level
		  the subclass is gained at (e.g. "subclassfeature3" for the Fighter).
	See "CLASS FEATURES AND SUBCLASS FEATURES" in the class features syntax file for a
	complete explanation.

	OBJECT NAMES
	It is customary to name every subclass feature "subclassfeatureX", with the X being
	the level the feature is gained at, for example "subclassfeature3" and "subclassfeature6".
	This makes sure that the subclass features never accidentally replace a class feature
	and that the first subclass feature replaces the placeholder of the class.
	Use a decimal (e.g. "subclassfeature3.1") if the subclass grants multiple features at
	the same level.
*/
		"subclassfeature3": {
			name: "Violet Bolt",
			source: ["HB", 0],
			minlevel: 3,
			description: desc("As an action, I can make a ranged spell attack that deals 2d8 force damage on a hit"),
			action: [["action", ""]],
		},
		"subclassfeature3.1": {
			name: "Violet Armor",
			source: ["HB", 0],
			minlevel: 3,
			description: desc("I gain proficiency with heavy armor"),
			armorProfs: [false, false, true, false],
		},
		"subclassfeature6": {
			name: "Violet Ward",
			source: ["HB", 0],
			minlevel: 6,
			description: desc("I have resistance to psychic damage"),
			dmgres: ["Psychic"],
		},
	},
});
