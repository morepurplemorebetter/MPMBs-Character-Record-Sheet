var ArmourList = {
	"unarmored" : {
		regExpSearch : /(unarmou?red|naked|nothing|bare|no.?armou?r)/i,
		name : "Unarmored",
		type : "",
		ac : 10,
		dex : 2000,
		stealthdis : false,
		weight : 0,
		inventory : false,
		strReq : 0,
	},

	"draconic resilience" : {
		regExpSearch : /^(?=.*(dragon|draconic|scaly))(?=.*(hide|skin|scales|resilience)).*$/i,
		name : "Draconic resilience",
		type : "",
		ac : 13,
		dex : 2000,
		stealthdis : false,
		weight : 0,
		inventory : false,
		strReq : 0,
	},

	"natural armor" : {
		regExpSearch : /^(?=.*natural)(?=.*armor).*$/i,
		name : "Natural Armor",
		type : "",
		ac : 13,
		dex : 2000,
		stealthdis : false,
		weight : 0,
		inventory : false,
		strReq : 0,
	},

	"mage armor" : {
		regExpSearch : /^(?=.*(mage|magic))(?=.*armou?r).*$/i,
		name : "Mage armor",
		type : "",
		ac : 13,
		dex : 2000,
		stealthdis : false,
		weight : 0,
		inventory : false,
		strReq : 0
	},

	"padded" : {
		regExpSearch : /^(?!.*(plate|hide))(?=.*(padding|padded)).*$/i,
		name : "Padded armor",
		type : "light",
		ac : 11,
		dex : 2000,
		stealthdis : true,
		weight : 8,
		inventory : true,
		strReq : 0
	},

	"leather" : {
		regExpSearch : /^(?!.*(padding|padded|studded|studs))(?=.*leather).*$/i,
		name : "Leather armor",
		type : "light",
		ac : 11,
		dex : 2000,
		stealthdis : false,
		weight : 10,
		inventory : true,
		strReq : 0
	},

	"studded leather" : {
		regExpSearch : /^(?=.*(studded|studs))(?=.*leather).*$/i,
		name : "Studded leather armor",
		type : "light",
		ac : 12,
		dex : 2000,
		stealthdis : false,
		weight : 13,
		inventory : true,
		strReq : 0
	},

	"hide" : {
		regExpSearch : /^(?!.*(dragon|draconic))(?=.*(hide|skin)).*$/i,
		name : "Hide armor",
		type : "medium",
		ac : 12,
		dex : 2,
		stealthdis : false,
		weight : 12,
		inventory : true,
		strReq : 0
	},

	"chain shirt" : {
		regExpSearch : /^(?=.*(chain|mail))(?=.*shirt).*$/i,
		name : "Chain shirt",
		type : "medium",
		ac : 13,
		dex : 2,
		stealthdis : false,
		weight : 20,
		inventory : true,
		strReq : 0,
	},

	"scale mail" : {
		regExpSearch : /^(?=.*scale)(?=.*mail).*$/i,
		name : "Scale mail",
		type : "medium",
		ac : 14,
		dex : 2,
		stealthdis : true,
		weight : 45,
		inventory : true,
		strReq : 0,
	},

	"breastplate" : {
		regExpSearch : /^(?=.*breast)(?=.*plate).*$/i,
		name : "Breastplate",
		type : "medium",
		ac : 14,
		dex : 2,
		stealthdis : false,
		weight : 20,
		inventory : true,
		strReq : 0,
	},

	"half plate" : {
		regExpSearch : /^(?=.*half)(?=.*plate).*$/i,
		name : "Half plate",
		type : "medium",
		ac : 15,
		dex : 2,
		stealthdis : true,
		weight : 40,
		inventory : true,
		strReq : 0,
	},

	"ring mail" : {
		regExpSearch : /^(?=.*ring)(?=.*mail).*$/i,
		name : "Ring mail",
		type : "heavy",
		ac : 14,
		dex : 0,
		stealthdis : true,
		weight : 40,
		inventory : true,
		strReq : 0,
	},

	"chain mail" : {
		regExpSearch : /^(?!.*(scale|plate|ring|shirt))(?=.*(chain|mail)).*$/i,
		name : "Chain mail",
		type : "heavy",
		ac : 16,
		dex : 0,
		stealthdis : true,
		weight : 55,
		inventory : true,
		strReq : 13,
	},

	"splint" : {
		regExpSearch : /splint/i,
		name : "Splint armor",
		type : "heavy",
		ac : 17,
		dex : 0,
		stealthdis : true,
		weight : 60,
		inventory : true,
		strReq : 15
	},

	"plate" : {
		regExpSearch : /^(?!.*(half|breast))(?=.*plate).*$/i,
		name : "Plate armor",
		type : "heavy",
		ac : 18,
		dex : 0,
		stealthdis : true,
		weight : 65,
		inventory : true,
		strReq : 15
	},

	"spiked armor" : {
		regExpSearch : /^(?!.*(dragon|draconic|beast))(?=.*spike(d|s)).*$/i,
		name : "Spiked armor",
		type : "medium",
		ac : 14,
		dex : 2,
		stealthdis : true,
		weight : 45,
		inventory : true,
		strReq : 0
	}
}

