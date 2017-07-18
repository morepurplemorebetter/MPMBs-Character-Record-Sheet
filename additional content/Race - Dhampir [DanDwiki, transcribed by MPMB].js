/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Race
	Effect:		This script adds a player race, called "Dhampir"
				This is taken from DanDwiki (https://www.dandwiki.com/wiki/Dhampir_(5e_Race))
				Please note that DanDwiki is renowned for having very unbalanced content
	Code by:	MorePurpleMoreBetter
	Date:		2017-07-16 (sheet v12.995)
*/

RaceList["dhampir"] = {
	regExpSearch : /dhampir/i,
	name : "Dhampir",
	source : ["DanDw", 0],
	plural : "Dhampirs",
	size : 3,
	speed : [30, 20],
	languages : ["Common", "+1 from Dhampir"],
	weapons : ["Vampire's Bite"],
	vision : "Darkvision 120 ft; Sunlight Sensitivity",
	age : " mature at roughly the same rate as humans, but do not age further after reaching maturity, and they do not die of old age",
	height : " range from 5 to 6 feet tall (4'9\" + 2d8\")",
	weight : " weigh around 155 lb (110 + 2d8 \xD7 2d4 lb)",
	heightMetric : " range from 1,5 to 1,8 metres tall (145 + 5d8 cm)",
	weightMetric : " weigh around 70 kg (50 + 5d8 \xD7 4d4 / 10 kg)",
	improvements : "Dhampir: +2 Charsima and +1 to Strength, Dexterity, or Constitution;",
	scores : [0, 0, 0, 0, 0, 2],
	trait : "Dhampir (+2 Charsima and +1 to Strength, Dexterity, or Constitution)" + (typePF ? " " : "\n") + "Sunlight Sensitivity: Disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight when I or what I am trying to attack/perceive is in direct sunlight.\nVampire's Bite: I can use my bite attack if a target is charmed/grappled by me, or if it is incapacitated or restrained. If hit, I can choose to gain the damage dealt as temp HP, my prof. bonus per long rest. Vampiric Gaze: Once per short rest, I can cast charm person without using material components. Charisma is my spellcasting ability for this.",
	abilitySave : 6,
	spellcastingAbility : 6,
	features : {
		"vampire bite" : {
			name : "Vampire's Bite (regain temp hp)",
			minlevel : 1,
			usages : "prof",
			usagescalc : "event.value = What('Proficiency Bonus');",
			recovery : "long rest"
		},
		"vampiric gaze" : {
			name : "Vampiric Gaze",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			action : ["action", ""],
			spellcastingBonus : {
				name : "Vampiric Gaze",
				spells : ["charm person"],
				selection : ["charm person"],
				oncesr : true
			}
		}
	}
};

WeaponsList["vampire bite"] = {
	regExpSearch : /^(?=.*vampir)(?=.*bite).*$/i,
	name : "Vampire's Bite",
	source : ["DanDw", 0],
	ability : 1,
	type : "Natural",
	damage : [1, 6, "necrotic"],
	range : "Melee",
	description : "Finesse; Only on charmed, grappled, incapacitated, or restrained; Can gain temp HP",
	abilitytodamage : true
};

SourceList["DanDw"] = {
	name : "D\u0026D Wiki",
	abbreviation : "D\u0026Dw",
	group : "homebrew",
	url : "http://www.dandwiki.com/wiki/"
};

UpdateDropdown("race");