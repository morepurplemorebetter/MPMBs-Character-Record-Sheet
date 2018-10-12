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
	// validate input
	if (!lvlA) lvlA = [0,1,false];
	if (!choiceA) choiceA = ["","",false];
	type = type.toLowerCase();
	// base variables
	var FeaChoice, FeaOldChoice, tipNmExtra;
	var aParent = fObjName;
	var lvlH = Math.max(lvlA[0], lvlA[1]), lvlL = Math.min(lvlA[0], lvlA[1]);
	var defaultUnits = What("Unit System") === "imperial";

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
				var runFunction = eval(evalThing.toSource());
				runFunction(lvlA);
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
	var useAttr = function(uObj, addIt, skipEval) {
		var tipNm = displName == uObj.name ? displName : displName + ": " + uObj.name;
		var tipNmF = tipNm + (tipNmExtra ? " " + tipNmExtra : "");

		// eval or removeeval
		var a = addIt ? "eval" : "removeeval";
		if (uObj[a] && !skipEval) runEval(uObj[a], a);

		if (uObj.calcChanges) addEvals(uObj.calcChanges, tipNmF, addIt);
		if (uObj.savetxt) SetProf("savetxt", addIt, uObj.savetxt, tipNmF);
		if (uObj.speed) SetProf("speed", addIt, uObj.speed, tipNmF);
		if (uObj.addMod) processMods(addIt, tipNmF, uObj.addMod);
		if (uObj.saves) processSaves(addIt, tipNmF, uObj.addMod);
		if (uObj.toolProfs) processTools(addIt, tipNmF, uObj.toolProfs);
		if (uObj.languageProfs) processLanguages(addIt, tipNmF, uObj.languageProfs);
		if (uObj.vision) processVision(addIt, tipNmF, uObj.vision);
		if (uObj.dmgres) processResistance(addIt, tipNmF, uObj.dmgres);
		if (uObj.action) processActions(addIt, tipNmF, uObj.action, uObj.name);

		// --- backwards compatibility --- //
		var abiScoresTxt = uObj.scorestxt ? uObj.scorestxt : uObj.improvements ? uObj.improvements : false;
		if (uObj.scores || abiScoresTxt) processStats(addIt, type, tipNm, uObj.scores, abiScoresTxt, false);
		if (uObj.scoresOverride) processStats(addIt, type, tipNm, uObj.scoresOverride, abiScoresTxt, true);

		// spellcasting
		if (uObj.spellcastingBonus) processSpBonus(addIt, uObj.name, uObj.spellcastingBonus, type, aParent);
		if (CurrentSpells[aParent]) {
			if (uObj.spellFirstColTitle) CurrentSpells[aParent].firstCol = addIt ? uObj.spellFirstColTitle : false;
			if (uObj.spellcastingExtra) CurrentSpells[aParent].extra = addIt ? uObj.spellcastingExtra : false;
		}

		// --- backwards compatibility --- //
		// armor and weapon proficiencies
		var weaponProf = uObj.weaponProfs ? uObj.weaponProfs : (/^(class|feat)$/).test(type) && uObj.weapons ? uObj.weapons : uObj.weaponprofs ? uObj.weaponprofs : false;
		if (weaponProf) processWeaponProfs(addIt, tipNmF, weaponProf);
		var armorProf = uObj.armorProfs ? uObj.armorProfs : uObj.armor ? uObj.armor : false;
		if (armorProf) processArmourProfs(addIt, tipNmF, armorProf);

		// --- backwards compatibility --- //
		// armor and weapon additions
		var weaponAdd = uObj.addWeapons ? uObj.addWeapons : type == "race" && uObj.weapons ? uObj.weapons : false;
		if (weaponAdd) processAddWeapons(addIt, weaponAdd);
		var armorAdd = uObj.addArmor ? uObj.addArmor : uObj.addarmor ? uObj.addarmor : false;
		if (armorAdd) processAddArmour(addIt, armorAdd);

		// --- backwards compatibility --- //
		// skills additions
		var skillsTxt = uObj.skillstxt ? uObj.skillstxt : uObj.skills && type == "feat" && !isArray(uObj.skills) ? uObj.skills : false;
		if (skillsTxt) skillsTxt = skillsTxt.replace(/^( |\n)*.*: |\;$|\.$/g, '');
		var skills = uObj.skills && (type != "feat" || (type == "feat" && isArray(uObj.skills))) ? uObj.skills : false;
		if (skills || skillsTxt) processSkills(addIt, tipNmF, skills, skillsTxt);
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

	// First do the (remove)eval attribute of the main object, as it might change things for the choice
	var evalAddRemove = AddFea ? "eval" : "removeeval";
	if (!choiceA[2] && CheckLVL && fObj[evalAddRemove]) runEval(fObj[evalAddRemove], evalAddRemove);

	// --- backwards compatibility --- //
	// redo the choice array, as the eval might have changed it
	if (FeaOldChoice) choiceA[0] = FeaOldChoice;
	if (FeaChoice) choiceA[1] = FeaChoice;

	// set the choice objects, if any
	var cOldObj = choiceA[0] && fObj[choiceA[0]] ? fObj[choiceA[0]] : false;
	var cNewObj = choiceA[1] && fObj[choiceA[1]] ? fObj[choiceA[1]] : false;
	var cJustChange = (/change|update/).test(choiceA[2]) && cOldObj && cNewObj && choiceA[0] != choiceA[1];
	var cOnly = ((AddFea && cNewObj) || (!AddFea && cOldObj)) && (/only/).test(choiceA[2]);

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
		if (!choiceA[2]) useAttr(fObj, AddFea, true);
		// if we are are changing the choice or removing the feature, now remove the old choice
		//if (cJustChange || (!AddFea && cOldObj)) {
		if (cOldObj && (cJustChange || !AddFea)) {
			useAttr(cOldObj, false, false);
			SetFeatureChoice(type, aParent, aParent !== fObjName ? fObjName : "", false, cOnly ? choiceA[0] : "");
		}
		// if we are changing the choice or adding the feature, now add the new choice
		//if (cJustChange || cOnly || (AddFea && cNewObj)) {
		if (cNewObj && AddFea) {
			useAttr(cNewObj, true, false);
			SetFeatureChoice(type, aParent, aParent !== fObjName ? fObjName : "", AddFea ? choiceA[1] : "", cOnly ? choiceA[1] : "");
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
			var tooltipName = displName + (fObj.tooltip ? fObj.tooltip : Fea.UseName !== fObj.name ? ": " + fObj.name : "");
			AddFeature(Fea.UseName, Fea.Use, Fea.Add ? " (" + Fea.Add + ")" : "", Fea.Recov, tooltipName, Fea.UseOld, Fea.UseCalc);
		}
	}

	// changeeval always at the end and regardless of AddFea or CheckLVL
	if (!cOnly && fObj.changeeval) runEval(fObj.changeeval, 'changeeval');
	if (cOldObj && cOldObj.changeeval) runEval(cOldObj.changeeval, 'changeeval');
	if (cNewObj && cNewObj.changeeval) runEval(cNewObj.changeeval, 'changeeval');

	// return the level-dependent attributes so it doesn't have to be queried again
	return Fea;
}