var WeaponsList = {
	"DropDownList" : [
		"",
		"Battleaxe",
		"Blowgun",
		"Club",
		"Dagger",
		"Dart",
		"Flail",
		"Glaive",
		"Greataxe",
		"Greatclub",
		"Greatsword",
		"Halberd",
		"Hand Crossbow",
		"Handaxe",
		"Heavy Crossbow",
		"Improvised Weapon",
		"Javelin",
		"Lance",
		"Light Crossbow",
		"Light Hammer",
		"Longbow",
		"Longsword",
		"Mace",
		"Maul",
		"Morningstar",
		"Net",
		"Pike",
		"Quarterstaff",
		"Rapier",
		"Scimitar",
		"Shortbow",
		"Shortsword",
		"Sickle",
		"Sling",
		"Spear",
		"Trident",
		"Unarmed Strike",
		"War pick",
		"Warhammer",
		"Whip",
		"",
		"Spell Attack",
		"Acid Splash",
		"Booming Blade",
		"Chill Touch",
		"Eldritch Blast",
		"Fire Bolt",
		"Frostbite",
		"Green-Flame Blade",
		"Lightning Lure",
		"Poison Spray",
		"Produce Flame",
		"Ray of Frost",
		"Sacred Flame",
		"Shillelagh",
		"Shocking Grasp",
		"Sword Burst",
		"Thorn Whip",
		"Thunderclap",
		"Vicious Mockery",
		"",
		"Agonizing Blast",
		"Eldritch Spear",
		"Agonizing Spear",
		"",
		"Axe, Hand",
		"Axe, Battle",
		"Axe, Great",
		"Bow, Short",
		"Bow, Long",
		"Crossbow, Hand",
		"Crossbow, Light",
		"Crossbow, Heavy",
		"Hammer, Light",
		"Hammer, War",
		"Hammer, Great",
		"Sword, Short",
		"Sword, Long",
		"Sword, Great",
	],
	"polearm butt end" : {
		regExpSearch : /^(?=.*(polearm|glaive|halberd|staff))(?=.*butt)(?=.*end).*$/i,
		name : "Polearm butt end",
		ability : 1,
		type : "Natural",
		damage : [1, 4, "bludgeoning"],
		range : "Melee",
		description : "As bonus action after taking an attack action with only a glaive, halberd, or quarterstaff",
		abilitytodamage : true
	},
	"armor spikes" : {
		regExpSearch : /^(?=.*armou?r)(?=.*spike).*$/i,
		name : "Armor spikes",
		ability : 1,
		type : "Other",
		damage : [1, 4, "piercing"],
		range : "Melee",
		description : "Does 3 piercing damage when using your attack to grapple",
		abilitytodamage : true,
	},
	"club" : {
		regExpSearch : /^(?!.*(great|heavy|big))(?=.*\bclub\b).*$/i,
		name : "Club",
		ability : 1,
		type : "Simple",
		damage : [1, 4, "bludgeoning"],
		range : "Melee",
		weight : 2,
		description : "Light",
		abilitytodamage : true,
		monkweapon : true
	},
	"dagger" : {
		regExpSearch : /dagger/i,
		name : "Dagger",
		ability : 1,
		type : "Simple",
		damage : [1, 4, "piercing"],
		range : "Melee, 20/60 ft",
		weight : 1,
		description : "Finesse, light, thrown",
		abilitytodamage : true,
		monkweapon : true
	},
	"greatclub" : {
		regExpSearch : /^(?=.*(great|heavy|big))(?=.*club).*$/i,
		name : "Greatclub",
		ability : 1,
		type : "Simple",
		damage : [1, 8, "bludgeoning"],
		range : "Melee",
		weight : 10,
		description : "Two-handed",
		abilitytodamage : true,
	},
	"handaxe" : {
		regExpSearch : /^(?=.*(light|hand|short|small|throw))(?=.*axe).*$/i,
		name : "Handaxe",
		ability : 1,
		type : "Simple",
		damage : [1, 6, "slashing"],
		range : "Melee, 20/60 ft",
		weight : 2,
		description : "Light, thrown",
		abilitytodamage : true,
		monkweapon : true,
	},
	"javelin" : {
		regExpSearch : /javelin/i,
		name : "Javelin",
		ability : 1,
		type : "Simple",
		damage : [1, 6, "piercing"],
		range : "Melee, 30/120 ft",
		weight : 2,
		description : "Thrown",
		abilitytodamage : true,
		monkweapon : true
	},
	"light hammer" : {
		regExpSearch : /^(?=.*(light|hand|short|small|throw))(?=.*hammer).*$/i,
		name : "Light hammer",
		ability : 1,
		type : "Simple",
		damage : [1, 4, "bludgeoning"],
		range : "Melee, 20/60 ft",
		weight : 2,
		description : "Light, thrown",
		abilitytodamage : true,
		monkweapon : true,
	},
	"mace" : {
		regExpSearch : /mace/i,
		name : "Mace",
		ability : 1,
		type : "Simple",
		damage : [1, 6, "bludgeoning"],
		range : "Melee",
		weight : 4,
		description : "",
		monkweapon : true,
		abilitytodamage : true
	},
	"quarterstaff" : {
		regExpSearch : /staff/i,
		name : "Quarterstaff",
		ability : 1,
		type : "Simple",
		damage : [1, 6, "bludgeoning"],
		range : "Melee",
		weight : 4,
		description : "Versatile (1d8)",
		monkweapon : true,
		abilitytodamage : true
	},
	"sickle" : {
		regExpSearch : /sickle/i,
		name : "Sickle",
		ability : 1,
		type : "Simple",
		damage : [1, 4, "slashing"],
		range : "Melee",
		weight : 2,
		description : "Light",
		monkweapon : true,
		abilitytodamage : true
	},
	"spear" : {
		regExpSearch : /^(?!.*agonizing)(?!.*eldritch)(?=.*spear).*$/i,
		name : "Spear",
		ability : 1,
		type : "Simple",
		damage : [1, 6, "piercing"],
		range : "Melee, 20/60 ft",
		weight : 3,
		description : "Thrown, versatile (1d8)",
		monkweapon : true,
		abilitytodamage : true,
	},
	"unarmed strike" : {
		regExpSearch : /^((?=.*\b(unarmed|fist|arm|leg|foot|feet)\b)|((?=.*martial)(?=.*arts))|((?=.*tavern)(?=.*brawler))).*$/i,
		name : "Unarmed strike",
		ability : 1,
		type : "Natural",
		damage : [1, (CurrentFeats.known.indexOf("tavern brawler") !== -1 ? 4 : ""), "bludgeoning"],
		range : "Melee",
		description : "",
		monkweapon : true,
		abilitytodamage : true,
	},
	"light crossbow" : {
		regExpSearch : /^(((?=.*light)(?=.*crossbow))|((?!.*(hand|short|great|heavy))(?=.*\bcrossbow\b))).*$/i,
		name : "Light crossbow",
		ability : 2,
		type : "Simple",
		damage : [1, 8, "piercing"],
		range : "80/320 ft",
		weight : 5,
		description : "Ammunition, loading, two-handed",
		abilitytodamage : true,
		ammo : "bolt"
	},
	"dart" : {
		regExpSearch : /dart/i,
		name : "Dart",
		ability : 2,
		type : "Simple",
		damage : [1, 4, "piercing"],
		range : "20/60 ft",
		weight : 0.25,
		description : "Finesse, thrown",
		abilitytodamage : true
	},
	"shortbow" : {
		regExpSearch : /^(?!.*crossbow)(((?=.*short)(?=.*bow))|((?!.*long)(?=.*\bbow\b))).*$/i,
		name : "Shortbow",
		ability : 2,
		type : "Simple",
		damage : [1, 6, "piercing"],
		range : "80/320 ft",
		weight : 2,
		description : "Ammunition, two-handed",
		abilitytodamage : true,
		ammo : "arrow"
	},
	"sling" : {
		regExpSearch : /sling/i,
		name : "Sling",
		ability : 2,
		type : "Simple",
		damage : [1, 4, "bludgeoning"],
		range : "30/120 ft",
		weight : 0,
		description : "Ammunition",
		abilitytodamage : true,
		ammo : "bullet"
	},
	"battleaxe" : {
		regExpSearch : /^(((?=.*battle)(?=.*axe))|((?!.*(light|hand|short|small|great|heavy|throw))(?=.*\baxe\b))).*$/i,
		name : "Battleaxe",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "slashing"],
		range : "Melee",
		weight : 4,
		description : "Versatile (1d10)",
		abilitytodamage : true,
	},
	"flail" : {
		regExpSearch : /flail/i,
		name : "Flail",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "bludgeoning"],
		range : "Melee",
		weight : 2,
		description : "",
		abilitytodamage : true
	},
	"glaive" : {
		regExpSearch : /glaive/i,
		name : "Glaive",
		ability : 1,
		type : "Martial",
		damage : [1, 10, "slashing"],
		range : "Melee",
		weight : 6,
		description : "Heavy, reach, two-handed",
		abilitytodamage : true
	},
	"greataxe" : {
		regExpSearch : /^(?=.*(great|heavy))(?=.*axe).*$/i,
		name : "Greataxe",
		ability : 1,
		type : "Martial",
		damage : [1, 12, "slashing"],
		range : "Melee",
		weight : 7,
		description : "Heavy, two-handed",
		abilitytodamage : true,
	},
	"greatsword" : {
		regExpSearch : /^(?=.*(great|heavy))(?=.*sword).*$/i,
		name : "Greatsword",
		ability : 1,
		type : "Martial",
		damage : [2, 6, "slashing"],
		range : "Melee",
		weight : 6,
		description : "Heavy, two-handed",
		abilitytodamage : true,
	},
	"halberd" : {
		regExpSearch : /halberd/i,
		name : "Halberd",
		ability : 1,
		type : "Martial",
		damage : [1, 10, "slashing"],
		range : "Melee",
		weight : 6,
		description : "Heavy, reach, two-handed",
		abilitytodamage : true
	},
	"lance" : {
		regExpSearch : /lance/i,
		name : "Lance",
		ability : 1,
		type : "Martial",
		damage : [1, 12, "piercing"],
		range : "Melee",
		weight : 6,
		description : "Reach, disadvantage to attack within 5 ft, two-handed when not mounted",
		abilitytodamage : true
	},
	"longsword" : {
		regExpSearch : /^((?=.*katana)|((?=.*long)(?=.*sword))|((?!.*(burst|light|hand|short|small|great|heavy))(?=.*\bsword\b))).*$/i,
		name : "Longsword",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "slashing"],
		range : "Melee",
		weight : 3,
		description : "Versatile (1d10)",
		abilitytodamage : true,
	},
	"maul" : {
		regExpSearch : /^((?=.*maul)|((?=.*(great|heavy))(?=.*hammer))).*$/i,
		name : "Maul",
		ability : 1,
		type : "Martial",
		damage : [2, 6, "bludgeoning"],
		range : "Melee",
		weight : 10,
		description : "Heavy, two-handed",
		abilitytodamage : true,
	},
	"morningstar" : {
		regExpSearch : /morningstar/i,
		name : "Morningstar",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "piercing"],
		range : "Melee",
		weight : 4,
		description : "",
		abilitytodamage : true
	},
	"pike" : {
		regExpSearch : /^(?!.*armou?r)(?!.*\bspike)(?=.*pike).*$/i,
		name : "Pike",
		ability : 1,
		type : "Martial",
		damage : [1, 10, "piercing"],
		range : "Melee",
		weight : 18,
		description : "Heavy, reach, two-handed",
		abilitytodamage : true
	},
	"rapier" : {
		regExpSearch : /rapier/i,
		name : "Rapier",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "piercing"],
		range : "Melee",
		weight : 2,
		description : "Finesse",
		abilitytodamage : true
	},
	"scimitar" : {
		regExpSearch : /scimitar/i,
		name : "Scimitar",
		ability : 1,
		type : "Martial",
		damage : [1, 6, "slashing"],
		range : "Melee",
		weight : 3,
		description : "Finesse, light",
		abilitytodamage : true
	},
	"shortsword" : {
		regExpSearch : /^(?=.*short)(?=.*sword).*$/i,
		name : "Shortsword",
		ability : 1,
		type : "Martial",
		damage : [1, 6, "piercing"],
		range : "Melee",
		weight : 2,
		description : "Finesse, light",
		abilitytodamage : true,
		monkweapon : true
	},
	"trident" : {
		regExpSearch : /trident/i,
		name : "Trident",
		ability : 1,
		type : "Martial",
		damage : [1, 6, "piercing"],
		range : "Melee, 20/60 ft",
		weight : 4,
		description : "Thrown, versatile (1d8)",
		abilitytodamage : true
	},
	"war pick" : {
		regExpSearch : /^(((?=.*pick)(?=.*war))|((?!.*(heavy|great|light))(?=.*\bpick\b))).*$/i,
		name : "War pick",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "piercing"],
		range : "Melee",
		weight : 2,
		description : "",
		abilitytodamage : true,
	},
	"warhammer" : {
		regExpSearch : /^(((?=.*hammer)(?=.*war))|((?!.*(light|hand|short|small|great|heavy|throw|maul))(?=.*\bhammer\b))).*$/i,
		name : "Warhammer",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "bludgeoning"],
		range : "Melee",
		weight : 2,
		description : "Versatile (1d10)",
		abilitytodamage : true,
	},
	"whip" : {
		regExpSearch : /^(?!.*thorn)(?=.*whip).*$/i,
		name : "Whip",
		ability : 1,
		type : "Martial",
		damage : [1, 4, "slashing"],
		range : "Melee",
		weight : 3,
		description : "Finesse, reach",
		abilitytodamage : true
	},
	"blowgun" : {
		regExpSearch : /blowgun/i,
		name : "Blowgun",
		ability : 2,
		type : "Martial",
		damage : [1, "", "piercing"],
		range : "25/100 ft",
		weight : 1,
		description : "Ammunition, loading",
		abilitytodamage : true,
		ammo : "needle"
	},
	"hand crossbow" : {
		regExpSearch : /^(?=.*hand)(?=.*crossbow).*$/i,
		name : "Hand crossbow",
		ability : 2,
		type : "Martial",
		damage : [1, 6, "piercing"],
		range : "30/120 ft",
		weight : 3,
		description : "Ammunition, light, loading",
		abilitytodamage : true,
		ammo : "bolt"
	},
	"heavy crossbow" : {
		regExpSearch : /^(?=.*(great|heavy))(?=.*crossbow).*$/i,
		name : "Heavy crossbow",
		ability : 2,
		type : "Martial",
		damage : [1, 10, "piercing"],
		range : "100/400 ft",
		weight : 18,
		description : "Ammunition, heavy, loading, two-handed",
		abilitytodamage : true,
		ammo : "bolt"
	},
	"longbow" : {
		regExpSearch : /^(?!.*crossbow)(?=.*long)(?=.*bow).*$/i,
		name : "Longbow",
		ability : 2,
		type : "Martial",
		damage : [1, 8, "piercing"],
		range : "150/600 ft",
		weight : 2,
		description : "Ammunition, heavy, two-handed",
		abilitytodamage : true,
		ammo : "arrow"
	},
	"net" : {
		regExpSearch : /\bnet(ting)?\b/i,
		name : "Net",
		ability : 2,
		type : "Martial",
		damage : ["\u2015", "", 0],
		range : " 5/15 ft",
		weight : 3,
		description : "Thrown, only 1 attack, up to large creature hit is restrained (PHB 148)",
		abilitytodamage : false
	},
	"acid splash" : {
		regExpSearch : /^(?=.*acid)(?=.*splash).*$/i,
		name : "Acid Splash",
		ability : 4,
		type : "Cantrip",
		damage : ["C", 6, "acid"],
		range : "60 ft",
		description : "Dex save, success - no damage; 1 or 2 creatures within 5 ft of each other (PHB 211)",
		abilitytodamage : false,
		dc : true
	},
	"booming blade" : {
		regExpSearch : /^(?=.*booming)(?=.*blade).*$/i,
		name : "Booming Blade",
		ability : 6,
		type : "Cantrip",
		damage : ["B", 8, "thunder", "/Cd8"],
		range : "With melee wea",
		description : "First damage added to the attack; second to the target if it moves next round (SCAG 142)",
		abilitytodamage : false
	},
	"chill touch" : {
		regExpSearch : /^(?=.*chill)(?=.*touch).*$/i,
		name : "Chill Touch",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 8, "necrotic"],
		range : "120 ft",
		description : "Target can't regain HP and undead dis. on attacks vs. me, until my next turn (PHB 221)",
		abilitytodamage : false
	},
	"agonizing blast" : {
		regExpSearch : /^(?!.*spear)(?=.*agonizing)(?=.*blast).*$/i,
		name : "Eldritch Blast (Agonizing Blast)",
		ability : 6,
		type : "Cantrip",
		damage : ["C\u00D7" + 1, 10, "force"],
		range : "120 ft",
		description : "Each d10 is a separate beam requiring separate rolls (PHB 237)",
		abilitytodamage : true,
		SpellsList : "eldritch blast",
	},
	"agonizing spear" : {
		regExpSearch : /^(?=.*agonizing)(?=.*spear).*$/i,
		name : "Eldritch Blast (Agonizing Blast & Eldritch Spear)",
		ability : 6,
		type : "Cantrip",
		damage : ["C\u00D7" + 1, 10, "force"],
		range : "300 ft",
		description : "Each d10 is a separate beam requiring separate rolls (PHB 237)",
		abilitytodamage : true,
		SpellsList : "eldritch blast",
	},
	"eldritch blast" : {
		regExpSearch : /^(?!.*agonizing)(?!.*spear)(?=.*eldritch)(?=.*blast).*$/i,
		name : "Eldritch Blast",
		ability : 6,
		type : "Cantrip",
		damage : ["C\u00D7" + 1, 10, "force"],
		range : "120 ft",
		description : "Each d10 is a separate beam requiring separate rolls (PHB 237)",
		abilitytodamage : false
	},
	"eldritch spear" : {
		regExpSearch : /^(?!.*agonizing)(?=.*eldritch)(?=.*spear).*$/i,
		name : "Eldritch Blast (Eldritch Spear)",
		ability : 6,
		type : "Cantrip",
		damage : ["C\u00D7" + 1, 10, "force"],
		range : "300 ft",
		description : "Each d10 is a separate beam requiring separate rolls (PHB 237)",
		abilitytodamage : false,
		SpellsList : "eldritch blast",
	},
	"fire bolt" : {
		regExpSearch : /^(?=.*fire)(?=.*bolt).*$/i,
		name : "Fire Bolt",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 10, "fire"],
		range : "120 ft",
		description : "Unattended flammable objects ignite (PHB 241)",
		abilitytodamage : false
	},
	"frostbite" : {
		regExpSearch : /frostbite/i,
		name : "Frostbite",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 6, "cold"],
		range : "60 ft",
		description : "Con save, success - no damage, fail - also disadv. on next weapon attack roll in next turn; 1 creature (EE 18)",
		abilitytodamage : false,
		dc : true
	},
	"green-flame blade" : {
		regExpSearch : /^(?=.*green)(?=.*flame)(?=.*blade).*$/i,
		name : "Green-Flame Blade",
		ability : 6,
		type : "Cantrip",
		damage : ["B", 8, "fire", "/Bd8"],
		range : "With melee wea",
		description : "First damage added to the attack; second to a target within 5 ft (SCAG 143)",
		abilitytodamage : true
	},
	"lightning lure" : {
		regExpSearch : /^(?=.*lightning)(?=.*lure).*$/i,
		name : "Lightning Lure",
		ability : 5,
		type : "Cantrip",
		damage : ["C", 8, "lightning"],
		range : "15 ft",
		description : "Str save; success - nothing; fail - pulled 10 ft closer to me, only take damage if end within 5 ft of me (SCAG 143)",
		abilitytodamage : false,
		dc : true
	},
	"poison spray" : {
		regExpSearch : /^(?=.*poison)(?=.*spray).*$/i,
		name : "Poison Spray",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 12, "poison"],
		range : "10 ft",
		description : "Con save, success - no damage; 1 creature (PHB 266)",
		abilitytodamage : false,
		dc : true
	},
	"produce flame" : {
		regExpSearch : /^(?=.*produce)(?=.*flame).*$/i,
		name : "Produce Flame",
		ability : 5,
		type : "Cantrip",
		damage : ["C", 8, "fire"],
		range : "30 ft",
		description : "10-ft radius bright light and 10-ft radius dim light until thrown (PHB269)",
		abilitytodamage : false
	},
	"ray of frost" : {
		regExpSearch : /^(?=.*ray)(?=.*frost).*$/i,
		name : "Ray of Frost",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 8, "cold"],
		range : "60 ft",
		description : "Target -10 ft speed until start of my next turn (PHB 271)",
		abilitytodamage : false
	},
	"sacred flame" : {
		regExpSearch : /^(?=.*sacred)(?=.*flame).*$/i,
		name : "Sacred Flame",
		ability : 5,
		type : "Cantrip",
		damage : ["C", 8, "radiant"],
		range : "60 ft",
		description : "Dex save, no bonus from cover, success - no damage; 1 creature (PHB 272)",
		abilitytodamage : false,
		dc : true
	},
	"shillelagh" : {
		regExpSearch : /shillelagh/i,
		name : "Shillelagh",
		ability : 5,
		type : "Spell",
		damage : [1, 8, "bludgeoning"],
		range : "Melee",
		description : "Imbued club or quarterstaff; Counts as a magical weapon (PHB 275)",
		abilitytodamage : true
	},
	"shocking grasp" : {
		regExpSearch : /^(?=.*shocking)(?=.*grasp).*$/i,
		name : "Shocking Grasp",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 8, "lightning"],
		range : "Melee",
		description : "Advantage if target is wearing metal armor, target cannot take reactions until its next turn (PHB 275)",
		abilitytodamage : false
	},
	"sword burst" : {
		regExpSearch : /^(?=.*sword)(?=.*burst).*$/i,
		name : "Sword Burst",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 6, "force"],
		range : "5 ft",
		description : "Dex save, success - no damage; all creatures in range (SCAG 143)",
		abilitytodamage : false,
		dc : true
	},
	"thorn whip" : {
		regExpSearch : /^(?=.*thorn)(?=.*whip).*$/i,
		name : "Thorn Whip",
		ability : 5,
		type : "Cantrip",
		damage : ["C", 6, "piercing"],
		range : "Melee, 30 ft",
		description : "Melee spell attack, pull target 10 ft closer to me (PHB 282)",
		abilitytodamage : false
	},
	"thunderclap" : {
		regExpSearch : /thunderclap/i,
		name : "Thunderclap",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 6, "thunder"],
		range : "5-ft radius",
		description : "Con save, success - no damage; all creatures in area; audible in 100 ft (EE 22)",
		abilitytodamage : false,
		dc : true
	},
	"vicious mockery" : {
		regExpSearch : /^(?=.*vicious)(?=.*mockery).*$/i,
		name : "Vicious Mockery",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 4, "psychic"],
		range : "60 ft",
		description : "Wis save, success - no damage, fail - also disadv. on next attack roll in next turn; 1 creature (PHB 285)",
		abilitytodamage : false,
		dc : true
	},
	"spell attack" : {
		regExpSearch : /^(?=.*spell)(?=.*attack).*$/i,
		name : "Spell Attack",
		ability : 6,
		type : "Spell",
		damage : ["", "", ""],
		range : "",
		description : "",
		abilitytodamage : false
	},
	"improvised weapon" : {
		regExpSearch : /^(?=.*improvised).*$/i,
		name : "Improvised weapon",
		ability : 1,
		type : (CurrentFeats.known.indexOf("tavern brawler") !== -1 ? "Natural" : "Other"),
		damage : [1, 4, "bludgeoning"],
		range : "Melee, 20/60 ft",
		description : "Damage die, type, range, etc. are at the DM's discretion",
		abilitytodamage : true
	},
	
	// VGtM Lizardfolk weapon
	"bite" : {
		regExpSearch : /\bbite\b/i,
		name : "Bite",
		ability : 1,
		type : "Natural",
		damage : [1, 6, "piercing"],
		range : "Melee",
		description : "",
		abilitytodamage : true
	},
	
	// VGtM Tabaxi weapon
	"cat's claws" : {
		regExpSearch : /\bclaws?\b/i,
		name : "Cat's Claws",
		ability : 1,
		type : "Natural",
		damage : [1, 4, "slashing"],
		range : "Melee",
		description : "",
		abilitytodamage : true
	},
	
	// UA Minotaur weapon
	"horns" : {
		regExpSearch : /\bhorns?\b/i,
		name : "Horns",
		ability : 1,
		type : "Natural",
		damage : [1, 10, "piercing"],
		range : "Melee",
		description : "Advantage on all checks made to shove a creature, but not to avoid being shoved myself",
		abilitytodamage : true
	},
	
	// UA Shifter weapons
	"longtooth" : {
		regExpSearch : /\blongtooth\b/i,
		name : "Longtooth",
		ability : 1,
		type : "Natural",
		damage : [1, 6, "piercing"],
		range : "Melee",
		description : "While shifted, target up to my size is grappled",
		abilitytodamage : true
	},
	"razorclaw" : {
		regExpSearch : /\brazorclaw\b/i,
		name : "Razorclaw",
		ability : 1,
		type : "Natural",
		damage : [1, (CurrentFeats.known.indexOf("tavern brawler") !== -1 ? 4 : ""), "slashing"],
		range : "Melee",
		description : "While shifted, bonus action, can use Dex for attack roll and damage",
		monkweapon : true,
		abilitytodamage : true
	},
	
	// EE Aarakocra weapon
	"talons" : {
		regExpSearch : /\btalons?\b/i,
		name : "Talons",
		ability : 1,
		type : "Natural",
		damage : [1, 4, "slashing"],
		range : "Melee",
		description : "",
		monkweapon : true,
		abilitytodamage : true
	},
	
	// SCAG Monk addition
	"radiant sun bolt" : {
		regExpSearch : /^(?=.*radiant)(?=.*(sun|light))(?=.*bolt).*$/i,
		name : "Radiant Sun Bolt",
		ability : 2,
		type : "Natural",
		damage : [1, 4, "radiant"],
		range : "30 ft",
		description : "If used in an Attack action, spend 1 ki point to use it twice as a bonus action",
		monkweapon : true,
		abilitytodamage : true
	},
	
	// UA Artificer weapon
	"thunder cannon" : {
		regExpSearch : /^(?=.*\bthunder)(?=.*cannon\b).*$/i,
		name : "Thunder Cannon",
		ability : 2,
		type : "Exotic",
		damage : [2, 6, "piercing"],
		range : "150/500 ft",
		weight : 12, // made up, based on the weight of real rifles
		description : "Ammunition, loading, two-handed, bonus action to reload",
		abilitytodamage : true,
		ammo : "arcane magazine"
	}
};

