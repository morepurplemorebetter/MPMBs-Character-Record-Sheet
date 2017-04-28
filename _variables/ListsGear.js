var ArmourList = {
	"unarmored" : {
		regExpSearch : /(unarmou?red|naked|nothing|bare|no.?armou?r)/i,
		name : "Unarmored",
		source : ["P", 14],
		type : "",
		ac : 10,
		stealthdis : false,
		strReq : 0,
		addMod : true
	},

	// UA Stone Sorcerer armour
	"stone's durability" : {
		regExpSearch : /^(?=.*stone)(?=.*durability).*$/i,
		name : "Stone's Durability (Con)",
		source : ["UA:SO", 4],
		type : "",
		ac : 13,
		stealthdis : false,
		strReq : 0,
		dex : -10,
		addMod : true
	},

	// UA Immortal Mystic armour
	"immortal's durability" : {
		regExpSearch : /^(?=.*immortal)(?=.*durability).*$/i,
		name : "Immortal Durability (Con)",
		source : ["UA:TMC", 7],
		type : "",
		ac : 10,
		stealthdis : false,
		strReq : 0,
		addMod : true
	},

	// UA Oath of Redemption Paladin Armor of Peace
	"armor of peace" : {
		regExpSearch : /^(?=.*armou?r)(?=.*peace).*$/i,
		name : "Armor of Peace",
		source : ["UA:AToS", 2],
		type : "",
		ac : 16,
		stealthdis : false,
		strReq : 0
	},

	"draconic resilience" : {
		regExpSearch : /^(?=.*(dragon|draconic|scaly))(?=.*(hide|skin|scales|resilience)).*$/i,
		name : "Draconic resilience",
		source : ["P", 102],
		type : "",
		ac : 13,
		stealthdis : false,
		strReq : 0
	},

	"natural armor" : {
		regExpSearch : /^(?=.*natural)(?=.*armor).*$/i,
		name : "Natural Armor",
		source : ["V", 112],
		type : "",
		ac : 13,
		stealthdis : false,
		strReq : 0
	},

	"mage armor" : {
		regExpSearch : /^(?=.*(mage|magic))(?=.*armou?r).*$/i,
		name : "Mage armor",
		source : ["P", 256],
		type : "",
		ac : 13,
		stealthdis : false,
		strReq : 0
	},

	// UA Psionic Discipline 'Mastery of Force' power 'Inertial Armour'
	"inertial armor" : {
		regExpSearch : /^(?=.*(inertial|psychic|psionic))(?=.*armou?r).*$/i,
		name : "Inertial armor",
		source : ["UA:TMC", 18],
		type : "",
		ac : 14,
		stealthdis : false,
		strReq : 0
	},

	"padded" : {
		regExpSearch : /^(?!.*(plate|hide))(?=.*(padding|padded)).*$/i,
		name : "Padded",
		source : ["P", 145],
		type : "light",
		ac : 11,
		stealthdis : true,
		weight : 8,
		strReq : 0,
		invName : "Padded armor"
	},

	"leather" : {
		regExpSearch : /^(?!.*(padding|padded|studded|studs))(?=.*leather).*$/i,
		name : "Leather",
		source : ["P", 145],
		type : "light",
		ac : 11,
		stealthdis : false,
		weight : 10,
		strReq : 0,
		invName : "Leather armor"
	},

	"studded leather" : {
		regExpSearch : /^(?=.*(studded|studs))(?=.*leather).*$/i,
		name : "Studded Leather",
		source : ["P", 145],
		type : "light",
		ac : 12,
		stealthdis : false,
		weight : 13,
		strReq : 0,
		invName : "Studded leather armor"
	},

	"hide" : {
		regExpSearch : /^(?!.*(dragon|draconic))(?=.*(hide|skin)).*$/i,
		name : "Hide",
		source : ["P", 145],
		type : "medium",
		ac : 12,
		stealthdis : false,
		weight : 12,
		strReq : 0,
		invName : "Hide armor"
	},

	"chain shirt" : {
		regExpSearch : /^(?=.*(chain|mail))(?=.*shirt).*$/i,
		name : "Chain shirt",
		source : ["P", 145],
		type : "medium",
		ac : 13,
		stealthdis : false,
		weight : 20,
		strReq : 0
	},

	"scale mail" : {
		regExpSearch : /^(?=.*scale)(?=.*mail).*$/i,
		name : "Scale mail",
		source : ["P", 145],
		type : "medium",
		ac : 14,
		stealthdis : true,
		weight : 45,
		strReq : 0
	},

	"breastplate" : {
		regExpSearch : /^(?=.*breast)(?=.*plate).*$/i,
		name : "Breastplate",
		source : ["P", 145],
		type : "medium",
		ac : 14,
		stealthdis : false,
		weight : 20,
		strReq : 0
	},

	"half plate" : {
		regExpSearch : /^(?=.*half)(?=.*plate).*$/i,
		name : "Half plate",
		source : ["P", 145],
		type : "medium",
		ac : 15,
		stealthdis : true,
		weight : 40,
		strReq : 0
	},

	"ring mail" : {
		regExpSearch : /^(?=.*ring)(?=.*mail).*$/i,
		name : "Ring mail",
		source : ["P", 145],
		type : "heavy",
		ac : 14,
		stealthdis : true,
		weight : 40,
		strReq : 0
	},

	"chain mail" : {
		regExpSearch : /^(?!.*(scale|plate|ring|shirt))(?=.*(chain|mail)).*$/i,
		name : "Chain mail",
		source : ["P", 145],
		type : "heavy",
		ac : 16,
		stealthdis : true,
		weight : 55,
		strReq : 13
	},

	"splint" : {
		regExpSearch : /splint/i,
		name : "Splint",
		source : ["P", 145],
		type : "heavy",
		ac : 17,
		stealthdis : true,
		weight : 60,
		strReq : 15,
		invName : "Splint armor"
	},

	"plate" : {
		regExpSearch : /^(?!.*(half|breast))(?=.*plate).*$/i,
		name : "Plate",
		source : ["P", 145],
		type : "heavy",
		ac : 18,
		stealthdis : true,
		weight : 65,
		strReq : 15,
		invName : "Plate armor"
	},
	
	// SCAG battlerager armour
	"spiked armor" : {
		regExpSearch : /^(?!.*(dragon|draconic|beast))(?=.*spike(d|s)).*$/i,
		name : "Spiked armor",
		source : ["S", 121],
		type : "medium",
		ac : 14,
		stealthdis : true,
		weight : 45,
		strReq : 0
	}
}

