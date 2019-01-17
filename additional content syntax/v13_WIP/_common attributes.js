/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file.
	You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialog.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialog.
	It is recommended to enter the code in a freshly downloaded sheet or to first reset sheet.
	Thus you don't run the risk of things being filled out causing conflicts.

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

	Subject:	Common attributes

	Effect:		This is the syntax for common attributes that are shared by multiple things.
				The syntax here does not stand on its own.
				You will need another syntax file to use alongside this file.
				Use one of the syntax files not starting with an underscore and use this file when referred to.

	Works with:	Class features (and subclass features)
				Race main attributes
				Racial features
				Background main attributes
				Feat main attributes
				Magic Item main attributes

	Sheet:		v13.0.0 (2018-??-??)
*/


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Actions & Limited Features >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

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
		2.1	When the first character of the string is non-alphabetic (e.g. a space or a hyphen), it is amended to the name of the feature.
			This amended total is then added as an action.
			If you are also using the 'limfeaname' attribute, that string will be used instead of the feature's name.
			So this entry will be added to 'limfeaname' string.
		2.2 When the first character of the string is an alphabetic character (e.g. everything from a-Z), it is not amended to the name of the feature.
			The string is taken as-is and added as an action.
*/

usages : 1,
usages : "Charisma modifier per ",
usages : [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
/*	usages // OPTIONAL //
	TYPE:	number, string, or array with 20 entries
	USE:	value to add in the "Usages" column in the "Limited Features" section

	This will only add an entry to "Limited Features" section, if 'recovery' is also present in the same feature.

	This attribute can have three type of values:
	1. Number
		For class features, this value is used to write the text in the "Class Features" section.
		A number will be followed by a multiplication sign and 'per', followed by the recovery method.
		For example-
			usages : 3,
			recovery : "long rest",
		Will result in-
			"3× per long rest"
	2. String
		Works similar to the 1. Number option, except for class features.
		For class features the string is used in the "Class Features" section without changes.
		For example-
			usages : "Charisma modifier per ",
			recovery : "short rest",
		Will result in-
			"Charisma modifier per short rest"
	3. Array
		An array signals that the usages vary depending on level.
		Each entry is a level, so you will most likely want to add 20 entries.
		Each entry can be a number or string, see option 1. Number and 2. String for how those work.
		IMPORTANT! Set the value to 0 for levels that the feature is not present.
*/

recovery : "short rest",
recovery : ["", "", "long rest", "long rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest"],
/*	recovery // OPTIONAL //
	TYPE:	string, or array with 20 strings
	USE:	value to add in the "Recovery" column in the "Limited Features" section

	This will only add an entry to "Limited Features" section, if 'usages' is also present in the same feature.

	This attribute can have two type of values:
	1. String
		For class features, this value is used to write the text in the "Class Features" section.
		It will be combined with the 'usages' attribute to create a string of how the class feature works.
		For example-
			usages : 3,
			recovery : "long rest",
		Will result in-
			"3× per long rest"
	2. Array
		An array signals that the recovery method varies depending on level.
		Each entry is a level, so you will most likely want to add 20 entries.
		Each entry has to be a string, see option 1. String for how those work.
		IMPORTANT! Set the value to "" for levels that the feature is not present.

	Common values are:
		"short rest"
		"long rest"
		"dawn"
		"day"
*/

usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
usagescalc : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "event.value = What('Wis Mod') + 5;", "event.value = What('Wis Mod') + 5;", "event.value = What('Wis Mod') + 5;", "event.value = What('Wis Mod') + 6;", "event.value = What('Wis Mod') + 6;", "event.value = What('Wis Mod') + 6;"],
/*	usagescalc // OPTIONAL //
	TYPE:	string, or array with 20 strings
	USE:	this string is set as the field calculation method for the "Usages" field in the "Limited Features" section

	This attribute can have two type of values:
	1. String
		The string is evaluated as JavaScript code whenever anything changes on the sheet.
		To change the value of the field, you will have to set the 'event.value' to something.
		The example above sets the field to the Wisdom Modifier, or 1, whichever is higher.
	2. Array
		An array signals that the usages calculation method varies depending on level.
		Each entry is a level, so you will most likely want to add 20 entries.
		Each entry has to be a string, see option 1. String for how those work.
		IMPORTANT! Set the value to "" for levels that the feature is not present.

	This attribute will do nothing if not both the 'usages' and 'recovery' attributes are present in the same feature.
*/

limfeaname : "Hellish Rebuke (3d10)",
/*	limfeaname // OPTIONAL //
	TYPE:	string
	USE:	value to add in the "Name" column in the "Limited Features" section instead of the feature's name

	Use this attribute only if you do not want to use the feature's name in the "Limited Features" section.
	If this attribute is present and the 'action' attribute is also present,
	the 'limfeaname' attribute will be used instead of the feature's name for actions.

	This attribute will do nothing if not both the 'usages' and 'recovery' attributes or the 'action' attribute
	are present in the same feature.
*/

