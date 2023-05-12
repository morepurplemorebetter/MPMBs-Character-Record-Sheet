/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Warlock, called "Lolth Patron"
				This subclass is made by Mike Mearls and found on his twitter (https://twitter.com/mikemearls/status/932490057344204800)

				Note that even though this is made by a creator of D&D 5e,
				it is not official WotC content or even Unearthed Arcana playtest material

	Code by:	MorePurpleMoreBetter
	Date:		2019-05-21 (sheet v13.0.0beta16)
*/

var iFileName = "Warlock - Lolth [Mike Mearls' tweet, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["MM:LP"] = {
	name : "Mike Mearls: Lolth Patron",
	abbreviation : "MM:LP",
	group : "Mike Mearls",
	url : "https://www.sageadvice.eu/2017/11/20/warlock-patron-lolth-the-spider-queen-by-mike-mearls/",
	date : "2017/11/19"
};

AddSubClass("warlock", "lolth", {
	regExpSearch : /^(?=.*lolth)(?=.*warlock).*$/i,
	subname : "Lolth",
	source : ["MM:LP", 0],
	spellcastingExtra : ["faerie fire", "jump", "darkness", "web", "fear", "vampiric touch", "dimension door", "giant insect", "cloudkill", "hold monster"],
	features : {
		"subclassfeature1" : {
			name : "Dark Queen's Servitor",
			source : ["MM:LP", 0],
			minlevel : 1,
			description : desc([
				"As a bonus action, I can transform into a spider, granting me the following features:",
				" \u2022 2 temporary HP per warlock level when I transform",
				" \u2022 +2 bonus to AC and a bite attack with the finesse property that deals poison damage",
				" \u2022 A climb speed equal to my walking speed; I can climb difficult surfaces without a check",
				" \u2022 A lack of hands; I can only cast the spells from the Lolth expanded spell list"
			]),
			action : [["bonus action", ""]],
			extraLimitedFeatures : [{ // so the 'additional' is not added in the limited features section
				name : "Dark Queen's Servitor",
				usages : 1,
				recovery : "short rest"
			}],
			additional : levels.map(function (n){
				return "bite: " + cantripDie[n - 1] + "d10, " + (2 * n) + " temp HP; 1\xD7 short rest";
			}),
			weaponsAdd : ["Bite (in spider form)"],
			weaponOptions : {
				regExpSearch : /^(?=.*bite)(?=.*spider)(?=.*form).*$/i,
				name : "Bite (in spider form)",
				source : ["MM:LP", 0],
				ability : 1,
				type : "Natural",
				damage : [1, 8, "poison"],
				range : "Melee",
				description : "Finesse",
				abilitytodamage : true,
				isSpiderFormBite : true
			},
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.theWea.isSpiderFormBite && classes.known.warlock && classes.known.warlock.level) {
							fields.Damage_Die = cantripDie[classes.known.warlock.level - 1] + "d10";
						}
					}
				]
			}
		},
		"subclassfeature6" : {
			name : "Poisoned Beauty",
			source : ["MM:LP", 0],
			minlevel : 6,
			description : desc([
				"As a bonus action, I can have a creature that I can see make a Charisma saving throw",
				"If failed, it is charmed by me and gains vulnerability to poison damage",
				"This lasts for 1 minute or until me or my allies damage the creature"
			]),
			action : [["bonus action", ""]],
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature10" : {
			name : "Spider Queen's Chosen",
			source : ["MM:LP", 0],
			minlevel : 10,
			description : "\n   In spider form, I have resistance to nonmagical bludgeoning, piercing, & slashing damage",
			dmgres : [["Bludgeoning", "Bludgeon. (as spider)"], ["Piercing", "Piercing (as spider)"], ["Slashing", "Slashing (as spider)"]]
		},
		"subclassfeature14" : {
			name : "Kiss of the Spider Queen",
			source : ["MM:LP", 0],
			minlevel : 14,
			description : desc([
				"As an action, I touch a creature, dealing it 12d10 poison or psychic damage (my choice)",
				"It can make a Constitution save to half the damage, but has disadv. if charmed by me"
			]),
			action : [["action", ""]],
			usages : 1,
			recovery : "long rest"
		}
	}
});