var WeaponsList = {
	"polearm butt end" : {
		regExpSearch : /^(?=.*(polearm|(glaive|guandao|bisento|naginata)|(halberd|\bji\b|kamayari)|(quarterstaff|\bstaff\b|\bbo\b)))(?=.*butt)(?=.*end).*$/i,
		name : "Polearm butt end",
		source : ["P", 168],
		ability : 1,
		type : "Other",
		damage : [1, 4, "bludgeoning"],
		range : "Melee",
		description : "As bonus action after taking an attack action with only a glaive, halberd, or quarterstaff",
		abilitytodamage : true
	},
	"armor spikes" : {
		regExpSearch : /^(?=.*armou?r)(?=.*spike).*$/i,
		name : "Armor spikes",
		source : ["S", 121],
		ability : 1,
		type : "Other",
		damage : [1, 4, "piercing"],
		range : "Melee",
		description : "Does 3 piercing damage when using your attack to grapple",
		abilitytodamage : true,
	},
	"club" : {
		regExpSearch : /^(?!.*(great|heavy|big))(?=.*\b(club|bian|tonfa)\b).*$/i,
		name : "Club",
		source : ["P", 149],
		list : "melee",
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
		regExpSearch : /dagger|bishou|\btamo\b|kozuka|\btanto\b/i,
		name : "Dagger",
		source : ["P", 149],
		list : "melee",
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
		regExpSearch : /^(?=.*(great|heavy|big|weida))(?=.*(club|bian|tonfa)\b).*$|tetsubo/i,
		name : "Greatclub",
		source : ["P", 149],
		list : "melee",
		ability : 1,
		type : "Simple",
		damage : [1, 8, "bludgeoning"],
		range : "Melee",
		weight : 10,
		description : "Two-handed",
		abilitytodamage : true,
	},
	"handaxe" : {
		regExpSearch : /^(?=.*(light|hand|short|small|throw))(?=.*\b(axe|fu)\b).*$|\bono\b/i,
		name : "Handaxe",
		source : ["P", 149],
		list : "melee",
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
		regExpSearch : /javelin|\bmau\b|uchi-ne/i,
		name : "Javelin",
		source : ["P", 149],
		list : "melee",
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
		source : ["P", 149],
		list : "melee",
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
		regExpSearch : /mace\b|\bchui\b|kanabo/i,
		name : "Mace",
		source : ["P", 149],
		list : "melee",
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
		regExpSearch : /quarterstaff|\bstaff\b|\bbo\b|^gun(.?(\+|-)\d+)?$/i,
		name : "Quarterstaff",
		source : ["P", 149],
		list : "melee",
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
		regExpSearch : /sickle|\bkama\b/i,
		name : "Sickle",
		source : ["P", 149],
		list : "melee",
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
		regExpSearch : /^(?!.*agonizing)(?!.*eldritch)(?=.*(spear|qiang|\byari\b)).*$/i,
		name : "Spear",
		source : ["P", 149],
		list : "melee",
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
		regExpSearch : /^((?=.*\b(unarmed|fist|arm|leg|foot|feet|razorclaw|talons)\b)|((?=.*martial)(?=.*arts))|((?=.*tavern)(?=.*brawler))).*$/i,
		name : "Unarmed strike",
		source : ["P", 149],
		ability : 1,
		type : "Natural",
		damage : [1, "", "bludgeoning"],
		range : "Melee",
		description : "",
		monkweapon : true,
		abilitytodamage : true,
	},
	"light crossbow" : {
		regExpSearch : /^(((?=.*light)(?=.*crossbow))|((?!.*(hand|short|great|heavy))(?=.*\bcrossbow\b))).*$/i,
		name : "Light crossbow",
		source : ["P", 149],
		list : "ranged",
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
		regExpSearch : /dart|shuriken/i,
		name : "Dart",
		source : ["P", 149],
		list : "ranged",
		ability : 2,
		type : "Simple",
		damage : [1, 4, "piercing"],
		range : "20/60 ft",
		weight : 0.25,
		description : "Finesse, thrown",
		abilitytodamage : true
	},
	"shortbow" : {
		regExpSearch : /^(?!.*crossbow)(((?=.*short)(?=.*bow))|((?!.*(moon|long))(?=.*\bbow\b))).*$|hankyu/i,
		name : "Shortbow",
		source : ["P", 149],
		list : "ranged",
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
		source : ["P", 149],
		list : "ranged",
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
		regExpSearch : /^(((?=.*battle)(?=.*(axe|ono|fu)\b))|((?!.*(light|hand|short|small|great|heavy|throw))(?=.*\b(axe|fu|masakari)\b))).*$/i,
		name : "Battleaxe",
		source : ["P", 149],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "slashing"],
		range : "Melee",
		weight : 4,
		description : "Versatile (1d10)",
		abilitytodamage : true,
	},
	"flail" : {
		regExpSearch : /flail|nunchaku/i,
		name : "Flail",
		source : ["P", 149],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "bludgeoning"],
		range : "Melee",
		weight : 2,
		description : "",
		abilitytodamage : true
	},
	"glaive" : {
		regExpSearch : /glaive|guandao|bisento|naginata/i,
		name : "Glaive",
		source : ["P", 149],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 10, "slashing"],
		range : "Melee",
		weight : 6,
		description : "Heavy, reach, two-handed",
		abilitytodamage : true
	},
	"greataxe" : {
		regExpSearch : /^(?=.*(great|heavy|weida))(?=.*(axe|ono|fu|masakari)\b).*$/i,
		name : "Greataxe",
		source : ["P", 149],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 12, "slashing"],
		range : "Melee",
		weight : 7,
		description : "Heavy, two-handed",
		abilitytodamage : true,
	},
	"greatsword" : {
		regExpSearch : /^(?=.*(great|heavy))(?=.*sword).*$|changdao|nodachi/i,
		name : "Greatsword",
		source : ["P", 149],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [2, 6, "slashing"],
		range : "Melee",
		weight : 6,
		description : "Heavy, two-handed",
		abilitytodamage : true,
	},
	"halberd" : {
		regExpSearch : /halberd|\bji\b|kamayari/i,
		name : "Halberd",
		source : ["P", 149],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 10, "slashing"],
		range : "Melee",
		weight : 6,
		description : "Heavy, reach, two-handed",
		abilitytodamage : true
	},
	"lance" : {
		regExpSearch : /lance|umayari/i,
		name : "Lance",
		source : ["P", 149],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 12, "piercing"],
		range : "Melee",
		weight : 6,
		description : "Reach, disadvantage to attack within 5 ft, two-handed when not mounted",
		abilitytodamage : true
	},
	"longsword" : {
		regExpSearch : /katana|\bjian\b|^(((?=.*long)(?=.*sword))|((?!.*(burst|light|hand|short|small|great|heavy))(?=.*\bsword\b))).*$/i,
		name : "Longsword",
		source : ["P", 149],
		list : "melee",
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
		source : ["P", 149],
		list : "melee",
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
		source : ["P", 149],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "piercing"],
		range : "Melee",
		weight : 4,
		description : "",
		abilitytodamage : true
	},
	"pike" : {
		regExpSearch : /^(?!.*armou?r)(?!.*\bspike)(?=.*(pike|\bmao\b|nagaeyari)).*$/i,
		name : "Pike",
		source : ["P", 149],
		list : "melee",
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
		source : ["P", 149],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "piercing"],
		range : "Melee",
		weight : 2,
		description : "Finesse",
		abilitytodamage : true
	},
	"scimitar" : {
		regExpSearch : /scimitar|liuyedao|wakizashi/i,
		name : "Scimitar",
		source : ["P", 149],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 6, "slashing"],
		range : "Melee",
		weight : 3,
		description : "Finesse, light",
		abilitytodamage : true
	},
	"shortsword" : {
		regExpSearch : /^(?=.*short)(?=.*sword).*$|shuangdao/i,
		name : "Shortsword",
		source : ["P", 149],
		list : "melee",
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
		regExpSearch : /trident|\bcha\b|magariyari/i,
		name : "Trident",
		source : ["P", 149],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 6, "piercing"],
		range : "Melee, 20/60 ft",
		weight : 4,
		description : "Thrown, versatile (1d8)",
		abilitytodamage : true
	},
	"war pick" : {
		regExpSearch : /^(((?=.*pick)(?=.*war))|((?!.*(heavy|great|light))(?=.*\bpick\b))).*$|\bkuwa\b/i,
		name : "War pick",
		source : ["P", 149],
		list : "melee",
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
		source : ["P", 149],
		list : "melee",
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
		source : ["P", 149],
		list : "melee",
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
		source : ["P", 149],
		list : "ranged",
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
		source : ["P", 149],
		list : "ranged",
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
		source : ["P", 149],
		list : "ranged",
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
		regExpSearch : /^(?!.*crossbow)(?=.*long)(?=.*bow).*$|daikyu/i,
		name : "Longbow",
		source : ["P", 149],
		list : "ranged",
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
		source : ["P", 149],
		list : "ranged",
		ability : 2,
		type : "Martial",
		damage : ["\u2015", "", 0],
		range : "5/15 ft",
		weight : 3,
		description : "Thrown, only 1 attack, up to large creature hit is restrained (PHB 148)",
		abilitytodamage : false
	},
	"alchemist fire" : {
		regExpSearch : /^(?=.*alchemist)(?=.*fire).*$/i,
		name : "Alchemist's Fire",
		source : ["P", 148],
		list : "improvised",
		ability : 2,
		type : "Improvised Weapons",
		damage : [1, 4, "fire"],
		range : "20 ft",
		weight : 1,
		description : "Target +1d4 damage at the start of each of its turn; Can end it as an action with a DC 10 Dex check",
		abilitytodamage : false,
		ammo : "alchemist fire"
	},
	"vials of acid" : {
		regExpSearch : /^(?=.*vial)(?=.*acid).*$/i,
		name : "Vial of Acid",
		source : ["P", 148],
		list : "improvised",
		ability : 2,
		type : "Improvised Weapons",
		damage : [2, 6, "acid"],
		range : "20 ft",
		weight : 1,
		description : "",
		abilitytodamage : false,
		ammo : "vials of acid"
	},
	"holy water" : {
		regExpSearch : /^(?=.*holy)(?=.*water).*$/i,
		name : "Holy Water",
		source : ["P", 151],
		list : "improvised",
		ability : 2,
		type : "Improvised Weapons",
		damage : [2, 6, "radiant"],
		range : "20 ft",
		weight : 1,
		description : "Only does damage against fiends and undead; Comes in flasks",
		abilitytodamage : false,
		ammo : "holy water"
	},
	"acid splash" : {
		regExpSearch : /^(?=.*acid)(?=.*splash).*$/i,
		name : "Acid Splash",
		source : ["P", 211],
		list : "spell",
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
		source : ["S", 142],
		list : "spell",
		ability : 6,
		type : "Cantrip",
		damage : ["Bd8/Cd8", "", "thunder"],
		range : "With melee wea",
		description : "First damage added to the attack; second to the target if it moves next round (SCAG 142)",
		abilitytodamage : false
	},
	"create bonfire" : {
		regExpSearch : /^(?=.*create)(?=.*bonfire).*$/i,
		name : "Create Bonfire",
		source : ["E", 16],
		list : "spell",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 8, "fire"],
		range : "60 ft",
		description : "5-ft cube; Dex save at casting or when re-entering, success - no damage; Conc, 1 min (EE 16)",
		description : "Con save, success - no damage, fail - also disadv. on next weapon attack roll in next turn; 1 creature (EE 18)",
		abilitytodamage : false,
		dc : true
	},
	"chill touch" : {
		regExpSearch : /^(?=.*chill)(?=.*touch).*$/i,
		name : "Chill Touch",
		source : ["P", 221],
		list : "spell",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 8, "necrotic"],
		range : "120 ft",
		description : "Target can't regain HP and undead dis. on attacks vs. me, until my next turn (PHB 221)",
		abilitytodamage : false
	},
	"agonizing blast" : { //Eldritch Blast (Agonizing Blast)
		regExpSearch : /^(?!.*spear)(?=.*agonizing)(?=.*blast).*$/i,
		name : "Agonizing Blast",
		source : ["P", 237],
		list : "spell specific",
		ability : 6,
		type : "Cantrip",
		damage : ["C\u00D7" + 1, 10, "force"],
		range : "120 ft",
		description : "Each d10 is a separate beam requiring separate rolls (PHB 237)",
		abilitytodamage : true,
		SpellsList : "eldritch blast",
	},
	"agonizing spear" : { //Eldritch Blast (Agonizing Blast & Eldritch Spear)
		regExpSearch : /^(?=.*agonizing)(?=.*spear).*$/i,
		name : "Agonizing Spear",
		source : ["P", 237],
		list : "spell specific",
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
		source : ["P", 237],
		list : "spell",
		ability : 6,
		type : "Cantrip",
		damage : ["C\u00D7" + 1, 10, "force"],
		range : "120 ft",
		description : "Each d10 is a separate beam requiring separate rolls (PHB 237)",
		abilitytodamage : false
	},
	"eldritch spear" : { //Eldritch Blast (Eldritch Spear)
		regExpSearch : /^(?!.*agonizing)(?=.*eldritch)(?=.*spear).*$/i,
		name : "Eldritch Spear",
		source : ["P", 237],
		list : "spell specific",
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
		source : ["P", 241],
		list : "spell",
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
		source : ["E", 18],
		list : "spell",
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
		source : ["S", 143],
		list : "spell",
		ability : 6,
		type : "Cantrip",
		damage : ["Bd8/Bd8", "", "fire"],
		range : "With melee wea",
		description : "First damage added to the attack; second to a target within 5 ft (SCAG 143)",
		abilitytodamage : true
	},
	"lightning lure" : {
		regExpSearch : /^(?=.*lightning)(?=.*lure).*$/i,
		name : "Lightning Lure",
		source : ["S", 143],
		list : "spell",
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
		source : ["P", 266],
		list : "spell",
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
		source : ["P", 269],
		list : "spell",
		ability : 5,
		type : "Cantrip",
		damage : ["C", 8, "fire"],
		range : "30 ft",
		description : "10-ft radius bright light and 10-ft radius dim light until thrown (PHB 269)",
		abilitytodamage : false
	},
	"ray of frost" : {
		regExpSearch : /^(?=.*ray)(?=.*frost).*$/i,
		name : "Ray of Frost",
		source : ["P", 271],
		list : "spell",
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
		source : ["P", 272],
		list : "spell",
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
		source : ["P", 275],
		list : "spell",
		ability : 5,
		type : "Cantrip",
		damage : [1, 8, "bludgeoning"],
		range : "Melee",
		description : "Imbued club or quarterstaff; Counts as a magical weapon (PHB 275)",
		abilitytodamage : true
	},
	"shocking grasp" : {
		regExpSearch : /^(?=.*shocking)(?=.*grasp).*$/i,
		name : "Shocking Grasp",
		source : ["P", 275],
		list : "spell",
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
		source : ["S", 143],
		list : "spell",
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
		source : ["P", 282],
		list : "spell",
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
		source : ["E", 22],
		list : "spell",
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
		source : ["P", 285],
		list : "spell",
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
		source : ["P", 203],
		ability : 0,
		type : "Spell",
		damage : ["", "", ""],
		range : "",
		description : "",
		abilitytodamage : false
	},
	"improvised weapon" : {
		regExpSearch : /improvised/i,
		name : "Improvised weapon",
		source : ["P", 147],
		ability : 1,
		type : "Improvised Weapons",
		damage : [1, 4, "bludgeoning"],
		range : "Melee, 20/60 ft",
		description : "Damage die, type, range, etc. are at the DM's discretion",
		abilitytodamage : true
	},
	
	// VGtM Lizardfolk weapon
	"bite" : {
		regExpSearch : /\bbite\b/i,
		name : "Bite",
		source : ["V", 112],
		ability : 1,
		type : "Natural",
		damage : [1, 6, "piercing"],
		range : "Melee",
		description : "",
		abilitytodamage : true,
		monkweapon : true
	},
	
	// VGtM Tabaxi weapon
	"cat's claws" : {
		regExpSearch : /^(?=.*\b(cat|dragon|retractable))(?=.*\bclaws?\b).*$/i,
		name : "Cat's Claws",
		source : ["V", 115],
		ability : 1,
		type : "Natural",
		damage : [1, 4, "slashing"],
		range : "Melee",
		description : "",
		abilitytodamage : true,
		monkweapon : true
	},
	
	// UA Minotaur weapon
	"horns" : {
		regExpSearch : /\bhorns?\b/i,
		name : "Horns",
		source : ["UA:WA", 1],
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
		source : ["UA:E", 2],
		ability : 1,
		type : "Natural",
		damage : [1, 6, "piercing"],
		range : "Melee",
		description : "Only while shifted; Target up to my size is grappled",
		abilitytodamage : true
	},
	"razorclaw" : {
		regExpSearch : /\brazorclaw\b/i,
		name : "Razorclaw",
		source : ["UA:E", 2],
		ability : 1,
		type : "Natural",
		damage : [1, "", "slashing"],
		range : "Melee",
		description : "Only while shifted, use instead of unarmed strike: Can use as bonus action; Finesse",
		monkweapon : true,
		abilitytodamage : true
	},
	
	// SCAG Monk addition
	"radiant sun bolt" : {
		regExpSearch : /^(?=.*radiant)(?=.*(sun|light))(?=.*bolt).*$/i,
		name : "Radiant Sun Bolt",
		source : ["S", 131],
		ability : 2,
		type : "Spell",
		damage : [1, 4, "radiant"],
		range : "30 ft",
		description : "If used in an Attack action, spend 1 ki point to use it twice as a bonus action",
		monkweapon : true,
		abilitytodamage : true
	},
	
	// UA Artificer weapons
	"alchemical acid" : {
		regExpSearch : /^(?=.*alchemical)(?=.*acid).*$/i,
		name : "Alchemical Acid",
		source : ["UA:A", 5],
		list : "artificer",
		ability : 4,
		type : "Artificer",
		damage : [1, 6, "acid"],
		range : "30 ft",
		weight : 0,
		description : "Dex save, success - no damage; Objects automatically take maximum damage",
		abilitytodamage : false,
		dc : true
	},
	"alchemical fire" : {
		regExpSearch : /^(?=.*alchemical)(?=.*fire).*$/i,
		name : "Alchemical Fire",
		source : ["UA:A", 5],
		list : "artificer",
		ability : 4,
		type : "Artificer",
		damage : [1, 6, "fire"],
		range : "30 ft",
		weight : 0,
		description : "Dex save, success - no damage; All creatures within 5-ft of the point of impact have to save",
		abilitytodamage : false,
		dc : true
	},
	"thunder cannon" : {
		regExpSearch : /^(?!.*(blast|monger|piercing|explosive))(?=.*\bthunder)(?=.*cannon\b).*$/i,
		name : "Thunder Cannon",
		source : ["UA:A", 6],
		ability : 2,
		type : "Thunder Cannon",
		damage : [2, 6, "piercing"],
		range : "150/500 ft",
		weight : 12, // made up, based on the weight of real rifles
		description : "Ammunition, loading, two-handed, bonus action to reload",
		abilitytodamage : true,
		ammo : "arcane magazine"
	},
	"thunder cannon-thunder monger" : {
		regExpSearch : /^(?=.*\bthunder)(?=.*monger\b).*$/i,
		name : "Thunder Cannon (Monger)",
		source : ["UA:A", 6],
		ability : 2,
		type : "Thunder Cannon",
		damage : [2, 6, "piercing"],
		range : "150/500 ft",
		weight : 0,
		description : "Ammunition, loading, two-handed, bonus action to reload",
		abilitytodamage : true,
		ammo : "arcane magazine"
	},
	"thunder cannon-blast wave" : {
		regExpSearch : /^(?=.*\bthunder)(?=.*cannon\b)(?=.*\bblast)(?=.*wave\b).*$/i,
		name : "Thunder Cannon (Blast Wave)",
		source : ["UA:A", 6],
		ability : 4,
		type : "Thunder Cannon",
		damage : [2, 6, "force"],
		range : "15-ft cone",
		weight : 0,
		description : "Ammunition, loading, two-handed, bonus action to reload; Str save or damage and pushed back 10 ft",
		dc : true,
		abilitytodamage : false,
		ammo : "arcane magazine"
	},
	"thunder cannon-piercing round" : {
		regExpSearch : /^(?=.*\bthunder)(?=.*cannon\b)(?=.*\bpiercing)(?=.*round\b).*$/i,
		name : "Thunder Cannon (Piercing Round)",
		source : ["UA:A", 6],
		ability : 4,
		type : "Thunder Cannon",
		damage : [4, 6, "lightning"],
		range : "30-ft line",
		weight : 0,
		description : "Ammunition, loading, two-handed, bonus action to reload; 5 ft wide line; Dex save or damage",
		dc : true,
		abilitytodamage : false,
		ammo : "arcane magazine"
	},
	"thunder cannon-explosive round" : {
		regExpSearch : /^(?=.*\bthunder)(?=.*cannon\b)(?=.*\bexplosive)(?=.*round\b).*$/i,
		name : "Thunder Cannon (Explosive Round)",
		source : ["UA:A", 7],
		ability : 4,
		type : "Thunder Cannon",
		damage : [4, 8, "fire"],
		range : "500 ft",
		weight : 0,
		description : "Ammunition, loading, two-handed, bonus action to reload; 30-ft radius sphere; Dex save or damage",
		dc : true,
		abilitytodamage : false,
		ammo : "arcane magazine"
	},
	
	// UA Warlock Invocations
	"claw of acamar" : {
		regExpSearch : /^(?=.*\bclaw\b)(?=.*\bacamar\b).*$/i,
		name : "Claw of Acamar",
		source : ["UA:WnW", 3],
		ability : 1,
		type : "Martial",
		damage : [1, 8, "bludgeoning"],
		range : "Melee",
		weight : 2,
		description : "Pact weapon, reach; On hit: Reduces speed to 0, Expend spell slot for +2d8 necrotic damage per slot level",
		abilitytodamage : true
	},
	"curse bringer" : {
		regExpSearch : /^(?=.*\bcurse)(?=.*bringer\b).*$/i,
		name : "Curse Bringer",
		source : ["UA:WnW", 4],
		ability : 1,
		type : "Martial",
		damage : [2, 6, "slashing"],
		range : "Melee",
		weight : 6,
		description : "Pact weapon, heavy, two-handed; On hit: Reduces speed to 0, Expend spell slot for +2d8 slashing damage per slot level",
		abilitytodamage : true,
	},
	"mace of dispater" : {
		regExpSearch : /^(?=.*\bmace\b)(?=.*\bdispater\b).*$/i,
		name : "Mace of Dispater",
		source : ["UA:WnW", 4],
		ability : 1,
		type : "Simple",
		damage : [1, 6, "bludgeoning"],
		range : "Melee",
		weight : 4,
		description : "Pact weapon; On hit: knock Huge or smaller prone, Expend spell slot for +2d8 force damage per slot level",
		monkweapon : true,
		abilitytodamage : true
	},
	"moon bow" : {
		regExpSearch : /^(?=.*\bmoon)(?=.*bow\b).*$/i,
		name : "Moon Bow",
		source : ["UA:WnW", 4],
		ability : 2,
		type : "Martial",
		damage : [1, 8, "piercing"],
		range : "150/600 ft",
		weight : 2,
		description : "Pact weapon, heavy, two-handed; Adv. vs. lycanthropes; On hit, expend spell slot for +2d8 radiant damage per slot level",
		abilitytodamage : true
	},
	
	// UA Mystic psionic talents that work like damage cantrips
	"energy beam" : {
		regExpSearch : /^(?=.*\benergy\b)(?=.*\bbeam\b).*$/i,
		name : "Energy Beam",
		source : ["UA:TMC", 27],
		list : "psionic",
		ability : 4,
		type : "Cantrip",
		damage : ["C", 8, "My choice"],
		range : "90 ft",
		description : "Dex save, success - no damage; Acid, cold, fire, lightning, or thunder damage [my choice] (UA:TMC 27)",
		abilitytodamage : false,
		dc : true
	},
	"mind slam" : {
		regExpSearch : /^(?=.*\bmind\b)(?=.*\bslam\b).*$/i,
		name : "Mind Slam",
		source : ["UA:TMC", 28],
		list : "psionic",
		ability : 4,
		type : "Cantrip",
		damage : ["C", 6, "force"],
		range : "60 ft",
		description : "Con save, success - no damage, fail - Large or smaller target also knocked prone (UA:TMC 28)",
		abilitytodamage : false,
		dc : true
	},
	"mind thrust" : {
		regExpSearch : /^(?=.*\bmind\b)(?=.*\bthrust\b).*$/i,
		name : "Mind Thrust",
		source : ["UA:TMC", 28],
		list : "psionic",
		ability : 4,
		type : "Cantrip",
		damage : ["C", 10, "psychic"],
		range : "120 ft",
		description : "Int save, success - no damage (UA:TMC 28)",
		abilitytodamage : false,
		dc : true
	},
	"psychic hammer" : {
		regExpSearch : /^(?=.*\bpsychic\b)(?=.*\bhammer\b).*$/i,
		name : "Psychic Hammer",
		source : ["UA:TMC", 28],
		list : "psionic",
		ability : 4,
		type : "Cantrip",
		damage : ["C", 6, "force"],
		range : "120 ft",
		description : "Str save, success - no damage, fail - also move 10 ft in chosen direction (UA:TMC 28)",
		abilitytodamage : false,
		dc : true
	},
	"soul knife" : {
		regExpSearch : /^(?=.*\bsoul)(?=.*(knives|knife|weapon)\b).*$/i,
		name : "Soul Knife",
		source : ["UA:TMC", 8],
		ability : 1,
		type : "Martial",
		damage : [1, 8, "psychic"],
		range : "Melee",
		description : "Finesse, light",
		abilitytodamage : true
	},

	// DMG firearms (contributed by grungydan)
	"pistol" : {
		regExpSearch : /^(?=.*pistol)(?!.*automatic).*$/i,
		name : "Pistol",
		source : ["D", 268],
		list : "firearm",
		ability : 2, 
		type: "Martial",
		damage : [1, 10, "piercing"],
		range : "30/90 ft",
		weight : 3,
		description : "Ammunition, loading",
		abilitytodamage : true,
		ammo : "renaissance bullet"
	},
	"musket" : {
		regExpSearch : /musket/i,
		name : "Musket",
		source : ["D", 268],
		list : "firearm",
		ability : 2, 
		type: "Martial",
		damage : [1, 12, "piercing"],
		range : "40/120 ft",
		weight : 10,
		description : "Ammunition, loading, two handed",
		abilitytodamage : true,
		ammo : "renaissance bullet"
	},
	"pistol automatic" : {
		regExpSearch : /^(?!.*rifle)(?=.*pistol)(?=.*automatic).*$/i,
		name : "Pistol, automatic",
		source : ["D", 268],
		list : "firearm",
		ability : 2, 
		type: "Martial",
		damage : [2, 6, "piercing"],
		range : "50/150 ft",
		weight : 3,
		description : "Ammunition, reload (15 shots)",
		abilitytodamage : true,
		ammo : "modern bullet"
	},
	"revolver" : {
		regExpSearch : /revolver/i,
		name : "Revolver",
		source : ["D", 268],
		list : "firearm",
		ability : 2, 
		type: "Martial",
		damage : [2, 8, "piercing"],
		range : "40/120 ft",
		weight : 3,
		description : "Ammunition, reload (6 shots)",
		abilitytodamage : true,
		ammo : "modern bullet"
	},
	"rifle hunting" : {
		regExpSearch : /^(?!=laser|antimatter)(?=.*hunting)(?=.*rifle).*$/i,
		name : "Hunting Rifle",
		source : ["D", 268],
		list : "firearm",
		ability : 2, 
		type: "Martial",
		damage : [2, 10, "piercing"],
		range : "80/240 ft",
		weight : 8,
		description : "Ammunition, reload (5 shots), two handed",
		abilitytodamage : true,
		ammo : "modern bullet"
	},
	"rifle automatic" : {
		regExpSearch : /^(?!=.*laser|antimatter)(?=.*automatic)(?=.*rifle).*$/i,
		name : "Automatic Rifle",
		source : ["D", 268],
		list : "firearm",
		ability : 2, 
		type: "Martial",
		damage : [2, 8, "piercing"],
		range : "80/240 ft",
		weight : 8,
		description : "Ammunition, burst fire, reload (30 shots), two handed",
		abilitytodamage : true,
		ammo : "modern bullet"
	},
	"shotgun" : {
		regExpSearch : /shotgun/i,
		name : "Shotgun",
		source : ["D", 268],
		list : "firearm",
		ability : 2, 
		type: "Martial",
		damage : [2, 8, "piercing"],
		range : "30/90 ft",
		weight : 7,
		description : "Ammunition, reload (2 shots), two handed",
		abilitytodamage : true,
		ammo : "modern bullet"
	},
	"laser pistol" : {
		regExpSearch : /^(?=.*laser)(?=.*pistol).*$/i,
		name : "Laser Pistol",
		source : ["D", 268],
		list : "firearm",
		ability : 2, 
		type: "Martial",
		damage : [3, 6, "radiant"],
		range : "40/120 ft",
		weight : 2,
		description : "Ammunition, reload (50 shots), two handed",
		abilitytodamage : true,
		ammo : "energy cell" 
	},
	"antimatter rifle" : {
		regExpSearch : /^(?!.*laser)(?=.*antimatter)(?=.*rifle).*$/i,
		name : "Antimatter Rifle",
		source : ["D", 268],
		list : "firearm",
		ability : 2, 
		type: "Martial",
		damage : [6, 8, "necrotic"],
		range : "120/360 ft",
		weight : 10,
		description : "Ammunition, reload (2 shots), two handed",
		abilitytodamage : true,
		ammo : "energy cell" 
	},
	"laser rifle" : {
		regExpSearch : /^(?!.*antimatter)(?=.*laser)(?=.*rifle).*$/i,
		name : "Laser Rifle",
		source : ["D", 268],
		list : "firearm",
		ability : 2, 
		type: "Martial",
		damage : [3, 8, "radiant"],
		range : "100/300 ft",
		weight : 7,
		description : "Ammunition, reload (30 shots), two handed",
		abilitytodamage : true,
		ammo : "energy cell" 
	},

	// UA Starter Spells cantrips
	"hand of radiance" : {
		regExpSearch : /^(?=.*hand)(?=.*radiance).*$/i,
		name : "Hand of Radiance",
		source : ["UA:SS", 3],
		list : "spell",
		ability : 5,
		type : "Cantrip",
		damage : ["C", 6, "radiant"],
		range : "5-ft radius",
		description : "Con save, success - no damage; Only chosen creatures I can see are affected (UA:SS 3)",
		abilitytodamage : false,
		dc : true
	},
	"infestation" : {
		regExpSearch : /infestation/i,
		name : "Infestation",
		source : ["UA:SS", 3],
		list : "spell",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 6, "piercing"],
		range : "30 ft",
		description : "Con save, success - no damage, fail - target also moved 5 ft in random direction (UA:SS 3)",
		abilitytodamage : false,
		dc : true
	},
	"primal savagery" : {
		regExpSearch : /^(?=.*primal)(?=.*savagery).*$/i,
		name : "Primal Savagery",
		source : ["UA:SS", 3],
		list : "spell",
		ability : 5,
		type : "Cantrip",
		damage : ["C", 10, "piercing"],
		range : "Melee (5 ft)",
		description : "Does either Piercing or Slashing damage (my choice) (UA:SS 3)",
		abilitytodamage : false
	},
	"toll the dead" : {
		regExpSearch : /^(?=.*toll)(?=.*the)(?=.*dead).*$/i,
		name : "Toll the Dead",
		source : ["UA:SS", 4],
		list : "spell",
		ability : 5,
		type : "Cantrip",
		damage : ["C", 12, "necrotic"],
		range : "60 ft",
		description : "Wis save, success - no damage; If target is at full hp, d8 instead of d12 damage (UA:SS 4)",
		abilitytodamage : false,
		dc : true
	},
};

