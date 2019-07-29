/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds the race "Kitsune" and its 3 subraces
				This is taken from the GM Binder website (https://www.gmbinder.com/share/-L6XpvoJ9qPmjAiho52X)
				These subraces have been made by Azure876
	Code by:	MorePurpleMoreBetter
	Date:		2019-07-29 (sheet v13.0.0beta18)
*/

var iFileName = "Kitsune [Azure876's work, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["A876:K"] = {
	name : "Azure876: Kitsune",
	abbreviation : "A876:K",
	group : "GM Binder",
	url : "https://www.gmbinder.com/share/-L6XpvoJ9qPmjAiho52X",
	date : "2019/05/21"
};

RaceList["ninko kitsune"] = {
	regExpSearch : /ninko/i,
	name : "Ninko",
	sortname : "Kitsune, Ninko",
	source : [["A876:K", 0]],
	plural : "Ninko",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	vision : [["Darkvision", 60]],
	languageProfs : ["Common", "Sylvan", "Celestial"],
	age : " reach their status only after 100 years of life. No Kitsune is under 100 years old and none live past a 1,000 years.",
	scores : [0, 2, 0, 0, 1, 0],
	trait : "Ninko (+2 Dexterity, +1 Wisdom)\nFox Form: As an action once per short rest, I can shift between my human form or my true fox form. See the 'Notes' page for how this works.\nFox Magic: 1st level: Dancing Lights; 3rd level: Hideous Laughter; 5th level: Mirror Image. Both spells can each be used once per long rest. Wisdom is my spellcasting ability for these.\nPossessed Sight: As an action, I can become invisible to a creature I can see as long as I concentrate. It ends if I attack or cast a spell. I can only affect a target once per long rest.",
	spellcastingAbility : 5,
	spellcastingBonus : {
		name : "Fox Magic (level 1)",
		spells : ["dancing lights"],
		selection : ["dancing lights"],
		firstCol : 'atwill'
	},
	features : {
		"tasha's hideous laughter" : {
			name : "Fox Magic (level 3)",
			limfeaname : "Tasha's Hideous Laughter",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Fox Magic (level 3)",
				spells : ["tasha's hideous laughter"],
				selection : ["tasha's hideous laughter"],
				firstCol : "oncelr"
			}
		},
		"mirror image" : {
			name : "Fox Magic (level 5)",
			limfeaname : "Mirror Image",
			minlevel : 5,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Fox Magic (level 5)",
				spells : ["mirror image"],
				selection : ["mirror image"],
				firstCol : "oncelr"
			}
		}
	},
	action : [["action", "Fox Form"], ["action", "Possessed Sight"]],
	extraLimitedFeatures : [{
		name : "Fox Form",
		usages : 1,
		recovery : "short rest"
	}],
	toNotesPage : [{
		name : "Fox Form",
		popupName : "Kitsune Fox Form",
		note : [
			"I am able to shift between a human form and a fox form. As an action, I may choose to transform from a human into a Medium-size fox, and use another action to transform back into a human. As I shift into my fox form, any armor, clothing, and items merge into my new form.",
			"While in this form, my AC equals 10 + my Dexterity modifier, unless altered by a spell already cast before changing, such as Mage Armor, or a class trait allows a change in AC, such as Unarmored Defense. My speed in this form is 35 feet.",
			"I can only cast your racial magic, however, if I have already cast a spell that requires concentration, I do not drop concentration when changing into my fox form. I have proficiency with claw and bite attacks. I can use Disengage and Hide as a bonus action on my turn while in my fox form, because of my slippery nature. I also gain proficiency in Dexterity saving throws if I did not already have it.",
			"I have advantage on Perception checks relying on smell and hearing. Verbally, I sound like a fox. However, I can telepathically communicate with one of any creature at a time in any language I know as long as they can also understand me. I can also verbally communicate with any animal of equal size or smaller while in this form.",
			"If I am knocked unconscious while in my human form, I automatically revert to my fox form. I can shift between your human and fox form once per short rest."
		]
	}]
};

