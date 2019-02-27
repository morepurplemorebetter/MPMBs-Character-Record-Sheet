/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Armour
	Effect:		This is the syntax for adding a new type of armour
	Sheet:		v12.999 (2017-12-16)
*/

var iFileName = "Homebrew Syntax - ArmourList.js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

ArmourList["protectme"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []
	
	regExpSearch : /^protect(?=.*me).*$/i, //Required; regular expression of what to look for (i.e. now it looks for any entry that has the word "protect" followed by the word "me" in it, disregarding capitalization). If this looks too complicated, just write: /protectme/i
	
	name : "ProtectMe", //Required;
	
	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]
	
	type : "medium", //Required; the type of the weapon. Options are "medium", "light", "heavy", and ""
	
	ac : 10, //Required; the Armour Class (AC) granted by the Armour
	
	dex : 2, //Optional; the maximum Dexterity modifier that is allowed in combination with this armour. Just remove this entry if the armour doesn't have a maximum Dex mod allowance or if the Dex mod is determined by the armour type (i.e. 2 for Medium and 0 for Heavy). //This entry will always override any maximum that is determined by the type. // If you set this to -10, no Dex mod will be added to the AC, regardless of the value of the Dex mod (so also not negative values)
	
	stealthdis : false, //Required; whether or not the armour gives disadvantage on stealth checks (true or false)
	
	weight : 0, //Optional; the weight in lb. If the armour has no weight, just remove this line. If this line is not present, the item will be ignored when adding armour to the inventory
	
	strReq : 10, //Optional; the Strength score required to be able to wear the armour; the sheet doesn't actually do anything with this information (yet)
	
	invName : "Protect, Me", //Optional; the name as it will be added to the equipment section if selected to do so in the equipment menu. If you omit this, the sheet will use the above defined 'name' when adding this to the equipment section
	
	addMod : true, //Optional; set to true if the armour also allows for the addition of a secondary ability modifier (so in addition to Dex), as is the case with the monk's unarmed defence. This secondary ability modifier is taken from the three-letter abbreviation in brackets in the name. So if the name contains "(Str)", it adds the Strength modifier.
};
