/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds a class called the "Witch" and its 5 subclasses
	
				This class has been made by /u/Zarieth on the subbreddit /UnearthedArcana 
				It can be found here: https://www.reddit.com/5dtd1x/
				This code is based on v0.4 of /u/Zarieth's work (2017-03-06)
					
	Code by:	MorePurpleMoreBetter
	Date:		2017-03-10 (sheet v12.86)
*/

//first make the sheet know which spells are witch spells
[	// cantrips
	"blade ward", "chill touch", "friends", "guidance", "light", "mage hand", "mending", "minor illusion", "poison spray", "resistance", "thaumaturgy", "true strike",

	// 1st level
	"animal friendship", "charm person", "cure wounds", "detect magic", "detect poison and disease", "faerie fire", "find familiar", "healing word", "hex", "longstrider", "protection from evil and good", "purify food and drink", "speak with animals", "witch bolt",

	// 2nd level
	"crown of madness", "darkness", "darkvision", "enhance ability", "enthrall", "hold person", "lesser restoration", "locate animals or plants", "locate object", "misty step", "moonbeam", "protection from poison", "ray of enfeeblement", "suggestion",

	// 3rd level
	"conjure animals", "daylight", "dispel magic", "fear", "fly", "magic circle", "major image", "protection from energy", "remove curse", "speak with dead", "spirit guardians", "tongues", "vampiric touch", "water walk",

	// 4th level
	"banishment", "blight", "confusion", "death ward", "dominate beast", "freedom of movement", "hallucinatory terrain", "locate creature", "polymorph", "wall of fire",

	// 5th level
	"animate objects", "antilife shell", "awaken", "contact other plane", "contagion", "dominate person", "dream", "geas", "greater restoration", "hold monster", "insect plague", "legend lore", "mass cure wounds", "modify memory", "planar binding", "reincarnate", "scrying",

	// 6th level
	"circle of death", "conjure fey", "contingency", "eyebite", "find the path", "heal", "mass suggestion", "sunbeam", "true seeing",

	// 7th level
	"etherealness", "finger of death", "mirage arcane", "mordenkainen's magnificent mansion", "plane shift", "regenerate", "sequester", "symbol",

	// 8th level
	"animal shapes", "antipathy/sympathy", "dominate monster", "feeblemind", "power word stun", "sunburst",

	// 9th level
	"astral projection", "foresight", "shapechange", "true polymorph", "true resurrection"
].forEach( function (n) {
	if(SpellsList[n] && SpellsList[n].classes.indexOf("witch (zarieth)") === -1) SpellsList[n].classes.push("witch (zarieth)");
});

