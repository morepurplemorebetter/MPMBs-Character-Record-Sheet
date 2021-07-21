var Base_ArmourList = {
	"unarmored" : {
		regExpSearch : /(unarmou?red|naked|nothing|bare|no.?armou?r)/i,
		name : "Unarmored",
		source : [["SRD", 62], ["P", 14]],
		ac : 10,
		addMod : true,
		list : "firstlist"
	},
	"mage armor" : {
		regExpSearch : /^(?=.*(mage|magic))(?=.*armou?r).*$/i,
		name : "Mage Armor",
		source : [["SRD", 160], ["P", 256]],
		ac : 13,
		list : "magic",
		affectsWildShape : true
	},
	"padded" : {
		regExpSearch : /^(?!.*(plate|hide))(?=.*(padding|padded)).*$/i,
		name : "Padded",
		source : [["SRD", 63], ["P", 145]],
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
		source : [["SRD", 63], ["P", 145]],
		type : "light",
		ac : 11,
		weight : 10,
		invName : "Leather armor"
	},
	"studded leather" : {
		regExpSearch : /^(?=.*(studded|studs))(?=.*leather).*$/i,
		name : "Studded Leather",
		source : [["SRD", 63], ["P", 145]],
		type : "light",
		ac : 12,
		weight : 13,
		invName : "Studded leather armor"
	},
	"hide" : {
		regExpSearch : /^(?!.*(dragon|draconic|molten bronze))(?=.*(hide|skin)).*$/i,
		name : "Hide",
		source : [["SRD", 63], ["P", 145]],
		type : "medium",
		ac : 12,
		weight : 12,
		invName : "Hide armor"
	},
	"chain shirt" : {
		regExpSearch : /^(?=.*chain)(?=.*shirt).*$/i,
		name : "Chain Shirt",
		source : [["SRD", 63], ["P", 145]],
		type : "medium",
		ac : 13,
		weight : 20,
		invName : "Chain shirt"
	},
	"scale mail" : {
		regExpSearch : /^(?=.*scale)(?=.*mail).*$/i,
		name : "Scale Mail",
		source : [["SRD", 63], ["P", 145]],
		type : "medium",
		ac : 14,
		stealthdis : true,
		weight : 45,
		invName : "Scale mail"
	},
	"breastplate" : {
		regExpSearch : /^(?=.*breast)(?=.*plate).*$/i,
		name : "Breastplate",
		source : [["SRD", 63], ["P", 145]],
		type : "medium",
		ac : 14,
		weight : 20
	},
	"half plate" : {
		regExpSearch : /^(?=.*half)(?=.*plate).*$/i,
		name : "Half Plate",
		source : [["SRD", 63], ["P", 145]],
		type : "medium",
		ac : 15,
		stealthdis : true,
		weight : 40,
		invName : "Half plate armor"
	},
	"ring mail" : {
		regExpSearch : /^(?=.*ring)(?=.*mail).*$/i,
		name : "Ring Mail",
		source : [["SRD", 63], ["P", 145]],
		type : "heavy",
		ac : 14,
		stealthdis : true,
		weight : 40,
		invName : "Ring mail"
	},
	"chain mail" : {
		regExpSearch : /^(?!.*(scale|plate|ring|shirt))(?=.*chain)(?=.*mail).*$/i,
		name : "Chain Mail",
		source : [["SRD", 63], ["P", 145]],
		type : "heavy",
		ac : 16,
		stealthdis : true,
		weight : 55,
		strReq : 13,
		invName : "Chain mail"
	},
	"splint" : {
		regExpSearch : /splint/i,
		name : "Splint",
		source : [["SRD", 63], ["P", 145]],
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
		source : [["SRD", 63], ["P", 145]],
		type : "heavy",
		ac : 18,
		stealthdis : true,
		weight : 65,
		strReq : 15,
		invName : "Plate armor"
	}
};

