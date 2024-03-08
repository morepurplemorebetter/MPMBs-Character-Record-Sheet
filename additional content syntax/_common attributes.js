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

	Subject:	Common attributes

	Effect:		This is the syntax for common attributes that are shared by multiple things.
				The syntax here does not stand on its own.
				You will need another syntax file to use alongside this file.
				Use one of the syntax files not starting with an underscore and use this file when referred to.

	Works with:	Class features (and subclass features)
				Class feature choices (and subclass feature choices)
				Class feature extrachoices (and subclass feature extrachoices)
				Race main attributes
				Race features
				Background main attributes
				Background Features main attributes
				Feat main attributes
				Feat choices
				Magic Item main attributes
				Magic Item choices

	Sheet:		v13.1.1 and newer
*/
"example feature name" = { // you can ignore this, it is just here to make this file valid JavaScript

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

altResource : "SS 5+",
altResource : ["", "", "SS 2+", "SS 2+", "SS 1+", "SS 1+", "SS 1+", "SS 1+", "SS 1+", "SS 1+", "SS 1+", "SS 1+", "SS 1+", "SS 1+", "SS 1+", "SS 1+", "SS 1+", "SS 1+", "SS 1+", "SS 1+"],
/*	altResource // OPTIONAL //
	TYPE:	string, or array with 20 strings
	USE:	value to add in the "Recovery" column in the "Limited Features" section in addition to the 'recovery' attribute

	This is useful if the feature offers another way to be used,
	in addition to a number of times per time period (e.g. per short rest).
	For example, a feature might also be usable by expending spell slots.

	This attribute will do nothing if the 'recovery' attribute is not also present.

	This attribute can have two type of values:
	1. String
		For class features, this value is used to write the text in the "Class Features" section.
		It will be combined with the 'usages' and 'recovery' attributes to create a string of how the class feature works.
		For example-
			usages : 1,
			recovery : "long rest",
			altResource : "SS 5+",
		Will result in-
			"1× per long rest or SS 5+"
	2. Array
		An array signals that the altResource method varies depending on level.
		Each entry is a level, so you will most likely want to add 20 entries.
		Each entry has to be a string, see option 1. String for how those work.
		IMPORTANT! Set the value to "" for levels that the feature is not present.

	Common values are:
		"SS 3+"			// spell slot of 3rd level or higher
		"3 Ki"			// 3 ki points
		"5 SP"			// 3 sorcery points
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

	Use this attribute only if you do not want to use the feature`s name in the "Limited Features" section.
	If this attribute is present and the `action` attribute is also present,
	the `limfeaname` attribute will be used instead of the feature`s name for actions.

	This attribute will do nothing if not both the `usages` and `recovery` attributes or the `action` attribute
	are present in the same feature.
*/

limfeaAddToExisting : true,
/*	limfeaAddToExisting // OPTIONAL //
	TYPE:	boolean
	USE:	set to `true` to have the number set for `usages` be added to an existing limited feature by the same name, instead of overwriting it
	ADDED:	v13.0.6

	Normally, if a limited feature is added while one with the same name already exists,
	the usages of the newer limited feature is used, overwriting what was there before.
	When you set this to true, the number of usages will be added together instead.

	This attribute will do nothing if not both the `usages` and `recovery` attributes
	are present in the same feature.
	Nor will it do anything if there is no limited feature present by the same name when this feature is called.

	Setting this attribute to false is the same as not including it.
*/

additional : "10% chance",
additional : ["", "d6", "d6", "d6", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12"],
/*	additional // OPTIONAL //
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

extraLimitedFeatures : [{
	name : "Another Limited Feature", // REQUIRED //
	usages : 8, // REQUIRED //
	recovery : "long rest", // REQUIRED //
	usagescalc : "event.value = Math.max(1, What('Cha Mod'));", // OPTIONAL //
	additional : "2d8", // OPTIONAL //
	altResource : "SS 5+", // OPTIONAL //
	addToExisting : true // OPTIONAL // ADDED v13.0.6
}],
/*	extraLimitedFeatures // OPTIONAL //
	TYPE:	array of objects (variable length)
	USE:	entries to add to the "Limited Features" section which are not level-dependent

	Use this attribute only if you have more than one limited feature to add and you already
	used the default usages/recovery method described above.
	Each object has to contain at least the `name`, `usages`, and `recovery` attributes.
	The `usagescalc`, `additional`,  `altResource`, and `addToExisting` attributes are optional.

	For an explanation of how the different attributes work, see the attributes by the same names above,
	except for the following, which have a different name above:

	ATTRIBUTE NAME		SEE NAME IN MAIN FEATURE
	name				limfeaname
	addToExisting		limfeaAddToExisting

	The only exception is that attributes in this object can never be an array,
	they are always level-independent.

	The 'name' attribute can only be a string.
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


// >>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Weapons & Armour >>> //
// >>>>>>>>>>>>>>>>>>>>>>>> //

weaponsAdd : ["Bite", "Longsword +2"],
/*	weaponsAdd // OPTIONAL //
	TYPE:	array (variable length)
	USE:	adds each string in the array to one of the attack drop-downs on the 1st page

	This is an array of strings. Each string will be added to the attack section.
	An entry will only be added if there is space left in the attack section and it isn't already present.
	The strings will be added exactly as you write them here, capitalisation and all.

	If a feature with this attribute is removed, these attack entries will be removed as well.
*/

armorAdd : "Natural Armor",
/*	armorAdd // OPTIONAL //
	TYPE:	string
	USE:	sets the string as the value for the armour drop-down on the 1st page

	The armour will only be set if there is currently no armour selected on the 1st page, or
	if the currently selected armour gives a lower AC total than this armour.
	The string will be added exactly as you write it here, capitalisation and all.

	If a feature with this attribute is removed, this armour will be removed as well.
*/

shieldAdd : "Wooden Buckler",
shieldAdd : ["Magical Buckler", 1, 2],
/*	shieldAdd // OPTIONAL //
	TYPE:	string or array with three entries
	USE:	set the shield on the 1st page as well as its bonus to AC and weight

	This attribute can be one of two type of entries:
	1)	string
		This string is put in the 'Shield' description field just like you would manually type in something.
		It is then used to calculate the shield's AC bonus (2 + any magic modifiers you include in the string).
		For example, 'Shield +2' will give an AC of 4.
		The weight of the shield will be set at 6 lb.
	2)	array
		This array must have 3 entries:
		2.1	string
			This string is set in the 'Shield' description field.
			It can contain a magical modifier (i.e. any number following a + or -).
		2.2	number
			This is used to fill out the AC of the shield, without counting any magical modifiers in its name.
		2.3	number
			This is used to fill the weight of the shield in lb.


	The shield will only be added if the AC bonus is more or equal to that of the current shield.

	If a feature with this attribute is removed, this shield will be removed as well.
*/

ammoAdd : [["Green Arrows", 12], ["Smoke Bombs", 5]],
/*	ammoAdd // OPTIONAL //
	TYPE:	array (variable length) of arrays with 2 entries
	USE:	adds each entry in the array to one of the ammunition drop-downs on the 1st page
	ADDED:	v13.0.9

	This attribute has to be an array of arrays that have one or two entries each:
	1)	string
		The first entry of each sub-array is the literal text that has to be set for the
		ammunition drop-down box on the 1st page.
	2)	number
		This sets what should be entered for the "amount" part of the ammunition on the 1st page.
		If this entry is omitted, the sheet will set the amount to 1.

	An entry will only be added if there is space left in the ammunition section and
	it isn't already present.
	The strings will be added exactly as you write them here, capitalisation and all.

	If a feature with this attribute is removed, these ammunition entries will be removed as well.
*/

ammoOptions : [{ /* AmmoList object, see "ammunition (AmmoList).js" syntax file  */ }],
/*	ammoOptions // OPTIONAL //
	TYPE:	array of objects (variable length)
	USE:	adds each object in the array to the AmmoList variable

	The syntax of the objects is not explained here, but in the "ammunition (AmmoList).js" syntax file.

	This way you can have a feature add a type of ammunition to the automation.
	It will also be added to the options in each ammunition field drop-down.
	This will result in having the ammunition only available if the feature is present.
*/

armorOptions : [{ /* ArmourList object, see "armor (ArmourList).js" syntax file */ }],
/*	armorOptions // OPTIONAL //
	TYPE:	array of objects (variable length)
	USE:	adds each object in the array to the ArmourList variable

	The syntax of the objects is not explained here, but in the "armor (ArmourList).js" syntax file.

	This way you can have a feature add a type of armour to the automation.
	It will also be added at the top of options in the armour field drop-down.
	This will result in having the armour only available if the feature is present.
*/

weaponOptions : [{ /* WeaponsList object, see "weapon (WeaponsList).js" syntax file */ }],
/*	weaponOptions // OPTIONAL //
	TYPE:	array of objects (variable length)
	USE:	adds each object in the array to the WeaponsList variable

	The syntax of the objects is not explained here, but in the "weapon (WeaponsList).js" syntax file.

	This way you can have a feature add a type of weapon/attack to the automation.
	It will also be added at the top of options in each attack field drop-down.
	This will result in having the weapon/attack only available if the feature is present.
*/


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Other Fields on the 1st or 2nd Page >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

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
		2.2	The second string also contains the condition that the resistance works with.
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

	immune : ["poison", "disease", "paralyzed (by magic)"],
	/*	immune // OPTIONAL //
		TYPE:	array of strings
		USE:	add strings to the "Immune to" text on the 1st page
		CHANGE:	v13.1.0 (conditional added)

		Each string in the array is added to the list of "Immune to" things in the 1st page "Saving Throws" section.
		Immunities from all sources are combined and listed alphabetically.
		In this example it would result in "Immune to disease, paralyzed (by magic), and poison".
		If a damage resistance is present while immunity for the same is also present,
		then the damage resistance will be hidden as long as the immunity is present.

		CONDITIONAL (since v13.1.0)
		If the string contains something between brackets, then whatever is between those brackets is seen
		as "conditional". This means that if another feature adds the same thing without brackets, only the
		version without brackets will be shown.
		Thus, using the example above, if something else adds "paralyzed", the entry "paralyzed (by magic)"
		will be ignored.
	*/

	adv_vs : ["traps", "charmed", "sleep (by magic)"]
	/*	adv_vs // OPTIONAL //
		TYPE:	array of strings
		USE:	add strings to the "Adv. on saves vs." text on the 1st page
		CHANGE:	v13.1.0 (conditional added)

		Each string in the array is added to the list of "Adv. on saves vs." things in the 1st page "Saving Throws" section.
		Saving throw advantages from all sources are combined and listed alphabetically.
		In this example it would result in "Adv. on saves vs. charmed, sleep (by magic), and traps".

		CONDITIONAL (since v13.1.0)
		If the string contains something between brackets, then whatever is between those brackets is seen
		as "conditional". This means that if another feature adds the same thing without brackets, only the
		version without brackets will be shown.
		Thus, using the example above, if something else adds "sleep", the entry "sleep (by magic)"
		will be ignored.
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
			If this is a zero, the text will be added without a range, unless another feature has a range set for this.
			Alternatively, you can set this to "unlimited" for something that normally has a range, but this feature makes it unlimited.
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
		3. "+30" "-20": If the string starts with a "+", "-", "*", or "/" followed by a number,
				this will add, subtract, multiply, or divide the movement mode with the given number, if present from another source.
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
		It has to be a logical operator ("+", "-", "*", or "/") followed by a number.
		Every movement mode of the character, both normal and encumbered, will be subjected to the modifier in feet.
		This will only work on movement modes that are non-zero.
		It won't give the character a burrow speed if it would otherwise have none, for example.
	*/
},

carryingCapacity : 2,
/*	carryingCapacity // OPTIONAL //
	TYPE:	whole number
	USE:	multiply the carrying capacity (encumbrance) with this number

	This number is used to multiple the carrying capacity multiplier with.
	You can find the carrying capacity multiplier in the 'mods' field in the Equipment section on the second page.
	The number in that field is used to multiply the carrying capacity (encumbrance) with.
	By default it is "1".
	The carrying capacity multiplier field can only be a positive number (0 or more), thus
	if this attribute would bring it below 0, it is set to 0.
	The carrying capacity multiplier will always be rounded to the closest multiple of 0.25.
*/

advantages : [
	["Initiative", true],
	["Stealth", false],
	["Wisdom", true]
],
/*	advantages // OPTIONAL //
	TYPE:	array (variable length) with array (length 2)
	USE:	set advantage on an ability check, saving throw, or attacks

	This array can have any number of entries, each of which must be an array of its own with 2 entries:
	1.	The first entry of each enclosed array is a string
		This tells the sheet where to apply the (dis)advantage: ability check, saving throw, or attack.
		For skills, use the full name of the skill, or its 4-letter abbreviation (e.g. "Perc" for Perception).
		For saving throws, use the full name of the ability, or its 3-letter abbreviation.
		For initiative, use "Initiative", or "Init".
		For attacks, use "Attack", or "Att".
	2.	The second entry of each enclosed array is a boolean
		Set this to 'true' if you want to give advantage.
		Set this to 'false' if you want to give disadvantage.

	The Colourful sheets have checkboxes on the first page for both advantage and disadvantage for all
	skills, saving throws, initiative, and attacks.
	Using this attribute, you can set those checkboxes.
	The sheet will automatically determine if advantage, disadvantage, or neither should be checked (as they cancel each other out).
	Other effects from advantage/disadvantage are also taken into consideration,
	such as 5 being added to Passive Perception when the character has advantage on Perception checks.

	Although the Printer Friendly sheets don't have checkboxes for advantage/disadvantage,
	this attribute will still be taken into consideration for (dis)advantage on Stealth, and its effect on Passive Perception.
*/


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

	The array will also be used to generate a textual description of the improvement for the dialog
	and tooltips, but only if the attribute 'scorestxt' is not present in the same feature, see below.

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

scoresMaximum : [24, 0, 24, 0, "+2", 0],
/*	scores // OPTIONAL //
	TYPE:	array of six numbers or strings
	USE:	change ability score maximum in the Ability Scores dialog
	CHANGE:	v13.0.8 (allow modifiers "+2" as well as fixed numbers)

	By default, the ability score increases can never increase an ability score above 20.
	Using this attribute, you can change that maximum.
	Note that the maximum has no effect on something set by the 'scoresOverride' attribute.

	This array requires exactly six entries, each being a number.
	The entries are: [Str, Dex, Con, Int, Wis, Cha].
	You should put a 0 for an ability score that gets no change in maximum.

	You can enter a lower maximum (1-19), the default of 20 will only be used if nothing sets a maximum.
	If multiple things change the maximum, the highest of those will be used.

	Alternatively, you can enter a string that reads as a mathematical modifier that adds "+X" or
	subtracts "-Y". For example, you could set it to "+2" to increase the maximum by 2.
	These modifiers will be applied to the highest maximum for the score set by other features, or 20,
	if no other features set a maximum. (e.g. the "+2" will result in a maximum of 22).

	If the maximum has a requirement, because the feature only increases the maximum if the total
	goes over 20, then take a look at the `scoresMaxLimited` attribute below.

	The array will also be used to generate a textual description of the improvement for the dialog
	and tooltips, but only if the attribute 'scorestxt' is not present in the same feature.
*/

scoresMaxLimited : true,
/*	scores // OPTIONAL //
	TYPE:	boolean
	USE:	wether to apply the ability score maximum increase only if that maximum is reached (true) or always (false)
	ADDED:	v13.0.8

	By default, the ability score increases can never increase an ability score above 20.
	Using the `scoresMaximum` attribute above, you can change that maximum to a higher value.
	However, some features only allow the maximum to increase if the new total reaches that maximum.

	This attribute only works if the same object also includes both the `scores` and the `scoresMaximum`
	attributes.

	For example, a magic item might read: "Your Constitution score increases by 2, up to a maximum of 22."
	Thus, if the score is currently 18, it is increased to 20, but its maximum should stay 20.
	If the feature is worded like that, set this attribute to true and set `scores` and `scoresMaximum` 
	attributes to the respective bonuses. The result will then look like this:
		scores : [0, 0, 2, 0, 0, 0],
		scoresMaximum : [0, 0, 22, 0, 0, 0],
		scoresMaxLimited : true

	// IMPORTANT //
	When setting this attribute to `true`, the `scoresMaximum` can't have modifiers (e.g. "+2"), but can
	only exists of numbers.

	Setting this attribute to false is the same as not including this attribute.
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

	This object executes three functions:
	1. Make a selection of spells to show in the drop-down in the spell selection dialog (same as a 'common spell list object').
	2. Determine how often and with what name the drop-down of spells is present in the "Bonus Spells" section.
	3. Determine how the first column of the spell will look on the spell sheet.

	For the first function, this object can have all the same attributes as a 'common spell list object'.
	For an explanation of those attributes see the file "_common spell list object.js".

	For the second and third functions, this object has some specific attributes, which are in addition to a 'common spell list object'.
	For those objects, see their individual explanations below.

	NOTE
	This adds a spell at the level of the parent feature and the spell will be added regardless of
	the character otherwise having access to the appropriate spell level.

	For adding subclass spells like the ones a cleric gets from its domain, a warlock gets from its patron, or a paladin gets from its oath,
	take a look at the `spellcastingExtra` attribute below, as it takes the spell's level into account.
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

		Setting this attribute to 1 is the same as not including it.

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
	fixedSpAttack : 9,
	allowUpCasting : true, // Added v13.0.6
	magicItemComponents : true, // Added v13.0.8
	/*	spellcastingAbility & fixedDC & fixedSpAttack & allowUpCasting & magicItemComponents // OPTIONAL //
		All of these are explained in detail below.

		You can include each in a spellcastingBonus object to do the exact same thing as explained below.
		You will only have to include it into a single array item of the spellcastingBonus attribute.
		If you include it in multiple array items, only the last one will be used.

		Only do this if the spellcastingBonus object is not part of the parent,
		for example if the spellcastingBonus object is part of a (feat/item) choice or (class/race) feature.
	*/
}],

