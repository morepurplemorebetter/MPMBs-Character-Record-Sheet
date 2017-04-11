//All the spells from the Unearthed Arcana articles are present in this file chronologically

/*	the That Old Black Magic Unearthed Arcana of 2015-12-17
	(http://media.wizards.com/2015/downloads/dnd/07_UA_That_Old_Black_Magic.pdf)
	
	Adds 5 spells for summoning fiends to the Sorcerer and the Wizard spell lists
	
	This code was contributed by David
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
	descriptionFull : "You summon up to a total of eight manes or dretches that appear in unoccupied spaces you can see within range. A manes or dretch disappears when it drops to 0 hit points or when the spell ends." + "\n   " + "The demons are hostile to all creatures. Roll initiative for the summoned demons as a group, which has its own turns. The demons attack the nearest non-demons to the best of their ability." + "\n   " + "As part of casting the spell, you can scribe a circle on the ground with the blood used as a material component. The circle is large enough to encompass your space. The summoned demons cannot cross the circle or target anyone in it while the spell lasts. Using the material component in this manner consumes it." + AtHigherLevels + "When you cast this spell using a spell slot of 6th or 7th level, you summon sixteen demons. If you cast it using a spell slot of 8th or 9th level, you summon thirty-two demons."
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
	descriptionFull : "You summon a barlgura that appears in an unoccupied space you can see within range. The barlgura disappears when it drops to 0 hit points or when the spell ends." + "\n   " + "The barlgura is hostile to all non-demons. Roll initiative for the barlgura, which has its own turns. At the start of its turn, it moves toward and attacks the nearest non-demon it can perceive. If two or more creatures are equally near, it picks one at random. If it cannot see any potential enemies, the barlgura moves in a random direction in search of foes." + "\n   " + "As part of casting the spell, you can scribe a circle on the ground using the blood of an intelligent humanoid slain within the past 24 hours. The circle is large enough to encompass your space. The summoned barlgura cannot cross the circle or target anyone in it while the spell lasts."
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
	descriptionFull : "You summon a hezrou that appears in an unoccupied space you can see within range. The hezrou disappears when it drops to 0 hit points or when the spell ends." + "\n   " + "The hezrou’s attitude depends on the value of the food used as a material component for this spell. Roll initiative for the hezrou, which has its own turns. At the start of the hezrou’s turn, the DM makes a secret Charisma check on your behalf, with a bonus equal to the food’s value divided by 20. The check DC starts at 10 and increases by 2 each round. You can issue orders to the hezrou and have it obey you as long as you succeed on the Charisma check." + "\n   " + "If the check fails, the spell no longer requires concentration and the demon is no longer under your control. The hezrou then focuses on devouring any corpses it can see. If there are no such meals at hand, it attacks the nearest creatures and eats anything it kills. If its hit points are reduced to below half its hit point maximum, it returns to the Abyss." + "\n   " + "As part of casting the spell, you can scribe a circle on the ground using the blood of an intelligent humanoid slain within the past 24 hours. The circle is large enough to encompass your space. The summoned hezrou cannot cross the circle or target anyone in it while the spell lasts."
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
	descriptionFull : "You summon a shadow demon that appears in an unoccupied space you can see within range. The shadow demon disappears when it drops to 0 hit points or when the spell ends." + "\n   " + "Roll initiative for the shadow demon, which has its own turns. You can issue orders to the shadow demon, and it obeys you as long as it can attack a creature on each of its turns and does not start its turn in an area of bright light. If either of these conditions is not met, the shadow demon immediately makes a Charisma check contested by your Charisma check. If you fail the check, the spell no longer requires concentration and the demon is no longer under your control. The demon automatically succeeds on the check if it is more than 100 feet away from you." + "\n   " + "As part of casting the spell, you can scribe a circle on the ground using the blood of an intelligent humanoid slain within the past 24 hours. The circle is large enough to encompass your space. The summoned shadow demon cannot cross the circle or target anyone in it while the spell lasts."
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
	descriptionFull : "You summon a vrock that appears in an unoccupied space you can see within range. The vrock disappears when it drops to 0 hit points or when the spell ends." + "\n   " + "The vrock’s attitude depends on the value of the gem used as a material component for this spell. Roll initiative for the vrock, which has its own turns. At the start of the vrock’s turn, the DM makes a secret Charisma check on your behalf, with a bonus equal to the gem’s value divided by 20. The check DC starts at 10 and increases by 2 each round. You can issue orders to the vrock and have it obey you as long as you succeed on the Charisma check." + "\n   " + "If the check fails, the spell no longer requires concentration and the vrock is no longer under your control. The vrock takes no actions on its next turn and uses its telepathy to tell any creature it can see that it will fight in exchange for treasure. The creature that gives the vrock the most expensive gem can command it for the next 1d6 rounds. At the end of that time, it offers the bargain again. If no one offers the vrock treasure before its next turn begins, it attacks the nearest creatures for 1d6 rounds before returning to the Abyss." + "\n   " + "As part of casting the spell, you can scribe a circle on the ground using the blood of an intelligent humanoid slain within the past 24 hours. The circle is large enough to encompass your space. The summoned vrock cannot cross the circle or target anyone in it while the spell lasts."
};

/*	the Modern Magic Unearthed Arcana of 2015-08-03
	(http://media.wizards.com/2015/downloads/dnd/UA_ModernMagic.pdf)
	
	Adds 14 spells that are, according to the article, 'suitable' for the Sorcerer, Warlock, or Wizard spell list. 1 of those is also considered suitable for the Paladin spell list.
	
	Strangely enough, adding all these spells to the Warlock spell list makes the Ghost in the Machine's Expanded Spell List class feature completely useless
*/
SpellsList["arcane hacking"] = {
	name : "Arcane Hacking",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["UA:MM", 5],
	ritual : false,
	level : 5,
	school : "Trans",
	time : "1 a",
	range : "Self",
	components : "V,S,M\u0192",
	compMaterial : "Hacking tools",
	duration : "Conc, 1 h",
	description : "Adv on Int (hacking tools) vs. encryption; Use Int (hacking tools) to remove protective spells; See book",
	descriptionFull : "[Technomagic]\n   You gain advantage on all Intelligence checks using hacking tools to break software encryption or online security when using a foreign system. This spell also allows you to break 2nd-level and lower protective spells such as arcane lock or glyph of warding by making an Intelligence check using hacking tools against the spell save DC of the spell’s caster." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, you can attempt to counteract a spell set to secure the foreign system if the spell’s level is equal to or less than the level of the spell slot you used."
};
SpellsList["commune with city"] = {
	name : "Commune with City",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["UA:MM", 5],
	ritual : true,
	level : 5,
	school : "Div",
	time : "1 min",
	range : "Self",
	components : "V,S",
	duration : "Instantaneous",
	description : "Learn up to three facts about surrounding city, out to 1 mile above- or 600 ft underground; see B",
	descriptionFull : "You briefly become one with the city and gain knowledge of the surrounding area. Aboveground, this spell gives you knowledge of the area within 1 mile of you. In sewers and other underground settings, you gain knowledge of the area within 600 feet of you." + "\n   " + "You instantly gain knowledge of up to three facts of your choice about any of the following subjects as they relate to the area:" + "\n  \u2022 " + "Terrain and bodies of water" + "\n  \u2022 " + "Prevalent buildings, plants, animals, or intelligent creatures" + "\n  \u2022 " + "Powerful (CR 1 or higher) celestials, fey, fiends, elementals, or undead" + "\n  \u2022 " + "Influences from other planes of existence" + "\n  \u2022 " + "Electrical currents, wireless signals, and active transit lines and tracks" + "\n\n   " + "For example, you could determine the location of powerful undead in the area, the location of major sources of electrical power or interference, and the location of any nearby parks."
};
SpellsList["conjure knowbot"] = {
	name : "Conjure Knowbot",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["UA:MM", 5],
	ritual : false,
	level : 4,
	school : "Conj",
	time : "1 a",
	range : "500 ft",
	components : "V,S",
	duration : "10 min",
	description : "Create bot in touched device; computer checks 1 bns instead of 1 a for me; SL5: 1 h, 1000 ft, see book",
	descriptionFull : "[Technomagic]\n   You touch a single computerized device or computer system to conjure a knowbot\u2014a partially sentient piece of software imprinted with vestiges of your own skills and computer abilities. For the duration of the spell, you can use a bonus action to have the knowbot execute a computer-related task that would normally require an action. The knowbot makes Intelligence ability checks using your ability score and proficiency bonuses (including your proficiency with hacking tools, if applicable)." + "\n   " + "You have a limited telepathic bond with the knowbot, out to a range of 500 feet from the device or system where the knowbot was conjured. If you move beyond this range, the knowbot disappears in 2d4 rounds, as if the duration of the spell had expired. Moving within range again immediately reestablishes the bond. The knowbot is bound to the system in which it was created, and it stays there until it is dismissed or the spell’s duration expires." + AtHigherLevels + "When you cast this spell using a spell slot of 5th level or higher, the spell’s duration increases to 1 hour. Additionally, your telepathic bond with the knowbot is effective out to a range of 1,000 feet, and if you leave the range of the bond, the knowbot continues performing its last directed task until the spell expires."
};
SpellsList["digital phantom"] = {
	name : "Digital Phantom",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["UA:MM", 6],
	ritual : false,
	level : 2,
	school : "Abjur",
	time : "1 a",
	range : "Self",
	components : "V,S,M",
	compMaterial : "A small piece of copper wire",
	duration : "Conc, 1 h",
	description : "You and any others in same computer system +10 on Int to avoid detection; leave no trace on exit",
	descriptionFull : "[Technomagic]\n   This spell works to actively hide your presence within a computer system. For the spell’s duration, you and any other users you choose on your local network gain a +10 bonus to Intelligence checks to avoid detection by administrators, knowbots, tracking software, and the like. Whenever you and your chosen users leave any computer system you are working in while this spell is in effect, all trace of your previous presence in that system is erased."
};
SpellsList["find vehicle"] = {
	name : "Find Vehicle",
	classes : ["paladin", "sorcerer", "warlock", "wizard"],
	source : ["UA:MM", 6],
	ritual : false,
	level : 2,
	school : "Conj",
	time : "10 min",
	range : "30 ft",
	components : "V,S",
	duration : "Conc, 1 h",
	description : "Gain services of land spirit-vehicle; expertise, share spells with it; SL3: water, SL5: air, SL7: any; see B",
	descriptionFull : "You summon a spirit that assumes the form of a nonmilitary land vehicle of your choice, appearing in an unoccupied space within range. The vehicle has the statistics of a normal vehicle of its sort, though it is celestial, fey, or fiendish (your choice) in origin. The physical characteristics of the vehicle reflect its origin to some degree. For example, a fiendish SUV might be jet black in color, with tinted windows and a sinister-looking front grille." + "\n   " + "You have a supernatural bond with the conjured vehicle that allows you to drive beyond your normal ability. While driving the conjured vehicle, you are considered proficient with vehicles of its type, and you add double your proficiency bonus to ability checks related to driving the vehicle. While driving the vehicle, you can make any spell you cast that targets only you also target the vehicle." + "\n   " + "If the vehicle drops to 0 hit points, it disappears, leaving behind no physical form. You can also dismiss the vehicle at any time as an action, causing it to disappear." + "\n   " + "You can’t have more than one vehicle bonded by this spell at a time. As an action, you can release the vehicle from its bond at any time, causing it to disappear." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, you can conjure a nonmilitary water vehicle large enough to carry six Medium creatures. When you cast this spell using a spell slot of 5th level or higher, you can conjure a nonmilitary air vehicle large enough to carry ten Medium creatures. When you cast this spell using a spell slot of 7th level or higher, you can conjure any type of vehicle, subject to the DM’s approval."
};
SpellsList["haywire"] = {
	name : "Haywire",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["UA:MM", 7],
	ritual : false,
	level : 3,
	school : "Ench",
	time : "1 a",
	range : "90 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "10 ft(+5 ft/SL) rad all electronic devices go haywire, see B; for hold devices, crea gets to save",
	descriptionFull : "[Technomagic]\n   This spell plays havoc with electronic devices, making the use of such devices all but impossible. Each electronic device in a 10-foot-radius sphere centered on a point you choose within range is subject to random behavior while it remains within the area. A device not held by a creature is automatically affected. If an electronic device is held by a creature, that creature must succeed on a Wisdom saving throw or have the device affected by the spell." + "\n   " + "At the start of each of your turns, roll a d6 for each affected device to determine its behavior. Except where otherwise indicated, that behavior lasts until the start of your next turn while this spell is in effect." + "\n\n" + toUni("d10") + "\t" + toUni("Behavior") + "\n  " + "1\tThe device shuts down and must be restarted. Do not roll again for this device until it is restarted.\n2–4\tThe device does not function." + "\n  " + "5\tThe device experiences a power surge, causing an electric shock to the wielder (if any) and one random creature within 5 feet of the device. Each affected creature must make a Dexterity saving throw against your spell save DC, taking 6d6 lightning damage on a failed save, or half as much damage on a successful one." + "\n  " + "6\tThe device is usable as normal.\n" + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the radius of the sphere affected by the spell increases by 5 feet for each slot level above 3rd."
};
SpellsList["infallible relay"] = {
	name : "Infallible Relay",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["UA:MM", 7],
	ritual : false,
	level : 3,
	school : "Div",
	time : "1 min",
	range : "Self",
	components : "V,S,M",
	compMaterial : "A mobile phone",
	duration : "Conc, 10 min",
	save : "Cha",
	description : "1 known crea save or has to answer your call from phone within 100 ft of it; it has to save to end call",
	descriptionFull : "[Technomagic]\n   With this spell, you can target any creature with whom you have spoken previously, as long as the two of you are on the same plane of existence. When you cast the spell, the nearest functioning telephone or similar communications device within 100 feet of the target begins to ring. If there is no suitable device close enough to the target, the spell fails." + "\n   " + "The target must make a successful Charisma saving throw or be compelled to answer your call. Once the connection is established, the call is crystal clear and cannot be dropped until the conversation has ended or the spell’s duration ends. You can end the conversation at any time, but a target must succeed on a Charisma saving throw to end the conversation."
};
SpellsList["invisibility to cameras"] = {
	name : "Invisibility to Cameras",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["UA:MM", 7],
	ritual : false,
	level : 3,
	school : "Ilus",
	time : "1 a",
	range : "10 ft",
	components : "V,S,M",
	compMaterial : "A scrap of black paper",
	duration : "Conc, 1 min",
	description : "Up to 4 crea and anything they are wearing or carrying become undetectable for electornic sensors",
	descriptionFull : "[Technomagic]\n   Four creatures of your choice within range become undetectable to electronic sensors and cameras for the duration of the spell. Anything a target is wearing or carrying is likewise undetectable as long as it is on the target’s person. The targets remain visible to vision."
};
SpellsList["on/off"] = {
	name : "On/Off",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["UA:MM", 7],
	ritual : false,
	level : 0,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Activate or deactivate 1 electornic device that has a way of doing so accessible from the outside of it",
	descriptionFull : "[Technomagic]\n   This cantrip allows you to activate or deactivate any electronic device within range, as long as the device has a clearly defined on or off function that can be easily accessed from the outside of the device. Any device that requires a software- based shutdown sequence to activate or deactivate cannot be affected by on/off."
};
SpellsList["protection from ballistics"] = {
	name : "Protection from Ballistics",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["UA:MM", 8],
	ritual : false,
	level : 3,
	school : "Abjur",
	time : "1 a",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "A shell casing",
	duration : "Conc, 10 min",
	description : "1 crea gains resistance to nonmagical ballistic damage",
	descriptionFull : "This spell enchants the flesh of the target against the impact of bullets. Until the spell ends, the target has resistance to nonmagical ballistic damage."
};
SpellsList["remote access"] = {
	name : "Remote Access",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["UA:MM", 8],
	ritual : false,
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "10 min",
	description : "You can use any electronic device within range as if it were in your hands",
	descriptionFull : "[Technomagic]\n   You can use any electronic device within range as if it were in your hands. This is not a telekinesis effect. Rather, this spell allows you to simulate a device’s mechanical functions electronically. You are able to access only functions that a person using the device manually would be able to access. You can use remote access with only one device at a time."
};
SpellsList["shutdown"] = {
	name : "Shutdown",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["UA:MM", 8],
	ritual : false,
	level : 5,
	school : "Trans",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Con",
	description : "Shut down all electronic devices within range; if controlled/held by crea, it can save to keep active",
	descriptionFull : "[Technomagic]\n   This spell shuts down all electronic devices within range that are not wielded by or under the direct control of a creature. If an electronic device within range is used by a creature, that creature must succeed on a Constitution saving throw to prevent the device from being shut down. While the spell remains active, no electronic device within range can be started or restarted."
};
SpellsList["synchronicity"] = {
	name : "Synchronicity",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["UA:MM", 8],
	ritual : false,
	level : 4,
	school : "Ench",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Conc, 1 h",
	description : "1 crea not slowed by mundane delays, disadv on opportunity attacks to it, adv to Stealth and driving",
	descriptionFull : "The creature you touch feels reality subtly shifted to its favor while this spell is in effect." + "\n   " + "The target isn’t inconvenienced by mundane delays of any sort. Traffic lights are always green, there’s always a waiting elevator, and a taxi is always around the corner. The target can run at full speed through dense crowds, and attacks of opportunity provoked by the target’s movement are made with disadvantage." + "\n   " + "Synchronicity grants advantage to Dexterity (Stealth) checks, since the target always finds a handy piece of cover available. Additionally, the target has advantage on all ability checks made to drive a vehicle." + "\n   " + "In the event that two or more creatures under the effect of synchronicity are attempting to avoid being inconvenienced by each other, the creatures engage in a contest of Charisma each time the effects of the spells would oppose each other."
};
SpellsList["system backdoor"] = {
	name : "System Backdoor",
	classes : ["sorcerer", "warlock", "wizard"],
	source : ["UA:MM", 8],
	ritual : false,
	level : 4,
	school : "Trans",
	time : "1 min",
	range : "Self",
	components : "V,S,M\u0192",
	compMaterial : "Hacking tools",
	duration : "Conc, 1 h",
	description : "Gain admin access to 1 system; defeats 3rd or lower technomancy spells; SL5+: defeats same or lower",
	descriptionFull : "[Technomagic]\n   This spell allows you to bypass system security in order to create a secure login on a foreign system. The login you create allows you administrator-level privileges in any computer system not enhanced through technomagic. The login defeats any technomagic spells of 3rd level or lower." + "\n   " + "Once the duration of the spell expires, the login and all privileges are wiped from the system." + "\n   " + "System logs still show the activity of the user, but the user identification cannot be found or traced." + AtHigherLevels + "When you cast this spell using a spell slot of 5th level or higher, you are able to bypass technomagic spells if the spell’s level is equal to or less than the level of the spell slot you used."
};

