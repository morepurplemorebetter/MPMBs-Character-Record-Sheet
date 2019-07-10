// Copy all the attributes of a field to another field (or even swap between the two)
// excl is an object with optional attributes { userName : true, submitName : true, readonly : true, noCalc : true }
function copyField(fldFromName, fldToName, excl, swap) {
	var fldTo = tDoc.getField(fldToName);
	var fldFrom = tDoc.getField(fldFromName);
	if (!fldTo || !fldFrom || fldTo.type !== fldFrom.type) return;

	if (!excl) excl = {};

	// a function to do the actual copying
	var copy = function(fromObj, toObj, justObj) {
		if (fromObj.type == "checkbox") {
			if (justObj) {
				toObj.isBoxCheckVal = fromObj.isBoxChecked(0);
				toObj.isBoxChecked = function() { return saveTo.isBoxCheckVal; };
				toObj.type = "checkbox";
			} else {
				toObj.checkThisBox(0, fromObj.isBoxChecked(0));
			}
		} else {
			toObj.value = fromObj.value;
			if (justObj) toObj.type = "text";
		}
		if (!excl.userName) toObj.userName = fromObj.userName;
		if (!excl.submitName) toObj.submitName = fromObj.submitName;
		if (!excl.readonly) toObj.readonly = fromObj.readonly;
		if (fromObj.type == "text" && !excl.noCalc && !justObj) {
			toObj.setAction("Calculate", toObj.submitName);
		}
	}

	// If swapping the fields, first save the fldTo attributes to a separate object
	if (swap) {
		var saveTo = {};
		copy(fldTo, saveTo, true);
	}

	// Apply the attributes to the fldTo
	copy(fldFrom, fldTo);

	// If swapping the fields, now apply the fldTo attributes to the fldFrom from the object
	if (swap) copy(saveTo, fldFrom);
}

// a function to get the different versions of names used
function GetFeatureType(type) {
	var theReturn = "classes";
	switch (type.toLowerCase()) {
		case "classes":
		case "class":
			theReturn = "classes";
			break;
		case "backgrounds":
		case "background":
			theReturn = "background";
			break;
		case "races":
		case "race":
			theReturn = "race";
			break;
		case "feats":
		case "feat":
			theReturn = "feats";
			break;
		case "magicitems":
		case "magicitem":
		case "magic item":
		case "magic items":
		case "items":
		case "item":
			theReturn = "items";
			break;
		case "magic":
			theReturn = "magic";
			break;
	};
	return theReturn;
}

/*	---- ApplyFeatureAttributes ----
	A function to handle all the common attributes a feature can have
	Input:
		type - the type of thing being processed
			STRING "class", "race", "feat", or "item"
		fObjName - the object name; array only for class/race with features
			if type="feat" or type="item":
				STRING
			if type="class" or type="race":
				ARRAY [STRING: class/race-name, STRING: feature-name]
				// for a race, if the feature-name is also the race-name, the parent race object will be used
		lvlA - old and new level and a true/false to force updating regardless of old-level
			ARRAY [INTEGER: old-level, INTEGER: new-level, BOOLEAN: force-apply]
		choiceA - child object names of overriding choice
			ARRAY [STRING: old-choice, STRING: new-choice, STRING: "only","change"]
			// if 'only-choice' is set to true, it is viewed as an extra-choice and just the child features will be used (e.g. Warlock Invocations)
		forceNonCurrent - the parent object name if the sheet is to use the original list object and not the CurrentXXX (CurrentRace, CurrentClasses)
			STRING
	Examples:
		ApplyFeatureAttributes("feat", "grappler", [0,1,false], false, false);
		ApplyFeatureAttributes("class", ["warlock","pact boon"], [4,4,true], ["pact of the blade","pact of the chain","change"], false); // change from Pact of the Blade to Pact of the Chain
		ApplyFeatureAttributes("class", ["warlock","eldritch invocations"], [0,4,true], ["","devil's sight","only"], false); // add Devil's Sight
		ApplyFeatureAttributes("class", ["warlock","eldritch invocations"], [15,0,true], ["devil's sight","","only"], false); // remove Devil's Sight
*/
function ApplyFeatureAttributes(type, fObjName, lvlA, choiceA, forceNonCurrent) {
	if (!IsNotReset) return; //stop this function on a reset

	// validate input
	if (!lvlA) lvlA = [0,1,false];
	if (!choiceA) choiceA = ["","",false];
	type = type.toLowerCase();
	// base variables
	var FeaChoice = "", FeaOldChoice = "", tipNmExtra = "";
	var aParent = fObjName;
	var lvlH = Math.max(lvlA[0], lvlA[1]), lvlL = Math.min(lvlA[0], lvlA[1]);
	var defaultUnits = What("Unit System") === "imperial";
	var choiceLimFeaTooltip;

	// the function to run an eval string/function
	var runEval = function(evalThing, attributeName, ignoreUnits) {
		if (!evalThing) return;
		try {
			var convertUnits = false;
			if (typeof evalThing == 'string') {
				var convertUnits = !defaultUnits && !ignoreUnits && !(/ConvertTo(Metric|Imperial)/).test(evalThing);
				if (convertUnits) evalThing = ConvertToMetric(evalThing, 0.5);
				eval(evalThing);
			} else if (typeof evalThing == 'function') {
				evalThing(lvlA, choiceA);
			}
		} catch (error) {
			// the error could be caused by the ConvertToMetric function, so try it without to see if that works
			if (convertUnits) {
				runEval(evalThing, attributeName, true);
				return;
			}
			var eText = "The " + attributeName + " from '" + fObjName + (aParent ? "' of the '" + aParent : "") + "' " + type + " produced an error! Please contact the author of the feature to correct this issue:\n " + error + "\n ";
			for (var e in error) eText += e + ": " + error[e] + ";\n ";
			console.println(eText);
			console.show();
		}
	}

	// the function to run all regular level-independent attributes
	// addIt = true to add things and addIt = false to remove things
	var useAttr = function(uObj, addIt, skipEval, objNm) {
		var uniqueObjNm = objNm == undefined ? fObjName : fObjName + objNm; // has to be unique
		var tipNm = displName;
		var useSpCasting = objNm && (type === "feat" || type === "magic item") ? objNm : aParent;
		if (cnt > 1) {
			tipNm += " (" + cnt + ")";
			if (cntCh > 1) uniqueObjNm += " (" + cntCh + ")";
		}
		if (!uObj.name || displName !== uObj.name) {
			if (type === "feat" || type === "magic item") {
				if (uObj.name) {
					tipNm = uObj.name;
				} else if (objNm && fObj.choices) {
					for (var j = 0; j < fObj.choices.length; j++) {
						if (fObj.choices[j].toLowerCase() == objNm) {
							tipNm = displName + " [" + fObj.choices[j] + "]";
							break;
						}
					}
				}
				if (cntCh > 1) tipNm += " (" + cntCh + ")";
				if (addIt) choiceLimFeaTooltip = tipNm;
			} else if (uObj.name) {
				tipNm = displName + ": " + uObj.name;
			}
		}
		var tipNmF = tipNm + (tipNmExtra ? " " + tipNmExtra : "");

		// we should add the options for weapons/armours/ammos before adding the item itself
		// but we should be removing them only after removing the item itself
		var addListOptions = function() {
			if (uObj.armorOptions) processArmorOptions(addIt, tipNm, uObj.armorOptions, type === "magic item");
			if (uObj.ammoOptions) processAmmoOptions(addIt, tipNm, uObj.ammoOptions, type === "magic item");
			if (uObj.weaponOptions) processWeaponOptions(addIt, tipNm, uObj.weaponOptions, type === "magic item");
		}

		// run eval or removeeval first
		var evalType = addIt ? "eval" : "removeeval";
		if (!skipEval && uObj[evalType]) runEval(uObj[evalType], evalType);

		if (uObj.calcChanges) addEvals(uObj.calcChanges, tipNmF, addIt);
		if (uObj.savetxt) SetProf("savetxt", addIt, uObj.savetxt, tipNmF);
		if (uObj.speed) SetProf("speed", addIt, uObj.speed, tipNmF);
		if (uObj.addMod) processMods(addIt, tipNmF, uObj.addMod);
		if (uObj.saves) processSaves(addIt, tipNmF, uObj.saves);
		if (uObj.toolProfs) processTools(addIt, tipNmF, uObj.toolProfs);
		if (uObj.languageProfs) processLanguages(addIt, tipNmF, uObj.languageProfs);
		if (uObj.vision) processVision(addIt, tipNmF, uObj.vision);
		if (uObj.dmgres) processResistance(addIt, tipNmF, uObj.dmgres);
		if (uObj.action) processActions(addIt, tipNmF, uObj.action, uObj.limfeaname ? uObj.limfeaname : uObj.name);
		if (uObj.extraLimitedFeatures) processExtraLimitedFeatures(addIt, tipNmF, uObj.extraLimitedFeatures);
		if (uObj.extraAC) processExtraAC(addIt, tipNmF, uObj.extraAC, uObj.name);
		if (uObj.toNotesPage) processToNotesPage(addIt, uObj.toNotesPage, type, uObj, fObj, [tipNm, displName, fObjName, aParent]);
		if (uObj.carryingCapacity) SetProf("carryingcapacity", addIt, uObj.carryingCapacity, tipNmF);
		if (uObj.advantages) processAdvantages(addIt, tipNmF, uObj.advantages);

		// --- backwards compatibility --- //
		var abiScoresTxt = uObj.scorestxt ? uObj.scorestxt : uObj.improvements ? uObj.improvements : false;
		if (uObj.scores || abiScoresTxt) processStats(addIt, type, tipNm, uObj.scores, abiScoresTxt, false, uObj.scoresMaximum);
		if (uObj.scoresOverride) processStats(addIt, type, tipNm, uObj.scoresOverride, abiScoresTxt, "overrides");
		if (uObj.scoresMaximum) processStats(addIt, type, tipNm, uObj.scoresMaximum, abiScoresTxt, "maximums");

		// spellcasting
		if (uObj.spellcastingBonus) processSpBonus(addIt, uniqueObjNm, uObj.spellcastingBonus, type, aParent, objNm);
		if (CurrentSpells[useSpCasting] && (uObj.spellFirstColTitle || uObj.spellcastingExtra || uObj.spellChanges)) {
			CurrentUpdates.types.push("spells");
			if (uObj.spellFirstColTitle) CurrentSpells[useSpCasting].firstCol = addIt ? uObj.spellFirstColTitle : false;
			if (uObj.spellcastingExtra) CurrentSpells[useSpCasting].extra = addIt ? uObj.spellcastingExtra : false;
			if (uObj.spellChanges) processSpChanges(addIt, tipNmF, uObj.spellChanges, useSpCasting);
		}

		if (addIt) addListOptions(); // add weapon/armour/ammo option(s)

		// --- backwards compatibility --- //
		// armor and weapon proficiencies
		var weaponProf = uObj.weaponProfs ? uObj.weaponProfs : (/^(class|feat)$/).test(type) && uObj.weapons ? uObj.weapons : uObj.weaponprofs ? uObj.weaponprofs : false;
		if (weaponProf) processWeaponProfs(addIt, tipNmF, weaponProf);
		var armorProf = uObj.armorProfs ? uObj.armorProfs : uObj.armor ? uObj.armor : false;
		if (armorProf) processArmourProfs(addIt, tipNmF, armorProf);

		// --- backwards compatibility --- //
		// armor, shield, and weapon additions
		var aWeaponsAdd = uObj.weaponsAdd ? uObj.weaponsAdd : type == "race" && uObj.weapons ? uObj.weapons : false;
		if (aWeaponsAdd) processAddWeapons(addIt, aWeaponsAdd);
		var anArmorAdd = uObj.armorAdd ? uObj.armorAdd : uObj.addarmor ? uObj.addarmor : false;
		if (anArmorAdd) processAddArmour(addIt, anArmorAdd);
		if (uObj.shieldAdd) processAddShield(addIt, uObj.shieldAdd, uObj.weight);

		// --- backwards compatibility --- //
		// skills additions
		var skillsTxt = uObj.skillstxt ? uObj.skillstxt : uObj.skills && type == "feat" && !isArray(uObj.skills) ? uObj.skills : false;
		if (skillsTxt) skillsTxt = skillsTxt.replace(/^( |\n)*.*: |\;$|\.$/g, '');
		var skills = uObj.skills && (type != "feat" || (type == "feat" && isArray(uObj.skills))) ? uObj.skills : false;
		if (skills || skillsTxt) processSkills(addIt, tipNmF, skills, skillsTxt);

		if (!addIt) addListOptions(); // remove weapon/armour/ammo option(s)
	};

	// set the main variables, determined by type
	switch (GetFeatureType(type)) {
		case "classes":
			type = "class";
			aParent = fObjName[0];
			fObjName = fObjName[1];
			var fObj = forceNonCurrent && ClassList[aParent].features[fObjName] && !choiceA[0] ? ClassList[aParent].features[fObjName] : CurrentClasses[aParent].features[fObjName];
			var displName = fObjName.indexOf("subclassfeature") !== -1 ? CurrentClasses[aParent].fullname : CurrentClasses[aParent].name;

			// --- backwards compatibility --- //
			// also create some variables that (old) eval scripts tend to use
			var oldClassLvl = {}; oldClassLvl[aParent] = lvlA[0];
			var newClassLvl = {}; newClassLvl[aParent] = lvlA[1];
			var ClassLevelUp = {}; ClassLevelUp[aParent] = [lvlA[1] >= lvlA[0], lvlL, lvlH];

			break;
		case "race":
			type = "race";
			aParent = fObjName[0];
			fObjName = fObjName[1];
			var fObj = aParent == fObjName && !CurrentRace.features[fObjName] ?
					(forceNonCurrent ? RaceList[aParent] : CurrentRace) :
				forceNonCurrent && RaceList[aParent].features[fObjName] && !choiceA[0] ?
					RaceList[aParent].features[fObjName] : CurrentRace.features[fObjName];
			var displName = CurrentRace.name;
			break;
		case "background":
			type = "background";
			var fObj = forceNonCurrent && BackgroundList[fObjName] ? BackgroundList[fObjName] : CurrentBackground;
			var displName = fObj.name;
			break;
		case "feats":
			type = "feat";
			var fObj = FeatsList[fObjName];
			var displName = fObj.name;
			tipNmExtra = "(feat)";
			break;
		case "items":
			type = "magic item";
			var fObj = MagicItemsList[fObjName];
			var displName = fObj.name;
			tipNmExtra = "(magic item)";
			break;
	};

	if (!fObj) {
		console.println("The '" + fObjName + (aParent ? "' of the '" + aParent : "") + "' " + type + " could not be found! Please contact the author of the feature to correct this issue.");
		console.show();
		return false;
	};

	if (fObj.minlevel && fObj.minlevel > lvlH) return false; // no reason to continue with this function

	// Are we to do anything with the feature?
	var CheckLVL = lvlA[2] ? true : fObj.minlevel ? fObj.minlevel <= lvlH && fObj.minlevel > lvlL : lvlL == 0;
	// Add (true) or remove (false) the feature's attributes?
	var AddFea = fObj.minlevel ? fObj.minlevel <= lvlA[1] : 0 < lvlA[1];

	// Get the choice, if any choices exist, it was selected in the past, and not entered into this function
	if (!choiceA[1] && !choiceA[2] && fObj.choices) {
		choiceA[1] = GetFeatureChoice(type, aParent, aParent !== fObjName ? fObjName : "", false);
		if (choiceA[1] && !choiceA[0]) choiceA[0] = choiceA[1];
	}

	// --- backwards compatibility --- //
	// First do the eval attribute of the main object, as it might change things for the choice
	var skipMainEval = false;
 	if (!choiceA[2] && CheckLVL && AddFea && fObj.eval && (typeof fObj.eval == "string") && (/Fea(Old)?Choice/).test(fObj.eval)) {
		runEval(fObj.eval, "eval");
		skipMainEval = true;
		// redo the choice array, as the eval might have changed it
		if (FeaOldChoice) choiceA[0] = FeaOldChoice;
		if (FeaChoice) choiceA[1] = FeaChoice;
	}

	// set the choice objects, if any
	var cOldObj = choiceA[0] && fObj[choiceA[0]] ? fObj[choiceA[0]] : false;
	var cNewObj = choiceA[1] && fObj[choiceA[1]] ? fObj[choiceA[1]] : false;
	var cJustChange = (/change|update/).test(choiceA[2]) && cOldObj && cNewObj && choiceA[0] != choiceA[1];
	var cOnly = ((AddFea && cNewObj) || (!AddFea && cOldObj)) && (/only/).test(choiceA[2]);

	// Now if there was a choice, and this is a feat or an item, check for duplicates
	var cnt = 0, cntCh = 0;
	if (type === "feat" || type === "magic item") {
		var checkObj = type === "feat" ? CurrentFeats : CurrentMagicItems;
		for (var i = 0; i < checkObj.known.length; i++) {
			if (checkObj.known[i] == fObjName) {
				cnt++;
				if ((choiceA[0] && checkObj.choices[i] == choiceA[0]) || (choiceA[1] && checkObj.choices[i] == choiceA[1])) cntCh++;
			}
		}
	}

	// get the level-dependent attributes for the current and old levels
	var Fea = GetLevelFeatures(fObj, lvlA[1], cNewObj ? choiceA[1] : false, lvlA[0], cOldObj ? choiceA[0] : cOnly ? choiceA[1] : false, cOnly);
	// add some of the current variables to this object, so it is given in the return
	Fea.CheckLVL = CheckLVL;
	Fea.AddFea = AddFea;
	Fea.Choice = choiceA[1];
	Fea.ChoiceOld = choiceA[0];

	// now do all the level-independent attributes, only if this is mandated by the level change
	if (CheckLVL) {
		// do the main object if not only interested in the choice, but without the eval as we just did that already
		if (!choiceA[2]) useAttr(fObj, AddFea, skipMainEval);
		// if we are are changing the choice or removing the feature, now remove the old choice
		//if (cJustChange || (!AddFea && cOldObj)) {
		if (cOldObj && (cJustChange || !AddFea)) {
			SetFeatureChoice(type, aParent, aParent !== fObjName ? fObjName : "", false, cOnly ? choiceA[0] : "");
			useAttr(cOldObj, false, false, choiceA[0]);
		}
		// if we are changing the choice or adding the feature, now add the new choice
		//if (cJustChange || cOnly || (AddFea && cNewObj)) {
		if (cNewObj && AddFea) {
			SetFeatureChoice(type, aParent, aParent !== fObjName ? fObjName : "", AddFea ? choiceA[1] : "", cOnly ? choiceA[1] : "");
			useAttr(cNewObj, true, false, choiceA[1]);
		}
	}
	// next do the level-dependent attributes, if any of them changed or we are supposed to do them
	if ((CheckLVL || Fea.changed) && (Fea.UseOld || Fea.UseCalcOld || Fea.Use || Fea.UseCalc)) {
		// remove the limited feature entry if it is no longer applicable
		if (lvlA[0] && (!AddFea || ((Fea.UseOld || Fea.UseCalcOld) && (Fea.UseName !== Fea.UseNameOld || (!Fea.Use && !Fea.UseCalc) || (/unlimited|\u221E/i).test(Fea.Use))))) {
			RemoveFeature(Fea.UseNameOld ? Fea.UseNameOld : Fea.UseName, lvlA[1] === 0 ? "" : Fea.UseOld, "", "", "", "", Fea.UseCalcOld);
			Fea.UseOld = 0;
		}
		// add the limited feature entry if it changed or added for the first time
		if (AddFea && (Fea.UseCalc || Fea.Use) && !(/unlimited|\u221E/i).test(Fea.Use)) {
			var tooltipName = choiceLimFeaTooltip ? choiceLimFeaTooltip : displName + (fObj.tooltip ? fObj.tooltip : displName !== fObj.name ? ": " + fObj.name : "");
			AddFeature(Fea.UseName, Fea.Use, Fea.Add ? " (" + Fea.Add + ")" : "", Fea.Recov, tooltipName, Fea.UseOld, Fea.UseCalc);
		}
	}

	// changeeval always at the end and regardless of AddFea or CheckLVL
	if (!cOnly && fObj.changeeval) runEval(fObj.changeeval, 'changeeval');
	if (cOldObj && cOldObj.changeeval) runEval(cOldObj.changeeval, 'changeeval');
	if (cNewObj && cNewObj.changeeval) runEval(cNewObj.changeeval, 'changeeval');

	// if this is a class feature (and not doing an extrachoice), always check if we need to update the dependencies
	if (type == "class" && !cOnly) {
		if (choiceA[1] && fObj.choiceDependencies) processClassFeatureChoiceDependencies(lvlA, aParent, fObjName, choiceA[1]);
		if (fObj.autoSelectExtrachoices) processClassFeatureExtraChoiceDependencies(lvlA, aParent, fObjName, fObj);
	}

	// return the level-dependent attributes so it doesn't have to be queried again
	return Fea;
}

