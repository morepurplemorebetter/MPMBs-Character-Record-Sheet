/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Class
	Effect:     This script adds the class called "Shadowcaster" with its 4 subclasses ("Nightblade", "Shadowmaster", "Shadowsmith", and "Skiamancer"), and its unique spellcasting system

				This class has been made by /u/lysian09 on the subbreddit /r/DnDHomebrew 

				It can be found here: https://redd.it/8jxi09/

				This code is based on the second post by /u/lysian09 (2018-05-16)
				This has been labelled v0.2 even though /u/lysian09 doesn't use version numbering

	Code by:	MorePurpleMoreBetter
	Date:		2018-07-23 (sheet v12.999)
*/

/*	-WARNING-
	Only include this script if you intend to use the Shadowcaster class!

	This script changes the headers for spell levels regardless if the character has levels in Shadowcaster or if it or its source is set as included or excluded.

	Because this class has such a different spellcasting system, which doesn't really fit with MPMB's Character Record Sheet, a compromise was found:
		Fundamentals are treated as cantrips.
		Apprentice Mysteries are treated as 1st-level spells.
		Initiate Mysteries are treated as 2nd-level spells.
		Master Mysteries are treated as 3rd-level spells.
		You will have to select the option "All spells known regardless of level" in the spell sheet generation dialog for the Shadowcaster for it to work.

	As no multiclassing rules are given in the source, the ones here are an interpretation by MPMB.
*/

var iFileName = "Shadowcaster [/u/lysian09's work, transcribed by MPMB].js";
RequiredSheetVersion(12.999);

SourceList["L:SM"] = {
	name : "/u/lysian09: Shadow Magic (v0.2)",
	abbreviation : "L:SM",
	group : "Reddit/r/DnDHomebrew",
	url : "https://redd.it/8jxi09/",
	date : "2018/05/16"
};

// Create the shadowcaster class
ClassList["shadowcaster"] = {
	regExpSearch : /shadowcaster/i,
	name : "Shadowcaster",
	source : ["L:SM", 1],
	primaryAbility : "\n \u2022 Shadowcaster: Intelligence;",
	abilitySave : 4,
	prereqs : "\n \u2022 Shadowcaster: Intelligence 13;",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 8,
	saves : ["Dex", "Int"],
	skills : ["\n\n" + toUni("Shadowcaster") + ": Choose two from Arcana, History, Insight, Intimidation, Investigation, Perception, Sleight of Hand, and Stealth."],
	armor : [
		[true, false, false, false]
	],
	weapons : [
		[true, false ["rapier", "shortsword"]]
	],
	equipment : "Shadowcaster starting equipment:\n \u2022 A rapier -or- a shortsword;\n \u2022 A dungeoneer's pack -or- an explorer's pack;\n \u2022 A trinket or keepsake touched by the Plane of Shadow.\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Shadowcaster Ideal", []],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	spellcastingFactor : "shadowcaster0",
	spellcastingKnown : {
		cantrips : levels.map(function (n) { return n < 4 ? 2 : n < 8 ? 3 : n < 13 ? 4 : 5; }),
		spells : levels.map(function (n) { return n < 3 ? 2 : n < 5 ? 3 : n < 7 ? 4 : n < 9 ? 7 : n < 10 ? 8 : n < 13 ? 9 : n < 17 ? 11 : 12; })
	},
	features : {
		"shadowcasting" : {
			name : "Shadowcasting",
			source : ["L:SM", 3],
			minlevel : 1,
			description : desc([
				"I can cast known fundamentals/mysteries, using Intelligence as my spellcasting ability",
				"When I gain a level in this class, I can swap a known mystery for one of the same tier"
			]),
			additional : levels.map(function(n) {
				var fundam = (n < 4 ? 2 : n < 8 ? 3 : n < 13 ? 4 : 5) + (n < 13 ? " fundamentals" : " fundam.");
				var appren = "; " + (n < 3 ? 2 : n < 5 ? 3 : n < 7 ? 8 : n < 9 ? 5 : 6) + " apprentice" + (n < 7 ? " mysteries" : "");
				var initia = n < 7 ? "" : "; " + (n < 10 ? 2 : n < 13 ? 3 : 4) + " initiate";
				var master = n < 13 ? "" : "; " + (n < 17 ? 1 : 2) + " master";
				return fundam + appren + initia + master;
			}),
			extraname : "Shadowcaster 1",
			"shadow magic" : {
				name : "Shadow Magic",
				source : ["L:SM", 3],
				description : desc([
					"Fundamentals are like cantrips, and I can cast the ones I known any number of times",
					"Mysteries don't require spell slots, but can be invoked each once per long rest",
					"When invoking a mystery, I can chose one immediate (I) as well as one ongoing (O) effect",
					"Some of a mystery's effects can only be used once I reach a certain level in shadowcaster",
					"For fundamentals and mysteries, the abbreviation SC is used for shadowcaster class level",
					"If the component lists SC with a number, that is the minimum required shadowcaster level",
					"Mysteries otherwise work like casting a spell for things like invisibility, concentration, etc."
				])
			},
			eval : "if (CurrentSpells.shadowcaster) { CurrentSpells.shadowcaster.firstCol = 'ef'; CurrentSpells.shadowcaster.typeList = 2; }; ClassFeatureOptions(['shadowcaster', 'shadowcasting', 'shadow magic', 'extra']);", // make the column headers to "EF" for 'Effect' and select the 'All spells known regardless of level' checkbox by default
			removeeval : "ClassFeatureOptions(['shadowcaster', 'shadowcasting', 'shadow magic', 'extra']);"
		},
		"favored mystery" : {
			name : "Favored Mystery",
			source : ["L:SM", 3],
			minlevel : 1,
			description : desc([
				"By spending 8 hours in meditation, I can select an apprentice mystery I know as favored",
				"A favored mystery can be invoked two times per long rest",
				"In addition, when I finish a short rest, I regain one expended use of a favored mystery"
			]),
			additional : levels.map(function(n) {
				return (n < 10 ? 1 : 2) + " favored apprentice myster" + (n < 10 ? "y" : "ies");
			})
		},
		"subclassfeature2" : {
			name : "Shadowcaster Ideal",
			source : ["L:SM", 4],
			minlevel : 2,
			description : desc([
				"Choose the Shadowcaster Ideal you share your believe with and put it in the \"Class\" field",
				"Choose either the Nightblade, Shadowmaster, Shadowsmith, or Skiamancer"
			])
		},
		"umbral sight" : {
			name : "Umbral Sight",
			source : ["L:SM", 4],
			minlevel : 2,
			description : desc([
				"I gain 30 ft darkvision, or add 30 ft to darkvision if I already had it because of my race",
				"From level 11, I can also see in magical darkness out to 30 ft as if in bright light"
			]),
			additional : levels.map(function(n) {
				return n < 2 ? "" : n < 11 ? "Darkvision 30 ft" : "Devil's Sight 30 ft";
			}),
			vision : [["Darkvision", "fixed 30"], ["Darkvision", "+30"]],
			changeeval : "if (ClassLevelUp.shadowcaster[2] >= 11 && ClassLevelUp.shadowcaster[1] < 11) { processVision(newClassLvl.shadowcaster >= 11, 'Shadowcaster: Umbral Sight', [[\"Devil's sight\", 30]]); }; "
		},
		"cloak of shadows" : {
			name : "Cloak of Shadows",
			source : ["L:SM", 4],
			minlevel : 3,
			description : "",
			additional : levels.map(function(n) {
				return n < 3 ? "" : "Adv. on Dex (Stealth) checks in " + (n < 7 ? "darkness" : "dim light");
			})
		},
		"greater favored mystery" : {
			name : "Greater Favored Mystery",
			source : ["L:SM", 4],
			minlevel : 7,
			description : desc([
				"By spending 8 hours in meditation, I can select an initiate mystery I know as favored",
				"When I finish a short rest, I regain one expended use of a favored initiate mystery"
			])
		},
		"winter's touch" : {
			name : "Winter's Touch",
			source : ["L:SM", 4],
			minlevel : 9,
			description : "\n   " + "I have resistance to cold damage and can survive comfortably in cold environments",
			dmgres : ["Cold"]
		},
		"sustaining shadow" : {
			name : "Sustaining Shadow",
			source : ["L:SM", 4],
			minlevel : 11,
			description : desc([
				"My connection to the plane of shadow reduces the amount of food and sleep I require",
				"In addition, from level 15 onwards, I become immune to disease"
			]),
			additional : levels.map(function(n) {
				return n < 11 ? "" : n < 17 ? "1 meal per week" + (n < 13 ? "" : ", 1 hour sleep per day") : "don't need to eat, sleep, or breathe";
			}),
			changeeval : "if (ClassLevelUp.shadowcaster[2] >= 15 && ClassLevelUp.shadowcaster[1] < 15) { SetProf('savetxt', newClassLvl.shadowcaster >= 15, { immune : ['disease'] }, 'Shadowcaster: Sustaining Shadow'); }; "
		},
		"mastered mysteries" : {
			name : "Mastered Mysteries",
			source : ["L:SM", 4],
			minlevel : 20,
			description : "\n   " + "I can invoke my favored apprentice mysteries any number of times before resting"
		}
	}
};

