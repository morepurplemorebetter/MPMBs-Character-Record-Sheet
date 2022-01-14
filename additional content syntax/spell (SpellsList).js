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

	Sheet:		v13.1.0 and newer

*/

var iFileName = "Homebrew Syntax - SpellsList.js";
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
	defaultExcluded : true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this spell should be excluded by default (true) or included by default (false)

	Include this attribute and set it to true if the spell should appear in the Excluded list of the
	Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.

	This is useful for optional spells that you wouldn't normally want to use (e.g. playtest or campaign-specific).

	Setting this attribute to false is the same as not including this attribute.
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
	USE:	the casting time of the spell as it should appear on the sheet

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
	timeFull : "1 reaction, which you take when you see a creature within 60 feet of you casting a spell",
/*	timeFull // OPTIONAL //
	TYPE:	string
	USE:	the casting time of the spell as should appear in the spell's full description
	ADDED:	v13.1.0

	The text you add here will only be used in the tooltip and dialogs where the spell's
	full description is shown.

	This entry is only needed if the casting time doesn't follow any of the standard rules.
	The sheet can automatically extrapolate the casting time from the abbreviation used in the `time`
	attribute.

	In the official spells, this `timeFull` attribute is only used for the spells with a casting time
	of 1 reaction, as those have extra explanatory text.
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
		S:				Self ()

	Thus, "30-feet radius" is abbreviated to "30-ft rad".
	And, "Self (15-ft cone)" is written as "S:15-ft cone".
*/
	rangeMetric : "S:8-km rad",
/*	range // REQUIRED //
	TYPE:	string
	USE:	the range of the spell when using the metric system
	ADDED:	v13.0.6

	This attribute works the same as the `range` attribute above,
	but it is only used if the sheet is set to use the metric system.
	If this attribute is present, the sheet will not try and convert the `range` attribute
	to the metric system, but will use this attribute instead.

	The sheet is good at transforming units as long as each number is followed by the unit.
	For example "60 ft by 20 ft" will successfully be converted to "18 m by 6 m",
	but "60 by 20 ft" will become "60 by 6 m".
	It is only for cases like the latter that `rangeMetric` is necessary,
	all other things can be converted by the sheet on the fly.
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

	// IMPORTANT //
	If the spell does damage, make sure the damage is written as "XdY+CdZ/SL [Type] dmg".
		- Replace [Type] with the a single word, the damage type with the first letter capitalized
		  (e.g. Fire or Lightning).
		- You can write "damage" instead of "dmg".
		- "+CdZ/SL" represents the bonus damage die per spell slot level above the spell's level. For example,
		  this is written as "8d6+1d6/SL fire dmg" for Fireball, which adds 1d6 to the damage for each spell 
		  slot used above 3rd-level (the level of the spell).
		- The damage die don't necessarily have to include a bonus per spell slot level above current level,
		  nor be a die at all, static damage also works. E.g. "2d8 Thunder dmg" and "5 Cold dmg" are valid.
	If the spell heals hit points, make sure it is written as "heal XdY+CdZ/SL HP"
		- "heal" can also be replaces with "heals" or "to life with" (e.g. Raise Dead).
		- "HP" can also be replaces with "hit point" or "hit points".
		- "+CdZ/SL" works the same as explained above in the damage example.
		- The healing and bonus per spell slot level can also be static (e.g. "heals 100 HP" is valid).

	You can shorten longer damage type names if they won't otherwise fit:
		DAMAGE TYPE    SHORTENED
		Bludgeoning    Bludg.
		Lightning      Lightn.
		Necrotic       Necro.
		Piercing       Pierc.
		Slashing       Slash.
	
	If the damage (or only some of the damage) in the description doesn't match this syntax,
	you can use the `dynamicDamageBonus` object (see below) to tell the script how to find the damage string.
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

	This attribute works the same as the `description` attribute above,
	but it is only used if the sheet is set to use the metric system.
	If this attribute is present, the sheet will not try and convert the `description` attribute
	to the metric system, but will use this attribute instead.

	The sheet is good at transforming units as long as each number is followed by the unit.
	For example "60 ft by 20 ft" will successfully be converted to "18 m by 6 m",
	but "60 by 20 ft" will become "60 by 6 m".
	It is only for cases like the latter that `descriptionMetric` is necessary,
	all other things can be converted by the sheet on the fly.

	// DOES NOT WORK TOGETHER WITH descriptionCantripDie //
	If the spell has both this attribute and the 'descriptionCantripDie' attribute,
	the sheet will still use this attribute and disregard the 'descriptionCantripDie' attribute
	when set to use the metric system.
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
	allowUpCasting : false,
/*	allowUpCasting // OPTIONAL //
	TYPE:	boolean
	USE:	limit spell to only be cast at their lowest level
	ADDED:	v13.0.7

	IMPORTANT
	This attribute is only useful as part of a `spellChanges` object (see "_common attributes.js").
	It is ignored if part of a SpellsList object, because you can just not include upcasting in
	the description.

	By setting this attribute to false, you force the sheet to remove the upcasting from the spell's 
	description.
	Normally, the sheet will limit spells gained from a feat, magic item, or race to be cast only at
	its lowest level, removing any upcasting options from the short spell description.
	Use this attribute with the `spellChanges` attribute, if a class feature doesn't allow upcasting.
*/