// a function to apply the first-level attributes of a class object
// AddRemove - can be boolean (true = add all feature, false = remove all features)
//		or can be an Array of [oldsubclass, newsubclass]
function ApplyClassBaseAttributes(AddRemove, aClass, primaryClass) {
	// declare some variables
	var fObj = CurrentClasses[aClass];
	var n = primaryClass ? 0 : 1; // for backwards compatibility
	var nAttr = primaryClass ? "primary" : "secondary";

	// a way to see if we should process the attribute or not
	var checkIfIn = function(nObj, testObj, attrA, noN) {
		attrA[1] = attrA[1] ? attrA[1] : "nonExistentAttributeName";
		if (!nObj[attrA[0]] && !nObj[attrA[1]]) {
			// if the first object doesn't have either attribute, just stop
			return [false];
		}
		var useAttr = nObj[attrA[0]] ? attrA[0] : attrA[1];
		var subAttr = noN ? 0 : isArray(nObj[useAttr]) ? n : nAttr;
		if (!noN && !nObj[useAttr][subAttr]) {
			// the first object has an attribute, but not the right sub-attribute, so stop
			return [false];
		} else if (!testObj) {
			// there is no object to test against, so continue with the first object
			return [true, useAttr, subAttr];
		}
		var useAttr2 = testObj[attrA[0]] ? attrA[0] : testObj[attrA[1]] ? attrA[1] : false;
		return !useAttr2 || !testObj[useAttr2][noN ? 0 : isArray(testObj[useAttr2]) ? n : nAttr] ? [false] : [true, useAttr, subAttr];
	}

	// loop through the attributes and apply them
	var processAttributes = function (uObj, addIt, tipNmF, ifInObj) {
		// saves, if primary class
		if (primaryClass && checkIfIn(uObj, ifInObj, ['saves'], true)[0]) processSaves(addIt, tipNmF, uObj.saves);

		// skills
		var doSkills = checkIfIn(uObj, ifInObj, ['skills', 'skillstxt']);
		if (doSkills[0]) {
			var oSkills = false;
			var oSkillsTxt = false;
			if (doSkills[1] === "skillstxt") {
				// no 'skills' attribute, only 'skillstxt'
				oSkillsTxt = uObj.skillstxt[doSkills[2]];
			} else if (doSkills[1] === "skills" && uObj.skillstxt) {
				// both 'skills' and 'skillstxt' attributes
				oSkills = uObj.skills[doSkills[2]];
				oSkillsTxt = isArray(uObj.skillstxt) ? uObj.skillstxt[n] : uObj.skillstxt[nAttr];
			} else if (doSkills[2] == n && !isArray(uObj.skills[n]) && SkillsList.abbreviations.indexOf(uObj.skills[n]) == -1 && SkillsList.names.indexOf(uObj.skills[n]) == -1) {
				// --- backwards compatibility --- //
				// the class has skillstxt as skills attribute (pre v13)
				oSkillsTxt = uObj.skills[n].replace(/^( |\n)*.*: |\;$|\.$/g, '');
			} else {
				// no 'skillstxt' attribute, only 'skills'
				oSkills = uObj.skills[doSkills[2]];
			}
			processSkills(addIt, tipNmF, oSkills, oSkillsTxt);
		}

		// weapon proficiencies ('weapons' attribute for backwards compatibility)
		var doWeapons = checkIfIn(uObj, ifInObj, ['weaponProfs', 'weapons']);
		if (doWeapons[0]) processWeaponProfs(addIt, tipNmF, uObj[doWeapons[1]][doWeapons[2]]);

		// armour proficiencies ('armor' attribute for backwards compatibility)
		var doArmour = checkIfIn(uObj, ifInObj, ['armorProfs', 'armor']);
		if (doArmour[0]) processArmourProfs(addIt, tipNmF, uObj[doArmour[1]][doArmour[2]]);

		// tool proficiencies
		var doTools = checkIfIn(uObj, ifInObj, ['toolProfs']);
		if (doTools[0]) processTools(addIt, tipNmF, uObj.toolProfs[doTools[2]]);

		// spellcasting extra array
		if (CurrentSpells[aClass] && checkIfIn(uObj, ifInObj, ['spellcastingExtra'], true)[0]) {
			CurrentSpells[aClass].extra = !addIt ? "" : uObj.spellcastingExtra;
			CurrentUpdates.types.push("spells");
		}
	}

	if (!isArray(AddRemove)) {
		// just do the AddRemove for the object
		processAttributes(fObj, AddRemove, fObj.name, false);
	} else if (!AddRemove[0] && AddRemove[1]) {
		// adding a subclass while previously none was there
		var parentCl = fObj;
		var newSubCl = ClassSubList[AddRemove[1]];
		// first remove everything that is in class and also in the subclass
		processAttributes(parentCl, false, parentCl.name, newSubCl);
		// then add everything from the subclass
		processAttributes(newSubCl, true, newSubCl.subname);
	} else if (AddRemove[0] && !AddRemove[1]) {
		// removing a subclass, going back to just the class
		var oldSubCl = ClassSubList[AddRemove[0]];
		var parentCl = fObj;
		// first remove everything that is in the subclass
		processAttributes(oldSubCl, false, oldSubCl.subname);
		// then add everything from the class that is also in the subclass
		processAttributes(parentCl, true, parentCl.name, oldSubCl);
	} else if (AddRemove[0] && AddRemove[1]) {
		// changing subclasses
		var parentCl = fObj;
		var oldSubCl = ClassSubList[AddRemove[0]];
		var newSubCl = ClassSubList[AddRemove[1]];
		// first remove everything that is in old subclass
		processAttributes(oldSubCl, false, oldSubCl.subname);
		// then add everything from the class that is also in old subclass
		processAttributes(parentCl, true, parentCl.name, oldSubCl);
		// next remove everything that is in class and also in new subclass
		processAttributes(parentCl, false, parentCl.name, newSubCl);
		// lastly add everything from new subclass
		processAttributes(newSubCl, true, newSubCl.subname);
	}
}

// a function to set the choice for something (choice = objectname) or remove it (choice = false)
// put the objectname in extra for extrachoices (both when adding and when removing)
function SetFeatureChoice(type, objNm, feaNm, choice, extra) {
	choice = choice ? choice.toLowerCase() : false;
	extra = extra ? extra.toLowerCase() : false;
	type = GetFeatureType(type);
	if (type == "items" || type == "feats") return;
	if (!CurrentFeatureChoices[type]) CurrentFeatureChoices[type] = {};
	if (!choice) { // remove the choice
		if (!CurrentFeatureChoices[type][objNm]) return;
		var lookin = feaNm ? CurrentFeatureChoices[type][objNm][feaNm] : CurrentFeatureChoices[type][objNm];
		if (!lookin) return;
		if (extra) {
			if (lookin.extrachoices) {
				lookin.extrachoices.splice(lookin.extrachoices.indexOf(extra), 1);
				if (lookin.extrachoices.length == 0) delete lookin.extrachoices;
			}
		} else {
			if (lookin.choice) delete lookin.choice;
		}
		CurrentFeatureChoices = CleanObject(CurrentFeatureChoices); // remove any remaining empty objects
	} else { // add the choice
		if (!CurrentFeatureChoices[type][objNm]) CurrentFeatureChoices[type][objNm] = {};
		if (feaNm && !CurrentFeatureChoices[type][objNm][feaNm]) CurrentFeatureChoices[type][objNm][feaNm] = {};
		var touse = feaNm ? CurrentFeatureChoices[type][objNm][feaNm] : CurrentFeatureChoices[type][objNm];
		if (extra) {
			if (!touse.extrachoices) touse.extrachoices = [];
			if (touse.extrachoices.indexOf(extra) == -1) touse.extrachoices.push(extra);
		} else {
			touse.choice = choice;
		}
	}
	SetStringifieds("choices");
}

// a function to return the feature choice(s); if extra==true, returns array
function GetFeatureChoice(type, objNm, feaNm, extra) {
	var theReturn = extra ? [] : "";
	type = GetFeatureType(type);
	if (CurrentFeatureChoices[type] && CurrentFeatureChoices[type][objNm] && (!feaNm || CurrentFeatureChoices[type][objNm][feaNm])) {
		var useObj = feaNm ? CurrentFeatureChoices[type][objNm][feaNm] : CurrentFeatureChoices[type][objNm];
		var foundSel = extra ? useObj.extrachoices : useObj.choice;
		if (foundSel) theReturn = foundSel.slice();
	}
	return theReturn;
}

// a function to get a string of class feature choices just like how they use to be prior to v13 with the "Class Feature Remember" field
function classFeaChoiceBackwardsComp() {
	var chc = CurrentFeatureChoices.classes;
	if (!chc) return "";
	var returnStr = "";
	for (var aClass in chc) {
		for (var aFea in chc[aClass]) {
			var fea = chc[aClass][aFea];
			if (fea.choice) returnStr += [aClass, aFea, fea.choice].toString();
		}
	}
	return returnStr;
}

// a function to create the CurrentSpells global variable entry
function CreateCurrentSpellsEntry(type, fObjName, aChoice) {
	type = GetFeatureType(type);
	var fObjP = false;
	var setCSobj = function(oName) {
		if (!CurrentSpells[oName]) {
			CurrentSpells[oName] = {bonus : {}};
			CurrentUpdates.types.push("spells");
		}
		return CurrentSpells[oName];
	};
	switch (type.toLowerCase()) {
		case "classes":
			var fObj = CurrentClasses[fObjName];
			var aClass = classes.known[fObjName].name;
			var aSubClass = classes.known[fObjName].subclass;
			var sObj = setCSobj(fObjName);
			sObj.name = fObj.fullname;
			sObj.shortname = ClassList[aClass].spellcastingFactor ? ClassList[aClass].name : ClassSubList[aSubClass].fullname ? ClassSubList[aSubClass].fullname : ClassSubList[aSubClass].subname;
			sObj.level = classes.known[fObjName].level;
			if (sObj.typeSp == undefined) sObj.typeSp = "";
			sObj.refType = "class";
			break;
		case "race":
			var fObj = CurrentRace;
			var sObj = setCSobj(CurrentRace.known);
			sObj.name = fObj.name;
			sObj.typeSp = "race";
			sObj.level = fObj.level;
			sObj.refType = "race";
			break;
		case "feats":
			var fObj = FeatsList[fObjName];
			if (aChoice && fObj[aChoice]) {
				fObj = FeatsList[fObjName][aChoice];
				fObjP = FeatsList[fObjName];
				fObjName = aChoice;
			}
			var sObj = setCSobj(fObjName);
			sObj.name = fObj.name + " (feat)";
			sObj.typeSp = "feat";
			sObj.refType = "feat";
			break;
		case "items":
			var fObj = MagicItemsList[fObjName];
			if (aChoice && fObj[aChoice]) {
				fObj = MagicItemsList[fObjName][aChoice];
				fObjP = MagicItemsList[fObjName];
				fObjName = aChoice;
			}
			var sObj = setCSobj(fObjName);
			sObj.name = fObj.name + " (item)";
			sObj.typeSp = "item";
			sObj.refType = "item";
			break;
		default:
			return false;
	};
	if (aChoice && (type == "items" || type == "feats") && !fObj.name && fObjP && fObjP.choices) {
		for (var j = 0; j < fObjP.choices.length; j++) {
			if (fObjP.choices[j].toLowerCase() == aChoice) {
				sObj.name = fObjP.name + " [" + fObjP.choices[j] + "]" + " (item)";
				break;
			}
		}
	}
	if (!sObj.ability) sObj.ability = fObj.spellcastingAbility ? fObj.spellcastingAbility : fObj.abilitySave ? fObj.abilitySave : 0;
	if (!sObj.fixedDC && fObj.fixedDC) sObj.fixedDC = Number(fObj.fixedDC);
	if (!sObj.fixedSpAttack && fObj.fixedSpAttack) sObj.fixedSpAttack = Number(fObj.fixedSpAttack);
	if (fObjP) {
		if (!sObj.ability) sObj.ability = fObjP.spellcastingAbility ? fObjP.spellcastingAbility : fObjP.abilitySave ? fObjP.abilitySave : 0;
		if (!sObj.fixedDC && fObjP.fixedDC) sObj.fixedDC = Number(fObjP.fixedDC);
		if (!sObj.fixedSpAttack && fObjP.fixedSpAttack) sObj.fixedSpAttack = Number(fObjP.fixedSpAttack);
	}
	if (!sObj.abilityToUse) sObj.abilityToUse = getSpellcastingAbility(fObjName);
	return sObj;
}

// process a spellcastingBonus feature
function processSpBonus(AddRemove, srcNm, spBon, type, parentName, choice) {
	type = GetFeatureType(type);
	var useSpName = choice && (type === "feats" || type === "items") ? choice : parentName;
	if (!AddRemove && !CurrentSpells[useSpName]) return; // nothing to remove
	// create the spellcasting object if it doesn't yet exist
	var sObj = CurrentSpells[useSpName] ? CurrentSpells[useSpName] : CreateCurrentSpellsEntry(type, parentName, choice);
	// do something with the spellcastingBonus object
	if (!AddRemove) { // removing the entry
		delete sObj.bonus[srcNm];
		// now see if the bonus object is empty and if so, delete the whole entry
		if (!sObj.factor && !sObj.list && ObjLength(sObj.bonus) == 0) delete CurrentSpells[useSpName];
	} else { // adding the entry
		sObj.bonus[srcNm] = spBon;
		// see if this wants to change the spellcasting ability
		var spFeatItemLvl = false;
		var spAbility = !isArray(spBon) ? spBon.spellcastingAbility : false;
		var spFixedDC = !isArray(spBon) ? spBon.fixedDC : false;
		var spFixedSpAttack = !isArray(spBon) ? spBon.fixedSpAttack : false;
		if (isArray(spBon)) {
			for (var i = 0; i < spBon.length; i++) {
				if (!spFeatItemLvl && spBon[i].times && isArray(spBon[i].times)) spFeatItemLvl = true;
				if (spBon[i].spellcastingAbility) spAbility = spBon[i].spellcastingAbility;
				if (spBon[i].fixedDC) spFixedDC = spBon[i].fixedDC;
				if (spBon[i].fixedSpAttack) spFixedSpAttack = spBon[i].fixedSpAttack;
			}
		}
		if (spAbility) sObj.ability = spAbility;
		if (spFixedDC) sObj.fixedDC = spFixedDC;
		if (spFixedSpAttack) sObj.fixedSpAttack = spFixedSpAttack;
		// if concerning a feat or item, set the level only if the spellcastingBonus needs it
		if ((/feat|item/i).test(sObj.typeSp) && spFeatItemLvl) sObj.level = Math.max(Number(What("Character Level")), 1);
	}
	SetStringifieds('spells');
	CurrentUpdates.types.push("spells");
}

