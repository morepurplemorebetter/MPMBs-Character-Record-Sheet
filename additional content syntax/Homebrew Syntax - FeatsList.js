/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Feat
	Effect:		This is the syntax for adding a new feat
	Sheet:		v12.98 (2017-04-28)
*/

FeatsList["extra ability"] = { //Object name; note the use of only lower case! The spelling here is used to identify the feat with. Also note the absence of the word "var" and the use of brackets []

	name : "Extra Ability", //Required
	
	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js"
	
	description : "Advantage on Charisma (Deception) and (Performance) if trying to pass as another. I can mimic a person's speech or other creature's sounds if I've heard it for at least 1 minute. Wisdom (Insight) vs. Charisma (Deception) to determine the sound is faked. [+1 Charisma]", //Required; the description as it will appear in the form field on the sheet
	
	prerequisite : "Dexterity 13 or higher", //Optional; adds a prerequisite to the feat (this line can be removed if not applicable)
	
	improvements : "Actor (feat): +1 Charisma;", //Optional; the text that will be displayed when needing to give a list of all the ability score improvements from various sources (such as in the Ability Score dialog) [this line can be removed if not applicable]
	
	armor : [false, false, true, false], //Optional; the 4 entries are for proficiency in: ["light", "medium", "heavy", "shields"]. Be sure to always add all four statements of true/false!
	
	weapons : [true, false, ["hand crossbow"]], //Optional; the 3 entries are for: ["simple", "martial", "other"]. Be sure to always add both statements of true/false!
	
	skills : "\n\nSkilled (feat): Choose three skills or tools." //Optional; adds the following text to any display of skills gained. Take note of the leading "\n\n", they are essential. (this line can be removed if not applicable)
	
	calculate : "event.value = \"I can spend 10 minutes inspiring up to 6 friendly creatures within 30 feet who can see or hear and can understand me. Each gains lvl (\" + What(\"Character Level\") + \") + Cha mod (\" + What(\"Cha Mod\") + \") temporary hit points. One can't gain temporary hit points from this feat again until after a short rest.\"", //Optional; this can be used instead of a description. This will set a calculated value for the feat field instead of a description. Note the use of \" within the syntax instead of just ""
	
	action : ["reaction", ""] //optional; adds the name of this feat to the reaction list when chosen. The options are "action", "bonus action", and "reaction" //the second value in the array is added as a suffix for the "name" of the feature when entered into the action field
				
	calcChanges : { //optional; adds stuff to the calculation of attacks and/or HP
		
		hp : "if (classes.known.sorcerer) {extrahp += classes.known.sorcerer.level; extrastring += \"\\n + \" + classes.known.sorcerer.level + \" from Draconic Resilience (Sorcerer)\";};", //optional; string to be run using eval() when calculating the number of HP in the HP tooltip and automation
		
		atkCalc : ["if (isOffHand) {output.modToDmg = true; }; ", "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks."], //optional; change something in the calculation of the Damage and To Hit of attacks; The first value in the array is stringified code that is run using eval(), the second entry is an explanation of what is being altered so that it can be displayed in a dialogue. This second entry can be left empty, as ""
		
		atkAdd : ["if (WeaponName.match(/unarmed strike/i)) {fields.Description += 'Counts as magical';}; ", "My unarmed strikes count as magical for overcoming resistances and immunities."], //optional; works just like atkDmg, but affects the weapon attributes when they are applied to the sheet. With this you can change the weapon's description, range, damage die, attribute, etc. etc. However, this will only be applied to recognized weapons
		
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

};

UpdateDropdown("feat"); //Optional; This updates all feat dropdown fields