//A list of all types of 'ammo' for the ammunition section on the first page
var AmmoList = {
	"arrow" : {
		name : "Arrows",
		weight : 0.05,
		icon : "Arrows",
		checks : [".Top", ".Base"],
		display : 20,
	},
	"bolt" : {
		name : "Bolts",
		weight : 0.075,
		icon : "Arrows",
		checks : [".Top", ".Base"],
		display : 20,
		invName : "Crossbow bolts"
	},
	"bullet" : {
		name : "Bullets",
		weight : 0.075,
		icon : "Bullets",
		checks : [".Bullet"],
		display : 50,
		invName : "Sling bullets"
	},
	"dagger" : {
		name : "Daggers",
		weight : 1,
		icon : "Daggers",
		checks : [".Top"],
		display : 10,
	},
	"dart" : {
		name : "Darts",
		weight : 0.25,
		icon : "Arrows",
		checks : [".Top", ".Base"],
		display : 20,
	},
	"flask" : {
		name : "Flasks (1 pint)",
		weight : 1,
		icon : "Flasks",
		checks : [".Top", ".Base"],
		display : 20,
	},
	"axe" : {
		name : "Handaxes",
		weight : 2,
		icon : "Axes",
		checks : [".Top.Axe", ".Base.Axe"],
		display : 8,
	},
	"javelin" : {
		name : "Javelins",
		weight : 2,
		icon : "Spears",
		checks : [".Base"],
		display : 10,
	},
	"hammer" : {
		name : "Light Hammers",
		weight : 2,
		icon : "Hammers",
		checks : [".Top.Axe", ".Base.Axe"],
		display : 8,
	},
	"needle" : {
		name : "Needles",
		weight : 0.02,
		icon : "Bullets",
		checks : [".Bullet"],
		display : 50,
		invName : "Blowgun needles"
	},
	"spear" : {
		name : "Spears",
		weight : 3,
		icon : "Spears",
		checks : [".Base"],
		display : 10,
	},
	"trident" : {
		name : "Tridents",
		weight : 4,
		icon : "Spears",
		checks : [".Base"],
		display : 10,
	},
	"vial" : {
		name : "Vials (4 ounces)",
		weight : 0.25,
		icon : "Vials",
		checks : [".Top", ".Base"],
		display : 20,
	},
	
	// UA Artificer ammo
	"arcane magazine" : {
		name : "Arcane Magazine",
		weight : 0.2, // based on the weight of renaissance bullets from the DMG
		icon : "Bullets",
		checks : [".Bullet"],
		display : 50,
		invName : "Thunder Cannon Rounds"
	}
}

