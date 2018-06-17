var FightingStyles = {
	archery : {
		name : "Archery Fighting Style",
		description : "\n   " + "+2 bonus to attack rolls I make with ranged weapons",
		calcChanges : {
			atkCalc : ["if (isRangedWeapon) {output.extraHit += 2; }; ", "My ranged weapons get a +2 bonus on the To Hit."]
		}
	},
	defense : {
		name : "Defense Fighting Style",
		description : "\n   " + "+1 bonus to AC when I'm wearing armor",
		eval : "AddACMisc(1, 'Defense Fighting Style', 'When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC', 'CurrentArmour.known && !ArmourList[CurrentArmour.known].type')",
		removeeval : "AddACMisc(0, 'Defense Fighting Style', 'When wearing armor, the class feature Defense Fighting Style gives a +1 bonus to AC')"
	},
	dueling : {
		name : "Dueling Fighting Style",
		description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons",
		calcChanges : {
			atkCalc : ["var areOffHands = function(n){for(var i=1;i<=n;i++){if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) {return true; }; }; }(FieldNumbers.actions); if (!areOffHands && isMeleeWeapon && !isNaturalWeapon && !(/\\b(2|two).?hand(ed)?s?\\b/i).test(theWea.description)) {output.extraDmg += 2; }; ", "When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."]
		}
	},
	great_weapon : {
		name : "Great Weapon Fighting Style",
		description : "\n   " + "Reroll 1 or 2 on damage if wielding two-handed/versatile melee weapon in both hands",
		calcChanges : {
			atkAdd : ["if (isMeleeWeapon && (/\\b(versatile|(2|two).?hand(ed)?s?)\\b/i).test(theWea.description)) {fields.Description += (fields.Description ? '; ' : '') + 'Re-roll 1 or 2 on damage die' + ((/versatile/i).test(fields.Description) ? ' when two-handed' : ''); }; ", "While wielding a two-handed or versatile melee weapon in two hands, I can re-roll a 1 or 2 on any damage die once."]
		}
	},
	protection : {
		name : "Protection Fighting Style",
		description : "\n   " + "As a reaction, I can give disadv. on an attack made vs. someone within 5 ft of me" + "\n   " + "I need to be wielding a shield and be able to see the attacker to do this",
		action : ["reaction", ""]
	},
	two_weapon : {
		name : "Two-Weapon Fighting Style",
		description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks",
		calcChanges : {
			atkCalc : ["if (isOffHand) {output.modToDmg = true; }; ", "When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks."]
		}
	}
};

