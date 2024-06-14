/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Class
	Effect:     This script adds the class called "Elementalist" and its 4 subclasses
				The villainous "Shadow" subclass is not included

				This class was produced by 2CGaming as part of their Epic Legacy Campaign Codex
				It can be found here: https://store.2cgaming.com/products/epic-legacy-campaign-codex-pdf
				It is the result of this kickstarter: https://www.kickstarter.com/projects/2cgaming/epic-legacy-campaign-codex-5th-edition-beyond-20th-level
				This code is based on an excerpt of that book, produced 2021-02-12

	Code by:	MorePurpleMoreBetter
	Date:		2024-03-04 (sheet v13.1.13)
*/

var iFileName = "Elementalist [2CGaming's work, transcribed by MPMB].js";
RequiredSheetVersion('13.1.14');

SourceList["ELCC"] = {
	name : "Epic Legacy Campaign Codex",
	abbreviation : "ELCC",
	abbreviationSpellsheet : "EL",
	group : "2CGaming",
	url : "https://store.2cgaming.com/products/epic-legacy-campaign-codex-pdf",
	date : "2021/02/12"
};

// Change the below variable if you want to change the main ability used by the class
// 1 = Str, 2 = Dex, 3 = Con, 4 = Int, 5 = Wis, 6 = Cha
var elementalistAbility = 4; // default is Intelligence

// Don't change the below variables, they use the above to get the full name and abbreviation
var elementalistAbilityFull = AbilityScores.names[ elementalistAbility - 1 ];
var elementalistAbilityAbbr = AbilityScores.abbreviations[ elementalistAbility - 1 ];

// The default saves besides the spellcasting ability is "Con", but if the spellcasting abilities is set to another *strong* save (i.e. Dex, Con, or Wis), we make the secondary save "Int"
var otherSave = elementalistAbility === 2 || elementalistAbility === 3 || elementalistAbility === 5 ? "Int" : "Con";

ClassList["elementalist"] = {
	regExpSearch : /elementalist/i,
	name : "Elementalist",
	source : [["ELCC", 84]],
	primaryAbility : elementalistAbilityFull,
	prereqs : "Can't multiclass",
	abilitySave : elementalistAbility,
	die : 6,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : [otherSave, elementalistAbilityAbbr], // Default will result in ["Con", "Int"]
	skillstxt : {
		primary : "Choose two from Investigation, History, Medicine, Nature, Perception, and Persuasion"
	},
	weaponProfs : {
		primary : [true, false]
	},
	equipment : "Elementalist starting equipment:" +
		"\n \u2022 A light crossbow and 20 bolts -or- any simple weapon" +
		"\n \u2022 A small fragment of a pure element, contained in a glass bottle" +
		"\n \u2022 A dungeoneer's pack -or- an explorer's pack" +
		"\n \u2022 A quarterstaff" +
		"\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Elemental Affinity", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : "elementalist0",
	spellcastingKnown : {
		spells : levels.map(function (n) { return n < 3 ? 2 : n < 5 ? 3 : n < 7 ? 4 : n < 9 ? 5 : n < 11 ? 6 : n < 13 ? 7 : n < 15 ? 8 : n < 17 ? 9 : 10; })
	},
	features : {
		"nexus of power" : {
			name : "Nexus of Power",
			source : [["ELCC", 86]],
			minlevel : 1,
			description : levels.map(function (n) {
				var shapes = {
					basic :    n <  3 ? 2 : n < 15 ? 3 : 4,
					advanced : n <  5 ? 0 : n <  7 ? 1 : n < 17 ? 2 : 3,
					expert :   n <  9 ? 0 : n < 11 ? 1 : 2,
					master :   n < 13 ? 0 : 1,
				}
				var arrShapes = [];
				for (var shape in shapes) {
					if (shapes[shape]) arrShapes.push(shapes[shape] + " " + shape);
				}
				var arrTxt = [
					"I can create elemental shapes that I know, using " + elementalistAbilityFull + " as my shaping ability",
					"Elemental shapes known:\t" + arrShapes.join(",\t"),
					"The range of my shapes is my area of elemental influence, it increases with level and Con",
					"If I create another of the same shape, the previous one immediately ends",
					"As an action, I can dismiss any shape I have created; My shapes end if I fall unconscious"
				];
				return desc(arrTxt);
			}),
			additional : levels.map(function (n) {
				return "range of influence: 30 ft + " + (Math.floor(n * 2 / 10) * 10 + 10) + " ft \xD7 Con mod";
			}),
			calcChanges : {
				spellList : [
					function(spList, spName, spType) {
						// Schedule a function call for after the spell sheet has been generated
						if (!CurrentSpells.elementalist.timeout) {
							CurrentSpells.elementalist.timeout = app.setTimeOut("ClassList.elementalist.changeSpellHeaders();", 10000);
						}
						// Set the dependencies of the elemental shapes to match subclass, if not done so already
						if ( spName !== 'elementalist' || !classes.known.elementalist || !classes.known.elementalist.subclass || classes.known.elementalist.spellsDepSet === classes.known.elementalist.subclass ) return;
						// Loop through all spells and add any found dependencies
						var elType = classes.known.elementalist.subclass.replace("elementalist", "");
						var elName = "\n \u2022 " + toUni(ClassSubList[classes.known.elementalist.subclass].subname) + ": ";
						for ( sSpell in SpellsList ) {
							var oSpell = SpellsList[sSpell];
							var oSpellDep = SpellsList[sSpell + elType];
							if ( oSpell.elementalShape && oSpell.dependencies && oSpellDep ) {
								oSpell.dependencies = [sSpell + elType];
								if (oSpell.elementalDesc && oSpellDep.elementalDesc) {
									oSpell.descriptionFull = oSpell.elementalDesc.replace(AugmentES, elName + oSpellDep.elementalDesc + AugmentES);
									oSpellDep.descriptionFull = oSpell.descriptionFull;
								}
							}
						}
						// Store the fact that this is done so it is not run until needed
						classes.known.elementalist.spellsDepSet = classes.known.elementalist.subclass;
					},
					"Wait a bit after spell sheet generation, as the spell level headers will be replaced with the elemental shape tier names."
				],
				spellAdd : [
					function (spellKey, spellObj, spName, isDuplicate) {
						if (spellObj.rangeInfluence && classes.known.elementalist) {
							// Set the range of a shape (unless it is a sub-shape)
							var conMod = Number(What("Con Mod"));
							var elemLvl = classes.known.elementalist.level;
							var bonusRange = Math.floor(elemLvl * 2 / 10) * 10 + 10;
							var shapeRange = (30 + bonusRange * conMod) + " ft";
							spellObj.range = What("Unit System") != "metric" ? shapeRange : ConvertToMetric(shapeRange, 0.5);
							if (spellObj.rangeInfluenceFormat) {
								spellObj.range = spellObj.rangeInfluenceFormat.replace("RANGELINE", spellObj.range.replace(" ", typePF ? "-" : "")).replace("RANGEHYPHEN", spellObj.range.replace(" ", "-")).replace("RANGE", spellObj.range);
							}
							return true;
						}
					},
					"The range of elemental shapes is filled out when generating the spell sheet, as it is determined by my elementalist level and Constitution modifier. A change of Constitution modifier will require regenerating the spell sheets!"
				]
			}
		},
		"primordial energy" : {
			name : "Primordial Energy",
			source : [["ELCC", 88]],
			minlevel : 1,
			description : desc("I expend primal power to create my elemental shapes; I can't have more PP than listed"),
			usages : [4, 6, 14, 17, 27, 32, 38, 44, 57, 64, 73, 73, 83, 83, 94, 94, 107, 114, 123, 133],
			recovery : "long rest",
			limfeaname : "Primal Power",
			spellFirstColTitle : "PP"
		},
		"subclassfeature1" : {
			name : "Elemental Affinity",
			source : [["ELCC", 86]],
			minlevel : 1,
			description : desc('Choose the elemental you have affinity with and put it in the "Class" field')
		},
		"elemental empowerment" : {
			name : "Elemental Empowerment",
			source : [["ELCC", 88]],
			minlevel : 3,
			description : desc([
				"At the start of my turn, I can choose to expend all my movement to empower myself",
				"If I create a shape while empowered, I can expend extra primal power to augment it",
				"I'm empowered until my next turn starts; I can expend my level in primal power at once"
			]),
			additional : levels.map(function (n) {
				return n < 3 ? "" : "Max " + n + " primal power at once";
			})
		},
		"elemental allies" : {
			name : "Elemental Allies",
			source : [["ELCC", 88]],
			minlevel : 7,
			description : desc([
				"I can expend 9 primal power to cast Conjure Minor Elementals without components",
				"I can augment it: per 4 extra primal power its level increases by 2 (max PP applies)"
			]),
			spellcastingBonus : [{
				name : "Elemental Allies",
				spells : ["conjure minor elementals"],
				selection : ["conjure minor elementals"],
				firstCol : 9
			}],
			spellChanges : {
				"conjure minor elementals" : {
					components : "",
					description : "Create 2+2/4PP CR of associated elementals; obey my verbal commands",
					changes : "Using Elemental Allies, I can expend 9 Primal Power to cast Conjure Minor Elementals without requiring components. The elementals created have to be associated with my elemental affinity.\n   If I'm empowered when I do this, I can expend additional primal power to augment the spell. Per 4 extra primal power so expended, its spell level increases by 2."
				}
			}
		},
		"mind over matter" : {
			name : "Mind over Matter",
			source : [["ELCC", 89]],
			minlevel : 20,
			description : desc([
				"When I create a shape that lasts 1 min or longer, I can choose to concentrate on it",
				"The shape will then persists for as long as I maintain concentration on it"
			])
		}
	},
	changeSpellHeaders : function() {
		// This function will change the headers on the spell sheet for the Elementalist to the right tier of shapes.
		if ( isTemplVis("SSfront") ) {
			var shapeTier = {
				"2" : "Basic Elemental Shapes",
				"4" : "Advanced Elemental Shapes",
				"6" : "Expert Elemental Shapes",
				"8" : "Master Elemental Shapes"
			}
			// Get array of prefixes of the spell sheets
			var aSpellSheets = What("Template.extras.SSmore").split(",");
			aSpellSheets[0] = What("Template.extras.SSfront").split(",")[1];
			// See if the topmost header is for the elementalist
			var elementalistFound = What(aSpellSheets[0] + "spellshead.class.0") === "elementalist";
			if (elementalistFound) {
				// We already need to alter the first divider, which is built-in
				var firstDivFld = aSpellSheets[0] + "spellsdiv.Text.0";
				var firstDivVal = What(firstDivFld).match(/\d+/);
				if (firstDivVal && shapeTier[firstDivVal]) Value(firstDivFld, shapeTier[firstDivVal]);
			}
			loopSS:
			for (var ss = 0; ss < aSpellSheets.length; ss++) {
				var prefix = aSpellSheets[ss];
				var maxLine = FieldNumbers.spells[ss === 0 ? 0 : 1];
				loopI:
				for (var i = 0; i <= maxLine; i++) {
					var val = What(prefix + "spells.remember." + i).split('##');
					if (val[0] === "setdivider" && elementalistFound) {
						var divLevel  = val[1];
						var divSuffix = val[2];
						if (shapeTier[divLevel]) Value(prefix + "spellsdiv.Text." + divSuffix, shapeTier[divLevel]);
					} else if (val[0] === "setheader") {
						if (!elementalistFound && val[1] === "elementalist") {
							elementalistFound = true;
						} else if (elementalistFound && val[1] !== "elementalist") {
							// reached the end of the elementalist spells
							break loopSS;
						}
					}
				}
			}
		}
		CurrentSpells.elementalist.timeout = false;
	}
}

