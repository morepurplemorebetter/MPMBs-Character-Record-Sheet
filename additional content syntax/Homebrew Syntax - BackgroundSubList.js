/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Background variant
	Effect:		This is the syntax for adding a new variant on an existing background (or one that you made yourself)
	Sheet:		v12.83 (2017-02-18)
*/

BackgroundSubList["what i was doing"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

	regExpSearch : /\bwhat\b.*\bi\b.*\bwas\b.*\bdoing\b/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has the consecutive words "what", "i", "was", and "doing" in it, disregarding capitalization or words in between). If this looks to complicated, just write: /what i was doing/i
	
	name : "What I was Doing", //required; the name of the variant
	
	// after defining the above two, you don't need to define anything more, but you can. Defining more stuff will overwrite the entries as they are given in the BackgroundList. So if you do not need something to be different than the basics of the class (for example, you variant uses the same ideals and bonds), then you don't need to define it again.
	// For the syntax of how to define more stuff, look at the BackgroundList (see "Homebrew Syntax - BackgroundList & BackgroundFeatureList.js"). You can define all the same stuff in the same way. The below are a couple of examples:
	
	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js"
	
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

BackgroundList["where i am from"].variant.push("city watch"); //Don't forget to copy this part, as it is essential to do, because it adds the variant "city watch" to the background "where i am from". Note the use of only lower case!