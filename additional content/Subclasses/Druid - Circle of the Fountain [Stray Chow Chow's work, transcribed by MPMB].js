/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the druid, called "Circle of the Fountain"
				This is taken from Dungeon Masters Guild (https://www.dmsguild.com/product/173274) and is the version from 26th of August 2016
				This subclass is made by Stray Chow Chow
	Code by:	MorePurpleMoreBetter
	Date:		2018-05-23 (sheet v12.999)
	
	Please support the creator of this content (Stray Chow Chow) and download their material from DM Guild: https://www.dmsguild.com/browse.php?author=Stray%20Chow%20Chow
*/

var iFileName = "Druid - Circle of the Fountain [Stray Chow Chow's work, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["SCC:CF"] = {
	name : "Stray Chow Chow - Circle of the Fountain",
	abbreviation : "SCC:CF",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/173274",
	date : "2016/08/26"
};

var theCoD = AddSubClass("druid", "circle of fountain", {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*\bfountain\b).*$/i,
	subname : "Circle of Fountain",
	source : ["SCC:CF", 0],
	spellcastingExtra : ["aid", "cure wounds", "revivify", "wall of water", "control water", "death ward", "mass cure wounds", "raise dead"],
	features : {
		"subclassfeature2" : {
			name : "Additional Cantrips",
			source : ["SCC:CF", 0],
			minlevel : 2,
			description : "\n   " + "I learn the Spare the Dying and Shape Water cantrips",
			spellcastingBonus : [{
				name : "Additional Cantrips",
				spells : ["spare the dying"],
				selection : ["spare the dying"],
				atwill : true
			}, {
				name : "Additional Cantrips",
				spells : ["shape water"],
				selection : ["shape water"],
				atwill : true
			}]
		},
		"subclassfeature2.1" : {
			name : "Enchant Water",
			source : ["SCC:CF", 0],
			minlevel : 2,
			description : desc([
				"After a long rest, when preparing my spells, I can enchant vials of water with healing",
				"I can do half my level of such enchantments and can spend spell slots to gain more",
				"I can do an extra enchantment per level of spell slot spend at the end of the long rest",
				"A single vial can have up to 6 of such enchantments, which last until my next long rest",
				"When consumed, the enchanted water heals 1d8 per enchantment + my Wisdom mod",
				"Healing from these vials count as if I cast a healing spell on the target"
			]),
			additional : levels.map(function (n) { return n < 2 ? "" : Math.floor(n/2) + " enchantments + spell slots"; })
		},
		"subclassfeature6" : {
			name : "Life Giving",
			source : ["SCC:CF", 0],
			minlevel : 6,
			description : desc([
				"I can use my own hit dice during a short rest to heal another instead of myself",
				"Per HD used, I can heal a target for 8 + my Wisd mod + target's Con mod in hit points"
			])
		},
		"subclassfeature10" : {
			name : "Soothing Waters",
			source : ["SCC:CF", 0],
			minlevel : 10,
			description : desc([
				"I can breathe and speak underwater and I gain a swim speed equal to my walking speed",
				"If at least half my body is submerged in water at the start of my turn, I regain 1 HP"
			]),
			speed : { swim : { spd : "walk", enc : "walk" } }
		},
		"subclassfeature14" : {
			name : "Healing Flow",
			source : ["SCC:CF", 0],
			minlevel : 14,
			description : desc([
				"If I heal a target with a druid spell, it heals more thereafter for my Wis mod in turns",
				"At the start of each of those turns, the target regains the spell's level in HP",
				"A target can only benefit from the healing flow from one spell at a time"
			])
		}
	}
});
