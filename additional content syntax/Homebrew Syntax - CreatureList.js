/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Creature
	Effect:		This is the syntax for adding a creature that can be used on the Companion and Wild Shape pages
	Sheet:		v12.87 (2017-03-09)
*/

CreatureList["big cat"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets [] //the name entered here is used to identify the input, so it has to be the same as the "name : " below, but in lower case
	
	name : "Big Cat", // Required; the name to use for the race
	
	source : ["HB", 0], // Optional; the source and the page number. Adding this makes it possible to exclude the creature with the "Sources" function. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js"
	
	size : 2, // Required; the size of the race (Gargantuan = 0, Huge = 1, Large = 2, Medium = 3, Small = 4, Tiny = 5)
	
	type : "Fiend", // Required; the type of the creature. Always put something here!
	
	subtype : "devil", // Required; the subtype of the creature. Do not delete this line, but it can be just ""
	
	companion : "mount", // Optional; whether or not the creature will be added to the menu on the companion page. Options are "mount", "familiar", and "pact_of_the_chain" //note the use of only lower case!
	
	alignment : "Unaligned", // Required; the alignment. Always put something here!
	
	ac : 11, // Required; the armour class. Always put something here!
	
	hp : 19, //  Required; the amount of hit points. Always put something here!
	
	hd : [3, 10], //[#, die]. Required; Always put something here!
	
	speed : "45 ft", // Required; the speed of the race in feet (do not forget to put "ft" in the string)
	
	scores : [14, 20, 14, 6, 10, 6], // [Str, Dex, Con, Int, Wis, Cha] Required;
	
	saves : ["", "", "", "", "", ""], // [Str, Dex, Con, Int, Wis, Cha]. Required; The total of each Saving Throw (not just the modifier to the ability modifier). Only put something there if it is different than the normal ability score modifier (so when the creature is proficient or has other bonuses).

	skills : { // Optional; any skill proficiencies the creature has. Enter the name of the skill with the total bonus in that skill, not just the proficiency bonus, but inlcude the ability score modifier as well!
		"perception" : 5,
	}, // if the creature has no skill proficiencies, you can delete the entire traits entry

	damage_vulnerabilities : "radiant", // Optional; damage vulnerabilitie(s) the creature has. This line can be deleted if you don't have anything to put here
	
	damage_resistances : "lightning; thunder; bludgeoning, piercing, and slashing from nonmagical weapons", // Optional; damage resistance(s) the creature has. This line can be deleted if you don't have anything to put here
	
	damage_immunities : "poison", // Optional; damage immunities the creature has. This line can be deleted if you don't have anything to put here
	
	condition_immunities : "exhaustion", // Optional; conditional immunities the creature has. This line can be deleted if you don't have anything to put here
	
	senses : "Darkvision 60 ft", // Required; senses granted by the race. This text will be put in the "Senses" section on the sheet. If you don't have anything to put here, DO NOT DELETE THIS LINE, but just put ""
	
	languages : "", // Required; the language(s) known by the creature, note that they all appear as one string
	
	challengeRating : "5", // Required; the Challenge Rating of the creature. Always put something here!
	
	proficiencyBonus : 3, // Required; Proficiency Bonus the creature has. Always put something here!
	
	attacksAction : 2, // Required; The amount of attacks per Attack action the creature can do. Always put something here!
	
	attacks : [{ // Required; the attacks used for the companion and wild shape page
			name : "Slam", // name of the attack
			ability : 1, // the ability score used to calculate the to hit modifier (and the damage if applicable, see below). [Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6]
			damage : [2, 8, "bludgeoning"], // [#, die, type] First entry is the amount of dice, second is the type of dice, and third is the damage type. //"" for die is allowed, meaning no die will be given, only the first digit will be present.
			range : "Melee (10 ft)", // the attack's range
			description : "Two slam attacks as an Attack action", // the attack's description
			modifiers : [1, "", ""], // bonuses to: [to hit, to damage, add ability to damage]; "" means ignore. //For the first two (to hit and to damage), you can also enter the three-letter abbreviation of an ability score (Str, Dex, Con, Int, Wis, or Cha), to have that ability's modifier added to it. //The last one can be either "" (meaning you add ability modifier to damage) or false (meaning you don't add the ability modifier to damage)
			dc : true, // optional, will make the To Hit field display a DC instead. This will overwrite the first value you put in Modifiers
			tooltip : "Each creature in the elemental's space must make a DC 13 Strength saving throw. On a failure, a target takes 15 (3d8 + 2) bludgeoning damage and is flung up 20 feet away from the elemental in a random direction and knocked prone. If a thrown target strikes an object, such as a wall or floor, the target takes 3 (1d6) bludgeoning damage for every 10 feet it was thrown. If the target is thrown at another creature, that creature must succeed on a DC 13 Dexterity saving throw or take the same damage and be knocked prone.\nIf the saving throw is successful, the target takes half the bludgeoning damage and isn't flung away or knocked prone." // optional, this text will be added to the tooltip of the description field of the attack of the Wild Shape. It will do nothing for the attack on the Companion page
		}, // you can add more by copying what is between the {}, (also include the {}, )and putting it here
	], // if the creature has no attacks, simply put [], DO NEVER DELETE the attack entry

	features : [{ // Optional; features that are added to the companion "Features" section as bullet points after the abovementioned vulnerabilitie, immunities, resistances, senses, and languages //with the Wild Shape, these features are never added
			name : "Air Form", // name of the trait
			description : "The elemental can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing.", // description of the trait
		},
	], // if the creature has no traits, you can delete the entire traits entry

	actions : [{ // Optional; actions that are added to the companion "Traits" section as bullet points //with the Wild Shape, these traits are only added (also as bullet points) if no "wildshapeString" is defined, see below
			name : "Ethereal Stride", // name of the action
			description : "As an action, the nightmare and up to three willing creatures within 5 feet of it magically enter the Ethereal Plane from the Material Plane, or vice versa.", // description of the action
		},
	],

	traits : [{ // Optional; traits that are added to the companion "Traits" section as bullet points after the actions //with the Wild Shape, these traits are only added (also as bullet points) if no "wildshapeString" is defined, see below
			name : "Air Form", // name of the trait
			description : "The elemental can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing.", // description of the trait
		},
	], // if the creature has no traits, you can delete the entire traits entry

	wildshapeString : "Darkvision 60 ft| Knows Auran| Resistant to: lightning, thunder, and bludgeoning, piercing, and slashing from nonmagical weapons| Immune to: poison, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious| Air Form: can move through 1 inch wide space without squeezing and can move through and stop in space of hostiles| Whirlwind: see Monster Manual page 124", // Optional; a string to put in the Wild Shape Traits & Features field. If you define this, no trait or action will be added to the Wild Shape Traits & Features field. This is here so you can make all the traits and features fit into the limited space on the Wild Shape page //This line can be deleted if you don't have anything to put here
};

UpdateDropdown("creature"); //Optional; This updates all dropdown fields that have lists of creatures