/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a subclass for the Fighter, called "Gunslinger" v1.3
				This script also adds the weapons and ammo associated with that subclass
				This is taken from the DMs Guild website (http://www.dmsguild.com/product/170778/)
				This subclass is made by Matthew Mercer
	Code by:	SoilentBrad & MorePurpleMoreBetter
	Date:		2017-03-15 (sheet v12.88)
	
	Please support the creator of this content (Matthew Mercer) and download his material from the DMs Guild website: http://www.dmsguild.com/browse.php?x=0&y=0&author=Matthew%20Mercer
*/

ClassSubList["gunslinger"] = {
	regExpSearch : /gunslinger/i,
	subname : "Gunslinger",
	fullname : "Gunslinger",
	abilitySave : 2,
	features : {
		"subclassfeature3" : {
			name : "Firearm Proficiency",
			source : ["MM:GMA", 2],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with firearms",
			weapons : [false, false, ["firearms"]],
		},
		"subclassfeature3.1" : {
			name : "Grit",
			source : ["MM:GMA", 2],
			minlevel : 3,
			description : "\n   " + "I gain grit points which I can spend to perform various 'shot' attacks with my firearms" + "\n   " + "Grit points must be spend before the roll; Only a single grit shot can be used per attack" + "\n   " + "I regain 1 spent grit point when I use a firearm to score a critical hit or a killing blow",
			recovery : "short rest",
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, this.getField(\"Wis Mod\").value);",
			extraname : "Grit Shot",
			"deadeye shot" : {
				name : "Deadeye Shot",
				source : ["MM:GMA", 2],
				description : " [1 grit point]" + "\n   " + "I gain advantage on the next attack roll I make with a firearm this round",
			},
			"violent shot" : {
				name : "Violent Shot",
				source : ["MM:GMA", 2],
				description : " [1 or more grit points]" + "\n   " + "For each grit point I spend, the attack gains +2 to the firearm's misfire score" + "\n   " + "If the attack hits, I can roll one additional weapon damage die per grit point spent",
			},
			"trick shot" : {
				name : "Trick Shot",
				source : ["MM:GMA", 2],
				description : " [1 grit point; DC 8 + Dex mod + Prof Bonus]" + "\n   " + "I can aim for a specific body part, granted I can see that part of the target's anatomy" + "\n    - " + "Head: Constitution save or it has disadv. on its attack rolls until the end of its next turn" + "\n    - " + "Arms: Strength save or it drops one held item of my choice" + "\n    - " + "Torso: it is pushed up to 10 feet directly away from me" + "\n    - " + "Legs/Wings: Strength save or it gets knocked prone",
			},
			"piercing shot" : {
				name : "Piercing Shot",
				source : ["MM:GMA", 2],
				description : " [1 grit point]" + "\n   " + "When I hit with a firearm that deals piercing damage, I can also hit the targets behind it" + "\n   " + "I make an attack roll for everyone in a line directly behind the target" + "\n   " + "This continues out to a range equal to the weapon's first range increment" + "\n   " + "Only the initial attack roll can misfire",
			},
			eval : "ClassFeatureOptions([\"fighter\", \"subclassfeature3.1\", \"deadeye shot\", \"extra\"]);",
			removeeval : "ClassFeatureOptions([\"fighter\", \"subclassfeature3.1\", \"deadeye shot\", \"extra\"], \"remove\");",
			changeeval : "var theAdd=[\"fighter\",\"subclassfeature3.1\",\"violent shot\",\"extra\"]; if(newClassLvl.fighter>=7&&(What(\"Extra.Notes\")+What(\"Class Features\")).toLowerCase().indexOf(theAdd[2])===-1){ClassFeatureOptions(theAdd)}else if(newClassLvl.fighter<=7&&oldClassLvl.fighter>=7){ClassFeatureOptions(theAdd,\"remove\")}; theAdd[2]=\"trick shot\"; if(newClassLvl.fighter>=10&&(What(\"Extra.Notes\")+What(\"Class Features\")).toLowerCase().indexOf(theAdd[2])===-1){ClassFeatureOptions(theAdd)}else if(newClassLvl.fighter<=10&&oldClassLvl.fighter>=10){ClassFeatureOptions(theAdd,\"remove\")}; theAdd[2]=\"piercing shot\"; if(newClassLvl.fighter>=15&&(What(\"Extra.Notes\")+What(\"Class Features\")).toLowerCase().indexOf(theAdd[2])===-1){ ClassFeatureOptions(theAdd); }else if(newClassLvl.fighter<=15&&oldClassLvl.fighter>=15){ ClassFeatureOptions(theAdd,\"remove\"); };",
		},
		"subclassfeature3.2" : {
			name : "Gunsmith",
			source : ["MM:GMA", 2],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with tinker's tools" + "\n   " + "I can use my tinker's tool to craft ammunition and repair damaged firearms" + "\n   " + "I can even use them to draw up and create new ones (DM's discretion)" + "\n   " + "Some intricate and experimental firearms can only be accessed through crafting",
			eval : "AddTool(\"Tinker's tools\", \"Gunslinger (Gunsmith)\"); if (What(\"Too Text\") === \"Tool\") {Value(\"Too Text\", \"Tinker's Tools (Dex)\"); Checkbox(\"Too Prof\", true);}; AddAction(\"action\", \"Repair Misfire (DC 8 + misfire score)\", \"Gunslinger (Gunsmith)\");",
			removeeval : "RemoveTool(\"Tinker's tools\", \"Gunslinger (Gunsmith)\"); if (What(\"Too Text\").toLowerCase().indexOf(\"Tinker's Tools\") !== -1) {Value(\"Too Text\", \"Tool\"); Checkbox(\"Too Prof\", false);}; RemoveAction(\"action\", \"Repair Misfire (DC 8 + misfire score)\", \"Gunslinger (Gunsmith)\");",
		},
		"subclassfeature7" : {
			name : "Quickdraw",
			source : ["MM:GMA", 2],
			minlevel : 7,
			description : "\n   " + "I add my proficiency bonus to my initiative" + "\n   " + "I can stow a firearm and draw another as a single object interaction on my turn",
			changeeval : "if (classes.known.fighter.level >= 7) {Value(\"Init Bonus\", What(\"Proficiency Bonus\"))}",
		},
		"subclassfeature15" : {
			name : "Lightning Reload",
			source : ["MM:GMA", 2],
			minlevel : 15,
			description : "\n   " + "I can reload any firearm as a bonus action",
			action : ["bonus action", ""],
		},
		"subclassfeature18" : {
			name : "Vicious Intent",
			source : ["MM:GMA", 2],
			minlevel : 18,
			description : "\n   " + "My firearm attacks score a critical hit on a roll of both 19 and 20",
		},
		"subclassfeature18.1" : {
			name : "Hemorrhaging Critical",
			source : ["MM:GMA", 2],
			minlevel : 18,
			description : "\n   " + "When I score a critical hit with a firearm, the target takes additional damage" + "\n   " + "At the end of its next turn, it again suffers half of the damage from the attack",
		},
	},
}

ClassList["fighter"].subclasses[1].push("gunslinger");

SourceList["MM:GMA"] = {
	name : "Matthew Mercer: Gunslinger Martial Archetype",
	abbreviation : "MM:GMA",
	group : "Dungeon Masters Guild",
	url : "http://www.dmsguild.com/product/170778/"
};

WeaponsList["pistol"] = {
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
	weight : 0.015,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Bullets, pistol"
};
WeaponsList["musket"] = {
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
	weight : 0.025,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Bullets, musket"
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
	weight : 0.015,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Bullets, pepperbox"
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
	weight : 0.2,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Scattergun shells"
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
	weight : 0.05,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Bullets, bad news"
};
WeaponsList["hand mortar"] = {
	regExpSearch : /hand mortar/i,
	name : "Hand Mortar",
	source : ["MM:GMA", 3],
	list : "firearm",
	ability : 2,
	type: "Firearms",
	damage : [2, 8, "fire"],
	range : "30/600 ft",
	weight : 10,
	description : "Reload 1, misfire 3, explosive (5 ft around target Dex save or 1d8 fire damage)",
	abilitytodamage : true,
	ammo : "hand mortar grenades"
};
AmmoList["hand mortar grenades"] = {
	name : "Hand Mortar Grenades",
	weight : 0.65,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Hand mortar grenades"
};
UpdateDropdown("ammo");	
UpdateDropdown("weapon");