// a function to apply the first-level attributes of a class object
// AddRemove - can be boolean (true = add all feature, false = remove all features)
//		or can be an Array of [oldsubclass, newsubclass]
function ApplyClassBaseAttributes(AddRemove, aClass, primaryClass) {
	// declare some variables
	var fObj = CurrentClasses[aClass];
	var n = primaryClass ? 0 : 1;
	var nTool = primaryClass ? "primary" : "secondary";

	// a way to see if we should process the attribute or not
	var checkIfIn = function(nObj, testObj, attrA) {
		var testN = attrA[0] == 'toolProfs' ? nTool : attrA[0] == "saves" ? 0 : n;
		if ((!nObj[attrA[0]] || !nObj[attrA[0]][testN]) && (!attrA[1] || !nObj[attrA[1]] || !nObj[attrA[1]][testN])) return false; // the main object doesn't have this attribute
		if (!testObj) return true; // there is no test object defined
		// else see if the test object is also has this attribute
		return (testObj[attrA[0]] && testObj[attrA[0]][testN]) || (attrA[1] && testObj[attrA[1]] && testObj[attrA[1]][testN]);
	}

	// loop through the attributes and apply them
	var processAttributes = function (uObj, addIt, tipNmF, ifInObj) {
		// saves, if primary class
		if (primaryClass && checkIfIn(uObj, ifInObj, ['saves'])) processSaves(addIt, tipNmF, uObj.saves);

		// skills
		if (checkIfIn(uObj, ifInObj, ['skills', 'skillstxt'])) {
			var skills = uObj.skills && uObj.skills[n] ? uObj.skills[n] : false;
			var skillsTxt = uObj.skillstxt && uObj.skillstxt[n] ? uObj.skillstxt[n] : false;
			// --- backwards compatibility --- //
			// possibly the class has skillstxt as skills attribute (pre v13)
			if (skills && !isArray(skills) && SkillsList.abbreviations.indexOf(skills) == -1 && SkillsList.names.indexOf(skills) == -1) {
				skillsTxt = skills.replace(/^( |\n)*.*: |\;$|\.$/g, '');
				skills = false;
			}
			processSkills(addIt, tipNmF, skills, skillsTxt);
		}

		// weapon proficiencies
		if (checkIfIn(uObj, ifInObj, ['weaponProfs', 'weapons'])) {
			// --- backwards compatibility --- //
			var weaponProf = uObj.weaponProfs && uObj.weaponProfs[n] ? uObj.weaponProfs[n] : uObj.weapons && uObj.weapons[0] ? uObj.weapons[0] : false;
			if (weaponProf) processWeaponProfs(addIt, tipNmF, weaponProf);
		}

		// armour proficiencies
		if (checkIfIn(uObj, ifInObj, ['armorProfs', 'armor'])) {
			// --- backwards compatibility --- //
			var armorProf = uObj.armorProfs && uObj.armorProfs[n] ? uObj.armorProfs[n] : uObj.armor && uObj.armor[0] ? uObj.armor[0] : false;
			if (armorProf) processArmourProfs(addIt, tipNmF, armorProf);
		}

		// tool proficiencies
		if (checkIfIn(uObj, ifInObj, ['toolProfs'])) processTools(addIt, tipNmF, uObj.toolProfs[nTool]);

		// spellcasting extra array
		if (CurrentSpells[aClass] && checkIfIn(uObj, ifInObj, ['spellcastingExtra'])) CurrentSpells[aClass].extra = !addIt ? "" : uObj.spellcastingExtra;
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
}

// a function to create the CurrentSpells global variable entry
function CreateCurrentSpellsEntry(type, fObjName) {
	type = GetFeatureType(type);
	var setCSobj = function(oName) {
		if (!CurrentSpells[oName]) CurrentSpells[oName] = {bonus : {}};
		return CurrentSpells[oName];
	};
	switch (type.toLowerCase()) {
		case "classes":
			var fObj = CurrentClasses[fObjName];
			var aClass = classes.known[fObjName].name;
			var aSubClass = classes.known[fObjName].subname;
			var sObj = setCSobj(fObjName);
			sObj.name = fObj.fullname;
			sObj.shortname = ClassList[aClass].spellcastingFactor ? ClassList[aClass].name : ClassSubList[aSubClass].fullname ? ClassSubList[aSubClass].fullname : ClassSubList[aSubClass].subname;
			sObj.level = classes.known[fObjName].level;
			if (sObj.typeSp == undefined) sObj.typeSp = "known";
			break;
		case "race":
			var fObj = CurrentRace;
			var sObj = setCSobj(CurrentRace.known);
			sObj.name = fObj.name;
			sObj.typeSp = "race";
			sObj.level = fObj.level;
			break;
		case "feats":
			var fObj = FeatsList[fObjName];
			var sObj = setCSobj(fObjName);
			sObj.name = fObj.name + " (feat)";
			sObj.typeSp = "feat";
			break;
		case "items":
			var fObj = MagicItemsListList[fObjName];
			var sObj = setCSobj(fObjName);
			sObj.name = fObj.name + " (item)";
			sObj.typeSp = "item";
			break;
		default:
			return false;
	};
	if (!sObj.ability) sObj.ability = fObj.spellcastingAbility ? fObj.spellcastingAbility : fObj.abilitySave ? fObj.abilitySave : 0;
	return sObj;
}

// process a spellcastingBonus feature
function processSpBonus(AddRemove, srcNm, spBon, type, parentName) {
	type = GetFeatureType(type);
	if (!AddRemove && !CurrentSpells[parentName]) return; // nothing to remove
	// create the spellcasting object if it doesn't yet exist
	var sObj = CurrentSpells[parentName] ? CurrentSpells[parentName] : CreateCurrentSpellsEntry(type, parentName);
	// do something with the spellcastingBonus object
	if (!AddRemove) { // removing the entry
		delete sObj.bonus[srcNm];
		// now see if the bonus object is empty and if so, delete the whole entry
		if (!sObj.factor && !sObj.list && ObjLength(sObj.bonus) == 0) delete CurrentSpells[parentName];
	} else { // adding the entry
		sObj.bonus[srcNm] = spBon;
		// see if this wants to change the spellcasting ability
		var spFeatItemLvl = false;
		var spAbility = !isArray(spBon) ? spBon.ability : false;
		if (isArray(spBon)) {
			for (var i = 0; i < spBon.length; i++) {
				if (!spFeatItemLvl && spBon[i].times && isArray(spBon[i].times)) spFeatItemLvl = true;
				if (spBon[i].spellcastingAbility) spAbility = spBon[i].spellcastingAbility;
			}
		}
		if (spAbility) sObj.ability = spAbility;
		// if concerning a feat or item, set the level only if the spellcastingBonus needs it
		if ((/feat|item/i).test(sObj.typeSp) && spFeatItemLvl) sObj.level = Math.max(Number(What("Character Level")), 1);
	}
	SetStringifieds('spells');
	CurrentUpdates.types.push("spells");
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
			if (isStoppedCalc) calcCont();
			if (remAC > Number(What("AC"))) {
				Value("AC Armor Description", remCurArm);
			} else if (isStoppedCalc) {
				calcStop();
			}
		}
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

// a function to do all the default things after a change in level, class, race, feat, magic item, or companion
// this function is called whenever the calculations are activated again
function UpdateSheetDisplay() {
	if (!CurrentUpdates.types.length) return;

	// initialize some variables
	var dialogParts = [];
	var CUflat = CurrentUpdates.types.toString();

	// recalculate the attacks if necessary
	if (CUflat.indexOf("attacks") !== -1) { // recalculate the weapons
		ReCalcWeapons(CurrentUpdates.types.indexOf("attacksprofs") !== -1, CurrentUpdates.types.indexOf("attacksforce") !== -1);
	};

	// create the dialog
	var titleTxt = "Changes Requiring Your Attention";
	var explTxt = "The changes you just made have effected the things listed below. This dialog is just a reminder and you don't need it to update the sheet. (Note that there are two 'Close' buttons intentionally, they work the same.)";
	var Changes_Dialog = {
		//when starting the dialog
		initialize : function (dialog) {
			dialog.load({ "img1" : allIcons.automanual });
		},
		description : {
			name : titleTxt,
			elements : [{
				type : "view",
				elements : [{
					type : "view", // the top row
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
					type : "view", // the top row
					item_id : "sect",
					align_children : "align_left",
					elements : []
				}, {
					type : "ok_cancel",
					ok_name : "Close",
					cancel_name : "Close"
				}]
			}]
		}
	};

	// if the HP changed (of the main character)
	if (CurrentUpdates.types.indexOf("hp") !== -1) {
		// save the current HP
		var settingsHP = How("HP Max").split(",");
		var autoHP = settingsHP[3] && (/average|fixed|max/).test(olsettingsHPdHP[3]);
		var oldHPmax = What("HP Max");
		Changes_Dialog.oldHPtt = Who("HP Max");
		// update the HP of the main character
		SetHPTooltip(false, false);
		// make the HP dialog insert
		var strHP = "The hit die and/or hit point maximum of the character have changed.";
		if (autoHP) strHP += " As HP has been set to update automatically, the Maximum Hit Points have been changed from " + oldHPmax + " to " + What("HP Max") + ".";
		dialogParts.push({
			type : "cluster",
			align_children : "align_row",
			alignment : "align_fill",
			width : 500,
			font : "heading",
			name : "Hit Points",
			elements : [{
				type : "static_text",
				width : 375,
				alignment : "align_fill",
				font : "dialog",
				wrap_name : true,
				name : strHP
			}, {
				type : "button",
				item_id : "bHPc",
				name : "See Changes"
			}]
		});
		Changes_Dialog.bHPc = function (dialog) {
			ShowCompareDialog("Hit Points changes", [["Old HP calculation", this.oldHPtt], ["New HP calculation", Who("HP Max")]]);
		};
	}

	// if the attack calculations / populating changed
	if (CurrentUpdates.types.indexOf("atkstr")) {
		// get the previous atkCalc/stkAdd string
		Changes_Dialog.oldAtkStr = CurrentUpdates.atkStrOld ? CurrentUpdates.atkStrOld : "";
		// make the attack dialog insert
		dialogParts.push({
			type : "cluster",
			align_children : "align_row",
			alignment : "align_fill",
			width : 500,
			font : "heading",
			name : "Attack Calculations",
			elements : [{
				type : "static_text",
				width : 375,
				alignment : "align_fill",
				font : "dialog",
				wrap_name : true,
				name : "The things that affect attack calculations have changed. These can, for example, add a bonus to damage (Potent Spellcasting), add a bonus if the name is included in the attack entry (Rage), or add to the description (Great Weapon Fighting Style). You can always see what these are using the small buttons in front of each attack entry on the first page."
			}, {
				type : "button",
				item_id : "bAtk",
				alignment : "align_right",
				name : "See Changes"
			}]
		});
		Changes_Dialog.bAtk = function (dialog) {
			ShowCompareDialog("Things affecting attack calculations", [["Old attack manipulations", this.oldAtkStr], ["New attack manipulations", StringAttackEvals()]);
		};
	}
	
	var changedStats = CUflat.indexOf("stats") !== -1;
	var changedSpellcasting = CurrentUpdates.types.indexOf("spells") !== -1;
	var changedSkills = CurrentUpdates.types.indexOf("skills") !== -1;



	if (changedStats) AbilityScores_Button(true); // set tooltip for stats
	if (!changedSpellcasting && CurrentUpdates.types.indexOf("spellcastingclass") !== -1) {
		// see if a spellcasting class changed level and would require a new spell sheet
/* NOG TE DOEN
		changedSpellcasting = ??
		zie CheckForSpellUpdate();
		en AskForSpellUpdate();
*/
	};
	if (CurrentUpdates.types.indexOf("testasi") !== -1) { // see if number of ASI changed
/* NOG TE DOEN
		changedStats = ??
		zie CountASIs();
*/
	};
	if (CurrentUpdates.types.indexOf("xp") !== -1) { // set the xp (or similar) to the right amount by level
/* NOG TE DOEN
		changedXP = ??
		zie CalcExperienceLevel();
*/
	};


	// The alert to the user
/* NOG TE DOEN
	if (changedSkills) // alert that there might be new skill proficiency choices that have to be made
	if (changedSpellcasting) // ask to generate a new spell sheet
	if (changedStats) // alert that there might be new ability score choices that have to be made
	// mogelijke opties voor stats: statsoverride, statsclasses, statsrace, statsfeats, statsitems
*/

	// if there is nothing to show, stop the function now
	if (dialogParts.length !== 0) {
		// add the sections to the dialog
		setDialogName(Changes_Dialog, "sect", "elements", dialogParts);
		// open the dialog
		var dia = app.execDialog(Changes_Dialog);
	}

	// reset the CurrentUpdates variable
	CurrentUpdates = {types : [], extras : {}};
}


//a way to show a dialog that compares multiple things
//arr is an array of arrays with two entries each [cluster title, cluster text]
function ShowCompareDialog(hdr, arr) {
	var clusterArr = [];
	
	for (var i = 0; i < arr.length; i++) {
		clusterArr.push({
			type : "cluster",
			alignment : "align_fill",
			font : "heading",
			name : arr[i][0],
			elements : [{
				type : "static_text",
				width : 300,
				alignment : "align_fill",
				font : "dialog",
				wrap_name : true,
				name : arr[i][1].replace(/^(\r|\n)*/, "")
			}]
		});
	}
	
	var ShowCompare_Dialog = {
		description : {
			name : hdr,
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : [{
					type : "view",
					align_children : "align_row",
					elements : clusterArr
				}, {
					type : "ok"
				}]
			}]
		}
	}
	var dia = app.execDialog(ShowCompare_Dialog);
}