//A list of all types of 'ammo' for the ammunition section on the first page
var AmmoList = {
	"arrow" : {
		name : "Arrows",
		source : ["P", 150],
		weight : 0.05,
		icon : "Arrows",
		checks : [".Top", ".Base"],
		display : 20
	},
	"bolt" : {
		name : "Bolts",
		weight : 0.075,
		source : ["P", 150],
		icon : "Arrows",
		checks : [".Top", ".Base"],
		display : 20,
		invName : "Crossbow bolts"
	},
	"bullet" : {
		name : "Bullets",
		weight : 0.075,
		source : ["P", 150],
		icon : "Bullets",
		checks : [".Bullet"],
		display : 50,
		invName : "Sling bullets",
		alternatives : [/^(?=.*bullet)(?=.*sling).*$/i]
	},
	"dagger" : {
		name : "Daggers",
		source : ["P", 149],
		weight : 1,
		icon : "Daggers",
		checks : [".Top"],
		display : 10
	},
	"dart" : {
		name : "Darts",
		source : ["P", 149],
		weight : 0.25,
		icon : "Arrows",
		checks : [".Top", ".Base"],
		display : 20
	},
	"flask" : {
		name : "Flasks (1 pint)",
		source : ["P", 150],
		weight : 1,
		icon : "Flasks",
		checks : [".Top", ".Base"],
		display : 20
	},
	"axe" : {
		name : "Handaxes",
		source : ["P", 149],
		weight : 2,
		icon : "Axes",
		checks : [".Top.Axe", ".Base.Axe"],
		display : 8
	},
	"javelin" : {
		name : "Javelins",
		source : ["P", 149],
		weight : 2,
		icon : "Spears",
		checks : [".Base"],
		display : 10
	},
	"hammer" : {
		name : "Light Hammers",
		source : ["P", 149],
		weight : 2,
		icon : "Hammers",
		checks : [".Top.Axe", ".Base.Axe"],
		display : 8
	},
	"needle" : {
		name : "Needles",
		source : ["P", 149],
		weight : 0.02,
		icon : "Bullets",
		checks : [".Bullet"],
		display : 50,
		invName : "Blowgun needles"
	},
	"spear" : {
		name : "Spears",
		source : ["P", 149],
		weight : 3,
		icon : "Spears",
		checks : [".Base"],
		display : 10
	},
	"trident" : {
		name : "Tridents",
		source : ["P", 149],
		weight : 4,
		icon : "Spears",
		checks : [".Base"],
		display : 10
	},
	"vial" : {
		name : "Vials (4 ounces)",
		source : ["P", 150],
		weight : 0.25,
		icon : "Vials",
		checks : [".Top", ".Base"],
		display : 20
	},
	"alchemist fire" : {
		name : "Alchemist's Fire, flasks",
		source : ["P", 148],
		weight : 1,
		icon : "Flasks",
		checks : [".Top", ".Base"],
		display : 20,
		invName : "Alchemist's fire, flasks of",
		alternatives : [/^(?=.*alchemist)(?=.*fire).*$/i]
	},
	"vials of acid" : {
		name : "Vials of Acid",
		source : ["P", 148],
		weight : 1,
		icon : "Vials",
		checks : [".Top", ".Base"],
		display : 20,
		invName : "Acid, vials of",
		alternatives : [/^(?=.*acid)(?=.*vial).*$/i]
	},
	"holy water" : {
		name : "Holy Water, flasks",
		source : ["P", 151],
		weight : 1,
		icon : "Flasks",
		checks : [".Top", ".Base"],
		display : 20,
		invName : "Holy Water, flasks of",
		alternatives : [/^(?=.*holy)(?=.*water).*$/i]
	},
	
	// UA Artificer ammo
	"arcane magazine" : {
		name : "Arcane Magazine",
		source : ["UA:A", 7],
		weight : 0.2, // based on the weight of renaissance bullets from the DMG
		icon : "Bullets",
		checks : [".Bullet"],
		display : 50,
		invName : "Thunder Cannon Rounds",
		alternatives : [/^((?=.*arcane)(?=.*magazine)|(?=.*thunder)(?=.*cannon)).*$/i]
	},

	// DMG firearms ammo
	"renaissance bullet" : {
		name : "Bullets, Renaissance",
		source : ["D", 268],
		weight : 0.2,
		icon : "Bullets",
		checks : [".Bullet"],
		display : 50,
		invName : "Bullets, renaissance",
		alternatives : [/^(?=.*bullet)(?=.*renaissance).*$/i]
	},
	"modern bullet" : {
		name : "Bullets, Modern",
		source : ["D", 268],
		weight : 0.1,
		icon : "Bullets",
		checks : [".Bullet"],
		display : 50,
		invName : "Bullets, modern",
		alternatives : [/^(?=.*bullet)(?=.*modern).*$/i]
	},
	"energy cell" : {
		name : "Energy Cell",
		source : ["D", 268],
		weight : 0,
		icon : "Bullets",
		checks : [".Bullet"],
		display : 50,
		invName : "Energy Cell"
	},
};

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
	"alchemist's fire (flask) [50 gp]" : {
		infoname : "Alchemist's fire (flask) [50 gp]",
		name : "Alchemist's fire, flasks of",
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