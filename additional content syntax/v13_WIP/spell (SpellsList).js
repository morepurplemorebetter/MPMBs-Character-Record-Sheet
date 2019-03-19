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

	Subject:	Spell

	Effect:		This is the syntax for adding a new spell to the sheet.

	Remarks:	This does not add anything to the attack section.
				If you want attack cantrips or spells to be added to the attack section,
				use the syntax for adding a weapon (as well), see "weapon (WeaponsList).js".

	Sheet:		v13.0.0 (2019-??-??)

*/

var iFileName = "Homebrew Syntax - SpellsList.js";
/* 	iFileName // OPTIONAL //
	TYPE:	string
	USE:	how the file will be named in the sheet if you import it as a file

	Note that this is a variable called 'iFileName'.
	Variables invoked inside an import script will not be available after importing.
	However, if you invoke the variable without the 'var', it will be available after importing.

	This doesn't actually have to be the same as the name of the file.
	Only the first occurrence of this variable will be used.
*/

RequiredSheetVersion(13);
/*	RequiredSheetVersion // OPTIONAL //
	TYPE:	function call with a number
	USE:	the minimum required version number of the sheet for the script to work

	If the sheet where you import this script into is of an earlier version, the player will be given a warning.
	Input a number, not a string (so don't enclose the number in quotation marks)!
	Although the sheet uses semantic versioning, you have to input a number here.
	To find this number of a sheet, open its Document Properties in Adobe Acrobat (Ctrl + D) and look in the 'Custom' tab.
*/