spellcastingAbility : 6,
spellcastingAbility : [4, 5, 6],
/*	spellcastingAbility // OPTIONAL //
	TYPE:	number corresponding to the ability score (1 = Str, 2 = Dex, 3 = Con, 4 = Int, 5 = Wis, 6 = Cha)
			or "class" or "race"
			or an array of any of the above
			or the exact object name of another spellcasting source (see below)
	USE:	set the ability score used for spellcasting abilities
	CHANGE:	v13.0.7 (added option for array)
	       	v13.0.8 (added option for a specific object name)

	CLASS or RACE
	If you set this to "class", the sheet will use the highest spellcasting ability score of
	the spellcasting class(es) the character has.
	If you set this to "race", the sheet will use the spellcasting ability of the race, if any.
	When set to "class" or "race", but nothing is found (i.e. no spellcasting class/race),
	the sheet will assume there is a +0 bonus (spell DC 8, spell attack +0).

	OBJECT NAME
	If you want the spellcasting ability to be linked to another spellcasting feature
	(e.g. to a class' spellcasting), then set this attribute to the object name of that spellcasting feature.
	Note that these object names are all lowercase and identical to their ClassList, RaceList, FeatsList,
	or MagicItemsList entries of their source object.
	When you want to link it to an object name, this can't be an array.
	If that specific object name isn't found, the sheet will treat this as if it said "class".
	If you link it to another spellcasting entry, the automation will also apply any dynamic bonuses for that
	entry to this entry (e.g. bonus to warlock DCs if this is set to "warlock").
	Use this only if the thing clearly says it becomes part of class/race spellcasting and not just has
	the same spellcasting ability or spell list.

	Setting this to 0 or false is the same as not including this attribute.

	Since v13.0.7, you can set this to be an array consisting of numbers 1-6, "class", "race", or
	any combination thereof.
	If this attribute is an array, the player will be prompted to select one of the options in the array.

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
	Unless the "fixedSpAttack" is also present, in which case that will be used for spell attacks.
	This attribute is mostly used by magic items.
	This attribute has no affect on cantrips/spells in the attack section.

	Setting this to 0 or false is the same as not including this attribute.

	NOTE FOR USE WITH fixedSpAttack
	If you include either fixedDC or fixedSpAttack,
	then the other will be calculated using the first.
	Normally, you only need to include one or the other.

	NOTE FOR CLASS AND RACIAL FEATURES
	This attribute will do nothing when included in a class or racial feature.
	The reason for this is that the class/race sets its spellcasting ability in the parent object (for race that uses this same attribute).

	If for some reason the parent class/race object didn't set the spellcasting ability or you need to change it to a fixed DC,
	you can still set it by including this attribute in one of the spellcastingBonus objects.
	This attribute will overwrite the spellcasting ability score used for calculating DC/attack (if any).
	For example, if you include this in a class feature for a wizard subclass and set it to `12`,
	the wizard will be casting spells using DC 12 regardless of its intelligence modifier.
*/

