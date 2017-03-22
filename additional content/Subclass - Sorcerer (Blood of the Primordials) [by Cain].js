/*  -WHAT IS THIS?-
    The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
    You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
 
    -KEEP IN MIND-
    Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
    It is recommended to enter the code in a fresh sheet before adding any other information.
*/
 
/*  -INFORMATION-
    Subject:    Subclass
    Effect:     This script adds a new bloodline for the Sorcerer, called "Blood of the Primordials"
                This bloodline is a reskin of the "Draconic Bloodline" from the PHB
				This bloodline is made by Cain
				For more details, download the full text for this bloodline here: http://bit.ly/2kjur6M
    Code by:    Cain
    Date:       2017-01-25 (sheet v12.81)
*/

ClassSubList["blood of the primordials"] = {
	regExpSearch : /^(?=.*(sorcerer|witch))(?=.*primordials?).*$/i,
	subname : "Blood of the Primordials",
	source : ["HB", 0],
	features : {
		"subclassfeature1" : {
			name : "Primordial Ancestor",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "Choose a Primordial Ancestor using the \"Choose Feature\" button above" + "\n   " + "When interacting with elementals, if I can add my proficiency bonus, I can double it",
			choices : ["Akadi", "Grumbar", "Istishia", "Kossuth"],
			"akadi" : {
				name : "Akadi",
				description : "\n   " + "I have primordial ancestry from the goddess Akadi, who is affiliated with lightning" + "\n   " + "When interacting with elementals, if I can add my proficiency bonus, I can double it",
				eval : "var ToAdd = [\"sorcerer\", \"subclassfeature6\", \"lightning\"]; if (classes.known.sorcerer.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.slice(0,3).toString()) === -1) {ClassFeatureOptions(ToAdd)};",
				primordialElement : "lightning"
			},
			"grumbar" : {
				name : "Grumbar",
				description : "\n   " + "I have primordial ancestry from the god Grumbar, who is affiliated with acid damage" + "\n   " + "When interacting with elementals, if I can add my proficiency bonus, I can double it",
				eval : "var ToAdd = [\"sorcerer\", \"subclassfeature6\", \"acid\"]; if (classes.known.sorcerer.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.slice(0,3).toString()) === -1) {ClassFeatureOptions(ToAdd)};",
				primordialElement : "acid"
			},
			"istishia" : {
				name : "Istishia",
				description : "\n   " + "I have primordial ancestry from the goddess Istishia, who is affiliated with cold damage" + "\n   " + "When interacting with elementals, if I can add my proficiency bonus, I can double it",
				eval : "var ToAdd = [\"sorcerer\", \"subclassfeature6\", \"cold\"]; if (classes.known.sorcerer.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.slice(0,3).toString()) === -1) {ClassFeatureOptions(ToAdd)};",
				primordialElement : "cold"
			},
			"kossuth" : {
				name : "Kossuth",
				description : "\n   " + "I have primordial ancestry from the god Kossuth, who is affiliated with fire damage" + "\n   " + "When interacting with elementals, if I can add my proficiency bonus, I can double it",
				eval : "var ToAdd = [\"sorcerer\", \"subclassfeature6\", \"fire\"]; if (classes.known.sorcerer.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.slice(0,3).toString()) === -1) {ClassFeatureOptions(ToAdd)};",
				primordialElement : "fire"
			},
			eval : "AddLanguage(\"Primordial\", \"being a Sorcerer (Primordial Bloodline)\");",
			removeeval : "RemoveLanguage(\"Primordial\", \"being a Sorcerer (Primordial Bloodline)\");"
		},
		"subclassfeature1.1" : {
			name : "Primordial Resilience",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "When I am not wearing armor, my AC is 13 + Dexterity modifier" + "\n   " + "My hit point maximum increases by an amount equal to my sorcerer level",
			additional : "like draconic resilience" //so that the bonus hp is calculated
		},
		"subclassfeature6" : {
			name : "Elemental Affinity",
			source : ["HB", 0],
			minlevel : 6,
			description : "\n   " + "Choose a Primordial Ancestor using the \"Choose Feature\" button above" + "\n   " + "I add Cha mod for spell damage if matching my primordial ancestor's affiliated type" + "\n   " + "I can spend 1 sorcery point to gain resistance to my ancestor's affiliated type",
			choices : ["acid", "cold", "fire", "lightning", "poison"],
			choicesNotInMenu : true,
			"acid" : {
				name : "Acid Elemental Affinity",
				description : " [1 sorcery point]" + "\n   " + "I add my Charisma modifier to one damage roll of a spell if it does acid damage" + "\n   " + "When I do this, I can spend 1 sorcery point to gain acid resistance for 1 hour"
			},
			"cold" : {
				name : "Cold Elemental Affinity",
				description : " [1 sorcery point]" + "\n   " + "I add my Charisma modifier to one damage roll of a spell if it does cold damage" + "\n   " + "When I do this, I can spend 1 sorcery point to gain cold resistance for 1 hour"
			},
			"fire" : {
				name : "Fire Elemental Affinity",
				description : " [1 sorcery point]" + "\n   " + "I add my Charisma modifier to one damage roll of a spell if it does fire damage" + "\n   " + "When I do this, I can spend 1 sorcery point to gain fire resistance for 1 hour"
			},
			"lightning" : {
				name : "Lightning Elemental Affinity",
				description : " [1 sorcery point]" + "\n   " + "I add my Charisma modifier to one damage roll of a spell if it does lightning damage" + "\n   " + "When I do this, I can spend 1 sorcery point to gain lightning resistance for 1 hour"
			},
			eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?sorcerer,subclassfeature1,(akadi|grumbar|istishia|kossuth).*/i; if ((tReg).test(CFrem)) {FeaChoice = CurrentClasses.sorcerer.features.subclassfeature1[CFrem.replace(tReg, \"$1\")].primordialElement; AddString(\"Class Features Remember\", \"sorcerer,subclassfeature6,\" + FeaChoice, false);};};",
		},
		"subclassfeature14" : {
			name : "Elemental Wings",
			source : ["HB", 0],
			minlevel : 14,
			description : "\n   " + "As a bonus action, unless armor is in the way, I can sprout elemental wings from my back"  + "\n   " + "They are magical and are not affected by the environment" + "\n   " + "I gain a fly speed equal to my current speed until I dismiss the wings as a bonus action",
			action : ["bonus action", " (start/stop)"]
		},
		"subclassfeature18" : {
			name : "Presence of the Dawn Titans",
			source : ["HB", 0],
			minlevel : 18,
			description : "\n   " + "As an action, I create 60-ft radius aura of awe/fear for concentration up to 1 minute" + "\n   " + "All hostiles in this aura must make a Wis save or be charmed (awe) or frightened (fear)" + "\n   " + "They make their saves at the beginning of their turns" + "\n   " + "A creature that succeeds on the save is immune to my aura for 24 hours",
			additional : "5 sorcery points",
			action : ["action", ""]
		}
	}
};
ClassList.sorcerer.subclasses[1].push("blood of the primordials");

ArmourList["primordial resilience"] = {
	regExpSearch : /^(?=.*(primordials?|elementals?))(?=.*(hide|skin|scales|resilience)).*$/i,
	name : "Primordial resilience",
	type : "",
	ac : 13,
	dex : 2000,
	stealthdis : false,
	weight : 0,
	inventory : false,
	strReq : 0
};
UpdateDropdown("armor");