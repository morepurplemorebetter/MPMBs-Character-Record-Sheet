/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Paladin, called "Oath of the Weave"
				This is taken from the 'Forgotten Realms Archetypes II: Champions of Mystery' made by Jeremy Forbing & Leo David Pakirdjian (https://www.dmsguild.com/product/211385)
	Code by:	MorePurpleMoreBetter
	Date:		2017-11-29 (sheet v12.999)
	
	Please support the creators of this content (Jeremy Forbing & Leo David Pakirdjian) and download their material from the DMs Guild website: https://www.dmsguild.com/browse.php?x=0&y=0&author=Jeremy%20Forbing  &  https://www.dmsguild.com/browse.php?x=0&y=0&author=Leo%20David%20Pakirdjian
	
	Note:		Because this subclass is so verbose, not all features will fit into the Class Features section of the character sheet and the field will overflow!
	
	Caution:	MorePurpleMoreBetter advises against using this subclass as it breaks game balance (it is clearly overpowered). This code was made on commission for a patron.
*/

var iFileName = "Paladin - Oath of Weave [DMs Guild, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["FRA2"] = {
	name : "Forgotten Realms Archetypes II: Champions of Mystery",
	abbreviation : "FRA2",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/211385/",
	date : "2017/05/07"
};

AddSubClass("paladin", "paladin-weave", {
	regExpSearch : /^(?=.*weave)(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper))))).*$/i,
	subname : "Oath of the Weave",
	source : ["FRA2", 21],
	spellcastingExtra : ["detect magic", "shield", "misty step", "warding bond", "counterspell", "dispel magic", "death ward", "ice storm", "flame strike", "teleportation circle"],
	features : {
		"subclassfeature3" : {
			name : "Channel Divinity: Spellfire Blade",
			source : ["FRA2", 22],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can infuse my weapon with arcane energy for 1 minute",
				"My first hit with it as part of an action to cast a cantrip, it deals extra radiant damage",
				"Als, the next time the target tries to cast a spell, it must first make a concentration save"
			]),
			action : ["bonus action", ""],
			additional : levels.map(function (n) {
				if (n < 3) return "";
				return "2d8+" + n + " damage";
			})
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Spellfire Shield",
			source : ["FRA2", 22],
			minlevel : 3,
			description : desc([
				"As a reaction when a spell missed me or I save against it, I can redirect the spell cast",
				"I can have it target another within 30 ft, causing a new attack/save roll"
			]),
			action : ["reaction", ""]
		},
		"subclassfeature3.2" : {
			name : "Spellshatter",
			source : ["FRA2", 22],
			minlevel : 3,
			description : desc([
				"As a bonus action when I use Divine Smite, I can dispel spells affecting the target",
				"All spells of a level equal to or lower than the spell slot used for the smite are ended",
				"If the attack triggers a concentration save, the DC is that of my paladin spell DC"
			]),
			usages : "Charisma modifier per ",
			usagescalc : "event.value = Math.max(1, tDoc.getField('Cha Mod').value);",
			recovery : "long rest",
			action : ["bonus action", ""]
		},
		"subclassfeature3.3" : {
			name : "Arcane Cantrips",
			source : ["FRA2", 22],
			minlevel : 3,
			description : "\n   " + "I learn two cantrips, with Charisma as my spellcasting ability",
			spellcastingBonus : {
				name : "Arcane Cantrips",
				spells : ["booming blade", "green-flame blade", "challenger's mark", "echoing blow", "frostwind blade", "looming shadow", "punishing strike"],
				times : 2
			}
		},
		"subclassfeature7" : {
			name : "Arcane Cantrips: Quick Casting",
			source : ["FRA2", 22],
			minlevel : 7,
			description : desc([
				"I can reduce the casting time of one of my arcane cantrip to a bonus action",
				"Doing this expends 10 points from my Lay on Hands feature"
			])
		},
		"subclassfeature7.1" : {
			name : "Aegis of Blue Flame",
			source : ["FRA2", 22],
			minlevel : 7,
			description : desc([
				"Opportunity attacks against friendly creatures within my aura have disadvantage",
				"As a reaction when an ally within 10 ft is hit with an attack, I can protect it",
				"The ally takes my Cha mod (min 1) less in bludgeoning, piercing, or slashing damage",
				"Also,, I can make one weapon attack or cast a cantrip at the attacker"
			]),
			additional : levels.map(function (n) {
				if (n < 7) return "";
				return (n < 18 ? "10" : "30") + "-foot aura";
			}),
			action : ["reaction", ""]
		},
		"subclassfeature15" : {
			name : "Mystic Champion",
			source : ["FRA2", 22],
			minlevel : 15,
			description : desc([
				"I add a 4th-level or lower wizard spell to my oath spells and learn two wizard cantrips",
				"When I use my action to cast a cantrip, I can make a weapon attack as a bonus action"
			]),
			action : ["bonus action", ""],
			spellcastingBonus : [{
				name : "Mystic Champion",
				class : "wizard",
				level : [0, 0],
				times : 2
			}, {
				name : "Mystic Champion (spell)",
				class : "wizard",
				level : [1, 4],
				prepared : true
			}]
		},
		"subclassfeature20" : {
			name : "Living Spellfire",
			source : ["FRA2", 22],
			minlevel : 20,
			description : desc([
				"As an action, I wreathe myself in spellfire for 1 minute and gain the following benefits:",
				" - I can teleport my walking speed as a bonus action",
				" - Hostiles within 30 ft have disadv. on saves vs. my spells and -5 on concentration saves",
				" - When I use my action to cast a spell, I can make a weapon attack as a bonus action",
				" - I can reroll a number of damage dice for a spell equal to my Cha mod (min 1)"
			]),
			recovery : "long rest",
			usages : 1,
			action : ["action", ""]
		}
	}
});


