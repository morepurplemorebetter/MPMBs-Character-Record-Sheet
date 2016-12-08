var MagicItemsList = {
	"ring of protection" : {
		regExpSearch : /^(?=.*ring)(?=.*protection).*$/i, //not essential
		name : "Ring of Protection", //essential
		category : "ring", //essential
		rarity : "rare", //essential
		source : ["D", 191], //not essential
		attunement: true, //not essential
		description: "I gain a +1 bonus to AC and saving throws while wearing this ring.", //essential
		dmgres : [""],
		saveBonus : [["All", 1]], // 1st is "All" or a ability score abbreviation // 2nd is a number
		saveText : "", //text to add to the saves tooltips
		acBonus : 1,
		eval : "", //custom code to run when the item is equiped
		removeeval : "", //custom code to run when the item is unequiped
		action : [["action", " (start)"], ["bonus action", " (stop)"]], //an array of actions, with the first being the type of action ("action", "bonus action", or "reaction"), and the second being the addition to what will be displayed in the action field (i.e. the name of the item plus whatever is written here
	},
}

//see if the input string contains any magic item that is recognized
function ParseMagicitem(input) {
	var result = "";
	
	if (input) {
		var tempString = input.toLowerCase();
		var foundLen = 0;

		for (var key in MagicItemsList) { //scan string for all creatures
			if (key.regExpSearch && tempString.search(key.regExpSearch) !== -1) {
				return key; //if a regular expression has been entered and it matches, assume it is the best possible match
			} else if (key.length > foundLen && tempString.indexOf(key) !== -1) {
				result = key;
				foundLen = key.length;
			}
		}
	}
	return result;
}

//apply the magic item, if one is found, and/or remove the things of the last one, but only if this is not a result of moving of stuff because of the magic item buttons
function ApplyMagicitem(string, fld) {
	this.delay = true;
	this.calculate = false;
	
	if (.calculate)
	
	this.calculate = IsNotReset;
	this.delay = !IsNotReset;
	if (IsNotReset) {
		this.calculateNow();
	};
}


//add or remove all the functions of a magic item
function AddRemoveMagicitemStuff(item, AddRemove) {
	if (!item || !AddRemove || !MagicItemsList[item]) {
		return; // do not continue with the function
	}
	var theItem = MagicItemsList[item];
	var addMod = AddRemove === "Add" ? 1 : -1; // positive if adding, or negative if removing
	
	if (theItem.saveBonus) {
		for (var i = 0; i < saveBonus.length; i++) {
			var theSave = saveBonus[i][0] + " ST Bonus";
			if (!isNaN(What(theSave)) && !isNaN(saveBonus[i][1])) {
				Value(theSave, What(theSave) + (saveBonus[i][1] * addMod));
			}
		}
	}
}