var Base_WeaponsList = {
	// Basic weapons
	"unarmed strike" : {
		regExpSearch : /\b(fists?|arms?|legs?|foot|feet|claws?|talons?)\b|^(?=.*unarmed)(?=.*strike).*$|^(?=.*martial)(?=.*arts).*$|^(?=.*tavern)(?=.*brawler).*$/i,
		name : "Unarmed strike",
		source : [["SRD", 66], ["P", 149]],
		ability : 1,
		type : "Natural",
		damage : [1, "", "bludgeoning"],
		range : "Melee",
		description : "",
		monkweapon : true,
		abilitytodamage : true
	},
	"club" : {
		regExpSearch : /^(?!.*(great|heavy|big))(?=.*\b(club|bian|tonfa)s?\b).*$/i,
		name : "Club",
		source : [["SRD", 66], ["P", 149]],
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
		regExpSearch : /dagger|bishou|\btamos?\b|kozuka|\btantos?\b/i,
		name : "Dagger",
		source : [["SRD", 66], ["P", 149]],
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
		regExpSearch : /^(?=.*(great|heavy|big|weida))(?=.*(club|bian|tonfa)s?\b).*$|tetsubo/i,
		name : "Greatclub",
		source : [["SRD", 66], ["P", 149]],
		list : "melee",
		ability : 1,
		type : "Simple",
		damage : [1, 8, "bludgeoning"],
		range : "Melee",
		weight : 10,
		description : "Two-handed",
		abilitytodamage : true
	},
	"handaxe" : {
		regExpSearch : /^(?=.*(light|hand|short|small|throw))(?=.*(axe|\bfu)s?\b).*$|\bonos?\b/i,
		name : "Handaxe",
		source : [["SRD", 66], ["P", 149]],
		list : "melee",
		ability : 1,
		type : "Simple",
		damage : [1, 6, "slashing"],
		range : "Melee, 20/60 ft",
		weight : 2,
		description : "Light, thrown",
		abilitytodamage : true,
		monkweapon : true
	},
	"javelin" : {
		regExpSearch : /javelin|\bmaus?\b|uchi-ne/i,
		name : "Javelin",
		source : [["SRD", 66], ["P", 149]],
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
		source : [["SRD", 66], ["P", 149]],
		list : "melee",
		ability : 1,
		type : "Simple",
		damage : [1, 4, "bludgeoning"],
		range : "Melee, 20/60 ft",
		weight : 2,
		description : "Light, thrown",
		abilitytodamage : true,
		monkweapon : true
	},
	"mace" : {
		regExpSearch : /maces?\b|\bchuis?\b|kanabo/i,
		name : "Mace",
		source : [["SRD", 66], ["P", 149]],
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
		regExpSearch : /quarterstaff|\bstaffs?\b|\bbos?\b|^gun(.?(\+|-)\d+)?$/i,
		name : "Quarterstaff",
		source : [["SRD", 66], ["P", 149]],
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
		regExpSearch : /sickle|\bkamas?\b/i,
		name : "Sickle",
		source : [["SRD", 66], ["P", 149]],
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
		regExpSearch : /^(?!.*agonizing)(?!.*eldritch)(?=.*(spear|qiang|\byaris?\b)).*$/i,
		name : "Spear",
		source : [["SRD", 66], ["P", 149]],
		list : "melee",
		ability : 1,
		type : "Simple",
		damage : [1, 6, "piercing"],
		range : "Melee, 20/60 ft",
		weight : 3,
		description : "Thrown, versatile (1d8)",
		monkweapon : true,
		abilitytodamage : true
	},
	"light crossbow" : {
		regExpSearch : /^(((?=.*light)(?=.*crossbow))|((?!.*(hand|short|great|heavy|bolt))(?=.*\bcrossbows?\b))).*$/i,
		name : "Light crossbow",
		source : [["SRD", 66], ["P", 149]],
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
		source : [["SRD", 66], ["P", 149]],
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
		regExpSearch : /^(?!.*crossbow)(((?=.*short)(?=.*bow))|((?!.*(moon|long))(?=.*\bbows?\b))).*$|hankyus?/i,
		name : "Shortbow",
		source : [["SRD", 66], ["P", 149]],
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
		source : [["SRD", 66], ["P", 149]],
		list : "ranged",
		ability : 2,
		type : "Simple",
		damage : [1, 4, "bludgeoning"],
		range : "30/120 ft",
		weight : 0.001,
		description : "Ammunition",
		abilitytodamage : true,
		ammo : "bullet"
	},
	"battleaxe" : {
		regExpSearch : /^(((?=.*battle)(?=.*(axe|\bono|\bfu)s?\b))|((?!.*(light|hand|short|small|great|heavy|throw))(?=.*\b(axe|fu|masakari)s?\b))).*$/i,
		name : "Battleaxe",
		source : [["SRD", 66], ["P", 149]],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "slashing"],
		range : "Melee",
		weight : 4,
		description : "Versatile (1d10)",
		abilitytodamage : true
	},
	"flail" : {
		regExpSearch : /flail|nunchaku/i,
		name : "Flail",
		source : [["SRD", 66], ["P", 149]],
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
		source : [["SRD", 66], ["P", 149]],
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
		regExpSearch : /^(?=.*(great|heavy|weida))(?=.*(axe|\bono|\bfu|masakari)s?\b).*$/i,
		name : "Greataxe",
		source : [["SRD", 66], ["P", 149]],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 12, "slashing"],
		range : "Melee",
		weight : 7,
		description : "Heavy, two-handed",
		abilitytodamage : true
	},
	"greatsword" : {
		regExpSearch : /^(?=.*(great|heavy))(?=.*sword).*$|changdao|nodachi/i,
		name : "Greatsword",
		source : [["SRD", 66], ["P", 149]],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [2, 6, "slashing"],
		range : "Melee",
		weight : 6,
		description : "Heavy, two-handed",
		abilitytodamage : true
	},
	"halberd" : {
		regExpSearch : /halberd|\bjis?\b|kamayari/i,
		name : "Halberd",
		source : [["SRD", 66], ["P", 149]],
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
		source : [["SRD", 66], ["P", 149]],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 12, "piercing"],
		range : "Melee",
		weight : 6,
		description : "Reach, disadvantage to attack within 5 ft, two-handed when not mounted",
		tooltip : "Special: I have disadvantage when I use a lance to attack a target within 5 feet. Also, a lance requires two hands to wield when I'm not mounted.",
		special : true,
		abilitytodamage : true
	},
	"longsword" : {
		regExpSearch : /katana|\bjians?\b|^(((?=.*long)(?=.*sword))|((?!.*(burst|light|hand|short|small|great|heavy))(?=.*\bswords?\b))).*$/i,
		name : "Longsword",
		source : [["SRD", 66], ["P", 149]],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "slashing"],
		range : "Melee",
		weight : 3,
		description : "Versatile (1d10)",
		abilitytodamage : true
	},
	"maul" : {
		regExpSearch : /^((?=.*maul)|((?=.*(great|heavy))(?=.*hammer))).*$/i,
		name : "Maul",
		source : [["SRD", 66], ["P", 149]],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [2, 6, "bludgeoning"],
		range : "Melee",
		weight : 10,
		description : "Heavy, two-handed",
		abilitytodamage : true
	},
	"morningstar" : {
		regExpSearch : /morningstar/i,
		name : "Morningstar",
		source : [["SRD", 66], ["P", 149]],
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
		regExpSearch : /^(?!.*armou?r)(?!.*\bspike)(?=.*(pike|\bmaos?\b|nagaeyari)).*$/i,
		name : "Pike",
		source : [["SRD", 66], ["P", 149]],
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
		source : [["SRD", 66], ["P", 149]],
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
		source : [["SRD", 66], ["P", 149]],
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
		source : [["SRD", 66], ["P", 149]],
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
		regExpSearch : /trident|\bchas?\b|magariyari/i,
		name : "Trident",
		source : [["SRD", 66], ["P", 149]],
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
		regExpSearch : /^(((?=.*pick)(?=.*war))|((?!.*(heavy|great|light))(?=.*\bpicks?\b))).*$|\bkuwas?\b/i,
		name : "War pick",
		source : [["SRD", 66], ["P", 149]],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "piercing"],
		range : "Melee",
		weight : 2,
		description : "",
		abilitytodamage : true
	},
	"warhammer" : {
		regExpSearch : /^(((?=.*hammer)(?=.*war))|((?!.*(light|hand|short|small|great|heavy|throw|maul))(?=.*\bhammers?\b))).*$/i,
		name : "Warhammer",
		source : [["SRD", 66], ["P", 149]],
		list : "melee",
		ability : 1,
		type : "Martial",
		damage : [1, 8, "bludgeoning"],
		range : "Melee",
		weight : 2,
		description : "Versatile (1d10)",
		abilitytodamage : true
	},
	"whip" : {
		regExpSearch : /^(?!.*thorn)(?=.*whip).*$/i,
		name : "Whip",
		source : [["SRD", 66], ["P", 149]],
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
		source : [["SRD", 66], ["P", 149]],
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
		source : [["SRD", 66], ["P", 149]],
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
		source : [["SRD", 66], ["P", 149]],
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
		source : [["SRD", 66], ["P", 149]],
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
		regExpSearch : /\bnet(ting)?s?\b/i,
		name : "Net",
		source : [["SRD", 66], ["P", 149]],
		list : "ranged",
		ability : 2,
		type : "Martial",
		damage : ["\u2015", "", "Restrained"],
		range : "5/15 ft",
		weight : 3,
		description : "Thrown, only 1 attack, up to large creature hit is restrained",
		tooltip : "Special: A Large or smaller creature hit by a net is restrained until it is freed. A net has no effect on creatures that are formless, or creatures that are Huge or larger. A creature can use its action to make a DC 10 Strength check, freeing itself or another creature within its reach on a success. Dealing 5 slashing damage to the net (AC 10) also frees the creature without harming it, ending the effect and destroying the net. When I use an action, bonus action, or reaction to attack with a net, I can make only one attack regardless of the number of attacks I can normally make.",
		special : true,
		abilitytodamage : false
	},
	// Improvised Weapons
	"improvised weapon" : {
		regExpSearch : /improvised/i,
		name : "Improvised weapon",
		source : [["SRD", 65], ["P", 147]],
		ability : 1,
		type : "Improvised Weapons",
		damage : [1, 4, "bludgeoning"],
		range : "Melee, 20/60 ft",
		description : "Damage die, type, range, etc. are at the DM's discretion",
		abilitytodamage : true
	},
	"alchemist fire" : {
		regExpSearch : /^(?=.*alchemist)(?=.*fire).*$/i,
		name : "Alchemist's Fire",
		source : [["SRD", 66], ["P", 148]],
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
		source : [["SRD", 66], ["P", 148]],
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
		source : [["SRD", 67], ["P", 151]],
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
	"burning torch" : {
		regExpSearch : /^(?=.*torch)(?=.*burning).*$/i,
		name : "Torch, Burning",
		source : [["SRD", 68], ["P", 153]],
		list : "improvised",
		ability : 1,
		type : "Improvised Weapons",
		damage : [1, "", "fire"],
		range : "Melee",
		weight : 1,
		description : "Only does damage while burning",
		abilitytodamage : false
	},
	// Cantrips
	"spell attack" : {
		regExpSearch : /^(?=.*spell)(?=.*attack).*$/i,
		name : "Spell attack",
		source : [["SRD", 103], ["P", 205]],
		ability : 0,
		type : "Spell",
		damage : ["", "", ""],
		range : "",
		description : "",
		abilitytodamage : false
	},
	"acid splash" : {
		regExpSearch : /^(?=.*acid)(?=.*splash).*$/i,
		name : "Acid Splash",
		source : [["SRD", 114], ["P", 211]],
		list : "spell",
		ability : 4,
		type : "Cantrip",
		damage : ["C", 6, "acid"],
		range : "60 ft",
		description : "Dex save, success - no damage; 1 or 2 creatures within 5 ft of each other",
		abilitytodamage : false,
		dc : true
	},
	"chill touch" : {
		regExpSearch : /^(?=.*chill)(?=.*touch).*$/i,
		name : "Chill Touch",
		source : [["SRD", 124], ["P", 221]],
		list : "spell",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 8, "necrotic"],
		range : "120 ft",
		description : "Target can't regain HP; Undead dis. on attacks vs. me until my next turn",
		abilitytodamage : false
	},
	"eldritch blast" : {
		regExpSearch : /(agonizing|eldritch|repelling).(spear|blast)/i,
		name : "Eldritch Blast",
		source : [["SRD", 139], ["P", 237]],
		list : "spell",
		ability : 6,
		type : "Cantrip",
		damage : ["C\xD7" + 1, 10, "force"],
		range : "120 ft",
		description : "Each d10 is a separate beam requiring separate rolls",
		abilitytodamage : false
	},
	"fire bolt" : {
		regExpSearch : /^(?=.*fire)(?=.*bolt).*$/i,
		name : "Fire Bolt",
		source : [["SRD", 144], ["P", 241]],
		list : "spell",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 10, "fire"],
		range : "120 ft",
		description : "Unattended flammable objects ignite",
		abilitytodamage : false
	},
	"poison spray" : {
		regExpSearch : /^(?=.*poison)(?=.*spray).*$/i,
		name : "Poison Spray",
		source : [["SRD", 169], ["P", 266]],
		list : "spell",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 12, "poison"],
		range : "10 ft",
		description : "Con save, success - no damage; 1 creature",
		abilitytodamage : false,
		dc : true
	},
	"produce flame" : {
		regExpSearch : /^(?=.*produce)(?=.*flame).*$/i,
		name : "Produce Flame",
		source : [["SRD", 172], ["P", 269]],
		list : "spell",
		ability : 5,
		type : "Cantrip",
		damage : ["C", 8, "fire"],
		range : "30 ft",
		description : "10-ft radius bright light and 10-ft radius dim light until thrown",
		abilitytodamage : false
	},
	"ray of frost" : {
		regExpSearch : /^(?=.*ray)(?=.*frost).*$/i,
		name : "Ray of Frost",
		source : [["SRD", 174], ["P", 271]],
		list : "spell",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 8, "cold"],
		range : "60 ft",
		description : "Target -10 ft speed until start of my next turn",
		abilitytodamage : false
	},
	"sacred flame" : {
		regExpSearch : /^(?=.*sacred)(?=.*flame).*$/i,
		name : "Sacred Flame",
		source : [["SRD", 176], ["P", 272]],
		list : "spell",
		ability : 5,
		type : "Cantrip",
		damage : ["C", 8, "radiant"],
		range : "60 ft",
		description : "Dex save, no bonus from cover, success - no damage; 1 creature",
		abilitytodamage : false,
		dc : true
	},
	"shillelagh" : {
		baseWeapon : "quarterstaff",
		regExpSearch : /shillelagh/i,
		name : "Shillelagh",
		source : [["SRD", 179], ["P", 275]],
		list : "spell",
		ability : 5,
		type : "Simple",
		damage : [1, 8, "bludgeoning"],
		range : "Melee",
		description : "Imbued club or quarterstaff; Counts as a magical weapon",
		monkweapon : true,
		abilitytodamage : true
	},
	"shocking grasp" : {
		regExpSearch : /^(?=.*shocking)(?=.*grasp).*$/i,
		name : "Shocking Grasp",
		source : [["SRD", 179], ["P", 275]],
		list : "spell",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 8, "lightning"],
		range : "Melee",
		description : "Advantage if target is wearing metal armor, target cannot take reactions until its next turn",
		abilitytodamage : false
	},
	"vicious mockery" : {
		regExpSearch : /^(?=.*vicious)(?=.*mockery).*$/i,
		name : "Vicious Mockery",
		source : [["SRD", 189], ["P", 285]],
		list : "spell",
		ability : 6,
		type : "Cantrip",
		damage : ["C", 4, "psychic"],
		range : "60 ft",
		description : "Wis save, success - no damage, fail - also disadv. on next attack roll in next turn; 1 creature",
		abilitytodamage : false,
		dc : true
	}
};