// Add the subclasses
AddSubClass("shadowcaster", "nightblade", {
	regExpSearch : /nightblade|^(?=.*(dark|night))(?=.*(transmogrifist|ascendant|child)).*$/i,
	subname : "Nightblade",
	source : ["L:SM", 4],
	fullname : "Nightblade",
	features : {
		"subclassfeature2" : {
			name : "Skulking in Shadows",
			source : ["L:SM", 4],
			minlevel : 2,
			description : desc([
				"I gain proficiency with hand crossbows and thieves' tools"
			]),
			toolProfs : [["Thieves' tools", "Dex"]],
			weapons : [false, false, ["hand crossbow"]]
		},
		"subclassfeature2.1" : {
			name : "Sudden Strike",
			source : ["L:SM", 4],
			minlevel : 2,
			description : desc([
				"Once per turn, I can add my Proficiency bonus in cold damage to an attack",
				"This damage is doubled if I have adv. or if a conscious ally is within 5 ft of the target"
			]),
			calcChanges : {
				atkAdd : ["fields.Description += (fields.Description ? '; ' : '') + 'Once per turn, +' + How('Proficiency Bonus') + ' cold damage, double if adv. or ally in 5 ft'; }; ", "Once per turn, I can add my Proficiency bonus in cold damage to an attack. This damage is doubled if I have adv. or if a conscious ally is within 5 ft of the target."]
			}
		},
		"subclassfeature6" : {
			name : "Shadow Walk",
			source : ["L:SM", 4],
			minlevel : 6,
			description : desc([
				"While moving on my turn, I can become a shadow until I take an action other than Hide",
				"As a shadow, I can move through spaces up to 1\" wide and I gain adv. on Stealth checks",
				"While a shadow, others have disadv. on attacks and Perception checks vs. me",
				"If I return to my normal form someplace I can't fit in, I take 4d6 bludgeoning damage"
			])
		},
		"subclassfeature10" : {
			name : "Fade to Black",
			source : ["L:SM", 4],
			minlevel : 10,
			description : desc([
				"As an action, I can become invisible (as per Invisibility) while in darkness or dim light",
				"This lasts until I use a bonus action to end it, attacks, cast a spell, or go into bright light"
			]),
			action : ["action", ""]
		},
		"subclassfeature14" : {
			name : "Shadow's Grace",
			source : ["L:SM", 5],
			minlevel : 14,
			description : desc([
				"I gain 60 ft fly speed, leave no footprints if I walk, and don't trigger nonmagical traps",
				"Also, I have adv. on Dex saves against seen effects (not blinded/deafened/incapacitated)"
			]),
			speed : { fly : { spd : 60, enc : 50 } },
			savetxt : { text : ["Adv. on Dex saves vs. seen effects"] }
		},
		"subclassfeature18" : {
			name : "Night Form",
			source : ["L:SM", 5],
			minlevel : 18,
			description : desc([
				"As an action, I become incorporeal for 1 minute, giving me the following benefits:",
				"\u2022 I have resistance to all damage except force and can't be restrained or grappled",
				"\u2022 I can see into the Ethereal plane up to 30 ft and move through a space up to 1\" wide",
				"This ends early if I use a bonus action to end it or if I become incapacitated"
			]),
			usages : 1,
			recovery : "short rest",
			action : ["action", ""]
		}
	}
});
AddSubClass("shadowcaster", "shadowmaster", {
	regExpSearch : /shadowmaster/i,
	subname : "Shadowmaster",
	source : ["L:SM", 5],
	fullname : "Shadowmaster",
	features : {
		"subclassfeature2" : {
			name : "Shadow Companion",
			source : ["L:SM", 5],
			minlevel : 2,
			description : desc([
				"I call forth a shadow elemental with a ritual of 8 hours and 50 gp to serve me",
				"This companion serves me as best it can, obeying my commands",
				"It gains several benefits, see the companion page for details"
			]),
			eval : "shadowmasters_companion_functions.add(newClassLvl.shadowcaster);",
			removeeval : "shadowmasters_companion_functions.remove();",
			changeeval : "shadowmasters_companion_functions.update(oldClassLvl.shadowcaster, newClassLvl.shadowcaster);"
		},
		"subclassfeature6" : {
			name : "Combat Prowess",
			source : ["L:SM", 5],
			minlevel : 6,
			description : desc([
				"My shadow companion can, as an action, do a special attack, see the companion page",
				"It can do these special attacks a number of times equal to my Int mod per short rest"
			]),
			usages : "Intelligence modifier per ",
			usagescalc : "event.value = What('Int Mod');",
			recovery : "short rest"
		},
		"subclassfeature10" : {
			name : "Greater Shadow Elemental",
			source : ["L:SM", 6],
			minlevel : 10,
			description : desc([
				"My shadow companion grows large in size and its HD become 1d10 instead of 1d8",
				"Additionally, its speed becomes 40 ft and its touch attacks deal 2d6 damage"
			])
		},
		"subclassfeature14" : {
			name : "Dark Wings",
			source : ["L:SM", 6],
			minlevel : 14,
			description : desc([
				"My companion can, as an action, manifest or dismiss wings that give it a 60 ft fly speed"
			])
		},
		"subclassfeature18" : {
			name : "Breath Weapon",
			source : ["L:SM", 6],
			minlevel : 18,
			description : desc([
				"My shadow companion can, as an action once per short rest, use a breath weapon"
			]),
			usages : 1,
			recovery : "short rest"
		}
	}
});
AddSubClass("shadowcaster", "shadowsmith", {
	regExpSearch : /^(?=.*shadow)(?=.*smith).*$/i,
	subname : "Shadowsmith",
	source : ["L:SM", 5],
	fullname : "Shadowsmith",
	features : {
		"subclassfeature2" : {
			name : "Shadowcraft",
			source : ["L:SM", 6],
			minlevel : 2,
			description : desc([
				"I gain proficiency with smith tools and 3 simple or martial weapons of my choice",
				"As a bonus action, I can create one of these weapons or a solid object (max 5-ft cube)",
				"I can only maintain 1 item like this and it fades 1 minute after it leaves my possession",
				"With ranged weapons created like this, I can create and fire 1 piece of ammo per turn"
			]),
			action : ["bonus action", ""],
			toolProfs : [["Smith's tools"]],
			calcChanges : {
				atkAdd : [
					"if ((/shadowcraft/i).test(WeaponText) && !isSpell) {fields.Proficiency = true; }; ",
					"If I include the word 'Shadowcraft' in the name of a weapon, it gets treated as one of my weapons made by the shadowcraft class feature and I'm automatically proficient with it."
				]
			}
		},
		"subclassfeature6" : {
			name : "Shadow Armory",
			source : ["L:SM", 6],
			minlevel : 6,
			description : desc([
				"My shadowcraft weapons always count as magical for overcoming resistances and the like",
				"As an action, I can add half my Proficiency Bonus to my AC for 1 minute"
			]),
			additional : "1 minute",
			usages : 1,
			recovery : "short rest",
			action : ["action", ""],
			calcChanges : {
				atkAdd : [
					"if ((/shadowcraft/i).test(WeaponText) && !isSpell && fields.Description.indexOf('Counts as magical') === -1 && !thisWeapon[1]) {fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical'; }; ",
					"My shadowcraft weapons count as magical for overcoming resistances and immunities."
				]
			}
		},
		"subclassfeature10" : {
			name : "Chilling Shade",
			source : ["L:SM", 6],
			minlevel : 10,
			description : " ",
			additional : levels.map(function(n) {
				return n < 10 ? "" : "shadowcraft weap. +" + (n < 14 ? 1 : 2) + " to hit, +" + (n < 18 ? 1 : 2) + "d6 cold dmg";
			}),
			calcChanges : {
				atkAdd : [
					"if ((/shadowcraft/i).test(WeaponText) && !isSpell && classes.known.shadowcaster && classes.known.shadowcaster.level) {fields.Description += (fields.Description ? '; ' : '') + '+' + (classes.known.shadowcaster.level < 18 ? 1 : 2) + 'd6 cold damage'; }; ",
					"My shadowcraft weapons add a +1 bonus to their to hit roll (+2 from 14th level onwards) and do an extra +1d6 cold damage (+2d6 from 18th level onwards)."
				],
				atkCalc : [
					"if ((/shadowcraft/i).test(WeaponText) && !isSpell && classes.known.shadowcaster && classes.known.shadowcaster.level) {output.extraHit += classes.known.shadowcaster.level < 14 ? 1 : 2; }; ",
					""
				]
			}
		},
		"subclassfeature14" : {
			name : "Craft Terrain",
			source : ["L:SM", 6],
			minlevel : 14,
			description : desc([
				"As an action, I can create a wall, floor, or a solid object (max 20-ft cube) within 120 ft",
				"The creation lasts for 10 minutes and there are special options for a wall and a floor",
				"A wall is a 10-ft radius sphere or hemispherical dome, or flat with 10\u00D7 10-ft sq panels",
				"  The wall is 1 ft thick, has AC 12, 30 HP, and is vulnerable to radiant damage",
				"  Destroying a 10-ft panel of the wall leaves behind a cloud of magical darkness",
				"  If the wall is created in a creatures space, it takes 5d6 cold damage, Dex save for half",
				"A floor consists of 10\u00D7 10-ft sq panels, which can be angled to form stairs",
				"  It's muffled (Stealth adv.) or jagged (difficult terrain, 2d4 piercing every 5 ft moved)"
			]),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature18" : {
			name : "Shadow Waltz",
			source : ["L:SM", 7],
			minlevel : 18,
			description : desc([
				"As an action, I manifest all three of my shadowcraft weapons within 30 ft for 1 minute",
				"As a bonus action, I can direct all three weapons to fly up to 30 ft and attack once",
				"The attacks use my Intelligence modifier; I can't use the Attack action while this is active"
			]),
			usages : 1,
			recovery : "long rest",
			action : ["action", " (manifest)"],
			eval : "AddAction('bonus action', 'Shadow Waltz (direct weapon)', 'Shadowsmith');",
			removeeval : "RemoveAction('bonus action', 'Shadow Waltz (direct weapon)', 'Shadowsmith');"
		}
	}
});
AddSubClass("shadowcaster", "skiamancer", {
	regExpSearch : /skiamancer/i,
	subname : "Skiamancer",
	source : ["L:SM", 7],
	fullname : "Skiamancer",
	features : {
		"subclassfeature2" : {
			name : "Secrets",
			source : ["L:SM", 7],
			minlevel : 2,
			description : desc([
				"I add my Intelligence mod to the damage I deal with fundamentals or initiate mysteries",
				"I know several secrets, of which I can use one each turn to enhance one of my mysteries",
				"Use the \"Choose Feature\" button above to add a secrets to the third page"
			]),
			calcChanges : {
				atkCalc : ["if (thisWeapon[4].indexOf('shadowcaster') !== -1 && thisWeapon[3] && (/^(0|1)$/).test(SpellsList[thisWeapon[3]].level)) { output.extraDmg += What('Int Mod'); }; ", "My shadowcaster fundamentals and initiate mysteries get my Intelligence modifier added to their damage."]
			},
			additional : levels.map(function (n) {
				return n < 2 ? '' : (n < 6 ? 2 : n < 14 ? 3 : 4) + " secrets known";
			}),
			extraname : "Secret",
			extrachoices : ["Afflicting Mystery", "Elemental Mystery", "Overloaded Mystery", "Positioned Mystery", "Repeating Mystery"],
			"afflicting mystery" : {
				name : "Afflicting Mystery",
				source : ["L:SM", 7],
				description : desc([
					"When I damage a creature with a mystery, I can have it make a Con save or be poisoned",
					"This lasts until the end of my next turn; I can do this only once per creature per mystery"
				])
			},
			"elemental mystery" : {
				name : "Elemental Mystery",
				source : ["L:SM", 7],
				description : desc([
					"When I roll damage for a mystery, I can change the type to acid, cold, lightning, or poison"
				])
			},
			"overloaded mystery" : {
				name : "Overloaded Mystery",
				source : ["L:SM", 7],
				description : desc([
					"When I roll damage for a mystery, I can roll up to three additional damage dice",
					"For each extra die rolled this way I take 2 necrotic damage, ignoring resistance/immunity"
				])
			},
			"positioned mystery" : {
				name : "Positioned Mystery",
				source : ["L:SM", 7],
				description : desc([
					"I can move my shadow to a spot within 30 ft that I can see to invoke a mystery for me",
					"It acts as the origin of the mystery or the ability granted by an ongoing mystery I invoked"
				])
			},
			"repeating mystery" : {
				name : "Repeating Mystery",
				source : ["L:SM", 7],
				description : desc([
					"I can target twice as many creatures with an apprentice or initiate mystery",
					"This only works if the mystery targets one or more creatures, not just me or an area"
				])
			}
		},
		"subclassfeature6" : {
			name : "Additional Favored Mystery",
			source : ["L:SM", 7],
			minlevel : 6,
			description : desc([
				"With 8 hours of meditation, I can select 1 more apprentice mystery I know as favored",
			])
		},
		"subclassfeature10" : {
			name : "Additional Greater Favored Mystery",
			source : ["L:SM", 7],
			minlevel : 10,
			description : desc([
				"With 8 hours of meditation, I can select 1 more initiate mystery I know as favored"
			])
		},
		"subclassfeature14" : {
			name : "Eldritch Disruption",
			source : ["L:SM", 7],
			minlevel : 14,
			description : desc([
				"As an action, I can disrupt the magic of a target within 60 ft that I can see",
				"It must make a Wis save or have disadv. on its spellcasting ability checks and spell attacks",
				"While this lasts, I have adv. on shadowcasting ability checks and spell attacks",
				"The effects ends after 1 minute or if the target is ever more than 120 ft from me"
			]),
			action : ["action", ""],
			usages : 1,
			recovery : "long rest"
		},
		"subclassfeature18" : {
			name : "Channel Shadows",
			source : ["L:SM", 7],
			minlevel : 18,
			description : desc([
				"I become immune to cold damage as I channel shadow magic through my body",
				"While concentrating on a mystery, I have resistance to spells and adv. on saves vs. spells "
			]),
			dmgres : ["Spells (if conc. on mystery)"],
			savetxt : {
				immune : ["cold"],
				adv_vs : ["Spells (if conc. on mystery)"]
			}
		}
	}
});

