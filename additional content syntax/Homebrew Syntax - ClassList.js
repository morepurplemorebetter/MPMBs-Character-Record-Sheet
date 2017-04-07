/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This is the syntax for adding a new class to the sheet
				Note that you will need the syntax for adding a subclass as well if you want the class to have any choices for subclasses
	Sheet:		v12.84 (2017-02-21)
*/

ClassList["myclass"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

	regExpSearch : /^(?=.*my)(?=.*class).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "my" and "class" in it, disregarding capitalization). If this looks to complicated, just write: /myclass/i
	
	name : "MyClass", //required; the name to use for the class
	
	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js"
	
	primaryAbility : "\n \u2022 MyClass: Dexterity;", //required; the text to display when citing the primary ability of the class
	
	prereqs : "\n \u2022 MyClass: Dexterity 13;", //required; the text to display when citing the prerequisite for the class when multiclassing
	
	die : 10, //required; the type of hit die the class has (i.e. 10 means d10)
	
	improvements : [0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7], //required; the amount of ability score improvements (or feats) at each level. Note that there are 20 entries, one for each level. This example uses the Fighter's progression
	
	saves : ["Str", "Con"], //required; the two save proficiencies.
	
	skills : ["\n\n" + toUni("MyClass") + ": Choose two from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival.", "\n\n" + toUni("MyClass") + ": Choose one from Athletics, Intimidation, Perception, and Survival."], //required; the text to display for skill proficiencies. Note the \n\n at the start, they are important! The first entry is for when the class is the primary class, the second entry is for when the class is taken later as part of a multiclass
	
	tools : ["Three musical instruments", "One musical instrument"], //optional; tool proficiencies the class gives. The first entry is for when the class is the primary class, the second entry is for when the class is taken later as part of a multiclass. If the class doesn't give any tool proficiencies, you can delete this line
	
	armor : [ //required; the 4 entries are for: ["light", "medium", "heavy", "shields"]
		[true, true, true, true], //required; the armor proficiencies if this is the first or only class
		[true, true, false, true] //required; the armor proficiencies if this class is multiclassed with (so not taken at level 1, but later)
	],
	
	weapons : [ //required; the 3 entries are for: ["simple", "martial", "other"]
		[true, false, ["hand crossbow", "longsword", "rapier", "shortsword"]], //required; the armor proficiencies if this is the first or only class
		[true, false, ["hand crossbow"]] //required; the weapon proficiencies if this class is multiclassed with (so not taken at level 1, but later)
	],
	
	equipment : "MyClass starting equipment:\n \u2022 Chain mail -or- leather armor, a longbow, and 20 arrows;\n \u2022 A martial weapon and a shield -or- two martial weapons;\n \u2022 A light crossbow and 20 bolts -or- two handaxes;\n \u2022 A dungeoneer's pack -or- an explorer's pack.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.", //required; the text to display when citing the starting equipment
	
	subclasses : ["Martial Archetype", ["champion", "battle master", "eldritch knight", "purple dragon knight"]], //required; the names of the subclasses. The first entry is the overal name that is given to the subclasses, the second entry is a list of the subclass, using the exact names of the entry of the subclasses in the ClassSubList. //Note that if one of the entries in the array of subclasses doesn't exist in the ClassSubList, the sheet will throw an error as soon as you make a character with levels in this class
	
	prestigeClassPrereq : 5, //optional; if you include this attribute, the sheet will consider the class a prestige class // You can make this attribute a number, which represents the levels the character must have before being able to gain the prestige class. Alternatively, you can make this attribute a string, which can be evaluated with eval() and returns either true (prereqs met) or false (prereqs not met).
	
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3], //required; the amount of attacks at each level. Note that there are 20 entries, one for each level.
	
	abilitySave : 4, //optional, but required for a spellcaster; the ability score to use for the Ability Saving Throws. Remove this line if your class has no Ability that requires Saving Throws. (Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6)
	
	abilitySaveAlt : 2,//optional; if the class offers a choice between two ability scores to be used to determine the DC, you can put that secondary one here (Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6)
	
	spellcastingFactor : 3, //required for a spellcaster; the speed with which spell progression works type 1 for full spellcasting (Cleric), 2 for half spellcasting (Paladin), and 3 for one-third spellcasting (Arcane Trickster). This can be any positive number other than 0. Remove this line if your class has no spellcasting. If your character uses the Warlock way of spellcasting, write "warlock1" here. The 1 indicates the spell progression factor. You can change it to a 2 or 3 to have half or one-third spell progression (or to any other factor you like).
		// You can also have this refer to a Spell Slot progression you define yourself, as a separate variable (see "Homebrew Syntax - SpellTable.js"). In order to do this the name of that variable and the spellcastingFactor must match. Using the name "purplemancer" for example would mean that here you put [spellcastingFactor : "purplemancer1"] (the 1 is the factor, this can be any positive number other than 0) while for the variable containing the table you use "purplemancerSpellTable". Note that the name is all lower case!
		
	spellcastingTable : [ //optional, only if you want to use a non-standard table for spell slot progression and just for this one (sub)class. You can either use the spellcastingTable attribute, or define a new SpellTable in a separate variable (see "Homebrew Syntax - SpellTable.js"). If you are addin multiple classes that use the same table, please add it as a separate variable, for otherwise the spell slots will be added up per individual class level instead of adding the class levels together to find the total amount of spell slots
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
		[0, 0, 0, 2, 0, 0, 0, 0, 0], //lvl20
	],
	
	spellcastingKnown : { //Optional; Denotes the amount and type of spells the class has access to
	
		cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], //Optional; This can either be one number, an array of 20 numbers, or be ommitted for a class that doesn't have access to cantrips. The numbers reflect the amount of cantrips known
		
		spells : [4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 13, 13, 14, 14, 15, 16, 16, 16],//Optional; This can either be one number, an array of 20 numbers, or be ommitted for a class that doesn't have access to spells. The numbers reflect the amount of spalls known. For a class that doesn't know spells, but prepares them from a list, you should put "list" here. For a class that uses a spellbook, you should put "book" here.
		
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
			choicesNotInMenu : true, //optional: this tells the sheet not to put the choices into the "Choose Options" menu on the second page. Use this is you want to have the choices selected through another class feature. See for an example of this the "Draconic Bloodline" sorcerer archetype.
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
				
					atkDmg : ["eval string", "explanation string"], //optional; change something in the calculation of the damage of attacks; The first value in the array is stringified code that is run using eval(), the second entry is an explanation of what is being altered so that it can be displayed in a dialogue. This second entry can be left empty, like ""
					
					atkHit : ["eval string", "explanation string"], //optional; works just like atkDmg, but affects the To Hit calculation
					
					atkAdd : ["eval string", "explanation string"], //optional; works just like atkDmg, but affects the weapon attributes when they are applied to the sheet. With this you can change the weapon's description, range, damage die, attribute, etc. etc.
					
					hp : "extrahp += totalhd; extrastring += \"\n + \" + totalhd + \" from Dwarven Toughness\";", //optional; string to be run using eval() when calculating the number of HP in the HP tooltip and automation
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
				
				class : "wizard", //required; see "spellcastingList" object
				
				level : [0, 0], //optional; see "spellcastingList" object
				
				school : ["Necro"], //optional; see "spellcastingList" object
				
				spells : ["light"], //optional; see "spellcastingList" object
				
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
			recovery : "short rest", //required if "usages" is defined; way of getting the limited feature recharged. If you define either "long rest" or "short rest" (note the lower case), than the feature is also added to the limited features
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
		},
		
		"subclassfeature3" : { //You need at least one entry named "subclassfeatureX". It signals the sheet to ask the user for which subclass he would like to have. The level of this feature should match the level the class needs to select a subclass. Once a subclass is selected, any feature with "subclassfeature" in the object name in the class entry will be ignored.
			name : "Martial Archetype",
			source : ["P", 72],
			minlevel : 3,
			description : "\n   " + "Choose a Martial Archetype you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Champion, Battle Master, Eldritch Knight, or Purple Dragon Knight",
		},
		
		"subclassfeature3.1" : {
			name : "", //any feature whos name is empty like this one is, will be ignored. Since v12.5 of the sheet, an entry like this serves no function
			minlevel : 3,
		},
	}
}