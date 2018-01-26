/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Racial variant (not a subrace!)
	Effect:		This is the syntax for adding a new racial variant to the sheet
				If you want to define several subraces, please do so by defining multiple entries of the RaceList (i.e. there is a separate entry for High Elf, Wood Elf, and Dark Elf in the RaceList)
				For races that have variants, like the human, you can define a variant using the RaceSubList. Any variant defined like this will only be selectable through the "Racial Options" button
	Sheet:		v12.999 (2017-11-29)
*/

var iFileName = "Homebrew Syntax - RaceSubList.js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

AddRacialVariant( // this is the function you will be calling to add the variant. Note that a variant is NOT a subrace. A variant is something like the Dragonborn's options to choose a dragon colour, and not the Mountain Dwarf. If you want to add a subrace, add it as a race.

	"something catlike", // Parent Race object name; Required; This has to be the exact name of the race to which you are adding a variant. This needs to match an entry in the RaceList variable
	
	"something great catlike", // Object name; Required; The name the entry in the RaceSubList will have. This can be anything, it is just something that the sheet uses to reference the new entry and it will never be printed anywhere
	
	{ // don't forget this opening bracket, everything from here on are things that will be used in place of the original (parent) race object
	
		regExpSearch : /^(?=.*something)(?=.*great)(?=.*catlike).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "something", "great" and "catlike" in it, disregarding capitalization). If this looks to complicated, just write: /something great catlike/i This lookup is in addition to the one from the parent in the RaceList. So if the name of this subrace does not include the name of the parent race, it will never be recognized!
		
		name : "Something Great Catlike", //required; the name to use for the race
		
		source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]
		
		plural : "Somethings Great Catlike", //required; the name to use for the race when the plural form is used
		
		// after defining the above four, you don't need to define anything more, but you can. Defining more stuff will overwrite the entries as they are given in the RaceList. So if you do not need something to be different than the basics of the class (for example, you subrace uses the same spellcasting ability, or has the same age description), then you don't need to define it again.
		// For the syntax of how to define more stuff, look at the RaceList (see "Homebrew Syntax - RaceList.js"). You can define all the same stuff in the same way. The below are a couple of examples:
		
		speed : ["30 ft\n30 ft fly", "20 ft\n20 ft fly"], //optional; changes the speed to something else. Note that speed can be either just a number, or a string. Using just a number is faster. Only use a string when you need to add something more (like a fly speed)
		
		trait : "Something Great Catlike (+1 Dexterity, +2 Wisdom)\nWings:\n   I have bat-like wings sprouting from my shoulder blades that give me flying speed of 30 feet.", //optional; changes the racial trait description to something else
		
		features : "", //optional; the race has features defined, but this way the variant offers no features
		
		abilitySave : 0, //optional; the race has an Ability Save defined, but this way the variant offers no Ability Save
	}
);