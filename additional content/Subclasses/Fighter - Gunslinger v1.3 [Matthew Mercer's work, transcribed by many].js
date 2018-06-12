/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Fighter, called "Gunslinger" v1.3
				This script also adds the weapons and ammo associated with that subclass
				This is taken from the DMs Guild website (https://www.dmsguild.com/product/170778/)
				This subclass is made by Matthew Mercer
	Code by:	SoilentBrad & MorePurpleMoreBetter (update to v1.3 inspired by /u/PbFarmer)
	Date:		2017-11-29 (sheet v12.999)
	
	Please support the creator of this content (Matthew Mercer) and download his material from the DMs Guild website: https://www.dmsguild.com/browse.php?x=0&y=0&author=Matthew%20Mercer

	Note that you can't include both the v1.2 and v1.3 of the Gunslinger, because then the sheet will always use the latest version!

	The weights for the bullets are added by MorePurpleMoreBetter, as none are given in the original document
*/

var iFileName = "Fighter - Gunslinger v1.3 [Matthew Mercer's work, transcribed by many].js";
RequiredSheetVersion(12.999);

SourceList["MM:GMA"] = {
	name : "Matthew Mercer: Gunslinger Martial Archetype v1.3",
	abbreviation : "MM:GMA",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/170778/",
	date : "2018/04/18"
};

AddSubClass("fighter", "gunslinger-v1.3", {
	regExpSearch : /gunslinger/i,
	subname : "Gunslinger",
	source : ["MM:GMA", 1],
	fullname : "Gunslinger",
	abilitySave : 2,
	features : {
		"subclassfeature3" : {
			name : "Firearm Proficiency",
			source : ["MM:GMA", 2],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with firearms",
			weapons : [false, false, ["firearms"]]
		},
		"subclassfeature3.1" : {
			name : "Gunsmith",
			source : ["MM:GMA", 2],
			minlevel : 3,
			description : desc([
				"I gain proficiency with tinker's tools",
				"I can use my tinker's tool to craft ammunition and repair damaged firearms",
				"I can even use them to draw up and create new ones (DM's discretion)",
				"Some intricate and experimental firearms can only be accessed through crafting"
			]),
			toolProfs : [["Tinker's tools", "Dex"]],
			eval : "AddAction('action', 'Repair Misfire (DC 8 + misfire score)', 'Gunslinger (Gunsmith)');",
			removeeval : "RemoveAction('action', 'Repair Misfire (DC 8 + misfire score)');"
		},
		"subclassfeature3.2" : {
			name : "Grit",
			source : ["MM:GMA", 2],
			minlevel : 3,
			description : desc([
				"I gain grit points which I can spend to perform various Trick Shots with my firearms",
				"I regain 1 spent grit point when I roll a 20 on a firearm attack or score a killing blow"
			]),
			recovery : "short rest",
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));"
		},
		"subclassfeature3.3" : {
			name : "Trick Shots",
			source : ["MM:GMA", 2],
			minlevel : 3,
			description : desc([
				"Use the \"Choose Feature\" button above to add a Trick Shot to the third page",
				"A trick shot must be declared before the roll; Only one grit shot can be used per attack",
				"The save DC for trick shots, if any, is 8 + my Proficiency Bonus + my Dexterity modifier",
				"Each time I learn a new trick shot, I can also replace one I know with a new one"
			]),
			additional : levels.map(function(n) {
				if (n < 3) return "";
				return (n < 7 ? 2 : n < 10 ? 3 : n < 15 ? 4 : n < 18 ? 5 : 6) + " known";
			}),
			extraname : "Trick Shot",
			extrachoices : ["Bullying Shot", "Dazing Shot", "Deadeye Shot", "Disarming Shot", "Forceful Shot", "Piercing Shot", "Violent Shot", "Winging Shot"],
			"bullying shot" : {
				name : "Bullying Shot",
				source : ["MM:GMA", 2],
				additional : "1 grit point",
				description : "\n   " + "When making a Cha (intimidation) check, I can spend 1 grit point to gain advantage on it"
			},
			"dazing shot" : {
				name : "Dazing Shot",
				source : ["MM:GMA", 2],
				additional : "1 grit point",
				description : desc([
					"Use with firearm attack; The target takes damage and must make a Constitution save",
					"If failed, the target also has disadvantage on its attack rolls until the end of its next turn"
				])
			},
			"deadeye shot" : {
				name : "Deadeye Shot",
				source : ["MM:GMA", 2],
				additional : "1 grit point",
				description : "\n   " + "I gain advantage on one attack roll with my firearm"
			},
			"disarming shot" : {
				name : "Disarming Shot",
				source : ["MM:GMA", 2],
				additional : "1 grit point",
				description : desc([
					"Use with firearm attack; The target takes damage and must make a Strength save",
					"If failed, the target also drops a held object of my choice, which is pushed 10 ft away"
				])
			},
			"forceful shot" : {
				name : "Forceful Shot",
				source : ["MM:GMA", 2],
				additional : "1 grit point",
				description : desc([
					"Use with firearm attack; The target takes damage and must make a Strength save",
					"If failed, the target is also pushed 15 ft away from me"
				])
			},
			"piercing shot" : {
				name : "Piercing Shot",
				source : ["MM:GMA", 2],
				additional : "1 grit point",
				description : desc([
					"Use with firearm attack; After I hit a creature, I can attack every creature in line behind it",
					"I make an attack roll with disadvantage for everyone in a line directly behind the target",
					"This continues out to a range equal to the weapon's first range increment",
					"Only the initial attack roll can misfire, but has a +1 to the firearm's misfire score"
				])
			},
			"violent shot" : {
				name : "Violent Shot",
				source : ["MM:GMA", 3],
				additional : "1 or more grit points",
				description : desc([
					"Use with firearm attack; I roll one additional weapon damage die for each grit point I use",
					"In addition, each grit point used increases the firearm's misfire score by +2 for this attack"
				])
			},
			"winging shot" : {
				name : "Winging Shot",
				source : ["MM:GMA", 2],
				additional : "1 grit point",
				description : desc([
					"Use with firearm attack; The target takes damage and must make a Strength save",
					"If failed, the target is also knocked prone"
				])
			}
		},
		"subclassfeature7" : {
			name : "Quickdraw",
			source : ["MM:GMA", 2],
			minlevel : 7,
			description : desc([
				"I add my proficiency bonus to my initiative",
				"I can stow a firearm and draw another as a single object interaction on my turn"
			]),
			addMod : { type : "skill", field : "Init", mod : "Prof", text : "I add my proficiency bonus to my initiative rolls." }
		},
		"subclassfeature10" : {
			name : "Rapid Repair",
			source : ["MM:GMA", 2],
			minlevel : 10,
			description : "\n   " + "As a bonus action, I can repair a misfired (not broken) firearm by spending 1 grit point",
			additional : "1 grit point",
			action : ["bonus action", " (1 grit point)"]
		},
		"subclassfeature15" : {
			name : "Lightning Reload",
			source : ["MM:GMA", 2],
			minlevel : 15,
			description : "\n   " + "I can reload any firearm as a bonus action",
			action : ["bonus action", ""]
		},
		"subclassfeature18" : {
			name : "Vicious Intent",
			source : ["MM:GMA", 2],
			minlevel : 18,
			description : "\n   " + "My firearm attacks score a critical hit on a roll of both 19 and 20",
			calcChanges : {
				atkAdd : ["if (!isSpell && theWea && (/firearm/).test(theWea.type + theWea.list) && !CritChance) {var CritChance = 19; fields.Description += (fields.Description ? '; ' : '') + 'Crit on 19-20'; }; ", "My attacks with firearms score a critical on a to hit roll of both 19 and 20."]
			}
		},
		"subclassfeature18.1" : {
			name : "Hemorrhaging Critical",
			source : ["MM:GMA", 2],
			minlevel : 18,
			description : "\n   " + "When I score a critical hit with a firearm, the target takes additional damage" + "\n   " + "At the end of its next turn, it again suffers half of the damage from the attack"
		}
	}
});