// process the spellChanges attribute
function processSpChanges(AddRemove, srcNm, spChng, parentName) {
	var spCast = CurrentSpells[parentName];
	var changeHead = "Changes by " + srcNm;
	if (!spCast || (!AddRemove && !spCast.spellAttrOverride)) return; // nothing to do
	if (AddRemove) { // adding
		if (!spCast.spellAttrOverride) spCast.spellAttrOverride = {};
		for (var aSpell in spChng) {
			if (!spCast.spellAttrOverride[aSpell]) spCast.spellAttrOverride[aSpell] = { changesObj : {} };
			var spObj = spCast.spellAttrOverride[aSpell];
			if (spChng[aSpell].changes) spObj.changesObj[changeHead] = "\n - " + spChng[aSpell].changes;
			for (var key in spChng[aSpell]) {
				if (key == "changes") continue;
				spObj[key] = spChng[aSpell][key];
			}
		}
	} else { // removing
		for (var aSpell in spChng) {
			var spObj = spCast.spellAttrOverride[aSpell];
			if (!spObj || !spObj.changesObj[changeHead]) continue;
			for (var key in spChng[aSpell]) {
				if (key == "changes") continue;
				delete spObj[key];
			}
			delete spObj.changesObj[changeHead];
			// now maybe delete this spellAttrOverride entry if its changesObj is empty
			if (!ObjLength(spObj.changesObj)) delete spCast.spellAttrOverride[aSpell];
		}
		// now maybe delete the whole spellAttrOverride if it is empty
		if (!ObjLength(spCast.spellAttrOverride)) delete spCast.spellAttrOverride;
	}
}

// set the armour (if more AC than current armour) or remove the armour
function processAddArmour(AddRemove, armour) {
	if (!armour || typeof armour != "string") return;
	if (!AddRemove) { // remove
		RemoveArmor(armour);
	} else { // add
		if (!ParseArmor(armour)) return;
		var remCurArm = What("AC Armor Description");
		var remAC = Number(What("AC"));
		Value("AC Armor Description", armour);
		if (remCurArm && remAC) { // there was a previous armor, so check if this new armor is better or not
			// calculate all the field values, or the AC field will not be updated
			var isStoppedCalc = calcStartSet != false;
			if (isStoppedCalc) calcCont(true);
			if (remAC > Number(What("AC"))) {
				Value("AC Armor Description", remCurArm);
			} else if (isStoppedCalc) {
				calcStop();
			}
		}
	}
}

