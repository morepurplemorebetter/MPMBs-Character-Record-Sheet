/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Barbarian, called "Path of the Brawler"

				This subclass was designed by Matt Stigler over on his website Fantasy Band Camp

				You can find it here: https://fantasybandcamp.blogspot.com/2015/02/d-young-justice-superboy.html

	Code by:	MorePurpleMoreBetter
	Date:		2018-08-03 (sheet v12.999)
*/

var iFileName = "Barbarian - Path of the Brawler [Matt Stigler's work, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["FBC:PotB"] = {
	name : "Fantasy Band Camp: Path of the Brawler",
	abbreviation : "FBC:PotB",
	group : "Fantasy Band Camp",
	url : "https://fantasybandcamp.blogspot.com/2015/02/d-young-justice-superboy.html",
	date : "2015/02/17"
};

AddSubClass("barbarian", "path of the brawler", {
	regExpSearch : /^(?=.*brawler)(?=.*(warrior|fighter|marauder|barbarian|viking|(norse|tribes?|clans?)(wo)?m(a|e)n)).*$/i,
	subname : "Path of the Brawler",
	source : ["FBC:PotB", 0],
	features : {
		"subclassfeature3" : {
			name : "Powerful Blows",
			source : ["FBC:PotB", 0],
			minlevel : 3,
			description : "\n   " + "My unarmed strikes deal 1d6 damage (1d8 in rage) instead of their usual amount",
			calcChanges : {
				atkAdd : [
					"if ((/unarmed strike/i).test(WeaponName)) { var powerfulBlowsDie = (/\\brage\\b/i).test(WeaponText) ? 8 : 6; try {var curDie = eval(fields.Damage_Die.replace('d', '*'));} catch (e) {var curDie = 'x';}; if (isNaN(curDie) || curDie < powerfulBlowsDie) {fields.Damage_Die = '1d' + powerfulBlowsDie;}; }; ",
					"My unarmed strikes deal 1d6 damage and 1d8 in rage. If I include the word 'Rage' in an unarmed stike's name or description, the calculation will add set the damage die to 1d8, otherwise to 1d6."
				]
			}
		},
		"subclassfeature3.1" : {
			name : "Massive Leap",
			source : ["FBC:PotB", 0],
			minlevel : 3,
			description : "\n   " + "While raging, my jump distance is doubled and I have adv. on checks related to jumping"
		},
		"subclassfeature6" : {
			name : "Iron Body",
			source : ["FBC:PotB", 0],
			minlevel : 6,
			description : desc([
				"My unarmed strikes count as magical for overcoming resistances and immunities",
				"When I enter rage, I gain a number of temporary hit points equal to my barbarian level"
			]),
			additional : levels.map(function(n) {
				return n < 6 ? '' : n + " temp HP";
			})
		},
		"subclassfeature10" : {
			name : "Shockwave",
			source : ["FBC:PotB", 0],
			minlevel : 10,
			description : desc([
				"As a bonus action when I land from a jump, I can create a powerful shockwave",
				"All creatures within 5 ft of where I land take 5d10 force damage and are knocked prone",
				"Targets make a Dex save (DC 8 + Prof Bonus + Str mod) to avoid being knocked prone"
			]),
			action : ["bonus action", " (after jump)"],
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature14" : {
			name : "Knockout",
			source : ["FBC:PotB", 0],
			minlevel : 14,
			description : desc([
				"As a bonus action after I hit a creature with an unarmed strike, I can knock it prone",
				"The creature has to be Large or smaller for this to work"
			]),
			action : ["bonus action", " (with unarmed strike)"]
		}
	}
});