fixedSpAttack : 5,
/*	fixedSpAttack // OPTIONAL //
	TYPE:	number
	USE:	set the spell attack and DC to a fixed value, not dependent on ability score

	This attribute will stop the calculation of the DC and attack on the spell sheet and instead
	use this value or this value plus 8 for the spell save DC.
	Unless the "fixedDC" is also present, in which case that will be used for spell save DC.
	This attribute is mostly used by magic items.
	This attribute has no affect on cantrips/spells in the attack section.

	Setting this to 0 or false is the same as not including this attribute.

	NOTE FOR USE WITH fixedDC
	If you include either fixedDC or fixedSpAttack,
	then the other will be calculated using the first.
	Normally, you only need to include one or the other.

	NOTE FOR CLASS AND RACIAL FEATURES
	This attribute will do nothing when included in a class or racial feature.
	The reason for this is that the class/race sets its spellcasting ability in the parent object (for race that uses this same attribute).

	If for some reason the parent class/race object didn't set the spellcasting ability or you need to change it to a fixed attack bonus,
	you can still set it by including this attribute in one of the spellcastingBonus objects.
	This attribute will overwrite the spellcasting ability score used for calculating DC/attack (if any).
	For example, if you include this in a class feature for a wizard subclass and set it to `7`,
	the wizard will be casting spells using a spell attack of +7 regardless of its intelligence modifier.
*/

allowUpCasting : true,
/*	allowUpCasting // OPTIONAL //
	TYPE:	boolean
	USE:	do not limit spells to only be cast at their lowest level
	ADDED:	v13.0.6

	Normally, the sheet will limit spells gained from a feat, magic item, or race to be cast only at
	its lowest level, removing any upcasting options from the short spell description.

	By setting this attribute to true, you force the sheet to leave the upcasting description alone.
	Do this for feats, magic items, and racial traits.

	By setting this attribute to false, you force the sheet to remove the upcasting description.
	Do this for class features (see note below).

	This setting can be overwritten for a parent by a later feature. Only the most recent is used.

	NOTE FOR CLASS FEATURES
	Be aware that this setting will apply to all spells gained from the parent (i.e. class), not just
	those gained by the direct parent.
*/

magicItemComponents : true,
/*	magicItemComponents // OPTIONAL //
	TYPE:	boolean
	USE:	change all spell components on the spell sheet to "Mƒ" (only a magic item)
	ADDED:	v13.0.8

	Normally, spells cast by magic items don't require any components other than the magic item itself.

	By setting this attribute to true, you force the sheet to remove all spell components of any spell on
	the spell sheet for the parent and replace them with just "Mƒ".
	Also, all price for the component will be removed from the short description.
	Lastly, the tooltip will no longer have the material component listed, but will rather point out that
	only the magic item is needed to cast the spell.

	For a magic item, this attribute is assumed to be true by default. You only need to include it,
	if you want to set it to 'false', forcing the normal use of components.

	Be aware that setting this to true will affect all spells of the parent. It is impossible to affect
	just a single spells. To accomplish that, use `calcChanges.spellAdd` or `spellChanges`.

	Setting this attribute to true for magic items is the same as not including it.
	Setting this attribute to false for anything other than magic items is the same as not including it.
*/

spellcastingExtra : ["cure wounds", "guiding bolt", "flaming sphere", "lesser restoration", "daylight", "revivify", "guardian of faith", "wall of fire", "flame strike", "greater restoration"],
/*	spellcastingExtra // OPTIONAL //
	TYPE:	array (variable length)
	USE:	adds the spells in the array to the list of spells to choose from

	The spells added here will appear in the spell selection dialog in the column "Subclass Spells".
	Although only the first 10 will be visible in the dialog, all will be used by the automation.

	Each entry must be a spell object name as used in the SpellsList object.

	For the explanation below, a reference to "spells" means spells that are 1st-level
	and higher (i.e. not cantrips).

	How the cantrips/spells are added to the spell list depends on the type of spellcasting class:
	a) spell list (cleric, druid, paladin)
		The spells are added to the generated spell sheet and marked as "always prepared".
		The cantrips are added to the cantrips known on the generated spell sheet,
		but not counted towards the number of cantrips that can be known.

		If you set the attribute `spellcastingExtraApplyNonconform` (see below) to true,
		the spells are added to the generated spell sheets, but not marked as "always prepared",
		and the cantrips are added to the lists of cantrips that the known cantrips can be selected from.

	b) spells known (bard, ranger, sorcerer, warlock)
		The cantrips/spells are added to the lists of cantrips/spells that the known cantrips/spells can be selected from.

		If you set the attribute `spellcastingExtraApplyNonconform` (see below) to true,
		the cantrips/spells are instead added to those known on the generated spell sheet
		without counting to the maximum cantrips/spells known.

	c) spellbook (wizard)
		The cantrips are added to the list of cantrips that the known cantrips can be selected from.
		The spells are added to the list of spells that the spellbook can be filled with.

		If you set the attribute `spellcastingExtraApplyNonconform` (see below) to true,
		the cantrips/spells are instead added to those known/in the spellbook on the generated spell sheet,
		without counting to the maximum cantrips known or being shown in the spell selection dialog as being part of the spellbook.

	These cantrips/spells otherwise follow the normal rules for availability (unlike `spellcastingBonus`):
	They will only appear on the generated spell sheet if the character would otherwise have
	access to spells of that level or the spell dialog is set to include all spell levels.

	This attribute will do nothing if the parent object does not grant spellcasting like a spellcasting class.

	IMPORTANT!
	Any instance of this attribute will overwrite previous instances in the same parent.
	E.g. if you use this in a subclass and in a subclass' feature, the latter will
	overwrite the former, and only the latter will be used.
	Thus, if you want to incrementally add spells,
	be sure to include previously gained spells in the array of the later feature as well.
*/

spellcastingExtraApplyNonconform : true,
/*	spellcastingExtraApplyNonconform // OPTIONAL //
	TYPE:	boolean
	USE:	whether to use the default (false) or variant (true) way of adding the spells defined by `spellcastingExtra` (see above)

	What this attribute does is described in the description for the `spellcastingExtra` attribute (see above).

	This attribute will do nothing if the parent object does not grant spellcasting like a spellcasting class.
	This attribute will do nothing if the parent object or a dependent object
	(e.g. a lower-level class feature) does not have the `spellcastingExtra` attribute.

	Setting this attribute to false is the same as not including this attribute.

	IMPORTANT!
	Any instance of this attribute will overwrite previous instances in the same parent.
	E.g. if you use this in a subclass and in a subclass' feature, the latter will
	overwrite the former, and only the latter will be used.

	This also means that you don't need to have `spellcastingExtra` and `spellcastingExtraApplyNonconform`
	defined in the same class feature.
	And it means that you can change the behaviour of `spellcastingExtra` at a higher level.
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

spellChanges : {
	"spare the dying" : {
		time : "1 bns",
		range : "Touch",
		changes : "I can cast spare the dying as a bonus action instead of an action, and it has a range of 30 ft instead of touch." // REQUIRED // string
	}
},
/*	spellChanges // OPTIONAL //
	TYPE:	object with objects
	USE:	change aspects of spells when generating a spell sheet of the parent object

	The object names in this must correspond with the object names as used in the SpellsList object.
	The possible attributes in that sub-object are the same as those for a SpellsList entry,
	see the syntax file "spells (SpellsList).js".
	Any attributes you add there will override the ones found in the SpellsList object.

	// IMPORTANT: 'changes' attribute (string) //
	Each sub-object must have a 'changes' attribute, a string, explaining what was changed.
	This 'changes' attribute is amended to the full spell description in the tooltip.
	Use it to make clear how the spell now differs from the original version.

	// NOT ALL SpellsList ATTRIBUTES SUPPORTED //
	As these attributes are only looked into when the fields on the sheet are filled with the
	spell's attributes, there is no point in using this to change the 'classes', 'level', or
	'source' attribute of a SpellsList entry.

	// MAGIC ITEMS & SPELL COMPONENTS //
	Normally, spells cast through magic items don't require any components, so these components are
	removed by default. See the `magicItemComponents` attribute above.

	For example, you can use this attribute in a cleric class feature to change the casting time and range
	of the Spare the Dying cantrip. This is what the above example does.
	This change will then only be visible on the part of the spell sheet generated for the cleric class,
	and not for another spellcasting source, even if that also has the Spare the Dying cantrip.

	If you want to affect all spells, not just of the parent class/race/magic item/feat,
	then use the calcChanges.spellAdd attribute, see below.

	Note that these changes will never be applied when manually adding a spell to a spell sheet.
	They will only be applied when generating a spell sheet for the character.

	This attribute will do nothing if the parent object does not grant spellcasting in one way or another.
*/

spellcastingBonusElsewhere : {
/*	spellcastingBonusElsewhere // OPTIONAL //
	TYPE:	object with specific attributes (see below)
	USE:	add spells to a spellcasting feature other than the parent object
	ADDED:	v13.0.8
	
	Normally, the automation will only influence spells known for spellcasting gained from the parent object.
	With this attribute, you can add known and/or bonus spells to another spellcasting source.
	For example, you could have a magic item spellbook add spells to the spellbook of a wizard. That way
	they aren't displayed in their own header on the spell sheet pages, but as part of the wizard's spells.

	To do this, the object must contain the `addTo` attribute and either or both the `spellcastingBonus`
	and `addToKnown` attributes.
	These attributes are discussed individually below.

	Note that you should not use this if you want to add bonus spells to spellcasting from a parent object.
	For example, don't use this for a subclass feature that adds a bonus spell for that class', instead
	use `spellcastingBonus`, see above.
*/
	addTo : "wizard",
	/*	addTo // REQUIRED //
		TYPE:	string
		USE:	to what the bonus spells should be added

		This string can be one of the following things:
		1) an exact or partial match for a CurrentSpells object entry or its `name` attribute
			CurrentSpells object entries are the same as the ClassList, RaceList, FeatsList,
			and MagicItemsList object entries.
			For example, if you set this to "ranger", it will only add something
			If this is an exact match for a CurrentSpells object, then the sheet will not look for
			partial matches or `name` attribute matches.
		2) a type of CurrentSpells entry
			This can be either "class", "race", "feat", "magic item", or "background".
			
		If the above produces multiple matches, the sheet will prompt the player to select which to use.
	*/

	spellcastingBonus : [],
	/*	spellcastingBonus // OPTIONAL //
		This entry works identical to the `spellcastingBonus` above. See there how this entry works.

		Be aware that this spellcastingBonus will be added to the spellcasting defined in `addTo` above.
		Be careful, because you could overwrite somethings like which spellcasting ability is used.

		The `spellcastingBonusElsewhere` object requires to have either or both the `spellcastingBonus`
		or `addToKnown` attribute to be present.
	*/

	addToKnown : [],
	/*	spellcastingBonus // OPTIONAL //
		TYPE:	array (variable length) of spell object names as used in the SpellsList object
		USE:	which spells should be added to the spells known / spellbook

		Unlike the `spellcastingBonus` attribute above, the spells listed here will be directly added
		to the known cantrips/spells.
		This comes with the following limitations/considerations:
		  * Only spellscasting classes have known spells, feats, magic items, and races only have
			'bonus' spells. To add spells to those kind of entries, use the `spellcastingBonus` attribute.
		  * Spellcasting classes that always know all their spells (e.g. cleric, druid, paladin), can't
			have spells added this way to their known spells (cantrips will still work).
			For those kind of classes, use `calcChanges.spellList`.
		  * The sheet only has space for 20 cantrips and 20 spells known. If the spellcaster already has
			known spells and this list would increase the number above 20, the access spells will be lost.
			This limitation does not apply to classes that use a spellbook, as a spellbook can have an
			unlimited number of spells.
			Every class can still only have a maximum of 20 known cantrips, though.
		  * These added spells must still adhere to the normal restrictions of the spell list available for
			the class. If you want to go beyond that (for example, add a wizard spell to a cleric),
			you'll also have to change the available spell list using `calcChanges.spellList`.

		The `spellcastingBonusElsewhere` object requires to have either or both the `spellcastingBonus`
		or `addToKnown` attribute to be present.
	*/

	countsTowardsKnown : true
	/*	spellcastingBonus // OPTIONAL //
		TYPE:	boolean
		USE:	whether to count the spells added by `addToKnown` towards the maximum number allowed (true)
				or not (false)

		If you exclude this attribute or set it to false, any spells and cantrips added by the
		`addToKnown` attribute above will be considered extra spells that do not count towards the
		maximum number of spells known.

		Including this attribute is only useful if you also include the `addToKnown` attribute.
		Setting this attribute to false is the same as not including this attribute.
	*/
},