additional : "10% chance",
additional : ["", "d6", "d6", "d6", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12"],
/*	recovery // OPTIONAL //
	TYPE:	string, or array with 20 strings
	USE:	value to add in brackets to the name in the "Limited Features" section

	This attribute will do nothing if not a class feature and neither the 'usages' or 'recovery' attribute is present in the same feature.

	This attribute can have two type of values:
	1. String
		This will be added in brackets to the name when adding something to the "Limited Features" section.
		For example, if the name of the feature is "featureName", and the 'additional' is "10% chance", it would be-
			"featureName (10% chance)"

		For class features, this value is used to write the text in the "Class Features" section.
		It will be combined with the 'usages' and 'recovery' attributes to create a string of how the class feature works.
		For example-
			usages : 3,
			recovery : "long rest",
			additional : "10% chance",
		Will result in-
			"10% chance; 3× per long rest"
	2. Array
		An array signals that the recovery method varies depending on level.
		Each entry is a level, so you will most likely want to add 20 entries.
		Each entry has to be a string, see option 1. String for how those work.
		IMPORTANT! Set the value to "" for levels that the feature is not present.
*/


// >>>>>>>>>>>>>>>>>>>>> //
// >>> Proficiencies >>> //
// >>>>>>>>>>>>>>>>>>>>> //

toolProfs : [
	"Herbalism kit",
	["Thieves' tools", "Dex"],
	["Musical instrument", 3]
],
/*	toolProfs // OPTIONAL //
	TYPE:	array (variable length)
	USE:	add tool proficiencies

	This array can have three type of entries:
	1.	A string, the name of the tool proficiency to add (i.e. no choice).
	2.	An array with 2 strings:
		2.1	The first string is the name of the tool proficiency to add (i.e. no choice).
		2.2 The second string is the abbreviation of the ability score the tool proficiency works with.
			Only add this if you want the tool to appear in the skill section on the 1st page.
	3.	An array with a string and a number:
		3.1 The first entry is a string, a description of the type of tool proficiency that can be chosen.
		3.2	The second entry is a number, representing how many times this type of tool proficiency is to be added.
*/

languageProfs : [
	"Common",
	2,
	["Elvish or Vedalken", 1]
],
/*	languageProfs // OPTIONAL //
	TYPE:	array (variable length)
	USE:	add language proficiencies

	This array can have three type of entries:
	1.	A string, the name of the language proficiency to add (i.e. no choice).
	2.	A number, how many language proficiency are to be added with each a free choice for which language.
	3.	An array with a string and a number:
		3.1 The first entry is a string, a description of the type of language proficiency that can be chosen.
		3.2	The second entry is a number, representing how many this type of language proficiency is to be added.
*/

saves : ["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"],
/*	saves // OPTIONAL //
	TYPE:	array (variable length)
	USE:	set saving throw proficiencies on the 1st page

	This is an array of strings.
	Each entry gives proficiency with the saving throw of a certain ability score.
	Only use the strings shown in the example, the 3-letter abbreviation with the first letter capitalized (or "HoS" for Honour/Sanity).
*/

skills : [
	"Acrobatics",
	["Deception", "full"],
	["History", "only"],
	["Religion", "increment"]
],
/*	skills // OPTIONAL //
	TYPE:	array (variable length)
	USE:	add skill proficiency and expertise on the 1st page

	This array can have two type of entries:
	1.	A string, the name of the skill proficiency to add (i.e. no expertise).
	2.	An array with two strings, only needed if you want to add expertise as well:
		2.1	The first entry is a string, the name of the skill proficiency.
		2.2	The second entry is a string, a command what to do with expertise for the skill.
			This can be one of three options:
			a) "full"		// Add both proficiency and expertise
			b) "only"		// Add expertise, but only if already proficient with the skill
			c) "increment"	// Add proficiency if not yet proficient, or add expertise if already proficient with the skill

	The array will also be used to generate a textual description of the improvement for the dialog and tooltips,
	but only if the attribute 'skillstxt' is not present in the same feature, see below.
*/

skillstxt : "Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival",
/*	skillstxt // OPTIONAL //
	TYPE:	string
	USE:	description of skill proficiencies and skill proficiency choices gained, to use in the tooltips of skills

	You do not need this attribute if their is no choice for the skill proficiencies gained,
	then you can just use the 'skills' attribute, see above.
	You can have both this and the 'skills' attribute, they are not mutually exclusive.
*/

weaponProfs : [
/*	weaponProfs // OPTIONAL //
	TYPE:	array with two or three entries
	USE:	adds weapon proficiencies
*/

	true,
	/* weaponProfs 1st entry // REQUIRED //
		TYPE:	boolean
		USE:	add simple weapon proficiency

		Set this to true to add proficiency with simple weapons or
		set this to false to not add proficiency with simple weapons.
		Note that the weaponProfs array requires this entry!
	*/

	false,
	/* weaponProfs 2nd entry // REQUIRED //
		TYPE:	boolean
		USE:	add martial weapon proficiency

		Set this to true to add proficiency with martial weapons or
		set this to false to not add proficiency with martial weapons.
		Note that the weaponProfs array requires this entry!
	*/

	["dagger", "longsword", "firearm", "Improvised Weapons"]
	/* weaponProfs 3rd entry // OPTIONAL //
		TYPE:	array (variable length)
		USE:	add weapon proficiency with the weapons or weapon-types listed

		Add the names of weapons as they appear in the WeaponsList object.
		Alternatively, you can use a grouping of weapons, as their 'list' attribute says, for example 'firearm'.
		Alternatively, you can use types of weapons, as their 'type' attribute says, for example 'Improvised Weapons'.

		For example the High Elf weapon proficiency looks like this:
		weaponProfs : [false, false, ["longsword", "shortsword", "longbow", "shortbow"]],
	*/
],

armorProfs : [true, true, false, true],
/*	armorProfs // OPTIONAL //
	TYPE:	array with four entries
	USE:	adds armour and shield proficiencies

	This array must have exactly four entries, all of which are booleans.
	These are to add proficiencies in:
	["light armour", "medium armour", "heavy armour", "shields"]

	Note that a proficiency will only be set if the value is 'true'.
	If you set it to 'false' it will do nothing, the proficiency will not be removed.
*/


// >>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Weapons & Armour >>> //
// >>>>>>>>>>>>>>>>>>>>>>>> //

weaponAdd : ["Bite", "Longsword +2"],
/*	weaponAdd // OPTIONAL //
	TYPE:	array (variable length)
	USE:	adds each string in the array to one of the attack drop-downs on the 1st page

	This is an array of strings. Each string will be added to the attack section.
	An entry will only be added if there is space left in the attack section and it isn't already present.
	The strings will be added exactly as you write them here, capitalisation and all.
*/

armorAdd : "Natural Armor",
/*	armorAdd // OPTIONAL //
	TYPE:	string
	USE:	sets the string as the value for the armour drop-down on the 1st page

	The armour will only be set if there is currently no armour selected on the 1st page, or
	if the currently selected armour gives a lower AC total than this armour.
	The string will be added exactly as you write it here, capitalisation and all.
*/

ammoOptions : [{ /* AmmoList object, see AmmoList syntax */ }],
/*	ammoOptions // OPTIONAL //
	TYPE:	array of objects (variable length)
	USE:	adds each object in the array to the AmmoList variable

	The syntax of the objects is not explained here, but in the AmmoList syntax file.

	This way you can have a feature add a type of ammunition to the automation.
	It will also be added to the options in each ammunition field drop-down.
	This will result in having the ammunition only available if the feature is present.
*/

armorOptions : [{ /* ArmourList object, see ArmourList syntax */ }],
/*	armorOptions // OPTIONAL //
	TYPE:	array of objects (variable length)
	USE:	adds each object in the array to the ArmourList variable

	The syntax of the objects is not explained here, but in the ArmourList syntax file.

	This way you can have a feature add a type of armour to the automation.
	It will also be added at the top of options in the armour field drop-down.
	This will result in having the armour only available if the feature is present.
*/

weaponOptions : [{ /* WeaponsList object, see WeaponsList syntax */ }],
/*	weaponOptions // OPTIONAL //
	TYPE:	array of objects (variable length)
	USE:	adds each object in the array to the WeaponsList variable

	The syntax of the objects is not explained here, but in the WeaponsList syntax file.

	This way you can have a feature add a type of weapon/attack to the automation.
	It will also be added at the top of options in each attack field drop-down.
	This will result in having the weapon/attack only available if the feature is present.
*/


// >>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Weapons & Armour >>> //
// >>>>>>>>>>>>>>>>>>>>>>>> //

dmgres : [
	"Fire",
	["Bludgeoning", "Bludgeon. (in rage)"],
	["Slashing", "Slash. (nonmagical)"]
],
/*	dmgres // OPTIONAL //
	TYPE:	array (variable length)
	USE:	add entry to the "Resistances" section on the 1st page

	This array can have two type of entries:
	1. A string of the damage type that resistance is gained against.
	2. An array of 2 strings:
		2.1	The first string is the damage type that resistance is gained against.
		2.2	The second string is the condition that the resistance works with.
			If the same resistance is gained from multiple sources,
			but one source has a condition and another doesn't,
			only the version without a condition is shown.
*/

savetxt : {
/*	savetxt // OPTIONAL //
	TYPE:	object (optional attributes)
	USE:	add text to the 1st page "Saving Throws" section
				("Saving Throws" section for Printer Friendly,
				 "Saving Throw Advantages/Disadvantages" section for Colourful)

	The attributes of this object can be "text", "immune", and "adv_vs"
*/

	text : ["Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg", "Magic can't put me to sleep"],
	/*	text // OPTIONAL //
		TYPE:	array of strings
		USE:	add a text to the 1st page

		Each string in the array is added to the 1st page, exactly as given here.
	*/

	immune : ["poison", "disease"],
	/*	immune // OPTIONAL //
		TYPE:	array of strings
		USE:	add strings to the "Immune to" text on the 1st page

		Each string in the array is added to the list of "Immune to" things in the 1st page "Saving Throws" section.
		Immunities from all sources are combined and listed alphabetically.
		In this example it would result in "Immune to disease and poison".
		If a damage resistance is present while immunity for the same is also present,
		then the damage resistance will be hidden as long as the immunity is present.
	*/

	adv_vs : ["traps", "charmed"]
	/*	adv_vs // OPTIONAL //
		TYPE:	array of strings
		USE:	add strings to the "Adv. on saves vs." text on the 1st page

		Each string in the array is added to the list of "Adv. on saves vs." things in the 1st page "Saving Throws" section.
		Saving throw advantages from all sources are combined and listed alphabetically.
		In this example it would result in "Adv. on saves vs. charmed and traps".
	*/
},

vision : [
	["Darkvision", 60],
	["Sunlight Sensitivity", 0],
	["Darkvision", "+30"],
	["Darkvision", "fixed 60"]
],
/*	vision // OPTIONAL //
	TYPE:	array (variable length)
	USE:	add string to the "Senses" field on the 1st page

	This array can have three type of entries, each of which is its own array with a length of 2
	1.	An array with a string and a number:
		1.1 The first entry is a string, the name of the thing to add to the "Senses" section on the 1st page.
		1.2	The second entry is a number, representing the distance in feet that this vision works on.
			You can also enter a 0 for something that doesn't have a range (e.g. Keen Smell).
	2.	An array with two strings:
		2.1 The first string is the name of the thing to add to the "Senses" section on the 1st page.
		2.2	The second entry is a string consisting of a logical operator ('+', '-', or '*') followed by a number.
			This will add the modifier in feet to the vision if present from another source.
	3.	An array with two strings:
		3.1 The first string is the name of the thing to add to the "Senses" section on the 1st page.
		3.2	The second entry is a string, the word "fixed" followed by a space and then a number.
			This will add the vision with the specified range, but won't let it be modified (e.g. gained from a magic item).
*/

speed : {
/*	speed // OPTIONAL //
	TYPE:	object (optional attributes)
	USE:	add or edit speed mode(s) to the 1st page

	The attributes of this object can be "walk", "burrow", "climb", "fly", "swim", and "allModes"
*/
	walk : { spd : 30, enc : 20 },
	burrow : { spd : 15, enc : 15 },
	/*	walk, burrow, climb, fly, or swim // OPTIONAL //
		TYPE:	object with two attributes, "spd" and "enc".
		USE:	add movement mode of the object's name

		"spd" is the speed in feet
		"enc" is the encumbered speed in feet

		Note that both "spd" and "enc" have to be present.
		If "spd" or "enc" is set to zero it is ignored (i.e. "enc : 0" means no encumbered speed).

		Both "spd" and "enc" can also be a string to perform special functions:
		1. "walk": If the entry is "walk" the number will be identical to the walking speed.
		2. "_walk": Using an underscore as the first character means
				the value is only added if the value would otherwise be non-zero.
		3. "+30" "-20": If the string starts with a + or - followed by a number.
				This will add the modifier in feet to the movement mode if present from another source.
		4. "fixed 60": If the string starts with "fixed" followed by a space and then a number,
				it will gain a speed of the number in feet, regardless of modifiers from other features.
	*/

	// example of using "walk":
	fly : { spd : "walk", enc : 0 },

	// example of using a modifier:
	climb : { spd : "+50", enc : 0 },

	// example of using "fixed":
	swim : { spd : "fixed 60", enc : "fixed 60" },

	allModes : "+10",
	/*	allModes // OPTIONAL //
		TYPE:	string
		USE:	add a modifier to all movement modes, if present

		The 'allModes' attribute can only consist of a modifier-string.
		It has to be a logical operator ("+" or "-") followed by a number.
		Every movement mode of the character, both normal and encumbered, will be subjected to the modifier in feet.
		This will only work on movement modes that are non-zero.
		It won't give the character a burrow speed if it would otherwise have none, for example.
	*/
},


// >>>>>>>>>>>>>>>>>>>>>> //
// >>> Ability Scores >>> //
// >>>>>>>>>>>>>>>>>>>>>> //

scores : [0, 1, 0, 0, 2, 0],
/*	scores // OPTIONAL //
	TYPE:	array of six numbers
	USE:	add ability score improvements to the Ability Scores dialog

	This array requires exactly six entries, each being a number.
	The entries are: [Str, Dex, Con, Int, Wis, Cha].
	You should put a 0 for an ability score that gets no improvement.
	You can use negative numbers.

	Where exactly the numbers will be added in the Ability Scores dialog depends on the parent feature.

	The array will also be used to generate a textual description of the improvement for the dialog and tooltips,
	but only if the attribute 'scorestxt' is not present in the same feature, see below.

	Note that if a feature gives you a choice in which ability score to improve,
	you should put that information in the 'scorestxt' attribute and not include the improvement here.
*/

scorestxt : "+2 Charisma and +1 to two other ability scores of my choice",
/*	scores // OPTIONAL //
	TYPE:	string
	USE:	description of ability score improvements to use in the Ability Scores dialog and tooltips

	You do not need this attribute if the ability score improvement does not offer a choice,
	then you can just use the 'scores' attribute, see above.
	You can have both this and the 'scores' attribute, they are not mutually exclusive.
*/

scoresOverride : [0, 0, 0, 19, 0, 0],
/*	scores // OPTIONAL //
	TYPE:	array of six numbers
	USE:	add ability score overrides to the Ability Scores dialog

	This array requires exactly six entries, each being a number.
	The entries are: [Str, Dex, Con, Int, Wis, Cha].
	You should put a 0 for an ability score that gets no override.

	An override will be used for the ability score if it would otherwise be less.

	The array will also be used to generate a textual description of the improvement for the dialog and tooltips,
	but only if the attribute 'scorestxt' is not present in the same feature.
*/


// >>>>>>>>>>>>>>>>>>>> //
// >>> Spellcasting >>> //
// >>>>>>>>>>>>>>>>>>>> //

spellcastingBonus : [{
/*	spellcastingBonus // OPTIONAL //
	TYPE:	array of objects (or just a single object)
	USE:	adds entries to the "Bonus Spells" section of the spell selection dialog

	If the parent attribute doesn't otherwise have spellcasting, the 'spellcastingBonus'
	attribute will add it.

	This object has three functions:
	1. Make a selection of spells to show in the drop-down in the spell selection dialog (same as a 'common spell list object').
	2. Determine how often and with what name the drop-down of spells is present in the "Bonus Spells" section.
	3. Determine how the first column of the spell will look on the spell sheet.

	For the first function, this object can have all the same attributes as a 'common spell list object'.
	For an explanation of those attributes see the file "_common spell list object.js".

	For the second and third functions, this object has some specific attributes, which are in addition to a 'common spell list object'.
	For those objects, see their individual explanations below.
*/

	// example of use of a 'common spell list object' attribute:
	spells : ["light"],

	name : "Arcane Initiate",
	/*	name // REQUIRED //
		TYPE:	string
		USE:	the name as it appears in the "Bonus Spells" section of the spell selection dialog
	*/

	times : 2,
	/*	name // OPTIONAL //
		TYPE:	number or array of numbers with 20 entries
		USE:	how many times this entry should appear in the "Bonus Spells" section of the spell selection dialog

		Setting this attribute to 1 is the same as omitting it.

		Setting this attribute to an array signals that it varies depending on level.
		Each entry in that array is a level, so you will most likely want to add 20 entries.
		IMPORTANT! Set the value to 0 for levels that the feature is not present.
		This attribute can have two type of values:
	*/

	selection : ["light"],
	/*	selection // OPTIONAL //
		TYPE:	array (variable length)
		USE:	select which of the spells from the drop-down to select

		Adding more than one entry to the array is only useful if the attribute 'times' is present.
		Each entry in the array is used for one of the times this 'spellcastingBonus' is added to the "Bonus Spells" section of the spell selection dialog.

		Note that each entry must be a spell's object name as in the SpellsList object.

		In this example the spell "Light" is selected.
		This is useful as the attribute 'spells' will make sure that only "Light" is an option in the drop-down, but won't actually select that option.
	*/

	firstCol : "8",
	/*	name // OPTIONAL //
		TYPE:	string
		USE:	set the first column of the spell line on the spell sheet

		This can be a string of one or two characters, or one character enclosed in brackets.
		Anything more than that will be cut off, as it won't fit in the field.

		Alternatively, you can set the first column to be something special:
		"checkbox"		// an empty checkbox
		"checkedbox"	// a checked checkbox
		"markedbox"		// a checked checkbox indicating that this spell is always prepared
		"atwill"		// the 'At will' graphic
		"oncesr"		// the 'One time per short rest' graphic (1× SR)
		"oncelr"		// the 'One time per long rest' graphic (1× LR)

		If you don't set anything for the first column the sheet will determine what is most logical.
	*/

	spellcastingAbility : 4,
	fixedDC : 17,
	/*	spellcastingAbility & fixedDC // OPTIONAL //
		Both these are explained in detail below.

		You can include either in a spellcastingBonus object to do the exact same thing.
		Only do this if the spellcastingBonus object is not part of the parent,
		for example if the spellcastingBonus object is part of a (feat/item) choice or (class/race) feature.
	*/
}],

spellcastingAbility : 6,
/*	spellcastingAbility // OPTIONAL //
	TYPE:	number corresponding to the ability score (1 = Str, 2 = Dex, 3 = Con, 4 = Int, 5 = Wis, 6 = Cha)
			or "class" or "race"
	USE:	set the ability score used for spellcasting abilities

	If you set this to "class", the sheet will use the highest spellcasting ability score of
	the spellcasting class(es) the character has.
	If you set this to "race", the sheet will use the spellcasting ability of the race, if any.

	When set to "class" or "race", but nothing is found (i.e. no spellcasting class/race),
	the sheet will assume there is a +0 bonus (spell DC 8, spell attack +0).

	Setting this to 0 or false is the same as not including this attribute.

	NOTE FOR CLASS AND RACIAL FEATURES
	This attribute will do nothing when included in a class or racial feature.
	The reason for this is that the class/race sets its spellcasting ability in the parent object (for race that uses this same attribute).

	If for some reason the parent class/race object didn't set the spellcasting ability or you need to change it,
	you can still set it by including this attribute in one of the spellcastingBonus objects.
	If you do that, this attribute will overwrite the spellcasting ability score used for the parent object (if any).
	For example, if you include this in a class feature for a cleric subclass and set it to `1`,
	the cleric will be casting spells using Strength from then on out.
*/

fixedDC : 13,
/*	fixedDC // OPTIONAL //
	TYPE:	number
	USE:	set the DC and spell attack to a fixed value, not dependent on ability score

	This attribute will stop the calculation of the DC and attack on the spell sheet and instead
	use this value or this value minus 8 for the spell attack.
	This attribute is mostly used by magic items.

	Setting this to 0 or false is the same as not including this attribute.

	NOTE FOR CLASS AND RACIAL FEATURES
	This attribute will do nothing when included in a class or racial feature.
	The reason for this is that the class/race sets its spellcasting ability in the parent object (for race that uses this same attribute).

	If for some reason the parent class/race object didn't set the spellcasting ability or you need to change it to a fixed DC,
	you can still set it by including this attribute in one of the spellcastingBonus objects.
	This attribute will overwrite the spellcasting ability score used for calculating DC/attack (if any).
	For example, if you include this in a class feature for a wizard subclass and set it to `12`,
	the wizard will be casting spells using DC 12 regardless of its intelligence modifier.
*/

spellcastingExtra : ["cure wounds", "guiding bolt", "flaming sphere", "lesser restoration", "daylight", "revivify", "guardian of faith", "wall of fire", "flame strike", "greater restoration"],
spellcastingExtra : ["disguise self", "rope trick", "fear", "greater invisibility", "seeming"].concat(new Array(95)).concat("AddToKnown"),
/*	spellcastingExtra // OPTIONAL //
	TYPE:	array (variable length)
	USE:	adds the spells in the array to the list of spells to choose from

	Each entry must be a spell object name as used in the SpellsList object.

	How these spells are added to the spell list depends on the type of spellcasting class:
	a) spell list or spellbook (cleric, druid, paladin, wizard)
		The spells are added to the generated spell sheet and marked as "always prepared".
	b) spells known (bard, ranger, sorcerer, warlock)
		The spells are added to the list of spells that the known spells can be selected from

		You can also have the spells be automatically added to the known spells, without counting to the maximum spells known.
		To do so, make sure the 101th entry in the array reads "AddToKnown", see example above.
		(e.g. spellcastingExtra[100] = "AddToKnown")

	This attribute will do nothing if the parent object does not grant spellcasting like a spellcasting class.
*/

spellFirstColTitle : "Ki",
/*	spellFirstColTitle // OPTIONAL //
	TYPE:	string
	USE:	set the title of the first column of the header on the spell sheet page(s)

	When generating a spell sheet for this attribute's parent object, it will have a header for each column.
	Setting the 'spellFirstColTitle' will cause the first title of the column titles to be exactly what you enter here.

	Note that there is only space for 2 characters in the header's first column.
	One character enclosed in brackets will also fit, for example: "(R)".

	This attribute will do nothing if the parent object does not grant spellcasting in one way or another.
*/

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Dynamic Automation Changes >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

calcChanges : {
/*	calcChanges // OPTIONAL //
	TYPE:	object (optional attributes)
	USE:	change how certain automation works: attacks, hit points, and spell list
			This will only affect attacks and hit points for the main character, not for its companions or wild shapes

	The attributes of this object can be "hp", "atkCalc", "atkAdd", and "spellList"
*/

	hp : function () {
		if (classes.known.sorcerer) {
			extrahp += classes.known.sorcerer.level;
			extrastring += '\n + ' + classes.known.sorcerer.level + ' from Draconic Resilience (Sorcerer)';
		};
	},
	hp : "if (classes.known.sorcerer) {extrahp += classes.known.sorcerer.level; extrastring += '\\n + ' + classes.known.sorcerer.level + ' from Draconic Resilience (Sorcerer)'; }; ",
	/*	hp // OPTIONAL //
		TYPE:	function or, for backwards-compatibility, string that is evaluated using eval()
		USE:	change how Hit Points are calculated and what the Hit Points tooltip says

		Both examples do the exact same thing, just one is a string and the other is a function.
		Writing a function is better as it is easier to avoid syntax errors.
		The string option is there for backwards-compatibility.

		Both the function and the string will be evaluated using eval() to make it possible to use local variables.

		Generally you will want to add bonus hit points to the 'extrahp' variable, which is a number.
		If you want to add text to the tooltip, you will have to add it to the 'extrastring' variable, which is a string.
	*/

	atkAdd : [
		function (fields, v) {
			if (v.WeaponName == 'eldritch blast') fields.Description += '; Target pushed back 10 ft';
		},
		"When I hit a creature with my Eldritch Blast cantrip, it is pushed 10 ft away from me."
	],
	atkAdd : [
		"if (WeaponName == 'eldritch blast') fields.Description += '; Target pushed back 10 ft';",
		"When I hit a creature with my Eldritch Blast cantrip, it is pushed 10 ft away from me."
	],
	/*	atkAdd // OPTIONAL //
		TYPE:	array with two entries:
				1st entry:	function or, for backwards-compatibility, string that is evaluated using eval()
				2nd entry:	string that is used to give an explanation of what the 1st entry does
		USE:	dynamically change what is put in the fields of an attack entry
				Note that this is only run for attacks that are recognized, not manually added

		// 1st array entry //
		Both examples do the exact same thing, just one is a string and the other is a function.
		Writing a function is better as it is easier to avoid syntax errors and will run faster.
		The string option is there for backwards-compatibility and this explanation assumes you are writing a function.

		The function will not be evaluated but is fed two variables:
		1)	fields, an object with all the different fields for an attack entry
			You can change this object to affect what is added to the fields
			For example, you can change which ability score is used by

			A list of the different attributes of this variable:
			var fields = {
				Proficiency, // boolean, whether to check the proficiency box (true) or not (false)
				Mod, // number, the ability score to select from the drop-down (0 = none, 1 = Str, 2 = Dex, 3 = Con, 4 = Int, 5 = Wis, 6 = Cha)
				Range, // string, the text to put in the Range field
				Damage_Type, // string, the text to put in the Damge Type drop-down
				Description, // string, the text to put in the Description field
				Description_Tooltip, // string, the text to put in the Description field's tooltip
				To_Hit_Bonus, // string, the text to put in the modifier field for To Hit
				Damage_Bonus, // string, the text to put in the modifier field for Damage
				Damage_Die, // string, the text to put in the modifier field for Damage Die
				Weight // number, the weight in lb to put in the weight field
			};

			These values will be set by what the recognized weapon

		2)	v, an object with some information about the attack
			Changing this object will do nothing, but you can use its input to test things

			An explanation of the different attributes of this variable:
			var v = {
				WeaponText, // string, both the name and description
				isDC, // boolean, whether or not this attack has a To Hit (false) or a DC (true)
				isSpell, // boolean, whether (true) or not (false) this attack is a cantrip or spell or has the word 'cantrip' or 'spell' in its name or description
				isMeleeWeapon, // boolean, whether (true) or not (false) this attack has a range of 'melee' and is not a spell
				isRangedWeapon, // boolean, whether (true) or not (false) this attack has a range that doesn't include 'melee' and is not a spell
				isNaturalWeapon, // boolean, whether (true) or not (false) this attack has the type 'natural'
				theWea, // object, the entry as it appears in the WeaponsList object
				StrDex, // number, either 1 (Str) or 2 (Dex) depending on which of the two ability scores is higher
				WeaponName, // string, the name of the entry in the WeaponsList object
				baseWeaponName, // string, the name of the entry in the WeaponsList object that the weapon is based on (or its own name if it is not based on anything)
				thisWeapon // array, the entry in the CurrentWeapons.known array
			}

		// 2nd array entry //
		This has to be a string and will be used to populate the "Things affecting the attack calculations" dialog.
		If you have both atkAdd and atkCalc in the same feature,
		it is better to fill only one of the second entries and leaving the other at "".
		Filling only one of the explanation strings will result in only a single entry
		for the feature in the "Things affecting the attack calculations" dialog instead of two.
	*/

	atkCalc : [
		function (fields, v, output) {
			if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/acid/i).test(fields.Damage_Type)) {
				output.extraDmg += What('Cha Mod');
			};
		},
		"Cantrips and spell that deal acid damage get my Charisma modifier added to their Damage."
	],
	atkCalc : [
		"if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && isSpell && (/acid/i).test(fields.Damage_Type)) { output.extraDmg += What('Cha Mod'); };",
		"Cantrips and spell that deal acid damage get my Charisma modifier added to their Damage."
	],
	/*	atkCalc // OPTIONAL //
		TYPE:	array with two entries
				1st entry:	function or, for backwards-compatibility, string that is evaluated using eval()
				2nd entry:	string that is used to give an explanation of what the 1st entry does
		USE:	dynamically change how the To Hit and Damage of attacks are calculated based
				Note that this is only run for attacks that are recognized, not manually added

		// 1st array entry //
		Both examples do the exact same thing, just one is a string and the other is a function.
		Writing a function is better as it is easier to avoid syntax errors and will run faster.
		The string option is there for backwards-compatibility and this explanation assumes you are writing a function.

		The function will not be evaluated but is fed three variables:
		1)	fields, an object with all the different fields for an attack entry
			Changing this object will do nothing, but you can use its input to test things
			For example, you can test if the character is proficient with the attack with 'fields.Proficiency'

			A list of the different attributes of this variable,
			see atkAdd above for a more in-depth explanation of each attribute:
			var fields = { Proficiency, Mod, Range, Damage_Type, Description, Description_Tooltip, To_Hit_Bonus, Damage_Bonus, Damage_Die, Weight };

		2)	v, an object with some information about the attack
			Changing this object will do nothing, but you can use its input to test things

			An explanation of the different attributes of this variable:
			var v = {
				WeaponText, // string, both the name and description
				isDC, // boolean, whether or not this attack has a To Hit (false) or a DC (true)
				isSpell, // boolean, whether (true) or not (false) this attack is a cantrip or spell or has the word 'cantrip' or 'spell' in its name or description
				isMeleeWeapon, // boolean, whether (true) or not (false) this attack has a range of 'melee' and is not a spell
				isRangedWeapon, // boolean, whether (true) or not (false) this attack has a range that doesn't include 'melee' and is not a spell
				isNaturalWeapon, // boolean, whether (true) or not (false) this attack has the type 'natural'
				isOffHand, // boolean, whether (true) or not (false) this attack is both a melee weapon and an off-hand attack
				theWea, // object, the entry as it appears in the WeaponsList object
				WeaponName, // string, the name of the entry in the WeaponsList object
				baseWeaponName, // string, the name of the entry in the WeaponsList object that the weapon is based on (or its own name if it is not based on anything)
				thisWeapon // array, the entry in the CurrentWeapons.known array
			}

		3)	output, an object with the information used to calculate the attack's To Hit & Damage
			You can change this object to affect the calculation
			For example, you can add a number to output.extraDmg to add more damage

			var output = {
				prof, // number, the proficiency bonus to use or 0 if not proficient
				die, // string, the damage die to use, identical to the fields.Damage_Die
				modToDmg, // boolean, whether to add the ability score modifier to damage (true) or not (false)
				mod, // number, the ability score to use (0 = none, 1 = Str, 2 = Dex, 3 = Con, 4 = Int, 5 = Wis, 6 = Cha)
				magic, // number, the magical bonus to add to both To Hit and Damage (0 if nothing to add)
				bHit, // string, the value of the modifier field for To Hit, identical to fields.To_Hit_Bonus
				bDmg, // string, the value of the modifier field for Damage, identical to fields.Damage_Bonus
				extraDmg, // number, amount of bonus damage to add
				extraHit // number, amount of bonus damage to add
			};

			Note that this variable, output, can be changed by consecutive calcChanges.atkCalc functions
			You can even save new attributes to it that you can use by calcChanges.atkCalc functions gained from other features

		// 2nd array entry //
		This has to be a string and will be used to populate the "Things affecting the attack calculations" dialog.
		If you have both atkAdd and atkCalc in the same feature,
		it is better to fill only one of the second entries and leaving the other at "".
		Filling only one of the explanation strings will result in only a single entry
		for the feature in the "Things affecting the attack calculations" dialog instead of two.
	*/

	spellList : [
		function(spList, spName, spType) {
			// don't add if this is not a class or a list of spells is already given
			if (!ClassList[spName] || spList.spells || spList.psionic) return;
			// if this is an 'extra spell', also test if it uses the class' spell list or not
			if (spType.indexOf("bonus") !== -1 && (spList.school || !spList["class"] || (spList["class"].indexOf(spName) === -1 && spName !== "fighter"))) return;
			// now add the array of bonus spells to the list
			spList.extraspells = spList.extraspells.concat(["acid splash", "druidcraft", "detect poison and disease", "expeditious retreat", "jump", "alter self", "enhance ability", "enlarge/reduce", "gaseous form", "water breathing", "wind wall", "freedom of movement", "polymorph", "creation"]);
		},
		"My background adds extra spells to the spell list(s) of my spellcasting class(es): Acid Splash, Druidcraft, Detect Poison and Disease, Expeditious Retreat, Jump, Alter Self, Enhance Ability, Enlarge/reduce, Gaseous Form, Water Breathing, Wind Wall, Freedom of Movement, Polymorph, and Creation."
	],
	/*	spellList // OPTIONAL //
		TYPE:	array with two entries
				1st entry:	function
				2nd entry:	string that is used to give an explanation of what the 1st entry does
		USE:	dynamically change what is included and excluded from the spell list of a class (or other spellcasting source)
				Note that this is only run for spell sheets generated using the spell selection dialog,
				it isn't used for 'complete' spell sheets.

		// 1st array entry //
		The function is fed three variables:
		1)	spList, an object that determines how the spell list will be generated.
			You can change this object to affect which spells are available.
			Note that this object determines the list of spells to choose from in the spell selection dialog,
			it does not determine what spells are selected, only what options are given to select spells from.

			The object will look as the 'common spell list object' explained in the file "_common spell list object.js".

			It will always contain the attribute 'extraspells', possibly as an empty array.
			The presence of all other attributes depends on what spell list is being generated.

			What you can do, for example, is limit the schools a class has access to by
			changing or adding the spList.school attribute.
			Or you can add spells to the list by adding them to the spList.extraspells array.
			Or you can remove spells from the list by changing or adding the spList.notspells attribute.

		2)	spName, a string that is the entry in the CurrentSpells object
			This string will be identical to whatever added the spellcasting feature.
			For example, this will be "wizard" for the wizard class spell list,
			"fighter" for the eldritch knight spell list,
			or "drow" for the racial spells gained from being a dark elf.

		3)	spType, a string that shows what type of spell list this is
			This can be one of multiple things:
			"book"	spellcasting class uses a spellbook (e.g. the wizard)
			"list"	spellcasting class prepares spells from a list (e.g. the cleric)
			"known"	spellcasting class has to select the spells it knows from a list (e.g. the bard)
			"feat"	spellcasting source is a feat and only gains spells from the spellcastingBonus feature
			"race"	spellcasting source is a race and only gains spells from the spellcastingBonus feature
			"item"	spellcasting source is a magic item and only gains spells from the spellcastingBonus feature

			It can also have de suffix "-bonus" added to one of the above if generating the list for
			something gained through the spellcastingBonus attribute.

		// 2nd array entry //
		This has to be a string and will be shown in the "Changes" dialog when this feature is added/removed.
		This explanation will also be available any time a change requires the re-generation of spell sheets.
	*/
},

