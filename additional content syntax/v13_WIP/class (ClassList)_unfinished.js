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

	Subject:	Class

	Effect:		This is the syntax for adding a new class to the sheet.

	Remarks:	You will also need the syntax for creating a feature if you want the class to have any level-dependent features.
				You will also need the syntax for common attributes if you want the level-dependent features to do anything more than have a description.
				You will also need the syntax for adding a subclass if you want the class to have any choices for subclasses.
				You will also need the syntax for adding a source if you want the class to have a source that doesn't yet exist in the sheet.

	Sheet:		v13.0.6 and newer

*/

var iFileName = "Homebrew Syntax - ClassList.js";
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

ClassList["purplemancer"] = {
/* 	ClassList object name // REQUIRED //
	TYPE:	string
	USE:	object name of the class as it will be used by the sheet

	By adding a new object to the existing ClassList object, we create a new class.
	The object name here is 'purplemancer'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
*/
	name : "Purplemancer",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the class as it will be used by the sheet
*/
	regExpSearch : /^(?=.*purple)(?=.*mancer).*$/i,
/*	regExpSearch // REQUIRED //
	TYPE:	regular expression
	USE:	used to match the text in the class field to see if this class is present

	This has to be a match for the name given earlier, or the class will never by recognized.
	Now it looks for any entry that has both the words "purple" and "mancer" in it,
	 disregarding capitalization or word order.
	If this looks too complicated, or you want to match only a single word, just write:
		regExpSearch : /purplemancer/i,
*/
	source : ["SRD", 30],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the class is found

	This attribute is used by the sheet to determine if the class should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the class at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	For example, if something appears on both page 7 of the Elemental Evil Player's Companion
	 and on page 115 of the Sword Coast Adventure Guide, use the following:
		source : [["E", 7], ["S", 115]],

	If a class is completely homebrew, or you don't want to make a custom source, just put the following:
		source : ["HB", 0],
	"HB" refers to the'homebrew' source.
*/
	defaultExcluded : true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this class should be excluded by default (true) or included by default (false)

	Include this attribute and set it to true if the class should appear in the Excluded list of the
	Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.

	Note that if a class is excluded, none of its subclasses will be accessible either.

	This is useful for optional classes that you wouldn't normally want to use (e.g. playtest or campaign-specific).

	Setting this attribute to false is the same as not including this attribute.
*/
	primaryAbility : "Strength or Dexterity",
/*	primaryAbility // REQUIRED //
	TYPE:	string
	USE:	abilities that are essential to the class to be displayed in the Ability Scores dialog

	If there are no essential abilities, just put an empty string:
		primaryAbility : "",
*/
	prereqs : "Strength 13 or Dexterity 13",
/*	prereqs // REQUIRED //
	TYPE:	string
	USE:	prerequisite abilities to multiclass in the class, to be displayed in the Ability Scores dialog when multiclassing

	If there are no prerequisite abilities, just put an empty string:
		prereqs : "",
*/
	die : 10,
/*	die // REQUIRED //
	TYPE:	number
	USE:	number of the type of hit die the class has (i.e. 10 means d10)

	You can't have multiple HD for a class (2d6 per level is not possible).
*/
	improvements : [0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7],
/*	improvements // REQUIRED //
	Array of the amount of ability score improvements the class has at each level.
	Normally this is an array of 20 entries, one for each level, but you can have more or less.
	Note that this is not cumulative, the number is the amount of ASI at that level.
	This example uses the Fighter's progression.
	If the class doesn't get any improvements, just put the following:
		improvements : [0],
*/
	saves : ["Str", "Con"],
/*	improvements // OPTIONAL //
	Array of the saving throw proficiencies the class gets, using the name of an ability.
	You have to include at least the first three-letters of an ability, and capitalization doesn't matter.
	Thus, an array entry can be "Str", "Dex", "Con", "Int", "Wis, or "Cha".
*/

// EVERYTHING BELOW THIS LINE IS NOT UPDATED TO v13 YET!

	skills : ["\n\n" + toUni("MyClass") + ": Choose two from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival.", "\n\n" + toUni("MyClass") + ": Choose one from Athletics, Intimidation, Perception, and Survival."], //required; the text to display for skill proficiencies. Note the \n\n at the start, they are important! The first entry is for when the class is the primary class, the second entry is for when the class is taken later as part of a multiclass

/* SYNTAX CHANGE v12.998 >> old syntax for 'tools' and 'languages' are no longer supported!! */
	toolProfs : { // optional; this is an object with arrays with the tool proficiencies gained. Each entry in an array can be its own array of 2 entries. The first entry is the name of the tool and the second entry is either 1) a number if the tool is yet to be chosen, or 2) the 3-letter ability score abbreviation if the tool is to be listed in the skill section and have a bonus calculated
		primary : [["Musical instrument", 3], ["Thieves' tools", "Dex"]], // optional; the tool proficiencies gained if the class is the primary class (i.e. taken at 1st level)
		secondary : [["Musical instrument", 1]] // optional; the tool proficiencies gained if the class is not the primary class (i.e. taken at a later level)
	},

	armor : [ //required; the 4 entries are for: ["light", "medium", "heavy", "shields"]
		[true, true, true, true], //required; the armor proficiencies if this is the first or only class
		[true, true, false, true] //required; the armor proficiencies if this class is multiclassed with (so not taken at level 1, but later)
	],

	weapons : [ //required; the 3 entries are for: ["simple", "martial", "other"]
		[true, false, ["hand crossbow", "longsword", "rapier", "shortsword"]], //required; the weapon proficiencies if this is the first or only class
		[true, false, ["hand crossbow"]] //required; the weapon proficiencies if this class is multiclassed with (so not taken at level 1, but later)
	],

	equipment : "MyClass starting equipment:\n \u2022 Chain mail -or- leather armor, a longbow, and 20 arrows;\n \u2022 A martial weapon and a shield -or- two martial weapons;\n \u2022 A light crossbow and 20 bolts -or- two handaxes;\n \u2022 A dungeoneer's pack -or- an explorer's pack.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.", //required; the text to display when citing the starting equipment

	subclasses : ["Martial Archetype", ["champion", "battle master", "eldritch knight", "purple dragon knight"]], //required; the names of the subclasses. The first entry is the overall name that is given to the subclasses, the second entry is a list of the subclass, using the exact names of the entry of the subclasses in the ClassSubList. //Note that if one of the entries in the array of subclasses doesn't exist in the ClassSubList, the sheet will throw an error as soon as you make a character with levels in this class
	//IMPORTANT: for any subclass you add using the AddSubClass() function, don't list them here! The AddSubClass() function makes its own entry in this array! If you have entries here that don't exist (because you didn't add any ClassSubList entry, or added it using the AddSubClass() function, then the sheet will throw strange errors)!

	prestigeClassPrereq : 5, //optional; if you include this attribute, the sheet will consider the class a prestige class // You can make this attribute a number, which represents the levels the character must have before being able to gain the prestige class. Alternatively, you can make this attribute a string, which can be evaluated with eval() and returns either true (prereqs met) or false (prereqs not met).

	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3], //required; the amount of attacks at each level. Note that there are 20 entries, one for each level.

	abilitySave : 4, //optional, but required for a spellcaster; the ability score to use for the Ability Saving Throws. Remove this line if your class has no Ability that requires Saving Throws. (Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6)

	abilitySaveAlt : 2,//optional; if the class offers a choice between two ability scores to be used to determine the DC, you can put that secondary one here (Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6)

	spellcastingFactor : 3, //required for a spellcaster; the speed with which spell progression works type 1 for full spellcasting (Cleric), 2 for half spellcasting (Paladin), and 3 for one-third spellcasting (Arcane Trickster). This can be any positive number other than 0. Remove this line if your class has no spellcasting. If your character uses the Warlock way of spellcasting, write "warlock1" here. The 1 indicates the spell progression factor. You can change it to a 2 or 3 to have half or one-third spell progression (or to any other factor you like).
		// You can also have this refer to a Spell Slot progression you define yourself, as a separate variable (see "Homebrew Syntax - SpellTable.js"). In order to do this the name of that variable and the spellcastingFactor must match. Using the name "purplemancer" for example would mean that here you put [spellcastingFactor : "purplemancer1"] (the 1 is the factor, this can be any positive number other than 0) while for the variable containing the table you use "purplemancerSpellTable". Note that the name is all lower case!

	spellcastingTable : [ //optional, only if you want to use a non-standard table for spell slot progression and just for this one (sub)class. You can either use the spellcastingTable attribute, or define a new SpellTable in a separate variable (see "Homebrew Syntax - SpellTable.js"). If you are adding multiple classes that use the same table, please add it as a separate variable, for otherwise the spell slots will be added up per individual class level instead of adding the class levels together to find the total amount of spell slots
	// if you add this variable, the number in the spellcastingFactor will be only be used when multiclassing. Note that you still need to enter something in the spellcastingFactor to tell the sheet that its dealing with a spellcaster.
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 0
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 1
		[0, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 2
		[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 3
		[1, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 4
		[2, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 5
		[2, 0, 0, 0, 0, 0, 0, 0, 0], //lvl 6
		[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 7
		[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 8
		[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl 9
		[0, 2, 0, 0, 0, 0, 0, 0, 0], //lvl10
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl11
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl12
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl13
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl14
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl15
		[0, 0, 2, 0, 0, 0, 0, 0, 0], //lvl16
		[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl17
		[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl18
		[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl19
		[0, 0, 0, 2, 0, 0, 0, 0, 0] //lvl20
	],

	spellcastingKnown : { //Optional; Denotes the amount and type of spells the class has access to

		cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], //Optional; This can either be one number, an array of 20 numbers, or be omitted for a class that doesn't have access to cantrips. The numbers reflect the amount of cantrips known

		spells : [4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 13, 13, 14, 14, 15, 16, 16, 16],//Optional; This can either be one number, an array of 20 numbers, or be omitted for a class that doesn't have access to spells. The numbers reflect the amount of spells known. For a class that doesn't know spells, but prepares them from a list, you should put "list" here. For a class that uses a spellbook, you should put "book" here.

		prepared : true, //Optional; This indicates that the class has to prepare spells like a cleric/druid/paladin/wizard

	},

	spellcastingList : { //Optional; Only needed if the class doesn't have its own spell list. This object denotes what spells the class has access to. All things in this object constrain the selection of spells that will be available. The contstraints are cumulative.

		class : "wizard", //Required; The name of the class from whose spell list the spells come from. This can be "any" if the spells are not limited by a spell list of just one class. The entry has to match the name of the class in the SpellsList

		school : ["Evoc", "Abjur"], //Optional; An array of abbreviations of spell school names (see SpellsList). These have to be in an array, even if it is just one value. Each entry has to match the name of the spell school in the SpellsList

		level : [0, 4], //Optional; The lower and upper limit of spell levels that the class has access to.

		ritual : false, //Optional; Denotes if only ritual (true) or only non-ritual (false) spells should be included in the list

		spells : ["light", "mending"], //Optional; If a "spells" array is present, all other objects will be ignored and only this list of spells will populate the list of available spells. each entry has to match the name of the spell in the SpellsList

		notspells : ["antipathy/sympathy", "tsunami"], //Optional; Any spells listed in this array will be excluded from the list
	},

	spellcastingExtra : ["detect magic", "magic missile", "magic weapon", "nystul's magic aura", "dispel magic", "magic circle", "arcane eye", "leomund's secret chest", "planar binding", "teleportation circle"], //Optional; An array of spells that are added to the spell list from which the class can choose. If the class prepares spells, than this list of spells are always considered prepared. Each entry has to match the name of the entry of the spell in the SpellsList exactly
	//You can also have the list be added to the known spells of a class by making the 101th entry in the array read "AddToKnown" (i.e. spellcastingExtra[100] = "AddToKnown");

	features : { //required;  the class features. Each works the same way, so only a couple of example are given. You can add as many as you want

		"fighting style" : { //note the use of lower case characters
			name : "Fighting Style", //required; the name of the class feature
			source : ["P", 72], //required; the source of the class feature
			minlevel : 1, //required; the level at which the feature is gained
			description : "\n   " + "Choose a Fighting Style using the \"Choose Feature\" button above", //required; the text to put in the "Class Features" field
			choices : ["Great Weapon Fighting", "Protection", "Two-Weapon Fighting"], //optional; choices the feature offers, if any.
			choicesNotInMenu : true, //optional: this tells the sheet not to put the choices into the "Choose Options" menu on the second page. Use this is you want to have the choices selected through another class feature. See for an example of this the "Draconic Bloodline" sorcerer archetype. // Note that you always want to have the choices listed in the choices attribute, because otherwise they won't be updated if they have level-dependent features
			"great weapon fighting" : { //required if "choices" is defined; has to be exactly the same as how it is written in the "choices" entry. Note the use of lower case!
				name : "Great Weapon Fighting Style", //required;
				description : "\n   " + "Reroll 1 or 2 on damage if wielding two-handed/versatile melee weapon in both hands" //required;
			},

			"protection" : { //has to be exactly the same as how it is written in the "choices" entry. Note the use of lower case!
				name : "Protection Fighting Style",
				description : "\n   " + "As a reaction, I can give disadv. on an attack made vs. someone within 5 ft of me" + "\n   " + "I need to be wielding a shield and be able to see the attacker to do this",
				action : ["reaction", ""] //optional; adds the name of this choice to the reaction list when chosen. The options are "action", "bonus action", and "reaction" //the second value in the array is added as a suffix for the "name" of the feature when entered into the action field
			},

			"two-weapon fighting" : { //has to be exactly the same as how it is written in the "choices" entry. Note the use of lower case!
				name : "Two-Weapon Fighting Style",
				description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks",

				calcChanges : { //optional; adds stuff to the calculation of attacks and/or HP

					hp : "if (classes.known.sorcerer) {extrahp += classes.known.sorcerer.level; extrastring += \"\\n + \" + classes.known.sorcerer.level + \" from Draconic Resilience (Sorcerer)\";};", //optional; string to be run using eval() when calculating the number of HP in the HP tooltip and automation

					atkCalc : ["if (isOffHand) {output.modToDmg = true; }; ", "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks."], //optional; ["eval string", "explanation string"]; change something in the calculation of the Damage and To Hit of attacks; The first value in the array is stringified code that is run using eval(), the second entry is an explanation of what is being altered so that it can be displayed in a dialogue. This second entry can be left empty, as ""

					atkAdd : ["if (WeaponName.match(/unarmed strike/i)) {fields.Description += 'Counts as magical';}; ", "My unarmed strikes count as magical for overcoming resistances and immunities."], //optional;  ["eval string", "explanation string"]; works just like atkDmg, but affects the weapon attributes when they are applied to the sheet. With this you can change the weapon's description, range, damage die, attribute, etc. etc. However, this will only be applied to recognized weapons

						// Note that you need to use two back slashes for things in the eval code here, because it is first added to a string, and then run as code. See the hp for an example, with the \\n

						// For the eval strings for the attack calculations ('atkCalc' or 'atkAdd') there are some variables that you can use to test against:

							// The variable WeaponName contains the recognized weapon object name as it is used in the WeaponsList object (or "" in atkCalc if the weapon is not a recognized weapon);

							// The object "theWea" is the WeaponsList[WeaponName] object for the recognized weapon (or 'undefined' in atkCalc if the weapon is not a recognized weapon);

							// You can use the booleans 'isOffHand', 'isMeleeWeapon', 'isRangedWeapon', 'isSpell' (also true for cantrips), 'isDC'

							// If the attack is a spell that is found on the SpellList, the variable thisWeapon[3] contains the name of the entry in the SpellList

							// The object "fields" has all the values of the different fields of the attack (fields.Proficiency, fields.Mod, fields.Range, fields.Damage_Type, fields.Description, fields.To_Hit_Bonus, fields.Damage_Bonus, fields.Damage_Die, fields.Weight);

							// You can change the attributes of the "fields" object with the eval-string of atkAdd to affect what is put into the fields.

							// You can use the attributes of the "fields" object with the eval-string of atkCalc to check for things, but changing them will have no effect on the sheet.

							// With the atkCalc you have to change the "output" object in order to affect the outcome of the calculations. This object has the following attributes: output.prof (wether or not to add the proficiency bonus to the To Hit), output.die (Damage Die to use), output.mod (ability modifier), output.modToDmg (whether or not to add the ability modifier to Damage), output.magic (any magic bonus that's to be added to both To Hit and Damage), output.bHit (the To Hit bonus from the Blue Text/Modifier field), output.bDmg (the Damage bonus from the Blue Text/Modifier field), output.extraHit (a number added to the To Hit that is reserved for this eval), output.extraDmg (a number added to the damage that is reserved for this eval)
				}
			},
		},

		"arcane initiate" : {
			name : "Arcane Initiate",
			source : ["S", 125],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with Arcana and two wizard cantrips that count as cleric cantrips",

			skills : ["Arcana"], //optional; an array of skills with which proficiency is gained

			skillstxt : "\n\n" + toUni("Arcane Domain") + ": Arcana.", //optional; the text that has to be added to the skill tooltips

			spellcastingBonus : { //optional; an object that adds something to the "Bonus Spells" section of the spell selection dialog //this object can have all the same attributes as the "spellcastingList" object, but must also have a "name" defined" //the other things that can be defined in this that are not in the "spellcastingList" object, are the "selection", "times" and "prepared" values

				name : "Arcane Initiate", //required; this is used to identify the object, so must be an unique name

				class : "wizard", //optional but required if not including the "spells" entry; see "spellcastingList" object

				level : [0, 0], //optional; see "spellcastingList" object

				school : ["Necro"], //optional; see "spellcastingList" object

				spells : ["light"], //optional, but required if not including the "class" entry; see "spellcastingList" object

				notspells : ["mending"], //optional; see "spellcastingList" object

				selection : ["light"], //optional if "spells" is defined; this is the default selection for the array specified in "spells"

				times : 2, //optional; this is the number of times the bonus spells should be added. //This can also be an array of 20 values. That way the number of times are level-dependent

				prepared : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to automatically get a checked off checkbox in the first column, similar to domain spells for a cleric

				atwill : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to get "At Will" in the first column

				oncesr : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to get "1×SR" in the first column

				oncelr : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to get "1×LR" in the first column

				firstCol : "8", //optional; if set to any value, this makes the spell selected for this/these bonus spells to get the first two letters/numbers of that value in the first column
			},

			spellFirstColTitle : "Ki", //optional, only works if spellcastingBonus exists; if set to any value, this makes the first column of the captions on the spell sheet be set to the first two letters/numbers of that value

			vision : [["Darkvision", 60], ["Sunlight Sensitivity", 0]], //optional; An array of arrays that each have a length of 2; This adds the first value of each array to the Senses field. The second value is the range in feet. If no range is needed, put a 0 there. You can also add a modifier like "+30" or "*2" to have the appropriate calculation done with the range of sense
		},

		"spellcasting" : {
			name : "Spellcasting",
			source : ["P", 114],
			minlevel : 1,
			description : "\n   " + "I can cast prepared wizard cantrips/spells, using Intelligence as my spellcasting ability" + "\n   " + "I can use an arcane focus as a spellcasting focus" + "\n   " + "I can cast all wizard spells in my spellbook as rituals if they have the ritual tag",
			additional : ["3 cantrips known", "3 cantrips known", "3 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known"], //optional; text to display in the header of the feature. This can be one value, but can also be an array of 20 values, one for each level.
		},

		"second wind" : {
			name : "Second Wind",
			source : ["P", 72],
			minlevel : 1,
			description : "\n   " + "As a bonus action, I regain 1d10 + fighter level HP; I can use this once per short rest",
			additional : ["1d10+1", "1d10+2", "1d10+3", "1d10+4", "1d10+5", "1d10+6", "1d10+7", "1d10+8", "1d10+9", "1d10+10", "1d10+11", "1d10+12", "1d10+13", "1d10+14", "1d10+15", "1d10+16", "1d10+17", "1d10+18", "1d10+19", "1d10+20"],
			usages : 1, //optional; number of times it can be used. This can be one value, but can also be an array of 20 values, one for each level. It is recommended to use a numerical value, but if you use a string, include " per " at the end, like "1d10 per "
			recovery : "short rest", //required if "usages" is defined; way of getting the limited feature recharged. Only if you define both the 'usages' and 'recovery' will the feature be added to the limited features
			action : ["bonus action", ""] //optional; adds the name of this feature to the bonus action list when chosen. The options are "action", "bonus action", and "reaction"
		},

		"action surge" : {
			name : "Action Surge",
			source : ["P", 72],
			minlevel : 2,
			description : "\n   " + "I can take one additional action on my turn on top of my normally allowed actions",
			usages : [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2], //example of usages varying per level
			recovery : "short rest",

			armor : [false, false, true, false], //optional; the 4 entries are for proficiency in: ["light", "medium", "heavy", "shields"]. Be sure to always add all four statements of true/false!

			weapons : [true, false, ["hand crossbow"]], //optional; the 3 entries are for: ["simple", "martial", "other"]. Be sure to always add both statements of true/false!

			addMod : { type : "skill", field : "Init", mod : "Int", text : "I can add my Intelligence modifier to initiative rolls." }, //optional; This is an object, or an array of similar objects, for adding a modifier to a modifier field. Using this will make it so that the modifier is added to any value that is already there. // The 'mod' attribute can be any combination of numbers, mathematical operators, and three-letter ability score abbreviations // The 'type' attribute can be "skill" or "save", but can also be left empty "" // The 'field' attribute depends on the type, for "skill" it can be the name of a skill, or "Init" for initiative, or "All" for the all skills modifier; for "save" it can be the three-letter abbreviation of an ability score, or "All" for the all saves modifier. // If the 'type' attribute is left empty, the 'field' attribute has to be the exact name of the field the modifier has to be added to // The 'text' attribute is an explanation of why the modifier was added //NOTE: for modifiers to attacks, use calcChanges

			addarmor : "Stone's Durability", //optional; a string of the name of the armour that is literally put in the Armor Description field when the class feature is applicable, and removed if not
		},

		"subclassfeature3" : { //You need at least one entry named "subclassfeatureX". It signals the sheet to ask the user for which subclass he would like to have. The level of this feature should match the level the class needs to select a subclass. Once a subclass is selected, any feature with "subclassfeature" in the object name in the class entry will be ignored.
			name : "Martial Archetype",
			source : ["P", 72],
			minlevel : 3,
			description : "\n   " + "Choose a Martial Archetype you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Champion, Battle Master, Eldritch Knight, or Purple Dragon Knight",
		},

		"subclassfeature3.1" : {
			name : "", //any feature who's name is empty like this one is, will be ignored. Since v12.5 of the sheet, an entry like this serves no function
			minlevel : 3,
		},

		"natural antivenom" : {
			name : "Natural Antivenom",
			source : ["UA:MC", 7],
			minlevel : 9,
			description : desc([
				"I have advantage on saves vs. poison and resistance to poison damage",
				"When I use a poultice, in addition to healing, I cure one poison effect on the creature",
				"I gain proficiency with Constitution saving throws"
			]),

			savetxt : { // Optional; this attribute defines entries to add to the field for "Saving Throw Advantages / Disadvantages"

				text : ["Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg", "Magic can't put me to sleep"], // Optional; this is an array of strings, and each of those strings is added to the field exactly as presented here

				immune : ["poison", "disease"], // Optional; this is an array of strings that the character is immune to. This is put in the field after the text "Immune to ", so in this example it would result in "Immune to poison and disease"

				adv_vs : ["traps", "charmed"] // Optional; this is an array of things that the character has advantage on saves against. This is put in the field after the text "Adv. on saves vs. ", so in this example it would result in "Adv. on saves vs. traps and charmed"
			},

			dmgres : ["Poison"], //optional; an array of damage types that the class gets resistance against. // If the resistance has a condition attached to it, like only being against nonmagical attacks, substitute the entry in the array with an array of 2: [the damage type, the damage type with the condition]. // For example: [["Bludgeoning", "Bludg. (nonmagical)"], ["Piercing", "Pierc. (nonmagical)"], ["Slashing", "Slash. (nonmagical)"]]

			saves : ["Con"], //optional; an array of the ability scores with which the class feature grants proficiency in saving throws

			toolProfs : [["Musical instrument", 3], ["Thieves' tools", "Dex"]], // optional; this is an array with the tool proficiencies gained. Each entry can be its own array of 2 entries. The first entry is the name of the tool and the second entry is either 1) a number if the tool is yet to be chosen, or 2) the 3-letter ability score abbreviation if the tool is to be listed in the skill section and have a bonus calculated

			languageProfs : [1, "Elvish"], // optional; this is an array of the language proficiencies gained. An entry can either be 1) a string that represents the language learned or 2) a number which is the number of language gained that can be chosen by the player

			speed : { //required; This sets a value for one or more speed modes, and/or a value to be added to a specific speed mode or to all speed modes // the attributes of this object can be "walk", "burrow", "climb", "fly", "swim", and "allModes"

				// all of the following attributes are optional and you can add more ("burrow" isn't part of this example!)

				walk : { spd : 30, enc : 20 }, // the objects "walk", "burrow", "climb", "fly", "swim" are all the same, they are an object with two attributes, 'spd' for the speed in feet, and 'enc' for the encumbered speed in feet.

				climb : { spd : "+50", enc : 0 }, // instead of numbers, you can also have modifiers. Modifiers are a string, starting with a mathematical operator, followed by a number (e.g. "-10", "+20"). // a value that is zero is ignored

				fly : { spd : "walk", enc : 0 }, // instead of a number/modifier, you can also set the attribute to "walk". This makes the speed mode assume the walking speed // Using an underscore as the first character means the value is only added if the value would be non-zero

				swim : { spd : "fixed 60", enc : "fixed 60" }, // if you include the word "fixed" together with a number, the movement mode will be that number, without any modifiers from other sources (like the Monk's speed bonus). However, if another entry that isn't 'fixed' does end up with a higher total while including any modifiers, that speed is used instead

				allModes : "+10" // the 'allModes' attribute can only consist of a modifier. This modifier is applied to all speed modes, both normal and encumbered. It is only applied if the speed mode exists, it won't give the character a burrow speed if it would otherwise have none, for example
			},
		},
	}
}


/* CHANGES SINCE V12.999:
	1. 'armor' attribute has been replaced with 'armorProfs', but is otherwise identical.
	2. 'weapons' attribute has been replaced with 'weaponProfs', but is otherwise identical.
	3. 'primaryAbility' should no longer have the class' name in it, nor a line break at the start, a bullet point, or a semicolon at the end.
	4. 'prereqs' should no longer have the class' name in it, nor a line break at the start, a bullet point, or a semicolon at the end.
*/