// The hybrid class features, as they are used multiple times
var elementalistHybrid = {
	"ice" : {
		"subclassfeature10" : {
			name : "Ice Elementalism",
			source : [["ELCC", 92]],
			description : desc([
				"I can swap the damage my shapes do to cold damage instead of their normal damage",
				"I'm immune to cold damage"
			]),
			savetxt : { immune : ["cold"] }
		},
		"subclassfeature14" : {
			name : "Ice Age",
			source : [["ELCC", 92]],
			description : desc([
				"As an action, I can fill my area of elemental influence with freezing fog",
				"Therein the temp. is extreme cold, its lightly obscured, and normal fires are extinguished",
				"The fog lasts for 4 hours inside my area of influence; I can dismiss it as an action"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		},
		"subclassfeature18" : {
			name : "Frozen Doom",
			source : [["ELCC", 92]],
			description : desc([
				"As a reaction when a creature I can see fails a save against my shape, I can freeze it solid",
				"To do so, I have to expend 5 primal power and it must make a Constitution save",
				"If failed, it is paralyzed until it takes fire damage or is exposed to over 32°F for 1 hour"
			]),
			additional : "5 primal power",
			action : [["reaction", ""]]
		}
	},
	"life" : {
		"subclassfeature10" : {
			name : "Life Elementalism",
			source : [["ELCC", 92]],
			description : desc([
				"When I create a shape, I regain hp equal to the PP I expend to create and augment it",
				"Also, I can designate my " + elementalistAbilityAbbr + " mod of creatures I can see to be immune to its damage"
			])
		},
		"subclassfeature14" : {
			name : "Bountiful Paradise",
			source : [["ELCC", 92]],
			description : desc([
				"As an action, I can flood my area of elemental influence with vitalizing energy for 1 hour",
				"Short rests inside for allies take only half the usual time and cure all poisons and diseases"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		},
		"subclassfeature18" : {
			name : "Lifebringer",
			source : [["ELCC", 92]],
			description : desc([
				"As an action, I can expend 18 primal power and touch dead body to restore it to life",
				"It returns to full hp, without poisons, diseases, or wounds; Does not restore missing limbs"
			]),
			additional : "18 primal power",
			action : [["action", ""]]
		}
	},
	"metal" : {
		"subclassfeature10" : {
			name : "Metal Elementalism",
			source : [["ELCC", 92]],
			description : desc([
				"I can swap the damage type of my shapes to bludgeoning, piercing or slashing damage",
				"I am proficient with martial weapons made of metal",
				"I can create shapes while holding a weapon made of metal as though that hand were free"
			]),
			weaponProfs : [false, true]
		},
		"subclassfeature14" : {
			name : "Arsenal",
			source : [["ELCC", 92]],
			description : desc([
				"I am proficient with light, medium, and heavy armors made of metal",
				"When I touch an object made of metal, I learn its current hit points and AC"
			]),
			armorProfs : [true, true, true, false]
		},
		"subclassfeature18" : {
			name : "Heavy Metal",
			source : [["ELCC", 92]],
			description : desc([
				"A creature takes double damage from my shapes if it fails its save by 10 or more",
				"This only works for shapes that deal bludgeoning, piercing or slashing damage"
			])
		}
	},
	"storm" : {
		"subclassfeature10" : {
			name : "Storm Elementalism",
			source : [["ELCC", 92]],
			description : desc([
				"I can swap the damage my shapes do to lightning or thunder damage instead",
				"I have resistance to lightning and thunder damage"
			]),
			dmgres : ["Lightning", "Thunder"]
		},
		"subclassfeature14" : {
			name : "Ride the Lightning",
			source : [["ELCC", 93]],
			description : desc([
				"By meditating for 10 min, I can teleport along with 7 willing though a bolt of lightning",
				"I can only teleport to unoccupied locations I have seen before on the same plane",
				"Both the point of departure and arrival areas need to be beneath open sky"
			])
		},
		"subclassfeature18" : {
			name : "Gathering Storm",
			source : [["ELCC", 93]],
			description : desc([
				"I need to keep a record of my expended primal power, as I build up a charge of energy",
				"As an action, I can make a melee or ranged spell attack within my are of influence",
				"The creature takes the built up primal power as lightning damage",
				"Doing so resets the build up energy to 0; This energy is also lest when I finish a long rest"
			]),
			extraLimitedFeatures : [{
				name : "Gathering Storm (build up PP)",
				usages : "-",
				recovery : "long rest"
			}],
			action : [["action", "Discharge Gathering Storm"]]
		}
	}
}

AddSubClass("elementalist", "air", {
	regExpSearch : /^(?=.*air)(?=.*elementalist).*$/i,
	subname : "Air",
	source : [["ELCC", 89]],
	fullname : "Air Elementalist",
	spellcastingList : {
		"class" : ["elementalist", "elementalist-air"]
	},
	features : {
		"subclassfeature1" : {
			name : "Guiding Winds",
			source : [["ELCC", 89]],
			minlevel : 1,
			description : desc([
				"As an action, I can either make a ranged spell attack against a creature or aid an ally",
				"The target, creature or ally, has to be within my area of influence, see attack entry",
				"The ally has adv. and bonus damage with its next ranged weapon attack in its next turn"
			]),
			addtional : levels.map(function (n) {
				return (n < 6 ? 1 : n < 10 ? 2 : n < 14 ? 3 : n < 18 ? 4 : 5) + 'd6 bludgeoning damage'
			}),
			action : [["action", ""]],
			weaponOptions : [{
				regExpSearch : /^(?=.*guiding)(?=.*wind)(?=.*blast).*$/i,
				name : "Guiding Wind Blast",
				source : [["ELCC", 89]],
				ability : elementalistAbility,
				type : "Spell",
				range : "Area of elemental influence",
				description : "Ranged spell attack; Or add damage to ally's ranged weapon attack",
				damage : [1, 6, "bludgeoning"],
				abilitytodamage : false,
				isGuidingWindBlast : true,
				selectNow : true
			}],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.theWea.isGuidingWindBlast && classes.known.elementalist) {
							var lvl = classes.known.elementalist.level;
							fields.Damage_Die = (lvl < 6 ? 1 : lvl < 10 ? 2 : lvl < 14 ? 3 : lvl < 18 ? 4 : 5) + 'd6';
							var conMod = Number(What("Con Mod"));
							var bonusRange = Math.floor(lvl * 2 / 10) * 10 + 10;
							var shapeRange = (30 + bonusRange * conMod) + " ft";
							fields.Range = What("Unit System") != "metric" ? shapeRange : ConvertToMetric(shapeRange, 0.5);
						};
					},
					"",
					1
				]
			}
		},
		"subclassfeature1.1" : {
			name : "Ways of Air",
			source : [["ELCC", 89]],
			minlevel : 1,
			description : desc([
				"As an action, I can subtly manipulate a cube of air in my area of influence",
				"This can't interfere with magical effects or do harm; It also works on my hybrid element",
				"Examples: cool breeze, miniature tornado; I also gain proficiency in calligrapher's supplies"
			]),
			toolProfs : ["Calligrapher's supplies"],
			action : [["action", "Manipulate Air"]],
			additional : levels.map(function (n) {
				return (n < 6 ? 5 : n < 10 ? 10 : n < 14 ? 15 : n < 18 ? 20 : 25) + "-ft cube";
			})
		},
		"subclassfeature2" : {
			name : "Friend of the Elements",
			source : [["ELCC", 88]],
			minlevel : 2,
			description : desc("I learn Auran; I gain advantage on Charisma checks against air elementals"),
			languageProfs : ["Auran"]
		},
		"subclassfeature6" : {
			name : "Spirit of Adventure",
			source : [["ELCC", 89]],
			minlevel : 6,
			description : desc([
				"After I finish a long rest, I have advantage on Dexterity saving throws and ability checks",
				"This lasts until I finish a short rest or gain a level of exhaustion"
			])
		},
		"subclassfeature10" : {
			name : "Hybrid Elements",
			source : [["ELCC", 89]],
			minlevel : 10,
			description : desc([
				"Choose whether to hybridize your elemental affinity or stick with air",
				'Use the "Choose Features" button above to select the element'
			]),
			choices : ["Air", "Ice", "Storm"],
			"air" : {
				name : "Windweaver",
				source : [["ELCC", 89]],
				description : desc("I become empowered when I use movement on my turn to move at least 25 ft away")
			},
			"ice" : elementalistHybrid.ice.subclassfeature10,
			"storm" : elementalistHybrid.storm.subclassfeature10,
			choiceDependencies : [{
				feature : "subclassfeature14"
			}, {
				feature : "subclassfeature18"
			}]
		},
		"subclassfeature14" : {
			name : "Hybrid Elements - level 14 feature",
			source : [["ELCC", 89]],
			minlevel : 14,
			description : desc([
				'Use the "Choose Features" button above to select your (hybrid) element'
			]),
			choices : ["Air", "Ice", "Storm"],
			choicesNotInMenu : true,
			"air" : {
				name : "Grace of the Wind",
				source : [["ELCC", 90]],
				description : desc("I gain proficiency in Dexterity saving throws and the Acrobatics skill"),
				saves : ["Dex"],
				skills : ["Acrobatics"]
			},
			"ice" : elementalistHybrid.ice.subclassfeature14,
			"storm" : elementalistHybrid.storm.subclassfeature14
		},
		"subclassfeature18" : {
			name : "Hybrid Elements - level 18 feature",
			source : [["ELCC", 89]],
			minlevel : 18,
			description : desc([
				'Use the "Choose Features" button above to select your (hybrid) element'
			]),
			choices : ["Air", "Ice", "Storm"],
			choicesNotInMenu : true,
			"air" : {
				name : "Master of Air",
				source : [["ELCC", 90]],
				description : desc([
					"I have almost complete control over the air in my are of elemental influence",
					"At the start of each of my turns, I can create or end any light or strong wind within",
					"The wind is in a direction of my choice; I can choose who is immune to this wind"
				])
			},
			"ice" : elementalistHybrid.ice.subclassfeature18,
			"storm" : elementalistHybrid.storm.subclassfeature18
		}
	}
})

AddSubClass("elementalist", "earth", {
	regExpSearch : /^(?=.*earth)(?=.*elementalist).*$/i,
	subname : "Earth",
	source : [["ELCC", 89]],
	fullname : "Earth Elementalist",
	spellcastingList : {
		"class" : ["elementalist", "elementalist-earth"]
	},
	features : {
		"subclassfeature1" : {
			name : "Stone Mantle",
			source : [["ELCC", 90]],
			minlevel : 1,
			description : desc([
				"After I finish a long rest, I can gain 4 times my elementalist level in temporary hit points",
				"I can make melee spell attacks instead of unarmed strikes, dealing +" + elementalistAbilityAbbr + " mod damage"
			]),
			weaponOptions : [{
				baseWeapon : "unarmed strike",
				regExpSearch : /^(?=.*stone)(?=.*mantle)(?=.*strike).*$/i,
				name : "Stone Mantle Strike",
				source : [["ELCC", 90]],
				ability : elementalistAbility,
				type : "Spell",
				description : "Melee spell attack",
				damage : ["1+Str", "", "bludgeoning"],
				selectNow : true
			}],
			additional : levels.map(function (n) {
				return (n * 4) + " temp HP";
			})
		},
		"subclassfeature1.1" : {
			name : "Ways of Earth",
			source : [["ELCC", 90]],
			minlevel : 1,
			description : desc([
				"As an action, I can subtly manipulate a cube of earth in my area of influence",
				"This can't interfere with magical effects or do harm; It also works on my hybrid element",
				"Examples: shape stone, extract ore from rock; I also gain proficiency in mason's tools"
			]),
			toolProfs : ["Mason's tools"],
			action : [["action", "Manipulate Earth"]],
			additional : levels.map(function (n) {
				return (n < 6 ? 5 : n < 10 ? 10 : n < 14 ? 15 : n < 18 ? 20 : 25) + "-ft cube";
			})
		},
		"subclassfeature2" : {
			name : "Friend of the Elements",
			source : [["ELCC", 88]],
			minlevel : 2,
			description : desc("I learn Terran; I gain advantage on Charisma checks against earth elementals"),
			languageProfs : ["Terran"]
		},
		"subclassfeature6" : {
			name : "Rock Solid",
			source : [["ELCC", 90]],
			minlevel : 6,
			description : desc("I gain adv. on saves vs. being incapacitated, paralyzed, petrified, stunned, or unconscious"),
			savetxt : { adv_vs : ["incapacitated", "paralyzed", "petrified", "stunned", "unconscious"] }
		},
		"subclassfeature10" : {
			name : "Hybrid Elements",
			source : [["ELCC", 89]],
			minlevel : 10,
			description : desc([
				"Choose whether to hybridize your elemental affinity or stick with earth",
				'Use the "Choose Features" button above to select the element'
			]),
			choices : ["Earth", "Life", "Metal"],
			"earth" : {
				name : "Seismography",
				source : [["ELCC", 90]],
				description : desc("While standing on the ground, I can sense vibrations in the earth, giving me tremorsense"),
				vision : [["Tremorsense", 15]],
				additional : levels.map(function (n) {
					return n < 10 ? "" : "Tremorsense " + (n < 18 ? 15 : 30) + " ft";
				})
			},
			"life" : elementalistHybrid.life.subclassfeature10,
			"metal" : elementalistHybrid.metal.subclassfeature10,
			choiceDependencies : [{
				feature : "subclassfeature14"
			}, {
				feature : "subclassfeature18"
			}]
		},
		"subclassfeature14" : {
			name : "Hybrid Elements - level 14 feature",
			source : [["ELCC", 89]],
			minlevel : 14,
			description : desc([
				'Use the "Choose Features" button above to select your (hybrid) element'
			]),
			choices : ["Earth", "Life", "Metal"],
			choicesNotInMenu : true,
			"earth" : {
				name : "Earthen Might",
				source : [["ELCC", 90]],
				description : desc("I gain proficiency in Strength saving throws and the Athletics skill"),
				saves : ["Str"],
				skills : ["Athletics"]
			},
			"life" : elementalistHybrid.life.subclassfeature14,
			"metal" : elementalistHybrid.metal.subclassfeature14
		},
		"subclassfeature18" : {
			name : "Hybrid Elements - level 18 feature",
			source : [["ELCC", 89]],
			minlevel : 18,
			description : desc([
				'Use the "Choose Features" button above to select your (hybrid) element'
			]),
			choices : ["Earth", "Life", "Metal"],
			choicesNotInMenu : true,
			"earth" : {
				name : "Master Earth",
				source : [["ELCC", 90]],
				description : desc([
					"I gain a burrowing speed equal to my walking speed as I mastered manipulating earth",
					"I don't disturb the material I move through; I burrow through solid rock at half speed",
					"If I end my turn inside a solid, I expend 5 PP or I'm shunted to the nearest empty space"
				]),
				speed : { burrow : { spd : "walk", enc : "walk" }, },
				vision : [["Tremorsense", 30]] // from Seismography
			},
			"life" : elementalistHybrid.life.subclassfeature18,
			"metal" : elementalistHybrid.metal.subclassfeature18
		}
	}
})

