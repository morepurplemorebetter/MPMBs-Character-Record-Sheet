/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds an alternative Dragonborn player race, called "Greater Dragonborn" and its 10 variants (colors)
				This is taken from the DMs Guild website (https://www.dmsguild.com/product/248697/)
				This race is made by CaelReader
				It can also be found on reddit, posted there by the author (https://redd.it/93hetp)
	Code by:	MorePurpleMoreBetter
	Date:		2019-07-29 (sheet v13.0.0beta18)
*/

var iFileName = "Greater Dragonborn [CaelReader's work, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["CR:GD"] = {
	name : "CaelReader: Greater Dragonborn",
	abbreviation : "CR:GD",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/248697/",
	date : "2018/09/21"
};

RaceList["greater dragonborn"] = {
	regExpSearch : /^(?=.*greater)(?=.*dragonborn).*$/i,
	name : "Greater Dragonborn",
	sortname : "Dragonborn, Greater",
	source : [["CR:GD", 0]],
	plural : "Greater Dragonborn",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", "Draconic"],
	armorOptions : {
		regExpSearch : /^(?=.*natural)(?=.*armou?r).*$/i,
		name : "Natural Armor",
		source : [["CR:GD", 0]],
		ac : 13
	},
	armorAdd : "Natural Armor",
	weaponOptions : {
		regExpSearch : /^(?=.*breath)(?=.*weapon).*$/i,
		name : "Breath weapon",
		source : [["CR:GD", 0]],
		ability : 3,
		type : "Natural",
		damage : [2, 6, "fire"],
		range : "15-ft cone",
		description : "Hits all in area; Dex save, success - half damage; Usable only once per short rest",
		abilitytodamage : false,
		dc : true,
		dbBreathWeapon : true
	},
	weaponsAdd : ["Breath Weapon"],
	age : " reach adulthood by 15 and live around 80 years",
	height : " stand well over 6 feet tall (5'6\" + 2d8\")",
	weight : " weigh around 240 lb (175 + 2d8 \xD7 2d6 lb)",
	heightMetric : " stand well over 1,8 metres tall (170 + 5d8 cm)",
	weightMetric : " weigh around 110 kg (80 + 5d8 \xD7 4d6 / 10 kg)",
	trait : "Greater Dragonborn\nDraconic Ancestry: Choose one type of dragon using the \"Racial Options\" button. I gain a breath weapon and damage resistance as determined by the dragon type chosen.\nBreath Weapon: As an action once per short rest, exhale destructive energy as an action with a size, shape, save, and damage type as found in the table.\nNatural Armor: I have an AC of 13 + Dexterity modifier + shield.",
	features : {
		"draconic ancestry" : {
			name : "Draconic Ancestry",
			limfeaname : "Breath Weapon",
			minlevel : 1,
			usages : 1,
			additional : levels.map(function (n) {
				return (n < 5 ? 2 : n < 11 ? 3 : n < 17 ? 4 : 5) + 'd6';
			}),
			recovery : "short rest",
			action : ["action", ""],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.theWea.dbBreathWeapon && CurrentRace.known === 'greater dragonborn' && CurrentRace.variant) {
							fields.Damage_Type = CurrentRace.dmgres[0];
							fields.Description = fields.Description.replace(/(dex|con) save/i, ((/cold|poison/i).test(CurrentRace.dmgres[0]) ? 'Con' : 'Dex') + ' save');
							fields.Range = (/black|blue|brass|bronze|copper/i).test(CurrentRace.variant) ? '5-ft \u00D7 30-ft line' : '15-ft cone';
						};
					}
				],
				atkCalc : [
					function (fields, v, output) {
						if (v.theWea.dbBreathWeapon && CurrentRace.known === 'greater dragonborn' && CurrentRace.level > 4) {
							var dbBreathWeaponDie = CurrentRace.level < 11 ? 3 : CurrentRace.level < 17 ? 4 : 5;
							if (CurrentRace.variant && classes.known.sorcerer && classes.known.sorcerer.subclass == "sorcerer-draconic bloodline" && GetFeatureChoice('class', 'sorcerer', 'subclassfeature1').indexOf(CurrentRace.variant) != -1) dbBreathWeaponDie += 1;
							output.die = output.die.replace('2d6', dbBreathWeaponDie + 'd6');
							if (CurrentRace.variant == "black") output.extraDmg += What('Con Mod');
						};
					}
				]
			}
		}
	},
	variants : []
}

