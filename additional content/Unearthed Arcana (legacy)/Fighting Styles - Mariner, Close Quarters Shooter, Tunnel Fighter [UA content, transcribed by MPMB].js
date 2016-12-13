/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Fighting Styles for the Fighter, Ranger, and Paladin classes
	Effect:		This script adds three additional Fighting Styles for the Fighter, Ranger, and Paladin classes: "Mariner", "Close Quarters Shooter", and "Tunnel Fighter"
				The "Mariner" Fighting Style is taken from the Waterborn Adventures Unearthed Arcana (https://media.wizards.com/2015/downloads/dnd/UA_Waterborne_v3.pdf)
				The "Close Quarters Shooter" and "Tunnel Fighter" Fighting Styles are taken from the Light, Dark, Underdark! Unearthed Arcana (https://media.wizards.com/2015/downloads/dnd/02_UA_Underdark_Characters.pdf)
	Code by:	MorePurpleMoreBetter
	Date:		2016-08-10 (sheet v12.02)
*/

var FSclasses = ["fighter", "ranger", "paladin"];

var fightingStyles = [{
	choice : "Mariner",
	feature : {
		name : "Mariner Fighting Style",
		source : ["UA:WA", 3],
		description : "\n   " + "While not wearing heavy armor or using a shield, I gain +1 AC and swim/climb speed" + "\n   " + "The swimming and climbing speeds equal my current walking speed",
		eval : "AddACMisc(1, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\")",
		removeeval : "AddACMisc(0, \"Mariner Fighting Style\", \"When not wearing heavy armor or using a shield, the class feature Mariner Fighting Style gives a +1 bonus to AC\")"
	}
},{
	choice : "Close Quarters Shooter",
	feature : {
		name : "Close Quarters Shooting Fighting Style",
		source : ["UA:LDU", 1],
		description : "\n   " + "+1 bonus to attack rolls I make with ranged attacks" + "\n   " + "I don't have disadvantage when making a ranged attack while within 5 ft of a hostile" + "\n   " + "My ranged attacks ignore half and three-quarters cover against targets within 30 ft",
		eval : "this.getField(\"Attack To Hit Bonus Global\").value += 1",
		removeeval : "this.getField(\"Attack To Hit Bonus Global\").value -= 1"
	}
}, {
	choice : "Tunnel Fighter",
	feature : {
		name : "Tunnel Fighting Style",
		source : ["UA:LDU", 1],
		description : "\n   " + "As a bonus action, I enter a defensive stance that lasts until the start of my next turn" + "\n   " + "While in the stance, I can make opportunity attacks without using my reaction" + "\n   " + "While I'm in this defensive stance I gain the following two benefits:" + "\n    - " + "I can make opportunity attacks without using my reaction" + "\n    - " + "I can make a melee attack as a reaction if a hostile moves >5 ft while in my reach",
		action : ["bonus action", ""]
	}
}];

for (var cla = 0; cla < FSclasses.length; cla++) {
	var FSfeat = ClassList[FSclasses[cla]].features["fighting style"];
	for (var fs = 0; fs < fightingStyles.length; fs++) {
		var FStyle = fightingStyles[fs];
		FSfeat.choices.push(FStyle.choice);
		FSfeat[FStyle.choice.toLowerCase()] = FStyle.feature;
	}
	FSfeat.choices.sort();
};

SourceList["UA:WA"] = {
	name : "Unearthed Arcana: Waterborne Adventures", //2015-05-04
	abbreviation : "UA:WA",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2015/downloads/dnd/UA_Waterborne_v3.pdf"
};
SourceList["UA:LDU"] = {
	name : "Unearthed Arcana: Light, Dark, Underdark!", //2015-11-02
	abbreviation : "UA:LDU",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2015/downloads/dnd/02_UA_Underdark_Characters.pdf"
};