AddSubClass("elementalist", "fire", {
	regExpSearch : /^(?=.*fire)(?=.*elementalist).*$/i,
	subname : "Fire",
	source : [["ELCC", 89]],
	fullname : "Fire Elementalist",
	spellcastingList : {
		"class" : ["elementalist", "elementalist-fire"]
	},
	features : {
		"subclassfeature1" : {
			name : "Enduring Ember",
			source : [["ELCC", 90]],
			minlevel : 1,
			description : desc([
				"After I finish a short rest, I can expend HD to regain PP equal to the amount rolled",
				"I can expend my " + elementalistAbilityFull + " modifier of HD; At 10th-level this doubles"
			]),
			usages : 1,
			recovery : "long rest",
			additional : levels.map(function (n) {
				return "up to " + ( n < 10 ? "" : "2 \xD7 ") + elementalistAbilityAbbr + " mod HD";
			})
		},
		"subclassfeature1.1" : {
			name : "Ways of Fire",
			source : [["ELCC", 91]],
			minlevel : 1,
			description : desc([
				"As an action, I can subtly manipulate a cube of fire in my area of influence",
				"This can't interfere with magical effects or do harm; It also works on my hybrid element",
				"Examples: extinguishing and lighting a fire; I also gain proficiency in glassblower's tools"
			]),
			toolProfs : ["Glassblower's tools"],
			action : [["action", "Manipulate Fire"]],
			additional : levels.map(function (n) {
				return (n < 6 ? 5 : n < 10 ? 10 : n < 14 ? 15 : n < 18 ? 20 : 25) + "-ft cube";
			})
		},
		"subclassfeature2" : {
			name : "Friend of the Elements",
			source : [["ELCC", 88]],
			minlevel : 2,
			description : desc("I learn Ignan; I gain advantage on Charisma checks against fire elementals"),
			languageProfs : ["Ignan"]
		},
		"subclassfeature6" : {
			name : "Fireproof",
			source : [["ELCC", 91]],
			minlevel : 6,
			description : desc("I gain resistance to fire damage, immunity at 14th-level"),
			dmgres : ["Fire"]
		},
		"subclassfeature10" : {
			name : "Hybrid Elements",
			source : [["ELCC", 89]],
			minlevel : 10,
			description : desc([
				"Choose whether to hybridize your elemental affinity or stick with fire",
				'Use the "Choose Features" button above to select the element'
			]),
			choices : ["Fire", "Metal", "Storm"],
			"fire" : {
				name : "Pour It On",
				source : [["ELCC", 91]],
				description : desc([
					"When I augment a damaging shape, it deals extra damage the first time it deals damage",
					"This bonus damage is equal to the amount of primal power expended to augment it"
				])
			},
			"metal" : elementalistHybrid.metal.subclassfeature10,
			"storm" : elementalistHybrid.storm.subclassfeature10,
			choiceDependencies : [{
				feature : "subclassfeature14"
			}, {
				feature : "subclassfeature18"
			}]
		},
		"subclassfeature14" : {
			name : "Hybrid Elements - level 14 feature",
			source : [["ELCC", 89]],
			minlevel : 14,
			description : desc([
				'Use the "Choose Features" button above to select your (hybrid) element'
			]),
			savetxt : { immune : ["fire"] }, // from Fireproof
			choices : ["Fire", "Metal", "Storm"],
			choicesNotInMenu : true,
			"fire" : {
				name : "Fury of the Flames",
				source : [["ELCC", 91]],
				description : desc("I gain proficiency in Charisma saving throws and the Intimidation skill"),
				saves : ["Cha"],
				skills : ["Intimidation"]
			},
			"metal" : elementalistHybrid.metal.subclassfeature14,
			"storm" : elementalistHybrid.storm.subclassfeature14
		},
		"subclassfeature18" : {
			name : "Hybrid Elements - level 18 feature",
			source : [["ELCC", 89]],
			minlevel : 18,
			description : desc([
				'Use the "Choose Features" button above to select your (hybrid) element'
			]),
			choices : ["Fire", "Metal", "Storm"],
			choicesNotInMenu : true,
			"fire" : {
				name : "Master Fire",
				source : [["ELCC", 91]],
				description : desc("When I deal fire damage in an area, I can choose to also damage unattended objects")
			},
			"metal" : elementalistHybrid.metal.subclassfeature18,
			"storm" : elementalistHybrid.storm.subclassfeature18
		}
	}
})

AddSubClass("elementalist", "water", {
	regExpSearch : /^(?=.*water)(?=.*elementalist).*$/i,
	subname : "Water",
	source : [["ELCC", 91]],
	fullname : "Water Elementalist",
	spellcastingList : {
		"class" : ["elementalist", "elementalist-water"]
	},
	features : {
		"subclassfeature1" : {
			name : "Siphon",
			source : [["ELCC", 91]],
			minlevel : 1,
			description : desc([
				"As an action, I can make a melee spell attack dealing necrotic damage against a creature",
				"If I deal damage, I can heal an ally within my area of influence for the same amount"
			]),
			addtional : levels.map(function (n) {
				return (n < 6 ? 1 : n < 10 ? 2 : n < 14 ? 3 : n < 18 ? 4 : 5) + 'd4 necrotic damage'
			}),
			action : [["action", ""]],
			weaponOptions : [{
				regExpSearch : /^(?=.*siphoning)(?=.*strike).*$/i,
				name : "Siphoning Strike",
				source : [["ELCC", 91]],
				ability : elementalistAbility,
				type : "Spell",
				range : "Melee",
				description : "Melee spell attack; Ally in area of influence heals same amount as damage dealt",
				damage : [1, 4, "necrotic"],
				abilitytodamage : false,
				isSiphoningStrike : true,
				selectNow : true
			}],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.theWea.isSiphoningStrike && classes.known.elementalist) {
							var lvl = classes.known.elementalist.level;
							fields.Damage_Die = (lvl < 6 ? 1 : lvl < 10 ? 2 : lvl < 14 ? 3 : lvl < 18 ? 4 : 5) + 'd4';
						};
					},
					"",
					1
				]
			}
		},
		"subclassfeature1.1" : {
			name : "Ways of Water",
			source : [["ELCC", 91]],
			minlevel : 1,
			description : desc([
				"As an action, I can subtly manipulate a cube of water in my area of influence",
				"This can't interfere with magical effects or do harm; It also works on my hybrid element",
				"Examples: stream flows up, shelter from rain; I gain proficiency in alchemist's supplies"
			]),
			toolProfs : ["Alchemist's supplies"],
			action : [["action", "Manipulate Water"]],
			additional : levels.map(function (n) {
				return (n < 6 ? 5 : n < 10 ? 10 : n < 14 ? 15 : n < 18 ? 20 : 25) + "-ft cube";
			})
		},
		"subclassfeature2" : {
			name : "Friend of the Elements",
			source : [["ELCC", 88]],
			minlevel : 2,
			description : desc("I learn Auran; I gain advantage on Charisma checks against air elementals"),
			languageProfs : ["Auran"]
		},
		"subclassfeature6" : {
			name : "Tidewalker",
			source : [["ELCC", 91]],
			minlevel : 6,
			description : desc("I gain a swimming speed equal to my walking speed and I can breathe underwater"),
			speed : { swim : { spd : "walk", enc : "walk" } }
		},
		"subclassfeature10" : {
			name : "Hybrid Elements",
			source : [["ELCC", 89]],
			minlevel : 10,
			description : desc([
				"Choose whether to hybridize your elemental affinity or stick with water",
				'Use the "Choose Features" button above to select the element'
			]),
			choices : ["Water", "Ice", "Life"],
			"water" : {
				name : "Crushing Tide",
				source : [["ELCC", 89]],
				description : desc("Creatures gain disadvantage on their first save against my shapes that I have augmented")
			},
			"ice" : elementalistHybrid.ice.subclassfeature10,
			"life" : elementalistHybrid.life.subclassfeature10,
			choiceDependencies : [{
				feature : "subclassfeature14"
			}, {
				feature : "subclassfeature18"
			}]
		},
		"subclassfeature14" : {
			name : "Hybrid Elements - level 14 feature",
			source : [["ELCC", 89]],
			minlevel : 14,
			description : desc([
				'Use the "Choose Features" button above to select your (hybrid) element'
			]),
			choices : ["Water", "Ice", "Life"],
			choicesNotInMenu : true,
			"water" : {
				name : "Wisdom of the Waves",
				source : [["ELCC", 91]],
				description : desc("I gain proficiency in Wisdom saving throws and the Insight skill"),
				saves : ["Wis"],
				skills : ["Insight"]
			},
			"ice" : elementalistHybrid.ice.subclassfeature14,
			"life" : elementalistHybrid.life.subclassfeature14
		},
		"subclassfeature18" : {
			name : "Hybrid Elements - level 18 feature",
			source : [["ELCC", 89]],
			minlevel : 18,
			description : desc([
				'Use the "Choose Features" button above to select your (hybrid) element'
			]),
			choices : ["Water", "Ice", "Life"],
			choicesNotInMenu : true,
			"water" : {
				name : "Master Water",
				source : [["ELCC", 91]],
				description : desc([
					"By detecting water, I gain blindsight inside my area of elemental influence",
					"With this I can't perceive creatures not at least partially composed of water",
					"When I or an ally is affected by a shape of mine in my area of influence, they can move",
					"The affected can use its reaction to move 10 ft without provoking opportunity attacks"
				]),
				vision : [["Watersight inside area of influence"]],
				action : [["reaction", " (moved by shape)"]]
			},
			"ice" : elementalistHybrid.ice.subclassfeature18,
			"life" : elementalistHybrid.life.subclassfeature18
		}
	}
})