// Functions for the Shadowmasters' companion
shadowmasters_companion_functions = {
	add : function(slvl) {
		if (slvl < 2) return;
		var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
		var prefix = false;
		if (AScompA) {
			for (var a = 1; a < AScompA.length; a++) {
				if (!What(AScompA[a] + 'Comp.Race')) {
					prefix = AScompA[a];
					break;
				}
			}
		}
		if (!prefix) prefix = DoTemplate('AScomp', 'Add');
		Value(prefix + 'Comp.Race', 'Shadow Elemental');
		Uneditable(prefix + 'Comp.Race');
		var theType = tDoc.getField(prefix + 'Comp.Type');
		theType.readonly = true;
		if (!typePF) theType.textSize = 0;
		theType.value = 'Shadow Com' + (typePF ? "p." : ".");
		for (var a = 1; a <= 3; a++) { // Add proficiency bonus to attacks
			AddToModFld(prefix + 'BlueText.Comp.Use.Attack.' + a + '.Damage Bonus', "oProf", false, "Shadow Companion", "The companion adds the shadowcaster's proficiency bonus (oProf) to the damage of its attacks.");
		}
		var theCompSetting = How(prefix + "Comp.Use.HP.Max").split(",");
		theCompSetting[3] = "fixed";
		tDoc.getField(prefix + "Comp.Use.HP.Max").submitName = theCompSetting.join();
		Value(prefix + "Comp.Desc.Alignment", What("Alignment"));
		AddString(prefix + 'Comp.Use.Features', What(prefix + 'Comp.Use.Traits'), true);
		Value(prefix + 'Comp.Use.Traits', '');
		Value(prefix + 'Cnote.Left', "Shadow Companion (Shadowmaster 2, L:SM 5):" +
			"\n\u2022 Call forth an elemental from the Plane of Shadow by spending 8 hours and 50 gp on a ritual" +
			"\n\u2022 I can have one companion at a time; If it dies, I can do the ritual again to bring it back" +
			"\n\u2022 My companion uses my Proficiency Bonus instead of its own and also adds it to AC & damage" +
			"\n\u2022 My companion gains a Hit Dice for every shadowcaster level I gain after 2nd" +
			"\n\u2022 My companion can divide 2 points among its ability scores (to max 20) whenever I gain an ASI" +
			"\n\u2022 My companion is proficient in two skills and two saving throws of my choice" +
			"\n\u2022 My companion obeys my commands as best it can, or act on its own if I can't command it" +
			"\n\u2022 My companion rolls for initiative and takes actions as normal" +
			"\n\u2022 When I cast a spell with a range of touch, my shadow companion can deliver the spell instead" +
			"\n   It must be within " + (What("Unit System") === "imperial" ? "100 ft" : "30 m") + " of me and it must use its reaction to deliver the spell when I cast it" +
			"\n   It acts as if it cast the spell, but it can use my modifiers for any attack rolls the spell requires"
		);
		// Now go to the companion page and show a pop-up explaining what's happening
		tDoc.getField(prefix + "Comp.Desc.Name").setFocus();
		if (IsNotReset && IsNotImport) {
			app.alert({
				cMsg : "The Shadow Companion has been added to the companion page\n\n" + toUni("Pick Two Skills and Two Saving Throws") + "\nThe Shadow Companion gains proficiency with two skills and two saving throws. Because there is no automation for selecting these proficiencies, please do so manually.\n\n" + toUni("Ability Score Improvements") + "\nThe Shadow Companion gains Ability Score Improvements whenever your character gains them. There is no automation for adding these either, so please don't forget to increase the ability scores for the shadow companion when you get the reminder pop-up that the number of ASIs has changed.\nThe 'Notes' section on the companion page automatically keeps track of how many points you can increase the ability scores and what the base value of those scores are.",
				nIcon : 3,
				cTitle : "Don't forget the Skills, Saving Throws, and Ability Score Improvements!"
			})
		}
	},
	remove : function() {
		var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
		if (AScompA) {
			for (var a = 1; a < AScompA.length; a++) {
				if (What(AScompA[a] + 'Comp.Type').indexOf('Shadow Com') !== -1) {
					DoTemplate("AScomp", "Remove", AScompA[a]);
					return;
				}
			}
		}
	},
	update : function(oldLvl, newLvl) {
		if (newLvl < 2) return;
		// Get the prefix
		var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
		var prefix = false;
		if (AScompA) {
			for (var a = 1; a < AScompA.length; a++) {
				if (What(AScompA[a] + 'Comp.Type').indexOf('Shadow Com') !== -1) {
					prefix = AScompA[a];
					break;
				}
			}
		}
		if (!prefix) return;
		var thisCrea = CurrentCompRace[prefix] && CurrentCompRace[prefix].typeFound === "creature" ? CurrentCompRace[prefix] : false;
		if (!thisCrea) return;

		var theNotes = function (input) {
			var toReturn = "It acts as if it cast the spell, but it can use my modifiers for any attack rolls the spell requires";
			toReturn += input < 6 ? "" : "\n\u2022 As an action, my companion can use Frenzy, Whirlwind, Veil, or Threaten\n   It can do this a number of times per short rest equal to my Intelligence modifier";
			toReturn += input < 10 ? "" : "\n\u2022 My companion becomes a greater elemental, growing large in size and its HD increases to 1d10\n   Additionally, its speed becomes 40 ft and its touch attacks deal 2d6 damage";
			toReturn += input < 14 ? "" : "\n\u2022 My companion can, as an action, manifest or dismiss wings that give it a 60 ft fly speed";
			toReturn += input < 18 ? "" : "\n\u2022 My companion can, as an action once per short rest, use its breath weapon";
			return What("Unit System") === "imperial" ? toReturn : ConvertToMetric(toReturn, 0.5);
		}

		// Update the stats
		var profB = Number(How('Proficiency Bonus'));
		Value(prefix + 'Comp.Use.Proficiency Bonus', profB);
		Value(prefix + 'Comp.Use.AC', 10 + What(prefix + "Comp.Use.Ability.Dex.Mod") + profB);

		// Add the HD
		Value(prefix + "Comp.Use.HD.Level", thisCrea.hd[0] + newLvl - 2);

		if (oldLvl < 10 && newLvl >= 10) { // Update to Greater Shadow Elemental
			Value(prefix + "Comp.Use.HD.Die", 10);
			Value(prefix + "Comp.Use.Speed", What("Unit System") === "imperial" ? "40 ft" : ConvertToMetric("40 ft", 0.5));
			for (var i = 1; i <= 3; i++) {
				if ((/touch/i).test(What(prefix + "Comp.Use.Attack." + i + ".Weapon"))) {
					var theFld = prefix + "BlueText.Comp.Use.Attack." + i + ".Damage Die";
					var theDmgDie = What(theFld);
					Value(theFld, theDmgDie.replace(/1d6/i, "2d6"));
					break;
				}
			}
			PickDropdown(prefix + "Comp.Desc.Size", 2);
		} else if (oldLvl >= 10 && newLvl < 10) { // Remove the Greater Shadow Elemental
			Value(prefix + "Comp.Use.HD.Die", 6);
			Value(prefix + "Comp.Use.Speed", What("Unit System") === "imperial" ? thisCrea.speed : ConvertToMetric(thisCrea.speed, 0.5));
			for (var i = 1; i <= 3; i++) {
				if ((/touch/i).test(What(prefix + "Comp.Use.Attack." + i + ".Weapon"))) {
					var theFld = prefix + "BlueText.Comp.Use.Attack." + i + ".Damage Die";
					var theDmgDie = What(theFld);
					Value(theFld, theDmgDie.replace(/2d6/i, "1d6"));
					break;
				}
			}
			PickDropdown(prefix + "Comp.Desc.Size", thisCrea.size);
		}

		// Update the notes section
		//remove the old ASI line (if any)
		var ASIregex = /whenever I gain an ASI\r.*Currently.+(scores|Cha\))/;
		if ((ASIregex).test(What(prefix + "Cnote.Left"))) {
			ReplaceString(prefix + "Cnote.Left", "whenever I gain an ASI", false, "whenever I gain an ASI\\r.*Currently.+(scores|Cha\\))", true);
		}
		// calc new ASI
		var ASIs = 0;
		for (var aClass in classes.known) {
			var classLvL = Math.min(CurrentClasses[aClass].improvements.length, classes.known[aClass].level);
			ASIs += 2 * CurrentClasses[aClass].improvements[classLvL - 1];
		}
		var ASIstring = function (aCreat) {
			var toReturn = "whenever I gain an ASI\r   Currently, there are " + ASIs + " points ";
			toReturn += aCreat && aCreat.scores ? "(default: " + aCreat.scores[0] + " Str, " + aCreat.scores[1] + " Dex, " + aCreat.scores[2] + " Con, " + aCreat.scores[3] + " Int, " + aCreat.scores[4] + " Wis, " + aCreat.scores[5] + " Cha)" : "to divide among the ability scores";
			return toReturn;
		}
		var oldLvlText = theNotes(oldLvl);
		var newLvlText = theNotes(newLvl);
		if (oldLvlText !== newLvlText) ReplaceString(prefix + "Cnote.Left", newLvlText, false, oldLvlText);
		var creaASI = ASIstring(thisCrea);
		ReplaceString(prefix + "Cnote.Left", creaASI, false, "whenever I gain an ASI");
		
		// Update the features
		var feature6 = "\u25C6 Combat Prowess: As an action, the shadow companion can use one of the following abilities. These can be used a number of times equal to the shadowcaster's Int mod per short rest." +
		"\n \u2022 Frenzy: make two touch attacks against a single target." +
		"\n \u2022 Whirlwind: make a touch attack against each creature within 5 ft." +
		"\n \u2022 Veil: hide in an area of darkness so it is invisible, can't be hit by attacks or spells, but can no longer see outside of the darkness. If the area is replaced with bright light, the shadow companion takes 6d6 radiant damage." +
		"\n \u2022 Threaten: a creature within 30 ft must make a Wis save (shadowcaster's spell save DC) or be scared of the companion. For 1 minute, the target has disadv. on attacks not directed at the companion. At the end of each of its turns, the target can save again. Frighten effect.";
		feature6 = What("Unit System") === "imperial" ? feature6 : ConvertToMetric(feature6, 0.5);
		if (oldLvl < 6 && newLvl >= 6) {
			AddString(prefix + "Comp.Use.Traits", feature6, true);
		} else if (oldLvl >= 6 && newLvl < 6) {
			RemoveString(prefix + "Comp.Use.Traits", feature6, true);
		}
		
		// Update the traits
		var spd = What("Unit System") === "imperial" ? "60 ft" : "20 m";
		var trait14 = "\u25C6 Dark Wings: As an action, the shadow companion can manifest or dismiss a pair of wings that give it flying speed of " + spd + ".";
		var flySpd = (typePF ? "\n" : ", ") + "fly " + spd;
		if (oldLvl < 14 && newLvl >= 14) {
			AddString(prefix + "Comp.Use.Features", trait14, true);
			AddString(prefix + "Comp.Use.Speed", flySpd, false);
		} else if (oldLvl >= 14 && newLvl < 14) {
			RemoveString(prefix + "Comp.Use.Features", trait14, true);
			RemoveString(prefix + "Comp.Use.Speed", flySpd);
		}
		
		// Update the attacks
		if (oldLvl < 18 && newLvl >= 18) {
			for (var i = 1; i <= 3; i++) {
				if (!What(prefix + "Comp.Use.Attack." + i + ".Weapon")) {
					Value(prefix + "Comp.Use.Attack." + i + ".Weapon Selection", "Shadow Breath Weapon");
					break;
				}
			}
		} else if (oldLvl >= 18 && newLvl < 18) {
			for (var i = 1; i <= 3; i++) {
				if ((/^(?=.*shadow)(?=.*breath)(?=.*weapon).*$/i).test(What(prefix + "Comp.Use.Attack." + i + ".Weapon"))) {
					Value(prefix + "Comp.Use.Attack." + i + ".Weapon Selection", "");
				}
			}
		}
	}
}
// Add the shadowmaster companion stats
CreatureList["shadow elemental"] = {
	name : "Shadow Elemental",
	source : ["L:SM", 5],
	size : 3,
	type : "Elemental",
	subtype : "",
	alignment : "Any",
	ac : 12,
	hp : 19,
	hd : [3, 8],
	speed : "30 ft",
	scores : [12, 14, 14, 8, 6, 6],
	saves : ["", "", "", "", "", ""],
	damage_resistances : "cold; bludgeoning, piercing, and slashing from nonmagical weapons",
	condition_immunities : "exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious",
	senses : "Darkvision 60 ft",
	passivePerception : 8,
	languages : "",
	challengeRating : "1",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
		name : "Touch",
		ability : 2,
		damage : [1, 6, "cold"],
		range : "Melee (5 ft)",
		description : ""
	}],
	traits : [{
		name : "False Appearance",
		description : "The elemental can appear as a cloud of black smoke or a seeming solid appearance, passing for an animal of black and gray coloring."
	}, {
		name : "Shadow Form",
		description : "The elemental can enter a hostile's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing."
	}]
};
// Add the shadow companion's breath weapon
WeaponsList["shadow breath weapon"] = {
	regExpSearch : /^(?=.*shadow)(?=.*breath)(?=.*weapon).*$/i,
	name : "Shadow Breath Weapon",
	source : ["L:SM", 6],
	ability : 3,
	type : "Natural",
	damage : [12, 6, "cold"],
	range : "20-ft cone",
	description : "Hits all in area; Con save, success - half damage; Usable only once per short rest",
	abilitytodamage : false,
	dc : true
};

// Create the headers for spellcasting
spellLevelList[0] = "Cantrips / Fundamentals";
spellLevelList[1] = "1st-level / Apprentice Mysteries";
spellLevelList[2] = "2nd-level / Initiate Mysteries";
spellLevelList[3] = "3rd-level / Master Mysteries";
spellSchoolList["\u2014"] = "";