var PacksList = {
	"burglar's pack (16 gp)" : [
		["Backpack, with:", "", 5],
		["Bag of 1000 ball bearings", 1, 2],
		["String, feet of", 10, ""],
		["Bell", "", ""],
		["Candles", 5, ""],
		["Crowbar", "", 5],
		["Hammer", "", 3],
		["Pitons", 10, .25],
		["Hooded lantern", "", 2],
		["Oil, flasks of", 2, 1],
		["Rations, days of", 5, 2],
		["Tinderbox", "", 1],
		["Waterskin", "", 5],
		["Hempen rope, feet of", 50, 0.2]
	],
	"diplomat's pack (39 gp)" : [
		["Chest, with:", "", 25],
		["Map or scroll case", 2, 1],
		["Fine clothes", "", 6],
		["Ink, 1 ounce bottle of", "", ""],
		["Ink pen", "", ""],
		["Lamp", "", 1],
		["Oil, flasks of", 2, 1],
		["Paper, sheets of", 5, ""],
		["Perfume, vial of", "", ""],
		["Sealing Wax", "", ""],
		["Soap", "", ""]
	],
	"dungeoneer's pack (12 gp)" : [
		["Backpack, with:", "", 5],
		["Crowbar", "", 5],
		["Hammer", "", 3],
		["Pitons", 10, .25],
		["Torches", 10, 1],
		["Tinderbox", "", 1],
		["Rations, days of", 10, 2],
		["Waterskin", "", 5],
		["Hempen rope, feet of", 50, 0.2]
	],
	"entertainer's pack (40 gp)" : [
		["Backpack, with:", "", 5],
		["Bedroll", "", 7],
		["Costumes", 2, 4],
		["Candles", 5, ""],
		["Rations, days of", 5, 2],
		["Waterskin", "", 5],
		["Disguise kit", "", 3]
	],
	"explorer's pack (10 gp)" : [
		["Backpack, with:", "", 5],
		["Bedroll", "", 7],
		["Mess kit", "", 1],
		["Tinderbox", "", 1],
		["Torches", 10, 1],
		["Rations, days of", 10, 2],
		["Waterskin", "", 5],
		["Hempen rope, feet of", 50, 0.2]
	],
	"priest's pack (19 gp)" : [
		["Backpack, with:", "", 5],
		["Blanket", "", 3],
		["Candles", 10, ""],
		["Tinderbox", "", 1],
		["Alms box", "", 1],
		["Incense, blocks of", 2, ""],
		["Censer", "", 1],
		["Vestments", "", 4],
		["Rations, days of", 2, 2],
		["Waterskin", "", 5]
	],
	"scholar's pack (40 gp)" : [
		["Backpack, with:", "", 5],
		["Book of lore", "", 5],
		["Ink, 1 ounce bottle of", "", ""],
		["Ink pen", "", ""],
		["Parchment, sheets of", 10, ""],
		["Little bag of sand", "", 1],
		["Small knife", "", 0.25]
	]
};

