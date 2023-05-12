/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race, called "Faerie Dragon"
				This is taken from DanDwiki https://www.dandwiki.com/wiki/Faerie_Dragon_(5e_Race)

				Please note that DanDwiki is renowned for having very unbalanced content and that it can be edited by anyone at any time

				This script represents the website's version of 2021-07-09: https://www.dandwiki.com/w/index.php?title=Faerie_Dragon_(5e_Race)&oldid=1490072

	Code by:	MorePurpleMoreBetter
	Date:		2023-04-24 (sheet v13.1.6)

	Caution:	MorePurpleMoreBetter advises against using this race as it breaks game balance (some of its features are clearly overpowered). This code was made on commission for a patron.
*/

var iFileName = "Faerie Dragon [DanDwiki, transcribed by MPMB].js";
RequiredSheetVersion('13.1.3');

SourceList["DanDw"] = {
	name : "D\u0026D Wiki",
	abbreviation : "D\u0026Dwiki",
	group : "homebrew",
	url : "https://www.dandwiki.com/wiki/"
};

RaceList["faerie dragon"] = {
	regExpSearch : /^(?=.*(faerie|fairy))(?=.*dragon).*$/i,
	name : "Faerie Dragon",
	source : [["DanDw", 0]],
	plural : "Faerie Dragons",
	size : 5, // Tiny
	carryingCapacity : 0.5, // as per the Tiny Player Characters homebrew rules https://www.dandwiki.com/wiki/Tiny_Player_Characters_(5e_Variant_Rule)
	speed : {
		walk : { spd : 30, enc : 20 },
		fly : { spd : 30, enc : 0 }
	},
	languageProfs : ["Common", "Draconic", "Sylvan", "Minor Telepathy"],
	vision : [["Darkvision", 60]],
	age : ' mature earlier than most dragons, usually at around 5 years, although they are not considered "emotionally mature" (in a relative sense) until they are around 50 years old. They can live upwards of 5000 years',
	height : " are around 2 feet long (1'10\" + 1d4\")",
	weight : " weighs in the area of 5-10 pounds (4 + 1d4 lb)",
	heightMetric : " are around 60 cm long (57 + 2d4 cm)",
	weightMetric : " weighs in the area of 2-5 kg (20 + 2d4 \xD7 2 / 10 kg)",
	scores : [0, 2, 0, 1, 0, 0],
	features : {
		"faerie dragon magic" : {
			name : "Faerie Dragon Magic",
			minlevel : 1,
			spellcastingAbility : 6,
			spellcastingBonus : [{
				name : "Faerie Dragon Magic",
				spells : ["dancing lights", "mage hand", "minor illusion"],
				selection : ["dancing lights", "mage hand", "minor illusion"],
				firstCol : "atwill",
				times : 3,
				allowUpCasting : true
			}, {
				name : "Faerie Dragon Magic",
				spells : ["invisibility"],
				selection : ["invisibility"],
				firstCol : 'oncelr',
				allowUpCasting : false
			}],
			limfeaname : "Invisibility (self only)",
			usages : 1,
			recovery : "long rest",
			spellChanges : {
				"invisibility" : {
					range : "Self",
					description : "I and what I wear/carry becomes invisible; if I attack or cast a spell, it ends",
					changes : "Using Faerie Dragon Magic, I can cast Invisibility on myself once per long rest."
				}
			}
		}
	},
	weaponsAdd : ["Euphoric Breath"],
	weaponOptions : [{
		regExpSearch : /^(?=.*euphoric)(?=.*breath).*$/i,
		name : "Euphoric Breath",
		source : [["DanDw", 0]],
		ability : 3,
		type : 'Natural',
		damage : ['Wis save or', '', 'Random effect'],
		range : "5 ft (1 target)",
		description : "Wis save or can't take reactions for 1 min, random effect, save end of each turn, see notes; 1\xD7 per short rest",
		abilitytodamage : false,
		dc : true,
		tooltip : "Once per short rest, I can exhale a puff of euphoric gas at one creature within 5 ft of me. It must succeed on a Wisdom saving throw with a DC equal to 8 + my Constitution modifier + my proficiency bonus. A creature that fails its save cannot take reactions and must roll a d6 at the start of each of its turns to determine what it must do for that turn. On a roll of 1, the target moves in a random direction and takes no actions or bonus actions. On a 2-5, the target moves in a random direction. On a 6, the target behaves normally for the turn. This effect lasts for 1 minute or until it succeeds on a Wisdom saving throw at the end of its turn."
	}],
	trait : "Faerie Dragon "+
		(typePF ? "(my creature type is dragon, not humanoid)" : "(+2 Dexterity, +1 Intelligence) [my creature type is dragon, not humanoid]")+
		"\n \u2022 Flight: " + (typePF ? "I have a 30 ft fly speed, while not wearing medium or heavy armor. If I take damage during, I make a concentration save or fall." : "I have a flying speed of 30 ft, but can't wear medium or heavy armor while doing so. If I take damage while flying, I have to succeed on a concentration save or fall.")+
		"\n \u2022 Faerie Dragon Magic: I know the Dancing Lights, Mage Hand, and Minor Illusion cantrips. Once per long rest, I can cast Invisibility on myself. Cha is my spellcasting ability for these."+
		"\n \u2022 Minor Telepathy: I can speak telepathically to one within 30 ft, if we share a language."+
		"\n \u2022 Euphoric Breath: Once per short rest, I can exhale euphoric gas at one target within 5 ft.",
	toNotesPage : [{
		name : "Euphoric Breath",
		note : [
			"Once per short rest, I can exhale a puff of euphoric gas at one creature within 5 ft of me. It must then succeed on a Wisdom saving throw (DC 8 + Constitution modifier + proficiency bonus) or be unable to take reactions and must roll a d6 at the start of each of its turns to determine what it must do for that turn.",
			"1\tThey move in a random direction and takes no actions or bonus actions.",
			"2-5\tThey move in a random direction.",
			"6\tThey behave normally for the turn.",
			"This effect lasts for 1 minute or until the target succeeds on a Wisdom saving throw at the end of its turn."
		]
	}, {
		name : "Tiny Player Characters",
		amendTo : "Euphoric Breath",
		note : [
			"The races presented in the Player's Handbook are all Small or Medium sized, and the weapons and combat rules presented therein are designed around those sizes. Until official Tiny player races come out, the following rules can be used to better represent them in combat.\n",
			"WEAPONS",
			" \u2022 Tiny races do not benefit from the Light property, so these weapons cannot be used in the off-hand for two-weapon fighting. But they are still a one-handed weapon.",
			" \u2022 Versatile weapons must be wielded in two hands, and deal their basic damage rather than their versatile damage.",
			" \u2022 Tiny creatures have disadvantage on attack rolls with Two-handed weapons.",
			" \u2022 Heavy weapons cannot be wielded by a Tiny races at all.",
			" \u2022 All other one-handed weapons must be wielded in two hands.",
			" \u2022 Tiny races do not benefit from the Finesse property, unless the weapon is also light.\n",
			"OTHER EQUIPMENT",
			"Other equipment typically work the same as normal when shrunk down to an appropriate size for the character. Tiny equipment will weigh 1/8 of medium counterparts and cost 1/4 when made by tiny crafters. Getting a larger creature to make tiny equipment normally costs the same as normal sized equipment due to the difficulty in crafting something so small.\n",
			"SPACING AND MOVEMENT",
			"A Tiny creature can:",
			" \u2022 Squeeze into smaller spaces \u2015 as small as 15 inches.",
			" \u2022 Make better use of cover \u2015 in general, where another PC would gain half cover or three-quarters cover, a Tiny creature gains three-quarters cover and total cover respectively. They can also gain half cover from objects that would otherwise be considered incidental, such as rocks or tree saplings.",
			" \u2022 Occupy the same space as another Tiny or larger creature."
		]
	}]
};