// >>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Companion Options >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>> //

creatureOptions : [{ /* CreatureList object, see "companion, wild shape (CreatureList).js" syntax file  */ }],
/*	creatureOptions // OPTIONAL //
	TYPE:	array of objects (variable length)
	USE:	adds each object in the array to the CreatureList variable
	ADDED:	v13.0.6

	The syntax of the objects is not explained here, but in the "companion, wild shape (CreatureList).js" syntax file.

	This way you can have a feature add a type of creature to the automation.
	It will also be added to the options in each companion page's Race field drop-down.
	This will result in having the creature only available if the feature is present.

	IMPORTANT!
	Creatures added in this way are never available as a wild shape.
	When the feature with this attribute is removed, any companion pages that these
	creature(s) are	used on will have the race field reset (and thus the creature's stats
	will be removed from that companion page).
*/

creaturesAdd : [
	["Warhorse", true,
		function (AddRemove, prefix) {
			// Make the warhorse small
			if (AddRemove) PickDropdown(prefix + "Comp.Desc.Size", 4);
		}
	],
	["Purple Crawler"],
	["Cat", false, false, "familiar"]
],
/*	creatureOptions // OPTIONAL //
	TYPE:	array of arrays (variable length)
	USE:	adds a creature to a companion page (adds companion page if none empty)
	ADDED:	v13.0.6
	CHANGE:	v13.0.10 (added 4th array entry)
	CHANGE:	v13.1.3 (added "stop" option to 2nd array entry)

	Each array must contain 1, 2, 3, or 4 entries, which are the following:
	1) String with the name of the race to add to the companion page // REQUIRED
		The sheet will search for the first empty companion page (or add an empty page)
		and add this entry in the "Race" drop-down box on that page.
		This string is added exactly as it is written here, so it is recommended to capitalize it for consistency.

		If the race already exists on a companion page, it is not added.

		When the parent feature is removed, any companion page with this filled out as
		the race, will have the race reset. Thus, all stats of that race will be removed.

	2) Boolean or "stop", set to true if the whole page should be removed // OPTIONAL
		If set to true, when the parent feature is removed, any companion page with the
		1st entry filled out as the race, will be deleted without warning.
		Deleted pages can not be recovered, any information on them is lost.

		Setting this to false will cause the sheet to do the default action, which is to only
		reset the race of the companion pages with the 1st entry filled out as the race.

		Alternatively, you can set this to the string "stop", which causes the creature
		not te be removed from the companion page at all when the parent feature is removed.
		This was added in v13.1.3

	3) Function called when the creature is added/removed // OPTIONAL
		This function is called after the creature race in the 1st entry is added or
		removed from a page (even if the whole page is removed, see 2) ).

		This function is passed two variables:
		3.1) AddRemove
			A boolean that tells whether the creature was added (true) or removed (false).
		3.2) prefix
			A string with the page identifier for the companion page.
			You can use this to call on fields or invoke functions for that companion page.

		If the 1st entry race is already present on a companion page, no changes will be
		made to that page and the first such page will be used for this callback function.

		If you are adding a creature that is itself added using the `creatureOptions`
		attribute, consider not using this callback function, but adding an `eval` and
		`removeeval` to its CreatureList object instead.

	4) String of the special companion type that should be applied // OPTIONAL
		This string has to be a key in the CompanionList object.
		This companion type will be applied before the callback function above
		(3rd array entry) is called.

		Import scripts can add things to the CompanionList object, but generally these
		options should be available (if the applicable scripts are imported if they're not SRD):

		SRD   OBJECT KEY             EXPLANATION
		 V    "familiar"             Find Familiar spell
		 V    "pact_of_the_chain"    Pact of the Chain familiar (Warlock 3rd-level boon)
		 V    "mount"                Find Steed spell
		 -    "steed"                Find Greater Steed spell
		 -    "companion"            Ranger's Companion (Ranger: Beast Master feature)
		 -    "strixhaven_mascot"    Strixhaven Mascot familiar (Strixhaven Mascot feat)
		 -    "companionrr"          Animal Companion (2016/09/12 Unearthed Arcana:
			                                           Revised Ranger's Beast Conclave feature)
		 -    "mechanicalserv"       Mechanical Servant (2017/01/09 Unearthed Arcana: 
			                                             Artificer's Mechanical Servant feature)

		If the string doesn't match a CompanionList object key, nothing will happen.

	The changes dialog will list on which companion page something was added or removed.

	If a feature with this attribute is removed, these creatures will be removed as well.
*/


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Dynamic Automation Changes >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