// set the shield (if more AC than current shield) or remove the shield
function processAddShield(AddRemove, shield, weight) {
	if (!shield) return;
	if (isArray(shield)) {
		if (!shield.length) return;
		if ((shield[2] == undefined || isNaN(shield[2])) && weight !== undefined && !isNaN(weight)) shield[2] = weight;
	} else {
		var shield = [shield];
		if (weight !== undefined && !isNaN(weight)) shield[2] = weight;
	}

	// grab current fields
	var shieldFld = What("AC Shield Bonus Description");
	if (AddRemove) { // add
		// see what the new AC will be
		var newACdefined = shield[1] !== undefined && !isNaN(shield[1]) ? shield[1] : undefined;
		if (newACdefined !== undefined) {
			var newAC = newACdefined;
		} else {
			var magicRegex = /(?:^|\s|\(|\[)([\+-]\d+)/;
			var newAC = 2 + (magicRegex.test(shield[0]) ? parseFloat(shield[0].match(magicRegex)[1]) : 0);
		}
		if (newAC < What("AC Shield Bonus")) return; // do not continue if new AC would not be equal or more

		// set the value of the fields
		Value("AC Shield Bonus Description", shield[0]);
		if (newACdefined !== undefined) Value("AC Shield Bonus", shield[1]);
		if (shield[2] !== undefined && !isNaN(shield[2])) Value("AC Shield Weight", shield[2]);

	} else if (CurrentShield.field.indexOf(shield[0].toLowerCase()) !== -1) { // remove
		Value("AC Shield Bonus Description", "");
	}
}

// set attacks or remove the attacks
function processAddWeapons(AddRemove, weapons) {
	if (!weapons) return;
	if (!isArray(weapons)) weapons = [weapons];
	for (var w = 0; w < weapons.length; w++) {
		tDoc[(AddRemove ? "Add" : "Remove") + "Weapon"](weapons[w]);
	}
}

// set or remove armour options
function processArmorOptions(AddRemove, srcNm, itemArr, magical) {
	if (!itemArr) return;
	if (!isArray(itemArr)) itemArr = [itemArr];

	// if adding things but the variable doesn't exist
	if (AddRemove && !CurrentVars.extraArmour) CurrentVars.extraArmour = {};

	srcNm = srcNm.toLowerCase();
	for (var i = 0; i < itemArr.length; i++) {
		var newName = srcNm + "-" + itemArr[i].name.toLowerCase();
		if (AddRemove) {
			itemArr[i].list = "startlist";
			if (magical) itemArr[i].isMagicArmor = true;
			CurrentVars.extraArmour[newName] = itemArr[i];
			ArmourList[newName] = itemArr[i];
		} else {
			// remove the entries if they exist
			if (CurrentVars.extraArmour[newName]) delete CurrentVars.extraArmour[newName];
			if (ArmourList[newName]) delete ArmourList[newName];
		}
	}

	// if removing things and the variable is now empty
	if (!AddRemove && !ObjLength(CurrentVars.extraArmour)) delete CurrentVars.extraArmour;
	UpdateDropdown("armour"); // update the armour dropdown
	SetStringifieds("vars"); // Save the new settings to a field
}

// set or remove attack options
function processWeaponOptions(AddRemove, srcNm, itemArr, magical) {
	if (!itemArr) return;
	if (!isArray(itemArr)) itemArr = [itemArr];

	// if adding things but the variable doesn't exist
	if (AddRemove && !CurrentVars.extraWeapons) CurrentVars.extraWeapons = {};

	srcNm = srcNm.toLowerCase();
	for (var i = 0; i < itemArr.length; i++) {
		var newName = srcNm + "-" + itemArr[i].name.toLowerCase();
		if (AddRemove) {
			itemArr[i].list = "startlist";
			if (magical) itemArr[i].isMagicWeapon = true;
			CurrentVars.extraWeapons[newName] = itemArr[i];
			WeaponsList[newName] = itemArr[i];
		} else {
			// remove the entries if they exist
			if (CurrentVars.extraWeapons[newName]) delete CurrentVars.extraWeapons[newName];
			if (WeaponsList[newName]) delete WeaponsList[newName];
		}
	}

	// if removing things and the variable is now empty
	if (!AddRemove && !ObjLength(CurrentVars.extraWeapons)) delete CurrentVars.extraWeapons;
	UpdateDropdown("weapons"); // update the weapons dropdown
	SetStringifieds("vars"); // Save the new settings to a field
}

// set or remove ammo options
function processAmmoOptions(AddRemove, srcNm, itemArr, magical) {
	if (!itemArr) return;
	if (!isArray(itemArr)) itemArr = [itemArr];

	// if adding things but the variable doesn't exist
	if (AddRemove && !CurrentVars.extraAmmo) CurrentVars.extraAmmo = {};

	srcNm = srcNm.toLowerCase();
	for (var i = 0; i < itemArr.length; i++) {
		var newName = srcNm + "-" + itemArr[i].name.toLowerCase();
		if (AddRemove) {
			itemArr[i].list = "startlist";
			if (magical) itemArr[i].isMagicAmmo = true;
			CurrentVars.extraAmmo[newName] = itemArr[i];
			AmmoList[newName] = itemArr[i];
		} else {
			// remove the entries if they exist
			if (CurrentVars.extraAmmo[newName]) delete CurrentVars.extraAmmo[newName];
			if (AmmoList[newName]) delete AmmoList[newName];
		}
	}

	// if removing things and the variable is now empty
	if (!AddRemove && !ObjLength(CurrentVars.extraAmmo)) delete CurrentVars.extraAmmo;
	UpdateDropdown("ammo"); // update the ammunition dropdown
	SetStringifieds("vars"); // Save the new settings to a field
}

// set or remove extra limited feature options
function processExtraLimitedFeatures(AddRemove, srcNm, objArr) {
	if (!objArr) return;
	if (!isArray(objArr)) objArr = [objArr];

	for (var i = 0; i < objArr.length; i++) {
		var aObj = objArr[i];
		if (AddRemove) {
			AddFeature(aObj.name, aObj.usages ? aObj.usages : 0, aObj.additional ? " (" + aObj.additional + ")" : "", aObj.recovery ? aObj.recovery : "", srcNm, false, aObj.usagescalc);
		} else {
			RemoveFeature(aObj.name, aObj.usages ? aObj.usages : 0, "", "", "", "", aObj.usagescalc);
		}
	}
}

// add/remove a class feature text, replace the first line of it, or insert it after another
// the string is assumed to start with "\u25C6\uFEFF" (ParseClassFeature | ParseClassFeatureExtra)
// for possible values of 'act', see the switch statement
// each ...TxtA is [firstline, completetext]
function applyClassFeatureText(act, fldA, oldTxtA, newTxtA, prevTxtA) {
	if (!oldTxtA || !oldTxtA[0]) return; // no oldTxt, so we can't do anything

	// make some regex objects
	var oldFrstLnEsc = oldTxtA[0].replace(/^(\r|\n)*/, '').RegEscape();
	var oldRxHead = RegExp(oldFrstLnEsc + ".*", "i");
	var oldRx = RegExp("\\r?" + oldFrstLnEsc + "(.|\\r  )*", "i"); // everything until the first line that doesn't start with two spaces (e.g. an empty line or a new bullet point)

	// find the field we are supposed to update
	var fld = fldA[0];
	if (fldA.length > 1) {
		for (var i = 0; i < fldA.length; i++) {
			if (oldRx.test(What(fldA[i]))) {
				fld = fldA[i];
				break;
			}
		}
	}
	var fldTxt = What(fld);
	if (!fldTxt) return; // empty or non-existing field, so just stop now

	// apply the change
	switch (act) {
		case "first" : // update just the first line (usages, recovery, or additional changed)
			var changeTxt = fldTxt.replace(oldRxHead, newTxtA[0]);
			break;
		case "replace" : // replace the oldTxt with the newTxt
			var changeTxt = fldTxt.replace(oldRx, newTxtA[1]);
			break;
		case "insert" : // add the newTxt after the prevTxt
			if (!prevTxtA || !prevTxtA[0]) return; // no prevTxt, so we can't do anything
			var prevFrstLnEsc = prevTxtA[0].replace(/^(\r|\n)*/, '').RegEscape();
			var prevRx = RegExp("\\r?" + prevFrstLnEsc + "(.|\\r  )*", "i");
			var prevTxtFound = fldTxt.match(prevRx);
			var changeTxt = prevTxtFound ? fldTxt.replace(prevTxtFound[0], prevTxtFound[0] + newTxtA[1]) : fldTxt;
			break;
		case "remove" : // remove the oldTxt
			var changeTxt = fldTxt.replace(oldRx, '').replace(/^\r+/, '');
			break;
		default :
			return;
	}
	if (changeTxt != fldTxt) {
		Value(fld, changeTxt);
	} else if (act !== "insert") {
		// nothing changed, so just insert the whole feature, using this same function
		applyClassFeatureText("insert", fldA, oldTxtA, newTxtA, prevTxtA);
	}
}

// a function to recalculate the weapon entries after a change in weapon proficiencies or CurrentEvals
function UpdateSheetWeapons() {
	// some atkAdd eval might be level-dependent, so force updating the weapons when changing level and such an eval is present
	var isLvlDepAtkAdd = false;
	// iterate through all the atkAdd evals to see if any are level-dependent, but only when changing level
	if (CurrentUpdates.types.indexOf("xp") !== -1 && CurrentEvals.atkAdd) {
		for (addEval in CurrentEvals.atkAdd) {
			var evalThing = CurrentEvals.atkAdd[addEval];
			if (typeof evalThing == 'function') evalThing = evalThing.toSource();
			if ((/\.level/).test(evalThing)) {
				isLvlDepAtkAdd = true;
				break;
			}
		}
	}

	var CUflat = CurrentUpdates.types.toString();
	if (!isLvlDepAtkAdd && (!CurrentUpdates.types.length || !IsNotReset || !IsNotImport || CUflat.indexOf("attacks") == -1)) return;
	ReCalcWeapons(CurrentUpdates.types.indexOf("attacksprofs") !== -1, isLvlDepAtkAdd || CurrentUpdates.types.indexOf("attacksforce") !== -1);
}

// >>>> Changes Dialog functions <<<< \\

// a function to do all the default things after a change in level, class, race, feat, magic item, or companion
// this function is called whenever the calculations are activated again
function UpdateSheetDisplay() {
	if (!CurrentUpdates.types.length || !IsNotReset || !IsNotImport) {
		CurrentUpdates = {types : []}; // reset the CurrentUpdates variable
		return;
	}

	if (!ChangesDialogSkip) {
		var cDialogFld = What("ChangesDialogSkip.Stringified");
		ChangesDialogSkip = cDialogFld ? eval(cDialogFld) : {
			chXP : false, // experience points
			chAS : false, // ability scores
			chHP : false, // hit points
			chSP : false, // spells
			chSK : false, // skills
			chAT : false, // attack calculations
			chNO : false // notes additions
		};
		if (!cDialogFld) Value("ChangesDialogSkip.Stringified", ChangesDialogSkip.toSource());
	}

	// Show the progress dialog
	var thermoTxt = thermoM("Finalizing changes...", false);
	thermoM(2/5); // Increment the progress bar

	// initialize some variables
	var dialogParts = [];
	var autoHP;
	var CUflat = CurrentUpdates.types.toString();

	// create the dialog
	var titleTxt = "Changes Requiring Your Attention";
	var explTxt = "The things you just changed has effected the things listed below.\nNote that this dialog is just a reminder and you can find all the things listed below in their respective sections of the sheet and/or its functions.\nYou can always use the [ESC] key to close this dialog.";
	var checkboxTxt = "Don't alert me about these changes (unless there is another change I do want to be alerted about).";
	var Changes_Dialog = {
		// when starting the dialog
		initialize : function (dialog) {
			var thermoTxt = thermoM("Finalizing changes...", false);
			thermoM(2/5); // Increment the progress bar
			var toLoad = { "img1" : allIcons.automanual };
			for (var p = 0; p < dialogParts.length; p++) {
				var skType = dialogParts[p].skipType;
				toLoad[skType] = ChangesDialogSkip[skType];
			}
			dialog.load(toLoad);
		},
		// when closing the dialog, one way or another
		destroy : function (dialog) {
			Value("ChangesDialogSkip.Stringified", ChangesDialogSkip.toSource());
		},
		description : {
			name : titleTxt,
			first_tab : "CLOS",
			elements : [{
				type : "view",
				elements : [{
					type : "view", // the top row
					alignment : "align_fill",
					align_children : "align_row",
					elements : [{
						type : "image",
						item_id : "img1",
						alignment : "align_bottom",
						width : 20,
						height : 20
					}, {
						type : "static_text",
						item_id : "Hea0",
						alignment : "align_fill",
						font : "title",
						bold : true,
						height : 23,
						width : 250,
						name : titleTxt
					}]
				}, {
					type : "static_text", // explanatory text
					item_id : "txt0",
					alignment : "align_fill",
					font : "palette",
					name : explTxt,
					wrap_name : true,
					width : 500
				}, {
					type : "view",
					item_id : "sect",
					align_children : "align_left",
					elements : []
				}, {
					type : "view",
					alignment : "align_fill",
					align_children : "align_center",
					elements : [{
						type : "ok",
						item_id : "CLOS",
						alignment : "align_center",
						ok_name : "Close"
					}, {
						type : "ok_cancel",
						alignment : "align_offscreen",
						item_id : "CNCL",
						ok_name : "Close",
						cancel_name : "Close",
						height : 0
					}]
				}]
			}]
		}
	};

	// if the level changed but the xp (or similar system) is not correct, update the xp to the needed value for the level
	if (CurrentUpdates.types.indexOf("xp") !== -1) {
		var curLvl = Number(What("Character Level"));
		var curExp = What("Total Experience");
		if (!curExp) curExp = 0;
		var LvlXp = getCurrentLevelByXP(curLvl, curExp);
		// if the amount of xp is less than needed for the level, change the xp. But not if the level is 0
		Changes_Dialog.oldXPval = curExp;
		if (curLvl > LvlXp[0]) {
			Value("Total Experience", LvlXp[1]);
			// make the xp dialog insert
			dialogParts.push({
				skipType : "chXP",
				type : "cluster",
				align_children : "align_left",
				alignment : "align_fill",
				width : 500,
				font : "heading",
				name : "Experience Points",
				elements : [{
					type : "view",
					align_children : "align_row",
					alignment : "align_fill",
					elements : [{
						type : "static_text",
						width : 375,
						alignment : "align_fill",
						font : "dialog",
						wrap_name : true,
						name : "The current amount of experience points (" + toUni(curExp) + ") are not enough to attain the current level (" + toUni(curLvl) + "), as that requires " + toUni(LvlXp[1]) + " experience points.\nThe total XP has now been updated to " + toUni(LvlXp[1]) + "."
					}, {
						type : "button",
						item_id : "bXPo",
						name : "Change XP back to " + curExp
					}]
				}, {
					type : "check_box",
					item_id : "chXP",
					alignment : "align_fill",
					font : "palette",
					name : checkboxTxt
				}]
			});
			Changes_Dialog.bXPo = function (dialog) {
				Value("Total Experience", this.oldXPval);
			};
		}
	};

	// if something affecting the stats changed
	// possible options for stats: statsoverride, statsclasses, statsrace, statsfeats, statsitems
	if (CUflat.indexOf("stats") !== -1 || CurrentUpdates.types.indexOf("testasi") !== -1) {
		Changes_Dialog.oldStats = Who("Str");
		if (AbilityScores_Button(true)) { // sets tooltip for stats and returns true if anything changed
			var strStats = "";
			// ability score improvements
			if (CurrentUpdates.types.indexOf("testasi") !== -1) {
				var newASI = 0;
				for (var nClass in classes.known) {
					var clLvl = Math.min(CurrentClasses[nClass].improvements.length, classes.known[nClass].level);
					newASI += clLvl ? CurrentClasses[nClass].improvements[clLvl - 1] : 0;
				}
				var oldASI = 0;
				for (var oClass in classes.old) {
					var useObj = CurrentClasses[oClass] ? CurrentClasses[oClass] : ClassList[oClass];
					clLvl = Math.min(useObj.improvements.length, classes.old[oClass].classlevel);
					oldASI += clLvl ? useObj.improvements[clLvl - 1] : 0;
				}
				if (newASI !== oldASI) {
					var totalASI = newASI - oldASI;
					var ASItxt = " Ability Score Improvement" + (Math.abs(totalASI) != 1 ? "s" : "");
					strStats += "\nThe change in level has granted " + toUni(totalASI) + " new" + ASItxt + ".\nThis bring the new total to " + toUni(newASI) + ".";
				}
			}
			// other stat changes
			if (CUflat.indexOf("stats") !== -1) {
				var statChanges = [];
				if (CurrentUpdates.types.indexOf("statsrace") !== -1) statChanges.push(toUni("Race"));
				if (CurrentUpdates.types.indexOf("statsclasses") !== -1) statChanges.push(toUni("Class Feature(s)"));
				if (CurrentUpdates.types.indexOf("statsfeats") !== -1) statChanges.push(toUni("Feat(s)"));
				if (CurrentUpdates.types.indexOf("statsoverride") !== -1 || CurrentUpdates.types.indexOf("statsitems") !== -1 || CurrentUpdates.types.indexOf("statsmagic") !== -1) statChanges.push(toUni("Magic Item(s)"));
				strStats += formatLineList("\nThe following changed one or more ability score:", statChanges);
			}
			if (strStats) {
				// make the Stats dialog insert
				dialogParts.push({
					skipType : "chAS",
					type : "cluster",
					align_children : "align_left",
					alignment : "align_fill",
					width : 500,
					font : "heading",
					name : "Ability Scores",
					elements : [{
						type : "view",
						align_children : "align_row",
						alignment : "align_fill",
						elements : [{
							type : "static_text",
							width : 375,
							alignment : "align_fill",
							font : "dialog",
							wrap_name : true,
							name : "A change to ability scores has been detected. This is not applied automatically, but you can use the Ability Scores Dialog for that." + strStats
						}, {
							type : "view",
							align_children : "align_right",
							elements : [{
								type : "button",
								item_id : "bSTc",
								name : "See Changes"
							}, {
								type : "button",
								item_id : "bSTo",
								name : "Open Ability Scores Dialog"
							}]
						}]
					}, {
						type : "check_box",
						item_id : "chAS",
						alignment : "align_fill",
						font : "palette",
						name : checkboxTxt
					}]
				});
				Changes_Dialog.bSTc = function (dialog) {
					ShowCompareDialog(
						["Ability Score changes", "The text above is part of the 'Ability Scores Dialog' and the tooltip (mouseover text) of the ability score fields.\nYou can always open the 'Ability Scores Dialog' using the 'Scores' button in the 'JavaScript Window'-toolbar or the 'Ability Scores' bookmark."],
						[
							["Old ability score modifiers", this.oldStats],
							["New ability score modifiers", Who("Str")]
						],
						true
					);
				};
				Changes_Dialog.bSTo = function (dialog) {
					AbilityScores_Button();
					// this dialog might have just updated the stats, prompting for some other updates
					if (CurrentUpdates.types.indexOf("attacks") !== -1) ReCalcWeapons();
					if (CurrentUpdates.types.indexOf("hp") !== -1) SetHPTooltip(false, false);
				};
			}
		}
	}

	// if the HP changed (of the main character)
	if (CurrentUpdates.types.indexOf("hp") !== -1) {
		// save the current HP
		var settingsHP = How("HP Max").split(",");
		autoHP = settingsHP[3] && (/average|fixed|max/).test(settingsHP[3]);
		var oldHPmax = What("HP Max");
		Changes_Dialog.oldHPtt = Who("HP Max");
		// update the HP of the main character
		SetHPTooltip(false, false);
		// make the HP dialog insert
		var strHP = "The hit die and/or hit point maximum of the character have changed.";
		if (autoHP) {
			strHP += "\nAs HP has been set to update automatically, the Maximum Hit Points have been changed from " + toUni(oldHPmax) + " to " + toUni(What("HP Max")) + ".";
		}
		dialogParts.push({
			skipType : "chHP",
			type : "cluster",
			align_children : "align_left",
			alignment : "align_fill",
			width : 500,
			font : "heading",
			name : "Hit Points",
			elements : [{
				type : "view",
				align_children : "align_row",
				alignment : "align_fill",
				elements : [{
					type : "static_text",
					width : 400,
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					name : strHP
				}, {
					type : "button",
					item_id : "bHPc",
					name : "See Changes"
				}]
			}, {
				type : "check_box",
				item_id : "chHP",
				alignment : "align_fill",
				font : "palette",
				name : checkboxTxt
			}]
		});
		Changes_Dialog.bHPc = function (dialog) {
			ShowCompareDialog(
				["Hit Points changes", "You can always find the current Hit Point calculation in the tooltip (mouseover text) of the Max HP field."],
				[["Old HP calculation", this.oldHPtt], ["New HP calculation", Who("HP Max")]]
			);
		};
	}

	// if the spellcasting changed
	var CurrentSpellsLen = ObjLength(CurrentSpells);
	var hasSpellSheets = isTemplVis("SSfront", false) || isTemplVis("SSmore", false);
	var changedSpellEval = CurrentUpdates.types.indexOf("spellstr") !== -1;
	var changedSpellcasting = CurrentUpdates.types.indexOf("spells") !== -1 || (CurrentSpellsLen && changedSpellEval) || (!CurrentSpellsLen && CurrentUpdates.types.indexOf("testclassspellcasting") !== -1);
	// if there is no spellcastingBonus added, but change in spellcasting level was detected, see if a spellcasting class changed level and would require a new spell sheet
	if (!changedSpellcasting && CurrentUpdates.types.indexOf("testclassspellcasting") !== -1) {
		for (var theCaster in CurrentSpells) {
			var aCast = CurrentSpells[theCaster];
			// skip this entry if this is not a class, or not a class with spells known, or there is already a spell sheet made of all cantrips & spells
			if (!classes.known[theCaster] || !aCast.known || (aCast.typeList && aCast.typeList == 4)) continue;
			var newClass = !classes.old[theCaster];
			var lvlOld = newClass ? 0 : classes.old[theCaster].classlevel - 1;
			var lvlNew = classes.known[theCaster].level - 1;
			// see if there is a cantrips array in the known section and the amount of known
			if (isArray(aCast.known.cantrips)) {
				var oldCaLvl = Math.min(aCast.known.cantrips.length - 1, lvlOld);
				var newCaLvl = Math.min(aCast.known.cantrips.length - 1, lvlNew);
				changedSpellcasting = (newClass && aCast.known.cantrips[newCaLvl]) || (aCast.known.cantrips[oldCaLvl] !== aCast.known.cantrips[newCaLvl]);
			}
			// stop if there is already a reason to update
			if (changedSpellcasting) break;
			// see if there is a spells array in the known section and the amount of known
			if (aCast.known.spells && isArray(aCast.known.spells)) {
				var oldSpLvl = Math.min(aCast.known.spells.length - 1, lvlOld);
				var newSpLvl = Math.min(aCast.known.spells.length - 1, lvlNew);
				changedSpellcasting = (newClass && aCast.known.spells[newSpLvl]) || (aCast.known.spells[oldSpLvl] !== aCast.known.spells[newSpLvl]);
			} else if (aCast.known.spells && aCast.typeSp && (aCast.typeSp === "book" || (aCast.typeSp === "list" && aCast.typeList !== 2))) { // if this is a list/book, test if the caster just got access to a new spell slot level
				var theTable = aCast.spellsTable ? aCast.spellsTable : aCast.factor && aCast.factor[0] ? tDoc[aCast.factor[1] + "SpellTable"] : false;
				if (theTable) {
					var oldTableLvl = Math.min(theTable.length - 1, lvlOld + 1);
					var newTableLvl = Math.min(theTable.length - 1, lvlNew + 1);
					changedSpellcasting = (newClass && aCast.known.spells[newSpLvl]) || (theTable[oldTableLvl].trailingIndexOf(0) !== theTable[newTableLvl].trailingIndexOf(0));
				};
			}
			// stop if there is already a reason to update
			if (changedSpellcasting) break;
		}
	};
	if (changedSpellcasting && ((!CurrentSpellsLen && hasSpellSheets) || CurrentSpellsLen)) {
		// see if not all spellcasting stuff has been removed
		var strSpells = !CurrentSpellsLen ?
			"All spellcasting abilities have been removed from the character.\nYou might want to remove any Spell Sheets as well." :
			"A change to spellcasting" +
			(changedSpellEval ? " and how spells are displayed or spell lists are generated" : "") +
			" has been detected that require the Spell Sheets to be updated.\nTIP: if you plan to make more changes affecting spellcasting, do those first before generating Spell Sheets, because creating them takes very long.";
		var buttonSpells = !CurrentSpellsLen ? "Remove Spell Sheets" : (hasSpellSheets ? "Update" : "Create") + " Spell Sheets";
		var buttonSpellStr = changedSpellEval ? "Spells \u0026\u0026 -List Changes" : "Affecting Spells \u0026\u0026 -Lists";
		// make the Spells dialog insert
		dialogParts.push({
			skipType : "chSP",
			type : "cluster",
			align_children : "align_left",
			alignment : "align_fill",
			width : 500,
			font : "heading",
			name : "Spellcasting",
			elements : [{
				type : "view",
				align_children : "align_row",
				alignment : "align_fill",
				elements : [{
					type : "static_text",
					width : 375,
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					name : strSpells
				}, {
					type : "view",
					align_children : "align_right",
					elements : (changedSpellEval || CurrentEvals.spellStr ? [{
						type : "button",
						item_id : "bSPs",
						name : buttonSpellStr
					}] : []).concat([{
						type : "button",
						item_id : "bSPo",
						name : buttonSpells
					}])
				}]
			}, {
				type : "check_box",
				item_id : "chSP",
				alignment : "align_fill",
				font : "palette",
				name : checkboxTxt
			}]
		});
		Changes_Dialog.curSpLen = CurrentSpellsLen;
		Changes_Dialog.bSPo = function (dialog) {
			if (this.curSpLen) {
				if (GenerateSpellSheet(undefined, true)) {
					app.alert({
						cTitle : "New spell sheets have been generated",
						nIcon : 3,
						cMsg : "The new spell sheets have been generated. You will be taken to them as soon as you close the 'Changes' dialog."
					})
				};
			} else {
				RemoveSpellSheets();
			}
		};
		if (changedSpellEval || CurrentEvals.spellStr) {
			Changes_Dialog.oldSpellStr = CurrentUpdates.spellStrOld ? CurrentUpdates.spellStrOld : "";
			Changes_Dialog.spellStrChange = changedSpellEval;
			Changes_Dialog.bSPs = function (dialog) {
				ShowCompareDialog(
					["Things affecting spells, spell properties and/or spell list generation", "Some features might affect how spells are displayed on the spell sheet, by adding more range for example.\n\nOthers might affect how a spell list for a spellcasting class or feature is generated, by adding extra spells to choose from for example."],
					this.spellStrChange ?
					[
						["Old spell list/attribute manipulations", this.oldSpellStr],
						["New spell list/attribute manipulations", StringEvals("spellStr")]
					] : [
						["Spell list/attribute manipulations", StringEvals("spellStr")]
					],
					true
				);
			};
		}
	}

	// if skill proficiencies changed
	if (CurrentUpdates.types.indexOf("skills") !== -1) {
		// get the previous skill string
		Changes_Dialog.oldSkillStr = CurrentUpdates.skillStrOld ? CurrentUpdates.skillStrOld : "";
		// make the skills dialog insert
		dialogParts.push({
			skipType : "chSK",
			type : "cluster",
			align_children : "align_left",
			alignment : "align_fill",
			width : 500,
			font : "heading",
			name : "Skill Proficiencies",
			elements : [{
				type : "view",
				align_children : "align_row",
				alignment : "align_fill",
				elements : [{
					type : "static_text",
					width : 400,
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					name : "Proficiency with one or more skill has been added or removed. If this change offers you a choice, nothing on the sheet will have been altered and you will have to assign/remove the proficiency manually."
				}, {
					type : "button",
					item_id : "bSKc",
					name : "See Changes"
				}]
			}, {
				type : "check_box",
				item_id : "chSK",
				alignment : "align_fill",
				font : "palette",
				name : checkboxTxt
			}]
		});
		Changes_Dialog.bSKc = function (dialog) {
			ShowCompareDialog(
				["Skill proficiencies", "You can always find the current skill proficiencies in the tooltip (mouseover text) of the skill fields."],
				[
					["Old skill proficiencies", this.oldSkillStr],
					["New skill proficiencies", Who("Acr Prof").replace(/.+(\r|\n)*/, '')]
				],
				true
			);
		};
	}

	// if the attack calculations / populating changed
	if (CurrentUpdates.types.indexOf("atkstr") !== -1) {
		// get the previous atkCalc/stkAdd string
		Changes_Dialog.oldAtkStr = CurrentUpdates.atkStrOld ? CurrentUpdates.atkStrOld : "";
		// make the attack dialog insert
		dialogParts.push({
			skipType : "chAT",
			type : "cluster",
			align_children : "align_left",
			alignment : "align_fill",
			width : 500,
			font : "heading",
			name : "Attack Calculations (possibly including spellcasting DC)",
			elements : [{
				type : "view",
				align_children : "align_row",
				alignment : "align_fill",
				elements : [{
					type : "static_text",
					width : 400,
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					name : "A change was detected in the things that affect how (spell) attacks and/or how spell save DCs are calculated."
				}, {
					type : "button",
					item_id : "bAtk",
					name : "See Changes"
				}]
			}, {
				type : "check_box",
				item_id : "chAT",
				alignment : "align_fill",
				font : "palette",
				name : checkboxTxt
			}]
		});
		Changes_Dialog.bAtk = function (dialog) {
			ShowCompareDialog(
				["Things affecting attack/DC calculations", "You can always see what things are affecting the attack calculations with the small buttons in front of each attack entry on the first page.", "Be aware that things affecting spell attacks and spell save DCs are applied in the attack section and on the spell sheet pages, but not to the 'Ability Save DC' on the first page."],
				[
					["Old attack/DC manipulations", this.oldAtkStr],
					["New attack/DC manipulations", StringEvals("atkStr")]
				],
				true
			);
		};
	}

	// if an addition was done to the 3rd page Notes section or to a Notes page
	if (CurrentUpdates.notesChanges) {
		// get the previous atkCalc/stkAdd string
		Changes_Dialog.notesChange = "\u2022 " + CurrentUpdates.notesChanges.join("\n\u2022 ");
		// make the attack dialog insert
		dialogParts.push({
			skipType : "chNO",
			type : "cluster",
			align_children : "align_left",
			alignment : "align_fill",
			width : 500,
			font : "heading",
			name : "Notes Addition",
			elements : [{
				type : "view",
				align_children : "align_row",
				alignment : "align_fill",
				elements : [{
					type : "static_text",
					width : 400,
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					name : "A text was added to the Notes section on the 3rd page and/or a separate Notes page because it didn't fit into the space originally meant for it."
				}, {
					type : "button",
					item_id : "bNot",
					name : "See Addition(s)"
				}]
			}, {
				type : "check_box",
				item_id : "chNO",
				alignment : "align_fill",
				font : "palette",
				name : checkboxTxt
			}]
		});
		Changes_Dialog.bNot = function (dialog) {
			ShowCompareDialog(
				["Things added to the Notes section/page", "You can always edit the text in the Notes section or Notes pages, you don't have to keep it as set by the automation.", 'Class features added to the third page can always be moved to the Class Features section on the second page, it will not interfere with the sheet\'s automation. You will still be able to remove them using the "Choose Feature" button.'],
				[
					["", this.notesChange]
				],
				true
			);
		};
	}

	// check if any of the parts of the array should be shown
	var cancelDia = dialogParts.every(function (part) {
		// set the functions for the checkboxes
		var skType = part.skipType;
		Changes_Dialog[skType] = function (dialog, fldNm = skType) {
			ChangesDialogSkip[fldNm] = dialog.store()[fldNm] ? true : false;
		};
		// see if this part is set to be skipped or not
		return ChangesDialogSkip[skType] || (skType == "chHP" && autoHP);
	});
	// if there is nothing to show, stop the function now
	if (!cancelDia) {
		// reset the CurrentUpdates variable
		CurrentUpdates = {types : []};
		// add the sections to the dialog
		setDialogName(Changes_Dialog, "sect", "elements", dialogParts);
		// open the dialog
		var dia = app.execDialog(Changes_Dialog);
	}

	// reset the CurrentUpdates variable
	CurrentUpdates = {types : []};

	// Stop progress bar
	thermoM(thermoTxt, true);
}

//a way to show a dialog that compares multiple things
//arr is an array of arrays with two entries each [cluster title, cluster text]
function ShowCompareDialog(txtA, arr, canBeLong) {
	var clusterArr = [];
	var isTxtA = isArray(txtA);
	var hdr = isTxtA ? txtA[0] : txtA;
	var extraTxt = isTxtA && txtA[1] ? txtA[1] : "";
	var headTxt = isTxtA && txtA[2] ? txtA[2] : "";

	for (var i = 0; i < arr.length; i++) {
		var nextElem = {
			type : "cluster",
			alignment : "align_top",
			font : "heading",
			name : arr[i][0],
			elements : [{
				item_id : "tx" + ("0" + i).slice(-2),
				width : 300,
				alignment : "align_fill",
				font : "dialog"
			}]
		};
		if (canBeLong) {
			nextElem.elements[0].type = "edit_text";
			nextElem.elements[0].readonly = true;
			nextElem.elements[0].multiline = true;
			nextElem.elements[0].height = 350;
		} else {
			nextElem.elements[0].type = "static_text";
			nextElem.elements[0].wrap_name = true;
			nextElem.elements[0].name = arr[i][1].replace(/^(\r|\n)*/, "");
		}
		clusterArr.push(nextElem);
	}

	var otherWidths = clusterArr.length * 300;
	if (clusterArr.length == 1) {
		otherWidths = 400;
		clusterArr[0].elements[0].width = 400;
	}
	var ShowCompare_Dialog = {
		initialize : function (dialog) {
			if (!canBeLong) return;
			var toLoad = {};
			for (var i = 0; i < arr.length; i++) {
				toLoad["tx" + ("0" + i).slice(-2)] = arr[i][1].replace(/^(\r|\n)*/, "");
			}
			dialog.load(toLoad);
		},
		description : {
			name : txtA[0],
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : (headTxt ? [{
					type : "static_text",
					item_id : "head",
					alignment : "align_fill",
					font : "heading",
					wrap_name : true,
					width : otherWidths,
					name : txtA[0]
				}, {
					type : "static_text",
					item_id : "txt2",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					width : otherWidths,
					name : headTxt
				}] : []).concat([{
					type : "view",
					align_children : "align_row",
					elements : [{
						type : "static_text",
						item_id : "txt0",
						alignment : "align_fill",
						font : "palette",
						wrap_name : true,
						height : 20,
						name : "[Can't see the 'OK' button at the bottom? Use ENTER to close this dialog]",
						width : otherWidths
					}, {
						type : "edit_text",
						item_id : "ding",
						alignment : "align_fill",
						readonly : true,
						height : 1,
						width : 1
					}]
				}, {
					type : "view",
					align_children : "align_top",
					elements : clusterArr
				}]).concat(extraTxt ? [{
					type : "static_text",
					item_id : "txt1",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					width : otherWidths,
					name : extraTxt
				}] : []).concat([{
					type : "ok"
				}])
			}]
		}
	}
	var dia = app.execDialog(ShowCompare_Dialog);
}

