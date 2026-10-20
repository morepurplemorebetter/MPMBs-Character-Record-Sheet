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

	Subject:	Class

	Effect:		This is the syntax for adding a new class to the sheet.

	Remarks:  - You will also need the syntax for class features, as that is explained in its
				own file, see "class features (ClassList & ClassSubList).js".
			  - You will also need the syntax for common attributes if you want the class features to
				do anything besides populating the Class Features section, see "_common attributes.js".
			  - You will also need the syntax for the common spell list object if you want the class to
				have a spell list other than all spells that list the class, see "_common spell list object.js".
			  - You will also need the syntax for adding a subclass if you want the class to have
				any choices for subclasses, see "class subclass (ClassSubList).js".
			  - You will also need the syntax for adding a source if you want the class
				to have a source that doesn't yet exist in the sheet, see "source (SourceList).js".

	Sheet:		v14.0.8 and above
*/

var iFileName = "Homebrew Syntax - ClassList.js";
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

ClassList["purplemancer"] = {
/* 	ClassList object name // REQUIRED //
	TYPE:	string (lowercase)
	USE:	object name of the class as it will be used by the sheet

	By adding a new object to the existing ClassList object, we create a new class.
	The object name here is 'purplemancer'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
*/
	name: "Purplemancer",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the class as it will be used by the sheet
*/
	nameShort: "Purplem.",
/*	nameShort // OPTIONAL //
	TYPE:	string
	USE:	short name of the class to use in the Class Features section

	Each class feature that is added to the Class Features section gets a reference of
	the class and level it was gained at, for example "(Purplemancer 3, PHB 91)".
	If this attribute is present, it will be used instead of the `name` for that reference,
	resulting in, for example, "(Purplem. 3, PHB 91)".

	This attribute is only useful for classes with a long name.
	Setting this to "" is the same as not including this attribute.
*/
	regExpSearch: /^(?=.*purple)(?=.*mancer).*$/i,
/*	regExpSearch // REQUIRED //
	TYPE:	regular expression
	USE:	used to match the text in the class field to see if this class is present

	This has to be a match for the name given earlier, or the class will never be recognized.
	Now it looks for any entry that has both the words "purple" and "mancer" in it,
	disregarding capitalization or word order.
	If this looks too complicated, or you want to match only a single word, just write:
		regExpSearch: /purplemancer/i,

	If multiple classes match the text in the class field, the sheet will use the one with
	the longest `name`. If those are equal, it will use the one with the newest source.
*/
	source: ["SRD", 30],
	source: [["E", 7], ["S", 115]],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the class is found

	This attribute is used by the sheet to determine if the class should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the class at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 7 of the Elemental Evil Player's Companion and
	on page 115 of the Sword Coast Adventure Guide.

	If a class is completely homebrew, or you don't want to make a custom source, just put the following:
		source: ["HB", 0],
	"HB" refers to the 'homebrew' source.
*/
	defaultExcluded: true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this class should be excluded by default (true) or included by default (false)

	Include this attribute and set it to true if the class should appear in the Excluded list of the
	Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.

	Note that if a class is excluded, none of its subclasses will be accessible either.

	This is useful for optional classes that you wouldn't normally want to use (e.g. playtest or campaign-specific).

	Setting this attribute to false is the same as not including this attribute.
*/
	primaryAbility: "Strength or Dexterity",
/*	primaryAbility // REQUIRED //
	TYPE:	string
	USE:	abilities that are essential to the class to be displayed in the Ability Scores dialog

	This string is shown as-is, preceded by the name of the class.
	Don't include the name of the class, a line break, a bullet point, or a trailing punctuation.

	If there are no essential abilities, just put an empty string:
		primaryAbility: "",
*/
	prereqs: "Strength 13 or Dexterity 13",
/*	prereqs // OPTIONAL //
	TYPE:	string
	USE:	prerequisite abilities to multiclass in the class, to be displayed in the Ability Scores dialog when multiclassing

	This string is shown as-is, preceded by the name of the class.
	Don't include the name of the class, a line break, a bullet point, or a trailing punctuation.

	When the character has more than one class, this string is displayed instead of
	the `primaryAbility` string.
	The sheet does not test if the character meets these prerequisites, see `prereqeval`
	below if you want that to happen.
*/
	prereqeval: function (v) {
		return What("Str") >= 13 || What("Dex") >= 13;
	},
	prereqeval: "What('Str') >= 13 || What('Dex') >= 13",
/*	prereqeval // OPTIONAL //
	TYPE:	function or, for backwards-compatibility, string that is evaluated using eval()
	USE:	this should return `true` if the prerequisite is met or `false` otherwise

	Both examples do the exact same thing, just one is a string and the other is a function.
	Writing a function is better as it is easier to avoid syntax errors and will run faster.
	The string option is there for backwards-compatibility and this explanation assumes you are writing a function.

	This is tested whenever the classes or class levels of the character change,
	but not when the sheet is opened, reset, or when importing from another sheet.
	Depending on what the function returns, the following will happen:
		RETURNS		RESULT
		true		The class is applied normally.
		false		The player is asked whether or not to apply the class anyway.
					If the player declines, the levels of the class will still count towards
					the total character level, but none of its features will be added.
		"skip"		The class is not applied and the player is not prompted.
					The levels of the class will still count towards the total character level.

	The function is fed one variable, v, an object containing attributes with information about the character.
	Changing these attributes does nothing, but you can use them to test if the character meets the requirements.
	This object has all the attributes that are explained for the `prereqeval` attribute in
	the "feat (FeatsList).js" syntax file, except for `choice`.
	In addition to those, it has the following attributes when called for a class:
	var v = {
		class,		// string; the object name of this class (e.g. "purplemancer")
		subclass,	// string; the object name of the selected subclass (empty string if no subclass)
		classlevel,	// number; the level in this class that is being applied
	}

	Other than using the 'v' variable, this function can be any JavaScript you want.

	If the `prestigeClassPrereq` attribute is also present, see below, this attribute will be ignored.
*/
	prestigeClassPrereq: 5,
	prestigeClassPrereq: function (v) {
		return classes.known.wizard && classes.known.wizard.level >= 5;
	},
/*	prestigeClassPrereq // OPTIONAL //
	TYPE:	number, function, or, for backwards-compatibility, string that is evaluated using eval()
	USE:	signal that this is a prestige class and what is required to gain levels in it

	If this attribute is present, the sheet will consider the class to be a prestige class.
	A prestige class can never be the primary class of a character.
	This means that the sheet will only ever use the `secondary` proficiencies of the
	class (see `skills`, `toolProfs`, `armorProfs`, and `weaponProfs` below) and will never
	use its `saves` or `equipment` attributes.

	This attribute can be one of two things:
	1. number
		The number of levels the character must have in other classes before being able
		to gain levels in this class.
	2. function (or string)
		This works identical to the `prereqeval` attribute, see above.

	If the prerequisite is not met, the player is asked whether or not to apply the class anyway.
*/
	die: 10,
/*	die // REQUIRED //
	TYPE:	number
	USE:	number of the type of hit die the class has (i.e. 10 means d10)

	You can't have multiple HD for a class (2d6 per level is not possible).
*/
	improvements: [0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7],
/*	improvements // REQUIRED //
	TYPE:	array of numbers (variable length)
	USE:	total number of Ability Score Improvements gained at each class level

	Each entry in the array is the cumulative total for that class level,
	i.e. the number of Ability Score Improvements the class has given up to and including that level.
	The first entry is for level 1, the second entry for level 2, etc.
	Normally this is an array of 20 entries, one for each level, but you can have more or less.
	If the class level is higher than the array is long, the last entry in the array is used.

	This total is displayed in the Ability Scores dialog and its tooltip.
	It doesn't add anything to the sheet automatically, the player has to select a feat
	or change the ability scores manually.

	This example uses the Fighter's progression.
	If the class doesn't get any improvements, just put the following:
		improvements: [0],
*/
	saves: ["Str", "Con"],
/*	saves // OPTIONAL //
	TYPE:	array (variable length)
	USE:	set saving throw proficiencies on the 1st page if this is the primary class

	This works identical to the `saves` attribute found in the "_common attributes.js" file.
	Please look there for a complete explanation.

	The only difference is that these saving throw proficiencies are only granted if
	this class is the primary class of the character (i.e. the first one in the class field).
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Primary & Secondary Attributes >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	The next five attributes (`skills`, `skillstxt`, `toolProfs`, `armorProfs`, and `weaponProfs`)
	are all objects that can have two attributes:
		primary 	// OPTIONAL //
			Used if this class is the primary class of the character.
			That is the first class listed in the class field (i.e. the class taken at level 1).
		secondary	// OPTIONAL //
			Used if this class is not the primary class of the character.
			That is any class gained through multiclassing.

	If the class gives nothing as a primary or secondary class, just leave that attribute out.
	The `primary` and `secondary` attributes of each of these work the same as the attribute
	of the same name in the "_common attributes.js" file.
	Please look there for a complete explanation of what you can enter.

	If you want the class to grant other things at level 1 (e.g. languages), you will have to
	add them using a class feature with `minlevel: 1`, see the `features` attribute below.
*/
	skills: {
		primary: ["Athletics", "Perception"],
		secondary: ["Athletics"],
	},
/*	skills // OPTIONAL //
	TYPE:	object with two optional attributes, `primary` and `secondary`
	USE:	add skill proficiency and expertise on the 1st page

	The `primary` and `secondary` attributes work identical to the `skills` attribute
	found in the "_common attributes.js" file.

	Only use this attribute if the class grants proficiency with fixed skills.
	Most classes offer a choice of skills. For those you should only use the `skillstxt`
	attribute, see below.
*/
	skillstxt: {
		primary: "Choose two from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival",
		secondary: "Choose one from Athletics, Intimidation, Perception, and Survival",
	},
/*	skillstxt // OPTIONAL //
	TYPE:	object with two optional attributes, `primary` and `secondary`
	USE:	description of skill proficiencies and skill proficiency choices gained, to use in the tooltips of skills

	The `primary` and `secondary` attributes work identical to the `skillstxt` attribute
	found in the "_common attributes.js" file.

	The string is shown as-is, preceded by the name of the class.
	Don't include the name of the class or a line break at the start.
*/
	toolProfs: {
		primary: [["Musical instrument", 3], ["Thieves' tools", "Dex"]],
		secondary: [["Musical instrument", 1]],
	},
/*	toolProfs // OPTIONAL //
	TYPE:	object with two optional attributes, `primary` and `secondary`
	USE:	add tool proficiencies

	The `primary` and `secondary` attributes work identical to the `toolProfs` attribute
	found in the "_common attributes.js" file.
*/
	armorProfs: {
		primary: [true, true, true, true],
		secondary: [true, true, false, true],
	},
/*	armorProfs // OPTIONAL //
	TYPE:	object with two optional attributes, `primary` and `secondary`
	USE:	adds armour and shield proficiencies

	The `primary` and `secondary` attributes work identical to the `armorProfs` attribute
	found in the "_common attributes.js" file.
	In short, the 4 entries are for: [light armour, medium armour, heavy armour, shields].
*/
	weaponProfs: {
		primary: [true, false, ["hand crossbow", "longsword", "rapier", "shortsword"]],
		secondary: [true, false],
	},
/*	weaponProfs // OPTIONAL //
	TYPE:	object with two optional attributes, `primary` and `secondary`
	USE:	adds weapon proficiencies

	The `primary` and `secondary` attributes work identical to the `weaponProfs` attribute
	found in the "_common attributes.js" file.
	In short, the 3 entries are for: [simple weapons, martial weapons, array of other weapons].
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Starting Equipment >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
	equipment: "Purplemancer starting equipment:" +
		"\n • Chain mail -or- leather armor, a longbow, and 20 arrows;" +
		"\n • A martial weapon and a shield -or- two martial weapons;" +
		"\n • A dungeoneer's pack and an arcane focus." +
		"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
/*	equipment // OPTIONAL //
	TYPE:	string
	USE:	the text to display in the tooltip of the "Add Equipment" button

	This attribute is only used if this class is the primary class of the character.
	The string is shown as-is, so make sure to include the name of the class.

	The starting equipment of the class is not added to the sheet automatically, this is only a
	description to help the player. The player can add the items themselves, or use the
	"Add Equipment" menu to add packs and items to the Equipment section on the 2nd page.

	The classes in the sheet use a list like the example above, with a bullet point (•)
	for each choice, followed by the alternative starting wealth in gold pieces.
*/

/*
	>>>>>>>>>>>>>>>>>>
	>>> Subclasses >>>
	>>>>>>>>>>>>>>>>>>
*/
	subclasses: ["Purplemancer Subclass", ["purplemancer-violet", "purplemancer-lavender"]],
	subclasses: ["Purplemancer Subclass", []],
/*	subclasses // REQUIRED //
	TYPE:	array with two entries
	USE:	define how the subclasses are called and which ClassSubList entries are subclasses of this class

	This array has two entries, a string followed by an array:
	1. string
		The first entry is the name that is given to the subclasses of this class.
		For example, this is "Martial Archetype" for the Fighter.
		This string is used in the dialog that prompts the player to select a subclass.
	2. array
		The second entry is an array of the object names of the ClassSubList entries
		that are subclasses for this class.
		The names have to match the object names in the ClassSubList object exactly.

	IMPORTANT
	Do not list subclasses here that are added using the `AddSubClass()` function!
	The `AddSubClass()` function will add the subclass to this array by itself.
	As using the `AddSubClass()` function is the recommended way to add a subclass,
	you will normally want the second entry to be an empty array, see the second example above.

	If an entry in the array doesn't exist in the ClassSubList object (e.g. because you added
	the subclass with the `AddSubClass()` function), or is listed multiple times,
	the sheet will display an error and ignore that entry.

	If the class has no subclasses, you still have to include this attribute, like so:
		subclasses: ["", []],
*/
	subclassGainedLevel: 3,
/*	subclassGainedLevel // OPTIONAL //
	TYPE:	number
	USE:	the class level at which the subclass is gained
	ADDED:	v14.0.8

	Once the class reaches this level and no subclass has been selected, the sheet will
	prompt the player to select a subclass.

	If this attribute is not present, the sheet will set it to 3.
	However, if the class has a "subclassfeatureX" feature with a `minlevel` lower than 3,
	the sheet will use the lowest `minlevel` of those features instead.
	See the `features` attribute below for an explanation of "subclassfeatureX".
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Attacks & Ability Save DC >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
	attacks: [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3],
	attacks: [1, 1, 1, 1, 2],
/*	attacks // OPTIONAL //
	TYPE:	array of numbers (variable length)
	USE:	the number of attacks the class can make with the Attack action at each class level
	CHANGE:	v14.0.0 (attribute is now optional)

	The first entry is for level 1, the second entry for level 2, etc.
	If the class level is higher than the array is long, the last entry in the array is used.
	Thus, both examples above result in 2 attacks from level 5 to level 14,
	but the first example goes up to 3 attacks from level 15 onwards.

	If the character has multiple classes, the highest number of all its classes is used.
	The number is used to add "Attack (2 attacks per action)" to the Actions section on
	the 1st page of the Printer Friendly sheets, or to fill the "Attacks per Action" field
	on the Colourful sheets.

	If the class never gets more than one attack per Attack action, you can leave this attribute out.
*/
	abilitySave: 4,
/*	abilitySave // OPTIONAL //
	TYPE:	number corresponding to the ability score (1 = Str, 2 = Dex, 3 = Con, 4 = Int, 5 = Wis, 6 = Cha)
	USE:	the ability score to use for the Ability Save DC on the 1st page and for the class' spellcasting

	This attribute does two things:
	1. It tells the sheet which ability score to use to calculate the Ability Save DC that
	   is displayed on the 1st page.
	   The sheet can display two Ability Save DCs on the 1st page.
	   If the character has more than two (multiclassing, race), the sheet will prioritise
	   the ability scores that are not used for spellcasting, as the save DC of
	   spellcasting is already displayed on the spell sheet pages.
	2. If the class is a spellcaster, this ability score is used as its spellcasting ability,
	   unless the class also has the `spellcastingAbility` attribute.
	   See the `spellcastingAbility` attribute in the "_common attributes.js" file.

	Leave this attribute out if the class has no features or spells that require a saving throw.
*/
	abilitySaveAlt: 2,
/*	abilitySaveAlt // OPTIONAL //
	TYPE:	number corresponding to the ability score (1 = Str, 2 = Dex, 3 = Con, 4 = Int, 5 = Wis, 6 = Cha)
	USE:	an alternative ability score to use for the Ability Save DC on the 1st page

	Use this if the class offers a choice between two ability scores to determine the save DC.
	The sheet will use whichever is highest, the ability score set with `abilitySave`
	or the one set with this attribute.

	This attribute does nothing if the `abilitySave` attribute is not present.
	This attribute doesn't affect the spellcasting ability of the class.
*/

/*
	>>>>>>>>>>>>>>>>>>>>
	>>> Spellcasting >>>
	>>>>>>>>>>>>>>>>>>>>

	The following attributes are only needed if the class has spell slots and learns/prepares
	spells as it gains levels (i.e. the Spellcasting or Pact Magic class feature).
	You can leave them all out for a class that isn't a spellcaster.

	If the class only grants a couple of fixed spells or cantrips, don't use these attributes,
	but add the `spellcastingBonus` common attribute to a class feature instead.
*/
	spellcastingFactor: 3,
	spellcastingFactor: "warlock1",
	spellcastingFactor: "purplemancer2",
/*	spellcastingFactor // OPTIONAL //
	TYPE:	number or string
	USE:	signal that the class is a spellcaster and how fast it gains spell slots

	If this attribute is present, the sheet will consider the class to be a spellcaster.
	Without this attribute, the other attributes in this section will do nothing.

	This attribute can be one of two things:
	1. number
		The class level is divided by this number to determine the row to use from the
		default spell slot table (i.e. the Multiclass Spellcaster table).
		Use 1 for a full caster (e.g. Cleric), 2 for a half caster (e.g. Paladin),
		and 3 for a one-third caster (e.g. Eldritch Knight).
		This can be any positive number.
	2. string
		The name of a spell slot table, followed by the number to divide the class level by.
		If the string contains no number, the sheet will divide the class level by 1.
		The sheet has two spell slot tables by default:
			"default"	Multiclass Spellcaster table, same as using just a number
			"warlock"	Pact Magic table of the Warlock
		For example, "warlock1" will result in the same spell slots as the Warlock, while
		"warlock2" results in gaining the spell slots of the Warlock at half the speed.

		You can also add your own spell slot table.
		To do so, add a global variable (i.e. without `var`) with a name that consists of
		a lowercase name for the table directly followed by "SpellTable".
		You can then use that lowercase name in this attribute.
		For example, the "purplemancer2" from the example above requires this variable:
			purplemancerSpellTable = [
				[0, 0, 0, 0, 0, 0, 0, 0, 0], // caster level 0
				[2, 0, 0, 0, 0, 0, 0, 0, 0], // caster level 1
				[3, 0, 0, 0, 0, 0, 0, 0, 0], // caster level 2
				// etc. for 21 entries in total, one for each caster level from 0
				// to 20, see `spellcastingTable` below for an example
			];
		Each row in the table is an array with 9 numbers, the number of spell slots
		for spell level 1 to 9.
		This method works well if the table needs to be available for multiple
		(sub)classes.
		If you only want to use the table for a single class, it is recommended
		to instead use the `spellcastingTable` attribute, see below.

	MULTICLASSING
	If the character has multiple classes that use the same spell slot table, the sheet
	will add the results for the classes together before looking up the spell slots.
	Spell slots from different tables are added together (e.g. Wizard and Warlock).

	ROUNDING
	The result of dividing the class level by the factor is rounded up if this is the only
	class of the character that uses the spell slot table.
	If the character has multiple classes that use the same spell slot table, the result
	is rounded down before they are added together, unless the class has the
	`spellcastingFactorRoundupMulti` attribute set to true, see below.

	FIRST LEVEL WITH SPELLCASTING
	The class will only be treated as a spellcaster once its class level equals this factor.
	For example, a class with `spellcastingFactor: 3` gains spellcasting at level 3.
	The class will be treated as a spellcaster from level 1 onwards if the
	`spellcastingFactorRoundupMulti` attribute is set to true, or from the first level that
	the `spellcastingTable` attribute grants any spell slots.
*/
	spellcastingFactorRoundupMulti: true,
/*	spellcastingFactorRoundupMulti // OPTIONAL //
	TYPE:	boolean
	USE:	whether to round up (true) or round down (false) the result of the `spellcastingFactor` when multiclassing

	Some half-casters, like the Artificer from Tasha's Cauldron of Everything, gain spellcasting
	at level 1 and their levels are rounded up when determining spell slots for a multiclassed character.
	Set this attribute to true if the class should work the same.

	This also causes the class to be treated as a spellcaster from level 1 onwards,
	regardless of the number used in the `spellcastingFactor` attribute.

	Setting this attribute to false is the same as not including this attribute.
*/
	spellcastingTable: [
		[0, 0, 0, 0, 0, 0, 0, 0, 0], // class level 0
		[0, 0, 0, 0, 0, 0, 0, 0, 0], // class level 1
		[0, 0, 0, 0, 0, 0, 0, 0, 0], // class level 2
		[1, 0, 0, 0, 0, 0, 0, 0, 0], // class level 3
		[1, 0, 0, 0, 0, 0, 0, 0, 0], // class level 4
		[2, 0, 0, 0, 0, 0, 0, 0, 0], // class level 5
		[2, 0, 0, 0, 0, 0, 0, 0, 0], // class level 6
		[0, 2, 0, 0, 0, 0, 0, 0, 0], // class level 7
		[0, 2, 0, 0, 0, 0, 0, 0, 0], // class level 8
		[0, 2, 0, 0, 0, 0, 0, 0, 0], // class level 9
		[0, 2, 0, 0, 0, 0, 0, 0, 0], // class level 10
		[0, 0, 2, 0, 0, 0, 0, 0, 0], // class level 11
		[0, 0, 2, 0, 0, 0, 0, 0, 0], // class level 12
		[0, 0, 2, 0, 0, 0, 0, 0, 0], // class level 13
		[0, 0, 2, 0, 0, 0, 0, 0, 0], // class level 14
		[0, 0, 2, 0, 0, 0, 0, 0, 0], // class level 15
		[0, 0, 2, 0, 0, 0, 0, 0, 0], // class level 16
		[0, 0, 0, 2, 0, 0, 0, 0, 0], // class level 17
		[0, 0, 0, 2, 0, 0, 0, 0, 0], // class level 18
		[0, 0, 0, 2, 0, 0, 0, 0, 0], // class level 19
		[0, 0, 0, 2, 0, 0, 0, 0, 0], // class level 20
	],
/*	spellcastingTable // OPTIONAL //
	TYPE:	array of arrays with 9 numbers each
	USE:	spell slot progression that is unique to this class

	Use this if the class has a spell slot progression that doesn't match any spell slot table
	and that is only used by this class.

	The first array is for class level 0, the second for class level 1, etc.
	Thus, you will normally want to have 21 arrays in total.
	If the class level is higher than the array is long, the last entry in the array is used.
	Each of those arrays has 9 numbers, the number of spell slots for spell level 1 to 9.

	Contrary to a spell slot table that is used by the `spellcastingFactor` attribute,
	this table is used with the class level directly.
	The class level is not divided by the number in the `spellcastingFactor` attribute.

	IMPORTANT
	You still have to include the `spellcastingFactor` attribute for the class to be
	considered a spellcaster.

	MULTICLASSING
	This table is only used if the character has no other classes that use the same
	spell slot table as is set in the `spellcastingFactor` attribute of this class.
	If the character does have another class with the same spell slot table, this
	attribute is ignored and the `spellcastingFactor` attribute is used instead.

	If you are adding multiple classes that should use the same custom spell slot table,
	and their levels should be added together, don't use this attribute.
	Instead, create a spell slot table variable as is explained at `spellcastingFactor` above.
*/
	spellcastingKnown: {
/*	spellcastingKnown // OPTIONAL //
	TYPE:	object (optional attributes)
	USE:	define how many cantrips and spells the class knows and whether it prepares spells

	This object is used to set up the spell selection dialog for the class and
	to determine how the spell sheet for the class is generated.
	Each of the attributes of this object is described separately below.
*/
		cantrips: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
	/*	cantrips // OPTIONAL //
		TYPE:	number or array of numbers (variable length)
		USE:	the number of cantrips known at each class level

		If this is an array, the first entry is for level 1, the second entry for level 2, etc.
		If the class level is higher than the array is long, the last entry in the array is used.
		If this is a single number, that number is used for all class levels.

		Leave this attribute out for a class that doesn't have access to cantrips.
	*/
		spells: [4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 13, 13, 14, 14, 15, 16, 16, 16],
		spells: "list",
		spells: "book",
	/*	spells // OPTIONAL //
		TYPE:	number, array of numbers (variable length), or string
		USE:	the number of spells known at each class level, or the way the class has access to spells

		This attribute can be one of three things:
		1. number
			The number of spells the class knows, regardless of class level.
		2. array of numbers
			The number of spells the class knows at each class level.
			The first entry is for level 1, the second entry for level 2, etc.
			If the class level is higher than the array is long, the last entry in the array is used.
		3. string
			There are two options for the string:
				"list"	The class has access to its whole spell list and prepares spells from
						that list (e.g. Cleric, Druid, Paladin).
				"book"	The class has a spellbook that it adds spells to and prepares spells
						from that spellbook (e.g. Wizard).
			With either of these options, you will normally also want to add the
			`prepared` attribute, see below.

		Leave this attribute out for a class that only has access to cantrips.
	*/
		prepared: true,
		prepared: [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22],
	/*	prepared // OPTIONAL //
		TYPE:	boolean or array of numbers (variable length)
		USE:	whether the class prepares spells and, if so, how many
		CHANGE:	v13.2.3 (added option for array)

		This attribute can be one of two things:
		1. boolean
			If set to true, the number of spells the class can prepare is calculated as
			the spellcasting ability modifier + the class level divided by the `spellcastingFactor`
			(rounded down), with a minimum of 1.
			This is how the classes in the sheet prepare spells (e.g. Cleric, Druid, Paladin, Wizard).
		2. array of numbers
			The number of spells the class can prepare at each class level.
			The first entry is for level 1, the second entry for level 2, etc.
			If the class level is higher than the array is long, the last entry in the array is used.
			Use this if the class prepares a fixed number of spells, regardless of its
			spellcasting ability modifier.

		The number of spells to prepare is displayed in the header on the spell sheet page.
		The player will be able to select the prepared spells in the spell selection dialog.

		Leave this attribute out for a class that doesn't prepare spells from a spell list or spellbook.
	*/
		cantripsPrepare: true,
	/*	cantripsPrepare // OPTIONAL //
		TYPE:	boolean
		USE:	offer the option to show all cantrips on the spell sheet, to be prepared like spells
		ADDED:	v14.0.1

		If this attribute is set to true, the spell selection dialog will have the extra option
		"Prepare cantrips just like spells (i.e. show all of them)".
		Use this for a class that can change its cantrips whenever it prepares spells.

		Setting this attribute to false is the same as not including this attribute.
	*/
	},
	spellcastingList: {
		"class": "wizard",
		school: ["Evoc", "Abjur"],
		level: [0, 4],
	},
/*	spellcastingList // OPTIONAL //
	TYPE:	object (common spell list object)
	USE:	determine which spells the class has access to

	This object determines which spells and cantrips are available for the class in
	the spell selection dialog and on its spell sheet.

	If this attribute is not present, the class will have access to all spells that have
	the object name of this class in their `classes` attribute (see "spell (SpellsList).js").
	Thus, you only need this attribute if the class uses the spell list of another class,
	or if its spell list has other limitations.

	See the "_common spell list object.js" file for documentation on how to construct this object.
*/

/*	spellcastingAbility // OPTIONAL //
	spellcastingExtra // OPTIONAL //
	spellcastingExtraApplyNonconform // OPTIONAL //

	These three attributes can be used directly in the ClassList object and work identical to
	the attributes of the same name found in the "_common attributes.js" file.
	Please look there for a complete explanation.

	You only need the `spellcastingAbility` attribute if the spellcasting ability is not
	the same as what is set with the `abilitySave` attribute, see above.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>
	>>> Class Features >>>
	>>>>>>>>>>>>>>>>>>>>>>
*/
	features: {
/*	features // REQUIRED //
	TYPE:	object with objects
	USE:	the features of the class that are gained as the class levels up

	Each attribute of this object is a class feature, which is in itself an object.
	You can add as many class features as you want.

	SYNTAX OF CLASS FEATURES
	The syntax for a class feature object is explained in its own file:
		"class features (ClassList & ClassSubList).js"
	Class features and subclass features use the exact same syntax, which is why it is in
	a separate file that both the ClassList and ClassSubList syntax refer to.
	That file also explains the order in which the features are listed on the sheet.

	CLASS FEATURES AND SUBCLASS FEATURES
	Once a subclass is selected, the sheet combines the features of the class with those
	of the subclass. In short:
		- A subclass feature with an object name that the class doesn't have is added in
		  addition to the features of the class.
		- A subclass feature with the exact same object name as a class feature replaces
		  that class feature. For object names that don't start with "subclassfeature",
		  this only works for the class levels after the subclass is selected.
		- A class feature with an object name that starts with "subclassfeature" is a
		  placeholder for a feature gained from the subclass at that level, see below.
	See "CLASS FEATURES AND SUBCLASS FEATURES" in the class features syntax file for a
	complete explanation, including what the `AddSubClass()` function changes.
*/
		"purple strike": {
			name: "Purple Strike",
			source: [["SRD", 30]],
			minlevel: 1,
			description: desc("Once per turn when I hit a creature with a weapon attack, I can do +1d6 force damage"),
		},
		"subclassfeature3": {
	/*	subclassfeatureX // REQUIRED (if the class has subclasses) //
		TYPE:	object name
		USE:	placeholder class feature for a feature that is gained from the subclass

		If the class has subclasses, its `features` needs a single "subclassfeatureX" entry
		with a `minlevel` that is the same as the `subclassGainedLevel` attribute, see above.
		For a class that gains its subclass at level 3, this is "subclassfeature3".

		As long as no subclass is selected, this placeholder feature is shown in the
		Class Features section. Use its `description` to tell the player to select a subclass.
		Once a subclass is selected, the subclass feature with the same object name will
		replace this placeholder.

		You don't need a "subclassfeatureX" entry for every level that the subclass grants
		a feature, as the other subclass features are simply added in addition to the
		features of the class.
		Every "subclassfeatureX" in the class requires each subclass to have a feature with
		that same object name, otherwise the placeholder stays in the Class Features section,
		even after a subclass is selected.
		So only add more than this single "subclassfeatureX" if there is a good reason for it.

		Any "subclassfeatureX" is listed after the other features of the same level in the
		Class Features section.
	*/
			name: "Purplemancer Subclass",
			source: [["SRD", 33]],
			minlevel: 3,
			description: desc('Choose a Purplemancer Subclass and put it in the "Class" field on the 1st page.'),
		},
	},
}
