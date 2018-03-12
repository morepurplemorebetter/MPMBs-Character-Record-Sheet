/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Feat
	Effect:		This is the syntax for adding a new feat
	Sheet:		v13.00.00 (2018-??-??) [identical to v12.999 syntax, except v12.999 uses 'borrow' for the burrow speed]
*/

var iFileName = "Homebrew Syntax - FeatsList.js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

FeatsList["extra ability"] = { //Object name; note the use of only lower case! The spelling here is used to identify the feat with. Also note the absence of the word "var" and the use of brackets []

	name : "Extra Ability", //Required
	
	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]
	
	description : "Advantage on Charisma (Deception) and (Performance) if trying to pass as another. I can mimic a person's speech or other creature's sounds if I've heard it for at least 1 minute. Wisdom (Insight) vs. Charisma (Deception) to determine the sound is faked. [+1 Charisma]", //Required; the description as it will appear in the form field on the sheet
	
	prerequisite : "Dexterity 13 or higher", //Optional; adds a prerequisite to the feat (this line can be removed if not applicable)
	
	improvements : "Actor (feat): +1 Charisma;", //Optional; the text that will be displayed when needing to give a list of all the ability score improvements from various sources (such as in the Ability Score dialog) [this line can be removed if not applicable]
	
	armor : [false, false, true, false], //Optional; the 4 entries are for proficiency in: ["light", "medium", "heavy", "shields"]. Be sure to always add all four statements of true/false!
	
	weapons : [true, false, ["hand crossbow"]], //Optional; the 3 entries are for: ["simple", "martial", "other"]. Be sure to always add both statements of true/false!
	
	skills : "\n\nSkilled (feat): Choose three skills or tools." //Optional; adds the following text to any display of skills gained. Take note of the leading "\n\n", they are essential. (this line can be removed if not applicable)
	
	calculate : "event.value = \"I can spend 10 minutes inspiring up to 6 friendly creatures within 30 feet who can see or hear and can understand me. Each gains lvl (\" + What(\"Character Level\") + \") + Cha mod (\" + What(\"Cha Mod\") + \") temporary hit points. One can't gain temporary hit points from this feat again until after a short rest.\"", //Optional; this can be used instead of a description. This will set a calculated value for the feat field instead of a description. Note the use of \" within the syntax instead of just ""
	
	action : ["reaction", ""], //optional; adds the name of this feat to the reaction list when chosen. The options are "action", "bonus action", and "reaction" //the second value in the array is added as a suffix for the "name" of the feature when entered into the action field
				
	calcChanges : { //optional; adds stuff to the calculation of attacks and/or HP
		
		hp : "if (classes.known.sorcerer) {extrahp += classes.known.sorcerer.level; extrastring += \"\\n + \" + classes.known.sorcerer.level + \" from Draconic Resilience (Sorcerer)\";};", //optional; string to be run using eval() when calculating the number of HP in the HP tooltip and automation
		
		atkCalc : ["if (isOffHand) {output.modToDmg = true; }; ", "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks."], //optional; ["eval string", "explanation string"]; change something in the calculation of the Damage and To Hit of attacks; The first value in the array is stringified code that is run using eval(), the second entry is an explanation of what is being altered so that it can be displayed in a dialogue. This second entry can be left empty, as ""
		
		atkAdd : ["if (WeaponName.match(/unarmed strike/i)) {fields.Description += 'Counts as magical';}; ", "My unarmed strikes count as magical for overcoming resistances and immunities."], //optional; ["eval string", "explanation string"]; works just like atkDmg, but affects the weapon attributes when they are applied to the sheet. With this you can change the weapon's description, range, damage die, attribute, etc. etc. However, this will only be applied to recognized weapons
		
			// Note that you need to use two back slashes for things in the eval code here, because it is first added to a string, and then run as code. See the hp for an example, with the \\n
			
			// For the eval strings for the attack calculations ('atkCalc' or 'atkAdd') there are some variables that you can use to test against:
				
				// The variable WeaponName contains the recognized weapon object name as it is used in the WeaponsList object (or "" in atkCalc if the weapon is not a recognized weapon);
			
				// The object "theWea" is the WeaponsList[WeaponName] object for the recognized weapon (or 'undefined' in atkCalc if the weapon is not a recognized weapon);
				
				// You can use the booleans 'isOffHand', 'isMeleeWeapon', 'isRangedWeapon', 'isSpell' (also true for cantrips), 'isDC'
				
				// If the attack is a spell that is found on the SpellList, the variable thisWeapon[3] contains the name of the entry in the SpellList
			
				// The object "fields" has all the values of the different fields of the attack (fields.Proficiency, fields.Mod, fields.Range, fields.Damage_Type, fields.Description, fields.To_Hit_Bonus, fields.Damage_Bonus, fields.Damage_Die, fields.Weight);
			
				// You can change the attributes of the "fields" object with the eval-string of atkAdd to affect what is put into the fields.
			
				// You can use the attributes of the "fields" object with the eval-string of atkCalc to check for things, but changing them will have no effect on the sheet.
			
				// With the atkCalc you have to change the "output" object in order to affect the outcome of the calculations. This object has the following attributes: output.prof (wether or not to add the proficiency bonus to the To Hit), output.die (Damage Die to use), output.mod (ability modifier), output.modToDmg (wether or not to add the ability modifier to Damage), output.magic (any magic bonus that's to be added to both To Hit and Damage), output.bHit (the To Hit bonus from the Blue Text/Modifier field), output.bDmg (the Damage bonus from the Blue Text/Modifier field), output.extraHit (a number added to the To Hit that is reserved for this eval), output.extraDmg (a number added to the damage that is reserved for this eval)
	},
	
	spellcastingBonus : { //optional; an object that adds something to the "Bonus Spells" section of the spell selection dialog //this object can have all the same attributes as the "spellcastingList" object as defined in the ClassList, but must also have an "spellcastingAbility" defined //the other things that can be defined in this that are not in the "spellcastingList" object, are the "selection", "times" and "prepared" values
	
		name : "feat bonus spell", //required; the name of the bonus ability as it will appear in the spell selection dialogue
	
		spellcastingAbility : 6, //required; the ability score to use for spellcasting. (Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6)
		
		class : "wizard", //optional but required if not including the "spells" attribute; The name of the class from whose spell list the spells come from. This can be "any" if the spells are not limited by a spell list of just one class. The entry has to match the name of the class in the SpellsList
		
		school : ["Evoc", "Abjur"], //optional; An array of abbreviations of spell school names (see SpellsList). These have to be in an array, even if it is just one value. Each entry has to match the name of the spell school in the SpellsList
		
		level : [0, 4], //Optional; The lower and upper limit of spell levels that the class has access to.
		
		ritual : false, //Optional; Donates if only ritual (true) or only non-ritual (false) spells should be included in the list
		
		spells : ["light", "mending"], //Optional, but required if not including the "class" attribute; If a "spells" array is present, all other objects will be ignored and only this list of spells will populate the list of available spells. each entry has to match the name of the spell in the SpellsList
		
		selection : ["light"], //optional if "spells" is defined; this is the default selection for the array specified in "spells" //if you use the "times" attribute below, you can add one item in this array for every one of the times
		
		times : 2, //optional; this is the number of times the bonus spells should be added. //This can also be an array of 20 values. That way the number of times are level-dependent
		
		prepared : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to automatically get a checked off checkbox in the first column, similar to domain spells for a cleric
		
		atwill : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to get "At Will" in the first column
		
		oncesr : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to get "1×SR" in the first column
		
		oncelr : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to get "1×LR" in the first column
	},
	
	savetxt : { // Optional; this attribute defines entries to add to the field for "Saving Throw Advantages / Disadvantages"
	
		text : ["Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg", "Magic can't put me to sleep"], // Optional; this is an array of strings, and each of those strings is added to the field exactly as presented here
		
		immune : ["poison", "disease"], // Optional; this is an array of strings that the character is immune to. This is put in the field after the text "Immune to ", so in this example it would result in "Immune to poison and disease"
		
		adv_vs : ["traps", "charmed"] // Optional; this is an array of things that the character has advantage on saves against. This is put in the field after the text "Adv. on saves vs. ", so in this example it would result in "Adv. on saves vs. traps and charmed"
	},

	dmgres : ["Poison"], //optional; an array of damage types that the feat gives resistance against. // If the resistance has a condition attached to it, like only being against nonmagical attacks, substitute the entry in the array with an array of 2: [the damage type, the damage type with the condition]. // For example: [["Bludgeoning", "Bludg. (nonmagical)"], ["Piercing", "Pierc. (nonmagical)"], ["Slashing", "Slash. (nonmagical)"]]
	
	saves : ["Con"], //optional; an array of the ability scores with which the feat grants proficiency in saving throws
	
	toolProfs : [["Musical instrument", 3], ["Thieves' tools", "Dex"]], // optional; this is an array with the tool proficiencies gained. Each entry can be its own array of 2 entries. The first entry is the name of the tool and the second entry is either 1) a number if the tool is yet to be chosen, or 2) the 3-letter ability score abbreviation if the tool is to be listed in the skill section and have a bonus calculated
	
	languageProfs : [1, "Elvish"], // optional; this is an array of the language proficiencies gained. An entry can either be 1) a string that represents the language learned or 2) a number which is the number of language gained that can be chosen by the player
	
	vision : [["Darkvision", 60], ["Sunlight Sensitivity", 0]], //optional; An array of arrays that each have a length of 2; This adds the first value of each array to the Senses field. The second value is the range in feet. If no range is needed, put a 0 there. You can also add a modifier like "+30" or "*2" to have the appropriate calculation done with the range of sense
	
	addMod : { type : "skill", field : "Init", mod : "Int", text : "I can add my Intelligence modifier to initiative rolls." }, //optional; This is an object, or an array of similar objects, for adding a modifier to a modifier field. Using this will make it so that the modifier is added to any value that is already there. // The 'mod' attribute can be any combination of numbers, mathematical operators, and three-letter ability score abbreviations // The 'type' attribute can be "skill" or "save", but can also be left empty "" // The 'field' attribute depends on the type, for "skill" it can be the name of a skill, or "Init" for initiative, or "All" for the all skills modifier; for "save" it can be the three-letter abbreviation of an ability score, or "All" for the all saves modifier. // If the 'type' attribute is left empty, the 'field' attribute has to be the exact name of the field the modifier has to be added to // The 'text' attribute is an explanation of why the modifier was added //NOTE: for modifiers to attacks, use calcChanges

	speed : { //optional; This sets a value for one or more speed modes, and/or a value to be added to a specific speed mode or to all speed modes // the attributes of this object can be "walk", "burrow", "climb", "fly", "swim", and "allModes"
		
		// all of the following attributes are optional and you can add more ("burrow" isn't part of this example!)
		
		walk : { spd : 30, enc : 20 }, // the objects "walk", "burrow", "climb", "fly", "swim" are all the same, they are an object with two attributes, 'spd' for the speed in feet, and 'enc' for the encumbered speed in feet.
		
		climb : { spd : "+50", enc : 0 }, // instead of numbers, you can also have modifiers. Modifiers are a string, starting with a mathematical operator, followed by a number (e.g. "-10", "+20"). // a value that is zero is ignored
		
		fly : { spd : "walk", enc : 0 }, // instead of a number/modifier, you can also set the attribute to "walk". This makes the speed mode assume the walking speed // Using an underscore as the first character means the value is only added if the value would be non-zero
		
		swim : { spd : "fixed 60", enc : "fixed 60" }, // if you include the word "fixed" together with a number, the movement mode will be that number, without any modifiers from other sources (like the Monk's speed bonus). However, if another entry that isn't 'fixed' does end up with a higher total while including any modifiers, that speed is used instead
		
		allModes : "+10" // the 'allModes' attribute can only consist of a modifier. This modifier is applied to all speed modes, both normal and encumbered. It is only applied if the speed mode exists, it won't give the character a burrow speed if it would otherwise have none, for example
	},
	
	usages : 1, //optional; number of times it can be used. This can be only be one value, the feat doesn't support having an array for different things per level. It is recommended to use a numerical value, but you can use a string
	
	recovery : "short rest", //required if "usages" is defined; way of getting the limited feature recharged. Only if you define both the 'usages' and 'recovery' will the feature be added to the limited features
	
	addarmor : "Dragon Hide", //optional; a string of the name of the armour that is literally put in the Armor Description field when the feat is added, and removed when the feat is removed
};
