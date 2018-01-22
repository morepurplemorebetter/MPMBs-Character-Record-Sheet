/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Background variant
	Effect:		This is the syntax for adding a new variant on an existing background (or one that you made yourself)
	Sheet:		v12.999 (2018-01-22)
*/

var iFileName = "Homebrew Syntax - BackgroundSubList.js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

AddBackgroundVariant( // this is the function you will be calling to add the variant

	"where i am from", // Parent Background object name; Required; This has to be the exact name of the background of which you are making a variant. This needs to match an entry in the BackgroundList variable
	
	"what i was doing", // Object name; Required; The name the entry in the BackgroundSubList will have. This can be anything, it is just something that the sheet uses to reference the new entry and it will never be printed anywhere
	
	{ // don't forget this opening bracket, everything from here on are things that will be used in place of the original (parent) background object

		regExpSearch : /\bwhat\b.*\bi\b.*\bwas\b.*\bdoing\b/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has the consecutive words "what", "i", "was", and "doing" in it, disregarding capitalization or words in between). If this looks to complicated, just write: /what i was doing/i
		
		name : "What I was Doing", //required; the name of the variant
		
		source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]
		
		// after defining the above two, you don't need to define anything more, but you can. Defining more stuff will overwrite the entries as they are given in the BackgroundList. So if you do not need something to be different than the basics of the class (for example, you variant uses the same ideals and bonds), then you don't need to define it again.
		// For the syntax of how to define more stuff, look at the BackgroundList (see "Homebrew Syntax - BackgroundList & BackgroundFeatureList.js"). You can define all the same stuff in the same way. The below are a couple of examples:
		
		equipleft : "", //the background has items defined that are to be added to the left equipment column. This variant now erases those entries by overwriting them with nothing
		
		equipright : [ // a change of the equipright section. Note that you can't add something as it is defined in the BackgroundList, you will have to redifine everything
			["Uniform of my unit", "", 3],
			["Insignia of rank", "", ""],
			["Horn", "", 2],
			["Manacles", "", 6],
			["Belt pouch (with coins)", "", 1],
		],
		
		feature : "Watcher's Eye", //change the background feature to something else
		
		extra : "", //the background has an extra set of choices defined, but this way the variant offers no choices
		
		languages : ["+2 from "], //even if the original background didn't have any languages defined, the variant can have them. This goes for any of the optional features (extra, tools, languages, equipleft, equipright)
	}
);