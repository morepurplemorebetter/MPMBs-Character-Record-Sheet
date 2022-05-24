//find the creature on the companion page
function ParseCreature(input) {
	var found = "";
	if (!input) return found;

	input = removeDiacritics(input).toLowerCase();
	var foundLen = 0;
	var foundDat = 0;
	var testLen = 0;

	for (var key in CreatureList) { //scan string for all creatures
		var kObj = CreatureList[key];
		testLen = 0;

		if (testSource(key, kObj, "creaExcl")) continue; // test if the creature or its source isn't excluded

		if (input.indexOf(key) != -1) { // see if the text matches the key
			testLen = key.length;
		} else if (input.indexOf(kObj.name.toLowerCase()) != -1) { // see if the text matches the name
			testLen = kObj.name.length;
		} else if (kObj.nameAlt) { // see if the text matches the alternative names
			var arrNames = !isArray(kObj.nameAlt) ? [kObj.nameAlt] : kObj.nameAlt;
			for (var i = 0; i < arrNames.length; i++) {
				var aName = arrNames[i];
				if (input.indexOf(aName.toLowerCase()) != -1 && aName.length >= testLen) {
					testLen = aName.length;
				}
			}
		}
		if (!testLen) continue; // no match, so skip this one

		// only go on with if this entry is a better match (longer name) or is at least an equal match but with a newer source. This differs from the regExpSearch objects
		var tempDate = sourceDate(kObj.source);
		if (testLen < foundLen || (testLen == foundLen && tempDate < foundDat)) continue;

		// we have a match, set the values
		found = key;
		foundLen = testLen;
		foundDat = tempDate;
	}
	return found;
}

// Detects race entered and put information to global CurrentCompRace variable
function FindCompRace(inputCreaTxt, aPrefix) {
	if (aPrefix !== undefined) {
		var prefixA = [aPrefix];
	} else {
		// During startup, do all pages (aPrefix == undefined)
		var prefixA = What("Template.extras.AScomp").split(",").splice(1);
	}
	for (var p = 0; p < prefixA.length; p++) {
		var prefix = prefixA[p];
		if (!tDoc.getField(prefix + "Comp.Race")) continue; // Page doesn't exist
		var tempString = inputCreaTxt !== undefined ? inputCreaTxt : How(prefix + "Comp.Race");
		var typeFound = "";
		var resultFound = ParseCreature(tempString);
		if (resultFound) {
			typeFound = "creature";
		} else {
			var raceFound = ParseRace(tempString);
			if (raceFound[0]) {
				resultFound = [raceFound[0], raceFound[1]];
				typeFound = "race";
			}
		}
		if (inputCreaTxt !== undefined && aPrefix) {
			// See what was previously know for this entry
			var oldKnown = CurrentCompRace[prefix] ? CurrentCompRace[prefix].known : "";
			if (oldKnown && CurrentCompRace[prefix].variant) oldKnown += "," + CurrentCompRace[prefix].variant;
			var isNew = oldKnown != resultFound.toString();
			// If this is not at startup, add the inputCreaTxt as the submitname (but don't change it if no new creature/race is found)
			if (resultFound && isNew) AddTooltip(prefix + "Comp.Race", undefined, inputCreaTxt);
			// If there was an input creature and prefix, return an object of what was found
			return {
				type : typeFound,
				found : resultFound,
				new : isNew
			};
		} else {
			// Set the CurrentCompRace variable
			setCurrentCompRace(prefix, typeFound, resultFound);
		}
	}
}

//set the CurrentCompRace variable
function setCurrentCompRace(prefix, type, found) {
	if (!prefix || !tDoc.getField(prefix + "Comp.Race")) return;
	if (!type || !found) {
		CurrentCompRace[prefix] = {};
		return;
	}
	var fObj = type === "creature" ? CreatureList[found] : RaceList[found[0]];
	CurrentCompRace[prefix] = {};
	CurrentCompRace[prefix].typeFound = type;
	if (type === "creature") {
		CurrentCompRace[prefix].known = found;
	} else {
		CurrentCompRace[prefix].known = found[0];
		CurrentCompRace[prefix].variant = found[1];
	}
	// set the properties of the CurrentCompRace[prefix] object
	for (var prop in fObj) {
		if ((/^(typeFound|known|variants?|level|typeCompanion)$/i).test(prop)) continue;
		CurrentCompRace[prefix][prop] = fObj[prop];
	}
	if (type === "race" && found[1]) {
		// the properties of the variant (overriding anything from the main)
		var subrace = found[0] + "-" + found[1];
		for (var prop in RaceSubList[subrace]) {
			if ((/^(known|variants?|level)$/i).test(prop)) continue;
			CurrentCompRace[prefix][prop] = RaceSubList[subrace][prop];
		}
	}
	// Make sure these objects are no references
	CurrentCompRace[prefix] = newObj(CurrentCompRace[prefix]);
	// set the properties from the companion modification, if any
	var sCompType = What(prefix + "Companion.Remember");
	if (sCompType) {
		CurrentCompRace[prefix].typeCompanion = sCompType;
		var oComp = CompanionList[sCompType];
		// process the attributesAdd
		if (oComp && oComp.attributesAdd) {
			for (var prop in oComp.attributesAdd) {
				if (/^(name|nameAlt|source|scores|saves|skills|eval|removeeval|changeeval|companionApply)$/i.test(prop)) continue;
				var tProp = oComp.attributesAdd[prop];
				if (!CurrentCompRace[prefix][prop]) {
					CurrentCompRace[prefix][prop] = newObj(tProp);
				} else if (/^(challengeRating|header|type|subtype)$/i.test(prop)) {
					// things that should be replaced instead of amended to
					CurrentCompRace[prefix][prop] = tProp;
				} else if (isArray(CurrentCompRace[prefix][prop])) {
					CurrentCompRace[prefix][prop] = CurrentCompRace[prefix][prop].concat(tProp);
				} else if (typeof CurrentCompRace[prefix][prop] === "string" && typeof tProp === "string") {
					var sCoupler = CurrentCompRace[prefix][prop].indexOf(";") !== -1 ? "; " : ", ";
					CurrentCompRace[prefix][prop] = CurrentCompRace[prefix][prop].replace(/\.$/, "") + sCoupler + tProp;
				} else {
					// the rest we just overwrite
					CurrentCompRace[prefix][prop] = newObj(tProp);
				}
			}
		}
		// process the attributesChange
		if (oComp && oComp.attributesChange) {
			try {
				oComp.attributesChange(type === "creature" ? CurrentCompRace[prefix].known : false, CurrentCompRace[prefix]);
			} catch (e) {
				delete CompanionList[sCompType].attributesChange;
				var eText = "The `attributesChange` attribute from the '" + sCompType + "' companion produced an error! Please contact the author of the feature to correct this issue and please include this error message:\n " + error;
				for (var e in error) eText += "\n " + e + ": " + error[e];
				console.println(eText);
				console.show();
			}
		}
	}
}

//add a creature to the companion page
function ApplyCompRace(newRace, prefix, sCompType) {
	if (IsSetDropDowns) return; // when just changing the dropdowns, don't do anything
	var bIsRaceFld = event.target && event.target.name && event.target.name.indexOf("Comp.Race") !== -1;
	if (bIsRaceFld && newRace.toLowerCase() === event.target.value.toLowerCase()) return; //no changes were made

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying companion race...");
	calcStop();

	if (!prefix) prefix = getTemplPre(event.target.name, "AScomp", true);
	var hpCalcTxt = " hit points calculation";
	var strRaceEntry = clean(newRace).toLowerCase();
	var strRaceEntryCap = strRaceEntry.capitalize()
	var sCurrentCompType = What(prefix + "Companion.Remember");
	var iPageNo = tDoc.getField(prefix + 'Comp.Race').page + 1;
	if (!sCompType) sCompType = "";

	var resetDescTooltips = function() {
		AddTooltip(prefix + "Comp.Desc.Height", "");
		AddTooltip(prefix + "Comp.Desc.Weight", "");
		AddTooltip(prefix + "Comp.Desc.Size", "");
		AddTooltip(prefix + "Comp.Desc.Age", "", "");
		// remove submitName from modifier fields
		var clearSubmitNames = [prefix + "Comp.Use.Combat.Init.Bonus"].concat(tDoc.getField(prefix + "BlueText.Comp.Use.Ability").getArray()).concat(tDoc.getField(prefix + "BlueText.Comp.Use.Skills").getArray());
		for (var c = 0; c < clearSubmitNames.length; c++) AddTooltip(clearSubmitNames[c], undefined, "");
	}

	var undoCreaturePresistents = function(prefix, objCrea) {
		// remove special companion type
		ApplyCompanionType(false, prefix); // also empties Companion.Remember field
		// undo calcChanges (just calcChanges.hp)
		if (objCrea.calcChanges) addCompEvals(objCrea.calcChanges, prefix, objCrea.name + hpCalcTxt, false);
		// undo modifiers
		if (objCrea.addMod) processMods(false, objCrea.name, objCrea.addMod, prefix);
		// reset AC explanation
		AddTooltip(prefix + "Comp.Use.AC", undefined, "");
		// reset HP automation to default
		var sHPfld = prefix + "Comp.Use.HP.Max";
		var aHPsets = How(sHPfld).split(",");
		aHPsets[3] = "nothing";
		AddTooltip(sHPfld, undefined, aHPsets.join());
		// execute the function for level-dependent features and doing the removeeval
		UpdateCompLevelFeatures(prefix, objCrea, strRaceEntry, 0);
		// run callbacks
		if (objCrea.typeFound === "creature") RunCreatureCallback(prefix, "creature", false);
	}

	var compFields = [
		prefix + "Comp.Type",
		prefix + "Comp.Use",
		prefix + "Text.Comp.Use",
		prefix + "BlueText.Comp.Use"
	];

	// Reset all the fields if the input is nothing
	var oldCrea = CurrentCompRace[prefix];
	if (newRace === "") {
		thermoTxt = thermoM("Resetting the companion page...", false); //change the progress dialog text
		undoCreaturePresistents(prefix, oldCrea);
		CurrentCompRace[prefix] = {}; //reset the global variable to nothing
		thermoM(1/3); //increment the progress dialog's progress
		tDoc.resetForm(compFields); //reset all the fields
		resetDescTooltips(); //remove descriptive tooltips
		thermoM(2/3); //increment the progress dialog's progress
		tDoc.getField(prefix + "Comp.Race").submitName = "";
		thermoM(thermoTxt, true); // Stop progress bar
		return; //don't do the rest of the function
	}

	// If this is not called by using the drop-down field, change the field to show the right name
	if (!bIsRaceFld && newRace !== What(prefix + "Comp.Race")) {
		IsSetDropDowns = true;
		Value(prefix + "Comp.Race", newRace);
		IsSetDropDowns = false;
	}

	var fndObj = FindCompRace(newRace, prefix);
	if (!fndObj.new && sCurrentCompType === sCompType) {
		// No (new) race was found and no change was made to the compantion type, so stop here
		thermoM(thermoTxt, true); // Stop progress bar
		return; //don't do the rest of the function
	}

	// Undo things from a previous race, if any
	undoCreaturePresistents(prefix, oldCrea);

	// save the companion type
	if (sCompType && CompanionList[sCompType]) {
		Value(prefix + "Companion.Remember", sCompType);
	} else if (sCompType !== "reset" && fndObj.type === "creature" && CreatureList[fndObj.found].companionApply) {
		Value(prefix + "Companion.Remember", CreatureList[fndObj.found].companionApply);
	}
	// fill the global variable with the newly found race (and companion type)
	setCurrentCompRace(prefix, fndObj.type, fndObj.found);
	var aCrea = CurrentCompRace[prefix];
	var oComp = CompanionList[aCrea.typeCompanion];

	if (aCrea.typeFound === "race") {// do the following if a race was found
		tDoc.resetForm(compFields); //reset all the fields
		thermoTxt = thermoM("Adding the companion's player race...", false); //change the progress dialog text

		//set descriptive tooltips
		var theHeight = What("Unit System") === "imperial" ? aCrea.height : aCrea.heightMetric ? aCrea.heightMetric : aCrea.height;
		var theWeight = What("Unit System") === "imperial" ? aCrea.weight : aCrea.weightMetric ? aCrea.weightMetric : aCrea.weight;
		AddTooltip(prefix + "Comp.Desc.Height", aCrea.plural + theHeight);
		AddTooltip(prefix + "Comp.Desc.Weight", aCrea.plural + theWeight);
		AddTooltip(prefix + "Comp.Desc.Age", aCrea.plural + aCrea.age, "");

		thermoM(1/11); //increment the progress dialog's progress

		//set race's size
		SetCreatureSize(prefix, strRaceEntryCap, aCrea.size);

		//set race's type
		Value(prefix + "Comp.Desc.MonsterType", "Humanoid");

		//set racial traits
		var theTraits = What("Unit System") === "imperial" ? aCrea.trait : ConvertToMetric(aCrea.trait, 0.5);
		Value(prefix + "Comp.Use.Traits", theTraits);

		thermoM(2/11); //increment the progress dialog's progress

		//set speed
		var raceSpeed = aCrea.speed;
		if (typeof raceSpeed === "string") { //CompanionList change
			var theSpeed = raceSpeed;
		} else if (isArray(raceSpeed)) { //legacy
			var theSpeed = isNaN(raceSpeed[0]) ? raceSpeed[0] : raceSpeed[0] + " ft";
		} else {
			var theSpeed = raceSpeed.walk && raceSpeed.walk.spd ? raceSpeed.walk.spd + " ft" : "";
			var spdDelimiter = typePF ? ",\n" : ", ";
			for (aSpeed in raceSpeed) {
				var Spd = raceSpeed[aSpeed].spd;
				if (!Spd || aSpeed === "walk") continue;
				theSpeed += (aSpeed ? spdDelimiter : "") + aSpeed + " " + Spd + " ft";
			};
		};
		theSpeed = What("Unit System") === "imperial" ? theSpeed : ConvertToMetric(theSpeed, 0.5);
		Value(prefix + "Comp.Use.Speed", theSpeed);

		thermoM(3/11); //increment the progress dialog's progress

		//set senses
		if (aCrea.vision) {
			var theSenseStr = "";
			var theSenses = aCrea.vision;
			if (!isArray(theSenses) || (theSenses.length === 2 && !isArray(theSenses[0]) && !isArray(theSenses[1]) && (!isNaN(theSenses[1]) || !isNaN(theSenses[1].substr(1))))) {
				theSenses = [theSenses];
			};
			for (var s = 0; s < theSenses.length; s++) {
				var aSense = theSenses[s];
				if (isArray(aSense)) {
					theSenseStr += (theSenseStr ? "; " : "") + aSense[0] + (aSense[1] ? " " + aSense[1] + " ft": "");
				} else {
					theSenseStr += (theSenseStr ? "; " : "") + aSense;
				};
			};
			if (What("Unit System") !== "imperial") theSenseStr = ConvertToMetric(theSenseStr, 0.5);
			Value(prefix + "Comp.Use.Senses", theSenseStr);
		};

		thermoM(4/11); //increment the progress dialog's progress

		//add a string of the languages known to the features
		if (aCrea.languageProfs) {
			var theLangs = [];
			for (var l = 0; l < aCrea.languageProfs.length; l++) {
				var aLang = aCrea.languageProfs[l];
				if (isNaN(aLang)) {
					theLangs.push(aLang);
				} else {
					theLangs.push("+" + aLang);
				};
			};
			var languageString = formatLineList("\u25C6 Languages:", theLangs);
			if (languageString) AddString(prefix + "Comp.Use.Features", languageString + ".", true);
		};

		thermoM(5/11); //increment the progress dialog's progress

		//add a string of the saveText to the features
		if (aCrea.savetxt) {
			if (typeof aCrea.savetxt === "string") {
				var svString = "\u25C6 Saving Throws: " + aCrea.savetxt + ".";
			} else {
				var svObj = aCrea.savetxt;
				var svString = "";
				if (svObj.text) {
					svString += svString ? "; " : "\u25C6 Saving Throws: ";
					svString += svObj.text.join("; ");
				};
				if (svObj.adv_vs) {
					svString += formatLineList((svString ? "; " : "\u25C6 Saving Throws: ") + "Adv. on saves vs.", svObj.adv_vs);
				};
				if (svObj.immune) {
					svString += formatLineList((svString ? "; " : "\u25C6 Saving Throws: ") + "Immune to", svObj.immune);
				};
				svString += ".";
			};
			AddString(prefix + "Comp.Use.Features", svString, true);
		};

		thermoM(6/11); //increment the progress dialog's progress

		//add saving throw proficiencies
		if (aCrea.saves && isArray(aCrea.saves)) {
			for (var s = 0; s < aCrea.saves.length; s++) {
				var Abi = AbilityScores.fields[aCrea.saves[s].substr(0,3)];
				if (Abi) Checkbox(prefix + "Comp.Use.Ability." + Abi + ".ST.Prof");
			}
		}

		//add modifiers
		if (aCrea.addMod) {
			processMods(true, aCrea.name, aCrea.addMod, prefix);
		}

		//add a string of any resistances to the features
		if (aCrea.dmgres) {
			var dmgresString = formatLineList("\u25C6 Damage Resistances:", aCrea.dmgres);
			if (dmgresString) AddString(prefix + "Comp.Use.Features", dmgresString + ".", true);
		};

		thermoM(7/11); //increment the progress dialog's progress

		//add a string of any weapon proficiencies to the features
		var weaponProf = aCrea.weaponProfs ? aCrea.weaponProfs : aCrea.weaponprofs ? aCrea.weaponprofs : false;
		if (weaponProf) {
			var theWeaponArray = [];
			if (weaponProf[0]) theWeaponArray.push("simple weapons");
			if (weaponProf[1]) theWeaponArray.push("martial weapons");
			if (weaponProf[2]) theWeaponArray = theWeaponArray.concat(weaponProf[2]);
			var weaponString = formatLineList("\u25C6 Weapon Proficiencies:", theWeaponArray);
			if (weaponString) AddString(prefix + "Comp.Use.Features", weaponString + ".", true);
		};

		//add a string of any armour proficiencies to the features
		var armorProf = aCrea.armorProfs ? aCrea.armorProfs : aCrea.armor ? aCrea.armor : false;
		if (armorProf) {
			var theArmourArray = [];
			if (armorProf[0]) theArmourArray.push("light armor");
			if (armorProf[1]) theArmourArray.push("medium armor");
			if (armorProf[2]) theArmourArray.push("heavy armor");
			if (armorProf[3]) theArmourArray.push("shields");
			var armourString = formatLineList("\u25C6 Armor Proficiencies:", theArmourArray);
			if (armourString) AddString(prefix + "Comp.Use.Features", armourString + ".", true);
		};

		thermoM(8/11); //increment the progress dialog's progress

		//add a string of any tool proficiencies to the features
		if (aCrea.toolProfs) {
			var theTools = [];
			for (var l = 0; l < aCrea.toolProfs.length; l++) {
				var aTool = aCrea.toolProfs[l];
				if (isArray(aTool)) {
					if (!isNaN(aTool[1]) && Number(aTool[1]) > 1) {
						theTools.push(aTool[1] + " \xD7 " + aTool[0]);
					} else {
						theTools.push(aTool[0]);
					};
				} else {
					theTools.push(aTool);
				};
			};
			var toolString = formatLineList("\u25C6 Tool Proficiencies:", theTools);
			if (toolString) AddString(prefix + "Comp.Use.Features", toolString + ".", true);
		};

		thermoM(9/11); //increment the progress dialog's progress

		//add skill proficiencies and feature text
		var skillsTxt;
		if (aCrea.skills) {
			var skillsNameArr = [];
			for (var i = 0; i < aCrea.skills.length; i++) {
				var aSk = aCrea.skills[i];
				if (isArray(aSk)) {
					var doSkill = aSk[0];
					var doExp = aSk[1];
				} else {
					var doSkill = aSk;
					var doExp = false;
				}
				var skillName = AddSkillProf(doSkill, true, doExp, true, undefined, prefix);
				if (skillName) skillsNameArr.push(skillName);
			}
			skillsTxt = formatLineList("\u25C6 Skill Proficiencies:", skillsNameArr);
		};
		if (aCrea.skillstxt) {
			skillsTxt = "\u25C6 Skill Proficiencies: " + aCrea.skillstxt.replace(/^( |\n)*.*: |\;$|\.$/g, '');
		}
		if (skillsTxt) AddString(prefix + "Comp.Use.Features", skillsTxt + ".", true);

		thermoM(10/11); //increment the progress dialog's progress

		// Add HP calculations (only calcChanges.hp is supported)
		if (aCrea.calcChanges) addCompEvals(aCrea.calcChanges, prefix, aCrea.name + hpCalcTxt, true);

		//add weapons
		var weaponAdd = aCrea.weaponsAdd ? aCrea.weaponsAdd : aCrea.weapons ? aCrea.weapons : [];
		if (!isArray(weaponAdd)) weaponAdd = [weaponAdd];
		for (i = 0; i < weaponAdd.length; i++) {
			AddWeapon(weaponAdd[i], undefined, prefix);
		}

		//add armour
		var anArmorAdd = aCrea.armorAdd ? aCrea.armorAdd : aCrea.addarmor ? aCrea.addarmor : false;
		if (anArmorAdd) AddArmor(anArmorAdd, true, prefix);

		// If the race has any other features that aren't applied here
		if (aCrea.eval || aCrea.features || aCrea.scores || aCrea.action) {
			app.alert({
				cTitle : "Player race not fully compatible with companion page",
				nIcon : 3,
				cMsg : "The companion page is not fully compatible with all the possible features of races that are designed to be used as a player race (i.e. normally used to create a character with levels).\n\nThe sheet has tried its best to add the '" + aCrea.name + "' race to the companion page, but some aspects will be missing:\n\u2022 Anything gained from level-dependent features;\n\u2022 Limited features;\n\u2022 Racial spellcasting;\n\u2022 Additional actions, bonus actions, and reactions;\n\u2022 Automated attack calculation changes;\n\u2022 Anything added using the 'eval' or 'changeeval' attributes."
			})
		}

	} else if (aCrea.typeFound === "creature") {// do the following if a creature was found
		thermoTxt = thermoM("Adding the companion creature...", false); //change the progress dialog text
		resetDescTooltips(); //remove descriptive tooltips
		tDoc.resetForm(compFields); //reset all the fields

		//set the header (if defined)
		if (aCrea.header) Value(prefix + "Comp.Type", aCrea.header);

		//add the size
		SetCreatureSize(prefix, strRaceEntryCap, aCrea.size);

		//set race's type
		var sCompExplStr = oComp ? ", a special companion (" + oComp.name.toLowerCase() + "), " : "";
		var aCreaTypeDialogTxt = [
			"Select creature type for the " + strRaceEntry + " on page " + iPageNo, // title
			"The " + strRaceEntry + sCompExplStr + " on page " + iPageNo + " can be one of multiple creature types. It is up to you to choose which type will now be input in the dropdown on the companion page." // description
		]
		var sCreaType = isArray(aCrea.type) ? AskUserOptions(aCreaTypeDialogTxt[0], aCreaTypeDialogTxt[1], aCrea.type, "radio", true) : aCrea.type;
		var sCreaSubtype = aCrea.subtype ? " (" + (isArray(aCrea.subtype) ? AskUserOptions(aCreaTypeDialogTxt[0].replace("type", "subtype"), aCreaTypeDialogTxt[1].replace(/type/ig, "subtype"), aCrea.subtype, "radio", true) : aCrea.subtype) + ")" : "";
		Value(prefix + "Comp.Desc.MonsterType", sCreaType + sCreaSubtype);

		//set senses
		var theSenses = What("Unit System") === "imperial" ? aCrea.senses : ConvertToMetric(aCrea.senses, 0.5);
		Value(prefix + "Comp.Use.Senses", theSenses);

		Value(prefix + "Comp.Desc.Alignment", aCrea.alignment); //set alignment
		Value(prefix + "Comp.Use.Proficiency Bonus", aCrea.proficiencyBonus); //set proficiency bonus
		Value(prefix + "Comp.Use.Attack.perAction", aCrea.attacksAction); //set attacks per action
		Value(prefix + "Comp.Use.HP.Max", aCrea.hp); //set HP
		Value(prefix + "Comp.Use.HD.Level", aCrea.hd[0]); //set HD #
		Value(prefix + "Comp.Use.HD.Die", aCrea.hd[1]); //set HD die

		thermoM(1/10); //increment the progress dialog's progress

		//add ability scores
		for (var a = 0; a < AbilityScores.abbreviations.length; a++) {
			Value(prefix + "Comp.Use.Ability." + AbilityScores.abbreviations[a] + ".Score", aCrea.scores[a]);
			Value(prefix + "Comp.Use.Ability." + AbilityScores.abbreviations[a] + ".Mod", Math.round((aCrea.scores[a] - 10.5) * 0.5));
		}

		// set AC to a calculated value, using a base + Dex mod
		var acSubmitName = undefined;
		if (isNaN(aCrea.ac)) {
			aCrea.acString = aCrea.ac;
		} else {
			var creaDexMod = Number(What(prefix + "Comp.Use.Ability.Dex.Mod"));
			aCrea.acString = (aCrea.ac - creaDexMod) + "+Dex";
			acSubmitName = toUni("Listed Armor Class") + "\n" + aCrea.ac + " is a " + strRaceEntry + "'s listed AC,\nwhich translates to: \"" + aCrea.acString + '".';
		}
		Value(prefix + "Comp.Use.AC", aCrea.acString, undefined, acSubmitName); //set AC

		thermoM(2/10); //increment the progress dialog's progress

		//add speed
		var theSpeed = What("Unit System") === "imperial" ? aCrea.speed : ConvertToMetric(aCrea.speed, 0.5);
		// add line breaks for the printer friendly sheets
		if (typePF) theSpeed = theSpeed.replace(/(,|;) /g, "$1\n");
		Value(prefix + "Comp.Use.Speed", theSpeed);

		thermoM(3/10); //increment the progress dialog's progress

		//add any weapons the creature possesses
		for (var a = 0; a < aCrea.attacks.length; a++) {
			AddWeapon(aCrea.attacks[a].name, undefined, prefix);
		}

		thermoM(4/10); //increment the progress dialog's progress

		//calculate the ability score modifiers
		var mods = [];
		for (var i = 0; i < aCrea.scores.length; i++) {
			mods[i] = Math.round((aCrea.scores[i] - 10.5) * 0.5);
		}

		thermoM(5/10); //increment the progress dialog's progress

		//add skill proficiencies
		if (aCrea.skills) {
			for (var aSkill in aCrea.skills) {
				var profSkill = CompSkillRefer(aSkill, aCrea.skills[aSkill], aCrea.scores, aCrea.proficiencyBonus);
				AddSkillProf(profSkill[0], profSkill[1] !== "nothing", profSkill[1] === "expertise", false, profSkill[2], prefix); //set the proficiency
			}
		}

		//add saving throw proficiencies
		if (aCrea.saves && isArray(aCrea.saves)) {
			for (var s = 0; s < aCrea.saves.length; s++) {
				if (aCrea.saves[s] !== "") {//only do something if a value is detected
					var saveFld = "Comp.Use.Ability." + AbilityScores.abbreviations[s] + ".ST";
					Checkbox(prefix + saveFld + ".Prof"); //set the save as proficient
					Value(prefix + "BlueText." + saveFld + ".Bonus", aCrea.saves[s] - mods[s] - aCrea.proficiencyBonus);
				}
			}
		}

		thermoM(6/10); //increment the progress dialog's progress

		// Add HP calculations (only calcChanges.hp is supported)
		if (aCrea.calcChanges) addCompEvals(aCrea.calcChanges, prefix, aCrea.name + hpCalcTxt, true);

		//add modifiers
		if (aCrea.addMod) {
			processMods(true, aCrea.name, aCrea.addMod, prefix);
		}

		thermoM(7/10); //increment the progress dialog's progress

		// >>>> Features section <<<<
		var strFeatures = "";

		//add special stat block info
		if (aCrea.damage_vulnerabilities) {
			strFeatures += "\u25C6 Damage Vulnerabilities: " + aCrea.damage_vulnerabilities + ".";
		}
		if (aCrea.damage_resistances) {
			strFeatures += "\n\u25C6 Damage Resistances: " + aCrea.damage_resistances + ".";
		}
		if (aCrea.damage_immunities) {
			strFeatures += "\n\u25C6 Damage Immunities: " + aCrea.damage_immunities + ".";
		}
		if (aCrea.condition_immunities) {
			strFeatures += "\n\u25C6 Condition Immunities: " + aCrea.condition_immunities + ".";
		}
		if (aCrea.languages) {
			strFeatures += "\n\u25C6 Languages: " + aCrea.languages + ".";
		}

		thermoM(8/10); //increment the progress dialog's progress

		// Set the strings to the fields but remove starting line breaks and implement name
		if (strFeatures) {
			if (What("Unit System") === "metric") strFeatures = ConvertToMetric(strFeatures, 0.5);
			strFeatures = strFeatures.replace(/^\n+|^\r+/g, "").replace(/\[THIS\]/g, strRaceEntry);
			AddString(prefix + "Comp.Use.Features", strFeatures, true);
		}

		thermoM(9/10); //increment the progress dialog's progress

		// Do the level-dependent features, as well as adding the features, traits, actions, and executing the 'eval'
		UpdateCompLevelFeatures(prefix, aCrea, strRaceEntry);

		// Run callback functions, if any are present
		RunCreatureCallback(prefix, "creature", true);
	}

	// Apply the special companion type (if any)
	ApplyCompanionType(true, prefix);

	SetHPTooltip(false, true);
	thermoM(thermoTxt, true); // Stop progress bar
}

// Make menu for the button on the companion page and do something with the result
function MakeCompMenu_CompOptions(prefix, MenuSelection, force) {
	if (!prefix) prefix = getTemplPre(event.target.name, "AScomp", true);
	var aVisLayers = eval_ish(What(prefix + "Companion.Layers.Remember"));
	var creaCalcStr = StringEvals("creaStr");
	if (!MenuSelection || MenuSelection === "justMenu" || MenuSelection === "justCompanions") {
		// function for adding a menu; array = [cName, cReturn, bMarked, bEnabled]
		var menuLVL1 = function (aMenu, aMain) {
			for (var i = 0; i < aMain.length; i++) {
				aMenu.push({
					cName : aMain[i][0],
					cReturn : "companion#" + aMain[i][1],
					bMarked : aMain[i][2] !== undefined ? aMain[i][2] : false,
					bEnabled : aMain[i][3] !== undefined ? aMain[i][3] : true
				});
			}
		};
		var menuLVL2 = function (aMenu, aMain, aSub) {
			var aSubmenu = [];
			for (var i = 0; i < aSub.length; i++) {
				aSubmenu.push({
					cName : aSub[i][0],
					cReturn : "companion#" + aMain[1] + "#" + aSub[i][1],
					bMarked : aSub[i][2] !== undefined ? aSub[i][2] : false,
					bEnabled : aSub[i][3] !== undefined ? aSub[i][3] : true
				})
			}
			aMenu.push({
				cName : aMain[0],
				oSubMenu : aSubmenu,
				bMarked : aMain[2] !== undefined ? aMain[2] : false,
				bEnabled : aMain[3] !== undefined ? aMain[3] : true
			})
		}

		var aCompMenu = [], bAddMenuDivider = false;
		if (CurrentSources.globalExcl.indexOf("SRD") !== -1 && (!SourceList.M || (SourceList.M && CurrentSources.globalExcl.indexOf("M") !== -1))) {
			// If the SRD is excluded (and the MM if it exists), add a warning here
			aCompMenu = [{
				cName : "Be aware: the SRD " + (SourceList.M ? "and Monster Manual are" : "is") + " excluded from the sources!",
				cReturn : "-",
				bEnabled : false
			}, {
				cName : "-",
				cReturn : "-"
			}];
		}
		var sCurrentCompType = What(prefix + "Companion.Remember");
		var sCurrentCompRaceLC = What(prefix + "Comp.Race").toLowerCase();
	// Menu options for creating special companions
		// First get a list of all the companion options that should be available
		var oCompanions = {};
		for (var sComp in CompanionList) {
			if (testSource(sComp, CompanionList[sComp], "compExcl")) continue;
			oCompanions[sComp] = [];
		}
		// Loop through the creatures and see which one are applicable for which companion options
		for (var sCrea in CreatureList) {
			var oCrea = CreatureList[sCrea];
			var iCreaCR = eval_ish(oCrea.challengeRating);
			// test if the creature or its source isn't excluded or if it was added as part of a feature
			if (testSource(sCrea, oCrea, "creaExcl") || (CurrentVars.extraCreatures && CurrentVars.extraCreatures[sCrea])) continue;
			var objToAdd = {}; // the list of all companion types this creature should be added to (if any)
			if (oCrea.companion) {
				// Add any matching companions
				if (!isArray(oCrea.companion)) oCrea.companion = [oCrea.companion];
				for (var i = 0; i < oCrea.companion.length; i++) {
					if (oCompanions[oCrea.companion[i]]) objToAdd[oCrea.companion[i]] = "";
				}
			}
			// Now test for each companion type with the includeCheck attribute if this creature should be added
			for (var sComp in oCompanions) {
				if (CompanionList[sComp].includeCheck && typeof CompanionList[sComp].includeCheck === "function") {
					try {
						var returnStr = CompanionList[sComp].includeCheck(sCrea, oCrea, iCreaCR);
						if (returnStr !== false && returnStr !== undefined) {
							objToAdd[sComp] = typeof returnStr === "string" ? returnStr : "";
						}
					} catch (e) {
						delete CompanionList[sComp].includeCheck;
						var eText = "The `includeCheck` attribute from the '" + sComp + "' companion produced an error! Please contact the author of the feature to correct this issue and please include this error message:\n " + error;
						for (var e in error) eText += "\n " + e + ": " + error[e];
						console.println(eText);
						console.show();
					}
				}
			}
			// Now add the creature to any of the companion types found to be applicable, if any
			if (!ObjLength(objToAdd)) continue;
			// First get an array of all possible names for the creature
			var aCreaNames = [oCrea.name];
			var sCreaSrc = stringSource(oCrea, "first,abbr", "\t   [", "]");
			if (oCrea.nameAlt) aCreaNames = aCreaNames.concat(isArray(oCrea.nameAlt) ? oCrea.nameAlt : [oCrea.nameAlt]);
			// Then loop through all the found companion options, and add the full array of names (with extension string, if any)
			for (var sComp in objToAdd) {
				for (var i = 0; i < aCreaNames.length; i++) {
					oCompanions[sComp].push([aCreaNames[i], sCrea, objToAdd[sComp] + sCreaSrc]);
				}
			}
		}
		// If we only want the object with the companions sorted
		if (MenuSelection === "justCompanions") return oCompanions;
		// Now loop through the companions and add a menu item for each
		for (var sComp in oCompanions) {
			if (!oCompanions[sComp].length) continue; // no familiar options
			var oComp = CompanionList[sComp];
			var sCompSrc = stringSource(oComp, "first,abbr", "\t   [", "]");
			var bIsCompType = sCurrentCompType === sComp;
			var aSubInstructions = [];
			oCompanions[sComp].sort();
			for (var i = 0; i < oCompanions[sComp].length; i++) {
				var aCompOption = oCompanions[sComp][i];
				aSubInstructions.push([
					aCompOption[0] + (aCompOption[2] ? aCompOption[2] : ""), // cName
					aCompOption[0] + "#" + aCompOption[1], // cReturn
					bIsCompType && CurrentCompRace[prefix].known === aCompOption[1] && sCurrentCompRaceLC.indexOf(aCompOption[0].toLowerCase()) !== -1 // bMarked
				]);
			}
			menuLVL2(aCompMenu, [
				"Create " + oComp.nameMenu + sCompSrc, // cName
				"add_comp#" + sComp, // cReturn
				bIsCompType // bMarked
			], aSubInstructions);
			bAddMenuDivider = true;
		}
	// Menu options for changing the current creature to a special companion option
		if (bAddMenuDivider) menuLVL1(aCompMenu, [["-", "-"]]);
		if (CurrentCompRace[prefix].typeFound === "creature") {
			var aSubInstructions = [];
			for (var sComp in oCompanions) {
				var oComp = CompanionList[sComp];
				var sCompSrc = stringSource(oComp, "first,abbr", "\t   [", "]");
				aSubInstructions.push([
					oComp.nameMenu + sCompSrc, // cName
					sComp, // cReturn
					sCurrentCompType === sComp // bMarked
				]);
			}
			aSubInstructions.push(["-", "-"], [
				"Reset to normal", // cName
				"reset", // cReturn
				undefined, // bMarked
				sCurrentCompType ? true : false // bEnabled
			]);
			menuLVL2(aCompMenu,	[
				"Change current creature into a ... (resets creature)",
				"change",
				false,
				CurrentCompRace[prefix].typeFound === "creature"
			], aSubInstructions);
		} else if (sCurrentCompType) {
			// Not a creature but has a companion type, so only allow reset
			menuLVL1(aCompMenu, [["Reset current creature to normal (remove " + CompanionList[sCurrentCompType].name + ")", "change#reset"]]);
		} else {
			// Not a creature and no companion type, so disable this menu option
			menuLVL1(aCompMenu, [["Change current creature into a ... (resets creature)", "-", false, false]]);
		}
	// Change visible sections
		menuLVL1(aCompMenu, [["-", "-"]]); // add a divider
		menuLVL2(
			aCompMenu,
			["Change visible sections", "visible"],
			[
				["Show box for Companion's Appearance", "comp.img", aVisLayers[0]],
				["Show Equipment section", "comp.eqp", aVisLayers[1]]
			]
		);
	// Reset companion page, add/remove page, show calculations
		menuLVL1(aCompMenu, [
			["-", "-"],
			["Reset this companion page", "reset_page"],
			["-", "-"],
			["Add extra companion page", "add_page"],
			["Remove this companion page", "remove_page"],
			["-", "-"],
			["Show things changing the companion automations", "showcalcs", undefined, creaCalcStr ? true : false]
		]);
	// Save this menu in the global variable
		Menus.companion = aCompMenu;
	}
	var MenuSelection = MenuSelection ? MenuSelection : getMenu("companion");
	if (!MenuSelection || MenuSelection[0] == "nothing" || MenuSelection[0] != "companion") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying companion menu option...");
	calcStop();

	switch (MenuSelection[1]) {
		case "add_comp" :
			var sRaceName = MenuSelection[3] ? MenuSelection[3].capitalize() : CreatureList[MenuSelection[4]].name;
		case "change" :
			if (MenuSelection[1] === "change") var sRaceName = What(prefix + "Comp.Race");
			ApplyCompRace(sRaceName, prefix, MenuSelection[2]);
			break;
		case "reset_page":
			thermoTxt = thermoM("Resetting the companion page...", false); // Change the progress bar text
	
			tDoc.resetForm([prefix + "Comp", prefix + "Text.Comp", prefix + "BlueText.Comp", prefix + "Cnote", prefix + "Companion"]); //reset all the fields
	
			thermoM(0.5); // Increment the progress bar
	
			ApplyAttackColor("", "", "Comp.", prefix); //reset the colour of the attack boxes
			SetHPTooltip("reset", true);
			ShowCompanionLayer(prefix);
			ClearIcons(prefix + "Comp.img.Portrait", true); //reset the appearance image
	
			thermoTxt = thermoM("Applying...", false); // Change the progress bar text
			break;
		case "add_page":
			DoTemplate("AScomp", "Add");
			break;
		case "remove_page":
			DoTemplate("AScomp", "Remove", prefix);
			break;
		case "visible":
			if (MenuSelection[2].indexOf("comp.img") !== -1) {
				aVisLayers[0] = force !== undefined ? force : !aVisLayers[0];
			}
			if (MenuSelection[2].indexOf("comp.eqp") !== -1) {
				aVisLayers[1] = force !== undefined ? force : !aVisLayers[1];
			}
			Value(prefix + "Companion.Layers.Remember", aVisLayers.toSource());
			ShowCompanionLayer(prefix);
			break;
		case "showcalcs" :
			ShowDialog("Things Affecting the Companion Automation", creaCalcStr);
			break;
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

// Apply the CompanionList selection set in the Companion.Remember field
function ApplyCompanionType(bAddRemove, prefix) {
	var sCompType = What(prefix + "Companion.Remember");
	if (!sCompType || !CompanionList[sCompType]) return;
	var oComp = CompanionList[sCompType];
	if (CurrentCompRace[prefix].typeCompanion !== sCompType) CurrentCompRace[prefix].typeCompanion = sCompType;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the companion type...");
	calcStop();

	// First process the calcChanges
	if (oComp.calcChanges) {
		addCompEvals(oComp.calcChanges, prefix, oComp.name + " hit points calculation", bAddRemove);
	}

	if (bAddRemove) { // adding
		thermoTxt = thermoM("Applying the companion type...", false); //change the progress dialog text

		// Add companion related actions to the first page
		if (oComp.action) processActions(true, oComp.nameTooltip ? oComp.nameTooltip : oComp.name, oComp.action, oComp.name);

		// Run companion callbacks from other features (last when adding)
		RunCreatureCallback(prefix, "companion", true);

	} else { // removing
		thermoTxt = thermoM("Resetting the companion type...", false); //change the progress dialog text

		// Remove actions from the first page, if this is the last companion of its type being removed
		var iCompTypeCnt = 0;
		for (var sCompPrefix in CurrentCompRace) {
			if (sCompPrefix !== prefix && CurrentCompRace[sCompPrefix].typeCompanion === sCompType) iCompTypeCnt++;
		}
		if (oComp.action && !iCompTypeCnt) processActions(true, oComp.nameTooltip ? oComp.nameTooltip : oComp.name, oComp.action, oComp.name);

		// Run companion callbacks from other features (first when removing)
		RunCreatureCallback(prefix, "companion", false);

		// Clear the remember field so that no automation picks it up 
		Value(prefix + "Companion.Remember", "", "", "");
	}

	thermoM(thermoTxt, true); // Stop progress bar
}

// Create and add or remove the heading for a CompanionList entry
function SetCompanionListHeading(bAddRemove, prefix, sCompType, sFld) {
	var oComp = CompanionList[sCompType];
	if (!oComp) return "";
	if (!sFld) sFld = prefix + "Cnote.Left";
	var sHeading = oComp.name;
	var sOrigin = oComp.nameOrigin ? oComp.nameOrigin : "";
	var sSource = stringSource(oComp, "first,abbr", sOrigin ? ", " : "");
	if (sSource || sOrigin) sHeading += " (" + sOrigin + sSource + ")";
	tDoc[(bAddRemove ? "Add" : "Remove") + "String"](sFld, sHeading + ":", true);
}

// do the eval for a creature
function ApplyCreatureEval(prefix, objEval, arrLvl, sType, sName) {
	if (!objEval[sType] || typeof objEval[sType] != 'function') return;
	if (arrLvl === undefined) {
		arrLvl = [
			Number(How(prefix + "Comp.Desc.Age")),
			classes.totallevel ? classes.totallevel : Math.max(1, Number(What("Character Level")))
		];
	}
	try {
		return objEval[sType](prefix, arrLvl);
	} catch (error) {
		var iPageNo = tDoc.getField(prefix + 'Comp.Race').page + 1;
		var eText = "The " + sType + ' for "' + sName + '" on page ' + iPageNo + " produced an error! Please contact the author of the feature to correct this issue and please include this error message:\n " + error;
		for (var e in error) eText += "\n " + e + ": " + error[e];
		console.println(eText);
		console.show();
		delete objEval[sType];
	}
}

// do the level-dependent features for the companion page
function UpdateCompLevelFeatures(prefix, objCrea, useName, newLvl) {
	/* Gather variables */
	if (!objCrea) objCrea = CurrentCompRace[prefix];
	if (objCrea.typeFound !== "creature") return; // only do this for CreatureList entries
	var isMetric = What("Unit System") === "metric", arrToEval = [];
	if (!useName) useName = What(prefix + "Comp.Race").toLowerCase();
	var sCompType = CurrentCompRace[prefix].typeCompanion;
	var objComp = sCompType ? CompanionList[sCompType] : false;
	if (!objComp && sCompType) delete CurrentCompRace[prefix].typeCompanion;

	// function to get the highest class level of an array of ClassList object names
	var highestClassLevel = function(input, isHD) {
		var iReturn = isHD ? objCrea.hd[0] : classes.totallevel ? classes.totallevel :
		What("Character Level") ? Number(What("Character Level")) : 1;
		if (typeof input === 'function') {
			try {
				var functReturn = input(prefix);
			} catch (e) {}
			if (functReturn && !isNaN(functReturn)) iReturn = functReturn;
		} else {
			var arrClasses = isArray(input) ? input : [input];
			var arrClassLvls = [];
			for (var i = 0; i < arrClasses.length; i++) {
				if (classes.known[arrClasses[i]]) {
					arrClassLvls.push(classes.known[arrClasses[i]].level);
				}
			}
			if (arrClassLvls.length) iReturn = Math.max.apply(Math, arrClassLvls);
		}
		return iReturn;
	}

	/* Determine the old/new levels */
	var oldLvl = Number(How(prefix + "Comp.Desc.Age"));
	if (newLvl === undefined || newLvl === false) {
		newLvl = objCrea.minlevelLinked ? highestClassLevel(objCrea.minlevelLinked) :
			classes.totallevel ? classes.totallevel :
			What("Character Level") ? Number(What("Character Level")) : 1;
	}
	if (oldLvl === newLvl) return; // nothing changed, so stop now
	// Save the new level for safekeeping
	AddTooltip(prefix + "Comp.Desc.Age", undefined, newLvl);
	var minLvl = Math.min(oldLvl, newLvl), maxLvl = Math.max(oldLvl, newLvl);

	// Enqueue the main objects' eval if adding the creature for the first time
	if (oldLvl === 0 && newLvl > 0) {
		if (objCrea.eval) arrToEval.push([objCrea, "eval", objCrea.name]);
		if (objComp && objComp.eval) arrToEval.push([objComp, "eval", objComp.menuName]);
	}

	/* The string for the Features and Traits fields */
	var arrProps = [
		["features", prefix + "Comp.Use.Features"],
		["actions", prefix + "Comp.Use.Traits"],
		["traits", prefix + "Comp.Use.Traits"],
		["notes", prefix + "Cnote.Left", objComp]
	];
	var arrCompAltStrLocs = [prefix + "Cnote.Left"];
	if (!typePF) arrCompAltStrLocs.push(prefix + "Cnote.Right");
	// Now loop through all the features/actions/traits
	for (var a = 0; a < arrProps.length; a++) {
		var objUse = arrProps[a][2] ? arrProps[a][2] : objCrea;
		if (!objUse || !objUse[arrProps[a][0]] || !objUse[arrProps[a][0]].length) continue;
		var feaA = [].concat(objUse[arrProps[a][0]]);
		if (newLvl < oldLvl) feaA.reverse(); // when removing, loop through them backwards
		// if this is the notes for a companion add/remove a heading if needed
		if (arrProps[a][0] === "notes" && minLvl === 0) {
			SetCompanionListHeading(oldLvl === 0, prefix, sCompType);
		}
		var fldNm = arrProps[a][1];
		var arrFlds = [fldNm].concat(arrCompAltStrLocs);
		var lastProp = a === 0 || fldNm !== arrProps[a-1][1] ? What(fldNm) : lastProp;
		for (var f = 0; f < feaA.length; f++) {
			var prop = feaA[f];
			var doPropTxt = prop.description !== undefined;
			var propMinLvl = prop.minlevel ? prop.minlevel : 1;
			var addIt = newLvl >= propMinLvl;
			if (doPropTxt) {
				// Create the strings for the property
				var sNameDescrCoupler = prop.joinString !== undefined ? prop.joinString : ": ";
				var propFirstLine = "\u25C6 " + (isMetric ? ConvertToMetric(prop.name, 0.5) : prop.name);
				var propFullLine = propFirstLine + sNameDescrCoupler + (isMetric ? ConvertToMetric(prop.description, 0.5) : prop.description);
				// Apply the name of the creature if [THIS] is present in the strings
				if (/\[THIS\]/.test(propFullLine)) {
					if (addIt) {
						propFirstLine = propFirstLine.replace(/\[THIS\]/g, useName);
						propFullLine = propFullLine.replace(/\[THIS\]/g, useName);
					} else {
						propFirstLine = propFirstLine.replace(/\[THIS\][\s\S]*/, "");
						propFullLine = propFullLine.replace(/\[THIS\][\s\S]*/, "");
					}
				}
			}
			// See if we need to do this prop
			if (minLvl < propMinLvl && maxLvl >= propMinLvl) {
				// Add/remove the text
				if (doPropTxt && !lastProp && addIt) {
					// First thing entered to an empty field, this is easy
					Value(fldNm, propFullLine);
				} else if (doPropTxt) {
					// Insert or remove it after the previous entry
					var insertResult = applyClassFeatureText(addIt ? "insert" : "remove", arrFlds, [propFirstLine, "\r" + propFullLine], [propFirstLine, "\r" + propFullLine], lastProp);
					if (insertResult === false && addIt) AddString(fldNm, propFullLine, true);
				}
				// Queue the (remove)eval
				var evalType = addIt ? "eval" : "removeeval";
				if (prop[evalType]) arrToEval.push([prop, evalType, objUse.name + '" ' + fldNm + ' "' + prop.name]);
				// Process modifiers, if any
				if (prop.addMod) processMods(addIt, objUse.name + ": " + prop.name, prop.addMod, prefix);
			}
			if (doPropTxt) lastProp = propFullLine;
		}
	}

	/* The other level-dependent attributes, if present */
	// Update the Proficiency Bonus, if linked
	if (newLvl > 0 && objCrea.proficiencyBonusLinked) {
		Value(prefix + 'Comp.Use.Proficiency Bonus', Math.max(Number(How('Proficiency Bonus')), 2));
	}
	// Update the Hit Dice, if linked
	if (newLvl > 0 && objCrea.hdLinked) {
		Value(prefix + 'Comp.Use.HD.Level', highestClassLevel(objCrea.hdLinked, true));
	}

	/* The main evals */
	if (oldLvl > 0 && newLvl === 0) {
		// Enqueue the main objects' removeeval if removing the creature
		if (objCrea.removeeval) arrToEval.push([objCrea, "removeeval", objCrea.name]);
		if (objComp && objComp.removeeval) arrToEval.push([objComp, "removeeval", objComp.nameMenu]);
	} else if (newLvl > 0) {
		// Enqueue the main objects' changeeeval if changing level
		if (objCrea.changeeval) arrToEval.push([objCrea, "changeeval", objCrea.name]);
		if (objComp && objComp.changeeval) arrToEval.push([objComp, "changeeval", objComp.nameMenu]);
	}

	// Process all the queued evals, in the order they were added
	// This way, the main `eval` is processed first, but after all the strings are in the right location
	for (var i = 0; i < arrToEval.length; i++) {
		ApplyCreatureEval(prefix, arrToEval[i][0], [oldLvl, newLvl], arrToEval[i][1], arrToEval[i][2]);
	}
}

// run the CurrentEvals.creatureCallback (sType == "creature") or CurrentEvals.companionCallback functions (sType == "companion") or specific function (fOverride = function) to a specific page (prefix == "prefix") or all companion pages (prefix == "all")
function RunCreatureCallback(sPrefix, sType, bAdd, fOverride, sOverrideNm) {
	var sEvalType = (/companion/i).test(sType) ? "companionCallback" : "creatureCallback";
	var aPrefix = (/all/i).test(sPrefix) ? What("Template.extras.AScomp").split(",").splice(1) : [sPrefix];
	if (bAdd === undefined) bAdd = true;
	var prefix, oCrea, sCompType, sEval;
	var doEval = function(evalThing, evalName) {
		if (!evalThing) return;
		try {
			if (typeof evalThing == 'function') evalThing(prefix, oCrea, bAdd, sCompType);
		} catch (error) {
			var eText = "The custom callback function (" + sEvalType + ") from '" + evalName + "' produced an error! It will be removed from the sheet for now, but please contact the author of the feature to have this issue corrected:\n " + error;
			for (var e in error) eText += "\n " + e + ": " + error[e];
			console.println(eText);
			console.show();
			if (CurrentEvals[sEvalType] && CurrentEvals[sEvalType][evalName]) {
				delete CurrentEvals[sEvalType][evalName];
				CurrentEvals[sEvalType + "Order"].splice(i, 1);
				return "error";
			}
		}
	}
	for (var i = 0; i < aPrefix.length; i++) {
		prefix = aPrefix[i];
		oCrea = CurrentCompRace[prefix];
		if (oCrea.typeFound !== "creature") continue;
		sCompType = What(prefix + "Companion.Remember");
		if (sEvalType === "companionCallback" && !sCompType) continue;
		if (fOverride) {
			doEval(fOverride, sOverrideNm);
		} else if (CurrentEvals[sEvalType + "Order"]) {
			for (var j = 0; j < CurrentEvals[sEvalType + "Order"].length; j++) {
				var evalName = CurrentEvals[sEvalType + "Order"][j][1];
				var evalThing = CurrentEvals[sEvalType][evalName];
				if (doEval(evalThing, evalName) === "error") e--;
			}
		}
	}
}

// set a race on an empty companion page (or add a new page)
// aCreaAdds is an array with arrays of 3 entries: [sRace (string), bRemoveWholePage (boolean), fCallBack (function)], but the 2nd and 3rd entries are optional
function processAddCompanions(bAddRemove, srcNm, aCreaAdds) {
	if (!isArray(aCreaAdds)) aCreaAdds = [aCreaAdds];
	var aChangeMsg = [];
	var fCallBackError = false;
	var doCallBack = function(fCallBack, prefix) {
		if (!fCallBackError && fCallBack && typeof fCallBack == 'function') {
			try {
				fCallBack(bAddRemove, prefix);
			} catch (error) {
				var eText = 'The callback function of the creaturesAdd attribute from "' + srcNm + '" produced an error while ' + (bAddRemove ? 'adding' : 'removing') + ' the "' + sRace + '" creature! Please contact the author of the feature to correct this issue:\n '  + error;
				for (var e in error) eText += "\n " + e + ": " + error[e];
				console.println(eText);
				console.show();
				fCallBackError = true;
			}
		}
	}
	for (var i = 0; i < aCreaAdds.length; i++) {
		var aCreaAdd = !isArray(aCreaAdds[i]) ? [aCreaAdds[i]] : aCreaAdds[i];
		var sRace = aCreaAdd[0];
		var sRaceLow = sRace.toString().toLowerCase();
		var bRemoveWholePage = aCreaAdd[1];
		var aCallBack = aCreaAdd[2];
		var sCompanionType = aCreaAdd[3] && CompanionList[aCreaAdd[3]] ? aCreaAdd[3] : false;
		var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
		if (bAddRemove) { // add
			var prefix = false, stopMatch = false;
			if (AScompA) {
				for (var a = 1; a < AScompA.length; a++) {
					var sFndRace = What(AScompA[a] + 'Comp.Race');
					if (!prefix && !sFndRace) prefix = AScompA[a];
					if (sFndRace.toLowerCase() === sRaceLow && CurrentCompRace[AScompA[a]] && (!sCompanionType || CurrentCompRace[AScompA[a]].typeCompanion === sCompanionType)) {
						prefix = AScompA[a];
						stopMatch = true;
						break;
					}
				}
			}
			if (!prefix) prefix = DoTemplate('AScomp', 'Add');
			if (!stopMatch) {
				ApplyCompRace(sRace, prefix, sCompanionType);
				doCallBack(aCallBack, prefix);
				var sChangeMsgName = '"' + What(prefix + 'Comp.Race') + '"'; // Get it from the page in case the callback changed it.
				if (sCompanionType) sChangeMsgName = CompanionList[sCompanionType].nameMenu + " " + sChangeMsgName;
				aChangeMsg.push('A ' + sChangeMsgName + ' has been added to the companion page at page number ' + (tDoc.getField(prefix + 'Comp.Race').page + 1) + '.');
			}
		} else { // remove
			for (var a = 1; a < AScompA.length; a++) {
				if (What(AScompA[a] + 'Comp.Race').toLowerCase().indexOf(sRaceLow) !== -1) {
					var iPageNo = tDoc.getField(AScompA[a] + 'Comp.Race').page + 1;
					if (bRemoveWholePage) { // remove the whole page
						DoTemplate("AScomp", "Remove", AScompA[a], true);
					} else {
						Value(prefix + 'Comp.Race', ""); // reset the race field
					}
					doCallBack(aCallBack, prefix);
					aChangeMsg.push('The companion page at page number ' + iPageNo + ' has ' + (bRemoveWholePage ? 'been removed' : 'had its race option reset') + ' as it contained the "' + sRace + '" race.');
				}
			}
		}
	}
	// Add a reminder to the notes of the changes pop-up
	if (aChangeMsg.length) {
		CurrentUpdates.types.push("notes");
		if (!CurrentUpdates.companionChanges) CurrentUpdates.companionChanges = [];
		CurrentUpdates.companionChanges = CurrentUpdates.companionChanges.concat(aChangeMsg);
	}
}

//calculate whether the skill bonus equals proficiency, expertise, or something else
function CompSkillRefer(Skill, SkillBonus, scores, profB) {
	var SkillName = Skill.capitalize();
	if (Skill.length > 4) {
		if (SkillsList.abbreviations.indexOf(SkillName.substring(0, 4)) !== -1) {
			SkillName = SkillName.substring(0, 4);
		} else if (SkillsList.abbreviations.indexOf(SkillName.substring(0, 3)) !== -1) {
			SkillName = SkillName.substring(0, 3);
		}
	};

	var SkillAbility = SkillsList.abilityScores[SkillsList.abbreviations.indexOf(SkillName)];
	var SkillMod = Math.round((scores[AbilityScores.abbreviations.indexOf(SkillAbility)] - 10.5) * 0.5);

	if (SkillBonus === SkillMod) {
		var theReturn = [SkillName, "nothing", 0];
	} else if (SkillBonus === (SkillMod + profB)) {
		var theReturn = [SkillName, "proficient", 0];
	} else if (SkillBonus === (SkillMod + (2 * profB))) {
		var theReturn = [SkillName, "expertise", 0];
	} else if (SkillBonus > (SkillMod + (2 * profB))) {
		var theReturn = [SkillName, "expertise", SkillBonus - (SkillMod + (2 * profB))];
	} else if (SkillBonus > (SkillMod + profB)) {
		var theReturn = [SkillName, "proficient", SkillBonus - (SkillMod + profB)];
	} else {
		var theReturn = [SkillName, "nothing", SkillBonus - SkillMod];
	}

	return theReturn;
}

// manual trigger for clicking the skill proficiency/expertise (MouseUp) on the companion page
function applyCompSkillClick() {
	var isExp = (/Exp$/).test(event.target.name);
	var isCheck = event.target.isBoxChecked(0) ? true : false;
	if (isCheck != isExp) return; // nothing to do
	var otherFld = event.target.name.replace(/(Exp|Prof)$/, isExp ? "Prof" : "Exp");
	Checkbox(otherFld, isCheck);
}

// call this to update the companion page's proficiency bonus field so it displays the die
function setCompProfDie() {
	var prefix = event.target.name.substring(0, event.target.name.indexOf("BlueText."));
	var profFld = prefix + "Comp.Use.Proficiency Bonus";
	Value(profFld, What(profFld));
}

//see if the weapon matches one of the companion as a creature
function parseCompWeapon(input, prefix) {
	if (!input || !CurrentCompRace[prefix] || !CurrentCompRace[prefix].attacks) return "";

	var input = removeDiacritics(input).toLowerCase();
	var tempFound = false;

	//scan string for all attacks
	for (var n = 0; n < CurrentCompRace[prefix].attacks.length; n++) {
		var nAtk = CurrentCompRace[prefix].attacks[n].name.toLowerCase();
		if (input.indexOf(nAtk) !== -1) return n;
	}

	return ""; // nothing was found, so return nothing
}

//detects weapons entered on the companion sheet and put information to global CurrentWeapons variable
function FindCompWeapons(ArrayNmbr, aPrefix) {
	if (aPrefix) {
		var prefixA = [aPrefix];
	} else {
		var prefixA = What("Template.extras.AScomp").split(",");
	}
	for (var p = 0; p < prefixA.length; p++) {
		var prefix = prefixA[p];
		var tempString = "";
		var tempFound = false;
		var tempArray = [];
		var startArray = ArrayNmbr;
		var endArray = ArrayNmbr + 1;
		var isCompRace = CurrentCompRace[prefix] && CurrentCompRace[prefix].typeFound === "creature" && CurrentCompRace[prefix].known;

		//do all the weapons, if no ArrayNmbr has been entered
		if (ArrayNmbr === undefined) {
			CurrentWeapons.compField[prefix] = [];
			CurrentWeapons.compKnown[prefix] = [];
			for (var i = 0; i < 3; i++) {
				CurrentWeapons.compField[prefix][i] = What(prefix + "Comp.Use.Attack." + (i + 1) + ".Weapon Selection").toLowerCase();
			}
			var startArray = 0;
			var endArray = CurrentWeapons.compField[prefix].length;
		}

		// parse the weapons into tempArray
		for (var j = startArray; j < endArray; j++) {
			tempString = CurrentWeapons.compField[prefix][j];
			tempArray[j] = [
				"", // 0 - attack entry in WeaponsList or companion attack array
				0,			// 1 - magic bonus
				true		// 2 - add ability modifier to damage
			];
			// if a creature is found, check to see if attack entered matches one of the creature's attacks
			var compAttackFound = false;
			if (isCompRace) { 
				tempArray[j][0] = parseCompWeapon(tempString, prefix);
				compAttackFound = tempArray[j][0] !== "";
			}
			// if not a comprace or nothing was found above, see if the field contains a known weapon
			if (!compAttackFound) { 
				tempArray[j][0] = ParseWeapon(tempString);
			}
			// add magical bonus, denoted by a "+" or "-"
			var magicRegex = /(?:^|\s|\(|\[)([\+-]\d+)/;
			if (magicRegex.test(tempString)) {
				tempArray[j][1] = parseFloat(tempString.match(magicRegex)[1]);
			}
			// add the true/false switch for adding ability score to damage or not
			if (!compAttackFound && tempArray[j][0]) {
				var theWea = WeaponsList[tempArray[j][0]];
				tempArray[j][2] = theWea.abilitytodamage !== undefined ? theWea.abilitytodamage : true;
			} else if (compAttackFound) {
				var compAttack = CurrentCompRace[prefix].attacks[tempArray[j][0]];
				if (compAttack.abilitytodamage !== undefined) {
					tempArray[j][2] = compAttack.abilitytodamage;
				} else if (compAttack.modifiers && compAttack.modifiers[2] !== "") {
					// --- backwards compatibility --- //
					tempArray[j][2] = compAttack.modifiers[2];
				}
			}
			//put tempArray in known
			CurrentWeapons.compKnown[prefix][j] = tempArray[j];
		}
	}
}

function addCompEvals(evalObj, prefix, NameEntity, Add) {
	if (!evalObj) return;

	// do the stuff for the hp calculations
	if (evalObj.hp) {
		if (Add) {
			if (!CurrentEvals.Comp) CurrentEvals.Comp = {};
			if (!CurrentEvals.Comp[prefix]) CurrentEvals.Comp[prefix] = {};
			if (!CurrentEvals.Comp[prefix].hp) CurrentEvals.Comp[prefix].hp = {};
			CurrentEvals.Comp[prefix].hp[NameEntity] = evalObj.hp;
		} else if (CurrentEvals.Comp && CurrentEvals.Comp[prefix] && CurrentEvals.Comp[prefix].hp && CurrentEvals.Comp[prefix].hp[NameEntity]) {
			delete CurrentEvals.Comp[prefix].hp[NameEntity];
		};
		if (evalObj.hpForceRecalc) {
			if (CurrentEvals.Comp[prefix].hpForceRecalc === undefined) CurrentEvals.Comp[prefix].hpForceRecalc = 0;
			if (Add) {
				CurrentEvals.Comp[prefix].hpForceRecalc++;
			} else if (CurrentEvals.Comp[prefix].hpForceRecalc) {
				CurrentEvals.Comp[prefix].hpForceRecalc--;
			}
		}
	};
	var theFld = prefix + "Comp.Use.HP.Max";
	var theSettingPre = How(theFld).split(",");
	SetHPTooltip(false, true, prefix);
	if (evalObj.hp && evalObj.setAltHp) {
		var theSettingPost = How(theFld).split(",");
		if (theSettingPre.length !== theSettingPost.length) {
			var setLen = theSettingPost.length - 1;
			if (Add && setLen > 3) {
				theSettingPost[3] = "alt:" + setLen;
				Value(theFld, theSettingPost[setLen], Who(theFld), theSettingPost.join());
			} else if (theSettingPost[3].indexOf("alt") !== -1) {
				theSettingPost[3] = "nothing";
				AddTooltip(theFld, undefined, theSettingPost.join());
			}
		}
	}
}

//add a wildshape based on the selection and calculation settings
function ApplyWildshape() {
	if (IsSetDropDowns) return; // when just changing the dropdowns, don't do anything
	if (event.target && event.value.toLowerCase() === event.target.value.toLowerCase()) return; //no changes were made

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying wild shape...");
	calcStop();

	var prefix = getTemplPre(event.target.name, "WSfront", true);
	var Fld = event.target.name.slice(-1);
	var newForm = event.value.toLowerCase();
	var resetFlds = [
		prefix + "Wildshape." + Fld,
		prefix + "Text.Wildshape." + Fld
	];
	var resetTooltipsFlds = function() {
		AddTooltip(prefix + "Wildshape." + Fld + ".Attack." + 1 + ".Description", "");
		AddTooltip(prefix + "Wildshape." + Fld + ".Attack." + 2 + ".Description", "");
		AddTooltip(prefix + "Wildshape." + Fld + ".AC", "");
	}

	if (newForm === "" || newForm === "make a selection") {
		thermoTxt = thermoM("Resetting the wild shape...", false); //change the progress dialog text
		tDoc.resetForm(resetFlds);
		thermoM(1/2); //increment the progress dialog's progress
		resetTooltipsFlds();
		thermoM(thermoTxt, true); // Stop progress bar
		return; //don't do the rest of the function
	}

	var newCrea = ParseCreature(newForm);

	var oldCrea = ParseCreature(event.target.value);
	if (newCrea === oldCrea || !newCrea || !What("Character Level") || !What("Int")|| !What("Wis")|| !What("Cha")) { //If this returns true, it means that no (new) race was found; or that the character has not been defined enough yet so the function can be stopped
		thermoM(thermoTxt, true); // Stop progress bar
		return; //don't do the rest of the function
	}

	thermoTxt = thermoM("Resetting the wild shape...", false); //change the progress dialog text
	tDoc.resetForm(resetFlds);
	resetTooltipsFlds();
	thermoM(1/10); //increment the progress dialog's progress

	thermoTxt = thermoM("Applying the new wild shape...", false); //change the progress dialog text
	var theCrea = CreatureList[newCrea];
	//calculate the new array of ability scores
	var scores = [
		theCrea.scores[0],
		theCrea.scores[1],
		theCrea.scores[2],
		What("Int"),
		What("Wis"),
		What("Cha")
	];

	//calculate the ability score modifiers
	var mods = [];
	for (var i = 0; i < scores.length; i++) {
		mods[i] = Math.round((scores[i] - 10.5) * 0.5);
	}

	//get the proficiency bonuses
	ProfBonus("Proficiency Bonus"); // first make sure it is up to date
	var creaProfBcalc = theCrea.proficiencyBonus;
	var charProfBcalc = Number(What("Proficiency Bonus"));
	var creaProfBfix = theCrea.proficiencyBonus;
	var charProfBfix = Number(What("Proficiency Bonus"));

	//get the setting field
	var setting = What("Wildshapes.Remember").split("!#TheListSeparator#!");

	if (setting[0] === "all_creature") {
		charProfBcalc = creaProfBcalc;
	} else if (setting[0] === "all_druid") {
		creaProfBcalc = charProfBcalc;
	}

	//define a function that calculates the proficiency bonus to use
	var getProfB = function(ProfB, isProf, halfProf) {
		if (isProf === "expertise") {
			return ProfB * 2;
		} else if (isProf === "proficient") {
			return ProfB;
		} else if (halfProf) {
			return Math.floor(ProfB / 2);
		} else {
			return 0;
		}
	}

	//add ability scores (and set the mods for things using it while calculations are suspended)
	for (var a = 0; a < AbilityScores.abbreviations.length; a++) {
		Value(prefix + "Wildshape." + Fld + ".Ability." + AbilityScores.abbreviations[a] + ".Score", scores[a]);
		Value(prefix + "Wildshape." + Fld + ".Ability." + AbilityScores.abbreviations[a] + ".Mod", mods[a]);
	}

	thermoM(2/10); //increment the progress dialog's progress

	//add the size
	SetCreatureSize([prefix, Fld], theCrea.name, theCrea.size);

	//set race's type
	var typeString = theCrea.subtype ? theCrea.type + " (" + theCrea.subtype + ")" : theCrea.type;
	Value(prefix + "Wildshape." + Fld + ".MonsterType", typeString);

	//set speed
	var theSpeed = What("Unit System") === "imperial" ? theCrea.speed : ConvertToMetric(theCrea.speed, 0.5);
	if (typePF) theSpeed = theSpeed.replace("(,|;) ", "$1\n"); // add line breaks
	Value(prefix + "Wildshape." + Fld + ".Speed", theSpeed);

	//if the character is using proficiency dice instead of a bonus, change the values for calculations to zero and change the Proficiency Bonus field to display a dice
	if (tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0) === 1) {
		var profToDisplay = GetProfDice(creaProfBcalc);
		creaProfBcalc = 0;
		charProfBcalc = 0;
	} else {
		var profToDisplay = creaProfBcalc;
	}

	Value(prefix + "Wildshape." + Fld + ".Proficiency Bonus", profToDisplay); //set proficiency bonus
	Value(prefix + "Wildshape." + Fld + ".HP Max", theCrea.hp); //set HP
	Value(prefix + "Wildshape." + Fld + ".HD", theCrea.hd[0] + "d" + theCrea.hd[1]); //set HD
	Value(prefix + "Wildshape." + Fld + ".CR", theCrea.challengeRating); //set CR

	//set AC
	var theAC = [theCrea.ac];
	var theACtt = [""];
	if (CurrentVars.extraArmour) {
		for (var anArmour in CurrentVars.extraArmour) {
			var spArmour = CurrentVars.extraArmour[anArmour];
			if (!spArmour.affectsWildShape) continue;
			var newAC = Number(EvalBonus(spArmour.ac, prefix, Fld)) + calcCompMaxDexToAC(false, anArmour, mods[1]);
			if (newAC) {
				theAC.push(newAC);
				theACtt.push("\n\nThe AC used here is calculated using " + spArmour.name);
			}
		}
	}
	if (CurrentArmour.known && ArmourList[CurrentArmour.known].affectsWildShape) {
		var newAC = Number(EvalBonus(CurrentArmour.acString, prefix, Fld)) + calcCompMaxDexToAC(false, anArmour, mods[1]);
		theAC.push(newAC);
		theACtt.push("\n\nThe AC used here is calculated using " + What("AC Armor Description"));
	}
	var theACtoUse = Math.max.apply(null, theAC);
	var theTTtoUse = "The " + theCrea.name + " default AC is " + theCrea.ac + theACtt[theAC.indexOf(theACtoUse)];
	Value(prefix + "Wildshape." + Fld + ".AC", theACtoUse, theTTtoUse);

	thermoM(3/10); //increment the progress dialog's progress

	//set the initiative value
	var initBonus = EvalBonus(What("Init Bonus"), prefix, Fld);
	if (tDoc.getField("Jack of All Trades").isBoxChecked(0) === 1 || tDoc.getField("Remarkable Athlete").isBoxChecked(0) === 1) initBonus += Math.floor(charProfBcalc / 2); //add half the proficiency bonus if either Jack of All Trades or Remarkable Athlete is checked off
	Value(prefix + "Wildshape." + Fld + ".Initiative Bonus", mods[1] + Number(initBonus));

	thermoM(4/10); //increment the progress dialog's progress

	//set the skill proficiencies
	for (var s = 0; s < (SkillsList.abbreviations.length - 2); s++) {
		//get the particulars of the skill
		var skill = SkillsList.abbreviations[s];
		var skillFull = SkillsList.names[s];
		var skillDruid = Who("Text.SkillsNames") === "alphabeta" ? skill : SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(skill)];
		var skillAbi = SkillsList.abilityScores[s];
		var skillMod = mods[AbilityScores.abbreviations.indexOf(skillAbi)];
		if (!typePF) {
			var skillFlds = [
				prefix + "Wildshape." + Fld + ".Skills." + skill, //for the numerical value
				prefix + "Text.Wildshape." + Fld + ".Skills." + skill + ".Prof", //pick proficiency/expertise/nothing
			];
		} else {
			var skillFlds = [
				prefix + "Wildshape." + Fld + ".Skills." + skill + ".Mod", //for the numerical value
				prefix + "Wildshape." + Fld + ".Skills." + skill + ".Prof", //for the proficiency
				prefix + "Wildshape." + Fld + ".Skills." + skill + ".Exp", //for the expertise
			];
		}

		//see if the creature has proficiency/expertise in it
		if (theCrea.skills && theCrea.skills[skillFull.toLowerCase()] !== undefined) {
			var skillCrea = CompSkillRefer(skill, theCrea.skills[skillFull.toLowerCase()], theCrea.scores, creaProfBfix);
		} else {
			var skillCrea = [skill, "nothing", 0];
		}

		//see if the druid has proficiency/expertise in it
		var charProfFlds = [
			tDoc.getField(skillDruid + " Prof").isBoxChecked(0) === 1,
			tDoc.getField(skillDruid + " Exp").isBoxChecked(0) === 1,
			What(skillDruid + " Bonus"),
			What("All Skills Bonus"),
			tDoc.getField("Jack of All Trades").isBoxChecked(0) === 1 || (tDoc.getField("Remarkable Athlete").isBoxChecked(0) === 1 && (skillAbi === "Str" || skillAbi === "Dex" || skillAbi === "Con"))
		];
		var skillChar = [
			skill,
			charProfFlds[0] && charProfFlds[1] ? "expertise" : charProfFlds[0] ? "proficient" : "nothing",
			EvalBonus(charProfFlds[2], prefix, Fld),
			EvalBonus(charProfFlds[3], prefix, Fld)
		];

		//set the right colouring of the skill name (i.e. the proficiency level)
		var skillProf = "nothing";
		if (skillCrea[1] === "expertise" || skillChar[1] === "expertise") {
			skillProf = "expertise";
		} else if (skillCrea[1] === "proficient" || skillChar[1] === "proficient") {
			skillProf = "proficient";
		}
		if (!typePF) {
			Value(skillFlds[1], skillProf);
		} else {
			Checkbox(skillFlds[1], skillProf === "expertise" || skillProf === "proficient");
			Checkbox(skillFlds[2], skillProf === "expertise");
		}

		//set the bonus for the skill
		if (setting[0] === "by_the_numbers") { //if set to only compare by the numbers, regardless of actual stats/prof bonus
			var skillBonus = theCrea.skills && theCrea.skills[skillFull.toLowerCase()] !== undefined ? Math.max(theCrea.skills[skillFull.toLowerCase()], What(skill)) : Math.max(skillMod, What(skill));
		} else {
			//if set to use char's prof bonus for everything, but not double it on creature expertise, add it to the
			if (setting[1].indexOf("expertise") === -1 && skillCrea[1] === "expertise") {
				skillCrea[2] += creaProfBfix; //add the prof bonus from the creature stat block, because we are not now doubling any prof bonus
				skillCrea[1] = "proficient"; //just set it to proficient, so that it will be only added once
			}

			var creaSkillProfB = getProfB(creaProfBcalc, skillCrea[1], false);
			var charSkillProfB = getProfB(charProfBcalc, skillChar[1], charProfFlds[4]);

			//calculate the skill bonus with the highest proficiency bonus
			var skillBonus = skillMod + Math.max(creaSkillProfB + skillCrea[2], charSkillProfB) + skillChar[2] + skillChar[3];
		}
		Value(skillFlds[0], skillBonus);

		//set the passive perception if calculating the perception score
		if (skillFull === "Perception") {
			var passPercBonus = EvalBonus(What("Passive Perception Bonus"), prefix, Fld);
			Value(prefix + "Wildshape." + Fld + ".Skills.PassPerc", 10 + skillBonus + Number(passPercBonus));
		}
	}

	thermoM(5/10); //increment the progress dialog's progress

	//set the saving throw proficiencies
	for (var s = 0; s < AbilityScores.abbreviations.length; s++) {
		//get the particulars of the save
		var saveAbi = AbilityScores.abbreviations[s];
		var saveMod = mods[s];
		var saveFlds = [
			prefix + "Wildshape." + Fld + ".Ability." + saveAbi + ".ST.Prof", //check if proficient
			prefix + "Wildshape." + Fld + ".Ability." + saveAbi + ".ST.Mod" //for the numerical value
		];
		var creaSave = theCrea.saves && isArray(theCrea.saves) && theCrea.saves[s] !== undefined ? theCrea.saves[s] : "";

		//see if the creature has proficiency/expertise in it, and any possible bonuses
		var saveCrea = [
			creaSave !== "" ? "proficient" : "nothing",
			creaSave !== "" ? creaProfBcalc : 0,
			creaSave !== "" ? creaSave - Math.round((theCrea.scores[s] - 10.5) * 0.5) - creaProfBfix : 0
		];

		//see if the druid has proficiency/expertise in it, and any possible bonuses
		var saveCharFlds = [
			tDoc.getField(saveAbi + " ST Prof").isBoxChecked(0) === 1,
			What(saveAbi + " ST Bonus"),
			What("All ST Bonus")
		];
		var saveChar = [
			saveCharFlds[0] ? "proficient" : "nothing",
			saveCharFlds[0] ? charProfBcalc : 0,
			EvalBonus(saveCharFlds[1], prefix, Fld),
			EvalBonus(saveCharFlds[2], prefix, Fld)
		];

		//check the box for proficiency, if applicable
		if (saveCrea[0] === "proficient" || saveChar[0] === "proficient") {
			Checkbox(saveFlds[0]);
		}

		//set the bonus for the save
		if (setting[0] === "by_the_numbers") { //if set to only compare by the numbers, regardless of actual stats/prof bonus
			var saveBonus = creaSave !== "" ? Math.max(creaSave, What(saveAbi + " ST Mod")) : Math.max(saveMod, What(saveAbi + " ST Mod"));
		} else {
			//calculate the skill bonus with the highest proficiency bonus
			var saveBonus = saveMod + Math.max(saveCrea[1] + saveCrea[2], saveChar[1]) + saveChar[2] + saveChar[3];
		}
		Value(saveFlds[1], saveBonus);
	}

	thermoM(6/10); //increment the progress dialog's progress

	//add attacks
	var modIpvDC = tDoc.getField("BlueText.Players Make All Rolls").isBoxChecked(0);
	var attacksArray = theCrea.wildshapeAttacks ? theCrea.attacks.concat(theCrea.wildshapeAttacks) : theCrea.attacks;
	for (var a = 0; a < (Math.min(2, attacksArray.length)); a++) {
		var atk = attacksArray[a];
		var atkStr = prefix + "Wildshape." + Fld + ".Attack." + (a + 1);
		var atkMod = mods[atk.ability - 1];
		var atkAlt = atk.modifiers ? atk.modifiers : [];
		var atkRange = What("Unit System") === "imperial" ? atk.range : ConvertToMetric(atk.range, 0.5);
		Value(atkStr + ".Weapon", atk.name); //set attack name
		Value(atkStr + ".Range", atkRange); //set attack range
		Value(atkStr + ".Description", atk.description, atk.tooltip ? atk.tooltip : ""); //set attack description

		//set to hit
		var tohitProfB = setting[1].indexOf("attacks") !== -1 ? charProfBfix : creaProfBfix;
		tohitProfB = tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0) ? 0 : tohitProfB;
		var tohitString = atk.dc && !modIpvDC ? 8 + tohitProfB + atkMod : tohitProfB + atkMod;
		if (atkAlt[0]) tohitString += !isNaN(atkAlt[0]) ? atkAlt[0] : AbilityScores.abbreviations.indexOf(atkAlt[0]) !== -1 ? mods[AbilityScores.abbreviations.indexOf(atkAlt[0])] : 0; //add a modifier, if defined
		if (atk.dc && !modIpvDC) {
			tohitString = "DC " + tohitString;
		} else if (tohitString >= 0) {
			tohitString = "+" + tohitString;
		}
		Value(atkStr + ".To Hit", tohitString); //set to hit string

		//set damage
		var damageString = atk.damage[1] === "" ? atk.damage[0] : atk.damage[0] + "d" + atk.damage[1];
		var damageBonus = (!atkAlt[1] ? 0 : !isNaN(atkAlt[1]) ? atkAlt[1] : mods[AbilityScores.abbreviations.indexOf(atkAlt[1])]) + (atkAlt[2] !== undefined && atkAlt[2] !== "" && atkAlt[2] === false ? 0 : atkMod);
		damageString += damageBonus === 0 ? "" : damageBonus > 0 ? "+" + damageBonus : damageBonus;
		Value(atkStr + ".Damage", damageString); //set damage string
		AddDmgType(atkStr + ".Damage Type", atk.damage[2]); //set damage type
	}

	thermoM(7/10); //increment the progress dialog's progress

	//add traits & features
	var strTraits = "";
	if (theCrea.wildshapeString) {
		strTraits = theCrea.wildshapeString;
	} else {
		//set senses
		var sensesToAdd = theCrea.senses.replace(/(\; )?Adv\..+(hearing|sight|smell)/i, ""); //avoid duplicating the information with regards to the keen hearing/sight/smell traits
		if (sensesToAdd) {
			strTraits += "\u25C6 Senses: " + sensesToAdd; 
		}
		//add resistances & immunities
		if (theCrea.damage_vulnerabilities) {
			strTraits += "\n\u25C6 Damage Vulnerabilities: " + theCrea.damage_vulnerabilities + ".";
		}
		if (theCrea.damage_resistances) {
			strTraits += "\n\u25C6 Damage Resistances: " + theCrea.damage_resistances + ".";
		}
		if (theCrea.damage_immunities) {
			strTraits += "\n\u25C6 Damage Immunities: " + theCrea.damage_immunities + ".";
		}
		if (theCrea.condition_immunities) {
			strTraits += "\n\u25C6 Condition Immunities: " + theCrea.condition_immunities + ".";
		}
		//add actions
		if (theCrea.actions) {
			for (var t = 0; t < theCrea.actions.length; t++) {
				strTraits += "\n\u25C6 " + theCrea.actions[t].name + (theCrea.actions[t].joinString !== undefined ? theCrea.actions[t].joinString : ": ") + theCrea.actions[t].description;
			}
		}
		//add traits
		if (theCrea.traits) {
			for (var t = 0; t < theCrea.traits.length; t++) {
				strTraits += "\n\u25C6 " + theCrea.traits[t].name + (theCrea.traits[t].joinString !== undefined ? theCrea.traits[t].joinString : ": ") + theCrea.traits[t].description;
			}
		}
	}

	thermoM(9/10); //increment the progress dialog's progress

	//convert to metric, if applicable
	if (strTraits && What("Unit System") === "metric") strTraits = ConvertToMetric(strTraits, 0.5);
	// add the string to the field
	if (strTraits) {
		strTraits = strTraits.replace(/^\n+|^\r+/g, "").replace(/\[THIS\]/g, clean(newForm));
		AddString(prefix + "Wildshape." + Fld + ".Traits", strTraits, true);
	}

	thermoM(8/10); //increment the progress dialog's progress

	thermoM(thermoTxt, true); // Stop progress bar
}

//add a wild shape to the top most empty place
function AddWildshape(input, inCrea) {
	var prefixA = What("Template.extras.WSfront").split(",").splice(1);
	var inputLC = input.toLowerCase();
	inCrea = inCrea && CreatureList[inCrea] ? inCrea : ParseCreature(inputLC);
	if (!inCrea) return;
	for (var n = 1; n <= 2; n++) {
		for (var p = 0; p < prefixA.length; p++) {
			var prefix = prefixA[p];
			for (var i = 1; i <= 4; i++) {
				var aShp = What(prefix + "Wildshape.Race." + i).toLowerCase();
				var aCrea = n === 1 ? ParseCreature(aShp) : "";
				if (n === 1 && (aShp == inputLC || inCrea == aCrea)) {
					return; //the value was found to already exist
				} else if (n === 2 && (!aShp || aShp.indexOf("make a selection") !== -1)) {
					Value(prefix + "Wildshape.Race." + i, input);
					return;
				}
			}
		}
	};
	//if the wildshape to add was not found and there was no room to add it, add another wild shapes page and add the entry to the top of the new page
	var newPrefix = DoTemplate("WSfront", "Add");
	Value(newPrefix + "Wildshape.Race.1", input);
}

//remove the first instance of the wild shape found
function RemoveWildshape(input) {
	var prefixA = What("Template.extras.WSfront").split(",").splice(1);
	for (var p = 0; p < prefixA.length; p++) {
		var prefix = prefixA[p];
		for (var i = 1; i <= 4; i++) {
			next = tDoc.getField(prefix + "Wildshape.Race." + i);
			if (next.value.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
				next.value = next.defaultValue;
				i = 5;
				p = prefixA.length;
				WildshapeRecalc();
			}
		}
	}
}

//make a menu for wild shape options
function MakeWildshapeMenu() {
	var prefix = getTemplPre(event.target.name, "WSfront", true);

	if (!What("Character Level") || !What("Int")|| !What("Wis")|| !What("Cha")) { //If the character has not been defined enough, the function can be stopped after making a warning-menu
		Menus.wildshape = [{cName : "Please create a character on the 1st page before trying a Wild Shape", cReturn : "nothing#toreport", bEnabled : false}];
		return; //don't do the rest of the function
	}

	//make a list of the current wild shapes entered
	var usedShapes = [];
	var prefixA = What("Template.extras.WSfront").split(",").splice(1);
	for (var p = 0; p < prefixA.length; p++) {
		for (var i = 1; i <= 4; i++) {
			var theFld = What(prefixA[p] + "Wildshape.Race." + i);
			if (!theFld || theFld.toLowerCase() === "make a selection") continue;
			var theShape = ParseCreature(theFld);
			if (theShape) usedShapes.push(theShape);
		}
	}

	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			item.push({
				cName : array[i][0],
				cReturn : array[i][1] + "#" + "nothing"
			});
		}
	};

	var menuLVL2 = function (menu, name, array) {
		var temp = {};
		temp.cName = name[0];
		temp.oSubMenu = [];
		for (var i = 0; i < array.length; i++) {
			temp.oSubMenu.push({
				cName : array[i],
				cReturn : name[1] + "#" + array[i]
			})
		}
		menu.push(temp);
	};

	var menuLVL3 = function (menu, name, array) {
		var temp = [];
		for (var i = 0; i < array.length; i++) {
			temp.push({
				cName : array[i][0],
				cReturn : "add" + "#" + array[i][1],
				bMarked : usedShapes.indexOf(array[i][1]) !== -1
			});
		};
		menu.oSubMenu.push({
			cName : name,
			oSubMenu : temp
		});
	};

	var menuLVL2Ext = function (menu, array, thereturn) {
		var toTest = What("Wildshapes.Remember").split("!#TheListSeparator#!");
		for (var i = 0; i < array.length; i++) {
			menu.oSubMenu.push({
				cName : array[i][0],
				cReturn : thereturn + "#" + array[i][1],
				bMarked : toTest[0] === array[i][1]
			})
		}
	};

	var menuLVL3Ext = function (menu, name, array, thereturn) {
		var toTest = What("Wildshapes.Remember").split("!#TheListSeparator#!");
		var temp = [];
		for (var i = 0; i < array.length; i++) {
			temp.push({
				cName : array[i][0],
				cReturn : thereturn + "#" + name[1] + "#" + array[i][1],
				bMarked : toTest[1] === array[i][1]
			})
		}
		menu.oSubMenu.push({
			cName : name[0],
			oSubMenu : temp,
			bMarked : toTest[0] === name[1]
		});
	};

	var WildshapeMenu = [];

	var allCrea = {
		names : [],
		keys : {}
	};

	for (var crea in CreatureList) {
		var thisCrea = CreatureList[crea];
		if ((!(/^(air|earth|fire|water) elemental$/i).test(crea) && thisCrea.type !== "Beast")
			|| allCrea.keys[thisCrea.name]
			|| (CurrentVars.extraCreatures && CurrentVars.extraCreatures[crea])
			|| testSource(crea, thisCrea, "creaExcl")) {
			continue; //go on to the next creature if the creature is not a beast, was already added, is added by a creatureOptions attribute, or its source isn't excluded
		};
		allCrea.keys[thisCrea.name] = crea;
		allCrea.names.push(thisCrea.name);
	};
	allCrea.names.sort();

	var elementals = [];
	var shapesBeast = {
		all : [],
		CR1_4 : [],
		CR1_2 : [],
		CR1 : [],
		CR2 : [],
		CR3 : [],
		CR4 : [],
		CR5 : [],
		CR6 : []
	};

	for (var C = 0; C < allCrea.names.length; C++) {
		var aCrea = allCrea.keys[allCrea.names[C]];
		var theCrea = CreatureList[aCrea];

		if ((/^(air|earth|fire|water) elemental$/i).test(aCrea))  {
			elementals.push([theCrea.name, aCrea]);
			continue; //it is not one of the other things, so just stop here
		};

		//see if the creature has a fly and/or swim speed
		var Spd = theCrea.speed.match(/fly|swim/ig);
		if (Spd) {
			switch (Spd.toLowerCase()) {
				case "fly,swim" :
				case "swim,fly" :
				 Spd = "Fly and Swim speeds";
				 break;
				case "fly" :
				 Spd = "Fly speed";
				 break;
				case "swim" :
				 Spd = "Swim speed";
				 break;
			}
		}

		//select based on challenge Rating
		var CR = theCrea.challengeRating;
		var CRname = false;
		var creaName = theCrea.name;
		switch (CR) {
			case "0" :
			case "1/8" :
			case "1/4" :
			 CRname = "1_4";
			 creaName += " (CR " + CR + (Spd ? ", " + Spd : "") + ")";
			 break;
			case "1/2" :
			 CRname = "1_2";
			 creaName += (Spd ? " (" + Spd + ")" : "");
			 break;
			case "1" :
			case "2" :
			case "3" :
			case "4" :
			case "5" :
			case "6" :
			 CRname = CR;
			 creaName += (Spd ? " (" + Spd + ")" : "");
		};

		//add it to the array of all
		shapesBeast.all.push([theCrea.name + " (CR " + CR + (Spd ? ", " + Spd : "") + ")", aCrea]);

		//add it to the CR specific array
		if (CRname) shapesBeast["CR" + CRname].push([creaName, aCrea]);
	};

	//add all the options for "Add Wild Shape"
	var BeastMenu = {
		cName : "Add Wild Shape",
		oSubMenu : []
	};
	if (CurrentSources.globalExcl.indexOf("M") !== -1) { // the monster manual has been excluded from the sources
		BeastMenu.oSubMenu.push({
			cName : "Be aware: the Monster Manual is excluded from the sources!",
			cReturn : "-",
			bEnabled : false
		});
	};
	menuLVL3(BeastMenu, "All Beasts", shapesBeast.all);
	menuLVL3(BeastMenu, "Elementals", elementals);
	menuLVL3(BeastMenu, "Beasts up to CR 1/4", shapesBeast.CR1_4);
	menuLVL3(BeastMenu, "Beasts of CR 1/2", shapesBeast.CR1_2);
	menuLVL3(BeastMenu, "Beasts of CR 1", shapesBeast.CR1);
	menuLVL3(BeastMenu, "Beasts of CR 2", shapesBeast.CR2);
	menuLVL3(BeastMenu, "Beasts of CR 3", shapesBeast.CR3);
	menuLVL3(BeastMenu, "Beasts of CR 4", shapesBeast.CR4);
	menuLVL3(BeastMenu, "Beasts of CR 5", shapesBeast.CR5);
	menuLVL3(BeastMenu, "Beasts of CR 6", shapesBeast.CR6);
	WildshapeMenu.push(BeastMenu);

	WildshapeMenu.push({cName : "-"}); //add a divider

	//add all the options for "Remove Wild Shape"
	if (usedShapes.length > 0) { //if any shapes are currently present
		menuLVL2(WildshapeMenu, ["Remove Wild Shape", "remove"], usedShapes)
	} else { //if no shapes are present to be removed, add the item, but grey it out
		WildshapeMenu.push({cName : "Remove Wild Shape", cReturn : "nothing", bEnabled : false});
	}

	WildshapeMenu.push({cName : "-"}); //add a divider

	//add the options for wildshape calculation
	var calcMenu = {
		cName : "Calculation options",
		oSubMenu : []
	};
	menuLVL2Ext(calcMenu, [["Use druid's prof. bonus if druid is prof.", "default"]], "wildshapeSelect");
	//add a submenu for the next options
	menuLVL3Ext(calcMenu, ["Use druid's prof. bonus for all prof.", "all_druid"], [["Excluding attacks and expertise", "excluding"], ["Including attacks", "attacks"], ["Including expertise", "expertise"], ["Including attacks and expertise", "attacks_expertise"]], "wildshapeSelect");
	//add two more options
	menuLVL2Ext(calcMenu, [["Use creature's prof. bonus for all prof.", "all_creature"], ["Only compare based on total number", "by_the_numbers"]], "wildshapeSelect");

	WildshapeMenu.push(calcMenu);

	//add options to re-calculate and to reset
	menuLVL1(WildshapeMenu, [["-", "-"], ["Re-calculate the Wild Shapes", "recalculate"], ["Order the Wild Shapes alphabetically (re-calculates)", "order"], ["Reset all the Wild Shapes on this page", "reset"], ["-", "-"], ["Add extra 'Wild Shapes' page", "add page"], [(prefix ? "Remove" : "Hide") + " this 'Wild Shapes' page", "remove page"]]);

	Menus.wildshape = WildshapeMenu;
};

//call the wildshape menu and do something with the results
function WildshapeOptions() {
	var MenuSelection = getMenu("wildshape");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;
	var prefix = getTemplPre(event.target.name, "WSfront", true);
	switch (MenuSelection[0]) {
	 case "recalculate" :
		WildshapeRecalc();
		break;
	 case "order" :
		WildshapeRecalc("order");
		break;
	 case "reset" :
		calcStop();
		tDoc.resetForm([prefix + "Wildshape.Race"]);
		break;
	 case "add" :
		AddWildshape(CreatureList[MenuSelection[1]].name, MenuSelection[1]);
		break;
	 case "remove" :
		RemoveWildshape(MenuSelection[1]);
		break;
	 case "wildshapeselect" :
		if (MenuSelection[1] === "all_druid") {
			var theValue = MenuSelection[1] + "!#TheListSeparator#!" + MenuSelection[2];
		} else {
			var theValue = MenuSelection[1] + "!#TheListSeparator#!" + "nothing";
		}
		if (What("Wildshapes.Remember") !== theValue) {
			Value("Wildshapes.Remember", theValue);
			WildshapeRecalc();
		}
		break;
	 case "add page" :
		DoTemplate("WSfront", "Add");
		break;
	 case "remove page" :
		DoTemplate("WSfront", "Remove", prefix);
		break;
	}
}

//re-calculate all the wild shapes
function WildshapeRecalc(order) {
	// first make sure we have the right calculated values (if function is invoked when changes are made after a calcStop)
	tDoc.calculateNow();

	// Start progress bar
	var thermoTxt = thermoM("Re-calculating the wild shapes...");

	var prefixA = What("Template.extras.WSfront").split(",").splice(1);
	var theFields = [];
	var theFieldsNames = [];
	//first add all the wildshapes to an array and reset all the fields
	for (var p = 0; p < prefixA.length; p++) {
		var prefix = prefixA[p];
		for (var i = 1; i <= 4; i++) {
			var theFld = prefix + "Wildshape.Race." + i;
			theFieldsNames.push(theFld); //add all the fields to the array, so we have an exhaustive list of all the options
			var theValue = What(theFld);
			if (theValue && theValue.toLowerCase() !== "make a selection") {
				theFields.push(theValue);
			}
		}
		tDoc.resetForm([prefix + "Wildshape.Race"]);
		thermoM(p/(prefixA.length * 4 + prefixA.length)); //increment the progress dialog's progress
	}
	//order the array, if so selected
	if (order) theFields.sort();

	//now add all the wildshapes in the array to the empty fields
	for (var F = 0; F < theFields.length; F++) {
		Value(theFieldsNames[F], theFields[F]);
		thermoM((F + prefixA.length)/(theFields.length + prefixA.length)); //increment the progress dialog's progress
	}
	// Stop progress bar
	thermoM(thermoTxt, true);
}

//set the drop-down menus for wildshape selection fields
function SetWildshapeDropdown(forceTooltips) {
	var tempString = "Type (or select) the name of the creature you want to calculate a Wild Shape for.";
	tempString += "\n\n" + toUni("Not auto-updated") + "\nThe generated stats will not auto-update once you change something on the first page! They will only update when your druid level changes. You can have them re-calculated using the \"Wild Shape Options\" button at the top of this page.";
	tempString += "\n\n" + toUni("First create the character") + "\nNote that nothing will happen if no character is defined on the 1st page.";
	tempString += "\n\n" + toUni("Calculation is wrong") + "\nThe Wild Shape rules are open for interpertation and your DM might not approve with the way it is done here. You can change the calculation of proficiencies using the \"Wild Shape Options\" button at the top of this page.\nYou can always change the outcome yourself, because all of the fields are editable.";

	var theList = [];

	for (var key in CreatureList) {
		if (CurrentVars.extraCreatures && CurrentVars.extraCreatures[key]) continue;
		if ((CreatureList[key].type === "Beast" && eval_ish(CreatureList[key].challengeRating) <= 6) || (/^(air|earth|fire|water) elemental$/i).test(key)) {
			if (testSource(key, CreatureList[key], "creaExcl") || theList.indexOf(CreatureList[key].name) !== -1) continue;
			theList.push(CreatureList[key].name);
		}
	}
	theList.sort();

	theList.unshift("");
	if (!typePF) theList.unshift("Make a Selection");

	var applyItems = tDoc.getField("Wildshapes.Settings").submitName !== theList.toSource();
	if (applyItems) tDoc.getField("Wildshapes.Settings").submitName = theList.toSource();

	var WSfrontA = What("Template.extras.WSfront").split(",");
	for (var A = 0; A < WSfrontA.length; A++) {
		for (var i = 1; i <= 4; i++) {
			var theFld = WSfrontA[A] + "Wildshape.Race." + i;
			var theFldVal = What(theFld);
			if (applyItems) {
				tDoc.getField(theFld).setItems(theList);
				Value(theFld, theFldVal, tempString);
			} else if (forceTooltips) {
				AddTooltip(theFld, tempString);
			}
		}
	}
}

//set the drop-down menus for companion race
function SetCompDropdown(forceTooltips) {
	var tempString = "Type (or select) the name of the race you want to have on this page. Note that first a list of player races is given, followed by an alphabetical list of creatures. You are not limited by the names in the list. Just typing \"Drow\" will also be recognized, for example.";
	tempString += "\n\n" + toUni("Selecting a creature") + "\nAll information of the creature will automatically be added. This includes ability scores, proficiencies, senses, weapons, etc. You can change the things afterwards.\nBecause not all creatures need the same amount of space for all their feature text,some fields may overflow. You can manually edit these fields so that everything is visible when printed (e.g. move things to the \"Noted\" below).";
	tempString += "\n\n" + toUni("Selecting a player race") + "\nAll the same things as selecting a player race on the first page will happen, with the exception that no limited feature or ability DC is added as there is no room for that."
	tempString += "\n\n" + toUni("Changing the race") + "\nIf you entered a race that was recognized and then change the entry to something that is not recognized, all the features and abilities of the recognized race will remain in place. This way, you can change the name of the race to something, while keeping the stats of something else. For example, you can choose \"Frog\" and then change it to \"Toad\", creating a toad with the stats of a frog.";

	var theListStart = [], theListR = [], theListC = [];

	for (var key in RaceList) {
		if (testSource(key, RaceList[key], "racesExcl")) continue;
		var raceNm = RaceList[key].sortname ? RaceList[key].sortname : RaceList[key].name.capitalize();
		if (theListR.indexOf(raceNm) === -1) theListR.push(raceNm);
	}
	theListR.sort().unshift("");

	for (var key in CreatureList) {
		if (testSource(key, CreatureList[key], "creaExcl")) continue;
		if (CurrentVars.extraCreatures && CurrentVars.extraCreatures[key] && theListStart.indexOf(CreatureList[key].name) === -1) {
			theListStart.push(CreatureList[key].name);
			continue;
		}
		if (theListC.indexOf(CreatureList[key].name) === -1) theListC.push(CreatureList[key].name);
	}
	if (theListStart.length) theListStart.sort().unshift("");
	theListC.sort().unshift("");

	var theList = theListStart.concat(theListC).concat(theListR);

	var applyItems = tDoc.getField("Companion.Remember").submitName !== theList.toSource();
	if (applyItems) tDoc.getField("Companion.Remember").submitName = theList.toSource();

	var AScompA = What("Template.extras.AScomp").split(",");
	for (var A = 0; A < AScompA.length; A++) {
		var theFld = AScompA[A] + "Comp.Race";
		var theFldVal = What(theFld);
		if (applyItems) {
			tDoc.getField(theFld).setItems(theList);
			Value(theFld, theFldVal, tempString);
		} else if (forceTooltips) {
			AddTooltip(theFld, tempString);
		}
	}
};
//update the wild shape header and all the different shapes on the all the wildshape pages
function WildshapeUpdate(inputArray) {
	var prefixA = What("Template.extras.WSfront").split(",");
	if (inputArray && inputArray[1]) {
		var wlvl = inputArray[0];
		var wUses = inputArray[1];
		var wRec = inputArray[2];
		var useString = isNaN(wUses) && (wUses.indexOf("\u221E") !== -1 || wUses.toLowerCase().indexOf("unlimited") !== -1) ? "Unlimited" : wUses + (!isNaN(wUses) ? "\xD7" : "") + " per " + wRec;
		var wLimit = inputArray[3].match(/CR.+;/i);
		wLimit = wLimit ? "max " + wLimit[0].replace(";", "") : "";
		var wDur = inputArray[3].match(/(\d+) h(our)?s?/i);
		wDur = wDur ? wDur[0].replace(/h$/i, "hour" + (Number(wDur[1]) > 1 ? "s" : "")) : "";
	} else {
		var useString = What("Wildshapes.Info.Uses");
		var wLimit = What("Wildshapes.Info.Limitations");
		var wDur = What("Wildshapes.Info.Duration");
		prefixA.splice(prefixA.indexOf(""), 1);
	}
	for (var p = 0; p < prefixA.length; p++) {
		var prefix = prefixA[p];
		if (useString) {
			Value(prefix + "Wildshapes.Info.Uses", useString);
			Value(prefix + "Wildshapes.Info.Limitations", wLimit);
			Value(prefix + "Wildshapes.Info.Duration", wDur);
		} else {
			tDoc.resetForm([prefix + "Wildshapes.Info"]);
		};
	};
	//now recalculate all the wild shapes if not just adding a new sheet (i.e. inputArray === undefined)
	if (inputArray !== undefined) WildshapeRecalc();
}

//change the font of all fields to this
function ChangeFont(newFont, oldFont) {
	newFont = newFont ? newFont : (!typePF ? "SegoePrint" : "SegoeUI");
	oldFont = oldFont ? oldFont : tDoc.getField((tDoc.info.AdvLogOnly ? "AdvLog." : "") + "Player Name").textFont;
	var aTest = newFont === (!typePF ? "SegoePrint" : "SegoeUI") ? true : testFont(newFont);
	if (!aTest || newFont == oldFont) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying the " + newFont + " font...");
	calcStop();

	var FldNums = tDoc.numFields;
	for (var F = 0; F < FldNums; F++) {
		var Fname = tDoc.getNthFieldName(F);
		var Fld = tDoc.getField(Fname);
		if (!(/spells\.|Template\.extras/).test(Fname) && Fld.textFont === oldFont && (Fld.type !== "text" || Fld.richText === false)) {
			Fld.textFont = newFont;
		}
		thermoM((F+1)/FldNums); //increment the progress dialog's progress
	}

	thermoM(thermoTxt, true); // Stop progress bar
}

//change the colorscheme that is used for the Ability Save DC. Choose from: "red", "green", ""; The "DC" can be either 1 or 2.
function ApplyDCColorScheme(colour, DC) {
	if (typePF || (!colour && What("Color.DC") === tDoc.getField("Color.DC").defaultValue)) return; //don't do this function in the Printer-Friendly version or if resetting with the default colour
	//stop the function if the input color is not recognized
	if (colour || DC) {
		colour = colour && isNaN(colour) ? colour.toLowerCase() : DC ? What("Color.DC").split(",")[DC - 1] : "red";
		colour = colour.replace(/same as | head/ig, '');
		if (colour && colour !== "headers" && colour !== "dragons" && !ColorList[colour]) return;
	}

	var colorGo = What("Color.DC").split(",");
	var DCstart = DC ? DC : 1;
	var DCstop = DC ? DC : 2;

	if (DC && colour) {
		//set the color of the DC that was given in the input
		colorGo[DC - 1] = colour;
	} else if (colour) { //if no DC is given, assume both need to be set to the same
		colorGo = [colour, colour];
	}

	//set the chosen colors to a place it can be found again
	Value("Color.DC", colorGo);

	for (var dc = DCstart; dc <= DCstop; dc++) {
		var DCcolor = colorGo[dc - 1];
		switch (DCcolor) {
			case "headers" :
				DCcolor = What("Color.Theme");
				break;
			case "dragons" :
				DCcolor = What("Color.DragonHeads");
				break;
		}
		if (!ColorList[DCcolor]) {
			continue; //if not a recognized colour, continue with the next
		}
		var DCimg = tDoc.getField("SaveIMG.SaveDC." + DCcolor).buttonGetIcon();
		tDoc.getField("Image.SaveDC." + dc).buttonSetIcon(DCimg);
		var DCarrow = tDoc.getField("SaveIMG.Arrow." + DCcolor).buttonGetIcon();
		tDoc.getField("Image.SaveDCarrow." + dc).buttonSetIcon(DCarrow);
		tDoc.getField("Spell DC " + dc + " Mod").textColor = ColorList[DCcolor].RGB;
	}
}

// Make menu for the button on each Action line and parse it to Menus.actions
function MakeActionMenu_ActionOptions(MenuSelection, FldNm, itemNmbr) {
	var actionMenu = [];
	if (!itemNmbr) itemNmbr = parseFloat(event.target.name.slice(-2));
	if (!FldNm) FldNm = event.target.name.match(/bonus action|reaction|action/i)[0];
	var type = FldNm.toLowerCase();
	FldNm = FldNm + " ";
	var maxNmbr = type === "action" ? FieldNumbers.trueactions : FieldNumbers.actions;
	var theField = What(FldNm + itemNmbr);
	var noUp = itemNmbr === 1;
	var noDown = itemNmbr === maxNmbr;

	if (!MenuSelection || MenuSelection === "justMenu") {
		// a function to add the other items
		var menuLVL1 = function (array) {
			for (i = 0; i < array.length; i++) {
				actionMenu.push({
					cName : array[i][0],
					cReturn : "action#" + array[i][1],
					bEnabled : array[i][2] !== undefined ? array[i][2] : true
				});
			}
		};

		var menuArray = [
			["Move up" + (itemNmbr === (maxNmbr - 5) ? " (to first page)" : ""), "up", !noUp],
			["Move down" + (itemNmbr === (maxNmbr - 6) ? " (to overflow page)" : ""), "down", !noDown],
			["-", "-"],
			["Insert empty " + type, "insert", noDown || !theField ? false : true],
			["Delete item", "delete"],
			["Clear item", "clear"]
		];
		if (type === "action" && (!typePF || itemNmbr > (maxNmbr - 6))) {
			menuArray = menuArray.concat([
				["-", "-"],
				["Swap with opposing field", "opposite"]
			]);
		}
		menuLVL1(menuArray);
		Menus.actions = actionMenu;
		if (MenuSelection == "justMenu") return;
	}
	var MenuSelection = MenuSelection ? MenuSelection : getMenu("actions");
	if (!MenuSelection || MenuSelection[0] == "nothing" || MenuSelection[0] != "action") return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying action menu option...");
	calcStop();

	switch (MenuSelection[1]) {
		case "up" :
			if (noUp) return;
		case "down" :
			if (MenuSelection[1] == "down" && noDown) return;
		case "opposite":
			thermoTxt = thermoM("Moving the " + type + " " + MenuSelection[1] + "...", false);
			// Get the other fields
			var otherNmbr = MenuSelection[1] == "down" ? itemNmbr + 1 : MenuSelection[1] == "up" ? itemNmbr - 1 :
				// swap with opposite, first see if on overflow page and which side
				itemNmbr > maxNmbr - 3 ? itemNmbr - 3 : itemNmbr > maxNmbr - 6 && itemNmbr < maxNmbr - 3 ? itemNmbr + 3 :
				// swap with opposite on 1st page, see which side
				itemNmbr > (maxNmbr - 6) / 2 ? itemNmbr - ((maxNmbr - 6) / 2) : itemNmbr - ((maxNmbr + 6) / 2);
			// Now swap the fields
			copyField(FldNm + itemNmbr, FldNm + otherNmbr, { noCalc : true }, true);
			break;
		case "insert" :
			ActionInsert(type, itemNmbr);
			break;
		case "delete" :
			ActionDelete(type, itemNmbr);
			break;
		case "clear" :
			Value(FldNm + itemNmbr, "", "", "");
			break;
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

function AddAction(actiontype, action, actiontooltip, replaceThis, replaceMatch) {
	var field = (/bonus/i).test(actiontype) ? "Bonus Action " : (/reaction/i).test(actiontype) ? "Reaction " : "Action ";
	var numberOfFields = field === "Action " ? FieldNumbers.trueactions : FieldNumbers.actions;
	// first loop through all to see if it isn't already known
	// also check if there is a match if we are trying to replace something
	var doReplace = false;
	for (var i = 1; i <= numberOfFields; i++) {
		var setVal = How(field + i).split("#!#");
		if (replaceThis && (setVal[0] == replaceThis || (replaceMatch && What(field + i).toLowerCase().indexOf(replaceThis.toLowerCase()) !== -1))) doReplace = i;
		if (setVal[0] == action) {
			if (actiontooltip) { // add the extra source
				var tooltips = setVal.slice(1);
				if (tooltips.indexOf(actiontooltip) == -1) {
					tooltips = tooltips.concat([actiontooltip]);
					AddTooltip(
						field + i,
						formatMultiList('The "' + action + '" ' + field.toLowerCase() + "was gained from:", tooltips),
						setVal.concat([actiontooltip]).join("#!#")
					);
				}
			}
			return;
		}
	}
	// set the new action to its field
	for (var i = 1; i <= numberOfFields; i++) {
		var actFld = tDoc.getField(field + i);
		if ((doReplace && doReplace === i) || (!doReplace && actFld.value === "")) {
			actFld.value = action;
			actFld.userName = actiontooltip ? formatMultiList('The "' + action + '" ' + field.toLowerCase() + "was gained from:", actiontooltip) : "";
			actFld.submitName = actiontooltip ? [action, actiontooltip].join("#!#") : action;
			return;
		}
	}
};

function RemoveAction(actiontype, action, actiontooltip) {
	var field = (/bonus/i).test(actiontype) ? "Bonus Action " : (/reaction/i).test(actiontype) ? "Reaction " : "Action ";
	var numberOfFields = field === "Action " ? FieldNumbers.trueactions : FieldNumbers.actions;
	for (var i = 1; i <= numberOfFields; i++) {
		var actFldVal = What(field + i);
		var setVal = How(field + i).split("#!#");
		if ((typeof action == "object" && (action).test(actFldVal)) || (typeof action == "string" && setVal[0] == action)) {
			if (setVal.length < 3 || !actiontooltip) {
				ActionDelete(clean(field).toLowerCase(), i);
			} else if (actiontooltip) {
				var tooltips = setVal.slice(1);
				tooltips.splice(tooltips.indexOf(actiontooltip), 1);
				AddTooltip(
					field + i,
					formatMultiList('The "' + setVal[0] + '" ' + field.toLowerCase() + "was gained from:", tooltips),
					[setVal[0]].concat(tooltips).join("#!#")
				);
			}
			return;
		};
	};
};

//insert a Action at the position wanted
function ActionInsert(type, itemNmbr) {
	var maxNmbr = type === "action" ? FieldNumbers.trueactions : FieldNumbers.actions;
	var FldNm = type.capitalize() + " ";
	var Field = FldNm + itemNmbr;

	//stop the function if the selected slot is already empty
	if (What(Field) === "" || itemNmbr === maxNmbr) return;

	//look for the first empty slot below the slot
	var endslot = false;
	for (var i = itemNmbr + 1; i <= maxNmbr; i++) {
		if (What(FldNm + i) === "") {
			endslot = i;
			break;
		};
	};

	//only continue if an empty slot was found in the fields
	if (!endslot) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Inserting empty " + type + "...");
	calcStop();

	//cycle to the slots starting with the empty one and add the values of the one above
	for (var i = endslot; i > itemNmbr; i--) {
		copyField(FldNm + (i - 1), FldNm + i, { noCalc : true });
	};

	//empty the selected slot
	Value(Field, "", "", "");

	thermoM(thermoTxt, true); // Stop progress bar
};

//delete a Action at the position wanted and move the rest up
function ActionDelete(type, itemNmbr) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Deleting " + type + "...");
	calcStop();

	var FldNm = type.capitalize() + " ";
	// var Field = FldNm + itemNmbr;
	var maxNmbr = type === "action" ? FieldNumbers.trueactions : FieldNumbers.actions;
	if (!typePF && type === "action" && itemNmbr < (maxNmbr- 6) / 2) {
		var maxNmbr = (maxNmbr - 6) / 2;
	} else {
		maxNmbr = itemNmbr > (maxNmbr - 6) || What(FldNm + (maxNmbr - 6)) ? maxNmbr : maxNmbr - 6; //stop at the end of the first page if last one on first page is empty
	};

	//move every line up one space, starting with the line below the selected line
	for (var i = itemNmbr; i < maxNmbr; i++) {
		copyField(FldNm + (i + 1), FldNm + i, { noCalc : true });
	};

	//delete the contents of the final line
	Value(FldNm + maxNmbr, "", "", "");

	thermoM(thermoTxt, true); // Stop progress bar
};

//Make menu for the button on each Limited Feature line and parse it to Menus.limfea
function MakeLimFeaMenu() {
	var limfeaMenu = [];
	var itemNmbr = parseFloat(event.target.name.slice(-2));
	var maxNmbr = FieldNumbers.limfea;
	var theField = What("Limited Feature " + itemNmbr);
	var SslotsVisible = !typePF && eval_ish(What("SpellSlotsRemember"))[0];
	var frstPend = SslotsVisible ? 5 : 8;

	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			var enabled = true
			if ((array[i] === "Move up" && itemNmbr === 1) || (array[i] === "Move down" && itemNmbr === maxNmbr) || (array[i] === "Insert empty limited feature" && (!theField || itemNmbr === maxNmbr))) {
				enabled = false;
			}
			var extraName = "";
			if (array[i] === "Move down" && itemNmbr === frstPend) {
				extraName = " (to overflow page)";
			} else if (array[i] === "Move up" && itemNmbr === 9) {
				extraName = " (to first page)";
			}
			item.push({
				cName : array[i] + extraName,
				cReturn : array[i],
				bEnabled : enabled
			});
		}
	};

	menuLVL1(limfeaMenu, ["Move up", "Move down", "-", "Insert empty limited feature", "Delete limited feature", "Clear limited feature"]);

	Menus.limfea = limfeaMenu;
};

//call the Limited Feature menu and do something with the results
function LimFeaOptions() {
	var MenuSelection = getMenu("limfea");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	var itemNmbr = parseFloat(event.target.name.slice(-2));
	var maxNmbr = FieldNumbers.limfea;
	var FieldNames = [
		"Limited Feature ",
		"Limited Feature Max Usages ",
		"Limited Feature Recovery ",
		"Limited Feature Used "
	];
	var Fields = [], FieldsValue = [], FieldsTool = [], FieldsCalc = [], FieldsUp = [], FieldsUpValue = [], FieldsUpTool = [], FieldsUpCalc = [], FieldsDown = [], FieldsDownValue = [], FieldsDownTool = [], FieldsDownCalc = [];

	var SslotsVisible = !typePF && eval_ish(What("SpellSlotsRemember"))[0];
	var upDownOffset = SslotsVisible && (itemNmbr === 5 || itemNmbr === 9) ? 4 : 1;

	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(FieldNames[F] + itemNmbr);
		FieldsValue.push(What(Fields[F]));
		FieldsTool.push(Who(Fields[F]));
		FieldsCalc.push(tDoc.getField(Fields[F]).submitName);
		if (itemNmbr !== 1) {
			FieldsUp.push(FieldNames[F] + (itemNmbr - upDownOffset));
			FieldsUpValue.push(What(FieldsUp[F]));
			FieldsUpTool.push(Who(FieldsUp[F]));
			FieldsUpCalc.push(tDoc.getField(FieldsUp[F]).submitName);
		}
		if (itemNmbr !== maxNmbr) {
			FieldsDown.push(FieldNames[F] + (itemNmbr + upDownOffset));
			FieldsDownValue.push(What(FieldsDown[F]));
			FieldsDownTool.push(Who(FieldsDown[F]));
			FieldsDownCalc.push(tDoc.getField(FieldsDown[F]).submitName);
		}
	}

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying limited feature menu option...");
	calcStop();
	switch (MenuSelection[0]) {
	 case "move up":
		thermoTxt = thermoM("Moving the limited feature line up...", false); //change the progress dialog text
		for (var H = 0; H < FieldNames.length; H++) {
			tDoc.getField(FieldsUp[H]).setAction("Calculate", FieldsCalc[H]);
			tDoc.getField(FieldsUp[H]).submitName = FieldsCalc[H];
			tDoc.getField(Fields[H]).setAction("Calculate", FieldsUpCalc[H]);
			tDoc.getField(Fields[H]).submitName = FieldsUpCalc[H];
			Value(FieldsUp[H], FieldsValue[H], FieldsTool[H]);
			Value(Fields[H], FieldsUpValue[H], FieldsUpTool[H]);
			thermoM(H/FieldNames.length); //increment the progress dialog's progress
		};
		break;
	 case "move down":
		thermoTxt = thermoM("Moving the limited feature line down...", false); //change the progress dialog text
		for (var H = 0; H < FieldNames.length; H++) {
			tDoc.getField(FieldsDown[H]).setAction("Calculate", FieldsCalc[H]);
			tDoc.getField(FieldsDown[H]).submitName = FieldsCalc[H];
			tDoc.getField(Fields[H]).setAction("Calculate", FieldsDownCalc[H]);
			tDoc.getField(Fields[H]).submitName = FieldsDownCalc[H];
			Value(FieldsDown[H], FieldsValue[H], FieldsTool[H]);
			Value(Fields[H], FieldsDownValue[H], FieldsDownTool[H]);
			thermoM(H/FieldNames.length); //increment the progress dialog's progress
		};
		break;
	 case "insert empty limited feature":
		thermoTxt = thermoM("Inserting empty limited feature line...", false); //change the progress dialog text
		LimFeaInsert(itemNmbr);
		break;
	 case "delete limited feature":
		thermoTxt = thermoM("Deleting limited feature line...", false); //change the progress dialog text
		LimFeaDelete(itemNmbr);
		break;
	 case "clear limited feature":
		thermoTxt = thermoM("Clearing limited feature line...", false); //change the progress dialog text
		for (var T = 0; T < Fields.length; T++) {
			Value(Fields[T], "", "");
			tDoc.getField(Fields[T]).setAction("Calculate", "");
			tDoc.getField(Fields[T]).submitName = "";
			thermoM(T/Fields.length); //increment the progress dialog's progress
		}
		break;
	}
	thermoM(thermoTxt, true); // Stop progress bar
};

//insert a Limited Feature at the position wanted
function LimFeaInsert(itemNmbr) {
	var SslotsVisible = !typePF && eval_ish(What("SpellSlotsRemember"))[0];
	var maxNmbr = FieldNumbers.limfea;
	var FieldNames = [
		"Limited Feature ",
		"Limited Feature Max Usages ",
		"Limited Feature Recovery ",
		"Limited Feature Used "
	];
	var Fields = [];
	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(FieldNames[F] + itemNmbr);
	}

	//stop the function if the selected slot is already empty
	if (What(Fields[0]) === "" || itemNmbr === maxNmbr) {
		return;
	}

	//look for the first empty slot below the slot
	var endslot = "";
	for (var i = itemNmbr + 1; i <= maxNmbr; i++) {
		if (SslotsVisible && i > 5 && i < 9) continue;
		if (What(FieldNames[0] + i) === "") {
			endslot = i;
			i = (maxNmbr + 1);
		}
	}

	//only continu if an empty slot was found in the fields
	if (endslot) {
		//cycle to the slots starting with the empty one and add the values of the one above
		for (var i = endslot; i > itemNmbr; i--) {
			if (SslotsVisible && i > 5 && i < 9) continue;
			var downOffset = SslotsVisible && i === 9 ? 4 : 1;
			for (var H = 0; H < FieldNames.length; H++) {
				//set the calculations of the usages field
				var theCalc = tDoc.getField(FieldNames[H] + (i - downOffset)).submitName;
				tDoc.getField(FieldNames[H] + i).setAction("Calculate", theCalc);
				tDoc.getField(FieldNames[H] + i).submitName = theCalc;
				//set the value of the field
				Value(FieldNames[H] + i, What(FieldNames[H] + (i - downOffset)), Who(FieldNames[H] + (i - downOffset)));
			}
		}

		//empty the selected slot
		for (var T = 0; T < Fields.length; T++) {
			Value(Fields[T], "", "");
			tDoc.getField(Fields[T]).setAction("Calculate", "");
			tDoc.getField(Fields[T]).submitName = "";
		}
	}
}

//delete a Limited Feature at the position wanted and move the rest up
function LimFeaDelete(itemNmbr) {
	var SslotsVisible = !typePF && eval_ish(What("SpellSlotsRemember"))[0];
	var frstPend = SslotsVisible ? 5 : 8;
	var maxNmbr = FieldNumbers.limfea;
	maxNmbr = itemNmbr > frstPend || What("Limited Feature 8") ? maxNmbr : frstPend; //stop at the end of the first page if last one on first page is empty
	var FieldNames = [
		"Limited Feature ",
		"Limited Feature Max Usages ",
		"Limited Feature Recovery ",
		"Limited Feature Used "
	];
	var Fields = [];
	var EndFields = [];
	for (var F = 0; F < FieldNames.length; F++) {
		Fields.push(FieldNames[F] + itemNmbr);
		EndFields.push(FieldNames[F] + maxNmbr);
	}

	//move every line up one space, starting with the line below the selected line
	for (var i = itemNmbr; i < maxNmbr; i++) {
		for (var H = 0; H < FieldNames.length; H++) {
			if (SslotsVisible && i > 5 && i < 9) continue;
			var upOffset = SslotsVisible && i === 5 ? 4 : 1;
			//set the calculations of the usages field
			var theCalc = tDoc.getField(FieldNames[H] + (i + upOffset)).submitName;
			tDoc.getField(FieldNames[H] + i).setAction("Calculate", theCalc);
			tDoc.getField(FieldNames[H] + i).submitName = theCalc;
			//set the value of the field
			Value(FieldNames[H] + i, What(FieldNames[H] + (i + upOffset)), Who(FieldNames[H] + (i + upOffset)));
		};
	}

	//delete the contents of the final line
	for (var T = 0; T < EndFields.length; T++) {
		Value(EndFields[T], "", "");
		tDoc.getField(EndFields[T]).setAction("Calculate", "");
		tDoc.getField(EndFields[T]).submitName = "";
	}
}

//a way of going to a specified field (for making bookmarks independent of templates)
function Bookmark_Goto(BookNm) {
	// Find the field corresponding to the bookmark name
	var theTemplate = event.type === "Bookmark" ? getBookmarkTemplate(event.target) : false;
	var isVisible = theTemplate ? isTemplVis(theTemplate[0], true) : true;
	var prefix = "";
	if (isArray(isVisible)) {
		prefix = isVisible[1];
		isVisible = isVisible[0];
	}
	var theFld = prefix + BookMarkList[BookNm];

	// Determine if the selected section is on a visible page, and if so go to it.
	if (isVisible && theFld && tDoc.getField(theFld)) {
		tDoc.getField(theFld).setFocus();
		return;
	};

	// If the selected section is on a hidden page, alert the user.
	if (theTemplate) {
		var theMessage = {
			cMsg : "The bookmark \"" + BookNm + "\" you have selected is on a page which is currently hidden.\n\You can change your page visibility settings using the \"Layout\" button in the \"JavaScript Window\" or in the bookmarks.\n\nDo you want to make the page \"" + theTemplate[1] + "\" visible now?" + (theTemplate[0] !== "SSfront" ? "" : "\n\nClicking \"Yes\" will start the Spell Sheets Generation process."),
			nIcon : 2, //question mark
			cTitle : "Bookmark is currently unavailable",
			nType : 2 //Yes-No
		};
		if (app.alert(theMessage) === 4) {
			if (theTemplate[0] !== "SSfront") {
				var newPrefix = DoTemplate(theTemplate[0], "Add");
				tDoc.getField(newPrefix + BookMarkList[BookNm]).setFocus();
			} else {
				GenerateSpellSheet();
			};
		};
	};
};

// a function to delete a page (and deal with the bug https://acrobat.uservoice.com/forums/590923-acrobat-for-windows-and-mac/suggestions/39561631--bug-report-deleting-a-page-while-the-mini-page-p )
function deletePage(fldNm, onTemplate) {
	var tempFld = tDoc.getField(fldNm);
	if (!tempFld) return false;
	var tempPage = onTemplate ? Math.max.apply(Math, tempFld.page) : tempFld.page;
	try {
		tDoc.deletePages(tempPage);
	} catch (theError) {
		// Because of bug, the fields could be removed, but the page is still there. Test for this
		// IMPORTANT, the tempFld object will be dead if all fields by its name were removed, so re-initiate it
		tempFld = tDoc.getField(fldNm);
		var fldWasRemoved = !tempFld ? true : isArray(tempFld.page) ? false : onTemplate ? tempFld.page != tempPage : false;
		if (theError.toString().indexOf("One or more pages are in use and could not be deleted") !== -1 && fldWasRemoved) {
			tDoc.deletePages(tempPage);
			return true;
		}
		return false;
	}
	return true;
}

// show/hide a template (AddRemove == undefined) or add/remove template with multiple instances (AddRemove == "Add" | "Remove" | "RemoveAll")
function DoTemplate(tempNm, AddRemove, removePrefix, GoOn) {
	MakeMobileReady(false); // Undo flatten, if needed

	//make a function for determining the next page to add the template
	var whatPage = function(templN) {
		var DepL = TemplateDep[templN];
		for (var T = 0; T < DepL.length; T++) {
			var theDep = DepL[T];
			var multiDep = TemplatesWithExtras.indexOf(theDep) !== -1;
			if (!multiDep) {
				var DepTypeFld = tDoc.getField(BookMarkList[theDep]);
				if (isArray(DepTypeFld.page)) {
					return Math.max.apply(Math, DepTypeFld.page) + 1;
				};
			} else {
				var DepTypeFlds = What("Template.extras." + theDep);
				if (DepTypeFlds) {
					return tDoc.getField(DepTypeFlds.split(",").slice(-1)[0] + BookMarkList[theDep]).page + 1;
				};
			};
		};
		return 2;
	};

	//are we dealing with a template that can have multiple instances or not?
	var multiTemp = TemplatesWithExtras.indexOf(tempNm) !== -1;
	var theNewPrefix = false;

	if (!multiTemp) { // spawn or hide the template page for templates that can't have multiple instances
		var isTempVisible = isTemplVis(tempNm);
		if (isTempVisible) {
			//find the current page of the template
			var tempFld = BookMarkList[tempNm];
			var tempPage = Math.max.apply(Math, tDoc.getField(tempFld).page) + 1;

			// Start progress bar
			var thermoTxt = thermoM("Hiding " + TemplateNames[tempNm] + ", from page " + tempPage + "...");
			thermoM(0.9);

			// delete the page, but beware of bug
			if (deletePage(tempFld, true)) {
				// grey out the appropriate bookmarks
				amendBookmarks(BookMarkList[tempNm + "_Bookmarks"], false);
			}
			// Stop progress bar
			thermoM(thermoTxt, true);
		} else {
			//the template is invisible, so we have to add it at the right page
			var tempPage = whatPage(tempNm);

			// Start progress bar and stop calculations
			var thermoTxt = thermoM("Revealing " + TemplateNames[tempNm] + ", at page " + (tempPage + 1) + "...");
			thermoM(0.5);
			calcStop();

			//now spawn a new instance of the template with the same fields as the template at the desired page
			tDoc.getTemplate(tempNm).spawn(tempPage, false, false);

			//black out the appropriate bookmarks
			amendBookmarks(BookMarkList[tempNm + "_Bookmarks"], true);

			//now do some extra actions, depending on the page added
			switch (tempNm) {
			 case "ASfront" :
				// if the location column on the second page was set to visible, re-do this again
				if (What("Gear Location Remember").split(",")[1] === "true") {
					HideInvLocationColumn("Extra.Gear ", false);
				};
			 case "ASoverflow" :
				// Correct the visibility of attuned checkboxes of the magic items
				correctMIattunedVisibility(tempNm);
				break;
			};

			//move focus to this new page
			if (IsNotImport) tDoc.getField(BookMarkList[tempNm] + ".1").setFocus();

			// Stop progress bar and start calculations
			thermoM(thermoTxt, true);
		};
	} else { // add or remove a template that can have multiple instances
		var isTempVisible = isTemplVis(tempNm);
		var tempExtras = What("Template.extras." + tempNm).split(",");
		//removing one or all pages
		var isSS = tempNm.substring(0, 2) === "SS";

		if ((/remove/i).test(AddRemove) && isTempVisible) { // If told to remove a page and a page exists
			var newTemplList = What("Template.extras." + tempNm).split(",");
			var removeWhich = (/removeall/i).test(AddRemove) ? "all" : removePrefix ? tempExtras.indexOf(removePrefix) : "last";
			tempExtras = isNaN(removeWhich) ? tempExtras.splice(removeWhich === "all" ? 1 : -1) : tempExtras.splice(removeWhich, 1);
			var pageNr = tempExtras.length > 1 ? false : tDoc.getField(tempExtras[0] + BookMarkList[tempNm]).page + 1;
			var removeTxt = (removeWhich === "all" ? "all " : "") + TemplateNames[tempNm] + (removeWhich === "all" ? "s that are currently in this document" : " (page "+pageNr+")");

			var doGoOn = {
				cTitle: "Continue with deleting page(s)?",
				cMsg: "You are about to remove " + removeTxt + ". All this data will be permanently lost.\n\nThis can't be undone!\nAre you sure you want to continue?",
				nIcon: 2,
				nType: 2
			};

			// Start progress bar
			var thermoTxt = thermoM("Deleting " + removeTxt + "...");

			if (GoOn || app.alert(doGoOn) === 4) {
				// Do some extra actions before removing the page, depending on the page to be removed
				switch (tempNm) {
					case "AScomp" : // clear its race, so that anything affecting the other pages is also undone (does take long, unfortunately)
						for (var i = 0; i < tempExtras.length; i++) {
							Value(tempExtras[i] + "Comp.Race", "");
						}
						break;
				}
				for (var i = tempExtras.length - 1; i >= 0; i--) {
					var tempFld = tempExtras[i] + BookMarkList[tempNm];
					thermoM((i + 1) / tempExtras.length); // Increment the progress bar
					// delete the page, but beware of bug
					if (deletePage(tempFld, false) == false) continue;
					// remove the deleted entry from the newTemplList
					newTemplList.splice(newTemplList.indexOf(tempExtras[i]), 1);
				};

				// Put the updated array in the field
				Value("Template.extras." + tempNm, newTemplList);

				// Amend the bookmarks
				if (newTemplList.toString() === "") amendBookmarks(BookMarkList[tempNm + "_Bookmarks"], false);

				// Do some extra actions, depending on the page(s) removed
				switch (tempNm) {
				case "AScomp" : // Remove the CurrentCompRace attributes that no longer refer to an existing page
					for (var i = 0; i < tempExtras.length; i++) {
						var prefix = tempExtras[i];
						delete CurrentCompRace[prefix];
						delete CurrentWeapons.compField[prefix];
						delete CurrentWeapons.compKnown[prefix];
						if (CurrentEvals.Comp && CurrentEvals.Comp[prefix]) delete CurrentEvals.Comp[prefix];
					}
					break;
				 case "ALlog" :
					if (newTemplList.length) UpdateLogsheetNumbering(newTemplList[1]); // Update the header texts for the still remaining logsheets
					break;
				};
			};

			// Stop progress bar
			thermoM(thermoTxt, true);

		} else if ((/add/i).test(AddRemove)) {
			// find the page where we want to add the new page at
			var tempPage = !isTempVisible ? whatPage(tempNm) : tDoc.getField(tempExtras.slice(-1)[0] + BookMarkList[tempNm]).page + 1;

			// Start progress bar and stop calculations
			var thermoTxt = thermoM(isSS ? "Generating the Spell Sheet(s), Acrobat will be unresponsive for a long time..." : "Adding " + TemplateNames[tempNm] + ", at page " + (tempPage + 1) + "...");
			thermoM(0.35);
			calcStop();

			theNewPrefix = "P" + tempPage + "." + tempNm + ".";

			//if this template is already in use, it might already have the exact prefix that we would make. Thus, we will have to add blank pages to increase the number until it is no longer already defined
			var toDeleteArray = [];
			if (isTempVisible && tempExtras.indexOf(theNewPrefix) !== -1) {
				while (tempExtras.indexOf(theNewPrefix) !== -1) {
					tDoc.getTemplate("blank").spawn(tempPage, false, false);
					toDeleteArray.push(tempPage);
					tempPage++;
					theNewPrefix = "P" + tempPage + "." + tempNm + ".";
				};
			};

			// Add another instance of the template, but with changing the field names
			tDoc.getTemplate(tempNm).spawn(tempPage, true, false);

			// Put the updated array in the field
			tempExtras.push(theNewPrefix);
			Value("Template.extras." + tempNm, tempExtras.toString());

			// Delete all the blank pages we added earlier
			if (toDeleteArray.length) tDoc.deletePages({nStart: toDeleteArray[0], nEnd: toDeleteArray[0] + toDeleteArray.length - 1});

			// Amend the bookmarks
			if (!isTempVisible && BookMarkList[tempNm + "_Bookmarks"]) amendBookmarks(BookMarkList[tempNm + "_Bookmarks"], true);

			// Do some extra actions, depending on the page added
			switch (tempNm) {
			 case "AScomp" : // Re-find the companion page's race and weapons
			 	setCurrentCompRace(theNewPrefix);
				FindCompWeapons(undefined, theNewPrefix);
				break;
			 case "ALlog" : // Update header text and reset calculation order
				if (isTempVisible) UpdateLogsheetNumbering(theNewPrefix);
				SetAdvLogCalcOrder(theNewPrefix);
				break;
			 case "SSfront" : // change the tooltips of the top header and divider, as those can't be moved or hidden
				AddTooltip(theNewPrefix + "spellshead.Text.header.0", "Clear the content of this field to make its prepared section visible again, if you had hidden it.");
				AddTooltip(theNewPrefix + "spellsdiv.Text.0", "");
				break;
			 case "SSmore" :
				Uneditable(theNewPrefix + "spellshead." + (!typePF? "Text" : "Image") + ".prepare.0");
				break;
			};

			//set focus to the new page
			tDoc.getField(theNewPrefix + BookMarkList[tempNm]).setFocus();

			// Stop progress bar and start calculations
			thermoM(thermoTxt, true);
		};
	};
	// If a new template was created with a prefix, return that prefix
	return theNewPrefix ? theNewPrefix : "";
};

//Make menu for the options for hiding, adding, and removing templates (i.e. pages)
function MakePagesMenu() {
	//the functions for adding the base menu elements
	var menuLvl1 = function (menu, array) {
		for (var i = 0; i < array.length; i++) {
			var isMarked = isTemplVis(array[i]);
			menu.push({
				cName : TemplateNames[array[i]],
				cReturn : "template#" + array[i] + "#toggle",
				bMarked : isMarked
			});
		};
	};

	//the start menu entry
	var pagesMenu = [{
		cName : "[Mark the pages you want visible]",
		cReturn : "nothing#toreport",
		bEnabled : false
	}];
	//the menu items for the pages that can only be hidden/shown
	menuLvl1(pagesMenu, ["ASfront", "ASoverflow", "ASbackgr"]);

	//the menu items for the templates of which multiple instances can exist
	var menuLvl2templ = function (menu, array) {
		for (var i = 0; i < array.length; i++) {
			var isVisible = isTemplVis(array[i]);
			var templName = TemplateNames[array[i]];
			var temp = {
				cName : templName,
				bMarked : isVisible
			};
			if (isVisible) {
				var visNr = What("Template.extras." + array[i]).split(",").length - 1;
				temp.oSubMenu = (visNr <= 1 ? [] : [{
					cName : "[" + visNr + " " + templName + "s active]",
					bEnabled : false
				}]).concat([{
					cName : "Add extra " + templName,
					cReturn : "template#" + array[i] + "#add"
				}, {
					cName : "Remove " + (visNr > 1 ? "last " : "") + templName,
					cReturn : "template#" + array[i] +
					"#remove"
				}]).concat(visNr <= 1 ? [] : [{
					cName : "Remove all " + templName + "s",
					cReturn : "template#" + array[i] + "#removeall"
				}]);
			} else {
				temp.cReturn = "template#" + array[i] + "#add";
			};
			menu.push(temp);
		};
	};
	menuLvl2templ(pagesMenu, ["AScomp", "ASnotes", "WSfront", "ALlog"]);

	//the menu item for the refence sheet, if applicable
	if (typePF) menuLvl1(pagesMenu, ["PRsheet"]);

	//a function for adding menu items with a submenu
	var menuLVL2 = function (menu, name, array) {
		var temp = {
			cName : name[0],
			oSubMenu : []
		};
		for (var i = 0; i < array.length; i++) {
			var splitA = array[i][1].split("#");
			var isMarked = name[1] === "dndlogos" ? splitA[1] == cLogoDisplay :
				name[1] === "scores" ? array[i][1] == HoSvis || (array[i][1] == "disable" && !HoSvis) :
				name[1] === "dc" ? splitA[1] == isVis2nd :
				name[1] === "equip" ? (
					splitA[0] == "attuned" ? (splitA[1] == "hide" ? attunedHid : !attunedHid) :
					splitA[0] == "location2" ? (splitA[1] == "show" ? locColVis[0] == "true" : locColVis[0] == "false") :
					splitA[0] == "location3" ? (splitA[1] == "show" ? locColVis[1] == "true" : locColVis[1] == "false") :
					false) :
				false;
			temp.oSubMenu.push({
				cName : array[i][0],
				cReturn : name[1] + "#" + array[i][1] + "#" + isMarked,
				bMarked : isMarked
			});
		};
		menu.push(temp);
	};

	pagesMenu.push({cName : "-", cReturn : "-"}); // add a divider

	//add a menu item for the color them options
	if (!typePF) {
		MakeColorMenu();
		pagesMenu.push({
			cName : "Color Theme options",
			oSubMenu : Menus.colour
		});
	};

	//add the menu for setting the visibility of the D&D logos
	var cLogoDisplay = tDoc.getField("Image.DnDLogo.long").display;
	menuLVL2(pagesMenu, ["Visible D&&D logos", "dndlogos"], [
		["Show the D&&D logos", "show#0"],
		["Show, but don't print the D&&D logos", "noprint#2"],
		["Hide and don't print the D&&D logos", "hide#1"],
		["Hide, but print the D&&D logos", "onlyprint#3"]
	]);

	//add a menu item for the text fields
	MakeTextMenu_TextOptions("justMenu");
	pagesMenu.push({
		cName : "Text field options",
		oSubMenu : Menus.texts
	});

	//show/hide modifier fields
	pagesMenu.push({
		cName : "Show fields to modify calculations",
		cReturn : "bluetextfields",
		bMarked : CurrentVars.bluetxt
	});

	pagesMenu.push({cName : "-", cReturn : "-"}); // add a divider

	//add the menu for setting adventurers league stuff
	MakeAdventureLeagueMenu();
	pagesMenu.push({
		cName : "Adventurers League options",
		oSubMenu : Menus.adventureLeague
	});

	//other alternative rules
	var profDice = tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0);
	pagesMenu.push({
		cName : 'Use "Proficiency Dice" rule    [DMG 263]',
		cReturn : "proficiencydice#" + (profDice ? 0 : 1),
		bMarked : profDice
	});
	var playerAllRolls = tDoc.getField("BlueText.Players Make All Rolls").isBoxChecked(0);
	pagesMenu.push({
		cName : 'Use "Players Make All Roles" rule',
		cReturn : "playerallrolls#" + (playerAllRolls ? 0 : 1),
		bMarked : playerAllRolls
	});

	pagesMenu.push({cName : "-", cReturn : "-"}); // add a divider

	//add a menu item for the first page
	var pageone = {
		cName : "1st page options",
		oSubMenu : []
	};
	//1st page: add the menu for the visibility of the 7h ability score
	var HoSvis = What("HoSRememberState").toLowerCase();
	menuLVL2(pageone.oSubMenu, ["Ability Scores", "scores"], [
		["Open the Ability Scores dialog", "dialog"],
		["-", "-"],
		["Disable the 7th ability score", "disable"],
		["Make the 7th ability score 'Honor'", "honor"],
		["Make the 7th ability score 'Sanity'", "sanity"]
	]);
	//1st page: add the menu for setting hp on the first page
	MakeHPMenu_HPOptions("justMenu");
	pageone.oSubMenu.push({
		cName : "Hit Points",
		oSubMenu : Menus.hp
	});
	//1st page: add the menu for setting skill order
	MakeSkillsMenu_SkillsOptions("justMenu");
	pageone.oSubMenu.push({
		cName : "Skills",
		oSubMenu : Menus.skills
	});
	//1st page: add the menu for setting 2nd Abilty Save DC visibility
	var isVis2nd = isDisplay("Image.SaveDC" + (typePF ? "" : ".2"));
	menuLVL2(pageone.oSubMenu, ["Ability Save DC", "dc"], [
		["Show only 1 ability save DC", "hide#1"],
		["Show both ability save DCs", "show#0"]
	]);
	//1st page: add the first page menu to the whole menu
	pagesMenu.push(pageone);

	//add a menu item for the second page equipment section
	var locColVis = What("Gear Location Remember").split(",");
	var attunedHid = What("Adventuring Gear Remember");
	menuLVL2(pagesMenu, ["2nd page options (equipment section)", "equip"], [
		["Show 'Attuned Magical Items' subsection", "attuned#show"],
		["Hide 'Attuned Magical Items' subsection", "attuned#hide"],
		["-", "-"],
		["Show location column", "location2#show"],
		["Hide location column", "location2#hide"],
		["-", "-"],
		["Carried Weight options (encumbrance rules)", "weight"]
	]);

	//add a menu item for the third page
	var page3txt = "3rd page options";
	if (!isTemplVis("ASfront")) {
		pagesMenu.push({
			cName : page3txt + " [page not visible]",
			cReturn : "-",
			bEnabled : false
		});
	} else if (typePF) {
		//3rd page: add the menu items for the equipment section
		menuLVL2(pagesMenu, [page3txt + " (equipment section)", "equip"], [
			["Show location column", "location3#show"],
			["Hide location column", "location3#hide"]
		]);
	} else {
		var pagethree = {
			cName : page3txt,
			oSubMenu : []
		};
		//3rd page: add the menu items for the equipment section
		menuLVL2(pagethree.oSubMenu, ["Equipment section", "equip"], [
			["Show location column", "location3#show"],
			["Hide location column", "location3#hide"]
		]);
		//3rd page: add the menu items for the visibility of the notes/rules section (CF only)
		LayerVisibilityOptions(false, "justMenu");
		pagethree.oSubMenu.push({
			cName : "Visible sections",
			oSubMenu : Menus.chooselayers
		});
		//3rd page: add the third page menu to the whole menu
		pagesMenu.push(pagethree);
	};

	//add the menu for setting Spell Sheet things
	MakeSpellMenu();
	pagesMenu.push({
		cName : "Spell Sheet options",
		oSubMenu : Menus.spells
	});

	//add the option to enable or disable use of the unicode functions
	pagesMenu.push({cName : "-", cReturn : "-"}); // add a divider
	makeUnicodeMenu();
	pagesMenu.push(Menus.unicode);

	Menus.pages = pagesMenu;
};

//call the pages menu and do something with the results
function PagesOptions() {
	var MenuSelection = getMenu("pages");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;
	switch (MenuSelection[0]) {
		case "proficiencydice":
			Checkbox('Proficiency Bonus Dice', Number(MenuSelection[1]));
			break;
		case "playerallrolls":
			setPlayersMakeAllRolls(Number(MenuSelection[1]));
			break;
		case "bluetextfields":
			ToggleBlueText();
			break;
		case "dndlogos" :
			DnDlogo(MenuSelection[2]);
			break;
		case "template" :
			MenuSelection[1] = MenuSelection[1].substr(0, 2).toUpperCase() + MenuSelection[1].substr(2);
			DoTemplate(MenuSelection[1], MenuSelection[2]);
			break;
		case "advleague" :
			AdventureLeagueOptions(MenuSelection);
			break;
		case "ssheet" :
			MakeSpellMenu_SpellOptions(MenuSelection);
			break;
		case "hp" :
			MakeHPMenu_HPOptions(MenuSelection);
			break;
		case "skills" :
			MakeSkillsMenu_SkillsOptions(MenuSelection);
			break;
		case "scores" :
			if (MenuSelection[1] === "dialog") {
				AbilityScores_Button();
				break;
			};
			ShowHonorSanity(MenuSelection[1].capitalize());
			break;
		case "dc" :
			Toggle2ndAbilityDC(MenuSelection[1]);
			break;
		case "equip" :
			if (MenuSelection[3] == "false") InventoryOptions([MenuSelection[1]]);
			if (MenuSelection[1] == "weight") WeightToCalc_Button();
			break;
		case "3rdpage" :
			LayerVisibilityOptions(false, MenuSelection);
			break;
		case "text" :
			MakeTextMenu_TextOptions(MenuSelection);
			break;
		case "color" :
			ColoryOptions(MenuSelection);
			break;
		case "unicode" :
			setUnicodeUse(MenuSelection[2]);
			break;
	};
};

//show or hide the DnD logos. Input is the number for the field display setting (0-3)
function DnDlogo(input) {
	input = !isNaN(input) ? input : display.visible;
	tDoc.getField("Image.DnDLogo").display = input;
	var prefixArray = What("Template.extras.SSfront").split(",");

	if (typePF && !tDoc.info.SpellsOnly) {
		prefixArray = prefixArray.concat(What("Template.extras.ALlog").split(","));
		if (!minVer) prefixArray = prefixArray.concat(What("Template.extras.AScomp").split(","));
	}

	for (var i = 0; i < prefixArray.length; i++) {
		if (prefixArray[i]) {
			tDoc.getField(prefixArray[i] + "Image.DnDLogo").display = input;
		}
	}
}

//change the color of a section of bookmarks, including all children
function amendBookmarks(theParent, show) {
	if (minVer) return;
	var doTheChildren = function (aParent, colour) {
		for (var i = 0; i < aParent.length; i++) {
			aParent[i].color = colour;
			if (aParent[i].children) {
				doTheChildren(aParent[i].children, colour);
			}
		}
	}

	if (app.viewerType !== "Reader") {
		if (show) {
			var Color = color.black;
			var Style = 2;
		} else {
			var Color = color.ltGray;
			var Style = 0;
		}
		theParent.color = Color;
		theParent.style = Style;
		if (theParent.children) doTheChildren(theParent.children, Color);
	};
}

//change the function of a section of bookmarks, including all children
function functionBookmarks(theParent) {

	var doTheChildren = function (aParent, colour) {
		for (var i = 0; i < aParent.length; i++) {
			aParent[i].setAction("Bookmark_Goto(event.target.name);");
			if (aParent[i].children) {
				doTheChildren(aParent[i].children, colour);
			}
		}
	}

	theParent.setAction("Bookmark_Goto(event.target.name);");
	doTheChildren(theParent.children);
}

//make a menu to hide/show the lines of the notes on the page
//after that, do something with the menu and its results
function MakeNotesMenu_NotesOptions() {
	//define some variables
	var toSearch = event.target.name.indexOf("Notes") !== -1 ? "Notes." : "Cnote.";
	var prefix = event.target.name.substring(0, event.target.name.indexOf(toSearch));
	var NoteMenu = [];
	var WhiteFld = prefix + "Whiteout." + toSearch;
	var WhiteL = WhiteFld + "Left";
	var WhiteR = WhiteFld + "Right";

	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][1] === "comp.img") {
				var isMarked = toShow[0];
			} else if (array[i][1] === "comp.eqp") {
				var isMarked = toShow[1];
			} else {
				var isField = tDoc.getField(array[i][1]);
				var isMarked = isField ? tDoc.getField(array[i][1]).display !== display.visible : false;
			}
			item.push({
				cName : array[i][0],
				cReturn : array[i][1],
				bMarked : isMarked
			});
		}
	};

	var menuArray = [["Left column lines visible", WhiteL], ["Right column lines visible", WhiteR], ["-", "-"]];
	if (toSearch === "Notes.") {
		menuArray.push(["Add extra 'Notes' page", "add page"]);
		menuArray.push([(prefix ? "Remove" : "Hide") + " this 'Notes' page", "remove page"]);
	} else if (toSearch === "Cnote.") {
		var toShow = eval_ish(What(prefix + "Companion.Layers.Remember"));
		menuArray.push(["Show box for Companion's Appearance", "comp.img"]);
		menuArray.push(["Show Equipment section", "comp.eqp"]);
	}
	menuLVL1(NoteMenu, menuArray);

	//parse it into a global variable
	Menus.notes = NoteMenu;

	//now call the menu
	var MenuSelection = getMenu("notes");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	var toDo = false;
	switch (MenuSelection[0]) {
	 case WhiteL.toLowerCase() :
		toDo = WhiteL;
		break;
	 case WhiteR.toLowerCase() :
		toDo = WhiteR;
		break;
	 case "add page" :
		DoTemplate("ASnotes", "Add");
		break;
	 case "remove page" :
		DoTemplate("ASnotes", "Remove", prefix);
		break;
	 case "comp.img" :
		toShow[0] = !toShow[0];
	 case "comp.eqp" :
		if (MenuSelection[0] === "comp.eqp") toShow[1] = !toShow[1];
		Value(prefix + "Companion.Layers.Remember", toShow.toSource());
		ShowCompanionLayer(prefix);
		break;
	}

	if (toDo) {
		if (tDoc.getField(toDo).display === display.visible) {
			Hide(toDo);
		} else {
			Show(toDo);
		}
	}
}

//make a string of all the classes and levels (field calculation)
function CalcFullClassLvlName() {
	var prefix = event.target && event.target.name ? getTemplPre(event.target.name, "ALlog", true) : "";
	if (!prefix) {
		var ClLvls = What("Class and Levels");
		var LVL = What("Character Level");
		if (!classes.parsed.length || ClLvls === "" || LVL === "") {
			var theValue = "";
		} else {
			var isOnlyClass = ClLvls.indexOf(LVL) !== -1;
			if (classes.parsed.length === 1) {
				var theValue = isOnlyClass ? ClLvls : ClLvls + " " + LVL;
			} else {
				var lastMultiLvl = classes.parsed[classes.parsed.length - 1][1];
				var lastStringLvl = Number(clean(ClLvls).slice(-1 * lastMultiLvl.toString().length));
				var theValue = lastMultiLvl === lastStringLvl ? ClLvls : ClLvls + " " + lastMultiLvl;
			}
		}
	} else {
		var theValue = What("AdvLog.Class and Levels");
	}
	return theValue;
}

//return the value of a logsheet's number (field calculation)
function CalcLogsheetNumber() {
	var prefix = getTemplPre(event.target.name, "ALlog", true);
	var ALlogA = What("Template.extras.ALlog").split(",");
	event.value = (ALlogA.indexOf(prefix)) + " of " + (ALlogA.length - 1);
}

//return the previous logsheet's prefix (field calculation)
function CalcLogsheetPrevious(prefix) {
	var ALlogA = What("Template.extras.ALlog").split(",");
	return prefix && ALlogA.indexOf(prefix) - 1 ? ALlogA[ALlogA.indexOf(prefix) - 1] : "";
}

//calculate the total or starting value of an entry in the advanturers log sheet (field calculation)
function CalcLogsheetValue() {
	var fNm = event.target.name;
	var prefix = fNm.substring(0, fNm.indexOf("AdvLog."));
	if (!prefix) return;
	var StrTot = fNm.indexOf("start") !== -1 ? "start" : "total";
	if (StrTot === "total") {
		var theStart = fNm.replace("total", "start");
		var theGain = What(fNm.replace("total", "gain")).replace(/,/g, ".");
		event.target.display = theGain === "" ? display.hidden : tDoc.getField(theStart).display;
		var theStartNmr = Number(What(theStart).replace(/,/g, "."));
		event.value = theGain === "" ? theStartNmr : theStartNmr + eval_ish(theGain);
	} else {
		var FldNmbr = Number(fNm.replace(/.*AdvLog\.(\d+?)\..+/, "$1"));
		if (prefix === What("Template.extras.ALlog").split(",")[1] && FldNmbr === 1) {
			event.target.readonly = false;
			event.target.display = display.visible;
			return;
		} else {
			event.target.readonly = true;
		};
		if (FldNmbr !== 1) {
			var preFld = fNm.replace("AdvLog." + FldNmbr, "AdvLog." + (FldNmbr - 1));
		} else {
			var prePrefix = What(prefix + "AdvLog.previous");
			var preFld = fNm.replace(prefix, prePrefix).replace("AdvLog." + FldNmbr, "AdvLog." + FieldNumbers.logs);
		};
		event.target.display = What(fNm.replace("start", "gain")) !== "" || What(preFld.replace("start", "gain")) !== "" ? display.visible : display.hidden;
		event.value = What(preFld.replace("start", "total"));
	}
}

//add the correct numbers to the logsheet title sections
function UpdateLogsheetNumbering(prefix, prePrefix) {
	prePrefix = prePrefix ? prePrefix : CalcLogsheetPrevious(prefix);
	var preValue = prePrefix ? Number(What(prePrefix + "Text.AdvLog." + FieldNumbers.logs).replace(/Logsheet Entry /i, "")) : 0;
	var logTxt = !typePF ? "Logsheet Entry " : "LOGSHEET ENTRY ";
	for (var i = 1; i <= FieldNumbers.logs; i++) {
		Value(prefix + "Text.AdvLog." + i, logTxt + (preValue + i));
	};
	var ALlogA = What("Template.extras.ALlog").split(",");
	if (prefix !== ALlogA.slice(-1)[0]) UpdateLogsheetNumbering(ALlogA[ALlogA.indexOf(prefix) + 1], prefix);
};

//Make menu for the button on the adventurers log page and parse it to Menus.advlog
//after that, do something with the menu and its results
function MakeAdvLogMenu_AdvLogOptions(Button) {
	var prefix = Button ? "P0.AdvLog." : getTemplPre(event.target.name, "ALlog", true);
	var isFirstPrefix = prefix === What("Template.extras.ALlog").split(",")[1];
	var cLogoDisplay = minVer && typePF ? tDoc.getField("Image.DnDLogo.AL").display : false;

	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			item.push({
				cName : array[i][0],
				cReturn : array[i][1]
			});
		}
	};

	var menuLVL2 = function (menu, name, array) {
		menu.cName = name[0];
		menu.oSubMenu = [];
		for (i = 0; i < array.length; i++) {
			var isMarked = false;
			if (name[1] === "dateformat") {
				isMarked = What("DateFormat_Remember") === array[i][1];
			} else if (name[1] === "dndlogo") {
				isMarked = array[i][1].split("#")[1] == cLogoDisplay;
			};
			menu.oSubMenu.push({
				cName : array[i][0],
				cReturn : name[1] + "#" + array[i][1],
				bMarked : isMarked
			});
		};
	};

	var AdvLogMenu = [];

	var alMenuItems = [
		["Add extra " + (Button ? "page" : "'Adventurers Log' page"), "add page"]
	].concat(
		(Button || (tDoc.info.AdvLogOnly && isFirstPrefix)) ?
		[["Remove all pages and reset the 1st", "remove all"]] :
		[["Remove this 'Adventurers Log' page", "remove page"]]
	).concat(
		(Button) ? [["-", "-"], ["Reset all pages", "reset all"], ["-", "-"]] :
		[["-", "-"], ["Reset this page", "reset"], ["-", "-"]]
	);

	menuLVL1(AdvLogMenu, alMenuItems);

	if (!minVer) {
		menuLVL1(AdvLogMenu, [["Generate next Logsheet Entry", "generate"]]);
	} else if (typePF) {
		var dndLogoMenu = [];
		menuLVL2(dndLogoMenu, ["Visible D&&D logos", "dndlogo"], [
			["Show the D&&D logos", "show#0"],
			["Show, but don't print the D&&D logos", "noprint#2"],
			["Hide and don't print the D&&D logos", "hide#1"],
			["Hide, but print the D&&D logos", "onlyprint#3"]
		]);
		AdvLogMenu.push(dndLogoMenu);
	}

	var dateTypesMenu = [];

	menuLVL2(dateTypesMenu, ["Date format", "dateformat"], [
		["24 Dec 2014", "d mmm yyyy"],
		["24-12-2014", "d-m-yyyy"],
		["24/12/2014", "d/m/yyyy"],
		["Dec 24, 2014", "mmm d, yyyy"],
		["12-24-2014", "m-d-yyyy"],
		["12/24/2014", "m/d/yyyy"],
		["2014 Dec 24", "yyyy mmm d"],
		["2014-12-24", "yyyy-m-d"],
		["2014/12/24", "yyyy/m/d"]
	]);

	AdvLogMenu.push(dateTypesMenu);

	menuLVL1(AdvLogMenu, [["-", "-"], ["Tutorial for Adventurers League logsheet", "tutorial"], ["Advanced tutorial for Adventurers League logsheet", "advanced tutorial"]]);

	Menus.advlog = AdvLogMenu;

	//now call the menu
	var MenuSelection = getMenu("advlog");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;
	var thermoTxt;
	switch (MenuSelection[0]) {
	 case "add page" :
		DoTemplate("ALlog", "Add");
		break;
	 case "remove page" :
		DoTemplate("ALlog", "Remove", prefix);
		break;
	 case "remove all" :
		thermoTxt = thermoM("Removing all Adventure Logsheets...");
		calcStop();
		tDoc.getTemplate("blank").spawn(0, false, false);
		tDoc.deletePages({nStart: 1, nEnd: tDoc.numPages - 1});
		tDoc.getTemplate("ALlog").spawn(0, true, false);
		Value("Template.extras.ALlog", ",P0.ALlog");
		tDoc.deletePages(1);
		break;
	 case "tutorial" :
		app.launchURL("https://dndadventurersleague.org/tutorial-for-dd-adventure-league-logsheets/", true);
		break;
	 case "advanced tutorial" :
		app.launchURL("https://dndadventurersleague.org/advanced-logsheet-tutorial/", true);
		break;
	 case "reset" :
		thermoTxt = thermoM("Resetting this Adventure Logsheet...");
		calcStop();
		var resetLogs = [];
		for (var l = 0; l <= FieldNumbers.logs; l++) resetLogs.push(prefix + "AdvLog." + l)
		tDoc.resetForm(resetLogs);
		break;
	 case "reset all" :
		thermoTxt = thermoM("Resetting all Adventure Logsheets...");
		calcStop();
		var ALlogF = What("Template.extras.ALlog").split(",").splice(1);
		var resetLogs = [];
		for (var i = 0; i < ALlogF.length; i++) {
			for (var l = 0; l <= FieldNumbers.logs; l++) resetLogs.push(ALlogF[i] + "AdvLog." + l);
		};
		tDoc.resetForm(resetLogs);
		break;
	 case "dateformat" :
		UpdateALdateFormat(MenuSelection[1]);
		break;
	 case "generate" :
		addALlogEntry();
		break;
	 case "dndlogo" :
		DnDlogo(MenuSelection[2]);
		break;
	}
	if (thermoTxt) thermoM(thermoTxt, true); // Stop progress bar
};

//get the parent of the bookmark so we can know which template it is on
function getBookmarkTemplate(bookmark) {
	while (bookmark.name !== "Root") {
		if (BookMarkList[bookmark.name + "_template"]) {
			return [BookMarkList[bookmark.name + "_template"], bookmark.name];
		};
		bookmark = bookmark.parent;
	};
	return "";
}

//make menu for the button to (re)set the portrait/organization symbol
//after that, do something with the menu and its results
function MakeIconMenu_IconOptions() {
	var SymbPort = event.target.name;
	var DoAdvLog = SymbPort.indexOf("AdvLog") !== -1;
	var DisplayName = SymbPort.indexOf("Comp.") !== -1 ? "Companion's Icon" : (SymbPort.indexOf("HeaderIcon") !== -1 ? "Header Icon" : SymbPort);
	if (DoAdvLog) DisplayName = "Adventure Logsheet " + DisplayName;

	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			item.push({
				cName : array[i][0],
				cReturn : array[i][1]
			});
		}
	};
	var menuLVL2 = function (menu, name, array) {
		var temp = {};
		temp.cName = name[0];
		temp.oSubMenu = [];
		for (var i = 0; i < array.length; i++) {
			temp.oSubMenu.push({
				cName : array[i][0],
				cReturn : name[1] + "#" + array[i][1]
			})
		}
		menu.push(temp);
	};

	//make default menu items
	var restrictedViewer = app.viewerType === "Reader" && app.viewerVersion < 17;
	var IconMenu = [];
	var OptionMenu = [
		[(restrictedViewer ? "Set a pdf file as " : "Set any image/pdf file as ") + DisplayName, "set"],
		["Reset the " + DisplayName, "reset"],
		["Empty the " + DisplayName, "empty"]
	];
	menuLVL1(IconMenu, OptionMenu);

	//add options for faction icons, symbols, banners, if so desired
	//add options for class and AL season icons, if so desired
	if (SymbPort === "Symbol" || SymbPort.indexOf("HeaderIcon") !== -1) {
		//first the factions
		var faction = [
			["Emerald Enclave", "emeraldenclave"],
			["Harpers", "harpers"],
			["Lords' Alliance", "lordsalliance"],
			["Order of the Gauntlet", "ordergauntlet"],
			["Zhentarim", "zhentarim"]
		];
		var factionSymbols = [];
		var factionIcons = [];
		var factionBanners = [];
		for (var f = 0; f < faction.length; f++) {
			var aFact = faction[f];
			factionSymbols.push([aFact[0], aFact[1] + "#symbol"]);
			factionIcons.push([aFact[0], aFact[1] + "#icon"]);
			factionBanners.push([aFact[0], aFact[1] + "#banner"]);
		}
		IconMenu.push({cName : "-", cReturn : "-"}); // add a divider
		menuLVL2(IconMenu, ["Set faction symbol", "organizationicon"], factionSymbols);
		menuLVL2(IconMenu, ["Set faction banner", "organizationicon"], factionBanners);
		menuLVL2(IconMenu, ["Set faction icon", "organizationicon"], factionIcons);

		//second the class
		var classes = [
			["Artificer", "artificer"],
			["Barbarian", "barbarian"],
			["Bard", "bard"],
			["Cleric", "cleric"],
			["Druid", "druid"],
			["Fighter", "fighter"],
			["Monk", "monk"],
			["Paladin", "paladin"],
			["Ranger", "ranger"],
			["Rogue", "rogue"],
			["Sorcerer", "sorcerer"],
			["Warlock", "warlock"],
			["Wizard", "wizard"]
		];
		IconMenu.push({cName : "-", cReturn : "-"}); // add a divider
		menuLVL2(IconMenu, ["Set class icon", "classicon"], classes);

		//third the AL seasons
		var ALseasons = [
			["1 Tyranny of Dragons", "tod"],
			["2 Elemental Evil", "ee"],
			["3 Rage of Demons", "rod"],
			["4 Curse of Strahd", "cos"],
			["5 Storm King's Thunder", "skt"],
			["6 Tales from the Yawning Portal", "totyp"],
			["7 Tomb of Annihilation", "toa"],
			["8 Waterdeep Adventures", "wda"],
			["9 Descent into Avernus", "dia"],
			["10 Rime of the Frostmaiden", "rotf"]
		];
		IconMenu.push({cName : "-", cReturn : "-"}); // add a divider
		menuLVL2(IconMenu, ["Set Adventure League season icon", "seasonicon"], ALseasons);
	}

	//add a link to an online pdf converter, if not using Acrobat Pro/Standard
	if (restrictedViewer) {
		var Conversions = [
			["-", "-"],
			["Visit an online image-to-pdf converter", "convertor"]
		];
		menuLVL1(IconMenu, Conversions);
	}

	Menus.icon = IconMenu;

	//now call the menu
	var MenuSelection = getMenu("icon");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	switch (MenuSelection[0]) {
	 case "set" :
		tDoc.getField(SymbPort).buttonImportIcon();
		break;
	 case "reset" :
		ClearIcons(SymbPort, true);
		break;
	 case "empty" :
		ClearIcons(SymbPort);
		break;
	 case "organizationicon" :
		var oIcon = tDoc.getField("SaveIMG.Faction." + MenuSelection[1] + "." + MenuSelection[2]).buttonGetIcon();
		tDoc.getField(SymbPort).buttonSetIcon(oIcon);
		break;
	 case "classicon" :
		var oIcon = tDoc.getField("SaveIMG.ClassIcon." + MenuSelection[1]).buttonGetIcon();
		tDoc.getField(SymbPort).buttonSetIcon(oIcon);
		break;
	 case "seasonicon" :
		var oIcon = tDoc.getField("SaveIMG.ALicon." + MenuSelection[1]).buttonGetIcon();
		tDoc.getField(SymbPort).buttonSetIcon(oIcon);
		DoAdvLog = true;
		break;
	 case "convertor" :
		app.launchURL("http://imagetopdf.com/", true);
		break;
	};
	if (MenuSelection[0] !== "convertor" && MenuSelection[0] !== "reset") {
		Show(SymbPort);
	}
	//now loop through all the adventure logsheet pages, if this was to set the adv.logs
	if (typePF && DoAdvLog && MenuSelection[0] !== "convertor") {
		var ALlogA = What("Template.extras.ALlog").split(",");
		var aIcon = event.target.buttonGetIcon();
		for (var tA = 0; tA < ALlogA.length; tA++) {
			var fldNm = ALlogA[tA] + "AdvLog.HeaderIcon";
			if (fldNm !== event.target.name) {
				tDoc.getField(fldNm).buttonSetIcon(aIcon);
				tDoc.getField(fldNm).display = event.target.display;
			}
		}
	}
};

//return the value of the field that this adventurers log header field refers to
function CalcAdvLogInfo() {
	if (tDoc.info.SpellsOnly) return;
	var theField = event.target.name.replace(/.*?AdvLog\./, tDoc.info.AdvLogOnly ? "AdvLog." : "");
	event.value = What(theField);
}

//see if the value of the field has been changed and differs from the original. If so, push the value to the original
function ValidateAdvLogInfo() {
	if (tDoc.info.SpellsOnly || (SetFactionSymbolIgnore && event.target.name.indexOf("Background_Faction.Text") !== -1)) return;
	var prefix = getTemplPre(event.target.name, "ALlog", true);
	if (tDoc.info.AdvLogOnly && !prefix) {
		return;
	} else {
		var theField = event.target.name.replace(/.*?AdvLog\./, tDoc.info.AdvLogOnly ? "AdvLog." : "");
		var theValue = What(theField);
		if (event.value !== "" && event.value !== theValue) Value(theField, event.value);
	}
}

//set the calculation order of the AdvLog page so that it comes after the previous one
function SetAdvLogCalcOrder(prefix) {
	var whatCalcOrder = function (field) {
		return tDoc.getField(field).calcOrderIndex;
	}
	var resetCalcOrder = function (field, input) {
		tDoc.getField(field).calcOrderIndex = input;
	}
	if (prefix) {
		var prePrefix = CalcLogsheetPrevious(prefix);
		resetCalcOrder(prefix + "AdvLog.Class and Levels", whatCalcOrder(prePrefix + "AdvLog.Class and Levels") + 1);
		var theLastCalc = whatCalcOrder(prePrefix + "AdvLog." + FieldNumbers.logs + ".magicItems.total");
	} else {
		var theLastCalc = whatCalcOrder("AdvLog.sheetNumber");
	}

	var theTypesA = [
		".xp",
		".gold",
		".downtime",
		".renown",
		".magicItems"
	];


	for (var i = 1; i <= FieldNumbers.logs; i++) {
		for (var A = 0; A < theTypesA.length; A++) {
			var toSet = prefix + "AdvLog." + i + theTypesA[A];
			//add one to the calculation order to put it at
			theLastCalc += 1;
			resetCalcOrder(toSet + ".start", theLastCalc);
			//add one to the calculation order to put it at
			theLastCalc += 1;
			resetCalcOrder(toSet + ".total", theLastCalc);
		}
	}
}

//get all stringified variable and put them into their document level variable
function GetStringifieds(notSources) {
	var forSpells = What("CurrentSpells.Stringified").split("##########");
	if (forSpells[0][0] !== "(") forSpells[0] = "(" + forSpells[0] + ")";
	if (forSpells[1][0] !== "(") forSpells[1] = "(" + forSpells[1] + ")";
	CurrentSpells = eval(forSpells[0]);
	CurrentCasters = eval(forSpells[1]);
	if (!notSources) {
		CurrentSources = eval(What("CurrentSources.Stringified"));
		CurrentScriptFiles = eval(What("User_Imported_Files.Stringified"));
	};
	CurrentEvals = eval(What("CurrentEvals.Stringified"));
	CurrentProfs = eval(What("CurrentProfs.Stringified"));
	CurrentVars = eval(What("CurrentVars.Stringified"));
	CurrentFeatureChoices = eval(What("CurrentFeatureChoices.Stringified"));
	CurrentStats = eval(What("CurrentStats.Stringified"));
}

//set all stringified variables into their fields
function SetStringifieds(type) {
	if (!type || type === "spells") {
		var cSpells = CurrentSpells.toSource();
		var cCasters = CurrentCasters.toSource();
		Value("CurrentSpells.Stringified", cSpells + "##########" + cCasters);

		//any time the CurrentSpells variable is changed, we need to update the CurrentWeapons variable as well
		FindWeapons();
	};
	if (!type || type === "sources") Value("CurrentSources.Stringified", CurrentSources.toSource());
	if (!type || type === "evals") Value("CurrentEvals.Stringified", CurrentEvals.toSource());
	if (!type || type === "profs") Value("CurrentProfs.Stringified", CurrentProfs.toSource());
	if (!type || type === "vars") Value("CurrentVars.Stringified", CurrentVars.toSource());
	if (!type || type === "choices") Value("CurrentFeatureChoices.Stringified", CurrentFeatureChoices.toSource());
	if (!type || type === "stats") Value("CurrentStats.Stringified", CurrentStats.toSource());
	if (type === "scriptfiles") Value("User_Imported_Files.Stringified", CurrentScriptFiles.toSource());
};

// Recursive function to create bookmarks from a bookmark object
function createBookmarks(parent, bObj) {
	var i = 0;
	for (var bkmrkNm in bObj) {
		var bkmrk = bObj[bkmrkNm];
		parent.createChild({
			cName : bkmrk.cName ? bkmrk.cName : bkmrkNm,
			cExpr : bkmrk.cExpr,
			nIndex : i
		});
		parent.children[i].style = 2;
		if (bkmrk.color) parent.children[i].color = bkmrk.color;
		if (bkmrk.children) createBookmarks(parent.children[i], bkmrk.children);
		i++;
	}
}

// Update the bookmark with the current version number
function updateVersionBkmrk() {
	var bkmrk = tDoc.bookmarkRoot.children;
	for (var i = 0; i < bkmrk.length; i++) {
		if (/latest version/i.test(bkmrk[i].name)) {
			bkmrk[i].name = "Get Latest Version (current: v" + semVers + ")";
			return;
		}
	}
}

//set the sheet version
function Publish(version, preRelease, build, forPatreon) {
	if (app.viewerType !== "Reader") {
		tDoc.info.SheetVersion = version;
		tDoc.info.SheetVersionType = preRelease;
		tDoc.info.SheetVersionBuild = build;
	}
	semVers = getSemVers(version, preRelease, build);
	sheetVersion = semVersToNmbr(semVers);
	var docNm = MakeDocName();
	var resetFlds = ["Opening Remember"];
	if (!forPatreon) resetFlds = resetFlds.concat(["CurrentSources.Stringified", "User_Imported_Files.Stringified"]);
	var defaultTempl = ["", "AScomp", "ASnotes"];
	for (var i = 0; i < defaultTempl.length; i++) {
		var prefix = defaultTempl[i] ? What("Template.extras." + defaultTempl[i]).split(",")[1] : "";
		tDoc.getField(prefix + "SheetInformation").defaultValue = docNm;
		resetFlds.push(prefix + "SheetInformation");
	}
	if (app.viewerType !== "Reader") tDoc.info.Title = docNm;
	tDoc.resetForm(resetFlds);
	tDoc.getField("Opening Remember").submitName = 1;
	tDoc.getField("SaveIMG.Patreon").submitName = forPatreon ? "" : "(new Date(0))";
	if (!minVer) DontPrint("d20warning");
	DnDlogo();
	updateVersionBkmrk();
	tDoc.calculateNow();
};

//show Honor or Sanity score, based on the field value
function ShowHonorSanity(input) {
	calcStop();
	if (input !== undefined) Value("HoSRememberState", input);
	var toShow = What("HoSRememberState");
	toShow = toShow === "Sanity" || toShow === "Honor" ? toShow : "";
	var ShowHide = toShow ? "Show" : "Hide";
	var HideShow = toShow ? "Hide" : "Show";
	if (typePF) {
		var fieldsArray = [
			"Text.HoS.Ability",
			"Text.HoS.Save",
			"Image.HoS",
			"Vision.1",
			"Passive Perception.1",
			"HoS",
			"HoS Mod",
			"HoS ST Mod",
			"HoS ST Prof"
		];
		var fieldsArrayHide = [
			"Vision.0",
			"Passive Perception.0"
		];
		Value("Text.HoS.Ability", toShow.toUpperCase());
		Value("Text.HoS.Save", toShow.toUpperCase());

		if (ShowHide === "Show") {
			Show("Image." + What("BoxesLinesRemember") + ".HoS")
		} else {
			Hide("Image.calc_lines.HoS");
			Hide("Image.calc_boxes.HoS");
		}
	} else {
		var fieldsArray = [
			"Text.HoS",
			"Image.Stats.6",
			"Saving Throw advantages / disadvantages.1",
			"Text.Header.Saving Throw advantages / disadvantages",
			"HoS",
			"HoS Mod",
			"HoS ST Mod",
			"HoS ST Adv",
			"HoS ST Dis",
			"HoS ST Prof"
		];
		var fieldsArrayHide = [
			"Saving Throw advantages / disadvantages.0"
		];
		if (toShow) {
			var theIcon = tDoc.getField("SaveIMG." + toShow).buttonGetIcon();
			tDoc.getField(fieldsArray[0]).buttonSetIcon(theIcon);
		}
	}

	for (var i = 0; i < fieldsArray.length; i++) {
		tDoc[ShowHide](fieldsArray[i]);
	}

	for (var i = 0; i < fieldsArrayHide.length; i++) {
		tDoc[HideShow](fieldsArrayHide[i]);
	}

	if (ShowHide === "Show" && CurrentVars.bluetxt) {
		DontPrint("HoS ST Bonus");
	} else {
		Hide("HoS ST Bonus");
	}
};

//set the lifestyle
function setLifeStyle(input) {
	var isSelection = Lifestyles.names.indexOf(input);
	if (isSelection == -1) isSelection = Lifestyles.types.indexOf(clean(input.toLowerCase()));
	if (isSelection !== -1) Value("Lifestyle daily cost", Lifestyles.expenses[isSelection]);
}

// Give the total HP (average, fixed, max) for the main character (prefix == "") or a companion page
function calcHPtotals(prefix) {
	var conFld = prefix ? prefix + "Comp.Use.Ability.Con.Score" : "Con";
	var HD = {
		conMod : What(conFld) ? Math.round((Math.floor(What(conFld)) - 10.5) * 0.5) : 0,
		conCorrection : false,
		count : 0,
		dieStr : [],
		average : 0,
		fixed : 0,
		max : 0,
		alt : [],
		altStr : []
	}
	// loop through all the HD fields
	for (var i = 0; i < (prefix ? 1 : 3); i++) {
		var lvl = Math.max(Math.floor(What(prefix ? prefix + "Comp.Use.HD.Level" : "HD" + (i+1) + " Level")), 1);
		var hd = Math.floor(What(prefix ? prefix + "Comp.Use.HD.Die" : "HD" + (i+1) + " Die"));
		if (!hd) continue; // no HD given, so skip it
		HD.count += lvl;
		HD.max += (hd + HD.conMod) * lvl;
		// See if this HP is for the first level and thus always maximized
		if (!prefix && ((i == 0 && classes.hp == 0) || classes.hp === hd)) {
			lvl -= 1;
			var lvl1HP = Math.max(1, hd + HD.conMod);
			HD.average += lvl1HP;
			HD.fixed += lvl1HP;
			HD.dieStr.unshift(hd + " (1st level)");
		}
		var avgHD = (hd + 1) / 2;
		var thisAvg = avgHD * lvl;
		HD.dieStr.push(lvl + "d" + hd + " (" + thisAvg + ")");
		if ((avgHD + HD.conMod) < 1) {
			// The Con Mod is too low to add it normally
			// A minimum of 1 HP gained per [HD + Con] (PHB 15)
			HD.conCorrection = true;
			HD.average += lvl;
			HD.fixed += lvl;
			if (hd + HD.conMod < 1) HD.max -= (hd + HD.conMod) * lvl - lvl;
		} else {
			var conHP = HD.conMod * lvl;
			HD.average += thisAvg + conHP;
			HD.fixed += Math.ceil(avgHD) * lvl + conHP;
		}
	}
	return HD;
}

// Update the tooltip for the Max HP field and set the Max HP if that is set to be auto-calculated
function SetHPTooltip(resetHP, onlyComp, aPrefix) {
	var tempExtras = onlyComp && aPrefix ? ["", aPrefix] : onlyComp === false ? [""] : What("Template.extras.AScomp").split(",");
	for (var tE = 0; tE < tempExtras.length; tE++) {
		// Test if we should do this page or not
		if (tE === 0 && onlyComp === true) continue;
		// Set some general variables
		var prefix = tempExtras[tE]; // if !prefix, it is the main character
		var HPmaxFld = prefix ? prefix + "Comp.Use.HP.Max" : "HP Max";
		var HDflds = prefix ? [prefix + "Comp.Use.HD.Die"] : ["HD1 Die", "HD2 Die", "HD3 Die"];
		var extrastring = "";
		var extrahp = 0, setHP;
		// Get the calculated HP
		var HD = calcHPtotals(prefix);
		// And for backwards compatibility
		var totalhd = HD.count;
		// If there are custom HP changes, do them now
		var hpEvalObj = !prefix && CurrentEvals.hp ? CurrentEvals.hp :
			(prefix && CurrentEvals.Comp && CurrentEvals.Comp[prefix] && CurrentEvals.Comp[prefix].hp ? CurrentEvals.Comp[prefix].hp : false);
		// Skip this one if there is no hp calculation and we are not doing companion pages
		if (!hpEvalObj && prefix && onlyComp === false) continue;
		if (hpEvalObj) {
			for (var hpEval in hpEvalObj) {
				var evalThing = hpEvalObj[hpEval];
				var altLen = HD.alt.length;
				try {
					if (typeof evalThing == 'string') {
						eval(evalThing);
					} else if (typeof evalThing == 'function') {
						var addHP = evalThing(HD.count, HD, prefix);
						if (!isArray(addHP)) addHP = [addHP];
						if ((addHP[0] || addHP[0] === 0) && !isNaN(addHP[0])) {
							if (!addHP[1]) addHP[1] = hpEval;
							extrahp += addHP[0];
							extrastring += addHP[2] ? addHP[1] : '\n ' + (addHP[0] > -1 ? "+ " : "") + addHP[0] + ' from ' + addHP[1];
						}
						// if something was added to the alt array
						if (altLen < HD.alt.length) {
							var curEntry = HD.altStr[HD.alt.length - 1];
							HD.altStr[HD.alt.length - 1] = "\n" + toUni("[" + HD.alt.length + "] " + hpEval) + "\n" + HD.alt[HD.alt.length - 1] + " total hit points" + (curEntry ? "\n" + curEntry : "");
						}
					}
				} catch (error) {
					var eText = "The custom hit point calculation addition '" + hpEval + "' produced an error! It will be ignored for now, but you will get this warning every time you open the sheet again. Please contact the author of the feature to have this issue corrected:\n " + error;
					for (var e in error) eText += "\n " + e + ": " + error[e];
					console.println(eText);
					console.show();
					if (prefix) {
						delete CurrentEvals.Comp[prefix].hp[hpEval];
					} else {
						delete CurrentEvals.hp[hpEval];
					}
				}
			}
		}
		// Create the tooltip string
		var tooltip = "The total hit points (with averages" + (prefix ? ")" : " and max for 1st level)") +
			"\n = " + (HD.count ? HD.dieStr.join(" + ") : "level \xD7 hit dice (0)") +
			"\n + " + (HD.count ? HD.count : "level") + " \xD7 " + HD.conMod + " from Constitution (" + (HD.count * HD.conMod) + ")" +
			extrastring + "\n" +
			"\n \u2022 " + toUni(HD.average + extrahp) + " is the total average HP" +
			"\n \u2022 " + toUni(HD.fixed + extrahp) + " is the total HP when using fixed values" +
			"\n \u2022 " + toUni(HD.max + extrahp) + " is the total maximum HP" +
			(HD.conCorrection ? "\n\nNote that the Constitution modifier can't bring the HP gained from a single HD below 1 before adding other bonuses. Thus, the totals may seem off from the calculation above them. See PHB, page 15." : "");
		if (HD.altStr.length) {
			tooltip += "\n\n>> ALTERNATIVE TOTAL HP CALCULATIONS <<" + HD.altStr.join("\n\n");
		}
		// Now see if the menu setting tells us that we need to change the max HP
		extrahp = isNaN(extrahp) ? 0 : Number(extrahp);
		var isCreature = prefix && CurrentCompRace[prefix] && CurrentCompRace[prefix].typeFound !== "race";
		var theSetting = How(HPmaxFld).split(",").slice(0,4);
		theSetting[0] = Math[isCreature ? "floor" : "round"](HD.average + extrahp);
		theSetting[1] = HD.fixed + extrahp;
		theSetting[2] = HD.max + extrahp;
		if (resetHP) theSetting[3] = "nothing";
		if (HD.alt.length) theSetting = theSetting.concat(HD.alt);
		switch (theSetting[3].replace(/:.*/, '')) {
			case "average" :
				setHP = theSetting[0];
				break;
			case "fixed" :
				setHP = theSetting[1];
				break;
			case "max" :
				setHP = theSetting[2];
				break;
			case "alt" :
				var altNo = Number(theSetting[3].replace(/alt:(.*)/, '$1'));
				setHP = theSetting[altNo] !== undefined ? theSetting[altNo] : What(HPmaxFld);
				break;
			case "nothing" :
			default :
				setHP = What(HPmaxFld);
		}
		// Now set the max HP value, tooltip, and a way to remember the settings
		Value(HPmaxFld, setHP, tooltip, theSetting.join());
		// Lastly, re-apply the HD field so that changes to their display are visible
		for (var h = 0; h < HDflds.length; h++) Value(HDflds[h], What(HDflds[h]));
	}
};

function MakeHPMenu_HPOptions(preSelect, prefix) {
	//define some variables
	prefix = prefix === true ? getTemplPre(event.target.name, "AScomp", true) : prefix ? prefix : "";
	var theFld = prefix ? prefix + "Comp.Use.HP.Max" : "HP Max";
	var theInputs = How(theFld).split(",");
	if (!preSelect || preSelect == "justMenu") {
		var optionsArray = [
			["The total average HP", theInputs[0], "average"],
			["The total HP using fixed values", theInputs[1], "fixed"],
			["The total maximum HP", theInputs[2], "max"]
		];
		if (theInputs[4]) {
			optionsArray.push(["-", "", "-"]);
			optionsArray.push(["[see tooltip for alternatives]", "", "-"]);
			for (var i = 4; i < theInputs.length; i++) {
				optionsArray.push(["Alternative [" + (i-3) + "] HP calculation", theInputs[i], "alt:"+i]);
			}
		}
		var hpMenu = [{
			cName : "Display HP calculations tooltip in a dialog",
			cReturn : "hp#popup"
		}];

		var menuLVL2 = function (menu, name, array, noMarked) {
			var temp = {};
			temp.cName = name[0];
			temp.oSubMenu = [];
			for (var i = 0; i < array.length; i++) {
				var isMarked = array[i][2] === theInputs[3];
				temp.oSubMenu.push({
					cName : array[i][0] + (array[i][1] !== "" ? " (" + array[i][1] + ")" : ""),
					cReturn : "hp#" + name[1] + "#" + array[i][1] + "#" + array[i][2] + "#" + (isMarked ? "marked" : ""),
					bMarked : noMarked ? false : isMarked,
					bEnabled : array[i][2] !== "-"
				})
			}
			menu.push(temp);
		};

		menuLVL2(hpMenu, ["Change the Max HP to", "change"], optionsArray, true);
		optionsArray.push(["-", "", "-"]);
		optionsArray.push(["Don't change the maximum HP automatically", "", "nothing"]);
		menuLVL2(hpMenu, ["Set the Max HP to automatically assume", "auto"], optionsArray);

		//parse it into a global variable
		Menus.hp = hpMenu;
		if (preSelect == "justMenu") return;
	};

	//now call the menu
	var MenuSelection = preSelect ? preSelect : getMenu("hp");
	if (!MenuSelection || MenuSelection[0] === "nothing" || MenuSelection[4] === "marked") return;

	if (MenuSelection[1] === "popup") {
		var aName = What(prefix ? prefix + "Comp.Desc.Name" : "PC Name");
		if (!aName) aName = !prefix ? "Main character" : What(prefix + "Comp.Race") ? What(prefix + "Comp.Race") : "Companion on page " + tDoc.getField(prefix + "Comp.Race").page;
		ShowDialog(aName + " HP calculation", Who(theFld));
	} else {
		theInputs[3] = MenuSelection[1] === "auto" ? MenuSelection[3] : "nothing";
		if (MenuSelection[2]) {
			Value(theFld, MenuSelection[2], undefined, theInputs.join());
		} else {
			AddTooltip(theFld, undefined, theInputs.join());
		}
	}
};

// update the max HP value if set to do so whenever any field changes (triggered by field calculation)
function calcHP(prefix) {
	prefix = prefix === true ? getTemplPre(event.target.name, "AScomp", true) : prefix ? prefix : "";
	var theFld = prefix ? prefix + "Comp.Use.HP.Max" : "HP Max";
	var theInputs = How(theFld).split(",");
	// Test if automatic update is enabled
	if ((theInputs[3] !== "nothing") && (
		(prefix && CurrentEvals.Comp && CurrentEvals.Comp[prefix] && CurrentEvals.Comp[prefix].hpForceRecalc) ||
		(!prefix && CurrentEvals.hpForceRecalc) )
	) {
		SetHPTooltip(false, !!prefix, prefix);
	}
}

// add the action "Attack (X attacks per action)" to the top of the "actions" fields, if there is room to do so
function AddAttacksPerAction() {
	if (typePF) {
		var theString = ["Attack (", " attacks per action)"];
		var regExStr = /\d+.{0,3}attacks/i;
		if (Number(classes.attacks) < 2) {
			RemoveAction("action", regExStr, "Extra attack class feature");
		} else {
			// first see if it isn't anywhere already
			var actFld = false;
			for (var i = 1; i <= FieldNumbers.trueactions; i++) {
				var actVal = What("Action " + i);
				if ((regExStr).test(actVal)) {
					actFld = actVal.indexOf(classes.attacks) === -1 ? "Action " + i : false;
					break;
				} else if (actVal === "") {
					actFld = true;
				};
			};
			//then if a matching field is found, put it there, or otherwise put it at the top
			if (actFld !== false && actFld !== true) {
				Value(actFld, theString[0] + classes.attacks + theString[1]);
			} else if (actFld) {
				if (What("Action 1") !== "") ActionInsert("action", 1);
				AddAction("action", theString[0] + classes.attacks + theString[1], "Extra attack class feature");
			}
		}
	} else {
		Value("Attacks per Action", classes.attacks);
	}
}

// set the symbol of a faction (keystroke)
var SetFactionSymbolIgnore = false;
function SetFactionSymbol(theFld, newValue, commitIt) {
	if (minVer) return;
	if (!SetFactionSymbolIgnore) {
		theFld = theFld ? tDoc.getField(theFld) : event.target;
		SetFactionSymbolIgnore = true;
		if (newValue !== undefined || (event.changeEx && event.changeEx !== event.target.value)) {
			if (newValue === undefined) newValue = event.changeEx;
			var theSymbolFld = tDoc.getField("SaveIMG.Faction." + newValue + ".symbol");
			if (theSymbolFld) {
				var theIcon = theSymbolFld.buttonGetIcon();
				tDoc.getField("Symbol").buttonSetIcon(theIcon);
				Show("Symbol");
			}
			if (factions[newValue]) tDoc.getField("Background_FactionRank.Text").setItems([""].concat(factions[newValue].ranks));
			theFld.temp = newValue;
		} else if (newValue === "" || (event && event.value !== undefined && event.value === "")) {
			Clear("Background_FactionRank.Text");
		}
		// when committing, set all the faction symbol fields to match this one
		if (commitIt || event.willCommit) {
			var logTemps = What("Template.extras.ALlog").split(",");
			for (var T = 0; T <= logTemps.length; T++) {
				var BckgrFld = T === logTemps.length ? "Background_Faction.Text" : logTemps[T] + "AdvLogS.Background_Faction.Text";
				if (theFld.name !== BckgrFld) Value(BckgrFld, theFld.temp ? theFld.temp : (newValue !== undefined ? newValue : event.value));
			}
		}
		SetFactionSymbolIgnore = false;
	}
}

//update the other faction symbol fields (only on AdvLogOnly) (field blur)
function UpdateFactionSymbols() {
	var prefix = getTemplPre(event.target.name, "ALlog", true);
	var ALlogA = What("Template.extras.ALlog").split(",");
	for (var Al = 0; Al < ALlogA.length; Al++) {
		if (ALlogA[Al] === prefix) continue;
		tDoc.getField(ALlogA[Al] + "AdvLogS.Background_Faction.Text").value = event.value;
	}
}

//make a menu for the text fields and text line options
//after that, do something with the menu and its results
function MakeTextMenu_TextOptions(input) {
	var isBoxesLines = What("BoxesLinesRemember");

	if (!input || input === "justMenu") {
		Menus.texts = [{
				cName : "Change the font size and/or font",
				cReturn : "text#dodialog"
			}, {
				cName : "-",
				cReturn : "-"
			}
		];

		if (typePF) {
			Menus.texts.push({
				cName : "Single-line fields",
				oSubMenu : [{
					cName : "Show boxes for single-line fields",
					cReturn : "text#calc_boxes",
					bMarked : isBoxesLines === "calc_boxes"
				}, {
					cName : "Show lines for single-line fields",
					cReturn : "text#calc_lines",
					bMarked : isBoxesLines === "calc_lines"
				}]
			});
			Menus.texts.push({cName : "-", cReturn : "-"});
		};

		Menus.texts.push({
			cName : "Multi-line fields",
			oSubMenu : [{
				cName : "Show lines for multi-line fields",
				cReturn : "text#show lines",
				bMarked : !CurrentVars.whiteout
			}, {
				cName : "Hide lines for multi-line fields",
				cReturn : "text#hide lines",
				bMarked : CurrentVars.whiteout
			}]
		});
		if (input !== "justMenu") {
			makeUnicodeMenu();
			Menus.texts.push({cName : "-", cReturn : "-"}); // add a divider
			Menus.texts.push(Menus.unicode);
		}
		if (input === "justMenu") return;
	};

	//now call the menu
	var MenuSelection = input ? input : getMenu("texts");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	if (MenuSelection !== undefined && MenuSelection[0] !== "nothing") {
		switch (MenuSelection[1]) {
		 case "dodialog" :
			SetTextOptions_Button();
			break;
		 case "calc_boxes" :
		 case "calc_lines" :
			ShowCalcBoxesLines(MenuSelection[1]);
			break;
		 case "show lines" :
			ToggleWhiteout(false);
			break;
		 case "hide lines" :
			ToggleWhiteout(true);
			break;
		 case "unicode" :
			setUnicodeUse(MenuSelection[2]);
			break;
		};
	};
};

//make the calculation lines or boxes visible
function ShowCalcBoxesLines(input) {
	input = input ? input.toLowerCase() : "calc_boxes";
	if (!typePF || (input !== "calc_boxes" && input !== "calc_lines")) return;

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the single-line fields to have " + (input === "calc_boxes" ? "boxes" : "lines") + "...");
	calcStop();

	Value("BoxesLinesRemember", input);
	var ShowBHideL = input === "calc_boxes" ? "Show" : "Hide";
	var HideBShowL = input === "calc_boxes" ? "Hide" : "Show";
	tDoc[ShowBHideL]("Image.calc_boxes");
	tDoc[HideBShowL]("Image.calc_lines");

	//now get all the template prefixes
	var prefixA = What("Template.extras.AScomp").split(",");
	prefixA = prefixA.concat(What("Template.extras.WSfront").split(","));
	prefixA = prefixA.concat(What("Template.extras.ALlog").split(","));

	for (var i = 0; i < prefixA.length; i++) {
		var prefix = prefixA[i];
		if (prefix !== "") {
			tDoc[ShowBHideL](prefix + "Image.calc_boxes");
			tDoc[HideBShowL](prefix + "Image.calc_lines");
		}
	}

	if (!minVer && What("HoSRememberState") !== "Honor" && What("HoSRememberState") !== "Honor") {
		Hide("Image.calc_lines.HoS");
		Hide("Image.calc_boxes.HoS");
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

//chane the format of all the date fields of the AL log pages
function UpdateALdateFormat(dateForm) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the date format...");
	calcStop();

	dateForm = dateForm ? dateForm : What("DateFormat_Remember");
	Value("DateFormat_Remember", dateForm);
	var ALlogA = What("Template.extras.ALlog").split(",").splice(1);
	for (var tA = 0; tA < ALlogA.length; tA++) {
		var prefix = ALlogA[tA];
		for (var i = 1; i < FieldNumbers.logs; i++) {
			var dateFld = prefix + "AdvLog." + i + ".date";
			Value(dateFld, What(dateFld));
		};
	};
	thermoM(thermoTxt, true); // Stop progress bar
};

//return the value of the field that this notes field (field calculation)
function CalcCompNotes() {
	var prefix = getTemplPre(event.target.name, "AScomp", true);
	var notesFld = prefix + (typePF ? "Cnote.Left" : "Cnote.Right");
	event.value = What(notesFld);
}

// add the content to all the other fields that should share the content (field validation)
function ValidateCompNotes() {
	var prefix = getTemplPre(event.target.name, "AScomp", true);
	var notesFld = prefix + (typePF ? "Cnote.Left" : "Cnote.Right");
	var theValue = What(notesFld);
	if (event.value !== theValue) {
		Value(notesFld, event.value);
	}
}

// show the selected layers on the companion page
function ShowCompanionLayer(prefix) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Changing the visible sections on the companion page...");
	calcStop();

	MakeMobileReady(false); // Undo flatten, if needed

	prefix = prefix ? prefix : "";
	var notesFld = prefix + (typePF ? "Cnote.Left" : "Cnote.Right");
	var toShow = eval_ish(What(prefix + "Companion.Layers.Remember")); //an array with two true/false values, the first is for the image section, second is for the equipment section
	var changeNotes = typePF ? toShow[1] : toShow[0] || toShow[1];

	if (changeNotes) {
		Hide(notesFld);
	} else {
		Show(notesFld);
	}
	if (toShow[0]) {
		Show(prefix + "Comp.img");
		if (toShow[1] && !typePF) {
			Hide(prefix + "Comp.img.Notes");
		} else if (typePF) {
			Hide(prefix + "Cnote.Right");
		}
	} else {
		Hide(prefix + "Comp.img");
		if (typePF) Show(prefix + "Cnote.Right");
	}
	if (toShow[1]) {
		Show(prefix + "Comp.eqp");
		DontPrint(prefix + "Comp.eqpB");
		if (toShow[0] && !typePF) Hide(prefix + "Comp.eqp.Notes");
	} else {
		Hide(prefix + "Comp.eqp.");
		Hide(prefix + "Comp.eqpB");
	}
	thermoM(thermoTxt, true); // Stop progress bar
}

//(re)set the dropdowns
function UpdateDropdown(type, weapon) {
	if (minVer || !IsNotUserScript) return;
	IsSetDropDowns = true;
	type = type ? type.toLowerCase() : "all";
	var notAll, forceTT = false;
	calcStop();
	switch (type) {
	 case "tooltips" :
		forceTT = true;
	 case "resources" :
		notAll = true;
	 case "all" :
		SetRacesdropdown(forceTT);
		SetBackgrounddropdown(forceTT);
		SetBackgroundFeaturesdropdown(forceTT);
		SetFeatsdropdown(forceTT);
		SetMagicItemsDropdown(forceTT);
		SetCompDropdown(forceTT);
		SetWildshapeDropdown(forceTT);
		SetArmordropdown(forceTT);
		SetAmmosdropdown(forceTT);
		if (notAll) {
			SetWeaponsdropdown(forceTT);
			break;
		}
	 case "attack" :
	 case "attacks" :
	 case "weapon" :
	 case "weapons" :
		if (weapon) {
			if (!isArray(weapon)) weapon = [weapon]; //make this into an array
			weapon.forEach( function (wea) {
				var weaKey = WeaponsList[wea];
				if (!weaKey || weaKey.list) return;
				weaKey.list = "extra";
			});
		};
		SetWeaponsdropdown();
		break;
	 case "armour" :
	 case "armours" :
	 case "armor" :
	 case "armors" :
		SetArmordropdown();
		break;
	 case "race" :
	 case "races" :
		SetRacesdropdown();
		SetCompDropdown();
		break;
	 case "background" :
	 case "backgrounds" :
		SetBackgrounddropdown();
		break;
	 case "backgroundfeature" :
	 case "backgroundfeatures" :
		SetBackgroundFeaturesdropdown();
		break;
	 case "feat" :
	 case "feats" :
		SetFeatsdropdown();
		break;
	 case "item" :
	 case "items" :
	 case "magic" :
	 case "magic item" :
	 case "magic items" :
		SetMagicItemsDropdown();
		break;
	 case "ammo" :
	 case "ammunition" :
	 case "ammunitions" :
		SetAmmosdropdown();
		break;
	case "creature" :
	case "creatures" :
	case "wildshape" :
	case "wildshapes" :
	case "companiononly" :
		SetCompDropdown();
		if (type !== "companiononly") SetWildshapeDropdown();
		break;
	};
	IsSetDropDowns = false;
};

function ChangeToCompleteAdvLogSheet(FAQpath) {
	if (minVer) return;
	ResetAll(true, true, true); // also removes all custom scripts
	tDoc.getField("AdvLog.Class and Levels").setAction("Calculate", "CalcAdvLogInfo();");
	tDoc.getField("AdvLog.Class and Levels").setAction("Validate", "ValidateAdvLogInfo();");
	tDoc.getField("AdvLog.Class and Levels").readonly = false;

	tDoc.getField("AdvLogS.Background_Faction.Text").setAction("OnBlur", "UpdateFactionSymbols();");
	tDoc.getField("AdvLogS.Background_Faction.Text").setAction("Keystroke", "");

	tDoc.getTemplate("ALlog").spawn(0, true, false);
	tDoc.deletePages({nStart: 1, nEnd: tDoc.numPages - 1});
	tDoc.getTemplate("ALlog").hidden = false;
	tDoc.getTemplate("remember").hidden = false;
	tDoc.getTemplate("blank").hidden = false;
	Value("Template.extras.ALlog", ",P0.ALlog.");

	//remove the saveIMG fields that are now useless
	tDoc.removeField("SaveIMG.SpellSlots");
	tDoc.removeField("SaveIMG.Spells");

	if (typePF) { //if the Printer Friendly version, update the copyright
		var newCR = "Made by Joost Wijnen (mpmb@flapkan.com); Design inspired by Wizards of the Coast " + (tDoc.info.SheetType === "Printer Friendly" ? "adventure logsheet" : "character sheet");
		tDoc.getField("CopyrightInformation").defaultValue = newCR;
		tDoc.getField("P0.ALlog.CopyrightInformation").defaultValue = newCR;
		tDoc.resetForm(["CopyrightInformation", "P0.ALlog.CopyrightInformation"]);
	} else { //if the Colorful version, remove some more useless fields
		tDoc.removeField("SaveIMG.Title");
		tDoc.removeField("SaveIMG.Level");
		tDoc.removeField("SaveIMG.Attack");
		tDoc.removeField("SaveIMG.Prof");
		tDoc.removeField("SaveIMG.Stats");
		tDoc.removeField("SaveIMG.Header.Right");
		tDoc.removeField("SaveIMG.DividerFlip");
		tDoc.removeField("SaveIMG.Arrow");
		tDoc.removeField("SaveIMG.IntArrow");
		tDoc.removeField("SaveIMG.HPdragonhead");
		tDoc.removeField("SaveIMG.SaveDC");
		tDoc.removeField("SaveIMG.DnDLogo");
		tDoc.removeField("SaveIMG.Honor");
		tDoc.removeField("SaveIMG.Sanity");
	};

	var keyPF = "This Adventure Logsheet is an extraction from MPMB's Character Record Sheet [Printer Friendly]. It follows the design and uses elements of the official D&D 5e adventure logsheet by Wizards of the Coast, but has been heavily modified by Joost Wijnen [morepurplemorebetter] (mpmb@flapkan.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'.";

	var keyPFR = "This Adventure Logsheet is an extraction from MPMB's Character Record Sheet [Printer Friendly - Redesign]. It follows the design idea of the official D&D 5e character sheet by Wizards of the Coast, but has been created from the ground up by Joost Wijnen [morepurplemorebetter] (mpmb@flapkan.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'.";

	var keyCF = "This Adventure Logsheet is an extraction from MPMB's Character Record Sheet [" + tDoc.info.SheetType + "]. This sheet uses elements designed by Javier Aumente, but has been created from the ground up by Joost Wijnen [morepurplemorebetter] (mpmb@flapkan.com).\\n\\nOther credits:\\n- Gretkatillor on ENworld.org for the code in this sheet was inspired by Gretkatillor's brilliant 'Clean Sheet'."

	//move the pages that we want to extract to a new instance, by running code from a console
	var forConsole = [
		"Execute the following:\n\tFirst:",
		"tDoc.extractPages({nStart: 0, nEnd: 3});",
		"\n\tAnd in the newly created document:",
		"var toDelScripts = ['AbilityScores', 'ClassSelection', 'ListsBackgrounds', 'ListsClasses', 'ListsCompanions', 'ListsCreatures', 'ListsFeats', 'ListsGear', 'ListsMagicItems', 'ListsPsionics', 'ListsRaces', 'ListsSources', 'ListsSpells'];",
		"for (var s = 0; s < toDelScripts.length; s++) {this.removeScript(toDelScripts[s]);};",
		"this.createTemplate({cName:'ALlog', nPage:1 });",
		"this.createTemplate({cName:'remember', nPage:2 });",
		"this.createTemplate({cName:'blank', nPage:3 });",
		"this.getTemplate('ALlog').hidden = true;",
		"this.getTemplate('remember').hidden = true;",
		"this.getTemplate('blank').hidden = true;",
		"this.info.AdvLogOnly = true;",
		'this.info.SheetVersion = "' + tDoc.info.SheetVersion + '";',
		tDoc.info.SheetVersionType ? 'this.info.SheetVersionType = "' + tDoc.info.SheetVersionType + '";' : '',
		tDoc.info.SheetVersionBuild ? 'this.info.SheetVersionBuild = "' + tDoc.info.SheetVersionBuild + '";' : '',
		'this.info.SheetType = "' + tDoc.info.SheetType + '";',
		'this.info.Keywords = "' + (!typePF ? keyCF : (tDoc.info.SheetType === "Printer Friendly" ? keyPF : keyPFR)) + '";',
		'this.info.Subject = "D&D 5e; Character Sheet; Adventurers League; Adventure Logsheet";',
		'this.info.ContactEmail = "' + tDoc.info.ContactEmail + '";',
		"setGlobalVars();",
		"this.info.Title = MakeDocName();",
		"CreateBkmrksCompleteAdvLogSheet();",
		"this.calculateNow();",
		FAQpath ? 'this.importDataObject({cName: "FAQ.pdf", cDIPath: "' + FAQpath + '"});' : '',
		'Value("Opening Remember", "No");',
		'app.execMenuItem("GeneralInfo");'
	];
	console.clear();
	console.println(forConsole.join("\n").replace(/\n{2,}/g, "\n"));
	console.show();
	tDoc.dirty = false;
}

//create the bookmarks of a Adventure Logsheet
function CreateBkmrksCompleteAdvLogSheet() {
	var bkmrks = {
		"Functions" : {
			cExpr : "MakeButtons(); tDoc.bookmarkRoot.children[0].open = !tDoc.bookmarkRoot.children[0].open;",
			children : {
				"Set Pages Layout" : {
					cExpr : "MakeAdvLogMenu_AdvLogOptions(true);",
					color : ["RGB", 0.9098052978515625, 0.196075439453125, 0.48626708984375]
				},
				"Text Options" : {
					cExpr : "MakeTextMenu_TextOptions();",
					color : ["RGB", 0.8000030517578125, 0.6666717529296875, 0.1137237548828125]
				},
				"Flatten" : {
					cExpr : "MakeMobileReady();",
					color : ["RGB", 0.2823486328125, 0.1921539306640625, 0.478424072265625]
				},
				"Unit System" : {
					cExpr : "SetUnitDecimals_Button();",
					color : ["RGB", 0.463, 0.192, 0.467]
				},
				"Set Color Theme" : {
					cName : typePF ? "Set Highlight Color" : "Set Color Theme",
					cExpr : "MakeColorMenu(); ColoryOptions();",
					color : ["RGB", 0.5, 0.5, 0.5]
				}
			}
		},
		"FAQ" : {
			cExpr : "getFAQ();"
		},
		"Get Latest Version" : {
			cName : "Get Latest Version (current: v" + semVers + ")",
			cExpr : "contactMPMB('spell sheets');"
		},
		"Get Full Character Sheet" : {
			cExpr : "contactMPMB('character sheet');"
		},
		"Contact MPMB" : {
			cExpr : "contactMpmbMenu();",
			color : ["CMYK", 0.76, 1, 0.03, 0.5] // DarkColorList.purple
		}
	};
	createBookmarks(tDoc.bookmarkRoot, bkmrks);
}

//a function to change the sorting of the skills
function MakeSkillsMenu_SkillsOptions(input, onlyTooltips) {
	var sWho = Who("Text.SkillsNames");
	var sList = Who("Acr Prof").replace(/^.*(\n|\r)*/, "");
	var remAth = tDoc.getField("Remarkable Athlete").isBoxChecked(0);
	var jackOf = tDoc.getField("Jack of All Trades").isBoxChecked(0);
	if (!input || input === "justMenu") {
		Menus.skills = [{
			cName : "Sort skills alphabetically",
			cReturn : "skills#alphabeta",
			bMarked : sWho === "alphabeta"
		}, {
			cName : "Sort skills by ability score",
			cReturn : "skills#abilities",
			bMarked : sWho === "abilities"
		}, {
			cName : "-"
		}, {
			cName : "Show a dialog with my skill options" + (sList ? "" : " (nothing to show)"),
			cReturn : "skills#dialog",
			bEnabled : sList !== ""
		}]
		if (input !== "justMenu") {
			Menus.skills = Menus.skills.concat([{
				cName : "-"
			}, {
				cName : "Show fields to modify skill calculations",
				cReturn : "skills#bluetextfields",
				bMarked : CurrentVars.bluetxt
			}])
		}
		Menus.skills = Menus.skills.concat([{
			cName : "-"
		}, {
			cName : 'Enable "Jack of All Trades"',
			cReturn : "skills#jackofalltrades",
			bMarked : jackOf
		}, {
			cName : 'Enable "Remarkable Athlete"',
			cReturn : "skills#remarkableathlete",
			bMarked : remAth
		}]);
		if (input == "justMenu") return;
	};

	var mStr = toUni(" Bonus Modifier") + "\nThe number you type in here will be added to the calculated ";
	var mStr1 = " value.\n\n" + toUni("Dynamic Modifiers") + "\nYou can also have the field use ability score modifiers. To do this, use the abbreviations of ability scores (Str, Dex, Con, Int, Wis, Cha, HoS), math operators (+, -, /, *), and numbers.\n   For example: '2+Str' or 'Wis+Int'.\nDon't worry if you are only able to write one or two letters of an ability score's abbreviation, the field will auto-complete (e.g. typing 'S+1' will result in 'Str+1').";
	var mStrC = mStr1.replace(", HoS", "");
	var mStr2 = "\n\nNote that any bonus from \"Jack of All Trades\" or \"Remarkable Athelete\" will be added automatically if the appropriate checkbox is checked.";
	var mStr3 = "\n\n" + toUni("Not Enough Space to Write?") + "\nIf you find that you need more space to type out the modifier you want to use, you can get a bigger input-form by left-clicking in this field while holding either the Ctrl, Shift, or Cmd key.\n   This pop-up dialog will also show you the origins of modifiers added by the automation, if any.";
	var getStr = function(aSkill, isCom) {
		return toUni(aSkill) + mStr + aSkill + (isCom ? mStrC : mStr1) + (isCom ? "" : mStr2) + mStr3;
	};

	if (onlyTooltips) { // only do the bonus modifier tooltips
		for (var S = 0; S < (SkillsList.abbreviations.length - 2); S++) {
			var newSkill = SkillsList.names[S];
			AddTooltip(SkillsList.abbreviations[S] + " Bonus", getStr(newSkill));
			if (typePF) AddTooltip("BlueText.Comp.Use.Skills." + SkillsList.abbreviations[S] + ".Bonus", getStr(newSkill, true), "");
		}
		return;
	};

	var MenuSelection = input ? input : getMenu("skills");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;

	switch (MenuSelection[1]) {
		case "bluetextfields":
			ToggleBlueText();
			break;
		case "jackofalltrades":
			Checkbox('Jack of All Trades', !jackOf);
			break;
		case "remarkableathlete":
			Checkbox('Remarkable Athlete', !remAth);
			break;
		case "dialog":
			ShowDialog("Skill proficiency origins and options", sList);
			break;
		case "alphabeta":
		case "abilities":
			if (MenuSelection[1] === sWho) break;
			// Start progress bar and stop calculations
			var thermoTxt = thermoM("Changing the order of the skills...");
			calcStop();
			var skillFlds = [" Prof", " Exp", " Bonus"];
			if (!typePF) skillFlds = skillFlds.concat([" Adv", " Dis"]);
			var skillRemObj = {}, useFld;

			// a function to do the actual copying
			var copy = function(fromObj, toObj, justObj) {
				if (fromObj.type == "checkbox") {
					if (justObj) {
						toObj.isBoxCheckVal = fromObj.isBoxChecked(0);
						toObj.type = "checkbox";
					} else {
						toObj.checkThisBox(0, fromObj.isBoxCheckVal);
					}
				} else {
					toObj.value = fromObj.value;
				}
				toObj.userName = fromObj.userName;
				toObj.submitName = fromObj.submitName;
				toObj.readonly = fromObj.readonly;
			}

			// Swap everything between the two types of lists
			for (var n = 1; n <= 2; n++) {
				for (var s = 0; s < (SkillsList.abbreviations.length - 2); s++) {
					var aSkill = SkillsList.abbreviations[s];
					var linkedSkill = SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(aSkill)];
					if (n == 1) {
						skillRemObj[aSkill] = {};
						useFld = sWho === "alphabeta" ? aSkill : linkedSkill;
					} else {
						useFld = sWho === "alphabeta" ? linkedSkill : aSkill;
					}
					for (var i = 0; i < skillFlds.length; i++) {
						if (n == 1) {
							skillRemObj[aSkill][skillFlds[i]] = {};
							copy(tDoc.getField(useFld + skillFlds[i]), skillRemObj[aSkill][skillFlds[i]], true);
						} else {
							copy(skillRemObj[aSkill][skillFlds[i]], tDoc.getField(useFld + skillFlds[i]));
						}
					}
				}
			}

			if (typePF) {
				// If this is a printer friendly sheet, show the stealth disadvantage field, if checked
				Hide("Stealth Disadv");
				if (How("AC Stealth Disadvantage") == "Dis") Show("Stealth Disadv." + MenuSelection[1]);

				// If this is a printer friendly sheet, also rearrange the skills of the companion page(s)
				var AScompA = What("Template.extras.AScomp").split(",");
				for (var AS = 0; AS < AScompA.length; AS++) {
					var prefix = AScompA[AS];
					var aField = prefix + "Comp.Use.Skills.";
					var bField = prefix + "BlueText.Comp.Use.Skills.";
					skillFlds = [[aField, ".Prof"], [aField, ".Exp"], [bField, ".Bonus"]];
					for (var n = 1; n <= 2; n++) {
						for (var s = 0; s < (SkillsList.abbreviations.length - 2); s++) {
							var aSkill = SkillsList.abbreviations[s];
							var linkedSkill = SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(aSkill)];
							if (n == 1) {
								skillRemObj[aSkill] = {};
								useFld = sWho === "alphabeta" ? aSkill : linkedSkill;
							} else {
								useFld = sWho === "alphabeta" ? linkedSkill : aSkill;
							}
							for (var i = 0; i < skillFlds.length; i++) {
								if (n == 1) {
									skillRemObj[aSkill][skillFlds[i][1]] = {};
									copy(tDoc.getField(skillFlds[i][0] + useFld + skillFlds[i][1]), skillRemObj[aSkill][skillFlds[i][1]], true);
								} else {
									copy(skillRemObj[aSkill][skillFlds[i][1]], tDoc.getField(skillFlds[i][0] + useFld + skillFlds[i][1]));
								}
							}
						}
					}
				}
			}

			//set the correct tooltip for remembering
			AddTooltip("Text.SkillsNames", MenuSelection[1]);

			//set the rich text for the skill names
			SetRichTextFields(false, true);
			thermoM(thermoTxt, true); // Stop progress bar
			break;
	}
}

// returns an object of the different elements to populate the class features or limited features section if olchoice is provided, oldlevel has to be provided as well
function GetLevelFeatures(aFea, level, choice, oldlevel, oldchoice, ForceChoice) {
	var tRe = { changed : false };
 	var attr = [["Add", "additional"], ["Use", "usages"], ["UseCalc", "usagescalc"], ["Recov", "recovery"], ["UseName", "name"], ["UseName", "limfeaname"], ["Descr", "description"], ["source", "source"], ["AltRecov", "altResource"]];

	for (var a = 0; a < attr.length; a++) {
		// add the new choice
		var setA = attr[a][0];
		var objA = attr[a][1];
		tRe[setA] = choice && aFea[choice] && aFea[choice][objA] ? aFea[choice][objA] : aFea[objA] && !ForceChoice ? aFea[objA] : tRe[setA] ? tRe[setA] : "";
		tRe[setA + "Old"] = oldchoice && aFea[oldchoice] && aFea[oldchoice][objA] ? aFea[oldchoice][objA] : aFea[objA] && !ForceChoice ? aFea[objA] : tRe[setA + "Old"] ? tRe[setA + "Old"] : "";
		if (objA.indexOf("usages") !== -1) {
			if (level === 0) tRe[setA] = "";
			if (oldlevel === 0) tRe[setA + "Old"] = "";
		}
	}

	for (var aProp in tRe) {
		if (aProp.indexOf("source") !== -1) continue;
		var theP = tRe[aProp];
		if (theP && isArray(theP)) {
			var lvlUse = aProp.indexOf("Old") !== -1 && (oldlevel || oldlevel === 0) ? oldlevel : level;
			lvlUse = Math.min(lvlUse, theP.length) - 1;
			tRe[aProp] = theP[lvlUse] ? theP[lvlUse] : "";

			// now see if anything changed compared to the new
			if (!tRe.changed && aProp.indexOf("Old") !== -1) {
				var otherProp = aProp.replace("Old", "");
				if (tRe[otherProp] !== "" && !isArray(tRe[otherProp])) {
					tRe.changed = tRe[aProp].toString() != tRe[otherProp].toString();
				}
			}
		}
	}
	return tRe;
};

// set some variables to their metric functionality
function setListsUnitSystem(isMetric, onStart) {
	var wasMetric = What("Unit System") === "metric";
	isMetric = isMetric ? isMetric === "metric" : What("Unit System") === "metric";
	if (onStart && !isMetric) return; //nothing to do on startup and the unit system is not metric
	var conStr = !onStart && wasMetric === isMetric ? "UpdateDecimals" : (isMetric ? "ConvertToMetric" : "ConvertToImperial");
}

// automatically add a new entry on the Adventurers Logsheet with the sheets current values
function addALlogEntry() {
	//first find the next empty logsheet entry
	var theTypesA = [
		".xp",
		".gold",
		".downtime",
		".renown",
		".magicItems"
	];
	var ALlogA = What("Template.extras.ALlog").split(",").splice(1);
	var emptyLog = [];
	var emptyFound = false;
	for (var tA = 0; tA < ALlogA.length; tA++) {
		for (var i = 1; i <= FieldNumbers.logs; i++) {
			var emptyFlds = 0;
			for (var A = 0; A < theTypesA.length; A++) {
				emptyFlds += What(ALlogA[tA] + "AdvLog." + i + theTypesA[A] + ".gain") === "" ? 1 : 0;
			}
			if (emptyFlds === 5) {
				emptyFound = true;
				emptyLog[0] = ALlogA[tA];
				emptyLog[1] = i;
				emptyLog[2] = i !== 1 ? ALlogA[tA] : (tA !== 0 ? ALlogA[tA - 1] : "stop");
				break;
			}
		}
		if (emptyFound) break;
	};
	//now if no empty log was found, first add another logsheet page
	if (emptyLog.length === 0) {
		emptyLog[0] = DoTemplate("ALlog", "Add");
		emptyLog[1] = 1;
		emptyLog[2] = ALlogA[ALlogA.length - 1];
	};

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Adding new logsheet entry...");
	calcStop();

	var baseFld = emptyLog[0] + "AdvLog." + emptyLog[1] + ".";
	// experience
	var start = baseFld === "AdvLog.1." ? 0 : What(baseFld + "xp.start");
	var total = What("Total Experience") - start;
	Value(baseFld + "xp.gain", (total >= 0 ? "+" : "") + total);
	thermoM(1/5);

	// gold
	start = baseFld === "AdvLog.1." ? 0 : What(baseFld + "gold.start");
	total = Math.round(((Number(What("Platinum Pieces").replace(",", ".")) * 10) + Number(What("Gold Pieces").replace(",", ".")) + (Number(What("Electrum Pieces").replace(",", ".")) / 2) + (Number(What("Silver Pieces").replace(",", ".")) / 10) + (Number(What("Copper Pieces").replace(",", ".")) / 100)) * 100) / 100 - start;
	Value(baseFld + "gold.gain", (total >= 0 ? "+" : "") + total);
	thermoM(2/5);

	// downtime (can't really be calculated, so just add a zero)
	Value(baseFld + "downtime.gain", "+0");

	// renown
	start = baseFld === "AdvLog.1." ? 0 : What(baseFld + "renown.start");
	total = What("Background_Renown.Text") - start;
	Value(baseFld + "renown.gain", (total >= 0 ? "+" : "") + total);
	thermoM(3/5);

	// magicItems
	start = baseFld === "AdvLog.1." ? 0 : What(baseFld + "magicItems.start");
	var MInr = [];
	for (var mi = 1; mi <= FieldNumbers.magicitems; mi++) {
		var thisMI = What("Extra.Magic Item " + mi).toLowerCase();
		if (thisMI) MInr.push(thisMI);
	};
	if (What("Adventuring Gear Remember") === false) {
		for (var gmi = FieldNumbers.gearMIrow + 1; gmi <= FieldNumbers.gear; gmi++) {
			var thisMI = What("Adventuring Gear Row " + mi).toLowerCase();
			if (thisMI && MInr.index(thisMI) === -1) MInr.push(thisMI);
		}
	};
	total = MInr.length - start;
	Value(baseFld + "magicItems.gain", (total >= 0 ? "+" : "") + total);
	thermoM(4/5);

	// set today's date
	Value(baseFld + "date", util.printd('yy-mm-dd', new Date()));

	// set the other fields, if a previous entry was detected
	if (emptyLog[2] !== "stop") {
		var preBase = emptyLog[2] + "AdvLog." + (emptyLog[1] === 1 ? FieldNumbers.logs : emptyLog[1] - 1) + ".";
		Value(baseFld + "adventure", What(preBase + "adventure"));
		Value(baseFld + "dm", What(preBase + "dm"));
		var oldSesh = Number(What(preBase + "session").replace(/[^\d+]*(\d+)?.*/, "$1"));
		Value(baseFld + "session", What(preBase + "session").replace(oldSesh, oldSesh + 1));
	};

	tDoc.getField(baseFld + "notes" + (emptyLog[0] === "" ? ".1" : "")).setFocus();

	//alert the user of what happened
	app.alert({
		cMsg : "The sheet automatically filled '" + toUni(What(emptyLog[0] + "Text.AdvLog." + emptyLog[1]).capitalize()) + "' with the date of today.\n\nThe numerical 'gain' fields are calculated using the information from the rest of the sheet compared to the last entry.\nThe Adventure Name, Session number, and DMs Name have been taken from the previous entry.\n\nNote that the Downtime gain is set to zero as the sheet doesn't track those.",
		cTitle : "A new Logsheet Entry has been added",
		nType : 0,
		nIcon : 3
	});
	thermoM(thermoTxt, true); // Stop progress bar
};

//menu for logsheet entries to move up, move down, insert, delete, or clear
function MakeAdvLogLineMenu_AdvLogLineOptions() {
	var prefix = getTemplPre(event.target.name, "ALlog", true);
	var firstPrefix = isTemplVis("ALlog", true)[1];
	var lineNmbr = Number(event.target.name.slice(-1));
	var theArray = [
		["Move up", "up"],
		["Move down", "down"],
		["-", "-"],
		["Insert empty Logsheet Entry", "insert"],
		["Delete Logsheet Entry", "delete"],
		["Clear Logsheet Entry", "clear"]
	];
	var menuLVL1 = function (item, array) {
		for (var i = 0; i < array.length; i++) {
			var isEnabled = true;
			if (array[i][1] === "up" && prefix === firstPrefix && lineNmbr === 1) {
				isEnabled = false;
			}
			item.push({
				cName : array[i][0],
				cReturn : array[i][1],
				bEnabled : isEnabled
			});
		}
	}
	var AdvLogLineMenu = [];
	menuLVL1(AdvLogLineMenu, theArray);
	Menus.advlogline = AdvLogLineMenu;

	var MenuSelection = getMenu("advlogline");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;
	doAdvLogLine(MenuSelection[0], lineNmbr, prefix);
}

//do with logsheet entry, move up, move down, insert, delete, clear
function doAdvLogLine(action, lineNmbr, prefix) {
	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Applying the layout settings...");
	calcStop();
	var ALlogA = What("Template.extras.ALlog").split(",").splice(1);
	var preNm = prefix + "AdvLog.";
	var firstPrefix = isTemplVis("ALlog", true)[1];
	var FieldNames = [
		".xp.gain",
		".gold.gain",
		".downtime.gain",
		".renown.gain",
		".magicItems.gain",
		".date",
		".adventure",
		".session",
		".dm",
		".notes"
	];
	var extraPage = false;
	switch (action) {
	 case "up" :
	 case "down" :
		var Fields = [], FieldsValue = [], FieldsUp = [], FieldsUpValue = [], FieldsDown = [], FieldsDownValue = [];
		for (var F = 0; F < FieldNames.length; F++) {
			Fields[F] = preNm + lineNmbr + FieldNames[F];
			FieldsValue[F] = What(Fields[F]);
			if (action === "up" && (prefix !== firstPrefix || lineNmbr !== 1)) {
				if (lineNmbr !== 1) {
					FieldsUp[F] = preNm + (lineNmbr - 1) + FieldNames[F];
					FieldsUpValue[F] = What(FieldsUp[F]);
				} else {
					FieldsUp[F] = ALlogA[ALlogA.indexOf(prefix) - 1] + "AdvLog." + FieldNumbers.logs + FieldNames[F];
					FieldsUpValue[F] = What(FieldsUp[F]);
				}
			};
			if (action === "down") {
				if (lineNmbr !== FieldNumbers.logs) {
					FieldsDown[F] = preNm + (lineNmbr + 1) + FieldNames[F];
					FieldsDownValue[F] = What(FieldsDown[F]);
				} else if (ALlogA.indexOf(prefix) !== ALlogA.length - 1) {
					FieldsDown[F] = ALlogA[ALlogA.indexOf(prefix) + 1] + "AdvLog.1" + FieldNames[F];
					FieldsDownValue[F] = "";
				} else {
					if (!extraPage) extraPage = DoTemplate("ALlog", "Add");
					FieldsDown[F] = extraPage + "AdvLog.1" + FieldNames[F];
					FieldsDownValue[F] = "";
				}
			};
		};
		var useArr = action === "up" ? [FieldsUp, FieldsUpValue] : [FieldsDown, FieldsDownValue];
		for (var F = 0; F < FieldNames.length; F++) {
			Value(useArr[0][F], FieldsValue[F]);
			Value(Fields[F], useArr[1][F]);
		}
		break;
	 case "delete" :
		for (var tA = ALlogA.indexOf(prefix); tA < ALlogA.length; tA++) {
			var startI = ALlogA[tA] === prefix ? lineNmbr : 1;
			for (var i = startI; i <= FieldNumbers.logs; i++) {
				if (tA === (ALlogA.length - 1) && i === FieldNumbers.logs) {
					tDoc.resetForm([ALlogA[tA] + "AdvLog." + i]);
				} else {
					for (var F = 0; F < FieldNames.length; F++) {
						if (i === FieldNumbers.logs) {
							Value(ALlogA[tA] + "AdvLog." + i + FieldNames[F], What(ALlogA[tA + 1] + "AdvLog." + 1 + FieldNames[F]));
						} else {
							Value(ALlogA[tA] + "AdvLog." + i + FieldNames[F], What(ALlogA[tA] + "AdvLog." + (i + 1) + FieldNames[F]));
						}
					}
				}
			}
		};
		break;
	 case "insert" :
		for (var tA = (ALlogA.length - 1); tA >= ALlogA.indexOf(prefix); tA--) {
			var endI = ALlogA[tA] === prefix ? lineNmbr : 0;
			for (var i = FieldNumbers.logs; i > endI; i--) {
				if (tA === (ALlogA.length - 1) && i === FieldNumbers.logs) {
					for (var F = 0; F < FieldNames.length; F++) {
						var fieldVal = What(ALlogA[tA] + "AdvLog." + i + FieldNames[F]);
						if (fieldVal && !extraPage) extraPage = DoTemplate("ALlog", "Add");
						Value(extraPage + "AdvLog.1" + FieldNames[F], fieldVal);
						Value(ALlogA[tA] + "AdvLog." + i + FieldNames[F], What(ALlogA[tA] + "AdvLog." + (i - 1) + FieldNames[F]));
					}
					if (extraPage) event.target.setFocus();
				} else {
					for (var F = 0; F < FieldNames.length; F++) {
						if (i === 1) {
							Value(ALlogA[tA] + "AdvLog." + i + FieldNames[F], What(ALlogA[tA - 1] + "AdvLog." + FieldNumbers.logs + FieldNames[F]));
						} else {
							Value(ALlogA[tA] + "AdvLog." + i + FieldNames[F], What(ALlogA[tA] + "AdvLog." + (i - 1) + FieldNames[F]));
						}
					}
				}
			}
		};
	 case "clear" :
		tDoc.resetForm([preNm + lineNmbr]);
		break;
	};
	thermoM(thermoTxt, true); // Stop progress bar
}

//a way to contact morepurplemorebetter
function contactMPMB(medium) {
	if (!medium) medium = "website";
	switch (medium.toLowerCase()) {
	// MPMB website
		default :
		case "website" :
			app.launchURL("https://www.flapkan.com/", true);
			break;
		case "how to add content" :
			app.launchURL("https://www.flapkan.com/how-to/add-more-content", true);
			break;
		case "community content" :
			app.launchURL("https://www.flapkan.com/mpmb/fanforum", true);
			break;
		case "mpmb content" :
			app.launchURL("https://www.flapkan.com/mpmb/extracontent", true);
			break;
		case "character sheet" :
		case "latest version" :
			app.launchURL("https://www.flapkan.com/" +
				(patreonVersion ? "patrons#charactersheets" : "mpmb/charsheets"),
				true
			);
			break;
		case "spell sheets" :
			app.launchURL("https://www.flapkan.com/" +
				(patreonVersion ? "patrons#spellsheets" : "mpmb/spellsheets"),
				true
			);
			break;
		case "logsheets" :
			app.launchURL("https://www.flapkan.com/" +
				(patreonVersion ? "patrons#logsheets" : "mpmb/logsheets"),
				true
			);
			break;
	// Report a bug
		case "bug" :
			app.launchURL("https://discord.gg/MY5wKpV");
			break; // While bug reporting through the website is not operational
			var sheetType = typePF ? "pf" + ((/redesign/i).test(tDoc.info.SheetType) ? "r" : "") : typeA4 ? "cf-a4" : "cf-lt";
			var acroType = app.viewerType == "Reader" ? "reader-" : "pro-";
			var acroVers = app.viewerVersion < 9 ? "other" : acroType + (app.viewerVersion < 10 ? "ix" : app.viewerVersion < 11 ? "x" : app.viewerVersion < 12 ? "xi" : "dc");
	// Other mediums
		case "discord" :
			app.launchURL("https://discord.gg/Qjq9Z5Q");
			break;
		case "github" :
			app.launchURL("https://github.com/morepurplemorebetter/", true);
			break;
		case "patreon" :
			app.launchURL("https://www.patreon.com/morepurplemorebetter", true);
			break;
		case "reddit" :
			app.launchURL("https://www.reddit.com/r/mpmb/", true);
			break;
		case "twitter" :
			app.launchURL("https://twitter.com/BetterOfPurple", true);
			break;
	};
};

function contactMpmbMenu(MenuSelection) {
	var MenuSelection = MenuSelection ? MenuSelection : getMenu("contact");
	if (!MenuSelection || MenuSelection[0] != "contact") return;
	contactMPMB(MenuSelection[1]);
}

//open a dialog for the Patreon
function PatreonStatement(force) {
	try {
		var iNow = new Date();
		var timeDiff = force ? true : iNow.getTime() - eval_ish(tDoc.getField("SaveIMG.Patreon").submitName).getTime();
		if (force || Math.floor(timeDiff / (1000 * 3600 * 24)) >= 28) {
			var oButIcon = this.getField("SaveIMG.Patreon").buttonGetIcon();
			var oMyIcon = util.iconStreamFromIcon(oButIcon);

			var theTxt = "If you like this sheet, please consider supporting this project over at the Patreon for MPMB's Character Record Sheet.\n\nWith your contribution on Patreon:\n   \u2022 I can continue expanding the functionality of this sheet.\n   \u2022 You get to choose which new features get added.\n   \u2022 Your favourite third-party material gets added.\n   \u2022 You get instant access and alerts when new versions are released.";
			var theTxt2 = "Don't worry, the sheet will stay available for free on my website.\nHowever, if you feel like contributing more, it will all flow back into expanding the sheets' features and content.\n\nYou can always visit the Patreon webpage using the \"Contact MPMB\" bookmarks.";
			var PatreonDialog = {
				initialize : function (dialog) {
					dialog.load({
						"img1" : oMyIcon
					});
				},
				bPat : function (dialog) {contactMPMB("patreon");},
				description : {
					name : "SUPPORT ON PATREON DIALOG",
					elements : [{
						type : "view",
						elements : [{
							type : "view",
							align_children : "align_distribute",
							elements : [{
								type : "image",
								item_id : "img1",
								alignment : "align_top",
								width : 63,
								height : 63
							}, {
								type : "view",
								char_width : 40,
								elements : [{
									type : "static_text",
									name : "Become a patron",
									item_id : "head",
									alignment : "align_top",
									font : "title",
									bold : true,
									height : 24,
									char_width : 40
								}, {
									type : "static_text",
									item_id : "txt1",
									alignment : "align_fill",
									font : "dialog",
									wrap_name : true,
									char_width : 40,
									name : theTxt
								}, {
									type : "button",
									font : "heading",
									bold : true,
									item_id : "bPat",
									name : "Go to MPMB's Patreon webpage",
									alignment : "align_center"
								}, {
									type : "static_text",
									item_id : "txt2",
									alignment : "align_fill",
									font : "dialog",
									wrap_name : true,
									char_width : 40,
									name : theTxt2
								}]
							}]
						}, {
							type : "ok"
						}]
					}]
				}
			};

			app.execDialog(PatreonDialog);
			//reset the counter
			tDoc.getField("SaveIMG.Patreon").submitName = new Date().toSource();
		};
	} catch (e) {};
}

//a way to change the calculations of the sheet; The input is an object with the "atkDmg", "atkHit", "atkAdd", and/or "hp" attributes;
// Add === true to add something, or Add === false to remove something;
function addEvals(evalObj, NameEntity, Add, type, level) {
	if (!evalObj) return;

	// Calculate the priority
	var priority = level ? level : 0;
	switch (GetFeatureType(type)) {
		case "magic":
			priority += 100;
			break;
		case "items":
			priority += 200;
			break;
		case "feats":
			priority += 300;
			break;
		case "background":
			priority += 400;
			break;
		case "race":
			priority += 500;
			break;
		case "classes":
			priority += 600;
			break;
	}

	// Function to sort
	var fSortArray = function(a, b) { return a[0] - b[0]; };

	// Do the stuff affecting the hp calculations
	if (evalObj.hp) {
		if (!CurrentEvals.hp) CurrentEvals.hp = {};
		if (Add) {
			CurrentEvals.hp[NameEntity] = evalObj.hp;
		} else if (CurrentEvals.hp && CurrentEvals.hp[NameEntity]) {
			delete CurrentEvals.hp[NameEntity];
		};
		if (evalObj.hpForceRecalc) {
			if (CurrentEvals.hpForceRecalc === undefined) CurrentEvals.hpForceRecalc = 0;
			if (Add) {
				CurrentEvals.hpForceRecalc++;
			} else if (CurrentEvals.hpForceRecalc) {
				CurrentEvals.hpForceRecalc--;
			}
		}
		CurrentUpdates.types.push("hp");
	};

	// Do the rest
	var bIsArray;
	var objTypeStr = {
		"atkAdd" : "atkStr",
		"atkCalc" : "atkStr",
		"spellCalc" : "spellAtkStr",
		"spellList" : "spellStr",
		"spellAdd" : "spellStr",
		"creatureCallback" : "creaStr",
		"companionCallback" : "creaStr"
	};
	var objSaveStr = { atkStr : "", spellAtkStr : "", spellStr : "", creaStr : "" };
	// Process the eval functions
	for (var sType in objTypeStr) {
		if (!evalObj[sType]) continue;
		bIsArray = isArray(evalObj[sType]);
		var aPrio = [
			bIsArray && evalObj[sType][2] !== undefined && !isNaN(evalObj[sType][2]) ? evalObj[sType][2] : priority,
			NameEntity
		];
		// Add the descriptive text for safekeeping
		if (bIsArray && evalObj[sType][1]) objSaveStr[objTypeStr[sType]] += "\n \u2022 " + evalObj[sType][1];
		// Set the function
		if (!CurrentEvals[sType]) CurrentEvals[sType] = {};
		if (!CurrentEvals[sType+"Order"]) CurrentEvals[sType+"Order"] = [];
		if (Add) {
			CurrentEvals[sType][NameEntity] = bIsArray ? evalObj[sType][0] : evalObj[sType];
			CurrentEvals[sType+"Order"].push(aPrio);
		} else {
			if (CurrentEvals[sType] && CurrentEvals[sType][NameEntity]) delete CurrentEvals[sType][NameEntity];
			CurrentEvals[sType+"Order"].eject(aPrio);
		}
		CurrentEvals[sType+"Order"].sort(fSortArray);
	}
	// Process the explanatory strings
	for (var sStr in objSaveStr) {
		if (!objSaveStr[sStr]) continue;
		// Remember the old strings for the changes dialog (if not done so already)
		var sStrMain = sStr.replace("spellAtkStr", "atkStr");
		if (CurrentUpdates[sStrMain + "Old"] == undefined) {
			CurrentUpdates[sStrMain + "Old"] = StringEvals(/atkStr/i.test(sStr) ? ["atkStr", "spellAtkStr"] : sStr === "spellStr" ? ["spellStr", "spellAtkStr"] : [sStr]);
		}
		if (Add) {
			if (!CurrentEvals[sStr]) CurrentEvals[sStr] = {};
			CurrentEvals[sStr][NameEntity] = objSaveStr[sStr];
		} else if (CurrentEvals[sStr] && CurrentEvals[sStr][NameEntity]) {
			delete CurrentEvals[sStr][NameEntity];
		}
		// As the descriptive text changed, show it in the changes dialog
		CurrentUpdates.types.push(sStrMain.toLowerCase());
	}

	// Some specifics
	if (evalObj.atkAdd) CurrentUpdates.types.push("attacksforce");
	if (evalObj.creatureCallback) RunCreatureCallback("all", "creature", Add, isArray(evalObj.creatureCallback) ? evalObj.creatureCallback[0] : evalObj.creatureCallback, NameEntity);
	if (evalObj.companionCallback) RunCreatureCallback("all", "companion", Add, isArray(evalObj.companionCallback) ? evalObj.companionCallback[0] : evalObj.companionCallback, NameEntity);
	// Remove any remaining empty objects when removing stuff
	if (!Add) CurrentEvals = CleanObject(CurrentEvals);
	// Finally, set this global variable to its field for safekeeping
	SetStringifieds("evals");
};

// make a string of all the things affecting the attack calculations
function StringEvals(aType) {
	if (!isArray(aType)) aType = [aType];
	var txt = [];
	for (var i = 0; i < aType.length; i++) {
		var sType = aType[i];
		if (!CurrentEvals[sType]) continue;
		for (var str in CurrentEvals[sType]) {
			txt.push(toUni(str) + CurrentEvals[sType][str]);
		}
	}
	return txt.join("\n\n");
}

// test if the main character is proficient with a weapon (return true) or not (return false)
function isProficientWithWeapon(WeaponName, theWea) {
	if (theWea.isAlwaysProf || (/natural|spell|cantrip|alwaysprof/i).test(theWea.type)) {
		return true; // No need to check further for natural weapons, spells, and 'alwaysprof'
	} else if ((theWea.type.toLowerCase() == "simple" && tDoc.getField("Proficiency Weapon Simple").isBoxChecked(0)) || (theWea.type.toLowerCase() == "martial" && tDoc.getField("Proficiency Weapon Martial").isBoxChecked(0))) {
		return true; // Proficient with the relevant type (simple/martial)
	} else if (CurrentProfs.weapon.otherWea && RegExp(";(" + (CurrentProfs.weapon.otherWea.finalProfs.join("s?|")  + "s?").replace(/ss\?(\||$)/g, "s?$1") + ");", "i").test(";" + [WeaponName, theWea.type].concat(theWea.list ? [theWea.list] : []).concat(theWea.baseWeapon ? [theWea.baseWeapon] : []).join(";") + ";")) {
		return true; // Proficient with the weapon through an 'other weapons' proficiency
	}
	return false;
}

// Keep the ".Weapon" and ".Weapon Selection" fields the same (validation event)
function CopyWeaponToSelection() {
	if (!CurrentVars.manual.attacks || !IsNotWeaponMenu || IsSetDropDowns) return; // when just changing the dropdowns or using the line menu, don't do anything
	if (How(event.target.name + " Selection") !== event.value) {
		Value(event.target.name + " Selection", event.value);
	}
}

//apply the effect of a weapon with inputText the literal string in the Weapon Selection field and fldName the name of the field (any one of them); If fldName is left blank, use the event.target.name
function ApplyWeapon(inputText, fldName, isReCalc, onlyProf, forceRedo) {
	if (!IsNotWeaponMenu || IsSetDropDowns) return; // when just changing the dropdowns or using the line menu, don't do anything
	fldName = fldName ? fldName : event.target.name;
	var QI = fldName.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var fldNmbr = fldName.replace(/.*Attack\.(\d+?)\..+/, "$1");
	var ArrayNmbr = Number(fldNmbr) - 1;
	var fldBase = prefix + Q + "Attack." + fldNmbr + ".";
	var fldBaseBT = prefix + "BlueText." + Q + "Attack." + fldNmbr + ".";

	//set the input as the submitName for reference and set the non-automated field with the same value as well
	AddTooltip(fldBase + "Weapon Selection", undefined, inputText);
	if (CurrentVars.manual.attacks || (!isReCalc && inputText === (QI ? CurrentWeapons.field[ArrayNmbr] : CurrentWeapons.compField[prefix][ArrayNmbr]))) return; //don't do the rest of this function if only moving weapons around or weapons are set to manual or the CurrentWeapons.field didn't change

	if (What(fldBase + "Weapon") !== inputText) Value(fldBase + "Weapon", inputText);

	//remember what the old weapon was
	var oldWea = QI ? CurrentWeapons.known[ArrayNmbr][0] : CurrentWeapons.compKnown[prefix][ArrayNmbr][0];

	//now find the new weapon and put it in the document level variable CurrentWeapons
	if (QI) {
		CurrentWeapons.field[ArrayNmbr] = inputText;
		FindWeapons(ArrayNmbr);
	} else {
		CurrentWeapons.compField[prefix][ArrayNmbr] = inputText;
		FindCompWeapons(ArrayNmbr, prefix);
	};

	//a variable with all different fields of the one weapon
	var fields = {
		Proficiency : false,
		Mod : "",
		Range : "",
		Damage_Type : "",
		Description : "",
		Description_Tooltip : "Description and notes",
		To_Hit_Bonus : 0,
		Damage_Bonus : 0,
		Damage_Die : "",
		Weight : ""
	};
	var BTflds = ["To_Hit_Bonus", "Damage_Bonus", "Damage_Die", "Weight"];

	// Start progress bar and stop calculations
	var thermoTxt = thermoM("Filling out the weapon's details...");
	calcStop();

	//set a variable to refer to the new weapon
	var thisWeapon = QI ? CurrentWeapons.known[ArrayNmbr] : CurrentWeapons.compKnown[prefix][ArrayNmbr];
	var WeaponName = thisWeapon[0];
	var aWea = QI || isNaN(parseFloat(WeaponName)) ? WeaponsList[WeaponName] : !QI && !isNaN(parseFloat(WeaponName)) && CurrentCompRace[prefix] && CurrentCompRace[prefix].attacks ? CurrentCompRace[prefix].attacks[WeaponName] : false;

	//if there is a new weapon entered and the old weapon had ammo that is not used by any of the current weapons, remove that ammo from the ammo section.
	if (QI && oldWea && WeaponsList[oldWea].ammo) {
		var theOldAmmo = WeaponsList[oldWea].ammo;
		var tempFound = false;
		for (var j = 0; j < CurrentWeapons.known.length; j++) {
			var jWeapon = WeaponsList[CurrentWeapons.known[j][0]];
			if (jWeapon && jWeapon.ammo && jWeapon.ammo === theOldAmmo) {
				tempFound = true;
				break;
			};
		};
		if (!tempFound) RemoveAmmo(theOldAmmo);
	};

	// if a weapon was found, set the variables
	if (aWea) {
		// create the variable from the baseWeapon
		var theWea = {};
		if (aWea.baseWeapon && WeaponsList[aWea.baseWeapon]) {
			for (var attr in WeaponsList[aWea.baseWeapon]) theWea[attr] = WeaponsList[aWea.baseWeapon][attr];
		}
		for (var attr in aWea) theWea[attr] = aWea[attr];

		thermoTxt = thermoM("Applying the weapon's features...", false); //change the progress dialog text
		var curDescr = What(fldBase + "Description");
		var curRange = What(fldBase + "Range");
		fields.Description = theWea.description; //add description
		fields.Description_Tooltip = theWea.tooltip ? theWea.tooltip : ""; //add the tooltip for the description
		fields.Range = theWea.range; //add range
		fields.Damage_Type = theWea.damage[2]; //add Damage Type

		//add Weight
		fields.Weight = isReCalc ? What(fldBaseBT + "Weight") :
			theWea.weight ? theWea.weight : "";

		//add Damage Die
		fields.Damage_Die = theWea.damage[0] + (parseFloat(theWea.damage[1]) ? "d" + theWea.damage[1] : "");

		//add To Hit Bonus
		fields.To_Hit_Bonus = isReCalc ? What(fldBaseBT + "To Hit Bonus") :
			theWea.dc ? "dc" + (theWea.modifiers && theWea.modifiers[0] ? theWea.modifiers[0].replace(/dc/ig, '') : "") :
			theWea.modifiers && theWea.modifiers[0] ? theWea.modifiers[0] : 0;

		//add Damage Bonus
		fields.Damage_Bonus = isReCalc ? What(fldBaseBT + "Damage Bonus") :
			theWea.modifiers && theWea.modifiers[1] ? theWea.modifiers[1] : 0;

		//add proficiency checkmark
		fields.Proficiency = !QI ? true : isProficientWithWeapon(WeaponName, theWea);

		//add mod
		var StrDex = What(QI ? "Str" : prefix + "Comp.Use.Ability.Str.Score") < What(QI ? "Dex" : prefix + "Comp.Use.Ability.Dex.Score") ? 2 : 1;
		fields.Mod = isReCalc && !theWea.ability ? What(fldBase + "Mod") :
			(/finesse/i).test(theWea.description) ? StrDex : theWea.ability;

		//change mod if this is concerning a spell/cantrip
		var forceUseSpellcastingMod = theWea.useSpellcastingAbility === undefined ? false : theWea.useSpellcastingAbility ? "y" : "n";
		if ((thisWeapon[3] || forceUseSpellcastingMod == "y") && forceUseSpellcastingMod != "n") {
			if (thisWeapon[4].length) {
				var abiArr = thisWeapon[4].map( function(sClass) {
					return CurrentSpells[sClass] && CurrentSpells[sClass].ability && !isNaN(CurrentSpells[sClass].ability) ? CurrentSpells[sClass].ability : 0;
				});
			} else {
				// the spell is not known by any class, so just gather the ability scores from all spellcasting entries so we can select the highest
				var abiArr = [];
				for (var aCast in CurrentSpells) {
					if (!isNaN(CurrentSpells[aCast].ability)) abiArr.push(CurrentSpells[aCast].ability);
				}
			}
			var abiDone = [];
			var abiModArr = [];
			for (var i = 0; i < abiArr.length; i++) {
				if (!abiArr[i] || abiDone.indexOf(abiArr[i]) !== -1) continue;
				abiDone.push(abiArr[i]);
				var thisMod = What(AbilityScores.abbreviations[abiArr[i] - 1]);
				if (thisMod > Math.max.apply(Math, abiModArr)) fields.Mod = abiArr[i];
				abiModArr.push(thisMod);
			}
		}

		if (theWea.ammo) fields.Ammo = theWea.ammo; //add ammo

		//now run the code that was added by class/race/feat
		if (QI && CurrentEvals.atkAdd) {

			// define some variables that we can check against later or with the CurrentEvals
			var WeaponText = inputText + " " + fields.Description;
			var isDC = (/dc/i).test(fields.To_Hit_Bonus);
			var isSpell = thisWeapon[3] || (theWea && (/cantrip|spell/i).test(theWea.type)) || (!theWea && (/\b(cantrip|spell)\b/i).test(WeaponText)) ? true : false;
			var isWeapon = !isSpell || (isSpell && theWea && !(/cantrip|spell/i).test(theWea.type));
			var isMeleeWeapon = isWeapon && (/melee/i).test(fields.Range);
			var isRangedWeapon = isWeapon && (/^(?!.*melee).*\d+.*$/i).test(fields.Range);
			var isNaturalWeapon = isWeapon && theWea && (/natural/i).test(theWea.type);

			var gatherVars = {
				WeaponText : WeaponText,
				WeaponTextName : inputText,
				isDC : isDC,
				isSpell : isSpell,
				isWeapon : isWeapon,
				isMeleeWeapon : isMeleeWeapon,
				isRangedWeapon : isRangedWeapon,
				isNaturalWeapon : isNaturalWeapon,
				theWea : theWea,
				StrDex : StrDex,
				WeaponName : WeaponName,
				baseWeaponName : theWea.baseWeapon ? theWea.baseWeapon : WeaponName,
				thisWeapon : thisWeapon
			}

			for (var i = 0; i < CurrentEvals.atkAddOrder.length; i++) {
				var evalName = CurrentEvals.atkAddOrder[i][1];
				var evalThing = CurrentEvals.atkAdd[evalName];
				if (!evalThing) continue;
				try {
					if (typeof evalThing == 'string') {
						eval(evalThing);
					} else if (typeof evalThing == 'function') {
						evalThing(fields, gatherVars);
					}
				} catch (error) {
					var eText = "The custom ApplyWeapon/atkAdd script '" + evalName + "' produced an error! It will be removed from the sheet for now, but please contact the author of the feature to have this issue corrected:\n " + error;
					for (var e in error) eText += "\n " + e + ": " + error[e];
					console.println(eText);
					console.show();
					delete CurrentEvals.atkAdd[evalName];
					CurrentEvals.atkAddOrder.splice(i, 1);
					i--;
				}
			}
		};
		// if this is a field recalculation and no custom eval changed the description or range, just use the one from the field so that manual changes are preserved
		if (isReCalc && !forceRedo) {
			if (fields.Description === theWea.description) fields.Description = curDescr;
			if (fields.Range === theWea.range) fields.Range = curRange;
		}
	};

	// apply the values to the fields only if we need to either reset the fields or a weapon was found
	if (onlyProf) {
		Checkbox(fldBase + "Proficiency", fields.Proficiency);
	} else if (aWea || !inputText) {
		var resetFlds = [];
		for (var weaKey in fields) {
			var keyFld = (BTflds.indexOf(weaKey) !== -1 ? fldBaseBT : fldBase) + weaKey.replace(/_/g, " ");
			if (!fields[weaKey]) {
				if (tDoc.getField(keyFld)) resetFlds.push(keyFld);
				continue;
			};
			switch (weaKey) {
			 case "Description_Tooltip" :
				if (!fields.Description) AddTooltip(fldBase + "Description", fields[weaKey]);
				break;
			 case "Proficiency" :
				Checkbox(keyFld, fields[weaKey]);
				break;
			 case "Mod" :
				PickDropdown(keyFld, fields[weaKey]);
				break;
			 case "Damage_Type" :
				AddDmgType(keyFld, fields[weaKey]);
				break;
			 case "Weight" :
				var massMod = What("Unit System") === "imperial" ? 1 : UnitsList.metric.mass;
				Value(keyFld, RoundTo(fields[weaKey] * massMod, 0.001, true));
				break;
			 case "Description" :
			 case "Range" :
				Value(keyFld, What("Unit System") === "imperial" ? fields[weaKey] : ConvertToMetric(fields[weaKey], 0.5), weaKey !== "Description" ? "" : What("Unit System") === "imperial" ? fields.Description_Tooltip : ConvertToMetric(fields.Description_Tooltip, 0.5));
				break;
			 case "Ammo" :
				if (fields[weaKey]) AddAmmo(fields[weaKey]);
				break;
			 default :
				Value(keyFld, fields[weaKey]);
			};
		};
		if (resetFlds.length) tDoc.resetForm(resetFlds);
	} else if (CurrentProfs.weapon.otherWea) { //if not a known weapon or an empty field, still check if we need to set the checkmark for proficiency
		var matchTxt = CurrentWeapons.field[ArrayNmbr].toLowerCase();
		for (var i = 0; i < CurrentProfs.weapon.otherWea.length; i++) {
			var weaProf = CurrentProfs.weapon.otherWea[i];
			if (!WeaponsList[weaProf] && matchTxt.indexOf(weaProf.toLowerCase()) !== -1) {
				Checkbox(fldBase + "Proficiency", true);
				break;
			};
		};
	};
	thermoM(thermoTxt, true); // Stop progress bar
};

//calculate the attack damage and to hit, can be called from any of the attack fields (sets the fields)
function CalcAttackDmgHit(fldName) {
	if (CurrentVars.manual.attacks) return; //if the attack calculation is set to manual, don't do anything

	fldName = fldName ? fldName : event.target.name;
	var QI = fldName.indexOf("Comp.") === -1;
	var Q = QI ? "" : "Comp.Use.";
	var prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var fldNmbr = fldName.replace(/.*Attack\.(\d+?)\..+/, "$1");
	var ArrayNmbr = Number(fldNmbr) - 1;
	var fldBase = prefix + Q + "Attack." + fldNmbr + ".";
	var fldBaseBT = prefix + "BlueText." + Q + "Attack." + fldNmbr + ".";
	var fields = {
		Proficiency : tDoc.getField(fldBase + "Proficiency").isBoxChecked(0),
		Mod : What(fldBase + "Mod"),
		Range : What(fldBase + "Range"),
		Damage_Type : What(fldBase + "Damage Type"),
		Description : What(fldBase + "Description"),
		To_Hit_Bonus : What(fldBaseBT + "To Hit Bonus"),
		Damage_Bonus : What(fldBaseBT + "Damage Bonus"),
		Damage_Die : What(fldBaseBT + "Damage Die")
	};

	var thisWeapon = QI ? CurrentWeapons.known[ArrayNmbr] : CurrentWeapons.compKnown[prefix][ArrayNmbr];
	var WeaponName = thisWeapon[0];
	var aWea = QI || isNaN(parseFloat(WeaponName)) ? WeaponsList[WeaponName] : !QI && !isNaN(parseFloat(WeaponName)) && CurrentCompRace[prefix] && CurrentCompRace[prefix].attacks ? CurrentCompRace[prefix].attacks[WeaponName] : false;
	var WeaponText = QI ? CurrentWeapons.field[ArrayNmbr] : CurrentWeapons.compField[prefix][ArrayNmbr];
	var theWea = {};
	if (aWea && aWea.baseWeapon && WeaponsList[aWea.baseWeapon]) {
		for (var attr in WeaponsList[aWea.baseWeapon]) theWea[attr] = WeaponsList[aWea.baseWeapon][attr];
	}
	if (aWea) for (var attr in aWea) theWea[attr] = aWea[attr];
	var fixedCaster = theWea.useSpellMod && CurrentSpells[theWea.useSpellMod] ? CurrentSpells[theWea.useSpellMod] : false;
	var aWeaNoAbi = theWea.ability === 0 || (fixedCaster && fixedCaster.fixedDC && fixedCaster.abilityToUse && !fixedCaster.abilityToUse[0]);

	if (!WeaponText || ((/^(| |empty)$/).test(fields.Mod) && !aWeaNoAbi)) {
		Value(fldBase + "Damage", "");
		Value(fldBase + "To Hit", "");
		if (QI) CurrentWeapons.offHands[ArrayNmbr] = false;
		return;
	};

	// only add the description part now, so we don't test against it above
	if (fields.Description) WeaponText += " " + fields.Description;

	// get the damage bonuses from the selected modifier, magic, and the blueText field
	var output = {
		prof : !fields.Proficiency ? 0 : (QI ? (tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0) ? 0 : Number(How("Proficiency Bonus"))) : (tDoc.getField(prefix + "BlueText.Comp.Use.Proficiency Bonus Dice").isBoxChecked(0) ? 0 : What(prefix + "Comp.Use.Proficiency Bonus"))),
		die : fields.Damage_Die,
		modToDmg : thisWeapon[2],
		mod : !fields.Mod || fields.Mod === "empty" ? 0 : What(prefix + fields.Mod),
		magic : thisWeapon[1],
		bHit : fields.To_Hit_Bonus,
		bDmg : fields.Damage_Bonus,
		extraDmg : 0,
		extraHit : 0
	};

	// define some variables that we can check against later or with the CurrentEvals
	var isDC = (/dc/i).test(fields.To_Hit_Bonus), spTypeShort = isDC ? "dc" : "atk", spTypeFull = isDC ? "dc" : "attack";

	// Gather some information on the weapon
	var isSpell = thisWeapon[3] || (theWea && (/cantrip|spell/i).test(theWea.type)) || (!theWea && (/\b(cantrip|spell)\b/i).test(WeaponText)) ? true : false;
	var isWeapon = !isSpell || (isSpell && theWea && !(/cantrip|spell/i).test(theWea.type));
	var isMeleeWeapon = isWeapon && (/melee/i).test(fields.Range);
	var isRangedWeapon = isWeapon && (/^(?!.*melee).*\d+.*$/i).test(fields.Range);
	var isNaturalWeapon = isWeapon && theWea && (/natural/i).test(theWea.type);

	// see if this is a off-hand attack and the modToDmg shouldn't be use
	var isOffHand = isMeleeWeapon && (/^(?!.*(spell|cantrip))(?=.*(off.{0,3}hand|secondary)).*$/i).test(WeaponText);
	if (isOffHand) output.modToDmg = output.mod < 0;
	// Add the off-hand attack action (only for attacks on the first page)
	if (QI && CurrentWeapons.offHands[ArrayNmbr] !== isOffHand) {
		CurrentWeapons.offHands[ArrayNmbr] = isOffHand;
		SetOffHandAction();
	}

	// Run special To Hit / Damage calculation functions added by features, but only for attacks on the first page
	if (QI && CurrentEvals.atkCalc) {

		var gatherVars = {
			WeaponText : WeaponText,
			WeaponTextName : WeaponText.replace(" " + fields.Description, ""),
			isDC : isDC,
			isSpell : isSpell,
			isWeapon : isWeapon,
			isMeleeWeapon : isMeleeWeapon,
			isRangedWeapon : isRangedWeapon,
			isNaturalWeapon : isNaturalWeapon,
			theWea : theWea,
			WeaponName : WeaponName,
			baseWeaponName : theWea.baseWeapon ? theWea.baseWeapon : WeaponName,
			thisWeapon : thisWeapon,
			isOffHand : isOffHand
		}

		for (var i = 0; i < CurrentEvals.atkCalcOrder.length; i++) {
			var evalName = CurrentEvals.atkCalcOrder[i][1];
			var evalThing = CurrentEvals.atkCalc[evalName];
			if (!evalThing) continue;
			try {
				if (typeof evalThing == 'string') {
					eval(evalThing);
				} else if (typeof evalThing == 'function') {
					evalThing(fields, gatherVars, output);
				}
			} catch (error) {
				var eText = "The custom CalcAttackDmgHit/atkCalc script '" + evalName + "' produced an error! It will be removed from the sheet for now, but please contact the author of the feature to have this issue corrected:\n " + error;
				for (var e in error) eText += "\n " + e + ": " + error[e];
				console.println(eText);
				console.show();
				CurrentEvals.atkCalcOrder.splice(i, 1);
				i--;
			}
		}

		// The useSpellMod might've been changed
		fixedCaster = theWea.useSpellMod && CurrentSpells[theWea.useSpellMod] ? CurrentSpells[theWea.useSpellMod] : false;
	};

	// Add the BlueText field value of the corresponding spellcasting class
	var spCaster = false;
	var abiScoreNo = tDoc.getField(fldBase + "Mod").currentValueIndices;
	if (fixedCaster) {
		spCaster = [theWea.useSpellMod];
		if (fixedCaster.blueTxt && fixedCaster.blueTxt[spTypeShort]) {
			// Add the modifier bonus field for the specific caster
			output.extraHit += EvalBonus(fixedCaster.blueTxt[spTypeShort], true);
		}
		if (fixedCaster && fixedCaster.abilityToUse && fixedCaster.abilityToUse[0] != abiScoreNo) {
			// Set the ability modifier to use the modifier of the ability score
			abiScoreNo = fixedCaster.abilityToUse[0];
			tDoc.getField(fldBase + "Mod").currentValueIndices = abiScoreNo;
		}
		if (!abiScoreNo) output.mod = 0; // if ability is 0, set the modifier to 0 as well
		if (!abiScoreNo && fixedCaster.fixedDC) {
			// If fixedDC, we need to replace the ability modifier and proficiency bonus with the fixed value
			// abilityToUse[0] / abiScoreNo is going to be 0, so we will only have to change the Prof
			output.prof = fixedCaster.fixedDC - 8;
		} else if (!QI) {
			// If on the companion page, use the ability modifier and proficiency bonus from the main character
			if (abiScoreNo) output.mod = Number( What( ["", "Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"][abiScoreNo] + " Mod" ) );
			output.prof = tDoc.getField("Proficiency Bonus Dice").isBoxChecked(0) ? 0 : Number(How("Proficiency Bonus"));
		}
	} else if (QI && thisWeapon[3] && thisWeapon[4].length) {
		var abiBonArr = thisWeapon[4].map( function(sClass) {
			var ExtraBonus = CurrentSpells[sClass] && CurrentSpells[sClass].abilityToUse && CurrentSpells[sClass].abilityToUse[0] == abiScoreNo && CurrentSpells[sClass].blueTxt && CurrentSpells[sClass].blueTxt[spTypeShort] ? CurrentSpells[sClass].blueTxt[spTypeShort] : 0;
			return EvalBonus(ExtraBonus, true);
		});
		var highestBon = Math.max.apply(Math, abiBonArr);
		if (highestBon) {
			spCaster = [];
			for (var i = 0; i < abiBonArr.length; i++) {
				if (abiBonArr[i] == highestBon) spCaster.push(thisWeapon[4][i]);
			}
			output.extraHit += highestBon;
		}
	};
	// Now the spellCalc custom functions
	if ( CurrentEvals.spellCalc &&
		( (fixedCaster && !fixedCaster.fixedDC) || (QI && isSpell && !fixedCaster) )
	) {
		// get the variables we need to pass to the function
		var spCasters = spCaster ? spCaster : !thisWeapon[4].length ? [] : thisWeapon[4].map( function(sClass) {
			return CurrentSpells[sClass] && CurrentSpells[sClass].ability == abiScoreNo ? sClass : "";
		});

		for (var i = 0; i < CurrentEvals.spellCalcOrder.length; i++) {
			var evalName = CurrentEvals.spellCalcOrder[i][1];
			var evalThing = CurrentEvals.spellCalc[evalName];
			if (!evalThing || typeof evalThing !== 'function') continue;
			try {
				var addSpellNo = evalThing(spTypeFull, spCasters, abiScoreNo, thisWeapon[3]);
				if (!isNaN(addSpellNo)) output.extraHit += Number(addSpellNo);
			} catch (error) {
				var eText = "The custom spell attack/DC (spellCalc) script '" + evalName + "' produced an error! It will be removed from the sheet for now, but please contact the author of the feature to have this issue corrected:\n " + error;
				for (var e in error) eText += "\n " + e + ": " + error[e];
				console.println(eText);
				console.show();
				delete CurrentEvals.spellCalc[evalName];
				CurrentEvals.spellCalcOrder.splice(i, 1);
				i--;
			}
		}
	}

	// Now we parse all that information to a total
	var dmgDie = "";
	var dmgNum = 0;
	var hitNum = 0;
	var addNum = function(inP, DmgHit) {
		inP = Number(inP);
		if (isNaN(inP)) inP = 0;
		if (!DmgHit || (/dmg/i).test(DmgHit)) dmgNum += inP;
		if (!DmgHit || (/hit/i).test(DmgHit)) hitNum += inP;
	};

	// no longer consider it a DC if Players Make All Rolls is enabled
	if (tDoc.getField("BlueText.Players Make All Rolls").isBoxChecked(0)) isDC = false;
	for (var out in output) {
		switch (out) {
		// The damage die
		 case "die" :
			dmgDie = EvalDmgDie(output[out], QI ? true : prefix);
			break;
		 case "mod" :
		// Add modifier to Damage if set to do so
			if (output.modToDmg) addNum(output[out], "dmg");
		 case "prof" :
		// Both modifier and proficiency are added to the To Hit
			addNum(output[out], "hit");
			break;
		// Extra To Hit / Damage from custom functions
		 case "extraHit" :
		 case "extraDmg" :
			addNum(output[out], out);
			break;
		// Bluetext/Modifier fields
		 case "bHit" :
			if (isDC) {
				// Also add 8 if this is for a DC and not a forced overwrite
				addNum(8, "hit");
			};
		 case "bDmg" :
			addNum(EvalBonus(output[out], QI ? true : prefix), out);
			break;
		// Add magic bonus to both To Hit and Damage
		 case "magic" :
			addNum(output[out]);
			break;
		// Ignore all the rest
		 default :
			break;
		};
	};
	// Further modify the string for the damage die and add the damage
	if (!isNaN(Number(dmgDie))) dmgDie = Number(dmgDie);
	if (dmgDie && isNaN(dmgDie) && Number(dmgNum) > 0) dmgNum = "+" + dmgNum;
	var dmgTot = dmgDie === "\u2015" || dmgDie === "-" ? dmgDie : dmgDie + (dmgNum === 0 ? "" : dmgNum);
	// The to hit total
	var hitTot = (isDC ? "DC " : (hitNum >= 0 ? "+" : "")) + hitNum;

	// Set the values to the sheet
	Value(fldBase + "Damage", dmgTot == 0 ? "" : dmgTot);
	if (event.target && event.target.name && (/.*Attack.*To Hit/).test(event.target.name)) {
		event.value = fields.Range === "With melee wea" ? "" : hitTot;
	} else {
		Value(fldBase + "To Hit", fields.Range === "With melee wea" ? "" : hitTot);
	};
};

//see if the bonus action for Off-hand attack is needed or not
function SetOffHandAction() {
	var areOffHands = CurrentWeapons.offHands.some( function(n) { return n});
	tDoc[(areOffHands ? "Add" : "Remove") + "Action"]("bonus action", "Off-hand Attack");
};

//a way to show a very long piece of text without the dialog overflowing the screen
function ShowDialog(hdr, strng) {
	if (strng === "sources") { // ShowDialog("List of Sources, sorted by abbreviation", "sources");
		strng = "";
		var srcRef = {};
		var srcArr = {};
		var srcGroups = [];
		for (var src in SourceList) {
			var tSrc = SourceList[src];
			srcRef[tSrc.abbreviation] = src;
			var tGroup = !tSrc.group || tSrc.group === "default" ? "\u200B\u200Bother" : tSrc.group === "Primary Sources" ? tSrc.group : "\u200B" + tSrc.group;
			if (!srcArr[tGroup]) srcArr[tGroup] = [];
			srcArr[tGroup].push(tSrc.abbreviation);
			if (srcGroups.indexOf(tGroup) === -1) srcGroups.push(tGroup);
		};
		srcGroups.sort();
		for (var group in srcArr) srcArr[group].sort();
		for (var i = 0; i < srcGroups.length; i++) {
			strng += "\n\n" + srcGroups[i].replace(/\u200B/g, "") + ":";
			var tArr = srcArr[srcGroups[i]];
			for (var j = 0; j < tArr.length; j++) {
				var theSrc = srcRef[tArr[j]];
				strng += "\n\u2022 " + (SourceList[theSrc].abbreviation + "            ").substr(0,12) + "\t" + SourceList[theSrc].name;
			};
		};
	}
	var ShowString_dialog = {
		initialize : function(dialog) {
			dialog.load({
				"Eval" : strng.replace(/^(\r|\n)*/, "")
			});
		},
		description : {
			name : "SIMPLE TEXT DIALOG",
			first_tab : "CLOS",
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : [{
					type : "view",
					elements : [{
						type : "view",
						align_children : "align_row",
						elements : [{
							type : "static_text",
							item_id : "head",
							alignment : "align_fill",
							font : "heading",
							bold : true,
							wrap_name : true,
							width : 548,
							name : hdr
						}, {
							type : "edit_text",
							item_id : "ding",
							alignment : "align_fill",
							readonly : true,
							height : 1,
							width : 1
						}]
					}, {
						type : "edit_text",
						item_id : "Eval",
						alignment : "align_fill",
						readonly : true,
						multiline: true,
						height : 500,
						width : 550
					}, {
						type : "gap",
						height : 5
					}]
				}, {
					type : "view",
					alignment : "align_fill",
					align_children : "align_center",
					elements : [{
						type : "ok",
						item_id : "CLOS",
						alignment : "align_right",
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
	app.execDialog(ShowString_dialog);
};

//calculate the mod for the Dex field in the initiative section (field calculation)
function CalcInitDexMod() {
	var QI = getTemplPre(event.target.name, "AScomp");
	event.value = QI === true ? What(SkillsList.abilityScores[SkillsList.abbreviations.indexOf("Init")] + " Mod") : What(QI + "Comp.Use.Ability.Dex.Mod");
};

function FunctionIsNotAvailable() {
	app.alert({
		nIcon : 0,
		cTitle : "Please update your Adobe Acrobat",
		cMsg : "This feature doesn't work (correctly) with the version of Adobe Acrobat you are using. This version of Adobe Acrobat is not supported for use with MPMB's D&D 5e Character Tools. Please update to Adobe Acrobat DC.\n\nYou can get Adobe Acrobat Reader DC for free at https://get.adobe.com/reader/"
	});
};

// a way to eval the content of a modifier field; prefix === true if it is the character (true) or a string if it is for a companion page (the prefix of the companion page); if isSpecial === "test" it will output undefined if an error occurs; if isSpecial is a number it will look for that entry on the Wild Shape page with the corresponding prefix variable as a prefix;
function EvalBonus(input, prefix, isSpecial) {
	if (!input) {
		return 0;
	} else if (!isNaN(input)) {
		return Number(input);
	};
	var modStr = prefix === true ? ["", " Mod"] : !isSpecial || isSpecial === "test" ? [prefix + "Comp.Use.Ability.", ".Mod"] : [prefix + "Wildshape." + isSpecial + ".Ability.", ".Mod"];
	var ProfB = prefix === true ? Number(How("Proficiency Bonus")) : !isSpecial || isSpecial === "test" ? What(prefix + "Comp.Use.Proficiency Bonus") : What(prefix + "Wildshape." + isSpecial + ".Proficiency Bonus");
	// remove 'dc' and convert commas to dots for decimal handling
	input = input.replace(/,/g, ".").replace(/dc/ig, "");
	// add a "+" between abbreviations that have no operator. Do this twice, so we also catch uneven groups
	var abbrRegex = /(o?(Str|Dex|Con|Int|Wis|Cha|HoS|Prof))(o?(Str|Dex|Con|Int|Wis|Cha|HoS|Prof))/ig;
	input = input.replace(abbrRegex, "$1+$3").replace(abbrRegex, "$1+$3");
	// removing double or trailing operators and replace double minus with a plus
	input = input.replace(/[+-/*]+([+/*])/g, "$1").replace(/--/g, "+").replace(/^[+/*]+|[+-/*]+$/g, "");
	// change ability score abbreviations with their modifier
	["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"].forEach(function(AbiS) {
		input = input.replace(RegExp("o" + AbiS, "ig"), Number(What(AbiS + " Mod")));
		input = input.replace(RegExp(AbiS, "ig"), Number(What(modStr[0] + AbiS + modStr[1])));
	});
	// change Prof with the proficiency bonus
	input = input.replace(/oProf/ig, How("Proficiency Bonus")).replace(/Prof/ig, ProfB);
	// allow min/max input
	var minMaxMatches;
	var minMaxRegex = /(max|min)(\([+-.0-9]+(?:\|[+-.0-9]+)+\))/i;
	while (minMaxMatches = minMaxRegex.exec(input)) {
    	input = input.replace(minMaxMatches[0], "Math." + minMaxMatches[1].toLowerCase() + minMaxMatches[2].split("|"));
	}
	// double negative to positive
	input = input.replace(/--/g, "+");
	try {
		output = eval_ish(input);
		return !isNaN(output) ? Math.floor(Number(output)) : 0;
	} catch (err) {
		return isSpecial === "test" ? undefined : 0;
	};
};

// a way to eval the content of a weapon damage die field; notComp if it is the character (true) or if it is for a companion page (the prefix of the companion page); if isSpecial === "test" it will output _ERROR_ for the part that produces an error;
function EvalDmgDie(input, notComp, isSpecial) {
	if (!input) {
		return 0;
	} else if (!isNaN(input)) {
		return Number(input);
	};
	// resolve the C, B, and Q for cantrip die, if present
	if ((/^(?=.*(B|C|Q))(?=.*d\d).*$/).test(input)) { //if this involves a cantrip calculation
		var cLvl = Number(notComp === true ? What("Character Level") : What(notComp + "Comp.Use.HD.Level"));
		var cDie = cantripDie[Math.min(Math.max(cLvl, 1), cantripDie.length) - 1];
		input = input.replace(/cha/ig, "kha").replace(/con/ig, "kon");
		input = input.replace(/C/g, cDie).replace(/B/g, cDie - 1).replace(/Q/g, cDie + 1).replace(/0.?d\d+/g, 0);
		input = input.replace(/kha/g, "Cha").replace(/kon/g, "Con");
	};
	if (input[0] == "=") { // only if a string staring with "=" does it mean that it wants to be calculate to values
		input = input.substr(1).split("_").map(function(u) {
			return u.split("d").map(function(v) {
				try {
					var theEval = EvalBonus(v, notComp, isSpecial);
					return theEval === undefined ? "_ERROR_" : theEval;
				} catch (errV) {
					return v;
				};
			}).join("d");
		}).join("+");
	};
	return input;
};

// add a way to set the value of a field
function SetThisFldVal() {
	var len = typePF ? 4 : 3;
	if (event.target.submitName || event.target.value.length > len || event.modifier || event.shift) {
		var QI = getTemplPre(event.target.name, "AScomp");
		var dmgDie = event.target.name.indexOf("Damage Die") !== -1;
		var isSkill = !dmgDie && QI === true && (RegExp("^(" + SkillsList.abbreviations.join("|") + ") Bonus$")).test(event.target.name);
		var isAcFld = !isSkill && QI === true && (/^AC/).test(event.target.name);
		var theName = event.target.userName;
		if (theName && (/\n/).test(theName)) {
			theName = theName.match(/.*\n/)[0].replace(/\n/, "");
		};
		var theVal = event.target.value;
		if (!isNaN(theVal)) theVal = theVal.toString();
		var theExpl = event.target.submitName.replace(/^\n*/, "");
		var theDialTxt = (dmgDie ? "If you want the Damage Die to be a calculated value, and not just a string, make sure the first character is a '='.\nRegardless of the first character, a 'C' will be replaced with the Cantrip die, a 'B' with the Cantrip die minus 1, and a 'Q' with the Cantrip die plus 1.\n\nIf a calculated value (=), you can use underscores to keep the strings separate. For the calculated parts, y" : "Y") + "ou can use numbers, logical operators (+, -, /, *), ability score abbreviations (Str, Dex, Con, Int, Wis, Cha" + (QI === true ? ", HoS" : "") + "), and 'Prof'.";
		var theDialTxt1 = "If the above calculates to 'ERROR', the field will not be changed.\nNote that the field won't appear to change until you click/tab out of it."
		var theDialTxt2 = "You can also determine the maximum or minimum of a group with 'min(1|2)' or 'max(1|2)', using pipe '|' as the separator.";
		if (QI !== true) theDialTxt2 += "\n\nIn addition, you can use the values from the character (the 1st page) by adding the letter 'o' before the variable (oStr, oDex, oCon, oInt, oWis, oCha, oHoS, oProf).";
		if (isSkill) theDialTxt2 += "\n\nYou don't need to add bonuses from \"Jack of All Trades\" or \"Remarkable Athelete\" as they are automatically added, if enabled.";
		var theDialTxt3 = "\nSome examples with a Strength of 18 (+4):";
		var theDialTxt3sub = [
			["INPUT\nStr\nStr-1\nStr*2", 5, "align_left"],
			["RESULT\n4\n3\n8", 5, "align_center"],
			["gap"],
			["INPUT\nmax(Str|1)\nmin(Str|1)\nmin(Str|3)*2+1", 8, "align_left"],
			["RESULT\n4\n1\n7", 5, "align_center"]
		];
		var theDialTxt4 = "The field will display a number only after looking at the conditions above. Thus, the shown value might be different from what you see calculated in this dialog.";
		var theDialog = {
			notComp : QI,
			isDmgDie : dmgDie,
			theExp : theExpl,
			theTXT : theVal,
			initialize : function (dialog) {
				var toLoad = { "user" : this.theTXT };
				if (this.theTXT) {
					var calcVal = this.isDmgDie ? EvalDmgDie(this.theTXT, this.notComp, "test") : EvalBonus(this.theTXT, this.notComp, "test");
					toLoad["rslt"] = calcVal === undefined ? "ERROR" : calcVal.toString();
				};
				if (this.theExp) {
					toLoad["expl"] = this.theExp;
				};
				dialog.load(toLoad);
				dialog.setForeColorRed("warn");
			},
			commit : function (dialog) {
				var oResult = dialog.store();
				this.theTXT = oResult["user"];
			},
			calc : function (dialog) {
				var oResult = dialog.store()["user"];
				var calcVal = this.isDmgDie ? EvalDmgDie(oResult, this.notComp, "test") : EvalBonus(oResult, this.notComp, "test");
				dialog.load({
					"rslt" : calcVal === undefined ? "ERROR" : calcVal.toString()
				});
			},
			description : {
				name : "SET MODIFIER DIALOG",
				elements : [{
					type : "view",
					align_children : "align_left",
					elements : [{
						type : "static_text",
						item_id : "head",
						alignment : "align_fill",
						font : "heading",
						bold : true,
						wrap_name : true,
						char_width : 40,
						name : theName ? theName : "Set the field's value"
					}, {
						type : "cluster",
						alignment : "align_fill",
						name : "Fill out the value you want to set",
						font : "dialog",
						bold : true,
						elements : [{
							type : "static_text",
							alignment : "align_left",
							item_id : "txt0",
							font : "palette",
							name : theDialTxt,
							char_width : 35,
							wrap_name : true
						}, {
							type : "static_text",
							alignment : "align_left",
							item_id : "txt2",
							font : "palette",
							name : theDialTxt2,
							char_width : 35,
							wrap_name : true
						}].concat(dmgDie || theExpl ? [] : [{
							type : "static_text",
							alignment : "align_left",
							item_id : "txt3",
							font : "palette",
							char_width : 35,
							wrap_name : true,
							name : theDialTxt3
						}, {
							type : "view",
							alignment : "align_center",
							align_children : "align_row",
							elements : theDialTxt3sub.map(function (entry, idx) {
								if (entry[0] === "gap") {
									return { type : "gap", char_width : 3 };
								}
								return {
									type : "static_text",
									alignment : entry[2],
									item_id : "txt" + (6+idx),
									char_width : entry[1],
									font : "palette",
									wrap_name : true,
									name : entry[0] 
								};
							})
						}]).concat([{
							type : "edit_text",
							alignment : "align_left",
							item_id : "user",
							char_width : 35,
							height : 20
						}, {
							type : "view",
							align_children : "align_distribute",
							char_width : 35,
							elements : [{
								type : "static_text",
								alignment : "align_left",
								item_id : "txtC",
								name : "This calculates to:",
								char_width : 1,
								height : 25
							}, {
								type : "static_text",
								alignment : "align_left",
								item_id : "rslt",
								font : "dialog",
								bold : true,
								name : "0",
								char_width : 8,
								height : 25
							}, {
								type : "button",
								alignment : "align_left",
								item_id : "calc",
								name : "<< Re-Calculate This"
							}]
						}])
					}, {
						type : "static_text",
						alignment : "align_fill",
						item_id : "txt1",
						wrap_name : true,
						name : theDialTxt1,
						char_width : 35
					}].concat(theExpl ? [{
						type : "cluster",
						alignment : "align_fill",
						name : "Modifiers set by class features, race, feats, or magic items",
						font : "dialog",
						bold : true,
						elements : [{
							type : "edit_text",
							item_id : "expl",
							alignment : "align_fill",
							readonly : true,
							multiline: true,
							char_width : 35,
							height : 200
						}].concat(!isAcFld ? [] : {
							type : "static_text",
							alignment : "align_fill",
							item_id : "warn",
							wrap_name : true,
							name : theDialTxt4,
							char_width : 35
						})
					}] : []).concat([{
						type : "ok_cancel"
					}])
				}]
			}
		};
		if (app.execDialog(theDialog) === "ok") {
			event.target.value = theDialog.theTXT;
		};
	};
};

// add a modifier to a modifier field so that the formula stays intact; Remove is boolean
function AddToModFld(Fld, Mod, Remove, NameEntity, Explanation) {
	if (!tDoc.getField(Fld)) return;
	var aFld = What(Fld);
	var setFld = "";
	var bContinueWithString = true;
	if (!isNaN(Mod)) { // a static number
		Mod = Remove ? -1 * Mod : Number(Mod);
		var noRegEx = /((^|\+|[^*/]-)\d+)(?:($|\+|-))/;
		if (!isNaN(aFld)) {
			setFld = Number(aFld) + Mod;
		} else if (noRegEx.test(aFld)) {
			var FldNum = Number(aFld.match(noRegEx)[1]);
			var FldNumNew = FldNum + Mod;
			setFld = aFld.replace(noRegEx, (FldNumNew < 0 ? "" : "+") + FldNumNew + "$3");
		} else {
			setFld = aFld + (Mod < 0 ? "" : "+") + Mod;
		};
		bContinueWithString = false;
	} else if (/^\d*d\d+$/i.test(Mod)) { // a die
		var sDieSize = Mod.replace(/^\d*(d\d+)$/i, "$1");
		var sDieNo = /^1?d\d+$/i.test(Mod) ? 1 : Number(Mod.replace(/^(\d+)d\d+$/i, "$1"));
		var rDieSize = RegExp("\\+?(-?\\d*)" + sDieSize, "i");
		var mFldDice = aFld.match(rDieSize);
		if (mFldDice) { // if not a match, continue later with adding as a string
			var sDieNewNo = Remove ? Number(mFldDice[1]) - sDieNo : Number(mFldDice[1]) + sDieNo;
			var sDieNewFull = sDieNewNo === 0 ? "" : (sDieNewNo > -1 ? "+" : "") + sDieNewNo + sDieSize;
			setFld = aFld.replace(mFldDice[0], sDieNewFull);
			bContinueWithString = false;
		}
	}
	if (bContinueWithString) {
		if (Remove) { // remove string
			setFld = aFld.replace(RegExp("\\+?" + Mod.RegEscape(), "i"), "");
		} else { // add string
			setFld = (aFld ? aFld : "") + (Mod.substr(0, 1) === "-" ? "" : "+") + Mod;
		};
	};
	// remove zeroes
	setFld = setFld.replace(/[\+-/*]0([\+-/*]|$)/g, "$1");
	// remove useless leading things
	while (isNaN(setFld) && (/[+*/0]/).test(setFld[0])) {
		setFld = setFld.substr(1);
	}
	if (setFld == 0) setFld = "";
	var theSubmit = How(Fld);
	if (NameEntity && Explanation) {
		var theAdd = "\n\n" + toUni(NameEntity) + "\n" + Explanation;
		if (Remove) {
			theSubmit = theSubmit.replace(theAdd, "");
			// in case unicode use has changed between adding and removing
			theSubmit = theSubmit.replace("\n\n" + NameEntity + "\n" + Explanation, "");
		} else {
			theSubmit += theAdd;
		};
	};
	Value(Fld, setFld, undefined, theSubmit);
};

// add a modifier to a skill
// addMod : {type : "save", field : "all", mod : "Cha", text : "While I'm conscious I can add my Charisma modifier (min 1) to all my saving throws."} // this can be an array of objects, all of which will be processed
function processMods(AddRemove, NameEntity, items, prefix) {
	var QI = !prefix && (!event.target || !event.target.name || event.target.name.indexOf("Comp.") === -1);
	if (!prefix) prefix = QI ? "" : getTemplPre(event.target.name, "AScomp", true);
	var alphaB = Who("Text.SkillsNames") === "alphabeta";
	if (!isArray(items)) items = [items];
	var doSaveDcUpdate = false;
	for (var i = 0; i < items.length; i++) {
		var type = items[i].type.toLowerCase();
		var Fld = items[i].field;
		var Mod = items[i].mod;
		var Explanation = items[i].text;
		switch (type) {
			case "initiative" :
				Fld = QI ? "Init Bonus" : prefix + "Comp.Use.Combat.Init.Bonus";
			case "skill" :
				if ((/^all/i).test(Fld)) {
					Fld = QI ? "All Skills Bonus" : prefix + "BlueText.Comp.Use.Skills.All.Bonus";
				} else if ((/^pass/i).test(Fld)) {
					Fld = QI ? "Passive Perception Bonus" : prefix + "BlueText.Comp.Use.Skills.Perc.Pass.Bonus";
				} else {
					var skill = Fld.substr(0,4).capitalize();
					if (SkillsList.abbreviations.indexOf(skill) === -1) {
						skill = skill.substr(0,3);
						if (SkillsList.abbreviations.indexOf(skill) === -1) continue;
					};
					var skillOrder = alphaB || (!QI && !typePF) ? "abbreviations" : "abbreviationsByAS";
					var skillAbbr = SkillsList.abbreviations[SkillsList[skillOrder].indexOf(skill)];
					Fld = QI ? skillAbbr + " Bonus" : skillAbbr == "Init" ? prefix + "Comp.Use.Combat.Init.Bonus" : prefix + "BlueText.Comp.Use.Skills." + skillAbbr + ".Bonus";
				};
				break;
			case "save" :
				var matchSv = QI ? /.*(Str|Dex|Con|Int|Wis|Cha|HoS|All).*/i : /.*(Str|Dex|Con|Int|Wis|Cha|All).*/i;
				if (!matchSv.test(Fld)) continue;
				var save = Fld.replace(matchSv, "$1").capitalize();
				if (save === "Hos") save = "HoS";
				Fld = QI ? save + " ST Bonus" : prefix + "BlueText.Comp.Use.Ability." + save + ".ST.Bonus";
				break;
			case "dc" :
				var rxAbi = /.*(Str|Dex|Con|Int|Wis|Cha|HoS).*/i;
				if (!QI || !rxAbi.test(Fld)) continue; // doesn't work on companion pages
				var sAbi = Fld.replace(rxAbi, "$1").capitalize();
				for (var i = 1; i <= 2; i++) {
					if (What("Spell DC " + i + " Mod").indexOf(sAbi) !== -1) {
						Fld = "Spell DC " + i + " Bonus";
						doSaveDcUpdate = true;
						continue;
					}
				}
				break;
			default :
				Fld = prefix + Fld;
				if (!tDoc.getField(Fld)) continue;
		};
		AddToModFld(Fld, Mod, !AddRemove, NameEntity, Explanation);
	};
	if (doSaveDcUpdate) SaveTheAbilitySaveDCsBonuses();
};

// a way to pass an array of action strings or arrays to be processed by the Add/RemoveAction functions
// ["action", " (with Attac)"] or [["action", " (start)"], ["bonus action", " (end)"]]
function processActions(AddRemove, srcNm, itemArr, itemNm) {
	if (!itemArr) return;
	if (!isArray(itemArr) || (itemArr.length === 2 && !isArray(itemArr[0]) && !isArray(itemArr[1]) && (/^(?!.*action).*$|\(.*\)|\[.*\]/i).test(itemArr[1]))) {
		itemArr = [itemArr];
	};
	for (var i = 0; i < itemArr.length; i++) {
		var theAct = isArray(itemArr[i]) ? itemArr[i] : [itemArr[i], ""];
		var actNm = theAct[1] && !(/^( |-|,|\(|\[|\{|'|"|\/)/).test(theAct[1]) ? theAct[1] : itemNm + (theAct[1] == undefined ? "" : theAct[1]);
		if (AddRemove) {
			AddAction(theAct[0], actNm, srcNm, theAct[2] ? theAct[2] : false);
		} else if (theAct[2]) {
			AddAction(theAct[0], theAct[2], srcNm, actNm);
		} else {
			RemoveAction(theAct[0], actNm, srcNm);
		}
	};
};

// a way to pass an array of tools to be processed by the SetProf function
// [["Musical instrument", 3], ["Thieves' tools", "Dex"]]
// "Land vehicles"
function processTools(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	if (!isArray(itemArr) || (itemArr.length === 2 && !isArray(itemArr[0]) && !isArray(itemArr[1]) && (!isNaN(itemArr[1]) || AbilityScores.fields[itemArr[1].substr(0,3).toLowerCase()]))) {
		itemArr = [itemArr];
	};
	for (var i = 0; i < itemArr.length; i++) {
		var subj = itemArr[i];
		if (isArray(subj)) {
			var prof = subj[0];
			var extra = subj[1];
		} else {
			var prof = subj;
			var extra = false;
		};
		SetProf("tool", AddRemove, prof, srcNm, extra);
	};
};

// a way to pass an array of languages to be processed by the SetProf function
// ["Elvish", 3] >> elvish and three other languages
function processLanguages(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	itemArr = isArray(itemArr) ? itemArr : [itemArr];
	for (var i = 0; i < itemArr.length; i++) {
		var subj = itemArr[i];
		if (isArray(subj)) {
			var prof = subj[0];
			var extra = subj[1];
		} else if (isNaN(subj)) {
			var prof = subj;
			var extra = false;
		} else {
			var prof = "from " + srcNm;
			var extra = subj;
		};
		SetProf("language", AddRemove, prof, srcNm, extra);
	};
};

// a way to pass an array of vision string to be processed by the SetProf function
// ["Darkvision", 60] >> Darkvision 60 ft
function processVision(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	if (!isArray(itemArr) || (itemArr.length === 2 && !isArray(itemArr[0]) && !isArray(itemArr[1]) && (!isNaN(itemArr[1]) || !isNaN(itemArr[1].substr(1))))) {
		itemArr = [itemArr];
	};
	var profsdone = {};
	for (var i = 0; i < itemArr.length; i++) {
		var subj = itemArr[i];
		if (isArray(subj)) {
			var prof = subj[0];
			var extra = subj[1];
		} else {
			var prof = subj;
			var extra = 0;
		};
		if (!profsdone[prof]) { profsdone[prof] = 1; } else { profsdone[prof] += 1; };
		var useScrNm = srcNm + (profsdone[prof] < 2 ? "" : " (" + profsdone[prof] + ")");
		SetProf("vision", AddRemove, prof, useScrNm, extra);
	};
};

// a way to pass an array of damage resistance strings or arrays to be processed by the SetProf function
// ["Slashing", "Slash. (nonmagical)"] >> Slash. (nonmagical) or Slashing if another doesn't have the nonmagical clause
function processResistance(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	if (!isArray(itemArr) || (itemArr.length === 2 && !isArray(itemArr[0]) && !isArray(itemArr[1]) && (/\(.*\)|\[.*\]/).test(itemArr[1]))) {
		itemArr = [itemArr];
	};
	for (var i = 0; i < itemArr.length; i++) {
		var theDmgres = isArray(itemArr[i]) ? itemArr[i] : [itemArr[i], false];
		SetProf("resistance", AddRemove, theDmgres[0], srcNm, theDmgres[1]);
	}
};

// a way to pass an array of save proficiency strings to be processed by the SetProf function
// ["Str", "Dex"]
function processSaves(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	if (!isArray(itemArr)) itemArr = [itemArr];
	for (var i = 0; i < itemArr.length; i++) {
		SetProf("save", AddRemove, itemArr[i], srcNm);
	}
};
// a way to pass an array of advantage/disadvantage giving arrays strings to be processed by the SetProf function
// ["Str", true] to give advantage on Strenght saves
// ["Init", false]  to give disadvantage on Initiative checks
function processAdvantages(AddRemove, srcNm, itemArr) {
	if (!itemArr || !isArray(itemArr)) return;
	if (itemArr.length == 2 && !isArray(itemArr[0])) itemArr = [itemArr];
	for (var i = 0; i < itemArr.length; i++) {
		SetProf("advantage", AddRemove, itemArr[i], srcNm);
	}
};

// a way to pass an array of skill proficiency strings to be processed by the SetProf function
// ["Persuasion", "full"]
function processSkills(AddRemove, srcNm, itemArr, descrTxt) {
	// add or remove the descrTxt
	var setDescr = false;
	if (!AddRemove) {
		if (CurrentProfs.skill.descrTxt && CurrentProfs.skill.descrTxt[srcNm]) {
			delete CurrentProfs.skill.descrTxt[srcNm];
		}
	} else {
		if (!CurrentProfs.skill.descrTxt) CurrentProfs.skill.descrTxt = {};
		if (descrTxt) {
			CurrentProfs.skill.descrTxt[srcNm] = descrTxt;
		} else {
			setDescr = true;
			descrTxt = [];
		}
	}
	if (!itemArr) {
		if (descrTxt) setSkillTooltips();
		return; // no items to process, so stop now
	}
	var getSkillAbbr = function(inSkill) {
		return SkillsList.abbreviations.indexOf(inSkill) !== -1 ? inSkill : false;
	}
	if (!isArray(itemArr) || (itemArr.length === 2 && !isArray(itemArr[0]) && !isArray(itemArr[1]) && (/full|increment|only/i).test(itemArr[1]))) itemArr = [itemArr];
	for (var i = 0; i < itemArr.length; i++) {
		var isArr = isArray(itemArr[i]);
		var aSkill = isArr ? itemArr[i][0] : itemArr[i];
		var sExp = isArr ? itemArr[i][1] : false;
		aSkill = aSkill[0].toUpperCase() + aSkill.substring(1, 4).toLowerCase();
		if (!getSkillAbbr(aSkill)) {
			aSkill = getSkillAbbr(aSkill.substring(0, 3));
			if (!aSkill) continue; // skill not found, so do the next one
		}
		SetProf("skill", AddRemove, aSkill, srcNm, sExp);
		if (setDescr) {
			var tSkill = SkillsList.names[SkillsList.abbreviations.indexOf(aSkill)];
			var eSkill = !sExp && !(/full|increment|only/i).test(sExp) ? "" : (/full/i).test(sExp) ? " expertise" : (/increment/i).test(sExp) ? " (expertise if already proficient)" : " expertise (only if already proficient)";
			descrTxt.push(tSkill + eSkill);
		}
	}
	// if we generated a new descriptive text and none was provided, add it now
	if (setDescr && descrTxt.length) CurrentProfs.skill.descrTxt[srcNm] = formatLineList(false, descrTxt);
	// then update the skill tooltips
	setSkillTooltips();
};
// Update the skill tooltips
function setSkillTooltips(noPopUp) {
	var oldTooltipTxt = Who("Acr Prof");
	if (!CurrentProfs.skill.descrTxt) CurrentProfs.skill.descrTxt = {};
	var iSet = CurrentProfs.skill.descrTxt;
	var tooltipTxt = "";
	var tooltipArr = [];
	for (var aSrc in iSet) tooltipArr.push(toUni(aSrc) + ": " + iSet[aSrc]);
	if (tooltipArr.length) {
		tooltipArr.sort();
		tooltipTxt = formatMultiList("Skill proficiencies gained from:", tooltipArr);
	}

	if (tooltipTxt == oldTooltipTxt) return; // nothing changed, so stop here

	for (i = 0; i < SkillsList.abbreviations.length; i++) {
		var theSkill = SkillsList.abbreviations[i];
		if (theSkill == "Init") continue;
		AddTooltip(theSkill + " Prof", tooltipTxt);
		AddTooltip(theSkill + " Exp", tooltipTxt);
	}
	if (!noPopUp && CurrentUpdates.types.indexOf("skills") === -1) {
		CurrentUpdates.types.push("skills");
		CurrentUpdates.skillStrOld = oldTooltipTxt.replace(/.+(\r|\n)*/, '');
	}
	AddTooltip("SkillsClick", "Click here to change the order of the skills. You can select either alphabetic order or ordered by ability score." + (tooltipTxt ? "\n\n" + tooltipTxt : ""));
}
// manual trigger for clicking the skill proficiency/expertise (MouseUp) on the 1st page
function applySkillClick(theSkill, isExp) {
	if (SkillsList.abbreviations.indexOf(theSkill) == -1) return;
	var isCheck = event.target.isBoxChecked(0) ? true : false;
	if (Who('Text.SkillsNames') !== 'alphabeta') {
		theSkill = SkillsList.abbreviationsByAS[SkillsList.abbreviations.indexOf(theSkill)];
	}
	var setExp = !isExp ? false : isCheck || (!isCheck && CurrentProfs.skill[theSkill]  && CurrentProfs.skill[theSkill].length > 1) ? "full" : "only";
	// if the proficiency is checked, but it already exists from another source, stop now
	// if the expertise is checked but it is already proficient and expertise already exists, stop now
	var alreadyProf = isCheck && CurrentProfs.skill[theSkill];
	if ((!isExp && alreadyProf) || (isExp && alreadyProf && CurrentProfs.skill[theSkill + " Prof"])) return;
	// apply the manual skill proficiency changes
	SetProf("skill", isCheck, theSkill, "manualClick", setExp);
	// if disabling manually, but set to enabled by the CurrentProfs variable, do an extra check to make sure it is manually disabled
	if (!isCheck && event.target.isBoxChecked(0)) {
		event.target.checkThisBox(0, false);
	}
}

// a way to pass an array of weapon proficiency booleans to be processed by the SetProf function
// [true, true, ["dagger", "sling"]] >> [simple, martial, [other array]]
function processWeaponProfs(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	var weaponTypes = ["simple", "martial", "other"]
	for (var i = 0; i < itemArr.length; i++) {
		if (itemArr[i] && weaponTypes[i]) {
			SetProf("weapon", AddRemove, weaponTypes[i], srcNm,
				i != 2 ? false : isArray(itemArr[i]) && itemArr[i].length ? itemArr[i] : itemArr[i] ? [itemArr[i]] : false
			);
		}
	}
};
// a way to pass an array of armour proficiency booleans to be processed by the SetProf function
// [true, true, false, false] >> [light, medium, heavy, shield]
function processArmourProfs(AddRemove, srcNm, itemArr) {
	if (!itemArr) return;
	var armorTypes = ["light", "medium", "heavy", "shields"]
	for (var i = 0; i < itemArr.length; i++) {
		if (itemArr[i] && armorTypes[i]) SetProf("armour", AddRemove, armorTypes[i], srcNm);
	}
};
// set the armour/weapon proficiency manually (field action)
function setCheckboxProfsManual(theField) {
	calcStop();
	var fld = theField ? tDoc.getField(theField) : event.target;
	var isActive = fld.isBoxChecked(0) === 1;
	var sort = (/simple|martial/i).test(fld.name) ? "weapon" : "armour";
	var type = fld.name.replace(/proficiency |armor |weapon /ig, '').toLowerCase();
	var normalState = CurrentProfs[sort][type] ? true : false;
	delete CurrentProfs[sort][type+"_manualon"];
	delete CurrentProfs[sort][type+"_manualoff"];
	if (normalState != isActive) CurrentProfs[sort][type+"_manual" + (isActive ? "on" : "off")] = true;
	SetProf(sort, undefined, type, undefined, true);
}
// do something with the manually entered 'other' weapon proficiencies (field action)
function setOtherWeaponProfsManual() {
	calcStop();
	var set = CurrentProfs.weapon;
	if (!set.otherWea) set.otherWea = { finalProfs : [], finalString : "", finalNamesNotManual : [], finalProfsNotManual : [] };
	var iSet = set.otherWea;
	var remString = iSet.finalString;
	var othWea = What("Proficiency Weapon Other Description");
	if (remString == othWea) return; // nothing changed

	var othWeaArr = othWea.split(/[/,\\\;\~\|]+ ?/); //split the current list with some commonly used separators
	var newWea = [];
	for (var i = 0; i < othWeaArr.length; i++) {
		var aWea = othWeaArr[i];
		if (!aWea) continue;
		// first test if this same name doesn't already exist by the regularly added stuff
		var testRegExp = RegExp("\\b"+aWea+"\\b", "i");
		var isKnownProf = iSet.finalNamesNotManual.some(function (wea) { return testRegExp.test(wea) });
		if (isKnownProf) continue;
		// then test if the weapon key is not already known
		var parsedWea = ParseWeapon(aWea);
		if (parsedWea && iSet.finalProfsNotManual.indexOf(parsedWea) !== -1) continue;
		// guess it isn't known, so add it
		var doWea = parsedWea ? parsedWea : aWea;
		if (newWea.indexOf(doWea) == -1) newWea.push(doWea);
	}

	var didChange = false;
	var manualWea = iSet["Manually added"] ? iSet["Manually added"].toString() : "";
	if (newWea.length) {
		// we found some manually added things, so add them
		newWea.sort();
		if (newWea.toString() != manualWea) {
			iSet["Manually added"] = newWea;
			didChange = true;
		}
	} else if (iSet["Manually added"]) {
		// nothing manually added, so remove that entry
		delete iSet["Manually added"];
		didChange = true;
	}
	if (didChange) SetProf("weapon", undefined, "other");
}

// A way to set the extra AC lines for magic / miscellaneous
function processExtraAC(AddRemove, srcNm, itemArr, parentName) {
	if (!itemArr) return;
	if (!isArray(itemArr)) itemArr = [itemArr];
	for (var i = 0; i < itemArr.length; i++) {
		if (!itemArr[i].name) itemArr[i].name = parentName ? parentName : "Undefined";
		SetProf("specialarmour", AddRemove, itemArr[i], srcNm, i.toString());
	}
}
// Function is still present for backwards-compatibility. If 'useMod' == 0, remove
function AddACMisc(useMod, useName, useText, useStopeval) {
	var makeObject = {
		name : useName,
		mod : useMod,
		text : useText,
		stopeval : useStopeval
	};
	var extra = "-addacmisc";
	// if we are removing something, we first have to fint the mod that was previously used
	if (!useMod && CurrentProfs.specialarmour[useName + extra]) {
		makeObject.mod = CurrentProfs.specialarmour[useName + extra].mod;
	}
	SetProf("specialarmour", !!useMod, makeObject, useName, extra);
}

// ProfType can be: "armour", "weapon", "save", "savetxt", "resistance", "vision", "speed", "language", or "tool"
// Add: AddRemove = true; Remove: AddRemove = false
// ProfObj is the proficiency that is gained/removed
// ProfSrce is the name of the thing granting the proficiency
// What "Extra" is, depends on ProfType
function SetProf(ProfType, AddRemove, ProfObj, ProfSrc, Extra) {
	ProfType = ProfType.toLowerCase();
	var set = CurrentProfs[ProfType];
	var ProfObjLC = typeof ProfObj == "string" ? clean(ProfObj, false, true).toLowerCase() : false;
	var metric = What("Unit System") !== "imperial";
	if (!set) return;
	if (!Extra) Extra = false;

	// function for adding all resistances of a single entry
	var DoResistance = function(keyName, skipA) {
		var aSet = CurrentProfs.resistance[keyName];
		if (!aSet || (CurrentProfs.savetxt.immune && CurrentProfs.savetxt.immune[keyName])) return;
		if (!skipA) skipA = [];
		if (aSet.merge) {
			if (skipA.indexOf(aSet.name) === -1) AddResistance(aSet.name, aSet.src);
		} else {
			for (var i = 0; i < aSet.cond.length; i++) {
				if (aSet.cond.indexOf(aSet.cond[i]) !== i) continue;
				if (skipA.indexOf(aSet.cond[i]) === -1) AddResistance(aSet.cond[i], aSet.lookup[aSet.cond[i]]);
			};
		};
	};

 switch (ProfType) {
	case "skill" : { // Extra is if the skill should also have expertise ('full'), or only expertise if already proficient from another source, else just proficient ('increment'), or only expertise if already proficient from another source ('only'), else nothing
		if (AddRemove) { // add
			// set the proficiency, but not if only adding expertise
			if (!Extra || !(/only/i).test(Extra)) {
				if (!set[ProfObj]) set[ProfObj] = [];
				if (set[ProfObj].indexOf(ProfSrc) == -1) set[ProfObj].push(ProfSrc);
			}
			// add the expertise, if any
			if (Extra) {
				if (!set[ProfObj+"_Exp"]) set[ProfObj+"_Exp"] = {};
				set[ProfObj+"_Exp"][ProfSrc] = Extra;
			}
		} else { // remove
			// delete the proficiency entry
			if ((!Extra || !(/only/i).test(Extra)) && set[ProfObj] && set[ProfObj].indexOf(ProfSrc) !== -1) {
				set[ProfObj].splice(set[ProfObj].indexOf(ProfSrc), 1);
				if (set[ProfObj].length == 0) delete set[ProfObj];
			}
			// delete the expertise entry
			if (set[ProfObj+"_Exp"] && set[ProfObj+"_Exp"][ProfSrc]) {
				delete set[ProfObj+"_Exp"][ProfSrc];
				if (ObjLength(set[ProfObj+"_Exp"]) === 0) delete set[ProfObj+"_Exp"];
			}
			// also remove the descriptive text if it is still there
			if (set.descrTxt && set.descrTxt[ProfSrc]) delete set.descrTxt[ProfSrc];
		}
		// now determine the new state of the skill
		var isProf = set[ProfObj] ? true : false;
		// then see if we need to add exp
		if (set[ProfObj+"_Exp"]) {
			for (var expSrc in set[ProfObj+"_Exp"]) {
				var aExp = set[ProfObj+"_Exp"][expSrc];
				var isExp = (/full/i).test(aExp) ? true : isProf && (/only/i).test(aExp) ? true : isProf && (/increment/i).test(aExp) && (set[ProfObj].length > 1 || set[ProfObj][0] !== expSrc);
				if (isExp) break;
			}
		} else {
			var isExp = false;
		}
		// get the name of the skill field
		var skillFld = Who('Text.SkillsNames') === 'alphabeta' ? ProfObj : SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(ProfObj)];
		// now update the fields
		Checkbox(skillFld + " Prof", isProf);
		Checkbox(skillFld + " Exp", isExp);
	}; break;
	case "weapon" : // if this is the 'other' weapons do something special. If not, it is Simple/Martial weapons and they can be treated just like armour
		if (ProfObj == "other") {
			if (!set.otherWea) set.otherWea = { finalProfs : [], finalString : "", finalNamesNotManual : [], finalProfsNotManual : [] };
			var iSet = set.otherWea;
			// Add or remove the new weapons from the objects
			var toDo = Extra && isArray(Extra) ? Extra : false;
			if (toDo) {
				if (AddRemove) { // Add
					iSet[ProfSrc] = toDo;
					iSet[ProfSrc].sort();
				} else { // Remove
					if (iSet[ProfSrc]) delete iSet[ProfSrc];
				}
			}
			// Make an array of all the weapons that are not covered by another proficiency
			iSet.finalProfs = [];
			iSet.finalNamesNotManual = [];
			iSet.finalProfsNotManual = [];
			var finalNames = [];
			var tooltipArr = [];
			var simpleProf = tDoc.getField("Proficiency Weapon Simple").isBoxChecked(0) === 1;
			var martialProf = tDoc.getField("Proficiency Weapon Martial").isBoxChecked(0) === 1;
			for (var key in iSet) {
				if ((/^final(Names|Profs|String)/).test(key)) continue;
				var aWea = iSet[key];
				// create the tooltip
				var lineTooltip = [];
				for (var i = 0; i < aWea.length; i++) {
					if (!aWea[i]) continue;
					// lookup to see if the weapon is a known key
					var aWeaI = aWea[i].toLowerCase();
					var theW = WeaponsList[aWeaI];
					var theWeaKey = theW ? aWeaI : aWea[i];
					var theName = theW ? theW.name : theWeaKey[0].toUpperCase() + theWeaKey.substr(1);
					// add the weapon to the tooltip
					lineTooltip.push(theName);
					if (theW && theW.type && ((/natural|spell|cantrip/i).test(theW.type) || ((/^simple$/i).test(theW.type) && simpleProf) || ((/^martial$/i).test(theW.type) && martialProf))) continue; // already proficient
					if (iSet.finalProfs.indexOf(theWeaKey) === -1) {
						// not yet proficient, so add the weapon to the final arrays
						iSet.finalProfs.push(theWeaKey);
						finalNames.push(theName[0].toUpperCase() + theName.substr(1));
						if (key != "Manually added") {
							iSet.finalProfsNotManual.push(theWeaKey);
							iSet.finalNamesNotManual.push(theName);
						}
					}
				}
				lineTooltip.sort();
				tooltipArr.push(formatLineList(key + " - ", lineTooltip));
			}
			// create the new field text
			finalNames.sort();
			iSet.finalString = finalNames.join(", ");
			// create the new field tooltip
			var weaProfs = [].concat(simpleProf ? ["simple"] : []).concat(martialProf ? ["martial"] : []).join(" and ");
			var extraTooltip = !weaProfs ? "" : "\n\nBecause you also have proficiency with " + weaProfs + " weapons, any falling into those categories are not displayed in the field."
			var otherWeaTooltip = tooltipArr.length == 0 ? "" : formatMultiList("Other weapon proficiencies gained from:", tooltipArr) + extraTooltip;
			// set the fields
			Checkbox("Proficiency Weapon Other", iSet.finalString != "");
			Value("Proficiency Weapon Other Description", iSet.finalString, otherWeaTooltip);
			// recalculate the attacks with the proficiency changes
			CurrentUpdates.types.push("attacksprofs");
			break; // only stop if this concerning "other" weapon proficiencies
		}
		// if simple or martial proficiency, do the same as the armour proficiency below
	case "armour" : { // if (Extra == true) means to not change the field, only the tooltip
		var sort = ProfType.replace('ou', 'o');
		var fld = "Proficiency " + ((/shield/i).test(ProfObj) ? "Shields" : (sort + " " + ProfObj).capitalize());
		var fldState = tDoc.getField(fld).isBoxChecked(0) === 1;
		if (!tDoc.getField(fld)) return;
		// set the object
		if (!Extra && AddRemove) { // add
			if (!set[ProfObj]) {
				set[ProfObj] = [ProfSrc];
			} else if (set[ProfObj].indexOf(ProfSrc) === -1) {
				set[ProfObj].push(ProfSrc);
			}
			delete set[ProfObj+"_manualon"];
		} else if (!Extra && set[ProfObj] && set[ProfObj].indexOf(ProfSrc) !== -1) { // remove
			set[ProfObj].splice(set[ProfObj].indexOf(ProfSrc), 1);
			if (set[ProfObj].length === 0) {
				delete set[ProfObj];
				delete set[ProfObj+"_manualoff"];
			}
		};
		// set the field and tooltip
		var tooltipArr = [].concat(set[ProfObj] ? set[ProfObj] : []);
		if (set[ProfObj+"_manualoff"]) tooltipArr.push("[Manually disabled]");
		if (set[ProfObj+"_manualon"]) tooltipArr.push("[Manually enabled]");
		var TooltipTxt = tooltipArr.length ? formatMultiList(ProfObj.capitalize() + " " + sort + " proficiency gained from:", tooltipArr) : "";
		var isOn = set[ProfObj+"_manualon"] ? true : set[ProfObj+"_manualoff"] ? false : set[ProfObj] ? true : false;
		if (Extra || isOn == fldState) {
			AddTooltip(fld, TooltipTxt);
		} else {
			Checkbox(fld, isOn, TooltipTxt);
		}
		// if this was weapons, we need to do some more things
		if (ProfType == "weapon") {
			if ((Extra || isOn != fldState) && Who("Proficiency Weapon Other Description")) {
				// redo the other weapon proficiencies, as they might have changed now
				SetProf("weapon", undefined, "other");
				return;
			} else if (Extra || isOn != fldState) {
				// recalculate the attacks if the proficiency value changed
				CurrentUpdates.types.push("attacksprofs");
			}
		}
	}; break;
	case "save" : {
		var Abi = AbilityScores.fields[ProfObjLC.substr(0,3)];
		if (!Abi) return; // stop if the input can't be used
		var SvFld = Abi + " ST Prof";
		if (AddRemove) { // add
			if (!set[Abi]) {
				set[Abi] = [ProfSrc];
			} else if (set[Abi].indexOf(ProfSrc) === -1) {
				set[Abi].push(ProfSrc);
			}
		} else if (set[Abi] && set[Abi].indexOf(ProfSrc) !== -1) { // remove
			set[Abi].splice(set[Abi].indexOf(ProfSrc), 1);
			if (set[Abi].length === 0) delete set[Abi];
		};
		// now update the saving throw checkbox
		if (set[Abi]) {
			var AbiNm = AbilityScores.names[AbilityScores.abbreviations.indexOf(Abi)];
			var TooltipTxt = formatMultiList(AbiNm + " saving throws proficiency was gained from:", set[Abi]);
			Checkbox(SvFld, true, TooltipTxt);
		} else {
			Checkbox(SvFld, false, "");
		};
	}; break;
	case "resistance" : { // Extra is something to replace the actual text, if even one source has no condition for the resistance (e.g. not something like "Bludg. (in Rage)"), then there is no need to add multiple instances of essentially the same resistance
		var setRem = !set[ProfObjLC] ? undefined : set[ProfObjLC].merge;
		if (AddRemove) { // add
			if (!set[ProfObjLC]) set[ProfObjLC] = {name : ProfObj, src : [], cond : [], lookup : {}, merge : false};
			var theSet = set[ProfObjLC];
			if (theSet.src.indexOf(ProfSrc) !== -1) return; // the thing already exists so exit
			theSet.src.push(ProfSrc);
			if (Extra) {
				theSet.cond.push(Extra);
				if (theSet.lookup[Extra]) {
					theSet.lookup[Extra].push(ProfSrc);
				} else {
					theSet.lookup[Extra] = [ProfSrc];
				};
			};
			theSet.merge = theSet.src.length !== theSet.cond.length;
		} else if (set[ProfObjLC]) { // remove
			var theSet = set[ProfObjLC];
			if (theSet.src.indexOf(ProfSrc) !== -1) theSet.src.splice(theSet.src.indexOf(ProfSrc), 1);
			if (theSet.src.length == 0) {
				delete set[ProfObjLC];
			} else {
				if (Extra && theSet.cond.indexOf(Extra) !== -1) theSet.cond.splice(theSet.cond.indexOf(Extra), 1);
				if (Extra && theSet.lookup[Extra].indexOf(ProfSrc) !== -1) {
					theSet.lookup[Extra].splice(theSet.lookup[Extra].indexOf(ProfSrc), 1);
					if (theSet.lookup[Extra].length == 0) delete theSet.lookup[Extra];
				};
				theSet.merge = theSet.src.length !== theSet.cond.length;
			};
		};

		// now update the resistance fields
		var resRemoved = 0;
		if (set[ProfObjLC]) {
			if (setRem != undefined) { // the object existed before, so see if something changed
				if (setRem && !theSet.merge) { // if before it was merged, but now no longer (removed the option without condiion)
					RemoveResistance(ProfObj);
					resRemoved = 1;
				} else if (!setRem && theSet.merge) { // if before it was not merged, but now is (the new addition must be without condition)
					for (var i = 0; i < theSet.cond.length; i++) {
						RemoveResistance(theSet.cond[i]);
						resRemoved += 1;
					};
				}; // if the merge status didn't change, we don't have to do anything here
			};
			// now add the resistance
			DoResistance(ProfObjLC);
		} else { // guess the current item was the only thing to remove
			RemoveResistance(Extra ? Extra : ProfObj);
			resRemoved = 1;
		};
		// if a space opened up, maybe some other resistances can finally fit
		if (resRemoved) {
			// first make a list of all the items currently in the fields
			var curRes = [];
			for (var k = 1; k <= 6; k++) {
				var aDmgRes = What("Resistance Damage Type " + k);
				if (aDmgRes) curRes.push(aDmgRes);
			};
			if (curRes.length !== 6) {
				for (var resObj in set) {
					if (resObj !== ProfObjLC) DoResistance(resObj, curRes);
				};
			};
		};
	}; break;
	case "language" :
	case "tool" : { // Extra is a number if the entry is a choice to be made by the user duplicates should be ignored (e.g. 'musical instrument'); // Alternatively, for a tool the Extra can be the 3-letter abbreviation if the tool is also to be added in the Skill Proficiencies section with a calculated value;
		var optNmbr = Extra && !isNaN(Extra) ? Extra : false;
		if (optNmbr) {
			var uID = ProfSrc + "_#_" + ProfObj + "_#_" + optNmbr;
			if (AddRemove) { // add
				if (!set[uID]) set[uID] = {source : ProfSrc, entries : [], choices : []};
				// first ask the user to select choices
				var optType = ProfType.capitalize() + "s";
				var optSubj = [];
				for (var i = 1; i <= optNmbr; i++) {
					optSubj.push(ProfObj + (optNmbr > 1 ? " (" + i + "/" + optNmbr + ")" : ""));
					set[uID].entries.push(uID + "-" + i);
				};
				set[uID].choices = optSubj;
				if (IsNotImport) {
					var knownOpt = [];
					for (var i = 1; i <= FieldNumbers.langstools; i++) {
						var theI = What(ProfType.capitalize() + " " + i);
						if (theI) knownOpt.push(theI);
					};
					set[uID].choices = AskUserOptions(optType, ProfSrc, optSubj, knownOpt);
				} else if (global.docFrom && global.docFrom.CurrentProfs && global.docFrom.CurrentProfs[ProfType] && global.docFrom.CurrentProfs[ProfType][uID] && global.docFrom.CurrentProfs[ProfType][uID].choices) {
					if (global.docFrom.CurrentProfs[ProfType][uID].choices.length === optNmbr) set[uID].choices = global.docFrom.CurrentProfs[ProfType][uID].choices;
				};
				// now add these choices to the sheet
				for (var i = 0; i < optNmbr; i++) {
					AddLangTool(ProfType, set[uID].choices[i], ProfSrc, set[uID].entries[i]);
				};
			} else if (set[uID]) { // remove
				for (var i = 0; i < optNmbr; i++) {
					RemoveLangTool(ProfType, ProfObj, set[uID].entries[i], set[uID].choices[i]);
				};
				delete set[uID];
			};
		} else {
			if (AddRemove) { // add
				if (!set[ProfObjLC]) {
					set[ProfObjLC] = [ProfSrc];
				} else if (set[ProfObjLC].indexOf(ProfSrc) === -1) {
					set[ProfObjLC].push(ProfSrc);
				};
			} else if (set[ProfObjLC] && set[ProfObjLC].indexOf(ProfSrc) !== -1) { // remove
				set[ProfObjLC].splice(set[ProfObjLC].indexOf(ProfSrc), 1);
				if (set[ProfObjLC].length === 0) delete set[ProfObjLC];
			};
			// now update the proficiency
			if (set[ProfObjLC]) {
				AddLangTool(ProfType, ProfObj, set[ProfObjLC]);
			} else {
				RemoveLangTool(ProfType, ProfObj);
			};

			// if dealing with a tool, we might need to add it to the skill proficiencies section to get a calculated value
			var toolAbi = ProfType === "tool" && Extra && isNaN(Extra) ? AbilityScores.fields[Extra.substr(0,3).toLowerCase()] : false;
			if (toolAbi) {
				var theTooTxt = ProfObj + " (" + (typePF ? toolAbi : toolAbi.toUpperCase()) + ")";
				if (AddRemove) { // add
					if (!set.toolSkill) {
						set.toolSkill = [theTooTxt];
					} else if (set.toolSkill.indexOf(ProfSrc) === -1) {
						set.toolSkill.push(theTooTxt);
					};
				} else if (!set[ProfObjLC] && set.toolSkill && set.toolSkill.indexOf(theTooTxt) !== -1) { // remove
					set.toolSkill.splice(set.toolSkill.indexOf(theTooTxt), 1);
					if (set.toolSkill.length === 0) delete set.toolSkill;
				};
				// now update the skill proficiency entry
				var curToolTxt = What("Too Text");
				if (theTooTxt.toLowerCase().indexOf(curToolTxt.toLowerCase()) !== -1 && set.toolSkill && set.toolSkill.indexOf(curToolTxt) === -1) {
					Value("Too Text", set.toolSkill[0]);
					Checkbox("Too Prof", true);
					Checkbox("Too Exp", false);
				} else if (!set.toolSkill && theTooTxt.toLowerCase().indexOf(curToolTxt.toLowerCase()) !== -1) {
					tDoc.resetForm(["Too Text"]);
					Checkbox("Too Prof", false);
					Checkbox("Too Exp", false);
				};
			};
		};
	}; break;
	case "savetxt" : { // text to be put in the "Saving Throw advantages / disadvantages" field
		var fld = "Saving Throw advantages / disadvantages";
		var rxCond = /.*?(\s?\((.*?)\)).*/i;
		//create the set object if it doesn't exist already
		if ( !ObjLength(set) ) {
			CurrentProfs.savetxt = { text : {}, immune : {}, adv_vs : {} };
			set = CurrentProfs.savetxt;
		};
		//put the input into a form we can use
		if (typeof ProfObj == "string") ProfObj = { text : [ProfObj] };
		for (var st in ProfObj) {
			if (typeof ProfObj[st] == "string") ProfObj[st] = [ProfObj[st]];
			for (var i = 0; i < ProfObj[st].length; i++) {
				ProfObj[st][i] = clean(ProfObj[st][i], false, true);
				if (st !== "text") ProfObj[st][i] = ProfObj[st][i].replace(/,|;/g, "");
			};
		};
		//a functino to parse the 'immune' and 'adv_vs' parts into a usable string
		var preTxt = {adv_vs : "Adv. on saves vs.", immune : "Immune to"};
		var parseSvTxt = function() {
			var sUseName = metric ? "nameMetric" : "name";
			var oTypes = { adv_vs : [], immune : [] };
			for (var sType in oTypes) {
				for (var sThing in set[sType]) {
					var obj = set[sType][sThing];
					var sBase = obj.condition ? obj.conditionBase : sThing;
					if ( (sType === "adv_vs" && set.immune[sBase]) || (obj.condition && set[sType][sBase])) continue;
					oTypes[sType].push(obj[sUseName]);
				}
				oTypes[sType].sort();
			}
			return {
				adv_vs : formatLineList(preTxt.adv_vs, oTypes.adv_vs),
				adv_vsA : oTypes.adv_vs,
				immune : formatLineList(preTxt.immune, oTypes.immune),
				immuneA : oTypes.immune
			};
		};
		//create an object of the current state
		var oldSvTxt = parseSvTxt();
		//Process the input. //for the simple text strings, immediately add/remove it
		for (var attr in ProfObj) {
			var setT = set[attr];
			var addT = ProfObj[attr];
			for (var i = 0; i < addT.length; i++) {
				var iAdd = addT[i];
				var iAddM = ConvertToMetric(iAdd, 0.5);
				var iAddLC = iAdd.toLowerCase();
				if (AddRemove) { // add
					if (!setT[iAddLC]) {
						setT[iAddLC] = {
							name : iAdd,
							nameMetric : iAddM,
							src : [ProfSrc]
						};
						var aMatchCond = iAddLC.match(rxCond);
						if (aMatchCond) {
							setT[iAddLC].condition = aMatchCond[2];
							setT[iAddLC].conditionBase = iAddLC.replace(aMatchCond[1], "");
						}
						if (attr === "text") {
							AddString(fld, metric ? iAdd : iAddM, "; ");
						} else if (attr === "immune" && CurrentProfs.resistance[iAddLC]) {
							//adding immunity to something that the character also has resistance to, so remove the resistance
							var theRes = CurrentProfs.resistance[iAddLC];
							if (theRes.merge) {
								RemoveResistance(theRes.name);
							} else {
								for (var j = 0; j < theRes.cond.length; j++) {
									RemoveResistance(theRes.cond[j]);
								};
							};
						};
					} else if (setT[iAddLC].src.indexOf(ProfSrc) === -1) {
						setT[iAddLC].src.push(ProfSrc);
					};
				} else if (setT[iAddLC] && setT[iAddLC].src.indexOf(ProfSrc) !== -1) { // remove
					setT[iAddLC].src.splice(setT[iAddLC].src.indexOf(ProfSrc), 1);
					if (setT[iAddLC].src.length === 0) {
						delete setT[iAddLC];
						if (attr === "text") {
							RemoveString(fld, metric ? iAdd : iAddM);
						} else if (attr === "immune" && CurrentProfs.resistance[iAddLC]) {
							//removing immunity to something that the character also has resistance to, so add the resistance (again)
							DoResistance(iAddLC);
						};
					};
				};
			};
		};
		// Put the immune and adv_vs into the field, if anything changed
		var svFld = What(fld);
		var newSvTxt = parseSvTxt();
		for (var i = 0; i <= 1; i++) {
			var attri = i ? "adv_vs" : "immune";
			var oldStr = oldSvTxt[attri];
			var oldStrRE = RegExp(oldStr.RegEscape(), "i");
			var newStr = newSvTxt[attri];
			if (!oldStr && newStr) {
				svFld += (svFld ? "; " : "") + newStr;
			} else if (oldStr && (oldStrRE).test(svFld)) {
				svFld = svFld.replace(oldStrRE, newStr);
			} else if (oldStr) {
				// the string was probably altered manually, we got to find what was added, if anything
				var oldArr = oldSvTxt[attri + "A"];
				var newArr = newSvTxt[attri + "A"];
				var findRE = RegExp(preTxt[attri].RegEscape() + " ?(.*?),?( and)? ?" + oldArr[oldArr.length - 1].RegEscape(), "i");
				var foundStr = (findRE).test(svFld) ? svFld.match(findRE)[0].replace(findRE, "$1") : "";
				if (foundStr) {
					// we could match the string with something added in between, we can re-create the string with the manually added thing
					var addOb = foundStr.split(/, |; /);
					for (var j = 0; j < addOb.length; j++) {
						if (addOb[j] && !(RegExp("\\b" + addOb[j] + "\\b", "i")).test(oldArr)) newArr.push(addOb[j]);
					};
					newArr.sort();
					newStr = formatLineList(preTxt[attri], newArr);
					svFld = svFld.replace(findRE, newStr);
				} else if (newStr) {
					// we could not match the string, so lets just add the new object
					svFld += (svFld ? "; " : "") + newStr;
				};
			};
		};
		// Create the tooltip string for the "Saving Throw advantages / disadvantages" field
		var svTooltip = "";
		for (var a1 in set) {
		 for (var b2 in set[a1]) {
			var nmFld = a1 === "text" && metric ? "nameMetric" : "name";
			var aSvHead = (a1 === "immune" ? "\"Immunity to " : a1 === "adv_vs" ? "\"Adv. on saves vs. " : "\"") + set[a1][b2][nmFld] + "\"" + " was gained from:";
			var aSvTxt = formatLineList(aSvHead, set[a1][b2].src);
			if (aSvTxt) svTooltip += (svTooltip ? "\n \u2022 " : " \u2022 ") + aSvTxt + ".";
		 };
		};
		//Set the value of the field after cleaning any unfortunate replacement leftovers
		svFld = svFld.replace(/(,|;) (,|;)/g, "$2").replace(/^(,|;) |(,|;) $/g, "");
		Value(fld, svFld, svTooltip);
	}; break;
	case "vision" : { // Extra is optionally used to add a range, in feet, to the vision entry
		var fld = "Vision";
		var range = Extra ? Extra : 0;
		if (AddRemove) { // add
			if (!set[ProfObjLC]) {
				set[ProfObjLC] = {name : ProfObj, src : [], ranges : {}};
				var prevNm = "";
			} else {
				var prevNm = set[ProfObjLC].name + getHighestTotal(set[ProfObjLC].ranges);
			}
			var theSet = set[ProfObjLC];
			if (theSet.src.indexOf(ProfSrc) !== -1) return; // the thing already exists so exit
			theSet.src.push(ProfSrc);
			theSet.ranges[ProfSrc] = range;
			// See what the new entry is now
			var newNm = theSet.name + getHighestTotal(theSet.ranges);
			// Add or replace someting in the field
			if (prevNm != newNm) {
				ReplaceString(fld, newNm, "; ", prevNm);
			};
		} else if (set[ProfObjLC]) { // remove
			var theSet = set[ProfObjLC];
			if (theSet.src.indexOf(ProfSrc) !== -1) theSet.src.splice(theSet.src.indexOf(ProfSrc), 1);
			if (theSet.src.length == 0) { // remove all of this entry
				var newNm = theSet.name + getHighestTotal(theSet.ranges);
				RemoveString(fld, newNm);
				delete set[ProfObjLC];
			} else {
				var prevNm = theSet.name + getHighestTotal(theSet.ranges);
				if (theSet.ranges[ProfSrc] !== undefined) delete theSet.ranges[ProfSrc];
				var newNm = theSet.name + getHighestTotal(theSet.ranges);
				if (prevNm != newNm) {
					ReplaceString(fld, newNm, "; ", prevNm);
				};
			};
		};
		//update the tooltip
		var visTxt = "";
		for (var aVis in set) {
			var aSet = set[aVis];
			var aSrcs = [];
			for (var aSrc in aSet.ranges) {
				var aRng = "";
				if (aSet.ranges[aSrc]) {
					aRng = " [" + aSet.ranges[aSrc] + " ft]";
					if (metric) aRng = ConvertToMetric(aRng, 0.5);
				};
				aSrcs.push(aSrc + aRng);
			};
			var aVisTxt = formatLineList("\"" + aSet.name + "\" was gained from:", aSrcs);
			if (aVisTxt) visTxt += (visTxt ? "\n \u2022 " : " \u2022 ") + aVisTxt + ".";
		};
		AddTooltip(fld, visTxt);
	}; break;
	case "speed" : {
		var fldSpd = "Speed";
		var fldSpdW = What(fldSpd).replace(/\n|\r/g, "").replace(/,/g, ".");
		var fldEnc = "Speed encumbered";
		var fldEncdW = What(fldEnc).replace(/\n|\r/g, "").replace(/,/g, ".");
		var spdTypes = ["walk", "burrow", "climb", "fly", "swim"];
		//create the set object if it doesn't exist already
		var setKeys = function() {
			for (var e in set) {return true;};
			CurrentProfs.speed = { allModes : {} };
			for (var i = 0; i < spdTypes.length; i++) CurrentProfs.speed[spdTypes[i]] = {spd : {}, enc : {}};
			set = CurrentProfs.speed;
		}();
		// a function to get the correct value of the speed
		var parseSpeed = function(type, inpObj, fullString, replaceWalk, extra) {
			if (ObjLength(inpObj) || extra) {
				if (extra < 0) {
					inpObj.extra = extra;
				} else if (!isNaN(extra) && extra > 0) {
					inpObj.extra = "+" + extra;
					inpObj.extraFixed = "fixed " + extra;
				}
				var total = getHighestTotal(inpObj, true, replaceWalk, CurrentProfs.speed.allModes, type == "walk" ? false : type, true);
				if (inpObj.extra !== undefined) delete inpObj.extra;
				if (inpObj.extraFixed !== undefined) delete inpObj.extraFixed;
			} else {
				var total = ["", 0];
			}
			return fullString == "both" ? total : fullString ? total[0] : total[1];
		};
		// get the totals before we change anything
		var oldTotals = {
			walkSpd : parseSpeed("walk", set.walk.spd, false, 0),
			walkEnc : parseSpeed("walk", set.walk.enc, false, 0)
		};
		for (var i = 0; i < spdTypes.length; i++) {
			var sT = spdTypes[i];
			if (sT === "walk") continue;
			oldTotals[sT + "Spd"] = parseSpeed(sT, set[sT].spd, false, oldTotals.walkSpd);
			oldTotals[sT + "Enc"] = parseSpeed(sT, set[sT].enc, false, oldTotals.walkEnc);
		};
		// make an object of all the differences between the values of the field and the oldTotals
		var deltaSpds = {};
		var splitSpdString = function(type, str) {
			for (var i = 0; i < spdTypes.length; i++) {
				var sT = spdTypes[i];
				if (!str) {
					deltaSpds[sT + type] = 0;
					continue;
				};
				var strParse = oldTotals[sT + type];
				var typeRE = sT === "walk" ? /(\d+.?\d*).*/ : RegExp(".*" + sT + " *(\\d+.?\\d*).*", "i");
				if ((typeRE).test(str)) {
					strParse = Number(str.replace(typeRE, "$1"));
					if (metric) strParse = RoundTo(strParse / 0.3, 5, false, false);
				}
				var total = strParse - oldTotals[sT + type];
				deltaSpds[sT + type] = isNaN(total) ? 0 : total;
			}
		};
		splitSpdString("Spd", fldSpdW);
		splitSpdString("Enc", fldEncdW);
		if (isArray(ProfObj)) ProfObj = { walk : {spd : parseFloat(ProfObj[0]), enc : parseFloat(ProfObj[1])} };
		// add or remove the ProfObj from the current object
		for (var spdType in ProfObj) {
			if (!CurrentProfs.speed[spdType]) continue;
			var theInp = ProfObj[spdType];
			var theSet = CurrentProfs.speed[spdType];
			if (AddRemove) { // add
				if (spdType === "allModes") {
					theSet[ProfSrc] = theInp;
				} else if (typeof theInp == "object") {
					if (theInp.spd) theSet.spd[ProfSrc] = theInp.spd;
					if (theInp.enc) theSet.enc[ProfSrc] = theInp.enc;
				} else {
					theSet.spd[ProfSrc] = theInp;
					theSet.enc[ProfSrc] = theInp;
				};
			} else { // remove
				if (spdType === "allModes") {
					delete theSet[ProfSrc];
				} else {
					if (theSet.spd[ProfSrc] !== undefined) delete theSet.spd[ProfSrc];
					if (theSet.enc[ProfSrc] !== undefined) delete theSet.enc[ProfSrc];
				};
			};
		};
		// get the new totals
		var theWalks = {
			spd : parseSpeed("walk", set.walk.spd, "both", 0, deltaSpds.walkSpd),
			enc : parseSpeed("walk", set.walk.enc, "both", 0, deltaSpds.walkEnc)
		};
		var newTotals = { walkSpd : theWalks.spd[0], walkEnc : theWalks.enc[0] };
		for (var i = 0; i < spdTypes.length; i++) {
			var sT = spdTypes[i];
			if (sT === "walk") continue;
			newTotals[sT + "Spd"] = parseSpeed(sT, set[sT].spd, true, theWalks.spd[1], deltaSpds[sT + "Spd"]);
			newTotals[sT + "Enc"] = parseSpeed(sT, set[sT].enc, true, theWalks.enc[1], deltaSpds[sT + "Enc"]);
		};
		// create the strings
		var spdString = "";
		var encString = "";
		for (var i = 0; i < spdTypes.length; i++) {
			var sT = spdTypes[i];
			var sSpd = newTotals[sT + "Spd"];
			if (sSpd) spdString += (!spdString ? "" : ",\n") + sSpd;
			var eSpd = newTotals[sT + "Enc"];
			if (eSpd) encString += (!encString ? "" : typePF ? ", " : ",\n") + eSpd;
		};
		// create the tooltips
		var ttips = {spd : "", enc : ""};
		var modArray = [];
		for (var spMod in set.allModes) {
			var theVal = set.allModes[spMod];
			if (!theVal) continue;
			if (!isNaN(theVal) || !(/[xX\*\xD7\/:]/).test(theVal[0])) theVal += " ft";
			if (metric) theVal = ConvertToMetric(theVal, 0.5);
			modArray.push(spMod + " [" + theVal + "]");
		};
		for (var i = 0; i < spdTypes.length; i++) {
			var sT = spdTypes[i];
			var arrs = {spd : [], enc : []};
			for (var n = 0; n <= 1; n++) {
				var sV = n ? "enc" : "spd";
				var theSpeeds = set[sT][sV];
				var goOn = false;
				for (var aSpeed in theSpeeds) {
					var theVal = theSpeeds[aSpeed];
					if (!theVal) continue;
					if (theVal === "walk") {
						theVal = "as walking speed";
					} else if (!isNaN(theVal) || !(/[xX\*\xD7\/:]/).test(theVal[0])) {
						theVal += " ft";
					};
					if (metric) theVal = ConvertToMetric(theVal, 0.5);
					arrs[sV].push(aSpeed + " [" + theVal + "]");
					goOn = true;
				};
				if (goOn) {
					arrs[sV] = arrs[sV].concat(modArray);
					ttips[sV] += (ttips[sV] ? "\n\n" : "") + formatMultiList("The total " + (n ? "encumbered " : "") + sT + "ing speed comes from:", arrs[sV]);
				};
			};
		};
		// set them to the fields
		if (metric) {
			spdString = ConvertToMetric(spdString, 0.5);
			encString = ConvertToMetric(encString, 0.5);
		}
		Value(fldSpd, spdString, ttips.spd);
		Value(fldEnc, encString, ttips.enc);
	}; break;
	case "specialarmour" : { // Extra is to make the entry unique (the array index)
		if (!ProfObj.mod) return;
		var fldNms = {
			magic : ["AC Magic", "AC Magic Description"],
			misc1 : ["AC Misc Mod 1", "AC Misc Mod 1 Description"],
			misc2 : ["AC Misc Mod 2", "AC Misc Mod 2 Description"]
		};
		var objName = ProfSrc + "-" + Extra;
		if (AddRemove) { // add
			var tObj = {
				name : ProfObj.name,
				mod : ProfObj.mod,
				text : ProfObj.text,
				stopeval : ProfObj.stopeval,
				source : ProfSrc
			};
			if (ProfObj.magic) {
				tObj.type = "magic";
			} else {
				// count how many of each misc we got, and add to the fewest
				var tCount = { misc1 : 0, misc2 : 0 };
				for (var key in set) if (set[key].type != "magic") tCount[set[key].type] += 1;
				tObj.type = tCount.misc1 <= tCount.misc2 ? "misc1" : "misc2";
			}
			set[objName] = tObj;
			// update the description
			AddString(fldNms[tObj.type][1], tObj.name, ", ");
		} else { // remove
			var tObj = set[objName];
			if (!tObj) return; // nothing to do so stop now
			// only remove this if the name isn't used for another in the same field
			var removeName = true;
			for (var key in set) {
				if (key !== objName && set[key].name == tObj.name && set[key].type == tObj.type) {
					removeName = false;
					break;
				}
			}
			// update the description
			if (removeName) RemoveString(fldNms[tObj.type][1], tObj.name);
		}
		// update the modifier field
		AddToModFld(fldNms[tObj.type][0], tObj.mod, !AddRemove, tObj.name, tObj.text);
		// now set the tooltip
		var tooltipArr = [];
		for (var key in set) {
			if (!AddRemove && key == objName) continue;
			if (set[key].type == tObj.type) {
				var srcStr = set[key].source.indexOf(set[key].name) == -1 ? set[key].source + " (" + set[key].name + ")" : set[key].source;
				tooltipArr.push(srcStr);
			};
		}
		var tooltipStr = formatMultiList("This line of " + (tObj.type == "magic" ? "magic" : "miscellaneous") + " AC bonuses contains:\n(tip: click on the number field in this line for more info)", tooltipArr);
		AddTooltip(fldNms[tObj.type][1], tooltipStr);
		if (!AddRemove) delete set[objName]; // now delete the object
	}; break;
	case "carryingcapacity" : {
		ProfObj = parseFloat(ProfObj);
		if (isNaN(ProfObj)) return; // nothing to do
		var cFld = "Carrying Capacity Multiplier";
		var curFactor = Number(What(cFld));
		if (isNaN(curFactor)) { // recreate the total from the attributes
			curFactor = 1;
			for (var srcs in set) curFactor *= set[srcs];
		}
		if (AddRemove) { // add
			set[ProfSrc] = ProfObj;
			curFactor *= ProfObj;
		} else if (set[ProfSrc]) { // remove
			curFactor /= set[ProfSrc];
			delete set[ProfSrc];
		}
		// Make the new tooltip
		var sourcesArray = [];
		for (var srcs in set) {
			sourcesArray.push(srcs + ": \xD7" + set[srcs]);
		}
		var ttText = toUni("Carrying Capacity Multiplier") + "\nThe number you type in here will be used to multiply the carrying capacity with. This must be a positive number.\n\nWhen you set this value to zero, all the encumbrance calculations will be halted and the encumbrance fields will be left empty." + formatMultiList("\n\nThe following features have changed this multiplier:", sourcesArray);
		// Set the new field value
		Value("Carrying Capacity Multiplier", Math.max(0, RoundTo(curFactor, 0.25)), ttText);
	}; break;
	case "advantage" : { // ProfObj array [field, boolean (true = adv; false = disadv)]
		var fld = ProfObj[0], fldDescr;
		fld = fld.substr(0,1).toUpperCase() + fld.substr(1).toLowerCase();
		var fld3 = fld.substr(0,3), fld4 = fld.substr(0,4);
		var isSkill = false;
		if (SkillsList.abbreviations.indexOf(fld3) !== -1) {
			fld = fld3;
			isSkill = true;
		} else if (SkillsList.abbreviations.indexOf(fld4) !== -1) {
			fld = fld4;
			isSkill = true;
		} else if (AbilityScores.abbreviations.indexOf(fld3) !== -1) {
			fld = fld3 + " ST";
			fldDescr = AbilityScores.names[AbilityScores.abbreviations.indexOf(fld3)] + " saving throws";
		} else if (fld3 == "Att") {
			fld = fld3;
			fldDescr = "attack rolls";
		}
		if (isSkill) {
			fldDescr = SkillsList.names[SkillsList.abbreviations.indexOf(fld)] + " checks";
		}
		if (!set[fld]) set[fld] = {};
		if (AddRemove) { // add
			set[fld][ProfSrc] = ProfObj[1];
		} else if (set[fld][ProfSrc] !== undefined) { // remove
			delete set[fld][ProfSrc];
		}
		// what to change the field to
		var setAdv = 0, setDis = 0, tooltipArr = [];
		for (var src in set[fld]) {
			var giveAdv = set[fld][src];
			tooltipArr.push((!giveAdv ? "Disa" : "A") + "dvantage: " + src);
			if (giveAdv) {
				setAdv++;
			} else {
				setDis++;
			}
		}
		tooltipArr.sort();
		if (setAdv && setDis) { // both advantage and disadvantage, so set neither
			setAdv = false;
			setDis = false;
		}
		// apply the fields
		if (!typePF) {
			var useFld = isSkill && Who("Text.SkillsNames") != "alphabeta" ? SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(fld)] : fld;
			var fullTT = !tooltipArr.length ? "" : formatMultiList("(Dis)advantage with " + fldDescr + " gained from:", tooltipArr) + "\n\nRemember that advantage and disadvantage cancel each other out and that there is no bonus in having multiple sources of either.\nOne disadvantage will cancel any number of reasons for advantage and vice versa.";
			Checkbox(useFld + " Adv", setAdv, fullTT);
			Checkbox(useFld + " Dis", setDis, fullTT);
		} else {
			if (fld == "Perc") {
				AddTooltip("Passive Perception Bonus", undefined, setAdv ? "Adv" : setDis ? "Dis" : "");
			} else if (fld == "Ste") {
				if (setDis) {
					Show("Stealth Disadv." + Who("Text.SkillsNames"));
				} else {
					Hide("Stealth Disadv");
				}
				AddTooltip("AC Stealth Disadvantage", undefined, setAdv ? "Adv" : setDis ? "Dis" : "");
			}
		}
		// clean the object
		if (!AddRemove && !tooltipArr.length) delete set[fld];
	}; break;
 };
	SetStringifieds("profs");
};

//a way of creating a formatted list with multiple lines or on a single line
function formatMultiList(caption, elements) {
	if (!elements || (isArray(elements) && elements.length === 0)) return "";
	if (!isArray(elements)) elements = [elements];
	var rStr = caption + "\n \u2022 " + elements[0];
	for (var i = 1; i < elements.length; i++) {
		rStr += "\n \u2022 " + elements[i];
	};
	return rStr;
};
function formatLineList(caption, elements, useOr) {
	if (!elements || (isArray(elements) && elements.length === 0)) return "";
	if (!isArray(elements)) elements = [elements];
	var andOr = useOr ? " or " : " and ";
	var rStr = (caption ? caption + " " : "") + elements[0];
	var EL = elements.length;
	for (var i = 1; i < EL; i++) {
		rStr += EL > 2 ? "," : "";
		rStr += (i === EL - 1 ? andOr : " ") + elements[i];
	};
	return rStr;
};

// a function to add an array of modifications to a total value
function processModifiers(iTot, aMods) {
	// first do substractions and additions, then multiplications and divisions
	for (n = 1; n <= 2; n++) {
		for (var i = 0; i < aMods.length; i++) {
			var aMod = aMods[i];
			var sOperator = aMod.substring(0,1);
			var iValue = Number(aMod.substring(1));
			if (isNaN(iValue)) continue;
			if (n === 1) {
				switch (sOperator) {
					case "+" :
						iTot += iValue;
						break;
					case "-" :
					case "\u2015" :
						iTot -= iValue;
						break;
					case "_" :
						iTot = iTot ? iTot + iValue : iTot;
						break;
				};
			} else {
				switch (sOperator) {
					case "x" :
					case "X" :
					case "*" :
					case "\xD7" :
						iTot *= iValue;
						break;
					case "/" :
					case ":" :
						iTot /= iValue;
						break;
				};
			};
		};
	};
	return iTot;
};

//a way to condense an array of numbers down to the highest and modifiers
function getHighestTotal(nmbrObj, notRound, replaceWalk, extraMods, prefix, withCleanValue) {
	var values = [0];
	var modifications = [];
	var fixedVals = [0];
	var noModsIfWalks = false;
	var prsVal = function(val) {
		if (isNaN(val) && (/unlimited|\u221E/i).test(val)){
			values.push(9999);
		} else if (!val) {
			return;
		} else if (isNaN(val.substring(0,1)) && !isNaN(val.substring(1))) {
			modifications.push(val);
		} else if (!isNaN(val)) {
			values.push(val);
		} else if (replaceWalk !== undefined && replaceWalk !== "walk" && val === "walk") {
			prsVal(replaceWalk);
			noModsIfWalks = true;
		} else if ((/fixed/i).test(val) && (/\d+/).test(val)) { // for Magic Items granting a speed, no modifiers at all
			fixedVals.push(Number(val.match(/\d+/)[0]));
		};
	};
	var recurProcess = function(input) {
		if (isArray(input)) {
			for (var i = 0; i < input.length; i++) { recurProcess(input[i]); };
		} else if (typeof input == "object") {
			for (var i in input) { recurProcess(input[i]); };
		} else {
			prsVal(input);
		};
	};
	recurProcess(nmbrObj);
	//process the values
	var tValue = Math.max.apply(Math, values);
	if (tValue && modifications.length) tValue = processModifiers(tValue, modifications);
	if (tValue && extraMods && !(replaceWalk && noModsIfWalks && tValue === replaceWalk)) {
		modifications = [];
		recurProcess(extraMods);
		if (modifications.length) tValue = processModifiers(tValue, modifications);
	};
	if (fixedVals.length > 1) {
		tValue = Math.max.apply(Math, fixedVals.concat([tValue]));
	};
	prefix = prefix ? prefix + " " : prefix === false ? "" : " ";
	if (!tValue) {
		return withCleanValue ? ["", 0] : "";
	} else if (tValue >= 9999) {
		return prefix + "(unlimited)";
	} else {
		if (!notRound) tValue = Math.round(tValue);
		var metric = What("Unit System") !== "imperial";
		var returnStr = prefix + RoundTo(tValue * (metric ? 0.3 : 1), 0.5, false, true) + (metric ? " m" : " ft");
		return withCleanValue ? [returnStr, tValue] : returnStr;
	}
};

// open a dialog with a number of lines of choices and return the choices in an array; if knownOpt === "radio", show radio buttons instead, and return the entry selected
// if notProficiencies is set to true, the optType will serve as the dialog header, and optSrc will serve as the multiline explanatory text
function AskUserOptions(optType, optSrc, optSubj, knownOpt, notProficiencies, sBottomMsg) {
	if (!IsNotImport) return optSubj;
	//first make the entry lines
	var selectionLines = [];
	for (var i = 0; i < optSubj.length; i++) {
		if (knownOpt === "radio") {
			selectionLines.push({
				type : "radio",
				item_id : "sl" + ("0" + i).slice(-2),
				group_id : "slct",
				name : optSubj[i]
			});
		} else {
			selectionLines.push({
				type : "view",
				alignment : "align_fill",
				align_children : "align_row",
				elements : [{
					type : "static_text",
					alignment : "align_left",
					item_id : "st" + ("0" + i).slice(-2),
					font : "dialog",
					name : "Already known!"
				}, {
					type : "edit_text",
					alignment : "align_right",
					item_id : "sl" + ("0" + i).slice(-2),
					char_width : 30,
					height : 20
				}]
			});
		};
	};
	// split to two, three, or four columns if radio options and more than 7
	if (knownOpt === "radio" && optSubj.length > 7) {
		var sliceLen, leftCol, midColL = [], midColR = [], rightCol;
		if (optSubj.length > 51) {
			sliceLen = Math.ceil(selectionLines.length/4);
			leftCol = selectionLines.slice(0,sliceLen);
			midColL = selectionLines.slice(sliceLen,sliceLen*2);
			midColR = selectionLines.slice(sliceLen*2,sliceLen*3);
			rightCol = selectionLines.slice(sliceLen*3);
		} else if (optSubj.length > 30) {
			sliceLen = Math.ceil(selectionLines.length/3);
			leftCol = selectionLines.slice(0,sliceLen);
			midColL = selectionLines.slice(sliceLen,sliceLen*2);
			rightCol = selectionLines.slice(sliceLen*2);
		} else {
			sliceLen = Math.ceil(selectionLines.length/2);
			leftCol = selectionLines.slice(0,sliceLen);
			rightCol = selectionLines.slice(sliceLen);
		}
		selectionLines = [{
			type : "view",
			alignment : "align_fill",
			align_children : "align_distribute",
			elements : [{
				type : "view",
				alignment : "align_left",
				align_children : "align_left",
				elements : leftCol
			}, {
				type : "view",
				alignment : "align_center",
				align_children : "align_left",
				elements : midColL
			}, {
				type : "view",
				alignment : "align_center",
				align_children : "align_left",
				elements : midColR
			}, {
				type : "view",
				alignment : "align_right",
				align_children : "align_left",
				elements : rightCol
			}]
		}];
	}

	var diaHeader = notProficiencies ? optType : "Select proficiencies";

	//make all the known options lowercase for easier testing
	var showOptions = "";
	if (knownOpt && knownOpt !== "radio") {
		showOptions = knownOpt.toString();
		for (var i = 0; i < knownOpt.length; i++) { knownOpt[i] = knownOpt[i].toLowerCase(); };
	};

	var theDialog = {
		choices : [],
		already : knownOpt,
		subj : optSubj, //array of default choices
		initialize : function (dialog) {
			if (this.already === "radio") return;
			var toLoad = {};
			var toShow = {};
			for (var i = 0; i < this.subj.length; i++) {
				toLoad["sl" + ("0" + i).slice(-2)] = this.subj[i];
				var stTxt = "st" + ("0" + i).slice(-2);
				toShow[stTxt] = false;
				dialog.setForeColorRed(stTxt);
			};
			dialog.load(toLoad);
			dialog.visible(toShow);
		},
		commit : function (dialog) {
			var oResult = dialog.store();
			this.choices = [];
			for (var i = 0; i < this.subj.length; i++) {
				var theResult = oResult["sl" + ("0" + i).slice(-2)];
				if (this.already === "radio") {
					if (theResult) {
						this.choices = this.subj[i];
						return;
					};
				} else {
					this.choices.push(theResult ? theResult : this.subj[i]);
				};
			};
		},
		check : function (dialog, nmbr) {
			if (!this.already || this.already === "radio") return;
			var toChk = "sl" + ("0" + nmbr).slice(-2);
			var tTxt = "st" + ("0" + nmbr).slice(-2);
			var tResult = dialog.store()[toChk].toLowerCase();
			var toShow = {};
			toShow[tTxt] = this.already.indexOf(tResult) !== -1;
			dialog.visible(toShow);
		},
		description : {
			name : "ASK USER DIALOG",
			elements : [{
				type : "view",
				align_children : "align_left",
				elements : [{
					type : "static_text",
					item_id : "head",
					alignment : "align_fill",
					font : "heading",
					bold : true,
					wrap_name : true,
					char_width : 40,
					name : diaHeader
				}].concat(notProficiencies ? [{
					type : "static_text",
					item_id : "txtA",
					alignment : "align_fill",
					font : "dialog",
					wrap_name : true,
					char_width : 40,
					name : optSrc
				}] : [{
					type : "view",
					alignment : "align_fill",
					align_children : "align_row",
					elements : [{
						type : "view",
						alignment : "align_left",
						align_children : "align_left",
						elements : [{
							type : "static_text",
							alignment : "align_left",
							font : "dialog",
							item_id : "txt0",
							name : "Regarding:"
						}, {
							type : "static_text",
							alignment : "align_left",
							font : "dialog",
							item_id : "txt2",
							name : "Gained from:"
						}]
					}, {
						type : "view",
						alignment : "align_right",
						align_children : "align_left",
						elements : [{
							type : "static_text",
							alignment : "align_left",
							item_id : "txt1",
							font : "dialog",
							bold : true,
							name : optType
						}, {
							type : "static_text",
							alignment : "align_left",
							item_id : "txt3",
							font : "dialog",
							bold : true,
							name : optSrc
						}]
					}]
				}]).concat([{
					type : "view",
					alignment : "align_center",
					align_children : "align_left",
					elements : selectionLines
				}]).concat(!showOptions ? [] : [{
					type : "static_text",
					alignment : "align_fill",
					item_id : "txtO",
					wrap_name : true,
					name : "Currently already known: " + showOptions + ".",
					char_width : 40
				}]).concat([{
					type : "static_text",
					alignment : "align_fill",
					item_id : "txtL",
					wrap_name : true,
					name : sBottomMsg ? sBottomMsg : "You can always change what you set here at a later time by editing the corresponding field on the sheet. What you select here is not permanent.",
					char_width : 40
				}, {
					type : "ok"
				}])
			}]
		}
	};
	if (knownOpt !== "radio") { for (var i = 0; i < optSubj.length; i++) {
		theDialog["sl" + ("0" + i).slice(-2)] = Function("dialog", "this.check(dialog, " + i + ");");
	}; };
	app.execDialog(theDialog)
	return theDialog.choices;
};

// Ask user for size options and return the index number; prefix == false (1st page); prefix is string (companion page); prefix is array [prefix, nr] (wild shape page)
function SetCreatureSize(prefix, sName, aSizes) {
	if (!isArray(aSizes)) aSizes = [aSizes];
	var sNamePl = sName;
	if (isArray(sName)) {
		sNamePl = sName[1];
		sName = sName[0];
	}
	var sFldNm = !prefix ? "Size Category" : isArray(prefix) ? prefix[0] + "Wildshape." + prefix[1] + ".Size" : prefix + "Comp.Desc.Size";
	var aOptions = [], oOptionsRef = {};
	var oFld = tDoc.getField(sFldNm);
	for (var i = 0; i < aSizes.length; i++) {
		var sSizeName = oFld.getItemAt(aSizes[i], false);
		aOptions.push(sSizeName);
		oOptionsRef[sSizeName] = aSizes[i];
	}
	var sTooltip = sNamePl + " size " + (aOptions.length > 1 ? formatLineList("can be", aOptions, true) + "." : "is " + aOptions[0] + ".");
	if (!prefix) sTooltip += "\n\nSelected size category will affect encumbrance on the second page.";
	var bGoAsk = aSizes.length > 1;
	if (bGoAsk) {
		var sAsk = AskUserOptions("Select Size Category for " + sName, sNamePl + " can be multiple size categories. It is up to you to select which the sheet will use.", aOptions, "radio", true);
		if (oOptionsRef[sAsk]) {
			PickDropdown(sFldNm, oOptionsRef[sAsk]);
		} else {
			bGoAsk = false;
		}
	}
	if (!bGoAsk) {
		PickDropdown(sFldNm, isArray(aSizes) ? aSizes[0] : aSizes);
	}
	if (!isArray(prefix)) AddTooltip(sFldNm, sTooltip);
}

// Process a feature attribute through the AddToNotes function
// namesArr = [tipNm, displName, fObjName, aParent]
function processToNotesPage(AddRemove, items, type, mainObj, parentObj, namesArr) {
	if (!isArray(items)) items = [items];
	// set the alertType, determined by type
	var fallback = {
		alertType : "Class Features section",
		noteOrig : namesArr[1],
		noteSrc : mainObj.source ? stringSource(mainObj, "first,abbr", ", ") : parentObj && parentObj.source ? stringSource(parentObj, "first,abbr", ", ") : ""
	}
	switch (GetFeatureType(type)) {
		case "classes":
			fallback.alertType = "Class Features section";
			fallback.noteOrig = namesArr[2].indexOf("subclassfeature") !== -1 ? CurrentClasses[namesArr[3]].subname : CurrentClasses[namesArr[3]].name;
			fallback.noteOrig += mainObj.minlevel ? " " + mainObj.minlevel : parentObj && parentObj.minlevel ? " " + parentObj.minlevel : "";
			break;
		case "race":
			fallback.alertType = "Racial Traits section";
			fallback.noteOrig = namesArr[1].capitalize();
			if (mainObj.minlevel) fallback.noteOrig += " " + mainObj.minlevel;
			if (!fallback.noteSrc) fallback.noteSrc = stringSource(CurrentRace, "first,abbr", ", ");
			break;
		case "background":
			fallback.alertType = "Background Feature description";
			fallback.noteOrig = namesArr[1];
			break;
		case "feats":
			fallback.alertType = "Feat description";
			fallback.noteOrig = namesArr[0];
			break;
		case "items":
			fallback.alertType = "Magic Item description";
			fallback.noteOrig = namesArr[0];
			break;
	};
	for (var i = 0; i < items.length; i++) {
		var noteObj = items[i];
		var alertTxt = noteObj.popupName ? noteObj.popupName : noteObj.name + ' from "' + namesArr[0] + '"';
		var noteSrc = noteObj.source ? stringSource(noteObj, "first,abbr", ", ") : fallback.noteSrc;
		var noteDesc = (isArray(noteObj.note) ? desc(noteObj.note) : noteObj.note).replace(/\n/g, "\r");
		if (What("Unit System") === "metric") noteDesc = ConvertToMetric(noteDesc, 0.5);
		var noteStr = "\u25C6 " + noteObj.name + " (" + fallback.noteOrig + noteSrc + ")" + (noteObj.additional ? " [" + noteObj.additional + "]" : "") + noteDesc;
		if (noteObj.page3notes) { // add to 3rd page notes section
			if (AddRemove) {
				AddString('Extra.Notes', noteStr, true);
				show3rdPageNotes(); // for a Colourful sheet, show the notes section on the third page
				var changeMsg = alertTxt + ' has been added to the Notes section on the third page' + (!typePF ? ", while the Rules section on the third page has been hidden" : "") + ". They wouldn't fit in the " + fallback.alertType + ".";
				CurrentUpdates.types.push("notes");
				if (!CurrentUpdates.notesChanges) {
					CurrentUpdates.notesChanges = [changeMsg];
				} else {
					CurrentUpdates.notesChanges.push(changeMsg);
				}
			} else {
				RemoveString('Extra.Notes', noteStr, true);
			}
		} else { // add to its own section on a notes page
			if (AddRemove) {
				AddToNotes(noteStr, alertTxt, false, fallback.alertType, true, noteObj.amendTo);
			} else {
				AddToNotes("", false, noteStr, false, true);
			}
		}
	}
}

// A way to add a string to a notes page, or generate a notes page if it didn't exist yet
function AddToNotes(noteStr, alertTxt, oldNoteStr, alertType, isProcessed, amendToNote) {
	if (!noteStr && !oldNoteStr) return;
	
	var prefix = false;
	if (!isProcessed) {
		if (What("Unit System") === "metric") {
			if (noteStr) noteStr = ConvertToMetric(noteStr, 0.5);
			if (oldNoteStr) oldNoteStr = ConvertToMetric(oldNoteStr, 0.5);
		}
		if (noteStr) noteStr = noteStr.replace(/\n/g, "\r");
		if (oldNoteStr) oldNoteStr = oldNoteStr.replace(/\n/g, "\r");
	};
	var replaceOldNote = false;
	if (noteStr && !isTemplVis("ASnotes")) {
		var noteFld = DoTemplate("ASnotes", "Add");
		noteFld += "Notes.Left";
	} else {
		var noteFld = false, amendFld = false;
		var noteFlds = ["Notes.Left", "Notes.Right"];
		var notesPrefix = What("Template.extras.ASnotes").split(",");
		var noteStrLC = noteStr.toLowerCase();
		var oldNoteStrLC = oldNoteStr ? oldNoteStr.toLowerCase() : false;
		if (amendToNote) amendToNote = amendToNote.toLowerCase();
		for (var i = 1; i < notesPrefix.length; i++) {
			for (var n = 0; n < noteFlds.length; n++) {
				var aFld = notesPrefix[i] + noteFlds[n];
				var inFld = What(aFld).toLowerCase();
				if (noteStr && inFld.indexOf(noteStrLC) !== -1) {
					return;
				} else if (oldNoteStr && inFld.indexOf(oldNoteStrLC) !== -1) {
					prefix = notesPrefix[i];
					noteFld = aFld;
					replaceOldNote = true;
					i = noteFlds.length;
					break;
				} else if (amendToNote && inFld.indexOf(amendToNote) !== -1 && !noteFld) {
					noteFld = aFld;
					amendFld = aFld;
				} else if (inFld === "" && !noteFld) {
					noteFld = aFld;
				};
			};
		};
		if (!noteFld && noteStr) {
			noteFld = DoTemplate("ASnotes", "Add");
			noteFld += "Notes.Left";
		} else if (!noteFld && oldNoteStr) {
			return;
		};
	};
	if (noteFld === amendFld) noteStr = "\r" + noteStr;
	ReplaceString(noteFld, noteStr, true, oldNoteStr ? oldNoteStr : "");
	if (!replaceOldNote && noteStr && alertTxt) {
		if (!alertType) alertType = "Class Features section";
		var changeMsg = alertTxt + ' has been added to the Notes page at page number ' + (tDoc.getField(noteFld).page + 1) + ". They wouldn't fit in the " + alertType + " or the third page's Notes section.";
		CurrentUpdates.types.push("notes");
		if (!CurrentUpdates.notesChanges) {
			CurrentUpdates.notesChanges = [changeMsg];
		} else {
			CurrentUpdates.notesChanges.push(changeMsg);
		}
	} else if (replaceOldNote && oldNoteStr && prefix && !What(prefix + "Notes.Left") && !What(prefix + "Notes.Right")) {
		// if the notes page is now completely empty, remove it completely
		DoTemplate("ASnotes", "Remove", prefix, true);
	}
};

// a function to see if the character has proficiency in a skill; This returns an array of two booleans: [proficiency, expertise]
function hasSkillProf(theSkill) {
	var skill = theSkill.substr(0,4).capitalize();
	if (SkillsList.abbreviations.indexOf(skill) === -1) {
		skill = skill.substr(0,3);
		if (SkillsList.abbreviations.indexOf(skill) === -1) return [false, false];
	};
	var skillFld = Who('Text.SkillsNames') === 'alphabeta' ? skill : SkillsList.abbreviations[SkillsList.abbreviationsByAS.indexOf(skill)];
	var hasProf = tDoc.getField(skillFld + ' Prof').isBoxChecked(0) != 0;
	var hasExp = !hasProf ? false : tDoc.getField(skillFld + ' Exp').isBoxChecked(0) != 0;
	return [hasProf, hasExp];
};

// (Re)set all the calculations in their right order
function setCalcOrder() {
	calcStop();
	var cFlds = [];
	var abis = ["Str", "Dex", "Con", "Int", "Wis", "Cha", "HoS"];
	var skills = ["Acr", "Ani", "Arc", "Ath", "Dec", "His", "Ins", "Inti", "Inv", "Med", "Nat", "Perc", "Perf", "Pers", "Rel", "Sle", "Ste", "Sur"];
	// ability modifiers
	for (var i = 0; i < abis.length; i++) cFlds.push(abis[i]+" Mod");
	// Proficiency bonus
	cFlds.push("Proficiency Bonus");
	// saving throws
	for (var i = 0; i < abis.length; i++) cFlds.push(abis[i]+" ST Mod");
	// skills & initiative * HP
	cFlds = cFlds.concat(skills);
	cFlds = cFlds.concat(["Too", "Passive Perception", "Initiative bonus", "HP Max"]);
	if (!typePF) cFlds = cFlds.concat(["Init Dex Mod", "Init Bonus"]);
	// AC
	cFlds = cFlds.concat(["AC Dexterity Modifier", "AC"]);
	// HD
	if (!typePF) for (var i = 1; i <= 3; i++) cFlds.push("HD"+i+" Con Mod");
	// attacks
	for (var i = 1; i <= FieldNumbers.attacks; i++) cFlds.push("Attack."+i+".To Hit");
	// weight information
	cFlds = cFlds.concat(["Weight Encumbered", "Weight Heavily Encumbered", "Weight Push/Drag/Lift", "Weight Carrying Capacity.Field"]);
	if (!typePF) cFlds = cFlds.concat(["Weight Encumbered Text", "Display.Speed.Enc", "Weight Heavily Encumbered Text", "Display.Speed.EncH", "Weight Push/Drag/Lift Text", "Display.Speed.Push", "Weight Carrying Capacity.Text"]);
	// equipment 2nd page
	cFlds.push("Adventuring Gear Weight Subtotal Right");
	if (typePF) cFlds.push("Adventuring Gear Weight Subtotal Middle");
	cFlds.push("Adventuring Gear Weight Subtotal Left");
	for (var i = 1; i <= (typePF ? 9 : 6); i++) cFlds.push("Adventuring Gear Location.Subtotal "+i);
	// equipment 3rd page
	cFlds = cFlds.concat(["Extra.Gear Weight Subtotal Right", "Extra.Gear Weight Subtotal Left"]);
	for (var i = 1; i <= 6; i++) cFlds.push("Extra.Gear Location.Subtotal "+i);
	// weight carried
	cFlds.push("Weight Carried");
	// unrelated fields
	cFlds = cFlds.concat(["Next level", "SheetInformation"]);
	// Magic Items and Feats name fields (for the choices)
	for (var i = 1; i <= FieldNumbers.feats; i++) cFlds.push("Feat Name " + i);
	for (var i = 1; i <= FieldNumbers.magicitems; i++) cFlds.push("Extra.Magic Item " + i);
	// companion page
	var tpls = What("Template.extras.AScomp").split(",");
	for (var t = 0; t < tpls.length; t++) {
		var tpl = tpls[t];
		// companion ability modifiers
		for (var i = 0; i < (abis.length - 1); i++) cFlds.push(tpl+"Comp.Use.Ability."+abis[i]+".Mod");
		// companion saving throws
		for (var i = 0; i < (abis.length - 1); i++) cFlds.push(tpl+"Comp.Use.Ability."+abis[i]+".ST.Mod");
		// companion skills
		for (var i = 0; i < skills.length; i++) cFlds.push(tpl+"Comp.Use.Skills."+skills[i]+".Mod");
		cFlds.push(tpl+"Comp.Use.Skills.Perc.Pass.Mod");
		// companion HP
		cFlds.push(tpl+"Comp.Use.HP.Max");
		// companion initiative
		if (!typePF) cFlds = cFlds.concat([tpl+"Comp.Use.Combat.Init.Dex", tpl+"Comp.Use.Combat.Init.Bonus"]);
		cFlds.push(tpl+"Comp.Use.Combat.Init.Mod");
		// AC
		cFlds.push(tpl+"Comp.Use.AC");
		// companion HD
		if (!typePF) cFlds.push(tpl+"Comp.Use.HD.Con");
		// companion equipment
		if (typePF) {
			cFlds.push(tpl+"Comp.eqp.Gear Weight Subtotal");
		} else {
			cFlds = cFlds.concat([tpl+"Comp.eqp.Gear Weight Subtotal Left", tpl+"Comp.eqp.Gear Weight Subtotal Right"]);
		}
		// companion notes
		cFlds = cFlds.concat([tpl+"Comp.eqp.Notes", tpl+"Comp.eqp.Display.Weighttxt"]);
		if (!typePF) cFlds.push(tpl+"Comp.img.Notes");
		// companion attacks
		for (var i = 1; i <= 3; i++) cFlds.push(tpl+"Comp.Use.Attack."+i+".To Hit");
	}
	// Wild Shape page
	var tpls = What("Template.extras.WSfront").split(",");
	for (var t = 0; t < tpls.length; t++) {
		var tpl = tpls[t];
		if (tpl) cFlds.push(tpl+"AdvLog.Player Name");
		for (var w = 1; w <= 4; w++) {
			for (var i = 0; i < (abis.length - 1); i++) cFlds.push(tpl+"Wildshape."+w+".Ability."+abis[i]+".Mod")
		}
	}
	// spell sheet pages
	var tpls = (What("Template.extras.SSfront") + "," + What("Template.extras.SSmore")).replace(/,(,)|,$()/, "$1").split(",");
	for (var t = 0; t < tpls.length; t++) {
		var tpl = tpls[t];
		cFlds.push(tpl+"SpellSheetInformation");
		if (typePF) {
			cFlds.push(tpl+"zAdvLog.PC Name");
		} else if (tpl) {
			cFlds.push(tpl+"AdvLog.PC Name");
		}
		if (!typePF && What("Template.extras.SSfront").indexOf(tpl) !== -1) cFlds.push(tpl+"spellshead.Text.prepare.0");
		for (var i = 0; i <= 3; i++) cFlds.push(tpl+"spellshead.prepare."+i);
	}
	// Ability Save DCs (have to come after spell save DCs)
	cFlds = cFlds.concat(["Spell save DC 1", "Spell save DC 2"]);
	// adventurers log page last
	var advT = [".xp", ".gold", ".downtime", ".renown", ".magicItems"];
	var tpls = What("Template.extras.ALlog").split(",");
	for (var t = 0; t < tpls.length; t++) {
		var tpl = tpls[t];
		cFlds = cFlds.concat([
			tpl+"AdvLog.previous",
			tpl+"AdvLog.DCI.Text",
			tpl+"AdvLog.Player Name",
			tpl+"AdvLog.PC Name",
			tpl+"AdvLog.Class and Levels",
			tpl+"AdvLog.sheetNumber" // before the numeric fields for correct working of the SetAdvLogCalcOrder() function
		]);
		for (var l = 1; l <= FieldNumbers.logs; l++) {
			for (var i = 0; i < advT.length; i++) {
				var aLog = tpl+"AdvLog."+l+advT[i];
				cFlds = cFlds.concat([aLog+".start", aLog+".total"]);
			}
		}
	}

	// Set the actual calculation order
	var cOrd = 0;
	for (var i = 0; i < cFlds.length; i++) {
		var aFld = tDoc.getField(cFlds[i]);
		if (aFld) {
			aFld.calcOrderIndex = cOrd;
			cOrd++;
		}
	};
};

function MakeFaqMenu_FaqOptions(MenuSelection) {
	if (!MenuSelection || MenuSelection === "justMenu") {
		var arrMenu = Menus.faq.concat({
			cName : "-"
		}, {
			cName : "Get the latest version",
			cReturn : "contact#latest version"
		}, {
			cName : "-"
		}, {
			cName : "Contact MPMB",
			oSubMenu : Menus.contact
		})
		Menus.faqextended = arrMenu;
		if (MenuSelection == "justMenu") return;
	}
	var MenuSelection = MenuSelection ? MenuSelection : getMenu("faqextended");
	if (!MenuSelection || MenuSelection[0] == "nothing") return;
	switch (MenuSelection[0]) {
		case "faq" :
			getFAQ(MenuSelection);
			break;
		case "contact" :
			contactMpmbMenu(MenuSelection);
			break;
	}
}

// The function called when the FAQ button is pressed
function getFAQ(input, delay) {
	var MenuSelection = input ? input : getMenu("faq");
	if (!MenuSelection || MenuSelection[0] != "faq") return;
	switch (MenuSelection[1]) {
		case "online" :
			app.launchURL("https://flapkan.com/faq", true);
			break;
		case "pdf" :
			if (delay) return true;
			tDoc.exportDataObject({ cName: 'FAQ.pdf', nLaunch: 2 });
			break;
		case "ogl" :
			ShowDialog("Open Gaming License, for use of the SRD", licenseOGL.join("\n\n"));
			break;
		case "gplv3" :
			ShowDialog("GNU License, for the software by MPMB", licenseGPLV3.join("\n\n"));
			break;
	}
};

// Make a menu to enable or disable the use of unicode
function makeUnicodeMenu() {
	var isEnabled = What("UseUnicode") != "";
	Menus.unicode = {
		cName : "Use Unicode " + (isEnabled ? "(disable if you can't read this: \"" + toUni("This") + "\")" : "[disabled]"),
		cReturn : "unicode#unicode#" + (isEnabled ? "" : "true"),
		bMarked : isEnabled
	}
}

// Do something with the menu
function setUnicodeUse(enable, force) {
	enable = enable != "";
	var isEnabled = What("UseUnicode") != "";
	if (isEnabled !== enable || force) {
		Value("UseUnicode", enable ? "true" : "");
		if (!force) {
			app.alert({
				cMsg : "You have changed the use of unicode characters to: " + (enable ? "ENABLED" : "DISABLED") + "\nUnicode characters are those that are bold, italic, or superscript in tooltips and dialogs. Not all systems handle them well.\n\nNote that there still will be some static tooltips that use unicode and thus might have unreadable characters for you.\n\nYou can already see the result of your change here:\n\"" + toUni("This text is bold and italic if unicode is enabled") + '\".',
				nIcon : 3,
				cTitle : "Unicode has been " + (enable ? "ENABLED" : "DISABLED")
			});
		}
		// update the sourcelist superscript
		for (var aSrc in SourceList) {
			SourceList[aSrc].uniS = toSup(SourceList[aSrc].abbreviation);
		};
		// update the tooltips that use unicode
		UpdateDropdown("tooltips");
		AbilityScores_Button(true);
		setSkillTooltips(true);
		MakeSkillsMenu_SkillsOptions(true, true);
		SetHPTooltip();
		AtHigherLevels = "\n   " + toUni("At Higher Levels") + ": ";
	}
}