var GearList = {
	"abacus [2 gp]" : {
		infoname : "Abacus [2 gp]",
		name : "Abacus",
		amount : "",
		weight : 2
	},
	"acid (vial) [25 gp]" : {
		infoname : "Acid (vial) [25 gp]",
		name : "Acid, vials of",
		amount : "",
		weight : 1
	},
	"alchemists fire (flask) [50 gp]" : {
		infoname : "Alchemists fire (flask) [50 gp]",
		name : "Alchemists fire, flasks of",
		amount : "",
		weight : 1
	},
	"ammunition:" : {
		infoname : "Ammunition:",
		name : "-",
		amount : "",
		weight : ""
	},
	"   arrows (20) [1 gp]" : {
		infoname : "   Arrows (20) [1 gp]",
		name : "Arrows",
		amount : 20,
		weight : 0.05
	},
	"   blowgun needles (50) [1 gp]" : {
		infoname : "   Blowgun needles (50) [1 gp]",
		name : "Blowgun needles",
		amount : 50,
		weight : 0.02
	},
	"   crossbow bolts (20) [1 gp]" : {
		infoname : "   Crossbow bolts (20) [1 gp]",
		name : "Crossbow bolts",
		amount : 20,
		weight : 0.075
	},
	"   sling bullets (20) [4 cp]" : {
		infoname : "   Sling bullets (20) [4 cp]",
		name : "Sling bullets",
		amount : 20,
		weight : 0.075
	},
	"antitoxin (vial) [50 gp]" : {
		infoname : "Antitoxin (vial) [50 gp]",
		name : "Antitoxin, vials of",
		amount : "",
		weight : ""
	},
	"arcane focus:" : {
		infoname : "Arcane focus:",
		name : "-",
		amount : "",
		weight : ""
	},
	"   crystal [10 gp]" : {
		infoname : "   Crystal [10 gp]",
		name : "Crystal arcane focus",
		amount : "",
		weight : 1
	},
	"   orb [20 gp]" : {
		infoname : "   Orb [20 gp]",
		name : "Orb arcane focus",
		amount : "",
		weight : 3
	},
	"   rod [10 gp]" : {
		infoname : "   Rod [10 gp]",
		name : "Rod arcane focus",
		amount : "",
		weight : 2
	},
	"   staff [5 gp]" : {
		infoname : "   Staff [5 gp]",
		name : "Staff arcane focus",
		amount : "",
		weight : 4
	},
	"   wand [10 gp]" : {
		infoname : "   Wand [10 gp]",
		name : "Wand arcane focus",
		amount : "",
		weight : 1
	},
	"backpack [2 gp]" : {
		infoname : "Backpack [2 gp]",
		name : "Backpack",
		amount : "",
		weight : 5
	},
	"ball bearings (bag of 1,000) [1 gp]" : {
		infoname : "Ball bearings (bag of 1,000) [1 gp]",
		name : "Bag of 1000 ball bearings",
		amount : "",
		weight : 2
	},
	"barrel [2 gp]" : {
		infoname : "Barrel [2 gp]",
		name : "Barrel",
		amount : "",
		weight : 70
	},
	"basket [4 sp]" : {
		infoname : "Basket [4 sp]",
		name : "Basket",
		amount : "",
		weight : 2
	},
	"bedroll [1 gp]" : {
		infoname : "Bedroll [1 gp]",
		name : "Bedroll",
		amount : "",
		weight : 7
	},
	"bell [1 gp]" : {
		infoname : "Bell [1 gp]",
		name : "Bell",
		amount : "",
		weight : ""
	},
	"blanket [5 sp]" : {
		infoname : "Blanket [5 sp]",
		name : "Blanket",
		amount : "",
		weight : 3
	},
	"block and tackle [1 gp]" : {
		infoname : "Block and tackle [1 gp]",
		name : "Block and tackle",
		amount : "",
		weight : 5
	},
	"book [25 gp]" : {
		infoname : "Book [25 gp]",
		name : "Book",
		amount : "",
		weight : 5
	},
	"bottle, glass [2 gp]" : {
		infoname : "Bottle, glass [2 gp]",
		name : "Glass bottle",
		amount : "",
		weight : 2
	},
	"bucket [5 sp]" : {
		infoname : "Bucket [5 sp]",
		name : "Bucket",
		amount : "",
		weight : 2
	},
	"caltrops [1 gp]" : {
		infoname : "Caltrops [1 gp]",
		name : "Caltrops",
		amount : 20,
		weight : 0.1
	},
	"candle [1 cp]" : {
		infoname : "Candle [1 cp]",
		name : "Candle",
		amount : "",
		weight : ""
	},
	"case, crossbow bolt [1 gp]" : {
		infoname : "Case, crossbow bolt [1 gp]",
		name : "Crossbow bolt case",
		amount : "",
		weight : 1
	},
	"case, map or scroll [1 gp]" : {
		infoname : "Case, map or scroll [1 gp]",
		name : "Map or scroll case",
		amount : "",
		weight : 1
	},
	"chain (10 feet) [5 gp]" : {
		infoname : "Chain (10 feet) [5 gp]",
		name : "Chain, feet of",
		amount : 10,
		weight : 1
	},
	"chalk (1 piece) [1 cp]" : {
		infoname : "Chalk (1 piece) [1 cp]",
		name : "Chalk, pieces of",
		amount : "",
		weight : ""
	},
	"chest [5 gp]" : {
		infoname : "Chest [5 gp]",
		name : "Chest",
		amount : "",
		weight : 25
	},
	"climber's kit [25 gp]" : {
		infoname : "Climber's kit [25 gp]",
		name : "Climber's kit",
		amount : "",
		weight : 12
	},
	"clothes:" : {
		infoname : "Clothes:",
		name : "-",
		amount : "",
		weight : ""
	},
	"   common [5 sp]" : {
		infoname : "   Common [5 sp]",
		name : "Common clothes",
		amount : "",
		weight : 3
	},
	"   costume [5 gp]" : {
		infoname : "   Costume [5 gp]",
		name : "Costume clothes",
		amount : "",
		weight : 4
	},
	"   fine [15 gp]" : {
		infoname : "   Fine [15 gp]",
		name : "Fine clothes",
		amount : "",
		weight : 6
	},
	"   traveler's [2 gp]" : {
		infoname : "   Traveler's [2 gp]",
		name : "Traveler's clothes",
		amount : "",
		weight : 4
	},
	"component pouch [25 gp]" : {
		infoname : "Component pouch [25 gp]",
		name : "Component pouch",
		amount : "",
		weight : 2
	},
	"crowbar [2 gp]" : {
		infoname : "Crowbar [2 gp]",
		name : "Crowbar",
		amount : "",
		weight : 5
	},
	"druidic focus:" : {
		infoname : "Druidic focus:",
		name : "-",
		amount : "",
		weight : ""
	},
	"   sprig of mistletoe [1 gp]" : {
		infoname : "   Sprig of mistletoe [1 gp]",
		name : "Sprig of mistletoe druidic focus",
		amount : "",
		weight : ""
	},
	"   totem [1 gp]" : {
		infoname : "   Totem [1 gp]",
		name : "Totem druidic focus",
		amount : "",
		weight : ""
	},
	"   wooden staff [5 gp]" : {
		infoname : "   Wooden staff [5 gp]",
		name : "Wooden staff druidic focus",
		amount : "",
		weight : 4
	},
	"   yew wand  [10 gp]" : {
		infoname : "   Yew wand  [10 gp]",
		name : "Yew wand druidic focus",
		amount : "",
		weight : 1
	},
	"fishing tackle [1 gp]" : {
		infoname : "Fishing tackle [1 gp]",
		name : "Fishing tackle",
		amount : "",
		weight : 4
	},
	"flask or tankard [2 cp]" : {
		infoname : "Flask or tankard [2 cp]",
		name : "Flask or tankard",
		amount : "",
		weight : 1
	},
	"grappling hook [2 gp]" : {
		infoname : "Grappling hook [2 gp]",
		name : "Grappling hook",
		amount : "",
		weight : 4
	},
	"hammer [1 gp]" : {
		infoname : "Hammer [1 gp]",
		name : "Hammer",
		amount : "",
		weight : 3
	},
	"hammer, sledge [2 gp]" : {
		infoname : "Hammer, sledge [2 gp]",
		name : "Sledge hammer",
		amount : "",
		weight : 10
	},
	"healer's kit [5 gp]" : {
		infoname : "Healer's kit [5 gp]",
		name : "Healer's kit",
		amount : "",
		weight : 3
	},
	"holy symbol:" : {
		infoname : "Holy symbol:",
		name : "-",
		amount : "",
		weight : ""
	},
	"   amulet [5 gp]" : {
		infoname : "   Amulet [5 gp]",
		name : "Amulet holy symbol",
		amount : "",
		weight : 1
	},
	"   emblem [5 gp]" : {
		infoname : "   Emblem [5 gp]",
		name : "Emblem holy symbol",
		amount : "",
		weight : ""
	},
	"   reliquary [5 gp]" : {
		infoname : "   Reliquary [5 gp]",
		name : "Reliquary holy symbol",
		amount : "",
		weight : 2
	},
	"holy water (flask) [25 gp]" : {
		infoname : "Holy water (flask) [25 gp]",
		name : "Holy water, flasks of",
		amount : "",
		weight : 1
	},
	"hourglass [25 gp]" : {
		infoname : "Hourglass [25 gp]",
		name : "Hourglass",
		amount : "",
		weight : 1
	},
	"hunting trap [5 gp]" : {
		infoname : "Hunting trap [5 gp]",
		name : "Hunting trap",
		amount : "",
		weight : 25
	},
	"ink (1 once bottle) [10 gp]" : {
		infoname : "Ink (1 once bottle) [10 gp]",
		name : "Ink, 1 ounce bottle of",
		amount : "",
		weight : ""
	},
	"ink pen [2 cp]" : {
		infoname : "Ink pen [2 cp]",
		name : "Ink pen",
		amount : "",
		weight : ""
	},
	"jug or pitcher [2 cp]" : {
		infoname : "Jug or pitcher [2 cp]",
		name : "Jug or pitcher",
		amount : "",
		weight : 4
	},
	"small knife [1 gp]" : {
		infoname : "Small Knife [1 sp]",
		name : "Small Knife",
		amount : "",
		weight : 0.25
	},
	"ladder (10-foot) [1 sp]" : {
		infoname : "Ladder (10-foot) [1 sp]",
		name : "10-foot ladder",
		amount : "",
		weight : 25
	},
	"lamp [5 sp]" : {
		infoname : "Lamp [5 sp]",
		name : "Lamp",
		amount : "",
		weight : 1
	},
	"lantern, bullseye [10 gp]" : {
		infoname : "Lantern, bullseye [10 gp]",
		name : "Bullseye lantern",
		amount : "",
		weight : 2
	},
	"lantern, hooded [5 gp]" : {
		infoname : "Lantern, hooded [5 gp]",
		name : "Hooded lantern",
		amount : "",
		weight : 2
	},
	"lock [10 gp]" : {
		infoname : "Lock [10 gp]",
		name : "Lock",
		amount : "",
		weight : 1
	},
	"magnifying glass [100 gp]" : {
		infoname : "Magnifying glass [100 gp]",
		name : "Magnifying glass",
		amount : "",
		weight : ""
	},
	"manacles [2 gp]" : {
		infoname : "Manacles [2 gp]",
		name : "Manacles",
		amount : "",
		weight : 6
	},
	"mess kit [2 sp]" : {
		infoname : "Mess kit [2 sp]",
		name : "Mess kit",
		amount : "",
		weight : 1
	},
	"mirror, steel [5 gp]" : {
		infoname : "Mirror, steel [5 gp]",
		name : "Steel mirror",
		amount : "",
		weight : 0.5
	},
	"oil (flask) [1 sp]" : {
		infoname : "Oil (flask) [1 sp]",
		name : "Oil, flasks of",
		amount : "",
		weight : 1
	},
	"paper (one sheet) [2 sp]" : {
		infoname : "Paper (one sheet) [2 sp]",
		name : "Paper, sheets of",
		amount : "",
		weight : ""
	},
	"parchment (one sheet) [1 sp]" : {
		infoname : "Parchment (one sheet) [1 sp]",
		name : "Parchment, sheets of",
		amount : "",
		weight : ""
	},
	"perfume (vial) [5 gp]" : {
		infoname : "Perfume (vial) [5 gp]",
		name : "Perfume, vials of",
		amount : "",
		weight : ""
	},
	"pick, miner's [2 gp]" : {
		infoname : "Pick, miner's [2 gp]",
		name : "Miner's pick",
		amount : "",
		weight : 10
	},
	"piton [5 cp]" : {
		infoname : "Piton [5 cp]",
		name : "Piton",
		amount : "",
		weight : 0.25
	},
	"poison, basic (vial) [100 gp]" : {
		infoname : "Poison, basic (vial) [100 gp]",
		name : "Basic poison, vials of",
		amount : "",
		weight : ""
	},
	"pole (10-foot) [5 cp]" : {
		infoname : "Pole (10-foot) [5 cp]",
		name : "10-foot pole",
		amount : "",
		weight : 7
	},
	"pot, iron [2 gp]" : {
		infoname : "Pot, iron [2 gp]",
		name : "Iron pot",
		amount : "",
		weight : 10
	},
	"potion of healing [50 gp]" : {
		infoname : "Potion of healing [50 gp]",
		name : "Potion of healing",
		amount : "",
		weight : 0.5
	},
	"pouch [5 sp]" : {
		infoname : "Pouch [5 sp]",
		name : "Pou\uFEFFch",
		amount : "",
		weight : 1
	},
	"quiver [1 gp]" : {
		infoname : "Quiver [1 gp]",
		name : "Quiver",
		amount : "",
		weight : 1
	},
	"ram, portable [4 gp]" : {
		infoname : "Ram, portable [4 gp]",
		name : "Portable ram",
		amount : "",
		weight : 35
	},
	"rations (1 day) [5 sp]" : {
		infoname : "Rations (1 day) [5 sp]",
		name : "Rations, days of",
		amount : "",
		weight : 2
	},
	"robes [1 gp]" : {
		infoname : "Robes [1 gp]",
		name : "Robes",
		amount : "",
		weight : 4
	},
	"rope, hempen (50 feet) [1 gp]" : {
		infoname : "Rope, hempen (50 feet) [1 gp]",
		name : "Hempen rope, feet of",
		amount : 50,
		weight : 0.2
	},
	"rope, silk (50 feet) [10 gp]" : {
		infoname : "Rope, silk (50 feet) [10 gp]",
		name : "Silk rope, feet of",
		amount : 50,
		weight : 0.1
	},
	"sack [1 cp]" : {
		infoname : "Sack [1 cp]",
		name : "Sack",
		amount : "",
		weight : 0.5
	},
	"scale, merchant's [5 gp]" : {
		infoname : "Scale, merchant's [5 gp]",
		name : "Merchant's scale",
		amount : "",
		weight : 3
	},
	"sealing wax [5 cp]" : {
		infoname : "Sealing wax [5 cp]",
		name : "Sealing wax",
		amount : "",
		weight : ""
	},
	"shovel [2 gp]" : {
		infoname : "Shovel [2 gp]",
		name : "Shovel",
		amount : "",
		weight : 5
	},
	"signal whistle [5 cp]" : {
		infoname : "Signal whistle [5 cp]",
		name : "Signal whistle",
		amount : "",
		weight : ""
	},
	"signet ring [5 gp]" : {
		infoname : "Signet ring [5 gp]",
		name : "Signet ring",
		amount : "",
		weight : ""
	},
	"soap [2 cp]" : {
		infoname : "Soap [2 cp]",
		name : "Soap",
		amount : "",
		weight : ""
	},
	"spellbook [50 gp]" : {
		infoname : "Spellbook [50 gp]",
		name : "Spellbook",
		amount : "",
		weight : 3
	},
	"spikes, iron (10) [1 gp]" : {
		infoname : "Spikes, iron (10) [1 gp]",
		name : "Iron spike",
		amount : 10,
		weight : 0.5
	},
	"spyglass [1000 gp]" : {
		infoname : "Spyglass [1000 gp]",
		name : "Spyglass",
		amount : "",
		weight : 1
	},
	"tent, two-person [2 gp]" : {
		infoname : "Tent, two-person [2 gp]",
		name : "Two-person tent",
		amount : "",
		weight : 20
	},
	"tinderbox [5 sp]" : {
		infoname : "Tinderbox [5 sp]",
		name : "Tinderbox",
		amount : "",
		weight : 1
	},
	"torch [1 cp]" : {
		infoname : "Torch [1 cp]",
		name : "Torch",
		amount : "",
		weight : 1
	},
	"vial [1 gp]" : {
		infoname : "Vial [1 gp]",
		name : "Vial",
		amount : "",
		weight : ""
	},
	"waterskin [2 sp]" : {
		infoname : "Waterskin [2 sp]",
		name : "Waterskin (full)",
		amount : "",
		weight : 5
	},
	"whetstone [1 cp]" : {
		infoname : "Whetstone [1 cp]",
		name : "Whetstone",
		amount : "",
		weight : 1
	}
}

