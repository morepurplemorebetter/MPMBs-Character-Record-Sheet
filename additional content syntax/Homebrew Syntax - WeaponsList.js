/*  -WHAT IS THIS?-
  The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
  To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
  There you can either import the file as a whole or just copy the text into a dialogue.

  -KEEP IN MIND-
  Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
  It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*  -INFORMATION-
  Subject:  Weapon / Attack
  Effect:   This is the syntax for adding a new type of weapon, cantrip, or anything else you want to add to the attack section's automation
  Sheet:    v12.999 (2017-12-16)
*/

var iFileName = 'Homebrew Syntax - WeaponsList.js' // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999) // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

WeaponsList['leattack'] = { // Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

  regExpSearch: /^le(?=.*attack).*$/i, // Required; regular expression of what to look for (i.e. now it looks for any entry that has the word "le" followed by the word "attack" in it, disregarding capitalization). If this looks to complicated, just write: /leattack/i

  name: 'LeAttack', // Required; name of the weapon

  source: ['HB', 0], // required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

  list: 'spell', // optional; by having this attribute, the attack will appear in the dropdown fields. It will be grouped according to what you enter. The lists of weapons in the sheet are: "melee", "ranged", "spell", and "improvised" // However, you can define your own groupings. These will always appear below all the weapons that are included in the sheet

  ability: 1, // Required; the ability score used to calculate the to hit modifier (and the damage if applicable, see below). [Str=1, Dex=2, Con=3, Int=4, Wis=5, Cha=6]

  type: 'Simple', // Required; the type of the weapon. Alternatives are "Cantrip", "Martial", "Natural" (= always proficient), "Other", "Spell", or "Improvised Weapons" // Alternatively, you can define a type yourself. If this type matches a word in the 'Other Weapon Proficiencies' field, the character will be considered proficient with the weapon

  damage: [2, 4, 'piercing'], // Required; the damage it does. First entry is the amount of dice, second is the type of dice, and third is the damage type. This example is 2d4 worth of piercing damage. //if you want the amount of dice to be an amount determined by the Character Level, then put "C" as the first value. Alternatively, you can use "B" for the value minus 1 (such as with Green-Flame Blade)

  range: 'Melee, 100/200 ft', // Required; the range of the weapon

  description: 'Ammunition, light', // Required; the description of the attack. If you have nothing to put here, just put two quotation marks ("").

  abilitytodamage: true, // Required; whether or not the ability score modifier is added to the damage (true or false)

  weight: 2, // Optional; the weight in lb. If the attack has no weight, just remove this line. If this line is not present, the item will be ignored when adding weapons to the inventory.

  monkweapon: true, // Optional; whether or not the items counts as a monk weapon (true or false)

  ammo: 'bullet', // Optional; the type of ammunition the weapon uses. If the weapon uses no ammunition, remove this line. The options are: "arrow", "bolt", "bullet", "dagger", "dart", "flask", "axe", "javelin", "hammer", "needle", "spear", "trident", and "vial" [note the use of only lower case!]  Any ammunition you add yourself can of course be added here as well

  dc: true, // optional, will make the To Hit field display a DC instead. This will overwrite the first value you put in Modifiers (only from v10 onwards)

  modifiers: [1, ''], // Optional; bonuses to: [to hit, to damage]; "" means ignore. These values are added to the corresponding Modifier/Blue-Text fields. // You can also enter the three-letter abbreviation of an ability score (Str, Dex, Con, Int, Wis, or Cha), to have that ability's modifier added to it.

  SpellsList: 'eldritch blast' // Optional; if the attack you are making is a spell/cantrip that is listed in the SpellsList variable under another name that you are using for this weapon (in this example it would be "leattack"), write the name used in the SpellsList variable here
}