RaceList["nogitsune kitsune"] = {
	regExpSearch : /nogitsune/i,
	name : "Nogitsune",
	sortname : "Kitsune, Nogitsune",
	source : [["A876:K", 0]],
	plural : "Nogitsune",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	vision : [["Darkvision", 60]],
	languageProfs : ["Common", "Sylvan", "Celestial"],
	age : " reach their status only after 100 years of life. No Kitsune is under 100 years old and none live past a 1,000 years.",
	scores : [0, 2, 0, 0, 0, 1],
	trait : "Nogitsune (+2 Dexterity, +1 Charisma)\nFox Form: As an action once per short rest, I can shift between my human form or my true fox form. See the 'Notes' page for how this works.\nFox Magic: 1st level: Dancing Lights cantrip; 3rd level: Ensnaring Strike; 5th level: Shatter. Both spells can each be used once per long rest. Wisdom is my spellcasting ability for these.\nMaddening Sight: As an action once per long rest, I can have a creature that I can see within 30 ft make a Wis save or be turned by me for 1 min. See the 'Notes' page.",
	spellcastingAbility : 5,
	spellcastingBonus : {
		name : "Fox Magic (level 1)",
		spells : ["dancing lights"],
		selection : ["dancing lights"],
		firstCol : 'atwill'
	},
	features : {
		"ensnaring strike" : {
			name : "Fox Magic (level 3)",
			limfeaname : "Ensnaring Strike",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Fox Magic (level 3)",
				spells : ["ensnaring strike"],
				selection : ["ensnaring strike"],
				firstCol : "oncelr"
			}
		},
		"shatter" : {
			name : "Fox Magic (level 5)",
			limfeaname : "Shatter",
			minlevel : 5,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Fox Magic (level 5)",
				spells : ["shatter"],
				selection : ["shatter"],
				firstCol : "oncelr"
			}
		}
	},
	abilitySave : 6,
	action : [["action", "Fox Form"], ["action", "Maddening Sight"]],
	extraLimitedFeatures : [{
		name : "Fox Form",
		usages : 1,
		recovery : "short rest"
	}, {
		name : "Maddening Sight",
		usages : 1,
		recovery : "long rest"
	}],
	toNotesPage : [{
		name : "Fox Form and Maddening Sight",
		popupName : "Nogitsune Fox Form and Maddening Sight",
		note : ["FOX FORM"].concat(RaceList["ninko kitsune"].toNotesPage[0].note).concat([
			"",
			"MADDENING SIGHT",
			"As an action once per long rest, I call upon my desire to hunt and create multiple images of myself, intending to strike fear into the hearts of my enemies. A creature I can see within 30 ft. has to make a Wisdom saving throw (DC 8 + proficiency bonus + Charisma modifier). On a failed save, the creature is turned for one minute, or until it takes damage. The creature is immune if it's a construct, undead or immune to being frightened.",
			"A turned creature must spend its turns trying to move as far away from me as it can, and it can't willingly move to a space within 30 ft of me. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, the creature can use the Dodge action.",
		])
	}]
};

RaceList["tenko kitsune"] = {
	regExpSearch : /tenko/i,
	name : "Tenko",
	sortname : "Kitsune, Tenko",
	source : [["A876:K", 0]],
	plural : "Tenko",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	vision : [["Darkvision", 60]],
	languageProfs : ["Common", "Sylvan", "Celestial"],
	age : " reach their status only after 100 years of life. No Kitsune is under 100 years old and none live past a 1,000 years.",
	scores : [0, 2, 0, 1, 0, 0],
	trait : "Tenko (+2 Dexterity, +1 Intelligence)\nFox Form: As an action once per short rest, I can shift between my human form or my true fox form. See the 'Notes' page for how this works.\nFox Magic: 1st level: Dancing Lights; 3rd level: Longstrider; 5th level: Animal Messenger. Both spells can each be used once per long rest. Wisdom is my spellcasting ability for these.\nStar Sight: As an action once per short rest, I can know the location of all living creatures within 60 ft, their size and cover, for 1 min. 2 ft or rock, 2\" of metal, and lead blocks this.",
	spellcastingAbility : 5,
	spellcastingBonus : {
		name : "Fox Magic (level 1)",
		spells : ["dancing lights"],
		selection : ["dancing lights"],
		firstCol : 'atwill'
	},
	features : {
		"longstrider" : {
			name : "Fox Magic (level 3)",
			limfeaname : "Longstrider",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Fox Magic (level 3)",
				spells : ["longstrider"],
				selection : ["longstrider"],
				firstCol : "oncelr"
			}
		},
		"animal messenger" : {
			name : "Fox Magic (level 5)",
			limfeaname : "Animal Messenger",
			minlevel : 5,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Fox Magic (level 5)",
				spells : ["animal messenger"],
				selection : ["animal messenger"],
				firstCol : "oncelr"
			}
		}
	},
	action : [["action", "Fox Form"], ["action", "Star Sight"]],
	extraLimitedFeatures : [{
		name : "Fox Form",
		usages : 1,
		recovery : "short rest"
	}, {
		name : "Star Sight",
		usages : 1,
		recovery : "short rest"
	}],
	toNotesPage : [RaceList["ninko kitsune"].toNotesPage[0]]
};
