var ClassList = {
	"barbarian" : {
		regExpSearch : /^((?=.*(marauder|barbarian|viking|(norse|tribes?|clans?)(wo)?m(a|e)n))|((?=.*(warrior|fighter))(?=.*(feral|tribal)))).*$/i,
		name : "Barbarian",
		source : ["P", 46],
		primaryAbility : "\n \u2022 Barbarian: Strength;",
		prereqs : "\n \u2022 Barbarian: Strength 13;",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 12,
		saves : ["Str", "Con"],
		skills : ["\n\n" + toUni("Barbarian") + ": Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival."],
		armor : [
			[true, true, false, true],
			[false, false, false, true]
		],
		weapons : [
			[true, true],
			[true, true]
		],
		equipment : "Barbarian starting equipment:\n \u2022 A greataxe -or- any martial melee weapon;\n \u2022 Two handaxes -or- any simple weapon;\n \u2022 An explorer's pack and four javelins.\n\nAlternatively, choose 2d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Primal Path", ["battlerager", "berserker", "totem warrior"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		features : {
			"rage" : {
				name : "Rage",
				source : ["P", 48],
				minlevel : 1,
				description : "\n   " + "Start/end as bonus action; add damage to melee weapons that use Str; lasts 1 min" + "\n   " + "Adv. on Strength checks/saves (not attacks); resistance to bludgeoning/piercing/slashing" + "\n   " + "Stops if I end turn without attacking or taking damage since last turn, or unconscious",
				additional : levels.map(function (n) {
					if (n < 9) return "+2 melee damage";
					if (n < 16) return "+3 melee damage";
					return "+4 melee damage";
				}),
				usages : [2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, "\u221E\u00D7 per "],
				recovery : "long rest",
				action : ["bonus action", " (start/stop)"],
				eval : "AddResistance(\"Bludgeon. (in rage)\", \"Barbarian (Rage)\"); AddResistance(\"Piercing (in rage)\", \"Barbarian (Rage)\"); AddResistance(\"Slashing (in rage)\", \"Barbarian (Rage)\");",
				removeeval : "RemoveResistance(\"Bludgeon. (in rage)\"); RemoveResistance(\"Piercing (in rage)\"); RemoveResistance(\"Slashing (in rage)\");",
				save : "Adv. on Strength saves in rage",
				calcChanges : {
					atkCalc : ["if (isMeleeWeapon && classes.known.barbarian && classes.known.barbarian.level && (/\\brage\\b/i).test(WeaponText)) {output.extraDmg += function(n){return n < 9 ? 2 : n < 16 ? 3 : 4;}(classes.known.barbarian.level); }; ", "If I include the word 'Rage' in a melee weapon's name or description, the calculation will add my Rage's bonus damage to it."]
				}
			},
			"unarmored defense" : {
				name : "Unarmored Defense",
				source : ["P", 48],
				minlevel : 1,
				description : "\n   " + "Without armor, my AC is 10 + Dexterity modifier + Constitution modifier + shield"
			},
			"reckless attack" : {
				name : "Reckless Attack",
				source : ["P", 48],
				minlevel : 2,
				description : "\n   " + "Adv. on melee weapon attacks during my turn, but attacks vs. me adv. until next turn"
			},
			"danger sense" : {
				name : "Danger Sense",
				source : ["P", 48],
				minlevel : 2,
				description : "\n   " + "Adv. on Dexterity saves against seen effects (not blinded/deafened/incapacitated)",
				save : "Adv. on Dex saves vs. seen effects"
			},
			"subclassfeature3" : {
				name : "Primal Path",
				source : ["P", 48],
				minlevel : 3,
				description : "\n   " + "Choose a Primal Path that shapes the nature of your rage and put it in the \"Class\" field" + "\n   " + "Choose either the Path of the Battlerager, Berserker, or Totem Warrior"
			},
			"fast movement" : {
				name : "Fast Movement",
				source : ["P", 49],
				minlevel : 5,
				description : "\n   " + "I gain +10 ft speed when I'm not wearing heavy armor",
				eval : "ChangeSpeed(10);",
				removeeval : "ChangeSpeed(-10);"
			},
			"feral instinct" : {
				name : "Feral Instinct",
				source : ["P", 49],
				minlevel : 7,
				description : "\n   " + "Adv. on Initiative; I can enter rage to act normally on the first turn when surprised",
				eval : "Checkbox(\"Init Adv\", true, \"Advantage to Initiative checks was gained from Barbarian (Feral Instinct)\");",
				removeeval : "Checkbox(\"Init Adv\", false, \"\");"
			},
			"brutal critical" : {
				name : "Brutal Critical",
				source : ["P", 49],
				minlevel : 9,
				description : "\n   " + "I can roll additional dice for the extra damage on a critical hit with a melee attack",
				additional : levels.map(function (n) {
					if (n < 9) return "";
					if (n < 13) return "1 additional die";
					if (n < 17) return "2 additional die";
					return "3 additional dice";
				}),
				calcChanges : {
					atkAdd : ["if (isMeleeWeapon && classes.known.barbarian && classes.known.barbarian.level > 8 && (/d\\d+/).test(fields.Damage_Die)) {var pExtraCritM = extraCritM ? extraCritM : 0; var extraCritM = pExtraCritM + function(n){return n < 13 ? 1 : n < 17 ? 2 : 3;}(classes.known.barbarian.level); if (pExtraCritM) {fields.Description = fields.Description.replace(pExtraCritM + 'd', extraCritM + 'd'); } else {fields.Description += (fields.Description ? '; ' : '') + extraCritM + fields.Damage_Die.replace(/.*(d\\d+).*/, '$1') + ' extra on a crit in melee'; }; }; ", "My melee attacks roll additional dice on a critical hit."]
				}
			},
			"relentless rage" : {
				name : "Relentless Rage",
				source : ["P", 49],
				minlevel : 11,
				description : " [DC 10 + 5 per try, per short rest]" + "\n   " + "If I drop to 0 HP while raging, I can make a DC 10 Constitution save to stay at 1 HP" + "\n   " + "The DC increases by 5 for every attempt until I finish a short or long rest",
				recovery : "short rest",
				usages : "",
				usagescalc : "var FieldNmbr = parseFloat(event.target.name.slice(-2)); var usages = What(\"Limited Feature Used \" + FieldNmbr); var DCmod = Number(usages) * 5; event.value = (isNaN(Number(usages)) || usages === \"\") ? \"DC\u2003\u2003\" : \"DC \" + Number(10 + DCmod);",
			},
			"persistent rage" : {
				name : "Persistent Rage",
				source : ["P", 49],
				minlevel : 15,
				description : "\n   " + "My rage only lasts less than 1 minute if I fall unconscious or I choose to end it"
			},
			"indomitable might" : {
				name : "Indomitable Might",
				source : ["P", 49],
				minlevel : 18,
				description : "\n   " + "If a Strength check is lower than my Strength score, use Strength score instead"
			},
			"primal champion" : {
				name : "Primal Champion",
				source : ["P", 49],
				minlevel : 20,
				description : "\n   " + "+4 to Strength and Constitution; Their maximums increase to 24"
			}
		}
	},

	"bard" : {
		regExpSearch : /(bard|minstrel|troubadour|jongleur)/i,
		name : "Bard",
		source : ["P", 51],
		primaryAbility : "\n \u2022 Bard: Charisma;",
		abilitySave : 6,
		prereqs : "\n \u2022 Bard: Charisma 13;",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 8,
		saves : ["Dex", "Cha"],
		skills : ["\n\n" + toUni("Bard") + ": Choose any three skills.", "\n\n" + toUni("Multiclass Bard") + ": Choose any one skill."],
		tools : ["Three musical instruments", "One musical instrument"],
		armor : [
			[true, false, false, false],
			[true, false, false, false]
		],
		weapons : [
			[true, false, ["hand crossbow", "longsword", "rapier", "shortsword"]]
		],
		equipment : "Bard starting equipment:\n \u2022 A rapier -or- a longsword -or- any simple weapon;\n \u2022 A diplomat's pack -or- an entertainer's pack;\n \u2022 A lute -or- any other musical instrument\n \u2022 Leather armor and a dagger.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Bard College", ["college of lore", "college of valor"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			spells : [4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 13, 13, 14, 14, 15, 16, 16, 16],
		},
		features : {
			"spellcasting" : {
				name : "Spellcasting",
				source : ["P", 52],
				minlevel : 1,
				description : "\n   " + "I can cast bard cantrips/spells that I know, using Charisma as my spellcasting ability" + "\n   " + "I can use a musical instrument as a spellcasting focus" + "\n   " + "I can cast my known bard spells as rituals if they have the ritual tag",
				additional : ["2 cantrips \u0026 4 spells known", "2 cantrips \u0026 5 spells known", "2 cantrips \u0026 6 spells known", "3 cantrips \u0026 7 spells known", "3 cantrips \u0026 8 spells known", "3 cantrips \u0026 9 spells known", "3 cantrips \u0026 10 spells known", "3 cantrips \u0026 11 spells known", "3 cantrips \u0026 12 spells known", "4 cantrips \u0026 14 spells known", "4 cantrips \u0026 15 spells known", "4 cantrips \u0026 15 spells known", "4 cantrips \u0026 16 spells known", "4 cantrips \u0026 18 spells known", "4 cantrips \u0026 19 spells known", "4 cantrips \u0026 19 spells known", "4 cantrips \u0026 20 spells known", "4 cantrips \u0026 22 spells known", "4 cantrips \u0026 22 spells known", "4 cantrips \u0026 22 spells known"],
			},
			"bardic inspiration" : {
				name : "Bardic Inspiration",
				source : ["P", 53],
				minlevel : 1,
				description : "\n   " + "As a bonus action, a creature in 60 ft that can hear me gets an inspiration die (max 1)" + "\n   " + "For 10 min, the recipient can add it to one ability check, attack roll, or saving throw" + "\n   " + "This addition can be done after seeing the d20 roll, but before knowing the outcome",
				additional : ["d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12", "d12", "d12"],
				usages : "Charisma modifier per ",
				usagescalc : "event.value = Math.max(1, tDoc.getField(\"Cha Mod\").value);",
				recovery : ["long rest", "long rest", "long rest", "long rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest"],
				action : ["bonus action", ""]
			},
			"jack of all trades" : {
				name : "Jack of All Trades",
				source : ["P", 54],
				minlevel : 2,
				description : "\n   " + "I can add half my proficiency bonus to any ability check that doesn't already include it",
				eval : "Checkbox(\"Jack of All Trades\", true);",
				removeeval : "Checkbox(\"Jack of All Trades\", false);"
			},
			"song of rest" : {
				name : "Song of Rest",
				source : ["P", 54],
				minlevel : 2,
				description : "\n   " + "Those that use HD and can hear my performance during a short rest get extra healing",
				additional : ["", "d6", "d6", "d6", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12"]
			},
			"subclassfeature3" : {
				name : "Bard College",
				source : ["P", 54],
				minlevel : 3,
				description : "\n   " + "Choose a College that reflects your personality and put it in the \"Class\" field " + "\n   " + "Choose either the College of Lore or the College of Valor"
			},
			"expertise" : {
				name : "Expertise",
				source : ["P", 54],
				minlevel : 3,
				description : "\n   " + "I gain expertise with two skills I am proficient with; two more at 10th level",
				skillstxt : "\n\n" + toUni("Expertise (Bard 3)") + ": Choose any two skill proficiencies, and two more at 10th level.",
				additional : ["", "", "with two skills", "with two skills", "with two skills", "with two skills", "with two skills", "with two skills", "with two skills", "with four skills", "with four skills", "with four skills", "with four skills", "with four skills", "with four skills", "with four skills", "with four skills", "with four skills", "with four skills", "with four skills"],
			},
			"font of inspiration" : {
				name : "Font of Inspiration",
				source : ["P", 54],
				minlevel : 5,
				description : "\n   " + "I can now also recover my expended Bardic Inspiration uses after a short rest",
			},
			"countercharm" : {
				name : "Countercharm",
				source : ["P", 54],
				minlevel : 6,
				description : "\n   " + "As an action, I can do a performance that lasts until the end of my next turn" + "\n   " + "While it lasts, any friend in earshot \u0026 30 ft has adv. on saves vs. frightened/charmed",
				action : ["action", ""]
			},
			"magical secrets" : {
				name : "Magical Secrets",
				source : ["P", 54],
				minlevel : 10,
				description : "\n   " + "I can add two spells/cantrips from any class to my spells known; +2 at level 14 \u0026 18",
				additional : ["", "", "", "", "", "", "", "", "", "two spells/cantrips", "two spells/cantrips", "two spells/cantrips", "two spells/cantrips", "four spells/cantrips", "four spells/cantrips", "four spells/cantrips", "four spells/cantrips", "six spells/cantrips", "six spells/cantrips", "six spells/cantrips"],
				spellcastingBonus : {
					name : "Magical Secret",
					class : "any",
					times : [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 4, 4, 4, 4, 6, 6, 6],
				},
			},
			"superior inspiration" : {
				name : "Superior Inspiration",
				source : ["P", 54],
				minlevel : 20,
				description : "\n   " + "I regain one use of Bardic Inspiration if I have no more remaining when I roll initiative",
			},
		}
	},

	"cleric" : {
		regExpSearch : /(cleric|priest|clergy|acolyte)/i,
		name : "Cleric",
		source : ["P", 56],
		primaryAbility : "\n \u2022 Cleric: Wisdom;",
		abilitySave : 5,
		prereqs : "\n \u2022 Cleric: Wisdom 13;",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 8,
		saves : ["Wis", "Cha"],
		skills : ["\n\n" + toUni("Cleric") + ": Choose two from History, Insight, Medicine, Persuasion, and Religion."],
		armor : [
			[true, true, false, true],
			[true, true, false, true]
		],
		weapons : [
			[true, false]
		],
		equipment : "Cleric starting equipment:\n \u2022 A mace -or- a warhammer (if proficient);\n \u2022 Scale mail -or- leather armor -or- chain mail (if proficient);\n \u2022 A light crossbow and 20 bolts -or- any simple weapon;\n \u2022 A priest's pack -or- an explorer's pack;\n \u2022 A shield and a holy symbol.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Divine Domain", ["arcana domain", "death domain", "knowledge domain", "life domain", "light domain", "nature domain", "tempest domain", "trickery domain", "war domain"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
			spells : "list",
			prepared : true,
		},
		features : {
			"spellcasting" : {
				name : "Spellcasting",
				source : ["P", 58],
				minlevel : 1,
				description : "\n   " + "I can cast prepared cleric cantrips/spells, using Wisdom as my spellcasting ability" + "\n   " + "I can use a holy symbol as a spellcasting focus" + "\n   " + "I can cast my prepared cleric spells as rituals if they have the ritual tag",
				additional : ["3 cantrips known", "3 cantrips known", "3 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known"],
			},
			"subclassfeature1" : {
				name : "Divine Domain",
				source : ["P", 58],
				minlevel : 1,
				description : "\n   " + "Choose a Domain related to your deity and put it in the \"Class\" field on the first page" + "\n   " + "Choose either Arcana, Death, Life, Light, Nature, Tempest, Trickery, or War Domain",
			},
			"channel divinity" : {
				name : "Channel Divinity",
				source : ["P", 58],
				minlevel : 2,
				description : "\n   " + "I can channel divine energy to cause an effect; the save for this is my cleric spell DC",
				usages : [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
				recovery : "short rest"
			},
			"turn undead" : {
				name : "Channel Divinity: Turn Undead",
				source : ["P", 59],
				minlevel : 2,
				description : desc([
					"As an action, all undead within 30 ft that can see/hear me must make a Wisdom save",
					"If an undead fails this save, it is turned for 1 minute or until it takes any damage",
					"Turned: move away, never within 30 ft of me, no reactions or actions other than Dash",
					"Turned: may Dodge instead of Dash when nowhere to move and unable to escape bonds"
				]),
				action : ["action", ""]
			},
			"destroy undead" : {
				name : "Destroy Undead",
				source : ["P", 59],
				minlevel : 5,
				additional : ["", "", "", "", "CR \u00BD or lower", "CR \u00BD or lower", "CR \u00BD or lower", "CR 1 or lower", "CR 1 or lower", "CR 1 or lower", "CR 2 or lower", "CR 2 or lower", "CR 2 or lower", "CR 3 or lower", "CR 3 or lower", "CR 3 or lower", "CR 4 or lower", "CR 4 or lower", "CR 4 or lower", "CR 4 or lower"],
				description : "\n   " + "An undead up to the CR above that fails its save when I use Turn Undead is destroyed"
			},
			"divine intervention" : {
				name : "Divine Intervention",
				source : ["P", 59],
				minlevel : 10,
				additional : ["", "", "", "", "", "", "", "", "", "10% chance", "11% chance", "12% chance", "13% chance", "14% chance", "15% chance", "16% chance", "17% chance", "18% chance", "19% chance", "100% chance"],
				usages : 1,
				recovery : "long rest",
				description : "\n   " + "As an action, I can implore my deity for help; the DM determines the form of help" + "\n   " + "Without intervention, I can retry after a long rest; otherwise, I have to wait a week",
				action : ["action", ""]
			}
		}
	},

	"druid" : {
		regExpSearch : /(druid|shaman)/i,
		name : "Druid",
		source : ["P", 64],
		primaryAbility : "\n \u2022 Druid: Wisdom;",
		abilitySave : 5,
		prereqs : "\n \u2022 Druid: Wisdom 13;",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 8,
		saves : ["Wis", "Int"],
		skills : ["\n\n" + toUni("Druid") + ": Choose two from Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, and Survival."],
		tools : ["Herbalism kit"],
		armor : [
			[true, true, false, true],
			[true, true, false, true]
		],
		weapons : [
			[false, false, ["club", "dagger", "dart", "javelin", "mace", "quarterstaff", "scimitar", "sickle", "sling", "spear"]]
		],
		equipment : "Druid starting equipment:\n \u2022 A wooden shield -or- any simple weapon;\n \u2022 A scimitar -or- any simple melee weapon;\n \u2022 Leather armor, an explorer's pack, and a druidic focus.\n\nAlternatively, choose 2d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Druid Circle", ["circle of the land", "circle of the moon"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			spells : "list",
			prepared : true,
		},
		features : {
			"druidic" : {
				name : "Druidic",
				source : ["P", 66],
				minlevel : 1,
				description : "\n   " + "I know Druidic; Hidden messages with it can only be understood by who know Druidic",
				eval : "AddLanguage(\"Druidic\", \"being a Druid\");",
				removeeval : "RemoveLanguage(\"Druidic\", \"being a Druid\");"
			},
			"spellcasting" : {
				name : "Spellcasting",
				source : ["P", 66],
				minlevel : 1,
				description : "\n   " + "I can cast prepared druid cantrips/spells, using Wisdom as my spellcasting ability" + "\n   " + "I can use a druidic focus as a spellcasting focus" + "\n   " + "I can cast my prepared druid spells as rituals if they have the ritual tag",
				additional : ["2 cantrips known", "2 cantrips known", "2 cantrips known", "3 cantrips known", "3 cantrips known", "3 cantrips known", "3 cantrips known", "3 cantrips known", "3 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known"],
			},
			"subclassfeature2" : {
				name : "Druid Circle",
				source : ["P", 67],
				minlevel : 2,
				description : "\n   " + "Choose a Circle you can identify with and put it in the \"Class\" field on the first page" + "\n   " + "Choose either the Circle of the Land or the Circle of the Moon",
			},
			"wild shape" : {
				name : "Wild Shape",
				source : ["P", 66],
				minlevel : 2,
				description : "\n   " + "As an action, I assume the shape of a beast I have seen before with the following rules:" + "\n    - " + "I gain all its game statistics except Intelligence, Wisdom, or Charisma" + "\n    - " + "I get its skill/saving throw prof. while keeping my own, using whichever is higher" + "\n    - " + "I assume the beast's HP and HD; I get mine back when I revert back" + "\n    - " + "I can't cast spells in beast form, but transforming doesn't break concentration" + "\n    - " + "I retain features from class, race, etc., but I don't retain special senses" + "\n    - " + "I can choose whether equipment falls to the ground, merges, or stays worn" + "\n    - " + "I revert if out of time or unconscious; if KOd by damage, excess damage carries over",
				usages : [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, "\u221E\u00D7 per "],
				recovery : "short rest",
				additional : ["", "CR 1/4, no fly/swim; 1 hour", "CR 1/4, no fly/swim; 1 hour", "CR 1/2, no fly; 2 hours", "CR 1/2, no fly; 2 hours", "CR 1/2, no fly; 3 hours", "CR 1/2, no fly; 3 hours", "CR 1; 4 hours", "CR 1; 4 hours", "CR 1; 5 hours", "CR 1; 5 hours", "CR 1; 6 hours", "CR 1; 6 hours", "CR 1; 7 hours", "CR 1; 7 hours", "CR 1; 8 hours", "CR 1; 8 hours", "CR 1; 9 hours", "CR 1; 9 hours", "CR 1; 10 hours"],
				action : ["action", " (start)"],
				eval : "AddAction(\"bonus action\", \"Wild Shape (end)\", \"Druid\");",
				removeeval : "RemoveAction(\"bonus action\", \"Wild Shape (end)\", \"Druid\");",
			},
			"timeless body" : {
				name : "Timeless Body",
				source : ["P", 67],
				minlevel : 18,
				description : "\n   " + "I age more slowly, only 1 year for every 10 years that pass",
			},
			"beast spells" : {
				name : "Beast Spells",
				source : ["P", 67],
				minlevel : 18,
				description : "\n   " + "I can perform the somatic and verbal components of druid spells while in a beast shape",
			},
			"archdruid" : {
				name : "Archdruid",
				source : ["P", 67],
				minlevel : 20,
				description : "\n   " + "I can use Wild Shape an unlimited number of times" + "\n   " + "My druid spells don't require verbal, somatic, or free material components",
			},
		}
	},

	"fighter" : {
		regExpSearch : /^(?!.*(dark|green|fey|horned|totem|spiritual|exalted|sacred|holy|divine|nature|odin|thor|nature|natural|green))(?=.*(fighter|warrior|militant|warlord|phalanx|gladiator|trooper)).*$/i,
		name : "Fighter",
		source : ["P", 70],
		primaryAbility : "\n \u2022 Fighter: Strength or Dexterity;",
		prereqs : "\n \u2022 Fighter: Strength 13 or Dexterity 13;",
		die : 10,
		improvements : [0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7],
		saves : ["Str", "Con"],
		skills : ["\n\n" + toUni("Fighter") + ": Choose two from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival."],
		armor : [
			[true, true, true, true],
			[true, true, false, true]
		],
		weapons : [
			[true, true],
			[true, true]
		],
		equipment : "Fighter starting equipment:\n \u2022 Chain mail -or- leather armor, a longbow, and 20 arrows;\n \u2022 A martial weapon and a shield -or- two martial weapons;\n \u2022 A light crossbow and 20 bolts -or- two handaxes;\n \u2022 A dungeoneer's pack -or- an explorer's pack.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Martial Archetype", ["champion", "battle master", "eldritch knight", "purple dragon knight"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4],
		features : {
			"fighting style" : {
				name : "Fighting Style",
				source : ["P", 72],
				minlevel : 1,
				description : "\n   " + "Choose a Fighting Style for the fighter using the \"Choose Feature\" button above",
				choices : ["Archery", "Defense", "Dueling", "Great Weapon Fighting", "Protection", "Two-Weapon Fighting"],
				"archery" : {
					name : "Archery Fighting Style",
					description : "\n   " + "+2 bonus to attack rolls I make with ranged weapons",
					calcChanges : {
						atkCalc : ["if (isRangedWeapon) {output.extraHit += 2; }; ", "My ranged weapons get a +2 bonus on the To Hit."]
					}
				},
				"defense" : {
					name : "Defense Fighting Style",
					description : "\n   " + "+1 bonus to AC when I'm wearing armor",
					eval : "AddACMisc(1, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\", \"CurrentArmour.known && !ArmourList[CurrentArmour.known].type\")",
					removeeval : "AddACMisc(0, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\")"
				},
				"dueling" : {
					name : "Dueling Fighting Style",
					description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons",
					calcChanges : {
						atkCalc : ["var areOffHands = function(n){for(var i=1;i<=n;i++){if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) {return true; }; }; }(FieldNumbers.actions); if (!areOffHands && isMeleeWeapon && !(/\\b(2|two).?hand(ed)?s?\\b/i).test(theWea.description)) {output.extraDmg += 2; }; ", "When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."]
					}
				},
				"great weapon fighting" : {
					name : "Great Weapon Fighting Style",
					description : "\n   " + "Reroll 1 or 2 on damage if wielding two-handed/versatile melee weapon in both hands",
					calcChanges : {
						atkAdd : ["if (isMeleeWeapon && (/\\b(versatile|(2|two).?hand(ed)?s?)\\b/i).test(theWea.description)) {fields.Description += (fields.Description ? '; ' : '') + 'Re-roll 1 or 2 on damage die' + ((/versatile/i).test(fields.Description) ? ' when two-handed' : ''); }; ", "While wielding a two-handed or versatile melee weapon in two hands, I can re-roll a 1 or 2 on any damage die once."]
					}
				},
				"protection" : {
					name : "Protection Fighting Style",
					description : "\n   " + "As a reaction, I can give disadv. on an attack made vs. someone within 5 ft of me" + "\n   " + "I need to be wielding a shield and be able to see the attacker to do this",
					action : ["reaction", ""]
				},
				"two-weapon fighting" : {
					name : "Two-Weapon Fighting Style",
					description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks",
					calcChanges : {
						atkCalc : ["if (isOffHand) {output.modToDmg = true; }; ", "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks."]
					}
				}
			},
			"second wind" : {
				name : "Second Wind",
				source : ["P", 72],
				minlevel : 1,
				description : "\n   " + "As a bonus action, I regain 1d10 + fighter level HP; I can use this once per short rest",
				additional : ["1d10+1", "1d10+2", "1d10+3", "1d10+4", "1d10+5", "1d10+6", "1d10+7", "1d10+8", "1d10+9", "1d10+10", "1d10+11", "1d10+12", "1d10+13", "1d10+14", "1d10+15", "1d10+16", "1d10+17", "1d10+18", "1d10+19", "1d10+20"],
				usages : 1,
				recovery : "short rest",
				action : ["bonus action", ""]
			},
			"action surge" : {
				name : "Action Surge",
				source : ["P", 72],
				minlevel : 2,
				description : "\n   " + "I can take one additional action on my turn on top of my normally allowed actions",
				usages : [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
				recovery : "short rest"
			},
			"subclassfeature3" : {
				name : "Martial Archetype",
				source : ["P", 72],
				minlevel : 3,
				description : "\n   " + "Choose a Martial Archetype you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Champion, Battle Master, Eldritch Knight, or Purple Dragon Knight",
			},
			"indomitable" : {
				name : "Indomitable",
				source : ["P", 72],
				minlevel : 9,
				description : "\n   " + "I can reroll a failed saving throw, but must keep the new result",
				usages : [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
				recovery : "long rest"
			}
		}
	},

	"monk" : {
		regExpSearch : /^((?=.*(monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
		name : "Monk",
		source : ["P", 76],
		primaryAbility : "\n \u2022 Monk: Dexterity and Wisdom;",
		abilitySave : 5,
		prereqs : "\n \u2022 Monk: Dexterity 13 and Wisdom 13;",
		die : 8,
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		saves : ["Str", "Dex"],
		tools : ["One artisan's tool or musical instrument"],
		skills : ["\n\n" + toUni("Monk") + ": Choose two from Acrobatics, Athletics, History, Insight, Religion, and Stealth."],
		armor : [
			[false, false, false, false]
		],
		weapons : [
			[true, false, ["shortsword"]],
			[true, false, ["shortsword"]]
		],
		equipment : "Monk starting equipment:\n \u2022 A shortsword -or- any simple weapon;\n \u2022 A dungeoneer's pack -or- an explorer's pack;\n \u2022 10 darts.\n\nAlternatively, choose 5d4 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Monastic Tradition", ["way of the four elements", "way of the long death", "way of the open hand", "way of shadow", "way of the sun soul"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		features : {
			"unarmored defense" : {
				name : "Unarmored Defense",
				source : ["P", 48],
				minlevel : 1,
				description : "\n   " + "Without armor and no shield, my AC is 10 + Dexterity modifier + Wisdom modifier"
			},
			"martial arts" : {
				name : "Martial Arts",
				source : ["P", 78],
				minlevel : 1,
				description : "\n   " + "Monk weapons: shortsword, simple weapon (not two-handed/heavy), unarmed strike" + "\n   " + "With these, I can use Dex instead of Str and use the Martial Arts damage die" + "\n   " + "When taking an Attack action with these, I get one unarmed strike as a bonus action",
				additional : levels.map(function (n) {
					if (n < 5) return "1d4";
					if (n < 11) return "1d6";
					if (n < 17) return "1d8";
					return "1d10";
				}),
				action : ["bonus action", " (with Attack action)"],
				eval : "AddString(\"Extra.Notes\", \"Monk features:\\n\\u25C6 Lose Unarmored Defense, Martial Arts, and Unarmored Movement with armor\/shields\", true);",
				removeeval : "RemoveString(\"Extra.Notes\", \"Monk features:\\n\\u25C6 Lose Unarmored Defense, Martial Arts, and Unarmored Movement with armor\/shields\", true);",
				calcChanges : {
					atkAdd : ["var monkDie = function(n) {return n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10;}; if (classes.known.monk && classes.known.monk.level && theWea && (theWea.monkweapon || (/shortsword/i).test(theWea.name) || (isMeleeWeapon && (/simple/i).test(theWea.type) && !(/\\b(heavy|(2|two).?hand(ed)?s?)\\b/i).test(theWea.description)))) {var aMonkDie = monkDie(classes.known.monk.level); try {var curDie = eval(fields.Damage_Die.replace('d', '*'));} catch (e) {var curDie = 'x';}; if (isNaN(curDie) || curDie < aMonkDie) {fields.Damage_Die = '1d' + aMonkDie;}; fields.Mod = StrDex;}; ", "I can use either Strength or Dexterity and my Martial Arts damage die in place of the normal damage die for any 'Monk Weapons', which include unarmed strike, shortsword, and any simple melee weapon that is not two-handed or heavy."]
				}
			},
			"ki" : {
				name : "Ki",
				source : ["P", 78],
				minlevel : 2,
				description : "\n   " + "I can spend ki to fuel special actions (see third page)" + "\n   " + "I need to meditate for at least 30 min of a short rest for that short rest to restore ki",
				usages : ["", 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				recovery : "short rest",
				extraname : "Ki Feature",
				"flurry of blows" : {
					name : "Flurry of Blows",
					source : ["P", 78],
					description : " [1 ki point]" + "\n   " + "After taking the Attack action, I can make 2 unarmed attacks as a bonus action",
					action : ["bonus action", " (after Attack action)"]
				},
				"patient defense" : {
					name : "Patient Defense",
					source : ["P", 78],
					description : " [1 ki point]" + "\n   " + "As a bonus action, I can take the Dodge action",
					action : ["bonus action", ""]
				},
				"step of the wind" : {
					name : "Step of the Wind",
					source : ["P", 78],
					description : " [1 ki point]" + "\n   " + "As a bonus action, I can either Dash or Disengage; My jump distance doubles when I do so",
					action : ["bonus action", ""]
				},
				"stunning strike" : {
					name : "Stunning Strike",
					source : ["P", 79],
					description : " [1 ki point]" + "\n   " + "After I hit a creature wit a melee weapon attack, I can spend a ki point to try to stun it" + "\n   " + "It has to succeed on a Con save or be stunned until the end of my next turn"
				},
				eval : "ClassFeatureOptions([\"monk\", \"ki\", \"flurry of blows\", \"extra\"]); ClassFeatureOptions([\"monk\", \"ki\", \"patient defense\", \"extra\"]); ClassFeatureOptions([\"monk\", \"ki\", \"step of the wind\", \"extra\"]);",
				removeeval : "ClassFeatureOptions([\"monk\", \"ki\", \"flurry of blows\", \"extra\"], \"remove\"); ClassFeatureOptions([\"monk\", \"ki\", \"patient defense\", \"extra\"], \"remove\"); ClassFeatureOptions([\"monk\", \"ki\", \"step of the wind\", \"extra\"], \"remove\");",
				changeeval : "if (newClassLvl.monk >= 5 && (What(\"Extra.Notes\") + What(\"Class Features\")).toLowerCase().indexOf(\"stunning strike\") === -1) {ClassFeatureOptions([\"monk\", \"ki\", \"stunning strike\", \"extra\"])} else if (newClassLvl.monk < 5 && oldClassLvl.monk >= 5) {ClassFeatureOptions([\"monk\", \"ki\", \"stunning strike\", \"extra\"], \"remove\");};"
			},
			"unarmored movement" : {
				name : "Unarmored Movement",
				source : ["P", 78],
				minlevel : 2,
				description : "\n   " + "Speed increases and eventually lets me traverse some surfaces without falling as I move",
				additional : levels.map(function (n) {
					if (n < 2) return "";
					if (n < 6) return "+10 ft";
					if (n < 9) return "+15 ft";
					if (n < 10) return "+15 ft; Vertical surfaces and liquids";
					if (n < 14) return "+20 ft; Vertical surfaces and liquids";
					if (n < 18) return "+25 ft; Vertical surfaces and liquids";
					return "+30 ft; Vertical surfaces and liquids";
				}),
				changeeval : "var monkSpd = function(n) {return n < 2 ? 0 : n < 6 ? 10 : n < 10 ? 15 : n < 14 ? 20 : n < 18 ? 25 : 30;}; var oldSpdM = monkSpd(oldClassLvl.monk); var newSpdM = monkSpd(newClassLvl.monk); if (oldSpdM !== newSpdM) {ChangeSpeed(newSpdM - oldSpdM)};"
			},
			"subclassfeature3" : {
				name : "Monastic Tradition",
				source : ["P", 78],
				minlevel : 3,
				description : "\n   " + "Choose a Monastic Tradition to commit to and put it in the \"Class\" field on page 1" + "\n   " + "Choose either Way of the Four Elements, Long Death, Open Hand, Shadow, or Sun Soul",
			},
			"deflect missiles" : {
				name : "Deflect Missiles",
				source : ["P", 78],
				minlevel : 3,
				description : "\n   " + "As a reaction, I can reduce ranged weapon attack damage done to me" + "\n   " + "If the damage is negated, I catch and may throw it back (20/60 ft) as a monk weapon",
				action : ["reaction", ""],
				additional : ["", "", "1d10 + 3 + Dexterity modifier; 1 ki to throw", "1d10 + 4 + Dexterity modifier; 1 ki to throw", "1d10 + 5 + Dexterity modifier; 1 ki to throw", "1d10 + 6 + Dexterity modifier; 1 ki to throw", "1d10 + 7 + Dexterity modifier; 1 ki to throw", "1d10 + 8 + Dexterity modifier; 1 ki to throw", "1d10 + 9 + Dexterity modifier; 1 ki to throw", "1d10 + 10 + Dexterity modifier; 1 ki to throw", "1d10 + 11 + Dexterity modifier; 1 ki to throw", "1d10 + 12 + Dexterity modifier; 1 ki to throw", "1d10 + 13 + Dexterity modifier; 1 ki to throw", "1d10 + 14 + Dexterity modifier; 1 ki to throw", "1d10 + 15 + Dexterity modifier; 1 ki to throw", "1d10 + 16 + Dexterity modifier; 1 ki to throw", "1d10 + 17 + Dexterity modifier; 1 ki to throw", "1d10 + 18 + Dexterity modifier; 1 ki to throw", "1d10 + 19 + Dexterity modifier; 1 ki to throw", "1d10 + 20 + Dexterity modifier; 1 ki to throw"]
			},
			"slow fall" : {
				name : "Slow Fall",
				source : ["P", 78],
				minlevel : 4,
				description : "\n   " + "As a reaction, I can reduce any falling damage I take by five times my monk level",
				additional : ["", "", "", "20 less falling damage", "25 less falling damage", "30 less falling damage", "35 less falling damage", "40 less falling damage", "45 less falling damage", "50 less falling damage", "55 less falling damage", "60 less falling damage", "65 less falling damage", "70 less falling damage", "75 less falling damage", "80 less falling damage", "85 less falling damage", "90 less falling damage", "95 less falling damage", "100 less falling damage"],
				action : ["reaction", ""]
			},
			"ki-empowered strikes" : {
				name : "Ki-Empowered Strikes",
				source : ["P", 79],
				minlevel : 6,
				description : "\n   " + "My unarmed strikes count as magical for overcoming resistances and immunities",
				calcChanges : {
					atkAdd : ["if ((/unarmed strike/i).test(WeaponName)) {fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical';}; ", "My unarmed strikes count as magical for overcoming resistances and immunities."]
				}
			},
			"evasion" : {
				name : "Evasion",
				source : ["P", 79],
				minlevel : 7,
				description : "\n   " + "My Dexterity saves vs. areas of effect negate damage on success and halve it on failure",
				save : "Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg"
			},
			"stillness of mind" : {
				name : "Stillness of Mind",
				source : ["P", 79],
				minlevel : 7,
				description : "\n   " + "As an action, I can end one effect on me that causes me to be charmed or frightened",
				action : ["action", ""]
			},
			"purity of body" : {
				name : "Purity of Body",
				source : ["P", 79],
				minlevel : 10,
				description : typeA4 ? "\n   " + "My mastery of the ki flowing through me makes me immune to poison and disease" : " [" + "I am immune to poison and disease" + "]",
				save : "Immune to poison and disease"
			},
			"tongue of the sun and moon" : {
				name : "Tongue of the Sun and Moon",
				source : ["P", 79],
				minlevel : 13,
				description : "\n   " + "I can understand all spoken languages and all creatures with a language understand me"
			},
			"diamond soul" : {
				name : "Diamond Soul",
				source : ["P", 79],
				minlevel : 14,
				description : "\n   " + "I am proficient with all saves; I can reroll a failed save once by spending 1 ki point",
				additional : "1 ki point to reroll failed saving throw",
				eval : "for (var Sc = 0; Sc < AbilityScores.abbreviations.length; Sc++) {var saveProf = AbilityScores.abbreviations[Sc] + \" ST Prof\"; var saveTxt = \"Proficiency with \" + AbilityScores.names[Sc] + \" saving throws was gained from Monk (Diamond Soul)\"; if (tDoc.getField(saveProf).userName === \"\") {Checkbox(saveProf, true, saveTxt)}}",
				removeeval : "for (var Sc = 0; Sc < AbilityScores.abbreviations.length; Sc++) {var saveProf = AbilityScores.abbreviations[Sc] + \" ST Prof\"; var saveTxt = \"Proficiency with \" + AbilityScores.names[Sc] + \" saving throws was gained from Monk (Diamond Soul)\"; if (tDoc.getField(saveProf).userName === saveTxt) {Checkbox(saveProf, false, \"\")}}"
			},
			"timeless body" : {
				name : "Timeless Body",
				source : ["P", 79],
				minlevel : 15,
				description : "\n   " + "I don't require food or water; I don't suffer age penalties and can't be aged magically"
			},
			"empty body" : {
				name : "Empty Body",
				source : ["P", 79],
				minlevel : 18,
				description : "\n   " + "Be invisible and resist non-force damage for 1 min or cast Astral Projection on self",
				additional : "Invisible: 4 ki point; Astral Projection: 8 ki points",
				action : ["action", ""],
				eval : "AddResistance(\"All -Force (invis.)\", \"Empty Body\");",
				removeeval : "RemoveResistance(\"All -Force (invis.)\");"
			},
			"perfect self" : {
				name : "Perfect Self",
				source : ["P", 79],
				minlevel : 20,
				description : "\n   " + "I regain 4 ki points if I have no more remaining when I roll initiative"
			},
		}
	},

	"paladin" : {
		regExpSearch : /^((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
		name : "Paladin",
		source : ["P", 82],
		primaryAbility : "\n \u2022 Paladin: Strength and Charisma;",
		abilitySave : 6,
		prereqs : "\n \u2022 Paladin: Strength 13 and Charisma 13;",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 10,
		saves : ["Wis", "Cha"],
		skills : ["\n\n" + toUni("Paladin") + ": Choose two from Athletics, Insight, Intimidation, Medicine, Persuasion, and Religion."],
		armor : [
			[true, true, true, true],
			[true, true, false, true]
		],
		weapons : [
			[true, true],
			[true, true]
		],
		equipment : "Paladin starting equipment:\n \u2022 A martial weapon and a shield -or- two martial weapons;\n \u2022 Five javelins -or- any simple melee weapon;\n \u2022 A priest's pack -or- an explorer's pack;\n \u2022 Chain mail and a holy symbol.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Sacred Oath", ["oath of the ancients", "oath of the crown", "oath of devotion", "oathbreaker", "oath of vengeance"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		spellcastingFactor : 2,
		spellcastingKnown : {
			spells : "list",
			prepared : true,
		},
		features : {
			"divine sense" : {
				name : "Divine Sense",
				source : ["P", 84],
				minlevel : 1,
				description : "\n   " + "As an action, I sense celestials/fiends/undead/consecrated/desecrated within 60 ft" + "\n   " + "Until the end of my next turn, I sense the type/location if it is not behind total cover",
				usages : "1 + Charisma modifier per ",
				usagescalc : "event.value = 1 + tDoc.getField(\"Cha Mod\").value;",
				recovery : "long rest",
				action : ["action", ""]
			},
			"lay on hands" : {
				name : "Lay on Hands",
				source : ["P", 84],
				minlevel : 1,
				description : "\n   " + "As an action, I can use points in my pool to heal a touched, living creature's hit points" + "\n   " + "I can neutralize poisons/diseases instead at a cost of 5 points per affliction",
				usages : [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
				recovery : "long rest",
				action : ["action", ""]
			},
			"fighting style" : {
				name : "Fighting Style",
				source : ["P", 84],
				minlevel : 2,
				description : "\n   " + "Choose a Fighting Style for the paladin using the \"Choose Feature\" button above",
				choices : ["Defense", "Dueling", "Great Weapon Fighting", "Protection"],
				"defense" : {
					name : "Defense Fighting Style",
					description : "\n   " + "+1 bonus to AC when I'm wearing armor",
					eval : "AddACMisc(1, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\", \"CurrentArmour.known && !ArmourList[CurrentArmour.known].type\")",
					removeeval : "AddACMisc(0, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\")"
				},
				"dueling" : {
					name : "Dueling Fighting Style",
					description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons",
					calcChanges : {
						atkCalc : ["var areOffHands = function(n){for(var i=1;i<=n;i++){if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) {return true; }; }; }(FieldNumbers.actions); if (!areOffHands && isMeleeWeapon && !(/\\b(2|two).?hand(ed)?s?\\b/i).test(theWea.description)) {output.extraDmg += 2; }; ", "When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."]
					}
				},
				"great weapon fighting" : {
					name : "Great Weapon Fighting Style",
					description : "\n   " + "Reroll 1 or 2 on damage if wielding two-handed/versatile melee weapon in both hands",
					calcChanges : {
						atkAdd : ["if (isMeleeWeapon && (/\\b(versatile|(2|two).?hand(ed)?s?)\\b/i).test(theWea.description)) {fields.Description += (fields.Description ? '; ' : '') + 'Re-roll 1 or 2 on damage die' + ((/versatile/i).test(fields.Description) ? ' when two-handed' : ''); }; ", "While wielding a two-handed or versatile melee weapon in two hands, I can re-roll a 1 or 2 on any damage die once."]
					}
				},
				"protection" : {
					name : "Protection Fighting Style",
					description : "\n   " + "As a reaction, I can give disadv. on an attack made vs. someone within 5 ft of me" + "\n   " + "I need to be wielding a shield and be able to see the attacker to do this",
					action : ["reaction", ""]
				}
			},
			"spellcasting" : {
				name : "Spellcasting",
				source : ["P", 84],
				minlevel : 2,
				description : "\n   " + "I can cast prepared paladin spells, using Charisma as my spellcasting ability" + "\n   " + "I can use a holy symbol as a spellcasting focus"
			},
			"divine smite" : {
				name : "Divine Smite",
				source : ["P", 84],
				minlevel : 2,
				description : "\n   " + "When I hit someone in melee, I can expend spell slots to do 2d8 extra radiant damage" + "\n   " + "This increases by 1d8 for each spell slot level above 1st and 1d8 against undead/fiends"
			},
			"channel divinity" : {
				name : "Channel Divinity",
				source : ["P", 85],
				minlevel : 3,
				description : "",
				usages : 1,
				recovery : "short rest"
			},
			"subclassfeature3" : {
				name : "Sacred Oath",
				source : ["P", 84],
				minlevel : 3,
				description : "\n   " + "Choose a Sacred Oath you swear to and put it in the \"Class\" field on the first page" + "\n   " + "Choose Oath of the Ancients, Crown, Devotion, Vengeance, or become an Oathbreaker",
			},
			"divine health" : {
				name : "Divine Health",
				source : ["P", 85],
				minlevel : 3,
				description : "\n   " + "I am immune to disease, thanks to the power of my faith",
				save : "Immune to disease"
			},
			"aura of protection" : {
				name : "Aura of Protection",
				source : ["P", 85],
				minlevel : 6,
				description : "\n   " + "While I'm conscious, allies within range and I can add my Cha mod (min 1) to saves",
				additional : ["", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
				eval : "tDoc.getField(\"All ST Bonus\").setAction(\"Calculate\", \"event.value = Math.max(1, tDoc.getField(\'Cha Mod\').value);\");",
				removeeval : "tDoc.getField(\"All ST Bonus\").setAction(\"Calculate\", \"var placeholder = 1;\");"
			},
			"aura of courage" : {
				name : "Aura of Courage",
				source : ["P", 85],
				minlevel : 10,
				description : "\n   " + "While I'm conscious, allies within range and I can't be frightened",
				additional : ["", "", "", "", "", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
				save : "Immune to being frightened"
			},
			"improved divine smite" : {
				name : "Improved Divine Smite",
				source : ["P", 85],
				minlevel : 11,
				description : "\n   " + "Whenever I hit a creature with a melee weapon, I do an extra 1d8 radiant damage",
				calcChanges : {
					atkAdd : ["if (isMeleeWeapon) {fields.Description += (fields.Description ? '; ' : '') + '+1d8 Radiant damage'; }; ", "With my melee weapon attacks I deal an extra 1d8 radiant damage."]
				}
			},
			"cleansing touch" : {
				name : "Cleansing Touch",
				source : ["P", 85],
				minlevel : 14,
				description : "\n   " + "As an action, I can end one spell on me or another willing creature by touch",
				usages : "Charisma modifier per ",
				usagescalc : "event.value = Math.max(1, tDoc.getField(\"Cha Mod\").value);",
				recovery : "long rest",
				action : ["action", ""]
			}
		}
	},

	"ranger" : {
		regExpSearch : /^((?=.*(ranger|strider))|((?=.*(nature|natural))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
		name : "Ranger",
		source : ["P", 89],
		primaryAbility : "\n \u2022 Ranger: Dexterity and Wisdom;",
		abilitySave : 5,
		prereqs : "\n \u2022 Ranger: Dexterity 13 and Wisdom 13;",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 10,
		saves : ["Str", "Dex"],
		skills : ["\n\n" + toUni("Ranger") + ": Choose three from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival", "\n\n" + toUni("Multiclass Ranger") + ": Choose one from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival"],
		armor : [
			[true, true, false, true],
			[true, true, false, true]
		],
		weapons : [
			[true, true],
			[true, true]
		],
		equipment : "Ranger starting equipment:\n \u2022 Scale mail -or- leather armor;\n \u2022 Two shortswords -or- two simple melee weapons;\n \u2022 A dungeoneer's pack -or- an explorer's pack;\n \u2022 A longbow and a quiver of 20 arrows.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Ranger Archetype", ["beast master", "hunter"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		spellcastingFactor : 2,
		spellcastingKnown : {
			spells : [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11]
		},
		features : {
			"favored enemy" : {
				name : "Favored Enemy",
				source : ["P", 91],
				minlevel : 1,
				description : "\n   " + "Use the \"Choose Features\" button above to add a favored enemy to the third page" + "\n   " + "When selecting a favored enemy, I also learn one of the languages it speaks" + "\n   " + "I have adv. on Wis (Survival) checks to track and Int checks to recall info about them",
				additional : ["1 favored enemy", "1 favored enemy", "1 favored enemy", "1 favored enemy", "1 favored enemy", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies"],
				extraname : "Favored Enemy",
				extrachoices : ["Aberrations", "Beasts", "Celestials", "Constructs", "Dragons", "Elementals", "Fey", "Fiends", "Giants", "Monstrosities", "Oozes", "Plants", "Undead", "Two Races of Humanoids"],
				"aberrations" : {
					name : "Aberrations",
					description : "",
					source : ["P", 91]
				},
				"beasts" : {
					name : "Beasts",
					description : "",
					source : ["P", 91]
				},
				"celestials" : {
					name : "Celestials",
					description : "",
					source : ["P", 91]
				},
				"constructs" : {
					name : "Constructs",
					description : "",
					source : ["P", 91]
				},
				"dragons" : {
					name : "Dragons",
					description : "",
					source : ["P", 91]
				},
				"elementals" : {
					name : "Elementals",
					description : "",
					source : ["P", 91]
				},
				"fey" : {
					name : "Fey",
					description : "",
					source : ["P", 91]
				},
				"fiends" : {
					name : "Fiends",
					description : "",
					source : ["P", 91]
				},
				"giants" : {
					name : "Giants",
					description : "",
					source : ["P", 91]
				},
				"monstrosities" : {
					name : "Monstrosities",
					description : "",
					source : ["P", 91]
				},
				"oozes" : {
					name : "Oozes",
					description : "",
					source : ["P", 91]
				},
				"plants" : {
					name : "Plants",
					description : "",
					source : ["P", 91]
				},
				"undead" : {
					name : "Undead",
					description : "",
					source : ["P", 91]
				},
				"two races of humanoids" : {
					name : "Two Races of Humanoids",
					description : "",
					source : ["P", 91]
				}
			},
			"natural explorer" : {
				name : "Natural Explorer",
				source : ["P", 91],
				minlevel : 1,
				description : "\n   " + "Use the \"Choose Features\" button above to add a favored terrain to the third page",
				additional : ["1 favored terrain", "1 favored terrain", "1 favored terrain", "1 favored terrain", "1 favored terrain", "2 favored terrains", "2 favored terrains", "2 favored terrains", "2 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains"],
				extraname : "Favored Terrain",
				extrachoices : ["Arctic", "Coast", "Desert", "Forest", "Grassland", "Mountain", "Swamp", "Underdark"],
				"arctic" : {
					name : "Arctic",
					source : ["P", 91],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning arctic terrain" + "\n   " + "While traveling for an hour or more in arctic terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"coast" : {
					name : "Coast",
					source : ["P", 91],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning coast terrain" + "\n   " + "While traveling for an hour or more in coast terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"desert" : {
					name : "Desert",
					source : ["P", 91],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning desert terrain" + "\n   " + "While traveling for an hour or more in desert terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"forest" : {
					name : "Forest",
					source : ["P", 91],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning forest terrain" + "\n   " + "While traveling for an hour or more in forest terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"grassland" : {
					name : "Grassland",
					source : ["P", 91],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning grassland terrain" + "\n   " + "While traveling for an hour or more in grassland terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"mountain" : {
					name : "Mountain",
					source : ["P", 91],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning mountain terrain" + "\n   " + "While traveling for an hour or more in mountain terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"swamp" : {
					name : "Swamp",
					source : ["P", 91],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning swamp terrain" + "\n   " + "While traveling for an hour or more in swamp terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"underdark" : {
					name : "Underdark",
					source : ["P", 91],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning underdark terrain" + "\n   " + "While traveling for an hour or more in underdark terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				}
			},
			"fighting style" : {
				name : "Fighting Style",
				source : ["P", 91],
				minlevel : 2,
				description : "\n   " + "Choose a Fighting Style for the ranger using the \"Choose Feature\" button above",
				choices : ["Archery", "Defense", "Dueling", "Two-Weapon Fighting"],
				"archery" : {
					name : "Archery Fighting Style",
					description : "\n   " + "+2 bonus to attack rolls I make with ranged weapons",
					calcChanges : {
						atkCalc : ["if (isRangedWeapon) {output.extraHit += 2; }; ", "My ranged weapons get a +2 bonus on the To Hit."]
					}
				},
				"defense" : {
					name : "Defense Fighting Style",
					description : "\n   " + "+1 bonus to AC when I'm wearing armor",
					eval : "AddACMisc(1, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\", \"CurrentArmour.known && !ArmourList[CurrentArmour.known].type\")",
					removeeval : "AddACMisc(0, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\")"
				},
				"dueling" : {
					name : "Dueling Fighting Style",
					description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons",
					calcChanges : {
						atkCalc : ["var areOffHands = function(n){for(var i=1;i<=n;i++){if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) {return true; }; }; }(FieldNumbers.actions); if (!areOffHands && isMeleeWeapon && !(/\\b(2|two).?hand(ed)?s?\\b/i).test(theWea.description)) {output.extraDmg += 2; }; ", "When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."]
					}
				},
				"two-weapon fighting" : {
					name : "Two-Weapon Fighting Style",
					description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks",
					calcChanges : {
						atkCalc : ["if (isOffHand) {output.modToDmg = true; }; ", "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks."]
					}
				}
			},
			"spellcasting" : {
				name : "Spellcasting",
				source : ["P", 91],
				minlevel : 2,
				description : "\n   " + "I can cast ranger spells that I know, using Wisdom as my spellcasting ability",
				additional : ["", "2 spells known", "3 spells known", "3 spells known", "4 spells known", "4 spells known", "5 spells known", "5 spells known", "6 spells known", "6 spells known", "7 spells known", "7 spells known", "8 spells known", "8 spells known", "9 spells known", "9 spells known", "10 spells known", "10 spells known", "11 spells known", "11 spells known"],
			},
			"subclassfeature3" : {
				name : "Ranger Archetype",
				source : ["P", 92],
				minlevel : 3,
				description : "\n   " + "Choose a Ranger Archetype you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Beast Master or Hunter"
			},
			"primeval awareness" : {
				name : "Primeval Awareness",
				source : ["P", 92],
				minlevel : 3,
				description : "\n   " + "As an action, I can use a spell slot to focus my awareness for 1 min per spell slot level" + "\n   " + "Out to 1 mile (6 in favored terrain), I sense if certain types of creatures are present",
				additional : "aber./celest./dragon/elem./fey/fiend/undead",
				action : ["action", ""]
			},
			"land's stride" : {
				name : "Land's Stride",
				source : ["P", 92],
				minlevel : 8,
				description : "\n   " + "I can travel through nonmagical, difficult terrain without penalty" + "\n   " + "I have advantage on saves vs. plants that impede movement by magical influence",
				save : "Adv. vs. magical plants that impede movement"
			},
			"hide in plain sight" : {
				name : "Hide in Plain Sight",
				source : ["P", 92],
				minlevel : 10,
				description : "\n   " + "I can hide with +10 to Dex (Stealth) after spending 1 minute creating camouflage" + "\n   " + "Once I move or take an action or a reaction, the benefit is lost"
			},
			"vanish" : {
				name : "Vanish",
				source : ["P", 92],
				minlevel : 14,
				description : "\n   " + "I can't be nonmagically tracked if I don't want to be and can Hide as a bonus action",
				action : ["bonus action", ""]
			},
			"feral senses" : {
				name : "Feral Senses",
				source : ["P", 92],
				minlevel : 18,
				description : "\n   " + "When not blinded or deafened, I'm aware of invisible, non-hidden creatures in 30 ft" + "\n   " + "I don't have disadvantage when attacking creatures I am aware of but can't see"
			},
			"foe slayer" : {
				name : "Foe Slayer",
				source : ["P", 92],
				minlevel : 20,
				description : "\n   " + "Once per turn, I can add Wis mod to the attack or damage roll vs. favored enemy"
			}
		}
	},

	"rogue" : {
		regExpSearch : /(rogue|miscreant)/i,
		name : "Rogue",
		source : ["P", 94],
		primaryAbility : "\n \u2022 Rogue: Dexterity;",
		prereqs : "\n \u2022 Rogue: Dexterity 13;",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6],
		die : 8,
		saves : ["Int", "Dex"],
		skills : ["\n\n" + toUni("Rogue") + ": Choose four from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, and Stealth.", "\n\n" + toUni("Multiclass Rogue") + ": Choose one from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, and Stealth."],
		tools : ["Thieves' tools"],
		armor : [
			[true, false, false, false],
			[true, false, false, false]
		],
		weapons : [
			[true, false, ["hand crossbow", "longsword", "rapier", "shortsword"]]
		],
		equipment : "Rogue starting equipment:\n \u2022 A rapier -or- a shortsword;\n \u2022 A shortbow and a quiver of 20 arrows -or- a shortswords;\n \u2022 A burglar's pack -or- dungeoneer's pack -or- an explorer's pack;\n \u2022 Leather armor, two daggers, and thieves' tools.\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Roguish Archetype", ["arcane trickster", "assassin", "mastermind", "swashbuckler", "thief"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		features : {
			"expertise" : {
				name : "Expertise",
				source : ["P", 96],
				minlevel : 1,
				description : "\n   " + "I gain expertise with two skills/thieves' tools I am proficient with; two more at 6th level",
				skillstxt : "\n\n" + toUni("Expertise (Rogue 1)") + ": Choose any two skill proficiencies and/or thieves' tools, and two more at 6th level.",
				additional : levels.map(function (n) {
					if (n < 6) return "with two skills";
					return "with four skills";
				}),
			},
			"sneak attack" : {
				name : "Sneak Attack",
				source : ["P", 96],
				minlevel : 1,
				description : "\n   " + "Once per turn, I can add damage to finesse/ranged attack if I have adv." + "\n   " + "I don't need adv. if a conscious ally is within 5 ft of the target and I don't have disadv.",
				additional : levels.map(function (n) {
					return Math.ceil(n / 2) + "d6";
				}),
				calcChanges : {
					atkAdd : ["if (classes.known.rogue && classes.known.rogue.level && !isSpell && ((/\\bfinesse\\b/i).test(fields.Description) || isRangedWeapon)) {var sneakAtk = Math.ceil(classes.known.rogue.level / 2); fields.Description += (fields.Description ? '; ' : '') + 'Sneak attack ' + sneakAtk + 'd6'; }; ", "Once per turn, when I attack with a ranged or finesse weapon while I have advantage or an conscious ally is within 5 ft of the target, I can add my sneak attack damage to the attack."]
				}
			},
			"thieves cant" : {
				name : "Thieves' Cant",
				source : ["P", 96],
				minlevel : 1,
				description : "\n   " + "I know the secret rogue language that I can use to convey messages inconspicuously",
				eval : "AddLanguage(\"Thieves' Cant\", \"being a Rogue\");",
				removeeval : "RemoveLanguage(\"Thieves' Cant\", \"being a Rogue\");"
			},
			"cunning action" : {
				name : "Cunning Action",
				source : ["P", 96],
				minlevel : 2,
				description : "\n   " + "I can use a bonus action to take the Dash, Disengage, or Hide action",
				action : ["bonus action", ""]
			},
			"subclassfeature3" : {
				name : "Roguish Archetype",
				source : ["P", 96],
				minlevel : 3,
				description : "\n   " + "Choose a Roguish Archetype you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Arcane Trickster, Assassin, Mastermind, Swashbuckler, or Thief",
			},
			"uncanny dodge" : {
				name : "Uncanny Dodge",
				source : ["P", 96],
				minlevel : 5,
				description : "\n   " + "As a reaction, I halve the damage of an attack from an attacker that I can see",
				action : ["reaction", ""]
			},
			"evasion" : {
				name : "Evasion",
				source : ["P", 96],
				minlevel : 7,
				description : "\n   " + "My Dexterity saves vs. areas of effect negate damage on success and halve it on failure",
				save : "Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg"
			},
			"reliable talent" : {
				name : "Reliable Talent",
				source : ["P", 96],
				minlevel : 11,
				description : "\n   " + "If I make an ability check where I add my proficiency bonus, rolls of 9 or lower are 10"
			},
			"blindsense" : {
				name : "Blindsense",
				source : ["P", 96],
				minlevel : 14,
				description : "\n   " + "With my hearing, I can locate hidden or invisible creatures that are within 10 ft of me",
				eval : "AddString(\"Vision\", \"Blindsense 10 ft\", \"; \");",
				removeeval : "RemoveString(\"Vision\", \"Blindsense 10 ft\");"
			},
			"slippery mind" : {
				name : "Slippery Mind",
				source : ["P", 96],
				minlevel : 15,
				description : "\n   " + "I am proficient with Wisdom saving throws",
				eval : "Checkbox(\"Wis ST Prof\", true, \"Proficiency with Wisdom saving throws was gained from Rogue (Slippery Mind)\");",
				removeeval : "Checkbox(\"Wis ST Prof\", false, \"\");"
			},
			"elusive" : {
				name : "Elusive",
				source : ["P", 96],
				minlevel : 18,
				description : "\n   " + "Attackers do not gain advantage on attacks vs. me, unless I am incapacitated"
			},
			"stroke of luck" : {
				name : "Stroke of Luck",
				source : ["P", 97],
				minlevel : 20,
				description : "\n   " + "I can turn a missed attack into a hit or a failed ability check into a natural 20",
				recovery : "short rest",
				usages : 1
			}
		}
	},

	"sorcerer" : {
		regExpSearch : /(sorcerer|witch)/i,
		name : "Sorcerer",
		source : ["P", 99],
		primaryAbility : "\n \u2022 Sorcerer: Charisma;",
		abilitySave : 6,
		prereqs : "\n \u2022 Sorcerer: Charisma 13;",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 6,
		saves : ["Con", "Cha"],
		skills : ["\n\n" + toUni("Sorcerer") + ": Choose two from Arcana, Deception, Insight, Intimidation, Persuasion, and Religion."],
		armor : [
			[false, false, false, false]
		],
		weapons : [
			[false, false, ["dagger", "dart", "light crossbow", "quarterstaff", "sling"]]
		],
		equipment : "Sorcerer starting equipment:\n \u2022 A light crossbow and 20 bolts -or- any simple weapon;\n \u2022 A component pouch -or- an arcane focus;\n \u2022 A dungeoneer's pack -or- an explorer's pack;\n \u2022 Two daggers.\n\nAlternatively, choose 3d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Sorcerous Origin", ["draconic bloodline", "storm sorcery", "wild magic"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
			spells : [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15],
		},
		features : {
			"spellcasting" : {
				name : "Spellcasting",
				source : ["P", 101],
				minlevel : 1,
				description : "\n   " + "I can cast sorcerer cantrips/spells that I know, using Charisma as my spellcasting ability" + "\n   " + "I can use an arcane focus as a spellcasting focus ",
				additional : ["4 cantrips \u0026 2 spells known", "4 cantrips \u0026 3 spells known", "4 cantrips \u0026 4 spells known", "5 cantrips \u0026 5 spells known", "5 cantrips \u0026 6 spells known", "5 cantrips \u0026 7 spells known", "5 cantrips \u0026 8 spells known", "5 cantrips \u0026 9 spells known", "5 cantrips \u0026 10 spells known", "6 cantrips \u0026 11 spells known", "6 cantrips \u0026 12 spells known", "6 cantrips \u0026 12 spells known", "6 cantrips \u0026 13 spells known", "6 cantrips \u0026 13 spells known", "6 cantrips \u0026 14 spells known", "6 cantrips \u0026 14 spells known", "6 cantrips \u0026 15 spells known", "6 cantrips \u0026 15 spells known", "6 cantrips \u0026 15 spells known", "6 cantrips \u0026 15 spells known"],
			},
			"subclassfeature1" : {
				name : "Sorcerous Origin",
				source : ["P", 101],
				minlevel : 1,
				description : "\n   " + "Choose the Sorcerous Origin for your innate powers and put it in the \"Class\" field" + "\n   " + "Choose either Draconic Bloodline, Storm Sorcery, or Wild Magic",
			},
			"font of magic" : {
				name : "Font of Magic",
				source : ["P", 101],
				minlevel : 2,
				description : "\n   " + "As a bonus action, I can use sorcery points to create spell slots and vice versa" + "\n   " + "I can convert spell slots to sorcery points at a rate of 1 point per spell slot level" + "\n   " + "I can convert sorcery points to spell slots at the following rate:" + "\n   " + "Level 1 for 2 sorcery points;   level 2 for 3 sorcery points;   level 3 for 5 sorcery points" + "\n   " + "Level 4 for 6 sorcery points;   level 5 for 7 sorcery points",
				usages : [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				recovery : "long rest",
				action : ["bonus action", ""],
				additional : "Sorcery points"
			},
			"metamagic" : {
				name : "Metamagic",
				source : ["P", 101],
				minlevel : 3,
				description : "\n   " + "Use the \"Choose Features\" button above to add a Metamagic option to the third page" + "\n   " + "I can use only 1 Metamagic option on a spell unless otherwise written",
				additional : ["", "", "2 known", "2 known", "2 known", "2 known", "2 known", "2 known", "2 known", "3 known", "3 known", "3 known", "3 known", "3 known", "3 known", "3 known", "4 known", "4 known", "4 known", "4 known"],
				extraname : "Metamagic Option",
				extrachoices : ["Careful Spell", "Distant Spell", "Empowered Spell", "Extended Spell", "Heightened Spell", "Quickened Spell", "Subtle Spell", "Twinned Spell"],
				"careful spell" : {
					name : "Careful Spell",
					source : ["P", 102],
					description : " [1 sorcery point]" + "\n   " + "If the spell allows a saving throw, I can protect Cha modifier number of creatures" + "\n   " + "The selected creatures automatically succeed on their saving throws vs. the spell"
				},
				"distant spell" : {
					name : "Distant Spell",
					source : ["P", 102],
					description : " [1 sorcery point]" + "\n   " + "I double the range of the spell or make the range 30 ft if the range was touch"
				},
				"empowered spell" : {
					name : "Empowered Spell",
					source : ["P", 102],
					description : " [1 sorcery point]" + "\n   " + "If the spell uses damage dice, I can reroll my Charisma modifier number of damage dice" + "\n   " + "I can Empower a spell even if I use another Metamagic option on it"
				},
				"extended spell" : {
					name : "Extended Spell",
					source : ["P", 102],
					description : " [1 sorcery point]" + "\n   " + "If the spell has a duration of at least 1 min, I can double it, up to 24 hours"
				},
				"heightened spell" : {
					name : "Heightened Spell",
					source : ["P", 102],
					description : " [3 sorcery points]" + "\n   " + "If the spell allows a saving throw, I can have one target get disadv. on their first save"
				},
				"quickened spell" : {
					name : "Quickened Spell",
					source : ["P", 102],
					description : " [2 sorcery points]" + "\n   " + "If the spell has a casting time of 1 action, I can cast it as a bonus action",
					action : ["bonus action", ""]
				},
				"subtle spell" : {
					name : "Subtle Spell",
					source : ["P", 102],
					description : " [1 sorcery point]" + "\n   " + "I can cast the spell without the need to use somatic or verbal components"
				},
				"twinned spell" : {
					name : "Twinned Spell",
					source : ["P", 102],
					description : " [1 sorcery point per spell level, minimum 1]" + "\n   " + "If spell/cantrip has a target of one and not self, I can aim it at second target within range"
				},
			},
			"sorcerous restoration" : {
				name : "Sorcerous Restoration",
				source : ["P", 102],
				minlevel : 20,
				description : "\n   " + "I regain 4 expended sorcery points whenever I finish a short rest",
			},
		}
	},

	"warlock" : {
		regExpSearch : /warlock/i,
		name : "Warlock",
		source : ["P", 105],
		primaryAbility : "\n \u2022 Warlock: Charisma;",
		abilitySave : 6,
		prereqs : "\n \u2022 Warlock: Charisma 13;",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 8,
		saves : ["Wis", "Cha"],
		skills : ["\n\n" + toUni("Warlock") + ": Choose two from Arcana, Deception, History, Intimidation, Investigation, Nature, and Religion."],
		armor : [
			[true, false, false, false],
			[true, false, false, false]
		],
		weapons : [
			[true, false],
			[true, false]
		],
		equipment : "Warlock starting equipment:\n \u2022 A light crossbow and 20 bolts -or- any simple weapon;\n \u2022 A component pouch -or- an arcane focus;\n \u2022 A scholar's pack -or- a dungeoneer's pack\n \u2022 Leather armor, any simple weapon, and two daggers.\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Otherworldly Patron", ["the archfey", "the fiend", "the great old one", "the undying"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : "warlock1",
		spellcastingKnown : {
			cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			spells : [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
		},
		spellcastingList : {
			class : "warlock",
			level : [0, 5], //lower and higher limit
		},
		features : {
			"pact magic" : {
				name : "Pact Magic",
				source : ["P", 107],
				minlevel : 1,
				description : "\n   " + "I can cast warlock cantrips/spells that I know, using Charisma as my spellcasting ability" + "\n   " + "I can use an arcane focus as a spellcasting focus" + "\n   " + "I regain these spell slots on a short rest",
				additional : ["2 cantrips \u0026 2 spells known", "2 cantrips \u0026 3 spells known", "2 cantrips \u0026 4 spells known", "3 cantrips \u0026 5 spells known", "3 cantrips \u0026 6 spells known", "3 cantrips \u0026 7 spells known", "3 cantrips \u0026 8 spells known", "3 cantrips \u0026 9 spells known", "3 cantrips \u0026 10 spells known", "4 cantrips \u0026 10 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 12 spells known", "4 cantrips \u0026 12 spells known", "4 cantrips \u0026 13 spells known", "4 cantrips \u0026 13 spells known", "4 cantrips \u0026 14 spells known", "4 cantrips \u0026 14 spells known", "4 cantrips \u0026 15 spells known", "4 cantrips \u0026 15 spells known"],
			},
			"subclassfeature1" : {
				name : "Otherworldly Patron",
				source : ["P", 107],
				minlevel : 1,
				description : "\n   " + "Choose the Otherworldly Patron you have a bargain with and put it in the \"Class\" field" + "\n   " + "Choose either the Archfey, the Fiend, the Great Old One, or the Undying",
			},
			"eldritch invocations" : {
				name : "Eldritch Invocations",
				source : ["P", 107],
				minlevel : 2,
				description : "\n   " + "Use the \"Choose Features\" button above to add Eldritch Invocations to the third page" + "\n   " + "Whenever I gain a warlock level, I can replace an invocation I know with another",
				additional : ["", "2 invocations known", "2 invocations known", "2 invocations known", "3 invocations known", "3 invocations known", "4 invocations known", "4 invocations known", "5 invocations known", "5 invocations known", "5 invocations known", "6 invocations known", "6 invocations known", "6 invocations known", "7 invocations known", "7 invocations known", "7 invocations known", "8 invocations known", "8 invocations known", "8 invocations known"],
				extraname : "Eldritch Invocation",
				extrachoices : ["Agonizing Blast (prereq: Eldritch Blast cantrip)", "Armor of Shadows", "Ascendant Step (prereq: level 9 warlock)", "Beast Speech", "Beguiling Influence", "Bewitching Whispers (prereq: level 7 warlock)", "Book of Ancient Secrets (prereq: Pact of the Tome)", "Chains of Carceri (prereq: level 15 warlock, Pact of the Chain)", "Devil's Sight", "Dreadful Word (prereq: level 7 warlock)", "Eldritch Sight", "Eldritch Spear (prereq: Eldritch Blast cantrip)", "Eyes of the Rune Keeper", "Fiendish Vigor", "Gaze of Two Minds", "Lifedrinker (prereq: level 12 warlock, Pact of the Blade)", "Mask of Many Faces", "Master of Myriad Forms (prereq: level 15 warlock)", "Minions of Chaos (prereq: level 9 warlock)", "Mire the Mind (prereq: level 5 warlock)", "Misty Visions", "One with Shadows (prereq: level 5 warlock)", "Otherworldly Leap (prereq: level 9 warlock)", "Repelling Blast (prereq: Eldritch Blast cantrip)", "Sculptor of Flesh (prereq: level 7 warlock)", "Sign of Ill Omen (prereq: level 5 warlock)", "Thief of Five Fates", "Thirsting Blade (prereq: level 5 warlock, Pact of the Blade)", "Visions of Distant Realms (prereq: level 15 warlock)", "Voice of the Chain Master (prereq: Pact of the Chain)", "Whispers of the Grave (prereq: level 9 warlock)", "Witch Sight (prereq: level 15 warlock)"],
				"agonizing blast (prereq: eldritch blast cantrip)" : {
					name : "Agonizing Blast",
					description : "\n   " + "I can add my Charisma modifier to the damage of my Eldritch Blast cantrip",
					source : ["P", 110],
					eval : "var ES = (/eldritch spear/i).test(What('Extra.Notes') + What('Class Features')); RemoveWeapon('eldritch blast'); RemoveWeapon('eldritch spear'); RemoveWeapon('agonizing blast'); if (ES) {AddWeapon('Agonizing Spear')} else {AddWeapon('Agonizing Blast')}",
					removeeval : "RemoveWeapon('agonizing blast'); RemoveWeapon('agonizing spear'); var ES = (/eldritch spear/i).test(What('Extra.Notes') + What('Class Features')); if (ES) {AddWeapon('Eldritch Spear')} else {AddWeapon('Eldritch Blast')}",
					prereqeval : "hasEldritchBlast"
				},
				"armor of shadows" : {
					name : "Armor of Shadows",
					description : "\n   " + "I can cast Mage Armor on myself at will, without spell slots or material comp. (PHB 256)",
					source : ["P", 110],
					spellcastingBonus : {
						name : "Armor of Shadows",
						spells : ["mage armor"],
						selection : ["mage armor"],
						atwill : true
					}
				},
				"ascendant step (prereq: level 9 warlock)" : {
					name : "Ascendant Step",
					description : "\n   " + "I can cast Levitate on myself at will, without spell slots or material comp. (PHB 255)",
					source : ["P", 110],
					spellcastingBonus : {
						name : "Ascendant Step",
						spells : ["levitate"],
						selection : ["levitate"],
						atwill : true
					},
					prereqeval : "classes.known.warlock.level >= 9"
				},
				"beast speech" : {
					name : "Beast Speech",
					description : "\n   " + "I can cast Speak with Animals at will, without using spell slots (PHB 277)",
					source : ["P", 110],
					spellcastingBonus : {
						name : "Beast Speech",
						spells : ["speak with animals"],
						selection : ["speak with animals"],
						atwill : true
					}
				},
				"beguiling influence" : {
					name : "Beguiling Influence",
					description : "\n   " + "I gain proficiencies with the Deception and Persuasion skills",
					source : ["P", 110],
					skills : ["Deception", "Persuasion"],
					skillstxt : "\n\n" + toUni("Warlock (Beguiling Influence)") + ": Deception and Persuasion."
				},
				"bewitching whispers (prereq: level 7 warlock)" : {
					name : "Bewitching Whispers",
					description : "\n   " + "Once per long rest, I can cast Compulsion using a warlock spell slot (PHB 224)",
					source : ["P", 110],
					usages : 1,
					recovery : "long rest",
					spellcastingBonus : {
						name : "Bewitching Whispers",
						spells : ["compulsion"],
						selection : ["compulsion"],
						oncelr : true
					},
					prereqeval : "classes.known.warlock.level >= 7"
				},
				"book of ancient secrets (prereq: pact of the tome)" : {
					name : "Book of Ancient Secrets",
					description : "\n   " + "I can add any two 1st-level spells that have the ritual tag to my Book of Shadows" + "\n   " + "If I come across spells with the ritual tag, I can transcribe them into my book, as well" + "\n   " + "I can cast any of these spells in my Book of Shadows as rituals, but not as normal spells" + "\n   " + "I can cast my known warlock spells as rituals if they have the ritual tag",
					source : ["P", 110],
					eval : "CurrentSpells[\"book of ancient secrets\"] = {name : \"Book of Ancient Secrets\", ability : 6, list : {class : \"any\", ritual : true}, known : {spells : \"book\"}}; SetStringifieds();",
					removeeval : "delete CurrentSpells[\"book of ancient secrets\"]; SetStringifieds();",
					prereqeval : "classes.known.warlock.level >= 3 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the tome') !== -1"
				},
				"chains of carceri (prereq: level 15 warlock, pact of the chain)" : {
					name : "Chains of Carceri",
					description : "\n   " + "I can cast Hold Monster at will if the target is a celestial, fiend, or elemental (PHB 251)" + "\n   " + "This uses no spell slots/material comp.; I can only target an individual once per long rest",
					source : ["P", 110],
					spellcastingBonus : {
						name : "Chains of Carceri",
						spells : ["hold monster"],
						selection : ["hold monster"],
						oncelr : true
					},
					prereqeval : "classes.known.warlock.level >= 15 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the chain') !== -1"
				},
				"devil's sight" : {
					name : "Devil's Sight",
					description : "\n   " + "I can see in magical and nonmagical darkness out to 120 ft",
					source : ["P", 110],
					eval : "AddString(\"Vision\", \"Devil's Sight 120 ft\", \"; \");",
					removeeval : "RemoveString(\"Vision\", \"Devil's Sight 120 ft\", \"; \");"
				},
				"dreadful word (prereq: level 7 warlock)" : {
					name : "Dreadful Word",
					description : "\n   " + "Once per long rest, I can cast Confusion using a warlock spell slot (PHB 224)",
					source : ["P", 110],
					usages : 1,
					recovery : "long rest",
					spellcastingBonus : {
						name : "Dreadful Word",
						spells : ["confusion"],
						selection : ["confusion"],
						oncelr : true
					},
					prereqeval : "classes.known.warlock.level >= 7"
				},
				"eldritch sight" : {
					name : "Eldritch Sight",
					description : "\n   " + "I can cast Detect Magic at will, without using spell slots (PHB 231)",
					source : ["P", 110],
					spellcastingBonus : {
						name : "Eldritch Sight",
						spells : ["detect magic"],
						selection : ["detect magic"],
						atwill : true
					}
				},
				"eldritch spear (prereq: eldritch blast cantrip)" : {
					name : "Eldritch Spear",
					description : "\n   " + "My Eldritch Blast cantrip has a range of 300 ft",
					source : ["P", 111],
					eval : "var AB = (/agonizing blast/i).test(What('Extra.Notes') + What('Class Features')); RemoveWeapon('eldritch blast'); RemoveWeapon('eldritch spear'); RemoveWeapon('agonizing blast'); if (AB) {AddWeapon('Agonizing Spear')} else {AddWeapon('Eldritch Spear')}",
					removeeval : "RemoveWeapon('eldritch spear'); RemoveWeapon('agonizing spear'); var AB = (/agonizing blast/i).test(What('Extra.Notes') + What('Class Features')); RemoveWeapon('eldritch blast'); if (AB) {AddWeapon('Agonizing Blast')} else {AddWeapon('Eldritch Blast')}",
					prereqeval : "hasEldritchBlast"
				},
				"eyes of the rune keeper" : {
					name : "Eyes of the Rune Keeper",
					description : "\n   " + "I can read all writing",
					source : ["P", 111]
				},
				"fiendish vigor" : {
					name : "Fiendish Vigor",
					description : "\n   " + "I can cast False Life on myself at will, without spell slots or material comp. (PHB 239)",
					source : ["P", 111],
					spellcastingBonus : {
						name : "Fiendish Vigor",
						spells : ["false life"],
						selection : ["false life"],
						atwill : true
					}
				},
				"gaze of two minds" : {
					name : "Gaze of Two Minds",
					description : "\n   " + "As an action, I can touch a willing creature and perceive through its senses (not my own)" + "\n   " + "This lasts until the end of my next turn, but I can use an action to extend the duration",
					source : ["P", 111]
				},
				"lifedrinker (prereq: level 12 warlock, pact of the blade)" : {
					name : "Lifedrinker",
					description : "\n   " + "My pact weapon does extra necrotic damage equal to my Charisma modifier",
					source : ["P", 111],
					calcChanges : {
						atkCalc : ["if (isMeleeWeapon && (/\\bpact\\b/i).test(WeaponText)) { output.extraDmg += What('Cha Mod'); }; ", "If I include the word 'Pact' in a melee weapon's name or description, the calculation will add my Charisma modifier to its damage. However, it won't say that this added damage is of the necrotic type, as it can only display a single damage type."]
					},
					prereqeval : "classes.known.warlock.level >= 12 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the blade') !== -1"
				},
				"mask of many faces" : {
					name : "Mask of Many Faces",
					description : "\n   " + "I can cast Disguise Self on myself at will, without using spell slots (PHB 233)",
					source : ["P", 111],
					spellcastingBonus : {
						name : "Mask of Many Faces",
						spells : ["disguise self"],
						selection : ["disguise self"],
						atwill : true
					}
				},
				"master of myriad forms (prereq: level 15 warlock)" : {
					name : "Master of Myriad Forms",
					description : "\n   " + "I can cast Alter Self on myself at will, without using spell slots (PHB 211)",
					source : ["P", 111],
					spellcastingBonus : {
						name : "Mask of Myriad Forms",
						spells : ["alter self"],
						selection : ["alter self"],
						atwill : true
					},
					prereqeval : "classes.known.warlock.level >= 15"
				},
				"minions of chaos (prereq: level 9 warlock)" : {
					name : "Minions of Chaos",
					description : "\n   " + "Once per long rest, I can cast Conjure Elemental using a warlock spell slot (PHB 225)",
					source : ["P", 111],
					usages : 1,
					recovery : "long rest",
					spellcastingBonus : {
						name : "Minions of Chaos",
						spells : ["conjure elemental"],
						selection : ["conjure elemental"],
						oncelr : true
					},
					prereqeval : "classes.known.warlock.level >= 9"
				},
				"mire the mind (prereq: level 5 warlock)" : {
					name : "Mire the Mind",
					description : "\n   " + "Once per long rest, I can cast Slow using a warlock spell slot (PHB 277)",
					source : ["P", 111],
					usages : 1,
					recovery : "long rest",
					spellcastingBonus : {
						name : "Mire the Mind",
						spells : ["slow"],
						selection : ["slow"],
						oncelr : true
					},
					prereqeval : "classes.known.warlock.level >= 5"
				},
				"misty visions" : {
					name : "Misty Visions",
					description : "\n   " + "I can cast Silent Image at will, without using spell slots or material comp. (PHB 276)",
					source : ["P", 111],
					spellcastingBonus : {
						name : "Misty Visions",
						spells : ["silent image"],
						selection : ["silent image"],
						atwill : true
					}
				},
				"one with shadows (prereq: level 5 warlock)" : {
					name : "One with Shadows",
					description : "\n   " + "As an action, when I'm in an area of dim light or darkness, I can become invisible" + "\n   " + "I become visible again when I move or take an action or reaction",
					source : ["P", 111],
					action : ["action", ""],
					prereqeval : "classes.known.warlock.level >= 5"
				},
				"otherworldly leap (prereq: level 9 warlock)" : {
					name : "Otherworldly Leap",
					description : "\n   " + "I can cast Jump on myself at will, without using spell slots or material comp. (PHB 254)",
					source : ["P", 111],
					spellcastingBonus : {
						name : "Otherworldly Leap",
						spells : ["jump"],
						selection : ["jump"],
						atwill : true
					},
					prereqeval : "classes.known.warlock.level >= 9"
				},
				"repelling blast (prereq: eldritch blast cantrip)" : {
					name : "Repelling Blast",
					description : "\n   " + "I can have creatures hit by my Eldritch Blast cantrip be pushed 10 ft away from me",
					source : ["P", 111],
					calcChanges : {
						atkAdd : ["if (theWea && (/eldritch blast/i).test(theWea.name)) {fields.Description += '; Target pushed back 10 ft'; }; ", "When I hit a creature with my Eldritch Blast cantrip, it is pushed 10 ft away from me."]
					},
					prereqeval : "hasEldritchBlast"
				},
				"sculptor of flesh (prereq: level 7 warlock)" : {
					name : "Sculptor of Flesh",
					description : "\n   " + "Once per long rest, I can cast Polymorph using a warlock spell slot (PHB 266)",
					source : ["P", 111],
					usages : 1,
					recovery : "long rest",
					spellcastingBonus : {
						name : "Sculptor of Flesh",
						spells : ["polymorph"],
						selection : ["polymorph"],
						oncelr : true
					},
					prereqeval : "classes.known.warlock.level >= 7"
				},
				"sign of ill omen (prereq: level 5 warlock)" : {
					name : "Sign of Ill Omen",
					description : "\n   " + "Once per long rest, I can cast Bestow Curse using a warlock spell slot (PHB 218)",
					source : ["P", 111],
					usages : 1,
					recovery : "long rest",
					spellcastingBonus : {
						name : "Sign of Ill Omen",
						spells : ["bestow curse"],
						selection : ["bestow curse"],
						oncelr : true
					},
					prereqeval : "classes.known.warlock.level >= 5"
				},
				"thief of five fates" : {
					name : "Thief of Five Fates",
					description : "\n   " + "Once per long rest, I can cast Bane using a warlock spell slot (PHB 216)",
					source : ["P", 111],
					usages : 1,
					recovery : "long rest",
					spellcastingBonus : {
						name : "Thief of Five Fates",
						spells : ["bane"],
						selection : ["bane"],
						oncelr : true
					}
				},
				"thirsting blade (prereq: level 5 warlock, pact of the blade)" : {
					name : "Thirsting Blade",
					description : "\n   " + "When taking the attack action, I can attack twice with my pact weapon",
					source : ["P", 111],
					eval : "AddAction(\"action\", \"Pact Weapon (2 attacks per action)\", \"Thirsting Blade (warlock invocation)\");",
					removeeval : "RemoveAction(\"action\", \"Pact Weapon (2 attacks per action)\");",
					prereqeval : "classes.known.warlock.level >= 5 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the blade') !== -1"
				},
				"visions of distant realms (prereq: level 15 warlock)" : {
					name : "Visions of Distant Realms",
					description : "\n   " + "I can cast Arcane Eye at will, without using spell slots (PHB 214)",
					source : ["P", 111],
					spellcastingBonus : {
						name : "Visions of Distant Realms",
						spells : ["arcane eye"],
						selection : ["arcane eye"],
						atwill : true
					},
					prereqeval : "classes.known.warlock.level >= 15"
				},
				"voice of the chain master (prereq: pact of the chain)" : {
					name : "Voice of the Chain Master",
					description : "\n   " + "While on the same plane as my familiar, I can communicate telepathically with it" + "\n   " + "Also, I can perceive through its senses and have it speak with my voice while doing so",
					source : ["P", 111],
					prereqeval : "classes.known.warlock.level >= 3 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the chain') !== -1"
				},
				"whispers of the grave (prereq: level 9 warlock)" : {
					name : "Whispers of the Grave",
					description : "\n   " + "I can cast Speak with Dead at will, without using spell slots (PHB 277)",
					source : ["P", 111],
					spellcastingBonus : {
						name : "Whispers of the Grave",
						spells : ["speak with dead"],
						selection : ["speak with dead"],
						atwill : true
					},
					prereqeval : "classes.known.warlock.level >= 9"
				},
				"witch sight (prereq: level 15 warlock)" : {
					name : "Witch Sight",
					description : "\n   " + "I can see the true form of creatures (shapechangers/illusions/transmutations) within 30 ft",
					source : ["P", 111],
					eval : "AddString(\"Vision\", \"Witch Sight 30 ft\", \"; \");",
					removeeval : "RemoveString(\"Vision\", \"Witch Sight 30 ft\", \"; \");",
					prereqeval : "classes.known.warlock.level >= 15"
				},
			},
			"pact boon" : {
				name : "Pact Boon",
				source : ["P", 107],
				minlevel : 3,
				description : "\n   " + "Choose a Pact Boon (Blade, Chain, or Tome) using the \"Choose Feature\" button above",
				choices : ["Pact of the Blade", "Pact of the Chain", "Pact of the Tome"],
				"pact of the blade" : {
					name : "Pact of the Blade",
					description : "\n   " + "As an action, I can create a pact weapon in my empty hand; I'm proficient in its use" + "\n   " + "I can choose the type of melee weapon every time I create it, and it has those statistics" + "\n   " + "The weapon disappears if it is more than 5 ft away from me for 1 minute" + "\n   " + "The weapon counts as magical; I can transform a magic weapon into my pact weapon" + "\n   " + "This occurs over an hour-long ritual that I can perform during a short rest" + "\n   " + "I can use an action to re-summon it in any form and can dismiss it as no action",
					action : ["action", ""],
					calcChanges : {
						atkAdd : ["if (isMeleeWeapon && (/\\bpact\\b/i).test(inputText)) {fields.Proficiency = true; fields.Description += thisWeapon[1] ? '' : (fields.Description ? '; ' : '') + 'Counts as magical'; }; ", "If I include the word 'Pact' in a melee weapon's name, it gets treated as my Pact Weapon."]
					}
				},
				"pact of the chain" : {
					name : "Pact of the Chain",
					description : "\n   " + "I can cast Find Familiar as a ritual (PHB 240); Also Imp/Pseudodragon/Quasit/Sprite" + "\n   " + "When taking the attack action, I can forgo 1 attack to have my familiar attack instead" + "\n   " + "It makes this 1 attack by using its reaction",
				},
				"pact of the tome" : {
					name : "Pact of the Tome",
					source : ["P", 108],
					description : "\n   " + "I have a Book of Shadows with any three cantrips of my choosing" + "\n   " + "I can cast these cantrips as long as I have the book on my person" + "\n   " + "Regardless of the lists they come from, these count as warlock cantrips to me" + "\n   " + "I can get a replacement book with a 1-hour ceremony during a short or long rest",
					spellcastingBonus : {
						name : "Pact of the Tome",
						class : "any",
						level : [0, 0],
						times : 3,
					},
				}
			},
			"mystic arcanum" : {
				name : "Mystic Arcanum",
				source : ["P", 108],
				minlevel : 11,
				description : "\n   " + "I can choose one spell from the warlock spell list of each level mentioned above" + "\n   " + "I can cast these spells each once per long rest without needing to use a spell slot",
				additional : ["", "", "", "", "", "", "", "", "", "", "6th level", "6th level", "6th and 7th level", "6th and 7th level", "6th, 7th, and 8th level", "6th, 7th, and 8th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level"],
				spellcastingBonus : {
					name : "Mystic Arcanum (6)",
					class : "warlock",
					level : [6, 6],
					oncelr : true,
				},
				changeeval : "if (classes.known.warlock.level < 13) {delete CurrentSpells.warlock.bonus[\"mystic arcanum (7)\"]} else {if (!CurrentSpells.warlock.bonus[\"mystic arcanum (7)\"]) {CurrentSpells.warlock.bonus[\"mystic arcanum (7)\"] = {name : \"Mystic Arcanum (7)\", class : \"warlock\", level : [7, 7], oncelr : true}}}; if (classes.known.warlock.level < 15) {delete CurrentSpells.warlock.bonus[\"mystic arcanum (8)\"]} else {if (!CurrentSpells.warlock.bonus[\"mystic arcanum (8)\"]) {CurrentSpells.warlock.bonus[\"mystic arcanum (8)\"] = {name : \"Mystic Arcanum (8)\", class : \"warlock\", level : [8, 8], oncelr : true}}}; if (classes.known.warlock.level < 17) {delete CurrentSpells.warlock.bonus[\"mystic arcanum (9)\"]} else {if (!CurrentSpells.warlock.bonus[\"mystic arcanum (9)\"]) {CurrentSpells.warlock.bonus[\"mystic arcanum (9)\"] = {name : \"Mystic Arcanum (9)\", class : \"warlock\", level : [9, 9], oncelr : true}}}",
			},
			"eldritch master" : {
				name : "Eldritch Master",
				source : ["P", 108],
				minlevel : 20,
				description : "\n   " + "I can regain all used pact magic spells slots by spending 1 minute entreating my patron",
				recovery : "long rest",
				usages : 1
			}
		}
	},

	"wizard" : {
		regExpSearch : /^(?=.*(wizard|mage|magus))(?!.*wild mage).*$/i,
		name : "Wizard",
		source : ["P", 112],
		primaryAbility : "\n \u2022 Wizard: Intelligence;",
		abilitySave : 4,
		prereqs : "\n \u2022 Wizard: Intelligence 13;",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 6,
		saves : ["Int", "Wis"],
		skills : ["\n\n" + toUni("Wizard") + ": Choose two from Arcana, History, Insight, Investigation, Medicine, and Religion."],
		armor : [
			[false, false, false, false]
		],
		weapons : [
			[false, false, ["dagger", "dart", "light crossbow", "quarterstaff", "sling"]]
		],
		equipment : "Wizard starting equipment:\n \u2022 A quarterstaff -or- a dagger;\n \u2022 A component pouch -or- an arcane focus;\n \u2022 A scholar's pack -or- an explorer's pack;\n \u2022 A spellbook.\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Arcane Tradition", ["abjuration", "conjuration", "divination", "enchantment", "evocation", "illusion", "necromancy", "transmutation", "bladesinging"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
			spells : "book",
			prepared : true,
		},
		features : {
			"spellcasting" : {
				name : "Spellcasting",
				source : ["P", 114],
				minlevel : 1,
				description : "\n   " + "I can cast prepared wizard cantrips/spells, using Intelligence as my spellcasting ability" + "\n   " + "I can use an arcane focus as a spellcasting focus" + "\n   " + "I can cast all wizard spells in my spellbook as rituals if they have the ritual tag",
				additional : ["3 cantrips known", "3 cantrips known", "3 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known"],
			},
			"arcane recovery" : {
				name : "Arcane Recovery",
				source : ["P", 115],
				minlevel : 1,
				description : "\n   " + "Once per day after a short rest, I can recover a number of 5th-level or lower spell slots",
				additional : ["1 level of spell slots", "1 level of spell slots", "2 levels of spell slots", "2 levels of spell slots", "3 levels of spell slots", "3 levels of spell slots", "4 levels of spell slots", "4 levels of spell slots", "5 levels of spell slots", "5 levels of spell slots", "6 levels of spell slots", "6 levels of spell slots", "7 levels of spell slots", "7 levels of spell slots", "8 levels of spell slots", "8 levels of spell slots", "9 levels of spell slots", "9 levels of spell slots", "10 levels of spell slots", "10 levels of spell slots"],
				usages : 1,
				recovery : "long rest"
			},
			"subclassfeature2" : {
				name : "Arcane Tradition",
				source : ["P", 115],
				minlevel : 2,
				description : "\n   " + "Choose the Arcane Tradition you studied and put it in the \"Class\" field" + "\n   " + "Choose either the School of Abjuration, Conjuration, Divination, Enchantment," + "\n   " + "Evocation, Illusion, Necromancy, or Transmutation, or become a Bladesinger"
			},
			"spell mastery" : {
				name : "Spell Mastery",
				source : ["P", 115],
				minlevel : 18,
				description : "\n   " + "By spending 8 hours in study, I can pick a 1st and 2nd-level spell in my spellbook" + "\n   " + "While prepared, I can cast them at their lowest levels without expending spell slots"
			},
			"signature spell" : {
				name : "Signature Spell",
				source : ["P", 115],
				minlevel : 20,
				description : "\n   " + "Two 3rd-level spells of my choice in my spellbook will always count as prepared" + "\n   " + "I can cast both at third level once per short rest without expending spell slots",
				recovery : "short rest",
				usages : 2
			},
		}
	}
}

var ClassSubList = {
	"battlerager" : {
		regExpSearch : /(battlerager|kuldjargh)/i,
		subname : "Path of the Battlerager",
		fullname : "Battlerager",
		source : ["S", 121],
		abilitySave : 6,
		features : {
			"subclassfeature3" : {
				name : "Battlerager Armor",
				source : ["S", 121],
				minlevel : 3,
				description : "\n   " + "I gain proficiency with spiked armor as a weapon" + "\n   " + "As a bonus action while raging, I can attack once with my armor spikes",
				action : ["bonus action", " attack (in rage)"],
				weapons : [false, false, ["armor spikes"]],
				eval : "AddString('Proficiency Armor Other Description', 'Spiked Armor', ', '); AddWeapon('Armor Spikes');",
				removeeval : "RemoveWeapon('Armor Spikes'); RemoveString('Proficiency Armor Other Description', 'Spiked Armor');"
			},
			"subclassfeature6" : {
				name : "Reckless Abandon",
				source : ["S", 121],
				minlevel : 6,
				description : "\n   " + "If I use Reckless Attack during rage, I also gain temporary HP equal to my Con mod",
			},
			"subclassfeature10" : {
				name : "Battlerager Charge",
				source : ["S", 121],
				minlevel : 10,
				description : "\n   " + "As a bonus action while raging, I can use the Dash action",
				action : ["bonus action", " (in rage)"]
			},
			"subclassfeature14" : {
				name : "Spiked Retribution",
				source : ["S", 121],
				minlevel : 14,
				description : "\n   " + "When I'm hit in melee by an attacker within 5 ft, it takes 3 piercing damage" + "\n   " + "This only works while I'm wearing spiked armor, in rage, and I'm not incapacitated"
			}
		}
	},
	"berserker" : {
		regExpSearch : /^((?=.*\b(berserker|berserks?|berserkr|ulfheoinn|ulfheonar)\b)|((?=.*(warrior|fighter))(?=.*(odin|thor)))).*$/i,
		subname : "Path of the Berserker",
		fullname : "Berserker",
		source : ["P", 49],
		abilitySave : 6,
		features : {
			"subclassfeature3" : {
				name : "Frenzy",
				source : ["P", 49],
				minlevel : 3,
				description : "\n   " + "Melee attack as bonus action each turn while raging; +1 level of exhaustion after rage",
				action : ["bonus action", " attack (while raging)"]
			},
			"subclassfeature6" : {
				name : "Mindless Rage",
				source : ["P", 49],
				minlevel : 6,
				description : "\n   " + "While raging, I can't be charmed or frightened, and such effects are suspended",
				save : "Immune to being charmed/frightened in rage"
			},
			"subclassfeature10" : {
				name : "Intimidating Presence",
				source : ["P", 49],
				minlevel : 10,
				description : "\n   " + "As an action, frighten one creature in 30 ft for one turn if it fails a Wisdom save" + "\n   " + "This effect ends if the creature is out of line of sight or more than 60 ft away\n   If a creature succeeds its saving throw, it is immune for 24 hours",
				action : ["action", ""]
			},
			"subclassfeature14" : {
				name : "Retaliation",
				source : ["P", 50],
				minlevel : 14,
				description : "\n   " + "When an enemy within 5 ft damages me, I can make a melee attack as a reaction",
				action : ["reaction", " (after taking damage)"]
			}
		}
	},
	"totem warrior" : {
		regExpSearch : /^(?=.*totem)(?=.*(warrior|fighter|marauder|barbarian|viking|(norse|tribes?|clans?)(wo)?m(a|e)n)).*$/i,
		subname : "Path of the Totem Warrior",
		fullname : "Totem Warrior",
		source : ["P", 50],
		features : {
			"subclassfeature3" : {
				name : "Spirit Seeker",
				source : ["P", 50],
				minlevel : 3,
				description : "\n   " + "I can cast Beast Sense and Speak with Animals as rituals (PHB 217 \u0026 277)",
				spellcastingBonus : [{
					name : "Spirit Seeker",
					spells : ["beast sense"],
					selection : ["beast sense"],
				}, {
					name : "Spirit Seeker",
					spells : ["speak with animals"],
					selection : ["speak with animals"],
				}],
			},
			"subclassfeature3.1" : {
				name : "Totem Spirit",
				source : ["P", 50],
				minlevel : 3,
				description : "\n   " + "Choose Bear, Eagle, Elk, Wolf, or Tiger Spirit using the \"Choose Feature\" button above",
				choices : ["Bear", "Eagle", "Elk", "Wolf", "Tiger"],
				"bear" : {
					name : "Bear Spirit",
					description : "\n   " + "While raging, I have resistance to all damage types except psychic",
					eval : "RemoveResistance(\"Bludgeon. (in rage)\"); RemoveResistance(\"Piercing (in rage)\"); RemoveResistance(\"Slashing (in rage)\"); AddResistance(\"All -Psychic (rage)\", \"Totem Warrior (Bear Spirit)\");",
					removeeval : "RemoveResistance(\"All -Psychic (rage)\"); AddResistance(\"Bludgeon. (in rage)\", \"Barbarian (Rage)\"); AddResistance(\"Piercing (in rage)\", \"Barbarian (Rage)\"); AddResistance(\"Slashing (in rage)\", \"Barbarian (Rage)\");"
				},
				"eagle" : {
					name : "Eagle Spirit",
					description : "\n   " + "While raging without heavy armor, others have disadv. on opportunity attacks vs. me" + "\n   " + "I can use the Dash action as a bonus action",
					action : ["bonus action", " (Dash)"]
				},
				"elk" : {
					name : "Elk Spirit",
					source : ["S", 122],
					description : "\n   " + "While raging without heavy armor, my base walking speed increases with 15 foot",
				},
				"wolf" : {
					name : "Wolf Spirit",
					description : "\n   " + "While raging, friends have advantage on melee attacks vs. hostiles within 5 ft of me"
				},
				"tiger" : {
					name : "Tiger Spirit",
					source : ["S", 122],
					description : "\n   " + "While raging, I can add 10 feet to my long jump and 3 feet to my high jump distance",
				},
			},
			"subclassfeature6" : {
				name : "Aspect of the Beast",
				source : ["P", 50],
				minlevel : 6,
				description : "\n   " + "Choose Bear, Eagle, Elk, Wolf, or Tiger Aspect using the \"Choose Feature\" button above",
				choices : ["Bear", "Eagle", "Elk", "Wolf", "Tiger"],
				"bear" : {
					name : "Aspect of the Bear",
					description : "\n   " + "Advantage on Strength checks to push/pull/lift/break; Carrying capacity is doubled",
					eval : "tDoc.getField(\"Carrying Capacity Multiplier\").value *= 2;",
					removeeval : "tDoc.getField(\"Carrying Capacity Multiplier\").value /= 2;"
				},
				"eagle" : {
					name : "Aspect of the Eagle",
					description : "\n   " + "I can see up to 1 mile away perfectly; No disadvantage on Perception from dim light",
				},
				"elk" : {
					name : "Aspect of the Elk",
					source : ["S", 122],
					description : "\n   " + "While mounted or on foot and not incapacitated, my travel pace is doubled" + "\n   " + "I can extend this benefit to up to ten companions, while they are within 60 ft of me",
				},
				"wolf" : {
					name : "Aspect of the Wolf",
					description : "\n   " + "I can track while traveling at a fast pace; I can move stealthily at a normal pace",
				},
				"tiger" : {
					name : "Aspect of the Tiger",
					source : ["S", 122],
					description : "\n   " + "I gain proficiency with two skills chosen from: Athletics, Acrobatics, Stealth, or Survival",
					skillstxt : "\n\n" + toUni("Aspect of the Tiger") + ": Choose two from Athletics, Acrobatics, Stealth, and Survival."
				},
			},
			"subclassfeature10" : {
				name : "Spirit Walker",
				source : ["P", 50],
				minlevel : 10,
				description : "\n   " + "I can cast Commune with Nature as a ritual (PHB 224)",
				spellcastingBonus : {
					name : "Spirit Walker",
					spells : ["commune with nature"],
					selection : ["commune with nature"],
				},
			},
			"subclassfeature14" : {
				name : "Totemic Attunement",
				source : ["P", 50],
				minlevel : 14,
				description : "\n   " + "Choose Bear, Eagle, Elk, Wolf, or Tiger Attunement using the \"Choose Feature\" button",
				choices : ["Bear", "Eagle", "Elk", "Wolf", "Tiger"],
				"bear" : {
					name : "Bear Attunement",
					description : "\n   " + "While raging, any creature that sees me within 5 ft has disadv. on attacks vs. others" + "\n   " + "Enemies that can't perceive me or be frightened are immune"
				},
				"eagle" : {
					name : "Eagle Attunement",
					description : "\n   " + "While raging, I can fly at my current speed, but I can only stay aloft during my turn"
				},
				"elk" : {
					name : "Elk Attunement",
					source : ["S", 122],
					description : "\n   " + "As a bonus action while raging, I can move through Large or smaller creature's space" + "\n   " + "It must make a Strength save of DC 8 + Strength modifier + Proficiency bonus" + "\n   " + "If failed, it is knocked prone and takes 1d12 + Strength modifier bludgeoning damage",
					action : ["bonus action", " (in rage)"]
				},
				"wolf" : {
					name : "Wolf Attunement",
					description : "\n   " + "If my melee attack hits while raging, I can knock prone as a bonus action (up to Large)",
					action : ["bonus action", " (raging: knock prone)"]
				},
				"tiger" : {
					name : "Tiger Attunement",
					source : ["S", 122],
					description : "\n   " + "As a bonus action while raging, I can make a melee weapon attack on these conditions:" + "\n    - " + "I move at least 20 ft in a straight line towards the target that is Large or smaller" + "\n    - " + "I make a melee weapon attack against it after the bonus action",
					action : ["bonus action", " (in rage)"]
				},
			}
		}
	},
	"college of lore" : {
		regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*lore).*$/i,
		subname : "College of Lore",
		source : ["P", 54],
		features : {
			"subclassfeature3" : {
				name : "Bonus Proficiencies",
				source : ["P", 54],
				minlevel : 3,
				description : "\n   " + "I gain proficiency with three skills of my choice",
				skillstxt : "\n\n" + toUni("College of Lore") + ": Choose any three skills.",
			},
			"subclassfeature3.1" : {
				name : "Cutting Words",
				source : ["P", 54],
				minlevel : 3,
				description : "\n   " + "As a reaction, when a foe within earshot & 60 ft rolls ability check, attack or damage," + "\n   " + "I can subtract a Bardic Inspiration die from the result unless the foe can't be charmed",
				action : ["reaction", ""]
			},
			"subclassfeature6" : {
				name : "Additional Magical Secrets",
				source : ["P", 55],
				minlevel : 6,
				description : "\n   " + "I can add two spells/cantrips from any class to my Spells Known",
				spellcastingBonus : {
					name : "Additional Magical Secret",
					class : "any",
					times : 2,
				},
			},
			"subclassfeature14" : {
				name : "Peerless Skill",
				source : ["P", 55],
				minlevel : 14,
				description : "\n   " + "When making an ability check, I can expend a use of Bardic Inspiration to add the die",
			},
		}
	},
	"college of valor" : {
		regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*valor).*$/i,
		subname : "College of Valor",
		source : ["P", 55],
		attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		features : {
			"subclassfeature3" : {
				name : "Bonus Proficiencies",
				source : ["P", 55],
				minlevel : 3,
				description : "\n   " + "I gain proficiency with medium armor, shields, and martial weapons",
				armor : [false, true, false, true],
				weapons : [false, true]
			},
			"subclassfeature3.1" : {
				name : "Combat Inspiration",
				source : ["P", 55],
				minlevel : 3,
				description : "\n   " + "My Bardic Inspiration can also be used to add the die to a weapon damage roll" + "\n   " + "Alternatively, it can be used as a reaction to add the die to AC against one attack"
			},
			"subclassfeature14" : {
				name : "Battle Magic",
				source : ["P", 55],
				minlevel : 14,
				description : "\n   " + "When I use my action to cast a Bard spell, I can make one bonus action weapon attack",
				action : ["bonus action", " (with Bard spell)"]
			},
		}
	},
	"arcana domain" : {
		regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(arcana|magic|wizardry)).*$/i,
		subname : "Arcana Domain",
		source : ["S", 125],
		spellcastingExtra : ["detect magic", "magic missile", "magic weapon", "nystul's magic aura", "dispel magic", "magic circle", "arcane eye", "leomund's secret chest", "planar binding", "teleportation circle"],
		features : {
			"subclassfeature1" : {
				name : "Arcane Initiate",
				source : ["S", 125],
				minlevel : 1,
				description : "\n   " + "I gain proficiency with Arcana and two wizard cantrips that count as cleric cantrips",
				skills : ["Arcana"],
				skillstxt : "\n\n" + toUni("Arcane Domain") + ": Arcana.",
				spellcastingBonus : {
					name : "Arcane Initiate",
					class : "wizard",
					level : [0, 0],
					times : 2,
				},
			},
			"subclassfeature2" : {
				name : "Channel Divinity: Arcane Abjuration",
				source : ["S", 125],
				minlevel : 2,
				description : "\n   " + "As an action, one celestial, elemental, fey, or fiend within 30 ft must make a Wis save" + "\n   " + "If it fails and is able to see/hear me, it is turned for 1 min or until it takes damage" + "\n   " + "Turned: move away, never within 30 ft of me, no reactions or actions other than Dash" + "\n   " + "Turned: may Dodge instead of Dash when nowhere to move and unable to escape bonds" + "\n   " + "If its CR is low enough and it is not on its home plane, it is banished for 1 min instead" + "\n   " + "Banished: sent to home plane, reappearing where it was if the effect ends before 1 min",
				additional : ["", "", "", "", "CR 1/2 or lower", "CR 1/2 or lower", "CR 1/2 or lower", "CR 1 or lower", "CR 1 or lower", "CR 1 or lower", "CR 2 or lower", "CR 2 or lower", "CR 2 or lower", "CR 3 or lower", "CR 3 or lower", "CR 3 or lower", "CR 4 or lower", "CR 4 or lower", "CR 4 or lower", "CR 4 or lower"],
				action : ["action", ""]
			},
			"subclassfeature6" : {
				name : "Spell Breaker",
				source : ["S", 126],
				minlevel : 6,
				description : "\n   " + "When I restore HP to an ally with a 1st-level or higher spell, I can also end one spell" + "\n   " + "The chosen spell on the ally ends if it is equal or lower level to the spell slot level used",
			},
			"subclassfeature8" : {
				name : "Potent Spellcasting",
				source : ["S", 126],
				minlevel : 8,
				description : "\n   " + "I add my Wisdom modifier to the damage I deal with my cleric cantrips",
				calcChanges : {
					atkCalc : ["if (classes.known.cleric && classes.known.cleric.level > 7 && thisWeapon[4].indexOf('cleric') !== -1 && thisWeapon[3] && SpellsList[thisWeapon[3]].level === 0) { output.extraDmg += What('Wis Mod'); }; ", "My cleric cantrips get my Wisdom modifier added to their damage."]
				}
			},
			"subclassfeature17" : {
				name : "Arcane Mastery",
				source : ["S", 126],
				minlevel : 17,
				description : "\n   " + "I add four wizards spells, a 6th, 7th, 8th, and 9th-level spell, to my domain spells" + "\n   " + "As any domain spell, these spells are automatically prepared and count as cleric spells",
				spellcastingBonus : [{
					name : "Arcane Mastery (6)",
					class : "wizard",
					level : [6, 6],
					prepared : true
				}, {
					name : "Arcane Mastery (7)",
					class : "wizard",
					level : [7, 7],
					prepared : true
				}, {
					name : "Arcane Mastery (8)",
					class : "wizard",
					level : [8, 8],
					prepared : true
				}, {
					name : "Arcane Mastery (9)",
					class : "wizard",
					level : [9, 9],
					prepared : true
				},]
			}
		}
	},
	"death domain" : {
		regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(death|dead|dying)).*$/i,
		subname : "Death Domain",
		source : ["D", 96],
		spellcastingExtra : ["false life", "ray of sickness", "blindness/deafness", "ray of enfeeblement", "animate dead", "vampiric touch", "blight", "death ward", "antilife shell", "cloudkill"],
		features : {
			"subclassfeature1" : {
				name : "Bonus Proficiency",
				source : ["D", 96],
				minlevel : 1,
				description : "\n   " + "I gain proficiency with martial weapons",
				weapons : [false, true],
			},
			"subclassfeature1.1" : {
				name : "Reaper",
				source : ["D", 96],
				minlevel : 1,
				description : "\n   " + "I learn one necromancy cantrip of my choice from any spell list" + "\n   " + "My necromancy, single-target cantrips can affect two targets within 5 ft of each other",
				spellcastingBonus : {
					name : "Reaper",
					class : "any",
					school : ["Necro"],
					level : [0, 0]
				},
			},
			"subclassfeature2" : {
				name : "Channel Divinity: Touch of Death",
				source : ["D", 97],
				minlevel : 2,
				description : "\n   " + "When I hit a creature with a melee attack, I can deal extra necrotic damage",
				additional : ["", "+9 damage", "+11 damage", "+13 damage", "+15 damage", "+17 damage", "+19 damage", "+21 damage", "+23 damage", "+25 damage", "+27 damage", "+29 damage", "+31 damage", "+33 damage", "+35 damage", "+37 damage", "+39 damage", "+41 damage", "+43 damage", "+45 damage"]
			},
			"subclassfeature6" : {
				name : "Inescapable Destruction",
				source : ["D", 97],
				minlevel : 6,
				description : "\n   " + "When I deal necrotic damage with spells or Channel Divinity, I ignore resistance to it",
			},
			"subclassfeature8" : {
				name : "Divine Strike",
				source : ["D", 97],
				minlevel : 8,
				description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
				additional : levels.map(function (n) {
					if (n < 8) return "";
					return "+" + (n < 14 ? 1 : 2) + "d8 necrotic damage";
				}),
				calcChanges : {
					atkAdd : ["if (classes.known.cleric && classes.known.cleric.level > 7 && !isSpell) {fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 necrotic damage'; }; ", "Once per turn, I can have one of my weapon attacks that hit do extra necrotic damage."]
				}
			},
			"subclassfeature17" : {
				name : "Improved Reaper",
				source : ["D", 97],
				minlevel : 17,
				description : "\n   " + "If I cast a 5th-level or lower necromancy spell that has one target, I can target two" + "\n   " + "They need to be within 5 ft of each other; I have to provide material comp. for both",
			}
		}
	},
	"knowledge domain" : {
		regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(knowledge|wisdom|learning)).*$/i,
		subname : "Knowledge Domain",
		source : ["P", 59],
		spellcastingExtra : ["command", "identify", "augury", "suggestion", "nondetection", "speak with dead", "arcane eye", "confusion", "legend lore", "scrying"],
		features : {
			"subclassfeature1" : {
				name : "Blessings of Knowledge",
				source : ["P", 59],
				minlevel : 1,
				description : "\n   " + "I learn two languages and gain proficiency and expertise with two skills" + "\n   " + "I can choose from the following: Arcana, History, Nature, or Religion",
				skillstxt : "\n\n" + toUni("Knowledge Domain") + ": Choose two from Arcana, History, Nature, and Religion. You also gain expertise with these skills.",
				eval : "AddLanguage(\"+2 from Knowledge Domain\", \"being a Cleric (Knowledge Domain)\");",
				removeeval : "RemoveLanguage(\"+2 from Knowledge Domain\", \"being a Cleric (Knowledge Domain)\");",
			},
			"subclassfeature2" : {
				name : "Channel Divinity: Knowledge of Ages",
				source : ["P", 59],
				minlevel : 2,
				description : "\n   " + "As an action, I gain proficiency with a chosen skill or tool for 10 minutes",
				action : ["action", ""]
			},
			"subclassfeature6" : {
				name : "Channel Divinity: Read Thoughts",
				source : ["P", 59],
				minlevel : 6,
				description : "\n   " + "As an action, one creature within 60 ft I can see must make a Wisdom save" + "\n   " + "If it fails, I can read its surface thoughts for 1 min, as long as it's within 60 ft of me" + "\n   " + "As an action, I can end this and cast Suggestion on it (it fails its save automatically)" + "\n   " + "If it succeeded on its save, I can't use this feature again on it until I finish a long rest",
				action : ["action", ""]
			},
			"subclassfeature8" : {
				name : "Potent Spellcasting",
				source : ["P", 60],
				minlevel : 8,
				description : "\n   " + "I can add my Wisdom modifier to the damage I deal with my cleric cantrips",
				calcChanges : {
					atkCalc : ["if (classes.known.cleric && classes.known.cleric.level > 7 && thisWeapon[4].indexOf('cleric') !== -1 && thisWeapon[3] && SpellsList[thisWeapon[3]].level === 0) { output.extraDmg += What('Wis Mod'); }; ", "My cleric cantrips get my Wisdom modifier added to their damage."]
				}
			},
			"subclassfeature17" : {
				name : "Visions of the Past",
				source : ["P", 60],
				minlevel : 17,
				description : "\n   " + "I can see recent events of an object or area by concentrating and praying for 1 min" + "\n   " + "I can meditate this way for up to a number of minutes equal to my Wisdom score" + "\n   - " + "Object Reading (after meditating for 1 minute per owner):" + "\n      " + "If an owner owned it in the last Wis score in days, I learn how that owner got/lost it" + "\n      " + "I also learn the most recent significant event involving the object and the owner" + "\n   - " + "Area Reading (my immediate surroundings, up to a 50-foot cube):" + "\n      " + "Going back my Wisdom score in days, per minute I meditate, I learn about one event" + "\n      " + "This starts with the most recent event; It can be significant or just important to me",
				usages : 1,
				recovery : "short rest"
			}
		}
	},
	"life domain" : {
		regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*\b(life|living|healing)\b).*$/i,
		subname : "Life Domain",
		source : ["P", 60],
		spellcastingExtra : ["bless", "cure wounds", "lesser restoration", "spiritual weapon", "beacon of hope", "revivify", "death ward", "guardian of faith", "mass cure wounds", "raise dead"],
		features : {
			"subclassfeature1" : {
				name : "Bonus Proficiency",
				source : ["P", 60],
				minlevel : 1,
				description : "\n   " + "I gain proficiency with heavy armor",
				armor : [false, false, true, false],
			},
			"subclassfeature1.1" : {
				name : "Disciple of Life",
				source : ["P", 60],
				minlevel : 1,
				description : "\n   " + "When I use a spell that restores hit points, it restores an additional 2 + spell level",
			},
			"subclassfeature2" : {
				name : "Channel Divinity: Preserve Life",
				source : ["P", 60],
				minlevel : 2,
				description : "\n   " + "As an action, I can heal any creature within 30 ft of me up to half their maximum HP" + "\n   " + "I divide the number of hit points among the creatures as I see fit",
				additional : ["", "10 hit points", "15 hit points", "20 hit points", "25 hit points", "30 hit points", "35 hit points", "40 hit points", "45 hit points", "50 hit points", "55 hit points", "60 hit points", "65 hit points", "70 hit points", "75 hit points", "80 hit points", "85 hit points", "90 hit points", "95 hit points", "100 hit points"],
				action : ["action", ""]
			},
			"subclassfeature6" : {
				name : "Blessed Healer",
				source : ["P", 60],
				minlevel : 6,
				description : "\n   " + "When I restore HP to another with a spell, I regain 2 + the spell's level in HP",
			},
			"subclassfeature8" : {
				name : "Divine Strike",
				source : ["P", 60],
				minlevel : 8,
				description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
				additional : levels.map(function (n) {
					if (n < 8) return "";
					return "+" + (n < 14 ? 1 : 2) + "d8 radiant damage";
				}),
				calcChanges : {
					atkAdd : ["if (classes.known.cleric && classes.known.cleric.level > 7 && !isSpell) {fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 radiant damage'; }; ", "Once per turn, I can have one of my weapon attacks that hit do extra radiant damage."]
				}
			},
			"subclassfeature17" : {
				name : "Supreme Healing",
				source : ["P", 60],
				minlevel : 17,
				description : "\n   " + "When I restore HP with a spell, I heal the maximum amount instead of rolling the dice",
			}
		}
	},
	"light domain" : {
		regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*\b(light|sun|shining)\b).*$/i,
		subname : "Light Domain",
		source : ["P", 61],
		spellcastingExtra : ["burning hands", "faerie fire", "flaming sphere", "scorching ray", "daylight", "fireball", "guardian of faith", "wall of fire", "flame strike", "scrying"],
		features : {
			"subclassfeature1" : {
				name : "Bonus Cantrip",
				source : ["P", 61],
				minlevel : 1,
				description : "\n   " + "I learn the Light cantrip if I didn't already know it",
				spellcastingBonus : {
					name : "Bonus Cantrip (Light)",
					spells : ["light"],
					selection : ["light"]
				}
			},
			"subclassfeature1.1" : {
				name : "Warding Flare",
				source : ["P", 61],
				minlevel : 1,
				description : "\n   " + "When a creature within 30 ft attacks me and I can see it, I can interpose divine light" + "\n   " + "As a reaction, I impose disadv. on the attacker's attack roll (unless it can't be blinded)",
				usages : "Wisdom modifier per ",
				usagescalc : "event.value = Math.max(1, tDoc.getField(\"Wis Mod\").value);",
				recovery : "long rest",
				action : ["reaction", ""]
			},
			"subclassfeature2" : {
				name : "Channel Divinity: Radiance of the Dawn",
				source : ["P", 61],
				minlevel : 2,
				description : "\n   " + "As an action, in 30 ft, magical darkness is dispelled and hostiles must make a Con save" + "\n   " + "Each takes radiant damage, saves for half, and negates with total cover",
				additional : ["", "2d10 + 2 damage", "2d10 + 3 damage", "2d10 + 4 damage", "2d10 + 5 damage", "2d10 + 6 damage", "2d10 + 7 damage", "2d10 + 8 damage", "2d10 + 9 damage", "2d10 + 10 dmg", "2d10 + 11 dmg", "2d10 + 12 dmg", "2d10 + 13 dmg", "2d10 + 14 dmg", "2d10 + 15 dmg", "2d10 + 16 dmg", "2d10 + 17 dmg", "2d10 + 18 dmg", "2d10 + 19 dmg", "2d10 + 20 dmg"],
				action : ["action", ""]
			},
			"subclassfeature6" : {
				name : "Improved Flame",
				source : ["P", 61],
				minlevel : 6,
				description : "\n   " + "I can also use my Warding Flare if another is attacked by a creature within 30 ft of me",
			},
			"subclassfeature8" : {
				name : "Potent Spellcasting",
				source : ["P", 61],
				minlevel : 8,
				description : "\n   " + "I can add my Wisdom modifier to the damage I deal with my cleric cantrips",
				calcChanges : {
					atkCalc : ["if (classes.known.cleric && classes.known.cleric.level > 7 && thisWeapon[4].indexOf('cleric') !== -1 && thisWeapon[3] && SpellsList[thisWeapon[3]].level === 0) { output.extraDmg += What('Wis Mod'); }; ", "My cleric cantrips get my Wisdom modifier added to their damage."]
				}
			},
			"subclassfeature17" : {
				name : "Corona of Light",
				source : ["P", 61],
				minlevel : 17,
				description : "\n   " + "As an action, I have an aura of 60 ft sunlight and 30 ft dim light for 1 min" + "\n   " + "Enemies in the sunlight have disadv. on saves vs. spells that deal fire or radiant damage",
				action : ["action", " (start/stop)"]
			}
		}
	},
	"nature domain" : {
		regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*\b(nature|natural|animal|element(s|al)?)\b).*$/i,
		subname : "Nature Domain",
		source : ["P", 62],
		spellcastingExtra : ["animal friendship", "speak with animals", "barkskin", "spike growth", "plant growth", "wind wall", "dominate beast", "grasping vine", "insect plague", "tree stride"],
		features : {
			"subclassfeature1" : {
				name : "Bonus Proficiency",
				source : ["P", 62],
				minlevel : 1,
				description : "\n   " + "I gain proficiency with heavy armor",
				armor : [false, false, true, false],
			},
			"subclassfeature1.1" : {
				name : "Acolyte of Nature",
				source : ["P", 62],
				minlevel : 1,
				description : "\n   " + "I learn a druid cantrip and proficiency with a skill: Animal Handling, Nature, Survival",
				skillstxt : "\n\n" + toUni("Nature Domain") + ": Choose one from Animal Handling, Nature, and Survival.",
				spellcastingBonus : {
					name : "Acolyte of Nature",
					class : "druid",
					level : [0, 0],
				},
			},
			"subclassfeature2" : {
				name : "Channel Divinity: Charm Animals and Plants",
				source : ["P", 62],
				minlevel : 2,
				description : "\n   " + "As an action, all beasts and plants within 30 ft that I can see must make a Wis save" + "\n   " + "If failed, each is charmed and friendly to allies and me for 1 min or until damaged",
				action : ["action", ""]
			},
			"subclassfeature6" : {
				name : "Dampen Elements",
				source : ["P", 62],
				minlevel : 6,
				description : "\n   " + "As a reaction, if an ally in 30 ft or I takes acid/cold/fire/lightning/thunder damage," + "\n   " + "I can grant resistance against that instance of damage",
				action : ["reaction", ""]
			},
			"subclassfeature8" : {
				name : "Divine Strike",
				source : ["P", 62],
				minlevel : 8,
				description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
				additional : levels.map(function (n) {
					if (n < 8) return "";
					return "+" + (n < 14 ? 1 : 2) + "d8 cold/fire/lightning damage (choice)";
				}),
				calcChanges : {
					atkAdd : ["if (classes.known.cleric && classes.known.cleric.level > 7 && !isSpell) {fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 cold/fire/lightning damage'; }; ", "Once per turn, I can have one of my weapon attacks that hit do extra cold, fire, or lightning damage (my choice)."]
				}
			},
			"subclassfeature17" : {
				name : "Master of Nature",
				source : ["P", 62],
				minlevel : 17,
				description : "\n   " + "As a bonus action, I can command creatures that are charmed by my Channel Divinity",
				action : ["bonus action", ""]
			}
		}
	},
	"tempest domain" : {
		regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*\b(tempest|destruction|storm)\b).*$/i,
		subname : "Tempest Domain",
		source : ["P", 62],
		spellcastingExtra : ["fog cloud", "thunderwave", "gust of wind", "shatter", "call lightning", "sleet storm", "control water", "ice storm", "destructive wave", "insect plague"],
		features : {
			"subclassfeature1" : {
				name : "Bonus Proficiency",
				source : ["P", 62],
				minlevel : 1,
				description : "\n   " + "I gain proficiency with martial weapons and heavy armor",
				armor : [false, false, true, false],
				weapons : [false, true],
			},
			"subclassfeature1.1" : {
				name : "Wrath of the Storm",
				source : ["P", 62],
				minlevel : 1,
				description : "\n   " + "As a reaction, when a creature I can see within 5 ft hits me, I can thunderously rebuke" + "\n   " + "It takes 2d8 lightning or thunder damage (my choice) that a Dex save can halve",
				usages : "Wisdom modifier per ",
				usagescalc : "event.value = Math.max(1, tDoc.getField(\"Wis Mod\").value);",
				recovery : "long rest",
				action : ["reaction", ""]
			},
			"subclassfeature2" : {
				name : "Channel Divinity: Destructive Wrath",
				source : ["P", 62],
				minlevel : 2,
				description : "\n   " + "Instead of rolling, I can do maximum damage when I do lightning or thunder damage",
			},
			"subclassfeature6" : {
				name : "Thunderbolt Strike",
				source : ["P", 62],
				minlevel : 6,
				description : "\n   " + "When I deal lightning damage to a Large or smaller foe, I can push it up to 10 ft away",
			},
			"subclassfeature8" : {
				name : "Divine Strike",
				source : ["P", 62],
				minlevel : 8,
				description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
				additional : levels.map(function (n) {
					if (n < 8) return "";
					return "+" + (n < 14 ? 1 : 2) + "d8 thunder damage";
				}),
				calcChanges : {
					atkAdd : ["if (classes.known.cleric && classes.known.cleric.level > 7 && !isSpell) {fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 thunder damage'; }; ", "Once per turn, I can have one of my weapon attacks that hit do extra thunder damage."]
				}
			},
			"subclassfeature17" : {
				name : "Stormborn",
				source : ["P", 62],
				minlevel : 17,
				description : "\n   " + "Whenever I'm not underground or indoors, I have a fly speed equal to my current speed",
			}
		}
	},
	"trickery domain" : {
		regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(trickery|trickster|illusion)).*$/i,
		subname : "Trickery Domain",
		source : ["P", 63],
		spellcastingExtra : ["charm person", "disguise self", "mirror image", "pass without trace", "blink", "dispel magic", "dimension door", "polymorph", "dominate person", "modify memory"],
		features : {
			"subclassfeature1" : {
				name : "Blessing of the Trickster",
				source : ["P", 63],
				minlevel : 1,
				description : "\n   " + "As an action, a willing creature I touch (not me) has adv. on Dex (Stealth) checks" + "\n   " + "This lasts for 1 hour or until I use it again",
				action : ["action", ""]
			},
			"subclassfeature2" : {
				name : "Channel Divinity: Invoke Duplicity",
				source : ["P", 63],
				minlevel : 2,
				description : "\n   " + "As an action, I create illusory duplicates of myself within 30 ft of me for 1 min (conc)" + "\n   " + "As a bonus action, I can move them 30 ft to space(s) I can see within 120 ft of me" + "\n   " + "I can cast spells as though I was in an duplicate's space, using my own senses" + "\n   " + "I have advantage on attacks if the target is within 5 ft of a duplicate and me",
				additional : ["", "1 illusory duplicate", "1 illusory duplicate", "1 illusory duplicate", "1 illusory duplicate", "1 illusory duplicate", "1 illusory duplicate", "1 illusory duplicate", "1 illusory duplicate", "1 illusory duplicate", "1 illusory duplicate", "1 illusory duplicate", "1 illusory duplicate", "1 illusory duplicate", "1 illusory duplicate", "1 illusory duplicate", "4 illusory duplicates", "4 illusory duplicates", "4 illusory duplicates", "4 illusory duplicates"],
				action : ["action", ""],
				eval : "AddAction(\"bonus action\", \"Move Duplicate(s)\", \"Cleric (Trickery Domain) - Channel Divinity: Invoke Duplicity\")",
				removeeval : "RemoveAction(\"bonus action\", \"Move Duplicate(s)\")",
			},
			"subclassfeature6" : {
				name : "Channel Divinity: Cloak of Shadows",
				source : ["P", 63],
				minlevel : 6,
				description : "\n   " + "As an action, I become invisible until the end of my next turn or I attack/cast a spell",
				action : ["action", ""]
			},
			"subclassfeature8" : {
				name : "Divine Strike",
				source : ["P", 63],
				minlevel : 8,
				description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
				additional : levels.map(function (n) {
					if (n < 8) return "";
					return "+" + (n < 14 ? 1 : 2) + "d8 poison damage";
				}),
				calcChanges : {
					atkAdd : ["if (classes.known.cleric && classes.known.cleric.level > 7 && !isSpell) {fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 poison damage'; }; ", "Once per turn, I can have one of my weapon attacks that hit do extra poison damage."]
				}
			},
			"subclassfeature17" : {
				name : "Improved Duplicity",
				source : ["P", 63],
				minlevel : 17,
				description : "\n   " + "When I use Invoke Duplicity, I make four illusory duplicates instead of one" + "\n   " + "I can move any number of the illusory duplicates as part of the same bonus action",
			}
		}
	},
	"war domain" : {
		regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*\b(war|fighting|conflict)\b).*$/i,
		subname : "War Domain",
		source : ["P", 63],
		spellcastingExtra : ["divine favor", "shield of faith", "magic weapon", "spiritual weapon", "crusader's mantle", "spirit guardians", "freedom of movement", "stoneskin", "flame strike", "hold monster"],
		features : {
			"subclassfeature1" : {
				name : "Bonus Proficiency",
				source : ["P", 63],
				minlevel : 1,
				description : "\n   " + "I gain proficiency with martial weapons and heavy armor",
				armor : [false, false, true, false],
				weapons : [false, true],
			},
			"subclassfeature1.1" : {
				name : "War Priest",
				source : ["P", 63],
				minlevel : 1,
				description : "\n   " + "When I use the Attack action, I can make a weapon attack as a bonus action",
				usages : "Wisdom modifier per ",
				usagescalc : "event.value = Math.max(1, tDoc.getField(\"Wis Mod\").value);",
				recovery : "long rest",
				action : ["bonus action", " (with Attack action)"]
			},
			"subclassfeature2" : {
				name : "Channel Divinity: Guided Strike",
				source : ["P", 63],
				minlevel : 2,
				description : "\n   " + "When I make an attack roll, I can add a +10 bonus to the roll after seeing the d20 roll",
			},
			"subclassfeature6" : {
				name : "Channel Divinity: War God's Blessing",
				source : ["P", 63],
				minlevel : 6,
				description : "\n   " + "As a reaction, when a creature within 30 ft makes an attack roll, I can grant a bonus" + "\n   " + "The creature then adds a +10 bonus to the roll; I can do this after seeing the d20 roll",
				action : ["reaction", ""]
			},
			"subclassfeature8" : {
				name : "Divine Strike",
				source : ["P", 63],
				minlevel : 8,
				description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
				additional : levels.map(function (n) {
					if (n < 8) return "";
					return "+" + (n < 14 ? 1 : 2) + "d8 damage of the weapon's type";
				}),
				calcChanges : {
					atkAdd : ["if (classes.known.cleric && classes.known.cleric.level > 7 && !isSpell) {fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 damage'; }; ", "Once per turn, I can have one of my weapon attacks that hit do extra damage."]
				}
			},
			"subclassfeature17" : {
				name : "Avatar of Battle",
				source : ["P", 63],
				minlevel : 17,
				description : "\n   " + "I have resistance to bludgeoning/piercing/slashing damage from nonmagical weapons",
				eval : "AddResistance(\"Bludg. (nonmagical)\", \"Cleric (War Domain)\"); AddResistance(\"Pierc. (nonmagical)\", \"Cleric (War Domain)\"); AddResistance(\"Slash. (nonmagical)\", \"Cleric (War Domain)\");",
				removeeval : "RemoveResistance(\"Bludg. (nonmagical)\"); RemoveResistance(\"Pierc. (nonmagical)\"); RemoveResistance(\"Slash. (nonmagical)\");"
			}
		}
	},
	"circle of the land" : {
		regExpSearch : /^(?=.*(druid|shaman))(?=.*\b(land|arctic|coast|deserts?|forests?|grasslands?|savannah|steppes?|mountains?|swamps?|underdark)\b).*$/i,
		subname : "Circle of the Land",
		source : ["P", 68],
		features : {
			"subclassfeature2" : {
				name : "Bonus Cantrip",
				source : ["P", 68],
				minlevel : 2,
				description : "\n   " + "I know one additional druid cantrip of my choice",
				spellcastingBonus : {
					name : "Bonus Druid Cantrip",
					class : "druid",
					level : [0, 0],
				},
			},
			"subclassfeature2.1" : {
				name : "Natural Recovery",
				source : ["P", 68],
				minlevel : 2,
				description : "\n   " + "After a short rest, I can recover a number of 5th-level or lower spell slots",
				additional : ["1 level spell slots", "1 level spell slots", "2 levels spell slots", "2 levels spell slots", "3 levels spell slots", "3 levels spell slots", "4 levels spell slots", "4 levels spell slots", "5 levels spell slots", "5 levels spell slots", "6 levels spell slots", "6 levels spell slots", "7 levels spell slots", "7 levels spell slots", "8 levels spell slots", "8 levels spell slots", "9 levels spell slots", "9 levels spell slots", "10 levels spell slots", "10 levels spell slots"],
				usages : 1,
				recovery : "long rest"
			},
			"subclassfeature3" : {
				name : "Circle Spells",
				source : ["P", 68],
				minlevel : 3,
				description : "\n   " + "Choose a terrain that grants you spells using the \"Choose Features\" button above",
				choices : ["Arctic", "Coast", "Desert", "Forest", "Grassland", "Mountain", "Swamp", "Underdark"],
				"arctic" : {
					name : "Arctic Circle Spells",
					description : "\n   " + "My mystical connection to the arctic infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["hold person", "spike growth", "sleet storm", "slow", "freedom of movement", "ice storm", "commune with nature", "cone of cold"],
					eval : "if (event.target.name === \"Class Features Menu\") {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};",
				},
				"coast" : {
					name : "Coast Circle Spells",
					description : "\n   " + "My mystical connection to the coast infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["mirror image", "misty step", "water breathing", "water walk", "control water", "freedom of movement", "conjure elemental", "scrying"],
					eval : "if (event.target.name === \"Class Features Menu\") {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};",
				},
				"desert" : {
					name : "Desert Circle Spells",
					description : "\n   " + "My mystical connection to the desert infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["blur", "silence", "create food and water", "protection from energy", "blight", "hallucinatory terrain", "insect plague", "wall of stone"],
					eval : "if (event.target.name === \"Class Features Menu\") {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};",
				},
				"forest" : {
					name : "Forest Circle Spells",
					description : "\n   " + "My mystical connection to the forest infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["barkskin", "spider climb", "call lightning", "plant growth", "divination", "freedom of movement", "commune with nature", "tree stride"],
					eval : "if (event.target.name === \"Class Features Menu\") {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};",
				},
				"grassland" : {
					name : "Grassland Circle Spells",
					description : "\n   " + "My connection to the grassland infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["invisibility", "pass without trace", "daylight", "haste", "divination", "freedom of movement", "dream", "insect plague"],
					eval : "if (event.target.name === \"Class Features Menu\") {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};",
				},
				"mountain" : {
					name : "Mountain Circle Spells",
					description : "\n   " + "My connection to the mountains infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["spider climb", "spike growth", "lightning bolt", "meld into stone", "stone shape", "stoneskin", "passwall", "wall of stone"],
					eval : "if (event.target.name === \"Class Features Menu\") {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};",
				},
				"swamp" : {
					name : "Swamp Circle Spells",
					description : "\n   " + "My mystical connection to the swamp infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["darkness", "melf's acid arrow", "water walk", "stinking cloud", "freedom of movement", "locate creature", "insect plague", "scrying"],
					eval : "if (event.target.name === \"Class Features Menu\") {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};",
				},
				"underdark" : {
					name : "Underdark Circle Spells",
					description : "\n   " + "My connection to the underdark infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["spider climb", "web", "gaseous form", "stinking cloud", "greater invisibility", "stone shape", "cloudkill", "insect plague"],
					eval : "if (event.target.name === \"Class Features Menu\") {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};",
				},
			},
			"subclassfeature6" : {
				name : "Land's Stride",
				source : ["P", 68],
				minlevel : 6,
				description : "\n   " + "I can travel through nonmagical, difficult terrain without penalty" + "\n   " + "I have advantage on saves vs. plants that impede movement by magical influence",
				save : "Adv. vs. magical plants that impede movement"
			},
			"subclassfeature10" : {
				name : "Nature's Ward",
				source : ["P", 68],
				minlevel : 10,
				description : "\n   " + "I am immune to poison/disease and I can't be charmed/frightened by elementals or fey",
				save : "Immune to poison and disease"
			},
			"subclassfeature14" : {
				name : "Nature's Sanctuary",
				source : ["P", 68],
				minlevel : 14,
				description : "\n   " + "When a beast or plant attacks me, it must make a Wis save or pick a different target" + "\n   " + "If it can't, it automatically misses; On a successful save, it is immune for 24 hours",
			},
		}
	},
	"circle of the moon" : {
		regExpSearch : /^(?=.*(druid|shaman))((?=.*\bmoon\b)|((?=.*\bmany\b)(?=.*\bforms?\b))).*$/i,
		subname : "Circle of the Moon",
		source : ["P", 69],
		features : {
			"subclassfeature2" : {
				name : "Circle Forms",
				source : ["P", 69],
				minlevel : 2,
				description : "\n   " + "I am able to transform into more dangerous animal forms when using Wild Shape",
			},
			"wild shape" : {
				name : "Wild Shape",
				source : ["P", 66],
				minlevel : 2,
				description : "\n   " + "As a bonus action, I assume the shape of a beast I have seen before with these rules:" + "\n    - " + "I gain all its game statistics except Intelligence, Wisdom, or Charisma" + "\n    - " + "I get its skill/saving throw prof. while keeping my own, using whichever is higher" + "\n    - " + "I assume the beast's HP and HD; I get mine back when I revert back" + "\n    - " + "I can't cast spells in beast form, but transforming doesn't break concentration" + "\n    - " + "I retain features from class, race, etc., but I don't retain special senses" + "\n    - " + "I can choose whether equipment falls to the ground, merges, or stays worn" + "\n    - " + "I revert if out of time or unconscious; if KOd by damage, excess damage carries over",
				usages : [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, "\u221E\u00D7 per "],
				recovery : "short rest",
				additional : ["", "CR 1, no fly/swim; 1 hour", "CR 1, no fly/swim; 1 hour", "CR 1, no fly; 2 hours", "CR 1, no fly; 2 hours", "CR 2, no fly; 3 hours", "CR 2, no fly; 3 hours", "CR 2; 4 hours", "CR 3; 4 hours", "CR 3; 5 hours", "CR 3; 5 hours", "CR 4; 6 hours", "CR 4; 6 hours", "CR 4; 7 hours", "CR 5; 7 hours", "CR 5; 8 hours", "CR 5; 8 hours", "CR 6; 9 hours", "CR 6; 9 hours", "CR 6; 10 hours"],
				action : ["bonus action", " (start/stop)"],
				eval : "RemoveAction('action', 'Wild Shape (start)'); RemoveAction('bonus action', 'Wild Shape (end)');"
			},
			"subclassfeature2.1" : {
				name : "Combat Wild Shape",
				source : ["P", 69],
				minlevel : 2,
				description : "\n   " + "As a bonus action while in Wild Shape, I can expend spell slots to heal myself" + "\n   " + "I regain 1d8 HP per expended spell slot level; I can use Wild Shape as a bonus action",
				action : ["bonus action", " (heal)"],
				removeeval : "AddAction('action', 'Wild Shape (start)', 'Druid'); AddAction('bonus action', 'Wild Shape (end)', 'Druid');"

			},
			"subclassfeature6" : {
				name : "Primal Strike",
				source : ["P", 69],
				minlevel : 6,
				description : "\n   " + "My attacks count as magical while in Wild Shape",
			},
			"subclassfeature10" : {
				name : "Elemental Wild Shape",
				source : ["P", 69],
				minlevel : 10,
				description : "\n   " + "I can transform into an air/earth/fire/water elemental by expending 2 Wild Shape uses",
			},
			"subclassfeature14" : {
				name : "Thousand Forms",
				source : ["P", 69],
				minlevel : 14,
				description : "\n   " + "I can cast Alter Self at will without using spell slots (PHB 211)",
			},
		}

	},
	"champion" : {
		regExpSearch : /champion/i,
		subname : "Champion",
		fullname : "Champion",
		source : ["P", 72],
		features : {
			"subclassfeature3" : {
				name : "Improved Critical",
				source : ["P", 72],
				minlevel : 3,
				description : "\n   " + "I score a critical hit with my weapon attacks on a roll of 19 and 20",
				calcChanges : {
					atkAdd : ["if (!isSpell && classes.known.fighter && classes.known.fighter.level > 2 && classes.known.fighter.level < 15 && !CritChance) {var CritChance = 19; fields.Description += (fields.Description ? '; ' : '') + 'Crit on 19-20'; }; ", "My weapon attacks score a critical on a to hit roll of both 19 and 20."]
				}
			},
			"subclassfeature7" : {
				name : "Remarkable Athlete",
				source : ["P", 72],
				minlevel : 7,
				description : "\n   " + "I add half my proficiency bonus to Str/Dex/Con checks if I would otherwise add none" + "\n   " + "When making running jumps, I add my Strength modifier to the distance in feet",
				eval : "Checkbox(\"Remarkable Athlete\", true)",
				removeeval : "Checkbox(\"Remarkable Athlete\", false)"
			},
			"subclassfeature10" : {
				name : "Additional Fighting Style",
				source : ["P", 73],
				minlevel : 10,
				description : "\n   " + "Choose an Additional Fighting Style using the \"Choose Feature\" button above ",
				choices : ["Archery", "Defense", "Dueling", "Great Weapon Fighting", "Protection", "Two-Weapon Fighting"],
				"archery" : {
					name : "Archery Fighting Style",
					description : "\n   " + "+2 bonus to attack rolls I make with ranged weapons",
					calcChanges : {
						atkCalc : ["if (isRangedWeapon) {output.extraHit += 2; }; ", "My ranged weapons get a +2 bonus on the To Hit."]
					}
				},
				"defense" : {
					name : "Defense Fighting Style",
					description : "\n   " + "+1 bonus to AC when I'm wearing armor",
					eval : "AddACMisc(1, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\", \"CurrentArmour.known && !ArmourList[CurrentArmour.known].type\")",
					removeeval : "AddACMisc(0, \"Defense Fighting Style\", \"When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC\")"
				},
				"dueling" : {
					name : "Dueling Fighting Style",
					description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons",
					calcChanges : {
						atkCalc : ["var areOffHands = function(n){for(var i=1;i<=n;i++){if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) {return true; }; }; }(FieldNumbers.actions); if (!areOffHands && isMeleeWeapon && !(/\\b(2|two).?hand(ed)?s?\\b/i).test(theWea.description)) {output.extraDmg += 2; }; ", "When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."]
					}
				},
				"great weapon fighting" : {
					name : "Great Weapon Fighting Style",
					description : "\n   " + "Reroll 1 or 2 on damage if wielding two-handed/versatile melee weapon in both hands",
					calcChanges : {
						atkAdd : ["if (isMeleeWeapon && (/\\b(versatile|(2|two).?hand(ed)?s?)\\b/i).test(theWea.description)) {fields.Description += (fields.Description ? '; ' : '') + 'Re-roll 1 or 2 on damage die' + ((/versatile/i).test(fields.Description) ? ' when two-handed' : ''); }; ", "While wielding a two-handed or versatile melee weapon in two hands, I can re-roll a 1 or 2 on any damage die once."]
					}
				},
				"protection" : {
					name : "Protection Fighting Style",
					description : "\n   " + "As a reaction, I can give disadv. on an attack made vs. someone within 5 ft of me" + "\n   " + "I need to be wielding a shield and be able to see the attacker to do this",
					action : ["reaction", ""]
				},
				"two-weapon fighting" : {
					name : "Two-Weapon Fighting Style",
					description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks",
					calcChanges : {
						atkCalc : ["if (isOffHand) {output.modToDmg = true; }; ", "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks."]
					}
				}
			},
			"subclassfeature15" : {
				name : "Superior Critical",
				source : ["P", 73],
				minlevel : 15,
				description : "\n   " + "I score a critical hit with my weapon attacks on a roll of 18, 19, and 20",
				calcChanges : {
					atkAdd : ["if (!isSpell && classes.known.fighter && classes.known.fighter.level > 14) {if (CritChance) {fields.Description = CritChance <= 18 ? fields.Description : fields.Description.replace('Crit on ' + CritChance + '-20', 'Crit on 18-20'); } else {fields.Description += (fields.Description ? '; ' : '') + 'Crit on 18-20'; }; var CritChance = 18; }; ", "My weapon attacks also score a critical on a to hit roll of 18."]
				}
			},
			"subclassfeature18" : {
				name : "Survivor",
				source : ["P", 73],
				minlevel : 18,
				description : "\n   " + "At the start of my turn, if I'm not above half or at 0 HP, I regain 5 + Con mod HP"
			}
		}
	},
	"battle master" : {
		regExpSearch : /^(?=.*(war|fighter|battle|martial))(?=.*master).*$/i,
		subname : "Battle Master",
		fullname : "Battle Master",
		source : ["P", 73],
		abilitySave : 1,
		abilitySaveAlt : 2,
		features : {
			"subclassfeature3" : {
				name : "Combat Superiority",
				source : ["P", 73],
				minlevel : 3,
				description : "\n   " + "I gain a number of superiority dice that I can use to fuel special Maneuvers" + "\n   " + "I regain all superiority dice after a short rest",
				additional : ["", "", "d8", "d8", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d10", "d10", "d10", "d10", "d12", "d12", "d12"],
				usages : [0, 0, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6],
				recovery : "short rest"
			},
			"subclassfeature3.1" : {
				name : "Maneuvers",
				source : ["P", 73],
				minlevel : 3,
				description : "\n   " + "Use the \"Choose Features\" button above to add a Maneuver to the third page" + "\n   " + "I can use a Maneuver by expending a superiority die (only one Maneuver per attack)",
				additional : ["", "", "3 known", "3 known", "3 known", "3 known", "5 known", "5 known", "5 known", "7 known", "7 known", "7 known", "7 known", "7 known", "9 known", "9 known", "9 known", "9 known", "9 known", "9 known"],
				extraname : "Maneuver",
				extrachoices : ["Commander's Strike", "Disarming Attack", "Distracting Strike", "Evasive Footwork", "Feinting Attack", "Goading Attack", "Lunging Attack", "Maneuvering Attack", "Menacing Attack", "Parry", "Precision Attack", "Pushing Attack", "Rally", "Riposte", "Sweeping Attack", "Trip Attack"],
				"commander's strike" : {
					name : "Commander's Strike",
					source : ["P", 74],
					description : "\n   " + "I forgo one attack of my Attack action to use a bonus action to direct an ally I see/hear" + "\n   " + "The ally can use a reaction to make an attack, adding the superiority die to damage",
					action : ["bonus action", " (with Attack action)"]
				},
				"disarming attack" : {
					name : "Disarming Attack",
					source : ["P", 74],
					description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "Target makes a Strength save or drops a held object of my choice to its feet"
				},
				"distracting strike" : {
					name : "Distracting Strike",
					source : ["P", 74],
					description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "The next attack of an ally before my next turn has adv. against the creature"
				},
				"evasive footwork" : {
					name : "Evasive Footwork",
					source : ["P", 74],
					description : "\n   " + "Use when moving; I add the superiority die to my AC until I stop moving"
				},
				"feinting attack" : {
					name : "Feinting Attack",
					source : ["P", 74],
					description : "\n   " + "As a bonus action, I can feint to gain adv. on my next attack against a target within 5 ft" + "\n   " + "If the attack hits, I add the superiority die to my attack's damage",
					action : ["bonus action", ""]
				},
				"goading attack" : {
					name : "Goading Attack",
					source : ["P", 74],
					description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "Target makes a Wis save or has disadv. vs. other targets until the end of my next turn"
				},
				"lunging attack" : {
					name : "Lunging Attack",
					source : ["P", 74],
					description : "\n   " + "I can spend a superiority die to increase the reach of a melee weapon attack by 5 ft" + "\n   " + "If the attack hits, I add the superiority die to my attack's damage"
				},
				"maneuvering attack" : {
					name : "Maneuvering Attack",
					source : ["P", 74],
					description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "Ally can use reaction to move half speed without opportunity attack from the target"

				},
				"menacing attack" : {
					name : "Menacing Attack",
					source : ["P", 74],
					description : "\n   " + "Use after hitting a creature; I add the superiority die to my attack's damage" + "\n   " + "Target makes a Wisdom save or is frightened of me until the end of my next turn"
				},
				"parry" : {
					name : "Parry",
					source : ["P", 74],
					description : "\n   " + "When damaged in melee, I can use a reaction to reduce it by superiority die + Dex mod",
					action : ["reaction", " (when damaged in melee)"]
				},
				"precision attack" : {
					name : "Precision Attack",
					source : ["P", 74],
					description : "\n   " + "I add the superiority die to my attack roll, either before or after rolling"
				},
				"pushing attack" : {
					name : "Pushing Attack",
					source : ["P", 74],
					description : "\n   " + "Use after hitting a creature; I add the superiority die to the attack's damage" + "\n   " + "If target is Large or smaller, it must make a Strength save or be pushed up to 15 ft away"
				},
				"rally" : {
					name : "Rally",
					source : ["P", 74],
					description : "\n   " + "Ally that can see/hear me gets temporary HP equal to superiority die + Charisma mod",
					action : ["bonus action", ""]
				},
				"riposte" : {
					name : "Riposte",
					source : ["P", 74],
					description : "\n   " + "When missed in melee, I can use my reaction to make one melee attack vs. the attacker" + "\n   " + "If the attack hits, I add the superiority die to my attack's damage",
					action : ["reaction", " (after missed in melee)"]
				},
				"sweeping attack" : {
					name : "Sweeping Attack",
					source : ["P", 74],
					description : "\n   " + "Use after hitting a creature and a second creature is within 5 ft of the first" + "\n   " + "If the original attack roll hits this second creature, it takes the superiority die in damage"
				},
				"trip attack" : {
					name : "Trip Attack",
					source : ["P", 74],
					description : "\n   " + "Use after hitting a creature; I add the superiority die to the attack's damage" + "\n   " + "If target is Large or smaller, it must make a Strength save or be knocked prone"
				}
			},
			"subclassfeature3.2" : {
				name : "Student of War",
				source : ["P", 73],
				minlevel : 3,
				description : "\n   " + "I have proficiency with one artisan's tool set of my choice",
				eval : "AddTool(\"Type of artisan's tools\", \"Battle Master (Student of War)\")",
				removeeval : "RemoveTool(\"Type of artisan's tools\", \"Battle Master (Student of War)\")"
			},
			"subclassfeature7" : {
				name : "Know Your Enemy",
				source : ["P", 73],
				minlevel : 7,
				description : "\n   " + "If I spend 1 min studying someone, the DM will tell me info about him/her"
			},
			"subclassfeature10" : {
				name : "Improved Combat Superiority",
				source : ["P", 74],
				minlevel : 10,
				description : "\n   " + "My superiority dice turn into d10s at 10th level and into d12s at 18th level"
			},
			"subclassfeature15" : {
				name : "Relentless",
				source : ["P", 74],
				minlevel : 15,
				description : "\n   " + "I regain one superiority die if I have no more remaining when I roll initiative"
			},
		}
	},
	"eldritch knight" : {
		regExpSearch : /^(?!.*(exalted|sacred|holy|divine|nature|natural|purple.*dragon|green))(?=.*(knight|fighter|warrior|militant|warlord|phalanx|gladiator|trooper))(?=.*\b(eldritch|arcane|magic|mage|witch)\b).*$/i,
		subname : "Eldritch Knight",
		fullname : "Eldritch Knight",
		source : ["P", 75],
		abilitySave : 4,
		spellcastingFactor : 3,
		spellcastingList : {
			class : "wizard",
			school : ["Evoc", "Abjur"],
			level : [0, 4], //lower and higher limit
		},
		spellcastingKnown : {
			cantrips : [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
			spells : [0, 0, 2, 3, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9],
		},
		features : {
			"action surge" : {
				name : "Action Surge",
				source : ["P", 72],
				minlevel : 2,
				description : "\n   " + "I can take one additional action on my turn on top of my normally allowed actions",
				usages : [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
				recovery : "short rest",
				additional : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "30 ft teleport", "30 ft teleport", "30 ft teleport", "30 ft teleport", "30 ft teleport", "30 ft teleport"],
			},
			"subclassfeature3" : {
				name : "Spellcasting",
				source : ["P", 75],
				minlevel : 3,
				description : "\n   " + "I can cast known wizard cantrips/spells, using Intelligence as my spellcasting ability",
				additional : ["2 cantrips known", "2 cantrips known", "2 cantrips \u0026 3 spells known", "2 cantrips \u0026 4 spells known", "2 cantrips \u0026 4 spells known", "2 cantrips \u0026 4 spells known", "2 cantrips \u0026 5 spells known", "2 cantrips \u0026 6 spells known", "2 cantrips \u0026 6 spells known", "3 cantrips \u0026 7 spells known", "3 cantrips \u0026 8 spells known", "3 cantrips \u0026 8 spells known", "3 cantrips \u0026 9 spells known", "3 cantrips \u0026 10 spells known", "3 cantrips \u0026 10 spells known", "3 cantrips \u0026 11 spells known", "3 cantrips \u0026 11 spells known", "3 cantrips \u0026 11 spells known", "3 cantrips \u0026 12 spells known", "3 cantrips \u0026 13 spells known"],
				spellcastingBonus : { //for the spells gained at level 3, 8, 14, 20
					name : "From any School",
					class : "wizard",
					times : [0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4],
					level : [1, 4], //lower and higher limit
				},
			},
			"subclassfeature3.1" : {
				name : "Weapon Bond",
				source : ["P", 75],
				minlevel : 3,
				description : "\n   " + "I can bond with up to two weapons by spending a short rest with each" + "\n   " + "I can't be disarmed of a bonded weapon and I can summon one as a bonus action",
				action : ["bonus action", ""],
			},
			"subclassfeature7" : {
				name : "War Magic",
				source : ["P", 75],
				minlevel : 7,
				description : "\n   " + "When I use my action to cast a cantrip, I can make a weapon attack as a bonus action",
				action : ["bonus action", ""],
			},
			"subclassfeature10" : {
				name : "Eldritch Strike",
				source : ["P", 75],
				minlevel : 10,
				description : "\n   " + "A creature hit by my weapon attack has disadv. on the save vs. the next spell I cast" + "\n   " + "This lasts until the end of my next turn",
			},
			"subclassfeature15" : {
				name : "Arcane Charge",
				source : ["P", 75],
				minlevel : 15,
				description : "\n   " + "When I use Action Surge, I can also teleport up to 30 ft to an empty space I can see" + "\n   " + "I can do so before or after the extra action",
			},
			"subclassfeature18" : {
				name : "Improved War Magic",
				source : ["P", 75],
				minlevel : 18,
				description : "\n   " + "When I use my action to cast a spell, I can make a weapon attack as a bonus action",
				action : ["bonus action", ""],
			}
		}
	},
	"purple dragon knight" : {
		regExpSearch : /^(((?=.*purple)(?=.*dragon)(?=.*knight))|(?=.*banneret)).*$/i,
		subname : "Purple Dragon Knight",
		fullname : "Purple Dragon Knight",
		source : ["S", 128],
		features : {
			"subclassfeature3" : {
				name : "Rallying Cry",
				source : ["S", 128],
				minlevel : 3,
				description : "\n   " + "When I use Second Wind, I also heal three allies within 60 ft that can see or hear me",
				additional : ["", "", "3 HP", "4 HP", "5 HP", "6 HP", "7 HP", "8 HP", "9 HP", "10 HP", "11 HP", "12 HP", "13 HP", "14 HP", "15 HP", "16 HP", "17 HP", "18 HP", "19 HP", "20 HP"],
				eval : "RemoveAction(\"bonus action\", \"Second Wind\"); AddAction(\"bonus action\", \"Second Wind (+ Rallying Cry)\", \"Purple Dragon Knight\")",
				removeeval : "RemoveAction(\"bonus action\", \"Second Wind (+ Rallying Cry)\"); AddAction(\"bonus action\", \"Second Wind\", \"Fighter\")",
			},
			"subclassfeature7" : {
				name : "Royal Envoy",
				source : ["S", 128],
				minlevel : 7,
				description : "\n   " + "I gain proficiency with the Persuasion skill and I gain expertise with the Persuasion skill" + "\n   " + "If already proficient, I can choose Animal Handling, Insight, Intimidation, or Perform",
				skillstxt : "\n\n" + toUni("Purple Dragon Knight (Royal Envoy)") + ": Persuasion proficiency and expertise; if already proficient, choose one from Animal Handling, Insight, Intimidation, and Performance.",
				eval : "AddSkillProf(\"Persuasion\", true, true);",
				removeeval : "AddSkillProf(\"Persuasion\", false, true);"
			},
			"subclassfeature10" : {
				name : "Inspiring Surge",
				source : ["S", 128],
				minlevel : 10,
				description : "\n   " + "When I use my Action Surge, I can inspire an ally within 60 ft that can see or hear me" + "\n   " + "The ally can then use its reaction to make one melee or ranged weapon attack",
				additional : ["", "", "", "", "", "", "", "", "", "1 ally", "1 ally", "1 ally", "1 ally", "1 ally", "1 ally", "1 ally", "1 ally", "2 allies", "2 allies", "2 allies"],
			},
			"subclassfeature15" : {
				name : "Bulwark",
				source : ["S", 128],
				minlevel : 15,
				description : "\n   " + "When I use Indomitable to reroll a Int, Wis, or Cha save, I can extend it to an ally" + "\n   " + "The ally can reroll its failed saving throw against the same effect and take the result" + "\n   " + "It only works if not incapacitated and the ally is within 60 ft and can see or hear me"
			},
		}
	},
	"way of the four elements" : {
		regExpSearch : /^(?=.*\b(four|4)\b)((?=.*elements?)|((?=.*earth)|(?=.*(wind|air))|(?=.*fire)|(?=.*water)))((?=.*(monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
		subname : "Way of the Four Elements",
		source : ["P", 80],
		features : {
			"subclassfeature3" : {
				name : "Disciple of the Elements",
				source : ["P", 80],
				minlevel : 3,
				description : "\n   " + "I know Elemental Attunement and additional Elemental Disciplines, depending on level" + "\n   " + "Use the \"Choose Features\" button above to add Elemental Disciplines to the third page" + "\n   " + "From 5th level onward, I can use additional ki points to increase their spell slot level" + "\n   " + "I can trade known Elemental Disciplines for others when I gain new ones",
				additional : ["", "", "2 known", "2 known", "2 known; 3 max ki", "3 known; 3 max ki", "3 known; 3 max ki", "3 known; 3 max ki", "3 known; 4 max ki", "3 known; 4 max ki", "4 known; 4 max ki", "4 known; 4 max ki", "4 known; 5 max ki", "4 known; 5 max ki", "4 known; 5 max ki", "4 known; 5 max ki", "5 known; 6 max ki", "5 known; 6 max ki", "5 known; 6 max ki", "5 known; 6 max ki"],
				extraname : "Elemental Discipline",
				extrachoices : ["Breath of Winter (prereq: level 17 monk)", "Clench of the North Wind (prereq: level 6 monk)", "Eternal Mountain Defense (prereq: level 11 monk)", "Fangs of the Fire Snake", "Fist of Four Thunders", "Fist of Unbroken Air", "Flames of the Phoenix (prereq: level 11 monk)", "Gong of the Summit (prereq: level 6 monk)", "Mist Stance (prereq: level 11 monk)", "Ride the Wind (prereq: level 11 monk)", "Rive of Hungry Flame (prereq: level 17 monk)", "Rush of the Gale Spirits", "Shape the Flowing River", "Sweeping Cinder Strike", "Water Whip", "Wave of Rolling Earth (prereq: level 17 monk)"],
				eval : "ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"elemental attunement\", \"extra\"]);",
				removeeval : "ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"elemental attunement\", \"extra\"], \"remove\");",
				"elemental attunement" : {
					name : "Elemental Attunement",
					source : ["P", 81],
					description : "\n   " + "As an action, I can briefly control elemental forces nearby" + "\n   " + "I can make a harmless sensory effect, light/snuff light, chill/warm 1 lb for 1 hour," + "\n   " + "or I cause earth/fire/water/mist in a 1 ft cube to shape itself into a form for 1 minute",
					action : ["action", ""]
				},
				"breath of winter (prereq: level 17 monk)" : {
					name : "Breath of Winter",
					source : ["P", 81],
					description : " [6 ki points]" + "\n   " + "As an action, I can cast Cone of Cold without material components (PHB 224)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Breath of Winter",
						spells : ["cone of cold"],
						selection : ["cone of cold"],
						firstCol : 6,
					},
					spellFirstColTitle : "Ki",
					prereqeval : "classes.known.monk.level >= 17"
				},
				"clench of the north wind (prereq: level 6 monk)" : {
					name : "Clench of the North Wind",
					source : ["P", 81],
					description : " [3 ki points]" + "\n   " + "As an action, I can cast Hold Person without material components (PHB 251)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Clench of the North Wind",
						spells : ["hold person"],
						selection : ["hold person"],
						firstCol : 3,
					},
					spellFirstColTitle : "Ki",
					prereqeval : "classes.known.monk.level >= 6"
				},
				"eternal mountain defense (prereq: level 11 monk)" : {
					name : "Eternal Mountain Defense",
					source : ["P", 81],
					description : " [5 ki points]" + "\n   " + "As an action, I can cast Stoneskin on myself without material components (PHB 278)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Eternal Mountain Defense",
						spells : ["stoneskin"],
						selection : ["stoneskin"],
						firstCol : 5,
					},
					spellFirstColTitle : "Ki",
					prereqeval : "classes.known.monk.level >= 11"
				},
				"fangs of the fire snake" : {
					name : "Fangs of the Fire Snake",
					source : ["P", 81],
					description : " [1 ki point]" + "\n   " + "With Attack action, my unarmed strikes +10 ft reach and deal fire damage this turn" + "\n   " + "Also, I can spent an additional 1 ki point to cause an attack to deal +1d10 fire damage",
					calcChanges : {
						atkAdd : ["if ((/unarmed strike/i).test(WeaponName) && (/^(?=.*fire)(?=.*snake).*$/i).test(inputText)) {fields.Description += (fields.Description ? '; ' : '') + 'After hit, spend 1 ki point for +1d10 fire damage'; fields.Range = 'Melee (15 ft reach)'; fields.Damage_Type = 'fire'; }; ", "If I include the words 'Fire Snake' in the name of an unarmed strike, it gets +10 ft reach, does fire damage, and gains the option to deal +1d10 fire damage by spending 1 additional ki point."]
					}
				},
				"fist of four thunders" : {
					name : "Fist of Four Thunders",
					source : ["P", 81],
					description : " [2 ki points]" + "\n   " + "As an action, I can cast Thunderwave (PHB 282)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Fist of Four Thunders",
						spells : ["thunderwave"],
						selection : ["thunderwave"],
						firstCol : 2,
					},
					spellFirstColTitle : "Ki"
				},
				"fist of unbroken air" : {
					name : "Fist of Unbroken Air",
					source : ["P", 81],
					description : " [2 ki points; +1d10/extra ki point]" + "\n   " + "As an action, target within 30 ft takes 3d10 bludgeoning damage (spend ki for more)" + "\n   " + "It is also pushed up to 20 ft away from me and knocked prone" + "\n   " + "It can make a Strength save to halve damage and avoid being pushed and knocked prone",
					action : ["action", ""]
				},
				"flames of the phoenix (prereq: level 11 monk)" : {
					name : "Flames of the Phoenix",
					source : ["P", 81],
					description : " [4 ki points]" + "\n   " + "As an action, I can cast Fireball without material components (PHB 241)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Flames of the Phoenix",
						spells : ["fireball"],
						selection : ["fireball"],
						firstCol : 4,
					},
					spellFirstColTitle : "Ki",
					prereqeval : "classes.known.monk.level >= 11"
				},
				"gong of the summit (prereq: level 6 monk)" : {
					name : "Gong of the Summit",
					source : ["P", 81],
					description : " [3 ki points]" + "\n   " + "As an action, I can cast Shatter without material components (PHB 275)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Gong of the Summit",
						spells : ["shatter"],
						selection : ["shatter"],
						firstCol : 3,
					},
					spellFirstColTitle : "Ki",
					prereqeval : "classes.known.monk.level >= 6"
				},
				"mist stance (prereq: level 11 monk)" : {
					name : "Mist Stance",
					source : ["P", 81],
					description : " [4 ki points]" + "\n   " + "As an action, I can cast Gaseous Form on myself without material components (PHB 244)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Mist Stance",
						spells : ["gaseous form"],
						selection : ["gaseous form"],
						firstCol : 4,
					},
					spellFirstColTitle : "Ki",
					prereqeval : "classes.known.monk.level >= 11"
				},
				"ride the wind (prereq: level 11 monk)" : {
					name : "Ride the Wind",
					source : ["P", 81],
					description : " [4 ki points]" + "\n   " + "As an action, I can cast Fly on myself without material components (PHB 243)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Ride the Wind",
						spells : ["fly"],
						selection : ["fly"],
						firstCol : 4,
					},
					spellFirstColTitle : "Ki",
					prereqeval : "classes.known.monk.level >= 11"
				},
				"rive of hungry flame (prereq: level 17 monk)" : {
					name : "Rive of Hungry Flame",
					source : ["P", 81],
					description : " [5 ki points]" + "\n   " + "As an action, I can cast Wall of Fire without material components (PHB 285)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Rive of Hungry Flame",
						spells : ["wall of fire"],
						selection : ["wall of fire"],
						firstCol : 5,
					},
					spellFirstColTitle : "Ki",
					prereqeval : "classes.known.monk.level >= 17"
				},
				"rush of the gale spirits" : {
					name : "Rush of the Gale Spirits",
					source : ["P", 81],
					description : " [2 ki points]" + "\n   " + "As an action, I can cast Gust of Wind without material components (PHB 248)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Rush of the Gale Spirits",
						spells : ["gust of wind"],
						selection : ["gust of wind"],
						firstCol : 2,
					},
					spellFirstColTitle : "Ki"
				},
				"shape the flowing river" : {
					name : "Shape the Flowing River",
					source : ["P", 81],
					description : " [1 ki point]" + "\n   " + "As an action, I can affect ice/water up to a 30-foot cube within 120 ft" + "\n   " + "I can switch it between water/ice states and reshape ice up to half its largest dimension",
					action : ["action", ""]
				},
				"sweeping cinder strike" : {
					name : "Sweeping Cinder Strike",
					source : ["P", 81],
					description : " [2 ki points]" + "\n   " + "As an action, I can cast Burning Hands (PHB 220)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Sweeping Cinder Strike",
						spells : ["burning hands"],
						selection : ["burning hands"],
						firstCol : 2,
					},
					spellFirstColTitle : "Ki"
				},
				"water whip" : {
					name : "Water Whip",
					source : ["P", 81],
					description : " [2 ki points; +1d10/extra ki point]" + "\n   " + "As an action, a creature within 30 ft takes 3d10 bludgeoning damage (spend ki for more)" + "\n   " + "It is also knocked prone or pulled up to 25 ft closer to me (my choice)" + "\n   " + "It can make a Dexterity save to halve damage and avoid being pulled or knocked prone",
					action : ["action", ""]
				},
				"wave of rolling earth (prereq: level 17 monk)" : {
					name : "Wave of Rolling Earth",
					source : ["P", 81],
					description : " [6 ki points]" + "\n   " + "As an action, I can cast Wall of Stone without material components (PHB 287)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Wave of Rolling Earth",
						spells : ["wall of stone"],
						selection : ["wall of stone"],
						firstCol : 6,
					},
					spellFirstColTitle : "Ki",
					prereqeval : "classes.known.monk.level >= 17"
				},
			}
		}
	},
	"way of the long death" : {
		regExpSearch : /^(?=.*\blong)(?=.*\b(death|dead))((?=.*(monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
		subname : "Way of the Long Death",
		source : ["S", 130],
		features : {
			"subclassfeature3" : {
				name : "Touch of Death",
				source : ["S", 130],
				minlevel : 3,
				description : "\n   " + "If I reduce someone within 5 ft to 0 HP, I gain Wis mod + monk level temporary HP"
			},
			"subclassfeature6" : {
				name : "Hour of Reaping",
				source : ["S", 130],
				minlevel : 6,
				description : "\n   " + "As an action, all creatures within 30 feet of me must make a Wisdom saving throw" + "\n   " + "On a failed save the creature is frightened until the end of my next turn",
				action : ["action", ""]
			},
			"subclassfeature11" : {
				name : "Mastery of Death",
				source : ["S", 131],
				minlevel : 11,
				additional : "1 ki point",
				description : "\n   " + "When I'm reduced to 0 HP, I can expend 1 ki point to have 1 HP instead",
				extraname : "Way of the Long Death 17",
				changeeval : "if (newClassLvl.monk >= 17 && (What(\"Extra.Notes\") + What(\"Class Features\")).toLowerCase().indexOf(\"touch of the long death\") === -1) {ClassFeatureOptions([\"monk\", \"subclassfeature11\", \"touch of the long death\", \"extra\"])} else if (newClassLvl.monk < 17 && oldClassLvl.monk >= 17) {ClassFeatureOptions([\"monk\", \"subclassfeature11\", \"touch of the long death\", \"extra\"], \"remove\")};",
				"touch of the long death" : {
					name : "Touch of the Long Death",
					source : ["S", 131],
					description : " [1-10 ki points]" + "\n   " + "As an action, a target within 5 ft takes 2d10 necrotic damage per ki point I spent" + "\n   " + "It can make a Constitution saving throw to half the damage",
					action : ["action", ""]
				}
			}
		}
	},
	"way of the open hand" : {
		regExpSearch : /^(?=.*\bopen\b)(?=.*\bhand\b)((?=.*(monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
		subname : "Way of the Open Hand",
		source : ["P", 79],
		features : {
			"subclassfeature3" : {
				name : "Hand Technique",
				source : ["P", 79],
				minlevel : 3,
				description : "\n   " + "When I hit a creature with a Flurry of Blows attack I can do one of the following:" + "\n    - " + "It has to make a Dexterity save or be knocked prone" + "\n    - " + "It has to make a Strength save or I can push it up to 15 ft away from me" + "\n    - " + "It can't take reactions until the end of my next turn"
			},
			"subclassfeature6" : {
				name : "Wholeness of Body",
				source : ["P", 79],
				minlevel : 6,
				description : "\n   " + "As an action, I regain hit points equal to three times my monk level",
				additional : ["", "", "", "", "", "18 hit points", "21 hit points", "24 hit points", "27 hit points", "30 hit points", "33 hit points", "36 hit points", "39 hit points", "42 hit points", "45 hit points", "48 hit points", "51 hit points", "54 hit points", "57 hit points", "60 hit points"],
				usages : 1,
				recovery : "long rest",
				action : ["action", ""]
			},
			"subclassfeature11" : {
				name : "Tranquility",
				source : ["P", 80],
				minlevel : 11,
				description : "\n   " + "After a long rest, I gain the effect of a Sanctuary spell until a next long rest (PHB 272)",
				extraname : "Way of the Open Hand 17",
				changeeval : "if (newClassLvl.monk >= 17 && (What(\"Extra.Notes\") + What(\"Class Features\")).toLowerCase().indexOf(\"quivering palm\") === -1) {ClassFeatureOptions([\"monk\", \"subclassfeature11\", \"quivering palm\", \"extra\"])} else if (newClassLvl.monk < 17 && oldClassLvl.monk >= 17) {ClassFeatureOptions([\"monk\", \"subclassfeature11\", \"quivering palm\", \"extra\"], \"remove\")};",
				"quivering palm" : {
					name : "Quivering Palm",
					source : ["P", 80],
					description : " [3 ki points]" + "\n   " + "When I hit a creature with an unarmed strike, I can start imperceptible vibrations" + "\n   " + "Within my monk level in days, I can use an action to have the creature make a Con save" + "\n   " + "If it fails, it is reduced to 0 hit points; If it succeeds, it takes 10d10 necrotic damage"
				}
			}
		}
	},
	"way of shadow" : {
		regExpSearch : /^(?=.*shadow)((?=.*(monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
		subname : "Way of Shadow",
		source : ["P", 80],
		features : {
			"subclassfeature3" : {
				name : "Shadow Arts",
				source : ["P", 80],
				minlevel : 3,
				description : "\n   " + "I know the Minor Illusion cantrip and can cast certain spells by using ki (see page 3)",
				spellcastingBonus : {
					name : "Shadow Arts",
					spells : ["minor illusion"],
					selection : ["minor illusion"],
					atwill : true
				},
				extraname : "Shadow Art",
				eval : "ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"darkness\", \"extra\"]); ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"darkvision\", \"extra\"]); ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"pass without trace\", \"extra\"]); ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"silence\", \"extra\"]);",
				removeeval : "ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"darkness\", \"extra\"], \"remove\"); ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"darkvision\", \"extra\"], \"remove\"); ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"pass without trace\", \"extra\"], \"remove\"); ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"silence\", \"extra\"], \"remove\");",
				"darkness" : {
					name : "Darkness",
					source : ["P", 80],
					description : " [2 ki points]" + "\n   " + "As an action, I can cast Darkness without material components (PHB 230)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Darkness",
						spells : ["darkness"],
						selection : ["darkness"],
						firstCol : 2
					},
					spellFirstColTitle : "Ki",
				},
				"darkvision" : {
					name : "Darkvision",
					source : ["P", 80],
					description : " [2 ki points]" + "\n   " + "As an action, I can cast Darkvision without material components (PHB 230)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Darkvision",
						spells : ["darkvision"],
						selection : ["darkvision"],
						firstCol : 2
					},
					spellFirstColTitle : "Ki",
				},
				"pass without trace" : {
					name : "Pass Without Trace",
					source : ["P", 80],
					description : " [2 ki points]" + "\n   " + "As an action, I can cast Pass without Trace without material components (PHB 264)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Pass Without Trace",
						spells : ["pass without trace"],
						selection : ["pass without trace"],
						firstCol : 2
					},
					spellFirstColTitle : "Ki",
				},
				"silence" : {
					name : "Silence",
					source : ["P", 80],
					description : " [2 ki points]" + "\n   " + "As an action, I can cast Silence (PHB 275)",
					action : ["action", ""],
					spellcastingBonus : {
						name : "Silence",
						spells : ["silence"],
						selection : ["silence"],
						firstCol : 2
					},
					spellFirstColTitle : "Ki",
				},
			},
			"subclassfeature6" : {
				name : "Shadow Step",
				source : ["P", 80],
				minlevel : 6,
				description : "\n   " + "As a bonus action, I can teleport from and into dim light or darkness within 60 ft" + "\n   " + "After I do this, I have adv. on the next melee attack I make before the end of my turn",
				action : ["bonus action", ""]
			},
			"subclassfeature11" : {
				name : "Cloak of Shadows",
				source : ["P", 80],
				minlevel : 11,
				description : "\n   " + "As an action, I can become invisible in dim light or darkness until I attack/cast",
				action : ["action", ""]
			},
			"subclassfeature17" : {
				name : "Opportunist",
				source : ["P", 80],
				minlevel : 17,
				description : "\n   " + "As a reaction, if a creature in 5 ft is hit by another, I can make a melee attack vs. it",
				action : ["reaction", ""]
			}
		}
	},
	"way of the sun soul" : {
		regExpSearch : /^(?=.*\bsun)(?=.*\b(soul|spirit))((?=.*(warrior|monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
		subname : "Way of the Sun Soul",
		source : ["S", 131],
		features : {
			"subclassfeature3" : {
				name : "Radiant Sun Bolt",
				source : ["S", 131],
				minlevel : 3,
				additional : "1 ki point for 2 extra attacks",
				description : "\n   " + "I gain a ranged spell attack that I can use as part of the Attack action" + "\n   " + "If I do this and spend 1 ki point, I can make two extra attacks as a bonus action",
				action : ["bonus action", " (2\u00D7 with Attack action)"],
				eval : "AddWeapon('Radiant Sun Bolt');",
				removeeval : "RemoveWeapon(\"Radiant Sun Bolt\");",
				extraname : "Way of the Sun Soul 6",
				changeeval : "if (newClassLvl.monk >= 6 && (What(\"Extra.Notes\") + What(\"Class Features\")).toLowerCase().indexOf(\"searing arc strike\") === -1) {ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"searing arc strike\", \"extra\"])} else if (newClassLvl.monk < 6 && oldClassLvl.monk >= 6) {ClassFeatureOptions([\"monk\", \"subclassfeature3\", \"searing arc strike\", \"extra\"], \"remove\")};",
				"searing arc strike" : {
					name : "Searing Arc Strike",
					source : ["S", 131],
					description : " [2 ki points + additional]" + "\n   " + "After taking the Attack action, I can cast Burning Hands as a bonus action [PHB 220]" + "\n   " + "For every additional ki point I spend, Burning hands is cast at 1 higher spell level" + "\n   " + "The maximum total ki points I can spend for this (including the 2) is half my Monk level",
					action : ["bonus action", " (after Attack action)"]
				}
			},
			"subclassfeature11" : {
				name : "Searing Sunburst",
				source : ["S", 131],
				minlevel : 11,
				description : "\n   " + "As an action, anyone in a 20-ft radius light on a point within 150 ft makes a Con save" + "\n   " + "If failed and not behind opaque total cover, take 2d6 (+ 2d6/ki point) radiant damage",
				action : ["action", ""],
				additional : "0 ki points + max 3 ki points"
			},
			"subclassfeature17" : {
				name : "Sun Shield",
				source : ["S", 131],
				minlevel : 17,
				description : "\n   " + "As a reaction, when I'm hit by a melee attack, I can deal 5 + Wis mod radiant damage" + "\n   " + "I can only do this while my light aura is on; I can turn it on/off as a bonus action",
				action : ["bonus action", " (start/stop)"],
				additional : "30-ft rad bright + 30-ft dim light",
				eval : "AddAction(\"reaction\", \"Sun Shield (hit in melee)\", \"Monk (Way of the Sun Soul)\")",
				removeeval : "RemoveAction(\"reaction\", \"Sun Shield\");",
			}
		}
	},
	"oath of the ancients" : {
		regExpSearch : /^(((?=.*(ancient|nature|natural|green|fey|horned))((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper)))))|((?=.*(green|fey|horned))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
		subname : "Oath of the Ancients",
		source : ["P", 87],
		spellcastingExtra : ["ensnaring strike", "speak with animals", "moonbeam", "misty step", "plant growth", "protection from energy", "ice storm", "stoneskin", "commune with nature", "tree stride"],
		features : {
			"subclassfeature3" : {
				name : "Channel Divinity: Nature's Wrath",
				source : ["P", 87],
				minlevel : 3,
				description : "\n   " + "As an action, a creature I can see within 10 ft must make a Str/Dex save (its choice)" + "\n   " + "If it fails this save, it is restrained until it succeeds on a save at the end of its turn",
				action : ["action", ""]
			},
			"subclassfeature3.1" : {
				name : "Channel Divinity: Turn the Faithless",
				source : ["P", 87],
				minlevel : 3,
				description : "\n   " + "As an action, all fey/fiends within 30 ft that can hear me must make a Wisdom save" + "\n   " + "If one fails, it is turned for 1 minute or until it takes damage and must show true form" + "\n   " + "Turned: move away, never within 30 ft of me, no reactions or actions other than Dash" + "\n   " + "Turned: may Dodge instead of Dash when nowhere to move and unable to escape bonds",
				action : ["action", ""]
			},
			"subclassfeature7" : {
				name : "Aura of Warding",
				source : ["P", 87],
				minlevel : 7,
				description : "\n   " + "Allies within range and I have resistance to damage from spells",
				additional : ["", "", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
				eval : "AddResistance(\"Spells\", \"Paladin (Aura of Warding)\")",
				removeeval : "RemoveResistance(\"Spells\")"
			},
			"subclassfeature15" : {
				name : "Undying Sentinel",
				source : ["P", 87],
				minlevel : 15,
				description : "\n   " + "If dropped to 0 hit points and not killed outright, I can choose to stay at 1 hit point" + "\n   " + "Additionally, I suffer no drawbacks of old age and can't be aged magically",
				recovery : "long rest",
				usages : 1
			},
			"subclassfeature20" : {
				name : "Elder Champion",
				source : ["P", 87],
				minlevel : 20,
				description : "\n   " + "As an action, I assume the form of a force of nature for 1 minute and gain benefits:" + "\n    - " + "At the start of each of my turns, I regain 10 hit points" + "\n    - " + "I can cast paladin spells with a casting time of 1 action as a bonus action instead" + "\n    - " + "Enemies within 10 ft have disadv. on saves vs. my paladin spells and channel divinity",
				recovery : "long rest",
				usages : 1,
				action : ["action", ""]
			}
		}
	},
	"oath of the crown" : {
		regExpSearch : /^(?=.*(crown|king|country))(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper))))).*$/i,
		subname : "Oath of the Crown",
		source : ["S", 133],
		spellcastingExtra : ["command", "compelled duel", "warding bond", "zone of truth", "aura of vitality", "spirit guardians", "banishment", "guardian of faith", "circle of power", "geas"],
		features : {
			"subclassfeature3" : {
				name : "Channel Divinity: Champion Challenge",
				source : ["S", 133],
				minlevel : 3,
				description : "\n   " + "I can compel any chosen creatures within 30 ft of me to make a Wisdom save" + "\n   " + "If failed, a target is unable to willingly move more than 30 ft away from me" + "\n   " + "The effect ends if I'm incapacitated, die, or it is moved more than 30 ft away from me",
				action : ["action", ""]
			},
			"subclassfeature3.1" : {
				name : "Channel Divinity: Turn the Tide",
				source : ["S", 133],
				minlevel : 3,
				description : "\n   " + "As a bonus action, any chosen creatures within 30 ft that can hear me regain HP" + "\n   " + "Each regain 1d6 + my Charisma modifier HP, up to half of its total HP",
				action : ["bonus action", ""]
			},
			"subclassfeature7" : {
				name : "Divine Allegiance",
				source : ["S", 133],
				minlevel : 7,
				description : "\n   " + "When a creature within 5 feet of me takes damage, I can substitute my HP for it" + "\n   " + "The creature takes no damage and I take all of it; this damage can't be prevented",
				action : ["reaction", ""]
			},
			"subclassfeature15" : {
				name : "Unyielding Spirit",
				source : ["S", 133],
				minlevel : 15,
				description : "\n   " + "I have advantage on saving throws against effects that paralyze or stun",
				save : "Adv. vs. being paralyzed or stunned"
			},
			"subclassfeature20" : {
				name : "Exalted Champion",
				source : ["S", 133],
				minlevel : 20,
				description : "\n   " + "As an action, I gain the following benefits for 1 hour or until I'm incapacitated:" + "\n    - " + "Resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons" + "\n    - " + "My allies within 30 ft of me and I have advantage on Wisdom and Death saves",
				recovery : "long rest",
				usages : 1,
				action : ["action", ""]
			}
		}
	},
	"oath of devotion" : {
		regExpSearch : /^(?=.*(devotion|obedience))(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper))))).*$/i,
		subname : "Oath of Devotion",
		source : ["P", 86],
		spellcastingExtra : ["protection from evil and good", "sanctuary", "lesser restoration", "zone of truth", "beacon of hope", "dispel magic", "freedom of movement", "guardian of faith", "commune", "flame strike"],
		features : {
			"subclassfeature3" : {
				name : "Channel Divinity: Sacred Weapon",
				source : ["P", 86],
				minlevel : 3,
				description : "\n   " + "As an action, for 1 minute, I add my Cha modifier to hit for one weapon I'm holding" + "\n   " + "It also counts as magical and emits bright light in a 20-ft radius and equal dim light",
				action : ["action", ""],
				calcChanges : {
					atkCalc : ["if (classes.known.paladin && classes.known.paladin.level > 2 && !isSpell && (/^(?=.*sacred)(?=.*weapon).*$/i).test(WeaponText)) { output.extraHit += What('Cha Mod'); }; ", "If I include the words 'Sacred Weapon' in the name or description of a weapon, it gets my Charisma modifier added to its To Hit."]
				}
			},
			"subclassfeature3.1" : {
				name : "Channel Divinity: Turn the Unholy",
				source : ["P", 86],
				minlevel : 3,
				description : "\n   " + "As an action, all fiends/undead within 30 ft that can hear me must make a Wis save" + "\n   " + "If one of them fails this save, it is turned for 1 minute or until it takes damage" + "\n   " + "Turned: move away, never within 30 ft of me, no reactions or actions other than Dash" + "\n   " + "Turned: may Dodge instead of Dash when nowhere to move and unable to escape bonds",
				action : ["action", ""]
			},
			"subclassfeature7" : {
				name : "Aura of Devotion",
				source : ["P", 86],
				minlevel : 7,
				description : "\n   " + "While I'm conscious, allies within range and I can't be charmed",
				additional : ["", "", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
				save : "Immune to being charmed"
			},
			"subclassfeature15" : {
				name : "Purity of Spirit",
				source : ["P", 86],
				minlevel : 15,
				description : "\n   " + "I am always under the effect of a Protection from Evil and Good spell (PHB 270)"
			},
			"subclassfeature20" : {
				name : "Holy Nimbus",
				source : ["P", 86],
				minlevel : 20,
				description : "\n   " + "As an action, I shine with a 30-ft radius bright light and equal dim light for 1 minute" + "\n   " + "If an enemy starts its turn in the bright light, it takes 10 radiant damage" + "\n   " + "For the duration, I have advantage on saves vs. spells cast by fiends and undead",
				recovery : "long rest",
				usages : 1,
				action : ["action", ""]
			}
		}
	},
	"oathbreaker" : {
		regExpSearch : /^((?=.*blackguard)|((?=.*(oath.*breaker|breaker.*oath))((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper)))))).*$/i,
		subname : "Oathbreaker",
		source : ["D", 97],
		spellcastingExtra : ["hellish rebuke", "inflict wounds", "crown of madness", "darkness", "animate dead", "bestow curse", "blight", "confusion", "contagion", "dominate person"],
		features : {
			"subclassfeature3" : {
				name : "Channel Divinity: Control Undead",
				source : ["D", 97],
				minlevel : 3,
				description : "\n   " + "As an action, one undead (CR < paladin level) I can see in 30 ft must make a Wis save" + "\n   " + "If failed, it must obey my commands for 24 hours or until I use this on another",
				action : ["action", ""]
			},
			"subclassfeature3.1" : {
				name : "Channel Divinity: Dreadful Aspect",
				source : ["D", 97],
				minlevel : 3,
				description : "\n   " + "As an action, anyone I choose within 30 ft that can see me must make a Wisdom save" + "\n   " + "If failed, it is frightened for 1 min or until it succeeds a save at the end of its turns" + "\n   " + "It can't save at the end of its turn if it's still within 30 ft of me",
				action : ["action", ""]
			},
			"subclassfeature7" : {
				name : "Aura of Hate",
				source : ["D", 97],
				minlevel : 7,
				description : "\n   " + "Fiends/undead within range and I add my Cha mod as bonus on melee weapon damage" + "\n   " + "Multiple Auras of Hate don't stack; only the strongest applies",
				additional : ["", "", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"]
			},
			"subclassfeature15" : {
				name : "Supernatural Resistance",
				source : ["P", 97],
				minlevel : 15,
				description : "\n   " + "I have resistance to bludgeoning/piercing/slashing damage from nonmagical weapons",
				eval : "AddResistance(\"Bludg. (nonmagical)\", \"Paladin (Supernatural Resistance)\"); AddResistance(\"Pierc. (nonmagical)\", \"Paladin (Supernatural Resistance)\"); AddResistance(\"Slash. (nonmagical)\", \"Paladin (Supernatural Resistance)\");",
				removeeval : "RemoveResistance(\"Bludg. (nonmagical)\"); RemoveResistance(\"Pierc. (nonmagical)\"); RemoveResistance(\"Slash. (nonmagical)\");"
			},
			"subclassfeature20" : {
				name : "Dread Lord",
				source : ["D", 97],
				minlevel : 20,
				description : "\n   " + "As an action, I gain a 30-ft aura of gloom that reduces bright light to dim for 1 min" + "\n   " + "If frightened of me, foes starting their turn in the aura take 4d10 psychic damage" + "\n   " + "Attacks vs. my allies and me inside the aura have disadvantage if attackers need sight" + "\n   " + "As a bonus action, I can make a melee spell attack vs. a target inside the aura" + "\n   " + "If this attack hits, it does 3d10 + Charisma modifier necrotic damage",
				recovery : "long rest",
				usages : 1,
				action : ["action", ""]
			}
		}
	},
	"oath of vengeance" : {
		regExpSearch : /^(((?=.*(vengeance|wrath|justice))((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper)))))|((?=.*dark)(?=.*knight))|(?=.*avenger)).*$/i,
		subname : "Oath of Vengeance",
		source : ["P", 88],
		spellcastingExtra : ["bane", "hunter's mark", "hold person", "misty step", "haste", "protection from energy", "banishment", "dimension door", "hold monster", "scrying"],
		features : {
			"subclassfeature3" : {
				name : "Channel Divinity: Abjure Enemy",
				source : ["P", 88],
				minlevel : 3,
				description : "\n   " + "As an action, one creature within 60 ft that I can see me must make a Wisdom save" + "\n   " + "If failed, it is frightened and its speed is 0 despite bonuses; if success, its speed is halved" + "\n   " + "This lasts for 1 minute or until it takes damage; Undead/fiends have disadv. on save",
				action : ["action", ""]
			},
			"subclassfeature3.1" : {
				name : "Channel Divinity: Vow of Enmity",
				source : ["P", 88],
				minlevel : 3,
				description : "\n   " + "As a bonus action, I utter a vow against a creature I can see within 10 ft" + "\n   " + "I have advantage on attack rolls against it for 1 minute or until it is at 0 HP/unconscious",
				action : ["bonus action", ""]
			},
			"subclassfeature7" : {
				name : "Relentless Avenger",
				source : ["P", 88],
				minlevel : 7,
				description : "\n   " + "After I hit with an opportunity attack, I can move 1/2 my speed in the same reaction" + "\n   " + "This movement doesn't provoke opportunity attacks"
			},
			"subclassfeature15" : {
				name : "Soul of Vengeance",
				source : ["P", 88],
				minlevel : 15,
				description : "\n   " + "When an enemy I have an active Vow of Enmity against makes an attack, I can react" + "\n   " + "As a reaction, I can make a melee weapon attack against it if it is within range",
				action : ["reaction", " (with Vow of Enmity"]
			},
			"subclassfeature20" : {
				name : "Avenging Angel",
				source : ["P", 88],
				minlevel : 20,
				description : "\n   " + "As an action, I gain a flying speed of 60 ft and a 30 ft aura of menace for 1 hour" + "\n   " + "When a creature first enters or starts its turn in the aura, it must make a Wis save" + "\n   " + "If failed, for 1 min or until it takes damage, it is frightened and attacks vs. it have adv.",
				recovery : "long rest",
				usages : 1,
				action : ["action", ""]
			}
		}
	},
	"beast master" : {
		regExpSearch : /^(?=.*(animal|beast))((?=.*(master|ranger|strider))|((?=.*(nature|natural|green))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
		subname : "Beast Master",
		fullname : "Beast Master",
		source : ["P", 93],
		features : {
			"subclassfeature3" : {
				name : "Ranger's Companion",
				source : ["P", 93],
				minlevel : 3,
				description : "\n   " + "It adds my proficiency bonus to AC, attacks, damage, and save/skill proficiencies" + "\n   " + "Its Hit Point maximum equals four times my ranger level if higher than its normal HP" + "\n   " + "It takes a turn on my initiative; It only takes an action if I command it to" + "\n   " + "As an action, I can have it do an Attack/Dash/Disengage/Dodge/Help action on its turn" + "\n   " + "Can attack while commanding with Extra Attack; Order movement at no action cost",
				additional : "1/4 CR up to medium sized beast",
				action : ["action", " (Command)"]
			},
			"subclassfeature7" : {
				name : "Exceptional Training",
				source : ["P", 93],
				minlevel : 7,
				description : "\n   " + "As a bonus action, I can have my beast Dash/Disengage/Dodge/Help on its turn",
				action : ["bonus action", ""]
			},
			"subclassfeature11" : {
				name : "Bestial Fury",
				source : ["P", 93],
				minlevel : 11,
				description : "\n   " + "When I command my beast to use the Attack action, it can attack twice on its turn"
			},
			"subclassfeature15" : {
				name : "Share Spells",
				source : ["P", 93],
				minlevel : 15,
				description : "\n   " + "When I cast a spell on myself, I can have it also affect my beast if it is within 30 ft"
			}
		}
	},
	"hunter" : {
		regExpSearch : /^(?!.*(monster|barbarian|bard|cleric|druid|fighter|monk|paladin|rogue|sorcerer|warlock|wizard))(?=.*(hunter|huntress|hunts(wo)?m(e|a)n)).*$/i,
		subname : "Hunter",
		fullname : "Hunter",
		source : ["P", 93],
		features : {
			"subclassfeature3" : {
				name : "Hunter's Prey",
				source : ["P", 93],
				minlevel : 3,
				description : "\n   " + "Choose Colossus Slayer, Giant Killer, or Horde Breaker with the \"Choose Feature\" button",
				choices : ["Colossus Slayer", "Giant killer", "Horde Breaker"],
				"colossus slayer" : {
					name : "Hunter's Prey: Colossus Slayer",
					description : "\n   " + "Once per turn, when hitting someone that is below max HP, I do an extra 1d8 damage"
				},
				"giant killer" : {
					name : "Hunter's Prey: Giant Killer",
					description : "\n   " + "As a reaction, when a Large or larger enemy in 5 ft attacks me, I can attack it once",
					action : ["reaction", ""]
				},
				"horde breaker" : {
					name : "Hunter's Prey: Horde Breaker",
					description : "\n   " + "Once per turn, when I hit a creature, I can make an attack vs. another within 5 ft of it"
				}
			},
			"subclassfeature7" : {
				name : "Defensive Tactics",
				source : ["P", 93],
				minlevel : 7,
				description : "\n   " + "\"Choose Feature\" button to choose Escape the Horde, Multiattack Defense, or Steel Will",
				choices : ["Escape the Horde", "Multiattack Defense", "Steel Will"],
				"escape the horde" : {
					name : "Defensive Tactic: Escape the Horde",
					description : "\n   " + "Creatures attacking me with opportunity attacks have disadvantage on the attack rolls"
				},
				"multiattack defense" : {
					name : "Defensive Tactic: Multiattack Defense",
					description : "\n   " + "When a creature hits me, I gain +4 AC against that creature for the rest of the turn"
				},
				"steel will" : {
					name : "Defensive Tactic: Steel Will",
					description : "\n   " + "I have advantage on saves against being frightened",
					save : "Adv. on saves vs. being frightened"
				}
			},
			"subclassfeature11" : {
				name : "Multiattack",
				source : ["P", 93],
				minlevel : 11,
				description : "\n   " + "Choose Volley or Whirlwind Attack using the \"Choose Feature\" button above",
				choices : ["Volley", "Whirlwind Attack"],
				"volley" : {
					name : "Multiattack: Volley",
					description : "\n   " + "As an action, I can make ranged attacks vs. all within a 10-ft radius of a point in range",
					action : ["action", ""]
				},
				"whirlwind attack" : {
					name : "Multiattack: Whirlwind Attack",
					description : "\n   " + "As an action, I can make melee attacks vs. all creatures within 5 ft of me",
					action : ["action", ""]
				}
			},
			"subclassfeature15" : {
				name : "Superior Hunter's Defense",
				source : ["P", 93],
				minlevel : 15,
				description : "\n   " + "\"Choose Feature\" button to choose Evasion, Stand Against the Tide, or Uncanny Dodge",
				choices : ["Evasion", "Stand Against the Tide", "Uncanny Dodge"],
				"evasion" : {
					name : "Evasion",
					description : "\n   " + "My Dexterity saves vs. areas of effect negate damage on success and halve it on failure",
					save : "Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg"
				},
				"stand against the tide" : {
					name : "Stand Against the Tide",
					description : "\n   " + "When a creature misses me with a melee attack, I can use my reaction on the attack" + "\n   " + "I force the attacker to repeat it vs. another (not attacker) of my choice within range",
					action : ["reaction", ""]
				},
				"uncanny dodge" : {
					name : "Uncanny Dodge",
					description : "\n   " + "As a reaction, I halve the damage of an attack from an attacker that I can see",
					action : ["reaction", ""]
				}
			}
		}
	},
	"arcane trickster" : {
		regExpSearch : /^(?=.*(trickster|rogue|miscreant))(?=.*\b(eldritch|arcane|magic|mage|witch)\b).*$/i,
		subname : "Arcane Trickster",
		fullname : "Arcane Trickster",
		source : ["P", 98],
		abilitySave : 4,
		spellcastingFactor : 3,
		spellcastingList : {
			class : "wizard",
			school : ["Ench", "Illus"],
			level : [0, 4], //lower and higher limit
		},
		spellcastingKnown : {
			cantrips : [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
			spells : [0, 0, 2, 3, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9],
		},
		features : {
			"subclassfeature3" : {
				name : "Spellcasting",
				source : ["P", 98],
				minlevel : 3,
				description : "\n   " + "I can cast known wizard cantrips/spells, using Intelligence as my spellcasting ability",
				additional : ["", "", "3 cantrips \u0026 3 spells known", "3 cantrips \u0026 4 spells known", "3 cantrips \u0026 4 spells known", "3 cantrips \u0026 4 spells known", "3 cantrips \u0026 5 spells known", "3 cantrips \u0026 6 spells known", "3 cantrips \u0026 6 spells known", "4 cantrips \u0026 7 spells known", "4 cantrips \u0026 8 spells known", "4 cantrips \u0026 8 spells known", "4 cantrips \u0026 9 spells known", "4 cantrips \u0026 10 spells known", "4 cantrips \u0026 10 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 12 spells known", "4 cantrips \u0026 13 spells known"],
				spellcastingBonus : [{//for the Mage Hand cantrip gained at level 1
					name : "Mage Hand cantrip",
					spells : ["mage hand"],
					selection : ["mage hand"],
				}, { //for the spells gained at level 3, 8, 14, 20
					name : "From any School",
					class : "wizard",
					times : [0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4],
					level : [1, 4], //lower and higher limit
				}],
			},
			"subclassfeature3.1" : {
				name : "Mage Hand Legerdemain",
				source : ["P", 98],
				minlevel : 3,
				description : "\n   " + "As a bonus action, I can direct my Mage Hand" + "\n   " + "With a Dex (Sleight of Hand) vs. Wis (Perception) checks, I can do so discreetly" + "\n   " + "I can make it invisible and perform the following tasks:" + "\n    - " + "Stow/retrieve an object the hand is holding in a container worn/carried by another" + "\n    - " + "Use thieves' tools to pick locks and disarm traps at range",
				action : ["bonus action", ""]
			},
			"subclassfeature9" : {
				name : "Magical Ambush",
				source : ["P", 98],
				minlevel : 9,
				description : "\n   " + "When I cast a spell while hidden, the target(s) have disadvantage against that spell"
			},
			"subclassfeature13" : {
				name : "Versatile Trickster",
				source : ["P", 98],
				minlevel : 13,
				description : "\n   " + "As a bonus action, gain adv. on attacks this turn on creature within 5 ft of Mage Hand",
				action : ["bonus action", ""]
			},
			"subclassfeature17" : {
				name : "Spell Thief",
				source : ["P", 98],
				minlevel : 17,
				description : "\n   " + "As a reaction, after a spell is cast at me, I can try to negate and steal it" + "\n   " + "The caster makes a save against my spell DC with his/her spellcasting ability" + "\n   " + "On failure, the caster forgets how to cast that spell for eight hours" + "\n   " + "If I have a spell slot of a high enough level for it, I learn how to cast it during this time",
				action : ["reaction", ""],
				recovery : "long rest",
				usages : 1
			}
		}
	},
	"assassin" : {
		regExpSearch : /^(?!.*(barbarian|bard|cleric|druid|fighter|monk|paladin|ranger|sorcerer|warlock|wizard))(?=.*assassin).*$/i,
		subname : "Assassin",
		fullname : "Assassin",
		source : ["P", 97],
		abilitySave : 2,
		features : {
			"subclassfeature3" : {
				name : "Bonus Proficiencies",
				source : ["P", 97],
				minlevel : 3,
				description : "\n   " + "I am proficient with disguise kits and poisoner's kits",
				eval : "AddTool(\"Disguise kit\", \"Assassin\"); AddTool(\"Poisoner's kit\", \"Assassin\");",
				removeeval : "RemoveTool(\"Disguise kit\", \"Assassin\"); RemoveTool(\"Poisoner's kit\", \"Assassin\");"
			},
			"subclassfeature3.1" : {
				name : "Assassinate",
				source : ["P", 97],
				minlevel : 3,
				description : "\n   " + "I have adv. on attack rolls against creatures that have not taken a turn in combat yet" + "\n   " + "Any hit I score against a creature that is surprised is a critical hit"
			},
			"subclassfeature9" : {
				name : "Infiltration Expertise",
				source : ["P", 97],
				minlevel : 9,
				description : "\n   " + "I can create false identities in 7 days for 25 gp"
			},
			"subclassfeature13" : {
				name : "Imposter",
				source : ["P", 97],
				minlevel : 13,
				description : "\n   " + "After 3 hours of studying a person, I can mimic speech, writing, and behavior" + "\n   " + "I have advantage on Charisma (Deception) checks to maintain this ruse"
			},
			"subclassfeature17" : {
				name : "Death Strike",
				source : ["P", 97],
				minlevel : 17,
				description : "\n   " + "When I hit a surprised creature, it must make a Con save or take double damage",
				additional : "Save DC: 8 + Dex mod + Proficiency bonus"
			}
		}
	},
	"mastermind" : {
		regExpSearch : /^(?!.*(barbarian|bard|cleric|druid|fighter|monk|paladin|ranger|sorcerer|warlock|wizard))(?=.*(mastermind|strategist)).*$/i,
		subname : "Mastermind",
		fullname : "Mastermind",
		source : ["S", 135],
		features : {
			"subclassfeature3" : {
				name : "Master of Intrigue",
				source : ["S", 135],
				minlevel : 3,
				description : "\n   " + "I gain proficiency with disguise kits, forgery kits, one gaming set, and two languages" + "\n   " + "I can mimic speech patterns and accents if I've heard them for at least 1 minute",
				eval : "AddTool(\"Disguise kit\", \"Mastermind\"); AddTool(\"Forgery kit\", \"Mastermind\"); AddTool(\"One gaming set\", \"Mastermind\"); AddLanguage(\"+2 from Mastermind\", \"Mastermind\");",
				removeeval : "RemoveTool(\"Disguise kit\", \"Mastermind\"); RemoveTool(\"Forgery kit\", \"Mastermind\"); RemoveTool(\"One gaming set\", \"Mastermind\"); RemoveLanguage(\"+2 from Mastermind\", \"Mastermind\");"
			},
			"subclassfeature3.1" : {
				name : "Master of Tactics",
				source : ["S", 135],
				minlevel : 3,
				description : "\n   " + "I can use the Help action as a bonus action" + "\n   " + "This even works if the ally attacks a target within 30 ft of me that can see or hear me",
				action : ["bonus action", ""]
			},
			"subclassfeature9" : {
				name : "Insightful Manipulator",
				source : ["S", 135],
				minlevel : 9,
				description : "\n   " + "By spending 1 minute observing/interacting outside of combat I can learn capabilities" + "\n   " + "The DM tells me if the target is my equal, superior, or inferior in regard to two things:" + "\n   " + " - Intelligence score    - Wisdom score    - Charisma score    - Class levels (if any)",
				action : ["action", ""]
			},
			"subclassfeature13" : {
				name : "Misdirection",
				source : ["S", 135],
				minlevel : 13,
				description : "\n   " + "As a reaction, I can redirect an attack meant for me to a creature within 5 ft of me" + "\n   " + "This only works if the creature is providing me with cover against the attack",
				action : ["reaction", ""]
			},
			"subclassfeature17" : {
				name : "Sould of Deceit",
				source : ["S", 135],
				minlevel : 17,
				description : "\n   " + "My thoughts can't be read by telepathy or similar means; I can project false thoughts" + "\n   " + "For that, I must pass a Cha (Deception) vs. Wis (Insight) check to fool the mind reader" + "\n   " + "Magic always determines I'm truthful; I can't be magically compelled to tell the truth"
			}
		}
	},
	"swashbuckler" : {
		regExpSearch : /^(?!.*(barbarian|bard|cleric|druid|fighter|monk|paladin|ranger|sorcerer|warlock|wizard))(?=.*swashbuckl).*$/i,
		subname : "Swashbuckler",
		fullname : "Swashbuckler",
		source : ["S", 135],
		features : {
			"subclassfeature3" : {
				name : "Fancy Footwork",
				source : ["S", 135],
				minlevel : 3,
				description : "\n   " + "Enemies I make a melee attack against in my turn can't use opportunity attacks on me" + "\n   " + "This lasts until the end of my turn"
			},
			"subclassfeature3.1" : {
				name : "Rakish Audacity",
				source : ["S", 136],
				minlevel : 3,
				description : "\n   " + "I don't need advantage to sneak attack if my target is the only one within 5 ft of me" + "\n   " + "I can add my Charisma modifier to initiative rolls",
				eval : "if (!What(\"Init Bonus\")) {Value(\"Init Bonus\", \"Cha\")}",
				removeeval : "if (What(\"Init Bonus\") === \"Cha\") {Value(\"Init Bonus\", \"\")}"
			},
			"subclassfeature9" : {
				name : "Panache",
				source : ["S", 136],
				minlevel : 9,
				description : "\n   " + "As an action, I can beguile a creature that hears and understands me, for 1 minute" + "\n   " + "It must make a Wisdom (Insight) check opposed by my Charisma (Persuasion)" + "\n   - " + "A hostile target gains disadv. on attacks and can't do opportunity attacks vs. not-me" + "\n     " + "This effect ends if an ally attacks or casts a spell vs. it, or if it and I are 60 ft apart" + "\n   - " + "Targets that are not hostile are charmed and regard me as a friendly acquaintance" + "\n     " + "This effect ends if me or and ally do anything harmful to it",
				action : ["action", ""]
			},
			"subclassfeature13" : {
				name : "Elegant Maneuver",
				source : ["S", 136],
				minlevel : 13,
				description : "\n   " + "As a bonus action, I can gain adv. on my next Dex (Acrobatics) or Str (Athletics) check",
				action : ["bonus action", ""]
			},
			"subclassfeature17" : {
				name : "Master Duelist",
				source : ["S", 136],
				minlevel : 17,
				description : "\n   " + "Once per short rest, when I miss with an attack roll, I can roll again with advantage",
				recovery : "short rest",
				usages : 1
			}
		}
	},
	"thief" : {
		regExpSearch : /^(?!.*(barbarian|bard|cleric|druid|fighter|monk|paladin|ranger|sorcerer|warlock|wizard))(?=.*(thief|burglar)).*$/i,
		subname : "Thief",
		fullname : "Thief",
		source : ["P", 97],
		features : {
			"subclassfeature3" : {
				name : "Fast Hands",
				source : ["P", 97],
				minlevel : 3,
				description : "\n   " + "As a bonus action, I can do one of the following:" + "\n    - " + "Make a Dexterity (Sleight of Hand) check" + "\n    - " + "Use my thieves' tools to disarm a trap or open a lock" + "\n    - " + "Take the Use an Object action",
				action : ["bonus action", ""]
			},
			"subclassfeature3.1" : {
				name : "Second-Story Work",
				source : ["P", 97],
				minlevel : 3,
				description : "\n   " + "I climb at my normal speed; I add my Dex modifier to the distance of a running jump"
			},
			"subclassfeature9" : {
				name : "Supreme Sneak",
				source : ["P", 97],
				minlevel : 9,
				description : "\n   " + "I have advantage on Dexterity (Stealth) checks when moving no more than half speed"
			},
			"subclassfeature13" : {
				name : "Use Magic Device",
				source : ["P", 97],
				minlevel : 13,
				description : "\n   " + "I can use magic items even if I don't meet the class, race, and/or level requirements"
			},
			"subclassfeature17" : {
				name : "Thief's Reflexes",
				source : ["P", 97],
				minlevel : 17,
				description : "\n   " + "Unless surprised, I can take two turns on the first round of any combat" + "\n   " + "The first turn is at my regular initiative, and the second is at my initiative - 10"
			}
		}
	},
	"draconic bloodline" : {
		regExpSearch : /^(?=.*(sorcerer|witch))(?=.*(draconic|dragon)).*$/i,
		subname : "Draconic Bloodline",
		source : ["P", 102],
		features : {
			"subclassfeature1" : {
				name : "Dragon Ancestor",
				source : ["P", 102],
				minlevel : 1,
				description : "\n   " + "Choose a Dragon Ancestor using the \"Choose Feature\" button above" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
				choices : ["Black Dragon Ancestor", "Blue Dragon Ancestor", "Brass Dragon Ancestor", "Bronze Dragon Ancestor", "Copper Dragon Ancestor", "Gold Dragon Ancestor", "Green Dragon Ancestor", "Red Dragon Ancestor", "Silver Dragon Ancestor", "White Dragon Ancestor"],
				"black dragon ancestor" : {
					name : "Black Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with black dragons, which are affiliated with acid damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = [\"sorcerer\", \"subclassfeature6\", \"acid\"]; if (classes.known.sorcerer.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "acid"
				},
				"blue dragon ancestor" : {
					name : "Blue Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with blue dragons, which are affiliated with lightning damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = [\"sorcerer\", \"subclassfeature6\", \"lightning\"]; if (classes.known.sorcerer.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.slice(0,3).toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "lightning"
				},
				"brass dragon ancestor" : {
					name : "Brass Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with brass dragons, which are affiliated with fire damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = [\"sorcerer\", \"subclassfeature6\", \"fire\"]; if (classes.known.sorcerer.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "fire"
				},
				"bronze dragon ancestor" : {
					name : "Bronze Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with bronze dragons, which are affiliated with lightning dmg" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = [\"sorcerer\", \"subclassfeature6\", \"lightning\"]; if (classes.known.sorcerer.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "lightning"
				},
				"copper dragon ancestor" : {
					name : "Copper Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with copper dragons, which are affiliated with acid damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = [\"sorcerer\", \"subclassfeature6\", \"acid\"]; if (classes.known.sorcerer.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "acid"
				},
				"gold dragon ancestor" : {
					name : "Gold Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with gold dragons, which are affiliated with fire damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = [\"sorcerer\", \"subclassfeature6\", \"fire\"]; if (classes.known.sorcerer.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "fire"
				},
				"green dragon ancestor" : {
					name : "Green Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with green dragons, which are affiliated with poison damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = [\"sorcerer\", \"subclassfeature6\", \"poison\"]; if (classes.known.sorcerer.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "poison"
				},
				"red dragon ancestor" : {
					name : "Red Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with red dragons, which are affiliated with fire damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = [\"sorcerer\", \"subclassfeature6\", \"fire\"]; if (classes.known.sorcerer.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "fire"
				},
				"silver dragon ancestor" : {
					name : "Silver Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with silver dragons, which are affiliated with cold damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = [\"sorcerer\", \"subclassfeature6\", \"cold\"]; if (classes.known.sorcerer.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "cold"
				},
				"white dragon ancestor" : {
					name : "White Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with white dragons, which are affiliated with cold damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = [\"sorcerer\", \"subclassfeature6\", \"cold\"]; if (classes.known.sorcerer.level >= 6 && tDoc.getField(\"Class Features Remember\").value.indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "cold"
				},
				eval : "AddLanguage(\"Draconic\", \"being a Sorcerer (Draconic Bloodline)\");",
				removeeval : "RemoveLanguage(\"Draconic\", \"being a Sorcerer (Draconic Bloodline)\");"
			},
			"subclassfeature1.1" : {
				name : "Draconic Resilience",
				source : ["P", 102],
				minlevel : 1,
				description : "\n   " + "When I am not wearing armor, my AC is 13 + Dexterity modifier" + "\n   " + "My hit point maximum increases by an amount equal to my sorcerer level",
				calcChanges : {
					hp : "if (classes.known.sorcerer) {extrahp += classes.known.sorcerer.level; extrastring += '\\n + ' + classes.known.sorcerer.level + ' from Draconic Resilience (Sorcerer)'; }; "
				}
			},
			"subclassfeature6" : {
				name : "Elemental Affinity",
				source : ["P", 102],
				minlevel : 6,
				description : "\n   " + "Choose a Dragon Ancestor using the \"Choose Feature\" button above" + "\n   " + "I add Cha mod for spell damage if matching my dragon ancestor's affiliated type" + "\n   " + "I can spend 1 sorcery point to gain resistance to my dragon ancestor's affiliated type",
				choices : ["acid", "cold", "fire", "lightning", "poison"],
				choicesNotInMenu : true,
				"acid" : {
					name : "Acid Elemental Affinity",
					description : " [1 sorcery point]" + "\n   " + "I add my Charisma modifier to one damage roll of a spell if it does acid damage" + "\n   " + "When I do this, I can spend 1 sorcery point to gain acid resistance for 1 hour",
					calcChanges : {
						atkCalc : ["if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && isSpell && (/acid/i).test(fields.Damage_Type)) { output.extraDmg += What('Cha Mod'); }; ", "Cantrips and spell that deal acid damage get my Charisma modifier added to their Damage."]
					}
				},
				"cold" : {
					name : "Cold Elemental Affinity",
					description : " [1 sorcery point]" + "\n   " + "I add my Charisma modifier to one damage roll of a spell if it does cold damage" + "\n   " + "When I do this, I can spend 1 sorcery point to gain cold resistance for 1 hour",
					calcChanges : {
						atkCalc : ["if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && isSpell && (/cold/i).test(fields.Damage_Type)) { output.extraDmg += What('Cha Mod'); }; ", "Cantrips and spell that deal cold damage get my Charisma modifier added to their Damage."]
					}
				},
				"fire" : {
					name : "Fire Elemental Affinity",
					description : " [1 sorcery point]" + "\n   " + "I add my Charisma modifier to one damage roll of a spell if it does fire damage" + "\n   " + "When I do this, I can spend 1 sorcery point to gain fire resistance for 1 hour",
					calcChanges : {
						atkCalc : ["if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && isSpell && (/fire/i).test(fields.Damage_Type)) { output.extraDmg += What('Cha Mod'); }; ", "Cantrips and spell that deal fire damage get my Charisma modifier added to their Damage."]
					}
				},
				"lightning" : {
					name : "Lightning Elemental Affinity",
					description : " [1 sorcery point]" + "\n   " + "I add my Charisma modifier to one damage roll of a spell if it does lightning damage" + "\n   " + "When I do this, I can spend 1 sorcery point to gain lightning resistance for 1 hour",
					calcChanges : {
						atkCalc : ["if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && isSpell && (/lightning/i).test(fields.Damage_Type)) { output.extraDmg += What('Cha Mod'); }; ", "Cantrips and spell that deal lightning damage get my Charisma modifier added to their Damage."]
					}
				},
				"poison" : {
					name : "Poison Elemental Affinity",
					description : " [1 sorcery point]" + "\n   " + "I add my Charisma modifier to one damage roll of a spell if it does poison damage" + "\n   " + "When I do this, I can spend 1 sorcery point to gain poison resistance for 1 hour",
					calcChanges : {
						atkCalc : ["if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && isSpell && (/poison/i).test(fields.Damage_Type)) { output.extraDmg += What('Cha Mod'); }; ", "Cantrips and spell that deal poison damage get my Charisma modifier added to their Damage."]
					}
				},
				eval : "if (FeaChoice === \"\") {var CFrem = What(\"Class Features Remember\"); var tReg = /.*?sorcerer,subclassfeature1,((black|blue|brass|bronze|copper|gold|green|red|silver|white) dragon ancestor).*/i; if ((tReg).test(CFrem)) {FeaChoice = CurrentClasses.sorcerer.features.subclassfeature1[CFrem.replace(tReg, \"$1\")].dragonElement; AddString(\"Class Features Remember\", \"sorcerer,subclassfeature6,\" + FeaChoice, false);};};",
			},
			"subclassfeature14" : {
				name : "Dragon Wings",
				source : ["P", 103],
				minlevel : 14,
				description : "\n   " + "As a bonus action, unless armor is in the way, I can sprout dragon wings from my back" + "\n   " + "I gain a fly speed equal to my current speed until I dismiss the wings as a bonus action",
				action : ["bonus action", " (start/stop)"]
			},
			"subclassfeature18" : {
				name : "Draconic Presence",
				source : ["P", 103],
				minlevel : 18,
				description : "\n   " + "As an action, I create 60-ft radius aura of awe/fear for concentration up to 1 minute" + "\n   " + "All hostiles in this aura must make a Wis save or be charmed (awe) or frightened (fear)" + "\n   " + "They make their saves at the beginning of their turns" + "\n   " + "A creature that succeeds on the save is immune to my aura for 24 hours",
				additional : "5 sorcery points",
				action : ["action", ""]
			}
		}
	},
	"storm sorcery" : {
		regExpSearch : /^(?=.*(sorcerer|witch))((?=.*(storm|tempest|hurricane))|((?=.*air)(?=.*element))).*$/i,
		subname : "Storm Sorcery",
		fullname : "Storm Sorcerer",
		source : ["S", 137],
		features : {
			"subclassfeature1" : {
				name : "Wind Speaker",
				source : ["S", 137],
				minlevel : 1,
				description : "\n   " + "I can speak, read, and write Primordial (and its dialects Aquan, Auran, Ignan, Terran)",
				eval : "AddLanguage(\"Primordial\", \"being a Storm Sorcerer\");",
				removeeval : "RemoveLanguage(\"Primordial\", \"being a Storm Sorcerer\");",
			},
			"subclassfeature1.1" : {
				name : "Tempestuous Magic",
				source : ["S", 137],
				minlevel : 1,
				description : "\n   " + "As a bonus action, after casting a 1st-level or higher spell, I can control elemental air" + "\n   " + "I can use this control to fly up to 10 feet without provoking opportunity attacks",
				action : ["bonus action", " (after casting)"],
			},
			"subclassfeature6" : {
				name : "Heart of the Storm",
				source : ["S", 137],
				minlevel : 6,
				description : "\n   " + "I have resistance to lightning and thunder damage" + "\n   " + "When I start casting a 1st-level or higher spell that deals lightning or thunder damage," + "\n   " + "I deal lightning or thunder damage to a creature within 10 ft of me that I can see",
				additional : ["", "", "", "", " ", "3 damage", "3 damage", "4 damage", "4 damage", "5 damage", "5 damage", "6 damage", "6 damage", "7 damage", "7 damage", "8 damage", "8 damage", "9 damage", "9 damage", "10 damage"],
				eval : "AddResistance(\"Lightning\", \"Storm Sorcerer\"); AddResistance(\"Thunder\", \"Storm Sorcerer\");",
				removeeval : "RemoveResistance(\"Lightning\"); RemoveResistance(\"Thunder\");"
			},
			"subclassfeature6.1" : {
				name : "Storm Guide",
				source : ["S", 137],
				minlevel : 6,
				description : "\n   " + "As an action, I can stop rain around me in 20-ft radius; bonus action for it to resume" + "\n   " + "As a bonus action, I can choose the direction of wind around me in a 100-ft radius" + "\n   " + "This lasts until the end of my next turn and doesn't alter the wind's speed",
				action : ["bonus action", ""],
			},
			"subclassfeature14" : {
				name : "Storm's Fury",
				source : ["S", 137],
				minlevel : 14,
				description : "\n   " + "As a reaction when hit by a melee attack, I can deal lightning damage to the attacker" + "\n   " + "The attacker must also make a Strength save or be pushed up to 20 ft away from me",
				action : ["reaction", ""],
				additional : ["", "", "", "", "", "", "", "", "", "", "", "", "", "14 lightning damage", "15 lightning damage", "16 lightning damage", "17 lightning damage", "18 lightning damage", "19 lightning damage", "20 lightning damage"],
			},
			"subclassfeature18" : {
				name : "Wind Soul",
				source : ["S", 137],
				minlevel : 18,
				description : "\n   " + "I have immunity to lightning and thunder damage and gain magical 60 ft fly speed" + "\n   " + "As an action, I reduce my fly speed to 30 ft and give allies 30 ft fly speed for 1 hour" + "\n   " + "I can do this once per short rest for up to 3 + my Charisma modifier allies within 30 ft",
				action : ["action", ""],
				save : "Immune to lightning and thunder damage",
				eval : "RemoveResistance(\"Lightning\"); RemoveResistance(\"Thunder\"); AddString(\"Speed\", \"60 ft fly\", true); AddString(\"Speed encumbered\", \"60 ft fly\", true);",
				removeeval : "AddResistance(\"Lightning\", \"Storm Sorcerer\"); AddResistance(\"Thunder\", \"Storm Sorcerer\"); RemoveString(\"Speed\", \"60 ft fly\", true); RemoveString(\"Speed encumbered\", \"60 ft fly\", true);",
				usages : 1,
				recovery : "short rest"
			}
		}
	},
	"wild magic" : {
		regExpSearch : /^(?=.*(mage|magus|sorcerer|witch))(?=.*(wild|chaos|chaotic|limbo)).*$/i,
		subname : "Wild Magic",
		fullname : "Wild Mage",
		source : ["P", 103],
		features : {
			"subclassfeature1" : {
				name : "Wild Magic Surge",
				source : ["P", 103],
				minlevel : 1,
				description : "\n   " + "Wild Magic Surges happen 5% of the time that I cast a sorcerer spell (PHB 104)" + "\n   " + "This doesn't happen with cantrips and I only take this chance if the DM tells me to"
			},
			"subclassfeature1.1" : {
				name : "Tides of Chaos",
				source : ["P", 103],
				minlevel : 1,
				description : "\n   " + "I can gain advantage on either one attack roll, ability check, or saving throw" + "\n   " + "After I cast a 1st-level or higher sorcerer spell, the DM can impose a Wild Magic Surge" + "\n   " + "After I roll on the Wild Magic Surge table, I regain my use of Tides of Chaos",
				recovery : "long rest",
				usages : 1
			},
			"subclassfeature6" : {
				name : "Bend Luck",
				source : ["P", 103],
				minlevel : 6,
				description : "\n   " + "As a reaction, I can add/subtract 1d4 from another's attack roll, ability check, or save",
				action : ["reaction", " (2 sorcery points)"],
				additional : "2 sorcery points",
			},
			"subclassfeature14" : {
				name : "Controlled Chaos",
				source : ["P", 103],
				minlevel : 14,
				description : "\n   " + "Whenever I roll on the Wild Magic Surge table, I can roll twice and use either result"
			},
			"subclassfeature18" : {
				name : "Spell Bombardment",
				source : ["P", 103],
				minlevel : 18,
				description : "\n   " + "Once per turn, when I roll spell damage, I can take one damage die that rolled max" + "\n   " + "I can then roll this die again and add it to the spell's damage"
			}
		}
	},
	"the archfey" : {
		regExpSearch : /^(?=.*fey)(?=.*warlock).*$/i,
		subname : "the Archfey",
		source : ["P", 109],
		spellcastingExtra : ["faerie fire", "sleep", "calm emotions", "phantasmal force", "blink", "plant growth", "dominate beast", "greater invisibility", "dominate person", "seeming"],
		features : {
			"subclassfeature1" : {
				name : "Fey Presence",
				source : ["P", 109],
				minlevel : 1,
				description : "\n   " + "As an action, all creatures in a 10-ft cube around me must make a Wisdom save" + "\n   " + "If failed, they're all charmed or frightened (my choice) until the end of my next turn",
				recovery : "short rest",
				usages : 1,
				action : ["action", ""]
			},
			"subclassfeature6" : {
				name : "Misty Escape",
				source : ["P", 109],
				minlevel : 6,
				description : "\n   " + "As a reaction, when I take damage, I can turn invisible and teleport up to 60 ft" + "\n   " + "I stay invisible until the start of my next turn or until I attack or cast a spell",
				action : ["reaction", " (taking damage)"],
				recovery : "short rest",
				usages : 1
			},
			"subclassfeature10" : {
				name : "Beguiling Defenses",
				source : ["P", 109],
				minlevel : 10,
				description : "\n   " + "As a reaction, when a creature tries to charm me, I can turn the charm back on it" + "\n   " + "It must make a Wis save or be charmed by me for 1 minute or until taking damage" + "\n   " + "I am immune to being charmed",
				action : ["reaction", " (when charmed)"],
				save : "Immune to being charmed"
			},
			"subclassfeature14" : {
				name : "Dark Delirium",
				source : ["P", 109],
				minlevel : 14,
				description : "\n   " + "As an action, a creature within 60 ft must make a Wis save or be charmed/frightened" + "\n   " + "This lasts for 1 minute or until my concentration is broken or it takes damage" + "\n   " + "During this time, it can't see or hear anything but the illusion, me, and itself",
				recovery : "short rest",
				usages : 1,
				action : ["action", ""]
			}
		}
	},
	"the fiend" : {
		regExpSearch : /^(?=.*(fiend|devil|demon|daemon|hell|abyss))(?=.*warlock).*$/i,
		subname : "the Fiend",
		source : ["P", 109],
		spellcastingExtra : ["burning hands", "command", "blindness/deafness", "scorching ray", "fireball", "stinking cloud", "fire shield", "wall of fire", "flame strike", "hallow"],
		features : {
			"subclassfeature1" : {
				name : "Dark One's Blessing",
				source : ["P", 109],
				minlevel : 1,
				description : "\n   " + "When I reduce a hostile to 0 HP, I gain Cha mod + warlock level temporary HP (min 1)"
			},
			"subclassfeature6" : {
				name : "Dark One's Own Luck",
				source : ["P", 109],
				minlevel : 6,
				description : "\n   " + "When I make an ability check or saving throw, I can add 1d10 after rolling the d20",
				recovery : "short rest",
				usages : 1
			},
			"subclassfeature10" : {
				name : "Fiendish Resilience",
				source : ["P", 109],
				minlevel : 10,
				description : "\n   " + "After a short or long rest, I can choose one damage type to become resistance to" + "\n   " + "This lasts until I choose another type; Magical and silver weapons ignore this resistance"
			},
			"subclassfeature14" : {
				name : "Hurl Through Hell",
				source : ["P", 109],
				minlevel : 14,
				description : "\n   " + "When I hit a creature with an attack, I can instantly transport it through lower planes" + "\n   " + "It returns at the end of my next turn and takes 10d10 psychic damage if not a fiend",
				recovery : "long rest",
				usages : 1
			}
		}
	},
	"the great old one" : {
		regExpSearch : /^(((?=.*(tharizdun|cthulhu))(?=.*warlock))|((?=.*(great|dread))(?=.*(ancient|old))(?=.*\b(one|entity)\b))).*$/i,
		subname : "the Great Old One",
		source : ["P", 110],
		spellcastingExtra : ["dissonant whispers", "tasha's hideous laughter", "detect thoughts", "phantasmal force", "clairvoyance", "sending", "dominate beast", "evard's black tentacles", "dominate person", "telekinesis"],
		features : {
			"subclassfeature1" : {
				name : "Awakened Mind",
				source : ["P", 110],
				minlevel : 1,
				description : "\n   " + "I can telepathically speak to creatures I can see within 30 ft if they know a language" // 'to' not 'with', so one-way
			},
			"subclassfeature6" : {
				name : "Entropic Ward",
				source : ["P", 110],
				minlevel : 6,
				description : "\n   " + "As a reaction, when I'm attacked, I can impose disadvantage to that attack roll" + "\n   " + "If it misses me, I have adv. on my next attack vs. the attacker during my next turn",
				action : ["reaction", " (when attacked)"],
				recovery : "short rest",
				usages : 1
			},
			"subclassfeature10" : {
				name : "Thought Shield",
				source : ["P", 110],
				minlevel : 10,
				description : "\n   " + "No one can read my mind unless I allow it; I have resistance to psychic damage" + "\n   " + "When I take psychic damage, the dealer of the psychic damage takes the same amount",
				eval : "AddResistance(\"Psychic\", \"Warlock (Thought Shield)\");"
			},
			"subclassfeature14" : {
				name : "Create Thrall",
				source : ["P", 110],
				minlevel : 14,
				description : "\n   " + "As an action, I can charm an incapacitated humanoid by touch" + "\n   " + "While it is charmed, I can communicate with it telepathically if it is on the same plane" + "\n   " + "This lasts until the charm is removed (can be by Remove Curse) or I use this again",
				action : ["action", ""]
			}
		}
	},
	"the undying" : {
		regExpSearch : /^(?!.*light)(?=.*warlock)(?=.*(immortal|undying|neverending|unending)).*$/i,
		subname : "the Undying",
		source : ["S", 139],
		spellcastingExtra : ["false life", "ray of sickness", "blindness/deafness", "silence", "feign death", "speak with dead", "aura of life", "death ward", "contagion", "legend lore"],
		features : {
			"subclassfeature1" : {
				name : "Among the Dead",
				source : ["S", 139],
				minlevel : 1,
				description : "\n   " + "I learn the Spare the Dying cantrip and gain advantage on saving throws vs. diseases" + "\n   " + "If an undead targets me directly with an attack or spell, it must make a Wisdom save" + "\n   " + "On a fail, it must choose a new target or forfeit its attack or harmful spell" + "\n   " + "On a success or if I attack or cast a harmful spell on it, it is immune for 24 hours",
				save : "Adv. vs. diseases",
				spellcastingBonus : {
					name : "Among the Dead",
					spells : ["spare the dying"],
					selection : ["spare the dying"],
				},
			},
			"subclassfeature6" : {
				name : "Defy Death",
				source : ["S", 140],
				minlevel : 6,
				description : "\n   " + "I regain 1d8 + my Constitution modifier in HP when I succeed on a Death saving throw" + "\n   " + "I also regain this amount whenever I use Spare the Dying to stabilize a creature",
				recovery : "long rest",
				usages : 1
			},
			"subclassfeature10" : {
				name : "Undying Nature",
				source : ["S", 140],
				minlevel : 10,
				description : "\n   " + "I can hold my breath indefinitely; I don't require food, water, or sleep (I still need rest)" + "\n   " + "I age more slowly, only 1 year for every 10 years that pass; I can't be magically aged"
			},
			"subclassfeature14" : {
				name : "Indestructible Life",
				source : ["S", 140],
				minlevel : 14,
				description : "\n   " + "As a bonus action, I can regain HP and reattach severed body parts",
				action : ["bonus action", ""],
				recovery : "short rest",
				usages : 1,
				additional : ["", "", "", "", "", "", "", "", "", "", "", "", "", "1d8 + 14 HP", "1d8 + 15 HP", "1d8 + 16 HP", "1d8 + 17 HP", "1d8 + 18 HP", "1d8 + 19 HP", "1d8 + 20 HP"],
			}
		}
	},
	"abjuration" : {
		regExpSearch : /(abjuration|abjurer)/i,
		subname : "School of Abjuration",
		fullname : "Abjurer",
		source : ["P", 115],
		features : {
			"subclassfeature2" : {
				name : "Abjuration Savant",
				source : ["P", 115],
				minlevel : 2,
				description : "\n   " + "I halve the gp and time needed to copy abjuration spells into my spellbook"
			},
			"subclassfeature2.1" : {
				name : "Arcane Ward",
				source : ["P", 115],
				minlevel : 2,
				description : "\n   " + "Whenever I cast an 1st-level or higher abjuration spell, I make/heal a ward" + "\n   " + "I make it at max HP; When I cast again, it heals two HP per spell level" + "\n   " + "It stays active at 0 HP and doesn't go away until my next long rest" + "\n   " + "If I take damage, the ward takes the damage instead, but excess damage carries over",
				additional : levels.map( function(n) {
					if (n < 2) return "";
					return "Ward max HP: " + (n * 2) + "+Int mod";
				}),
				usages : 1,
				recovery : "long rest"
			},
			"subclassfeature6" : {
				name : "Protected Ward",
				source : ["P", 115],
				minlevel : 6,
				description : "\n   " + "As a reaction, my Arcane Ward can absorb damage done to a creature within 30 ft",
				action : ["reaction", ""],
			},
			"subclassfeature10" : {
				name : "Improved Abjuration",
				source : ["P", 115],
				minlevel : 10,
				description : "\n   " + "When I cast an abjuration spell requiring an ability check, I add my proficiency bonus"
			},
			"subclassfeature14" : {
				name : "Spell Resistance",
				source : ["P", 116],
				minlevel : 14,
				description : "\n   " + "I have adv. on spell saves and resistance to damaging spells",
				eval : "AddResistance(\"Spells\", \"Abjurer (Spell Resistance)\")",
				removeeval : "RemoveResistance(\"Spells\")",
				save : "Advantage on saves vs. spells"
			}
		}
	},
	"conjuration" : {
		regExpSearch : /(conjuration|conjurer)/i,
		subname : "School of Conjuration",
		fullname : "Conjurer",
		source : ["P", 116],
		features : {
			"subclassfeature2" : {
				name : "Conjuration Savant",
				source : ["P", 116],
				minlevel : 2,
				description : "\n   " + "I halve the gp and time needed to copy conjuration spells into my spellbook"
			},
			"subclassfeature2.1" : {
				name : "Minor Conjuration",
				source : ["P", 116],
				minlevel : 2,
				description : "\n   " + "As an action, I can conjure an object up to 3 ft on each side and no more than 10 lbs" + "\n   " + "It must be of a form of a nonmagical object I have seen and is created within 10 ft" + "\n   " + "The object disappears after 1 hour, if it takes damage, or when I use this feature again",
				action : ["action", ""]
			},
			"subclassfeature6" : {
				name : "Benign Transposition",
				source : ["P", 116],
				minlevel : 6,
				description : "\n   " + "As an action, I can teleport to a place within 30 ft that I can see" + "\n   " + "Instead, I can swap places with a willing Small/Medium creature in 30 ft that I can see" + "\n   " + "I can do this again after a long rest or casting a 1st-level or higher conjuration spell",
				usages : 1,
				recovery : "long rest",
				action : ["action", ""]
			},
			"subclassfeature10" : {
				name : "Focused Conjuration",
				source : ["P", 116],
				minlevel : 10,
				description : "\n   " + "While I am concentrating on a conjuration spell, it can't be broken by taking damage"
			},
			"subclassfeature14" : {
				name : "Durable Summons",
				source : ["P", 116],
				minlevel : 14,
				description : "\n   " + "Any creature I summon or create with a conjuration spell has 30 temporary hit points"
			}
		}
	},
	"divination" : {
		regExpSearch : /(divination|diviner|divinator)/i,
		subname : "School of Divination",
		fullname : "Diviner",
		source : ["P", 116],
		features : {
			"subclassfeature2" : {
				name : "Divination Savant",
				source : ["P", 116],
				minlevel : 2,
				description : "\n   " + "I halve the gp and time needed to copy divination spells into my spellbook"
			},
			"subclassfeature2.1" : {
				name : "Portent",
				source : ["P", 116],
				minlevel : 2,
				description : "\n   " + "After a short or long rest, I roll dice and keep results to be used before my next rest" + "\n   " + "A result can replace an attack/save/ability check made by me or a creature I can see" + "\n   " + "I choose to switch them before the dice to be replaced are rolled; Max once per turn",
				additional : ["", "2d20 after a long rest", "2d20 after a long rest", "2d20 after a long rest", "2d20 after a long rest", "2d20 after a long rest", "2d20 after a long rest", "2d20 after a long rest", "2d20 after a long rest", "2d20 after a long rest", "2d20 after a long rest", "2d20 after a long rest", "2d20 after a long rest", "3d20 after a long rest", "3d20 after a long rest", "3d20 after a long rest", "3d20 after a long rest", "3d20 after a long rest", "3d20 after a long rest", "3d20 after a long rest"]
			},
			"subclassfeature6" : {
				name : "Expert Divination",
				source : ["P", 116],
				minlevel : 6,
				description : "\n   " + "When I cast a divination spell, I recover a spell slot of a lower level than the one I cast",
				additional : "Spell slot < 6th-level"
			},
			"subclassfeature10" : {
				name : "The Third Eye",
				source : ["P", 116],
				minlevel : 10,
				description : "\n   " + "As an action, I gain one of the following until my next short or long rest:" + "\n   " + "Darkvision 60ft, see the Ethereal Plane 60ft, read any language, or see invisibility 10ft",
				recovery : "short rest",
				usages : 1,
				action : ["action", ""]
			},
			"subclassfeature14" : {
				name : "Greater Portent",
				source : ["P", 117],
				minlevel : 14,
				description : "\n   " + "I can roll 3d20 instead of 2d20 when using my Portent feature"
			}
		}
	},
	"enchantment" : {
		regExpSearch : /(enchantment|enchanter)/i,
		subname : "School of Enchantment",
		fullname : "Enchanter",
		source : ["P", 117],
		features : {
			"subclassfeature2" : {
				name : "Enchantment Savant",
				source : ["P", 117],
				minlevel : 2,
				description : "\n   " + "I halve the gp and time needed to copy enchantment spells into my spellbook"
			},
			"subclassfeature2.1" : {
				name : "Hypnotic Gaze",
				source : ["P", 117],
				minlevel : 2,
				description : "\n   " + "As an action, a seen enemy within 5 ft must make a Wis save or be charmed" + "\n   " + "This doesn't work if it can't see/hear me; It's also incapacitated and reduced to 0 speed" + "\n   " + "This lasts until the end of my next turn, but I can use an action to extend the duration" + "\n   " + "It also ends if it takes damage, can't see or hear me, or is more than 5 ft from me" + "\n   " + "On success or once it ends, I can't use this on it again until after a long rest",
				action : ["action", ""]
			},
			"subclassfeature6" : {
				name : "Instinctive Charm",
				source : ["P", 117],
				minlevel : 6,
				description : "\n   " + "As a reaction, when someone I can see in 30 ft attacks me, it must make a Wis save" + "\n   " + "If failed, it must instead attack the closest creature within range (not me or self)" + "\n   " + "On success, I can't use it again until after a long rest; This is a charm effect",
				usages : 1,
				recovery : "long rest",
				action : ["reaction", " (when attacked)"]
			},
			"subclassfeature10" : {
				name : "Split Enchantment",
				source : ["P", 117],
				minlevel : 10,
				description : "\n   " + "When I cast an enchantment spell with only one target, I can target a second in range" + "\n   " + "This does not apply to cantrips"
			},
			"subclassfeature14" : {
				name : "Alter Memories",
				source : ["P", 117],
				minlevel : 14,
				description : "\n   " + "When I cast an enchantment spell that charms, I can have one target be unaware of it" + "\n   " + "Also, once before that spell ends, I can have that target forget time while affected" + "\n   " + "It must make an Intelligence save or lose up to 1 + Charisma modifier hours of memory"
			}
		}
	},
	"evocation" : {
		regExpSearch : /(evocation|evocer|evoker)/i,
		subname : "School of Evocation",
		fullname : "Evoker",
		source : ["P", 117],
		features : {
			"subclassfeature2" : {
				name : "Evocation Savant",
				source : ["P", 117],
				minlevel : 2,
				description : "\n   " + "I halve the gp and time needed to copy evocation spells into my spellbook"
			},
			"subclassfeature2.1" : {
				name : "Sculpt Spells",
				source : ["P", 117],
				minlevel : 2,
				description : "\n   " + "If I cast an evocation spell affecting others I can see, I can protect 1 + the spell's level" + "\n   " + "The chosen automatically succeed on their saving throws vs. the spell" + "\n   " + "They also take no damage if the spell would normally deal half damage on a save"
			},
			"subclassfeature6" : {
				name : "Potent Cantrip",
				source : ["P", 117],
				minlevel : 6,
				description : "\n   " + "Any cantrips I cast still deal half damage on a successful save"
			},
			"subclassfeature10" : {
				name : "Empowered Evocation",
				source : ["P", 117],
				minlevel : 10,
				description : "\n   " + "I can add my Int modifier to a single damage roll of any wizard evocation spell I cast"
			},
			"subclassfeature14" : {
				name : "Overchannel",
				source : ["P", 118],
				minlevel : 14,
				description : "\n   " + "When I cast a 5th-level or lower wizard spell that damages, it can deal max damage" + "\n   " + "Except the first time I do this after a long rest, I suffer 2d12 necrotic dmg per spell lvl" + "\n   " + "Every time I do it after that, before a long rest, I take another 1d12 necrotic damage" + "\n   " + "This necrotic damage surpasses my resistances/immunities; I can't overchannel cantrips",
				recovery : "long rest",
				usagescalc : "event.value = \"1 + \u221E\";",
			}
		}
	},
	"illusion" : {
		regExpSearch : /(illusion|illusionist|illusionary)/i,
		subname : "School of Illusion",
		fullname : "Illusionist",
		source : ["P", 118],
		features : {
			"subclassfeature2" : {
				name : "Illusion Savant",
				source : ["P", 118],
				minlevel : 2,
				description : "\n   " + "I halve the gp and time needed to copy illusion spells into my spellbook"
			},
			"subclassfeature2.1" : {
				name : "Improved Minor Illusion",
				source : ["P", 118],
				minlevel : 2,
				description : "\n   " + "I gain the knowledge of the Minor Illusion cantrip (or another if I already knew it)" + "\n   " + "When I cast it, I can create both a sound and an image with a single casting",
				spellcastingBonus : {
					name : "Minor Illusion cantrip",
					spells : ["minor illusion"],
					selection : ["minor illusion"],
				},
			},
			"subclassfeature6" : {
				name : "Malleable Illusion",
				source : ["P", 118],
				minlevel : 6,
				description : "\n   " + "After I cast an illusion spell that lasts 1 min or longer, I can use an action to change it",
				action : ["action", ""]
			},
			"subclassfeature10" : {
				name : "Illusory Self",
				source : ["P", 118],
				minlevel : 10,
				description : "\n   " + "As a reaction, when I'm attacked, I can impose an illusion that makes the attack miss",
				action : ["reaction", ""],
				recovery : "short rest",
				usages : 1
			},
			"subclassfeature14" : {
				name : "Illusory Reality",
				source : ["P", 118],
				minlevel : 14,
				description : "\n   " + "As a bonus action, after I cast a 1st-level or higher illusion spell, I can make it real" + "\n   " + "One inanimate, nonmagical object that is part of the illusion becomes real for 1 minute" + "\n   " + "The object can't be something that directly harms someone",
				action : ["bonus action", ""],
			}
		}
	},
	"necromancy" : {
		regExpSearch : /(necromancy|necromancer|necromantic)/i,
		subname : "School of Necromancy",
		fullname : "Necromancer",
		source : ["P", 118],
		features : {
			"subclassfeature2" : {
				name : "Necromancy Savant",
				source : ["P", 118],
				minlevel : 2,
				description : "\n   " + "I halve the gp and time needed to copy necromancy spells into my spellbook"
			},
			"subclassfeature2.1" : {
				name : "Grim Harvest",
				source : ["P", 118],
				minlevel : 2,
				description : "\n   " + "Once per turn, when I kill something with a 1st-level or higher spell, I regain hit points" + "\n   " + "The number of hit points regained is 2\u00D7 the spell's level (or 3\u00D7 with necromancy spells)" + "\n   " + "This doesn't occur for constructs/undead",
			},
			"subclassfeature6" : {
				name : "Undead Thralls",
				source : ["P", 119],
				minlevel : 6,
				description : "\n   " + "I add Animate Dead to my spellbook and can have an additional target when casting it" + "\n   " + "Undead created by my necromancy spells have the following benefits:" + "\n   " + "They add my proficiency bonus to damage and my wizard level to their HP maximums"
			},
			"subclassfeature10" : {
				name : "Inured to Undead",
				source : ["P", 119],
				minlevel : 10,
				description : "\n   " + "I have resistance to necrotic damage and my hit point maximum can't be reduced",
				eval : "AddResistance(\"Necrotic\", \"Necromancer (Inured to Undead)\")",
				removeeval : "RemoveResistance(\"Necrotic\")",

			},
			"subclassfeature14" : {
				name : "Command Undead",
				source : ["P", 11],
				minlevel : 14,
				description : "\n   " + "As an action, an undead within 60 ft that I can see must make a Charisma save" + "\n   " + "If its Int is > 7, it has adv. on the save; If its Int is > 11, it repeats the save every hour" + "\n   " + "If failed, it becomes friendly to me and obeys my commands until I use this on another" + "\n   " + "On success, it becomes permanently immune to my further attempts",
				action : ["action", ""]
			}
		}
	},
	"transmutation" : {
		regExpSearch : /(transmutation|transmuter)/i,
		subname : "School of Transmutation",
		fullname : "Transmuter",
		source : ["P", 119],
		features : {
			"subclassfeature2" : {
				name : "Transmutation Savant",
				source : ["P", 119],
				minlevel : 2,
				description : "\n   " + "I halve the gp and time needed to copy transmutation spells into my spellbook"
			},
			"subclassfeature2.1" : {
				name : "Minor Alchemy",
				source : ["P", 119],
				minlevel : 2,
				description : "\n   " + "I can transform an object of wood/stone/iron/copper/silver into another of those" + "\n   " + "For each 10 min I spend, I can transform up to 1 cubic foot of the material" + "\n   " + "It reverts back when I lose concentration or after 1 hour",
			},
			"subclassfeature6" : {
				name : "Transmuter's Stone",
				source : ["P", 119],
				minlevel : 6,
				description : "\n   " + "In 8 hours, I can create a transmuter's stone that gives its wielder one of the following:" + "\n    - " + "Darkvision 60 ft" + "\n    - " + "10 ft increase to speed while unencumbered" + "\n    - " + "Proficiency in Constitution saving throws" + "\n    - " + "Resistance to either acid, cold, fire, lightning, or thunder damage" + "\n   " + "The benefit is chosen at creation; I can have only one active stone at a time" + "\n   " + "I can change the benefit when I cast a 1st-level or higher transmutation spell with it"
			},
			"subclassfeature10" : {
				name : "Shapechanger",
				source : ["P", 119],
				minlevel : 10,
				description : "\n   " + "I add Polymorph to my spellbook; I can cast it on myself without using a spell slot" + "\n   " + "When I do that, I can only transform into a beast with a challenge rating of 1 or lower",
				recovery : "short rest",
				usages : 1
			},
			"subclassfeature14" : {
				name : "Master Transmuter",
				source : ["P", 119],
				minlevel : 14,
				description : "\n   " + "As an action, I can destroy my transmuter's stone and do one of the four following:" + "\n    " + "1) Major Transformation" + "\n      " + "In 10 minutes, I transmute one nonmagical object up to 5 cubic foot into another" + "\n      " + "This new, nonmagical object must be of similar size and mass and equal or less value" + "\n    " + "2) Panacea" + "\n      " + "One touched has all curses, diseases, and poisons removed and is healed to max HP" + "\n    " + "3) Restore Life" + "\n      " + "I cast Raise Dead without using spell slots or needing to have it in my spellbook" + "\n    " + "4) Restore Youth" + "\n      " + "A touched creature's apparent age is reduced by 3d10 years (to a minimum of 13)",
				action : ["action", ""]
			}
		}
	},
	"bladesinging" : {
		regExpSearch : /(bladesinging|bladesinger)/i,
		subname : "Tradition of Bladesinging",
		fullname : "Bladesinger",
		attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		source : ["S", 142],
		features : {
			"subclassfeature2" : {
				name : "Training in War and Song",
				source : ["S", 142],
				minlevel : 2,
				description : "\n   " + "I gain proficiency with light armor, a one-handed melee weapon, and Performance",
				armor : [true, false, false, false],
				skills : ["Performance"],
				skillstxt : "\n\n" + toUni("Bladesinger") + ": Performance",
			},
			"subclassfeature2.1" : {
				name : "Bladesong",
				source : ["S", 142],
				minlevel : 2,
				description : "\n   " + "As a bonus action, I can start the bladesong for 1 minute; I can dismiss it at any time" + "\n   " + "It stops when I wear a shield, medium or heavy armor, or attack with two hands" + "\n   " + "While the bladesong is active I have the following benefits:" + "\n    - " + "Intelligence modifier (min 1) to AC" + "\n    - " + "Base walking speed increases by 10 foot" + "\n    - " + "Advantage on Dexterity (Acrobatics) checks" + "\n    - " + "Intelligence modifier (min 1) to concentration saves for maintaining conc. on a spell",
				action : ["bonus action", " (start)"],
				recovery : "short rest",
				usages : 2
			},
			"subclassfeature10" : {
				name : "Song of Defense",
				source : ["S", 142],
				minlevel : 10,
				description : "\n   " + "As a reaction while my bladesong is active, I can expand a spell slot to reduce damage" + "\n   " + "The damage I take is reduced by 5 for every level of the spell slot I expand",
				action : ["reaction", " (in bladesong)"]

			},
			"subclassfeature14" : {
				name : "Song of Victory",
				source : ["S", 142],
				minlevel : 14,
				description : "\n   " + "While my bladesong is active, I can add my Int mod to melee weapon attack damage",
				calcChanges : {
					atkCalc : ["if (classes.known.wizard && classes.known.wizard.level > 13 && isMeleeWeapon && (/blade.?song/i).test(WeaponText)) { output.extraDmg += What('Int Mod'); }; ", "If I include the word 'Bladesong' in the name or description of a melee weapon, it gets my Intelligence modifier added to its Damage."]
				}
			}
		}
	},
}