ClassList["witch (zarieth)"] = {
	regExpSearch : /witch/i,
	name : "Witch",
	source : ["Z:W", 1],
	primaryAbility : "\n \u2022 Witch: Charisma;",
	abilitySave : 6,
	prereqs : "\n \u2022 Witch: Charisma 13;",
	improvements :  levels.map( function(n) {
		return n < 4 ? 0 : n < 8 ? 1 : n < 12 ? 2 : n < 16 ? 3 : n < 19 ? 4 : 5;
	}),
	die : 6,
	saves : ["Wis", "Cha"],
	skills : ["\n\n" + toUni("Witch") + ": Choose two from Arcana, Animal Handling, History, Insight, Medicine, Nature, and Religion."],
	tools : ["Herbalism kit"],
	armor : [
		[true, false, false, false]
	],
	weapons : [
		[true, false]
	],
	equipment : "Witch starting equipment:\n \u2022 A light crossbow and 20 bolts -or- any simple weapon;\n \u2022 A component pouch -or- an athame used as an arcane focus;\n \u2022 A priest's pack -or- a scholar's pack;\n \u2022 Any simple weapon and wo daggers.\n\nAlternatively, choose 3d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Witch Covenant", ["witch (zarieth)-covenant of blood", "witch (zarieth)-covenant of charm", "witch (zarieth)-covenant of ruin", "witch (zarieth)-covenant of shadows", "witch (zarieth)-covenant of unity"]],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : 1,
	spellcastingKnown : {
		cantrips : levels.map( function(n) { return n < 4 ? 3 : n < 10 ? 4 : 5; }),
		spells : "list",
		prepared : true
	},
	features : {
		"spellcasting" : {
			name : "Spellcasting",
			source : ["Z:W", 2],
			minlevel : 1,
			description : desc([
				"I can cast prepared witch cantrips/spells, using Charisma as my spellcasting ability",
				"I can use an athame as a spellcasting focus or something that suits my background",
				"I can cast my prepared witch spells as rituals if they have the ritual tag"
			]),
			additional : levels.map( function(n) { return (n < 4 ? 2 : n < 10 ? 3 : 4) + " cantrips known"; })
		},
		"quickening" : {
			name : "Quickening",
			source : ["Z:W", 3],
			minlevel : 1,
			description : desc([
				"As an action, I can trance to see bound spirits and into the Ethereal Plane up to 60 ft",
				"This requires concentration, up to 1 minute; It also gives adv. on Wis (Insight) checks"
			]),
			action : ["action", ""],
			usages : "Charisma modifier per ",
			usagescalc : "event.value = Math.max(1, tDoc.getField(\"Cha Mod\").value);",
			recovery : "long rest"
		},
		"subclassfeature2" : {
			name : "Witch Covenant",
			source : ["Z:W", 3],
			minlevel : 2,
			description : desc([
				"Choose a Witch Covenant that you belong to and put it in the \"Class\" field",
				"Choose either the Covenant of Blood, Charm, Ruin, Shadows, or the Covenant of Unity"
			])
		},
		"binding rites" : {
			name : "Binding Rites",
			source : ["Z:W", 3],
			minlevel : 2,
			description : desc([
				"With 10 minutes of uninterrupted meditation, I can expend a spell slot to bind a spirit",
				"The spirit's level is as the spell slot used; I can't recover this slot while the spirit is bound",
				"I can choose a spirit from the list on the third page's \"Notes\" section",
				"The amount of active bonds I can have is limited by my level and I can't have duplicates",
				"A spirit has an effect while it is bound and a one-time effect when I choose to release it"
			]),
			additional : levels.map( function(n) {
				if (n < 2) return "";
				return (n < 6 ? 1 : n < 10 ? 2 : n < 14 ? 3 : n < 17 ? 4 : 5) + " spirit bond" + (n < 6 ? " max" : "s max");
			}),
			spirits : [
				"Witch's Spirit Bonds: [releasing a spirit is a bonus action unless otherwise noted]",
				"\u25C6 Agony: I may reroll any damage die that show a 1, keeping the new result",
				"   Release on crit: Roll extra damage dice equal to spirit's level, which deal psychic damage",
				"\u25C6 Desire: Friendly/charmed within 30 ft have disadv. on Wis saves vs. my spells, until it saves",
				"   Release: Creature in 30 ft, Wis save or charmed for 1 min \u00D7 spirit level (ends if damaged)",
				"\u25C6 Empathy: As a reaction when I take damage, do the spirit's level as psychic damage back",
				"   Release as a reaction when I take damage: As above, but adding the damage I took as well",
				"\u25C6 Envy: Whenever I deal damage with an attack or spell, I regain the spirit's level in HP",
				"   Release when I hit with a spell/attack: I gain 5\u00D7 the spirit's level in temp. HP for 24 hours",
				"\u25C6 Fear: I add my proficiency bonus to Cha (Intimidation) checks, or twice if I already did",
				"   Release: Spirit's level of targets in 30 ft, Wis save or frightened for 1 min (save each turn)",
				"\u25C6 Generosity: My healing spells restore an additional 1d6 HP to each creature they affect",
				"   Release: An ally within 30 ft gains 5\u00D7 the spirit's level in temporary HP for 10 minutes",
				"\u25C6 Guilt: As a reaction, I impose disadv. on an attack vs. me; Works 1\u00D7 per min on a creature",
				"   Release: One target in 30 ft has disadv. on all attacks vs. me for the spirit's level in rounds",
				"\u25C6 Hate: When I'm damaged by a creature, I gain adv. on attacks against it on my next turn",
				"   Release when I hit with a spell/attack: I deal +1d6 necrotic damage per the spirit's level",
				"\u25C6 Hunger: I require no food or water",
				"   Release: Spirit's level of targets in 30 ft get level of exhaustion (immune to this for 24 h)",
				"\u25C6 Passion: Spirit's level of d6's that I can spend to add to an attack, check, or saving throw",
				"   Release when rolling an attack/check/save: Adv. on the roll and add the spirit's level to it",
				"\u25C6 Serenity: I only require half the amount of sleep/rest for the same benefits (excl. long rests)",
				"   Release: I'm no longer blinded, deafened, frightened, paralyzed, poisoned, stunned (pick 1)",
				"\u25C6 Sloth: The area in a 10-ft radius around me counts as difficult terrain for my enemies",
				"   Release: Spirit's level of targets within 30 ft can't use their reaction until my next turn",
				"\u25C6 Sorrow: Targets in 30 ft who fail a save vs. my spells take 2\u00D7 spirit's level in psychic dmg",
				"   Release: One target in 30 ft disadv. on its next attack roll, ability check, or saving throw",
				"              If that roll fails, the target takes 1d6 psychic damage per the spirit's level",
				"\u25C6 Valor: I have advantage on saving throws against being frightened",
				"   Release: Spirit's level of targets within 30 ft are no longer frightened",
				"\u25C6 Wonder: As an action, I distract all in 30 ft with my wonder: disadv. on Perception check",
				"   Release when my spell hits or a target fails its save: Target is stunned until my next turn"
			].join("\n"),
			eval : "AddString('Extra.Notes', ClassList['witch (zarieth)'].features['binding rites'].spirits, true); AddAction('bonus action', 'Release Spirit Bond', 'Witch (Binding Rites)'); if(!typePF) { var LayersFld = What('Extra.Layers Remember').split(','); LayersFld[0] = 'notes'; Value('Extra.Layers Remember', LayersFld); LayerVisibilityOptions(false); };",
			removeeval : "RemoveString('Extra.Notes', ClassList['witch (zarieth)'].features['binding rites'].spirits); RemoveAction('bonus action', 'Release Spirit Bond');"
		},
		"spirit ward" : {
			name : "Spirit Ward",
			source : ["Z:W", 3],
			minlevel : 3,
			description : desc([
				"As an action, I can create a spirit ward for 1 min at my location with a radius of 30 ft",
				"While in the area, allies and I can't be charmed, frightened, or possessed by undead",
				"It also grants resistance to damage by incorporeal undead and stabilizes those at 0 HP"
			]),
			usages : 3,
			recovery : levels.map( function(n) {
				if (n < 3) return "";
				return n < 9 ? "long rest" : "short rest";
			}),
			action : ["action", ""]
		},
		"spiritual spellcasting" : {
			name : "Spiritual Spellcasting",
			source : ["Z:W", 3],
			minlevel : 7,
			description : desc([
				"As a bonus action, I dismiss (no release-effect) a spirit to recover a spell slot of its level"
			]),
			action : ["bonus action", ""]
		},
		"channel spell" : {
			name : "Channel Spell",
			source : ["Z:W", 3],
			minlevel : 11,
			description : desc([
				"My spells overcome resistances of undead and creatures I can perceive with quickening"
			])
		},
		"strength of spirit" : {
			name : "Strength of Spirit",
			source : ["Z:W", 3],
			minlevel : 15,
			description : desc([
				"When I finish a long rest, I gain temporary HP based on the spirits I have bonded to me"
			]),
			recovery : levels.map( function(n) { return n < 15 ? "" : n + "\u00D7 bonded spirits"; })
		},
		"familiar spirit" : {
			name : "Familiar Spirit",
			source : ["Z:W", 4],
			minlevel : 18,
			description : desc([
				"With a 10 minute ritual, I can bind a spirit to my familiar with a level of my Cha mod",
				"I gain its effect while my familiar is within 100 ft and it releases when the familiar dies"
			])
		},
		"ghostly step" : {
			name : "Ghostly Step",
			source : ["Z:W", 4],
			minlevel : 20,
			description : desc([
				"As a bonus action, I can project myself beyond the material plane for 1 minute",
				"For the duration, I'm invisible, incorporeal, and have resistance to non-magical damage",
				"In addition, I'm immune to being grappled, paralyzed, petrified, poisoned, or restrained",
				"I can pass through solid objects, but get 1d10 force damage if I end my turn inside one"
			]),
			action : ["bonus action", " (start/end)"],
			usages : 1,
			recovery : "long rest"
		}
	}
};