// Elemental Shapes types as schools
spellSchoolList["Air"]   = "Air affinity";
spellSchoolList["Earth"] = "Earth affinity";
spellSchoolList["Fire"]  = "Fire affinity";
spellSchoolList["Water"] = "Water affinity";
AugmentES = "\n   " + toUni("Augment") + ": ";

/* Elemental Shapes as spells ("-es" for "elemental shape")
	`school`		Is used to refer to the elemental affinity of the shape.
					Empty for those of any affinity or a master with sub-entries.

	`components`	Always set to "S" as ELCC p86 states:
						"To create a shape, you must be conscious and be able gesture both
						forcefully and intricately, requiring at least one free hand."

	`duration`		Always has a (D) added, because all shapes can be dismissed as an 
					action.

	`dependencies`	Is auto-filled with the current elemental affinity if any SpellsList
					object match.

	`range`			Is auto-filled if `rangeInfluence` is set to true.
	`rangeInfluence`Custom attribute to signal this shape needs its range to be calculated
					as determined by level and Con mod.

	`elementalShape`Custom attribute to signal this is a (non-sub) Elemental Shape.

	>> Full descriptions for elemental shapes that have dependencies work different:

	`descriptionFull` For parent shapes with dependencies and sub-shapes,
					  this attribute is auto-generated from `elementalDesc`, see below.

	`elementalDesc` Custom attribute to hold part of the `descriptionFull`.
					For parent: the description except the part for each element.
					For sub-shape: only the part of the element (no bullet point).

	The object name of a sub-shape (i.e. one that should be added to the dependencies),
	has to be the same as the master shape, but with the elemental affinity as a suffix
	using a hyphen.
*/

// Basic shapes
SpellsList["ball-es"] = {
	name : "Ball",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 93]],
	level : 2,
	school : "",
	time : "1 bns",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "1 min (D)",
	description : "Create 1+1/3PP 5-ft diameter ball; melee spell atk 2d6 dmg; 1 a to move each up to 30 ft and atk",
	elementalDesc : "  Tier:  Basic shape\n  Primal Power Cost:  2\n\n"+
	"You create a 5-foot-diameter floating sphere of dense element in an unoccupied space you can see within your area of elemental influence. As an action, you can command the ball to move up to 30 feet and make a single melee spell attack against a creature within 5 feet of it. On a successful hit, the target takes 2d6 damage of the type corresponding to your elemental affinity. Additionally, the shape gains the following property according to your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For each 3 primal power so expended, you create an additional elemental ball in an unoccupied space you can see within your area of elemental influence. When you take an action to move a ball created in this manner, you can choose to move all balls created by this effect and make a single melee spell attack with each of them.",
	firstCol : 2,
	dependencies : []
}
SpellsList["ball-es-air"] = {
	name : "Ball: Air",
	source : [["ELCC", 93]],
	level : 2,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "Str",
	description : "The balls deal bludgeoning damage and creatures hit by it must save or be knocked prone",
	elementalDesc : "The ball deals bludgeoning damage. Additionally, creatures hit by the ball must succeed on a Strength saving	throw or be knocked prone."
}
SpellsList["ball-es-earth"] = {
	name : "Ball: Earth",
	source : [["ELCC", 93]],
	level : 2,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "Dex",
	description : "Piercing dmg; At end, each ball explodes for 30-ft rad all crea 2d6 Piercing dmg; save halves",
	elementalDesc : "The ball deals piercing damage. Additionally, when the shape ends the ball explodes in a 30-foot-radius sphere. Each creature in the area must attempt a Dexterity saving throw, taking damage as though it were hit by an attack from the ball on a failure, or half as much damage on a success."
}
SpellsList["ball-es-fire"] = {
	name : "Ball: Fire",
	source : [["ELCC", 93]],
	level : 2,
	school : "Fire",
	time : "",
	range : "",
	components : "",
	duration : "",
	description : "The balls deal fire damage and I can move them up to 60 ft instead of 30 ft",
	elementalDesc : "The ball deals fire damage. Additionally, when you take an action to move the ball, it can move up to 60 feet instead of 30 feet."
}
SpellsList["ball-es-water"] = {
	name : "Ball: Water",
	source : [["ELCC", 93]],
	level : 2,
	school : "Water",
	time : "",
	range : "",
	components : "",
	duration : "",
	description : "Slashing dmg; At end, each ball explodes in 30-ft rad to heal crea of my choice for 2d6 hp",
	elementalDesc : "The ball deals slashing damage. Additionally, when the shape ends, the ball explodes in a 30-foot-radius sphere, and you roll the ball's spell attack damage dice. Creatures of your choice in the area of the explosion regain a number of hit points equal to the amount rolled."
}

SpellsList["blast-es"] = {
	name : "Blast",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 94]],
	level : 2,
	school : "",
	time : "1 a",
	range : "S:15" + (typePF ? "-" : "") + "ft cone",
	components : "S",
	duration : "Instantaneous",
	save : "Dex",
	description : "All in cone 3d6+2d6/2PP damage; +15 ft/2PP cone size; Save halves",
	elementalDesc : "  Tier:  Basic shape\n  Primal Power Cost:  1\n\n"+
	"You unleash a blast of elemental energy from your body in a 15-foot cone. Creatures in the area must succeed on a Dexterity saving throw or take 3d6 damage of the type corresponding to your elemental affinity, or half as much on a success. Additionally, the shape gains the following property according to your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 2 primal power so expended, the size of the cone increases by 15 feet, and the damage increases by 2d6.",
	firstCol : 1,
	dependencies : []
}
SpellsList["blast-es-air"] = {
	name : "Blast: Air",
	source : [["ELCC", 94]],
	level : 2,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "",
	description : "Thunder damage; On failed save, creatures and loose objects pushed to the end of the cone",
	elementalDesc : "The effect deals thunder damage. Additionally, on a failed save, creatures and unattended objects not completely tied down within the area are pushed away from you to the end of the cone or until they encounter a solid object."
}
SpellsList["blast-es-earth"] = {
	name : "Blast: Earth",
	source : [["ELCC", 94]],
	level : 2,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "",
	description : "Bludgeoning damage; Any ground in the affected area becomes difficult terrain",
	elementalDesc : "The effect deals bludgeoning damage. Additionally, any ground in the area becomes difficult terrain."
}
SpellsList["blast-es-fire"] = {
	name : "Blast: Fire",
	source : [["ELCC", 94]],
	level : 2,
	school : "Fire",
	time : "",
	range : "",
	components : "",
	duration : "1 rnd",
	description : "Fire damage; On failed save, crea blinded until their next turn starts",
	elementalDesc : "Fire damage; On failed save, creatures blinded until the start of their next turn"
}
SpellsList["blast-es-water"] = {
	name : "Blast: Water",
	source : [["ELCC", 94]],
	level : 2,
	school : "Water",
	time : "",
	range : "",
	components : "",
	duration : "",
	description : "Half Bludgeoning damage to enemies (round down), half healing (round up) to friends in area",
	elementalDesc : "The effect instead deals half of the damage rolled as bludgeoning damage to enemies in the area (rounded down). Creatures of your choice in the area regain a number of hit points equal to the other half of the damage rolled (rounded up)."
}

SpellsList["combustion-es"] = {
	name : "Combustion",
	elementalShape : true,
	classes : ["elementalist-fire"],
	source : [["ELCC", 94]],
	level : 2,
	school : "Fire",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "1+1/3PP rnds",
	save : "Dex",
	description : "1 crea I see explosive charge; I trigger with 1 rea: 5-ft rad all 3d10+3d10/3PP/rnd fire dmg; save half",
	descriptionFull : "  Tier:  Basic shape\n  Primal Power Cost:  2\n\n"+
	"You infect a creature you can see within the area of your elemental influence with an explosive charge. At any time while the shape is in effect, you can take a reaction to cause the charge to explode from the target in a 5-foot radius. Creatures in the area must attempt a Dexterity saving throw, taking 3d10 fire damage on a failure, or half as much on a success. If you have not expended the charge in this manner before the duration ends, the charge explodes at the end of its duration."+
	AugmentES + "When you create this shape, you can expend additional primal power. For every 3 primal power so expended, the duration of the effect increases by 1 round. Additionally, at the beginning of each of your turns while the effect persists, the damage dealt when the charge explodes is increased by 3d10.",
	firstCol : 2
}

SpellsList["droplets-es"] = {
	name : "Droplets",
	elementalShape : true,
	classes : ["elementalist-water"],
	source : [["ELCC", 94]],
	level : 2,
	school : "Water",
	time : "1 bns",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "1 min (D)",
	description : "3+1/2PP spheres orbit me; I can expend any when I heal crea I see, healing it extra 1d8 hp per sphere",
	descriptionFull : "  Tier:  Basic shape\n  Primal Power Cost:  2\n\n"+
	"You conjure three spheres of water that orbit your head for the duration. When you cause an allied creature you can see within range of your area of elemental influence to regain hit points, you can expend one or more of the spheres to cause the creature to regain an additional 1d8 hit points for each sphere expended."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power to conjure an additional sphere of water for every 2 primal power expended in this manner.",
	firstCol : 2
}

SpellsList["launch-es"] = {
	name : "Launch",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 94]],
	level : 2,
	school : "",
	time : "1 bns",
	range : "Self",
	components : "S",
	duration : "Instantaneous",
	description : "I move straight through the air for 30+10/PP ft, landing on my feet at the end unless I fall",
	descriptionMetric : "I move straight through the air for 10+3/PP m, landing on my feet at the end unless I fall",
	elementalDesc : "  Tier:  Basic shape\n  Primal Power Cost:  1\n\n"+
	"You project a blast of elements that throws you into the air. The shape pushes you in a straight line in a direction of your choice up to 30 feet. At the end of your movement you land on your feet unless you fell at the end of that movement. Additionally, this shape creates effects according to your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 1 primal power so expended, you increase the distance of the launch by 10 feet.",
	firstCol : 1,
	dependencies : []
}
SpellsList["launch-es-air"] = {
	name : "Launch: Air",
	source : [["ELCC", 94]],
	level : 2,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "1 min",
	description : "If I fall at the end of the move, only fall 30 ft per round, without falling dmg for the duration",
	elementalDesc : "If you fall at the end of the movement, your rate of descent slows to 30 feet per round for 1 minute. If you land before the minute is up, you take no falling damage, land on your feet, and the effect ends."
}
SpellsList["launch-es-earth"] = {
	name : "Launch: Earth",
	source : [["ELCC", 94]],
	level : 2,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "",
	description : "If I make a melee attack immediately after this move, it deals +1d4 damage per 10 ft traveled",
	elementalDesc : "If you make a melee attack immediately at the end of the movement provided by this shape, you deal an additional 1d4 damage on a successful hit for every 10 feet you traveled via this shape."
}
SpellsList["launch-es-fire"] = {
	name : "Launch: Fire",
	source : [["ELCC", 94]],
	level : 2,
	school : "Fire",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "Dex",
	description : "All creatures in 10-ft radius from point I left, save or take 3d4+1d4/PP Fire damage",
	elementalDesc : "You create a 10-foot-radius blast of flame centered on the space you occupied when you created this shape. Creatures within the area must succeed on a Dexterity saving throw or take 1d4 fire damage for every 10 feet the shape attempted to throw you."
}
SpellsList["launch-es-water"] = {
	name : "Launch: Water",
	source : [["ELCC", 94]],
	level : 2,
	school : "Water",
	time : "",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "",
	duration : "",
	description : "I can choose to move a willing creature within range instead of myself",
	elementalDesc : "Instead of throwing you, you can choose for the shape to throw a willing creature of your choice within the area of your elemental influence."
}

SpellsList["obsidian armaments-es"] = {
	name : "Obsidian Armaments",
	elementalShape : true,
	classes : ["elementalist-earth"],
	source : [["ELCC", 95]],
	level : 2,
	school : "Earth",
	time : "1 bns",
	range : "Self",
	components : "S",
	duration : "10 min (D)",
	description : "My unarmed strikes are magical and gain +1d4 dmg/3PP; 1 bns to make an unarmed strike attack",
	descriptionFull : "  Tier:  Basic shape\n  Primal Power Cost:  2\n\n"+
	"You coat your limbs in a layer of obsidian for the duration. While so coated, your unarmed strikes are magical and you can make an attack with your unarmed strike as a bonus action."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 3 primal power so expended, your unarmed strike damage increases by 1d4 for the duration of the shape.",
	firstCol : 2
}

