/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Rogue, called "Shadowdancer"
				This subclass has been made by /u/incrediblehulf
				This code uses the subclass as it was posted on 2016-02-08 here: https://redd.it/44tph8/
	Code by:	Layton & MorePurpleMoreBetter
	Date:		2018-01-17 (sheet v12.999)
*/

var iFileName = "Rogue - Shadowdancer [incrediblehulf's work, transcribed by Layton & MPMB].js";
RequiredSheetVersion(12.999);

SourceList["IH:SD"] = {
	name : "/u/incrediblehulf: Shadowdancer",
	abbreviation : "IH:SD",
	group : "Reddit/r/UnearthedArcana",
	url : "https://redd.it/44tph8/",
	date : "2016/02/08"
};

AddSubClass("rogue", "shadowdancer", {
	regExpSearch : /shadowdancer/i,
	subname : "Shadowdancer",
	source : ["IH:SD", 1],
	fullname : "Shadowdancer",
	spellcastingFactor : 6,
	features : {
		"subclassfeature3" : {
			name : "Shadow Puppeteer",
			source : ["IH:SD", 1],
			minlevel : 3,
			description : desc([
				"As an action, I can extinguish a small, nonmagical flame in 10 ft \u00D7 my Proficiency Bonus",
				"I can cast Silent Image without using a spell slot my Cha mod per short rest (min 1)",
				"I learn the Minor Illusion cantrip; Charisma is my spellcasting ability score for these"
			]),
			action : ["action", ""],
			usages : "Charisma modifier per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "short rest",
			spellcastingBonus : [{
				name : "Shadow Puppeteer",
				spells : ["minor illusion"],
				selection : ["minor illusion"],
				atwill : true
			}, {
				name : "Shadow Puppeteer",
				spells : ["silent image"],
				selection : ["silent image"]
			}]
		},
		"subclassfeature3.1" : {
			name : "Shadowdancing",
			source : ["IH:SD", 1],
			minlevel : 3,
			description : "\n   " + "As a bonus action, I can teleport from and into dim light or darkness within range",
			additional : levels.map( function(n) { return n < 3 ? "" : "teleport " + (n < 6 ? "30 ft" : "60 ft"); }),
			action : ["bonus action", ""]
		},
		"subclassfeature9" : {
			name : "Improved Shadowdancing",
			source : ["IH:SD", 1],
			minlevel : 3,
			description : "\n   " + "After teleporting, I have adv. on the next melee attack I make before the end of my turn"
		},
		"subclassfeature9.1" : {
			name : "Supernatural Darkvision",
			source : ["IH:SD", 1],
			minlevel : 9,
			description : "\n   " + "I can see normally in magical and nonmagical darkness, to a distance of 120 feet",
			vision : [["Devil's sight", 120]]
		},
		"subclassfeature10" : {
			name : "Umbral Veil",
			source : ["IH:SD", 1],
			minlevel : 13,
			description : desc([
				"As an action while I am in dim light or darkness, I can become invisible",
				"This invisibility ends if I attack, cast a spell, or enter an area of bright light"
			]),
			action : ["action", ""]
		},
		"subclassfeature15" : {
			name : "Shadow Puppetmaster",
			source : ["IH:SD", 1],
			minlevel : 17,
			description : desc([
				"As an action, I create an illusory duplicate of myself within 30 ft of me for 1 min (conc)",
				"As a bonus action, I can move it 30 ft to a space I can see within 120 ft of me",
				"If both in dim light or darkness, I can switch places with it as part of the bonus action"
			]),
			action : ["action", ""],
			usages : 1,
			recovery : "long rest",
			eval : "AddAction('bonus action', 'Move Duplicate(s)', 'Cleric (Trickery Domain) - Channel Divinity: Invoke Duplicity')",
			removeeval : "RemoveAction('bonus action', 'Move Duplicate(s)')"
		}
	}
});
