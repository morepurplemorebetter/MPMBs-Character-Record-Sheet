ArmourList["protectme"] = { //Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []
	
	regExpSearch : /^protect(?=.*me).*$/i, //regular expression of what to look for (i.e. now it looks for any entry that has the word "protect" followed by the word "me" in it, disregarding capitalization). If this looks to complicated, just write: /protectme/i
	
	name : "ProtectMe",
	
	type : "medium", //the type of the weapon. Alternatives are "light", "heavy", and ""
	
	ac : 10, //the Armor Class (AC) granted by the Armor
	
	dex : 2, //the maximum Dexterity modifier that is allowed in combination with this armor. If any Dex Mod is allowed, just put 100
	
	stealthdis : false, //whether or not the armor gives disadvantage on stealth checks (true or false)
	
	weight : 0, //the weight in LB. If the armor has no weight, just put a 0.
	
	inventory : false, //whether or not the armor will be added to the inventory when a function calls for it (true or false)
	
	strReq : 10, //the Strength score required to be able to wear the armor
}

UpdateDropdown("armor"); //Optional; This updates and reset the armor dropdown field