SpellsList["shield-es"] = {
	name : "Shield",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 95]],
	level : 2,
	school : "",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you take damage from a source you can see",
	range : "Self",
	components : "S",
	duration : "Instantaneous",
	description : "Reduce the damage taken from the triggering effect by 1d12+1d12/3PP",
	elementalDesc : "  Tier:  Basic shape\n  Primal Power Cost:  1\n\n"+
	"You generate a swirling barrier of elemental energy around you, reducing the damage you take from the triggering effect by 1d12. Additionally, the shape gains the following property according to your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 3 primal power so expended, the damage reduced by the shape increases by 1d12.",
	firstCol : 1,
	dependencies : []
}
SpellsList["shield-es-air"] = {
	name : "Shield: Air",
	source : [["ELCC", 95]],
	level : 2,
	school : "Air",
	time : "",
	range : "60 ft",
	components : "",
	duration : "",
	description : "If ranged wea dmg reduced to 0, change target to crea in 60 ft; Ranged spell atk, original dmg/effect",
	elementalDesc : "If the damage was from a ranged weapon attack and you reduce the damage you take from the triggering attack to 0 with this shape, you may change the target of the attack to a creature within 60 feet of you. Instead of using the attack's original attack roll, you must make a ranged spell attack with the weapon or ammunition as part of the same reaction, dealing the attack's damage and causing its effects on a success."
}
SpellsList["shield-es-earth"] = {
	name : "Shield: Earth",
	source : [["ELCC", 95]],
	level : 2,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "1 rnd",
	description : "Until the start of my next turn, I have half cover from attacks and effects outside of my space",
	elementalDesc : "Until the start of your next turn you have half cover from attacks and effects outside of your space."
}
SpellsList["shield-es-fire"] = {
	name : "Shield: Fire",
	source : [["ELCC", 95]],
	level : 2,
	school : "Fire",
	time : "",
	range : "5 ft",
	components : "",
	duration : "",
	description : "Creatures within 5 ft of me take fire damage equal to the amount of damage reduced",
	elementalDesc : "Creatures within 5 feet of you take fire damage equal to the amount of damage reduced."
}
SpellsList["shield-es-water"] = {
	name : "Shield: Water",
	source : [["ELCC", 95]],
	level : 2,
	school : "Water",
	time : "",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "",
	duration : "",
	description : "One creature of my choice within range also has damage reduced from same effect",
	elementalDesc : "A creature of your choice within your area of elemental influence that would also take damage from the triggering effect is also affected by this shape, reducing the damage it takes by the amount rolled by this shape."
}

SpellsList["trail-es"] = {
	name : "Trail",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 95]],
	level : 2,
	school : "",
	time : "1 a",
	range : "S:60" + (typePF ? "-" : "") + "ft line",
	components : "S",
	duration : "1 min (D)",
	description : "60-ft long, 5-ft wide, 1 inch tall pathway from my feet; Per extra 2PP: +30 ft long or +10 ft wide",
	elementalDesc : "  Tier:  Basic shape\n  Primal Power Cost:  2\n\n"+
	"You create a pathway composed of the elements from your feet in a 60-foot-long, 5-foot-wide line that is 1 inch tall. The pathway gains the following property according to your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 2 primal power so expended, you can increase the length of the line by 30 feet or the width of the line by 10 feet.",
	firstCol : 2,
	dependencies : []
}
SpellsList["trail-es-air"] = {
	name : "Trail: Air",
	source : [["ELCC", 95]],
	level : 2,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "",
	description : "Only I can walk on swirling air pathway as though it were solid ground; I then count as flying",
	elementalDesc : "The pathway is composed of swirling air. You (and only you) can walk upon the pathway as though it were solid ground, and while standing on the pathway, you are considered to be flying."
}
SpellsList["trail-es-earth"] = {
	name : "Trail: Earth",
	source : [["ELCC", 95]],
	level : 2,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "",
	description : "Solid earth pathway, AC 15, 80 hp; I can't be (magically) moved while on it and not incapacitated",
	elementalDesc : "The pathway is composed of solid stone or earth and is an object with an AC of 15 and 80 hit points. While you are on the pathway and are not incapacitated, you cannot be teleported or moved unless you allow it."
}
SpellsList["trail-es-fire"] = {
	name : "Trail: Fire",
	source : [["ELCC", 95]],
	level : 2,
	school : "Fire",
	time : "",
	range : "",
	components : "",
	duration : "",
	description : "I'm empowered while on flame pathway; All who touch it take elementalist level Fire dmg (1\xD7 per rnd)",
	elementalDesc : "The pathway is composed of shimmering flames. While you are on the pathway, you are always empowered as per your Elemental Empowerment feature. Additionally, creatures (including yourself) that come into contact with the pathway for the first time in a round take fire damage equal to your elementalist level."
}
SpellsList["trail-es-water"] = {
	name : "Trail: Water",
	source : [["ELCC", 95]],
	level : 2,
	school : "Water",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "Str",
	description : "Enemy creature that enters pathway save or pushed to end of the pathway, my choice which end",
	elementalDesc : "The pathway is composed of clear, blue water. When an enemy creature comes into contact with the pathway for the first time in a round, it must succeed on a Strength saving throw or be pushed to either end of the pathway (your choice as to which end)."
}

SpellsList["updraft-es"] = {
	name : "Updraft",
	elementalShape : true,
	classes : ["elementalist-air"],
	source : [["ELCC", 95]],
	level : 2,
	school : "Air",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "Instantaneous",
	save : "Str",
	description : "All in 5+5/2PP ft square thrown 30+20/2PP ft straight upward; Save to halve upward distance",
	descriptionMetric : "All in 1,5+1,5/2PP m square thrown 10+6/2PP m straight upward; Save to halve upward distance",
	descriptionFull : "  Tier:  Basic shape\n  Primal Power Cost:  1\n\n"+
	"You generate a tremendous blast of air in a 5-foot square you can see within your area of elemental influence. Unsecured creatures completely within the area must succeed on a Strength saving throw or be thrown 30 feet straight upward, or half as far on a success."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 2 primal power so expended, you increase the area of the effect by one 5-foot square and the height affected creatures are thrown by 20 feet.",
	firstCol : 1
}

SpellsList["wall-es"] = {
	name : "Wall",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 96]],
	level : 2,
	school : "",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "Permanent (D)",
	description : "30\xD71\xD710 ft (l\xD7w\xD7h) straight wall; Per extra PP: +10 ft long or +5 ft high; Parts out of range vanish",
	descriptionMetric : "9\xD70,3\xD73 m (l\xD7w\xD7h) straight wall; Per extra PP: +3 m long or +1,5 m high; Parts out of range vanish",
	elementalDesc : "  Tier:  Basic shape\n  Primal Power Cost:  2\n\n"+
	"You create a straight wall of elements on a solid surface that must be completely within your area of elemental influence. You can make the wall up to 30 feet long, 10 feet high, and 1 foot thick. Sections of the wall that leave your area of elemental influence vanish instantly. The wall gains the following properties according to your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power to increase the size of the wall. For every 1 primal power so expended, you can increase the length of the wall of 10 feet or the height of the wall by 5 feet.",
	firstCol : 2,
	dependencies : []
}
SpellsList["wall-es-air"] = {
	name : "Wall: Air",
	source : [["ELCC", 96]],
	level : 2,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "",
	description : "Invisible swirling air wall blocks ordinary projectiles (not giant boulders, siege engines)",
	elementalDesc : "The wall is composed of swirling air and is invisible. Arrows, bolts, and other ordinary projectiles launched at targets behind the wall are deflected upward and automatically miss (boulders hurled by giants or siege engines, or similar projectiles are unaffected.)."
}
SpellsList["wall-es-earth"] = {
	name : "Wall: Earth",
	source : [["ELCC", 96]],
	level : 2,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "",
	description : "Heavy stone wall, each 10-ft section has 30 hp, AC = DC; It does not vanish outside of range",
	elementalDesc : "The wall is composed of heavy stone and is a structure. Each 10-foot section of the wall is an object with an AC equal to your elemental save DC and has 30 hit points. Additionally, the wall does not vanish when it leaves your area of elemental influence."
}
SpellsList["wall-es-fire"] = {
	name : "Wall: Fire",
	source : [["ELCC", 96]],
	level : 2,
	school : "Fire",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "Dex",
	description : "Once per turn when creature starts or passes through this roaring flame wall, save or 2d8 Fire damage",
	elementalDesc : "The wall is composed of roaring flames and is opaque. Creatures passing through the wall for the first time on a turn or that start their turn within the wall must succeed on a Dexterity saving throw or take 2d8 fire damage."
}
SpellsList["wall-es-water"] = {
	name : "Wall: Water",
	source : [["ELCC", 96]],
	level : 2,
	school : "Water",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "Str",
	description : "Translucent, swimmable water wall moves 20 ft away from me each rnd; All touched save or pushed",
	elementalDesc : "The wall is composed of rising water and is translucent. At the start of each of your turns the wall moves away from you at a speed of 20 feet. Creatures that the wall encounters during this movement must succeed on a Strength saving throw or be pushed ahead of the wall for the remainder of its movement. Creatures attempting to move into the wall must use their swimming speed (if any) or swim through it, and the interior of the wall is considered difficult terrain."
}

// Advanced shapes
SpellsList["bind-es"] = {
	name : "Bind",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 96]],
	level : 4,
	school : "",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "1 min (D)",
	save : "Str",
	description : "1 + 1/5PP creatures save or restrained for duration; extra save at end of each turn to stop",
	elementalDesc : "  Tier:  Advanced shape\n  Primal Power Cost:  5\n\n"+
	"You attempt to entrap a creature you can see within your area of elemental influence with elemental bonds. The target must succeed on a Strength saving throw or become restrained for the duration. A target so restrained can repeat the saving throw at the end of each of its turns, ending the effect on a success. Additionally, the shape gains the following property according to your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For each 5 primal power so expended, you can target an additional creature within range.",
	firstCol : 5,
	dependencies : []
}
SpellsList["bind-es-air"] = {
	name : "Bind: Air",
	source : [["ELCC", 96]],
	level : 4,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Restrained crea floats weightlessly off the ground and can be pushed +15 ft with shove action",
	elementalDesc : "While affected by the shape, the target is lifted off the ground and floats weightlessly in its space. While affected in this manner, if the target is shoved (per the shove aside action option), it can be pushed up to an additional 15 feet."
}
SpellsList["bind-es-earth"] = {
	name : "Bind: Earth",
	source : [["ELCC", 96]],
	level : 4,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Restrained crea falls to ground if airborne and can't become airborne again or be nonmagically moved",
	elementalDesc : "While affected by the shape and on the ground, the target cannot be forcibly moved from its space by nonmagical means. If the target is in the air when you affect it with this shape, it falls to the ground and cannot become airborne again for the duration of the effect."
}
SpellsList["bind-es-fire"] = {
	name : "Bind: Fire",
	source : [["ELCC", 96]],
	level : 4,
	school : "Fire",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "Con",
	description : "Restrained crea must save to speak; Crea's Fire resistance doesn't work, immunity becomes resistance",
	elementalDesc : "While affected by the shape, the target is wracked by agonizing pain. When it attempts to speak, it must first succeed on a Constitution saving throw or instead emit only agonized screams for the remainder of that turn. Additionally, affected creatures cannot have resistance to fire damage, and affected creatures immune to fire damage are instead resistant to it."
}
SpellsList["bind-es-water"] = {
	name : "Bind: Water",
	source : [["ELCC", 96]],
	level : 4,
	school : "Water",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Restrained creature can't regain HP and has disadv. on Int, Wis, and Cha saves",
	elementalDesc : "While affected by the shape, the target cannot regain hit points and has disadvantage on Intelligence, Wisdom, and Charisma saving throws."
}