SpellsList["sindering purple"] = {
/* 	SpellsList object name // REQUIRED //
	TYPE:	string
	USE:	object name of the spell as it will be used by the sheet

	By adding a new object to the existing SpellsList object, we create a new spell.
	The object name here is 'sindering purple'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
*/
	name : "Sindering Purple",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the spell as it will be used by the sheet

	This name will be used to recognize what is entered in a spell name field if the 'regExpSearch' attribute is not present.
*/
	nameAlt : "Sindering Colour",
/*	nameAlt // OPTIONAL //
	TYPE:	string
	USE:	alternative setting-independent name with which the sheet can recognize the spell

	This attribute is intended for spells that have a name that is bound to a specific setting,
	to allow a name that is setting-neutral.
	For example, the "Bigby's Hand" (PHB 118) is named after the legendary wizard "Bigby" of the Greyhawk setting.
	As not everybody wants to use the Greyhawk name, the name as given in the SRD page 218 "Arcane Hand" is good to provide as the 'nameAlt'

	This name will also be used to recognize what is typed into the spell name field if the 'regExpSearch' attribute is not present.
*/
	nameShort : "Sind. Purple",
/*	nameShort // OPTIONAL //
	TYPE:	string
	USE:	name of the spell that fits in the spell name field

	Use this attribute if the name of the spell is too long to fit in the field on the Spell Sheet pages.
	For testing if the name fits, please use the Colourful versions of the sheet, as they are more restrictive.

	This name will also be used to recognize what is typed into the spell name field if the 'regExpSearch' attribute is not present.
*/
	regExpSearch : /^(?=.*sind(\.|ering))(?=.*(colou?r|purple)).*$/i,
/*	regExpSearch // OPTIONAL //
	TYPE:	regular expression
	USE:	used to match the text in the spell field to see if this spell is present

	This has to be a match for the name given earlier, as well as the 'nameAlt' and 'nameShort' if present,
	or the spell will never by recognized.
	If you include this attribute, the 'name', 'nameAlt', and 'nameShort' will not be used to recognize the spell,
	solely the regular expression entered here.

	The example above looks for any entry that has both the words "sindering" (or "sind.") and
	"purple" (or "color" or "colour") in it, disregarding capitalization or word order.
	If this looks too complicated, simply do not use this attribute.
*/
	source : ["SRD", 204],
	source : [["E", 7], ["S", 115]],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the spell is found

	This attribute is used by the sheet to determine if the spell should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the spell at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 7 of the Elemental Evil Player's Companion and
	on page 115 of the Sword Coast Adventure Guide.

	If a spell is completely homebrew, or you don't want to make a custom source, just put the following:
		source : ["HB", 0],
	"HB" refers to the 'homebrew' source.
*/
	classes : ["druid", "ranger", "sorcerer", "wizard"],
/*	classes // OPTIONAL //
	TYPE:	array (variable length)
	USE:	define for which classes this spell appears on their spell list

	List the classes by their object names in the ClassList object.
	Even with one entry you still need to put the brackets around it [].

	By default there are 8 ClassList object names that are spellcasters:
		"bard", "cleric", "druid", "paladin",
		"ranger", "sorcerer", "warlock", and "wizard".
	Although there might be more through importing custom scripts.

	If you the spell doesn't appear on any class' spell list, but should be available through
	the 'spellcastingBonus' or 'spellcastingExtra' attributes, have this be an empty array:
		classes : [],
	For an explanation of the 'spellcastingBonus' and 'spellcastingExtra' attributes, see "_common attributes.js".

	If you omit this attribute, the spell will only be selectable through the 'dependencies' attribute, see below.
*/
	level : 5,
/*	level // REQUIRED //
	TYPE:	number (0-9)
	USE:	define what the level of the spell is

	Use level 0 for a cantrip or psionic talent.
	Use level 1 for a psionic discipline.
*/
	school : "Necro",
/*	school // OPTIONAL //
	TYPE:	string
	USE:	the school the spell belongs to

	The text you add here will be put in the appropriate field on the sheet literally,
	thus it is important to check that it fits in the field.

	It is recommended to use one of the predefined spell school abbreviations:
		"Abjur"		// "abjuration"
		"Conj"		// "conjuration"
		"Div"		// "divination"
		"Ench"		// "enchantment"
		"Evoc"		// "evocation"
		"Illus"		// "illusion"
		"Necro"		// "necromancy"
		"Trans"		// "transmutation"
		"Avatar"	// "avatar" (psionic order)
		"Awake"		// "awakened" (psionic order)
		"Immor"		// "immortal" (psionic order)
		"Nomad"		// "nomad" (psionic order)
		"Wu Jen"	// "wu jen" (psionic order)

	By using one of these pre-defined abbreviations, the right full name of the school is used in the tooltip and pop-ups.

	// ADDING NEW SPELL SCHOOL //
	You can also define a new spell school abbreviation by adding it to the "spellSchoolList" object, like so:
		spellSchoolList["NewSc"] = "new school";
	Be aware that the object name can use capitalization but the entered sting can't.
*/
	time : "1 min",
/*	time // REQUIRED //
	TYPE:	string
	USE:	the casting time of the spell

	The text you add here will be put in the appropriate field on the sheet literally,
	thus it is important to check that it fits in the field.

	This entry uses abbreviations to make it fit on the sheet and to make everything look uniform.
	Please always use the following abbreviations:
		ABBREVIATION	MEANING
		1 a				1 action
		1 bns			1 bonus action
		1 rea			1 reaction
		min				minute(s)
		h				hours(s)
*/
	range : "60 ft",
/*	range // REQUIRED //
	TYPE:	string
	USE:	the range of the spell

	The text you add here will be put in the appropriate field on the sheet literally,
	thus it is important to check that it fits in the field.

	If the sheet is set to use the metric system, this attribute will be converted automatically.

	This entry uses abbreviations to make it fit on the sheet and to make everything look uniform.
	Please always use the following abbreviations:
		ABBREVIATION	MEANING
		ft				feet
		rad				radius

	Thus, "30-feet radius" is abbreviated to "30-ft rad".
*/
	components : "V,S,M",
/*	components // OPTIONAL //
	TYPE:	string
	USE:	the components required to cast the spell

	The text you add here will be put in the appropriate field on the sheet literally,
	thus it is important to check that it fits in the field.

	Use "M\u0192" for a material component that is costly, this will show as "Mƒ".
	Use "M\u2020" for a material component that is costly and also consumed, this will show as "M†".

	Note how the string doesn't use any spaces, as those would make the text too long to fit in the field.
	Please never use spaces, just commas.
*/
	compMaterial : "A purple gem",
/*	compMaterial // OPTIONAL //
	TYPE:	string
	USE:	an explanation of the material component required to cast the spell

	This attribute is only used in tooltips and pop-ups, so there are no length constraints.
*/
	duration : "Instantaneous",
/*	duration // REQUIRED //
	TYPE:	string
	USE:	the duration of the spell

	The text you add here will be put in the appropriate field on the sheet literally,
	thus it is important to check that it fits in the field.

	This entry uses abbreviations to make it fit on the sheet and to make everything look uniform.
	Please always use the following abbreviations:
		ABBREVIATION	MEANING
		1 rnd			1 round: until the start of the caster's next turn
		conc,			concentration, up to
		min				minute(s)
		h				hours(s)

	Thus, "Concentration, up to 10 minutes" is abbreviated to "Conc, 10 min".
*/
	save : "Int",
/*	save // OPTIONAL //
	TYPE:	string
	USE:	the ability score that the spell's saving throw uses

	The text you add here will be put in the appropriate field on the sheet literally,
	thus it is important to check that it fits in the field.

	Normally you would use an abbreviation of one of the ability scores here:
	"Str", "Dex", "Con", "Int", "Wis", or "Cha".

	If the spell doesn't require a saving throw, don't include this attribute.
*/
	description : "20-ft rad all crea 5d6+1d6/SL Psychic dmg; save half; all flames in area are purple for the duration",
/*	description // REQUIRED //
	TYPE:	string
	USE:	the text to be filled in the description field of the spell

	Note that the sheet normally uses the first person for this.
	Make sure that this description is not too long and fits on the small description field on the spell sheet page.
	The Colourful sheets have less space for spell descriptions than the Printer Friendly versions,
	so use the Colourful sheets to test if the description fits.

	If the sheet is set to use the metric system, this attribute will be converted automatically.
*/
	descriptionCantripDie : "1 creature save or `CD`d12 Poison dmg",
/*	descriptionCantripDie // OPTIONAL //
	TYPE:	string
	USE:	the text to be filled in the description field of a cantrip,
			but showing the damage for the current character level

	This attribute is only used if the checkbox
		"Apply character level and spellcasting ability to spell description (never for 'full' lists)"
	is checked when generating a spell sheet.

	If set to do so, the sheet replaces the `CD` with the cantrip die for the character's current level.
	You can also add modifiers to this, as long as they are after the CD and between the back ticks.
	For example, `CD-1` will produce the cantrip die minus 1, so 0 at level 2, 1 at level 5, 4 at level 15, etc.
*/
	descriptionMetric : "6-m rad all crea 5d6+1d6/SL Psychic dmg; save half; all flames in area are purple for the duration",
/*	descriptionMetric // OPTIONAL //
	TYPE:	string
	USE:	the text to be filled in the description field of the spell when the sheet is set to use the metric system

	This attribute works the same as the 'description' attribute above,
	but it is only used if the sheet is set to use the metric system.
	If this attribute is present, the sheet will not try and convert the 'description' attribute to the metric system,
	but will use this attribute instead.

	The sheet is goed at transforming units as long as each number is followed by the unit.
	For example "60 ft by 20 ft" will successfully be converted to "18 m by 6 m",
	but "60 by 20 ft" will become "60 by 6 m".
	It is only for cases like the latter that descriptionMetric is necessary,
	all other things can be converted by the sheet on the fly.

	// DOES NOT WORK TOGETHER WITH descriptionCantripDie //
	If the spell has both this attribute and the 'descriptionCantripDie' attribute,
	the sheet will still use this attribute and disregard the 'descriptionCantripDie' attribute when set to use the metric system.
*/
	descriptionFull : "This spell repairs a single break or tear in an object you touch, such as broken chain link, two halves of a broken key, a torn clack, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage." + "\n   " + "This spell can physically repair a magic item or construct, but the spell can't restore magic to such an object.",
/*	descriptionFull // OPTIONAL //
	TYPE:	string
	USE:	description of the spell as it appears in its source

	This text is used to populate the tooltip of the spell so that the original description can be read.
	This description will also be available in a pop-up by using the button in the spell's line.
	There is no limit to how big this description can be,
	but very long descriptions will not always display correctly.
*/
	ritual : true,
/*	ritual // OPTIONAL //
	TYPE:	boolean
	USE:	whether this spell can be cast as a ritual

	Setting this attribute to false is the same as not including this attribute.
*/
	psionic : true,
/*	psionic // OPTIONAL //
	TYPE:	boolean
	USE:	whether this spell is a psionic talent/discipline

	Setting this attribute to false is the same as not including this attribute.
*/
	firstCol : "6",
/*	firstCol // OPTIONAL //
	TYPE:	string
	USE:	force the first column of the spell line to be set to this

	Be aware that the first column has very limited space and everything over 2 characters long will be invisible.
	1 character enclosed in brackets will be short enough to be visible, e.g. "(R)".

	Normally, the first column on the spell sheet is determined by context, but
	if you include this attribute that first column will always be what you set here.

	This can be useful to indicate something like Power Point or Ki cost.

	You can also use this attribute to call one of the special things the first column can be:
		"atwill"		// the "At Will" graphic
		"oncesr"		// the "1× SR" graphic
		"oncelr"		// the "1× LR" graphic
		"checkbox"		// an empty checkbox
		"checkedbox"	// a checked checkbox
		"markedbox"		// a checkbox checked with a star, indicating this spell is always prepared

	Setting this attribute to an empty string ("") is the same as not including this attribute.
*/
	dependencies : ["te1-tremorsense", "te2-unwavering eye", "te3-piercing sight", "te4-truesight"],
/*	dependencies // OPTIONAL //
	TYPE:	array (variable length)
	USE:	define spells that always will be added to the spell list after this spell

	List the spell by their object names in the SpellsList object.
	Even with one entry you still need to put the brackets around it [].

	This attribute is generally used to add options for the spell, like how psionic disciplines work.
	Those dependencies generally don't have a 'classes' attribute to make sure that they can't be selected in any other way.

	This attribute doesn't work recursively, the 'dependencies' attribute will be ignored for
	those spells added as a result of this attribute.

	Setting this attribute to an empty array ([]) is the same as not including this attribute, but doing so will slow the sheet down considerably.
*/
}