var ToolsList = {
	"artisan's tools:" : {
		infoname : "Artisan's tools:",
		name : "-",
		amount : "",
		weight : ""
	},
	"   alchemist's supplies [50 gp]" : {
		infoname : "   Alchemist's supplies [50 gp]",
		name : "Alchemist's supplies",
		amount : "",
		weight : 8
	},
	"   brewer's supplies [20 gp]" : {
		infoname : "   Brewer's supplies [20 gp]",
		name : "Brewer's supplies",
		amount : "",
		weight : 9
	},
	"   calligrapher's supplies [10 gp]" : {
		infoname : "   Calligrapher's supplies [10 gp]",
		name : "Calligrapher's supplies",
		amount : "",
		weight : 5
	},
	"   carpenter's tools [8 gp]" : {
		infoname : "   Carpenter's tools [8 gp]",
		name : "Carpenter's tools",
		amount : "",
		weight : 6
	},
	"   cartographer's tools [15 gp]" : {
		infoname : "   Cartographer's tools [15 gp]",
		name : "Cartographer's tools",
		amount : "",
		weight : 6
	},
	"   cobbler's tools [5 gp]" : {
		infoname : "   Cobbler's tools [5 gp]",
		name : "Cobbler's tools",
		amount : "",
		weight : 5
	},
	"   cook's utensils [1 gp]" : {
		infoname : "   Cook's utensils [1 gp]",
		name : "Cook's utensils",
		amount : "",
		weight : 8
	},
	"   glassblower's tools [30 gp]" : {
		infoname : "   Glassblower's tools [30 gp]",
		name : "Glassblower's tools",
		amount : "",
		weight : 5
	},
	"   jeweler's tools [25 gp]" : {
		infoname : "   Jeweler's tools [25 gp]",
		name : "Jeweler's tools",
		amount : "",
		weight : 2
	},
	"   leatherworker's tools [5 gp]" : {
		infoname : "   Leatherworker's tools [5 gp]",
		name : "Leatherworker's tools",
		amount : "",
		weight : 5
	},
	"   mason's tools [10 gp]" : {
		infoname : "   Mason's tools [10 gp]",
		name : "Mason's tools",
		amount : "",
		weight : 8
	},
	"   painter's supplies [10 gp]" : {
		infoname : "   Painter's supplies [10 gp]",
		name : "Painter's supplies",
		amount : "",
		weight : 5
	},
	"   potter's tools [10 gp]" : {
		infoname : "   Potter's tools [10 gp]",
		name : "Potter's tools",
		amount : "",
		weight : 3
	},
	"   smith's tools [20 gp]" : {
		infoname : "   Smith's tools [20 gp]",
		name : "Smith's tools",
		amount : "",
		weight : 8
	},
	"   tinker's tools [50 gp]" : {
		infoname : "   Tinker's tools [50 gp]",
		name : "Tinker's tools",
		amount : "",
		weight : 10
	},
	"   weaver's tools [1 gp]" : {
		infoname : "   Weaver's tools [1 gp]",
		name : "Weaver's tools",
		amount : "",
		weight : 5
	},
	"   woodcarver's tools [1 gp]" : {
		infoname : "   Woodcarver's tools [1 gp]",
		name : "Woodcarver's tools",
		amount : "",
		weight : 5
	},
	"disguise kit [25 gp]" : {
		infoname : "Disguise kit [25 gp]",
		name : "Disguise kit",
		amount : "",
		weight : 3
	},
	"forgery kit [15 gp]" : {
		infoname : "Forgery kit [15 gp]",
		name : "Forgery kit",
		amount : "",
		weight : 5
	},
	"gaming set:" : {
		infoname : "Gaming set:",
		name : "-",
		amount : "",
		weight : ""
	},
	"   dice set [1 sp]" : {
		infoname : "   Dice set [1 sp]",
		name : "Dice set",
		amount : "",
		weight : ""
	},
	"   dragonchess set [1 gp]" : {
		infoname : "   Dragonchess set [1 gp]",
		name : "Dragonchess set",
		amount : "",
		weight : 0.5
	},
	"   playing card set [5 sp]" : {
		infoname : "   Playing card set [5 sp]",
		name : "Playing card set",
		amount : "",
		weight : ""
	},
	"   three-dragon ante set [1 gp]" : {
		infoname : "   Three-Dragon Ante set [1 gp]",
		name : "Three-Dragon Ante set",
		amount : "",
		weight : ""
	},
	"herbalism kit [5 gp]" : {
		infoname : "Herbalism kit [5 gp]",
		name : "Herbalism kit",
		amount : "",
		weight : 3
	},
	"musical instrument:" : {
		infoname : "Musical instrument:",
		name : "-",
		amount : "",
		weight : ""
	},
	"   bagpipes [30 gp]" : {
		infoname : "   Bagpipes [30 gp]",
		name : "Bagpipes",
		amount : "",
		weight : 6
	},
	"   drum [6 gp]" : {
		infoname : "   Drum [6 gp]",
		name : "Drum",
		amount : "",
		weight : 3
	},
	"   dulcimer [25 gp]" : {
		infoname : "   Dulcimer [25 gp]",
		name : "Dulcimer",
		amount : "",
		weight : 10
	},
	"   flute [2 gp]" : {
		infoname : "   Flute [2 gp]",
		name : "Flute",
		amount : "",
		weight : 1
	},
	"   horn [3 gp]" : {
		infoname : "   Horn [3 gp]",
		name : "Horn",
		amount : "",
		weight : 2
	},
	"   lute [35 gp]" : {
		infoname : "   Lute [35 gp]",
		name : "Lute",
		amount : "",
		weight : 2
	},
	"   lyre [30 gp]" : {
		infoname : "   Lyre [30 gp]",
		name : "Lyre",
		amount : "",
		weight : 2
	},
	"   pan flute [12 gp]" : {
		infoname : "   Pan flute [12 gp]",
		name : "Pan flute",
		amount : "",
		weight : 2
	},
	"   shawm [2 gp]" : {
		infoname : "   Shawm [2 gp]",
		name : "Shawm",
		amount : "",
		weight : 1
	},
	"   viol [30 gp]" : {
		infoname : "   Viol [30 gp]",
		name : "Viol",
		amount : "",
		weight : 1
	},
	"navigator's tools [25 gp]" : {
		infoname : "Navigator's tools [25 gp]",
		name : "Navigator's tools",
		amount : "",
		weight : 2
	},
	"poisoner's kit [50 gp]" : {
		infoname : "Poisoner's kit [50 gp]",
		name : "Poisoner's kit",
		amount : "",
		weight : 2
	},
	"thieves' tools [25 gp]" : {
		infoname : "Thieves' tools [25 gp]",
		name : "Thieves' tools",
		amount : "",
		weight : 1
	}
}