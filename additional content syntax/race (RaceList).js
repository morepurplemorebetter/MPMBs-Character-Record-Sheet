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

	Subject:	Race (and subrace)

	Effect:		This is the syntax for adding a new race to the sheet.

				SUBRACES ARE SEPARATE RACES
				In the 5e sheet, every subrace is added as its own RaceList entry, using this syntax.
				This differs from the 5.5e (2024) sheet, where subraces go into the RaceSubList object.
				For example, the 5e sheet has separate entries for the High Elf, Wood Elf, and Drow,
				but no entry for just "Elf".
				A race that has no subraces, like the Dragonborn, is a single RaceList entry.
				Don't make an entry for the parent of a subrace, only for the subraces themselves.

	Remarks:  - You will also need the syntax for common attributes if you want the race to do
				anything besides populating the Racial Traits section, see "_common attributes.js".
			  - You will also need the syntax for adding a racial variant if you want the race to
				offer an optional choice between different versions of itself, such as the Draconic
				Ancestries of the Dragonborn, "race variant (RaceSubList) [not subrace!].js".
				Don't use that syntax for subraces, see above.
			  - You will also need the syntax for adding a source if you want the race to have
				a source that doesn't yet exist in the sheet, see "source (SourceList).js".

	Sheet:		v14.1.3 and above
*/

var iFileName = "Homebrew Syntax - RaceList.js";
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