//A list of all types of 'ammo' for the ammunition section on the first page
var Base_AmmoList = {
	"arrow" : {
		name : "Arrows",
		source : [["SRD", 69], ["P", 150]],
		weight : 0.05,
		icon : "Arrows"
	},
	"bolt" : {
		name : "Bolts",
		weight : 0.075,
		source : [["SRD", 69], ["P", 150]],
		icon : "Arrows",
		invName : "Crossbow bolts"
	},
	"bullet" : {
		name : "Bullets",
		weight : 0.075,
		source : [["SRD", 69], ["P", 150]],
		icon : "Bullets",
		invName : "Sling bullets",
		alternatives : [/^(?=.*bullet)(?=.*sling).*$/i]
	},
	"dagger" : {
		name : "Daggers",
		source : [["SRD", 66], ["P", 149]],
		weight : 1,
		icon : "Daggers"
	},
	"dart" : {
		name : "Darts",
		source : [["SRD", 66], ["P", 149]],
		weight : 0.25,
		icon : "Arrows"
	},
	"flask" : {
		name : "Flasks (1 pint)",
		source : [["SRD", 69], ["P", 150]],
		weight : 1,
		icon : "Flasks"
	},
	"handaxe" : {
		name : "Handaxes",
		source : [["SRD", 66], ["P", 149]],
		weight : 2,
		icon : "Axes",
		alternatives : ["axe"]
	},
	"javelin" : {
		name : "Javelins",
		source : [["SRD", 66], ["P", 149]],
		weight : 2,
		icon : "Spears"
	},
	"light hammer" : {
		name : "Light Hammers",
		source : [["SRD", 66], ["P", 149]],
		weight : 2,
		icon : "Hammers",
		alternatives : ["hammer"]
	},
	"needle" : {
		name : "Needles",
		source : [["SRD", 66], ["P", 149]],
		weight : 0.02,
		icon : "Bullets",
		invName : "Blowgun needles"
	},
	"spear" : {
		name : "Spears",
		source : [["SRD", 66], ["P", 149]],
		weight : 3,
		icon : "Spears"
	},
	"trident" : {
		name : "Tridents",
		source : [["SRD", 66], ["P", 149]],
		weight : 4,
		icon : "Spears"
	},
	"vial" : {
		name : "Vials (4 ounces)",
		source : [["SRD", 69], ["P", 150]],
		weight : 0.25,
		icon : "Vials"
	},
	"alchemist fire" : {
		name : "Alchemist's Fire, flasks",
		source : [["SRD", 66], ["P", 148]],
		weight : 1,
		icon : "Flasks",
		invName : "Alchemist's fire, flasks of",
		alternatives : [/^(?=.*alchemist)(?=.*fire).*$/i]
	},
	"vials of acid" : {
		name : "Vials of Acid",
		source : [["SRD", 66], ["P", 148]],
		weight : 1,
		icon : "Vials",
		invName : "Acid, vials of",
		alternatives : [/^(?=.*acid)(?=.*vial).*$/i]
	},
	"holy water" : {
		name : "Holy Water, flasks",
		source : [["SRD", 67], ["P", 151]],
		weight : 1,
		icon : "Flasks",
		invName : "Holy Water, flasks of",
		alternatives : [/^(?=.*holy)(?=.*water).*$/i]
	}
};

