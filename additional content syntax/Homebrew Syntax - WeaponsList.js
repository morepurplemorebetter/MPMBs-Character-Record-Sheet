/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Weapon / Attack
	Effect:		This is the syntax for adding a new type of weapon, cantrip, or anything else you want to add to the attack section's automation
	Sheet:		v12.88 (2017-03-15)
*/

WeaponsList["leattack"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []
	
	regExpSearch : /^le(?=.*attack).*$/i, // Required; regular expression of what to look for (i.e. now it looks for any entry that has the word "le" followed by the word "attack" in it, disregarding capitalization). If this looks to complicated, just write: /leattack/i
	
	name : "LeAttack", // Required; name of the weapon
	
	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js"
	
	list : "spell", //optional; by having this attribute, the attack will appear in the dropdown fields. It will be grouped according to what you enter. The lists of weapons in the sheet are: "melee", "ranged", "spell", and "improvised" // However, you can define your own groupings. These will always appear below all the weapons that are included in the sheet
	
	ability : 1, // Required; the ability score used to calculate the to hit modifier (and the damage if applicable, see below). [Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6]
	
	type : "Simple", // Required; the type of the weapon. Alternatives are "Cantrip", "Martial", "Natural" (= always proficient), "Other", "Spell", or "Improvised Weapons" // Alternatively, you can define a type yourself. If this type matches a word in the 'Other Weapon Proficiencies' field, the character will be considered proficient with the weapon
	
	damage : [2, 4, "piercing"], // Required; the damage it does. First entry is the amount of dice, second is the type of dice, and third is the damage type. This example is 2d4 worth of piercing damage. //if you want the amount of dice to be an amount determined by the Character Level, then put "C" as the first value. Alternatively, you can use "B" for the value minus 1 (such as with Green-Flame Blade)
	
	range : "Melee, 100/200 ft", // Required; the range of the weapon
	
	description : "Ammunition, light", // Required; the description of the attack. If you have nothing to put here, just put two quotation marks ("").
	
	abilitytodamage : true, // Required; whether or not the ability score modifier is added to the damage (true or false)
	
	weight : 2, // Optional; the weight in lb. If the attack has no weight, just remove this line. If this line is not present, the item will be ignored when adding weapons to the inventory.
	
	monkweapon : true, // Optional; whether or not the items counts as a monk weapon (true or false)
	
	ammo : "bullet", // Optional; the type of ammunition the weapon uses. If the weapon uses no ammunition, remove this line. The options are: "arrow", "bolt", "bullet", "dagger", "dart", "flask", "axe", "javelin", "hammer", "needle", "spear", "trident", and "vial" [note the use of only lower case!]  Any ammunition you add yourself can of course be added here as well
	
	dc : true, // optional, will make the To Hit field display a DC instead. This will overwrite the first value you put in Modifiers (only from v10 onwards)
	
	modifiers : [1, ""], // Optional; bonuses to: [to hit, to damage]; "" means ignore. These values are added to the corresponding Modifier/Blue-Text fields. // You can also enter the three-letter abbreviation of an ability score (Str, Dex, Con, Int, Wis, or Cha), to have that ability's modifier added to it.
	
	SpellsList : "eldritch blast", // Optional; if the attack you are making is a spell/cantrip that is listed in the SpellsList variable under another name that you are using for this weapon (in this example it would be "leattack"), write the name used in the SpellsList variable here
}

UpdateDropdown("weapon"); // Optional; This updates all attack dropdown fields with weapons that have a 'list' attribute