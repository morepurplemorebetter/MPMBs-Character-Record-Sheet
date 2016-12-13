/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://bit.ly/MPMBCharTools
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Barbarian, called "Path of the Storm Herald"
				This is taken from the Barbarian Primal Paths Unearthed Arcana (http://media.wizards.com/2016/dnd/downloads/UA_Barbarian.pdf)
	Code by:	SoilentBrad & MorePurpleMoreBetter
	Date:		2016-11-11 (sheet v12.55)
*/

ClassSubList["storm herald"] = {
	regExpSearch : /^(?=.*storm)(?=.*herald).*$/i,
	subname : "Path of the Storm Herald",
	source : ["UA:BPP", 2],
	fullname : "Storm Herald",
	abilitySave : 3,
	features : {
		"subclassfeature3" : {
			name : "Storm Aura",
			source : ["UA:BPP", 2],
			minlevel : 3,
			description : "\n   " + "While raging, I emanate a 10-ft radius aura that shapes the environment around me" + "\n   " + "Use the \"Choose Features\" button above to select the aura",
			choices : ["Desert", "Sea", "Tundra"],
			"desert" : {
				name : "Storm of Fury: Desert",
				description : "\n   " + "While raging, I emanate a 10-ft radius aura that shapes the environment around me" + "\n   " + "Any enemy that ends its turn in my aura takes fire damage",
				additional : ["", "", "2 fire damage", "3 fire damage", "3 fire damage", "3 fire damage", "3 fire damage", "4 fire damage", "4 fire damage", "4 fire damage", "4 fire damage", "5 fire damage", "5 fire damage", "5 fire damage", "5 fire damage", "6 fire damage", "6 fire damage", "6 fire damage", "6 fire damage", "7 fire damage"],
				eval : "var ToAdd = [\"barbarian\", \"subclassfeature6\", \"desert\"]; if (classes.known.barbarian.level >= 6 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ToAdd[1] = \"subclassfeature14\"; if (classes.known.barbarian.level >= 14 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
			},
			"sea" : {
				name : "Storm of Fury: Sea",
				description : "\n   " + "While raging, I emanate a 10-ft radius aura that shapes the environment around me" + "\n   " + "At the end of each of my turns, I can choose a creature in my aura, other than myself" + "\n   " + "It must make a Dex save or take lightning damage, or half damage on a successful save" + "\n   " + "The DC for this save is 8 + my proficiency bonus + my Constitution modifier",
				additional : ["", "", "2d6", "2d6", "2d6", "2d6", "2d6", "2d6", "2d6", "3d6", "3d6", "3d6", "3d6", "3d6", "4d6", "4d6", "4d6", "4d6", "4d6", "4d6"],
				usages : 1,
				recovery : "turn",
				eval : "var ToAdd = [\"barbarian\", \"subclassfeature6\", \"sea\"]; if (classes.known.barbarian.level >= 6 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ToAdd[1] = \"subclassfeature14\"; if (classes.known.barbarian.level >= 14 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
			},
			"tundra" : {
				name : "Storm of Fury: Tundra",
				description : "\n   " + "While raging, I emanate a 10-ft radius aura that shapes the environment around me" + "\n   " + "Any enemy that ends its turn in my aura takes cold damage",
				additional : ["", "", "2 cold damage", "3 cold damage", "3 cold damage", "3 cold damage", "3 cold damage", "4 cold damage", "4 cold damage", "4 cold damage", "4 cold damage", "5 cold damage", "5 cold damage", "5 cold damage", "5 cold damage", "6 cold damage", "6 cold damage", "6 cold damage", "6 cold damage", "7 cold damage"],
				eval : "var ToAdd = [\"barbarian\", \"subclassfeature6\", \"tundra\"]; if (classes.known.barbarian.level >= 6 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)}; ToAdd[1] = \"subclassfeature14\"; if (classes.known.barbarian.level >= 14 && this.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
			},
		},
		"subclassfeature6" : {
			name : "Storm Soul",
			source : ["UA:BPP", 2],
			minlevel : 6,
			description : "\n   " + "Use the \"Choose Features\" button above to select the effect",
			choices : ["desert", "sea", "tundra"],
			choicesNotInMenu : true,
			"desert" : {
				name : "Storm Soul: Desert",
				description : "\n   " + "I have resistance to fire damage and don't suffer the effects of extreme heat",
				eval : "AddResistance(\"Fire\");",
				removeeval : "RemoveResistance(\"Fire\");",
				save : "Immune to effects of extreme heat",
			},
			"sea" : {
				name : "Storm Soul: Sea",
				description : "\n   " + "I have resistance to lightning damage and can breathe underwater",
				eval : "AddResistance(\"Lightning\");",
				removeeval : "RemoveResistance(\"Lightning\");",
				},
			"tundra" : {
				name : "Storm Soul: Tundra",
				description : "\n   " + "I have resistance to cold damage and don't suffer the effects of extreme cold",
				eval : "AddResistance(\"Cold\");",
				removeeval : "RemoveResistance(\"Cold\");",
				save : "Immune to effects of extreme cold",
			},
			eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?barbarian,subclassfeature3,(desert|sea|tundra).*/i; if (CFrem.match(tReg)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"barbarian,subclassfeature6,\" + FeaChoice, false);};};",
		},
		"subclassfeature10" : {
			name : "Shield of the Storm",
			source : ["UA:BPP", 2],
			minlevel : 10,
			description : "\n   " + "While I'm raging, allies within my aura gain the benefits of my Storm Soul feature",
		},
		"subclassfeature14" : {
			name : "Raging Storm",
			source : ["UA:BPP", 2],
			minlevel : 14,
			description : "\n   " + "Use the \"Choose Features\" button above to select the effect",
			choices : ["desert", "sea", "tundra"],
			choicesNotInMenu : true,
			"desert" : {
				name : "Raging Storm: Desert",
				description : "\n   " + "Enemy in my aura move more than 5 ft on the ground must make a Strength save" + "\n   " + "On a fail, it moves only 5 ft and its speed drops to 0 until the start of its next turn" + "\n   " + "The DC for this save is 8 + my proficiency bonus + my Constitution modifier",
			},
			"sea" : {
				name : "Raging Storm: Sea",
				description : "\n   " + "Creatures in my aura hit by my attack must make a Str save or be knocked prone" + "\n   " + "The DC for this save is 8 + my proficiency bonus + my Strength modifier",
			},
			"tundra" : {
				name : "Raging Storm: Tundra",
				description : "\n   " + "The area within my aura is difficult terrain for my enemies",
			},
			eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?barbarian,subclassfeature3,(desert|sea|tundra).*/i; if (CFrem.match(tReg)) {FeaChoice = CFrem.replace(tReg, \"$1\"); AddString(\"Class Features Remember\", \"barbarian,subclassfeature14,\" + FeaChoice, false);};};",
		},
	},
};
ClassList["barbarian"].subclasses[1].push("storm herald");

SourceList["UA:BPP"] = {
	name : "Unearthed Arcana: Barbarian Primal Paths", //2016-11-07
	abbreviation : "UA:BPP",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2016/dnd/downloads/UA_Barbarian.pdf"
};