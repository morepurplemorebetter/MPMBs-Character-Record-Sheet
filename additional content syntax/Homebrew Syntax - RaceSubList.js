RaceSubList["something catlike-something great catlike"] = { // The name of the object must be the name of the parent ClassList entry ("something catlike" in this example), followed by a dash ("-"), followed by the name of the variant ("something great catlike" in this example), as defined in the 'variants' array in the ClassList entry (see bottom line). Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

	regExpSearch : /^(?=.*something)(?=.*great)(?=.*catlike).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "something", "great" and "catlike" in it, disregarding capitalization). If this looks to complicated, just write: /something great catlike/i This lookup is in addition to the one from the parent in the RaceList. So if the name of this subrace does not include the name of the parent race, it will never be recognized!
	
	name : "Something Great Catlike", //required; the name to use for the race
	
	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew.
	
	plural : "Somethings Great Catlike", //required; the name to use for the race when the plural form is used
	
	// after defining the above four, you don't need to define anything more, but you can. Defining more stuff will overwrite the entries as they are given in the RaceList. So if you do not need something to be different than the basics of the class (for example, you subrace uses the same spellcasting ability, or has the same age description), then you don't need to define it again.
	// For the syntax of how to define more stuff, look at the RaceList (see "Homebrew Syntax - RaceList.js"). You can define all the same stuff in the same way. The below are a couple of examples:
	
	speed : ["30 ft\n30 ft fly", "20 ft\n20 ft fly"], //optional; changes the speed to something else. Note that speed can be either just a number, or a string. Using just a number is faster. Only use a string when you need to add something more (like a fly speed)
	
	trait : "Something Great Catlike (+1 Dexterity, +2 Wisdom)\nWings:\n   I have bat-like wings sprouting from my shoulder blades that give me flying speed of 30 feet.", //optional; changes the racial trait description to something else
	
	features : "", //optional; the race has features defined, but this way the variant offers no features
	
	abilitySave : 0, //optional; the race has an Ability Save defined, but this way the variant offers no Ability Save
}

RaceList["something catlike"].variants = ["something great catlike"]; //Don't forget to copy this part, as it is essential to do, because it defines variant "Something Great Catlike" to the class "Something Catlike". This has to be identical to how it is written in the first line. Note the use of only lower case!

// if the race already has defined variants (as of v12.5 only the dragonborn, half-elf, human, tiefling, shifter, and minotaur do) you should use the syntax below:
RaceList["something catlike"].variants.push("something great catlike");