SpellsList["bolt-es"] = {
	name : "Bolt",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 96]],
	level : 4,
	school : "",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "Instantaneous",
	save : "",
	description : "3+1/2PP bolts land in different 5-ft squares; all creatures within those take 1d8 damage",
	elementalDesc : "  Tier:  Advanced shape\n  Primal Power Cost:  3\n\n"+
	"You call down three elemental bolts from above, each of which land in different 5-foot spaces you can see within your area of elemental influence. Creatures in those spaces take 1d8 damage of the type corresponding to your elemental affinity, in addition to the following effects."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 2 primal power so expended, you can create an additional bolt.",
	firstCol : 3,
	dependencies : []
}
SpellsList["bolt-es-air"] = {
	name : "Bolt: Air",
	source : [["ELCC", 96]],
	level : 4,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Bludgeoning damage; Creatures hit are pushed 5 ft away from the affected space",
	elementalDesc : "The shape deals bludgeoning damage and pushes affected creatures 5 feet away from the affected space."
}
SpellsList["bolt-es-earth"] = {
	name : "Bolt: Earth",
	source : [["ELCC", 96]],
	level : 4,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Piercing damage; Affected spaces become difficult terrain if they are on the ground",
	elementalDesc : "The shape deals piercing damage and if the affected spaces are on the ground, they become difficult terrain."
}
SpellsList["bolt-es-fire"] = {
	name : "Bolt: Fire",
	source : [["ELCC", 96]],
	level : 4,
	school : "Fire",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Fire damage; Damage increases with my spellcasting ability modifier",
	elementalDesc : "The shape deals fire damage, and each bolt deals additional fire damage equal to your shaping ability modifier."
}
SpellsList["bolt-es-water"] = {
	name : "Bolt: Water",
	source : [["ELCC", 96]],
	level : 4,
	school : "Water",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Bludgeoning damage; Allies hit instead heal 1d8 HP",
	elementalDesc : "The shapes deals bludgeoning damage. Additionally, if an allied creature would take damage from a bolt, it instead takes no damage and regains 1d8 hit points."
}

SpellsList["bubble-es"] = {
	name : "Bubble",
	elementalShape : true,
	classes : ["elementalist-water"],
	source : [["ELCC", 97]],
	level : 4,
	school : "Water",
	time : "1 bns",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "1 min (D:bns)",
	description : "Ally in bubble 20+10/3PP temp HP; half cover both ways; ends if 0 temp HP; 1 bns fly it 30ft+5ft/3PP",
	descriptionMetric : "Ally in bubble 20+10/3PP temp HP; half cover both ways; ends if 0 temp HP; 1bns fly 10m+1,5m/3PP",
	// Book says "partial cover", but developer "Ryan S" explained that it should be "half cover"
	// https://discord.com/channels/266047351037100032/266048306180915213/725976072260157551
	descriptionFull : "  Tier:  Advanced shape\n  Primal Power Cost:  4\n\n"+
	"You wrap a friendly creature you can see within your area of elemental influence in a bubble of clear liquid for the duration. The target gains 20 temporary hit points for the duration of the shape and has half cover from everything outside the bubble, and vice versa. The bubble moves with the creature when the creature moves, and it is translucent, allowing creatures to see both into and out of it (though proportions are considerably distorted). As a bonus action you can dismiss the bubble or cause it to fly up 30 feet, moving the creature within. This shape immediately ends if the target's temporary hit points granted by this shape are reduced to 0."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 3 primal power so expended, the target gains an additional 10 temporary hit points, and when you take a bonus action to move the bubble, it can move an additional 5 feet.",
	firstCol : 4
}

SpellsList["plasma ray-es"] = {
	name : "Plasma Ray",
	elementalShape : true,
	classes : ["elementalist-fire"],
	source : [["ELCC", 97]],
	level : 4,
	school : "Fire",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "1 min",
	description : "Spell atk for 2d10+1d10/3PP Fire \u0026 2d10+1d10/3PP Radiant dmg; 1 a to repeat; ends if not repeated",
	descriptionFull : "  Tier:  Advanced shape\n  Primal Power Cost:  5\n\n"+
	"You fire a beam of superheated plasma at a creature you can see within your area of elemental influence, making a ranged spell attack against the target. On a hit, the target takes 2d10 fire and 2d10 radiant damage, and you project a continuous stream of plasma between you and the target. On each of your turns you use your action to make a ranged spell attack against the target, dealing 2d10 fire and 2d10 radiant damage on a successful hit. A target reduced to 0 hit points from this effect is reduced to a fine ash. The effect ends after 1 minute has passed, if you become unable to see the target, or if you do not take an action to maintain the effect."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 3 primal power so expended, a successful hit with the shape deals an additional 1d10 fire and 1d10 radiant damage.",
	firstCol : 5
}

SpellsList["stone block-es"] = {
	name : "Stone Block",
	elementalShape : true,
	classes : ["elementalist-earth"],
	source : [["ELCC", 97]],
	level : 4,
	school : "Earth",
	time : "1 bns",
	range : "5 ft", 
	components : "S",
	duration : "1 h (D)",
	save : "Dex",
	description : "5ft + 5ft/3PP stone cube; DC=AC, 80 hp; my melee atk push 60 ft: all save or dmg and pushed; see B",
	descriptionMetric : "1,5m+1,5m/3PP cube; DC=AC, 80 hp; my melee atk push 60 ft: all save or dmg and pushed; see book",
	descriptionFull : "  Tier:  Advanced shape\n  Primal Power Cost:  4\n\n"+
	"You cause a stone block to erupt from the ground in an unoccupied space within 5 feet of you. The block is a 5-foot-by-5-foot cube, a Medium object, has an AC equal to your elemental save DC, and has 80 hit points. When you make a successful melee attack against the block, you may record the damage and push the block up to 60 feet away from you in a straight line along the ground. If the block encounters a creature along its path, the creature must succeed on a Dexterity saving throw or take bludgeoning damage equal to your attack's damage. If the encountered creature is the Medium or smaller, it must succeed on a Strength saving throw or be pushed ahead of the block for the remainder of its movement, otherwise the block's movement ends."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 3 primal power so expended, all the block's dimensions increase by 5 feet.",
	firstCol : 4
}

SpellsList["suffocate-es"] = {
	name : "Suffocate",
	elementalShape : true,
	classes : ["elementalist-air"],
	source : [["ELCC", 97]],
	level : 4,
	school : "Air",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "10 min (D)",
	save : "Con",
	description : "1+1/4PP crea save or start suffocating; repeat save at end of each turn to stop effect",
	descriptionFull : "  Tier:  Advanced shape\n  Primal Power Cost:  4\n\n"+
	"You surround a creature you can see within your area of elemental influence in a layer of thin air that prevents it from breathing for the duration. The target must succeed on a Constitution saving throw to hold its breath or immediately begin suffocating. At the end of each of its turns, the target can repeat the saving throw, ending the effect on a success."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 4 primal power so expended, you can target an additional creature within range.",
	firstCol : 4
}

SpellsList["upgrade-es"] = {
	name : "Upgrade",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 97]],
	level : 4,
	school : "",
	time : "1 a",
	range : "Self",
	components : "S",
	duration : "1 min (D)",
	save : "",
	description : "I gain 1+1/5PP extra extremities out of primal material",
	elementalDesc : "  Tier:  Advanced shape\n  Primal Power Cost:  4\n\n"+
	"You augment your form with elemental power, creating new extremities out of primal material. The type and nature of your new extremities are determined by your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 5 primal power so expended, you create an additional set of extremities of the type of your affinity.",
	firstCol : 4,
	dependencies : []
}
SpellsList["upgrade-es-air"] = {
	name : "Upgrade: Air",
	source : [["ELCC", 97]],
	level : 4,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Pair of wings: +30 ft walking speed; I float slightly and can move along vertical surfaces and liquids",
	elementalDesc : "You form a pair of wings composed of graceful air, which increase your walking speed by 30 feet. Additionally, you float just above any surface you are standing on and can move along vertical surfaces or across liquids without falling during your turn."
}
SpellsList["upgrade-es-earth"] = {
	name : "Upgrade: Earth",
	source : [["ELCC", 97]],
	level : 4,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Pair of arms that I can use to hold things; 1+1/5PP extra attacks when I take the Attack action",
	elementalDesc : "You create a pair of powerful arms composed of earth. Each arm works just like your normal arms, providing you with an extra free hand. When you take the Attack action, you may make an additional attack for every pair of arms you create with this shape."
}
SpellsList["upgrade-es-fire"] = {
	name : "Upgrade: Fire",
	source : [["ELCC", 97]],
	level : 4,
	school : "Fire",
	time : "",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "",
	duration : "",
	save : "",
	description : "Pair of floating eyes; 1+1/5PP crea in range can't hide from me and disadvantage on saves vs. me",
	elementalDesc : "You create a pair of eyes formed of burning flames that float in front of your face. When you create a pair of eyes in this manner, you may choose a single creature you can see within range. For the duration of the shape, that creature cannot be hidden from you and has disadvantage on saving throws against you."
}
SpellsList["upgrade-es-water"] = {
	name : "Upgrade: Water",
	source : [["ELCC", 97]],
	level : 4,
	school : "Water",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Tentacle with 20 ft reach; can do touch effects; opportunity atk: spell atk to grapple, DC to escape",
	elementalDesc : "You create a tentacle of glistening water that protrudes from your back. The tentacle has a 20-foot reach and can deliver effects with a range of touch at that distance. Additionally, when you create a tentacle using this shape, you gain a special reaction for its duration. This reaction can only be used to make a melee spell attack against a creature that would provoke an opportunity attack from the tentacle. On a successful hit, the target is grappled by the tentacle, with an escape DC equal to your elemental save DC."
}

SpellsList["vortex-es"] = {
	name : "Vortex",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 98]],
	level : 4,
	school : "",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "1 min (D)",
	save : "Str",
	description : "20ft+10ft/3PP rad, 5ft high dif. ter.; crea start/enter save or 4d6+1d6/3PP dmg, pulled 10 ft to center",
	elementalDesc : "  Tier:  Advanced shape\n  Primal Power Cost:  5\n\n"+
	"A spiraling mass of elements appears in a 20-foot radius that is 5 feet high centered on a point you can see on the ground within your area of elemental influence. Until the effect ends, the area is difficult terrain, and any creature that starts its turn within the area must succeed on a Strength saving throw or take 4d6 damage of a type according to your elemental affinity and be pulled 10 feet toward the center of the effect. This shape has the following properties according to your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 3 primal power so expended, you can increase the radius of the effect by 10 feet and the damage of the effect by 1d6.",
	firstCol : 5,
	dependencies : []
}
SpellsList["vortex-es-air"] = {
	name : "Vortex: Air",
	source : [["ELCC", 98]],
	level : 4,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Thunder damage; can be centered on any point within range; all creatures within are deafened",
	elementalDesc : "The shape can be centered on a point you can see within the area, instead of a point on the ground. Additionally, the effect deals thunder damage, and any creatures within the effect are deafened for as long as they remain within the area."
}
SpellsList["vortex-es-earth"] = {
	name : "Vortex: Earth",
	source : [["ELCC", 98]],
	level : 4,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "Str",
	description : "Bludgeoning damage; Creatures starting its turn within save or speed 0 until end of its turn",
	elementalDesc : "The effect deals bludgeoning damage. Additionally, a creature starting its turn within the vortex must succeed on a Strength saving throw or have its speed reduced to 0 until the end of its turn."
}
SpellsList["vortex-es-fire"] = {
	name : "Vortex: Fire",
	source : [["ELCC", 98]],
	level : 4,
	school : "Fire",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Fire damage; Double damage to creatures starting their turn in the center",
	elementalDesc : "The effect deals fire damage. Additionally, if a creature starts its turn in the center of the effect's area, damage it takes from the vortex is doubled."
}
SpellsList["vortex-es-water"] = {
	name : "Vortex: Water",
	source : [["ELCC", 98]],
	level : 4,
	school : "Water",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Bludgeoning damage; Creatures of my choice are immune to all effects of this shape",
	elementalDesc : "The effect deals bludgeoning damage. Additionally, creatures of your choice are immune to all effects of the shape."
}

