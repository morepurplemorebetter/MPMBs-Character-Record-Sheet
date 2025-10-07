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

	Subject:	Feat

	Effect:		This is the syntax for adding a new feat to the sheet.

	Remarks:	You will also need the syntax for common attributes if you want the feat
				to do anything besides populating its description field.
				You will also need the syntax for adding a source if you want the feat
				to have a source that doesn't yet exist in the sheet.

	Sheet:		v14.0.0 and newer

*/

var iFileName = "Homebrew Syntax - FeatsList.js";
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

RequiredSheetVersion("13.0.6");
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

FeatsList["purple power"] = {
/* 	FeatsList object name // REQUIRED //
	TYPE:	string
	USE:	object name of the feat as it will be used by the sheet

	By adding a new object to the existing FeatsList object, we create a new feat.
	The object name here is 'purple power'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
*/
	name : "Purple Power",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the feat as it will be used by the sheet

	This name will also be used to recognize what is selected in the feat drop-down.
*/
	source : ["SRD", 204],
	source : [["E", 7], ["S", 115]],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the feat is found

	This attribute is used by the sheet to determine if the feat should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the feat at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 7 of the Elemental Evil Player's Companion and
	on page 115 of the Sword Coast Adventure Guide.

	If a feat is completely homebrew, or you don't want to make a custom source, just put the following:
		source : ["HB", 0],
	"HB" refers to the 'homebrew' source.
*/
	defaultExcluded : true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this feat should be excluded by default (true) or included by default (false)

	Include this attribute and set it to true if the feat should appear in the Excluded list of the
	Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.

	This is useful for optional feats that you wouldn't normally want to use (e.g. playtest or campaign-specific).

	Setting this attribute to false is the same as not including this attribute.
*/
	prerequisite : "Dexterity 13 or higher",
/*	prerequisite // OPTIONAL //
	TYPE:	string
	USE:	textual explanation of a prerequisite the feat has

	If the feat doesn't have a prerequisite, you can just leave this attribute out.
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
		choice,      		// string; the sub-choice of this feat (empty string if no choice)
	}
	N.B. The first entry of both the toolProfs and languageProfs arrays is the contents of the 'More Proficiency' field

	Other than using the 'v' variable, this function can be any JavaScript you want.
	Common usage examples:
		"return CurrentRace.known.indexOf('dwarf') !== -1;" // Test if race is a dwarf
		"return classes.known.cleric ? true : false;" // Test if character has any levels in the cleric class
		"return What('Dex') >= 13;" // Test if character has a Dexterity score of 13 or more
*/
	allowDuplicates : true,
/*	allowDuplicates // OPTIONAL //
	TYPE:	boolean
	USE:	set to true if multiples can exist of this feat (e.g. Elemental Adept using the 'choices' attribute)

	If the feat doesn't allow duplicates, you can just leave this attribute out.
	Setting this to false is the same as not including this attribute.

	IMPORTANT NOTE IF USING 'choices' ATTRIBUTE
	When this feat has multiple forms and uses the 'choices' attribute,
	you probably want to set the 'allowDuplicates' attribute to true.
	If you don't set this attribute to true, the sheet will only allow this feat to exist once,
	regardless if another instance has another form (choices) selected.
*/
	description : "Advantage on Charisma (Deception) and (Performance) if wearing something purple. I can mimic casting any spell perfectly, even producing a purple haze while doing so. Wisdom (Insight) vs. Charisma (Deception) to determine there is no spell being cast. [+1 Charisma]",
/*	description // REQUIRED //
	TYPE:	string
	USE:	the text to be filled in the description field of the feat

	Note that the sheet normally uses the first person for this.
	Make sure that this description is not too long and fits in the description field.
	The Colourful sheets have less space for feat descriptions than the Printer Friendly versions,
	so use the Colourful sheets to test if the description fits.
*/
	descriptionFull : "I gain proficiency in any combination of three skills or tools of my choice.",
	descriptionFull: [
		"Introduction text of the spell. This line will not be preceded by a line break or three spaces as this is the first line.",
		"Second entry, which will be preceded by a line break and three spaces.",
		" \u2022 Bullet point entry. This will be preceded by a line break, but not with three spaces, as this entry starts with a space.",
		" \u2022 Another bullet point entry.",
		[ // This will render as a table (i.e. a tab between each column)
			["Column 1 header", "Column 2 header", "Column 3 header"], // The first row, which will be made bold and italic
			["Column 1 entry", "Column 2 entry", "Column 3 entry"], // The rest of the rows won't be changed
			["Column 1 entry II", "Column 2 entry II", "Column 3 entry II"], // Table row 2
		],
		">>Header Paragraph<<. This paragraph will be preceded by a line break and three spaces. The text 'Header Paragraph' will be rendered with unicode as being bold and italic.",
	],
/*	descriptionFull // OPTIONAL //
	TYPE:	array or string
	USE:	description of the feat as it appears in its source
	CHANGE: v14.0.0 (array option & `>>[...]<<` tags)

	This text is used to populate the tooltip of the feats so that the original description can be read.
	This description will also be available in a pop-up by using the button in the feat's line.
	There is no limit to how big this description can be,
	but very long descriptions will not always display correctly.

	From v14.0.0 onwards, this attribute can be an array. Each entry in the array will be put
	on a new line. Each entry can be one of the following:
		1. String.
		   If the entry is a string that doesn't start with a space character and
		   it is not the first entry, it will be added on a new line,
		   proceeded by three spaces (i.e. `\n   `).
		   If the entry is a string that starts with a space character, it will be added
		   on a new line, but without any preceding spaces.
		   For example, to make a bullet point list, you would use ` \u2022 list entry`
		   (N.B. `\u2022` is unicode for a bullet point).
		2. Array of arrays, which contain only strings
		   If the entry is in itself an array, it is treated as a table.
		   Each entry in that array is a row in the table, with the first row being the headers.
		   The headers will be made bold and italic. This is done with unicode. If unicode is
		   disabled, the sheet will capitalize this instead.
		   Each subarray is rendered with a tab between each column (i.e. `Array.join("\t")`).
		   If instead of a subarray there is a string, it will be added as is.
		   The table will be preceded by two line breaks and followed by one line break.

	You can see an example of this array method above.

	From v14.0.0 onwards, if you put '>>' and '<<' around a part of the string,
	that part will be made bold and italic in the displayed description. This is done with
	unicode. If unicode is disabled, the sheet will capitalize this instead.
*/
	calculate : "event.value = \"I can spend 10 minutes inspiring up to 6 friendly creatures within 30 feet who can see or hear and can understand me. Each gains lvl (\" + What(\"Character Level\") + \") + Cha mod (\" + What(\"Cha Mod\") + \") temporary hit points. One can't gain temporary hit points from this feat again until after a short rest.\";",
/*	calculate // OPTIONAL //
	TYPE:	string
	USE:	this string is set as the field calculation method for the description field of the feat

	The string is evaluated as JavaScript code whenever anything changes on the sheet.
	To change the value of the field, you will have to set the 'event.value' to something.
	The example above sets the field to a text with calculated numbers in the text,
	the character level and Charisma Modifier.

	If this attribute is present, the 'description' attribute will be useless.
	Remember that the 'description' attribute is still required, so you might just want to set it to an empty string:
		description : "",
*/

/*
	>>>>>>>>>>>>>>>>>>>>>>>>>
	>>> Common Attributes >>>
	>>>>>>>>>>>>>>>>>>>>>>>>>

	You can have the feat affect different parts of the sheet like adding proficiencies,
	adding spellcasting abilities, actions, limited features, etc. etc.

	See the "_common attributes.js" file for documentation on how to do those things and more.
	All attributes in there can directly be added in this object.
*/


/*
	>>>>>>>>>>>>>>>>>>>>>>>
	>>> Composite Feats >>>
	>>>>>>>>>>>>>>>>>>>>>>>

	The next part is about the use of the 'choices' attribute, which is optional.
	The 'choices' attribute will allow the feat to have a subset of options.
	The player will be forced to select one of those options, the feat will not be usable without a selection.

	To set up a choice, add the 'choices' attribute, see below, and add an object for each of those choices.
	The object name has to be exactly the same as the string in the 'choices' array, but need to be all lowercase.
*/
	choices : ['Fire', 'Ice'],
/*	choices // OPTIONAL //
	TYPE:	array (variable length)
	USE:	options for the feat

	The text in the array is presented to the player as options to choose from for what form of the feat to use.
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
	USE:	select the 'choice' automatically when the feat is added

	If the feat has the 'choices' attribute, the function in this attribute will be run
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

		This is an object within the main FeatsList object.
		This object wil be referred to as 'choice' from here on in.
		The parent FeatsList object wil be referred to as 'parent' from here on in.
	*/

		name : "Purple Fire Power",
	/*	name (inside choice) // OPTIONAL //
		TYPE:	string
		USE:	name of the feat option as it will be used by the sheet

		If present, this name will be used instead of the name of the parent.
		This name will also be used to recognize what is typed in the feat drop-down.

		If no name is given, the name of an option will be dynamically generated from
		the parent and this 'choices' entry the choice refers to.
		In this example that would be "Purple Power [Fire]"

		IMPORTANT
		The name of an option should be unique, it can't be the same as the parent feat.
	*/

		description : "As an action, I can drink this potion or administer it to another to gain the effects of Haste for 1 minute (no concentration required).\rThe potion's yellow fluid is streaked with black and swirls on its own.",
	/*
		>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		>>> FeatsList Attributes (inside choice) >>>
		>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

		All the attributes described above can also be used inside a choice object, except:
			'choices'	- you can't have options inside options

		The sheet will look in both choice and parent to determine what attribute to use,
		with the choice being preferred over the parent.

		Most of the time you will want to at least set the description of the choice to
		something different than the parent.

		For example, if the parent has:
			source : ["SRD", 204],
		but the choice has:
			source : ["P", 115],
		the sheet will show the source as being the Player's Handbook, page 115.

		Another example, if the parent has:
			prerequisite : "Dexterity 13 or higher",
		but the choice has no 'prerequisite' defined,
		the sheet will use the prerequisite of "Dexterity 13 or higher" for the choice.

		You can use defaultExcluded to exclude specific choice options of the feat,
		without excluding the feat as a whole.
	*/

	/*
		>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		>>> Common Attributes (inside choice) >>>
		>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

		You can have the feat sub-choice affect different parts of the sheet as well,
		separate from the main feat.

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
