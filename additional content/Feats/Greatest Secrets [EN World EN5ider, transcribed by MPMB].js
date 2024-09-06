/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Feats
	Effect:     This script adds several card-game inspired feats

				These feats have been made by EN World EN5ider and can be found here: https://www.patreon.com/posts/7106683

				Please support the creators of this content on their Patreon: https://www.patreon.com/ensider

	Code by:	MorePurpleMoreBetter
	Date:		2019-01-30 (sheet v13.0.0beta11)
*/
var iFileName = "Greatest Secrets [EN World EN5ider, transcribed by MPMB].js";
RequiredSheetVersion(13);

// The source (EN5ider 110)
SourceList["EN5:110"] = {
	name : "EN World EN5ider [110] Greater Secrets: New Options for Cardcasters",
	abbreviation : "EN5:110",
	group : "EN World EN5ider",
	url : "https://www.patreon.com/posts/7106683",
	date : "2016/10/28"
};

// Add the feats
FeatsList["cardshark"] = {
	name : "Cardshark",
	source : [["EN5:110", 5]],
	description : "I gain proficiency with playing card set, Deception, and Insight. I also apply my Prof Bonus to any checks related to determining odds, bets, and chance. I double my Prof Bonus on Wis (Insight) checks against creature that I have played a card game against. [+1 Int]",
	scores : [0, 0, 0, 1, 0, 0],
	prerequisite : "Wisdom 13 or higher",
	prereqeval : function(v) { return What('Wis') >= 13; },
	skills : ["Deception", "Insight"],
	toolProfs : ["Playing card set"]
};
FeatsList["cartomancy"] = {
	name : "Cartomancy",
	source : [["EN5:110", 5]],
	description : "Once per short rest when I draw a card from a deck, I can first look at the top card and keep it or put it on the bottom of the deck. Whenever I complete a game of cards or tarot reading, I learn two things about the creature (Int, Cha, Wis, skill prof. or personality).",
	prerequisite : "Intelligence 13 or higher and proficiency with playing cards (gaming set)",
	prereqeval : function(v) { return What('Int') >= 13 && (/(play|playing|game|gaming).{0,2}card|card.{1,2}(play|playing|game|gaming)/i).test(v.toolProfs); },
	usages : 1,
	recovery : "short rest"
};
FeatsList["chosen of fortune"] = {
	name : "Chosen of Fortune",
	source : [["EN5:110", 5]],
	description : "I have advantage on checks made to negotiate economic transactions. I gain proficiency with one skill: Deception, Persuasion, or Insight. Whenever I roll the maximum value on a d20, percentile dice, or damage die, I mysteriously gain that number of gold pieces.",
	skills : "Choose one form Deception, Persuasion, or Insight",
	prerequisite : "Intelligence 13 or higher",
	prereqeval : function(v) { return What('In') >= 13; },
};
FeatsList["intuitive diviner"] = {
	name : "Intuitive Diviner",
	source : [["EN5:110", 5]],
	description : "I can cast divination spells from the cleric and wizard spell lists. I know 2 spells + 1 for every 2 levels above 1st. These have to be of a level that a cleric of my character level is  able to cast. I can cast any divination spell I know as a ritual, even if otherwise unable.",
	prerequisite : "Wisdom 13 or higher",
	prereqeval : function(v) { return What('Wis') >= 13; },
	spellcastingAbility : 5,
	spellcastingBonus : [{
		'class': ['cleric', 'wizard'],
		school : ['Div'],
		times : levels.map(function (n) { return 2 + Math.floor((n-1)/2); })
	}]
};
