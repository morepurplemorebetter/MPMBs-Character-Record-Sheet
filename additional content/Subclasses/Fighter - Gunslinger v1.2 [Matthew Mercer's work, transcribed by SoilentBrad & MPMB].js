/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Fighter, called "Gunslinger" v1.2
				This script also adds the weapons and ammo associated with that subclass
				This is taken from the DMs Guild website (https://www.dmsguild.com/product/170778/)
				This subclass is made by Matthew Mercer
	Code by:	SoilentBrad & MorePurpleMoreBetter
	Date:		2017-11-29 (sheet v12.999)
	
	Please support the creator of this content (Matthew Mercer) and download his material from the DMs Guild website: https://www.dmsguild.com/browse.php?x=0&y=0&author=Matthew%20Mercer

	Note that you can't include both the v1.2 and v1.3 of the Gunslinger, because then the sheet will always use the latest version!

	The weights for the bullets are added by MorePurpleMoreBetter, as none are given in the original document
*/

var iFileName = "Fighter - Gunslinger [Matthew Mercer's work, transcribed by SoilentBrad & MPMB].js";
RequiredSheetVersion(12.999);

SourceList["MM:GMA"] = {
	name : "Matthew Mercer: Gunslinger Martial Archetype v1.2",
	abbreviation : "MM:GMA",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/170778/",
	date : "2016/08/01" //estimate, I don't know the actual date v1.2 was published
};

AddSubClass("fighter", "gunslinger", {
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
			name : "Grit",
			source : ["MM:GMA", 2],
			minlevel : 3,
			description : desc([
				"I gain grit points which I can spend to perform various Trick Shots with my firearms",
				"Grit points must be spend before the roll; Only a single grit shot can be used per attack",
				"I regain 1 spent grit point when I use a firearm to score a critical hit or a killing blow"
			]),
			recovery : "short rest",
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			extraname : "Grit Shot",
			"deadeye shot" : {
				name : "Deadeye Shot",
				source : ["MM:GMA", 2],
				additional : "1 grit point",
				description : "\n   " + "I gain advantage on the next attack roll I make with a firearm this round"
			},
			"violent shot" : {
				name : "Violent Shot",
				source : ["MM:GMA", 2],
				additional : "1 or more grit points",
				description : desc([
					"For each grit point I spend, the attack gains +2 to the firearm's misfire score",
					"If the attack hits, I can roll one additional weapon damage die per grit point spent"
				])
			},
			"trick shot" : {
				name : "Trick Shot",
				source : ["MM:GMA", 2],
				additional : "1 grit point; DC 8 + Dex mod + Prof Bonus",
				description : desc([
					"I can aim for a specific body part, granted I can see that part of the target's anatomy",
					"\u2022 Head: Constitution save or it has disadv. on its attack rolls until the end of its next turn",
					"\u2022 Arms: Strength save or it drops one held item of my choice",
					"\u2022 Torso: it is pushed up to 10 feet directly away from me",
					"\u2022 Legs/Wings: Strength save or it gets knocked prone"
				])
			},
			"piercing shot" : {
				name : "Piercing Shot",
				source : ["MM:GMA", 2],
				additional : "1 grit point",
				description : desc([
					"When I hit with a firearm that deals piercing damage, I can also hit the targets behind it",
					"I make an attack roll for everyone in a line directly behind the target",
					"This continues out to a range equal to the weapon's first range increment",
					"Only the initial attack roll can misfire"
				])
			},
			eval : "ClassFeatureOptions(['fighter', 'subclassfeature3.1', 'deadeye shot', 'extra']);",
			removeeval : "ClassFeatureOptions(['fighter', 'subclassfeature3.1', 'deadeye shot', 'extra'], 'remove');",
			changeeval : "var theAdd=['fighter','subclassfeature3.1','violent shot','extra']; if(newClassLvl.fighter>=7&&(What('Extra.Notes')+What('Class Features')).toLowerCase().indexOf(theAdd[2])===-1){ClassFeatureOptions(theAdd)}else if(newClassLvl.fighter<=7&&oldClassLvl.fighter>=7){ClassFeatureOptions(theAdd,'remove')}; theAdd[2]='trick shot'; if(newClassLvl.fighter>=10&&(What('Extra.Notes')+What('Class Features')).toLowerCase().indexOf(theAdd[2])===-1){ClassFeatureOptions(theAdd)}else if(newClassLvl.fighter<=10&&oldClassLvl.fighter>=10){ClassFeatureOptions(theAdd,'remove')}; theAdd[2]='piercing shot'; if(newClassLvl.fighter>=15&&(What('Extra.Notes')+What('Class Features')).toLowerCase().indexOf(theAdd[2])===-1){ ClassFeatureOptions(theAdd); }else if(newClassLvl.fighter<=15&&oldClassLvl.fighter>=15){ ClassFeatureOptions(theAdd,'remove'); };"
		},
		"subclassfeature3.2" : {
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

WeaponsList["pistol-mm"] = {
	regExpSearch : /^(?=.*pistol)(?!.*automatic).*$/i,
	name : "Pistol",
	source : ["MM:GMA", 3],
	list : "firearm",
	ability : 2,
	type: "Firearms",
	damage : [1, 10, "piercing"],
	range : "100/400 ft",
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
	range : "200/800 ft",
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
	range : "150/600 ft",
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

WeaponsList["scattergun"] = {
	regExpSearch : /scattergun/i,
	name : "Scattergun",
	source : ["MM:GMA", 3],
	list : "firearm",
	ability : 2,
	type: "Firearms",
	damage : [1, 8, "piercing"],
	range : "15/30 ft",
	weight : 10,
	description : "Reload 2, misfire 3, scatter (attack rolls vs. all in 30 ft cone, double damage to adjacent to me)",
	abilitytodamage : true,
	ammo : "scattergun shells"
};
AmmoList["scattergun shells"] = {
	name : "Scattergun Shells",
	source : ["MM:GMA", 3],
	weight : 0.2,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Scattergun shells"
};
GearList["ammunition: scattergun shells (5)"] = {
	infoname : "   Scattergun shells (5) [5 gp]",
	source : ["MM:GMA", 3],
	name : "Scattergun shells",
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
	range : "300/1200 ft",
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