WeaponsList["palm pistol"] = {
	regExpSearch : /^(?=.*palm)(?=.*pistol).*$/i,
	name : "Palm pistol",
	source : ["MM:GMA", 3],
	list : "firearm",
	ability : 2,
	type: "Firearms",
	damage : [1, 8, "piercing"],
	range : "40/160 ft",
	weight : 1,
	description : "Light, reload 1, misfire 1",
	abilitytodamage : true,
	ammo : "pistol bullets"
};
AmmoList["palm pistol bullets"] = {
	name : "Palm Pistol Bullets",
	source : ["MM:GMA", 3],
	weight : 0.015,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Bullets, palm pistol"
};
GearList["ammunition: bullets palm pistol (20)"] = {
	infoname : "   Palm pistol bullets (20) [2 gp]",
	source : ["MM:GMA", 3],
	name : "Bullets, palm pistol",
	amount : 20,
	weight : 0.015
};

WeaponsList["pistol-mm"] = {
	regExpSearch : /^(?=.*pistol)(?!.*automatic).*$/i,
	name : "Pistol",
	source : ["MM:GMA", 3],
	list : "firearm",
	ability : 2,
	type: "Firearms",
	damage : [1, 10, "piercing"],
	range : "60/240 ft",
	weight : 3,
	description : "Reload 4, misfire 1",
	abilitytodamage : true,
	ammo : "pistol bullets"
};
AmmoList["pistol bullets"] = {
	name : "Pistol Bullets",
	source : ["MM:GMA", 3],
	weight : 0.015,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Bullets, pistol"
};
GearList["ammunition: bullets pistol (20)"] = {
	infoname : "   Pistol bullets (20) [4 gp]",
	source : ["MM:GMA", 3],
	name : "Bullets, pistol",
	amount : 20,
	weight : 0.015
};

