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

	Subject:	Class features and subclass features

	Effect:		This is the syntax for the `features` attribute of a class (ClassList object)
				and of a subclass (ClassSubList object, normally added with the `AddSubClass()` function).
				Class features and subclass features use the exact same syntax.

	Important:	The syntax here does not stand on its own.
				You will need the syntax file for adding a class (ClassList) or for adding
				a subclass (ClassSubList) to use alongside this file.
				Use this file when referred to from one of those.

	Remarks:  - You will also need the syntax for common attributes if you want the features
				to do anything besides populating the Class Features section,
				see "class features (ClassList & ClassSubList).js".

	Sheet:		v14.0.8 and above
*/

/*	-CLASS FEATURES AND SUBCLASS FEATURES-
	Both the ClassList object and the ClassSubList object have a `features` attribute.
	When the character has a class, the sheet adds the features of that class.
	Once a subclass is selected for that class, the sheet combines the features of the
	class with the features of the subclass as follows:

	1. ADDED IN ADDITION
		A feature of the subclass with an object name that doesn't exist in the class is
		simply added in addition to the features of the class.

	2. SAME OBJECT NAME REPLACES
		A feature of the subclass with the exact same object name as a feature of the class
		will replace that class feature.

		This also works for class features with an object name that doesn't start with
		"subclassfeature", but only for the class levels after the subclass is selected.
		For the class levels before that, the feature of the class is used.
		For example, a subclass gained at level 3 can replace a class feature with a
		`minlevel` of 1, but the class feature is still used for class levels 1 and 2.

	3. "subclassfeatureX" PLACEHOLDERS
		A class feature with an object name that starts with "subclassfeature" is a placeholder
		that tells the sheet that the class gains a feature from its subclass at that level.
		It is customary to add the level the feature is gained at to the object name
		(e.g. "subclassfeature3"), but it can be any number, as long as the object name is unique.
		You can use a decimal (e.g. "subclassfeature3.1") if the subclass grants multiple
		features at the same level.

		As long as no subclass is selected, this placeholder feature is shown in the
		Class Features section. Its `description` is used to tell the player to select a subclass.
		Once a subclass is selected, the feature of the subclass with the same object name
		replaces the placeholder (see 2. above).
		So for a subclass to work properly, it needs to have a feature for each
		"subclassfeatureX" object name that its parent class has.

		The class needs at least one "subclassfeatureX" feature, with a `minlevel` that is the
		same as the `subclassGainedLevel` attribute of the class (e.g. "subclassfeature3" for
		a subclass gained at level 3). This is the only "subclassfeatureX" a class needs.
		The class doesn't need a "subclassfeatureX" for every level that a subclass grants a
		feature, as those other features are just added in addition (see 1. above).

	THE `AddSubClass()` FUNCTION
	The `AddSubClass()` function, which is the recommended way to add a subclass, doesn't
	change anything about the features of the subclass.
	So it is up to you to make sure that the subclass has a feature with the same object name
	for every "subclassfeatureX" placeholder of the class (see 3. above) and that the
	`minlevel` of each subclass feature is correct for the class.

	NAMING OF SUBCLASS FEATURES
	The object name of a feature has to be unique within the `features` object of the class or
	subclass. Because subclass features with the same object name as a class feature replace
	that class feature, make sure that you only use the same object name on purpose.
	The safest is to use only "subclassfeatureX" object names for the features of a subclass.

	REFERENCE IN THE HEADER
	The header of a feature in the Class Features section includes a reference to where it is
	from, for example "(Purplemancer 1, SRD 30)".
	For a class feature, this uses the `nameShort` or, if that isn't present, the `name` of the class.
	For a subclass feature, this uses the `subnameShort` or, if that isn't present, the
	`subname` of the subclass, for example "(Violet 3, SRD 33)".

	CHOICE DEPENDENCIES
	The `choiceDependencies` attribute, see below, can refer to features of both the class and
	its subclasses. This way, a choice made for a class feature can automatically select a choice
	for a class feature, a subclass feature, or the other way around.
*/

