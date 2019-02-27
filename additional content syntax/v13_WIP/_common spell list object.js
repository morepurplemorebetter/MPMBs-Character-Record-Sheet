/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file.
	You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialog.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialog.
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

	Subject:	Common spell list object

	Effect:		This is the syntax for the common spell list object that is shared by multiple things.
				The object determines which spells to use in the drop-downs of the spell selection dialog.

	Important:	The syntax here does not stand on its own.
				You will need another syntax file to use alongside this file.
				Use one of the syntax files not starting with an underscore and use this file when referred to.

	Works with:	Class features (and subclass features)
				Race main attributes
				Racial features
				Background main attributes
				Feat main attributes
				Magic Item main attributes

	Sheet:		v13.0.0 (2019-??-??)
*/

/*	-IMPORTANT NOTES-
	The object is run through a function that will determine what spells are present
	in the drop-downs in the spell selection dialog.
	For the below explanation the list created by the function is referred to as 'final list'.

	There is no common name for the object, but this example uses 'spellcastingList'.
	This object is always an attribute to another object or passed as a variable in a function,
	meaning that its name is not important and will differ depending on where it is used.

	All entries in the object are optional.
	Each entry except 'extraspells' is used to constrain which spells are added to the final list.
	The entries are cumulative, all constraints must be met for a spell to be added to the final list.
	If no entries are present, the final list will contain all possible spells.
*/

"example feature name" = { // you can ignore this, it is just here to make this file valid JavaScript

spellcastingList : {
	extraspells : ["fire bolt", "hold person"],
	/*	extraspells // OPTIONAL //
		TYPE:	array (variable length) of spell object names as used in the SpellsList object
		USE:	add spells to final list regardless if they meet the other requirements

		This attribute works different than the rest as it doesn't add a constraint.
		Exceptions: 'level', 'attackOnly', 'ritual', and 'psionic' requirements are always tested, if present.
	*/

	spells : ["cure wounds", "fear"],
	/*	spells // OPTIONAL //
		TYPE:	array (variable length) of spell object names as used in the SpellsList object
		USE:	spells to use for the final list

		This attribute works different than the rest as it doesn't add a constraint.
		This is the easiest way of determining which spells will be in the final list.
		If you use this attribute, you most likely don't want to use any of the others,
		as the spells in this object still need to meet all the other requirements.
	*/

	notspells : ["acid splash", "fireball"],
	/*	notspells // OPTIONAL //
		TYPE:	array (variable length) of spell object names as used in the SpellsList object
		USE:	spells to remove from the final list

		This attribute works different than the rest as it doesn't add a constraint.
		Instead, it removes the listed spells from the final list, if present.
	*/

	"class" : ["cleric", "wizard"],
	/*	class // OPTIONAL //
		TYPE:	array (variable length) of class names as used in the SpellsList object's classes attribute
		USE:	spells not on one of the listed class spell lists will be excluded from the final list

		It is also possible to list the class "all", thus including spells from all class spell lists.
	*/

	level : [1, 5],
	/*	level // OPTIONAL //
		TYPE:	array with two number entries: lower and upper limit of level of spells
		USE:	spells not within this level range will be excluded from the final list
	*/

	school : ["Evoc", "Abjur"],
	/*	school // OPTIONAL //
		TYPE:	array (variable length) of spell school names as used in the spellSchoolList object
		USE:	spells not in one of the schools listed will be excluded from the final list
		
		See the variable "Base_spellSchoolList" in the file "ListsSpells.js" for all options.
	*/

	attackOnly : true,
	/*	attackOnly // OPTIONAL //
		TYPE:	boolean
		USE:	include/exclude spells based on if they use a spell attack
		
		If set to 'true', only includes spells with a spell attack.
		If set to 'false', only includes spells without a spell attack.

		Whether or not a spell has a spell attack is determined by looking at the spell's
		full description (its PHB text) to see if it contains the words "spell attack".
		If the spell require a saving throw it is always considered not having a spell attack.
	*/

	ritual : true,
	/*	ritual // OPTIONAL //
		TYPE:	boolean
		USE:	include/exclude spells based on if they are ritual spells or not
		
		If set to 'true', only includes spells that can be cast as rituals.
		If set to 'false', only includes spells that cannot be cast as rituals.
	*/

	psionic : true,
	/*	psionic // OPTIONAL //
		TYPE:	boolean
		USE:	include/exclude spells based on if they are psionic or not
		
		If set to 'true', only includes spells that are psionic.
		If set to 'false', only includes spells that are not psionic.
	*/
}

} // you can ignore this, it is just here to make this file valid JavaScript