addMod : [
	{ type : "skill", field : "Init", mod : "Int", text : "I can add my Intelligence modifier to initiative rolls." },
	{ type : "save", field : "all", mod : "Cha", text : "While I'm conscious I can add my Charisma modifier (min 1) to all my saving throws." },
],
/*	addMod // OPTIONAL //
	TYPE:	array of objects (variable length)
	USE:	add value to a modifier field

	You can have any number of objects in this array, each object must have the same four attributes, all of which are strings:
	1. type
		Can be "skill" or "save", but can also be left empty "".
	2. field
		What to add here depends on the type-
		a)	for "skill" it can be the name of a skill (e.g. "Acrobatics"),
			or "Init" for initiative,
			or "Too" for the optional tool/skill for which you can change the name,
			or "All" for the all skills modifier.
		b)	for "save" it can be the three-letter abbreviation of an ability score,
			or "All" for the all saves modifier.
		c)	for "" it has to be the exact name of the field as used in the PDF.
			common ones include:
			"Proficiency Bonus Modifier",	// modifier field for proficiency bonus
			"Passive Perception Bonus",		// modifier field for passive perception (not normal perception)
	3. mod
		This can be any combination of numbers, mathematical operators,
		and three-letter ability score abbreviations for ability score modifiers,
		or 'Prof' for the proficiency bonus.

		For example, to add the proficiency bonus, Constitution modifier, and subtract 2, it would look like this:
		mod : "Prof+Con-2",
	4. text
		This is an explanation of why the modifier was added and is used in the modifier change dialog.

	NOTE: for modifiers to attacks, use calcChanges.
*/

