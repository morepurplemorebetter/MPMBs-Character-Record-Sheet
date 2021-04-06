/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Subclass (a.k.a. Archetype)
	Effect:		This is the syntax for adding a new subclass/archetype to a class that is defined in the sheet, or to a class you made yourself
	Sheet:		v12.999 (2017-11-29)
*/

var iFileName = "Homebrew Syntax - ClassSubList.js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

AddSubClass( // this is the function you will be calling to add the variant

	"fighter", // Parent Class object name; Required; This has to be the exact name of the class of which you are adding a subclass. Look for the name of the class in the ClassList variable. For the default 12 classes these names are: "barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", and "wizard"

	"specialme", // Object name; Required; The name the entry in the ClassSubList will have. This can be anything, it is just something that the sheet uses to reference the new entry and it will never be printed anywhere

	{ // don't forget this opening bracket

		regExpSearch : /^(?=.*special)(?=.*me).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "special" and "me" in it, disregarding capitalization). If this looks too complicated, just write: /specialme/i

		subname : "Path of SpecialMe", //required; the name of the subclass

		source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

		// after defining the above three, you don't need to define anything more, but you can. Defining more stuff will overwrite the entries as they are given in the ClassList. So if you do not need something to be different than the basics of the class (for example, you subclass uses the same spellcasting ability), then you don't need to define it again.
		// For the syntax of how to define more stuff, look at the ClassList (see "Homebrew Syntax - ClassList.js"). You can define all the same stuff in the same way. The below are a couple of examples:

		fullname : "SpecialMe of MyClass", //if no fullname is defined it will be automatically generated as "Class Name (Subclass name)". In this example that would be: "MyClass (Path of SpecialMe)"

		abilitySave : 6, //overwrites the abilitySave that was defined in the ClassList
		abilitySaveAlt : 2,//overwrites the abilitySaveAlt that was defined in the ClassList
		spellcastingFactor : 2, //overwrites the spellcastingFactor that was defined in the ClassList

		features : { //unlike the other entries, "features" will not delete all the features from the ClassList, but will add to the features in the ClassList. For this to work properly, the feature object has to be named "subclassfeatureX" and not something appropriate for the feature. The below are the features of the purple Dragon Knight

			"subclassfeature3" : { // has to start with "subclassfeature" followed by a number. Note that the name has to be unique for this subclass, but it can be the same name as one of the features of the class in the ClassList variable. If you use the same name as a feature in the ClassList variable, it will be overwritten with this entry
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
);