/*
NEW ATTRIBUTES
	limfeaname // Optional; If defined it is used for populating the limited feature section instead of `name`
	scorestxt // Optional; String; If defined it is used for the text in the Ability Score dialog and tooltips. If not defined, but 'scores' is defined, 'scores' will be used to generate a text
	scoresOverride // Optional; Array; works same as scores, but are used to populate the "Magical Override" column; If you are providing both 'scores' and 'scoresOverride' you should also give a 'scorestxt', as the auto-generated tooltip text doesn't work if you have both 'scores' and 'scoresOverride'
	armorProfs // Optional; Array; armor proficiencies to add [previous just 'armor']
	weaponProfs // Optional; Array; weapon proficiencies to add [previous just 'weapons' or 'weaponprofs']
	addArmor // Optional; String; name of the armor to put in the armor section (if results in higher AC) [previous 'addarmor']
	addWeapons // Optional; Array; names of the weapons to put in the attack section (if there is space) [previous 'weapons']

CHANGES TO IMPLEMENT IN FUNCTIONS
	'Class Features Remember' field references
	'Class Features Remember' import (especially from older versions)
	Manual proficiencies import

CHANGES TO IMPLEMENT IN LIST SCRIPTS
	'Class Features Remember' field references

	'improvements' for RACE/FEAT replaced with 'scorestxt' (but without name or trailing semicolon)
	'improvements' for RACE/FEAT no longer needed if identical to changes by 'scores'

	'skills' can now be an array of arrays with 2 elements each, the first element being the skill name and the second element being the application of expertise "full", "increment", or "only"
	'skills' for FEATS is no longer used and should be replaced by 'skillstxt'
	'skillstxt' no longer needed if identical to changes by 'skills'

	'action' can now be an array, so no need for 'AddAction' in eval

	'tooltip' for racial features: make name same as tooltip (minus the parenthesis) and add limfeaname for the old name

	'eval', 'removeeval', 'changeeval' can now be a function

	'atkAdd[0]' & 'atkCalc[0]' can now be a function

	'armor' replace with 'armorProfs'
	'addarmor' replace with 'addArmor'
	'weapons' for CLASS/FEAT: replace with 'weaponProfs'
	'weaponprofs' for RACE: replace with 'weaponProfs'
	'weapons' for RACE: replace with 'addWeapons'

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
	calcChanges.atkAdd[0] // the first entry of the array can now be a function
	calcChanges.atkCalc[0] // the first entry of the array can now be a function
	calcChanges.hp // can now be a function

	armor // replaced with armorProfs (so it is more clear)
	addarmor // replaced with addArmor (notice difference in capitalisation)
	weapons // for CLASS/FEAT: replaced with weaponProfs (so it is more clear)
	weaponprofs // for RACE: replace with weaponProfs
	weapons // for RACE: replace with addWeapons


*/