calcChanges : {
/*	calcChanges // OPTIONAL //
	TYPE:	object (optional attributes)
	USE:	change how certain automation works: attacks, hit points, and spell list
			This will only affect attacks and hit points for the main character, not for its companions or wild shapes

	This object can have several pre-defined attributes, which are explained below.
*/

	hp : function (totalHD, HDobj, prefix) {
		if (classes.known.sorcerer) {
			return [classes.known.sorcerer.level, "Draconic Resilience (Sorcerer)"];
		}
	},
	hp : "if (classes.known.sorcerer) {extrahp += classes.known.sorcerer.level; extrastring += '\\n + ' + classes.known.sorcerer.level + ' from Draconic Resilience (Sorcerer)'; }; ",
	/*	hp // OPTIONAL //
		TYPE:	function or, for backwards-compatibility, string that is evaluated using eval()
		USE:	change how Hit Points are calculated and what the Hit Points tooltip says

		Both examples do the exact same thing, just one is a string and the other is a function.
		Writing a function is better as it is easier to avoid syntax errors.
		The string option is there for backwards-compatibility and this explanation assumes you are writing a function.

		The function will not be evaluated but is fed three variables:
		1) totalHD
			A number that represents the amount of hit dice the character has (normally equal to the character level).
			Use this to add HP equal to the current total level.
		2) HDobj
			A JSON object that has all the attributes used to generate the HP tooltip text
			and the HP average, fixed value, and maximum.

			A list of the different attributes of this variable:
			var HDobj = {
				conMod,	// number, Constitution modifier
				conCorrection, // boolean, true if the die average + Con mod is less than 1
				count, // number, the amount of hit dice (the same as totalHD)
				dieStr, // array with strings, joined together with " + " to form
				           the description of the HP gained from the hit dice, e.g.
				           ["10 (1st level)", "2d10 (11)"]
				average, // number, the total HP value when using the average of each die (e.g. 4.5 for 1d8)
				fixed, // number, the total HP value when using the fixed value for each die (e.g. 5 for 1d8)
				max, // number, the total HP value when using the maximum value for each die (e.g. 8 for 1d8)
				alt, // array with numbers, empty by default but you can push a number to the end of this array,
				        which represent an alternative HP total.
				        Doing so will cause this number to become an option in the Set Max HP button.
						If you do so, preferably also push a description to the end of the `altStr` array, see below.
				altStr // array with string, empty by default but you can push a string to the end of this array,
				          which is used as descriptive text for the alternative HP total.
						  Only do so when also adding something to the end of the `alt` array, see above.
						  This string shouldn't contain the total HP added to the `alt` array,
						  nor the name of the feature, as both will be added automatically.
			}
		3) prefix
			A string with the page identifier for the companion page.
			When this function is invoked for the main character, this will always be an empty string.
			When this function is invoked for a companion page, this is the identifier for which companion page this is for.

		The function can edit the HDobj directly to affect the hit point calculation
		and/or return an array with 1, 2, or 3 entries.
		The returned array entries will then be used as follows:
		1) The number of hit points to add [number] // REQUIRED
			If this is undefined or false, the whole addition will be ignored.
		2) The descriptive text of where the hit points come from [string] // OPTIONAL
			If you leave this out, the sheet will automatically generate a description for it.
		3) Whether (true) or not (false) [boolean] // OPTIONAL
			It this is set to true, second entry string is added as-is to the HP tooltip.
			If this is set to false (or not set at all), the tooltip will be automatically generated from the first entry number and the second entry string.

		Normally, you would not have to edit the HDobj or add a second or third entry.
		E.g. just "return [totalHD];" is enough to add 1 HP per level.

		If you want to submit a completely different calculation for the hit points,
		then push the total calculated HP to the HDobj.alt array and push the description
		to the HDobj.altStr array.
		Generally speaking, this functionality is reserved for creatures (CreatureList).
		An example:
	hp : function (totalHD, HDobj) {
		HDobj.alt.push(totalHD * 10);
		HDobj.altStr.push("I gain 10 hit points per level, regardless of hit dice or Constitution modifier.");
	},
	*/
	hpForceRecalc : true,
	/*	hpForceRecalc // OPTIONAL //
		TYPE:	boolean
		USE:	recalculate the Max HP tooltip (and value, if set to automatic) whenever anything changes
		ADDED:	v13.0.6

		Normally, the hit points tooltip/value are only recalculated whenever the
		level or Constitution score changes.
		Note that the Max HP value only updates if set to do so automatically, but the
		tooltip will need to be updated whenever something changes that affects HP calculation.
		Setting this to true will cause the tooltip for the Max HP field to be updated whenever
		any field changes on the sheet, no just the character level or Constitution score.
		You should use this if you add a custom `hp` function (see above) that calls on anything
		else than just level or Constitution (e.g. adds Intelligence modifier to hit points).

		This attribute will only work if you set the `hp` attribute (see above) in the same object.

		Setting this attribute to false is the same as not including it.
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
		TYPE:	array with three entries:
				1st entry:	function or, for backwards-compatibility, string that is evaluated using eval()
				2nd entry:	optional string that is used to give an explanation of what the 1st entry does
				3rd entry:	optional number used to determine the order in which to run the functions
		USE:	dynamically change what is put in the fields of an attack entry
				Note that this is only run for attacks that are recognized, not manually added
		CHANGE:	v13.0.8 (priority, 3rd array entry)
				v13.1.1 (added v.isThrownWeapon)

		// 1st array entry // REQUIRED //
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
				Damage_Type, // string, the text to put in the Damage Type drop-down
				Description, // string, the text to put in the Description field
				Description_Tooltip, // string, the text to put in the Description field's tooltip
				To_Hit_Bonus, // string, the text to put in the modifier field for To Hit
				Damage_Bonus, // string, the text to put in the modifier field for Damage
				Damage_Die, // string, the text to put in the modifier field for Damage Die
				Weight // number, the weight in lb to put in the weight field
			};

			These values will be set by the recognized weapon.

		2)	v, an object with some information about the attack
			Changing this object will do nothing, but you can use its input to test things

			An explanation of the different attributes of this variable:
			var v = {
				WeaponText, // string, both the name and description
				WeaponTextName, // string, just the name
				isDC, // boolean, whether or not this attack has a To Hit (false) or a DC (true)
				isSpell, // boolean, whether (true) or not (false) this attack is a recognized cantrip or spell or has the word 'cantrip' or 'spell' in its name or description. Be aware that something can be both a spell/cantrip and a weapon attack
				isWeapon, // boolean, whether (true) or not (false) this attack is considered a weapon attack
				isMeleeWeapon, // boolean, whether (true) or not (false) this attack has a range of 'melee' and is considered a melee weapon attack
				isRangedWeapon, // boolean, whether (true) or not (false) this attack has a range that doesn't include 'melee' and is considered a ranged weapon attack
				isNaturalWeapon, // boolean, whether (true) or not (false) this attack has the type 'natural'
				isThrownWeapon, // boolean, whether (true) or not (false) this attack has the 'thrown' property [added v13.1.1]
				theWea, // object, the entry as it appears in the WeaponsList object
				StrDex, // number, either 1 (Str) or 2 (Dex) depending on which of the two ability scores is higher
				WeaponName, // string, the name of the entry in the WeaponsList object
				baseWeaponName, // string, the name of the entry in the WeaponsList object that the weapon is based on (or its own name if it is not based on anything)
				thisWeapon // array, the entry in the CurrentWeapons.known array
			}

		// 2nd array entry // OPTIONAL //
		This has to be a string and will be used to populate the "Things affecting the attack calculations" dialog.
		It you already have either atkCalc or spellCalc in the same feature,
		it is better to fill only one of the second entries and leaving the others at "".
		Filling only one of the explanation strings will result in only a single entry
		for the feature in the "Things affecting the attack calculations" dialog instead of two.

		// 3rd array entry // OPTIONAL //
		This has to be a positive number that will be used to prioritise the order in which the functions
		are processed. The lowest number gets processed first.
		Functions with identical numbers are processed alphabetically.
		You do not have to provide this number, by default a value is given by the parent, as follows:

		VALUE   	PARENT
		100  		Magic (placeholder for possible future feature)
		200  		Magic Items
		300  		Feats
		400  		Background
		500 + lvl	Race (level only added for features with a `minlevel` attribute)
		600 + lvl	Class (level only added for features with a `minlevel` attribute)

		If you do want to give a number to make sure it is processed in the right order, take a look at the
		recommended values below:

		VALUE	REASON
		1-10 	When changing the damage die to something else (e.g. Monk's Martial Arts)
		17-20	When changing the critical range to something else (e.g. 18 is used for
				Fighter (Champion)'s Superior Critical)
		200< 	(199 or less) Something that is best changed before any script is run
		700-899	When dependent on an attribute of the weapon that could be changed by 
				another feature (e.g. the Rogue's Sneak Attack, because something could
				theoretically add the Finesse property)
		900+ 	When using the damage die for something in the description (e.g. Half-orc's Savage Attacks)
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
		TYPE:	array with three entries
				1st entry:	function or, for backwards-compatibility, string that is evaluated using eval()
				2nd entry:	optional string that is used to give an explanation of what the 1st entry does
				3rd entry:	optional number used to determine the order in which to run the functions
		USE:	dynamically change how the To Hit and Damage of attacks are calculated
				Note that this is only run for attacks that are recognized, not manually added
		CHANGE:	v13.0.8 (priority, 3rd array entry)
				v13.1.1 (added v.isThrownWeapon)

		// 1st array entry // REQUIRED //
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
				WeaponTextName, // string, just the name
				isDC, // boolean, whether or not this attack has a To Hit (false) or a DC (true)
				isSpell, // boolean, whether (true) or not (false) this attack is a recognized cantrip or spell or has the word 'cantrip' or 'spell' in its name or description
				isWeapon, // boolean, whether (true) or not (false) this attack is considered a weapon attack. Be aware that something can be both a spell/cantrip and a weapon attack
				isMeleeWeapon, // boolean, whether (true) or not (false) this attack has a range of 'melee' and is considered a melee weapon attack
				isRangedWeapon, // boolean, whether (true) or not (false) this attack has a range that doesn't include 'melee' and is considered a ranged weapon attack
				isNaturalWeapon, // boolean, whether (true) or not (false) this attack has the type 'natural'
				isThrownWeapon, // boolean, whether (true) or not (false) this attack has the 'thrown' property [added v13.1.1]
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
				mod, // number, the ability score modifier to use (so the value of the associated ability score set in fields.Mod)
				magic, // number, the magical bonus to add to both To Hit and Damage (0 if nothing to add)
				bHit, // string, the value of the modifier field for To Hit, identical to fields.To_Hit_Bonus
				bDmg, // string, the value of the modifier field for Damage, identical to fields.Damage_Bonus
				extraDmg, // number, amount of bonus damage to add
				extraHit // number, amount to add to attack roll ("roll To Hit")
			};

			Note that this variable, output, can be changed by consecutive calcChanges.atkCalc functions
			You can even save new attributes to it that you can use by calcChanges.atkCalc functions gained from other features

		// 2nd array entry // OPTIONAL //
		This has to be a string and will be used to populate the "Things affecting the attack calculations" dialog.
		It you already have either atkAdd or spellCalc in the same feature,
		it is better to fill only one of the second entries and leaving the others at "".
		Filling only one of the explanation strings will result in only a single entry
		for the feature in the "Things affecting the attack calculations" dialog instead of two.

		// 3rd array entry // OPTIONAL //
		This has to be a positive number that will be used to prioritise the order in which the functions
		are processed. The lowest number gets processed first.
		Functions with identical numbers are processed alphabetically.
		For more information, see the 3rd array entry in the `atkAdd` explanation above.
	*/

	spellCalc : [
		function (type, spellcasters, ability) {
			if (type == "dc") return 1;
		},
		"I add +1 to all the saving throw DCs of my spells."
	],
	/*	spellCalc // OPTIONAL //
		TYPE:	array with three entries
				1st entry:	function
				2nd entry:	optional string that is used to give an explanation of what the 1st entry does
				3rd entry:	optional number used to determine the order in which to run the functions
		USE:	dynamically change how spell attacks, spell save DC, and/or number of spells prepared are calculated
		CHANGE:	v13.0.8 (priority, 3rd array entry)

		This attribute is used both in the attacks section and on spell sheet pages,
		but not for the 'Ability Save DC' on the 1st page.
		For the attacks section, this is only run for cantrips/spells that are recognized, not manually added.

		// 1st array entry // REQUIRED //
		The function should return the number it wishes to add/remove as a number.
		The function will not be evaluated but is fed three variables:
		1)	type, a string with the type of the thing being processed.
			This can be one of three things:
				"dc"
				"attack"
				"prepare"

			Check against this to see if you are adding a number to the correct thing.
			For example, if you want to add 2 to the DC, but not to the spell attack
			or number of prepared spells, do the following:
				if (type == "dc") return 2;

		2)	spellcasters, an array of CurrentSpells object entry names.
			These entry names are identical to the source of the spellcasting.
			For example, it will be ["wizard"] if the thing to calculate is the wizard's spell DC/attack bonus/spells to prepare;

			Check against this if you only want to add a number to the spell save DC if a certain spellcasting class is present.
			For example, if you only want the spell DC of the cleric to be 3 higher:
				if (type == "dc" && spellcasters.indexOf("cleric") != -1) return 3;

		3)	ability, a number of the ability score being used.
			This can be one of seven numbers:
				0 = none, 1 = Str, 2 = Dex, 3 = Con, 4 = Int, 5 = Wis, 6 = Cha

			Check against this if you only want to change something if it is with a certain ability score.
			For example, if you want to add 1 to the spell attacks done with Charisma:
				if (type == "attack" && ability == 6) return 1;

		// 2nd array entry // OPTIONAL //
		This has to be a string and will be used to populate the "Things affecting the attack calculations" dialog.
		It you already have either atkAdd or atkCalc in the same feature,
		it is better to fill only one of the second entries and leaving the others at "".
		Filling only one of the explanation strings will result in only a single entry
		for the feature in the "Things affecting the attack calculations" dialog instead of two.

		// 3rd array entry // OPTIONAL //
		This has to be a positive number that will be used to prioritise the order in which the functions
		are processed. The lowest number gets processed first.
		Functions with identical numbers are processed alphabetically.
		For more information, see the 3rd array entry in the `atkAdd` explanation above.
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
		TYPE:	array with three entries
				1st entry:	function
				2nd entry:	optional string that is used to give an explanation of what the 1st entry does
				3rd entry:	optional number used to determine the order in which to run the functions
		USE:	dynamically change what is included and excluded from the spell list of a class (or other spellcasting source)
				Note that this is only run for spell sheets generated using the spell selection dialog,
				it isn't used for 'complete' spell sheets.
		CHANGE:	v13.0.8 (priority, 3rd array entry)

		// 1st array entry // REQUIRED //
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

		// 2nd array entry // OPTIONAL //
		This has to be a string and will be shown in the "Changes" dialog when this feature is added/removed.
		This explanation will also be available any time a change requires the re-generation of spell sheets.

		// 3rd array entry // OPTIONAL //
		This has to be a positive number that will be used to prioritise the order in which the functions
		are processed. The lowest number gets processed first.
		Functions with identical numbers are processed alphabetically.
		For more information, see the 3rd array entry in the `atkAdd` explanation above.
	*/

	spellAdd : [
		function (spellKey, spellObj, spName, isDuplicate) {
			if ((/heals/).test(spellObj.description) && spellObj.range === "touch") {
				// healing spells have a range of 60 ft instead of touch
				spellObj.range = What("Unit System") === "metric" ? ConvertToMetric("60 ft", 0.5) : "60 ft";
				return true;
			} else {
				// add Charisma modifier to spells that deal poison damage
				return genericSpellDmgEdit(spellKey, spellObj, "poison", "Cha");
			}
		},
		"Healing spells that have a range of touch, have a range of 60 ft instead. Cantrips and spell that deal poison damage get my Charisma modifier added to their Damage."
	],
	/*	spellAdd // OPTIONAL //
		TYPE:	array with three entries
				1st entry:	function
				2nd entry:	string that is used to give an explanation of what the 1st entry does
				3rd entry:	optional number used to determine the order in which to run the functions
		USE:	dynamically change aspects of spells when it is added on the spell sheet
		CHANGE:	v13.0.8 (priority, 3rd array entry)

		// 1st array entry //
		This function is called whenever a spell is added to the spell sheet,
		both when added manually and during spell sheet generation.
		You can use it to dynamically change something about a spell like its description, range, or school.
		This function is passed four variables:
		1)	spellKey, a string of the name of the entry in the SpellsList variable.
			Thus, you can find the original SpellsList entry with SpellsList[spellKey].

		2)	spellObj, the object of the entry which you can edit.
			This has the same attributes as a SpellsList entry, see the syntax file "spells (SpellsList).js".
			The only exception is that when using the metric system, both the 'description' and 'range' attribute
			will already have been converted into their metric versions.
			Also, it will have the `firstCol` attribute set to whatever the automation wants it to be and
			you can change it here to something else (e.g. change a 'checkbox' to a 'markedbox').

		3)	spName, a string that is the entry in the CurrentSpells object
			This string will be identical to whatever added the spellcasting feature.
			For example, this will be "wizard" for the wizard class spell list,
			"fighter" for the eldritch knight spell list,
			or "drow" for the racial spells gained from being a dark elf.
			This will be an empty string when the spell is added manually.

		4)	isDuplicate, a boolean that is true if the spell is a duplicate
			This is intended for spells that are added using the 'spellcastingBonus' attribute, but are also present on the spell list otherwise.
			For duplicate spells like this, the first time the spell is added,
			it is treated as the one gained from 'spellcastingBonus', and this boolean is set to false.
			Then, the second time this spell is added, it is treated as the one gained from the regular spell list and this attribute is true.


		By changing the attributes of the spellObj, you change what is put in the fields.
		Changing that object has no affect on the original SpellsList entry.

		Since v13.0.7 you can call on the `genericSpellDmgEdit()` function to automatically increase
		the damage or healing of a spell.
		This function dynamically adds an ability modifier, value, or die to the damage
		or healing displayed in the short description on the spell sheet.

		genericSpellDmgEdit(spellKey, spellObj, dmgType, ability, notMultiple, onlyRolls, maximizeRolls)
		  This function requires 7 parameters (the first 4 are required), which are as follows:
		1)	spellKey, a string, same as the one above

		2)	spellObj, the object of the spell entry, same as the one above

		3)	dmgType, a string that will be used to create the regular expression, or "heal"
			If you set this to "heal", the function will only look at healing spells
			This string can be a damage type, or multiple, separated with a pipe character (which
			functions as 'or' in regular expression).
			For example, use "fire|radiant" to match both fire and radiant spells.
			The match has to be for the whole word, but some damage types can be abbreviated, see below.
			Thus, if you want to match a spell that deals lightning damage, enter "lightning|lightn.".
			IMPORTANT: do not use capturing groups!

		4)	ability, a string or number, which will be added to the damage/healing
			This can be the three-letter abbreviation for an ability score (Str, Dex, Con, Int, Wis, or Cha),
			a die (e.g. "1d6"), a number, or anything you'd want to add to the damage (e.g "2/SL").
			Make sure the abbreviation has its first letter capitalized.

		5)	notMultiple, boolean whether to add the bonus to only one instance (true) or multiple (false)
			This parameter is optional, if you don't set it, it will assume `false`.

		6)	onlyRolls, boolean whether to add the bonus to only rolls (true) or also fixed values (false)
			This parameter is optional, if you don't set it, it will assume `false`.

		7)	maximizeRolls, boolean whether to replace all dice with their maximum value (true) or not (false)
			This parameter is optional, if you don't set it, it will assume `false`.

		Some longer damage type names can be shortened in the spell short descriptions:
			DAMAGE TYPE    SHORTENED
			Bludgeoning    Bludg.
			Lightning      Lightn.
			Necrotic       Necro.
			Piercing       Pierc.
			Slashing       Slash.

		This function is processed after the 'spellChanges' attribute.
		If you need to change only spells for one spellcasting source, use the 'spellChanges' attribute above.

		If the sheet is set to use the metric system, the conversion to metric will be done before
		this function is processed.
		Thus, if your manipulation includes imperial units, make sure to convert them to metric.

		This function will only be processed if the checkbox "Allow features to dynamically change spells"
		in the final spell selection dialog is checked.

		// return //
		If you want to inform the player that this function changed something for a specific spell,
		make sure that it returns true;

		// 2nd array entry // OPTIONAL //
		This has to be a string and will be shown in the "Changes" dialog when this feature is added/removed.
		This explanation will also be available any time a change requires the re-generation of spell sheets.

		// 3rd array entry // OPTIONAL //
		This has to be a positive number that will be used to prioritise the order in which the functions
		are processed. The lowest number gets processed first.
		Functions with identical numbers are processed alphabetically.
		For more information, see the 3rd array entry in the `atkAdd` explanation above.
	*/

	creatureCallback : [function(prefix, oCrea, bAdd) {
		if (!(/undead/i).test(oCrea.type + What(prefix + "Comp.Desc.MonsterType"))) return;
		var aFnc = bAdd ? AddString : RemoveString;
		aFnc(prefix + "Comp.Use.HP.Temp", 30, true);
	},
	"Any undead I create, using magic or otherwise, gain 30 temporary hit points."],
	/*	creatureCallback // OPTIONAL //
		TYPE:	array with three entries
				1st entry:	function
				2nd entry:	optional string that is used to give an explanation of what the 1st entry does
				3rd entry:	optional number used to determine the order in which to run the functions
		USE:	dynamically change the companion page after a creature was selected on it
		ADDED:	v13.0.6
		CHANGE:	v13.0.8 (priority, 3rd array entry)

		// 1st array entry // REQUIRED //
		This function is called whenever a creature (CreatureList) is applied/removed on the companion page.
		This function is not called when a player race (RaceList) is applied/removed on the companion page.
		This happens when you select a creature in the Race dropdown box on the companion page, for example.
		Also when a feature adds/removes a creature with the `creaturesAdd` attribute (if not a player race).
		You can use it to dynamically change something about a creature like its features, attacks, or HP.

		This function is passed three variables:
		1)	prefix, a string with the page identifier for the companion page.
			Use this to call fields on the companion page.

		2)	oCrea, the object of CreatureList or RaceList entry that is currently active on the page.
			This is identical to the CurrentCompRace[prefix] object.
			If nothing was recognized (i.e. no known creature or player race was selected),
			this object will have no information.
			Changes to this object will affect the sheet only until the next time it is opened,
			i.e. changes will not be saved.

		3)	bAdd, a boolean to indicate whether adding (true) or removing (false) the special companion type.
			Make sure that the function removes whatever changes it does when this variable is false.

		When adding a creature, this function is processed last,
		after the creature has been fully added on the companion page.
		When removing a creature, this function is processed first,
		before anything else is changed on the companion page.


		// 2nd array entry // OPTIONAL //
		This has to be a string and will be shown in the "Changes" dialog when this feature is added/removed.
		This explanation is also available under the Companion Options button on any companion page.


		// 3rd array entry // OPTIONAL //
		This has to be a positive number that will be used to prioritise the order in which the functions
		are processed. The lowest number gets processed first.
		Functions with identical numbers are processed alphabetically.
		For more information, see the 3rd array entry in the `atkAdd` explanation above.
	*/
	companionCallback : [function(prefix, oCrea, bAdd, sCompType) {
		if (sCompType !== "familiar") return;
		var str = "\u25C6 Purple Power: The familiar's skin, hide, hair, or feathers turn purple and it gains resistance to acid damage.";
		var aFnc = bAdd ? AddString : RemoveString;
		aFnc(prefix + "Comp.Use.Features", str, true);
	},
	"The familiars I create using the Find Familiar spell turn purple and gain resistance to acid damage."],
	/*	companionCallback // OPTIONAL //
		TYPE:	array with three entries
				1st entry:	function
				2nd entry:	optional string that is used to give an explanation of what the 1st entry does
				3rd entry:	optional number used to determine the order in which to run the functions
		USE:	dynamically change the companion page after something has been turned into a special type of companion (e.g. Find Familiar or Ranger's Companion)
		ADDED:	v13.0.6
		CHANGE:	v13.0.8 (priority, 3rd array entry)

		// 1st array entry // REQUIRED //
		This function is called whenever a special companion type is applied/removed on the companion page.
		This happens when you use the Companion Options button to add a Find Familiar option, for example.
		And also when you use the Companion Options button to change an existing companion,
		into another special type, like a Ranger's Companion for example,
		or when you reset it back to normal, removing the special type.
		You can use it to dynamically change something about a companion like its features, attacks, or HP.

		This function is passed four variables:
		1)	prefix, a string with the page identifier for the companion page.
			Use this to call fields on the companion page.

		2)	oCrea, the object of CreatureList or RaceList entry that is currently active on the page.
			This is identical to the CurrentCompRace[prefix] object.
			If nothing was recognized (i.e. no known creature or player race was selected),
			this object will have no information.
			Changes to this object will affect the sheet only until the next time it is opened,
			i.e. changes will not be saved.

		3)	bAdd, a boolean to indicate whether adding (true) or removing (false) the special companion type.
			Make sure that the function removes whatever changes it does when this variable is false.

		4)	sCompType, a string to indicate the special companion type (key in the CompanionList object).

			Import scripts can add things to the CompanionList object, but generally these
			options should be available (if the applicable scripts are imported if they're not SRD):

			SRD   OBJECT KEY             EXPLANATION
			 V    "familiar"             Find Familiar spell
			 V    "pact_of_the_chain"    Pact of the Chain familiar (Warlock 3rd-level boon)
			 V    "mount"                Find Steed spell
			 -    "steed"                Find Greater Steed spell
			 -    "companion"            Ranger's Companion (Ranger: Beast Master feature)
			 -    "strixhaven_mascot"    Strixhaven Mascot familiar (Strixhaven Mascot feat)
			 -    "companionrr"          Animal Companion (2016/09/12 Unearthed Arcana:
														Revised Ranger's Beast Conclave feature)
			 -    "mechanicalserv"       Mechanical Servant (2017/01/09 Unearthed Arcana: 
															Artificer's Mechanical Servant feature)

		When adding a special companion type, this function is processed last,
		after all changes for the special companion type have completed.
		When removing a special companion type, this function is processed first,
		before all changes for the special companion type are undone.


		// 2nd array entry // OPTIONAL //
		This has to be a string and will be shown in the "Changes" dialog when this feature is added/removed.
		This explanation is also available under the Companion Options button on any companion page.

		// 3rd array entry // OPTIONAL //
		This has to be a positive number that will be used to prioritise the order in which the functions
		are processed. The lowest number gets processed first.
		Functions with identical numbers are processed alphabetically.
		For more information, see the 3rd array entry in the `atkAdd` explanation above.
	*/
},