RaceList["purple catfolk"] = {
/* 	RaceList object name // REQUIRED //
	TYPE:	string (lowercase)
	USE:	object name of the race as it will be used by the sheet

	By adding a new object to the existing RaceList object, we create a new race.
	The object name here is 'purple catfolk'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].

	The object name of the race is used by other things to refer to the race,
	for example `CurrentRace.known === "purple catfolk"` or the `AddRacialVariant()` function
	(see "race variant (RaceSubList) [not subrace!].js").
	Because of this, you shouldn't change the object name after publishing your script.
*/
	name: "Purple Catfolk",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the race as it will be used by the sheet

	This name is used in tooltips, pop-up dialogs, and the Source Selection dialog,
	and to refer to the race from other parts of the sheet (e.g. limited features or bonus spells).
	It is also used in the drop-down of the Race field, unless the `sortname` attribute is
	present, see below.

	The length of this name is also used to determine which race to use if multiple
	races match the text in the Race field, see `regExpSearch` below.
*/
	sortname: "Catfolk, Purple",
/*	sortname // OPTIONAL //
	TYPE:	string
	USE:	name of the race as it will be shown in the drop-down of the Race field

	This name will only be used to display the race in the drop-down of the Race field.
	This attribute is not used to recognize the race.
	If this attribute is not present, the `name` is used instead, converted to title case.

	For a subrace, it is customary to add a `sortname` attribute with the name of the parent
	race first, so that all subraces of the same race are listed together in the drop-down.
	For example, the three elf subraces have "Elf, Dark (Drow)", "Elf, High", and "Elf, Wood"
	as their `sortname` attributes.

	Make sure that the `regExpSearch` matches this name as well, otherwise selecting the
	race from the drop-down will not result in the race being recognized.
*/
	regExpSearch: /^(?=.*purple)(?=.*(cat|feline)).*$/i,
/*	regExpSearch // REQUIRED //
	TYPE:	regular expression
	USE:	used to match the text in the Race field to see if this race is present

	This has to be a match for the `name` (and `sortname`, if present) given earlier,
	or the race will never be recognized.
	Now it looks for any entry that has both the word "purple" and the word "cat" or "feline" in it,
	disregarding capitalization or word order.
	If this looks too complicated, or you want to match only a single word, just write:
		regExpSearch: /catfolk/i,

	Diacritics are removed from the text in the Race field before testing this regular
	expression, so don't use them in it (e.g. use a plain "e" instead of an "e" with an accent).

	If multiple races match the text in the Race field, the sheet will use the one
	with the longest `name`. If those are equal, it will use the one with the newest source.

	Be careful not to make the `regExpSearch` match too broadly.
	For example, the High Elf uses a `regExpSearch` that needs both a word like "elf",
	"elves", or "elven" and a word like "high", "sun", or "moon" to be present,
	so that it matches "High Elf" and "Moon Elves", but not "Shelf", "Wood Elf", or "Half-Elf".

	SUBRACES
	As each subrace is its own race, make sure that the `regExpSearch` of a subrace
	requires the name of the subrace to be present, not just the name of the parent race.
	Otherwise, the sheet will not be able to tell the subraces apart.

	VARIANTS
	If the race has variants (see `variants` below), the text in the Race field is only
	tested against the `regExpSearch` of those variants if it matches the `regExpSearch`
	of this race. See the "race variant (RaceSubList) [not subrace!].js" file for how that works.
*/
	source: ["HB", 0],
	source: [["SRD", 3], ["P", 18]],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the race is found

	This attribute is used by the sheet to determine if the race should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the race at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 3 of the System Reference Document and
	on page 18 of the Player's Handbook.

	If a race is completely homebrew, or you don't want to make a custom source, just put the following:
		source: ["HB", 0],
	"HB" refers to the 'homebrew' source.

	The source is also displayed in the tooltip of the Racial Traits field.
*/
	defaultExcluded: true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this race should be excluded by default (true) or included by default (false)

	Include this attribute and set it to true if the race should appear in the Excluded list of the
	Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.

	Note that if a race is excluded, none of its variants will be accessible either.

	This is useful for optional races that you wouldn't normally want to use (e.g. playtest or campaign-specific).

	Setting this attribute to false is the same as not including this attribute.
*/
	plural: "Purple catfolk",
/*	plural // REQUIRED //
	TYPE:	string
	USE:	name of the race when used in the plural form

	This is used in the tooltips of the Size, Age, Height, and Weight fields,
	see the attributes by the same names below.
	For example, "Purple catfolk stand about 5 ft tall" or "Purple catfolk reach adulthood ...".
	Make sure it starts with a capital letter, as it is the start of a sentence.
*/
	size: 3,
	size: [3, 4],
/*	size // REQUIRED //
	TYPE:	number or array of numbers
	USE:	set the Size Category drop-down box on the 1st page

	This can be either a:
	1) Number
		The number corresponding to the size category of the race (see table below).
	2) Array
		If the race can be several different size categories, using an array will allow the
		player to choose which one to use.
		Add the numbers corresponding to the size categories of the race (see table below) to the array.
		The second example above will prompt the player to select either Medium or Small
		when the race is selected.

	The numbers correspond to the following size categories:
		0	Gargantuan
		1	Huge
		2	Large
		3	Medium
		4	Small
		5	Tiny

	The size category affects the carrying capacity on the 2nd page.
*/
	trait: "Purple Catfolk (+2 Dexterity, +1 Wisdom)\n\u25C6 Cat's Claws. My claws are natural weapons that deal 1d6 + Str mod slashing damage.",
	trait: [
		"**Purple Catfolk** (+2 Dexterity, +1 Wisdom)",
		"##\u25C6 Cat's Claws##. My claws are natural weapons that deal 1d6 + Str mod slashing damage. I have a climbing speed equal to my walking speed.",
		"##\u25C6 Feline Agility## (level 3). When I move on my turn, I can double my speed until the end of the turn. I can do this once per short rest.",
		"##\u25C6 Purple Haze##. I know the *Minor Illusion* cantrip. Int, Wis, or Cha is my spellcasting ability for it (choose when selecting the race).",
	],
/*	trait // REQUIRED //
	TYPE:	string or array of strings
	USE:	the text to be filled in the Racial Traits field on the 2nd page
	CHANGE:	v14.1.3 (array input joined by carriage return "\r")

	This is the description of all the traits of the race.
	Note that the sheet normally uses the first person for this.
	Make sure that this description is not too long and fits in the Racial Traits field.
	The Printer Friendly sheets have less space for this than the Colourful versions,
	so use the Printer Friendly sheets to test if the description fits.

	If this is a string, you can use "\n" for a line break, as in the first example above.
	If this attribute is an array, the sheet will join it with a carriage return "\r",
	as in the second example above.

	If the sheet is set to use the metric system, the sheet will convert the units in
	this description to metric when it is added.

	FORMATTING CHARACTERS (since v14.0.0)
	Regardless if you use a string or an array, the `trait` can be formatted using the
	Rich Text formatting characters. Text between these formatting characters will be
	displayed differently. The formatting characters are as follows:
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

	The race's traits in the sheet start with the name of the race in bold, followed by
	each trait on its own line, starting with a diamond (\u25C6 = ◆) and the name of the
	trait as Header 2, as in the second example above.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Age, Height, and Weight >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	The next five attributes are only used for the tooltips of the Age, Height, and Weight fields.
	Each is a string that is added directly after the `plural` attribute, so it has to start with a space.

	For example, the `age` below results in the tooltip:
		"Purple Catfolk reach adulthood around age 15 and live about 80 years"

	The height and weight are customarily followed by the formula from the
	Random Height and Weight table, see the examples below.
*/
	age: " reach adulthood around age 15 and live about 80 years",
/*	age // OPTIONAL //
	TYPE:	string
	USE:	the text to use for the tooltip of the Age field, preceded by the `plural`
*/
	height: " are about 4-6 ft tall (4'4\" + 2d10\")",
/*	height // OPTIONAL //
	TYPE:	string
	USE:	the text to use for the tooltip of the Height field, preceded by the `plural`

	This is used if the sheet is set to the imperial system, or if the `heightMetric`
	attribute is not present, see below.
*/
	weight: " weigh around 120 lb (90 + 2d10 \xD7 2d4 lb)",
/*	weight // OPTIONAL //
	TYPE:	string
	USE:	the text to use for the tooltip of the Weight field, preceded by the `plural`

	This is used if the sheet is set to the imperial system, or if the `weightMetric`
	attribute is not present, see below.
*/
	heightMetric: " are about 130-180 cm tall (132 + 5d10 cm)",
/*	heightMetric // OPTIONAL //
	TYPE:	string
	USE:	the text to use for the tooltip of the Height field when using the metric system, preceded by the `plural`

	This is used if the sheet is set to the metric system, or if the `height` attribute
	is not present, see above.
	Note that the sheet does not convert the `height` attribute to metric, so you need
	this attribute if you want the tooltip to use metric units.
*/
	weightMetric: " weigh around 55 kg (40 + 5d10 \xD7 4d4 / 10 kg)",
/*	weightMetric // OPTIONAL //
	TYPE:	string
	USE:	the text to use for the tooltip of the Weight field when using the metric system, preceded by the `plural`

	This works identical to `heightMetric`, but for the Weight field.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>
	>>> Ability Scores >>>
	>>>>>>>>>>>>>>>>>>>>>>

	The attributes in this section are common attributes.
	They work identical to the attributes of the same name in the "_common attributes.js" file.
	Please look there for a complete explanation of what you can enter.

	They are listed here because almost every race uses them.
	When used directly in the race object, the ability score improvements are added to
	the "Racial Bonus" column of the Ability Scores dialog.
*/
	scores: [0, 2, 0, 0, 1, 0],
/*	scores // OPTIONAL, but RECOMMENDED //
	TYPE:	array of six numbers
	USE:	add ability score improvements to the "Racial Bonus" column of the Ability Scores dialog

	This works identical to the `scores` attribute found in the "_common attributes.js" file.
	The entries are: [Str, Dex, Con, Int, Wis, Cha].

	Only use this for the fixed ability score improvements of the race.
	If the race (also) offers a choice, describe that choice with the `scorestxt` attribute, see below.
	The race can have both `scores` and a `scorestxt` attribute, but only the content of the
	`scorestxt` is shown in the Ability Score dialog, so make sure it mentions the fixed increase.
*/
	scorestxt: "+2 Dexterity or +2 Wisdom",
	scorestxt: "+2 Dexterity and +1 to either Intelligence or Wisdom",
/*	scorestxt // OPTIONAL //
	TYPE:	string
	USE:	description of ability score improvements to use in the Ability Scores dialog and tooltips

	This works identical to the `scorestxt` attribute found in the "_common attributes.js" file.

	You do not need this attribute if the race doesn't offer a choice of ability scores,
	then the sheet will generate the text from the `scores` attribute.
*/
	scoresGeneric: true,
/*	scoresGeneric // OPTIONAL //
	TYPE:	boolean
	USE:	apply generic defaults to the race, as introduced with Van Richten's Guide to Ravenloft

	If this attribute is set to true, the sheet will add the following to the race, but only for the
	attributes that the race doesn't have:
		ATTRIBUTE		DEFAULT
		scorestxt		"+2 to one ability score and +1 to a different score, -or- +1 to three different scores"
						(only if the race also doesn't have the `scores` attribute)
		age 			" typically live to be around 100 years old"
		height  		a text referring to the Random Height and Weight table in the PHB
		weight  		a text referring to the Random Height and Weight table in the PHB
		languageProfs	["Common", 1]

	Use this for races that follow the rules for customizing your origin, such as the races from
	Van Richten's Guide to Ravenloft and Mordenkainen Presents: Monsters of the Multiverse.

	Setting this attribute to false is the same as not including this attribute.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Speed, Senses, and Languages >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	The attributes in this section are all common attributes.
	They work identical to the attributes of the same name in the "_common attributes.js" file.
	Please look there for a complete explanation of what you can enter.

	They are listed here because almost every race uses them.
	All other common attributes can also be used in this object, see "Common Attributes" below.
*/
	speed: {
		walk: { spd: 30, enc: 20 },
		climb: { spd: "walk", enc: "walk" },
	},
/*	speed // RECOMMENDED // but OPTIONAL
	TYPE:	object (optional attributes)
	USE:	add or edit speed mode(s) on the 1st page

	This works identical to the `speed` attribute found in the "_common attributes.js" file.

	Although this attribute is optional, almost every race has it, as the Speed field on the
	1st page will otherwise be empty unless something else (e.g. a class feature) sets a speed.
*/
	vision: [["Darkvision", 60]],
/*	vision // OPTIONAL //
	TYPE:	array (variable length)
	USE:	add string to the "Senses" field on the 1st page

	This works identical to the `vision` attribute found in the "_common attributes.js" file.
*/
	languageProfs: ["Common", 1],
/*	languageProfs // OPTIONAL //
	TYPE:	array (variable length)
	USE:	add language proficiencies

	This works identical to the `languageProfs` attribute found in the "_common attributes.js" file.
	The example above adds Common and one language of the player's choice.

	The sheet doesn't add any languages by default, so make sure to include all the languages
	that the race grants, including Common.
	The only exception is a race with the `scoresGeneric` attribute, see above.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>
	>>> Ability Save DC >>>
	>>>>>>>>>>>>>>>>>>>>>>>
*/
	abilitySave: 6,
	abilitySave: [4, 5, 6],
/*	abilitySave // OPTIONAL //
	TYPE:	number or array of numbers corresponding to the ability score (1 = Str, 2 = Dex, 3 = Con, 4 = Int, 5 = Wis, 6 = Cha)
	USE:	the ability score to use for the Ability Save DC on the 1st page and for the race's spells

	This attribute does two things:
	1. It tells the sheet which ability score to use to calculate the Ability Save DC that
	   is displayed on the 1st page.
	   The sheet can display two Ability Save DCs on the 1st page.
	   If the character has more than two (multiclassing, race), the sheet will prioritise
	   the ability scores that are not used for spellcasting, as the save DC of
	   spellcasting is already displayed on the spell sheet pages.
	2. If the race is a spellcaster, this ability score is used as its spellcasting ability,
	   unless the race also has the `spellcastingAbility` attribute.
	   See the `spellcastingAbility` attribute in the "_common attributes.js" file.

	Leave this attribute out if the race has no traits that require a saving throw besides spells.
	If a race has spellcasting, but no other traits that require saving throws, use only the
	`spellcastingAbility` attribute, see "_common attributes.js".
*/
	abilitySaveAlt: 2,
/*	abilitySaveAlt // OPTIONAL //
	TYPE:	number corresponding to the ability score (1 = Str, 2 = Dex, 3 = Con, 4 = Int, 5 = Wis, 6 = Cha)
	USE:	an alternative ability score to use for the Ability Save DC on the 1st page

	Use this if the race offers a choice between two ability scores to determine the save DC.
	The sheet will use whichever is highest, the ability score set with `abilitySave`
	or the one set with this attribute.

	This attribute does nothing if the `abilitySave` attribute is not present.
	This attribute doesn't affect the spellcasting ability of the race.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>
	>>> Race Features >>>
	>>>>>>>>>>>>>>>>>>>>>
*/
	features: {
/*	features // OPTIONAL //
	TYPE:	object with objects
	USE:	the traits of the race that are level-dependent or need to do something separately

	Each attribute of this object is a race feature, which is in itself an object.
	You can add as many race features as you want.

	A race feature doesn't add any text to the sheet, as the description of all the
	traits is already in the `trait` attribute, see above.
	Use a race feature for a trait that:
		- is gained at a higher level (e.g. the Tiefling's Infernal Legacy spells at level 3 and 5),
		- has limited uses (e.g. the Dragonborn's Breath Weapon), or
		- should show its name in the tooltip of the things it adds to the sheet.
	Things that the race grants from level 1 and that don't have limited uses can also be
	added directly to the race object as common attributes, see "Common Attributes" below.

	The sheet applies the race features whenever the character level changes,
	adding those with a `minlevel` equal to or lower than the character level
	and removing those with a higher `minlevel`.
*/
		"feline agility": {
	/* 	race feature object name // REQUIRED //
		TYPE:	string (lowercase)
		USE:	object name of the feature as it will be used by the sheet

		The object name of each feature is not displayed anywhere by default,
		it is used by the sheet to refer to the feature.

		Note the use of only lower case!

		Variants of the race can replace or remove features by using the same object name,
		see "race variant (RaceSubList) [not subrace!].js".
	*/
			name: "Feline Agility",
		/*	name // REQUIRED //
			TYPE:	string
			USE:	name of the race feature as it will be used by the sheet

			This name is used for the entry in the Actions and Limited Features section
			(unless the `limfeaname` common attribute is present) and in the tooltips of
			the things that the feature adds to the sheet.
		*/
			source: [["HB", 0]],
		/*	source // OPTIONAL //
			TYPE:	array with two entries (or array of these arrays)
			USE:	define where the race feature is found

			This works identical to the `source` attribute of the race, see above.
			Add this if the feature is found in a different source or on a different page
			than the race.
		*/
			minlevel: 1,
		/*	minlevel // OPTIONAL //
			TYPE:	number
			USE:	the character level at which the feature is gained

			Note that this is the character level, not a class level.
			If this attribute is not present, the feature is gained at level 1.
		*/
			usages: 1,
			recovery: "short rest",
		/*	COMMON ATTRIBUTES (inside race feature)
			A race feature can have any of the attributes from the "_common attributes.js" file.
			The `usages` and `recovery` attributes above are examples of those, which add an entry
			to the Limited Features section on the 1st page.

			Level-dependent common attributes, like a `usages` with an array of 20 entries,
			use the character level, not a class level.
		*/
		},
		"purple haze": {
			name: "Purple Haze",
			minlevel: 3,
			spellcastingBonus: [{
				name: "Purple Haze",
				spells: ["silent image"],
				selection: ["silent image"],
				firstCol: "oncelr",
			}],
		},
	},

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Common Attributes >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>

	You can have the race affect different parts of the sheet like adding proficiencies,
	adding spellcasting abilities, actions, limited features, etc. etc.

	See the "_common attributes.js" file for documentation on how to do those things and more.
	All attributes in there can directly be added in this object.
	These are applied from level 1, as if the race object is a race feature with `minlevel: 1`.

	ABILITY SCORES
	The `scores` and `scorestxt` common attributes are explained in the "Ability Scores"
	section above. If you use them in a race feature instead of directly in the race object,
	they are still added to the "Racial Bonus" column of the Ability Scores dialog, but only
	once the character reaches the `minlevel` of that feature.
*/
	weaponsAdd: ["Claws"],
	spellcastingAbility: [4, 5, 6],

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Variants of a Race >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
	variants: ["lavender", "violet"],
	variants: [],
/*	variants // OPTIONAL //
	TYPE:	array of strings (variable length)
	USE:	the RaceSubList entries that are variants of this race (e.g. the Dragonborn's draconic ancestries)

	Each entry is the part of the object name of the RaceSubList entry that comes after the
	object name of this race and a hyphen, in lowercase.
	For example, the first example above refers to the RaceSubList entries
	"purple catfolk-lavender" and "purple catfolk-violet".
	See the "race variant (RaceSubList) [not subrace!].js" file for how to add a variant.

	IMPORTANT
	Do not list variants here that are added using the `AddRacialVariant()` function!
	The `AddRacialVariant()` function will add the variant to this array by itself,
	and will even create this attribute if it doesn't exist.
	As using the `AddRacialVariant()` function is the recommended way to add a variant,
	you will normally want to leave this attribute out.

	If an entry in the array doesn't exist in the RaceSubList object, the sheet will
	display an error and remove that entry from this array.

	VARIANTS ARE NOT SUBRACES
	Use a variant when a feature of a race requires a choice, for example the
	colour of a Dragonborn's Draconic Ancestry.
	Also create a variant if a race has a variation from optional or later introduced rules,
	for example the Variant Human or the Half-Elf variants from SCAG.
	By default, choosing a variant is optional: the race itself (the "basic" version)
	remains selectable, even if it has variants. If you want the player to always choose
	a variant, use the `forceVariantSelection` attribute, see below.
	A subrace, like the High Elf or the Hill Dwarf, is not a variant, but a separate race
	that is added with its own RaceList entry, see the top of this file.

	SELECTING A VARIANT
	If the race has at least one variant that is selectable (i.e. not excluded in the
	Source Selection dialog), the race gets the "Racial Options" button in the Racial Traits
	section on the 2nd page, which can be used to change the variant.

	If the text in the Race field matches this race, but none of its variants, the player is
	prompted to choose a variant. The first option in that prompt is the basic race
	(e.g. "Basic Purple Catfolk"), which uses the race without any variant, unless the
	`forceVariantSelection` attribute is set to true, see below.
	If the player chooses a variant, the Race field is changed to the name of the chosen variant.
*/
	forceVariantSelection: true,
/*	forceVariantSelection // OPTIONAL //
	TYPE:	boolean
	USE:	whether the player has to select one of the variants (true) or can also use the race without a variant (false)
	ADDED:	v14.1.3

	Set this attribute to true if the race shouldn't be used without one of its variants,
	for example because every member of the race has to choose a draconic ancestry.
	If set to true, the sheet will no longer offer the basic version of this race:
		- The prompt to choose a variant doesn't have the basic race as an option.
		- The menu of the "Racial Options" button doesn't list the basic race.
		- The Source Selection dialog doesn't list the basic race, so it can't be excluded
		  separately from the variants.

	The sheet can still end up using the race without a variant if all variants of the race
	are excluded in the Source Selection dialog.
	So make sure the race itself still works on its own (e.g. with a `trait` that tells the
	player to select a variant using the "Racial Options" button).

	This attribute only works in the RaceList object.
	It is ignored if used in a RaceSubList object, so a variant can't change it.

	This attribute does nothing if the race doesn't have any variants.
	Setting this attribute to false is the same as not including this attribute.
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Traits From Base Race >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
	useFromPreviousRace: {
		message: "The Purple Catfolk gains the Darkvision and speed of the base race, if it has those.",
		gainTraits: ["vision", "speed.walk"],
		updateName: "suffix",
		defaultTraits: {
			speed: { walk: { spd: 30, enc: 20 } },
		},
		evalAfterMerge: function (oBaseRace, rxNeverOverwrite, aGainTraits) {
			if (oBaseRace.size === 4) CurrentRace.size = 4;
		},
	},
/*	useFromPreviousRace // OPTIONAL //
	TYPE:	object
	USE:	let the race take some of its traits from another race, its base race

	Use this for a race that is built on top of another race, like the Dhampir, Hexblood,
	or Reborn from Van Richten's Guide to Ravenloft. These can take some traits from the race
	that the character was before becoming this race.

	HOW IT WORKS FOR THE PLAYER
	The player first selects a race as normal, the base race, and then changes it to the
	race with this attribute. The sheet then asks the player whether they want to use the
	traits of the base race. The answer is remembered for when the sheet is opened again.
	If the player selects this race without first selecting another race, they will
	be shown a message explaining how this works.
	The base race can't be a race that also has this attribute.

	The base race includes its variant, if one was selected.

	This object can have the following attributes, all of which are optional:

	ATTRIBUTE		EXPLANATION
	message			TYPE:	string
					USE:	extra text to add to the pop-up dialogs explaining how this works
					Use this to explain to the player which traits are taken from the base race.

	gainTraits		TYPE:	array of strings
					USE:	the attributes of the base race to add to this race
					Only used if the player chose to use the traits of the base race.
					Each entry is the name of an attribute of the base race (e.g. "vision").
					You can also point to an attribute inside an attribute, by separating them
					with a period (e.g. "speed.walk" or "savetxt.immune").
					An attribute that is an array is combined with the array of this race, if
					it has the same attribute. Otherwise, it replaces the attribute of this race.
					The following attributes are never taken from the base race this way:
						`name`, `plural`, `source`, `features`, `variants`, and `useFromPreviousRace`
					The source of the base race is always added to the source of this race.
					The features of the base race are handled separately, see below.

					RACE FEATURES
					Features of the base race that have an attribute listed in this array
					are added as features to this race, with only those attributes (and their
					`name`, `minlevel`, `limfeaname`, `usages`, `recovery`, and `action`).
					Add "features" to the array to add all features of the base race instead.

					EVERYTHING
					If the array contains "all", "everything", "complete", or "full", all attributes
					and features of the base race are added to this race, except for those
					listed above as never taken from the base race.

	updateName		TYPE:	string
					USE:	how to combine the name of the base race with the name of this race
					CHANGE:	v13.1.13 (replaced the `replaceNameInTrait` attribute)
					Only used if the player chose to use the traits of the base race.
					This can be one of the following:
						"replace"	Use the name (and plural) of the base race instead.
						"prefix"	Put the name of the base race in front of this name,
									e.g. "Elf Purple Catfolk".
						"suffix"	Put the name of the base race after this name,
									e.g. "Purple Catfolk Elf".
					The name is also changed in the `trait` text, if it contains the name.
					If this attribute is not present, the name is not changed.

	evalAfterMerge	TYPE:	function
					USE:	a function to run after the attributes of the base race were added
					Only used if the player chose to use the traits of the base race.
					Use this to change the `CurrentRace` object (which is this race) in ways that
					can't be done with the other attributes.
					The function is passed three variables:
						1. object, the base race (with its variant applied)
						2. regular expression, matching the attributes that shouldn't be changed
						   (see the list for `gainTraits` above)
						3. array, the `gainTraits` attribute

	defaultTraits	TYPE:	object
					USE:	attributes to use if the traits of the base race are not used
					Only used if the player chose not to use the traits of the base race,
					or if there was no base race.
					This object can contain any of the attributes of the race object, which
					replace those of this race.
					The `features` attribute is combined with that of this race instead.
					A feature set to `null` in this object removes that feature from this race.
*/
}