// Fundamentals (cantrips)
SpellsList["black candle"] = {
	name : "Black Candle",
	classes : ["shadowcaster"],
	source : ["L:SM", 9],
	level : 0,
	school : "\u2014",
	time : "1 a",
	range : "Touch",
	components : "S",
	duration : "1 h (D)",
	description : "1 obj up to 10-ft cube sheds dim light 30-ft rad, dimming bright light; cannot have multiple instances",
	descriptionFull : "You touch one object that is no larger than 10 feet in any dimension. Until the mystery ends, the object sheds dim light in a 30-foot radius. Non-magical darkness is lightened in the area, while non-magical bright light is dimmed. Completely covering the object with something opaque blocks the light. The mystery ends if you cast it again or dismiss it as an action.\n   If you target an object held or worn by a hostile creature, that creature must succeed on a Dexterity saving throw to avoid the mystery."
};
SpellsList["conceal"] = {
	name : "Conceal",
	classes : ["shadowcaster"],
	source : ["L:SM", 10],
	level : 0,
	school : "\u2014",
	time : "1 a",
	range : "Touch",
	components : "S",
	duration : "1 h (D)",
	description : "1 obj up to 1 cu ft is hidden; searching for it is with dis. to Investigation and Perception; max 3 active",
	descriptionFull : "An object that you touch, no larger than 1 cubic foot, blurs into indistinct shadows. Any creature searching for the concealed item has disadvantage on Intelligence (investigation) and Wisdom (perception) checks to find it.\n   If you invoke this fundamental multiple times, you can affect up to three objects once each, and you can dismiss such any or all of these effects as an action."
};
SpellsList["dancing shadows"] = {
	name : "Dancing Shadows",
	classes : ["shadowcaster"],
	source : ["L:SM", 10],
	level : 0,
	school : "\u2014",
	time : "1 a",
	range : "30 ft",
	components : "S",
	duration : "1 min",
	description : "5 sq ft harmless shadow shape; animate with 1 action; Int(Investigation) check vs. Spell DC as 1 action",
	descriptionFull : "You create a harmless shape in the shadows on a wall or floor that lasts for the duration. As an action on your turn, you can command the shape to move in a certain way. The shape can be no larger than a 5 foot square.\n   If a creature uses its action to examine the shadow, the creature can determine that it is a magical trick with a successful Intelligence (Investigation) check against your shadow magic save DC."
};
SpellsList["liquid night"] = {
	name : "Liquid Night",
	classes : ["shadowcaster"],
	source : ["L:SM", 16],
	level : 0,
	school : "\u2014",
	time : "1 a",
	range : "Touch",
	components : "S",
	duration : "Instantaneous",
	description : "Fill a container with enough ink for a single page or write up to 10 words on a surface",
	descriptionFull : "You reach into nearby shadows and pull out a small supply of ink. As an action, you can fill a container with enough ink to fill a single page. You can also create the ink directly on a surface, writing up to ten words with a single invocation of this fundamental."
};
SpellsList["sight obscured"] = {
	name : "Sight Obscured",
	classes : ["shadowcaster"],
	source : ["L:SM", 16],
	level : 0,
	school : "\u2014",
	time : "1 a",
	range : "Touch",
	components : "S",
	duration : "Conc, 1 min",
	description : "1 willing crea can add 1d6 to a Stealth/Sleight of Hand/Deception check after roll, once in duration",
	descriptionFull : "You touch one willing creature. Once before the fundamental ends, the target can roll a d6 and add it to a Dexterity (Stealth), Dexterity (Sleight of hand), or Charisma (Deception) check of their choice. It can roll the die before or after making the ability check. The fundamental then ends."
};
SpellsList["umbral arrow"] = {
	name : "Umbral Arrow",
	classes : ["shadowcaster"],
	source : ["L:SM", 17],
	level : 0,
	school : "\u2014",
	time : "1 a",
	range : "120 ft",
	components : "S",
	duration : "Instantaneous",
	description : "Spell attack for 1d8 Piercing dmg; counts as ranged weapon for sneak atk; +1d8 at CL 5, 11, and 17",
	descriptionFull : "You fire a shard of hardened shadowstuff at a creature within range. Make a ranged shadow magic attack against the target. On a hit, the target takes 1d8 piercing damage. This fundamental counts as a ranged weapon for the sneak attack class feature.\n   This fundamental's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
};
SpellsList["umbral grasp"] = {
	name : "Umbral Grasp",
	classes : ["shadowcaster"],
	source : ["L:SM", 17],
	level : 0,
	school : "\u2014",
	time : "1 a",
	range : "30 ft",
	components : "S",
	duration : "Instantaneous",
	save : "Str",
	description : "1 Large or smaller crea save or pulled 10 ft to you; or 1 obj up to 30 lb pulled 30 ft to you",
	descriptionFull : "You create a long tendril of shadow that lashes out at your command toward a creature or unattended object in range. A large or smaller creature targeted by this fundamental must make a Strength saving throw. On a failure, that creature is pulled up to 10 feet closer to you. An object weighing no more than 30 pounds targeted with this fundamental is pulled up to 30 feet you."
};
WeaponsList["umbral arrow"] = {
	regExpSearch : /^(?=.*umbral)(?=.*arrow).*$/i,
	name : "Umbral Arrow",
	source : ["L:SM", 17],
	list : "spell",
	ability : 4,
	type : "Cantrip",
	damage : ["C", 8, "piercing"],
	range : "120 ft",
	description : "Ranged spell attack, counts as ranged weapon attack for sneak attack (L:SM 17)",
	abilitytodamage : false
};