addMod : [
	{ type : "skill", field : "Init", mod : "Int", text : "I can add my Intelligence modifier to initiative rolls." },
	{ type : "save", field : "all", mod : "max(Cha|1)", text : "While I'm conscious I can add my Charisma modifier (min 1) to all my saving throws." },
],
/*	addMod // OPTIONAL //
	TYPE:	array of objects (variable length)
	USE:	add value to a modifier field

	You can have any number of objects in this array, each object must have the same four attributes, all of which are strings:
	1. type
		Can be "skill", "save", or "dc", but can also be left empty "".
	2. field
		What to add here depends on the type-

		a)	for "skill" it can be the name of a skill (e.g. "Acrobatics"),
			or "Init" for initiative,
			or "Too" for the optional tool/skill for which you can change the name,
			or "all" for the all skills modifier,
			or "pass" for the passive perception modifier.

		b)	for "save" it can be the three-letter abbreviation of an ability score,
			or "all" for the all saves modifier.

		c)	for "dc" it can be the three-letter abbreviation of an ability score.
			In this context, "dc" refers to the Ability Save DC on the front page.
			This option is not available for a CreatureList object, as the companion page
			doesn't have a separate space for Ability Save DC.
			Do NOT use this to increase Spell Save DCs, use calcChanges.spellCalc instead.

		d)	for "" it has to be the exact name of the field as used in the PDF.
			common ones include:
			"Proficiency Bonus Modifier"	// modifier field for proficiency bonus
			"Age"							// age description field
			"SpellSlots.CheckboxesSet.lvlX"	// amount of spellslot checkboxes to show, 
									where X is replaced with the level (1-9).
									N.B. These fields can only be a positive number,
									you can't pre-emptively add "-1",
									nor use any dynamic modifier like "Int" or "Prof".

	3. mod
		This can be any combination of numbers, mathematical operators,
		and three-letter ability score abbreviations for ability score modifiers,
		or 'Prof' for the proficiency bonus.

		USABLE	RESULT
		Str 	Strength modifier
		Dex 	Dexterity modifier
		Con 	Constitution modifier
		Int 	Intelligence modifier
		Wis 	Wisdom modifier
		Cha 	Charisma modifier
		HoS 	7th ability modifier, if used (Honour or Sanity)
		Prof	Proficiency bonus

		When used in a CreatureList object, you can add the lowercase letter "o"
		in front of any of these to reference the modifier of the main character.
		E.g. "oStr" is the Strength modifier of the main character, while just "Str" refers
		to the Strength modifier of the companion.
		Note that AddMod in a CreatureList object is not applied for wild shapes.

		Additionally, you can use min(1|2) and max(1|2), which work like Math.min(1,2)
		and Math.max(1,2).
		Note that the pipe character is used instead of a comma.
		
		You can use brackets for complex calculations, but you can't use brackets within
		the brackets of the min() and max() operators.
		Everything seperated by a pipe symbol is calculated separately.
		For example "max(Cha+1|2)" will get the highest of "Charisma modifier + 1" and "2".

		Modifiers can only be integers (whole numbers, no decimals).
		Any resulting value that is not an integer will be rounded down (as per the rules,
		all values are rounded down in D&D 5e unless stated otherwise).

		For example, to add the proficiency bonus, Constitution modifier, and subtract 2, it would look like this:
			mod : "Prof+Con-2",
		Or, another example, to add 1, it would look like this:
			mod : 1,
		Or, another example, to add the Charisma modifier with a minimum of 1, it would look like this:
			mod : "max(Cha|1)",
		Or, another example, to add half the Charisma modifier rounded up with a minimum of 1, it would look like this:
			mod : "max(Cha+1|2)/2",
		Or, an example for the companion page, to add the Intelligence modifier of the main
		character with a maximum of 3, it would look like this:
			mod : "min(oInt|3)",

		When using this to add something to the Damage Die modifier field, it is also
		possible to use dice notation (e.g. "1d6"). [ADDED v13.0.8]
		Dice notation can't be combined with 'max' or 'min'.
		Normally this should only be used on the companion page as scaling damage die for
		the main character is better handled by adding a `calcChanges.atkAdd` attribute.

	4. text
		This is an explanation of why the modifier was added and is used in the
		modifier change dialog, which appears when clicking the modifier field.

	NOTE: for modifiers to attacks, use calcChanges.atkCalc
	NOTE: for modifiers to AC, use extraAC
	NOTE: for modifiers to spell save DCs, use calcChanges.spellCalc
*/

