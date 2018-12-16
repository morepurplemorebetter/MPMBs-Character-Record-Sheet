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
	var FeaChoice = "";
	var FeaOldChoice = "";
	var tipNmExtra = "";
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
	var useAttr = function(uObj, addIt, skipEval, objNm) {
		objNm = objNm == undefined ? fObjName : fObjName + objNm; // has to be unique
		var tipNm = displName == uObj.name ? displName : displName + ": " + uObj.name;
		var tipNmF = tipNm + (tipNmExtra ? " " + tipNmExtra : "");

		// we should add the options for weapons/armours/ammos before adding the item itself
		// but we should be removing them only after removing the item itself
		var addListOptions = function() {
			if (uObj.armorOptions) processArmorOptions(addIt, tipNm, uObj.armorOptions);
			if (uObj.ammoOptions) processAmmoOptions(addIt, tipNm, uObj.ammoOptions);
			if (uObj.weaponOptions) processWeaponOptions(addIt, tipNm, uObj.weaponOptions);
		}
		
		// eval or removeeval
		var a = addIt ? "eval" : "removeeval";
		if (uObj[a] && !skipEval) runEval(uObj[a], a);

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

		// --- backwards compatibility --- //
		var abiScoresTxt = uObj.scorestxt ? uObj.scorestxt : uObj.improvements ? uObj.improvements : false;
		if (uObj.scores || abiScoresTxt) processStats(addIt, type, tipNm, uObj.scores, abiScoresTxt, false);
		if (uObj.scoresOverride) processStats(addIt, type, tipNm, uObj.scoresOverride, abiScoresTxt, true);

		// spellcasting
		if (uObj.spellcastingBonus) processSpBonus(addIt, objNm, uObj.spellcastingBonus, type, aParent);
		if (CurrentSpells[aParent]) {
			if (uObj.spellFirstColTitle) CurrentSpells[aParent].firstCol = addIt ? uObj.spellFirstColTitle : false;
			if (uObj.spellcastingExtra) CurrentSpells[aParent].extra = addIt ? uObj.spellcastingExtra : false;
		}

		if (addIt) addListOptions(); // add weapon/armour/ammo option(s)

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
			useAttr(cOldObj, false, false, choiceA[0]);
			SetFeatureChoice(type, aParent, aParent !== fObjName ? fObjName : "", false, cOnly ? choiceA[0] : "");
		}
		// if we are changing the choice or adding the feature, now add the new choice
		//if (cJustChange || cOnly || (AddFea && cNewObj)) {
		if (cNewObj && AddFea) {
			useAttr(cNewObj, true, false, choiceA[1]);
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
	return returnStr;
}

