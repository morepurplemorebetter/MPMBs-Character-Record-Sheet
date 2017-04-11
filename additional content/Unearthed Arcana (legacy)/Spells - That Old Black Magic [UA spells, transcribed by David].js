/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.
	
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Spells
	Effect:		This script adds 5 spells, called "Conjure Lesser Demon", "Conjure Barlgura", "Conjure Hezrou", "Conjure Shadow Demon", and "Conjure Vrock"
			These are taken from the That Old Black Magic Unearthed Arcana (http://media.wizards.com/2015/downloads/dnd/07_UA_That_Old_Black_Magic.pdf)
	Code by:	David (with amendments by MorePurpleMoreBetter)
	Date:		2016-12-14 (sheet v12.72)
*/

SpellsList["conjure lesser demon"] = {
	name : "Conjure Lesser Demon",
	classes : ["sorcerer", "wizard"],
	source : ["UA:TOBM", 2],
	ritual : false,
	level : 3,
	school : "Conj",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A vial of blood from an intelligent humanoid killed within the past 24 hours",
	duration : "Conc, 1 h",
	description : "Summon 8 (16 at SL6, 32 at SL8) manes/dretches that are hostile to all non-demons, attacking nearest",
	descriptionFull : "You summon up to a total of eight manes or dretches that appear in unoccupied spaces you can see within range. A manes or dretch disappears when it drops to 0 hit points or when the spell ends." + "\n   " + "The demons are hostile to all creatures. Roll initiative for the summoned demons as a group, which has its own turns. The demons attack the nearest non-demons to the best of their ability." + "\n   " + "As part of casting the spell, you can scribe a circle on the ground with the blood used as a material component. The circle is large enough to encompass your space. The summoned demons cannot cross the circle or target anyone in it while the spell lasts. Using the material component in this manner consumes it." + "\n   " + AtHigherLevels + "When you cast this spell using a spell slot of 6th or 7th level, you summon sixteen demons. If you cast it using a spell slot of 8th or 9th level, you summon thirty-two demons.",
};

SpellsList["conjure barlgura"] = {
	name : "Conjure Barlgura",
	classes : ["sorcerer", "wizard"],
	source : ["UA:TOBM", 2],
	ritual : false,
	level : 4,
	school : "Conj",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "10 min",
	description : "Summon a barlgura that is hostile to all non-demons, attacking the nearest",
	descriptionFull : "You summon a barlgura that appears in an unoccupied space you can see within range. The barlgura disappears when it drops to 0 hit points or when the spell ends." + "\n   " + "The barlgura is hostile to all non-demons. Roll initiative for the barlgura, which has its own turns. At the start of its turn, it moves toward and attacks the nearest non-demon it can perceive. If two or more creatures are equally near, it picks one at random. If it cannot see any potential enemies, the barlgura moves in a random direction in search of foes." + "\n   " + "As part of casting the spell, you can scribe a circle on the ground using the blood of an intelligent humanoid slain within the past 24 hours. The circle is large enough to encompass your space. The summoned barlgura cannot cross the circle or target anyone in it while the spell lasts.",
};

SpellsList["conjure hezrou"] = {
	name : "Conjure Hezrou",
	classes : ["sorcerer", "wizard"],
	source : ["UA:TOBM", 2],
	ritual : false,
	level : 7,
	school : "Conj",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u2020",
	compMaterial : "Food worth at least 100 gp, which the spell consumes",
	duration : "Conc, 1 h",
	description : "Summon a hezrou that I might control as long as there is food; At half HP it leaves, see B (100gp cons.)",
	descriptionFull : "You summon a hezrou that appears in an unoccupied space you can see within range. The hezrou disappears when it drops to 0 hit points or when the spell ends." + "\n   " + "The hezrou’s attitude depends on the value of the food used as a material component for this spell. Roll initiative for the hezrou, which has its own turns. At the start of the hezrou’s turn, the DM makes a secret Charisma check on your behalf, with a bonus equal to the food’s value divided by 20. The check DC starts at 10 and increases by 2 each round. You can issue orders to the hezrou and have it obey you as long as you succeed on the Charisma check." + "\n   " + "If the check fails, the spell no longer requires concentration and the demon is no longer under your control. The hezrou then focuses on devouring any corpses it can see. If there are no such meals at hand, it attacks the nearest creatures and eats anything it kills. If its hit points are reduced to below half its hit point maximum, it returns to the Abyss." + "\n   " + "As part of casting the spell, you can scribe a circle on the ground using the blood of an intelligent humanoid slain within the past 24 hours. The circle is large enough to encompass your space. The summoned hezrou cannot cross the circle or target anyone in it while the spell lasts.",
};

SpellsList["conjure shadow demon"] = {
	name : "Conjure Shadow Demon",
	classes : ["sorcerer", "wizard"],
	source : ["UA:TOBM", 3],
	ritual : false,
	level : 4,
	school : "Conj",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A vial of blood from an intelligent humanoid killed within the past 24 hours",
	duration : "Conc, 1 h",
	description : "Summon a shadow demon that I control while not in bright light, can attack, and within 100 ft, see B",
	descriptionFull : "You summon a shadow demon that appears in an unoccupied space you can see within range. The shadow demon disappears when it drops to 0 hit points or when the spell ends." + "\n   " + "Roll initiative for the shadow demon, which has its own turns. You can issue orders to the shadow demon, and it obeys you as long as it can attack a creature on each of its turns and does not start its turn in an area of bright light. If either of these conditions is not met, the shadow demon immediately makes a Charisma check contested by your Charisma check. If you fail the check, the spell no longer requires concentration and the demon is no longer under your control. The demon automatically succeeds on the check if it is more than 100 feet away from you." + "\n   " + "As part of casting the spell, you can scribe a circle on the ground using the blood of an intelligent humanoid slain within the past 24 hours. The circle is large enough to encompass your space. The summoned shadow demon cannot cross the circle or target anyone in it while the spell lasts.",
};

SpellsList["conjure vrock"] = {
	name : "Conjure Vrock",
	classes : ["sorcerer", "wizard"],
	source : ["UA:TOBM", 3],
	ritual : false,
	level : 5,
	school : "Conj",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u2020",
	compMaterial : "A gem worth at least 100 gp, which the spell consumes",
	duration : "Conc, 1 h",
	description : "Summon a vrock that I might control for some rounds, depending on gem value, see B (100gp cons.)",
	descriptionFull : "You summon a vrock that appears in an unoccupied space you can see within range. The vrock disappears when it drops to 0 hit points or when the spell ends." + "\n   " + "The vrock’s attitude depends on the value of the gem used as a material component for this spell. Roll initiative for the vrock, which has its own turns. At the start of the vrock’s turn, the DM makes a secret Charisma check on your behalf, with a bonus equal to the gem’s value divided by 20. The check DC starts at 10 and increases by 2 each round. You can issue orders to the vrock and have it obey you as long as you succeed on the Charisma check." + "\n   " + "If the check fails, the spell no longer requires concentration and the vrock is no longer under your control. The vrock takes no actions on its next turn and uses its telepathy to tell any creature it can see that it will fight in exchange for treasure. The creature that gives the vrock the most expensive gem can command it for the next 1d6 rounds. At the end of that time, it offers the bargain again. If no one offers the vrock treasure before its next turn begins, it attacks the nearest creatures for 1d6 rounds before returning to the Abyss." + "\n   " + "As part of casting the spell, you can scribe a circle on the ground using the blood of an intelligent humanoid slain within the past 24 hours. The circle is large enough to encompass your space. The summoned vrock cannot cross the circle or target anyone in it while the spell lasts.",
};

SourceList["UA:TOBM"] = {
	name : "Unearthed Arcana: That Old Black Magic", //2015-12-17
	abbreviation : "UA:TOBM",
	group : "Unearthed Arcana",
	url : "http://media.wizards.com/2015/downloads/dnd/07_UA_That_Old_Black_Magic.pdf"
};

AddSpellsMenu = ParseSpellMenu();