extraAC : [{
/*	extraAC // OPTIONAL //
	TYPE:	array of objects (variable length) or just a single object
	USE:	add modifier and description to AC magic/misc fields

	The 'mod' attribute has to be present in each object.
	All other attributes are optional.
	See below for an explanation of each attribute.
*/
	mod : 2,
	/*	mod // REQUIRED //
		TYPE:	string or number
		USE:	the modifier to add to the AC

		This can be any combination of numbers, mathematical operators,
		and three-letter ability score abbreviations for ability score modifiers,
		or 'Prof' for the proficiency bonus.

		This works the same as the `mod` attribute of the `addMod` entry above.
		Please look there for a more thorough explanation and examples.
	*/
	name : "Bracers of Defense",
	/*	name // OPTIONAL //
		TYPE:	string
		USE:	name how this modifier will be referred to

		If you do not include this attribute, the name will be taken from the parent object.
		If the parent object doesn't have a 'name' attribute, the name "Undefined" will be used.
	*/
	magic : true,
	/*	magic // OPTIONAL //
		TYPE:	boolean
		USE:	set this to true if this should be added to the Magic line in the AC/Defense section

		Setting this attribute to false is the same as not including this attribute.
	*/
	text : "I gain a +2 bonus to AC while I'm not wearing any armor or using a shield.",
	/*	text // OPTIONAL //
		TYPE:	string
		USE:	the explanation of what is added to the AC and its criteria (if any)

		If you do not include this attribute, there will be no explanation visible for this entry
		in the modifiers dialog that appears when clicking on the modifier field.
	*/
	stopeval : function (v) {
		return v.wearingArmor;
	}
	/*	stopeval // OPTIONAL //
		TYPE:	function
		USE:	return 'true' if the modifier is NOT to be added

		With this function you can dynamically determine if the modifier should be added or not,
		by testing against certain criteria.

		The function is fed one variable, an object with attributes you can use:
		var v = {
			theArmor,		// the ArmourList object, if the current armour is recognized
			usingShield,	// boolean, if the shield field has any text in it (true) or not (false)
			wearingArmor,	// boolean, if the current armour is light/medium/heavy (true) or not (false)
							// 'wearingArmor' is false for unarmoured, unarmoured defense, natural armor, and spells (e.g. Mage Armor)
			mediumArmor,	// if the 'Medium Armor' checkbox is checked (true) or not (false)
			heavyArmor,		// if the 'Heavy Armor' checkbox is checked (true) or not (false)
			shieldProf,		// if the 'Shield' proficiency checkbox is checked (true) or not (false)
			lightProf,		// if the 'Light' armour proficiency checkbox is checked (true) or not (false)
			mediumProf,		// if the 'Medium' armour proficiency checkbox is checked (true) or not (false)
			heavyProf		// if the 'Heavy' armour proficiency checkbox is checked (true) or not (false)
		}

		The above example returns true when the character is wearing armour,
		and if so the sheet will not add the modifier to the total AC.
	*/
}],

bonusClassExtrachoices : [{
/*	bonusClassExtrachoices // OPTIONAL //
	TYPE:	array of objects (variable length) or just a single object
	USE:	increase allowed number of extrachoices for another class feature
	ADDED:	v13.0.6

	Use this if you want to give access to something that is normally part of a class feature's extrachoices.
	For example, you can grant an extra selection of the Warlock's Eldritch Invocation.

	If the class feature is eligable (i.e. the character has the class in question and is high enough level),
	the number you enter in the `bonus` attribute will be added to the total allowed that is displayed
	in the Choose Feature menu on the 2nd page.
	If the class feature is not eligable (i.e. the character does not have the class or is too low level),
	the extrachoices will be displayed separately in the Choose Feature menu on the 2nd page and the player
	can select them.

	The `class`, `feature`, and `bonus` attributes have to be present in each object, the rest is optional.
	See below for an explanation of each attribute.
*/
	'class' : "warlock",
	/*	class // REQUIRED //
		TYPE:	string
		USE:	the ClassList object name of the class the feature belong to
		ADDED:	v13.0.6

		For the published classes, their object name is the same as their name, but all lowercase.
		I.e. "artificer", "barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin",
		"ranger", "sorcerer", "warlock", and "wizard".
		
		If the feature belongs to a subclass, make sure this is the class the subclass belongs to.
	*/
	subclass : "warlock-the fiend",
	/*	subclass // OPTIONAL //
		TYPE:	string
		USE:	the ClassSubList object name of the subclass the feature belong to
		ADDED:	v13.0.6

		Only include this attribute if the feature with the extrachoices belong to a subclass.

		The object name for subclasses varies greatly.
		If you are adding a subclass using the `AddSubClass()` function, be aware that
		the class name is added before the subclass object name with a hyphen.
		E.g. `AddSubClass("druid", "circle of purple", {});` will result in
		the object name "druid-circle of purple".
		Note that these object names are always lowercase.
		
		Setting this attribute to an empty string ("") is the same as not including it.
	*/
	feature : "eldritch invocations",
	/*	feature // REQUIRED //
		TYPE:	string
		USE:	the object name listed in the `features` attribute of the ClaasList or ClassSubList object
		ADDED:	v13.0.6

		For a feature in a subclass, the feature object names always start with "subclassfeature",
		generally followed by their level (e.g. "subclassfeature3").
		Note that these object names are always lowercase.

		If the feature you list here doesn't have the `extrachoices` attribute, this whole object
		will be ignored.
	*/
	bonus : 2
	/*	bonus // REQUIRED //
		TYPE:	number
		USE:	positive number (minimum of 1) with the amount of extrachoices to add
		ADDED:	v13.0.6

		This determines how many (more) of the extrachoices will be displayed in the Choose Feature menu.

		Setting this to zero or a negative number will result in the whole object being ignored.
	*/
}],


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Fields on Other Pages >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

