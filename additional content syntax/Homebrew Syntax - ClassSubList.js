/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass (a.k.a. Archetype)
	Effect:		This is the syntax for adding a new subclass/archetype to a class that is defined in the sheet, or to a class you made yourself
	Sheet:		v12.83 (2017-02-18)
*/

ClassSubList["specialme"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

	regExpSearch : /^(?=.*special)(?=.*me).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "special" and "me" in it, disregarding capitalization). If this looks to complicated, just write: /specialme/i
	
	subname : "Path of SpecialMe", //required; the name of the subclass
	
	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js"
	
	// after defining the above three, you don't need to define anything more, but you can. Defining more stuff will overwrite the entries as they are given in the ClassList. So if you do not need something to be different than the basics of the class (for example, you subclass uses the same spellcasting ability), then you don't need to define it again.
	// For the syntax of how to define more stuff, look at the ClassList (see "Homebrew Syntax - ClassList.js"). You can define all the same stuff in the same way. The below are a couple of examples:
	
	fullname : "SpecialMe of MyClass", //if no fullname is defined it will be automatically generated as "Class Name (Subclass name)". In this example that would be: "MyClass (Path of SpecialMe)"
	
	abilitySave : 6, //overwrites the abilitySave that was defined in the ClassList
	abilitySaveAlt : 2,//overwrites the abilitySaveAlt that was defined in the ClassList
	spellcastingFactor : 2, //overwrites the spellcastingFactor that was defined in the ClassList
	
	features : { //unlike the other entries, "features" will not delete all the features from the ClassList, but will add to the features in the ClassList. For this to work properly, the feature object has to be named "subclassfeatureX" and not something appropriate for the feature. The below are the features of the purple Dragon Knight
	
	//if you are adding a subclass to an already existing class, be sure to take a look at the naming of the features of the class in "Complete ClassList & ClassSubList (as used in v___).js"
	
		"subclassfeature3" : { //has to be identical to a feature named in the ClassList
			name : "Rallying Cry",
			source : ["S", 128],
			minlevel : 3,
			description : "\n   " + "When I use Second Wind, I can also heal three allies within 60 that can see or hear me",
			additional : ["", "", "3 HP", "4 HP", "5 HP", "6 HP", "7 HP", "8 HP", "9 HP", "10 HP", "11 HP", "12 HP", "13 HP", "14 HP", "15 HP", "16 HP", "17 HP", "18 HP", "19 HP", "20 HP"],
			eval : "RemoveAction(\"bonus action\", \"Second Wind\"); AddAction(\"bonus action\", \"Second Wind (+ Rallying Cry)\", \"Purple Dragon Knight\")", //eval is custom code that is run when the feature is added. It is used here, because the "Second Wind" bonus action is removed, and replaced by the "Second Wind (+ Rallying Cry)" bonus action. If you instead just want to add a bonus action for "Rallying Cry", use the action object (i.e. action : ["bonus action", ""],)
			removeeval : "RemoveAction(\"bonus action\", \"Second Wind (+ Rallying Cry)\"); AddAction(\"bonus action\", \"Second Wind\", \"Fighter\")", //removeeval is custom code that is run when the feature is removed. Here the "Second Wind (+ Rallying Cry)" bonus action is removed and replaced by the plain "Second Wind" bonus action
		},
		"subclassfeature7" : {
			name : "Royal Envoy",
			source : ["S", 128],
			minlevel : 7,
			description : "\n   " + "I gain proficiency and expertise with the Persuasion skill" + "\n   " + "If already proficient, I can choose Animal Handling, Insight, Intimidation, or Perform.",
			skillstxt : "\n\n" + toUni("Purple Dragon Knight (Royal Envoy)") + ": Persuasion proficiency and expertise; if already proficient, choose one from Animal Handling, Insight, Intimidation, and Performance.",
			skills : ["Persuasion"],
		},
		"subclassfeature10" : {
			name : "Inspiring Surge",
			source : ["S", 128],
			minlevel : 10,
			description : "\n   " + "When I use my Action Surge, I can inspire an ally within 60 ft that can see or hear me" + "\n   " + "The ally can then use its reaction to make one melee or ranged weapon attack",
			additional : ["", "", "", "", "", "", "", "", "", "1 ally", "1 ally", "1 ally", "1 ally", "1 ally", "1 ally", "1 ally", "1 ally", "2 allies", "2 allies", "2 allies"],
		},
		"subclassfeature15" : {
			name : "Bulwark",
			source : ["S", 128],
			minlevel : 15,
			description : "\n   " + "When I use Indomitable to reroll a Int, Wis, or Cha save, I can extend it to an ally" + "\n   " + "The ally can reroll its failed saving throw against the same affect" + "\n   " + "It only works if I'm not incapacitated, the ally is within 60 ft and can see or hear me",
		},
	}
}

ClassList["myclass"].subclasses[1].push("specialme"); //Don't forget to copy this part, as it is essential to do, because it adds the subclass "SpecialMe" to the class "MyClass". Otherwise the subclass will not be associated with a class, and thus unselectable. Note the use of only lower case!