// Expert shapes
SpellsList["aftershock-es"] = {
	name : "Aftershock",
	elementalShape : true,
	classes : ["elementalist-earth"],
	source : [["ELCC", 98]],
	level : 6,
	school : "Earth",
	time : "1 bns",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "Instantaneous",
	save : "Con",
	description : "All crea in range that I damaged this turn save or prone; 1/3PP prone also stunned until its turn starts",
	descriptionFull : "  Tier:  Expert shape\n  Primal Power Cost:  8\n\n"+
	"You release a devastating seismic wave in your area of elemental influence. Creatures in the area that took damage from you that turn must succeed on a Constitution saving throw or be knocked prone."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 3 primal power you expend, a single creature knocked prone by the effect is also stunned until the start of its next turn.",
	firstCol : 8
}

SpellsList["breach-es"] = {
	name : "Gift",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 98]],
	level : 6,
	school : "",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "Instantaneous",
	save : "",
	description : "End 1 magical effect on 1 crea/obj; DC 10+SL Int chk; per extra 3PP: +1 target or end +1 effect",
	elementalDesc : "  Tier:  Expert shape\n  Primal Power Cost:  7\n\n"+
	"You attempt to shatter the bonds of magic with your elemental power. As a part of creating this shape you must choose a creature, object, or magical effect within your area of elemental influence. If the target is under the effects of a spell, you must attempt on an Intelligence ability check, immediately ending the spell on a success. The DC equals 10 + the spell's level. If the target is affected by multiple spells, you must attempt to end the highest-level spell possible. Additionally, on a successful check the shape gains the following benefits according to your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 3 primal power so expended, you can choose an additional target for the shape or attempt to end an additional spell on a target of the shape.",
	firstCol : 7,
	dependencies : []
}
SpellsList["breach-es-air"] = {
	name : "Gift: Air",
	source : [["ELCC", 98]],
	level : 6,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "If target is crea and if magical effect is ended, crea is pushed 30 ft in straight line in chosen direction",
	elementalDesc : "If the target of the shape is a creature, it is pushed 30 feet in a straight line in a direction of your choice."
}
SpellsList["breach-es-earth"] = {
	name : "Gift: Earth",
	source : [["ELCC", 98]],
	level : 6,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "If success: crea can't cast spells until its next turn ends, obj vulnerable to damage until my next turn",
	elementalDesc : "If the target of the shape is a creature, it cannot cast non-Epic spells until the end of its next turn. If the target of the shape is an object, it becomes vulnerable to damage until the start of your next turn."
}
SpellsList["breach-es-fire"] = {
	name : "Gift: Fire",
	source : [["ELCC", 98]],
	level : 6,
	school : "Fire",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "1d10 Fire damage per spell level ended",
	elementalDesc : "If the target of the shape is a creature or object, it takes 1d10 fire damage per level of the spell ended by the shape."
}
SpellsList["breach-es-water"] = {
	name : "Gift: Water",
	source : [["ELCC", 98]],
	level : 6,
	school : "Water",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "I heal 1d6 hit points per spell level ended",
	elementalDesc : "You regain 1d6 hit points per level of the spell ended by the shape."
}

SpellsList["cyclone-es"] = {
	name : "Cyclone",
	elementalShape : true,
	classes : ["elementalist-air"],
	source : [["ELCC", 99]],
	level : 6,
	school : "Air",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	rangeInfluenceFormat : "S:RANGELINE line",
	components : "S",
	duration : "1 min (D)",
	save : "Str",
	description : "5+5/4PP ft wide; 1 a swap angle; Medium (+size/4PP) crea enter/start in save or prone at start or end",
	descriptionMetric : "1,5+1,5/4PP m wide; 1 a swap angle; Med (+size/4PP) crea enter/start in save or prone at start/end",
	descriptionFull : "  Tier:  Expert shape\n  Primal Power Cost:  8\n\n"+
	"You project a whirling cyclone from your hand in a line that extends to the end of your area of elemental influence and is 5 feet wide. The cyclone lasts for 1 minute, and as an action you can point the cyclone in a direction of your choice. When a Medium or smaller creature comes into contact with the cyclone for the first time in a round, it must succeed on a Strength saving throw or be thrown away from you to the end of the line, or drawn toward the closest unoccupied space to you (your choice), landing prone in either case. This shape ends if you do not have a free hand available to project the cyclone or if you become incapacitated."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 4 primal power expended, you increase the width of the line by 5 feet, and the maximum size of a creature the cyclone can affect increases by one size category.",
	firstCol : 8
}

SpellsList["flood-es"] = {
	name : "Flood",
	elementalShape : true,
	classes : ["elementalist-water"],
	source : [["ELCC", 99]],
	level : 6,
	school : "Water",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	rangeInfluenceFormat : "S:RANGELINE circle",
	components : "S",
	duration : "1 min (D)",
	save : "Dex",
	description : "Water fills area 5ft+5ft/2PP deep; Difficult terrain if no swim speed; I'm empowered while submerged",
	descriptionMetric : "Water fills area 1,5+1,5/2PP m deep; Difficult terrain if no swim speed; I'm empowered if submerged",
	descriptionFull : "  Tier:  Expert shape\n  Primal Power Cost:  9\n\n"+
	"You flood your area of elemental influence with water that is 5 feet deep. The water appears on the ground and flows in directions determined by the terrain. Water from this shape that flows outside of your area of elemental influence vanishes, and any water that leaves the area is magically replenished instantly. The area is considered difficult terrain for creatures without a swimming speed. Additionally, while you are completely submerged within the water created by the flood, you are always empowered, as per your Elemental Empowerment feature. The shape immediately ends if no area of your elemental influence is in contact with the ground."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 2 primal power so expended, the depth of the flood increases by 5 feet.",
	firstCol : 9
}

SpellsList["gift-es"] = {
	name : "Gift",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 99]],
	level : 6,
	school : "",
	time : "1 a",
	range : "Touch",
	components : "S",
	duration : "1 min (D)",
	save : "",
	description : "1+1/6PP crea gain proficiency in a saving throw of their choice that I'm proficient in",
	elementalDesc : "  Tier:  Expert shape\n  Primal Power Cost:  8\n\n"+
	"You touch another willing creature within reach, mantling it in elemental energy and granting it a powerful boon for the duration. The target gains proficiency in a single saving throw of its choice that you are also proficient in, and advantage on saving throws against your elemental shapes. Additionally, it gains the following properties according to your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 6 primal power so expended, you can target an additional willing creature with this shape.",
	firstCol : 8,
	dependencies : []
}
SpellsList["gift-es-air"] = {
	name : "Gift: Air",
	source : [["ELCC", 99]],
	level : 6,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "The target's walking speed increases by 10 ft",
	elementalDesc : "The target's walking speed increases by 10 feet."
}
SpellsList["gift-es-earth"] = {
	name : "Gift: Earth",
	source : [["ELCC", 99]],
	level : 6,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "The target can't be forcibly moved or teleported unwillingly, while not incapacitated",
	elementalDesc : "While it is not incapacitated, the target cannot be forcibly moved or teleported unwillingly."
}
SpellsList["gift-es-fire"] = {
	name : "Gift: Fire",
	source : [["ELCC", 99]],
	level : 6,
	school : "Fire",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "The target takes no damage from my shapes if they make the save against that shape",
	elementalDesc : "When the target succeeds on a saving throw against one of your shapes and would take damage on a success, it instead takes no damage."
}
SpellsList["gift-es-water"] = {
	name : "Gift: Water",
	source : [["ELCC", 99]],
	level : 6,
	school : "Water",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "When the target regains hp from my shapes, I regain an equal amount of hp; only works once per turn",
	elementalDesc : "When the target regains hit points from your shapes, you regain an equal amount of hit points. This effect cannot occur more than once per turn."
}

SpellsList["meltdown-es"] = {
	name : "Meltdown",
	elementalShape : true,
	classes : ["elementalist-fire"],
	source : [["ELCC", 99]],
	level : 6,
	school : "Fire",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "1 min (D)",
	save : "Con",
	description : "1 crea lose 8d6+8d6/5PP hp & max hp at turn start; save half; stops at 3 good saves, heal magic; see B",
	descriptionFull : "  Tier:  Expert shape\n  Primal Power Cost:  9\n\n"+
	"You superheat a single object or creature you can see within the area of your elemental influence for the duration. At the start of each of its turns, the target must succeed on a Constitution saving throw or lose 8d6 hit points, or half as much on a success, and its hit point maximum is reduced by an amount equal to the hit points lost. This reduction ends if the target is affected by a greater restoration or heal spell, or similarly powerful healing magic. A target reduced to 0 hit points by this shape is melted down into charred remains. This shape ends if the target succeeds on three Constitution saving throws against the effect over the course of its duration."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 5 primal power so expended, the number of hit points the target loses increases by 8d6.",
	firstCol : 9
}

SpellsList["meteor-es"] = {
	name : "Meteor",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 99]],
	level : 6,
	school : "",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "Instantaneous",
	save : "",
	description : "20-ft radius sphere elemental explosion center in range; +1 explosion per 4 extra PP, but can't overlap",
	elementalDesc : "  Tier:  Expert shape\n  Primal Power Cost:  8\n\n"+
	"You conjure an elemental explosion centered on a point you can see within your area of elemental influence. The explosion is a 20-foot-radius sphere and has properties according to your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 4 primal power so expended, you can create an additional explosion whose affected area cannot include the area of another explosion created by the shape.",
	firstCol : 8,
	dependencies : []
}
SpellsList["meteor-es-air"] = {
	name : "Meteor: Air",
	source : [["ELCC", 99]],
	level : 6,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "Con",
	description : "All in spheres 8d10 Bludgeoning dmg & unconscious till its next turn starts; save half, not unconscious",
	elementalDesc : "Creatures in the area must succeed on a Constitution saving throw or take 8d10 bludgeoning damage and be knocked unconscious until the start of their next turn. A successful save halves the damage and prevents being knocked unconscious."
}
SpellsList["meteor-es-earth"] = {
	name : "Meteor: Earth",
	source : [["ELCC", 99]],
	level : 6,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "1 min",
	save : "Dex",
	description : "All in spheres 8d10 Piercing dmg; save half; dust cloud heavily obscures for duration, wind disperses",
	elementalDesc : "Creatures in the area must succeed on a Dexterity saving throw or take 8d10 piercing damage, or half as much on a success. Additionally, the area of the explosion is filled with a thick cloud of dust for 1 minute and is considered heavily obscured for the duration or until a strong wind disperses it."
}
SpellsList["meteor-es-fire"] = {
	name : "Meteor: Fire",
	source : [["ELCC", 100]],
	level : 6,
	school : "Fire",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "Dex",
	description : "All in spheres 4d10 Fire dmg, 4d10 Radiant dmg, and pushed to outer edge; save halves, not pushed",
	elementalDesc : "Creatures in the area must succeed on a Dexterity saving throw or take 4d10 fire damage and 4d10 radiant damage, or half as much on a success. Additionally, on a failed save a creature is pushed away from the center to the edge of the explosion's area."
}
SpellsList["meteor-es-water"] = {
	name : "Meteor: Water",
	source : [["ELCC", 100]],
	level : 6,
	school : "Water",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "Dex",
	description : "Chosen in spheres 4d10 Bludgeoning damage or heal 4d10 hp (chosen per crea); save halves damage",
	elementalDesc : "Creatures of your choice in the area must succeed on a Dexterity saving throw or take 4d10 bludgeoning damage, or half as much on a success, and other creatures of your choice in the area regain 4d10 hit points."
}