WeaponsList["musket-mm"] = {
	regExpSearch : /musket/i,
	name : "Musket",
	source : ["MM:GMA", 3],
	list : "firearm",
	ability : 2,
	type: "Firearms",
	damage : [1, 12, "piercing"],
	range : "140/480 ft",
	weight : 10,
	description : "Two-handed, reload 1, misfire 2",
	abilitytodamage : true,
	ammo : "musket bullets"
};
AmmoList["musket bullets"] = {
	name : "Musket Bullets",
	source : ["MM:GMA", 3],
	weight : 0.025,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Bullets, musket"
};
GearList["ammunition: bullets musket (20)"] = {
	infoname : "   Musket bullets (20) [5 gp]",
	source : ["MM:GMA", 3],
	name : "Bullets, musket",
	amount : 20,
	weight : 0.025
};

WeaponsList["pepperbox"] = {
	regExpSearch : /pepperbox/i,
	name : "Pepperbox",
	source : ["MM:GMA", 3],
	list : "firearm",
	ability : 2,
	type: "Firearms",
	damage : [1, 10, "piercing"],
	range : "80/320 ft",
	weight : 5,
	description : "Reload 6, misfire 2",
	abilitytodamage : true,
	ammo : "pepperbox bullets"
};
AmmoList["pepperbox bullets"] = {
	name : "Pepperbox Bullets",
	source : ["MM:GMA", 3],
	weight : 0.015,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Bullets, pepperbox"
};
GearList["ammunition: bullets pepperbox (20)"] = {
	infoname : "   Pepperbox bullets (20) [4 gp]",
	source : ["MM:GMA", 3],
	name : "Bullets, pepperbox",
	amount : 20,
	weight : 0.015
};

WeaponsList["blunderbuss"] = {
	regExpSearch : /blunderbuss/i,
	name : "Blunderbuss",
	source : ["MM:GMA", 3],
	list : "firearm",
	ability : 2,
	type: "Firearms",
	damage : [2, 8, "piercing"],
	range : "15/60 ft",
	weight : 10,
	description : "Reload 1, misfire 2",
	abilitytodamage : true,
	ammo : "blunderbuss shells"
};
AmmoList["blunderbuss shells"] = {
	name : "Blunderbuss Shells",
	source : ["MM:GMA", 3],
	weight : 0.2,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Blunderbuss shells"
};
GearList["ammunition: blunderbuss shells (5)"] = {
	infoname : "   Blunderbuss shells (5) [5 gp]",
	source : ["MM:GMA", 3],
	name : "Blunderbuss shells",
	amount : 5,
	weight : 0.2
};

WeaponsList["bad news"] = {
	regExpSearch : /bad news/i,
	name : "Bad News",
	source : ["MM:GMA", 3],
	list : "firearm",
	ability : 2,
	type: "Firearms",
	damage : [2, 12, "piercing"],
	range : "200/800 ft",
	weight : 25,
	description : "Two-handed, reload 1, misfire 3",
	abilitytodamage : true,
	ammo : "bad news bullets"
};
AmmoList["bad news bullets"] = {
	name : "Bad News Bullets",
	source : ["MM:GMA", 3],
	weight : 0.05,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Bullets, bad news"
};
GearList["ammunition: bullets bad news (5)"] = {
	infoname : "   Bad news bullets (5) [10 gp]",
	source : ["MM:GMA", 3],
	name : "Bullets, bad news",
	amount : 5,
	weight : 0.05
};

WeaponsList["hand mortar"] = {
	regExpSearch : /hand mortar/i,
	name : "Hand Mortar",
	source : ["MM:GMA", 3],
	list : "firearm",
	ability : 2,
	type: "Firearms",
	damage : [2, 8, "fire"],
	range : "30/60 ft",
	weight : 10,
	description : "Reload 1, misfire 3, explosive (5 ft around target Dex save or 1d8 fire damage)",
	abilitytodamage : true,
	ammo : "hand mortar grenades"
};
AmmoList["hand mortar grenades"] = {
	name : "Hand Mortar Grenades",
	source : ["MM:GMA", 3],
	weight : 0.65,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Hand mortar grenades"
};
GearList["ammunition: hand mortar grenade"] = {
	infoname : "   Hand mortar grenade [1 gp]",
	source : ["MM:GMA", 3],
	name : "Hand mortar grenade",
	amount : "",
	weight : 0.65
};
