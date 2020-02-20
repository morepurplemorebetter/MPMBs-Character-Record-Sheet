/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Class
	Effect:     This script adds the class called "Warmage" and 1 of its subclasses "House of Pawns"
				It also adds 3 of the 12 cantrips introduced by the source: "Magic Daggers", "Force Buckler", and "Force Dart"

				Note that not all subclasses are part of this script, "House of Bishops", "House of Kings", "House of Knights", and "House of Rooks" are missing

				The Complete Warmage was made by Middle Finger of Vecna (Mage Hand Press) and can be found on their website (https://store.magehandpress.com/products/complete-warmage) and Patreon (https://www.patreon.com/posts/complete-warmage-6167353)

				A free version of this class (Warmage Redux) is available on the Middle Finger of Vecna website, but it is slightly different and less complete than the paid versions and the code here (http://mfov.magehandpress.com/2018/01/warmage-redux.html)

				Note that the MFoV Warmage has gone through several iterations. The code here is based on the version from 2018/06/29.

	Code by:	MorePurpleMoreBetter
	Date:		2019-01-30 (sheet v13.0.0beta11)

	Please support the creators of this content (Middle Finger of Vecna) on their Patreon (https://www.patreon.com/mfov) or through their webstore (https://store.magehandpress.com/collections/all)
*/

/*  -IMPORTANT-
	The warmage class gains access to more cantrips than the Spell Selection dialog can handle.
	You will have to select the last 2 cantrips gained at level 18+ using the "Extra Spells" part of the dialog.

	As no multiclassing rules are given in the source, the ones here are an interpretation by MPMB.
*/

var iFileName = "Warmage [MFoV, transcribed by MPMB].js";
RequiredSheetVersion(13);

SourceList["MFoV:CW"] = {
	name : "Middle Finger of Vecna: Complete Warmage",
	abbreviation : "MFoV:CW",
	group : "Middle Finger of Vecna",
	url : "https://www.patreon.com/posts/complete-warmage-6167353",
	date : "2018/06/29"
};

// Get the sheet to know which spells are warmage spells
[
	// Cantrips
	"acid splash", "chill touch", "fire bolt", "light", "mage hand", "mending", "poison spray", "ray of frost", "shillelagh", "shocking grasp", "true strike"
].forEach( function (s) {
	if(SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("warmage") === -1) SpellsList[s].classes.push("warmage");
});

// Create the warmage class
ClassList["warmage"] = {
	regExpSearch : /warmage/i,
	name : "Warmage",
	source : ["MFoV:CW", 1],
	primaryAbility : "Intelligence",
	abilitySave : 4,
	prereqs : "Intelligence 13",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 8,
	saves : ["Con", "Int"],
	skillstxt : {
		primary : "Choose two from Animal Handling, Arcana, Athletics, Acrobatics, History, Investigation, Medicine, Perception, and Survival"
	},
	toolProfs : {
		primary : [["Artisan's tool", 1], ["Musical instrument", 1]]
	},
	armorProfs : {
		primary : [true, false, false, false],
		secondary : [true, false, false, false]
	},
	weaponProfs : {
		primary : [true, false],
		secondary : [true, false]
	},
	equipment : "Warmage starting equipment:\n \u2022 Leather armor, a dagger, and any simple weapon;\n \u2022 A light crossbow and 20 bolts -or- a shortbow and 20 arrows\n \u2022 An explorer's pack -or- a scholar's pack -or- one kit you're proficient in.\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Warmage House", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingKnown : {
		cantrips : levels.map(function(n) { return 2 + Math.ceil(n/2); })
	},
	features : {
		"spellcasting" : {
			name : "Spellcasting",
			source : ["MFoV:CW", 3],
			minlevel : 1,
			description : desc([
				"I can cast warmage cantrips, using Intelligence as my spellcasting ability",
				"I can use an arcane focus as a spellcasting focus",
				"Whenever I gain a warmage level, I can replace a cantrip I know with another"
			]),
			additional : levels.map(function (n) {
				return (2 + Math.ceil(n/2)) + " cantrips known";
			}),
			spellcastingBonus : {
				name : "Cantrips",
				"class" : "warmage",
				level : [0, 0],
				times : levels.map(function (n) { return Math.max(0, Math.ceil(n/2) - 8); })
			}
		},
		"arcane initiation" : {
			name : "Arcane Initiation",
			source : ["MFoV:CW", 3],
			minlevel : 1,
			description : "\n   " + "Choose an Initiation (Sage, Savant, or Scholar) using the \"Choose Feature\" button above",
			choices : ["Sage", "Savant", "Scholar"],
			"sage" : {
				name : "Arcane Initiation: Sage",
				description : desc([
					"I learn Guidance, Light, Sacred Flame, and a 1st-level cleric or druid spell",
					"I can cast the 1st-level spell once per long rest without using a spell slot",
					"These cantrips are not counted towards the number of cantrips I can know"
				]),
				usages : 1,
				recovery : "long rest",
				spellcastingBonus : [{
					name : "Arcane Initiation: Sage",
					spells : ["guidance", "light", "sacred flame"],
					selection : ["guidance", "light", "sacred flame"],
					times : 3
				}, {
					name : "Arcane Initiation: Sage",
					"class" : ["cleric", "druid"],
					level : [1, 1],
					firstCol : "oncelr"
				}]
			},
			"savant" : {
				name : "Arcane Initiation: Savant",
				description : desc([
					"I learn two sorcerer cantrips (not counted towards the number of cantrips I can know)",
					"Additionally, when I roll a critical hit with a cantrips, I can roll an extra damage die"
				]),
				spellcastingBonus : {
					name : "Arcane Initiation: Savant",
					"class" : "sorcerer",
					level : [0, 0],
					times : 2
				}
			},
			"scholar" : {
				name : "Arcane Initiation: Scholar",
				description : desc([
					"I have a spellbook with any two 1st-level spells that have the ritual tag",
					"If I come across spells with the ritual tag, I can transcribe them into my book, as well",
					"I can cast any of these spells in my spellbook as rituals, but not as normal spells",
					"I learn Dancing Lights and Prestidigitation (not counted towards number I can know)"
				]),
				eval : function () {
					CurrentSpells['ritual spellbook'] = {
						name : 'Ritual Spellbook',
						ability : 4,
						list : {class : 'any', ritual : true},
						known : {spells : 'book'}
					};
					SetStringifieds('spells'); CurrentUpdates.types.push('spells');
				},
				removeeval : function() {
					delete CurrentSpells['ritual spellbook'];
					SetStringifieds('spells'); CurrentUpdates.types.push('spells');
				},
				spellcastingBonus : {
					name : "Arcane Initiation: Scholar",
					spells : ["dancing lights", "prestidigitation"],
					selection : ["dancing lights", "prestidigitation"],
					times : 2
				}
			}
		},
		"arcane fighting style" : {
			name : "Arcane Fighting Style",
			source : ["MFoV:CW", 3],
			minlevel : 1,
			description : "\n   " + "Choose an Arcane Fighting Style using the \"Choose Feature\" button above",
			choices : ["Blaster", "Deflector", "Resistive", "Sniper", "Striker"],
			"blaster" : {
				name : "Arcane Blaster Fighting Style",
				description : "\n   " + "My warmage spell save DC increases by 2",
				calcChanges : {
					spellCalc : [
						function (type, spellcasters, ability) {
							if (type == "dc" && spellcasters.indexOf("warmage") !== -1) return 1;
						},
						"My warmage spell gain a +2 bonus on their save DC"
					]
				}
			},
			"deflector" : {
				name : "Arcane Deflector Fighting Style",
				description : desc([
					"As a reaction if targeted by spell attack or ranged weapon attack, I can increase my AC",
					"The bonus to my AC is equal to my Proficiency Bonus and can cause the attack to miss"
				]),
				action : ["reaction", ""]
			},
			"resistive" : {
				name : "Resistive Arcane Fighting Style",
				description : "\n   " + "I gain +1 AC while wearing light or medium armor, or under the effects of Mage Armor",
				extraAC : [{
					mod : 1,
					name : "Resistive Fighting Style",
					text : "I gain a +1 bonus AC while I'm wearing light or medium armor, or I'm under the effects of a Mage Armor spell.",
					stopeval : function (v) {
						return (!v.wearingArmor || v.heavyArmor) && !(/^mage armou?r$/).test(CurrentArmour.known);
					}
				}]
			},
			"sniper" : {
				name : "Arcane Sniper Fighting Style",
				description : "\n   " + "I gain +2 bonus to attack rolls I make with ranged spell attacks",
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (v.isSpell && (/^(?!.*melee).*\d+.*$/i).test(fields.Range)) {
								output.extraHit += 2;
							};
						},
						"My ranged spell attacks get a +2 bonus on the To Hit."
					]
				}
			},
			"striker" : {
				name : "Arcane Striker Fighting Style",
				description : "\n   " + "Reroll 1 or 2 on damage die when making melee spell attack with a warmage cantrip"
			}
		},
		"warmage edge" : {
			name : "Warmage Edge",
			source : ["MFoV:CW", 4],
			minlevel : 2,
			description : "\n   " + "Once per turn when I deal damage with a warmage spell, I can have it do extra damage",
			usages : 1,
			recovery : " Turn",
			additional : levels.map(function (n) {
				return "+Int mod +" + Math.ceil(n/2) + " damage";
			})
		},
		"warmage trick" : {
			name : "Warmage Trick",
			source : ["MFoV:CW", 4],
			minlevel : 2,
			description : desc([
				"Use the \"Choose Feature\" button above to add Warmage Tricks to the third page",
				"Whenever I gain a warmage level, I can replace a trick I know with another"
			]),
			additional : levels.map(function (n) {
				return (n < 2 ? "" : n < 5 ? 2 : n < 9 ? 4 : n < 13 ? 6 : n < 17 ? 8 : 10) + " tricks known";
			}),
			extraname : "Warmage Trick",
			extrachoices : ["Blinding Light (prereq: Light cantrip)", "Charged Blade (prereq: Shillelagh cantrip)", "Extended Range", "Flexible Range", "Mystical Armor", "Mystical Vision", "Pawn Storm (prereq: House of Pawns)", "Rapid Fortification (prereq: Mending cantrip)", "Blasting Cantrip (prereq: level 5 warmage, Force Dart or Mystical Blade cantrip)", "Caustic Cantrip (prereq: level 5 warmage, Acid Splash or Acidic Blade cantrip)", "Electrified Cantrip (prereq: level 5 warmage, Shocking Grasp or Storming Blade cantrip)", "Entropic Cantrip (prereq: level 5 warmage, Chill Touch cantrip)", "Explosive Cantrip (prereq: level 5 warmage, Fire Bolt or Molten Blade cantrip)", "Frigid Cantrip (prereq: level 5 warmage, Glacial Blade or Ray of Frost cantrip)", "Improved Martial Training (prereq: level 5 warmage, House of Kings or House of Knights or House of Pawns)", "Promotion (prereq: level 5 warmage, House of Pawns)", "Select Fire (prereq: level 5 warmage)", "Skilled Hand (prereq: level 5 warmage, Mage Hand cantrip)", "Venomous Cantrip (prereq: level 5 warmage, Poison Spray cantrip)", "Flurry of Daggers (prereq: level 10 warmage, Magic Daggers cantrip)", "Pawn's Sacrifice (prereq: level 10 warmage, House of Pawns)", "Unerring Strike (prereq: level 10 warmage, True Strike cantrip)"],
			// the above excludes tricks that have prereqs that are not in this script (houses/cantrips):
			// "Bishop's Blessing (prereq: House of Bishops)", "Cloak of Feathers (prereq: House of Rooks)", "Commander's Call (prereq: House of Kings)", "Field Medic (prereq: House of Bishops)", "Knight's Ward (prereq: House of Knights)", "Mystical Athlete (prereq: Quickstep and Springheel cantrips)", "Phantom Hookshot (prereq: Phantom Grapnel cantrip)", "Booming Cantrip (prereq: level 5 warmage, Thundering Blade cantrip)", "Commander's Steed (prereq: level 5 warmage, House of Kings or House of Knights)", "Mystical Weaponmaster (prereq: level 5 warmage, Magic Daggers cantrip, Mystical Blade cantrip)", "Rook's Perch (prereq: level 5 warmage, House of Rooks)", "Bishop's Maneuver (prereq: level 10 warmage, House of Bishops)", "Castle (prereq: level 10 warmage, House of Rooks)", "King's Tactics (prereq: level 10 warmage, House of Kings)", "Knight's Shield (prereq: level 10 warmage, House of Knights, Force Buckler cantrip)"
			"blinding light (prereq: light cantrip)" : {
				name : "Blinding Light",
				source : ["MFoV:CW", 9],
				description : desc([
					"When I cast Light on an object I'm holding, I can have a flare shoot out to a target in 10 ft",
					"It must succeed on a Con save or be blinded until the start of my next turn"
				]),
				prereqeval : function(v) { return isSpellUsed('light', true); }
			},
			"charged blade (prereq: shillelagh cantrip)" : {
				name : "Charged Blade",
				source : ["MFoV:CW", 9],
				description : desc([
					"I can cast Shillelagh on any weapon and its duration increases to 24 hours"
				]),
				prereqeval : function(v) { return isSpellUsed('shillelagh', true); }
			},
/* 			"cloak of feathers (prereq: house of rooks)" : {
				name : "Cloak of Feathers",
				source : ["MFoV:CW", 9],
				description : desc([
					"Without armor and no shield, my AC is 10 + Dexterity modifier + Intelligence modifier"
				]),
				prereqeval : function(v) { return (/rooks/i).test(classes.known.warmage.subclass); },
				armorAdd : "Unarmored Defense (Int)"
			}, */
			"extended range" : {
				name : "Extended Range",
				source : ["MFoV:CW", 9],
				description : desc([
					"I double the range of my warmage cantrips that require a ranged spell attack"
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (!v.isDC && v.isSpell && v.thisWeapon[4].indexOf('warmage') !== -1 && (/\d+ ?(f.{0,2}t|m)/i).test(fields.Range)) {
								var rangeNmbr = fields.Range.match(/\d+(\.\d+|,\d+)?/g);
								var notNmbrs = fields.Range.split(RegExp(rangeNmbr.join('|')));
								fields.Range = '';
								rangeNmbr.forEach(function (dR, idx) {
									fields.Range += (notNmbrs[idx] ? notNmbrs[idx] : '') + (parseFloat(dR.toString().replace(',', '.') * 2));
								});
								if (notNmbrs.length > rangeNmbr.length) {
									fields.Range += notNmbrs[notNmbrs.length - 1];
								};
							};
						},
						"My warmage cantrips that require a ranged attack roll, have their range doubled."
					]
				}
			},
			"flexible range" : {
				name : "Flexible Range",
				source : ["MFoV:CW", 9],
				description : desc([
					"My warmage cantrips that require a ranged spell attack can now also be used in melee",
					"Similarly, those that are normally only melee can now be used with a range of 30 ft"
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (!v.isDC && v.isSpell && v.thisWeapon[4].indexOf('warmage') !== -1) {
								if ((/^(?!.*melee).*\d+ ?(f.{0,2}t|m).*$/i).test(fields.Range)) {
									fields.Range = 'Melee, ' + fields.Range;
								} else if ((/^(?!.*\d)(?=.*melee).*$/i).test(fields.Range)) {
									fields.Range = fields.Range + ', 30 ft';
								}
							};
						},
						"My warmage cantrips that require a ranged spell attack roll, can also be used with as a melee spell attack. warmage cantrips that require a melee spell attack roll, can also be used with as a ranged spell attack with a range of 30 ft."
					]
				}
			},
			"mystical armor" : {
				name : "Mystical Armor",
				source : ["MFoV:CW", 9],
				description : "\n   " + "I can cast Mage Armor at will, without using a spell slot",
				spellcastingBonus : {
					name : "Mystical Armor",
					spells : ["mage armor"],
					selection : ["mage armor"],
					firstCol : "atwill"
				}
			},
			"mystical vision" : {
				name : "Mystical Vision",
				source : ["MFoV:CW", 9],
				description : "\n   " + "I can cast Detect Magic at will, without using a spell slot",
				spellcastingBonus : {
					name : "Mystical Vision",
					spells : ["detect magic"],
					selection : ["detect magic"],
					firstCol : "atwill"
				}
			},
			"pawn storm (prereq: house of pawns)" : {
				name : "Pawn Storm",
				source : ["MFoV:CW", 9],
				description : "\n   " + "I gain +10 ft speed and double my speed on the first round of combat",
				prereqeval : function(v) { return (/pawns/i).test(classes.known.warmage.subclass); },
				speed : { allModes : "+10" }
			},
			"rapid fortification (prereq: mending cantrip)" : {
				name : "Rapid Fortification",
				source : ["MFoV:CW", 10],
				description : desc([
					"I can cast Mending as a bonus action or I can cast it as an action to do one of the following:",
					" \u2022 Restore a single object up to 1 cu. ft to pristine condition, even if parts are missing",
					" \u2022 Use present materials to make simple fortification up to 5 sq. ft (e.g. planks on window)"
				]),
				prereqeval : function(v) { return isSpellUsed('mending', true); }
			},
			"blasting cantrip (prereq: level 5 warmage, force dart or mystical blade cantrip)" : {
				name : "Blasting Cantrip",
				source : ["MFoV:CW", 10],
				description : desc([
					"Creatures dealt force damage by my warmage cantrips are pushed 10 ft away from me"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 5 && (isSpellUsed('force dart', true) || isSpellUsed('mystical blade', true)); }
			},
/* 			"booming cantrip (prereq: level 5 warmage, thundering blade cantrip)" : {
				name : "Booming Cantrip",
				source : ["MFoV:CW", 10],
				description : desc([
					"Once per turn when a creature takes thunder damage from my warmage cantrip,",
					"I can have it make a Strength save or be knocked prone"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 5 && isSpellUsed('thundering blade', true); }
			}, */
			"caustic cantrip (prereq: level 5 warmage, acid splash or acidic blade cantrip)" : {
				name : "Caustic Cantrip",
				source : ["MFoV:CW", 10],
				description : desc([
					"When a creature takes acid damage from my warmage cantrip, it must make a Dex save",
					"If failed, it takes half damage again at the start of its next turn; Doesn't stack with itself"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 5 && (isSpellUsed('acid splash', true) || isSpellUsed('acidic blade', true)); }
			},
			"electrified cantrip (prereq: level 5 warmage, shocking grasp or storming blade cantrip)" : {
				name : "Electrified Cantrip",
				source : ["MFoV:CW", 10],
				description : desc([
					"When a creature takes lightning damage from my warmage cantrip, I can have it save",
					"If it fails a Constitution save it is stunned until the start of my next turn"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 5 && (isSpellUsed('shocking grasp', true) || isSpellUsed('storming blade', true)); },
				usages : "Intelligence modifier per ",
				usagescalc : "event.value = Math.max(1, What('Int Mod'));",
				recovery : "long rest"
			},
			"entropic cantrip (prereq: level 5 warmage, chill touch cantrip)" : {
				name : "Entropic Cantrip",
				source : ["MFoV:CW", 10],
				description : desc([
					"When a creature takes necrotic damage from my warmage cantrip, I can have it save",
					"If it fails a Con save it suffers one level of exhaustion; This can't affect same creature twice"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 5 && isSpellUsed('chill touch', true); }
			},
			"explosive cantrip (prereq: level 5 warmage, fire bolt or molten blade cantrip)" : {
				name : "Explosive Cantrip",
				source : ["MFoV:CW", 10],
				description : desc([
					"When a creature takes fire damage from my warmage cantrip, I can create an explosion",
					"All within 5 ft of the target, excluding myself and the target, must make a Dex save",
					"If failed, they take half the initial damage; Can only affect the same creature once per turn"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 5 && (isSpellUsed('fire bolt', true) || isSpellUsed('molten blade', true)); }
			},
			"frigid cantrip (prereq: level 5 warmage, glacial blade or ray of frost cantrip)" : {
				name : "Frigid Cantrip",
				source : ["MFoV:CW", 10],
				description : desc([
					"When a creature takes cold damage from my warmage cantrip, it must make a Con save",
					"If failed, it can't make more than one attack until the start of my next turn"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 5 && (isSpellUsed('ray of frost', true) || isSpellUsed('glacial blade', true)); }
			},
			"improved martial training (prereq: level 5 warmage, house of kings or house of knights or house of pawns)" : {
				name : "Improved Martial Training",
				source : ["MFoV:CW", 10],
				description : desc([
					"I can attack twice, instead of once, as part of the Attack action"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 5 && (/kings|knights|pawns/i).test(classes.known.warmage.subclass); }
			},
			"promotion (prereq: level 5 warmage, house of pawns)" : {
				name : "Promotion",
				source : ["MFoV:CW", 11],
				description : desc([
					"I select a warmage house other than my own; I can now learn tricks requiring that house"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 5 && (/pawns/i).test(classes.known.warmage.subclass); }
			},
/* 			"rook's perch (prereq: level 5 warmage, house of rooks)" : {
				name : "Rook's Perch",
				source : ["MFoV:CW", 11],
				description : "\n   " + "I gain +10 ft speed and a climbing speed equal to my walking speed",
				prereqeval : function(v) { return (/rooks/i).test(classes.known.warmage.subclass); },
				speed : {
					allModes : "+10",
					climb : { spd : "walk", enc : "walk" }
				}
			}, */
			"select fire (prereq: level 5 warmage)" : {
				name : "Select Fire",
				source : ["MFoV:CW", 11],
				description : desc([
					"When I cast a warmage cantrip that requires a spell attack, I can target multiple creatures",
					"I can target a separate creature for each damage die of the spell, rolling to hit for each"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 5; }
			},
			"skilled hand (prereq: level 5 warmage, mage hand cantrip)" : {
				name : "Skilled Hand",
				source : ["MFoV:CW", 11],
				description : desc([
					"I can use my Mage Hand to hold a weapon that is not heavy and that I'm proficient with",
					"I need my hands free as if using the weapon myself; It uses my Int instead of Str/Dex",
					"I can move the hand 30 ft on my turn, as long as it stays within range of the cantrip",
					"When I take the Attack action, I can forgo one or more attack to allow the hand to attack",
					"If I forgo all my attacks of the turn, I can have it make a bonus attack as a bonus action"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 5 && isSpellUsed('mage hand', true); }
			},
			"venomous cantrip (prereq: level 5 warmage, poison spray cantrip)" : {
				name : "Venomous Cantrip",
				source : ["MFoV:CW", 11],
				description : desc([
					"When a creature takes poison damage from my warmage cantrip, I can have it save",
					"On a failed Constitution saving throw it is poisoned until the start of my next turn"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 5 && isSpellUsed('poison spray', true); },
				usages : "Intelligence modifier per ",
				usagescalc : "event.value = Math.max(1, What('Int Mod'));",
				recovery : "long rest"
			},
			"flurry of daggers (prereq: level 10 warmage, magic daggers cantrip)" : {
				name : "Flurry of Daggers",
				source : ["MFoV:CW", 11],
				description : desc([
					"I can throw one extra weapon when I attack with weapons summoned by Magic Daggers"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 10 && isSpellUsed('magic daggers', true); }
			},
			"pawn's sacrifice (prereq: level 10 warmage, house of pawns)" : {
				name : "Pawn's Sacrifice",
				source : ["MFoV:CW", 11],
				description : desc([
					"As a reaction when a creature within 30 ft is hit by an attack, I can move next to it",
					"After I move, I become the target of that attack, potentially causing the attack to miss"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 10 && (/pawns/i).test(classes.known.warmage.subclass); },
				action : ["reaction", ""],
				usages : 1,
				recovery : "short rest"
			},
			"unerring strike (prereq: level 10 warmage, true strike cantrip)" : {
				name : "Unerring Strike",
				source : ["MFoV:CW", 11],
				description : desc([
					"When I cast True Strike, I can keep concentrating even after making the attack",
					"I get advantage on my first attack on the target each round while concentrating",
					"This way, I can only maintain concentration a number of rounds equal to my Int mod"
				]),
				prereqeval : function(v) { return classes.known.warmage.level >= 10 && isSpellUsed('true strike', true); }
			}
		},
		"subclassfeature3" : {
			name : "Warmage House",
			source : ["MFoV:CW", 4],
			minlevel : 3,
			description : desc([
				"Choose a Warmage House to which you belong and put it in the \"Class\" field",
				"Choose either the House of Pawns, or the House of Rooks"
			])
		},
		"warmage tactics" : {
			name : "Warmage Tactics",
			source : ["MFoV:CW", 4],
			minlevel : 6,
			description : "\n   " + "I can add my Intelligence modifier to all my saves against magic that deals damage",
			savetxt : { text : ["Add Int mod to saves vs. damage magic"] }
		},
		"warmage surge" : {
			name : "Warmage Surge",
			source : ["MFoV:CW", 4],
			minlevel : 11,
			description : "\n   " + "When I deal damage with a warmage cantrip on my turn, I can double that damage",
			usages : levels.map(function (n) {
				return n < 14 ? "" : n < 20 ? 1 : 3;
			}),
			recovery : "short rest"
		},
		"warmage eye" : {
			name : "Warmage Eye",
			source : ["MFoV:CW", 4],
			minlevel : 14,
			description : desc([
				"I can add my Intelligence modifier to all Perception checks that rely on sight",
				"My ranged attacks ignore half and three-quarter cover"
			]),
			vision : [["+Int mod to sight-based Perception"]],
			addMod : { type : "skill", field : "Perc", mod : "max(Int|0)", text : "I can add my Intelligence modifier to all Wisdom (Perception) checks that rely on sight." }
		},
		"master warmage" : {
			name : "Master Warmage",
			source : ["MFoV:CW", 4],
			minlevel : 20,
			description : " [use Warmage Surge 3\u00D7 between rests]"
		}
	}
};

// Add the subclasses
AddSubClass("warmage", "pawns", {
	regExpSearch : /^(?=.*warmage)(?=.*pawns?).*$/i,
	subname : "House of Pawns",
	source : ["MFoV:CW", 5],
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiencies",
			source : ["MFoV:CW", 7],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with medium armor, heavy armor, and shields",
			armorProfs : [false, true, true, true]
		},
		"subclassfeature3.1" : {
			name : "Fortress Defense",
			source : ["MFoV:CW", 7],
			minlevel : 3,
			description : desc([
				"As an action, I make a translucent wall of force (Int mod panels of 5'×4'×1/4\") in 15 ft",
				"The wall blocks movement, grants cover, and lasts for 1 minute or until I dismiss it",
				"7th level: creatures behind wall can't move involuntarily; 18th level: double panels/range"
			]),
			additional : levels.map(function (n) {
				return n < 3 ? "" : (n < 10 ? "1/2" : "3/4") + " cover";
			}),
			usages : levels.map(function (n) {
				return n < 3 ? "" : n < 15 ? 1 : 2;
			}),
			recovery : "short rest",
			action : ["action", ""]
		},
		"subclassfeature7" : {
			name : "Defensive Casting",
			source : ["MFoV:CW", 8],
			minlevel : 7,
			description : desc([
				"I can perform somatic components even with weapons or a shield in one or both hands",
				"When a creature provokes an opportunity attack from me, I can cast a cantrip instead",
				"This uses my reaction as normal and the cantrip can only target the provoking creature"
			]),
			action : ["reaction", ""]
		},
		"subclassfeature10" : {
			name : "Fighting Style",
			source : ["MFoV:CW", 8],
			minlevel : 1,
			description : "\n   " + "Choose a Fighting Style for using the \"Choose Feature\" button above",
			choices : ["Defense", "Protection",],
			"defense" : FightingStyles.defense,
			"protection" : FightingStyles.protection
		},
		"subclassfeature15" : {
			name : "En Passant",
			source : ["MFoV:CW", 8],
			minlevel : 15,
			description : desc([
				"As a bonus action after a melee attack (weapon/cantrip), I can do the Shove action",
				"I gain adv. on the shove if moving 10 ft in a straight line before making the attack roll"
			]),
			action : ["bonus action", " (with attack/cantrip)"]
		},
		"subclassfeature18" : {
			name : "Impenetrable Fortress Defense",
			source : ["MFoV:CW", 8],
			minlevel : 18,
			description : desc([
				"I know the Wall of Fire, Wall of Force, Wall of Ice, and Wall of Stone spells",
				"I can cast these spells each once per long rest without needing to use a spell slot"
			]),
			spellcastingBonus : {
				name : "Impenetrable Fortress Defense",
				spells : ["wall of fire", "wall of force", "wall of ice", "wall of stone"],
				selection : ["wall of fire", "wall of force", "wall of ice", "wall of stone"],
				firstCol : "oncelr",
				times : 4
			}
		}
	}
});

// New cantrips
SpellsList["force buckler"] = {
	name : "Force Buckler",
	classes : ["warmage", "bard", "sorcerer", "warlock", "wizard"],
	source : ["MFoV:CW", 15],
	level : 0,
	school : "Abjur",
	time : "1 a",
	range : "Self",
	components : "V,S,M\u0192",
	compMaterial : "A specially prepared gauntlet worth at least 5 gp)",
	duration : "1 min",
	description : "Translucent shield of force gives +2 AC while one hand is free and not already wielding a shield (5gp)",
	descriptionFull : "You summon a translucent, yet visible, field of force which appears about you like a shield. For the duration of the spell, as long as you have one hand free and you are not wielding a shield, you gain +2 to your AC. The spell ends immediately if neither of your hands are free."
};
SpellsList["force dart"] = {
	name : "Force Dart",
	classes : ["warmage", "bard", "sorcerer", "warlock", "wizard"],
	source : ["MFoV:CW", 15],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Spell attack for 1d10 Force dmg; +1d10 at CL 5, 11, and 17",
	descriptionFull : "You fling a dart of magical force at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage." + "\n   " + "This spell's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10)."
};
SpellsList["magic daggers"] = {
	name : "Magic Daggers",
	classes : ["warmage", "bard", "sorcerer", "warlock", "wizard"],
	source : ["MFoV:CW", 16],
	level : 0,
	school : "Conj",
	time : "1 a",
	range : "Self",
	components : "V,S",
	duration : "1 min",
	description : "Summon 2\u00D7 spellcast. mod wea; 1a throw, 1d6 dmg of weapon type; +1 throw as 1a at CL 5, 11, 17",
	descriptionFull : "With a flourish, you summon a number of throwing weapons equal to twice your spellcasting modifier. These weapons can be of any type: daggers, handaxes, sling bullets, darts, etc. For the duration of the spell, the summoned weapons float within easy reach, allowing you to grab and throw them with ease. As an action, you can throw one weapon as a ranged spell attack with a range of 60 feet. On a hit, the weapon deals 1d6 magical piercing, slashing, or bludgeoning damage, as appropriate to the weapon thrown. After one attack, the weapon vanishes." + AtHigherLevels + "You can make more attacks with your weapons. At 5th level, you can make two attacks, at 11th level, three attacks, and at 17th level, four attacks."
};

// Attack entries for the cantrips
WeaponsList["force dart"] = {
	regExpSearch : /^(?=.*force)(?=.*dart).*$/i,
	name : "Force Dart",
	source : ["MFoV:CW", 15],
	list : "spell",
	ability : 6,
	type : "Cantrip",
	damage : ["C", 10, "Force"],
	range : "60 ft",
	description : "(MFoV:CW 15)",
	abilitytodamage : false
};
WeaponsList["magic daggers"] = {
	regExpSearch : /^(?=.*magic)(?=.*daggers).*$/i,
	name : "Magic Daggers",
	source : ["MFoV:CW", 16],
	list : "spell",
	ability : 6,
	type : "Cantrip",
	damage : [1, 6, "Piercing"],
	range : "60 ft",
	description : "Damage type can vary; Multiple attacks at higher casting level CL5: 2, CL11: 3, CL17: 4 (MFoV:CW 16)",
	abilitytodamage : false
};
