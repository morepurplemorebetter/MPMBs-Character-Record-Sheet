/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Paladin, called "Oath of Apathy"
				This is taken from 'DDAL00-09 Minsc & Boo's Guide to Stuff and Things'
				made by Alan Patrick, Amy Lynn Dzura, Claire Hoffman, Rich Lescouflair, Greg Marks, Shawn Merwin, and Travis Woodall
				(https://www.dmsguild.com/product/271488/)

	Code by:	MorePurpleMoreBetter
	Date:		2019-10-12 (sheet v13.0.0beta19)

	If you like this content, please buy it on DMs Guild as all profits go to charity (Extra Life).
	https://www.dmsguild.com/product/271488/

	Learn more about this amazing charity here: https://www.extra-life.org/

	Note:		Even though this content is made for use in a specific Adventurers League adventure,
				it is not legal for use in any other Adventurers League content.
*/

var iFileName = "Paladin - Oath of Apathy [DMs Guild, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["DDAL00-09"] = {
	name : "Minsc & Boo's Guide to Stuff and Things",
	abbreviation : "DDAL00-09",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/271488/",
	date : "2019/04/01"
};

AddSubClass("paladin", "apathy", {
	regExpSearch : /^(?=.*apathy)(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper))))).*$/i,
	subname : "Oath of Apathy",
	source : ["DDAL00-09", 14],
	spellcastingExtra : ["sanctuary", "sleep", "calm emotions", "suggestion", "hypnotic pattern", "slow", "confusion", "mordenkainen's private sanctum", "dream", "mislead"],
	features : {
		"subclassfeature3" : {
			name : "Channel Divinity: Stubborn Tenacity",
			source : ["DDAL00-09", 14],
			minlevel : 3,
			description : desc([
				"As an action, I can target a charmed, frightened, or stunned creature within 60 ft",
				"If the condition allows a save, the target immediately makes a save with adv. to do so"
			]),
			action : [["action", ""]]
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Whoa, Everybody Chill!",
			source : ["DDAL00-09", 14],
			minlevel : 3,
			description : desc([
				"As an action, I can have chosen creatures in 30 ft that can see me make a Cha save",
				"If failed, they must mime taking a 'chill pill' and gain disadv. on attack rolls for 1 min",
				"Affected targets can repeat this save at the end of each of their turns"
			]),
			action : [["action", ""]]
		},
		"subclassfeature7" : {
			name : "Stubborn with a Capital T",
			source : ["DDAL00-09", 14],
			minlevel : 7,
			description : desc([
				"As a reaction when a creature causes me to be pushed or pulled, I can reverse the effect",
				"I remain where I am, and I target the creature with the effect instead"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature15" : {
			name : "Don’t Be a Party Pooper",
			source : ["DDAL00-09", 14],
			minlevel : 15,
			description : desc([
				"As a reaction when one affected by Whoa, Everybody Chill! makes an attack, I attack it",
				"If I'm within range of that creature, I can make a melee weapon attack against it"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature18" : {
			name : "Stubborn with a Capital U",
			source : ["DDAL00-09", 14],
			minlevel : 18,
			description : "\n   As a reaction when an ally I can see is being pushed or pulled, I can negate the push/pull",
			action : [["reaction", ""]]
		},
		"subclassfeature20" : {
			name : "Avatar of Apathy",
			source : ["DDAL00-09", 14],
			minlevel : 20,
			description : desc([
				"As an action, I can stop caring about everything and the rules no longer apply to me",
				'This lasts for 1 minute; See the 3rd page "Notes" section for the benefits this gives me'
			]),
			recovery : "long rest",
			usages : 1,
			action : [["action", ""]],
			extraname : "Oath of Apathy 20",
			"avatar of apathy benefits" : {
				name : "Avatar of Apathy Benefits",
				source : ["DDAL00-09", 14],
				description : desc([
					"While I'm transformed into an Avatar of Apathy, I gain the following benefits:",
					" \u2022 I gain a climb, fly, and swim speed equal to my walking speed",
					" \u2022 I can move through other creatures and object as if they are difficult terrain",
					"   If I end my turn inside a creature or object, I take 1d10 force damage",
					" \u2022 As a reaction when I'm hit by an attack or fail a save, I can cause it to miss/succeed",
					" \u2022 When I use Lay on Hands on myself, I also remove one condition affecting me"
				])
			},
			autoSelectExtrachoices : [{ extrachoice : "avatar of apathy benefits" }]
		}
	}
});