// >>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> genericSpellDmgEdit >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>> //
/*
	These attributes are used by the `genericSpellDmgEdit` function, which is used by the common attribute
	calcChanges.spellAdd to add a dynamic modifier to the damage of a spell.
	For example, a class feature could let the character add their Intelligence modifier to a spell's damage.
	The `genericSpellDmgEdit` function matches the description above for the right damage syntax.
	Unfortunately, if the spell's description doesn't match the exact parameters or if it already fills up
	the allotted space, the addition done by `genericSpellDmgEdit` will not work and/or cause the description
	to overflow.
	The attributes below are made to address these issues.

	The `genericSpellDmgEdit` function can dynamically add a damage modifier/dice to the damage of a spell.
	This can happen if the spell does a specific type of damage.
	Most often, the damage can only be added to one die roll. If so, the `genericSpellDmgEdit` function
	will add the damage to the first part of the description that matches.
*/

	descriptionShorter : "20-ft rad all crea 5d6+1d6/SL Psychic dmg; save half; flames in area are purple",
/*	descriptionShorter // OPTIONAL //
	TYPE:	string
	USE:	shorter version of the description of the spell to be filled in the description field
	ADDED:	v13.0.7

	If the description attribute given above is too long to fit an extra bit added by the
	`genericSpellDmgEdit` function, then you can use this attribute to present an alternative, shorter
	description that the `genericSpellDmgEdit` function can use to alter.
	How much shorter you should make this description depends on the addition the `genericSpellDmgEdit`
	function will do, depending on context, see the three scenarios below.

	There are four scenarios:
	1) Single damage instance of single damage type (e.g. instantaneous spell)
		If the spell has a duration of instant(enous), 1 r(ou)nd, or
		includes "Next (melee/ranged) weapon at(tac)k" in the description,
		or has multiple damages listed that fit the syntax (e.g. "1d4 Fire dmg + 1d4 Cold dmg"),
		it will be considered a spell with a single damage instance.

		The damage bonus will be added to the current damage string (e.g. "5d6+1d6/SL Psychic dmg" could
		become "5d6+1d8+1d6/SL Psychic dmg").
		Thus you will need to make sure "+1d8" fits in the `description` attribute and if not,
		include a `descriptionShorter` attribute where it would fit.

	2) Multiple damage instances of single damage type (e.g. spell that deals damage each round)
		If the spell has a duration other than instant(enous), 1 r(ou)nd,
		and doesn't include "Next (melee/ranged) weapon at(tac)k" in the description,
		and doesn't have multiple damages listed that fit the syntax (e.g. "1d4 Fire dmg + 1d4 Cold dmg"),
		it will be considered a spell with multiple damage instances.

		If the feature only adds damage to a single roll, the damage bonus will be added at the end of the
		description, in the format "(1× +dX)" (e.g. "(1× +d8)" or (1× +5)),
		thus you need to make sure "(1× +d8)" fits in the `description` attribute and if not,
		include a `descriptionShorter` attribute where it would fit.

	3) Single damage instance of multiple damage type
		Same as 1), but the spell can have different damage types (e.g. you get to choose the type).
		>> Make sure you also use the `dynamicDamageBonus` attribute below.

		If the feature only adds damage to some of the damage type options, the damage bonus will be added
		at the end of the description, in the format "(+dX if..)" (e.g. "(+d8 if..)" or (+5 if..)),
		thus you need to make sure "(+d8 if..)" fits in the `description` attribute and if not,
		include a `descriptionShorter` attribute where it would fit.

	4) Multiple damage instances instances of multiple damage type
		Same as 2), but the spell can have different damage types (e.g. you get to choose the type).
		>> Make sure you also use the `dynamicDamageBonus` attribute below.

		If the feature only adds damage to some of the damage type options, the damage bonus will be added
		at the end of the description, in the format "(1× +dX if..)" (e.g. "(1× +d8 if..)" or (1× +5 if..)),
		thus you need to make sure "(1× +d8 if..)" fits in the `description` attribute and if not,
		include a `descriptionShorter` attribute where it would fit.

	Which scenario a spell falls into can be changed with the `dynamicDamageBonus` attribute below.

	// DOES NOT WORK TOGETHER WITH descriptionCantripDie //
	If the spell has both this attribute and the 'descriptionCantripDie' attribute,
	the sheet will still use the 'descriptionCantripDie' attribute.
*/
	descriptionShorterMetric : "6-m rad all crea 5d6+1d6/SL Psychic dmg; save half; flames in area are purple",