AddRacialVariant("greater dragonborn", "black", {
	regExpSearch : /black/i,
	name : "Greater black dragonborn",
	scores : [1, 0, 2, 0, 0, 0],
	trait : [
		"Greater Black Dragonborn (+1 Strength, +2 Constitution)",
		"Acid Breath Weapon: As an action once per short rest, I can deal 2d6 acid damage to all in a 5 ft by 30 ft line, Dex save halves (DC 8 + Con mod + prof bonus). This damage increases with 1d6 at level 5, 11, and 17.",
		"Brutal and Cruel: I add my Constitution modifier to the damage of my breath weapon.",
		"Natural Armor: I have an AC of 13 + Dexterity modifier + shield."
	].join("\n"),
	dmgres : ["Acid"]
});
AddRacialVariant("greater dragonborn", "blue", {
	regExpSearch : /blue/i,
	name : "Greater blue dragonborn",
	scores : [1, 1, 1, 0, 0, 0],
	trait : [
		"Greater Blue Dragonborn (+1 Str" + (typePF ? ", +1 Dex, +1 Con)" : "ength, +1 Dexterity, +1 Constitution)"),
		"Lightning Breath Weapon: As an action once per short rest, I can deal 2d6 lightning damage to all in a 5 ft by 30 ft line, Dex save halves (DC 8 + Con mod + prof bonus). This damage increases with 1d6 at level 5, 11, and 17.",
		"Desert Predator: As an action, I can burrow myself into loose soil, giving those that try to see me a -5 to their Wisdom (Perception) checks as long as I do not move or take actions.",
		"Natural Armor: I have an AC of 13 + Dexterity modifier + shield."
	].join("\n"),
	dmgres : ["Lightning"],
	action : [["action", "Desert Predator"]]
});
AddRacialVariant("greater dragonborn", "brass", {
	regExpSearch : /brass/i,
	name : "Greater brass dragonborn",
	scores : [2, 0, 0, 0, 0, 1],
	trait : [
		"Greater Brass Dragonborn (+2 Strength, +1 Charisma)",
		"Fire Breath Weapon: As an action once per short rest, I can deal 2d6 fire damage to all in a 5 ft by 30 ft line, Dex save halves (DC 8 + Con mod + prof bonus). This damage increases with 1d6 at level 5, 11, and 17.",
		"Boldly Talkative: I have proficiency in Persuasion.",
		"Natural Armor: I have an AC of 13 + Dexterity modifier + shield."
	].join("\n"),
	dmgres : ["Fire"],
	skills : ["Persuasion"]
});
AddRacialVariant("greater dragonborn", "bronze", {
	regExpSearch : /bronze/i,
	name : "Greater bronze dragonborn",
	scores : [1, 1, 0, 0, 0, 1],
	trait : [
		"Greater Bronze Dragonborn (+1 Str" + (typePF ? ", +1 Con, +1 Cha)" : "ength, +1 Constitution, +1 Charisma)"),
		"Lightning Breath Weapon: As an action once per short rest, I can deal 2d6 lightning damage to all in a 5 ft by 30 ft line, Dex save halves (DC 8 + Con mod + prof bonus). This damage increases with 1d6 at level 5, 11, and 17.",
		"Dragon of the Coast: I have a swim speed of 30 ft.",
		"Natural Armor: I have an AC of 13 + Dexterity modifier + shield."
	].join("\n"),
	dmgres : ["Lightning"],
	speed : {
		walk : { spd : 30, enc : 20 },
		swim : { spd : 30, enc : 20 }
	}
});
AddRacialVariant("greater dragonborn", "copper", {
	regExpSearch : /copper/i,
	name : "Greater copper dragonborn",
	scores : [1, 0, 0, 0, 0, 2],
	trait : [
		"Greater Copper Dragonborn (+1 Strength, +2 Charisma)",
		"Acid Breath Weapon: As an action once per short rest, I can deal 2d6 acid damage to all in a 5 ft by 30 ft line, Dex save halves (DC 8 + Con mod + prof bonus). This damage increases with 1d6 at level 5, 11, and 17.",
		"Good Host: I have proficiency in Performance, and can speak, read, and write one extra language of my choice.",
		"Natural Armor: I have an AC of 13 + Dexterity modifier + shield."
	].join("\n"),
	dmgres : ["Acid"],
	skills : ["Performance"],
	languageProfs : ["Common", "Draconic", 1]
});
AddRacialVariant("greater dragonborn", "gold", {
	regExpSearch : /gold/i,
	name : "Greater gold dragonborn",
	scores : [1, 0, 0, 0, 2, 0],
	trait : [
		"Greater Gold Dragonborn (+1 Strength, +2 Wisdom)",
		"Fire Breath Weapon: As an action once per short rest, I can deal 2d6 fire damage to all in a 15 ft cone, Dex save halves (DC 8 + Con mod + prof bonus). This damage increases with 1d6 at level 5, 11, and 17.",
		"Reserved Companion: I have proficiency in Insight.",
		"Natural Armor: I have an AC of 13 + Dexterity modifier + shield."
	].join("\n"),
	dmgres : ["Fire"],
	skills : ["Insight"]
});
AddRacialVariant("greater dragonborn", "green", {
	regExpSearch : /green/i,
	name : "Greater green dragonborn",
	scores : [1, 0, 0, 0, 0, 2],
	trait : [
		"Greater Green Dragonborn (+1 Strength, +2 Charisma)",
		"Poison Breath Weapon: As an action once per short rest, I can deal 2d6 poison damage to all in a 15 ft cone, Con save halves (DC 8 + Con mod + prof bonus). This damage increases with 1d6 at level 5, 11, and 17.",
		"Manipulative Schemer: I have proficiency in Deception.",
		"Natural Armor: I have an AC of 13 + Dexterity modifier + shield."
	].join("\n"),
	dmgres : ["Poison"],
	skills : ["Deception"]
});
AddRacialVariant("greater dragonborn", "red", {
	regExpSearch : /red/i,
	name : "Greater red dragonborn",
	scores : [2, 0, 1, 0, 0, 0],
	trait : [
		"Greater Red Dragonborn (+2 Strength, +1 Constitution)",
		"Fire Breath Weapon: As an action once per short rest, I can deal 2d6 fire damage to all in a 15 ft cone, Dex save halves (DC 8 + Con mod + prof bonus). This damage increases with 1d6 at level 5, 11, and 17.",
		"Arrogant Tyrant: I have advantage on saving throws to avoid being charmed or frightened.",
		"Natural Armor: I have an AC of 13 + Dexterity modifier + shield."
	].join("\n"),
	dmgres : ["Fire"],
	savetxt : { adv_vs : ["charmed", "frightened"] }
});
AddRacialVariant("greater dragonborn", "silver", {
	regExpSearch : /silver/i,
	name : "Greater silver dragonborn",
	scores : [1, 0, 0, 2, 0, 0],
	trait : [
		"Greater Silver Dragonborn (+1 Strength, +2 Intelligence)",
		"Cold Breath Weapon: As an action once per short rest, I can deal 2d6 cold damage to all in a 15 ft cone, Con save halves (DC 8 + Con mod + prof bonus). This damage increases with 1d6 at level 5, 11, and 17.",
		"Hoarding History: I have proficiency in History.",
		"Natural Armor: I have an AC of 13 + Dexterity modifier + shield."
	].join("\n"),
	dmgres : ["Cold"],
	skills : ["History"]
});
AddRacialVariant("greater dragonborn", "white", {
	regExpSearch : /white/i,
	name : "Greater white dragonborn",
	scores : [1, 0, 2, 0, 0, 0],
	trait : [
		"Greater White Dragonborn (+1 Strength, +2 Constitution)",
		"Cold Breath Weapon: As an action once per short rest, I can deal 2d6 cold damage to all in a 15 ft cone, Con save halves (DC 8 + Con mod + prof bonus). This damage increases with 1d6 at level 5, 11, and 17.",
		"Primal and Vengeful: I have proficiency in Survival.",
		"Natural Armor: I have an AC of 13 + Dexterity modifier + shield."
	].join("\n"),
	dmgres : ["Cold"],
	skills : ["Survival"]
});