eval : "Checkbox('Jack of All Trades', true);",
eval : function() {
	AddString('Extra.Notes', 'Monk features:\n\u25C6 Lose Unarmored Defense, Martial Arts, and Unarmored Movement with armor/shields', true);
};
/*	eval // OPTIONAL //
	TYPE:	string or function
	USE:	the function is run or the string is evaluated using eval() when the feature is added

	This can be any JavaScript you want to have run whenever the feature is added.
*/

removeeval : "Checkbox('Jack of All Trades', false);",
removeeval : function() {
	RemoveString('Extra.Notes', 'Monk features:\n\u25C6 Lose Unarmored Defense, Martial Arts, and Unarmored Movement with armor/shields', true);
};
/*	removeeval // OPTIONAL //
	TYPE:	string or function
	USE:	the function is run or the string is evaluated using eval() when the feature is removed

	This can be any JavaScript you want to have run whenever the feature is removed.
*/

changeeval : "var monkSpd = function(n) {return '+' + (n < 2 ? 0 : n < 6 ? 10 : n < 10 ? 15 : n < 14 ? 20 : n < 18 ? 25 : 30);}(classes.known.monk.level); SetProf('speed', monkSpd !== '+0', {allModes : monkSpd}, displName);",
changeeval : function() {
	var monkSpd = function(n) {return '+' + (n < 2 ? 0 : n < 6 ? 10 : n < 10 ? 15 : n < 14 ? 20 : n < 18 ? 25 : 30);}(classes.known.monk.level);
	SetProf('speed', monkSpd !== '+0', {allModes : monkSpd}, displName);
};
/*	changeeval // OPTIONAL //
	TYPE:	string or function
	USE:	the function is run or the string is evaluated using eval() when the feature is present and the character's level changes

	This can be any JavaScript you want to have run whenever the level changes.
*/
