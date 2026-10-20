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

	Subject:	Racial Variant (NOT a subrace!)

	Effect:		This is the syntax for adding a new variant to a race that exists in the sheet,
				either a race that is included in the sheet by default or one added by an add-on script.

				!!! A RACIAL VARIANT IS NOT A SUBRACE !!!
				A racial variant is a version of a race, such as the colour of the
				draconic ancestry of the Dragonborn, or the Variant Human.
				The race itself remains selectable, with or without any of its variants.
				The player can choose to use the race without a variant (the "basic" race),
				even if the race has variants.
				The only exception is a race with the `forceVariantSelection` attribute,
				see the "race (RaceList).js" file.

				Do NOT use this syntax to add a subrace (e.g. the High Elf, Hill Dwarf, or Lightfoot Halfling).
				In this sheet, every subrace is its own race, added with its own RaceList entry,
				see the "race (RaceList).js" file.
				If you add subraces as variants, the parent race will still be selectable
				on its own, without any subrace, which is not how subraces are supposed to work.

	Remarks:  - You will also need the syntax for adding a race, as all attributes that a
				variant can change are explained there, see "race (RaceList).js".
			  - You will also need the syntax for common attributes if you want the variant
				to do anything besides what is explained in the race syntax file,
				see "_common attributes.js".
			  - You will also need the syntax for adding a source if you want the variant to
				have a source that doesn't yet exist in the sheet, see "source (SourceList).js".

	Sheet:		v14.1.3 and above
*/

var iFileName = "Homebrew Syntax - RaceSubList.js";
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

RequiredSheetVersion("14.1.3", "24.0.0");
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