// >>>> Magic Items functions <<<< \\

function doDropDownValCalcWithChoices() {
	if (!event.target || event.type != "Field") return;
	switch (event.name) {
		case "Calculate":
			if (event.target.setVal !== undefined) {
				event.value = event.target.setVal;
			}
			break;
		case "Validate":
			if (event.target.setVal !== undefined) {
				delete event.target.setVal;
				return;
			}
			// only in case of a validation event and not changing the value
			var fldName = event.target.name;
			var fldNmbr = parseFloat(fldName.slice(-2));
			if (fldName.toLowerCase().indexOf("magic item") !== -1) {
				ApplyMagicItem(event.value, fldNmbr);
			} else if (fldName.toLowerCase().indexOf("feat") !== -1) {
				ApplyFeat(event.value, fldNmbr);
			}
			break;
		default:
			break;
	}
}

// Make an array of all magic item fields of that fieldnumber
function ReturnMagicItemFieldsArray(fldNmbr) {
	fldsArray = [
		"Extra.Magic Item " + fldNmbr,				// 0
		"Extra.Magic Item Note " + fldNmbr,			// 1
		"Extra.Magic Item Description " + fldNmbr,	// 2
		"Extra.Magic Item Weight " + fldNmbr,		// 3
		"Extra.Magic Item Attuned " + fldNmbr,		// 4
		"Image.MagicItemAttuned." + fldNmbr			// 5
	];
	return fldsArray;
}

// Lookup the name of a Magic Item and if it exists in the MagicItemsList
function ParseMagicItem(input) {
	var found = "";
	var subFound = "";
	if (!input) return [found, subFound, []];

	input = removeDiacritics(input).toLowerCase();
	var foundLen = 0;
	var foundDat = 0;
	var subFoundLen = 0;
	var subFoundDat = 0;
	var subOptionArr = [];
	var isMatch, isMatchLen, isMatchSub, tempDate, tempDateSub, tempNameLen;
	var varArr;

	// Scan string for all magic items
	for (var key in MagicItemsList) {
		var kObj = MagicItemsList[key];

		// test if the magic item or its source isn't excluded
		if (testSource(key, kObj, "magicitemExcl")) continue;

		isMatch = false;
		if (input.indexOf(kObj.name.toLowerCase()) !== -1) {
			isMatch = true;
			isMatchLen = kObj.name.length;
		} else if (kObj.nameAlt && input.indexOf(kObj.nameAlt.toLowerCase()) !== -1) {
			isMatch = true;
			isMatchLen = kObj.nameAlt.length;
		} else if (kObj.nameTest && input.indexOf(kObj.nameTest.toLowerCase()) !== -1) {
			isMatch = true;
			isMatchLen = kObj.nameTest.length;
		}
		tempDate = sourceDate(kObj.source);
		subFoundLen = 0;
		subFoundDat = 0;
		isMatchSub = "";
		varArr = [];

		if (kObj.choices) {
			for (var i = 0; i < kObj.choices.length; i++) {
				var keySub = kObj.choices[i].toLowerCase();
				var sObj = kObj[keySub];
				if (!sObj || (sObj.source && testSource(keySub, sObj, "magicitemExcl"))) continue;
				varArr.push(kObj.choices[i]);
				isMatchSub = false;
				if (sObj.name) {
					if (input.indexOf(sObj.name.toLowerCase()) !== -1) {
						isMatchSub = true;
						tempNameLen = sObj.name.length;
					} else if (sObj.nameAlt && input.indexOf(sObj.nameAlt.toLowerCase()) !== -1) {
						isMatchSub = true;
						tempNameLen = sObj.nameAlt.length;
					} else if (sObj.nameTest && input.indexOf(sObj.nameTest.toLowerCase()) !== -1) {
						isMatchSub = true;
						tempNameLen = sObj.nameTest.length;
					}
				} else if (isMatch && input.indexOf(keySub) !== -1) {
					isMatchSub = true;
					tempNameLen = keySub.length;
				}
				if (isMatchSub) {
					// the choice matched, but only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source than the other choices
					tempDateSub = sObj.source ? sourceDate(sObj.source) : tempDate;
					if (tempNameLen < subFoundLen || (tempNameLen == subFoundLen && tempDateSub < subFoundDat)) continue;
					// we have a match for a choice, so set the values
					subFoundLen = tempNameLen;
					subFoundDat = tempDateSub;
					foundLen = isMatchLen;
					foundDat = tempDate;
					found = key;
					subFound = keySub;
					subOptionArr = varArr;
				}
			}
		}
		if (!isMatch || subFoundLen) continue; // no match or sub already matched

		// only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source. This differs from the regExpSearch objects
		if (isMatchLen < foundLen || (isMatchLen == foundLen && tempDate < foundDat)) continue;

		// we have a match, set the values
		found = key;
		subFound = "";
		subOptionArr = varArr;
		foundLen = isMatchLen;
		foundDat = tempDate;
	}
	return [found, subFound, subOptionArr];
};

// Check all Magic Items fields and parse the once known into the global variable
function FindMagicItems() {
	CurrentMagicItems.known = [];
	CurrentMagicItems.choices = [];
	for (var i = 1; i <= FieldNumbers.magicitems; i++) {
		var parsedItem = ParseMagicItem( What("Extra.Magic Item " + i) );
		CurrentMagicItems.known.push(parsedItem[0]);
		CurrentMagicItems.choices.push(parsedItem[1]);
	}
}

// Add the text and features of a Magic Items
function ApplyMagicItem(input, FldNmbr) {
	if (IsSetDropDowns || CurrentVars.manual.items || !IsNotMagicItemMenu) return; // When just changing the dropdowns or magic items are set to manual or this is a menu action, don't do anything
	var MIflds = ReturnMagicItemFieldsArray(FldNmbr);
	// Not called from a field? Then just set the field and let this function be called anew
	if ((!event.target || event.target.name !== MIflds[0]) && What(MIflds[0]) !== input) {
		Value(MIflds[0], input);
		return;
	};

	var parseResult = ParseMagicItem(input);
	var newMI = parseResult[0];
	var newMIvar = parseResult[1];
	var aMI = MagicItemsList[newMI];
	var aMIvar = aMI && newMIvar ? aMI[newMIvar] : false;
	var ArrayNmbr = FldNmbr - 1;
	var oldMI = CurrentMagicItems.known[ArrayNmbr];
	var oldMIvar = CurrentMagicItems.choices[ArrayNmbr];
	var setFieldValueTo;
	var failedChoice = false;

	var doNotCommit = function(toSetVal) {
		if (thermoTxt) thermoM(thermoTxt, true); // Stop progress bar
		if (!IsNotImport) return;
		event.rc = false;
		if (isArray(event.target.page)) OpeningStatementVar = app.setTimeOut("tDoc.getField('" + event.target.name + ".1').setFocus();", 10);
	}

	// If no variant was found, but there is a choice, ask it now
	if (aMI && aMI.choices && !newMIvar) {
		if (parseResult[2].length) {
			var selectMIvar = false;
			if (parseResult[2].length == 1) {
				selectMIvar = parseResult[2][0];
			} else if (aMI.selfChoosing && typeof aMI.selfChoosing == "function") {
				try {
					selectMIvar = aMI.selfChoosing();
				} catch (error) {
					var eText = "The function in the 'selfChoosing' attribute of '" + newMI + "' produced an error! Please contact the author of the magic item code to correct this issue:\n " + error + "\n ";
					for (var e in error) eText += e + ": " + error[e] + ";\n ";
					console.println(eText);
					console.show();
				}
				selectMIvar = selectMIvar && typeof selectMIvar == "string" && aMI[selectMIvar.toLowerCase()] ? selectMIvar : false;
			}
			if (!selectMIvar && !IsNotImport) {
				failedChoice = true;
			} else {
				// if none of the above selected a choice, ask the user!
				if (!selectMIvar) selectMIvar = AskUserOptions("Select " + aMI.name + " Type", "The '" + aMI.name + "' magic item exists in several forms. Select which form you want to add to the sheet at this time.\n\nYou can change the selected form with the little square button in the magic item line that this item is in.", parseResult[2], "radio", true);
				newMIvar = selectMIvar.toLowerCase();
				aMIvar = aMI[newMIvar];
				setFieldValueTo = aMIvar.name ? aMIvar.name : aMI.name + " [" + selectMIvar + "]";
			}
		} else if (!IsNotImport) {
			failedChoice = true;
		} else {
			app.alert({
				cTitle : "Error processing options for " + aMI.name,
				cMsg : "The magic item that you have selected, '" + aMI.name + "' offers a choice for the form it comes in. Unfortunately, the sheet has run into an issue where there are no forms to choose from because of resources being excluded. Use the \"Source Material\" bookmark to correct this.\n\nThis could also be an issue with the imported script containing the item not being written correctly. If so, please contact the author of that import script."
			});
			doNotCommit();
			return;
		}
	}

	// if there was a choice but none was selected for whatever reason (importing), do not apply anything and warn the user
	if (failedChoice) {
		Value(MIflds[2], 'ERROR, please reapply "' + aMI.name + '" above.');
		if (!IsNotImport) {
			console.println("The magic item '" + aMI.name + "' requires you to make a selection of a sub-choice. However, because this item was added during importing from another MPMB's Character Record Sheet, no pop-up dialog could be displayed to allow you to make a selection. Please reapply this magic item to show the pop-up dialog and make a selection for its sub-choice.");
			console.show();
		}
		if (thermoTxt) thermoM(thermoTxt, true); // Stop progress bar
		event.target.setVal = "ERROR, please reapply: " + (aMI.name.substr(0,2) + "\u200A" + aMI.name.substr(2)).split(" ").join("\u200A ");
		return;
	}

	if (oldMI === newMI && oldMIvar === newMIvar && (!aMI || !aMI.chooseGear) && (!aMIvar || !aMIvar.chooseGear)) {
		if (setFieldValueTo) event.target.setVal = setFieldValueTo;
		return; // No changes were made
	}

	// Start progress bar
	var thermoTxt = thermoM("Applying magic item...");
	thermoM(1/6); // Increment the progress bar

	// Create the object to use (merge parent and choice)
	if (!aMIvar) {
		var theMI = aMI;
		newMIvar = "";
	} else {
		var theMI = {
			name : aMIvar.name ? aMIvar.name : setFieldValueTo ? setFieldValueTo : input
		}
		var MIattr = ["source", "type", "rarity", "attunement", "magicItemTable", "weight", "description", "descriptionLong", "descriptionFull", "calculate", "prerequisite", "prereqeval", "chooseGear", "extraTooltip", "storyItemAL"];
		for (var a = 0; a < MIattr.length; a++) {
			var aKey = MIattr[a];
			if (aMIvar[aKey]) {
				theMI[aKey] = aMIvar[aKey];
			} else if (aMI[aKey]) {
				theMI[aKey] = aMI[aKey];
			}
		}
	}

	// Check if the magic item doesn't already exist (with the same choice, if any)
	if (IsNotImport && !ignoreDuplicates && aMI) {
		// count occurrence of parent & choice
		var parentDupl = 0;
		var choiceDupl = 0;
		for (var i = 0; i < CurrentMagicItems.known.length; i++) {
			if (i == ArrayNmbr) continue;
			if (CurrentMagicItems.known[i] == newMI) {
				parentDupl++;
				if (newMIvar && CurrentMagicItems.choices[i] == newMIvar) choiceDupl++;
			}
		}
		if ((parentDupl && !aMI.allowDuplicates) || (choiceDupl && !aMIvar.allowDuplicates)) {
			var stopFunct = app.alert({
				cTitle : "Can only have one instance of a magic item",
				cMsg : "The magic item that you have selected, '" + (choiceDupl ? theMI.name : aMI.name) + "' is already present on the sheet and you can't have duplicates of it.\n\nIf you want to show that your character has multiples of this item, consider adding \"(2)\" after its name. You can also list it in one of the equipment sections, where you can denote the number you have." + (newMIvar && !choiceDupl ? "\n\nHowever, as this is a composite item that exists in different forms, and you don't have '" + theMI.name + "' yet, the sheet can allow you to add it regardless of the rules. Do you want to continue adding this item?" : ""),
				nIcon : !newMIvar || choiceDupl ? 0 : 1,
				nType : !newMIvar || choiceDupl ? 0 : 2
			});
			if (stopFunct === 1 || stopFunct === 3) {
				doNotCommit();
				return;
			}
		}
	}

	// Before stopping the calculations, first test if the magic item has a prerequisite and if it meets that
	if (IsNotImport && IsNotReset && theMI && theMI.prereqeval && !ignorePrereqs && event.target && event.target.name == MIflds[0]) {
		try {
			if (typeof theMI.prereqeval == 'string') {
				var meetsPrereq = eval(theMI.prereqeval);
			} else if (typeof theMI.prereqeval == 'function') {
				var gatherVars = gatherPrereqevalVars();
				gatherVars.choice = newMIvar;
				var meetsPrereq = theMI.prereqeval(gatherVars);
			}
		} catch (error) {
			var eText = "The 'prereqeval' attribute for the magic item '" + theMI.name + "' produces an error and is subsequently ignored. If this is one of the built-in magic items, please contact morepurplemorebetter using one of the contact bookmarks to let him know about this bug. Please do not forget to list the version number of the sheet, name and version of the software you are using, and the name of the magic item.\nThe sheet reports the error as\n " + error + "\n ";
			for (var e in error) eText += e + ": " + error[e] + ";\n ";
			console.println(eText);
			console.show();
			var meetsPrereq = true;
		};
		if (!meetsPrereq) {
			thermoTxt = thermoM("The magic item '" + theMI.name + "' has prerequisites that have not been met...", false); //change the progress dialog text
			thermoM(1/5); //increment the progress dialog's progress

			var askUserMI = app.alert({
				cTitle : "The prerequisites for '" + theMI.name + "' have not been met",
				cMsg : "The magic item that you have selected, '" + theMI.name + "' has a prerequisite listed" + (theMI.prerequisite ? ' as: \n\t"' + theMI.prerequisite + '"' : ".") + "\n\nYour character does not meet this requirement. Are you sure you want to apply this magic item?",
				nIcon : 1,
				nType : 2
			});

			if (askUserMI !== 4) { // If "NO" was pressed
				doNotCommit();
				return;
			}
		};
	};

	// if a magic item variant was chosen, make sure this field will show that selection, now that it can't be cancelled anymore due to not meeting a prerequisite
	if (setFieldValueTo) event.target.setVal = setFieldValueTo;

	calcStop(); // Now stop the calculations

	// Remove previous magic item at the same field
	if (oldMI !== newMI || oldMIvar !== newMIvar) {
		// Remove everything from the description field, value, calculation, tooltip, submitname
		tDoc.getField(MIflds[2]).setAction("Calculate", "");
		Value(MIflds[2], "", "", "");
		if (oldMI) {
			var anOldMI = MagicItemsList[oldMI];
			var skipNoAttunement = isDisplay(MIflds[4]) == display.visible && !tDoc.getField(MIflds[4]).isBoxChecked(0);
			if (oldMI !== newMI && !skipNoAttunement) {
				// Undo the selection of a weapon, ammo, or armor if defined
				if (anOldMI.chooseGear || (oldMIvar && anOldMI[oldMIvar].chooseGear)) {
					selectMagicItemGearType(false, FldNmbr, oldMIvar && anOldMI[oldMIvar].chooseGear ? anOldMI[oldMIvar].chooseGear : anOldMI.chooseGear);
				}

				// Remove its attributes
				var Fea = ApplyFeatureAttributes(
					"item", // type
					oldMI, // fObjName
					[CurrentMagicItems.level, 0, false], // lvlA [old-level, new-level, force-apply]
					[oldMIvar, "", false], // choiceA [old-choice, new-choice, "only"|"change"]
					false // forceNonCurrent
				);
			}
			// Remove the source from the notes field
			var sourceStringOld = stringSource(oldMIvar && anOldMI[oldMIvar].source ? anOldMI[oldMIvar] : anOldMI, "first", "[", "]");
			if (sourceStringOld) RemoveString(MIflds[1], sourceStringOld);
		}
		// Reset the attuned and weight fields
		tDoc.resetForm([MIflds[3], MIflds[4]]);
		AddTooltip(MIflds[4], undefined, "");
	}

	// Update the CurrentMagicItems.known variable
	CurrentMagicItems.known[ArrayNmbr] = newMI;
	CurrentMagicItems.choices[ArrayNmbr] = newMIvar;

	// Do something if there is a new magic item to apply
	if (aMI) {
		thermoTxt = thermoM("Applying '" + theMI.name + "' magic item...", false); //change the progress dialog text
		thermoM(1/3); //increment the progress dialog's progress

		// Set the field calculation
		if (theMI.calculate) {
			var theCalc = What("Unit System") === "imperial" ? theMI.calculate : ConvertToMetric(theMI.calculate, 0.5);
			if (typePF) theCalc = theCalc.replace("\n", " ");
			tDoc.getField(MIflds[2]).setAction("Calculate", theCalc);
		}

		// Create the tooltip
		var tooltipStr = (theMI.type ? theMI.type + ", " : "") + (theMI.rarity ? theMI.rarity : "");
		if (theMI.attunement) tooltipStr += tooltipStr ? " (requires attunement)" : "requires attunement";
		tooltipStr = toUni(theMI.name) + (tooltipStr ? "\n" + tooltipStr[0].toUpperCase() + tooltipStr.substr(1) : "");

		if (theMI.notLegalAL) {
			tooltipStr += "\n \u2022 Illegal in Adventurers League play";
		} else if (theMI.magicItemTable) {
			if (isArray(theMI.magicItemTable)) {
				theMI.magicItemTable.sort();
				tooltipStr += formatLineList("\n \u2022 Table: ", theMI.magicItemTable);
				var lowestTable = theMI.magicItemTable[0];
			} else {
				var lowestTable = theMI.magicItemTable;
				tooltipStr += "\n \u2022 Table: " + theMI.magicItemTable;
			}
			if (TreasureCheckpointsTable[lowestTable]) {
				var aTC = TreasureCheckpointsTable[lowestTable];
				tooltipStr += " (Tier " + aTC.tier + "+; " + aTC.points + " Treasure Checkpoints)";
			}
			tooltipStr += ".";
		} else if (theMI.rarity && theMI.rarity == "common") {
			tooltipStr += "\n \u2022 AL: Tier 1+; 2 Treasure Checkpoints";
		} else if (theMI.storyItemAL) {
			tooltipStr += "\n \u2022 Story Item (AL: only use in adventure it's found in)";
		} else if (!theMI.extraTooltip) {
			tooltipStr += "\n \u2022 Can't be traded in Adventurers League play";
		}
		if (theMI.extraTooltip) {
			tooltipStr += "\n \u2022 " + theMI.extraTooltip;
		}
		if (theMI.prerequisite) tooltipStr += "\n \u2022 Prerequisite: " + theMI.prerequisite;
		tooltipStr += stringSource(theMI, "full,page", "\n \u2022 Source: ", ".");

		if (theMI.descriptionFull) tooltipStr += isArray(theMI.descriptionFull) ? desc(theMI.descriptionFull).replace(/^\n   /i, "\n\n") : "\n\n" + theMI.descriptionFull;

		// Get the description
		var theDesc = "";
		if (!theMI.calculate) {
			theDesc = FldNmbr > FieldNumbers.magicitemsD && theMI.descriptionLong ? theMI.descriptionLong : theMI.description ? theMI.description : "";
			if (What("Unit System") !== "imperial") theDesc = ConvertToMetric(theDesc, 0.5);
			if (typePF) theDesc = theDesc.replace("\n", " ");
		}

		// Set it all to the appropriate field
		Value(MIflds[2], theDesc, tooltipStr, theMI.calculate ? theCalc : "");

		// Set the notes field
		var sourceString = stringSource(theMI, "first", "[", "]");
		if (sourceString) AddString(MIflds[1], sourceString, " ");

		// Set the weight
		if (theMI.weight) {
			var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
			Value(MIflds[3], RoundTo(theMI.weight * massMod, 0.001, true));
		} else {
			Value(MIflds[3], 0);
		}

		// Apply the rest of its attributes
		if (oldMI !== newMI || oldMIvar !== newMIvar) {
			// Set the attunement
			Checkbox(MIflds[4], theMI.attunement ? true : false, undefined, theMI.attunement ? "" : "hide");
			var justChange = oldMI == newMI && oldMIvar !== newMIvar;
			var Fea = ApplyFeatureAttributes(
				"item", // type
				newMI, // fObjName
				[justChange ? CurrentMagicItems.level : 0, CurrentMagicItems.level, justChange], // lvlA [old-level, new-level, force-apply]
				justChange ? [oldMIvar, newMIvar, "change"] : ["", newMIvar, false], // choiceA [old-choice, new-choice, "only"|"change"]
				false // forceNonCurrent
			);
		}

		// Do the selection of a weapon, ammo, or armor if defined
		var skipNoAttunement = isDisplay(MIflds[4]) == display.visible && !tDoc.getField(MIflds[4]).isBoxChecked(0);
		if (!skipNoAttunement && oldMI == newMI && (aMI.chooseGear || (oldMIvar && aMI[oldMIvar].chooseGear))) {
			// undo the previous
			selectMagicItemGearType(false, FldNmbr, oldMIvar && aMI[oldMIvar].chooseGear ? aMI[oldMIvar].chooseGear : aMI.chooseGear, oldMIvar);
		}
		if ((oldMI !== newMI || oldMIvar !== newMIvar) && theMI.chooseGear) selectMagicItemGearType(true, FldNmbr, theMI.chooseGear);
	}

	// Set the visibility of the attuned checkbox
	setMIattunedVisibility(FldNmbr);

	thermoM(thermoTxt, true); // Stop progress bar
};