var Base_PacksList = {
	burglar : {
		name : "Burglar's pack (16 gp)",
		source : [["SRD", 70], ["P", 151]],
		items : [
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
		]
	},
	diplomat : {
		name : "Diplomat's pack (39 gp)",
		source : [["SRD", 70], ["P", 151]],
		items : [
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
		]
	},
	dungeoneer : {
		name : "Dungeoneer's pack (12 gp)",
		source : [["SRD", 70], ["P", 151]],
		items : [
			["Backpack, with:", "", 5],
			["Crowbar", "", 5],
			["Hammer", "", 3],
			["Pitons", 10, .25],
			["Torches", 10, 1],
			["Tinderbox", "", 1],
			["Rations, days of", 10, 2],
			["Waterskin", "", 5],
			["Hempen rope, feet of", 50, 0.2]
		]
	},
	entertainer : {
		name : "Entertainer's pack (40 gp)",
		source : [["SRD", 70], ["P", 151]],
		items : [
			["Backpack, with:", "", 5],
			["Bedroll", "", 7],
			["Costumes", 2, 4],
			["Candles", 5, ""],
			["Rations, days of", 5, 2],
			["Waterskin", "", 5],
			["Disguise kit", "", 3]
		]
	},
	explorer : {
		name : "Explorer's pack (10 gp)",
		source : [["SRD", 70], ["P", 151]],
		items : [
			["Backpack, with:", "", 5],
			["Bedroll", "", 7],
			["Mess kit", "", 1],
			["Tinderbox", "", 1],
			["Torches", 10, 1],
			["Rations, days of", 10, 2],
			["Waterskin", "", 5],
			["Hempen rope, feet of", 50, 0.2]
		]
	},
	priest : {
		name : "Priest's pack (19 gp)",
		source : [["SRD", 70], ["P", 151]],
		items : [
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
		]
	},
	scholar : {
		name : "Scholar's pack (40 gp)",
		source : [["SRD", 70], ["P", 151]],
		items : [
			["Backpack, with:", "", 5],
			["Book of lore", "", 5],
			["Ink, 1 ounce bottle of", "", ""],
			["Ink pen", "", ""],
			["Parchment, sheets of", 10, ""],
			["Little bag of sand", "", 1],
			["Small knife", "", 0.25]
		]
	}
};

