/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:	Magic Item
	Effect:		This script adds a magical shield called "Nature's Ward"
				This is a homebrew item that is not published anywhere
	Code by:	MorePurpleMoreBetter
	Date:		2020-02-19 (sheet v13.0.0)
*/

var iFileName = "Nature's Ward (magic item) [homebrew, transcribed by MPMB].js";
RequiredSheetVersion(13);

MagicItemsList["nature's ward-hb"] = {
	name : "Nature's Ward",
	source : [["HB", 0]],
	type : "shield",
	rarity : "very rare",
	description : "This shield can be used as a spellcasting focus and gives an extra +1 bonus AC for every two allies within 5 ft of me (max +3 AC). As a bonus action, I can cause it to levitate or return to my hand. As a reaction when a creature I can see in 5 ft takes damage, I can take the damage instead, but it changes to force damage.",
	descriptionFull : "While holding this shield, you gain the following features in addition to the normal +2 bonus to AC from a shield:"+
	"\n \u2022 You can use a bonus action to cause the shield to levitate or return to your hand."+
	"\n \u2022 You can use it as your spellcasting focus."+
	"\n \u2022 While wielding this shield, you gain a +1 bonus to AC for every two allies within 5 ft of you on top of the shield's AC bonus, up to 6 allies for an extra +3 bonus to AC."+
	"\n \u2022 When a creature you can see within 5 ft of you takes damage, you can use your reaction to take this damage instead, but the damage type for it changes to force.",
	action : [["bonus action", " (levitate/return)"], ["reaction", " (switch damage)"]],
	weight : 6,
	shieldAdd : "Nature's Ward"
};
