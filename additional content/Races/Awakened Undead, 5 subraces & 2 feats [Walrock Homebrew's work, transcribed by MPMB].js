/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race & Feats
	Effect:		This script adds a player race, Awakened Undead, with 5 subraces: Ghost, Ghoul, Mummy, Revenant, and Skeleton
				This script also adds the two optional feats for the ghost and mummy subraces
				This is taken from the DMs Guild website (https://www.dmsguild.com/product/222229/)
				This subclass is made by Walrock Homebrew
	Code by:	MorePurpleMoreBetter
	Date:		2018-01-22 (sheet v12.999)
	
	Please support the creator of this content (Walrock Homebrew) and download his material from the DMs Guild website: https://www.dmsguild.com/browse.php?author=Walrock%20Homebrew
	
	Note that these races have an 'original' race. Instead of making 5 versions of every race, this code only provides one variant of each of the 5 subraces, for a medium race with speed 30 ft. If you would like to have another 'base' race, you will have to either modify the code here, or manually change things on the sheet after selecting the race.
*/

var iFileName = "Awakened Undead, 5 subraces & 2 feats [Walrock Homebrew's work, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["WH:AU"] = {
	name : "Walrock Homebrew: Awakened Undead v0.4",
	abbreviation : "WH:AU",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/222229/",
	date : "2017/09/22"
};

RaceList["ghost-au"] = {
	regExpSearch : /ghost/i,
	name : "Ghost",
	sortname : "Undead, Ghost",
	source : ["WH:AU", 4],
	plural : "Ghosts",
	size : 3,
	speed : { 
		walk : { spd : 30, enc : 20 },
		fly : { spd : 15, enc : 5 }
	},
	languageProfs : ["Common", 1],
	vision : [["Darkvision", 60]],
	age : " never age as they are sustained by necromantic magic",
	height : " height is determined by the race it was in life",
	weight : " weight is determined by the race it was in life",
	savetxt : { immune : ["poison", "disease"] },
	improvements : "Ghost: +1 Constitution, and +2 Wisdom or Charisma;",
	scores : [0, 0, 1, 0, 0, 0],
	features : {
		"incorporeal stride" : {
			name : "Incorporeal Stride",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			tooltip : ""
		},
		"withering touch" : {
			name : "Withering Touch",
			minlevel : 1,
			calcChanges : {
				atkAdd : ["if (WeaponName === 'unarmed strike') { fields.Damage_Type = 'Necrotic'; }; ", "As a Ghost, my unarmed strikes do necrotic damage instead of bludgeoning."]
			}
		}
	},
	trait : "Ghost (+1 Constitution, and +2 Wisdom or Charisma)\nUndead: I'm immune to poison, being poisoned, and disease. I treat exhaustion as one level less and I don't need to eat or breathe. Instead of sleeping, I trance for 4 hours.\nWithering Touch: My unarmed strikes deal necrotic damage instead of bludgeoning.\nIncorporeal Stride: Once per short rest, I can move up to 10 ft through creatures and objects as difficult terrain. If I end my turn inside an object, I take 1d10 force damage.\nIntangible: I have advantage on all check to resist or escape a grapple."
};
FeatsList["ghostly magic-au"] = {
	name : "Ghostly Magic",
	source : ["WH:AU", 4],
	prerequisite : "Being a Ghost (Awakened Undead)",
	prereqeval : "CurrentRace.known.indexOf('ghost-au') !== -1",
	description : "Three times per long rest, I can cast one of the following spells: Blink, Catapult, Charm Person, Fear, or Invisibility (self only). They are cast at their lowest possible level. Either Wisdom or Charisma is my spellcasting ability for these, chosen when I take this feat.",
	usages : 3,
	recovery : "long rest",
	spellcastingBonus : [{
		name : "Blink",
		spellcastingAbility : 6,
		spells : ["blink"],
		selection : ["blink"]
	}, {
		name : "Catapult",
		spells : [SpellsList["catapult"] ? "catapult" : ""],
		selection : [SpellsList["catapult"] ? "catapult" : ""]
	}, {
		name : "Charm Person",
		spells : ["charm person"],
		selection : ["charm person"]
	}, {
		name : "Fear",
		spells : ["fear"],
		selection : ["fear"]
	}, {
		name : "Invisibility (self only)",
		spells : ["invisibility"],
		selection : ["invisibility"]
	}],
	eval : "theFeat.spellcastingBonus[0].spellcastingAbility = Number(What('Wis')) > Number(What('Cha')) ? 5 : 6;"
};

RaceList["ghoul-au"] = {
	regExpSearch : /ghoul/i,
	name : "Ghoul",
	sortname : "Undead, Ghoul",
	source : ["WH:AU", 4],
	plural : "Ghouls",
	size : 3,
	speed : { walk : { spd : 30, enc : 20 } },
	languageProfs : ["Common", 1],
	vision : [["Darkvision", 60]],
	age : " never age as they are sustained by necromantic magic",
	height : " height is determined by the race it was in life",
	weight : " weight is determined by the race it was in life",
	savetxt : { immune : ["poison", "disease"] },
	improvements : "Ghoul: +1 Constitution, and +2 Strength or Dexterity;",
	scores : [0, 0, 1, 0, 0, 0],
	weapons : ["ghoul fangs", "ghoul claws"],
	features : {
		"feeding" : {
			name : "Feeding",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			tooltip : "",
			additional : levels.map(function (n) { return n + " + Con mod";}),
			action : ["action", ""]
		}
	},
	trait : "Ghoul (+1 Constitution, and +2 Strength or Dexterity)\nUndead: I'm immune to poison, being poisoned, and disease. I treat exhaustion as one level less and I don't need to eat or breathe. Instead of sleeping, I trance for 4 hours.\nFeeding: Once per short rest, as an action, I can feed on a corpse or make a claw or fang attack against a prone creature. If successful, I regain my level + Con mod in HP.\nCurse of the Abyss: If I see a creature drop to 0 HP and have not used my Feeding feature, I must make a DC 15 - half my level Wis save or I have to move and feed on this creature.",
	abilitySave : 3
};
WeaponsList["ghoul fangs"] = {
	regExpSearch : /^(?=.*ghoul)(?=.*fangs).*$/i,
	name : "Ghoul Fangs",
	source : ["WH:AU", 4],
	ability : 1,
	type : "Natural",
	damage : [1, 6, "piercing"],
	range : "Melee",
	description : "",
	abilitytodamage : true,
	monkweapon : true
};
WeaponsList["ghoul claws"] = {
	regExpSearch : /^(?=.*ghoul)(?=.*claws).*$/i,
	name : "Ghoul Claws",
	source : ["WH:AU", 4],
	ability : 1,
	type : "Natural",
	damage : [1, 4, "slashing"],
	range : "Melee",
	description : "Finesse; Con save or paralyzed until the start of my next turn (DC 8+Con+Prof)",
	abilitytodamage : true,
	monkweapon : true
};

RaceList["mummy-au"] = {
	regExpSearch : /mummy/i,
	name : "Mummy",
	sortname : "Undead, Mummy",
	source : ["WH:AU", 5],
	plural : "Mummies",
	size : 3,
	speed : { walk : { spd : 30, enc : 20 } },
	languageProfs : ["Common", 1],
	vision : [["Darkvision", 60]],
	age : " never age as they are sustained by necromantic magic",
	height : " height is determined by the race it was in life",
	weight : " weight is determined by the race it was in life",
	savetxt : { immune : ["poison", "disease"] },
	improvements : "Mummy: +1 Constitution, and +2 Strength, Wisdom, or Charisma;",
	scores : [0, 0, 1, 0, 0, 0],
	weapons : ["dreadful glare"],
	features : {
		"mummy rot" : {
			name : "Mummy Rot",
			minlevel : 1,
			calcChanges : {
				atkAdd : ["if (WeaponName === 'unarmed strike') { fields.Damage_Type = 'Necrotic'; fields.Description += (fields.Description ? '; ' : '') + 'Target gains curse: unable to regain HP for 24 hours'; }; ", "As a Mummy, I can have my unarmed strikes do necrotic damage instead of bludgeoning. Targets of my unarmed strikes are cursed and can't regain HP for 24 hours or until they are the subject of a Remove Curse spell."]
			}
		},
		"dreadful glare" : {
			name : "Dreadful Glare",
			minlevel : 1,
			usages : 1,
			recovery : "short rest",
			tooltip : "",
			action : ["bonus action", ""]
		},
	},
	trait : "Mummy (+1 Constitution, and +2 Strength, Wisdom, or Charisma)\nUndead: I'm immune to poison, being poisoned, and disease. I treat exhaustion as one level less and I don't need to eat or breathe. Instead of sleeping, I trance for 4 hours.\nMummy Rot: Unarmed strikes do necrotic and curse: unable to heal for 24h while cursed.\nDreadful Glare: Once per short rest, as a bonus action, a creature within 60 ft of me must make a Wis save (DC 8+Con+Prof) or be frightened of me until the end of my next turn.\nCanopic Resurrection: If my heart is outside my body, I treat a 15 on a death save as a 20."
};
WeaponsList["dreadful glare"] = {
	regExpSearch : /^(?=.*dreadful)(?=.*glare).*$/i,
	name : "Dreadful Glare",
	source : ["WH:AU", 5],
	ability : 3,
	type : "Natural",
	damage : ["frightened", "", "1 round"],
	range : "60 ft",
	description : "Once per short rest; Bonus action; Wis save or frightened of me until the end of my next turn",
	abilitytodamage : false,
	monkweapon : false,
	dc : true
};
FeatsList["tomb magic-au"] = {
	name : "Tomb Magic",
	source : ["WH:AU", 5],
	prerequisite : "Being a Mummy (Awakened Undead)",
	prereqeval : "CurrentRace.known.indexOf('mummy-au') !== -1",
	description : "I can cast Bestow Curse, Dust Devil, and Inflict Wounds each once per long rest. They are cast at their lowest possible level. Either Wisdom or Charisma is my spellcasting ability for these, chosen when I take this feat.",
	usages : 3,
	recovery : "long rest",
	spellcastingBonus : [{
		name : "Bestow Curse",
		spellcastingAbility : 6,
		spells : [SpellsList["bestow curse"] ? "bestow curse" : ""],
		selection : [SpellsList["bestow curse"] ? "bestow curse" : ""],
		oncelr : true
	}, {
		name : "Dust Devil",
		spells : ["dust devil"],
		selection : ["dust devil"],
		oncelr : true
	}, {
		name : "Inflict Wounds",
		spells : ["inflict wounds"],
		selection : ["inflict wounds"],
		oncelr : true
	}],
	eval : "theFeat.spellcastingBonus[0].spellcastingAbility = Number(What('Wis')) > Number(What('Cha')) ? 5 : 6;"
};

RaceList["revenant-au"] = {
	regExpSearch : /revenant/i,
	name : "Revenant",
	sortname : "Undead, Revenant",
	source : ["WH:AU", 3],
	plural : "Revenants",
	size : 3,
	speed : { walk : { spd : 30, enc : 20 } },
	languageProfs : ["Common", 1],
	vision : [["Darkvision", 60]],
	age : " never age as they are sustained by necromantic magic",
	height : " height is determined by the race it was in life",
	weight : " weight is determined by the race it was in life",
	savetxt : { immune : ["poison", "disease"] },
	improvements : "Revenant: +1 Constitution, and +2 Strength or Charisma;",
	scores : [0, 0, 1, 0, 0, 0],
	features : {
		"unnatural vitality" : {
			name : "Unnatural Vitality",
			minlevel : 1,
			usages : 1,
			recovery : "long rest",
			tooltip : "",
			additional : levels.map(function (n) { return (n*2) + " temp HP";})
		}
	},
	trait : "Revenant (+1 Constitution, and +2 Strength or Charisma)\nUndead: I'm immune to poison, being poisoned, and disease. I treat exhaustion as one level less and I don't need to eat or breathe. Instead of sleeping, I trance for 4 hours.\nEternal Vengeance: I know the general direction and relative distance of one responsible for my death. If it dies, I instantly know and move on to the next responsible, if any.\nUnnatural Vitality: Once per long rest when I drop to 0 HP, I can gain twice my level in temp HP. With only these temp HP, I can make an action or bonus action, but not both."
};

RaceList["skeleton-au"] = {
	regExpSearch : /skeleton/i,
	name : "Skeleton",
	sortname : "Undead, Skeleton",
	source : ["WH:AU", 3],
	plural : "Skeletons",
	size : 3,
	speed : { walk : { spd : 30, enc : 20 } },
	languageProfs : ["Common", 1],
	vision : [["Darkvision", 60]],
	age : " never age as they are sustained by necromantic magic",
	height : " height is determined by the race it was in life",
	weight : " weight is determined by the race it was in life",
	savetxt : { immune : ["poison", "disease"] },
	improvements : "Skeleton: +1 Constitution, and +2 Dexterity or Intelligence;",
	scores : [0, 0, 1, 0, 0, 0],
	weapons : ["skeleton detached arm"],
	features : {
		"bone pile" : {
			name : "Bone Pile",
			minlevel : 1,
			usages : 1,
			recovery : "long rest",
			tooltip : ""
		},
		"bone to pick" : {
			name : "Bone to Pick",
			minlevel : 1,
			action : ["bonus action", " (remove/reattach)"]
		}
	},
	trait : "Skeleton (+1 Constitution, and +2 Dexterity or Intelligence)\nUndead: I'm immune to poison, being poisoned, and disease. I treat exhaustion as one level less and I don't need to eat or breathe. Instead of sleeping, I trance for 4 hours.\nBone Pile: When I am reduced to 0 hit points but not killed outright, I can drop to 1 hit point instead. I can't use this feature again until I finish a long rest.\nBone to Pick: As a bonus action, I can remove an arm (1d6 bludgeoning weapon with which I'm proficient) or a hand (use as thieves' tools). I can re-attach it as a bonus action."
};
WeaponsList["skeleton detached arm"] = {
	regExpSearch : /^(?=.*skeleton)(?=.*arm).*$/i,
	name : "Skeleton Arm",
	source : ["WH:AU", 3],
	ability : 1,
	type : "Natural",
	damage : [1, 6, "bludgeoning"],
	range : "Melee",
	description : "",
	abilitytodamage : true,
	monkweapon : false
};