toNotesPage : [{
/*	toNotesPage // OPTIONAL //
	TYPE:	array of objects (or just a single object)
	USE:	adds entries to the Notes section on either the 3rd page or a separate Notes page

	Each object in the array must have two attributes, the 'name' and 'note' attributes.
	All other attributes for these objects are optional.
	Each attribute is described separately below.

	If adding something to a notes page, things will not be added to existing text, but
	the automation will always select a completely empty field on a Notes page or will
	add a new empty Notes page if no empty fields were found.
	Alternatively, you can have this entry be added to the 3rd page's Notes section using the 'page3notes' attribute, see below.
*/
	name : "Wild Magic Surge Table",
	/*	name // REQUIRED //
		TYPE:	string
		USE:	the name of the feature to add to the notes section

		This string will be preceded by a diamond-shaped bullet.

		If no 'popupName' attribute is present, see below,
		the name will also be used for the informational "changes" pop-up dialog.
		For this pop-up dialog, the name of the parent object will be added to this name,
		so that it will read, in this example:
			Wild Magic Surge Table from "Wild Mage"
	*/
	note : "\n   Various strange things can happen whenever I cast a spell.",
	note : [
		"d10  Effect",
		"01-02 Roll on this table at the start of each of your turns for the next minute, ignoring this result on subsequent rolls.",
		"03-04 For the next minute, you can see any invisible creature if you have line of sight to it.",
		"05-06 A modron chosen and controlled by the DM appears in an unoccupied space within 5 ft of you, then disappears 1 minute later.",
		"07-08 You cast fireball as a 3rd-level spell centered on yourself.",
		"09-10 You cast magic missile as a 5th-level spell."
	],
	/*	note // REQUIRED //
		TYPE:	string or array
		USE:	the text of the feature to add to the notes section

		The string will be put on the notes section exactly as presented here, after the 'name' attribute.
		If you are writing this as a string, it is recommended to start with a line break (\r or \n).

		If this attribute is an array, it will be joined using the desc() function, meaning that
		each entry in the array will be on its own line, preceded by three spaces.
	*/
	page3notes : true,
	/*	page3notes // OPTIONAL //
		TYPE:	boolean
		USE:	whether to add this to the 3rd page's Notes section (true) or on a Notes page (false)

		Setting this to 0 or false is the same as not including this attribute.
	*/
	popupName : "Wild Mage's Wild Magic Surge Table, part 1",
	/*	popupName // OPTIONAL //
		TYPE:	string
		USE:	the text used in the informational "changes" pop-up dialog to show the player what and on what page the text was added

		If this attribute is not present, the 'name' attribute plus the name of the parent
		will also be used for the informational "changes" pop-up dialog.
	*/
	source : ["P", 104],
	/*	source // OPTIONAL //
		TYPE:	array with two entries (or array of these arrays)
		USE:	define where the feature is found

		This feature is used to generate the first line of the text, together with the 'name' attribute.
		If this feature is not present, the 'source' attribute of the parent object will be used (the parent to the 'toNotesPage' attribute).

		This array has two entries, a string followed by a number
		1. string
			The first entry has to be the object name of a SourceList object.
		2. number
			The second entry is the page number to find the magic item at.
			This can be any number and is ignored if it is a 0.

		See the "source (SourceList).js" file for learning how to add a custom source.

		Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
		The example above says something appears on both page 7 of the Elemental Evil Player's Companion and
		on page 115 of the Sword Coast Adventure Guide.

		If a magic item is completely homebrew, or you don't want to make a custom source, just put the following:
			source : ["HB", 0],
		"HB" refers to the 'homebrew' source.
	*/
	additional : "results 01-50",
	/*	additional // OPTIONAL //
		TYPE:	string
		USE:	this string is amended to the first line of the feature text

		This will be added, in square brackets, to the first line of text.
		In this example the first line would be: "Wild Magic Surge Table (Wild Magic 1, PHB 104) [results 01-50]"
	*/
	amendTo : "Wild Magic Surge Table",
	/*	amendTo // OPTIONAL //
		TYPE:	string
		USE:	if this string is found on any Notes page, than this note is added to the found note section

		There will be an empty line between this note and the one it is amended to.

		Use this to add a note to a previously added note.
		Make sure that the string given in this attribute is not too common,
		or it will match with the wrong notes section.

		The string will be matched on a case-insensitive basis.
	*/
}],


magicitemsAdd : [ "Hat of Disguise", ["Staff of Power", true] ],
/*	magicitemsAdd // OPTIONAL //
	TYPE:	array (variable length) of strings or arrays (with a string and a boolean)
	USE:	adds each entry in the array to one of the magic item drop-downs
	ADDED:	v13.0.6

	Each entry in the array is to add a single magic item. Each entry must consist of either:
	1) String with the name of the magic item
		Use this option if you want to add the magic item anywhere in the magic item section.

	2) Array with two entries
		2.1) String with the name of the magic item
		2.2) Boolean whether to force to the overflow page (true) or not (false)
				Setting this boolean to false is the same as using option 1).

	Use option 2) if you want to add the magic item to the overflow page.
	The magic item section on the overflow page contains more space for descriptions.

	An entry will only be added if there is space left in the magic items section and the magic item isn't already present.

	The strings will be added exactly as you write them here, capitalisation and all.

	If a feature with this attribute is removed, these magic items will be removed as well.
*/

// >>>>>>>>>>>>>>>>>>>>>>> //
// >>> Run Custom Code >>> //
// >>>>>>>>>>>>>>>>>>>>>>> //

eval : "Checkbox('Jack of All Trades', true);",
eval : function(lvl, chc) {
	AddString('Extra.Notes', 'Monk features:\n\u25C6 Lose Unarmored Defense, Martial Arts, and Unarmored Movement with armor/shields', true);
},
/*	eval // OPTIONAL //
	TYPE:	function or, for backwards-compatibility, string that is evaluated using eval()
	USE:	runs a piece of code when the feature is added

	Both examples do the exact same thing, just one is a string and the other is a function.
	Writing a function is better as it is easier to avoid syntax errors and will run faster.
	The string option is there for backwards-compatibility and this explanation assumes you are writing a function.

	The function is passed two variables:
	1) The first variable is an array containing the level up/down information
		var lvl = [
			"oldLvl",	// number; will be 0 when adding something for the first time
			"newLvl"	// number; will be 0 when removing something completely
		]
		oldLvl and newLvl will not be 0 when adding/removing a class feature, then
		it will be the previous/new level for that class.
	2) The second variable is an array containing the name of the old/new choice (if any)
		var chc = [
			"oldChoice", // string; the previous (extra)choice object name when removing the
			                feature or switching to another (extra)choice
			"newChoice", // string; the new (extra)choice object name when adding the
			                feature or switching to another (extra)choice
			"choiceAct"  // string; what type of change this is:
			                "change" if switching choice,
							"only" if adding an extrachoice, or
							"" otherwise
		]


	This can be any JavaScript you want to have run whenever the feature is added.
	This attribute is processed first, before all other attributes are processed.
*/

removeeval : "Checkbox('Jack of All Trades', false);",
removeeval : function(lvl, chc) {
	RemoveString('Extra.Notes', 'Monk features:\n\u25C6 Lose Unarmored Defense, Martial Arts, and Unarmored Movement with armor/shields', true);
},
/*	removeeval // OPTIONAL //
	TYPE:	function or, for backwards-compatibility, string that is evaluated using eval()
	USE:	runs a piece of code when the feature is removed

	Both examples do the exact same thing, just one is a string and the other is a function.
	Writing a function is better as it is easier to avoid syntax errors and will run faster.
	The string option is there for backwards-compatibility and this explanation assumes you are writing a function.

	The function is passed two variables:
	1) The first variable is an array containing the level up/down information
		var lvl = [
			"oldLvl",	// number; will be 0 when adding something for the first time
			"newLvl"	// number; will be 0 when removing something completely
		]
		oldLvl and newLvl will not be 0 when adding/removing a class feature, then
		it will be the previous/new level for that class.
	2) The second variable is an array containing the name of the old/new choice (if any)
		var chc = [
			"oldChoice", // string; the previous (extra)choice object name when removing the
			                feature or switching to another (extra)choice
			"newChoice", // string; the new (extra)choice object name when adding the
			                feature or switching to another (extra)choice
			"choiceAct"  // string; what type of change this is:
			                "change" if switching choice,
							"only" if adding an extrachoice, or
							"" otherwise
		]


	This can be any JavaScript you want to have run whenever the feature is removed.
	This attribute is processed first, before all other attributes are processed.
*/

changeeval : "var monkSpd = function(n) {return '+' + (n < 2 ? 0 : n < 6 ? 10 : n < 10 ? 15 : n < 14 ? 20 : n < 18 ? 25 : 30);}(classes.known.monk.level); SetProf('speed', monkSpd !== '+0', {allModes : monkSpd}, displName);",
changeeval : function(lvl, chc) {
	var monkSpd = '+' + (lvl[1] < 2 ? 0 : lvl[1] < 6 ? 10 : lvl[1] < 10 ? 15 : lvl[1] < 14 ? 20 : lvl[1] < 18 ? 25 : 30);
	SetProf('speed', monkSpd !== '+0', {allModes : monkSpd}, "Monk: Unarmored Movement");
},
/*	changeeval // OPTIONAL //
	TYPE:	function or, for backwards-compatibility, string that is evaluated using eval()
	USE:	runs a piece of code every time the character's level changes

	Both examples do the exact same thing, just one is a string and the other is a function.
	Writing a function is better as it is easier to avoid syntax errors and will run faster.
	The string option is there for backwards-compatibility and this explanation assumes you are writing a function.

	The function is passed two variables:
	1) The first variable is an array containing the level up/down information
		var lvl = [
			"oldLvl",	// number; will be 0 when adding something for the first time
			"newLvl"	// number; will be 0 when removing something completely
		]
		oldLvl and newLvl will not be 0 when adding/removing a class feature, then
		it will be the previous/new level for that class.
	2) The second variable is an array containing the name of the old/new choice (if any)
		var chc = [
			"oldChoice", // string; the previous (extra)choice object name when removing the
			                feature or switching to another (extra)choice
			"newChoice", // string; the new (extra)choice object name when adding the
			                feature or switching to another (extra)choice
			"choiceAct"  // string; what type of change this is:
			                "change" if switching choice,
							"only" if adding an extrachoice, or
							"" otherwise
		]


	This can be any JavaScript you want to have run whenever the level changes.
	This attribute is processed last, after all other attributes have been processed.
*/

} // you can ignore this, it is just here to make this file valid JavaScript