var Base_GearList = {
	"abacus" : {
		infoname : "Abacus [2 gp]",
		name : "Abacus",
		amount : "",
		weight : 2
	},
	"acid (vial)" : {
		infoname : "Acid (vial) [25 gp]",
		name : "Acid, vials of",
		amount : "",
		weight : 1
	},
	"alchemist's fire (flask)" : {
		infoname : "Alchemist's fire (flask) [50 gp]",
		name : "Alchemist's fire, flasks of",
		amount : "",
		weight : 1
	},
	"animal feed (1 day)" : {
		infoname : "Animal feed (1 day) [5 cp]",
		name : "Animal feed, days of",
		amount : 1,
		weight : 10
	},
	"arrows (20)" : {
		infoname : "Arrows (20) [1 gp]",
		name : "Arrows",
		amount : 20,
		weight : 0.05,
		type : "ammunition"
	},
	"blowgun needles (50)" : {
		infoname : "Blowgun needles (50) [1 gp]",
		name : "Blowgun needles",
		amount : 50,
		weight : 0.02,
		type : "ammunition"
	},
	"crossbow bolts (20)" : {
		infoname : "Crossbow bolts (20) [1 gp]",
		name : "Crossbow bolts",
		amount : 20,
		weight : 0.075,
		type : "ammunition"
	},
	"sling bullets (20)" : {
		infoname : "Sling bullets (20) [4 cp]",
		name : "Sling bullets",
		amount : 20,
		weight : 0.075,
		type : "ammunition"
	},
	"antitoxin (vial)" : {
		infoname : "Antitoxin (vial) [50 gp]",
		name : "Antitoxin, vials of",
		amount : "",
		weight : ""
	},
	"crystal" : {
		infoname : "Crystal [10 gp]",
		name : "Crystal arcane focus",
		amount : "",
		weight : 1,
		type : "arcane focus"
	},
	"orb" : {
		infoname : "Orb [20 gp]",
		name : "Orb arcane focus",
		amount : "",
		weight : 3,
		type : "arcane focus"
	},
	"rod" : {
		infoname : "Rod [10 gp]",
		name : "Rod arcane focus",
		amount : "",
		weight : 2,
		type : "arcane focus"
	},
	"staff" : {
		infoname : "Staff [5 gp]",
		name : "Staff arcane focus",
		amount : "",
		weight : 4,
		type : "arcane focus"
	},
	"wand" : {
		infoname : "Wand [10 gp]",
		name : "Wand arcane focus",
		amount : "",
		weight : 1,
		type : "arcane focus"
	},
	"backpack" : {
		infoname : "Backpack [2 gp]",
		name : "Backpack",
		amount : "",
		weight : 5
	},
	"ball bearings (bag of 1,000)" : {
		infoname : "Ball bearings (bag of 1,000) [1 gp]",
		name : "Bag of 1000 ball bearings",
		amount : "",
		weight : 2
	},
	"barrel" : {
		infoname : "Barrel [2 gp]",
		name : "Barrel",
		amount : "",
		weight : 70
	},
	"basket" : {
		infoname : "Basket [4 sp]",
		name : "Basket",
		amount : "",
		weight : 2
	},
	"bedroll" : {
		infoname : "Bedroll [1 gp]",
		name : "Bedroll",
		amount : "",
		weight : 7
	},
	"bell" : {
		infoname : "Bell [1 gp]",
		name : "Bell",
		amount : "",
		weight : ""
	},
	"bit and bridle" : {
		infoname : "Bit and bridle [2 gp]",
		name : "Bit and bridle",
		amount : "",
		weight : 1
	},
	"blanket" : {
		infoname : "Blanket [5 sp]",
		name : "Blanket",
		amount : "",
		weight : 3
	},
	"block and tackle" : {
		infoname : "Block and tackle [1 gp]",
		name : "Block and tackle",
		amount : "",
		weight : 5
	},
	"book" : {
		infoname : "Book [25 gp]",
		name : "Book",
		amount : "",
		weight : 5
	},
	"bottle, glass" : {
		infoname : "Bottle, glass [2 gp]",
		name : "Glass bottle",
		amount : "",
		weight : 2
	},
	"bucket" : {
		infoname : "Bucket [5 sp]",
		name : "Bucket",
		amount : "",
		weight : 2
	},
	"caltrops" : {
		infoname : "Caltrops [1 gp]",
		name : "Caltrops",
		amount : 20,
		weight : 0.1
	},
	"candle" : {
		infoname : "Candle [1 cp]",
		name : "Candle",
		amount : "",
		weight : ""
	},
	"case, crossbow bolt" : {
		infoname : "Case, crossbow bolt [1 gp]",
		name : "Crossbow bolt case",
		amount : "",
		weight : 1
	},
	"case, map or scroll" : {
		infoname : "Case, map or scroll [1 gp]",
		name : "Map or scroll case",
		amount : "",
		weight : 1
	},
	"chain (10 feet)" : {
		infoname : "Chain (10 feet) [5 gp]",
		name : "Chain, feet of",
		amount : 10,
		weight : 1
	},
	"chalk (1 piece)" : {
		infoname : "Chalk (1 piece) [1 cp]",
		name : "Chalk, pieces of",
		amount : "",
		weight : ""
	},
	"chest" : {
		infoname : "Chest [5 gp]",
		name : "Chest",
		amount : "",
		weight : 25
	},
	"climber's kit" : {
		infoname : "Climber's kit [25 gp]",
		name : "Climber's kit",
		amount : "",
		weight : 12
	},
	"common" : {
		infoname : "Common [5 sp]",
		name : "Common clothes",
		amount : "",
		weight : 3,
		type : "clothes"
	},
	"costume" : {
		infoname : "Costume [5 gp]",
		name : "Costume clothes",
		amount : "",
		weight : 4,
		type : "clothes"
	},
	"fine" : {
		infoname : "Fine [15 gp]",
		name : "Fine clothes",
		amount : "",
		weight : 6,
		type : "clothes"
	},
	"traveler's" : {
		infoname : "Traveler's [2 gp]",
		name : "Traveler's clothes",
		amount : "",
		weight : 4,
		type : "clothes"
	},
	"component pouch" : {
		infoname : "Component pouch [25 gp]",
		name : "Component pouch",
		amount : "",
		weight : 2
	},
	"crowbar" : {
		infoname : "Crowbar [2 gp]",
		name : "Crowbar",
		amount : "",
		weight : 5
	},
	"sprig of mistletoe" : {
		infoname : "Sprig of mistletoe [1 gp]",
		name : "Sprig of mistletoe druidic focus",
		amount : "",
		weight : "",
		type : "druidic focus"
	},
	"totem" : {
		infoname : "Totem [1 gp]",
		name : "Totem druidic focus",
		amount : "",
		weight : "",
		type : "druidic focus"
	},
	"wooden staff" : {
		infoname : "Wooden staff [5 gp]",
		name : "Wooden staff druidic focus",
		amount : "",
		weight : 4,
		type : "druidic focus"
	},
	"yew wand" : {
		infoname : "Yew wand  [10 gp]",
		name : "Yew wand druidic focus",
		amount : "",
		weight : 1,
		type : "druidic focus"
	},
	"fishing tackle" : {
		infoname : "Fishing tackle [1 gp]",
		name : "Fishing tackle",
		amount : "",
		weight : 4
	},
	"flask or tankard" : {
		infoname : "Flask or tankard [2 cp]",
		name : "Flask or tankard",
		amount : "",
		weight : 1
	},
	"grappling hook" : {
		infoname : "Grappling hook [2 gp]",
		name : "Grappling hook",
		amount : "",
		weight : 4
	},
	"hammer" : {
		infoname : "Hammer [1 gp]",
		name : "Hammer",
		amount : "",
		weight : 3
	},
	"hammer, sledge" : {
		infoname : "Hammer, sledge [2 gp]",
		name : "Sledge hammer",
		amount : "",
		weight : 10
	},
	"healer's kit" : {
		infoname : "Healer's kit [5 gp]",
		name : "Healer's kit",
		amount : "",
		weight : 3
	},
	"amulet" : {
		infoname : "Amulet [5 gp]",
		name : "Amulet holy symbol",
		amount : "",
		weight : 1,
		type : "holy symbol"
	},
	"emblem" : {
		infoname : "Emblem [5 gp]",
		name : "Emblem holy symbol",
		amount : "",
		weight : "",
		type : "holy symbol"
	},
	"reliquary" : {
		infoname : "Reliquary [5 gp]",
		name : "Reliquary holy symbol",
		amount : "",
		weight : 2,
		type : "holy symbol"
	},
	"holy water (flask)" : {
		infoname : "Holy water (flask) [25 gp]",
		name : "Holy water, flasks of",
		amount : "",
		weight : 1
	},
	"hourglass" : {
		infoname : "Hourglass [25 gp]",
		name : "Hourglass",
		amount : "",
		weight : 1
	},
	"hunting trap" : {
		infoname : "Hunting trap [5 gp]",
		name : "Hunting trap",
		amount : "",
		weight : 25
	},
	"ink (1 ounce bottle)" : {
		infoname : "Ink (1 ounce bottle) [10 gp]",
		name : "Ink, 1 ounce bottle of",
		amount : "",
		weight : ""
	},
	"ink pen" : {
		infoname : "Ink pen [2 cp]",
		name : "Ink pen",
		amount : "",
		weight : ""
	},
	"jug or pitcher" : {
		infoname : "Jug or pitcher [2 cp]",
		name : "Jug or pitcher",
		amount : "",
		weight : 4
	},
	"small knife" : {
		infoname : "Small Knife [1 sp]",
		name : "Small Knife",
		amount : "",
		weight : 0.25
	},
	"ladder (10-foot)" : {
		infoname : "Ladder (10-foot) [1 sp]",
		name : "10-foot ladder",
		amount : "",
		weight : 25
	},
	"lamp" : {
		infoname : "Lamp [5 sp]",
		name : "Lamp",
		amount : "",
		weight : 1
	},
	"lantern, bullseye" : {
		infoname : "Lantern, bullseye [10 gp]",
		name : "Bullseye lantern",
		amount : "",
		weight : 2
	},
	"lantern, hooded" : {
		infoname : "Lantern, hooded [5 gp]",
		name : "Hooded lantern",
		amount : "",
		weight : 2
	},
	"lock" : {
		infoname : "Lock [10 gp]",
		name : "Lock",
		amount : "",
		weight : 1
	},
	"magnifying glass" : {
		infoname : "Magnifying glass [100 gp]",
		name : "Magnifying glass",
		amount : "",
		weight : ""
	},
	"manacles" : {
		infoname : "Manacles [2 gp]",
		name : "Manacles",
		amount : "",
		weight : 6
	},
	"mess kit" : {
		infoname : "Mess kit [2 sp]",
		name : "Mess kit",
		amount : "",
		weight : 1
	},
	"mirror, steel" : {
		infoname : "Mirror, steel [5 gp]",
		name : "Steel mirror",
		amount : "",
		weight : 0.5
	},
	"oil (flask)" : {
		infoname : "Oil (flask) [1 sp]",
		name : "Oil, flasks of",
		amount : "",
		weight : 1
	},
	"paper (one sheet)" : {
		infoname : "Paper (one sheet) [2 sp]",
		name : "Paper, sheets of",
		amount : "",
		weight : ""
	},
	"parchment (one sheet)" : {
		infoname : "Parchment (one sheet) [1 sp]",
		name : "Parchment, sheets of",
		amount : "",
		weight : ""
	},
	"perfume (vial)" : {
		infoname : "Perfume (vial) [5 gp]",
		name : "Perfume, vials of",
		amount : "",
		weight : ""
	},
	"pick, miner's" : {
		infoname : "Pick, miner's [2 gp]",
		name : "Miner's pick",
		amount : "",
		weight : 10
	},
	"piton" : {
		infoname : "Piton [5 cp]",
		name : "Piton",
		amount : "",
		weight : 0.25
	},
	"poison, basic (vial)" : {
		infoname : "Poison, basic (vial) [100 gp]",
		name : "Basic poison, vials of",
		amount : "",
		weight : ""
	},
	"pole (10-foot)" : {
		infoname : "Pole (10-foot) [5 cp]",
		name : "10-foot pole",
		amount : "",
		weight : 7
	},
	"pot, iron" : {
		infoname : "Pot, iron [2 gp]",
		name : "Iron pot",
		amount : "",
		weight : 10
	},
	"potion of healing" : {
		infoname : "Potion of healing [50 gp]",
		name : "Potion of healing",
		amount : "",
		weight : 0.5
	},
	"pouch" : {
		infoname : "Pouch [5 sp]",
		name : "Pou\uFEFFch",
		amount : "",
		weight : 1
	},
	"quiver" : {
		infoname : "Quiver [1 gp]",
		name : "Quiver",
		amount : "",
		weight : 1
	},
	"ram, portable" : {
		infoname : "Ram, portable [4 gp]",
		name : "Portable ram",
		amount : "",
		weight : 35
	},
	"rations (1 day)" : {
		infoname : "Rations (1 day) [5 sp]",
		name : "Rations, days of",
		amount : 1,
		weight : 2
	},
	"robes" : {
		infoname : "Robes [1 gp]",
		name : "Robes",
		amount : "",
		weight : 4
	},
	"rope, hempen (50 feet)" : {
		infoname : "Rope, hempen (50 feet) [1 gp]",
		name : "Hempen rope, feet of",
		amount : 50,
		weight : 0.2
	},
	"rope, silk (50 feet)" : {
		infoname : "Rope, silk (50 feet) [10 gp]",
		name : "Silk rope, feet of",
		amount : 50,
		weight : 0.1
	},
	"sack" : {
		infoname : "Sack [1 cp]",
		name : "Sack",
		amount : "",
		weight : 0.5
	},
	"exotic" : {
		infoname : "Exotic [60 gp]",
		name : "Exotic saddle",
		amount : "",
		weight : 40,
		type : "saddle"
	},
	"military" : {
		infoname : "Military [20 gp]",
		name : "Military saddle",
		amount : "",
		weight : 30,
		type : "saddle"
	},
	"pack" : {
		infoname : "Pack [5 gp]",
		name : "Pack saddle",
		amount : "",
		weight : 15,
		type : "saddle"
	},
	"riding" : {
		infoname : "Riding [10 gp]",
		name : "Riding saddle",
		amount : "",
		weight : 25,
		type : "saddle"
	},
	"saddlebags" : {
		infoname : "Saddlebags [4 gp]",
		name : "Saddlebags",
		amount : "",
		weight : 8
	},
	"scale, merchant's" : {
		infoname : "Scale, merchant's [5 gp]",
		name : "Merchant's scale",
		amount : "",
		weight : 3
	},
	"sealing wax" : {
		infoname : "Sealing wax [5 cp]",
		name : "Sealing wax",
		amount : "",
		weight : ""
	},
	"shovel" : {
		infoname : "Shovel [2 gp]",
		name : "Shovel",
		amount : "",
		weight : 5
	},
	"signal whistle" : {
		infoname : "Signal whistle [5 cp]",
		name : "Signal whistle",
		amount : "",
		weight : ""
	},
	"signet ring" : {
		infoname : "Signet ring [5 gp]",
		name : "Signet ring",
		amount : "",
		weight : ""
	},
	"soap" : {
		infoname : "Soap [2 cp]",
		name : "Soap",
		amount : "",
		weight : ""
	},
	"spellbook" : {
		infoname : "Spellbook [50 gp]",
		name : "Spellbook",
		amount : "",
		weight : 3
	},
	"spikes, iron (10)" : {
		infoname : "Spikes, iron (10) [1 gp]",
		name : "Iron spike",
		amount : 10,
		weight : 0.5
	},
	"spyglass" : {
		infoname : "Spyglass [1000 gp]",
		name : "Spyglass",
		amount : "",
		weight : 1
	},
	"tent, two-person" : {
		infoname : "Tent, two-person [2 gp]",
		name : "Two-person tent",
		amount : "",
		weight : 20
	},
	"tinderbox" : {
		infoname : "Tinderbox [5 sp]",
		name : "Tinderbox",
		amount : "",
		weight : 1
	},
	"torch" : {
		infoname : "Torch [1 cp]",
		name : "Torch",
		amount : "",
		weight : 1
	},
	"vial" : {
		infoname : "Vial [1 gp]",
		name : "Vial",
		amount : "",
		weight : ""
	},
	"waterskin" : {
		infoname : "Waterskin [2 sp]",
		name : "Waterskin",
		amount : "",
		weight : 5
	},
	"whetstone" : {
		infoname : "Whetstone [1 cp]",
		name : "Whetstone",
		amount : "",
		weight : 1
	}
};

