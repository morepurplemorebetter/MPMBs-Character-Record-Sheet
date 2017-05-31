/*  -WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*  -INFORMATION-
	Subject:	Subclass
	Effect:	 	This script adds a subclass for the Warlock, called "The Ancient Dragon"
				This subclass was made by /u/the_singular_anyone and was transcribed by 
				@RobRoseKnows.
				Original thread: https://www.reddit.com/r/UnearthedArcana/comments/4e46zb/ancient_dragon_warlock_pact_v02_better_spells/
	Code by:	@RobRoseKnows
	Date: 		2017-05-28 (sheet v12.99)
	Base Date:	2016-11-11 (sheet v12.54) - I used the "Inner Darkness" subclass as the basis for
				this subclass and it was originally created then.
*/

ClassSubList["ancient dragon"] = {
	regExpSearch : /^(?=.*warlock)((?=.*dragon)|(?=.*ancient)(?=.*dragon)).*$/i,
	subname : "ancient dragon",
	source : ["HB", 0],
	spellcastingExtra : ["command", "shield", "locate object", "see invisibility", "elemental weapon", "protection from energy", "compulsion", "fire shield", "dominate person", "hallow"],
	features : {
		"subclassfeature1" : {
			name : "Hoard Sense",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + 
				"I inherently know the worth of any treasure or valuable item I can see" + "\n   " + 
				"I have advantage on Investigation (INT) checks to find the location of items of significant worth" + "\n   " + 
				"I can summon or dismiss a chest from my patron's hoard as an action." + "\n   " +
				"The chest can fit 6 cubic feet (3x2x1) of non-living material.",
			action : ["action", ""],
		},
		"subclassfeature1.1": {
			name : "Dragon Patron",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   " + "Choose an Ancient Dragon Patron using the \"Choose Feature\" button above.",
			choices : ["Black Dragon Patron", "Blue Dragon Patron", "Brass Dragon Patron", "Bronze Dragon Patron", "Copper Dragon Patron", "Gold Dragon Patron", "Green Dragon Patron", "Red Dragon Patron", "Silver Dragon Patron", "White Dragon Patron"],
			"black dragon patron" : {
			name : "Black Dragon Patron",
				description : "\n   " + "My patron is an ancient black dragon, which is affiliated with acid damage.",
				eval : 	"var ToAdd = [\"warlock\", \"subclassfeature6\", \"black\"]; " + 
						"if (classes.known.warlock.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) { " + 
							"ClassFeatureOptions(ToAdd); " + 
						"} ",
				dragonElement : "acid"
			},
			"blue dragon patron" : {
				name : "Blue Dragon Patron",
				description : "\n   " + "My patron is an ancient blue dragon, which is affiliated with lightning damage.",
				eval : 	"var ToAdd = [\"warlock\", \"subclassfeature6\", \"blue\"]; " + 
						"if (classes.known.warlock.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.slice(0,3).toString()) === -1) { " + 
							"ClassFeatureOptions(ToAdd); " +
						"} ",
				dragonElement : "lightning"
			},
			"brass dragon patron" : {
				name : "Brass Dragon Patron",
				description : "\n   " + "My patron is an ancient brass dragon, which is affiliated with fire damage.",
				eval : 	"var ToAdd = [\"warlock\", \"subclassfeature6\", \"brass\"]; " + 
						"if (classes.known.warlock.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) { " + 
							"ClassFeatureOptions(ToAdd); " +
						"} ",
				dragonElement : "fire"
			},
			"bronze dragon patron" : {
				name : "Bronze Dragon Patron",
				description : "\n   " + "My patron is an ancient bronze dragon, which is affiliated with lightning dmg.",
				eval : 	"var ToAdd = [\"warlock\", \"subclassfeature6\", \"bronze\"]; " + 
						"if (classes.known.warlock.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) { " + 
							"ClassFeatureOptions(ToAdd); " + 
						"} ",
				dragonElement : "lightning"
			},
			"copper dragon patron" : {
				name : "Copper Dragon Patron",
				description : "\n   " + "My patron is an ancient copper dragon, which is affiliated with acid damage.",
				eval : 	"var ToAdd = [\"warlock\", \"subclassfeature6\", \"copper\"]; " + 
						"if (classes.known.warlock.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) { " + 
							"ClassFeatureOptions(ToAdd); " + 
						"} ",
				dragonElement : "acid"
			},
			"gold dragon patron" : {
				name : "Gold Dragon Patron",
				description : "\n   " + "My patron is an ancient gold dragon, which is affiliated with fire damage.",
				eval : 	"var ToAdd = [\"warlock\", \"subclassfeature6\", \"gold\"]; " + 
						"if (classes.known.warlock.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) { " + 
							"ClassFeatureOptions(ToAdd); " + 
						"} ",
				dragonElement : "fire"
			},
			"green dragon patron" : {
				name : "Green Dragon Patron",
				description : "\n   " + "My patron is an ancient green dragon, which is affiliated with poison damage.",
				eval : 	"var ToAdd = [\"warlock\", \"subclassfeature6\", \"green\"]; " + 
						"if (classes.known.warlock.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {" + 
							"ClassFeatureOptions(ToAdd); " +
						"} ",
				dragonElement : "poison"
			},
			"red dragon patron" : {
				name : "Red Dragon Patron",
				description : "\n   " + "My patron is an ancient red dragon, which is affiliated with fire damage.",
				eval :	"var ToAdd = [\"warlock\", \"subclassfeature6\", \"red\"]; " + 
						"if (classes.known.warlock.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) { " + 
							"ClassFeatureOptions(ToAdd); " +
						"} ",
				dragonElement : "fire"
			},
			"silver dragon patron" : {
				name : "Silver Dragon Patron",
				description : "\n   " + "My patron is an ancient silver dragon, which is affiliated with cold damage.",
				eval : 	"var ToAdd = [\"warlock\", \"subclassfeature6\", \"silver\"]; " + 
						"if (classes.known.warlock.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {" + 
							"ClassFeatureOptions(ToAdd); " + 
						"} ",
				dragonElement : "cold"
			},
			"white dragon patron" : {
				name : "White Dragon Patron",
				description : "\n   " + "My patron is an ancient white dragon, which is affiliated with cold damage.",
				eval : 	"var ToAdd = [\"warlock\", \"subclassfeature6\", \"white\"]; " + 
						"if (classes.known.warlock.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) { " + 
							"ClassFeatureOptions(ToAdd); " + 
						"} ",
				dragonElement : "cold"
			}
		},
		"subclassfeature6" : {
			name : "Ancient's Breath",
			source : ["HB", 0],
			minlevel : 6,
			description : "\n   " + 
				"I gain a breath weapon based on my draconic patron's element and area of effect." + "\n   " + 
				"I can expend a spell slot of at least 3rd level and use this breath weapon." + "\n   " +
				"All creatures in the area of my breath weapon make a Dexterity save against my spell save DC" + "\n   " + 
				"or a Constitution save if the breath deals Cold or Poison damage." + "\n   " + 
				"On a successful save, creatures in the area take half damage." + "\n   " + 
				"Damage is equal to 4d6 + my Charisma modifier, plus 1d8 damage per spell level expended above 3rd.",
			
			calcChanges : {
					atkAdd : [
						"if (WeaponName === 'breath weapon' && CurrentRace.known === 'dragonborn' && CurrentRace.variant) { " + 
							"fields.Damage_Type = CurrentRace.dmgres[0]; " + 
							"fields.Description = fields.Description.replace(/(dex|con) save/i, ((/cold|poison/i).test(CurrentRace.dmgres[0]) ? 'Con' : 'Dex') + ' save'); " + 
							"fields.Range = (/black|blue|brass|bronze|copper/i).test(CurrentRace.variant) ? '5-ft \u00D7 30-ft line' : '15-ft cone'; }; ",
							"As a Dragonborn I have a breath weapon. The damage type, range, and type of saving throw are dependent on which variant of Dragonborn I am. Furthermore, the amount of damage is dependent on my character level."],
					atkCalc : [
						"if (WeaponName === 'breath weapon' && CurrentRace.known === 'dragonborn' && CurrentRace.level > 5) { " +
							"output.die = output.die.replace('2d6', (CurrentRace.level < 11 ? 3 : CurrentRace.level < 16 ? 4 : 5) + 'd6'); }; ", ""]
				},
			choices : ["black", "blue", "brass", "bronze", "copper", "gold", "green", "red", "silver", "white"],
			choicesNotInMenu: true
		}	
	}
};
ClassList.warlock.subclasses[1].push("inner darkness");