AddRacialVariant("purple catfolk", "lavender", {
/*	AddRacialVariant // REQUIRED //
	TYPE:	function call with three variables
	USE:	add a variant to the RaceSubList object and link it to its parent race
	RETURNS: string, the object name of the variant in the RaceSubList object

	!!! THIS ADDS A VARIANT, NOT A SUBRACE !!!
	The parent race will remain selectable without this variant, unless the parent race has
	the `forceVariantSelection` attribute (see "SELECTING THE VARIANT" below).
	If you want to add a subrace, add it as a new race instead, see the "race (RaceList).js" file.

	This function takes three variables, all of which are required:
	1. string
		The object name of the parent race, as it is used in the RaceList object.
		For the races in the sheet by default, these are:
			"dragonborn", "half-elf", "half-orc", "high elf", "hill dwarf", "human",
			"lightfoot halfling", "rock gnome", and "tiefling"
		For a race added by an add-on script, look up the object name in that script.

		The parent race has to exist when this function is run,
		otherwise the function will do nothing.
		So if you add a race and its variants in the same file, add the race first.

	2. string
		The name to use for the object name of the variant.
		This is not displayed anywhere, it is only used by the sheet to refer to the variant.

		The object name of the variant in the RaceSubList object will be the object name
		of the parent race, followed by a hyphen and this string, all in lowercase.
		In this example, that is "purple catfolk-lavender".
		If the parent race already has a variant with that object name, the function will
		add a number to it (e.g. "purple catfolk-lavender-2") so that it doesn't overwrite
		another variant with the same object name.

		The object name of the variant is used by other things to test for the variant,
		for example `CurrentRace.known === "purple catfolk" && CurrentRace.variant === "lavender"`.
		Because of this, you shouldn't change this string after publishing your script.

	3. object
		The variant object, which is explained below.
		It starts with the opening bracket `{` at the end of the line above.

	ADDING THE VARIANT TO THE RACE
	The function will add this string (the part after the hyphen) to the `variants` attribute
	of the parent race, so you don't have to do that yourself.
	See the `variants` attribute in the "race (RaceList).js" file.

	OTHER NAMES FOR THIS FUNCTION
	For forwards-compatibility with the 5.5e (2024) version of the sheet, this function can also
	be called using `AddSubRace()` or `AddSubSpecies()`.
	In this sheet, those do exactly the same as `AddRacialVariant()`, so despite their names,
	they also add a variant, NOT a subrace.
	Use `AddRacialVariant()` for scripts made for this sheet.

	WITHOUT THE FUNCTION
	It is also possible to add a variant by adding it directly to the RaceSubList object,
	for example `RaceSubList["purple catfolk-lavender"] = { ... };`.
	In that case, you have to add "lavender" to the `variants` attribute of the parent race yourself.
	This is not recommended, use the `AddRacialVariant()` function instead.
*/
	name: "Lavender Purple Catfolk",
/*	name // OPTIONAL //
	TYPE:	string
	USE:	name of the variant as it will be used by the sheet

	This name replaces the `name` of the parent race while the variant is selected,
	so it is used for everything that the `name` attribute of the race is used for,
	see the "race (RaceList).js" file.

	MATCH THE PARENT RACE
	When the player selects the variant, the Race field is changed to this name.
	As the sheet only looks for variants of a race if the text in the Race field matches the
	`regExpSearch` of the parent race, this name has to match the `regExpSearch` of both
	the parent race and the variant, see `regExpSearch` below.
	So make sure this name includes the name of the parent race (e.g. "Lavender Purple Catfolk"
	or "Purple Catfolk (Lavender)"), like the variants of the Dragonborn (e.g. "Black Dragonborn").

	SELECTING THE VARIANT
	Variants are not listed in the drop-down of the Race field, only their parent race is.
	If the parent race has at least one variant that is selectable (i.e. not excluded in
	the Source Selection dialog), the following happens:
		- If the text in the Race field matches the parent race, but none of its variants,
		  the player is prompted to choose a variant.
		  The first option of that prompt is the basic race (e.g. "Basic Purple Catfolk"),
		  which uses the parent race without any variant.
		  If the player chooses a variant, the Race field is changed to the name of the variant.
		- The parent race gets the "Racial Options" button in the Racial Traits section on
		  the 2nd page, which lists the basic race and all its selectable variants.
		  The player can use that button to change the variant or go back to the basic race.
	In both the prompt and the menu of that button, the variant is listed with this name,
	unless the `sortname` attribute is present, see below.

	FORCING A VARIANT
	By default, a variant is optional, as the basic race is always offered as well.
	If the parent race has the `forceVariantSelection` attribute set to true, the basic race
	is not offered in the prompt, the "Racial Options" menu, or the Source Selection dialog,
	so the player has to choose one of the variants.
	See the "race (RaceList).js" file for more information.
	This attribute only works in the RaceList object of the parent race. It is ignored if
	you add it to the variant, so a variant can't change whether a variant is required.

	The length of this name is also used to determine which variant to use if multiple
	variants match the text in the Race field, see `regExpSearch` below.

	If this attribute is not present, the variant keeps the `name` of the parent race and
	is listed as the variant's object name followed by the name of the parent race
	(e.g. "Lavender Purple Catfolk").
*/
	sortname: "Catfolk, Purple (Lavender)",
/*	sortname // OPTIONAL //
	TYPE:	string
	USE:	name of the variant as it will be shown in the variant selection prompt and the "Racial Options" menu

	This name will only be used to display the variant in those two places.
	This attribute is not used to recognize the variant or fill the Race field.
	If this attribute is not present, the `name` is used instead.
*/
	regExpSearch: /lavender/i,
/*	regExpSearch // REQUIRED //
	TYPE:	regular expression
	USE:	used to match the text in the Race field to see if this variant is present

	This has to be a match for the `name` given earlier, or the variant will never be recognized.
	Now it looks for any entry that has the word "lavender" in it, disregarding capitalization.

	Diacritics are removed from the text in the Race field before testing this regular
	expression, so don't use them in it (e.g. use a plain "e" instead of an accented "é").

	FINDING THE VARIANT
	This test is in addition to the `regExpSearch` of the parent race.
	The sheet first looks for a matching race, and only if the text in the Race field matches
	the `regExpSearch` of a race, does it look at the variants of that race.
	Because of this, the `regExpSearch` of a variant only has to distinguish it from the
	other variants of the same race, like in the example above.
	The text "Lavender Purple Catfolk" matches both the parent race and this variant,
	but the text "Lavender Catfolk" doesn't match the parent race, so the sheet would never
	look at this variant for that text.

	If multiple variants match the text in the Race field, the sheet will use the one with
	the longest `name`. If those are equal, it will use the one with the newest source.

	Be careful not to make the `regExpSearch` match the name of the parent race on its own,
	otherwise selecting the parent race will select this variant instead of prompting the
	player to choose a variant (or the basic race).
	In this example, "Purple Catfolk" doesn't match the variant, but "Lavender Purple Catfolk" does.
*/
	source: ["HB", 0],
	source: [["SRD", 5], ["P", 34]],
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
	The example above says something appears on both page 5 of the System Reference Document
	and on page 34 of the Player's Handbook.

	If a variant is completely homebrew, or you don't want to make a custom source, just put the following:
		source: ["HB", 0],
	"HB" refers to the 'homebrew' source.

	Note that if the parent race is excluded, none of its variants are available either.

	If this attribute is not present, the variant is listed with the source of the parent race,
	but it can't be excluded by excluding a source, only by excluding the variant itself
	or its parent race.
*/
	defaultExcluded: true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this variant should be excluded by default (true) or included by default (false)

	Include this attribute and set it to true if the variant should appear in the Excluded list of the
	Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.

	This only excludes the variant, not its parent race.
	The `defaultExcluded` attribute of the parent race is not used for the variant,
	so a variant of a race that is excluded by default is still included by default,
	unless the variant also has this attribute set to true.
	However, as long as the parent race is excluded, the variant is not available, see `source` above.

	This is useful for optional variants that you wouldn't normally want to use (e.g. playtest or campaign-specific).

	Setting this attribute to false is the same as not including this attribute.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Replacing Race Attributes >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	A variant can change all attributes of its parent race, except for `variants` and
	`forceVariantSelection`.
	These attributes work identical to the attributes of the same name in the RaceList
	object, see the "race (RaceList).js" file for an explanation of each of them.
	This also applies to common attributes, see "Common Attributes" below.

	If the variant has one of these attributes, that attribute is used instead of the
	attribute of the same name in the parent race, but only while the variant is selected.
	If the variant doesn't have the attribute, the one of the parent race is used.
	So only add these if the variant needs to be different than its parent race.
	The `features` attribute is the exception to this, see "Race Features" below.

	An attribute is always replaced as a whole.
	For example, if the parent race has `vision: [["Darkvision", 60]]` and the variant
	has `vision: [["Keen Smell", 0]]`, the variant doesn't have Darkvision, because the
	whole `vision` array is replaced.
	So if you only want to add to or change part of an attribute, you will have to include
	the complete attribute in the variant, like the `vision` in the example below.

	REMOVING ATTRIBUTES
	To remove an attribute of the parent race, set it to `null` in the variant.
	For example, `abilitySave: null,` will make it so the variant has no Ability Save DC,
	even though the parent race does.

	THE TRAIT DESCRIPTION
	As the `trait` attribute is replaced as a whole too, you will almost always want to
	include it in the variant, with the description of all the traits, both those of the
	variant and those of the parent race.
	To avoid writing the same text twice, you can reference the entries of the `trait`
	array of the parent race, like in the example below.
*/
	plural: "Lavender Purple Catfolk",
	trait: [
		"**Lavender Purple Catfolk** (+2 Dexterity, +1 Charisma)",
		RaceList["purple catfolk"].trait[1], // Cat's Claws
		"##\u25C6 Feline Agility##. When I move on my turn, I can double my speed until the end of the turn. I can do this a number of times equal to my proficiency bonus per long rest.",
		"##\u25C6 Lavender Calm## (level 3). As an action once per long rest, I can release a calming scent. Each creature of my choice within 10 ft of me is no longer charmed.",
		"##\u25C6 Lavender Scent##. I have advantage on saving throws against being charmed.",
	],
	vision: [["Darkvision", 60], ["Keen Smell", 0]],
	savetxt: { adv_vs: ["charmed"] },
	abilitySave: null,

/*
	>>>>>>>>>>>>>>>>>>>>>
	>>> Race Features >>>
	>>>>>>>>>>>>>>>>>>>>>
*/
	features: {
		"feline agility": {
			name: "Feline Agility",
			minlevel: 1,
			usages: "Proficiency bonus per ",
			usagescalc: "event.value = How('Proficiency Bonus');",
			recovery: "long rest",
		},
		"purple haze": null,
		"lavender calm": {
			name: "Lavender Calm",
			minlevel: 3,
			usages: 1,
			recovery: "long rest",
			action: [["action", ""]],
		},
	},
/*	features // OPTIONAL //
	TYPE:	object with objects
	USE:	the features of the variant, combined with those of the parent race

	The syntax for each feature is the same as for the `features` attribute in the
	"race (RaceList).js" file.

	Contrary to the other attributes, the `features` of the variant doesn't replace the
	`features` of the parent race as a whole. Instead, the sheet combines them as follows:
		- A feature with an object name that the parent race doesn't have is added in
		  addition to the features of the parent race (e.g. "lavender calm" above).
		- A feature with the same object name as a feature of the parent race replaces
		  that feature (e.g. "feline agility" above).
		- A feature set to `null` removes that feature of the parent race
		  (e.g. "purple haze" above).
		- All other features of the parent race are kept.

	REMOVING ALL FEATURES
	If you want the variant to have none of the features of the parent race,
	set this attribute to `null` (or ""):
		features: null,
	If you want to replace all the features of the parent race with your own, overwrite each
	of the features of the parent race with another object, or set them to `null` and
	add your own features.

	Note that an empty object (`features: {}`) doesn't remove anything, so it will keep all
	the features of the parent race.

	The sheet never changes the `features` objects of the RaceList and RaceSubList objects,
	it only combines them in a copy. So a variant can never affect its parent race or
	other variants of the same race.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Common Attributes >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>

	You can have the variant affect different parts of the sheet like adding proficiencies,
	adding spellcasting abilities, actions, limited features, etc. etc.

	See the "_common attributes.js" file for documentation on how to do those things and more.
	All attributes in there can directly be added in this object.

	REPLACING COMMON ATTRIBUTES OF THE PARENT RACE
	Common attributes are replaced just like the other attributes, see "Replacing Race
	Attributes" above. The variant doesn't get the common attributes of the parent race
	in addition to its own, but instead of them, one attribute at a time.
	For example, the parent race in the "race (RaceList).js" file has
	`weaponsAdd: ["Claws"]`. The variant below has `weaponsAdd: ["Lavender Claws"]`,
	so the variant adds "Lavender Claws" to the attacks section, but not "Claws".
	All other common attributes of the parent race, such as `speed`, still apply.

	If you want a common attribute to be added in addition to that of the parent race,
	add it to a feature of the variant instead, see "Race Features" above.

	ABILITY SCORES
	The same goes for the `scores` and `scorestxt` attributes.
	The variant below has `scores: [0, 2, 0, 0, 0, 1]`, which replaces the `scores` of the
	parent race. As the parent race also has `scorestxt`, the variant needs its own `scorestxt`
	as well, otherwise the text of the parent race would still be shown.
	For example, if the the Variant Human only offers a choice of ability scores, thus it has
	`scores: null` and describes the choice with the `scorestxt` attribute.
*/
	weaponsAdd: ["Lavender Claws"],
	scores: [0, 2, 0, 0, 0, 1],
	scorestxt: null,
});