var exampleClassOrSubclass = { // you can ignore this, it is just here to make this file valid JavaScript
	features: {
/*	features // REQUIRED //
	TYPE:	object with objects
	USE:	the features of the class or subclass that are gained as the class levels up

	Each attribute of this object is a feature, which is in itself an object.
	You can add as many features as you want.
	The syntax for a feature object is explained below.
	The examples below are all written as class features, but subclass features work the same.

	ORDER OF FEATURES
	The features are added to the Class Features section on the 2nd page in the order
	of their `minlevel` attribute. Features with the same `minlevel` are ordered
	alphabetically by their object name, with any "subclassfeatureX" listed last.
	The features of the class and its subclass are sorted together.
	The order in which you write them here is not important.
	If you want a feature to be listed before the other features of the same level,
	you can start its object name with an underscore (e.g. "_spellcasting").
*/
		"purple strike": {
	/*	Class Feature Object Name // REQUIRED //
		TYPE:	object name (lowercase)
		USE:	object name of the class feature as it will be used by the sheet

		This object name has to be unique within the `features` object of the class or subclass.
		Note the use of only lower case!

		The object name is used by the sheet to remember choices made for the feature and
		by other attributes and functions to refer to this feature (e.g. the
		`bonusClassExtrachoices` common attribute and the `AddFeatureChoice()` function).
		Because of this, you shouldn't change the object name after publishing your script.

		SUBCLASS FEATURES
		If a subclass has a feature with the exact same object name as a feature of its
		parent class, the feature of the subclass will replace the feature of the class
		once that subclass is selected.
		See "CLASS FEATURES AND SUBCLASS FEATURES" at the top of this file for how this
		works and how "subclassfeatureX" object names are used to prompt for a subclass.
	*/
			name: "Purple Strike",
		/*	name // REQUIRED //
			TYPE:	string
			USE:	name of the feature as it will be used by the sheet

			This name is used as the header of the feature in the Class Features section on the 2nd page.
			It is also used for things that the feature adds to the sheet with common attributes,
			like the name of the limited feature, the name of the action, and in tooltips.

			If this is an empty string, nothing will be added to the Class Features section
			for this feature.
		*/
			source: ["SRD", 30],
			source: [["SRD", 30], ["P", 12]],
		/*	source // REQUIRED //
			TYPE:	array with two entries (or array of these arrays)
			USE:	define where the feature is found

			This works identical to the `source` attribute of the ClassList and ClassSubList objects.
			The first source in the array is added to the header of the feature in the
			Class Features section, together with the class' name and the feature's `minlevel`.
			For example "(Purplemancer 1, SRD 30)".
			For a subclass feature, the subclass' name is used instead of the class' name,
			see "REFERENCE IN THE HEADER" at the top of this file.
		*/
			minlevel: 1,
		/*	minlevel // REQUIRED //
			TYPE:	number
			USE:	the class level at which the feature is gained

			Once the class reaches this level, the feature will be added to the sheet.
			If the class level drops below this level, the feature will be removed again.

			For a subclass feature, this is also the level in the parent class.
		*/
			description: "\nOnce per turn when I hit a creature with a weapon attack, I can do +1d6 force damage",
			description: desc([
				"Once per turn when I hit a creature with a weapon attack, I can do extra force damage",
				"This extra damage increases as I gain purplemancer levels",
			]),
			description: levels.map(function (n) {
				return n < 11 ? desc("Once per turn when I hit with a weapon attack, I can do +1d6 force damage") : desc("Whenever I hit with a weapon attack, I can do +2d6 force damage");
			}),
		/*	description // OPTIONAL //
			TYPE:	string or array of strings with 20 entries
			USE:	the text to be added to the Class Features section on the 2nd page
			CHANGE: v14.0.0 (formatting characters)

			Note that the sheet normally uses the first person for this.
			Make sure that this description is not too long and fits well in the Class Features section.
			The Colourful sheets have less space than the Printer Friendly versions,
			so use the Colourful sheets to test if the description fits.

			The description is added directly after the header of the feature.
			The header is generated by the sheet and looks something like this:
				"◆ Purple Strike (Purplemancer 1, SRD 30) [+1d6, 2× per short rest]"
			The part in square brackets is generated from the `additional`, `usages`, and
			`recovery` common attributes, if present.

			LINE BREAKS
			As the description is added directly after the header, you will normally want it to
			start with a line break (i.e. "\n"), see the first example above.
			You can use the `desc()` function to do that for you, see the second example above.
			This function takes a string, or an array of strings, and returns a single string
			with each of the strings preceded by a line break.
			If you want the description to be on the same line as the header (e.g. because it is
			really short), start it with a space instead, for example:
				description: " [+1 AC while wearing armor]",

			ARRAY (LEVEL-DEPENDENT DESCRIPTION)
			If the description changes as the class gains levels, you can make this attribute
			an array of strings, see the third example above.
			The first entry is for class level 1, the second entry for level 2, etc.
			If the class level is higher than the array is long, the last entry in the array is used.
			The sheet has a variable called `levels`, which is an array with the numbers 1 to 20.
			This is useful to quickly generate an array with 20 entries, using the Array.map() method.
			See "USING levels.map()" in the Common Attributes section below for how this works
			and what its limitations are.
			Note that an array of strings is never joined together, it is always treated as
			being level-dependent. Use the `desc()` function if you want to join strings.

			FORMATTING CHARACTERS (since v14.0.0)
			This can be formatted using the Rich Text formatting characters.
			Text between the formatting characters will be displayed differently on the sheet.
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

			You can combine the formatting characters to apply multiple formatting options to one
			string, but there are some limitations to consider.
				1. Formatting characters don't work across line breaks (`\r` and `\n`).
					This won't work:
						"**text before and" + "\n" + "text after line break**"
					Instead do this:
						"**text before and**" + "\n" + "**text after line break**"
				2. Combining formatting characters requires them to be in the same or reversed order.
					This won't work:
						"_**~underlined, strikethrough, and bold**_~"
					Instead do this:
						"_**~underlined, strikethrough, and bold~**_"
					or this:
						"_**~underlined, strikethrough, and bold_**~"
				3. Tabs (`\t`) and multiple spaces will break the formatting if the field is edited manually.
					This should be avoided:
						"**text before and" + "\t" + "text after tab**"
					Instead do this:
						"**text before and**" + "\t" + "**text after tab**"

			Be aware that the default font on the Colourful sheets is already italic,
			so making something only italic won't be visible on the Colourful sheets.

			UNITS
			The sheet will automatically convert imperial units (ft, miles, lb) in the description
			to their metric equivalents if the sheet is set to use the metric system.

			If this attribute is not present (i.e. undefined), nothing will be added to the
			Class Features section for this feature.
			You can use that for features that should only do something through their common attributes or offer `extrachoices` (see below).
		*/

		/*
			>>>>>>>>>>>>>>>>>>>>>>>>>
			>>> Common Attributes >>>
			>>>>>>>>>>>>>>>>>>>>>>>>>

			You can have the class feature affect different parts of the sheet like adding proficiencies,
			adding spellcasting abilities, actions, limited features, etc. etc.

			See the "_common attributes.js" file for documentation on how to do those things and more.
			All attributes in there can directly be added in this object.

			Common attributes are applied when the feature is gained (i.e. the class reaches
			the `minlevel` of the feature) and removed when the feature is lost.
			The exception to this are the level-dependent attributes, see below.
			If you want other things to change with class level, use the `changeeval` common attribute.
		*/
			usages: 2,
			usages: [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4],
			usages: levels.map(function (n) {
				return n < 5 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4;
			}),
			recovery: "short rest",
			recovery: ["long rest", "long rest", "long rest", "long rest", "long rest", "long rest", "long rest", "long rest", "long rest", "long rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest"],
			recovery: levels.map(function (n) {
				return n < 11 ? "long rest" : "short rest";
			}),
			additional: "+1d6",
			additional: ["+1d6", "+1d6", "+1d6", "+1d6", "+1d6", "+1d6", "+1d6", "+1d6", "+1d6", "+1d6", "+2d6", "+2d6", "+2d6", "+2d6", "+2d6", "+2d6", "+2d6", "+2d6", "+2d6", "+2d6"],
			additional: levels.map(function (n) {
				return "+" + (n < 11 ? 1 : 2) + "d6";
			}),
			altResource: "SS 1+",
			altResource: ["", "SS 3+", "SS 3+", "SS 3+", "SS 3+", "SS 3+", "SS 3+", "SS 3+", "SS 3+", "SS 3+", "SS 2+", "SS 2+", "SS 2+", "SS 2+", "SS 2+", "SS 2+", "SS 1+", "SS 1+", "SS 1+", "SS 1+"],
			altResource: levels.map(function (n) {
				return n < 2 ? "" : n < 11 ? "SS 3+" : n < 17 ? "SS 2+" : "SS 1+";
			}),
			limfeaname: "Purple Strike (+1d6)",
			limfeaname: ["", "", "", "Purple Strike", "Purple Strike", "Purple Strike", "Purple Strike", "Improved Purple Strike"],
			limfeaname: levels.map(function (n) {
				return n < 3 ? "" : n < 7 ? "Purple Strike" : "Improved Purple Strike";
			}),
			usagescalc: "event.value = Math.max(1, What('Wis Mod'));",
			usagescalc: ["", "", "", "", "", "", "event.value = Math.max(1, What('Wis Mod'));", "event.value = Math.max(1, What('Wis Mod'));", "event.value = Math.max(1, What('Wis Mod'));", "event.value = Math.max(1, What('Wis Mod'));", "event.value = Math.max(1, What('Wis Mod') * 2);"],
			usagescalc: levels.map(function (n) {
				return n < 7 ? "" : "event.value = Math.max(1, What('Wis Mod')" + (n < 12 ? "" : " * 2") + ");";
			}),

			usages: "Wisdom modifier per ",
			usagescalc: "event.value = Math.max(1, What('Wis Mod'));",
		/*	usages, recovery, additional, altResource, limfeaname, usagescalc // OPTIONAL //
			TYPE:	see the "_common attributes.js" file, or an array with 20 entries of that type
			USE:	add the feature to the Limited Features section and to the feature's header

			These are common attributes, see the "_common attributes.js" file for what they do
			and what values they accept.
			They are listed here because they are the only common attributes that can be
			level-dependent.

			LEVEL-DEPENDENT ATTRIBUTES
			The common attributes `usages`, `recovery`, `additional`, `altResource`, `limfeaname`,
			and `usagescalc` can each be either a single value or an array with an entry for
			each class level.
			Each has three examples above: a single value, an array written out in full,
			and the same array generated with `levels.map()`.
			The last two lines above are a separate example of a number of usages that depends
			on a dynamic modifier, see "levels.map() RETURNS A STATIC ARRAY" below.

			If you use an array, the first entry is for class level 1, the second entry for
			level 2, etc.
			If the class level is higher than the array is long, the last entry in the array is used.
			The sheet will update the Class Features and Limited Features sections whenever
			the class level changes.
			For the levels at which the feature is not present (i.e. lower than its `minlevel`),
			set the entry to 0 for `usages` and to an empty string for the other attributes.

			USING levels.map()
			Writing out 20 entries by hand is tedious and makes it easy to miscount.
			The sheet has a global variable called `levels`, which is simply this array:
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
			The Array.map() method calls the function you give it once for each entry in that
			array and returns a new array with what the function returned each time.
			The function is passed the entry as its first parameter (`n` in the examples above),
			which, because of what the `levels` array contains, is the class level.
			So with `levels.map()` you write the logic for a single class level `n`, and get
			an array with the result for each of the 20 class levels.
			The second and third example of each attribute above produce the exact same array.

			levels.map() RETURNS A STATIC ARRAY
			The function you give to `levels.map()` is not saved by the sheet.
			It is executed 20 times immediately, at the moment the script is run, and only
			the resulting array is stored in the attribute.
			This means the sheet never runs the function again and that the array never changes.
			The attribute is not a function, it is just a shorter way to write a fixed array.

			Because of this, it can't include dynamic modifiers from the sheet, such as the
			current Proficiency Bonus or an ability score modifier.
			If you do include those, their value is taken at the time the sheet is opened,
			and the array won't update when the modifier changes afterwards.
			For example, don't do this:
				usages: levels.map(function (n) {
					return n < 5 ? 1 : Number(How("Proficiency Bonus"));
				}),
			If the sheet is opened while the Proficiency Bonus is 3, this is identical to:
				usages: [1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
			The usages will stay at 3, even after the Proficiency Bonus has increased to 4,
			until the sheet is closed and opened again.

			If the number of usages depends on a dynamic modifier, use the `usagescalc`
			common attribute instead, as that is recalculated whenever something changes on the sheet.
			See the last two example lines above, where the number of usages is the Wisdom modifier:
				usages: "Wisdom modifier per ",
				usagescalc: "event.value = Math.max(1, What('Wis Mod'));",
			The `usagescalc` sets the number in the Limited Features section and keeps it up to date.
			The `usages` is a string that describes the number in words, because it is used
			for the text in the feature's header, which is not recalculated.

			Note that `usagescalc` can itself be an array made with `levels.map()` without
			this problem, see its third example above.
			The array is just as static, but its entries are strings of code that the sheet
			runs later, so `What('Wis Mod')` is only read when the field is calculated,
			not when the array is created.
			The level `n` is used outside of the string, while the dynamic modifier is inside it.
		*/
		},

		/*
			>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
			>>> Class Feature with Choices (replaces main feature) >>>
			>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

			The next part is about the use of the `choices` attribute, which is optional.
			The `choices` attribute will allow the class feature to have a subset of options.
			The player can select one of those options with the "Choose Feature" button on the 2nd page.
			Only one option can be selected at a time. Selecting another replaces the previous selection.

			To set up a choice, add the `choices` attribute, see below, and add an object for each of those choices.
			The object name has to be exactly the same as the string in the `choices` array, but need to be all lowercase.
		*/
		"purple aura": {
			name: "Purple Aura",
			source: [["SRD", 31]],
			minlevel: 2,
			description: ' #[Select option with "Choose Feature"]#' + desc('Choose a Purple Aura using the "Choose Feature" button above'),
			choices: ["Aura of Lavender", "Aura of Violet"],
		/*	choices // OPTIONAL //
			TYPE:	array (variable length)
			USE:	options for the class feature

			The text in the array is presented to the player as options to choose from in
			the menu of the "Choose Feature" button on the 2nd page.
			The options will be sorted alphabetically in the menu.

			You will have to make a 'choice' object for each item you include in this array.
			To make a choice object, use the exact name of the entry in this array, but lowercase.
			See the below example "aura of lavender" for more information.

			As long as no choice is made, the sheet will use the `name`, `description`, etc.
			of the class feature itself.
			So use the `description` to tell the player that something needs to be selected.
		*/
			choicesNotInMenu: true,
		/*	choicesNotInMenu // OPTIONAL //
			TYPE:	boolean
			USE:	don't list this class feature in the "Choose Feature" menu

			Set this attribute to true if the options of this class feature should not be
			selectable by the player using the "Choose Feature" button.
			Use this if the choice is made automatically, for example because it is set by
			the `choiceDependencies` attribute of another class feature, see below.

			Be aware that this also stops the `extrachoices` of the class feature from being
			listed in the menu, see below.

			Setting this attribute to false is the same as not including this attribute.
		*/
			defaultChoice: "aura of lavender",
		/*	defaultChoice // OPTIONAL //
			TYPE:	string
			USE:	the choice to select automatically when the class feature is gained

			This has to be the object name of one of the choice objects (i.e. all lowercase).
			This choice will be applied when the class feature is first added to the sheet
			and no choice was made before.
			The player can still change the choice using the "Choose Feature" button.

			This attribute will be ignored if the `choices` attribute is not present.
		*/
			choiceDependencies: [{
				feature: "improved purple aura",
				choiceAttribute: true,
			}],
		/*	choiceDependencies // OPTIONAL //
			TYPE:	array of objects (or just a single object)
			USE:	automatically select a choice for another class feature depending on the choice made for this class feature

			Use this if another feature of the class (or its subclass) changes depending on
			what has been chosen for this class feature.
			Whenever a choice is made for this class feature, the sheet will make a choice
			for the other class feature as well.
			You will normally want to give that other class feature the attribute
			`choicesNotInMenu: true`, so that the player can't select something else there.

			Each object in the array can have the following attributes:

			ATTRIBUTE		EXPLANATION
			feature			// REQUIRED //
							TYPE:	string
							USE:	object name of the class feature to select a choice for
							This has to be a feature of the same class or one of its subclasses.
			choiceAttribute // OPTIONAL //
							TYPE:	boolean
							USE:	set to true to use the `dependentChoices` attribute of the choice object
							By default, the sheet will select the choice in the other class feature that has
							the exact same object name as the choice selected for this class feature.
							Thus, in this example, the "improved purple aura" feature would need to have
							choice objects called "aura of lavender" and "aura of violet".
							If you set this attribute to true, the sheet will instead select the choice that
							is set in the `dependentChoices` attribute of the selected choice object,
							see "aura of lavender" below.

			This attribute will be ignored if the `choices` attribute is not present.
		*/

			"aura of lavender": {
		/*	Choice Object Name
			TYPE:	object name
			USE:	this has to be identical to the entry in the `choices` array that this refers to, but all lowercase

			This is an object within the class feature object.
			This object wil be referred to as 'choice' from here on in.
			The parent class feature object wil be referred to as 'parent' from here on in.
		*/
				name: "Aura of Lavender",
			/*	name (inside choice) // OPTIONAL //
				TYPE:	string
				USE:	name of the choice as it will be used by the sheet

				If present, this name will be used instead of the name of the parent in the
				Class Features section.
				If no name is given, the object name of the choice will be used.
			*/
				description: desc("Allies within 10 ft of me have advantage on saves against being frightened"),
			/*	description (inside choice) // OPTIONAL //
				TYPE:	string or array of strings with 20 entries
				USE:	the text to be added to the Class Features section on the 2nd page

				This works identical to the `description` of the parent, see above.
				If present, this description will be used instead of the description of the parent.
				If not present, the description of the parent will be used.
			*/
				source: [["SRD", 32]],
			/*	source (inside choice) // OPTIONAL //
				TYPE:	array with two entries (or array of these arrays)
				USE:	define where the choice is found

				This works identical to the `source` of the parent, see above.
				If present, this source will be used instead of the source of the parent.

				The source is also displayed in the "Choose Feature" menu.
				If the source of the choice is excluded by the player, the choice will not be
				listed in the "Choose Feature" menu.
			*/
				minlevel: 6,
			/*	minlevel (inside choice) // OPTIONAL //
				TYPE:	number
				USE:	the class level required to select this choice

				If the class level is lower than this number, the choice will be shown in the
				"Choose Feature" menu, but it will be greyed out and can't be selected.
			*/
				prereqeval: function (v) {
					return classes.known.purplemancer.level >= 6 && v.choiceActive !== "aura of violet";
				},
			/*	prereqeval (inside choice) // OPTIONAL //
				TYPE:	function or, for backwards-compatibility, string that is evaluated using eval()
				USE:	this should return `true` if the prerequisite is met or `false` otherwise
				CHANGE:	v13.0.6 (added "markButDisable" return option)
				CHANGE:	v14.0.1 (added `choiceActive` to the `v` variable)

				This is used to determine if the choice is selectable in the "Choose Feature" menu.
				Depending on what the function returns, the following will happen:
					RETURNS				RESULT
					true				The choice is listed in the menu and can be selected.
					false				The choice is listed in the menu, but it is greyed out.
					"skip"				The choice is not listed in the menu at all.
					"markButDisable"	The choice is listed in the menu with a checkmark as if it is
										selected, but it is greyed out.

				A choice that is currently selected is always listed and never greyed out,
				regardless of what the `prereqeval` returns.

				The function is fed one variable, v, an object containing attributes with information about the character.
				Changing these attributes does nothing, but you can use them to test if the character meets the requirements.

				This attributes of this object are explained below:
				var v = {
					isSpellcaster,  	// boolean; true if the character has spellcasting from a source other than magic items
					isSpellcastingClass,// boolean; true if the character has spell slots from a class (i.e. the Spellcasting or Pact Magic feature)
					characterLevel, 	// number; the total character level
					shieldProf,     	// boolean; true if the checkbox for shield proficiency is checked
					lightArmorProf, 	// boolean; true if the checkbox for light armour proficiency is checked
					mediumArmorProf,	// boolean; true if the checkbox for medium armour proficiency is checked
					heavyArmorProf, 	// boolean; true if the checkbox for heavy armour proficiency is checked
					simpleWeaponsProf,	// boolean; true if the checkbox for simple weapon proficiency is checked
					martialWeaponsProf,	// boolean; true if the checkbox for martial weapon proficiency is checked
					otherWeaponsProf,	// array; the WeaponsList object names of those listed in the other weapon proficiencies field (or the literal string if not a recognized weapon)
					toolProfs,   		// array; the contents of the tool fields, one field per array entry
					toolProfsLC,   		// array; same as toolProfs, but all lowercase
					languageProfs,   	// array; the contents of the language fields, one field per array entry
					languageProfsLC,   	// array; same as languageProfs, but all lowercase
					skillProfs,     	// array; the skills the character is proficient in, one skill name per array entry
					skillProfsLC,   	// array; same as skillProfs, but all lowercase
					skillExpertise,     // array; the skills the character has expertise with, one skill name per array entry
					skillExpertiseLC,   // array; same as skillExpertise, but all lowercase
					hasEldritchBlast,	// boolean; true if the character has the Eldritch Blast cantrips
					choice, 			// string; the object name of the choice that is being tested (e.g. "aura of lavender")
					choiceActive,		// string or array;
										// for `choices`: the object name of the currently selected choice (empty string if none)
										// for `extrachoices`: array of the object names of the currently selected extrachoices
				}
				N.B. The first entry of both the toolProfs and languageProfs arrays is the contents of the 'More Proficiency' field

				Other than using the 'v' variable, this function can be any JavaScript you want.
			*/
				submenu: "[Purplemancer level 6+]",
				submenu: ["[Purplemancer level 6+]", "[Requires a Purple Robe]"],
			/*	submenu (inside choice) // OPTIONAL //
				TYPE:	string or array of strings
				USE:	list the choice in a submenu of this name in the "Choose Feature" menu
				ADDED:	v13.0.6
				CHANGE:	v14.0.0 (added option for array)

				Use this if the class feature has so many choices that the menu would become too long.
				All choices with the same `submenu` string will be grouped together in a submenu.
				The submenus and the choices without `submenu` attribute are sorted alphabetically.

				If this is an array, the choice will be listed in each of those submenus.
			*/
				dependentChoices: "lavender improvement",
			/*	dependentChoices (inside choice) // OPTIONAL //
				TYPE:	string
				USE:	object name of the choice to select for the class features set in `choiceDependencies` of the parent

				This attribute is only used if the parent has the `choiceDependencies` attribute
				and the object in that array has `choiceAttribute: true`, see above.

				In this example, when "aura of lavender" is selected, the sheet will automatically
				select the choice "lavender improvement" for the "improved purple aura" class feature.
			*/

			/*
				>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
				>>> Common Attributes (inside choice) >>>
				>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

				You can have the choice affect different parts of the sheet as well,
				separate from the parent.

				See the "_common attributes.js" file for documentation on how to do those things and more.
				All attributes in there can directly be added in this object.

				Note that all common attributes in the choice object will be in addition to those
				in the parent object, with the exception of things pertaining to the
				level-dependent limited features.

				LIMITED FEATURES
				`usages`, `recovery`, `altResource`, `usagescalc`, `additional`, and `limfeaname`
				in the choice object will be used instead of those in the parent object.
				If the choice object doesn't have one of these attributes, the one from the parent is used.
			*/
			},
			"aura of violet": {
				name: "Aura of Violet",
				description: desc("Allies within 10 ft of me have advantage on saves against being charmed"),
			},
		},

		/*
			>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
			>>> Class Feature with Extra Choices (in addition to main feature) >>>
			>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

			The next part is about the use of the `extrachoices` attribute, which is optional.
			The `extrachoices` attribute will allow the class feature to have a subset of options
			of which the player can select multiple (e.g. Warlock's Eldritch Invocations).
			The player can select and deselect these options with the "Choose Feature" button on the 2nd page.

			Contrary to the `choices` attribute, selecting an extrachoice does not replace
			anything of the class feature itself.
			The text of each selected extrachoice is added to the Notes section on the 3rd page,
			because they wouldn't fit in the Class Features section if the class is taken to level 20.
			On the Colourful sheets, this will also hide the Rules section on the 3rd page,
			so that the Notes section is visible.

			To set up an extrachoice, add the `extrachoices` attribute, see below, and add an object for each of those extrachoices.
			The object name has to be exactly the same as the string in the `extrachoices` array, but need to be all lowercase.

			A class feature can have both the `choices` and the `extrachoices` attribute.

			The `bonusClassExtrachoices` common attribute can be used by other things (e.g. a feat)
			to grant extra selections of a class feature's extrachoices.
		*/
		"purple tricks": {
			name: "Purple Tricks",
			source: [["SRD", 32]],
			minlevel: 3,
			description: desc('I learn Purple Tricks; use the "Choose Feature" button above to add them to the 3rd page'),
			additional: levels.map(function (n) {
				return n < 3 ? "" : (n < 10 ? 2 : 4) + " tricks known";
			}),
			extrachoices: ["Mauve Mist", "Plum Punch", "Violet Veil"],
		/*	extrachoices // OPTIONAL //
			TYPE:	array (variable length)
			USE:	options for the class feature of which multiple can be selected

			The text in the array is presented to the player as options to choose from in
			the menu of the "Choose Feature" button on the 2nd page.
			The options will be sorted alphabetically in the menu.

			You will have to make an 'extrachoice' object for each item you include in this array.
			To make an extrachoice object, use the exact name of the entry in this array, but lowercase.
			See the below example "mauve mist" for more information.
		*/
			extraname: "Purple Trick",
		/*	extraname // REQUIRED (if `extrachoices` is present) //
			TYPE:	string
			USE:	how the extrachoices are called

			This string is used for two things:
			1. As the name of the submenu in the "Choose Feature" menu, followed by the number of
			   selected extrachoices, for example "Purple Trick (selected 1 of 2)".
			2. As the reference in the header of each selected extrachoice in the Notes section
			   on the 3rd page, for example "◆ Mauve Mist (Purple Trick, SRD 32)".
		*/
			extraTimes: 2,
			extraTimes: levels.map(function (n) {
				return n < 3 ? 0 : n < 10 ? 2 : 4;
			}),
		/*	extraTimes // OPTIONAL //
			TYPE:	number or array of numbers (variable length)
			USE:	the number of extrachoices the player is allowed to select

			This number is only used to inform the player in the "Choose Feature" menu,
			for example "Purple Trick (selected 1 of 2)".
			The sheet does not enforce this number, the player can always select more.

			If this is an array, the first entry is for class level 1, the second entry for level 2, etc.
			If the class level is higher than the array is long, the last entry in the array is used.

			If this attribute is not present, the menu will only show the number of selected extrachoices.
		*/
			extrachoicesNotInMenu: true,
		/*	extrachoicesNotInMenu // OPTIONAL //
			TYPE:	boolean
			USE:	don't list the extrachoices of this class feature in the "Choose Feature" menu

			Set this attribute to true if the extrachoices of this class feature should not be
			selectable by the player using the "Choose Feature" button.
			Use this if all the extrachoices are added automatically with the
			`autoSelectExtrachoices` attribute, see below.

			Contrary to `choicesNotInMenu`, this attribute doesn't affect whether the `choices`
			of the class feature are listed in the menu.

			Setting this attribute to false is the same as not including this attribute.
		*/
			autoSelectExtrachoices: [{
				extrachoice: "violet veil",
				minlevel: 10,
				extraname: "Purplemancer 10",
			}],
		/*	autoSelectExtrachoices // OPTIONAL //
			TYPE:	array of objects (or just a single object)
			USE:	automatically select extrachoices when the class reaches a certain level

			Use this to have the sheet add an extrachoice to the Notes section on the 3rd page
			without the player having to select it.
			This is useful for class features that are too long to fit in the Class Features
			section, or that gain extra options at higher levels.
			You can then keep the `description` of the feature short and have it refer to the 3rd page.

			The extrachoice object doesn't have to be listed in the `extrachoices` array.
			In fact, the `extrachoices` attribute doesn't have to be present at all.
			If it isn't, you probably want to set the `extraname` in each of the objects in this array.

			Each object in the array can have the following attributes:

			ATTRIBUTE		EXPLANATION
			extrachoice		// REQUIRED //
							TYPE:	string
							USE:	object name of the extrachoice object to select (i.e. all lowercase)
			minlevel		// OPTIONAL //
							TYPE:	number
							USE:	the class level at which the extrachoice is added
							If not present, the `minlevel` of the parent class feature is used.
							If the class level drops below this level, the extrachoice is removed again.
			extraname		// OPTIONAL //
							TYPE:	string
							USE:	the reference to use in the header of the extrachoice on the 3rd page
							If not present, the `extraname` of the extrachoice object or, if that isn't
							present either, the `extraname` of the parent class feature is used.
		*/

			"mauve mist": {
		/*	Extrachoice Object Name
			TYPE:	object name
			USE:	this has to be identical to the entry in the `extrachoices` array that this refers to, but all lowercase

			This is an object within the class feature object.
			This object wil be referred to as 'extrachoice' from here on in.
			The parent class feature object wil be referred to as 'parent' from here on in.
		*/
				name: "Mauve Mist",
			/*	name (inside extrachoice) // REQUIRED //
				TYPE:	string
				USE:	name of the extrachoice as it will be used by the sheet

				This name is used as the header of the extrachoice in the Notes section on the 3rd page.
				It is also used for things that the extrachoice adds to the sheet with common attributes,
				like the name of the limited feature, the name of the action, and in tooltips.
			*/
				description: desc("As a bonus action, I can create a 10-ft radius sphere of purple mist centered on me"),
			/*	description (inside extrachoice) // OPTIONAL //
				TYPE:	string or array of strings with 20 entries
				USE:	the text to be added to the Notes section on the 3rd page

				This works identical to the `description` of the parent, see above.
				The header for an extrachoice looks something like this:
					"◆ Mauve Mist (Purple Trick, SRD 32) [1× per short rest]"

				If this attribute is not present (i.e. undefined), no string will be added to the
				Notes section for this extrachoice, but all other attributes will still be applied.
			*/
				extraname: "Purplemancer 3",
			/*	extraname (inside extrachoice) // OPTIONAL //
				TYPE:	string
				USE:	the reference to use in the header of the extrachoice on the 3rd page

				If present, this will be used instead of the `extraname` of the parent.
				In this example, the header would read "◆ Mauve Mist (Purplemancer 3, SRD 32)".
			*/

			/*	source (inside extrachoice) // OPTIONAL //
				minlevel (inside extrachoice) // OPTIONAL //
				prereqeval (inside extrachoice) // OPTIONAL //
				submenu (inside extrachoice) // OPTIONAL //

				These four attributes work identical to how they work inside a choice object, see above.
			*/

			/*
				>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
				>>> Common Attributes (inside extrachoice) >>>
				>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

				You can have the extrachoice affect different parts of the sheet as well,
				separate from the parent.

				See the "_common attributes.js" file for documentation on how to do those things and more.
				All attributes in there can directly be added in this object.

				An extrachoice is processed completely separate from its parent.
				The common attributes of the parent are not used for the extrachoice,
				including those for limited features (`usages`, `recovery`, etc.).
			*/
			},
			"plum punch": {
				name: "Plum Punch",
				description: desc("My unarmed strikes deal force damage instead of bludgeoning damage"),
			},
			"violet veil": {
				name: "Violet Veil",
				description: desc("As a reaction when I'm hit by an attack, I can gain a +2 bonus to AC against that attack"),
				action: [["reaction", ""]],
			},
		},

		/*
			>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
			>>> Choices that Change the Available Extrachoices >>>
			>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		*/
		"purple path": {
			name: "Purple Path",
			source: [["SRD", 33]],
			minlevel: 5,
			description: desc('Choose a Purple Path using the "Choose Feature" button above'),
			choices: ["Path of Dusk"],
			choiceSetsExtrachoices: true,
		/*	choiceSetsExtrachoices // OPTIONAL //
			TYPE:	boolean
			USE:	signal that the choice objects of this class feature have their own `extrachoices`
			ADDED:	v13.0.6

			Set this attribute to true if the extrachoices that are available to the player
			depend on what is selected for the `choices` of this class feature.

			With this attribute set to true, you can add the following attributes to the choice
			objects of this class feature, together with the extrachoice objects they refer to:
				`extrachoices`
				`extraname`
				`extraTimes`
				`autoSelectExtrachoices`
			When a choice is selected, the sheet will use these attributes from that choice object
			as if they were in the parent class feature.
			When another choice is selected, the extrachoices selected for the previous choice
			will be removed from the sheet.

			You don't have to set this attribute if you add a choice to a class feature using
			the `AddFeatureChoice()` function, as that function will set it for you.

			Setting this attribute to false is the same as not including this attribute.
		*/
			"path of dusk": {
				name: "Path of Dusk",
				description: desc('I learn a Dusk Trick; use the "Choose Feature" button above to add it to the 3rd page'),
				extraname: "Dusk Trick",
				extrachoices: ["Twilight Step"],
				extraTimes: 1,
				"twilight step": {
					name: "Twilight Step",
					description: desc("As a bonus action while in dim light or darkness, I can teleport up to 30 ft"),
					action: [["bonus action", ""]],
				},
			},
		},

		/*
			>>>>>>>>>>>>>>>>>>>>>>
			>>> Fighting Style >>>
			>>>>>>>>>>>>>>>>>>>>>>

			A Fighting Style class feature is made using the `choices` attribute, see above.
			The sheet has a global variable called `FightingStyles`, which contains a choice object
			for each of the Fighting Styles from the Player's Handbook.
			You can use these as the choice objects of your class feature, so that you don't have
			to write them yourself, like in the example below.
			The object names in `FightingStyles` are:
				archery, defense, dueling, great_weapon, protection, two_weapon

			SELECTED ELSEWHERE
			If the object name or the `name` of the class feature contains "fighting style",
			the sheet will not allow the player to select a choice that is already selected
			for another Fighting Style class feature or as a feat.
			Those choices are greyed out in the "Choose Feature" menu.

			ADDING A FIGHTING STYLE TO EXISTING CLASSES
			If you want to add a new Fighting Style to the classes that already have the
			Fighting Style class feature, use the `AddFightingStyle()` function.
			This function takes three variables, all of which are required:
				1. array of strings, the object names of the classes to add the Fighting Style to,
				   for example ["fighter", "paladin", "ranger"]
				2. string, the name of the Fighting Style as it will appear in the `choices` array
				3. object, the choice object for the Fighting Style
			For example:
				AddFightingStyle(["fighter", "ranger", "paladin"], "Purple Style", {
					name: "Purple Fighting Style",
					description: desc("+1 bonus to AC while I'm wearing purple"),
				});
			This adds the Fighting Style to the "fighting style" class feature of each of those classes.
		*/
		"fighting style": {
			name: "Fighting Style",
			source: [["SRD", 24]],
			minlevel: 1,
			description: desc('Choose a Fighting Style for the purplemancer using the "Choose Feature" button above'),
			choices: ["Defense", "Dueling", "Protection"],
			"defense": FightingStyles.defense,
			"dueling": FightingStyles.dueling,
			"protection": FightingStyles.protection,
		},

		/*
			>>>>>>>>>>>>>>>>>>
			>>> Wild Shape >>>
			>>>>>>>>>>>>>>>>>>
		*/
		"purple shape": {
			name: "Purple Shape",
			source: [["SRD", 20]],
			minlevel: 2,
			description: desc("As an action, I can shape-shift into a purple beast that I have seen before"),
			usages: 2,
			recovery: "short rest",
			wildshapePageInfo: {
				uses: levels.map(function (n) {
					return n < 20 ? "2\xD7 per short rest" : "unlimited";
				}),
				duration: levels.map(function (n) {
					return Math.floor(n / 2) + " hour" + (n > 3 ? "s" : "");
				}),
				limitations: levels.map(function (n) {
					return n < 8 ? "max CR 1/2, no fly speed" : "CR 1 or lower";
				}),
			},
		/*	wildshapePageInfo // OPTIONAL //
			TYPE:	object (optional attributes)
			USE:	set the information in the header of the Wild Shape page(s)
			ADDED:	v14.0.6

			Use this for a class feature that allows the character to change into another
			creature, to be used in conjunction with the Wild Shape page.
			The sheet will fill the fields at the top of the Wild Shape page with the
			information provided here and will update them whenever the class level changes.
			It will also recalculate all the selected wild shapes whenever the class level changes.

			This attribute does not add a Wild Shape page, the player will have to do that.

			This object can have the following attributes, all of which are optional:

			ATTRIBUTE		USE FOR
			uses			how often a wild shape can be assumed
			duration		how long a wild shape lasts
			limitations		the limitations for selecting wild shape forms (e.g. maximum CR)

			Each attribute can be a string, a number, or an array of those.
			If it is an array, the first entry is for class level 1, the second entry for level 2, etc.
			If the class level is higher than the array is long, the last entry in the array is used.

			If multiple class features have this attribute, the sheet will only use the one
			with the highest `minlevel` that the character has access to.
		*/
		},
	},
}
