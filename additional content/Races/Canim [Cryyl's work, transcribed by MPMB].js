/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race, called "Canim" and its 3 subraces
				This subrace has been made by /u/Cryyl over on /r/UnearthedArcana on Reddit (https://redd.it/45msi6/)

	Code by:	MorePurpleMoreBetter
	Date:		2018-06-05 (sheet v12.999)
				2023-05-11 (updated to v13.1.6)
*/

var iFileName = "Canim [Cryyl's work, transcribed by MPMB].js";
RequiredSheetVersion('13.0.3');

SourceList["canim"] = {
	name: "/u/Cryyl: Canim",
	abbreviation: "Cryyl:C",
	group: "Reddit/r/UnearthedArcana",
	url: "https://homebrewery.naturalcrit.com/share/N1P-l5O9e",
	date : "2016/02/13"
};

RaceList["warrior clan canim"] = {
	regExpSearch : /^(?=.*can(im|e))(?=.*warrior).*$/i,
	name : "Warrior Clan Canim",
	sortname : "Canim, warrior clan",
	source : ["canim", 0],
	plural : "Canim",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", "Canish"],
	vision : [["Darkvision", 60]],
	weaponsAdd : ["Canim Claws", "Canim Bite"],
	weaponOptions : [{
		regExpSearch : /^(?=.*canim)(?=.*\bclaws?\b).*$/i,
		name : "Canim Claws",
		source : ["canim", 0],
		ability : 1,
		type : "Natural",
		damage : [1, 4, "slashing"],
		range : "Melee",
		description : "",
		abilitytodamage : true,
		monkweapon : true
	}, {
		regExpSearch : /^(?=.*canim)(?=.*\bbites?\b).*$/i,
		name : "Canim Bite",
		source : ["canim", 0],
		ability : 1,
		type : "Natural",
		damage : [1, 4, "piercing"],
		range : "Melee",
		description : "",
		abilitytodamage : true,
		monkweapon : true
	}],
	skills : ["Perception"],
	weaponProfs : [false, false, ["heavy crossbow"]],
	armorProfs : [true, true, false, false],
	age : " reach maturity around 10 to 13 years of age and life to be over 600 years old",
	height : " range from 7 to over 8 feet tall",
	weight : "",
	heightMetrict : " range from 2 to over 2,5 metres tall",
	scorestxt : "+2 Strength, and +2 Dexterity or Constitution",
	scores : [2, 0, 0, 0, 0, 0],
	trait : "Warrior Clan Canim (+2 Strength, and +2 Dexterity or Constitution)\n\nClaw and Fang: I am proficient with my strikes and bite. My claws deal 1d4 slashing damage and my bite deals 1d4 piercing damage."
};
RaceList["ritualist clan canim"] = {
	regExpSearch : /^(?=.*can(im|e))(?=.*ritual).*$/i,
	name : "Ritualist Clan Canim",
	sortname : "Canim, ritualist clan",
	source : ["canim", 0],
	plural : "Canim",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", "Canish"],
	weaponOptions : [{
		regExpSearch : /^(?=.*canim)(?=.*\bclaws?\b).*$/i,
		name : "Canim Claws",
		source : ["canim", 0],
		ability : 1,
		type : "Natural",
		damage : [1, 4, "slashing"],
		range : "Melee",
		description : "",
		abilitytodamage : true,
		monkweapon : true
	}, {
		regExpSearch : /^(?=.*canim)(?=.*\bbites?\b).*$/i,
		name : "Canim Bite",
		source : ["canim", 0],
		ability : 1,
		type : "Natural",
		damage : [1, 4, "piercing"],
		range : "Melee",
		description : "",
		abilitytodamage : true,
		monkweapon : true
	}],
	vision : [["Darkvision", 60]],
	weaponsAdd : ["Canim Claws", "Canim Bite"],
	skills : ["Perception"],
	age : " reach maturity around 10 to 13 years of age and life to be over 600 years old",
	height : " range from 7 to over 8 feet tall",
	weight : "",
	heightMetrict : " range from 2 to over 2,5 metres tall",
	scorestxt : "+2 Strength, and +1 Intelligence or Charisma",
	scores : [2, 0, 0, 0, 0, 0],
	spellcastingAbility : 6,
	spellcastingBonus : [{
		name : "Innate Sorcery (level 1)",
		spells : ["poison spray"],
		selection : ["poison spray"],
		firstCol : 'atwill'
	}],
	features : {
		"arms of hadar" : {
			name : "Innate Sorcery (level 3)",
			limfeaname : "Arms of Hadar (3d6)",
			minlevel : 3,
			usages : 1,
			recovery : "long rest",
			spellcastingBonus : [{
				name : "Innate Sorcery (level 3)",
				spells : ["arms of hadar"],
				selection : ["arms of hadar"],
				firstCol : 'oncelr'
			}]
		}
	},
	trait : "Ritualist Clan Canim (+2 Strength, and +1 Intelligence or Charisma)\n   Claw and Fang: I am proficient with my strikes and bite. My claws deal 1d4 slashing damage and my bite deals 1d4 piercing damage.\n   Innate Sorcery: I know the Poison Spray cantrip. At 3rd level, I can cast Arms of Hadar once per long rest as a 2nd-level spell. Charisma is my spellcasting ability for these spells.\n   Blood Sack: I carry with me a leather sack filled with blood of my slain enemies or myself. I can use this like component pouch."
};
RaceList["hunter clan canim"] = {
	regExpSearch : /^(?=.*can(im|e))(?=.*hunter).*$/i,
	name : "Hunter Clan Canim",
	sortname : "Canim, hunter clan",
	source : ["canim", 0],
	plural : "Canim",
	size : 3,
	speed : {
		walk : { spd : 35, enc : 25 }
	},
	languageProfs : ["Common", "Canish"],
	vision : [["Darkvision", 60]],
	weaponsAdd : ["Canim Claws", "Canim Bite"],
	weaponOptions : [{
		regExpSearch : /^(?=.*canim)(?=.*\bclaws?\b).*$/i,
		name : "Canim Claws",
		source : ["canim", 0],
		ability : 1,
		type : "Natural",
		damage : [1, 4, "slashing"],
		range : "Melee",
		description : "",
		abilitytodamage : true,
		monkweapon : true
	}, {
		regExpSearch : /^(?=.*canim)(?=.*\bbites?\b).*$/i,
		name : "Canim Bite",
		source : ["canim", 0],
		ability : 1,
		type : "Natural",
		damage : [1, 4, "piercing"],
		range : "Melee",
		description : "",
		abilitytodamage : true,
		monkweapon : true
	}],
	skills : ["Perception", "Stealth"],
	age : " reach maturity around 10 to 13 years of age and life to be over 600 years old",
	height : " range from 7 to over 8 feet tall",
	weight : "",
	heightMetrict : " range from 2 to over 2,5 metres tall",
	scorestxt : "+2 Strength, and +1 Dexterity or Wisdom",
	scores : [2, 0, 0, 0, 0, 0],
	trait : "Hunter Clan Canim (+2 Strength, and +1 Dexterity or Wisdom)\n\nClaw and Fang: I am proficient with my strikes and bite. My claws deal 1d4 slashing damage and my bite deals 1d4 piercing damage."
};
