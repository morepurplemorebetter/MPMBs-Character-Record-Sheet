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

	Subject:	Weapon (including natural attacks, attack cantrips, etc.)

	Effect:		This is the syntax for adding a new weapon to the sheet.
				This is used in the Attack section of the sheet, and
				can thus include things like attack cantrips and the like.

	Remarks:	This syntax is also used for objects in the 'weaponOptions' attribute found in '_common attributes.js'.
				For the 'weaponOptions', you can disregard the object name and WeaponsList variable.
				Note that if you want a class feature, race, racial trait, feat, background, or magic item to add a weapon/attack,
				you should be using the 'weaponOptions' attribute.

	Sheet:		v13.0.0 (2019-??-??)

*/

var iFileName = "Homebrew Syntax - WeaponsList.js";
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

WeaponsList["sword of purple"] = {
/* 	WeaponsList object name // REQUIRED //
	TYPE:	string
	USE:	object name of the weapon as it will be used by the sheet

	By adding a new object to the existing WeaponsList object, we create a new weapon/attack.
	The object name here is 'sword of purple'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
*/
	name : "Sword of Purple",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the weapon as it will be used by the sheet

	This name will be capitalized (first letter of every word) before being added to the weapon drop-down.
*/
	source : ["SRD", 204],
	source : [["E", 7], ["S", 115]],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the weapon is found

	This attribute is used by the sheet to determine if the weapon should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the weapon at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 7 of the Elemental Evil Player's Companion and
	on page 115 of the Sword Coast Adventure Guide.

	If a weapon is completely homebrew, or you don't want to make a custom source, just put the following:
		source : ["HB", 0],
	"HB" refers to the 'homebrew' source.
*/
	regExpSearch : /^(?=.*sword)(?=.*purple).*$/i,
/*	regExpSearch // REQUIRED //
	TYPE:	regular expression
	USE:	used to match the text in the weapon field to see if this weapon is present

	This has to be a match for the name given earlier, or the weapon will never by recognized.
	Now it looks for any entry that has both the words "sword" and "purple" in it,
	disregarding capitalization or word order.
	If this looks too complicated, or you want to match only a single word, or a fixed order of words, just write it like this:
		regExpSearch : /sword of purple/i,
*/
	type : "Martial",
/*	type // REQUIRED //
	TYPE:	string
	USE:	type of the weapon

	The type of the weapon will be used to determine if the character is proficient with the weapon and
	if the weapon's proficiency box should be checked for it.

	There are several pre-defined types that exist by default in the sheet:
		"AlwaysProf"		// none of the other types apply, always proficient
		"Natural"			// natural weapons (always proficient)
		"Simple"			// simple weapons
		"Martial"			// martial weapons
		"Cantrip"			// cantrips (always proficient)
		"Spell"				// 1st-level and higher spells (always proficient)
		"Improvised Weapons"// improvised weapons such as vial of acid

	Alternatively, you can define a type yourself.
	If this type matches a word in the 'Other Weapon Proficiencies' field,
	the character will be considered proficient with the weapon.
	But if this type doesn't match anything, proficiency will not be applied.
*/
	ability : 1,
/*	ability // REQUIRED //
	TYPE:	number corresponding to the ability score (1 = Str, 2 = Dex, 3 = Con, 4 = Int, 5 = Wis, 6 = Cha)
	USE:	set the ability score used for weapon/attack

	This ability score is used to determine the To Hit (or DC) and Damage of the weapon/attack.

	If the weapon has the finesse property, set the ability to 1.
	The sheet will automatically determine whether to use Strength or
	Dexterity based on the character's ability scores.

	Setting this to 0 or false is the same as not including this attribute and
	will cause the weapon to not have a To Hit and Damage calculated.
*/
	abilitytodamage : true,
/*	abilitytodamage // REQUIRED //
	TYPE:	boolean
	USE:	whether (true) or not (false) to add the ability score modifier to the damage

	When set to 'true', the ability score modifier set with the 'ability' attribute
	is added to the calculated damage of the weapon/attack.
	This will happen even if the ability score modifier is negative.
*/
	damage : [2, 4, "piercing"],
/*	damage // REQUIRED //
	TYPE:	array with 3 entries
	USE:	determine the damage die and type of the damage

	This array has three entries:
	1. string or number
		The first entry is the amount of damage die.
		For example, for 2d6 damage, this first entry would be '2'.
		Another example, for 1d8 damage, this first entry would be '1'.
		You can also use the letter 'C' or 'B' (capitalized!) for the cantrip die.
		The 'C' is replaced with the cantrip die for the current level (e.g. 3 at level 11-16).
		The 'B' is replaced with only less than the cantrip die for the current level (e.g. 2 at level 11-16).
	2. number
		The second entry is the type of die.
		For example for 2d6 damage, this second entry would be '6'.
		This can be any number and is ignored if it is a 0.
		If the damage is not a die, but just a fixed number, make this second entry an empty string ("").
		For example for 1 bludgeoning damage, the whole array would look like:
			[1, "", "bludgeoning"]
	3. string
		The third entry is the type of damage that is dealt.
		This can be anything, but most often it is one of the damage types:
			"acid", "bludgeoning", "cold", "fire", "force", "lightning", "necrotic",
			"piercing", "poison", "psychic", "radiant", "slashing", and "thunder"
		If you don't use one of these, the string is put in the Damage Type field exactly as you put it here, including capitalization.

	The example above is for 2d4 piercing damage.
*/
	range : "Melee, 20/60 ft",
/*	range // REQUIRED //
	TYPE:	string
	USE:	the text as it will be put in the Range field for the attack

	This string is put on the sheet literally.
	For short- and long ranges, use the notation [short]/[long] [unit].
	The units should be in the imperial system and they will be
	automatically converted to the metric system by the sheet if set to do so.

	For melee range, just use "Melee".
*/
	description : "Finesse, light",
/*	description // REQUIRED //
	TYPE:	string
	USE:	the text as it will be put in the Description field for the attack

	This string is put on the sheet literally.
	The sheet will look in the description for attributes such as 'finesse' to
	determine the ability score to use.
*/
	list : "melee",
/*	type // OPTIONAL //
	TYPE:	string
	USE:	determines the sorting of the weapon in the drop-down field

	This attribute can have any value you want.
	Any weapon with the same 'list' attribute will be grouped together.
	There are several pre-defined lists that exist by default in the sheet:
		"melee"		// melee weapons
		"ranged"	// ranged weapons
		"spell"		// cantrips and spells
		"improvised"// improvised weapons such as vial of acid

	If you use any other string than the four options given above,
	the weapon will appear at the end of the drop-down options.

	Setting this to and empty string ("") is the same as not including this attribute.

	>> NOTE WHEN USING weaponOptions <<
	The 'list' attribute is ignored for WeaponsList objects used in the 'weaponOptions' attribute.
	Instead, all things added using the 'weaponOptions' attribute will always be added at the top of the drop-down field.
*/
	weight : 24,
/*	weight // OPTIONAL //
	TYPE:	number
	USE:	the weight of the weapon in lb

	If the weapon doesn't have a listed weight, you can just leave this attribute out.
	Setting this to 0 is the same as not including this attribute.
*/
	dc : true,
/*	dc // OPTIONAL //
	TYPE:	boolean
	USE:	whether (true) or not (false) this weapon uses a DC instead of a To Hit

	If this attribute is set to 'true', the To Hit field will display a DC.
	That DC is calculated by adding 8 to the ability score modifier and the proficiency bonus (if the character is proficient with the weapon).

	Note that the To Hit field will not display what kind of saving throw/check the weapon requires.
	You will have to add that information in the 'description' attribute.

	Setting this to false is the same as not including this attribute.
*/
	modifiers : [1, ""],
/*	modifiers // OPTIONAL //
	TYPE:	array with 2 entries
	USE:	add something to the weapon's modifier fields

	This array has two entries:
	1. string or number
		The first entry is what to put in the To Hit modifier field.
		If this starts with "dc", the To Hit will be calculated as a DC.
	2. string or number
		The second entry is what to put in the Damage modifier field.

	These modifier fields are added to the calculated values of To Hit/Damage.
	By default, these modifier fields are hidden on the sheet.
	Their visibility can be toggled with the "Modifiers" bookmark.

	Both entries in the array can have the same kind of value.
	This can be any combination of numbers, mathematical operators,
	and three-letter ability score abbreviations for ability score modifiers,
	or 'Prof' for the proficiency bonus.

	For example, to add the proficiency bonus, Constitution modifier, and subtract 2, it would look like this:
		"Prof+Con-2"
	Or, another example, to add 1, it would look like this:
		1

	Setting both entries of the array to either 0 or an empty string ("") is the same as not including this attribute.
*/
	monkweapon : true,
/*	monkweapon // OPTIONAL //
	TYPE:	boolean
	USE:	whether (true) or not (false) this weapon is a monk weapon and should use the Martial Arts die

	This attribute only has an effect for a character with the monk class.

	Setting this to false is the same as not including this attribute.
*/
	isMagicWeapon : true,
/*	isMagicWeapon // OPTIONAL //
	TYPE:	boolean
	USE:	whether (true) or not (false) this weapon is a magical weapon

	This attribute only has an effect for attack calculations and magic item selection.
	Add this if you don't want class features and the like to add modifiers or write "Counts as magical" in the description of this attack.
	Also add this if you don't want this weapon to be an option for magical weapons to add their attributes to.
	Note that if you set the 'type' attribute to "Cantrip" or "Spell", it will already be treated as a magical attack.

	Weapons added by magic items using the 'weaponOptions' attribute will always have this attribute added and set to 'true'.

	Setting this to false is the same as not including this attribute.
*/
	isAlwaysProf : true,
/*	isAlwaysProf // OPTIONAL //
	TYPE:	boolean
	USE:	whether (true) or not (false) the proficiency bonus should always be added for this weapon

	This attribute only has an effect if the character would otherwise not be proficient with this weapon.
	Add this for weapons where the normal way of determining proficiency would not produce the correct result.
	For example, if you set 'type' above to 'Cantrip', setting this to 'true' will have no effect.
	Another example, if you set 'type' above to 'Simple', setting this to 'true' will add proficiency
	even if the character is not proficient with simple weapons (or has the weapon listed in 'other weapon proficiencies').

	Setting this to false is the same as not including this attribute.
*/
	ammo : "bolt",
/*	ammo // OPTIONAL //
	TYPE:	string
	USE:	the AmmoList object name of the ammunition that this attack uses

	If the attack you are adding is a weapon that uses ammunition,
	you can have the sheet automatically add it to the ammunition section when the weapon is added to the sheet.

	The options are: "arrow", "bolt", "bullet", "dagger", "dart", "flask", "axe", "javelin",
	"hammer", "needle", "spear", "trident", and "vial" [note the use of only lower case!].

	This list of options can be greater if you add another AmmoList object using the "ammunition (AmmoList).js" syntax file.

	Setting this to an empty string ("") is the same as not including this attribute.
*/
	SpellsList : "eldritch blast",
/*	SpellsList // OPTIONAL //
	TYPE:	string
	USE:	the SpellsList object name that this attack is linked to

	If the attack you are adding is a cantrip/spell and its object name is not identical to
	the object name of the cantrip/spell in the SpellsList, set the reference with this attribute.

	By setting this attribute, the sheet will be able to recognize which cantrips/spell this attack is for.
	As a result, it will be able to determine which ability score to use for it automatically from the character's spellcasting classes.

	Setting this to an empty string ("") is the same as not including this attribute.
*/
	baseWeapon : "longsword",
/*	baseWeapon // OPTIONAL //
	TYPE:	string
	USE:	the WeaponsList object name that this attack is based on

	By setting this attribute, the sheet will consider this attack entry to be the same as the one you link it to.
	Linking a weapon to another will have far-reaching consequences:
	1. attributes will be added
		All the attributes of the base weapon will be added to this weapon as well.
		Attributes in this WeaponsList object will take precedent over those from the base weapon.
		Because of that, you don't have to set all REQUIRED attributes, except for the
		'name', 'source', and 'regExpSearch' attributes.
		For example, if this attribute is 'longsword' and you don't include a 'type' attribute,
		the 'type' attribute will be "Martial" as that is the type set for WeaponsList["longsword"].
	2. other weapon proficiencies
		If the character is proficient with the linked base weapon because of a proficiency in the Other Weapon Proficiencies field,
		it will also be considered to be proficient with this weapon.
	3. weapon calculation scripts
		Class features and the like can affect how To Hit and Damage are calculated for weapons.
		By linking a weapon to a base weapon those scripts that would affect the base weapon will also affect this weapon.

	Setting this to an empty string ("") is the same as not including this attribute.
*/
}
