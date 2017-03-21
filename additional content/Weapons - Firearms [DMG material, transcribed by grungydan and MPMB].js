/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Weapons
	Effect:		This script adds the firearms (renaissance, modern, and futuristic) found in the Dungeon Master Guide, page 268
	Code by:	grungydan (and a bit by MorePurpleMoreBetter)
	Date:		2017-03-15 (sheet v12.88)
*/

WeaponsList["pistol"] = {
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
	ammo : "bullet, renaissance"
};
WeaponsList["musket"] = {
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
	ammo : "bullet, renaissance"
};
WeaponsList["pistol automatic"] = {
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
	ammo : "bullet, modern"
};
WeaponsList["revolver"] = {
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
	ammo : "bullet, modern"
};
WeaponsList["rifle hunting"] = {
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
	ammo : "bullet, modern"
};
WeaponsList["rifle automatic"] = {
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
	ammo : "bullet, modern"
};
WeaponsList["shotgun"] = {
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
	ammo : "bullet, modern"
};
WeaponsList["laser pistol"] = {
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
};
WeaponsList["antimatter rifle"] = {
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
};
WeaponsList["laser rifle"] = {
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
};

// remove the bullets from the ammo list, and add them as "sling bullet"
var theBullet = AmmoList["bullet"].toSource();
AmmoList["sling bullet"] = eval(theBullet);
AmmoList["sling bullet"].name = "Sling Bullet";
delete AmmoList["bullet"];
WeaponsList["sling"].ammo = "sling bullet";

// now add the different types of ammo for the firearms
AmmoList["bullet, renaissance"] = {
	name : "Bullet, renaissance",
	weight : 0.2,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Bullets, renaissance"
}
AmmoList["bullet, modern"] = {
	name : "Bullet, modern",
	weight : 0.1,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Bullets, modern"
}
AmmoList["energy cell"] = {
	name : "Energy Cell",
	weight : 0,
	icon : "Bullets",
	checks : [".Bullet"],
	display : 50,
	invName : "Energy Cell"
}

UpdateDropdown("ammo");	
UpdateDropdown("weapon");