/*	descriptionShorterMetric // OPTIONAL //
	TYPE:	string
	USE:	shorter version of the description of the spell to be filled in the description field when the sheet is set to use the metric system
	ADDED:	v13.0.7

	This attribute works the same as the `descriptionShorter` attribute above,
	but it is only used if the sheet is set to use the metric system.
	If this attribute is present, the sheet will not try and convert the `descriptionShorter` attribute
	to the metric system, but will use this attribute instead.

	The sheet is good at transforming units as long as each number is followed by the unit.
	For example "60 ft by 20 ft" will successfully be converted to "18 m by 6 m",
	but "60 by 20 ft" will become "60 by 6 m".
	It is only for cases like the latter that `descriptionShorterMetric` is necessary,
	all other things can be converted by the sheet on the fly.

	// DOES NOT WORK TOGETHER WITH descriptionCantripDie //
	If the spell has both this attribute and the 'descriptionCantripDie' attribute,
	the sheet will still use this attribute and disregard the 'descriptionCantripDie' attribute
	when set to use the metric system.
*/
	dynamicDamageBonus : {
/*	dynamicDamageBonus // OPTIONAL //
	TYPE:	object (optional attributes)
	USE:	instructions for the `genericSpellDmgEdit` function
	ADDED:	v13.0.7

	See above for an explanation what the `genericSpellDmgEdit` function does.
	This object can have several pre-defined attributes, which are explained below.
*/
		doNotProcess : true,
	/*	doNotProcess // OPTIONAL //
		TYPE:	boolean
		USE:	tell the `genericSpellDmgEdit` function not to process this spell
	
		If the description of the spell as it will be displayed on the sheet includes damage,
		the `genericSpellDmgEdit` function can dynamically edit it by adding a modifier under certain
		conditions set by a feature.
		If this is not desired, because the damage listed is to yourself for example, set this attribute
		to true, to have the `genericSpellDmgEdit` function skip over this spell.
		Other examples include summoned creatures/objects that deal damage, or spells that alter
		something that alters their damage (e.g. the Enlarge/Reduce spell).

		Setting this attribute to false is the same as not including it.
	*/
		multipleDmgMoments : true,
	/*	multipleDmgMoments // OPTIONAL //
		TYPE:	boolean
		USE:	force the `genericSpellDmgEdit` function to treat this spell as a single damage instance (true) or as one with multiple damage instances (false)

		See the explanation for `descriptionShorter` above for how the `genericSpellDmgEdit` function
		normally determines wether the spell has a single or multiple damage instances.
		Only use this attribute if the `genericSpellDmgEdit` function yields the wrong outcome.

		Set this attribute to `true` if this spell has a duration of instant(enous) or 1 r(ou)nd,
		but still deals damage more than once.

		Set this attribute to `false` if the spell has a duration longer than instant(enous) or 1 r(ou)nd,
		but still only deals it damage once.

		For example, a spell with a duration of "concentration, up to 1 minute" that can be ended to deal
		damage, will be recognized as a spell that has multiple damage instances because of its duration.
		For this spell, you should set this attribute to false.
	
		If a spell has a duration of "instantaneous" but has you make multiple attack rolls for different
		targets, that spell doesn't have a single damage roll.
		For this spell, you should set this attribute to true.
	*/
		allDmgTypesSingleMoment : true,
	/*	allDmgTypesSingleMoment // OPTIONAL //
		TYPE:	boolean
		USE:	force the `genericSpellDmgEdit` function to treat multiple damage listings as a single damage instance
	
		See the explanation for `descriptionShorter` above for how the `genericSpellDmgEdit` function
		normally determines wether the spell has a single or multiple damage instances.
		Only use this attribute if the `genericSpellDmgEdit` function yields the wrong outcome.

		Set this attribute to `true` if this spell has multiple damages that fit the syntax,
		but those are different damage types that are still dealt at the same time (a 'single' damage roll).

		For example, a spell can deal both Radiant and Fire damage in one instance and have this listed
		in its `description` attribute as "4d6 Fire dmg and 4d6 Radiant dmg".
		The `genericSpellDmgEdit` function would consider this multiple damage instances.
		For this spell, you should set this attribute to true.

		Setting this attribute to false is the same as not including it.
	*/
		extraDmgGroupsSameType : /((?:\+?\d+d?\d*)+)( crit)/i,
	/*	allDmgTypesSingleMoment // OPTIONAL //
		TYPE:	regular expression
		USE:	regex to match other damage instances in the description of the same damage type that doesn't adhere to the normal syntax

		This attribute tells the `genericSpellDmgEdit` function that there is another damage instance
		in the description, but that instance does not adhere to the normal syntax of "[Dice} [Type] dmg".

		This regular expression is used to match the secondary (or more) damage groups and add the damage
		bonus there as well (if required).

		The regular expression needs to include a group that matches the damage dice or static number.
		The regular expression needs to include one or more non-optional matching groups before or after
		the group that matches the damage dice or static number.

		For the damage (die) group, this matching group is recommended: ((?:\+?\d+d?\d*)+)
		As that matches any number of consecutive die and numbers, joined with a "+", but captures them as
		a single group.

		For example, a spell can deal both Radiant damage both when it is cast and the round after,
		but because of space limitations, it is written in its `description` attribute as
		"Spell attack for 4d4+1d4/SL Acid dmg and 2d4+1d4/SL next turn".
		The "2d4+1d4/SL next turn" does not adhere to the normal way of writing the damage, as it doesn't
		include a damage type or the word "dmg" (or "damage").
		The `genericSpellDmgEdit` function would not see this second damage group and thus not account for it.
		For this spell, you should set this attribute to /(and |\u0026 )((?:\+?\d+d?\d*)+)/i.
	*/
		multipleDmgTypes : {
			dmgTypes : ["acid", "cold", "fire", "lightning", "thunder"],
			inDescriptionAs : 'Acid, Cold, Fire, Lightning, or Thunder|Acid/Cold/Fire/Lightning/Thunder'
		},
	/*	multipleDmgTypes // OPTIONAL //
		TYPE:	object (with exactly two attributes)
		USE:	the damage type of the spell can be two or more different types and/or doesn't adhere to the normal syntax in the description

		This attribute tells the `genericSpellDmgEdit` function that the damage listed in the description
		can be with multiple different damage types, which is chosen by the caster at the time of casting.
		This will (most likely) cause the description to not adhere the normal syntax of "[Dice} [Type] dmg".

		This object has two attributes of its own, both of which are REQUIRED:
		1) dmgTypes, an array
			This is the array of damage types that the spell can use.
			Use one entry per damage type (e.g. don't do ["fire or radiant"], but ["fire", "radiant"]).
		2) inDescriptionAs, a string
			This tells the `genericSpellDmgEdit` function how to find this damage type,
			as it isn't doesn't adhere to the normal syntax.
			This string is add to a regular expression, after the group matching damage dice/numbers, and
			before the group " (dmg|damage)".
			Thus, if the spell's description is "1d6 Fire or Radiant dmg", this attribute would be
			"Fire or Radiant".
			However, if the spell's description is "damage of 1d6 Fire or Radiant", this object won't work.

		See also the explanation for `descriptionShorter` above for how the `genericSpellDmgEdit` function
		for the implications of having multiple damage types.
	*/
		skipDmgGroupIfNotMultiple : /(atk .*piercing dmg.*?)/i,
	/*	skipDmgGroupIfNotMultiple // OPTIONAL //
		TYPE:	regular expression
		USE:	the spell has multiple damage instances and/or types and if the bonus should only be added to a single roll the `genericSpellDmgEdit` function, skip one or more damage instances before adding the bonus

		This attribute only does something if the `genericSpellDmgEdit` function is initialised to only
		add the damage bonus to one roll and this spell's description lists multiple that adhere
		to the syntax of "[Dice} [Type] dmg".

		Normally, the `genericSpellDmgEdit` function will add the bonus to the first damage instance that
		matches its input.
		With this object, it can skip one or more damage instances before adding the bonus.

		This regular expression that matches the groups to be skipped, up to the group where the bonus
		should be added.
		Make sure that this regular expression is a single capturing group for the whole of
		the expression (e.g. not /atk.*(piercing dmg).*?/i or /(atk.*)?(piercing dmg.*?)/i).
		You can use non-capturing groups, as long as they are within the capturing group
		(e.g. /((?:atk.*)?piercing dmg.*?)/i)

		Note that if the call for the `genericSpellDmgEdit` function was for a specific damage type
		that doesn't match the preferred group, but does match this first group that should be skipped,
		the function is still going to add the damage to the first group, effectively ignoring this attribute.
	*/
	},
}