var Base_ClassList = {
	"barbarian" : {
		regExpSearch : /^((?=.*(marauder|barbarian|viking|(norse|tribes?|clans?)(wo)?m(a|e)n))|((?=.*(warrior|fighter))(?=.*(feral|tribal)))).*$/i,
		name : "Barbarian",
		source : [["SRD", 8], ["P", 46]],
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
		subclasses : ["Primal Path", ["barbarian-berserker"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		features : {
			"rage" : {
				name : "Rage",
				source : [["SRD", 8], ["P", 48]],
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
				dmgres : [["Bludgeoning", "Bludgeon. (in rage)"], ["Piercing", "Piercing (in rage)"], ["Slashing", "Slashing (in rage)"]],
				savetxt : { text : ["Adv. on Str saves in rage"] },
				calcChanges : {
					atkCalc : ["if (isMeleeWeapon && classes.known.barbarian && classes.known.barbarian.level && (/\\brage\\b/i).test(WeaponText)) {output.extraDmg += function(n){return n < 9 ? 2 : n < 16 ? 3 : 4;}(classes.known.barbarian.level); }; ", "If I include the word 'Rage' in a melee weapon's name or description, the calculation will add my Rage's bonus damage to it."]
				}
			},
			"unarmored defense" : {
				name : "Unarmored Defense",
				source : [["SRD", 8], ["P", 48]],
				minlevel : 1,
				description : "\n   " + "Without armor, my AC is 10 + Dexterity modifier + Constitution modifier + shield",
				addarmor : "Unarmored Defense (Con)"
			},
			"reckless attack" : {
				name : "Reckless Attack",
				source : [["SRD", 9], ["P", 48]],
				minlevel : 2,
				description : "\n   " + "Adv. on melee weapon attacks during my turn, but attacks vs. me adv. until next turn"
			},
			"danger sense" : {
				name : "Danger Sense",
				source : [["SRD", 9], ["P", 48]],
				minlevel : 2,
				description : "\n   " + "Adv. on Dexterity saves against seen effects (not blinded/deafened/incapacitated)",
				savetxt : { text : ["Adv. on Dex saves vs. seen effects"] }
			},
			"subclassfeature3" : {
				name : "Primal Path",
				source : [["SRD", 9], ["P", 48]],
				minlevel : 3,
				description : "\n   " + "Choose a Primal Path that shapes the nature of your rage and put it in the \"Class\" field" + "\n   " + "Choose either the Path of the Battlerager, Berserker, or Totem Warrior"
			},
			"fast movement" : {
				name : "Fast Movement",
				source : [["SRD", 9], ["P", 49]],
				minlevel : 5,
				description : "\n   " + "I gain +10 ft speed when I'm not wearing heavy armor",
				speed : { allModes : "+10" }
			},
			"feral instinct" : {
				name : "Feral Instinct",
				source : [["SRD", 9], ["P", 49]],
				minlevel : 7,
				description : "\n   " + "Adv. on Initiative; I can enter rage to act normally on the first turn when surprised",
				eval : "Checkbox('Init Adv', true, 'Advantage to Initiative checks was gained from Barbarian (Feral Instinct)');",
				removeeval : "Checkbox('Init Adv', false, '');"
			},
			"brutal critical" : {
				name : "Brutal Critical",
				source : [["SRD", 9], ["P", 49]],
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
				source : [["SRD", 9], ["P", 49]],
				minlevel : 11,
				description : " [DC 10 + 5 per try, per short rest]" + "\n   " + "If I drop to 0 HP while raging, I can make a DC 10 Constitution save to stay at 1 HP" + "\n   " + "The DC increases by 5 for every attempt until I finish a short or long rest",
				recovery : "short rest",
				usages : "",
				usagescalc : "var FieldNmbr = parseFloat(event.target.name.slice(-2)); var usages = What('Limited Feature Used ' + FieldNmbr); var DCmod = Number(usages) * 5; event.value = (isNaN(Number(usages)) || usages === '') ? 'DC\u2003\u2003' : 'DC ' + Number(10 + DCmod);"
			},
			"persistent rage" : {
				name : "Persistent Rage",
				source : [["SRD", 9], ["P", 49]],
				minlevel : 15,
				description : "\n   " + "My rage only lasts less than 1 minute if I fall unconscious or I choose to end it"
			},
			"indomitable might" : {
				name : "Indomitable Might",
				source : [["SRD", 9], ["P", 49]],
				minlevel : 18,
				description : "\n   " + "If a Strength check is lower than my Strength score, use Strength score instead"
			},
			"primal champion" : {
				name : "Primal Champion",
				source : [["SRD", 9], ["P", 49]],
				minlevel : 20,
				description : "\n   " + "I add +4 to both my Strength and Constitution, and their maximums increase to 24"
			}
		}
	},

	"bard" : {
		regExpSearch : /(bard|minstrel|troubadour|jongleur)/i,
		name : "Bard",
		source : [["SRD", 11], ["P", 51]],
		primaryAbility : "\n \u2022 Bard: Charisma;",
		abilitySave : 6,
		prereqs : "\n \u2022 Bard: Charisma 13;",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 8,
		saves : ["Dex", "Cha"],
		skills : ["\n\n" + toUni("Bard") + ": Choose any three skills.", "\n\n" + toUni("Multiclass Bard") + ": Choose any one skill."],
		toolProfs : {
			primary : [["Musical instrument", 3]],
			secondary : [["Musical instrument", 1]]
		},
		armor : [
			[true, false, false, false],
			[true, false, false, false]
		],
		weapons : [
			[true, false, ["hand crossbow", "longsword", "rapier", "shortsword"]]
		],
		equipment : "Bard starting equipment:\n \u2022 A rapier -or- a longsword -or- any simple weapon;\n \u2022 A diplomat's pack -or- an entertainer's pack;\n \u2022 A lute -or- any other musical instrument\n \u2022 Leather armor and a dagger.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Bard College", ["bard-college of lore"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			spells : [4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 16, 16]
		},
		features : {
			"spellcasting" : {
				name : "Spellcasting",
				source : [["SRD", 11], ["P", 52]],
				minlevel : 1,
				description : "\n   " + "I can cast bard cantrips/spells that I know, using Charisma as my spellcasting ability" + "\n   " + "I can use a musical instrument as a spellcasting focus" + "\n   " + "I can cast my known bard spells as rituals if they have the ritual tag",
				additional : ["2 cantrips \u0026 4 spells known", "2 cantrips \u0026 5 spells known", "2 cantrips \u0026 6 spells known", "3 cantrips \u0026 7 spells known", "3 cantrips \u0026 8 spells known", "3 cantrips \u0026 9 spells known", "3 cantrips \u0026 10 spells known", "3 cantrips \u0026 11 spells known", "3 cantrips \u0026 12 spells known", "4 cantrips \u0026 14 spells known", "4 cantrips \u0026 15 spells known", "4 cantrips \u0026 15 spells known", "4 cantrips \u0026 16 spells known", "4 cantrips \u0026 18 spells known", "4 cantrips \u0026 19 spells known", "4 cantrips \u0026 19 spells known", "4 cantrips \u0026 20 spells known", "4 cantrips \u0026 22 spells known", "4 cantrips \u0026 22 spells known", "4 cantrips \u0026 22 spells known"]
			},
			"bardic inspiration" : {
				name : "Bardic Inspiration",
				source : [["SRD", 12], ["P", 53]],
				minlevel : 1,
				description : "\n   " + "As a bonus action, a creature in 60 ft that can hear me gets an inspiration die (max 1)" + "\n   " + "For 10 min, the recipient can add it to one ability check, attack roll, or saving throw" + "\n   " + "This addition can be done after seeing the d20 roll, but before knowing the outcome",
				additional : ["d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12", "d12", "d12"],
				usages : "Charisma modifier per ",
				usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
				recovery : ["long rest", "long rest", "long rest", "long rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest", "short rest"],
				action : ["bonus action", ""]
			},
			"jack of all trades" : {
				name : "Jack of All Trades",
				source : [["SRD", 12], ["P", 54]],
				minlevel : 2,
				description : "\n   " + "I can add half my proficiency bonus to any ability check that doesn't already include it",
				eval : "Checkbox('Jack of All Trades', true);",
				removeeval : "Checkbox('Jack of All Trades', false);"
			},
			"song of rest" : {
				name : "Song of Rest",
				source : [["SRD", 12], ["P", 54]],
				minlevel : 2,
				description : "\n   " + "Those that use HD and can hear my performance during a short rest get extra healing",
				additional : ["", "d6", "d6", "d6", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12"]
			},
			"subclassfeature3" : {
				name : "Bard College",
				source : [["SRD", 12], ["P", 54]],
				minlevel : 3,
				description : "\n   " + "Choose a College that reflects your personality and put it in the \"Class\" field " + "\n   " + "Choose either the College of Lore or the College of Valor"
			},
			"expertise" : {
				name : "Expertise",
				source : [["SRD", 13], ["P", 54]],
				minlevel : 3,
				description : "\n   " + "I gain expertise with two skills I am proficient with; two more at 10th level",
				skillstxt : "\n\n" + toUni("Expertise (Bard 3)") + ": Choose any two skill proficiencies, and two more at 10th level.",
				additional : ["", "", "with two skills", "with two skills", "with two skills", "with two skills", "with two skills", "with two skills", "with two skills", "with four skills", "with four skills", "with four skills", "with four skills", "with four skills", "with four skills", "with four skills", "with four skills", "with four skills", "with four skills", "with four skills"]
			},
			"font of inspiration" : {
				name : "Font of Inspiration",
				source : [["SRD", 13], ["P", 54]],
				minlevel : 5,
				description : "\n   " + "I can now also recover my expended Bardic Inspiration uses after a short rest"
			},
			"countercharm" : {
				name : "Countercharm",
				source : [["SRD", 13], ["P", 54]],
				minlevel : 6,
				description : "\n   " + "As an action, I can do a performance that lasts until the end of my next turn" + "\n   " + "While it lasts, any friend in earshot \u0026 30 ft has adv. on saves vs. frightened/charmed",
				action : ["action", ""]
			},
			"magical secrets" : {
				name : "Magical Secrets",
				source : [["SRD", 13], ["P", 54]],
				minlevel : 10,
				description : "\n   " + "I can add two spells/cantrips from any class to my spells known; +2 at level 14 \u0026 18",
				additional : ["", "", "", "", "", "", "", "", "", "two spells/cantrips", "two spells/cantrips", "two spells/cantrips", "two spells/cantrips", "four spells/cantrips", "four spells/cantrips", "four spells/cantrips", "four spells/cantrips", "six spells/cantrips", "six spells/cantrips", "six spells/cantrips"],
				spellcastingBonus : {
					name : "Magical Secret",
					"class" : "any",
					times : [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 4, 4, 4, 4, 6, 6, 6]
				}
			},
			"superior inspiration" : {
				name : "Superior Inspiration",
				source : [["SRD", 13], ["P", 54]],
				minlevel : 20,
				description : "\n   " + "I regain one use of Bardic Inspiration if I have no more remaining when I roll initiative"
			}
		}
	},

	"cleric" : {
		regExpSearch : /(cleric|priest|clergy|acolyte)/i,
		name : "Cleric",
		source : [["SRD", 15], ["P", 56]],
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
		subclasses : ["Divine Domain", ["cleric-life domain"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
			spells : "list",
			prepared : true
		},
		features : {
			"spellcasting" : {
				name : "Spellcasting",
				source : [["SRD", 15], ["P", 58]],
				minlevel : 1,
				description : "\n   " + "I can cast prepared cleric cantrips/spells, using Wisdom as my spellcasting ability" + "\n   " + "I can use a holy symbol as a spellcasting focus" + "\n   " + "I can cast my prepared cleric spells as rituals if they have the ritual tag",
				additional : ["3 cantrips known", "3 cantrips known", "3 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known"]
			},
			"subclassfeature1" : {
				name : "Divine Domain",
				source : [["SRD", 16], ["P", 58]],
				minlevel : 1,
				description : "\n   " + "Choose a Domain related to your deity and put it in the \"Class\" field on the first page" + "\n   " + "Choose either Arcana, Death, Life, Light, Nature, Tempest, Trickery, or War Domain"
			},
			"channel divinity" : {
				name : "Channel Divinity",
				source : [["SRD", 16], ["P", 58]],
				minlevel : 2,
				description : "\n   " + "I can channel divine energy to cause an effect; the save for this is my cleric spell DC",
				usages : [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
				recovery : "short rest"
			},
			"turn undead" : {
				name : "Channel Divinity: Turn Undead",
				source : [["SRD", 16], ["P", 59]],
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
				source : [["SRD", 17], ["P", 59]],
				minlevel : 5,
				additional : ["", "", "", "", "CR \u00BD or lower", "CR \u00BD or lower", "CR \u00BD or lower", "CR 1 or lower", "CR 1 or lower", "CR 1 or lower", "CR 2 or lower", "CR 2 or lower", "CR 2 or lower", "CR 3 or lower", "CR 3 or lower", "CR 3 or lower", "CR 4 or lower", "CR 4 or lower", "CR 4 or lower", "CR 4 or lower"],
				description : "\n   " + "An undead up to the CR above that fails its save when I use Turn Undead is destroyed"
			},
			"divine intervention" : {
				name : "Divine Intervention",
				source : [["SRD", 17], ["P", 59]],
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
		source : [["SRD", 19], ["P", 61]],
		primaryAbility : "\n \u2022 Druid: Wisdom;",
		abilitySave : 5,
		prereqs : "\n \u2022 Druid: Wisdom 13;",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 8,
		saves : ["Wis", "Int"],
		skills : ["\n\n" + toUni("Druid") + ": Choose two from Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, and Survival."],
		toolProfs : {
			primary : ["Herbalism kit"],
		},
		armor : [
			[true, true, false, true],
			[true, true, false, true]
		],
		weapons : [
			[false, false, ["club", "dagger", "dart", "javelin", "mace", "quarterstaff", "scimitar", "sickle", "sling", "spear"]]
		],
		equipment : "Druid starting equipment:\n \u2022 A wooden shield -or- any simple weapon;\n \u2022 A scimitar -or- any simple melee weapon;\n \u2022 Leather armor, an explorer's pack, and a druidic focus.\n\nAlternatively, choose 2d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Druid Circle", ["druid-circle of the land"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			spells : "list",
			prepared : true
		},
		features : {
			"druidic" : {
				name : "Druidic",
				source : [["SRD", 19], ["P", 66]],
				minlevel : 1,
				description : "\n   " + "I know Druidic; Hidden messages with it can only be understood by who know Druidic",
				languageProfs : ["Druidic"]
			},
			"spellcasting" : {
				name : "Spellcasting",
				source : [["SRD", 19], ["P", 66]],
				minlevel : 1,
				description : "\n   " + "I can cast prepared druid cantrips/spells, using Wisdom as my spellcasting ability" + "\n   " + "I can use a druidic focus as a spellcasting focus" + "\n   " + "I can cast my prepared druid spells as rituals if they have the ritual tag",
				additional : ["2 cantrips known", "2 cantrips known", "2 cantrips known", "3 cantrips known", "3 cantrips known", "3 cantrips known", "3 cantrips known", "3 cantrips known", "3 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known"]
			},
			"subclassfeature2" : {
				name : "Druid Circle",
				source : [["SRD", 21], ["P", 67]],
				minlevel : 2,
				description : "\n   " + "Choose a Circle you can identify with and put it in the \"Class\" field on the first page" + "\n   " + "Choose either the Circle of the Land or the Circle of the Moon"
			},
			"subclassfeature2.wild shape" : {
				name : "Wild Shape",
				source : [["SRD", 20], ["P", 66]],
				minlevel : 2,
				description : "\n   " + "As an action, I assume the shape of a beast I have seen before with the following rules:" + "\n    - " + "I gain all its game statistics except Intelligence, Wisdom, or Charisma" + "\n    - " + "I get its skill/saving throw prof. while keeping my own, using whichever is higher" + "\n    - " + "I assume the beast's HP and HD; I get mine back when I revert back" + "\n    - " + "I can't cast spells in beast form, but transforming doesn't break concentration" + "\n    - " + "I retain features from class, race, etc., but I don't retain special senses" + "\n    - " + "I can choose whether equipment falls to the ground, merges, or stays worn" + "\n    - " + "I revert if out of time or unconscious; if KOd by damage, excess damage carries over",
				usages : [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, "\u221E\u00D7 per "],
				recovery : "short rest",
				additional : ["", "CR 1/4, no fly/swim; 1 hour", "CR 1/4, no fly/swim; 1 hour", "CR 1/2, no fly; 2 hours", "CR 1/2, no fly; 2 hours", "CR 1/2, no fly; 3 hours", "CR 1/2, no fly; 3 hours", "CR 1; 4 hours", "CR 1; 4 hours", "CR 1; 5 hours", "CR 1; 5 hours", "CR 1; 6 hours", "CR 1; 6 hours", "CR 1; 7 hours", "CR 1; 7 hours", "CR 1; 8 hours", "CR 1; 8 hours", "CR 1; 9 hours", "CR 1; 9 hours", "CR 1; 10 hours"],
				action : ["action", " (start)"],
				eval : "AddAction('bonus action', 'Wild Shape (end)', 'Druid');",
				removeeval : "RemoveAction('bonus action', 'Wild Shape (end)', 'Druid');"
			},
			"timeless body" : {
				name : "Timeless Body",
				source : [["SRD", 21], ["P", 67]],
				minlevel : 18,
				description : "\n   " + "I age more slowly, only 1 year for every 10 years that pass"
			},
			"beast spells" : {
				name : "Beast Spells",
				source : [["SRD", 21], ["P", 67]],
				minlevel : 18,
				description : "\n   " + "I can perform the somatic and verbal components of druid spells while in a beast shape"
			},
			"archdruid" : {
				name : "Archdruid",
				source : [["SRD", 21], ["P", 67]],
				minlevel : 20,
				description : "\n   " + "I can use Wild Shape an unlimited number of times" + "\n   " + "My druid spells don't require verbal, somatic, or free material components"
			}
		}
	},

	"fighter" : {
		regExpSearch : /^(?!.*(dark|green|fey|horned|totem|spiritual|exalted|sacred|holy|divine|nature|odin|thor|nature|natural|green))(?=.*(fighter|warrior|militant|warlord|phalanx|gladiator|trooper)).*$/i,
		name : "Fighter",
		source : [["SRD", 24], ["P", 70]],
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
		subclasses : ["Martial Archetype", ["fighter-champion"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4],
		features : {
			"fighting style" : {
				name : "Fighting Style",
				source : [["SRD", 24], ["P", 72]],
				minlevel : 1,
				description : "\n   " + "Choose a Fighting Style for the fighter using the \"Choose Feature\" button above",
				choices : ["Archery", "Defense", "Dueling", "Great Weapon Fighting", "Protection", "Two-Weapon Fighting"],
				"archery" : FightingStyles.archery,
				"defense" : FightingStyles.defense,
				"dueling" : FightingStyles.dueling,
				"great weapon fighting" : FightingStyles.great_weapon,
				"protection" : FightingStyles.protection,
				"two-weapon fighting" : FightingStyles.two_weapon
			},
			"second wind" : {
				name : "Second Wind",
				source : [["SRD", 24], ["P", 72]],
				minlevel : 1,
				description : "\n   " + "As a bonus action, I regain 1d10 + fighter level HP; I can use this once per short rest",
				additional : ["1d10+1", "1d10+2", "1d10+3", "1d10+4", "1d10+5", "1d10+6", "1d10+7", "1d10+8", "1d10+9", "1d10+10", "1d10+11", "1d10+12", "1d10+13", "1d10+14", "1d10+15", "1d10+16", "1d10+17", "1d10+18", "1d10+19", "1d10+20"],
				usages : 1,
				recovery : "short rest",
				action : ["bonus action", ""]
			},
			"action surge" : {
				name : "Action Surge",
				source : [["SRD", 25], ["P", 72]],
				minlevel : 2,
				description : "\n   " + "I can take one additional action on my turn on top of my normally allowed actions",
				usages : [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
				recovery : "short rest"
			},
			"subclassfeature3" : {
				name : "Martial Archetype",
				source : [["SRD", 25], ["P", 72]],
				minlevel : 3,
				description : "\n   " + "Choose a Martial Archetype you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Champion, Battle Master, Eldritch Knight, or Purple Dragon Knight"
			},
			"indomitable" : {
				name : "Indomitable",
				source : [["SRD", 25], ["P", 72]],
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
		source : [["SRD", 26], ["P", 76]],
		primaryAbility : "\n \u2022 Monk: Dexterity and Wisdom;",
		abilitySave : 5,
		prereqs : "\n \u2022 Monk: Dexterity 13 and Wisdom 13;",
		die : 8,
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		saves : ["Str", "Dex"],
		toolProfs : {
			primary : [["Artisan's tool or musical instrument", 1]]
		},
		skills : ["\n\n" + toUni("Monk") + ": Choose two from Acrobatics, Athletics, History, Insight, Religion, and Stealth."],
		armor : [
			[false, false, false, false]
		],
		weapons : [
			[true, false, ["shortsword"]],
			[true, false, ["shortsword"]]
		],
		equipment : "Monk starting equipment:\n \u2022 A shortsword -or- any simple weapon;\n \u2022 A dungeoneer's pack -or- an explorer's pack;\n \u2022 10 darts.\n\nAlternatively, choose 5d4 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Monastic Tradition", ["monk-way of the open hand"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		features : {
			"unarmored defense" : {
				name : "Unarmored Defense",
				source : [["SRD", 26], ["P", 48]],
				minlevel : 1,
				description : "\n   " + "Without armor and no shield, my AC is 10 + Dexterity modifier + Wisdom modifier",
				addarmor : "Unarmored Defense (Wis)"
			},
			"martial arts" : {
				name : "Martial Arts",
				source : [["SRD", 26], ["P", 78]],
				minlevel : 1,
				description : "\n   " + "Monk weapons: shortsword, simple weapon (not two-handed/heavy), unarmed strike" + "\n   " + "With these, I can use Dex instead of Str and use the Martial Arts damage die" + "\n   " + "When taking an Attack action with these, I get one unarmed strike as a bonus action",
				additional : levels.map(function (n) {
					if (n < 5) return "1d4";
					if (n < 11) return "1d6";
					if (n < 17) return "1d8";
					return "1d10";
				}),
				action : ["bonus action", " (with Attack action)"],
				eval : "AddString('Extra.Notes', 'Monk features:\\n\\u25C6 Lose Unarmored Defense, Martial Arts, and Unarmored Movement with armor\/shields', true);",
				removeeval : "RemoveString('Extra.Notes', 'Monk features:\\n\\u25C6 Lose Unarmored Defense, Martial Arts, and Unarmored Movement with armor\/shields', true);",
				calcChanges : {
					atkAdd : ["var monkDie = function(n) {return n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10;}; if (classes.known.monk && classes.known.monk.level && theWea && (theWea.monkweapon || (/shortsword/i).test(theWea.name) || (isMeleeWeapon && (/simple/i).test(theWea.type) && !(/\\b(heavy|(2|two).?hand(ed)?s?)\\b/i).test(theWea.description)))) {var aMonkDie = monkDie(classes.known.monk.level); try {var curDie = eval(fields.Damage_Die.replace('d', '*'));} catch (e) {var curDie = 'x';}; if (isNaN(curDie) || curDie < aMonkDie) {fields.Damage_Die = '1d' + aMonkDie;}; fields.Mod = StrDex;}; ", "I can use either Strength or Dexterity and my Martial Arts damage die in place of the normal damage die for any 'Monk Weapons', which include unarmed strike, shortsword, and any simple melee weapon that is not two-handed or heavy."]
				}
			},
			"ki" : {
				name : "Ki",
				source : [["SRD", 27], ["P", 78]],
				minlevel : 2,
				description : "\n   " + "I can spend ki to fuel special actions (see third page)" + "\n   " + "I need to meditate for at least 30 min of a short rest for that short rest to restore ki",
				usages : ["", 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				recovery : "short rest",
				extraname : "Ki Feature",
				"flurry of blows" : {
					name : "Flurry of Blows",
					source : [["SRD", 27], ["P", 78]],
					description : " [1 ki point]" + "\n   " + "After taking the Attack action, I can make 2 unarmed attacks as a bonus action",
					action : ["bonus action", " (after Attack action)"]
				},
				"patient defense" : {
					name : "Patient Defense",
					source : [["SRD", 27], ["P", 78]],
					description : " [1 ki point]" + "\n   " + "As a bonus action, I can take the Dodge action",
					action : ["bonus action", ""]
				},
				"step of the wind" : {
					name : "Step of the Wind",
					source : [["SRD", 27], ["P", 78]],
					description : " [1 ki point]" + "\n   " + "As a bonus action, I can either Dash or Disengage; My jump distance doubles when I do so",
					action : ["bonus action", ""]
				},
				"stunning strike" : {
					name : "Stunning Strike",
					source : [["SRD", 27], ["P", 79]],
					description : " [1 ki point]" + "\n   " + "After I hit a creature with a melee weapon attack, I can spend a ki point to try to stun it" + "\n   " + "It has to succeed on a Con save or be stunned until the end of my next turn"
				},
				eval : "ClassFeatureOptions(['monk', 'ki', 'flurry of blows', 'extra']); ClassFeatureOptions(['monk', 'ki', 'patient defense', 'extra']); ClassFeatureOptions(['monk', 'ki', 'step of the wind', 'extra']);",
				removeeval : "ClassFeatureOptions(['monk', 'ki', 'flurry of blows', 'extra'], 'remove'); ClassFeatureOptions(['monk', 'ki', 'patient defense', 'extra'], 'remove'); ClassFeatureOptions(['monk', 'ki', 'step of the wind', 'extra'], 'remove');",
				changeeval : "if (newClassLvl.monk >= 5 && (What('Extra.Notes') + What('Class Features')).toLowerCase().indexOf('stunning strike') === -1) {ClassFeatureOptions(['monk', 'ki', 'stunning strike', 'extra'])} else if (newClassLvl.monk < 5 && oldClassLvl.monk >= 5) {ClassFeatureOptions(['monk', 'ki', 'stunning strike', 'extra'], 'remove');};"
			},
			"unarmored movement" : {
				name : "Unarmored Movement",
				source : [["SRD", 27], ["P", 78]],
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
				changeeval : "var monkSpd = function(n) {return '+' + (n < 2 ? 0 : n < 6 ? 10 : n < 10 ? 15 : n < 14 ? 20 : n < 18 ? 25 : 30);}(classes.known.monk.level); SetProf('speed', monkSpd !== '+0', {allModes : monkSpd}, profDisplNm);"
			},
			"subclassfeature3" : {
				name : "Monastic Tradition",
				source : [["SRD", 27], ["P", 78]],
				minlevel : 3,
				description : "\n   " + "Choose a Monastic Tradition to commit to and put it in the \"Class\" field on page 1" + "\n   " + "Choose either Way of the Four Elements, Long Death, Open Hand, Shadow, or Sun Soul"
			},
			"deflect missiles" : {
				name : "Deflect Missiles",
				source : [["SRD", 27], ["P", 78]],
				minlevel : 3,
				description : "\n   " + "As a reaction, I can reduce ranged weapon attack damage done to me" + "\n   " + "If the damage is negated, I catch and may throw it back (20/60 ft) as a monk weapon",
				action : ["reaction", ""],
				additional : ["", "", "1d10 + 3 + Dexterity modifier; 1 ki to throw", "1d10 + 4 + Dexterity modifier; 1 ki to throw", "1d10 + 5 + Dexterity modifier; 1 ki to throw", "1d10 + 6 + Dexterity modifier; 1 ki to throw", "1d10 + 7 + Dexterity modifier; 1 ki to throw", "1d10 + 8 + Dexterity modifier; 1 ki to throw", "1d10 + 9 + Dexterity modifier; 1 ki to throw", "1d10 + 10 + Dexterity modifier; 1 ki to throw", "1d10 + 11 + Dexterity modifier; 1 ki to throw", "1d10 + 12 + Dexterity modifier; 1 ki to throw", "1d10 + 13 + Dexterity modifier; 1 ki to throw", "1d10 + 14 + Dexterity modifier; 1 ki to throw", "1d10 + 15 + Dexterity modifier; 1 ki to throw", "1d10 + 16 + Dexterity modifier; 1 ki to throw", "1d10 + 17 + Dexterity modifier; 1 ki to throw", "1d10 + 18 + Dexterity modifier; 1 ki to throw", "1d10 + 19 + Dexterity modifier; 1 ki to throw", "1d10 + 20 + Dexterity modifier; 1 ki to throw"]
			},
			"slow fall" : {
				name : "Slow Fall",
				source : [["SRD", 27], ["P", 78]],
				minlevel : 4,
				description : "\n   " + "As a reaction, I can reduce any falling damage I take by five times my monk level",
				additional : levels.map(function (n) { return n < 4 ? "" : (n*5) + " less falling damage" }),
				action : ["reaction", ""]
			},
			"ki-empowered strikes" : {
				name : "Ki-Empowered Strikes",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 6,
				description : "\n   " + "My unarmed strikes count as magical for overcoming resistances and immunities",
				calcChanges : {
					atkAdd : ["if ((/unarmed strike/i).test(WeaponName)) {fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical';}; ", "My unarmed strikes count as magical for overcoming resistances and immunities."]
				}
			},
			"evasion" : {
				name : "Evasion",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 7,
				description : "\n   " + "My Dexterity saves vs. areas of effect negate damage on success and halve it on failure",
				savetxt : { text : ["Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg"] }
			},
			"stillness of mind" : {
				name : "Stillness of Mind",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 7,
				description : "\n   " + "As an action, I can end one effect on me that causes me to be charmed or frightened",
				action : ["action", ""]
			},
			"purity of body" : {
				name : "Purity of Body",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 10,
				description : typeA4 ? "\n   " + "My mastery of the ki flowing through me makes me immune to poison and disease" : " [" + "I am immune to poison and disease" + "]",
				savetxt : { immune : ["poison", "disease"] } //both immune to poison damage and the poisoned condition (see sage advice)
			},
			"tongue of the sun and moon" : {
				name : "Tongue of the Sun and Moon",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 13,
				description : "\n   " + "I can understand all spoken languages and all creatures with a language understand me"
			},
			"diamond soul" : {
				name : "Diamond Soul",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 14,
				description : "\n   " + "I am proficient with all saves; I can reroll a failed save once by spending 1 ki point",
				additional : "1 ki point to reroll failed saving throw",
				saves : ["Str", "Dex", "Con", "Int", "Wis", "Cha"]
			},
			"timeless body" : {
				name : "Timeless Body",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 15,
				description : "\n   " + "I don't require food or water; I don't suffer age penalties and can't be aged magically"
			},
			"empty body" : {
				name : "Empty Body",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 18,
				description : "\n   " + "Be invisible and resist non-force damage for 1 min or cast Astral Projection on self",
				additional : "Invisible: 4 ki point; Astral Projection: 8 ki points",
				action : ["action", ""]
			},
			"perfect self" : {
				name : "Perfect Self",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 20,
				description : "\n   " + "I regain 4 ki points if I have no more remaining when I roll initiative"
			}
		}
	},

	"paladin" : {
		regExpSearch : /^((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
		name : "Paladin",
		source : [["SRD", 30], ["P", 82]],
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
		subclasses : ["Sacred Oath", ["paladin-oath of devotion"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		spellcastingFactor : 2,
		spellcastingKnown : {
			spells : "list",
			prepared : true
		},
		features : {
			"divine sense" : {
				name : "Divine Sense",
				source : [["SRD", 30], ["P", 84]],
				minlevel : 1,
				description : "\n   " + "As an action, I sense celestials/fiends/undead/consecrated/desecrated within 60 ft" + "\n   " + "Until the end of my next turn, I sense the type/location if it is not behind total cover",
				usages : "1 + Charisma modifier per ",
				usagescalc : "event.value = 1 + What('Cha Mod');",
				recovery : "long rest",
				action : ["action", ""]
			},
			"lay on hands" : {
				name : "Lay on Hands",
				source : [["SRD", 31], ["P", 84]],
				minlevel : 1,
				description : "\n   " + "As an action, I can use points in my pool to heal a touched, living creature's hit points" + "\n   " + "I can neutralize poisons/diseases instead at a cost of 5 points per affliction",
				usages : [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
				recovery : "long rest",
				action : ["action", ""]
			},
			"fighting style" : {
				name : "Fighting Style",
				source : [["SRD", 31], ["P", 84]],
				minlevel : 2,
				description : "\n   " + "Choose a Fighting Style for the paladin using the \"Choose Feature\" button above",
				choices : ["Defense", "Dueling", "Great Weapon Fighting", "Protection"],
				"defense" : FightingStyles.defense,
				"dueling" : FightingStyles.dueling,
				"great weapon fighting" : FightingStyles.great_weapon,
				"protection" : FightingStyles.protection
			},
			"spellcasting" : {
				name : "Spellcasting",
				source : [["SRD", 31], ["P", 84]],
				minlevel : 2,
				description : "\n   " + "I can cast prepared paladin spells, using Charisma as my spellcasting ability" + "\n   " + "I can use a holy symbol as a spellcasting focus"
			},
			"divine smite" : {
				name : "Divine Smite",
				source : [["SRD", 31], ["P", 85]],
				minlevel : 2,
				description : "\n   " + "When I hit a melee weapon attack, I can expend a spell slot to do +2d8 radiant damage" + "\n   " + "This increases by +1d8 for each spell slot level above 1st and +1d8 against undead/fiends"
			},
			"subclassfeature3.0" : {
				name : "Channel Divinity",
				source : [["SRD", 32], ["P", 85]],
				minlevel : 3,
				description : "",
				usages : 1,
				recovery : "short rest"
			},
			"subclassfeature3" : {
				name : "Sacred Oath",
				source : [["SRD", 32], ["P", 85]],
				minlevel : 3,
				description : "\n   " + "Choose a Sacred Oath you swear to and put it in the \"Class\" field on the first page" + "\n   " + "Choose Oath of the Ancients, Crown, Devotion, Vengeance, or become an Oathbreaker"
			},
			"divine health" : {
				name : "Divine Health",
				source : [["SRD", 32], ["P", 85]],
				minlevel : 3,
				description : "\n   " + "I am immune to disease, thanks to the power of my faith",
				savetxt : { immune : ["disease"] }
			},
			"aura of protection" : {
				name : "Aura of Protection",
				source : [["SRD", 32], ["P", 85]],
				minlevel : 6,
				description : "\n   " + "While I'm conscious, allies within range and I can add my Cha mod (min 1) to saves",
				additional : ["", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
				addMod : { type : "save", field : "all", mod : "Cha", text : "While I'm conscious I can add my Charisma modifier (min 1) to all my saving throws." }
			},
			"aura of courage" : {
				name : "Aura of Courage",
				source : [["SRD", 32], ["P", 85]],
				minlevel : 10,
				description : "\n   " + "While I'm conscious, allies within range and I can't be frightened",
				additional : ["", "", "", "", "", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
				savetxt : { immune : ["frightened"] }
			},
			"improved divine smite" : {
				name : "Improved Divine Smite",
				source : [["SRD", 32], ["P", 85]],
				minlevel : 11,
				description : "\n   " + "Whenever I hit a creature with a melee weapon, I do an extra 1d8 radiant damage",
				calcChanges : {
					atkAdd : ["if (isMeleeWeapon) {fields.Description += (fields.Description ? '; ' : '') + '+1d8 Radiant damage'; }; ", "With my melee weapon attacks I deal an extra 1d8 radiant damage."]
				}
			},
			"cleansing touch" : {
				name : "Cleansing Touch",
				source : [["SRD", 32], ["P", 85]],
				minlevel : 14,
				description : "\n   " + "As an action, I can end one spell on me or another willing creature by touch",
				usages : "Charisma modifier per ",
				usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
				recovery : "long rest",
				action : ["action", ""]
			}
		}
	},

	"ranger" : {
		regExpSearch : /^((?=.*(ranger|strider))|((?=.*(nature|natural))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
		name : "Ranger",
		source : [["SRD", 35], ["P", 89]],
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
		subclasses : ["Ranger Archetype", ["ranger-hunter"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		spellcastingFactor : 2,
		spellcastingKnown : {
			spells : [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11]
		},
		features : {
			"favored enemy" : {
				name : "Favored Enemy",
				source : [["SRD", 35], ["P", 91]],
				minlevel : 1,
				description : "\n   " + "Use the \"Choose Feature\" button above to add a favored enemy to the third page" + "\n   " + "When selecting a favored enemy, I also learn one of the languages it speaks" + "\n   " + "I have adv. on Wis (Survival) checks to track and Int checks to recall info about them",
				additional : ["1 favored enemy", "1 favored enemy", "1 favored enemy", "1 favored enemy", "1 favored enemy", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "2 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies", "3 favored enemies"],
				extraname : "Favored Enemy",
				extrachoices : ["Aberrations", "Beasts", "Celestials", "Constructs", "Dragons", "Elementals", "Fey", "Fiends", "Giants", "Monstrosities", "Oozes", "Plants", "Undead", "Two Races of Humanoids"],
				"aberrations" : {
					name : "Aberrations",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"beasts" : {
					name : "Beasts",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"celestials" : {
					name : "Celestials",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"constructs" : {
					name : "Constructs",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"dragons" : {
					name : "Dragons",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"elementals" : {
					name : "Elementals",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"fey" : {
					name : "Fey",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"fiends" : {
					name : "Fiends",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"giants" : {
					name : "Giants",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"monstrosities" : {
					name : "Monstrosities",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"oozes" : {
					name : "Oozes",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"plants" : {
					name : "Plants",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"undead" : {
					name : "Undead",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"two races of humanoids" : {
					name : "Two Races of Humanoids",
					description : "",
					source : [["SRD", 35], ["P", 91]]
				}
			},
			"natural explorer" : {
				name : "Natural Explorer",
				source : [["SRD", 36], ["P", 91]],
				minlevel : 1,
				description : "\n   " + "Use the \"Choose Feature\" button above to add a favored terrain to the third page",
				additional : ["1 favored terrain", "1 favored terrain", "1 favored terrain", "1 favored terrain", "1 favored terrain", "2 favored terrains", "2 favored terrains", "2 favored terrains", "2 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains", "3 favored terrains"],
				extraname : "Favored Terrain",
				extrachoices : ["Arctic", "Coast", "Desert", "Forest", "Grassland", "Mountain", "Swamp", "Underdark"],
				"arctic" : {
					name : "Arctic",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning arctic terrain" + "\n   " + "While traveling for an hour or more in arctic terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"coast" : {
					name : "Coast",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning coast terrain" + "\n   " + "While traveling for an hour or more in coast terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"desert" : {
					name : "Desert",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning desert terrain" + "\n   " + "While traveling for an hour or more in desert terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"forest" : {
					name : "Forest",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning forest terrain" + "\n   " + "While traveling for an hour or more in forest terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"grassland" : {
					name : "Grassland",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning grassland terrain" + "\n   " + "While traveling for an hour or more in grassland terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"mountain" : {
					name : "Mountain",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning mountain terrain" + "\n   " + "While traveling for an hour or more in mountain terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"swamp" : {
					name : "Swamp",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning swamp terrain" + "\n   " + "While traveling for an hour or more in swamp terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"underdark" : {
					name : "Underdark",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning underdark terrain" + "\n   " + "While traveling for an hour or more in underdark terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				}
			},
			"fighting style" : {
				name : "Fighting Style",
				source : [["SRD", 36], ["P", 91]],
				minlevel : 2,
				description : "\n   " + "Choose a Fighting Style for the ranger using the \"Choose Feature\" button above",
				choices : ["Archery", "Defense", "Dueling", "Two-Weapon Fighting"],
				"archery" : FightingStyles.archery,
				"defense" : FightingStyles.defense,
				"dueling" : FightingStyles.dueling,
				"two-weapon fighting" : FightingStyles.two_weapon
			},
			"spellcasting" : {
				name : "Spellcasting",
				source : [["SRD", 36], ["P", 91]],
				minlevel : 2,
				description : "\n   " + "I can cast ranger spells that I know, using Wisdom as my spellcasting ability",
				additional : ["", "2 spells known", "3 spells known", "3 spells known", "4 spells known", "4 spells known", "5 spells known", "5 spells known", "6 spells known", "6 spells known", "7 spells known", "7 spells known", "8 spells known", "8 spells known", "9 spells known", "9 spells known", "10 spells known", "10 spells known", "11 spells known", "11 spells known"]
			},
			"subclassfeature3" : {
				name : "Ranger Archetype",
				source : [["SRD", 37], ["P", 92]],
				minlevel : 3,
				description : "\n   " + "Choose a Ranger Archetype you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Beast Master or Hunter"
			},
			"primeval awareness" : {
				name : "Primeval Awareness",
				source : [["SRD", 37], ["P", 92]],
				minlevel : 3,
				description : "\n   " + "As an action, I can use a spell slot to focus my awareness for 1 min per spell slot level" + "\n   " + "Out to 1 mile (6 in favored terrain), I sense if certain types of creatures are present",
				additional : "aber./celest./dragon/elem./fey/fiend/undead",
				action : ["action", ""]
			},
			"land's stride" : {
				name : "Land's Stride",
				source : [["SRD", 37], ["P", 92]],
				minlevel : 8,
				description : "\n   " + "I can travel through nonmagical, difficult terrain without penalty" + "\n   " + "I have advantage on saves vs. plants that impede movement by magical influence",
				savetxt : { adv_vs : ["magical plants that impede movement"] }
			},
			"hide in plain sight" : {
				name : "Hide in Plain Sight",
				source : [["SRD", 37], ["P", 92]],
				minlevel : 10,
				description : "\n   " + "I can hide with +10 to Dex (Stealth) after spending 1 minute creating camouflage" + "\n   " + "Once I move or take an action or a reaction, the benefit is lost"
			},
			"vanish" : {
				name : "Vanish",
				source : [["SRD", 37], ["P", 92]],
				minlevel : 14,
				description : "\n   " + "I can't be nonmagically tracked if I don't want to be and can Hide as a bonus action",
				action : ["bonus action", ""]
			},
			"feral senses" : {
				name : "Feral Senses",
				source : [["SRD", 37], ["P", 92]],
				minlevel : 18,
				description : "\n   " + "When not blinded or deafened, I'm aware of invisible, non-hidden creatures in 30 ft" + "\n   " + "I don't have disadvantage when attacking creatures I am aware of but can't see"
			},
			"foe slayer" : {
				name : "Foe Slayer",
				source : [["SRD", 37], ["P", 92]],
				minlevel : 20,
				description : "\n   " + "Once per turn, I can add Wis mod to the attack or damage roll vs. favored enemy"
			}
		}
	},

	"rogue" : {
		regExpSearch : /(rogue|miscreant)/i,
		name : "Rogue",
		source : [["SRD", 39], ["P", 94]],
		primaryAbility : "\n \u2022 Rogue: Dexterity;",
		prereqs : "\n \u2022 Rogue: Dexterity 13;",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6],
		die : 8,
		saves : ["Int", "Dex"],
		skills : ["\n\n" + toUni("Rogue") + ": Choose four from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, and Stealth.", "\n\n" + toUni("Multiclass Rogue") + ": Choose one from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, and Stealth."],
		toolProfs : {
			primary : [["Thieves' tools", "Dex"]],
			secondary : [["Thieves' tools", "Dex"]]
		},
		armor : [
			[true, false, false, false],
			[true, false, false, false]
		],
		weapons : [
			[true, false, ["hand crossbow", "longsword", "rapier", "shortsword"]]
		],
		equipment : "Rogue starting equipment:\n \u2022 A rapier -or- a shortsword;\n \u2022 A shortbow and a quiver of 20 arrows -or- a shortswords;\n \u2022 A burglar's pack -or- dungeoneer's pack -or- an explorer's pack;\n \u2022 Leather armor, two daggers, and thieves' tools.\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Roguish Archetype", ["rogue-thief"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		features : {
			"expertise" : {
				name : "Expertise",
				source : [["SRD", 39], ["P", 96]],
				minlevel : 1,
				description : "\n   " + "I gain expertise with two skills/thieves' tools I am proficient with; two more at 6th level",
				skillstxt : "\n\n" + toUni("Expertise (Rogue 1)") + ": Choose any two skill proficiencies and/or thieves' tools, and two more at 6th level.",
				additional : levels.map(function (n) {
					if (n < 6) return "with two skills";
					return "with four skills";
				})
			},
			"sneak attack" : {
				name : "Sneak Attack",
				source : [["SRD", 39], ["P", 96]],
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
				source : [["SRD", 39], ["P", 96]],
				minlevel : 1,
				description : "\n   " + "I know the secret rogue language that I can use to convey messages inconspicuously",
				languageProfs : ["Thieves' Cant"]
			},
			"cunning action" : {
				name : "Cunning Action",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 2,
				description : "\n   " + "I can use a bonus action to take the Dash, Disengage, or Hide action",
				action : ["bonus action", ""]
			},
			"subclassfeature3" : {
				name : "Roguish Archetype",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 3,
				description : "\n   " + "Choose a Roguish Archetype you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Arcane Trickster, Assassin, Mastermind, Swashbuckler, or Thief"
			},
			"uncanny dodge" : {
				name : "Uncanny Dodge",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 5,
				description : "\n   " + "As a reaction, I halve the damage of an attack from an attacker that I can see",
				action : ["reaction", ""]
			},
			"evasion" : {
				name : "Evasion",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 7,
				description : "\n   " + "My Dexterity saves vs. areas of effect negate damage on success and halve it on failure",
				savetxt : { text : ["Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg"] }
			},
			"reliable talent" : {
				name : "Reliable Talent",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 11,
				description : "\n   " + "If I make an ability check where I add my proficiency bonus, rolls of 9 or lower are 10"
			},
			"blindsense" : {
				name : "Blindsense",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 14,
				description : "\n   " + "With my hearing, I can locate hidden or invisible creatures that are within 10 ft of me",
				vision : [["Blindsense", 10]]
			},
			"slippery mind" : {
				name : "Slippery Mind",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 15,
				description : "\n   " + "I am proficient with Wisdom saving throws",
				saves : ["Wis"]
			},
			"elusive" : {
				name : "Elusive",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 18,
				description : "\n   " + "Attackers do not gain advantage on attacks vs. me, unless I am incapacitated"
			},
			"stroke of luck" : {
				name : "Stroke of Luck",
				source : [["SRD", 40], ["P", 97]],
				minlevel : 20,
				description : "\n   " + "I can turn a missed attack into a hit or a failed ability check into a natural 20",
				recovery : "short rest",
				usages : 1
			}
		}
	},

	"sorcerer" : {
		regExpSearch : /sorcerer|witch/i,
		name : "Sorcerer",
		source : [["SRD", 42], ["P", 99]],
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
		subclasses : ["Sorcerous Origin", ["sorcerer-draconic bloodline"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
			spells : [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15]
		},
		features : {
			"spellcasting" : {
				name : "Spellcasting",
				source : [["SRD", 43], ["P", 101]],
				minlevel : 1,
				description : "\n   " + "I can cast sorcerer cantrips/spells that I know, using Charisma as my spellcasting ability" + "\n   " + "I can use an arcane focus as a spellcasting focus ",
				additional : ["4 cantrips \u0026 2 spells known", "4 cantrips \u0026 3 spells known", "4 cantrips \u0026 4 spells known", "5 cantrips \u0026 5 spells known", "5 cantrips \u0026 6 spells known", "5 cantrips \u0026 7 spells known", "5 cantrips \u0026 8 spells known", "5 cantrips \u0026 9 spells known", "5 cantrips \u0026 10 spells known", "6 cantrips \u0026 11 spells known", "6 cantrips \u0026 12 spells known", "6 cantrips \u0026 12 spells known", "6 cantrips \u0026 13 spells known", "6 cantrips \u0026 13 spells known", "6 cantrips \u0026 14 spells known", "6 cantrips \u0026 14 spells known", "6 cantrips \u0026 15 spells known", "6 cantrips \u0026 15 spells known", "6 cantrips \u0026 15 spells known", "6 cantrips \u0026 15 spells known"]
			},
			"subclassfeature1" : {
				name : "Sorcerous Origin",
				source : [["SRD", 43], ["P", 101]],
				minlevel : 1,
				description : "\n   " + "Choose the Sorcerous Origin for your innate powers and put it in the \"Class\" field" + "\n   " + "Choose either Draconic Bloodline, Storm Sorcery, or Wild Magic"
			},
			"font of magic" : {
				name : "Font of Magic",
				source : [["SRD", 43], ["P", 101]],
				minlevel : 2,
				description : "\n   " + "As a bonus action, I can use sorcery points to create spell slots and vice versa" + "\n   " + "I can convert spell slots to sorcery points at a rate of 1 point per spell slot level" + "\n   " + "I can convert sorcery points to spell slots at the following rate:" + "\n   " + "Level 1 for 2 sorcery points;   level 2 for 3 sorcery points;   level 3 for 5 sorcery points" + "\n   " + "Level 4 for 6 sorcery points;   level 5 for 7 sorcery points",
				usages : [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				recovery : "long rest",
				action : ["bonus action", ""],
				additional : "Sorcery points"
			},
			"metamagic" : {
				name : "Metamagic",
				source : [["SRD", 44], ["P", 101]],
				minlevel : 3,
				description : "\n   " + "Use the \"Choose Feature\" button above to add a Metamagic option to the third page" + "\n   " + "I can use only 1 Metamagic option on a spell unless otherwise written",
				additional : ["", "", "2 known", "2 known", "2 known", "2 known", "2 known", "2 known", "2 known", "3 known", "3 known", "3 known", "3 known", "3 known", "3 known", "3 known", "4 known", "4 known", "4 known", "4 known"],
				extraname : "Metamagic Option",
				extrachoices : ["Careful Spell", "Distant Spell", "Empowered Spell", "Extended Spell", "Heightened Spell", "Quickened Spell", "Subtle Spell", "Twinned Spell"],
				"careful spell" : {
					name : "Careful Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [1 sorcery point]" + "\n   " + "If the spell allows a saving throw, I can protect Cha modifier number of creatures" + "\n   " + "The selected creatures automatically succeed on their saving throws vs. the spell"
				},
				"distant spell" : {
					name : "Distant Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [1 sorcery point]" + "\n   " + "I double the range of the spell or make the range 30 ft if the range was touch"
				},
				"empowered spell" : {
					name : "Empowered Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [1 sorcery point]" + "\n   " + "If the spell uses damage dice, I can reroll my Charisma modifier number of damage dice" + "\n   " + "I can Empower a spell even if I use another Metamagic option on it"
				},
				"extended spell" : {
					name : "Extended Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [1 sorcery point]" + "\n   " + "If the spell has a duration of at least 1 min, I can double it, up to 24 hours"
				},
				"heightened spell" : {
					name : "Heightened Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [3 sorcery points]" + "\n   " + "If the spell allows a saving throw, I can have one target get disadv. on their first save"
				},
				"quickened spell" : {
					name : "Quickened Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [2 sorcery points]" + "\n   " + "If the spell has a casting time of 1 action, I can cast it as a bonus action",
					action : ["bonus action", ""]
				},
				"subtle spell" : {
					name : "Subtle Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [1 sorcery point]" + "\n   " + "I can cast the spell without the need to use somatic or verbal components"
				},
				"twinned spell" : {
					name : "Twinned Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [1 sorcery point per spell level, minimum 1]" + "\n   " + "If spell/cantrip has a target of one and not self, I can aim it at second target within range"
				}
			},
			"sorcerous restoration" : {
				name : "Sorcerous Restoration",
				source : [["SRD", 44], ["P", 102]],
				minlevel : 20,
				description : "\n   " + "I regain 4 expended sorcery points whenever I finish a short rest"
			}
		}
	},

	"warlock" : {
		regExpSearch : /warlock/i,
		name : "Warlock",
		source : [["SRD", 46], ["P", 105]],
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
		subclasses : ["Otherworldly Patron", ["warlock-the fiend"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : "warlock1",
		spellcastingKnown : {
			cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			spells : [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]
		},
		spellcastingList : {
			"class" : "warlock",
			level : [0, 5] //lower and higher limit
		},
		features : {
			"pact magic" : {
				name : "Pact Magic",
				source : [["SRD", 46], ["P", 107]],
				minlevel : 1,
				description : "\n   " + "I can cast warlock cantrips/spells that I know, using Charisma as my spellcasting ability" + "\n   " + "I can use an arcane focus as a spellcasting focus" + "\n   " + "I regain these spell slots on a short rest",
				additional : ["2 cantrips \u0026 2 spells known", "2 cantrips \u0026 3 spells known", "2 cantrips \u0026 4 spells known", "3 cantrips \u0026 5 spells known", "3 cantrips \u0026 6 spells known", "3 cantrips \u0026 7 spells known", "3 cantrips \u0026 8 spells known", "3 cantrips \u0026 9 spells known", "3 cantrips \u0026 10 spells known", "4 cantrips \u0026 10 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 11 spells known", "4 cantrips \u0026 12 spells known", "4 cantrips \u0026 12 spells known", "4 cantrips \u0026 13 spells known", "4 cantrips \u0026 13 spells known", "4 cantrips \u0026 14 spells known", "4 cantrips \u0026 14 spells known", "4 cantrips \u0026 15 spells known", "4 cantrips \u0026 15 spells known"]
			},
			"subclassfeature1" : {
				name : "Otherworldly Patron",
				source : [["SRD", 46], ["P", 107]],
				minlevel : 1,
				description : "\n   " + "Choose the Otherworldly Patron you have a bargain with and put it in the \"Class\" field" + "\n   " + "Choose either the Archfey, the Fiend, the Great Old One, or the Undying"
			},
			"eldritch invocations" : {
				name : "Eldritch Invocations",
				source : [["SRD", 47], ["P", 107]],
				minlevel : 2,
				description : "\n   " + "Use the \"Choose Feature\" button above to add Eldritch Invocations to the third page" + "\n   " + "Whenever I gain a warlock level, I can replace an invocation I know with another",
				additional : ["", "2 invocations known", "2 invocations known", "2 invocations known", "3 invocations known", "3 invocations known", "4 invocations known", "4 invocations known", "5 invocations known", "5 invocations known", "5 invocations known", "6 invocations known", "6 invocations known", "6 invocations known", "7 invocations known", "7 invocations known", "7 invocations known", "8 invocations known", "8 invocations known", "8 invocations known"],
				extraname : "Eldritch Invocation",
				extrachoices : ["Agonizing Blast (prereq: Eldritch Blast cantrip)", "Armor of Shadows", "Ascendant Step (prereq: level 9 warlock)", "Beast Speech", "Beguiling Influence", "Bewitching Whispers (prereq: level 7 warlock)", "Book of Ancient Secrets (prereq: Pact of the Tome)", "Chains of Carceri (prereq: level 15 warlock, Pact of the Chain)", "Devil's Sight", "Dreadful Word (prereq: level 7 warlock)", "Eldritch Sight", "Eldritch Spear (prereq: Eldritch Blast cantrip)", "Eyes of the Rune Keeper", "Fiendish Vigor", "Gaze of Two Minds", "Lifedrinker (prereq: level 12 warlock, Pact of the Blade)", "Mask of Many Faces", "Master of Myriad Forms (prereq: level 15 warlock)", "Minions of Chaos (prereq: level 9 warlock)", "Mire the Mind (prereq: level 5 warlock)", "Misty Visions", "One with Shadows (prereq: level 5 warlock)", "Otherworldly Leap (prereq: level 9 warlock)", "Repelling Blast (prereq: Eldritch Blast cantrip)", "Sculptor of Flesh (prereq: level 7 warlock)", "Sign of Ill Omen (prereq: level 5 warlock)", "Thief of Five Fates", "Thirsting Blade (prereq: level 5 warlock, Pact of the Blade)", "Visions of Distant Realms (prereq: level 15 warlock)", "Voice of the Chain Master (prereq: Pact of the Chain)", "Whispers of the Grave (prereq: level 9 warlock)", "Witch Sight (prereq: level 15 warlock)"],
				"agonizing blast (prereq: eldritch blast cantrip)" : {
					name : "Agonizing Blast",
					description : "\n   " + "I can add my Charisma modifier to the damage of my Eldritch Blast cantrip",
					source : [["SRD", 48], ["P", 110]],
					eval : "var ES = (/eldritch spear/i).test(What('Extra.Notes') + What('Class Features')); RemoveWeapon('eldritch blast'); RemoveWeapon('eldritch spear'); RemoveWeapon('agonizing blast'); if (ES) {AddWeapon('Agonizing Spear')} else {AddWeapon('Agonizing Blast')}",
					removeeval : "RemoveWeapon('agonizing blast'); RemoveWeapon('agonizing spear'); var ES = (/eldritch spear/i).test(What('Extra.Notes') + What('Class Features')); if (ES) {AddWeapon('Eldritch Spear')} else {AddWeapon('Eldritch Blast')}",
					prereqeval : "hasEldritchBlast"
				},
				"armor of shadows" : {
					name : "Armor of Shadows",
					description : "\n   " + "I can cast Mage Armor on myself at will, without spell slots or material comp. (PHB 256)",
					source : [["SRD", 48], ["P", 110]],
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
					source : [["SRD", 48], ["P", 110]],
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
					source : [["SRD", 48], ["P", 110]],
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
					source : [["SRD", 48], ["P", 110]],
					skills : ["Deception", "Persuasion"],
					skillstxt : "\n\n" + toUni("Warlock (Beguiling Influence)") + ": Deception and Persuasion."
				},
				"bewitching whispers (prereq: level 7 warlock)" : {
					name : "Bewitching Whispers",
					description : "\n   " + "Once per long rest, I can cast Compulsion using a warlock spell slot (PHB 224)",
					source : [["SRD", 48], ["P", 110]],
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
					source : [["SRD", 48], ["P", 110]],
					eval : "CurrentSpells['book of ancient secrets'] = {name : 'Book of Ancient Secrets', ability : 6, list : {class : 'any', ritual : true}, known : {spells : 'book'}}; SetStringifieds();",
					removeeval : "delete CurrentSpells['book of ancient secrets']; SetStringifieds();",
					prereqeval : "classes.known.warlock.level >= 3 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the tome') !== -1"
				},
				"chains of carceri (prereq: level 15 warlock, pact of the chain)" : {
					name : "Chains of Carceri",
					description : "\n   " + "I can cast Hold Monster at will if the target is a celestial, fiend, or elemental (PHB 251)" + "\n   " + "This uses no spell slots/material comp.; I can only target an individual once per long rest",
					source : [["SRD", 49], ["P", 110]],
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
					source : [["SRD", 49], ["P", 110]],
					vision : [["Devil's sight", 120]]
				},
				"dreadful word (prereq: level 7 warlock)" : {
					name : "Dreadful Word",
					description : "\n   " + "Once per long rest, I can cast Confusion using a warlock spell slot (PHB 224)",
					source : [["SRD", 49], ["P", 110]],
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
					source : [["SRD", 49], ["P", 110]],
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
					source : [["SRD", 49], ["P", 111]],
					eval : "var AB = (/agonizing blast/i).test(What('Extra.Notes') + What('Class Features')); RemoveWeapon('eldritch blast'); RemoveWeapon('eldritch spear'); RemoveWeapon('agonizing blast'); if (AB) {AddWeapon('Agonizing Spear')} else {AddWeapon('Eldritch Spear')}",
					removeeval : "RemoveWeapon('eldritch spear'); RemoveWeapon('agonizing spear'); var AB = (/agonizing blast/i).test(What('Extra.Notes') + What('Class Features')); RemoveWeapon('eldritch blast'); if (AB) {AddWeapon('Agonizing Blast')} else {AddWeapon('Eldritch Blast')}",
					prereqeval : "hasEldritchBlast"
				},
				"eyes of the rune keeper" : {
					name : "Eyes of the Rune Keeper",
					description : "\n   " + "I can read all writing",
					source : [["SRD", 49], ["P", 111]]
				},
				"fiendish vigor" : {
					name : "Fiendish Vigor",
					description : "\n   " + "I can cast False Life on myself at will, without spell slots or material comp. (PHB 239)",
					source : [["SRD", 49], ["P", 111]],
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
					source : [["SRD", 49], ["P", 111]]
				},
				"lifedrinker (prereq: level 12 warlock, pact of the blade)" : {
					name : "Lifedrinker",
					description : "\n   " + "My pact weapon does extra necrotic damage equal to my Charisma modifier",
					source : [["SRD", 49], ["P", 111]],
					calcChanges : {
						atkCalc : ["if (isMeleeWeapon && (/\\bpact\\b/i).test(WeaponText)) { output.extraDmg += What('Cha Mod'); }; ", "If I include the word 'Pact' in a melee weapon's name or description, the calculation will add my Charisma modifier to its damage. However, it won't say that this added damage is of the necrotic type, as it can only display a single damage type."]
					},
					prereqeval : "classes.known.warlock.level >= 12 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the blade') !== -1"
				},
				"mask of many faces" : {
					name : "Mask of Many Faces",
					description : "\n   " + "I can cast Disguise Self on myself at will, without using spell slots (PHB 233)",
					source : [["SRD", 49], ["P", 111]],
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
					source : [["SRD", 49], ["P", 111]],
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
					source : [["SRD", 49], ["P", 111]],
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
					source : [["SRD", 49], ["P", 111]],
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
					source : [["SRD", 49], ["P", 111]],
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
					source : [["SRD", 49], ["P", 111]],
					action : ["action", ""],
					prereqeval : "classes.known.warlock.level >= 5"
				},
				"otherworldly leap (prereq: level 9 warlock)" : {
					name : "Otherworldly Leap",
					description : "\n   " + "I can cast Jump on myself at will, without using spell slots or material comp. (PHB 254)",
					source : [["SRD", 49], ["P", 111]],
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
					source : [["SRD", 49], ["P", 111]],
					calcChanges : {
						atkAdd : ["if (theWea && (/eldritch blast/i).test(theWea.name)) {fields.Description += '; Target pushed back 10 ft'; }; ", "When I hit a creature with my Eldritch Blast cantrip, it is pushed 10 ft away from me."]
					},
					prereqeval : "hasEldritchBlast"
				},
				"sculptor of flesh (prereq: level 7 warlock)" : {
					name : "Sculptor of Flesh",
					description : "\n   " + "Once per long rest, I can cast Polymorph using a warlock spell slot (PHB 266)",
					source : [["SRD", 50], ["P", 111]],
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
					source : [["SRD", 50], ["P", 111]],
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
					source : [["SRD", 50], ["P", 111]],
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
					source : [["SRD", 50], ["P", 111]],
					eval : "AddAction('action', 'Pact Weapon (2 attacks per action)', 'Thirsting Blade (warlock invocation)');",
					removeeval : "RemoveAction('action', 'Pact Weapon (2 attacks per action)');",
					prereqeval : "classes.known.warlock.level >= 5 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the blade') !== -1"
				},
				"visions of distant realms (prereq: level 15 warlock)" : {
					name : "Visions of Distant Realms",
					description : "\n   " + "I can cast Arcane Eye at will, without using spell slots (PHB 214)",
					source : [["SRD", 50], ["P", 111]],
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
					source : [["SRD", 50], ["P", 111]],
					prereqeval : "classes.known.warlock.level >= 3 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the chain') !== -1"
				},
				"whispers of the grave (prereq: level 9 warlock)" : {
					name : "Whispers of the Grave",
					description : "\n   " + "I can cast Speak with Dead at will, without using spell slots (PHB 277)",
					source : [["SRD", 50], ["P", 111]],
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
					source : [["SRD", 50], ["P", 111]],
					vision : [["Witch sight", 30]],
					prereqeval : "classes.known.warlock.level >= 15"
				}
			},
			"pact boon" : {
				name : "Pact Boon",
				source : [["SRD", 47], ["P", 107]],
				minlevel : 3,
				description : "\n   " + "Choose a Pact Boon (Blade, Chain, or Tome) using the \"Choose Feature\" button above",
				choices : ["Pact of the Blade", "Pact of the Chain", "Pact of the Tome"],
				"pact of the blade" : {
					name : "Pact of the Blade",
					description : "\n   " + "As an action, I can create a pact weapon in my empty hand; I'm proficient in its use" + "\n   " + "I can choose the type of melee weapon every time I create it, and it has those statistics" + "\n   " + "The weapon disappears if it is more than 5 ft away from me for 1 minute" + "\n   " + "The weapon counts as magical; I can transform a magic weapon into my pact weapon" + "\n   " + "This occurs over an hour-long ritual that I can perform during a short rest" + "\n   " + "I can use an action to re-summon it in any form and can dismiss it as no action",
					action : ["action", ""],
					calcChanges : {
						atkAdd : ["if (WeaponName === 'moon bow' || (isMeleeWeapon && (/\\bpact\\b/i).test(WeaponText))) {fields.Proficiency = true; fields.Description += thisWeapon[1] ? '' : (fields.Description ? '; ' : '') + 'Counts as magical'; }; ", "If I include the word 'Pact' in a melee weapon's name, it gets treated as my Pact Weapon."]
					}
				},
				"pact of the chain" : {
					name : "Pact of the Chain",
					description : "\n   " + "I can cast Find Familiar as a ritual (PHB 240); Also Imp/Pseudodragon/Quasit/Sprite" + "\n   " + "When taking the attack action, I can forgo 1 attack to have my familiar attack instead" + "\n   " + "It makes this 1 attack by using its reaction",
					spellcastingBonus : {
						name : "Pact of the Chain",
						spells : ["find familiar"],
						selection : ["find familiar"],
						firstCol : "(R)"
					}
				},
				"pact of the tome" : {
					name : "Pact of the Tome",
					source : [["SRD", 48], ["P", 108]],
					description : "\n   " + "I have a Book of Shadows with any three cantrips of my choosing" + "\n   " + "I can cast these cantrips as long as I have the book on my person" + "\n   " + "Regardless of the lists they come from, these count as warlock cantrips to me" + "\n   " + "I can get a replacement book with a 1-hour ceremony during a short or long rest",
					spellcastingBonus : {
						name : "Pact of the Tome",
						"class" : "any",
						level : [0, 0],
						times : 3
					}
				}
			},
			"mystic arcanum" : {
				name : "Mystic Arcanum",
				source : [["SRD", 48], ["P", 108]],
				minlevel : 11,
				description : "\n   " + "I can choose one spell from the warlock spell list of each level mentioned above" + "\n   " + "I can cast these spells each once per long rest without needing to use a spell slot",
				additional : ["", "", "", "", "", "", "", "", "", "", "6th level", "6th level", "6th and 7th level", "6th and 7th level", "6th, 7th, and 8th level", "6th, 7th, and 8th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level"],
				spellcastingBonus : {
					name : "Mystic Arcanum (6)",
					"class" : "warlock",
					level : [6, 6],
					oncelr : true
				},
				changeeval : "if (classes.known.warlock.level < 13) {delete CurrentSpells.warlock.bonus['mystic arcanum (7)']} else {if (!CurrentSpells.warlock.bonus['mystic arcanum (7)']) {CurrentSpells.warlock.bonus['mystic arcanum (7)'] = {name : 'Mystic Arcanum (7)', class : 'warlock', level : [7, 7], oncelr : true}}}; if (classes.known.warlock.level < 15) {delete CurrentSpells.warlock.bonus['mystic arcanum (8)']} else {if (!CurrentSpells.warlock.bonus['mystic arcanum (8)']) {CurrentSpells.warlock.bonus['mystic arcanum (8)'] = {name : 'Mystic Arcanum (8)', class : 'warlock', level : [8, 8], oncelr : true}}}; if (classes.known.warlock.level < 17) {delete CurrentSpells.warlock.bonus['mystic arcanum (9)']} else {if (!CurrentSpells.warlock.bonus['mystic arcanum (9)']) {CurrentSpells.warlock.bonus['mystic arcanum (9)'] = {name : 'Mystic Arcanum (9)', class : 'warlock', level : [9, 9], oncelr : true}}}"
			},
			"eldritch master" : {
				name : "Eldritch Master",
				source : [["SRD", 48], ["P", 108]],
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
		source : [["SRD", 52], ["P", 112]],
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
		subclasses : ["Arcane Tradition", ["wizard-evocation"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
			spells : "book",
			prepared : true
		},
		features : {
			"spellcasting" : {
				name : "Spellcasting",
				source : [["SRD", 52], ["P", 114]],
				minlevel : 1,
				description : "\n   " + "I can cast prepared wizard cantrips/spells, using Intelligence as my spellcasting ability" + "\n   " + "I can use an arcane focus as a spellcasting focus" + "\n   " + "I can cast all wizard spells in my spellbook as rituals if they have the ritual tag",
				additional : ["3 cantrips known", "3 cantrips known", "3 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "4 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known", "5 cantrips known"]
			},
			"arcane recovery" : {
				name : "Arcane Recovery",
				source : [["SRD", 53], ["P", 115]],
				minlevel : 1,
				description : "\n   " + "Once per day after a short rest, I can recover a number of 5th-level or lower spell slots",
				additional : ["1 level of spell slots", "1 level of spell slots", "2 levels of spell slots", "2 levels of spell slots", "3 levels of spell slots", "3 levels of spell slots", "4 levels of spell slots", "4 levels of spell slots", "5 levels of spell slots", "5 levels of spell slots", "6 levels of spell slots", "6 levels of spell slots", "7 levels of spell slots", "7 levels of spell slots", "8 levels of spell slots", "8 levels of spell slots", "9 levels of spell slots", "9 levels of spell slots", "10 levels of spell slots", "10 levels of spell slots"],
				usages : 1,
				recovery : "long rest"
			},
			"subclassfeature2" : {
				name : "Arcane Tradition",
				source : [["SRD", 53], ["P", 115]],
				minlevel : 2,
				description : "\n   " + "Choose the Arcane Tradition you studied and put it in the \"Class\" field" + "\n   " + "Choose either the School of Abjuration, Conjuration, Divination, Enchantment," + "\n   " + "Evocation, Illusion, Necromancy, or Transmutation, or become a Bladesinger"
			},
			"spell mastery" : {
				name : "Spell Mastery",
				source : [["SRD", 53], ["P", 115]],
				minlevel : 18,
				description : "\n   " + "By spending 8 hours in study, I can pick a 1st and 2nd-level spell in my spellbook" + "\n   " + "While prepared, I can cast them at their lowest levels without expending spell slots"
			},
			"signature spell" : {
				name : "Signature Spell",
				source : [["SRD", 54], ["P", 115]],
				minlevel : 20,
				description : "\n   " + "Two 3rd-level spells of my choice in my spellbook will always count as prepared" + "\n   " + "I can cast both at third level once per short rest without expending spell slots",
				recovery : "short rest",
				usages : 2
			}
		}
	}
};

var Base_ClassSubList = {
	"barbarian-berserker" : {
		regExpSearch : /^((?=.*\b(berserker|berserk|berserkr|ulfheoinn|ulfheonar)s?\b)|((?=.*(warrior|fighter))(?=.*(odin|thor)))).*$/i,
		subname : "Path of the Berserker",
		fullname : "Berserker",
		source : [["SRD", 9], ["P", 49]],
		abilitySave : 6,
		features : {
			"subclassfeature3" : {
				name : "Frenzy",
				source : [["SRD", 9], ["P", 49]],
				minlevel : 3,
				description : "\n   " + "Melee attack as bonus action each turn while raging; +1 level of exhaustion after rage",
				action : ["bonus action", " attack (while raging)"]
			},
			"subclassfeature6" : {
				name : "Mindless Rage",
				source : [["SRD", 10], ["P", 49]],
				minlevel : 6,
				description : "\n   " + "While raging, I can't be charmed or frightened, and such effects are suspended",
				savetxt : { text : ["Immune to being charmed/frightened in rage"] }
			},
			"subclassfeature10" : {
				name : "Intimidating Presence",
				source : [["SRD", 10], ["P", 49]],
				minlevel : 10,
				description : "\n   " + "As an action, frighten one creature in 30 ft for one turn if it fails a Wisdom save" + "\n   " + "This effect ends if the creature is out of line of sight or more than 60 ft away\n   If a creature succeeds its saving throw, it is immune for 24 hours",
				action : ["action", ""]
			},
			"subclassfeature14" : {
				name : "Retaliation",
				source : [["SRD", 10], ["P", 50]],
				minlevel : 14,
				description : "\n   " + "When an enemy within 5 ft damages me, I can make a melee attack as a reaction",
				action : ["reaction", " (after taking damage)"]
			}
		}
	},
	"bard-college of lore" : {
		regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*lore).*$/i,
		subname : "College of Lore",
		source : [["SRD", 13], ["P", 54]],
		features : {
			"subclassfeature3" : {
				name : "Bonus Proficiencies",
				source : [["SRD", 13], ["P", 54]],
				minlevel : 3,
				description : "\n   " + "I gain proficiency with three skills of my choice",
				skillstxt : "\n\n" + toUni("College of Lore") + ": Choose any three skills."
			},
			"subclassfeature3.1" : {
				name : "Cutting Words",
				source : [["SRD", 13], ["P", 54]],
				minlevel : 3,
				description : "\n   " + "As a reaction, when a foe within earshot & 60 ft rolls ability check, attack or damage," + "\n   " + "I can subtract a Bardic Inspiration die from the result unless the foe can't be charmed",
				action : ["reaction", ""]
			},
			"subclassfeature6" : {
				name : "Additional Magical Secrets",
				source : [["SRD", 13], ["P", 55]],
				minlevel : 6,
				description : "\n   " + "I can add two spells/cantrips from any class to my Spells Known",
				spellcastingBonus : {
					name : "Additional Magical Secret",
					"class" : "any",
					times : 2
				}
			},
			"subclassfeature14" : {
				name : "Peerless Skill",
				source : [["SRD", 14], ["P", 55]],
				minlevel : 14,
				description : "\n   " + "When making an ability check, I can expend a use of Bardic Inspiration to add the die"
			}
		}
	},
	"cleric-life domain" : {
		regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*\b(life|living|healing)\b).*$/i,
		subname : "Life Domain",
		source : [["SRD", 17], ["P", 60]],
		spellcastingExtra : ["bless", "cure wounds", "lesser restoration", "spiritual weapon", "beacon of hope", "revivify", "death ward", "guardian of faith", "mass cure wounds", "raise dead"],
		features : {
			"subclassfeature1" : {
				name : "Bonus Proficiency",
				source : [["SRD", 17], ["P", 60]],
				minlevel : 1,
				description : "\n   " + "I gain proficiency with heavy armor",
				armor : [false, false, true, false]
			},
			"subclassfeature1.1" : {
				name : "Disciple of Life",
				source : [["SRD", 17], ["P", 60]],
				minlevel : 1,
				description : "\n   " + "When I use a spell that restores hit points, it restores an additional 2 + spell level"
			},
			"subclassfeature2" : {
				name : "Channel Divinity: Preserve Life",
				source : [["SRD", 17], ["P", 60]],
				minlevel : 2,
				description : "\n   " + "As an action, I can heal any creature within 30 ft of me up to half their maximum HP" + "\n   " + "I divide the number of hit points among the creatures as I see fit",
				additional : ["", "10 hit points", "15 hit points", "20 hit points", "25 hit points", "30 hit points", "35 hit points", "40 hit points", "45 hit points", "50 hit points", "55 hit points", "60 hit points", "65 hit points", "70 hit points", "75 hit points", "80 hit points", "85 hit points", "90 hit points", "95 hit points", "100 hit points"],
				action : ["action", ""]
			},
			"subclassfeature6" : {
				name : "Blessed Healer",
				source : [["SRD", 17], ["P", 60]],
				minlevel : 6,
				description : "\n   " + "When I restore HP to another with a spell, I regain 2 + the spell's level in HP"
			},
			"subclassfeature8" : {
				name : "Divine Strike",
				source : [["SRD", 17], ["P", 60]],
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
				source : [["SRD", 17], ["P", 60]],
				minlevel : 17,
				description : "\n   " + "When I restore HP with a spell, I heal the maximum amount instead of rolling the dice"
			}
		}
	},
	"druid-circle of the land" : {
		regExpSearch : /^(?=.*(druid|shaman))(?=.*\b(land|arctic|coast|deserts?|forests?|grasslands?|savannah|steppes?|mountains?|swamps?|underdark)\b).*$/i,
		subname : "Circle of the Land",
		source : [["SRD", 21], ["P", 68]],
		features : {
			"subclassfeature2" : {
				name : "Bonus Cantrip",
				source : [["SRD", 21], ["P", 68]],
				minlevel : 2,
				description : "\n   " + "I know one additional druid cantrip of my choice",
				spellcastingBonus : {
					name : "Bonus Druid Cantrip",
					"class" : "druid",
					level : [0, 0]
				}
			},
			"subclassfeature2.1" : {
				name : "Natural Recovery",
				source : [["SRD", 21], ["P", 68]],
				minlevel : 2,
				description : "\n   " + "After a short rest, I can recover a number of 5th-level or lower spell slots",
				additional : ["1 level spell slots", "1 level spell slots", "2 levels spell slots", "2 levels spell slots", "3 levels spell slots", "3 levels spell slots", "4 levels spell slots", "4 levels spell slots", "5 levels spell slots", "5 levels spell slots", "6 levels spell slots", "6 levels spell slots", "7 levels spell slots", "7 levels spell slots", "8 levels spell slots", "8 levels spell slots", "9 levels spell slots", "9 levels spell slots", "10 levels spell slots", "10 levels spell slots"],
				usages : 1,
				recovery : "long rest"
			},
			"subclassfeature3" : {
				name : "Circle Spells",
				source : [["SRD", 21], ["P", 68]],
				minlevel : 3,
				description : "\n   " + "Choose a terrain that grants you spells using the \"Choose Feature\" button above",
				choices : ["Arctic", "Coast", "Desert", "Forest", "Grassland", "Mountain", "Swamp", "Underdark"],
				"arctic" : {
					name : "Arctic Circle Spells",
					description : "\n   " + "My mystical connection to the arctic infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["hold person", "spike growth", "sleet storm", "slow", "freedom of movement", "ice storm", "commune with nature", "cone of cold"],
					eval : "if (event.target.name === 'Class Features Menu') {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated', cTitle: 'Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};"
				},
				"coast" : {
					name : "Coast Circle Spells",
					description : "\n   " + "My mystical connection to the coast infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["mirror image", "misty step", "water breathing", "water walk", "control water", "freedom of movement", "conjure elemental", "scrying"],
					eval : "if (event.target.name === 'Class Features Menu') {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};"
				},
				"desert" : {
					name : "Desert Circle Spells",
					description : "\n   " + "My mystical connection to the desert infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["blur", "silence", "create food and water", "protection from energy", "blight", "hallucinatory terrain", "insect plague", "wall of stone"],
					eval : "if (event.target.name === 'Class Features Menu') {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};"
				},
				"forest" : {
					name : "Forest Circle Spells",
					description : "\n   " + "My mystical connection to the forest infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["barkskin", "spider climb", "call lightning", "plant growth", "divination", "freedom of movement", "commune with nature", "tree stride"],
					eval : "if (event.target.name === 'Class Features Menu') {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};"
				},
				"grassland" : {
					name : "Grassland Circle Spells",
					description : "\n   " + "My connection to the grassland infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["invisibility", "pass without trace", "daylight", "haste", "divination", "freedom of movement", "dream", "insect plague"],
					eval : "if (event.target.name === 'Class Features Menu') {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};"
				},
				"mountain" : {
					name : "Mountain Circle Spells",
					description : "\n   " + "My connection to the mountains infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["spider climb", "spike growth", "lightning bolt", "meld into stone", "stone shape", "stoneskin", "passwall", "wall of stone"],
					eval : "if (event.target.name === 'Class Features Menu') {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};"
				},
				"swamp" : {
					name : "Swamp Circle Spells",
					description : "\n   " + "My mystical connection to the swamp infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["darkness", "melf's acid arrow", "water walk", "stinking cloud", "freedom of movement", "locate creature", "insect plague", "scrying"],
					eval : "if (event.target.name === 'Class Features Menu') {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};"
				},
				"underdark" : {
					name : "Underdark Circle Spells",
					description : "\n   " + "My connection to the underdark infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["spider climb", "web", "gaseous form", "stinking cloud", "greater invisibility", "stone shape", "cloudkill", "insect plague"],
					eval : "if (event.target.name === 'Class Features Menu') {app.alert({cMsg: \"You just changed the spells that should appear on the spell sheet. Please use the 'Spells' button or bookmark generate a new spell sheet so that these changes can be incorporated\", cTitle: \"Circle Spells need to be added to the Spell Sheet(s)\", nIcon : 3, nType : 0})};"
				}
			},
			"subclassfeature6" : {
				name : "Land's Stride",
				source : [["SRD", 22], ["P", 68]],
				minlevel : 6,
				description : "\n   " + "I can travel through nonmagical, difficult terrain without penalty" + "\n   " + "I have advantage on saves vs. plants that impede movement by magical influence",
				savetxt : { adv_vs : ["magical plants that impede movement"] }
			},
			"subclassfeature10" : {
				name : "Nature's Ward",
				source : [["SRD", 22], ["P", 68]],
				minlevel : 10,
				description : "\n   " + "I am immune to poison/disease and I can't be charmed/frightened by elementals or fey",
				savetxt : { text : ["Immune to being charmed or frightened by elementals or fey"], immune : ["poison", "disease"] }
			},
			"subclassfeature14" : {
				name : "Nature's Sanctuary",
				source : [["SRD", 22], ["P", 68]],
				minlevel : 14,
				description : "\n   " + "When a beast or plant attacks me, it must make a Wis save or pick a different target" + "\n   " + "If it can't, it automatically misses; On a successful save, it is immune for 24 hours"
			}
		}
	},
	"fighter-champion" : {
		regExpSearch : /champion/i,
		subname : "Champion",
		fullname : "Champion",
		source : [["SRD", 25], ["P", 72]],
		features : {
			"subclassfeature3" : {
				name : "Improved Critical",
				source : [["SRD", 25], ["P", 72]],
				minlevel : 3,
				description : "\n   " + "I score a critical hit with my weapon attacks on a roll of 19 and 20",
				calcChanges : {
					atkAdd : ["if (!isSpell && classes.known.fighter && classes.known.fighter.level > 2 && classes.known.fighter.level < 15 && !CritChance) {var CritChance = 19; fields.Description += (fields.Description ? '; ' : '') + 'Crit on 19-20'; }; ", "My weapon attacks score a critical on a to hit roll of both 19 and 20."]
				}
			},
			"subclassfeature7" : {
				name : "Remarkable Athlete",
				source : [["SRD", 25], ["P", 72]],
				minlevel : 7,
				description : "\n   " + "I add half my proficiency bonus to Str/Dex/Con checks if I would otherwise add none" + "\n   " + "When making running jumps, I add my Strength modifier to the distance in feet",
				eval : "Checkbox('Remarkable Athlete', true)",
				removeeval : "Checkbox('Remarkable Athlete', false)"
			},
			"subclassfeature10" : function () {
				var FSfea = newObj(Base_ClassList.fighter.features["fighting style"]);
				FSfea.name = "Additional Fighting Style";
				FSfea.source = [["SRD", 25], ["P", 73]];
				FSfea.minlevel = 10;
				FSfea.description = "\n   " + "Choose an Additional Fighting Style using the \"Choose Feature\" button above ";
				return FSfea;
			}(),
			"subclassfeature15" : {
				name : "Superior Critical",
				source : [["SRD", 25], ["P", 73]],
				minlevel : 15,
				description : "\n   " + "I score a critical hit with my weapon attacks on a roll of 18, 19, and 20",
				calcChanges : {
					atkAdd : ["if (!isSpell && classes.known.fighter && classes.known.fighter.level > 14) {if (CritChance) {fields.Description = CritChance <= 18 ? fields.Description : fields.Description.replace('Crit on ' + CritChance + '-20', 'Crit on 18-20'); } else {fields.Description += (fields.Description ? '; ' : '') + 'Crit on 18-20'; }; var CritChance = 18; }; ", "My weapon attacks also score a critical on a to hit roll of 18."]
				}
			},
			"subclassfeature18" : {
				name : "Survivor",
				source : [["SRD", 25], ["P", 73]],
				minlevel : 18,
				description : "\n   " + "At the start of my turn, if I'm not above half or at 0 HP, I regain 5 + Con mod HP"
			}
		}
	},
	"monk-way of the open hand" : {
		regExpSearch : /^(?=.*\bopen\b)(?=.*\bhand\b)((?=.*(monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
		subname : "Way of the Open Hand",
		source : [["SRD", 28], ["P", 79]],
		features : {
			"subclassfeature3" : {
				name : "Hand Technique",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 3,
				description : desc([
					"Whenever I hit a creature with a Flurry of Blows attack I can do one of the following:",
					"\u2022 Have it make a Dexterity save or be knocked prone",
					"\u2022 Have it make a Strength save or be pushed up to 15 ft away from me",
					"\u2022 Stop it from taking reactions until the end of my next turn"
				])
			},
			"subclassfeature6" : {
				name : "Wholeness of Body",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 6,
				description : "\n   " + "As an action, I regain hit points equal to three times my monk level",
				additional : levels.map(function (n) { return n < 6 ? "" : (n*3) + " hit points" }),
				usages : 1,
				recovery : "long rest",
				action : ["action", ""]
			},
			"subclassfeature11" : {
				name : "Tranquility",
				source : [["SRD", 29], ["P", 80]],
				minlevel : 11,
				description : "\n   " + "After a long rest, I gain the effect of a Sanctuary spell until a next long rest (PHB 272)",
				extraname : "Way of the Open Hand 17",
				changeeval : "if (newClassLvl.monk >= 17 && (What('Extra.Notes') + What('Class Features')).toLowerCase().indexOf('quivering palm') === -1) {ClassFeatureOptions(['monk', 'subclassfeature11', 'quivering palm', 'extra'])} else if (newClassLvl.monk < 17 && oldClassLvl.monk >= 17) {ClassFeatureOptions(['monk', 'subclassfeature11', 'quivering palm', 'extra'], 'remove')};",
				"quivering palm" : {
					name : "Quivering Palm",
					source : [["SRD", 29], ["P", 80]],
					description : " [3 ki points]" + "\n   " + "When I hit a creature with an unarmed strike, I can start imperceptible vibrations" + "\n   " + "Within my monk level in days, I can use an action to have the creature make a Con save" + "\n   " + "If it fails, it is reduced to 0 hit points; If it succeeds, it takes 10d10 necrotic damage"
				}
			}
		}
	},
	"paladin-oath of devotion" : {
		regExpSearch : /^(?=.*(devotion|obedience))(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper))))).*$/i,
		subname : "Oath of Devotion",
		source : [["SRD", 32], ["P", 86]],
		spellcastingExtra : ["protection from evil and good", "sanctuary", "lesser restoration", "zone of truth", "beacon of hope", "dispel magic", "freedom of movement", "guardian of faith", "commune", "flame strike"],
		features : {
			"subclassfeature3" : {
				name : "Channel Divinity: Sacred Weapon",
				source : [["SRD", 33], ["P", 86]],
				minlevel : 3,
				description : "\n   " + "As an action, for 1 minute, I add my Cha modifier to hit for one weapon I'm holding" + "\n   " + "It also counts as magical and emits bright light in a 20-ft radius and equal dim light",
				action : ["action", ""],
				calcChanges : {
					atkCalc : ["if (classes.known.paladin && classes.known.paladin.level > 2 && !isSpell && (/^(?=.*sacred)(?=.*weapon).*$/i).test(WeaponText)) { output.extraHit += What('Cha Mod'); }; ", "If I include the words 'Sacred Weapon' in the name or description of a weapon, it gets my Charisma modifier added to its To Hit."]
				}
			},
			"subclassfeature3.1" : {
				name : "Channel Divinity: Turn the Unholy",
				source : [["SRD", 33], ["P", 86]],
				minlevel : 3,
				description : "\n   " + "As an action, all fiends/undead within 30 ft that can hear me must make a Wis save" + "\n   " + "If one of them fails this save, it is turned for 1 minute or until it takes damage" + "\n   " + "Turned: move away, never within 30 ft of me, no reactions or actions other than Dash" + "\n   " + "Turned: may Dodge instead of Dash when nowhere to move and unable to escape bonds",
				action : ["action", ""]
			},
			"subclassfeature7" : {
				name : "Aura of Devotion",
				source : [["SRD", 33], ["P", 86]],
				minlevel : 7,
				description : "\n   " + "While I'm conscious, allies within range and I can't be charmed",
				additional : ["", "", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
				savetxt : { immune : ["charmed"] }
			},
			"subclassfeature15" : {
				name : "Purity of Spirit",
				source : [["SRD", 33], ["P", 86]],
				minlevel : 15,
				description : "\n   " + "I am always under the effect of a Protection from Evil and Good spell (PHB 270)"
			},
			"subclassfeature20" : {
				name : "Holy Nimbus",
				source : [["SRD", 33], ["P", 86]],
				minlevel : 20,
				description : "\n   " + "As an action, I shine with a 30-ft radius bright light and equal dim light for 1 minute" + "\n   " + "If an enemy starts its turn in the bright light, it takes 10 radiant damage" + "\n   " + "For the duration, I have advantage on saves vs. spells cast by fiends and undead",
				recovery : "long rest",
				usages : 1,
				action : ["action", ""]
			}
		}
	},
	"ranger-hunter" : {
		regExpSearch : /^(?!.*(monster|barbarian|bard|cleric|druid|fighter|monk|paladin|rogue|sorcerer|warlock|wizard))(?=.*(hunter|huntress|hunts(wo)?m(e|a)n)).*$/i,
		subname : "Hunter",
		fullname : "Hunter",
		source : [["SRD", 37], ["P", 93]],
		features : {
			"subclassfeature3" : {
				name : "Hunter's Prey",
				source : [["SRD", 37], ["P", 93]],
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
				source : [["SRD", 38], ["P", 93]],
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
					savetxt : { adv_vs : ["frightened"] }
				}
			},
			"subclassfeature11" : {
				name : "Multiattack",
				source : [["SRD", 38], ["P", 93]],
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
				source : [["SRD", 38], ["P", 93]],
				minlevel : 15,
				description : "\n   " + "\"Choose Feature\" button to choose Evasion, Stand Against the Tide, or Uncanny Dodge",
				choices : ["Evasion", "Stand Against the Tide", "Uncanny Dodge"],
				"evasion" : {
					name : "Evasion",
					description : "\n   " + "My Dexterity saves vs. areas of effect negate damage on success and halve it on failure",
					savetxt : { text : ["Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg"] }
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
	"rogue-thief" : {
		regExpSearch : /^(?!.*(barbarian|bard|cleric|druid|fighter|monk|paladin|ranger|sorcerer|warlock|wizard))(?=.*(thief|burglar)).*$/i,
		subname : "Thief",
		fullname : "Thief",
		source : [["SRD", 41], ["P", 97]],
		features : {
			"subclassfeature3" : {
				name : "Fast Hands",
				source : [["SRD", 40], ["P", 97]],
				minlevel : 3,
				description : "\n   " + "As a bonus action, I can do one of the following:" + "\n    - " + "Make a Dexterity (Sleight of Hand) check" + "\n    - " + "Use my thieves' tools to disarm a trap or open a lock" + "\n    - " + "Take the Use an Object action",
				action : ["bonus action", ""]
			},
			"subclassfeature3.1" : {
				name : "Second-Story Work",
				source : [["SRD", 41], ["P", 97]],
				minlevel : 3,
				description : "\n   " + "I climb at my normal speed; I add my Dex modifier to the distance of a running jump",
				speed : { climb : { spd : "walk", enc : "walk" } }
			},
			"subclassfeature9" : {
				name : "Supreme Sneak",
				source : [["SRD", 41], ["P", 97]],
				minlevel : 9,
				description : "\n   " + "I have advantage on Dexterity (Stealth) checks when moving no more than half speed"
			},
			"subclassfeature13" : {
				name : "Use Magic Device",
				source : [["SRD", 41], ["P", 97]],
				minlevel : 13,
				description : "\n   " + "I can use magic items even if I don't meet the class, race, and/or level requirements"
			},
			"subclassfeature17" : {
				name : "Thief's Reflexes",
				source : [["SRD", 41], ["P", 97]],
				minlevel : 17,
				description : "\n   " + "Unless surprised, I can take two turns on the first round of any combat" + "\n   " + "The first turn is at my regular initiative, and the second is at my initiative - 10"
			}
		}
	},
	"sorcerer-draconic bloodline" : {
		regExpSearch : /^(?=.*(sorcerer|witch))(?=.*(draconic|dragon)).*$/i,
		subname : "Draconic Bloodline",
		source : [["SRD", 44], ["P", 102]],
		features : {
			"subclassfeature1" : {
				name : "Dragon Ancestor",
				source : [["SRD", 44], ["P", 102]],
				minlevel : 1,
				description : "\n   " + "Choose a Dragon Ancestor using the \"Choose Feature\" button above" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
				choices : ["Black Dragon Ancestor", "Blue Dragon Ancestor", "Brass Dragon Ancestor", "Bronze Dragon Ancestor", "Copper Dragon Ancestor", "Gold Dragon Ancestor", "Green Dragon Ancestor", "Red Dragon Ancestor", "Silver Dragon Ancestor", "White Dragon Ancestor"],
				"black dragon ancestor" : {
					name : "Black Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with black dragons, which are affiliated with acid damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = ['sorcerer', 'subclassfeature6', 'acid']; if (classes.known.sorcerer.level >= 6 && What('Class Features Remember').indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "acid"
				},
				"blue dragon ancestor" : {
					name : "Blue Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with blue dragons, which are affiliated with lightning damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = ['sorcerer', 'subclassfeature6', 'lightning']; if (classes.known.sorcerer.level >= 6 && What('Class Features Remember').indexOf(ToAdd.slice(0,3).toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "lightning"
				},
				"brass dragon ancestor" : {
					name : "Brass Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with brass dragons, which are affiliated with fire damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = ['sorcerer', 'subclassfeature6', 'fire']; if (classes.known.sorcerer.level >= 6 && What('Class Features Remember').indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "fire"
				},
				"bronze dragon ancestor" : {
					name : "Bronze Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with bronze dragons, which are affiliated with lightning dmg" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = ['sorcerer', 'subclassfeature6', 'lightning']; if (classes.known.sorcerer.level >= 6 && What('Class Features Remember').indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "lightning"
				},
				"copper dragon ancestor" : {
					name : "Copper Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with copper dragons, which are affiliated with acid damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = ['sorcerer', 'subclassfeature6', 'acid']; if (classes.known.sorcerer.level >= 6 && What('Class Features Remember').indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "acid"
				},
				"gold dragon ancestor" : {
					name : "Gold Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with gold dragons, which are affiliated with fire damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = ['sorcerer', 'subclassfeature6', 'fire']; if (classes.known.sorcerer.level >= 6 && What('Class Features Remember').indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "fire"
				},
				"green dragon ancestor" : {
					name : "Green Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with green dragons, which are affiliated with poison damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = ['sorcerer', 'subclassfeature6', 'poison']; if (classes.known.sorcerer.level >= 6 && What('Class Features Remember').indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "poison"
				},
				"red dragon ancestor" : {
					name : "Red Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with red dragons, which are affiliated with fire damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = ['sorcerer', 'subclassfeature6', 'fire']; if (classes.known.sorcerer.level >= 6 && What('Class Features Remember').indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "fire"
				},
				"silver dragon ancestor" : {
					name : "Silver Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with silver dragons, which are affiliated with cold damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = ['sorcerer', 'subclassfeature6', 'cold']; if (classes.known.sorcerer.level >= 6 && What('Class Features Remember').indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "cold"
				},
				"white dragon ancestor" : {
					name : "White Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with white dragons, which are affiliated with cold damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					eval : "var ToAdd = ['sorcerer', 'subclassfeature6', 'cold']; if (classes.known.sorcerer.level >= 6 && What('Class Features Remember').indexOf(ToAdd.toString()) === -1) {ClassFeatureOptions(ToAdd)};",
					dragonElement : "cold"
				},
				languageProfs : ["Draconic"]
			},
			"subclassfeature1.1" : {
				name : "Draconic Resilience",
				source : [["SRD", 45], ["P", 102]],
				minlevel : 1,
				description : "\n   " + "When I am not wearing armor, my AC is 13 + Dexterity modifier" + "\n   " + "My hit point maximum increases by an amount equal to my sorcerer level",
				calcChanges : {
					hp : "if (classes.known.sorcerer) {extrahp += classes.known.sorcerer.level; extrastring += '\\n + ' + classes.known.sorcerer.level + ' from Draconic Resilience (Sorcerer)'; }; "
				},
				addarmor : "Draconic Resilience"
			},
			"subclassfeature6" : {
				name : "Elemental Affinity",
				source : [["SRD", 45], ["P", 102]],
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
				eval : "if (FeaChoice === '') {var CFrem = What('Class Features Remember'); var tReg = /.*?sorcerer,subclassfeature1,((black|blue|brass|bronze|copper|gold|green|red|silver|white) dragon ancestor).*/i; if ((tReg).test(CFrem)) {FeaChoice = CurrentClasses.sorcerer.features.subclassfeature1[CFrem.replace(tReg, '$1')].dragonElement; AddString('Class Features Remember', 'sorcerer,subclassfeature6,' + FeaChoice, false);};};"
			},
			"subclassfeature14" : {
				name : "Dragon Wings",
				source : [["SRD", 45], ["P", 103]],
				minlevel : 14,
				description : "\n   " + "As a bonus action, unless armor is in the way, I can sprout dragon wings from my back" + "\n   " + "I gain a fly speed equal to my current speed until I dismiss the wings as a bonus action",
				action : ["bonus action", " (start/stop)"],
				speed : { fly : { spd : "walk", enc : "walk" } }
			},
			"subclassfeature18" : {
				name : "Draconic Presence",
				source : [["SRD", 45], ["P", 103]],
				minlevel : 18,
				description : "\n   " + "As an action, I create 60-ft radius aura of awe/fear for concentration up to 1 minute" + "\n   " + "All hostiles in this aura must make a Wis save or be charmed (awe) or frightened (fear)" + "\n   " + "They make their saves at the beginning of their turns" + "\n   " + "A creature that succeeds on the save is immune to my aura for 24 hours",
				additional : "5 sorcery points",
				action : ["action", ""]
			}
		}
	},
	"warlock-the fiend" : {
		regExpSearch : /^(?=.*(fiend|devil|demon|daemon|hell|abyss))(?=.*warlock).*$/i,
		subname : "the Fiend",
		source : [["SRD", 50], ["P", 109]],
		spellcastingExtra : ["burning hands", "command", "blindness/deafness", "scorching ray", "fireball", "stinking cloud", "fire shield", "wall of fire", "flame strike", "hallow"],
		features : {
			"subclassfeature1" : {
				name : "Dark One's Blessing",
				source : [["SRD", 50], ["P", 109]],
				minlevel : 1,
				description : "\n   " + "When I reduce a hostile to 0 HP, I gain Cha mod + warlock level temporary HP (min 1)"
			},
			"subclassfeature6" : {
				name : "Dark One's Own Luck",
				source : [["SRD", 50], ["P", 109]],
				minlevel : 6,
				description : "\n   " + "When I make an ability check or saving throw, I can add 1d10 after rolling the d20",
				recovery : "short rest",
				usages : 1
			},
			"subclassfeature10" : {
				name : "Fiendish Resilience",
				source : [["SRD", 51], ["P", 109]],
				minlevel : 10,
				description : "\n   " + "After a short or long rest, I can choose one damage type to become resistance to" + "\n   " + "This lasts until I choose another type; Magical and silver weapons ignore this resistance"
			},
			"subclassfeature14" : {
				name : "Hurl Through Hell",
				source : [["SRD", 51], ["P", 109]],
				minlevel : 14,
				description : "\n   " + "When I hit a creature with an attack, I can instantly transport it through lower planes" + "\n   " + "It returns at the end of my next turn and takes 10d10 psychic damage if not a fiend",
				recovery : "long rest",
				usages : 1
			}
		}
	},
	"wizard-evocation" : {
		regExpSearch : /(evocation|evocer|evoker)/i,
		subname : "School of Evocation",
		fullname : "Evoker",
		source : [["SRD", 54], ["P", 117]],
		features : {
			"subclassfeature2" : {
				name : "Evocation Savant",
				source : [["SRD", 54], ["P", 117]],
				minlevel : 2,
				description : "\n   " + "I halve the gp and time needed to copy evocation spells into my spellbook"
			},
			"subclassfeature2.1" : {
				name : "Sculpt Spells",
				source : [["SRD", 54], ["P", 117]],
				minlevel : 2,
				description : "\n   " + "If I cast an evocation spell affecting others I can see, I can protect 1 + the spell's level" + "\n   " + "The chosen automatically succeed on their saving throws vs. the spell" + "\n   " + "They also take no damage if the spell would normally deal half damage on a save"
			},
			"subclassfeature6" : {
				name : "Potent Cantrip",
				source : [["SRD", 54], ["P", 117]],
				minlevel : 6,
				description : "\n   " + "Any cantrips I cast still deal half damage on a successful save"
			},
			"subclassfeature10" : {
				name : "Empowered Evocation",
				source : [["SRD", 54], ["P", 117]],
				minlevel : 10,
				description : "\n   " + "I can add my Int modifier to a single damage roll of any wizard evocation spell I cast"
			},
			"subclassfeature14" : {
				name : "Overchannel",
				source : [["SRD", 54], ["P", 118]],
				minlevel : 14,
				description : "\n   " + "When I cast a 5th-level or lower wizard spell that damages, it can deal max damage" + "\n   " + "Except the first time I do this after a long rest, I suffer 2d12 necrotic dmg per spell lvl" + "\n   " + "Every time I do it after that, before a long rest, I take another 1d12 necrotic damage" + "\n   " + "This necrotic damage surpasses my resistances/immunities; I can't overchannel cantrips",
				recovery : "long rest",
				usagescalc : "event.value = '1 + \u221E';"
			}
		}
	}
};