SpellsList["weapon-es"] = {
	name : "Weapon",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 100]],
	level : 6,
	school : "",
	time : "1 a",
	range : "Self",
	components : "S",
	duration : "10 min (D)",
	save : "",
	description : "Create a weapon in free hand for duration; spell attacks for attack rolls; +1/3PP to hit and dmg rolls",
	elementalDesc : "  Tier:  Expert shape\n  Primal Power Cost:  9\n\n"+
	"You forge a weapon fashioned from powerful elements which appears in your free hand and lasts for the duration. You are considered proficient with the weapon, and when you would make a weapon attack with it, you instead make a spell attack. The weapon has properties according to your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 3 primal power so expended, you gain a +1 bonus to attack and damage rolls with the weapon.",
	firstCol : 9,
	dependencies : []
}
SpellsList["weapon-es-air"] = {
	name : "Weapon: Air",
	source : [["ELCC", 100]],
	level : 6,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Weapon is a longbow with double range that deals +6d8 Thunder damage on a hit",
	elementalDesc : "The weapon is a longbow, and on a successful hit it deals an additional 6d8 thunder damage. Additionally, the range of the weapon is doubled."
}
SpellsList["weapon-es-earth"] = {
	name : "Weapon: Earth",
	source : [["ELCC", 100]],
	level : 6,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Weapon is a maul that deals +2d6 Piercing dmg; on crit: target is vulnerable for the rest of that turn",
	elementalDesc : "The weapon is a maul, and on a successful hit it deals an additional 2d6 piercing damage. When you score a critical hit with the weapon, the target becomes vulnerable to damage for the remainder of that turn."
}
SpellsList["weapon-es-fire"] = {
	name : "Weapon: Fire",
	source : [["ELCC", 100]],
	level : 6,
	school : "Fire",
	time : "",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "",
	duration : "",
	save : "",
	description : "Weapon is whip with reach equal to range; it deals +8d4 Fire damage on a hit",
	elementalDesc : "The weapon is a whip with a reach equal to your area of elemental influence, and on a successful hit it deals an additional 8d4 fire damage."
}
SpellsList["weapon-es-water"] = {
	name : "Weapon: Water",
	source : [["ELCC", 100]],
	level : 6,
	school : "Water",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Weapon is a trident that deals +3d6 Piercing damage; it returns to my hand at end of turn if thrown",
	elementalDesc : "The weapon is a trident and deals an additional 3d6 piercing damage on a successful hit. Additionally, if you throw the trident, it returns to your hand at the end of that turn."
}

// Master shapes
SpellsList["bloodshaping-es"] = {
	name : "Bloodshaping",
	elementalShape : true,
	classes : ["elementalist-water"],
	source : [["ELCC", 100]],
	level : 8,
	school : "Water",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "1 min (D)",
	description : "1 crea save or can't move/act; 1a control; repeat save at turn start; +5PP: +1 crea or 1 save at turn end",
	descriptionFull : "  Tier:  Master shape\n  Primal Power Cost:  12\n\n"+
	"You attempt to manipulate the liquid within the body of a flesh-and-blood creature you can see within your area of elemental influence. The target must succeed on a Constitution saving throw or be unable to voluntarily move or take actions for the duration. On each of your turns you can take an action to control the target's body like a puppet, forcing it to immediately take an action of your choice that it would ordinarily be able to take on its turn. If you do not have a clear idea of what the creature is capable of (such as whether it can cast specific spells), you cannot force it to take any actions associated with those capabilities. At the start of each of its turns, the target can attempt a Constitution saving throw, ending the effect on a success."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 5 primal power so expended, you can choose to either target an additional creature within range or force an affected creature to attempt Constitution saving throws to end the effect at the end of its turn instead of at the start.",
	firstCol : 12
}

SpellsList["cloud call-es"] = {
	name : "Cloud Call",
	elementalShape : true,
	classes : ["elementalist-air"],
	source : [["ELCC", 100]],
	level : 8,
	school : "Air",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "10 min (D)",
	description : "Clouds fill range, move with me; Allies in area lightly obscured and half cover; I'm always empowered",
	descriptionFull : "  Tier:  Master shape\n  Primal Power Cost:  12\n\n"+
	"You fill your area of elemental influence with thick, fluffy clouds for the duration or until you dismiss them as an action. Allied creatures in the area are lightly obscured and have half cover. Additionally, if you move while this shape is in effect, the clouds move with you. They cannot be dispersed by any wind unless you allow it. Finally, while this shape is in effect you are always empowered (as per your Elemental Empowerment feature).",
	firstCol : 12
}

SpellsList["inferno-es"] = {
	name : "Inferno",
	elementalShape : true,
	classes : ["elementalist-fire"],
	source : [["ELCC", 100]],
	level : 8,
	school : "Fire",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "Instantaneous",
	description : "All crea/obj in range take 5d6+1d6/3PP Fire dmg at the end of my turns; only magic can extinguish",
	descriptionFull : "  Tier:  Master shape\n  Primal Power Cost:  11\n\n"+
	"You generate a conflagration of epic proportions. Creatures, objects, and structures of your choice that you can see within your area of elemental influence catch fire. This fire is magical and can only be extinguished by magical means when inside your area of elemental influence. At the end of each of your turns, anything on fire from this shape takes 5d6 fire damage."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 3 primal power so expended, the damage dealt by the shape increases by 1d6.",
	firstCol : 11
}

SpellsList["pillar-es"] = {
	name : "Pillar",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 101]],
	level : 8,
	school : "",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "1 min (D)",
	save : "",
	description : "Create 15ft+15ft/4PP radius cylinder of elements; height equal to range; must be fully in range",
	elementalDesc : "  Tier:  Master shape\n  Primal Power Cost:  12\n\n"+
	"You generate a tremendous pillar of elements within your area of elemental influence. The pillar is a 15-foot-radius cylinder with a height that extends up to the end of your area of elemental influence. The pillar has the following properties according to your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can choose to expend additional primal power to augment the shape. For every 4 primal power so expended, the radius of the cylinder increases by 15 feet.",
	firstCol : 12,
	dependencies : []
}
SpellsList["pillar-es-air"] = {
	name : "Pillar: Air",
	source : [["ELCC", 101]],
	level : 8,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Area is vacuum, no sound, only magical flying, no breathing; crea that start inside lose 10d8 hp",
	elementalDesc : "The pillar is an empty vacuum devoid of air. Sound cannot pass through the area, nor can creatures fly in the area via nonmagical means, instead falling immediately. Additionally, creatures in the area cannot breathe, and any creatures in the area holding their breath lose 10d8 hit points at the start of each of their turns as the gas inside their lungs rapidly expands."
}
SpellsList["pillar-es-earth"] = {
	name : "Pillar: Earth",
	source : [["ELCC", 101]],
	level : 8,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "Dex",
	description : "Stone pillar rises, 200hp, empowers; crea on save or, if to ceiling, restrained,10d8 Bludg. dmg; see B",
	elementalDesc : "The pillar is a column of dense stone that emerges from the ground, which is an object with an AC equal to your elemental save DC and 200 hit points. While you are in contact with the pillar, you are always empowered, as per your Elemental Empowerment feature."+
	"\n   If the pillar appears beneath a creature, that creature must succeed on a Dexterity saving throw or be lifted by the pillar as it ascends. A creature can choose to fail the save. If the pillar is prevented from reaching its full height because of a solid obstacle, a creature on the pillar takes 10d8 bludgeoning damage and is restrained. A creature so restrained can take an action to attempt a Strength or Dexterity check (its choice) against your elemental save DC, freeing itself on a success. A creature so freed must move off of the top of the pillar or become retrained again at the end of that turn."
}
SpellsList["pillar-es-fire"] = {
	name : "Pillar: Fire",
	source : [["ELCC", 101]],
	level : 8,
	school : "Fire",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "Dex",
	description : "All creatures in area at creation or at the start of their turn 10d8 Fire damage; save halves",
	elementalDesc : "The pillar is a tornado of blazing fire. A creature standing in the area where the pillar appears or within the area at the start of its turn must succeed on a Dexterity saving throw or take 10d8 fire damage, or half as much on a success."
}
SpellsList["pillar-es-water"] = {
	name : "Pillar: Water",
	source : [["ELCC", 101]],
	level : 8,
	school : "Water",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "If crea enter I pick: heal 6d8 hp, or save or thrown 60 ft away and 6d8 Bludgeoning dmg on collision",
	elementalDesc : "The pillar is a column of flowing water. When a creature enters the area for the first time in a round, you can choose for it to either regain 6d8 hit points, or attempt a Strength saving throw. On a failure a creature is thrown 60 feet away from the pillar in a straight line and takes 6d8 bludgeoning damage if it collides with a solid object or surface over the course of that movement."
}

SpellsList["resonating crystal-es"] = {
	name : "Resonating Crystal",
	elementalShape : true,
	classes : ["elementalist-earth"],
	source : [["ELCC", 101]],
	level : 8,
	school : "Earth",
	time : "1 a",
	range : "Area of elemental influence",
	rangeInfluence : true,
	components : "S",
	duration : "1 min (D)",
	description : "Crystal hovers, 15 AC, 50+10/2PP hp; if I or ally takes dmg in 30 ft of crystal, it takes dmg instead",
	descriptionFull : "  Tier:  Master shape\n  Primal Power Cost:  10\n\n"+
	"You forge a perfect crystal in an unoccupied space you can see within your area of elemental influence that lasts for the duration. The crystal hovers in the space and is an object with an AC of 15 and 50 hit points. When you or allied creatures within 30 feet of the crystal take damage, you instead take no damage and the crystal loses a number of hit points equal to the damage that would have been dealt. When the crystal is reduced to 0 hit points, it shatters, and any remaining damage the crystal would have prevented is instead dealt to the original targets. The crystal always prioritizes reducing damage dealt to creatures closest to it."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 2 primal power so expended, the crystal's hit points when created increase by 10.",
	firstCol : 10
}

SpellsList["smite-es"] = {
	name : "Smite",
	elementalShape : true,
	classes : ["elementalist"],
	source : [["ELCC", 101]],
	level : 8,
	school : "",
	time : "1 bns",
	range : "Self",
	components : "S",
	duration : "1 min (D)",
	save : "",
	description : "1+1/9PP attacks in duration deal +14d6 damage; can only work once per turn; use after attack hits",
	elementalDesc : "  Tier:  Master shape\n  Primal Power Cost:  11\n\n"+
	"You gather elemental power within your body for the duration, which can be unleashed when you strike an enemy. When you hit with a melee or ranged attack before the duration ends, the attack deals an additional 14d6 damage. Once you have used this benefit, the shape ends. Additionally, the shape gains the following benefits according to your elemental affinity."+
	AugmentES + "When you create this shape while empowered, you can expend additional primal power. For every 9 primal power so expended, you gain an additional use of the shape's benefits before it ends (but no more than once per turn).",
	firstCol : 11,
	dependencies : []
}
SpellsList["smite-es-air"] = {
	name : "Smite: Air",
	source : [["ELCC", 101]],
	level : 8,
	school : "Air",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "Str",
	description : "Bludgeoning damage; crea hit save or drop everything held, which is thrown 30 ft in chosen direction",
	elementalDesc : "The additional damage from the shape is bludgeoning damage. If the target is a creature it must succeed on a Strength saving throw or drop anything it is holding. Any objects dropped in this manner are thrown 30 feet away from the target in a direction of your choice."
}
SpellsList["smite-es-earth"] = {
	name : "Smite: Earth",
	source : [["ELCC", 101]],
	level : 8,
	school : "Earth",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Piercing damage; if this is a melee attack that hits a creature, it is grappled, escape DC is save DC",
	elementalDesc : "The additional damage from the shape is piercing damage. If the attack is a melee attack and the target is a creature, the target is grappled (escape DC equal to your elemental save DC)."
}
SpellsList["smite-es-fire"] = {
	name : "Smite: Fire",
	source : [["ELCC", 101]],
	level : 8,
	school : "Fire",
	time : "",
	range : "",
	components : "",
	duration : "",
	save : "",
	description : "Fire damage; if the attack is a critical hit, I regain 11 Primal Power",
	elementalDesc : "The additional damage from the shape is fire damage. If the attack scores a critical hit, you gain 11 primal power, up to your maximum."
}
SpellsList["smite-es-water"] = {
	name : "Smite: Water",
	source : [["ELCC", 101]],
	level : 8,
	school : "Water",
	time : "",
	range : "",
	components : "",
	duration : "1 min",
	save : "Con",
	description : "Acid damage; crea hit save or deals only half damage for 1 min; repeat save at end of its turns to stop",
	elementalDesc : "The additional damage from the shape is acid. If the target of the attack is a creature, it must succeed on a Constitution saving throw or deal half damage for 1 minute. At the end of each of its turns, an affected creature can repeat the saving throw, ending the effect on a success."
}