SpellsList["challenger's mark"] = {
	name : "Challenger's Mark",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["FRA2", 39],
	ritual : false,
	level : 0,
	school : "Ench",
	time : "1 a",
	range : "5 ft",
	components : "V,S",
	duration : "1 round",
	description : "Melee wea atk with cast; it 0d8, dis. on next atk, 1d8 Psychic dmg if move/atk; +1d8 at CL 5/11/17",
	descriptionFull : "As part of the action used to cast this spell, you must make a melee weapon attack against one creature within the spell's range, otherwise the spell fails. On a hit, the target suffers the attack's normal effects, and you exchange a moment of silent, instinctive communication that expresses your personal challenge. Before the beginning of your next turn, the target has disadvantage on the next attack roll it makes that does not target you. Also, if the target willingly moves more than 30 feet away from you or makes an attack that suffers disadvantage from this spell, it immediately takes 1d8 psychic damage, and the spell ends." + AtHigherLevels + "At 5th level, the melee attack deals an extra 1d8 psychic damage to the target, and the damage the target suffers for moving more than 30 feet away from you increases to 2d8. Both damage rolls increase by 1d8 at 11th level and 17th level."
};
SpellsList["echoing blow"] = {
	name : "Echoing Blow",
	classes : ["bard", "sorcerer", "warlock", "wizard"],
	source : ["FRA2", 39],
	ritual : false,
	level : 0,
	school : "Abjur",
	time : "1 a",
	range : "30 ft",
	components : "V,S",
	duration : "1 round",
	description : "Wea atk with cast; 0d6 Thunder dmg (+1d6 if it conc.); next conc. save -1d6; +1d6 at CL 5, 11, \u0026 17",
	descriptionFull : "As part of the action used to cast this spell, you must make an unarmed strike or weapon attack against one creature within the spell's range, otherwise the spell fails. On a hit, the target suffers the attack's normal effects, and if the target is concentrating on a spell when this attack hits, the attack deals an an extra 1d6 thunder damage, which creates a loud noise that can be heard up to 100 feet away. In addition, the first time the target you hit with this cantrip makes a Constitution saving throw to maintain concentration on a spell before the end of your next turn (including against the damage of this cantrip), you roll 1d6 and subtract the number rolled from that saving throw." + AtHigherLevels + "At 5th level, the melee attack deals an extra 1d6 thunder damage to the target, and the damage the target suffers if they are concentrating on a spell increases to 2d6. Both damage rolls increase by 1d6 at 11th level and 17th level."
};
SpellsList["frostwind blade"] = {
	name : "Frostwind Blade",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["FRA2", 40],
	ritual : false,
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "5 ft",
	components : "V,S",
	duration : "1 round",
	description : "Melee wea atk with cast; 0d10, half spd, either dis. next atk or 1d10 Cold dmg; +1d10 CL 5/11/17",
	descriptionFull : "As part of the action used to cast this spell, you must make a melee weapon attack against one creature within the spell's range, otherwise the spell fails. Your weapon leaves a frosty trail as it cuts through the air, striking blows that inflict winter's wrath. On a hit, the target suffers the attack's normal effects, and the next time the target makes an attack roll before then, it must either accept disadvantage on the attack roll or take 1d10 cold damage and make the attack roll normally. A creature within 5 feet of you that takes cold damage from this cantrip reduces their speed by half until the end of your next turn." + AtHigherLevels + "At 5th level, the melee attack deals an extra 1d10 cold damage to the target, and the damage the target suffers for not taking disadvantage on their next attack increases to 2d10. Both damage rolls increase by 1d10 at 11th level and 17th level."
};
SpellsList["looming shadow"] = {
	name : "Looming Shadow",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["FRA2", 40],
	ritual : false,
	level : 0,
	school : "Illus",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "1 round",
	description : "Range/throw wea atk with cast; 0d10, 1d10 Psychic dmg next atk vs. chosen ally; +1d10 CL 5/11/17",
	descriptionFull : "As part of the action used to cast this spell, you must make a thrown or ranged weapon attack against one creature within the spell's range, otherwise the spell fails. If the weapon or ammunition hits the target, a shadowy duplicate of it appears, hanging in the air just short of where the original struck, and you choose one of your allies within 30 feet of the target. The first time the target attacks the chosen ally or includes that ally in a harmful area of effect before the end of your next turn, the second weapon or piece of ammunition automatically strikes, inflicting 1d10 psychic damage." + AtHigherLevels + "At 5th level, the ranged attack deals an extra 1d10 psychic damage to the target, and the damage the target suffers for attacking the chosen ally or including them in a harmful area of effect increases to 2d10. Both damage rolls increase by 1d10 at 11th level and 17th level."
};
SpellsList["punishing strike"] = {
	name : "Punishing Strike",
	classes : ["cleric", "druid", "warlock", "wizard"],
	source : ["FRA2", 42],
	ritual : false,
	level : 0,
	school : "Necro",
	time : "1 a",
	range : "5 ft",
	components : "V,S",
	duration : "1 round",
	description : "Melee wea atk with cast; if hit, it 0d8, if it takes a reaction 1d8 Necrotic dmg; +1d8 at CL5, 11, & 17",
	descriptionFull : "As part of the action used to cast this spell, you must make an unarmed strike or melee weapon attack against one creature within the spell's range, otherwise the spell fails. On a hit, the target suffers the attack's normal effects, and also a black web of necrotic energy radiates across its skin from where it was struck until the start of your next turn. If the target willingly takes a reaction before then, it immediately takes 1d8 necrotic damage, and the spell ends." + AtHigherLevels + "At 5th level, the melee attack deals an extra 1d8 necrotic damage to the target, and the damage the target suffers for taking a reaction increases to 2d8. Both damage rolls increase by 1d8 at 11th level and 17th level."
};