ClassSubList["witch (zarieth)-covenant of blood"] = {
	regExpSearch : /^(?=.*witch\b)(?=.*\bblood).*$/i,
	subname : "Covenant of Blood",
	source : ["Z:W", 4],
	features : {
		"subclassfeature2" : {
			name : "Awaken the Blood",
			source : ["Z:W", 4],
			minlevel : 2,
			description : desc([
				"When I release a spirit, I can heal myself or someone adjacent to me 5\u00D7 the spirit's level"
			])
		},
		"subclassfeature6" : {
			name : "Sympathetic Magic",
			source : ["Z:W", 4],
			minlevel : 6,
			description : desc([
				"I can increase the range of my single-target spells by adding a material component",
				"The component has to be an article from the target, which is consumed upon casting"
			]),
			additional : levels.map( function(n) { return n < 6 ? "" : n + " miles"; })
		},
		"subclassfeature10" : {
			name : "Blood Binding",
			source : ["Z:W", 4],
			minlevel : 10,
			description : desc([
				"As a reaction when a living creature dies within 30 ft of me, I can bind its soul to me",
				"I choose a spirit and expend a spell slot; It lasts for 24 hours or until I do this again"
			]),
			usages : 1,
			recovery : "long rest",
			action : ["reaction", ""]
		},
		"subclassfeature14" : {
			name : "Call Forth the Flesh",
			source : ["Z:W", 4],
			minlevel : 14,
			description : desc([
				"As an action, I force an incorporeal/ethereal creature to the material plane for 1 min",
				"If it fails a Constitution save, it loses its incorporeality and its conditional immunities"
			]),
			usages : 1,
			recovery : "long rest",
			action : ["action", ""]
		}
	}
};

