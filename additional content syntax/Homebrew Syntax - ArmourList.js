/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	You can add custom content to the Character Sheet's functionality by adding a script written with the syntax shown below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Armour
	Effect:		This is the syntax for adding a new type of armour
	Sheet:		v12.83 (2017-02-15)
*/

ArmourList["protectme"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []
	
	regExpSearch : /^protect(?=.*me).*$/i, //Required; regular expression of what to look for (i.e. now it looks for any entry that has the word "protect" followed by the word "me" in it, disregarding capitalization). If this looks to complicated, just write: /protectme/i
	
	name : "ProtectMe", //Required; 
	
	type : "medium", //Required; the type of the weapon. Options are "medium", "light", "heavy", and ""
	
	ac : 10, //Required; the Armor Class (AC) granted by the Armor
	
	dex : 2, //Optional; the maximum Dexterity modifier that is allowed in combination with this armor. Just remove this entry if the armour doesn't have a maximum Dex mod allowence or if the Dex mod is determined by the armor type (i.e. 2 for Medium and 0 for Heavy). //This entry will always override any maximum that is determined by the type.
	
	stealthdis : false, //Required; whether or not the armor gives disadvantage on stealth checks (true or false)
	
	weight : 0, //Optional; the weight in lb. If the armour has no weight, just remove this line. If this line is not present, the item will be ignored when adding armour to the inventory
	
	strReq : 10, //Optional; the Strength score required to be able to wear the armor; the sheet doesn't actually do anything with this information (yet)
	
	invName : "Protect, Me", //Optional; the name as it will be added to the equipment section if selected to do so in the equipment menu. If you omit this, the sheet will use the above defined 'name' when adding this to the equipment section
}

UpdateDropdown("armor"); //Optional; This updates the armor dropdown field