/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	3rd-party compendium
	Effect:		This script adds most player options from the book "Kibbles' Compendium of Craft and Creation"
				If you intend to use this script, please consider supporting the creator at https://www.patreon.com/KibblesTasty
				This script uses version v1.1.3, released 4th of March 2022
				You can purchase this book over at https://www.kickstarter.com/projects/kibblestasty/kibbles-compendium-of-craft-and-creation

	Content:	> Inventor class with 7 of its 10 subclasses
	        	   - Included: Cursesmith, Fleshsmith, Gadgetsmith, Infusionsmith, Potionsmith, Thundersmith, and Warsmith
				   - Not (yet) included: Golemsmith, Runesmith, and Relicsmith
				> 112 spells


	Code by:	Nod_Hero & PoetOfGod & MorePurpleMoreBetter
	Date:		2023-09-21 (sheet v13.1.9)
*/

var iFileName = "Kibbles' Compendium of Craft and Creation (v1.1.3).js";
RequiredSheetVersion("13.1.9");

SourceList["KCCC"] = {
	name : "Kibbles' Compendium of Craft and Creation (v1.1.3)",
	abbreviation : "KCCC",
	abbreviationSpellsheet: "KC",
	group : "Third Party",
	url : "https://www.kthomebrew.com/",
	date : "2022/03/04"
};

{ // INVENTOR CLASS START

// Global object with variables and functions that will be re-used in several places
KCCCglobal = {
	// the aKnown attributes set to false are used to store things during operation
	aKnown : false,
	aKnownTimeout : false,
	// The default number of upgrades an inventor knowns
	aKnownNoDefault : {
		"0"  : [0,0,1,1], // unrestricted upgrades
		"5"  : [0,0,0,0,1,1,2,2],
		"9"  : [0,0,0,0,0,0,0,0,1,1],
		"11" : [0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,3], // +1 at 20th-level
		"15" : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,3,3]
	},
	// Functions
	fn : {
		additional : function(strSubclass) {
			var aKnownNo = KCCCglobal.fn.get_aKnownNo(strSubclass);
			var oRe = {
				extraTimes : [],
				additional : [],
				description : []
			}
			levels.map(function(n) {
				var oAtLevel = KCCCglobal.fn.additional_noAtLevel(aKnownNo, n);
				oRe.extraTimes.push(oAtLevel.iTotal);
				if (!oAtLevel.iTotal) {
					oRe.additional.push("");
					return;
				}
				oRe.additional.push(oAtLevel.iTotal + " total upgrade" + (oAtLevel.iTotal > 1 ? "s" : "") + " known");
				var arrDesc = [[]];
				for (var lvl in oAtLevel) {
					if (lvl === "iTotal" || oAtLevel[lvl] === 0) continue;
					var strType = lvl == 0 ? "Unrestricted" : lvl + "th-level or lower";
					if (lvl > 10 && !arrDesc[1]) arrDesc[1] = [];
					arrDesc[arrDesc.length-1].push(strType + ": [" + oAtLevel[lvl] + " known]");
				}
				arrDesc[0] = arrDesc[0].join(", ");
				if (arrDesc[1]) arrDesc[1] = arrDesc[1].join(", ");
				arrDesc.push('Select upgrades using the "Choose Feature" button');
				oRe.description.push(desc(arrDesc));
			})
			return oRe;
		},
		additional_noAtLevel : function(aKnownNo, lvl) {
			// Return an object with the amount of allowed for each level
			var oRe = {iTotal : 0};
			for (var upgrLvl in aKnownNo) {
				var lvlUse = Math.min(aKnownNo[upgrLvl].length, lvl);
				oRe[upgrLvl] = aKnownNo[upgrLvl][lvlUse-1];
				oRe.iTotal += oRe[upgrLvl];
			}
			return oRe;
		},
		get_aKnownNo : function(strSubclass) {
			// Create a merged object of the default number and the subclass' bonus
			// Store it in this main object for reference
			if (!strSubclass) strSubclass = "";
			// Get the number of bonus upgrades for the given subclass
			strSubclass = strSubclass.replace("inventor-", "");
			var objBonus = KCCCglobal.bonusUpgrades[strSubclass];
			if (!objBonus) {
				// No bonus, so just reference the default object
				return KCCCglobal.aKnownNoDefault;
			};
			// Now create a merged object
			var oRe = {};
			for (var lvl in KCCCglobal.aKnownNoDefault) {
				var arrDeflt = KCCCglobal.aKnownNoDefault[lvl];
				var arrBonus = objBonus[lvl] ? objBonus[lvl] : [];
				oRe[lvl] = [];
				for (var i = 0; i < arrDeflt.length || i < arrBonus.length; i++) {
					var arrDefltNo = arrDeflt[i] ? arrDeflt[i] : 0;
					var arrBonusNo = arrBonus[i] ? arrBonus[i] : 0;
					oRe[lvl].push(arrDefltNo + arrBonusNo);
				}
			}
			return oRe;
		},
		clear_aKnown : function() {
			KCCCglobal.aKnown = false;
			KCCCglobal.aKnownTimeout = false;
			KCCCglobal.aKnownObj = false;
		},
		set_aKnown : function() {
			if (!KCCCglobal.aKnown) {
				KCCCglobal.aKnown = KCCCglobal.fn.currentChoices();
				KCCCglobal.fn.set_upgradeSubmenus();
				KCCCglobal.aKnownTimeout = app.setTimeOut("KCCCglobal.fn.clear_aKnown();", 1000);
			}
		},
		currentChoices : function(sAltClass) {
			var sClass = sAltClass ? sAltClass : "inventor";
			if (!CurrentClasses[sClass]) return [];
			// Get a list of all the choices for this class
			var aChoices = [], sChoice;
			if (CurrentClasses[sClass]) {
				// loop through the class' features
				for (var sFea in CurrentClasses[sClass].features) {
					// add the choice, if any
					sChoice = GetFeatureChoice("class", sClass, sFea);
					if (sChoice) aChoices.push(sChoice);
					// add the extrachoices, if any
					aChoices = aChoices.concat(GetFeatureChoice("class", sClass, sFea, true));
				}
			}
			return aChoices;
		},
		set_upgradeSubmenus : function() {
			// Set the submenu items of all their subclass choices
			// to reflect the amount of allowed and currently picked choices
			if (!classes.known.inventor.subclass) return;
			var iLvl;
			var objSubFea3 = CurrentClasses.inventor.features.subclassfeature3;
			var strSubclass = classes.known.inventor.subclass.replace("inventor-", "");
			var aKnownNo = KCCCglobal.fn.get_aKnownNo(classes.known.inventor.subclass);
			// First count the number of currently selected upgrades for subclassfeature3
			var aSelected = GetFeatureChoice("class", "inventor", "subclassfeature3", true);
			var objSelected = { "0" : 0, "5" : 0, "9" : 0, "11" : 0, "15" : 0 };
			var objAllowed = KCCCglobal.fn.additional_noAtLevel(aKnownNo, classes.known.inventor.level);
			// count the number selected
			for (var i = 0; i < aSelected.length; i++) {
				var sUpgr = aSelected[i];
				iLvl = objSubFea3[sUpgr].KCCClevel ? objSubFea3[sUpgr].KCCClevel.toString() : "0";
				objSelected[iLvl]++;
			}
			// Make the submenu texts
			var objSubmenuTxt = {};
			for (var lvl in objSelected) {
				iLvl = Number(lvl);
				objSubmenuTxt[lvl] = iLvl === 0 ? "  Unrestricted Upgrades" : (iLvl < 10 ? " "+iLvl+"th" : iLvl+"th") + "-Level Upgrades";
				if (objSelected[lvl] || objAllowed[lvl]) {
					objSubmenuTxt[lvl] += " (selected " + objSelected[lvl] + " of " + objAllowed[lvl] + ")";
				}
			}
			// Now loop over the upgrades and set the correct submenu name
			if (KCCCglobal.upgrades[strSubclass]) {
				for (var i = 0; i < KCCCglobal.upgrades[strSubclass].length; i++) {
					var iLvl = KCCCglobal.upgrades[strSubclass][i].KCCClevel ? KCCCglobal.upgrades[strSubclass][i].KCCClevel.toString() : "0";
					KCCCglobal.upgrades[strSubclass][i].submenu = objSubmenuTxt[iLvl];
				}
			}
			for (var i = 0; i < KCCCglobal.upgrades.generic.length; i++) {
				var iLvl = KCCCglobal.upgrades.generic[i].KCCClevel ? KCCCglobal.upgrades.generic[i].KCCClevel.toString() : "0";
				KCCCglobal.upgrades.generic[i].submenu = objSubmenuTxt[iLvl];
			}
		},
		featureKnown : function (sUpgrade) {
			// see if all of the Inventor upgrades in the array aUpgrades are known
			KCCCglobal.fn.set_aKnown();
			return KCCCglobal.aKnown.indexOf(sUpgrade.toLowerCase()) !== -1;
		},
		itemKnown : function (sInput) {
			var sItem = false, sChoice = false;
			if (isArray(sInput) && sInput[1]) {
				// if this is an array with an item and its choice
				var sItem = sInput[0].toLowerCase();
				var sChoice = sInput[1].toLowerCase();
			} else {
				var sItem = sInput.toString().toLowerCase();
			}
			var iItem = CurrentMagicItems.known.indexOf(sItem);
			if (!sItem || iItem === -1 || (sChoice && CurrentMagicItems.choices[iItem] !== sChoice)) {
				return false;
			} else {
				return true;
			}
		},
		prereqeval : function(v) {
			if (!CurrentClasses.inventor) return false;
			var sUpgr = v.choice; // the name of the current choice
			// See if this choice isn't already selected in some way for another feature,
			// because then we need to mark it and disable it for this selection
			// note that this is ignored by the base code if the choice is active for the current feature, so no chance of making in impossible to remove a choice
			KCCCglobal.fn.set_aKnown();
			if (KCCCglobal.aKnown.indexOf(sUpgr) !== -1) return "markButDisable";
			// Find the object for the current choice in a subclassfeature (not in cross-disciplinary knowledge)
			for (var sFea in CurrentClasses.inventor.features) {
				var objUpgr = CurrentClasses.inventor.features[sFea][sUpgr];
				if (objUpgr) break;
			}
			// stop here if the object for this upgrade is not found
			if (!objUpgr) return false;
			// if this choice has a minimum inventor level requirement, check it
			if (objUpgr.KCCClevel && classes.known.inventor.level < objUpgr.KCCClevel) {
				return false;
			}
			// if this choice has some defined prerequisites, check those
			if (objUpgr.prereqKCCC) {
				// check if all the prerequisite features are available
				if (objUpgr.prereqKCCC.featuresAnd && !objUpgr.prereqKCCC.featuresAnd.every(KCCCglobal.fn.featureKnown)) {
					return false;
				}
				if (objUpgr.prereqKCCC.featuresOr && !objUpgr.prereqKCCC.featuresOr.some(KCCCglobal.fn.featureKnown)) {
					return false;
				}
				if (objUpgr.prereqKCCC.featuresNot && objUpgr.prereqKCCC.featuresNot.some(KCCCglobal.fn.featureKnown)) {
					return false;
				}
				if (objUpgr.prereqKCCC.featuresFilter && objUpgr.prereqKCCC.featuresFilter[1](objUpgr.prereqKCCC.featuresFilter[0].filter(KCCCglobal.fn.featureKnown).length)) {
					return false; // Added for Cursesmith, used for Fleshsmith as well
				}
				// check if all the prerequisite magic items are available
				if (objUpgr.prereqKCCC.itemsAnd && !objUpgr.prereqKCCC.itemsAnd.every(KCCCglobal.fn.itemKnown)) {
					return false;
				}
				if (objUpgr.prereqKCCC.itemsOr && !objUpgr.prereqKCCC.itemsOr.some(KCCCglobal.fn.itemKnown)) {
					return false;
				}
				if (objUpgr.prereqKCCC.itemsNot && objUpgr.prereqKCCC.itemsNot.some(KCCCglobal.fn.itemKnown)) {
					return false;
				}
			}
			return true; // everything good
		},
		// Function to automate creation of Magical Wands and Rods for the Infusionsmith
		// Will prevent revisioning this feature taking huge amounts of time, allows for easy creation of the required number of duplicates
		// type = string ("Wand" or "Rod")
		// level = string level of the spell for the item
		// prereqlevel = inventor level needed to take this upgrade, set to false if the level is the same as one of the tier numbers
		// number = int number, for duplicates of the same item, is not needed for the first
		// tierlevel = the tier the upgrade would fall under
		upgradeWandorRod : function(type, spellLevel, prereqlevel, number=1, tierlevel=false) {
			numberSuffix = {2: "2nd", 3 : "3rd", 4 : "4th", 5 : "5th", 6 : "6th", 7 : "7th", 8 : "8th", 9 : "9th", 10 : "10th"}
			upgrade = {};
			if (tierlevel) upgrade.KCCClevel = tierlevel
			upgrade.name = "Magical " + type + " of... (" + spellLevel + ")";
			if (number && numberSuffix[number]) {
				upgrade.name += ", " + numberSuffix[number]
				prevUpgradeString = "magical " + type.toLowerCase() + " of... (" + spellLevel + ")";
				if (number > 2) prevUpgradeString += ", " + numberSuffix[number - 1]
				if (prereqlevel) prevUpgradeString += " (prereq: level " + prereqlevel + " inventor)"
				upgrade.prereqKCCC = { featuresAnd : [prevUpgradeString] };
			}
			if (prereqlevel) {
				upgrade.listname = upgrade.name + " (prereq: level " + prereqlevel + " inventor)"
				// We need to save the prereqlevel in the object, so that it can be used in the prereqeval function
				// note that we need to pass the `v` variable to the global prereqeval function and that that function could return something else than a boolean, so we need to call it separately
				if (number == 1) {
					upgrade.prereqlevel = prereqlevel;
					upgrade.prereqeval = function(v) {
						if (classes.known.inventor.level < CurrentClasses.inventor.features.subclassfeature3[v.choice].prereqlevel) return false;
						return KCCCglobal.fn.prereqeval(v);
					};
				}
			}
			upgrade.source = [["KCCC", type=="Wand" ? 24 : 26]];
			if (number == 1) {
				upgrade.description = desc([
					"I create a " + type.toLowerCase() + " that I infuse with a " + spellLevel + " spell from my Spell Manual",
					"It doesn't require attunement, but can only be used by me",
					"I can cast the spell at its lowest level without using a spell slot"
				])
			} else {
				upgrade.description = desc([
					"I create a " + type.toLowerCase() + " of a different " + spellLevel + " spell from my Spell Manual"
				])
			}
			upgrade.usages = type=="Wand" ? 3 : 1,
			upgrade.recovery = "long rest"
			upgrade.spellcastingBonus = [{
				name : "Magical " + type + " of " + spellLevel,
				spells : [], // to be filled with the Spell Manual spells
				level : [parseInt(spellLevel), parseInt(spellLevel)],
				firstCol : type=="Wand" ? "3\xD7" : "1\xD7",
				isInventorUpgradedWandOrRod : true
			}]
			return upgrade;
		},
		// Function to create and maintain a custom CurrentSpells object for all the magic items of the Cursesmith
		magicItemSpells : function(bAdd, sItemName, spellcastingBonus, spellChanges) {
			var sCastName = 'inventor-cursesmith magic items';
			if (bAdd && !CurrentSpells[sCastName]) {
				// CurrentSpells object is not yet defined, so create it
				CurrentSpells[sCastName] = {
					name : 'Cursesmith Items',
					ability : "inventor",
					typeSp : "item",
					refType : "item",
					bonus : {}
				};
			}
			if (spellcastingBonus) {
				// when removing bonus spells, this function will delete the whole CurrentSpells object if it is the last being removed
				processSpBonus(bAdd, sItemName, spellcastingBonus, "items", sCastName);
			}
			if (spellChanges) {
				processSpChanges(bAdd, sItemName, spellChanges, sCastName);
			}
		}
	},
	// The upgrades, to be filled with attributes of each subclass' name (e.g. `KCCCglobal.upgrades.warsmith`)
	upgrades : {
		generic : [{
			name : "Shield Proficiency",
			source : [["KCCC", 13]],
			description : "",
			armorProfs : [false, false, false, true]
		}, {
			name : "Tool Proficiency",
			source : [["KCCC", 13]],
			description : " [any one tool of my choice]",
			toolProfs : [["Any tool of my choice", 1]],
		}]
	},
	// The number of bonus upgrades known for each subclass
	bonusUpgrades : {}
}

// Inventor class and subclasses
ClassList['inventor'] = {
	regExpSearch : /^(?=.*inventor)(?!.*wizard)(?!.*artificer).*$/i,
	name : "Inventor",
	source : [["KCCC", 10]],
	primaryAbility : "Intelligence",
	abilitySave : 4,
	prereqs : "Intelligence 13",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 8,
	saves : ["Con", "Int"],
	skillstxt : {
		primary : "Choose three from Arcana, Deception, History, Investigation, Medicine, Nature, Religion, and Sleight of Hand",
		secondary : "Choose one from Arcana"
	},
	toolProfs : {
		primary : [["Thieves' tools", "Dex"], ["Artisan's tools", 1]],
		secondary : [["Artisan's tools", 1]]
	},
	armorProfs : {
		primary : [true, true, false, false],
		secondary : [true, false, false, false]
	},
	weaponProfs : {
		primary : [true, false, ["hand crossbow", "heavy crossbow"]],
		secondary : [true, false, false]
	},
	equipment : "Inventor starting equipment:"+
		"\n \u2022 A light crossbow and case of 20 bolts -or- any two simple weapons;" +
		"\n \u2022 Leather armor -or- scale mail -or- chain mail (if proficient);" +
		"\n \u2022 Thieves' tools;" +
		"\n \u2022 Dungeoneer's pack;" +
		"\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Inventor Specialization", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : 2,
	spellcastingKnown : {
		spells : [0, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12]
	},
	features : {
		"magic item analysis" : {
			name : "Magic Item Analysis",
			source : [["KCCC", 12]],
			minlevel : 1,
			description : desc([
				"I know Detect Magic \u0026 Identify; I can cast each as a ritual without material components"
			]),
			spellcastingBonus : [{
				name : "Magic Item Analysis",
				spells : ["detect magic", "identify"],
				selection : ["detect magic", "identify"],
				times : 2
			}],
			spellChanges : {
				"identify" : {
					components : "VSM\u0192*",
					compMaterial : SpellsList.identify.compMaterial + " (not needed when casting as a ritual)",
					changes : "When using my Magic Item Analysis class feature, I can cast Identify as a ritual without using any material components."
				}
			}
		},
		"subclassfeature1" : {
			name : "Inventor Specialization",
			source : [["KCCC", 12]],
			minlevel : 1,
			description : desc('Choose a specialization and put it in the "Class" field on the first page')
		},
		"arcane retrofit" : {
			name : "Arcane Retrofit",
			source : [["KCCC", 12]],
			minlevel : 2,
			description : " [can convert magic armor to lighter armor type]" + desc([
				"I can perform a ritual during a long rest to transfer the attack and damage bonus from",
				"a magical weapon unto an inventor weapon or weapon-like upgrade (only the +1/2/3)",
				"I can't do this for artifacts or sentient weapons; This process destroys the magic weapon"
			])
		},
		"spellcasting" : {
			name : "Spellcasting",
			source : [["KCCC", 12]],
			minlevel : 2,
			description : desc([
				"I can cast known inventor spells, using Intelligence as my spellcasting ability",
				"I can use an arcane focus as a spellcasting focus for my inventor spells",
				"Whenever I gain an inventor level, I can swap one inventor spell I know for another"
			]),
			additional : levels.map(function (n, idx) {
				return [0, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12][idx] + " spells known";
			})
		},
		"tool expertise" : {
			name : "Tool Expertise",
			source : [["KCCC", 12]],
			minlevel : 2,
			description : " [expertise with tool profs gained from inventor]",
			skillstxt : "Expertise with all tool proficiencies gained from the inventor class (not automated)"
		},
		"arcane reconstruction" : {
			name : "Arcane Reconstruction",
			source : [["KCCC", 13]],
			minlevel : 6,
			description : desc([
				"I know the Mending cantrip and Cure Wounds; My Cure Wounds can heal constructs"
			]),
			spellcastingBonus : [{
				name : "Arcane Reconstruction",
				spells : ["mending", "cure wounds"],
				selection : ["mending", "cure wounds"],
				times : 2
			}],
			spellChanges : {
				"cure wounds" : {
					description : "1 living creature or construct heals 1d8+1d8/SL+spellcasting ability modifier HP",
					changes : "Constructs targeted by my Cure Wounds can regain hit points as normal."
				}
			}
		},
		"cross-disciplinary knowledge" : {
			name : "Cross-Disciplinary Knowledge",
			source : [["KCCC", 13]],
			minlevel : 6,
			description : desc([
				'I can select an upgrade or item from another subclass, see the "Choose Feature" button'
			]),
			extraname : "Cross-Disciplinary",
			extraTimes : [1],
			extrachoices : ["Animated Weapon", "Blasting Rod", "Infused Weapon", "Stormforged Weapon"],
			"animated weapon" : {
				name : "Animated Weapon",
				source : [["KCCC", 23]],
				submenu : "Infusionsmith's Infused Armament",
				prereqeval : function() {
					return classes.known.inventor.subclass.indexOf("infusionsmith") !== -1 ? "skip" : true;
				},
				description : desc([
					"When I finish a long rest, I can touch a melee weapon to make it an Animated Weapon",
					"This magic item lasts until the end of my next long rest"
				]),
				magicitemsAdd : ["Animated Weapon"]
			},
			"blasting rod" : {
				name : "Blasting Rod",
				source : [["KCCC", 23]],
				submenu : "Infusionsmith's Infused Armament",
				prereqeval : function() {
					return classes.known.inventor.subclass.indexOf("infusionsmith") !== -1 ? "skip" : true;
				},
				description : desc([
					"When I finish a long rest, I can touch a non-magical object to turn it into a Blasting Rod",
					"This magic item lasts until the end of my next long rest"
				]),
				magicitemsAdd : ["Blasting Rod"]
			},
			"infused weapon" : {
				name : "Infused Weapon",
				source : [["KCCC", 23]],
				submenu : "Infusionsmith's Infused Armament",
				prereqeval : function() {
					return classes.known.inventor.subclass.indexOf("infusionsmith") !== -1 ? "skip" : true;
				},
				description : desc([
					"Whenever I finish a long rest, I can touch a weapon to turn it into an Infused Weapon",
					"This magic item lasts until the end of my next long rest"
				]),
				magicitemsAdd : ["Infused Weapon"]
			},
			"stormforged weapon" : {
				name : "Stormforged Weapon",
				source : [["KCCC", 32]],
				submenu : "Thundersmith's Stormforged Weapon",
				prereqeval : function() {
					return classes.known.inventor.subclass.indexOf("thundersmith") !== -1 ? "skip" : true;
				},
				description : desc([
					"I can create special magic weapons in 3 days for 200 gp, see magic item",
					"I can only attune to a single one of these at a time; Attunement takes a long rest"
				]),
				magicitemsAdd : ["Stormforged Weapon"]
			}
		},
		"wondrous item proficiency" : {
			name : "Wondrous Item Proficiency",
			source : [["KCCC", 13]],
			minlevel : 7,
			description :  levels.map(function(n) { return  n < 18 ? "\n   I ignore all class requirements on the use of magic items" : ""}),
			additional : levels.map(function(n) { return n < 7 ? "" : n < 18 ? "attune to 4 magic items" : "ignore magic item class requirements"})
		},
		"improved magical crafting" : {
			name : "Improved Magical Crafting",
			source : [["KCCC", 13]],
			minlevel : 10,
			description : " [1 hr of magic item crafting in a LR]" + desc([
				"Creating a non-consumable magic item takes me half the time it would normally take"
			])
		},
		"wondrous item recharge" : {
			name : "Wondrous Item Recharge",
			source : [["KCCC", 13]],
			minlevel : 10,
			description : desc([
				"With a 1-minute ritual I can restore charges to a magic item that can only cast spells",
				"I must expend a spell slot of a level equal to a spell that the magic item can cast",
				"This then restores as many charges as the magic item would use to cast that spell"
			])
		},
		"study of magic" : {
			name : "Study of Magic",
			source : [["KCCC", 13]],
			minlevel : 11,
			description : " [Detect Magic \u0026 Identify at will]" + desc([
				"I have advantage on Int (Arcana) checks to understand magical traps, effects, and runes"
			]),
			spellChanges : {
				"identify" : {
					firstCol : "atwill",
					changes : "Using my Study of Magic class feature, I can cast Identify at will, without using a spell slot, but it does require the material component."
				},
				"detect magic" : {
					firstCol : "atwill",
					changes : "Using my Study of Magic class feature, I can cast Detect Magic at will, without using a spell slot."
				}
			}
		},
		"wondrous item mastery" : {
			name : "Wondrous Item Mastery",
			source : [["KCCC", 13]],
			minlevel : 18,
			description : " [attune to 5 magic items]" +
				desc("As a bonus action, I can use a magic item that normally takes an action to use"),
			action : [["bonus action", "Use any 1-action magic item"]]
		},
		"peerless inventor" : {
			name : "Peerless Inventor",
			source : [["KCCC", 13]],
			minlevel : 20,
			description : " [bonus level 11 upgrade, included above]" + desc([
				"At the end of a short or long rest, I can temporarily gain an upgrade from my subclass",
				"This lasts until I finish a short or long rest, when I select another temporary upgrade"
			])
		}
	}
};

{// Set the spells for the inventor class (only the non-KCCC spells)
[
	// 1st level
	"alarm",
	"comprehend languages",
	"cure wounds",
	//"detect magic", // adding it here makes no sense, as it is gained as a bonus spell at 1st-level
	"disguise self",
	"expeditious retreat",
	"false life",
	"feather fall",
	"grease",
	//"identify", // adding it here makes no sense, as it is gained as a bonus spell at 1st-level
	"illusory script",
	"jump",
	"longstrider",
	"sanctuary",
	"tenser's floating disk",
	"unseen servant",
	// 2nd level
	"aid",
	"alter self",
	"nystul's magic aura",
	"arcane lock",
	"blur",
	"darkvision",
	"enhance ability",
	"enlarge/reduce",
	"find traps",
	"heat metal",
	"hold person",
	"invisibility",
	"knock",
	"locate object",
	"magic weapon",
	"magic mouth",
	"protection from poison",
	"see invisibility",
	"spider climb",
	// 3rd level
	"dispel magic",
	"gaseous form",
	"glyph of warding",
	"magic circle",
	"nondetection",
	"protection from energy",
	"sending",
	"water breathing",
	"water walk",
	"wind wall",
	// 4th level
	"arcane eye",
	"death ward",
	"fabricate",
	"fire shield",
	"freedom of movement",
	"greater invisibility",
	"otiluke's resilient sphere",
	"leomund's secret chest",
	"stone shape",
	"stoneskin",
	// 5th level
	"animate objects",
	"creation",
	"hold monster",
	"legend lore",
	"mislead",
	"passwall",
	"telekinesis",
	"teleportation circle",
	"wall of stone"
].forEach( function (s) {
	if(SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("inventor") === -1) SpellsList[s].classes.push("inventor");
})
}

{// Gadgetsmith subclass DONE
// The number of bonus upgrades
KCCCglobal.bonusUpgrades.gadgetsmith = {
	'0' : [0,0,1,1],
	'5' : [0,0,0,0,1,1,1,1]
};
var KCCC_gadgetsmith = AddSubClass("inventor", "gadgetsmith", {
	regExpSearch : /^((?=.*(gadget|trick))(?=.*smith)|(?=.*gadgeteer)).*$/i,
	subname : "Gadgetsmith",
	fullname : "Gadgetsmith",
	source : [["KCCC", 14]],
	weaponProfs : [false, false, ["net", "rapier", "whip"]],
	toolProfs : ["Tinker's tools"],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature1" : {
			name : "Essential Tools",
			source : [["KCCC", 14]],
			minlevel : 1,
			description : ' [use "Choose Feature" for gadgetsmith weapon]' + desc([
				"I can forgo any attack to throw my grappling hook within 20 ft of me",
				" \u2022 The target can be a creature, object, or surface; Medium or larger; pull myself to it",
				" \u2022 Small or smaller; grapple check to pull it to me and grapple it",
				" \u2022 Opportunity attacks provoked from this movement have disadvantage",
				"As an action I can cast Fog Cloud on myself with a radius of 5 ft, 10 ft, 15 ft, or 20 ft",
				" \u2022 This doesn't expend a spell slot or require Concentration; Lasts Int mod rounds"
			]),
			spellcastingBonus : [{
				name : "Smoke Bomb",
				spells : ["fog cloud"],
				selection : ["fog cloud"],
				firstCol : "atwill"
			}],
			spellChanges : {
				"fog cloud" : {
					name : "Smoke Bomb",
					duration : "Int mod rnd",
					description : "5-ft to 20-ft rad fog that spreads around corners; heavily obscures; 10 mph wind disperses it",
					range : "Self",
					changes : "When I cast Fog Cloud using the Essential Tools feature it doesn't require Concentration, lasts for a number of rounds equal to my Intelligence modifier, is cast centered on myself, and I can choose the radius of 5 ft, 10 ft, 15 ft, or 20 ft."
				}
			},
			extraname : "Gadgetsmith Weapon",
			extrachoices : [
				"Impact Gauntlet", "Power Fist (variant, needs DM approval)",
				"Lightning Baton", "Repeating Hand Crossbow",
				"Ricocheting Weapon, Bludgeoning", "Ricocheting Weapon, Piercing", "Ricocheting Weapon, Slashing",
				"Shock Generator"
			],
			extraTimes : [1],
			"impact gauntlet" : {
				name : "Impact Gauntlet",
				prereqKCCC : {
					// also is an option for the warsmith, but different listing
					featuresNot : ["impact gauntlet (variant, needs dm approval)"]
				},
				source : [["KCCC", 15]],
				description : " [melee, light, finesse, 1d6 bludgeoning]" + desc([
					"I can forgo adding my Prof Bonus to its attack roll and add it twice to its damage instead"
				]),
				weaponsAdd : ["Impact Gauntlet"],
				weaponOptions : {
					regExpSearch : /^(?=.*impact)(?=.*gauntlet).*$/i,
					name : "Impact Gauntlet",
					source : [["KCCC", 38]],
					ability : 1,
					type : "AlwaysProf",
					damage : [1, 6, "bludgeoning"],
					range : "Melee",
					description : "Finesse, light; Can forgo Prof Bonus to hit, add Prof Bonus \xD72 damage",
					tooltip : "Special: When I make an attack with this weapon, I can choose to forgo adding my proficiency bonus to the attack roll to add twice that amount to the damage roll.",
					isMagicWeapon : true,
					special : true,
					abilitytodamage : true
				}
			},
			"power fist (variant, needs dm approval)" : {
				listname : "Power Fist (variant, needs DM approval)",
				prereqKCCC : {
					// also is an option for the warsmith, but different listing
					featuresNot : ["power fist"]
				},
				name : "Power Fist",
				source : [["KCCC", 38]],
				description : " [melee, light, 1d8 bludgeoning damage]" + desc([
					"I can forgo adding my Prof Bonus to its attack roll and add it twice to its damage instead"
				]),
				weaponsAdd : ["Power Fist"],
				weaponOptions : {
					regExpSearch : /^(?=.*power)(?=.*fist).*$/i,
					name : "Power Fist",
					source : [["KCCC", 38]],
					ability : 1,
					type : "AlwaysProf",
					damage : [1, 8, "bludgeoning"],
					range : "Melee",
					description : "Light; Can forgo Prof Bonus to hit, add Prof Bonus \xD72 damage",
					tooltip : "Special: When I make an attack with this weapon, I can choose to forgo adding my proficiency bonus to the attack roll to add twice that amount to the damage roll.",
					isMagicWeapon : true,
					special : true,
					abilitytodamage : true
				}
			},
			"lightning baton" : {
				name : "Lightning Baton",
				source : [["KCCC", 15]],
				description : " [finesse, light, 1d4 bludgeoning damage]" + desc([
					"Does an extra 1d4 lightning damage; A roll of 20 to hit shocks the target",
					"They make a Con save vs my spell save DC or are stunned until my next turn"
				]),
				weaponsAdd : ["Lightning Baton"],
				weaponOptions : {
					regExpSearch : /^(?=.*lightning)(?=.*baton).*$/i,
					name : "Lightning Baton",
					source : [["KCCC", 15]],
					ability : 1,
					type : "Simple",
					damage : [1, 4, "bludgeoning"],
					range : "Melee",
					description : "Finesse, light, +1d4 lightning damage; Nat 20 to hit: Con save or stunned until my next turn",
					tooltip : "When I roll a 20 on an attack roll made with this weapon, the target must succeed a Constitution saving throw against your spell save DC or become stunned until the start of your next turn",
					isMagicWeapon : true,
					abilitytodamage : true,
					isAlwaysProf : true
				}
			},
			"repeating hand crossbow" : {
				name : "Repeating Hand Crossbow",
				source : [["KCCC", 16]],
				description : desc([
					"When I make an attack with it and don't have disadvantage I can take it with disadvantage",
					"If I do so, then I can make an attack with this weapon as a bonus action with disadvantage",
					"This weapon doesn't require a free hand to load"
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.WeaponName == "hand crossbow" && (/\brepeating\b/i).test(v.WeaponTextName)) {
								fields.Proficiency = true;
								fields.Description = fields.Description.replace(/[,;]? ?loading/i,'') + "; See inventor feature";
								v.theWea.special = true;
							}
						},
						'If I include the word "Repeating" in the name of a Hand Crossbow, it will be treated as the magic weapon Repeating Hand Crossbow.'
					]
				},
				weaponsAdd : ["Repeating Hand Crossbow"]
			},
			"ricocheting weapon, bludgeoning" : {
				name : "Ricocheting Weapon, Bludgeoning",
				prereqKCCC : {
					featuresNot : ["ricocheting weapon, piercing", "ricocheting weapon, slashing"]
				},
				source : [["KCCC", 16]],
				description : desc([
					"I create a custom Ricocheting Weapon that deals bludgeoning damage"
				]),
				weaponsAdd : ["Ricocheting Weapon"],
				weaponOptions : {
					regExpSearch : /^(?=.*ricocheting)(?=.*weapon).*$/i,
					name : "Ricocheting Weapon",
					source : [["KCCC", 16]],
					ability : 2,
					type : "AlwaysProf",
					damage : [1, 8, "bludgeoning"],
					range : "Melee, 30/90 ft",
					description : "Finesse, thrown; Can target 2 within 10 ft, separate atks, half damage to 2nd target; Returns to hand",
					tooltip : "Special: When this weapon is thrown, I can target two creatures within 10 ft of each other, making a separate attack roll against each target; the damage dealt by the attack is halved for each target hit after the first. In addition, the weapon flies back to my hand immediately after the attack",
					abilitytodamage : true,
					special : true
				}
			},
			"ricocheting weapon, piercing" : {
				name : "Ricocheting Weapon, Piercing",
				prereqKCCC : {
					featuresNot : ["ricocheting weapon, bludgeoning", "ricocheting weapon, slashing"]
				},
				source : [["KCCC", 16]],
				description : desc([
					"I create a custom Ricocheting Weapon that deals piercing damage"
				]),
				weaponsAdd : ["Ricocheting Weapon"],
				weaponOptions : {
					regExpSearch : /^(?=.*ricocheting)(?=.*weapon).*$/i,
					name : "Ricocheting Weapon",
					source : [["KCCC", 16]],
					ability : 2,
					type : "AlwaysProf",
					damage : [1, 8, "piercing"],
					range : "Melee, 30/90 ft",
					description : "Finesse, thrown; Can target 2 within 10 ft, separate atks, half damage to 2nd target; Returns to hand",
					tooltip : "Special: When this weapon is thrown, I can target two creatures within 10 ft of each other, making a separate attack roll against each target; the damage dealt by the attack is halved for each target hit after the first. In addition, the weapon flies back to my hand immediately after the attack",
					abilitytodamage : true,
					special : true
				}
			},
			"ricocheting weapon, slashing" : {
				name : "Ricocheting Weapon, Slashing",
				prereqKCCC : {
					featuresNot : ["ricocheting weapon, bludgeoning", "ricocheting weapon, piercing"]
				},
				source : [["KCCC", 16]],
				description : desc([
					"I create a custom Ricocheting Weapon that deals slashing damage"
				]),
				weaponsAdd : ["Ricocheting Weapon"],
				weaponOptions : {
					regExpSearch : /^(?=.*ricocheting)(?=.*weapon).*$/i,
					name : "Ricocheting Weapon",
					source : [["KCCC", 16]],
					list : "melee",
					ability : 2,
					type : "AlwaysProf",
					damage : [1, 8, "slashing"],
					range : "Melee, 30/90 ft",
					description : "Finesse, thrown; Can target 2 within 10 ft, separate atks, half damage to 2nd target; Returns to hand",
					tooltip : "Special: When this weapon is thrown, I can target two creatures within 10 ft of each other, making a separate attack roll against each target; the damage dealt by the attack is halved for each target hit after the first. In addition, the weapon flies back to my hand immediately after the attack",
					abilitytodamage : true,
					special : true
				}
			},
			"shock generator" : {
				name : "Shock Generator",
				source : [["KCCC", 16]],
				description : desc([
					"I can cast Shocking Grasp, and can choose Dexterity or Intelligence for the attack roll"
				]),
				spellcastingBonus : [{
					name : "Shock Generator",
					spells : ["shocking grasp"],
					selection : ["shocking grasp"],
					firstCol : "atwill"
				}],
				weaponsAdd : ["Shocking Grasp"],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.baseWeaponName == "shocking grasp") {
								if (What('Dex Mod') > What('Int Mod')) {
									fields.Mod = 2;
								}
							}
						},
						"I can choose between my Dexterity and Intelligence modifier when casting Shocking Grasp"
					]
				}
			}
		},
		"subclassfeature3" : {}, // Will be filled out by the KCCC_inventorSubclass_subclassfeature3 function
		"subclassfeature3.1" : {
			name : "Recycle Gadgets",
			source : [["KCCC", 14]],
			minlevel : 3,
			description : " [repair gadget over a long rest for 20 gp]" + desc([
				"When I end a long rest I can swap an upgrade, the new one must be of a valid level"
			])
		},
		"subclassfeature14" : {
			name : "Combat Gadgets",
			source : [["KCCC", 14]],
			minlevel : 14,
			description : " [use action of a gadget in place of attack]"
		}
	}
});
// Gadgetsmith upgrades
KCCCglobal.upgrades.gadgetsmith = [
	ClassSubList[KCCC_gadgetsmith].features["subclassfeature1"]["impact gauntlet"],
	ClassSubList[KCCC_gadgetsmith].features["subclassfeature1"]["power fist (variant, needs dm approval)"],
	ClassSubList[KCCC_gadgetsmith].features["subclassfeature1"]["lightning baton"],
	ClassSubList[KCCC_gadgetsmith].features["subclassfeature1"]["repeating hand crossbow"],
	ClassSubList[KCCC_gadgetsmith].features["subclassfeature1"]["ricocheting weapon, bludgeoning"],
	ClassSubList[KCCC_gadgetsmith].features["subclassfeature1"]["ricocheting weapon, piercing"],
	ClassSubList[KCCC_gadgetsmith].features["subclassfeature1"]["ricocheting weapon, slashing"],
	ClassSubList[KCCC_gadgetsmith].features["subclassfeature1"]["shock generator"],
{
	name : "Impact Gauntlet, 2nd",
	prereqKCCC : {
		featuresOr : ["impact gauntlet", "impact gauntlet (variant, needs dm approval)"],
		featuresNot : ["impact gauntlet, 2nd (variant, needs dm approval)"]
	},
	source : [["KCCC", 15]],
	description : " [use as off-hand weapon]",
	weaponsAdd : ["Impact Gauntlet (off-hand)"]
}, {
	listname : "Power Fist, 2nd (variant, needs DM approval)",
	prereqKCCC : {
		featuresOr : ["power fist", "power fist (variant, needs dm approval)"],
		featuresNot : ["power fist, 2nd"]
	},
	name : "Power Fist, 2nd",
	source : [["KCCC", 38]],
	description : " [use as off-hand weapon]",
	weaponsAdd : ["Power Fist (off-hand)"]
}, {
	name : "Airburst Mine",
	source : [["KCCC", 15]],
	description : desc([
		"I can cast Shatter or Thunderburst Mine without using a spell slot",
		"Once I cast either spell, I can't cast them again using this device until I finish a short rest"
	]),
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : [{
		name : "Airburst Mine",
		spells : ["shatter", "thunderburst mine"],
		selection : ["shatter", "thunderburst mine"],
		times : 2,
		firstCol : "oncesr"
	}]
}, {
	name : "Belt of Adjusting Size",
	source : [["KCCC", 15]],
	description : desc([
		"While wearing this I can cast Enlarge/Reduce without using a spell slot"
	]),
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : [{
		name : "Belt of Adjusting Size",
		spells : ["enlarge/reduce"],
		selection : ["enlarge/reduce"],
		firstCol : "oncesr"
	}]
}, {
	name : "Element Eater",
	source : [["KCCC", 15]],
	description : desc([
		"As a reaction, when I take acid, cold, fire, lightning, or thunder damage, I gain resistance",
		"This lasts until my next turn starts; My next melee hit does +1d6 damage of that type"
	]),
	usages : 1,
	recovery : "short rest",
	action : [["reaction", ""]]
}, {
	name : "Enhanced Grappling Hook",
	source : [["KCCC", 15]],
	description : desc([
		"My grappling hook's range becomes 30 ft; When I pull to a Large or larger creature",
		"I can drag a willing or grappled Medium or smaller creature within 5 ft with me"
	])
}, {
	name : "Fire Spitter",
	source : [["KCCC", 15]],
	description : desc([
		"I can cast Burning Hands as a second level spell without using a spell slot"
	]),
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : [{
		name : "Fire Spitter",
		spells : ["burning hands"],
		selection : ["burning hands"],
		firstCol : "oncesr"
	}]
}, {
	name : "Flashbang",
	source : [["KCCC", 15]],
	description : desc([
		"As an action, I choose a point within 30 ft, creatures within 20 ft must make a Dex save",
		"On a fail they are blinded until the end of their next turn"
	]),
	usages : 1,
	recovery : "short rest",
	action : [["action", ""]]
}, {
	name : "Gliding Cloak",
	source : [["KCCC", 15]],
	description : desc([
		"When I fall more than 10 ft and am not incapacitated, I can slow my fall",
		"My rate of descent becomes 30 ft per round, taking no fall damage",
		"I can move 2 ft horizontally for each 1 ft I descend in this manner"
	]),
}, {
	name : "Gravity Switch",
	source : [["KCCC", 15]],
	description : desc([
		"I can cast Fall without using a spell slot",
	]),
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : [{
		name : "Gravity Switch",
		spells : ["fall"],
		selection : ["fall"],
		firstCol : "oncesr"
	}]
}, {
	listname : "Jumper Cable (prereq: Shock Generator)",
	prereqKCCC : {
		featuresAnd : ["shock generator"]
	},
	name : "Jumper Cable",
	source : [["KCCC", 15]],
	description : desc([
		"Once per turn, I can add my Int mod to damage dealt with my Shock Generator cantrips",
		"As an action I can make a DC 10 Medicine check to stabilize a creature within reach",
		"Success: They gain 1 HP + temp HP equal to my inventor level, and one level of exhaustion"
	]),
	calcChanges : {
		atkCalc : [
			function (fields, v, output) {
				if (v.baseWeaponName === "shocking grasp" && What("Int Mod") && Number(What("Int Mod")) > 0) {
					output.extraDmg += Number(What('Int Mod'));
				}
			},
			"I can add my Intelligence modifier to the damage dealt to my Shocking Grasp cantrip from my Shock Generator."
		],
		spellAdd : [
			function (spellKey, spellObj, spName) {
				if (spellKey == "shocking grasp" && spName === "inventor" && What("Int Mod") && Number(What("Int Mod")) > 0) {
					return genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Int");
				}
			},
			"My Shocking Grasp gets my Intelligence modifier added to its damage."
		]
	}
}, {
	name : "Jumping Boots",
	source : [["KCCC", 15]],
	description : desc([
		"While wearing these boots I am under the effects of the Jump spell."
	]),
	spellcastingBonus : [{
		name : "Jumping Boots",
		spells : ["jump"],
		selection : ["jump"],
		firstCol : "atwill"
	}]
}, {
	name : "Mechanical Arm",
	source : [["KCCC", 15]],
	description : desc([
		"I gain an extra hand that I must mount and can control mentally",
		"It can do any function a normal hand would"
	])
}, {
	name : "Mechanical Familiar",
	source : [["KCCC", 15]],
	description : desc([
		"At the end of a long rest I can cast Find Familiar to make a mechanical familiar",
		"Casting Find Familiar this way does not use a spell slot; See companion page"
	]),
	spellcastingBonus : [{
		name : "Mechanical Familiar",
		spells : ["find familiar"],
		selection : ["find familiar"],
		firstCol : "oncelr"
	}]
}, {
	name : "Net Launcher",
	source : [["KCCC", 16]],
	description : desc([
		"With this device, Nets have a range of 20/60 ft"
	]),
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.baseWeaponName == "net") fields.Range = "20/60 ft"
			},
			"While I have the Net Launcher upgrade, nets have a range of 20/60 ft"
		]
	}
}, {
	name : "Quick Essential Gadget",
	source : [["KCCC", 16]],
	description : desc([
		"I can use my Grappling Hook or my Smoke Bomb as a bonus action",
		"I can only use one them this of them this way once per short rest"
	]),
	usages : 1,
	recovery : "short rest"
}, {
	listname : "Shocking Hook (prereq: Shock Generator)",
	prereqKCCC : {
		featuresAnd : ["shock generator"]
	},
	name : "Shocking Hook",
	source : [["KCCC", 16]],
	description : desc([
		"After using my grappling hook I can cast Shocking Grasp as a bonus action",
		"This must target a creature I pulled or pulled myself to"
	])
}, {
	name : "Sight Lenses",
	source : [["KCCC", 16]],
	description : desc([
		"I can see 15 ft through fog, mist, smoke, clouds, and nonmagical darkness"
	]),
	vision : [
		["Sight Lenses", "fixed 15"]
	]
}, {
	name : "Smoke Cloak",
	source : [["KCCC", 16]],
	description : desc([
		"When I am lightly or heavily obscured by smoke at the start of my turn, I am invisible",
		"This ends at the end of my turn, or until I cast a spell, make an attack, or deal damage"
	])
}, {
	name : "Steelweave Nets",
	source : [["KCCC", 16]],
	description : desc([
		"My nets have resistance to slashing damage, AC 15, and deal 1d6 lightning damage",
		"I can replenish my supply (max Int Mod nets | min 1) over a long rest with normal nets"
	]),
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.baseWeaponName == "net") {
					fields.Proficiency = true;
					fields.Description = "Thrown, only 1 attack, up to Large creature hit is restrained, +1d6 lightning damage";
					fields.Description_Tooltip = "Special: A Large or smaller creature hit by a net is restrained until it is freed and takes 1d6 lightning damage. A net has no effect on creatures that are formless, or creatures that are Huge or larger. A creature can use its action to make a DC 10 Strength check, freeing itself or another creature within its reach on a success. Dealing 5 slashing damage to the net (AC 15) also frees the creature without harming it, ending the effect and destroying the net. The net has resistance to slashing damage. When I use an action, bonus action, or reaction to attack with a net, I can make only one attack regardless of the number of attacks I can normally make.";
				}
			},
			"My nets have resistance to slashing damage, an AC of 15, and deal 1d6 lightning damage when they restrain a creature"
		]
	}
}, {
	name : "Striding Boots",
	source : [["KCCC", 16]],
	description : desc([
		"While wearing these boots I am under the effects of the Longstrider spell; Speed +10 ft"
	]),
	spellcastingBonus : [{
		name : "Striding Boots",
		spells : ["longstrider"],
		selection : ["longstrider"],
		firstCol : "atwill"
	}],
	speed : { allModes : "+10" }
}, {
	name : "Trick Shots",
	source : [["KCCC", 16]],
	description : desc([
		"At the end of a short rest I can modify a thrown weapon or ammo to have an effect once:",
		" \u2022 Arcane Trick: I can imbue a cantrip or 1st level spell I know that is cast on impact",
		" \u2022 Bouncing: I can attack a target I know of with total cover as though they had half cover",
		" \u2022 Ricochet: If I hit, I can make another attack against a target w/in 10 ft of the first",
		" \u2022 Smoke Shot: I can cast Fog Cloud with 5 ft, 10 ft, 15 ft, or 20 ft radius where it lands",
		" \u2022 Special Tip: The shot deals bludg., pierc., slash., acid, cold, fire, or lightning damage"
	]),
	usages : "Times this upgrade is taken per ",
	recovery : "short rest",
	usagescal : "event.value = KCCCglobal.fn.currentChoices().reduce(function(total, n) { return /trick shots/i.test(n) ? (total+1) : total; }, 0);"
}, {
	name : "Trick Shots, 2nd",
	source : [["KCCC", 16]],
	prereqKCCC : { featuresAnd : ["trick shots"] },
	description : " [+1 trick shot per short rest]"
}, {
	name : "Trick Shots, 3rd",
	source : [["KCCC", 16]],
	prereqKCCC : { featuresAnd : ["trick shots, 2nd"] },
	description : " [+1 trick shot per short rest]"
}, {
	name : "Trick Shots, 4th",
	source : [["KCCC", 16]],
	prereqKCCC : { featuresAnd : ["trick shots, 3rd"] },
	description : " [+1 trick shot per short rest]"
}, {
	name : "Trick Shots, 5th", // theoretically you could take this 12 times, but taking it 5 times is already a ridiculous amount
	source : [["KCCC", 16]],
	prereqKCCC : { featuresAnd : ["trick shots, 4th"] },
	description : " [+1 trick shot per short rest]"
}, {
	KCCClevel : 5,
	name : "Antimagic Shackle",
	source : [["KCCC", 16]],
	description : desc([
		"As an action I can attempt to shackle an adjacent creature to myself or an object",
		"I make a Dex (Sleight of Hand) contested by Str (Althetics) or Dex (Acrobatics) their choice",
		"Fails if immune to grappled or restrained; On success target is shackled",
		"The creature can't teleport, travel to another plane, alter its form or dematerialize",
		"The shackles can be broken with a Strength save against my spell save DC"
	]),
	action : [["action", ""]]
}, {
	KCCClevel : 5,
	name : "Binding Rope",
	source : [["KCCC", 17]],
	description : desc([
		"As an action I force a creature within 30 ft to make a Dex save against my spell save DC",
		"On a fail they are restrained until the end of my next turn",
		"If I am grappling them they have disadv. on the save; I can only restrain 1 target at a time"
	]),
	action : [["action", ""]]
}, {
	KCCClevel : 5,
	name : "Crossbow Spider",
	source : [["KCCC", 17]],
	description : desc([
		"As an action I can deploy a Crossbow Spider (see companion page)",
		"While deployed, I can use a bonus action to move the construct and make an attack",
		"It becomes inactive after 1 minute or 10 attacks; It only takes actions I direct it to take",
		"I can only activate it once per long rest or if not destroyed by expending a spell slot"
	]),
	usages : 1,
	recovery : "long rest",
	altResource : "SS 1+",
	action : [["action", " (deploy)"], ["bonus action", " (command)"]],
	creaturesAdd : [["Crossbow Spider", true]],
	creatureOptions : [{
		name : "Crossbow Spider",
		source : [["KCCC", 17]],
		size : 5,
		type : "Construct",
		alignment : "Unaligned",
		ac : 10,
		hp : 5,
		hd : [1, 8],
		speed : "15 ft, climb 15 ft",
		proficiencyBonus : 2,
		proficiencyBonusLinked : true,
		challengeRating : "0",
		scores : [2, 10, 10, 1, 1, 1],
		damage_immunities : "poison",
		condition_immunities : "charmed, exhaustion, frightened, paralyzed, petrified, poisoned",
		senses : "",
		attacksAction : 1,
		attacks : [{
			name : "Crossbow",
			ability : 4,
			damage : [1, 6, "piercing"],
			modifiers : ["", "oInt"], // The crossbow spider uses the player's spell attack bonus to Hit and adds the player's Int mod to the damage
			abilitytodamage : false,
			range : "30/120 ft",
			description : "",
			useSpellMod : "inventor"
		}],
		features : [{
			name : "Crossbow Spider",
			description : "As a bonus action I can cause the construct to move up to its speed and make a crossbow attack from its location. The construct beomces inactive after 1 minute, or after it has been used to make 10 attacks. The crossbow spider can't take any actions besides the ones I direct it to take with my bonus action."
		}]
	}],
}, {
	listname : "Explosive Gauntlet (prereq: Impact Gauntlet)",
	prereqKCCC : {
		featuresOr : ["impact gauntlet", "impact gauntlet (variant, needs dm approval)", "power fist", "power fist (variant, needs dm approval)"]
	},
	KCCClevel : 5,
	name : "Explosive Gauntlet",
	source : [["KCCC", 17]],
	description : desc([
		"When I attack with my impact gauntlet I can push myself 10 ft in the opposite direction",
		"Or I can use a bonus action to attempt to push the target, they make a Strength save",
		"Against my spell save DC; On a fail they are pushed 10 ft away from me",
		"Additionally, as an action I can push myself 10 ft in any direction (including upwards)",
		"Movement from this upgrade never provokes an opportunity attack"
	]),
	action : [["action", " Self Push"], ["bonus action", " Push (with attack)"]],
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if ((/^(?=.*impact)(?=.*gauntlet).*$/i).test(v.WeaponTextName) || (/^(?=.*power)(?=.*fist).*$/i).test(v.WeaponTextName)) {
					fields.Description += '; Can push 10 ft'
					fields.Description_Tooltip += ' When I attack with this weapon I can push myself 10 ft in the opposite direction, or using a bonus action I can force the target to make a Strength save or be pushed 10 ft away from me.'
				}
			},
			"When I attack with my impact gauntlet or power fist I can push myself 10 ft in the opposite direction, or using a bonus action I can force the target to make a Strength save or be pushed 10 ft away from me."
		]
	},
}, {
	KCCClevel : 5,
	name : "Smoky Images",
	source : [["KCCC", 17]],
	description : desc([
		"After using Smoke Bomb I can cast Mirror Image as a bns action without using a spell slot"
	]),
	usages : 1,
	recovery : "short rest",
	action : [["bonus action", " (Mirror Image)"]],
	spellcastingBonus : [{
		name : "Smoky Images",
		spells : ["mirror image"],
		selection : ["mirror image"],
		firstCol : "oncesr"
	}]
}, {
	KCCClevel : 5,
	name : "Vanishing Trick",
	source : [["KCCC", 17]],
	description : desc([
		"After using Smoke Bomb I can cast Misty Step without using a spell slot"
	]),
	usages : 1,
	recovery : "short rest",
	action : [["bonus action", " (Misty Step)"]],
	spellcastingBonus : [{
		name : "Vanishing Trick",
		spells : ["misty step"],
		selection : ["misty step"],
		firstCol : "oncesr"
	}]
}, {
	KCCClevel : 9,
	name : "Arcane Nullifier",
	source : [["KCCC", 17]],
	description : desc([
		"I can cast Dispel Magic without using a spell slot"
	]),
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : [{
		name : "Arcane Nullifier",
		spells : ["dispel magic"],
		selection : ["dispel magic"],
		firstCol : "oncesr"
	}]
}, {
	KCCClevel : 9,
	name : "Phase Trinket",
	source : [["KCCC", 17]],
	description : desc([
		"I can cast Blink or Dimension Door without using a spell slot"
	]),
	usages : 1,
	recovery : "long rest",
	spellcastingBonus : [{
		name : "Phase Trinket",
		spells : ["blink", "dimension door"],
		selection : ["blink", "dimension door"],
		firstCol : "oncelr"
	}]
}, {
	KCCClevel : 9,
	name : "Stinking Gas",
	source : [["KCCC", 17]],
	description : desc([
		"When I use my smoke bomb I can cast Stinking Cloud instead of Fog Cloud"
	]),
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : [{
		name : "Stinking Gas",
		spells : ["stinking cloud"],
		selection : ["stinking cloud"],
		firstCol : "oncesr"
	}]
}, {
	KCCClevel : 9,
	name : "Stopwatch Trinket",
	source : [["KCCC", 17]],
	description : desc([
		"I can cast Haste or Slow without using a spell slot"
	]),
	usages : 1,
	recovery : "long rest",
	spellcastingBonus : [{
		name : "Stopwatch Trinket",
		spells : ["haste", "slow"],
		selection : ["haste", "slow"],
		firstCol : "oncelr"
	}]
}, {
	KCCClevel : 11,
	name : "Flying Gadget",
	source : [["KCCC", 17]],
	description : desc([
		"As a bonus action or reaction, I can gain a 30 ft fly speed until I deactivate it (no action)"
	]),
	action : [["bonus action", " (activate)"], ["reaction", " (activate)"]],
	speed : {
		fly : { spd : "fixed 30", enc :  0 }
	}
}, {
	listname : "Lightning Generator (prereq: Shock Generator)",
	prereqKCCC : { featuresAnd : ["shock generator"], },
	KCCClevel : 11,
	name : "Lightning Generator",
	source : [["KCCC", 17]],
	description : desc([
		"I can use my Shock Generator to cast Lightning Bolt without using a spell slot",
		"Once per turn, when I deal lightning damage with a spell, I can add my Int mod to it"
	]),
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : [{
		name : "Lightning Generator",
		spells : ["lightning bolt"],
		selection : ["lightning bolt"],
		firstCol : "oncesr"
	}],
	calcChanges : {
		atkCalc : [
			function (fields, v, output) {
				if (v.isSpell && /lightn(\.|ing)/i.test(fields.Damage_Type) && What("Int Mod") && Number(What("Int Mod")) > 0) {
					output.extraDmg += Number(What('Int Mod'));
				}; // This is intended to stack with Jumper Cables
			},
			"Once per turn when I deal lightning damage with a spell, I can add my Intelligence modifier to the damage."
		],
		spellAdd : [
			function (spellKey, spellObj, spName) {
				if (!spellObj.psionic && What("Int Mod") && Number(What("Int Mod")) > 0) {
					return genericSpellDmgEdit(spellKey, spellObj, "lightning|lightn\\.?", "Int", true);
				}
			},
			"Once per turn when I deal lightning damage with a spell, I can add my Intelligence modifier to the damage."
		]
	}
}, {
	listname : "Truesight Lenses (prereq: Sight Lenses)",
	prereqKCCC : { featuresAnd : ["sight lenses"], },
	KCCClevel : 11,
	name : "Truesight Lenses",
	source : [["KCCC", 17]],
	description : desc([
		"My sight lenses give truesight out to a range of 15 ft"
	])
}, {
	KCCClevel : 11,
	name : "Useful Universal Key",
	source : [["KCCC", 18]],
	description : desc([
		"I can cast Knock or Passwal without using a spell slot"
	]),
	usages : 1,
	recovery : "long rest",
	spellcastingBonus : [{
		name : "Useful Universal Key",
		spells : ["knock", "passwall"],
		selection : ["knock", "passwall"],
		firstCol : "oncelr"
	}]
}, {
	KCCClevel : 15,
	name : "Bee Swarm Rockets",
	source : [["KCCC", 18]],
	description : desc([
		"As an action I can release up to 10 rockets to each target a different point within 40 ft",
		"Each creature within 10 ft of a point must make Dex saves against my spell save DC",
		"They make a save for each rocket; For each fail they take 2d6 + 1 Fire damage, save halves"
	]),
	usages : levels.map(function(n) { return n; }),
	recovery : "long rest",
	action : [["action", ""]]
}, {
	KCCClevel : 15,
	name : "Bracers of Empowerment",
	source : [["KCCC", 18]],
	description : desc([
		"I can cast Martial Transformation without using a spell slot"
	]),
	usages : 1,
	recovery : "long rest",
	spellcastingBonus : [{
		name : "Bracers of Empowerment",
		spells : ["martial transformation"],
		selection : ["martial transformation"],
		firstCol : "oncelr"
	}]
}, {
	KCCClevel : 15,
	name : "Dimensional Toolbox",
	source : [["KCCC", 18]],
	description : desc([
		"As an action I can create one Gadgetsmith Unrestricted Upgrade for 1 minute"
	]),
	usages : 1,
	recovery : "long rest"
}, {
	KCCClevel : 15,
	name : "Disintegration Ray",
	source : [["KCCC", 18]],
	description : desc([
		"I can cast Disintegrate without using a spell slot"
	]),
	usages : 1,
	recovery : "long rest",
	spellcastingBonus : [{
		name : "Disintegration Ray",
		spells : ["disintegrate"],
		selection : ["disintegrate"],
		firstCol : "oncelr"
	}]
}, {
	KCCClevel : 15,
	name : "Nexus Hive",
	source : [["KCCC", 18]],
	description : desc([
		"As an action I can deploy a Nexus Hive (see companion page) within 30 ft of me",
		"While deployed, I can use a bonus action to move the construct up to 20 ft",
		"It becomes inactive after 1 minute; It only takes actions I direct it to take",
		"If it destroyed I cannot activate it again until I recreate it during a long rest"
	]),
	action : [["action", " (deploy)"], ["bonus action", " (command)"]],
	creaturesAdd : [["Nexus Hive", true]],
	creatureOptions : [{
		name : "Nexus Hive",
		source : [["KCCC", 18]],
		size : 4,
		type : "Construct",
		alignment : "Unaligned",
		ac : 15,
		hp : 30,
		hd : [5, 8],
		speed : "0 ft, fly 20 ft (hover)",
		proficiencyBonus : 2,
		proficiencyBonusLinked : true,
		challengeRating : "1/2",
		scores : [2, 10, 12, 1, 1, 1],
		damage_immunities : "poison, psychic",
		condition_immunities : "charmed, exhaustion, frightened, paralyzed, petrified, poisoned",
		senses : "",
		attacksAction : 1,
		attacks : [],
		features : [{
			name : "Nexus Hive",
			description : "As a bonus action I can cause the construct to move up to 20 ft. The construct becomes inactive after 1 minute. The nexus hive can't take any actions besides the ones I direct it to take with my bonus action."
		}],
		traits : [{
			name : "Swarm",
			description : "The nexus hive sprays metal shards in a 10-ft radius around itself. A creature takes 4d4 piercing damage when it enters this area for the first time on a turn or starts its turn there."
		}, {
			name : "Explosive Vent",
			description : "When reduced to 0 hit points, the nexus hive will violently vent energy. Creatures within 10 ft of the nexus hive must succeed on a Dexterity saving throw against my spell save DC. A creature takes 4d6 fire damage on a failed save, or half as much damage on a successful one."
		}]
	}]
}];
// Gadgetsmith Mechanical Familiar (by PoetOfGod)
CompanionList.mechanical_familiar = {
	name : "Mechanical Familiar",
	nameTooltip : "Mechanical Familiar (Gadgetsmith feature)",
	nameOrigin : "variant of the Find Familiar 1st-level conjuration [ritual] spell",
	nameMenu : "Mechanical familiar (Gadgetsmith feature)",
	source : [["KCCC", 15]],
	includeCheck : CompanionList.pact_of_the_chain.includeCheck,
	attributesChange : function(sCrea, objCrea) {
		// can't do any attacks
		objCrea.attacks = [];
		objCrea.type = "Construct";
		objCrea.subtype = "";
	},
	attributesAdd : CompanionList.familiar.attributesAdd,
	notes : function() {
		var a = newObj(CompanionList.familiar.notes);
		a[0].description = [
			"appearing in an unoccupied space within 10 ft",
			"It assumes a chosen beast form (can change at every casting), see the spell and feature",
			"It has the chosen form's statistics, but its type changes to construct",
			"When the familiar drops to 0 hit points, it deactivates or is destroyed",
			"It reactivates when I cast this spell again (in a new form if so desired)"
		].join("\n   ");
		return a;
	}()
};
}

{// Infusionsmith subclass DONE
AddSubClass("inventor", "infusionsmith", {
	regExpSearch : /^(?=.*infusion)(?=.*smith).*$/i,
	subname : "Infusionsmith",
	fullname : "Infusionsmith",
	source : [["KCCC", 23]],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	toolProfs : ["Calligrapher's supplies", "Jeweler's tools"],
	features : {
		"subclassfeature1" : {
			name : "Infused Armament",
			source : [["KCCC", 23]],
			minlevel : 1,
			description : " [\u00BD time to create spell scrolls]" + desc([
				"When I finish a long rest, I can make a blasting rod, animated weapon or infused weapon",
				"This magic item lasts until the end of my next long rest"
			]),
			magicitemsAdd : ["Animated Weapon", "Blasting Rod", "Infused Weapon"]
		},
		"subclassfeature3" : {}, // Will be filled out by the KCCC_inventorSubclass_subclassfeature3 function
		"subclassfeature3.1" : {
			name : "Spell Manual",
			source : [["KCCC", 23]],
			minlevel : 3,
			additional : levels.map(function(n) {
				return n < 3 ? "" : (n - 1) + " extra wizard spells known";
			}),
			description : desc([ // The infusionsmith overflows the class features on the second page (Currently 10 lines over, no lines over at level 10)
				"I gain a Spell Manual with two 1st level wizard spells that I can store spells in",
				"I can learn spells in my manual as though they were inventor spells on level up",
				"I can add spells I find (of any level) to my manual using 2 hours and 50 gp per spell level"
			]),
			eval : function() {
				// manually create a new CurrentSpells object for this Spell Manual
				var objSpellManual = {
					name : 'Spell Manual',
					ability : 0, // can't cast these spells
					list : {class : 'any'},
					// The wording of the feature suggests the limitation on wizard spells is only for the one gained for free (Which has been confirmed by Kibbles)
					// A spellcastingBonus has been added for the spells gained on level up
					known : {spells : 'book'},
					bonus : {
						'wizard spells header' : {
							name : "Wizard Spells",
							"class" : "wizard",
							level : [1, 1],
							times : levels.map(function(n) {
								return n < 3 ? 0 : 1;
							})
						},
						'wizard spells level 1' : {
							name : "1st Level",
							"class" : "wizard",
							level : [1, 1],
							times : levels.map(function(n) {
								return n < 3 ? 0 : n < 4 ? 1 : 2;
							})
						},
						'wizard spells level 1-2' : {
							name : "1st-2nd Level",
							"class" : "wizard",
							level : [1, 2],
							times : levels.map(function(n) {
								return n < 5 ? 0 : n < 9 ? (n - 4) : 4;
							})
						},
						'wizard spells level 1-3' : {
							name : "1st-3rd Level",
							"class" : "wizard",
							level : [1, 3],
							times : levels.map(function(n) {
								return n < 9 ? 0 : n < 13 ? (n - 8) : 4;
							})
						},
						'wizard spells level 1-4' : {
							name : "1st-4th Level",
							"class" : "wizard",
							level : [1, 4],
							times : levels.map(function(n) {
								return n < 13 ? 0 : n < 17 ? (n - 12) : 4;
							})
						},
						'wizard spells level 1-5' : {
							name : "1st-5th Level",
							"class" : "wizard",
							level : [1, 5],
							times : levels.map(function(n) {
								return n < 17 ? 0 : n < 20 ? (n - 16) : 4;
							})
						},
					},
					refType : "class", // MPMB: if this is set to something else, the level will always be set automatically to the total character level. Setting this to class makes it possible to control it with the changeeval
					factor : [2, "default"],
					level : classes.known.inventor.level,
					typeList : 2
				};
				// re-order the CurrentSpells object so that the Spell Manual dialog is shown before that for the Inventor
				var objTemp = {}, bFoundInventor = false;
				for (var sCast in CurrentSpells) {
					// skip all until the inventor class is found
					if (!bFoundInventor && sCast !== 'inventor') continue;
					bFoundInventor = true;
					// move them to a temporary object and delete the CurrentSpells entry
					objTemp[sCast] = CurrentSpells[sCast];
					delete CurrentSpells[sCast];
				}
				// now add the Spell Manual object
				CurrentSpells['inventor-spell manual'] = objSpellManual;
				// now add the rest, starting with the inventor
				for (var sCast in objTemp) {
					CurrentSpells[sCast] = objTemp[sCast];
				}
				// update the changes dialog
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			},
			removeeval : function() {
				// remove the Spell Manual entry in the CurrentSpells object
				delete CurrentSpells['inventor-spell manual'];
				// update the changes dialog
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			},
			changeeval : function() {
				// update the Spell Manual level whenever the Inventor level changes
				if (classes.known.inventor && CurrentSpells['inventor-spell manual']) CurrentSpells['inventor-spell manual'].level = classes.known.inventor.level;
			},
			calcChanges : {
				spellList : [
					function(spList, spName, spType) {
						// stop if this is not for the inventor class, the spell manual is not defined, or this is a spell gained through spellcastingBonus
						var oManual = CurrentSpells['inventor-spell manual'];
						if (spName !== 'inventor' || !oManual) return;
						var aManualSpells = [].concat(oManual.selectSp).concat(oManual.selectBo);
						// add all spells in the Spell Manual to the options for the Inventor (and infused wands/rods)
						if (spType.indexOf("bonus") === -1) {
							// The main inventor spell selection
							spList.extraspells = spList.extraspells.concat(aManualSpells);
						} else if (spList.isInventorUpgradedWandOrRod) {
							// The 'bonus' spell options for infused wands/rods
							spList.spells = aManualSpells;
						}
					},
					"I can't cast spells from my Spell Manual, and they don't count against my number of spells known, but whenever I would learn a new inventor spell, I can select a spell from my Spell Manual instead of the inventor spell list."
				]
			}
		},
		"subclassfeature3.2" : {
			name : "Infuse Magic",
			source : [["KCCC", 24]],
			minlevel : 3,
			description : desc([
				"I can spend 1 minute with my Spell Manual to infuse a magic item with a spell",
				"This expends the spell slot; Crea with Int > 6 holding the item can cast the spell",
				"The spell uses my spellcasting ability, but is treated as if the holder cast the spell",
				"The infused spell fades if I finish a long rest"
			])
		},
		"subclassfeature5" : {
			name : "Empowered Infusions",
			source : [["KCCC", 24]],
			minlevel : 5,
			description : desc([
				"If I make an animated weapon or infused weapon, I can make another (of either type)",
				"If I have multiple animated weapons they can attack the same or different targets",
				"I can cast a cantrip from blasting rod as a bns if I cast a spell level 1+ from an item",
				"This spell must be from Infuse Magic, an upgrade, or a magic wand"
			]),
			action : [["bonus action", "Blasting Cantrip (with SL 1+ cast from item)"]]
		},
		"subclassfeature14" : {
			name : "Infused Focus",
			source : [["KCCC", 24]],
			minlevel : 14,
			description : desc([
				"When I cast a spell with concentration, I can anchor it to an object I touch",
				"It does not use concentration and lasts for a number of rounds equal to my Int mod"
			]),
			usages : 1,
			recovery : "short rest"
		}
	}
});
KCCCglobal.upgrades.infusionsmith = [
{
	name : "Animated Archer",
	source : [["KCCC", 24]],
	description : desc([
		"I can make a ranged weapon and quiver into an animated weapon"
	]),
	magicitemsAdd : ["Animated Archer Weapon"],
}, {
	name : "Arcane Armament",
	source : [["KCCC", 24]],
	description : " [resistance to force damage]" + desc([
		"I learn Mage Armor, and can add Int instead of Dex to my AC when I use it"
	]),
	extraAC : [{
		name : "Arcane Armament",
		mod : "Int-Dex",
		text : "While under the effect of Mage Armor, I can add my Intelligence modifier to my AC, instead of my Dexterity modifier.",
		stopeval : function (v) {
			// return `true` to stop adding `mod`
			return CurrentArmour.known !== 'mage armor' || Number(What("Dex Mod")) > Number(What("Int Mod"));
		}
	}],
	spellcastingBonus : [{
		name : "Arcane Armament",
		spells : ["mage armor"],
		selection : ["mage armor"]
	}],
	dmgres : ["Force"]
}, {
	name : "Loyal Weapon",
	source : [["KCCC", 24]],
	description : desc([
		"I can cast Returning Weapon at will; I can only have one active at a time from this upgrade"
	]),
	spellcastingBonus : [{
		name : "Loyal Weapon",
		spells : ["returning weapon"],
		selection : ["returning weapon"],
		firstCol : "atWill"
	}]
},
	KCCCglobal.fn.upgradeWandorRod("Wand", "1st level", false),
	KCCCglobal.fn.upgradeWandorRod("Wand", "1st level", false, 2),
	KCCCglobal.fn.upgradeWandorRod("Wand", "1st level", false, 3),
	KCCCglobal.fn.upgradeWandorRod("Wand", "1st level", false, 4),
	KCCCglobal.fn.upgradeWandorRod("Wand", "1st level", false, 5),
	KCCCglobal.fn.upgradeWandorRod("Wand", "1st level", false, 6),
	KCCCglobal.fn.upgradeWandorRod("Wand", "1st level", false, 7),
	KCCCglobal.fn.upgradeWandorRod("Wand", "1st level", false, 8),
	KCCCglobal.fn.upgradeWandorRod("Wand", "1st level", false, 9),
	KCCCglobal.fn.upgradeWandorRod("Wand", "1st level", false, 10),
{
	name : "Skilled Infusions",
	source : [["KCCC", 24]],
	description : desc([
		"My animated and infused weapons gain the benefits of applicable fighting styles",
		"One-handed melee weapon attacks gain Dueling; Ranged weapon attacks gain Archery",
		"Two-handed melee weapon attacks gain Great Weapon Fighting"
	]),
	calcChanges : {
		atkCalc : [
			function (fields, v, output) {
				if (CurrentVars.extraWeapons && v.WeaponName in CurrentVars.extraWeapons) return;
				if (!v.isSpell && (/\binfused\b/i.test(v.WeaponTextName) || /\banimated\b/i.test(v.WeaponTextName))) {
					fightingStyleCheck = GetFightingStyleSelection()
					if (v.isRangedWeapon && !v.isNaturalWeapon && !v.isDC && !fightingStyleCheck["archery"]) output.extraHit += 2; // Do not add if Archery Fighting Style is selected somewhere else
					versatileCheck = (/versatile/i).test(fields.Description)
					if (!fightingStyleCheck["dueling"] || versatileCheck) { // Do not add if Dueling Fighting Style is selected somewhere else, unless the weapon is Versatile, in which case the Dueling fighting style will not apply itself because GWF adds 'two-handed' to the Description text
						for (var i = 1; i <= FieldNumbers.actions; i++) {
							if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) return;
						};
						if (v.isMeleeWeapon && !v.isNaturalWeapon && (!(/((^|[^+-]\b)2|\btwo).?hand(ed)?s?\b/i).test(fields.Description) || versatileCheck)) output.extraDmg += 2;
					}
				}
			},
			""
		],
		atkAdd : [
			function (fields, v) {
				if ((CurrentVars.extraWeapons && v.WeaponName in CurrentVars.extraWeapons) || GetFightingStyleSelection()["great weapon fighting"]) return; // Do not add if Great Weapon Fighting Style is selected somewhere else
				if (!v.isSpell && (/\binfused\b/i.test(v.WeaponTextName) || /\banimated\b/i.test(v.WeaponTextName))) {
					if (v.isMeleeWeapon && (/(\bversatile|((^|[^+-]\b)2|\btwo).?hand(ed)?s?)\b/i).test(fields.Description)) {
						fields.Description += (fields.Description ? '; ' : '') + 'Re-roll 1 or 2 on damage die' + ((/versatile/i).test(fields.Description) ? ' when two-handed' : '');
					}
				}
			},
			"My Animated and Infused Weapons gain the benefits of a fighting style. Attacks made with one-handed melee weapons gain Dueling, attacks made with two handed melee weapons gain Great Weapon Fighting, and attacks made with ranged weapons gain Archery."
		]
	}
}, {
	name : "Soul-Saving Bond",
	source : [["KCCC", 24]],
	description : desc([
		"I can create a bond with another creature at the end of a long rest",
		"When either makes an Int, Wis, Cha, or death save the other can make the same save",
		"This replaces the original result with its own, for a death save the roll is a 20"
	]),
	usages : 1,
	recovery : "short rest"
}, {
	name : "Warding Stone",
	source : [["KCCC", 25]],
	description : desc([
		"I give an item a pool of temporary Hit Points; A crea carrying item gains that temp HP",
		"The temp HP is lost if the crea stops carrying the item; They replenish after a long rest"
	]),
	additional : levels.map(function (n) {
		return n < 3 ? "" : n + " temporary Hit Points"
	})
}, {
	name : "Worn Enchantment",
	source : [["KCCC", 25]],
	description : desc([
		"I can expend a spell slot as an action to gain one Dex or Str skill proficiency",
		"I can gain advantage on that skill check, after which I lose the proficiency",
		"Otherwise this proficiency lasts until I finish a long rest"
	]),
	action : [["action", "Gain Proficiency"]]
},
	KCCCglobal.fn.upgradeWandorRod("Wand", "2nd level", false, 1, 5),
	KCCCglobal.fn.upgradeWandorRod("Wand", "2nd level", false, 2, 5),
	KCCCglobal.fn.upgradeWandorRod("Wand", "2nd level", false, 3, 5),
	KCCCglobal.fn.upgradeWandorRod("Wand", "2nd level", false, 4, 5),
	KCCCglobal.fn.upgradeWandorRod("Wand", "2nd level", false, 5, 5),
	KCCCglobal.fn.upgradeWandorRod("Wand", "2nd level", false, 6, 5),
	KCCCglobal.fn.upgradeWandorRod("Wand", "2nd level", false, 7, 5),
	KCCCglobal.fn.upgradeWandorRod("Wand", "2nd level", false, 8, 5),
	KCCCglobal.fn.upgradeWandorRod("Wand", "2nd level", false, 9, 5),
{
	KCCClevel : 5,
	name : "Animated Shield",
	source : [["KCCC", 25]],
	description : desc([
		"At the end of a long rest I can animate a shield to protect me",
		"While protecting me I gain the benefits of a sheild",
		"As a reaction, when a crea atks another target w/in 30 ft, I can impose disadv.",
		"If I do so, I lose the benefits of the animated shield until my next turn"
	]),
	action : [["reaction", " (defend)"]],
	shieldAdd : "Animated Shield"
}, {
	KCCClevel : 5,
	name : "Arcane Ammunition",
	source : [["KCCC", 25]],
	description : desc([
		"I infuse a ranged weapon: no longer needs ammo, deals force damage, loses loading"
	]),
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.isRangedWeapon && (/^(?=.*arcane)(?=.*(ammunition|ammo)).*$/i).test(v.WeaponTextName)) {
					fields.Description = fields.Description.replace(/(,? ?loading|loading,? ?)/i, '');
					fields.Damage_Type = "force";
				};
			},
			"If I include the words \"Arcane Ammunition\" or \"Arcane Ammo\" in the name of a ranged weapon it will be treated as the Arcane Ammunition upgrade. It produces its own ammunition that deals force damage, thus its loading property is removed if it has it."
		],
	}
}, {
	KCCClevel : 5,
	name : "Deflecting Weapon",
	source : [["KCCC", 25]],
	description : desc([
		"While I have an animated melee weapon I can use my reaction to try to block an attack",
		"I roll a d8 and add it to my AC, if the atk misses I can make a weap atk against them",
		"If I take the Attack action on my next turn I can only make one weapon attack",
		"This attack can't be with the animated weapon I used to block the attack with"
	]),
	action : [["reaction", ""]]
}, {
	KCCClevel : 5,
	name : "Lesser Ring of Protection",
	source : [["KCCC", 25]],
	description : desc([
		"I create a lesser ring of protection, any creature wearing it gains a +1 bonus to AC"
	]),
	magicitemsAdd : ["Lesser Ring of Protection"]
}, {
	KCCClevel : 5,
	name : "Malicious Infusion",
	source : [["KCCC", 25]],
	description : desc([
		"I learn Heat Metal spell, and can cast it as a reaction on a metal weapon when hit with it"
	]),
	spellcastingBonus : [{
		name : "Malicious Infusion",
		spells : ["heat metal"],
		selection : ["heat metal"]
	}],
	action : [["reaction", "Heat Metal (when hit)"]]
}, {
	KCCClevel : 5,
	name : "Ring of Reaction",
	source : [["KCCC", 25]],
	description : desc([
		"I create a magic ring, a creature wearing it can add my Int mod to Dex saves and initiative"
	]),
	magicitemsAdd : ["Ring of Reaction"]
}, {
	KCCClevel : 5,
	name : "Translocation Binding",
	source : [["KCCC", 25]],
	description : desc([
		"When I attack with an animated or infused melee weapon I can use a bns to teleport",
		"I expend a spell slot to teleport within 5 feet of the weapon before it returns"
	]),
	action : [["bonus action", ""]]
}, {
	KCCClevel : 5,
	name : "Weapon Enhancement Expertise",
	source : [["KCCC", 25]],
	description : desc([
		"Arcane Weapon, Magic Weapon, Vorpal Weapon: the weapon deals +1d4 force damage",
		"Prismatic Weapon increases the damage of the weapon by an extra 1d4 of chosen type",
		"I have advantage on Con saves to maintain Concentration on these spells"
	]),
	spellChanges : {
		"arcane weapon" : {
			description : "1 weapon is magical, does Force dmg, +1d4 dmg, ignores ammunition and loading; SL3: 8h, SL5: 24h",
			changes : "With the Weapon Enhancement Expertise upgrade Arcane Weapon increases the damage of the weapon by 1d4 force damage."
		},
		"magic weapon" : {
			description : "1 weapon is magical with +1 bonus to atk and dmg, extra 1d4 Force dmg; SL4: +2, SL6: +3",
			changes : "With the Weapon Enhancement Expertise upgrade Magic Weapon increases the damage of the weapon by 1d4 force damage."
		},
		"vorpal weapon" : {
			description : "+3 magic weap, +1d4 Force dmg, ignore slash resist, objs x2 dmg, crit on crea w/ 50 HP or less kills",
			changes : "With the Weapon Enhancement Expertise upgrade Vorpal Weapon increases the damage of the weapon by 1d4 force damage."
		},
		"prismatic weapon" : {
			description : "+1 magic weapon, +1d6+1d4 Acid, Cold, Fire, Lightn, Poison, or Thunder dmg; SL4: +2d6, SL6: +3d6",
			changes : "With the Weapon Enhancement Expertise upgrade Prismatic Weapon increases the damage of the weapon by an additional 1d4 damage."
		}
	},
	savetxt : { text : "Adv. on Con (Concentration) saves for Arcane Weapon, Magic Weapon, Vorpal Weapon, and Prismatic Weapon" }
}, {
	KCCClevel : 5,
	name : "Weapon Enhancement Resonance",
	source : [["KCCC", 25]],
	description : desc([
		"When I cast Arcane Weapon, Magic Weapon, Vorpal Weapon, or Prismatic Weapon",
		"On one of my animated or infused weapons, it applies to all of them",
		"I can target magic weapons with these spells"
	])
},
	KCCCglobal.fn.upgradeWandorRod("Wand", "3rd level", false, 1, 9),
	KCCCglobal.fn.upgradeWandorRod("Wand", "3rd level", false, 2, 9),
	KCCCglobal.fn.upgradeWandorRod("Wand", "3rd level", false, 3, 9),
	KCCCglobal.fn.upgradeWandorRod("Wand", "3rd level", false, 4, 9),
	KCCCglobal.fn.upgradeWandorRod("Wand", "3rd level", false, 5, 9),
	KCCCglobal.fn.upgradeWandorRod("Wand", "3rd level", false, 6, 9),
	KCCCglobal.fn.upgradeWandorRod("Wand", "3rd level", false, 7, 9),
{
	listname : "Detonate Armanent (prereq: Arcane Armament)",
	prereqKCCC : { featuresAnd : ["arcane armament"], },
	KCCClevel : 9,
	name : "Detonate Armament",
	source : [["KCCC", 25]],
	description : desc([
		"When I take damage while using Mage Armor, as a reaction I can cast Turbulent Warp",
		"It does not require a spell slot, and ends the effects of Mage Armor"
	]),
	spellcastingBonus : [{
		name : "Detonate Armament",
		spells : ["turbulent warp"],
		selection : ["turbulent warp"],
		firstCol : "oncesr"
	}],
	usages : 1,
	recovery : "short rest",
	action : [["reaction", ""]]
}, {
	KCCClevel : 9,
	name : "Dimensional Pockets",
	source : [["KCCC", 25]],
	description : desc([
		"A pocket on my gear behaves like a Bag of Holding up to 50 lbs, with a 6-inch opening"
	])
}, {
	KCCClevel : 9,
	name : "Invisibility Cloak",
	source : [["KCCC", 25]],
	description : desc([
		"I create an invisibility cloak that allows the wearer to cast Invisibility"
	]),
	magicitemsAdd : ["Invisibility Cloak"]
}, {
	KCCClevel : 9,
	name : "Prepared Enchantment",
	source : [["KCCC", 26]],
	description : desc([
		"I can cast a limited Contingency without expending a spell slot or material components",
		"The spell ends if I finish a long rest, and the contigent spell must be 2nd level or lower"
	]),
	usages : 1,
	recovery : "long rest",
	spellcastingBonus : [{
		name : "Prepared Enchantment",
		spells : ["contingency"],
		selection : ["contingency"],
		firstCol : "oncelr"
	}]
}, {
	KCCClevel : 9,
	name : "Spell-Trapping Ring",
	source : [["KCCC", 26]],
	description : desc([
		"I can cast Counterspell without using a spell slot; On a success",
		"I can cast the countered spell without using a spell slot before I finish a long rest"
	]),
	usages : 1,
	recovery : "long rest",
	spellcastingBonus : [{
		name : "Spell-Trapping Ring",
		spells : ["counterspell"],
		selection : ["counterspell"],
		firstCol : "oncelr"
	}]
},
	KCCCglobal.fn.upgradeWandorRod("Wand", "4th level", 13, 1, 11),
	KCCCglobal.fn.upgradeWandorRod("Wand", "4th level", 13, 2, 11),
	KCCCglobal.fn.upgradeWandorRod("Wand", "4th level", 13, 3, 11),
	KCCCglobal.fn.upgradeWandorRod("Wand", "4th level", 13, 4, 11),
{
	KCCClevel : 11,
	name : "Empower Weapon",
	source : [["KCCC", 26]],
	description : desc([
		"When I hit a melee weapon attack, I can use a bonus action to do +2d6 force damage",
		"I can expend a spell slot to increase this by 1d6+1d6/SL force damage"
	]),
	action : [["bonus action", ""]]
}, {
	KCCClevel : 11,
	name : "Enchanted Broom",
	source : [["KCCC", 26]],
	description : desc([
		"I can create a Broom of Flying; I set the command word and it only obeys me"
	]),
	magicitemsAdd : ["Broom of Flying"]
}, {
	KCCClevel : 11,
	name : "Life Infusion",
	source : [["KCCC", 26]],
	description : desc([
		"I can cast Regenerate without expending a spell slot or material components"
	]),
	usages : 1,
	recovery : "long rest",
	spellcastingBonus : [{
		name : "Life Infusion",
		spells : ["regenerate"],
		selection : ["regenerate"],
		firstCol : "oncelr"
	}],
	spellChanges : {
		"regenerate" : {
			components : "V,S",
			compMaterial : "",
			changes : "Using Life Infusion, I can cast Regenerate once per long rest without material components."
		}
	}
},
	KCCCglobal.fn.upgradeWandorRod("Rod", "5th level", false, 1, 11),
	KCCCglobal.fn.upgradeWandorRod("Rod", "5th level", false, 2, 11),
	KCCCglobal.fn.upgradeWandorRod("Rod", "5th level", false, 3, 11),
	KCCCglobal.fn.upgradeWandorRod("Rod", "5th level", false, 4, 11),
	KCCCglobal.fn.upgradeWandorRod("Rod", "5th level", false, 5, 11),
	KCCCglobal.fn.upgradeWandorRod("Rod", "5th level", false, 6, 11),
	KCCCglobal.fn.upgradeWandorRod("Rod", "6th level", 13, 1, 11),
	KCCCglobal.fn.upgradeWandorRod("Rod", "6th level", 13, 2, 11),
	KCCCglobal.fn.upgradeWandorRod("Rod", "6th level", 13, 3, 11),
	KCCCglobal.fn.upgradeWandorRod("Rod", "6th level", 13, 4, 11),
{
	KCCClevel : 11,
	name : "Mixed Technique",
	source : [["KCCC", 26]],
	description : desc([
		"When I use my action to cast a cantrip from my blasting rod, I can use my bns to attack",
		"I make one weapon attack with my animated or infused weapon"
	]),
	action : [["bonus action", ""]]
}, {
	KCCClevel : 15,
	name : "Advanced Object Animation",
	source : [["KCCC", 26]],
	description : desc([
		"When I cast the Animate Objects spell, the objs use my spell atk bonus for their atk rolls",
		"They gain a bonus to their damage rolls: Tiny/Small +1, Medium +2, Large +4, Huge +8"
	]),
	spellChanges : {
		"animate objects" : {
			changes : "When I cast the Animate Objects spell, the animated objects use my spell attack bonus for their attack rolls, and they gain a bonus to their damage rolls based on their size: +1 (Tiny or Small), +2 (Medium), +4 (Large), or +8 (Huge)."
		}
	}
},
	KCCCglobal.fn.upgradeWandorRod("Wand", "5th level", 17, 1, 15),
	KCCCglobal.fn.upgradeWandorRod("Wand", "5th level", 17, 2, 15),
	KCCCglobal.fn.upgradeWandorRod("Rod", "7th level", false, 1, 15),
	KCCCglobal.fn.upgradeWandorRod("Rod", "7th level", false, 2, 15),
	KCCCglobal.fn.upgradeWandorRod("Rod", "7th level", false, 3, 15),
	KCCCglobal.fn.upgradeWandorRod("Rod", "8th level", 17, 1, 15),
	KCCCglobal.fn.upgradeWandorRod("Rod", "8th level", 17, 2, 15),
	KCCCglobal.fn.upgradeWandorRod("Rod", "9th level", 19, 1, 15),
{
	KCCClevel : 15,
	name : "Third Animated Weapon",
	source : [["KCCC", 26]],
	description : desc([
		"If I have two animated weapons, I can make a third animated weapon",
		"When I take the Attack action I can attack with all three as part of the same action"
	])
}]
// The magic items for the Infused Armament feature
MagicItemsList["animated weapon"] = {
	name : "Animated Weapon",
	nameTest : /^(?!=.*archer)(?=.*animated)(?=.*weapon).*$/i,
	source : [["KCCC", 23]],
	type : "weapon (any melee)",
	prerequisite : "Being an Infusionsmith or an Inventor with Animated Weapon as a Cross-Disciplinary Knowledge",
	prereqeval : function(v) {
		return classes.known.inventor && (classes.known.inventor.subclass.indexOf("infusionsmith") !== -1 || KCCCglobal.fn.currentChoices().indexOf("animated weapon") !== -1);
	},
	description : "I can use this melee weapon as normal, or I can ready it, causing it to float beside me. While readied, I can make melee spell attacks with it at a distance as part of my Attack action. All attacks during a turn must be against the same target. The distance is 30 ft, half for Heavy and double for Light weapons.",
	descriptionFull : "You touch a melee weapon, causing it to spring to life. This Animated Weapon can be carried or stowed like a normal weapon, or you can ready it, causing it to float beside you. While an Animated Weapon is readied, you can make attacks with it as part of the Attack action, sending it out to strike a target. All attacks made with your Animated Weapon during a turn must be made against the same target."+
	"\n   This special attack is a melee spell attack with which you are proficient. You can make this special attack against a target out to a range of 30 feet away from you. If the weapon has the heavy or special property, this range is halved to 15 feet; and if the weapon has the light property, this range is doubled to 60 feet. On a hit, the target takes damage equal to the weapon's damage dice + your Intelligence modifier.",
	allowDuplicates : true,
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				// Don't do weapons added by magic items and features
				if (CurrentVars.extraWeapons && v.WeaponName in CurrentVars.extraWeapons) return;
				if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && /\banimated\b/i.test(v.WeaponTextName)) {
					v.theWea.isMagicWeapon = true;
					fields.Mod = 4;
					fields.Proficiency = true;
					var distance = 30;
					if (/heavy|special/i.test(fields.Description)) {
						distance = 15;
					} else if (/light/i.test(fields.Description)) {
						distance = 60;
					}
					fields.Description += (fields.Description ? '; ' : '') + 'Can attack at ' + distance + ' ft';
				}
			},
			'If I include the word "Animated" in the name of a melee weapon, it will be treated as the magic weapon Animated Weapon.'
		],
		atkCalc : [
			function (fields, v, output) {
				// Don't do weapons added by magic items and features
				if (CurrentVars.extraWeapons && v.WeaponName in CurrentVars.extraWeapons) return;
				if (!v.theWea.isMagicWeapon && v.isMeleeWeapon && /\banimated\b/i.test(v.WeaponTextName)) {
					v.theWea.isMagicWeapon = true;
					v.theWea.useSpellMod = "inventor";
				}
			},
			''
		]
	}
};
MagicItemsList["blasting rod"] = {
	name : "Blasting Rod",
	nameTest : /^(?=.*blasting)(?=.*rod).*$/i,
	source : [["KCCC", 23]],
	type : "wondrous item",
	prerequisite : "Being an Infusionsmith or an Inventor with Blasting Rod as a Cross-Disciplinary Knowledge",
	prereqeval : function(v) {
		return classes.known.inventor && (classes.known.inventor.subclass.indexOf("infusionsmith") !== -1 || KCCCglobal.fn.currentChoices().indexOf("blasting rod") !== -1);
	},
	description : "When I create the Blasting Rod I choose an Evocation cantrip from the wizard spell list that doesn't require concentration. As an action I can cast that cantrip. I add my Intelligence modifer to the damage I deal with this spell once per turn",
	descriptionFull : "You touch a nonmagical object\u2014a wand-blank, stick, staff, or rod\u2014turning it into a Blasting Rod and infusing it with the ability to cast a cantrip. Select one evocation cantrip from the wizard spell list that doesn't require concentration. Thereafter, as an action, you can use the Blasting Rod to cast that cantrip."+
	"\n   Once per turn, when you deal damage to a creature or object with your Blasting Rod, you can add your Intelligence modifier to the damage dealt to that target.",
	eval : function () {
		CurrentSpells['blasting rod'] = {
			name : 'Blasting Rod (item)',
			ability : "inventor",
			list : { 'class' : 'wizard', level : [0, 0], school : ["Evoc"] },
			known : { cantrips : 0, spells : 'list' },
			bonus : {
				bon1 : {
					name : 'Just select "Full List"',
					spells : []
				},
				bon2 : {
					name : 'on the bottom left',
					spells : []
				}
			},
			typeList : 4,
			refType : "item",
			allowUpCasting : true,
			firstCol : "At" // Active
		};
		SetStringifieds('spells'); CurrentUpdates.types.push('spells');
	},
	removeeval : function () {
		delete CurrentSpells['blasting rod'];
		SetStringifieds('spells'); CurrentUpdates.types.push('spells');
	},
	calcChanges : {
		atkCalc : [
			function (fields, v, output) {
				if (v.isSpell && SpellsList[v.WeaponName] && SpellsList[v.WeaponName].school == "Evoc" && /\bblasting\b/i.test(v.WeaponTextName)) {
					output.extraDmg += What('Int Mod');
				}
			},
			'If I include the word "Blasting" in the name of a cantrip, it will be treated as the cantrip from Blasting Rod.'
		],
		spellAdd : [
			function (spellKey, spellObj, spName) {
				if (spName === 'blasting rod') {
					spellObj.firstCol = "checkbox";
					if (What("Int Mod") && Number(What("Int Mod")) > 0) {
						return genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Int", true);
					}
				}
			},
			"Cantrips cast using my Blasting Rod get my Intelligence modifier added to the damage dealt to a single target once per turn."
		]
	}
};
MagicItemsList["infused weapon"] = {
	name : "Infused Weapon",
	nameTest : /^(?=.*infused)(?=.*weapon).*$/i,
	source : [["KCCC", 23]],
	type : "weapon (any)",
	prerequisite : "Being an Infusionsmith or an Inventor with Infused Weapon as a Cross-Disciplinary Knowledge",
	prereqeval : function(v) {
		return classes.known.inventor && (classes.known.inventor.subclass.indexOf("infusionsmith") !== -1 || KCCCglobal.fn.currentChoices().indexOf("infused weapon") !== -1);
	},
	description : "I am proficient with this enchanted weapon, and nobody else. I can use Intelligence as the modifier for attack and damage rolls made with it, instead of Strength or Dexterity. If it uses a single damage die, that die is increased by one step (up to 1d12).",
	descriptionFull : "You touch a weapon, enchanting it. While this weapon is enchanted, you (and only you) have proficiency with it. This Infused Weapon can be wielded like a normal weapon, but it gains the following special property:"+
	"\n   You can use your Intelligence modifier, instead of Strength or Dexterity, for the weapon's attack and damage rolls. In addition, if the weapon has a single damage die, the size of that die increases by one (to a maximum of a d12). For example, if the Infused Weapon is a dagger, its damage die increases from a d4 to a d6.",
	allowDuplicates : true,
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				// Don't do weapons added by magic items and features
				if (CurrentVars.extraWeapons && v.WeaponName in CurrentVars.extraWeapons) return;
				if (!v.theWea.isMagicWeapon && !v.isSpell && /\binfused\b/i.test(v.WeaponTextName)) {
					v.theWea.isMagicWeapon = true;
					fields.Proficiency = true;
					if (Number(What(AbilityScores.abbreviations[fields.Mod - 1] + ' Mod')) < Number(What("Int Mod"))) fields.Mod = 4;
					switch(fields.Damage_Die) {
						case "1d4":
							fields.Damage_Die = "1d6";
							break;
						case "1d6":
							fields.Damage_Die = "1d8";
							break;
						case "1d8":
							fields.Damage_Die = "1d10";
							break;
						case "1d10":
							fields.Damage_Die = "1d12";
							break;
					}
				}
			},
			'If I include the word "Infused" in the name of a regular weapon, it will be treated as the magic weapon Infused Weapon.'
		]
	}
};
// Magic Items for upgrades
MagicItemsList["animated archer weapon"] = {
	name : "Animated Archer Weapon",
	nameTest : /^(?=.*animated)(?=.*archer)(?=.*weapon).*$/i,
	source : [["KCCC", 23]],
	type : "weapon (any ranged)",
	prerequisite : "Being an Infusionsmith with the Animated Archer upgrade",
	prereqeval : function(v) {
		return classes.known.inventor && (classes.known.inventor.subclass.indexOf("infusionsmith") !== -1 && KCCCglobal.fn.currentChoices().indexOf("animated archer") !== -1);
	},
	description : "I can use this ranged weapon as normal, or I can ready it, causing it to float beside me. While readied, I can make ranged spell attacks as part of my Attack action. All attacks during a turn must be against the same target. The weapon requires ammunition, and can carry up to 30 ammunition at a time. I can reload it as an action.",
	descriptionFull : "You touch a ranged weapon, causing it to spring to life. This Animated Weapon can be carried or stowed like a normal weapon, or you can ready it, causing it to float beside you. While an Animated Weapon is readied, you can make attacks with it as part of the Attack action, sending it out to strike a target. All attacks made with your Animated Weapon during a turn must be made against the same target."+
	"\n   This special attack is a ranged spell attack with which you are proficient. You can make this special attack against a target in range of the weapon. On a hit, the target takes damage equal to the weapon's damage dice + your Intelligence modifier. The weapon requires ammunition, and it can carry up to 30 pieces of ammunition at a time. You can reload the ammunition at any time as an action",
	allowDuplicates : true,
	action : [["action", "Reload Animated Archer Weapon"]],
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				// Don't do weapons added by magic items and features
				if (CurrentVars.extraWeapons && v.WeaponName in CurrentVars.extraWeapons) return;
				if (!v.theWea.isMagicWeapon && v.isRangedWeapon && /\banimated\b/i.test(v.WeaponTextName)) {
					v.theWea.isMagicWeapon = true;
					fields.Mod = 4;
					fields.Proficiency = true;
					if (!(/\bammunition\b/i).test(v.WeaponText)) {
						fields.Description += (fields.Description ? '; ' : '') + 'Ammunition';
					}
				}
			},
			'If I include the word "Animated" in the name of a ranged weapon, it will be treated as the magic weapon Animated Archer Weapon.'
		],
		atkCalc : [
			function (fields, v, output) {
				// Don't do weapons added by magic items and features
				if (CurrentVars.extraWeapons && v.WeaponName in CurrentVars.extraWeapons) return;
				if (!v.theWea.isMagicWeapon && v.isRangedWeapon && /\banimated\b/i.test(v.WeaponTextName)) {
					v.theWea.isMagicWeapon = true;
					v.theWea.useSpellMod = "inventor";
				}
			},
			''
		]
	}
};
MagicItemsList["lesser ring of protection"] = {
	name : "Lesser Ring of Protection",
	source : [["KCCC", 25]],
	type : "ring",
	prereqeval : function(v) {
		return classes.known.inventor && (classes.known.inventor.subclass.indexOf("infusionsmith") !== -1 || KCCCglobal.fn.currentChoices().indexOf("lesser ring of protection") !== -1);
	},
	description : "While wearing this ring, I gain a +1 bonus to AC",
	descriptionFull : "Any creature wearing this rings gains a +1 bonus to AC",
	extraAC : [{name : "Lesser Ring of Protection", mod : 1, magic : true, text : "I gain a +1 bonus to AC."}],
};
MagicItemsList["ring of reaction"] = {
	name : "Ring of Reaction",
	source : [["KCCC", 25]],
	type : "ring",
	prereqeval : function(v) {
		return classes.known.inventor && (classes.known.inventor.subclass.indexOf("infusionsmith") !== -1 || KCCCglobal.fn.currentChoices().indexOf("ring of reaction") !== -1);
	},
	description : "While wearing this ring, I add the creator's Intelligence modifier to my Dexterity saving throws and initiative rolls.",
	descriptionFull  : "Any creature wearing this ring can add your Intelligence modifier to its Dexterity saving throws and initiative rolls.",
	addMod : [
		{ type : "save", field : "Dex", mod : "max(Int|0)", text : "I gain a bonus to my Dexterity saves equal to my Intelligence modifier."},
		{ type : "skill", field : "Init", mod : "max(Int|0)", text : "I gain a bonus to my initiative rolls equal to my Intelligence modifier."}
	]
};
MagicItemsList["invisibility cloak"] = {
	name : "Invisibility Cloak",
	source : [["KCCC", 25]],
	type : "wondrous item",
	prereqeval : function(v) {
		return classes.known.inventor && (classes.known.inventor.subclass.indexOf("infusionsmith") !== -1 || KCCCglobal.fn.currentChoices().indexOf("invisibility cloak") !== -1);
	},
	description : "While wearing this cloak, once per short rest, I can cast Invisibility without expending a spell slot or material components. When cast this way it does not require concentration. It ends early if I am no longer wearing the cloak or if I choose to end it (no action required).",
	descriptionFull : "While wearing this cloak, a creature can cast Invisibility on itself, without expending a spell slot or material components. When cast in this way, the spell doesn't require the caster's concentration. The spell ends if the caster is no longer wearing the cloak or if they choose to end the spell early (no action required). Once a creature uses the cloak to cast this spell, it can't be used in this way again until you finish a short or long rest.",
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : [{
		name : "Invisibility Cloak",
		spells : ["invisibility"],
		selection : ["invisibility"],
		firstCol : "oncesr"
	}],
	spellChanges : {
		"invisibility" : {
			components : "V,S",
			compMaterial : "",
			duration : "1 hr",
			changes : "Using Invisibility Cloak, I can cast Invisibility once per short rest without material components. It does not require concentration, and ends if the cloak is removed or if the wearer chooses to end it (no action)."
		}
	},
}
}

{// Potionsmith subclass DONE
var KCCC_potionsmith = AddSubClass("inventor", "potionsmith", {
	regExpSearch : /^((?=.*potion)(?=.*smith)).*$/i,
	subname : "Potionsmith",
	fullname : "Potionsmith",
	source : [["KCCC", 27]],
	features : {
		"subclassfeature1" : {
			name : "Alchemical Reagents Pouch",
			source : [["KCCC", 27]],
			minlevel : 1,
			description : " [50 gp or 1 day to recreate]" + desc([
				"This pouch functions as alchemical supplies for me, required for my potionsmith features",
				"Additionally, I can create potions in \u00BD the normal crafting time"
			]),
			toolProfs : ["Alchemist's supplies", "Herbalism kit"],
			weaponProfs : [false, false, ["blowgun"]]
		},
		"subclassfeature1.1" : {
			name : "Instant Reactions",
			source : [["KCCC", 27]],
			minlevel : 1,
			description : ' [use "Choose Feature" button]' + desc([
				"I learn 3 instant reactions; Instant reactions use my inventor spell save DC"
			]),
			extraname : "Free Upgrade",
			extrachoices : ["Alchemical Acid (Instant Reaction)", "Alchemical Fire (Instant Reaction)", "Fortifying Fumes (Instant Reaction)", "Healing Draught (Instant Reaction)", "Poisonous Gas (Instant Reaction)"],
			extraTimes : [3],
			"alchemical acid (instant reaction)" : {
				name : "Alchemical Acid (Instant Reaction)",
				source : [["KCCC", 28]],
				description : desc([
					"As an action, I can throw acid to a point within 20 ft, affecting a 5-ft radius",
					"All within the area must make a Dex save or take acid damage, \xD72 for constructs/objects",
					"As a bonus action, I can prepare it to be used as a ranged weapon in the same round"
				]),
				additional : cantripDie.map(function (n) {
					return (n*2) + "d4 acid damage";
				}),
				action : [["action", "Alchemical Acid (5-ft rad)"], ["bonus action", "Alchemical Acid (prepare for attack)"]],
				weaponsAdd : ["Alchemical Acid"],
				weaponOptions : {
					regExpSearch : /^(?=.*alchemical)(?=.*acid).*$/i,
					name : "Alchemical Acid",
					source : [["KCCC", 28]],
					ability : 2,
					type : "AlwaysProf",
					damage : ["=(C+C)", 4, "acid"],
					range : "20/60 ft",
					description : "Finesse, thrown; Alt: 5-ft radius within 20 ft, Dex save to avoid; Constructs/object \xD72 damage",
					abilitytodamage : false,
					KCCC_instantReaction : true
				}
			},
			"alchemical fire (instant reaction)" : {
				name : "Alchemical Fire (Instant Reaction)",
				source : [["KCCC", 28]],
				description : desc([
					"As an action, I can throw acid to a point within 20 ft, affecting a 5-ft radius",
					"All within the area must make a Dexterity saving throw or take fire damage",
					"As a bonus action, I can prepare it to be used as a ranged weapon in the same round"
				]),
				additional : cantripDie.map(function (n) {
					return n + "d8 fire damage";
				}),
				action : [["action", "Alchemical Fire (5-ft rad)"], ["bonus action", "Alchemical Fire (prepare for attack)"]],
				weaponsAdd : ["Alchemical Fire"],
				weaponOptions : {
					regExpSearch : /^(?=.*alchemical)(?=.*fire).*$/i,
					name : "Alchemical Fire",
					source : [["KCCC", 28]],
					ability : 2,
					type : "AlwaysProf",
					damage : ["C", 8, "fire"],
					range : "20/60 ft",
					description : "Finesse, thrown; Alt: 5-ft radius within 20 ft, Dex save to avoid",
					abilitytodamage : false,
					KCCC_instantReaction : true
				}
			},
			"fortifying fumes (instant reaction)" : {
				name : "Fortifying Fumes (Instant Reaction)",
				source : [["KCCC", 29]],
				additional : cantripDie.map(function (n) {
					return n + "d4 temp HP \u0026 damage"
				}),
				description : desc([
					"As an action, I can throw reagents to a point within 20 ft, affecting a 10-ft radius",
					"All in the area can gain temp HP, and deal extra damage on the next melee weapon attack",
					"And have advantage on their next Constitution save until my next turn ends"
				]),
				action : [["action", "Fortifying Fumes (10-ft rad)"]]
			},
			"healing draught (instant reaction)" : {
				name : "Healing Draught (Instant Reaction)",
				source : [["KCCC", 29]],
				additional : cantripDie.map(function (n) {
					return "regains " + n + "d8 HP"
				}),
				description : desc([
					"As a bonus action I create a healing draught that heals hit points; Lasts until my next turn",
					"A creature can use its action to drink it or administer it to a creature within 5 ft",
					"A creature can only benefit a number of times up to its Con mod (min 1) each long rest"
				]),
				action : [["bonus action", "Healing Draught (create)"], ["action", "Healing Draught (drink or administer)"]]
			},
			"poisonous gas (instant reaction)" : {
				name : "Poisonous Gas (Instant Reaction)",
				source : [["KCCC", 29]],
				additional : cantripDie.map(function (n) {
					return n + "d4 poison damage"
				}),
				description : desc([
					"As an action, I can create fumes at a point within 20 ft, affecting a 10-ft radius",
					"All within the area must make a Constitution saving throw or take poison damage",
					"If they fail they are also poisoned until the next of their next turn"
				]),
				action : [["action", "Poisonous Gas (10-ft rad)"]]
			}
		},
		"subclassfeature3" : {}, // Will be filled out by the KCCC_inventorSubclass_subclassfeature3 function
		"subclassfeature3.1" : {
			name : "Alchemical Infusions",
			source : [["KCCC", 27]],
			minlevel : 3,
			description : " [can drink potions as a bonus action]" + desc([
				"I learn spells that I can create any number of potions of at the end of a rest",
				"I expend a spell slot for each potion, and must provide an empty vial for each potion",
				"If it grants an effect or heals a creature can use it or administer it as an action",
				"If it targets an area I can throw it 30 ft, the spell effect is centered on that point",
				'If it targets a creature I can treat it as the ranged weapon Infused Potion"',
				"If the spell requires Concentration, it instead lasts rounds equal to my Int mod",
				"They lose potency if unused by the end of my next long rest"
			]),
			action : [["bonus action", "Consume Potion"]],
			weaponsAdd : ["Infused Potion"],
			weaponOptions : {
				regExpSearch : /^(?=.*infused)(?=.*potion).*$/i,
				name : "Infused Potion",
				source : [["KCCC", 28]],
				ability : 2,
				type : "AlwaysProf",
				damage : ["\u2015", "", ""],
				range : "20/60 ft",
				description : "Thrown; Spell is cast centered on the impact of the broken vial",
				abilitytodamage : false
			},
			eval : function() {
				// manually create a new CurrentSpells object for Alchemical Infusions
				CurrentSpells['inventor-alchemical infusions'] = {
					name : 'Alchemical Infusions',
					ability : "inventor",
					list : { spells : ["cure wounds", "fog cloud", "grease", "heroism", "barkskin", "lesser restoration", "shatter", "web", "blink", "haste", "stinking cloud", "water breathing", "confusion", "stoneskin", "cloudkill"] },
					known : { spells : 'list', prepared : true },
					refType : "class", // MPMB: if this is set to something else, the level will always be set automatically to the total character level. Setting this to class makes it possible to control it with the changeeval
					factor : [2, "default"],
					level : classes.known.inventor.level,
					typeList : 2
				};
				// update the changes dialog
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			},
			removeeval : function() {
				// remove the Alchemical Infusions entry in the CurrentSpells object
				delete CurrentSpells['inventor-alchemical infusions'];
				// update the changes dialog
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			},
			changeeval : function() {
				// update the Alchemical Infusions level whenever the Inventor level changes
				if (classes.known.inventor && CurrentSpells['inventor-alchemical infusions']) CurrentSpells['inventor-alchemical infusions'].level = classes.known.inventor.level;
			},
			calcChanges : {
				spellAdd : [
					function (spellKey, spellObj, spName, isDuplicate) {
						if (spName === 'inventor-alchemical infusions' && /conc(entration),/i.test(spellObj.duration)) {
							// concentration spells get a fixed duration
							var intMod = Math.max(1, Number(What("Int Mod")));
							spellObj.duration = intMod + " (Int) rnds";
							return true;
						}
					},
					"Alchemical Infusions of spells that normally require concentration, don't require concentration when it takes effect in this way, but its duration is shortened to a number of rounds equal to my Intelligence modifier (minimum 1)."
				]
			}
		},
		"subclassfeature5" : {
			name : "Empowered Alchemy",
			source : [["KCCC", 28]],
			minlevel : 5,
			description : desc([
				"I add my Int mod to damage, temp HP, healing from instant reactions \u0026 infused potions"
			]),
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (v.theWea.KCCC_instantReaction) {
							output.extraDmg += Math.max(0, Number(What('Int Mod')));
						}
					},
					'I can add my Intelligence modifier to the damage from an instant reaction.'
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (spName === 'inventor-alchemical infusions' && What("Int Mod") && Number(What("Int Mod")) > 0) {
							if (spellKey === "heroism") {
								// only spell that grants temp HP, which is now doubled
								spellObj.description = "1+1/SL crea immune to fear, gain (2\xD7 Int mod) " + (Number(What("Int Mod"))*2) + " temp. HP start of each turn while spell lasts";
								return true;
							} else if (genericSpellDmgEdit(spellKey, spellObj, "heal", "Int") || genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Int")) {
								return true;
							}
						}
					},
					"I can add my Intelligence modifier to the damage, temporary hit points, and healing from an infused potion."
				]
			}
		},
		"subclassfeature14" : {
			name : "Infusion Expertise",
			source : [["KCCC", 28]],
			minlevel : 14,
			description : desc([
				"The first infused potion I create at the end of a rest doesn't require a spell slot",
				"I can choose an infusion spell of any level when making this first potion"
			]),
			eval : function () {
				if (CurrentSpells['inventor-alchemical infusions']) {
					// note that currently this will overwrite any existing bonus (which there shouldn't be)
					CurrentSpells['inventor-alchemical infusions'].bonus = {
						bon1 : {
							name : 'Just select "Full class list"',
							spells : []
						},
						bon2 : {
							name : 'on the bottom left',
							spells : []
						}
					}
					CurrentSpells['inventor-alchemical infusions'].typeList = 4;
					SetStringifieds('spells'); CurrentUpdates.types.push('spells');
				}
			},
			removeeval : function () {
				if (CurrentSpells['inventor-alchemical infusions']) {
					// note that currently this will delete any existing bonus (which there shouldn't be)
					delete CurrentSpells['inventor-alchemical infusions'].bonus;
					CurrentSpells['inventor-alchemical infusions'].typeList = 2;
					SetStringifieds('spells'); CurrentUpdates.types.push('spells');
				}
			}
		}
	}
});
// Potionsmith upgrades
KCCCglobal.upgrades.potionsmith = [
	ClassSubList[KCCC_potionsmith].features["subclassfeature1.1"]["alchemical acid (instant reaction)"],
	ClassSubList[KCCC_potionsmith].features["subclassfeature1.1"]["alchemical fire (instant reaction)"],
	ClassSubList[KCCC_potionsmith].features["subclassfeature1.1"]["fortifying fumes (instant reaction)"],
	ClassSubList[KCCC_potionsmith].features["subclassfeature1.1"]["healing draught (instant reaction)"],
	ClassSubList[KCCC_potionsmith].features["subclassfeature1.1"]["poisonous gas (instant reaction)"],
	{
		name : "Delivery Mechanism",
		source : [["KCCC", 28]],
		description : desc([
			"My instant reactions and infused potions that target a point have a range of 40 ft",
			"Creatures I choose can automatically succeed on Dex saves from the effects of these",
			"When I make an attack with these I can choose to use Int or Dex for the attack roll"
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if ((/^(?=.*infused)(?=.*potion).*$/i).test(v.WeaponTextName) || v.theWea.KCCC_instantReaction) {
						if (What('Int Mod') > What(AbilityScores.abbreviations[fields.Mod - 1] + ' Mod')) {
							fields.Mod = 4;
						}
					}
				},
				"I can use my Intelligence modifier when throwing an infused potion or instant reaction"
			]
		}
	}, {
		name : "Dragon Draught (Instant Reaction)",
		source : [["KCCC", 28]],
		additional : cantripDie.map(function (n) {
			return n + "d8 damage"
		}),
		description : desc([
			"As an action I choose one of the following damage types: acid, cold, fire, or lightning",
			"Cold or fire: 10-ft cone; Acid or lightning: 15-ft line",
			"All within the area must make a Dexterity saving throw or take damage of that type"
		]),
		action : [["action", "Dragon Draught (10-ft cone or 15-ft line)"]]
	}, {
		name : "Explosive Reaction (Instant Reaction)",
		source : [["KCCC", 28]],
		description : desc([
			"As an action, I can throw explosives to a point within 20 ft, affecting a 10-ft radius",
			"All within the area must make a Constitution saving throw or take thunder damage",
			"As a bonus action, I can prepare it to be used as a ranged weapon in the same round"
		]),
		additional : cantripDie.map(function (n) {
			return n + "d10 damage";
		}),
		action : [["action", "Explosive Reaction (10-ft rad)"], ["bonus action", "Explosive Reaction (prepare for attack)"]],
		weaponsAdd : ["Explosive Reaction"],
		weaponOptions : {
			regExpSearch : /^(?=.*explosive)(?=.*reaction).*$/i,
			name : "Explosive Reaction",
			source : [["KCCC", 28]],
			ability : 2,
			type : "AlwaysProf",
			damage : ["C", 10, "thunder"],
			range : "20/60 ft",
			description : "Finesse, thrown; Alt: 10-ft radius within 20 ft, Con save to avoid",
			abilitytodamage : false,
			KCCC_instantReaction : true
		}
	}, {
		name : "Flaming Grease",
		source : [["KCCC", 28]],
		description : desc([
			"When I cast Grease or use it as an infused potion it can be lit on fire",
			"When lit all within area take 2d4 fire damage; It burns my Int mod rounds (min 1)",
			"I can use Grease to coat a weapon for 1 hour or until it takes fire damage, igniting it",
			"Once ignited that weapon does an extra 1d4 fire damage on a hit for 1 minute"
		])
	}, {
		name : "Frostbloom Reaction (Instant Reaction)",
		source : [["KCCC", 29]],
		additional : cantripDie.map(function (n) {
			return n + "d6 cold damage"
		}),
		description : desc([
			"As an action, I can create difficult terrain at a point within 20 ft, affecting a 5-ft radius",
			"All within the area must make a Dex save throw or take cold damage",
			"If they fail and are wholly in the area they are restrained until the end of their next turn",
			"A restrained creature can use its action to make a Str save, ending the effect on a success"
		]),
		action : [["action", "Frostbloom Reaction (5-ft rad)"]]
	}, {
		name : "Homunculus Familiar",
		source : [["KCCC", 29]],
		description : desc([
			"I can cast Find Familiar without using a spell slot or material components other than blood",
			"When I do so it creates a homunculus familiar; See companion page"
		]),
		spellcastingBonus : [{
			name : "Homunculus Familiar",
			spells : ["find familiar"],
			selection : ["find familiar"],
			firstCol : "atwill"
		}],
		spellChanges : {
			"find familiar" : {
				components : "V,S,M",
				compMaterial : "Blood",
				changes : "I can cast Find Familiar without expending a spell slot or material components except blood and my alchemical reagents. When I do so the creature can take any form, but must use the statistics of a creature that could be normally chosen, and is a construct or monstrosity rather than one of the types listed in the spell"
			}
		}
	}, {
		name : "Inoculations",
		source : [["KCCC", 29]],
		description : " [resistance to poison damage]" + desc([
			"At the end of a long rest I can choose up to five creatures",
			"They auto succeed Con saves against poisonous effects I produce until I finish a long rest"
		])
	}, {
		name : "Long Acting",
		source : [["KCCC", 29]],
		description : desc([
			"If an infused potion uses Concentration it instead lasts my Int mod + Prof bonus rounds"
		])
	}, {
		name : "Persistent Reactions",
		source : [["KCCC", 29]],
		description : desc([
			"When I make an instant reaction that effects an area it can last until my next turn",
			"Each creature that enters the area or ends its turn there must repeat the save",
		])
	}, {
		name : "Poisoner's Proficiency",
		source : [["KCCC", 29]],
		description : desc([
			"I gain proficiency with Poisoner's Kit, or expertise if I already have proficiency",
			"During a long rest I can make one of the following poisons that last until I finish a long rest:",
			" \u2022 Contact Poison: I apply this poison to a melee weapon or 10 pieces of ammunition.",
			"   It deals an extra 1d4 poison damage; The weapon does this 10 times before it wears off",
			" \u2022 Ingested Poison: If a creature consumes this poison it must make a Con save with disadv.",
			"   On a fail, after 1 min it takes my inventor level \xD7 d10 poison damage",
			"   It is also poisoned until it finishes a long rest",
			" \u2022 Inhaled Poison: I can use this poison on my poisonous gas instant reaction",
			"   It increases the radius to a 20-ft sphere and doubles the damage dice",
		]),
		toolProfs : ["Poisoner's kit"]
	}, {
		name : "Secrets of Acid",
		source : [["KCCC", 30]],
		description : desc([
			"I can create additional acid related infused potions; See Spell Sheet",
			"After a long rest I can create one infused potion of Summon Ooze without using a spell slot"
		]),
		eval : function () {
			if (CurrentSpells['inventor-alchemical infusions']) {
				var secretSpells = ["summon ooze", "melf's acid arrow", "erode"];
				var infusionSpells = CurrentSpells['inventor-alchemical infusions'].list.spells
				CurrentSpells['inventor-alchemical infusions'].list.spells = infusionSpells.concat(secretSpells);
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			}
		},
		removeeval : function () {
			if (CurrentSpells['inventor-alchemical infusions']) {
				var secretSpells = ["summon ooze", "melf's acid arrow", "erode"];
				var infusionSpells = CurrentSpells['inventor-alchemical infusions'].list.spells;
				CurrentSpells['inventor-alchemical infusions'].list.spells = infusionSpells.filter(x => secretSpells.indexOf(x) == -1);
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			}
		}
	}, {
		name : "Secrets of Fire",
		source : [["KCCC", 30]],
		description : desc([
			"I can create additional fire related infused potions; See Spell Sheet",
			"After a long rest I can create one infused potion of Faerie Fire without using a spell slot"
		]),
		eval : function () {
			if (CurrentSpells['inventor-alchemical infusions']) {
				var secretSpells = ["faerie fire", "unstable explosion", "fireball"];
				var infusionSpells = CurrentSpells['inventor-alchemical infusions'].list.spells;
				CurrentSpells['inventor-alchemical infusions'].list.spells = infusionSpells.concat(secretSpells);
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			}
		},
		removeeval : function () {
			if (CurrentSpells['inventor-alchemical infusions']) {
				var secretSpells = ["faerie fire", "unstable explosion", "fireball"];
				var infusionSpells = CurrentSpells['inventor-alchemical infusions'].list.spells;
				CurrentSpells['inventor-alchemical infusions'].list.spells = infusionSpells.filter(x => secretSpells.indexOf(x) == -1);
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			}
		}
	}, {
		name : "Secrets of Flight",
		source : [["KCCC", 30]],
		description : desc([
			"I can create additional flight related infused potions; See Spell Sheet",
			"After a long rest I can create one infused potion of Feather Fall without using a spell slot"
		]),
		eval : function () {
			if (CurrentSpells['inventor-alchemical infusions']) {
				var secretSpells = ["feather fall", "levitate", "fly"];
				var infusionSpells = CurrentSpells['inventor-alchemical infusions'].list.spells;
				CurrentSpells['inventor-alchemical infusions'].list.spells = infusionSpells.concat(secretSpells);
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			}
		},
		removeeval : function () {
			if (CurrentSpells['inventor-alchemical infusions']) {
				var secretSpells = ["feather fall", "levitate", "fly"];
				var infusionSpells = CurrentSpells['inventor-alchemical infusions'].list.spells;
				CurrentSpells['inventor-alchemical infusions'].list.spells = infusionSpells.filter(x => secretSpells.indexOf(x) == -1);
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			}
		}
	}, {
		name : "Secrets of Frost",
		source : [["KCCC", 30]],
		description : desc([
			"I can create additional frost related infused potions; See Spell Sheet",
			"After a long rest I can create one infused potion of Freezing Shell without using a spell slot"
		]),
		eval : function () {
			if (CurrentSpells['inventor-alchemical infusions']) {
				var secretSpells = ["freezing shell", "cold snap", "flash freeze"];
				var infusionSpells = CurrentSpells['inventor-alchemical infusions'].list.spells;
				CurrentSpells['inventor-alchemical infusions'].list.spells = infusionSpells.concat(secretSpells);
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			}
		},
		removeeval : function () {
			if (CurrentSpells['inventor-alchemical infusions']) {
				var secretSpells = ["freezing shell", "cold snap", "flash freeze"];
				var infusionSpells = CurrentSpells['inventor-alchemical infusions'].list.spells;
				CurrentSpells['inventor-alchemical infusions'].list.spells = infusionSpells.filter(x => secretSpells.indexOf(x) == -1);
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			}
		}
	}, {
		name : "Weapon Coating",
		source : [["KCCC", 30]],
		description : desc([
			"As a bonus action I can apply an instant reaction to a melee weapon or ammunition",
			"The next time I hit with it before my next turn ends, the target is effected by the reaction",
			"Damage or healing is applied automatically, they make a save against any additional effects"
		]),
		action : [["bonus action", ""]]
	}, {
		KCCClevel : 5,
		name : "Adrenaline Serum",
		source : [["KCCC", 30]],
		description : desc([
			"As a bonus action I increase my Str and Dex mods by my Int mod (max +5)",
			"This lasts for my Con mod rounds; I also gain the effects of the Heroism spell",
			"When this ends my speed is halved and I can't benefit from it again until my next turn"
		]),
		action : [["bonus action", ""]],
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (/adrenaline/i.test(v.WeaponTextName) && (fields.Mod === 1 || fields.Mod === 2)) { // MPMB: edited to adhere to the v13.1.9 changes
						output.extraHit += Math.min(What('Int Mod'), 5);
						if (!('abilitytodamage' in v.theWea) || v.theWea.abilitytodamage) {
							output.extraDmg += Math.min(What('Int Mod'), 5);
						}
					}
				},
				"If I include the word \"Adrenaline\" in the name of a weapon it will be treated as though I am under the effects of my adrenaline serum. This increases my Strength and Dexterity modifiers by my Intelligence modifier, to a maximum of +5."
			]
		}
	}, {
		KCCClevel : 5,
		name : "Explosive Powder",
		listname : "Explosive Powder (prereq: Explosive Reaction)",
		prereqKCCC : { featuresAnd : ["explosive reaction (instant reaction)"], },
		source : [["KCCC", 30]],
		description : desc([
			"I can prepare a number of Explosive Reactions up to my Intelligence modifier",
			"These last for 1 minute and will only detonate when exposed to fire",
			"A creature can only be affected by two at once, but structures take full damage from all"
		])
	}, {
		KCCClevel : 5,
		name : "Resistance Potion",
		source : [["KCCC", 30]],
		description : desc([
			"During a long rest, I can create a potion that gives a damage resistance for 10 minutes",
			"I choose acid, cold, fire, lightning, poison, or thunder; It lasts until I finish a long rest"
		])
	}, {
		KCCClevel : 9,
		name : "Aroma Therapies",
		source : [["KCCC", 30]],
		description : desc([
			"Long resting around me regains +2d4 HD, loses 1d4 exhaustion, cures nonmagical disease"
		])
	}, {
		KCCClevel : 9,
		name : "Infusion Stone",
		source : [["KCCC", 30]],
		description : desc([
			"After a long or short rest I can create one infused potion without using a spell slot"
		]),
		usages : 1,
		recovery : "long rest"
	}, {
		KCCClevel : 9,
		name : "Mana Potion",
		source : [["KCCC", 31]],
		description : desc([
			"During a short rest I can make a mana potion that lasts for 1 hour",
			"A creature can consume it to regain a spell slot 3rd level or lower of its choice"
		])
	}, {
		KCCClevel : 9,
		name : "Potent Reactions",
		source : [["KCCC", 31]],
		description : desc([
			"My instant reactions damage or healing increases by one size die",
			"d4 becomes d6; d6 becomes d8; d8 becomes d10; d10 becomes d12"
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (v.theWea.KCCC_instantReaction) {
						var dieIncrease = [["d4", "d6"], ["d6", "d8"], ["d8", "d10"], ["d10", "d12"]];
						if (fields.Damage_Die.endsWith("d4")) {
							fields.Damage_Die = fields.Damage_Die.replace("d4", "d6")
						} else if (fields.Damage_Die.endsWith("d6")) {
							fields.Damage_Die = fields.Damage_Die.replace("d6", "d8")
						} else if (fields.Damage_Die.endsWith("d8")) {
							fields.Damage_Die = fields.Damage_Die.replace("d8", "d10")
						} else if (fields.Damage_Die.endsWith("d10")) {
							fields.Damage_Die = fields.Damage_Die.replace("d10", "d12")
						}
					}
				},
				'My instant reactions damage or healing increases by one size die. d4 becomes d6; d6 becomes d8; d8 becomes d10; d10 becomes d12'
			]
		}
	}, {
		KCCClevel : 9,
		name : "Rocketry",
		listname : "Rocketry (prereq: Explosive Reaction and Delivery Mechanism)",
		prereqKCCC : { featuresAnd : ["explosive reaction (instant reaction)", "delivery mechanism"], },
		source : [["KCCC", 31]],
		description : desc([
			"At the end of a short or long rest I can prepare my Int mod (min 1) rockets",
			"When I create them I choose an instant reaction I know as the payload",
			"A rocket targets a point I can see within 500 ft, but the DC decreases by 2 for each 100 ft",
			"The instant reaction then takes effect centered on that point",
			"I can instead load any object < 1 pound into the rocket, replacing the effect",
			"When I finish a long or short rest any unused rockets lose their potency"
		]),
		action : [["action", "Launch Rocket"]]
	}, {
		KCCClevel : 11,
		name : "Field Infusion",
		source : [["KCCC", 31]],
		description : desc([
			"As an action I can create an infused potion"
		]),
		usages : 1,
		recovery : "short rest",
		action : [["action", ""]]
	}, {
		KCCClevel : 11,
		name : "Mutation Mixture",
		listname : "Mutation Mixture (prereq: level 13 inventor)",
		prereqeval : function(v) { return classes.known.inventor.level >= 13 && KCCCglobal.fn.prereqeval(v); },
		source : [["KCCC", 31]],
		description : desc([
			"I add Polymorph to the list of my alchemical infusion spells",
			"When consumed by a creature it lasts 1 hour, but can be ended early as an action",
			"That creature can't be affected by Polymorph again until it finishes a long rest"
		]),
		eval : function () {
			if (CurrentSpells['inventor-alchemical infusions']) {
				var infusionSpells = CurrentSpells['inventor-alchemical infusions'].list.spells;
				CurrentSpells['inventor-alchemical infusions'].list.spells = infusionSpells.concat(["polymorph"]);
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			}
		},
		removeeval : function () {
			if (CurrentSpells['inventor-alchemical infusions']) {
				var infusionSpells = CurrentSpells['inventor-alchemical infusions'].list.spells;
				CurrentSpells['inventor-alchemical infusions'].list.spells = infusionSpells.filter(x => x != "polymorph");
				SetStringifieds('spells'); CurrentUpdates.types.push('spells');
			}
		}
	}, {
		KCCClevel : 11,
		name : "Panacea",
		source : [["KCCC", 31]],
		description : desc([
			"I can create a more potent healing draught that heals for the maximum value",
			"This healing draught also grants the benefits of Greater Restoration"
		]),
		usages : 1,
		recovery : "long rest"
	}, {
		KCCClevel : 11,
		name : "Perfect Reaction",
		source : [["KCCC", 31]],
		description : desc([
			"When I deal damage, grant temp HP, heal HP with an instant reaction I use the max value"
		]),
		usages : 1,
		recovery : "short rest"
	}, {
		KCCClevel : 15,
		name : "Adrenaline Rush",
		listname : "Adrenaline Rush (prereq: Adrenaline Serum)",
		prereqKCCC : { featuresAnd : ["adrenaline serum"], },
		source : [["KCCC", 31]],
		description : desc([
			"While using adrenaline serum I can attack twice when I take the attack action on my turn"
		])
	}, {
		KCCClevel : 15,
		name : "Mad Alchemy",
		source : [["KCCC", 31]],
		description : desc([
			"When I create an infused potion I can infuse two spells into it, they activate simultaneously"
		])
	}, {
		KCCClevel : 15,
		name : "Philosopher's Stone",
		source : [["KCCC", 31]],
		description : desc([
			"I can use this stone in place of a diamond worth up to 500 gp",
			"This renders the stone inert for 24 hours, providing no benefits",
			"While non-inert I can create 1 pound of gold (50 gp worth) each day from non-gold metal",
			"I can brew an Elixir of Life over 8 hours, crushing a diamond worth 2,000+ gp into it",
			"Consuming it stops aging for 4d4 years and grants the effect of Death Ward until triggered",
			"The Elixir can stop aging for an additional 1d4 years for each additional diamond spent"
		])
}]
CompanionList.homunculus_familiar = {
	name : "Homunculus Familiar",
	nameTooltip : "Homunculus Familiar (Potionsmith feature)",
	nameOrigin : "variant of the Find Familiar 1st-level conjuration [ritual] spell",
	nameMenu : "Homunculus familiar (Potionsmith feature)",
	source : [["KCCC", 29]],
	includeCheck : CompanionList.pact_of_the_chain.includeCheck,
	attributesChange : function(sCrea, objCrea) {
		// can't do any attacks
		objCrea.attacks = [];
		objCrea.type = ["Construct", "Monstrosity"];
		objCrea.subtype = "";
	},
	attributesAdd : CompanionList.familiar.attributesAdd,
	notes : function() {
		var a = newObj(CompanionList.familiar.notes);
		a[0].description = [
			"appearing in an unoccupied space within 10 ft",
			"It assumes any Tiny form or shape desired (can change at every casting)",
			"It has the statistics of any valid creature, but its type changes to construct or monstrosity",
			"When the familiar drops to 0 hit points, it disappears, leaving behind no physical form",
			"It reappears when I cast this spell again (in a new form if so desired)"
		].join("\n   ");
		return a;
	}()
};
}

{// Thundersmith subclass DONE
var KCCC_thundersmith = AddSubClass("inventor", "thundersmith", {
	regExpSearch : /^(?=.*thunder)(?=.*smith).*$/i,
	subname : "Thundersmith",
	fullname : "Thundersmith",
	source : [["KCCC", 32]],
	features : {
		"subclassfeature1" : {
			name : "Stormforged Weapon",
			source : [["KCCC", 32]],
			minlevel : 1,
			description : desc([
				"I gain a Stormforged Weapon, it requires attunement, I can only attune to one at a time",
				"I can create any Stormforged Weapon in 3 days for 200 gp; See magic item",
				"I can create up to 50 ammunition for this weapon during a long rest, cost 1 gp per 10"
			]),
			toolProfs : ["Tinker's tools", "Smith's tools"],
			magicitemsAdd : ["Stormforged Weapon"]
		},
		"subclassfeature3" : {}, // Will be filled out by the KCCC_inventorSubclass_subclassfeature3 function
		"subclassfeature3.1" : {
			name : "Thundermonger",
			source : [["KCCC", 33]],
			minlevel : 3,
			additional : levels.map(function (n) {
				return n < 3 ? "" : Math.ceil((n-2)/2) + "d6 thunder damage"
			}),
			description : desc([
				"When I hit with my Stormforged Weapon I can deal extra thunder damage",
				"If I deal this extra damage in any way I can't do so again until my next turn"
			])
		},
		"subclassfeature5" : {
			name : "Devastating Blasts",
			source : [["KCCC", 33]],
			minlevel : 5,
			description : desc([
				"When I miss with my Stormforged Weapon I can apply \u00BD my Thundermonger damage"
			])
		},
		"subclassfeature14" : {
			name : "Unleashed Power",
			source : [["KCCC", 33]],
			minlevel : 14,
			description : desc([
				"I can use a spell slot when I deal damage with Stormforged Weapon or Thundermonger",
				"I reroll Int mod (min 1) damage dice \u0026 I deal the max roll on dice equal to the spell level"
			])
		}
	}
});
// Thundersmith upgrades
KCCCglobal.upgrades.thundersmith = [
	{
		name : "Adaptable Weapon",
		source : [["KCCC", 33]],
		description : desc([
			"I can give any weapon without ammunition the alternate functionality of a Hand Cannon",
			"I can give any weapon with ammunition the alternate functionality of a Charged Blade",
			'See the magic item entry "Stormforged Weapon" for details'
		])
	}, {
		name : "Extended Range",
		source : [["KCCC", 33]],
		description : desc([
			"My ammunition based Stormforged Weapons range increases by 30 ft/90 ft",
			"My two-handed melee Stormforged Weapons gain the reach property"
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (v.theWea.KCCC_stormforged_weapon) {
						if (v.isRangedWeapon && (/ammunition/i).test(fields.Description)) {
							var rangeNmbrs = fields.Range.match(/([\d,.]+)\/([\d,.]+)/);
							if (rangeNmbrs) {
								var shortRange = (parseFloat(rangeNmbrs[1].replace(',', '.')) + 30).toString();
								var longRange = (parseFloat(rangeNmbrs[2].replace(',', '.')) + 90).toString();
								fields.Range = fields.Range.replace(rangeNmbrs[2], longRange).replace(rangeNmbrs[1], shortRange);
							}
						} else if (v.isMeleeWeapon && (/(((^|[^+-]\b)2|\btwo).?hand(ed)?s?)\b/i).test(fields.Description) && !(/reach/i).test(fields.Description)) {
							fields.Description = fields.Description ? "Reach, " + fields.Description.charAt(0).toLowerCase() + fields.Description.slice(1) : "Reach";
						}
					}
				},
				"My ammunition based ranged Stormforged Weapons range increases by 30 ft/90 ft. My two-handed melee Stormforged Weapons gain the reach property",
				700
			]
		}
	}, {
		name : "Lightning Burst",
		source : [["KCCC", 33]],
		description : desc([
			"As an action, I can attack with my Stormforged Weapon in a 60-ft long 5-ft wide line",
			"All in area make a Dex save against my spell save DC or take my Thundermonger damage",
			"Save halves; Does not use ammunition"
		]),
		action : [["action", ""]]
	}, {
		name : "Lightning Magic",
		source : [["KCCC", 33]],
		description : desc([
			"I can cast Lightning Tendril (or Crackle level 5+) without expending a spell slot",
			"I also learn additional lightning and thunder spells as inventor spells"
		]),
		usages : 1,
		recovery : "long rest",
		spellcastingBonus : [{
			name : "Lightning Magic (1st Level)",
			spells : ["lightning tendril"],
			selection : ["lightning tendril"],
			times : 1,
			firstCol : "oncelr"
		}, {
			name : "Lightning Magic (2nd Level)",
			spells : ["crackle"],
			selection : ["crackle"],
			times : levels.map(function (n) {
				return n < 5 ? 0 : 1;
			}),
			firstCol : "oncelr"
		}, {
			name : "Lightning Magic (3rd Level)",
			spells : ["lightning bolt"],
			selection : ["lightning bolt"],
			times : levels.map(function (n) {
				return n < 9 ? 0 : 1;
			})
		}, {
			name : "Lightning Magic (4th Level)",
			spells : ["jumping jolt"],
			selection : ["jumping jolt"],
			times : levels.map(function (n) {
				return n < 13 ? 0 : 1;
			})
		}, {
			name : "Lightning Magic (5th Level)",
			spells : ["sky burst"],
			selection : ["sky burst"],
			times : levels.map(function (n) {
				return n < 17 ? 0 : 1;
			})
		}]
	}, {
		name : "Point Blank",
		listname : "Point Blank (prereq: Hand Cannon)",
		prereqKCCC : {
			itemsAnd : [["stormforged weapon", "hand cannon"]]
		},
		source : [["KCCC", 34]],
		description : desc([
			"I do not suffer disadvantage on my ranged attacks when I am within 5 ft of an enemy",
			"I can use my Hand Cannon when making opportunity attacks"
		]),
		action : [["reaction", "Opportunity Attack (with Hand Cannon)"]]
	}, {
		name : "Silencer",
		listname : "Silencer (incomp: Echoing Boom)",
		prereqKCCC : {
			featuresNot : ["echoing boom (incomp: silencer)"]
		},
		source : [["KCCC", 34]],
		description : desc([
			" My Stormforged Weapon loses the loud property; I can cast Silence with a spell slot (SS2)",
		]),
		spellcastingBonus : [{
			name : "Silencer",
			spells : ["silence"],
			selection : ["silence"]
		}],
		spellChanges : {
			"silence" : {
				ritual : false,
				changes : "Using my silencer upgrade, I can cast Silence with a 2nd-level spell slot"
			}
		},
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (v.theWea.KCCC_stormforged_weapon) {
						fields.Description = fields.Description.replace(/(;|,)? ?loud/i, '');
					}
				},
				"My Stormforged Weapons lose the loud property."
			]
		}
	}, {
		name : "Shock Absorber",
		source : [["KCCC", 34]],
		description : desc([
			"As a reaction to taking lightning or thunder damage I gain resistance until my next turn",
			"When I do so, my Thundermonger does an extra 1d6 damage until my next turn ends"
		]),
		action : [["reaction", ""]]
	}, {
		name : "Sonic Movement",
		listname : "Sonic Movement (prereq: Kinetic Hammer)",
		prereqKCCC : {
			itemsAnd : [["stormforged weapon", "kinetic hammer"]]
		},
		source : [["KCCC", 34]],
		description : desc([
			"I'm knocked 5-ft away from my target when I atk with my Kinetic Hammer; No opp atks"
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if ((/^(?=.*kinetic)(?=.*hammer).*$/i).test(v.WeaponTextName)) {
						fields.Description += (fields.Description ? '; ' : '') + "Knocks me 5-ft backwards"
					}
				},
				"I'm knocked 5 ft away from my target when I attack with my Kinetic Hammer, this movement does not provoke opportunity attacks."
			]
		}
	}, {
		name : "Storm Blast",
		source : [["KCCC", 34]],
		description : desc([
			"As an action, I can make an attack with my Stormforged Weapon in a 30-ft cone",
			"All in area make a Str save or are knocked prone and take my Thundermonger damage",
			"This uses my spell save DC; With Kinetic Hammer it can be (DC 8 + Str mod + Prof Bonus)",
			"Save halves; Does not use ammunition"
		]),
		action : [["action", ""]]
	}, {
		name : "Twin Thunder",
		listname : "Twin Thunder (prereq: One-handed Stormforged Weapon)",
		prereqKCCC : {
			itemsOr : [["stormforged weapon", "hand cannon"], ["stormforged weapon", "charged blade"]]
		},
		source : [["KCCC", 34]],
		description : desc([
			"I can attune to two one-handed Stormforged Weapons at the same time using one slot",
			"They must share the same upgrades, or total up to my maximum upgrade count",
			"After attacking with one I can attack with the other as an Off-hand Attack",
			"While dual wielding Stormforged Weapons I can load without a free hand"
		])
	}, {
		name : "Weapon Improvement",
		source : [["KCCC", 34]],
		description : desc([
			"My Stormforged Weapon gains a +1 to hit and damage; Doesn't stack with Arcane Retrofit",
		]),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.theWea.KCCC_stormforged_weapon) {
						output.magic = Math.max(v.thisWeapon[1], 1);
					}
				},
				"My Stormforged Weapon gains a +1 to attack and damage rolls."
			]
		}
	}, {
		KCCClevel : 5,
		name : "Echoing Boom",
		listname : "Echoing Boom (incomp: Silencer)",
		prereqKCCC : {
			featuresNot : ["silencer (incomp: echoing boom)"]
		},
		source : [["KCCC", 34]],
		description : desc([
			"My Thundermonger damage increases by 1d6"
		])
	}, {
		KCCClevel : 5,
		name : "Harpoon Reel",
		source : [["KCCC", 34]],
		description : desc([
			"My Stormforged Weapon gains an alternate harpoon attack, \"Stormforged Harpoon\"",
			" This does not apply Thundermonger damage; An impaled crea is connected by a 60 ft cord",
			"Either party can drag the other, moves at half speed unless larger than the other",
			"As a bonus action I can pull myself to them if >= Medium, or pull them to me if < Medium",
			"I cannot attack this way again until I use this bonus action"
		]),
		action : [["bonus action", ""]],
		weaponsAdd : ["Stormforged Harpoon"],
		weaponOptions : {
			regExpSearch : /^(?=.*stormforged)(?=.*harpoon).*$/i,
			name : "Stormforged Harpoon",
			source : [["KCCC", 34]],
			ability : 2,
			type : "AlwaysProf",
			damage : [1, 6, "piercing"],
			range : "30/60 ft",
			description : "Can target anything; Crea is impaled, can remove harpoon as action, takes 1d6 extra damage",
			abilitytodamage : true,
			KCCC_stormforged_weapon : true
		}
	}, {
		KCCClevel : 5,
		name : "Terrifying Thunder",
		listname : "Terrifying Thunder (prereq: Echoing Boom)",
		prereqKCCC : {
			featuresAnd : ["echoing boom (incomp: silencer)"],
		},
		source : [["KCCC", 34]],
		description : desc([
			"The first time I damage with Thundermonger they are deafened until their next turn ends",
			"They must make a Wisdom save against my spell save DC or be frightened for 1 minute",
			"Repeat save at end of turn, on success they are immune to this effect for 24 hours"
		])
	}, {
		KCCClevel : 9,
		name : "Elemental Swapping",
		source : [["KCCC", 35]],
		description : desc([
			"When I atk with my Stormforged Weapon I can change the Thundermonger damage type",
			"I can choose acid, cold, fire, lightning, or thunder, or radiant with a vial of holy water"
		])
	}, {
		KCCClevel : 9,
		name : "Mortar Shells",
		listname : "Mortar Shells (prereq: Stormforged Weapon with Ammunition)",
		prereqKCCC : {
			itemsOr : [["stormforged weapon", "thunder cannon"], ["stormforged weapon", "hand cannon"]]
		},
		source : [["KCCC", 35]],
		description : desc([
			"When I attack with my Stormforged Weapon I can make 1 attack against all in a 5-ft radius",
			"Creatures hit take the weapon damage and half my Thundermonger damage",
			"This ignores non-overhead cover; I can only use Devastating Blasts if I miss all targets"
		])
	}, {
		KCCClevel : 9,
		name : "Ride the Lightning",
		listname : "Ride the Lightning (prereq: Lightning Burst)",
		prereqKCCC : {
			featuresAnd : ["lightning burst"],
		},
		source : [["KCCC", 35]],
		description : desc([
			"When I use Lightning Burst I can expend a spell slot to teleport up to 60 ft",
			"I can only teleport along the path of the Lightning Burst; The line stops where I go to"
		])
	}, {
		KCCClevel : 9,
		name : "Shock Harpoon",
		listname : "Shock Harpoon (prereq: Harpoon Reel)",
		prereqKCCC : {
			featuresAnd : ["harpoon reel"],
		},
		source : [["KCCC", 35]],
		description : desc([
			"As a bonus after hitting with my Harpoon Reel, I can deal my Thundermonger damage",
			"The damage is dealt as lightning damage; They make a Con save against my spell save DC",
			"On a fail they are stunned until they end their next turn"
		]),
		action : [["bonus action", ""]]
	}, {
		KCCClevel : 9,
		name : "Synaptic Feedback",
		source : [["KCCC", 35]],
		description : desc([
			"When I deal lightning damage with my Stormforged Weapon my walk speed increases 10 ft",
			"And I can Dash or Disengage as a bonus action until the end of my turn"
		]),
		action : [["bonus action", " (Dash/Disengage)"]]
	}, {
		KCCClevel : 9,
		name : "Thunder Jump",
		source : [["KCCC", 35]],
		description : desc([
			"As an action I can launch myself up to 60 ft in any direction; No opportunity attacks",
			"I can carry 1 willing creature within 5-ft of me; No fall damage",
			"Creatures within 10-ft make a Dex save against my spell save DC",
			"On a fail they take half my Thundermonger damage, save halves (1/4 damage)"
		]),
		action : [["action", ""]]
	}, {
		KCCClevel : 9,
		name : "Transforming Weapon",
		listname : "Transforming Weapon (prereq: Adaptable Weapon)",
		prereqKCCC : {
			featuresAnd : ["adaptable weapon"],
		},
		source : [["KCCC", 35]],
		description : desc([
			"Select 3 Stormforged Weapons; As a bonus action I can transform it between those forms"
		]),
		action : [["bonus action", "Transform Weapon"]]
	}, {
		KCCClevel : 11,
		name : "Backblast",
		source : [["KCCC", 35]],
		description : desc([
			"As a bonus after dealing thunder damage on my turn I create 100-ft radius audible sound",
			"Each creature within 5-ft must make a Constitution saving throw against my spell save DC",
			"On a fail they take 3d6 thunder damage (4d6 if level 17+ inventor)"
		]),
		action : [["bonus action", ""]],
		usages : "Intelligence modifier per ",
		usagescalc : "event.value = Math.max(1, What('Int Mod'));",
		recovery : "long rest"
	}, {
		KCCClevel : 11,
		name : "Blast Radius",
		source : [["KCCC", 35]],
		description : desc([
			"My Devastating Blasts also deal half my weapon damage when the target is within 30 ft"
		])
	}, {
		KCCClevel : 11,
		name : "Stabilization",
		source : [["KCCC", 35]],
		description : desc([
			"I have adv. on Stormforged ranged attacks if neither of us moved since I last attacked them",
			"I do not have disadvantage with my Stormforged Weapon ranged attacks while prone"
		])
	}, {
		KCCClevel : 15,
		name : "Massive Overload",
		listname : "Massive Overload (prereq: Storm Blast or Lightning Burst)",
		prereqKCCC : {
			featuresOr : ["storm blast", "lightning burst"],
		},
		source : [["KCCC", 35]],
		description : " [Storm Blast or Lightning Burst]" + desc([
			"I can use a spell slot (SS 3+) to use one of these upgrades with a Stormforged Weapon atk",
			"Both fire in same direction; Using the upgrade this way doesn't expend Thundermonger",
			"I must spend an action to repair my Stormforged Weapon before it can fire again"
		])
	}, {
		KCCClevel : 15,
		name : "Masterwork Weapon",
		listname : "Masterwork Weapon (prereq: Weapon Improvement)",
		prereqKCCC : {
			featuresAnd : ["weapon improvement"],
		},
		description : desc([
			"My Stormforged Weapon gains an extra +2 to hit and damage; Stacks with Arcane Retrofit",
		]),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.theWea.KCCC_stormforged_weapon) {
						output.magic = Math.min(v.thisWeapon[1] + 3, 4);
					}
				},
				"My Stormforged Weapon gains an additional +2 to attack and damage rolls, to a maximum of +4."
			]
		}
	}
]
// Thundersmith magic item
MagicItemsList["stormforged weapon"] = {
	name : "Stormforged Weapon",
	source : [["KCCC", 32]],
	type : "weapon",
	description : "This weapon can be a Thunder Cannon, Hand Cannon, Kinetic Hammer, Charged Blade, or Lightning Pike",
	descriptionFull : "You harness the elemental power of thundering storms to create a powerful weapon. This weapon requires attunement, only you can attune to it, you are proficient with it while attuned, and you can only be attuned to one Stormforged Weapon at a time. If you have multiple Stormforged Weapons, you can change which one you are attuned to during a long rest."+
	"\n   If you lose your Stormforged Weapon or wish to create additional ones, you can do so over the course of three days (8 hours each day) by expending 200 gp worth of metal and other raw materials. When you make a new Stormforged Weapon, you can make the same or a different type, and select the same or different upgrades."+
	"\n   Select one of the following:"+
	"\n \u2022 " + toUni("Thunder Cannon") + ". You use the power of thunder to launch a projectile with terrible power, if limited accuracy, over long distances. Ringing out with a booming crash, it brings fear to the battlefield."+
	"\n   Ranged weapon, weighs 15 lb, 1d12 piercing damage, with the properties: Ammunition (range 60/180), Two-Handed, Loud, Stormcharged."+
	"\n \u2022 " + toUni("Hand Cannon") + ". Forgoing the guiding barrel, this pack uses the thundering power to launch a projectile with all the force of a Cannon, though its effective range is far more limited."+
	"\n   Ranged weapon, weighs 5 lb, 1d10 piercing damage, with the properties: Ammunition (range 30/90), Light, Loud, Stormcharged."+
	"\n \u2022 " + toUni("Kinetic Hammer") + ". Rather than launching a projectile with the thundering force, you keep that force imbued in the weapon, allowing for devastating force to be applied to the attack."+
	"\n   Melee weapon, weighs 10 lb, 1d10 bludgeoning + 1d4 thunder damage, with the properties: Two-Handed, Heavy, Loud."+
	"\n \u2022 " + toUni("Charged Blade") + ". You create a bladed weapon that channels the harnessed power of the elemental storm power directly into the blade, causing it to lay waste to all it strikes. This weapon deals lightning damage instead of thunder when applying Thundermonger."+
	"\n   Melee weapon, weighs 3 lb, 1d6 slashing + 1d4 lightning damage, with the properties: Finesse, Loud."+
	"\n \u2022 " + toUni("Lightning Pike") + ". You create a charged blade and stick it to the end of a pole, making it slightly more unwieldy, but giving it devastating reach. This weapon deals lightning damage instead of thunder when applying Thundermonger."+
	"\n   Melee weapon, weighs 10 lb, 1d8 piercing + 1d4 lightning damage, with the properties: Reach, Two-Handed, Loud."+
	"\n\n" + toUni("Stormcharged") + ": When you use an action, bonus action, or reaction to attack with a Stormcharged Weapon, you can make only one Attack regardless of the number of attacks you can normally make. If you could otherwise make additional attacks with that action, the weapon deals an extra 3d6 lightning or thunder damage per attack that was foregone."+
	"\n   " + toUni("Loud") + ": Your weapon rings with thunder that is audible within 300 feet of you whenever it makes an attack.",
	attunement : true,
	allowDuplicates : true,
	prerequisite : "Being a Thundersmith or an Inventor with Stormforged Weapon as a Cross-Disciplinary Knowledge",
	prereqeval : function(v) {
		return classes.known.inventor && (classes.known.inventor.subclass.indexOf("thundersmith") !== -1 || KCCCglobal.fn.currentChoices().indexOf("stormforged weapon") !== -1);
	},
	choices : ["Thunder Cannon", "Hand Cannon", "Kinetic Hammer", "Charged Blade", "Lightning Pike"],
	"thunder cannon" : {
		description : "I can only make one attack during my (bonus) action, or reaction with this weapon. If I could otherwise make multiple, I deal +3d6 lightning or thunder damage per extra attack I would have had. This weapon is audible within 300 ft. I can create ammunition for it at 1 gp per 10 rounds. I can create up to 50 during long rest.",
		weight : 15,
		weaponsAdd : ["Thunder Cannon"],
		weaponOptions : {
			regExpSearch : /^(?=.*thunder)(?=.*cannon).*$/i,
			name : "Thunder Cannon",
			source : [["KCCC", 32]],
			ability : 2,
			type : "AlwaysProf",
			damage : [1, 12, "piercing"],
			range : "60/180 ft",
			weight : 15,
			description : "Ammunition, two-handed, loud, stormcharged",
			abilitytodamage : true,
			ammo : "Stormforged Ammo",
			KCCC_stormforged_weapon : true
		},
		ammoOptions : {
			name : "Stormforged Ammo",
			source : [["KCCC", 32]],
			weight : 0.2, // based on the weight of renaissance bullets from the DMG
			icon : "Bullets",
			checks : [".Bullet"],
			display : 50,
			invName : "Stormforged Weapon Rounds",
			alternatives : [/^(?=.*(stormforged|thunder ?cannon|hand ?cannon))(?=.*(round|bullet)).*$/i]
		}
	},
	"hand cannon" : {
		description : "I can only make one attack during my (bonus) action, or reaction with this weapon. If I could otherwise make multiple, I deal +3d6 lightning or thunder damage per extra attack I would have had. This weapon is audible within 300 ft. I can create ammunition for it at 1 gp per 10 rounds. I can create up to 50 during long rest.",
		weight : 5,
		weaponsAdd : ["Hand Cannon"],
		weaponOptions : {
			regExpSearch : /^(?=.*hand)(?=.*cannon).*$/i,
			name : "Hand Cannon",
			source : [["KCCC", 32]],
			ability : 2,
			type : "AlwaysProf",
			damage : [1, 10, "piercing"],
			range : "30/90 ft",
			weight : 5,
			description : "Ammunition, light, loud, stormcharged",
			abilitytodamage : true,
			ammo : "Stormforged Ammo",
			KCCC_stormforged_weapon : true
		},
		ammoOptions : {
			name : "Stormforged Ammo",
			source : [["KCCC", 32]],
			weight : 0.2, // based on the weight of renaissance bullets from the DMG
			icon : "Bullets",
			checks : [".Bullet"],
			display : 50,
			invName : "Stormforged Weapon Rounds",
			alternatives : [/^(?=.*(stormforged|thunder ?cannon|hand ?cannon))(?=.*(round|bullet)).*$/i]
		}
	},
	"kinetic hammer" : {
		description : "Force is imbued into this melee weapon, allowing for devastating force to be applied to the attack. As a result, attacks made with this melee weapon are audible within 300 ft.",
		weight : 10,
		weaponsAdd : ["Kinetic Hammer"],
		weaponOptions : {
			regExpSearch : /^(?=.*kinetic)(?=.*hammer).*$/i,
			name : "Kinetic Hammer",
			source : [["KCCC", 32]],
			ability : 1,
			type : "AlwaysProf",
			damage : [1, 10, "bludgeoning"],
			range : "Melee",
			weight : 10,
			description : "Two-handed, heavy, loud; +1d4 thunder damage",
			abilitytodamage : true,
			KCCC_stormforged_weapon : true
		}
	},
	"charged blade" : {
		description : "This bladed weapon channels the harnessed power of the elemental storm power directly into the blade, causing it to lay waste to all it strikes. Attacks made with it are audible within 300 ft. It deals lightning damage instead of thunder when applying Thundermonger (Thundersmith only).",
		weight : 3,
		weaponsAdd : ["Charged Blade"],
		weaponOptions : {
			regExpSearch : /^(?=.*charged)(?=.*blade).*$/i,
			name : "Charged Blade",
			source : [["KCCC", 32]],
			ability : 1,
			type : "AlwaysProf",
			damage : [1, 6, "slashing"],
			range : "Melee",
			weight : 3,
			description : "Finesse, loud; +1d4 lightning damage",
			abilitytodamage : true,
			KCCC_stormforged_weapon : true
		}
	},
	"lightning pike" : {
		description : "This bladed polearm channels the harnessed power of the elemental storm directly into its blade, causing it to lay waste on all its strikes with devastating reach. Attacks made with it are audible within 300 ft. It deals lightning damage instead of thunder when applying Thundermonger (Thundersmith only).",
		weight : 10,
		weaponsAdd : ["Lightning Pike"],
		weaponOptions : {
			regExpSearch : /^(?=.*lightning)(?=.*pike).*$/i,
			name : "Lightning Pike",
			source : [["KCCC", 32]],
			ability : 1,
			type : "AlwaysProf",
			damage : [1, 8, "piercing"],
			range : "Melee",
			weight : 10,
			description : "Reach, two-handed, loud; +1d4 lightning damage",
			abilitytodamage : true,
			KCCC_stormforged_weapon : true
		}
	}
}
}

{// Warsmith subclass DONE
// The number of bonus upgrades
KCCCglobal.bonusUpgrades.warsmith = {
	'11' : levels.map(function(n) { return n < 14 ? 0 : 1;})
};
var KCCC_warsmith = AddSubClass("inventor", "warsmith", {
	regExpSearch : /^(?=.*warsmith)(?!.*artificer)(?!.*wizard).*$/i,
	subname : "Warsmith",
	fullname : "Warsmith",
	source : [["KCCC", 36]],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature1" : {
			name : "Warsmith's Proficiency",
			source : [["KCCC", 36]],
			minlevel : 1,
			description : " [heavy armor, smith's tools, tinker's tools]",
			armorProfs : [false, false, true, false],
			toolProfs : ["Smith's tools", "Tinker's tools"],
		},
		"subclassfeature1.1" : {
			name : "Warplate Gauntlet",
			source : [["KCCC", 36]],
			minlevel : 1,
			description : " [1 free upgrade]" + desc([
				"I gain a warplate gauntlet, a wondrous item that only I can attune to; See Notes page"
			]),
			magicitemsAdd : ["Warplate Gauntlet"],
			extrachoices : ["Force Blast", "Martial Grip", "Power Fist", "Impact Gauntlet (variant, needs DM approval)"],
			extraTimes : [1],
			extraname : "Free Upgrade",
			"force blast" : {
				name : "Force Blast",
				source : [["KCCC", 38]],
				description : " [60 ft range, 1d8+Int mod force damage]"+desc("When I take the Attack action, I can use this ranged spell attack in place of any attack"),
				weaponsAdd : ["Force Blast"],
				weaponOptions : {
					regExpSearch : /^(?=.*force)(?=.*blast).*$/i,
					name : "Force Blast",
					source : [["KCCC", 38]],
					ability : 4,
					type : "Spell",
					damage : [1, 8, "force"],
					range : "60 ft",
					description : "",
					useSpellMod : "inventor",
					abilitytodamage : true
				}
			},
			"martial grip" : {
				name : "Martial Grip",
				source : [["KCCC", 38]],
				description : desc("I gain proficiency with martial weapons while wearing my Warplate Gauntlet"),
				weaponProfs : [false, true]
			},
			"power fist" : {
				name : "Power Fist",
				prereqKCCC : {
					// also is an option for the gadgetsmith, but different listing
					featuresNot : ["power fist (variant, needs dm approval)"]
				},
				source : [["KCCC", 38]],
				description : " [melee, light, 1d8 bludgeoning damage]" + desc([
					"I can forgo adding my Prof Bonus to its attack roll and add it twice to its damage instead"
				]),
				weaponsAdd : ["Power Fist"],
				weaponOptions : {
					regExpSearch : /^(?=.*power)(?=.*fist).*$/i,
					name : "Power Fist",
					source : [["KCCC", 38]],
					ability : 1,
					type : "AlwaysProf",
					damage : [1, 8, "bludgeoning"],
					range : "Melee",
					description : "Light; Can forgo Prof Bonus to hit, add Prof Bonus \xD72 damage",
					tooltip : "Special: When I make an attack with this weapon, I can choose to forgo adding my proficiency bonus to the attack roll to add twice that amount to the damage roll.",
					isMagicWeapon : true,
					special : true,
					abilitytodamage : true
				}
			},
			"impact gauntlet (variant, needs dm approval)" : {
				listname : "Impact Gauntlet (variant, needs DM approval)",
				prereqKCCC : {
					// also is an option for the gadgetsmith, but different listing
					featuresNot : ["impact gauntlet"]
				},
				name : "Impact Gauntlet",
				source : [["KCCC", 15]],
				description : " [melee, light, finesse, 1d6 bludgeoning]" + desc([
					"I can forgo adding my Prof Bonus to its attack roll and add it twice to its damage instead"
				]),
				weaponsAdd : ["Impact Gauntlet"],
				weaponOptions : {
					regExpSearch : /^(?=.*impact)(?=.*gauntlet).*$/i,
					name : "Impact Gauntlet",
					source : [["KCCC", 38]],
					ability : 1,
					type : "AlwaysProf",
					damage : [1, 6, "bludgeoning"],
					range : "Melee",
					description : "Finesse, light; Can forgo Prof Bonus to hit, add Prof Bonus \xD72 damage",
					tooltip : "Special: When I make an attack with this weapon, I can choose to forgo adding my proficiency bonus to the attack roll to add twice that amount to the damage roll.",
					isMagicWeapon : true,
					special : true,
					abilitytodamage : true
				}
			},
			toNotesPage : [{
				name : "Warplate Gauntlet",
				note : [
					"This is a specialized wondrous item that only I can attune to. When I create a Warplate Gauntlet, I can add one of the following upgrades to it: Power Fist, Force Blast, or Martial Grip (or Impact Gauntlet variant). This upgrade doesn't count against my upgrade total. I can make multiple gauntlets with different upgrades, but can only be attuned to one at a time.",
					"If I lose my Warplate Gauntlet, I can remake it during a long rest with 25 gp worth of materials, or can scavenge for materials and forge it over two days of work (8 hours each day) without the material expense.",
					"While wearing a Warplate Gauntlet, I can engage Artificial Strength.",
					"Warplate Gauntlet is selectable as a magic item, which does the automation for it."
				]
			}, {
				name : "Artificial Strength",
				note : [
					"When I don my Warplate Gauntlet or as an action while wearing it, I can dedicate some of my intelligence to fully controlling the power of the gauntlet. I can reduce my current and maximum Intelligence score to increase my current Strength ability score by the same amount, but I can only raise my Strength ability score up to what my Intelligence ability score was before engaging Artificial Strength. I can stop using Artificial Strength at any time, and it automatically ends if my gauntlet is removed."
				],
				amendTo : "Warplate Gauntlet"
			}]
		},
		"subclassfeature3.1" : { // upgrades always have to be "subclassfeature3", but features are still processed alphabetically by name, so this one will be first
			name : "Warsmith's Armor",
			source : [["KCCC", 36]],
			minlevel : 3,
			description : desc([
				"I gain a warsmith's armor that includes a warplate gauntlet, no separate attunement",
				"See the Notes page for more details"
			]),
			toNotesPage : [{
				name : "Warsmith's Armor",
				note : [
					"I have attained the knowledge of forging and arcane tinkering sufficient to create a set of armor that augments and expands my abilities from a standard, non-magical, set of heavy armor using resources I've gathered. This process takes 8 hours to complete, requiring the use of a forge, foundry or similar and it incorporates a Warplate Gauntlet (they do not require separate attunement). While wearing my armor, my Strength ability score increases by 2, and my maximum Strength ability score becomes 22.",
					"I can create a new set of armor by forging it from a set of gathered and purchased materials in a process that takes 2,000 gp and 8 hours. I can create multiple sets of armor, but I can only be attuned to one of them at a given time, and I can only change which one I are attuned to during a long rest. If I create a new set of Warsmith's Armor, I can apply a number of Upgrades equal to the value on the class table, applying each at the level I get it on the class table.",
					"When I create my armor, I can create a heavy plated Warplate, medium balanced Warsuit, light flexible Warskin, or I can integrate my changes directly into my body as Integrated Armor. If my armor is Warplate or Integrated Armor, I gain the Powerful Build trait. Powerful Build means I count as one size larger when determining my carrying capacity and the weight I can push, drag, or left. Integrated Armor can't be removed, but doesn't confer any penalty when resting in it.",
					"Additionally, if I am Small, I become Medium while wearing Warplate.",
					"Warsmith's Armor is selectable as a magic item, which does the automation for it."
				],
				amendTo : "Warplate Gauntlet"
			}, {
				name : "Warsmiths and Magical Armor",
				note : [
					"By the rules laid out here, using magical armor as a base for your Warsmith's armor has no additional effect. This is intentionally the rules-as-written, but there is certainly some flexibility here.",
					"\u2022 Using Adamantine or Mithril, the properties carry over to the Warsmith's armor.",
					"\u2022 Using +1/+2/+3 armor carries over, but counts as taking a free \"Reinforced Armor\" upgrade for each +1 the armor has, meaning that upgrade can't be taken to make the armor +4 or better.",
					"\u2022 Armor of Resistance carries over, counting as taking “Resistance” upgrade for that damage type for free.",
					"Other cases can be handled on a case-by-case basis. Consult with your GM and work something out that would be reasonable to combine making receiving magic armor a cool bonus, but not something that breaks the game!"
				],
				amendTo : "Warplate Gauntlet"
			}],
			// do the removal here, so that it doesn't conflict with the `magicitemsAdd` from the previously processed feature
			eval : function () { RemoveMagicItem("Warplate Gauntlet"); },
			removeeval : function () { AddMagicItem("Warplate Gauntlet"); }
		},
		"subclassfeature3" : { // Will be filled out by the KCCC_inventorSubclass_subclassfeature3 function
			// Add the magic item here, so that it is added after removing the Warplate Gauntlet in "subclassfeature3.1"
			magicitemsAdd : ["Warsmith's Armor"]
		},
		"subclassfeature14" : {
			name : "Fully Customized Gear",
			source : [["KCCC", 37]],
			minlevel : 14,
			description : " [bonus level 11 upgrade, included above]" + desc([
				"During a long rest, I can swap out one upgrade for another if all prerequisites are met"
			])
		}
	}
})
// Warsmith upgrades (includes many done by PoetOfGod)
KCCCglobal.upgrades.warsmith = [
	// first the three Warplate Gauntlet upgrades
	ClassSubList[KCCC_warsmith].features["subclassfeature1.1"]["force blast"],
	ClassSubList[KCCC_warsmith].features["subclassfeature1.1"]["martial grip"],
	ClassSubList[KCCC_warsmith].features["subclassfeature1.1"]["power fist"],
	ClassSubList[KCCC_warsmith].features["subclassfeature1.1"]["impact gauntlet (variant, needs dm approval)"],
	// then the rest of the options (order doesn't matter)
{
	name : "Power Fist, 2nd",
	prereqKCCC : {
		featuresOr : ["power fist", "power fist (variant, needs dm approval)"],
		featuresNot : ["power fist, 2nd (variant, needs dm approval)"]
	},
	source : [["KCCC", 38]],
	description : " [use as off-hand weapon]",
	weaponsAdd : ["Power Fist (off-hand)"]
}, {
	listname : "Impact Gauntlet, 2nd (variant, needs DM approval)",
	prereqKCCC : {
		featuresOr : ["impact gauntlet", "impact gauntlet (variant, needs dm approval)"],
		featuresNot : ["impact gauntlet, 2nd"]
	},
	name : "Impact Gauntlet, 2nd",
	source : [["KCCC", 15]],
	description : " [use as off-hand weapon]",
	weaponsAdd : ["Impact Gauntlet (off-hand)"]
}, {
	name : "Accelerated Movement",
	source : [["KCCC", 37]],
	description : desc([
		"My armor's weight is reduced by 15 lbs (min 0), my speed increases by 10 ft for all modes"
	]),
	speed : { allModes : "+10" }
}, {
	name : "Accelerated Movement, 2nd",
	prereqKCCC : {
		featuresAnd : ["accelerated movement"]
	},
	source : [["KCCC", 37]],
	description : desc([
		"My armor's weight is reduced by 15 lbs (min 0), my speed increases by 10 ft for all modes"
	]),
	speed : { allModes : "+10" }
}, {
	name : "Adaptable Armor",
	source : [["KCCC", 37]],
	description : desc([
		"I gain a climb and swim speed equal to my move speed; I can climb hands free"
	]),
	speed : {
		climb : { spd : "walk", enc :  "walk" },
		swim : { spd : "walk", enc :  "walk" }
	}
}, {
	name : "Arcane Visor: Darkvision",
	source : [["KCCC", 37]],
	description : desc([
		"I gain 60 ft of darkvision, if I already had darkvision then the range is increased by 60 ft"
	]),
	vision : [["Darkvision", "fixed 60"], ["Darkvision", "+60"]],
	savetxt : {
		adv_vs : ["blinded"]
	}
}, {
	name : "Arcane Visor: Sunlight Sensitivity",
	source : [["KCCC", 37]],
	description : desc([
		"I can ignore the effects of Sunlight Sensitivity"
	]),
	savetxt : {
		immune : ["sunlight sensitivity"],
		adv_vs : ["blinded"]
	}
}, {
	name : "Arcane Visor: Divination Spells",
	source : [["KCCC", 37]],
	description : desc([
		"I can ignore concentration for up to one divination spell at a time"
	]),
	savetxt : {
		adv_vs : ["blinded"]
	}
}, {
	listname : "Collapsible (incomp: Integrated Armor)",
	prereqKCCC : {
		itemsNot : [["warsmith's armor", "integrated armor (medium)"]]
	},
	name : "Collapsible",
	source : [["KCCC", 37]],
	description : desc([
		"My Warsmith armor can collapse, it appears as a normal case and weighs 1/3 its normal weight",
		"As an action I can don an doff the armor, transforming it as needed"
	]),
	action : [["action", " (Don/Doff/Transform)"]],
}, {
	listname : "Construct Constitution (prereq: Integrated Armor)",
	prereqKCCC : {
		itemsOr : [["warsmith's armor", "integrated armor (medium)"]]
	},
	name : "Contruct Constitution",
	source : [["KCCC", 37]],
	description : desc([
		"I gain resistance to poison damage and am immune to being poisoned",
		"I have advantage on saves against diseases and spells that require a humanoid target"
	]),
	savetxt : {
		immune : ["poisoned"],
		adv_vs : ["diseases", "spells (humanoid target)"]
	},
	dmgres : ["Poison"]
}, {
	name : "Flame Projector",
	source : [["KCCC", 37]],
	description : desc([
		"While wearing my Gauntlet I can cast Fire Bolt and other spells"
	]),
	spellcastingBonus : [{
		name : "Flame Projector",
		spells : ["fire bolt", "burning hands", "scorching ray", "fireball", "wall of fire", "flame strike"],
		selection : ["fire bolt", "burning hands", "scorching ray", "fireball", "wall of fire", "flame strike"],
		times : levels.map(function (n) {
			return (n < 3 ? 0 : n < 5 ? 2 : n < 9 ? 3 : n < 13 ? 4 : n < 17 ? 5 : 6);
		})
	}]
}, {
	listname : "Fortified Brace (prereq: Warplate)",
	prereqKCCC : {
		itemsAnd : [["warsmith's armor", "warplate (heavy)"]]
	},
	name : "Fortified Brace",
	source : [["KCCC", 38]],
	description : desc([
		"As a reaction to taking damage, I gain resistance to all damage and subsequent",
		"attacks against me are made at disadvantage, until the start of my next turn.",
		"On my next turn my speed is halved and I can't take an action"
	]),
	action : [["reaction", "Fortified Brace"]]
}, {
	listname : "Grappling Hook (prereq: Warskin or Warsuit)",
	prereqKCCC : {
		itemsOr : [
			["warsmith's armor", "warskin (light)"],
			["warsmith's armor", "warsuit (medium)"]
		]
	},
	name : "Grappling Hook",
	source : [["KCCC", 38]],
	description : desc([
		"As an attack or action I can target a surface, obj, or crea within 20 ft",
		"If it is small or smaller I can make a grappling check to pull it to me and grapple it",
		"Otherwise, I am pulled to it; opportunity attacks from this are made with disadvantage"
	]),
	action : [["action", " (or attack)"]]
}, {
	listname : "Grappling Reel (prereq: Integrated Armor or Warplate)",
	prereqKCCC : {
		itemsOr : [
			["warsmith's armor", "integrated armor (medium)"],
			["warsmith's armor", "warplate (heavy)"]
		]
	},
	name : "Grappling Reel",
	source : [["KCCC", 38]],
	description : desc([
		"As an attack or action I can target a surface, obj, or crea within 30 ft",
		"If it is large or smaller I can make a grappling check to pull it to me and grapple it",
		"Otherwise, I am pulled to it; this provokes opportunity attacks as normal"
	]),
	action : [["action", " (or attack)"]]
}, {
	listname : "Iron Fortitude (prereq: Integrated Armor)",
	prereqKCCC : {
		itemsOr : [["warsmith's armor", "integrated armor (medium)"]]
	},
	name : "Iron Fortitude",
	source : [["KCCC", 38]],
	description : desc([
		"If damage would reduce me to 0 HP, I make a Con save DC 5 + damage taken",
		"Unless it was from a critical hit, on a success I drop to 1 HP instead"
	])
}, {
	name : "Lightning Channel",
	source : [["KCCC", 38]],
	description : desc([
		"Once per short rest, I can cast Lightning Charged as a bonus action without using a spell",
		"slot. I can apply the damage from Lightning Charged on my Force Blast attacks"
	]),
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : [{
		name : "Lightning Channel",
		spells : ["lightning charged"],
		selection : ["lightning charged"],
		firstCol : "oncesr"
	}],
	spellChanges : {
		'lightning charged': {
			time : "1 bns",
			changes : "Using Lightning Channel, I can cast Lightning Charged as a bonus action once per short rest"
		}
	},
	action : [["bonus action", ""]]
}, {
	name : "Lightning Projector",
	source : [["KCCC", 38]],
	description : desc([
		"While wearing my Gauntlet I can cast Shocking Grasp and other spells"
	]),
	spellcastingBonus : [{
		name : "Lightning Projector",
		spells : ["shocking grasp", "lightning tendril", "lightning charged", "lightning bolt", "jumping jolt", "sky burst"],
		selection : ["shocking grasp", "lightning tendril", "lightning charged", "lightning bolt", "jumping jolt", "sky burst"],
		times : levels.map(function (n) {
			return (n < 3 ? 0 : n < 5 ? 2 : n < 9 ? 3 : n < 13 ? 4 : n < 17 ? 5 : 6);
		})
	}]
}, {
	name : "Reinforced Armor +1",
	source : [["KCCC", 38]],
	description : desc([
		"My Warsmith's Armor Armor Class increases by 1, (+1)"
	]),
	eval : (function (v) {
		if ((/warplate/i).test(CurrentArmour.known)) {
			processAddArmour(true, "+1 Warplate");
		};
		if ((/warsuit/i).test(CurrentArmour.known)) {
			processAddArmour(true, "+1 Warsuit");
		};
		if ((/warskin/i).test(CurrentArmour.known)) {
			processAddArmour(true, "+1 Warskin");
		};
		if ((/integrated armor/i).test(CurrentArmour.known)) {
			processAddArmour(true, "+1 Integrated Armor");
		};
	}),
	removeeval : (function (v) {
		if ((/warplate/i).test(CurrentArmour.known)) {
			tDoc.resetForm(['AC Armor Description']);
			processAddArmour(true, "Warplate");
		};
		if ((/warsuit/i).test(CurrentArmour.known)) {
			tDoc.resetForm(['AC Armor Description']);
			processAddArmour(true, "Warsuit");
		};
		if ((/warskin/i).test(CurrentArmour.known)) {
			tDoc.resetForm(['AC Armor Description']);
			processAddArmour(true, "Warskin");
		};
		if ((/integrated armor/i).test(CurrentArmour.known)) {
			tDoc.resetForm(['AC Armor Description']);
			processAddArmour(true, "Integrated Armor");
		};
	})
}, {
	name : "Reinforced Armor +2",
	prereqKCCC : {
		featuresAnd : ["reinforced armor +1"]
	},
	source : [["KCCC", 38]],
	description : desc([
		"My Warsmith's Armor Armor Class increases by 1, (+2)"
	]),
	eval : (function (v) {
		if ((/warplate/i).test(CurrentArmour.known)) {
			processAddArmour(true, "+2 Warplate");
		};
		if ((/warsuit/i).test(CurrentArmour.known)) {
			processAddArmour(true, "+2 Warsuit");
		};
		if ((/warskin/i).test(CurrentArmour.known)) {
			processAddArmour(true, "+2 Warskin");
		};
		if ((/integrated armor/i).test(CurrentArmour.known)) {
			processAddArmour(true, "+2 Integrated Armor");
		};
	}),
	removeeval : (function (v) {
		if ((/warplate/i).test(CurrentArmour.known)) {
			tDoc.resetForm(['AC Armor Description']);
			processAddArmour(true, "+1 Warplate");
		};
		if ((/warsuit/i).test(CurrentArmour.known)) {
			tDoc.resetForm(['AC Armor Description']);
			processAddArmour(true, "+1 Warsuit");
		};
		if ((/warskin/i).test(CurrentArmour.known)) {
			tDoc.resetForm(['AC Armor Description']);
			processAddArmour(true, "+1 Warskin");
		};
		if ((/integrated armor/i).test(CurrentArmour.known)) {
			tDoc.resetForm(['AC Armor Description']);
			processAddArmour(true, "+1 Integrated Armor");
		};
	})
}, {
	name : "Reinforced Armor +3",
	prereqKCCC : {
		featuresAnd : ["reinforced armor +2"]
	},
	source : [["KCCC", 38]],
	description : desc([
		"My Warsmith's Armor Armor Class increases by 1, (+3)"
	]),
	eval : (function (v) {
		if ((/warplate/i).test(CurrentArmour.known)) {
			processAddArmour(true, "+3 Warplate");
		};
		if ((/warsuit/i).test(CurrentArmour.known)) {
			processAddArmour(true, "+3 Warsuit");
		};
		if ((/warskin/i).test(CurrentArmour.known)) {
			processAddArmour(true, "+3 Warskin");
		};
		if ((/integrated armor/i).test(CurrentArmour.known)) {
			processAddArmour(true, "+3 Integrated Armor");
		};
	}),
	removeeval : (function (v) {
		if ((/warplate/i).test(CurrentArmour.known)) {
			tDoc.resetForm(['AC Armor Description']);
			processAddArmour(true, "+2 Warplate");
		};
		if ((/warsuit/i).test(CurrentArmour.known)) {
			tDoc.resetForm(['AC Armor Description']);
			processAddArmour(true, "+2 Warsuit");
		};
		if ((/warskin/i).test(CurrentArmour.known)) {
			tDoc.resetForm(['AC Armor Description']);
			processAddArmour(true, "+2 Warskin");
		};
		if ((/integrated armor/i).test(CurrentArmour.known)) {
			tDoc.resetForm(['AC Armor Description']);
			processAddArmour(true, "+2 Integrated Armor");
		};
	})
}, {
	name : "Sentient Armor",
	source : [["KCCC", 38]],
	description : desc([
		"My current and maximum intelligence scores are increased by 2. I can communicate",
		"telepathically with my armor, and my armor can understand and speak my languages"
	]),
	scores : [0, 0, 0, 2, 0, 0],
	scoresMaximum : [0, 0, 0, "+2", 0, 0]
}, {
	listname : "Wire Acrobatics (prereq: Grappling Hook)",
	prereqKCCC : {
		featuresAnd : ["grappling hook (prereq: warskin or warsuit)"]
	},
	name : "Wire Acrobatics",
	source : [["KCCC", 38]],
	description : desc([
		"I can use my grappling hook as part of my movement, but can't move other creatures",
		"this way. The first time I use it on a turn it doesn't provoke opportunity attacks"
	])
}, {
	KCCClevel : 5,
	name : "Active Camouflage",
	source : [["KCCC", 39]],
	description : desc([
		"As an action, I can cause my suit to blend into surroundings, making me lightly obscured",
		"I can hide in plain sight. While hidden, others have disadv on Perception checks to see me"
	]),
	action : [["action", " (start/stop)"]]
}, {
	KCCClevel : 5,
	name : "Arcane Barrage",
	source : [["KCCC", 39]],
	description : desc([
		"Whenever I expend a spell slot, I gain charges equal to its level, max half my inventor",
		"level. Expending another spell slot refreshes their 1 min duration. Once per short rest,",
		"I can expend all charges to cast Magic Missile without a spell slot, each charge increasing",
		"the level of Magic Missile by 1. I can also expend charges from Ether Reactor"
	]),
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : [{
		name : "Arcane Barrage",
		spells : ["magic missile"],
		selection : ["magic missile"],
		firstCol : "Sp"
	}]
}, {
	KCCClevel : 5,
	listname : "Artificial Guidance (prereq: Sentient Armor)",
	prereqKCCC : {
		featuresAnd : ["sentient armor"]
	},
	name : "Artificial Guidance",
	source : [["KCCC", 39]],
	description : desc([
		"While able to communicate with my armor, I add d4 to my Int and Wis checks"
	])
}, {
	KCCClevel : 5,
	listname : "Emergency Protocol (prereq: Sentient Armor)",
	prereqKCCC : {
		featuresAnd : ["sentient armor"]
	},
	name : "Emergency Protocol",
	source : [["KCCC", 39]],
	description : desc([
		"If incapacitated or unconscious, my armor will cast a spell or take the dodge action",
		"It can act this way a number of turns up to my Intelligence modifier",
		"It can only cast spells granted by my armor's upgrades; It can do this once per short rest"
	]),
	usages : 1,
	recovery : "short rest"
}, {
	KCCClevel : 5,
	listname : "Force Accumulator (prereq: Force Blast)",
	prereqKCCC : {
		featuresAnd : ["force blast"]
	},
	name : "Force Accumulator",
	source : [["KCCC", 39]],
	description : desc([
		"Whenever I expend a spell slot, I gain charges equal to its level, max half my Int mod",
		"Charges expire after 1 minute. When I deal damage with Force Blast, I can expend the",
		"charges, doing an extra 1d6 damage or pushing target 5 ft away from me, per charge"
	]),
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if ((/^(?=.*force)(?=.*blast).*$/i).test(v.WeaponName))
					fields.Description += (fields.Description ? '; ' : '') + '+1d6 damage or target pushed back 5 ft, per charge';
			},
			"When I expend charges from Force Accumulator I deal an extra 1d6 damage or push the target 5 ft away from me per charge"
		]
	}
}, {
	KCCClevel : 5,
	listname : "Mechanical Enhancement (prereq: Integrated Armor)",
	prereqKCCC : {
		itemsOr : [["warsmith's armor", "integrated armor (medium)"]]
	},
	name : "Mechanical Enhancement",
	source : [["KCCC", 39]],
	description : desc([
		"I gain max HP equal to my inventor level; +1 Str, Dex, Con saves; +5 ft movement"
	]),
	speed : { allModes : "+5" },
	addMod : [{
		type : "save", field : "Str", mod : 1,
		text : "While I'm wearing my Integrated Armor I add +1 to my Strength saving throws."
	}, {
		type : "save", field : "Dex", mod : 1,
		text : "While I'm wearing my Integrated Armor I add +1 to my Dexterity saving throws."
	}, {
		type : "save", field : "Con", mod : 1,
		text : "While I'm wearing my Integrated Armor I add +1 to my Constitution saving throws."
	}],
	calcChanges : {
		hp : (function (totalHD, HDobj, prefix) {
			if (classes.known.inventor) {
				return [classes.known.inventor.level, "Mechanical Enhancement (Warsmith)"];
			}
		}),
		hpForceRecalc : true
	}
}, {
	KCCClevel : 5,
	listname : "Reactive Plating (prereq: Warplate)",
	prereqKCCC : {
		itemsOr : [["warsmith's armor", "warplate (heavy)"]]
	},
	name : "Reactive Plating",
	source : [["KCCC", 39]],
	description : desc([
		"As a reaction when hit by an attack that does bludgeoning, piercing, or slashing damage,",
		"I can reduce the damage of that attack by an amount equal to my proficiency bonus"
	]),
	action : [["reaction", ""]]
}, {
	KCCClevel : 5,
	name : "Resistance: Acid",
	source : [["KCCC", 39]],
	description : "",
	dmgres : ["Acid"]
}, {
	KCCClevel : 5,
	name : "Resistance: Cold",
	source : [["KCCC", 39]],
	description : "",
	dmgres : ["Cold"]
}, {
	KCCClevel : 5,
	name : "Resistance: Fire",
	source : [["KCCC", 39]],
	description : "",
	dmgres : ["Fire"]
}, {
	KCCClevel : 5,
	name : "Resistance: Force",
	source : [["KCCC", 39]],
	description : "",
	dmgres : ["Force"]
}, {
	KCCClevel : 5,
	name : "Resistance: Lightning",
	source : [["KCCC", 39]],
	description : "",
	dmgres : ["Lightning"]
}, {
	KCCClevel : 5,
	name : "Resistance: Necrotic",
	source : [["KCCC", 39]],
	description : "",
	dmgres : ["Necrotic"]
}, {
	KCCClevel : 5,
	name : "Resistance: Radiant",
	source : [["KCCC", 39]],
	description : "",
	dmgres : ["Radiant"]
}, {
	KCCClevel : 5,
	name : "Resistance: Thunder",
	source : [["KCCC", 39]],
	description : "",
	dmgres : ["Thunder"]
}, {
	KCCClevel : 5,
	listname : "Sealed Suit (prereq: Warplate)",
	prereqKCCC : {
		itemsOr : [["warsmith's armor", "warplate (heavy)"]]
	},
	name : "Sealed Suit",
	source : [["KCCC", 39]],
	description : desc([
		"As a bonus action I can seal my armor, giving me a 1 hr air supply and immunity to poison",
		"I am considered acclimated to cold and hot climates and high altitude"
	]),
	action : [["bonus action", "Seal Suit"]]
}, {
	KCCClevel : 9,
	listname : "Assume Control (prereq: Emergency Protocol)",
	prereqKCCC : {
		featuresAnd : ["emergency protocol (prereq: sentient armor)"]
	},
	name : "Assume Control",
	source : [["KCCC", 39]],
	description : desc([
		"My armor can take control of my movement and actions, see Notes page"
	]),
	usages : 1,
	recovery : "short rest",
	toNotesPage : [{
		name : "Assume Control",
		source : [["KCCC", 39]],
		note : [
			"My armor can take control of my movement and actions for 1 minute",
			"It can take any action I could, but can only cast spells from upgrades",
			"This can be activated as a preset condition, a command, or at a time",
			"It is immune to charmed, blinded, frightened, paralyzed, and poisoned",
			"It also ignores exhaustion, and ignores the previous conditions",
			"If I have warplate it can act this way without me wearing it (even if dead)",
			"It is considered animated armor with Intelligence 12 and my spell save DC",
			"This counts as my use of Emergency Protocol, and is recovered after a rest",
			"Out of combat it can perform simple tasks with the stats of unseen servant",
			"Using it this way does not expend a use of Emergency Protocol",
			"It takes 1 minute to assume this control of my armor",
			"If reduced to 0 HP, it is incapacitated until I repair it during a long rest",
			"I can still wear it as armor if it is incapacitated"
		]
	}]
}, {
	KCCClevel : 9,
	name : "Brute Force Style (Duelist)",
	prereqKCCC : {
		featuresNot : ["brute force style (great weapon fighting)", "brute force style (two-weapon fighting)"]
	},
	source : [["KCCC", 40]],
	description : desc([
		"+2 to damage rolls when wielding a melee weapon in one hand and no other weapons"
	]),
	calcChanges : {
		atkCalc : [
			function (fields, v, output) {
				for (var i = 1; i <= FieldNumbers.actions; i++) {
					if ((/off.hand.attack/i).test(What('Bonus Action ' + i)))
						return;
				};
				if (GetFightingStyleSelection()["dueling"]) return;
				if (v.isMeleeWeapon && !v.isNaturalWeapon && !(/((^|[^+-]\b)2|\btwo).?hand(ed)?s?\b/i).test(fields.Description))
					output.extraDmg += 2;
			},
			"When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."
		]
	}
}, {
	KCCClevel : 9,
	name : "Brute Force Style (Great Weapon Fighting)",
	prereqKCCC : {
		featuresNot : ["brute force style (duelist)", "brute force style (two-weapon fighting)"]
	},
	source : [["KCCC", 40]],
	description : desc([
		"Reroll 1 or 2 on damage if wielding two-handed/versatile melee weapon in both hands"
	]),
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (GetFightingStyleSelection()["great weapon fighting"]) return;
				if (v.isMeleeWeapon && (/(\bversatile|((^|[^+-]\b)2|\btwo).?hand(ed)?s?)\b/i).test(fields.Description)) {
					fields.Description += (fields.Description ? '; ' : '') + 'Re-roll 1 or 2 on damage die' + ((/versatile/i).test(fields.Description) ? ' when two-handed' : '');
				}
			},
			"While wielding a two-handed or versatile melee weapon in two hands, I can re-roll a 1 or 2 on any damage die once."
		]
	}
}, {
	KCCClevel : 9,
	name : "Brute Force Style (Two-Weapon Fighting)",
	prereqKCCC : {
		featuresNot : ["brute force style (duelist)", "brute force style (great weapon fighting)"]
	},
	source : [["KCCC", 40]],
	description : desc([
		"I can add my ability modifier to the damage of my off-hand attacks"
	]),
	calcChanges : {
		atkCalc : [
			function (fields, v, output) {
				if (GetFightingStyleSelection()["two-weapon fighting"]) return;
				if (v.isOffHand)
					output.modToDmg = true;
			},
			"When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks. If a melee weapon includes 'off-hand' or 'secondary' in its name or description, it is considered an off-hand attack."
		]
	}
}, {
	KCCClevel : 9,
	name : "Ether Reactor",
	source : [["KCCC", 40]],
	description : desc([
		"I gain 6 charges that I can use to power any upgrades that cast spells",
		"I spend 1 charge per level, and can upcast with this feature",
		"It regains charges after a long rest; If I've expended all I can overdraw",
		"I cast one X level spell but my speed becomes 0 for the next X rounds",
		"I can only overdraw once per long rest"
	]),
	limfeaname : "Ether Reactor Charges",
	usages : 6,
	recovery : "long rest",
	extraLimitedFeatures : [{
			name : "Ether Reactor Overdraw",
			usages : 1,
			recovery : "long rest"
		}
	]
}, {
	KCCClevel : 9,
	listname : "Head-Up Display (prereq: Arcane Visor, Sentient Armor)",
	prereqKCCC : {
		featuresAnd : ["sentient armor"],
		featuresOr : ["arcane visor: darkvision", "arcane visor: sunlight sensitivity", "arcane visor: divination spells"]
	},
	name : "Head-Up Display",
	source : [["KCCC", 40]],
	description : desc([
		"As a reaction, I can make a Wisdom (Perception) check when a crea Hides",
		"I can make Int saves instead of Dex saves against attacks I can see",
		"As a reaction, I can cast True Strike on a crea who hit me with a ranged attack"
	]),
	savetxt : {
		text : ["Int save instead of Dex save vs. atks I can see"]
	},
	action : [["reaction", ""]],
	spellcastingBonus : [{
		name : "Head-Up Display",
		spells : ["true strike"],
		selection : ["true strike"],
		firstCol : "atwill"
	}],
	spellChanges : {
		'true strike': {
			time : "1 rea",
			changes : "When I am hit by a ranged attack, I can cast True Strike on that creature as a reaction"
		}
	}
}, {
	KCCClevel : 9,
	listname : "Phase Suit (prereq: Warskin or Warsuit)",
	prereqKCCC : {
		itemsOr : [
			["warsmith's armor", "warskin (light)"],
			["warsmith's armor", "warsuit (medium)"]
		]
	},
	name : "Phase Suit",
	source : [["KCCC", 40]],
	description : desc([
		"I can cast Misty Step and Blink. Once per short rest, as an action, I can move through",
		"creas and objs until the end of my turn. If I end my turn in an occupied space, I am",
		"moved to the nearest empty space and take 2 force damage for each foot moved this way"
	]),
	usages : 1,
	recovery : "short rest",
	spellcastingBonus : [{
		name : "Phase Suit",
		spells : ["misty step", "blink"],
		selection : ["misty step", "blink"],
		times : 2
	}]
}, {
	KCCClevel : 9,
	name : "Recall",
	source : [["KCCC", 40]],
	description : desc([
		"As a bonus action, I can hide my unequipped warsmith's armor in a pocket dimension",
		"As an action, I can recall it from this pocket dimension, where it can't be interacted with"
	]),
	action : [["bonus action", " (hide)"], ["action", " (return)"]]
}, {
	KCCClevel : 11,
	listname : "Cloaking Device (prereq: Active Camouflage)",
	prereqKCCC : {
		featuresAnd : ["active camouflage"]
	},
	name : "Cloaking Device",
	source : [["KCCC", 40]],
	description : desc([
		"If I don't move during my turn with Active Camouflage, I can use my reaction to Hide,",
		"using Intelligence (Stealth), with disadv if I am within 5 ft of a crea or attacked this turn",
		"Once per long rest I can cast Greater Invisbility without using a spell slot"
	]),
	usages : 1,
	recovery : "long rest",
	action : [["reaction", ""]],
	spellcastingBonus : [{
		name : "Cloaking Device",
		spells : ["greater invisibility"],
		selection : ["greater invisibility"],
		firstCol : "oncelr"
	}]
}, {
	KCCClevel : 11,
	listname : "Flash Freeze Capacitor (incomp: other capacitors)",
	prereqKCCC : {
		featuresNot : ["power slam capacitor (incomp: other capacitors)"]
	},
	name : "Flash Freeze Capacitor",
	source : [["KCCC", 40]],
	description : desc([
		"Once per long rest, I can cast Cone of Cold without expending a spell slot",
		"The affected area is difficult terrain until the end of my next turn"
	]),
	usages : 1,
	recovery : "long rest",
	spellcastingBonus : [{
		name : "Flash Freeze Capacitor",
		spells : ["cone of cold"],
		selection : ["cone of cold"],
		firstCol : "oncelr"
	}],
	action : [["action", "Flash Freeze Capacitor"]]
}, {
	KCCClevel : 11,
	name : "Flight",
	source : [["KCCC", 40]],
	description : " [30 ft flying speed]",
	speed : {
		fly : { spd : 30, enc :  0 }
	}
}, {
	KCCClevel : 11,
	listname : "Integrated Attack (prereq: Integrated Armor or Warplate; incomp: Iron Grip)",
	prereqKCCC : {
		featuresNot : ["iron grip (prereq: iron muscle; incomp: integrated attack)"],
		itemsOr : [
			["warsmith's armor", "integrated armor (medium)"],
			["warsmith's armor", "warplate (heavy)"]
		]
	},
	name : "Integrated Attack",
	source : [["KCCC", 40]],
	description : desc([
		"I integrate a non-Heavy melee weapon into my armor, am considered proficient, and it",
		"can't be disarmed. I treat it as wielding it with one hand, but it doesn't take a hand.",
		"As a bonus action, I can activate it and make one attack with it. I can attack with it",
		"during the attack action, and attack with it as a bonus action if I attacked this turn"
	]),
	action : [["bonus action", " (activate/attack)"]],
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.isMeleeWeapon && !/\bheavy\b/i.test(v.WeaponText) && /integrated/i.test(v.WeaponTextName)) {
					fields.Proficiency = true;
					fields.Description += (fields.Description ? '; ' : '') + "Doesn't require a hand";
				};
			},
			"If I include the word 'Integrated' in a melee weapon's name without the Heavy property, it gets treated as an Integrated Weapon.",
			290
		]
	}
}, {
	KCCClevel : 11,
	prereqKCCC : {
		featuresNot : ["iron grip (prereq: iron muscle; incomp: integrated attack)"],
		featuresAnd : ["integrated attack (prereq: integrated armor or warplate; incomp: iron grip)"],
		itemsOr : [
			["warsmith's armor", "integrated armor (medium)"],
			["warsmith's armor", "warplate (heavy)"]
		]
	},
	name : "Integrated Attack, 2nd",
	source : [["KCCC", 40]],
	description : ""
}, {
	KCCClevel : 11,
	prereqKCCC : {
		featuresNot : ["iron grip (prereq: iron muscle; incomp: integrated attack)"],
		featuresAnd : ["integrated attack, 2nd"],
		itemsOr : [
			["warsmith's armor", "integrated armor (medium)"],
			["warsmith's armor", "warplate (heavy)"]
		]
	},
	name : "Integrated Attack, 3rd",
	source : [["KCCC", 40]],
	description : ""
}, {
	KCCClevel : 11,
	prereqKCCC : {
		featuresNot : ["iron grip (prereq: iron muscle; incomp: integrated attack)"],
		featuresAnd : ["integrated attack , 3rd"],
		itemsOr : [
			["warsmith's armor", "integrated armor (medium)"],
			["warsmith's armor", "warplate (heavy)"]
		]
	},
	name : "Integrated Attack, 4th",
	source : [["KCCC", 40]],
	description : ""
}, {
	KCCClevel : 11,
	prereqKCCC : {
		featuresNot : ["iron grip (prereq: iron muscle; incomp: integrated attack)"],
		featuresAnd : ["integrated attack, 4th"],
		itemsOr : [
			["warsmith's armor", "integrated armor (medium)"],
			["warsmith's armor", "warplate (heavy)"]
		]
	},
	name : "Integrated Attack, 5th",
	source : [["KCCC", 40]],
	description : ""
}, {
	KCCClevel : 11,
	prereqKCCC : {
		featuresNot : ["iron grip (prereq: iron muscle; incomp: integrated attack)"],
		featuresAnd : ["integrated attack, 5th"],
		itemsOr : [
			["warsmith's armor", "integrated armor (medium)"],
			["warsmith's armor", "warplate (heavy)"]
		]
	},
	name : "Integrated Attack, 6th",
	source : [["KCCC", 40]],
	description : ""
}, {
	KCCClevel : 11,
	listname : "Iron Muscle (prereq: Integrated Armor or Warplate)",
	prereqKCCC : {
		itemsOr : [
			["warsmith's armor", "integrated armor (medium)"],
			["warsmith's armor", "warplate (heavy)"]
		]
	},
	name : "Iron Muscle",
	source : [["KCCC", 40]],
	description : desc("While wearing my warplate or integrated armor, I add +2 to my Strength score, up to 24"),
	scores : [2, 0, 0, 0, 0, 0],
	scoresMaximum : [24, 0, 0, 0, 0, 0]
}, {
	KCCClevel : 11,
	listname : "Lightning Rod (prereq: Lightning Channel)",
	prereqKCCC : {
		featuresAnd : ["lightning channel"]
	},
	name : "Lightning Rod",
	source : [["KCCC", 40]],
	description : desc([
		"Whenever I cast Lightning Charged, I can treat the spell as one level higher",
		"This change is reflected on the spell sheet (Regenerate to take effect)"
	]),
	spellChanges : {
		'lightning charged' : {
			description : "When target touches other creature they deal 1d6 Lightning dmg, up to 8+2/SL times",
			descriptionFull : "You channel lightning energy into a creature. The energy is harmless to the creature, but escapes in dangerous bursts to other nearby creatures."+
			"\n   Every time that creature strikes another creature with a melee attack, a spell with a range of touch, is struck by another creature with a melee attack, or ends their turn while grappling or being grappled by another creature, they deal 1d6 lightning damage to that creature."+
			"\n   Once this spell has discharged 8 times (dealing up to 8d6 damage), the spell ends."+
			AtHigherLevels + "The spell can discharge damage 2 additional times (dealing 2d6 more total damage) before the spell ends for each slot level above 2nd."
		}
	}
}, {
	KCCClevel : 11,
	name : "Powered Charge",
	source : [["KCCC", 40]],
	description : desc([
		"Once per short rest, as an action, I can perform a Powered Charge, see Notes page"
	]),
	toNotesPage : [{
		name : "Powered Charge",
		source : [["KCCC", 40]],
		note : [
			"As an action, I move 40 ft in a straight line unless my movement is stopped by colliding",
			"with a creature or wall. I can attempt to grapple a creature in my path. On success,",
			"they are carried with me; on fail we collide. At the end of the move, grappled or collided",
			"creatures take 1d6 bludgeoning damage for each 5 ft I traveled. If I am stopped by a wall,",
			"a grappled creature must make a Con save or be stunned until the end of their next turn"
		]
	}],
	action : [["action", ""]],
	usages : 1,
	recovery : "short rest"
}, {
	KCCClevel : 11,
	listname : "Power Slam Capacitor (incomp: other capacitors)",
	prereqKCCC : {
		featuresNot : ["flash freeze capacitor (incomp: other capacitors)"]
	},
	name : "Power Slam Capacitor",
	source : [["KCCC", 41]],
	description : desc([
		"Once per long rest, as an action, I can jump up to my walking speed",
		"I can cast Shockwave without expending a spell slot upon landing"
	]),
	usages : 1,
	recovery : "long rest",
	spellcastingBonus : [{
		name : "Power Slam Capacitor",
		spells : ["shockwave"],
		selection : ["shockwave"],
		firstCol : "oncelr"
	}],
	action : [["action", "Power Slam Capacitor"]]
}, {
	KCCClevel : 15,
	listname : "Heavy Plating (prereq: Warplate)",
	prereqKCCC : {
		itemsAnd : [["warsmith's armor", "warplate (heavy)"]]
	},
	name : "Heavy Plating",
	source : [["KCCC", 41]],
	description : desc("While wearing my warplate, I have resistance to nonmagical bludg./pierc./slash. damage"),
	dmgres : [
		["Bludgeoning", "Bludg. (nonmagical)"],
		["Piercing", "Pierc. (nonmagical)"],
		["Slashing", "Slash. (nonmagical)"]
	]
}, {
	KCCClevel : 15,
	listname : "Iron Grip (prereq: Iron Muscle; incomp: Integrated Attack)",
	prereqKCCC : {
		featuresAnd : ["iron muscle (prereq: integrated armor or warplate)"],
		featuresNot : ["integrated attack (prereq: integrated armor or warplate; incomp: iron grip)"]
	},
	name : "Iron Grip",
	source : [["KCCC", 41]],
	description : desc([
		"I can wield Large weapons without a penalty as a Medium sized creature",
		"I can wield two-handed or versatile weapons in one hand as though it was two"
	])
}, {
	KCCClevel : 15,
	listname : "Phase Engine (prereq: Warskin or Warsuit)",
	prereqKCCC : {
		itemsOr : [
			["warsmith's armor", "warskin (light)"],
			["warsmith's armor", "warsuit (medium)"]
		]
	},
	name : "Phase Engine",
	source : [["KCCC", 41]],
	description : desc([
		"When attacked, I can use my reaction to become intangible",
		"If the attack was nonmagical it misses, else it has disadvantage",
		"It recharges if I finish a short rest, teleport, or enter the ethereal plane"
	]),
	usages : 1,
	recovery : "short rest",
	altResource : "Tlprt/E-Pln",
	action : [["reaction", ""]]
}, {
	KCCClevel : 15,
	name : "Sun Cannon",
	source : [["KCCC", 41]],
	description : desc([
		"Once per long rest, I can cast Sunbeam without using a spell slot"
	]),
	usages : 1,
	recovery : "long rest",
	spellcastingBonus : [{
		name : "Sun Cannon",
		spells : ["sunbeam"],
		selection : ["sunbeam"],
		firstCol : "oncelr"
	}]
}, {
	KCCClevel : 15,
	listname : "Virtual Interface (prereq: Sentient Armor)",
	prereqKCCC : {
		featuresAnd : ["sentient armor"]
	},
	name : "Virtual Interface",
	source : [["KCCC", 41]],
	description : desc([
		"I don't lower my Int below my natural max (20) when using Artificial Strength"
	])
}];
// Warsmith magic items
MagicItemsList["warplate gauntlet"] = {
	name : "Warplate Gauntlet",
	sortname : "Warsmith's Warplate Gauntlet",
	source : [["KCCC", 36]],
	type : "wondrous item",
	description : "As an action while wearing this gauntlet, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount, up to my original Int. I can stop this at any time and it automatically stops when I take off the gauntlet. It can also be augmented by my warsmith upgrades.",
	attunement : true,
	action : [["action", "Artificial Strength"]],
	prerequisite : "Being a Warsmith\nA warsmith's armor already includes a warplate gauntlet and you can't be attuned to both at the same time",
	prereqeval : function(v) { return classes.known.inventor && classes.known.inventor.subclass.indexOf("warsmith") !== -1 && CurrentMagicItems.known.indexOf("warsmith's armor") === -1; },
};
MagicItemsList["warsmith's armor"] = {
	name : "Warsmith's Armor",
	source : [["KCCC", 36]],
	type : "armor",
	description : "This armor adds 2 to my Str (up to 22), makes me count as one size greater for the weight I can carry, can be augmented by my warsmith upgrades, and includes a warplate gauntlet. As an action, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount, up to my original Int.",
	attunement : true,
	prerequisite : "Being a Warsmith\nA warsmith's armor already includes a warplate gauntlet and you can't be attuned to both at the same time",
	prereqeval : function(v) { return classes.known.inventor && classes.known.inventor.subclass.indexOf("warsmith") !== -1 && CurrentMagicItems.known.indexOf("warplate gauntlet") == -1; },
	action : [["action", "Artificial Strength"]],
	scores : [2, 0, 0, 0, 0, 0],
	scoresMaximum : [22, 0, 0, 0, 0, 0],
	choices : ["Warplate (heavy)", "Warsuit (medium)", "Warskin (light)", "Integrated Armor (medium)"],
	"warplate (heavy)" : {
		name : "Warsmith's Warplate",
		description : "This armor adds 2 to my Str (up to 22), makes me count as one size greater for the weight I can carry, can be augmented by my warsmith upgrades, and includes a warplate gauntlet. As an action, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount, up to my original Int.",
		descriptionLong : "This heavy armor includes a warplate gauntlet and gives me an AC of 18, regardless of Dexterity. It gives my disadvantage on my Stealth checks and increases my Strength score with 2, up to a maximum of 22. Also, it increases my size from Small to Medium and makes me count as one size category higher for determining the weight I can lift or carry. As an action, I can use the gauntlet's artificial strength feature to lower my Intelligence and increase my Strength with an equal amount, up to my original Intelligence score. I can stop this at any time and stops when I take it off.",
		weight : 65,
		carryingCapacity : 2,
		armorAdd : "Warplate",
		armorOptions : [{
			regExpSearch : /warplate/i,
			name : "Warplate",
			source : [["KCCC", 36]],
			type : "heavy",
			ac : 18,
			weight : 65,
			isWarsmithArmour : true
		}],
		eval : function(n) { if (CurrentRace.size === 4 && tDoc.getField("Size Category").currentValueIndices === 4) PickDropdown("Size Category", 3); },
		removeeval : function(n) { if (CurrentRace.size === 4 && tDoc.getField("Size Category").currentValueIndices === 3) PickDropdown("Size Category", 4); }
	},
	"warsuit (medium)" : {
		name : "Warsmith's Warsuit",
		description : "This armor adds 2 to my Str, up to 22. It can be augmented by my warsmith upgrades and includes a warplate gauntlet. As an action, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount, up to my original Int. I can stop this at any time and it stops when I take it off.",
		descriptionLong : "This medium armor includes a warplate gauntlet and gives me an AC of 14 + my Dexterity modifier (max 2) and increases my Strength score with 2, up to a maximum of 22. As an action, I can use the gauntlet's artificial strength feature to lower my Intelligence and increase my Strength with an equal amount, up to my original Intelligence score. I can stop this at any time and it stops automatically when I take the gauntlet off.",
		weight : 20,
		armorAdd : "Warsuit",
		armorOptions : [{
			regExpSearch : /warsuit/i,
			name : "Warsuit",
			source : [["KCCC", 36]],
			type : "medium",
			ac : 14,
			weight : 20,
			isWarsmithArmour : true
		}]
	},
	"warskin (light)" : {
		name : "Warsmith's Warskin",
		description : "This armor adds 2 to my Str, up to 22. It can be augmented by my warsmith upgrades and includes a warplate gauntlet. As an action, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount, up to my original Int. I can stop this at any time and it stops when I take it off.",
		descriptionLong : "This medium armor includes a warplate gauntlet and gives me an AC of 12 + my Dexterity modifier and increases my Strength score with 2, up to a maximum of 22. As an action, I can use the gauntlet's artificial strength feature to lower my Intelligence and increase my Strength with an equal amount, up to my original Intelligence score. I can stop this at any time and it stops automatically when I take the gauntlet off.",
		weight : 13,
		armorAdd : "Warskin",
		armorOptions : [{
			regExpSearch : /warskin/i,
			name : "Warskin",
			source : [["KCCC", 36]],
			type : "light",
			ac : 12,
			weight : 13,
			isWarsmithArmour : true
		}]
	},
	"integrated armor (medium)" : {
		name : "Warsmith's Integrated Armor",
		description : "This armor adds 2 to my Str (up to 22), makes me count as one size greater for the weight I can carry, can be augmented by my warsmith upgrades, and includes a warplate gauntlet. As an action, I can use its artificial strength feature to lower my Int and increase my Str with an equal amount, up to my original Int.",
		descriptionLong : "This medium armor includes a warplate gauntlet and gives me an AC of 14 + my Dexterity modifier (max 2) and increases my Strength score with 2, up to a maximum of 22. Also, it makes me count as one size category higher for determining the weight I can lift or carry. As an action, I can use the gauntlet's artificial strength feature to lower my Intelligence and increase my Strength with an equal amount, up to my original Intelligence score. I can stop this at any time and it stops automatically when I take the gauntlet off.",
		carryingCapacity : 2,
		armorAdd : "Integrated Armor",
		armorOptions : [{
			regExpSearch : /integrated armou?r/i,
			name : "Integrated Armor",
			source : [["KCCC", 36]],
			type : "medium",
			ac : 14,
			isWarsmithArmour : true
		}]
	}
};
}

{// Fleshsmith subclass DONE
var KCCC_fleshsmith = AddSubClass("inventor", "fleshsmith", {
	regExpSearch : /^(?=.*fleshsmith)(?!.*artificer)(?!.*wizard).*$/i,
	subname : "Fleshsmith",
	fullname : "Fleshsmith",
	abilitySaveAlt : GetFeatureChoice("classes", "inventor", "subclassfeature1.1") === "perfection of creation" ? 3 : false, // MPMB: essential for how the Perfection of Creation eval now works
	source : [["KCCC", 42]],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature1" : {
			name : "Fleshsmith's Proficiency",
			source : [["KCCC", 42]],
			minlevel : 1,
			description : " [medicine, leatherworker's tools]" + desc([
				"I can make Medicine checks as Intelligence (Medicine) checks",
				"When I make an Intelligence (Medicine) check to stabilize a creature they regain 1 HP"
			]),
			skills : ["Medicine"],
			toolProfs : ["Leatherworker's tools"],
			addMod : [
				{ type : "skill", field : "Medicine", mod : "Int - Wis", text : "I use Intelligence for my Medicine checks instead of Wisdom."}
			],
		},
		"subclassfeature1.1" : {
			name : "Thesis of Flesh",
			source : [["KCCC", 42]],
			minlevel : 1,
			description : desc([
				"Choose a Form, Mind, Creation, or Technique using the \"Choose Feature\" button above"
			]),
			choices : ["Perfection of Form", "Perfection of Mind", "Perfection of Creation", "Perfection of Technique"],
			"perfection of form" : {
				name : "Perfection of Form",
				description : desc([
					"When I take the attack action I can use my bonus action to make one additional attack",
					"When an upgrade uses my spell save DC, it can use (DC 8 + Con mod + Prof Bonus)",
					'I gain the Fleshcrafted Mutation upgrade; Use the "Choose Feature" button'
				]),
				usages : levels.map(function (n) { return n + " bonus attacks per"; }),
				usagescalc : "event.value = classes.known.inventor ? classes.known.inventor.level : 0",
				recovery : "long rest",
				action : [["bonus action", " (Attack)"]],
				eval : function() {
					CurrentClasses.inventor.abilitySaveAlt = 3;
					SetTheAbilitySaveDCs();
				},
				removeeval : function() {
					delete CurrentClasses.inventor.abilitySaveAlt;
					SetTheAbilitySaveDCs();
				}
			},
			"perfection of mind" : {
				name : "Perfection of Mind",
				description : desc([
					"I have a pool of d8s that I can expend when I heal or use a Medicine check to damage",
					"The heal or damage is increased by the dice; I can expend up to my Prof Bonus at once",
					"I gain the Dissection upgrade and expertise with Wisdom (Medicine)"
				]),
				usages : levels.map(function (n) { return n + "d8 per "; }),
				usagescalc : "event.value = classes.known.inventor ? classes.known.inventor.level + 'd8' : 0",
				recovery : "long rest",
				skills : [["Medicine", "full"]],
				eval : function() {
					if (GetFeatureChoice("classes", "inventor", "subclassfeature3", true).indexOf("dissection") !== -1) {
						ClassFeatureOptions(["inventor", "subclassfeature3", "dissection", true]);
					}
					if (GetFeatureChoice("classes", "inventor", "subclassfeature1.1", true).indexOf("dissection") === -1) {
						ClassFeatureOptions(["inventor", "subclassfeature1.1", "dissection", true]);
					}
				},
				removeeval : function() {
					if (GetFeatureChoice("classes", "inventor", "subclassfeature1.1", true).indexOf("dissection") !== -1) {
						ClassFeatureOptions(["inventor", "subclassfeature1.1", "dissection", true], "remove");
					}
				}
			},
			"perfection of creation" : {
				name : "Perfection of Creation",
				description : desc([
					"I gain the Adorable Critter upgrade; It gains a natural weapon",
					"As an action I can cause it to move 10 ft and take the Attack action",
					"I can do this as a bonus action a limited number of times per long rest",
					"At the end of a rest it gains temporary HP equal to my inventor level + my Int mod",
				]),
				weaponOptions : {
					regExpSearch : /^(?=.*adorable)(?=.*natural)(?=.*weapon).*$/i,
					name : "Adorable Natural Weapon",
					source : [["KCCC", 42]],
					ability : 1,
					type : "Natural",
					damage : [1, 6, "piercing"],
					range : "Melee",
					description : "Cannot attack independently",
					modifiers : ["", "oInt"],
					abilitytodamage : false
				},
				usages : levels.map(function (n) { return n + " bonus actions per"; }),
				usagescalc : "event.value = classes.known.inventor ? classes.known.inventor.level : 0",
				recovery : "long rest",
				action : [["action", "Command Critter"], ["bonus action", "Command Critter (expends a use)"]],
				calcChanges : {
					companionCallback : [
						function(prefix, oCrea, bAdd, sCompType) {
							Value(prefix + "Comp.Use.Attack.1.Weapon Selection", bAdd ? "Adorable Natural Weapon" : "");
						},
						"My adorable critter familiar has a natural weapon attack.",
						700 // Add this attack before Corrosive Critter?!
					]
				},
				eval : function() {
					if (GetFeatureChoice("classes", "inventor", "subclassfeature3", true).indexOf("adorable critter") !== -1) {
						ClassFeatureOptions(["inventor", "subclassfeature3", "adorable critter", true]);
					}
					if (GetFeatureChoice("classes", "inventor", "subclassfeature1.1", true).indexOf("adorable critter") === -1) {
						ClassFeatureOptions(["inventor", "subclassfeature1.1", "adorable critter", true]);
					}
				},
				removeeval : function() {
					if (GetFeatureChoice("classes", "inventor", "subclassfeature1.1", true).indexOf("adorable critter") !== -1) {
						ClassFeatureOptions(["inventor", "subclassfeature1.1", "adorable critter", true], "remove");
					}
				}
			},
			"perfection of technique" : {
				name : "Perfection of Technique",
				description : desc([
					"I gain the Flaying Hook upgrade",
					"I can integrate the hook with another weapon, I wield both when wielding one",
					"Any magical bonus applied to the attached weapon is applied to the hook (if higher)",
					"After I pull the hook I can make a weapon attack against that creature as a bonus action",
					"I can only do this bonus action a limited number of times per long rest"
				]),
				usages : levels.map(function (n) { return n + " bonus actions per "; }),
				usagescalc : "event.value = classes.known.inventor ? classes.known.inventor.level : 0",
				recovery : "long rest",
				eval : function() {
					if (GetFeatureChoice("classes", "inventor", "subclassfeature3", true).indexOf("flaying hook") !== -1) {
						ClassFeatureOptions(["inventor", "subclassfeature3", "flaying hook", true]);
					}
					if (GetFeatureChoice("classes", "inventor", "subclassfeature1.1", true).indexOf("flaying hook") === -1) {
						ClassFeatureOptions(["inventor", "subclassfeature1.1", "flaying hook", true]);
					}
				},
				removeeval : function() {
					if (GetFeatureChoice("classes", "inventor", "subclassfeature1.1", true).indexOf("flaying hook") !== -1) {
						ClassFeatureOptions(["inventor", "subclassfeature1.1", "flaying hook", true], "remove");
					}
				}
			},
			extraname : "Thesis of Flesh Upgrade", // This method, creating all these options as extrachoices, works but isn't as streamlined for the user as it could be with eval code
			// MPMB: For the ones that don't have a choice (i.e. not mutation), I added a (remove)eval to the choice above
			extrachoices : ["Fleshcrafted Mutation (Extra Arm)", "Fleshcrafted Mutation (Extra Claws)", "Fleshcrafted Mutation (Extra Fangs)", "Fleshcrafted Mutation (Extra Tentacle)", "Dissection", "Adorable Critter", "Flaying Hook"],
			extraTimes : 1,
			"fleshcrafted mutation (extra arm)" : {
				name : "Fleshcrafted Mutation (Extra Arm)",
				source : [["KCCC", 45]],
				description : desc([
					"I gain an extra arm that can hold and hit as normal"
				])
			},
			"fleshcrafted mutation (extra claws)" : {
				name : "Fleshcrafted Mutation (Extra Claws)",
				source : [["KCCC", 45]],
				description : " [1d8 slashing damage]" + desc([
					"I gain a natural weapon that counts as having light and finesse",
					"I am proficient with it, and it is considered to be a one-handed weapon"
				]),
				weaponsAdd : ["Extra Claws"],
				weaponOptions : {
					regExpSearch : /^(?=.*extra)(?=.*claws).*$/i,
					name : "Extra Claws",
					source : [["KCCC", 45]],
					ability : 1,
					type : "Natural",
					damage : [1, 8, "slashing"],
					range : "Melee",
					description : "Finesse, light",
					abilitytodamage : true
				}
			},
			"fleshcrafted mutation (extra fangs)" : {
				name : "Fleshcrafted Mutation (Extra Fangs)",
				source : [["KCCC", 45]],
				description : " [1d10 pierc. damage]" + desc([
					"My mouth becomes a natural weapon; I am proficient with it"
				]),
				weaponsAdd : ["Extra Fangs"],
				weaponOptions : {
					regExpSearch : /^(?=.*extra)(?=.*fangs).*$/i,
					name : "Extra Fangs",
					source : [["KCCC", 45]],
					ability : 1,
					type : "Natural",
					damage : [1, 10, "piercing"],
					range : "Melee",
					abilitytodamage : true
				}
			},
			"fleshcrafted mutation (extra tentacle)" : {
				name : "Fleshcrafted Mutation (Extra Tentacle)",
				source : [["KCCC", 45]],
				description : " [1d6 bludg. damage]" + desc([
					"I gain a natural weapon with reach; I am proficient with it",
					"I can make a Strength (Athletics) or object interaction with a 10 ft reach with it"
				]),
				weaponsAdd : ["Extra Tentacle"],
				weaponOptions : {
					regExpSearch : /^(?=.*extra)(?=.*tentacle).*$/i,
					name : "Extra Tentacle",
					source : [["KCCC", 45]],
					ability : 1,
					type : "Natural",
					damage : [1, 6, "bludgeoning"],
					range : "Melee",
					description : "Reach; Can make Str (Athletics) or obj interact with 10 ft reach",
					abilitytodamage : true
				}
			},
			"dissection" : {
				name : "Dissection",
				source : [["KCCC", 43]],
				description : desc([
					"As an action while holding a melee finesse weapon I am in proficient with",
					"I make an Int (Medicine) check against an in range creature's AC",
					"On a success they take the weapon damage dice plus my Int mod; Nat 20: \xD72 dice",
					"If I atk more than once with the Attack action I can deal extra dice per extra atk"
				]),
				action : [["action", ""]],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isMeleeWeapon && fields.Proficiency && (/^(?=.*dissection)(?=.*finesse).*$/i.test(v.WeaponText))) {
								if (!CurrentProfs.skill["Med"]) fields.Proficiency = false;
								if (CurrentProfs.skill["Med_Exp"]) fields.To_Hit_Bonus = 'Prof'
								// Add Proficiency twice if they have Expertise with Medicine
								fields.Mod = 4;
								fields.description += (fields.Description ? '; ' : '') + "Forfeits extra atks for extra damage";
								if (classes.attacks && classes.attacks > 1 && fields.Damage_Die) {
									fields.Damage_Die = (Number(fields.Damage_Die.charAt(0)) * classes.attacks).toString() + fields.Damage_Die.slice(1)
								}
							};
						},
						"If I include the word 'Dissection' in the name of a finesse weapon that I am proficient in, it gets treated as the attack from my Dissection upgrade. The attack is made using my Intelligence (Medicine). If I would normally make more than one attack per action instead I deal extra damage dice per extra attack."
					]
				}
			},
			"adorable critter" : {
				name : "Adorable Critter",
				source : [["KCCC", 43]],
				description : desc([
					"I create a Tiny CR 0 creature that serves as my familiar as per Find Familiar",
					"Its type becomes construct; It becomes unconcious at 0 HP instead of disappearing",
					"If it starts its turn unconcious it regains its full HP a limited number of times per short rest",
					"I can resuscitate it at the end of a rest without using a spell slot or materials"
				]),
				usages : "Intelligence modifier per ",
				usagescalc : "event.value = Math.max(1, What('Int Mod'));",
				recovery : "short rest",
				spellcastingBonus : [{
					name : "Adorable Critter",
					spells : ["find familiar"],
					selection : ["find familiar"],
					firstCol : "oncesr"
				}],
				spellChanges : {
					"find familiar" : {
						name : "Resusitate Critter",
						components : "V,S",
						compMaterial : "",
						ritual : false,
						description : "Gain the services of a familiar; can see through its eyes; it can deliver touch spells; see Book",
						changes : "I can cast Find Familiar without expending a spell slot or material components at the end of a rest to recreate my Adorable Critter. When I do so the creature can be any Tiny CR 0 creature, and is a construct rather than one of the types listed in the spell"
					}
				}
			},
			"flaying hook" : {
				name : "Flaying Hook",
				source : [["KCCC", 44]],
				description : " [melee, 20 ft, special, 1d6 piercing]" + desc([
					"If I hit a Medium or smaller creature > 5 ft away, constested Strength (Athletics) check",
					"Success: Small or smaller pulled to me, Medium pulled \u00BD the distance (round up)",
					"If I hit a Medium or larger creature I can pull myself 10 ft towards them"
				]),
				weaponsAdd : ["Flaying Hook"],
				weaponOptions : {
					regExpSearch : /^(?=.*flaying)(?=.*hook).*$/i,
					name : "Flaying Hook",
					source : [["KCCC", 44]],
					ability : 1,
					type : "AlwaysProf",
					damage : [1, 6, "piercing"],
					range : "Melee, 20 ft",
					description : "Special: Pull Med or smaller creas towards me, pull myself to Med or larger creas",
					tooltip : "Special: When I hit a target that is more than 5 feet away from me, if the target is Medium or smaller, I can make a Strength (Athletics) check contested by its Strength (Athletics) to pull the target toward me. On a successful check, a Small or smaller target is pulled to me, and a Medium target is pulled half the distance (rounding up) toward me. The creature takes 1 additional damage for each 5 feet it is pulled. If the creature is Medium or larger, when I hit a target more than 5 feet away from me I can pull myself up to 10 feet toward the target.",
					special : true,
					abilitytodamage : true
				}
			}
		},
		"subclassfeature3" : {}, // Will be filled out by the KCCC_inventorSubclass_subclassfeature3 function
		"subclassfeature3.1" : {
			name : "Uncanny Vitality",
			source : [["KCCC", 42]],
			minlevel : 3,
			description : desc([
				"While I have 1 or more hit points at the start of my turn I can expend a Hit Die",
				"I regain HP from this as normal; If I have 0 HP I can use this at the end of my turn",
				"I regain Hit Dice equal to my Constitution modifier on a short or long rest",
				"I regenerate any missing limbs over a long rest"
			])
		},
		"subclassfeature3.2" : {
			name : "Arcane Bioengineering",
			source : [["KCCC", 42]],
			minlevel : 3,
			description : desc([
				"I can use Arcane Retrofit on natural weapons gained from this subclass"
			])
		},
		"subclassfeature14" : {
			name : "Perfection of Thesis",
			source : [["KCCC", 42]],
			minlevel : 14,
			description : desc([
				"I regain uses of my Thesis of Flesh equal to my Int mod when I end a short rest"
			])
		},
	}
});
KCCCglobal.upgrades.fleshsmith = [
	ClassSubList[KCCC_fleshsmith].features["subclassfeature1.1"]["fleshcrafted mutation (extra arm)"],
	ClassSubList[KCCC_fleshsmith].features["subclassfeature1.1"]["fleshcrafted mutation (extra claws)"],
	ClassSubList[KCCC_fleshsmith].features["subclassfeature1.1"]["fleshcrafted mutation (extra fangs)"],
	ClassSubList[KCCC_fleshsmith].features["subclassfeature1.1"]["fleshcrafted mutation (extra tentacle)"],
	ClassSubList[KCCC_fleshsmith].features["subclassfeature1.1"]["dissection"],
	ClassSubList[KCCC_fleshsmith].features["subclassfeature1.1"]["adorable critter"],
	ClassSubList[KCCC_fleshsmith].features["subclassfeature1.1"]["flaying hook"],
	{
		listname : "Fleshcrafted Mutation (Extra Arm), 2nd",
		name : "Fleshcrafted Mutation (Extra Arm), 2nd",
		prereqKCCC : {
			featuresAnd : ["fleshcrafted mutation (extra arm)"]
		},
		source : [["KCCC", 45]],
		description : desc([
			"I gain another extra arm that can hold and hit as normal"
		])
	}, {
		name : "Acid Gland",
		source : [["KCCC", 43]],
		description : cantripDie.map(function (n) { // Using cantripDie map on the description
			moddedDie = Number(n) + 2
			lines = [
				"I gain a ranged spell attack or action that does " + moddedDie + "d8 acid damage with a range of 30 ft",
				"I can instead make this attack or action with a range of a 30-ft cone",
				"All in area make a Dex save against my spell save DC or take " + moddedDie + "d4 acid damage"
			]
			return desc(lines)
		}),
		usages : 1,
		recovery : "short rest",
		action : [["action", " (or as an Attack)"]],
		weaponsAdd : ["Acid Gland"],
		weaponOptions : {
			regExpSearch : /^(?=.*acid)(?=.*gland).*$/i,
			name : "Acid Gland",
			source : [["KCCC", 43]],
			ability : 4,
			type : "Spell",
			list : "spell",
			damage : ["=C+2", 8, "acid"],
			range : "30 ft",
			description : "Alt: 30-ft cone, Dex save vs spell save DC, damage does d4s instead of d8s",
		}
	}, {
		name : "Better Eyes (Blindsight)",
		source : [["KCCC", 43]],
		description : " [Blindsight (10 ft)]",
		vision : [["Blindsight", 10]],
	}, {
		name : "Better Eyes (Darkvision)",
		source : [["KCCC", 43]],
		description : " [Darkvision (60 ft)]",
		vision : [["Darkvision", 60]],
	}, {
		name : "Better Eyes (Long Sight)",
		source : [["KCCC", 43]],
		description : " [2\xD7 vision range]" + desc([
			"I can see twice as far as my natural vision range"
		])
	}, {
		name : "Better Eyes (Perception)",
		source : [["KCCC", 43]],
		description : " [Perception Proficiency]",
		skills : ["Perception"]
	}, {
		name : "Brimstone Bladder",
		source : [["KCCC", 43]],
		description : cantripDie.map(function (n) { // Using cantripDie map on the description
			moddedDie = Number(n) + 2
			lines = [
				"As an attack or action I can spit fire in a 15-ft line or cone",
				"All in area make a Dex save against my spell save DC or take " + moddedDie + "d6 fire damage",
				"I can expend a spell slot to do additional d6 equal to the level of that spell slot"
			]
			return desc(lines)
		}),
		usages : 1,
		recovery : "short rest",
		action : [["action", " (or as an Attack)"]],
	}, {
		name : "Crushing Grip",
		source : [["KCCC", 44]],
		description : desc([
			"Creatures I grapple or restrain have disadvantage to escape the condition",
			"I can deal my Str mod bludgeoning damage to them at the start their turn"
		])
	}, {
		listname : "Death Flail (prereq: Perfection of Technique)",
		prereqKCCC : {
			featuresAnd : ["perfection of technique"],
		},
		name : "Death Flail",
		source : [["KCCC", 44]],
		description : desc([
			"The weapon my flaying hook is attached to gains the Reach property",
			"As an action, up to 4 creas within 10 ft make a Dex save (DC 8 + Str mod + Prof Bonus)",
			"On a fail take my flaying weapon's damage dice + my Str mod of the weapon damage type",
			"If I have the Spiked Chain upgrade I can select one hit to be affected by the it"
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (v.isMeleeWeapon && !v.isNaturalWeapon && !v.isSpell && (/\bflaying\b/i).test(v.WeaponTextName) && !(/reach/i).test(fields.Description)) {
							fields.Description = fields.Description ? "Reach, " + fields.Description.charAt(0).toLowerCase() + fields.Description.slice(1) : "Reach";
					}
				},
				"If I include the worlds 'Flaying' in the name of a melee weapon it will be treated as the weapon my Flaying Hook is attached to and it will gain the Reach property."
			]
		}
	}, {
		name : "Extra Eyes",
		source : [["KCCC", 44]],
		description : desc([
			"I gain proficiency with Perception, or expertise if I already had it",
			"I have advantage with Wisdom (Perception) checks that rely on sight"
		]),
		skills : [["Perception", "increment"]],
		vision : [["Adv. on Wis (Perception) checks using sight", 0]]
	}, {
		listname : "Fleshcrafted Enhancement (Vampiric) (prereq: Extra Fangs)",
		prereqKCCC : {
			featuresOr : ["fleshcrafted mutation (extra fangs)"],
			featuresNot : [
				"fleshcrafted enhancement (infernal) (prereq: extra fangs or extra claws)",
				"fleshcrafted enhancement (venomous) (prereq: extra Fangs or extra claws)",
				"fleshcrafted enhancement (razor) (prereq: extra fangs or extra claws)",
				"fleshcrafted enhancement (relentless) (prereq: extra arm or extra tentacle)"
			],
		},
		name : "Fleshcrafted Enhancement (Vampiric)",
		source : [["KCCC", 44]],
		description : desc([
			"Once on my turn when I deal damage with Extra Fangs, I can add 1d4 necrotic damage",
			"If my target is a living creature with CR greater than \u00BC I regain that many hit points",
			"If I roll a 20 to hit or expend a spell slot I add my Con mod to the hit points regained"
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (v.WeaponName == "extra fangs" && /\bvampiric\b/i.test(v.WeaponTextName)) {
						fields.Description += (fields.Description ? '; ' : '') + 'Once on my turn +1d4 necrotic damage, heal equal to damage dealt'
					}
				},
				"I can add 'Vampiric' to my Extra Fangs to treat them as my Fleshcrafted Enhancement weapon. The weapon does an extra 1d4 necrotic damage once on my turn"
			]
		}
	}, {
		listname : "Fleshcrafted Enhancement (Infernal) (prereq: Extra Fangs or Extra Claws)",
		prereqKCCC : {
			featuresOr : ["fleshcrafted mutation (extra fangs)", "fleshcrafted mutation (extra claws)"],
			featuresNot : [
				"fleshcrafted enhancement (vampiric) (prereq: extra fangs)",
				"fleshcrafted enhancement (venomous) (prereq: extra Fangs or extra claws)",
				"fleshcrafted enhancement (razor) (prereq: extra fangs or extra claws)",
				"fleshcrafted enhancement (relentless) (prereq: extra arm or extra tentacle)"
			],
		},
		name : "Fleshcrafted Enhancement (Infernal)",
		source : [["KCCC", 44]],
		description : desc([
			"Once on my turn I can do an extra 1d6 fire damage with my Extra Fangs or Claws",
			"If I roll a 20 to hit or expend a spell slot I do another extra 1d6 fire damage"
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if ((v.WeaponName == "extra fangs" || v.WeaponName == "extra claws") && /\binfernal\b/i.test(v.WeaponTextName)) {
						fields.Description += (fields.Description ? '; ' : '') + 'Once on my turn +1d6 fire damage'
					}
				},
				"I can add 'Infernal' to my Extra Fangs or Claws to treat them as my Fleshcrafted Enhancement weapon. The weapon does an extra 1d6 fire damage once on my turn"
			]
		}
	}, {
		listname : "Fleshcrafted Enhancement (Venomous) (prereq: Extra Fangs or Extra Claws)",
		prereqKCCC : {
			featuresOr : ["fleshcrafted mutation (extra fangs)", "fleshcrafted mutation (extra claws)"],
			featuresNot : [
				"fleshcrafted enhancement (infernal) (prereq: extra fangs or extra claws)",
				"fleshcrafted enhancement (vampiric) (prereq: extra fangs)",
				"fleshcrafted enhancement (razor) (prereq: extra fangs or extra claws)",
				"fleshcrafted enhancement (relentless) (prereq: extra arm or extra tentacle)"
			],
		},
		name : "Fleshcrafted Enhancement (Venomous)",
		source : [["KCCC", 44]],
		description : desc([
			"Once on my turn I can do an extra 1d8 poison damage with my Extra Fangs or Claws",
			"If I roll a 20 to hit or expend a spell slot the target must make a Con save",
			"Vs. my spell save DC, on a fail: poisoned for 1 min, repeat save at end of their turn"
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if ((v.WeaponName == "extra fangs" || v.WeaponName == "extra claws") && /\bvenomous\b/i.test(v.WeaponTextName)) {
						fields.Description += (fields.Description ? '; ' : '') + 'Once on my turn +1d8 poison damage'
					}
				},
				"I can add 'Venomous' to my Extra Fangs or Claws to treat them as my Fleshcrafted Enhancement weapon. The weapon does an extra 1d8 poison damage once on my turn"
			]
		}
	}, {
		listname : "Fleshcrafted Enhancement (Razor) (prereq: Extra Fangs or Extra Claws)",
		prereqKCCC : {
			featuresOr : ["fleshcrafted mutation (extra fangs)", "fleshcrafted mutation (extra claws)"],
			featuresNot : [
				"fleshcrafted enhancement (infernal) (prereq: extra fangs or extra claws)",
				"fleshcrafted enhancement (vampiric) (prereq: extra fangs)",
				"fleshcrafted enhancement (venomous) (prereq: extra Fangs or extra claws)",
				"fleshcrafted enhancement (relentless) (prereq: extra arm or extra tentacle)"
			],
		},
		name : "Fleshcrafted Enhancement (Razor)",
		source : [["KCCC", 44]],
		description : desc([
			"My Extra Fangs or Claws damage die increases by one step (d8 to d10, d10 to d12)",
			"If I roll a 20 to hit or expend a spell slot I can max one damage die after rolling"
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if ((v.WeaponName == "extra fangs" || v.WeaponName == "extra claws") && /\brazor\b/i.test(v.WeaponTextName)) {
						switch(fields.Damage_Die) {
							case "1d4":
								fields.Damage_Die = "1d6";
								break;
							case "1d6":
								fields.Damage_Die = "1d8";
								break;
							case "1d8":
								fields.Damage_Die = "1d10";
								break;
							case "1d10":
								fields.Damage_Die = "1d12";
								break;
						}
					}
				},
				"I can add 'Razor' to my Extra Fangs or Claws to treat them as my Fleshcrafted Enhancement weapon. The damage die of the weapon is increased by one"
			]
		}
	}, {
		listname : "Fleshcrafted Enhancement (Relentless) (prereq: Extra Arm or Extra Tentacle)",
		prereqKCCC : {
			featuresOr : ["fleshcrafted mutation (extra arm)", "fleshcrafted mutation (extra tentacle)"],
			featuresNot : [
				"fleshcrafted enhancement (infernal) (prereq: extra fangs or extra claws)",
				"fleshcrafted enhancement (vampiric) (prereq: extra fangs)",
				"fleshcrafted enhancement (venomous) (prereq: extra Fangs or extra claws)",
				"fleshcrafted enhancement (razor) (prereq: extra fangs or extra claws)"
			],
		},
		name : "Fleshcrafted Enhancement (Relentless)",
		source : [["KCCC", 44]],
		description : desc([
			"I gain an extra reaction for opportunity attacks with my Extra Arm or Tentacle",
			"If I roll 20 to hit or expend a SS I can attack again without adding my mod to the damage"
		])
	}, {
		name : "Field Surgery",
		source : [["KCCC", 45]],
		additional : levels.map( function (n) {
			return "Up to " + Math.ceil(n/2) + " Hit Dice"
		}),
		description : desc([
			"As an action I repair a willing creature within 5 ft of me",
			"They can expend Hit Dice up to half my inventor level (rounded up)",
			"They regain health as normal, but can add the higher of their Con mod or my Int mod"
		])
	}, {
		name : "Fix Flesh",
		source : [["KCCC", 45]],
		description : desc([
			"My Cure Wounds heals for an additional amount equal to my Intelligence modifier"
		]),
		calcChanges : {
			spellAdd : [
				function (spellKey, spellObj, spName) {
					if (spellKey === "cure wounds" && What("Int Mod") && Number(What("Int Mod")) > 0) {
						return genericSpellDmgEdit(spellKey, spellObj, "heal", "Int");
					}
				},
				"My Cure Wounds gets my Intelligence modifier added to the hit points restored."
			]
		}
	}, {
		name : "Forbidden Knowledge",
		source : [["KCCC", 45]],
		description : desc([
			"I can cast Inflict Wounds (or Blindness/Deafness level 5+) without expending a spell slot",
			"I also learn necromancy spells, which do not count against the number of spells I can know"
		]),
		usages : 1,
		recovery : "long rest",
		spellcastingBonus : [{
			name : "Forbidden Knowledge",
			spells : ["inflict wounds", "blindness/deafness"],
			selection : ["inflict wounds", "blindness/deafness"],
			times : levels.map( function (n) {
				return n < 5 ? 1 : 2
			}),
			firstCol : "oncelr"
		}, {
			name : "Forbidden Knowledge",
			spells : ["gentle repose", "invest life", "vampiric touch", "blight"],
			selection : ["gentle repose", "invest life", "vampiric touch", "blight"],
			times : levels.map( function (n) {
				return n < 5 ? 0 : n < 9 ? 1 : n < 13 ? 3 : 4
			})
		}]
	}, {
		listname : "Horrifying Abomination (prereq: 3 upgrades modifying my body)",
		prereqKCCC : {
			featuresFilter : [
				[
					"fleshcrafted mutation (extra arm)", "fleshcrafted mutation (extra claws)", "fleshcrafted mutation (extra fangs)", "fleshcrafted mutation (extra tentacle)", "fleshcrafted mutation (extra arm), 2nd",
					"acid gland",
					"better eyes (blindsight)", "better eyes (darkvision)", "better eyes (long sight)", "better eyes (perception)",
					"brimstone bladder",
					"extra eyes",
					"fleshcrafted enhancement (vampiric) (prereq: extra fangs)", "fleshcrafted enhancement (infernal) (prereq: extra fangs or extra claws)", "fleshcrafted enhancement (venomous) (prereq: extra Fangs or extra claws)", "fleshcrafted enhancement (razor) (prereq: extra fangs or extra claws)", "fleshcrafted enhancement (relentless) (prereq: extra arm or extra tentacle)",
					"massive mutation",
					"mutating mastery",
					"secondary life organs",
					"subdermal plating",
					"toxicity",
					"devouring maw",
					"extreme mutation (prereq: mutating mastery)",
					"massive hulk (prereq: massive mutation)",
					"wings seem useful",
					"best eyes (prereq: better eyes)",
					"uncanny strength (prereq: strength 18 or higher)",
				],
				function (a) {return a < 3}
			]
		},
		name : "Horrifying Abomination",
		source : [["KCCC", 45]],
		description : desc([
			"I gain proficiency with Intimidation, or expertise if I already had it",
		]),
		skills : [["Intimidation", "increment"]],
	}, {
		name : "Massive Mutation",
		source : [["KCCC", 45]],
		description : desc([
			"As a bonus action I can become Large; Natural \u0026 medium sized weapons do +1d4 damage",
			"I have advantage on contested Str (Athletic) checks against Large or smaller creatures",
			"Creatures I choose who see me mutate must make a Wis save vs. my spell save DC",
			"On a fail they are frightened until the end of their turn; Bonus action to turn back"
		]),
		action : [["bonus action", " (start/end)"]],
		usages : "Con mod + Int mod rnds per ",
		usagescalc : 'event.value = Math.max(1, (Number(What("Con Mod")) + Number(What("Int Mod")))',
		recovery : "short rest"
	}, {
		name : "Mutating Mastery",
		source : [["KCCC", 45]],
		description : desc([
			"I can cast Alter Self without expending a spell slot"
		]),
		usages : 1,
		recovery : "short rest",
		spellcastingBonus : [{
			name : "Mutating Mastery",
			spells : ["alter self"],
			selection : ["alter self"],
			firstCol : "oncesr"
		}]
	}, {
		name : "Secondary Life Organs",
		source : [["KCCC", 45]],
		description : desc([
			"When I make a death save I can replace the results of the roll with a 20",
			"Additionally, I no longer take extra damage from critical hits"
		]),
		usages : 1,
		recovery : "long rest"
	}, {
		listname : "Spiked Chain (prereq: Flaying Hook)",
		prereqKCCC : {
			featuresAnd : ["flaying hook"],
		},
		name : "Spiked Chain",
		source : [["KCCC", 46]],
		description : desc([
			"When I attack a crea within 5 ft with my Flaying Hook I can make a Spiked Chain attack",
			"This deals 2d4 piercing damage and has the special property",
			"That creature's speed drops by 10 ft, takes 1d4 extra damage per 5 ft move (up to 2d4)",
			"I have adv on opp. atks on them, but can only use spiked chain vs. them until my next turn",
			"If they don't move before my next turn, they take an extra 1d4 slashing damage"
		]),
		weaponsAdd : ["Spiked Chain"],
		weaponOptions : {
			regExpSearch : /^(?=.*spiked)(?=.*chain).*$/i,
			name : "Spiked Chain",
			source : [["KCCC", 46]],
			ability : 1,
			type : "AlwaysProf",
			damage : [2, 4, "piercing"],
			range : "Melee, 20 ft",
			description : "Special: Speed drops by 10 ft, takes extra damage for moving or staying still",
			tooltip : "Special: When you hit a creature with this weapon, that target loses 10 feet of movement (hindered by the chain) and takes 1d4 damage each time they move 5 feet, up to 2d4 damage (for 10 feet of movement). You can't use this weapon against another creature until the start of your next turn, but have advantage on opportunity attacks against that target. If it doesn't move before the start of your next turn, you reel your chain back in, dealing 1d4 slashing damage to that target.",
			special : true,
			abilitytodamage : true
		}
	}, {
		name : "Subdermal Plating",
		source : [["KCCC", 46]],
		description : desc([
			"I gain a natural armor with an AC of 17 (18 at 5+ level), I do not add my Dex mod"
		]),
		armorAdd : "Natural Armor",
		armorOptions : {
			regExpSearch : /^(?=.*natural)(?=.*armou?r).*$/i,
			name : "Natural Armor",
			source : [["KCCC", 46]],
			ac : 17,
			dex : -10
		},
		eval : function() { // Give a bonus to the Natural Armor if the inventor is level 5+
			if (classes.known.inventor.level >= 5) {
				processAddArmour(true, "Natural Armor +1")
			}
		},
		changeeval : function() {
			if (classes.known.inventor.level >= 5 && What('AC Armor Description') == "Natural Armor") {
				processAddArmour(true, "Natural Armor +1")
			} else if (classes.known.inventor.level < 5 && What('AC Armor Description') == "Natural Armor +1") {
				Clear('AC Armor Description')
				processAddArmour(true, "Natural Armor")
			}
		},
		removeeval : function() {
			if (What('AC Armor Description') == "Natural Armor" || What('AC Armor Description') == "Natural Armor +1") Clear('AC Armor Description')
		}
	}, {
		name : "Toxicity",
		source : [["KCCC", 46]],
		additional : "Constitution modifier poison damage",
		description : desc([
			"1\xD7 per turn when a crea in 5 ft deals pierc./slash. damage to me they take poison damage",
			"If the damage is from a biting attack they take twice as much damage",
			"This upgrade can optionally change the color of my skin to any shade I choose"
		])
	}, {
		name : "Unnatural Health",
		source : [["KCCC", 46]],
		description : desc([
			"My hit point maximum increases by an amount equal to my inventor level",
			"When I roll a 1 or 2 on a Hit Die to recover HP I can reroll it and take the new result"
		]),
		calcChanges : {
			hp : function (totalHD) {
				if (classes.known.inventor) return [classes.known.inventor.level, 'Unnatural Health (inventor level)'];
			}
		}
	}, {
		KCCClevel : 5,
		prereqKCCC : {
			featuresOr : ["perfection of creation"],
		},
		listname : "Corrosive Critter?! (prereq: Perfection of Creation)",
		name : "Corrosive Critter?!",
		source : [["KCCC", 46]],
		description : desc([
			"My adorable critter's natural weapon deals an extra 1d6 acid damage"
		]),
		calcChanges : {
			companionCallback : [
				function(prefix, oCrea, bAdd, sCompType) {
					if (sCompType !== "adorable_critter") return;
					for (var i = 1; i <= 3; i++) {
						var baseFld = prefix + "Comp.Use.Attack." + i;
						var weaDescrFld = baseFld + ".Description";
						var strWeaDescr = What(weaDescrFld);
						if (bAdd && What(baseFld + ".Weapon Selection") && !(/(,|;)? ?\+1d6 acid damage/i).test(strWeaDescr)) {
							AddString(weaDescrFld, "+1d6 acid damage", "; ");
						} else if (!bAdd) {
							Value(weaDescrFld, strWeaDescr.replace(/(,|;)? ?\+1d6 acid damage/i, ''));
						}
					}
				},
				"My adorable critter familiar deals an extra 1d6 acid damage",
				900
			]
		}
	}, {
		KCCClevel : 5,
		name : "Life Merchant",
		source : [["KCCC", 46]],
		description : desc([
			"I learn the spell Invest Life, and can cast it without expending a spell slot"
		]),
		usages : 1,
		recovery : "short rest",
		spellcastingBonus : [{
			name : "Life Merchant",
			spells : ["invest life"],
			selection : ["invest life"],
			firstCol : "oncesr"
		}]
	}, {
		KCCClevel : 5,
		prereqKCCC : {
			featuresOr : ["perfection of mind"],
		},
		listname : "Pressure Points (prereq: Perfection of Mind)",
		name : "Pressure Points",
		source : [["KCCC", 46]],
		description : " [uses my spell save DC]" +desc([
			"As a bonus action, when I damage a creature with a melee weapon, they make a Con save",
			"On a fail, they are under the effects of the Slow spell until my next turn ends",
			"If they are hit again under this effect they become restrained until my next turn ends",
			"If they are hit again: restrained \u2192 stunned; stunned \u2192 paralyzed",
			"If the target passes the save or becomes paralyzed they are immune to this for 24 hours"
		]),
		action : [["bonus action", ""]]
	}, {
		KCCClevel : 5,
		prereqKCCC : {
			featuresOr : ["fleshcrafted mutation (extra arm)"],
		},
		listname : "Reflexive Twitch (prereq: Extra Arm)",
		name : "Reflexive Twitch",
		source : [["KCCC", 46]],
		description : desc([
			"When I take damage from a target within 5 ft I can use my reaction to attack them with my extra arm",
			"This attack doesn't add my Strength or Dexterity mod to the damage, unless it would be negative"
		]),
		action : [["reaction", ""]]
	}, {
		KCCClevel : 5,
		prereqKCCC : {
			featuresOr : ["field surgery"],
		},
		listname : "Safe Revival Technique (prereq: Field Surgery)",
		name : "Safe Revival Technique",
		source : [["KCCC", 46]],
		description : desc([
			"I can cast Revivify without expending a spell slot or material component",
			"The target gains a level of exhaustion and is frightened of me for 1 minute"
		]),
		spellcastingBonus : [{
			name : "Safe Revival Technique",
			spells : ["revivify"],
			selection : ["revivify"],
			firstCol : "atwill"
		}],
		spellChanges : {
			"revivify" : {
				components : "V,S",
				compMaterial : "",
				description : "Restores a creature's body that has died in the last min to life with 1 HP",
				changes : "I can cast Revivify without the material component. The target gains a level of exhaustion and is frightened of me for 1 minute."
			}
		}
	}, {
		KCCClevel : 9,
		name : "Devouring Maw",
		source : [["KCCC", 46]],
		description : desc([
			"I gain a mouth natural weapon; On a hit I can use a bonus action to attempt to grapple",
			"If grappled, they take 1d4 piercing + 1d4 acid damage at the start of their next turn",
			"It has advantage to attack creatures grappled by it, but can't attack others while grappling",
			"If I have the Fleshcrafted Enhancement I can apply any benefit from it to this Maw"
		]),
		weaponOptions : {
			regExpSearch : /^(?=.*devouring)(?=.*maw).*$/i,
			name : "Devouring Maw",
			source : [["KCCC", 46]],
			ability : 1,
			type : "Natural",
			damage : [1, 10, "piercing"],
			range : "Melee",
			description : "Hit: Bonus action grapple target, 1d4 piercing, 1d4 acid damage at start of their next turn",
			tooltip : "Special: When I hit with this weapon, as a bonus action, I can attempt to grapple the target. Targets grappled by this maw take 1d4 piercing and 1d4 acid damage at the start of their turn. Attacks with this maw are made with advantage against targets it is grappling, but it can't be used to attack other creatures while grappling a creature.",
			special : true,
			abilitytodamage : true
		},
		weaponsAdd : ["Devouring Maw"],
		action : [["bonus action", " Grapple (After hit)"]]
	}, {
		KCCClevel : 9,
		listname : "Extreme Mutation (prereq: Mutating Mastery)",
		prereqKCCC : {
			featuresOr : ["mutating mastery"],
		},
		name : "Extreme Mutation",
		source : [["KCCC", 46]],
		description : desc([
			"I learn the spell Polymorph, and can cast it on myself without expending a spell slot"
		]),
		usages : 1,
		recovery : "long rest",
		spellcastingBonus : [{
			name : "Extreme Mutation",
			spells : ["polymorph"],
			selection : ["polymorph"],
			firstCol : "oncelr"
		}],
		spellChanges : {
			"polymorph" : {
				range : "Self",
				description : "I transform into beast of choice of same CR as my level or lower; see book",
				save : "",
				changes : "I can only target myself with the Polymorph spell I learn from Extreme Mutation."
			}
		}
	}, {
		KCCClevel : 9,
		listname : "Life Void (prereq: Life Merchant)",
		prereqKCCC : {
			featuresOr : ["life merchant"]
		},
		name : "Life Void",
		source : [["KCCC", 46]],
		description : desc([
			"After casting Invest Life, the first time I damage a living creature within 1 min",
			"I deal an extra 3d8 necrotic damage, and regain HP equal to the necrotic damage dealt"
		])
	}, {
		KCCClevel : 9,
		listname : "Massive Hulk (prereq: Massive Mutation)",
		prereqKCCC : {
			featuresOr : ["massive mutation"]
		},
		name : "Massive Hulk",
		source : [["KCCC", 47]],
		description : desc([
			"I no longer have a limit to how long I can stay in my Massive Mutation Large form"
		])
	}, {
		KCCClevel : 11,
		listname : "...Adorable Critter? (prereq: Perfection of Creation)",
		prereqKCCC : {
			featuresOr : ["perfection of creation"],
		},
		name : "...Adorable Critter?",
		source : [["KCCC", 47]],
		description : desc([
			"As an action my critter becomes Small, Medium, or Large; It can revert as a bonus action",
			"While Medium or larger, its natural weapon deals 1d12 + my Int mod piercing damage",
			"Its Strength score increases by 4 for each size category larger it becomes (max 18)"
		]),
		calcChanges : {
			companionCallback : [
				function (prefix, oCrea, bAdd, sCompType) {
					if (sCompType !== "adorable_critter") return;
					var strFea = "\u25C6 ...Adorable Critter? (KCCC 47): As an action the familiar can become Small, Medium, or Large. It can revert to normal size as a bonus action. While Medium or larger, its natural weapon deals 1d12 + my Int mod piercing damage. Its Strength score increases by 4 for each size category larger it becomes, to a maximum of 18.";
					var aFnc = bAdd ? AddString : RemoveString;
					aFnc(prefix + "Comp.Use.Features", strFea, true);
				},
				"My adorable critter familiar can change its size. When it becomes larger its natural weapon deals more damage and its Strength increases."
			]
		}
	}, {
		KCCClevel : 11,
		name : "Dark Miracle",
		source : [["KCCC", 47]],
		description : desc([
			"When I use an action to restore HP to others, I can expend up to 4d4 of my own HP",
			"The amount of healing they recieve is increased by the amount of HP I expend",
			"When they recieve extra healing this way, they gain advantage on their next attack or save"
		])
	}, {
		KCCClevel : 11,
		listname : "Unrelenting Predator (prereq: Fleshcrafted Enhancement)",
		prereqKCCC : {
			featuresOr : [
				"fleshcrafted enhancement (vampiric) (prereq: extra fangs)",
				"fleshcrafted enhancement (infernal) (prereq: extra fangs or extra claws)",
				"fleshcrafted enhancement (venomous) (prereq: extra Fangs or extra claws)",
				"fleshcrafted enhancement (razor) (prereq: extra fangs or extra claws)",
				"fleshcrafted enhancement (relentless) (prereq: extra arm or extra tentacle)"
			]
		},
		name : "Unrelenting Predator",
		source : [["KCCC", 47]],
		description : desc([
			"My Fleshcrafted Enhancement's Empowered effect no longer requires a spell slot",
			"It can still only be done once per turn"
		])
	}, {
		KCCClevel : 11,
		listname : "Vivisection (prereq: Perfection of Mind)",
		prereqKCCC : {
			featuresOr : ["perfection of mind"]
		},
		name : "Vivisection",
		source : [["KCCC", 47]],
		description : desc([
			"When I attack a create using Dissection, I can try to kill them instead of dealing damage",
			"If the creature's HP is lower than my Intelligence (Medicine) check, they die",
			"If I kill them this way, I gain advantage on Medicine checks to harvest them"
		])
	}, {
		KCCClevel : 11,
		name : "Wings Seem Useful",
		source : [["KCCC", 47]],
		description : desc([
			"I gain a flying speed equal to my walking speed while not wearing heavy armor"
		]),
		speed : { fly : { spd : "walk", enc : "walk" }}
	}, {
		KCCClevel : 15,
		name : "Adaptive Response",
		source : [["KCCC", 47]],
		description : desc([
			"As a reaction, after failing a Con save against one of the following conditions:",
			"Blinded, deafened, paralyzed, poisoned, or infected by a disease",
			"I can end the effect, even if I would not be able to take reactions due to the effect"
		]),
		usages : 1,
		recovery : "short rest"
	}, {
		KCCClevel : 15,
		listname : "Best Eyes (prereq: Better Eyes)",
		prereqKCCC : {
			featuresOr : ["better eyes (blindsight)", "better eyes (darkvision)", "better eyes (long sight)", "better eyes (perception)"]
		},
		name : "Best Eyes",
		source : [["KCCC", 47]],
		description : " [Truesight (30 ft)]",
		vision : [["Truesight", 30]],
	}, {
		KCCClevel : 15,
		name : "Flesh Shaper",
		source : [["KCCC", 47]],
		description : desc([
			"I learn the spell Clone, and can cast it without expending a spell slot"
		]),
		usages : 1,
		recovery : "long rest",
		spellcastingBonus : [{
			name : "Flesh Shaper",
			spells : ["clone"],
			selection : ["clone"],
			firstCol : "oncelr"
		}]
	}, {
		KCCClevel : 15,
		listname : "Uncanny Strength (prereq: Strength 18 or higher)",
		prereqeval : function(v) { return Number(What('Str')) > 17 && KCCCglobal.fn.prereqeval(v); },
		name : "Uncanny Strength",
		source : [["KCCC", 47]],
		description : desc([
			"I upgrade an arm; This arm can hold a two-handed weapon in one hand"
		])
	}, {
		KCCClevel : 15,
		listname : "Uncanny Strength, 2nd (prereq: Uncanny Strength)",
		prereqKCCC : {
			featuresOr : ["uncanny strength (prereq: strength 18 or higher)"]
		},
		name : "Uncanny Strength, 2nd",
		source : [["KCCC", 47]],
		description : desc([
			"I upgrade another arm; This arm can hold a two-handed weapon in one hand"
		])
	}, {
		KCCClevel : 15,
		name : "Undying Fortitude",
		source : [["KCCC", 47]],
		description : desc([
			"When I drop to 0 hit points, I make a Con save (DC equal to the excess damage taken)",
			"On a success, I drop to 1 hit point instead, and I remain concious"
		])
	}
]
// Fleshsmith Adorable Critter
CompanionList.adorable_critter = {
	name : "Adorable Critter",
	nameTooltip : "Adorable Critter (Fleshsmith feature)",
	nameOrigin : "variant of the Find Familiar 1st-level conjuration [ritual] spell",
	nameMenu : "Adorable Critter (Fleshsmith feature)",
	source : [["KCCC", 43]],
	includeCheck : function(sCrea, objCrea, iCreaCR) {
		return objCrea.size == 5 && iCreaCR == 0 ? true : false;
	},
	attributesChange : function(sCrea, objCrea) {
		// can't do any attacks
		objCrea.attacks = [];
		objCrea.type = "Construct";
		objCrea.subtype = "";
	},
	attributesAdd : CompanionList.familiar.attributesAdd,
	notes : function() {
		var a = newObj(CompanionList.familiar.notes);
		a[0].description = [
			"appearing in an unoccupied space within 10 ft",
			"It assumes any Tiny CR 0 form, see the spell and feature",
			"It has the chosen form's statistics, but its type changes to construct",
			"When the familiar drops to 0 hit points, it falls unconcious",
			"At the start of its turn, if it is unconcious, it regains its full hit points",
			"It can regain HP this way a number of times equal to my Int mod per short rest",
			"It can only die if destroyed; It resusitates when I cast this spell again"
		].join("\n   ");
		return a;
	}()
};
}

{// Cursesmith subclass DONE
var KCCC_cursesmith = AddSubClass("inventor", "cursesmith", {
	regExpSearch : /^(?=.*(curse|hex|dark))(?=.*smith).*$/i,
	subname : "Cursesmith",
	fullname : "Cursesmith",
	source : [["KCCC", 48]],
	toolProfs : [["Artisan's tools", 1]],
	languageProfs : [["Infernal, Abyssal, Deepspeech, or Primordial", 1]],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"subclassfeature1" : {
			name : "Forbidden Artifact",
			source : [["KCCC", 14]],
			minlevel : 1,
			description : ' [use "Choose Feature" for artifact properties]' + desc([
				"I have advantage on any check to determine the nature of a curse",
				"Over the course of a day I can create my forbidden artifact from a weapon",
				"I'm proficient in its use; It gains two properties when I perform this rite",
				"I can select additional properties as upgrades, up to my Proficiency Bonus at a time",
				"As a bonus action it can deal +1d6 necrotic damage, I am affected by the Bane spell",
				"As an action I can end this effect with a successful DC 10 Charisma save",
				"If I finish a long rest under this effect the number of Hit Dice I regain is halved"
			]),
			action : [["action", "Soul Investiture (end)"], ["bonus action", "Soul Investiture (start)"]],
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (v.theWea.forbiddenWeapon || (/\bforbidden\b/i).test(v.WeaponTextName)) {
							v.forbiddenWeapon = true;
						}
					}, "",
					90
				],
				atkAdd : [
					function (fields, v) {
						if (v.forbiddenWeapon || v.theWea.forbiddenWeapon || (/\bforbidden\b/i).test(v.WeaponTextName)) {
							v.forbiddenWeapon = true;
							fields.Proficiency = true;
						}
					},
					"If I include the word 'Forbidden' in a weapon's name, it gets treated as my Forbidden Artifact weapon.",
					90
				]
			},
			extraname : "Forbidden Artifact Properties",
			extrachoices : [
				"Empowered Artifact", "Abhorrent Life", "Grasping Form", "Twisting Reach", "Necrotic Rot", "Eldritch Eruption, Cold", "Eldritch Eruption, Fire", "Eldritch Eruption, Lightning", "Eldritch Eruption, Necrotic"
			],
			extraTimes : [2],
			"empowered artifact" : {
				name : "Empowered Artifact",
				prereqKCCC : {
					featuresFilter : [
						["abhorrent life", "eldritch eruption, cold", "eldritch eruption, fire", "eldritch eruption, lightning", "eldritch eruption, necrotic", "empowered artifact", "grasping form", "necrotic rot", "twisting reach"],
						function (a) {return a >= Number(How("Proficiency Bonus"))}
					]
				},
				source : [["KCCC", 48]],
				description : desc([
					"When I roll damage for my forbidden artifact I can reroll one damage die"
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.forbiddenWeapon) fields.Description += (fields.Description ? '; ' : '') + 'Reroll a damage die';
						},
						"When I roll damage for my Forbidden Artifact I can reroll one damage die."
					]
				}
			},
			"abhorrent life" : {
				name : "Abhorrent Life",
				prereqKCCC : {
					featuresFilter : [
						["abhorrent life", "eldritch eruption, cold", "eldritch eruption, fire", "eldritch eruption, lightning", "eldritch eruption, necrotic", "empowered artifact", "grasping form", "necrotic rot", "twisting reach"],
						function (a) {return a >= Number(How("Proficiency Bonus"))}
					]
				},
				source : [["KCCC", 48]],
				description : desc([
					"I can use my Int mod for attack \u0026 damage rolls of my artifact instead of Str or Dex"
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.forbiddenWeapon && (fields.Mod === 1 || fields.Mod === 2) && What('Int Mod') > What(AbilityScores.abbreviations[fields.Mod - 1] + ' Mod')) { // MPMB: edited to adhere to the v13.1.9 changes
								fields.Mod = 4;
							}
						},
						"My Forbidden Artifact uses my Intelligence modifier instead of Strength or Dexterity, if my Intelligence modifier is higher than the ability it would otherwise use."
					]
				}
			},
			"grasping form" : {
				name : "Grasping Form",
				prereqKCCC : {
					featuresFilter : [
						["abhorrent life", "eldritch eruption, cold", "eldritch eruption, fire", "eldritch eruption, lightning", "eldritch eruption, necrotic", "empowered artifact", "grasping form", "necrotic rot", "twisting reach"],
						function (a) {return a >= Number(How("Proficiency Bonus"))}
					]
				},
				source : [["KCCC", 48]],
				description : desc([
					"When I hit with my artifact I can attempt to grapple them as a bonus action",
					"If I have the Abhorrent Life property I can make an Int (Athletics) check for this",
					"I can't attack other creatures while grappling a creature with this weapon"
				]),
				action : [["bonus action", " (After hit)"]],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.forbiddenWeapon) fields.Description += (fields.Description ? '; ' : '') + 'Hit: Bonus action grapple';
						},
						"When I hit with an attack with my Forbidden Artifact I can attempt to grapple the target as a bonus action. If I have the Abhorrent Life property I can grapple with an Intelligence (Athletics) check. I can't attack other creatures while grappling a creature with this weapon"
					]
				}
			},
			"twisting reach" : {
				name : "Twisting Reach",
				prereqKCCC : {
					featuresFilter : [
						["abhorrent life", "eldritch eruption, cold", "eldritch eruption, fire", "eldritch eruption, lightning", "eldritch eruption, necrotic", "empowered artifact", "grasping form", "necrotic rot", "twisting reach"],
						function (a) {return a >= Number(How("Proficiency Bonus"))}
					]
				},
				source : [["KCCC", 48]],
				description : desc([
					"If my forbidden artifact is a melee weapon, its range increases by 5 feet"
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.forbiddenWeapon && v.isMeleeWeapon) {
								fields.Description += (fields.Description ? '; ' : '') + '+5 ft range';
							}
						},
						"If my Forbidden Artifact is a melee weapon, its range increases by 5 feet"
					]
				}
			},
			"necrotic rot" : {
				name : "Necrotic Rot",
				prereqKCCC : {
					featuresFilter : [
						["abhorrent life", "eldritch eruption, cold", "eldritch eruption, fire", "eldritch eruption, lightning", "eldritch eruption, necrotic", "empowered artifact", "grasping form", "necrotic rot", "twisting reach"],
						function (a) {return a >= Number(How("Proficiency Bonus"))}
					]
				},
				source : [["KCCC", 48]],
				additional : ProficiencyBonusList.map(function(n) { return "max " + n +  " stacks"; }),
				description : desc([
					"Each time I hit a creature with my artifact I inflict a stack of rot",
					"At the end of their turn they take 1d4 necrotic damage per stack of rot",
					"Then they make a Con save vs my spell save DC, on a success all stacks are removed"
				])
			},
			"eldritch eruption, cold" : {
				name : "Eldritch Eruption, Cold",
				prereqKCCC : {
					featuresFilter : [
						["abhorrent life", "eldritch eruption, cold", "eldritch eruption, fire", "eldritch eruption, lightning", "eldritch eruption, necrotic", "empowered artifact", "grasping form", "necrotic rot", "twisting reach"],
						function (a) {return a >= Number(How("Proficiency Bonus"))}
					],
					featuresNot : ["eldritch eruption, fire", "eldritch eruption, lightning", "eldritch eruption, necrotic"]
				},
				source : [["KCCC", 48]],
				description : desc([
					"When I attack with my artifact I can make a ranged spell attack instead",
					"It deals cold damage equal to the weapon's damage dice + my Intelligence Modifier"
				])
			},
			"eldritch eruption, fire" : {
				name : "Eldritch Eruption, Fire",
				prereqKCCC : {
					featuresFilter : [
						["abhorrent life", "eldritch eruption, cold", "eldritch eruption, fire", "eldritch eruption, lightning", "eldritch eruption, necrotic", "empowered artifact", "grasping form", "necrotic rot", "twisting reach"],
						function (a) {return a >= Number(How("Proficiency Bonus"))}
					],
					featuresNot : ["eldritch eruption, cold", "eldritch eruption, lightning", "eldritch eruption, necrotic"]
				},
				source : [["KCCC", 48]],
				description : desc([
					"When I attack with my artifact I can make a ranged spell attack instead",
					"It deals fire damage equal to the weapon's damage dice + my Intelligence Modifier"
				])
			},
			"eldritch eruption, lightning" : {
				name : "Eldritch Eruption, Lightning",
				prereqKCCC : {
					featuresFilter : [
						["abhorrent life", "eldritch eruption, cold", "eldritch eruption, fire", "eldritch eruption, lightning", "eldritch eruption, necrotic", "empowered artifact", "grasping form", "necrotic rot", "twisting reach"],
						function (a) {return a >= Number(How("Proficiency Bonus"))}
					],
					featuresNot : ["eldritch eruption, cold", "eldritch eruption, fire", "eldritch eruption, necrotic"]
				},
				source : [["KCCC", 48]],
				description : desc([
					"When I attack with my artifact I can make a ranged spell attack instead",
					"It deals lightning damage equal to the weapon's damage dice + my Intelligence Modifier"
				])
			},
			"eldritch eruption, necrotic" : {
				name : "Eldritch Eruption, Necrotic",
				prereqKCCC : {
					featuresFilter : [
						["abhorrent life", "eldritch eruption, cold", "eldritch eruption, fire", "eldritch eruption, lightning", "eldritch eruption, necrotic", "empowered artifact", "grasping form", "necrotic rot", "twisting reach"],
						function (a) {return a >= Number(How("Proficiency Bonus"))}
					],
					featuresNot : ["eldritch eruption, cold", "eldritch eruption, fire", "eldritch eruption, lightning"]
				},
				source : [["KCCC", 48]],
				description : desc([
					"When I attack with my artifact I can make a ranged spell attack instead",
					"It deals necrotic damage equal to the weapon's damage dice + my Intelligence Modifier"
				])
			}
		},
		"subclassfeature3" : {}, // Will be filled out by the KCCC_inventorSubclass_subclassfeature3 function
		"subclassfeature3.1" : {
			name : "Cursed Path",
			source : [["KCCC", 49]],
			minlevel : 3,
			description : " [use the \"Choose Feature\" button]" + desc([
				"I select a path that reflects my cursed affinity",
				"This grants me extra features and I learn spells related to the path"
			]),
			choices : [
				"Curse Bearer", "Curse Bringer", "Curse Eater"
			],
			"curse bearer" : {
				name : "Curse Bearer",
				description : desc([
					"I can suppress a curse from one of my upgrades, if ongoing until my next turn",
					"Additionally, once per round I can ignore the effects of Bane for one roll"
				]),
				limfeaname : "Suppress Curse",
				usages : "Proficiency bonus per ",
				usagescalc : "event.value = How('Proficiency Bonus');",
				recovery : "long rest",
				spellcastingBonus : [{
					name : "Curse Bearer",
					spells : ["protection from evil and good", "warding bond", "protection from energy", "death ward", "dispel evil and good"],
					selection : ["protection from evil and good", "warding bond", "protection from energy", "death ward", "dispel evil and good"],
					times : levels.map(function (n) {
						return (n < 3 ? 0 : n < 5 ? 1 : n < 9 ? 2 : n < 13 ? 3 : n < 17 ? 4 : 5);
					})
				}]
			},
			"curse bringer" : {
				name : "Curse Bringer",
				description : desc([
					"As a reaction, when I suffer a curse from one of my upgrades I can curse another",
					"A creature within 30 ft makes a Cha save vs spell save DC or suffers that curse as well",
					"Additionally, if I hit a creature after rolling a 3+ on the d4 from Bane they suffer Bane",
					"This lasts until my next turn ends, unless I hit them again to extend it by 1 round"
				]),
				limfeaname : "Afflict Curse",
				usages : "Proficiency bonus per ",
				usagescalc : "event.value = How('Proficiency Bonus');",
				recovery : "long rest",
				spellcastingBonus : [{
					name : "Curse Bringer",
					spells : ["bane", "disorient", "bestow curse", "phantasmal killer", "killing curse"],
					selection : ["bane", "disorient", "bestow curse", "phantasmal killer", "killing curse"],
					times : levels.map(function (n) {
						return (n < 3 ? 0 : n < 5 ? 1 : n < 9 ? 2 : n < 13 ? 3 : n < 17 ? 4 : 5);
					})
				}]
			},
			"curse eater" : {
				name : "Curse Eater",
				description : desc([
					"I can absorb any item I create from this subclass, gaining its effect and curse",
					"On my turn, I gain temp HP equal to 1 + # of cursed items I've consumed",
					"I don't gain this temp HP if incapacitated; If I am under Bane it is 1d4 + the # of items",
					"I can instead regain hit points from this feature a number of times per LR",
					"I lose my Forbidden Artifact \u0026 gain a melee natural weapon that counts as it",
					"Select bludgeoning, piercing, or slashing for its damage type"
				]),
				limfeaname : "Sustaining Curse (regain HP)",
				usages : "Proficiency bonus per ",
				usagescalc : "event.value = How('Proficiency Bonus');",
				recovery : "long rest",
				weaponsAdd : ["Forbidden Natural Weapon"],
				weaponOptions : {
					regExpSearch : /^(?=.*forbidden)(((?=.*natural)(?=.*weapon))|(?=.*claws)|(?=.*fangs)|(?=.*bite)|(?=.*tendrils)).*$/i,
					name : "Forbidden Natural Weapon",
					source : [["KCCC", 49]],
					ability : 1,
					type : "Natural",
					damage : [1, 8, "bludgeoning"],
					range : "Melee",
					abilitytodamage : true,
					description : "+1d4 necrotic damage",
					forbiddenWeapon : true
				},
				spellcastingBonus : [{
					name : "Curse Eater",
					spells : ["inflict wounds", "darkness", "mutate", "ichorous blood", "devouring darkness"],
					selection : ["inflict wounds", "darkness", "mutate", "ichorous blood", "devouring darkness"],
					times : levels.map(function (n) {
						return (n < 3 ? 0 : n < 5 ? 1 : n < 9 ? 2 : n < 13 ? 3 : n < 17 ? 4 : 5);
					})
				}]
			}
		},
		"subclassfeature3.2" : {
			name : "Damned Affinity",
			source : [["KCCC", 49]],
			minlevel : 3,
			description : desc([
				"Attuning to cursed magic items from this subclass does not use attunement slots"
			])
		},
		"subclassfeature14" : {
			name : "Unlimited Power",
			source : [["KCCC", 50]],
			minlevel : 14,
			description : desc([
				"When I empower my Forbidden Artifact I can choose to double the bonus damage",
				"I take 1 necrotic damage for each turn it has been active at the end of my turns",
				"This damage ignores immunity and cannot be resisted in any way"
			])
		}
	}
});
// Cursesmith upgrades
KCCCglobal.upgrades.cursesmith = [
	ClassSubList[KCCC_cursesmith].features["subclassfeature1"]["abhorrent life"],
	ClassSubList[KCCC_cursesmith].features["subclassfeature1"]["eldritch eruption, cold"],
	ClassSubList[KCCC_cursesmith].features["subclassfeature1"]["eldritch eruption, fire"],
	ClassSubList[KCCC_cursesmith].features["subclassfeature1"]["eldritch eruption, lightning"],
	ClassSubList[KCCC_cursesmith].features["subclassfeature1"]["eldritch eruption, necrotic"],
	ClassSubList[KCCC_cursesmith].features["subclassfeature1"]["empowered artifact"],
	ClassSubList[KCCC_cursesmith].features["subclassfeature1"]["grasping form"],
	ClassSubList[KCCC_cursesmith].features["subclassfeature1"]["necrotic rot"],
	ClassSubList[KCCC_cursesmith].features["subclassfeature1"]["twisting reach"],
	{
		listname : "Abhorrent Split (prereq: Forbidden Artifact damage die d8 or higher)",
		name : "Abhorrent Split",
		source : [["KCCC", 50]],
		description : desc([
			"When I use Soul Investiture, or as bonus action, I can split my artifact into branches",
			"This lasts until I end the Soul Investiture or I end the effect as an action",
			"The weapon's damage dice convert to smaller increments:",
			"   1d12/2d6 \u2192 3d4; 1d10 \u2192 1d6+1d4; 1d8 \u2192 2d4",
			"It can attack others while using Grasping Form, but loses a die per creature grappled"
		]),
		action : [["bonus action", " (start)"], ["action", " (end)"]]
	}, { // This Upgrade changes depending on the level it is taken
		name : "Blood Rites, 1st level",
		prereqKCCC : {
			featuresNot : ["blood rites, 2nd level", "blood rites, 3rd level", "blood rites, 4th level (prereq: level 13 inventor)", "blood rites, 5th level (prereq: level 17 inventor)"]
		},
		source : [["KCCC", 50]],
		description : desc([
			"I learn three 1st level ritual spells from the wizard spell list",
			"I need 1d4 slashing damage worth of blood to cast one of these spells as a ritual"
		]),
		spellcastingBonus : [{
			name : "Blood Rites, 1st level",
			"class" : "wizard",
			level : [1, 1],
			ritual : true,
			times : 3,
			firstCol : "(R)",
		}]
	}, {
		KCCClevel : 5,
		name : "Blood Rites, 2nd level",
		prereqKCCC : {
			featuresNot : ["blood rites, 1st level", "blood rites, 3rd level", "blood rites, 4th level (prereq: level 13 inventor)", "blood rites, 5th level (prereq: level 17 inventor)"]
		},
		source : [["KCCC", 50]],
		description : desc([
			"I learn three 1st-2nd level ritual spells from the wizard spell list",
			"I need 1d4 slashing damage worth of blood to cast one of these spells as a ritual"
		]),
		spellcastingBonus : [{
			name : "Blood Rites, 2nd level",
			"class" : "wizard",
			level : [1, 2],
			ritual : true,
			times : 3,
			firstCol : "(R)",
		}]
	}, {
		KCCClevel : 9,
		name : "Blood Rites, 3rd level",
		prereqKCCC : {
			featuresNot : ["blood rites, 1st level", "blood rites, 2nd level", "blood rites, 4th level (prereq: level 13 inventor)", "blood rites, 5th level (prereq: level 17 inventor)"]
		},
		source : [["KCCC", 50]],
		description : desc([
			"I learn three 1st-3rd level ritual spells from the wizard spell list",
			"I need 1d4 slashing damage worth of blood to cast one of these spells as a ritual"
		]),
		spellcastingBonus : [{
			name : "Blood Rites, 3rd level",
			"class" : "wizard",
			level : [1, 3],
			ritual : true,
			times : 3,
			firstCol : "(R)",
		}]
	}, {
		KCCClevel : 11,
		listname : "Blood Rites, 4th level (prereq: level 13 inventor)",
		prereqKCCC : {
			featuresNot : ["blood rites, 1st level", "blood rites, 2nd level", "blood rites, 3rd level", "blood rites, 5th level (prereq: level 17 inventor)"]
		},
		prereqeval : function(v) { return classes.known.inventor.level >= 13 && KCCCglobal.fn.prereqeval(v); },
		name : "Blood Rites, 4th level",
		source : [["KCCC", 50]],
		description : desc([
			"I learn three 1st-4th level ritual spells from the wizard spell list",
			"I need 1d4 slashing damage worth of blood to cast one of these spells as a ritual"
		]),
		spellcastingBonus : [{
			name : "Blood Rites, 4th level",
			"class" : "wizard",
			level : [1, 4],
			ritual : true,
			times : 3,
			firstCol : "(R)",
		}]
	}, {
		KCCClevel : 15,
		listname : "Blood Rites, 5th level (prereq: level 17 inventor)",
		prereqKCCC : {
			featuresNot : ["blood rites, 1st level", "blood rites, 2nd level", "blood rites, 3rd level", "blood rites, 4th level (prereq: level 13 inventor)"]
		},
		prereqeval : function(v) { return classes.known.inventor.level >= 17 && KCCCglobal.fn.prereqeval(v); },
		name : "Blood Rites, 5th level",
		source : [["KCCC", 50]],
		description : desc([
			"I learn three 1st-5th level ritual spells from the wizard spell list",
			"I need 1d4 slashing damage worth of blood to cast one of these spells as a ritual"
		]),
		spellcastingBonus : [{
			name : "Blood Rites, 5th level",
			"class" : "wizard",
			level : [1, 5],
			ritual : true,
			times : 3,
			firstCol : "(R)",
		}]
	}, {
		name : "Cursing Rod (Rotting Curse)",
		prereqKCCC : {
			featuresNot : ["cursing rod (binding curse)", "cursing rod (befuddling curse)"]
		},
		source : [["KCCC", 50]],
		description : desc([
			"I can cast Rotting Curse without expending a spell slot"
		]),
		usages : 1,
		recovery : "short rest",
		eval : function() {
			var sItemName = "Cursing Rod";
			var spellcastingBonus = [{
				name : sItemName,
				spells : ["rotting curse"],
				selection : ["rotting curse"],
				firstCol : "oncesr"
			}];
			KCCCglobal.fn.magicItemSpells(true, sItemName, spellcastingBonus);
		},
		removeeval : function() {
			var sItemName = "Cursing Rod";
			var spellcastingBonus = true;
			KCCCglobal.fn.magicItemSpells(false, sItemName, spellcastingBonus);
		}
	}, {
		name : "Cursing Rod (Binding Curse)",
		prereqKCCC : {
			featuresNot : ["cursing rod (rotting curse", "cursing rod (befuddling curse)"]
		},
		source : [["KCCC", 50]],
		description : desc([
			"I can cast Binding Curse without expending a spell slot"
		]),
		usages : 1,
		recovery : "short rest",
		eval : function() {
			var sItemName = "Cursing Rod";
			var spellcastingBonus = [{
				name : sItemName,
				spells : ["binding curse"],
				selection : ["binding curse"],
				firstCol : "oncesr"
			}];
			KCCCglobal.fn.magicItemSpells(true, sItemName, spellcastingBonus);
		},
		removeeval : function() {
			var sItemName = "Cursing Rod";
			var spellcastingBonus = true;
			KCCCglobal.fn.magicItemSpells(false, sItemName, spellcastingBonus);
		}
	}, {
		name : "Cursing Rod (Befuddling Curse)",
		prereqKCCC : {
			featuresNot : ["cursing rod (rotting curse", "cursing rod (binding curse)"]
		},
		source : [["KCCC", 50]],
		description : desc([
			"I can cast Befuddling Curse without expending a spell slot"
		]),
		usages : 1,
		recovery : "short rest",
		eval : function() {
			var sItemName = "Cursing Rod";
			var spellcastingBonus = [{
				name : sItemName,
				spells : ["befuddling curse"],
				selection : ["befuddling curse"],
				firstCol : "oncesr"
			}];
			KCCCglobal.fn.magicItemSpells(true, sItemName, spellcastingBonus);
		},
		removeeval : function() {
			var sItemName = "Cursing Rod";
			var spellcastingBonus = true;
			KCCCglobal.fn.magicItemSpells(false, sItemName, spellcastingBonus);
		}
	}, {
		name : "Dark Magic",
		source : [["KCCC", 50]],
		description : desc([
			"I can cast Crippling Agony (or Blindness/Deafness level 5+) without expending a spell slot",
			"I also learn dark magic spells, which do not count against the number of spells I can know"
		]),
		usages : 1,
		recovery : "long rest",
		spellcastingBonus : [{
			name : "Dark Magic",
			spells : ["crippling agony", "blindness/deafness"],
			selection : ["crippling agony", "blindness/deafness"],
			times : levels.map( function (n) {
				return n < 5 ? 1 : 2
			}),
			firstCol : "oncelr"
		}, {
			name : "Dark Magic",
			spells : ["rain of spiders", "blight", "contagion"],
			selection : ["rain of spiders", "blight", "contagion"],
			times : levels.map( function (n) {
				return n < 9 ? 0 : n < 13 ? 1 : n < 17 ? 2 : 3
			})
		}]
	}, {
		name : "Form of the Fiend",
		source : [["KCCC", 50]],
		description : "[SC ability mod + Prof Bonus rnds]" + desc([
			"As an action, I can expend a spell slot to transform into a fiend; Spell slot level determines the form",
			"   1st\u2192 Imp; 2nd\u2192 CR 2 Devil; 3rd\u2192 Bearded Devil; 4th\u2192 CR 4 Devil; 5th\u2192 CR 5 Devil",
			" \u2022 I gain all its game statistics except Intelligence, Wisdom, or Charisma",
			" \u2022 This replaces any of my game statistics except alignment and personality",
			" \u2022 I do not gain spells, legendary actions, or legendary resistances",
			" \u2022 I assume the fiends's HP and HD; I get mine back when I revert back",
			" \u2022 My equipment merges with the new form and cannot be used until I revert back",
			" \u2022 I must Concentrate on this transformation as though concentrating on a spell",
			" \u2022 I revert if out of time or unconcious; if KOd by damage excess damage carries over",
			"Use the Wild Shapes page for statistics (manually type in the name of the devil)"
		]),
		action : [["action", ""]]
	}, {
		listname : "Helm of Invulnerability (incomp: other helms)",
		prereqKCCC : {
			featuresNot : ["helm of madness (incomp: other helms)", "helm of omniscience (incomp: other helms)"]
		},
		name : "Helm of Invulnerability",
		source : [["KCCC", 51]],
		description : " [Attunement, Cursed, 1\xD7 per SR]" + desc([
			"As a reaction to taking bludgeoning, piercing, or slashing damage I can become immune",
			"This includes the triggering damage and lasts until my next turn",
			"Curse: I take unpreventable necrotic damage equal to half the damage I would have taken",
		]),
		action : [["reaction", "Curse of Invulnerability"]],
		extraLimitedFeatures : [{
			// This is a work around to have the feature on the third page say [Attunement, Cursed, 1× per SR], but have the limfename be just "Helm of Invulnerability"
			name : "Helm of Invulnerability",
			usages : 1,
			recovery : "short rest"
		}]
	}, {
		listname : "Helm of Madness (incomp: other helms)",
		prereqKCCC : {
			featuresNot : ["helm of invulnerability (incomp: other helms)", "helm of omniscience (incomp: other helms)"]
		},
		name : "Helm of Madness",
		source : [["KCCC", 51]],
		description : " [Attunement, Cursed, 1\xD7 per short rest]" + desc([
			"As a bonus action I can move up to my speed and make a single weapon attack",
			"Curse: My AC and saving throws are reduced by 5 until my next turn"
		]),
		action : [["bonus action", "Curse of Madness"]],
		extraLimitedFeatures : [{
			name : "Helm of Madness",
			usages : 1,
			recovery : "short rest"
		}]
	}, {
		listname : "Helm of Omniscience (incomp: other helms)",
		prereqKCCC : {
			featuresNot : ["helm of invulnerability (incomp: other helms)", "helm of madness (incomp: other helms)"]
		},
		name : "Helm of Omniscience",
		source : [["KCCC", 51]],
		description : " [Attunement, Cursed, 1\xD7 per SR]" + desc([
			"As a bonus action I gain the effect of the spell Foresight until my next turn",
			"Curse: I take 1d6 damage when I make a roll benefitting from this effect"
		]),
		action : [["bonus action", "Curse of Omniscience"]],
		extraLimitedFeatures : [{
			name : "Helm of Omniscience",
			usages : 1,
			recovery : "short rest"
		}]
	}, {
		name : "Ring of Dark Investment",
		source : [["KCCC", 51]],
		description : desc([
			"As an action I can cast a spell with a casting time of 1 action into the ring",
			"When I take the Attack action, I can replace an attack with a spell stored this way",
			"As an action I can release the stored spell as though I cast it normally",
			"The spell fades if I remove the ring or at the end of a long rest",
			"Curse: My current and max HP is reduced by 1 + the level of the spell stored"
		]),
		action : [["action", "Dark Investment (store/release spell)"]]
	}, {
		name : "Ring of Gilded Lies",
		source : [["KCCC", 51]],
		additional : "Attunement, Cursed",
		description : desc([
			"I gain the effects of Guidance on my Charisma (Deception or Performance) checks",
			"Curse: I subtract a d4 from my Charisma (Persuasion) checks"
		])
	}, {
		name : "Shadowed Shades",
		source : [["KCCC", 51]],
		description : desc([
			"I make spectacles that let me see in magical and nonmagical darkness out to 120 ft",
			"Curse: I treat all light as dim light for the purposes of vision while wearing them"
		])
	}, {
		name : "Vampiric Infusion",
		source : [["KCCC", 51]],
		description : desc([
			"As a bonus action, I can expend a spell slot to infuse a weapon I touch for 1 minute",
			"The weapon deals +1d8 necrotic damage, the wielder regains that much + my Int mod HP",
			"It can deal this bonus damage a number of times equal to the spell slot expended"
		])
	}, {
		name : "Whispers of the Night",
		source : [["KCCC", 51]],
		description : desc([
			"I can cast Terrifying Visions without expending a spell slot",
			"I also gain the ability to cast Guidance and Message, but in a haunting or creepy voice"
		]),
		usages : 1,
		recovery : "short rest",
		spellcastingBonus : [{
			name : "Whispers of the Night",
			spells : ["guidance", "message"],
			selection : ["guidance", "message"],
			times : 2,
			firstCol : "atwill"
		}, {
			name : "Whispers of the Night",
			spells : ["terrifying visions"],
			selection : ["terrifying visions"],
			firstCol : "oncesr"
		}]
	}, {
		KCCClevel : 5,
		listname : "Eldritch Magic, Cold (prereq: Eldritch Eruption, Cold)",
		prereqKCCC : {
			featuresOr : ["eldritch eruption, cold"]
		},
		name : "Eldritch Magic, Cold", // RAW only Ray of Frost
		source : [["KCCC", 51]],
		description : desc([
			"Select a cantrip with an attack roll that deals cold damage from the wizard spell list",
			"Once per turn, I can apply the secondary effect of that cantrip to my weapon's attack",
			"For example, choosing Ray of Frost would reduce their speed by 10 ft until my next turn"
		])
		// Should probably add this spellcasting as a separate header since it can't be cast?
		// MPMB: as the only RAW options you already covered in the description, I don't really see what adding the cantrip to the spell sheet would add. I think it is good as is, don't touch it anymore ;)
	}, {
		KCCClevel : 5,
		listname : "Eldritch Magic, Fire (prereq: Eldritch Eruption, Fire)",
		prereqKCCC : {
			featuresOr : ["eldritch eruption, fire"]
		},
		name : "Eldritch Magic, Fire", // RAW only Fire Bolt
		source : [["KCCC", 51]],
		description : desc([
			"Select a cantrip with an attack roll that deals fire damage from the wizard spell list",
			"Once per turn, I can apply the secondary effect of that cantrip to my weapon's attack",
			"For example, choosing Fire Bolt would light unattended objects on fire"
		])
	}, {
		KCCClevel : 5,
		listname : "Eldritch Magic, Lightning (prereq: Eldritch Eruption, Lightning)",
		prereqKCCC : {
			featuresOr : ["eldritch eruption, lightning"]
		},
		name : "Eldritch Magic, Lightning", // RAW only Shocking Grasp
		source : [["KCCC", 51]],
		description : desc([
			"Select a cantrip with an attack roll that deals lightning damage from the wizard spell list",
			"Once per turn, I can apply the secondary effect of that cantrip to my weapon's attack",
			"For example, Shocking Grasp would add adv. on 1 attack vs. armored foe, no reaction if hit"
		])
	}, {
		KCCClevel : 5,
		listname : "Eldritch Magic, Necrotic (prereq: Eldritch Eruption, Necrotic)",
		prereqKCCC : {
			featuresOr : ["eldritch eruption, necrotic"]
		},
		name : "Eldritch Magic, Necrotic", // RAW only Chill Touch
		source : [["KCCC", 51]],
		description : desc([
			"Select a cantrip with an attack roll that deals necrotic damage from the wizard spell list",
			"Once per turn, I can apply the secondary effect of that cantrip to my weapon's attack",
			"For example, choosing Chill Touch would prevent regaining HP until my next turn"
		])
	}, {
		KCCClevel : 5,
		listname : "Ghostgrasp Gloves (incomp: other gauntlets)",
		prereqKCCC : {
			featuresNot : ["skeletal gauntlets (incomp: other gauntlets)"]
		},
		name : "Ghostgrasp Gloves",
		source : [["KCCC", 51]],
		additional : "Attunement, Cursed",
		description : desc([
			"I can interact with objects with my hands with a range of 10 ft",
			"This includes opening doors, grappling, or attacking with light weapons",
			"Curse: I have disadvantage on grappling checks, the amount I can lift or drag is halved"
		])
	}, {
		KCCClevel : 5,
		name : "Mantle of the Beast",
		source : [["KCCC", 51]],
		additional : "Attunement, Cursed",
		description : desc([
			"I can dip this mantle in the blood of a beast slain within the past week",
			"If I do so I gain one trait of that beast for one hour while wearing the mantle",
			"Curse: While activated the languages I can speak are only what the beast could speak"
		])
	}, {
		KCCClevel : 5,
		listname : "Skeletal Gauntlets (incomp: other gauntlets)",
		prereqKCCC : {
			featuresNot : ["ghostgrasp gloves (incomp: other gauntlets)"]
		},
		name : "Skeletal Gauntlets",
		source : [["KCCC", 52]],
		description : desc([
			"I can cast Grip of the Dead; When I grapple a creature they suffer averse effects",
			"At the start of their turn they take 1d6 necrotic damage, can't regain HP for 1 round",
			"I have advantage against checks or saves that would disarm me",
			"Curse: I have disadvantage with throwing or ammunition weapons, or to throw items"
		]),
		spellcastingBonus : [{
			name : "Skeletal Gauntlets",
			spells : ["grip of the dead"],
			selection : ["grip of the dead"]
		}]
	}, {
		KCCClevel : 5,
		name : "Soul Ring",
		source : [["KCCC", 52]],
		description : " [uses my spell save DC]" + desc([
			"As an action I can enter the ring, it gains 1/10th of my weight and equipment weight",
			"I gain a blindsight of 5 ft and cannot take any actions that require a body",
			"While a creature wears the ring I share their senses, can communicate telepathically",
			"As an action I can exit the ring, appearing within 5 ft; Can attempt to possess ring wearer",
			"Cha save or they fall under the effect of Dominate Monster and I am absorbed into the ring",
			"Additionally, I have advantage on death saves while wearing this ring"
		]),
		action : [["action", " (enter/dominate/exit)"]]
	}, {
		KCCClevel : 5,
		name : "Vicious Effigy",
		source : [["KCCC", 52]],
		description : desc([
			"I can cast Cruel Puppetry without expending a spell slot"
		]),
		usages : 1,
		recovery : "long rest",
		eval : function() {
			var sItemName = "Vicious Effigy";
			var spellcastingBonus = [{
				name : sItemName,
				spells : ["cruel puppetry"],
				selection : ["cruel puppetry"],
				firstCol : "oncelr"
			}];
			KCCCglobal.fn.magicItemSpells(true, sItemName, spellcastingBonus);
		},
		removeeval : function() {
			var sItemName = "Vicious Effigy";
			var spellcastingBonus = true;
			KCCCglobal.fn.magicItemSpells(false, sItemName, spellcastingBonus);
		}
	}, {
		KCCClevel : 9,
		name : "Amulet of Exiling",
		source : [["KCCC", 52]],
		description : desc([
			"I can cast Banishment or Blink without expending a spell slot"
		]),
		usages : 1,
		recovery : "long rest",
		eval : function() {
			var sItemName = "Amulet of Exiling";
			var spellcastingBonus = [{
				name : sItemName,
				spells : ["banishment", "blink"],
				selection : ["banishment", "blink"],
				times : 2,
				firstCol : "oncelr"
			}];
			KCCCglobal.fn.magicItemSpells(true, sItemName, spellcastingBonus);
		},
		removeeval : function() {
			var sItemName = "Amulet of Exiling";
			var spellcastingBonus = true;
			KCCCglobal.fn.magicItemSpells(false, sItemName, spellcastingBonus);
		}
	}, {
		KCCClevel : 9,
		listname : "Aspect of the Damned (Aberrant Life) (prereq: curse eater, must pick another Aspect)",
		prereqKCCC : {
			featuresOr : ["curse eater"],
			featuresFilter : [
				["aspect of the damned (creature of darkness) (prereq: curse eater, must pick another aspect)", "aspect of the damned (hungering soul) (prereq: curse eater, must pick another aspect)", "aspect of the damned (physical mutation) (prereq: curse eater, must pick another aspect)", "aspect of the damned (unlife) (prereq: curse eater, must pick another aspect)"],
				function (a) {return a >= 2}
			]
		},
		name : "Aspect of the Damned (Aberrant Life)", 
		source : [["KCCC", 52]],
		description : desc([
			"My creature type changes from humanoid to Aberration"
		])
	}, {
		KCCClevel : 9,
		listname : "Aspect of the Damned (Creature of Darkness) (prereq: curse eater, must pick another Aspect)",
		prereqKCCC : {
			featuresOr : ["curse eater"],
			featuresFilter : [
				["aspect of the damned (aberrant life) (prereq: curse eater, must pick another aspect)", "aspect of the damned (hungering soul) (prereq: curse eater, must pick another aspect)", "aspect of the damned (physical mutation) (prereq: curse eater, must pick another aspect)", "aspect of the damned (unlife) (prereq: curse eater, must pick another aspect)"],
				function (a) {return a >= 2}
			]
		},
		name : "Aspect of the Damned (Creature of Darkness)",
		source : [["KCCC", 52]],
		description : desc([
			"I can see in magical and nonmagical darkness out to 120 ft"
		]),
		vision : [["Devil's sight", 120]] // MPMB: although this isn't technically "Devil's Sight", I've used this name as a way of referring to this ability for all my code, since Devil's Sight is the first of its kind
	}, {
		KCCClevel : 9,
		listname : "Aspect of the Damned (Hungering Soul) (prereq: curse eater, must pick another Aspect)",
		prereqKCCC : {
			featuresOr : ["curse eater"],
			featuresFilter : [
				["aspect of the damned (aberrant life) (prereq: curse eater, must pick another aspect)", "aspect of the damned (creature of darkness) (prereq: curse eater, must pick another aspect)", "aspect of the damned (physical mutation) (prereq: curse eater, must pick another aspect)", "aspect of the damned (unlife) (prereq: curse eater, must pick another aspect)"],
				function (a) {return a >= 2}
			]
		},
		name : "Aspect of the Damned (Hungering Soul)",
		source : [["KCCC", 52]],
		description : desc([
			"Once on my turn while grappling or grappled I can deal 1d8 necrotic damage to them",
			"Any healing they receive until your next turn is reduced by half"
		]) 
		// Asked whether "this turn" was intentional on the Discord, did not get a response
		// RAW it says "this turn", but I can't think of a single enemy who is able to heal on a player's turn (except maybe spellcasting with legendary actions), so I've decided it must be a typo and should be "round", and have worded it as such
	}, {
		KCCClevel : 9,
		listname : "Aspect of the Damned (Physical Mutation) (prereq: curse eater, must pick another Aspect)",
		prereqKCCC : {
			featuresOr : ["curse eater"],
			featuresFilter : [
				["aspect of the damned (aberrant life) (prereq: curse eater, must pick another aspect)", "aspect of the damned (creature of darkness) (prereq: curse eater, must pick another aspect)", "aspect of the damned (hungering soul) (prereq: curse eater, must pick another aspect)", "aspect of the damned (unlife) (prereq: curse eater, must pick another aspect)"],
				function (a) {return a >= 2}
			]
		},
		name : "Aspect of the Damned (Physical Mutation)",
		source : [["KCCC", 52]],
		description : desc([
			"I choose an unrestricted Fleshsmith upgrade that affects my body"
		]),
		eval : function() {
			// Array of Fleshsmith upgrades as written, with a loose interpretation of what upgrades affect the body
			var upgradeOptions = [
				"fleshcrafted mutation (extra arm)", 
				"fleshcrafted mutation (extra claws)", 
				"fleshcrafted mutation (extra fangs)", 
				"fleshcrafted mutation (extra tentacle)",
				"acid gland", 
				"better eyes (blindsight)", 
				"better eyes (darkvision)", 
				"better eyes (long sight)", 
				"better eyes (perception)",
				"brimstone bladder",
				"extra eyes",
				"massive mutation",
				"mutating mastery",
				"secondary life organs",
				"subdermal plating",
				"toxicity"
			];
			// Filter out the ones already taken
			KCCCglobal.fn.set_aKnown();
			upgradeOptions = upgradeOptions.filter(n => KCCCglobal.aKnown.indexOf(n) === -1);
			// Make them more human readable
			upgradeOptions = upgradeOptions.map(n => n.capitalize());
			// Ask the user which one to add
			var selectedUpgrade = AskUserOptions('Aspect of the Damned (Physical Mutation)', 'The Aspect of the Damned (Physical Mutation) upgrade offers a choice of an unrestricted Fleshsmith upgrade that affects the body.', upgradeOptions, 'radio', true, 'You can change what you select here by removing the Aspect of the Damned (Physical Mutation) upgrade and then seleting it again.');
			// Make it lowercase again
			selectedUpgrade = selectedUpgrade.toLowerCase();
			// Process its addition
			ClassFeatureOptions(
				[
					"inventor",				// 0 class
					"subclassfeature3", 	// 1 feature
					selectedUpgrade,		// 2 choice
					true,					// 3 true = extrachoices, false = choices
					undefined,				// 4 "add" or "remove"
					true,					// 5 true = bonus choice, false = normal choice
					"inventor-fleshsmith",	// 6 subclass (if 5 = true)
				],
				"add",						// "add" or "remove" (overrides 4 above)
				"Physical Mutation"			// how the upgrade's source feature will be named
			);
			// Store it
			CurrentVars["Aspect of the Damned (Physical Mutation)"] = selectedUpgrade;
			SetStringifieds("vars");
		},
		removeeval : function() {
			var selectedUpgrade = CurrentVars["Aspect of the Damned (Physical Mutation)"];
			if (!selectedUpgrade) return;
			// Process its removal
			ClassFeatureOptions(
				[
					"inventor",				// 0 class
					"subclassfeature3", 	// 1 feature
					selectedUpgrade,		// 2 choice
					true,					// 3 true = extrachoices, false = choices
					undefined,				// 4 "add" or "remove"
					true,					// 5 true = bonus choice, false = normal choice
					"inventor-fleshsmith",	// 6 subclass (if 5 = true)
				],
				"remove",					// "add" or "remove" (overrides 4 above)
				"Physical Mutation"			// how the upgrade's source feature will be named
			);
			// Remove it being stored
			delete CurrentVars["Aspect of the Damned (Physical Mutation)"];
			SetStringifieds("vars");
		}
	}, {
		KCCClevel : 9,
		listname : "Aspect of the Damned (Unlife) (prereq: curse eater, must pick another Aspect)",
		prereqKCCC : {
			featuresOr : ["curse eater"],
			featuresFilter : [
				["aspect of the damned (aberrant life) (prereq: curse eater, must pick another aspect)", "aspect of the damned (creature of darkness) (prereq: curse eater, must pick another aspect)", "aspect of the damned (hungering soul) (prereq: curse eater, must pick another aspect)", "aspect of the damned (physical mutation) (prereq: curse eater, must pick another aspect)"],
				function (a) {return a >= 2}
			]
		},
		name : "Aspect of the Damned (Unlife)",
		source : [["KCCC", 52]],
		description : desc([
			"I gain resistance to necrotic damage, and I no longer need to consume food"
		]),
		dmgres : ["Necrotic"]
	}, {
		KCCClevel : 9,
		name : "Ring of Nightmares",
		source : [["KCCC", 52]],
		description : " [Attunement, Cursed, 1\xD7 per long rest]" + desc([
			"As an action I can invoke a nightmare, which casts a spell without expending a spell slot",
			"Curse: I can't pick the spell, instead I roll a d4 to decide which spell is cast",
			"1: Blindness/Deafness, 2: Rain of Spiders, 3: Phantasmal Killer, 4: Evard's Black Tentacles"
		]),
		extraLimitedFeatures : [{ 
			name : "Ring of Nightmares",
			usages : 1,
			recovery : "long rest"
		}],
		eval : function() {
			var sItemName = "Ring of Nightmares";
			var spellcastingBonus = [{
				name : "Ring of Nightmares [1]",
				spells : ["blindness/deafness"],
				selection : ["blindness/deafness"],
				firstCol : 1
			}, {
				name : "Ring of Nightmares [2]",
				spells : ["rain of spiders"],
				selection : ["rain of spiders"],
				firstCol : 2
			}, {
				name : "Ring of Nightmares [3]",
				spells : ["phantasmal killer"],
				selection : ["phantasmal killer"],
				firstCol : 3
			}, {
				name : "Ring of Nightmares [4]",
				spells : ["evard's black tentacles"],
				selection : ["evard's black tentacles"],
				firstCol : 4
			}];
			KCCCglobal.fn.magicItemSpells(true, sItemName, spellcastingBonus);
		},
		removeeval : function() {
			var sItemName = "Ring of Nightmares";
			var spellcastingBonus = true;
			KCCCglobal.fn.magicItemSpells(false, sItemName, spellcastingBonus);
		}
	}, {
		KCCClevel : 9,
		name : "Shadow Vessel",
		source : [["KCCC", 52]],
		description : desc([
			"I can cast Summon Horror without expending a spell slot",
			"I can choose to expend a spell slot, casting it at one level higher than the slot used"
		]),
		usages : 1,
		recovery : "long rest",
		eval : function() {
			var sItemName = "Shadow Vessel";
			var spellcastingBonus = [{
				name : sItemName,
				spells : ["summon horror"],
				selection : ["summon horror"],
				firstCol : 'oncelr'
			}];
			KCCCglobal.fn.magicItemSpells(true, sItemName, spellcastingBonus);
		},
		removeeval : function() {
			var sItemName = "Shadow Vessel";
			var spellcastingBonus = true;
			KCCCglobal.fn.magicItemSpells(false, sItemName, spellcastingBonus);
		}
	}, {
		KCCClevel : 9,
		name : "Spell-Eating Ring",
		source : [["KCCC", 52]],
		description : desc([
			"I can use the ring to cast Counterspell or Dispel Magic with a range of 15 ft",
			"When I cancel a spell this way, I regain 1d4 hit points per level of the spell",
			"If the spell has a duration and affects a creature I can instead transfer it to myself",
			"If it requires Concentration it instead lasts a number of rounds equal to my Int mod",
			"This cannot exceed the spells normal duration"
		]),
		// Worded poorly, asked for clarification on the Discord whether it should be "turns" or "rounds", did not get a response
		// RAW it says turns, but that makes no sense in the context of 5e, so I'm assuming it is a typo
		usages : 1,
		recovery : "long rest",
		eval : function() {
			var sItemName = "Spell-Eating Ring";
			var spellcastingBonus = [{
				name : sItemName,
				spells : ["counterspell", "dispel magic"],
				selection : ["counterspell", "dispel magic"],
				firstCol : "oncelr",
				times : 2
			}];
			var spellChanges = {
				"counterspell" : {
					range : "15 ft",
					changes : "Using Spell-Eating Ring I can cast Counterspell to consume or transfer a spell within 15 ft."
				},
				"dispel magic" : {
					range : "15 ft",
					changes : "Using Spell-Eating Ring I can cast Dispel Magic to consume or transfer a spell within 15 ft."
				}
			};
			KCCCglobal.fn.magicItemSpells(true, sItemName, spellcastingBonus, spellChanges);
		},
		removeeval : function() {
			var sItemName = "Spell-Eating Ring";
			var spellcastingBonus = true;
			var spellChanges = {
				"counterspell" : {
					range : "15 ft",
					changes : "Using Spell-Eating Ring I can cast Counterspell to consume or transfer a spell within 15 ft."
				},
				"dispel magic" : {
					range : "15 ft",
					changes : "Using Spell-Eating Ring I can cast Dispel Magic to consume or transfer a spell within 15 ft."
				}
			};
			KCCCglobal.fn.magicItemSpells(false, sItemName, spellcastingBonus, spellChanges);
		}
	}, {
		KCCClevel : 11,
		listname : "Blood Cloak (incomp: other cloaks)",
		prereqKCCC : {
			featuresNot : ["ghost cloak (incomp: other cloaks)"]
		},
		name : "Blood Cloak",
		source : [["KCCC", 52]],
		additional : "Attunement, Cursed",
		description : desc([
			"When I take slashing or piercing damage while below half my max HP I gain temp HP",
			"I gain temp HP equal to half the damage taken, after taking the damage",
			"If I hit a creature while I have temp HP I can expend them to add them to my damage",
			"Curse: If I regain HP it is reduced by the temp HP (min 1) and I lose the temp HP"
		])
	}, {
		KCCClevel : 11,
		name : "Consuming Power",
		source : [["KCCC", 53]],
		additional : "Attunement, Cursed",
		description : desc([
			"I create a worn magical item that takes the article of my choice",
			"As a bonus action I can decrease my Charisma score by up to my Prof bonus",
			"My Str increases by that amount, up to its normal max, until I use an action to revert it",
			"When I kill a creature CR \u00BC or higher my current and maximum Strength increases by 1",
			"This Strength increase reverts if I have not killed a creature in the past minute",
			"Curse: At the end of each turn my Strength is increased, I suffer necrotic damage",
			"This damage is equal to 1 + the additional Strength I have gained, and can't be resisted"
		]),
		action : [["bonus action", " (start)"], ["action", " (end)"]]
	}, {
		KCCClevel : 11,
		listname : "Ghost Cloak (incomp: other cloaks)",
		prereqKCCC : {
			featuresNot : ["blood cloak (incomp: other cloaks)"]
		},
		name : "Ghost Cloak",
		source : [["KCCC", 53]],
		description : " [Attunement, Cursed, 1\xD7 per short rest]" + desc([
			"At the start of my turn I can go to the ethereal plane, can move freely through creatures",
			"Move through objects up to 5 ft thick as diff. terrain; If I end my turn in occupied space",
			"I am moved to the nearest available space, I take 1d10 force damage per 5 ft moved",
			"Curse: After leaving the Ethereal plane I am affected until my next turn",
			"I deal \u00BD damage and I resist non-magical bludgeoning, piercing, and slashing damage"
		]),
		extraLimitedFeatures : [{ 
			name : "Ghost Cloak",
			usages : 1,
			recovery : "short rest"
		}]
	}, {
		KCCClevel : 11,
		name : "Weapon Apotheosis",
		source : [["KCCC", 53]],
		description : desc([
			"When I use Soul Investiture my weapon deals an extra 1d6 necrotic damage"
		])
	}, {
		KCCClevel : 15,
		listname : "Curse Numbness (prereq: Curse Bearer)",
		prereqKCCC : {
			featuresOr : ["curse bearer"]
		},
		name : "Curse Numbness",
		source : [["KCCC", 53]],
		description : desc([
			"I become immune to Bane, Bestow Curse, and Hex, even when self-inflicted"
		])
	}, {
		KCCClevel : 15,
		name : "Exude Darkness",
		source : [["KCCC", 53]],
		description : desc([
			"When I cast a spell of 1st level or higher I become heavily obscured by flames",
			"These flames last for a number of rounds equal to the level of spell",
			"While shrouded, any creature within 5 ft that hits me takes 2d8 necrotic damage"
		])
	}, {
		KCCClevel : 15,
		listname : "Pandemic of Despair (prereq: Curse Bringer)",
		prereqKCCC : {
			featuresOr : ["curse bringer"]
		},
		name : "Pandemic of Despair",
		source : [["KCCC", 53]],
		description : desc([
			"If another creature becomes affected by my Bane I can spread the effect",
			"I force a creature within 5 ft of them to make a Charisma saving throw",
			"On a failure they are under the effect of the same Bane",
			"I can repeat this any number of times, except on myself"
		])
	}, {
		KCCClevel : 15,
		name : "True Artifact",
		source : [["KCCC", 53]],
		description : desc([ 
			"My forbidden artifact gains a magical bonus of +3 if it did not already have it",
			"I gain two additional properties from the following list while attuned to it:",
			" \u2022 I am immune to disease",
			" \u2022 I can't be charmed or frightened",
			" \u2022 I can cast a selected 1st or 2nd spell without expending a spell slot",
			" \u2022 I can treat a death save of 1 as a 20",
			" \u2022 One of my ability scores increases by 1 to a maximum of 24",
			"When I select this upgrade I select a condition in which my weapon can be destroyed",
			"It can be absurb, but cannot be impossible, it can no longer be destroyed by other means"
		]),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.forbiddenWeapon) output.magic = Math.max(v.thisWeapon[1], 3);
				}
			]
		}
	}, {
		KCCClevel : 15,
		listname : "Undying Creature (prereq: Curse Eater)",
		prereqKCCC : {
			featuresOr : ["curse eater"]
		},
		name : "Undying Creature",
		source : [["KCCC", 53]],
		description : desc([
			"I gain twice the temp HP or regain twice the HP from Curse Eater",
			"I gain temporary hit points from Curse Eater even when incapacitated"
		])
	}
]
/* "Form of the Fiend" upgrade
	The devils this would include (needs the "Devil" subtype):
	- Imp (already available, but needs abilities to fit on wild shape page)
	- Spined Devil (CR 2 devil)
	- Bearded Devil
	- Merregon (CR 4 devil)
	- Barbed Devil (CR 5 devil, there are no other official ones)

	Making their abilities fit in the limited wild shape space is the challenge.
	Also, the sheet won't list the devils as options on the wild shape page,
	but typing one in manually will give the desired result.
*/
CreatureList["imp"].wildshapeString = "Darkvision 120 ft; Devil's Sight| Knows Infernal and Common| Resistant to: cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered| Immune to: fire, poison, poisoned| Action to turn invisible until attack, or concentration ends| Action to turn into a form of a rat (speed 20 ft), a raven (20 ft, fly 60 ft), or a spider (20 ft, climb 20 ft), or normal| Advantage on saves against spells and magical effects"

CreatureList["spined devil"] = {
	name : "Spined Devil",
	source : [["M", 78]],
	size : 4,
	type : "Fiend",
	subtype : "devil",
	alignment : "Lawful Evil",
	ac : 13,
	hp : 22,
	hd : [5, 6],
	speed : "20 ft, fly 40 ft",
	scores : [10, 15, 12, 11, 14, 8],
	saves : ["", "", "", "", "", ""],
	damage_resistances : "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silver weapons",
	damage_immunities : "fire, poison",
	condition_immunities : "poisoned",
	senses : "Darkvision 120 ft; Devil's Sight (Magical darkness doesn't impede the devil's darkvision)",
	passivePerception : 12,
	languages : "Infernal, telepathy 120 ft",
	challengeRating : "2",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [{
		name : "Bite",
		ability : 1,
		damage : [2, 4, "slashing"],
		range : "Melee (5 ft)",
		description : "One bite and one fork attack as Attack action"
	}, {
		name : "Tail Spine (12\xD7 per long rest)",
		ability : 2,
		damage : [1, 4, "piercing"],
		range : "20/80 ft",
		description : "Target also takes 1d6 fire damage; Two tail spine attacks as Attack action"
	}, {
		name : "Fork",
		ability : 1,
		damage : [1, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "One fork and one bite attack as Attack action"
	}],
	traits : [{
		name : "Flyby",
		description : "The devil doesn't provoke opportunity attacks when it flies out of an enemy's reach."
	}, {
		name : "Limited Spines",
		description : "The devil has twelve tail spines. Used spines regrow by the time the devil finishes a long rest."
	}, {
		name : "Magic Resistance",
		description : "The devil has advantage on saving throws against spells and other magical effects."
	}],
	actions : [{
		name : "Multiattack",
		description : "The devil makes two attacks: one with its bite and one with its fork or two with its tail spines."
	}],
	wildshapeString : "Darkvision 120 ft; Devil's Sight| Knows Infernal, telepathy 120 ft| Resistant to: cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered| Immune to: fire, poison, poisoned| Flyby: Doesn't provoke opp atks when flying| Magic Resistance: Advantage on saves against spells and magical effects| Limited Spines: 12 tail spines, regrow during a LR| Multiattack: 1 Bite and 1 Fork or 2 Tail Spines"
};

CreatureList["bearded devil"] = {
	name : "Bearded Devil",
	source : [["SRD", 274], ["M", 70]],
	size : 3,
	type : "Fiend",
	subtype : "devil",
	alignment : "Lawful Evil",
	ac : 13,
	hp : 52,
	hd : [8, 8],
	speed : "30 ft",
	scores : [16, 15, 15, 9, 11, 11],
	saves : [5, "", 4, "", 2, ""],
	damage_resistances : "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silver weapons",
	damage_immunities : "fire, poison",
	condition_immunities : "poisoned",
	senses : "Darkvision 120 ft; Devil's Sight (Magical darkness doesn't impede the devil's darkvision)",
	passivePerception : 10,
	languages : "Infernal, telepathy 120 ft",
	challengeRating : "3",
	proficiencyBonus : 2,
	attacksAction : 2,
	attacks : [{
		name : "Beard",
		ability : 1,
		damage : [1, 8, "piercing"],
		range : "Melee (5 ft)",
		description : "DC 12 Con save or poisoned for 1 min, can't heal; Repeats save at end of its turns",
		tooltip : "The target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute. While poisoned in this way, the target can't regain hit points. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
	}, {
		name : "Glaive",
		ability : 1,
		damage : [1, 10, "slashing"],
		range : "Melee (10 ft)",
		description : "Heavy, reach, two-handed; DC 12 Con save or lose stacking d10 HP at start of turns; DC 12 Medicine or magic heal to end",
		tooltip : "If the target is a creature other than an undead or a construct, it must succeed on a DC 12 Constitution saving throw or lose 1d10 hit points at the start of each of its turns due to an infernal wound. Each time the devil hits the wounded target with this attack, the damage dealt by the wound increases by 1d10. Any creature can take an action to stanch the wound with a successful DC 12 Wisdom (Medicine) check. The wound also closes if the target receives magical healing."
	}],
	features : [{
		name : "Magic Resistance",
		description : "The devil has advantage on saving throws against spells and other magical effects."
	}, {
		name : "Steadfast",
		description : "The devil can't be frightened while it can see an allied creature within 30 ft of it."
	}],
	traits : [{
		name : "Beard",
		description : "When the devil hits a target with a beard attack, it must succeed on a DC 12 Constitution saving throw or be poisoned and can't regain hit points for 1 minute. The target can repeat the save at the end of each of its turns, ending the effect on a success."
	}, {
		name : "Glaive",
		description : "When the devil hits a creature other than an undead or a construct with a glaive attack, it must succeed on a DC 12 Constitution saving throw or lose 1d10 hit points at the start of each of its turns due to an infernal wound. Each time the devil hits the wounded target with this attack, the damage dealt by the wound increases by 1d10. Any creature can take an action to stanch the wound with a successful DC 12 Wisdom (Medicine) check. The wound also closes if the target receives magical healing."
	}],
	actions : [{
		name : "Multiattack",
		description : "The devil makes two attacks: one with its beard and one with its glaive."
	}],
	wildshapeString : "Darkvision 120 ft; Devil's Sight| Knows Infernal, telepathy 120 ft| Resistant to: cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered| Immune to: fire, poison, poisoned| Magic Resistance: Advantage on saves against spells and magical effects| Steadfast: Can't be frightened while it can see an allied creature within 30 ft| Multiattack: 1 Beard and 1 Glaive"
};

CreatureList["merregon"] = {
	name : "Merregon",
	source : [["MotM", 179]],
	size : 3,
	type : "Fiend",
	subtype : "devil",
	alignment : "Lawful Evil",
	ac : 16,
	hp : 45,
	hd : [6, 8],
	speed : "30 ft",
	scores : [18, 14, 17, 6, 12, 8],
	saves : ["", "", "", "", "", ""],
	damage_resistances : "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silver weapons",
	damage_immunities : "fire, poison",
	condition_immunities : "frightened, poisoned",
	senses : "Darkvision 60 ft; Devil's Sight (Magical darkness doesn't impede the devil's darkvision)",
	passivePerception : 11,
	languages : "Understands Infernal but can't speak, telepathy 120 ft",
	challengeRating : "4",
	proficiencyBonus : 2,
	attacksAction : 3,
	attacks : [{
		name : "Halberd",
		ability : 1,
		damage : [1, 10, "slashing"],
		range : "Melee (10 ft)",
		description : "Heavy, reach, two-handed, Three halberd attacks as Attack action"
	}, {
		name : "Heavy Crossbow",
		ability : 2,
		damage : [1, 10, "piercing"],
		range : "100/400 ft",
		description : "Ammunition, heavy, loading, two-handed"
	}],
	traits : [{
		name : "Magic Resistance",
		description : "The devil has advantage on saving throws against spells and other magical effects."
	}],
	actions : [{
		name : "Multiattack",
		description : "The merregon makes three Halberd attacks.",
	}, {
		name : "Loyal Bodyguard",
		description : "As a reaction, when another fiend within 5 ft of the merregon is hit by an attack roll, the merregon causes itself to be hit instead"
	}],
	wildshapeString : "Darkvision 60 ft; Devil's Sight| Understands Infernal, telepathy 120 ft| Resistant to: cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered| Immune to: fire, poison, frightened, poisoned| Magic Resistance: Advantage on saves against spells and magical effects| Loyal Bodyguard: Reaction to redirect attack against another fiend within 5 ft to itself| Multiattack: 3 Halberd attacks"
};

CreatureList["barbed devil"] = {
	name : "Barbed Devil",
	source : [["SRD", 274], ["M", 70]],
	size : 3,
	type : "Fiend",
	subtype : "devil",
	alignment : "Lawful Evil",
	ac : 15,
	hp : 110,
	hd : [13, 8],
	speed : "30 ft",
	scores : [16, 17, 18, 12, 14, 14],
	saves : [6, "", 7, "", 5, 5],
	skills : {
		"deception" : 5,
		"insight" : 5,
		"perception" : 8
	},
	damage_resistances : "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silver weapons",
	damage_immunities : "fire, poison",
	condition_immunities : "poisoned",
	senses : "Darkvision 120 ft; Devil's Sight (Magical darkness doesn't impede the devil's darkvision)",
	passivePerception : 18,
	languages : "Infernal, telepathy 120 ft",
	challengeRating : "5",
	proficiencyBonus : 3,
	attacksAction : 3,
	attacks : [{
		name : "Claw",
		ability : 1,
		damage : [1, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "Two claw and one tail attack as Attack action"
	}, {
		name : "Hurl Flame",
		ability : 6,
		damage : [3, 6, "fire"],
		range : "150 ft",
		abilitytodamage : false,
		description : "Unattended flammable objects catch fire; Two hurl flame attacks as Attack action"
	}, {
		name : "Tail",
		ability : 1,
		damage : [2, 6, "piercing"],
		range : "Melee (5 ft)",
		description : "One tail and two claw attacks as Attack action"
	}],
	traits : [{
		name : "Barbed Hide",
		description : "At the start of each of its turns, the barbed devil deals 1d10 piercing damage to any creature grappling it."
	}, {
		name : "Magic Resistance",
		description : "The devil has advantage on saving throws against spells and other magical effects."
	}],
	actions : [{
		name : "Multiattack",
		description : "The devil makes three melee attacks: one with its tail and two with its claws. Alternatively, it can use Hurl Flame twice."
	}],
	wildshapeString : "Darkvision 120 ft; Devil's Sight| Knows Infernal, telepathy 120 ft| Resistant to: cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered| Immune to: fire, poison, poisoned| Magic Resistance: Advantage on saves against spells and magical effects| Barbed Hide: Deals 1d10 piercing damage to any creature grappling it at the start of its turn| Multiattack: 1 Tail and 2 Claws or 2 Hurl Flame"
};
}

// First add the appropriate upgrades to the "Cross-Disciplinary Knowledge" feature,
// as new objects, so that they don't conflict with the auto-generated submenu's
var KCCC_createCrossDisciplinaryKnowledgeOptions = function() {
	var oCDK = ClassList.inventor.features['cross-disciplinary knowledge'];
	// any of the Gadgetsmith's Unrestricted Upgrades
	for (var u = 0; u < KCCCglobal.upgrades.gadgetsmith.length; u++) {
		var oUpgr = KCCCglobal.upgrades.gadgetsmith[u];
		if (oUpgr.KCCClevel) continue; // to only get the unrestricted
		var sUpgrName = oUpgr.listname ? oUpgr.listname : oUpgr.name;
		var sUpgrNameLC = sUpgrName.toLowerCase();
		oCDK.extrachoices.push(sUpgrName);
		oCDK[sUpgrNameLC] = newObj(oUpgr); // so that the submenu doesn't update
		oCDK[sUpgrNameLC].submenu = "Gadgetsmith's Unrestricted Upgrades";
		if (!oCDK[sUpgrNameLC].prereqeval) oCDK[sUpgrNameLC].prereqeval = KCCCglobal.fn.prereqeval;
	}
	// a Potionsmith's Alchemical Reagent Pouch and Alchemical Fire or Alchemical Acid
	var strPotionsmith_AlchemicalReagentsPouch = desc([
		"I have an Alchemical Reagents Pouch, which I can remake with 50 gp or a day of gathering",
		"This pouch functions as alchemical supplies for me, required for my potionsmith features"
	]);
	for (var u = 0; u < KCCCglobal.upgrades.potionsmith.length; u++) {
		var oUpgr = KCCCglobal.upgrades.potionsmith[u];
		if (!/^alchemical (fire|acid)$/i.test(oUpgr.name)) continue; // to only get Alchemical Fire or Alchemical Acid
		var sUpgrName = oUpgr.listname ? oUpgr.listname : oUpgr.name;
		var sUpgrNameLC = sUpgrName.toLowerCase();
		oCDK.extrachoices.push(sUpgrName);
		oCDK[sUpgrNameLC] = newObj(oUpgr); // so that the submenu doesn't update
		oCDK[sUpgrNameLC].description = strPotionsmith_AlchemicalReagentsPouch + oCDK[sUpgrNameLC].description;
		oCDK[sUpgrNameLC].submenu = "Potionsmith's Instant Reactions";
		if (!oCDK[sUpgrNameLC].prereqeval) oCDK[sUpgrNameLC].prereqeval = KCCCglobal.fn.prereqeval;
	}
	// Note that an Infusionsmith's Animated Weapon, Blasting Rod, and Infused Weapon,
	// and a Thundersmith's Stormforged Weapon are added directly to
	// "Cross-Disciplinary Knowledge", as they are not upgrades but class features
}();
// After all the subclasses and their upgrades are defined, we add them to their appropriate features
var KCCC_inventorSubclass_subclassfeature3 = function() {
	var aInvSubs = ClassList.inventor.subclasses[1];
	for (var i = 0; i < aInvSubs.length; i++) {
		if (!ClassSubList[aInvSubs[i]] || ClassSubList[aInvSubs[i]].features.description) continue;
		var sSub = aInvSubs[i].replace("inventor-", "");
		var oUpgrNo = KCCCglobal.fn.additional(sSub);
		var oFea = ClassSubList[aInvSubs[i]].features.subclassfeature3;
		oFea.name = ClassSubList[aInvSubs[i]].subname + "'s Upgrades";
		oFea.source = [["KCCC", 12]];
		oFea.minlevel = 3;
		oFea.description = oUpgrNo.description;
		oFea.extraname = ClassSubList[aInvSubs[i]].subname + " Upgrade";
		oFea.additional = oUpgrNo.additional;
		oFea.extraTimes = oUpgrNo.extraTimes;
		oFea.extrachoices = [];
		// create the list of upgrades, including the generic ones
		var aUpgrades = [].concat(KCCCglobal.upgrades.generic).concat(KCCCglobal.upgrades[sSub] ? KCCCglobal.upgrades[sSub] : []);
		// loop over the upgrades and add all to the subclassfeature3
		for (var u = 0; u < aUpgrades.length; u++) {
			var oUpgr = aUpgrades[u];
			if (!oUpgr) console.println(u);
			var sUpgrName = oUpgr.listname ? oUpgr.listname : oUpgr.name;
			var sUpgrNameLC = sUpgrName.toLowerCase();
			// Add default object attributes
			if (!oUpgr.prereqeval) oUpgr.prereqeval = KCCCglobal.fn.prereqeval;
			// Add the upgrade to the subclassfeature3
			oFea.extrachoices.push(sUpgrName);
			oFea[sUpgrNameLC] = oUpgr;
		}
	}
}();

} // INVENTOR CLASS END

{ // SPELLS START
// A majority of these spells were contributed by PoetOfGod
// Add new Psionic spell school
spellSchoolList["Psion"] = "Psionic";
// Add the spells in the order they appear in the document
SpellsList["acid rain"] = {
	name : "Acid Rain",
	classes : ["druid", "occultist", "wizard"],
	source : [["KCCC", 128]],
	level : 5,
	school : "Conj",
	time : "1 a",
	range : "300 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Dex",
	description : "40-ft rad 60-ft high all enter/start 6d4 acid dmg, covered: 3d4 dmg at end turn; save half, not covered",
	descriptionFull : "Acid rain begins falling within a 40-foot-radius, 60-foot-high cylinder centered on a point you choose within range. When a creature moves into the spell's area for the first time on a turn or starts its turn there, the creature must succeed on a Dexterity saving throw or take 6d4 acid damage, and become covered in acid. On a successful save, a creature takes half the initial damage and is not covered in acid."+
	"\n   A creature takes 3d4 acid damage if it ends its turn while covered with acid. The target or a creature within 5 feet of it can end this damage by using its action to clear away the acid."
};
SpellsList["aero barrage"] = {
	name : "Aero Barrage",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 128]],
	level : 4,
	school : "Trans",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "4+1/SL lances hit creature(s) on spell attack with each lance for 2d8 Force dmg and 10-ft push per lance",
	descriptionFull : "You create four lances of rapidly spinning condensed wind and hurl them at targets within range. You can hurl them at one target or several."+
	"\n   Make a ranged spell attack for each lance. On a hit, the target takes 2d8 slashing damage and is knocked 10 feet backwards."+
	AtHigherLevels + "When you cast this spell using a spell slot of 5th level or higher, you create one additional lance for each slot level above 4th."
};
SpellsList["aether lance"] = {
	name : "Aether Lance",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 128]],
	level : 3,
	school : "Evoc",
	time : "1 a",
	range : "S:30" + (typePF ? "-" : "") + "ft line",
	components : "V,S",
	duration : "Instantaneous",
	description : "30-ft long 5-ft wide all 8d4+1d4/SL Force dmg",
	descriptionFull : "You gather raw aether in your hand and expel it in a lance of power forming a line 30 foot long and 5 foot wide. Each creature in a line takes 8d4 force damage."+
	AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d4 for each slot level above 3rd."
};
SpellsList["aether storm"] = {
	name : "Aether Storm",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 128]],
	level : 5,
	school : "Evoc",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "10-ft rad, 40-ft high for 8d4 Force dmg, 1d4 Force per 5 ft move, end turn 8d4 Force; bns move 10 ft",
	descriptionFull : "You conjure a storm of aether erupting from a point of your choice within range. The aether storm fills a 10-foot-radius, 40-foot-high cylinder. When the storm appears, each creature within its area takes 8d4 force damage."+
	"\n   A creature takes 1d4 force damage for each 5 feet they move through the storm, and if a creature ends their turn within the aether storm, they take 8d4 force damage. On your turn, you can move the storm 10 feet in any direction as a bonus action."+
	AtHigherLevels + "When you cast this spell using a spell slot of 6th level or higher, the damage a creature takes from the storm appearing by ending their turn in it increases by 1d4 for each slot level above 5th"
};
SpellsList["alacrity"] = {
	name : "Alacrity",
	classes : ["bard", "occultist", "ranger", "sorcerer", "wizard"],
	source : [["KCCC", 128]],
	level : 2,
	school : "Trans",
	time : "1 bns",
	range : "Self",
	components : "V,S",
	duration : "1 rnd",
	description : "+2 AC, speed doubled, adv. Dex saves, extra action (1 attack, dash, disengage, hide) until start next turn",
	descriptionFull : "Until the start of your next turn, your speed is doubled, you gain a +2 bonus to AC, you have advantage on Dexterity saving throws, and you gain an additional action. That action can be used only to take the Attack (one weapon attack only), Dash, Disengage, Hide, or Use an Object action."+
	"\n   If you are under the effect of haste, you gain no benefit from this spell."
};
SpellsList["animate object"] = {
	name : "Animate Object",
	classes : ["bard", "inventor", "occultist", "sorcerer", "wizard"],
	source : [["KCCC", 128]],
	level : 2,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "A tiny nonmagical object not worn or carried; 1 bns command within 60 ft; see book",
	descriptionFull : "You bring a Tiny object to life. Its Constitution is 10 and its Intelligence and Wisdom are 3, and its Charisma is 1. Its speed is 30 feet; if the object lacks legs or other appendages it can use for locomotion, it instead has a flying speed of 30 feet and can hover. The object has the following stats: HP: 20, AC: 18, Str: 4, Dex: 18. The object has an attack modifier equal to your spell attack modifier. If the object is not a weapon, it deals 1d4 + your Spellcasting modifier damage on hit. Select from bludgeoning, piercing, or slashing damage based on the nature of the item. If the object is a weapon, it deals the weapon's damage dice + your Spellcasting modifier of the weapon's damage type. The spell can only animate one-handed weapons without the special modifier this way."+
	"\n   As a bonus action, you can mentally command the animated object as long as it is within 60 feet of you. You decide what action the creature will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the creature only defends itself against hostile creatures. Once given an order, the creature continues to follow it until its task is complete."+
	"\n   If the object is securely attached to a surface or a larger object, such as a chain bolted to a wall, its speed is 0. It has blindsight with a radius of 30 feet and is blind beyond that distance. When the animated object drops to 0 hit points, it reverts to its original object form, and any remaining damage carries over to its original object form."
};
SpellsList["arcane ablation"] = {
	name : "Arcane Ablation",
	classes : ["inventor"],
	source : [["KCCC", 129]],
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "1 h",
	description : "1 crea gains 4+1/SL temp HP; When temp HP are 0 at start of its turn, gain same temp HP-1, until 0",
	descriptionFull : "You touch a piece of worn armor or clothing and imbue it with magic. The creature wearing this imbued item gains 4 temporary hit points. When these temporary hit points are exhausted, at the start of the creature's next turn it will gain hit points equal to 1 hit point less than the previous amount gained from this spell (for example, from 4 to 3), until no temporary hit points would be gained and the spell ends. Temporary hit points from this spell are lost when this spell ends."+
	AtHigherLevels + "The initial temporary hit points increases by 1 for each slot level above 1st."
};
SpellsList["arcane infusion"] = {
	name : "Arcane Infusion",
	classes : ["inventor"],
	source : [["KCCC", 129]],
	level : 2,
	school : "Trans",
	time : "1 min",
	range : "Self",
	components : "V,S,M\u0192",
	compMaterial : "Spare parts that could form the upgrade selected worth at least 1 sp",
	duration : "1 h",
	description : "Gain effects of one unrestricted upgrade; SL3: lvl 5, SL4: lvl 9, SL5: lvl 11",
	descriptionFull : "You use arcane power to briefly bring to power or modify your inventions. For the duration, you gain the effects of one unrestricted upgrade. All normal prerequisite apply (including subclass and level requirements). The creation is magical, held together and formed of magic and spare parts, taking the form of the upgrade or empowering an existing upgrade with temporary new features. Casting this spell again ends the effects of any previous castings of this spell."+
	AtHigherLevels + "When you cast this spell with a 3rd-level spell slot or higher, you can infuse the effects of an upgrade that requires 5th level or higher. When you cast this spell using a spell slot of 4th level or higher, you can infuse the effects of an upgrade that requires 9th level or higher. When you cast this spell with a 5th-level spell slot or higher, you can infuse the effects of an upgrade that requires 11th level or higher."
};
SpellsList["arcane weapon"] = {
	name : "Arcane Weapon",
	classes : ["inventor"],
	source : [["KCCC", 129]],
	level : 1,
	school : "Trans",
	time : "1 bns",
	range : "Touch",
	components : "V,S",
	duration : "1 h",
	description : "1 weapon becomes magical, does Force dmg, ignores ammunition and loading; SL3: 8h, SL5: 24h",
	descriptionFull : "You touch a weapon and imbue it with magic. For the duration the weapon counts as a magical weapon and any damage dealt by it is Force damage. When casting this one a weapon with the ammunition property, it no longer consumes ammunition when fired, and doesn't need to be reloaded."+
	AtHigherLevels + "When you cast this spell using a spell slot of 3rd or 4th level, the duration becomes 8 hours. When you use a spell slot of 5th level or higher, the duration becomes 24 hours."
};
SpellsList["arctic breath"] = {
	name : "Arctic Breath",
	classes : ["druid", "sorcerer", "wizard"],
	source : [["KCCC", 129]],
	level : 1,
	school : "Conj",
	time : "1 a",
	range : "S:30" + (typePF ? "-" : "") + "ft line",
	components : "V,S",
	duration : "Instantaneous",
	save : "Dex",
	description : "30-ft long 5-ft wide all 2d8+1d8/SL Cold dmg, -10 ft speed till next turn ends; save half, no -speed",
	descriptionFull : "A line of freezing arctic wind 30 feet long and 5 feet wide blasts out from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. On a failed save, a creature takes 2d8 cold damage and their speed is reduced by 10 feet until the end of their next turn. On a successful save, a creature takes half as much damage and isn't slowed."+
	AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st."
};
SpellsList["awaken rope"] = {
	name : "Awaken Rope",
	classes : ["bard", "inventor", "occultist", "ranger", "wizard"],
	source : [["KCCC", 129]],
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S,M\u0192",
	compMaterial : "10 to 60 feet of cord or rope, worth at least 1 cp",
	duration : "Instantaneous",
	save : "D/S",
	description : "10-60 ft rope: Restrain crea in 20 ft (Dex save), Fasten, or Pull Small obj in length (Str save); SL2: see B",
	descriptionMetric : "3-18 m rope: Restrain crea in 6 m (Dex save), Fasten, or Pull Small obj in length (Str save); SL2: see B",
	descriptionFull : "As an action, you can touch a rope 10 to 60 feet long and issue a single command to it, selecting from the following options:"+
	"\n \u2022 " + toUni("Bind") + ". The rope attempts to bind a creature of your choice within 20 feet of you. The creature must make a Dexterity saving throw or become restrained until it is freed. A creature can use its action to make a DC 10 Strength check, freeing itself or another creature within its reach on a success. Dealing 5 slashing damage to the rope (AC 10) also frees the creature without harming it, ending the effect and destroying the rope."+
	"\n \u2022 " + toUni("Fasten") + ". The rope flies up 60 feet and ties one end to an object or surface that a rope could be tied to, before becoming inanimate again, hanging from the object."+
	"\n \u2022 " + toUni("Grab") + ". The rope lashes out grabs one Small or smaller object that is not being worn by a creature within a range equal to the length of the rope and pulls that object back to your hand. If that object is being carried by a creature, it must make a Strength saving throw. On success, it retains the object, and on failure the object is pulled from the creature."+
	AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, you can target a chain instead of a rope. It has the same available actions, but it has a DC 15, an AC of 15, and resistance to slashing damage when taking the Bind action. When cast with a spell slot of 3rd level or higher targeting a rope, that rope is magically imbued for 1 minute, gaining an DC of 15, an AC 20, and 20 hit points."
};
SpellsList["bad blood"] = {
	name : "Bad Blood",
	classes : ["druid", "occultist", "warlock", "wizard"],
	source : [["KCCC", 130]],
	level : 1,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A piece of rotten meat",
	duration : "Conc, 1 min",
	save : "Con",
	description : "1 creature with blood save or 1d12 poison dmg, poisoned; end of turn save or 1d4 poison dmg; save ends",
	descriptionFull : "Targeting a creature you can see within range, you attempt to corrupt its blood. Creatures without blood are immune to this effect. The target must make a Constitution saving throw. On failure, they take 1d12 poison damage and become poisoned for the duration."+
	"\n   At the end of each of its turns, the target can make another Constitution saving throw. On a success, the spell ends on the target, on failure; they take an extra 1d4 poison as the poison continues to ravage them."+
	AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional target for each slot level above 2nd. The targets must be within 30 feet of each other when you target them."
};
SpellsList["beam of annihilation"] = {
	name : "Beam of Annihilation",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 130]],
	level : 6,
	school : "Evoc",
	time : "1 c",
	range : "S:60" + (typePF ? "-" : "") + "ft line",
	components : "S",
	duration : "Conc, 3 r",
	save : "Dex",
	description : "8d8 cold/fire/force/light. start turn; save halves; start turn rotate 90, 4d8, save none; other a ends",
	descriptionFull : "You unleash a beam of pure energy, selecting cold, fire, force, or lightning energy when you cast this spell and blasting it outward in a line that is 60 feet long and 10 feet wide that persists until the start of your next turn. Any creature that starts their turn in this beam must make a Dexterity saving throw. On a failed save they take 8d8 damage of the beam's energy type, or taking half as much on a successful save."+
	"\n   While you are concentrating on this spell, your speed is 0."+
	"\n   At the start of each of your turns, you can use your action to maintain the beam or redirect it, rotating it up to 90 degrees in any direction. Any creature the beam passes through while rotating (if the beam passes completely through them and they will not start their turn inside of it) must make a Dexterity saving throw or, take 4d8 damage of the beams energy type on a failed save, and taking no damage on a successful save."+
	"\n   If you do not use your action maintain or redirect it, the spell ends early."
};
SpellsList["befuddling curse"] = {
	name : "Befuddling Curse",
	classes : ["occultist"],
	source : [["KCCC", 130]],
	level : 1,
	school : "Ench",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u2020",
	compMaterial : "Something from the target creature (such as blood, hair, or scales) which the spell consumes",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "1 creature mentally swap 2 same-size things; Wis save or unaware of swap, repeat save each interaction",
	descriptionFull : "You befuddle a creature's mind, swapping the position of two things it can see that are of the same size and category (for example, two Medium creatures or two Gargantuan buildings)."+
	"\n   The target creature must make a Wisdom saving throw. On failure, it is unaware the two things have been swapped. Each time the creature interacts with, attacks, or is attacked by a swapped targets, it can repeat its saving throw against the effect."
};
SpellsList["binding curse"] = {
	name : "Binding Curse",
	classes : ["occultist"],
	source : [["KCCC", 130]],
	level : 1,
	school : "Ench",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u2020",
	compMaterial : "Something from the target creature (such as blood, hair, or scales) which the spell consumes",
	duration : "Conc, 1 min",
	description : "bind 1 creature to point; Wis save to move > 5 ft away; start turn > 5 ft away, Str save or pulled 5 ft",
	descriptionFull : "You bind a creature to a point within 5 feet of it, causing a glowing chains of light to connect it to that point. For the duration of the spell, if the creature attempts to move away from that point, the must make a Wisdom saving throw, or be unable to move more than 5 feet away from from that point until the start of their next turn."+
	"\n   If a creature starts its turn more than 10 feet from the binding point, they must make a Strength saving throw or be dragged 5 feet toward the binding point."
};
SpellsList["burn"] = {
	name : "Burn",
	classes : ["druid", "occultist", "sorcerer", "warlock"],
	source : [["KCCC", 130]],
	level : 0,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "Instantaneous",
	description : "Spell attack, 1d12 Fire dmg; +1d12 at CL 5, 11, and 17",
	descriptionCantripDie : "Spell attack for `CD`d8 Fire dmg",
	descriptionFull : "You ignite a brilliant flame around your hand that sears anything you touch. Make a melee spell attack against the a creature or object within range. On hit, the target takes 1d12 fire damage."+
	"\n   The spell's damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), and 17th level (4d12)."
};
SpellsList["bond item"] = {
	name : "Bond Item",
	classes : ["inventor"],
	source : [["KCCC", 131]],
	level : 1,
	school : "Conj",
	time : "1 min",
	range : "Touch",
	components : "V,S",
	duration : "8 h",
	save : "Cha",
	description : "Link with obj < 100 lbs; if held, crea save, adv if held > 1 min; bonus action to recall item to hand",
	descriptionFull : "You touch an item weighing no more than 100 pounds and form a link between you and it. Until the spell ends, you can recall it to your hand as a bonus action.\n   If another creature is holding or wearing the item when you try to recall it, they make a Charisma saving throw to retain possession of the item, and if they succeed, the spell fails. They make this save with advantage if they have had possession of the item for more than 1 minute."
};
SpellsList["cold snap"] = {
	name : "Cold Snap",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 131]],
	level : 2,
	school : "Evoc",
	time : "1 a",
	range : "90 ft",
	components : "S",
	duration : "Instantaneous",
    save : "Con",
	description : "5-ft rad sphere dif. terrain till my next turn; 3d8+1d8/SL Cold dmg, slowed 10 ft; save halves, no slow",
	descriptionFull : "With a snap of your fingers a swirling burst of freezing wind erupts at a point you choose within range. Each creature in a 5-foot-radius sphere centered on that point must make a Constitution saving throw. On a failed save, a creature takes 3d8 cold damage and becomes stuck in the ice, reducing their speed by 10 feet until the start of your next turn. On a success, the target takes half as much damage and is not stuck in ice.\n   The ground in the area is covered with slick ice and snow, making it difficult terrain until the start of your next turn." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd."
};
SpellsList["compelled query"] = {
	name : "Compelled Query",
	classes : ["psion"],
	source : [["KCCC", 131]],
	level : 1,
	school : "Psion",
	time : "1 a",
	range : "60 ft",
	components : "S",
	duration : "Instantaneous",
	save : "Int",
    description : "Ask crea simple question, save or give thought or image answer; +5 on save per time used in past 24 h",
	descriptionFull : "You focus your telepathic powers on a creature and ask it a simple question. It must make an Intelligence saving throw, or it conjures a short mental thought or image that answers your question to the best of its ability that you can perceive telepathically. A creature gains a +5 to the saving throw against this spell for each time it has been used on them in the past 24 hours."
};
SpellsList["crackle"] = {
	name : "Crackle",
	classes : ["druid", "occultist", "sorcerer", "warlock", "wizard"],
	source : [["KCCC", 131]],
	level : 2,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
    save : "Con",
	description : "3+1/SL arcs; ranged spell attack for 1d12 Lightn. dmg; 3+ on crea; save or stunned till their next turn",
	descriptionFull : "You create three arcs of lightning striking targets in range. You can direct them at one target or several.\n   Make a ranged spell attack for each arc. On a hit, the target takes 1d12 lightning damage. If three or more arcs hit a single target, they must make a Constitution saving throw or become shocked, stunning them until the start of their next turn." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, you create one additional arc for each slot level above 2nd.",
	dynamicDamageBonus : { multipleDmgMoments : true }
};
SpellsList["crashing wave"] = {
	name : "Crashing Wave",
	classes : ["druid", "sorcerer", "wizard"],
	source : [["KCCC", 131]],
	level : 1,
	school : "Conj",
	time : "1 a",
	range : "S:15" + (typePF ? "-" : "") + "ft cone",
	components : "V,S",
	duration : "Instantaneous",
    save : "Str",
	description : "Water in 5ft, 25ft cone; 2d6+1d6/SL Bludg dmg, push 10ft; wall/fails>5=prone; save halves, no push",
	descriptionFull : "A wave of water sweeps out from you. Each creature in a 15-foot cone must make a Strength saving throw. On a failed save, a creature takes 2d6 bludgeoning damage and is knocked 10 feet away from you. If a creature is knocked into a wall, another creature, or fails by 5 or more, it is additionally knocked prone. On a successful save, the creature takes half as much damage and is not knocked back. If there is a source of water of at least 5 cubic feet within 5 feet of you when you cast the spell, you can displace that water, increasing the range of the spell to a 25-foot cone." + AtHigherLevels + "When you cast this spell using a spell lot of 2nd level or higher, the damage increases by 1d6 for each level above 1st."
};
SpellsList["crippling agony"] = {
	name : "Crippling Agony",
	classes : ["occultist"],
	source : [["KCCC", 131]],
	level : 1,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A joint bone",
	duration : "Conc, 1 min",
    save : "Con",
	description : "1 crea takes 1d6 Necrotic dmg when moves > half speed or takes an action; repeat save at end of turn",//reworded
	descriptionFull : "You can inflict crippling agony on a foe. Choose one creature that you can see within range to make a Constitution saving throw. If the target fails, it becomes crippled with horrific pain. Whenever the creation moves more than half of its speed or takes an action, the crippling pain causes it to take 1d6 necrotic damage.\n   It can repeat the saving throw at the end of each of its turns, the target can make a Constitution saving throw. On a success, the spell ends."
};
SpellsList["cruel puppetry"] = {
	name : "Cruel Puppetry",
	classes : ["occultist"],
	source : [["KCCC", 132]],
	level : 3,
	ritual : true,
	school : "Necro",
	time : "1 a",
	range : "120 ft",
	components : "V,S,M\u2020",
	compMaterial : "A small humanoid doll worth at least 5 gp and something from the target (such as blood, hair, or scales) both of which the spell consumes",
	duration : "Conc, 1 min",
    save : "Cha",
	description : "1 crea bound to doll; can use my action to control doll/crea; see book; SL 5+: unlimited range",
	descriptionFull : "You attempt to bind a creatures soul to a doll, linking the creature to the doll in a sympathetic link. The target must make a Charisma saving throw. On failure, the creature becomes bound to the doll. On a successful save, the creature is not bound and the spell ends.\n   As part of casting the spell when the creature fails the save, and on subsequent turns using your action until the spell ends, you can perform one of the following actions:\n \u2022 Hold the doll still, causing the creature to be Restrained until start of your next turn.\n \u2022 Force the doll to move, causing the creature to move 15 feet in a direction of your choice that it can move.\n \u2022 Stab the doll, causing the creature take 4d6 piercing damage.\n \u2022 Rip the doll in half, ending the spell, destroying the doll, and dealing 4d12 necrotic damage to the creature.\n \u2022 Each time after the first you use an action to manipulate the doll, after the effect takes place, the creature can repeat the Charisma with disadvantage, ending the effect on a successful save.\n\nOnce a creature has been targeted by this spell, they cannot be targeted again for 24 hours." + AtHigherLevels + "When cast with a 5th level spell slot or above, the range of the spell becomes unlimited, as long as the target is on the same plane as the caster."
};
SpellsList["crushing singularity"] = {
	name : "Crushing Singularity",
	classes : ["wizard"],
	source : [["KCCC", 132]],
	level : 3,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "1 rnd",
    save : "Str",
	description : "15-ft rad; 3d6+1d6/other crea that failed (max 6d6) Bludg. dmg & moved to center of area; see book",
	descriptionFull : "You create an overwhelming gravitational singularity at a point within range that lasts until the start of your next turn. When you cast this spell, any creature within 15 feet of the point must make a Strength saving throw. Creatures that fail their saving throw are moved to the closest available space adjacent to the singularity and take 3d6 bludgeoning damage, and an extra 1d6 bludgeoning damage for each other creature that fails the saving throw, up to a maximum of 6d6 bludgeoning damage.\n   While within 15 feet of the singularity, moving away from the singularity requires twice as much movement. If a creature ends its turn within 15 feet of the singularity, it must make a Strength saving throw. On failure, they take 2d6 bludgeoning damage are dragged back to the closest available spot to the center of the singularity."
};
SpellsList["dancing wave"] = {
	name : "Dancing Wave",
	classes : ["druid", "occultist", "sorcerer", "wizard"],
	source : [["KCCC", 132]],
	level : 2,
	school : "Conj",
	time : "1 a",
	range : "30 ft",
	components : "V,S",
	duration : "Conc, 1 min",
    save : "Str",
	description : "5-ft rad dif. ter. if no swim spd; bns move 30 ft; enters crea's space; save or 1d6 Bludg dmg and prone",
	descriptionFull : "You summon a surging mass of water into existence at a point on the ground within range. The mass of water remains cohesive filling a 5-foot radius, though only rises 3 feet from the ground. The area is difficult terrain for any creature without a swimming speed.\n   For the duration of the spell, as a bonus action you can move the wave of water up to 30 feet along a surface in any direction. The first time the wave enters any creature's space during your turn, they must make a Strength saving throw or take 1d6 bludgeoning damage and be knocked prone. A creature automatically fails the saving throw against this spell if they are prone."
};
SpellsList["delve mind"] = {
	name : "Delve Mind",
	classes : ["psion"],
	source : [["KCCC", 132]],
	level : 3,
	school : "Psion",
	time : "1 a",
	range : "60 ft",
	components : "S",
	duration : "Conc, 1 min",
	save : "Int",
    description : "Crea save or I gain access to past 12+12/SL hours memories; recall them as if my memories",
	descriptionFull : "You delve into a creature's mind, forcing it to make an Intelligence saving throw. On a failure, for the duration or until you end the spell you gain access to its memories from the past 12 hours, and are able to recall things it remembers as if they are your own memories, but these memories contain only things the target creature remembers." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, you can delve an additional 12 hours further back in the creature's memories for each slot level above 3rd."
};
SpellsList["devouring darkness"] = {
	name : "Devouring Darkness",
	classes : ["occultist", "warlock", "wizard"],
	source : [["KCCC", 132]],
	level : 5,
	school : "Necro",
	time : "1 a",
	range : "S:20" + (typePF ? "-" : "") + "ft rad",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	description : "Chosen creas 6d8+1d8/SL Necrotic dmg, moved in 5 ft; save halves, no move; regain HP=dmg dealt/4",
	descriptionFull : "Dark tendrils burst out from you in all directions. Creatures of your choice within must make a Constitution saving throw. On failure, they take 6d8 necrotic damage, and you can move them in a straight line to within 5 feet of you if there is an empty space they can be pulled to. On success, they take half as much damage and are not moved.\n   You regain hit points equal to one quarter (rounded down) of the necrotic damage taken by all targets effected by the spell." + AtHigherLevels + "When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th."
};
SpellsList["dimension cutter"] = {
	name : "Dimension Cutter",
	classes : ["ranger"],
	source : [["KCCC", 133]],
	level : 4,
	school : "Conj",
	time : "1 a",
	range : "S:15" + (typePF ? "-" : "") + "ft cone",
	components : "V,M\u2020",
	compMaterial : "A melee weapon you are proficient with worth at least 1 cp",
	duration : "Instantaneous",
	description : "Each crea takes 6d6 Force damage",
	descriptionFull : "You flourish a weapon weapon you are proficient with used in the casting and sweep through the air, slashing apart the dimensional space. Each creature in a 15-foot cone takes 6d6 force damage."
};
SpellsList["disorient"] = {
	name : "Disorient",
	classes : ["occultist", "wizard"],
	source : [["KCCC", 133]],
	level : 2,
	school : "Illus",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A mobius strip",
	duration : "1 min",
	save : "Wis",
	description : "Crea has disadv on atks, moves 10ft in rnd dir., spd 0 till nxt turn; save at end of turn, fails by 5+: prone",
	descriptionFull : "Targeting a creature with you can see, you flip their perception of reality. The target creature must pass a Wisdom saving throw or become disoriented. A disoriented creature has disadvantage on all attack rolls and at the start of their turn moves 10 feet (up to its speed) in a random direction before their speed becomes zero until the start of their next turn.\n   At the end of each of its turns, the target can make another Wisdom saving throw. On a success, the spell ends, but if the target fails by 5 or more, it falls prone."
};
SpellsList["dispel construct"] = {
	name : "Dispel Construct",
	classes : ["inventor"],
	source : [["KCCC", 133]],
	level : 3,
	school : "Abjur",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	description : "Construct; 4d10 Force dmg; save or stunned for 1 min; if less than 50HP reduced to 0",
	descriptionFull : "You can attempt to purge the magic animating a construct within range, rendering it inert. The target takes 4d10 force damage and must succeed on a Constitution saving throw or become stunned for 1 minute. At the end of each of its turns, the target can make another Constitution saving throw. On a success, the spell ends on the target. If the target has less than 50 hit points remaining when it fails, it is reduced to zero hit points."
};
SpellsList["divide self"] = {
	name : "Divide Self",
	classes : ["occultist", "sorcerer", "wizard"],
	source : [["KCCC", 133]],
	level : 5,
	school : "Illus",
	time : "1 bns",
	range : "Self",
	components : "S",
	duration : "Conc, 1 min",
	description : "Duplicate of self & items; shares Conc, resources; HP divided; max 15+10/SL damage/turn; see book",
	descriptionFull : "You you create an exact duplicate of yourself in an empty space you can see within 30 feet of you. When you cast this spell and at the start of each of your turns for the duration, you can switch places with your duplicate." + "\n   " +
	"The duplicate has all of your stats, abilities, and equipment (including magic items). It acts on your initiative, and has its own actions, though it shares its concentration on this spell, and if either of you lose concentration, the spell ends." + "\n   " +
	"Your current hit points are divided between you and the duplicate and it shares all other resources and abilities with you (including limited use magic items), with any usage by either you or the duplicate depleting the resource for both of you." + "\n   " +
	"Your duplicate can take any action you can take, but it can deal a maximum of 15 damage on its turn (any additional damage dealt deals no further damage, when dealing area of effect damage, damage is split between all targets equally up to the maximum)." + "\n   " +
	"If either you or the duplicate is reduced to zero hit points, the spell ends and you become the copy that was not reduced to zero hit points. When the spell ends, if both you and the duplicate are still present, decide which is you, and the other vanishes. Anything that was copied during the spell has the copied version vanish." + AtHigherLevels +
	"When you cast this spell using a spell slot of 6th level or higher, the starting hit points of you and the duplicate both increase by 15 (up to a maximum of you and the duplicate starting with your current hit points) and the maximum damage the duplicate can do during its turn increases by 10 for each slot level above 5th."
};
SpellsList["earth ripple"] = {
	name : "Earth Ripple",
	classes : ["druid", "occultist", "sorcerer", "wizard"],
	source : [["KCCC", 133]],
	level : 2,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Dex",
	description : "1d8 Bludg. dmg, spd 0 till dug out a.; or 2d8 Bludg. dmg, prone, moved 5 ft in dir.; or 4d8 Pierc. dmg",
	descriptionFull : "You cause the earth to deform and ripple, a target creature must make a Dexterity saving throw or suffer one of the following effects (your choice):\n \u2022 It is pulled into the earth, taking 1d8 bludgeoning damage and reducing its speed to 0 until a creature spends an action to dig it free.\n \u2022 It is slammed 5 feet in a direction of your choice by a wave of earth, taking 2d8 bludgeoning damage and being knocked prone.\n \u2022 It is impaled by a spike of earth, taking 4d8 piercing damage."
};
SpellsList["echoing lance"] = {
	name : "Echoing Lance",
	classes : ["bard", "occultist", "sorcerer", "wizard"],
	source : [["KCCC", 133]],
	level : 4,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Con",
	description : "3d8+1d8/SL Thunder dmg, stunned; save halves, no stun; save at end of turn, fail = 1d8 thunder dmg",
	descriptionFull : "You emit a targeted burst of intense sonic energy at a creature within range. The target must make a Constitution saving throw. On a failure, they take 3d8 thunder damage and become stunned for the duration by the intense sound. On a successful save, the target takes half as much damage and isn't stunned.\n   At the end of each of its turns, the target can make another Constitution saving throw. On a success, the spell ends, on failure, they take an extra 1d8 thunder damage from the echoes within their mind." + AtHigherLevels + "When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d8 for each slot level above 4th."
};
SpellsList["electrify"] = {
	name : "Electrify",
	classes : ["occultist", "sorcerer", "wizard"],
	source : [["KCCC", 134]],
	level : 1,
	school : "Evoc",
	time : "1 bns",
	range : "Self",
	components : "V,S",
	duration : "1 rnd",
	save : "Con",
	description : "Next melee atk +1d10 Lightning dmg, save or stunned till their next turn; can cast Shocking Grasp",
	descriptionFull : "You channel lightning into your hands. The next time you hit a creature with a melee attack (including a melee spell attack) before the start of your next turn, the target takes 1d10 lightning damage and must make a Constitution saving throw. On a failed save, the target becomes stunned until the start of their next turn.\n   The spell ends after dealing damage, or at the start of your next turn, whichever occurs first. For the duration of the spell, you can cast the spell shocking grasp."
};
SpellsList["electrocute"] = {
	name : "Electrocute",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 134]],
	level : 3,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	description : "1 crea takes 4d12+1d12/SL Lightning dmg, stunned till my next turn; save halves, no stun",
	descriptionFull : "A massive arc of lightning leaps from your hand to a target you can see within range. The target must make a Constitution saving throw. On a failed save, the target takes 4d12 lightning damage and is stunned until the start of your next turn. On a successful save, the target takes half as much damage and isn't stunned." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d12 for each slot level above 3rd."
};
SpellsList["entomb"] = {
	name : "Entomb",
	classes : ["wizard"],
	source : [["KCCC", 134]],
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Str",
	description : "Med crea save or restrained; end of their turn 1d8+1d8/SL Cold dmg; save or 5+ Fire/Blud dmg frees",
	descriptionFull : "You attempt to encase a Medium or smaller creature you can see within ice. The creature must make a Strength saving throw or become restrained by ice for the duration. At the end of each of its turns, the target takes 1d8 cold damage and can make another Strength saving throw. On success, the spell ends on the target.\n   If the creature takes more than 5 fire or bludgeoning damage from a single damage roll while restrained, the ice breaks and the target is freed, ending the spell for the target." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st."
};
SpellsList["erode"] = {
	name : "Erode",
	classes : ["occultist", "wizard"],
	source : [["KCCC", 134]],
	level : 3,
	school : "Conj",
	time : "1 a",
	range : "20 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Dex",
	description : "8d4+1d4/SL Acid dmg and covered, 2d4+1d4/SL at end of turn; save halves, no acid; 1 a to clear acid",
	descriptionFull : "You blast a target with a glob of acid. The target must make a Dexterity saving throw. On failure, the target takes 8d4 acid damage immediately and becomes covered in acid. On a success, the target takes half as much damage and is not covered in acid. While covered in acid, the target takes 2d4 acid damage at the end of each of its turns. The target or a creature within 5 feet of it can end this damage by using its action to clear away the acid." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 3rd."
};
SpellsList["fall"] = {
	name : "Fall",
	classes : ["inventor", "sorcerer", "wizard"],
	source : [["KCCC", 134]],
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "Self",
	components : "V,S",
	duration : "Instantaneous",
	description : "Pick any direction to fall as if under effect of gravity; still take fall dmg",
	descriptionFull : "You alter gravity for yourself, causing you to reorient which way is down for you until the end of your turn. You can pick any direction to fall as if under the effect of gravity, falling up to 500 feet before the spell ends."+
	"\n   If you collide with something during this time, you take falling damage as normal, but you can control your fall as you could under normal conditions by holding onto objects or move along a surface according to your new orientation as normal until your turn ends and gravity returns to normal."
};
SpellsList["fireburst mine"] = {
	name : "Fireburst Mine",
	classes : ["inventor"],
	source : [["KCCC", 135]],
	level : 3,
	school : "Abjur",
	time : "1 min",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "Any Tiny nonmagical item, which is destroyed by the activation of the spell",
	duration : "8 h",
	save : "Dex",
	description : "Detonate item if crea in 5 ft or rea command; 20 ft-rad 5d8 Fire dmg, save halves; see book",
	descriptionFull : "You can set a magical trap by infusing explosive magic into an item. You can set this item to detonate when someone comes within 5 feet of it, or by a verbal command using your reaction (one or more mines can be detonated).\n   When the magic trap detonates, each creature in a 20-foot-radius sphere centered on the item must make a Dexterity saving throw. A creature takes 5d8 fire damage on a failed save, or half as much damage on a successful one. If a creature is in the area of effect of more than one fireburst mine during a turn, they take half damage from any mines beyond the first."+
	"\n   A magical mine must be set 5 feet or more from another mine, and can't be moved once placed; any attempt to move it results in it detonating unless the caster that set it disarms it with an action."
};
SpellsList["fire cyclone"] = {
	name : "Fire Cyclone",
	classes : ["druid", "sorcerer", "wizard"],
	source : [["KCCC", 135]],
	level : 3,
	school : "Conj",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A pinch of ashes from a forest fire",
    duration : "Conc, 1 min",
	save : "Str",
	description : "5ft rad, 30ft tall; crea starts turn/enters: 3d6+1d6/SL Fire dmg, 15ft up \u0026 across; save halves, not moved",
	descriptionFull : "Targeting a point you can see, you cause a cyclone made of whipping flames with a radius of 5 feet and height of 30 feet to form." + "\n   " +
	"When a creature starts its turn inside the cyclone's radius or enters it for the first time during a turn, it must make a Strength saving throw. On a failed saving throw, it takes 3d6 fire damage and, if it is entirely inside the cyclone's area, it's also flung 15 feet upwards and lands 15 feet in a randomly determined horizontal direction. On a successful save, the creature takes half as much damage and is not flung." + "\n   " +
	"When a creature is not entirely inside the cyclone's radius but within 30 feet of its center at the start of its turn, it still feels the intense draw of the raging cyclone, and must spend 2 feet (or 3 feet if it is flying) of movement for every 1 foot it moves away from the cyclone. If a creature starts its turn outside of the cyclone's radius but within 10 feet of its center, it must make a Strength saving throw or be pulled 5 feet toward the center of it." + AtHigherLevels +
	"When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6."
};
SpellsList["fissure"] = {
	name : "Fissure",
	classes : ["druid", "sorcerer", "wizard"],
	source : [["KCCC", 135]],
	level : 5,
	school : "Trans",
	time : "1 a",
	range : "S:60" + (typePF ? "-" : "") + "ft line",
	components : "V,S",
	duration : "Instantaneous",
	save : "Dex",
	description : "Dex save or 6d10 Bludg. dmg and buried 10ft deep; 25ft move to escape; 1d10 dmg at end of turn",
	descriptionFull : "You rend asunder the earth in a 60-foot-long, 5-foot-wide line, targeting an area of dirt, sand, or rock at least 10 feet deep.\n   Creatures in that line must make a Dexterity saving throw. On a failure, a creature falls into a suddenly opened crevice in the ground, falling into it before it snaps shut, crushing them. Creatures that fail the saving throw take 6d10 bludgeoning damage from the fall and crushing. The creature is buried in 10 feet of rubble, and creatures without a burrowing speed require 25 feet of movement to extract themselves from the loose rubble to return to where they failed the saving throw. If they end their turn while buried, they take an extra 1d10 bludgeoning damage."
};
SpellsList["flash freeze"] = {
	name : "Flash Freeze",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 135]],
	level : 3,
	school : "Evoc",
	time : "1 a",
	range : "S:30" + (typePF ? "-" : "") + "ft cone",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	description : "4d8+1d8/SL Cold dmg and restrained until my next turn; save halves, not restrained",
	descriptionFull : "A freezing wind ripples outward. Each creature in a 30-foot cone must make a Constitution saving throw. On a failed save, a creature takes 4d8 cold damage and is restrained by ice until the start of your next turn. On a successful save, the target takes half as much damage and isn't restrained." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d8 for each slot level above 3rd."
};
SpellsList["flicker"] = {
	name : "Flicker",
	classes : ["psion"],
	source : [["KCCC", 135]],
	level : 1,
	school : "Psion",
	time : "1 rea",
	timeFull : "1 reaction, when you would take damage",
	range : "Self",
	components : "S",
	duration : "1 rnd",
    description : "Until my next turn, when I would take dmg roll a d4, on a 2 I gain resistance, on a 4 I take no damage",
	descriptionFull : "You flicker between the material and ethereal planes. Until the start of your next turn, each time you would take damage, including the triggering attack, roll a d4. On a 2, you gain resistance to that instance of damage. On a 4, you don't take any damage."
};
SpellsList["flickering strikes"] = {
	name : "Flickering Strikes",
	classes : ["ranger", "wizard"],
	source : [["KCCC", 136]],
	level : 5,
	school : "Conj",
	time : "1 a",
	range : "S:30" + (typePF ? "-" : "") + "ft rad",
	components : "V,S,M\u0192",
	compMaterial : "A melee weapon you are proficient with worth at least 1 sp",
	duration : "Instantaneous",
	description : "Melee weap atk up to 5 creas: weap dmg+6d6 Force dmg; teleport to visible space within 5ft of target",
	descriptionFull : "You flourish a weapon weapon you are proficient with used in the casting and then vanish, instantly teleporting to and striking up to 5 targets within range. Make a weapon attack against each target. On hit, a target takes the weapon damage from the attack + 6d6 force damage.\n   You can then teleport to an unoccupied space you can see within 5 feet of one of the targets you hit or missed."
};
SpellsList["fling"] = {
	name : "Fling",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 136]],
	level : 2,
	school : "Trans",
	time : "1 a",
	range : "30 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Str",
	description : "Large crea either moved 40ft up, fall 4d6 Bludg. dmg, prone; or 20ft in dir 2d6 Bludg. dmg, prone",
	descriptionFull : "You manipulate gravity around one Large or smaller creature. The target creature makes a Strength saving throw. On failure, you can fling them 40 feet straight up or 20 feet in any direction.\n   If you fling them straight up they immediately fall, taking 4d6 damage falling damage, and fall prone. If you fling them any other direction, they take 2d6 damage and fall prone. If their movement would be stopped early by a creature or object, both the target and creature or object takes 3d6 bludgeoning damage."
};
SpellsList["force blade"] = {
	name : "Force Blade",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 136]],
	level : 4,
	school : "Evoc",
	time : "1 bns",
	range : "S:5 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "Action: 1 crea in reach takes 2d12 Force dmg; SL 5-6:3d12, 7+:4d12",
	descriptionFull : "You create an oversized blade of pure scintillating force energy in your hand. For the duration of the spell, as an action, you can sweep the blade through one creature within reach, dealing 2d12 force damage." + AtHigherLevels + "When you cast it using a 5th- or 6th-level spell slot, the damage increases to 3d12. When you cast it using a spell slot of 7th level or higher, the damage increases to 4d12."
};
SpellsList["force bolt"] = {
	name : "Force Bolt",
	classes : ["sorcerer"],
	source : [["KCCC", 136]],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Ranged spell attack for 2d4 Force dmg; +2d4 at CL 5, 11, and 17",
	descriptionCantripDie : "Ranged spell attack for 2\xD7`CD`d4 Force dmg",
	descriptionFull : "You hurl a mote of arcane energy at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 2d4 force damage.\n   This spell's damage increases by 2d4 when you reach 5th level (4d4), 11th level (6d4), and 17th level (8d4)."
};
SpellsList["freezing shell"] = {
	name : "Freezing Shell",
	classes : ["warlock"],
	source : [["KCCC", 136]],
	level : 1,
	school : "Abjur",
	time : "1 a",
	range : "Self",
	components : "V,S",
	duration : "1 hr",
	description : "5+5/SL temp HP; as long as temp HP last any crea that hits in melee takes 5+5/SL Cold dmg",
	descriptionFull : "A freezing shell shrouds you, covering you and your gear. You gain 5 temporary hit points for the duration. If a creature hits you with a melee attack while you have these hit points, the creature takes 5 cold damage." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, both the temporary hit points and the cold damage increase by 5 for each slot level above 1st."
};
SpellsList["frighten"] = {
	name : "Frighten",
	classes : ["occultist", "warlock, wizard"],
	source : [["KCCC", 136]],
	level : 1,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "1+1/SL crea(s) becomes frightened; repeat save on end of its turns",
	descriptionFull : "You invoke a sudden fear within a creature you can see within range. The target creature must succeed a Wisdom saving throw, or become frightened for the duration. The frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success." + AtHigherLevels + "When you cast this spell using a 2nd level or higher, you can target one additional creature for each slot above 1st."
};
SpellsList["future insight"] = {
	name : "Future Insight",
	classes : ["psion"],
	source : [["KCCC", 136]],
	level : 1,
	school : "Psion",
	time : "1 a",
	range : "Self",
	components : "S",
	duration : "10 mins",
    description : "Roll 3d4 or 1d12; I can expend a die to add/subtract from atk, save or check made by any crea in 60ft",
	descriptionFull : "You roll 3d4 or 1d12 (your choice) and record the results. During the duration, you can expend one of these dice to add or subtract them from any attack roll, saving throw, or ability check made by a creature within 60 feet of you until the dice are exhausted or the spell ends. You must expend the die after the roll is made, but before you know the outcome of the roll."
};
SpellsList["gale bolt"] = {
	name : "Gale Bolt",
	classes : ["druid", "occultist", "ranger", "sorcerer", "wizard"],
	source : [["KCCC", 137]],
	level : 1,
	school : "Evoc",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Ranged spell attack for 2d8+1d8/SL Bludgeoning dmg, if Large or smaller pushed 10ft away",
	descriptionFull : "A blast of concentrated wind streaks toward a creature of your choice within range. Make a ranged spell attack against the target. On a hit, the target takes 2d8 bludgeoning damage and if it is Large or smaller is knocked 10 feet away from you." + AtHigherLevels + "When you cast this spell using a spell lot of 2nd level or higher, the damage increases by 1d8 for each level above 1st."
};
SpellsList["geyser"] = {
	name : "Geyser",
	classes : ["druid", "sorcerer", "wizard"],
	source : [["KCCC", 137]],
	level : 4,
	school : "Conj",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Dex",
	description : "10ft rad; 4d6 Bludgeoning dmg, pushed 60ft up; save halves, pushed 10 ft away or 10 ft up",
	descriptionFull : "You cause a massive eruption of water to blast upwards from the ground at a point within range. Creatures within 10 feet of the point must make a Dexterity saving throw or take 4d6 bludgeoning damage and be knocked 60 feet into the air. On a successful save, creatures take half as much damage, and are instead knocked their choice of 10 feet away from the point or 10 feet upward."
};
SpellsList["glimpse the future"] = {
	name : "Glimpse the Future",
	classes : ["psion"],
	source : [["KCCC", 137]],
	level : 2,
	school : "Psion",
	time : "1 a",
	range : "60 ft",
	components : "S",
	duration : "10 mins",
    description : "Give a creature a glimpse of the future, roll d4 for effect; SL 3+ pick effect; see book",
	descriptionFull : "You give a creature within range a glimpse of their future. Roll a d4 to determine outcome:\n  d4\tEffect\n  1\tThe target forsees an action to come. Roll a d20\n\tand record the value. Until the duration of the spell\n\tends, they can replace one of their d20 rolls with\n\t\tthe value rolled.\n  2\tThe target sees their own death. If they are\n\treduced to zero hit points by an attack or failing a\n\tsave throw during the duration, they instead evade\n\tthe attack or pass the saving throw if they are not\n\totherwise incapacitated prior to being reduced to\n\t\t\tzero.\n  3\tThey see a future victory, growing confident. They\n\tgain 10 temporary hit points and are immune to\n\tthe frightened condition for the duration of the\n\t\t\tspell.\n  4\tThe target sees an ambush or surprise, the first\n\ttime they would be surprised they are not, or the\n\tfirst time an attack would be made against them\n\twith advantage, it is instead made with\n\t\t\tdisadvantage.\n\nOnce any of the events forseen occur, the spell ends." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, you can select the effect instead of rolling a d4."
};
SpellsList["grip of the dead"] = {
	name : "Grip of the Dead",
	classes : ["occultist"],
	source : [["KCCC", 137]],
	level : 1,
	school : "Necro",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Str",
	description : "Crea restrained; start of its turn 1d8+1d8/SL Necrotic dmg, heal half dmg; 1 a escape: Str/Dex check",
	descriptionFull : "You channel unholy strength into you hand, and reach out to grab a creature. The creature must make a Strength saving throw or become restrained by your deathly iron grasp. As an action on its turn, the creature can attempt to escape using a Strength (Athletics) or Dexterity (Acrobatics) check against your Spell Save DC.\n   At the start of the creatures turn while you maintain the grip and the spell, it takes 1d8 necrotic damage as you drain the life from it, and regain hit points equal to half the damage dealt." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st."
};
SpellsList["hurricane slash"] = {
	name : "Hurricane Slash",
	classes : ["druid", "occultist", "ranger", "sorcerer", "wizard"],
	source : [["KCCC", 137]],
	level : 2,
	school : "Evoc",
	time : "1 a",
	range : "S:30" + (typePF ? "-" : "") + "ft line",
	components : "V,S",
	duration : "Instantaneous",
	save : "Dex",
	description : "1+1/SL 5ft wide lines; 3d8 Slashing dmg; save halves",
	descriptionFull : "You condense wind into a razor sharp blast that shreds a 30-foot-long, 5-foot-wide line. Creatures in the area must make a Dexterity saving throw. A creature takes 3d8 slashing damage on a failed save or half as much on a success." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, you can create an additional line of effect. A creature in the area of more than one slash is affected only once."
};
SpellsList["ice spike"] = {
	name : "Ice Spike",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 138]],
	level : 4,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Dex",
	description : "1 crea 4d8 Piercing + 4d8 Cold dmg; on save still takes Cold dmg: SL6-7: 2 spikes; 8+: 3 spikes",
	descriptionFull : "You create a lance of ice that shoots up from the ground to impale a creature within range. The target must make a Dexterity saving throw. The target takes 4d8 piercing damage and 4d8 cold damage on a failed save. The target takes only the 4d8 cold damage on a successful save." + AtHigherLevels + "When you cast this spell using a spell slot of 6th or 7th level, you can create a second spike. When you cast this spell using a spell slot of 8th or 9th level, you can create a third spike. Additional spikes can target the same or different creatures."
};
SpellsList["ignite fire"] = {
	name : "Ignite Fire",
	classes : ["druid", "occultist", "sorcerer", "warlock", "wizard"],
	source : [["KCCC", 138]],
	level : 0,
	school : "Conj",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Dex",
	description : "5ft cube; crea enters/ends turn in: 1d8 Fire dmg; Unattended objs catch fire; +1d8 at CL 5, 11, and 17",
	descriptionCantripDie : "5ft cube; crea enters/ends turn in: `CD`d8 Fire dmg; Unattended objs catch fire",
	descriptionFull : "You ignite a magical fire that fills a 5-foot cube in a space you can see on the ground. A creature in the fire's space when you cast the spell must suceeed a Dexterity saving throw or take 1d8 fire damage. A creature that enters the fire's space for the first time or ends their turn there must repeat the saving throw against the effect. Flamable objects in the area that aren't being worn or carried catch fire.\n   The spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)"
};
SpellsList["imbue luck"] = {
	name : "Imbue Luck",
	classes : ["inventor"],
	source : [["KCCC", 138]],
	level : 2,
	school : "Abjur",
	time : "1 a",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "A four leaf clover",
	duration : "1 h",
	description : "Weap: on atk wielder can roll additional d20; Obj: defender rolls d20 for atker; spell ends after roll",
	descriptionFull : "You touch a weapon or worn item and imbue luck into it. If imbued on a weapon, for the duration, on an attack roll, the wielder can roll an additional d20 (they can choose to do this after they roll, but before the outcome is determined). The creature can choose which of the d20s is used for the attack roll."+
	"\n   If imbued into a worn item, they can roll a d20 when attacked, then choose whether the attack uses the attacker's roll or theirs."+
	"\n   With either use, the spell immediately ends upon rolling the extra d20."
};
SpellsList["inner world"] = {
	name : "Inner World",
	classes : ["psion"],
	source : [["KCCC", 138]],
	level : 8,
	school : "Psion",
	time : "1 a",
	range : "S:120-ft rad",
	components : "S",
	duration : "Conc, 1 min",
    description : "Create controllable environment, all creatures in range are brought into environment; see book",
	descriptionFull : "As an action, you create and enter an imaginary world. All other creatures within 120 feet are pulled this world with you. This world is centered on you, and extends in 120 feet in all directions." +
	"\n   A creature that reaches the edge of this world can make a Charisma saving throw to attempt to exit, spending 5 feet of movement to return where they were before being pulled into the world on success, and being unable to move out the world until the start of their next turn on failure. A creature outside the world can attempt to enter it by moving to where you cast the spell (which is marked by a glowing psionic rift) and making a Charisma saving throw to enter the world. You can allow a creature to automatically pass their save to enter or exit the world." +
	"\n   When you create this world, you can create obstacles and terrain of your choice, creating walls, pillars, and other obstacles that take up to twenty 5 by 5 square foot areas (stylistically, these can appear however you choose). These can be placed consecutively or spread out in any method of your choosing, but any area with a creature must contain a path that creature can fit through to both you and the edge of the of the world." +
	"\n   You can additionally create up to five hazardous spaces on the ground that are 5 foot squares. These can be fires, spikes, biting mouthes, or whatever you choose, but regardless of its form if a creature takes 4d4 + 4 psychic damage when it enters the effect's area for the first time on a turn or starts its turn there. Each of these hazards must be at least 20 feet from another hazard." +
	"\n   While in this inner world, if you fail saving throw, you choose to succeed instead. You can do up to 3 times during the duration of the spell. All spells and powers have their psi point cost reduced by one." +
	"\n   During the spell, as an action, you can attempt to destroy a creature within the world. The target must make an Intelligence saving throw. On failure, it takes 8d8 + 8 psychic damage and is removed from the imaginary world, returning to where they were before being pulled into it." +
	"\n   The world can be brightly or dimly lit, and you control the weather within it." +
	"\n   When the spell ends, you and any creature that remains in the world exit the world returning to space you entered the world from."
};
SpellsList["invested competency"] = {
	name : "Invested Competency",
	classes : ["psion"],
	source : [["KCCC", 139]],
	level : 5,
	school : "Psion",
	time : "1 a",
	range : "Touch",
	components : "S",
	duration : "Conc, 1 h",
    description : "Willing creature gains expertise in a skill of my choice",
	descriptionFull : "You touch a willing creature imbuing psionic competency into them. Until the spell ends, they gain expertise in on skill of your choice, adding double their proficiency bonus to that skill."
};
SpellsList["invest life"] = {
	name : "Invest Life",
	classes : ["psion"],
	source : [["KCCC", 139]],
	level : 3,
	school : "Psion",
	time : "1 a",
	range : "Touch",
	components : "S",
	duration : "Instantaneous",
    description : "I take 4d8+1d8/SL Necrotic damage, can't be reduced; Other creature regains HP = twice the damage",
	descriptionFull : "You invest some of your vital essence into another creature you can see within range. You take 4d8 necrotic damage, which can't be reduced in any way, and one creature of your choice that you can see within range regains a number of hit points equal to twice the necrotic damage you take." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d8 for each slot level above 3rd."
};
SpellsList["jumping jolt"] = {
	name : "Jumping Jolt",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 139]],
	level : 4,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Ranged spell atk 4d12+1d12/SL Lightning dmg; atk crea w/in 20 ft (max 5); miss-1/2 dmg no jumps",
	descriptionFull : "You release an arc of lighting at a creature within range. Make a ranged spell attack roll against the target. On hit, the target takes 4d12 lightning damage, and you can cause the spell to jump to another target within 20 feet of the first target making a new attack roll for each target. The spell can't hit the same target twice, or jump to a target out of the spells range. The spell can jump a maximum of five times."+
	"\n   On a miss, the target takes half as much damage and the spell doesn't jump to a new target."+
	AtHigherLevels + "When you cast this spell using a spell slot of 5th level or higher, the starting damage increases by 1d12 for each slot level above 4th."
};
SpellsList["killing curse"] = {
	name : "Killing Curse",
	classes : ["occultist"],
	source : [["KCCC", 139]],
	level : 5,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "Something from the target creature (such as blood, hair, or scales) which the spell consumes",
	duration : "Conc, 1 min",
	save : "Cha",
	description : "Max, cur HP -3d10+10; only heal SL>spell; death saves=1; save on turn; fail -1d10+10 max, cur HP",
	descriptionFull : "You curse a target to die. The targets current and maximum hit points are reduced by 3d10 + 10. If this causes a creatures to have zero hit points, the creature dies.\n   For the duration of the spell, the target cannot regain hit points unless from a spell cast using a spell slot of higher level than the spell slot this curse was cast with, and any death saving throw they roll is automatically considered a 1.\n   At the start of a creatures turn while they are under the effect of this spell, they make a Charisma saving throw. On failure, their current and maximum hit points is reduced by 1d10 + 10. On a successful save, the spell ends. A creature's maximum hit points are restored when it takes a long rest."
};
SpellsList["launch object"] = {
	name : "Launch Object",
	classes : ["inventor"],
	source : [["KCCC", 139]],
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "S",
	duration : "Instantaneous",
	save : "Dex",
	description : "Obj 5lbs/SL not worn or carried; flies 90 ft; on impact save or deals 3d8+1d8/SL Bludg dmg",
	descriptionFull : "Choose one object weighing 1 to 5 pounds within range that isn't being worn or carried. The object flies in a straight line up to 90 feet in a direction you choose before falling to the ground, stopping early if it impacts against a solid surface. If the object would strike a creature, that creature must make a Dexterity saving throw. On a failed save, the object strikes the target and stops moving. When the object strikes something, the object and what it strikes each take 3d8 bludgeoning damage."+
	AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the maximum weight of objects that you can target with this spell increases by 5 pounds, and the damage increases by 1d8, for each slot level above 1st."
};
SpellsList["lightning charged"] = {
	name : "Lightning Charged",
	classes : ["inventor"],
	source : [["KCCC", 139]],
	level : 2,
	school : "Evoc",
	time : "1 a",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "A piece of metal once used in a lightning rod",
	duration : "10 mins",
	description : "When target touches other creature they deal 1d6 Lightning dmg, up to 6+2/SL times",
	descriptionFull : "You channel lightning energy into a creature. The energy is harmless to the creature, but escapes in dangerous bursts to other nearby creatures."+
	"\n   Every time that creature strikes another creature with a melee attack, a spell with a range of touch, is struck by another creature with a melee attack, or ends their turn while grappling or being grappled by another creature, they deal 1d6 lightning damage to that creature."+
	"\n   Once this spell has discharged 6 times (dealing up to 6d6 damage), the spell ends."+
	AtHigherLevels + "The spell can discharge damage 2 additional times (dealing 2d6 more total damage) before the spell ends for each slot level above 2nd."
};
SpellsList["lightning tendril"] = {
	name : "Lightning Tendril",
	classes : ["druid", "occultist", "sorcerer", "warlock", "wizard"],
	source : [["KCCC", 140]],
	level : 1,
	school : "Evoc",
	time : "1 bns",
	range : "S:20 ft-rad",
	components : "V,S,M",
	compMaterial : "A twig from a tree that has been struck by lightning",
	duration : "Conc, 1 min",
	description : "1 a, 1d12 Lightning dmg to target; SL3: 2d12, 30 ft; SL5: 3d12, 60 ft; SL7: 4d12, 120 ft",
	descriptionFull : "Crackling beams of blue energy leap from your hands. For the duration of the spell, as an action, you can direct them toward a creature within range, dealing 1d12 lightning damage to that creature."+
	AtHigherLevels + "When you cast this spell using a 3rd- or 4th-level spell slot, the damage increases to 2d12 and the range increases to 30 feet. When you cast it using a 5th- or 6th-level spell slot, the damage increases to 3d12 and the range increases to 60 feet. When you cast it using a spell slot of 7th level or higher, the damage increases to 4d12 and the range increases to 120 feet."
};
SpellsList["martial transformation"] = {
	name : "Martial Transformation",
	classes : ["wizard"],
	source : [["KCCC", 140]],
	level : 6,
	school : "Trans",
	time : "1 a",
	range : "Self",
	components : "V,S,M",
	compMaterial : "A few hairs from a fighter",
	duration : "10 mins",
	description : "Can't cast/concentrate on spells; Gain multiple buffs, 50 temp HP, adv on atks, extra atk, etc; see book",
	descriptionFull : "You endow yourself with endurance and martial prowess fueled by magic. Until the spell ends, you can't cast spells or concentrate them, and you gain the following benefits:\n" +
	" \u2022 You gain 50 temporary hit points. If any of these remain when the spell ends, they are lost.\n" +
	" \u2022 You have advantage on attack rolls that you make with simple and martial weapons.\n" +
	" \u2022 When you hit a target with a weapon attack, that target takes an extra 2d12 force damage.\n" +
	" \u2022 You have proficiency with all armor, shields, simple weapons, and martial weapons.\n" +
	" \u2022 You have proficiency in Strength and Constitution saving throws.\n" +
	" \u2022 You can attack twice, instead of once, when you take the Attack action on your turn. You ignore this benefit if you already have a feature, like Extra Attack, that gives you extra attacks.\n" +
	" \u2022 You can conjure and equip (as part of the action used to cast the spell) and set of heavy or medium armor and any simple or martial weapon of your choice. These items have no strength requirements and are magical in nature though have the same properties as their nonmagical counterparts, vanishing when the spell ends.\n" +
	"Immediately after the spell ends, you must succeed on a DC 15 Constitution saving throw or suffer one level of exhaustion."
};
SpellsList["mind blast"] = {
	name : "Mind Blast",
	classes : ["psion"],
	source : [["KCCC", 140]],
	level : 6,
	school : "Psion",
	time : "1 a",
	range : "S:60" + (typePF ? "-" : "") + "ft cone",
	components : "S",
	duration : "Instantaneous",
	save : "Int",
    description : "6d8 Psychic dmg, stunned until the end of their next turn; Save halves and no stun",
	descriptionFull : "You emit a blast of psychic energy. Each creature in a 60-foot cone must make an Intelligence saving throw. A creature takes 6d8 psychic damage and is stunned until the end of their next turn on a failed save. A creature takes half as much damage and is not stunned on a successful save."
};
SpellsList["mutate"] = {
	name : "Mutate",
	classes : ["druid", "sorcerer", "warlock", "wizard"],
	source : [["KCCC", 140]],
	level : 3,
	school : "Trans",
	time : "1 a",
	range : "Self",
	components : "V,S,M",
	compMaterial : "Something from an extinct animal",
	duration : "Conc, 10 min",
	description : "Gain 3+1/SL temporary magical properties; action to swap current properties; see book",
	descriptionFull : "You manipulate the nature of your body with magic temporarily giving it new properties. You can select three of the following properties:\n" +
	" \u2022 Your body becomes malleable and amorphous. You have advantage on saves and checks against grapples and the restrained condition, you do not suffer disadvantage from squeezing into smaller spaces, and you can squeeze through openings two sizes smaller than you.\n" +
	" \u2022 You grow one additional appendage. This appendage serves as an arm and a hand, though it can take the shape of an arm, tentacle, or similar appendage.\n" +
	" \u2022 You extend the length of your limbs, increasing the reach on melee attacks, touch spells, and object interactions by 5 feet.\n" +
	" \u2022 Your flesh hardens, your base AC becomes 14 + your dexterity modifier if it is not already higher.\n" +
	" \u2022 You grow more resilient, adapting against one external threat. You gain advantage on one type of saving throw of your choice.\n" +
	" \u2022 You adapt your body to an aquatic environment, sprouting gills and growing webbing between your fingers. You can breathe underwater and gain a swimming speed equal to your walking speed.\n" +
	" \u2022 Your body grows ablative armor. You gain temporary hit points equal to your spellcasting ability modifier at the start of each of your turns.\n" +
	" \u2022 You can grow one size larger or smaller.\n" +
	" \u2022 You sprout wings. You gain a flying speed of 30 feet.\n" +
	" \u2022 You grow a natural weapon; this weapon can have the statistics of any martial melee weapon without the thrown property, and takes on a form vaguely reminiscent of it. You have proficiency with this weapon, and are considered to be holding it. You can use your spellcasting modifier in place of your Strength or Dexterity modifier for attack and damage rolls with this natural weapon. The natural weapon is magic and you have a +1 bonus to the attack and damage rolls you make using it.\n   " +
	"For the duration of the spell, you can use an action to change one or all of the properties, losing the benefits of your previously selected properties and gaining the benefits of the new selected properties." +
	AtHigherLevels + "When you cast this spell using a spell slot of 4th or higher, you can select one additional property from the list of options, with one additional property per spell level above 3rd."
};
SpellsList["nauseating poison"] = {
	name : "Nauseating Poison",
	classes : ["druid", "occultist", "warlock"],
	source : [["KCCC", 141]],
	level : 1,
	school : "Necro",
	time : "1 bns",
	range : "Self",
	components : "V,S",
	duration : "1 rnd",
	save : "Con",
	description : "Next melee atk deals extra 1d12 Poison dmg; save or poisoned until the end of my next turn",
	descriptionFull : "You shroud your hand, a weapon you are holding, or a natural weapon in dark ichorous miasma. The next time you hit a creature with a melee attack (including a melee spell attack) before the start of your next turn, the attack deals an extra 1d12 poison damage and the target must succeed on a Constitution saving throw or be poisoned until the end of your next turn."
};
SpellsList["nullify effect"] = {
	name : "Nullify Effect",
	classes : ["psion"],
	source : [["KCCC", 141]],
	level : 2,
	school : "Psion",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you are forced to make an Intelligence, Wisdom, or Charisma saving throw",
	range : "Self",
	components : "S",
	duration : "1 rnd",
    description : "Adv on Int, Wis, Cha saves, resist Psychic, Force dmg until my turn; SL 4+: +d20 adv; 5+: Immunity",
	descriptionFull : "You gain advantage on Intelligence, Wisdom, and Charisma saving throws (Including the triggering save) until the start of your next turn. You also gain resistance to Psychic and Force damage until the start of your next turn." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, you can roll an additional d20 as part of your advantage roll. If you cast this at the 5th level or higher, it grants immunity to Psychic and Force damage for the duration."
};
SpellsList["orbital stones"] = {
	name : "Orbital Stones",
	classes : ["druid", "sorcerer", "wizard"],
	source : [["KCCC", 141]],
	level : 4,
	school : "Trans",
	time : "1 a",
	range : "Self",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "3 rocks in 10ft; 1+ = 1/2 cover, 3 = 3/4 cover; Bns a 60ft ranged spell atk 3d10 Bludg. dmg, push 5ft",
	descriptionFull : "You lift three inanimate Small- or Medium-sized rocks or similar objects from within 10 feet of you, causing them to defy gravity and slowly circle you. With all three stones orbiting, you have three quarters cover. With at least one stone remaining, you have half cover.\n   As a bonus action while at least one stone remains in orbit, you can magically fling a stone at target within 60 feet. Make a ranged spell attack roll. On hit, the target takes 3d10 bludgeoning damage and is knocked backward 5 feet."
};
SpellsList["poison dart"] = {
	name : "Poison Dart",
	classes : ["occultist", "sorcerer", "warlock", "wizard"],
	source : [["KCCC", 141]],
	level : 2,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	description : "Ranged spell atk for 3d12+1d12/SL Poison dmg; save or poisoned until my next turn",
	descriptionFull : "You conjure a dart of pure poison and hurl it at a creature you can see within range. Make a ranged spell attack. On a hit, the target takes 3d12 poison damage and must succeed a Constitution saving throw or become poisoned until the start of your next turn." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d12 for each slot level above 2nd."
};
SpellsList["poison puff"] = {
	name : "Poison Puff",
	classes : ["druid", "occultist", "warlock", "wizard"],
	source : [["KCCC", 141]],
	level : 4,
	school : "Trans",
	time : "1 a",
	range : "S:30" + (typePF ? "-" : "") + "ft cone",
	components : "V,S",
	duration : "1 rnd",
	save : "Con",
	description : "4d12 Poison dmg and poisoned; save halves, not poisoned; l. obs. till nxt turn; end turn: extra 2d4 dmg",
	descriptionFull : "You exhale a cloud of poison that magically expands to fill a 30-foot cone. Creatures in that area must make a Constitution saving throw. On a failure, they take 4d12 poison damage and become poisoned until the start of their next turn. On a success, the target takes half as much damage and is not poisoned.\n   The area is lightly obscured until the start of your turn, and any creature that ends their turn within the area takes 2d4 poison damage."
};
SpellsList["pressure cutter"] = {
	name : "Pressure Cutter",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 141]],
	level : 5,
	school : "Conj",
	time : "1 a",
	range : "S:60" + (typePF ? "-" : "") + "ft line",
	components : "V,S",
	duration : "Instantaneous",
	save : "Dex",
	description : "15ft wide; 10d6+1d6/SL Slashing dmg; save halves",
	descriptionFull : "You unleash a blast of highly pressurized water in a 60-footlong, 15-foot-wide line, slashing through everything in its path. Each creature in the line must make a Dexterity saving throw, taking 10d6 slashing damage on a failure. On a successful save, a creature takes half as much damage." + AtHigherLevels + "When you cast this spell using a spell lot of 6th level or higher, the damage increases by 1d6 for each level above 5th."
};
SpellsList["prismatic weapon"] = {
	name : "Prismatic Weapon",
	classes : ["inventor", "sorcerer", "wizard"],
	source : [["KCCC", 142]],
	level : 3,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "Conc, 1 h",
	description : "+1 magical weapon; +1d6 Acid, Cold, Fire, Lightning, Poison, or Thunder dmg; SL4: +2d6, SL6: +3d6",
	descriptionFull : "A weapon you touch is infused with elemental power, becoming a magical weapon. Choose of the following damage types: acid, cold, fire, lightning, poison, or thunder. The weapon deals 1d6 damage of the chosen weapon type, and if it doesn't already have a bonus to attack and damage, it gains a +1 bonus to attack and damage rolls."+
	AtHigherLevels + "When you cast this spell with a 4th- or 5th-level spell slot, the damage increases by 1d6 (to 2d6). When you use a spell slot of 6th level or higher, the damage increases by 2d6 (to 3d6)."
};
SpellsList["psychic drain"] = {
	name : "Psychic Drain",
	classes : ["psion"],
	source : [["KCCC", 142]],
	level : 2,
	school : "Psion",
	time : "1 a",
	range : "60 ft",
	components : "S",
	duration : "Instantaneous",
    description : "Crea save or 3d8+1d8/SL Psychic dmg, I gain half the dmg dealt as temp HP, regain 1 psi point",
	descriptionFull : "You draw on the psychic energy of another creature you can see to sustain yourself. The target must make a Charisma saving throw. On failure it takes 3d8 psychic damage and you gain temporary hit points equal to half the amount of psychic damage dealt and regain one expended psi point." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, the spell deals an extra 1d8 psychic damage."
};
SpellsList["rain of spiders"] = {
	name : "Rain of Spiders",
	classes : ["druid", "occultist", "sorcerer", "warlock", "wizard"],
	source : [["KCCC", 142]],
	level : 3,
	school : "Conj",
	time : "1 bns",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A spider leg",
	duration : "Conc, 1 min",
	description : "20ft rad x 40ft tall; Swarm of Spiders on each crea in area; moves with, takes turn after crea; see book",
	descriptionFull : "A vertical column of spiders begins to rain down in 20 foot radius, 40 foot high cylinder, centered on a location you specify. A Swarm of Spiders (Basic Rules, pg. 391) descends onto each creature within the cylinder when the spell is cast.\n   This swarm is considered to be climbing on the target creature and moves with it, even if they leave the affected area, and takes its turn immediately after that creature's turn. A creature can make use its action to attempt to remove the spiders, making a Strength (Athletics) or Dexterity (Acrobatics) check against the spell save DC of the caster.\n   The swarm uses the caster's spell attack modifier when attacking (if it is higher than their attack modifier). A swarm will attack the creature it fell on if it can, or move to chase the creature if it has been knocked off of them. Any spiders that remain when the spell ends disappear."
};
SpellsList["repair"] = {
	name : "Repair",
	classes : ["inventor"],
	source : [["KCCC", 142]],
	level : 4,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "Instantaneous",
	description : "Construct regains 10d6+2d6/SL HP, or repairs to condition it was that many years ago",
	descriptionFull : "You touch a construct or inanimate object, causing it to regain 10d6 hit points. This causes any parts or material that has broken away from the construct or object to reattach, repairing it to the condition it was in before losing those hit points."+
	"\n   If the construct or object's damaged state is the result of age, you can instead repair to the condition it was in 10d6 years ago, if it was previously in a better condition during that time (the condition can only improve or not change)."+
	AtHigherLevels + "The hit points restored increases by 2d6 (or the years restored) for each slot above 4th."
};
SpellsList["returning weapon"] = {
	name : "Returning Weapon",
	classes : ["inventor"],
	source : [["KCCC", 142]],
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "Self",
	components : "V,S",
	duration : "24 h",
	description : "Gains thrown 20/60, or thrown range increases 20/60, gains returning, reappears in your hand",
	descriptionFull : "You touch a weapon granting it the thrown 20/60 property. If it already has the thrown property, its range increases by 20/60. It also gains the \"returning\" property. After being thrown it automatically reappears in the thrower's hand."
};
SpellsList["rotting curse"] = {
	name : "Rotting Curse",
	classes : ["occultist"],
	source : [["KCCC", 142]],
	level : 1,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "Something from the target creature (such as blood, hair, or scales) which the spell consumes",
	duration : "Conc, 1 min",
	description : "Crea takes extra 1d4 Necrotic dmg from all sources; halves healing; disadv. on Cha social checks",
	descriptionFull : "You inflict a rotting decay on a creature, causing it to to begin to rot. For the duration of the spell, every time the creature takes damage, it takes an extra 1d4 necrotic damage, and the effect of all healing on the creature is reduced by half.\n   The target creature has disadvantage on any Charisma checks for social interaction during the effect of the spell."
};
SpellsList["seeking orb"] = {
	name : "Seeking Orb",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 142]],
	level : 2,
	school : "Evoc",
	time : "1 a",
	range : "5 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "Crea in 120ft; end of your turn moves 30ft towards crea; deals 6d4+1d4/rnd if it reaches the target",
	descriptionFull : "You create a Tiny orb of pure arcane energy that hovers within range, and designate a target creature within 120 feet. For the duration of the spell, at the end of each of your turns, the orb grows larger and moves 30 feet directly toward the creature. If the orb reaches the target, it will detonate dealing 6d4 force damage and an extra 1d4 damage for each round since you cast the spell to the target. The spell ends after it deals damage. If the orb doesn't reach the target before the spell ends, it fades away without dealing damage."
};
SpellsList["seeking projectile"] = {
	name : "Seeking Projectile",
	classes : ["inventor", "ranger"],
	source : [["KCCC", 143]],
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S,M\u0192",
	compMaterial : "A piece of ammunition or weapon with the thrown property worth at least 1 cp",
	duration : "Conc, 10 mins",
	description : "Ranged atk with ammo or weapon adds my SC mod, if die + SC mod is > 20 is crit hit; ends spell",
	descriptionFull : "You touch a piece of ammunition or weapon with the thrown property imbuing it with the property of seeking its target. When a ranged attack roll is made with that weapon, the attack roll can add your spell casting modifier to the value on the dice. If that makes the value on the die a 20 or more, the attack is a critical hit as if a 20 was rolled. After making the attack roll, the spell ends."
};
SpellsList["shockwave"] = {
	name : "Shockwave",
	classes : ["psion"],
	source : [["KCCC", 143]],
	level : 5,
	school : "Psion",
	time : "1 a",
	range : "S:30 ft-rad",
	components : "S",
	duration : "Instantaneous",
	save : "Str",
	description : "Chosen creas pushed 5 ft back, take 8d6 Bludg dmg and prone; save halves, no prone",
	descriptionFull : "You unleash a burst of telekinetic force in all directions. Each creature of your choice within 30 feet of you is knocked 5 feet back and must succeed on a Strength saving throw or take 8d6 damage bludgeoning damage and be knocked prone. A creature that succeeds on its saving throw takes half as much damage and isn't knocked prone."
};
SpellsList["sky burst"] = {
	name : "Sky Burst",
	classes : ["druid", "sorcerer", "wizard"],
	source : [["KCCC", 143]],
	level : 5,
	school : "Evoc",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Dex",
	description : "5+1/SL bolts strike, creas w/in 5 ft of strike take 4d12 Lightning dmg; save halves",
	descriptionFull : "Five bolts of lightning strike five points of your choice that you can see within range. Each creature within 5 feet of the chosen points must make a Dexterity saving throw. A creature takes 4d12 lightning damage on a failed save, or half as much on a successful one. A creature in the area of more than one lightning burst is affected only once."+
	AtHigherLevels + "When you cast this spell using a spell slot of 6th level or higher, you can call down an additional bolt of lightning targeting another point within range for each slot level above 5th."
};
SpellsList["sonic shriek"] = {
	name : "Sonic Shriek",
	classes : ["bard", "occultist", "sorcerer", "wizard"],
	source : [["KCCC", 143]],
	level : 5,
	school : "Evoc",
	time : "1 a",
	range : "S:120" + (typePF ? "-" : "") + "ft cone",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	description : "6d8+1d8/SL Thunder dmg; save halves; auto save if more than 60 ft away",
	descriptionFull : "You emit a sonic blast covering a massive area. Each creature in a 120-foot cone must make a Constitution saving throw. On a failed save, a creature takes 6d8 thunder damage. On a successful save, a creature takes half as much damage. A creature automatically succeed on its saving throw if it is more than 60 feet from you." + AtHigherLevels + "When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th."
};
SpellsList["spatial manipulation"] = {
	name : "Spatial Manipulation",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 143]],
	level : 5,
	school : "Conj",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Cha",
	description : "Swap the position 1+1/SL pairs of creatures; unwilling creatures may save to prevent the swap",
	descriptionFull : "You can swap the position two creatures you can see within range. An unwilling creature can make a Charisma saving throw, preventing the swap on success." + AtHigherLevels + "When you cast this spell using a spell slot of 6th level or higher, you can swap an additional set of creatures of each level about 5th."
};
SpellsList["spider bite"] = {
	name : "Spider Bite",
	classes : ["druid", "occultist", "warlock", "wizard"],
	source : [["KCCC", 143]],
	level : 3,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	description : "Melee spell atk 4d12+1d12/SL Poison dmg; save or poisoned 1 min, save end of turn; miss can Conc",
	descriptionFull : "You prick a target with a tiny magical fang of venom. Make a melee spell attack against a creature within reach. On a hit, the target takes 4d12 poison damage and must succeed on a Constitution saving throw or becoming poisoned for 1 minute. At the end of each of its turns, the target can make another Constitution saving throw. On a success, the target is no longer poisoned.\n   If you miss your melee attack roll, you can concentrate (as if concentrating on a spell) to maintain the attack for another attempt until the end of your next turn. (You may make subsequent attempts until you hit or lose concentration)" + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d12 for each slot level above 3rd."
};
SpellsList["star dust"] = {
	name : "Star Dust",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 144]],
	level : 2,
	school : "Evoc",
	time : "1 a",
	range : "S:30" + (typePF ? "-" : "") + "ft cone",
	components : "V,S",
	duration : "Instantaneous",
	description : "Creas in cone take 3d4 Force damage, next attack before your next turn has advantage",
	descriptionFull : "You evoke a burst of brilliant particles of force energy sweeping out in a 30-cone originating from you. Creatures in the radius take 3d4 force damage and the next attack roll made against them before the start of your next turn has advantage."
};
SpellsList["stinging swarm"] = {
	name : "Stinging Swarm",
	classes : ["druid", "occultist", "warlock", "wizard"],
	source : [["KCCC", 144]],
	level : 4,
	school : "Conj",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Con",
	description : "5ft cube; bns to move 30ft; enters a crea space: stops, 2d4 Pierc dmg, crea save or 2d12 Poison dmg",
	descriptionFull : "You conjure a magical swarm of flying insects that fill a 5 foot cube within range. For the duration of the spell, the swarm is magically replenished and can't be destroyed. As a bonus action, you can direct the swarm to move up to 30 feet. If the swarm enters another creature's space, it stops and swarms them, stinging repeatedly, and can't be moved until the start of your next turn. The creature takes 2d4 piercing damage and must make a Constitution saving throw, taking 2d12 poison damage on failure."
};
SpellsList["stone fist"] = {
	name : "Stone Fist",
	classes : ["druid", "occultist", "sorcerer", "warlock", "wizard"],
	source : [["KCCC", 144]],
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "Self",
	components : "V,S",
	duration : "1 rnd",
	description : "Melee spell atk for 2d10+1d10/SL Bludg dmg; until next turn rea for resist. from Slash or Pierc source",
	descriptionFull : "You turn your hand and forearm (or similar appendage) to stone until the start of your next turn. As part of casting the spell, you can make a melee spell attack against one creature you can reach. On a hit, the target takes 2d10 bludgeoning damage.\n   Until the start of your next turn, you can use your reaction when you take slashing or piercing damage from an attack to gain resistance to damage from that attack." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d10 for each slot level above 1st."
};
SpellsList["suffocate"] = {
	name : "Suffocate",
	classes : ["occultist", "sorcerer", "wizard"],
	source : [["KCCC", 144]],
	level : 4,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Con",
	description : "Crea loses 5d8 HP, disadv on ability checks, can't speak; save halves dmg and no other effects; see book",
	descriptionFull : "You create a whirling sphere of air around a creature that causes them to struggle to breathe. The target must make a Constitution saving throw. On a failure, the target loses 5d8 hit points due to lack of air, has disadvantage on all ability checks, and can't speak. On a success, the target takes half as much damage and suffers no other effects. For the duration, as an action, you can force the creation to make a saving throw against the ability again.\n   If a target fails their saving throw against this spell 3 times in a row, they become incapacitated until they succeed on a save or the spell ends. If you don't use your action to force the target to make a save, it counts as a success.\n   A creature that doesn't need to breathe is unaffected by this spell."
};
SpellsList["summon horror"] = {
	name : "Summon Horror",
	classes : ["occultist", "warlock", "wizard"],
	source : [["KCCC", 144]],
	level : 4,
	school : "Conj",
	time : "1 a",
	range : "90 ft",
	components : "V,S,M\u0192",
	compMaterial : "A book with an ornate cover filled with the records of madmen worth at least 400 gp",
	duration : "Conc, 1 hr",
	description : "Create horror; disappears at 0 HP or when spell ends; takes turn after yours; obeys commands; see B",
	descriptionFull : "You call forth a twisted horror. It manifests in an unoccuptied space that you can see within Range. This manifested form uses the Horror Spirit stat block. When you cast the spell, choose Star, Sea, or Void. The creature takes on elements of the selected type, which determine certain traits in its stat block. The creature disappears when it drops to 0 hit points or the spell ends.\n   The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the Dodge action and uses its move to avoid danger." + AtHigherLevels + "When you cast this spell using a spell of 5th level or higher, use the higher level whenever the spell's level appears in the stat block."
};
SpellsList["summon ooze"] = {
	name : "Summon Ooze",
	classes : ["occultist", "wizard"],
	source : [["KCCC", 145]],
	level : 1,
	school : "Conj",
	time : "1 a",
	range : "30 ft",
	components : "V,S,M\u0192",
	compMaterial : "A gold vial worth at least 100 gp",
	duration : "Conc, 1 hr",
	description : "Create ooze spirit; disappears at 0 HP or spell ends; takes turn after you, obeys verbal commands; see B",
	descriptionFull : "You call forth a magical ooze. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Ooze Spirit stat block. When you cast the spell, choose from Green, Red, or Yellow. The creature resembles the creature of your choice, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.\n   The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the Dodge action and uses its move to avoid danger." + AtHigherLevels + "When you cast this spell using a spell of 2nd level or higher, use the higher level whenever the spell's level appears in the stat block."
};
SpellsList["terrifying visions"] = {
	name : "Terrifying Visions",
	classes : ["bard"],
	source : [["KCCC", 145]],
	level : 1,
	school : "Illus",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Wis",
	description : "1 crea takes 3d6+1d6/SL Psychic dmg, must use rea to move away; save halves and no move",
	descriptionFull : "You instil a vision of terrifying hallucinations into the mind of a target you can see. The target must make a Wisdom saving throw. On failure, it takes 3d6 psychic damage and must immediately use its reaction to move to move it's movement speed directly away from you. This movement does not force the creature to move into any hazard or take movements that cause it to take damage (such as jumping off a cliff or moving into a spell effect). On a successful save, the target takes half as much damage and isn't forced to move." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st."
};
SpellsList["thunderburst mine"] = {
	name : "Thunderburst Mine",
	classes : ["inventor"],
	source : [["KCCC", 146]],
	level : 2,
	school : "Abjur",
	time : "1 min",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "Any Tiny nonmagical item, which is destroyed by the activation of the spell",
	duration : "8 h",
	save : "Con",
	description : "Detonate item if crea in 5 ft or rea command; 20 ft-rad 3d8 Thunder dmg, save halves; see book",
	descriptionFull : "You can set a magical trap by infusing explosive magic into an item. You can set this item to detonate when someone comes within 5 feet of it, or by a verbal command using your reaction (one or more mines can be detonated)."+
	"\n   When the magic trap detonates, each creature in a 10-foot-radius sphere centered on the item must make a Constitution saving throw. A creature takes 3d8 thunder damage on a failed save, or half as much damage on a successful one. If a creature is in the area of effect of more than one thunderburst mine during a turn, they take half damage from any mines beyond the first."+
	"\n   A magical mine must be set 5 feet or more from another mine, and can't be moved once placed; any attempt to move it results in it detonating unless the casterer that set it disarms it with an action."
};
SpellsList["thunder note"] = {
	name : "Thunder Note",
	classes : ["bard"],
	source : [["KCCC", 146]],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	description : "1d8 Thunder dmg, deafened until their next turn; Conc. save made with disadv; +1d8 at CL 5, 11, and 17",
	descriptionCantripDie : "`CD`d8 Thunder dmg, deafened until their next turn; Concentration save made with disadv",
	descriptionFull : "You emit a crashing bang with a localized point of intensity targeting a creature within range. The target must succeed on a Constitution saving throw or take 1d8 thunder damage and become deafened until the start of their next turn. Constitution saving throws to maintain concentration on spells triggered by this damage are made with disadvantage.\n   This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
};
SpellsList["thunder punch"] = {
	name : "Thunder Punch",
	classes : ["sorcerer", "wizard"],
	source : [["KCCC", 146]],
	level : 1,
	school : "Evoc",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "Instantaneous",
	description : "Melee spell atk for 3d8+1d8/SL Thunder dmg, pushed 10 ft away; audible from up to 300 ft",
	descriptionFull : "You charge your hand (or similar appendage) with thunder power. Make a melee spell attack against the target. On a hit, there is a thunderous crash audible from up to 300 feet of you and the target takes 3d8 thunder damage, and is knocked 10 feet away from you." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st."
};
SpellsList["thunder pulse"] = {
	name : "Thunder Pulse",
	classes : ["bard", "sorcerer", "wizard"],
	source : [["KCCC", 146]],
	level : 3,
	school : "Evoc",
	time : "1 a",
	range : "S:15" + (typePF ? "-" : "") + "ft cone",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Con",
	description : "3d8+1d8/SL Thunder dmg, pushed 10ft; save halves, not pushed; 1 a to create new shockwave",
	descriptionFull : "You gather sonic energy and can expel as a shockwave in a 15-foot cone. Each creature in that area must make a Constitution saving throw. On a failed save, a creature takes 3d8 thunder damage is knocked 10 feet away. On a successful save, the creature takes half as much damage and not being knocked away.\n   You can create a new shockwave as your action on subsequent turn until the spell ends." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d8 for each slot level above 3rd."
};
SpellsList["tornado"] = {
	name : "Tornado",
	classes : ["druid", "sorcerer", "wizard"],
	source : [["KCCC", 146]],
	level : 5,
	school : "Trans",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Str",
	description : "20ft rad x 40ft tall; start turn 4d8 Bludgeoning dmg, push 10ft x 40ft up, save halves, no push; see B",
	descriptionFull : "A whirling tornado erupts, filling a 20-foot-radius, 40-foot-high cylinder centered on a point within range.\n   Any creature that starts its turn within the tornado must make a Strength saving throw. On a failed save, the creature takes 4d8 bludgeoning damage and is pushed 10 feet away and 40 feet up. On a successful save, the creature takes half as much damage and isn't pushed.\n   As a bonus action, you can move the tornado up to 30 feet in any direction. Any ranged weapon attack against a target within 20 feet of the tornado has disadvantage, and any ranged attack that passes through it automatically misses."
};
SpellsList["translocation shot"] = {
	name : "Translocation Shot",
	classes : ["inventor", "ranger", "wizard"],
	source : [["KCCC", 146]],
	level : 4,
	school : "Abjur",
	time : "1 bns",
	range : "5 ft",
	components : "V,S,M\u0192",
	compMaterial : "A piece of ammunition worth at least 1 cp",
	duration : "Conc, 1 min",
	description : "Bind crea to ammo; teleported to shot location w/n 5 ft, Large-4 creas; SL6: Huge-9 creas",
	descriptionFull : "You magically bind a willing creature within range into a piece of ammunition. When the piece of ammunition is fired, the creature bound to the piece of ammunition is teleported to the target destination. You can fire the ammunition at a creature, object, or point within the normal range of the weapon. When attacking a creature or object, the target is teleported to within 5 feet of the target hit or miss."+
	"\n   When you cast this spell, if you cast it a Large or larger piece of ammunition, you can bind up to 4 creatures to the piece of ammunition."+
	AtHigherLevels + "When you using 6th-level slot or higher, you can cast it on a Huge piece of ammunition, binding up to nine creatures to the piece of ammunition."
};
SpellsList["trary's terrific transposition"] = {
	name : "Trary's Terrific Transposition",
	nameShort : "Terrific Transposition",
	classes : ["inventor", "occultist", "wizard"],
	source : [["KCCC", 147]],
	ritual : true,
	level : 3,
	school : "Conj",
	time : "10 min",
	range : "S:10 ft-rad",
	components : "V,S,M\u0192",
	compMaterial : "An ornate brass key worth at least 100 gp, and a satchel or bag worth at least 1 sp",
	duration : "Instantaneous",
	description : "Chosen objs are compressed into container; 1/100 weight; casting spell again uncompresses items",
	descriptionFull : "You weave an enchantment that conjures compresses all objects of your choice within range into a the satchel or bag used in casting the spell. The contents become harmlessly compressed and stored in an magical state of miniaturized suspension within the container. The weight of miniaturized stored items is the weight of the item divided by one hundred. The bag can store all items that fit in the radius when the spell is cast, but can't store any individual item larger than Medium. Items can't be individually removed from the bag, but the process can be reversed by casting the spell again, at which point all items are deposited from the bag in the arrangement they were before being stored."+
	"\n   If the bag is destroyed or placed into an interdimensional space, the contents of the bag are instantly emptied onto the ground in a chaotic manner, each item taking 4d4 force damage, but dealing no damage to anything else. If the bag is broken, the key used as a material in casting the spell breaks."
};
SpellsList["turbulent warp"] = {
	name : "Turbulent Warp",
	classes : ["psion"],
	source : [["KCCC", 147]],
	level : 3,
	school : "Psion",
	time : "1 a",
	range : "90 ft",
	components : "S",
	duration : "Instantaneous",
	save : "Cha",
    description : "I & willing crea teleport; Creas in 10ft of old space 5d4+2d4/SL Force dmg, teleported 5ft; save halves",
	descriptionFull : "You teleport yourself to an unoccupied space you can see within range, leaving behind a spatial distortion. Each creature within 10 feet of the space you left must make a Charisma saving throw. On a failure, they take 5d4 force damage and are teleported to an empty space of your choice within 5 feet of where they were. On success they take half as much damage and are not teleported." +
	"\n   You can also teleport one willing creature of your size or smaller who is carrying gear up to its carrying capacity. The creature must be within 5 feet of you when you cast this spell, and there must be an unoccupied space within 5 feet of your destination space for the creature to appear in; otherwise, the creature is left behind." +
	AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 2d4 for each slot level above 3rd."
};
SpellsList["unburden"] = {
	name : "Unburden",
	classes : ["inventor"],
	source : [["KCCC", 147]],
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "1 h",
	description : "Crea ignores penalties to speed or Dexterity (Stealth) from armor; encumberance weigh doubled",
	descriptionFull : "A creature you touch no longer suffers the penalties to its speed or to its Dexterity (Stealth) checks from wearing medium or heavy armor, and is no longer encumbered from carry weight unless it is carrying more than twice the weight that would encumber it."
};
SpellsList["unlocked potential"] = {
	name : "Unlocked Potential",
	classes : ["psion"],
	source : [["KCCC", 147]],
	level : 1,
	school : "Psion",
	time : "1 a",
	range : "60 ft",
	components : "S",
	duration : "Conc, 1 min",
    description : "1/turn, target creature can take 1 psychic damage to add d4 to any attack, damage roll, or save",
	descriptionFull : "You unlock the potential of a creature's mind, allowing it to fully reach its limits. For the duration, once per turn the creature can add 1d4 to any attack roll, damage roll, or saving throw it makes. Each time it adds the extra 1d4, it takes 1 psychic damage as it pushes beyond its natural limitations."
};
SpellsList["unstable explosion"] = {
	name : "Unstable Explosion",
	classes : ["sorcerer", "warlock", "wizard"],
	source : [["KCCC", 147]],
	level : 2,
	school : "Evoc",
	time : "1 a",
	range : "60ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Dex",
	description : "10ft rad; roll 3d6, each 6 +5ft rad and +1d6 dmg; take Fire dmg = to rolled total+1d6/SL; save halves",
	descriptionFull : "You cause an unstable explosion to erupt at a point of your choice within range, rolling 3d6. For each die that rolls a 6, roll an additional d6 and the radius of the spell expands by 5 feet. Each creature within the final range of the spell must make a Dexterity saving throw. On a failed save, they take fire damage equal to the total value of the rolled dice. On a success the target, the target takes half as much fire damage." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd."
};
SpellsList["vicious vapors"] = {
	name : "Vicious Vapors",
	classes : ["druid", "occultist", "warlock", "wizard"],
	source : [["KCCC", 147]],
	level : 2,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Con",
	description : "5ft cube; crea enters/starts turn: 1d12 Poison dmg, poisoned; save halves, no poisoned; bns: move 20ft",
	descriptionFull : "You fill the air with poisonous vapors in a cube 5 feet on each side. A creature must make a Constitution saving throw when it enters the spell's area for the first time on their turn or starts its turn there. On a failed save, they take 1d12 poison damage and become poisoned until the end of their next turn. On a successful save, they take half as much damage and do not become poisoned.\n   You can move the cloud of vapors up to 20 feet as a bonus action during your turn."
};
SpellsList["vorpal weapon"] = {
	name : "Vorpal Weapon",
	classes : ["inventor"],
	source : [["KCCC", 148]],
	level : 5,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S,M\u0192",
	compMaterial : "A weapon worth a least 1 cp",
	duration : "Conc, 1 h",
	description : "+3 magic weapon, ignore slash resist, x2 dmg to objs, critical hit on crea w/ 50 HP or less kills",
	descriptionFull : "You touch a weapon and imbue it with power. Until the spell ends, the weapon becomes indescribably sharp, ignoring resistance to slashing damage, and gains the Siege property, dealing double damage to inanimate objects such as structures. If a weapon has a modifier of less than +3 to attack and damage rolls, its modifier becomes +3 to attack and damage rolls for the duration of the spell."+
	"\n   Additionally, if a critical strike of this weapon would leave a creature with less than 50 hit points, the target creature is decapitated, killing it."
};
SpellsList["vortex blast"] = {
	name : "Vortex Blast",
	classes : ["druid", "occultist", "sorcerer", "wizard"],
	source : [["KCCC", 148]],
	level : 3,
	school : "Evoc",
	time : "1 a",
	range : "S:30" + (typePF ? "-" : "") + "ft cone",
	components : "V,S",
	duration : "Instantaneous",
	save : "Str",
	description : "2d6+1d6/SL Bludgeoning dmg; save or pushed 20ft away and 40ft up",
	descriptionFull : "You create a sudden violent vortex that blasts outwards in a 30-foot cone, tossing characters and objects within the area. Creatures in the area take 2d6 bludgeoning damage and must succeed a Strength saving throw or be knocked 20 feet backward and 40 feet upward." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd."
};
SpellsList["water blast"] = {
	name : "Water Blast",
	classes : ["druid", "occultist", "sorcerer", "warlock", "wizard"],
	source : [["KCCC", 148]],
	level : 1,
	school : "Conj",
	time : "1 a",
	range : "30 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Str",
	description : "Ranged spell atk for 3d6+1d6/SL Bludgeoning dmg; Large or smaller save or prone",
	descriptionFull : "You conjure a ball of water before hurling it at a target. Make a ranged spell attack against the target. On a hit, the target takes 3d6 bludgeoning damage and if it is Large or smaller must make a Strength saving throw or be knocked prone." + AtHigherLevels + "When you cast this spell using a spell lot of 2nd level or higher, the damage increases by 1d6 for each level above 1st."
};
SpellsList["water cannon"] = {
	name : "Water Cannon",
	classes : ["druid", "sorcerer", "wizard"],
	source : [["KCCC", 148]],
	level : 3,
	school : "Evoc",
	time : "1 a",
	range : "S:30" + (typePF ? "-" : "") + "ft line",
	components : "V,S",
	duration : "Instantaneous",
	save : "Str",
	description : "5ft wide; 6d6 Bludgeoning dmg, pushed to end, on collision +2d6 dmg, prone; save haves, not pushed",
	descriptionFull : "You unleash a spout of water that blasts out in a 30-foot line that is 5 feet wide. Creatures in the area must make a Strength saving throw, or take 6d6 bludgeoning damage and be pushed to an open space at the end of the line away from you. If there is no open space to move to (for example they would move into a wall or another creature), they are pushed to the closest space and take an extra 2d6 bludgeoning damage and are knocked prone. On a successful save, they take half as much damage and are not pushed."
};
SpellsList["windborne weapon"] = {
	name : "Windborne Weapon",
	classes : ["druid", "sorcerer", "wizard"],
	source : [["KCCC", 148]],
	level : 0,
	school : "Trans",
	time : "1 a",
	range : "150 ft",
	components : "V,S,M\u0192",
	compMaterial : "A piece of ammunition or a weapon with the thrown property worth at least 1 cp",
	duration : "Instantaneous",
	description : "Ranged spell atk, ignores cover; 1d8 of the weapon's dmg type; +1d8 at CL 5, 11, and 17",
	descriptionCantripDie : "Ranged spell atk, ignores cover; `CD`d8 of the weapon's dmg type",
	descriptionFull : "Make an attack using this spell's material component as part of the action used to cast this spell, turning it into a ranged spell attack. This attack ignores cover. On hit, it deals 1d8 damage of the weapon's damage type." + AtHigherLevels + "This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
};
// Cantrips written as Weapons for first page
WeaponsList["burn"] = {
	regExpSearch : /burn/i,
	name : "Burn",
	source : [["KCCC", 130]],
	list : "spell",
	ability : 6,
	type : "Cantrip",
	damage : ["C", 12, "fire"],
	range : "Melee",
	description : "",
	abilitytodamage : false
};
WeaponsList["force bolt"] = {
	regExpSearch : /^(?=.*force)(?=.*bolt).*$/i,
	name : "Force Bolt",
	source : [["KCCC", 136]],
	list : "spell",
	ability : 6,
	type : "Cantrip",
	damage : ["=C*2", 4, "force"],
	range : "120 ft",
	description : "",
	abilitytodamage : false
};
WeaponsList["thunder note"] = {
	regExpSearch : /^(?=.*thunder)(?=.*note).*$/i,
	name : "Thunder Note",
	source : [["KCCC", 146]],
	list : "spell",
	ability : 6,
	dc : true,
	type : "Cantrip",
	damage : ["C", 8, "thunder"],
	range : "60 ft",
	description : "Con save, success - no damage; fail - deafened, Concentration saves against this damage have disadvantage",
	abilitytodamage : false
};
WeaponsList["windborne weapon"] = {
	regExpSearch : /^(?=.*windborne)(?=.*weapon).*$/i,
	name : "Windborne Weapon",
	source : [["KCCC", 148]],
	list : "spell",
	ability : 6,
	type : "Cantrip",
	damage : ["C", 8, "Bludgeoning"],
	range : "150 ft",
	description : "Ignores cover; damage type depends on weapon",
	abilitytodamage : false
};
} // SPELLS END