ClassSubList["witch (zarieth)-covenant of charm"] = {
	regExpSearch : /^(?=.*witch\b)(?=.*\bcharm).*$/i,
	subname : "Covenant of Charm",
	source : ["Z:W", 4],
	features : {
		"subclassfeature2" : {
			name : "In Perfect Trust",
			source : ["Z:W", 4],
			minlevel : 2,
			description : desc([
				"During my quickening, I also get adv. on Cha (Deception) and Cha (Persuasion) checks",
				"As an action, I can have a target in 60 ft make a Wis save or I see its emotional state"
			]),
			usages : 1,
			recovery : "long rest",
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Spirit Token",
			source : ["Z:W", 5],
			minlevel : 6,
			description : desc([
				"As an action, I can temporarily move one of my bound spirits to a token for 24 hours",
				"The token's predetermined recipient gains the spirit's passive benefit while holding it"
			])
		},
		"subclassfeature10" : {
			name : "Of One Heart",
			source : ["Z:W", 5],
			minlevel : 10,
			description : desc([
				"Foes charmed by me are considered charmed by my allies as well",
				"When I release a spirit, allies in 60 ft can't break charms by damage in their next turn"
			])
		},
		"subclassfeature14" : {
			name : "Crux of Desire",
			source : ["Z:W", 5],
			minlevel : 14,
			description : desc([
				"I'm immune to being charmed; I can charm those that are immune (but they get adv.)"
			]),
			save : "Immune to being charmed"
		}
	}
};

ClassSubList["witch (zarieth)-covenant of ruin"] = {
	regExpSearch : /^(?=.*witch\b)(?=.*\bruin).*$/i,
	subname : "Covenant of Ruin",
	source : ["Z:W", 5],
	features : {
		"subclassfeature2" : {
			name : "Doom",
			source : ["Z:W", 5],
			minlevel : 2,
			description : desc([
				"Targets of one of my released spirits have disadv. on their next attack, check, or save"
			])
		},
		"subclassfeature6" : {
			name : "Devastating Release",
			source : ["Z:W", 5],
			minlevel : 6,
			description : desc([
				"When I release a spirit, enemies in 30 ft take 1d6 psychic damage per the spirit's level"
			])
		},
		"subclassfeature10" : {
			name : "Ruinous Ward",
			source : ["Z:W", 5],
			minlevel : 10,
			description : desc([
				"Hostiles that start their turn in the area of my spirit wards take 1d6 psychic damage"
			])
		},
		"subclassfeature14" : {
			name : "Rite of Exorcism",
			source : ["Z:W", 5],
			minlevel : 14,
			description : desc([
				"As an action, I can attempt to exorcize a the soul of a living creature within 30 ft",
				"It takes 5d6 necrotic and 5d6 psychic damage and is stunned until my next turn",
				"If the target succeeds on a Charisma save, it takes only half damage and isn't stunned"
			]),
			usages : 3,
			recovery : "long rest",
			action : ["action", ""]
		}
	}
};