/*	the Starter Spells Unearthed Arcana of 2017-04-03
	(http://media.wizards.com/2017/dnd/downloads/UA-Starter-Spells.pdf)
	
	Adds 17 spells of lower levels to all class' spell lists
	
	This code was contributed by SoilentBrad
*/
SpellsList["cause fear"] = {
	name : "Cause Fear",
	classes : ["warlock", "wizard"],
	source : ["UA:SS", 2],
	ritual : false,
	level : 1,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "1 crea save or frightened; crea disadvantage on save if 25 hp or less; no effect on undead/constructs",
	descriptionFull : "You awaken the sense of mortality in one creature you can see within range. The target must succeed on a Wisdom saving throw or become frightened for the duration. A target with 25 hit points or fewer makes the saving throw with disadvantage. The spell has no effect on constructs or undead."
};
SpellsList["ceremony"] = {
	name : "Ceremony",
	classes : ["cleric", "paladin"],
	source : ["UA:SS", 2],
	ritual : true,
	level : 1,
	school : "Evoc",
	time : "1 h",
	range : "Touch",
	components : "V,S,M\u0192",
	compMaterial : "25 gp worth of powdered silver",
	duration : "Instantaneous",
	description : "Perform religious ceremony on target(s) that are within 10 ft throughout the casting; see book (25gp)",
	descriptionFull : "You perform one of several religious ceremonies. When you cast the spell, choose one of the following ceremonies, the target of which must be within 10 feet of you throughout the casting." + "\n   " + toUni("Atonement") + ": You touch one willing creature whose alignment has changed, and you make a DC 20 Wisdom (Insight) check. On a success, you restore the target to its original alignment." + "\n   " + toUni("Bless Water") + ": You touch one vial of water and cause it to become holy water." + "\n   " + toUni("Coming of Age") + ": You touch one humanoid old enough to be a young adult. For the next 24 hours, whenever the target makes an ability check, it can roll a d4 and add the number rolled to the ability check. A creature can benefit from this ceremony just once." + "\n   " + toUni("Dedication") + ": You touch one humanoid who would willingly convert to your religion or who wishes to be dedicated to your god’s service. For the next 24 hours, whenever the target makes a saving throw, it can roll a d4 and add the number rolled to the save. A creature can benefit from this ceremony just once." + "\n   " + toUni("Funeral Rite") + ": You bless one corpse within 5 feet of you. For the next 24 hours, the target can’t become undead by any means short of a wish spell." + "\n   " + toUni("Investiture") + ": You touch one willing humanoid. Choose one 1st-level spell you have prepared and expend a spell slot and any material components as if you were casting that spell. The spell has no effect. Instead, the target can cast this spell once without having to expend a spell slot or use material components. If the target doesn’t cast the spell within 1 hour, the invested spell is lost." + "\n   " + toUni("Marriage") + ": You touch adult humanoids willing to be bonded together in marriage. For the next 24 hours, each target gains a +2 bonus to AC and saving throws while they are within 30 feet of each other. A creature can benefit from this ceremony just once."
};
SpellsList["chaos bolt"] = {
	name : "Chaos Bolt",
	classes : ["sorcerer"],
	source : ["UA:SS", 2],
	ritual : false,
	level : 1,
	school : "Evoc",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Spell atk 2d8+1d6/SL dmg, d8s set dmg type, see B; double on d8s, new atk vs. crea in 30 ft of target",
	descriptionFull : "You hurl an undulating, warbling mass of chaotic energy at one creature in range. Make a ranged spell attack against the target. On a hit, the target takes 2d8 damage. Choose one of the d8s. The number it rolled determines the type of damage, as shown below." + "\n\n" + toUni("d8") + "\t" + toUni("Damage Type") + "\n  1\tAcid" + "\n  2\tCold" + "\n  3\tFire" + "\n  4\tForce" + "\n  5\tLightning" + "\n  6\tPoison" + "\n  7\tPsychic" + "\n  8\tThunder" + "\n\n   " + "If you roll the same number on both d8s, the chaotic energy leaps from the target to a different creature of your choice within 30 feet of it. Make a new attack roll against the new target, and make a new damage roll, which could cause the chaotic energy to leap again." + "\n   " + "A creature can be targeted only once by this mass of chaotic energy." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, each target takes extra damage of the type rolled. The extra damage equals 1d6 for each slot level above 1st."
};
SpellsList["guiding hand"] = {
	name : "Guiding Hand",
	classes : ["bard", "cleric", "druid", "wizard"],
	source : ["UA:SS", 3],
	ritual : true,
	level : 1,
	school : "Div",
	time : "1 min",
	range : "5 ft",
	components : "V,S",
	duration : "Conc, 8 h",
	description : "Tiny incorporeal hand directs you to one major landmark you name that is on the same plane",
	descriptionFull : "You create a Tiny incorporeal hand of shimmering light in an unoccupied space you can see within range. The hand exists for the duration, but it disappears if you teleport or you travel to a different plane of existence." + "\n   " + "When the hand appears, you name one major landmark, such as a city, mountain, castle, or battlefield on the same plane of existence as you. Someone in history must have visited the site and mapped it. If the landmark appears on no map in existence, the spell fails. Otherwise, whenever you move toward the hand, it moves away from you at the same speed you moved, and it moves in the direction of the landmark, always remaining 5 feet away from you." + "\n   " + "If you don’t move toward the hand, it remains in place until you do and beckons for you to follow once every 1d4 minutes."
};
SpellsList["hand of radiance"] = {
	name : "Hand of Radiance",
	classes : ["cleric"],
	source : ["UA:SS", 3],
	ritual : false,
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "5-ft rad",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	description : "Any creatures you see in 5-ft radius save or 1d6 Radiant damage; +1d6 damage at CL 5, 11, and 17",
	descriptionFull : "You raise your hand, and burning radiance erupts from it. Each creature of your choice that you can see within 5 feet of you must succeed on a Constitution saving throw or take 1d6 radiant damage." + "\n   " + "The spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
};
SpellsList["healing elixer"] = {
	name : "Healing Elixer",
	classes : ["warlock", "wizard"],
	source : ["UA:SS", 3],
	ritual : false,
	level : 1,
	school : "Conj",
	time : "1 min",
	range : "Self",
	components : "V,S,M\u0192",
	compMaterial : "Alchemist's supplies",
	duration : "24 h",
	description : "Make vial with alchemist's supplies; heals 2d4+2 hp as an action; if not used, disappears after 24 h",
	descriptionFull : "You create a healing elixir in a simple vial that appears in your hand. The elixir retains its potency for the duration or until it’s consumed, at which point the vial vanishes." + "\n   " + "As an action, a creature can drink the elixir or administer it to another creature. The drinker regains 2d4 + 2 hit points."
};
SpellsList["infestation"] = {
	name : "Infestation",
	classes : ["druid", "sorcerer", "warlock", "wizard"],
	source : ["UA:SS", 3],
	ritual : false,
	level : 0,
	school : "Conj",
	time : "1 a",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "A living flea",
	duration : "Instantaneous",
	save : "Con",
	description : "1 crea save or 1d6 Piercing damage and moved 5 ft in random direction; +1d6 at CL 5, 11, and 17",
	descriptionFull : "You cause mites, fleas, and other parasites to appear momentarily on one creature you can see within range. The target must succeed on a Constitution saving throw or take 1d6 piercing damage. If the target takes any of that damage, the target moves 5 feet in a random direction. Roll a d8 for the direction:" + "\n\n" + toUni("d8") + "\t" + toUni("Direction") + "\n  1\tNorth" + "\n  2\tNortheast" + "\n  3\tEast" + "\n  4\tSoutheast" + "\n  5\tSouth" + "\n  6\tSouthwest" + "\n  7\tWest" + "\n  8\tNorthwest" + "\n\n   " + "The spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
};
SpellsList["primal savagery"] = {
	name : "Primal Savagery",
	classes : ["druid"],
	source : ["UA:SS", 3],
	ritual : false,
	level : 0,
	school : "Trans",
	time : "1 a",
	range : "5 ft",
	components : "S",
	duration : "Instantaneous",
	description : "Melee spell attack deals 1d10 Piercing or Slashing dmg (your choice); +1d10 at CL 5, 11, and 17",
	descriptionFull : "Your teeth or fingernails lengthen and sharpen. You choose which. Make a melee spell attack against one creature within 5 feet of you. On a hit, the target takes 1d10 piercing or slashing damage (your choice). After you make the attack, your teeth or fingernails return to normal." + "\n   " + "The spell’s damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10)."
};
SpellsList["puppet"] = {
	name : "Puppet",
	classes : ["bard", "warlock", "wizard"],
	source : ["UA:SS", 3],
	ritual : false,
	level : 1,
	school : "Ench",
	time : "1 a",
	range : "120 ft",
	components : "S",
	duration : "Instantaneous",
	save : "Con",
	description : "1 humanoid save or move its speed to where you choose and drop held items, if chosen (charm effect)",
	descriptionFull : "Your gesture forces one humanoid you can see within range to make a Constitution saving throw. On a failed save, the target must move up to its speed in a direction you choose. In addition, you can cause the target to drop whatever it is holding. This spell has no effect on a humanoid that is immune to being charmed."
};
SpellsList["sense emotion"] = {
	name : "Sense Emotion",
	classes : ["bard", "warlock", "wizard"],
	source : ["UA:SS", 4],
	ritual : false,
	level : 1,
	school : "Div",
	time : "1 a",
	range : "30 ft",
	components : "V,S",
	duration : "Conc, 10 min",
	description : "Now and as 1 a for duration, sense emotion of humanoid in range; sense calm if not humanoid/charm",
	descriptionFull : "You attune your senses to pick up the emotions of others for the duration. When you cast the spell, and as your action on each turn until the spell ends, you can focus your senses on one humanoid you can see within 30 feet of you. You instantly learn the target’s prevailing emotion, whether it’s love, anger, pain, fear, calm, or something else. If the target isn’t actually humanoid or it is immune to being charmed, you sense that it is calm."
};
SpellsList["snare"] = {
	name : "Snare",
	classes : ["druid", "ranger", "wizard"],
	source : ["UA:SS", 4],
	ritual : false,
	level : 1,
	school : "Abjur",
	time : "1 min",
	range : "Touch",
	components : "V,S,M\u2020",
	compMaterial : "30 feet of cord or rope, which is consumed by the spell",
	duration : "Dispel/trigger",
	save : "Dex",
	description : "5-ft rad magical trap; Int (Inv) to see; save or restrained upside down 3 ft in the air; save/rnd at dis",
	descriptionFull : "While you cast this spell, you use the cord or rope to create a circle with a 5-foot radius on a flat surface within your reach. When you finish casting, the cord or rope disappears to become a magical trap." + "\n   " + "The trap is nearly invisible and requires a successful Intelligence (Investigation) check against your spell save DC to be found." + "\n   " + "The trap triggers when a Small creature or larger moves into the area protected by the spell. The triggering creature must succeed on a Dexterity saving throw or fall prone and be hoisted into the air until it hangs upside down 3 feet above the protected surface, where it is restrained." + "\n   " + "The restrained creature can make a Dexterity saving throw with disadvantage at the end of each of its turns and ends the restrained effect on a success. Alternatively, another creature that can reach the restrained creature can use an action to make an Intelligence (Arcana) check against your spell save DC. On a success, the restrained effect also ends."
};
SpellsList["sudden awakening"] = {
	name : "Sudden Awakening",
	classes : ["bard", "ranger", "sorcerer", "wizard"],
	source : ["UA:SS", 4],
	ritual : false,
	level : 1,
	school : "Ench",
	time : "1 bns",
	range : "10 ft",
	components : "V",
	duration : "Instantaneous",
	description : "Any creatures within range awaken and can then stand up from prone without expending movement",
	descriptionFull : "Each sleeping creature you choose within range awakens, and then each prone creature within range can stand up without expending any movement."
};
SpellsList["toll the dead"] = {
	name : "Toll the Dead",
	classes : ["cleric", "warlock", "wizard"],
	source : ["UA:SS", 4],
	ritual : false,
	level : 0,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Wis",
	description : "1 crea save or 1d12 Necrotic damage (only 1d8 if at full hp); +1d12/+1d8 at CL 5, 11, and 17",
	descriptionFull : "You point at one creature you can see within range, and the sound of a dolorous bell fills the air around it for a moment. The target must succeed on a Wisdom saving throw or take 1d8 necrotic damage. If the target is missing any of its hit points, it instead takes 1d12 necrotic damage." + "\n   " + "The spell’s damage increases by one die when you reach 5th level (2d8 or 2d12), 11th level (3d8 or 3d12), and 17th level (4d8 or 4d12)."
};
SpellsList["unearthly chorus"] = {
	name : "Unearthly Chorus",
	classes : ["bard"],
	source : ["UA:SS", 4],
	ritual : false,
	level : 1,
	school : "Illus",
	time : "1 a",
	range : "30-ft rad",
	components : "V",
	duration : "Conc, 10 min",
	save: "Cha",
	description : "Use bns a to make 1 crea in range save or be friendly for 1 h; You adv on Cha (Performance) checks",
	descriptionFull : "Music of a style you choose fills the air around you in a 30-foot radius. The music spreads around corners and can be heard from up to 100 feet away. The music moves with you, centered on you for the duration." + "\n   " + "Until the spell ends, you make Charisma (Performance) checks with advantage. In addition, you can use a bonus action on each of your turns to beguile one creature you choose within 30 feet of you that can see you and hear the music. The creature must make a Charisma saving throw. If you or your companions are attacking it, the creature automatically succeeds on the saving throw. On a failure, the creature becomes friendly to you for as long as it can hear the music and for 1 hour thereafter. You make Charisma (Deception) checks and Charisma (Persuasion) checks against creatures made friendly by this spell with advantage."
};
SpellsList["virtue"] = {
	name : "Virtue",
	classes : ["cleric"],
	source : ["UA:SS", 5],
	ritual : false,
	level : 0,
	school : "Abjur",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "1 rnd",
	description : "1 creature that has at least 1 hp gets 1d4 + spellcasting ability modifier in temporary hit points",
	descriptionFull : "You touch one creature, imbuing it with vitality. If the target has at least 1 hit point, it gains a number of temporary hit points equal to 1d4 + your spellcasting ability modifier. The temporary hit points are lost when the spell ends."
};
SpellsList["wild cunning"] = {
	name : "Wild Cunning",
	classes : ["druid", "ranger"],
	source : ["UA:SS", 5],
	ritual : true,
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Call spirits of nature to aid you with finding food/drink/tracks/shelter, or camping; see book",
	descriptionFull : "You call out to the spirits of nature to aid you. When you cast this spell, choose one of the following effects:" + "\n  \u2022 " + "If there are any tracks on the ground within range, you know where they are, and you make Wisdom (Survival) checks to follow these tracks with advantage for 1 hour or until you cast this spell again." + "\n  \u2022 " + "If there is edible forage within range, you know it and where to find it." + "\n  \u2022 " + "If there is clean drinking water within range, you know it and where to find it." + "\n  \u2022 " + "If there is suitable shelter for you and your companions with range, you know it and where to find." + "\n  \u2022 " + "Send the spirits to bring back wood for a fire and to set up a campsite in the area using your supplies. The spirits build the fire in a circle of stones, put up tents, unroll bedrolls, and put out any rations and water for consumption." + "\n  \u2022 " + "Have the spirits instantly break down a campsite, which includes putting out a fire, taking down tents, packing up bags, and burying any rubbish."
};
SpellsList["zephyr strike"] = { // clarification: https://twitter.com/JeremyECrawford/status/849302527069884416
	name : "Zephyr Strike",
	classes : ["ranger"],
	source : ["UA:SS", 5],
	ritual : false,
	level : 1,
	school : "Trans",
	time : "1 bns",
	range : "Self",
	components : "V",
	duration : "Conc, 1 min",
	description : "Moving doesn't provoke opportunity atks; next wea atk has adv and gives +30 ft speed for that turn",
	descriptionFull : "You move like the wind. For the duration, your movement doesn’t provoke opportunity attacks." + "\n   " + "In addition, the first time you make a weapon attack on your turn before the spell ends, you make the attack roll with advantage, and your speed increases by 30 feet until the end of that turn."
};