WeaponsList["leattack"] = { //Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []
	
	regExpSearch : /^le(?=.*attack).*$/i, //regular expression of what to look for (i.e. now it looks for any entry that has the word "le" followed by the word "attack" in it, disregarding capitalization). If this looks to complicated, just write: /leattack/i
	
	name : "LeAttack", //name of the weapon
	
	ability : 1, //the ability score used to calculate the to hit modifier (and the damage if applicable, see below). [Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6]
	
	type : "Simple", //the type of the weapon. Alternatives are "Cantrip", "Martial", "Natural"
	
	damage : [2, 4, "piercing"], //the damage it does. First entry is the amount of dice, second is the type of dice, and third is the damage type. This example is 2d4 worth of piercing damage. //if you want the amount of dice to be an amount determined by the Character Level, then put "C" as the first value. Alternatively, you can use "B" for the value minus 1 (such as with Green-Flame Blade)
	
	range : "Melee, 100/200 ft", //the range of the weapon
	
	weight : 2, //the weight in LB. If the attack has no weight, just remove this line. If this line is not present, the item will be ignored when adding weapons to the inventory.
	
	description : "Ammunition, light", //the description of the attack. If you have nothing to put here, just put two quotation marks ("").
	
	abilitytodamage : true, //whether or not the ability score modifier is added to the damage (true or false)
	
	monkweapon : true, //whether or not the items counts as a monk weapon (true or false)
	
	ammo : "bullet", //the type of ammunition the weapon uses. If the weapon uses no ammunition, remove this line. The options are: "arrow", "bolt", "bullet", "dagger", "dart", "flask", "axe", "javelin", "hammer", "needle", "spear", "trident", and "vial" [note the use of only lower case!]  Any ammunition you add yourself can of course be added here as well
	
	dc : true, // optional, will make the To Hit field display a DC instead. This will overwrite the first value you put in Modifiers (only from v10 onwards)
	
	modifiers : [1, ""], // bonuses to: [to hit, to damage]; "" means ignore. // You can also enter the three-letter abbreviation of an ability score (Str, Dex, Con, Int, Wis, or Cha), to have that ability's modifier added to it.
}

UpdateDropdown("weapon", ["leattack"]); //Optional; This updates and resets all attack dropdown fields; Note that you have to provide the name of your attack exactly the same as it is in the first line above.
// If you are planning on adding multiple weapons to the sheet, please only use the UpdateDropdown once. You can make an array of the names of the attacks you want to have added to the lists.