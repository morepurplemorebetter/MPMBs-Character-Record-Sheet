/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This is the syntax for adding a new race to the sheet
				Note that you will need to define the race once for every sub-race (i.e. there is a separate entry for High Elf, Wood Elf, and Dark Elf)
				For races that have variants, like the human, you can define a variant using the RaceSubList. Any variant defined like that will only be selectable through the "Racial Options" button
	Sheet:		v12.83 (2017-02-18)
*/

RaceList["something catlike"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

	regExpSearch : /^(?=.*something)(?=.*catlike).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "something" and "catlike" in it, disregarding capitalization). If this looks to complicated, just write: /something catlike/i
	
	name : "Something Catlike", //required; the name to use for the race
	
	sortname : "Catlike, Something", //optional; this is the name used to fill the drop-down boxes. If you don't include this, the 'name' will used instead
	
	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js"
	
	plural : "Somethings Catlike", //required; the name to use for the race when the plural form is used
	
	size : 3, //required;  the size of the race (Gargantuan = 0, Huge = 1, Large = 2, Medium = 3, Small = 4, Tiny = 5)
	
	speed : [30, 20], //required;  the speed of the race in feet. The first entry is the base speed, the second entry is the encumbered speed
	
	languages : ["Common", "Celestial"], //optional; the language(s) known by any of the race
	
	weapons : ["talons"], //optional; an array of weapons that are added to the attacks section; These weapons need to be defined in the WeaponsList
	
	vision : "Darkvision 60 ft", //optional;  vision granted by the race. This text will be put in the "Senses" section on the sheet. This line can be deleted if you don't have anything to put here
	
	dmgres : ["necrotic", "radiant"], //optional; damage resistance(s) the race has. This line can be deleted if you don't have anything to put here
	
	savetxt : "Adv. vs. being charmed; Magic can't put me to sleep", //optional; damage resistance(s) the race has. This line can be deleted if you don't have anything to put here
	
	weaponprofs : [false, false, ["longsword", "shortsword", "longbow", "shortbow"]], //optoinal; Weapon proficiencies the race has. This line can be deleted if you don't have anything to put here //the 3 entries are for: ["simple", "martial", "other"]
	
	tools : ["Three musical instruments", "Tinker's tools"], //optional; Tool proficiencies the race has. This line can be deleted if you don't have anything to put here. Each string in the array will be put into a different tools field
	
	skills : ["Perception", "Deception"], //optional; Skill proficiencies the race has. This line can be deleted if you don't have anything to put here. If the race doesn't give fixed proficiencies, but instead gives a choice, delete this line and use the line below, "skillstxt"
	
	skillstxt : "Choose any two skills",  //optional; Skill proficiencies the race has. This line can be deleted if you don't have anything to put here. If the race only gives fixed skill proficiencies (no choices), then delete this line and only use "skills" above
	
	age : " reach adulthood in their late teens and live around 100 years", //optional; the age tooltip/mouseover text (will be displayed in combination with the "plural" entry)
	
	height : " range from 5 to over 6 feet tall (4'9\" + 2d8\")", //optional; the height tooltip/mouseover text (will be displayed in combination with the "plural" entry)
	
	weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)", //optional; the weight tooltip/mouseover text (will be displayed in combination with the "plural" entry)
	
	heightMetric : " range from 1,5 to over 1,8 metres tall (145 + 5d8 cm)", //optional; the height tooltip/mouseover text (will be displayed in combination with the "plural" entry), when the metric system is chosen
	
	weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)", //optional; the weight tooltip/mouseover text (will be displayed in combination with the "plural" entry), when the metric system is chosen
	
	improvements : "Something Catlike: +1 Dexterity, +2 Wisdom;", //required; the text that is displayed when listing all the ability score improvements
	
	scores : [0, 1, 0, 0, 2, 0], //required; the ability score improvements as used by the Ability Score dialog. The syntax is: [Str, Dex, Con, Int, Wis, Cha]
	
	trait : "Something Catlike (+1 Dexterity, +2 Wisdom)\nCelestial Legacy:\n   I know the Light cantrip.\n   Once I reach 3rd level, I can cast the Lesser Restoration spell once per long rest.\nBreath Weapon: Exhale destructive energy as an action with a size, shape, saving throw type, and damage type as found in the table. All in the area must make a saving throw with DC 8 + Wis modifier + prof bonus. It does 2d6 (+1d6 at level 6, 11, 16) damage, half as much damage on a successful save. I can use it again after a short rest.", //required; the racial trait as it will be put in the Racial Trait field on the second page (note that "\n" is a line break).
	
	abilitySave : 5,  //optional; the ability score to use for the Ability Saving Throws. Remove this line if your race has no Ability that requires Saving Throws. (Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6)
	
	variants : ["something great catlike"], //optional; the names of the racial variants, using the exact names of the entry of the variants given in the RaceSubList (note the use of only lower case)
	
	spellcastingAbility : 6, //required for a spellcaster; the ability score to use for spellcasting. Remove this line if your race has no spellcasting. (Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6)
	
	spellcastingBonus : { //optional; an object that adds something to the "Bonus Spells" section of the spell selection dialog //this object can have all the same attributes as the "spellcastingList" object as defined in the ClassList, but must also have a "name" defined //the other things that can be defined in this that are not in the "spellcastingList" object, are the "selection", "times" and "prepared" values
	
		name : "Arcane Initiate", //required; this is used to identify the object, so must be an unique name
		
		class : "wizard", //optional but required if not including the "spells" entry; The name of the class from whose spell list the spells come from. This can be "any" if the spells are not limited by a spell list of just one class. The entry has to match the name of the class in the SpellsList
		
		school : ["Evoc", "Abjur"], //optional; An array of abbreviations of spell school names (see SpellsList). These have to be in an array, even if it is just one value. Each entry has to match the name of the spell school in the SpellsList
		
		level : [0, 4], //Optional; The lower and upper limit of spell levels that the class has access to.
		
		ritual : false, //Optional; Donates if only ritual (true) or only non-ritual (false) spells should be included in the list
		
		spells : ["light", "mending"], //Optional, but required if not including the "class" entry; If a "spells" array is present, all other objects will be ignored and only this list of spells will populate the list of available spells. each entry has to match the name of the spell in the SpellsList
		
		selection : ["light"], //optional if "spells" is defined; this is the default selection for the array specified in "spells"
		
		times : 2, //optional; this is the number of times the bonus spells should be added. //This can also be an array of 20 values. That way the number of times are level-dependent
		
		prepared : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to automatically get a checked off checkbox in the first column, similar to domain spells for a cleric
		
		atwill : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to get "At Will" in the first column
		
		oncesr : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to get "1×SR" in the first column
		
		oncelr : true, //optional; if set to 'true', this makes the spell selected for this/these bonus spells to get "1×LR" in the first column
	},
	
	features : { //optional; the racial features. Each works the same way, so only a couple of example are given. You can add as many as you want. If the race has no level-dependent or limited features, you can just delete the whole feature entry all together
	
		"lesser restoration" : { //note the use of lower case characters
		
			name : "Lesser Restoration", //required; the name of the racial feature
			minlevel : 3, //required; the level at which the feature is gained
			
			usages : 1, //optional; number of times it can be used. This can be one value, but can also be an array of 20 values, one for each level
			
			recovery : "long rest", //required if "usages" is defined; way of getting the limited feature recharged. If you define either "long rest" or "short rest" (note the lower case), than the feature is also added to the limited features
			
			tooltip : " (Celestial Legacy)", //optional; the tooltip added to the entry in the Limited Feature section, this example will read "Lesser Restoration is gainged from Something Catlike (Celestial Legacy)"
			
			action : ["action", ""],
			
			spellcastingBonus : { //optional; works just like the "spellcastingBonus" object defined above
				name : "Celestial Legacy (level 3)",
				spells : ["lesser restoration"],
				selection : ["lesser restoration"],
				oncelr : true,
			},
				
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
			}
		},
		
		"breath weapon" : {
			name : "Breath Weapon",
			minlevel : 1,
			usages : 1,
			additional : ["2d6", "2d6", "2d6", "2d6", "2d6", "3d6", "3d6", "3d6", "3d6", "3d6", "4d6", "4d6", "4d6", "4d6", "4d6", "5d6", "5d6", "5d6", "5d6", "5d6"],  //optional; text to display in the description field of the limited feature. This can be one value, but can also be an array of 20 values, one for each level.
			recovery : "short rest",
			tooltip : "",
			
			action : ["action", ""], //optional; adds the name of this choice to the action list when chosen. The options are "action", "bonus action", and "reaction" //the second value in the array is added as a suffix for the "name" of the feature when entered into the action field
		},
	}
	
};

UpdateDropdown("race"); //Optional; This updates all race dropdown fields (both on first page and companion pages)