function correctMIdescriptionLong(FldNmbr) {
	if (CurrentVars.manual.items) return;
	var ArrayNmbr = FldNmbr - 1;
	var aMI = MagicItemsList[CurrentMagicItems.known[ArrayNmbr]];
	var aMIvar = aMI && CurrentMagicItems.choices[ArrayNmbr] ? aMI[CurrentMagicItems.choices[ArrayNmbr]] : false;

	// Create the object to use (merge parent and choice)
	if (!aMIvar) {
		var theMI = aMI;
	} else {
		var theMI = {}
		var MIattr = ["description", "descriptionLong", "calculate"];
		for (var a = 0; a < MIattr.length; a++) {
			var aKey = MIattr[a];
			if (aMIvar[aKey]) {
				theMI[aKey] = aMIvar[aKey];
			} else if (aMI[aKey]) {
				theMI[aKey] = aMI[aKey];
			}
		}
	}

	// Now only do something if a magic item is recognized, doesn't have a calculation, or doesn't have two different description options (normal & long)
	if (!aMI || theMI.calculate || !theMI.descriptionLong) return;

	var theDesc = FldNmbr > FieldNumbers.magicitemsD && theMI.descriptionLong ? theMI.descriptionLong : theMI.description ? theMI.description : "";
	if (What("Unit System") !== "imperial") theDesc = ConvertToMetric(theDesc, 0.5);
	if (typePF) theDesc = theDesc.replace("\n", " ");
	Value("Extra.Magic Item Description " + FldNmbr, theDesc);
	// Apply the chooseGear item again to the description
	var hasChooseGear = aMIvar && aMIvar.chooseGear ? aMIvar.chooseGear : aMI.chooseGear;
	if (hasChooseGear) selectMagicItemGearType(true, FldNmbr, hasChooseGear, false, true);
}

function ApplyAttunementMI(FldNmbr) {
	if (CurrentVars.manual.items) return;
	var ArrayNmbr = FldNmbr - 1;
	var aMI = CurrentMagicItems.known[ArrayNmbr];
	if (!aMI) return; // no magic item recognized, so do nothing
	var aMIvar = CurrentMagicItems.choices[ArrayNmbr];

	var theFld = event.target && event.target.name.indexOf("Extra.Magic Item Attuned ") !== -1 ? event.target : tDoc.getField("Extra.Magic Item Attuned " + FldNmbr);
	var isChecked = theFld.isBoxChecked(0);

	// Start progress bar and stop calculation
	var thermoTxt = thermoM((isChecked ? "Applying" : "Removing") + " magic item features...");
	calcStop();
	thermoM(1/2); // Increment the progress bar

	// now apply or remove the magic item's features
	var Fea = ApplyFeatureAttributes(
		"item", // type
		aMI, // fObjName
		isChecked ? [0, CurrentMagicItems.level, false] : [CurrentMagicItems.level, 0, false], // lvlA [old-level, new-level, force-apply]
		isChecked ? ["", aMIvar, false] : [aMIvar, "", false], // choiceA [old-choice, new-choice, "only"|"change"]
		false // forceNonCurrent
	);

	// Do the selection of a weapon, ammo, armor if defined
	var useChooseGear = aMIvar && MagicItemsList[aMI][aMIvar].chooseGear ? MagicItemsList[aMI][aMIvar].chooseGear : MagicItemsList[aMI].chooseGear ? MagicItemsList[aMI].chooseGear : false;
	if (useChooseGear) selectMagicItemGearType(isChecked, FldNmbr, useChooseGear);
}

// Hide/show the attuned checkbox for a magic item entry
function setMIattunedVisibility(FldNmbr, force) {
	var MIflds = ReturnMagicItemFieldsArray(FldNmbr);
	var hideIt = How(MIflds[4]) != "";
	if (!force && hideIt == isDisplay(MIflds[4])) return; // already the right display

	var isOF = FldNmbr > FieldNumbers.magicitemsD;
	if (isOF && !isTemplVis("ASoverflow")) return; // overflow, but overflow is not visible

	// Define some constants
	var noteWidth = typePF ? 25 : 35;
	var fullWidth = !typePF ? 216 : isOF ? 243.45 : 164.3;
	var nameRect = tDoc.getField(MIflds[0] + ".1").rect;
	var noteRect = tDoc.getField(MIflds[1] + ".1").rect;
	var startCount = nameRect[0];
	var smallWidth = !typePF ? tDoc.getField(MIflds[4] + ".1").rect[0] - 1 - startCount : isOF ? 211.27 : 132.15;

	if (hideIt) {
		// hide it, uncheck it, and set the rect for the Name and Note fields
		Hide(MIflds[4]);
		Hide(MIflds[5]);
		Checkbox(MIflds[4], false);
		nameRect[2] = nameRect[0] + fullWidth - noteWidth;
	} else {
		// show it and set the rect for the Name and Note fields
		Show(MIflds[4]);
		Show(MIflds[5]);
		nameRect[2] = nameRect[0] + smallWidth - noteWidth;
	}
	// Apply the new positions of the Name and Note fields
	noteRect[0] = nameRect[2];
	noteRect[2] = noteRect[0] + noteWidth;
	tDoc.getField(MIflds[1] + ".1").rect = noteRect;
	tDoc.getField(MIflds[0] + ".1").rect = nameRect;
	if (!event.target || event.target.name !== MIflds[0]) {
		// Re-input the value as to counteract the changing of font rendering
		tDoc.getField(MIflds[0]).value = tDoc.getField(MIflds[0]).value;
	}
}

// Correct the visibility of the Magic Item attuned checkboxes when showing the 3rd/overflow page
function correctMIattunedVisibility(pageType) {
	var startNo = pageType == "ASoverflow" ? FieldNumbers.magicitemsD + 1 : 1;
	var endNo = pageType == "ASoverflow" ? FieldNumbers.magicitems : FieldNumbers.magicitemsD;
	for (var i = startNo; i <= endNo; i++) {
		setMIattunedVisibility(i, true);
	}
}

// Set the options of the dropdown of magic items
function SetMagicItemsDropdown(forceTooltips) {
	var ArrayDing = [""];
	var tempString = "Type in the name of the magic item (or select it from the drop-down menu) and its text and features will be filled out automatically, provided it is a recognized magic item.\n\nAbility scores will not be automatically altered other than their tool tips (mouseover texts) and in the Scores dialog.";
	for (var key in MagicItemsList) {
		if (testSource(key, MagicItemsList[key], "magicitemExcl")) continue;
		var MIname = MagicItemsList[key].name;
		if (ArrayDing.indexOf(MIname) === -1) ArrayDing.push(MIname);
	}
	ArrayDing.sort();

	var ArrayDingSource = ArrayDing.toSource();
	var applyItems = tDoc.getField("Extra.Magic Item 1").submitName !== ArrayDingSource;
	if (applyItems) tDoc.getField("Extra.Magic Item 1").submitName = ArrayDingSource;

	for (var i = 1; i <= FieldNumbers.magicitems; i++) {
		var MIfld = "Extra.Magic Item " + i;
		var MIfldV = What(MIfld);
		if (applyItems) {
			tDoc.getField(MIfld).setItems(ArrayDing);
			Value(MIfld, MIfldV, tempString);
		} else if (forceTooltips) {
			AddTooltip(MIfld, tempString);
		}
	}
}

//make a menu of all the magic items, sorted by different criteria
function ParseMagicItemMenu() {
	var iMenus = {
		alphabetical : {},
		rarity : {
			common : [],
			uncommon : [],
			rare : [],
			"very rare" : [],
			legendary : [],
			artifact : []
		},
		type : {
			"Armor, shield, AC bonus" : [],
			Potion : [],
			Ring : [],
			Rod : [],
			Scroll : [],
			Staff : [],
			Wand : [],
			"Wondrous item" : [],
			Weapon : []
		},
		special : {
			"Ability score increase" : [],
			"Hit points" : [],
			Movement : [],
			"Resistances or immunities" : [],
			Skills : [],
			Spells : [],
			Vision : [],
		},
		source : { namesArr : [] },
		ref : {}
	};
	var spaceArr = new Array(38).join("\u2002");
	var amendSrc = function(nameTxt, srcTxt) {
		if (!srcTxt) return nameTxt;
		return nameTxt + spaceArr.slice(0, nameTxt.length < 35 ? 38 - nameTxt.length : 4) + srcTxt;
	}
	var sortItem = function(mainItem, subItem) {
		var iObj = MagicItemsList[mainItem];
		var sObj = subItem ? iObj[subItem.toLowerCase()] : false;
		var tObj = sObj ? {} : iObj;
		if (sObj) {
			for (var attr in iObj) tObj[attr] = iObj[attr];
			for (var attr in sObj) tObj[attr] = sObj[attr];
		}
		var iSrc = tObj.source ? stringSource(tObj, "first,abbr", "(", ")") : false;  // DEBUGGING!!!
		var itemName = amendSrc(RemoveZeroWidths(!sObj ? iObj.name : sObj.name ? sObj.name : iObj.name + " [" + subItem + "]"), iSrc);
		var firstLetter = itemName[0].toUpperCase();
		// If this is a subitem and it has the exact same name as a previously added subitem, we have to make sure it 
		if (sObj && sObj.name && iMenus.ref[itemName]) {
			itemName = amendSrc(RemoveZeroWidths(iObj.name + " [" + subItem + "]"), iSrc);
			firstLetter = itemName[0].toUpperCase();
		}
		iMenus.ref[itemName] = subItem ? mainItem + "#" + subItem : mainItem;
		if (!iMenus.alphabetical[firstLetter]) iMenus.alphabetical[firstLetter] = [];
		iMenus.alphabetical[firstLetter].push(itemName);
		if (tObj.source) {
			var aSrcs = parseSource(tObj.source);
			for (var a = 0; a < aSrcs.length; a++) {
				var aSrc = SourceList[aSrcs[a][0]];
				var uSrc = aSrc.name + " (" + aSrc.abbreviation + ")";
				if (!iMenus.source[uSrc]) {
					iMenus.source[uSrc] = [];
					iMenus.source.namesArr.push(uSrc);
				}
				iMenus.source[uSrc].push(itemName);
			}
		}
		if (tObj.rarity && iMenus.rarity[tObj.rarity.toLowerCase()]) {
			iMenus.rarity[tObj.rarity.toLowerCase()].push(itemName);
		}
		if ((/weapon/i).test(tObj.type) || tObj.weaponsAdd || tObj.weaponOptions || (tObj.chooseGear && (/weapon|ammo/i).test(tObj.chooseGear.type))) {
			iMenus.type.Weapon.push(itemName);
		}
		if ((/armor|shield/i).test(tObj.type) || tObj.armorAdd || tObj.shieldAdd || tObj.armorOptions || tObj.extraAC || (tObj.chooseGear && tObj.chooseGear.type == "armor")) {
			iMenus.type["Armor, shield, AC bonus"].push(itemName);
		}
		var searchType = tObj.type ? tObj.type.toLowerCase() : false;
		for (var aType in iMenus.type) {
			if (!searchType) break;
			if ((/weapon|armor|shield/i).test(aType)) continue;
			if (searchType.indexOf(aType.toLowerCase()) !== -1) {
				iMenus.type[aType].push(itemName);
				break;
			}
		}
		if (tObj.scores || tObj.scorestxt || tObj.scoresOverride) {
			iMenus.special["Ability score increase"].push(itemName);
		}
		if (tObj.calcChanges && tObj.calcChanges.hp) {
			iMenus.special["Hit points"].push(itemName);
		}
		if (tObj.speed || (/(flying|climbing|burrowing|swimming|walking) speed/i).test(tObj.descriptionFull) || (/of (flying|climbing|burrowing|swimming)/i).test(tObj.name)) {
			iMenus.special.Movement.push(itemName);
		}
		if (tObj.dmgres || (tObj.savetxt && tObj.savetxt.immune)) {
			iMenus.special["Resistances or immunities"].push(itemName);
		}
		if (tObj.skills || tObj.skillstxt || tObj.advantage) {
			iMenus.special.Skills.push(itemName);
		}
		if (tObj.spellcastingBonus || tObj.spellChanges || (tObj.calcChanges && tObj.calcChanges.spellList)) {
			iMenus.special.Spells.push(itemName);
		}
		if (tObj.vision) {
			iMenus.special.Vision.push(itemName);
		}
	}
	for (var item in MagicItemsList) {
		var anItem = MagicItemsList[item];
		if (anItem.source && testSource(item, anItem, "magicitemExcl")) continue;
		var justDoMainItem = true;
		if (anItem.choices && !anItem.selfChoosing) {
			for (var c = 0; c < anItem.choices.length; c++) {
				var aChL = anItem.choices[c].toLowerCase();
				var aSubItem = anItem[aChL];
				if (!aSubItem || (aSubItem.source && testSource(aChL, aSubItem, "magicitemExcl"))) continue;
				for (var attr in aSubItem) {
					if (!(/^(description.*|name.*|source|notLegalAL|magicItemTable|storyItemAL|extraTooltip|attunement|weight|prereq.*|allowDuplicates|calculate)$/i).test(attr)) {
						justDoMainItem = false;
						sortItem(item, anItem.choices[c]);
						break;
					}
				}
			}
		}
		if (justDoMainItem) sortItem(item);
	}
	// First add the alphabetical listing of all the magic items
	var tempMenu = [], alphabetaArr = [];
	for (var letter in iMenus.alphabetical) alphabetaArr.push(letter);
	alphabetaArr.sort();
	for (var i = 0; i < alphabetaArr.length; i++) {
		var tempMenu2 = iMenus.alphabetical[alphabetaArr[i]];
		tempMenu2.sort();
		for (var a = 0; a < tempMenu2.length; a++) {
			tempMenu2[a] = {
				cName : tempMenu2[a],
				cReturn : "item#set#" + iMenus.ref[tempMenu2[a]]
			}
		}
		tempMenu.push({ cName : alphabetaArr[i], oSubMenu : [].concat(tempMenu2) });
	}
	AddMagicItemsMenu = [{
		cName : "Alphabetically",
		oSubMenu : [].concat(tempMenu)
	}]
	// Then a menu per rarity
	var tempMenu = [];
	for (var entry in iMenus.rarity) {
		var tempMenu2 = iMenus.rarity[entry];
		if (!tempMenu2.length) continue;
		tempMenu2.sort();
		for (var a = 0; a < tempMenu2.length; a++) {
			tempMenu2[a] = {
				cName : tempMenu2[a],
				cReturn : "item#set#" + iMenus.ref[tempMenu2[a]]
			}
		}
		tempMenu.push({ cName : entry[0].toUpperCase() + entry.substr(1), oSubMenu : [].concat(tempMenu2) });
	}
	AddMagicItemsMenu.push({
		cName : "By rarity",
		oSubMenu : [].concat(tempMenu)
	});
	// Then a menu per source
	var tempMenu = [];
	iMenus.source.namesArr.sort();
	for (var s = 0; s < iMenus.source.namesArr.length; s++) {
		var entry = iMenus.source.namesArr[s];
		var tempMenu2 = iMenus.source[entry];
		if (!tempMenu2 || !tempMenu2.length || entry == "namesArr") continue;
		tempMenu2.sort();
		for (var a = 0; a < tempMenu2.length; a++) {
			tempMenu2[a] = {
				cName : tempMenu2[a],
				cReturn : "item#set#" + iMenus.ref[tempMenu2[a]]
			}
		}
		tempMenu.push({ cName : entry, oSubMenu : [].concat(tempMenu2) });
	}
	AddMagicItemsMenu.push({
		cName : "By source",
		oSubMenu : [].concat(tempMenu)
	}, { cName : "-" });
	// Then a main menu item per type
	for (var entry in iMenus.type) {
		var tempMenu2 = iMenus.type[entry];
		if (!tempMenu2.length) continue;
		tempMenu2.sort();
		for (var a = 0; a < tempMenu2.length; a++) {
			tempMenu2[a] = {
				cName : tempMenu2[a],
				cReturn : "item#set#" + iMenus.ref[tempMenu2[a]]
			}
		}
		AddMagicItemsMenu.push({ cName : entry, oSubMenu : [].concat(tempMenu2) });
	}
	AddMagicItemsMenu.push({ cName : "-" });
	// Then a main menu item per bonus
	for (var entry in iMenus.special) {
		var tempMenu2 = iMenus.special[entry];
		if (!tempMenu2.length) continue;
		tempMenu2.sort();
		for (var a = 0; a < tempMenu2.length; a++) {
			tempMenu2[a] = {
				cName : tempMenu2[a],
				cReturn : "item#set#" + iMenus.ref[tempMenu2[a]]
			}
		}
		AddMagicItemsMenu.push({ cName : entry, oSubMenu : [].concat(tempMenu2) });
	}
};