ClassSubList["witch (zarieth)-covenant of shadows"] = {
	regExpSearch : /^(?=.*witch\b)(?=.*\bshadow).*$/i,
	subname : "Covenant of Shadows",
	source : ["Z:W", 5],
	features : {
		"subclassfeature2" : {
			name : "The Shadows Have Eyes",
			source : ["Z:W", 5],
			minlevel : 2,
			description : desc([
				"While I have at least 1 bound spirit, I can see 120 ft in magical and normal darkness",
				"With at least 2 bound spirits, I have adv. on Wis (Perception) in dim light and darkness"
			]),
			eval : "AddString('Vision', '120 ft in (non)magical darkness; Adv. Perception in dim light \u0026 darkness', '; ');",
			removeeval : "RemoveString('Vision', '120 ft in (non)magical darkness; Adv. Perception in dim light \u0026 darkness', '; ');"
		},
		"subclassfeature6" : {
			name : "Blinding Shackles",
			source : ["Z:W", 5],
			minlevel : 6,
			description : desc([
				"Targets of one of my released spirits are blinded for 1 turn per the spirit's level"
			])
		},
		"subclassfeature10" : {
			name : "Spirits in the Shadows",
			source : ["Z:W", 6],
			minlevel : 10,
			description : desc([
				"While I have 2 bound spirits, my spells don't need somatic or verbal components"
			])
		},
		"subclassfeature14" : {
			name : "Haunting Shades",
			source : ["Z:W", 6],
			minlevel : 14,
			description : desc([
				"When I release a spirit that targets a hostile, I can have it haunt that target for 1 min",
				"For the duration, the spirit's passive effect continues with the target as its origin",
				"At the end or when I cease concentration, the spirit release effect activates again"
			]),
			usages : 1,
			recovery : "long rest"
		}
	}
};

ClassSubList["witch (zarieth)-covenant of unity"] = {
	regExpSearch : /^(?=.*witch\b)(?=.*\bunity).*$/i,
	subname : "Covenant of Unity",
	source : ["Z:W", 6],
	features : {
		"subclassfeature2" : {
			name : "Ancestral Power",
			source : ["Z:W", 6],
			minlevel : 2,
			description : desc([
				"The DC for my spells increases by half the amount of my bound spirits (rounded down)"
			]),
/*			description : desc([
				"As a reaction when casting a spell, I can dismiss a spirit to increase the spell's power",
				"If the spell requires a save, a single target has disadv. on its save",
				"If the spell requires an attack roll, I get adv. on one attack roll for the spell"
			]),
			action : ["reaction", ""] */
		},
		"subclassfeature6" : {
			name : "Forceful Presence",
			source : ["Z:W", 6],
			minlevel : 6,
			description : desc([
				"I can retain control of a spirit when it is released, keeping it bound instead"
			]),
			usages : "Charisma modifier per ",
			usagescalc : "event.value = Math.max(1, tDoc.getField(\"Cha Mod\").value);",
			recovery : "long rest"
		},
		"subclassfeature10" : {
			name : "Powerful Bonds",
			source : ["Z:W", 6],
			minlevel : 10,
			description : desc([
				"A spirit I bind is considered as being of one level higher than the spell slot used for it"
			])
		},
		"subclassfeature14" : {
			name : "Simulacrum",
			source : ["Z:W", 6],
			minlevel : 14,
			description : desc([
				"When I'm reduced to 0 HP but not killed, I can continue to act by my bound spirits",
				"For 1 round per level of the highest level spirit I have bound, I can act as normal",
				"During this time, I make death saving throws as normal (if not healed)"
			])
		}
	}
};

SourceList["Z:W"] = {
	name : "/u/Zarieth: Witch (v0.4, 6 March 2017)",
	abbreviation : "Z:W",
	group : "Reddit/r/UnearthedArcana",
	url : "https://www.reddit.com/5dtd1x/"
};