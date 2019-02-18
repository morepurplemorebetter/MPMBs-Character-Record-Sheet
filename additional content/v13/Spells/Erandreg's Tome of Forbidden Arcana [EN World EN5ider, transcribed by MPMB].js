/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Spells
	Effect:     This script adds several necromancy spells to the Cleric, Sorcerer, Warlock, and Wizard spell lists

				These spells have been made by EN World EN5ider and can be found here: https://www.patreon.com/posts/7072568

				Please support the creators of this content on their Patreon: https://www.patreon.com/ensider

	Code by:	MorePurpleMoreBetter
	Date:		2018-08-13 (sheet v12.999)
*/
var iFileName = "Erandreg's Tome of Forbidden Arcana [EN World EN5ider, transcribed by MPMB].js";
RequiredSheetVersion(13);

// The source (EN5ider 108)
SourceList["EN5:108"] = {
	name : "EN World EN5ider [108] Erandreg's Tome of Forbidden Arcana",
	abbreviation : "EN5:108",
	group : "EN World EN5ider",
	url : "https://www.patreon.com/posts/7072568",
	date : "2016/10/24"
};

// Add the spells
SpellsList["bone lock"] = {
	name : "Bone Lock",
	classes : ["sorcerer", "wizard"],
	source : ["EN5:108", 2],
	level : 4,
	school : "Necro",
	time : "1 a",
	range : "30 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Str",
	description : "1 crea save or paralyzed & 3d10+1d10/SL bludg. dmg at turn start; save end of each turn; see book",
	descriptionFull : "Choose a creature that you can see, and that has a skeleton or exoskeleton. That target must make a Strength saving throw. On a failure, the target is paralyzed for the duration and suffers 3d10 bludgeoning damage at the beginning of each of its turns as the spell grinds its bones together." + "\n   " + "If the target receives magical healing while affected by this spell, it must make a Strength saving throw. On a failure, the healing grinds the target's bones together all the more; the target is not healed, and instead takes damage equal to the amount it would have been healed. On a success, the healing effect functions normally." + "\n   " + "At the end of each of its turns, the target can make a Strength saving throw. On a success, the spell ends on the target." + AtHigherLevels + "When you cast this spell with a spell slot of 5th level or higher, you can target one additional valid creature for each slot level above 4th. The creatures must be within 30 feet of each other when you target them."
};
SpellsList["devouring worm"] = {
	name : "Devouring Worm",
	classes : ["warlock", "wizard"],
	source : ["EN5:108", 2],
	level : 6,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u2020",
	compMaterial : "An ivory death-mask worth at least 100 gold pieces, consumed in the casting",
	duration : "Instantaneous",
	save : "Con",
	description : "20-ft+5-ft/SL rad on corpse all crea 3d12 Poison & 3d12 Necrotic dmg; save half; see B (100gp cons.)",
	descriptionMetric : "6+1,5-m/SL rad on corpse all crea 3d12 Poison & 3d12 Necrotic dmg; save half; see B (100gp cons.)",
	descriptionFull : "Choose one intact body within range that has been dead for less than 1 hour. You accelerate its decay, causing maggots to burst from its flesh. All creatures other than you within 20 feet of the target must make a Constitution saving throw. A creature takes 3d12 necrotic damage and 3d12 poison damage on a failed save, or half as much damage on a successful one. The maggots burrow into their targets or the ground and disappear immediately afterwards." + "\n   " + "A corpse targeted by this spell suffers 1 year of decay with regard to the time limit of spells such as raise dead." + AtHigherLevels + "When you cast this spell using a spell slot of 7th level or higher, the area that is covered with maggots increases in radius by 5 feet for each slot level above 6th."
};
SpellsList["flesh graft"] = {
	name : "Flesh Graft",
	classes : ["warlock", "wizard"],
	source : ["EN5:108", 2],
	level : 3,
	school : "Necro",
	time : "1 a",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "Bone needle and human sinew",
	duration : "Instantaneous",
	description : "1 helpless crea 6d8+1d8/SL Necrotic dmg, ally heals half; or 1 crea died in 10 min to heal 3d8, see B",
	descriptionFull : "This spell grafts the flesh of a willing, helpless, or recently-slain body onto an injured creature, in order to save the injured creature's life. Choose one creature within range that is helpless or has died within the past 10 minutes. If it is alive, it suffers 6d8 necrotic damage; if it is immune to necrotic damage, this spell fails. One of your allies within range regains hit points equal to half the damage the first target suffered." + "\n   " + "If the first target is already dead, this spell makes it impossible to restore to life through any magic less potent than resurrection (below 7th level). One of your allies within range regains 3d8 hit points and is vulnerable to radiant damage until it completes a long rest." + AtHigherLevels + "When you cast this spell with a spell slot of 4th level or higher, the spell's damage to a living target increases by 1d8 for each slot level above 3rd."
};
SpellsList["harvest soul"] = {
	name : "Harvest Soul",
	classes : ["warlock", "wizard"],
	source : ["EN5:108", 3],
	level : 2,
	school : "Necro",
	time : "1 bns",
	range : "60 ft",
	components : "V,S,M\u0192",
	compMaterial : "A diamond worth 300 gold pieces",
	duration : "1 min",
	save : "Wis",
	description : "Bind soul of corpse or CR < \u00BD CL ghost to diamond; 1 bns to use soul for +2 lvls slot on spell (300gp)",
	descriptionFull : "Choose the corpse of a sentient target you personally killed that has not already been targeted with this spell. You bind the target's soul into a diamond. As a bonus action on any later turn within the spell's duration, you may expend the soul from the diamond. Any spell you cast in that same turn functions as if you spent a spell slot 2 levels higher." + "\n   " + "Instead of a recently-slain corpse, you may target a ghost or other incorporeal undead. If its challenge rating is less than half your level, it must pass a Wisdom saving throw or become bound in the diamond. You may expend it from the diamond, as described above. It is banished for the duration of the spell; when the spell ends or when you expend its power from the diamond, it must make a Constitution saving throw. On a failure, it is destroyed; on a success, it reappears in an unoccupied space nearest to you. If its challenge rating is greater than or equal to half your level, the spell fails and the action is wasted, but the spell slot is not expended."
};
SpellsList["inescapable malady"] = {
	name : "Inescapable Malady",
	classes : ["sorcerer", "wizard"],
	source : ["EN5:108", 3],
	level : 7,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u0192",
	compMaterial : "Hair, fingernail clippings, or some other piece of the target",
	duration : "Permanent",
	save : "Con",
	description : "1 crea infected; If on same plane, 1 a to cause it 7d10+1d10/SL Necrotic dmg and save to stop disease",
	descriptionFull : "You infect your target with a magical disease controlled by your will. At any time after you cast this spell, as long as you are on the same plane of existence as the target, you may inflict 7d10 necrotic damage on the target as an action. After you do so, the target can make a Constitution saving throw. On a success, the disease ends unless you use your reaction to expend a spell slot of 7th level or higher to sustain the disease." + "\n   " + "Casting remove curse, greater restoration, or heal on the target allows it to make a new saving throw against the effect. A wish ends the disease." + AtHigherLevels + "When you cast this spell with an 8th-level slot or higher, the damage increases by 1d10 for each slot level above 7th."
};
SpellsList["pernicious consumption"] = {
	name : "Pernicious Consumption",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["EN5:108", 4],
	level : 8,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instant, 1 min",
	save : "Spec",
	description : "20-ft rad all crea 12d6 Necrotic dmg \u0026 need +1 lvl spell slot to cast spells; save half \u0026 normal casting",
	descriptionFull : "Waves of dark power erupt from a point you choose within range, leaching physical and magical strength from all in the area. Each creature in a 20-foot radius sphere centered on the point you chose must make a saving throw. If the creature does not have a Spellcasting feature of any kind, it rolls a Constitution saving throw, suffering 12d6 necrotic damage on failed saving throw, and the damage is halved for weapon attacks it makes before the beginning of your next turn. On a successful saving throw, it suffers half damage and no additional effect." + "\n   " + "If the creature does have a Spellcasting feature of any kind, it rolls a saving throw based on its spellcasting ability score. If it has multiple spellcasting abilities (such as from multiclassing), it chooses which one to use. On a failed saving throw, it suffers 12d6 necrotic damage and, for the next minute, must spend a spell slot one level higher than normal to produce a magical effect. This additional spell level does not increase the spell's effect. Cantrips and other at-will spells are unaffected. On a successful save, it suffers half damage and no additional effect."
};
SpellsList["putrefy wound"] = {
	name : "Putrefy Wound",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["EN5:108", 4],
	level : 1,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A handful of maggots",
	duration : "Instantaneous",
	save : "Con",
	description : "1 crea below max HP 2d10+1d10/SL Necrotic dmg & poisoned; save half & no poison, dis. if < \u00BD HP",
	descriptionFull : "Choose one creature within range whose current hit points are less than its maximum hit points. It must make a Constitution saving throw. On a failure, it takes 2d10 necrotic damage and is poisoned until the beginning of your next turn. On a successful save, it takes half damage and is not poisoned. If its current hit points are less than half its maximum hit points, it makes its saving throw with disadvantage." + AtHigherLevels + "When you cast this spell with a spell slot of 2nd level or higher, the spell's damage increases by 1d10 for each slot level above 1st."
};
SpellsList["soul delve"] = {
	name : "Soul Delve",
	classes : ["cleric", "warlock", "wizard"],
	source : ["EN5:108", 4],
	level : 2,
	school : "Necro",
	time : "1 min",
	range : "5 ft",
	components : "V,S,M\u0192",
	compMaterial : "A set of rune sticks made from dragonbone, worth 100 gold pieces",
	duration : "Instantaneous",
	description : "Learn about willing, helpless, or recently dead (24h) creature; unwilling learns about me too (100gp)",
	descriptionFull : "Choose a sentient target that is willing, helpless, or has been dead for less than 24 hours. You examine any and all souls currently or recently connected to that person. This reveals:" + "\n \u2022 " + "Whether the target has ever died before, and if so how they were returned to life" + "\n \u2022 " + "The target's Type" + "\n \u2022 " + "The target's character class or classes, if any" + "\n \u2022 " + "Whether the target's Hit Dice are greater than, equal to, or less than yours" + "\n \u2022 " + "Whether the target has a Patron from any class or subclass feature" + "\n \u2022 " + "Whether the target is or has been under the effects of possession by a ghost or similar creature" + "\n \u2022 " + "What status conditions are affecting the target, or affected it at its time of death" + "\n \u2022 " + "One Ideal, Bond, or Flaw" + "\n \u2022 " + "General descriptions of any magic items to which they are currently attuned" + "\n   " + "An unwilling living target may learn 1d4 of these things about you, as well."
};
SpellsList["soul shackle"] = {
	name : "Soul Shackle",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["EN5:108", 5],
	level : 5,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 h",
	save : "Cha",
	description : "1 crea save or I use 1 rea so it takes dmg/effect instead; SL6: 8h; SL7: 24h; SL8: no conc; SL9: perm.",
	descriptionFull : "This spell shackles another target's soul to yours, so that the target suffers in your place. Choose a creature that you can see or name. If it succeeds a Charisma saving throw, this spell has no effect. Otherwise, as a reaction when you receive damage, a spell effect, or a condition, you force the target to suffer it instead. After you do so, the target can make a Charisma saving throw. On a success, the effect ends." + "\n   " + "A remove curse cast on the target ends the spell early." + AtHigherLevels + "When you cast this spell with a spell slot of 6th level, the spell's duration is concentration, up to 8 hours. When you cast this spell with a spell slot of 7th level, the spell's duration is concentration, up to 24 hours. When you cast this spell with a spell slot of 8th level, the spell no longer requires concentration. When you cast this spell with a spell slot of 9th level, the spell is permanent."
};