//Make menu for the button on each Magic Item line and parse it to Menus.magicitems
function MakeMagicItemMenu_MagicItemOptions(MenuSelection, itemNmbr) {
	var magicMenu = [];
	if (!itemNmbr) itemNmbr = parseFloat(event.target.name.slice(-2));
	var ArrayNmbr = itemNmbr - 1;
	var MIflds = ReturnMagicItemFieldsArray(itemNmbr);
	var theField = What(MIflds[0]) != "";
	var noUp = itemNmbr === 1;
	var noDown = itemNmbr === FieldNumbers.magicitems;
	var upToOtherPage = itemNmbr === (FieldNumbers.magicitemsD + 1) ? " (to third page)" : "";
	var downToOtherPage = itemNmbr === FieldNumbers.magicitemsD ? " (to overflow page)" : "";
	var visibleAttunement = How(MIflds[4]) == "";
	var aMI;

	if (!MenuSelection || MenuSelection === "justMenu") {
		// a function to add the other items
		var menuLVL1 = function (array) {
			for (i = 0; i < array.length; i++) {
				magicMenu.push({
					cName : array[i][0],
					cReturn : "item#" + array[i][1],
					bEnabled : array[i][2] !== undefined ? array[i][2] : true,
					bMarked : array[i][3] !== undefined ? array[i][3] : false
				});
			}
		};
		// if this magic item allows for a choice, add that option as the first thing in the menu
		if (CurrentMagicItems.known[ArrayNmbr]) {
			aMI = MagicItemsList[CurrentMagicItems.known[ArrayNmbr]];
			if (MagicItemsList[CurrentMagicItems.known[ArrayNmbr]].choices) {
				var aMIopts = aMI.choices;
				var choiceMenu = {
					cName : "Change type of " + aMI.name,
					oSubMenu : []
				};
				for (var i = 0; i < aMIopts.length; i++) {
					var aCh = aMIopts[i];
					var aChL = aCh.toLowerCase();
					if (!aMI[aChL] || (aMI[aChL].source && testSource(aChL, aMI[aChL], "magicitemExcl"))) continue;
					choiceMenu.oSubMenu.push({
						cName : aCh + stringSource(aMI[aChL].source ? aMI[aChL] : aMI, "first,abbr", "\t   [", "]"),
						cReturn : "item#choice#" + aChL,
						bMarked : CurrentMagicItems.choices[ArrayNmbr] == aChL
					});
				}
				if (choiceMenu.oSubMenu.length > 1) magicMenu.push(choiceMenu);
			}
			// an option to read the whole description
			if (Who(MIflds[2])) menuLVL1([["Show full text of " + aMI.name, "popup"]]);
			// add a separator if we have any items in the menu so far
			if (magicMenu.length) magicMenu.push({ cName : "-" });
		}
		// a way to select another magic item
		if (!AddMagicItemsMenu) ParseMagicItemMenu();
		magicMenu.push({
			cName : CurrentMagicItems.known[ArrayNmbr] ? "Change item to" : "Apply item",
			oSubMenu : AddMagicItemsMenu
		},{ cName : "-" });
		// now all the default options
		var magicArray = [
			["Move up" + upToOtherPage, "up", !noUp],
			["Move down" + downToOtherPage, "down", !noDown],
			["-", "-"],
			["Insert empty item", "insert", noDown || !theField ? false : true],
			["Delete item", "delete"],
			["Clear item", "clear"],
			["-", "-"],
			["Show attuned checkbox", "attunement", undefined, visibleAttunement],
			["-", "-"],
			["Copy to Adventuring Gear (page 2)", "equipment#gear#r", theField]
		].concat(What("Adventuring Gear Remember") !== false || !visibleAttunement ? [] : [
			["Copy to Attuned Magical Items (page 2)", "equipment#magic#", theField]
		]).concat([
			["Copy to Extra Equipment (page 3)", "equipment#extra#", theField]
		]);
		menuLVL1(magicArray);
		// set it to the global variable
		Menus.magicitems = magicMenu;
		if (MenuSelection == "justMenu") return;
	}
	MenuSelection = MenuSelection ? MenuSelection : getMenu("magicitems");
	if (!MenuSelection || MenuSelection[0] == "nothing" || MenuSelection[0] != "item") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Magic item menu option...");

	var getChoiceName = function(item, choice) {
		var aMI = MagicItemsList[item];
		if (!choice || !aMI[choice]) return aMI.name;
		if (aMI[choice].name) return aMI[choice].name;
		for (var i = 0; i < aMI.choices.length; i++) {
			if (aMI.choices[i].toLowerCase() == choice) {
				return aMI.name + " [" + aMI.choices[i] + "]";
			}
		}
	}

	switch (MenuSelection[1]) {
		case "set" :
			Value(MIflds[0], getChoiceName(MenuSelection[2], MenuSelection[3]));
			break;
		case "popup" :
			ShowDialog("Magic item's full description", Who(MIflds[2]));
			break;
		case "choice" :
			aMI = MagicItemsList[CurrentMagicItems.known[ArrayNmbr]];
			if (MenuSelection[2] && aMI && aMI[MenuSelection[2]] && CurrentMagicItems.choices[ArrayNmbr] != MenuSelection[2]) {
				var aMIvar = aMI[MenuSelection[2]];
				Value(MIflds[0], getChoiceName(CurrentMagicItems.known[ArrayNmbr], MenuSelection[2]));
			}
			break;
		case "up" :
			if (noUp) return;
		case "down" :
			if (MenuSelection[1] == "down" && noDown) return;
			calcStop();
			IsNotMagicItemMenu = false;
			thermoTxt = thermoM("Moving the magic item " + MenuSelection[1] + "...", false);
			// Get the other fields
			var otherNmbr = MenuSelection[1] == "down" ? itemNmbr + 1 : itemNmbr - 1;
			var MIfldsO = ReturnMagicItemFieldsArray(otherNmbr);
			// Now swap all the fields
			for (var i = 0; i < MIflds.length - 1; i++) {
				var exclObj = i != 0 ? {} : { userName : true, submitName : true, noCalc : true };
				copyField(MIflds[i], MIfldsO[i], exclObj, true);
				thermoM(i/(MIflds.length - 1)); //increment the progress dialog's progress
			}
			// Correct the visibility of the attuned fields
			setMIattunedVisibility(itemNmbr);
			setMIattunedVisibility(otherNmbr);
			// Correct the entry in the CurrentMagicItems.known array
			if (!CurrentVars.manual.items) {
				var thisKnown = CurrentMagicItems.known[itemNmbr - 1];
				var thisChoice = CurrentMagicItems.choices[itemNmbr - 1];
				CurrentMagicItems.known[itemNmbr - 1] = CurrentMagicItems.known[otherNmbr - 1];
				CurrentMagicItems.known[otherNmbr - 1] = thisKnown;
				CurrentMagicItems.choices[itemNmbr - 1] = CurrentMagicItems.choices[otherNmbr - 1];
				CurrentMagicItems.choices[otherNmbr - 1] = thisChoice;
			}
			// Correct the description if moving between 3rd and overflow page
			if ((upToOtherPage && MenuSelection[1] == "up") || (downToOtherPage && MenuSelection[1] == "down")) {
				correctMIdescriptionLong(itemNmbr);
				correctMIdescriptionLong(otherNmbr);
			}
			IsNotMagicItemMenu = true;
			break;
		case "insert" :
			MagicItemInsert(itemNmbr);
			break;
		case "delete" :
			MagicItemDelete(itemNmbr);
			break;
		case "clear" :
			thermoTxt = thermoM("Clearing magic item...", false);
			MagicItemClear(itemNmbr, true);
			break;
		case "equipment" :
			calcStop();
			thermoTxt = thermoM("Copying the item to equipment section...", false);
			var itemWeight = What(MIflds[3]);
			if (isNaN(itemWeight) || itemWeight <= 0) itemWeight = "";
			AddToInv(MenuSelection[2], MenuSelection[3], What(MIflds[0]), "", itemWeight, "", false, false, false, true);
			break;
		case "attunement" :
			calcStop();
			thermoTxt = thermoM((visibleAttunement ? "Hiding" : "Showing") + " the attuned checkbox...", false);
			var currentlyChecked = tDoc.getField(MIflds[4]).isBoxChecked(0);
			Checkbox(MIflds[4], !visibleAttunement && What(MIflds[0]), undefined, visibleAttunement ? "hide" : "");
			setMIattunedVisibility(itemNmbr);
			// Now if attunement was visible and it was unchecked, we have to reapply the magic item's properties
			if (!CurrentVars.manual.items) {
				var curMI = CurrentMagicItems.known[itemNmbr - 1];
				if (curMI && visibleAttunement && !currentlyChecked) {
					// now apply or remove the magic item's features
					var Fea = ApplyFeatureAttributes(
						"item", // type
						curMI, // fObjName
						[0, CurrentMagicItems.level, false], // lvlA [old-level, new-level, force-apply]
						false, // choiceA [old-choice, new-choice, "only"|"change"]
						false // forceNonCurrent
					);
				}
			}
			break;
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

// Add a magic item to the third page or overflow page
function AddMagicItem(item, attuned, itemDescr, itemWeight, overflow, forceAttunedVisible) {
	item = item.substring(0, 2) === "- " ? item.substring(2) : item;
	var itemLower = item.toLowerCase();
	var RegExItem = "\\b" + item.RegEscape() + "\\b";
	var RegExItemNo = RegExp(RegExItem + " \\+\\d+", "i");
	RegExItem = RegExp(RegExItem, "i");
	var startFld = overflow ? FieldNumbers.magicitemsD + 1 : 1;
	for (var n = 1; n <= 2; n++) {
		for (var i = startFld; i <= FieldNumbers.magicitems; i++) {
			var MIflds = ReturnMagicItemFieldsArray(i);
			var curItem = What(MIflds[0]);
			if (n === 1 && ((RegExItem.test(curItem) && !RegExItemNo.test(curItem)) || curItem.toLowerCase() === itemLower)) {
				return; // the item already exists
			} else if (n === 2 && curItem === "") {
				if (i > FieldNumbers.magicitemsD && !tDoc.getField(BookMarkList["Overflow sheet"])) DoTemplate("ASoverflow", "Add");
				Value(MIflds[0], item);
				var recognizedItem = CurrentMagicItems.known[i - 1];
				if (!recognizedItem) {
					if (itemDescr !== undefined) Value(MIflds[4], itemDescr);
					if (itemWeight !== undefined) Value(MIflds[3], itemWeight);
					if (attuned !== undefined) Checkbox(MIflds[4], attuned ? true : false);
				} else if ((forceAttunedVisible === undefined || forceAttunedVisible) && attuned !== undefined && !attuned && MagicItemsList[recognizedItem].attunement) {
					// This is an item that requires attunement, but attunement is explicitly set to none, so undo the automation of the magic item
					Checkbox(MIflds[4], false);
					ApplyAttunementMI(i);
				}
				var isAttuneVisible = How("Extra.Magic Item Attuned " + i) == "";
				if (forceAttunedVisible !== undefined && forceAttunedVisible !== isAttuneVisible) {
					AddTooltip("Extra.Magic Item Attuned " + i, undefined, forceAttunedVisible ? "" : "hide");
					setMIattunedVisibility(i);
					if (attuned === undefined) {
						Checkbox(MIflds[4], forceAttunedVisible);
					} else if (!attuned && forceAttunedVisible) {
						Checkbox(MIflds[4], false);
						ApplyAttunementMI(i);
					}
				}
				return;
			}
		}
	}
}

// Remove a magic item from the third page or overflow page
function RemoveMagicItem(item) {
	item = item.substring(0, 2) === "- " ? item.substring(2) : item;
	var itemLower = item.toLowerCase();
	var RegExItem = "\\b" + item.RegEscape() + "\\b";
	var RegExItemNo = RegExp(RegExItem + " \\+\\d+", "i");
	RegExItem = RegExp(RegExItem, "i");
	for (var i = 1; i <= FieldNumbers.magicitems; i++) {
		var curItem = What("Extra.Magic Item " + i);
		if ((RegExItem.test(curItem) && !RegExItemNo.test(curItem)) || curItem.toLowerCase() === itemLower) {
			MagicItemClear(i, true);
			break;
		}
	}
}

// Insert a magic item at the position wanted
function MagicItemInsert(itemNmbr) {
	// Stop the function if the selected slot is already empty
	if (!What("Extra.Magic Item " + itemNmbr)) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Inserting empty magic item...");
	calcStop();
	IsNotMagicItemMenu = false;

	//look for the first empty slot below the slot
	var endslot = false;
	for (var it = itemNmbr + 1; it <= FieldNumbers.magicitems; it++) {
		if (What("Extra.Magic Item " + it) === "") {
			endslot = it;
			break;
		}
	}

	// Only do something if an empty slot was found
	if (endslot) {
		// Cycle through the slots starting with the found empty one and add the values of the one above
		for (var it = endslot; it > itemNmbr; it--) {
			// Copy all the fields
			var MIfldsFrom = ReturnMagicItemFieldsArray(it - 1);
			var MIfldsTo = ReturnMagicItemFieldsArray(it);
			for (var i = 0; i < MIfldsFrom.length - 1; i++) {
				var exclObj = i != 0 ? {} : { userName : true, submitName : true, noCalc : true };
				copyField(MIfldsFrom[i], MIfldsTo[i], exclObj);
			}
			// Correct the known array & choices arrays
			if (!CurrentVars.manual.items) {
				CurrentMagicItems.known[it - 1] = CurrentMagicItems.known[it - 2];
				CurrentMagicItems.choices[it - 1] = CurrentMagicItems.choices[it - 2];
			}
			// Correct the attuned checkbox visibility
			setMIattunedVisibility(it);
			// Correct the description (normal/long)
			if (it == FieldNumbers.magicitemsD + 1) correctMIdescriptionLong(it);
		}

		// Clear the selected slot
		MagicItemClear(itemNmbr);
	}

	IsNotMagicItemMenu = true;
	thermoM(thermoTxt, true); // Stop progress bar
}

// Delete a magic item at the position wanted and move the rest up
function MagicItemDelete(itemNmbr) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Deleting magic item...");
	calcStop();

	var maxItem = FieldNumbers.magicitems;
	// Stop at the end of the first page if last one on first page is empty
	if (itemNmbr <= FieldNumbers.magicitemsD && !What("Extra.Magic Item " + FieldNumbers.magicitemsD)) maxItem = FieldNumbers.magicitemsD;

	// First clear the current item so that it's automation is run
	MagicItemClear(itemNmbr, true);
	IsNotMagicItemMenu = false;

	// Make every line identical to the one below, starting with the selected line
	for (var it = itemNmbr; it < maxItem; it++) {
		// Copy all the fields
		var MIfldsFrom = ReturnMagicItemFieldsArray(it + 1);
		var MIfldsTo = ReturnMagicItemFieldsArray(it);
		for (var i = 0; i < MIfldsFrom.length - 1; i++) {
			var exclObj = i != 0 ? {} : { userName : true, submitName : true, noCalc : true };
			copyField(MIfldsFrom[i], MIfldsTo[i], exclObj);
		}
		// Correct the known & choices arrays
		if (!CurrentVars.manual.items) {
			CurrentMagicItems.known[it - 1] = CurrentMagicItems.known[it];
			CurrentMagicItems.choices[it - 1] = CurrentMagicItems.choices[it];
		}
		// Correct the attuned checkbox visibility
		setMIattunedVisibility(it);
		// Correct the description (normal/long)
		if (it == FieldNumbers.magicitemsD) correctMIdescriptionLong(it);
	}

	// Clear the final line
	MagicItemClear(maxItem);

	IsNotMagicItemMenu = true;
	thermoM(thermoTxt, true); // Stop progress bar
}

// Clear a magic item at the position given
function MagicItemClear(itemNmbr, doAutomation) {
	var MIflds = ReturnMagicItemFieldsArray(itemNmbr);
	if (doAutomation && !CurrentVars.manual.items && CurrentMagicItems.known[itemNmbr - 1]) {
		IsNotMagicItemMenu = true;
		Value("Extra.Magic Item " + itemNmbr, "");
		tDoc.resetForm(MIflds[1]);
	} else {
		if (!CurrentVars.manual.items) CurrentMagicItems.known[itemNmbr - 1] = "";
		AddTooltip(MIflds[2], "", "");
		tDoc.getField(MIflds[2]).setAction("Calculate", "");
		AddTooltip(MIflds[4], undefined, "");
		if (IsNotReset) tDoc.resetForm(MIflds);
		setMIattunedVisibility(itemNmbr);
	}
}

// Change the magic item to include a selected weapon, armor, or ammunition
function selectMagicItemGearType(AddRemove, FldNmbr, typeObj, oldChoice, correctingDescrLong) {
	if (!event.target || !event.target.name || event.target.name.indexOf("Extra.Magic Item ") == -1 || !typeObj.type) return;
	if (typeObj.excludeCheck && typeof typeObj.excludeCheck != "function") delete typeObj.excludeCheck;
	// see what type of thing we are dealing with or return if none is recognized
	switch (typeObj.type.toLowerCase()) {
		case "ammo":
		case "ammos":
		case "ammunition":
		case "ammunitions":
			var typeNm = "ammunition";
			var typeNmC = "Ammunition";
			var parseFnct = "ParseAmmo";
			var baseList = AmmoList;
			var exclObj = "ammoExcl";
			break;
		case "wea":
		case "weapon":
		case "weapons":
			var typeNm = "weapon";
			var typeNmC = "Weapon";
			var parseFnct = "ParseWeapon"
			var baseList = WeaponsList;
			var exclObj = "weapExcl";
			break;
		case "armor":
		case "armors":
		case "armour":
		case "armours":
			var typeNm = "armor";
			var typeNmC = "Armor";
			var parseFnct = "ParseArmor";
			var baseList = ArmourList;
			var exclObj = "armorExcl";
			break;
		default:
			return;
	}

	var createString = function(type, addition, fixed) {
		switch (type ? type.toLowerCase() : "") {
			default:
			case "prefix":
				return addition + " " + fixed;
			case "suffix":
				return fixed + " " + addition;
			case "brackets":
				return fixed + " (" + addition.replace(/ ?\(.+\)/, '') + ")";
		}
	}
	var MIflds = ReturnMagicItemFieldsArray(FldNmbr);
	var isApplyFld = event.target.name == MIflds[0];
	var ArrayNmbr = FldNmbr - 1;
	var curItem = CurrentMagicItems.known[ArrayNmbr];
	var curChoice = oldChoice ? oldChoice : CurrentMagicItems.choices[ArrayNmbr];
	var aMI = MagicItemsList[curItem];
	var aMIvar = curChoice && aMI[curChoice] ? aMI[curChoice] : false;
	var curName = curChoice ? MagicItemsList[curItem][curChoice].name : MagicItemsList[curItem].name;
	var itemToProcess, selectedItem;

	// use the name of the choice object (if any) or the shortest of the name, nameAlt, and nameTest of the parent object
	var nameObj = aMIvar && aMIvar.name ? aMIvar : aMI;
	var curName = nameObj.name;
	var useName = [nameObj.name].concat(nameObj.nameAlt ? [nameObj.nameAlt] : []).concat(nameObj.nameTest ? [nameObj.nameTest] : []).reduce(function(a, b) { return a.length <= b.length ? a : b; });

	// get the value of the magic item name field
	var useVal = isApplyFld && AddRemove ? event.value : isApplyFld ? event.target.value : What(MIflds[0]);
	// see if the item is not already present in the string
	var isItem = tDoc[parseFnct](useVal);
	// if this is recognized as a weapon, make sure we are not just triggering on the default words (axe, sword, hammer, bow, crossbow)
	var defaultItems = {
		"battleaxe" : [/\baxes?\b/i, /battle/i],
		"longsword" : [/\bswords?\b/i, /long/i],
		"warhammer" : [/\bhammers?\b/i, /war/i],
		"shortbow" : [/\bbows?\b/i, /short/i],
		"light crossbow" : [/\bcrossbows?\b/i, /light/i]
	}
	if (typeNm == "weapon" && defaultItems[isItem] && (defaultItems[isItem][0]).test(useVal) && !(defaultItems[isItem][1]).test(useVal)) {
		isItem = ParseWeapon(useVal.replace(defaultItems[isItem][0], ''));
	}
	// if removing this item
	if (!AddRemove) {
		if (isItem) {
			selectedItem = baseList[isItem].name;
			var theItemName = selectedItem.toLowerCase();
		} else {
			return; // nothing more to do if we are just removing this item and no item is found
		}
	} else if (!isItem) {
		// collect all types of items
		var itemChoices = [];
		var itemRefs = {};
		for (var key in baseList) {
			var kObj = baseList[key];
			if (testSource(key, kObj, exclObj)) continue;
			// some type-dependent filters
			if (typeNm == "armor" && (!kObj.type || kObj.isMagicArmor)) {
				continue;
			} else if (typeNm == "weapon" && ((/natural|spell|cantrip|improvised/i).test(kObj.type) || kObj.isMagicWeapon)) {
				continue;
			} else if (typeNm == "ammunition" && (kObj.isMagicAmmo || WeaponsList[key])) {
				continue;
			}
			if (typeObj.excludeCheck && typeObj.excludeCheck(key, kObj)) continue;
			var capName = kObj.name.capitalize();
			itemChoices.push(capName);
			itemRefs[capName] = key;
		}
		if (typeNm != "armor") itemChoices.sort();
		if (!IsNotImport) {
			userSelected = itemChoices[0];
			console.println("During importing from another MPMB's Character Record Sheet, the sheet was unable to show a pop-up dialog to let you choose what type of " + typeNm + " the '" + curName + "' is. As a result, '" + userSelected + "' was chosen for you automatically. If you wish to change this, reapply the '" + curName + "'.");
			console.show();
		} else {
			var userSelected = AskUserOptions("Select Type of " + typeNmC, "Choose which " + typeNm + " type this '" + curName + "' is.\nIf you want to change the " + typeNm + " type at a later time, select the magic item again from the drop-down box." + (aMI.choices ? "\nYou will also be prompted to select the " + typeNm + " type again when you select a choice using the button in this magic item line," + (aMIvar ? " even when selecting '" + aMIvar.name + "' again." : ".") : ""), itemChoices, "radio", true);
		}

		var theItemName = userSelected.toLowerCase();
		isItem = itemRefs[userSelected];
		selectedItem = baseList[isItem].name;
	} else {
		if (isApplyFld && event.target.setVal) selectedItem = baseList[isItem].name;
		var theItemName = baseList[isItem].name.toLowerCase();
	}
	// ammunitions are often written as plural, but we don't want that here
	if (typeNm == "ammunition" && theItemName.substr(-1) == "s") {
		theItemName = theItemName.substr(0, theItemName.length - 1);
		if (selectedItem) selectedItem = selectedItem.substr(0, selectedItem.length - 1);
	}
	// get the new name of the magic item
	var newMIname = selectedItem ? createString(typeObj.prefixOrSuffix, selectedItem, useName) : useVal;
	// See if there is a special string set for how the item should appear on the 1st page
	if (typeObj.itemName1stPage) {
		itemToProcess = createString(typeObj.itemName1stPage[0], baseList[isItem].name, typeObj.itemName1stPage[1]);
	}
	// Apply the item to the sheet
	if (!correctingDescrLong) {
		switch (typeNm) {
			case "ammunition":
				tDoc[AddRemove ? 'AddAmmo' : 'RemoveAmmo'](itemToProcess ? itemToProcess : newMIname.replace(/ammunition (\+\d)/i, "$1").replace(/(\+\d) *\((.*?)\)/i, "$1 $2"), 1);
				break;
			case "weapon":
				processAddWeapons(AddRemove, itemToProcess ? itemToProcess : newMIname.replace(/weapon (\+\d)/i, "$1").replace(/(\+\d) *\((.*?)\)/i, "$1 $2"));
				break;
			case "armor":
				processAddArmour(AddRemove, itemToProcess ? itemToProcess : newMIname.replace(/armou?r (\+\d)/i, "$1").replace(/(\+\d) *\((.*?)\)/i, "$1 $2"));
				break;
		}
	}
	if (AddRemove && (isApplyFld || correctingDescrLong)) {
		// Update the description of the magic item to reflect the choice
		var descrWrd = typeObj.descriptionChange ? typeObj.descriptionChange[1] : typeNm;
		var desrcStr = What(MIflds[2]).replace(
			descrWrd,
			typeObj.descriptionChange && typeObj.descriptionChange[0].toLowerCase() == "replace" ? theItemName :
				createString(
					typeObj.descriptionChange ? typeObj.descriptionChange[0] : typeObj.prefixOrSuffix,
					theItemName,
					descrWrd
				)
		);
		Value(MIflds[2], desrcStr);
	}
	if (AddRemove && isApplyFld) {
		// set the weight of the item, if any
		if (baseList[isItem].weight) {
			var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
			Value(MIflds[3], RoundTo(baseList[isItem].weight * massMod, 0.001, true));
		}
		// set the changed name of the magic item (always do this last!)
		if (newMIname !== event.value) event.target.setVal = newMIname;
	}
}

// Gather some variables to pass to a prereqeval function
function gatherPrereqevalVars() {
	var moreProfs = What("MoreProficiencies");
	var gObj = {
		// general character abilities
		isSpellcaster : isSpellcaster(),
		characterLevel : Number(What("Character Level")),
		// armour proficiencies
		shieldProf : tDoc.getField("Proficiency Shields").isBoxChecked(0),
		lightArmorProf : tDoc.getField("Proficiency Armor Light").isBoxChecked(0),
		mediumArmorProf : tDoc.getField("Proficiency Armor Medium").isBoxChecked(0),
		heavyArmorProf : tDoc.getField("Proficiency Armor Heavy").isBoxChecked(0),
		// weapon proficiencies
		simpleWeaponsProf : tDoc.getField("Proficiency Weapon Simple").isBoxChecked(0),
		martialWeaponsProf : tDoc.getField("Proficiency Weapon Martial").isBoxChecked(0),
		otherWeaponsProf : What("Proficiency Weapon Other Description"),
		// other proficiencies
		toolProfs : [moreProfs],
		languageProfs : [moreProfs],
		skillProfs : [],
		// specifics
		hasEldritchBlast : (/,eldritch blast,/i).test(CurrentWeapons.known) || isSpellUsed("eldritch blast", true)
	};

	// fill the arrays for tool, language, and skill proficiencies
	for (var i = 1; i <= FieldNumbers.langstools; i++) {
		var aLang = What("Language " + i);
		if (aLang) gObj.languageProfs.push(aLang);
		var aTool = What("Tool " + i);
		if (aTool) gObj.toolProfs.push(aTool);
	}
	var skillsAlphaBeta = Who('Text.SkillsNames') === 'alphabeta';
	for (var i = 0; i < SkillsList.abbreviations.length - 2; i++) {
		var isProf = tDoc.getField(SkillsList.abbreviations[i] + " Prof").isBoxChecked(0);
		if (isProf) gObj.skillProfs.push(SkillsList[skillsAlphaBeta ? "names" : "namesByAS"][i]);
	}
	return gObj;
}

/*
NEW ATTRIBUTES
	limfeaname // Optional; If defined it is used for populating the limited feature section and the action section instead of `name`
	scorestxt // Optional; String; If defined it is used for the text in the Ability Score dialog and tooltips. If not defined, but 'scores' is defined, 'scores' will be used to generate a text
	scoresOverride // Optional; Array; works same as scores, but are used to populate the "Magical Override" column; If you are providing both 'scores' and 'scoresOverride' you should also give a 'scorestxt', as the auto-generated tooltip text doesn't work if you have both 'scores' and 'scoresOverride'
	calcChanges.spellList // Optional; an array with the first entry being a function, and the second entry being a descriptive text. This attribute can change the spell list created for a class / race / feat
	calcChanges.spellCalc // Optional; an array with the first entry being a function, and the second entry being a descriptive text. This attribute can change the DC, spell attack, and number of spells to memorize
	weaponOptions // Optional; an array of WeaponsList objects to be added to the WeaponsList (can also be a single object if only wanting to add a single weapon)
	armorOptions // Optional; an array of ArmourList objects to be added to the ArmourList (can also be a single object if only wanting to add a single armour)
	ammoOptions // Optional; an array of AmmoList objects to be added to the AmmoList (can also be a single object if only wanting to add a single armour)
	extraAC // replaces AddACMisc() in eval
	extraLimitedFeatures // replaces AddFeature() in eval
	carryingCapacity // multiply the Carrying Capacity Multiplier with this number
	spellcastingFactorRoundupMulti // in ClassList or ClassSublist to indicate that in case of multiclassing the spellcasting factor should be rounded up

CHANGED ATTRIBUTES
	armorProfs // Optional; Array; armor proficiencies to add [previous just 'armor']
	weaponProfs // Optional; Array; weapon proficiencies to add [previous just 'weapons' or 'weaponprofs' depending on List]
	armorAdd // Optional; String; name of the armor to put in the armor section (if results in higher AC) [previous 'addarmor']
	weaponsAdd // Optional; Array; names of the weapons to put in the attack section (if there is space) [previous 'weapons']


CHANGES TO IMPLEMENT IN LIST SCRIPTS

	'primaryAbility' for CLASS(main) no longer needs line-break, bullet point, name, or trailing semicolon
	'prereqs' for CLASS(main) no longer needs line-break, bullet point, name, or trailing semicolon


	'improvements' for RACE/FEAT replaced with 'scorestxt' (but without name or trailing semicolon)
	'improvements' for RACE/FEAT no longer needed if identical to changes by 'scores'

	'skills' can now be an array of arrays with 2 elements each, the first element being the skill name and the second element being the application of expertise "full", "increment", or "only"
	'skills' for FEATS/CLASS(main) is no longer used and should be replaced by 'skillstxt'

	'skillstxt' no longer need line breaks, name, or trailing semicolon/period
	'skillstxt' no longer needed if identical to changes by 'skills'

	'action' can now be an array, so no need for 'AddAction' in eval

	'tooltip' for racial features: make name same as tooltip (minus the parenthesis) and add limfeaname for the old name

	'eval', 'removeeval', 'changeeval' can now be a function

	'atkAdd[0]' & 'atkCalc[0]' can now be a function

	'armor' replace with 'armorProfs'
	'addarmor' replace with 'armorAdd'
	'weapons' for CLASS/FEAT: replace with 'weaponProfs'
	'weaponprofs' for RACE: replace with 'weaponProfs'
	'weapons' for RACE: replace with 'weaponsAdd'

	eval changes :
	- Class Features Remember
	- AddAction
	- AddWeapon
	- AddFeature
	- AddACMisc
	- ClassFeatureOptions (no longer needed in removeeval if to be removed at that level)

	spellcastingBonus.firstCol (options: 'atwill', 'oncesr', 'oncelr', 'markedbox', 'checkbox', 'checkedbox')
	REPLACE			WITH
	atwill : true	firstCol : 'atwill'
	oncesr : true	firstCol : 'oncesr'
	oncelr : true	firstCol : 'oncelr'
	prepared : true	firstCol : 'markedbox'

	(atwill|oncesr|oncelr) : true		firstCol : '\1'

OVERWRITTEN BY CHOICES (NOT EXTRACHOICES):
	name
	limfeaname // new, see above
	additional
	description
	recovery
	source
	usages
	usagescalc

CHANGED ATTRIBUTES
	action // can now be an array of actions
	  // if the second entry starts with a letter character, it will be used instead of the feature name
	  // if the second entry starts with a space or other common joining character like "-,'([{", it will be amended to the feature name
	  // e.g. ["action", " (start/stop)"] will result in "Feature name (start/stop)"
	  // while ["action", "start/stop"] will result in "start/stop"
	eval // can now be a function
	removeeval // can now be a function
	changeeval // can now be a function
	calcChanges.atkAdd[0] // the first entry of the array can now be a function (but has parameters!)
	calcChanges.atkCalc[0] // the first entry of the array can now be a function (but has parameters!)
	calcChanges.hp // can now be a function

	armor // replaced with armorProfs (so it is more clear)
	addarmor // replaced with armorAdd (notice difference in capitalisation)
	weapons // for CLASS/FEAT: replaced with weaponProfs (so it is more clear)
	weaponprofs // for RACE: replace with weaponProfs
	weapons // for RACE: replace with weaponsAdd


*/
