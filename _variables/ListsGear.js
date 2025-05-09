var Base_ArmourList = {
	"unarmored": {
		regExpSearch: /(unarmou?red|naked|nothing|bare|no.?armou?r)/i,
		name: "Unarmored",
		source: [["SRD24", 177], ["P24", 361]],
		ac: 10,
		addMod: true,
		list: "firstlist"
	},
	"mage armor": {
		regExpSearch: /^(?=.*(mage|magic))(?=.*armou?r).*$/i,
		name: "Mage armor",
		source: [["SRD24", 145], ["P24", 293]],
		ac: 13,
		list: "magic",
		affectsWildShape: true
	},
	"padded": {
		regExpSearch: /^(?!.*(plate|hide))(?=.*(padding|padded)).*$/i,
		name: "Padded",
		invName: "Padded armor",
		infoname: "Padded armor [5 gp]",
		source: [["SRD24", 92], ["P24", 219]],
		type: "light",
		ac: 11,
		stealthdis: true,
		weight: 8
	},
	"leather": {
		regExpSearch: /^(?!.*(padding|padded|studded|studs))(?=.*leather).*$/i,
		name: "Leather",
		invName: "Leather armor",
		infoname: "Leather armor [10 gp]",
		source: [["SRD24", 92], ["P24", 219]],
		type: "light",
		ac: 11,
		weight: 10
	},
	"studded leather": {
		regExpSearch: /^(?=.*(studded|studs))(?=.*leather).*$/i,
		name: "Studded leather",
		invName: "Studded leather armor",
		infoname: "Studded leather armor [45 gp]",
		source: [["SRD24", 92], ["P24", 219]],
		type: "light",
		ac: 12,
		weight: 13
	},
	"hide": {
		regExpSearch: /^(?!.*(dragon|draconic|molten bronze))(?=.*(hide|skin)).*$/i,
		name: "Hide",
		invName: "Hide armor",
		infoname: "Hide armor [10 gp]",
		source: [["SRD24", 92], ["P24", 219]],
		type: "medium",
		ac: 12,
		weight: 12
	},
	"chain shirt": {
		regExpSearch: /^(?=.*chain)(?=.*shirt).*$/i,
		name: "Chain shirt",
		infoname: "Chain shirt [50 gp]",
		source: [["SRD24", 92], ["P24", 219]],
		type: "medium",
		ac: 13,
		weight: 20
	},
	"scale mail": {
		regExpSearch: /^(?=.*scale)(?=.*mail).*$/i,
		name: "Scale mail",
		infoname: "Scale mail [50 gp]",
		source: [["SRD24", 92], ["P24", 219]],
		type: "medium",
		ac: 14,
		stealthdis: true,
		weight: 45
	},
	"breastplate": {
		regExpSearch: /^(?=.*breast)(?=.*plate).*$/i,
		name: "Breastplate",
		infoname: "Breastplate [400 gp]",
		source: [["SRD24", 92], ["P24", 219]],
		type: "medium",
		ac: 14,
		weight: 20
	},
	"half plate": {
		regExpSearch: /^(?=.*half)(?=.*plate).*$/i,
		name: "Half plate",
		invName: "Half plate armor",
		infoname: "Half plate armor [750 gp]",
		source: [["SRD24", 92], ["P24", 219]],
		type: "medium",
		ac: 15,
		stealthdis: true,
		weight: 40
	},
	"ring mail": {
		regExpSearch: /^(?=.*ring)(?=.*mail).*$/i,
		name: "Ring mail",
		infoname: "Ring mail [30 gp]",
		source: [["SRD24", 92], ["P24", 219]],
		type: "heavy",
		ac: 14,
		stealthdis: true,
		weight: 40
	},
	"chain mail": {
		regExpSearch: /^(?!.*(scale|plate|ring|shirt))(?=.*chain)(?=.*mail).*$/i,
		name: "Chain mail",
		infoname: "Chain mail [75 gp]",
		source: [["SRD24", 92], ["P24", 219]],
		type: "heavy",
		ac: 16,
		stealthdis: true,
		weight: 55,
		strReq: 13
	},
	"splint": {
		regExpSearch: /splint/i,
		name: "Splint",
		invName: "Splint armor",
		infoname: "Splint armor [200 gp]",
		source: [["SRD24", 92], ["P24", 219]],
		type: "heavy",
		ac: 17,
		stealthdis: true,
		weight: 60,
		strReq: 15
	},
	"plate": {
		regExpSearch: /^(?!.*(half|breast))(?=.*plate).*$/i,
		name: "Plate",
		invName: "Plate armor",
		infoname: "Plate armor [1500 gp]",
		source: [["SRD24", 92], ["P24", 219]],
		type: "heavy",
		ac: 18,
		stealthdis: true,
		weight: 65,
		strReq: 15
	}
};