// Mysteries (spells)
//black magic mystery
SpellsList["black magic"] = {
	name : "Black Magic",
	classes : ["shadowcaster"],
	source : ["L:SM", 9],
	level : 2,
	school : "\u2014",
	time : "1 rea",
	range : "60 ft",
	components : "V,S",
	description : "Cast as a reaction when you see a creature within 60 ft of you cast a spell",
	firstCol : "checkbox",
	dependencies : ["bm1-echo spell", "bm2-warp spell", "bm3-flood of shadow"]
};
SpellsList["bm1-echo spell"] = {
	name : "Echo Spell",
	source : ["L:SM", 9],
	level : 2,
	school : "\u2014",
	time : "1 a",
	duration : "Instantaneous",
	description : "If trigger spell < 4th-lvl and 1 a or 1 bns, you cast it as 1 a on next turn; SC 11: 5th; SC15: 6th; see B",
	descriptionFull : "You reach into the Plane of Shadow for the spiritual reflection a spell that was just cast. If the triggering spell is 4th level or lower and has a casting time of one action or one bonus action, you may use an action on your next turn to cast a copy of it. You choose the spell's targets and make any other choices involved in casting it. You cast it at the same level the triggering spell was cast at. If the echoed spell requires concentration, you may choose to concentrate on it rather than this mystery's ongoing effect. Flood of shadow can't interrupt this spell." + AtHigherLevels + "The level of spells Echo Spell can copy increases to 5th level when you reach shadowcaster level 11 and to 6th level when you reach shadowcaster level 15.",
	firstCol : "I"
};
SpellsList["bm2-warp spell"] = {
	name : "Warp Spell",
	source : ["L:SM", 9],
	level : 2,
	school : "\u2014",
	duration : "Instantaneous",
	description : "If trigger spell < 4th-lvl it fails; if > 4th-lvl, you Int check DC 10+spell lvl to fail; gain appr mys; see B",
	descriptionFull : "You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 4th level or lower, its spell fails and has no effect. If it is casting a spell of 5th level or higher, make an ability check using your shadowcasting ability. The DC equals 10 + the spell's level. On a success, the creature's spell fails and has no effect.\n   When you successfully counter a spell with this effect, you gain one invocation of an apprentice mystery you know. This extra invocation must be used within 1 hour or it is lost.",
	firstCol : "I"
};
SpellsList["bm3-flood of shadow"] = {
	name : "Flood of Shadow",
	source : ["L:SM", 9],
	level : 2,
	school : "\u2014",
	components : "SC 11",
	duration : "Conc, 1 min",
	description : "Crea in 10 ft spellcasting ability checks to cast spells (spell save DC); re-try each turn same spell slot",
	descriptionFull : "You fill the air around you with dense shadow magic, disrupting normal spellcasting. Whenever a creature within 10 feet of you casts a spell, they must make an ability check using their spellcasting ability + their proficiency modifier. The DC for this check is your shadow magic save DC. On a successful check, they cast the spell as normal. On a failed check, the spell is suppressed. They may attempt to finish the spell as an action each turn without expending an additional spell slot. The spell slot is lost if they choose not to attempt to cast the spell.",
	firstCol : "O"
};
//breath of twilight mystery
SpellsList["breath of twilight"] = {
	name : "Breath of Twilight",
	classes : ["shadowcaster"],
	source : ["L:SM", 9],
	level : 3,
	school : "\u2014",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["bot1-winter's crest", "bot2-tormenting darkness", "bot3-ephemeral storm"]
};
SpellsList["bot1-winter's crest"] = {
	name : "Winter's Crest",
	source : ["L:SM", 9],
	level : 3,
	school : "\u2014",
	duration : "Instantaneous",
	save : "Con",
	description : "40-ft radius sphere within range all creatures 12d6 Cold damage; save halves",
	descriptionFull : "A pulse of freezing energy emanates from a point of your choosing within range. Each creature in a 40-foot radius sphere around that point must make a Constitution saving throw, taking 12d6 cold damage on a failed save or half as much damage on a successful save.",
	firstCol : "I"
};
SpellsList["bot2-tormenting darkness"] = {
	name : "Tormenting Darkness",
	source : ["L:SM", 9],
	level : 3,
	school : "\u2014",
	components : "SC 15",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "40-ft rad darkness; all crea save if start turn in sphere or stunned until next turn starts; see book",
	descriptionFull : "Magical darkness fills the 40-foot radius sphere around a point of your choosing within range. Creatures can't see through this darkness, even creatures that can normally see through magical darkness. Nonmagical light, as well as light created by spells of 8th level or lower, can't illuminate the area.\n   Shrieks of agony, gibbering, and howling winds can be heard within the sphere. Whenever a creature starts its turn within the sphere, it must make a Wisdom saving throw. A creature that fails its saving throw is stunned until the start of its next turn.\n   A creature that fails three saving throws becomes insane for 1 minute. A creature that fails five saving throws becomes permanently insane. In both cases, greater restoration can remove this insanity. An insane creature can't take actions, can't understand what other creatures say, can't read, and speaks only in gibberish. The DM controls its movement, which is erratic.",
	firstCol : "O"
};
SpellsList["bot3-ephemeral storm"] = {
	name : "Ephemeral Storm",
	source : ["L:SM", 9],
	level : 3,
	school : "\u2014",
	components : "SC 17",
	duration : "Conc, 1 min",
	save : "Con",
	description : "40-ft rad, all crea at turn start 3d6 Cold + 3d6 Slashing dmg, \u0026 slow (as spell); save half dmg not slow",
	descriptionFull : "Howling winds and jagged shards of shadow fill the 40-foot-radius sphere around a point of your choosing within range. Whenever a creature starts its turn within the sphere, it must make a Constitution saving throw. On a failed save, that creature takes 3d6 cold damage and 3d6 slashing damage and is slowed until the start of thier next turn. On a successful save, a creature takes half as much damage and is not slowed. A creature killed by this damage is frozen and shattered.\n   A slowed creature's speed is halved, it takes a -2 penalty to AC and Dexterity saving throws, and it can't use reactions. On its turn, it can use either an action or a Bonus Action, not both. Regardless of the creature's Abilities or Magic Items, it can't make more than one melee or ranged Attack during its turn.",
	firstCol : "O"
};
//creeping darkness mystery
SpellsList["creeping darkness"] = {
	name : "Creeping Darkness",
	classes : ["shadowcaster"],
	source : ["L:SM", 10],
	level : 1,
	school : "\u2014",
	time : "1 a",
	components : "S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["cd1-trick of the light", "cd2-cloying thoughts", "cd3-smoke screen"]
};
SpellsList["cd1-trick of the light"] = {
	name : "Trick of the Light",
	source : ["L:SM", 10],
	level : 1,
	school : "\u2014",
	range : "Self",
	duration : "Instantaneous",
	description : "You gain advantage on first Stealth, Sleight of Hand, or Deception check before end of your next turn",
	descriptionFull : "When you invoke this mystery, you have advantage on the first Dexterity (Stealth), Dexterity (Sleight of hand), or Charisma (Deception) check you make before the end of your next turn.",
	firstCol : "I"
};
SpellsList["cd2-cloying thoughts"] = {
	name : "Cloying Thoughts",
	source : ["L:SM", 9],
	level : 1,
	school : "\u2014",
	range : "30 ft",
	duration : "Conc, 1 min",
	description : "20-ft rad all crea dis. Investigation/Perception/Insight; 1 a to move fog 10 ft; charm effect; see book",
	descriptionFull : "You create an 20-foot radius sphere of invisible fog that hampers thought, centered on a point within range. All creatures standing in the fog have disadvantage on Intelligence (Investigation), Wisdom (Perception), and Wisdom (Insight) checks. As an action, you can move the fog up to 10 feet.\n   A creature that notices something is wrong can make a Wisdom (Perception) check against your shadow magic save DC to realize it's being mentally effected. Creatures that can't be charmed are immune to this effect.",
	firstCol : "O"
};
SpellsList["cd3-smoke screen"] = {
	name : "Smoke Screen",
	source : ["L:SM", 10],
	level : 1,
	school : "\u2014",
	range : "30 ft",
	components : "SC 3",
	duration : "1 min",
	description : "20-ft rad cloud spreads around corners; heavily obsc.; 1 a to move it 10 ft; 10 mph wind disperses it",
	descriptionFull : "You create a 20-foot radius sphere of black smoke centered on a point within range. The sphere spreads around corners, and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it. As an action, you can move the cloud up to 10 feet.",
	firstCol : "O"
};
//dark mantle mystery
SpellsList["dark mantle"] = {
	name : "Dark Mantle",
	classes : ["shadowcaster"],
	source : ["L:SM", 10],
	level : 1,
	school : "\u2014",
	time : "1 rea",
	range : "Self",
	components : "V,S",
	description : "Cast as a reaction when you are being attacked, but before the attack is rolled",
	firstCol : "checkbox",
	dependencies : ["dm1-steel shadows", "dm2-false visage", "dm3-piercing shadows"]
};
SpellsList["dm1-steel shadows"] = {
	name : "Steel Shadows",
	source : ["L:SM", 10],
	level : 1,
	school : "\u2014",
	duration : "1 rnd",
	description : "Attacks against you, including the triggering attack, have disadvantage until your next turn starts",
	descriptionFull : "The shadows about your form harden for an instant. Until the start of your next turn, attacks against you have disadvantage, including the triggering attack. You must choose to invoke this mystery before the attack is rolled.",
	firstCol : "I"
};
SpellsList["dm2-false visage"] = {
	name : "False Visage",
	source : ["L:SM", 10],
	level : 1,
	school : "\u2014",
	components : "SC 2",
	duration : "Conc, 1 h (D)",
	description : "Alter appearance including everything worn; Changes failed to hold up to physical inspection",
	descriptionFull : "You make yourself \u2014 including your clothing, armor, weapons, and other belongings on your person \u2014 look different until the mystery ends or until you use your action to dismiss it. You can't change your body type, so you must adopt a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you. The changes wrought by this spell fail to hold up to physical inspection.",
	firstCol : "O"
};
SpellsList["dm3-piercing shadows"] = {
	name : "Piercing Shadows",
	source : ["L:SM", 10],
	level : 1,
	school : "\u2014",
	components : "SC 3",
	duration : "Conc, 1 h",
	description : "Creatures attacking you with a melee weapon take 1d6 Piercing dmg; +1d6 at SC 10, 15, and 20",
	descriptionFull : "When a creature strikes you with a melee weapon attack, that creature takes 1d6 piercing damage" + AtHigherLevels + "The damage dealt by piercing shadows increases to 2d6 at level 10, 3d6 at level 15, and 4d6 at level 20.",
	firstCol : "O"
};
//dark mirror mystery
SpellsList["dark mirror"] = {
	name : "Dark Mirror",
	classes : ["shadowcaster"],
	source : ["L:SM", 10],
	level : 1,
	school : "\u2014",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["dm1-control darkness", "dm2-dismiss darkness", "dm3-create darkness"]
};
SpellsList["dm1-control darkness"] = {
	name : "Control Darkness",
	source : ["L:SM", 10],
	level : 1,
	school : "\u2014",
	duration : "Special",
	description : "Control magical darkness (spell lvl < 3) in range (partially); imm. move it, start conc. for its duration",
	descriptionFull : "You attempt to rest control of magical darkness from another creature. Choose an area of magical darkness, some part of which is within range. If the darkness was created by a spell of 2nd level or lower, or by an apprentice tier mystery, you can immediately move the darkness, centered around a point within range. You begin concentrating on that darkness for the remainder of its duration.",
	firstCol : "I"
};
SpellsList["dm1-dismiss darkness"] = {
	name : "Dismiss Darkness",
	source : ["L:SM", 10],
	level : 1,
	school : "\u2014",
	duration : "Instantaneous",
	description : "Dispel magical darkness (partially) in range; If spell lvl > 2, DC 10 + spell lvl ability check to dispel",
	descriptionFull : "You attempt to banish an area of magical darkness back to the Plane of Shadow. Choose an area of magical darkness, some part of which is within range. If the darkness was created by a spell of 2nd level or lower, or by an apprentice tier mystery, that spell or mystery ends. If the darkness was created by a spell of 3rd level or higher, or by an initiate tier mystery or higher, make an ability check using your shadowcaster ability. The DC equals 10 + the spell's level, or 15 for initiate tier mysteries and 18 for master tier mysteries.",
	firstCol : "I"
};
SpellsList["dm3-create darkness"] = {
	name : "Create Darkness",
	source : ["L:SM", 11],
	level : 1,
	school : "\u2014",
	components : "SC 3",
	duration : "Conc, 10 min",
	description : "15-ft radius darkness on point in space or object; darkvision doesn't work in it; moves with object",
	descriptionFull : "Magical darkness spreads from a point you choose within range to fill a 15-foot radius Sphere for the Duration. The darkness spreads around corners. A creature with Darkvision can't see through this darkness, and nonmagical light can't illuminate it.\n   If the point you choose is on an object you are holding or one that isn't being worn or carried, the darkness emanates from the object and moves with it. Completely covering the source of the darkness with an opaque object, such as a bowl or a helm, blocks the darkness.",
	firstCol : "O"
};
//dark reflections mystery
SpellsList["dark reflections"] = {
	name : "Dark Reflections",
	classes : ["shadowcaster"],
	source : ["L:SM", 11],
	level : 2,
	school : "\u2014",
	time : "1 a",
	range : "Self",
	components : "V,S",
	description : "Spells cast like this, if not instantaneous, require concentration and can never last more than 30 min",
	firstCol : "checkbox",
	dependencies : ["dr1-shadow evocation", "dr2-reflection of divinity"]
};
SpellsList["dr1-shadow evocation"] = {
	name : "Shadow Evocation",
	source : ["L:SM", 11],
	level : 2,
	school : "\u2014",
	duration : "Conc, 30 min",
	description : "Cast up to 3rd-lvl evocation wizard spell with 1 a or 1 bns casting time; SC11: 4th-lvl, SC15: 5th-lvl",
	descriptionFull : "You pull a twisted reflection of an evocation spell from the Plane of Shadow. Choose an evocation spell of third level or lower from the wizard's spell list with a casting time of 1 action or 1 bonus action. You cast that spell at third level. You choose the spell's targets and make any other choices involved in casting it." + AtHigherLevels + "The level of spells that can be mimicked increases to 4th level when you reach shadowcaster level 11 and to 5th level when you reach shadowcaster level 15.",
	firstCol : "I"
};
SpellsList["dr2-reflection of divinity"] = {
	name : "Reflection of Divinity",
	source : ["L:SM", 11],
	level : 2,
	school : "\u2014",
	duration : "Conc, 30 min",
	description : "Cast up to 3rd-lvl cleric spell with 1 a or 1 bns casting time; SC11: 4th-lvl, SC15: 5th-lvl",
	descriptionFull : "You pull a twisted reflection of an evocation spell from the Plane of Shadow. Choose an evocation spell of third level or lower from the wizard's spell list with a casting time of 1 action or 1 bonus action. You cast that spell at third level. You choose the spell's targets and make any other choices involved in casting it." + AtHigherLevels + "The level of spells that can be mimicked increases to 4th level when you reach shadowcaster level 11 and to 5th level when you reach shadowcaster level 15.",
	firstCol : "I"
};
//dark terrain mystery
SpellsList["dark terrain"] = {
	name : "Dark Terrain",
	classes : ["shadowcaster"],
	source : ["L:SM", 11],
	level : 1,
	school : "\u2014",
	time : "1 a",
	range : "30 ft",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["dt1-black fire", "dt2-clinging darkness"]
};
SpellsList["dt1-black fire"] = {
	name : "Black Fire",
	source : ["L:SM", 11],
	level : 1,
	school : "\u2014",
	duration : "Conc, 1 min",
	save : "Dex",
	description : "3\u00D7 5-ft square cold fire; crea starting turn in it 2d6 Cold dmg, save halves; +2d6 at SC7, SC11, SC15",
	descriptionFull : "You conjure cold fire across the battlefield. Choose three 5-foot squares within range. Whenever a creature starts its turn within one of those squares, it must make a Dexterity saving throw. A creature takes 2d6 cold damage on a failed save, or half as much on a successful one." + AtHigherLevels + "The damage dealt by Black Fire increases to 4d6 when you reach shadowcaster level 7, to 6d6 when you reach shadowcaster level 11 and to 8d6 when you reach shadowcaster level 15.",
	firstCol : "O"
};
SpellsList["dt2-clinging darkness"] = {
	name : "Clinging Darkness",
	source : ["L:SM", 11],
	level : 1,
	school : "\u2014",
	components : "SC 3",
	duration : "Conc, 1 min",
	save : "Str",
	description : "All that enter or start their turn in 20-ft square save or restrained; Str save as action to escape",
	descriptionFull : "Grasping tendrils of shadow fill a 20-foot square on ground that you can see within range. For the duration, these shadows turn the ground in the area into difficult terrain.\n   When a creature enters the affected area for the first time on a turn or starts its turn there, the creature must succeed on a Strength saving throw or be restrained until the mystery ends.\n   A creature restrained by the shadows can use its action to make a Strength saving throw against your spell save DC. On a success, it frees itself.",
	firstCol : "O"
};
//ebon roads mystery
SpellsList["ebon roads"] = {
	name : "Ebon Roads",
	classes : ["shadowcaster"],
	source : ["L:SM", 11],
	level : 2,
	school : "\u2014",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["er1-step into shadow", "er2-pass into shadow", "er3-voyage into shadow"]
};
SpellsList["er1-step into shadow"] = {
	name : "Step into Shadow",
	source : ["L:SM", 11],
	level : 2,
	school : "\u2014",
	duration : "Instantaneous",
	description : "Teleport yourself and 1 willing crea within 5 ft, up to 300 ft to a place you see, specify, or describe",
	descriptionFull : "You create a conduit through the shadows, travelling to a spot within 300 feet of you. You arrive at exactly the spot desired. It can be a place you can see, one you can visualize, or one you can describe by stating distance and direction, such as 200 feet straight downward or upward to the northwest at a 45-degree angle, 300 feet.\n   You can bring along Objects as long as their weight doesn't exceed what you can carry. This mystery can also transport other willing creatures of your size or smaller who is carrying gear up to its carrying capacity. Those creatures must be within 5 feet of you when you invoke this mystery, and must use their reactions to step through the conduit as it opens.\n   If you would arrive in a place already occupied by an object or a creature, you and any creature traveling with you each take 4d6 force damage, and the mystery fails to move you.",
	firstCol : "I"
};
SpellsList["er2-pass into shadow"] = {
	name : "Pass into Shadow",
	source : ["L:SM", 11],
	level : 2,
	school : "\u2014",
	components : "SC 9",
	duration : "Instantaneous",
	save : "Cha",
	description : "You + 8 willing crea teleport to Plane of Shadows; or spell attack + save to transport 1 crea to it",
	descriptionFull : "You and up to eight willing creatures who link hands are transported to or from the Plane of Shadow. If travelling from the Plane of Shadow to any plane but the Material Plane, you must have an item originating from or tuned to the chosen plane. You can specify a target destination in general terms, such as the City of Brass on the Elemental Plane of Fire or the palace of Dispater on the second level of the Nine Hells, and you appear in or near that destination.\n   You can use this mystery to banish an unwilling creature to the plane of shadow. Choose a creature within your reach and make a melee shadow magic attack against it. On a hit, the creature must make a Charisma saving throw. If the creature fails the save, it is transported to a random location on the Plane of Shadow. A creature so transported must find its own way back to your current plane of existence.",
	firstCol : "I"
};
SpellsList["er3-voyage into shadow"] = {
	name : "Voyage into Shadow",
	source : ["L:SM", 12],
	level : 2,
	school : "\u2014",
	components : "SC 11",
	duration : "8 h (D)",
	description : "You + 8 willing crea move through Shadow plane at 100 mph, return to Material plane at spells end",
	descriptionFull : "You and up to eight willing creatures who link hands move along the border between the Material Plane and the Plane of Shadow for the duration. Traversing along the twisted reflections of the Material Plane is much faster than traveling through mundane means. You and all creatures with you can travel 100 miles each hour. You may move back into the Material Plane at any time, ending the mystery.\n   To use this effect, you must be in an area of dim light or darkness on the Material Plane. While the mystery lasts, you and the creatures travelling with you are unable to interact with creatures or objects on the Material Plane.",
	firstCol : "O"
};
//ebon walls mystery
SpellsList["ebon walls"] = {
	name : "Ebon Walls",
	classes : ["shadowcaster"],
	source : ["L:SM", 12],
	level : 3,
	school : "\u2014",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["ew1-prison of night", "ew2-tomb of night", "ew3-shadow bind"]
};
SpellsList["ew1-prison of night"] = {
	name : "Prison of Night",
	source : ["L:SM", 12],
	level : 3,
	school : "\u2014",
	duration : "Conc, 1 min",
	save : "Con",
	description : "20-ft cube blocks move/spells; extraplanar travel in/out on Cha save; start turn save or 2d6 Cold dmg",
	descriptionFull : "You create a 20 foot cube-shaped prison of shadow around an area you choose within range. The walls of this prison prevent any matter from passing through them and block any spells cast into or out of the area. When you invoke this mystery, any creature that is completely inside the prion's area is trapped. Creatures only partially within the area, or those too large to fit inside the area, are pushed away from the center of the area until they are completely outside the area.\n   A creature inside the prison can't leave it by nonmagical means. If the creature tries to use teleportation or interplanar travel to leave the prison, it must first make a Charisma saving throw. On a success, the creature can use that magic to exit the prison. On a failure, the creature can't exit the prison and wastes the use of the spell or effect. The prison also extends into the Ethereal Plane, blocking ethereal travel.\n   Whenever a creature starts its turn within the prison, it must make a Constitution saving throw. A creature takes 2d6 cold damage on a failed save.",
	firstCol : "O"
};
SpellsList["ew2-tomb of night"] = {
	name : "Tomb of Night",
	source : ["L:SM", 12],
	level : 3,
	school : "\u2014",
	components : "SC 15",
	duration : "Conc, 1 min",
	save : "Cha",
	description : "1 crea save or banished to demiplane and held in stasis; if conc. is held for full duration: see book",
	descriptionFull : "You attempt to send a creature that you can see within range to a harmless demiplane between the Material Plane and the Plane of Shadow. The target must succeed on a Charisma saving throw or be banished.\n   While banished, the target is incapacitated and does not need to eat, drink, or sleep and does not age. If you concentrate on this mystery for the full duration, the creature remains banished. At the end of every 30 days, the creature can repeat its saving throw against this mystery. If it succeeds on its saving throw, the banishment ends and the creature returns to the space it was banished from, or in the nearest unoccupied space if that space is occupied.",
	firstCol : "O"
};
SpellsList["ew3-shadow bind"] = {
	name : "Shadow Bind",
	source : ["L:SM", 12],
	level : 3,
	school : "\u2014",
	components : "SC 17",
	duration : "Conc, 1 min",
	save : "Cha",
	description : "1 crea 20d6 Necrotic dmg and marked; save for half dmg and not marked; if marked and 0 HP: see B",
	descriptionFull : "You channel a pulse of death magic through the shadow of a creature within range. The target must make a Wisdom saving throw. On a failed save, the target takes 20d6 necrotic damage and is marked for the duration of the mystery. On a successful save, the target takes half as much damage and isn't marked.\n   If a creature marked by this mystery would die, it instead becomes incapacitated at 0 hit points and is unable to die for the next minute. During that time, you may use an action to tear the creatures shadow from its body, imprison it with a gemstone worth at least 500gp per Hit Die of the target, and replace it with a shadow of your own making. The creature then regains one hit point and is bound by the mystery. If you do not imprison the creature's shadow within 1 minute, the creature dies.\n   A creature bound with this mystery retains its personality, hit dice, skill proficiencies, and ability scores, but loses all class features and special attacks, such as a dragonborn's breath weapon or a fighter's extra attack. If a spell or ability would charm or frighten the bound creature, the controller of that spell or ability must make an ability check using its spellcasting ability. The DC for this check is your shadow magic save DC. On a failed check, the spell or ability fails.\n   The bound creature does its best to obey the commands of whoever holds the gemstone binding its shadow. When not currently following an order, it defends and preserves itself to the best of its ability. A creature holding its own gemstone can command itself. It can't command itself to become stronger or smarter, but can command itself to perform actions, such as forgetting an event or committing to a decision. A creature that attunes to the gemstone containing its shadow regains its class features and special attacks.\n   If the creature dies, its shadow is pulled from the gemstone and the mystery ends. Dispel magic cast at 9th level, a wish spell, or the Unravel Dweomer effect of the Unbinding Shade mystery invoked by a 17th level shadowcaster can free the creature's shadow by targetting the gemstone. The mystery ends and the creature dies. A gemstone can only have one shadow bound at a time. If you use a gemstone to bind another creature using this mystery, the mystery ends on the first creature and that creature dies.\n   This Mystery can't be used against a creature incapable of casting a shadow, such as a ghost or other incoporeal creature. You can use this mystery to bind your own shadow. When used in this way, you do not have to die while marked.",
	firstCol : "O"
};
//ebon whispers mystery
SpellsList["ebon whispers"] = { // made into Apprentice Mystery as listed on page 8 (makes most sense considering the level requirements)
	name : "Ebon Whispers",
	classes : ["shadowcaster"],
	source : ["L:SM", 13],
	level : 1,
	school : "\u2014",
	time : "1 a",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["ew1-pervasive whisper", "ew2-congress of shadows", "ew3-flicker"]
};
SpellsList["ew1-pervasive whisper"] = {
	name : "Pervasive Whisper",
	source : ["L:SM", 13],
	level : 1,
	school : "\u2014",
	range : "60 ft",
	components : "SC 3",
	duration : "Conc, 1 h",
	save : "Wis",
	description : "1 crea save or follow chosen simple course of action, can't be directly harmful to itself; charm effect",
	descriptionFull : "You whisper directly to a creature's subconscious mind, planting a simple idea. Creatures that can't be charmed are immune. The target must make a Wisdom saving throw. On a failed save, it performs the action. The action can continue for the entire duration. If the activity can be completed in a shorter time, the mystery ends when the subject finishes what it was asked to do. You can not give a creature a command that is directly harmful to it.",
	firstCol : "O"
};
SpellsList["ew2-congress of shadows"] = {
	name : "Congress of Shadows",
	source : ["L:SM", 13],
	level : 1,
	school : "\u2014",
	range : "60 ft",
	components : "SC 3",
	duration : "Conc, 1 h",
	description : "You + 1 crea hear each other; 1 a to hear as other until next turn starts; +2 crea at SC6, 9, 12, and 15",
	descriptionFull : "You open up conduits of shadow between yourself and a creature you can see within range. While the mystery lasts, both you and that creature can hear what the other is saying. Additionally, as an action, you can hear what the other hears until the start of your next turn. During this time, you are deaf in regard to your own senses." + AtHigherLevels + "The number of creatures Congress of Shadows can target increases to 3 when you reach shadowcaster level 6, 5 when you reach shadowcaster level 9, 7 when you reach shadowcaster level 12, and 9 when you reach shadowcaster level 15.",
	firstCol : "O"
};
SpellsList["ew3-flicker"] = {
	name : "Flicker",
	source : ["L:SM", 13],
	level : 1,
	school : "\u2014",
	range : "self",
	components : "SC 3",
	duration : "Conc, 1 h",
	description : "You teleport 15 ft from/to shadow/dim light at cast and as 1 bns each rnd; 1d6 Force dmg if occupied",
	descriptionFull : "You gain the ability to step through conduits of shadow. When you invoke this mystery, and as a bonus action on subsequent turns, you can teleport up to 15 feet. To do this, you must be standing in an area of dim light or shadow.\n   If you would arrive in a place already occupied by an object or a creature, or in a space filled with bright light, you take 1d6 force damage and the mystery fails to teleport you.",
	firstCol : "O"
};
//eclipsed visions mystery
SpellsList["eclipsed visions"] = {
	name : "Eclipsed Visions",
	classes : ["shadowcaster"],
	source : ["L:SM", 13],
	level : 2,
	school : "\u2014",
	range : "30 ft",
	time : "1 a",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["ev1-veil of shadows", "ev2-curtain of shadows", "ev3-shadow play"]
};
SpellsList["ev1-veil of shadows"] = {
	name : "Veil of Shadows",
	source : ["L:SM", 13],
	level : 2,
	school : "\u2014",
	duration : "Conc, 1 h",
	description : "All invisible in 10-ft rad on point or crea; Moves with crea; A crea visible if it leaves, attacks, or casts",
	descriptionFull : "For the duration, all creatures in a 10-footradius sphere centered on a point or willing creature you choose within range become invisible. Anything a creature within the sphere is wearing or carrying is invisible as long as it is on the creature’s person. This mystery ends for a creature when it leaves the area, or when it attacks, casts a spell, or invokes a mystery.\n   If this mystery targets a creature, the sphere moves with that creature.",
	firstCol : "O"
};
SpellsList["ev2-curtain of shadows"] = {
	name : "Curtain of Shadows",
	source : ["L:SM", 13],
	level : 2,
	school : "\u2014",
	duration : "Conc, 1 h",
	save : "Dex",
	description : "60\u00D71\u00D720ft (l\u00D7w\u00D7h) or 10-ft rad wall of darkness; On cast/enter/end turn, 5d8 Cold dmg, save half",
	descriptionMetric : "18\u00D70,3\u00D76m (l\u00D7w\u00D7h) or 3-m rad wall of darkness; On cast/enter/end turn, 5d8 Cold dmg, save half",
	descriptionFull : "You create a wall of shadow on a solid surface within range. You can make the wall up to 60 feet long, 20 feet high, and 1 foot thick, or a ringed wall 20 feet in diameter, 20 feet high, and 1 foot thick. Only creatures that can see in magical darkness can see through the wall. The wall lasts for the duration.\n   When the wall appears, each creature within its area must make a Dexterity saving throw. On a failed save, a creature takes 5d8 cold damage, or half as much damage on a successful save. A creature takes the same damage when it enters the wall for the first time on a turn or ends its turn their.",
	firstCol : "O"
};
SpellsList["ev3-shadow play"] = {
	name : "Shadow Play",
	source : ["L:SM", 13],
	level : 2,
	school : "\u2014",
	components : "SC 9",
	duration : "Conc, 1 h",
	description : "Create perfect illusion of crea; 1 a to command it, if in 100 ft; Investigation check vs. spell DC; see B",
	descriptionFull : "You gather nearby shadows to create a complex illusion of a creature. The creature can be any species or race you have seen, and you control all aspects of its appearance. It appears in a space you can see within range. As an action, you can give the illusion a mental command, which it will follow to the best of its ability. You must be within 100 feet of the illusion to do so.\n   The illusion can speak and mimic the sounds of creatures, and has limited Intelligence. It can't devise a lie on it's own, but it can be instructed to tell a specific lie, and is capable of elaborating without further commands. To do so, it makes an ability check using your Charisma (Deception) modifier.\n   Physical interaction with the image reveals it to be an illusion, because things can pass through it. A creature that uses its action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your shadow magic save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and its other sensory qualities become faint to the creature.",
	firstCol : "O"
};
//elemental shadows mystery
SpellsList["elemental shadows"] = {
	name : "Elemental Shadows",
	classes : ["shadowcaster"],
	source : ["L:SM", 14],
	level : 2,
	school : "\u2014",
	range : "60 ft",
	time : "1 a",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["es1-aura of shade", "es2-dark storm", "es3-winds and tides"]
};
SpellsList["es1-aura of shade"] = {
	name : "Aura of Shade",
	source : ["L:SM", 14],
	level : 2,
	school : "\u2014",
	duration : "Conc, 1 min",
	description : "Any creature within range has resistance to Fire and Cold damage for the duration",
	descriptionFull : "Each creature you choose within range has resistance to fire and cold damage for the duration.",
	firstCol : "O"
};
SpellsList["es2-dark storm"] = {
	name : "Dark Storm",
	source : ["L:SM", 14],
	level : 2,
	school : "\u2014",
	duration : "Conc, 1 min",
	save : "Dex",
	description : "At cast and as 1 a: 3 crea in range 3d6 Lightning and 3d6 Cold dmg; save half; SC11: 5d6, SC15: 7d6",
	descriptionFull : "You fill the air above with dark storm clouds. When you invoke this mystery, choose up to 3 creatures you can see within range. Bolts of black lightning strike the targeted creatures. Each creature targeted must make a Dexterity saving throw. A creature takes 3d6 lightning damage and 3d6 cold damage on a failed save, or half as much damage on a successful one. On each of your turns until the mystery ends, you can use your action to call lightning down in this way again, targeting the same creatures or different ones." + AtHigherLevels + "The damage dark storm deals increases to 5d6 lightning damage and 5d6 cold damage when you reach shadowcaster level 11 and to 7d6 lightning damage and 7d6 cold damage when you reach shadowcaster level 15.",
	firstCol : "O"
};
SpellsList["es3-winds and tides"] = {
	name : "Winds and Tides",
	source : ["L:SM", 14],
	level : 2,
	school : "\u2014",
	duration : "Conc, 1 min",
	description : "Flood (20-ft standing wave), part water, or gust (dis. ranged wea, half move) in 100-ft cube; see book",
	descriptionFull : "For the duration, you can reach into the Plane of Shadow, shaping the reflection of the world around you and manifesting those changes in an area you choose that is a cube up to 100 feet on a side. Choose one of the following effects when you invoke this mystery. As an action on your turn, you can repeat the same effect of choose a different one." + "\n " + toUni("Flood") + ": You cause the water level of all standing water in the area to rise by as much as 20 feet. If the area includes a shore, the flooding water spills over onto dry land. If you choose an area in a large body of water, you instead create a 20-foot tall wave that travels from one side of the area to the other and then crashes down. Any Huge or smaller vehicles in the wave's path are carried with it to the other side. Any Huge or smaller vehicles struck by the wave have a 25 percent chance of capsizing. The water level remains elevated until the spell ends or you choose a different effect. If this effect produced a wave, the wave repeats on the start of your next turn while the flood effect lasts." + "\n " + toUni("Part Water") + ": You cause water in the area to move apart and create a trench. The trench extends across the spell's area, and the separated water forms a wall to either side. The trench remains until the spell ends or you choose a different effect. The water then slowly fills in the trench over the course of the next round until the normal water level is restored." + "\n " + toUni("Gusts") + ": A wind picks up within the cube, continually blowing in a horizontal direction that you choose. You choose the intensity of the wind: calm, moderate, or strong. If the wind is moderate or strong, ranged weapon attacks that that enter of leave the cube or pass through it have disadvantage on their attack rolls. If the wind is strong, any creature moving against the wind must spend 1 extra foot of movement for each foot moved.",
	firstCol : "O"
};
//eyes in the dark mystery
SpellsList["eyes in the dark"] = {
	name : "Eyes in the Dark",
	classes : ["shadowcaster"],
	source : ["L:SM", 14],
	level : 1,
	school : "\u2014",
	time : "1 a",
	components : "V,S",
	description : "If using both Killing Shadows and Bend Perspective, the former can originate from the latter",
	firstCol : "checkbox",
	dependencies : ["eitd1-killing shadows", "eitd2-bend perspective", "eitd3-piercing sight"]
};
SpellsList["eitd1-killing shadows"] = {
	name : "Killing Shadows",
	source : ["L:SM", 14],
	level : 1,
	school : "\u2014",
	range : "20-ft cone",
	duration : "Instantaneous",
	save : "Dex",
	description : "All crea in range 3d6 Cold damage; save halves; SC5: 6d6, SC9: 9d6, SC13: 12d6, SC17: 15d6",
	descriptionFull : "Your eyes blacken as a flood of shadow pours out of them. Each creature in a 20-foot cone must make a Dexterity saving throw. A creature takes 3d6 cold damage on a failed save, or half as much damage on a successful one." + AtHigherLevels + "The damage Killing Shadows deals increases to 6d6 at shadowcaster level 5, to 9d6 at shadowcaster level 9, 12d6 at shadowcaster level 13, and 15d6 at shadowcaster level 17.",
	firstCol : "I"
};
SpellsList["eitd2-bend perspective"] = {
	name : "Bend Perspective",
	source : ["L:SM", 14],
	level : 1,
	school : "\u2014",
	range : "60 ft",
	duration : "Conc, 1 min",
	description : "At cast and as 1 bns, can switch to see from other point within range or back to my own perception",
	descriptionFull : "Your shadow moves about on its own, allowing you to see the world from a different location. When you invoke this mystery and as a bonus action on each of your turns, you can switch between seeing through your own eyes or seeing from a point of your choice within range. If you choose both this effect and Killing Shadows, you can have Killing Shadows originate from the chosen point.",
	firstCol : "O"
};
SpellsList["eitd3-piercing sight"] = {
	name : "Piercing Sight",
	source : ["L:SM", 14],
	level : 1,
	school : "\u2014",
	range : "60 ft",
	duration : "Conc, 1 min",
	description : "1 willing crea gains 60 ft Darkvision and can see both invisible and ethereal out to the same range",
	descriptionFull : "One willing creature of your choice within range gains Darkvision out to 60 feet. Additionally, that creature can see invisible creatures and objects as if they were visible, and can see into the Ethereal Plane. Ethereal creatures and objects appear ghostly and translucent.",
	firstCol : "O"
};
//eyes of the night sky mystery
SpellsList["eyes of the night sky"] = {
	name : "Eyes of the Night Sky",
	classes : ["shadowcaster"],
	source : ["L:SM", 14],
	level : 3,
	school : "\u2014",
	time : "1 a",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["eotns1-truth revealed", "eotns2-peer through the veil", "eotns3-reflections of things to come"]
};
SpellsList["eotns1-truth revealed"] = {
	name : "Truth Revealed",
	source : ["L:SM", 14],
	level : 3,
	school : "\u2014",
	duration : "Conc, 1 h",
	range : "Self",
	description : "Truesight 120 ft; see through illusions, hidden doors, ethereal plane, and see creatures through objects",
	descriptionFull : "You see the world as it is. For the duration, you have truesight, notice secret doors hidden by magic, and can see into the Ethereal Plane, all out to a range of 120 feet. Additionally, you can see any creature within 120 feet, so long as it is not blocked by more than 3 feet of stone, 6 inches of common metal, a thin sheet of lead, or 5 feet of wood or dirt. Creatures appear as a faintly glowing silhouette. Highly alert creatures glow brighter than distracted or sleeping creatures.",
	firstCol : "O"
};
SpellsList["eotns2-peer through the veil"] = {
	name : "Peer Through the Veil",
	source : ["L:SM", 15],
	level : 3,
	school : "\u2014",
	duration : "Conc, 1 h",
	components : "SC 15",
	range : "Unlimited",
	save : "Wis",
	description : "Location or 1 crea save or you see and hear as its shadow; save is modified by factors, see book",
	descriptionFull : "You enter a trance in which you can peer through the shadows on any plane. Focus on a creature. The target must make a Wisdom saving throw, which is modified by how well you know the target, the sort of physical connection you have to it, and the light level the creature is in. If the target is on the same plane as you, it has disadvantage on this saving throw. If a target knows you're invoking this mystery, it can fail the saving throw voluntarily if it wants to be observed." + "\n\n" + toUni("Knowledge - Save Modifier") + "\n   Secondhand (you have heard of the target):\t+5" + "\n   Firsthand (you have met the target):\t+0" + "\n   Familiar (you know the target well):\t-5" + "\n\n" + toUni("Connection - Save Modifier") + "\n   Likeness or picture:\t-2" + "\n   Possession or garment:\t-4" + "\n   Body part, lock of hair, bit of nail, or the like:\t-10" + "\n\n" + toUni("Light Level - Save Modifier") + "\n   Bright Light:\t-2" + "\n   Dim Light:\t+0" + "\n   Darkness:\t-2" + "\n\nOn a successful save, the target isn't affected, and you can't use this mystery against it again for 24 hours.\n   On a failed save, you can see and hear through the creature's shadow as if you were there. Their shadow moves with the target as usual, even if it can't be seen. A creature that can see Invisible Objects sees a luminous outline around the shadow.\n   Instead of targeting a creature, you can choose a location you have seen before as the target of this mystery. When you do, you peer through a shadow of the DM's choice at that location.",
	firstCol : "O"
};
SpellsList["eotns3-reflections of things to come"] = {
	name : "Reflections of Things to Come",
	nameShort : "Reflect. Things to Come",
	source : ["L:SM", 15],
	level : 3,
	school : "\u2014",
	duration : "Conc, 1 h",
	range : "Self",
	components : "SC 17",
	description : "Can't be surprised; adv. on atks, checks, saves; atks vs. your have dis.; end as rea vs. atk or save, see B",
	descriptionFull : "You gain a limited ability to see into the immediate future. For the duration, you can't be surprised and have advantage on ability checks, attack rolls, and saving throws. Additionally, other creatures have disadvantage on attacks against you.\n   You can use your reaction to discharge this mystery when you are hit by an attack. If you do, the attack misses instead and the mystery ends. You can also use your reaction to discharge this mystery when you fail a saving throw. If you do, reroll the saving throw and the mystery ends. You must use the new roll.",
	firstCol : "O"
};
//gloaming dreams mystery
SpellsList["gloaming dreams"] = {
	name : "Gloaming Dreams",
	classes : ["shadowcaster"],
	source : ["L:SM", 15],
	level : 1,
	school : "\u2014",
	range : "30 ft",
	time : "1 a",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["gd1-mesmerizing shade", "gd2-sight eclipsed", "gd3-nightfall"]
};
SpellsList["gd1-mesmerizing shade"] = {
	name : "Mesmerizing Shade",
	source : ["L:SM", 15],
	level : 1,
	school : "\u2014",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "1 creature within range must save or have disadvantage on Dexterity saving throws for the duration",
	descriptionFull : "You create a distracting phantom that seems to exist just beyond a creature's vision. Choose one creature that you can see within range to make a Wisdom saving throw. On a failed save, that creature has disadvantage on attack rolls and Dexterity saving throws for the duration.",
	firstCol : "O"
};
SpellsList["gd2-sight eclipsed"] = {
	name : "Sight Eclipsed",
	source : ["L:SM", 15],
	level : 1,
	school : "\u2014",
	duration : "Conc, 1 min",
	components : "SC 3",
	save : "Wis",
	description : "1 creature save or be blinded for the duration; save end of each of its turns to end effect",
	descriptionFull : "You darken a creature's vision, blinding it for a time. Choose one creature that you can see within range to make a Wisdom saving throw. If it fails, the target is blinded for the duration. At the end of each of its turns, the target can make a Wisdom saving throw. On a success, the mystery ends.",
	firstCol : "O"
};
SpellsList["gd3-nightfall"] = {
	name : "Nightfall",
	source : ["L:SM", 15],
	level : 1,
	school : "\u2014",
	duration : "Conc, 1 min",
	components : "SC 5",
	save : "Wis",
	description : "1 crea, at cast and as 1 a for duration, save or fall asleep; 1 a to wake crea; crea wake if taking dmg",
	descriptionFull : "You gain the ability to attack the minds of other creatures directly, filling them with lethargy and lulling them into an unwilling slumber. When you invoke this mystery and as an action on each of your turns until the mystery ends, you can attempt to put a creature within range asleep. The target must make Wisdom saving throw. On a failed save, the creature falls unconscious. It wakes up if it takes any damage or if another creature uses its action to shake the sleeper awake. You can't target a creature that has succeeded a saving throw against this invocation of Gloaming Dreams.",
	firstCol : "O"
};
//heart and soul mystery
SpellsList["heart and soul"] = {
	name : "Heart and Soul",
	classes : ["shadowcaster"],
	source : ["L:SM", 15],
	level : 3,
	school : "\u2014",
	range : "30 ft",
	time : "1 a",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["hs1-scream of anarchy", "hs2-compulsion", "hs3-puppet"]
};
SpellsList["hs1-scream of anarchy"] = {
	name : "Scream of Anarchy",
	source : ["L:SM", 15],
	level : 3,
	school : "\u2014",
	duration : "Instantaneous",
	components : "SC 17",
	save : "Wis",
	description : "20-ft rad all crea save or use its next turn to move up to its speed and attack the nearest creature",
	descriptionFull : "You release a mental shriek, compelling nearby creatures to attack. Each creature within 20 feet of a point you can see within range must make a Wisdom saving throw. On a failed save, a creature uses its next turn to move up to its speed and attack the nearest creature.",
	firstCol : "I"
};
SpellsList["hs2-compulsion"] = {
	name : "Compulsion",
	source : ["L:SM", 15],
	level : 3,
	school : "\u2014",
	duration : "Conc, 1 h",
	save : "Wis",
	description : "1 crea save or charmed and you can give it simple commands telepathically; new save if taking dmg",
	descriptionFull : "You attempt to invade the mind of a humanoid within range. It must succeed on a Wisdom saving throw or be charmed by you for the duration.\n   While the target is charmed, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as Attack that creature, Run over there, or Fetch that object. If the creature completes the order and doesn't receive further direction from you, it defends and preserves itself to the best of its ability.\n   Each time the target takes damage, it makes a new Wisdom saving throw against the mystery. If the saving throw succeeds, the mystery ends.",
	firstCol : "O"
};
SpellsList["hs3-puppet"] = {
	name : "Puppet",
	source : ["L:SM", 16],
	level : 3,
	school : "\u2014",
	duration : "Conc, 1 h",
	components : "SC 15",
	save : "Wis",
	description : "1 crea save or you hide in its shadow and possess it; you can't be targeted and control it fully; see B",
	descriptionFull : "One creature that you can see within range must make a Wisdom saving throw. On a failed save you move to it and hide within its shadow and posses it. While hiding within its shadow, you can not be targeted by any attack, spell, or other effect. Additionally the creature's shadow can not be removed by shining a light on it.\n   While possessing a creature, you control the creature's body, but don't deprive the target of awareness. You see what the creature sees, hear what it hears, and feel what it feels. When the creature takes damage, you must make a Constitution saving throw to concentrate on the mystery as though you had taken the damage.\n   The possession lasts until the creature drops to 0 hit points, you use a bonus action to end it, or the mystery ends. When the possession ends, you appear within 5 feet of the creature in an unoccupied space of your choice. If the possession ends for any reason other than you used a bonus action to end it, you fall prone within that space.",
	firstCol : "O"
};
//investiture of shadow mystery
SpellsList["investiture of shadow"] = {
	name : "Investiture of Shadow",
	classes : ["shadowcaster"],
	source : ["L:SM", 16],
	level : 2,
	school : "\u2014",
	range : "Self",
	time : "1 a",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["ios1-discretion", "ios2-valor"]
};
SpellsList["ios1-discretion"] = {
	name : "Discretion",
	source : ["L:SM", 16],
	level : 2,
	school : "\u2014",
	duration : "Conc, 10 min",
	description : "You are invisible and gain 30 ft fly speed for the duration; end mystery as 1 a and teleport 100 ft",
	descriptionFull : "You gather the shadows about your form, gaining the following benefits for the duration:\n \u2022  You are invisible. Anything you are wearing or carrying is invisible as long as it is on your person.\n \u2022  You have a flying speed of 30 feet.\n \u2022  You can use your action to discharge this mystery. When you do, you teleport to a space within 100 feet of you that you can see and the mystery ends.",
	firstCol : "O"
};
SpellsList["ios2-valor"] = {
	name : "Valor",
	source : ["L:SM", 16],
	level : 2,
	school : "\u2014",
	duration : "Conc, 10 min",
	components : "SC 11",
	save : "Wis",
	description : "Cold imm., Fire/Radiant resist., fly 30 ft, +1d6 Cold dmg on atks; end 1 a: 15 ft all 6d6 Psychic dmg",
	descriptionFull : "You gather the shadows about you into a terrifying winged visage. For the duration you gain the following benefits:\n \u2022  You are immune to cold damage and have resistance to fire and radiant damage.\n \u2022  You have a flying speed of 30 feet.\n \u2022  Your attacks deal an additional 1d6 cold damage.\n \u2022  You can use your action to discharge this mystery. When you do, each creature within 15 feet of you must make a Wisdom saving throw. On a failed saving throw, a creature takes 6d6 psychic damage and is frightened until the end of its next turn.",
	firstCol : "O"
};
//summon shadow mystery
SpellsList["summon shadow"] = {
	name : "Summon Shadow",
	classes : ["shadowcaster"],
	source : ["L:SM", 16],
	level : 1,
	school : "\u2014",
	time : "1 a",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["ss1-freezing grasp", "ss2-transpose shadow", "ss3-doppleganger"]
};
SpellsList["ss1-freezing grasp"] = {
	name : "Freezing Grasp",
	source : ["L:SM", 16],
	level : 1,
	school : "\u2014",
	range : "30 ft",
	duration : "Instantaneous",
	description : "Move shadow 30 ft to unoccupied seen space and use it to make a spell attack for 2d6 Cold dmg",
	descriptionFull : "You move your shadow up to thirty feet to an unoccupied space you can see and make a melee shadow magic attack against one creature within five feet of it. On a successful hit, the target takes 2d6 cold damage." + AtHigherLevels + "The damage dealt by Freezing Grasp increases to 2d6 at shadowcaster level 5, 3d6 at shadowcaster level 9, 4d6 at shadowcaster level 13, and 5d6 at shadowcaster level 17.",
	firstCol : "I"
};
SpellsList["ss2-transpose shadow"] = {
	name : "Transpose Shadow",
	source : ["L:SM", 16],
	level : 1,
	school : "\u2014",
	range : "100 ft",
	duration : "Instantaneous",
	components : "SC 5",
	description : "Switch places with your shadow in range; if used as rea, targeted effects change target accordingly",
	descriptionFull : "You switch places with your shadow. Your shadow must be within 100 feet. When you use this effect as a reaction, any attack or spell that would have targetted you instead targets your shadow, and any attack or spell that would have targetted your shadow instead targets you.",
	firstCol : "I"
};
SpellsList["ss3-doppleganger"] = {
	name : "Doppleganger",
	source : ["L:SM", 16],
	level : 1,
	school : "\u2014",
	range : "30 ft",
	duration : "Conc, 1 min",
	description : "Shadow copy of you in unoccupied space; 1 bns do Freezing Grasp, 1 bns/rea do Transpose Shadow",
	descriptionFull : "You create a shadowy copy of yourself in an unoccupied space that you can see within range. The shadow is an object that has an AC of 10 and hit points equal to half your hit point maximum. If it drops to 0 hp, the mystery ends.\n   While the mystery lasts, you may use a bonus action on each of your turns to use Transpose Shadow or Freezing Grasp. Additionally, you may use Transpose Shadow as a reaction to you or the shadow being targeted by an attack or spell.",
	firstCol : "O"
};
//touch of twilight mystery
SpellsList["touch of twilight"] = {
	name : "Touch of Twilight",
	classes : ["shadowcaster"],
	source : ["L:SM", 16],
	level : 1,
	school : "\u2014",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["tot1-life fades", "tot2-flesh fails", "tot3-spirit falters"]
};
SpellsList["tot1-life fades"] = {
	name : "Life Fades",
	source : ["L:SM", 16],
	level : 1,
	school : "\u2014",
	duration : "Instantaneous",
	save : "Con",
	description : "Melee spell attack 3d8 Necrotic dmg; +2d8 at SC5, 9, 13, 17; SC9: 2 levels of exhaustion, or 1 on save",
	descriptionFull : "Make a melee shadow magic attack against a creature you can reach. On a hit, the target takes 3d8 necrotic damage." + AtHigherLevels + "The damage dealt by Flesh Fails increases to 5d8 at shadowcaster level 5, 7d8 at shadowcaster level 9, 9d8 at shadowcaster level 13, and 11d8 at shadowcaster level 17. Additionally, at shadowcaster level 9, Flesh Fails causes 2 levels of exhaustion, or 1 on a successful saving throw.",
	firstCol : "I"
};
SpellsList["tot2-flesh fails"] = {
	name : "Flesh Fails",
	source : ["L:SM", 17],
	level : 1,
	school : "\u2014",
	duration : "Conc, 1 min",
	save : "Con",
	description : "Crea hit by Life Fades save or 1 level of exhaustion; if conc. for the duration, exhaustion is permanent",
	descriptionFull : "The creature hit by Life Fades must make a Constitution saving throw. On a failed save, the creature gains one level of exhaustion for the duration. If you concentrate for the full duration, the level of exhaustion remains after the mystery ends.",
	firstCol : "O"
};
SpellsList["tot3-spirit falters"] = {
	name : "Spirit Falters",
	source : ["L:SM", 17],
	level : 1,
	school : "\u2014",
	duration : "Conc, 1 min",
	save : "Con",
	description : "Crea hit by Life Fades save or half spd, -2 AC, -2 Dex saves, no rea, only 1 atk; save end of each turn",
	descriptionFull : "The creature hit by Life Fades must make a Constitution saving throw. On a failed save, the creature is slowed for the duration. The creature's speed is halved, it takes a -2 penalty to AC and Dexterity saving throws, and it can't use reactions. Regardless of the creature's abilities or magic items, it can't make more than one melee or ranged attack during its turn.\n   A creature affected by this spell makes another Constitution saving throw at the end of its turn. On a successful save, the mystery ends.",
	firstCol : "O"
};
//umbral mind mystery
SpellsList["umbral mind"] = {
	name : "Umbral Mind",
	classes : ["shadowcaster"],
	source : ["L:SM", 17],
	level : 1,
	school : "\u2014",
	time : "1 rea",
	range : "30 ft",
	components : "S",
	description : "Cast as a reaction when you hear a creature within 30 ft speaking",
	firstCol : "checkbox",
	dependencies : ["um1-pierce lies", "um2-hinder duplicity", "um3-thoughts of shadow"]
};
SpellsList["um1-pierce lies"] = {
	name : "Pierce Lies",
	source : ["L:SM", 17],
	level : 1,
	school : "\u2014",
	duration : "Instantaneous",
	description : "You know if one of the spoken statements, your choice, is the truth or a lie",
	descriptionFull : "When you invoke this mystery, you immediately know if one statement spoken within range was truth or a lie.",
	firstCol : "I"
};
SpellsList["um2-hinder duplicity"] = {
	name : "Hinder Duplicity",
	source : ["L:SM", 17],
	level : 1,
	school : "\u2014",
	duration : "Conc, 1 h",
	description : "All creatures within range, except me, have disadv. on Cha (Deception) and Cha (Intimidation) checks",
	descriptionFull : "For the duration, all other creatures within range have disadvantage on Charisma (Deception) and Charisma (Intimidation) checks.",
	firstCol : "O"
};
SpellsList["um3-thoughts of shadow"] = {
	name : "Thoughts of Shadow",
	source : ["L:SM", 17],
	level : 1,
	school : "\u2014",
	components : "SC 3",
	duration : "Conc, 1 h",
	description : "1 creature gains advantage on either Charisma, Intelligence, or Wisdom checks for the duration",
	descriptionFull : "You bestow one target creature within range with enhanced mental capabilities. For the duration, that creature has advantage on your choice of Charisma, Intelligence, or Wisdom checks.",
	firstCol : "O"
};
//unbinding shade mystery
SpellsList["unbinding shade"] = {
	name : "Unbinding Shade",
	classes : ["shadowcaster"],
	source : ["L:SM", 17],
	level : 2,
	school : "\u2014",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["us1-shadows fade", "tot2-dismiss into darkness", "tot3-unravel dweomer"]
};
SpellsList["us1-shadows fade"] = {
	name : "Shadows Fade",
	source : ["L:SM", 17],
	level : 2,
	school : "\u2014",
	duration : "Instantaneous",
	description : "1 crea all lvl < 3 spells on it end; all lvl > 4 spells end with DC 10+spell level ability check for each",
	descriptionFull : "You touch a creature within reach. Any spell of 4th level or lower and any apprentice tier mystery on the target ends. For each spell of 4th level or higher or Initiate tier mystery, make an ability check using your shadowcasting ability. The DC equals 10+ the spell's level, or 15 for initiate tier mysteries. On a successful check, the spell or mystery ends.",
	firstCol : "I"
};
SpellsList["tot2-dismiss into darkness"] = {
	name : "Dismiss into Darkness",
	source : ["L:SM", 17],
	level : 2,
	school : "\u2014",
	duration : "Instantaneous",
	save : "Cha",
	description : "Melee spell atk vs. celest./elem./fey/fiend/undead; save if hit or sent to home/shadow/feywild plane",
	descriptionFull : "Make a melee shadow magic attack against a celestial, an elemental, a fey, a fiend, or an undead you can reach. On a hit, you attempt to drive the creature back to its home plane. The creature must succeed on a Charisma saving throw or be sent back to its home plane (if it isn't there already). Undead are sent to the Plane of Shadow, and fey are sent to the Feywild.",
	firstCol : "I"
};
SpellsList["tot3-unravel dweomer"] = {
	name : "Unravel Dweomer",
	source : ["L:SM", 17],
	level : 2,
	school : "\u2014",
	duration : "Instantaneous",
	components : "SC 11",
	description : "1 crea remove charm/frighten/petrify/possession effects, and any effects removed by Gr. Restoration",
	descriptionFull : "You touch a creature within reach. Each effect causing the creature to be charmed, frightened, paralyzed, petrified, or possessed ends. This effect also ends any spell that says it can be ended by the Greater Restoration spell, such as Feeblemind and Modify Memory.",
	firstCol : "I"
};
//vanishing act mystery
SpellsList["vanishing act"] = {
	name : "Vanishing Act",
	classes : ["shadowcaster"],
	source : ["L:SM", 17],
	level : 1,
	school : "\u2014",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["va1-hide tracks", "va2-hideaway", "va3-silent as a shadow"]
};
SpellsList["va1-hide tracks"] = {
	name : "Hide Tracks",
	source : ["L:SM", 17],
	level : 1,
	school : "\u2014",
	duration : "Instantaneous",
	description : "All footprints, scents, and similar signs of passing within range fade from view",
	descriptionFull : "You release a wave of shadow magic that travels in every direction, blurring the presence of creatures in the area. All footprints, scents, and similar signs of passing within range fade from view.",
	firstCol : "I"
};
SpellsList["va2-hideaway"] = {
	name : "Hideaway",
	source : ["L:SM", 18],
	level : 1,
	school : "\u2014",
	components : "SC 3",
	duration : "Conc, 1 h",
	description : "Create invisible doorway in shadows that leads to extradimensional space for 8 Medium creatures",
	descriptionFull : "You create a small doorway in an area of shadow within range. The doorway looks no different than the area surrounding it, though True Seeing or a similar effect reveals the area as transparent.\n   You can only make the doorway as large as the shadow you touch, and it must be no smaller than a 2 foot square. A creature that walks through the doorway finds themself in a simple extradimensional space. Attacks and spells can't cross through the doorway, but creatures inside can see out of it. The space is large enough to hold eight medium or smaller creatures.\n   The doorway and the area beyond last for the duration. Light can not remove the shadows from the doorway, but can remove the surrounding shadows, revealing the exact location and shape of the doorway. Anything inside the space is ejected to the nearest unoccupied space when the mystery ends.",
	firstCol : "O"
};
SpellsList["va3-silent as a shadow"] = {
	name : "Silent as a Shadow",
	source : ["L:SM", 18],
	level : 1,
	school : "\u2014",
	components : "SC 3",
	duration : "Conc, 1 h",
	description : "Any creature within range gains +10 on Dexterity (Stealth) checks for the duration",
	descriptionFull : "For the duration, each creature you choose within range (including you) has a +10 bonus to Dexterity (Stealth) checks.",
	firstCol : "O"
};
//walk amongst dreams mystery
SpellsList["walk amongst dreams"] = {
	name : "Walk Amongst Dreams",
	classes : ["shadowcaster"],
	source : ["L:SM", 18],
	level : 2,
	school : "\u2014",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	description : "",
	firstCol : "checkbox",
	dependencies : ["wad1-waking sleep", "wad2-dream", "wad3-nightmare"]
};
SpellsList["wad1-waking sleep"] = {
	name : "Waking Sleep",
	source : ["L:SM", 18],
	level : 2,
	school : "\u2014",
	duration : "8 h",
	description : "1 willing crea falls asleep; gains incorporeal, invisible body, 30 ft fly speed, passes through all objects",
	descriptionFull : "One willing creature you touch immediately falls asleep. While asleep, the creature's consciousness leaves its body and exists within an identical but incoporeal dream body. It gains a flying speed of 30 feet and is invisible. It can pass through solid objects, but can not interact with the material world in any way.\n   A creature can use it's action to wake up, ending the mystery. The mystery also ends and the creature wakes if the creature's real body takes damage, or if the dream body is targetted by a dispell magic spell or similar effect.",
	firstCol : "I"
};
SpellsList["wad2-dream"] = {
	name : "Dream",
	source : ["L:SM", 18],
	level : 2,
	school : "\u2014",
	duration : "8 h",
	description : "Crea affected by Walking Sleep can communicate in the dream of a sleeping crea on the same plane",
	descriptionFull : "A creature affected by Waking Sleep can use its action to enter the dreams of another sleeping creature and deliver a message. It can enter the dreams of a target creature it can see, or those of a creature it knows that is asleep on the same plane. The creature appears in the the target's dreams and can converse with the target as long as it remains asleep, through the duration of the mystery. The target recalls the dream perfectly upon waking.",
	firstCol : "O"
};
SpellsList["wad3-nightmare"] = {
	name : "Nightmare",
	source : ["L:SM", 18],
	level : 12,
	school : "\u2014",
	duration : "8 h",
	components : "SC 9",
	save : "Wis",
	description : "Crea with Walking Sleep can enter a sleeping crea dreams as 1 a; target save or no benefit of resting",
	descriptionFull : "A creature affected by Waking Sleep can use its action to enter the dreams of another sleeping creature and create a nightmare. It can enter the dreams of a target creature it can see, or those of a creature it knows that is asleep on the same plane. The creature appears in the the target's dreams as a monstrous entity and can deliver a message of no more than ten words. The target must then make a Wisdom saving throw. On a failed save, the nightmare takes root and lasts for the duration of the target's sleep, preventing it from gaining any benefit from that rest.\n   Once this effect has been used, it can't be used again with the same invocation of this mystery.",
	firstCol : "O"
};