var Base_ToolsList = {
	"alchemist's supplies" : {
		infoname : "Alchemist's supplies [50 gp]",
		name : "Alchemist's supplies",
		amount : "",
		weight : 8,
		type : "artisan's tools"
	},
	"brewer's supplies" : {
		infoname : "Brewer's supplies [20 gp]",
		name : "Brewer's supplies",
		amount : "",
		weight : 9,
		type : "artisan's tools"
	},
	"calligrapher's supplies" : {
		infoname : "Calligrapher's supplies [10 gp]",
		name : "Calligrapher's supplies",
		amount : "",
		weight : 5,
		type : "artisan's tools"
	},
	"carpenter's tools" : {
		infoname : "Carpenter's tools [8 gp]",
		name : "Carpenter's tools",
		amount : "",
		weight : 6,
		type : "artisan's tools"
	},
	"cartographer's tools" : {
		infoname : "Cartographer's tools [15 gp]",
		name : "Cartographer's tools",
		amount : "",
		weight : 6,
		type : "artisan's tools"
	},
	"cobbler's tools" : {
		infoname : "Cobbler's tools [5 gp]",
		name : "Cobbler's tools",
		amount : "",
		weight : 5,
		type : "artisan's tools"
	},
	"cook's utensils" : {
		infoname : "Cook's utensils [1 gp]",
		name : "Cook's utensils",
		amount : "",
		weight : 8,
		type : "artisan's tools"
	},
	"glassblower's tools" : {
		infoname : "Glassblower's tools [30 gp]",
		name : "Glassblower's tools",
		amount : "",
		weight : 5,
		type : "artisan's tools"
	},
	"jeweler's tools" : {
		infoname : "Jeweler's tools [25 gp]",
		name : "Jeweler's tools",
		amount : "",
		weight : 2,
		type : "artisan's tools"
	},
	"leatherworker's tools" : {
		infoname : "Leatherworker's tools [5 gp]",
		name : "Leatherworker's tools",
		amount : "",
		weight : 5,
		type : "artisan's tools"
	},
	"mason's tools" : {
		infoname : "Mason's tools [10 gp]",
		name : "Mason's tools",
		amount : "",
		weight : 8,
		type : "artisan's tools"
	},
	"painter's supplies" : {
		infoname : "Painter's supplies [10 gp]",
		name : "Painter's supplies",
		amount : "",
		weight : 5,
		type : "artisan's tools"
	},
	"potter's tools" : {
		infoname : "Potter's tools [10 gp]",
		name : "Potter's tools",
		amount : "",
		weight : 3,
		type : "artisan's tools"
	},
	"smith's tools" : {
		infoname : "Smith's tools [20 gp]",
		name : "Smith's tools",
		amount : "",
		weight : 8,
		type : "artisan's tools"
	},
	"tinker's tools" : {
		infoname : "Tinker's tools [50 gp]",
		name : "Tinker's tools",
		amount : "",
		weight : 10,
		type : "artisan's tools"
	},
	"weaver's tools" : {
		infoname : "Weaver's tools [1 gp]",
		name : "Weaver's tools",
		amount : "",
		weight : 5,
		type : "artisan's tools"
	},
	"woodcarver's tools" : {
		infoname : "Woodcarver's tools [1 gp]",
		name : "Woodcarver's tools",
		amount : "",
		weight : 5,
		type : "artisan's tools"
	},
	"disguise kit" : {
		infoname : "Disguise kit [25 gp]",
		name : "Disguise kit",
		amount : "",
		weight : 3
	},
	"forgery kit" : {
		infoname : "Forgery kit [15 gp]",
		name : "Forgery kit",
		amount : "",
		weight : 5
	},
	"dice set" : {
		infoname : "Dice set [1 sp]",
		name : "Dice set",
		amount : "",
		weight : "",
		type : "gaming set"
	},
	"dragonchess set" : {
		infoname : "Dragonchess set [1 gp]",
		name : "Dragonchess set",
		amount : "",
		weight : 0.5,
		type : "gaming set"
	},
	"playing card set" : {
		infoname : "Playing card set [5 sp]",
		name : "Playing card set",
		amount : "",
		weight : "",
		type : "gaming set"
	},
	"three-dragon ante set" : {
		infoname : "Three-Dragon Ante set [1 gp]",
		name : "Three-Dragon Ante set",
		amount : "",
		weight : "",
		type : "gaming set"
	},
	"herbalism kit" : {
		infoname : "Herbalism kit [5 gp]",
		name : "Herbalism kit",
		amount : "",
		weight : 3
	},
	"bagpipes" : {
		infoname : "Bagpipes [30 gp]",
		name : "Bagpipes",
		amount : "",
		weight : 6,
		type : "musical instrument"
	},
	"drum" : {
		infoname : "Drum [6 gp]",
		name : "Drum",
		amount : "",
		weight : 3,
		type : "musical instrument"
	},
	"dulcimer" : {
		infoname : "Dulcimer [25 gp]",
		name : "Dulcimer",
		amount : "",
		weight : 10,
		type : "musical instrument"
	},
	"flute" : {
		infoname : "Flute [2 gp]",
		name : "Flute",
		amount : "",
		weight : 1,
		type : "musical instrument"
	},
	"horn" : {
		infoname : "Horn [3 gp]",
		name : "Horn",
		amount : "",
		weight : 2,
		type : "musical instrument"
	},
	"lute" : {
		infoname : "Lute [35 gp]",
		name : "Lute",
		amount : "",
		weight : 2,
		type : "musical instrument"
	},
	"lyre" : {
		infoname : "Lyre [30 gp]",
		name : "Lyre",
		amount : "",
		weight : 2,
		type : "musical instrument"
	},
	"pan flute" : {
		infoname : "Pan flute [12 gp]",
		name : "Pan flute",
		amount : "",
		weight : 2,
		type : "musical instrument"
	},
	"shawm" : {
		infoname : "Shawm [2 gp]",
		name : "Shawm",
		amount : "",
		weight : 1,
		type : "musical instrument"
	},
	"viol" : {
		infoname : "Viol [30 gp]",
		name : "Viol",
		amount : "",
		weight : 1,
		type : "musical instrument"
	},
	"navigator's tools" : {
		infoname : "Navigator's tools [25 gp]",
		name : "Navigator's tools",
		amount : "",
		weight : 2
	},
	"poisoner's kit" : {
		infoname : "Poisoner's kit [50 gp]",
		name : "Poisoner's kit",
		amount : "",
		weight : 2
	},
	"thieves' tools" : {
		infoname : "Thieves' tools [25 gp]",
		name : "Thieves' tools",
		amount : "",
		weight : 1
	}
};