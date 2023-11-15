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

	Subject:	Creature

	Effect:		This is the syntax for adding a new creature to the sheet,
	        	for use on the companion and wild shape pages.

	Remarks:	You will also need the syntax for adding a weapon if you want the creature
	        	to have attack options.
	        	You will also need the syntax for adding a source if you want the creature
				to have a source that doesn't yet exist in the sheet.
	        	You will also need the syntax for common attributes if you want to use a
	        	custom calculation for hit points (calcChanges.hp).

	Sheet:		v13.1.11 and newer

*/

var iFileName = "Homebrew Syntax - CreatureList.js";
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

RequiredSheetVersion("13.1.11");
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

CreatureList["purple crawler"] = {
/* 	CreatureList object name // REQUIRED //
	TYPE:	string
	USE:	object name of the creature as it will be used by the sheet

	By adding a new object to the existing CreatureList object, we create a new creature.
	The object name here is 'purple crawler'. You can use any object name as long as it is not already in use.
	If you do use an object name that is already in use, you will be overwriting that object.
	Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [].
*/
	name : "Purple Crawler",
/*	name // REQUIRED //
	TYPE:	string
	USE:	name of the creature as it will be used by the sheet

	This name will also be used to recognize what is selected in the race drop-down on
	the companion and wild shape pages.
*/
	nameAlt : ["Purple Creeper"],
/*	nameAlt // OPTIONAL //
	TYPE:	array of strings (variable size)
	USE:	alternative names for the creature
	ADDED:	v13.0.6
	CHANGE: v13.1.3 (also appears in drop-down boxes)

	These names will be used to recognize what is entered into the race drop-down on
	the companion and wild shape pages, and will be displayed in those drop-down boxes.
	This last part was changed in v13.1.3, that the names in this attribute will now all
	appear in the drop-down boxes along with the `name` attribute of the creature.

	If this creature is an option for Wild Shape, Find Familiar, Warlock Pact of the Chain,
	Find Steed, Find Greater Steed, a ranger's companion or something similar,
	then these alternative names will also be shown in the menu options.
*/
	source : ["SRD", 204],
	source : [["E", 7], ["S", 115]],
/*	source // REQUIRED //
	TYPE:	array with two entries (or array of these arrays)
	USE:	define where the creature is found

	This attribute is used by the sheet to determine if the creature should be available depending on the sources included and excluded.

	This array has two entries, a string followed by a number
	1. string
		The first entry has to be the object name of a SourceList object.
	2. number
		The second entry is the page number to find the creature at.
		This can be any number and is ignored if it is a 0.

	See the "source (SourceList).js" file for learning how to add a custom source.

	Alternatively, this can be an array of arrays to indicate it appears in multiple sources.
	The example above says something appears on both page 7 of the Elemental Evil Player's Companion and
	on page 115 of the Sword Coast Adventure Guide.

	If a creature is completely homebrew, or you don't want to make a custom source, just put the following:
		source : ["HB", 0],
	"HB" refers to the 'homebrew' source.
*/
	defaultExcluded : true,
/*	defaultExcluded // OPTIONAL //
	TYPE:	boolean
	USE:	whether this creature should be excluded by default (true) or included by default (false)

	Include this attribute and set it to true if the creature should appear in the Excluded list of the
	Source Selection Dialog when the script is added for the first time.
	It will have to be manually set to be included before it is used by the sheet's automation.
	The user will be made aware of this exclusion.

	This is useful for optional creatures that you wouldn't normally want to use (e.g. playtest or campaign-specific).

	Setting this attribute to false is the same as not including this attribute.
*/
	size : 3,
	size : [4, 3],
/*	size // REQUIRED //
	TYPE:	number or array (since v13.0.6)
	USE:	set the size category drop-down box

	This can be either a:
	1) Number
		The number corresponding to the size category of the creature (see table below)
	2) Array (since v13.0.6)
		If the creature can be several different size categories, using an array will allow the player
		to make a choice which one to use.
		Add the numbers corresponding to the size categories of the creature (see table below) to the array.
		For example, if you do
			size : [4, 3],
		the player will be prompted to select either Small or Medium as the creature's size category.

	The corresponding number to the size categories are as follows:
		NO	SIZE
		0	Gargantuan
		1	Huge
		2	Large
		3	Medium
		4	Small
		5	Tiny
*/
	type : "Fiend",
	type : ["Celestial", "Fey", "Fiend"],
/*	type // REQUIRED //
	TYPE:	string or array (since v13.1.0)
	USE:	set the type drop-down box

	This can be either a:
	1) String
		The name of the creature type
	2) Array (since v13.1.0)
		If the creature can be several different creature types, using an array will prompt the player
		to make a choice which one to use.

	You can put here anything you like, but is usually one of the known creature types:
		Aberration
		Beast
		Celestial
		Construct
		Dragon
		Elemental
		Fey
		Fiend
		Giant
		Humanoid
		Monstrosity
		Ooze
		Plant
		Undead

	This value is put in the type drop-down box of the sheet without any changes,
	thus it is recommended to capitalize it for consistency.
*/
	subtype : "devil",
	subtype : ["demon", "devil"],
/*	subtype // OPTIONAL //
	TYPE:	string or array (since v13.1.0)
	USE:	add the subtype in the type drop-down box

	This can be either a:
	1) String
		The name of the creature subtype
	2) Array (since v13.1.0)
		If the creature can be several different creature subtypes, using an array will prompt the player
		to make a choice which one to use.

	This can be anything you like. It will be added to the string of the `type` attribute
	in brackets, and together will be set in the type drop-down box.
	In the first example, it will end up reading as "Fiend (devil)".

	This value is put in the type drop-down box of the sheet without any changes,
	only with added brackets around it,	thus it is recommended to have it all lowercase for consistency.
*/
	companion : "familiar",
	companion : ["familiar_not_al", "pact_of_the_chain"],
/*	companion // OPTIONAL //
	TYPE:	array of strings (or string, for backwards compatibility)
	USE:	list this creature as an option for a special type of companion
	CHANGE:	v13.1.0

	This attribute is an array of keys corresponding to a CompanionList object name,
	or, for backwards compatibility, a string of one key.
	Doing so makes this creature selectable as the listed type of special companion(s),
	using the Companion Options button on the companion page.

	Some CompanionList objects have their own filter for determining which creatures are 
	applicable.
	However, if you set this attribute to match the CompanionList object key,
	they will always be available for that CompanionList entry, regardless of its filter.

	Note that you can change any creature into one of the special options by first selecting
	a race from the drop-down and selecting	"Change current creature into a ..." with
	the Companion Options button.

	Use this `companion` attribute for things that are obvious candidates for the special options.

	OPTION                 EXPLANATION
	"familiar"             Find Familiar spell and Pact of the Chain warlock boon
	"pact_of_the_chain"    Pact of the Chain warlock boon (but not Find Familiar spell)
	"familiar_not_al"      Same as "familiar", but with the added description "(if DM approves)"
                           However, this creature will not be shown for either Find Familiar 
                           or Pact of the Chain when the DCI field is visible (i.e. Adventurers League).
	"mount"                Find Steed spell
	"steed"                Find Greater Steed spell
	"companion"            Ranger's Companion (Beast Master feature)
	                       Has its own filter, so normally you don't need this option.
						   Filter: any Beast, Medium or smaller, and CR of 1/4 or lower
	"companionrr"          2016/09/12 Unearthed Arcana: Revised Ranger's Beast Conclave feature
	"strixhaven_mascot"    Strixhaven Mascot familiar (Strixhaven Mascot feat), but not Find Familiar spell
*/
	companionApply : "companion",
/*	companionApply // OPTIONAL //
	TYPE:	string
	USE:	always set this creature to be this special type of companion

	Setting this to a key in the CompanionList object will make the sheet
	automatically apply the features of that special companion type.

	Note that you can change any creature into one of the special options by first selecting
	a race from the drop-down and selecting	"Change current creature into a ..." with
	the Companion Options button.

	Use this `companionApply` attribute only if the creature *always* is that kind of companion.

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

	Be aware that this list is slightly different than the one for the `companion` attribute!
*/
	alignment : "Unaligned",
/*	alignment // REQUIRED //
	TYPE:	string
	USE:	set the alignment drop-down box

	This value is put in the alignment drop-down box of the sheet without any changes,
	thus it is recommended to capitalize it for consistency.
*/
	ac : 11,
/*	ac // REQUIRED //
	TYPE:	number
	USE:	set the armour class

	This number is filled in the AC field as-is, no calculations are done with regards to armour worn
	or anything like that.
*/
	hp : 10,
/*	hp // REQUIRED //
	TYPE:	number
	USE:	set the maximum amount of hit points

	This number is filled in the Max HP field without any changed, no calculations are done with
	regards to hit dice, Constitution modifier, or anything like that.
	It is still possible to enable automatic updates for the Max HP field using the "Set Max HP" button,
	but by default only the hp value set here will be displayed and it will not automatically update.
*/
	hd : [3, 4],
/*	hd // REQUIRED //
	TYPE:	array with two number entries
	USE:	set the hit dice

	This array has two entries, both have to be a number or an empty string ""
	1. number
		The first entry is the amount of hit dice.
		This will be filled in the "Level" field on the companion page.
	2. number
		The second entry is the die type of the hit dice.
		This can be any number, but normally it is 4, 6, 8, 10, or 12.
		This will be filled in the "Die" field on the companion page.
		Don't worry, the "d" will be added automatically (e.g. the 4 above will display as "d4").

	The example above is for 3d4 hit dice.
*/
	hdLinked : ["ranger", "rangerua"],
	hdLinked : function(prefix) { return classes.known.ranger ? classes.known.ranger.level - 3 : 0; },
/*	hdLinked // OPTIONAL //
	TYPE:	array with ClassList object names (variable length) or function
	USE:	dynamically set the number of HD to a class level (array) or anything you want (function)
	ADDED:	v13.0.6

	This attribute is complimentary to the `hd` attribute, it does not replace it.
	This attribute can only set the number of HD (the first entry in the `hd` attribute),
	not the type of die.

	This attribute can be one of two things:
	1. an array with ClassList object names
		The number of HD will be automatically updated to the class level of the class(es) entered here.
		If you enter multiple ClassList object names, the highest class level will be used.
		The ClassList object names are always written in all lower case (e.g. "wizard").
		If none of the classes are currently selected by the main character, the sheet will default to
		the first entry in the `hd` attribute, see above.
	2. function that returns the number
		The function is executed any time a class level changes.
		It is passed one variable: a string: the prefix of the Companion page this creature was selected on.
		If it returns false, 0, "", or anything that is not a number, the sheet will default to
		the first entry in the `hd` attribute, see above.
*/
	speed : "20 ft, climb 30 ft",
/*	speed // REQUIRED //
	TYPE:	string
	USE:	set the movement speed

	This value is put in the speed field without any changes,
	except that on the Printer Friendly sheets any comma followed by a space is replaced with
	a comma followed by a line break.
*/
	proficiencyBonus : 2,
/*	speed // REQUIRED //
	TYPE:	number
	USE:	set the proficiency bonus

	This value is put in the proficiency bonus field without any changes.
	It is also used for determining the creature's proficiency with skills and saving throws (see below).
*/
	proficiencyBonusLinked : true,
/*	proficiencyBonusLinked // OPTIONAL //
	TYPE:	boolean
	USE:	whether the proficiency bonus is the same (true) as the main character or not (false)
	ADDED:	v13.0.6

	Setting this to true will cause the `proficiencyBonus` attribute above to
	be overwritten on the Companion page with that of the main character (the 1st page),
	and updated whenever the main character changes level.
	Even so, setting the `proficiencyBonus` attribute is still required, as it will
	be used to calculate skill and saving throw proficiencies and bonuses.

	This attribute has no affect on the Wild Shape page.

	Setting this attribute to false is the same as not including this attribute.
*/
	challengeRating : "1/2",
/*	challengeRating // REQUIRED //
	TYPE:	string
	USE:	set the challenge rating

	This value is put in the challenge rating field (on the wild shape page) without any changes.
	This value is used on the wild shape page to show the creature in the right submenu.
*/
	scores : [15, 13, 12, 2, 13, 8],
/*	scores // REQUIRED //
	TYPE:	array of six numbers
	USE:	set the ability scores

	This array has six entries, all of which have to be a number.
	These six correspond to the ability scores in their usual order:

	INDEX	ABILITY SCORE
	(0)	 	Strength
	(1)  	Dexterity
	(2)  	Constitution
	(3)  	Intelligence
	(4)  	Wisdom
	(5)  	Charisma

	[Str, Dex, Con, Int, Wis, Cha]
*/
	saves : ["", 3, "", "", "", ""],
/*	saves // OPTIONAL //
	TYPE:	array of six numbers
	USE:	set the saving throw proficiencies

	This array has six entries, all of which can be an empty string or a number.
	These six correspond to the ability scores in their usual order, see `scores` above.

	Only list here the saving throw bonus for an ability score if it is not the same as that ability's modifier.
	Normally this would happen if the creature is proficient in a saving throw, although other modifiers might apply as well,

	The sheet will take the number given here, look at the ability score and proficiency bonus, 
	and determine if the creature is proficient and/or has other modifiers.
	Then it will check the proficiency box and/or fill the modifier field, as appropriate.
*/
	savesLinked : true,
/*	savesLinked // OPTIONAL //
	TYPE:	boolean
	USE:	whether the total save bonus is the same (true) as the main character or not (false)
	ADDED:	v13.0.6

	Setting this to true will cause the totals for saving throws on the Companion page
	to always be identical to those of the main character (on the 1st page).
	The proficiency checkbox and modifier fields on the Companion page will be ignored.

	It will effectively cause the `saves` attribute above to be overwritten on
	the Companion page with the totals of the main character (the 1st page).
	Even so, setting the `saves` attribute is still functional, as it will
	be used to calculate saving throw proficiencies on the Wild Shape page.

	This attribute has no affect on the Wild Shape page.

	Setting this attribute to false is the same as not including this attribute.
*/
	senses : "Darkvision 60 ft",
/*	senses	// REQUIRED //
	TYPE:	string
	USE:	add text to the Senses section on the Companion page

	Even though most creature stat blocks list Passive Perception under senses, do not include
	it in this attribute. Passive Perception will be calculated automatically from the Perception bonus.
	If Passive Perception is different than 10 + Perception bonus, you can use the `addMod` attribute
	to add the bonus to the modifier field.

	If the creature doesn't have any special senses, set an empty string for this attribute, like so:
		senses : "",

	This text are also displayed on the wild shape page, but in the singular Traits & Features section,
	together with all other descriptive string, traits, features, and action attributes.
	As the wild shape pages offer limited space, it is recommended to test if all of these and
	the other attributes together will fit.
	If they don't fit (well), consider using the `wildshapeString` attribute, see below.
*/
	attacksAction : 2,
/*	attacksAction // REQUIRED //
	TYPE:	number
	USE:	set the number of attacks per action

	This value is put in the attacks per action field (on the companion page) without any changes.
	This value is not displayed on the wild shape page, hence it is recommended to also explain
	the multiattack trait in the description of the appropriate attack and/or in the `traits` attribute.
*/
	attacks : [{
		name : "Claws",
		ability : 1,
		damage : [2, 6, "slashing"],
		range : "Melee (5 ft)",
		description : "Two claws attacks as an Attack action"
	}],
/*	attacks // REQUIRED //
	TYPE:	array (variable length) of WeaponsList objects
	USE:	set the attack entries

	The syntax of the objects is not explained here, but in the "weapon (WeaponsList).js" syntax file.

	TIP: Mention in a attack's description if it can be used multiple times as part of an action.

	TIP: Use the `tooltip` attribute to explain complex attacks further.

	Each object in the array describes one attack entry.
	This array is used to populate the Attacks section on the companion and wild shape page.
	The first three entries in this array will be directly added to the attack section when selecting this creature.
	You can have more entries in the array, but as the pages only have three attack entries,
	they will not be visible unless manually changing the selection of one of the attack entries.

	You can have attacks with identical names as weapon options in the attack drop-down box.
	The companion page will always use the attacks defined in the creature's entry over those in the WeaponsList.
*/
	skills : {
		"Athletics" : 4,
		"Perception" : 5
	},
/*	skills // OPTIONAL //
	TYPE:	object with skill names as attribute names
	USE:	set the proficiency, expertise, and extra bonus for skills

	Use this attribute when the creature has a bonus for a skill that is different
	than just the associated ability score modifier.
	
	Add each skill as its own attribute with a value of the total skill bonus.

	The automation will then determine if the skill is considered to be proficient,
	with expertise (twice the proficiency bonus added), and/or any other bonuses.

	In the example here the Athletics skill will have the proficiency checkbox checked,
	because the creature has Str 15 (+2) and a Proficiency Bonus of +2,
	thus the +4 in Athletics is ability score modifier + Proficiency Bonus.
	However, the creature is considered to have expertise in Perception,
	as it only has Wis 13 (+1), so the total of +5 Perception must be due adding twice
	the Proficiency Bonus of +2.
*/
	damage_vulnerabilities : "cold",
	damage_resistances : "lightning; thunder; bludgeoning, piercing, and slashing from nonmagical weapons",
	damage_immunities : "poison",
	condition_immunities : "exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious",
	languages : "Terran",
/*	damage_vulnerabilities	// OPTIONAL //
	damage_resistances	  	// OPTIONAL //
	damage_immunities     	// OPTIONAL //
	condition_immunities  	// OPTIONAL //
	languages             	// OPTIONAL //
	TYPE:	string
	USE:	add text to the Features section on the Companion/Wild Shape page

	All of these optional attributes are strings that get their content added to the Features section.
	Each will be preceded with a bullet point and the appropriate name, for example:
		languages : "Sylvan and Elvish",
	Will result in:
		◆ Languages: Sylvan and Elvish.
 
	These text are also displayed on the wild shape page, but all together in the singular Traits & Features section,
	together with all other descriptive string, traits, features, and action attributes.
	As the wild shape pages offer limited space, it is recommended to test if all of these and
	the other attributes together will fit.
	If they don't fit (well), consider using the `wildshapeString` attribute, see below.
*/
	features : [{
		name : "False Appearance",
		description : "While the purple crawler remains motionless, it is indistinguishable from an ordinary purple flower.",
		joinString : "\n   "
	}],
	actions : [{
		name : "Invisibility",
		minlevel : 5,
		description : "As an action, the purple crawler magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell).",
		addMod : [{ type : "skill", field : "all", mod : "max(oCha|1)", text : "The purple crawler adds its master's Charisma modifier (min 1) to all its skill checks." }]
	}],
	traits : [{
		name : "Keen Sight",
		minlevel : 8,
		description : "The purple crawler has advantage on Wisdom (Perception) checks that rely on sight. It size increases to Large.",
		eval : function(prefix, lvl) {
			// Increase size to Large
			PickDropdown(prefix + "Comp.Desc.Size", 2);
		},
		removeeval : function(prefix, lvl) {
			// Change size back to Medium
			PickDropdown(prefix + "Comp.Desc.Size", 3);
		}
	}],
	notes : [{
		name : "Lila Laser Light (Purplemancer 13)",
		minlevel : 13,
		description : desc([
			"The purple companion gains the ability to shine in a bright purple color",
			"Once per long rest, it can cast Hypnotic Pattern without requiring components"
		]),
		joinString : ""
	}],
/*	features // OPTIONAL //
	actions  // OPTIONAL //
	traits   // OPTIONAL //
	notes   // OPTIONAL // since v13.1.11
	TYPE:	array (variable length) with objects
	USE:	add text to the Traits and Features sections on the Companion page
	CHANGE:	v13.1.0 (added `joinString` attribute)
	CHANGE:	v13.1.11 (added `notes`)

	Each of these three attributes work in the same way.
	Each is an array with objects that have at least two attributes, `name` and `description`, that each contain a string.

	Each object can also have the following optional attributes:
		ATTRIBUTE   EXPLANATION
		minlevel    determines at which level the feature is added 
		addMod      add custom modifiers to calculated values
		eval        run a function when added (useful combined with minlevel)
		removeeval  run a function when removed (useful combined with minlevel)
	For a more detailed explanation of these attributes, see below in the
	Companion Page Only section.

	Each name is preceded by a bullet point and, by default, followed by a colon and the description when
	added to the right section, for example:
		{
			name : "Invisibility",
			description : "As an action, the purple crawler magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell)."
		}
	Will result in:
		◆ Invisibility: As an action, the purple crawler magically turns invisible until it attacks or casts a spell, or until its concentration ends (as if concentrating on a spell).
	
	If you want something else than a colon, you can change it to anything you like by adding the
	`joinString` attribute. For example:
		{
			name : "False Appearance",
			description : "While the purple crawler remains motionless, it is indistinguishable from an ordinary purple flower.",
			joinString : "\n   "
		}
	Will result in:
		◆ False Appearance
		   While the purple crawler remains motionless, it is indistinguishable from an ordinary purple flower.

	If the `description` attribute is not present, no string will be added to the field.
	Any description will do, even an empty string (e.g. description : "").

	The three different attributes, traits, features, and actions, are added to different parts of the companion page:

	ATTRIBUTE		ADDED TO SECTION
	 features		 Features
	 actions 		 Traits
	 traits  		 Traits
	 notes  		 Notes (left)

	> `features`
	Be aware that languages, resistances, vulnerabilities, and immunities are also added to the
	Features section on the companion page and before the features attribute described here.

	> `actions` & `traits`
	The actions are added before traits to the Traits section.

	> `notes`
	Starting with v13.1.11, the array in `notes` is added to the notes section before any notes from a
	CompanionList selection are added.
	Be aware that if you add anything in the `notes` of a CreatureList object, some CompanionList options
	will run out of space for all their notes.
	Notes are not displayed on the wild shape page.

	The array is processed in the order it is in the code, no sorting will take place.

	These text, except `notes`, are also displayed on the wild shape page, but all together in the singular
	Traits & Features section,	regardless of their `minlevel` attribute value.
	Also, `eval`, `removeeval`, and `changeeval` are not executed when this creature is selected/removed on the Wild Shape page.
	As the wild shape pages offer limited space, it is recommended to test if all of
	these and the other attributes together will fit.
	If they don't fit (well), consider using the `wildshapeString` attribute, see below.
*/

// >>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Companion Page Only >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>> //
/*
	The below attributes won't affect anything when the creature is select as a wild shape,
	but they will work on a Companion page.
*/

/*	minlevel // OPTIONAL //
	(Part of `features`, `traits`, `actions`, or `notes` object, see above)
	TYPE:	number
	USE:	the level at which to add the feature, trait, or action
	ADDED:	v13.0.6

	This attribute is part of an object in the `features`, `traits`, `actions`, or `notes` arrays, see above.
	Use this if an entry in that array is only supposed to be displayed
	once the main character (the character on the 1st page) reaches a certain level.
	If the main character goes below this level, the entry is removed again.
	The level checked against can be different than the main character level if the
	attribute `minlevelLinked` exists, see below.

	Setting this attribute to 1 is the same as not including it.
*/

/*	eval & removeeval & addMod // OPTIONAL //
	(Part of `features`, `traits`, `actions`, or `notes` object, see above)
	TYPE:	variable, see the entries for `eval`, `removeeval`, or `addMod`
	USE:	variable, see the entries for `eval`, `removeeval`, or `addMod`
	ADDED:	v13.0.6

	These attributes are part of an object in the `features`, `traits`, `actions`, or `notes` arrays, see above.
	These optional attributes function identical to those that share their name.
	They function exactly as described for the main object, but they will only be called when the
	`features`, `traits`, `actions`, or `notes` object is processed, which can be influenced
	using the `minlevel` attribute, see above.
*/

	minlevelLinked : ["artificer", "wizard"],
	minlevelLinked : function(prefix) { return classes.known.warlock ? classes.known.warlock.level + 1 : 0; },
/*	minlevelLinked // OPTIONAL //
	TYPE:	array with ClassList object names (variable length) or function
	USE:	dynamically select which level to use for level-dependent features

	This attribute is used to determine at which level objects in the `features`, `traits`,
	or `actions` arrays are added/removed,
	and it is used to determine what level is passed to the `eval`, `removeeval`, and `changeeval` functions.

	This attribute can be one of two things:
	1. an array with ClassList object names
		The level to use will be the class level of the class(es) entered here.
		If you enter multiple ClassList object names, the highest class level will be used.
		The ClassList object names are always written in all lower case (e.g. "wizard").
		If none of the classes are currently selected by the main character, the sheet will default
		to the total class level, or 1 if the level field is empty.
	2. function that returns the number
		The function is called upon any time a level needs to be determined for the creature,
		be it to determine which level to pass to `changeeval` (see below),
		or to determine which `features`, `traits`, `actions`, or `notes` to add.remove (see `minlevel` above).
		It is passed one variable: a string: the prefix of the Companion page this creature was selected on.
		If it returns false, 0, "", or anything that is not a number, the sheet will default
		to the total class level, or 1 if the level field is empty.

	ADDED:	v13.0.6
*/

	header : "Summon",
/*	header // OPTIONAL //
	TYPE:	string
	USE:	set the single-word header at the top left of the companion page
			This will only affect hit points on the companion page, not wild shapes
	ADDED:	v13.0.6

	By default this header reads "Companion".

	Be advised that this header has limited space, especially on the Colourful versions.
	Anything too long will be cut off.

	This value is put in the header of the companion without any changes,
	thus it is recommended to capitalize it for consistency.
	On the Printer Friendly sheets this header is always full caps. This can't be changed.

	This attribute is generally reserved for creatures included in a creatureOptions attribute.
*/
	addMod : [
		{ type : "skill", field : "Init", mod : "Int", text : "The purple crawler adds its Intelligence modifier to initiative rolls." },
		{ type : "save", field : "all", mod : "max(oCha|1)", text : "The purple crawler adds its master's Charisma modifier (min 1) to all its saving throws." }
	],
/*	addMod // OPTIONAL //
	TYPE:	array of objects (variable length)
	USE:	add value to a modifier field
	ADDED:	v13.0.6

	This attribute works identical to the `addMod` attribute found in the
	"_common attributes.js" file.
	Please look there for a complete explanation.
*/
	calcChanges : {
/*	calcChanges // OPTIONAL //
	TYPE:	object (optional attributes)
	USE:	change how the hit points automation works
			This will only affect hit points on the companion page, not wild shapes
	ADDED:	v13.0.6

	The attributes of this object can be `hp` and `setAltHp`.

	Note that `calcChanges` also appears in the list of common attributes,
	but only its `hp` attribute is shared with the object here.
*/
		hp : function (totalHD, HDobj, prefix) {
			if (!classes.known.ranger) return;
			var creaHP = CurrentCompRace[prefix] && CurrentCompRace[prefix].hp ? CurrentCompRace[prefix].hp : 0;
			var creaName = CurrentCompRace[prefix] && CurrentCompRace[prefix].name ? CurrentCompRace[prefix].name : "the creature";
			var rngrLvl = classes.known.ranger.level;
			var rngrCompHp = 4 * rngrLvl;
			HDobj.alt.push( Math.max(creaHP, rngrCompHp) );
			HDobj.altStr.push(" = the highest of either\n \u2022 " + creaHp + " from " + creaName + "'s normal maximum HP, or\n \u2022 4 \xD7 " + rngrLvl + " from four times my ranger level (" + rngrCompHp + ")");
		},
	/*	hp // OPTIONAL //
		TYPE:	function
		USE:	change how Hit Points are calculated and what the Hit Points tooltip says

		This function works identical to the `calcChanges.hp` function found in the
		"_common attributes.js" file.
		Please look there for a complete explanation.
	*/
		setAltHp : true,
	/*	setAltHp // OPTIONAL //
		TYPE:	boolean
		USE:	set the maximum HP field to automatically assume the alternative calculation method added with the `hp` function

		This attribute will only work if you set the `hp` attribute (see above) in the same object.
		Set this attribute to true if you push a value to the HDobj.alt array with the function in the `hp` attribute.

		Setting this attribute to false is the same as not including it.
	*/
	},

	eval : function(prefix, lvl) {
		var fldName = prefix + "Comp.Use.Speed";
		var newSpeed = "40 ft, fly 60 ft, swim 40 ft";
		if (What("Unit System") === "metric") newSpeed = ConvertToMetric(newSpeed, 0.5);
		Value(fldName, newSpeed);
	},
/*	eval // OPTIONAL //
	TYPE:	function
	USE:	runs a piece of code when the creature is selected on the Companion page

	The function is passed two variables:
	1) The first variable is a string: the prefix of the Companion page this creature was selected on
		You can use this variable to call on fields on that page. The example above uses it to set
		the speed to something else.
	2) The second variable is an array with 2 numbers: the old level and the new level
		e.g. lvl = [0,5] when the creature gets added and the character is 5th level
		The first entry, the old level, is the level that was passed as the second entry the last time
		this function was called.
		The first entry will be zero (0) as this is only called when the creature is added for the first time.
		The second entry, the new level, is the current main character level.
		The new level passed can be different than the main character level if the attribute
		`minlevelLinked` exists, see above.

	This can be any JavaScript you want to have run whenever this creature is selected on a Companion page.
	This attribute is processed last, after all other attributes are processed.
*/

	removeeval : function(prefix, lvl) {
		var fldName = prefix + "Comp.Use.Speed";
		var newSpeed = "30 ft, fly 45 ft, swim 30 ft";
		if (What("Unit System") === "metric") newSpeed = ConvertToMetric(newSpeed, 0.5);
		Value(fldName, newSpeed);
	},
/*	removeeval // OPTIONAL //
	TYPE:	function
	USE:	runs a piece of code when the creature is removed from the Companion page

	The function is passed two variables:
	1) The first variable is a string: the prefix of the Companion page this creature was selected on
		You can use this variable to call on fields on that page. The example above uses it to set
		the speed to something else.
	2) The second variable is an array with 2 numbers: the old level and the new level
		e.g. lvl = [0,5] when the creature gets added and the character is 5th level
		The first entry, the old level, is the level that the creature had before being removed.
		The second entry, the new level, will be zero (0) as this is only called when the creature is being removed.

	This can be any JavaScript you want to have run whenever the creature is removed from a Companion page.
	This attribute is processed last, after all other attributes are processed.
*/

	changeeval : function(prefix, lvl) {
		Value( prefix + "Comp.Use.HD.Die", lvl[1] < 15 ? 8 : 10 );
	},
/*	changeeval // OPTIONAL //
	TYPE:	function
	USE:	runs a piece of code every time the main character's level changes
	ADDED:	v13.0.6

	"Main character" refers to the character on the first page.
	A companion doesn't have its own 'level' that is used for the automation.

	The function is passed two variables:
	1) The first variable is a string: the prefix of the Companion page this creature was selected on
		You can use this variable to call on fields on that page. The example above uses it to set the
		creature's hit dice size depending on the character's level (d8 or d10, if level 15 or higher).
	2) The second variable is an array with 2 numbers: the old level and the new level
		e.g. lvl = [0,5] when the creature gets added and the character is 5th level
		The first entry, the old level, is the level that was passed as the second entry the last time
		this function was called.
		The first entry will be zero (0) if the creature is added for the first time.
		The second entry, the new level, is the current main character level.
		The new level will be zero (0) if the creature is being removed.
		The new level passed can be different than the main character level if the attribute
		`minlevelLinked` exists, see above.

	This can be any JavaScript you want to have run whenever the level changes.
	This attribute is processed last, after all other attributes have been processed.
	It is processed both when the creature is first added to the companion page and
	when the main character's level changes, but not when the creature is removed.
*/

// >>>>>>>>>>>>>>>>>>>>>>>>>>>> //
// >>> Wild Shape Page Only >>> //
// >>>>>>>>>>>>>>>>>>>>>>>>>>>> //
/*
	The below attributes won't affect anything when the creature is select as a companion,
	but they will work on a Wild Shape page.
*/

	wildshapeString : "Darkvision 60 ft; Tremorsense 60 ft| Knows Terran| Vulnerable to: thunder| Resistant to: bludgeoning, piercing, and slashing from nonmagical weapons| Immune to: poison, exhaustion, paralyzed, petrified, poisoned, unconscious| Earth Glide: can burrow through nonmagical, unworked earth and stone without disturbing the material| Siege Monster: does double damage to objects and structures",
/*	wildshapeString	// OPTIONAL	 //
	TYPE:	string
	USE:	add text to the Traits & Features section on the Wild Shape page

	When selecting a creature on the Wild Shape page that has this attribute, this string will be displayed
	in the Traits & Features section and nothing else.

	Normally, the content of the Traits & Features section on the Wild Shape page will be generated
	automatically from all descriptive attributes that contain strings (e.g. senses, languages, traits, etc.).
	However, that can result in too much content for the limited space on the Wild Shape pages and
	hence the need for the `wildshapeString` attribute.
*/
}