// a function to create the CurrentSpells global variable entry
function CreateCurrentSpellsEntry(type, fObjName) {
	type = GetFeatureType(type);
	var setCSobj = function(oName) {
		if (!CurrentSpells[oName]) {
			CurrentSpells[oName] = {bonus : {}};
			CurrentUpdates.types.indexOf("spells");
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
			if (isStoppedCalc) calcCont(true);
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

// set or remove armour options
function processArmorOptions(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	if (!isArray(itemArr)) itemArr = [itemArr];

	// if adding things but the variable doesn't exist
	if (AddRemove && !CurrentVars.extraArmour) CurrentVars.extraArmour = {};

	srcNm = srcNm.toLowerCase();
	for (var i = 0; i < itemArr.length; i++) {
		var newName = srcNm + "-" + itemArr[i].name.toLowerCase();
		if (AddRemove) {
			itemArr[i].list = "startlist";
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
function processWeaponOptions(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	if (!isArray(itemArr)) itemArr = [itemArr];

	// if adding things but the variable doesn't exist
	if (AddRemove && !CurrentVars.extraWeapons) CurrentVars.extraWeapons = {};

	srcNm = srcNm.toLowerCase();
	for (var i = 0; i < itemArr.length; i++) {
		var newName = srcNm + "-" + itemArr[i].name.toLowerCase();
		if (AddRemove) {
			itemArr[i].list = "startlist";
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
function processAmmoOptions(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	if (!isArray(itemArr)) itemArr = [itemArr];

	// if adding things but the variable doesn't exist
	if (AddRemove && !CurrentVars.extraAmmo) CurrentVars.extraAmmo = {};

	srcNm = srcNm.toLowerCase();
	for (var i = 0; i < itemArr.length; i++) {
		var newName = srcNm + "-" + itemArr[i].name.toLowerCase();
		if (AddRemove) {
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

// a function to do all the default things after a change in level, class, race, feat, magic item, or companion
// this function is called whenever the calculations are activated again
function UpdateSheetDisplay() {
	if (!CurrentUpdates.types.length || !IsNotReset || !IsNotImport) {
		CurrentUpdates = {types : [], extras : {}}; // reset the CurrentUpdates variable
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
			chAT : false // attack calculations
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
				if (CurrentUpdates.types.indexOf("statsoverride") !== -1 || CurrentUpdates.types.indexOf("statsitems") !== -1) statChanges.push(toUni("Magic Item(s)"));
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
	var changedSpellList = CurrentUpdates.types.indexOf("spellliststr") !== -1;
	var changedSpellcasting = CurrentUpdates.types.indexOf("spells") !== -1 || (CurrentSpellsLen && changedSpellList) || (!CurrentSpellsLen && CurrentUpdates.types.indexOf("testclassspellcasting") !== -1);
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
			(changedSpellList ? " and how spell lists are generated" : "") +
			" has been detected that require the Spell Sheets to be updated.\nTIP: if you plan to make more changes affecting spellcasting, do those first before generating Spell Sheets, because creating them takes very long.";
		var buttonSpells = !CurrentSpellsLen ? "Remove Spell Sheets" : (hasSpellSheets ? "Update" : "Create") + " Spell Sheets";
		var buttonSpellListStr = changedSpellList ? "Spell List(s) Changes" : "Affecting Spell List(s)";
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
					elements : (changedSpellList || CurrentEvals.spellListStr ? [{
						type : "button",
						item_id : "bSPs",
						name : buttonSpellListStr
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
		if (changedSpellList || CurrentEvals.spellListStr) {
			Changes_Dialog.oldSpellListStr = CurrentUpdates.spellListStrOld ? CurrentUpdates.spellListStrOld : "";
			Changes_Dialog.spellListStrChange = changedSpellList;
			Changes_Dialog.bSPs = function (dialog) {
				ShowCompareDialog(
					["Things affecting spell list generation", "Some things might affect how a spell list for a spellcasting class or feature is generated, by adding extra spells to choose from for example."],
					this.spellListStrChange ?
					[
						["Old spell list manipulations", this.oldSpellListStr],
						["New spell list manipulations", StringEvals("spellListStr")]
					] : [
						["Spell list manipulations", StringEvals("spellListStr")]
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
			name : "Attack Calculations",
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
					name : "A change was detected in the things that affect how attacks are calculated."
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
				["Things affecting attack calculations", "You can always see what things are affecting the attack calculations with the small buttons in front of each attack entry on the first page."],
				[
					["Old attack manipulations", this.oldAtkStr],
					["New attack manipulations", StringEvals("atkStr")]
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
		CurrentUpdates = {types : [], extras : {}};
		// add the sections to the dialog
		setDialogName(Changes_Dialog, "sect", "elements", dialogParts);
		// open the dialog
		var dia = app.execDialog(Changes_Dialog);
	}

	// reset the CurrentUpdates variable
	CurrentUpdates = {types : [], extras : {}};

	// Stop progress bar
	thermoM(thermoTxt, true);
}

//a way to show a dialog that compares multiple things
//arr is an array of arrays with two entries each [cluster title, cluster text]
function ShowCompareDialog(txtA, arr, canBeLong) {
	var clusterArr = [];
	var isTxtA = isArray(txtA);
	var hdr = isTxtA ? txtA[0] : txtA;
	var extraTxt = isTxtA ? txtA[1] : "";

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
				elements : [{
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
						width : 548
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
				}].concat(extraTxt ? [{
					type : "static_text",
					item_id : "txt1",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					width : 548,
					name : extraTxt
				}] : []).concat([{
					type : "ok"
				}])
			}]
		}
	}
	var dia = app.execDialog(ShowCompare_Dialog);
}

// >>>> Magic Item functions <<<< \\

// Lookup the name of a Magic Item and if it exists in the MagicItemsList
function ParseMagicItem(input) {
	var found = "";
	if (!input) return found;

	input = removeDiacritics(input).toLowerCase();
	var foundLen = 0;
	var foundDat = 0;

	// Scan string for all magic items
	for (var key in MagicItemsList) {
		var kObj = MagicItemsList[key];

		if (input.indexOf(kObj.name.toLowerCase()) === -1 // see if the text matches
			|| testSource(key, kObj, "magicitemExcl") // test if the magic item or its source isn't excluded
		) continue;

		// only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source. This differs from the regExpSearch objects
		var tempDate = sourceDate(kObj.source);
		if (kObj.name.length < foundLen || (kObj.name.length == foundLen && tempDate < foundDat)) continue;

		// we have a match, set the values
		found = key;
		foundLen = kObj.name.length
		foundDat = tempDate;
	}
	return found;
};

// Check all Magic Items fields and parse the once known into the global variable
function FindMagicItems() {
	CurrentMagicItems.known = [];
	for (var i = 1; i <= FieldNumbers.magicitems; i++) {
		CurrentMagicItems.known.push( ParseMagicItem( What("Extra.Magic Item " + i) ) );
	}
}

// Add the text and features of a Magic Items
function ApplyMagicItem(input, FldNmbr) {
	if (IsSetDropDowns || CurrentVars.manual.items) return; // When just changing the dropdowns or magic items are set to manual, so don't do anything
	var MIflds = [
		"Extra.Magic Item " + FldNmbr,				// 0
		"Extra.Magic Item Note " + FldNmbr,			// 1
		"Extra.Magic Item Description " + FldNmbr,	// 2
		"Extra.Magic Item Weight " + FldNmbr,		// 3
		"Extra.Magic Item Attuned " + FldNmbr,		// 4
		"Image.MagicItemAttuned." + FldNmbr			// 5
	];
	// Not called from a field? Then just set the field and let this function be called anew
	if ((!event.target || event.target.name !== MIflds[0]) && What(MIflds[0]) !== input) {
		Value(MIflds[0], input);
		return;
	};
	var newMI = ParseMagicItem(input);
	var theMI = MagicItemsList[newMI];
	var ArrayNmbr = FldNmbr - 1;
	var oldMI = CurrentMagicItems.known[ArrayNmbr];

	if (oldMI === newMI) return; // No changes were made

	// Start progress bar
	var thermoTxt = thermoM("Applying magic item...");
	thermoM(1/6); // Increment the progress bar

	// Before stopping the calculations, first test if the magic item has a prerequisite and if it meets that
	if (IsNotMagicItemMenu && IsNotReset && theMI && theMI.prereqeval && !ignorePrereqs && event.target && event.target.name == MIflds[0]) {
		try {
			var meetsPrereq = eval(theMI.prereqeval);
		} catch (e) {
			console.println("The 'prereqeval' attribute for the magic item '" + theMI.name + "' produces an error and is subsequently ignored. If this is one of the built-in magic items, please contact morepurplemorebetter using one of the contact bookmarks to let him know about this bug. Please do not forget to list the version number of the sheet, name and version of the software you are using, and the name of the magic item.");
			console.show();
			var meetsPrereq = true;
		};
		if (!meetsPrereq) {
			thermoTxt = thermoM("The magic item '" + theMI.name + "' has prerequisites that have not been met...", false); //change the progress dialog text
			thermoM(1/5); //increment the progress dialog's progress

			var askUserMI = app.alert({
				cTitle : "The prerequisites for '" + theMI.name + "' have not been met",
				cMsg : "The magic item that you have selected, '" + theMI.name + "' has a prerequisite listed" + (theMI.prerequisite ? " as: \n\t\"" + theMI.prerequisite + "\"" : ".") + "\n\nYour character does not meet this requirement. Are you sure you want to apply this magic item?",
				nIcon : 1,
				nType : 2
			});

			if (askUserMI !== 4) { // pressed "NO", so do not continue and revert the field back to its previous state
				event.rc = false;
				if (isArray(tDoc.getField(event.target.name).page)) OpeningStatementVar = app.setTimeOut("tDoc.getField('" + event.target.name + ".1').setFocus();", 10);
				thermoM(thermoTxt, true); // Stop progress bar
				return;
			};
		};
	};

	calcStop(); // Now stop the calculations

	// Remove previous magic item at the same field
	if (oldMI && oldMI !== newMI) {
		var oMI = MagicItemsList[oldMI];
		// remove the calculation and tooltip
		tDoc.getField(MIflds[2]).setAction("Calculate", "");
		AddTooltip(MIflds[2], "");
		// now if this is not a change done by moving the magic item, also remove everything about it
		if (IsNotMagicItemMenu) {
			// remove its attributes
			var Fea = ApplyFeatureAttributes(
				"item", // type
				oldMI, // fObjName
				[CurrentMagicItems.level, 0, false], // lvlA [old-level, new-level, force-apply]
				false, // choiceA [old-choice, new-choice, "only"|"change"]
				false // forceNonCurrent
			);
			// reset the description, attuned, and weight fields
			tDoc.resetForm([MIflds[2], MIflds[3], MIflds[4]]);
			tDoc.getField(MIflds[4]).submitName = "";
			// remove the source from the notes field
			var sourceStringOld = stringSource(theMI, "first", "[", "]");
			if (sourceStringOld) RemoveString(MIflds[1], sourceStringOld);
		}
	}

	// Update the CurrentMagicItems.known variable
	CurrentMagicItems.known[ArrayNmbr] = newMI;

	// Do something if there is a new magic item to apply
	if (theMI) {
		thermoTxt = thermoM("Applying '" + theMI.name + "' magic item...", false); //change the progress dialog text
		thermoM(1/3); //increment the progress dialog's progress

		// Set the field description/calculation
		if (theMI.calculate) {
			var theCalc = What("Unit System") === "imperial" ? theMI.calculate : ConvertToMetric(theMI.calculate, 0.5);
			if (typePF) theCalc.replace("\n", " ");
			tDoc.getField(MIflds[2]).setAction("Calculate", theCalc);
		}

		// Set the tooltip
		var tooltipStr = (theMI.type ? theMI.type + ", " : "") + (theMI.rarity ? theMI.rarity : "");
		if (theMI.attunement) tooltipStr += tooltipStr ? " (requires attunement)" : "requires attunement";
		if (tooltipStr) tooltipStr = tooltipStr[0].toUpperCase() + tooltipStr.substr(1) + "\n";
		if (theMI.prerequisite) tooltipStr += "Prerequisite: " + theMI.prerequisite + "\n";
		tooltipStr = toUni(theMI.name) + "\n" + tooltipStr + "   ";
		if (theMI.descriptionFull) tooltipStr += theMI.descriptionFull + "\n";
		tooltipStr += stringSource(theMI, "full,page", "\nSource(s): ", ".");
		AddTooltip(MIflds[2], tooltipStr);
		// Only continue with the rest if this is not a change done by moving the magic item
		if (IsNotMagicItemMenu) {
			// Set the description
			var theDesc = !theMI.description ? "" : What("Unit System") === "imperial" ? theMI.description : ConvertToMetric(theMI.description, 0.5);
			if (typePF) theDesc.replace("\n", " ");
			Value(MIflds[2], theDesc);
			// Set the notes field
			var sourceString = stringSource(theMI, "first", "[", "]");
			if (sourceString) AddString(MIflds[1], sourceString, "; ");
			// Set the attunement
			Checkbox(MIflds[4], theMI.attunement, undefined, theMI.attunement ? "hide" : "");
			// Set the weight
			if (theMI.weight) {
				var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
				Value(MIflds[3], RoundTo(theMI.weight * massMod, 0.001, true));
			} else {
				Value(MIflds[3], 0);
			}
			// Apply the rest of its attributes
			var Fea = ApplyFeatureAttributes(
				"item", // type
				newMI, // fObjName
				[0, CurrentMagicItems.level, false], // lvlA [old-level, new-level, force-apply]
				false, // choiceA [old-choice, new-choice, "only"|"change"]
				false // forceNonCurrent
			);
		}
	}

	// Set the visibility of the attuned checkbox
	setMIattunedVisibility(fldNmbr);

	thermoM(thermoTxt, true); // Stop progress bar
};

function ApplyAttunementMI(FldNmbr) {
	var ArrayNmbr = FldNmbr - 1;
	var aMI = CurrentMagicItems.known[ArrayNmbr];
	if (!aMI || !MagicItemsList[aMI].attunement) return; // no magic item recognized that requires attunement, so do nothing

	var theFld = event.target && event.target.name.indexOf("Extra.Magic Item Attuned ") !== -1 ? event.target : tDoc.getField("Extra.Magic Item Attuned " + FldNmbr);
	var isChecked = theFld.isBoxChecked(0);
	var fromLvl = isChecked ? 0 : CurrentMagicItems.level;
	var toLvl = isChecked ? CurrentMagicItems.level : 0;

	// Start progress bar and stop calculation
	var thermoTxt = thermoM((isChecked ? "Applying" : "Removing") + " magic item features...");
	calcStop();
	thermoM(1/2); // Increment the progress bar

	// now apply or remove the magic item's features
	var Fea = ApplyFeatureAttributes(
		"item", // type
		aMI, // fObjName
		[fromLvl, toLvl, false], // lvlA [old-level, new-level, force-apply]
		false, // choiceA [old-choice, new-choice, "only"|"change"]
		false // forceNonCurrent
	);
}

// Hide/show the attuned checkbox for a magic item entry
function setMIattunedVisibility(FldNmbr) {
	var MIflds = [
		"Extra.Magic Item " + FldNmbr,				// 0
		"Extra.Magic Item Note " + FldNmbr,			// 1
		"Extra.Magic Item Attuned " + FldNmbr,		// 2
		"Image.MagicItemAttuned." + FldNmbr			// 3
	];
	var isOF = FldNmbr > FieldNumbers.magicitemsD;

	// Define some constants
	var noteWidth = typePF ? 25 : 35;
	var fullWidth = !typePF ? 216 : isOF ? 243.45 : 164.3;
	var nameRect = tDoc.getField(MIflds[0]).rect;
	var noteRect = tDoc.getField(MIflds[1]).rect;
	var startCount = nameRect[0];
	var smallWidth = !typePF ? tDoc.getField(MIflds[2]).rect[0] - 1 - startCount : isOF ? 211.27 : 132.15;

	if (How(MIflds[2])) {
		// hide it, uncheck it, and set the rect for the Name and Note fields
		Hide(MIflds[2]);
		Hide(MIflds[3]);
		Checkbox(MIflds[2], false);
		nameRect[2] = nameRect[0] + fullWidth - noteWidth;
	} else {
		// show it and set the rect for the Name and Note fields
		Show(MIflds[2]);
		Show(MIflds[3]);
		nameRect[2] = nameRect[0] + smallWidth - noteWidth;
	}
	// Apply the new positions of the Name and Note fields
	noteRect[0] = nameRect[2];
	noteRect[2] = noteRect[0] + noteWidth;
	tDoc.getField(MIflds[1]).rect = noteRect;
	tDoc.getField(MIflds[0]).rect = nameRect;
}

// Copy all the attributes of a field to another field (or even swap between the two)
function copyField(fldFromName, fldToName, excl, swap) {
	var fldTo = tDoc.getField(fldToName);
	var fldFrom = tDoc.getField(fldFromName);
	if (!fldTo || !fldFrom || fldTo.type !== fldFrom.type) return;

	if (!excl) excl = {};
	var fldType = fldTo.type;

	// a function to do the actual copying
	var copy = function(fromObj, toObj, justObj) {
		if (fldType == "checkbox") {
			if (justObj) {
				toObj.isBoxCheckVal = fromObj.isBoxChecked(0);
				toObj.isBoxChecked = function() { return saveTo.isBoxCheckVal; };
			} else {
				toObj.checkThisBox(0, fromObj.isBoxChecked(0));
			}
		} else {
			toObj.value = fromObj.value;
		}
		if (!excl.userName) toObj.userName = fromObj.userName;
		if (!excl.submitName) toObj.submitName = fromObj.submitName;
		if (fldType !== "checkbox" && !excl.noCalc && !justObj) {
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


/*
NEW ATTRIBUTES
	limfeaname // Optional; If defined it is used for populating the limited feature section and the action section instead of `name`
	scorestxt // Optional; String; If defined it is used for the text in the Ability Score dialog and tooltips. If not defined, but 'scores' is defined, 'scores' will be used to generate a text
	scoresOverride // Optional; Array; works same as scores, but are used to populate the "Magical Override" column; If you are providing both 'scores' and 'scoresOverride' you should also give a 'scorestxt', as the auto-generated tooltip text doesn't work if you have both 'scores' and 'scoresOverride'
	calcChanges.spellList // Optional; an array with the first entry being a function, and the second entry being a descriptive text. This attribute can change the spell list created for a class / race / feat
	weaponOptions // Optional; an array of WeaponList objects to be added to the WeaponList (can also be a single object if only wanting to add a single weapon)
	armorOptions // Optional; an array of ArmourList objects to be added to the ArmourList (can also be a single object if only wanting to add a single armour)
	ammoOptions // Optional; an array of AmmoList objects to be added to the AmmoList (can also be a single object if only wanting to add a single armour)

CHANGED ATTRIBUTES
	armorProfs // Optional; Array; armor proficiencies to add [previous just 'armor']
	weaponProfs // Optional; Array; weapon proficiencies to add [previous just 'weapons' or 'weaponprofs' depending on List]
	addArmor // Optional; String; name of the armor to put in the armor section (if results in higher AC) [previous 'addarmor']
	addWeapons // Optional; Array; names of the weapons to put in the attack section (if there is space) [previous 'weapons']
	

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
	'addarmor' replace with 'addArmor'
	'weapons' for CLASS/FEAT: replace with 'weaponProfs'
	'weaponprofs' for RACE: replace with 'weaponProfs'
	'weapons' for RACE: replace with 'addWeapons'

	eval changes :
	- Class Features Remember
	- AddAction
	- AddWeapon
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
	addarmor // replaced with addArmor (notice difference in capitalisation)
	weapons // for CLASS/FEAT: replaced with weaponProfs (so it is more clear)
	weaponprofs // for RACE: replace with weaponProfs
	weapons // for RACE: replace with addWeapons


*/