var Base_WeaponsList = {
	// Unarmed strikes
	"unarmed strike": {
		regExpSearch: /\b(fists?|arms?|legs?|foot|feet|claws?|talons?)\b|^(?=.*unarmed)(?=.*strike).*$|^(?=.*martial)(?=.*arts).*$|^(?=.*tavern)(?=.*brawler).*$/i,
		name: "Unarmed strike (Damage)",
		source: [["SRD24", 190], ["P24", 377]],
		// list : "melee", // Hardcoded in dropdown
		ability: 1,
		type: "Natural",
		damage: [1, "", "bludgeoning"],
		range: "Melee",
		description: "Instead of damage, can Shove or Grapple (with DC)",
		monkweapon: true,
		abilitytodamage: true
	},
	"unarmed strike dc": {
		regExpSearch: /\b(fists?|arms?|legs?|foot|feet|claws?|talons?)\b|^(?=.*unarmed)(?=.*strike).*$|^(?=.*martial)(?=.*arts).*$|^(?=.*tavern)(?=.*brawler).*$/i,
		name: "Unarmed strike (DC)",
		// list : "melee", // Hardcoded in dropdown
		source: [["SRD24", 190], ["P24", 377]],
		ability: 1,
		type: "Natural",
		damage: ["Str save", "", "Shove/Grapple"],
		range: "Melee",
		description: "Up to 1 size larger; Push 5 ft or prone or grappled condition; Can damage instead (with attack roll)",
		monkweapon: true,
		abilitytodamage: false,
		dc: true
	},
	// Simple melee weapons
	"club": {
		regExpSearch: /^(?!.*(great|heavy|big))(?=.*\b(club|bian|tonfa)s?\b).*$/i,
		name: "Club",
		infoname: "Club [1 sp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Simple",
		damage: [1, 4, "bludgeoning"],
		range: "Melee",
		weight: 2,
		description: "Light",
		abilitytodamage: true,
		mastery: "Slow"
	},
	"dagger": {
		regExpSearch: /dagger|bishou|\btamos?\b|kozuka|\btantos?\b/i,
		name: "Dagger",
		infoname: "Dagger [2 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Simple",
		damage: [1, 4, "piercing"],
		range: "Melee, 20/60 ft",
		weight: 1,
		description: "Finesse, Light, Thrown",
		abilitytodamage: true,
		mastery: "Nick"
	},
	"greatclub": {
		regExpSearch: /^(?=.*(great|heavy|big|weida))(?=.*(club|bian|tonfa)s?\b).*$|tetsubo/i,
		name: "Greatclub",
		infoname: "Greatclub [2 sp]",
		nameAlt: ["Club, Great"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Simple",
		damage: [1, 8, "bludgeoning"],
		range: "Melee",
		weight: 10,
		description: "Two-Handed",
		abilitytodamage: true,
		mastery: "Push"
	},
	"handaxe": {
		regExpSearch: /^(?=.*(light|hand|short|small|throw))(?=.*(axe|\bfu)s?\b).*$|\bonos?\b/i,
		name: "Handaxe",
		infoname: "Handaxe [5 gp]",
		nameAlt: ["Axe, Hand"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Simple",
		damage: [1, 6, "slashing"],
		range: "Melee, 20/60 ft",
		weight: 2,
		description: "Light, Thrown",
		abilitytodamage: true,
		mastery: "Vex"
	},
	"javelin": {
		regExpSearch: /javelin|\bmaus?\b|uchi-ne/i,
		name: "Javelin",
		infoname: "Javelin [5 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Simple",
		damage: [1, 6, "piercing"],
		range: "Melee, 30/120 ft",
		weight: 2,
		description: "Thrown",
		abilitytodamage: true,
		mastery: "Slow"
	},
	"light hammer": {
		regExpSearch: /^(?=.*(light|hand|short|small|throw))(?=.*hammer).*$/i,
		name: "Light hammer",
		infoname: "Light hammer [2 gp]",
		nameAlt: ["Hammer, Light"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Simple",
		damage: [1, 4, "bludgeoning"],
		range: "Melee, 20/60 ft",
		weight: 2,
		description: "Light, Thrown",
		abilitytodamage: true,
		mastery: "Nick"
	},
	"mace": {
		regExpSearch: /maces?\b|\bchuis?\b|kanabo/i,
		name: "Mace",
		infoname: "Mace [5 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Simple",
		damage: [1, 6, "bludgeoning"],
		range: "Melee",
		weight: 4,
		description: "",
		abilitytodamage: true,
		mastery: "Sap"
	},
	"quarterstaff": {
		regExpSearch: /quarterstaff|\bstaffs?\b|\bbos?\b|^gun(.?(\+|-)\d+)?$/i,
		name: "Quarterstaff",
		infoname: "Quarterstaff [2 sp]",
		nameAlt: ["Staff"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Simple",
		damage: [1, 6, "bludgeoning"],
		range: "Melee",
		weight: 4,
		description: "Versatile (1d8)",
		abilitytodamage: true,
		mastery: "Topple"
	},
	"sickle": {
		regExpSearch: /sickle|\bkamas?\b/i,
		name: "Sickle",
		infoname: "Sickle [1 gp]",
		nameAlt: ["Kama"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Simple",
		damage: [1, 4, "slashing"],
		range: "Melee",
		weight: 2,
		description: "Light",
		abilitytodamage: true,
		mastery: "Nick"
	},
	"spear": {
		regExpSearch: /^(?!.*agonizing)(?!.*eldritch)(?=.*(spear|qiang|\byaris?\b)).*$/i,
		name: "Spear",
		infoname: "Spear [1 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Simple",
		damage: [1, 6, "piercing"],
		range: "Melee, 20/60 ft",
		weight: 3,
		description: "Thrown, Versatile (1d8)",
		abilitytodamage: true,
		mastery: "Sap"
	},
	// Simple ranged weapons
	"dart": {
		regExpSearch: /dart|shuriken/i,
		name: "Dart",
		infoname: "Dart [5 cp]",
		nameAlt: ["Shuriken"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "ranged",
		ability: 2,
		type: "Simple",
		damage: [1, 4, "piercing"],
		range: "20/60 ft",
		weight: 0.25,
		description: "Finesse, Thrown",
		abilitytodamage: true,
		mastery: "Vex"
	},
	"light crossbow": {
		regExpSearch: /^(((?=.*light)(?=.*crossbow))|((?!.*(hand|short|great|heavy|bolt))(?=.*\bcrossbows?\b))).*$/i,
		name: "Light crossbow",
		infoname: "Light crossbow [25 gp]",
		nameAlt: ["Crossbow, Light"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "ranged",
		ability: 2,
		type: "Simple",
		damage: [1, 8, "piercing"],
		range: "80/320 ft",
		weight: 5,
		description: "Ammunition, Loading, Two-Handed",
		abilitytodamage: true,
		ammo: "bolt",
		mastery: "Slow"
	},
	"shortbow": {
		regExpSearch: /^(?!.*crossbow)(((?=.*short)(?=.*bow))|((?!.*(moon|long))(?=.*\bbows?\b))).*$|hankyus?/i,
		name: "Shortbow",
		infoname: "Shortbow [25 gp]",
		nameAlt: ["Bow, Short"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "ranged",
		ability: 2,
		type: "Simple",
		damage: [1, 6, "piercing"],
		range: "80/320 ft",
		weight: 2,
		description: "Ammunition, Two-Handed",
		abilitytodamage: true,
		ammo: "arrow",
		mastery: "Vex"
	},
	"sling": {
		regExpSearch: /sling/i,
		name: "Sling",
		infoname: "Sling [1 sp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "ranged",
		ability: 2,
		type: "Simple",
		damage: [1, 4, "bludgeoning"],
		range: "30/120 ft",
		weight: 0.001,
		description: "Ammunition",
		abilitytodamage: true,
		ammo: "sling bullet",
		mastery: "Slow"
	},
	// Martial melee weapons
	"battleaxe": {
		regExpSearch: /^(((?=.*battle)(?=.*(axe|\bono|\bfu)s?\b))|((?!.*(light|hand|short|small|great|heavy|throw))(?=.*\b(axe|fu|masakari)s?\b))).*$/i,
		name: "Battleaxe",
		infoname: "Battleaxe [10 gp]",
		nameAlt: ["Axe, Battle"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 8, "slashing"],
		range: "Melee",
		weight: 4,
		description: "Versatile (1d10)",
		abilitytodamage: true,
		mastery: "Topple"
	},
	"flail": {
		regExpSearch: /flail|nunchaku/i,
		name: "Flail",
		infoname: "Flail [10 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 8, "bludgeoning"],
		range: "Melee",
		weight: 2,
		description: "",
		abilitytodamage: true,
		mastery: "Sap"
	},
	"glaive": {
		regExpSearch: /glaive|guandao|bisento|naginata/i,
		name: "Glaive",
		infoname: "Glaive [20 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 10, "slashing"],
		range: "Melee",
		weight: 6,
		description: "Heavy, Reach, Two-Handed",
		abilitytodamage: true,
		mastery: "Graze"
	},
	"greataxe": {
		regExpSearch: /^(?=.*(great|heavy|weida))(?=.*(axe|\bono|\bfu|masakari)s?\b).*$/i,
		name: "Greataxe",
		infoname: "Greataxe [30 gp]",
		nameAlt: ["Axe, Great"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 12, "slashing"],
		range: "Melee",
		weight: 7,
		description: "Heavy, Two-Handed",
		abilitytodamage: true,
		mastery: "Cleave"
	},
	"greatsword": {
		regExpSearch: /^(?=.*(great|heavy))(?=.*sword).*$|changdao|nodachi/i,
		name: "Greatsword",
		infoname: "Greatsword [50 gp]",
		nameAlt: ["Sword, Great"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [2, 6, "slashing"],
		range: "Melee",
		weight: 6,
		description: "Heavy, Two-Handed",
		abilitytodamage: true,
		mastery: "Graze"
	},
	"halberd": {
		regExpSearch: /halberd|\bjis?\b|kamayari/i,
		name: "Halberd",
		infoname: "Halberd [20 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 10, "slashing"],
		range: "Melee",
		weight: 6,
		description: "Heavy, Reach, Two-Handed",
		abilitytodamage: true,
		mastery: "Cleave"
	},
	"lance": {
		regExpSearch: /lance|umayari/i,
		name: "Lance",
		infoname: "Lance [10 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 10, "piercing"],
		range: "Melee",
		weight: 6,
		description: "Heavy, Reach, Two-Handed (unless mounted)",
		abilitytodamage: true,
		mastery: "Topple"
	},
	"longsword": {
		regExpSearch: /katana|\bjians?\b|^(((?=.*long)(?=.*sword))|((?!.*(burst|light|hand|short|small|great|heavy))(?=.*\bswords?\b))).*$/i,
		name: "Longsword",
		infoname: "Longsword [15 gp]",
		nameAlt: ["Sword, Long", "Katana"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 8, "slashing"],
		range: "Melee",
		weight: 3,
		description: "Versatile (1d10)",
		abilitytodamage: true,
		mastery: "Sap"
	},
	"maul": {
		regExpSearch: /^((?=.*maul)|((?=.*(great|heavy))(?=.*hammer))).*$/i,
		name: "Maul",
		infoname: "Maul [10 gp]",
		nameAlt: ["Greathammer", "Hammer, Heavy"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [2, 6, "bludgeoning"],
		range: "Melee",
		weight: 10,
		description: "Heavy, Two-Handed",
		abilitytodamage: true,
		mastery: "Topple"
	},
	"morningstar": {
		regExpSearch: /morningstar/i,
		name: "Morningstar",
		infoname: "Morningstar [15 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 8, "piercing"],
		range: "Melee",
		weight: 4,
		description: "",
		abilitytodamage: true,
		mastery: "Sap"
	},
	"pike": {
		regExpSearch: /^(?!.*armou?r)(?!.*\bspike)(?=.*(pike|\bmaos?\b|nagaeyari)).*$/i,
		name: "Pike",
		infoname: "Pike [5 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 10, "piercing"],
		range: "Melee",
		weight: 18,
		description: "Heavy, Reach, Two-Handed",
		abilitytodamage: true,
		mastery: "Push"
	},
	"rapier": {
		regExpSearch: /rapier/i,
		name: "Rapier",
		infoname: "Rapier [25 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 8, "piercing"],
		range: "Melee",
		weight: 2,
		description: "Finesse",
		abilitytodamage: true,
		mastery: "Vex"
	},
	"scimitar": {
		regExpSearch: /scimitar|liuyedao|wakizashi/i,
		name: "Scimitar",
		infoname: "Scimitar [25 gp]",
		nameAlt: ["Wakizashi"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 6, "slashing"],
		range: "Melee",
		weight: 3,
		description: "Finesse, Light",
		abilitytodamage: true
	},
	"shortsword": {
		regExpSearch: /^(?=.*short)(?=.*sword).*$|shuangdao/i,
		name: "Shortsword",
		infoname: "Shortsword [10 gp]",
		nameAlt: ["Sword, Short"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 6, "piercing"],
		range: "Melee",
		weight: 2,
		description: "Finesse, Light",
		abilitytodamage: true,
		mastery: "Vex"
	},
	"trident": {
		regExpSearch: /trident|\bchas?\b|magariyari/i,
		name: "Trident",
		infoname: "Trident [5 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 8, "piercing"], // PHB'24 changed
		range: "Melee, 20/60 ft",
		weight: 4,
		description: "Thrown, Versatile (1d10)", // PHB'24 changed
		abilitytodamage: true,
		mastery: "Topple"
	},
	"warhammer": {
		regExpSearch: /^(((?=.*hammer)(?=.*war))|((?!.*(light|hand|short|small|great|heavy|throw|maul))(?=.*\bhammers?\b))).*$/i,
		name: "Warhammer",
		infoname: "Warhammer [15 gp]",
		nameAlt: ["Hammer, War"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 8, "bludgeoning"],
		range: "Melee",
		weight: 5, // PHB'24 changed
		description: "Versatile (1d10)",
		abilitytodamage: true,
		mastery: "Push"
	},
	"war pick": {
		regExpSearch: /^(((?=.*pick)(?=.*war))|((?!.*(heavy|great|light))(?=.*\bpicks?\b))).*$|\bkuwas?\b/i,
		name: "War pick",
		infoname: "War Pick [5 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 8, "piercing"],
		range: "Melee",
		weight: 2,
		description: "Versatile (1d10)", // PHB'24 changed
		abilitytodamage: true,
		mastery: "Sap"
	},
	"whip": {
		regExpSearch: /^(?!.*thorn)(?=.*whip).*$/i,
		name: "Whip",
		infoname: "Whip [2 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "melee",
		ability: 1,
		type: "Martial",
		damage: [1, 4, "slashing"],
		range: "Melee",
		weight: 3,
		description: "Finesse, Reach",
		abilitytodamage: true,
		mastery: "Slow"
	},
	// Martial ranged weapons
	"blowgun": {
		regExpSearch: /blowgun/i,
		name: "Blowgun",
		infoname: "Blowgun [10 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "ranged",
		ability: 2,
		type: "Martial",
		damage: [1, "", "piercing"],
		range: "25/100 ft",
		weight: 1,
		description: "Ammunition, Loading",
		abilitytodamage: true,
		ammo: "needle",
		mastery: "Vex"
	},
	"hand crossbow": {
		regExpSearch: /^(?=.*hand)(?=.*crossbow).*$/i,
		name: "Hand crossbow",
		infoname: "Hand crossbow [75 gp]",
		nameAlt: ["Crossbow, Hand"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "ranged",
		ability: 2,
		type: "Martial",
		damage: [1, 6, "piercing"],
		range: "30/120 ft",
		weight: 3,
		description: "Ammunition, Light, Loading",
		abilitytodamage: true,
		ammo: "bolt",
		mastery: "Vex"
	},
	"heavy crossbow": {
		regExpSearch: /^(?=.*(great|heavy))(?=.*crossbow).*$/i,
		name: "Heavy crossbow",
		infoname: "Heavy crossbow [50 gp]",
		nameAlt: ["Crossbow, Heavy"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "ranged",
		ability: 2,
		type: "Martial",
		damage: [1, 10, "piercing"],
		range: "100/400 ft",
		weight: 18,
		description: "Ammunition, Heavy, Loading, Two-Handed",
		abilitytodamage: true,
		ammo: "bolt",
		mastery: "Push"
	},
	"longbow": {
		regExpSearch: /^(?!.*crossbow)(?=.*long)(?=.*bow).*$|daikyu/i,
		name: "Longbow",
		infoname: "Longbow [50 gp]",
		nameAlt: ["Bow, Long"],
		source: [["SRD24", 91], ["P24", 215]],
		list: "ranged",
		ability: 2,
		type: "Martial",
		damage: [1, 8, "piercing"],
		range: "150/600 ft",
		weight: 2,
		description: "Ammunition, Heavy, Two-Handed",
		abilitytodamage: true,
		ammo: "arrow",
		mastery: "Slow"
	},
	"musket": {
		regExpSearch: /musket/i,
		name: "Musket",
		infoname: "Musket [500 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "ranged",
		ability: 2,
		type: "Martial",
		damage: [1, 12, "piercing"],
		range: "40/120 ft",
		weight: 10,
		description: "Ammunition, Loading, Two-Handed",
		abilitytodamage: true,
		ammo: "firearm bullet",
		mastery: "Slow"
	},
	"pistol": {
		regExpSearch: /^(?!.*(automatic|laser|antimatter|needler|paralysis))(?=.*\bpistols?\b).*$/i,
		name: "Pistol",
		infoname: "Pistol [250 gp]",
		source: [["SRD24", 91], ["P24", 215]],
		list: "ranged",
		ability: 2,
		type: "Martial",
		damage: [1, 10, "piercing"],
		range: "30/90 ft",
		weight: 3,
		description: "Ammunition, Loading",
		abilitytodamage: true,
		ammo: "firearm bullet",
		mastery: "Vex"
	},
	// Adventuring gear that functions as a weapon
	"improvised weapon": {
		regExpSearch: /improvised/i,
		name: "Improvised Weapon",
		source: [["SRD24", 183], ["P24", 369]],
		// list : "gear", // Hardcoded in dropdown
		ability: 1,
		type: "Improvised Weapons",
		damage: [1, 4, "bludgeoning"],
		range: "Melee, 20/60 ft",
		description: "Damage die, type, range, etc. are at the DM's discretion",
		abilitytodamage: true
	},
	"vials of acid": { // PHB'24 changed
		regExpSearch: /^(?=.*vial)(?=.*acid).*$/i,
		name: "Vial of Acid",
		source: [["SRD24", 94], ["P24", 222]],
		list: "gear",
		ability: 2,
		type: "Adventuring Gear",
		damage: [2, 6, "acid"],
		range: "20 ft",
		weight: 1,
		description: "Dex save to avoid",
		abilitytodamage: false,
		ammo: "vials of acid",
		dc: true,
		isAlwaysProf: true,
		isNotWeapon: true
	},
	"alchemist fire": { // PHB'24 changed
		regExpSearch: /^(?=.*alchemist)(?=.*fire).*$/i,
		name: "Alchemist's Fire",
		source: [["SRD24", 94], ["P24", 222]],
		list: "gear",
		ability: 2,
		type: "Adventuring Gear",
		damage: [1, 4, "fire"],
		range: "20 ft",
		weight: 1,
		description: "Target starts Burning; Dex save to avoid",
		abilitytodamage: false,
		ammo: "alchemist fire",
		dc: true,
		isAlwaysProf: true,
		isNotWeapon: true
	},
	"holy water": {
		regExpSearch: /^(?=.*holy)(?=.*water).*$/i,
		name: "Holy Water",
		source: [["SRD24", 97], ["P24", 226]],
		list: "gear",
		ability: 2,
		type: "Adventuring Gear",
		damage: [2, 8, "radiant"], // PHB'24 changed
		range: "20 ft",
		weight: 1,
		description: "Dex save to avoid; Only affects Fiend \u0026 Undead",
		abilitytodamage: false,
		ammo: "holy water",
		dc: true,
		isAlwaysProf: true,
		isNotWeapon: true
	},
	"net": { // PHB'24 changed
		regExpSearch: /\bnet(ting)?s?\b/i,
		name: "Net",
		infoname: "Net [1 gp]",
		source: [["SRD24", 98], ["P24", 227]],
		list: "gear",
		ability: 2,
		type: "Adventuring Gear",
		damage: ["Dex save", "", "Restrained"],
		range: "15 ft",
		weight: 3,
		description: "Up to Large target; DC 10 Athletics to escape as an Action",
		tooltip: "When you take the Attack action, you can replace one of your attacks with throwing a Net. Target a creature you can see within 15 feet of yourself. The target must succeed on a Dexterity saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus) or have the Restrained condition until it escapes. The target succeeds automatically if it is Huge or larger."+
		"\nTo escape, the target or a creature within 5 feet of it must take an action to make a DC 10 Strength (Athletics) check, freeing the Restrained creature on a success. Destroying the Net (AC 10; 5 HP; Immunity to Bludgeoning, Poison, and Psychic damage) also frees the target, ending the effect.",
		abilitytodamage: false,
		dc: true,
		isAlwaysProf: true,
		isNotWeapon: true
	},
	"oil": { // PHB'24 new
		regExpSearch: /oil/i,
		name: "Oil",
		source: [["SRD24", 98], ["P24", 227]],
		list: "gear",
		ability: 2,
		type: "Adventuring Gear",
		damage: ["Dex save", "", "Covered"],
		range: "20 ft",
		weight: 1,
		description: "If covered target takes fire damage in next minute, the oil burns for 5 fire damage",
		abilitytodamage: false,
		ammo: "oil",
		dc: true,
		isAlwaysProf: true,
		isNotWeapon: true
	},
	"burning torch": {
		regExpSearch: /^(?=.*torch)(?=.*burning).*$/i,
		name: "Torch, Burning",
		source: [["SRD24", 100], ["P24", 229]],
		list: "gear",
		ability: 1,
		type: "Simple", // PHB'24 changed
		damage: [1, "", "fire"],
		range: "Melee",
		weight: 1,
		description: "Only damages if burning",
		abilitytodamage: false
	},
	// Cantrips
	"spell attack": {
		regExpSearch: /^(?=.*spell)(?=.*attack).*$/i,
		name: "Spell attack",
		source: [["SRD24", 188], ["P24", 374]],
		// list : "spell", // Hardcoded in dropdown
		ability: 0,
		type: "Spell",
		damage: ["", "", ""],
		range: "",
		description: "",
		abilitytodamage: false
	},
	"acid splash": {
		regExpSearch: /^(?=.*acid)(?=.*splash).*$/i,
		name: "Acid Splash",
		source: [["SRD24", 107], ["P24", 239]],
		list: "spell",
		ability: 4,
		type: "Cantrip",
		damage: ["C", 6, "acid"],
		range: "60 ft",
		description: "All creatures in a 5-ft radius sphere; Dex save to avoid",
		abilitytodamage: false,
		dc: true
	},
	"chill touch": {
		regExpSearch: /^(?=.*chill)(?=.*touch).*$/i,
		name: "Chill Touch",
		source: [["SRD24", 115], ["P24", 249]],
		list: "spell",
		ability: 6,
		type: "Cantrip",
		damage: ["C", 10, "necrotic"],
		range: "Melee",
		description: "Target can't regain HP until my next turn ends",
		abilitytodamage: false
	},
	"eldritch blast": {
		regExpSearch: /(agonizing|eldritch|repelling).(spear|blast)/i,
		name: "Eldritch Blast",
		source: [["SRD24", 127], ["P24", 267]],
		list: "spell",
		ability: 6,
		type: "Cantrip",
		damage: ["C\xD7" + 1, 10, "force"],
		range: "120 ft",
		description: "Each d10 is a separate beam with its own attack roll",
		abilitytodamage: false
	},
	"fire bolt": {
		regExpSearch: /^(?=.*fire)(?=.*bolt).*$/i,
		name: "Fire Bolt",
		source: [["SRD24", 132], ["P24", 274]],
		list: "spell",
		ability: 6,
		type: "Cantrip",
		damage: ["C", 10, "fire"],
		range: "120 ft",
		description: "Unattended flammable object starts Burning",
		abilitytodamage: false
	},
	"poison spray": {
		regExpSearch: /^(?=.*poison)(?=.*spray).*$/i,
		name: "Poison Spray",
		source: [["SRD24", 153], ["P24", 306]],
		list: "spell",
		ability: 6,
		type: "Cantrip",
		damage: ["C", 12, "poison"],
		range: "30 ft",
		description: "",
		abilitytodamage: false
	},
	"produce flame": {
		regExpSearch: /^(?=.*produce)(?=.*flame).*$/i,
		name: "Produce Flame",
		source: [["SRD24", 156], ["P24", 308]],
		list: "spell",
		ability: 5,
		type: "Cantrip",
		damage: ["C", 8, "fire"],
		range: "60 ft",
		description: "20-ft radius bright light and 20-ft radius dim light until thrown",
		abilitytodamage: false
	},
	"ray of frost": {
		regExpSearch: /^(?=.*ray)(?=.*frost).*$/i,
		name: "Ray of Frost",
		source: [["SRD24", 157], ["P24", 311]],
		list: "spell",
		ability: 6,
		type: "Cantrip",
		damage: ["C", 8, "cold"],
		range: "60 ft",
		description: "Target -10 ft speed until start of my next turn",
		abilitytodamage: false
	},
	"sacred flame": {
		regExpSearch: /^(?=.*sacred)(?=.*flame).*$/i,
		name: "Sacred Flame",
		source: [["SRD24", 159], ["P24", 313]],
		list: "spell",
		ability: 5,
		type: "Cantrip",
		damage: ["C", 8, "radiant"],
		range: "60 ft",
		description: "Dex save to avoid, no save bonus for cover",
		abilitytodamage: false,
		dc: true
	},
	"shillelagh-club": {
		baseWeapon: "club",
		regExpSearch: /^(?=.*shillelagh)(?=.*\b(club|bian|tonfa)s?\b).*$/i,
		name: "Shillelagh (club)",
		source: [["SRD24", 162], ["P24", 316]],
		list: "spell",
		ability: 5,
		damage: [1, 8, "force"],
		description: "Light; Imbued club or quarterstaff",
	},
	"shillelagh-quarterstaff": {
		baseWeapon: "quarterstaff",
		regExpSearch: /^(?=.*shillelagh)(?=.*(quarterstaff|\bstaffs?\b|\bbos?\b)).*$/i,
		name: "Shillelagh (staff)",
		source: [["SRD24", 162], ["P24", 316]],
		list: "spell",
		ability: 5,
		damage: [1, 8, "force"],
		description: "Imbued club or quarterstaff"
	},
	"shocking grasp": {
		regExpSearch: /^(?=.*shocking)(?=.*grasp).*$/i,
		name: "Shocking Grasp",
		source: [["SRD24", 162], ["P24", 316]],
		list: "spell",
		ability: 6,
		type: "Cantrip",
		damage: ["C", 8, "lightning"],
		range: "Melee",
		description: "Target cannot take reactions until its next turn starts",
		abilitytodamage: false
	},
	"vicious mockery": {
		regExpSearch: /^(?=.*vicious)(?=.*mockery).*$/i,
		name: "Vicious Mockery",
		source: [["SRD24", 171], ["P24", 337]],
		list: "spell",
		ability: 6,
		type: "Cantrip",
		damage: ["C", 6, "psychic"],
		range: "60 ft",
		description: "Target has disadv. on its next attack roll before its next turn ends; Wis save to avoid",
		abilitytodamage: false,
		dc: true
	}
};

// Add weapon die scaling for shillelagh
addEvals({ atkAdd : [
	function (fields, v) {
		if (v.WeaponName === "shillelagh-club" || v.WeaponName === "shillelagh-quarterstaff") {
			fields.Damage_Die = function(n){ return n < 5 ? '1d8' : n < 11 ? '1d10' : n < 17 ? '1d12' : '2d6'}(classes.totallevel);
		}
	},
	"", // no description means it doesn't appear in the attack line menu's pop-up dialog
	1
] }, "Shillelagh damage progression", true, "items");
CurrentUpdates.types = []; // don't trigger the changes dialog for this

//A list of all types of 'ammo' for the ammunition section on the first page
var Base_AmmoList = {
	"arrow": {
		name: "Arrows",
		source: [["SRD24", 96], ["P24", 222]],
		weight: 0.05,
		icon: "Arrows"
	},
	"bolt": {
		name: "Bolts",
		weight: 0.075,
		source: [["SRD24", 96], ["P24", 222]],
		icon: "Arrows",
		invName: "Crossbow bolts" // incorrect, but clearer than the PHB'24 "bolt"
	},
	"sling bullet": { // PHB'24 changed
		name: "Bullets, Sling",
		weight: 0.075,
		source: [["SRD24", 96], ["P24", 222]],
		icon: "Bullets",
		invName: "Sling bullets",
		alternatives: [/^(?=.*bullet)(?=.*sling).*$/i]
	},
	"firearm bullet": { // PHB'24 new
		name: "Bullets, Firearm",
		weight: 0.2,
		source: [["SRD24", 96], ["P24", 222]],
		icon: "Bullets",
		invName: "Firearm bullets",
		alternatives: [/^(?=.*bullet)(?=.*firearm).*$/i]
	},
	"dagger": {
		name: "Daggers",
		source: [["SRD24", 91], ["P24", 215]],
		weight: 1,
		icon: "Daggers"
	},
	"dart": {
		name: "Darts",
		source: [["SRD24", 91], ["P24", 215]],
		weight: 0.25,
		icon: "Arrows"
	},
	"flask": {
		name: "Flasks (1 pint)",
		source: [["SRD24", 97], ["P24", 225]],
		weight: 1,
		icon: "Flasks"
	},
	"handaxe": {
		name: "Handaxes",
		source: [["SRD24", 91], ["P24", 215]],
		weight: 2,
		icon: "Axes",
		alternatives: ["axe"]
	},
	"javelin": {
		name: "Javelins",
		source: [["SRD24", 91], ["P24", 215]],
		weight: 2,
		icon: "Spears"
	},
	"light hammer": {
		name: "Light Hammers",
		source: [["SRD24", 91], ["P24", 215]],
		weight: 2,
		icon: "Hammers",
		alternatives: ["hammer"]
	},
	"needle": {
		name: "Needles",
		source: [["SRD24", 96], ["P24", 222]],
		weight: 0.02,
		icon: "Bullets",
		invName: "Blowgun needles"
	},
	"spear": {
		name: "Spears",
		source: [["SRD24", 91], ["P24", 215]],
		weight: 3,
		icon: "Spears"
	},
	"trident": {
		name: "Tridents",
		source: [["SRD24", 91], ["P24", 215]],
		weight: 4,
		icon: "Spears"
	},
	"vial": {
		name: "Vials (4 ounces)",
		source: [["SRD24", 100], ["P24", 229]],
		weight: 0.25,
		icon: "Vials"
	},
	"alchemist fire": {
		name: "Alchemist's Fire, flasks",
		source: [["SRD24", 94], ["P24", 222]],
		weight: 1,
		icon: "Flasks",
		invName: "Alchemist's fire, flasks of",
		alternatives: [/^(?=.*alchemist)(?=.*fire).*$/i]
	},
	"vials of acid": {
		name: "Vials of Acid",
		source: [["SRD24", 94], ["P24", 222]],
		weight: 1,
		icon: "Vials",
		invName: "Acid, vials of",
		alternatives: [/^(?=.*acid)(?=.*vial).*$/i]
	},
	"holy water": {
		name: "Holy Water, flasks",
		source: [["SRD24", 97], ["P24", 226]],
		weight: 1,
		icon: "Flasks",
		invName: "Holy Water, flasks of",
		alternatives: [/^(?=.*holy)(?=.*water).*$/i]
	},
	"oil": {
		name: "Oil, flasks",
		source: [["SRD24", 98], ["P24", 227]],
		weight: 1,
		icon: "Flasks",
		invName: "Oil, flasks of",
		alternatives: [/oil/i]
	}
};

var Base_PacksList = {
	burglar: {
		name: "Burglar's pack (16 gp)",
		source: [["SRD24", 96], ["P24", 224]],
		items: [
			["Backpack, with:", "", 5],
			["Ball bearings, pouches of", "", 2],
			["Bell", "", ""],
			["Candles", 10, ""],
			["Crowbar", "", 5],
			["Rope", "", 5],
			["Hooded lantern", "", 2],
			["Oil, flasks of", 7, 1],
			["Tinderbox", "", 1],
			["Rations, days of", 5, 2],
			["Waterskin", "", 5]
		]
	},
	diplomat: {
		name: "Diplomat's pack (39 gp)",
		source: [["SRD24", 97], ["P24", 225]],
		items: [
			["Chest, with:", "", 25],
			["Fine clothes", "", 6],
			["Perfume, vials of", "", ""],
			["Ink, 1 ounce bottles of", "", ""],
			["Ink pen", 5, ""],
			["Paper, sheets of", 5, ""],
			["Parchment, sheets of", 5, ""],
			["Map or scroll case", 2, 1],
			["Lamp", "", 1],
			["Oil, flasks of", 4, 1],
			["Tinderbox", "", 1]
		]
	},
	dungeoneer: {
		name: "Dungeoneer's pack (12 gp)",
		source: [["SRD24", 97], ["P24", 225]],
		items: [
			["Backpack, with:", "", 5],
			["Caltrops, bags of", "", 2],
			["Crowbar", "", 5],
			["Oil, flasks of", 2, 1],
			["Tinderbox", "", 1],
			["Torches", 10, 1],
			["Rations, days of", 10, 2],
			["Waterskin", "", 5]
		]
	},
	entertainer: {
		name: "Entertainer's pack (40 gp)",
		source: [["SRD24", 97], ["P24", 225]],
		items: [
			["Backpack, with:", "", 5],
			["Bedroll", "", 7],
			["Costume clothes", 3, 4],
			["Bell", "", ""],
			["Mirror", "", 0.5],
			["Bullseye lantern", "", 2],
			["Oil, flasks of", 8, 1],
			["Tinderbox", "", 1],
			["Rations, days of", 9, 2],
			["Waterskin", "", 5]
		]
	},
	explorer: {
		name: "Explorer's pack (10 gp)",
		source: [["SRD24", 97], ["P24", 225]],
		items: [
			["Backpack, with:", "", 5],
			["Bedroll", "", 7],
			["Rope", "", 5],
			["Oil, flasks of", 2, 1],
			["Tinderbox", "", 1],
			["Torches", 10, 1],
			["Rations, days of", 10, 2],
			["Waterskin", "", 5]
		]
	},
	priest: {
		name: "Priest's pack (33 gp)",
		source: [["SRD24", 99], ["P24", 228]],
		items: [
			["Backpack, with:", "", 5],
			["Blanket", "", 3],
			["Robe", "", 4],
			["Holy water, flasks of", "", 1],
			["Lamp", "", 1],
			["Tinderbox", "", 1],
			["Rations, days of", 7, 2]
		]
	},
	scholar: {
		name: "Scholar's pack (40 gp)",
		source: [["SRD24", 99], ["P24", 228]],
		items: [
			["Backpack, with:", "", 5],
			["Book", "", 5],
			["Ink, 1 ounce bottle of", "", ""],
			["Ink pen", "", ""],
			["Parchment, sheets of", 10, ""],
			["Lamp", "", 1],
			["Oil, flasks of", 10, 1],
			["Tinderbox", "", 1]
		]
	}
};

var Base_GearList = {
/* removed in PHB'24
	"abacus": {
		infoname: "Abacus [2 gp]",
		name: "Abacus",
		amount: "",
		weight: 2
	},
*/
	"acid": {
		infoname: "Acid (vial) [25 gp]",
		name: "Acid, vials of",
		amount: "",
		weight: 1
	},
	"alchemist's fire": {
		infoname: "Alchemist's fire (flask) [50 gp]",
		name: "Alchemist's fire, flasks of",
		amount: "",
		weight: 1
	},
	"animal feed (1 day)": {
		infoname: "Animal feed (1 day) [5 cp]",
		name: "Animal feed, days of",
		amount: 1,
		weight: 10
	},
	"arrows": {
		infoname: "Arrows (20) [1 gp]",
		name: "Arrows",
		amount: 20,
		weight: 0.05,
		type: "ammunition"
	},
	"needles": {
		infoname: "Blowgun needles (50) [1 gp]",
		name: "Blowgun needles", // incorrect, but clearer than the PHB'24 "needles"
		amount: 50,
		weight: 0.02,
		type: "ammunition"
	},
	"bolts": {
		infoname: "Crossbow bolts (20) [1 gp]",
		name: "Crossbow bolts", // incorrect, but clearer than the PHB'24 "bolts"
		amount: 20,
		weight: 0.075,
		type: "ammunition"
	},
	"bullets, sling": {
		infoname: "Bullets, sling (20) [4 cp]",
		name: "Sling bullets",
		amount: 20,
		weight: 0.075,
		type: "ammunition"
	},
	"bullets, firearm": {
		infoname: "Bullets, firearm (10) [3 gp]",
		name: "Firearm bullets",
		amount: 10,
		weight: 0.2,
		type: "ammunition"
	},
	"antitoxin": {
		infoname: "Antitoxin (vial) [50 gp]",
		name: "Antitoxin, vials of",
		amount: "",
		weight: ""
	},
	"crystal": {
		infoname: "Crystal [10 gp]",
		name: "Crystal arcane focus",
		amount: "",
		weight: 1,
		type: "arcane focus"
	},
	"orb": {
		infoname: "Orb [20 gp]",
		name: "Orb arcane focus",
		amount: "",
		weight: 3,
		type: "arcane focus"
	},
	"rod": {
		infoname: "Rod [10 gp]",
		name: "Rod arcane focus",
		amount: "",
		weight: 2,
		type: "arcane focus"
	},
	"staff": {
		infoname: "Staff [5 gp]",
		name: "Staff arcane focus",
		amount: "",
		weight: 4,
		type: "arcane focus"
	},
	"wand": {
		infoname: "Wand [10 gp]",
		name: "Wand arcane focus",
		amount: "",
		weight: 1,
		type: "arcane focus"
	},
	"backpack": {
		infoname: "Backpack [2 gp]",
		name: "Backpack",
		amount: "",
		weight: 5
	},
	"ball bearings": {
		infoname: "Ball bearings (pouch) [1 gp]",
		name: "Ball bearings, pouches of",
		amount: "",
		weight: 2
	},
	"barrel": {
		infoname: "Barrel [2 gp]",
		name: "Barrel",
		amount: "",
		weight: 70
	},
	"basket": {
		infoname: "Basket [4 sp]",
		name: "Basket",
		amount: "",
		weight: 2
	},
	"bedroll": {
		infoname: "Bedroll [1 gp]",
		name: "Bedroll",
		amount: "",
		weight: 7
	},
	"bell": {
		infoname: "Bell [1 gp]",
		name: "Bell",
		amount: "",
		weight: ""
	},
/* removed in PHB'24, now included with a saddle
	"bit and bridle": {
		infoname: "Bit and bridle [2 gp]",
		name: "Bit and bridle",
		amount: "",
		weight: 1
	},
*/
	"blanket": {
		infoname: "Blanket [5 sp]",
		name: "Blanket",
		amount: "",
		weight: 3
	},
	"block and tackle": {
		infoname: "Block and tackle [1 gp]",
		name: "Block and tackle",
		amount: "",
		weight: 5
	},
	"book": {
		infoname: "Book [25 gp]",
		name: "Book",
		amount: "",
		weight: 5
	},
	"bottle, glass": {
		infoname: "Bottle, glass [2 gp]",
		name: "Glass bottle",
		amount: "",
		weight: 2
	},
	"bucket": {
		infoname: "Bucket [5 cp]",
		name: "Bucket",
		amount: "",
		weight: 2
	},
	"caltrops": {
		infoname: "Caltrops (bag) [1 gp]",
		name: "Caltrops, bags of",
		amount: "",
		weight: 2
	},
	"candle": {
		infoname: "Candle [1 cp]",
		name: "Candle",
		amount: "",
		weight: ""
	},
	"case, crossbow bolt": {
		infoname: "Case, crossbow bolt [1 gp]",
		name: "Crossbow bolt case",
		amount: "",
		weight: 1
	},
	"case, map or scroll": {
		infoname: "Case, map or scroll [1 gp]",
		name: "Map or scroll case",
		amount: "",
		weight: 1
	},
	"chain": {
		infoname: "Chain [5 gp]",
		name: "Chain",
		amount: "",
		weight: 10
	},
/* removed in PHB'24
	"chalk (1 piece)": {
		infoname: "Chalk (1 piece) [1 cp]",
		name: "Chalk, pieces of",
		amount: "",
		weight: ""
	},
*/
	"chest": {
		infoname: "Chest [5 gp]",
		name: "Chest",
		amount: "",
		weight: 25
	},
	"climber's kit": {
		infoname: "Climber's kit [25 gp]",
		name: "Climber's kit",
		amount: "",
		weight: 12
	},
/* removed in PHB'24
	"common": {
		infoname: "Common [5 sp]",
		name: "Common clothes",
		amount: "",
		weight: 3,
		type: "clothes"
	},
*/
	"costume": {
		infoname: "Costume [5 gp]",
		name: "Costume clothes",
		amount: "",
		weight: 4,
		type: "clothes"
	},
	"clothes, fine": {
		infoname: "Fine [15 gp]",
		name: "Fine clothes",
		amount: "",
		weight: 6,
		type: "clothes"
	},
	"clothes, traveler's": {
		infoname: "Traveler's [2 gp]",
		name: "Traveler's clothes",
		amount: "",
		weight: 4,
		type: "clothes"
	},
	"component pouch": {
		infoname: "Component pouch [25 gp]",
		name: "Component pouch",
		amount: "",
		weight: 2
	},
	"crowbar": {
		infoname: "Crowbar [2 gp]",
		name: "Crowbar",
		amount: "",
		weight: 5
	},
	"sprig of mistletoe": {
		infoname: "Sprig of mistletoe [1 gp]",
		name: "Sprig of mistletoe druidic focus",
		amount: "",
		weight: "",
		type: "druidic focus"
	},
/* removed in PHB'24
	"totem": {
		infoname: "Totem [1 gp]",
		name: "Totem druidic focus",
		amount: "",
		weight: "",
		type: "druidic focus"
	},
*/
	"wooden staff": {
		infoname: "Wooden staff [5 gp]",
		name: "Wooden staff druidic focus",
		amount: "",
		weight: 4,
		type: "druidic focus"
	},
	"yew wand": {
		infoname: "Yew wand  [10 gp]",
		name: "Yew wand druidic focus",
		amount: "",
		weight: 1,
		type: "druidic focus"
	},
/* removed in PHB'24
	"fishing tackle": {
		infoname: "Fishing tackle [1 gp]",
		name: "Fishing tackle",
		amount: "",
		weight: 4
	},
*/
	"flask": {
		infoname: "Flask [2 cp]",
		name: "Flask",
		amount: "",
		weight: 1
	},
	"grappling hook": {
		infoname: "Grappling hook [2 gp]",
		name: "Grappling hook",
		amount: "",
		weight: 4
	},
/* removed in PHB'24
	"hammer": {
		infoname: "Hammer [1 gp]",
		name: "Hammer",
		amount: "",
		weight: 3
	},
	"hammer, sledge": {
		infoname: "Hammer, sledge [2 gp]",
		name: "Sledge hammer",
		amount: "",
		weight: 10
	},
*/
	"healer's kit": {
		infoname: "Healer's kit [5 gp]",
		name: "Healer's kit",
		amount: "",
		weight: 3
	},
	"amulet": {
		infoname: "Amulet [5 gp]",
		name: "Amulet holy symbol",
		amount: "",
		weight: 1,
		type: "holy symbol"
	},
	"emblem": {
		infoname: "Emblem [5 gp]",
		name: "Emblem holy symbol",
		amount: "",
		weight: "",
		type: "holy symbol"
	},
	"reliquary": {
		infoname: "Reliquary [5 gp]",
		name: "Reliquary holy symbol",
		amount: "",
		weight: 2,
		type: "holy symbol"
	},
	"holy water": {
		infoname: "Holy water (flask) [25 gp]",
		name: "Holy water, flasks of",
		amount: "",
		weight: 1
	},
/* removed in PHB'24
	"hourglass": {
		infoname: "Hourglass [25 gp]",
		name: "Hourglass",
		amount: "",
		weight: 1
	},
*/
	"hunting trap": {
		infoname: "Hunting trap [5 gp]",
		name: "Hunting trap",
		amount: "",
		weight: 25
	},
	"ink": {
		infoname: "Ink (1 ounce bottle) [10 gp]",
		name: "Ink, 1 ounce bottles of",
		amount: "",
		weight: ""
	},
	"ink pen": {
		infoname: "Ink pen [2 cp]",
		name: "Ink pen",
		amount: "",
		weight: ""
	},
	"jug": {
		infoname: "Jug [2 cp]",
		name: "Jug",
		amount: "",
		weight: 4
	},
/* removed in PHB'24
	"small knife": {
		infoname: "Small Knife [1 sp]",
		name: "Small Knife",
		amount: "",
		weight: 0.25
	},
*/
	"ladder": {
		infoname: "Ladder (10 ft) [1 sp]",
		name: "10-ft ladder",
		amount: "",
		weight: 25
	},
	"lamp": {
		infoname: "Lamp [5 sp]",
		name: "Lamp",
		amount: "",
		weight: 1
	},
	"lantern, bullseye": {
		infoname: "Lantern, bullseye [10 gp]",
		name: "Bullseye lantern",
		amount: "",
		weight: 2
	},
	"lantern, hooded": {
		infoname: "Lantern, hooded [5 gp]",
		name: "Hooded lantern",
		amount: "",
		weight: 2
	},
	"lock": {
		infoname: "Lock [10 gp]",
		name: "Lock",
		amount: "",
		weight: 1
	},
	"magnifying glass": {
		infoname: "Magnifying glass [100 gp]",
		name: "Magnifying glass",
		amount: "",
		weight: ""
	},
	"manacles": {
		infoname: "Manacles [2 gp]",
		name: "Manacles",
		amount: "",
		weight: 6
	},
	"map": {
		infoname: "Map [1 gp]",
		name: "Map",
		amount: "",
		weight: ""
	},
/* removed in PHB'24
	"mess kit": {
		infoname: "Mess kit [2 sp]",
		name: "Mess kit",
		amount: "",
		weight: 1
	},
*/
	"mirror": {
		infoname: "Mirror [5 gp]",
		name: "Mirror",
		amount: "",
		weight: 0.5
	},
	"oil": {
		infoname: "Oil (flask) [1 sp]",
		name: "Oil, flasks of",
		amount: "",
		weight: 1
	},
	"paper": {
		infoname: "Paper (one sheet) [2 sp]",
		name: "Paper, sheets of",
		amount: "",
		weight: ""
	},
	"parchment": {
		infoname: "Parchment (one sheet) [1 sp]",
		name: "Parchment, sheets of",
		amount: "",
		weight: ""
	},
	"perfume": {
		infoname: "Perfume (vial) [5 gp]",
		name: "Perfume, vials of",
		amount: "",
		weight: ""
	},
/* removed in PHB'24
	"pick, miner's": {
		infoname: "Pick, miner's [2 gp]",
		name: "Miner's pick",
		amount: "",
		weight: 10
	},
	"piton": {
		infoname: "Piton [5 cp]",
		name: "Piton",
		amount: "",
		weight: 0.25
	},
*/
	"poison, basic": {
		infoname: "Poison, basic (vial) [100 gp]",
		name: "Basic poison, vials of",
		amount: "",
		weight: ""
	},
	"pole": {
		infoname: "Pole (10 ft) [5 cp]",
		name: "10-ft pole",
		amount: "",
		weight: 7
	},
	"pot, iron": {
		infoname: "Pot, iron [2 gp]",
		name: "Iron pot",
		amount: "",
		weight: 10
	},
	"potion of healing": {
		infoname: "Potion of healing [50 gp]",
		name: "Potion of healing",
		amount: "",
		weight: 0.5
	},
	"pouch": {
		infoname: "Pouch [5 sp]",
		name: "Pou\uFEFFch",
		amount: "",
		weight: 1
	},
	"quiver": {
		infoname: "Quiver [1 gp]",
		name: "Quiver",
		amount: "",
		weight: 1
	},
	"ram, portable": {
		infoname: "Ram, portable [4 gp]",
		name: "Portable ram",
		amount: "",
		weight: 35
	},
	"rations": {
		infoname: "Rations (1 day) [5 sp]",
		name: "Rations, days of",
		amount: 1,
		weight: 2
	},
	"robe": {
		infoname: "Robe [1 gp]",
		name: "Robe",
		amount: "",
		weight: 4
	},
/* removed in PHB'24, now just "Rope"
	"rope, hempen (50 feet)": {
		infoname: "Rope, hempen (50 feet) [1 gp]",
		name: "Hempen rope, feet of",
		amount: 50,
		weight: 0.2
	},
	"rope, silk (50 feet)": {
		infoname: "Rope, silk (50 feet) [10 gp]",
		name: "Silk rope, feet of",
		amount: 50,
		weight: 0.1
	},
*/
	"rope": {
		infoname: "Rope [1 gp]",
		name: "Rope",
		amount: "",
		weight: 5
	},
	"sack": {
		infoname: "Sack [1 cp]",
		name: "Sack",
		amount: "",
		weight: 0.5
	},
	"saddle, exotic": {
		infoname: "Exotic [60 gp]",
		name: "Exotic saddle",
		amount: "",
		weight: 40,
		type: "saddle"
	},
	"saddle, military": {
		infoname: "Military [20 gp]",
		name: "Military saddle",
		amount: "",
		weight: 30,
		type: "saddle"
	},
/* removed in PHB'24
	"pack": {
		infoname: "Pack [5 gp]",
		name: "Pack saddle",
		amount: "",
		weight: 15,
		type: "saddle"
	},
*/
	"saddle, riding": {
		infoname: "Riding [10 gp]",
		name: "Riding saddle",
		amount: "",
		weight: 25,
		type: "saddle"
	},
/* removed in PHB'24
	"saddlebags": {
		infoname: "Saddlebags [4 gp]",
		name: "Saddlebags",
		amount: "",
		weight: 8
	},
	"scale, merchant's": {
		infoname: "Scale, merchant's [5 gp]",
		name: "Merchant's scale",
		amount: "",
		weight: 3
	},
	"sealing wax": {
		infoname: "Sealing wax [5 cp]",
		name: "Sealing wax",
		amount: "",
		weight: ""
	},
*/
	"shovel": {
		infoname: "Shovel [2 gp]",
		name: "Shovel",
		amount: "",
		weight: 5
	},
	"signal whistle": {
		infoname: "Signal whistle [5 cp]",
		name: "Signal whistle",
		amount: "",
		weight: ""
	},
/* removed in PHB'24
	"signet ring": {
		infoname: "Signet ring [5 gp]",
		name: "Signet ring",
		amount: "",
		weight: ""
	},
	"soap": {
		infoname: "Soap [2 cp]",
		name: "Soap",
		amount: "",
		weight: ""
	},
*/
	"spellbook": {
		infoname: "Spellbook [50 gp]", // No price mentioned in PHB'24
		name: "Spellbook",
		amount: "",
		weight: 3
	},
	"spell scroll (cantrip)": { // PHB'24 new
		infoname: "Spell Scroll (Cantrip) [30 gp]",
		name: "Spell Scroll (Cantrip)",
		amount: "",
		weight: "",
	},
	"spell scroll (level 1)": { // PHB'24 new
		infoname: "Spell Scroll (Level 1) [50 gp]",
		name: "Spell Scroll (Level 1)",
		amount: "",
		weight: "",
	},
	"spikes, iron": {
		infoname: "Spikes, iron (10) [1 gp]",
		name: "Iron spikes",
		amount: 10,
		weight: 0.5
	},
	"spyglass": {
		infoname: "Spyglass [1000 gp]",
		name: "Spyglass",
		amount: "",
		weight: 1
	},
	"tent": {
		infoname: "Tent, two-person [2 gp]",
		name: "Two-person tent",
		amount: "",
		weight: 20
	},
	"tinderbox": {
		infoname: "Tinderbox [5 sp]",
		name: "Tinderbox",
		amount: "",
		weight: 1
	},
	"torch": {
		infoname: "Torch [1 cp]",
		name: "Torch",
		amount: "",
		weight: 1
	},
	"vial": {
		infoname: "Vial [1 gp]",
		name: "Vial",
		amount: "",
		weight: ""
	},
	"waterskin": {
		infoname: "Waterskin [2 sp]",
		name: "Waterskin",
		amount: "",
		weight: 5
	},
/* removed in PHB'24
	"whetstone": {
		infoname: "Whetstone [1 cp]",
		name: "Whetstone",
		amount: "",
		weight: 1
	}
*/
};

var Base_ToolsList = {
	"alchemist's supplies": {
		infoname: "Alchemist's supplies [50 gp]",
		name: "Alchemist's supplies",
		amount: "",
		weight: 8,
		type: "artisan's tools"
	},
	"brewer's supplies": {
		infoname: "Brewer's supplies [20 gp]",
		name: "Brewer's supplies",
		amount: "",
		weight: 9,
		type: "artisan's tools"
	},
	"calligrapher's supplies": {
		infoname: "Calligrapher's supplies [10 gp]",
		name: "Calligrapher's supplies",
		amount: "",
		weight: 5,
		type: "artisan's tools"
	},
	"carpenter's tools": {
		infoname: "Carpenter's tools [8 gp]",
		name: "Carpenter's tools",
		amount: "",
		weight: 6,
		type: "artisan's tools"
	},
	"cartographer's tools": {
		infoname: "Cartographer's tools [15 gp]",
		name: "Cartographer's tools",
		amount: "",
		weight: 6,
		type: "artisan's tools"
	},
	"cobbler's tools": {
		infoname: "Cobbler's tools [5 gp]",
		name: "Cobbler's tools",
		amount: "",
		weight: 5,
		type: "artisan's tools"
	},
	"cook's utensils": {
		infoname: "Cook's utensils [1 gp]",
		name: "Cook's utensils",
		amount: "",
		weight: 8,
		type: "artisan's tools"
	},
	"glassblower's tools": {
		infoname: "Glassblower's tools [30 gp]",
		name: "Glassblower's tools",
		amount: "",
		weight: 5,
		type: "artisan's tools"
	},
	"jeweler's tools": {
		infoname: "Jeweler's tools [25 gp]",
		name: "Jeweler's tools",
		amount: "",
		weight: 2,
		type: "artisan's tools"
	},
	"leatherworker's tools": {
		infoname: "Leatherworker's tools [5 gp]",
		name: "Leatherworker's tools",
		amount: "",
		weight: 5,
		type: "artisan's tools"
	},
	"mason's tools": {
		infoname: "Mason's tools [10 gp]",
		name: "Mason's tools",
		amount: "",
		weight: 8,
		type: "artisan's tools"
	},
	"painter's supplies": {
		infoname: "Painter's supplies [10 gp]",
		name: "Painter's supplies",
		amount: "",
		weight: 5,
		type: "artisan's tools"
	},
	"potter's tools": {
		infoname: "Potter's tools [10 gp]",
		name: "Potter's tools",
		amount: "",
		weight: 3,
		type: "artisan's tools"
	},
	"smith's tools": {
		infoname: "Smith's tools [20 gp]",
		name: "Smith's tools",
		amount: "",
		weight: 8,
		type: "artisan's tools"
	},
	"tinker's tools": {
		infoname: "Tinker's tools [50 gp]",
		name: "Tinker's tools",
		amount: "",
		weight: 10,
		type: "artisan's tools"
	},
	"weaver's tools": {
		infoname: "Weaver's tools [1 gp]",
		name: "Weaver's tools",
		amount: "",
		weight: 5,
		type: "artisan's tools"
	},
	"woodcarver's tools": {
		infoname: "Woodcarver's tools [1 gp]",
		name: "Woodcarver's tools",
		amount: "",
		weight: 5,
		type: "artisan's tools"
	},
	"disguise kit": {
		infoname: "Disguise kit [25 gp]",
		name: "Disguise kit",
		amount: "",
		weight: 3
	},
	"forgery kit": {
		infoname: "Forgery kit [15 gp]",
		name: "Forgery kit",
		amount: "",
		weight: 5
	},
	"dice": {
		infoname: "Dice [1 sp]",
		name: "Dice",
		amount: "",
		weight: "",
		type: "gaming set"
	},
	"dragonchess": {
		infoname: "Dragonchess set [1 gp]",
		name: "Dragonchess set",
		amount: "",
		weight: 0.5,
		type: "gaming set"
	},
	"playing cards": {
		infoname: "Playing cards [5 sp]",
		name: "Playing cards",
		amount: "",
		weight: "",
		type: "gaming set"
	},
	"three-dragon ante": {
		infoname: "Three-Dragon Ante set [1 gp]",
		name: "Three-Dragon Ante set",
		amount: "",
		weight: "",
		type: "gaming set"
	},
	"herbalism kit": {
		infoname: "Herbalism kit [5 gp]",
		name: "Herbalism kit",
		amount: "",
		weight: 3
	},
	"bagpipes": {
		infoname: "Bagpipes [30 gp]",
		name: "Bagpipes",
		amount: "",
		weight: 6,
		type: "musical instrument"
	},
	"drum": {
		infoname: "Drum [6 gp]",
		name: "Drum",
		amount: "",
		weight: 3,
		type: "musical instrument"
	},
	"dulcimer": {
		infoname: "Dulcimer [25 gp]",
		name: "Dulcimer",
		amount: "",
		weight: 10,
		type: "musical instrument"
	},
	"flute": {
		infoname: "Flute [2 gp]",
		name: "Flute",
		amount: "",
		weight: 1,
		type: "musical instrument"
	},
	"horn": {
		infoname: "Horn [3 gp]",
		name: "Horn",
		amount: "",
		weight: 2,
		type: "musical instrument"
	},
	"lute": {
		infoname: "Lute [35 gp]",
		name: "Lute",
		amount: "",
		weight: 2,
		type: "musical instrument"
	},
	"lyre": {
		infoname: "Lyre [30 gp]",
		name: "Lyre",
		amount: "",
		weight: 2,
		type: "musical instrument"
	},
	"pan flute": {
		infoname: "Pan flute [12 gp]",
		name: "Pan flute",
		amount: "",
		weight: 2,
		type: "musical instrument"
	},
	"shawm": {
		infoname: "Shawm [2 gp]",
		name: "Shawm",
		amount: "",
		weight: 1,
		type: "musical instrument"
	},
	"viol": {
		infoname: "Viol [30 gp]",
		name: "Viol",
		amount: "",
		weight: 1,
		type: "musical instrument"
	},
	"navigator's tools": {
		infoname: "Navigator's tools [25 gp]",
		name: "Navigator's tools",
		amount: "",
		weight: 2
	},
	"poisoner's kit": {
		infoname: "Poisoner's kit [50 gp]",
		name: "Poisoner's kit",
		amount: "",
		weight: 2
	},
	"thieves' tools": {
		infoname: "Thieves' tools [25 gp]",
		name: "Thieves' tools",
		amount: "",
		weight: 1
	}
};