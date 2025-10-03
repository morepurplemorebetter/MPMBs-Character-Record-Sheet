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
				can thus include things like attack cantrips.

	Remarks:	This syntax is also used for objects in the 'weaponOptions' attribute found in '_common attributes.js'.
				For the 'weaponOptions', you can disregard the object name and WeaponsList variable.
				Note that if you want a class feature, race, racial trait, feat, background, or magic item to
				add a weapon/attack, you should be using the 'weaponOptions' attribute.

	Sheet:		v14.0.0 and newer
*/

var iFileName = "Homebrew Syntax - WeaponsList.js";
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

RequiredSheetVersion("13.2.0");
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

WeaponsList["purple sword"] = {
/* 	WeaponsList object name // REQUIRED //
	TYPE:	string
	USE:	object name of the weapon as it will be used by the sheet

	By adding a new object to the existing WeaponsList object, we create a new weapon/attack.
	The object name here is 'purple sword'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
*/
	name : "Purple Sword",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the weapon as it will be used by the sheet

	This name will be capitalized (first letter of every word) before
	being added to the weapon drop-down.
*/
	nameAlt : ["Sword, Purple", "More Purple More Sword"],
/*	nameAlt // OPTIONAL //
	TYPE:	array of strings
	USE:	extra names to be listed in the drop-down box
	ADDED:	v13.2.0

	This list of names is added at the end of the options in the attack drop-down boxes.
	They will be capitalized (first letter of every word) before being added.

	Make sure that the `regExpSearch` also matches each and every entry in this list.
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
	defaultExcluded : true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this weapon/attack should be excluded by default (true) or included by default (false)

	Include this attribute and set it to true if the weapon/attack should appear in the Excluded list of the
	Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.

	This is useful for optional weapons/attacks that you wouldn't normally want to use (e.g. playtest or campaign-specific).

	Setting this attribute to false is the same as not including this attribute.
*/
	regExpSearch : /^(?=.*sword)(?=.*purple).*$/i,
/*	regExpSearch // REQUIRED //
	TYPE:	regular expression
	USE:	used to match the text in the weapon field to see if this weapon is present

	This has to be a match for the name given earlier, or the weapon will never be recognized.
	Now it looks for any entry that has both the words "sword" and "purple" in it,
	disregarding capitalization or word order.
	If this looks too complicated, or you want to match only a single word, or a fixed order of words, just write it like this:
		regExpSearch : /purple sword/i,
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

	If the attack is a spell/cantrip, but it functions like a weapon attack (for fighting styles for example),
	then you will want to set this to "Simple" or "Martial", while also
	setting the `list` or `SpellsList` attributes to that of a spell/cantrip.
	That way, the attack is seen as both a spell and a weapon by other automation.
*/
	ability : 1,
/*	ability // REQUIRED //
	TYPE:	number corresponding to the ability score (1 = Str, 2 = Dex, 3 = Con, 4 = Int, 5 = Wis, 6 = Cha)
	USE:	set the ability score used for weapon/attack

	This ability score is used to determine the To Hit (or DC) and Damage of the weapon/attack.

	If the weapon has the finesse property, set the ability to 1.
	The sheet will automatically determine whether to use Strength or
	Dexterity based on the character's ability scores.

	Even with this attribute, the sheet will automatically use the spellcasting ability if:
		* The attribute `list` or `type` is set to "Cantrip" or "Spell", or
		* the object name of the weapon matches an entry in the `SpellsList` object, or
		* the attribute `SpellsList` is set and matches a `SpellsList` entry.
	It will look for the highest spellcasting ability score from the character's spellcasting classes,
	but considering the following:
		1. If this spell is known by any of the character's classes, it will only consider those classes.
		2. If this spell is not known by any of the character's classes, it will consider all its spellcasting classes.
		3. If the character has no spellcasting classes, it will use the attribute given here.
	You can change this behaviour with the `useSpellcastingAbility` attribute, see below.

	Setting this to 0 will cause the To Hit and Damage to be calculated without any ability score modifier.

	Setting this to false is the same as not including this attribute and
	will cause the weapon to not have any To Hit or Damage calculated.
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
		You can also use the letter 'C', 'B', or 'Q' (capitalized!) for the cantrip die.
		The 'C' is replaced with the cantrip die for the current level (e.g. 3 at level 11-16).
		The 'B' is replaced with one less than the cantrip die for the current level (e.g. 2 at level 11-16).
		The 'Q' is replaced with one more than the cantrip die for the current level (e.g. 4 at level 11-16).
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
	Thus, be sure to include all the weapon's properties here, like 'heavy', 'light', and 'two-handed'.

	One exception, you don't have to include the 'special' property, but can instead include an
	explanation of what that special property is.
	If you decide to do so, than don't forget to set the `special` attribute but true (see below).
*/
	tooltip : "Special: I have disadvantage when I use a lance to attack a target within 5 feet. Also, a lance requires two hands to wield when I'm not mounted.",
/*	tooltip // OPTIONAL //
	TYPE:	string
	USE:	this will be added as a tooltip to the Description field for the attack

	This string is put as a tooltip literally, without any changes.
	The sheet will never use the tooltip for determining functionality of the weapon.
	The tooltip is only available when the sheet is used in Adobe Acrobat,
	it won't show up on a printed version of the sheet (also not when printed to PDF).
*/
	special : true,
/*	special // OPTIONAL //
	TYPE:	boolean
	USE:	whether (true) or not (false) this weapon has the 'special' property
	ADDED:	v13.0.6

	This attribute has no direct affect on a weapon entry, but it can be used by other
	features that have specific rules for weapons with the 'special' property.
	For example, a Kensei Weapon (XGtE 34) can't have the 'special' property.

	Setting this to false is the same as not including this attribute.
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
		"firearm"   // firearms

	If you use any other string than the five options given above,
	the weapon will appear below these five lists.

	If you don't include this attribute, the weapon will not be added as an option
	in the drop-down box, but will still function when typed in manually.

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
		For backwards compatibility, if this starts with "dc", the To Hit will be calculated as a DC.
		However, it is recommended to set the `dc` attribute to `true` if you want this to be a DC.
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
	isNotWeapon : true,
/*	isNotWeapon // OPTIONAL //
	TYPE:	boolean
	USE:	whether (false) or not (true) this attack is counted as a weapon
	ADDED:	v13.1.8

	Normally, the sheet sees everything as a weapon, except those with a `type` attribute
	that includes either the words "spell" or "cantrip", which are set to be a spell.
	Something that is a weapon is automatically either a ranged or a melee weapon.
	Something can be both a spell and a weapon (by using the `SpellsList` attribute below and
	setting the `type` attribute to something else then "Spell" or "Cantrip").

	If this attribute is set to `true`, the sheet will make sure the attack is not considered
	a weapon.
	In doing so, the attack can still be considered a spell.
	The attack can also be considered neither a spell nor a weapon.
	This is used, for example, for the attacks made with adventuring gear:
	  - Alchemist Fire
	  - Vials of Acid
	  - Holy Water
	  - Burning Torch

	This attribute only has an effect for attack calculations and features adding text to an
	attack's description. For example, Sneak Attack requires the attack to be made with a
	ranged weapon.

	See also the `calcChanges` attribute in "_common attributes.js", and specifically the
	atkAdd and atkCalc sub-attributes.

	Setting this to false is the same as not including this attribute.
*/
	isAlwaysProf : true,
/*	isAlwaysProf // OPTIONAL //
	TYPE:	boolean
	USE:	whether (true) or not (false) the proficiency bonus should always be added for this weapon
	CHANGE: v13.2.0 (`false` is now a valid value)

	This attribute forces the proficiency checkbox to be on (true) or off (false)
	when a weapon is selected.
	Add this for weapons where the normal way of determining proficiency would not produce the correct result.

	Without this attribute, the sheet will automatically determine if the character is
	proficient with the weapon. The sheet automatically marks something as proficient if:
		* The `type` attribute is "Spell", "Cantrip" or "Natural".
		* The `type` attribute is "Simple" or "Martial" and the relevant proficiency
		  checkbox is checked on the sheet.
		* The box for other weapon proficiencies matches of the weapon: the object name or 
		  the `type`, `list`, `baseWeapon`, or `nameAlt` attribute.

	TRUE
	When set to `true`, the sheet will always check the Proficiency checkbox when this weapon is selected.

	FALSE
	When set to `false`, the sheet will never check the Proficiency checkbox when this weapon is selected.

	UNDEFINED
	Do not include this attribute if you want the sheet to determine proficiency itself.

	The checkbox can still be changed manually or with features using `calcChanges.atkAdd`.
	
	For example, if you set 'type' above to 'Cantrip', setting this to 'true' will have no extra effect.
	But setting it to 'false' will force the weapon not to add proficiency to its to hit / DC.
	Another example, if you set 'type' above to 'Simple', setting this to 'true' will add
	proficiency even if the character is not proficient with simple weapons.

	Setting this to false is NOT the same as not including this attribute!
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
	useSpellcastingAbility : true,
/*	useSpellcastingAbility // OPTIONAL //
	TYPE:	boolean
	USE:	force the use of the spellcasting ability for the weapon

	Without this attribute, the sheet will automatically use the spellcasting ability if:
		* The attribute `list` or `type` is set to "Cantrip" or "Spell", or
		* the object name of the weapon matches an entry in the `SpellsList` object, or
		* the attribute `SpellsList` is set and matches a `SpellsList` entry.

	Which spellcasting ability it selects is explained in the `ability` attribute above for more details.

	TRUE
	When set to `true`, the sheet will always apply the spellcasting ability,
	even if the prerequisites are not met.

	FALSE
	When set to `false`, the sheet will never apply the spellcasting ability,
	even if the prerequisites are met. It will instead always use the ability set by the `ability` attribute.
	It will still apply weapon special rules like 'Finesse'.
	The sheet will also not apply any bonuses from calcChanges.spellCalc that increase
	spell attacks or spell DCs to the attack.

	UNDEFINED
	Do not include this attribute if you want the sheet to determine if the spellcasting ability should be used or not.

	Setting this to false is NOT the same as not including this attribute!
*/
	useSpellMod : ["wizard", "cleric"],
	useSpellMod : "wizard",
/*	useSpellMod // OPTIONAL //
	TYPE:	string
	USE:	the object name of a spellcasting object that this attack will use the spell attack/DC from
	ADDED:	v13.0.6
	CHANGE:	v14.0.0 (can now be an array of strings)

	If the attack you are adding used the spell attack (or DC) of a fixed spellcasting entity
	(class, race, feat, or magic item), then you can use this attribute.
	This will most likely be used as part of a `weaponOptions` or `creatureOptions` attribute,
	when a feature adds an attack option, or creature option with attacks linked to the original feature.
	For example, if a magic item grants an attack that uses the `fixedDC` of that magic item,
	or a class feature grants a companion option that uses the spell attack of the class.

	If this is an array, the sheet will pick the ability that results in the highest value.
	This works bests when the spell sheet has been generated, otherwise the sheet won't look
	at bonuses other than the ability modifier (e.g. no bonus from `calcChanges.spellCalc`).

	Make sure that the string is an object name for a spellcasting object.
	Spellcasting objects are created when something has spells that are displayed on the spell sheet pages.
	The spellcasting object names are identical to the originating object names.
	For example, for a spellcasting class, this object name is their ClassList object name
	(e.g. 'bard', 'cleric', 'druid', 'sorcerer', 'warlock', 'wizard'),
	and for a Magic Item this is identical to the MagicItemsList object name.

	If there is no corresponding spellcasting object, this attribute will be ignored.

	By setting this attribute, the sheet will force the use of the spell attack
	(or DC if the `dc` attribute is set to true) of the corresponding spellcasting entity,
	regardless of the setting of the proficiency or ability score fields in the attack section.
	In fact, it will force the selected ability to be the ability used by the spellcasting entity.

	Be aware, that if you use this for a CreatureList object, the spell attack / DC used will
	still be that of the main character.
	This attribute is ignored on the Wild Shape pages.

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
	selectNow : true,
/*	selectNow // OPTIONAL //
	TYPE:	boolean
	USE:	whether (true) or not (false) this weapon should immediately be selected
	ADDED:	v13.1.14

	This attribute only has an effect on weapons added through the `weaponOptions` common attribute 
	(see '_common attributes.js').

	By setting this attribute to `true`, it is no longer necessary to include the
	`weaponsAdd` attribute as well.

	This attribute has no effect outside of `weaponOptions`.
	For armour added directly in the WeaponsList, this attribute will be ignored.

	Setting this to false is the same as not including this attribute.
*/
}
